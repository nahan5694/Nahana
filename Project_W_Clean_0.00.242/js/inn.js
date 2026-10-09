(function exposeInn() {
  const DAILY_STOCK = Object.freeze({
    G_0267: 10,
    G_0268: 5,
    G_0269: 10,
    G_0270: 10,
    G_0271: 10,
    G_0272: 1,
    G_0273: 1,
    G_0276: 1,
    G_0278: 1,
    G_0279: 1
  });
  const AVAILABLE_BY_SCALE = Object.freeze({
    대도시: Object.freeze(["G_0267", "G_0268", "G_0269", "G_0270", "G_0271", "G_0272", "G_0273", "G_0276"]),
    도시: Object.freeze(["G_0267", "G_0268", "G_0269", "G_0271", "G_0272", "G_0276"]),
    마을: Object.freeze(["G_0267", "G_0271"]),
    관문: Object.freeze(["G_0267", "G_0268", "G_0269", "G_0271", "G_0272", "G_0276"])
  });
  const LODGING_TOTAL_RANGES = new Map([
    ["대도시", [15, 20]],
    ["도시", [12, 16]],
    ["마을", [5, 8]],
    ["관문", [8, 12]]
  ]);
  const FIXED_LODGING_LINES = Object.freeze([
    Object.freeze({ label: "마굿간비", value: 2, description: "짐마차와 말을 밤새 맡깁니다." }),
    Object.freeze({ label: "말 먹이", value: 1, description: "말의 허기를 전부 회복합니다." }),
    Object.freeze({ label: "세면용 물", value: 1, description: "두 사람이 사용할 물을 준비합니다." })
  ]);
  const LODGING_MOOD_RECOVERY = 5;
  const LODGING_WITHOUT_MEAL_MOOD_PENALTY = -20;
  const TIME_PHASES = Object.freeze(["아침", "낮", "오후", "저녁", "밤"]);
  const WAGON_EFFECT_REPAIR_RANGES = new Map([
    ["차축 삐걱임", [25, 30]],
    ["수레바퀴 손상", [110, 120]],
    ["화물 고정 불량", [40, 50]],
    ["물 새는 천막", [40, 50]],
    ["짐마차 반파", [350, 400]]
  ]);
  const WAGON_EFFECT_DESCRIPTIONS = new Map([
    ["차축 삐걱임", "수레바퀴 손상 발생 확률이 5배 증가합니다."],
    ["수레바퀴 손상", "짐마차 이동속도가 50% 감소합니다."],
    ["화물 고정 불량", "험지·산지·숲길에서 파손 화물의 열화 위험이 증가합니다."],
    ["물 새는 천막", "비·폭우에서 신선 화물의 열화 위험이 증가합니다."],
    ["짐마차 반파", "화물을 모두 잃고 짐마차 이동속도가 75% 감소합니다."]
  ]);

  let elements;
  let settlement = null;
  let view = "home";
  let sceneVisit = false;
  let errandOrder = new Map();
  let payment = new Map();
  let paymentPurpose = null;
  let maintenanceConditionSelected = false;
  let maintenanceEffects = new Set();
  let tradeReviewEntries = [];
  let tradeReviewIndex = 0;
  let tradeReviewViewedIds = new Set();
  let lodgingPaymentCommitted = false;
  let tradeReviewFinishing = false;
  let getPlayerWallet = () => ({});
  let setPlayerWallet = () => {};
  let getWorldTime = () => ({ day: 1, phaseIndex: 0 });
  let getWorldSeed = () => "legacy-world";
  let getFoodUsage = () => ({ day: 1, mealUsed: false, snackUsed: false });
  let getPartnerMood = () => 50;
  let getCityEventModifiers = () => ({ lodgingMoodBonus: 0, lodgingFeePercent: 0, maintenanceFeePercent: 0 });
  let getLodgingMoodRecovery = () => hasEatenToday() ? LODGING_MOOD_RECOVERY : LODGING_WITHOUT_MEAL_MOOD_PENALTY;
  let getInformationOpportunity = () => ({ maximum: 1, used: 0, remaining: 1, resetInDays: 3 });
  let collectInformation = () => false;
  let completeLodging = () => false;
  let getWagonState = () => ({ condition: 200, maxCondition: 200, effects: [] });
  let setWagonState = () => {};
  let getErrandState = () => ({});
  let setErrandState = () => {};
  let getAssetUrl = () => "";
  let showReviewDialogue = () => {};
  let persistInterface = () => {};
  let notify = () => {};

  function init(options = {}) {
    getPlayerWallet = typeof options.getPlayerWallet === "function" ? options.getPlayerWallet : getPlayerWallet;
    setPlayerWallet = typeof options.setPlayerWallet === "function" ? options.setPlayerWallet : setPlayerWallet;
    getWorldTime = typeof options.getWorldTime === "function" ? options.getWorldTime : getWorldTime;
    getWorldSeed = typeof options.getWorldSeed === "function" ? options.getWorldSeed : getWorldSeed;
    getFoodUsage = typeof options.getFoodUsage === "function" ? options.getFoodUsage : getFoodUsage;
    getPartnerMood = typeof options.getPartnerMood === "function" ? options.getPartnerMood : getPartnerMood;
    getCityEventModifiers = typeof options.getCityEventModifiers === "function" ? options.getCityEventModifiers : getCityEventModifiers;
    getLodgingMoodRecovery = typeof options.getLodgingMoodRecovery === "function" ? options.getLodgingMoodRecovery : getLodgingMoodRecovery;
    getInformationOpportunity = typeof options.getInformationOpportunity === "function" ? options.getInformationOpportunity : getInformationOpportunity;
    collectInformation = typeof options.collectInformation === "function" ? options.collectInformation : collectInformation;
    completeLodging = typeof options.completeLodging === "function" ? options.completeLodging : completeLodging;
    getWagonState = typeof options.getWagonState === "function" ? options.getWagonState : getWagonState;
    setWagonState = typeof options.setWagonState === "function" ? options.setWagonState : setWagonState;
    getErrandState = typeof options.getErrandState === "function" ? options.getErrandState : getErrandState;
    setErrandState = typeof options.setErrandState === "function" ? options.setErrandState : setErrandState;
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    showReviewDialogue = typeof options.showReviewDialogue === "function" ? options.showReviewDialogue : showReviewDialogue;
    persistInterface = typeof options.persistInterface === "function" ? options.persistInterface : persistInterface;
    notify = typeof options.notify === "function" ? options.notify : notify;
    elements = {
      modal: document.querySelector("#inn-modal"),
      window: document.querySelector("#inn-modal .inn-window"),
      background: document.querySelector("#inn-scene-background"),
      location: document.querySelector("#inn-location"),
      close: document.querySelector("#inn-close"),
      home: document.querySelector("#inn-home"),
      information: document.querySelector("#inn-information"),
      informationCount: document.querySelector("#inn-information-count"),
      meal: document.querySelector("#inn-meal"),
      errand: document.querySelector("#inn-errand"),
      errandDescription: document.querySelector("#inn-errand-description"),
      maintenance: document.querySelector("#inn-maintenance"),
      maintenanceView: document.querySelector("#inn-maintenance-view"),
      maintenanceCondition: document.querySelector("#inn-maintenance-condition"),
      maintenanceFill: document.querySelector("#inn-maintenance-fill"),
      maintenanceOptions: document.querySelector("#inn-maintenance-options"),
      maintenanceTotal: document.querySelector("#inn-maintenance-total"),
      maintenancePay: document.querySelector("#inn-maintenance-pay"),
      lodging: document.querySelector("#inn-lodging"),
      lodgingView: document.querySelector("#inn-lodging-view"),
      invoice: document.querySelector("#inn-invoice"),
      lodgingPay: document.querySelector("#inn-lodging-pay"),
      lodgingMoodEffect: document.querySelector("#inn-lodging-mood-effect"),
      lodgingMealStatus: document.querySelector("#inn-lodging-meal-status"),
      errandView: document.querySelector("#inn-errand-view"),
      errandRefresh: document.querySelector("#inn-errand-refresh"),
      errandCatalog: document.querySelector("#inn-errand-catalog"),
      errandOrder: document.querySelector("#inn-errand-order"),
      errandTotals: document.querySelector("#inn-errand-totals"),
      errandCapacity: document.querySelector("#inn-errand-capacity"),
      errandClear: document.querySelector("#inn-errand-clear"),
      errandPay: document.querySelector("#inn-errand-pay"),
      paymentView: document.querySelector("#inn-payment-view"),
      paymentTitle: document.querySelector("#inn-payment-title"),
      paymentBack: document.querySelector("#inn-payment-back"),
      walletTotal: document.querySelector("#inn-wallet-total"),
      currencyList: document.querySelector("#inn-currency-list"),
      paymentClear: document.querySelector("#inn-payment-clear"),
      paymentOffer: document.querySelector("#inn-payment-offer-list"),
      paymentRequired: document.querySelector("#inn-payment-required"),
      paymentOffered: document.querySelector("#inn-payment-offered"),
      paymentChange: document.querySelector("#inn-payment-change"),
      paymentMessage: document.querySelector("#inn-payment-message"),
      paymentLodgingEffect: document.querySelector("#inn-payment-lodging-effect"),
      paymentConfirm: document.querySelector("#inn-payment-confirm"),
      tradeReviewView: document.querySelector("#inn-trade-review-view"),
      tradeReviewProgress: document.querySelector("#inn-trade-review-progress"),
      tradeReviewList: document.querySelector("#inn-trade-review-list"),
      tradeReviewDetail: document.querySelector("#inn-trade-review-detail"),
      tradeReviewFinish: document.querySelector("#inn-trade-review-finish"),
      backButtons: [...document.querySelectorAll("[data-inn-back]")]
    };
    if (!elements.modal) return;
    elements.close.addEventListener("click", close);
    elements.information.addEventListener("click", handleInformation);
    elements.meal.addEventListener("click", openMeal);
    elements.errand.addEventListener("click", openErrand);
    elements.maintenance.addEventListener("click", openMaintenance);
    elements.lodging.addEventListener("click", openLodging);
    elements.backButtons.forEach(button => button.addEventListener("click", () => setView("home")));
    elements.lodgingPay.addEventListener("click", () => openPayment("lodging"));
    elements.errandCatalog.addEventListener("click", handleErrandQuantity);
    elements.errandOrder.addEventListener("click", handleErrandQuantity);
    elements.errandClear.addEventListener("click", () => {
      errandOrder.clear();
      renderErrand();
    });
    elements.errandPay.addEventListener("click", () => openPayment("errand"));
    elements.maintenanceOptions.addEventListener("click", handleMaintenanceSelection);
    elements.maintenancePay.addEventListener("click", () => openPayment("maintenance"));
    elements.paymentBack.addEventListener("click", () => setView(paymentReturnView()));
    elements.currencyList.addEventListener("click", handleCurrencyAdd);
    elements.paymentOffer.addEventListener("click", handlePaymentQuantity);
    elements.paymentClear.addEventListener("click", () => clearPayment(true));
    elements.paymentConfirm.addEventListener("click", completePayment);
    elements.tradeReviewList?.addEventListener("click", handleTradeReviewSelection);
    elements.tradeReviewFinish?.addEventListener("click", finishTradeReview);
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !isOpen()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (view === "review") return;
      if (view === "payment") setView(paymentReturnView());
      else if (view !== "home") setView("home");
      else close();
    });
  }

  async function load() {
    await Promise.all([window.ProjectWWallet.load(), window.ProjectWCargo.load(), window.ProjectWCityEvents.load()]);
    await window.ProjectWCityEvents.ensureCurrentDay();
    return true;
  }

  async function open(context = {}) {
    settlement = context.settlement || null;
    if (!settlement || !elements?.modal) return;
    errandOrder.clear();
    payment.clear();
    paymentPurpose = null;
    maintenanceConditionSelected = false;
    maintenanceEffects.clear();
    tradeReviewEntries = [];
    tradeReviewIndex = 0;
    tradeReviewViewedIds.clear();
    lodgingPaymentCommitted = false;
    tradeReviewFinishing = false;
    sceneVisit = false;
    elements.location.textContent = `${settlement.name || "거점"} · 여관`;
    applyBackground();
    elements.modal.hidden = false;
    setView("home");
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", { detail: { open: true, facilityType: "여관" } }));
    await load();
    if (isOpen()) render();
  }

  function close() {
    if (!isActive()) return;
    if (lodgingPaymentCommitted || view === "review") return;
    elements.modal.hidden = true;
    sceneVisit = false;
    errandOrder.clear();
    payment.clear();
    paymentPurpose = null;
    maintenanceConditionSelected = false;
    maintenanceEffects.clear();
    tradeReviewEntries = [];
    tradeReviewViewedIds.clear();
    settlement = null;
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", { detail: { open: false, facilityType: "여관" } }));
  }

  function isOpen() {
    return Boolean(elements?.modal && !elements.modal.hidden);
  }

  function isActive() {
    return Boolean(settlement && (isOpen() || sceneVisit));
  }

  function isSceneVisit() {
    return Boolean(settlement && sceneVisit);
  }

  function suspendForScene() {
    if (!isOpen()) return false;
    sceneVisit = true;
    elements.modal.hidden = true;
    return true;
  }

  function resumeFromScene() {
    if (!isSceneVisit()) return false;
    sceneVisit = false;
    elements.modal.hidden = false;
    setView(view);
    return true;
  }

  function refresh() {
    applyBackground();
    if (isOpen()) render();
  }

  function setView(next) {
    view = ["home", "maintenance", "lodging", "errand", "payment", "review"].includes(next) ? next : "home";
    elements.home.hidden = view !== "home";
    elements.maintenanceView.hidden = view !== "maintenance";
    elements.lodgingView.hidden = view !== "lodging";
    elements.errandView.hidden = view !== "errand";
    elements.paymentView.hidden = view !== "payment";
    if (elements.tradeReviewView) elements.tradeReviewView.hidden = view !== "review";
    elements.close.hidden = view === "review";
    elements.window.classList.toggle("is-wide", view !== "home");
    elements.window.classList.toggle("is-trade-review", view === "review");
    elements.modal.classList.toggle("is-detail-view", view !== "home");
    render();
    window.dispatchEvent(new CustomEvent("projectw:innviewchange", { detail: { view } }));
  }

  function applyBackground() {
    if (!elements?.background) return;
    const source = getAssetUrl("Asset_A_10");
    elements.background.dataset.assetId = "Asset_A_10";
    if (source) elements.background.src = source;
  }

  function render() {
    if (!isOpen()) return;
    if (view === "home") renderHome();
    else if (view === "maintenance") renderMaintenance();
    else if (view === "lodging") renderLodging();
    else if (view === "errand") renderErrand();
    else if (view === "payment") renderPayment();
    else renderTradeReview();
  }

  function renderHome() {
    const opportunity = getInformationOpportunity("여관", settlement) || {};
    const remaining = Math.max(0, Number(opportunity.remaining) || 0);
    const resetInDays = Math.max(1, Number(opportunity.resetInDays) || 3);
    const phaseIndex = Math.min(TIME_PHASES.length - 1, Math.max(0, Math.trunc(Number(getWorldTime()?.phaseIndex) || 0)));
    const night = currentTimePhase() === "밤";
    elements.information.dataset.informationTimeTransition = `${TIME_PHASES[phaseIndex]} → ${TIME_PHASES[(phaseIndex + 1) % TIME_PHASES.length]}`;
    elements.information.dataset.informationAttemptCount = String(remaining);
    elements.information.disabled = night || remaining <= 0;
    elements.information.classList.toggle("is-limit-exhausted", remaining <= 0);
    window.ProjectWInformation.updateCollectionTooltip(elements.information, "여관", opportunity.locked
      ? "아직 정보 수집 기능이 해금되지 않았습니다."
      : night ? "밤에는 여관에서 정보를 수집할 수 없습니다."
      : remaining <= 0 ? "이번 3일 주기의 정보 수집 기회를 모두 사용했습니다." : "");
    elements.informationCount.textContent = night
      ? `밤에는 이용 불가 · ${resetInDays}일 후 초기화`
      : `1타임 · 남은 ${remaining}회 모두 시도 · ${resetInDays}일 후 초기화`;
    const worldDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const foodUsage = getFoodUsage() || {};
    const mealUsed = Math.max(1, Math.trunc(Number(foodUsage.day) || 1)) === worldDay && Boolean(foodUsage.mealUsed);
    elements.meal.disabled = mealUsed;
    elements.meal.classList.toggle("is-limit-exhausted", mealUsed);
    elements.meal.title = mealUsed ? "오늘은 이미 식사를 했습니다." : "여관의 식사 메뉴를 엽니다.";
    elements.errand.disabled = night;
    if (elements.errandDescription) {
      elements.errandDescription.textContent = night
        ? "밤에는 심부름꾼을 이용할 수 없습니다."
        : "여행 물품을 대신 사 오도록 부탁합니다.";
    }
    updateLodgingEffect();
  }

  function openErrand() {
    if (currentTimePhase() === "밤") {
      notify("밤에는 심부름꾼을 이용할 수 없습니다.");
      renderHome();
      return;
    }
    setView("errand");
  }

  function openMaintenance() {
    const wagon = normalizeWagon(getWagonState());
    maintenanceConditionSelected = wagon.condition < wagon.maxCondition;
    maintenanceEffects = new Set(wagon.effects);
    setView("maintenance");
  }

  function openLodging() {
    setView("lodging");
  }

  function normalizeWagon(value) {
    const maxCondition = Math.max(1, Number(value?.maxCondition) || 200);
    return {
      condition: Math.min(maxCondition, Math.max(0, Number(value?.condition) || 0)),
      maxCondition,
      effects: [...new Set((Array.isArray(value?.effects) ? value.effects : [])
        .map(effect => String(effect || "").trim())
        .filter(Boolean))]
    };
  }

  function maintenanceEffectCost(effect) {
    const range = WAGON_EFFECT_REPAIR_RANGES.get(effect) || [40, 50];
    const seed = `${settlement?.id || settlement?.name || "inn"}:${getWorldTime()?.day || 1}:${effect}`;
    return range[0] + (hashString(seed) % ((range[1] - range[0]) + 1));
  }

  function maintenanceSummary() {
    const wagon = normalizeWagon(getWagonState());
    const conditionPoints = maintenanceConditionSelected
      ? Math.max(0, Math.ceil(wagon.maxCondition - wagon.condition))
      : 0;
    const effectEntries = wagon.effects
      .filter(effect => maintenanceEffects.has(effect))
      .map(effect => ({ effect, cost: maintenanceEffectCost(effect) }));
    const baseTotal = conditionPoints + effectEntries.reduce((sum, entry) => sum + entry.cost, 0);
    const eventPercent = Number(getCityEventModifiers(settlement).maintenanceFeePercent) || 0;
    return {
      wagon,
      conditionPoints,
      effectEntries,
      baseTotal,
      eventPercent,
      total: Math.max(0, Math.round(baseTotal * (1 + (eventPercent / 100))))
    };
  }

  function renderMaintenance() {
    const summary = maintenanceSummary();
    const wagon = summary.wagon;
    const conditionRatio = Math.min(1, Math.max(0, wagon.condition / wagon.maxCondition));
    elements.maintenanceCondition.textContent = `${formatNumber(wagon.condition)} / ${formatNumber(wagon.maxCondition)}`;
    elements.maintenanceCondition.className = conditionRatio <= .25 ? "is-danger" : conditionRatio <= .5 ? "is-warning" : "";
    elements.maintenanceFill.style.width = `${conditionRatio * 100}%`;

    const rows = [];
    const missing = Math.max(0, Math.ceil(wagon.maxCondition - wagon.condition));
    if (missing > 0) {
      rows.push(createMaintenanceOption({
        kind: "condition",
        label: "내구도 회복",
        description: `내구도 ${formatNumber(missing)} 회복 · 1당 가치 1`,
        cost: missing,
        selected: maintenanceConditionSelected
      }));
    } else {
      rows.push(createMaintenanceUnavailable("내구도 회복", "짐마차 내구도가 최대입니다."));
    }
    if (wagon.effects.length) {
      wagon.effects.forEach(effect => rows.push(createMaintenanceOption({
        kind: "effect",
        effect,
        label: effect,
        description: WAGON_EFFECT_DESCRIPTIONS.get(effect) || "짐마차 상태이상을 제거합니다.",
        cost: maintenanceEffectCost(effect),
        selected: maintenanceEffects.has(effect)
      })));
    } else {
      rows.push(createMaintenanceUnavailable("상태이상 제거", "수리할 상태이상이 없습니다."));
    }
    elements.maintenanceOptions.replaceChildren(...rows);
    elements.maintenanceTotal.textContent = summary.eventPercent
      ? `${formatNumber(summary.total)} 가치 · 도시 이벤트 ${summary.eventPercent > 0 ? "+" : ""}${formatNumber(summary.eventPercent)}%`
      : `${formatNumber(summary.total)} 가치`;
    elements.maintenancePay.disabled = summary.total <= 0;
  }

  function createMaintenanceOption({ kind, effect = "", label, description, cost, selected }) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inn-maintenance-option";
    button.dataset.maintenanceKind = kind;
    if (effect) button.dataset.maintenanceEffect = effect;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.innerHTML = `<span class="inn-maintenance-check" aria-hidden="true">${selected ? "✓" : ""}</span><span class="inn-maintenance-option-copy"><strong>${escapeHtml(label)}</strong><small>${escapeHtml(description)}</small></span><b>${formatNumber(cost)} 가치</b>`;
    return button;
  }

  function createMaintenanceUnavailable(label, description) {
    const row = document.createElement("div");
    row.className = "inn-maintenance-option is-unavailable";
    row.innerHTML = `<span class="inn-maintenance-check" aria-hidden="true">—</span><span class="inn-maintenance-option-copy"><strong>${escapeHtml(label)}</strong><small>${escapeHtml(description)}</small></span>`;
    return row;
  }

  function handleMaintenanceSelection(event) {
    const button = event.target.closest("button[data-maintenance-kind]");
    if (!button) return;
    if (button.dataset.maintenanceKind === "condition") {
      maintenanceConditionSelected = !maintenanceConditionSelected;
    } else {
      const effect = button.dataset.maintenanceEffect || "";
      if (maintenanceEffects.has(effect)) maintenanceEffects.delete(effect);
      else maintenanceEffects.add(effect);
    }
    renderMaintenance();
  }

  async function handleInformation() {
    if (currentTimePhase() === "밤") {
      notify("밤에는 여관에서 정보를 수집할 수 없습니다.");
      renderHome();
      return;
    }
    const used = await collectInformation("여관", settlement);
    if (used !== false) renderHome();
  }

  async function openMeal() {
    if (!settlement) return;
    const target = settlement;
    close();
    const opened = await window.ProjectWMeal.open({
      settlement: target,
      vendor: "여관",
      kind: "meal",
      backgroundAssetId: "Asset_A_10",
      onReturn: () => open({ settlement: target })
    });
    if (!opened && !window.ProjectWMeal.isOpen()) open({ settlement: target });
  }

  function lodgingInvoice() {
    const category = settlement?.category || "도시";
    const range = LODGING_TOTAL_RANGES.get(category) || LODGING_TOTAL_RANGES.get("도시");
    const seed = `${settlement?.id || settlement?.name || "inn"}:${getWorldTime()?.day || 1}`;
    const baseTotal = range[0] + (hashString(seed) % ((range[1] - range[0]) + 1));
    const fixedTotal = FIXED_LODGING_LINES.reduce((sum, line) => sum + line.value, 0);
    const eventPercent = Number(getCityEventModifiers(settlement).lodgingFeePercent) || 0;
    const total = Math.max(0, Math.round(baseTotal * (1 + (eventPercent / 100))));
    const lines = [
      { label: "2인용 개인실", value: Math.max(1, baseTotal - fixedTotal), description: `${category} 숙박 시세가 반영된 객실입니다.` },
      ...FIXED_LODGING_LINES
    ];
    if (eventPercent) lines.push({
      label: "도시 이벤트 보정",
      value: total - baseTotal,
      description: `현재 거점의 사건으로 숙박비가 ${Math.abs(eventPercent)}% ${eventPercent < 0 ? "감소" : "증가"}합니다.`,
      adjustment: true
    });
    return {
      total,
      baseTotal,
      eventPercent,
      lines
    };
  }

  function renderLodging() {
    updateLodgingEffect();
    const invoice = lodgingInvoice();
    const fragment = document.createDocumentFragment();
    invoice.lines.forEach(line => {
      const row = document.createElement("div");
      const copy = document.createElement("span");
      const label = document.createElement("strong");
      const description = document.createElement("small");
      const value = document.createElement("b");
      label.textContent = line.label;
      description.textContent = line.description;
      value.textContent = line.adjustment
        ? `${line.value > 0 ? "+" : ""}${formatNumber(line.value)} 가치`
        : `기준 가치 ${formatNumber(line.value)}`;
      copy.append(label, description);
      row.append(copy, value);
      fragment.append(row);
    });
    const total = document.createElement("div");
    total.className = "inn-invoice-total";
    total.innerHTML = `<span>최종 청구액</span><strong>${formatNumber(invoice.total)} 가치</strong>`;
    fragment.append(total);
    elements.invoice.replaceChildren(fragment);
  }

  function updateLodgingEffect() {
    if (!elements?.lodgingMoodEffect) return;
    const preview = lodgingMoodPreview();
    elements.lodgingMoodEffect.textContent = preview.effect;
    elements.lodgingMoodEffect.classList.toggle("is-penalty", preview.penalty);
    if (elements.lodgingMealStatus) {
      elements.lodgingMealStatus.textContent = preview.reason;
      elements.lodgingMealStatus.classList.toggle("is-penalty", preview.penalty);
    }
    if (elements.lodgingPay) {
      elements.lodgingPay.textContent = preview.penalty ? "식사 없이 숙박 진행" : "숙박비 지불";
    }
  }

  function hasEatenToday() {
    const day = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const usage = getFoodUsage() || {};
    return Math.max(1, Math.trunc(Number(usage.day) || 1)) === day && Boolean(usage.mealUsed);
  }

  function lodgingMoodPreview() {
    const mood = Math.min(100, Math.max(0, Number(getPartnerMood()) || 0));
    const requested = Number(getLodgingMoodRecovery(settlement)) || 0;
    const applied = Math.max(0, Math.min(100, mood + requested)) - mood;
    const signed = value => `${value > 0 ? "+" : value < 0 ? "−" : ""}${formatNumber(Math.abs(value))}`;
    const ateToday = hasEatenToday();
    return {
      effect: `나하나 기분 ${signed(applied)}`,
      reason: ateToday
        ? `오늘 식사 완료 · 숙박 기분 회복 ${signed(requested)}`
        : `식사 경고 · 오늘 식사하지 않은 채 숙박하면 나하나의 기분이 ${formatNumber(Math.abs(requested))} 감소합니다.`,
      penalty: requested < 0
    };
  }

  function currentTimePhase() {
    const phaseIndex = Math.min(TIME_PHASES.length - 1, Math.max(0, Math.trunc(Number(getWorldTime()?.phaseIndex) || 0)));
    return TIME_PHASES[phaseIndex];
  }

  function currentErrandRecord() {
    const state = normalizeErrandState(getErrandState());
    const key = String(settlement?.id || settlement?.name || "unknown");
    const day = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const existing = state[key];
    if (!existing || existing.day !== day) {
      state[key] = { day, stock: { ...DAILY_STOCK } };
      setErrandState(state);
    }
    return { state, key, record: state[key] };
  }

  function availableErrandDefinitions() {
    const allowed = [
      ...(AVAILABLE_BY_SCALE[settlement?.category] || AVAILABLE_BY_SCALE.도시),
      ...window.ProjectWCargo.getRegionalCampSupplyIds(settlement)
    ];
    const definitions = new Map(window.ProjectWCargo.getItemDefinitions().map(definition => [definition.id, definition]));
    return allowed.map(itemId => definitions.get(itemId)).filter(Boolean);
  }

  function errandEntries() {
    const definitions = new Map(window.ProjectWCargo.getItemDefinitions().map(definition => [definition.id, definition]));
    return [...errandOrder]
      .map(([itemId, quantity]) => ({ definition: definitions.get(itemId), quantity }))
      .filter(entry => entry.definition && entry.quantity > 0);
  }

  function renderErrand() {
    const { record } = currentErrandRecord();
    const definitions = availableErrandDefinitions();
    if (!definitions.length) {
      elements.errandCatalog.replaceChildren(emptyMessage("Goods 시트에서 심부름 상품 정보를 불러오지 못했습니다."));
    } else {
      elements.errandCatalog.replaceChildren(...definitions.map(definition => createErrandCatalogRow(definition, record.stock[definition.id] || 0)));
    }
    const entries = errandEntries();
    elements.errandOrder.replaceChildren(...(entries.length
      ? entries.map(({ definition, quantity }) => createErrandOrderRow(definition, quantity, record.stock[definition.id] || 0))
      : [emptyMessage("왼쪽 목록에서 부탁할 물품을 고르세요.")]));
    const summary = errandSummary(entries);
    elements.errandTotals.replaceChildren(
      createTotalRow("물품값", summary.subtotal),
      createTotalRow("기본 심부름값", summary.baseFee),
      createTotalRow("무거운 야영 물품", summary.campFee),
      createTotalRow("대형 짐 추가", summary.heavyFee),
      createTotalRow("최종 청구액", summary.total, true)
    );
    const preview = errandCargoPreview(entries);
    elements.errandCapacity.classList.toggle("is-over", !preview.possible);
    elements.errandCapacity.innerHTML = `<span>구입 후 화물</span><strong>${formatNumber(preview.usedSlots)} / ${formatNumber(preview.totalSlots)}칸 · ${formatNumber(preview.weight)} / ${formatNumber(preview.maxWeight)} 무게</strong>`;
    elements.errandPay.disabled = !entries.length || !preview.possible;
    elements.errandClear.disabled = !entries.length;
  }

  function createErrandCatalogRow(definition, stock) {
    const quantity = errandOrder.get(definition.id) || 0;
    const article = document.createElement("article");
    article.className = `inn-errand-item ${errandCategoryClass(definition.category)}`;
    article.innerHTML = `<div><strong>${escapeHtml(definition.name3 || definition.displayName)}</strong><span>${escapeHtml(definition.category)} · ${formatNumber(definition.slotCount)}칸 · 무게 ${formatNumber(definition.weight)}</span></div><div class="inn-errand-value"><small>가치</small><b>${formatNumber(definition.baseValue)}</b></div><div class="inn-errand-stock"><small>재고</small><b>× ${formatNumber(stock)}</b></div>`;
    const controls = quantityControls(definition.id, quantity, stock);
    article.append(controls);
    return article;
  }

  function createErrandOrderRow(definition, quantity, stock) {
    const article = document.createElement("article");
    article.className = `inn-errand-order-row ${errandCategoryClass(definition.category)}`;
    const copy = document.createElement("div");
    copy.innerHTML = `<strong>${escapeHtml(definition.name3 || definition.displayName)}</strong><span>${formatNumber(definition.baseValue)} × ${formatNumber(quantity)} = ${formatNumber(definition.baseValue * quantity)}</span>`;
    article.append(copy, quantityControls(definition.id, quantity, stock));
    return article;
  }

  function errandCategoryClass(category) {
    const normalized = String(category || "").replaceAll(" ", "");
    if (normalized.includes("여행물품")) return "is-travel-supply";
    if (normalized.includes("여행식량") || normalized.includes("여행음식")) return "is-travel-food";
    if (normalized.includes("야영물품")) return "is-camp-supply";
    if (normalized.includes("야영식량") || normalized.includes("야영음식")) return "is-camp-food";
    return "is-other-category";
  }

  function quantityControls(itemId, quantity, stock) {
    const controls = document.createElement("div");
    controls.className = "inn-quantity-controls";
    controls.innerHTML = `<button type="button" data-inn-item="${itemId}" data-inn-change="-1" ${quantity <= 0 ? "disabled" : ""}>−</button><b>${formatNumber(quantity)}</b><button type="button" data-inn-item="${itemId}" data-inn-change="1" ${quantity >= stock ? "disabled" : ""}>+</button>`;
    return controls;
  }

  function handleErrandQuantity(event) {
    const button = event.target.closest("button[data-inn-item]");
    if (!button) return;
    const itemId = button.dataset.innItem;
    const change = Number(button.dataset.innChange) || 0;
    const { record } = currentErrandRecord();
    const current = errandOrder.get(itemId) || 0;
    const next = Math.max(0, Math.min(record.stock[itemId] || 0, current + change));
    if (next > 0) errandOrder.set(itemId, next);
    else errandOrder.delete(itemId);
    renderErrand();
  }

  function errandSummary(entries = errandEntries()) {
    const subtotal = entries.reduce((sum, entry) => sum + (entry.definition.baseValue * entry.quantity), 0);
    const campFee = entries.some(entry => ["G_0272", "G_0273"].includes(entry.definition.id)) ? 3 : 0;
    const heavyFee = entries.some(entry => entry.definition.id === "G_0276") ? 10 : 0;
    return { subtotal, baseFee: entries.length ? 1 : 0, campFee, heavyFee, total: subtotal + (entries.length ? 1 : 0) + campFee + heavyFee };
  }

  function errandCargoExchange(entries = errandEntries()) {
    return {
      add: entries.map(({ definition, quantity }) => ({
        itemId: definition.id,
        quantity,
        durability: definition.durability,
        purchaseValue: definition.baseValue
      }))
    };
  }

  function errandCargoPreview(entries = errandEntries()) {
    return window.ProjectWCargo.previewExchange(errandCargoExchange(entries));
  }

  function createTotalRow(label, value, emphasis = false) {
    const row = document.createElement("div");
    if (emphasis) row.className = "is-total";
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = `${formatNumber(value)} 가치`;
    row.append(term, detail);
    return row;
  }

  function openPayment(purpose) {
    if (purpose === "errand") {
      const entries = errandEntries();
      if (!entries.length || !errandCargoPreview(entries).possible) return;
    }
    if (purpose === "maintenance" && maintenanceSummary().total <= 0) return;
    paymentPurpose = purpose;
    payment.clear();
    autoSelectPayment(paymentRequired(), currencyDefinitions());
    setView("payment");
  }

  function autoSelectPayment(requiredValue, currencies) {
    let remaining = Math.max(0, Math.round(Number(requiredValue) || 0));
    const sorted = [...currencies].sort((left, right) => right.regionalValue - left.regionalValue);
    sorted.forEach(currency => {
      if (remaining <= 0 || currency.quantity <= 0) return;
      const quantity = Math.min(currency.quantity, Math.floor(remaining / currency.regionalValue));
      if (quantity <= 0) return;
      payment.set(currency.id, quantity);
      remaining -= currency.regionalValue * quantity;
    });
    if (remaining <= 0) return;
    const supplement = sorted
      .filter(currency => currency.quantity > (payment.get(currency.id) || 0) && currency.regionalValue >= remaining)
      .sort((left, right) => (left.regionalValue - remaining) - (right.regionalValue - remaining))[0];
    if (supplement) payment.set(supplement.id, (payment.get(supplement.id) || 0) + 1);
  }

  function paymentRequired() {
    if (paymentPurpose === "lodging") return lodgingInvoice().total;
    if (paymentPurpose === "maintenance") return maintenanceSummary().total;
    return errandSummary().total;
  }

  function paymentReturnView() {
    if (paymentPurpose === "lodging") return "lodging";
    if (paymentPurpose === "maintenance") return "maintenance";
    return "errand";
  }

  function paymentPurposeLabel() {
    if (paymentPurpose === "lodging") return "숙박비 지불";
    if (paymentPurpose === "maintenance") return "정비비 지불";
    return "심부름 대금 지불";
  }

  function currencyDefinitions() {
    const wallet = normalizeWallet(getPlayerWallet());
    return window.ProjectWWallet.getCurrencies().map((currency, index) => ({
      ...currency,
      quantity: Math.max(0, Math.trunc(Number(wallet[currency.id]) || 0)),
      assetId: `Asset_Coin_${index + 1}`,
      regionalValue: Math.max(0.1, Math.round(window.ProjectWWallet.getCurrencyValue(currency, settlement?.region || "중부") * 10) / 10)
    }));
  }

  function renderPayment() {
    const currencies = currencyDefinitions();
    const required = paymentRequired();
    const offered = paymentTotal(currencies);
    const difference = offered - required;
    const change = difference >= 0 ? makeChange(difference, currencies) : null;
    elements.paymentTitle.textContent = paymentPurposeLabel();
    elements.walletTotal.textContent = `약 ${formatNumber(walletTotal(currencies))} 가치`;
    elements.currencyList.replaceChildren(...currencies.map(createCurrencyButton));
    const selected = currencies.filter(currency => (payment.get(currency.id) || 0) > 0);
    elements.paymentOffer.replaceChildren(...(selected.length ? selected.map(createPaymentRow) : [emptyMessage("내 화폐에서 동전을 골라 올려놓으세요.")]));
    elements.paymentRequired.textContent = formatNumber(required);
    elements.paymentOffered.textContent = formatNumber(offered);
    elements.paymentChange.textContent = difference > 0 ? formatNumber(difference) : "0";
    elements.paymentChange.classList.toggle("is-short", difference < 0);
    elements.paymentClear.disabled = !payment.size;
    elements.paymentConfirm.disabled = difference < 0 || !change;
    elements.paymentConfirm.textContent = paymentPurposeLabel();
    if (elements.paymentLodgingEffect) {
      elements.paymentLodgingEffect.hidden = paymentPurpose !== "lodging";
      if (paymentPurpose === "lodging") {
        const preview = lodgingMoodPreview();
        elements.paymentLodgingEffect.textContent = `${preview.reason} · ${preview.effect}`;
        elements.paymentLodgingEffect.classList.toggle("is-penalty", preview.penalty);
      }
    }
    if (difference < 0) elements.paymentMessage.textContent = `${formatNumber(Math.abs(difference))} 가치가 부족합니다.`;
    else if (difference === 0) elements.paymentMessage.textContent = "청구액과 정확히 맞습니다.";
    else if (change) elements.paymentMessage.textContent = `${formatNumber(difference)} 가치를 거슬러 받습니다.`;
    else elements.paymentMessage.textContent = "현재 화폐로 거스름돈을 만들 수 없습니다.";
  }

  function createCurrencyButton(currency) {
    const selected = payment.get(currency.id) || 0;
    const available = Math.max(0, currency.quantity - selected);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inn-currency-card";
    button.dataset.innCurrencyAdd = currency.id;
    button.disabled = available <= 0;
    const source = getAssetUrl(currency.assetId);
    button.innerHTML = `<span class="inn-coin">${source ? `<img src="${escapeAttribute(source)}" alt="">` : "¤"}</span><span><strong>${escapeHtml(shortCurrencyName(currency.name))}</strong><small>가치 ${formatNumber(currency.regionalValue)}</small></span><b>× ${formatNumber(available)}</b>`;
    return button;
  }

  function createPaymentRow(currency) {
    const quantity = payment.get(currency.id) || 0;
    const article = document.createElement("article");
    article.className = "inn-payment-row";
    const source = getAssetUrl(currency.assetId);
    article.innerHTML = `<span class="inn-payment-row-coin">${source ? `<img src="${escapeAttribute(source)}" alt="">` : "¤"}</span><div><strong>${escapeHtml(shortCurrencyName(currency.name))}</strong><span>${formatNumber(currency.regionalValue)} 가치</span></div><div class="inn-quantity-controls"><button type="button" data-inn-currency="${currency.id}" data-inn-currency-change="-1">−</button><b>× ${formatNumber(quantity)}</b><button type="button" data-inn-currency="${currency.id}" data-inn-currency-change="1" ${quantity >= currency.quantity ? "disabled" : ""}>+</button></div>`;
    return article;
  }

  function handleCurrencyAdd(event) {
    const button = event.target.closest("button[data-inn-currency-add]");
    if (button) changePaymentQuantity(button.dataset.innCurrencyAdd, 1);
  }

  function handlePaymentQuantity(event) {
    const button = event.target.closest("button[data-inn-currency]");
    if (button) changePaymentQuantity(button.dataset.innCurrency, Number(button.dataset.innCurrencyChange) || 0);
  }

  function changePaymentQuantity(currencyId, change) {
    const currency = currencyDefinitions().find(entry => entry.id === currencyId);
    if (!currency) return;
    const current = payment.get(currencyId) || 0;
    const next = Math.max(0, Math.min(currency.quantity, current + change));
    if (next === current) return;
    if (next > 0) payment.set(currencyId, next);
    else payment.delete(currencyId);
    window.ProjectWAudio?.playEffect("coin");
    renderPayment();
  }

  function clearPayment(withSound = false) {
    const hadPayment = payment.size > 0;
    payment.clear();
    if (withSound && hadPayment) window.ProjectWAudio?.playEffect("coin");
    renderPayment();
  }

  async function completePayment() {
    const currencies = currencyDefinitions();
    const required = paymentRequired();
    const offered = paymentTotal(currencies);
    const difference = offered - required;
    const change = difference >= 0 ? makeChange(difference, currencies) : null;
    if (difference < 0 || !change) return;
    const currencyTransferred = payment.size > 0 || Object.values(change).some(quantity => quantity > 0);
    const wallet = normalizeWallet(getPlayerWallet());
    for (const [currencyId, quantity] of payment) {
      if ((wallet[currencyId] || 0) < quantity) {
        notify("보유 화폐가 변경되어 다시 계산해야 합니다.");
        renderPayment();
        return;
      }
      wallet[currencyId] -= quantity;
    }
    Object.entries(change).forEach(([currencyId, quantity]) => {
      wallet[currencyId] = (wallet[currencyId] || 0) + quantity;
    });

    if (paymentPurpose === "errand") {
      const entries = errandEntries();
      const exchange = errandCargoExchange(entries);
      if (!window.ProjectWCargo.previewExchange(exchange).possible || !window.ProjectWCargo.applyExchange(exchange)) {
        notify("화물칸이 부족해 심부름 물품을 받을 수 없습니다.");
        setView("errand");
        return;
      }
      const { state, key, record } = currentErrandRecord();
      entries.forEach(({ definition, quantity }) => {
        record.stock[definition.id] = Math.max(0, (record.stock[definition.id] || 0) - quantity);
      });
      state[key] = record;
      setErrandState(state);
      setPlayerWallet(wallet);
      const itemCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);
      errandOrder.clear();
      payment.clear();
      if (currencyTransferred) window.ProjectWAudio?.playCurrencyCompletion?.("trade");
      else window.ProjectWAudio?.playEffect("trade");
      notify(`심부름꾼이 물품 ${formatNumber(itemCount)}개를 가져왔습니다.`);
      setView("home");
      return;
    }

    if (paymentPurpose === "maintenance") {
      const summary = maintenanceSummary();
      const repairedEffects = new Set(summary.effectEntries.map(entry => entry.effect));
      const wagon = summary.wagon;
      const nextWagon = {
        ...wagon,
        condition: maintenanceConditionSelected ? wagon.maxCondition : wagon.condition,
        effects: wagon.effects.filter(effect => !repairedEffects.has(effect))
      };
      setPlayerWallet(wallet);
      setWagonState(nextWagon);
      payment.clear();
      maintenanceConditionSelected = false;
      maintenanceEffects.clear();
      if (currencyTransferred) window.ProjectWAudio?.playCurrencyCompletion?.("trade");
      else window.ProjectWAudio?.playEffect("trade");
      const repairedCount = summary.effectEntries.length;
      const details = [
        summary.conditionPoints > 0 ? `내구도 ${formatNumber(summary.conditionPoints)} 회복` : "",
        repairedCount > 0 ? `상태이상 ${formatNumber(repairedCount)}개 제거` : ""
      ].filter(Boolean).join(" · ");
      notify(`짐마차 정비를 마쳤습니다.${details ? ` ${details}` : ""}`);
      setView("home");
      return;
    }

    setPlayerWallet(wallet);
    payment.clear();
    paymentPurpose = null;
    elements.paymentConfirm.disabled = true;
    if (currencyTransferred) window.ProjectWAudio?.playCurrencyCompletion?.("trade");
    else window.ProjectWAudio?.playEffect("trade");
    if (beginTradeReview()) return;
    await completeLodging();
    if (isOpen()) setView("home");
  }

  function beginTradeReview(restoredIds = [], restoredViewedIds = []) {
    const pending = window.ProjectWMerchantPath?.getPendingTradeReviews?.() || [];
    const requested = new Set((Array.isArray(restoredIds) ? restoredIds : []).map(String));
    tradeReviewEntries = requested.size ? pending.filter(entry => requested.has(String(entry.id))) : pending;
    if (!tradeReviewEntries.length) {
      lodgingPaymentCommitted = false;
      tradeReviewViewedIds.clear();
      return false;
    }
    lodgingPaymentCommitted = true;
    tradeReviewFinishing = false;
    tradeReviewIndex = Math.min(tradeReviewEntries.length - 1, Math.max(0, tradeReviewIndex));
    tradeReviewViewedIds = new Set((Array.isArray(restoredViewedIds) ? restoredViewedIds : []).map(String));
    tradeReviewViewedIds.add(String(tradeReviewEntries[tradeReviewIndex].id));
    setView("review");
    persistInterface();
    window.dispatchEvent(new CustomEvent("projectw:tradereviewopen", { detail: { count: tradeReviewEntries.length } }));
    const dialogueIds = ["DL_SL_001", "DL_SL_002", "DL_SL_003", "DL_SL_004"];
    showReviewDialogue(dialogueIds[Math.floor(Math.random() * dialogueIds.length)]);
    return true;
  }

  function handleTradeReviewSelection(event) {
    const button = event.target.closest("button[data-trade-review-index]");
    if (!button) return;
    tradeReviewIndex = Math.min(tradeReviewEntries.length - 1, Math.max(0, Math.trunc(Number(button.dataset.tradeReviewIndex) || 0)));
    tradeReviewViewedIds.add(String(tradeReviewEntries[tradeReviewIndex]?.id || ""));
    window.ProjectWAudio?.playEffect("paper");
    renderTradeReview();
    persistInterface();
  }

  function renderTradeReview() {
    if (!elements.tradeReviewList || !elements.tradeReviewDetail) return;
    if (!tradeReviewEntries.length) {
      elements.tradeReviewList.replaceChildren(emptyMessage("복기할 거래가 없습니다."));
      elements.tradeReviewDetail.replaceChildren(emptyMessage("완료된 교역이 생기면 이곳에서 원인을 살펴봅니다."));
      elements.tradeReviewFinish.disabled = true;
      return;
    }
    tradeReviewIndex = Math.min(tradeReviewEntries.length - 1, Math.max(0, tradeReviewIndex));
    const active = tradeReviewEntries[tradeReviewIndex];
    elements.tradeReviewProgress.textContent = `${formatNumber(tradeReviewIndex + 1)} / ${formatNumber(tradeReviewEntries.length)}`;
    elements.tradeReviewList.replaceChildren(...tradeReviewEntries.map((entry, index) => createTradeReviewTab(entry, index)));
    elements.tradeReviewDetail.replaceChildren(createTradeReviewDetail(active));
    elements.tradeReviewFinish.disabled = tradeReviewFinishing;
    elements.tradeReviewFinish.textContent = tradeReviewFinishing
      ? "숙박을 준비하는 중..."
      : "복기 종료";
  }

  function createTradeReviewTab(entry, index) {
    const button = document.createElement("button");
    const result = Number(entry.profit) > 0;
    button.type = "button";
    button.dataset.tradeReviewIndex = String(index);
    button.className = `${index === tradeReviewIndex ? "is-active" : ""} ${tradeReviewViewedIds.has(String(entry.id)) ? "is-viewed" : "is-unread"}`.trim();
    const label = document.createElement("span");
    const outcome = document.createElement("strong");
    label.textContent = `${entry.itemName} · ${formatNumber(entry.quantity)}개`;
    outcome.className = result ? "is-profit" : "is-loss";
    outcome.textContent = `${result ? "+" : ""}${formatNumber(entry.profit)} 가치`;
    button.append(label, outcome);
    return button;
  }

  function createTradeReviewDetail(entry) {
    const fragment = document.createDocumentFragment();
    const header = document.createElement("header");
    const titleWrap = document.createElement("div");
    const eyebrow = document.createElement("span");
    const title = document.createElement("h4");
    const result = document.createElement("strong");
    const profitable = Number(entry.profit) > 0;
    eyebrow.textContent = `${formatNumber(entry.quantity)}개 · ${formatNumber(entry.elapsedDays)}일 · ${formatNumber(entry.distance)} 거리`;
    title.textContent = entry.itemName;
    result.className = profitable ? "is-profit" : "is-loss";
    result.textContent = `${profitable ? "+" : ""}${formatNumber(entry.profit)} 가치 · ${Number(entry.returnRate) > 0 ? "+" : ""}${formatNumber(entry.returnRate)}%`;
    titleWrap.append(eyebrow, title);
    header.append(titleWrap, result);

    const summary = document.createElement("section");
    summary.className = "inn-trade-review-summary";
    summary.append(
      createTradeReviewValue("구입", entry.purchase, entry.purchaseTotal),
      createTradeReviewArrow(profitable),
      createTradeReviewValue("판매", entry.close, entry.saleTotal)
    );

    const factors = document.createElement("section");
    factors.className = "inn-trade-review-factors";
    factors.append(
      createFactorPanel("구입에서 크게 작용한 요소", entry.purchase?.reviewFactors, "buy"),
      createFactorPanel("판매에서 크게 작용한 요소", entry.close?.reviewFactors, "sell")
    );
    fragment.append(header, summary, factors);
    return fragment;
  }

  function createTradeReviewValue(action, record, total) {
    const card = document.createElement("div");
    const label = document.createElement("span");
    const city = document.createElement("strong");
    const unit = document.createElement("b");
    const totalLabel = document.createElement("small");
    label.textContent = action;
    city.textContent = `${record?.settlementName || "이름 없는 거점"} · ${record?.facilityType || "상점"}`;
    unit.textContent = `${action}/개 ${formatNumber(record?.unitValue)}`;
    totalLabel.textContent = `합계 ${formatNumber(total)} · ${bargainLabel(record?.bargainSuccesses)}`;
    card.append(label, city, unit, totalLabel);
    return card;
  }

  function createTradeReviewArrow(profitable) {
    const arrow = document.createElement("div");
    arrow.className = profitable ? "is-profit" : "is-loss";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = profitable ? "▲" : "▼";
    return arrow;
  }

  function createFactorPanel(titleText, factors, direction) {
    const panel = document.createElement("div");
    const title = document.createElement("strong");
    const list = document.createElement("ul");
    title.textContent = titleText;
    const recorded = Array.isArray(factors) ? factors : [];
    const major = recorded
      .filter(factor => Math.abs(Number(factor?.value) || 0) >= 10)
      .sort((left, right) => Math.abs(Number(right.value)) - Math.abs(Number(left.value)));
    if (!major.length) {
      const empty = document.createElement("li");
      empty.className = "is-neutral";
      empty.textContent = recorded.length
        ? "10% 이상 작용한 주요 요인이 없습니다."
        : "가격 요인을 기록하기 전의 거래라 상세 분석이 없습니다.";
      list.append(empty);
    } else {
      major.forEach((factor, index) => {
        const rawValue = Number(factor.value) || 0;
        const favorable = direction === "buy" ? rawValue < 0 : rawValue > 0;
        const item = document.createElement("li");
        const mark = document.createElement("b");
        const label = document.createElement("span");
        const value = document.createElement("em");
        item.className = `${favorable ? "is-positive" : "is-negative"}${index === 0 ? " is-primary" : ""}`;
        mark.textContent = index === 0 ? "◆" : favorable ? "▲" : "▼";
        label.textContent = factor.label;
        value.textContent = `${rawValue > 0 ? "+" : ""}${formatNumber(rawValue)}%`;
        item.append(mark, label, value);
        list.append(item);
      });
    }
    panel.append(title, list);
    return panel;
  }

  function bargainLabel(value) {
    const successes = Math.max(0, Math.trunc(Number(value) || 0));
    return successes > 0 ? `흥정 ${formatNumber(successes)}회 성공` : "흥정 없음";
  }

  async function finishTradeReview() {
    if (!lodgingPaymentCommitted || tradeReviewFinishing || !tradeReviewEntries.length) return;
    tradeReviewFinishing = true;
    renderTradeReview();
    const reviewedIds = tradeReviewEntries.map(entry => entry.id);
    const result = window.ProjectWMerchantPath?.completeTradeReviews?.(reviewedIds) || { reviewed: 0 };
    window.dispatchEvent(new CustomEvent("projectw:tradereviewcomplete", { detail: result }));
    lodgingPaymentCommitted = false;
    tradeReviewEntries = [];
    tradeReviewViewedIds.clear();
    persistInterface();
    await completeLodging();
    tradeReviewFinishing = false;
    if (isOpen()) setView("home");
  }

  function paymentTotal(currencies = currencyDefinitions()) {
    const byId = new Map(currencies.map(currency => [currency.id, currency]));
    return [...payment].reduce((sum, [currencyId, quantity]) => sum + ((byId.get(currencyId)?.regionalValue || 0) * quantity), 0);
  }

  function walletTotal(currencies = currencyDefinitions()) {
    return currencies.reduce((sum, currency) => sum + (currency.regionalValue * currency.quantity), 0);
  }

  function makeChange(value, currencies = currencyDefinitions()) {
    let remaining = Math.max(0, Math.round(Number(value) || 0));
    const result = {};
    [...currencies]
      .sort((left, right) => right.regionalValue - left.regionalValue)
      .forEach(currency => {
        if (remaining <= 0) return;
        const quantity = Math.floor(remaining / currency.regionalValue);
        if (quantity <= 0) return;
        result[currency.id] = quantity;
        remaining -= quantity * currency.regionalValue;
      });
    return remaining === 0 ? result : null;
  }

  function normalizeWallet(value) {
    const wallet = {};
    Object.entries(value || {}).forEach(([currencyId, entry]) => {
      const quantity = typeof entry === "object" && entry !== null ? entry.quantity : entry;
      wallet[currencyId] = Math.max(0, Math.trunc(Number(quantity) || 0));
    });
    return wallet;
  }

  function normalizeErrandState(value) {
    const result = {};
    Object.entries(value || {}).forEach(([key, record]) => {
      const day = Math.max(1, Math.trunc(Number(record?.day) || 1));
      const stock = {};
      Object.keys(DAILY_STOCK).forEach(itemId => {
        const initialQuantity = ["G_0278", "G_0279"].includes(itemId) ? DAILY_STOCK[itemId] : 0;
        stock[itemId] = Math.max(0, Math.trunc(Number(record?.stock?.[itemId] ?? initialQuantity) || 0));
      });
      result[key] = { day, stock };
    });
    return result;
  }

  function emptyMessage(message) {
    const paragraph = document.createElement("p");
    paragraph.className = "inn-empty-message";
    paragraph.textContent = message;
    return paragraph;
  }

  function shortCurrencyName(name) {
    return String(name || "화폐").replace(/\s*(금화|은화|동화)\s*$/u, "").trim() || String(name || "화폐");
  }

  function hashString(value) {
    let hash = 2166136261;
    for (const character of `${String(getWorldSeed() || "legacy-world")}|${String(value)}`) {
      hash ^= character.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash >>> 0);
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(Number(value) || 0);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function wake() {
    if (isOpen()) setView("home");
  }

  function getResumeState() {
    if (!isActive()) return null;
    return {
      settlementId: String(settlement?.id || ""),
      view,
      sceneVisit,
      errandOrder: [...errandOrder.entries()],
      payment: [...payment.entries()],
      paymentPurpose,
      maintenanceConditionSelected,
      maintenanceEffects: [...maintenanceEffects],
      lodgingPaymentCommitted,
      tradeReviewIds: tradeReviewEntries.map(entry => entry.id),
      tradeReviewIndex,
      tradeReviewViewedIds: [...tradeReviewViewedIds]
    };
  }

  function restoreMap(entries) {
    const result = new Map();
    (Array.isArray(entries) ? entries : []).forEach(entry => {
      if (!Array.isArray(entry) || entry.length < 2) return;
      const key = String(entry[0] || "").trim();
      const quantity = Math.max(0, Math.trunc(Number(entry[1]) || 0));
      if (key && quantity > 0) result.set(key, quantity);
    });
    return result;
  }

  async function restoreResumeState(snapshot = {}, context = {}) {
    await open(context);
    if (!isOpen()) return false;
    errandOrder = restoreMap(snapshot.errandOrder);
    payment = restoreMap(snapshot.payment);
    paymentPurpose = ["lodging", "errand", "maintenance"].includes(snapshot.paymentPurpose)
      ? snapshot.paymentPurpose
      : null;
    maintenanceConditionSelected = Boolean(snapshot.maintenanceConditionSelected);
    maintenanceEffects = new Set((Array.isArray(snapshot.maintenanceEffects) ? snapshot.maintenanceEffects : [])
      .map(effect => String(effect || "").trim()).filter(Boolean));
    const restoredView = ["home", "maintenance", "lodging", "errand", "payment", "review"].includes(snapshot.view)
      ? snapshot.view
      : "home";
    if (snapshot.lodgingPaymentCommitted) {
      lodgingPaymentCommitted = true;
      tradeReviewIndex = Math.max(0, Math.trunc(Number(snapshot.tradeReviewIndex) || 0));
      if (beginTradeReview(snapshot.tradeReviewIds, snapshot.tradeReviewViewedIds)) return true;
      await completeLodging();
      if (isOpen()) setView("home");
      return true;
    }
    setView(restoredView === "payment" && !paymentPurpose ? "home" : restoredView);
    if (snapshot.sceneVisit) suspendForScene();
    return true;
  }

  window.ProjectWInn = {
    init,
    load,
    open,
    close,
    isOpen,
    isActive,
    isSceneVisit,
    suspendForScene,
    resumeFromScene,
    refresh,
    wake,
    getResumeState,
    restoreResumeState
  };
}());
