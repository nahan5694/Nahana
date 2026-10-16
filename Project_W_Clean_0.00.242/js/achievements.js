(function exposeAchievements() {
  const STORAGE_KEY = "project_w_achievements_v1";
  const DATA_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1929263076&single=true&output=csv";
  const COMPANY_NAMES = ["브란트 상회", "첼페니 상회", "인데그루크 상회"];
  const CHECKS = new Map([
    ["ACH_001", snapshot => snapshot.peddlerLevel >= 15],
    ["ACH_002", snapshot => snapshot.peddlerLevel >= 30],
    ["ACH_003", snapshot => snapshot.peddlerLevel >= 40],
    ["ACH_004", snapshot => snapshot.peddlerLevel >= 50],
    ["ACH_005", snapshot => snapshot.companionLevel >= 10],
    ["ACH_006", snapshot => snapshot.companionLevel >= 20],
    ["ACH_007", snapshot => snapshot.companionLevel >= 30],
    ["ACH_008", snapshot => snapshot.companionLevel >= 40],
    ["ACH_009", snapshot => snapshot.companionLevel >= 50],
    ["ACH_010", snapshot => snapshot.progress.maximumSingleSaleValue >= 10_000],
    ["ACH_011", snapshot => snapshot.progress.maximumSingleSaleValue >= 20_000],
    ["ACH_012", snapshot => snapshot.progress.maximumSingleSaleValue >= 40_000],
    ["ACH_013", snapshot => snapshot.progress.maximumReturnRate >= 50],
    ["ACH_014", snapshot => snapshot.progress.maximumReturnRate >= 100],
    ["ACH_015", snapshot => snapshot.progress.maximumReturnRate >= 150],
    ["ACH_016", snapshot => snapshot.progress.maximumReturnRate >= 200],
    ["ACH_017", snapshot => snapshot.progress.maximumReturnRate >= 250],
    ["ACH_018", snapshot => companyScore(snapshot, "브란트 상회") >= 10_000],
    ["ACH_019", snapshot => companyScore(snapshot, "첼페니 상회") >= 10_000],
    ["ACH_020", snapshot => companyScore(snapshot, "인데그루크 상회") >= 10_000],
    ["ACH_021", snapshot => COMPANY_NAMES.every(name => companyScore(snapshot, name) >= 5_000)],
    ["ACH_022", snapshot => snapshot.guildLevel >= 5],
    ["ACH_023", snapshot => snapshot.allGiftsPurchased],
    ["ACH_024", snapshot => snapshot.memorialComplete.mainDialogue],
    ["ACH_025", snapshot => snapshot.memorialComplete.commonSense],
    ["ACH_026", snapshot => snapshot.memorialComplete.talkCards],
    ["ACH_027", snapshot => snapshot.memorialComplete.events],
    ["ACH_028", snapshot => snapshot.memorialComplete.footprints],
    ["ACH_029", snapshot => snapshot.memorialComplete.tavernFoods],
    ["ACH_030", snapshot => snapshot.memorialComplete.marketSnacks],
    ["ACH_031", snapshot => snapshot.walletValue >= 100_000],
    ["ACH_032", snapshot => snapshot.walletValue >= 1_000_000],
    ["ACH_033", snapshot => snapshot.walletValue >= 10_000_000],
    ["ACH_034", snapshot => snapshot.progress.wolfenEncounters >= 10],
    ["ACH_035", snapshot => snapshot.day >= 365],
    ["ACH_036", snapshot => snapshot.day >= 1_000],
    ["ACH_037", snapshot => snapshot.day >= 3_650],
    ["ACH_038", snapshot => snapshot.day >= 10_000],
    ["ACH_039", snapshot => snapshot.allGoodsKnowledgeMaximum],
    ["ACH_040", snapshot => snapshot.progress.repairedHalfWagon],
    ["ACH_041", snapshot => milestoneWallet(snapshot, 100) >= 10_000],
    ["ACH_042", snapshot => milestoneWallet(snapshot, 100) >= 20_000],
    ["ACH_043", snapshot => milestoneWallet(snapshot, 200) >= 100_000],
    ["ACH_044", snapshot => milestoneWallet(snapshot, 200) >= 150_000]
  ]);

  let definitions = [];
  let definitionsPromise = null;
  let getCharacterSnapshot = async () => null;
  let isGameplayActive = () => false;
  let notify = () => {};
  let elements = {};
  let state = loadState();
  let trackingActive = false;
  let trackingUpdatedAt = Date.now();
  let evaluationTimer = 0;
  let trackingTimer = 0;

  function init(options = {}) {
    getCharacterSnapshot = typeof options.getCharacterSnapshot === "function"
      ? options.getCharacterSnapshot
      : getCharacterSnapshot;
    isGameplayActive = typeof options.isGameplayActive === "function" ? options.isGameplayActive : isGameplayActive;
    notify = typeof options.notify === "function" ? options.notify : notify;
    elements = {
      modal: document.querySelector("#achievement-modal"),
      close: document.querySelector("#achievement-close"),
      titleButton: document.querySelector("#title-achievements"),
      toolbarButton: document.querySelector("#achievement-button"),
      toolbarCount: document.querySelector("#achievement-button-count"),
      playTime: document.querySelector("#achievement-play-time"),
      highestPeddler: document.querySelector("#achievement-highest-peddler"),
      highestCompanion: document.querySelector("#achievement-highest-companion"),
      totalCount: document.querySelector("#achievement-total-count"),
      status: document.querySelector("#achievement-status"),
      grid: document.querySelector("#achievement-grid")
    };
    elements.close?.addEventListener("click", close);
    elements.titleButton?.addEventListener("click", open);
    elements.toolbarButton?.addEventListener("click", open);
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !isOpen()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    });
    window.addEventListener("pagehide", flushPlayTime);
    document.addEventListener("visibilitychange", flushPlayTime);
    trackingActive = shouldTrack();
    trackingUpdatedAt = Date.now();
    trackingTimer = window.setInterval(flushPlayTime, 15_000);
    renderSummary();
    void loadDefinitions().then(() => render()).catch(() => render());
    scheduleEvaluate();
  }

  function companyScore(snapshot, name) {
    return Math.max(0, Number(snapshot.companyScores?.[name]) || 0);
  }

  function milestoneWallet(snapshot, day) {
    const key = day === 100 ? "walletAtDay100" : "walletAtDay200";
    const recorded = Number(snapshot.progress?.[key]);
    const recordedValue = Number.isFinite(recorded) ? Math.max(0, recorded) : 0;
    const liveValue = Number(snapshot.day) === day ? Math.max(0, Number(snapshot.walletValue) || 0) : 0;
    return Math.max(recordedValue, liveValue);
  }

  function loadState() {
    try {
      return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));
    } catch (error) {
      console.error("업적 기록을 불러오지 못했습니다.", error);
      return normalizeState();
    }
  }

  function normalizeState(value = {}) {
    const unlocked = {};
    Object.entries(value?.unlocked || {}).forEach(([id, record]) => {
      const normalizedId = String(id || "").trim();
      if (!normalizedId || !record || typeof record !== "object") return;
      unlocked[normalizedId] = {
        unlockedAt: String(record.unlockedAt || ""),
        characterId: String(record.characterId || ""),
        characterName: String(record.characterName || ""),
        day: Math.max(1, Math.trunc(Number(record.day) || 1))
      };
    });
    return {
      schemaVersion: 1,
      totalPlayMilliseconds: Math.max(0, Math.trunc(Number(value?.totalPlayMilliseconds) || 0)),
      highestPeddlerLevel: Math.max(1, Math.trunc(Number(value?.highestPeddlerLevel) || 1)),
      highestCompanionLevel: Math.max(1, Math.trunc(Number(value?.highestCompanionLevel) || 1)),
      unlocked
    };
  }

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("업적 기록을 저장하지 못했습니다.", error);
    }
  }

  async function loadDefinitions() {
    if (definitions.length) return definitions;
    if (definitionsPromise) return definitionsPromise;
    definitionsPromise = window.ProjectWData.loadCsv(DATA_URL).then(rows => {
      definitions = rows.map(row => ({
        id: readColumn(row, "ID"),
        name: readColumn(row, "업적명"),
        condition: readColumn(row, "표기 조건")
      })).filter(entry => entry.id && entry.name && CHECKS.has(entry.id));
      if (!definitions.length) throw new Error("Achievements 시트에 사용할 수 있는 업적이 없습니다.");
      return definitions;
    }).catch(error => {
      definitions = [];
      console.error("Achievements 시트를 불러오지 못했습니다.", error);
      throw error;
    }).finally(() => { definitionsPromise = null; });
    return definitionsPromise;
  }

  function readColumn(row, name) {
    const key = Object.keys(row || {}).find(candidate => candidate.trim() === name);
    return key ? String(row[key] ?? "").trim() : "";
  }

  function shouldTrack() {
    return document.visibilityState !== "hidden" && Boolean(isGameplayActive());
  }

  function flushPlayTime() {
    const now = Date.now();
    const elapsed = Math.max(0, Math.min(60_000, now - trackingUpdatedAt));
    if (trackingActive && elapsed) {
      state.totalPlayMilliseconds += elapsed;
      persistState();
    }
    trackingUpdatedAt = now;
    trackingActive = shouldTrack();
    if (isOpen()) renderSummary();
  }

  async function open() {
    if (!elements.modal) return;
    flushPlayTime();
    elements.modal.hidden = false;
    window.ProjectWAudio?.playEffect?.("paper");
    await evaluate();
    render();
  }

  function close() {
    if (!isOpen()) return;
    elements.modal.hidden = true;
    window.ProjectWAudio?.playEffect?.("paper");
  }

  function isOpen() {
    return Boolean(elements.modal && !elements.modal.hidden);
  }

  function scheduleEvaluate() {
    window.clearTimeout(evaluationTimer);
    evaluationTimer = window.setTimeout(() => void evaluate(), 120);
  }

  async function evaluate() {
    let catalog;
    try {
      catalog = await loadDefinitions();
    } catch (error) {
      render();
      return [];
    }
    const snapshot = await getCharacterSnapshot();
    if (!snapshot?.characterId) {
      renderSummary();
      return [];
    }
    state.highestPeddlerLevel = Math.max(state.highestPeddlerLevel, Math.trunc(Number(snapshot.peddlerLevel) || 1));
    state.highestCompanionLevel = Math.max(state.highestCompanionLevel, Math.trunc(Number(snapshot.companionLevel) || 1));
    const unlockedNow = [];
    catalog.forEach(definition => {
      if (state.unlocked[definition.id]) return;
      const check = CHECKS.get(definition.id);
      if (!check || !check(snapshot)) return;
      state.unlocked[definition.id] = {
        unlockedAt: new Date().toISOString(),
        characterId: snapshot.characterId,
        characterName: snapshot.characterName || "이름 없는 행상인",
        day: Math.max(1, Math.trunc(Number(snapshot.day) || 1))
      };
      unlockedNow.push(definition);
    });
    persistState();
    renderSummary();
    if (isOpen()) render();
    unlockedNow.forEach(definition => notify(definition.name, "achievement"));
    return unlockedNow;
  }

  function renderSummary() {
    const unlockedCount = definitions.length
      ? definitions.filter(entry => state.unlocked[entry.id]).length
      : Object.keys(state.unlocked).filter(id => CHECKS.has(id)).length;
    if (elements.playTime) elements.playTime.textContent = formatDuration(state.totalPlayMilliseconds);
    if (elements.highestPeddler) elements.highestPeddler.textContent = `${state.highestPeddlerLevel}레벨`;
    if (elements.highestCompanion) elements.highestCompanion.textContent = `${state.highestCompanionLevel}레벨`;
    if (elements.totalCount) elements.totalCount.textContent = `${unlockedCount} / ${definitions.length || CHECKS.size}`;
    if (elements.toolbarCount) elements.toolbarCount.textContent = String(unlockedCount);
  }

  function render() {
    renderSummary();
    if (!elements.grid || !elements.status) return;
    if (!definitions.length) {
      elements.status.textContent = "Achievements 시트를 불러오지 못했습니다. 연결 상태를 확인한 뒤 다시 열어 주세요.";
      elements.grid.replaceChildren();
      return;
    }
    const unlockedCount = definitions.filter(entry => state.unlocked[entry.id]).length;
    elements.status.textContent = `한 캐릭터가 조건을 달성하면 전체 플레이 기록에 남습니다. ${unlockedCount}개를 달성했습니다.`;
    elements.grid.replaceChildren(...definitions.map(definition => {
      const record = state.unlocked[definition.id];
      const article = document.createElement("article");
      article.className = `achievement-entry ${record ? "is-unlocked" : "is-locked"}`;
      const name = document.createElement("strong");
      name.textContent = record ? definition.name : "???";
      const condition = document.createElement("p");
      condition.textContent = definition.condition;
      article.append(name, condition);
      if (record) {
        const earned = document.createElement("span");
        earned.textContent = `${record.characterName} · ${record.day}일차 달성`;
        article.append(earned);
      }
      return article;
    }));
  }

  function formatDuration(milliseconds) {
    const totalMinutes = Math.floor(Math.max(0, Number(milliseconds) || 0) / 60_000);
    const days = Math.floor(totalMinutes / 1_440);
    const hours = Math.floor((totalMinutes % 1_440) / 60);
    const minutes = totalMinutes % 60;
    return `${days ? `${days}일 ` : ""}${hours}시간 ${minutes}분`;
  }

  window.ProjectWAchievements = {
    init,
    open,
    close,
    isOpen,
    evaluate,
    scheduleEvaluate,
    flushPlayTime
  };
}());
