(function exposeMealSystem() {
  const FOOD_DATA_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1425391005&single=true&output=csv";
  const GREASE_RELIEF_FOOD_IDS = new Set(["Food_010", "Food_016"]);
  const TASTE_KEYS = ["sweet", "salty", "stimulus", "weight"];
  const SETTLEMENT_RANK = { 마을: 1, 관문: 1, 도시: 2, 대도시: 3 };
  const INN_FOOD_IDS = new Set(["Food_036", "Food_037", "Food_038"]);
  const INN_SPECIAL_FOOD_IDS_BY_PLACE = new Map([
    ["로벵", new Set(["Food_091"])],
    ["린덴탈", new Set([
      "Food_007", "Food_009", "Food_011", "Food_013", "Food_017", "Food_020",
      "Food_096", "Food_097", "Food_101", "Food_102"
    ])]
  ]);
  const DUPLICATE_MOOD_EXEMPT_FOOD_IDS = new Set([
    "Food_001", "Food_002", "Food_003", "Food_004", "Food_005", "Food_006", "Food_007", "Food_008", "Food_009", "Food_010",
    "Food_014", "Food_015"
  ]);
  const ALCOHOL_FOOD_IDS = new Set([
    "Food_001", "Food_002", "Food_003", "Food_004", "Food_005", "Food_006", "Food_007", "Food_008", "Food_009",
    "Food_014", "Food_015"
  ]);
  const MAX_SNACK_KINDS = 3;
  const SNACK_MOOD_BONUS = [0, 3, 5, 6, 7];
  const TAVERN_TASTE_DIALOGUES = {
    sweet: ["DL_T_010", "DL_T_011", "DL_T_012", "DL_T_013"],
    salty: ["DL_T_014", "DL_T_015", "DL_T_016", "DL_T_017"],
    stimulus: ["DL_T_018", "DL_T_019", "DL_T_020", "DL_T_021"],
    weight: ["DL_T_022", "DL_T_023", "DL_T_024", "DL_T_025"]
  };
  const TAVERN_NEUTRAL_DIALOGUES = ["DL_T_026", "DL_T_027", "DL_T_028"];

  let elements;
  let getPartnerState = () => ({ mood: 75, sweet: 50, salty: 50, stimulus: 50, weight: 50 });
  let getAppetiteSnapshot = () => ({ parameters: [], stages: [], statuses: [] });
  let setPartnerState = () => {};
  let getPlayerWallet = () => ({});
  let setPlayerWallet = () => {};
  let getFoodUsage = () => ({});
  let setFoodUsage = () => {};
  let getRegion = () => "중부";
  let getWorldTime = () => ({ day: 1, phaseIndex: 0 });
  let getAssetUrl = () => "";
  let getRestrictions = () => ({});
  let onConsumptionComplete = () => {};
  let playCompletionTransition = async (_assetId, onDark) => { if (typeof onDark === "function") await onDark(); };
  let beforeTavernMealCompletion = async () => {};
  let afterTavernMealTransition = async () => {};
  let showTavernDialogue = () => {};
  let notify = () => {};
  let foods = [];
  let loadPromise;
  let loadError = null;
  let settlement = null;
  let vendor = "주점";
  let consumptionKind = "meal";
  let filter = "식사";
  let view = "menu";
  let order = new Map();
  let payment = new Map();
  let returnToFacility = null;
  let backgroundAssetId = "";
  let tavernSpecial = null;
  let tavernQuestions = { remaining: 0, mentioned: new Set(), busy: false };
  let completionInProgress = false;
  let forcedOrderMinimums = new Map();
  let soldOutFoodIds = new Set();
  let appetiteTooltipHideTimer = 0;
  let tastePreviewVisible = false;

  function init(options = {}) {
    getPartnerState = typeof options.getPartnerState === "function" ? options.getPartnerState : getPartnerState;
    getAppetiteSnapshot = typeof options.getAppetiteSnapshot === "function" ? options.getAppetiteSnapshot : getAppetiteSnapshot;
    setPartnerState = typeof options.setPartnerState === "function" ? options.setPartnerState : setPartnerState;
    getPlayerWallet = typeof options.getPlayerWallet === "function" ? options.getPlayerWallet : getPlayerWallet;
    setPlayerWallet = typeof options.setPlayerWallet === "function" ? options.setPlayerWallet : setPlayerWallet;
    getFoodUsage = typeof options.getFoodUsage === "function" ? options.getFoodUsage : getFoodUsage;
    setFoodUsage = typeof options.setFoodUsage === "function" ? options.setFoodUsage : setFoodUsage;
    getRegion = typeof options.getRegion === "function" ? options.getRegion : getRegion;
    getWorldTime = typeof options.getWorldTime === "function" ? options.getWorldTime : getWorldTime;
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    getRestrictions = typeof options.getRestrictions === "function" ? options.getRestrictions : getRestrictions;
    onConsumptionComplete = typeof options.onConsumptionComplete === "function" ? options.onConsumptionComplete : onConsumptionComplete;
    playCompletionTransition = typeof options.playCompletionTransition === "function" ? options.playCompletionTransition : playCompletionTransition;
    beforeTavernMealCompletion = typeof options.beforeTavernMealCompletion === "function" ? options.beforeTavernMealCompletion : beforeTavernMealCompletion;
    afterTavernMealTransition = typeof options.afterTavernMealTransition === "function" ? options.afterTavernMealTransition : afterTavernMealTransition;
    showTavernDialogue = typeof options.showTavernDialogue === "function" ? options.showTavernDialogue : showTavernDialogue;
    notify = typeof options.notify === "function" ? options.notify : notify;
    elements = {
      modal: document.querySelector("#meal-modal"),
      window: document.querySelector("#meal-modal .meal-window"),
      background: document.querySelector("#meal-scene-background"),
      location: document.querySelector("#meal-location"),
      title: document.querySelector("#meal-title"),
      return: document.querySelector("#meal-return"),
      close: document.querySelector("#meal-close"),
      filterNav: document.querySelector(".meal-menu-filters"),
      filters: [...document.querySelectorAll("[data-meal-filter]")],
      dataStatus: document.querySelector("#meal-data-status"),
      menuEyebrow: document.querySelector("#meal-menu-eyebrow"),
      menuTitle: document.querySelector("#meal-menu-title"),
      menuView: document.querySelector("#meal-menu-view"),
      menu: document.querySelector("#meal-menu-list"),
      orderEyebrow: document.querySelector("#meal-order-eyebrow"),
      orderTitle: document.querySelector("#meal-order-title"),
      order: document.querySelector("#meal-order-list"),
      askNahana: document.querySelector("#meal-ask-nahana"),
      appetitePeek: document.querySelector("#meal-appetite-peek"),
      appetiteTooltip: document.querySelector("#meal-appetite-tooltip"),
      menuTooltip: document.querySelector("#meal-menu-tooltip"),
      clear: document.querySelector("#meal-order-clear"),
      totalValue: document.querySelector("#meal-total-value"),
      totalFullness: document.querySelector("#meal-total-fullness"),
      tier: document.querySelector("#meal-tier"),
      platingPreview: document.querySelector("#meal-plating-preview"),
      confirm: document.querySelector("#meal-confirm"),
      paymentView: document.querySelector("#meal-payment-view"),
      paymentBack: document.querySelector("#meal-payment-back"),
      paymentHeading: document.querySelector("#meal-payment-heading"),
      walletValue: document.querySelector("#meal-wallet-value"),
      currencyList: document.querySelector("#meal-currency-list"),
      paymentClear: document.querySelector("#meal-payment-clear"),
      paymentOffer: document.querySelector("#meal-payment-offer-list"),
      paymentRequiredLabel: document.querySelector("#meal-payment-required-label"),
      paymentRequired: document.querySelector("#meal-payment-required"),
      paymentOffered: document.querySelector("#meal-payment-offered"),
      paymentDifference: document.querySelector("#meal-payment-difference"),
      paymentMessage: document.querySelector("#meal-payment-message"),
      paymentConfirm: document.querySelector("#meal-payment-confirm")
    };
    if (!elements.modal || !elements.menu || !elements.order || !elements.paymentView) return;
    elements.return.addEventListener("click", returnToPreviousFacility);
    elements.close.addEventListener("click", close);
    elements.filters.forEach(button => button.addEventListener("click", () => setFilter(button.dataset.mealFilter)));
    elements.menu.addEventListener("click", handleMenuClick);
    elements.order.addEventListener("click", handleOrderClick);
    elements.askNahana?.addEventListener("click", askNahanaAboutTaste);
    elements.appetitePeek?.addEventListener("pointerenter", showMealAppetiteTooltip);
    elements.appetitePeek?.addEventListener("pointerleave", () => hideMealAppetiteTooltip());
    elements.appetitePeek?.addEventListener("focus", showMealAppetiteTooltip);
    elements.appetitePeek?.addEventListener("blur", () => hideMealAppetiteTooltip());
    elements.appetiteTooltip?.addEventListener("pointerenter", () => window.clearTimeout(appetiteTooltipHideTimer));
    elements.appetiteTooltip?.addEventListener("pointerleave", () => hideMealAppetiteTooltip(true));
    elements.platingPreview?.addEventListener("click", () => setTastePreviewVisible(!tastePreviewVisible));
    elements.clear.addEventListener("click", () => {
      order.clear();
      forcedOrderMinimums.forEach((minimum, foodId) => order.set(foodId, minimum));
      renderMenuView();
    });
    elements.confirm.addEventListener("click", openPayment);
    elements.paymentBack.addEventListener("click", () => setView("menu"));
    elements.paymentClear.addEventListener("click", () => clearPayment(true));
    elements.currencyList.addEventListener("click", handleCurrencyClick);
    elements.paymentOffer.addEventListener("click", handlePaymentClick);
    elements.paymentConfirm.addEventListener("click", completePayment);
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || elements.modal.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (view === "payment") setView("menu");
      else if (returnToFacility) returnToPreviousFacility();
      else close();
    });
  }

  function load() {
    if (loadPromise) return loadPromise;
    loadError = null;
    loadPromise = window.ProjectWData.loadCsv(FOOD_DATA_URL)
      .then(rows => {
        foods = rows.map(normalizeFood).filter(food => food.id && food.name && food.vendor);
        if (!foods.length) throw new Error("식사 데이터를 찾을 수 없습니다.");
        if (isOpen()) render();
        return foods;
      })
      .catch(error => {
        console.error(error);
        loadError = error;
        foods = [];
        loadPromise = null;
        if (isOpen()) render();
        return [];
      });
    return loadPromise;
  }

  async function open(context = {}) {
    if (!elements?.modal) return false;
    consumptionKind = context.kind === "snack" ? "snack" : "meal";
    const openingRestrictions = currentRestrictions(context.vendor || context.facilityType || "주점");
    if (consumptionKind === "snack" && openingRestrictions.snackDisabled) {
      notify("현재 상태 때문에 간식을 먹을 수 없습니다.");
      return false;
    }
    const usage = normalizedUsage();
    const used = consumptionKind === "snack" ? usage.snackUsed : usage.mealUsed;
    if (used) {
      notify(consumptionKind === "snack"
        ? "오늘은 이미 간식을 먹었습니다. 다음 날 다시 먹을 수 있습니다."
        : "오늘은 이미 식사를 했습니다. 여관과 주점을 합쳐 하루에 한 번만 식사할 수 있습니다.");
      return false;
    }
    settlement = context.settlement || null;
    vendor = String(context.vendor || context.facilityType || "주점").trim() || "주점";
    returnToFacility = typeof context.onReturn === "function" ? context.onReturn : null;
    backgroundAssetId = String(context.backgroundAssetId || "").trim();
    tavernSpecial = normalizeTavernSpecial(context.tavernSpecial);
    const tavernQuestionMaximum = Math.max(0, Math.trunc(Number(openingRestrictions.tavernQuestionMaximum) || 3));
    tavernQuestions = {
      remaining: vendor === "주점" && consumptionKind === "meal" ? tavernQuestionMaximum : 0,
      maximum: tavernQuestionMaximum,
      mentioned: new Set(),
      busy: false
    };
    filter = consumptionKind === "snack" ? "간식" : "식사";
    view = "menu";
    order = new Map();
    forcedOrderMinimums = new Map();
    payment = new Map();
    completionInProgress = false;
    tastePreviewVisible = false;
    elements.modal.hidden = false;
    elements.modal.dataset.mealVendor = vendor;
    elements.modal.dataset.mealKind = consumptionKind;
    elements.location.textContent = `${settlement?.name || "거점"} · ${vendor}`;
    elements.title.textContent = consumptionKind === "snack" ? "간식 고르기" : "식사 주문";
    elements.return.hidden = !returnToFacility;
    applyBackground();
    setView("menu");
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", {
      detail: { open: true, facilityType: vendor }
    }));
    window.dispatchEvent(new CustomEvent("projectw:mealopen", { detail: { vendor, kind: consumptionKind } }));
    render();
    await load();
    ensureDailyTavernSoldOut();
    applyForcedOrderRestrictions();
    if (isOpen() && !filteredFoods().length) {
      const alternate = filter === "식사" ? "음료" : "식사";
      if (availableFoods().some(food => matchesFilter(food, alternate))) filter = alternate;
    }
    if (isOpen()) render();
    return availableFoods().length > 0;
  }

  function close() {
    if (!elements?.modal || elements.modal.hidden) return;
    elements.modal.hidden = true;
    delete elements.modal.dataset.mealVendor;
    delete elements.modal.dataset.mealKind;
    order.clear();
    payment.clear();
    settlement = null;
    returnToFacility = null;
    backgroundAssetId = "";
    tavernSpecial = null;
    tavernQuestions = { remaining: 0, mentioned: new Set(), busy: false };
    forcedOrderMinimums = new Map();
    soldOutFoodIds = new Set();
    completionInProgress = false;
    tastePreviewVisible = false;
    elements.order?.classList.remove("is-taste-preview");
    elements.platingPreview?.setAttribute("aria-pressed", "false");
    hideMealAppetiteTooltip(true);
    hideMealMenuTooltip();
    applyBackground();
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", {
      detail: { open: false, facilityType: vendor }
    }));
  }

  function isOpen() {
    return Boolean(elements?.modal && !elements.modal.hidden);
  }

  function returnToPreviousFacility() {
    const callback = returnToFacility;
    close();
    if (callback) callback();
  }

  function refresh() {
    applyBackground();
    if (isOpen()) render();
  }

  function applyBackground() {
    if (!elements?.modal || !elements.background) return;
    const visible = Boolean(backgroundAssetId);
    elements.modal.classList.toggle("has-facility-background", visible);
    elements.background.hidden = !visible;
    if (!visible) return;
    elements.background.dataset.assetId = backgroundAssetId;
    elements.background.alt = `${vendor} 내부 풍경`;
    const source = getAssetUrl(backgroundAssetId);
    if (source) elements.background.src = source;
  }

  function normalizeFood(row) {
    const id = text(row, "ID");
    return {
      id,
      name: text(row, "이름"),
      type: text(row, "종류"),
      regions: values(row, "지역"),
      places: values(row, "상세지역"),
      terrains: values(row, "상세지형"),
      sellerScale: text(row, "판매처"),
      vendor: text(row, "상세 판매처"),
      value: number(row, "기준 가치"),
      sweet: number(row, "단맛"),
      salty: number(row, "짠맛"),
      stimulus: number(row, "자극"),
      // 물과 엽차는 시트의 이전 부호가 남아 있어도 느끼함을 해소하는 방향을 보장한다.
      weight: GREASE_RELIEF_FOOD_IDS.has(id) ? Math.abs(number(row, "무게감")) : number(row, "무게감"),
      fullness: number(row, "포만감"),
      mood: number(row, "기분"),
      reaction: text(row, "리액션"),
      description: text(row, "설명")
    };
  }

  function text(row, header) {
    const key = Object.keys(row).find(candidate => candidate.trim() === header);
    return key ? String(row[key] ?? "").trim() : "";
  }

  function number(row, header) {
    const parsed = Number(text(row, header).replaceAll(",", ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function values(row, header) {
    return text(row, header).split(/[,/]/).map(value => value.trim()).filter(Boolean);
  }

  function availableFoodsFor(targetSettlement = settlement, targetVendor = vendor) {
    const category = targetSettlement?.category || "";
    const scale = SETTLEMENT_RANK[category] || 1;
    const region = targetSettlement?.region || getRegion();
    const placeName = targetSettlement?.name || "";
    const terrains = Array.isArray(targetSettlement?.terrains) ? targetSettlement.terrains : [];
    return foods.filter(food => {
      const innSpecial = isInnSpecialFood(food, targetSettlement, targetVendor);
      if (!innSpecial && food.vendor !== targetVendor) return false;
      if (targetVendor === "여관" && !INN_FOOD_IDS.has(food.id) && !innSpecial) return false;
      if (targetVendor === "주점" && INN_FOOD_IDS.has(food.id)) return false;
      if (innSpecial) return true;
      if (food.sellerScale && scale < (SETTLEMENT_RANK[food.sellerScale] || 99)) return false;
      if (food.regions.length && !food.regions.includes(region)) return false;
      if (food.places.length && !food.places.includes(placeName)) return false;
      if (food.terrains.length && !food.terrains.some(terrain => terrains.includes(terrain))) return false;
      return true;
    }).map(food => contextualFood(food, targetSettlement, targetVendor));
  }

  function isInnSpecialFood(food, targetSettlement = settlement, targetVendor = vendor) {
    if (targetVendor !== "여관") return false;
    const placeName = String(targetSettlement?.name || "").trim();
    return Boolean(INN_SPECIAL_FOOD_IDS_BY_PLACE.get(placeName)?.has(food?.id));
  }

  function contextualFood(food, targetSettlement = settlement, targetVendor = vendor) {
    if (!food || !isInnSpecialFood(food, targetSettlement, targetVendor)) return food;
    return { ...food, fullness: 0, mood: 0, innSpecial: true };
  }

  function availableFoods() {
    return availableFoodsFor(settlement, vendor);
  }

  function tavernSoldOutKey() {
    return String(settlement?.id || settlement?.name || "현재 거점").trim();
  }

  function ensureDailyTavernSoldOut() {
    soldOutFoodIds = new Set();
    if (vendor !== "주점" || consumptionKind !== "meal" || currentRestrictions().tutorialMeal?.active) return;
    const usage = normalizedUsage();
    const key = tavernSoldOutKey();
    const stored = usage.tavernSoldOutBySettlement[key];
    if (Array.isArray(stored)) {
      soldOutFoodIds = new Set(stored);
      return;
    }
    const protectedIds = new Set(tavernSpecial?.foodIds || []);
    const available = availableFoods();
    const candidates = available.filter(food => !protectedIds.has(food.id)).map(food => food.id);
    for (let index = candidates.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [candidates[index], candidates[swapIndex]] = [candidates[swapIndex], candidates[index]];
    }
    const maximum = Math.floor(available.length * .25);
    const count = maximum > 0 ? Math.floor(Math.random() * (maximum + 1)) : 0;
    const selected = candidates.slice(0, Math.min(count, candidates.length));
    soldOutFoodIds = new Set(selected);
    setFoodUsage({
      ...usage,
      tavernSoldOutBySettlement: {
        ...usage.tavernSoldOutBySettlement,
        [key]: selected
      }
    });
  }

  function currentRestrictions(targetVendor = vendor) {
    const restrictions = getRestrictions({ kind: consumptionKind, vendor: String(targetVendor || vendor) }) || {};
    return {
      hangover: Boolean(restrictions.hangover),
      alcoholDisabled: Boolean(restrictions.alcoholDisabled || restrictions.hangover),
      snackDisabled: Boolean(restrictions.snackDisabled),
      forcedWaterCount: Math.max(0, Math.trunc(Number(restrictions.forcedWaterCount) || 0)),
      forceMostExpensive: Boolean(restrictions.forceMostExpensive),
      moodGainMultiplier: Math.max(0, Number(restrictions.moodGainMultiplier) || 1),
      fullnessMaximum: Math.max(0, Number(restrictions.fullnessMaximum) || 0),
      fullnessLimitReason: String(restrictions.fullnessLimitReason || "현재 상태").trim() || "현재 상태",
      tavernQuestionMaximum: Math.max(0, Math.trunc(Number(restrictions.tavernQuestionMaximum) || 3)),
      snackMaximum: Math.max(1, Math.trunc(Number(restrictions.snackMaximum) || MAX_SNACK_KINDS)),
      tutorialMeal: restrictions.tutorialMeal && typeof restrictions.tutorialMeal === "object"
        ? restrictions.tutorialMeal
        : null
    };
  }

  function applyForcedOrderRestrictions() {
    forcedOrderMinimums = new Map();
    if (consumptionKind !== "meal") return;
    const restrictions = currentRestrictions();
    const available = availableFoods();
    if (restrictions.forcedWaterCount > 0 && available.some(food => food.id === "Food_010")) {
      forcedOrderMinimums.set("Food_010", restrictions.forcedWaterCount);
    }
    const eligibleForForcedMenu = available.filter(food =>
      !(restrictions.alcoholDisabled && ALCOHOL_FOOD_IDS.has(food.id))
      && !(restrictions.fullnessMaximum > 0 && food.fullness >= restrictions.fullnessMaximum)
    );
    if (restrictions.forceMostExpensive && eligibleForForcedMenu.length) {
      const mostExpensive = [...eligibleForForcedMenu].sort((left, right) => right.value - left.value || left.name.localeCompare(right.name, "ko"))[0];
      forcedOrderMinimums.set(mostExpensive.id, Math.max(1, forcedOrderMinimums.get(mostExpensive.id) || 0));
    }
    forcedOrderMinimums.forEach((minimum, foodId) => {
      order.set(foodId, Math.max(minimum, order.get(foodId) || 0));
    });
  }

  function alcoholCount(entries = orderEntries()) {
    return entries.reduce((count, entry) => count + (ALCOHOL_FOOD_IDS.has(entry.food.id) ? entry.quantity : 0), 0);
  }

  async function prepareTavernSpecial(kind, targetSettlement) {
    await load();
    if (kind === "alcohol") {
      return { kind: "alcohol", foodIds: [...ALCOHOL_FOOD_IDS], foodNames: [] };
    }
    if (kind !== "menu") return null;
    const candidates = availableFoodsFor(targetSettlement, "주점").filter(food => food.type === "식사");
    for (let index = candidates.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [candidates[index], candidates[swapIndex]] = [candidates[swapIndex], candidates[index]];
    }
    const selected = candidates.slice(0, 2);
    return selected.length === 2
      ? { kind: "menu", foodIds: selected.map(food => food.id), foodNames: selected.map(food => food.name) }
      : null;
  }

  function normalizeTavernSpecial(value) {
    const kind = value?.kind === "menu" || value?.kind === "alcohol" ? value.kind : "";
    if (!kind) return null;
    return {
      kind,
      foodIds: [...new Set((Array.isArray(value?.foodIds) ? value.foodIds : []).map(id => String(id || "").trim()).filter(Boolean))],
      foodNames: (Array.isArray(value?.foodNames) ? value.foodNames : []).map(name => String(name || "").trim()).filter(Boolean)
    };
  }

  function filteredFoods() {
    const available = availableFoods();
    return vendor === "여관" ? available : available.filter(food => matchesFilter(food, filter));
  }

  function matchesFilter(food, targetFilter) {
    if (targetFilter === "음료") return food.type === "음료";
    if (targetFilter === "간식") return food.type === "간식";
    return food.type === "식사";
  }

  function setFilter(nextFilter) {
    if (!["식사", "음료"].includes(nextFilter)) return;
    filter = nextFilter;
    renderMenuView();
  }

  function handleMenuClick(event) {
    const item = event.target.closest("button[data-meal-add]");
    if (!item) return;
    const food = foods.find(entry => entry.id === item.dataset.mealAdd);
    if (!food) return;
    if (consumptionKind === "snack") {
      if (order.has(food.id)) order.delete(food.id);
      else if (order.size >= currentRestrictions().snackMaximum) {
        notify(`간식은 한 번에 최대 ${currentRestrictions().snackMaximum}종류까지 고를 수 있습니다.`);
        return;
      } else order.set(food.id, 1);
      renderMenuView();
      return;
    }
    const quantity = order.get(food.id) || 0;
    if (vendor === "여관") {
      if (INN_FOOD_IDS.has(food.id)) {
        INN_FOOD_IDS.forEach(id => order.delete(id));
        order.set(food.id, 1);
      } else if (quantity >= 1) {
        notify("여관의 지역 특선은 메뉴마다 하나만 주문할 수 있습니다.");
      } else {
        order.set(food.id, 1);
      }
      renderMenuView();
      return;
    }
    order.set(food.id, quantity + 1);
    if (vendor === "주점" && quantity === 1 && !DUPLICATE_MOOD_EXEMPT_FOOD_IDS.has(food.id)) {
      showTavernDialogue("DL_T_008", { 메뉴명: food.name });
    }
    renderMenuView();
  }

  function handleOrderClick(event) {
    const button = event.target.closest("button[data-meal-order-action]");
    if (!button) return;
    const id = button.dataset.mealFoodId;
    const quantity = order.get(id) || 0;
    const forcedMinimum = forcedOrderMinimums.get(id) || 0;
    if (consumptionKind === "snack") {
      order.delete(id);
      renderMenuView();
      return;
    }
    if (button.dataset.mealOrderAction === "increase") {
      if (vendor === "여관" && quantity >= 1) {
        notify(INN_FOOD_IDS.has(id)
          ? "여관의 기본 식사는 한 종류만 하나씩 주문할 수 있습니다."
          : "여관의 지역 특선은 메뉴마다 하나만 주문할 수 있습니다.");
        return;
      }
      order.set(id, quantity + 1);
      if (vendor === "주점" && quantity === 1 && !DUPLICATE_MOOD_EXEMPT_FOOD_IDS.has(id)) {
        const food = foods.find(entry => entry.id === id);
        showTavernDialogue("DL_T_008", { 메뉴명: food?.name || "이 메뉴" });
      }
    }
    if (button.dataset.mealOrderAction === "decrease") {
      if (quantity <= Math.max(1, forcedMinimum)) {
        if (!forcedMinimum) order.delete(id);
      } else order.set(id, quantity - 1);
    }
    if (button.dataset.mealOrderAction === "remove" && !forcedMinimum) order.delete(id);
    renderMenuView();
  }

  function handleCurrencyClick(event) {
    const button = event.target.closest("button[data-meal-currency-add]");
    if (!button) return;
    changePaymentQuantity(button.dataset.mealCurrencyAdd, 1);
  }

  function handlePaymentClick(event) {
    const button = event.target.closest("button[data-meal-payment-action]");
    if (!button) return;
    const change = button.dataset.mealPaymentAction === "increase" ? 1 : -1;
    changePaymentQuantity(button.dataset.mealCurrencyId, change);
  }

  function changePaymentQuantity(currencyId, change) {
    const currency = currencyDefinitions().find(entry => entry.id === currencyId);
    if (!currency) return;
    const current = payment.get(currencyId) || 0;
    const next = Math.min(currency.quantity, Math.max(0, current + change));
    if (next === current) return;
    if (next > 0) payment.set(currencyId, next);
    else payment.delete(currencyId);
    window.ProjectWAudio?.playEffect("coin");
    renderPaymentView();
  }

  function clearPayment(withSound = false) {
    const hadPayment = payment.size > 0;
    payment.clear();
    if (withSound && hadPayment) window.ProjectWAudio?.playEffect("coin");
    renderPaymentView();
  }

  function render() {
    if (!elements?.modal) return;
    if (view === "payment") renderPaymentView();
    else renderMenuView();
  }

  function renderMenuView() {
    syncContextLabels();
    const tutorialLocked = Boolean(currentRestrictions().tutorialMeal?.active);
    elements.close.disabled = tutorialLocked;
    elements.return.disabled = tutorialLocked;
    elements.filters.forEach(button => {
      const count = availableFoods().filter(food => matchesFilter(food, button.dataset.mealFilter)).length;
      const active = button.dataset.mealFilter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      button.disabled = count === 0;
    });
    renderMenu();
    renderOrder();
    renderTavernQuestionButton();
  }

  function renderTavernQuestionButton() {
    if (!elements.askNahana) return;
    const available = consumptionKind === "meal" && vendor === "주점";
    elements.askNahana.hidden = !available;
    if (elements.appetitePeek) elements.appetitePeek.hidden = !available;
    if (!available) hideMealAppetiteTooltip();
    elements.askNahana.disabled = !available || tavernQuestions.remaining <= 0 || tavernQuestions.busy;
    const count = elements.askNahana.querySelector("span");
    if (count) count.textContent = `${tavernQuestions.remaining} / ${tavernQuestions.maximum || 3}`;
    elements.askNahana.title = tavernQuestions.remaining > 0
      ? "현재 입맛에 관해 물어봅니다. 이번 주점 방문에서 세 번 질문할 수 있습니다."
      : "이번 주점 방문에서 질문 기회를 모두 사용했습니다.";
  }

  async function askNahanaAboutTaste() {
    if (vendor !== "주점" || consumptionKind !== "meal" || tavernQuestions.remaining <= 0 || tavernQuestions.busy) return;
    const partner = normalizePartner(getPartnerState());
    const eligible = TASTE_KEYS.filter(key => !tavernQuestions.mentioned.has(key) && tasteDialogueBand(partner[key]) >= 0);
    let dialogueId = "";
    if (eligible.length) {
      const key = eligible[Math.floor(Math.random() * eligible.length)];
      tavernQuestions.mentioned.add(key);
      dialogueId = TAVERN_TASTE_DIALOGUES[key][tasteDialogueBand(partner[key])];
    } else {
      dialogueId = TAVERN_NEUTRAL_DIALOGUES[Math.floor(Math.random() * TAVERN_NEUTRAL_DIALOGUES.length)];
    }
    tavernQuestions.remaining -= 1;
    tavernQuestions.busy = true;
    renderTavernQuestionButton();
    try {
      const menuCandidates = availableFoods().filter(food =>
        (food.type === "식사" || food.type === "음료") && !soldOutFoodIds.has(food.id)
      );
      const menuName = menuCandidates.length
        ? menuCandidates[Math.floor(Math.random() * menuCandidates.length)].name
        : "메뉴";
      await showTavernDialogue(dialogueId, { 메뉴명: menuName });
    } finally {
      tavernQuestions.busy = false;
      renderTavernQuestionButton();
    }
  }

  function tasteDialogueBand(value) {
    const number = Number(value) || 0;
    if (number <= 20) return 0;
    if (number <= 40) return 1;
    if (number >= 80) return 3;
    if (number >= 60) return 2;
    return -1;
  }

  function renderMenu() {
    hideMealMenuTooltip();
    elements.menu.replaceChildren();
    if (loadError) {
      elements.dataStatus.textContent = "Foods CSV를 불러오지 못했습니다. 로컬 서버와 data/foods.csv를 확인해 주세요.";
      elements.dataStatus.classList.add("is-error");
      elements.menu.append(emptyMessage("주문 가능한 음식 정보를 불러오지 못했습니다."));
      return;
    }
    if (!foods.length) {
      elements.dataStatus.textContent = "음식 시트를 불러오는 중입니다.";
      elements.dataStatus.classList.remove("is-error");
      elements.menu.append(emptyMessage("메뉴판을 준비하고 있습니다."));
      return;
    }
    const available = filteredFoods();
    const innSpecialCount = vendor === "여관" ? available.filter(food => food.innSpecial).length : 0;
    const soldOutCount = vendor === "주점" ? available.filter(food => soldOutFoodIds.has(food.id)).length : 0;
    elements.dataStatus.textContent = consumptionKind === "snack"
      ? `간식 ${available.length}종 · 정가 판매 · 최대 3종류 · 선택한 메뉴를 다시 누르면 뺄 수 있습니다.`
      : vendor === "여관"
        ? innSpecialCount
          ? `여관 식사 ${available.length}종 · 기본 식사 중 1종 · 지역 특선은 메뉴마다 1개 · 하루 한 번 이용`
          : `여관 식사 ${available.length}종 · 기본 식사 중 1종 · 하루 한 번 이용`
        : `${filter} ${available.length}종${soldOutCount ? ` · 오늘 품절 ${soldOutCount}종` : ""} · 메뉴를 누르면 주문서에 추가됩니다.`;
    elements.dataStatus.classList.remove("is-error");
    if (!available.length) {
      elements.menu.append(emptyMessage("이곳에서 주문할 수 있는 메뉴가 없습니다."));
      return;
    }
    elements.menu.append(...menuGroups(available).map(createMenuSection));
  }

  function menuGroups(items) {
    if (consumptionKind === "snack") {
      return [{
        label: "시장 간식",
        items: [...items].sort((left, right) => left.value - right.value || left.name.localeCompare(right.name, "ko"))
      }];
    }
    if (vendor === "여관") {
      const definitions = [
        { label: "기본 식사 · 한 종류 선택", items: items.filter(food => !food.innSpecial) },
        { label: "지역 특선 · 메뉴마다 하나", items: items.filter(food => food.innSpecial) }
      ];
      return definitions
        .filter(group => group.items.length)
        .map(group => ({
          ...group,
          items: [...group.items].sort((left, right) => left.value - right.value || left.name.localeCompare(right.name, "ko"))
        }));
    }
    const definitions = filter === "음료"
      ? [
          { label: "일상 음료", match: food => !ALCOHOL_FOOD_IDS.has(food.id) },
          { label: "술", match: food => ALCOHOL_FOOD_IDS.has(food.id) && food.value < 20 },
          { label: "귀한 술", match: food => ALCOHOL_FOOD_IDS.has(food.id) && food.value >= 20 }
        ]
      : [
          { label: "곁들이는 음식", match: food => food.fullness < 15 },
          { label: "가벼운 요리", match: food => food.fullness >= 15 && food.fullness < 30 },
          { label: "든든한 요리", match: food => food.fullness >= 30 && food.fullness < 50 },
          { label: "푸짐한 요리", match: food => food.fullness >= 50 }
        ];
    return definitions.flatMap(definition => {
      const groupItems = items.filter(definition.match)
        .sort((left, right) => left.value - right.value || left.name.localeCompare(right.name, "ko"));
      return groupItems.length ? [{ label: definition.label, items: groupItems }] : [];
    });
  }

  function createMenuSection(group) {
    const section = document.createElement("section");
    section.className = "meal-menu-section";
    const heading = document.createElement("header");
    const title = document.createElement("h4");
    title.textContent = group.label;
    const count = document.createElement("span");
    count.textContent = `${group.items.length}종`;
    heading.append(title, count);
    const list = document.createElement("div");
    list.append(...group.items.map(food => createMenuItem(food, group.label)));
    section.append(heading, list);
    return section;
  }

  function createMenuItem(food, menuCategory = "메뉴") {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `meal-menu-item is-${consumptionKind === "snack" ? "snack" : food.type === "음료" ? "drink" : "dish"}`;
    item.dataset.mealAdd = food.id;
    const selected = order.get(food.id) || 0;
    const restrictions = currentRestrictions();
    const currentFullness = calculateMeal(orderEntries()).fullness;
    const alcoholLocked = consumptionKind === "meal" && restrictions.alcoholDisabled && ALCOHOL_FOOD_IDS.has(food.id);
    const fullnessLocked = consumptionKind === "meal" && restrictions.fullnessMaximum > 0
      && currentFullness + food.fullness >= restrictions.fullnessMaximum;
    const soldOut = vendor === "주점" && soldOutFoodIds.has(food.id);
    item.disabled = soldOut || alcoholLocked || fullnessLocked;
    item.classList.toggle("is-sold-out", soldOut);
    item.classList.toggle("is-hangover-locked", alcoholLocked);
    if (soldOut) item.dataset.mealRestriction = "오늘은 품절된 메뉴입니다. 다음 날 다시 준비됩니다.";
    else if (alcoholLocked) item.dataset.mealRestriction = "현재 상태 때문에 오늘은 술을 주문할 수 없습니다.";
    else if (fullnessLocked) item.dataset.mealRestriction = `${restrictions.fullnessLimitReason} 때문에 포만감 ${restrictions.fullnessMaximum} 이상의 식사를 주문할 수 없습니다.`;
    if (selected) item.classList.add("is-selected");
    item.setAttribute("aria-label", consumptionKind === "snack"
      ? `${food.name}, 가치 ${formatNumber(food.value)}, ${selected ? "간식 바구니에서 빼기" : "간식 바구니에 추가"}`
      : `${food.name}, 가치 ${formatNumber(food.value)}, 포만감 ${formatNumber(food.fullness)}, 주문서에 추가`);

    const copy = document.createElement("span");
    copy.className = "meal-menu-copy";
    const name = document.createElement("strong");
    name.textContent = food.name;
    copy.append(name);
    if (soldOut) {
      const soldOutLabel = document.createElement("span");
      soldOutLabel.className = "meal-sold-out-label";
      soldOutLabel.textContent = "오늘 품절";
      copy.append(soldOutLabel);
    }
    const description = document.createElement("small");
    description.textContent = food.description || `${vendor}에서 내놓는 메뉴입니다.`;
    copy.append(description);

    const facts = document.createElement("span");
    facts.className = "meal-menu-facts";
    if (consumptionKind === "snack") facts.classList.add("is-snack");
    const value = document.createElement("b");
    value.className = "meal-menu-value";
    const valueLabel = document.createElement("small");
    valueLabel.textContent = "가치";
    value.append(valueLabel, document.createTextNode(formatNumber(food.value)));
    facts.append(value);
    if (consumptionKind !== "snack") {
      const fullness = document.createElement("b");
      fullness.className = "meal-menu-fullness";
      const fullnessLabel = document.createElement("small");
      fullnessLabel.textContent = "포만감";
      fullness.append(fullnessLabel, document.createTextNode(formatNumber(food.fullness)));
      facts.append(fullness);
    }
    if (selected) {
      const selectedCount = document.createElement("em");
      selectedCount.textContent = consumptionKind === "snack" ? "선택됨" : `주문 ×${selected}`;
      facts.append(selectedCount);
    }
    item.append(copy, facts);
    item.setAttribute("aria-describedby", "meal-menu-tooltip");
    item.addEventListener("pointerenter", () => showMealMenuTooltip(food, item, menuCategory));
    item.addEventListener("pointerleave", hideMealMenuTooltip);
    item.addEventListener("focus", () => showMealMenuTooltip(food, item, menuCategory));
    item.addEventListener("blur", hideMealMenuTooltip);
    return item;
  }

  function tasteEffectLevel(value) {
    const amount = Math.abs(Number(value) || 0);
    if (amount <= 0) return 0;
    if (amount <= 14) return 1;
    if (amount <= 29) return 2;
    return 3;
  }

  function displayedTasteDirection(label, storedValue) {
    const value = Number(storedValue) || 0;
    const storedDirection = value < 0 ? -1 : value > 0 ? 1 : 0;
    // 네 값은 모두 갈망 수치의 증감량이다. 음수는 해당 맛을 채우고,
    // 양수는 해당 맛의 갈망을 회복시키므로 화면의 맛 표시는 부호를 뒤집는다.
    return -storedDirection;
  }

  function tasteEffectPresentation(label, storedValue) {
    const direction = displayedTasteDirection(label, storedValue);
    const level = tasteEffectLevel(storedValue);
    const marks = direction === 0
      ? "0"
      : direction > 0
        ? "+".repeat(level)
        : Array.from({ length: level }, () => "−").join(" ");
    return {
      direction,
      className: direction > 0 ? "is-positive" : direction < 0 ? "is-negative" : "is-neutral",
      text: `${label} ${marks}`
    };
  }

  function createTasteEffectBadges(food) {
    const container = document.createElement("div");
    container.className = "meal-taste-effect-badges";
    [
      ["단맛", food.sweet],
      ["짠맛", food.salty],
      ["자극", food.stimulus],
      ["기름짐", food.weight]
    ].forEach(([label, storedValue]) => {
      const presentation = tasteEffectPresentation(label, storedValue);
      const badge = document.createElement("span");
      badge.className = `meal-taste-effect-badge ${presentation.className}`;
      badge.textContent = presentation.text;
      badge.setAttribute("aria-label", presentation.direction > 0
        ? `${label} 증가 ${tasteEffectLevel(storedValue)}단계`
        : presentation.direction < 0
          ? `${label} 감소 ${tasteEffectLevel(storedValue)}단계`
          : `${label} 변화 없음`);
      container.append(badge);
    });
    return container;
  }

  function showMealMenuTooltip(food, anchor, menuCategory = "메뉴") {
    if (!elements.menuTooltip || !food || !anchor) return;
    const header = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = food.name;
    header.append(title);
    const category = document.createElement("p");
    category.className = "meal-menu-tooltip-category";
    category.textContent = `메뉴 분류 · ${food.type || "메뉴"} / ${menuCategory}`;
    const description = document.createElement("p");
    description.className = "meal-menu-tooltip-description";
    description.textContent = food.description || `${vendor}에서 내놓는 메뉴입니다.`;
    const facts = document.createElement("div");
    facts.className = "meal-menu-tooltip-facts";
    const factEntries = [["가치", formatNumber(food.value)]];
    if (consumptionKind !== "snack") factEntries.push(["포만감", formatNumber(food.fullness)]);
    facts.classList.toggle("is-single", factEntries.length === 1);
    factEntries.forEach(([label, value]) => {
      const fact = document.createElement("div");
      const term = document.createElement("span");
      term.textContent = label;
      const detail = document.createElement("strong");
      detail.textContent = value;
      fact.append(term, detail);
      facts.append(fact);
    });
    const tasteSection = document.createElement("section");
    tasteSection.className = "meal-menu-tooltip-tastes";
    tasteSection.append(createTasteEffectBadges(food));
    const content = [header, category, facts, description, tasteSection];
    if (anchor.dataset.mealRestriction) {
      const warning = document.createElement("p");
      warning.className = "meal-menu-tooltip-warning";
      warning.textContent = anchor.dataset.mealRestriction;
      content.push(warning);
    }
    elements.menuTooltip.replaceChildren(...content);
    positionMealTooltip(elements.menuTooltip, anchor);
  }

  function hideMealMenuTooltip() {
    if (elements?.menuTooltip) elements.menuTooltip.hidden = true;
  }

  function getResumeState() {
    if (!isOpen()) return null;
    return {
      settlementId: String(settlement?.id || ""),
      vendor,
      kind: consumptionKind,
      backgroundAssetId,
      tavernSpecial,
      filter,
      view,
      order: [...order.entries()],
      payment: [...payment.entries()],
      forcedOrderMinimums: [...forcedOrderMinimums.entries()],
      tavernQuestions: {
        remaining: tavernQuestions.remaining,
        maximum: tavernQuestions.maximum,
        mentioned: [...tavernQuestions.mentioned]
      }
    };
  }

  function restoreQuantityMap(entries, allowedIds = null) {
    const restored = new Map();
    (Array.isArray(entries) ? entries : []).forEach(entry => {
      if (!Array.isArray(entry) || entry.length < 2) return;
      const id = String(entry[0] || "").trim();
      const quantity = Math.max(0, Math.trunc(Number(entry[1]) || 0));
      if (id && quantity > 0 && (!allowedIds || allowedIds.has(id))) restored.set(id, quantity);
    });
    return restored;
  }

  async function restoreResumeState(snapshot = {}, context = {}) {
    const opened = await open({
      ...context,
      vendor: snapshot.vendor || context.vendor,
      kind: snapshot.kind,
      backgroundAssetId: snapshot.backgroundAssetId,
      tavernSpecial: snapshot.tavernSpecial
    });
    if (!opened && !isOpen()) return false;
    const foodIds = new Set(availableFoods().map(food => food.id));
    const currencyIds = new Set(window.ProjectWWallet.getCurrencies().map(currency => currency.id));
    order = restoreQuantityMap(snapshot.order, foodIds);
    payment = restoreQuantityMap(snapshot.payment, currencyIds);
    forcedOrderMinimums = restoreQuantityMap(snapshot.forcedOrderMinimums, foodIds);
    if (["식사", "음료", "간식"].includes(snapshot.filter)) filter = snapshot.filter;
    const questionSnapshot = snapshot.tavernQuestions || {};
    tavernQuestions.remaining = Math.max(0, Math.trunc(Number(questionSnapshot.remaining) || 0));
    tavernQuestions.maximum = Math.max(tavernQuestions.remaining, Math.trunc(Number(questionSnapshot.maximum) || tavernQuestions.maximum));
    tavernQuestions.mentioned = new Set((Array.isArray(questionSnapshot.mentioned) ? questionSnapshot.mentioned : [])
      .map(value => String(value || "").trim()).filter(Boolean));
    setView(snapshot.view === "payment" ? "payment" : "menu");
    render();
    return true;
  }

  function showMealAppetiteTooltip() {
    if (!elements.appetiteTooltip || !elements.appetitePeek || elements.appetitePeek.hidden) return;
    window.clearTimeout(appetiteTooltipHideTimer);
    const snapshot = getAppetiteSnapshot() || { parameters: [], stages: [], statuses: [] };
    const header = document.createElement("header");
    const kicker = document.createElement("span");
    kicker.textContent = "현재 입맛";
    const title = document.createElement("strong");
    title.textContent = "나하나의 식욕";
    header.append(kicker, title);
    const levels = document.createElement("div");
    levels.className = "meal-appetite-levels";
    (snapshot.parameters || []).forEach(parameter => {
      const row = document.createElement("section");
      const label = document.createElement("strong");
      label.textContent = parameter.label;
      const stages = document.createElement("div");
      stages.className = "meal-appetite-stage-buttons";
      stages.classList.toggle("has-taste-direction-guide", parameter.key === "sweet");
      [...(snapshot.stages || [])].map((stage, index) => ({ stage, index })).reverse().forEach(({ stage, index }) => {
        const badge = document.createElement("span");
        badge.textContent = stage;
        badge.classList.toggle("is-active", index === parameter.stageIndex);
        stages.append(badge);
      });
      row.append(label, stages);
      levels.append(row);
    });
    const content = [header, levels];
    if (snapshot.statuses?.length) {
      const effectSection = document.createElement("section");
      effectSection.className = "meal-appetite-statuses";
      const heading = document.createElement("strong");
      heading.textContent = "식욕 관련 상태";
      const badges = document.createElement("div");
      snapshot.statuses.forEach(status => {
        const badge = document.createElement("span");
        badge.textContent = status.name || status.id;
        badge.className = status.category === "버프" ? "is-buff" : "";
        badge.title = [status.description1, status.description2, status.duration ? `지속시간 : ${status.duration}` : ""]
          .filter(Boolean).join("\n");
        badges.append(badge);
      });
      effectSection.append(heading, badges);
      content.push(effectSection);
    }
    elements.appetiteTooltip.replaceChildren(...content);
    positionMealTooltip(elements.appetiteTooltip, elements.appetitePeek);
  }

  function hideMealAppetiteTooltip(immediate = false) {
    window.clearTimeout(appetiteTooltipHideTimer);
    if (!elements?.appetiteTooltip) return;
    if (immediate) {
      elements.appetiteTooltip.hidden = true;
      return;
    }
    appetiteTooltipHideTimer = window.setTimeout(() => {
      if (elements?.appetiteTooltip) elements.appetiteTooltip.hidden = true;
    }, 140);
  }

  function showAdvancedTutorialPreview(kind) {
    hideMealAppetiteTooltip(true);
    hideMealMenuTooltip();
    if (kind === "appetite") {
      showMealAppetiteTooltip();
      return Boolean(elements?.appetiteTooltip && !elements.appetiteTooltip.hidden);
    }
    if (kind !== "menu") return false;
    const anchor = elements?.menu?.querySelector("button[data-meal-add]");
    const foodId = String(anchor?.dataset?.mealAdd || "");
    const food = contextualFood(foods.find(entry => entry.id === foodId));
    if (!anchor || !food) return false;
    const menuCategory = anchor.closest(".meal-menu-section")?.querySelector("h4")?.textContent || "메뉴";
    showMealMenuTooltip(food, anchor, menuCategory);
    return Boolean(elements?.menuTooltip && !elements.menuTooltip.hidden);
  }

  function hideAdvancedTutorialPreview() {
    hideMealAppetiteTooltip(true);
    hideMealMenuTooltip();
  }

  function positionMealTooltip(tooltip, anchor) {
    tooltip.hidden = false;
    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const margin = 12;
    let left = anchorRect.right + 10;
    let top = anchorRect.top;
    if (left + tooltipRect.width > window.innerWidth - margin) left = anchorRect.left - tooltipRect.width - 10;
    if (top + tooltipRect.height > window.innerHeight - margin) top = window.innerHeight - tooltipRect.height - margin;
    tooltip.style.left = `${Math.max(margin, left)}px`;
    tooltip.style.top = `${Math.max(margin, top)}px`;
  }

  function emptyMessage(message) {
    const paragraph = document.createElement("p");
    paragraph.className = "meal-list-empty";
    paragraph.textContent = message;
    return paragraph;
  }

  function orderEntries() {
    return [...order.entries()].flatMap(([id, quantity]) => {
      const food = contextualFood(foods.find(entry => entry.id === id));
      return food && quantity > 0 ? [{ food, quantity }] : [];
    });
  }

  function renderOrder() {
    const entries = orderEntries();
    if (!entries.length) tastePreviewVisible = false;
    elements.order.replaceChildren();
    if (!entries.length) elements.order.append(emptyMessage("메뉴를 선택하세요."));
    else elements.order.append(...entries.map(createOrderItem));
    const preview = calculateMeal(entries);
    elements.totalValue.previousElementSibling.textContent = consumptionKind === "snack" ? "간식값" : "식사값";
    const compactMeal = consumptionKind === "snack" || vendor === "여관";
    elements.totalFullness.closest("div").hidden = compactMeal;
    elements.tier.closest("div").hidden = compactMeal;
    elements.totalValue.textContent = formatNumber(preview.value);
    elements.totalFullness.textContent = formatNumber(preview.fullness);
    elements.tier.textContent = entries.length ? preview.tier.label : "-";
    if (elements.platingPreview) {
      elements.platingPreview.disabled = !entries.length;
      elements.platingPreview.setAttribute("aria-pressed", String(tastePreviewVisible && entries.length > 0));
    }
    elements.order.classList.toggle("is-taste-preview", tastePreviewVisible && entries.length > 0);
    elements.clear.disabled = !entries.length;
    const restrictions = currentRestrictions();
    const fullnessLimitExceeded = restrictions.fullnessMaximum > 0
      && preview.fullness >= restrictions.fullnessMaximum;
    const tutorialRule = restrictions.tutorialMeal;
    const tutorialInvalid = Boolean(tutorialRule?.active && (
      preview.fullness < (Number(tutorialRule.minimumFullness) || 0)
      || preview.fullness > (Number(tutorialRule.maximumFullness) || Number.POSITIVE_INFINITY)
      || alcoholCount(entries) < (Number(tutorialRule.minimumAlcohol) || 0)
    ));
    elements.confirm.disabled = !entries.length || fullnessLimitExceeded || tutorialInvalid;
    elements.confirm.textContent = entries.length ? `결제하기 · 가치 ${formatNumber(preview.value)}` : "결제하기";
    elements.confirm.title = fullnessLimitExceeded
      ? `${restrictions.fullnessLimitReason} 때문에 포만감 ${restrictions.fullnessMaximum} 이상의 식사는 주문할 수 없습니다.`
      : tutorialInvalid
        ? `포만감 ${tutorialRule.minimumFullness}~${tutorialRule.maximumFullness}, 술 ${tutorialRule.minimumAlcohol}개 이상을 맞춰 주세요.`
        : entries.length ? "선택한 메뉴의 화폐 결제 화면으로 이동합니다." : "메뉴를 먼저 골라 주세요.";
    window.dispatchEvent(new CustomEvent("projectw:mealorderchange", {
      detail: { vendor, kind: consumptionKind, fullness: preview.fullness, alcoholCount: alcoholCount(entries), valid: !elements.confirm.disabled }
    }));
  }

  function createOrderItem({ food, quantity }) {
    const article = document.createElement("article");
    article.className = "meal-order-item";
    const copy = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = food.name;
    const value = document.createElement("span");
    value.textContent = consumptionKind === "snack"
      ? `가치 ${formatNumber(food.value * quantity)}`
      : `가치 ${formatNumber(food.value * quantity)} · 포만감 ${formatNumber(food.fullness * quantity)}`;
    copy.append(name, value);
    const controls = document.createElement("div");
    controls.className = "meal-order-controls";
    const decrease = orderButton("−", "decrease", food.id, `${food.name} 한 개 빼기`);
    const count = document.createElement("b");
    count.textContent = `× ${quantity}`;
    const increase = orderButton("+", "increase", food.id, `${food.name} 한 개 더하기`);
    const restrictions = currentRestrictions();
    if (vendor === "여관") {
      increase.disabled = true;
      increase.title = INN_FOOD_IDS.has(food.id)
        ? "여관의 기본 식사는 한 종류만 하나씩 주문할 수 있습니다."
        : "여관의 지역 특선은 메뉴마다 하나만 주문할 수 있습니다.";
    } else if ((restrictions.alcoholDisabled && ALCOHOL_FOOD_IDS.has(food.id))
      || (restrictions.fullnessMaximum > 0
        && calculateMeal().fullness + food.fullness >= restrictions.fullnessMaximum)) increase.disabled = true;
    const remove = orderButton("빼기", "remove", food.id, `${food.name} 주문에서 빼기`);
    remove.className = "meal-order-remove";
    const forcedMinimum = forcedOrderMinimums.get(food.id) || 0;
    if (forcedMinimum && quantity <= forcedMinimum) {
      decrease.disabled = true;
      remove.disabled = true;
      decrease.title = "현재 상태가 요구하는 최소 주문 수량입니다.";
      remove.title = "현재 상태가 요구하는 메뉴라 주문서에서 뺄 수 없습니다.";
    }
    if (consumptionKind === "snack") controls.append(remove);
    else controls.append(decrease, count, increase, remove);
    article.append(copy, controls, createOrderTastePreview(food));
    return article;
  }

  function createOrderTastePreview(food) {
    const preview = document.createElement("div");
    preview.className = "meal-order-taste-preview";
    [
      ["단맛", food.sweet],
      ["짠맛", food.salty],
      ["자극", food.stimulus],
      ["기름짐", food.weight]
    ].forEach(([label, storedValue]) => {
      const presentation = tasteEffectPresentation(label, storedValue);
      const badge = document.createElement("span");
      badge.className = presentation.className;
      badge.textContent = presentation.text;
      preview.append(badge);
    });
    return preview;
  }

  function setTastePreviewVisible(visible) {
    tastePreviewVisible = Boolean(visible) && consumptionKind === "meal" && vendor === "주점" && view === "menu";
    elements?.order?.classList.toggle("is-taste-preview", tastePreviewVisible && order.size > 0);
    if (elements?.platingPreview) {
      elements.platingPreview.setAttribute("aria-pressed", String(tastePreviewVisible && order.size > 0));
    }
  }

  function orderButton(label, action, id, ariaLabel) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.mealOrderAction = action;
    button.dataset.mealFoodId = id;
    button.setAttribute("aria-label", ariaLabel);
    return button;
  }

  function openPayment() {
    if (!orderEntries().length || elements.confirm.disabled) return;
    payment.clear();
    autoSelectPayment(calculateMeal().value, currencyDefinitions());
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

  function setView(nextView) {
    view = nextView === "payment" ? "payment" : "menu";
    if (view === "payment") setTastePreviewVisible(false);
    elements.menuView.hidden = view !== "menu";
    elements.paymentView.hidden = view !== "payment";
    elements.window.classList.toggle("is-payment-view", view === "payment");
    if (view === "payment") {
      if (elements.askNahana) elements.askNahana.hidden = true;
      if (elements.appetitePeek) elements.appetitePeek.hidden = true;
      hideMealAppetiteTooltip(true);
      hideMealMenuTooltip();
      renderPaymentView();
    }
    else renderMenuView();
    window.dispatchEvent(new CustomEvent("projectw:mealviewchange", { detail: { view, vendor, kind: consumptionKind } }));
  }

  function renderPaymentView() {
    syncContextLabels();
    const tutorialLocked = Boolean(currentRestrictions().tutorialMeal?.active);
    elements.close.disabled = tutorialLocked;
    elements.return.disabled = tutorialLocked;
    elements.paymentBack.disabled = tutorialLocked;
    const preview = calculateMeal();
    const currencies = currencyDefinitions();
    const offered = paymentTotal(currencies);
    const difference = offered - preview.value;
    elements.walletValue.textContent = `약 ${formatNumber(walletTotal())} 가치`;
    elements.currencyList.replaceChildren(...currencies.map(createCurrencyButton));
    elements.paymentOffer.replaceChildren();
    const selected = currencies.filter(currency => (payment.get(currency.id) || 0) > 0);
    if (!selected.length) elements.paymentOffer.append(emptyMessage("보유 화폐에서 동전을 골라 올려놓으세요."));
    else elements.paymentOffer.append(...selected.map(createPaymentRow));
    elements.paymentRequired.textContent = formatNumber(preview.value);
    elements.paymentOffered.textContent = formatNumber(offered);
    elements.paymentDifference.textContent = difference > 0 ? `+${formatNumber(difference)}` : formatNumber(difference);
    elements.paymentDifference.classList.toggle("is-short", difference < 0);
    elements.paymentDifference.classList.toggle("is-change", difference > 0);
    elements.paymentClear.disabled = !payment.size;
    const canPay = offered >= preview.value && canReturnChange(difference);
    elements.paymentConfirm.disabled = !canPay || completionInProgress;
    const priceLabel = consumptionKind === "snack" ? "간식값" : "식사값";
    elements.paymentConfirm.textContent = `${priceLabel} 지불`;
    if (difference < 0) elements.paymentMessage.textContent = `${formatNumber(Math.abs(difference))} 가치가 부족합니다.`;
    else if (difference === 0) elements.paymentMessage.textContent = `${priceLabel}과 정확히 맞습니다.`;
    else if (canPay) elements.paymentMessage.textContent = `${formatNumber(difference)} 가치를 거슬러 받습니다.`;
    else elements.paymentMessage.textContent = "현재 화폐로 거스름돈을 만들 수 없습니다.";
  }

  function syncContextLabels() {
    const snack = consumptionKind === "snack";
    const inn = vendor === "여관";
    elements.filterNav.hidden = snack || inn;
    elements.menuEyebrow.textContent = snack ? "오늘 시장에서 고를 수 있는 간식" : inn ? "오늘 묵는 손님을 위한 식사" : "오늘 차려낼 수 있는 음식";
    elements.menuTitle.textContent = snack ? "간식 메뉴" : inn ? "여관 식사" : "메뉴판";
    elements.orderEyebrow.textContent = snack ? "오늘 먹을 간식" : inn ? "여관에서 먹을 음식" : "함께 먹을 음식";
    elements.orderTitle.textContent = snack ? "간식 바구니" : inn ? "식사 주문서" : "주문서";
    elements.paymentHeading.textContent = snack ? "간식값 지불" : "식사값 지불";
    elements.paymentRequiredLabel.textContent = snack ? "간식값" : "식사값";
  }

  function currencyDefinitions() {
    const wallet = normalizeWallet(getPlayerWallet());
    return window.ProjectWWallet.getCurrencies().map((currency, index) => ({
      ...currency,
      assetId: `Asset_Coin_${index + 1}`,
      quantity: wallet[currency.id] || 0,
      regionalValue: Math.max(0.1, Math.round(window.ProjectWWallet.getCurrencyValue(currency, settlement?.region || getRegion()) * 10) / 10)
    }));
  }

  function createCurrencyButton(currency) {
    const selected = payment.get(currency.id) || 0;
    const available = Math.max(0, currency.quantity - selected);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "meal-currency-card";
    button.dataset.mealCurrencyAdd = currency.id;
    button.disabled = available <= 0;
    if (selected) button.classList.add("is-selected");
    const coin = document.createElement("span");
    coin.className = "meal-currency-coin";
    const source = getAssetUrl(currency.assetId);
    if (source) {
      const image = document.createElement("img");
      image.src = source;
      image.alt = "";
      image.dataset.assetId = currency.assetId;
      image.draggable = false;
      coin.append(image);
    } else coin.textContent = String(currency.type || "화").slice(0, 1);
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = currency.name;
    const value = document.createElement("small");
    value.textContent = `가치 ${formatNumber(currency.regionalValue)}`;
    copy.append(name, value);
    const count = document.createElement("b");
    count.textContent = `× ${available}`;
    button.append(coin, copy, count);
    return button;
  }

  function createPaymentRow(currency) {
    const quantity = payment.get(currency.id) || 0;
    const article = document.createElement("article");
    article.className = "meal-payment-row";
    const coin = document.createElement("span");
    coin.className = "meal-payment-row-coin";
    const source = getAssetUrl(currency.assetId);
    if (source) {
      const image = document.createElement("img");
      image.src = source;
      image.alt = "";
      image.draggable = false;
      coin.append(image);
    }
    const copy = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = currency.name;
    const value = document.createElement("span");
    value.textContent = `${formatNumber(currency.regionalValue)} × ${quantity} = ${formatNumber(currency.regionalValue * quantity)}`;
    copy.append(name, value);
    const controls = document.createElement("div");
    const count = document.createElement("b");
    count.textContent = `× ${quantity}`;
    controls.append(
      paymentButton("−", "decrease", currency.id, `${currency.name} 한 개 빼기`),
      count,
      paymentButton("+", "increase", currency.id, `${currency.name} 한 개 더하기`)
    );
    article.append(coin, copy, controls);
    return article;
  }

  function paymentButton(label, action, currencyId, ariaLabel) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.mealPaymentAction = action;
    button.dataset.mealCurrencyId = currencyId;
    button.setAttribute("aria-label", ariaLabel);
    return button;
  }

  function paymentTotal(currencies = currencyDefinitions()) {
    return currencies.reduce((total, currency) => total + currency.regionalValue * (payment.get(currency.id) || 0), 0);
  }

  function canReturnChange(change) {
    if (change <= 0) return true;
    return Boolean(changeCurrencyFor(change));
  }

  async function completePayment() {
    if (completionInProgress) return;
    const entries = orderEntries();
    if (!entries.length) {
      setView("menu");
      return;
    }
    const usage = normalizedUsage();
    const usageKey = consumptionKind === "snack" ? "snackUsed" : "mealUsed";
    if (usage[usageKey]) {
      close();
      notify(consumptionKind === "snack" ? "오늘은 이미 간식을 먹었습니다." : "오늘은 이미 식사를 했습니다.");
      return;
    }
    const preview = calculateMeal(entries);
    const currencies = currencyDefinitions();
    const offered = paymentTotal(currencies);
    const change = offered - preview.value;
    if (change < 0 || !canReturnChange(change)) {
      renderPaymentView();
      return;
    }
    const currencyTransferred = payment.size > 0 || change > 0;
    completionInProgress = true;
    renderPaymentView();
    try {
      const tavernMeal = consumptionKind === "meal" && vendor === "주점";
      if (tavernMeal) await beforeTavernMealCompletion();
      const wallet = normalizeWallet(getPlayerWallet());
      for (const [currencyId, quantity] of payment.entries()) {
        if (quantity > (wallet[currencyId] || 0)) {
          notify("보유 화폐가 바뀌어 결제안을 초기화했습니다.");
          clearPayment();
          return;
        }
        wallet[currencyId] -= quantity;
      }
      if (change > 0) {
        const returned = changeCurrencyFor(change);
        if (!returned) return;
        wallet[returned.id] = (wallet[returned.id] || 0) + returned.quantity;
      }
      setPlayerWallet(wallet);
      const worldTime = getWorldTime();
      const day = Math.max(1, Math.trunc(Number(worldTime?.day) || 1));
      const record = {
        settlementId: settlement?.id || "",
        settlementName: settlement?.name || "",
        vendor,
        kind: consumptionKind,
        contractDay: day,
        phaseIndex: Math.max(0, Math.trunc(Number(worldTime?.phaseIndex) || 0)),
        foods: entries.map(({ food, quantity }) => ({
          id: food.id,
          name: food.name,
          quantity,
          reaction: food.reaction
        })),
        value: preview.value,
        fullness: preview.fullness,
        tier: preview.tier.label,
        moodChange: preview.after.mood - preview.before.mood,
        overflowPenalty: preview.overflowPenalty,
        duplicateMoodPenalty: preview.duplicateMoodPenalty,
        tavernSpecialMoodBonus: preview.tavernSpecialMoodBonus,
        alcoholCount: alcoholCount(entries),
        tasteDelta: { ...preview.delta },
        completedAt: new Date().toISOString()
      };
      setPartnerState(preview.after, record);
      setFoodUsage({ ...usage, day, [usageKey]: true });
      onConsumptionComplete(record);
      if (currencyTransferred) window.ProjectWAudio?.playCurrencyCompletion?.("trade");
      else window.ProjectWAudio?.playEffect("trade");
      if (tavernMeal) {
        const situationAssetId = ["만찬", "호화로운 만찬"].includes(preview.tier.label) ? "Asset_SIT_01" : "";
        const finishMeal = returnToFacility ? returnToPreviousFacility : close;
        window.dispatchEvent(new CustomEvent("projectw:mealtransitionstart", { detail: record }));
        await playCompletionTransition(situationAssetId, finishMeal);
        await afterTavernMealTransition(record);
      } else {
        if (returnToFacility) returnToPreviousFacility();
        else close();
      }
      window.dispatchEvent(new CustomEvent("projectw:mealcomplete", { detail: record }));
      notify(consumptionKind === "snack" ? "간식을 먹었습니다." : `${preview.tier.label} 식사를 마쳤습니다.`);
    } finally {
      completionInProgress = false;
      if (isOpen() && view === "payment") renderPaymentView();
    }
  }

  function calculateMeal(entries = orderEntries()) {
    const before = normalizePartner(getPartnerState());
    const delta = { mood: 0, sweet: 0, salty: 0, stimulus: 0, weight: 0 };
    let value = 0;
    let fullness = 0;
    let duplicateMoodPenalty = 0;
    entries.forEach(({ food, quantity }) => {
      value += food.value * quantity;
      fullness += food.fullness * quantity;
      if (consumptionKind !== "snack") delta.mood += food.mood * quantity;
      if (consumptionKind === "meal" && vendor === "주점" && quantity > 1 && !DUPLICATE_MOOD_EXEMPT_FOOD_IDS.has(food.id)) {
        duplicateMoodPenalty += quantity - 1;
      }
      TASTE_KEYS.forEach(key => { delta[key] += food[key] * quantity; });
    });
    const snackKinds = consumptionKind === "snack" ? Math.min(currentRestrictions().snackMaximum, entries.length) : 0;
    const tier = consumptionKind === "snack"
      ? { label: `간식 ${snackKinds}종`, moodBonus: SNACK_MOOD_BONUS[snackKinds] || 0 }
      : mealTier(fullness);
    const raw = {};
    const after = {};
    let overflow = 0;
    TASTE_KEYS.forEach(key => {
      raw[key] = before[key] + delta[key];
      overflow += Math.max(0, -raw[key], raw[key] - 100);
      after[key] = clamp(raw[key], 0, 100);
    });
    const overflowPenalty = Math.min(60, Math.ceil(overflow / 2));
    const tavernSpecialMoodBonus = calculateTavernSpecialMoodBonus(entries);
    const unscaledMoodChange = delta.mood + tier.moodBonus + tavernSpecialMoodBonus - duplicateMoodPenalty - overflowPenalty;
    const moodMultiplier = currentRestrictions().moodGainMultiplier;
    const moodChange = unscaledMoodChange > 0 ? Math.floor(unscaledMoodChange * moodMultiplier) : unscaledMoodChange;
    raw.mood = before.mood + moodChange;
    after.mood = clamp(raw.mood, 0, 100);
    return {
      before,
      delta,
      raw,
      after,
      value: Math.max(0, Math.round(value)),
      fullness,
      tier,
      overflowPenalty,
      duplicateMoodPenalty,
      tavernSpecialMoodBonus,
      moodMultiplier,
      moodChange
    };
  }

  function calculateTavernSpecialMoodBonus(entries) {
    if (consumptionKind !== "meal" || vendor !== "주점" || !tavernSpecial) return 0;
    if (tavernSpecial.kind === "menu") {
      return tavernSpecial.foodIds.reduce((bonus, foodId) => {
        const entry = entries.find(candidate => candidate.food.id === foodId);
        return bonus + (entry?.quantity === 1 ? 2 : 0);
      }, 0);
    }
    if (tavernSpecial.kind === "alcohol") {
      return entries.some(entry => ALCOHOL_FOOD_IDS.has(entry.food.id) && entry.quantity === 1) ? 3 : 0;
    }
    return 0;
  }

  function mealTier(fullness) {
    if (fullness < 75) return { label: "소박한 만찬", moodBonus: 0 };
    if (fullness < 150) return { label: "만찬", moodBonus: 20 };
    if (fullness < 200) return { label: "호화로운 만찬", moodBonus: 30 };
    return { label: "과식", moodBonus: 30 };
  }

  function normalizedUsage() {
    const day = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const stored = getFoodUsage() || {};
    if (Math.max(1, Math.trunc(Number(stored.day) || 1)) !== day) {
      return { day, mealUsed: false, snackUsed: false, tavernSoldOutBySettlement: {} };
    }
    return {
      day,
      mealUsed: Boolean(stored.mealUsed),
      snackUsed: Boolean(stored.snackUsed),
      tavernSoldOutBySettlement: Object.fromEntries(Object.entries(stored.tavernSoldOutBySettlement || {})
        .map(([key, ids]) => [String(key), [...new Set((Array.isArray(ids) ? ids : []).map(id => String(id || "").trim()).filter(Boolean))]]))
    };
  }

  function walletTotal() {
    const wallet = normalizeWallet(getPlayerWallet());
    return window.ProjectWWallet.getCurrencies().reduce((sum, currency) => {
      const quantity = wallet[currency.id] || 0;
      return sum + quantity * window.ProjectWWallet.getCurrencyValue(currency, settlement?.region || getRegion());
    }, 0);
  }

  function changeCurrencyFor(change) {
    const currency = window.ProjectWWallet.getCurrencies()
      .map(entry => ({
        id: entry.id,
        value: Math.max(0.1, Math.round(window.ProjectWWallet.getCurrencyValue(entry, settlement?.region || getRegion()) * 10) / 10)
      }))
      .sort((left, right) => left.value - right.value)
      .find(entry => change % entry.value === 0);
    return currency ? { id: currency.id, quantity: change / currency.value } : null;
  }

  function normalizeWallet(value) {
    return Object.fromEntries(Object.entries(value || {}).map(([id, stored]) => {
      const quantity = typeof stored === "object" && stored !== null ? stored.quantity : stored;
      return [id, Math.max(0, Math.trunc(Number(quantity) || 0))];
    }));
  }

  function normalizePartner(value) {
    return {
      mood: clamp(Number(value?.mood), 0, 100, 75),
      sweet: clamp(Number(value?.sweet), 0, 100, 50),
      salty: clamp(Number(value?.salty), 0, 100, 50),
      stimulus: clamp(Number(value?.stimulus), 0, 100, 50),
      weight: clamp(Number(value?.weight), 0, 100, 50)
    };
  }

  function clamp(value, minimum, maximum, fallback = minimum) {
    const number = Number.isFinite(value) ? value : fallback;
    return Math.min(Math.max(number, minimum), maximum);
  }

  function signed(value) {
    const number = Number(value) || 0;
    return number > 0 ? `+${formatNumber(number)}` : formatNumber(number);
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(Number(value) || 0);
  }

  window.ProjectWMeal = {
    init,
    load,
    open,
    close,
    isOpen,
    refresh,
    prepareTavernSpecial,
    getResumeState,
    restoreResumeState,
    showAdvancedTutorialPreview,
    hideAdvancedTutorialPreview
  };
}());
