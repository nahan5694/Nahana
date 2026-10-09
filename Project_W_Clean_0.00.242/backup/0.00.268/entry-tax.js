(function exposeEntryTax() {
  const TAXABLE_SETTLEMENTS = new Set(["대도시", "도시", "관문"]);
  const ENTRY_TAX_PAYMENT_EXCLUDED_CATEGORIES = new Set(["야영물품", "여행물품", "여행식량"]);

  let getPlayerWallet = () => ({});
  let setPlayerWallet = () => {};
  let getWorldTime = () => ({ day: 1, phaseIndex: 0 });
  let getAssetUrl = () => "";
  let notify = () => {};
  let getBargainProfile = () => ({ available: false, attemptsRemaining: 0, attemptsMaximum: 0, chance: 0, bonusPercent: 0, valuePerSuccess: 5 });
  let attemptBargain = () => ({ unavailable: true });
  let completeBargainTrade = () => {};
  let showBargainDialogue = () => {};
  let elements = {};
  let session = null;
  let selectedCurrencies = new Map();
  let selectedCargo = new Map();

  function init(options = {}) {
    getPlayerWallet = typeof options.getPlayerWallet === "function" ? options.getPlayerWallet : getPlayerWallet;
    setPlayerWallet = typeof options.setPlayerWallet === "function" ? options.setPlayerWallet : setPlayerWallet;
    getWorldTime = typeof options.getWorldTime === "function" ? options.getWorldTime : getWorldTime;
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    notify = typeof options.notify === "function" ? options.notify : notify;
    getBargainProfile = typeof options.getBargainProfile === "function" ? options.getBargainProfile : getBargainProfile;
    attemptBargain = typeof options.attemptBargain === "function" ? options.attemptBargain : attemptBargain;
    completeBargainTrade = typeof options.completeBargainTrade === "function" ? options.completeBargainTrade : completeBargainTrade;
    showBargainDialogue = typeof options.showBargainDialogue === "function" ? options.showBargainDialogue : showBargainDialogue;
    elements = {
      modal: document.querySelector("#entry-tax-modal"),
      close: document.querySelector("#entry-tax-close"),
      location: document.querySelector("#entry-tax-location"),
      title: document.querySelector("#entry-tax-title"),
      rate: document.querySelector("#entry-tax-rate"),
      status: document.querySelector("#entry-tax-status"),
      cargo: document.querySelector("#entry-tax-cargo"),
      cargoTitle: document.querySelector("#entry-tax-cargo-title"),
      cargoSummaryLabel: document.querySelector("#entry-tax-cargo-summary-label"),
      cargoTotal: document.querySelector("#entry-tax-cargo-total"),
      currencies: document.querySelector("#entry-tax-currencies"),
      offer: document.querySelector("#entry-tax-offer"),
      paymentTitle: document.querySelector("#entry-tax-payment-title"),
      clear: document.querySelector("#entry-tax-clear"),
      auto: document.querySelector("#entry-tax-auto"),
      requiredLabel: document.querySelector("#entry-tax-required-label"),
      required: document.querySelector("#entry-tax-required"),
      offered: document.querySelector("#entry-tax-offered"),
      bargain: document.querySelector("#entry-tax-bargain"),
      confirm: document.querySelector("#entry-tax-confirm"),
      overpayWarning: document.querySelector("#entry-tax-overpay-warning"),
      overpayTitle: document.querySelector("#entry-tax-warning-title"),
      overpayMessage: document.querySelector("#entry-tax-warning-message"),
      overpayCancel: document.querySelector("#entry-tax-warning-cancel"),
      overpayConfirm: document.querySelector("#entry-tax-warning-confirm")
    };
    if (!elements.modal) return;
    elements.close.addEventListener("click", close);
    elements.clear.addEventListener("click", clearSelection);
    elements.auto.addEventListener("click", autoSelect);
    elements.confirm.addEventListener("click", () => confirmPayment(false));
    elements.bargain?.addEventListener("click", handleBargain);
    elements.overpayCancel.addEventListener("click", resetOverpaySelection);
    elements.overpayConfirm.addEventListener("click", () => confirmPayment(true));
    elements.modal.addEventListener("click", handleClick);
    elements.modal.addEventListener("pointerdown", event => {
      if (event.target === elements.modal && !session?.compulsory) close();
    });
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || elements.modal.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!elements.overpayWarning.hidden) {
        hideOverpayWarning();
        return;
      }
      if (!session?.compulsory) close();
    });
  }

  async function open(options = {}) {
    const settlement = options.settlement;
    const baseRate = normalizeRate(settlement?.entryTariffRate);
    const additionalRate = normalizeRate(options.additionalRate);
    const rate = baseRate + additionalRate;
    if (!settlement?.id || !TAXABLE_SETTLEMENTS.has(settlement.category) || rate <= 0) return false;
    session = {
      mode: "tax",
      settlement,
      departure: options.departure || null,
      baseRate,
      additionalRate,
      rate,
      onPaid: typeof options.onPaid === "function" ? options.onPaid : null,
      onCancel: typeof options.onCancel === "function" ? options.onCancel : null,
      currencies: [],
      cargoItems: [],
      valuation: null,
      taxDue: 0,
      allowCargo: true,
      compulsory: false,
      paymentNoun: "입장관세",
      confirmLabel: "관세 납부 후 입장",
      facilityType: "입장 관세"
    };
    session.bargainKey = `${settlement.id}|entry-tax`;
    selectedCurrencies = new Map();
    selectedCargo = new Map();
    hideOverpayWarning();
    prepareSessionUi();
    elements.location.textContent = `${settlement.name || "거점"} · ${settlement.category}`;
    elements.rate.textContent = additionalRate > 0
      ? `입장관세 ${formatNumber(baseRate)}% + 입국세 ${formatNumber(additionalRate)}% = ${formatNumber(rate)}%`
      : `입장관세율 ${formatNumber(rate)}%`;
    elements.status.textContent = "현재 지역 시세로 화물 가치를 산정하는 중입니다.";
    elements.confirm.disabled = true;
    elements.cargo.replaceChildren(emptyMessage("화물 가치를 계산하고 있습니다."));
    elements.currencies.replaceChildren();
    elements.offer.replaceChildren(emptyMessage("납부 화폐를 준비하고 있습니다."));
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", { detail: { open: true, facilityType: session.facilityType } }));

    let valuation;
    try {
      [, valuation] = await Promise.all([
        window.ProjectWWallet.load(),
        window.ProjectWTrade.evaluateCargoAtSettlement(settlement)
      ]);
    } catch (error) {
      console.error(error);
      if (session?.settlement.id === settlement.id && !elements.modal.hidden) {
        elements.status.textContent = "입장관세 시세를 계산하지 못했습니다. Citys·Goods·Routes 시트 연결을 확인해 주세요.";
        elements.status.classList.add("is-danger");
        elements.cargo.replaceChildren(emptyMessage("관세 데이터를 불러오지 못했습니다."));
        elements.offer.replaceChildren(emptyMessage("납부를 진행할 수 없습니다."));
      }
      return true;
    }
    if (!session || session.settlement.id !== settlement.id || elements.modal.hidden) return true;
    session.currencies = window.ProjectWWallet.getCurrencies();
    const namesByInstanceId = new Map(valuation.items.map(item => [item.instanceId, item.name]));
    session.cargoItems = window.ProjectWCargo.getInventoryItems().map(item => ({
      ...item,
      name: namesByInstanceId.get(item.instanceId) || item.definition?.displayName || "화물",
      purchaseUnitValue: cargoPurchaseUnitValue(item),
      customsExcluded: item.slotType === "secret"
    }));
    const valuationByInstanceId = new Map(valuation.items.map(item => [item.instanceId, Number(item.totalValue) || Number(item.value) || 0]));
    const taxableTotalValue = session.cargoItems.reduce((total, item) => {
      return total + (item.customsExcluded ? 0 : (valuationByInstanceId.get(item.instanceId) || 0));
    }, 0);
    session.valuation = { ...valuation, totalValue: taxableTotalValue };
    session.taxDue = Math.max(0, Math.ceil(taxableTotalValue * (rate / 100)));
    if (session.taxDue <= 0) {
      const onPaid = session.onPaid;
      close(false);
      notify("납부할 입장관세가 없어 바로 입장합니다.");
      onPaid?.({ tax: 0, cargoValue: taxableTotalValue });
      return true;
    }
    autoSelect(false);
    render();
    window.dispatchEvent(new CustomEvent("projectw:entrytaxopen", { detail: { settlementId: settlement.id, taxDue: session.taxDue } }));
    requestAnimationFrame(() => elements.close.focus());
    return true;
  }

  async function openDemand(options = {}) {
    const percentage = Math.max(0, Number(options.percentage) || 0);
    const allowCargo = Boolean(options.allowCargo);
    const region = String(options.region || options.settlement?.region || "중부");
    await window.ProjectWWallet.load();
    const currencies = window.ProjectWWallet.getCurrencies();
    const wallet = normalizeWallet(getPlayerWallet());
    const walletValue = currencies.reduce((total, currency) => total
      + (currencyValueForRegion(currency, region) * walletQuantity(wallet, currency.id)), 0);
    const cargoItems = allowCargo ? window.ProjectWCargo.getInventoryItems().map(item => ({
      ...item,
      name: item.definition?.displayName || "화물",
      purchaseUnitValue: cargoPurchaseUnitValue(item),
      customsExcluded: item.slotType === "secret"
    })) : [];
    const cargoValue = cargoItems.reduce((total, item) => total + cargoPaymentValue(item, item.quantity), 0);
    const availableValue = walletValue + cargoValue;
    const demanded = Math.max(0, Math.ceil(availableValue * (percentage / 100)));
    session = {
      mode: "demand",
      settlement: options.settlement || { id: "road", name: "길 위", category: "경로", region },
      departure: null,
      baseRate: percentage,
      additionalRate: 0,
      rate: percentage,
      onPaid: typeof options.onPaid === "function" ? options.onPaid : null,
      onCancel: null,
      currencies,
      cargoItems,
      valuation: { totalValue: cargoValue, source: "inventory" },
      taxDue: demanded,
      allowCargo,
      compulsory: options.compulsory !== false,
      paymentNoun: String(options.paymentNoun || "통행세"),
      confirmLabel: String(options.confirmLabel || "요구한 가치 지불"),
      facilityType: "경로 사건 납부",
      region
    };
    selectedCurrencies = new Map();
    selectedCargo = new Map();
    hideOverpayWarning();
    prepareSessionUi();
    elements.location.textContent = String(options.location || "길 위 · 통행을 가로막은 자들");
    elements.rate.textContent = `보유 ${allowCargo ? "화폐·화물" : "화폐"} 가치의 약 ${formatNumber(percentage)}%`;
    elements.status.textContent = demanded > 0
      ? `가치 ${formatNumber(demanded)} 이상을 올려야 길을 계속 갈 수 있습니다.`
      : "내어줄 재산이 없어 통행을 허락받았습니다.";
    elements.status.classList.remove("is-danger", "is-ready", "is-warning");
    elements.currencies.replaceChildren();
    elements.offer.replaceChildren(emptyMessage("지불할 화폐나 화물을 선택하세요."));
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", { detail: { open: true, facilityType: session.facilityType } }));
    if (demanded <= 0) {
      const onPaid = session.onPaid;
      close(false);
      onPaid?.({ tax: 0, paid: 0, overpayment: 0, paidCargoCount: 0 });
      return true;
    }
    autoSelect(false);
    render();
    requestAnimationFrame(() => elements.confirm.focus());
    return true;
  }

  function prepareSessionUi() {
    elements.modal.hidden = false;
    elements.modal.classList.toggle("is-road-demand", session?.mode === "demand");
    elements.modal.classList.toggle("is-currency-only", !session?.allowCargo);
    elements.close.hidden = Boolean(session?.compulsory);
    elements.title.textContent = session?.mode === "demand" ? "길 위의 요구" : "입장관세 납부";
    elements.cargoTitle.textContent = session?.mode === "demand" ? "화물로 지불" : "화물 납부";
    elements.cargoSummaryLabel.textContent = session?.mode === "demand" ? "보유 화물 가치" : "관세 대상 시세 합계";
    elements.paymentTitle.textContent = session?.mode === "demand" ? "화폐 및 지불안" : "화폐 및 납부안";
    elements.requiredLabel.textContent = session?.paymentNoun || "납부할 관세";
    elements.confirm.textContent = session?.confirmLabel || "관세 납부 후 입장";
    if (elements.bargain) elements.bargain.hidden = session?.mode !== "tax";
  }

  function render() {
    if (!session) return;
    renderCargo();
    renderCurrencies();
    renderOffer();
    const rawOffered = offeredValue();
    const offered = effectiveOfferedValue(rawOffered);
    const overpayment = Math.max(0, offered - session.taxDue);
    const overpayPercent = session.taxDue > 0 ? (overpayment / session.taxDue) * 100 : 0;
    elements.cargoTotal.textContent = formatNumber(session.valuation.totalValue);
    elements.required.textContent = formatNumber(session.taxDue);
    elements.offered.textContent = offered > rawOffered ? `${formatNumber(rawOffered)} → ${formatNumber(offered)}` : formatNumber(offered);
    const availablePaymentValue = effectiveOfferedValue(totalAvailablePaymentValue());
    const affordable = availablePaymentValue >= session.taxDue;
    const enough = offered >= session.taxDue;
    elements.confirm.disabled = !enough;
    const availableKinds = session.allowCargo ? "보유 화폐와 화물" : "보유 화폐";
    elements.status.textContent = !affordable
      ? `${availableKinds}의 지불 가치가 ${formatNumber(session.taxDue - availablePaymentValue)} 부족해 ${session.paymentNoun}를 납부할 수 없습니다.`
      : enough
        ? overpayment > 0
          ? overpayPercent >= 10
            ? `${session.paymentNoun}보다 가치 ${formatNumber(overpayment)} (${formatNumber(overpayPercent)}%) 많이 올렸습니다. 초과분은 반환되지 않습니다.`
            : `가치 ${formatNumber(overpayment)}을 초과 납부합니다. 거스름돈은 지급되지 않습니다.`
          : `${session.paymentNoun}를 정확히 맞췄습니다.`
        : `가치 ${formatNumber(session.taxDue - offered)}만큼 ${session.allowCargo ? "화폐나 화물을" : "화폐를"} 더 올려주세요.`;
    if (session.mode === "tax" && session.valuation.source !== "csv") {
      elements.status.textContent += " · 일부 시세 CSV를 불러오지 못해 확인된 임시 데이터로 계산했습니다.";
    }
    elements.status.classList.toggle("is-danger", !affordable);
    elements.status.classList.toggle("is-ready", enough);
    elements.status.classList.toggle("is-warning", (session.mode === "tax" && session.valuation.source !== "csv") || overpayPercent >= 10);
    renderBargainControl();
  }

  function bargainContext() {
    return session?.mode === "tax"
      ? { facilityKey: session.bargainKey, facilityType: "입장관세", settlementId: session.settlement?.id || "", facilityId: "entry-tax" }
      : {};
  }

  function effectiveOfferedValue(rawValue) {
    if (session?.mode !== "tax") return Math.max(0, Number(rawValue) || 0);
    const bonus = Math.max(0, Number(getBargainProfile(bargainContext())?.bonusPercent) || 0);
    return Math.floor(Math.max(0, Number(rawValue) || 0) * (1 + (bonus / 100)));
  }

  function renderBargainControl() {
    if (!elements.bargain || session?.mode !== "tax") return;
    const profile = getBargainProfile(bargainContext());
    const count = elements.bargain.querySelector("span");
    if (count) count.textContent = `${profile.attemptsRemaining} / ${profile.attemptsMaximum}`;
    elements.bargain.disabled = !profile.available || profile.attemptsRemaining <= 0;
    const tooltip = `성공 확률 ${formatNumber(profile.chance)}%\n가치 보정 +${formatNumber(profile.valuePerSuccess)}%\n현재 거래 누적 성공 ${Math.max(0, Math.trunc(Number(profile.successes) || 0))}회`;
    elements.bargain.dataset.bargainTooltip = tooltip;
    elements.bargain.setAttribute("aria-label", `흥정. ${tooltip.replaceAll("\n", ". ")}`);
    elements.bargain.classList.toggle("has-attempts", profile.available && profile.attemptsRemaining > 0);
    elements.bargain.classList.toggle("has-success", profile.bonusPercent > 0);
  }

  function handleBargain() {
    if (session?.mode !== "tax") return;
    const result = attemptBargain(bargainContext());
    if (!result || result.unavailable) return;
    showBargainDialogue(result.success ? "DL_GH_001" : "DL_GH_002", result.success);
    render();
  }

  function renderCargo() {
    if (!session.allowCargo) {
      elements.cargo.replaceChildren(emptyMessage("이 요구에는 화물을 사용할 수 없습니다."));
      return;
    }
    const rows = session.cargoItems.map(item => {
      const selected = selectedCargo.get(item.instanceId) || 0;
      const remaining = Math.max(0, item.quantity - selected);
      const paymentExcluded = isEntryTaxPaymentExcluded(item);
      const row = document.createElement("button");
      row.type = "button";
      row.className = `entry-tax-cargo-row ${selected > 0 ? "is-selected" : ""} ${item.customsExcluded ? "is-customs-excluded" : ""} ${paymentExcluded ? "is-payment-excluded" : ""}`;
      row.dataset.entryTaxAction = "add-cargo";
      row.dataset.instanceId = item.instanceId;
      row.disabled = remaining <= 0 || item.customsExcluded || paymentExcluded;
      const category = document.createElement("span");
      category.textContent = item.definition?.category || "미분류";
      const copy = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = item.name;
      const detail = document.createElement("small");
      const slotCount = Math.max(1, Number(item.definition?.slotCount) || Number(item.slotCount) || 1);
      const weight = Math.max(0, Number(item.definition?.weight) || 0) * item.quantity;
      detail.textContent = item.customsExcluded
        ? `${formatNumber(slotCount)}칸 · 무게 ${formatNumber(weight)} · 비밀 화물칸 · ${session?.mode === "demand" ? "요구 가치 제외" : "관세 가치 제외"}`
        : paymentExcluded
          ? `${formatNumber(slotCount)}칸 · 무게 ${formatNumber(weight)} · 입장 관세 납부 불가`
        : `${formatNumber(slotCount)}칸 · 무게 ${formatNumber(weight)}`;
      copy.append(name, detail);
      if (!item.customsExcluded) {
        const purchaseValue = document.createElement("strong");
        purchaseValue.className = "entry-tax-cargo-purchase-value";
        purchaseValue.textContent = `구매 가치 ${formatNumber(item.purchaseUnitValue * item.quantity)}`;
        copy.append(purchaseValue);
      }
      const value = document.createElement("b");
      value.textContent = `× ${remaining}`;
      row.append(category, copy, value);
      row.addEventListener("pointerenter", event => showCargoTooltip(item, event));
      row.addEventListener("pointermove", event => showCargoTooltip(item, event));
      row.addEventListener("pointerleave", () => window.ProjectWCargo.hideTooltip());
      return row;
    });
    elements.cargo.replaceChildren(...(rows.length ? rows : [emptyMessage("납부에 사용할 화물이 없습니다.")]));
  }

  function showCargoTooltip(item, event) {
    window.ProjectWCargo.showDefinitionTooltip(item.itemId, item.quantity, event.clientX, event.clientY, {
      quality: item.quality,
      qualityRoll: item.qualityRoll,
      originId: item.originId,
      originName: item.originName,
      durability: item.durability,
      purchaseValue: item.purchaseUnitValue,
      hasTradeValue: false
    });
  }

  function renderCurrencies() {
    const wallet = normalizeWallet(getPlayerWallet());
    const cards = session.currencies.map((currency, index) => {
      const held = walletQuantity(wallet, currency.id);
      const selected = selectedCurrencies.get(currency.id) || 0;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `entry-tax-currency ${held <= 0 ? "is-empty" : ""}`;
      button.dataset.entryTaxAction = "add";
      button.dataset.currencyId = currency.id;
      button.disabled = selected >= held;
      const icon = document.createElement("span");
      icon.className = "entry-tax-currency-icon";
      const source = getAssetUrl(`Asset_Coin_${index + 1}`);
      if (source) {
        const image = document.createElement("img");
        image.src = source;
        image.alt = "";
        icon.append(image);
      } else icon.textContent = currency.type === "금화" ? "금" : currency.type === "은화" ? "은" : "동";
      const copy = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = shortCurrencyName(currency.name);
      const quantity = document.createElement("b");
      quantity.textContent = `× ${Math.max(0, held - selected)}`;
      const value = document.createElement("small");
      value.textContent = `가치 ${formatNumber(currencyValue(currency))}`;
      copy.append(name, quantity, value);
      button.append(icon, copy);
      return button;
    });
    elements.currencies.replaceChildren(...cards);
  }

  function renderOffer() {
    const cargoRows = [...selectedCargo]
      .filter(([, quantity]) => quantity > 0)
      .map(([instanceId, quantity]) => {
        const item = cargoItem(instanceId);
        const row = document.createElement("article");
        row.className = "entry-tax-offer-row is-cargo";
        const copy = document.createElement("button");
        copy.type = "button";
        copy.className = "entry-tax-offer-remove";
        copy.dataset.entryTaxAction = "remove-cargo";
        copy.dataset.instanceId = instanceId;
        const name = document.createElement("strong");
        name.textContent = item?.name || "화물";
        const detail = document.createElement("small");
        detail.textContent = `× ${quantity}`;
        const purchaseValue = document.createElement("b");
        purchaseValue.className = "entry-tax-offer-purchase-value";
        purchaseValue.textContent = `구매 가치 ${formatNumber(cargoPaymentValue(item, quantity))}`;
        copy.append(name, detail, purchaseValue);
        const controls = document.createElement("span");
        controls.className = "entry-tax-offer-controls";
        controls.append(createCargoAdjustButton(instanceId, -1, "−"), createCargoAdjustButton(instanceId, 1, "+"));
        row.append(copy, controls);
        return row;
      });
    const currencyRows = [...selectedCurrencies]
      .filter(([, quantity]) => quantity > 0)
      .map(([currencyId, quantity]) => {
        const currency = session.currencies.find(entry => entry.id === currencyId);
        const currencyIndex = session.currencies.findIndex(entry => entry.id === currencyId);
        const row = document.createElement("article");
        row.className = "entry-tax-offer-row is-currency";
        const icon = document.createElement("span");
        icon.className = "entry-tax-offer-currency-icon";
        const source = getAssetUrl(`Asset_Coin_${currencyIndex + 1}`);
        if (source) {
          const image = document.createElement("img");
          image.src = source;
          image.alt = "";
          icon.append(image);
        } else icon.textContent = currency?.type === "금화" ? "금" : currency?.type === "은화" ? "은" : "동";
        const copy = document.createElement("button");
        copy.type = "button";
        copy.className = "entry-tax-offer-remove";
        copy.dataset.entryTaxAction = "remove";
        copy.dataset.currencyId = currencyId;
        const name = document.createElement("strong");
        name.textContent = shortCurrencyName(currency?.name);
        const detail = document.createElement("small");
        detail.textContent = `× ${quantity} · 가치 ${formatNumber(currencyValue(currency) * quantity)}`;
        copy.append(name, detail);
        const controls = document.createElement("span");
        controls.className = "entry-tax-offer-controls";
        controls.append(createAdjustButton(currencyId, -1, "−"), createAdjustButton(currencyId, 1, "+"));
        row.append(icon, copy, controls);
        return row;
      });
    const rows = [...cargoRows, ...currencyRows];
    elements.offer.replaceChildren(...(rows.length ? rows : [emptyMessage("납부할 화폐나 화물을 선택하세요.")]));
  }

  function createAdjustButton(currencyId, delta, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.entryTaxAction = "adjust";
    button.dataset.currencyId = currencyId;
    button.dataset.delta = String(delta);
    if (delta > 0) button.disabled = (selectedCurrencies.get(currencyId) || 0) >= walletQuantity(getPlayerWallet(), currencyId);
    return button;
  }

  function createCargoAdjustButton(instanceId, delta, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.entryTaxAction = "adjust-cargo";
    button.dataset.instanceId = instanceId;
    button.dataset.delta = String(delta);
    const item = cargoItem(instanceId);
    if (delta > 0) button.disabled = (selectedCargo.get(instanceId) || 0) >= Math.max(0, item?.quantity || 0);
    return button;
  }

  function handleClick(event) {
    const target = event.target.closest("[data-entry-tax-action]");
    if (!target || !session) return;
    const currencyId = target.dataset.currencyId;
    const instanceId = target.dataset.instanceId;
    if (target.dataset.entryTaxAction === "add-cargo") {
      adjustCargo(instanceId, 1);
      return;
    }
    if (target.dataset.entryTaxAction === "adjust-cargo") {
      adjustCargo(instanceId, Number(target.dataset.delta));
      return;
    }
    if (target.dataset.entryTaxAction === "remove-cargo") {
      if (selectedCargo.delete(instanceId)) window.ProjectWAudio?.playEffect("goods");
      render();
      return;
    }
    if (target.dataset.entryTaxAction === "remove") {
      if (selectedCurrencies.delete(currencyId)) window.ProjectWAudio?.playEffect("coin");
      render();
      return;
    }
    adjustCurrency(currencyId, target.dataset.entryTaxAction === "add" ? 1 : Number(target.dataset.delta));
  }

  function adjustCurrency(currencyId, delta) {
    const held = walletQuantity(getPlayerWallet(), currencyId);
    const previous = selectedCurrencies.get(currencyId) || 0;
    const next = Math.max(0, Math.min(held, previous + delta));
    if (next > 0) selectedCurrencies.set(currencyId, next);
    else selectedCurrencies.delete(currencyId);
    if (next !== previous) window.ProjectWAudio?.playEffect("coin");
    render();
  }

  function adjustCargo(instanceId, delta) {
    const item = cargoItem(instanceId);
    if (!item || isEntryTaxPaymentExcluded(item)) return;
    const previous = selectedCargo.get(instanceId) || 0;
    const next = Math.max(0, Math.min(item.quantity, previous + delta));
    if (next > 0) selectedCargo.set(instanceId, next);
    else selectedCargo.delete(instanceId);
    if (next !== previous) window.ProjectWAudio?.playEffect("goods");
    render();
  }

  function clearSelection(withSound = true) {
    const hadCurrencies = selectedCurrencies.size > 0;
    const hadCargo = selectedCargo.size > 0;
    selectedCurrencies.clear();
    selectedCargo.clear();
    if (withSound && hadCurrencies) window.ProjectWAudio?.playEffect("coin");
    if (withSound && hadCargo) window.ProjectWAudio?.playEffect("goods");
    render();
  }

  function autoSelect(withSound = true) {
    if (!session) return;
    selectedCurrencies.clear();
    const wallet = normalizeWallet(getPlayerWallet());
    const currencies = [...session.currencies]
      .filter(currency => currencyValue(currency) > 0)
      .sort((left, right) => currencyValue(right) - currencyValue(left));
    const profile = session.mode === "tax" ? getBargainProfile(bargainContext()) : { bonusPercent: 0 };
    const rawTarget = Math.ceil(session.taxDue / (1 + (Math.max(0, Number(profile.bonusPercent) || 0) / 100)));
    const remainingTarget = Math.max(0, rawTarget - selectedCargoValue());
    selectedCurrencies = bestCurrencySelection(remainingTarget, currencies, wallet);
    if (withSound && selectedCurrencies.size) window.ProjectWAudio?.playEffect("coin");
    render();
  }

  function bestCurrencySelection(targetValue, currencies, wallet) {
    const target = Math.max(0, Math.ceil(Number(targetValue) || 0));
    if (target <= 0) return new Map();
    const entries = currencies.map(currency => ({
      id: currency.id,
      value: Math.max(1, Math.round(currencyValue(currency))),
      quantity: walletQuantity(wallet, currency.id)
    })).filter(entry => entry.quantity > 0 && entry.value > 0);
    if (!entries.length) return new Map();

    const totalValue = entries.reduce((sum, entry) => sum + (entry.value * entry.quantity), 0);
    const maximumUnitValue = Math.max(...entries.map(entry => entry.value));
    const limit = Math.min(totalValue, target + maximumUnitValue - 1);
    const best = new Array(limit + 1).fill(null);
    best[0] = { coinCount: 0, previous: null, currencyId: "", quantity: 0 };

    entries.forEach(entry => {
      let remaining = entry.quantity;
      let bundleQuantity = 1;
      while (remaining > 0) {
        const quantity = Math.min(bundleQuantity, remaining);
        const bundleValue = entry.value * quantity;
        for (let value = limit; value >= bundleValue; value -= 1) {
          const previous = best[value - bundleValue];
          if (!previous) continue;
          const coinCount = previous.coinCount + quantity;
          if (best[value] && best[value].coinCount <= coinCount) continue;
          best[value] = { coinCount, previous, currencyId: entry.id, quantity };
        }
        remaining -= quantity;
        bundleQuantity *= 2;
      }
    });

    let selectedValue = -1;
    for (let value = target; value <= limit; value += 1) {
      if (!best[value]) continue;
      selectedValue = value;
      break;
    }
    if (selectedValue < 0) {
      for (let value = limit; value >= 0; value -= 1) {
        if (!best[value]) continue;
        selectedValue = value;
        break;
      }
    }

    const result = new Map();
    let cursor = best[selectedValue];
    while (cursor?.previous) {
      result.set(cursor.currencyId, (result.get(cursor.currencyId) || 0) + cursor.quantity);
      cursor = cursor.previous;
    }
    return result;
  }

  function confirmPayment(allowOverpay = false) {
    if (!session) return;
    const rawPaid = offeredValue();
    const paid = effectiveOfferedValue(rawPaid);
    if (paid < session.taxDue) {
      notify(`${session.paymentNoun}에 필요한 지불 가치가 부족합니다.`);
      render();
      return;
    }
    const overpayment = Math.max(0, paid - session.taxDue);
    const overpayPercent = session.taxDue > 0 ? (overpayment / session.taxDue) * 100 : 0;
    if (!allowOverpay && overpayPercent >= 10) {
      showOverpayWarning(paid, overpayment, overpayPercent);
      return;
    }
    const wallet = normalizeWallet(getPlayerWallet());
    const inventoryById = new Map(window.ProjectWCargo.getInventoryItems().map(item => [item.instanceId, item]));
    for (const [instanceId, quantity] of selectedCargo) {
      if (quantity > Math.max(0, inventoryById.get(instanceId)?.quantity || 0)) {
        notify("보유 화물이 바뀌어 납부안을 다시 확인해야 합니다.");
        selectedCargo.clear();
        render();
        return;
      }
    }
    for (const [currencyId, quantity] of selectedCurrencies) {
      if (quantity > walletQuantity(wallet, currencyId)) {
        notify("보유 화폐가 바뀌어 납부안을 다시 확인해야 합니다.");
        selectedCurrencies.clear();
        render();
        return;
      }
      wallet[currencyId] = walletQuantity(wallet, currencyId) - quantity;
    }
    const removals = [...selectedCargo].map(([instanceId, quantity]) => ({ instanceId, quantity }));
    if (removals.length && !window.ProjectWCargo.applyExchange({ remove: removals, add: [] })) {
      notify("보유 화물이 바뀌어 납부안을 다시 확인해야 합니다.");
      selectedCargo.clear();
      render();
      return;
    }
    const result = {
      tax: session.taxDue,
      cargoValue: session.valuation.totalValue,
      paid,
      tendered: rawPaid,
      overpayment,
      paidCargoCount: removals.reduce((sum, entry) => sum + entry.quantity, 0)
    };
    const currencyTransferred = selectedCurrencies.size > 0;
    const onPaid = session.onPaid;
    const paymentNoun = session.paymentNoun || "요구액";
    const paidSettlement = session.settlement;
    const paidMode = session.mode;
    setPlayerWallet(wallet);
    if (session.mode === "tax") completeBargainTrade(bargainContext());
    if (paidMode === "tax" && result.tax > 0) {
      const worldTime = getWorldTime() || {};
      window.ProjectWMerchantPath?.recordReviewExpense?.("tax", {
        amount: result.tax,
        settlementId: paidSettlement?.id || "",
        settlementName: paidSettlement?.name || "이름 없는 거점",
        sourceLabel: "입장 관세소",
        description: "입장 관세",
        contractDay: worldTime.day,
        phaseIndex: worldTime.phaseIndex,
        completedAt: new Date().toISOString()
      });
    }
    if (currencyTransferred) window.ProjectWAudio?.playCurrencyCompletion?.("trade");
    else window.ProjectWAudio?.playEffect("trade");
    close(false);
    notify(`${result.tax.toLocaleString("ko-KR")} 가치의 ${paymentNoun}를 지불했습니다${overpayment > 0 ? ` · 초과 납부 ${formatNumber(overpayment)}` : ""}.`);
    onPaid?.(result);
  }

  function showOverpayWarning(paid, overpayment, overpayPercent) {
    const demand = session?.mode === "demand";
    if (elements.overpayTitle) {
      elements.overpayTitle.textContent = demand
        ? `도적이 요구한 ${session?.paymentNoun || "가치"}보다 많이 지불하고 있습니다.`
        : "관세보다 많은 가치를 지불하고 있습니다.";
    }
    elements.overpayMessage.textContent = "초과분은 돌려받을 수 없습니다. 정말로 지불하시겠습니까?";
    elements.overpayWarning.hidden = false;
    requestAnimationFrame(() => elements.overpayCancel.focus());
  }

  function resetOverpaySelection() {
    hideOverpayWarning();
    clearSelection();
  }

  function hideOverpayWarning() {
    if (elements.overpayWarning) elements.overpayWarning.hidden = true;
  }

  function offeredValue() {
    if (!session) return 0;
    const currencyTotal = [...selectedCurrencies].reduce((total, [currencyId, quantity]) => {
      const currency = session.currencies.find(entry => entry.id === currencyId);
      return total + (currencyValue(currency) * quantity);
    }, 0);
    return currencyTotal + selectedCargoValue();
  }

  function selectedCargoValue() {
    if (!session) return 0;
    return [...selectedCargo].reduce((total, [instanceId, quantity]) => {
      return total + cargoPaymentValue(cargoItem(instanceId), quantity);
    }, 0);
  }

  function totalWalletValue() {
    if (!session) return 0;
    const wallet = normalizeWallet(getPlayerWallet());
    return session.currencies.reduce((total, currency) => total + (currencyValue(currency) * walletQuantity(wallet, currency.id)), 0);
  }

  function totalAvailablePaymentValue() {
    if (!session) return 0;
    const cargoValue = session.allowCargo
      ? session.cargoItems.reduce((total, item) => total + cargoPaymentValue(item, item.quantity), 0)
      : 0;
    return totalWalletValue() + cargoValue;
  }

  function cargoItem(instanceId) {
    return session?.cargoItems?.find(item => item.instanceId === instanceId) || null;
  }

  function cargoPurchaseUnitValue(item) {
    const purchaseValue = Number(item?.purchaseValue);
    if (purchaseValue > 0) return purchaseValue;
    return Math.max(0, Number(item?.definition?.baseValue) || 0);
  }

  function cargoPaymentValue(item, quantity) {
    if (item?.customsExcluded || item?.slotType === "secret" || isEntryTaxPaymentExcluded(item)) return 0;
    return cargoPurchaseUnitValue(item) * Math.max(0, Math.trunc(Number(quantity) || 0));
  }

  function isEntryTaxPaymentExcluded(item) {
    if (session?.mode !== "tax") return false;
    const category = String(item?.definition?.category || "").replaceAll(" ", "");
    return ENTRY_TAX_PAYMENT_EXCLUDED_CATEGORIES.has(category);
  }

  function currencyValue(currency) {
    return currencyValueForRegion(currency, session?.region || session?.settlement?.region || "중부");
  }

  function currencyValueForRegion(currency, region) {
    return window.ProjectWWallet.getCurrencyValue(currency, region);
  }

  function close(callCancel = true) {
    if (!session || elements.modal.hidden) return;
    if (callCancel && session.compulsory) return;
    const onCancel = session.onCancel;
    const facilityType = session.facilityType || "입장 관세";
    hideOverpayWarning();
    session = null;
    selectedCurrencies = new Map();
    selectedCargo = new Map();
    window.ProjectWCargo.hideTooltip();
    elements.modal.hidden = true;
    elements.modal.classList.remove("is-road-demand", "is-currency-only");
    elements.close.hidden = false;
    window.dispatchEvent(new CustomEvent("projectw:facilitychange", { detail: { open: false, facilityType } }));
    if (callCancel) onCancel?.();
  }

  function isOpen() {
    return Boolean(session && !elements.modal.hidden);
  }

  function getResumeState() {
    if (!isOpen() || session?.mode !== "tax") return null;
    return {
      settlementId: String(session.settlement?.id || ""),
      selectedCurrencies: [...selectedCurrencies.entries()],
      selectedCargo: [...selectedCargo.entries()]
    };
  }

  function restoreSelection(entries) {
    const result = new Map();
    (Array.isArray(entries) ? entries : []).forEach(entry => {
      if (!Array.isArray(entry) || entry.length < 2) return;
      const key = String(entry[0] || "").trim();
      const quantity = Math.max(0, Math.trunc(Number(entry[1]) || 0));
      if (key && quantity > 0) result.set(key, quantity);
    });
    return result;
  }

  function restoreResumeState(snapshot = {}) {
    if (!isOpen() || session?.mode !== "tax") return false;
    if (snapshot.settlementId && snapshot.settlementId !== session.settlement?.id) return false;
    selectedCurrencies = restoreSelection(snapshot.selectedCurrencies);
    selectedCargo = restoreSelection(snapshot.selectedCargo);
    render();
    return true;
  }

  function normalizeRate(value) {
    const raw = String(value ?? "").trim();
    const number = Number(raw.replace("%", ""));
    if (!Number.isFinite(number)) return 0;
    if (!raw.includes("%") && number > 0 && number < 1) return number * 100;
    return Math.max(0, number);
  }

  function normalizeWallet(wallet) {
    return Object.fromEntries(Object.entries(wallet || {}).map(([id, value]) => [id, walletQuantity(wallet, id)]));
  }

  function walletQuantity(wallet, currencyId) {
    const value = wallet?.[currencyId];
    const quantity = typeof value === "object" && value !== null ? value.quantity : value;
    return Math.max(0, Math.trunc(Number(quantity) || 0));
  }

  function shortCurrencyName(name) {
    const withoutType = String(name || "화폐").replace(/\s*(금화|은화|동화)\s*$/, "").trim();
    return withoutType.split(/\s+/)[0] || withoutType || "화폐";
  }

  function emptyMessage(message) {
    const paragraph = document.createElement("p");
    paragraph.className = "entry-tax-empty";
    paragraph.textContent = message;
    return paragraph;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(Number(value) || 0);
  }

  window.ProjectWEntryTax = { init, open, openDemand, close, isOpen, getResumeState, restoreResumeState };
}());
