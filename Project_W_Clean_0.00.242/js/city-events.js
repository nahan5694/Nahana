(function exposeCityEvents() {
  const STATE_SCHEMA_VERSION = 2;
  const REWARD_RESET_DAYS = 90;
  const SLOT_LAYOUTS = Object.freeze({
    "관문": ["economic", "other"],
    "마을": ["economic", "other"],
    "도시": ["economic", "economic", "other"],
    "대도시": ["economic", "economic", "other", "other"]
  });

  let dataUrl = "";
  let getState = () => null;
  let setState = () => {};
  let getWorldDay = () => 1;
  let getSeason = () => "봄";
  let getWeather = () => "맑음";
  let getSettlements = () => [];
  let changeMood = () => 0;
  let addCompanionExperience = () => 0;
  let notify = () => {};
  let onChange = () => {};
  let canPresentObservation = () => true;
  let loadPromise = null;
  let syncPromise = Promise.resolve();
  let definitions = [];
  let definitionsById = new Map();
  let loadError = "";
  let activePlacement = null;
  let observationQueue = [];
  let observationTimer = 0;
  let elements = {};

  function init(options = {}) {
    dataUrl = String(options.dataUrl || dataUrl);
    getState = typeof options.getState === "function" ? options.getState : getState;
    setState = typeof options.setState === "function" ? options.setState : setState;
    getWorldDay = typeof options.getWorldDay === "function" ? options.getWorldDay : getWorldDay;
    getSeason = typeof options.getSeason === "function" ? options.getSeason : getSeason;
    getWeather = typeof options.getWeather === "function" ? options.getWeather : getWeather;
    getSettlements = typeof options.getSettlements === "function" ? options.getSettlements : getSettlements;
    changeMood = typeof options.changeMood === "function" ? options.changeMood : changeMood;
    addCompanionExperience = typeof options.addCompanionExperience === "function"
      ? options.addCompanionExperience
      : addCompanionExperience;
    notify = typeof options.notify === "function" ? options.notify : notify;
    onChange = typeof options.onChange === "function" ? options.onChange : onChange;
    canPresentObservation = typeof options.canPresentObservation === "function"
      ? options.canPresentObservation
      : canPresentObservation;
    createModal();
    createObservationModal();
  }

  async function load() {
    if (definitions.length) return true;
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      try {
        const rows = await window.ProjectWData.loadCsv(dataUrl);
        definitions = rows.map(parseDefinition).filter(definition => definition.id);
        definitionsById = new Map(definitions.map(definition => [definition.id, definition]));
        loadError = "";
        return definitions.length > 0;
      } catch (error) {
        console.error(error);
        loadError = "도시 이벤트 시트를 불러오지 못했습니다.";
        loadPromise = null;
        return false;
      }
    })();
    return loadPromise;
  }

  function parseDefinition(row) {
    const developer = String(row["개발자용 설명"] || "").trim();
    const effect = parseEffect(developer, String(row.ID || "").trim());
    return {
      id: String(row.ID || "").trim(),
      name: String(row["이름"] || "이름 없는 사건").trim(),
      group: String(row["그룹"] || "").trim(),
      category: String(row["분류"] || "기타").trim(),
      conditions: {
        settlement: list(row["발생 거점 조건"]),
        region: list(row["발생 지역 조건"]),
        terrain: list(row["발생 지형 조건"]),
        environment: list(row["발생 환경 조건"]),
        weather: list(row["발생 기후"]),
        season: list(row["발생 계절"])
      },
      weights: {
        region: weightPair(row["지역 플러스"], row["지역 마이너스"]),
        terrain: weightPair(row["지형 플러스"], row["지형 마이너스"]),
        environment: weightPair(row["환경 플러스"], row["환경 마이너스"]),
        weather: weightPair(row["기후 플러스"], row["기후 마이너스"]),
        season: weightPair(row["계절 플러스"], row["계절 마이너스"])
      },
      duration: Math.max(1, integer(row["지속일"], 1)),
      cooldown: Math.max(0, integer(row["재발대기"], 0)),
      description: String(row["효과 설명"] || "").trim(),
      developer,
      effect
    };
  }

  function parseEffect(text, eventId) {
    const result = {
      subcategory: "",
      stock: 0,
      price: 0,
      information: {},
      lodgingMood: 0,
      lodgingFeePercent: 0,
      maintenanceFeePercent: 0,
      entryTariffPoints: 0,
      snackMaximum: 0,
      route: { speedPercent: 0, breakageMaximum: 0, freshMaximum: 0, snowPenaltyPoints: 0 },
      reward: null
    };
    const economy = text.match(/서브카테고리\s+(.+?)\s+재고([+-]\d+),\s*시세 보정([+-]\d+)%/);
    if (economy) {
      result.subcategory = economy[1].trim();
      result.stock = Number(economy[2]) || 0;
      result.price = Number(economy[3]) || 0;
    }
    const information = text.match(/이벤트 지속 중 (주점|여관|상업조합) 정보 수집 최대 횟수\+(\d+)/);
    if (information) result.information[information[1]] = Number(information[2]) || 0;
    result.lodgingMood = signedMatch(text, /여관 숙박 기분 회복([+-]\d+)/);
    result.lodgingFeePercent = signedMatch(text, /여관 숙박비 보정([+-]\d+)%/);
    result.maintenanceFeePercent = signedMatch(text, /짐마차 정비비 보정([+-]\d+)%/);
    result.entryTariffPoints = signedMatch(text, /입장 관세율([+-]\d+)%p/);
    const snack = text.match(/시장 간식 1회 최대 구매 종류\s*(\d+)/);
    if (snack) result.snackMaximum = Number(snack[1]) || 0;
    result.route.speedPercent = signedMatch(text, /모든 Dot 이동속도([+-]\d+)%/);
    result.route.breakageMaximum = signedMatch(text, /열화_파손 최대([+-]\d+)/);
    result.route.freshMaximum = signedMatch(text, /열화_신선 최대([+-]\d+)/);
    result.route.snowPenaltyPoints = signedMatch(text, /눈길 속도 감소([+-]\d+)%p/);
    const moodReward = text.match(/(?:이벤트 확인|관람) 보상:\s*나하나 기분\+(\d+)/);
    const experienceReward = text.match(/(?:이벤트 확인|관람) 보상:\s*동행 경험치\+(\d+)/);
    if (moodReward) result.reward = { type: "mood", amount: Number(moodReward[1]) || 0 };
    if (experienceReward) result.reward = { type: "experience", amount: Number(experienceReward[1]) || 0 };
    if (eventId === "C_E_090") result.reward = { type: "experience", amount: 10 };
    return result;
  }

  function signedMatch(text, expression) {
    const match = text.match(expression);
    return match ? Number(match[1]) || 0 : 0;
  }

  function list(value) {
    return String(value || "").split(",").map(entry => entry.trim()).filter(Boolean);
  }

  function weightPair(plus, minus) {
    return { plus: parseWeightRule(plus), minus: parseWeightRule(minus) };
  }

  function parseWeightRule(value) {
    const text = String(value || "").trim();
    if (!text) return { values: [], amount: 0 };
    const slash = text.lastIndexOf("/");
    if (slash < 0) return { values: list(text), amount: 0 };
    return { values: list(text.slice(0, slash)), amount: Math.max(0, Number(text.slice(slash + 1)) || 0) };
  }

  function createState(day = getWorldDay()) {
    return { schemaVersion: STATE_SCHEMA_VERSION, lastProcessedDay: Math.max(1, integer(day, 1)), settlements: {}, rewardClaims: {}, routeEffect: null };
  }

  function normalizeState(value, day = getWorldDay()) {
    const source = value && typeof value === "object" ? value : {};
    const state = createState(day);
    state.lastProcessedDay = Math.max(1, integer(source.lastProcessedDay, day));
    state.rewardClaims = source.rewardClaims && typeof source.rewardClaims === "object" ? { ...source.rewardClaims } : {};
    state.routeEffect = normalizeRouteEffect(source.routeEffect);
    if (source.settlements && typeof source.settlements === "object") {
      Object.entries(source.settlements).forEach(([id, record]) => {
        if (!record || typeof record !== "object") return;
        state.settlements[id] = {
          category: String(record.category || ""),
          revision: Math.max(0, integer(record.revision, 0)),
          cooldowns: normalizeCooldowns(record.cooldowns),
          viewedEventIds: [...new Set((Array.isArray(record.viewedEventIds) ? record.viewedEventIds : [])
            .map(value => String(value || "").trim()).filter(Boolean))],
          slots: Array.isArray(record.slots) ? record.slots.map(normalizeSlot) : []
        };
      });
    }
    return state;
  }

  function normalizeCooldowns(value) {
    const result = {};
    if (!value || typeof value !== "object") return result;
    Object.entries(value).forEach(([id, days]) => {
      const remaining = Math.max(0, integer(days, 0));
      if (remaining) result[id] = remaining;
    });
    return result;
  }

  function normalizeSlot(value, index = 0) {
    const source = value && typeof value === "object" ? value : {};
    const storedCountdown = Number(source.countdown);
    return {
      kind: source.kind === "other" ? "other" : "economic",
      countdown: Number.isFinite(storedCountdown)
        ? Math.max(0, Math.trunc(storedCountdown))
        : randomCountdown(),
      eventId: String(source.eventId || ""),
      remainingDays: Math.max(0, integer(source.remainingDays, 0)),
      index: Math.max(0, integer(source.index, index))
    };
  }

  function normalizeRouteEffect(value) {
    if (!value || typeof value !== "object" || !value.destinationId) return null;
    return {
      originId: String(value.originId || ""),
      destinationId: String(value.destinationId || ""),
      eventIds: Array.isArray(value.eventIds) ? value.eventIds.map(String) : [],
      speedPercent: Number(value.speedPercent) || 0,
      breakageMaximum: Number(value.breakageMaximum) || 0,
      freshMaximum: Number(value.freshMaximum) || 0,
      snowPenaltyPoints: Number(value.snowPenaltyPoints) || 0
    };
  }

  function currentState() {
    return normalizeState(getState(), getWorldDay());
  }

  function storeState(state) {
    setState(normalizeState(state, getWorldDay()));
  }

  function ensureSettlementRecord(state, placement) {
    const layout = SLOT_LAYOUTS[placement?.category] || [];
    if (!layout.length || !placement?.id) return null;
    let record = state.settlements[placement.id];
    const valid = record && record.category === placement.category && record.slots?.length === layout.length;
    if (!valid) {
      record = {
        category: placement.category,
        revision: Math.max(0, integer(record?.revision, 0)),
        cooldowns: normalizeCooldowns(record?.cooldowns),
        viewedEventIds: Array.isArray(record?.viewedEventIds) ? [...record.viewedEventIds] : [],
        slots: layout.map((kind, index) => ({ kind, countdown: randomCountdown(), eventId: "", remainingDays: 0, index }))
      };
      state.settlements[placement.id] = record;
    }
    return record;
  }

  async function ensureCurrentDay() {
    syncPromise = syncPromise.then(async () => {
      const loaded = await load();
      if (!loaded) return currentState();
      const day = Math.max(1, integer(getWorldDay(), 1));
      const state = currentState();
      const settlements = getSettlements().filter(placement => SLOT_LAYOUTS[placement?.category]);
      settlements.forEach(placement => ensureSettlementRecord(state, placement));
      const fromDay = Math.min(day, Math.max(1, state.lastProcessedDay));
      for (let processingDay = fromDay + 1; processingDay <= day; processingDay += 1) {
        settlements.forEach(placement => processSettlementDay(state, placement, processingDay));
      }
      state.lastProcessedDay = day;
      storeState(state);
      refreshMountedButton();
      if (isOpen()) renderModal();
      return state;
    });
    return syncPromise;
  }

  function processSettlementDay(state, placement, day) {
    const record = ensureSettlementRecord(state, placement);
    if (!record) return;
    Object.keys(record.cooldowns).forEach(eventId => {
      record.cooldowns[eventId] -= 1;
      if (record.cooldowns[eventId] <= 0) delete record.cooldowns[eventId];
    });
    record.slots.forEach(slot => {
      if (slot.eventId) {
        slot.remainingDays -= 1;
        if (slot.remainingDays <= 0) expireSlot(record, slot, placement, day);
        return;
      }
      slot.countdown -= 1;
      if (slot.countdown > 0) return;
      const activeCount = record.slots.filter(candidate => candidate.eventId).length;
      const chance = activeCount <= 1 ? .20 : activeCount === 2 ? .10 : .05;
      if (Math.random() >= chance) {
        slot.countdown = randomCountdown();
        return;
      }
      const selected = selectEvent(record, slot, placement);
      if (!selected) {
        slot.countdown = randomCountdown();
        return;
      }
      slot.eventId = selected.id;
      slot.remainingDays = selected.duration;
      slot.countdown = 0;
      if (selected.category === "경제") record.revision += 1;
      onChange({ type: "started", event: selected, placement, day });
    });
  }

  function expireSlot(record, slot, placement, day) {
    const event = definitionsById.get(slot.eventId);
    const expiredEventId = String(slot.eventId || "");
    if (event) {
      if (event.cooldown > 0) record.cooldowns[event.id] = event.cooldown + 1;
      if (event.category === "경제") record.revision += 1;
      onChange({ type: "ended", event, placement, day });
    }
    slot.eventId = "";
    slot.remainingDays = 0;
    slot.countdown = randomCountdown();
    if (expiredEventId) record.viewedEventIds = (record.viewedEventIds || []).filter(id => id !== expiredEventId);
  }

  function selectEvent(record, slot, placement) {
    const activeIds = new Set(record.slots.map(entry => entry.eventId).filter(Boolean));
    const activeGroups = new Set([...activeIds].map(id => definitionsById.get(id)?.group).filter(Boolean));
    const desiredCategory = slot.kind === "economic" ? "경제" : "기타";
    const candidates = definitions.flatMap(event => {
      if (event.category !== desiredCategory || activeIds.has(event.id) || record.cooldowns[event.id] > 0) return [];
      if (event.group && activeGroups.has(event.group)) return [];
      if (!matchesConditions(event, placement)) return [];
      const weight = eventWeight(event, placement);
      return weight > 0 ? [{ event, weight }] : [];
    });
    if (!candidates.length) return null;
    const total = candidates.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = Math.random() * total;
    for (const candidate of candidates) {
      roll -= candidate.weight;
      if (roll <= 0) return candidate.event;
    }
    return candidates.at(-1)?.event || null;
  }

  async function applyScriptedEvent(placementOrId, eventId) {
    const placement = resolvePlacement(placementOrId);
    const requestedId = String(eventId || "").trim();
    if (!placement || !SLOT_LAYOUTS[placement.category] || !requestedId) {
      return { applied: false, message: "지정한 거점에 도시 이벤트를 적용할 수 없습니다." };
    }
    if (!await load()) return { applied: false, message: loadError || "도시 이벤트 시트를 불러오지 못했습니다." };
    await ensureCurrentDay();
    const event = definitionsById.get(requestedId);
    if (!event) return { applied: false, message: `${requestedId} 이벤트를 찾을 수 없습니다.` };
    const state = currentState();
    const record = ensureSettlementRecord(state, placement);
    const activeSlot = record.slots.find(slot => slot.eventId === requestedId);
    if (activeSlot) return { applied: true, alreadyActive: true, event };
    const desiredKind = event.category === "경제" ? "economic" : "other";
    const slot = record.slots.find(candidate => candidate.kind === desiredKind && !candidate.eventId)
      || record.slots.find(candidate => candidate.kind === desiredKind)
      || record.slots.find(candidate => !candidate.eventId)
      || record.slots[0];
    if (!slot) return { applied: false, message: "도시 이벤트 슬롯을 찾을 수 없습니다." };
    const day = Math.max(1, integer(getWorldDay(), 1));
    if (slot.eventId) expireSlot(record, slot, placement, day);
    slot.eventId = event.id;
    slot.remainingDays = Math.max(1, event.duration);
    slot.countdown = 0;
    if (event.category === "경제") record.revision += 1;
    storeState(state);
    onChange({ type: "started", event, placement, day, scripted: true });
    refreshMountedButton();
    if (isOpen()) renderModal();
    return { applied: true, event };
  }

  function matchesConditions(event, placement) {
    const weather = String(getWeather(placement.id) || "맑음");
    const values = {
      settlement: [String(placement.category || "")],
      region: [String(placement.region || "")],
      terrain: array(placement.terrains),
      environment: array(placement.environments),
      weather: [weather],
      season: [String(getSeason() || "")]
    };
    return Object.entries(event.conditions).every(([key, required]) => !required.length || intersects(required, values[key]));
  }

  function eventWeight(event, placement) {
    const values = {
      region: [String(placement.region || "")],
      terrain: array(placement.terrains),
      environment: array(placement.environments),
      weather: [String(getWeather(placement.id) || "맑음")],
      season: [String(getSeason() || "")]
    };
    let weight = 3;
    Object.entries(event.weights).forEach(([key, rules]) => {
      if (rules.plus.amount && intersects(rules.plus.values, values[key])) weight += rules.plus.amount;
      if (rules.minus.amount && intersects(rules.minus.values, values[key])) weight -= rules.minus.amount;
    });
    return Math.max(0, weight);
  }

  function getSettlementEvents(placementOrId) {
    const placement = resolvePlacement(placementOrId);
    if (!placement) return [];
    const state = currentState();
    const record = ensureSettlementRecord(state, placement);
    if (!record) return [];
    return record.slots.flatMap((slot, slotIndex) => {
      const event = definitionsById.get(slot.eventId);
      return event ? [{ ...event, remainingDays: slot.remainingDays, slotIndex, slotKind: slot.kind }] : [];
    });
  }

  function getViewedSettlementEvents(placementOrId) {
    const placement = resolvePlacement(placementOrId);
    if (!placement) return [];
    const state = currentState();
    const record = ensureSettlementRecord(state, placement);
    if (!record) return [];
    const viewed = new Set(record.viewedEventIds || []);
    return record.slots.flatMap((slot, slotIndex) => {
      const event = viewed.has(slot.eventId) ? definitionsById.get(slot.eventId) : null;
      return event ? [{ ...event, remainingDays: slot.remainingDays, slotIndex, slotKind: slot.kind }] : [];
    });
  }

  function markSettlementEventsViewed(placementOrId) {
    const placement = resolvePlacement(placementOrId);
    if (!placement) return [];
    const state = currentState();
    const record = ensureSettlementRecord(state, placement);
    if (!record) return [];
    record.viewedEventIds = [...new Set(record.slots.map(slot => slot.eventId).filter(Boolean))];
    storeState(state);
    return getViewedSettlementEvents(placement);
  }

  function getModifiers(placementOrId) {
    const placement = resolvePlacement(placementOrId);
    const state = currentState();
    const record = placement ? ensureSettlementRecord(state, placement) : null;
    const result = {
      revision: record?.revision || 0,
      priceBySubcategory: {},
      stockBySubcategory: {},
      information: {},
      lodgingMoodBonus: 0,
      lodgingFeePercent: 0,
      maintenanceFeePercent: 0,
      entryTariffPoints: 0,
      snackMaximum: 0,
      eventIds: []
    };
    if (!record) return result;
    record.slots.forEach(slot => {
      const event = definitionsById.get(slot.eventId);
      if (!event) return;
      result.eventIds.push(event.id);
      const effect = event.effect;
      if (effect.subcategory) {
        result.priceBySubcategory[effect.subcategory] = (result.priceBySubcategory[effect.subcategory] || 0) + effect.price;
        result.stockBySubcategory[effect.subcategory] = (result.stockBySubcategory[effect.subcategory] || 0) + effect.stock;
      }
      Object.entries(effect.information).forEach(([type, amount]) => {
        result.information[type] = (result.information[type] || 0) + amount;
      });
      result.lodgingMoodBonus += effect.lodgingMood;
      result.lodgingFeePercent += effect.lodgingFeePercent;
      result.maintenanceFeePercent += effect.maintenanceFeePercent;
      result.entryTariffPoints += effect.entryTariffPoints;
      result.snackMaximum = Math.max(result.snackMaximum, effect.snackMaximum);
    });
    return result;
  }

  function captureRouteEffects(originId, destinationId) {
    const events = getSettlementEvents(originId);
    const route = events.reduce((result, event) => {
      const effect = event.effect.route;
      if (!effect.speedPercent && !effect.breakageMaximum && !effect.freshMaximum && !effect.snowPenaltyPoints) return result;
      result.eventIds.push(event.id);
      result.speedPercent += effect.speedPercent;
      result.breakageMaximum += effect.breakageMaximum;
      result.freshMaximum += effect.freshMaximum;
      result.snowPenaltyPoints += effect.snowPenaltyPoints;
      return result;
    }, {
      originId: String(originId || ""),
      destinationId: String(destinationId || ""),
      eventIds: [], speedPercent: 0, breakageMaximum: 0, freshMaximum: 0, snowPenaltyPoints: 0
    });
    const state = currentState();
    state.routeEffect = route.eventIds.length ? route : null;
    storeState(state);
    return state.routeEffect;
  }

  function getRouteEffects() {
    return currentState().routeEffect || { eventIds: [], speedPercent: 0, breakageMaximum: 0, freshMaximum: 0, snowPenaltyPoints: 0 };
  }

  function clearRouteEffects(destinationId = "") {
    const state = currentState();
    if (!state.routeEffect) return;
    if (destinationId && state.routeEffect.destinationId && state.routeEffect.destinationId !== destinationId) return;
    state.routeEffect = null;
    storeState(state);
  }

  function rewardStatus(eventId) {
    const event = definitionsById.get(eventId);
    if (!event?.effect.reward) return { available: false, remainingDays: 0 };
    const day = Math.max(1, integer(getWorldDay(), 1));
    const claimedDay = Math.max(0, integer(currentState().rewardClaims[eventId], 0));
    const remainingDays = claimedDay ? Math.max(0, REWARD_RESET_DAYS - (day - claimedDay)) : 0;
    return { available: remainingDays === 0, remainingDays, claimedDay };
  }

  function claimReward(eventId, options = {}) {
    const event = definitionsById.get(eventId);
    const reward = event?.effect.reward;
    const status = rewardStatus(eventId);
    if (!reward || !status.available) return false;
    if (reward.type === "mood") changeMood(reward.amount);
    if (reward.type === "experience") addCompanionExperience(reward.amount, event.name);
    const state = currentState();
    state.rewardClaims[eventId] = Math.max(1, integer(getWorldDay(), 1));
    storeState(state);
    if (options.notify !== false) {
      notify(reward.type === "mood"
        ? `${event.name}을(를) 관람했습니다. 나하나 기분 +${reward.amount}`
        : `${event.name}을(를) 관람했습니다. 동행 경험치 +${reward.amount}`);
    }
    if (options.render !== false) renderModal();
    return true;
  }

  async function observeSettlementEntry(placementOrId) {
    const placement = resolvePlacement(placementOrId);
    if (!placement || !await load()) return [];
    await ensureCurrentDay();
    const events = getSettlementEvents(placement);
    markSettlementEventsViewed(placement);
    const observed = [];
    events.forEach(event => {
      const reward = event.effect.reward;
      if (!reward || !rewardStatus(event.id).available) return;
      if (!claimReward(event.id, { notify: false, render: false })) return;
      observed.push({ event, placement, reward });
    });
    if (observed.length) {
      observationQueue.push(...observed);
      scheduleObservationPresentation();
      refreshMountedButton();
      if (isOpen()) renderModal();
    }
    return observed;
  }

  function scheduleObservationPresentation(delay = 0) {
    if (observationTimer || !observationQueue.length || !elements.observationModal?.hidden) return;
    observationTimer = window.setTimeout(() => {
      observationTimer = 0;
      if (!observationQueue.length || !elements.observationModal?.hidden) return;
      if (!canPresentObservation()) {
        scheduleObservationPresentation(300);
        return;
      }
      showNextObservation();
    }, Math.max(0, delay));
  }

  function showNextObservation() {
    const record = observationQueue.shift();
    if (!record || !elements.observationModal || !elements.observationCard) return;
    const { event, placement, reward } = record;
    const card = document.createElement("article");
    card.className = `city-event-observation-card is-${event.category === "경제" ? "economic" : "other"}`;
    const header = document.createElement("header");
    const category = document.createElement("span");
    const title = document.createElement("h3");
    category.textContent = event.category;
    title.textContent = event.name;
    header.append(category, title);
    const location = document.createElement("strong");
    location.textContent = placement.name || "현재 거점";
    const description = document.createElement("p");
    appendHighlightedDescription(description, event.description);
    const rewardBox = document.createElement("footer");
    const rewardTitle = document.createElement("span");
    const rewardValue = document.createElement("strong");
    rewardTitle.textContent = "관람 보상";
    rewardValue.textContent = reward.type === "mood"
      ? `나하나 기분 +${reward.amount}`
      : `동행 경험치 +${reward.amount}`;
    rewardBox.append(rewardTitle, rewardValue);
    card.append(header, location, description, rewardBox);
    elements.observationCard.replaceChildren(card);
    elements.observationModal.classList.remove("is-revealing");
    elements.observationModal.hidden = false;
    requestAnimationFrame(() => {
      elements.observationModal.classList.add("is-revealing");
      elements.observationClose?.focus();
    });
  }

  function closeObservation() {
    if (!elements.observationModal) return;
    elements.observationModal.hidden = true;
    elements.observationModal.classList.remove("is-revealing");
    elements.observationCard?.replaceChildren();
    scheduleObservationPresentation(160);
  }

  function mountButton(container, placement) {
    if (!container || !placement) return;
    activePlacement = placement;
    let section = container.querySelector(".city-events-entry");
    if (!section) {
      section = document.createElement("section");
      section.className = "city-events-entry";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "city-events-button";
      section.append(button);
      container.prepend(section);
    }
    const button = section.querySelector("button");
    button.onclick = () => open(placement);
    updateButton(button, placement);
  }

  function refreshMountedButton() {
    if (!activePlacement) return;
    const button = document.querySelector(".city-events-entry .city-events-button");
    if (button) updateButton(button, activePlacement);
  }

  function updateButton(button, placement) {
    const events = getSettlementEvents(placement);
    button.innerHTML = `<span>도시 소식</span><strong>${events.length}건</strong><small>${events.length ? "현재 거점의 사건과 효과 확인" : "현재 알려진 사건 없음"}</small>`;
    button.classList.toggle("has-events", events.length > 0);
    button.setAttribute("aria-label", `도시 소식 ${events.length}건`);
  }

  async function open(placement) {
    activePlacement = placement || activePlacement;
    if (!activePlacement || !elements.modal) return;
    elements.modal.hidden = false;
    elements.title.textContent = `${activePlacement.name || "거점"}의 소식`;
    elements.subtitle.textContent = "거점에 적용 중인 사건과 남은 기간을 확인합니다.";
    renderModal(true);
    window.dispatchEvent(new CustomEvent("projectw:cityeventsopen", {
      detail: { placementId: activePlacement.id || "", eventCount: getSettlementEvents(activePlacement).length }
    }));
    await ensureCurrentDay();
    if (isOpen()) {
      markSettlementEventsViewed(activePlacement);
      renderModal();
    }
  }

  function close() {
    if (!elements.modal) return;
    elements.modal.hidden = true;
  }

  function isOpen() {
    return Boolean(elements.modal && !elements.modal.hidden);
  }

  function createModal() {
    if (document.querySelector("#city-events-modal")) return;
    const modal = document.createElement("section");
    modal.id = "city-events-modal";
    modal.className = "city-events-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "city-events-title");
    modal.innerHTML = `
      <div class="city-events-window">
        <header class="city-events-header">
          <div><span>거점 기록</span><h2 id="city-events-title">도시 소식</h2><p id="city-events-subtitle"></p></div>
          <button id="city-events-close" class="city-events-close" type="button">닫기</button>
        </header>
        <div id="city-events-list" class="city-events-list"></div>
      </div>`;
    document.body.append(modal);
    elements = {
      modal,
      title: modal.querySelector("#city-events-title"),
      subtitle: modal.querySelector("#city-events-subtitle"),
      close: modal.querySelector("#city-events-close"),
      list: modal.querySelector("#city-events-list")
    };
    elements.close.addEventListener("click", close);
    modal.addEventListener("pointerdown", event => { if (event.target === modal) close(); });
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !isOpen()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    });
  }

  function createObservationModal() {
    if (document.querySelector("#city-event-observation-modal")) return;
    const modal = document.createElement("section");
    modal.id = "city-event-observation-modal";
    modal.className = "city-event-observation-layer";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "city-event-observation-title");
    modal.innerHTML = `
      <div class="city-event-observation-window">
        <header>
          <p>거점에 들어서며 새로운 광경을 마주했습니다</p>
          <h2 id="city-event-observation-title">도시 이벤트 관람</h2>
        </header>
        <div class="city-event-observation-content"></div>
        <footer><button type="button">확인</button></footer>
      </div>`;
    document.body.append(modal);
    elements.observationModal = modal;
    elements.observationCard = modal.querySelector(".city-event-observation-content");
    elements.observationClose = modal.querySelector("footer button");
    elements.observationClose.addEventListener("click", closeObservation);
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || modal.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      closeObservation();
    });
  }

  function renderModal(loading = false) {
    if (!elements.list || !activePlacement) return;
    if (loading && !definitions.length) {
      elements.list.replaceChildren(messageCard("도시 이벤트 정보를 불러오는 중입니다."));
      return;
    }
    if (loadError) {
      elements.list.replaceChildren(messageCard(loadError));
      return;
    }
    const events = getSettlementEvents(activePlacement);
    if (!events.length) {
      elements.list.replaceChildren(messageCard("현재 이 거점에 적용 중인 사건이 없습니다."));
      return;
    }
    elements.list.replaceChildren(...events.map(createEventCard));
  }

  function createEventCard(event) {
    const card = document.createElement("article");
    card.className = `city-event-card is-${event.category === "경제" ? "economic" : "other"}`;
    const header = document.createElement("header");
    const identity = document.createElement("div");
    const category = document.createElement("span");
    const name = document.createElement("h3");
    const remaining = document.createElement("strong");
    category.textContent = event.category;
    name.textContent = event.name;
    remaining.textContent = `남은 ${event.remainingDays}일`;
    identity.append(category, name);
    header.append(identity, remaining);
    const description = document.createElement("p");
    appendHighlightedDescription(description, event.description);
    card.append(header, description);
    const reward = event.effect.reward;
    if (reward) {
      const status = rewardStatus(event.id);
      const footer = document.createElement("footer");
      const copy = document.createElement("span");
      const rewardLabel = reward.type === "mood" ? `나하나 기분 +${reward.amount}` : `동행 경험치 +${reward.amount}`;
      copy.textContent = status.available
        ? `거점 진입 시 ${rewardLabel}`
        : `관람 완료 · ${status.remainingDays}일 후 다시 획득 가능`;
      footer.append(copy);
      card.append(footer);
    }
    return card;
  }

  function appendHighlightedDescription(container, text) {
    const parts = String(text || "").split(/(\[[^\]]+\])/g);
    parts.forEach(part => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const strong = document.createElement("strong");
        strong.textContent = part.slice(1, -1);
        container.append(strong);
      } else container.append(document.createTextNode(part));
    });
  }

  function messageCard(message) {
    const node = document.createElement("p");
    node.className = "city-events-empty";
    node.textContent = message;
    return node;
  }

  function resolvePlacement(value) {
    if (value && typeof value === "object") return value;
    const id = String(value || "");
    return getSettlements().find(placement => placement.id === id) || null;
  }

  function array(value) {
    return Array.isArray(value) ? value.map(String).filter(Boolean) : list(value);
  }

  function intersects(left, right) {
    const set = new Set(right);
    return left.some(value => set.has(value));
  }

  function integer(value, fallback = 0) {
    const numeric = Math.trunc(Number(value));
    return Number.isFinite(numeric) ? numeric : fallback;
  }

  function randomCountdown() {
    return 1 + Math.floor(Math.random() * 4);
  }

  function shuffle(values) {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  window.ProjectWCityEvents = {
    init,
    load,
    createState,
    normalizeState,
    ensureCurrentDay,
    applyScriptedEvent,
    getSettlementEvents,
    getViewedSettlementEvents,
    getModifiers,
    captureRouteEffects,
    getRouteEffects,
    clearRouteEffects,
    rewardStatus,
    claimReward,
    observeSettlementEntry,
    mountButton,
    open,
    close,
    isOpen
  };
}());
