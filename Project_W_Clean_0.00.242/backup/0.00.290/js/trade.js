(function exposeTrade() {
  const STORAGE_KEY = "project_w_trade_v1";
  const ADDITIONAL_ITEMS = {
    대도시: ["G_0267", "G_0268", "G_0269", "G_0270", "G_0271", "G_0272", "G_0273", "G_0276"],
    도시: ["G_0267", "G_0268", "G_0269", "G_0271", "G_0272", "G_0276"],
    마을: ["G_0267", "G_0271"]
  };
  const TIER_STOCK = new Map([[1, 4], [2, 3], [3, 2], [4, 1]]);
  const SIZE_STOCK_MODIFIER = new Map([["마을", -1], ["도시", 1], ["대도시", 2], ["관문", 0]]);
  const FACILITY_STOCK_MODIFIER = new Map([["시장", 0], ["교역소", 2], ["상회", 1], ["좌판", 2]]);
  const SIZE_WEALTH = new Map([["마을", 1], ["도시", 2], ["대도시", 4], ["관문", 2]]);
  const FACILITY_WEALTH = new Map([["시장", 1], ["교역소", 1.5], ["상회", 2], ["좌판", 1.5], ["환전상", 2.5]]);
  const OFFER_FILTERS = new Set(["all", "goods", "currencies", "information", "notes"]);
  const TIME_PHASE_COUNT = 5;
  const TRADE_TIME_SCHEMA_VERSION = 2;
  const RESTOCK_INTERVAL_DAYS = 7;
  const RESTOCK_INTERVAL_TICKS = RESTOCK_INTERVAL_DAYS * TIME_PHASE_COUNT;
  const COMPANY_INFORMATION_CAPACITY_MINIMUM = 6;
  const COMPANY_INFORMATION_CAPACITY_MAXIMUM = 8;
  const COMPANY_INFORMATION_CAPACITY_RECOVERY = 2;
  const COMPANY_INFORMATION_CAPACITY_MINIMUM_PERCENT = 25;
  const COMPANY_INFORMATION_WEIGHT_MINIMUM = 75;
  const COMPANY_INFORMATION_WEIGHT_MAXIMUM = 125;
  const GATE_INFORMATION_WEIGHT_MINIMUM = 25;
  const GATE_INFORMATION_WEIGHT_MAXIMUM = 150;
  const LOCAL_GOODS_DISPLAY_RATIO = .8;
  const LOCAL_DISTANCE_ADJUSTMENT = -50;
  const MERCHANT_IMPORT_DISTANCE_FACTOR = .35;
  const MERCHANT_IMPORT_DISTANCE_MAX = 30;
  const FIXED_LOGISTICS_DISTANCE_FACTOR = .33;
  const FOREIGN_FIXED_LOGISTICS_ORIGIN = Object.freeze({
    id: "FOREIGN_NISHUR",
    name: "니슈르 산",
    tradeDistance: 30
  });
  const MIXED_NISHUR_LOGISTICS_NAMES = new Set(["보석세공", "은", "금"]);
  const SAME_MERCHANT_RESALE_PENALTY = 10;
  const FIXED_LOGISTICS_SIZE_MODIFIER = new Map([["도시", -1], ["대도시", -2]]);
  const FIXED_LOGISTICS_FACILITY_MODIFIER = new Map([["교역소", -1], ["상회", -1]]);
  const IMPORT_COUNTS = new Map([["상회", 10], ["교역소", 5], ["시장", 0]]);
  const DURABILITY_DAMAGE_MAX = new Map([["상회", 20], ["교역소", 40], ["시장", 60], ["좌판", 40]]);
  const INDESTRUCTIBLE_DURABILITY = 9999;
  const INDESTRUCTIBLE_DISTANCE_VALUE_FACTOR = .5;
  const CAMP_SUPPLY_RARITY_LIMIT = new Map([["마을", 1], ["도시", 3], ["대도시", Number.POSITIVE_INFINITY]]);
  const REGIONAL_CAMP_SUPPLY_REGIONS = new Map([["G_0278", "북부"], ["G_0279", "남부"]]);
  const PEACETIME_WEAPON_DEMAND_CAP = new Map([["마을", 2], ["도시", 4], ["대도시", 6], ["관문", 7]]);
  const MERCHANT_WALLET_SCHEMA_VERSION = 2;
  const MERCHANT_STOCK_SCHEMA_VERSION = 7;
  const PRODUCTION_CLEARANCE_CHANCE = .1;
  const PRODUCTION_DURABILITY_DAMAGE_MAX = new Map([["상회", 10], ["교역소", 15], ["시장", 20]]);
  const PRODUCTION_CLEARANCE_CONDITION_MIN = .4;
  const PRODUCTION_CLEARANCE_CONDITION_MAX = .75;
  const NAHANA_EVENT_GIFT_ITEM_ID = "EVENT_N_E_005_GIFT";
  const MERCHANT_CURRENCY_COUNTS = {
    상회: [8, 10],
    교역소: [7, 10],
    좌판: [7, 10],
    환전상: [9, 10],
    시장: [4, 7]
  };
  const FOREIGN_CURRENCY_AFFINITY = { 상회: 2.2, 교역소: 1.8, 좌판: 1.8, 환전상: 2.8, 시장: .7 };
  const QUALITY_WEIGHTS = {
    상회: [10, 50, 30, 10],
    교역소: [25, 50, 20, 5],
    좌판: [25, 50, 20, 5],
    시장: [30, 50, 15, 5]
  };
  const QUALITY_NAMES = ["저품질", "통상품질", "고품질", "명품"];
  const QUALITY_SELL_RANGES = {
    저품질: [-30, -15], 통상품질: [-15, 15], 고품질: [15, 30], 명품: [25, 75]
  };
  const QUALITY_BUY_RANGES = {
    저품질: [-30, 0], 통상품질: [0, 25], 고품질: [25, 75], 명품: [75, 125]
  };
  const COMPETITION_WEIGHTS = {
    대도시: { production: 3, import: 2 },
    도시: { production: 5, import: 3 },
    마을: { production: 10, import: 5 },
    관문: { production: 0, import: 3 }
  };
  const FACILITY_SELL_SPREAD = new Map([["시장", 5], ["교역소", 7], ["상회", 8], ["좌판", 7]]);
  const FACILITY_BUY_DISCOUNT = new Map([["시장", 0], ["교역소", 3], ["상회", 7], ["좌판", 5]]);
  const STOCK_PRESSURE_WEIGHTS = new Map([
    ["production", 1],
    ["logistics", .5],
    ["import", .2],
    ["resale", .1]
  ]);
  const STOCK_VARIATION_WEIGHTS = {
    대도시: [[-2, 10], [-1, 20], [0, 40], [1, 20], [2, 10]],
    도시: [[-2, 10], [-1, 20], [0, 40], [1, 20], [2, 10]],
    마을: [[-1, 25], [0, 50], [1, 25]],
    관문: [[-2, 10], [-1, 20], [0, 40], [1, 20], [2, 10]]
  };
  const IDENTICAL_STOCK_THRESHOLD = new Map([["대도시", 12], ["도시", 8], ["마을", 4], ["관문", 8]]);
  const MERCHANT_COMMENT_FACILITIES = new Set(["시장", "좌판", "교역소", "상회"]);
  const MERCHANT_COMMENT_EXCLUDED_IDS = new Set(["G_0267", "G_0268", "G_0269", "G_0270", "G_0271", "G_0272", "G_0273", "G_0276", "G_0278", "G_0279", "G_0280", NAHANA_EVENT_GIFT_ITEM_ID]);
  const MERCHANT_COMMENT_MISREAD_DIALOGUES = ["DL_G_001", "DL_G_002", "DL_G_003", "DL_G_004", "DL_G_005", "DL_G_006"];
  const MERCHANT_COMMENT_ACCURACY_BY_TIER = new Map([[1, .95], [2, .9], [3, .85], [4, .8]]);
  const MERCHANT_COMMENT_BAD_DURABILITY_RATIO = .4;
  const NON_COMPANY_TRADE_FACILITIES = {
    대도시: [
      { id: "trade-post", type: "교역소" },
      { id: "market", type: "시장" },
      { id: "currency-exchange", type: "환전상" }
    ],
    도시: [
      { id: "trade-post", type: "교역소" },
      { id: "market", type: "시장" },
      { id: "currency-exchange", type: "환전상" }
    ],
    마을: [{ id: "market", type: "시장" }],
    관문: [
      { id: "stall-1", type: "좌판" },
      { id: "stall-2", type: "좌판" },
      { id: "stall-3", type: "좌판" }
    ]
  };

  let getPlayerWallet = () => ({});
  let setPlayerWallet = () => {};
  let getPlayerBillNotes = () => window.ProjectWBillNotes?.createState?.() || {};
  let setPlayerBillNotes = () => {};
  let getAssetUrl = () => "";
  let getWorldTime = () => ({ day: 1, phaseIndex: 0 });
  let getWorldSeed = () => "legacy-world";
  let getFoodUsage = () => ({ day: 1, snackUsed: false });
  let getPartnerMood = () => 50;
  let getMerchantCommentBonus = () => 0;
  let getMerchantCommentMisreadChance = () => null;
  let getCompanyScoreMultiplier = () => 1;
  let getSettlementVisitToken = () => "";
  let getCityEventModifiers = () => ({ revision: 0, priceBySubcategory: {}, stockBySubcategory: {} });
  let hasPartnerHangover = () => false;
  let showMerchantComment = () => Promise.resolve();
  let cancelMerchantComments = () => {};
  let getBargainProfile = () => ({ available: false, attemptsRemaining: 0, attemptsMaximum: 0, chance: 0, bonusPercent: 0, valuePerSuccess: 3, valuePerFailure: 2, valueMaximum: 6 });
  let attemptBargain = () => ({ success: false });
  let completeBargainTrade = () => {};
  let updateCompanyInformationButton = () => {};
  let collectCompanyInformation = () => Promise.resolve(false);
  let recordMerchantProfit = () => {};
  let showBargainDialogue = () => {};
  let notify = () => {};
  let state = loadState();
  let current = null;
  let proposal = createProposal();
  let offerFilters = { player: "all", merchant: "all" };
  let merchantTravelFilterMode = "all";
  let playerCatalogMode = "goods";
  let merchantCommentSequence = 0;
  const merchantCommentPlans = new Map();
  let elements = {};

  function init(options = {}) {
    getPlayerWallet = typeof options.getPlayerWallet === "function" ? options.getPlayerWallet : getPlayerWallet;
    setPlayerWallet = typeof options.setPlayerWallet === "function" ? options.setPlayerWallet : setPlayerWallet;
    getPlayerBillNotes = typeof options.getPlayerBillNotes === "function" ? options.getPlayerBillNotes : getPlayerBillNotes;
    setPlayerBillNotes = typeof options.setPlayerBillNotes === "function" ? options.setPlayerBillNotes : setPlayerBillNotes;
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    getWorldTime = typeof options.getWorldTime === "function" ? options.getWorldTime : getWorldTime;
    getWorldSeed = typeof options.getWorldSeed === "function" ? options.getWorldSeed : getWorldSeed;
    getFoodUsage = typeof options.getFoodUsage === "function" ? options.getFoodUsage : getFoodUsage;
    getPartnerMood = typeof options.getPartnerMood === "function" ? options.getPartnerMood : getPartnerMood;
    getMerchantCommentBonus = typeof options.getMerchantCommentBonus === "function" ? options.getMerchantCommentBonus : getMerchantCommentBonus;
    getMerchantCommentMisreadChance = typeof options.getMerchantCommentMisreadChance === "function"
      ? options.getMerchantCommentMisreadChance
      : getMerchantCommentMisreadChance;
    getCompanyScoreMultiplier = typeof options.getCompanyScoreMultiplier === "function" ? options.getCompanyScoreMultiplier : getCompanyScoreMultiplier;
    getSettlementVisitToken = typeof options.getSettlementVisitToken === "function" ? options.getSettlementVisitToken : getSettlementVisitToken;
    getCityEventModifiers = typeof options.getCityEventModifiers === "function" ? options.getCityEventModifiers : getCityEventModifiers;
    hasPartnerHangover = typeof options.hasPartnerHangover === "function" ? options.hasPartnerHangover : hasPartnerHangover;
    showMerchantComment = typeof options.showMerchantComment === "function" ? options.showMerchantComment : showMerchantComment;
    cancelMerchantComments = typeof options.cancelMerchantComments === "function" ? options.cancelMerchantComments : cancelMerchantComments;
    getBargainProfile = typeof options.getBargainProfile === "function" ? options.getBargainProfile : getBargainProfile;
    attemptBargain = typeof options.attemptBargain === "function" ? options.attemptBargain : attemptBargain;
    completeBargainTrade = typeof options.completeBargainTrade === "function" ? options.completeBargainTrade : completeBargainTrade;
    updateCompanyInformationButton = typeof options.updateCompanyInformationButton === "function"
      ? options.updateCompanyInformationButton
      : updateCompanyInformationButton;
    collectCompanyInformation = typeof options.collectCompanyInformation === "function"
      ? options.collectCompanyInformation
      : collectCompanyInformation;
    recordMerchantProfit = typeof options.recordMerchantProfit === "function" ? options.recordMerchantProfit : recordMerchantProfit;
    showBargainDialogue = typeof options.showBargainDialogue === "function" ? options.showBargainDialogue : showBargainDialogue;
    notify = typeof options.notify === "function" ? options.notify : notify;
    elements = {
      modal: document.querySelector("#trade-modal"),
      snackButton: document.querySelector("#trade-snack-open"),
      currencyRatesButton: document.querySelector("#trade-currency-rates"),
      companyInformationButton: document.querySelector("#trade-company-information"),
      close: document.querySelector("#trade-close"),
      title: document.querySelector("#trade-title"),
      location: document.querySelector("#trade-location"),
      companyIcon: document.querySelector("#trade-company-icon"),
      dataStatus: document.querySelector("#trade-data-status"),
      merchantItems: document.querySelector("#trade-merchant-items"),
      playerItems: document.querySelector("#trade-player-items"),
      playerCatalogTitle: document.querySelector("#trade-player-title"),
      playerCapacity: document.querySelector("#trade-player-capacity"),
      playerOffer: document.querySelector("#trade-player-offer-list"),
      merchantOffer: document.querySelector("#trade-merchant-offer-list"),
      playerOfferTitle: document.querySelector("#trade-player-offer-title"),
      merchantOfferTitle: document.querySelector("#trade-merchant-offer-title"),
      playerCurrencies: document.querySelector("#trade-player-currencies"),
      merchantCurrencies: document.querySelector("#trade-merchant-currencies"),
      playerCurrencyFill: document.querySelector("#trade-player-currency-fill"),
      merchantCurrencyFill: document.querySelector("#trade-merchant-currency-fill"),
      balanceValue: document.querySelector("#trade-balance-value"),
      bargain: document.querySelector("#trade-bargain"),
      exchangeFocus: document.querySelector("#trade-exchange-focus"),
      exchangeFocusButtons: [...document.querySelectorAll("[data-trade-action='exchange-focus']")],
      exchangeFee: document.querySelector("#trade-exchange-fee"),
      balanceStatus: document.querySelector("#trade-balance-status"),
      cargoPreview: document.querySelector("#trade-cargo-preview"),
      previewSlots: document.querySelector("#trade-preview-slots"),
      previewWeight: document.querySelector("#trade-preview-weight"),
      confirm: document.querySelector("#trade-confirm"),
      restock: document.querySelector("#trade-restock-status"),
      travelFilter: document.querySelector("#trade-travel-filter"),
      travelHideFilter: document.querySelector("#trade-travel-hide-filter"),
      playerCatalogTabs: [...document.querySelectorAll("[data-trade-player-catalog]")]
    };
    if (!elements.modal || !elements.confirm) return;
    elements.snackButton?.addEventListener("click", openMarketSnack);
    elements.currencyRatesButton?.addEventListener("click", purchaseCurrencyRates);
    elements.companyInformationButton?.addEventListener("click", handleCompanyInformation);
    elements.close.addEventListener("click", close);
    elements.confirm.addEventListener("click", confirmTrade);
    elements.bargain?.addEventListener("click", handleBargain);
    elements.travelFilter?.addEventListener("click", toggleTravelFilter);
    elements.travelHideFilter?.addEventListener("click", toggleTravelHideFilter);
    elements.playerCatalogTabs.forEach(button => button.addEventListener("click", switchPlayerCatalog));
    elements.modal.addEventListener("click", handleClick);
    elements.modal.addEventListener("pointerdown", event => {
      if (event.target === elements.modal) close();
    });
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || elements.modal.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    });
  }

  async function open(options = {}) {
    if (!elements.modal) return;
    const settlement = options.settlement;
    const facilityType = String(options.facilityType || "").trim();
    const facilityLabel = String(options.facilityLabel || facilityType).trim();
    const facilityId = String(options.facilityId || facilityLabel).trim();
    const companyName = facilityType === "상회"
      ? String(options.companyName || facilityLabel).trim()
      : "";
    const companyAssetId = companyName ? String(options.companyAssetId || "").trim() : "";
    if (!settlement?.id || !["상회", "교역소", "시장", "좌판", "환전상"].includes(facilityType)) {
      notify("이 시설에서는 아직 거래할 수 없습니다.");
      return;
    }

    const currencyOnly = facilityType === "환전상";
    const snackAvailable = facilityType === "시장" && String(settlement.category || "").trim() !== "마을";
    if (elements.snackButton) {
      elements.snackButton.hidden = !snackAvailable;
      elements.snackButton.disabled = true;
    }
    if (elements.currencyRatesButton) {
      const region = String(settlement.region || "중부").trim() || "중부";
      elements.currencyRatesButton.hidden = !currencyOnly;
      elements.currencyRatesButton.disabled = true;
      elements.currencyRatesButton.dataset.tooltip = `현재 지역(${region})의 최신 화폐 시세를 확인합니다. 환전상에게 정보비(보유중인 가장 가치가 낮은 은화)를 지불합니다.`;
      const status = elements.currencyRatesButton.querySelector("span");
      if (status) status.textContent = `${region} 최신 정보`;
    }
    if (elements.companyInformationButton) {
      elements.companyInformationButton.hidden = facilityType !== "상회";
      elements.companyInformationButton.disabled = true;
    }
    elements.modal.hidden = false;
    elements.modal.dataset.facilityType = facilityType;
    elements.modal.classList.toggle("is-currency-exchange", currencyOnly);
    if (elements.exchangeFocus) elements.exchangeFocus.hidden = !currencyOnly;
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", {
      detail: { open: true, facilityType }
    }));
    if (elements.companyIcon) {
      elements.companyIcon.hidden = true;
      elements.companyIcon.alt = "";
      elements.companyIcon.removeAttribute("src");
    }
    elements.title.textContent = facilityLabel;
    elements.location.textContent = `${settlement.name || "거점"} · ${settlement.category || "거점"}`;
    elements.dataStatus.textContent = "";
    elements.dataStatus.hidden = true;
    if (elements.restock) elements.restock.textContent = "상품 갱신일 계산 중";
    elements.confirm.disabled = true;
    merchantTravelFilterMode = "all";
    playerCatalogMode = "goods";
    clearLists();
    if (elements.playerOfferTitle) elements.playerOfferTitle.textContent = currencyOnly ? "내가 지불하는 화폐" : "내가 건네는 것";
    if (elements.merchantOfferTitle) elements.merchantOfferTitle.textContent = currencyOnly ? "환전상이 지급하는 화폐" : "상인이 건네는 것";
    elements.confirm.textContent = currencyOnly ? "환전 확정" : "거래 확정";

    const [goodsResult, currencyResult, mapLoaded] = await Promise.all([
      window.ProjectWCargo.load(),
      window.ProjectWWallet.load(),
      window.ProjectWMapView.load(),
      window.ProjectWCityEvents.load(),
      window.ProjectWMerchantPath.loadPeddlerDefinitions?.()
    ]);
    if (elements.modal.hidden) return;
    await window.ProjectWCityEvents.ensureCurrentDay();
    if (elements.modal.hidden) return;
    const definitions = window.ProjectWCargo.getItemDefinitions();
    const currencies = window.ProjectWWallet.getCurrencies();
    const worldData = window.ProjectWMapView.getTradeWorldData();
    const worldTime = normalizeWorldTime(getWorldTime());
    const merchantKey = `${settlement.id}|${facilityId}`;
    ensureSettlementMerchants({
      settlement,
      definitions,
      currencies,
      catalogSource: goodsResult?.source,
      worldData,
      worldTime
    });
    const ensured = ensureMerchant({
      merchantKey,
      bargainKey: `${settlement.id}|${facilityId}`,
      settlement,
      facilityType,
      definitions,
      currencies,
      catalogSource: goodsResult?.source,
      worldData,
      worldTime
    });
    const merchant = ensured.merchant;
    const unresolvedProducts = ensured.unresolvedProducts;

    current = {
      settlement,
      facilityType,
      facilityLabel,
      facilityId,
      companyName,
      companyAssetId,
      merchantKey,
      bargainKey: merchantKey,
      merchant,
      worldData,
      worldTime,
      definitions,
      definitionsById: new Map(definitions.map(definition => [definition.id, definition])),
      currencies,
      currenciesById: new Map(currencies.map(currency => [currency.id, currency])),
      goodsSource: goodsResult?.source || "fallback",
      currencySource: currencyResult?.source || window.ProjectWWallet.getDataSource(),
      mapSource: mapLoaded && worldData.loaded ? "csv" : "unavailable",
      unresolvedProducts,
      currencyOnly
    };
    if (companyName) {
      const capacityState = ensureCompanyInformationCapacity(companyName, worldTimeTick(worldTime));
      if (capacityState.changed) persistState();
    }
    proposal = createProposal();
    offerFilters = currencyOnly
      ? { player: "currencies", merchant: "currencies" }
      : { player: "all", merchant: "all" };
    render();
    if (elements.currencyRatesButton && currencyOnly) elements.currencyRatesButton.disabled = false;
    if (elements.companyInformationButton && facilityType === "상회") {
      updateCompanyInformationButton(elements.companyInformationButton, companyName, settlement);
    }
    startMerchantCommentary();
    if (elements.snackButton && snackAvailable) {
      const usage = getFoodUsage() || {};
      const worldDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
      const used = Math.max(1, Math.trunc(Number(usage.day) || 1)) === worldDay && Boolean(usage.snackUsed);
      const statusBlocker = String(hasPartnerHangover() || "").trim();
      elements.snackButton.disabled = used || Boolean(statusBlocker);
      elements.snackButton.classList.toggle("is-limit-exhausted", used || Boolean(statusBlocker));
      elements.snackButton.title = statusBlocker ? `${statusBlocker} 상태에서는 간식을 먹을 수 없습니다.` : used ? "오늘은 이미 간식을 먹었습니다." : "시장의 간식 메뉴를 엽니다.";
      const snackState = elements.snackButton.querySelector("span");
      if (snackState) snackState.textContent = statusBlocker ? `X ${statusBlocker} X` : used ? "오늘 이용 완료" : "시장 먹거리";
    }
    window.dispatchEvent(new CustomEvent("projectw:tradeopen", {
      detail: {
        facilityType,
        settlementId: settlement.id,
        settlementCategory: String(settlement.category || ""),
        snackAvailable
      }
    }));
    requestAnimationFrame(() => elements.close.focus());
  }

  function openMarketSnack() {
    if (!current?.settlement || current.facilityType !== "시장" || String(current.settlement.category || "").trim() === "마을") return;
    const statusBlocker = String(hasPartnerHangover() || "").trim();
    if (statusBlocker) {
      notify(`${statusBlocker} 상태에서는 간식을 먹을 수 없습니다.`);
      return;
    }
    const reopenOptions = {
      settlement: current.settlement,
      facilityType: current.facilityType,
      facilityLabel: current.facilityLabel,
      facilityId: current.facilityId,
      companyName: current.companyName,
      companyAssetId: current.companyAssetId
    };
    close();
    window.ProjectWMeal?.open({
      settlement: reopenOptions.settlement,
      vendor: "시장",
      kind: "snack",
      onReturn: () => open(reopenOptions)
    });
  }

  async function handleCompanyInformation() {
    if (!current || current.facilityType !== "상회" || !elements.companyInformationButton) return;
    elements.companyInformationButton.disabled = true;
    await collectCompanyInformation(current.companyName, current.settlement);
    if (current?.facilityType === "상회" && !elements.modal.hidden) {
      updateCompanyInformationButton(elements.companyInformationButton, current.companyName, current.settlement);
    }
  }

  function purchaseCurrencyRates() {
    if (!current?.currencyOnly) return;
    const wallet = normalizeWallet(getPlayerWallet());
    const silver = current.currencies
      .filter(currency => currency.type === "은화" && walletQuantity(wallet, currency.id) > 0)
      .map(currency => ({ currency, value: tradeCurrencyValue(currency) }))
      .sort((left, right) => left.value - right.value
        || Number(left.currency.baseValue || 0) - Number(right.currency.baseValue || 0)
        || left.currency.id.localeCompare(right.currency.id, "ko"))[0];
    if (!silver) {
      notify("정보비로 지불할 은화가 없습니다.");
      return;
    }
    const currencyId = silver.currency.id;
    const remaining = Math.max(0, walletQuantity(wallet, currencyId) - 1);
    wallet[currencyId] = remaining;
    const selected = proposal.player.currencies.get(currencyId) || 0;
    if (selected > remaining) {
      if (remaining > 0) proposal.player.currencies.set(currencyId, remaining);
      else proposal.player.currencies.delete(currencyId);
    }
    setPlayerWallet(wallet);
    const region = String(current.settlement?.region || "중부").trim() || "중부";
    window.ProjectWWallet.refreshKnowledge(region);
    window.ProjectWAudio?.playEffect("coin");
    render();
    elements.dataStatus.textContent = `${silver.currency.name} 1개를 정보비로 지불하고 ${region} 화폐 시세를 갱신했습니다.`;
    elements.dataStatus.classList.remove("is-warning");
    notify(`${region}의 최신 화폐 시세를 확인했습니다.`);
  }

  function ensureSettlementMerchants({ settlement, definitions, currencies, catalogSource, worldData, worldTime }) {
    const currentTick = worldTimeTick(worldTime);
    let changed = false;
    const merchants = tradeFacilitiesForSettlement(settlement).map(facility => {
      const prepared = prepareMerchant({
        merchantKey: `${settlement.id}|${facility.id}`,
        settlement,
        facilityType: facility.type,
        definitions,
        currencies,
        catalogSource,
        worldData,
        worldTime,
        currentTick
      });
      changed = prepared.changed || changed;
      return prepared;
    });
    changed = catchUpMerchantRefreshes(merchants, currentTick) || changed;
    if (changed) persistState();
  }

  function tradeFacilitiesForSettlement(settlement) {
    const category = String(settlement?.category || "");
    const companyLimit = category === "대도시" ? 2 : category === "도시" ? 1 : 0;
    const companies = (settlement?.companyNames || [])
      .map(name => String(name || "").trim())
      .filter(Boolean)
      .slice(0, companyLimit)
      .map(name => ({ id: `company:${name}`, type: "상회", companyName: name }));
    return [...companies, ...(NON_COMPANY_TRADE_FACILITIES[category] || [])];
  }

  function ensureMerchant({ merchantKey, settlement, facilityType, definitions, currencies, catalogSource, worldData, worldTime }) {
    const currentTick = worldTimeTick(worldTime);
    const prepared = prepareMerchant({
      merchantKey,
      settlement,
      facilityType,
      definitions,
      currencies,
      catalogSource,
      worldData,
      worldTime,
      currentTick
    });
    const changed = catchUpMerchantRefreshes([prepared], currentTick) || prepared.changed;
    if (changed) persistState();
    return { merchant: prepared.merchant, unresolvedProducts: prepared.merchant.unresolvedProducts };
  }

  function prepareMerchant({ merchantKey, settlement, facilityType, definitions, currencies, catalogSource, worldData, worldTime, currentTick }) {
    const needsTimeMigration = Math.max(0, Math.trunc(Number(state.merchants[merchantKey]?.timeSchemaVersion) || 0)) < TRADE_TIME_SCHEMA_VERSION;
    let merchant = normalizeMerchant(state.merchants[merchantKey], currencies, settlement.category, facilityType);
    const didRepairIndestructibleStock = repairIndestructibleStock(merchant, definitions);
    const needsWalletMigration = merchant.walletSchemaVersion !== MERCHANT_WALLET_SCHEMA_VERSION
      || !merchant.wallet
      || typeof merchant.wallet !== "object";
    const needsStockMigration = merchant.stockSchemaVersion !== MERCHANT_STOCK_SCHEMA_VERSION;
    const sourceUpgraded = merchant.catalogSource !== "csv" && catalogSource === "csv";
    const cityEventRevision = facilityType === "환전상"
      ? 0
      : Math.max(0, Math.trunc(Number(getCityEventModifiers(settlement).revision) || 0));
    const cityEventChanged = merchant.cityEventRevision !== cityEventRevision;
    const isNewMerchant = merchant.refreshSerial === 0;
    const needsSnapshotReset = isNewMerchant || needsStockMigration || sourceUpgraded
      || cityEventChanged;
    let changed = didRepairIndestructibleStock || needsWalletMigration || needsTimeMigration;
    if (needsSnapshotReset) {
      const refreshSerial = merchant.refreshSerial + 1;
      const scheduleRng = seededRandom(`${merchantKey}|restock-schedule`);
      const refreshDay = isNewMerchant ? 1 : worldTime.day;
      const nextRefreshTick = isNewMerchant
        ? randomInteger(scheduleRng, 1, RESTOCK_INTERVAL_TICKS)
        : currentTick + randomInteger(scheduleRng, 1, RESTOCK_INTERVAL_TICKS);
      merchant = createMerchantSnapshot({
        merchantKey,
        merchant,
        settlement,
        facilityType,
        definitions,
        currencies,
        catalogSource,
        worldData,
        refreshSerial,
        refreshDay,
        nextRefreshTick,
        preserveWallet: cityEventChanged && !isNewMerchant && !needsWalletMigration
      });
      changed = true;
    } else if (needsWalletMigration) {
      const walletRng = seededRandom(`${merchantKey}|wallet|${merchant.refreshSerial || 0}`);
      merchant.wallet = createMerchantWallet(settlement, facilityType, currencies, walletRng);
      merchant.walletSchemaVersion = MERCHANT_WALLET_SCHEMA_VERSION;
    }
    if (ensureRegionalCampSupplies({ merchantKey, merchant, settlement, facilityType, definitions })) changed = true;
    state.merchants[merchantKey] = merchant;
    return {
      merchantKey,
      merchant,
      settlement,
      facilityType,
      definitions,
      currencies,
      catalogSource,
      worldData,
      changed
    };
  }

  function catchUpMerchantRefreshes(merchants, currentTick) {
    let changed = false;
    while (true) {
      const dueTick = merchants.reduce((earliest, entry) => {
        const tick = Math.max(1, Math.trunc(Number(entry.merchant.nextRefreshTick) || 1));
        return tick <= currentTick ? Math.min(earliest, tick) : earliest;
      }, Number.POSITIVE_INFINITY);
      if (!Number.isFinite(dueTick)) break;
      merchants.forEach(entry => {
        if (Math.max(1, Math.trunc(Number(entry.merchant.nextRefreshTick) || 1)) !== dueTick) return;
        if (entry.facilityType === "상회") {
          recoverCompanyInformationCapacity(companyNameFromMerchantKey(entry.merchantKey), dueTick);
        }
        entry.merchant = createMerchantSnapshot({
          merchantKey: entry.merchantKey,
          merchant: entry.merchant,
          settlement: entry.settlement,
          facilityType: entry.facilityType,
          definitions: entry.definitions,
          currencies: entry.currencies,
          catalogSource: entry.catalogSource,
          worldData: entry.worldData,
          refreshSerial: entry.merchant.refreshSerial + 1,
          refreshDay: worldDayForTick(dueTick),
          nextRefreshTick: dueTick + RESTOCK_INTERVAL_TICKS
        });
        state.merchants[entry.merchantKey] = entry.merchant;
        changed = true;
      });
    }
    return changed;
  }

  function createMerchantSnapshot({ merchantKey, merchant, settlement, facilityType, definitions, currencies, catalogSource, worldData, refreshSerial, refreshDay, nextRefreshTick, preserveWallet = false }) {
    const rng = seededRandom(`${merchantKey}|${refreshDay}|${refreshSerial}`);
    const walletRng = seededRandom(`${merchantKey}|wallet|${refreshSerial}`);
    const generated = generateMerchantStock({
      merchantKey,
      settlement,
      facilityType,
      definitions,
      worldData,
      refreshSerial,
      rng
    });
    return {
      ...merchant,
      stockLots: generated.stockLots,
      productionItemIds: generated.productionItemIds,
      logisticsItemIds: generated.logisticsItemIds,
      importItemIds: generated.importItemIds,
      unresolvedProducts: generated.unresolvedProducts,
      wallet: preserveWallet ? merchant.wallet : createMerchantWallet(settlement, facilityType, currencies, walletRng),
      walletSchemaVersion: MERCHANT_WALLET_SCHEMA_VERSION,
      stockSchemaVersion: MERCHANT_STOCK_SCHEMA_VERSION,
      regionalCampSupplyIds: generated.stockLots
        .filter(lot => lot.sourceType === "supply" && guaranteedCampSupplyIds(settlement, definitions).includes(lot.itemId))
        .map(lot => lot.itemId),
      catalogSource: catalogSource || "fallback",
      refreshSerial,
      nextRefreshTick,
      timeSchemaVersion: TRADE_TIME_SCHEMA_VERSION,
      createdAt: merchant.createdAt || new Date().toISOString(),
      refreshedAtDay: refreshDay,
      cityEventRevision: facilityType === "환전상"
        ? 0
        : Math.max(0, Math.trunc(Number(getCityEventModifiers(settlement).revision) || 0))
    };
  }

  function worldDayForTick(tick) {
    return Math.floor(Math.max(0, Math.trunc(Number(tick) || 0)) / TIME_PHASE_COUNT) + 1;
  }

  function repairIndestructibleStock(merchant, definitions) {
    const definitionsById = new Map(definitions.map(definition => [definition.id, definition]));
    let repaired = false;
    merchant.stockLots.forEach(lot => {
      const maximum = Number(definitionsById.get(lot.itemId)?.durability) || 0;
      if (maximum < INDESTRUCTIBLE_DURABILITY || Number(lot.durability) === maximum) return;
      lot.durability = maximum;
      repaired = true;
    });
    return repaired;
  }

  function normalizeMerchant(value, currencies, settlementCategory, facilityType) {
    const merchant = value && typeof value === "object" ? value : {};
    const storedTimeSchemaVersion = Math.max(0, Math.trunc(Number(merchant.timeSchemaVersion) || 0));
    const storedNextRefreshTick = Math.max(1, Math.trunc(Number(merchant.nextRefreshTick)
      || (((Math.max(1, Math.trunc(Number(merchant.nextRefreshDay) || 1)) - 1) * 4))));
    return {
      stockLots: Array.isArray(merchant.stockLots) ? merchant.stockLots.map(normalizeStockLot).filter(Boolean) : [],
      productionItemIds: Array.isArray(merchant.productionItemIds) ? merchant.productionItemIds.map(String) : [],
      logisticsItemIds: Array.isArray(merchant.logisticsItemIds) ? merchant.logisticsItemIds.map(String) : [],
      importItemIds: Array.isArray(merchant.importItemIds) ? merchant.importItemIds.map(String) : [],
      wallet: merchant.wallet && typeof merchant.wallet === "object" ? merchant.wallet : null,
      walletSchemaVersion: Math.max(0, Math.trunc(Number(merchant.walletSchemaVersion) || 0)),
      stockSchemaVersion: Math.max(0, Math.trunc(Number(merchant.stockSchemaVersion) || 0)),
      regionalCampSupplyIds: Array.isArray(merchant.regionalCampSupplyIds) ? merchant.regionalCampSupplyIds.map(String) : [],
      catalogSource: String(merchant.catalogSource || "fallback"),
      unresolvedProducts: Array.isArray(merchant.unresolvedProducts) ? merchant.unresolvedProducts.map(String) : [],
      nextRefreshTick: storedTimeSchemaVersion >= TRADE_TIME_SCHEMA_VERSION
        ? storedNextRefreshTick
        : convertLegacyRefreshTick(storedNextRefreshTick),
      timeSchemaVersion: TRADE_TIME_SCHEMA_VERSION,
      refreshSerial: Math.max(0, Math.trunc(Number(merchant.refreshSerial) || 0)),
      createdAt: String(merchant.createdAt || ""),
      refreshedAtDay: Math.max(0, Math.trunc(Number(merchant.refreshedAtDay) || 0)),
      cityEventRevision: Math.max(0, Math.trunc(Number(merchant.cityEventRevision) || 0))
    };
  }

  function convertLegacyRefreshTick(tick) {
    const legacyDayIndex = Math.floor(Math.max(0, tick) / 4);
    const legacyPhaseIndex = Math.max(0, tick) % 4;
    return (legacyDayIndex * TIME_PHASE_COUNT) + legacyPhaseIndex;
  }

  function normalizeStockLot(lot) {
    if (!lot || !lot.itemId || !lot.lotId) return null;
    return {
      lotId: String(lot.lotId),
      itemId: String(lot.itemId),
      quantity: Math.max(0, Math.trunc(Number(lot.quantity) || 0)),
      baseQuantity: Math.max(1, Math.trunc(Number(lot.baseQuantity) || Number(lot.quantity) || 1)),
      quality: QUALITY_NAMES.includes(lot.quality) ? lot.quality : "통상품질",
      qualityRoll: clamp(Number.isFinite(Number(lot.qualityRoll)) ? Number(lot.qualityRoll) : .5, 0, 1),
      originId: String(lot.originId || "MAP_NODE_0036"),
      originName: String(lot.originName || "파르네"),
      originDistance: Number.isFinite(Number(lot.originDistance))
        ? Math.max(0, Number(lot.originDistance))
        : null,
      originProductKind: ["specialty", "famous"].includes(String(lot.originProductKind || ""))
        ? String(lot.originProductKind)
        : "",
      sourceType: ["production", "logistics", "import", "resale", "supply", "event"].includes(lot.sourceType) ? lot.sourceType : "import",
      importMarkup: clamp(Number(lot.importMarkup) || 0, 0, 15),
      durability: Number.isFinite(Number(lot.durability)) ? Number(lot.durability) : null,
      displayOrder: Number(lot.displayOrder) || 0
    };
  }

  function ensureRegionalCampSupplies({ merchantKey, merchant, settlement, facilityType, definitions }) {
    if (!["시장", "교역소", "상회"].includes(facilityType)) return false;
    let changed = false;
    const cityEventStock = getCityEventModifiers(settlement).stockBySubcategory || {};
    guaranteedCampSupplyIds(settlement, definitions).forEach(itemId => {
      if (merchant.regionalCampSupplyIds.includes(itemId)) return;
      const definition = definitions.find(item => item.id === itemId);
      if (!definition) return;
      // 기존 저장의 다른 재고·지갑은 보존하고, 새 지역 물품을 한 번만 입고한다.
      // 재고가 0이어도 입고 기록을 유지해 재입장으로 다시 채워지지 않게 한다.
      if (!merchant.stockLots.some(lot => lot.itemId === itemId && lot.sourceType === "supply")) {
        const lot = createStockLot({
          lotId: `${merchantKey}|${merchant.refreshSerial}|regional-camp|${itemId}`,
          definition,
          facilityType,
          sourceType: "supply",
          quantity: Math.max(0, 10 + (Number(cityEventStock[definition.subcategory]) || 0)),
          baseQuantity: 10,
          origin: settlement,
          destination: settlement,
          rng: seededRandom(`${merchantKey}|${merchant.refreshSerial}|regional-camp|${itemId}`)
        });
        lot.displayOrder = Math.max(-1, ...merchant.stockLots.map(entry => entry.displayOrder)) + 1;
        merchant.stockLots.push(lot);
      }
      merchant.regionalCampSupplyIds.push(itemId);
      merchant.unresolvedProducts = merchant.unresolvedProducts.filter(id => id !== itemId);
      changed = true;
    });
    return changed;
  }

  function guaranteedCampSupplyIds(settlement, definitions) {
    const rarityLimit = CAMP_SUPPLY_RARITY_LIMIT.get(String(settlement?.category || ""));
    if (!rarityLimit) return [];
    return definitions
      .filter(definition => definition.category === "야영 물품")
      .filter(definition => Math.max(1, Number(definition.rarity) || 1) <= rarityLimit)
      .filter(definition => {
        const requiredRegion = REGIONAL_CAMP_SUPPLY_REGIONS.get(definition.id);
        return !requiredRegion || requiredRegion === settlement.region;
      })
      .map(definition => definition.id);
  }

  function generateMerchantStock({ merchantKey, settlement, facilityType, definitions, worldData, refreshSerial, rng }) {
    const isGateStall = facilityType === "좌판";
    const isCurrencyExchange = facilityType === "환전상";
    const definitionsByName = new Map();
    definitions.forEach(definition => {
      const name = String(definition.name1 || "").trim();
      if (name && !definitionsByName.has(name)) definitionsByName.set(name, definition);
    });
    const unresolvedProducts = [];
    const localProductionNames = isGateStall || isCurrencyExchange
      ? []
      : [...new Set((settlement.productionNames || []).map(name => String(name || "").trim()).filter(Boolean))];
    const productionNameSet = new Set(localProductionNames);
    const localLogisticsNames = isGateStall || isCurrencyExchange
      ? []
      : [...new Set((settlement.logisticsNames || [])
        .map(name => String(name || "").trim())
        .filter(name => name && !productionNameSet.has(name)))];
    const logisticsNameSet = new Set(localLogisticsNames);
    const resolveNamedDefinitions = (names, label) => names.flatMap(name => {
      const definition = definitionsByName.get(name);
      if (!definition) {
        unresolvedProducts.push(`${label}: ${name}`);
        return [];
      }
      return [definition];
    });
    const resolvedProduction = resolveNamedDefinitions(localProductionNames, "생산물 미확인");
    const resolvedLogistics = resolveNamedDefinitions(localLogisticsNames, "고정물류 미확인");
    const priorityProductionNames = new Set([
      ...(settlement.specialtyNames || []),
      ...(settlement.famousProductNames || [])
    ]);
    const displayedProduction = selectDisplayedLocalDefinitions(
      resolvedProduction,
      LOCAL_GOODS_DISPLAY_RATIO,
      rng,
      priorityProductionNames
    );
    const displayedLogistics = selectDisplayedLocalDefinitions(
      resolvedLogistics,
      LOCAL_GOODS_DISPLAY_RATIO,
      rng
    );
    const sharedImports = settlementImportFrequency(settlement.id, merchantKey);
    const importCount = isCurrencyExchange
      ? 0
      : isGateStall
        ? randomInteger(rng, 8, 12)
        : (IMPORT_COUNTS.get(facilityType) || 0);
    const importCandidates = definitions.filter(definition => {
      if (productionNameSet.has(definition.name1) || logisticsNameSet.has(definition.name1)) return false;
      return producingNodes(definition, worldData.nodes).length > 0;
    });
    const selectedImports = weightedSampleUnique(importCandidates, importCount, definition => {
      const producers = producingNodes(definition, worldData.nodes);
      const nearestDistance = Math.min(...producers.map(node => safeDistance(settlement.id, node.id)));
      const connectionWeight = Number.isFinite(nearestDistance) ? 1 + (18 / Math.max(1, nearestDistance)) : 1;
      const sharedWeight = 1 + ((sharedImports.get(definition.id) || 0) * 1.4);
      return connectionWeight * sharedWeight;
    }, rng);
    const specialties = new Set(settlement.specialtyNames || []);
    const cityEventStock = getCityEventModifiers(settlement).stockBySubcategory || {};
    const stockLots = [];
    const appendLot = (definition, sourceType, quantity, origin, baseQuantity = quantity) => {
      if (!definition) return;
      const originProductKind = originProductKindAtNode(origin, definition);
      const lot = createStockLot({
        lotId: `${merchantKey}|${refreshSerial}|${String(stockLots.length + 1).padStart(3, "0")}`,
        definition,
        facilityType,
        sourceType,
        quantity,
        baseQuantity,
        origin,
        destination: settlement,
        specialty: sourceType === "production" && specialties.has(definition.name1),
        originProductKind,
        rng
      });
      stockLots.push(lot);
    };
    displayedProduction.forEach(definition => {
      const baseQuantity = productionStock(definition, settlement.category, facilityType);
      const eventAdjustment = Number(cityEventStock[definition.subcategory]) || 0;
      appendLot(definition, "production", variedStock(baseQuantity, settlement.category, rng) + eventAdjustment, settlement, baseQuantity);
    });
    displayedLogistics.forEach(definition => {
      const origin = chooseFixedLogisticsOrigin(definition, settlement.id, worldData.nodes, refreshSerial);
      const baseQuantity = fixedLogisticsStock(definition, settlement.category, facilityType);
      const eventAdjustment = Number(cityEventStock[definition.subcategory]) || 0;
      const regularQuantity = Math.max(1, variedStock(baseQuantity, settlement.category, rng));
      appendLot(definition, "logistics", regularQuantity + eventAdjustment, origin, baseQuantity);
    });
    selectedImports.forEach(definition => {
      const baseQuantity = productionStock(definition, settlement.category, facilityType);
      const eventAdjustment = Number(cityEventStock[definition.subcategory]) || 0;
      appendLot(definition, "import", variedStock(baseQuantity, settlement.category, rng) + eventAdjustment, chooseOriginNode(definition, settlement.id, worldData.nodes, rng), baseQuantity);
    });
    const supplyItemIds = isGateStall || isCurrencyExchange ? [] : [
      ...(ADDITIONAL_ITEMS[settlement.category] || []),
      ...guaranteedCampSupplyIds(settlement, definitions)
    ];
    supplyItemIds.forEach(itemId => {
      if (stockLots.some(lot => lot.itemId === itemId)) return;
      const definition = definitions.find(item => item.id === itemId);
      if (!definition) {
        unresolvedProducts.push(itemId);
        return;
      }
      appendLot(
        definition,
        "supply",
        Math.max(0, 10 + (Number(cityEventStock[definition.subcategory]) || 0)),
        settlement,
        10
      );
    });
    const pendingRestockEffects = (state.restockEffects || []).filter(effect => effect.merchantKey === merchantKey);
    pendingRestockEffects.forEach(effect => {
      const matchingLots = stockLots.filter(lot => {
        const definition = definitions.find(entry => entry.id === lot.itemId);
        return lot.sourceType === effect.sourceType && definition?.subcategory === effect.subcategory;
      });
      if (matchingLots.length) {
        const targetLot = matchingLots.sort((left, right) => right.quantity - left.quantity)[0];
        targetLot.quantity = Math.max(0, targetLot.quantity + effect.amount);
      } else if (effect.amount > 0 || effect.guarantee) {
        const candidates = effect.sourceType === "production" ? resolvedProduction : importCandidates;
        const definition = candidates.find(entry => entry.subcategory === effect.subcategory);
        if (definition) appendLot(
          definition,
          effect.sourceType,
          Math.max(1, effect.amount),
          effect.sourceType === "production" ? settlement : chooseOriginNode(definition, settlement.id, worldData.nodes, rng),
          productionStock(definition, settlement.category, facilityType)
        );
      }
    });
    if (pendingRestockEffects.length) {
      const consumedIds = new Set(pendingRestockEffects.map(effect => effect.id));
      state.restockEffects = (state.restockEffects || []).filter(effect => !consumedIds.has(effect.id));
    }
    shuffled(stockLots, rng).forEach((lot, index) => { lot.displayOrder = index; });
    return {
      stockLots,
      productionItemIds: stockLots.filter(lot => lot.sourceType === "production").map(lot => lot.itemId),
      logisticsItemIds: stockLots.filter(lot => lot.sourceType === "logistics").map(lot => lot.itemId),
      importItemIds: stockLots.filter(lot => lot.sourceType === "import").map(lot => lot.itemId),
      unresolvedProducts
    };
  }

  function createStockLot({ lotId, definition, facilityType, sourceType, quantity, baseQuantity, origin, destination, specialty, originProductKind, rng }) {
    const nonTradeItem = isNonTradeCategory(definition.category);
    const quality = nonTradeItem ? "" : rollQuality(facilityType, specialty, rng);
    const mappedOriginDistance = safeDistance(origin?.id, destination?.id);
    const originDistance = Number.isFinite(Number(origin?.tradeDistance))
      ? Math.max(0, Number(origin.tradeDistance))
      : (Number.isFinite(mappedOriginDistance) ? Math.max(0, mappedOriginDistance) : 0);
    return {
      lotId,
      itemId: definition.id,
      quantity: Math.max(0, Math.trunc(Number(quantity) || 0)),
      baseQuantity: Math.max(1, Math.trunc(Number(baseQuantity) || Number(quantity) || 1)),
      quality,
      qualityRoll: nonTradeItem ? .5 : rng(),
      originId: nonTradeItem ? "" : String(origin?.id || "MAP_NODE_0036"),
      originName: nonTradeItem ? "" : String(origin?.name || "파르네"),
      originDistance: nonTradeItem ? null : originDistance,
      originProductKind: nonTradeItem ? "" : String(originProductKind || ""),
      sourceType,
      importMarkup: ["logistics", "import", "resale"].includes(sourceType) ? randomRange(rng, 5, 15) : 0,
      durability: rollMerchantDurability(
        definition.durability,
        facilityType,
        sourceType,
        rng,
        originDistance
      ),
      displayOrder: 0
    };
  }

  function rollMerchantDurability(maximumDurability, facilityType, sourceType, rng, importDistance = 0) {
    const maximum = Math.max(0, Number(maximumDurability) || 0);
    if (maximum <= 0) return 0;
    if (maximum >= INDESTRUCTIBLE_DURABILITY) return maximum;
    if (sourceType === "production") {
      if (rng() < PRODUCTION_CLEARANCE_CHANCE) {
        const conditionRatio = randomRange(
          rng,
          PRODUCTION_CLEARANCE_CONDITION_MIN,
          PRODUCTION_CLEARANCE_CONDITION_MAX
        );
        return Math.max(0, Math.round(maximum * conditionRatio * 10) / 10);
      }
      const maximumDamage = PRODUCTION_DURABILITY_DAMAGE_MAX.get(facilityType) ?? 20;
      const centeredRoll = (rng() + rng()) / 2;
      const damagePercent = centeredRoll * maximumDamage;
      return Math.max(0, Math.round(maximum * (1 - (damagePercent / 100)) * 10) / 10);
    }
    const maximumDamage = DURABILITY_DAMAGE_MAX.get(facilityType) || 0;
    const centeredRoll = (rng() + rng()) / 2;
    const damagePercent = centeredRoll * maximumDamage;
    const facilityCondition = Math.max(0, 1 - (damagePercent / 100));
    const distanceDamagePercent = rollImportDistanceDamage(sourceType, importDistance, rng);
    const distanceCondition = Math.max(0, 1 - (distanceDamagePercent / 100));
    return Math.max(0, Math.round(maximum * facilityCondition * distanceCondition * 10) / 10);
  }

  function rollImportDistanceDamage(sourceType, distance, rng) {
    if (!["import", "logistics"].includes(String(sourceType || ""))) return 0;
    const measuredDistance = Math.max(0, Number(distance) || 0);
    if (measuredDistance <= 0) return 0;
    let range;
    if (measuredDistance <= 14) range = [0, 10];
    else if (measuredDistance <= 29) range = [10, 25];
    else if (measuredDistance <= 49) range = [25, 40];
    else range = [35, 50];
    const centeredRoll = (rng() + rng()) / 2;
    const rolledDamage = range[0] + ((range[1] - range[0]) * centeredRoll);
    return sourceType === "logistics" ? rolledDamage * .5 : rolledDamage;
  }

  function rollQuality(facilityType, specialty, rng) {
    const weights = [...(QUALITY_WEIGHTS[facilityType] || QUALITY_WEIGHTS.시장)];
    if (specialty) {
      weights[0] = Math.max(0, weights[0] - 10);
      weights[1] = Math.max(0, weights[1] - 10);
      weights[2] += 10;
      weights[3] += 10;
    }
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let roll = rng() * total;
    for (let index = 0; index < weights.length; index += 1) {
      roll -= weights[index];
      if (roll <= 0) return QUALITY_NAMES[index];
    }
    return QUALITY_NAMES.at(-1);
  }

  function settlementImportFrequency(settlementId, excludedMerchantKey) {
    const frequency = new Map();
    Object.entries(state.merchants).forEach(([key, merchant]) => {
      if (key === excludedMerchantKey || !key.startsWith(`${settlementId}|`)) return;
      (merchant.importItemIds || []).forEach(itemId => frequency.set(itemId, (frequency.get(itemId) || 0) + 1));
    });
    return frequency;
  }

  function producingNodes(definition, nodes) {
    return (nodes || []).filter(node => (node.productionNames || []).includes(definition.name1));
  }

  function selectDisplayedLocalDefinitions(definitions, ratio, rng, priorityNames = new Set()) {
    if (!definitions.length) return [];
    const targetCount = Math.max(1, Math.round(definitions.length * ratio));
    const priority = shuffled(
      definitions.filter(definition => priorityNames.has(definition.name1)),
      rng
    );
    const ordinary = shuffled(
      definitions.filter(definition => !priorityNames.has(definition.name1)),
      rng
    );
    return [...priority, ...ordinary].slice(0, Math.max(targetCount, priority.length));
  }

  function originProductKindAtNode(node, definition) {
    const productName = String(definition?.name1 || "").trim();
    if (!node || !productName) return "";
    if ((node.famousProductNames || []).includes(productName)) return "famous";
    if ((node.specialtyNames || []).includes(productName)) return "specialty";
    return "";
  }

  function originProductKindFor(item, definition) {
    if (!item || isNonTradeCategory(definition?.category)) return "";
    const originId = String(item.originId || "");
    const origin = current?.worldData?.nodes?.find(node => node.id === originId);
    return originProductKindAtNode(origin, definition)
      || (["specialty", "famous"].includes(String(item.originProductKind || "")) ? String(item.originProductKind) : "");
  }

  function qualifiesForOriginPurchaseBonus(lot, definition) {
    return originProductKindFor(lot, definition) === "specialty"
      && lot?.sourceType === "production"
      && String(lot.originId || "") === String(current?.settlement?.id || "");
  }

  function createOriginProductBadge(kind) {
    const normalized = String(kind || "");
    if (!["specialty", "famous"].includes(normalized)) return null;
    const badge = document.createElement("span");
    badge.className = `origin-product-badge is-${normalized}`;
    badge.textContent = normalized === "famous" ? "명산품" : "특산물";
    return badge;
  }

  function chooseOriginNode(definition, destinationId, nodes, rng) {
    const producers = producingNodes(definition, nodes);
    if (!producers.length) return (nodes || []).find(node => node.id === destinationId) || { id: destinationId, name: "현지" };
    return weightedChoice(producers, node => {
      const distance = safeDistance(destinationId, node.id);
      return Number.isFinite(distance) ? 1 + (24 / Math.max(1, distance)) : 1;
    }, rng) || producers[0];
  }

  function chooseFixedLogisticsOrigin(definition, destinationId, nodes, refreshSerial = 0) {
    const producers = producingNodes(definition, nodes).filter(node => node.id !== destinationId);
    if (!producers.length) return FOREIGN_FIXED_LOGISTICS_ORIGIN;
    const normalizedName = String(definition?.name1 || "").replaceAll(" ", "");
    const mixedNishurOrigin = MIXED_NISHUR_LOGISTICS_NAMES.has(normalizedName);
    const rng = seededRandom(`${destinationId}|${definition.id}|fixed-logistics-origin${mixedNishurOrigin ? `|${refreshSerial}` : ""}`);
    if (mixedNishurOrigin && rng() < .5) return FOREIGN_FIXED_LOGISTICS_ORIGIN;
    return weightedChoice(producers, node => {
      const distance = safeDistance(destinationId, node.id);
      return Number.isFinite(distance) ? 1 + (24 / Math.max(1, distance)) : 1;
    }, rng) || producers[0];
  }

  function safeDistance(fromId, toId) {
    return window.ProjectWMapView.getShortestPlacementDistance(fromId, toId);
  }

  function weightedSampleUnique(items, count, weightFn, rng) {
    const pool = [...items];
    const selected = [];
    while (pool.length && selected.length < count) {
      const choice = weightedChoice(pool, weightFn, rng);
      if (!choice) break;
      selected.push(choice);
      pool.splice(pool.indexOf(choice), 1);
    }
    return selected;
  }

  function weightedChoice(items, weightFn, rng) {
    const weighted = items.map(item => ({ item, weight: Math.max(.001, Number(weightFn(item)) || 0) }));
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = rng() * total;
    for (const entry of weighted) {
      roll -= entry.weight;
      if (roll <= 0) return entry.item;
    }
    return weighted.at(-1)?.item || null;
  }

  function productionStock(definition, settlementCategory, facilityType) {
    const tier = Math.min(4, Math.max(1, Math.trunc(Number(definition.rarity) || 1)));
    return Math.max(1,
      (TIER_STOCK.get(tier) || 1)
      + (SIZE_STOCK_MODIFIER.get(settlementCategory) || 0)
      + (FACILITY_STOCK_MODIFIER.get(facilityType) || 0));
  }

  function fixedLogisticsStock(definition, settlementCategory, facilityType) {
    return Math.max(1,
      productionStock(definition, settlementCategory, facilityType)
      + (FIXED_LOGISTICS_SIZE_MODIFIER.get(settlementCategory) || 0)
      + (FIXED_LOGISTICS_FACILITY_MODIFIER.get(facilityType) || 0));
  }

  function variedStock(baseQuantity, settlementCategory, rng) {
    const table = STOCK_VARIATION_WEIGHTS[settlementCategory] || STOCK_VARIATION_WEIGHTS.도시;
    const variation = weightedChoice(table, entry => entry[1], rng)?.[0] || 0;
    return Math.max(0, Math.trunc(Number(baseQuantity) || 0) + variation);
  }

  function createMerchantWallet(settlement, facilityType, currencies, rng = Math.random) {
    const settlementCategory = String(settlement?.category || "");
    const settlementRegion = String(settlement?.region || "").trim();
    const wealth = Math.max(1,
      (SIZE_WEALTH.get(settlementCategory) || 1)
      * (FACILITY_WEALTH.get(facilityType) || 1));
    const wallet = Object.fromEntries(currencies.map(currency => [currency.id, 0]));
    const candidates = currencies.filter(currency => merchantCurrencyBaseline(currency.type, wealth) > 0);
    const countRange = MERCHANT_CURRENCY_COUNTS[facilityType] || MERCHANT_CURRENCY_COUNTS.시장;
    const targetCount = Math.min(candidates.length, randomInteger(rng, countRange[0], countRange[1]));
    const selected = weightedSampleUnique(candidates, targetCount, currency => {
      const circulation = currencyCirculation(currency);
      if (isCurrencyMainRegion(currency, settlementRegion)) return 3 + circulation;
      return circulation * (FOREIGN_CURRENCY_AFFINITY[facilityType] || .7);
    }, rng);
    selected.forEach(currency => {
      const baseline = merchantCurrencyBaseline(currency.type, wealth);
      const local = isCurrencyMainRegion(currency, settlementRegion);
      const circulation = currencyCirculation(currency);
      const quantityFactor = local
        ? randomRange(rng, .72, 1.28)
        : circulation * randomRange(rng, .38, .82);
      wallet[currency.id] = Math.max(1, Math.min(
        Math.ceil(baseline * 1.3),
        Math.round(baseline * quantityFactor)
      ));
    });
    return wallet;
  }

  function merchantCurrencyBaseline(type, wealth) {
    return type === "금화"
        ? Math.floor(wealth / 2)
        : type === "은화"
          ? Math.floor(8 * wealth)
          : Math.floor(24 * wealth);
  }

  function currencyCirculation(currency) {
    const value = Number(currency?.circulation);
    return Math.max(0, Math.min(1, (Number.isFinite(value) && value >= 0 ? value : 100) / 100));
  }

  function isCurrencyMainRegion(currency, settlementRegion) {
    if (!settlementRegion) return false;
    return String(currency?.region || "")
      .split(/[\/,·\s]+/)
      .map(value => value.trim())
      .filter(Boolean)
      .includes(settlementRegion);
  }

  function createProposal() {
    return {
      player: { goods: new Map(), currencies: new Map(), information: new Map(), notes: new Map() },
      merchant: { goods: new Map(), currencies: new Map(), information: new Map(), notes: new Map() }
    };
  }

  function clearLists() {
    [elements.merchantItems, elements.playerItems, elements.playerOffer, elements.merchantOffer,
      elements.playerCurrencies, elements.merchantCurrencies].forEach(element => element?.replaceChildren());
  }

  function render() {
    if (!current || elements.modal.hidden) return;
    syncNahanaEventGiftLot();
    elements.title.textContent = current.facilityLabel;
    elements.location.textContent = `${current.settlement.name} · ${current.settlement.category}`;
    if (elements.companyIcon) {
      const iconSource = current.companyAssetId ? getAssetUrl(current.companyAssetId) : "";
      elements.companyIcon.hidden = !iconSource;
      elements.companyIcon.alt = iconSource ? `${current.companyName} 문장` : "";
      if (iconSource) elements.companyIcon.src = iconSource;
      else elements.companyIcon.removeAttribute("src");
    }
    current.worldTime = normalizeWorldTime(getWorldTime());
    const connected = current.goodsSource === "csv" && current.currencySource === "csv" && current.mapSource === "csv";
    const unresolved = current.unresolvedProducts.length;
    elements.dataStatus.textContent = current.currencyOnly
      ? current.currencySource === "csv"
        ? ""
        : "화폐 CSV를 불러오지 못해 확인된 임시 데이터로 환전합니다."
      : connected
        ? unresolved
          ? `상품 또는 고정물류 원산지 ${unresolved}건을 연결하지 못했습니다.`
          : ""
        : "일부 CSV를 불러오지 못했습니다. 가치 계산에 사용할 수 있는 데이터만 반영합니다.";
    elements.dataStatus.hidden = current.currencyOnly
      ? current.currencySource === "csv"
      : connected && unresolved === 0;
    elements.dataStatus.classList.toggle("is-warning", current.currencyOnly
      ? current.currencySource !== "csv"
      : !connected || unresolved > 0);
    if (elements.restock) {
      const remainingTicks = Math.max(0, current.merchant.nextRefreshTick - worldTimeTick(current.worldTime));
      const days = Math.floor(remainingTicks / TIME_PHASE_COUNT);
      const ticks = remainingTicks % TIME_PHASE_COUNT;
      const refreshTarget = current.currencyOnly ? "화폐" : "상품";
      elements.restock.textContent = remainingTicks === 0
        ? `${refreshTarget} 갱신: 다음 방문 시`
        : `${refreshTarget} 갱신까지 ${days ? `${days}일 ` : ""}${ticks ? `${ticks}타임` : ""}`.trim();
    }
    if (elements.travelFilter) {
      const active = merchantTravelFilterMode === "only";
      elements.travelFilter.classList.toggle("is-active", active);
      elements.travelFilter.setAttribute("aria-pressed", String(active));
    }
    if (elements.travelHideFilter) {
      const active = merchantTravelFilterMode === "hide";
      elements.travelHideFilter.classList.toggle("is-active", active);
      elements.travelHideFilter.setAttribute("aria-pressed", String(active));
    }
    if (current.facilityType === "시장") {
      for (const tradeKey of [...proposal.player.goods.keys()]) {
        const item = window.ProjectWCargo.getInventoryItems().find(entry => entry.instanceId === playerInstanceId(tradeKey));
        if (isMarketPurchaseBlocked("player", item?.definition)) proposal.player.goods.delete(tradeKey);
      }
    }
    renderCatalogs();
    renderOffers();
  }

  function syncNahanaEventGiftLot() {
    if (!current) return;
    current.merchant.stockLots = current.merchant.stockLots.filter(lot => lot.itemId !== NAHANA_EVENT_GIFT_ITEM_ID);
    current.definitionsById.delete(NAHANA_EVENT_GIFT_ITEM_ID);
    const gift = window.ProjectWNahanaEvents?.getMarketGift?.({
      settlementId: current.settlement?.id || "",
      facilityType: current.facilityType
    });
    if (!gift || current.facilityType !== "시장") return;
    const definition = {
      id: NAHANA_EVENT_GIFT_ITEM_ID,
      displayName: String(gift.name || "깃털 자수 손수건"),
      name1: String(gift.name || "깃털 자수 손수건"),
      name2: String(gift.name || "깃털 자수 손수건"),
      name3: String(gift.name || "깃털 자수 손수건"),
      category: "기념품",
      subcategory: "수공예품",
      rarity: 1,
      slotCount: 0,
      weight: 0,
      durability: INDESTRUCTIBLE_DURABILITY,
      baseValue: Math.max(1, Math.round(Number(gift.value) || 40)),
      description: "돌아올 곳을 기원하는 깃털 자수가 놓인 깨끗한 손수건입니다."
    };
    current.definitionsById.set(definition.id, definition);
    current.merchant.stockLots.unshift({
      lotId: `${current.merchantKey}|nahana-event-gift`,
      itemId: definition.id,
      quantity: 1,
      baseQuantity: 1,
      quality: "",
      qualityRoll: .5,
      originId: current.settlement?.id || "",
      originName: current.settlement?.name || "현재 거점",
      sourceType: "event",
      importMarkup: 0,
      durability: INDESTRUCTIBLE_DURABILITY,
      displayOrder: -1000
    });
  }

  function renderCatalogs() {
    const informationEligible = Boolean(current && ["상회", "좌판"].includes(current.facilityType));
    const notesEligible = billNotesEligible();
    elements.playerCatalogTabs.forEach(button => {
      const mode = button.dataset.tradePlayerCatalog;
      const available = mode === "information" ? informationEligible : mode === "notes" ? notesEligible : true;
      button.hidden = !available;
      button.disabled = !available;
      const active = mode === playerCatalogMode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (current.currencyOnly) {
      elements.playerItems.replaceChildren();
      elements.merchantItems.replaceChildren();
      return;
    }
    const capacity = window.ProjectWCargo.getCapacitySummary();
    if (elements.playerCatalogTitle) elements.playerCatalogTitle.textContent = playerCatalogMode === "information"
      ? "내 정보"
      : playerCatalogMode === "notes" ? "내 어음" : "내 화물";
    elements.playerCapacity.textContent = playerCatalogMode === "information"
      ? `판매 가능한 정보 ${tradableInformationCards().length}장`
      : playerCatalogMode === "notes"
        ? `액면가 합계 ${formatNumber(window.ProjectWBillNotes.totalValue(getPlayerBillNotes()))}`
        : `남은 ${capacity.freeSlots} / ${capacity.totalSlots}칸`;
    const merchantEntries = current.merchant.stockLots
      .filter(lot => lot.quantity > 0)
      .map(lot => {
        const definition = current.definitionsById.get(lot.itemId);
        return { ...lot, definition, actualValue: definition ? merchantSellValuation(lot, definition).value : 0 };
      })
      .filter(entry => entry.definition)
      .filter(entry => merchantTravelFilterMode === "only"
        ? isTravelCategory(entry.definition.category)
        : merchantTravelFilterMode === "hide"
          ? !isTravelCategory(entry.definition.category)
          : true)
      .sort((left, right) => left.displayOrder - right.displayOrder);
    elements.merchantItems.replaceChildren(...(merchantEntries.length
      ? merchantEntries.map(entry => createCatalogItem("merchant", entry))
      : [emptyMessage("판매 중인 상품이 없습니다.")]));

    if (playerCatalogMode === "information" && informationEligible) {
      const cards = tradableInformationCards();
      elements.playerItems.replaceChildren(...(cards.length
        ? cards.map(createInformationCatalogItem)
        : [emptyMessage("이 상인에게 판매할 수 있는 정보가 없습니다.")]));
    } else if (playerCatalogMode === "notes" && notesEligible) {
      const notes = window.ProjectWBillNotes.entries(getPlayerBillNotes()).filter(entry => entry.quantity > 0);
      elements.playerItems.replaceChildren(...(notes.length
        ? notes.map(createBillNoteCatalogItem)
        : [emptyMessage("보유 중인 어음이 없습니다.")]));
    } else {
      const playerEntries = createPlayerCatalogEntries();
      elements.playerItems.replaceChildren(...(playerEntries.length
        ? playerEntries.map(entry => createCatalogItem("player", entry))
        : [emptyMessage("판매할 화물이 없습니다.")]));
    }
  }

  function switchPlayerCatalog(event) {
    if (!current || current.currencyOnly) return;
    const mode = event.currentTarget?.dataset.tradePlayerCatalog;
    if (!['goods', 'information', 'notes'].includes(mode)) return;
    if (mode === "information" && !["상회", "좌판"].includes(current.facilityType)) return;
    if (mode === "notes" && !billNotesEligible()) return;
    playerCatalogMode = mode;
    renderCatalogs();
  }

  function billNotesEligible() {
    return Boolean(current
      && current.facilityType === "상회"
      && ["도시", "대도시"].includes(String(current.settlement?.category || "")));
  }

  function createBillNoteCatalogItem(entry) {
    const selected = proposal.player.notes.get(entry.id) || 0;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "trade-bill-note-item";
    button.dataset.tradeAction = "adjust";
    button.dataset.tradeOwner = "player";
    button.dataset.tradeKind = "notes";
    button.dataset.tradeKey = entry.id;
    button.dataset.tradeDelta = "1";
    button.disabled = selected >= entry.quantity;
    const seal = document.createElement("span");
    seal.className = "trade-bill-note-seal";
    seal.textContent = "어음";
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = `${formatNumber(entry.denomination)} 가치 어음`;
    const detail = document.createElement("small");
    detail.textContent = `남은 ${formatNumber(entry.quantity - selected)}장 · 칸과 무게 없음`;
    copy.append(name, detail);
    const value = document.createElement("b");
    value.textContent = `액면가 ${formatNumber(entry.denomination)}`;
    button.append(seal, copy, value);
    return button;
  }

  function createInformationCatalogItem(card) {
    const selected = proposal.player.information.get(card.id) || 0;
    const capacityOffset = informationSelectionOffset(card.id);
    const capacity = companyInformationCapacityProfile(capacityOffset);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "trade-information-item";
    button.dataset.tradeAction = "adjust";
    button.dataset.tradeOwner = "player";
    button.dataset.tradeKind = "information";
    button.dataset.tradeKey = card.id;
    button.dataset.tradeDelta = "1";
    button.disabled = selected >= 1;
    const copy = document.createElement("div");
    const title = document.createElement("h4");
    window.ProjectWInformation.appendRichText(title, card.title);
    const meta = document.createElement("div");
    meta.className = "trade-information-meta";
    [card.gradeLabel, card.trustLabel, card.ageLabel].forEach(label => {
      const badge = document.createElement("span");
      badge.textContent = label;
      meta.append(badge);
    });
    copy.append(title, meta);
    const value = document.createElement("div");
    value.className = "trade-information-value";
    const weightPercent = informationPurchaseWeightPercent(card);
    const price = document.createElement("strong");
    price.textContent = `매입 가치 약 ${formatNumber(informationSaleValue(card, capacityOffset))}`;
    value.append(price);
    if (capacity.enabled) {
      const capacityLabel = document.createElement("small");
      capacityLabel.textContent = `정보 수용량 ${formatNumber(capacity.current)} / ${formatNumber(capacity.maximum)}`;
      value.append(capacityLabel);
    }
    value.title = current?.facilityType === "상회"
      ? `이 점포의 ${informationTypeLabel(card)} 정보 매입 가중치 ${formatNumber(weightPercent)}% · 수용량 보정 ${formatNumber(capacity.valuePercent)}%`
      : current?.settlement?.category === "관문"
        ? `이 관문의 ${informationTypeLabel(card)} 정보 매입 가중치 ${formatNumber(weightPercent)}%`
        : "";
    const content = document.createElement("p");
    window.ProjectWInformation.appendRichText(content, card.content);
    button.append(copy, value, content);
    return button;
  }

  function tradableInformationCards() {
    if (!current) return [];
    return window.ProjectWInformation?.getTradeCards?.(current.merchantKey, current.companyName || "") || [];
  }

  function informationTypeKey(card) {
    return String(card?.special || card?.category || card?.subcategory || "general").trim() || "general";
  }

  function informationTypeLabel(card) {
    return String(card?.category || card?.subcategory || "일반").trim() || "일반";
  }

  function companyNameFromMerchantKey(merchantKey) {
    const match = String(merchantKey || "").match(/\|company:(.+)$/);
    return match ? String(match[1] || "").trim() : "";
  }

  function initialCompanyInformationCapacity(companyName) {
    const rng = seededRandom(`company-information-capacity|${String(companyName || "").trim()}`);
    return randomInteger(rng, COMPANY_INFORMATION_CAPACITY_MINIMUM, COMPANY_INFORMATION_CAPACITY_MAXIMUM);
  }

  function ensureCompanyInformationCapacity(companyName, referenceTick = 0) {
    const name = String(companyName || "").trim();
    if (!name) return { record: null, changed: false };
    if (!state.companyInformationCapacity || typeof state.companyInformationCapacity !== "object") {
      state.companyInformationCapacity = {};
    }
    const stored = state.companyInformationCapacity[name];
    const storedCurrent = Number(stored?.current);
    const storedMaximum = Number(stored?.maximum);
    const storedRecoveryTick = Number(stored?.lastRecoveryTick);
    const maximum = clamp(
      Number.isFinite(storedMaximum) ? Math.trunc(storedMaximum) : initialCompanyInformationCapacity(name),
      COMPANY_INFORMATION_CAPACITY_MINIMUM,
      COMPANY_INFORMATION_CAPACITY_MAXIMUM
    );
    const normalized = {
      current: clamp(
        Number.isFinite(storedCurrent) ? Math.trunc(storedCurrent) : maximum,
        0,
        maximum
      ),
      maximum,
      lastRecoveryTick: Math.max(
        0,
        Math.trunc(Number.isFinite(storedRecoveryTick) ? storedRecoveryTick : (Number(referenceTick) || 0))
      )
    };
    const changed = !stored
      || Number(stored.current) !== normalized.current
      || Number(stored.maximum) !== normalized.maximum
      || Number(stored.lastRecoveryTick) !== normalized.lastRecoveryTick;
    state.companyInformationCapacity[name] = normalized;
    return { record: normalized, changed };
  }

  function recoverCompanyInformationCapacity(companyName, refreshTick) {
    const tick = Math.max(0, Math.trunc(Number(refreshTick) || 0));
    const ensured = ensureCompanyInformationCapacity(companyName, tick);
    const record = ensured.record;
    if (!record) return false;
    if (record.lastRecoveryTick <= 0) {
      record.lastRecoveryTick = tick;
      return true;
    }
    const recoveryCount = Math.floor(Math.max(0, tick - record.lastRecoveryTick) / RESTOCK_INTERVAL_TICKS);
    if (recoveryCount <= 0) return ensured.changed;
    const before = record.current;
    record.current = Math.min(
      record.maximum,
      record.current + (recoveryCount * COMPANY_INFORMATION_CAPACITY_RECOVERY)
    );
    record.lastRecoveryTick += recoveryCount * RESTOCK_INTERVAL_TICKS;
    return ensured.changed || record.current !== before || recoveryCount > 0;
  }

  function consumeCompanyInformationCapacity(companyName, quantity) {
    const count = Math.max(0, Math.trunc(Number(quantity) || 0));
    if (count <= 0) return false;
    const ensured = ensureCompanyInformationCapacity(companyName, worldTimeTick(current?.worldTime));
    const record = ensured.record;
    if (!record) return false;
    const before = record.current;
    record.current = Math.max(0, record.current - count);
    return ensured.changed || record.current !== before;
  }

  function informationSelectionOffset(cardId = "") {
    let offset = 0;
    for (const [selectedId, quantity] of proposal.player.information) {
      if (String(selectedId) === String(cardId)) return offset;
      offset += Math.max(0, Math.trunc(Number(quantity) || 0));
    }
    return offset;
  }

  function companyInformationCapacityProfile(offset = 0) {
    if (!current || current.facilityType !== "상회" || !current.companyName) {
      return { enabled: false, current: 0, maximum: 0, valuePercent: 100 };
    }
    const ensured = ensureCompanyInformationCapacity(current?.companyName, worldTimeTick(current?.worldTime));
    const maximum = Math.max(COMPANY_INFORMATION_CAPACITY_MINIMUM, Number(ensured.record?.maximum) || COMPANY_INFORMATION_CAPACITY_MAXIMUM);
    const currentCapacity = Math.max(0, (ensured.record?.current ?? maximum)
      - Math.max(0, Math.trunc(Number(offset) || 0)));
    const valuePercent = COMPANY_INFORMATION_CAPACITY_MINIMUM_PERCENT
      + ((100 - COMPANY_INFORMATION_CAPACITY_MINIMUM_PERCENT) * currentCapacity / maximum);
    return {
      enabled: true,
      current: currentCapacity,
      maximum,
      valuePercent
    };
  }

  function informationPurchaseWeightPercent(card) {
    if (!current) return 100;
    const companyBuyer = current.facilityType === "상회";
    const gateBuyer = current.settlement?.category === "관문";
    if (!companyBuyer && !gateBuyer) return 100;
    const rng = seededRandom(`${current.merchantKey}|information-purchase-weight|${current.merchant?.refreshSerial || 0}|${informationTypeKey(card)}`);
    return companyBuyer
      ? randomInteger(rng, COMPANY_INFORMATION_WEIGHT_MINIMUM, COMPANY_INFORMATION_WEIGHT_MAXIMUM)
      : randomInteger(rng, GATE_INFORMATION_WEIGHT_MINIMUM, GATE_INFORMATION_WEIGHT_MAXIMUM);
  }

  function informationSaleValue(card, capacityOffset = 0) {
    const baseValue = Math.max(0, Number(card?.value) || 0);
    const capacity = companyInformationCapacityProfile(capacityOffset);
    return Math.max(baseValue > 0 ? 1 : 0, Math.round(
      baseValue * informationPurchaseWeightPercent(card) / 100 * capacity.valuePercent / 100
    ));
  }

  function toggleTravelFilter() {
    if (!current) return;
    merchantTravelFilterMode = merchantTravelFilterMode === "only" ? "all" : "only";
    render();
  }

  function toggleTravelHideFilter() {
    if (!current) return;
    merchantTravelFilterMode = merchantTravelFilterMode === "hide" ? "all" : "hide";
    render();
  }

  function sourceTypeLabel(sourceType) {
    return ({ production: "생산물", logistics: "고정물류", import: "수입품", resale: "상인 재매입품", supply: "지역 공급품", event: "특별한 선물" })[sourceType] || "분류 없음";
  }

  function createPlayerCatalogEntries() {
    return window.ProjectWCargo.getInventoryItems().flatMap(item => {
      const valuation = playerSellValuation(item, item.definition);
      if (isStackedTradeItem(item)) {
        return [{
          ...item,
          definition: item.definition,
          itemId: item.itemId,
          instanceId: item.instanceId,
          tradeKey: item.instanceId,
          quantity: item.quantity,
          actualValue: valuation.value,
          tradeBreakdown: valuation.breakdown
        }];
      }
      return Array.from({ length: Math.max(1, item.quantity) }, (_, index) => ({
        ...item,
        definition: item.definition,
        itemId: item.itemId,
        instanceId: item.instanceId,
        tradeKey: `${item.instanceId}::${index + 1}`,
        quantity: 1,
        unitOnly: true,
        actualValue: valuation.value,
        tradeBreakdown: valuation.breakdown
      }));
    });
  }

  function isStackedTradeItem(item) {
    return Math.max(1, Math.trunc(Number(item?.definition?.maxStack) || 1)) > 1
      || Math.max(1, Math.trunc(Number(item?.quantity) || 1)) > 1;
  }

  function createCatalogItem(owner, entry) {
    const key = owner === "merchant" ? entry.lotId : entry.tradeKey || entry.instanceId;
    const selected = owner === "merchant"
      ? proposal.merchant.goods.get(entry.lotId) || 0
      : proposal.player.goods.get(key) || 0;
    const eventGift = entry.itemId === NAHANA_EVENT_GIFT_ITEM_ID;
    const marketPurchaseBlocked = isMarketPurchaseBlocked(owner, entry.definition);
    const slotCount = eventGift ? 0 : Math.max(1, Math.trunc(Number(entry.definition.slotCount) || 1));
    const knowledge = knowledgeProfile(entry.definition, {
      ...entry,
      qualityValueDirection: owner === "merchant" ? "merchantSell" : "playerSell"
    });
    const categoryClass = tradeCategoryClass(entry.definition.category);
    const stack = document.createElement("div");
    stack.className = `trade-item-stack ${categoryClass} ${slotCount > 1 ? "is-multi-slot" : ""}`;
    stack.dataset.tradeItemId = String(entry.itemId || "");
    if (owner === "merchant") stack.dataset.tradeLotId = String(entry.lotId || "");
    stack.classList.toggle("is-nahana-event-gift", eventGift);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "trade-item-card";
    setCatalogAction(button, owner, key);
    const unavailable = marketPurchaseBlocked || selected >= entry.quantity;
    stack.classList.toggle("is-unavailable", unavailable);
    stack.classList.toggle("is-market-purchase-blocked", marketPurchaseBlocked);
    button.setAttribute("aria-disabled", String(unavailable));
    const category = document.createElement("span");
    category.className = "trade-item-category";
    category.textContent = entry.definition.category;
    const name = document.createElement("strong");
    name.textContent = knowledge.name;
    const meta = document.createElement("small");
    const rarity = document.createElement("span");
    rarity.className = "trade-item-rarity";
    rarity.textContent = `희귀 등급 ${formatNumber(entry.definition.rarity)}`;
    const quality = document.createElement("span");
    quality.className = `trade-item-quality trade-quality-${qualityClassName(entry.quality)}`;
    quality.textContent = knowledge.qualityText;
    const metaText = document.createElement("span");
    metaText.textContent = `${knowledge.showOrigin ? `${originDisplayName(entry.originName)} · ` : ""}${slotCount}칸 · 무게 ${formatNumber(entry.definition.weight)}`;
    const durability = document.createElement("span");
    const maximumDurability = Math.max(0, Number(entry.definition.durability) || 0);
    const currentDurability = Number.isFinite(Number(entry.durability)) ? Number(entry.durability) : maximumDurability;
    durability.className = `trade-item-durability ${durabilityClassName(currentDurability, maximumDurability)}`;
    durability.textContent = `열화 ${formatDurability(currentDurability, maximumDurability)}`;
    if (knowledge.showRarity) meta.append(rarity);
    if (knowledge.showQuality) meta.append(quality);
    const originProductBadge = createOriginProductBadge(originProductKindFor(entry, entry.definition));
    if (knowledge.showOriginProduct && originProductBadge) meta.append(originProductBadge);
    if (marketPurchaseBlocked) {
      const restriction = document.createElement("span");
      restriction.className = "trade-market-purchase-restriction";
      restriction.textContent = "시장 매입 불가";
      meta.append(restriction);
    }
    meta.append(metaText);
    if (knowledge.showDurability) meta.append(durability);
    const value = document.createElement("span");
    value.className = "trade-item-value";
    const valuePrimary = document.createElement("span");
    valuePrimary.className = "trade-item-value-primary";
    const valueLabel = document.createElement("small");
    valueLabel.textContent = marketPurchaseBlocked ? "현재 시장" : owner === "player" ? "판매 가치" : "구매 가치";
    const valueAmount = document.createElement("strong");
    valueAmount.textContent = marketPurchaseBlocked ? "매입 불가" : formatNumber(entry.actualValue);
    valuePrimary.append(valueLabel, valueAmount);
    if (marketPurchaseBlocked) {
      value.classList.add("is-market-purchase-blocked");
      value.append(valuePrimary);
    } else if (owner === "player") {
      const purchaseValue = Math.max(0, Math.round(Number(entry.purchaseValue) || Number(entry.definition.baseValue) || 0));
      const saleValue = Math.max(0, Math.round(Number(entry.actualValue) || 0));
      const differencePercent = purchaseValue > 0 ? Math.round((saleValue - purchaseValue) / purchaseValue * 100) : 0;
      const purchase = document.createElement("span");
      const purchaseLabel = document.createElement("small");
      const purchaseAmount = document.createElement("strong");
      const profit = document.createElement("span");
      const profitLabel = document.createElement("small");
      const profitRate = document.createElement("strong");
      value.classList.add("has-purchase-comparison");
      purchase.className = "trade-item-value-metric is-purchase";
      purchaseLabel.textContent = "구매액";
      purchaseAmount.textContent = formatNumber(purchaseValue);
      purchase.append(purchaseLabel, purchaseAmount);
      profit.className = `trade-item-value-metric trade-item-profit ${differencePercent > 0 ? "is-profit" : "is-loss"}`;
      profitLabel.textContent = "손익률";
      profitRate.textContent = `${signedValue(differencePercent)}%`;
      profit.append(profitLabel, profitRate);
      value.append(purchase, profit, valuePrimary);
    } else value.append(valuePrimary);
    const amount = document.createElement("em");
    amount.className = "trade-item-amount";
    const amountLabel = document.createElement("span");
    amountLabel.textContent = marketPurchaseBlocked ? "전문 취급품" : owner === "merchant" ? "재고" : "보유";
    const amountValue = document.createElement("strong");
    amountValue.textContent = marketPurchaseBlocked ? "거부" : `× ${formatNumber(Math.max(0, entry.quantity - selected))}`;
    const selectedCopy = document.createElement("small");
    selectedCopy.textContent = selected > 0 ? `${selected} 선택` : "";
    amount.append(amountLabel, amountValue, selectedCopy);
    button.append(category, name, meta, value, amount);
    stack.append(button);
    for (let index = 1; index < slotCount; index += 1) {
      const tail = document.createElement("span");
      tail.className = "trade-item-tail";
      tail.setAttribute("aria-hidden", "true");
      stack.append(tail);
    }
    if (eventGift) {
      button.title = "나하나에게 선물할 수 있는 특별한 손수건입니다.";
    } else attachGoodsTooltip(stack, owner, entry, 1);
    return stack;
  }

  function setCatalogAction(element, owner, key) {
    element.dataset.tradeAction = "adjust";
    element.dataset.tradeOwner = owner;
    element.dataset.tradeKind = "goods";
    element.dataset.tradeKey = key;
    element.dataset.tradeDelta = "1";
  }

  function tradeCategoryClass(category) {
    const normalized = String(category || "").replaceAll(" ", "");
    if (normalized === "여행물품" || normalized === "야영물품") return "is-travel-supply";
    if (normalized === "여행식량" || normalized === "야영식량"
      || normalized === "여행음식" || normalized === "야영음식") return "is-travel-food";
    return "";
  }

  function isTravelCategory(category) {
    const normalized = String(category || "").replaceAll(" ", "");
    return normalized === "여행물품" || normalized === "여행식량" || normalized === "야영물품"
      || normalized === "야영식량" || normalized === "여행음식" || normalized === "야영음식";
  }

  function isNonTradeCategory(category) {
    if (window.ProjectWMerchantPath?.isExcludedCategory) {
      return window.ProjectWMerchantPath.isExcludedCategory(category);
    }
    return isTravelCategory(category);
  }

  function isMarketPurchaseBlocked(owner, definition) {
    return owner === "player"
      && current?.facilityType === "시장"
      && Boolean(definition?.marketPurchaseRestricted);
  }

  function settlementDemandScore(settlement, subcategory) {
    const score = clamp(Number(settlement?.demandScores?.[subcategory]) || 0, 0, 50);
    if (String(subcategory || "").trim() !== "병구류") return score;
    const cap = PEACETIME_WEAPON_DEMAND_CAP.get(String(settlement?.category || "").trim());
    return Number.isFinite(cap) ? Math.min(score, cap) : score;
  }

  function durabilityClassName(currentValue, maximumValue) {
    const maximum = Number(maximumValue) || 0;
    if (maximum >= INDESTRUCTIBLE_DURABILITY) return "is-indestructible";
    const ratio = maximum > 0 ? (Number(currentValue) || 0) / maximum * 100 : 100;
    if (ratio >= 75) return "is-healthy";
    if (ratio >= 50) return "is-caution";
    if (ratio > 25) return "is-warning";
    return "is-danger";
  }

  function qualityClassName(quality) {
    return ({ 저품질: "low", 통상품질: "common", 고품질: "high", 명품: "masterpiece" })[quality] || "common";
  }

  function playerInstanceId(tradeKey) {
    return String(tradeKey || "").split("::", 1)[0];
  }

  function merchantLot(lotId) {
    return current?.merchant?.stockLots?.find(lot => lot.lotId === lotId) || null;
  }

  function tradeEntry(owner, key) {
    if (!current) return null;
    if (owner === "merchant") {
      const lot = merchantLot(key);
      const definition = lot ? current.definitionsById.get(lot.itemId) : null;
      if (!lot || !definition) return null;
      const valuation = merchantSellValuation(lot, definition);
      return { ...lot, definition, actualValue: valuation.value, tradeBreakdown: valuation.breakdown };
    }
    const item = window.ProjectWCargo.getInventoryItems().find(entry => entry.instanceId === playerInstanceId(key));
    if (!item) return null;
    const valuation = playerSellValuation(item, item.definition);
    return { ...item, actualValue: valuation.value, tradeBreakdown: valuation.breakdown };
  }

  function merchantSellValuation(lot, definition) {
    const baseValue = Number(definition.baseValue) || 0;
    if (lot?.itemId === NAHANA_EVENT_GIFT_ITEM_ID) {
      return {
        value: Math.max(1, Math.round(baseValue)),
        baseValue,
        qualityAdjustment: 0,
        importMarkup: 0,
        facilityAdjustment: 0,
        relationshipAdjustment: 0,
        durabilityCurrent: INDESTRUCTIBLE_DURABILITY,
        durabilityMaximum: INDESTRUCTIBLE_DURABILITY,
        durabilityPercent: 100,
        totalAdjustment: 0,
        preDurabilityValue: baseValue,
        breakdown: ["이벤트 선물 · 고정 가치"]
      };
    }
    const nonTradeItem = isNonTradeCategory(definition.category);
    const qualityAdjustment = nonTradeItem ? 0 : qualityAdjustmentFor(lot, QUALITY_SELL_RANGES);
    const importMarkup = ["logistics", "import", "resale"].includes(lot.sourceType)
      ? clamp(Number(lot.importMarkup) || 0, 5, 15)
      : 0;
    const market = regionalMarketValuation(lot, definition, "merchantSell");
    const facilityAdjustment = nonTradeItem ? 0 : (FACILITY_SELL_SPREAD.get(current?.facilityType) || 0);
    const relationshipAdjustment = companyRelationshipAdjustment("merchantSell");
    const durabilityValue = durabilityValueRatio(lot, definition);
    const preDurabilityValue = baseValue
      * Math.max(.1, 1 + (qualityAdjustment / 100))
      * market.multiplier
      * (1 + (importMarkup / 100))
      * Math.max(.1, 1 + (facilityAdjustment / 100))
      * Math.max(.1, 1 + (relationshipAdjustment / 100));
    const unroundedValue = preDurabilityValue
      * durabilityValue.ratio;
    return {
      value: Math.max(0, Math.round(unroundedValue)),
      baseValue,
      qualityAdjustment,
      importMarkup,
      ...market,
      facilityAdjustment,
      relationshipAdjustment,
      durabilityCurrent: durabilityValue.current,
      durabilityMaximum: durabilityValue.maximum,
      durabilityPercent: durabilityValue.percent,
      totalAdjustment: baseValue > 0 ? ((unroundedValue / baseValue) - 1) * 100 : 0,
      preDurabilityValue,
      breakdown: [
        ...(!nonTradeItem ? [`품질 ${signedPercent(qualityAdjustment)}`] : []),
        ...(!nonTradeItem ? market.breakdown : []),
        ...(importMarkup ? [`수입 마진 ${signedPercent(importMarkup)}`] : []),
        ...(facilityAdjustment ? [`${current.facilityType} 판매 가산 ${signedPercent(facilityAdjustment)}`] : []),
        ...(relationshipAdjustment ? [`상회 관계 ${signedPercent(relationshipAdjustment)}`] : []),
        `열화 가치 ${formatNumber(durabilityValue.percent)}%`
      ]
    };
  }

  function playerSellValuation(item, definition) {
    if (!current) return { value: Number(definition?.baseValue) || 0, breakdown: [] };
    const nonTradeItem = isNonTradeCategory(definition.category);
    const qualityAdjustment = nonTradeItem ? 0 : qualityAdjustmentFor(item, QUALITY_BUY_RANGES);
    const market = regionalMarketValuation(item, definition, "playerSell");
    const identicalItemAdjustment = nonTradeItem ? 0 : identicalStockAdjustment(definition.id);
    const facilityAdjustment = nonTradeItem ? 0 : -(FACILITY_BUY_DISCOUNT.get(current?.facilityType) || 0);
    const sameMerchantResaleAdjustment = nonTradeItem
      ? 0
      : -(SAME_MERCHANT_RESALE_PENALTY * (Number(market.sameMerchantShare) || 0));
    const relationshipAdjustment = companyRelationshipAdjustment("playerSell");
    const durabilityValue = durabilityValueRatio(item, definition);
    const baseValue = Number(definition.baseValue) || 0;
    const productKind = originProductKindFor(item, definition);
    const originProductSaleAdjustment = productKind === "famous"
      || (productKind === "specialty" && Boolean(item.originPurchaseBonus))
      ? 10
      : 0;
    const identicalItemMultiplier = Math.max(.5, 1 - (identicalItemAdjustment / 100));
    const relationshipMultiplier = Math.max(.1, 1 + (relationshipAdjustment / 100));
    const unroundedValue = baseValue
      * Math.max(.1, 1 + (qualityAdjustment / 100))
      * market.multiplier
      * Math.max(.1, 1 + (facilityAdjustment / 100))
      * Math.max(.1, 1 + (sameMerchantResaleAdjustment / 100))
      * identicalItemMultiplier
      * relationshipMultiplier
      * (1 + (originProductSaleAdjustment / 100))
      * durabilityValue.ratio;
    const totalAdjustment = baseValue > 0 ? ((unroundedValue / baseValue) - 1) * 100 : 0;
    return {
      value: Math.max(0, Math.round(unroundedValue)),
      baseValue,
      qualityAdjustment,
      ...market,
      identicalItemAdjustment,
      facilityAdjustment,
      sameMerchantResaleAdjustment,
      relationshipAdjustment,
      originProductKind: productKind,
      originProductSaleAdjustment,
      durabilityCurrent: durabilityValue.current,
      durabilityMaximum: durabilityValue.maximum,
      durabilityPercent: durabilityValue.percent,
      totalAdjustment,
      breakdown: [
        ...(!nonTradeItem ? [`품질 ${signedPercent(qualityAdjustment)}`, ...market.breakdown] : []),
        ...(facilityAdjustment ? [`${current.facilityType} 매입 차감 ${signedPercent(facilityAdjustment)}`] : []),
        ...(sameMerchantResaleAdjustment ? [`같은 상점 되팔기 ${signedPercent(sameMerchantResaleAdjustment)}`] : []),
        ...(identicalItemAdjustment ? [`동일 상품 재고 감가 -${formatNumber(identicalItemAdjustment)}% · 지역 전체 재고와 거래안 반영`] : []),
        ...(relationshipAdjustment ? [`상회 관계 ${signedPercent(relationshipAdjustment)}`] : []),
        ...(originProductSaleAdjustment ? [`${productKind === "famous" ? "명산품" : "특산물 원산지 구입"} ${signedPercent(originProductSaleAdjustment)}`] : []),
        `열화 가치 ${formatNumber(durabilityValue.percent)}%`,
        `총 보정 ${signedPercent(totalAdjustment)}`
      ]
    };
  }

  function merchantExperienceForCargoSale(item, quantity, saleValue, bargainAdjustmentPercent = 0) {
    const soldQuantity = Math.max(0, Math.trunc(Number(quantity) || 0));
    if (!item || soldQuantity <= 0) return 0;
    const purchaseUnitValue = Math.max(0, Number(item.purchaseValue) || Number(item.definition?.baseValue) || 0);
    const saleUnitValue = Math.max(0, Math.floor(
      (Number(saleValue) || 0) * (1 + (Math.max(0, Number(bargainAdjustmentPercent) || 0) / 100))
    ));
    const baseExperience = Math.max(0, saleUnitValue - purchaseUnitValue) * soldQuantity;
    return baseExperience * (originProductKindFor(item, item.definition) === "famous" ? 1.33 : 1);
  }

  function tradeReviewFactors(valuation, direction, bargainAdjustmentPercent = 0) {
    const durabilityAdjustment = Number(valuation?.durabilityPercent) - 100;
    const factors = [
      ["품질", valuation?.qualityAdjustment],
      ["원산지 거리", valuation?.distanceAdjustment],
      ["운송 위험", valuation?.transportRiskAdjustment],
      ["현지 수요", valuation?.demandAdjustment],
      ["주간 공급", valuation?.weeklySupplyAdjustment],
      ["상품군 재고", valuation?.subcategorySupplyAdjustment],
      ["도시 소식", valuation?.cityEventPriceAdjustment],
      ["정보 효과", valuation?.informationPriceAdjustment],
      ["수입 마진", valuation?.importMarkup],
      ["시설 거래 조건", valuation?.facilityAdjustment],
      ["같은 상점 되팔기", valuation?.sameMerchantResaleAdjustment],
      ["동일 상품 재고", -(Number(valuation?.identicalItemAdjustment) || 0)],
      ["상회 관계", valuation?.relationshipAdjustment],
      ["특산·명산품", valuation?.originProductSaleAdjustment],
      ["열화 내구도", Number.isFinite(durabilityAdjustment) ? durabilityAdjustment : 0],
      ["흥정 추가 인정", bargainAdjustmentPercent]
    ];
    return factors
      .map(([label, value]) => ({ label, value: Number(value) || 0 }))
      .filter(factor => Math.abs(factor.value) > .0001);
  }

  function companyRelationshipAdjustment(direction) {
    if (!current || current.facilityType !== "상회" || !current.companyName) return 0;
    const profile = window.ProjectWMerchantPath?.getCompanyProfile(current.companyName);
    if (!profile) return 0;
    const range = direction === "playerSell" ? profile.playerSellRange : profile.merchantSellRange;
    if (!Array.isArray(range) || range.length < 2 || (Number(range[0]) === 0 && Number(range[1]) === 0)) return 0;
    const rng = seededRandom(`${current.merchantKey}|relationship|${current.merchant.refreshSerial}|${profile.stageIndex}|${direction}`);
    return randomRange(rng, Number(range[0]) || 0, Number(range[1]) || 0);
  }

  function durabilityPriceRatio(conditionRatio) {
    const condition = clamp(Number(conditionRatio) || 0, 0, 1);
    if (condition >= .3) return .6 + (.4 * ((condition - .3) / .7));
    return .6 * Math.pow(condition / .3, 2);
  }

  function durabilityValueRatio(item, definition) {
    const maximum = Math.max(0, Number(definition?.durability) || 0);
    if (maximum <= 0 || maximum >= INDESTRUCTIBLE_DURABILITY) {
      return { current: maximum, maximum, ratio: 1, percent: 100, indestructible: maximum >= INDESTRUCTIBLE_DURABILITY };
    }
    const current = clamp(Number.isFinite(Number(item?.durability)) ? Number(item.durability) : maximum, 0, maximum);
    const ratio = durabilityPriceRatio(current / maximum);
    return { current, maximum, ratio, percent: ratio * 100, indestructible: false };
  }

  function durabilityValueLabel(valuation) {
    if (Number(valuation?.durabilityMaximum) >= INDESTRUCTIBLE_DURABILITY) return "열화 면역 · 가치 100%";
    return `${formatDurability(valuation?.durabilityCurrent, valuation?.durabilityMaximum)} · 가치 ${formatNumber(valuation?.durabilityPercent)}%`;
  }

  function qualityAdjustmentFor(item, ranges) {
    const range = ranges[item?.quality] || ranges.통상품질;
    const roll = clamp(Number.isFinite(Number(item?.qualityRoll)) ? Number(item.qualityRoll) : .5, 0, 1);
    return range[0] + ((range[1] - range[0]) * roll);
  }

  function distanceValueAdjustment(distance) {
    if (distance <= 0) return LOCAL_DISTANCE_ADJUSTMENT;
    if (distance <= 14) return distance;
    if (distance <= 29) return 14 + ((distance - 14) * 1.25);
    if (distance <= 49) return 32.75 + ((distance - 29) * 1.75);
    return Math.min(100, 67.75 + ((distance - 49) * 2));
  }

  function merchantImportDistanceAdjustment(distance) {
    const transportDistanceValue = Math.max(0, distanceValueAdjustment(distance));
    return Math.min(MERCHANT_IMPORT_DISTANCE_MAX, transportDistanceValue * MERCHANT_IMPORT_DISTANCE_FACTOR);
  }

  function distanceBand(distance) {
    if (distance <= 0) return "현지 상품";
    if (distance <= 14) return "단거리";
    if (distance <= 29) return "중거리";
    if (distance <= 49) return "장거리";
    return "초장거리";
  }

  function regionalMarketValuation(item, definition, pricingDirection = "playerSell") {
    const nonTradeItem = isNonTradeCategory(definition?.category);
    if (nonTradeItem || !current) return {
      distance: 0,
      distanceAdjustment: 0,
      distanceValueFactor: 1,
      transportRiskAdjustment: 0,
      transportDistance: 0,
      externalOrigin: false,
      sameSettlementShare: 0,
      sameMerchantShare: 0,
      demandScore: 0,
      demandAdjustment: 0,
      weeklySupplyAdjustment: 0,
      subcategorySupplyAdjustment: 0,
      cityEventPriceAdjustment: 0,
      informationPriceAdjustment: 0,
      naturalMarketAdjustment: 0,
      marketIndex: 0,
      regionalAdjustment: 0,
      multiplier: 1,
      breakdown: []
    };
    const merchantSell = pricingDirection === "merchantSell";
    const fixedLogistics = item?.sourceType === "logistics";
    const imported = fixedLogistics || item?.sourceType === "import" || item?.sourceType === "resale";
    const purchaseContext = merchantSell ? emptyCargoPurchaseContext() : cargoPurchaseContext(item);
    const transportDistance = merchantSell ? 0 : purchaseContext.transportDistance;
    const externalOrigin = String(item?.originId || "") === FOREIGN_FIXED_LOGISTICS_ORIGIN.id;
    const storedOriginDistance = Number(item?.originDistance);
    const externalOriginDistance = externalOrigin
      ? (Number.isFinite(storedOriginDistance) && storedOriginDistance > 0
        ? storedOriginDistance
        : FOREIGN_FIXED_LOGISTICS_ORIGIN.tradeDistance)
      : 0;
    const measuredDistance = safeDistance(item?.originId, current.settlement.id);
    const distance = externalOrigin
      ? externalOriginDistance + transportDistance
      : (Number.isFinite(measuredDistance) ? measuredDistance : 0);
    const fullDistanceAdjustment = distanceValueAdjustment(distance);
    const localImportDistanceAdjustment = merchantImportDistanceAdjustment(distance);
    const externalOriginAdjustment = externalOrigin
      ? merchantImportDistanceAdjustment(externalOriginDistance) * FIXED_LOGISTICS_DISTANCE_FACTOR
      : 0;
    const externalCarriedAdjustment = externalOrigin && transportDistance > 0
      ? Math.max(0, distanceValueAdjustment(transportDistance))
      : 0;
    const rawDistanceAdjustment = externalOrigin
      ? externalOriginAdjustment + (merchantSell ? 0 : externalCarriedAdjustment)
      : merchantSell
        ? (fixedLogistics
          ? localImportDistanceAdjustment * FIXED_LOGISTICS_DISTANCE_FACTOR
          : (imported ? localImportDistanceAdjustment : 0))
        : (fullDistanceAdjustment * purchaseContext.nonLocalShare)
          + (fullDistanceAdjustment * purchaseContext.localProductionShare)
          + (localImportDistanceAdjustment * FIXED_LOGISTICS_DISTANCE_FACTOR * purchaseContext.localLogisticsShare)
          + (localImportDistanceAdjustment * purchaseContext.localImportShare);
    const distanceValueFactor = !merchantSell
      && rawDistanceAdjustment > 0
      && Number(definition?.durability) >= INDESTRUCTIBLE_DURABILITY
      ? INDESTRUCTIBLE_DISTANCE_VALUE_FACTOR
      : 1;
    const distanceAdjustment = rawDistanceAdjustment * distanceValueFactor;
    const appliedExternalOriginAdjustment = externalOriginAdjustment * distanceValueFactor;
    const appliedExternalCarriedAdjustment = externalCarriedAdjustment * distanceValueFactor;
    const transportRiskAdjustment = merchantSell
      ? 0
      : transportRiskPremium(transportDistance, definition);
    const demandScore = settlementDemandScore(current.settlement, definition.subcategory);
    const demandAdjustment = Math.min(30, demandScore * 3);
    const weeklySupplyAdjustment = regionalWeeklySupplyAdjustment(definition.subcategory);
    const subcategorySupplyAdjustment = subcategorySupplyPressure(definition.subcategory);
    const cityEventPriceAdjustment = Number(
      getCityEventModifiers(current.settlement).priceBySubcategory?.[definition.subcategory]
    ) || 0;
    const informationPriceAdjustment = marketInformationAdjustment(current.settlement.id, definition.subcategory, current.worldTime?.day);
    const naturalMarketAdjustment = clamp(demandAdjustment + weeklySupplyAdjustment + subcategorySupplyAdjustment, -60, 60);
    const marketIndex = clamp(naturalMarketAdjustment + cityEventPriceAdjustment + informationPriceAdjustment, -85, 85);
    const regionalAdjustment = distanceAdjustment + transportRiskAdjustment + marketIndex;
    return {
      distance,
      distanceAdjustment,
      distanceValueFactor,
      transportRiskAdjustment,
      transportDistance,
      externalOrigin,
      sameSettlementShare: purchaseContext.sameSettlementShare,
      sameMerchantShare: purchaseContext.sameMerchantShare,
      demandScore,
      demandAdjustment,
      weeklySupplyAdjustment,
      subcategorySupplyAdjustment,
      cityEventPriceAdjustment,
      informationPriceAdjustment,
      naturalMarketAdjustment,
      marketIndex,
      regionalAdjustment,
      multiplier: Math.max(.25, 1 + (regionalAdjustment / 100)),
      breakdown: [
        externalOrigin
          ? (merchantSell || transportDistance <= 0
            ? `니슈르 해외 운송 ??? 거리 · 고정물류 할증 ${signedPercent(appliedExternalOriginAdjustment)}`
            : `니슈르 수입 ??? 거리 ${signedPercent(appliedExternalOriginAdjustment)} · 직접 운송 ${formatNumber(transportDistance)} 거리 ${signedPercent(appliedExternalCarriedAdjustment)}`)
          : merchantSell
            ? (fixedLogistics
              ? `고정물류 거리 ${distance}칸 · 상시 유통 할증 ${signedPercent(distanceAdjustment)}`
              : imported
              ? `수입 거리 ${distance}칸 · 물류 할증 ${signedPercent(distanceAdjustment)}`
              : "현지 생산품 · 수입 거리 할증 없음")
            : (purchaseContext.sameSettlementShare > 0
              ? (purchaseContext.sameSettlementShare >= .999
                ? `같은 거점 재판매 · 현지 유통 거리 보정 ${signedPercent(distanceAdjustment)}`
                : `같은 거점 구매분 ${formatNumber(purchaseContext.sameSettlementShare * 100)}% · 거리 보정 ${signedPercent(distanceAdjustment)}`)
              : `거리 ${distance}칸 · ${distanceBand(distance)} ${signedPercent(distanceAdjustment)}`),
        ...(distanceValueFactor < 1 ? ["열화 면역 상품 · 운송거리 보너스 50% 적용"] : []),
        ...(transportRiskAdjustment ? [`실제 운반 ${formatNumber(transportDistance)} 거리 · 운송 위험 프리미엄 ${signedPercent(transportRiskAdjustment)}`] : []),
        `지역 수요 ${formatNumber(demandScore)}점 × 3% · ${signedPercent(demandAdjustment)}`,
        ...(weeklySupplyAdjustment ? [`주간 공급 물가 ${signedPercent(weeklySupplyAdjustment)}`] : []),
        `재고 비율 시세 ${signedPercent(subcategorySupplyAdjustment)}`,
        `자연 시세 지수 ${signedPercent(naturalMarketAdjustment)} · 상한 ±60%`,
        ...(cityEventPriceAdjustment ? [`도시 이벤트 시세 ${signedPercent(cityEventPriceAdjustment)}`] : []),
        ...(informationPriceAdjustment ? [`정보 기회 시세 ${signedPercent(informationPriceAdjustment)}`] : []),
        `최종 시세 지수 ${signedPercent(marketIndex)} · 상한 ±85%`,
        `지역 보정 합계 ${signedPercent(regionalAdjustment)}`
      ]
    };
  }

  function emptyCargoPurchaseContext() {
    return {
      sameSettlementShare: 0,
      sameMerchantShare: 0,
      localProductionShare: 0,
      localLogisticsShare: 0,
      localImportShare: 0,
      nonLocalShare: 1,
      transportDistance: 0
    };
  }

  function cargoPurchaseContext(item) {
    const totalQuantity = Math.max(1, Math.trunc(Number(item?.quantity) || 1));
    const settlementId = String(current?.settlement?.id || "");
    const merchantKey = String(current?.merchantKey || "");
    const legacyJourneys = new Map((window.ProjectWMerchantPath?.getItemNotebook?.(item?.itemId)?.journeys || [])
      .map(journey => [String(journey?.id || ""), journey]));
    let remaining = totalQuantity;
    let sameSettlementQuantity = 0;
    let sameMerchantQuantity = 0;
    let localProductionQuantity = 0;
    let localLogisticsQuantity = 0;
    let localImportQuantity = 0;
    let trackedTransportQuantity = 0;
    let weightedTransportDistance = 0;

    for (const lot of Array.isArray(item?.journeyLots) ? item.journeyLots : []) {
      if (remaining <= 0) break;
      const quantity = Math.min(remaining, Math.max(0, Math.trunc(Number(lot?.quantity) || 0)));
      remaining -= quantity;
      const journeyRecord = legacyJourneys.get(String(lot?.journeyId || "")) || null;
      const legacyPurchase = journeyRecord?.purchase || null;
      const purchaseSettlementId = String(lot?.purchaseSettlementId || legacyPurchase?.settlementId || "");
      const purchaseFacilityType = String(lot?.purchaseFacilityType || legacyPurchase?.facilityType || "");
      if (quantity > 0 && purchaseSettlementId) {
        const recordedDistance = Number(journeyRecord?.distance);
        const carriedDistance = Number.isFinite(recordedDistance)
          ? recordedDistance
          : safeDistance(purchaseSettlementId, settlementId);
        if (Number.isFinite(carriedDistance)) {
          trackedTransportQuantity += quantity;
          weightedTransportDistance += Math.max(0, carriedDistance) * quantity;
        }
      }
      if (quantity <= 0 || purchaseSettlementId !== settlementId) continue;
      sameSettlementQuantity += quantity;
      const purchaseMerchantKey = String(lot?.purchaseMerchantKey || "");
      const exactMerchant = merchantKey && purchaseMerchantKey && purchaseMerchantKey === merchantKey;
      const recoverableLegacyMerchant = !purchaseMerchantKey
        && current?.facilityType !== "상회"
        && purchaseFacilityType === String(current?.facilityType || "");
      if (exactMerchant || recoverableLegacyMerchant) sameMerchantQuantity += quantity;
      const sourceType = String(lot?.purchaseSourceType || "")
        || (String(item?.originId || "") === purchaseSettlementId ? "production" : "import");
      if (sourceType === "production") localProductionQuantity += quantity;
      else if (sourceType === "logistics") localLogisticsQuantity += quantity;
      else localImportQuantity += quantity;
    }

    const fallbackQuantity = Math.max(0, totalQuantity - trackedTransportQuantity);
    const fallbackDistance = safeDistance(item?.originId, settlementId);
    if (fallbackQuantity > 0 && Number.isFinite(fallbackDistance)) {
      weightedTransportDistance += Math.max(0, fallbackDistance) * fallbackQuantity;
    }
    return {
      sameSettlementShare: sameSettlementQuantity / totalQuantity,
      sameMerchantShare: sameMerchantQuantity / totalQuantity,
      localProductionShare: localProductionQuantity / totalQuantity,
      localLogisticsShare: localLogisticsQuantity / totalQuantity,
      localImportShare: localImportQuantity / totalQuantity,
      nonLocalShare: Math.max(0, 1 - (sameSettlementQuantity / totalQuantity)),
      transportDistance: weightedTransportDistance / totalQuantity
    };
  }

  function transportRiskPremium(distance, definition) {
    const maximum = Math.max(0, Number(definition?.durability) || 0);
    if (distance <= 0 || maximum <= 0 || maximum >= INDESTRUCTIBLE_DURABILITY) return 0;
    const expectedConditionRatio = clamp(1 - ((distance * 2) / maximum), 0, 1);
    const expectedLossRate = 1 - durabilityPriceRatio(expectedConditionRatio);
    return Math.min(100, expectedLossRate * 150);
  }

  function regionalWeeklySupplyAdjustment(subcategory, options = {}) {
    if (!current || !subcategory) return 0;
    if (!state.marketSupply || typeof state.marketSupply !== "object") state.marketSupply = {};
    const key = `${current.settlement.id}|${subcategory}`;
    const week = Math.floor((Math.max(1, current.worldTime?.day || 1) - 1) / RESTOCK_INTERVAL_DAYS);
    let record = state.marketSupply[key];
    if (record && Number(record.week) === week) return Number(record.adjustment) || 0;
    const storedWeek = Number(record?.week);
    let previousWeek = Number.isFinite(storedWeek) ? Math.max(-1, Math.trunc(storedWeek)) : -1;
    let adjustment = Number(record?.adjustment) || 0;
    while (previousWeek < week) {
      previousWeek += 1;
      const rng = seededRandom(`${key}|weekly-supply|${previousWeek}`);
      const target = (rng() + rng() - 1) * 10;
      adjustment = previousWeek === 0 && !record ? target : (adjustment * .7) + (target * .3);
    }
    adjustment = Math.round(adjustment * 10) / 10;
    state.marketSupply[key] = { week, adjustment };
    if (options.persist !== false) persistState();
    return adjustment;
  }

  function marketInformationAdjustment(settlementId, subcategory, day = getWorldTime()?.day) {
    if (!state.marketInformation || typeof state.marketInformation !== "object") state.marketInformation = {};
    const key = `${settlementId}|${subcategory}`;
    const record = state.marketInformation[key];
    if (!record) return 0;
    if (Math.max(1, Math.trunc(Number(day) || 1)) > Math.max(0, Math.trunc(Number(record.expiresDay) || 0))) {
      delete state.marketInformation[key];
      persistState();
      return 0;
    }
    return clamp(Number(record.adjustment) || 0, -50, 50);
  }

  function applyMarketInformationShock(effect = {}) {
    const settlementId = String(effect.settlementId || "").trim();
    const subcategory = String(effect.subcategory || "").trim();
    if (!settlementId || !subcategory) return 0;
    if (!state.marketInformation || typeof state.marketInformation !== "object") state.marketInformation = {};
    const key = `${settlementId}|${subcategory}`;
    const currentRecord = state.marketInformation[key] || { adjustment: 0, expiresDay: 0, cardIds: [] };
    currentRecord.adjustment = clamp((Number(currentRecord.adjustment) || 0) + (Number(effect.adjustment) || 0), -50, 50);
    currentRecord.expiresDay = Math.max(Number(currentRecord.expiresDay) || 0, Math.trunc(Number(effect.expiresDay) || 0));
    currentRecord.cardIds = [...new Set([...(currentRecord.cardIds || []), String(effect.cardId || "")].filter(Boolean))];
    state.marketInformation[key] = currentRecord;
    persistState();
    refresh();
    return currentRecord.adjustment;
  }

  function dampenMarketInformation(effect = {}) {
    const settlementId = String(effect.settlementId || "").trim();
    const subcategory = String(effect.subcategory || "").trim();
    const key = `${settlementId}|${subcategory}`;
    const record = state.marketInformation?.[key];
    if (!record) return 0;
    const adjustment = Number(record.adjustment) || 0;
    const referenceIndex = (Number(effect.baseIndex) || 0) + adjustment;
    const reduction = Math.min(15, Math.max(8, Math.abs(referenceIndex) * .2));
    record.adjustment = Math.sign(adjustment) * Math.max(0, Math.abs(adjustment) - reduction);
    record.expiresDay = Math.max(Math.trunc(Number(getWorldTime()?.day) || 1), (Number(record.expiresDay) || 0) - 1);
    persistState();
    refresh();
    return record.adjustment;
  }

  function subcategorySupplyPressure(subcategory) {
    if (!subcategory || !current) return 0;
    const stockLots = settlementAllStockLots();
    const stockedItemIds = new Set(stockLots.map(lot => lot.itemId));
    const buckets = new Map();
    const addStock = (sourceType, stock, baseline) => {
      if (!STOCK_PRESSURE_WEIGHTS.has(sourceType)) return;
      const bucket = buckets.get(sourceType) || { stock: 0, baseline: 0 };
      bucket.stock += Math.max(0, Number(stock) || 0);
      bucket.baseline += Math.max(0, Number(baseline) || 0);
      buckets.set(sourceType, bucket);
    };
    stockLots.forEach(lot => {
      const definition = current.definitionsById.get(lot.itemId);
      if (!definition || isNonTradeCategory(definition.category) || definition.subcategory !== subcategory) return;
      addStock(lot.sourceType, lot.quantity, Math.max(1, lot.baseQuantity || lot.quantity || 1));
    });
    const localProductionNames = new Set(current.settlement.productionNames || []);
    const localLogisticsNames = new Set((current.settlement.logisticsNames || [])
      .filter(name => !localProductionNames.has(name)));
    current.definitions.forEach(definition => {
      if (isNonTradeCategory(definition.category)
        || definition.subcategory !== subcategory
        || (!localProductionNames.has(definition.name1) && !localLogisticsNames.has(definition.name1))
        || stockedItemIds.has(definition.id)) return;
      const expected = localProductionNames.has(definition.name1)
        ? productionStock(definition, current.settlement.category, current.facilityType)
        : fixedLogisticsStock(definition, current.settlement.category, current.facilityType);
      addStock(localProductionNames.has(definition.name1) ? "production" : "logistics", expected, expected);
    });
    const pressure = [...buckets].reduce((sum, [sourceType, bucket]) => {
      if (bucket.baseline <= 0) return sum;
      const ratio = Math.max(0, bucket.stock) / bucket.baseline * 100;
      return sum + (supplyPressureForRatio(ratio) * (STOCK_PRESSURE_WEIGHTS.get(sourceType) || 0));
    }, 0);
    return clamp(Math.round(pressure * 10) / 10, -40, 40);
  }

  function supplyPressureForRatio(ratio) {
    if (ratio <= 25) return 40;
    if (ratio <= 50) return 20;
    if (ratio <= 75) return 10;
    if (ratio <= 125) return 0;
    if (ratio <= 160) return -10;
    if (ratio <= 220) return -25;
    return -40;
  }

  function identicalStockAdjustment(itemId) {
    if (!current || !itemId) return 0;
    const stock = citywideWeightedStockQuantity(itemId);
    if (stock <= 0) return 0;
    const threshold = IDENTICAL_STOCK_THRESHOLD.get(current.settlement.category) || 8;
    return 40 * clamp(stock / Math.max(1, threshold), 0, 1);
  }

  function latentSubcategorySupplyPressure(subcategory, stockedItemIds, weight) {
    const week = Math.floor((Math.max(1, current.worldTime?.day || 1) - 1) / RESTOCK_INTERVAL_DAYS);
    const localProductionNames = new Set(current.settlement.productionNames || []);
    let pressure = 0;
    current.definitions.forEach(definition => {
      if (isNonTradeCategory(definition.category)
        || definition.subcategory !== subcategory
        || !localProductionNames.has(definition.name1)
        || stockedItemIds.has(definition.id)) return;
      const rng = seededRandom(`${current.settlement.id}|${definition.id}|latent-production|${week}`);
      pressure += weight.production * randomRange(rng, .5, 1);
    });
    const recentImportIds = new Set(settlementMerchantEntries()
      .flatMap(([, merchant]) => merchant.importItemIds || []));
    recentImportIds.forEach(itemId => {
      const definition = current.definitionsById.get(itemId);
      if (!definition
        || isNonTradeCategory(definition.category)
        || definition.subcategory !== subcategory
        || stockedItemIds.has(itemId)) return;
      const rng = seededRandom(`${current.settlement.id}|${itemId}|latent-import|${week}`);
      pressure += weight.import * randomRange(rng, 0, .3);
    });
    return pressure;
  }

  function citywideStockQuantity(itemId) {
    const quantity = settlementStockLots().filter(lot => lot.itemId === itemId)
      .reduce((sum, lot) => sum + Math.max(0, Number(lot.quantity) || 0), 0);
    return Math.max(0, quantity);
  }

  function citywideWeightedStockQuantity(itemId) {
    return settlementStockLots().filter(lot => lot.itemId === itemId)
      .reduce((sum, lot) => {
        const weight = STOCK_PRESSURE_WEIGHTS.get(lot.sourceType) || 0;
        return sum + (Math.max(0, Number(lot.quantity) || 0) * weight);
      }, 0);
  }

  function settlementMerchantEntries() {
    if (!current) return [];
    const activeMerchantKeys = new Set(tradeFacilitiesForSettlement(current.settlement)
      .map(facility => `${current.settlement.id}|${facility.id}`));
    activeMerchantKeys.add(current.merchantKey);
    return Object.entries(state.merchants)
      .filter(([merchantKey]) => activeMerchantKeys.has(merchantKey));
  }

  function settlementStockLots() {
    return settlementMerchantEntries()
      .flatMap(([, merchant]) => (merchant.stockLots || []).filter(lot => lot.quantity > 0));
  }

  function settlementAllStockLots() {
    return settlementMerchantEntries()
      .flatMap(([, merchant]) => merchant.stockLots || []);
  }

  function signedPercent(value) {
    const number = Number(value) || 0;
    return `${number >= 0 ? "+" : ""}${formatNumber(number)}%`;
  }

  function originDisplayName(value) {
    const name = String(value || "파르네").trim() || "파르네";
    return name.endsWith("산") ? name : `${name}산`;
  }

  function formatDurability(currentValue, maximumValue) {
    const maximum = Number(maximumValue) || 0;
    if (maximum >= INDESTRUCTIBLE_DURABILITY) return "- / -";
    return `${formatNumber(currentValue)} / ${formatNumber(maximum)}`;
  }

  function tooltipMetadata(entry, quantity = 1, owner = "player") {
    const marketPurchaseBlocked = isMarketPurchaseBlocked(owner, entry.definition);
    return {
      quality: entry.quality,
      qualityRoll: entry.qualityRoll,
      qualityValueDirection: owner === "merchant" ? "merchantSell" : "playerSell",
      originId: entry.originId,
      originName: entry.originName,
      originDistance: entry.originDistance,
      originProductKind: originProductKindFor(entry, entry.definition),
      originPurchaseBonus: Boolean(entry.originPurchaseBonus),
      durability: entry.durability,
      hideOrigin: false,
      purchaseValue: owner === "merchant" ? Number(entry.actualValue) || 0 : Number(entry.purchaseValue) || Number(entry.definition?.baseValue) || 0,
      tradeValue: marketPurchaseBlocked ? 0 : (Number(entry.actualValue) || 0) * Math.max(1, Number(quantity) || 1),
      hasTradeValue: !marketPurchaseBlocked,
      tradeValueFactors: marketPurchaseBlocked ? [] : visibleTradeValueFactors(entry, owner)
    };
  }

  function visibleTradeValueFactors(entry, owner = "player") {
    const definition = entry?.definition;
    if (!definition) return [];
    const knowledge = knowledgeProfile(definition, {
      ...entry,
      qualityValueDirection: owner === "merchant" ? "merchantSell" : "playerSell"
    });
    const valuation = owner === "merchant"
      ? merchantSellValuation(entry, definition)
      : playerSellValuation(entry, definition);
    const factors = [];
    const addFactor = (label, value, detail = "") => {
      factors.push({ label, value: Number(value) || 0, detail: String(detail || "") });
    };

    if (knowledge.showDurability) {
      const durabilityMultiplier = Math.max(0, Number(valuation.durabilityPercent) || 0) / 100;
      addFactor(
        "열화 내구도",
        (durabilityMultiplier - 1) * 100,
        formatDurability(valuation.durabilityCurrent, valuation.durabilityMaximum)
      );
    }
    if (knowledge.showCityStock) {
      const naturalWithoutStock = clamp(
        (Number(valuation.demandAdjustment) || 0) + (Number(valuation.weeklySupplyAdjustment) || 0),
        -60,
        60
      );
      const marketWithoutStock = clamp(
        naturalWithoutStock + (Number(valuation.cityEventPriceAdjustment) || 0) + (Number(valuation.informationPriceAdjustment) || 0),
        -85,
        85
      );
      const marketWithStock = Number(valuation.marketIndex) || 0;
      let stockMultiplier = Math.max(.15, 1 + (marketWithStock / 100))
        / Math.max(.15, 1 + (marketWithoutStock / 100));
      if (owner === "player") stockMultiplier *= Math.max(.5, 1 - ((Number(valuation.identicalItemAdjustment) || 0) / 100));
      addFactor(
        "도시 총재고",
        (stockMultiplier - 1) * 100,
        `동일 상품 ${formatNumber(citywideStockQuantity(definition.id))}개 · 유효 재고 ${formatNumber(citywideWeightedStockQuantity(definition.id))}`
      );
    }
    if (knowledge.showQuality) addFactor("품질", valuation.qualityAdjustment, knowledge.qualityText);
    if (knowledge.showOriginProduct && Number(valuation.originProductSaleAdjustment)) {
      addFactor(
        valuation.originProductKind === "famous" ? "명산품" : "특산물",
        valuation.originProductSaleAdjustment,
        entry.originName || ""
      );
    }
    if (knowledge.showDistance) {
      const distanceDetailBase = valuation.externalOrigin
        ? `해외 운송 ??? 거리${Number(valuation.transportDistance) > 0 ? ` · 직접 운송 ${formatNumber(valuation.transportDistance)} 거리` : ""}`
        : `${formatNumber(valuation.distance)} 거리`;
      const distanceDetail = Number(valuation.distanceValueFactor) < 1
        ? `${distanceDetailBase} · 열화 면역 보너스 50%`
        : distanceDetailBase;
      addFactor("거리", valuation.distanceAdjustment, distanceDetail);
    }
    return factors;
  }

  function renderOffers() {
    const playerRows = offerRows("player", offerFilters.player);
    const merchantRows = offerRows("merchant", offerFilters.merchant);
    elements.playerOffer.replaceChildren(...(playerRows.length ? playerRows : [emptyMessage("아직 올린 것이 없습니다.")]));
    elements.merchantOffer.replaceChildren(...(merchantRows.length ? merchantRows : [emptyMessage("아직 올린 것이 없습니다.")]));
    elements.playerCurrencies.replaceChildren(...createCurrencyCards("player"));
    elements.merchantCurrencies.replaceChildren(...createCurrencyCards("merchant"));
    elements.playerCurrencies.hidden = ["goods", "information", "notes"].includes(offerFilters.player);
    elements.merchantCurrencies.hidden = ["goods", "information", "notes"].includes(offerFilters.merchant);
    elements.modal.querySelectorAll("[data-trade-action='filter']").forEach(button => {
      if (button.dataset.tradeFilter === "notes") button.hidden = button.dataset.tradeOwner !== "player" || !billNotesEligible();
      const active = offerFilters[button.dataset.tradeOwner] === button.dataset.tradeFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const playerTotal = offerValue("player");
    const merchantTotal = offerValue("merchant");
    const balance = balanceResult(playerTotal, merchantTotal);
    renderBargainControl();
    const cargoPreview = window.ProjectWCargo.previewExchange(proposedCargoExchange());
    renderCargoPreview(cargoPreview);
    const notesRequireGoods = proposal.player.notes.size <= 0 || proposal.merchant.goods.size > 0;
    const valid = balance.valid && cargoPreview.possible && notesRequireGoods;
    if (elements.playerCurrencyFill) {
      const missingValue = balance.valid ? 0 : playerCurrencyShortfall(balance);
      elements.playerCurrencyFill.hidden = Boolean(current.currencyOnly);
      elements.playerCurrencyFill.disabled = current.currencyOnly || balance.merchantValue <= 0 || missingValue <= 0 || !hasAvailableCurrency("player", missingValue, true);
    }
    if (elements.merchantCurrencyFill) {
      const missingValue = balance.valid ? 0 : Math.max(0, balance.playerMaximumValue - balance.merchantValue);
      elements.merchantCurrencyFill.hidden = Boolean(current.currencyOnly);
      elements.merchantCurrencyFill.disabled = current.currencyOnly || proposal.player.notes.size > 0 || balance.playerMaximumValue <= 0 || missingValue <= 0 || !hasAvailableCurrency("merchant", missingValue, false);
    }
    elements.exchangeFocusButtons?.forEach(button => {
      button.disabled = !current.currencyOnly || playerTotal <= 0;
    });
    renderBalanceValue(balance);
    if (elements.exchangeFee) {
      elements.exchangeFee.hidden = !current.currencyOnly;
      elements.exchangeFee.textContent = current.currencyOnly
        ? `환전 할증 ${formatNumber(balance.exchangeFee)} · ${formatNumber(balance.exchangeFeeRate)}%`
        : "";
    }
    renderBalanceStatus(balance, { notesRequireGoods, cargoPreview, valid });
    elements.confirm.disabled = !valid;
  }

  function renderBalanceValue(balance) {
    if (!elements.balanceValue) return;
    if (current.currencyOnly) {
      elements.balanceValue.textContent = `${formatNumber(balance.playerValue)} ↔ ${formatNumber(balance.requiredPlayerValue)}`;
      return;
    }
    if (balance.bargainRecognizedValue <= 0 || balance.rawPlayerValue <= 0) {
      elements.balanceValue.textContent = `${formatNumber(balance.rawPlayerValue)} ↔ ${formatNumber(balance.merchantValue)}`;
      return;
    }
    const offeredValue = document.createElement("span");
    offeredValue.className = "trade-bargain-adjusted-value";
    offeredValue.textContent = formatNumber(balance.playerValue);
    offeredValue.dataset.bargainGainTooltip = `원금 ${formatNumber(balance.rawPlayerValue)} + 흥정 이득 ${formatNumber(balance.bargainRecognizedValue)}`;
    offeredValue.tabIndex = 0;
    offeredValue.setAttribute("aria-label", `판정 가치 ${formatNumber(balance.playerValue)}. 원금 ${formatNumber(balance.rawPlayerValue)}에 흥정 이득 ${formatNumber(balance.bargainRecognizedValue)} 추가`);
    elements.balanceValue.replaceChildren(
      offeredValue,
      document.createTextNode(` ↔ ${formatNumber(balance.merchantValue)}`)
    );
  }

  function renderBalanceStatus(balance, { notesRequireGoods, cargoPreview, valid }) {
    if (!elements.balanceStatus) return;
    const status = elements.balanceStatus;
    status.classList.toggle("is-valid", valid);
    status.classList.remove("is-structured");
    status.replaceChildren();

    if (current.currencyOnly || balance.playerValue <= 0 || balance.merchantValue <= 0) {
      status.textContent = balance.message;
      return;
    }

    const availability = valid
      ? cargoPreview.overweight ? "가능 · 최대 중량 초과" : "가능"
      : !notesRequireGoods
        ? "불가 · 어음 사용 조건"
        : !cargoPreview.possible
          ? "불가 · 화물칸 부족"
          : !balance.nonCurrencyAssetValid
            ? "불가 · 비화폐 자산 부족"
            : current.currencyOnly && balance.merchantDisadvantaged
              ? "불가 · 내가 건네는 가치 부족"
              : balance.difference > 20
                ? "불가 · 가치 차이 초과"
                : "불가 · 거래 조건 미충족";
    const lines = [
      ["가치 차이", `${formatNumber(balance.difference)}%`, balance.difference <= 20],
      ["비화폐 자산", `${formatNumber(balance.nonCurrencyAssetRatio)}% / 45%`, balance.nonCurrencyAssetValid],
      ["거래 가능 여부", availability, valid]
    ];
    const fragment = document.createDocumentFragment();
    lines.forEach(([labelText, valueText, passed], index) => {
      const line = document.createElement("span");
      line.className = `trade-balance-status-line ${passed ? "is-passed" : "is-failed"}${index === 2 ? " is-result" : ""}`;
      const label = document.createElement("span");
      label.textContent = labelText;
      const value = document.createElement("strong");
      value.textContent = valueText;
      line.append(label, value);
      fragment.append(line);
    });
    status.classList.add("is-structured");
    status.append(fragment);
  }

  function proposedCargoExchange(purchaseJourneyIds = new Map()) {
    const removals = new Map();
    proposal.player.goods.forEach((quantity, tradeKey) => {
      const instanceId = playerInstanceId(tradeKey);
      removals.set(instanceId, (removals.get(instanceId) || 0) + quantity);
    });
    return {
      remove: [...removals].map(([instanceId, quantity]) => ({ instanceId, quantity })),
      add: [...proposal.merchant.goods].flatMap(([lotId, quantity]) => {
        const lot = merchantLot(lotId);
        if (lot?.itemId === NAHANA_EVENT_GIFT_ITEM_ID) return [];
        return lot ? [{
          itemId: lot.itemId,
          quantity,
          quality: lot.quality,
          qualityRoll: lot.qualityRoll,
          originId: lot.originId,
          originName: lot.originName,
          originDistance: lot.originDistance,
          originProductKind: originProductKindFor(lot, current.definitionsById.get(lot.itemId)),
          originPurchaseBonus: qualifiesForOriginPurchaseBonus(lot, current.definitionsById.get(lot.itemId)),
          durability: lot.durability,
          purchaseValue: merchantSellValuation(lot, current.definitionsById.get(lot.itemId)).value,
          journeyLots: [{
            journeyId: purchaseJourneyIds.get(lotId) || `PREVIEW_${lotId}`,
            quantity,
            purchaseSettlementId: current.settlement.id,
            purchaseMerchantKey: current.merchantKey,
            purchaseFacilityType: current.facilityType,
            purchaseSourceType: lot.sourceType
          }]
        }] : [];
      })
    };
  }

  function sliceJourneyLots(lots, offset, quantity) {
    let skipped = Math.max(0, Math.trunc(Number(offset) || 0));
    let remaining = Math.max(0, Math.trunc(Number(quantity) || 0));
    const result = [];
    for (const lot of Array.isArray(lots) ? lots : []) {
      let available = Math.max(0, Math.trunc(Number(lot?.quantity) || 0));
      if (skipped >= available) {
        skipped -= available;
        continue;
      }
      available -= skipped;
      skipped = 0;
      const used = Math.min(available, remaining);
      if (used > 0) result.push({ journeyId: String(lot.journeyId || ""), quantity: used });
      remaining -= used;
      if (remaining <= 0) break;
    }
    return result.filter(lot => lot.journeyId && lot.quantity > 0);
  }

  function renderCargoPreview(preview) {
    elements.previewSlots.textContent = `${preview.usedSlots} / ${preview.totalSlots}`;
    elements.previewWeight.textContent = `${formatNumber(preview.weight)} / ${formatNumber(preview.maxWeight)}`;
    elements.cargoPreview.classList.toggle("is-danger", !preview.possible || preview.overweight);
  }

  function offerRows(owner, filter = "all") {
    const rows = [];
    if (filter !== "goods" && filter !== "information" && filter !== "notes") {
      proposal[owner].currencies.forEach((quantity, currencyId) => {
        const currency = current.currenciesById.get(currencyId);
        if (currency && quantity > 0) rows.push(createOfferRow(
          owner,
          "currencies",
          currencyId,
          shortCurrencyName(currency.name),
          quantity,
          tradeCurrencyValue(currency),
          null,
          currencyAssetUrl(currencyId)
        ));
      });
    }
    if (filter !== "currencies" && filter !== "information" && filter !== "notes") {
      proposal[owner].goods.forEach((quantity, key) => {
        if (quantity <= 0) return;
        const entry = tradeEntry(owner, key);
        if (entry?.definition) rows.push(createOfferRow(
          owner,
          "goods",
          key,
          tradeName(entry.definition),
          quantity,
          entry.actualValue,
          entry.definition,
          "",
          entry
        ));
      });
    }
    if (owner === "player" && filter !== "currencies" && filter !== "goods" && filter !== "notes") {
      let informationOffset = 0;
      proposal.player.information.forEach((quantity, cardId) => {
        const card = window.ProjectWInformation?.getCard?.(cardId);
        if (!card || quantity <= 0) return;
        const capacity = companyInformationCapacityProfile(informationOffset);
        rows.push(createOfferRow(
          "player",
          "information",
          cardId,
          card.title,
          1,
          informationSaleValue(card, informationOffset),
          null,
          "",
          {
            ...card,
            purchaseWeightPercent: informationPurchaseWeightPercent(card),
            informationCapacityEnabled: capacity.enabled,
            informationCapacity: capacity.current,
            informationCapacityMaximum: capacity.maximum,
            informationCapacityValuePercent: capacity.valuePercent
          }
        ));
        informationOffset += Math.max(0, Math.trunc(Number(quantity) || 0));
      });
    }
    if (owner === "player" && filter !== "currencies" && filter !== "goods" && filter !== "information") {
      proposal.player.notes.forEach((quantity, denominationId) => {
        const denomination = window.ProjectWBillNotes.DENOMINATIONS.find(value => String(value) === String(denominationId));
        if (!denomination || quantity <= 0) return;
        rows.push(createOfferRow(
          "player",
          "notes",
          String(denomination),
          `${formatNumber(denomination)} 가치 어음`,
          quantity,
          denomination
        ));
      });
    }
    return rows;
  }

  function createOfferRow(owner, kind, key, name, quantity, unitValue, definition = null, assetUrl = "", entry = null) {
    const row = document.createElement("div");
    row.className = `trade-offer-row ${kind === "currencies" ? "is-currency" : kind === "information" ? "is-information" : kind === "notes" ? "is-bill-note" : tradeCategoryClass(definition?.category)}`;
    row.dataset.tradeAction = "remove";
    row.dataset.tradeOwner = owner;
    row.dataset.tradeKind = kind;
    row.dataset.tradeKey = key;
    row.title = "빈 영역을 누르면 거래 목록에서 제거합니다.";
    if (assetUrl) {
      const image = document.createElement("img");
      image.className = "trade-offer-coin";
      image.src = assetUrl;
      image.alt = "";
      image.draggable = false;
      row.append(image);
    }
    const copy = document.createElement("span");
    copy.className = "trade-offer-copy";
    const title = document.createElement("strong");
    title.textContent = name;
    const detail = document.createElement("small");
    if (kind === "goods" && definition) {
      const impact = offerCargoImpact(owner, key, quantity);
      if (owner === "player") {
        const purchaseTotal = Math.max(0, Math.round((Number(entry?.purchaseValue) || Number(definition.baseValue) || 0) * quantity));
        const saleTotal = Math.max(0, Math.round(unitValue * quantity));
        const difference = saleTotal - purchaseTotal;
        const differencePercent = purchaseTotal > 0 ? Math.round(difference / purchaseTotal * 100) : 0;
        detail.textContent = `× ${quantity} · 구매액 ${formatNumber(purchaseTotal)} · 판매 가치 ${formatNumber(saleTotal)} · 손익률 ${signedValue(differencePercent)}% · 화물칸 ${formatDelta(impact.slots)} · 중량 ${formatDelta(impact.weight)}`;
      } else {
        detail.textContent = `× ${quantity} · 화물칸 ${formatDelta(impact.slots)} · 중량 ${formatDelta(impact.weight)} · 가치 ${formatNumber(unitValue * quantity)}`;
      }
    } else if (kind === "information") {
      const weightDetail = current?.facilityType === "상회"
        ? ` · 점포 가중 ${formatNumber(entry?.purchaseWeightPercent)}% · 수용량 ${formatNumber(entry?.informationCapacity)} / ${formatNumber(entry?.informationCapacityMaximum)}`
        : current?.settlement?.category === "관문"
          ? ` · 관문 가중 ${formatNumber(entry?.purchaseWeightPercent)}%`
          : "";
      detail.textContent = `${entry?.gradeLabel || "정보"} · ${entry?.trustLabel || ""} · 매입 가치 약 ${formatNumber(unitValue)}${weightDetail}`;
    } else if (kind === "notes") {
      detail.textContent = `× ${quantity} · 액면가 ${formatNumber(unitValue * quantity)} · 칸과 무게 없음`;
    } else {
      detail.textContent = `× ${quantity} · 가치 ${formatNumber(unitValue * quantity)}`;
    }
    copy.append(title, detail);
    const controls = document.createElement("span");
    controls.className = "trade-stepper";
    controls.append(
      stepButton("−", owner, kind, key, -1),
      stepButton("＋", owner, kind, key, 1)
    );
    row.append(copy, controls);
    if (kind === "goods" && definition) {
      attachGoodsTooltip(row, owner, {
        ...(entry || {}),
        definition,
        itemId: definition.id,
        instanceId: owner === "player" ? playerInstanceId(key) : "",
        quantity,
        unitOnly: owner === "player" && String(key).includes("::")
      }, quantity);
    }
    return row;
  }

  function offerCargoImpact(owner, key, quantity) {
    const entry = tradeEntry(owner, key);
    const exchange = owner === "player"
      ? { remove: [{ instanceId: playerInstanceId(key), quantity }] }
      : { add: [{
        itemId: entry?.itemId,
        quantity,
        quality: entry?.quality,
        qualityRoll: entry?.qualityRoll,
        originId: entry?.originId,
        originName: entry?.originName,
        originDistance: entry?.originDistance,
        durability: entry?.durability,
        purchaseValue: entry?.actualValue
      }] };
    const preview = window.ProjectWCargo.previewExchange(exchange);
    return {
      slots: preview.usedSlots - preview.currentUsedSlots,
      weight: preview.weight - preview.currentWeight
    };
  }

  function formatDelta(value) {
    const number = Number(value) || 0;
    return number > 0 ? `+${formatNumber(number)}` : formatNumber(number);
  }

  function signedValue(value) {
    const number = Math.round(Number(value) || 0);
    return `${number > 0 ? "+" : ""}${formatNumber(number)}`;
  }

  function attachGoodsTooltip(element, owner, entry, tooltipQuantity = 1) {
    const show = event => {
      window.ProjectWCargo.showDefinitionTooltip(entry.itemId, tooltipQuantity, event.clientX, event.clientY, tooltipMetadata(entry, tooltipQuantity, owner));
    };
    element.addEventListener("pointerenter", show);
    element.addEventListener("pointermove", show);
    element.addEventListener("pointerleave", window.ProjectWCargo.hideTooltip);
    element.addEventListener("focusin", () => {
      const rect = element.getBoundingClientRect();
      window.ProjectWCargo.showDefinitionTooltip(entry.itemId, tooltipQuantity, rect.right, rect.top + (rect.height / 2), tooltipMetadata(entry, tooltipQuantity, owner));
    });
    element.addEventListener("focusout", event => {
      if (!element.contains(event.relatedTarget)) window.ProjectWCargo.hideTooltip();
    });
  }

  function stepButton(label, owner, kind, key, delta) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.tradeAction = "adjust";
    button.dataset.tradeOwner = owner;
    button.dataset.tradeKind = kind;
    button.dataset.tradeKey = key;
    button.dataset.tradeDelta = String(delta);
    if (delta > 0) button.disabled = selectedQuantity(owner, kind, key) >= availableQuantity(owner, kind, key);
    return button;
  }

  function createCurrencyCards(owner) {
    const holdings = owner === "player" ? getPlayerWallet() : current.merchant.wallet;
    const heading = document.createElement("h4");
    const totalValue = current.currencies.reduce((total, currency) => {
      return total + (tradeCurrencyValue(currency) * walletQuantity(holdings, currency.id));
    }, 0);
    heading.textContent = owner === "player"
      ? "내 화폐"
      : `상인의 화폐 (총 가치 ${formatNumber(totalValue)})`;
    const cards = current.currencies.map((currency, index) => {
      const available = walletQuantity(holdings, currency.id);
      const selected = proposal[owner].currencies.get(currency.id) || 0;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `trade-currency-card ${available <= 0 ? "is-empty" : ""}`;
      button.dataset.tradeAction = "adjust";
      button.dataset.tradeOwner = owner;
      button.dataset.tradeKind = "currencies";
      button.dataset.tradeKey = currency.id;
      button.dataset.tradeDelta = "1";
      button.disabled = selected >= available || (owner === "merchant" && proposal.player.notes.size > 0);
      const mark = document.createElement("span");
      mark.className = "trade-currency-coin";
      const assetId = `Asset_Coin_${index + 1}`;
      const assetUrl = getAssetUrl(assetId);
      if (assetUrl) {
        const image = document.createElement("img");
        image.src = assetUrl;
        image.alt = "";
        image.dataset.assetId = assetId;
        image.draggable = false;
        mark.append(image);
      } else mark.textContent = currency.type === "금화" ? "금" : currency.type === "은화" ? "은" : "동";
      const copy = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = shortCurrencyName(currency.name);
      const quantity = document.createElement("b");
      quantity.className = "trade-currency-quantity";
      quantity.textContent = `× ${Math.max(0, available - selected)}`;
      const value = document.createElement("small");
      value.textContent = `가치 ${formatNumber(tradeCurrencyValue(currency))}`;
      copy.append(name, quantity, value);
      button.append(mark, copy);
      return button;
    });
    return [heading, ...cards];
  }

  function currencyAssetUrl(currencyId) {
    const index = current?.currencies?.findIndex(currency => currency.id === currencyId) ?? -1;
    return index >= 0 ? getAssetUrl(`Asset_Coin_${index + 1}`) : "";
  }

  function tradeCurrencyValue(currency) {
    return window.ProjectWWallet.getCurrencyValue(currency, current?.settlement?.region || "중부");
  }

  function shortCurrencyName(name) {
    const withoutType = String(name || "화폐").replace(/\s*(금화|은화|동화)\s*$/, "").trim();
    return withoutType.split(/\s+/)[0] || withoutType || "화폐";
  }

  function emptyMessage(message) {
    const empty = document.createElement("p");
    empty.className = "trade-empty";
    empty.textContent = message;
    return empty;
  }

  function handleClick(event) {
    const target = event.target.closest("[data-trade-action]");
    if (!target || !elements.modal.contains(target)) return;
    const action = target.dataset.tradeAction;
    if (action === "adjust") {
      adjustSelection(
        target.dataset.tradeOwner,
        target.dataset.tradeKind,
        target.dataset.tradeKey,
        Number(target.dataset.tradeDelta)
      );
      return;
    }
    if (action === "remove") {
      const collection = proposal[target.dataset.tradeOwner]?.[target.dataset.tradeKind];
      if (collection instanceof Map) {
        const removed = collection.delete(target.dataset.tradeKey);
        if (removed && target.dataset.tradeKind === "currencies") window.ProjectWAudio?.playEffect("coin");
        if (removed && target.dataset.tradeKind === "goods") window.ProjectWAudio?.playEffect("goods");
        if (removed && target.dataset.tradeKind === "notes") window.ProjectWAudio?.playEffect("paper");
      }
      window.ProjectWCargo.hideTooltip();
      render();
      return;
    }
    if (action === "clear") {
      clearOffer(target.dataset.tradeOwner);
      return;
    }
    if (action === "currency-fill") {
      fillOfferWithCurrency(target.dataset.tradeOwner === "merchant" ? "merchant" : "player");
      return;
    }
    if (action === "exchange-focus") {
      fillCurrencyExchangePayout(target.dataset.currencyFocus);
      return;
    }
    if (action === "filter") setOfferFilter(target.dataset.tradeOwner, target.dataset.tradeFilter);
  }

  function clearOffer(owner) {
    if (!proposal[owner]) return;
    const removedCurrency = proposal[owner].currencies.size > 0;
    const removedGoods = proposal[owner].goods.size > 0;
    const removedNotes = proposal[owner].notes.size > 0;
    proposal[owner].goods.clear();
    proposal[owner].currencies.clear();
    proposal[owner].information.clear();
    proposal[owner].notes.clear();
    if (removedCurrency) window.ProjectWAudio?.playEffect("coin");
    if (removedGoods) window.ProjectWAudio?.playEffect("goods");
    if (removedNotes) window.ProjectWAudio?.playEffect("paper");
    window.ProjectWCargo.hideTooltip();
    render();
  }

  function hasAvailableCurrency(owner, remaining = 0, canCover = true) {
    if (!current || !["player", "merchant"].includes(owner)) return false;
    const wallet = owner === "player" ? getPlayerWallet() : current.merchant.wallet;
    return current.currencies.some(currency => {
      const selected = proposal[owner].currencies.get(currency.id) || 0;
      const value = tradeCurrencyValue(currency);
      return walletQuantity(wallet, currency.id) > selected
        && value > 0
        && (canCover || value <= remaining + .0001);
    });
  }

  function playerCurrencyShortfall(balance) {
    if (!balance || balance.merchantValue <= 0) return 0;
    return Math.max(0, balance.merchantValue - balance.rawPlayerValue - balance.bargainAllowance);
  }

  function fillOfferWithCurrency(owner) {
    if (!current || current.currencyOnly) return;
    const balance = balanceResult(offerValue("player"), offerValue("merchant"));
    if (balance.valid) return;
    const playerSide = owner === "player";
    let remaining = playerSide
      ? playerCurrencyShortfall(balance)
      : Math.max(0, balance.playerMaximumValue - balance.merchantValue);
    if ((playerSide ? balance.merchantValue : balance.playerMaximumValue) <= 0 || remaining <= 0) return;
    const wallet = playerSide ? getPlayerWallet() : current.merchant.wallet;
    const currencies = current.currencies
      .map(currency => ({
        currency,
        value: tradeCurrencyValue(currency),
        available: Math.max(0, walletQuantity(wallet, currency.id) - (proposal[owner].currencies.get(currency.id) || 0))
      }))
      .filter(entry => entry.value > 0 && entry.available > 0)
      .sort((left, right) => right.value - left.value);
    let added = 0;
    currencies.forEach(entry => {
      if (remaining <= 0 || entry.available <= 0) return;
      const quantity = Math.min(entry.available, Math.floor((remaining + 0.0001) / entry.value));
      if (quantity <= 0) return;
      proposal[owner].currencies.set(entry.currency.id, (proposal[owner].currencies.get(entry.currency.id) || 0) + quantity);
      entry.available -= quantity;
      remaining -= entry.value * quantity;
      added += quantity;
    });
    while (playerSide && remaining > 0.0001) {
      const available = currencies.filter(entry => entry.available > 0);
      if (!available.length) break;
      const covering = available
        .filter(entry => entry.value >= remaining)
        .sort((left, right) => (left.value - remaining) - (right.value - remaining))[0];
      const chosen = covering || available[0];
      proposal[owner].currencies.set(chosen.currency.id, (proposal[owner].currencies.get(chosen.currency.id) || 0) + 1);
      chosen.available -= 1;
      remaining -= chosen.value;
      added += 1;
    }
    if (added > 0) window.ProjectWAudio?.playEffect("coin");
    else notify(playerSide ? "부족한 가치를 채울 화폐가 없습니다." : "상인이 건넬 수 있는 적절한 화폐가 없습니다.");
    render();
  }

  function maximumCurrencyExchangePayout(playerValue, feeRate) {
    let low = 0;
    let high = Math.max(0, Math.floor(Number(playerValue) || 0));
    const rate = Math.max(0, Number(feeRate) || 0);
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      const required = middle + Math.ceil(middle * rate / 100);
      if (required <= playerValue) low = middle;
      else high = middle - 1;
    }
    return low;
  }

  function fillCurrencyExchangePayout(focusType) {
    if (!current?.currencyOnly || !["금화", "은화", "동화"].includes(focusType)) return;
    const playerValue = Math.max(0, Math.floor(offerValue("player")));
    if (playerValue <= 0) {
      notify("먼저 왼쪽에 지불할 화폐를 올려주세요.");
      return;
    }
    const payoutTarget = maximumCurrencyExchangePayout(playerValue, calculateExchangeFeeRate());
    if (payoutTarget <= 0) {
      notify("환전 할증을 포함해 받을 수 있는 화폐 가치가 부족합니다.");
      return;
    }

    proposal.merchant.currencies.clear();
    const entries = current.currencies
      .map(currency => ({
        currency,
        value: tradeCurrencyValue(currency),
        available: Math.max(0, walletQuantity(current.merchant.wallet, currency.id))
      }))
      .filter(entry => entry.value > 0 && entry.available > 0);
    const byValueDescending = (left, right) => right.value - left.value || left.currency.id.localeCompare(right.currency.id);
    const ordered = [
      ...entries.filter(entry => entry.currency.type === focusType).sort(byValueDescending),
      ...entries.filter(entry => entry.currency.type !== focusType).sort(byValueDescending)
    ];

    let remaining = payoutTarget;
    let selected = 0;
    ordered.forEach(entry => {
      if (remaining <= 0) return;
      const quantity = Math.min(entry.available, Math.floor((remaining + .0001) / entry.value));
      if (quantity <= 0) return;
      proposal.merchant.currencies.set(entry.currency.id, quantity);
      remaining -= entry.value * quantity;
      selected += quantity;
    });

    if (selected <= 0) {
      notify("환전상이 지급할 수 있는 화폐가 없습니다.");
      render();
      return;
    }
    window.ProjectWAudio?.playEffect("coin");
    render();
    const result = balanceResult(offerValue("player"), offerValue("merchant"));
    notify(result.valid
      ? `${focusType} 중점으로 받을 화폐를 구성했습니다.`
      : `${focusType} 재고가 부족해 가능한 범위에서 구성했습니다. 가치를 확인해주세요.`);
  }

  function setOfferFilter(owner, filter) {
    if (current?.currencyOnly) return;
    if (!offerFilters[owner] || !OFFER_FILTERS.has(filter)) return;
    if (filter === "notes" && (owner !== "player" || !billNotesEligible())) return;
    offerFilters[owner] = filter;
    window.ProjectWCargo.hideTooltip();
    renderOffers();
  }

  function adjustSelection(owner, kind, key, delta) {
    if (!current || !["player", "merchant"].includes(owner) || !["goods", "currencies", "information", "notes"].includes(kind)) return;
    if (current.currencyOnly && kind !== "currencies") return;
    if (kind === "information" && (owner !== "player" || !["상회", "좌판"].includes(current.facilityType))) return;
    if (kind === "notes" && (owner !== "player" || !billNotesEligible())) return;
    if (kind === "currencies" && owner === "merchant" && proposal.player.notes.size > 0) return;
    if (kind === "goods" && owner === "player") {
      const item = window.ProjectWCargo.getInventoryItems().find(entry => entry.instanceId === playerInstanceId(key));
      if (isMarketPurchaseBlocked(owner, item?.definition)) {
        notify("이 시장에서는 전문적인 취급이 필요한 상품을 매입하지 않습니다.");
        return;
      }
    }
    window.ProjectWCargo.hideTooltip();
    const collection = proposal[owner][kind];
    const previous = collection.get(key) || 0;
    const next = Math.min(availableQuantity(owner, kind, key), Math.max(0, previous + delta));
    if (next > 0) collection.set(key, next);
    else collection.delete(key);
    if (kind === "notes" && next > previous) proposal.merchant.currencies.clear();
    if (kind === "currencies" && next !== previous) window.ProjectWAudio?.playEffect("coin");
    if (kind === "goods" && next !== previous) window.ProjectWAudio?.playEffect("goods");
    if (kind === "notes" && next !== previous) window.ProjectWAudio?.playEffect("paper");
    render();
  }

  function selectedQuantity(owner, kind, key) {
    return proposal[owner]?.[kind]?.get(key) || 0;
  }

  function availableQuantity(owner, kind, key) {
    if (!current) return 0;
    if (kind === "currencies") {
      return owner === "player"
        ? walletQuantity(getPlayerWallet(), key)
        : walletQuantity(current.merchant.wallet, key);
    }
    if (kind === "information") {
      if (owner !== "player") return 0;
      return tradableInformationCards().some(card => card.id === key) ? 1 : 0;
    }
    if (kind === "notes") {
      if (owner !== "player" || !billNotesEligible()) return 0;
      return window.ProjectWBillNotes.entries(getPlayerBillNotes()).find(entry => entry.id === String(key))?.quantity || 0;
    }
    if (owner === "merchant") return Math.max(0, Math.trunc(Number(merchantLot(key)?.quantity) || 0));
    const item = window.ProjectWCargo.getInventoryItems().find(entry => entry.instanceId === playerInstanceId(key));
    if (!item) return 0;
    if (isMarketPurchaseBlocked(owner, item.definition)) return 0;
    if (isStackedTradeItem(item)) return Math.max(0, Math.trunc(Number(item.quantity) || 0));
    const unitIndex = Math.max(1, Math.trunc(Number(String(key).split("::")[1]) || 1));
    return unitIndex <= item.quantity ? 1 : 0;
  }

  function offerBreakdown(owner) {
    const values = { goods: 0, currencies: 0, information: 0, notes: 0, total: 0 };
    proposal[owner].goods.forEach((quantity, key) => {
      values.goods += (Number(tradeEntry(owner, key)?.actualValue) || 0) * quantity;
    });
    proposal[owner].currencies.forEach((quantity, currencyId) => {
      values.currencies += tradeCurrencyValue(current.currenciesById.get(currencyId)) * quantity;
    });
    let informationOffset = 0;
    proposal[owner].information.forEach((quantity, cardId) => {
      const count = Math.max(0, Math.trunc(Number(quantity) || 0));
      const card = window.ProjectWInformation?.getCard?.(cardId);
      for (let index = 0; index < count; index += 1) {
        values.information += informationSaleValue(card, informationOffset + index);
      }
      informationOffset += count;
    });
    proposal[owner].notes.forEach((quantity, denominationId) => {
      values.notes += (Number(denominationId) || 0) * quantity;
    });
    values.total = values.goods + values.currencies + values.information + values.notes;
    return values;
  }

  function proposalHasGoods() {
    return ["player", "merchant"].some(owner => (
      [...proposal[owner].goods.values()].some(quantity => Math.max(0, Math.trunc(Number(quantity) || 0)) > 0)
    ));
  }

  function offerValue(owner) {
    return offerBreakdown(owner).total;
  }

  function balanceResult(playerTotal, merchantTotal) {
    const playerBreakdown = offerBreakdown("player");
    const merchantBreakdown = offerBreakdown("merchant");
    const rawPlayerValue = Math.max(0, Math.trunc(Number(playerTotal) || playerBreakdown.total || 0));
    const bargain = current?.currencyOnly ? { bonusPercent: 0 } : getBargainProfile(bargainContext());
    const bargainBonusPercent = Math.max(0, Number(bargain?.bonusPercent) || 0);
    const bargainBasisValue = current?.currencyOnly
      ? 0
      : Math.max(0, playerBreakdown.goods, merchantBreakdown.goods);
    const bargainAllowance = Math.floor(bargainBasisValue * bargainBonusPercent / 100);
    const merchantValue = Math.max(0, Math.trunc(Number(merchantTotal) || merchantBreakdown.total || 0));
    const exchangeFeeRate = current?.currencyOnly ? calculateExchangeFeeRate() : 0;
    const exchangeFee = current?.currencyOnly ? Math.ceil(merchantValue * exchangeFeeRate / 100) : 0;
    const requiredPlayerValue = merchantValue + exchangeFee;
    const bargainRecognizedValue = current?.currencyOnly ? 0 : bargainAllowance;
    const bargainUsedValue = current?.currencyOnly
      ? 0
      : Math.min(bargainAllowance, Math.max(0, requiredPlayerValue - rawPlayerValue));
    const playerValue = rawPlayerValue + bargainRecognizedValue;
    const playerMaximumValue = playerValue;
    const combinedRawValue = rawPlayerValue + merchantValue;
    const nonCurrencyAssetValue = playerBreakdown.goods
      + merchantBreakdown.goods
      + playerBreakdown.information
      + merchantBreakdown.information;
    const nonCurrencyAssetRatio = combinedRawValue > 0 ? nonCurrencyAssetValue / combinedRawValue * 100 : 0;
    const nonCurrencyAssetRequired = !current?.currencyOnly;
    const nonCurrencyAssetValid = !nonCurrencyAssetRequired || nonCurrencyAssetRatio + .0001 >= 45;
    if (playerValue <= 0 || merchantValue <= 0) {
      return {
        valid: false,
        playerValue,
        playerMaximumValue,
        rawPlayerValue,
        bargainBonusPercent,
        bargainBasisValue,
        bargainAllowance,
        bargainRecognizedValue,
        bargainUsedValue,
        merchantValue,
        exchangeFee,
        exchangeFeeRate,
        requiredPlayerValue,
        nonCurrencyAssetValue,
        nonCurrencyAssetRatio,
        nonCurrencyAssetValid,
        difference: 100,
        merchantDisadvantaged: false,
        message: "양쪽에 상품이나 화폐를 올려주세요."
      };
    }
    const difference = Math.abs(playerValue - requiredPlayerValue) / Math.max(playerValue, requiredPlayerValue) * 100;
    const merchantDisadvantaged = playerValue < requiredPlayerValue;
    const valueRangeValid = difference <= 20 && (!current?.currencyOnly || !merchantDisadvantaged);
    const valid = valueRangeValid && nonCurrencyAssetValid;
    return {
      valid,
      playerValue,
      playerMaximumValue,
      rawPlayerValue,
      bargainBonusPercent,
      bargainBasisValue,
      bargainAllowance,
      bargainRecognizedValue,
      bargainUsedValue,
      merchantValue,
      exchangeFee,
      exchangeFeeRate,
      requiredPlayerValue,
      nonCurrencyAssetValue,
      nonCurrencyAssetRatio,
      nonCurrencyAssetValid,
      difference,
      merchantDisadvantaged,
      message: !nonCurrencyAssetValid
        ? `비화폐 거래자산 ${formatNumber(nonCurrencyAssetRatio)}% · 일반 상점 거래는 상품과 정보가 양측 가치 합계의 45% 이상이어야 합니다.`
        : current?.currencyOnly && merchantDisadvantaged
        ? `환전 할증 ${formatNumber(exchangeFeeRate)}%를 포함한 가치보다 지불 가치가 낮습니다.`
        : difference <= 20
          ? `가치 차이 ${formatNumber(difference)}% · 비화폐 거래자산 ${formatNumber(nonCurrencyAssetRatio)}% · 거래할 수 있습니다.`
          : `가치 차이 ${formatNumber(difference)}% · 20% 이내로 맞춰야 합니다.`
    };
  }

  function bargainContext() {
    return current ? {
      facilityKey: current.bargainKey,
      facilityType: current.facilityType,
      settlementId: current.settlement?.id || "",
      facilityId: current.facilityId,
      knowledgeItemBonus: knowledgeBargainChanceBonus()
    } : {};
  }

  function knowledgeBargainChanceBonus() {
    const eligibleItems = new Set();
    ["player", "merchant"].forEach(owner => {
      proposal[owner].goods.forEach((quantity, key) => {
        const entry = tradeEntry(owner, key);
        if (!entry?.definition || !knowledgeProfile(entry.definition, entry).showBargainChanceBonus) return;
        if (Math.max(0, Math.trunc(Number(quantity) || 0)) > 0) eligibleItems.add(entry.definition.id);
      });
    });
    return Math.min(3, eligibleItems.size) * 4;
  }

  function renderBargainControl() {
    if (!elements.bargain) return;
    const availableFacility = Boolean(current && !current.currencyOnly && ["시장", "좌판", "교역소", "상회"].includes(current.facilityType));
    elements.bargain.hidden = !availableFacility;
    if (!availableFacility) return;
    const profile = getBargainProfile(bargainContext());
    const hasGoods = proposalHasGoods();
    const count = elements.bargain.querySelector("span");
    if (count) count.textContent = `${profile.attemptsRemaining} / ${profile.attemptsMaximum}`;
    elements.bargain.disabled = !hasGoods || !profile.available || profile.attemptsRemaining <= 0;
    const knowledgeBonus = Math.max(0, Number(profile.knowledgeItemBonus) || 0);
    const tooltip = hasGoods
      ? `성공 확률 ${formatNumber(profile.chance)}%${knowledgeBonus > 0 ? `\n상품 지식 보정 +${formatNumber(knowledgeBonus)}%` : ""}\n성공 시 상품가 기준 +${formatNumber(profile.valuePerSuccess)}% · 실패 시 -${formatNumber(profile.valuePerFailure)}% · 최저 0%\n현재 흥정 보정 +${formatNumber(profile.bonusPercent)}% · 누적 상한 ${formatNumber(profile.valueMaximum)}%`
      : "거래안에 상품을 올리면 흥정할 수 있습니다. 화폐·정보·어음에는 양보 한도가 생기지 않습니다.";
    elements.bargain.dataset.bargainTooltip = tooltip;
    elements.bargain.setAttribute("aria-label", `흥정. ${tooltip.replaceAll("\n", ". ")}`);
    elements.bargain.classList.toggle("has-attempts", hasGoods && profile.available && profile.attemptsRemaining > 0);
    elements.bargain.classList.toggle("has-success", profile.bonusPercent > 0);
  }

  function handleBargain() {
    if (!current || current.currencyOnly) return;
    const result = attemptBargain(bargainContext());
    if (!result || result.unavailable) return;
    showBargainDialogue(result.success ? "DL_GH_001" : "DL_GH_002", result.success);
    render();
  }

  function calculateExchangeFeeRate() {
    return current?.currencyOnly ? 3 : 0;
  }

  function confirmTrade() {
    if (!current) return;
    if (proposal.player.notes.size > 0 && proposal.merchant.goods.size <= 0) {
      notify("어음은 상회의 상품을 구입할 때만 사용할 수 있습니다. 화폐 환전은 대도시 상업조합에서 진행하세요.");
      render();
      return;
    }
    const playerPaidValue = offerValue("player");
    const balance = balanceResult(playerPaidValue, offerValue("merchant"));
    if (!balance.valid) {
      notify(balance.message);
      render();
      return;
    }
    for (const [key, quantity] of proposal.player.goods) {
      if (quantity > availableQuantity("player", "goods", key)) return failChangedStock();
    }
    for (const [key, quantity] of proposal.merchant.goods) {
      if (quantity > availableQuantity("merchant", "goods", key)) return failChangedStock();
    }
    for (const [key, quantity] of proposal.player.currencies) {
      if (quantity > availableQuantity("player", "currencies", key)) return failChangedStock();
    }
    for (const [key, quantity] of proposal.merchant.currencies) {
      if (quantity > availableQuantity("merchant", "currencies", key)) return failChangedStock();
    }
    for (const [key, quantity] of proposal.player.information) {
      if (quantity > availableQuantity("player", "information", key)) return failChangedStock();
    }
    for (const [key, quantity] of proposal.player.notes) {
      if (quantity > availableQuantity("player", "notes", key)) return failChangedStock();
    }
    const currencyTransferred = proposal.player.currencies.size > 0 || proposal.merchant.currencies.size > 0;

    const playerItems = new Map(window.ProjectWCargo.getInventoryItems().map(item => [item.instanceId, item]));
    const playerGoodsValue = offerBreakdown("player").goods;
    const merchantGoodsValue = offerBreakdown("merchant").goods;
    const combinedGoodsValue = playerGoodsValue + merchantGoodsValue;
    const saleBargainValue = combinedGoodsValue > 0
      ? balance.bargainUsedValue * playerGoodsValue / combinedGoodsValue
      : 0;
    const purchaseBargainValue = combinedGoodsValue > 0
      ? balance.bargainUsedValue * merchantGoodsValue / combinedGoodsValue
      : 0;
    const saleBargainPercent = playerGoodsValue > 0 ? saleBargainValue / playerGoodsValue * 100 : 0;
    const purchaseBargainPercent = merchantGoodsValue > 0 ? purchaseBargainValue / merchantGoodsValue * 100 : 0;
    const purchaseJourneyIds = new Map();
    const saleOffsets = new Map();
    const bargainSuccesses = Math.max(0, Math.trunc(Number(getBargainProfile(bargainContext())?.successes) || 0));
    let merchantProfit = 0;
    let soldCargoQuantity = 0;
    let soldInformationQuantity = 0;
    const knowledgeTransactions = [];
    const soldInformationIds = [];
    const purchasedNahanaGift = [...proposal.merchant.goods].some(([lotId, quantity]) => {
      return quantity > 0 && merchantLot(lotId)?.itemId === NAHANA_EVENT_GIFT_ITEM_ID;
    });
    proposal.merchant.goods.forEach((quantity, lotId) => {
      const lot = merchantLot(lotId);
      const definition = lot ? current.definitionsById.get(lot.itemId) : null;
      if (!lot || !definition) return;
      if (lot.itemId === NAHANA_EVENT_GIFT_ITEM_ID) return;
      const journeyId = window.ProjectWMerchantPath?.createJourneyId?.(lot.itemId) || `JOURNEY_${lot.itemId}_${Date.now()}_${lotId}`;
      const purchaseValuation = merchantSellValuation(lot, definition);
      const bargainedPurchaseValue = Math.max(0, Math.round(purchaseValuation.value * (1 - (purchaseBargainPercent / 100))));
      const bargainBenefitValue = purchaseValuation.value * purchaseBargainPercent / 100;
      purchaseJourneyIds.set(lotId, journeyId);
      knowledgeTransactions.push({
        direction: "buy",
        itemId: lot.itemId,
        quantity,
        unitValue: bargainedPurchaseValue,
        journeyId,
        durability: lot.durability,
        bargainSuccesses,
        bargainBenefitValue: Math.max(0, Math.round(bargainBenefitValue)),
        reviewFactors: tradeReviewFactors(purchaseValuation, "buy", -purchaseBargainPercent)
      });
    });
    proposal.player.goods.forEach((quantity, tradeKey) => {
      const item = playerItems.get(playerInstanceId(tradeKey));
      if (!item) return;
      const saleValuation = playerSellValuation(item, item.definition);
      const saleValue = saleValuation.value;
      const bargainedSaleValue = Math.floor(saleValue * (1 + (saleBargainPercent / 100)));
      const bargainBenefitValue = saleValue * saleBargainPercent / 100;
      const instanceId = playerInstanceId(tradeKey);
      const offset = saleOffsets.get(instanceId) || 0;
      merchantProfit += merchantExperienceForCargoSale(item, quantity, saleValue, saleBargainPercent);
      soldCargoQuantity += quantity;
      knowledgeTransactions.push({
        direction: "sell",
        itemId: item.itemId,
        quantity,
        unitValue: bargainedSaleValue,
        durability: item.durability,
        journeyLots: sliceJourneyLots(item.journeyLots, offset, quantity),
        bargainSuccesses,
        bargainBenefitValue: Math.max(0, Math.round(bargainBenefitValue)),
        reviewFactors: tradeReviewFactors(saleValuation, "sell", saleBargainPercent)
      });
      saleOffsets.set(instanceId, offset + quantity);
    });
    proposal.player.information.forEach((quantity, cardId) => {
      const card = window.ProjectWInformation?.getCard?.(cardId);
      if (!card || quantity <= 0) return;
      soldInformationIds.push(cardId);
      soldInformationQuantity += Math.max(0, Math.trunc(Number(quantity) || 0));
    });
    const exchange = proposedCargoExchange(purchaseJourneyIds);
    if (!window.ProjectWCargo.previewExchange(exchange).possible || !window.ProjectWCargo.applyExchange(exchange)) {
      elements.balanceStatus.textContent = "화물칸이 부족해 거래를 완료할 수 없습니다.";
      elements.balanceStatus.classList.remove("is-valid");
      notify("화물칸이 부족해 거래를 완료할 수 없습니다.");
      return;
    }

    proposal.merchant.goods.forEach((quantity, lotId) => {
      const lot = merchantLot(lotId);
      if (lot) lot.quantity = Math.max(0, lot.quantity - quantity);
    });
    proposal.player.goods.forEach((quantity, tradeKey) => {
      const item = playerItems.get(playerInstanceId(tradeKey));
      if (!item) return;
      current.merchant.stockLots.push({
        lotId: `${current.merchantKey}|resale|${Date.now()}|${String(current.merchant.stockLots.length + 1).padStart(3, "0")}`,
        itemId: item.itemId,
        quantity,
        baseQuantity: Math.max(1, quantity),
        quality: item.quality,
        qualityRoll: item.qualityRoll,
        originId: item.originId,
        originName: item.originName,
        originDistance: item.originDistance,
        originProductKind: originProductKindFor(item, item.definition),
        sourceType: "resale",
        importMarkup: 5 + (clamp(Number.isFinite(Number(item.qualityRoll)) ? Number(item.qualityRoll) : .5, 0, 1) * 10),
        durability: item.durability,
        displayOrder: current.merchant.stockLots.length
      });
    });

    const playerWallet = normalizeWallet(getPlayerWallet());
    proposal.player.currencies.forEach((quantity, currencyId) => {
      playerWallet[currencyId] = walletQuantity(playerWallet, currencyId) - quantity;
      current.merchant.wallet[currencyId] = walletQuantity(current.merchant.wallet, currencyId) + quantity;
    });
    proposal.merchant.currencies.forEach((quantity, currencyId) => {
      current.merchant.wallet[currencyId] = walletQuantity(current.merchant.wallet, currencyId) - quantity;
      playerWallet[currencyId] = walletQuantity(playerWallet, currencyId) + quantity;
    });
    setPlayerWallet(playerWallet);
    if (proposal.player.notes.size) {
      setPlayerBillNotes(window.ProjectWBillNotes.addSelection(getPlayerBillNotes(), proposal.player.notes, -1));
    }
    if (soldInformationIds.length) {
      window.ProjectWInformation?.recordSale?.(soldInformationIds, current.merchantKey, current.companyName || "");
      consumeCompanyInformationCapacity(current.companyName, soldInformationQuantity);
    }
    persistState();
    window.ProjectWMerchantPath?.recordTrade(knowledgeTransactions, {
      settlementId: current.settlement?.id || "",
      settlementName: current.settlement?.name || "이름 없는 거점",
      facilityType: current.facilityType,
      companyName: current.companyName || "",
      bargainSuccesses
    });
    const merchantProgress = !current.currencyOnly && merchantProfit > 0
      ? recordMerchantProfit(Math.floor(merchantProfit))
      : null;
    const companyTrade = current.facilityType === "상회" && (knowledgeTransactions.length || soldInformationIds.length)
      ? window.ProjectWMerchantPath?.recordCompanyTrade({
        name: current.companyName,
        paidValue: playerPaidValue * Math.max(1, Number(getCompanyScoreMultiplier()) || 1)
      })
      : null;
    if (purchasedNahanaGift) {
      void window.ProjectWNahanaEvents?.completeMarketGiftPurchase?.({
        settlementId: current.settlement?.id || "",
        facilityType: current.facilityType
      });
    }
    proposal = createProposal();
    if (!current.currencyOnly) completeBargainTrade(bargainContext());
    render();
    if (elements.companyInformationButton && current.facilityType === "상회") {
      updateCompanyInformationButton(elements.companyInformationButton, current.companyName, current.settlement);
    }
    const completionDetails = [];
    if (companyTrade?.earnedScore > 0) completionDetails.push(`${current.companyName} 이용점수 +${formatNumber(companyTrade.earnedScore)}`);
    if (soldInformationQuantity > 0 && current.facilityType === "상회") {
      const capacity = companyInformationCapacityProfile();
      completionDetails.push(`정보 수용량 ${formatNumber(capacity.current)} / ${formatNumber(capacity.maximum)}`);
    }
    if (soldCargoQuantity > 0) {
      if (Number(merchantProgress?.gained) > 0) {
        completionDetails.push(`상인 경험치 +${formatNumber(merchantProgress.gained)}`);
        if (Number(merchantProgress.levels) > 0) completionDetails.push(`상인 레벨 +${formatNumber(merchantProgress.levels)}`);
      } else if (Number(merchantProgress?.level) >= 50) {
        completionDetails.push("상인 레벨 최대");
      } else {
        completionDetails.push("상인 경험치 없음 · 판매 차익 0 이하");
      }
    }
    elements.dataStatus.textContent = current.currencyOnly
      ? "환전이 완료되어 양쪽 지갑에 반영되었습니다."
      : completionDetails.length
        ? `거래가 완료되었습니다. ${completionDetails.join(" · ")}`
        : "거래가 완료되어 화물과 화폐에 반영되었습니다.";
    elements.dataStatus.hidden = false;
    elements.dataStatus.classList.remove("is-warning");
    if (currencyTransferred) window.ProjectWAudio?.playCurrencyCompletion?.("trade");
    else window.ProjectWAudio?.playEffect("trade");
    const merchantXpNotice = Number(merchantProgress?.gained) > 0
      ? ` 상인 경험치 +${formatNumber(merchantProgress.gained)}.`
      : "";
    notify(current.currencyOnly ? "환전을 완료했습니다." : `${current.facilityLabel}에서 거래를 완료했습니다.${merchantXpNotice}`);
  }

  function failChangedStock() {
    proposal = createProposal();
    render();
    notify("보유 수량이나 재고가 바뀌어 거래안을 초기화했습니다.");
  }

  function normalizeWallet(wallet) {
    return Object.fromEntries(Object.entries(wallet || {}).map(([currencyId, value]) => [currencyId, walletQuantity(wallet, currencyId)]));
  }

  function walletQuantity(wallet, currencyId) {
    const value = wallet?.[currencyId];
    const quantity = typeof value === "object" && value !== null ? value.quantity : value;
    return Math.max(0, Math.trunc(Number(quantity) || 0));
  }

  function tradeName(definition, revealAll = false) {
    if (!revealAll) return knowledgeProfile(definition).name;
    return String(definition?.name1 || definition?.name2 || definition?.name3 || definition?.displayName || definition?.id || "상품");
  }

  function knowledgeProfile(definition, metadata = {}) {
    if (definition?.id === NAHANA_EVENT_GIFT_ITEM_ID) {
      return {
        level: 7,
        name: String(definition.displayName || "깃털 자수 손수건"),
        showRarity: false,
        showDurability: false,
        showQuality: false,
        showOrigin: false,
        showCityStock: false,
        showDistance: false,
        showQualityNumber: false,
        showBargainChanceBonus: false,
        qualityText: ""
      };
    }
    if (window.ProjectWMerchantPath?.getDisplayProfile) {
      return window.ProjectWMerchantPath.getDisplayProfile(definition, metadata);
    }
    const nonTradeItem = isNonTradeCategory(definition?.category);
    return {
      level: 7,
      name: String(definition?.displayName || definition?.name1 || definition?.id || "상품"),
      showRarity: true,
      showDurability: true,
      showQuality: !nonTradeItem,
      showOrigin: !nonTradeItem,
      showOriginProduct: !nonTradeItem,
      showCityStock: !nonTradeItem,
      showDistance: !nonTradeItem,
      showQualityNumber: !nonTradeItem,
      showBargainChanceBonus: !nonTradeItem,
      qualityText: nonTradeItem ? "" : String(metadata.quality || "통상품질")
    };
  }

  function startMerchantCommentary() {
    merchantCommentSequence += 1;
    cancelMerchantComments();
    if (!current || !MERCHANT_COMMENT_FACILITIES.has(current.facilityType)) return;
    const sequence = merchantCommentSequence;
    const visitToken = String(getSettlementVisitToken() || `${current.settlement.id}:${current.worldTime.day}`).trim();
    const planKey = `${visitToken}|${current.merchantKey}`;
    let plan = merchantCommentPlans.get(planKey);
    if (plan === undefined) {
      const mood = clamp(Number(getPartnerMood()) || 0, 0, 100);
      const baseCommentCount = mood <= 33 ? 0 : mood <= 66 ? 2 : 3;
      const highMoodCommentBonus = mood >= 75 ? 1 : 0;
      const commentCount = baseCommentCount > 0
        ? Math.max(0, baseCommentCount + highMoodCommentBonus + Math.trunc(Number(getMerchantCommentBonus()) || 0))
        : 0;
      plan = createMerchantCommentPlan(commentCount);
      merchantCommentPlans.set(planKey, plan);
    }
    if (!plan.length) return;
    void runMerchantCommentary(sequence, plan);
  }

  function createMerchantCommentPlan(commentCount) {
    if (commentCount <= 0 || !current) return [];
    const candidates = current.merchant.stockLots
      .filter(lot => lot.quantity > 0 && !MERCHANT_COMMENT_EXCLUDED_IDS.has(lot.itemId))
      .map(lot => ({ lot, definition: current.definitionsById.get(lot.itemId) }))
      .filter(entry => entry.definition && !isNonTradeCategory(entry.definition.category))
      .filter(entry => merchantCommentDialogueIds(entry.lot, entry.definition)
        .some(id => current.facilityType !== "좌판" || id !== "DL_G_005"));
    if (!candidates.length) return [];
    const ordered = shuffled(candidates, Math.random);
    const targets = Array.from({ length: commentCount }, (_, index) => ordered[index % ordered.length]);
    return targets.map(({ lot, definition }) => {
      const trueIds = merchantCommentDialogueIds(lot, definition)
        .filter(id => current.facilityType !== "좌판" || id !== "DL_G_005");
      const falseIds = MERCHANT_COMMENT_MISREAD_DIALOGUES
        .filter(id => current.facilityType !== "좌판" || id !== "DL_G_005")
        .filter(id => !trueIds.includes(id));
      const tier = clamp(Math.trunc(Number(definition.rarity) || 1), 1, 4);
      const tierMisreadChance = 1 - (MERCHANT_COMMENT_ACCURACY_BY_TIER.get(tier) || .8);
      const configuredMisreadChance = getMerchantCommentMisreadChance();
      const hasConfiguredMisreadChance = configuredMisreadChance !== null
        && configuredMisreadChance !== undefined
        && configuredMisreadChance !== ""
        && Number.isFinite(Number(configuredMisreadChance));
      const misreadChance = hasConfiguredMisreadChance
        ? clamp(Number(configuredMisreadChance), 0, 1)
        : tierMisreadChance;
      const useWrongComment = Math.random() < misreadChance && falseIds.length;
      const pool = useWrongComment ? falseIds : prioritizedMerchantCommentIds(trueIds);
      return {
        dialogueId: pool[Math.floor(Math.random() * pool.length)],
        itemName: knowledgeProfile(definition, lot).name,
        itemKey: lot.lotId
      };
    }).filter(entry => entry.dialogueId);
  }

  function prioritizedMerchantCommentIds(dialogueIds) {
    if (dialogueIds.includes("DL_G_002")) return ["DL_G_002"];
    const priceIds = dialogueIds.filter(id => id === "DL_G_003" || id === "DL_G_004");
    return priceIds.length ? priceIds : dialogueIds;
  }

  async function runMerchantCommentary(sequence, plan) {
    try {
      for (let index = 0; index < plan.length; index += 1) {
        await waitForMerchantComment(index === 0 ? randomInteger(Math.random, 3000, 6000) : randomInteger(Math.random, 10000, 15000));
        if (sequence !== merchantCommentSequence || !current || elements.modal.hidden) return;
        if (clamp(Number(getPartnerMood()) || 0, 0, 100) <= 33) return;
        const { dialogueId, itemName, itemKey } = plan[index];
        const dialogue = await window.ProjectWDialogue.getDialogue(dialogueId);
        if (sequence !== merchantCommentSequence || !current || elements.modal.hidden) return;
        const page = dialogue.pages?.[0];
        if (!page) continue;
        await showMerchantComment(page, itemName, itemKey);
        if (sequence !== merchantCommentSequence || !current || elements.modal.hidden) return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function merchantCommentDialogueIds(lot, definition) {
    const ids = [];
    if (lot.quality === "고품질" || lot.quality === "명품") ids.push("DL_G_001");
    const priceContext = merchantAdvicePriceContext(lot, definition);
    if (lot.quality === "저품질" || priceContext.conditionRatio <= MERCHANT_COMMENT_BAD_DURABILITY_RATIO) ids.push("DL_G_002");
    if (priceContext.marketRatio <= .8) ids.push("DL_G_003");
    if (priceContext.marketRatio >= 1.2) ids.push("DL_G_004");
    if (lot.sourceType === "import" || lot.sourceType === "logistics") ids.push("DL_G_005");
    if (lot.sourceType === "production") ids.push("DL_G_006");
    const category = String(definition.category || "").replaceAll(" ", "");
    if (category === "식료품" || category === "주류") ids.push("DL_G_007");
    if (category === "향료" || category === "향신료") ids.push("DL_G_008");
    if (category === "귀중품") ids.push("DL_G_009");
    return [...new Set(ids)];
  }

  function merchantAdvicePriceContext(lot, definition) {
    const valuation = merchantSellValuation(lot, definition);
    const baseValue = Math.max(0, Number(definition?.baseValue) || 0);
    const maximumDurability = Math.max(1, Number(valuation.durabilityMaximum) || Number(definition?.durability) || 1);
    const currentDurability = clamp(Number(valuation.durabilityCurrent) || 0, 0, maximumDurability);
    const conditionRatio = maximumDurability >= INDESTRUCTIBLE_DURABILITY
      ? 1
      : currentDurability / maximumDurability;
    const qualityMultiplier = Math.max(.1, 1 + ((Number(valuation.qualityAdjustment) || 0) / 100));
    const sourceMarketMultiplier = Math.max(.25, 1 + ((Number(valuation.distanceAdjustment) || 0) / 100));
    const currentMarketMultiplier = Math.max(.25, Number(valuation.multiplier) || 1);
    const importMultiplier = Math.max(.1, 1 + ((Number(valuation.importMarkup) || 0) / 100));
    const durabilityMultiplier = Math.max(0, Number(valuation.durabilityPercent) || 0) / 100;
    const adjustedReferenceValue = baseValue
      * qualityMultiplier
      * sourceMarketMultiplier
      * importMultiplier
      * durabilityMultiplier;
    const currentMarketValue = baseValue
      * qualityMultiplier
      * currentMarketMultiplier
      * importMultiplier
      * durabilityMultiplier;
    return {
      conditionRatio,
      adjustedReferenceValue,
      currentMarketValue,
      marketRatio: adjustedReferenceValue > 0 ? currentMarketValue / adjustedReferenceValue : 1
    };
  }

  function waitForMerchantComment(milliseconds) {
    return new Promise(resolve => window.setTimeout(resolve, milliseconds));
  }

  function close() {
    if (!elements.modal || elements.modal.hidden) return;
    dismissMerchantCommentary();
    window.ProjectWCargo.hideTooltip();
    elements.modal.hidden = true;
    delete elements.modal.dataset.facilityType;
    elements.modal.classList.remove("is-currency-exchange");
    if (elements.exchangeFocus) elements.exchangeFocus.hidden = true;
    if (elements.snackButton) {
      elements.snackButton.hidden = true;
      elements.snackButton.disabled = true;
    }
    if (elements.currencyRatesButton) {
      elements.currencyRatesButton.hidden = true;
      elements.currencyRatesButton.disabled = true;
    }
    if (elements.companyInformationButton) {
      elements.companyInformationButton.hidden = true;
      elements.companyInformationButton.disabled = true;
    }
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", {
      detail: { open: false, facilityType: current?.facilityType || "" }
    }));
    window.dispatchEvent(new CustomEvent("projectw:tradeclose"));
    current = null;
    proposal = createProposal();
    offerFilters = { player: "all", merchant: "all" };
    merchantTravelFilterMode = "all";
    playerCatalogMode = "goods";
  }

  function dismissMerchantCommentary() {
    merchantCommentSequence += 1;
    cancelMerchantComments();
  }

  function isOpen() {
    return Boolean(elements.modal && !elements.modal.hidden);
  }

  function getResumeState() {
    if (!isOpen() || !current) return null;
    const serializeSide = side => ({
      goods: [...side.goods.entries()],
      currencies: [...side.currencies.entries()],
      information: [...side.information.entries()],
      notes: [...side.notes.entries()]
    });
    return {
      settlementId: String(current.settlement?.id || ""),
      facilityType: current.facilityType,
      facilityLabel: current.facilityLabel,
      facilityId: current.facilityId,
      companyName: current.companyName,
      companyAssetId: current.companyAssetId,
      proposal: {
        player: serializeSide(proposal.player),
        merchant: serializeSide(proposal.merchant)
      },
      offerFilters: { ...offerFilters },
      merchantTravelFilterMode,
      playerCatalogMode
    };
  }

  function restoreQuantityMap(entries) {
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
    await open({
      ...context,
      facilityType: snapshot.facilityType,
      facilityLabel: snapshot.facilityLabel,
      facilityId: snapshot.facilityId,
      companyName: snapshot.companyName,
      companyAssetId: snapshot.companyAssetId
    });
    if (!isOpen() || !current) return false;
    const restored = createProposal();
    ["player", "merchant"].forEach(owner => {
      ["goods", "currencies", "information", "notes"].forEach(kind => {
        restored[owner][kind] = restoreQuantityMap(snapshot.proposal?.[owner]?.[kind]);
      });
    });
    proposal = restored;
    offerFilters = {
      player: ["all", "goods", "currencies", "information", "notes"].includes(snapshot.offerFilters?.player)
        ? snapshot.offerFilters.player
        : current.currencyOnly ? "currencies" : "all",
      merchant: ["all", "goods", "currencies", "information", "notes"].includes(snapshot.offerFilters?.merchant)
        ? snapshot.offerFilters.merchant
        : current.currencyOnly ? "currencies" : "all"
    };
    merchantTravelFilterMode = ["all", "only", "hide"].includes(snapshot.merchantTravelFilterMode)
      ? snapshot.merchantTravelFilterMode
      : snapshot.merchantTravelOnly ? "only" : "all";
    playerCatalogMode = ["goods", "information", "notes"].includes(snapshot.playerCatalogMode)
      ? snapshot.playerCatalogMode
      : "goods";
    render();
    return true;
  }

  async function evaluateCargoAtSettlement(settlement) {
    if (!settlement?.id) return { items: [], totalValue: 0, source: "unavailable" };
    const previousCurrent = current;
    const [goodsResult, currencyResult, mapLoaded] = await Promise.all([
      window.ProjectWCargo.load(),
      window.ProjectWWallet.load(),
      window.ProjectWMapView.load()
    ]);
    const definitions = window.ProjectWCargo.getItemDefinitions();
    const currencies = window.ProjectWWallet.getCurrencies();
    const worldData = window.ProjectWMapView.getTradeWorldData();
    const worldTime = normalizeWorldTime(getWorldTime());
    const hasLocalMarket = (NON_COMPANY_TRADE_FACILITIES[settlement.category] || [])
      .some(facility => facility.id === "market");
    const marketFacilityId = hasLocalMarket ? "market" : "entry-tariff-market";
    const merchantKey = `${settlement.id}|${marketFacilityId}`;

    ensureSettlementMerchants({
      settlement,
      definitions,
      currencies,
      catalogSource: goodsResult?.source,
      worldData,
      worldTime
    });
    const ensured = ensureMerchant({
      merchantKey,
      settlement,
      facilityType: "시장",
      definitions,
      currencies,
      catalogSource: goodsResult?.source,
      worldData,
      worldTime
    });
    current = {
      settlement,
      facilityType: "시장",
      facilityLabel: "입장 관세 시세",
      facilityId: marketFacilityId,
      companyName: "",
      companyAssetId: "",
      merchantKey,
      merchant: ensured.merchant,
      worldData,
      worldTime,
      definitions,
      definitionsById: new Map(definitions.map(definition => [definition.id, definition])),
      currencies,
      currenciesById: new Map(currencies.map(currency => [currency.id, currency])),
      goodsSource: goodsResult?.source || "fallback",
      currencySource: currencyResult?.source || window.ProjectWWallet.getDataSource(),
      mapSource: mapLoaded && worldData.loaded ? "csv" : "unavailable",
      unresolvedProducts: ensured.unresolvedProducts
    };

    try {
      const items = window.ProjectWCargo.getInventoryItems().map(item => {
        const definition = item.definition || current.definitionsById.get(item.itemId);
        const quantity = Math.max(1, Math.trunc(Number(item.quantity) || 1));
        const valuation = playerSellValuation(item, definition);
        return {
          instanceId: item.instanceId,
          itemId: item.itemId,
          name: knowledgeProfile(definition, item).name,
          category: definition?.category || "미분류",
          quantity,
          slots: Math.max(1, Number(definition?.slotCount) || 1),
          weight: Math.max(0, Number(definition?.weight) || 0) * quantity,
          unitValue: valuation.value,
          totalValue: valuation.value * quantity,
          quality: item.quality,
          qualityRoll: item.qualityRoll,
          originId: item.originId,
          durability: item.durability,
          durabilityMaximum: definition?.durability,
          originName: item.originName || ""
        };
      });
      return {
        items,
        totalValue: items.reduce((sum, item) => sum + item.totalValue, 0),
        source: current.mapSource === "csv" && current.goodsSource === "csv" && current.currencySource === "csv"
          ? "csv"
          : "fallback"
      };
    } finally {
      current = previousCurrent;
    }
  }

  async function getInformationSignals() {
    const previousCurrent = current;
    const previousProposal = proposal;
    const [goodsResult, currencyResult, mapLoaded] = await Promise.all([
      window.ProjectWCargo.load(),
      window.ProjectWWallet.load(),
      window.ProjectWMapView.load(),
      window.ProjectWCityEvents.load()
    ]);
    await window.ProjectWCityEvents.ensureCurrentDay();
    const definitions = window.ProjectWCargo.getItemDefinitions();
    const currencies = window.ProjectWWallet.getCurrencies();
    const worldData = window.ProjectWMapView.getTradeWorldData();
    const worldTime = normalizeWorldTime(getWorldTime());
    const definitionsById = new Map(definitions.map(definition => [definition.id, definition]));
    const definitionsByName = new Map(definitions.map(definition => [definition.name1, definition]));
    const market = [];
    const production = [];
    const logistics = [];
    try {
      for (const settlement of worldData.nodes || []) {
        ensureSettlementMerchants({ settlement, definitions, currencies, catalogSource: goodsResult?.source, worldData, worldTime });
        const facility = tradeFacilitiesForSettlement(settlement).find(entry => entry.type !== "환전상")
          || { id: "market", type: "시장" };
        const merchantKey = `${settlement.id}|${facility.id}`;
        const ensured = ensureMerchant({
          merchantKey,
          settlement,
          facilityType: facility.type,
          definitions,
          currencies,
          catalogSource: goodsResult?.source,
          worldData,
          worldTime
        });
        current = {
          settlement,
          facilityType: facility.type,
          facilityId: facility.id,
          merchantKey,
          merchant: ensured.merchant,
          worldData,
          worldTime,
          definitions,
          definitionsById,
          currencies,
          currenciesById: new Map(currencies.map(currency => [currency.id, currency])),
          goodsSource: goodsResult?.source || "fallback",
          currencySource: currencyResult?.source || window.ProjectWWallet.getDataSource(),
          mapSource: mapLoaded && worldData.loaded ? "csv" : "unavailable"
        };
        proposal = createProposal();
        const subcategories = new Set(Object.keys(settlement.demandScores || {}));
        settlementStockLots().forEach(lot => {
          const definition = definitionsById.get(lot.itemId);
          if (definition && !isNonTradeCategory(definition.category)) subcategories.add(definition.subcategory);
        });
        (settlement.productionNames || []).forEach(name => {
          const definition = definitionsByName.get(name);
          if (definition && !isNonTradeCategory(definition.category)) subcategories.add(definition.subcategory);
        });
        subcategories.forEach(subcategory => {
          if (!subcategory) return;
          const summary = marketIndexSummary(subcategory, { persistSupply: false });
          market.push({
            settlementId: settlement.id,
            settlementName: settlement.name,
            subcategory,
            index: summary.marketIndex,
            state: marketStateLabel(summary.marketIndex)
          });
        });
        const week = Math.floor((worldTime.day - 1) / RESTOCK_INTERVAL_DAYS);
        const productionSubcategories = new Set((settlement.productionNames || []).flatMap(name => {
          const definition = definitionsByName.get(name);
          return definition && !isNonTradeCategory(definition.category) ? [definition.subcategory] : [];
        }));
        const productionSelectionRng = seededRandom(`${settlement.id}|production-information|${week}`);
        shuffled([...productionSubcategories], productionSelectionRng).slice(0, 1).forEach(subcategory => {
          const rng = seededRandom(`${settlement.id}|${subcategory}|production-information|${week}`);
          production.push({
            settlementId: settlement.id,
            settlementName: settlement.name,
            subcategory,
            direction: rng() < .5 ? "UP" : "DOWN"
          });
        });
        if (["도시", "대도시"].includes(settlement.category)) {
          const localNames = new Set(settlement.productionNames || []);
          const importSubcategories = new Set(definitions.flatMap(definition => {
            if (isNonTradeCategory(definition.category) || localNames.has(definition.name1)) return [];
            return producingNodes(definition, worldData.nodes).length ? [definition.subcategory] : [];
          }));
          const logisticsSelectionRng = seededRandom(`${settlement.id}|logistics-information|${week}`);
          shuffled([...importSubcategories], logisticsSelectionRng).slice(0, 2).forEach(subcategory => {
            const rng = seededRandom(`${settlement.id}|${subcategory}|logistics-information|${week}`);
            logistics.push({
              settlementId: settlement.id,
              settlementName: settlement.name,
              subcategory,
              direction: rng() < .5 ? "ARRIVAL" : "DELAY"
            });
          });
        }
      }
    } finally {
      current = previousCurrent;
      proposal = previousProposal;
    }
    persistState();
    return { market, production, logistics };
  }

  function marketIndexSummary(subcategory, options = {}) {
    const demandScore = settlementDemandScore(current?.settlement, subcategory);
    const demandAdjustment = Math.min(30, demandScore * 3);
    const weeklySupplyAdjustment = regionalWeeklySupplyAdjustment(subcategory, { persist: options.persistSupply !== false });
    const stockAdjustment = subcategorySupplyPressure(subcategory);
    const cityEventPriceAdjustment = Number(getCityEventModifiers(current.settlement).priceBySubcategory?.[subcategory]) || 0;
    const informationPriceAdjustment = marketInformationAdjustment(current.settlement.id, subcategory, current.worldTime?.day);
    const naturalMarketAdjustment = clamp(demandAdjustment + weeklySupplyAdjustment + stockAdjustment, -60, 60);
    return {
      demandAdjustment,
      weeklySupplyAdjustment,
      stockAdjustment,
      cityEventPriceAdjustment,
      informationPriceAdjustment,
      naturalMarketAdjustment,
      marketIndex: clamp(naturalMarketAdjustment + cityEventPriceAdjustment + informationPriceAdjustment, -85, 85)
    };
  }

  function marketStateLabel(index) {
    if (index >= 50) return "SURGE";
    if (index >= 25) return "HIGH";
    if (index <= -50) return "CRASH";
    if (index <= -25) return "LOW";
    return "STEADY";
  }

  function scheduleInformationRestockEffect(effect = {}) {
    const settlementId = String(effect.settlementId || "").trim();
    const subcategory = String(effect.subcategory || "").trim();
    const amount = Math.trunc(Number(effect.amount) || 0);
    if (!settlementId || !subcategory || !amount) return false;
    if (!state.restockEffects) state.restockEffects = [];
    if (effect.cardId && state.restockEffects.some(entry => entry.cardId === effect.cardId)) return false;
    const merchantEntries = Object.entries(state.merchants)
      .filter(([key]) => key.startsWith(`${settlementId}|`) && !key.endsWith("|currency-exchange"))
      .sort((left, right) => (Number(left[1].nextRefreshTick) || 0) - (Number(right[1].nextRefreshTick) || 0));
    const merchantKey = merchantEntries[0]?.[0];
    if (!merchantKey) return false;
    state.restockEffects.push({
      id: `RESTOCK_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      cardId: String(effect.cardId || ""),
      settlementId,
      merchantKey,
      subcategory,
      sourceType: effect.sourceType === "production" ? "production" : "import",
      amount,
      guarantee: Boolean(effect.guarantee)
    });
    persistState();
    return true;
  }

  function refresh() {
    if (current && elements.modal && !elements.modal.hidden) render();
  }

  function focusMerchantItem(itemKey) {
    if (!current || elements.modal?.hidden || !elements.merchantItems) return false;
    const key = String(itemKey || "");
    const target = [...elements.merchantItems.querySelectorAll(".trade-item-stack")]
      .find(item => item.dataset.tradeLotId === key || item.dataset.tradeItemId === key);
    if (!target) return false;
    target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    target.classList.remove("is-advice-focus");
    window.requestAnimationFrame(() => target.classList.add("is-advice-focus"));
    window.setTimeout(() => target.classList.remove("is-advice-focus"), 1700);
    return true;
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(error);
    }
    state = createDefaultState();
    close();
  }

  function createDefaultState() {
    return { schemaVersion: 7, merchants: {}, marketSupply: {}, marketInformation: {}, companyInformationCapacity: {}, restockEffects: [] };
  }

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return createDefaultState();
      const parsed = JSON.parse(stored);
      if (![1, 2, 3, 4, 5, 6, 7].includes(parsed?.schemaVersion) || !parsed.merchants || typeof parsed.merchants !== "object") return createDefaultState();
      if (parsed.schemaVersion < 3) {
        Object.values(parsed.merchants).forEach(merchant => {
          if (merchant && typeof merchant === "object") merchant.stockLots = [];
        });
      }
      return {
        schemaVersion: 7,
        merchants: parsed.merchants,
        marketSupply: parsed.marketSupply && typeof parsed.marketSupply === "object" ? parsed.marketSupply : {},
        marketInformation: parsed.marketInformation && typeof parsed.marketInformation === "object" ? parsed.marketInformation : {},
        companyInformationCapacity: parsed.companyInformationCapacity && typeof parsed.companyInformationCapacity === "object"
          ? parsed.companyInformationCapacity
          : {},
        restockEffects: Array.isArray(parsed.restockEffects) ? parsed.restockEffects.map(effect => ({
          id: String(effect?.id || ""),
          cardId: String(effect?.cardId || ""),
          settlementId: String(effect?.settlementId || ""),
          merchantKey: String(effect?.merchantKey || ""),
          subcategory: String(effect?.subcategory || ""),
          sourceType: effect?.sourceType === "production" ? "production" : "import",
          amount: Math.trunc(Number(effect?.amount) || 0),
          guarantee: Boolean(effect?.guarantee)
        })).filter(effect => effect.id && effect.settlementId && effect.merchantKey && effect.subcategory && effect.amount) : []
      };
    } catch (error) {
      console.error(error);
      return createDefaultState();
    }
  }

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error(error);
      notify("상인의 재고 상태를 저장하지 못했습니다.");
    }
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(Number(value) || 0);
  }

  function normalizeWorldTime(value) {
    return {
      day: Math.max(1, Math.trunc(Number(value?.day) || 1)),
      phaseIndex: clamp(Math.trunc(Number(value?.phaseIndex) || 0), 0, TIME_PHASE_COUNT - 1)
    };
  }

  function worldTimeTick(time) {
    const normalized = normalizeWorldTime(time);
    return ((normalized.day - 1) * TIME_PHASE_COUNT) + normalized.phaseIndex;
  }

  function seededRandom(seedText) {
    let seed = 2166136261;
    for (const character of `${String(getWorldSeed() || "legacy-world")}|${String(seedText)}`) {
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

  function shuffled(items, rng) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(rng() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function randomInteger(rng, minimum, maximum) {
    return Math.floor(randomRange(rng, minimum, maximum + 1));
  }

  function randomRange(rng, minimum, maximum) {
    return minimum + ((maximum - minimum) * rng());
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  window.ProjectWTrade = {
    init,
    open,
    close,
    isOpen,
    getResumeState,
    restoreResumeState,
    refresh,
    focusMerchantItem,
    dismissMerchantCommentary,
    reset,
    evaluateCargoAtSettlement,
    getInformationSignals,
    applyMarketInformationShock,
    dampenMarketInformation,
    scheduleInformationRestockEffect
  };
}());
