(function exposeCargoInventory() {
  const STORAGE_KEY = "project_w_cargo_v1";
  const GOODS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=2011429512&single=true&output=csv";
  const COLUMN_COUNT = 1;
  const ROW_COUNT = 30;
  const SLOT_COUNT = COLUMN_COUNT * ROW_COUNT;
  const COMPARTMENT_CAPACITIES = Object.freeze({ normal: SLOT_COUNT, protected: 30, secret: 3 });
  const DEFAULT_MAX_WEIGHT = 75;
  const DEFAULT_ORIGIN_ID = "MAP_NODE_0036";
  const DEFAULT_ORIGIN_NAME = "파르네";
  const INDESTRUCTIBLE_DURABILITY = 9999;
  const REGIONAL_CAMP_SUPPLIES = new Map([["G_0278", "북부"], ["G_0279", "남부"]]);
  const MEMO_LONG_PRESS_MS = 650;
  const MEMO_LONG_PRESS_MOVE_TOLERANCE = 10;
  const QUALITY_NAMES = new Set(["저품질", "통상품질", "고품질", "명품"]);
  const SAMPLE_ITEM_ID = "G_0006";
  const LEGACY_ITEM_ID_MAP = new Map([
    ["G_0320", "G_0267"],
    ["G_0321", "G_0268"],
    ["G_0322", "G_0269"],
    ["G_0323", "G_0270"],
    ["G_0324", "G_0271"],
    ["G_0325", "G_0272"],
    ["G_0326", "G_0273"]
  ]);
  const INITIAL_ITEM_GRANTS = [
    { itemId: "G_0272", quantity: 1 },
    { itemId: "G_0267", quantity: 5 },
    { itemId: "G_0269", quantity: 5 },
    { itemId: "G_0271", quantity: 5 },
    { itemId: "G_0006", quantity: 1 }
  ];
  const LOADED_DEFINITION_IDS = new Set([
    ...INITIAL_ITEM_GRANTS.map(grant => grant.itemId),
    "G_0270",
    "G_0273",
    "G_0276"
  ]);
  const SORT_MODES = new Set(["rarity", "value", "category"]);
  const SPECIAL_CATEGORY_ORDER = new Map([
    ["야영 물품", 0],
    ["여행 물품", 1],
    ["여행 식량", 2]
  ]);
  const TRADE_CATEGORY_ORDER = new Map([
    "식료품", "조미료", "향신료", "향료", "주류", "의약품", "가축", "부산물",
    "섬유", "직물", "염료", "광석", "공업품", "공예품", "병구류", "잡화", "귀중품"
  ].map((category, index) => [category, index]));
  const GROUP_COLORS = ["#c6964e", "#a97843", "#bc8b46", "#8f6b3b", "#b77b42"];
  const SLOT_TYPE_LABELS = {
    normal: "일반",
    protected: "보호",
    secret: "비밀"
  };
  const sampleDefinition = {
    id: SAMPLE_ITEM_ID,
    displayName: "곡물",
    category: "식료품",
    subcategory: "곡류",
    rarity: 1,
    baseValue: 38,
    valuePerSlot: 9.5,
    valuePerWeight: 5.4,
    slotCount: 4,
    weight: 7,
    weightPerSlot: 1.8,
    unit: "묶음",
    durability: 90,
    description: "잘 여문 보리가 가득한 곡물 포대. 빻아 가루를 내 빵이나 반죽을 만드는 데 쓰인다.",
    useEffect: "",
    campEffect: "",
    maxStack: 1,
    horseHungerRecovery: 0,
    horseHealthRecovery: 0
  };
  const fallbackFeedDefinitions = [
    {
      id: "G_0267",
      displayName: "건초",
      category: "여행 물품",
      subcategory: "식물성식품",
      rarity: 1,
      baseValue: 16,
      valuePerSlot: 8,
      valuePerWeight: 8,
      slotCount: 2,
      weight: 2,
      weightPerSlot: 1,
      unit: "묶음",
      durability: 300,
      description: "말에게 먹이기 위해 풀을 말려둔다. 이렇게 하면 소화에 용이하고 보존도 편리하다.",
      useEffect: "말 허기 +40",
      campEffect: "",
      maxStack: 5,
      horseHungerRecovery: 40,
      horseHealthRecovery: 0
    },
    {
      id: "G_0268",
      displayName: "말먹이",
      category: "여행 물품",
      subcategory: "식물성식품",
      rarity: 3,
      baseValue: 32,
      valuePerSlot: 32,
      valuePerWeight: 32,
      slotCount: 1,
      weight: 1,
      weightPerSlot: 1,
      unit: "자루",
      durability: 30,
      description: "말에게 먹이기 위한 상품성이 다소 떨어지는 다양한 채소들. 말 주제에 사람보다 호사를 누린다.",
      useEffect: "말 허기 +50<br>말 체력 +10",
      campEffect: "",
      maxStack: 10,
      horseHungerRecovery: 50,
      horseHealthRecovery: 10
    }
  ];
  const fallbackCampDefinitions = [
    {
      id: "G_0269", displayName: "여행 육포", category: "여행 식량", rarity: 1,
      subcategory: "동물성식품",
      baseValue: 14, valuePerSlot: 14, valuePerWeight: 14, slotCount: 1, weight: 1,
      weightPerSlot: 1, unit: "묶음", durability: 150, maxStack: 10,
      description: "딱딱하고 질긴 육포. 오직 보존성을 목적으로 만든 여행용 생존식이다.",
      useEffect: "", campEffect: "야영 안락도 +3", horseHungerRecovery: 0, horseHealthRecovery: 0
    },
    {
      id: "G_0270", displayName: "고급 여행 육포", category: "여행 식량", rarity: 1,
      subcategory: "동물성식품",
      baseValue: 32, valuePerSlot: 32, valuePerWeight: 32, slotCount: 1, weight: 1,
      weightPerSlot: 1, unit: "묶음", durability: 60, maxStack: 10,
      description: "부드럽고 자극적인 육포. 맛은 좋지만 비싸다.",
      useEffect: "", campEffect: "야영 안락도 +5", horseHungerRecovery: 0, horseHealthRecovery: 0
    },
    {
      id: "G_0271", displayName: "건조 흑빵", category: "여행 식량", rarity: 1,
      subcategory: "곡류",
      baseValue: 9, valuePerSlot: 9, valuePerWeight: 9, slotCount: 1, weight: 1,
      weightPerSlot: 1, unit: "묶음", durability: 200, maxStack: 10,
      description: "딱딱하고 퍽퍽한 흑빵. 물에 불려서 먹지 않으면 삼키기도 힘들다.",
      useEffect: "", campEffect: "야영 안락도 +2", horseHungerRecovery: 0, horseHealthRecovery: 0
    },
    {
      id: "G_0272", displayName: "야영 물품", category: "야영 물품", rarity: 1,
      subcategory: "잡화",
      baseValue: 82, valuePerSlot: 27.3, valuePerWeight: 16.4, slotCount: 3, weight: 5,
      weightPerSlot: 1.7, unit: "세트", durability: 200, maxStack: 1,
      description: "침낭, 모포, 부싯돌, 냄비... 야영을 위한 모든 것들을 챙기십시오.",
      useEffect: "", campEffect: "야영 안락도 +10 (사용시 열화 내구도-5)", horseHungerRecovery: 0, horseHealthRecovery: 0
    },
    {
      id: "G_0273", displayName: "고급 야영 물품", category: "야영 물품", rarity: 4,
      subcategory: "잡화",
      baseValue: 442, valuePerSlot: 110.5, valuePerWeight: 55.3, slotCount: 4, weight: 8,
      weightPerSlot: 2, unit: "세트", durability: 300, maxStack: 1,
      description: "침낭, 모포, 부싯돌, 냄비... 야영을 위한 모든 것들을 챙기십시오. 고급품은 더욱 안락함을 제공하지만 값비쌉니다.",
      useEffect: "", campEffect: "야영 안락도 +15 (사용시 열화 내구도-5)", horseHungerRecovery: 0, horseHealthRecovery: 0
    },
    {
      id: "G_0276", name1: "수레 바퀴", displayName: "수레 바퀴", category: "여행 물품", rarity: 2,
      subcategory: "공업품",
      baseValue: 145, valuePerSlot: 48.3, valuePerWeight: 29, slotCount: 3, weight: 5,
      weightPerSlot: 1.7, unit: "개", durability: 9999, maxStack: 1,
      description: "짐마차의 예비용 수레 바퀴. 크고 무겁지만 필요할 때 없다면 매우 곤란해진다.",
      useEffect: "[ 짐마차 상태이상 : 바퀴 파손 ] 제거", campEffect: "", horseHungerRecovery: 0, horseHealthRecovery: 0
    },
    {
      id: "G_0004", displayName: "달걀", category: "식료품", rarity: 2,
      subcategory: "동물성식품",
      baseValue: 75, valuePerSlot: 75, valuePerWeight: 75, slotCount: 1, weight: 1,
      weightPerSlot: 1, unit: "상자", durability: 30, maxStack: 1,
      description: "짚이나 풀을 깐 바구니에 담아 운반하는 신선한 달걀. 그대로 먹거나 굽고 삶는 등 여러 음식에 두루 쓰인다.",
      useEffect: "", campEffect: "야영 안락도 +3", horseHungerRecovery: 0, horseHealthRecovery: 0
    }
  ];
  const fallbackDefinitions = [sampleDefinition, ...fallbackFeedDefinitions, ...fallbackCampDefinitions];
  const fallbackDefinitionsById = new Map(fallbackDefinitions.map(definition => [definition.id, definition]));

  let elements;
  let state = loadState();
  let notify = () => {};
  let loadPromise;
  let hoveredInstanceId = "";
  let draggedInstanceId = "";
  let memoLongPress = null;
  let dataSource = "local";
  let activeCompartment = "normal";
  let getCompartmentUnlocks = () => ({ protected: false, secret: false });
  let getCapacityLimits = () => ({ ...COMPARTMENT_CAPACITIES, maxWeight: DEFAULT_MAX_WEIGHT });
  let getOverloadRule = () => ({ thresholdPercent: 1, penaltyPerThreshold: 5 });
  const itemDefinitions = new Map(fallbackDefinitions.map(definition => [definition.id, definition]));

  function init(options = {}) {
    notify = typeof options.notify === "function" ? options.notify : notify;
    getCompartmentUnlocks = typeof options.getCompartmentUnlocks === "function" ? options.getCompartmentUnlocks : getCompartmentUnlocks;
    getCapacityLimits = typeof options.getCapacityLimits === "function" ? options.getCapacityLimits : getCapacityLimits;
    getOverloadRule = typeof options.getOverloadRule === "function" ? options.getOverloadRule : getOverloadRule;
    elements = {
      viewport: document.querySelector(".cargo-ui"),
      grid: document.querySelector("#cargo-grid"),
      slotCount: document.querySelector("#cargo-slot-count"),
      compartmentLabel: document.querySelector("#cargo-compartment-label"),
      weightValue: document.querySelector("#cargo-weight-value"),
      weightFill: document.querySelector("#cargo-weight-fill"),
      weightPanel: document.querySelector("#cargo-weight-panel"),
      weightBadge: document.querySelector("#cargo-overweight-badge"),
      weightTooltip: document.querySelector("#cargo-weight-tooltip"),
      sortButtons: [...document.querySelectorAll("[data-cargo-sort]")],
      discardZone: document.querySelector("#cargo-discard-zone"),
      compartmentControls: document.querySelector("#cargo-compartment-controls"),
      compartmentButtons: [...document.querySelectorAll("[data-cargo-compartment]")],
      tooltip: document.querySelector("#cargo-tooltip"),
      noteTooltip: document.querySelector("#cargo-note-tooltip")
    };

    if (!elements.grid || !elements.tooltip) return;
    elements.grid.addEventListener("pointerover", handlePointerOver);
    elements.grid.addEventListener("pointerdown", handleMemoLongPressStart);
    elements.grid.addEventListener("pointerup", cancelMemoLongPress);
    elements.grid.addEventListener("pointermove", handlePointerMove);
    elements.grid.addEventListener("pointerleave", event => {
      cancelMemoLongPress(event);
      hideTooltip();
    });
    elements.grid.addEventListener("pointercancel", event => {
      cancelMemoLongPress(event);
      hideTooltip();
    });
    elements.grid.addEventListener("focusin", handleFocusIn);
    elements.grid.addEventListener("focusout", handleFocusOut);
    elements.grid.addEventListener("dragstart", handleDragStart);
    elements.grid.addEventListener("dragend", clearDragState);
    elements.viewport?.addEventListener("wheel", handleCargoViewportWheel, { passive: false });
    elements.sortButtons.forEach(button => button.addEventListener("click", () => setSortMode(button.dataset.cargoSort)));
    elements.compartmentButtons.forEach(button => {
      button.addEventListener("click", () => setActiveCompartment(button.dataset.cargoCompartment));
      button.addEventListener("dragenter", handleCompartmentDragEnter);
      button.addEventListener("dragover", handleCompartmentDragOver);
      button.addEventListener("dragleave", handleCompartmentDragLeave);
      button.addEventListener("drop", handleCompartmentDrop);
    });
    elements.discardZone?.addEventListener("dragenter", handleDiscardDragEnter);
    elements.discardZone?.addEventListener("dragover", handleDiscardDragOver);
    elements.discardZone?.addEventListener("dragleave", handleDiscardDragLeave);
    elements.discardZone?.addEventListener("drop", handleDiscardDrop);
    elements.weightPanel?.addEventListener("pointerenter", showWeightTooltipFromEvent);
    elements.weightPanel?.addEventListener("pointermove", showWeightTooltipFromEvent);
    elements.weightPanel?.addEventListener("pointerleave", hideWeightTooltip);
    elements.weightPanel?.addEventListener("focus", showWeightTooltipFromFocus);
    elements.weightPanel?.addEventListener("blur", hideWeightTooltip);
    window.addEventListener("resize", hideTooltip);
    window.addEventListener("blur", () => {
      hideTooltip();
      cancelMemoLongPress();
      clearDragState();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        hideTooltip();
        cancelMemoLongPress();
      }
    });
    window.addEventListener("projectw:knowledgechange", () => {
      hideTooltip();
      render();
    });
    window.addEventListener("projectw:notebookchange", hideTooltip);
    reflowItemPlacements();
    persistState();
    render();
  }

  function load() {
    if (loadPromise) return loadPromise;

    if (window.location.protocol === "file:") {
      dataSource = "local";
      render();
      loadPromise = Promise.resolve({ source: dataSource, items: [...itemDefinitions.values()] });
      return loadPromise;
    }

    loadPromise = window.ProjectWData.loadCsv(GOODS_CSV_URL)
      .then(rows => {
        const definitions = rows
          .filter(record => String(readColumn(record, "ID")).trim())
          .map(normalizeItem);
        const loadedIds = new Set(definitions.map(definition => definition.id));
        if ([...LOADED_DEFINITION_IDS].some(itemId => !loadedIds.has(itemId))) throw new Error("초기 지급품 행 일부를 찾을 수 없습니다.");
        definitions.forEach(definition => itemDefinitions.set(definition.id, definition));
        syncLoadedPlacements();
        dataSource = "csv";
        render();
        return { source: dataSource, items: definitions };
      })
      .catch(error => {
        console.error(error);
        dataSource = "fallback";
        render();
        notify("교역품 CSV를 불러오지 못해 확인된 초기 지급품 데이터를 표시합니다.");
        return { source: dataSource, items: [...itemDefinitions.values()], error };
      });

    return loadPromise;
  }

  function normalizeItem(row) {
    const id = String(readColumn(row, "ID")).trim();
    const description = String(readColumn(row, "상품설명") || "").trim();
    const stackValue = Math.max(0, Math.trunc(toNumber(readColumn(row, "스택 여부"))));
    return {
      id,
      name1: String(readColumn(row, "이름_1") || id).trim(),
      name2: String(readColumn(row, "이름_2") || readColumn(row, "이름_3") || id).trim(),
      name3: String(readColumn(row, "이름_3") || id).trim(),
      displayName: String(readColumn(row, "이름_3") || id).trim(),
      category: String(readColumn(row, "카테고리") || "분류 없음").trim(),
      subcategory: String(readColumn(row, "서브카테고리") || "").trim(),
      rarity: toNumber(readColumn(row, "희귀등급")),
      baseValue: toNumber(readColumn(row, "기준 가치")),
      valuePerSlot: toNumber(readColumn(row, "칸당 가치")),
      valuePerWeight: toNumber(readColumn(row, "무게당 가치")),
      slotCount: Math.max(1, Math.round(toNumber(readColumn(row, "칸수")) || 1)),
      weight: toNumber(readColumn(row, "무게")),
      weightPerSlot: toNumber(readColumn(row, "칸당무게")),
      unit: String(readColumn(row, "단위") || "개").trim(),
      durability: toNumber(readColumn(row, "열화 내구도")),
      deteriorationBreakage: isMarkedYes(readColumn(row, "열화_파손")),
      deteriorationFresh: isMarkedYes(readColumn(row, "열화_신선")),
      marketPurchaseRestricted: isMarkedYes(readColumn(row, "매입제한")),
      isSnack: isMarkedYes(readColumn(row, "간식")),
      description,
      useEffect: String(readColumn(row, "사용 효과") || "").trim(),
      campEffect: String(readColumn(row, "야영 효과") || "").trim(),
      maxStack: stackValue || 1,
      horseHungerRecovery: readDescriptionEffect(String(readColumn(row, "사용 효과") || ""), "허기"),
      horseHealthRecovery: readDescriptionEffect(String(readColumn(row, "사용 효과") || ""), "체력")
    };
  }

  function readDescriptionEffect(description, statName) {
    const match = new RegExp(`말\\s*${statName}\\s*\\+(\\d+)`).exec(description);
    return match ? Number(match[1]) : 0;
  }

  function isMarkedYes(value) {
    return String(value ?? "").trim().toUpperCase() === "Y";
  }

  function readColumn(row, expectedHeader) {
    const key = Object.keys(row).find(header => header.trim() === expectedHeader);
    return key ? row[key] : "";
  }

  function toNumber(value) {
    const number = Number(String(value ?? "").replaceAll(",", "").trim());
    return Number.isFinite(number) ? number : 0;
  }

  function createDefaultTradeMetadata(overrides = {}, definition = null) {
    const nonTradeItem = isNonTradeCategory(definition?.category);
    const originProductKind = ["specialty", "famous"].includes(String(overrides.originProductKind || ""))
      ? String(overrides.originProductKind)
      : "";
    return {
      quality: nonTradeItem ? "" : (QUALITY_NAMES.has(overrides.quality) ? overrides.quality : "통상품질"),
      qualityRoll: nonTradeItem ? .5 : clampTradeRoll(overrides.qualityRoll),
      originId: nonTradeItem ? "" : (String(overrides.originId || DEFAULT_ORIGIN_ID).trim() || DEFAULT_ORIGIN_ID),
      originName: nonTradeItem ? "" : (String(overrides.originName || DEFAULT_ORIGIN_NAME).trim() || DEFAULT_ORIGIN_NAME),
      originDistance: nonTradeItem || !Number.isFinite(Number(overrides.originDistance))
        ? null
        : Math.max(0, Number(overrides.originDistance)),
      purchaseValue: Math.max(0, Number(overrides.purchaseValue) || 0),
      originProductKind: nonTradeItem ? "" : originProductKind,
      originPurchaseBonus: !nonTradeItem && Boolean(overrides.originPurchaseBonus)
    };
  }

  function normalizeTradeMetadata(item, definition = null) {
    const metadata = createDefaultTradeMetadata(item, definition);
    item.quality = metadata.quality;
    item.qualityRoll = metadata.qualityRoll;
    item.originId = metadata.originId;
    item.originName = metadata.originName;
    item.originDistance = metadata.originDistance;
    item.purchaseValue = metadata.purchaseValue;
    item.originProductKind = metadata.originProductKind;
    item.originPurchaseBonus = metadata.originPurchaseBonus;
    return item;
  }

  function clampTradeRoll(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(Math.max(number, 0), 1) : .5;
  }

  function sameTradeMetadata(left, right) {
    return left.quality === right.quality
      && Math.abs(Number(left.qualityRoll) - Number(right.qualityRoll)) < .000001
      && left.originId === right.originId
      && left.originName === right.originName
      && (Number(left.originDistance) || 0) === (Number(right.originDistance) || 0)
      && left.originProductKind === right.originProductKind
      && Boolean(left.originPurchaseBonus) === Boolean(right.originPurchaseBonus)
      && Math.abs(Number(left.purchaseValue) - Number(right.purchaseValue)) < .000001;
  }

  function normalizeJourneyLots(value, maximumQuantity = Number.POSITIVE_INFINITY) {
    let remaining = Math.max(0, Number(maximumQuantity) || 0);
    const limited = Number.isFinite(remaining);
    const merged = [];
    (Array.isArray(value) ? value : []).forEach(entry => {
      const journeyId = String(entry?.journeyId || entry?.id || "").trim();
      let quantity = Math.max(0, Math.trunc(Number(entry?.quantity) || 0));
      if (!journeyId || quantity <= 0 || (limited && remaining <= 0)) return;
      if (limited) quantity = Math.min(quantity, remaining);
      const existing = merged.find(item => item.journeyId === journeyId);
      if (existing) existing.quantity += quantity;
      else merged.push({
        journeyId,
        quantity,
        purchaseSettlementId: String(entry?.purchaseSettlementId || "").trim(),
        purchaseMerchantKey: String(entry?.purchaseMerchantKey || "").trim(),
        purchaseFacilityType: String(entry?.purchaseFacilityType || "").trim(),
        purchaseSourceType: normalizePurchaseSourceType(entry?.purchaseSourceType)
      });
      if (limited) remaining -= quantity;
    });
    return merged;
  }

  function normalizePurchaseSourceType(value) {
    const sourceType = String(value || "").trim();
    return ["production", "logistics", "import", "resale", "supply", "event"].includes(sourceType)
      ? sourceType
      : "";
  }

  function takeJourneyLots(source, amount) {
    let remaining = Math.max(0, Math.trunc(Number(amount) || 0));
    const taken = [];
    if (!Array.isArray(source) || remaining <= 0) return taken;
    while (source.length && remaining > 0) {
      const current = source[0];
      const quantity = Math.min(remaining, Math.max(0, Math.trunc(Number(current.quantity) || 0)));
      if (quantity > 0) taken.push({ ...current, quantity });
      current.quantity = Math.max(0, Number(current.quantity) - quantity);
      remaining -= quantity;
      if (current.quantity <= 0) source.shift();
      else if (quantity <= 0) source.shift();
    }
    return taken;
  }

  function appendJourneyLots(item, lots) {
    if (!item) return;
    item.journeyLots = normalizeJourneyLots([...(item.journeyLots || []), ...(lots || [])], item.quantity);
  }

  function isUnifiedStackDefinition(definition) {
    return Math.max(1, Number(definition?.maxStack) || 1) > 1;
  }

  function weightedStackValue(currentValue, currentQuantity, incomingValue, incomingQuantity) {
    const total = currentQuantity + incomingQuantity;
    if (total <= 0) return Number(currentValue) || Number(incomingValue) || 0;
    return (((Number(currentValue) || 0) * currentQuantity) + ((Number(incomingValue) || 0) * incomingQuantity)) / total;
  }

  function mergeUnifiedStackMetadata(target, incomingQuantity, incomingDurability, incomingMetadata = {}) {
    const currentQuantity = Math.max(0, Math.trunc(Number(target.quantity) || 0));
    const addedQuantity = Math.max(0, Math.trunc(Number(incomingQuantity) || 0));
    if (addedQuantity <= 0) return;
    target.durability = weightedStackValue(target.durability, currentQuantity, incomingDurability, addedQuantity);
    target.purchaseValue = weightedStackValue(target.purchaseValue, currentQuantity, incomingMetadata.purchaseValue, addedQuantity);
    target.qualityRoll = weightedStackValue(target.qualityRoll, currentQuantity, incomingMetadata.qualityRoll, addedQuantity);
    target.quantity = currentQuantity + addedQuantity;
  }

  function coalesceUnifiedStacks(items = state.items) {
    const grouped = new Map();
    const removed = new Set();
    items.forEach(item => {
      const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
      if (!isUnifiedStackDefinition(definition)) return;
      const key = `${item.slotType || "normal"}:${item.itemId}`;
      const target = grouped.get(key);
      if (!target) {
        grouped.set(key, item);
        return;
      }
      const incomingQuantity = Math.max(1, Math.trunc(Number(item.quantity) || 1));
      const incomingLots = normalizeJourneyLots(item.journeyLots, incomingQuantity);
      mergeUnifiedStackMetadata(target, incomingQuantity, item.durability, item);
      appendJourneyLots(target, incomingLots);
      removed.add(item);
    });
    if (!removed.size) return items;
    const merged = items.filter(item => !removed.has(item));
    if (items === state.items) state.items = merged;
    return merged;
  }

  function canMergeJourneyLots(item, incomingLots) {
    const existingTracked = Array.isArray(item?.journeyLots) && item.journeyLots.some(lot => Number(lot.quantity) > 0);
    const incomingTracked = Array.isArray(incomingLots) && incomingLots.some(lot => Number(lot.quantity) > 0);
    return existingTracked === incomingTracked;
  }

  function recordJourneyLoss(item, lots, reason) {
    if (!item || !Array.isArray(lots) || !lots.length) return;
    window.ProjectWMerchantPath?.recordCargoLoss?.(item.itemId, lots, reason);
  }

  function createDefaultState() {
    let nextSlot = 0;
    const items = INITIAL_ITEM_GRANTS.map((grant, index) => {
      const definition = fallbackDefinitionsById.get(grant.itemId);
      const item = {
        instanceId: `CARGO_${String(index + 1).padStart(4, "0")}`,
        itemId: grant.itemId,
        quantity: Math.min(grant.quantity, definition.maxStack || 1),
        startSlot: nextSlot,
        slotCount: definition.slotCount,
        durability: definition.durability,
        ...createDefaultTradeMetadata({ purchaseValue: definition.baseValue }, definition),
        journeyLots: [],
        slotType: "normal"
      };
      nextSlot += definition.slotCount;
      return item;
    });
    return {
      schemaVersion: 11,
      columns: COLUMN_COUNT,
      rows: ROW_COUNT,
      maxWeight: DEFAULT_MAX_WEIGHT,
      sortMode: "rarity",
      slotTypes: Array(SLOT_COUNT).fill("normal"),
      items
    };
  }

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return createDefaultState();
      const parsed = JSON.parse(stored);
      if (!isValidState(parsed)) return createDefaultState();
      if (parsed.rows !== ROW_COUNT) {
        const previousSlotTypes = Array.isArray(parsed.slotTypes) ? parsed.slotTypes : [];
        parsed.rows = ROW_COUNT;
        parsed.slotTypes = Array.from({ length: SLOT_COUNT }, (_, index) => previousSlotTypes[index] || "normal");
      }
      parsed.sortMode = SORT_MODES.has(parsed.sortMode) ? parsed.sortMode : "rarity";
      parsed.items.forEach(item => {
        item.itemId = LEGACY_ITEM_ID_MAP.get(item.itemId) || item.itemId;
        normalizeTradeMetadata(item);
        item.journeyLots = normalizeJourneyLots(item.journeyLots, item.quantity);
        item.slotType = item.slotType in SLOT_TYPE_LABELS ? item.slotType : "normal";
      });
      parsed.schemaVersion = 11;
      return parsed;
    } catch (error) {
      console.error(error);
      return createDefaultState();
    }
  }

  function isValidState(value) {
    return value
      && [5, 6, 7, 8, 9, 10, 11].includes(value.schemaVersion)
      && value.columns === COLUMN_COUNT
      && [24, ROW_COUNT].includes(value.rows)
      && Array.isArray(value.slotTypes)
      && value.slotTypes.length === value.columns * value.rows
      && value.slotTypes.every(type => type in SLOT_TYPE_LABELS)
      && Array.isArray(value.items)
      && Number.isFinite(value.maxWeight);
  }

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error(error);
      notify("브라우저 저장소에 화물 상태를 저장하지 못했습니다.");
    }
  }

  function syncLoadedPlacements() {
    const discarded = [];
    state.items.forEach(item => {
      const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
      item.slotCount = definition.slotCount;
      item.quantity = Math.max(1, Math.trunc(Number(item.quantity) || 1));
      if (Number(definition.durability) >= INDESTRUCTIBLE_DURABILITY) item.durability = definition.durability;
      else if (!Number.isFinite(Number(item.durability))) item.durability = definition.durability;
      normalizeTradeMetadata(item, definition);
      if (!(Number(item.purchaseValue) > 0)) item.purchaseValue = definition.baseValue;
      if (Number(definition.durability) > 0
        && Number(definition.durability) < INDESTRUCTIBLE_DURABILITY
        && Number(item.durability) <= 0) discarded.push(item.instanceId);
    });
    if (discarded.length) {
      const discardedIds = new Set(discarded);
      state.items.filter(item => discardedIds.has(item.instanceId)).forEach(item => {
        recordJourneyLoss(item, item.journeyLots, "열화내구도 소진");
      });
      state.items = state.items.filter(item => !discardedIds.has(item.instanceId));
      notify(`열화내구도가 소진된 화물 ${discarded.length}개를 자동으로 폐기했습니다.`);
    }
    coalesceUnifiedStacks();
    reflowItemPlacements();
    persistState();
  }

  function render() {
    if (!elements?.grid) return;
    const unlocks = normalizedCompartmentUnlocks();
    if (!isCompartmentAvailable(activeCompartment, unlocks)) activeCompartment = "normal";
    const configuredCapacity = compartmentCapacity(activeCompartment);
    const occupiedExtent = state.items
      .filter(item => (item.slotType || "normal") === activeCompartment)
      .reduce((maximum, item) => Math.max(maximum, item.startSlot + item.slotCount), 0);
    const slotCapacity = Math.max(configuredCapacity, occupiedExtent);
    hideTooltip();
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < slotCapacity; index += 1) {
      const slot = document.createElement("button");
      const item = findItemAtSlot(index, activeCompartment);
      const slotType = activeCompartment;
      slot.type = "button";
      slot.className = `cargo-slot cargo-slot-${slotType}`;
      slot.dataset.slotIndex = String(index);
      slot.dataset.slotNumber = String(index + 1);
      slot.dataset.slotType = slotType;
      slot.style.gridColumn = "1";
      slot.style.gridRow = String(index + 1);
      slot.setAttribute("role", "gridcell");
      slot.setAttribute("aria-rowindex", String(index + 1));
      slot.setAttribute("aria-colindex", "1");

      if (item) {
        const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
        const knowledge = knowledgeProfile(definition, item);
        const isCampSupply = String(definition.category || "").replaceAll(" ", "") === "야영물품";
        const isStackable = !isCampSupply && Math.max(1, Number(definition.maxStack) || 1) > 1;
        const memoAvailable = !window.ProjectWMerchantPath?.isExcludedCategory?.(definition.category);
        const itemIndex = state.items.indexOf(item);
        const positionInItem = index - item.startSlot;
        const hasPrevious = positionInItem > 0;
        const hasNext = positionInItem < item.slotCount - 1;
        slot.classList.add("is-occupied");
        slot.draggable = true;
        slot.classList.toggle("is-item-head", positionInItem === 0);
        slot.classList.toggle("is-item-middle", hasPrevious && hasNext);
        slot.classList.toggle("is-item-tail", hasPrevious && !hasNext);
        slot.classList.toggle("is-item-single", !hasPrevious && !hasNext);
        slot.classList.toggle("is-stackable-item", isStackable);
        slot.classList.toggle("is-camp-supply-item", isCampSupply);
        slot.dataset.itemInstance = item.instanceId;
        slot.dataset.itemId = item.itemId;
        slot.dataset.itemCategory = String(definition.category || "").replaceAll(" ", "");
        slot.style.setProperty("--cargo-group-color", isCampSupply
          ? "#98716b"
          : isStackable
            ? "#628789"
            : GROUP_COLORS[itemIndex % GROUP_COLORS.length]);
        slot.setAttribute("aria-label", `${knowledge.name}, ${item.quantity}${definition.unit}, ${item.slotCount}칸 중 ${positionInItem + 1}번째 칸${memoAvailable ? ", 길게 눌러 상품 메모 열기" : ""}`);

        let bracket = null;
        if (hasPrevious || hasNext) {
          bracket = document.createElement("span");
          bracket.className = "cargo-item-bracket";
          bracket.classList.add(!hasPrevious
            ? "is-start"
            : !hasNext
              ? "is-end"
              : "is-middle");
          bracket.setAttribute("aria-hidden", "true");
        }

        const itemCell = document.createElement("span");
        itemCell.className = "cargo-item-cell";
        const itemName = document.createElement("span");
        itemName.className = "cargo-item-name";
        itemName.textContent = knowledge.name;

        if (positionInItem === 0) {
          const rarityLevel = Math.max(1, Math.min(5, Math.round(definition.rarity) || 1));
          const currentDurability = Number.isFinite(Number(item.durability)) ? Number(item.durability) : definition.durability;
          const leading = document.createElement("span");
          leading.className = "cargo-item-head-leading";
          const headMeta = document.createElement("span");
          headMeta.className = "cargo-item-head-meta";
          const rarityMark = document.createElement("span");
          rarityMark.className = `cargo-head-rarity-mark cargo-head-rarity-${rarityLevel}`;
          rarityMark.setAttribute("aria-label", `희귀 등급 ${formatNumber(definition.rarity)}`);
          const category = document.createElement("span");
          category.className = "cargo-head-category";
          category.textContent = definition.category || "기타";
          const originProductBadge = createOriginProductBadge(item.originProductKind);
          const stackQuantity = document.createElement("span");
          stackQuantity.className = "cargo-stack-quantity";
          stackQuantity.textContent = `X${formatNumber(item.quantity)}`;
          stackQuantity.setAttribute("aria-label", `묶음 수량 ${formatNumber(item.quantity)}`);
          const persistentBadge = document.createElement("span");
          persistentBadge.className = "cargo-persistent-badge";
          persistentBadge.textContent = "비소모";
          persistentBadge.setAttribute("aria-label", "야영에서 소모되지 않는 물품");
          const value = document.createElement("span");
          value.className = "cargo-head-value";
          const purchaseValue = Number(item.purchaseValue) > 0 ? Number(item.purchaseValue) : definition.baseValue;
          value.textContent = `구매 가치 ${formatNumber(purchaseValue * item.quantity)}`;
          const weight = document.createElement("span");
          weight.className = "cargo-head-weight";
          weight.textContent = `무게 ${formatNumber(definition.weight * item.quantity)}`;
          const durability = document.createElement("span");
          durability.className = `cargo-head-durability ${durabilityClassName(currentDurability, definition.durability)}`;
          durability.textContent = formatDurability(currentDurability, definition.durability);
          if (knowledge.showRarity) leading.append(rarityMark);
          leading.append(category, itemName);
          if (knowledge.showOriginProduct && originProductBadge) leading.append(originProductBadge);
          if (isStackable) leading.append(stackQuantity);
          if (isCampSupply) leading.append(persistentBadge);
          headMeta.append(value, weight);
          if (knowledge.showDurability) headMeta.append(durability);
          itemCell.append(leading, headMeta);
        } else itemCell.append(itemName);

        if (bracket) slot.append(bracket);
        slot.append(itemCell);
      } else {
        slot.setAttribute("aria-label", `${index + 1}번 ${SLOT_TYPE_LABELS[slotType]} 화물칸, 비어 있음`);
        const emptyLabel = document.createElement("span");
        emptyLabel.className = "cargo-slot-empty";
        emptyLabel.textContent = "비어 있음";
        slot.append(emptyLabel);
      }
      fragment.append(slot);
    }

    elements.grid.replaceChildren(fragment);
    elements.grid.setAttribute("aria-label", `${SLOT_TYPE_LABELS[activeCompartment]} 화물 ${slotCapacity}칸`);
    elements.grid.setAttribute("aria-rowcount", String(slotCapacity));
    elements.grid.style.setProperty("--cargo-slot-count", String(slotCapacity));
    elements.viewport.dataset.cargoCompartment = activeCompartment;
    const load = getLoadSummary();
    const weightRatio = Math.min(1, load.ratio);
    elements.slotCount.textContent = String(slotCapacity);
    if (elements.compartmentLabel) elements.compartmentLabel.textContent = `${SLOT_TYPE_LABELS[activeCompartment]} 화물칸`;
    elements.weightValue.textContent = `${formatNumber(load.weight)} / ${formatNumber(load.maxWeight)}`;
    elements.weightFill.style.width = `${weightRatio * 100}%`;
    elements.weightFill.classList.toggle("is-over-limit", load.overweightPercent > 0);
    elements.weightPanel?.classList.toggle("is-over-limit", load.overweightPercent > 0);
    if (elements.weightBadge) {
      elements.weightBadge.hidden = load.overweightPercent <= 0;
      elements.weightBadge.textContent = `과적 · 속도 -${formatNumber(load.speedPenaltyPercent)}%`;
    }
    elements.sortButtons.forEach(button => {
      const active = button.dataset.cargoSort === state.sortMode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    elements.compartmentButtons.forEach(button => {
      const type = button.dataset.cargoCompartment;
      button.hidden = !isCompartmentAvailable(type, unlocks) || type === activeCompartment;
      button.classList.remove("is-active");
      button.setAttribute("aria-pressed", "false");
      button.disabled = false;
    });
  }

  function findItemAtSlot(slotIndex, slotType = activeCompartment) {
    return state.items.find(item => item.slotType === slotType && slotIndex >= item.startSlot && slotIndex < item.startSlot + item.slotCount);
  }

  function normalizedCompartmentUnlocks() {
    const value = getCompartmentUnlocks() || {};
    return { protected: Boolean(value.protected), secret: Boolean(value.secret) };
  }

  function normalizedCapacityLimits() {
    const value = getCapacityLimits() || {};
    return {
      normal: Math.max(0, Math.trunc(Number(value.normal) || SLOT_COUNT)),
      protected: Math.max(0, Math.trunc(Number(value.protected) || 0)),
      secret: Math.max(0, Math.trunc(Number(value.secret) || 0)),
      maxWeight: Math.max(1, Number(value.maxWeight) || DEFAULT_MAX_WEIGHT)
    };
  }

  function compartmentCapacity(slotType = "normal") {
    const limits = normalizedCapacityLimits();
    return slotType in limits ? limits[slotType] : SLOT_COUNT;
  }

  function isCompartmentAvailable(type, unlocks = normalizedCompartmentUnlocks()) {
    return type === "normal" || (type === "protected" && unlocks.protected) || (type === "secret" && unlocks.secret);
  }

  function calculateWeight() {
    return state.items.reduce((sum, item) => {
      const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
      return sum + (definition.weight * item.quantity);
    }, 0);
  }

  function getLoadSummary() {
    const weight = calculateWeight();
    const maxWeight = normalizedCapacityLimits().maxWeight;
    const ratio = maxWeight > 0 ? weight / maxWeight : 0;
    const overweightRatio = Math.max(0, ratio - 1);
    const overweightPercent = overweightRatio * 100;
    const overloadRule = getOverloadRule() || {};
    const thresholdPercent = Math.max(0.1, Number(overloadRule.thresholdPercent) || 1);
    const penaltyPerThreshold = Math.max(0, Number(overloadRule.penaltyPerThreshold) || 5);
    const rawSpeedPenaltyPercent = (overweightPercent / thresholdPercent) * penaltyPerThreshold;
    const speedMultiplier = Math.max(0.1, 1 - (rawSpeedPenaltyPercent / 100));
    const speedPenaltyPercent = (1 - speedMultiplier) * 100;
    return {
      weight,
      maxWeight,
      ratio,
      overweightRatio,
      overweightPercent,
      rawSpeedPenaltyPercent,
      speedPenaltyPercent,
      speedMultiplier,
      thresholdPercent,
      penaltyPerThreshold
    };
  }

  function getCapacitySummary(items = state.items, slotType = "normal") {
    const usedSlots = items.filter(item => (item.slotType || "normal") === slotType).reduce((sum, item) => {
      const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
      return sum + Math.max(1, Number(definition.slotCount) || 1);
    }, 0);
    const totalSlots = compartmentCapacity(slotType);
    return {
      usedSlots,
      totalSlots,
      freeSlots: Math.max(0, totalSlots - usedSlots)
    };
  }

  function handlePointerOver(event) {
    const slot = event.target.closest(".cargo-slot[data-item-instance]");
    if (!slot || !elements.grid.contains(slot)) {
      hideTooltip();
      return;
    }
    showTooltip(slot.dataset.itemInstance, event.clientX, event.clientY);
  }

  function handlePointerMove(event) {
    if (memoLongPress && (Math.abs(event.clientX - memoLongPress.clientX) > MEMO_LONG_PRESS_MOVE_TOLERANCE
      || Math.abs(event.clientY - memoLongPress.clientY) > MEMO_LONG_PRESS_MOVE_TOLERANCE)) {
      cancelMemoLongPress(event);
    }
    const slot = event.target.closest(".cargo-slot[data-item-instance]");
    if (!slot || !elements.grid.contains(slot)) {
      hideTooltip();
      return;
    }
    showTooltip(slot.dataset.itemInstance, event.clientX, event.clientY);
  }

  function handleMemoLongPressStart(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const slot = event.target.closest(".cargo-slot[data-item-instance]");
    if (!slot || !elements.grid.contains(slot)) return;
    const item = state.items.find(entry => entry.instanceId === slot.dataset.itemInstance);
    const definition = itemDefinitions.get(item?.itemId) || null;
    if (!item || !definition || window.ProjectWMerchantPath?.isExcludedCategory?.(definition.category)) return;
    cancelMemoLongPress();
    memoLongPress = {
      pointerId: event.pointerId,
      instanceId: item.instanceId,
      itemId: item.itemId,
      clientX: event.clientX,
      clientY: event.clientY,
      timer: window.setTimeout(() => {
        const pending = memoLongPress;
        if (!pending || pending.pointerId !== event.pointerId) return;
        markMemoLongPressSlots(pending.instanceId, false);
        memoLongPress = null;
        hideTooltip();
        void window.ProjectWMerchantPath?.openItemMemo?.(pending.itemId);
      }, MEMO_LONG_PRESS_MS)
    };
    markMemoLongPressSlots(item.instanceId, true);
  }

  function cancelMemoLongPress(event) {
    if (!memoLongPress || (event?.pointerId != null && event.pointerId !== memoLongPress.pointerId)) return;
    window.clearTimeout(memoLongPress.timer);
    markMemoLongPressSlots(memoLongPress.instanceId, false);
    memoLongPress = null;
  }

  function markMemoLongPressSlots(instanceId, active) {
    if (!instanceId || !elements?.grid) return;
    elements.grid.querySelectorAll(`[data-item-instance="${CSS.escape(instanceId)}"]`).forEach(slot => {
      slot.classList.toggle("is-memo-long-press", active);
    });
  }

  function handleFocusIn(event) {
    const slot = event.target.closest(".cargo-slot[data-item-instance]");
    if (!slot) {
      hideTooltip();
      return;
    }
    const rect = slot.getBoundingClientRect();
    showTooltip(slot.dataset.itemInstance, rect.right, rect.top + (rect.height / 2));
  }

  function handleFocusOut(event) {
    if (!elements.grid.contains(event.relatedTarget)) hideTooltip();
  }

  function handleCargoViewportWheel(event) {
    if (event.ctrlKey || elements.grid.contains(event.target)) return;
    const delta = event.deltaY || event.deltaX;
    if (!delta) return;
    const previousScrollTop = elements.grid.scrollTop;
    elements.grid.scrollTop += delta;
    if (elements.grid.scrollTop !== previousScrollTop) event.preventDefault();
  }

  function setSortMode(mode) {
    if (!SORT_MODES.has(mode) || state.sortMode === mode) return;
    state.sortMode = mode;
    reflowItemPlacements();
    persistState();
    render();
  }

  function setActiveCompartment(type) {
    const target = String(type || "normal");
    if (!isCompartmentAvailable(target) || target === activeCompartment) return;
    activeCompartment = target;
    hideTooltip();
    render();
  }

  function handleDragStart(event) {
    cancelMemoLongPress();
    const slot = event.target.closest(".cargo-slot[data-item-instance]");
    if (!slot || !elements.grid.contains(slot)) {
      event.preventDefault();
      return;
    }
    draggedInstanceId = slot.dataset.itemInstance;
    hideTooltip();
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedInstanceId);
    elements.grid.querySelectorAll(`[data-item-instance="${draggedInstanceId}"]`).forEach(element => {
      element.classList.add("is-dragging");
    });
    if (elements.discardZone) elements.discardZone.hidden = false;
    elements.compartmentButtons.forEach(button => {
      const type = button.dataset.cargoCompartment;
      button.classList.toggle("is-drag-target", !button.hidden && type !== activeCompartment);
    });
  }

  function handleCompartmentDragEnter(event) {
    const button = event.currentTarget;
    if (!draggedInstanceId || button.disabled || button.hidden) return;
    event.preventDefault();
    button.classList.add("is-drag-over");
  }

  function handleCompartmentDragOver(event) {
    const button = event.currentTarget;
    if (!draggedInstanceId || button.disabled || button.hidden) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    button.classList.add("is-drag-over");
  }

  function handleCompartmentDragLeave(event) {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    event.currentTarget.classList.remove("is-drag-over");
  }

  function handleCompartmentDrop(event) {
    event.preventDefault();
    const targetType = event.currentTarget.dataset.cargoCompartment;
    const instanceId = draggedInstanceId || event.dataTransfer.getData("text/plain");
    clearDragState();
    moveItemToCompartment(instanceId, targetType);
  }

  function handleDiscardDragEnter(event) {
    if (!draggedInstanceId) return;
    event.preventDefault();
    elements.discardZone?.classList.add("is-drag-over");
  }

  function handleDiscardDragOver(event) {
    if (!draggedInstanceId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    elements.discardZone?.classList.add("is-drag-over");
  }

  function handleDiscardDragLeave(event) {
    if (elements.discardZone?.contains(event.relatedTarget)) return;
    elements.discardZone?.classList.remove("is-drag-over");
  }

  function handleDiscardDrop(event) {
    event.preventDefault();
    const instanceId = draggedInstanceId || event.dataTransfer.getData("text/plain");
    clearDragState();
    discardItem(instanceId);
  }

  function clearDragState() {
    draggedInstanceId = "";
    elements?.grid?.querySelectorAll(".is-dragging").forEach(element => element.classList.remove("is-dragging"));
    if (elements?.discardZone) {
      elements.discardZone.classList.remove("is-drag-over");
      elements.discardZone.hidden = true;
    }
    elements?.compartmentButtons?.forEach(button => button.classList.remove("is-drag-target", "is-drag-over"));
  }

  function moveItemToCompartment(instanceId, targetType) {
    const item = state.items.find(entry => entry.instanceId === instanceId);
    const destination = String(targetType || "normal");
    if (!item || item.slotType === destination || !isCompartmentAvailable(destination)) return false;
    const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
    const capacity = getCapacitySummary(state.items, destination);
    if (capacity.freeSlots < definition.slotCount) {
      notify(`${SLOT_TYPE_LABELS[destination]} 화물칸에 ${definition.slotCount}칸의 빈 공간이 필요합니다.`);
      return false;
    }
    item.slotType = destination;
    // TODO: 늑대 습격 구현 시 protected 화물은 손상 및 강탈 대상에서 제외한다.
    reflowItemPlacements();
    persistState();
    render();
    window.ProjectWAudio?.playEffect("goods");
    notify(`${definition.displayName}을 ${SLOT_TYPE_LABELS[destination]} 화물칸으로 옮겼습니다.`);
    window.dispatchEvent(new CustomEvent("projectw:cargochange", { detail: { itemId: item.itemId, compartmentChanged: true } }));
    return true;
  }

  function discardItem(instanceId) {
    const item = state.items.find(entry => entry.instanceId === instanceId);
    if (!item) return false;
    const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
    recordJourneyLoss(item, item.journeyLots, "직접 폐기");
    state.items = state.items.filter(entry => entry !== item);
    reflowItemPlacements();
    persistState();
    render();
    notify(`${definition.displayName} 화물을 폐기했습니다.`);
    window.ProjectWAudio?.playEffect("goods");
    window.dispatchEvent(new CustomEvent("projectw:cargochange", { detail: { itemId: item.itemId, discarded: true } }));
    return true;
  }

  function showTooltip(instanceId, cursorX, cursorY) {
    const item = state.items.find(entry => entry.instanceId === instanceId);
    if (!item) return;
    const definition = itemDefinitions.get(item.itemId) || sampleDefinition;

    if (hoveredInstanceId !== instanceId) {
      clearItemHighlights();
      hoveredInstanceId = instanceId;
      buildTooltip(definition, item);
      setItemHighlight(instanceId, true);
    }

    hideWeightTooltip();
    elements.tooltip.hidden = false;
    positionTooltip(cursorX, cursorY);
    renderNoteTooltip(definition);
    positionNoteTooltip();
  }

  function showDefinitionTooltip(itemId, quantity, cursorX, cursorY, metadata = {}) {
    const definition = itemDefinitions.get(itemId);
    if (!definition || !elements?.tooltip) return;
    const valueFactorKey = JSON.stringify(Array.isArray(metadata.tradeValueFactors) ? metadata.tradeValueFactors : []);
    const virtualKey = `definition:${itemId}:${quantity}:${metadata.quality || ""}:${metadata.originId || ""}:${metadata.originDistance ?? ""}:${metadata.originProductKind || ""}:${metadata.originPurchaseBonus ? "origin-buy" : "other-buy"}:${metadata.tradeValue ?? ""}:${metadata.hasTradeValue ? "trade" : "purchase"}:${metadata.purchaseValue || ""}:${metadata.durability || ""}:${metadata.hideOrigin ? "hidden" : "shown"}:${valueFactorKey}`;
    if (hoveredInstanceId !== virtualKey) {
      clearItemHighlights();
      hoveredInstanceId = virtualKey;
      buildTooltip(definition, {
        itemId,
        quantity: Math.max(1, Math.trunc(Number(quantity) || 1)),
        ...createDefaultTradeMetadata(metadata, definition),
        durability: metadata.durability != null && metadata.durability !== "" && Number.isFinite(Number(metadata.durability))
          ? Number(metadata.durability)
          : definition.durability,
        hideOrigin: Boolean(metadata.hideOrigin),
        purchaseValue: Number(metadata.purchaseValue) || definition.baseValue,
        tradeValue: Math.max(0, Number(metadata.tradeValue) || 0),
        hasTradeValue: Boolean(metadata.hasTradeValue),
        tradeValueFactors: (Array.isArray(metadata.tradeValueFactors) ? metadata.tradeValueFactors : []).map(factor => ({
          label: String(factor?.label || "가치 보정"),
          value: Number(factor?.value) || 0,
          detail: String(factor?.detail || "")
        }))
      });
    }
    hideWeightTooltip();
    elements.tooltip.hidden = false;
    positionTooltip(cursorX, cursorY);
    renderNoteTooltip(definition);
    positionNoteTooltip();
  }

  function buildTooltip(definition, item) {
    const knowledge = knowledgeProfile(definition, item);
    const header = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = knowledge.name;
    header.append(title);

    const meta = document.createElement("div");
    meta.className = "cargo-tooltip-meta";
    const category = document.createElement("span");
    category.textContent = definition.category;
    const rarity = document.createElement("span");
    const rarityLevel = Math.max(1, Math.min(5, Math.round(definition.rarity) || 1));
    rarity.className = `cargo-rarity cargo-rarity-${rarityLevel}`;
    rarity.textContent = `희귀 등급 ${formatNumber(definition.rarity)}`;
    const quality = document.createElement("span");
    quality.className = `cargo-quality cargo-quality-${qualityClassName(item.quality)}`;
    quality.textContent = knowledge.qualityText;
    meta.append(category);
    if (knowledge.showRarity) meta.append(rarity);
    if (knowledge.showQuality) meta.append(quality);
    const originProductBadge = createOriginProductBadge(item.originProductKind);
    if (knowledge.showOriginProduct && originProductBadge) meta.append(originProductBadge);

    const summary = document.createElement("div");
    summary.className = "cargo-tooltip-summary";
    summary.append(
      createSummaryStat("수량", `${item.quantity}${definition.unit}`),
      createSummaryStat("화물칸", `${definition.slotCount}칸`),
      createSummaryStat("무게", formatNumber(definition.weight * item.quantity))
    );

    const details = document.createElement("dl");
    const quantity = Math.max(1, Number(item.quantity) || 1);
    const purchaseValue = (Number(item.purchaseValue) > 0 ? Number(item.purchaseValue) : definition.baseValue) * quantity;
    const hasTradeValue = item.hasTradeValue === true || Number(item.tradeValue) > 0;
    const shownValue = hasTradeValue ? Math.max(0, Number(item.tradeValue) || 0) : purchaseValue;
    appendDetail(details, hasTradeValue ? "가치" : "구매 가치", formatNumber(shownValue), "cargo-actual-value");
    appendDetail(details, "칸당 가치", formatNumber(shownValue / Math.max(1, definition.slotCount)));
    appendDetail(details, "무게당 가치", formatNumber(shownValue / Math.max(.01, definition.weight * quantity)));
    if (knowledge.showOrigin) appendDetail(details, "원산지", item.originName || DEFAULT_ORIGIN_NAME);

    const durability = document.createElement("div");
    durability.className = "cargo-tooltip-durability";
    const durabilityLabel = document.createElement("span");
    const durabilityValue = document.createElement("strong");
    const currentDurability = Number.isFinite(Number(item.durability)) ? Number(item.durability) : definition.durability;
    durabilityLabel.textContent = "열화 내구도";
    durabilityValue.className = durabilityClassName(currentDurability, definition.durability);
    durabilityValue.textContent = formatDurability(currentDurability, definition.durability);
    durability.append(durabilityLabel, durabilityValue);

    const productDescription = document.createElement("p");
    productDescription.className = "cargo-tooltip-description";
    productDescription.textContent = (definition.description || "등록된 상품 설명이 없습니다.").replace(/<br\s*\/?\s*>/gi, "\n");
    const contents = [header, meta, summary, details];
    if (Array.isArray(item.tradeValueFactors) && item.tradeValueFactors.length) {
      const breakdown = document.createElement("section");
      breakdown.className = "cargo-tooltip-trade-breakdown";
      const breakdownTitle = document.createElement("strong");
      breakdownTitle.textContent = "가치 산정";
      const breakdownList = document.createElement("div");
      breakdownList.className = "cargo-tooltip-value-factors";
      item.tradeValueFactors.forEach(factor => {
        const row = document.createElement("div");
        const label = document.createElement("span");
        const value = document.createElement("em");
        const detail = document.createElement("small");
        const number = Number(factor.value) || 0;
        label.textContent = factor.label;
        value.className = number > 0 ? "is-positive" : number < 0 ? "is-negative" : "is-neutral";
        value.textContent = `${number > 0 ? "+" : ""}${formatNumber(number)}%`;
        detail.textContent = factor.detail;
        row.append(label, value);
        if (factor.detail) row.append(detail);
        breakdownList.append(row);
      });
      breakdown.append(breakdownTitle, breakdownList);
      contents.push(breakdown);
    }
    if (knowledge.showDurability) contents.push(durability);
    if (knowledge.showDescription) contents.push(productDescription);
    if (definition.useEffect) contents.push(createEffectSection("사용 효과", definition.useEffect));
    if (definition.campEffect) contents.push(createEffectSection("야영 효과", definition.campEffect));
    elements.tooltip.replaceChildren(...contents);
  }

  function renderNoteTooltip(definition) {
    if (!elements?.noteTooltip) return;
    const notebook = window.ProjectWMerchantPath?.getItemNotebook?.(definition?.id);
    const notes = Array.isArray(notebook?.notes) ? notebook.notes : [];
    const outlets = Array.isArray(notebook?.outlets) ? notebook.outlets : [];
    const journeys = Array.isArray(notebook?.journeys) ? notebook.journeys : [];
    if (!notes.length && !outlets.length && !journeys.length) {
      hideNoteTooltip();
      return;
    }
    const header = document.createElement("header");
    const title = document.createElement("strong");
    const summary = document.createElement("small");
    title.textContent = "행상인의 메모";
    summary.className = "cargo-note-summary";
    summary.textContent = `취급 ${formatNumber(outlets.length)}곳 · 완료 교역 ${formatNumber(journeys.length)}건`;
    header.append(title, summary);
    const contents = [header];
    const overview = document.createElement("div");
    overview.className = "cargo-note-overview";
    if (outlets.length) {
      const section = document.createElement("section");
      section.className = "cargo-note-outlets";
      const heading = document.createElement("b");
      const list = document.createElement("div");
      heading.textContent = "취급 이력";
      list.className = "cargo-note-outlet-badges";
      outlets.slice(0, 8).forEach(outlet => {
        const badge = document.createElement("span");
        badge.className = `is-${outlet.state}`;
        badge.textContent = outlet.settlementName;
        badge.title = `${outlet.year}년 ${outlet.month}월 ${outlet.day}일 · ${outlet.facilityType}`;
        list.append(badge);
      });
      if (outlets.length > 8) {
        const more = document.createElement("span");
        more.className = "is-more";
        more.textContent = `+${formatNumber(outlets.length - 8)}곳`;
        list.append(more);
      }
      section.append(heading, list);
      overview.append(section);
    }
    if (notes.length) {
      const section = document.createElement("section");
      const heading = document.createElement("b");
      const list = document.createElement("ul");
      heading.textContent = "상품 메모";
      notes.forEach(note => {
        const item = document.createElement("li");
        item.textContent = note;
        list.append(item);
      });
      section.append(heading, list);
      overview.append(section);
    }
    if (overview.childElementCount) contents.push(overview);
    if (journeys.length) {
      const section = document.createElement("section");
      section.className = "cargo-note-history";
      const sectionHeader = document.createElement("div");
      const heading = document.createElement("b");
      const limit = document.createElement("span");
      const list = document.createElement("div");
      sectionHeader.className = "cargo-note-section-heading";
      heading.textContent = "완료한 교역";
      limit.textContent = "최근 6건";
      sectionHeader.append(heading, limit);
      list.className = "cargo-note-journey-list";
      journeys.forEach(record => {
        const item = document.createElement("article");
        item.className = "cargo-note-journey";
        const head = document.createElement("header");
        const headLabel = document.createElement("strong");
        const rate = document.createElement("em");
        headLabel.className = "trade-journey-quantity";
        headLabel.textContent = `${formatNumber(record.quantity)}개 거래`;
        rate.className = `trade-journey-result ${Number(record.returnRate) > 0 ? "is-profit" : "is-loss"}`;
        rate.textContent = `${Number(record.returnRate) > 0 ? "+" : ""}${formatNumber(record.returnRate)}%`;
        head.append(headLabel, rate);
        appendCargoReviewBadge(head, record.review);
        const route = document.createElement("div");
        const divider = document.createElement("span");
        const meta = document.createElement("p");
        route.className = "cargo-note-journey-route";
        divider.className = "trade-journey-divider";
        divider.setAttribute("aria-hidden", "true");
        route.append(
          createCargoJourneyStop("구입", record.purchase, record.purchaseAgeDays),
          divider,
          createCargoJourneyStop("판매", record.close, record.closeAgeDays)
        );
        meta.className = "cargo-note-journey-meta";
        meta.textContent = `${formatNumber(record.elapsedDays)}일 · ${formatNumber(record.distance)} 거리`;
        item.append(head, route, meta);
        list.append(item);
      });
      section.append(sectionHeader, list);
      contents.push(section);
    }
    elements.noteTooltip.dataset.journeyCount = String(journeys.length);
    elements.noteTooltip.dataset.overviewCount = String(Number(outlets.length > 0) + Number(notes.length > 0));
    elements.noteTooltip.replaceChildren(...contents);
    elements.noteTooltip.hidden = false;
  }

  function createCargoJourneyStop(action, record, ageDays) {
    const stop = document.createElement("div");
    stop.className = `cargo-note-journey-stop ${action === "구입" ? "is-purchase" : "is-sale"}`;
    const actionLabel = document.createElement("small");
    const city = document.createElement("strong");
    const detail = document.createElement("span");
    const bargain = document.createElement("em");
    actionLabel.className = "trade-journey-stop-kind";
    actionLabel.textContent = `${action} · ${relativeNotebookDay(ageDays)}`;
    city.className = "trade-journey-stop-city is-trade-highlight";
    city.textContent = `${record?.settlementName || "이름 없는 거점"} / ${record?.facilityName || record?.facilityType || "상점"}`;
    city.title = city.textContent;
    const value = document.createElement("b");
    detail.className = "trade-journey-stop-value";
    value.className = "is-trade-highlight";
    value.textContent = `${action}/개 ${formatNumber(record?.unitValue)}`;
    detail.append(value);
    bargain.className = "trade-journey-stop-bargain";
    bargain.textContent = bargainNotebookLabel(record?.bargainSuccesses);
    stop.append(actionLabel, bargain, city, detail);
    return stop;
  }

  function appendCargoReviewBadge(container, review) {
    if (!review?.completed) return;
    const badge = document.createElement("span");
    badge.className = `trade-review-record-badge is-${review.outcome === "positive" ? "positive" : "negative"}`;
    badge.textContent = review.outcome === "positive" ? "◆ 복기 · 이익" : "◆ 복기 · 손실";
    container.append(badge);
  }

  function relativeNotebookDay(ageDays) {
    const days = Math.max(0, Math.trunc(Number(ageDays) || 0));
    return days === 0 ? "오늘" : `${formatNumber(days)}일 전`;
  }

  function bargainNotebookLabel(value) {
    const successes = Math.max(0, Math.trunc(Number(value) || 0));
    return successes > 0 ? `흥정 ${formatNumber(successes)}회 성공` : "흥정 없음";
  }

  function positionNoteTooltip() {
    if (!elements?.noteTooltip || elements.noteTooltip.hidden || elements.tooltip.hidden) return;
    const margin = 12;
    const gap = 8;
    const anchor = elements.tooltip.getBoundingClientRect();
    const rect = elements.noteTooltip.getBoundingClientRect();
    let left = anchor.right + gap;
    if (left + rect.width > window.innerWidth - margin) left = anchor.left - rect.width - gap;
    left = Math.min(Math.max(margin, left), window.innerWidth - rect.width - margin);
    const top = Math.min(Math.max(margin, anchor.top), window.innerHeight - rect.height - margin);
    elements.noteTooltip.style.left = `${Math.round(left)}px`;
    elements.noteTooltip.style.top = `${Math.round(top)}px`;
  }

  function hideNoteTooltip() {
    if (elements?.noteTooltip) elements.noteTooltip.hidden = true;
  }

  function qualityClassName(quality) {
    return ({ 저품질: "low", 통상품질: "common", 고품질: "high", 명품: "masterpiece" })[quality] || "common";
  }

  function isNonTradeCategory(category) {
    const normalized = String(category || "").replaceAll(" ", "");
    return ["여행물품", "야영물품", "여행식량", "야영식량", "여행음식", "야영음식"].includes(normalized);
  }

  function knowledgeProfile(definition, item = {}) {
    if (window.ProjectWMerchantPath?.getDisplayProfile) {
      return window.ProjectWMerchantPath.getDisplayProfile(definition, item);
    }
    const nonTradeItem = isNonTradeCategory(definition?.category);
    return {
      level: 7,
      name: String(definition?.displayName || definition?.name1 || definition?.id || "상품"),
      showRarity: true,
      showDurability: true,
      showDescription: true,
      showQuality: !nonTradeItem,
      showOrigin: !nonTradeItem,
      showOriginProduct: !nonTradeItem,
      showQualityNumber: !nonTradeItem,
      qualityText: nonTradeItem ? "" : (QUALITY_NAMES.has(item.quality) ? item.quality : "통상품질")
    };
  }

  function createOriginProductBadge(kind) {
    const normalized = String(kind || "");
    if (!['specialty', 'famous'].includes(normalized)) return null;
    const badge = document.createElement("span");
    badge.className = `origin-product-badge is-${normalized}`;
    badge.textContent = normalized === "famous" ? "명산품" : "특산물";
    return badge;
  }

  function createSummaryStat(labelText, valueText) {
    const stat = document.createElement("span");
    const label = document.createElement("small");
    const value = document.createElement("strong");
    label.textContent = labelText;
    value.textContent = valueText;
    stat.append(label, value);
    return stat;
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

  function createEffectSection(titleText, effectText) {
    const section = document.createElement("section");
    section.className = "cargo-tooltip-effect";
    const title = document.createElement("strong");
    const description = document.createElement("p");
    title.textContent = titleText;
    description.textContent = String(effectText).replace(/<br\s*\/?\s*>/gi, "\n");
    section.append(title, description);
    return section;
  }

  function appendDetail(list, label, value, className = "") {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    if (className) {
      term.classList.add(className);
      description.classList.add(className);
    }
    list.append(term, description);
  }

  function showWeightTooltipFromEvent(event) {
    showWeightTooltip(event.clientX, event.clientY);
  }

  function showWeightTooltipFromFocus() {
    const rect = elements.weightPanel.getBoundingClientRect();
    showWeightTooltip(rect.right, rect.bottom);
  }

  function showWeightTooltip(cursorX, cursorY) {
    if (!elements?.weightTooltip) return;
    clearItemHighlights();
    hoveredInstanceId = "";
    elements.tooltip.hidden = true;
    hideNoteTooltip();
    const load = getLoadSummary();
    const header = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = "적재 중량";
    header.append(title);
    const details = document.createElement("dl");
    appendDetail(details, "현재 중량", `${formatNumber(load.weight)} / ${formatNumber(load.maxWeight)}`);
    if (load.overweightPercent > 0) {
      appendDetail(details, "초과 중량", `+${formatNumber(load.weight - load.maxWeight)}`, "is-danger");
      appendDetail(details, "초과 비율", `${formatNumber(load.overweightPercent)}%`, "is-danger");
      appendDetail(details, "이동속도", `-${formatNumber(load.speedPenaltyPercent)}%`, "is-danger");
    } else appendDetail(details, "과적 패널티", "없음", "is-healthy");
    const rule = document.createElement("p");
    rule.textContent = `최대 중량 초과분 ${formatNumber(load.thresholdPercent)}%마다 이동속도가 ${formatNumber(load.penaltyPerThreshold)}% 감소합니다. 최종 이동속도는 기본 속도의 10% 아래로 내려가지 않습니다.`;
    elements.weightTooltip.replaceChildren(header, details, rule);
    elements.weightTooltip.hidden = false;
    positionWeightTooltip(cursorX, cursorY);
  }

  function positionWeightTooltip(cursorX, cursorY) {
    const margin = 12;
    const gap = 14;
    const rect = elements.weightTooltip.getBoundingClientRect();
    let left = cursorX + gap;
    if (left + rect.width > window.innerWidth - margin) left = cursorX - rect.width - gap;
    left = Math.min(Math.max(margin, left), window.innerWidth - rect.width - margin);
    let top = cursorY + gap;
    if (top + rect.height > window.innerHeight - margin) top = cursorY - rect.height - gap;
    top = Math.min(Math.max(margin, top), window.innerHeight - rect.height - margin);
    elements.weightTooltip.style.left = `${Math.round(left)}px`;
    elements.weightTooltip.style.top = `${Math.round(top)}px`;
  }

  function hideWeightTooltip() {
    if (elements?.weightTooltip) elements.weightTooltip.hidden = true;
  }

  function positionTooltip(cursorX, cursorY) {
    const margin = 12;
    const gap = 16;
    const rect = elements.tooltip.getBoundingClientRect();
    let left = cursorX + gap;
    if (left + rect.width > window.innerWidth - margin) left = cursorX - rect.width - gap;
    left = Math.min(Math.max(margin, left), window.innerWidth - rect.width - margin);

    let top = cursorY - rect.height - gap;
    if (top < margin) top = cursorY + gap;
    top = Math.min(Math.max(margin, top), window.innerHeight - rect.height - margin);
    elements.tooltip.style.left = `${Math.round(left)}px`;
    elements.tooltip.style.top = `${Math.round(top)}px`;
  }

  function setItemHighlight(instanceId, active) {
    elements.grid.querySelectorAll(`[data-item-instance="${instanceId}"]`).forEach(element => {
      element.classList.toggle("is-item-hovered", active);
    });
  }

  function clearItemHighlights() {
    if (!elements?.grid) return;
    elements.grid.querySelectorAll(".is-item-hovered").forEach(element => {
      element.classList.remove("is-item-hovered");
    });
  }

  function hideTooltip() {
    if (!elements?.tooltip) return;
    clearItemHighlights();
    hoveredInstanceId = "";
    elements.tooltip.hidden = true;
    hideNoteTooltip();
    hideWeightTooltip();
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(error);
    }
    state = createDefaultState();
    activeCompartment = "normal";
    reflowItemPlacements();
    hideTooltip();
    render();
  }

  function getItemQuantity(itemId) {
    return state.items
      .filter(item => item.itemId === itemId)
      .reduce((total, item) => total + Math.max(0, Math.trunc(Number(item.quantity) || 0)), 0);
  }

  function getItemDefinition(itemId) {
    const definition = itemDefinitions.get(itemId);
    return definition ? { ...definition } : null;
  }

  function getItemDefinitions() {
    return [...itemDefinitions.values()].map(definition => ({ ...definition }));
  }

  function getRegionalCampSupplyIds(settlement) {
    if (!["도시", "대도시"].includes(settlement?.category)) return [];
    return [...REGIONAL_CAMP_SUPPLIES]
      .filter(([, region]) => region === settlement.region)
      .map(([itemId]) => itemId);
  }

  function getInventoryItems() {
    return state.items
      .slice()
      .sort((left, right) => Object.keys(SLOT_TYPE_LABELS).indexOf(left.slotType || "normal") - Object.keys(SLOT_TYPE_LABELS).indexOf(right.slotType || "normal")
        || left.startSlot - right.startSlot)
      .map(item => ({
        ...item,
        journeyLots: normalizeJourneyLots(item.journeyLots, item.quantity),
        definition: { ...(itemDefinitions.get(item.itemId) || sampleDefinition) }
      }));
  }

  function consumeItem(itemId, amount = 1) {
    let remaining = Math.max(1, Math.trunc(Number(amount) || 1));
    if (getItemQuantity(itemId) < remaining) return false;

    state.items
      .filter(item => item.itemId === itemId)
      .sort((left, right) => left.startSlot - right.startSlot)
      .forEach(item => {
        if (remaining <= 0) return;
        const consumed = Math.min(item.quantity, remaining);
        const lostLots = takeJourneyLots(item.journeyLots, consumed);
        item.quantity -= consumed;
        remaining -= consumed;
        recordJourneyLoss(item, lostLots, "소모 또는 제거");
      });
    state.items = state.items.filter(item => item.quantity > 0);
    reflowItemPlacements();
    persistState();
    render();
    window.dispatchEvent(new CustomEvent("projectw:cargochange", { detail: { itemId } }));
    return true;
  }

  function consumeInstance(instanceId, amount = 1) {
    const item = state.items.find(entry => entry.instanceId === instanceId);
    const requested = Math.max(1, Math.trunc(Number(amount) || 1));
    if (!item || item.quantity < requested) return false;
    const lostLots = takeJourneyLots(item.journeyLots, requested);
    item.quantity -= requested;
    if (item.quantity <= 0) {
      state.items = state.items.filter(entry => entry !== item);
    }
    recordJourneyLoss(item, lostLots, "소모 또는 제거");
    reflowItemPlacements();
    persistState();
    render();
    window.dispatchEvent(new CustomEvent("projectw:cargochange", { detail: { itemId: item.itemId } }));
    return true;
  }

  function damageItem(instanceId, amount) {
    const item = state.items.find(entry => entry.instanceId === instanceId);
    if (!item) return null;
    const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
    const maximum = Math.max(0, Number(definition.durability) || 0);
    if (maximum >= INDESTRUCTIBLE_DURABILITY) {
      const repaired = Number(item.durability) !== maximum;
      item.durability = maximum;
      if (repaired) {
        persistState();
        render();
        window.dispatchEvent(new CustomEvent("projectw:cargochange", { detail: { itemId: item.itemId } }));
      }
      return { current: maximum, maximum, damage: 0, indestructible: true };
    }
    const current = Number.isFinite(Number(item.durability)) ? Number(item.durability) : definition.durability;
    const damage = Math.max(0, Number(amount) || 0);
    item.durability = Math.max(0, current - damage);
    const discarded = item.durability <= 0;
    if (discarded) {
      recordJourneyLoss(item, item.journeyLots, "열화내구도 소진");
      state.items = state.items.filter(entry => entry !== item);
      reflowItemPlacements();
      notify(`${definition.displayName}의 열화내구도가 소진되어 자동으로 폐기되었습니다.`);
      window.ProjectWAudio?.playEffect("goods");
    }
    persistState();
    render();
    window.dispatchEvent(new CustomEvent("projectw:cargochange", { detail: { itemId: item.itemId, discarded } }));
    return { current: item.durability, maximum: definition.durability, damage, discarded };
  }

  function applyTravelDeterioration({
    terrains = [],
    environments = [],
    roadSurfaces = [],
    season = "",
    weather = "",
    extraBreakageMinimum = 0,
    extraBreakageMaximum = 0,
    extraFreshMinimum = 0,
    extraFreshMaximum = 0,
    breakageReductionChance = 0,
    freshReductionChance = 0,
    categoryReductionChances = {},
    rng = Math.random
  } = {}) {
    const terrainSet = new Set(Array.isArray(terrains) ? terrains : []);
    const environmentSet = new Set(Array.isArray(environments) ? environments : []);
    const roadSurfaceSet = new Set(Array.isArray(roadSurfaces) ? roadSurfaces : []);
    const currentSeason = String(season || "").trim();
    const currentWeather = String(weather || "").trim();
    const random = typeof rng === "function" ? rng : Math.random;
    const results = [];

    state.items.forEach(item => {
      const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
      const maximum = Math.max(0, Number(definition.durability) || 0);
      if (maximum >= INDESTRUCTIBLE_DURABILITY || maximum <= 0) return;

      let minimumDamage = 1;
      let maximumDamage = 3;
      if (definition.deteriorationBreakage) {
        if (terrainSet.has("험지")) {
          minimumDamage += 1;
          maximumDamage += 1;
        }
        if (terrainSet.has("산지")) {
          minimumDamage += 1;
          maximumDamage += 2;
        }
        if (terrainSet.has("숲길")) maximumDamage += 1;
        if (roadSurfaceSet.has("거친 길")) maximumDamage += 1;
        if (roadSurfaceSet.has("관리된 길")) maximumDamage -= 1;
        minimumDamage += Math.trunc(Number(extraBreakageMinimum) || 0);
        maximumDamage += Math.trunc(Number(extraBreakageMaximum) || 0);
      }
      if (definition.deteriorationFresh) {
        if (environmentSet.has("추위")) minimumDamage -= 1;
        if (environmentSet.has("혹한")) {
          minimumDamage -= 1;
          maximumDamage -= 1;
        }
        if (environmentSet.has("다습")) {
          minimumDamage += 1;
          maximumDamage += 2;
        }
        if (currentSeason === "여름") {
          minimumDamage += 1;
          maximumDamage += 1;
        }
        if (currentSeason === "겨울") {
          minimumDamage -= 1;
          maximumDamage -= 1;
        }
        if (currentWeather === "비") maximumDamage += 1;
        if (currentWeather === "폭우") {
          minimumDamage += 1;
          maximumDamage += 1;
        }
        if (currentWeather === "눈" || currentWeather === "폭설") minimumDamage -= 1;
        minimumDamage += Math.trunc(Number(extraFreshMinimum) || 0);
        maximumDamage += Math.trunc(Number(extraFreshMaximum) || 0);
      }

      minimumDamage = Math.max(0, Math.trunc(minimumDamage));
      maximumDamage = Math.max(1, minimumDamage, Math.trunc(maximumDamage));
      let damage = minimumDamage + Math.floor(random() * ((maximumDamage - minimumDamage) + 1));
      const breakageChance = Math.max(0, Math.min(1, Number(breakageReductionChance) || 0));
      const freshChance = Math.max(0, Math.min(1, Number(freshReductionChance) || 0));
      if (definition.deteriorationBreakage && breakageChance > 0 && random() < breakageChance) damage -= 1;
      if (definition.deteriorationFresh && freshChance > 0 && random() < freshChance) damage -= 1;
      const categoryChance = Math.max(0, Math.min(1, Number(categoryReductionChances?.[definition.category]) || 0));
      if (categoryChance > 0 && random() < categoryChance) damage -= 1;
      damage = Math.max(0, damage);
      const current = Number.isFinite(Number(item.durability)) ? Number(item.durability) : maximum;
      const appliedDamage = Math.min(current, Math.max(0, damage));
      if (appliedDamage <= 0) return;
      item.durability = Math.max(0, current - appliedDamage);
      results.push({
        instanceId: item.instanceId,
        itemId: item.itemId,
        damage: appliedDamage,
        current: item.durability,
        maximum
      });
    });

    const discardedResults = results.filter(result => result.current <= 0);
    if (discardedResults.length) {
      const discardedIds = new Set(discardedResults.map(result => result.instanceId));
      state.items.filter(item => discardedIds.has(item.instanceId)).forEach(item => {
        recordJourneyLoss(item, item.journeyLots, "열화내구도 소진");
      });
      state.items = state.items.filter(item => !discardedIds.has(item.instanceId));
      reflowItemPlacements();
      const names = discardedResults.map(result => (itemDefinitions.get(result.itemId) || sampleDefinition).displayName);
      notify(`${names.join(", ")}의 열화내구도가 소진되어 자동으로 폐기되었습니다.`);
      window.ProjectWAudio?.playEffect("goods");
    }

    if (results.length) {
      persistState();
      render();
      window.dispatchEvent(new CustomEvent("projectw:cargochange", {
        detail: {
          deterioration: true,
          affectedItems: results.length,
          totalDamage: results.reduce((sum, result) => sum + result.damage, 0),
          discardedItems: discardedResults.length
        }
      }));
    }
    return results;
  }

  function discardAll(reason = "짐마차가 반파되어 화물을 모두 폐기했습니다.") {
    const discardedQuantity = state.items.reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0);
    if (!state.items.length) return 0;
    state.items.forEach(item => recordJourneyLoss(item, item.journeyLots, "이벤트 또는 사고로 유실"));
    state.items = [];
    reflowItemPlacements();
    persistState();
    render();
    notify(reason);
    window.ProjectWAudio?.playEffect("goods");
    window.dispatchEvent(new CustomEvent("projectw:cargochange", {
      detail: { discardedAll: true, discardedItems: discardedQuantity }
    }));
    return discardedQuantity;
  }

  function formatDurability(currentValue, maximumValue) {
    const maximum = Number(maximumValue) || 0;
    if (maximum >= INDESTRUCTIBLE_DURABILITY) return "- / -";
    return `${formatNumber(currentValue)} / ${formatNumber(maximum)}`;
  }

  function compareCargoItems(left, right) {
    const leftDefinition = itemDefinitions.get(left.itemId) || sampleDefinition;
    const rightDefinition = itemDefinitions.get(right.itemId) || sampleDefinition;
    const leftSpecial = SPECIAL_CATEGORY_ORDER.has(leftDefinition.category)
      ? SPECIAL_CATEGORY_ORDER.get(leftDefinition.category)
      : SPECIAL_CATEGORY_ORDER.size;
    const rightSpecial = SPECIAL_CATEGORY_ORDER.has(rightDefinition.category)
      ? SPECIAL_CATEGORY_ORDER.get(rightDefinition.category)
      : SPECIAL_CATEGORY_ORDER.size;
    if (leftSpecial !== rightSpecial) return leftSpecial - rightSpecial;

    if (leftSpecial < SPECIAL_CATEGORY_ORDER.size) {
      return leftDefinition.id.localeCompare(rightDefinition.id, "ko")
        || left.instanceId.localeCompare(right.instanceId, "ko");
    }

    const leftValue = (Number(left.purchaseValue) > 0 ? Number(left.purchaseValue) : leftDefinition.baseValue) * Math.max(1, Number(left.quantity) || 1);
    const rightValue = (Number(right.purchaseValue) > 0 ? Number(right.purchaseValue) : rightDefinition.baseValue) * Math.max(1, Number(right.quantity) || 1);
    const rarityDifference = rightDefinition.rarity - leftDefinition.rarity;
    const valueDifference = rightValue - leftValue;
    const categoryDifference = compareTradeCategories(leftDefinition.category, rightDefinition.category);
    let comparison = 0;
    if (state.sortMode === "value") comparison = valueDifference || rarityDifference || categoryDifference;
    else if (state.sortMode === "category") comparison = categoryDifference || rarityDifference || valueDifference;
    else comparison = rarityDifference || valueDifference || categoryDifference;
    return comparison
      || leftDefinition.displayName.localeCompare(rightDefinition.displayName, "ko")
      || left.instanceId.localeCompare(right.instanceId, "ko");
  }

  function compareTradeCategories(leftCategory, rightCategory) {
    const fallbackIndex = TRADE_CATEGORY_ORDER.size;
    const leftIndex = TRADE_CATEGORY_ORDER.get(leftCategory) ?? fallbackIndex;
    const rightIndex = TRADE_CATEGORY_ORDER.get(rightCategory) ?? fallbackIndex;
    return (leftIndex - rightIndex) || String(leftCategory).localeCompare(String(rightCategory), "ko");
  }

  function reflowItemPlacements() {
    state.items
      .forEach(item => { item.slotType = item.slotType in SLOT_TYPE_LABELS ? item.slotType : "normal"; });
    Object.keys(SLOT_TYPE_LABELS).forEach(slotType => {
      let nextSlot = 0;
      state.items.filter(item => item.slotType === slotType)
        .sort(compareCargoItems)
        .forEach(item => {
          const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
          item.startSlot = nextSlot;
          item.slotCount = Math.max(1, Number(definition.slotCount) || 1);
          nextSlot += item.slotCount;
        });
    });
  }

  function reconcileCapacityLimits() {
    const unlocks = normalizedCompartmentUnlocks();
    const normalCapacity = compartmentCapacity("normal");
    let normalUsed = getCapacitySummary(state.items, "normal").usedSlots;
    if (normalUsed > normalCapacity && unlocks.protected) {
      let protectedFree = getCapacitySummary(state.items, "protected").freeSlots;
      const candidates = state.items
        .filter(item => (item.slotType || "normal") === "normal")
        .sort((left, right) => right.startSlot - left.startSlot);
      for (const item of candidates) {
        if (normalUsed <= normalCapacity) break;
        const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
        const slots = Math.max(1, Number(definition.slotCount) || 1);
        if (slots > protectedFree) continue;
        item.slotType = "protected";
        normalUsed -= slots;
        protectedFree -= slots;
      }
    }
    reflowItemPlacements();
    persistState();
    render();
    return getCapacitySummary();
  }

  function showItemTooltip(instanceId, clientX, clientY) {
    showTooltip(instanceId, clientX, clientY);
  }

  function addItem(itemId, amount = 1, metadata = {}) {
    const definition = itemDefinitions.get(itemId);
    let remaining = Math.max(0, Math.trunc(Number(amount) || 0));
    if (!definition || remaining <= 0) return 0;
    const incomingDurability = metadata.durability != null && metadata.durability !== "" && Number.isFinite(Number(metadata.durability))
      ? Number(metadata.durability)
      : definition.durability;
    if (Number(definition.durability) > 0
      && Number(definition.durability) < INDESTRUCTIBLE_DURABILITY
      && incomingDurability <= 0) {
      notify(`${definition.displayName}의 열화내구도가 소진되어 자동으로 폐기되었습니다.`);
      window.ProjectWAudio?.playEffect("goods");
      return 0;
    }
    const requested = remaining;
    const maxStack = Math.max(1, definition.maxStack || 1);
    const tradeMetadata = createDefaultTradeMetadata(metadata, definition);
    const incomingJourneyLots = normalizeJourneyLots(metadata.journeyLots, requested);
    const targetSlotType = isCompartmentAvailable(metadata.slotType) ? metadata.slotType : "normal";
    if (!(tradeMetadata.purchaseValue > 0)) tradeMetadata.purchaseValue = definition.baseValue;

    if (isUnifiedStackDefinition(definition)) {
      const target = state.items.find(item => item.slotType === targetSlotType && item.itemId === itemId);
      if (target) {
        const addedJourneyLots = takeJourneyLots(incomingJourneyLots, remaining);
        mergeUnifiedStackMetadata(target, remaining, incomingDurability, tradeMetadata);
        appendJourneyLots(target, addedJourneyLots);
        remaining = 0;
      } else {
        const startSlot = findFreeContiguousSlots(definition.slotCount, targetSlotType);
        if (startSlot >= 0) {
          state.items.push({
            instanceId: `CARGO_${Date.now()}_${String(state.items.length + 1).padStart(3, "0")}`,
            itemId,
            quantity: remaining,
            startSlot,
            slotCount: definition.slotCount,
            durability: incomingDurability,
            slotType: targetSlotType,
            ...tradeMetadata,
            journeyLots: takeJourneyLots(incomingJourneyLots, remaining)
          });
          remaining = 0;
        }
      }
    } else {
      state.items
        .filter(item => item.slotType === targetSlotType
          && item.itemId === itemId
          && item.quantity < maxStack
          && sameTradeMetadata(item, tradeMetadata)
          && canMergeJourneyLots(item, incomingJourneyLots))
        .sort((left, right) => left.startSlot - right.startSlot)
        .forEach(item => {
          if (remaining <= 0) return;
          const added = Math.min(maxStack - item.quantity, remaining);
          const addedJourneyLots = takeJourneyLots(incomingJourneyLots, added);
          item.quantity += added;
          appendJourneyLots(item, addedJourneyLots);
          remaining -= added;
        });

      while (remaining > 0) {
        const startSlot = findFreeContiguousSlots(definition.slotCount, targetSlotType);
        if (startSlot < 0) break;
        const quantity = Math.min(maxStack, remaining);
        const itemJourneyLots = takeJourneyLots(incomingJourneyLots, quantity);
        state.items.push({
          instanceId: `CARGO_${Date.now()}_${String(state.items.length + 1).padStart(3, "0")}`,
          itemId,
          quantity,
          startSlot,
          slotCount: definition.slotCount,
          durability: incomingDurability,
          slotType: targetSlotType,
          ...tradeMetadata,
          journeyLots: itemJourneyLots
        });
        remaining -= quantity;
      }
    }

    const added = requested - remaining;
    if (added > 0) {
      reflowItemPlacements();
      persistState();
      render();
      window.dispatchEvent(new CustomEvent("projectw:cargochange", { detail: { itemId } }));
    }
    return added;
  }

  function buildExchangeDraft({ remove = [], add = [] } = {}, { allowOverflow = false } = {}) {
    const draft = state.items.map(item => ({ ...item, journeyLots: normalizeJourneyLots(item.journeyLots, item.quantity) }));
    const removals = new Map();
    remove.forEach(entry => {
      const instanceId = String(entry?.instanceId || "");
      const quantity = Math.max(0, Math.trunc(Number(entry?.quantity) || 0));
      if (instanceId && quantity > 0) removals.set(instanceId, (removals.get(instanceId) || 0) + quantity);
    });
    for (const [instanceId, quantity] of removals) {
      const item = draft.find(entry => entry.instanceId === instanceId);
      if (!item || item.quantity < quantity) return null;
      takeJourneyLots(item.journeyLots, quantity);
      item.quantity -= quantity;
    }
    const remainingItems = draft.filter(item => item.quantity > 0);
    const additions = add.flatMap(entry => {
      const itemId = String(entry?.itemId || "");
      const quantity = Math.max(0, Math.trunc(Number(entry?.quantity) || 0));
      return itemId && quantity > 0 ? [{ ...entry, itemId, quantity }] : [];
    });

    let sequence = 0;
    for (const addition of additions) {
      const { itemId } = addition;
      const definition = itemDefinitions.get(itemId);
      if (!definition) return null;
      let quantity = addition.quantity;
      const maxStack = Math.max(1, definition.maxStack || 1);
      const tradeMetadata = createDefaultTradeMetadata(addition, definition);
      const incomingJourneyLots = normalizeJourneyLots(addition.journeyLots, addition.quantity);
      const targetSlotType = "normal";
      const incomingDurability = addition.durability != null
        && addition.durability !== ""
        && Number.isFinite(Number(addition.durability))
        ? Number(addition.durability)
        : definition.durability;
      if (!(tradeMetadata.purchaseValue > 0)) tradeMetadata.purchaseValue = definition.baseValue;
      if (isUnifiedStackDefinition(definition)) {
        const target = remainingItems.find(item => item.slotType === targetSlotType && item.itemId === itemId);
        if (target) {
          const addedJourneyLots = takeJourneyLots(incomingJourneyLots, quantity);
          mergeUnifiedStackMetadata(target, quantity, incomingDurability, tradeMetadata);
          appendJourneyLots(target, addedJourneyLots);
          quantity = 0;
        } else {
          const occupiedSlots = remainingItems
            .filter(item => (item.slotType || "normal") === targetSlotType)
            .reduce((sum, item) => {
              const itemDefinition = itemDefinitions.get(item.itemId) || sampleDefinition;
              return sum + itemDefinition.slotCount;
            }, 0);
          if (!allowOverflow && occupiedSlots + definition.slotCount > compartmentCapacity(targetSlotType)) return null;
          sequence += 1;
          remainingItems.push({
            instanceId: `CARGO_TRADE_${Date.now()}_${String(sequence).padStart(3, "0")}`,
            itemId,
            quantity,
            startSlot: occupiedSlots,
            slotCount: definition.slotCount,
            durability: incomingDurability,
            slotType: targetSlotType,
            ...tradeMetadata,
            journeyLots: takeJourneyLots(incomingJourneyLots, quantity)
          });
          quantity = 0;
        }
        continue;
      }
      remainingItems
        .filter(item => item.slotType === targetSlotType
          && item.itemId === itemId
          && item.quantity < maxStack
          && sameTradeMetadata(item, tradeMetadata)
          && canMergeJourneyLots(item, incomingJourneyLots))
        .forEach(item => {
          if (quantity <= 0) return;
          const added = Math.min(maxStack - item.quantity, quantity);
          const addedJourneyLots = takeJourneyLots(incomingJourneyLots, added);
          item.quantity += added;
          appendJourneyLots(item, addedJourneyLots);
          quantity -= added;
        });
      while (quantity > 0) {
        const occupiedSlots = remainingItems.filter(item => (item.slotType || "normal") === targetSlotType).reduce((sum, item) => {
          const itemDefinition = itemDefinitions.get(item.itemId) || sampleDefinition;
          return sum + itemDefinition.slotCount;
        }, 0);
        if (!allowOverflow && occupiedSlots + definition.slotCount > compartmentCapacity(targetSlotType)) return null;
        const stackQuantity = Math.min(maxStack, quantity);
        const itemJourneyLots = takeJourneyLots(incomingJourneyLots, stackQuantity);
        sequence += 1;
        remainingItems.push({
          instanceId: `CARGO_TRADE_${Date.now()}_${String(sequence).padStart(3, "0")}`,
          itemId,
          quantity: stackQuantity,
          startSlot: occupiedSlots,
          slotCount: definition.slotCount,
          durability: incomingDurability,
          slotType: targetSlotType,
          ...tradeMetadata,
          journeyLots: itemJourneyLots
        });
        quantity -= stackQuantity;
      }
    }

    return remainingItems;
  }

  function previewExchange(exchange = {}) {
    const currentCapacity = getCapacitySummary();
    const currentLoad = getLoadSummary();
    const draft = buildExchangeDraft(exchange, { allowOverflow: true });
    if (!draft) {
      return {
        possible: false,
        currentUsedSlots: currentCapacity.usedSlots,
        usedSlots: currentCapacity.usedSlots,
        totalSlots: currentCapacity.totalSlots,
        freeSlots: currentCapacity.freeSlots,
        currentWeight: currentLoad.weight,
        weight: currentLoad.weight,
        maxWeight: currentLoad.maxWeight,
        overweight: currentLoad.weight > currentLoad.maxWeight
      };
    }
    const capacity = getCapacitySummary(draft);
    const weight = draft.reduce((sum, item) => {
      const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
      return sum + (definition.weight * item.quantity);
    }, 0);
    return {
      possible: capacity.usedSlots <= capacity.totalSlots,
      currentUsedSlots: currentCapacity.usedSlots,
      usedSlots: capacity.usedSlots,
      totalSlots: capacity.totalSlots,
      freeSlots: capacity.freeSlots,
      currentWeight: currentLoad.weight,
      weight,
      maxWeight: currentLoad.maxWeight,
      overweight: weight > currentLoad.maxWeight
    };
  }

  function applyExchange(exchange = {}) {
    const draft = buildExchangeDraft(exchange);
    if (!draft) return false;
    const expired = draft.filter(item => {
      const definition = itemDefinitions.get(item.itemId) || sampleDefinition;
      const maximum = Number(definition.durability) || 0;
      return maximum > 0 && maximum < INDESTRUCTIBLE_DURABILITY && Number(item.durability) <= 0;
    });
    const expiredIds = new Set(expired.map(item => item.instanceId));
    state.items = draft.filter(item => !expiredIds.has(item.instanceId));
    reflowItemPlacements();
    persistState();
    render();
    if (expired.length) {
      notify(`열화내구도가 소진된 화물 ${expired.length}개를 자동으로 폐기했습니다.`);
      window.ProjectWAudio?.playEffect("goods");
    }
    window.dispatchEvent(new CustomEvent("projectw:cargochange", { detail: { trade: true, discardedItems: expired.length } }));
    return true;
  }

  function findFreeContiguousSlots(requiredSlots, slotType = "normal") {
    const capacity = compartmentCapacity(slotType);
    const occupied = Array(capacity).fill(false);
    state.items.filter(item => (item.slotType || "normal") === slotType).forEach(item => {
      for (let index = item.startSlot; index < item.startSlot + item.slotCount; index += 1) {
        if (index >= 0 && index < capacity) occupied[index] = true;
      }
    });
    for (let start = 0; start <= capacity - requiredSlots; start += 1) {
      if (occupied.slice(start, start + requiredSlots).every(value => !value)) return start;
    }
    return -1;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(value);
  }

  window.ProjectWCargo = {
    init,
    load,
    reset,
    hideTooltip,
    getLoadSummary,
    getCapacitySummary,
    getItemQuantity,
    getItemDefinition,
    getItemDefinitions,
    getRegionalCampSupplyIds,
    getInventoryItems,
    consumeItem,
    consumeInstance,
    damageItem,
    applyTravelDeterioration,
    discardAll,
    showItemTooltip,
    showDefinitionTooltip,
    addItem,
    applyExchange,
    previewExchange,
    refreshCompartments: render,
    reconcileCapacityLimits
  };
}());
