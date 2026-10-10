(function exposeWallet() {
  const CURRENCY_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=190977292&single=true&output=csv";
  const TYPE_ORDER = ["금화", "은화", "동화"];
  const TYPE_MARKS = { 금화: "금", 은화: "은", 동화: "동" };
  const MARKET_REGIONS = ["북부", "중부", "남부"];
  const MARKET_SCHEMA_VERSION = 1;
  const FALLBACK_CURRENCIES = [
    { id: "Cur_001", name: "알비온 금화", type: "금화", baseValue: 1500, region: "중부/남부", reliability: 100, circulation: 95, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_002", name: "네올 금화", type: "금화", baseValue: 1200, region: "북부/중부", reliability: 95, circulation: 90, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_003", name: "루이 은화", type: "은화", baseValue: 50, region: "북부/중부/남부", reliability: 100, circulation: 95, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_004", name: "디비트 은화", type: "은화", baseValue: 40, region: "북부/중부", reliability: 80, circulation: 90, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_005", name: "트레센 대성당 은화", type: "은화", baseValue: 35, region: "중부/남부", reliability: 75, circulation: 85, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_006", name: "페니히 은화", type: "은화", baseValue: 25, region: "북부", reliability: 70, circulation: 80, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_007", name: "알레우 은화", type: "은화", baseValue: 20, region: "남부", reliability: 90, circulation: 90, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_008", name: "길링 동화", type: "동화", baseValue: 5, region: "북부/중부/남부", reliability: 100, circulation: 100, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_009", name: "듀이 동화", type: "동화", baseValue: 3, region: "중부", reliability: 90, circulation: 80, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." },
    { id: "Cur_010", name: "핌 동화", type: "동화", baseValue: 1, region: "북부/중부/남부", reliability: 80, circulation: 100, description: "텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다." }
  ];

  let elements;
  let getHoldings = () => ({});
  let getBillNotes = () => null;
  let getRegion = () => "중부";
  let getWorldDay = () => 1;
  let getMarketState = () => null;
  let setMarketState = () => {};
  let getAssetUrl = () => "";
  let notify = () => {};
  let currencies = [...FALLBACK_CURRENCIES];
  let dataSource = "local";
  let loadPromise;
  let activeTab = "currency";

  function init(options = {}) {
    getHoldings = typeof options.getHoldings === "function" ? options.getHoldings : getHoldings;
    getBillNotes = typeof options.getBillNotes === "function" ? options.getBillNotes : getBillNotes;
    getRegion = typeof options.getRegion === "function" ? options.getRegion : getRegion;
    getWorldDay = typeof options.getWorldDay === "function" ? options.getWorldDay : getWorldDay;
    getMarketState = typeof options.getMarketState === "function" ? options.getMarketState : getMarketState;
    setMarketState = typeof options.setMarketState === "function" ? options.setMarketState : setMarketState;
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    notify = typeof options.notify === "function" ? options.notify : notify;
    elements = {
      button: document.querySelector("#wallet-button"),
      buttonMark: document.querySelector("#wallet-button .wallet-button-mark"),
      toolbarTotal: document.querySelector("#wallet-total-value"),
      modal: document.querySelector("#wallet-modal"),
      close: document.querySelector("#wallet-close"),
      tabs: [...document.querySelectorAll("[data-wallet-tab]")],
      modalTotalLabel: document.querySelector("#wallet-modal-total-label"),
      modalTotal: document.querySelector("#wallet-modal-total"),
      dataSource: document.querySelector("#wallet-data-source"),
      groups: document.querySelector("#wallet-groups"),
      info: document.querySelector("#wallet-currency-info")
    };
    if (!elements.modal || !elements.groups) return;
    elements.close.addEventListener("click", close);
    elements.tabs.forEach(button => button.addEventListener("click", () => {
      activeTab = button.dataset.walletTab === "notes" ? "notes" : "currency";
      render();
    }));
    elements.modal.addEventListener("pointerdown", event => {
      if (event.target === elements.modal) close();
    });
    elements.groups.addEventListener("pointermove", handlePointerMove);
    elements.groups.addEventListener("pointerleave", hideCurrencyInfo);
    elements.groups.addEventListener("focusin", handleFocusIn);
    elements.groups.addEventListener("focusout", handleFocusOut);
    window.addEventListener("resize", hideCurrencyInfo);
    window.addEventListener("blur", hideCurrencyInfo);
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || elements.modal.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    });
    render();
  }

  function load() {
    if (loadPromise) return loadPromise;
    if (window.location.protocol === "file:") {
      dataSource = "local";
      render();
      loadPromise = Promise.resolve({ source: dataSource, currencies });
      return loadPromise;
    }

    loadPromise = window.ProjectWData.loadCsv(CURRENCY_CSV_URL)
      .then(rows => {
        const normalized = rows.map(normalizeCurrency).filter(currency => currency.id && TYPE_ORDER.includes(currency.type));
        if (!normalized.length) throw new Error("화폐 행을 찾을 수 없습니다.");
        const byId = new Map(FALLBACK_CURRENCIES.map(currency => [currency.id, currency]));
        normalized.forEach(currency => byId.set(currency.id, currency));
        currencies = [...byId.values()].slice(0, 10);
        dataSource = "csv";
        ensureMarketState();
        render();
        return { source: dataSource, currencies };
      })
      .catch(error => {
        console.error(error);
        dataSource = "fallback";
        currencies = [...FALLBACK_CURRENCIES];
        ensureMarketState();
        render();
        notify("화폐 CSV를 불러오지 못해 현재 확인된 화폐 데이터를 표시합니다.");
        return { source: dataSource, currencies, error };
      });
    return loadPromise;
  }

  function normalizeCurrency(row) {
    return {
      id: String(readColumn(row, "ID")).trim(),
      name: String(readColumn(row, "이름")).trim(),
      type: String(readColumn(row, "타입")).trim(),
      baseValue: toNumber(readColumn(row, "기준 가치")),
      region: String(readColumn(row, "주 유통 지역") || "정보 없음").trim(),
      reliability: toNumber(readColumn(row, "신뢰도")),
      circulation: toNumber(readColumn(row, "통용도")),
      description: String(readColumn(row, "설명") || "설명이 없습니다.").trim()
    };
  }

  function readColumn(row, expectedHeader) {
    const key = Object.keys(row).find(header => header.trim() === expectedHeader);
    return key ? row[key] : "";
  }

  function toNumber(value) {
    const number = Number(String(value ?? "").replaceAll(",", "").replace("%", "").trim());
    return Number.isFinite(number) ? number : 0;
  }

  function getQuantity(currencyId) {
    const stored = getHoldings()?.[currencyId];
    const quantity = typeof stored === "object" && stored !== null ? stored.quantity : stored;
    return Math.max(0, Math.floor(toNumber(quantity)));
  }

  function calculateTotal() {
    return currencies.reduce((total, currency) => total + (getKnownCurrencyValue(currency) * getQuantity(currency.id)), 0);
  }

  function render() {
    if (!elements?.groups) return;
    hideCurrencyInfo();
    const fragment = document.createDocumentFragment();
    elements.tabs.forEach(button => {
      const active = button.dataset.walletTab === activeTab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (activeTab === "notes") {
      fragment.append(createBillNoteGroup(window.ProjectWBillNotes.normalizeState(getBillNotes())));
    } else {
      TYPE_ORDER.forEach(type => {
        const section = document.createElement("section");
        section.className = `wallet-currency-group wallet-currency-group-${type === "금화" ? "gold" : type === "은화" ? "silver" : "copper"}`;
        const heading = document.createElement("h3");
        heading.textContent = type;
        const list = document.createElement("div");
        list.className = "wallet-currency-list";
        currencies.filter(currency => currency.type === type).forEach(currency => {
          list.append(createCurrencyButton(currency, currencies.indexOf(currency) + 1));
        });
        section.append(heading, list);
        fragment.append(section);
      });
    }
    elements.groups.replaceChildren(fragment);
    renderToolbarCoin();
    elements.dataSource.textContent = activeTab === "notes"
      ? "어음증서는 관세와 화물칸에서 제외되며 도시·대도시의 상회에서 사용할 수 있습니다."
      : dataSource === "csv"
        ? ""
        : dataSource === "fallback"
          ? "화폐 확인본 · CSV 연결 실패"
          : "화폐 로컬 확인본";
    elements.dataSource.hidden = activeTab !== "notes" && dataSource === "csv";
    updateTotals();
  }

  function createBillNoteGroup(noteState) {
    const section = document.createElement("section");
    section.className = "wallet-bill-certificate-section";
    const heading = document.createElement("header");
    const headingCopy = document.createElement("div");
    const eyebrow = document.createElement("span");
    eyebrow.textContent = "상업조합 발행 증서";
    const title = document.createElement("h3");
    title.textContent = "보유 어음증서";
    headingCopy.append(eyebrow, title);
    const total = document.createElement("strong");
    total.textContent = `액면가 합계 ${formatNumber(window.ProjectWBillNotes.totalValue(noteState))}`;
    heading.append(headingCopy, total);
    const list = document.createElement("div");
    list.className = "wallet-bill-certificate-list";
    const certificates = window.ProjectWBillNotes.certificates(noteState);
    certificates.forEach(certificate => {
      const card = document.createElement("div");
      card.className = "wallet-bill-item";
      card.dataset.certificateId = certificate.id;
      card.tabIndex = 0;
      card.setAttribute("aria-describedby", "wallet-currency-info");
      const category = document.createElement("span");
      category.className = "wallet-bill-item-category";
      category.textContent = "증서";
      const copy = document.createElement("span");
      copy.className = "wallet-bill-item-copy";
      const name = document.createElement("strong");
      name.textContent = "어음증서";
      const count = document.createElement("b");
      count.className = "wallet-bill-item-count";
      count.textContent = `×${formatNumber(certificate.quantity)}`;
      name.append(count);
      const branch = document.createElement("small");
      branch.textContent = `${certificate.organization} ${certificate.branch}`;
      copy.append(name, branch);
      const value = document.createElement("span");
      value.className = "wallet-bill-item-value";
      const valueLabel = document.createElement("small");
      valueLabel.textContent = "액면가";
      const amount = document.createElement("strong");
      amount.textContent = formatNumber(certificate.denomination);
      value.append(valueLabel, amount);
      card.append(category, copy, value);
      list.append(card);
    });
    if (!certificates.length) {
      const empty = document.createElement("p");
      empty.className = "wallet-bill-certificate-empty";
      empty.textContent = "보유 중인 어음증서가 없습니다.";
      list.append(empty);
    }
    section.append(heading, list);
    return section;
  }

  function renderToolbarCoin() {
    if (!elements.buttonMark) return;
    const assetId = "Asset_Coin_1";
    const assetUrl = getAssetUrl(assetId);
    elements.buttonMark.replaceChildren();
    if (!assetUrl) {
      elements.buttonMark.textContent = "¤";
      return;
    }
    const image = document.createElement("img");
    image.src = assetUrl;
    image.alt = "";
    image.dataset.assetId = assetId;
    image.draggable = false;
    elements.buttonMark.append(image);
  }

  function createCurrencyButton(currency, assetIndex) {
    const quantity = getQuantity(currency.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `wallet-currency ${quantity > 0 ? "is-owned" : "is-unowned"}`;
    button.dataset.currencyId = currency.id;
    const regionalValue = getKnownCurrencyValue(currency);
    button.setAttribute("aria-label", `${currency.name}, ${quantity}개 보유, 가치 약 ${formatNumber(regionalValue)}`);

    const coin = document.createElement("span");
    coin.className = "wallet-coin-mark";
    const assetId = `Asset_Coin_${assetIndex}`;
    const assetUrl = getAssetUrl(assetId);
    if (assetUrl) {
      const image = document.createElement("img");
      image.src = assetUrl;
      image.alt = "";
      image.dataset.assetId = assetId;
      image.draggable = false;
      coin.append(image);
    } else coin.textContent = TYPE_MARKS[currency.type];
    const copy = document.createElement("span");
    copy.className = "wallet-currency-copy";
    const name = document.createElement("strong");
    name.textContent = currency.name;
    const value = document.createElement("small");
    value.textContent = `가치 : 약 ${formatNumber(regionalValue)}`;
    copy.append(name, value);
    const count = document.createElement("span");
    count.className = "wallet-currency-count";
    count.textContent = `${formatNumber(quantity)}개`;
    button.append(coin, copy, count);
    return button;
  }

  function updateTotals() {
    const currencyTotal = calculateTotal();
    const billTotal = window.ProjectWBillNotes?.totalValue?.(getBillNotes()) || 0;
    const combinedTotal = currencyTotal + billTotal;
    const modalTotal = activeTab === "notes" ? billTotal : currencyTotal;
    const formatted = formatNumber(combinedTotal);
    if (elements.toolbarTotal) elements.toolbarTotal.textContent = `약 ${formatted}`;
    if (elements.modalTotalLabel) elements.modalTotalLabel.textContent = activeTab === "notes" ? "어음 액면가 합계" : "보유 화폐 가치";
    if (elements.modalTotal) elements.modalTotal.textContent = activeTab === "notes" ? formatNumber(modalTotal) : `약 ${formatNumber(modalTotal)}`;
    if (elements.button) elements.button.setAttribute("aria-label", `지갑, 화폐와 어음을 합친 보유 가치 약 ${formatted}`);
  }

  function open() {
    if (!elements?.modal) return;
    render();
    elements.modal.hidden = false;
    load();
    requestAnimationFrame(() => elements.close.focus());
  }

  function close() {
    if (!elements?.modal) return;
    hideCurrencyInfo();
    elements.modal.hidden = true;
    elements.button?.focus();
  }

  function getResumeState() {
    if (!elements?.modal || elements.modal.hidden) return null;
    return { activeTab };
  }

  function restoreResumeState(snapshot = {}) {
    activeTab = snapshot.activeTab === "notes" ? "notes" : "currency";
    open();
    render();
    return true;
  }

  function refresh() {
    render();
  }

  function getCurrencies() {
    return currencies.map(currency => ({ ...currency }));
  }

  function getDataSource() {
    return dataSource;
  }

  function handlePointerMove(event) {
    const button = event.target.closest(".wallet-currency[data-currency-id], .wallet-bill-item[data-certificate-id]");
    if (!button || !elements.groups.contains(button)) {
      hideCurrencyInfo();
      return;
    }
    showWalletItemInfo(button);
  }

  function handleFocusIn(event) {
    const button = event.target.closest(".wallet-currency[data-currency-id], .wallet-bill-item[data-certificate-id]");
    if (!button) return;
    showWalletItemInfo(button);
  }

  function handleFocusOut(event) {
    const next = event.relatedTarget?.closest?.(".wallet-currency[data-currency-id], .wallet-bill-item[data-certificate-id]");
    if (!next) hideCurrencyInfo();
  }

  function showWalletItemInfo(item) {
    if (item.dataset.certificateId) showBillNoteInfo(item.dataset.certificateId, item.getBoundingClientRect());
    else showCurrencyInfo(item.dataset.currencyId, item.getBoundingClientRect());
  }

  function showBillNoteInfo(certificateId, anchorRect) {
    const certificate = window.ProjectWBillNotes.certificates(getBillNotes()).find(entry => entry.id === certificateId);
    if (!certificate) return hideCurrencyInfo();
    const heading = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = "어음증서";
    const value = document.createElement("span");
    value.textContent = `액면가 ${formatNumber(certificate.denomination)}`;
    heading.append(title, value);
    const promise = document.createElement("p");
    promise.className = "bill-note-flavor";
    promise.textContent = `${certificate.organization} ${certificate.branch}는 이 증서를 지참한 이에게 액면가 ${formatNumber(certificate.denomination)}에 해당하는 화폐를 지급할 것을 보증한다. 정해진 환전 수수료는 지급 시에 제하며, 이에 지점장의 서명으로 약속을 증명한다.`;
    const date = document.createElement("p");
    date.className = "bill-note-issued-date";
    date.textContent = `${certificate.issuedDate} 발행`;
    const signature = document.createElement("div");
    signature.className = "bill-note-signature";
    const signatureLabel = document.createElement("small");
    signatureLabel.textContent = "지점장 서명";
    const name = document.createElement("span");
    name.textContent = certificate.managerName;
    signature.append(signatureLabel, name);
    elements.info.classList.add("is-bill-note");
    elements.info.replaceChildren(heading, promise, date, signature);
    elements.info.hidden = false;
    positionInfo(anchorRect);
  }

  function showCurrencyInfo(currencyId, anchorRect) {
    elements.info.classList.remove("is-bill-note");
    const currency = currencies.find(entry => entry.id === currencyId);
    if (!currency) {
      hideCurrencyInfo();
      return;
    }
    const quantity = getQuantity(currency.id);
    const heading = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = currency.name;
    const type = document.createElement("span");
    type.textContent = currency.type;
    heading.append(title, type);
    const details = document.createElement("dl");
    const regionalValue = getKnownCurrencyValue(currency);
    appendDetail(details, "가치", `약 ${formatNumber(regionalValue)}`);
    appendDetail(details, "보유 수량", `${formatNumber(quantity)}개`);
    appendDetail(details, "보유 가치", `약 ${formatNumber(regionalValue * quantity)}`);
    appendDetail(details, "주 유통 지역", currency.region);
    const description = document.createElement("p");
    description.textContent = currency.description;
    elements.info.replaceChildren(heading, details, description);
    elements.info.hidden = false;
    positionInfo(anchorRect);
  }

  function appendDetail(list, label, value) {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    list.append(term, description);
  }

  function positionInfo(anchorRect) {
    const margin = 12;
    const gap = 11;
    const rect = elements.info.getBoundingClientRect();
    let left = anchorRect.left + ((anchorRect.width - rect.width) / 2);
    left = Math.min(Math.max(margin, left), window.innerWidth - rect.width - margin);
    let top = anchorRect.top - rect.height - gap;
    if (top < margin) top = anchorRect.bottom + gap;
    top = Math.min(Math.max(margin, top), window.innerHeight - rect.height - margin);
    elements.info.style.left = `${Math.round(left)}px`;
    elements.info.style.top = `${Math.round(top)}px`;
  }

  function hideCurrencyInfo() {
    if (elements?.info) elements.info.hidden = true;
  }

  function normalizeRegion(region) {
    const normalized = String(region || "").trim();
    return MARKET_REGIONS.includes(normalized) ? normalized : "중부";
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function randomRange(minimum, maximum) {
    return minimum + ((maximum - minimum) * Math.random());
  }

  function randomInteger(minimum, maximum) {
    return Math.floor(randomRange(minimum, maximum + 1));
  }

  function reliabilityProfile(reliability) {
    if (reliability >= 100) return { minimumDays: 50, commonMinimum: 0, commonMaximum: 0, rareMaximum: 0 };
    if (reliability >= 95) return { minimumDays: 45, commonMinimum: 1, commonMaximum: 3, rareMaximum: 4 };
    if (reliability >= 90) return { minimumDays: 40, commonMinimum: 3, commonMaximum: 6, rareMaximum: 8 };
    if (reliability >= 80) return { minimumDays: 35, commonMinimum: 6, commonMaximum: 12, rareMaximum: 15 };
    if (reliability >= 75) return { minimumDays: 30, commonMinimum: 8, commonMaximum: 16, rareMaximum: 18 };
    return { minimumDays: 30, commonMinimum: 12, commonMaximum: 20, rareMaximum: 24 };
  }

  function currencyBounds(currency) {
    const baseValue = Math.max(0, Number(currency?.baseValue) || 0);
    const reliability = clamp(Number(currency?.reliability) || 100, 0, 100);
    const bandRatio = (100 - reliability) / 100;
    const band = reliability >= 100 ? Math.max(1, baseValue * .02) : baseValue * bandRatio;
    return {
      baseValue,
      reliability,
      minimum: Math.max(1, baseValue - band),
      maximum: baseValue + band,
      band
    };
  }

  function chooseTrendDirection(record, bounds) {
    if (bounds.band <= 0) return 0;
    const distance = (Number(record.internalValue) - bounds.baseValue) / bounds.band;
    const absoluteDistance = Math.abs(distance);
    const inward = distance >= 0 ? -1 : 1;
    if (absoluteDistance >= .9 && Math.random() < .95) return inward;
    if (absoluteDistance >= .7 && Math.random() < .7) return inward;
    const previous = Math.sign(Number(record.direction) || 0);
    const roll = Math.random();
    if (previous && roll < .4) return previous;
    if (previous && roll < .75) return -previous;
    if (!previous && roll < .375) return -1;
    if (!previous && roll < .75) return 1;
    return 0;
  }

  function beginTrend(record, currency, startDay) {
    const bounds = currencyBounds(currency);
    if (bounds.baseValue <= 0) {
      return {
        internalValue: bounds.baseValue,
        startValue: bounds.baseValue,
        targetValue: bounds.baseValue,
        direction: 0,
        trendStartDay: startDay,
        trendEndDay: startDay + 60,
        microAmplitude: 0,
        microCycles: 0,
        microPhase: 0
      };
    }
    let direction = chooseTrendDirection(record, bounds);
    if (bounds.reliability >= 100 && !direction) direction = Math.random() < .5 ? -1 : 1;
    const startValue = clamp(Number(record.internalValue) || bounds.baseValue, bounds.minimum, bounds.maximum);
    if (!direction) {
      return {
        ...record,
        internalValue: startValue,
        startValue,
        targetValue: startValue,
        direction: 0,
        trendStartDay: startDay,
        trendEndDay: startDay + randomInteger(7, 14),
        microAmplitude: bounds.reliability >= 100
          ? bounds.band * randomRange(.03, .08)
          : bounds.baseValue * ((100 - bounds.reliability) / 30) * randomRange(.006, .016),
        microCycles: randomInteger(1, 2),
        microPhase: randomRange(0, Math.PI * 2)
      };
    }
    const profile = reliabilityProfile(bounds.reliability);
    const strongTrend = Math.random() < .12;
    const percentage = strongTrend
      ? randomRange(profile.commonMaximum, profile.rareMaximum)
      : randomRange(profile.commonMinimum, profile.commonMaximum);
    let targetValue = bounds.reliability >= 100
      ? clamp(startValue + (bounds.band * randomRange(.35, strongTrend ? .95 : .7) * direction), bounds.minimum, bounds.maximum)
      : clamp(startValue + (bounds.baseValue * percentage / 100 * direction), bounds.minimum, bounds.maximum);
    if (Math.abs(targetValue - startValue) < Math.max(.08, bounds.baseValue * .005)) {
      const fallbackDirection = startValue >= bounds.baseValue ? -1 : 1;
      targetValue = clamp(
        startValue + (bounds.reliability >= 100 ? bounds.band * .35 : bounds.baseValue * profile.commonMinimum / 100) * fallbackDirection,
        bounds.minimum,
        bounds.maximum
      );
    }
    return {
      ...record,
      internalValue: startValue,
      startValue,
      targetValue,
      direction: Math.sign(targetValue - startValue),
      trendStartDay: startDay,
      trendEndDay: startDay + randomInteger(profile.minimumDays, 60),
      microAmplitude: bounds.reliability >= 100
        ? bounds.band * randomRange(.04, .1)
        : bounds.baseValue * ((100 - bounds.reliability) / 30) * randomRange(.012, .035),
      microCycles: randomInteger(3, 6),
      microPhase: randomRange(0, Math.PI * 2)
    };
  }

  function valueAtTrendDay(record, currency, day) {
    const bounds = currencyBounds(currency);
    const duration = Math.max(1, Number(record.trendEndDay) - Number(record.trendStartDay));
    const progress = clamp((day - Number(record.trendStartDay)) / duration, 0, 1);
    const baseline = Number(record.startValue) + ((Number(record.targetValue) - Number(record.startValue)) * progress);
    const envelope = Math.sin(Math.PI * progress);
    const wave = Math.sin((progress * Number(record.microCycles || 0) * Math.PI * 2) + Number(record.microPhase || 0));
    return clamp(baseline + (wave * Number(record.microAmplitude || 0) * envelope), bounds.minimum, bounds.maximum);
  }

  function createInitialRecord(currency, day) {
    const bounds = currencyBounds(currency);
    const centeredRoll = (Math.random() + Math.random()) - 1;
    let initialValue = clamp(bounds.baseValue + (centeredRoll * bounds.band * .72), bounds.minimum, bounds.maximum);
    if (bounds.reliability >= 100 && Math.abs(initialValue - bounds.baseValue) < .55) {
      initialValue = clamp(bounds.baseValue + (Math.random() < .5 ? -.55 : .55), bounds.minimum, bounds.maximum);
    }
    return beginTrend({ internalValue: initialValue, direction: 0 }, currency, day);
  }

  function normalizeRecord(value, currency, day) {
    const bounds = currencyBounds(currency);
    if (!value || typeof value !== "object" || !Number.isFinite(Number(value.internalValue))) {
      return createInitialRecord(currency, day);
    }
    const record = {
      internalValue: clamp(Number(value.internalValue), bounds.minimum, bounds.maximum),
      startValue: clamp(Number(value.startValue), bounds.minimum, bounds.maximum),
      targetValue: clamp(Number(value.targetValue), bounds.minimum, bounds.maximum),
      direction: Math.sign(Number(value.direction) || 0),
      trendStartDay: Math.max(1, Math.trunc(Number(value.trendStartDay) || day)),
      trendEndDay: Math.max(2, Math.trunc(Number(value.trendEndDay) || (day + 30))),
      microAmplitude: Math.max(0, Number(value.microAmplitude) || 0),
      microCycles: Math.max(0, Number(value.microCycles) || 0),
      microPhase: Number(value.microPhase) || 0
    };
    if (bounds.reliability >= 100
      && Math.abs(record.targetValue - record.startValue) < .0001
      && record.microAmplitude <= 0) {
      return createInitialRecord(currency, day);
    }
    if (!Number.isFinite(record.startValue)) record.startValue = record.internalValue;
    if (!Number.isFinite(record.targetValue)) record.targetValue = record.internalValue;
    if (record.trendEndDay <= record.trendStartDay) record.trendEndDay = record.trendStartDay + 30;
    return record;
  }

  function advanceRecord(record, currency, day) {
    let advanced = normalizeRecord(record, currency, day);
    let guard = 0;
    while (day > advanced.trendEndDay && guard < 120) {
      advanced.internalValue = valueAtTrendDay(advanced, currency, advanced.trendEndDay);
      advanced = beginTrend(advanced, currency, advanced.trendEndDay);
      guard += 1;
    }
    advanced.internalValue = valueAtTrendDay(advanced, currency, day);
    return advanced;
  }

  function applyCirculation(currency, regionalBaseValue, region) {
    const regions = String(currency?.region || "")
      .split(/[\/,·\s]+/)
      .map(value => value.trim())
      .filter(Boolean);
    const circulation = clamp(Number.isFinite(Number(currency?.circulation)) ? Number(currency.circulation) : 100, 0, 100);
    const multiplier = regions.includes(normalizeRegion(region)) ? 1 : circulation / 100;
    return Math.max(1, Math.round((Number(regionalBaseValue) || 0) * multiplier));
  }

  function liveValueFromState(state, currency, region) {
    const normalizedRegion = normalizeRegion(region);
    const record = state?.regions?.[normalizedRegion]?.[currency.id];
    return applyCirculation(currency, Number(record?.internalValue) || Number(currency.baseValue) || 0, normalizedRegion);
  }

  function ensureMarketState(day = getWorldDay()) {
    const currentDay = Math.max(1, Math.trunc(Number(day) || 1));
    const stored = getMarketState();
    const state = stored && typeof stored === "object"
      ? stored
      : { schemaVersion: MARKET_SCHEMA_VERSION, lastUpdatedDay: currentDay, regions: {}, knownQuotes: {} };
    let changed = !stored
      || Number(state.schemaVersion) !== MARKET_SCHEMA_VERSION
      || Number(state.lastUpdatedDay) !== currentDay;
    state.schemaVersion = MARKET_SCHEMA_VERSION;
    state.regions = state.regions && typeof state.regions === "object" ? state.regions : {};
    state.knownQuotes = state.knownQuotes && typeof state.knownQuotes === "object" ? state.knownQuotes : {};
    MARKET_REGIONS.forEach(region => {
      const sourceRecords = state.regions[region] && typeof state.regions[region] === "object" ? state.regions[region] : {};
      const records = {};
      currencies.forEach(currency => {
        const before = sourceRecords[currency.id];
        const after = advanceRecord(before, currency, currentDay);
        records[currency.id] = after;
        if (!before || Math.abs((Number(before.internalValue) || 0) - after.internalValue) > .000001
          || Number(before.trendEndDay) !== after.trendEndDay) changed = true;
      });
      state.regions[region] = records;
      const quote = state.knownQuotes[region] && typeof state.knownQuotes[region] === "object"
        ? state.knownQuotes[region]
        : { day: currentDay, values: {} };
      quote.values = quote.values && typeof quote.values === "object" ? quote.values : {};
      currencies.forEach(currency => {
        if (!Number.isFinite(Number(quote.values[currency.id]))) {
          quote.values[currency.id] = liveValueFromState(state, currency, region);
          changed = true;
        }
      });
      quote.day = Math.max(1, Math.trunc(Number(quote.day) || currentDay));
      state.knownQuotes[region] = quote;
    });
    state.lastUpdatedDay = currentDay;
    if (changed || stored !== state) setMarketState(state);
    return state;
  }

  function getCurrencyValue(currencyOrId, region = getRegion()) {
    const currency = typeof currencyOrId === "string"
      ? currencies.find(entry => entry.id === currencyOrId)
      : currencyOrId;
    if (!currency) return 0;
    const state = ensureMarketState();
    return liveValueFromState(state, currency, region);
  }

  function getKnownCurrencyValue(currencyOrId, region = getRegion()) {
    const currency = typeof currencyOrId === "string"
      ? currencies.find(entry => entry.id === currencyOrId)
      : currencyOrId;
    if (!currency) return 0;
    const normalizedRegion = normalizeRegion(region);
    const state = ensureMarketState();
    const known = Number(state.knownQuotes?.[normalizedRegion]?.values?.[currency.id]);
    return Number.isFinite(known) ? Math.max(1, Math.round(known)) : liveValueFromState(state, currency, normalizedRegion);
  }

  function refreshKnowledge(region = getRegion()) {
    const normalizedRegion = normalizeRegion(region);
    const state = ensureMarketState();
    state.knownQuotes[normalizedRegion] = {
      day: Math.max(1, Math.trunc(Number(getWorldDay()) || 1)),
      values: Object.fromEntries(currencies.map(currency => [
        currency.id,
        liveValueFromState(state, currency, normalizedRegion)
      ]))
    };
    setMarketState(state);
    render();
    return { ...state.knownQuotes[normalizedRegion], region: normalizedRegion };
  }

  function advanceMarketToDay(day) {
    const state = ensureMarketState(day);
    render();
    return state;
  }

  function getMarketSnapshot(region = getRegion()) {
    const normalizedRegion = normalizeRegion(region);
    const state = ensureMarketState();
    return {
      region: normalizedRegion,
      day: state.lastUpdatedDay,
      values: Object.fromEntries(currencies.map(currency => [currency.id, liveValueFromState(state, currency, normalizedRegion)])),
      knownDay: state.knownQuotes?.[normalizedRegion]?.day || state.lastUpdatedDay
    };
  }

  function getTrendSnapshot(region = "") {
    const state = ensureMarketState();
    const regions = region ? [normalizeRegion(region)] : MARKET_REGIONS;
    return regions.flatMap(regionName => currencies.flatMap(currency => {
      const record = state.regions?.[regionName]?.[currency.id];
      if (!record) return [];
      const baseValue = Math.max(1, Number(currency.baseValue) || 1);
      const changePercent = ((Number(record.targetValue) - Number(record.startValue)) / baseValue) * 100;
      if (Math.abs(changePercent) < .5) return [];
      const direction = changePercent > 0
        ? Math.abs(changePercent) >= 12 ? "강한 상승" : "상승"
        : Math.abs(changePercent) >= 12 ? "강한 하락" : "하락";
      return [{
        region: regionName,
        currencyId: currency.id,
        currencyName: currency.name,
        direction,
        changePercent,
        trendStartDay: Number(record.trendStartDay) || state.lastUpdatedDay,
        trendEndDay: Number(record.trendEndDay) || state.lastUpdatedDay,
        currentValue: liveValueFromState(state, currency, regionName)
      }];
    }));
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(value);
  }

  window.ProjectWWallet = {
    init,
    load,
    open,
    close,
    getResumeState,
    restoreResumeState,
    refresh,
    getCurrencies,
    getDataSource,
    getCurrencyValue,
    getKnownCurrencyValue,
    ensureMarketState,
    advanceMarketToDay,
    refreshKnowledge,
    getMarketSnapshot,
    getTrendSnapshot
  };
}());
