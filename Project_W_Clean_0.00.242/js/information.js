(function exposeInformationSystem() {
  const STATE_SCHEMA_VERSION = 2;
  const ROMAN_STEPS = ["", "I", "II", "III", "IV", "V", "VI"];
  const WEATHER_LABELS = ["맑음", "흐림", "비", "폭우", "눈", "폭설"];
  const REGIONS = ["북부", "중부", "남부"];
  const BASE_ACQUISITION_CHANCE = .2;
  const SPECIAL_INFORMATION_WEIGHT_MULTIPLIER = 10;
  const GRADE_VI_EFFECTIVE_WEIGHT = 11;
  const INITIAL_INFORMATION_AGE_BANDS = [
    [
      { minimum: 0, maximum: 2, weight: 33 },
      { minimum: 3, maximum: 6, weight: 50 },
      { minimum: 7, maximum: 9, weight: 12 },
      { minimum: 10, maximum: 11, weight: 5 }
    ],
    [
      { minimum: 0, maximum: 2, weight: 39 },
      { minimum: 3, maximum: 6, weight: 48 },
      { minimum: 7, maximum: 9, weight: 10 },
      { minimum: 10, maximum: 11, weight: 3 }
    ],
    [
      { minimum: 0, maximum: 2, weight: 44 },
      { minimum: 3, maximum: 6, weight: 47 },
      { minimum: 7, maximum: 9, weight: 7 },
      { minimum: 10, maximum: 11, weight: 2 }
    ],
    [
      { minimum: 0, maximum: 2, weight: 50 },
      { minimum: 3, maximum: 6, weight: 45 },
      { minimum: 7, maximum: 9, weight: 5 },
      { minimum: 10, maximum: 11, weight: 0 }
    ]
  ];
  const DEFAULT_GRADE_RULES = [
    null,
    { baseValue: 60, weight: 30 },
    { baseValue: 150, weight: 30 },
    { baseValue: 300, weight: 20 },
    { baseValue: 550, weight: 12 },
    { baseValue: 900, weight: 6 },
    { baseValue: 1400, weight: GRADE_VI_EFFECTIVE_WEIGHT }
  ];
  const DEFAULT_TRUST_RULES = [
    null,
    { valueMultiplier: .5, accuracy: .35, weight: 5 },
    { valueMultiplier: .65, accuracy: .5, weight: 15 },
    { valueMultiplier: .8, accuracy: .65, weight: 25 },
    { valueMultiplier: 1, accuracy: .8, weight: 30 },
    { valueMultiplier: 1.2, accuracy: 1, weight: 20 },
    { valueMultiplier: 1.4, accuracy: 1, weight: 5 }
  ];
  const DEFAULT_AGE_RULES = [
    { minimum: 0, maximum: 2, label: "신선", valueMultiplier: 1, accuracy: 1 },
    { minimum: 3, maximum: 6, label: "통상", valueMultiplier: .4, accuracy: .8 },
    { minimum: 7, maximum: 9, label: "늦음", valueMultiplier: .15, accuracy: .55 },
    { minimum: 10, maximum: 10, label: "소멸", valueMultiplier: .05, accuracy: .3 },
    { minimum: 11, maximum: 11, label: "소멸", valueMultiplier: .02, accuracy: .15 }
  ];

  let dataUrl = "";
  let ruleUrl = "";
  let getState = () => null;
  let setState = () => {};
  let getWorldDay = () => 1;
  let getSettlements = () => [];
  let getRoutes = () => [];
  let getCityEvents = () => [];
  let getWeather = () => ({ label: "맑음" });
  let getWolfenState = () => ({});
  let getCurrencyTrends = () => [];
  let getInformationSignals = async () => ({ market: [], production: [], logistics: [] });
  let getPeddlerInformationBonuses = () => ({ successChance: 0, misinformationReduction: 0, sourceLevel: 0 });
  let applyMarketShock = () => {};
  let scheduleRestockEffect = () => {};
  let dampenMarketOnSale = () => {};
  let setWolfenMarker = () => {};
  let getAssetUrl = () => "";
  let persist = () => {};
  let notify = () => {};

  let loadPromise = null;
  let collectionPending = false;
  let loadError = "";
  let definitions = [];
  let rules = [];
  let ruleBook = createDefaultRuleBook();
  let elements = {};
  let acquiredInformationVisible = false;
  const acquiredInformationQueue = [];
  const collectionTooltipButtons = new WeakSet();

  function init(options = {}) {
    dataUrl = text(options.dataUrl || dataUrl);
    ruleUrl = text(options.ruleUrl || ruleUrl);
    getState = typeof options.getState === "function" ? options.getState : getState;
    setState = typeof options.setState === "function" ? options.setState : setState;
    getWorldDay = typeof options.getWorldDay === "function" ? options.getWorldDay : getWorldDay;
    getSettlements = typeof options.getSettlements === "function" ? options.getSettlements : getSettlements;
    getRoutes = typeof options.getRoutes === "function" ? options.getRoutes : getRoutes;
    getCityEvents = typeof options.getCityEvents === "function" ? options.getCityEvents : getCityEvents;
    getWeather = typeof options.getWeather === "function" ? options.getWeather : getWeather;
    getWolfenState = typeof options.getWolfenState === "function" ? options.getWolfenState : getWolfenState;
    getCurrencyTrends = typeof options.getCurrencyTrends === "function" ? options.getCurrencyTrends : getCurrencyTrends;
    getInformationSignals = typeof options.getInformationSignals === "function" ? options.getInformationSignals : getInformationSignals;
    getPeddlerInformationBonuses = typeof options.getPeddlerInformationBonuses === "function"
      ? options.getPeddlerInformationBonuses
      : getPeddlerInformationBonuses;
    applyMarketShock = typeof options.applyMarketShock === "function" ? options.applyMarketShock : applyMarketShock;
    scheduleRestockEffect = typeof options.scheduleRestockEffect === "function" ? options.scheduleRestockEffect : scheduleRestockEffect;
    dampenMarketOnSale = typeof options.dampenMarketOnSale === "function" ? options.dampenMarketOnSale : dampenMarketOnSale;
    setWolfenMarker = typeof options.setWolfenMarker === "function" ? options.setWolfenMarker : setWolfenMarker;
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    persist = typeof options.persist === "function" ? options.persist : persist;
    notify = typeof options.notify === "function" ? options.notify : notify;
    elements = {
      button: document.querySelector("#information-button"),
      count: document.querySelector("#information-button-count"),
      modal: document.querySelector("#information-modal"),
      close: document.querySelector("#information-close"),
      status: document.querySelector("#information-status"),
      grid: document.querySelector("#information-grid"),
      detailTooltip: document.querySelector("#information-detail-tooltip"),
      acquiredModal: document.querySelector("#information-acquired-modal"),
      acquiredCard: document.querySelector("#information-acquired-card"),
      acquiredClose: document.querySelector("#information-acquired-close")
    };
    elements.collectionTooltip = document.createElement("aside");
    elements.collectionTooltip.id = "information-collection-tooltip";
    elements.collectionTooltip.className = "information-collection-tooltip";
    elements.collectionTooltip.setAttribute("role", "tooltip");
    elements.collectionTooltip.hidden = true;
    document.body.append(elements.collectionTooltip);
    window.addEventListener("blur", hideCollectionTooltip);
    window.addEventListener("resize", hideCollectionTooltip);
    window.addEventListener("scroll", hideCollectionTooltip, true);
    window.addEventListener("blur", hideInformationDetailTooltip);
    window.addEventListener("resize", hideInformationDetailTooltip);
    window.addEventListener("scroll", hideInformationDetailTooltip, true);
    elements.button?.addEventListener("click", open);
    elements.close?.addEventListener("click", close);
    elements.acquiredClose?.addEventListener("click", closeAcquiredInformation);
    elements.modal?.addEventListener("pointerdown", event => {
      if (event.target === elements.modal) close();
    });
    elements.acquiredModal?.addEventListener("pointerdown", event => {
      if (event.target === elements.acquiredModal) closeAcquiredInformation();
    });
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (elements.acquiredModal && !elements.acquiredModal.hidden) closeAcquiredInformation();
      else if (elements.modal && !elements.modal.hidden) close();
    });
    refresh();
  }

  async function load() {
    if (definitions.length && rules.length) return true;
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      try {
        loadError = "";
        const [definitionRows, ruleRows] = await Promise.all([
          window.ProjectWData.loadCsv(dataUrl),
          window.ProjectWData.loadCsv(ruleUrl)
        ]);
        definitions = definitionRows.map(parseDefinition).filter(definition => definition.id && definition.special);
        rules = ruleRows.map(parseRule).filter(rule => rule.id);
        if (!definitions.length || !rules.length) throw new Error("Information / Information_Rule 시트의 행과 칼럼을 확인해 주세요.");
        ruleBook = buildRuleBook(rules);
        refresh();
        return definitions.length > 0;
      } catch (error) {
        console.error(error);
        loadError = "정보 시트를 불러오지 못했습니다. 연결 상태와 시트 내용을 확인해 주세요.";
        if (elements.status) elements.status.textContent = loadError;
        return false;
      }
    })().finally(() => { loadPromise = null; });
    return loadPromise;
  }

  function parseDefinition(row) {
    const wrongContents = [text(row["오판_내용_1"]), text(row["오판_내용_2"])];
    const wrongTitles = [text(row["오판_제목_1"]), text(row["오판_제목_2"])];
    const wrongEntries = wrongContents
      .map((content, index) => ({ content, title: wrongTitles[index] }))
      .filter(entry => entry.content);
    return {
      id: text(row.ID),
      category: text(row["분류"]),
      subcategory: text(row["세부분류"]),
      linkedId: text(row["연결_ID"]),
      condition: text(row["발생_조건"]),
      title: text(row["제목"]),
      correct: text(row["정상_내용"]),
      wrong: wrongEntries.map(entry => entry.content),
      wrongTitles: wrongEntries.map(entry => entry.title),
      gradeMinimum: romanNumber(row["등급_최소"]),
      gradeMaximum: romanNumber(row["등급_최대"]),
      trustMinimum: romanNumber(row["신뢰도_최소"]) || 1,
      trustMaximum: romanNumber(row["신뢰도_최대"]) || 6,
      weight: Math.max(0, number(row["획득_가중치"], 1)),
      typeMultiplier: Math.max(0, number(row["판매가치_배율"], 1)),
      sellable: text(row["판매_가능"]).toUpperCase() === "Y",
      special: text(row["특수_처리"]),
      developer: text(row["개발자설명"])
    };
  }

  function parseRule(row) {
    return {
      id: text(row["규칙_ID"]),
      category: text(row["규칙분류"]),
      step: text(row["단계"]),
      minimum: nullableNumber(row["최소값"]),
      maximum: nullableNumber(row["최대값"]),
      baseValue: nullableNumber(row["기준가치"]),
      valueMultiplier: nullableNumber(row["가치배율"]),
      accuracy: nullableNumber(row["정확도"]),
      weight: nullableNumber(row["추첨가중치"]),
      label: text(row["표시명"]),
      description: text(row["설명"]),
      developer: text(row["개발자설명"])
    };
  }

  function createDefaultRuleBook() {
    return {
      grades: DEFAULT_GRADE_RULES.map(rule => rule ? { ...rule } : null),
      trusts: DEFAULT_TRUST_RULES.map(rule => rule ? { ...rule } : null),
      ages: DEFAULT_AGE_RULES.map(rule => ({ ...rule }))
    };
  }

  function buildRuleBook(ruleRows) {
    const book = createDefaultRuleBook();
    ruleRows.forEach(rule => {
      const step = romanNumber(rule.step);
      if (rule.category === "등급" && step) {
        book.grades[step] = {
          baseValue: rule.baseValue ?? book.grades[step]?.baseValue ?? 0,
          // VI등급은 현재 VI까지 허용되는 정보 유형 수를 반영해 전체 획득 결과 약 0.3%를 목표로 한다.
          weight: step === 6 ? GRADE_VI_EFFECTIVE_WEIGHT : rule.weight ?? book.grades[step]?.weight ?? 1,
          label: rule.label || `등급 ${ROMAN_STEPS[step]}`
        };
      }
      if (rule.category === "신뢰도" && step) {
        book.trusts[step] = {
          valueMultiplier: rule.valueMultiplier ?? book.trusts[step]?.valueMultiplier ?? 1,
          accuracy: rule.accuracy ?? book.trusts[step]?.accuracy ?? 1,
          weight: rule.weight ?? book.trusts[step]?.weight ?? 1,
          label: rule.label || `신뢰도 ${ROMAN_STEPS[step]}`
        };
      }
    });
    const ages = ruleRows.filter(rule => ["정보상태", "정보열화"].includes(rule.category)
      && rule.minimum != null
      && rule.id !== "AGE_REMOVE")
      .map(rule => ({
        minimum: rule.minimum,
        maximum: rule.maximum ?? rule.minimum,
        label: rule.label || rule.step || "통상",
        valueMultiplier: rule.valueMultiplier ?? 0,
        accuracy: rule.accuracy ?? 0
      }));
    if (ages.length) book.ages = ages.sort((left, right) => left.minimum - right.minimum);
    return book;
  }

  function createState() {
    return {
      schemaVersion: STATE_SCHEMA_VERSION,
      cards: [],
      discoveredKeys: [],
      routeSecurity: { lastWeek: 0, values: {} }
    };
  }

  function normalizeState(value) {
    const source = value && typeof value === "object" ? value : {};
    const today = currentDay();
    const cards = array(source.cards).map(card => normalizeCard(card)).filter(card => {
      if (!card.id || !card.templateId || !card.instanceKey) return false;
      if (card.special === "WOLFEN_TRACK" && card.specialExpiresDay > 0) return today <= card.specialExpiresDay;
      return informationAgeDays(card, today) < 12;
    });
    return {
      schemaVersion: STATE_SCHEMA_VERSION,
      cards,
      discoveredKeys: [...new Set(array(source.discoveredKeys).map(text).filter(Boolean))],
      routeSecurity: {
        lastWeek: Math.max(0, integer(source.routeSecurity?.lastWeek, 0)),
        values: Object.fromEntries(Object.entries(source.routeSecurity?.values || {}).map(([key, entry]) => [key, {
          baseline: clamp(number(entry?.baseline), 0, 100),
          value: clamp(number(entry?.value), 0, 100)
        }]))
      }
    };
  }

  function normalizeCard(card) {
    return {
      id: text(card?.id),
      templateId: text(card?.templateId),
      instanceKey: text(card?.instanceKey),
      category: text(card?.category),
      subcategory: text(card?.subcategory),
      special: text(card?.special),
      title: text(card?.title),
      correct: text(card?.correct),
      wrong: array(card?.wrong).map(text).filter(Boolean),
      wrongTitles: array(card?.wrongTitles).map(text),
      grade: clamp(integer(card?.grade), 0, 6),
      trust: clamp(integer(card?.trust, 1), 1, 6),
      typeMultiplier: Math.max(0, number(card?.typeMultiplier, 1)),
      sellable: Boolean(card?.sellable),
      acquiredDay: Math.max(1, integer(card?.acquiredDay, 1)),
      initialAgeDays: clamp(integer(card?.initialAgeDays), 0, 11),
      trustRoll: clamp(number(card?.trustRoll, card?.truthRoll ?? .5), 0, 1),
      ageRoll: clamp(number(card?.ageRoll, card?.truthRoll ?? .5), 0, 1),
      intuitionRoll: clamp(number(card?.intuitionRoll, 1), 0, 1),
      misinformationReduction: clamp(number(card?.misinformationReduction), 0, .95),
      read: Boolean(card?.read),
      falseIndex: Math.max(0, integer(card?.falseIndex)),
      valueFactor: clamp(number(card?.valueFactor, 1), .95, 1.05),
      saleCount: clamp(integer(card?.saleCount), 0, 3),
      soldShopKeys: [...new Set(array(card?.soldShopKeys).map(text).filter(Boolean))],
      target: card?.target && typeof card.target === "object" ? { ...card.target } : {},
      specialExpiresDay: Math.max(0, integer(card?.specialExpiresDay))
    };
  }

  function currentState() {
    const before = getState();
    const normalized = normalizeState(before);
    if (JSON.stringify(before || null) !== JSON.stringify(normalized)) setState(normalized);
    return normalized;
  }

  function storeState(state, shouldPersist = true) {
    const normalized = normalizeState(state);
    setState(normalized);
    if (shouldPersist) persist();
    refresh();
    return normalized;
  }

  function acquisitionChance() {
    const bonuses = normalizePeddlerInformationBonuses(getPeddlerInformationBonuses());
    return Math.min(1, BASE_ACQUISITION_CHANCE + bonuses.successChance);
  }

  async function collect(options = {}) {
    if (collectionPending) return { acquired: false, attempted: false, message: "이미 정보를 모으는 중입니다." };
    collectionPending = true;
    try {
      return await collectInformation(options);
    } catch (error) {
      console.error("정보 획득 처리 실패", error);
      return { acquired: false, attempted: false, message: "정보를 준비하지 못했습니다. 횟수와 시간은 소모되지 않았습니다. 다시 시도해 주세요." };
    } finally {
      collectionPending = false;
    }
  }

  async function collectInformation({ facility = "", placement = null, force = false, special = "", replaceWolfenTrack = false } = {}) {
    if (!await load()) return { acquired: false, attempted: false, message: loadError };
    const state = currentState();
    // Developer replacement stays local until a new card has been generated successfully.
    if (force && replaceWolfenTrack) {
      state.cards = state.cards.filter(card => card.special !== "WOLFEN_TRACK");
      state.discoveredKeys = state.discoveredKeys.filter(key => !text(key).startsWith("WOLFEN:"));
    }
    const requestedSpecial = text(special);
    const candidates = (await buildCandidates(state, placement)).filter(candidate => !requestedSpecial
      || candidate.template?.special === requestedSpecial
      || array(candidate.variants).some(variant => variant?.special === requestedSpecial));
    if (!candidates.length) return { acquired: false, attempted: false, message: "지금 얻을 수 있는 새로운 정보가 없습니다." };
    const peddlerBonuses = normalizePeddlerInformationBonuses(getPeddlerInformationBonuses());
    if (!force && Math.random() >= acquisitionChance()) {
      return { acquired: false, attempted: true, message: "이번에는 쓸 만한 정보를 얻지 못했습니다." };
    }
    const selected = weightedEntry(candidates, candidate => candidate.weight);
    if (!selected) return { acquired: false, attempted: false, message: "지금 얻을 수 있는 새로운 정보가 없습니다." };
    const variants = array(selected.variants).filter(variant => !requestedSpecial || variant?.special === requestedSpecial);
    let template = variants.length
      ? weightedEntry(variants, variant => variant.weight)
      : selected.template;
    const target = { ...(selected.target || {}) };
    if (template.special === "MARKET_SUBCATEGORY") {
      const direction = number(target.index) >= 0 ? 1 : -1;
      target.marketShock = centeredInteger(5, 25, 15) * direction;
      target.marketState = finalMarketState(number(target.index) + target.marketShock);
      template = definitions.find(entry => entry.special === "MARKET_SUBCATEGORY"
        && entry.linkedId === `MARKET_SUBCATEGORY:${target.subcategory}:${target.marketState}`) || template;
    }
    const grade = template.special === "WOLFEN_TRACK"
      ? 0
      : weightedStep(ruleBook.grades, template.gradeMinimum || 1, template.gradeMaximum || 6);
    const trust = weightedStep(ruleBook.trusts, template.trustMinimum || 1, template.trustMaximum || 6);
    const variables = selected.variables || {};
    const today = currentDay();
    const card = normalizeCard({
      id: `INFO_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      templateId: template.id,
      instanceKey: selected.instanceKey,
      category: template.category,
      subcategory: template.subcategory,
      special: template.special,
      title: interpolate(template.title, variables),
      correct: interpolate(template.correct, variables),
      wrong: template.wrong.map(content => interpolate(content, variables)),
      wrongTitles: template.wrongTitles.map(title => interpolate(title, variables)),
      grade,
      trust,
      typeMultiplier: template.typeMultiplier,
      sellable: template.sellable,
      acquiredDay: today,
      initialAgeDays: template.special === "WOLFEN_TRACK" ? 0 : rollInitialInformationAge(peddlerBonuses.sourceLevel),
      trustRoll: Math.random(),
      ageRoll: Math.random(),
      intuitionRoll: Math.random(),
      misinformationReduction: peddlerBonuses.misinformationReduction,
      read: false,
      falseIndex: Math.floor(Math.random() * Math.max(1, template.wrong.length)),
      valueFactor: .95 + (Math.random() * .1),
      saleCount: 0,
      soldShopKeys: [],
      target,
      specialExpiresDay: template.special === "WOLFEN_TRACK" ? today + randomInteger(3, 7) - 1 : 0
    });
    state.cards.push(card);
    state.discoveredKeys.push(selected.instanceKey);
    state.discoveredKeys = [...new Set(state.discoveredKeys)];
    applyAcquisitionEffect(card);
    storeState(state);
    const presentedCard = presentCard(card);
    showAcquiredInformation(presentedCard);
    return {
      acquired: true,
      attempted: true,
      card: presentedCard,
      message: `${facility || "정보 수집"}에서 「${card.title}」 정보를 얻었습니다.`
    };
  }

  async function buildCandidates(state, placement) {
    // Trade signals load the map and current city events before these snapshots are read.
    const signals = await getInformationSignals();
    const discovered = new Set(state.discoveredKeys);
    const settlements = array(getSettlements());
    const routes = array(getRoutes());
    const today = currentDay();
    const week = Math.floor((today - 1) / 7);
    const cycle = Math.floor((today - 1) / 3);
    ensureRouteSecurity(state, routes, today);
    const candidates = [];
    const push = (template, instanceKey, variables = {}, target = {}, multiplier = 1) => {
      if (!template || discovered.has(instanceKey)) return;
      candidates.push({ template, instanceKey, variables, target, weight: Math.max(.01, template.weight * multiplier) });
    };
    const pushVariants = (variants, instanceKey, variables = {}, target = {}, multiplier = 1) => {
      const available = array(variants).filter(Boolean);
      if (!available.length || discovered.has(instanceKey)) return;
      const averageWeight = available.reduce((sum, variant) => sum + variant.weight, 0) / available.length;
      candidates.push({
        template: available[0],
        variants: available,
        instanceKey,
        variables,
        target,
        weight: Math.max(.01, averageWeight * multiplier)
      });
    };

    definitions.filter(template => template.special === "CITY_EVENT").forEach(template => {
      settlements.forEach(settlement => {
        array(getCityEvents(settlement)).filter(event => event.id === template.linkedId).forEach(event => {
          const startDay = today - Math.max(0, number(event.duration, 1) - number(event.remainingDays, 1));
          push(template, `CITY:${settlement.id}:${event.id}:${startDay}`, { 거점명: settlement.name }, {
            settlementId: settlement.id,
            eventId: event.id
          });
        });
      });
    });

    array(signals?.market).forEach(signal => {
      if (signal.state === "STEADY") return;
      const template = definitions.find(entry => entry.special === "MARKET_SUBCATEGORY"
        && entry.linkedId === `MARKET_SUBCATEGORY:${signal.subcategory}:${signal.state}`);
      push(template, `MARKET:${signal.settlementId}:${signal.subcategory}:${week}:${signal.state}`, {
        거점명: signal.settlementName
      }, { ...signal, kind: "market" });
    });

    buildWeatherCandidates({ settlements, routes, cycle, pushVariants });

    const wolfenState = getWolfenState() || {};
    if (!hasValidWolfenTrack(state) && wolfenState.positionId) {
      const route = routes.find(entry => entry.id === wolfenState.positionId) || {};
      const nearest = nearestSettlement(route, settlements);
      pushVariants(definitions.filter(template => template.special === "WOLFEN_TRACK"),
        `WOLFEN:${wolfenState.positionId}:${integer(wolfenState.relocationSerial)}:${today}`, {
          울펜_경로명: route.name || "이름 없는 길",
          울펜_인근거점명: nearest?.name || "인근 거점",
          울펜_지역명: route.region || nearest?.region || "대륙 어딘가"
        }, { kind: "wolfen", placementId: wolfenState.positionId }, SPECIAL_INFORMATION_WEIGHT_MULTIPLIER);
    }

    array(signals?.production).forEach(signal => {
      const template = definitions.find(entry => entry.special === "PRODUCTION_FORECAST"
        && entry.linkedId === `PRODUCTION_FORECAST:${signal.subcategory}:${signal.direction}`);
      push(template, `PRODUCTION:${signal.settlementId}:${signal.subcategory}:${week}:${signal.direction}`, {
        거점명: signal.settlementName
      }, { ...signal, kind: "production" });
    });
    array(signals?.logistics).forEach(signal => {
      const template = definitions.find(entry => entry.special === "IMPORT_LOGISTICS"
        && entry.linkedId === `IMPORT_LOGISTICS:${signal.subcategory}:${signal.direction}`);
      push(template, `LOGISTICS:${signal.settlementId}:${signal.subcategory}:${week}:${signal.direction}`, {
        거점명: signal.settlementName
      }, { ...signal, kind: "logistics" });
    });

    array(getCurrencyTrends()).forEach(signal => {
      const variants = definitions.filter(entry => entry.special === "CURRENCY_TREND"
        && entry.linkedId.startsWith(`CURRENCY_TREND:${signal.direction}:`));
      pushVariants(variants, `CURRENCY:${signal.region}:${signal.currencyId}:${signal.trendStartDay}`, {
        화폐명: signal.currencyName,
        지역명: signal.region
      }, { ...signal, kind: "currency" });
    });

    routeSecurityContexts(routes, state).forEach(signal => {
      if (signal.security > 30) return;
      const band = signal.security <= 15 ? "SEVERE" : "HIGH";
      pushVariants(definitions.filter(entry => entry.special === "ROUTE_SECURITY_RISK"
        && entry.linkedId.startsWith(`ROUTE_SECURITY_RISK:${band}:`)),
      `SECURITY:${signal.segmentId}:${week}:${band}`, {
          경로명: signal.name
        }, { ...signal, kind: "security" }, SPECIAL_INFORMATION_WEIGHT_MULTIPLIER);
    });
    return candidates;
  }

  function buildWeatherCandidates({ settlements, routes, cycle, pushVariants }) {
    settlements.forEach(settlement => {
      const weather = weatherLabel(settlement.id);
      pushVariants(definitions.filter(template => template.special === "WEATHER_SNAPSHOT"
        && template.linkedId.startsWith(`WEATHER:SETTLEMENT:${weather}:`)),
      `WEATHER:SETTLEMENT:${settlement.id}:${weather}:${cycle}`, { 거점명: settlement.name }, {
          kind: "weather", targetKind: "settlement", targetId: settlement.id, weather
        });
    });

    REGIONS.forEach(region => {
      const nodes = settlements.filter(settlement => settlement.region === region);
      const weather = dominantWeather(nodes.map(node => weatherLabel(node.id)));
      if (!weather) return;
      pushVariants(definitions.filter(template => template.special === "WEATHER_SNAPSHOT"
        && template.linkedId.startsWith(`WEATHER:REGION:${weather}:`)),
      `WEATHER:REGION:${region}:${weather}:${cycle}`, { 지역명: region }, {
          kind: "weather", targetKind: "region", targetId: region, weather
        });
    });

    groupRoutes(routes).forEach(group => {
      if (group.routes.length < 3) return;
      const labels = group.routes.map(route => weatherLabel(route.id));
      const weather = dominantWeather(labels);
      const ratio = labels.filter(label => label === weather).length / labels.length;
      const longestRun = longestWeatherRun(labels, weather);
      if (ratio < .75 || longestRun < 3) return;
      pushVariants(definitions.filter(template => template.special === "ROUTE_WEATHER_SHARED"
        && template.linkedId.startsWith(`WEATHER:ROUTE:${weather}:`)),
      `WEATHER:ROUTE:${group.segmentId}:${weather}:${cycle}`, { 경로명: group.name }, {
          kind: "weather", targetKind: "route", targetId: group.segmentId, weather
        }, ["폭우", "폭설"].includes(weather) ? 1.25 : 1);
    });
  }

  function applyAcquisitionEffect(card) {
    const target = card.target || {};
    if (card.special === "MARKET_SUBCATEGORY") {
      const direction = number(target.index) >= 0 ? 1 : -1;
      const shock = number(target.marketShock) || (centeredInteger(5, 25, 15) * direction);
      applyMarketShock({
        settlementId: target.settlementId,
        subcategory: target.subcategory,
        adjustment: shock,
        expiresDay: currentDay() + Math.max(0, 11 - informationAgeDays(card)),
        cardId: card.id
      });
      card.target.marketShock = shock;
    }
    if (card.special === "PRODUCTION_FORECAST") {
      scheduleRestockEffect({
        settlementId: target.settlementId,
        subcategory: target.subcategory,
        sourceType: "production",
        amount: randomInteger(2, 4) * (target.direction === "DOWN" ? -1 : 1),
        guarantee: false,
        cardId: card.id
      });
    }
    if (card.special === "IMPORT_LOGISTICS") {
      scheduleRestockEffect({
        settlementId: target.settlementId,
        subcategory: target.subcategory,
        sourceType: "import",
        amount: randomInteger(2, 4) * (target.direction === "DELAY" ? -1 : 1),
        guarantee: target.direction === "ARRIVAL",
        cardId: card.id
      });
    }
  }

  function getCards() {
    return currentState().cards.map(presentCard).sort((left, right) => right.acquiredDay - left.acquiredDay);
  }

  function getTradeCards(shopKey = "") {
    const key = text(shopKey);
    return currentState().cards.filter(card => card.sellable
      && card.grade > 0
      && card.trust > 0
      && card.saleCount < 3
      && !card.soldShopKeys.includes(key)
      && cardValue(card) > 0)
      .map(presentCard)
      .sort((left, right) => right.value - left.value || right.acquiredDay - left.acquiredDay);
  }

  function getCard(cardId) {
    const card = currentState().cards.find(entry => entry.id === text(cardId));
    return card ? presentCard(card) : null;
  }

  function recordSale(cardIds, shopKey) {
    const ids = new Set(array(cardIds).map(text));
    if (!ids.size) return [];
    const state = currentState();
    const sold = [];
    state.cards.forEach(card => {
      if (!ids.has(card.id) || !card.sellable || card.saleCount >= 3 || card.soldShopKeys.includes(shopKey) || cardValue(card) <= 0) return;
      const before = presentCard(card);
      card.soldShopKeys.push(shopKey);
      card.saleCount += 1;
      card.grade = Math.max(1, card.grade - 1);
      card.trust = Math.max(1, card.trust - 1);
      sold.push(before);
      if (card.special === "MARKET_SUBCATEGORY") dampenMarketOnSale({
        settlementId: card.target?.settlementId,
        subcategory: card.target?.subcategory,
        baseIndex: card.target?.index,
        cardId: card.id
      });
    });
    if (sold.length) storeState(state);
    return sold;
  }

  function presentCard(card) {
    const age = ageRule(card);
    const trustRule = ruleBook.trusts[card.trust] || DEFAULT_TRUST_RULES[card.trust] || DEFAULT_TRUST_RULES[1];
    const baseAccurate = card.trustRoll <= trustRule.accuracy && card.ageRoll <= age.accuracy;
    const accurate = baseAccurate || card.intuitionRoll < card.misinformationReduction;
    const falseIndex = card.falseIndex % Math.max(1, card.wrong.length);
    const showingCorrectInformation = accurate || !card.wrong.length;
    const content = showingCorrectInformation ? card.correct : card.wrong[falseIndex];
    const displayedTitle = showingCorrectInformation
      ? card.title
      : card.wrongTitles[falseIndex] || card.title;
    return {
      ...card,
      title: normalizeInformationGrammar(displayedTitle),
      content: normalizeInformationGrammar(content),
      accurate,
      ageDays: informationAgeDays(card),
      remainingDays: card.special === "WOLFEN_TRACK" && card.specialExpiresDay > 0
        ? Math.max(0, card.specialExpiresDay - currentDay() + 1)
        : Math.max(0, 12 - informationAgeDays(card)),
      ageLabel: age.label,
      ageValueMultiplier: age.valueMultiplier,
      gradeLabel: card.grade ? `등급 ${ROMAN_STEPS[card.grade]}` : "특수 정보",
      trustLabel: `신뢰도 ${ROMAN_STEPS[card.trust]}`,
      value: cardValue(card),
      saleValueMultiplier: [1, .6, .3, 0][card.saleCount] ?? 0
    };
  }

  function cardValue(card) {
    if (!card.grade || (card.grade === 1 && card.trust === 1)) return 0;
    const grade = ruleBook.grades[card.grade] || DEFAULT_GRADE_RULES[card.grade];
    const trust = ruleBook.trusts[card.trust] || DEFAULT_TRUST_RULES[card.trust];
    const age = ageRule(card);
    const spread = [1, .6, .3, 0][card.saleCount] ?? 0;
    return Math.max(0, Math.round((grade?.baseValue || 0)
      * (trust?.valueMultiplier || 0)
      * age.valueMultiplier
      * card.typeMultiplier
      * card.valueFactor
      * spread));
  }

  function ageRule(card) {
    const age = informationAgeDays(card);
    return ruleBook.ages.find(rule => age >= rule.minimum && age <= rule.maximum)
      || { minimum: 12, maximum: Number.POSITIVE_INFINITY, label: "제거", valueMultiplier: 0, accuracy: 0 };
  }

  function informationAgeDays(card, day = currentDay()) {
    return Math.max(0, integer(card?.initialAgeDays) + (Math.max(1, integer(day, 1)) - Math.max(1, integer(card?.acquiredDay, 1))));
  }

  function rollInitialInformationAge(sourceLevel = 0) {
    const level = clamp(integer(sourceLevel), 0, INITIAL_INFORMATION_AGE_BANDS.length - 1);
    const band = weightedEntry(INITIAL_INFORMATION_AGE_BANDS[level], entry => entry.weight)
      || INITIAL_INFORMATION_AGE_BANDS[0][0];
    return randomInteger(band.minimum, band.maximum);
  }

  function normalizePeddlerInformationBonuses(value) {
    return {
      successChance: clamp(number(value?.successChance), 0, .8),
      misinformationReduction: clamp(number(value?.misinformationReduction), 0, .95),
      sourceLevel: clamp(integer(value?.sourceLevel), 0, 3)
    };
  }

  function hasValidWolfenTrack(state = currentState()) {
    const today = currentDay();
    return state.cards.some(card => card.special === "WOLFEN_TRACK" && card.specialExpiresDay >= today);
  }

  function getWolfenTrack() {
    const card = currentState().cards.find(entry => entry.special === "WOLFEN_TRACK" && entry.specialExpiresDay >= currentDay());
    return card ? presentCard(card) : null;
  }

  function refresh() {
    const state = currentState();
    const cards = state.cards.map(presentCard);
    updateToolbar(cards);
    syncWolfenMarker(state);
    if (elements.modal && !elements.modal.hidden) renderModal(cards);
  }

  function updateToolbar(cards = getCards()) {
    const entries = array(cards);
    const unreadCount = entries.filter(card => !card.read).length;
    if (elements.button) {
      elements.button.disabled = false;
      elements.button.classList.toggle("has-information", entries.length > 0);
      elements.button.classList.toggle("has-unread-information", unreadCount > 0);
      elements.button.setAttribute("aria-label", unreadCount > 0 ? `정보 · 미확인 ${unreadCount}장` : "정보");
    }
    if (elements.count) elements.count.textContent = String(entries.length);
  }

  function syncWolfenMarker(state = currentState()) {
    const track = state.cards.find(card => card.special === "WOLFEN_TRACK" && card.specialExpiresDay >= currentDay());
    const wolfen = getWolfenState() || {};
    const remainingDays = track ? Math.max(0, track.specialExpiresDay - currentDay() + 1) : 0;
    setWolfenMarker(
      track ? wolfen.positionId : "",
      track ? getAssetUrl("Asset_Pin_2") : "",
      {
        remainingDays,
        expiresDay: track?.specialExpiresDay || 0
      }
    );
  }

  function open() {
    if (!elements.modal) return;
    elements.modal.hidden = false;
    void load().then(() => renderModal());
  }

  function close() {
    if (elements.modal) elements.modal.hidden = true;
    hideInformationDetailTooltip();
  }

  function showAcquiredInformation(card) {
    if (!elements.acquiredModal || !elements.acquiredCard || !card) return;
    acquiredInformationQueue.push(card);
    if (acquiredInformationVisible) return;
    showNextAcquiredInformation();
  }

  function showNextAcquiredInformation() {
    const card = acquiredInformationQueue.shift();
    if (!elements.acquiredModal || !elements.acquiredCard || !card) return;
    acquiredInformationVisible = true;
    hideCollectionTooltip();
    elements.acquiredCard.replaceChildren(createAcquiredInformation(card));
    elements.acquiredModal.classList.remove("is-revealing");
    elements.acquiredModal.hidden = false;
    window.dispatchEvent(new CustomEvent("projectw:informationacquiredview", { detail: { open: true } }));
    requestAnimationFrame(() => {
      elements.acquiredModal.classList.add("is-revealing");
      elements.acquiredClose?.focus();
    });
  }

  function closeAcquiredInformation() {
    if (acquiredInformationQueue.length) {
      acquiredInformationVisible = false;
      elements.acquiredModal?.classList.remove("is-revealing");
      showNextAcquiredInformation();
      return;
    }
    acquiredInformationVisible = false;
    if (elements.acquiredModal) elements.acquiredModal.hidden = true;
    elements.acquiredModal?.classList.remove("is-revealing");
    if (elements.acquiredCard) elements.acquiredCard.replaceChildren();
    window.dispatchEvent(new CustomEvent("projectw:informationacquiredview", { detail: { open: false } }));
  }

  function renderModal(cards = getCards()) {
    if (!elements.grid || !elements.status) return;
    hideInformationDetailTooltip();
    elements.status.textContent = loadError || (definitions.length
      ? `보유 정보 ${cards.length}장 · 정보는 12일차에 완전히 소멸합니다.`
      : "정보 시트를 불러오는 중입니다.");
    const entries = cards.map(card => createInformationListItem(card));
    elements.grid.replaceChildren(...(entries.length ? entries : [emptyMessage("아직 모은 정보가 없습니다.")]));
  }

  function updateCollectionTooltip(button, facility, blockedReason = "") {
    if (!button) return;
    button.dataset.informationFacility = facility;
    button.dataset.informationBlockedReason = blockedReason;
    button.removeAttribute("title");
    button.setAttribute("aria-describedby", "information-collection-tooltip");
    if (collectionTooltipButtons.has(button)) return;
    collectionTooltipButtons.add(button);
    button.addEventListener("pointerenter", () => showCollectionTooltip(button));
    button.addEventListener("pointerleave", hideCollectionTooltip);
    button.addEventListener("focus", () => showCollectionTooltip(button));
    button.addEventListener("blur", hideCollectionTooltip);
    button.addEventListener("click", hideCollectionTooltip);
  }

  function showCollectionTooltip(button) {
    const tooltip = elements.collectionTooltip;
    if (!tooltip || button.hidden) return;
    const title = document.createElement("strong");
    title.textContent = "정보 수집";
    const details = document.createElement("dl");
    const fields = [
      ["정보 획득 확률", `${Math.round(acquisitionChance() * 100)}%`],
      ["이번 수집", `${Math.max(0, Math.trunc(Number(button.dataset.informationAttemptCount) || 0))}회 일괄 시도`],
      ["소모 시간", button.dataset.informationFacility === "상업조합" ? "없음 (0타임)" : "1타임"],
      ["전환 시간대", button.dataset.informationTimeTransition || (button.dataset.informationFacility === "상업조합" ? "변화 없음" : "다음 시간대")]
    ];
    fields.forEach(([label, value]) => {
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value;
      details.append(term, description);
    });
    tooltip.replaceChildren(title, details);
    if (button.dataset.informationBlockedReason) {
      const reason = document.createElement("p");
      reason.textContent = button.dataset.informationBlockedReason;
      tooltip.append(reason);
    }
    tooltip.hidden = false;
    const anchor = button.getBoundingClientRect();
    const rect = tooltip.getBoundingClientRect();
    const left = Math.min(anchor.left, window.innerWidth - rect.width - 12);
    const top = anchor.bottom + rect.height + 12 <= window.innerHeight ? anchor.bottom + 10 : anchor.top - rect.height - 10;
    tooltip.style.left = `${Math.max(12, left)}px`;
    tooltip.style.top = `${Math.max(12, top)}px`;
  }

  function hideCollectionTooltip() {
    if (elements.collectionTooltip) elements.collectionTooltip.hidden = true;
  }

  function createInformationListItem(card) {
    const article = document.createElement("article");
    article.className = `information-list-item is-${ageClass(card.ageLabel)} is-${specialClass(card.special)}`;
    article.tabIndex = 0;
    article.dataset.informationId = card.id;
    article.setAttribute("aria-describedby", "information-detail-tooltip");
    if (!card.read) article.classList.add("is-unread");
    article.style.setProperty("--information-age-opacity", String(card.ageDays === 10 ? .72 : card.ageDays >= 11 ? .46 : 1));
    const category = document.createElement("span");
    category.className = "information-list-category";
    category.textContent = card.category || "정보";
    const copy = document.createElement("span");
    copy.className = "information-list-copy";
    const title = document.createElement("strong");
    appendInformationCopy(title, card.title || "제목 없는 정보");
    const state = document.createElement("small");
    state.textContent = `${card.gradeLabel} · ${card.trustLabel} · ${card.ageLabel}`;
    copy.append(title, state);
    const value = document.createElement("span");
    value.className = "information-list-value";
    const valueLabel = document.createElement("small");
    valueLabel.textContent = card.sellable ? "정보 가치" : "특수 정보";
    const valueAmount = document.createElement("strong");
    valueAmount.textContent = card.sellable ? `약 ${formatNumber(card.value)}` : specialInformationSummary(card);
    value.append(valueLabel, valueAmount);
    article.append(category, copy, value);
    article.addEventListener("pointerenter", event => {
      markCardRead(card.id, article);
      showInformationDetailTooltip(card, event.clientX, event.clientY, article);
    });
    article.addEventListener("pointermove", event => positionInformationDetailTooltip(event.clientX, event.clientY));
    article.addEventListener("pointerleave", hideInformationDetailTooltip);
    article.addEventListener("focus", () => {
      markCardRead(card.id, article);
      const rect = article.getBoundingClientRect();
      showInformationDetailTooltip(card, rect.right, rect.top + (rect.height / 2), article);
    });
    article.addEventListener("blur", hideInformationDetailTooltip);
    return article;
  }

  function createAcquiredInformation(card) {
    const article = document.createElement("article");
    article.className = `information-acquired-sheet is-${ageClass(card.ageLabel)} is-${specialClass(card.special)}`;
    const lead = document.createElement("header");
    const category = document.createElement("span");
    category.textContent = card.category || "정보";
    const title = document.createElement("h3");
    appendInformationCopy(title, card.title || "제목 없는 정보");
    lead.append(category, title);
    const content = document.createElement("p");
    content.className = "information-acquired-content";
    appendInformationCopy(content, card.content || "전해진 내용이 없습니다.");
    const meta = createInformationMeta(card);
    const footer = createInformationValueFooter(card);
    article.append(lead, content, meta, footer);
    return article;
  }

  function createInformationTooltipContent(card) {
    const wrapper = document.createElement("div");
    wrapper.className = `information-tooltip-content is-${specialClass(card.special)}`;
    const header = document.createElement("header");
    const category = document.createElement("span");
    const title = document.createElement("h3");
    category.textContent = card.category || "정보";
    appendInformationCopy(title, card.title || "제목 없는 정보");
    header.append(category, title);
    const content = document.createElement("p");
    appendInformationCopy(content, card.content || "전해진 내용이 없습니다.");
    const meta = createInformationMeta(card);
    const footer = createInformationValueFooter(card);
    wrapper.append(header, content, meta, footer);
    return wrapper;
  }

  function appendInformationCopy(container, value) {
    const source = normalizeInformationGrammar(value);
    const locationNames = [...new Set([
      ...array(getSettlements()).map(settlement => text(settlement?.name)),
      ...array(getRoutes()).map(route => text(route?.name)),
      ...REGIONS
    ].filter(Boolean))].sort((left, right) => right.length - left.length);
    if (!locationNames.length) {
      container.textContent = source;
      return;
    }
    const matcher = new RegExp(`(${locationNames.map(escapeRegExp).join("|")})`, "g");
    source.split(matcher).filter(part => part !== "").forEach(part => {
      if (locationNames.includes(part)) {
        const location = document.createElement("span");
        location.className = "information-location-name";
        location.textContent = part;
        container.append(location);
      } else container.append(document.createTextNode(part));
    });
  }

  function createInformationMeta(card) {
    const meta = document.createElement("dl");
    meta.className = "information-detail-meta";
    [
      ["등급", card.grade ? ROMAN_STEPS[card.grade] : "특수"],
      ["신뢰도", ROMAN_STEPS[card.trust] || "I"],
      ["정보 열화", `${card.ageLabel} · 생성 후 ${formatNumber(card.ageDays)}일`]
    ].forEach(([label, value]) => {
      const group = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value;
      group.append(term, description);
      meta.append(group);
    });
    return meta;
  }

  function createInformationValueFooter(card) {
    const footer = document.createElement("footer");
    const value = document.createElement("strong");
    value.textContent = card.sellable ? `가치 약 ${formatNumber(card.value)}` : "거래 불가";
    const sold = document.createElement("span");
    sold.textContent = card.sellable ? `전파 횟수 ${card.saleCount} / 3` : specialInformationSummary(card);
    footer.append(value, sold);
    return footer;
  }

  function specialInformationSummary(card) {
    return card.special === "WOLFEN_TRACK"
      ? `위치 추적 ${Math.max(0, card.specialExpiresDay - currentDay() + 1)}일`
      : "거래 불가";
  }

  function showInformationDetailTooltip(card, clientX, clientY, anchor) {
    if (!elements.detailTooltip || !card) return;
    elements.detailTooltip.replaceChildren(createInformationTooltipContent(card));
    elements.detailTooltip.hidden = false;
    elements.detailTooltip.dataset.anchorId = anchor?.dataset?.informationId || "";
    positionInformationDetailTooltip(clientX, clientY);
  }

  function positionInformationDetailTooltip(clientX, clientY) {
    const tooltip = elements.detailTooltip;
    if (!tooltip || tooltip.hidden) return;
    const margin = 14;
    const gap = 17;
    const rect = tooltip.getBoundingClientRect();
    let left = Number(clientX) + gap;
    let top = Number(clientY) + gap;
    if (left + rect.width > window.innerWidth - margin) left = Number(clientX) - rect.width - gap;
    if (top + rect.height > window.innerHeight - margin) top = Number(clientY) - rect.height - gap;
    tooltip.style.left = `${Math.max(margin, left)}px`;
    tooltip.style.top = `${Math.max(margin, top)}px`;
  }

  function hideInformationDetailTooltip() {
    if (!elements.detailTooltip) return;
    elements.detailTooltip.hidden = true;
    elements.detailTooltip.dataset.anchorId = "";
  }

  function markCardRead(cardId, article = null) {
    const state = currentState();
    const card = state.cards.find(entry => entry.id === text(cardId));
    if (!card || card.read) return false;
    card.read = true;
    setState(normalizeState(state));
    persist();
    article?.classList.remove("is-unread");
    updateToolbar(state.cards.map(presentCard));
    return true;
  }

  function emptyMessage(message) {
    const empty = document.createElement("p");
    empty.className = "information-empty";
    empty.textContent = message;
    return empty;
  }

  function advanceToDay(day = currentDay()) {
    const state = currentState();
    ensureRouteSecurity(state, getRoutes(), day);
    storeState(state);
    return state;
  }

  function ensureRouteSecurity(state, routes = getRoutes(), day = currentDay()) {
    const groups = groupRoutes(array(routes));
    const targetWeek = Math.floor((Math.max(1, integer(day, 1)) - 1) / 7);
    let week = state.routeSecurity.lastWeek;
    groups.forEach(group => {
      const baseline = clamp(average(group.routes.map(route => number(route.baseSecurity))), 0, 100);
      const record = state.routeSecurity.values[group.segmentId];
      if (!record) state.routeSecurity.values[group.segmentId] = { baseline, value: baseline };
      else {
        record.baseline = baseline;
        record.value = clamp(record.value, Math.max(0, baseline - 20), Math.min(100, baseline + 20));
      }
    });
    while (week < targetWeek) {
      week += 1;
      groups.forEach(group => {
        const record = state.routeSecurity.values[group.segmentId];
        const rng = seededRandom(`${group.segmentId}|security|${week}`);
        const delta = Math.round((rng() + rng() - 1) * 10);
        const changed = record.value + delta;
        const pulled = changed + ((record.baseline - changed) * .25);
        record.value = Math.round(clamp(pulled, Math.max(0, record.baseline - 20), Math.min(100, record.baseline + 20)));
      });
    }
    state.routeSecurity.lastWeek = Math.max(state.routeSecurity.lastWeek, targetWeek);
  }

  function getRouteCondition(placementId, roadSurfaces = []) {
    const route = array(getRoutes()).find(entry => entry.id === text(placementId));
    if (!route) return { baseStability: 50, stability: 50, baseSecurity: 50, security: 50, segmentId: "" };
    const state = currentState();
    ensureRouteSecurity(state, getRoutes(), currentDay());
    const segmentId = routeSegmentId(route);
    const record = state.routeSecurity.values[segmentId] || { baseline: number(route.baseSecurity, 50), value: number(route.baseSecurity, 50) };
    const surfaces = new Set(array(roadSurfaces).map(text));
    let penalty = 0;
    if (surfaces.has("진흙 길")) penalty = 30;
    else if (surfaces.has("눈덮힌 길")) penalty = 25;
    else if (surfaces.has("젖은 길")) penalty = 15;
    return {
      baseStability: clamp(number(route.baseStability, 50), 0, 100),
      stability: clamp(number(route.baseStability, 50) - penalty, 0, 100),
      baseSecurity: clamp(number(record.baseline, 50), 0, 100),
      security: clamp(number(record.value, 50), 0, 100),
      segmentId
    };
  }

  function routeSecurityContexts(routes, state) {
    return groupRoutes(routes).map(group => {
      const record = state.routeSecurity.values[group.segmentId];
      return {
        segmentId: group.segmentId,
        name: group.name,
        security: number(record?.value, average(group.routes.map(route => number(route.baseSecurity))))
      };
    });
  }

  function groupRoutes(routes) {
    const groups = new Map();
    array(routes).forEach(route => {
      const segmentId = routeSegmentId(route);
      if (!groups.has(segmentId)) groups.set(segmentId, { segmentId, name: route.name || "이름 없는 경로", routes: [] });
      groups.get(segmentId).routes.push(route);
    });
    return [...groups.values()];
  }

  function routeSegmentId(route) {
    return text(route?.routeSegment || route?.routeDivision || route?.name || route?.id || "route");
  }

  function dominantWeather(labels) {
    const counts = new Map();
    labels.filter(label => WEATHER_LABELS.includes(label)).forEach(label => counts.set(label, (counts.get(label) || 0) + 1));
    return [...counts].sort((left, right) => right[1] - left[1] || WEATHER_LABELS.indexOf(left[0]) - WEATHER_LABELS.indexOf(right[0]))[0]?.[0] || "";
  }

  function finalMarketState(index) {
    if (index >= 50) return "SURGE";
    if (index >= 30) return "HIGH";
    if (index <= -50) return "CRASH";
    if (index <= -30) return "LOW";
    return index >= 0 ? "HIGH" : "LOW";
  }

  function longestWeatherRun(labels, target) {
    let longest = 0;
    let current = 0;
    labels.forEach(label => {
      current = label === target ? current + 1 : 0;
      longest = Math.max(longest, current);
    });
    return longest;
  }

  function weatherLabel(placementId) {
    const weather = getWeather(placementId);
    return text(typeof weather === "object" ? weather?.label : weather) || "맑음";
  }

  function nearestSettlement(route, settlements) {
    if (!route || !Number.isFinite(Number(route.x)) || !Number.isFinite(Number(route.y))) return settlements[0] || null;
    return [...settlements].sort((left, right) => pointDistance(route, left) - pointDistance(route, right))[0] || null;
  }

  function pointDistance(left, right) {
    return Math.hypot(number(left?.x) - number(right?.x), number(left?.y) - number(right?.y));
  }

  function weightedStep(table, minimum, maximum) {
    const low = clamp(minimum || 1, 1, 6);
    const high = clamp(maximum || low, low, 6);
    const choices = [];
    for (let step = low; step <= high; step += 1) choices.push({ step, weight: table[step]?.weight || 1 });
    return weightedEntry(choices, choice => choice.weight)?.step || low;
  }

  function weightedEntry(entries, weightOf) {
    const valid = array(entries).filter(entry => number(weightOf(entry)) > 0);
    if (!valid.length) return null;
    let roll = Math.random() * valid.reduce((sum, entry) => sum + number(weightOf(entry)), 0);
    for (const entry of valid) {
      roll -= number(weightOf(entry));
      if (roll <= 0) return entry;
    }
    return valid.at(-1) || null;
  }

  function centeredInteger(minimum, maximum, center) {
    const weighted = [];
    for (let value = minimum; value <= maximum; value += 1) {
      const weight = Math.max(1, (maximum - minimum + 2) - (Math.abs(value - center) * 2));
      for (let index = 0; index < weight; index += 1) weighted.push(value);
    }
    return weighted[Math.floor(Math.random() * weighted.length)] || center;
  }

  function interpolate(input, variables) {
    const source = text(input);
    const withParticles = source.replace(/\{\{([^}]+)\}\}(은|는|이|가|을|를)/g, (match, key, particle) => {
      const value = text(variables[text(key)]);
      return value ? `${value}${koreanParticle(value, particle)}` : match;
    });
    return normalizeInformationGrammar(withParticles.replace(/\{\{([^}]+)\}\}/g, (match, key) => text(variables[text(key)]) || match));
  }

  function koreanParticle(value, requested) {
    const pair = ({ 은: ["은", "는"], 는: ["은", "는"], 이: ["이", "가"], 가: ["이", "가"], 을: ["을", "를"], 를: ["을", "를"] })[requested];
    if (!pair) return requested;
    return hasFinalConsonant(value) ? pair[0] : pair[1];
  }

  function hasFinalConsonant(value) {
    const last = [...text(value)].at(-1) || "";
    const code = last.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) return (code - 0xAC00) % 28 !== 0;
    if (/\d/.test(last)) return ["0", "1", "3", "6", "7", "8"].includes(last);
    return false;
  }

  function normalizeInformationGrammar(value) {
    return text(value)
      .replace(/\[([가-힣A-Za-z0-9]+)\](이|가) 아닌/g, (match, noun) => `[${noun}]${koreanParticle(noun, "이")} 아닌`)
      .replace(/([가-힣A-Za-z0-9]+)(이|가) 아닌/g, (match, noun) => `${noun}${koreanParticle(noun, "이")} 아닌`);
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function romanNumber(value) {
    const normalized = text(value).toUpperCase();
    const index = ROMAN_STEPS.indexOf(normalized);
    return index > 0 ? index : clamp(integer(value), 0, 6);
  }

  function ageClass(label) {
    return ({ 신선: "fresh", 통상: "normal", 늦음: "late", 소멸: "fading" })[label] || "expired";
  }

  function specialClass(value) {
    return text(value).toLowerCase().replaceAll("_", "-") || "general";
  }

  function currentDay() {
    return Math.max(1, integer(getWorldDay(), 1));
  }

  function seededRandom(seedText) {
    let seed = 2166136261;
    for (const character of String(seedText)) {
      seed ^= character.charCodeAt(0);
      seed = Math.imul(seed, 16777619);
    }
    return function random() {
      seed += 0x6D2B79F5;
      let value = seed;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function randomInteger(minimum, maximum) {
    return minimum + Math.floor(Math.random() * ((maximum - minimum) + 1));
  }

  function average(values) {
    const finite = array(values).map(Number).filter(Number.isFinite);
    return finite.length ? finite.reduce((sum, value) => sum + value, 0) / finite.length : 50;
  }

  function nullableNumber(value) {
    const raw = text(value);
    if (!raw) return null;
    const result = Number(raw.replaceAll(",", "").replace("%", ""));
    return Number.isFinite(result) ? result : null;
  }

  function number(value, fallback = 0) {
    const result = Number(String(value ?? "").replaceAll(",", "").replace("%", "").trim());
    return Number.isFinite(result) ? result : fallback;
  }

  function integer(value, fallback = 0) {
    const result = Number(value);
    return Number.isFinite(result) ? Math.trunc(result) : fallback;
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

  window.ProjectWInformation = {
    init,
    load,
    createState,
    normalizeState,
    collect,
    acquisitionChance,
    updateCollectionTooltip,
    getCards,
    getTradeCards,
    getCard,
    recordSale,
    hasValidWolfenTrack,
    getWolfenTrack,
    getRouteCondition,
    advanceToDay,
    refresh,
    appendRichText: appendInformationCopy,
    open,
    close
  };
}());
