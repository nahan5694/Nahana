(function exposeAudioSystem() {
  const STORAGE_KEY = "project_w_audio_v1";
  const DEFAULT_SETTINGS = Object.freeze({ master: .75, bgm: .75, bgs: .75 });
  const BGM_BY_REGION = Object.freeze({
    road: Object.freeze({ "북부": "Asset_BGM_01", "중부": "Asset_BGM_02", "남부": "Asset_BGM_03" }),
    settlement: Object.freeze({ "북부": "Asset_BGM_04", "중부": "Asset_BGM_05", "남부": "Asset_BGM_06" }),
    camp: Object.freeze({ "북부": "Asset_BGM_07", "중부": "Asset_BGM_08", "남부": "Asset_BGM_09" })
  });
  const EFFECT_ASSETS = Object.freeze({
    click: "Asset_BGS_01",
    coin: "Asset_BGS_02",
    trade: "Asset_BGS_03",
    paper: "Asset_BGS_04",
    crowd: "Asset_BGS_05",
    owl: "Asset_BGS_06",
    campfire: "Asset_BGS_07",
    hoof: "Asset_BGS_08",
    horseBreath: "Asset_BGS_09",
    wheel: "Asset_BGS_10",
    rain: "Asset_BGS_11",
    heavyRain: "Asset_BGS_12",
    goods: "Asset_BGS_13"
  });
  const EFFECT_LEVELS = Object.freeze({
    click: .42,
    coin: .68,
    trade: .86,
    paper: .58,
    owl: .5,
    horseBreath: .48,
    goods: .65
  });
  const LOOP_FADE_MS = 700;

  let getAssetUrl = () => "";
  let unlocked = false;
  let settings = loadSettings();
  let state = {
    active: false,
    region: "중부",
    mode: "road",
    settlementCategory: "",
    facilityType: "",
    moving: false,
    weather: "맑음"
  };
  const templates = new Map();
  const loops = new Map();
  const randomTimers = new Map();
  const warnedAssets = new Set();

  function init(options = {}) {
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    bindVolumeControls();
    renderControls();
    document.addEventListener("pointerdown", unlock, { capture: true, passive: true });
    document.addEventListener("keydown", unlock, { capture: true });
    document.addEventListener("click", handleButtonClick, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("projectw:facilitychange", event => {
      state.facilityType = event.detail?.open ? String(event.detail?.facilityType || "") : "";
      syncPlayback();
    });
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    primeAudioElement();
    syncPlayback();
  }

  function primeAudioElement() {
    const source = getAssetUrl(EFFECT_ASSETS.click);
    if (!source) return;
    const audio = createAudio(source, false);
    audio.muted = true;
    const playback = audio.play();
    if (playback?.then) {
      playback.then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
      }).catch(() => {});
    }
  }

  function handleButtonClick(event) {
    const button = event.target instanceof Element ? event.target.closest("button") : null;
    if (!button || button.disabled || button.getAttribute("aria-disabled") === "true") return;
    playEffect("click");
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      loops.forEach(entry => {
        entry.wasPlaying = !entry.audio.paused;
        entry.audio.pause();
      });
      return;
    }
    if (unlocked) syncPlayback();
  }

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return {
        master: normalizeVolume(saved?.master, DEFAULT_SETTINGS.master),
        bgm: normalizeVolume(saved?.bgm, DEFAULT_SETTINGS.bgm),
        bgs: normalizeVolume(saved?.bgs, DEFAULT_SETTINGS.bgs)
      };
    } catch (error) {
      console.error(error);
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  }

  function normalizeVolume(value, fallback = .75) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(1, Math.max(0, number)) : fallback;
  }

  function bindVolumeControls() {
    document.querySelectorAll("[data-audio-volume]").forEach(input => {
      input.addEventListener("input", () => {
        const channel = input.dataset.audioVolume;
        if (!Object.hasOwn(settings, channel)) return;
        settings[channel] = normalizeVolume(Number(input.value) / 100, DEFAULT_SETTINGS[channel]);
        saveSettings();
        updateLoopVolumes();
        renderControls();
      });
    });
  }

  function renderControls() {
    document.querySelectorAll("[data-audio-volume]").forEach(input => {
      const channel = input.dataset.audioVolume;
      if (!Object.hasOwn(settings, channel)) return;
      const percent = Math.round(settings[channel] * 100);
      input.value = String(percent);
      const output = document.querySelector(`#${input.id}-output`);
      if (output) output.textContent = `${percent}%`;
    });
  }

  function createAudio(source, loop) {
    const audio = new Audio();
    audio.preload = "auto";
    audio.loop = Boolean(loop);
    audio.playsInline = true;
    audio.src = source;
    return audio;
  }

  function templateFor(assetId) {
    const source = getAssetUrl(assetId);
    if (!source) return null;
    const cached = templates.get(assetId);
    if (cached?.src === source) return cached.audio;
    const audio = createAudio(source, false);
    templates.set(assetId, { src: source, audio });
    return audio;
  }

  function channelVolume(channel, level) {
    return normalizeVolume(settings.master * settings[channel] * Math.max(0, Number(level) || 0), 0);
  }

  function reportPlaybackFailure(assetId, error) {
    if (warnedAssets.has(assetId)) return;
    warnedAssets.add(assetId);
    console.warn(`사운드 에셋을 재생하지 못했습니다: ${assetId}`, error);
  }

  function playEffect(name, level = EFFECT_LEVELS[name] ?? .6) {
    if (!unlocked || document.hidden) return;
    const assetId = EFFECT_ASSETS[name] || name;
    const template = templateFor(assetId);
    if (!template) return;
    const audio = template.cloneNode(true);
    audio.volume = channelVolume("bgs", level);
    audio.currentTime = 0;
    audio.play().catch(error => reportPlaybackFailure(assetId, error));
  }

  function playCurrencyCompletion(completionEffect = "trade", gap = 120) {
    playEffect("coin");
    if (!completionEffect || completionEffect === "coin") return;
    window.setTimeout(() => playEffect(completionEffect), Math.max(0, Number(gap) || 0));
  }

  function setState(nextState = {}) {
    state = { ...state, ...nextState };
    if (Object.hasOwn(nextState, "mode") && nextState.mode !== "settlement") state.facilityType = "";
    syncPlayback();
  }

  function syncPlayback() {
    syncRandomEffects();
    if (!unlocked || document.hidden) return;
    if (!state.active) {
      [...loops.keys()].forEach(stopLoop);
      return;
    }

    const desired = desiredLoops();
    [...loops.keys()].filter(key => !desired.has(key)).forEach(stopLoop);
    desired.forEach((specification, key) => startLoop(key, specification));
  }

  function desiredLoops() {
    const desired = new Map();
    if (state.mode === "title") {
      desired.set("bgm", { assetId: "Asset_Main_07", channel: "bgm", level: .82 });
      return desired;
    }
    if (state.mode === "loading") {
      desired.set("loading-hoof", { assetId: EFFECT_ASSETS.hoof, channel: "bgs", level: .34 });
      desired.set("loading-wheel", { assetId: EFFECT_ASSETS.wheel, channel: "bgs", level: .46 });
      return desired;
    }
    const region = ["북부", "중부", "남부"].includes(state.region) ? state.region : "중부";
    const mode = ["road", "settlement", "camp"].includes(state.mode) ? state.mode : "road";
    const facilityBgm = state.facilityType === "주점"
      ? "Asset_BGM_10"
      : state.facilityType === "여관" ? "Asset_BGM_11" : "";
    desired.set("bgm", {
      assetId: facilityBgm || BGM_BY_REGION[mode][region],
      channel: "bgm",
      level: mode === "camp" ? .56 : .82
    });

    const settlementCategory = String(state.settlementCategory || "");
    const facilityType = String(state.facilityType || "");
    const gateCrowd = mode === "settlement"
      && settlementCategory === "관문"
      && (!facilityType || ["좌판", "주점"].includes(facilityType));
    const marketOrTavernCrowd = mode === "settlement"
      && ["관문", "도시", "대도시"].includes(settlementCategory)
      && ["시장", "주점"].includes(facilityType);
    if (gateCrowd || marketOrTavernCrowd) {
      desired.set("crowd", { assetId: EFFECT_ASSETS.crowd, channel: "bgs", level: .36 });
    }
    if (mode === "camp") desired.set("campfire", { assetId: EFFECT_ASSETS.campfire, channel: "bgs", level: .5 });
    if (state.moving) {
      desired.set("hoof", { assetId: EFFECT_ASSETS.hoof, channel: "bgs", level: .38 });
      desired.set("wheel", { assetId: EFFECT_ASSETS.wheel, channel: "bgs", level: .42 });
    }
    if (state.weather === "비") desired.set("weather", { assetId: EFFECT_ASSETS.rain, channel: "bgs", level: .48 });
    if (state.weather === "폭우") desired.set("weather", { assetId: EFFECT_ASSETS.heavyRain, channel: "bgs", level: .7 });
    return desired;
  }

  function startLoop(key, specification) {
    const source = getAssetUrl(specification.assetId);
    if (!source) return;
    const targetVolume = channelVolume(specification.channel, specification.level);
    const existing = loops.get(key);
    if (existing?.assetId === specification.assetId && existing.src === source) {
      existing.channel = specification.channel;
      existing.level = specification.level;
      fadeTo(existing, targetVolume, 250);
      if (existing.audio.paused) existing.audio.play().catch(error => reportPlaybackFailure(specification.assetId, error));
      return;
    }
    if (existing) stopLoop(key);

    const audio = createAudio(source, true);
    const entry = {
      assetId: specification.assetId,
      src: source,
      audio,
      channel: specification.channel,
      level: specification.level,
      fadeTimer: 0
    };
    audio.volume = 0;
    loops.set(key, entry);
    audio.play()
      .then(() => fadeTo(entry, targetVolume, LOOP_FADE_MS))
      .catch(error => {
        if (loops.get(key) === entry) loops.delete(key);
        reportPlaybackFailure(specification.assetId, error);
      });
  }

  function fadeTo(entry, target, duration, onComplete) {
    window.clearInterval(entry.fadeTimer);
    const start = entry.audio.volume;
    const startedAt = performance.now();
    if (duration <= 0 || Math.abs(start - target) < .002) {
      entry.audio.volume = normalizeVolume(target, 0);
      onComplete?.();
      return;
    }
    entry.fadeTimer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / duration);
      entry.audio.volume = normalizeVolume(start + ((target - start) * progress), 0);
      if (progress < 1) return;
      window.clearInterval(entry.fadeTimer);
      entry.fadeTimer = 0;
      onComplete?.();
    }, 40);
  }

  function stopLoop(key) {
    const entry = loops.get(key);
    if (!entry) return;
    loops.delete(key);
    fadeTo(entry, 0, LOOP_FADE_MS, () => {
      entry.audio.pause();
      entry.audio.removeAttribute("src");
      entry.audio.load();
    });
  }

  function updateLoopVolumes() {
    loops.forEach(entry => fadeTo(entry, channelVolume(entry.channel, entry.level), 100));
  }

  function syncRandomEffects() {
    syncRandomEffect("owl", state.active && state.mode === "camp", 10_000, 20_000);
    syncRandomEffect("horseBreath", state.active && state.moving, 8_000, 15_000);
  }

  function syncRandomEffect(name, active, minimum, maximum) {
    if (!active) {
      window.clearTimeout(randomTimers.get(name));
      randomTimers.delete(name);
      return;
    }
    if (randomTimers.has(name)) return;
    const delay = minimum + (Math.random() * (maximum - minimum));
    const timer = window.setTimeout(() => {
      randomTimers.delete(name);
      if ((name === "owl" && state.mode === "camp") || (name === "horseBreath" && state.moving)) {
        playEffect(name);
        syncRandomEffect(name, true, minimum, maximum);
      }
    }, delay);
    randomTimers.set(name, timer);
  }

  function refreshAssets() {
    templates.clear();
    syncPlayback();
  }

  window.ProjectWAudio = {
    init,
    unlock,
    setState,
    playEffect,
    playCurrencyCompletion,
    refreshAssets,
    renderControls,
    getSettings: () => ({ ...settings })
  };
}());
