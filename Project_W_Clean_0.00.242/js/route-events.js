(function exposeRouteEvents() {
  const STATE_SCHEMA_VERSION = 4;
  const BASE_EVENT_CHANCE = 0.25;
  const WOLF_EVENT_IDS = ["R_E_002", "R_E_003", "R_E_004"];

  let dataUrl = "";
  let getState = () => null;
  let setState = () => {};
  let getContext = () => ({});
  let canTrigger = () => true;
  let pauseTravel = () => {};
  let resumeTravel = () => {};
  let persist = () => {};
  let refresh = () => {};
  let changeMood = () => 0;
  let changeHorse = () => {};
  let changeWagon = () => {};
  let addCompanionExperience = () => 0;
  let removePartnerStatus = () => false;
  let advanceWorldTime = () => {};
  let damageRandomCargo = () => ({ affected: 0, discarded: 0 });
  let consumeJerky = () => 0;
  let prepareCurrencyData = async () => {};
  let prepareAssetData = async () => {};
  let getCurrencyCapacity = () => 0;
  let getAssetUrl = () => "";
  let autoPayCurrency = () => ({ paid: 0, required: 0 });
  let gainRegionalCurrency = () => ({ value: 0, name: "화폐" });
  let addTravelDelay = () => {};
  let openDemandPayment = async () => false;
  let notify = () => {};
  let onResolved = () => {};
  let consumeSpiritProtection = () => false;
  let playSpiritProtectionFlash = async () => {};

  let loadPromise = null;
  let definitions = [];
  let definitionsById = new Map();
  let elements = {};
  let applying = false;

  function init(options = {}) {
    dataUrl = String(options.dataUrl || dataUrl);
    getState = typeof options.getState === "function" ? options.getState : getState;
    setState = typeof options.setState === "function" ? options.setState : setState;
    getContext = typeof options.getContext === "function" ? options.getContext : getContext;
    canTrigger = typeof options.canTrigger === "function" ? options.canTrigger : canTrigger;
    pauseTravel = typeof options.pauseTravel === "function" ? options.pauseTravel : pauseTravel;
    resumeTravel = typeof options.resumeTravel === "function" ? options.resumeTravel : resumeTravel;
    persist = typeof options.persist === "function" ? options.persist : persist;
    refresh = typeof options.refresh === "function" ? options.refresh : refresh;
    changeMood = typeof options.changeMood === "function" ? options.changeMood : changeMood;
    changeHorse = typeof options.changeHorse === "function" ? options.changeHorse : changeHorse;
    changeWagon = typeof options.changeWagon === "function" ? options.changeWagon : changeWagon;
    addCompanionExperience = typeof options.addCompanionExperience === "function" ? options.addCompanionExperience : addCompanionExperience;
    removePartnerStatus = typeof options.removePartnerStatus === "function" ? options.removePartnerStatus : removePartnerStatus;
    advanceWorldTime = typeof options.advanceWorldTime === "function" ? options.advanceWorldTime : advanceWorldTime;
    damageRandomCargo = typeof options.damageRandomCargo === "function" ? options.damageRandomCargo : damageRandomCargo;
    consumeJerky = typeof options.consumeJerky === "function" ? options.consumeJerky : consumeJerky;
    prepareCurrencyData = typeof options.prepareCurrencyData === "function" ? options.prepareCurrencyData : prepareCurrencyData;
    prepareAssetData = typeof options.prepareAssetData === "function" ? options.prepareAssetData : prepareAssetData;
    getCurrencyCapacity = typeof options.getCurrencyCapacity === "function" ? options.getCurrencyCapacity : getCurrencyCapacity;
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    autoPayCurrency = typeof options.autoPayCurrency === "function" ? options.autoPayCurrency : autoPayCurrency;
    gainRegionalCurrency = typeof options.gainRegionalCurrency === "function" ? options.gainRegionalCurrency : gainRegionalCurrency;
    addTravelDelay = typeof options.addTravelDelay === "function" ? options.addTravelDelay : addTravelDelay;
    openDemandPayment = typeof options.openDemandPayment === "function" ? options.openDemandPayment : openDemandPayment;
    notify = typeof options.notify === "function" ? options.notify : notify;
    onResolved = typeof options.onResolved === "function" ? options.onResolved : onResolved;
    consumeSpiritProtection = typeof options.consumeSpiritProtection === "function" ? options.consumeSpiritProtection : consumeSpiritProtection;
    playSpiritProtectionFlash = typeof options.playSpiritProtectionFlash === "function" ? options.playSpiritProtectionFlash : playSpiritProtectionFlash;
    elements = {
      layer: document.querySelector("#route-event-modal"),
      card: document.querySelector("#route-event-card"),
      category: document.querySelector("#route-event-category"),
      title: document.querySelector("#route-event-title"),
      location: document.querySelector("#route-event-location"),
      visual: document.querySelector("#route-event-visual"),
      image: document.querySelector("#route-event-image"),
      description: document.querySelector("#route-event-description"),
      effect: document.querySelector("#route-event-effect"),
      confirm: document.querySelector("#route-event-confirm")
    };
    elements.confirm?.addEventListener("click", confirmPendingEvent);
    elements.image?.addEventListener("load", () => {
      delete elements.image.dataset.failedSource;
      const source = elements.image.dataset.requestedSource || "";
      if (source) revealEventAsset(source);
    });
    elements.image?.addEventListener("error", () => {
      elements.image.dataset.failedSource = elements.image.dataset.requestedSource || elements.image.currentSrc || elements.image.src || "";
      hideEventAsset();
    });
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !isOpen()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  }

  async function load() {
    if (definitions.length) return true;
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      try {
        const rows = await window.ProjectWData.loadCsv(dataUrl);
        definitions = rows.map(parseDefinition).filter(event => event.id);
        definitionsById = new Map(definitions.map(event => [event.id, event]));
        return definitions.length > 0;
      } catch (error) {
        console.error(error);
        loadPromise = null;
        return false;
      }
    })();
    return loadPromise;
  }

  function parseDefinition(row) {
    return {
      id: text(row.ID),
      name: text(row["이름"]) || "이름 없는 경로 사건",
      category: text(row["분류"]) || "일반",
      assetId: text(row["에셋"]),
      conditions: {
        region: list(row["발생 지역 조건"]),
        terrain: list(row["발생 지형 조건"]),
        environment: list(row["발생 환경 조건"]),
        weather: list(row["발생 기후"]),
        season: list(row["발생 계절"])
      },
      weights: {
        route: weightRule(row["경로 플러스"]),
        region: weightPair(row["지역 플러스"], row["지역 마이너스"]),
        terrain: weightPair(row["지형 플러스"], row["지형 마이너스"]),
        environment: weightPair(row["환경 플러스"], row["환경 마이너스"]),
        weather: weightPair(row["기후 플러스"], row["기후 마이너스"]),
        season: weightPair(row["계절 플러스"], row["계절 마이너스"]),
        stability: number(row["안정도 보정"]),
        security: number(row["치안 보정"]) || (text(row.ID) === "R_E_001" ? 2 : 0)
      },
      cooldown: Math.max(0, integer(row["재발대기"], 0)),
      description: text(row["효과 설명"]),
      developer: text(row["개발자용 설명"])
    };
  }

  function createState() {
    return {
      schemaVersion: STATE_SCHEMA_VERSION,
      cooldowns: {},
      pending: null,
      forcedEventIds: [],
      speedEffects: [],
      deteriorationEffects: [],
      occurrenceEffects: [],
      campComfortEffects: [],
      destinationTariffDiscount: null
    };
  }

  function normalizeState(value) {
    const source = value && typeof value === "object" ? value : {};
    const result = createState();
    Object.entries(source.cooldowns || {}).forEach(([id, remaining]) => {
      const times = Math.max(0, integer(remaining, 0));
      if (times) result.cooldowns[id] = times;
    });
    if (source.pending && typeof source.pending === "object" && text(source.pending.eventId)) {
      result.pending = {
        eventId: text(source.pending.eventId),
        context: normalizeContext(source.pending.context),
        automaticPaymentValue: Math.max(0, number(source.pending.automaticPaymentValue)),
        cooldownOverride: Math.max(0, integer(source.pending.cooldownOverride, 0)),
        source: text(source.pending.source),
        protectionPhase: ["guardian", "result"].includes(source.pending.protectionPhase) ? source.pending.protectionPhase : "",
        protectionApplied: Boolean(source.pending.protectionApplied),
        resultNotices: array(source.pending.resultNotices).map(String).filter(Boolean)
      };
    }
    result.forcedEventIds = array(source.forcedEventIds).map(String).filter(Boolean);
    result.speedEffects = array(source.speedEffects).map(effect => ({
      percent: number(effect?.percent),
      remainingDots: Math.max(0, integer(effect?.remainingDots, 0)),
      destinationId: text(effect?.destinationId)
    })).filter(effect => effect.percent && (effect.remainingDots || effect.destinationId));
    result.deteriorationEffects = array(source.deteriorationEffects).map(effect => ({
      kind: effect?.kind === "fresh" ? "fresh" : "breakage",
      maximum: number(effect?.maximum),
      remainingDots: Math.max(0, integer(effect?.remainingDots, 0))
    })).filter(effect => effect.maximum && effect.remainingDots);
    result.occurrenceEffects = array(source.occurrenceEffects).map(effect => ({
      points: number(effect?.points),
      remainingDots: Math.max(0, integer(effect?.remainingDots, 0))
    })).filter(effect => effect.points && effect.remainingDots);
    result.campComfortEffects = array(source.campComfortEffects).map(number).filter(Boolean);
    if (source.destinationTariffDiscount && typeof source.destinationTariffDiscount === "object") {
      const percent = Math.max(0, number(source.destinationTariffDiscount.percent));
      if (percent) result.destinationTariffDiscount = {
        percent,
        destinationId: text(source.destinationTariffDiscount.destinationId)
      };
    }
    return result;
  }

  function currentState() {
    return normalizeState(getState());
  }

  function storeState(state) {
    setState(normalizeState(state));
  }

  function advanceTime() {
    const state = currentState();
    let changed = false;
    Object.keys(state.cooldowns).forEach(id => {
      state.cooldowns[id] -= 1;
      if (state.cooldowns[id] <= 0) delete state.cooldowns[id];
      changed = true;
    });
    if (changed) storeState(state);
  }

  function completeDotArrival() {
    const state = currentState();
    const decrement = key => {
      state[key] = state[key].map(effect => ({ ...effect, remainingDots: effect.remainingDots - 1 }))
        .filter(effect => effect.remainingDots > 0);
    };
    decrement("speedEffects");
    decrement("deteriorationEffects");
    storeState(state);
  }

  async function rollAtDot(context = getContext()) {
    const normalized = normalizeContext(context);
    if (!normalized.placementId || normalized.isNode || !canTrigger() || currentState().pending) return null;
    if (!await load()) return null;
    try {
      await Promise.all([prepareCurrencyData(), prepareAssetData()]);
    } catch (error) {
      console.error(error);
    }
    const state = currentState();
    const occurrencePoints = state.occurrenceEffects.reduce((sum, effect) => sum + effect.points, 0);
    const forced = state.forcedEventIds.length > 0;
    const passesChance = forced || Math.random() < clamp(BASE_EVENT_CHANCE + (occurrencePoints / 100), 0, 1);
    state.occurrenceEffects = state.occurrenceEffects
      .map(effect => ({ ...effect, remainingDots: effect.remainingDots - 1 }))
      .filter(effect => effect.remainingDots > 0);
    if (!passesChance) {
      storeState(state);
      return null;
    }
    const event = selectEvent(state, normalized, forced);
    if (!event) {
      if (forced) state.forcedEventIds = [];
      storeState(state);
      return null;
    }
    if (forced) state.forcedEventIds = [];
    const paymentRange = automaticPaymentRange(event.developer);
    state.pending = {
      eventId: event.id,
      context: normalized,
      automaticPaymentValue: paymentRange ? randomInteger(paymentRange.minimum, paymentRange.maximum) : 0,
      cooldownOverride: 0,
      source: ""
    };
    storeState(state);
    renderPending(event, normalized, state.pending);
    return event;
  }

  async function rollForcedAtDot(eventId, context = getContext(), options = {}) {
    const normalized = normalizeContext(context);
    if (!normalized.placementId || normalized.isNode || !canTrigger() || currentState().pending) return null;
    if (!await load()) return null;
    const event = definitionsById.get(text(eventId));
    if (!event || !isUnlockedForDay(event, normalized.worldDay)) return null;
    try {
      await Promise.all([prepareCurrencyData(), prepareAssetData()]);
    } catch (error) {
      console.error(error);
    }
    const state = currentState();
    const paymentRange = automaticPaymentRange(event.developer);
    state.pending = {
      eventId: event.id,
      context: normalized,
      automaticPaymentValue: paymentRange ? randomInteger(paymentRange.minimum, paymentRange.maximum) : 0,
      cooldownOverride: Math.max(0, integer(options.cooldown, 0)),
      source: text(options.source)
    };
    storeState(state);
    renderPending(event, normalized, state.pending);
    return event;
  }

  function selectEvent(state, context, forced) {
    const pool = forced
      ? state.forcedEventIds.map(id => definitionsById.get(id)).filter(Boolean)
      : definitions;
    const candidates = pool.flatMap(event => {
      if ((!forced && (event.id === "R_E_007" || WOLF_EVENT_IDS.includes(event.id) || state.cooldowns[event.id] > 0))
        || !isUnlockedForDay(event, context.worldDay)
        || !matchesConditions(event, context)
        || !specialAvailability(event)) return [];
      const weight = eventWeight(event, context);
      return weight > 0 ? [{ event, weight }] : [];
    });
    if (!candidates.length) return null;
    let roll = Math.random() * candidates.reduce((sum, candidate) => sum + candidate.weight, 0);
    for (const candidate of candidates) {
      roll -= candidate.weight;
      if (roll <= 0) return candidate.event;
    }
    return candidates.at(-1)?.event || null;
  }

  function matchesConditions(event, context) {
    const values = {
      region: [context.region],
      terrain: context.terrains,
      environment: context.environments,
      weather: [context.weather],
      season: [context.season]
    };
    return Object.entries(event.conditions).every(([key, required]) => !required.length || intersects(required, values[key]));
  }

  function specialAvailability(event) {
    if (event.id !== "R_E_004") return true;
    return window.ProjectWCargo?.getItemQuantity?.("G_0269") > 0 || window.ProjectWCargo?.getItemQuantity?.("G_0270") > 0;
  }

  function isUnlockedForDay(event, worldDay) {
    const day = Math.max(1, Math.trunc(Number(worldDay) || 1));
    if (event.id === "R_E_007") return day >= 30;
    if (/^R_E_00[1-6]$/.test(event.id)) return day >= 7;
    return true;
  }

  function eventWeight(event, context) {
    const values = {
      route: [context.routeName],
      region: [context.region],
      terrain: context.terrains,
      environment: context.environments,
      weather: [context.weather],
      season: [context.season]
    };
    const activeConditions = Object.entries(values)
      .filter(([key]) => key !== "route")
      .flatMap(([, entries]) => entries);
    let weight = 3;
    const routeRule = event.weights.route;
    if (routeRule.amount && intersects(routeRule.values, values.route)) weight += routeRule.amount;
    ["region", "terrain", "environment", "weather", "season"].forEach(key => {
      const pair = event.weights[key];
      if (pair.plus.amount && intersects(pair.plus.values, activeConditions)) weight += pair.plus.amount;
      if (pair.minus.amount && intersects(pair.minus.values, activeConditions)) weight -= pair.minus.amount;
    });
    const conditionDelta = (stabilityBand(context.stability) * number(event.weights.stability))
      + (securityBand(context.security) * number(event.weights.security));
    weight += clamp(conditionDelta, -4, 4);
    return Math.max(0, weight);
  }

  function stabilityBand(value) {
    const stability = clamp(value, 0, 100);
    if (stability <= 19) return -2;
    if (stability <= 39) return -1;
    if (stability <= 60) return 0;
    if (stability <= 80) return 1;
    return 2;
  }

  function securityBand(value) {
    const security = clamp(value, 0, 100);
    if (security <= 19) return -2;
    if (security <= 39) return -1;
    if (security <= 60) return 0;
    if (security <= 80) return 1;
    return 2;
  }

  async function restorePending() {
    const state = currentState();
    if (!state.pending) return false;
    if (!await load()) {
      state.pending = null;
      storeState(state);
      persist();
      notify("경로 이벤트 데이터를 불러오지 못해 해당 이벤트를 건너뜁니다.");
      closeAndResume();
      return false;
    }
    try {
      await Promise.all([prepareCurrencyData(), prepareAssetData()]);
    } catch (error) {
      console.error(error);
    }
    const event = definitionsById.get(state.pending.eventId);
    if (!event) {
      state.pending = null;
      storeState(state);
      persist();
      notify("저장된 경로 이벤트를 찾지 못해 해당 이벤트를 건너뜁니다.");
      closeAndResume();
      return false;
    }
    const paymentRange = automaticPaymentRange(event.developer);
    if (paymentRange && !(state.pending.automaticPaymentValue > 0)) {
      state.pending.automaticPaymentValue = randomInteger(paymentRange.minimum, paymentRange.maximum);
      storeState(state);
    }
    pauseTravel("route-event");
    renderPending(event, state.pending.context, state.pending);
    return true;
  }

  function renderPending(event, context, pending = currentState().pending) {
    if (!elements.layer) return;
    if (pending?.protectionPhase === "guardian") {
      renderGuardianCard(context);
      return;
    }
    if (pending?.protectionPhase === "result") {
      renderWolfResultCard(event, context, pending);
      return;
    }
    const payment = automaticPaymentStatus(event, context, pending);
    elements.card.dataset.category = event.category;
    elements.card.classList.toggle("is-condition-unmet", Boolean(payment?.unmet));
    elements.category.textContent = event.category === "도적" ? "길을 막아선 자들" : event.category === "늑대" ? "길 위의 위협" : "경로에서 일어난 일";
    elements.title.textContent = event.name;
    elements.location.textContent = [context.routeName, context.placementName].filter(Boolean).join(" · ") || "이동 중";
    renderEventAsset(event);
    renderBracketText(elements.description, event.description);
    elements.effect.textContent = payment?.unmet
      ? `필요 화폐 가치 ${formatNumber(payment.required)} · 보유 화폐 가치 ${formatNumber(payment.capacity)}`
      : payment
        ? `화폐 가치 ${formatNumber(payment.required)} 지불 · ${readableEffect(event)}`
        : readableEffect(event);
    elements.confirm.textContent = payment?.unmet ? "조건 미충족" : event.category === "도적" ? "요구를 듣는다" : "확인";
    elements.confirm.dataset.conditionUnmet = payment?.unmet ? "true" : "false";
    elements.confirm.disabled = false;
    applying = false;
    elements.layer.hidden = false;
    refresh();
    requestAnimationFrame(() => elements.confirm.focus());
  }

  function renderGuardianCard(context) {
    const guardian = {
      category: "수호",
      name: "나하나의 수호",
      assetId: "Asset_Event_20",
      description: "나하나의 눈이 금빛으로 빛나며 늑대를 향해 뻗은 손에서 청아한 빛이 부드럽게 퍼져나갑니다. 빛에 닿은 늑대들이 낑낑대며 경계하다가 반대편으로 도망칩니다. 이마의 땀을 닦아낸 나하나가 안도의 한숨을 쉬어보입니다. <br><br>[\"완전히 막아내진 못했지만, 도움이 되었지?\"]"
    };
    elements.card.dataset.category = guardian.category;
    elements.card.classList.remove("is-condition-unmet");
    elements.category.textContent = "정령력이 길 위의 위협을 밀어냅니다";
    elements.title.textContent = guardian.name;
    elements.location.textContent = [context.routeName, context.placementName].filter(Boolean).join(" · ") || "이동 중";
    renderEventAsset(guardian);
    renderBracketText(elements.description, guardian.description);
    elements.effect.textContent = "정령력 1 소모 · 늑대 습격 피해 완화";
    elements.confirm.textContent = "피해 확인";
    elements.confirm.dataset.conditionUnmet = "false";
    elements.confirm.disabled = false;
    applying = false;
    elements.layer.hidden = false;
    refresh();
    requestAnimationFrame(() => elements.confirm.focus());
  }

  function renderWolfResultCard(event, context, pending) {
    const notices = array(pending?.resultNotices).filter(Boolean);
    const resultEvent = {
      category: "늑대",
      name: "늑대 습격의 피해",
      assetId: event.assetId,
      description: notices.length
        ? notices.join("<br>")
        : "늑대 무리가 물러났습니다. 피해 상황을 확인했습니다."
    };
    elements.card.dataset.category = resultEvent.category;
    elements.card.classList.remove("is-condition-unmet");
    elements.category.textContent = pending?.protectionApplied ? "나하나의 수호가 피해를 줄였습니다" : "길 위의 위협";
    elements.title.textContent = resultEvent.name;
    elements.location.textContent = [context.routeName, context.placementName].filter(Boolean).join(" · ") || "이동 중";
    renderEventAsset(resultEvent);
    renderBracketText(elements.description, resultEvent.description);
    elements.effect.textContent = pending?.protectionApplied ? "완화된 피해가 적용되었습니다." : "습격 피해가 적용되었습니다.";
    elements.confirm.textContent = "계속 이동";
    elements.confirm.dataset.conditionUnmet = "false";
    elements.confirm.disabled = false;
    applying = false;
    elements.layer.hidden = false;
    refresh();
    requestAnimationFrame(() => elements.confirm.focus());
  }

  function renderEventAsset(event) {
    const source = event?.assetId ? text(getAssetUrl(event.assetId)) : "";
    const failed = source && elements.image?.dataset.failedSource === source;
    if (!source || failed || !elements.visual || !elements.image) {
      hideEventAsset();
      return;
    }
    hideEventAsset();
    elements.image.dataset.requestedSource = source;
    if (elements.image.getAttribute("src") !== source) elements.image.setAttribute("src", source);
    if (elements.image.complete && elements.image.naturalWidth > 0) revealEventAsset(source);
  }

  function revealEventAsset(source) {
    if (!elements.image || elements.image.dataset.requestedSource !== source || elements.image.dataset.failedSource === source) return;
    elements.card?.classList.add("has-asset");
    if (elements.visual) elements.visual.hidden = false;
  }

  function hideEventAsset() {
    elements.card?.classList.remove("has-asset");
    if (elements.visual) elements.visual.hidden = true;
  }

  function renderBracketText(container, value) {
    const fragment = document.createDocumentFragment();
    String(value || "").split(/(<br\s*\/?>|\[[^\]]+\])/gi).filter(Boolean).forEach(part => {
      if (/^<br\s*\/?>$/i.test(part)) {
        fragment.append(document.createElement("br"));
        return;
      }
      if (part.startsWith("[") && part.endsWith("]")) {
        const strong = document.createElement("strong");
        strong.textContent = part.slice(1, -1);
        fragment.append(strong);
      } else fragment.append(document.createTextNode(part));
    });
    container.replaceChildren(fragment);
  }

  function readableEffect(event) {
    if (event.category === "도적") {
      return event.id === "R_E_007" ? "쿼터 납부 화면으로 이동합니다." : "통행세 납부 화면으로 이동합니다.";
    }
    const terms = [...event.description.matchAll(/\[([^\]]+)\]/g)].map(match => match[1].trim()).filter(Boolean);
    return terms.length ? [...new Set(terms)].join(" · ") : "확인하면 사건의 결과가 적용됩니다.";
  }

  async function confirmPendingEvent() {
    if (applying) return;
    const state = currentState();
    const event = definitionsById.get(state.pending?.eventId);
    if (!event) {
      closeAndResume();
      return;
    }
    const payment = automaticPaymentStatus(event, state.pending.context, state.pending);
    if (payment?.unmet) {
      finalizeEvent(event, {
        skipped: true,
        notices: [`${event.name}: 지불할 화폐가 부족해 효과가 적용되지 않았습니다.`]
      }, state);
      return;
    }
    applying = true;
    elements.confirm.disabled = true;
    if (["R_E_002", "R_E_003"].includes(event.id)) {
      if (state.pending.protectionPhase === "result") {
        finalizeEvent(event, { notices: [] }, state);
        return;
      }
      if (state.pending.protectionPhase === "guardian") {
        const result = applyEventEffect(event, state.pending.context, state, { protectedBySpirit: true });
        state.pending.protectionPhase = "result";
        state.pending.resultNotices = result.notices;
        storeState(state);
        persist();
        renderPending(event, state.pending.context, state.pending);
        return;
      }
      const protectedBySpirit = Boolean(consumeSpiritProtection(event.id));
      if (protectedBySpirit) {
        state.pending.protectionApplied = true;
        state.pending.protectionPhase = "guardian";
        storeState(state);
        persist();
        await playSpiritProtectionFlash();
        renderPending(event, state.pending.context, state.pending);
        return;
      }
      const result = applyEventEffect(event, state.pending.context, state, { protectedBySpirit: false });
      state.pending.protectionPhase = "result";
      state.pending.resultNotices = result.notices;
      storeState(state);
      persist();
      renderPending(event, state.pending.context, state.pending);
      return;
    }
    if (event.category === "도적") {
      elements.layer.hidden = true;
      const percentage = event.id === "R_E_007" ? 25 : 10;
      const allowCargo = event.id !== "R_E_005";
      let opened = false;
      try {
        opened = await openDemandPayment({
          event,
          percentage,
          allowCargo,
          context: state.pending.context,
          onPaid: result => finalizeEvent(event, result)
        });
      } catch (error) {
        console.error(error);
      }
      if (!opened) {
        elements.layer.hidden = false;
        elements.confirm.disabled = false;
        applying = false;
      }
      return;
    }
    const result = applyEventEffect(event, state.pending.context, state);
    finalizeEvent(event, result, state);
  }

  function applyEventEffect(event, context, suppliedState = currentState(), options = {}) {
    const state = suppliedState;
    const detail = event.developer;
    const notices = [];
    if (event.id === "R_E_001") state.forcedEventIds = [...WOLF_EVENT_IDS];
    if (event.id === "R_E_002") {
      const count = centeredInteger(1, 9, 5);
      const maximumDamage = options.protectedBySpirit ? 20 : 40;
      const result = damageRandomCargo(count, 10, maximumDamage, { excludeProtected: true });
      notices.push(`화물 ${result.affected || 0}종의 열화내구도가 10~${maximumDamage}% 감소했습니다${result.discarded ? ` · ${result.discarded}종 폐기` : ""}.`);
    }
    if (event.id === "R_E_003" && options.protectedBySpirit) {
      changeHorse({ health: -10, hunger: -10 });
      notices.push("말 체력 10 감소 · 말 허기 10 감소");
    }
    if (event.id === "R_E_004") {
      const consumed = consumeJerky();
      notices.push(`육포 ${consumed}개를 잃었습니다.`);
    }
    if (!["R_E_002", "R_E_004"].includes(event.id) && !(event.id === "R_E_003" && options.protectedBySpirit)) {
      applyParsedEffects(detail, context, state, notices, state.pending?.automaticPaymentValue);
    }
    storeState(state);
    return { notices };
  }

  function applyParsedEffects(detail, context, state, notices, automaticPaymentValue = 0) {
    const horseHealth = actionAmount(detail, /말\s*(?:의\s*)?(?:체력|체력)\s*(\d+(?:\.\d+)?)\s*(회복|감소)/);
    const horseHunger = actionAmount(detail, /말\s*(?:의\s*)?(?:허기|허기)\s*(\d+(?:\.\d+)?)\s*(회복|감소)/);
    if (horseHealth || horseHunger) changeHorse({ health: horseHealth, hunger: horseHunger });
    if (horseHealth) notices.push(`말 체력 ${Math.abs(horseHealth)} ${horseHealth < 0 ? "감소" : "회복"}`);
    if (horseHunger) notices.push(`말 허기 ${Math.abs(horseHunger)} ${horseHunger < 0 ? "감소" : "회복"}`);
    const mood = actionAmount(detail, /나하나\s*(?:의\s*)?기분\s*(\d+(?:\.\d+)?)\s*(회복|감소)/);
    if (mood) changeMood(mood);
    const wagon = actionAmount(detail, /짐마차\s*내구도\s*(\d+(?:\.\d+)?)\s*(회복|감소)/);
    if (wagon) changeWagon(wagon);

    const speedDots = detail.match(/다음\s*(\d+)개\s*Dot\s*이동속도([+-]\d+)%/i);
    if (speedDots) state.speedEffects.push({ percent: number(speedDots[2]), remainingDots: integer(speedDots[1], 1), destinationId: "" });
    const destinationSpeed = detail.match(/다음\s*목적지\s*도착까지\s*이동속도([+-]\d+)%/);
    if (destinationSpeed) state.speedEffects.push({ percent: number(destinationSpeed[1]), remainingDots: 0, destinationId: context.destinationId });

    const breakage = detail.match(/다음\s*(\d+)개\s*Dot\s*열화_파손\s*최대([+-]\d+)/);
    if (breakage) state.deteriorationEffects.push({ kind: "breakage", maximum: number(breakage[2]), remainingDots: integer(breakage[1], 1) });
    const fresh = detail.match(/(?:다음\s*(\d+)개\s*Dot\s*)?열화_신선\s*최대([+-]\d+)/);
    if (fresh) state.deteriorationEffects.push({ kind: "fresh", maximum: number(fresh[2]), remainingDots: integer(fresh[1], 1) });

    const comfort = detail.match(/다음\s*야영\s*1회\s*안락도([+-]\d+)/);
    if (comfort) state.campComfortEffects.push(number(comfort[1]));
    const occurrence = detail.match(/다음\s*(\d+)개\s*Dot\s*R_Events\s*발생\s*확률([+-]\d+)%p/i);
    if (occurrence) state.occurrenceEffects.push({ points: number(occurrence[2]), remainingDots: integer(occurrence[1], 1) });
    const delay = detail.match(/다음\s*1개\s*Dot\s*실제\s*이동\s*소요시간\+(\d+)초/);
    if (delay) addTravelDelay(integer(delay[1], 0) * 1000);
    const tariff = detail.match(/다음\s*목적지\s*입장\s*관세\s*최종\s*청구액-(\d+)%/);
    if (tariff) state.destinationTariffDiscount = { percent: number(tariff[1]), destinationId: context.destinationId };

    if (/1타임\s*경과/.test(detail)) {
      advanceWorldTime();
      state.cooldowns = currentState().cooldowns;
    }
    const companionExperience = detail.match(/동행\s*경험치\s*(\d+)\s*획득/);
    if (companionExperience) addCompanionExperience(number(companionExperience[1]), "경로 이벤트");
    if (/감기\s*기운\s*또는\s*식은\s*몸\s*중\s*하나\s*제거/.test(detail)) {
      if (!removePartnerStatus("N_S_024") && !removePartnerStatus("N_S_014")) changeMood(5);
    }
    const cargoDamage = detail.match(/무작위\s*화물\s*(\d+)종의\s*열화내구도\s*(\d+(?:\.\d+)?)%\s*감소/);
    if (cargoDamage) damageRandomCargo(integer(cargoDamage[1], 1), number(cargoDamage[2]), number(cargoDamage[2]));

    const payment = automaticPaymentRange(detail);
    if (payment) {
      const required = automaticPaymentValue > 0
        ? automaticPaymentValue
        : randomInteger(payment.minimum, payment.maximum);
      const result = autoPayCurrency(required, context.region);
      notices.push(`화폐 가치 ${formatNumber(result.paid || 0)}을 지불했습니다.`);
    }
    const gain = detail.match(/현재\s*지역\s*화폐\s*중\s*하나를\s*가치\s*(\d+)에서\s*(\d+)만큼\s*획득/);
    if (gain) {
      const minimum = number(gain[1]);
      const maximum = number(gain[2]);
      const target = randomInteger(minimum, maximum);
      const result = gainRegionalCurrency(target, context.region, minimum, maximum);
      notices.push(`${result.name || "화폐"} 가치 ${formatNumber(result.value || 0)}을 획득했습니다.`);
    }
  }

  function finalizeEvent(event, result = {}, suppliedState = null) {
    const state = suppliedState || currentState();
    const cooldownOverride = Math.max(0, integer(state.pending?.cooldownOverride, 0));
    state.cooldowns[event.id] = cooldownOverride || Math.max(0, event.cooldown);
    state.pending = null;
    storeState(state);
    persist();
    refresh();
    onResolved(event, result);
    closeAndResume();
    const messages = array(result?.notices).filter(Boolean);
    if (messages.length) notify(messages.join(" "));
  }

  function closeAndResume() {
    applying = false;
    if (elements.layer) elements.layer.hidden = true;
    elements.card?.classList.remove("is-condition-unmet");
    resumeTravel("route-event");
    refresh();
  }

  function getSpeedPercent(destinationId = "") {
    return currentState().speedEffects.reduce((sum, effect) => {
      if (effect.destinationId && effect.destinationId !== String(destinationId || "")) return sum;
      return sum + effect.percent;
    }, 0);
  }

  function getDeteriorationModifiers() {
    return currentState().deteriorationEffects.reduce((result, effect) => {
      if (effect.kind === "fresh") result.freshMaximum += effect.maximum;
      else result.breakageMaximum += effect.maximum;
      return result;
    }, { breakageMaximum: 0, freshMaximum: 0 });
  }

  function getCampComfortBonus() {
    return currentState().campComfortEffects.reduce((sum, value) => sum + value, 0);
  }

  function consumeCampComfortBonus() {
    const state = currentState();
    const total = state.campComfortEffects.reduce((sum, value) => sum + value, 0);
    state.campComfortEffects = [];
    storeState(state);
    return total;
  }

  function getDestinationTariffMultiplier(destinationId) {
    const effect = currentState().destinationTariffDiscount;
    if (!effect || (effect.destinationId && effect.destinationId !== String(destinationId || ""))) return 1;
    return Math.max(0, 1 - (effect.percent / 100));
  }

  function consumeDestinationTariffDiscount(destinationId) {
    const state = currentState();
    const effect = state.destinationTariffDiscount;
    if (!effect || (effect.destinationId && effect.destinationId !== String(destinationId || ""))) return 0;
    state.destinationTariffDiscount = null;
    storeState(state);
    return effect.percent;
  }

  function clearDestinationEffects(destinationId) {
    const state = currentState();
    state.speedEffects = [];
    state.deteriorationEffects = [];
    state.occurrenceEffects = [];
    state.forcedEventIds = [];
    storeState(state);
  }

  function isOpen() {
    return Boolean(elements.layer && !elements.layer.hidden);
  }

  function normalizeContext(value = {}) {
    return {
      placementId: text(value.placementId),
      placementName: text(value.placementName),
      destinationId: text(value.destinationId),
      routeName: text(value.routeName),
      region: text(value.region),
      terrains: array(value.terrains).map(String),
      environments: array(value.environments).map(String),
      weather: text(value.weather),
      season: text(value.season),
      worldDay: Math.max(1, integer(value.worldDay, 1)),
      stability: Number.isFinite(Number(value.stability)) ? clamp(value.stability, 0, 100) : 50,
      security: Number.isFinite(Number(value.security)) ? clamp(value.security, 0, 100) : 50,
      isNode: Boolean(value.isNode)
    };
  }

  function weightPair(plus, minus) {
    return { plus: weightRule(plus), minus: weightRule(minus) };
  }

  function weightRule(value) {
    const input = text(value);
    if (!input) return { values: [], amount: 0 };
    const slash = input.lastIndexOf("/");
    if (slash < 0) return { values: list(input), amount: 0 };
    return { values: list(input.slice(0, slash)), amount: Math.max(0, number(input.slice(slash + 1))) };
  }

  function actionAmount(input, pattern) {
    const match = String(input || "").match(pattern);
    if (!match) return 0;
    const amount = number(match[1]);
    return match[2] === "감소" ? -amount : amount;
  }

  function automaticPaymentRange(input) {
    const match = String(input || "").match(/현재\s*지역\s*화폐\s*기준\s*가치\s*(\d+)에서\s*(\d+)(?:을|를)\s*큰\s*단위\s*화폐부터\s*자동\s*지불/);
    if (!match) return null;
    return {
      minimum: Math.max(0, number(match[1])),
      maximum: Math.max(0, number(match[2]))
    };
  }

  function automaticPaymentStatus(event, context, pending) {
    const range = automaticPaymentRange(event?.developer);
    if (!range) return null;
    const required = Math.max(0, number(pending?.automaticPaymentValue)
      || randomInteger(range.minimum, range.maximum));
    const capacity = Math.max(0, number(getCurrencyCapacity(context?.region)));
    return { required, capacity, unmet: capacity < required };
  }

  function centeredInteger(minimum, maximum, center) {
    const low = Math.ceil(Math.min(minimum, maximum));
    const high = Math.floor(Math.max(minimum, maximum));
    const middle = Math.max(low, Math.min(high, Math.round(center)));
    const radius = Math.max(middle - low, high - middle);
    const weighted = [];
    for (let value = low; value <= high; value += 1) {
      const weight = Math.max(1, (radius + 1) - Math.abs(value - middle)) ** 2;
      for (let index = 0; index < weight; index += 1) weighted.push(value);
    }
    return weighted[randomInteger(0, weighted.length - 1)];
  }

  function randomInteger(minimum, maximum) {
    const low = Math.ceil(Math.min(minimum, maximum));
    const high = Math.floor(Math.max(minimum, maximum));
    return low + Math.floor(Math.random() * ((high - low) + 1));
  }

  function intersects(left, right) {
    const values = new Set(array(right).map(value => text(value).toLowerCase()).filter(Boolean));
    return array(left).some(value => values.has(text(value).toLowerCase()));
  }

  function list(value) {
    return text(value).split(/[,·]/).map(entry => entry.trim()).filter(Boolean);
  }

  function integer(value, fallback = 0) {
    const match = String(value ?? "").match(/-?\d+/);
    return match ? Math.trunc(Number(match[0])) : fallback;
  }

  function number(value) {
    const result = Number(String(value ?? "").replaceAll(",", "").replace("%", "").trim());
    return Number.isFinite(result) ? result : 0;
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, Number(value) || 0));
  }

  function array(value) {
    return Array.isArray(value) ? value : [];
  }

  function text(value) {
    return String(value ?? "").trim();
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(Number(value) || 0);
  }

  window.ProjectWRouteEvents = {
    init,
    load,
    createState,
    normalizeState,
    advanceTime,
    completeDotArrival,
    rollAtDot,
    rollForcedAtDot,
    restorePending,
    getSpeedPercent,
    getDeteriorationModifiers,
    getCampComfortBonus,
    consumeCampComfortBonus,
    getDestinationTariffMultiplier,
    consumeDestinationTariffDiscount,
    clearDestinationEffects,
    isOpen
  };
}());
