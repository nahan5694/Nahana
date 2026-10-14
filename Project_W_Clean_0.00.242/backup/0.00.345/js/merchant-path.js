(function exposeMerchantPath() {
  const STORAGE_KEY = "project_w_merchant_path_v1";
  const PEDDLER_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1918099078&single=true&output=csv";
  const PEDDLER_MAX_LEVEL = 50;
  const PEDDLER_FIRST_REQUIREMENT = 100;
  const PEDDLER_SECOND_REQUIREMENT = 133;
  const PEDDLER_REQUIREMENT_GROWTH = 1.237;
  const CONTRACT_START_DATE = { year: 1433, month: 4, day: 8 };
  const MAX_COMPLETED_JOURNEYS = 6;
  const TRADE_REVIEW_HISTORY_DAYS = 10;
  const TRADE_LOG_EXPORT_LIMITS = new Map([[1, 500], [3, 700], [7, 1000]]);
  const TRADE_LOG_SPECIAL_WEATHERS = new Set(["비", "폭우", "눈", "폭설"]);
  const REVIEW_EXPENSE_TYPES = new Set(["tax", "food", "ferry"]);
  const OUTLET_STATES = ["observed", "production", "excluded"];
  const LEVEL_THRESHOLDS = [0, 10, 20, 40, 80, 160, 320, 640];
  const EXCLUDED_CATEGORIES = new Set(["여행물품", "야영물품", "여행식량", "야영식량", "여행음식", "야영음식"]);
  const COMPANY_NAMES = ["인데그루크 상회", "브란트 상회", "첼페니 상회"];
  const COMPANY_ASSET_IDS = new Map([
    ["인데그루크 상회", "Asset_merchant_01"],
    ["브란트 상회", "Asset_merchant_02"],
    ["첼페니 상회", "Asset_merchant_03"]
  ]);
  const COMPANY_STAGES = [
    { minimum: 0, name: "뜨내기 고객", benefit: "거래 가치가 10~20% 불리하게 적용됩니다.", merchantSellRange: [10, 20], playerSellRange: [-20, -10], informationBonus: 0 },
    { minimum: 100, name: "일반 고객", benefit: "관계에 따른 거래 가치 보정이 없습니다.", merchantSellRange: [0, 0], playerSellRange: [0, 0], informationBonus: 0 },
    { minimum: 500, name: "비지니스 고객", benefit: "거래 가치가 5~10% 유리하게 적용됩니다.", merchantSellRange: [-10, -5], playerSellRange: [5, 10], informationBonus: 0 },
    { minimum: 1500, name: "단골 고객", benefit: "5~10%의 거래 혜택과 상회 정보 수집 기회 +1을 적용합니다.", merchantSellRange: [-10, -5], playerSellRange: [5, 10], informationBonus: 1 },
    { minimum: 3000, name: "상업 동반자", benefit: "10~20%의 거래 혜택과 상회 정보 수집 기회 +1을 적용합니다.", merchantSellRange: [-20, -10], playerSellRange: [10, 20], informationBonus: 1 }
  ];
  const QUALITY_PURCHASE_RANGES = {
    저품질: [-30, -15],
    통상품질: [-15, 15],
    고품질: [15, 30],
    명품: [25, 75]
  };
  const QUALITY_SALE_RANGES = {
    저품질: [-30, 0],
    통상품질: [0, 25],
    고품질: [25, 75],
    명품: [75, 125]
  };
  const INFORMATION_ATTEMPT_SKILLS = new Map([
    ["여관", "PED_022"],
    ["주점", "PED_023"],
    ["상업조합", "PED_024"]
  ]);
  const INFORMATION_SUCCESS_SKILLS = ["PED_025", "PED_026", "PED_027", "PED_028"];
  const INFORMATION_INTUITION_SKILLS = [
    ["PED_031", .5],
    ["PED_030", .33],
    ["PED_029", .2]
  ];
  const INFORMATION_SOURCE_SKILLS = ["PED_032", "PED_033", "PED_034"];
  const BARGAIN_VALUE_CAP_SKILLS = new Map([
    ["PED_007", 1],
    ["PED_008", 1],
    ["PED_009", 2]
  ]);
  const PEDDLER_EFFECT_OVERRIDES = new Map([
    ["PED_007", "흥정 상품가 기준 양보 한도 상한 +1%"],
    ["PED_008", "흥정 상품가 기준 양보 한도 상한 +1%"],
    ["PED_009", "흥정 상품가 기준 양보 한도 상한 +2%"]
  ]);
  const DETERIORATION_SKILL_GROUPS = [
    { categories: ["가축"], first: "PED_010", second: "PED_011" },
    { categories: ["식료품", "조미료", "주류"], first: "PED_012", second: "PED_013" },
    { categories: ["향료", "향신료", "의약품", "염료"], first: "PED_014", second: "PED_015" },
    { categories: ["섬유", "직물", "부산물"], first: "PED_016", second: "PED_017" },
    { categories: ["광석", "공업품", "병구류"], first: "PED_018", second: "PED_019" },
    { categories: ["공예품", "귀중품", "잡화"], first: "PED_020", second: "PED_021" }
  ];
  const ARTICLES = [
    { id: 1, title: "눈과 귀를 바쁘게 움직여라", description: "행상포인트를 사용해 정보와 소문을 다루는 능력을 익힙니다." },
    { id: 2, title: "물고 늘어져 이윤을 만들어라", description: "행상포인트를 사용해 구입과 판매에서 이윤을 확보하는 능력을 익힙니다." },
    { id: 3, title: "몸과 짐을 살펴라", description: "행상포인트를 사용해 야영과 여정 중 몸과 화물을 관리하는 능력을 익힙니다." },
    { id: 4, title: "말끔함과 웃는 얼굴", description: "조합원으로서 공헌하고, 상인으로서 상회와의 관계를 쌓는 자세입니다." },
    { id: 5, title: "다루는 상품을 알고 이해하라", description: "상품을 사고 팔며 쌓은 경험으로 정보를 해금하고, 상품별 메모와 거래 기록을 관리합니다." }
  ];

  let state = loadState();
  let getAssetUrl = () => "";
  let getWorldTime = () => ({ day: 1, phaseIndex: 0 });
  let getGuildContribution = () => ({ xp: 0, levelXp: 0, level: 1, nextThreshold: 500, progress: 0, maxInformationAttempts: 1 });
  let getCompanionProfile = () => ({ rank: 1, mood: 50, moodLabel: "통상" });
  let getCurrentSeason = () => "봄";
  let getCurrentSettlementName = () => "확인되지 않은 거점";
  let notify = () => {};
  let selectedArticle = 5;
  let selectedArticleFourSection = 1;
  let selectedCategory = "";
  let selectedMemoItemId = "";
  let showingTradeLog = false;
  let selectedTradeLogId = "";
  let selectedTradeLogEntryIndex = 0;
  let tradeLogExportExpanded = false;
  let definitions = [];
  let peddlerDefinitions = [];
  let peddlerLoadPromise = null;
  let elements = {};

  function init(options = {}) {
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    getWorldTime = typeof options.getWorldTime === "function" ? options.getWorldTime : getWorldTime;
    getGuildContribution = typeof options.getGuildContribution === "function" ? options.getGuildContribution : getGuildContribution;
    getCompanionProfile = typeof options.getCompanionProfile === "function" ? options.getCompanionProfile : getCompanionProfile;
    getCurrentSeason = typeof options.getCurrentSeason === "function" ? options.getCurrentSeason : getCurrentSeason;
    getCurrentSettlementName = typeof options.getCurrentSettlementName === "function" ? options.getCurrentSettlementName : getCurrentSettlementName;
    notify = typeof options.notify === "function" ? options.notify : notify;
    elements = {
      modal: document.querySelector("#merchant-path-modal"),
      close: document.querySelector("#merchant-path-close"),
      articleButtons: [...document.querySelectorAll("[data-merchant-path-article]")],
      tradeLog: document.querySelector("#merchant-path-trade-log"),
      articleNumber: document.querySelector("#merchant-path-article-number"),
      articleTitle: document.querySelector("#merchant-path-article-title"),
      articleDescription: document.querySelector("#merchant-path-article-description"),
      info: document.querySelector("#merchant-path-info"),
      infoTooltip: document.querySelector("#merchant-path-info-tooltip"),
      categoryTabs: document.querySelector("#merchant-path-category-tabs"),
      content: document.querySelector("#merchant-path-content")
    };
    if (!elements.modal) return;
    void loadPeddlerDefinitions();
    elements.close?.addEventListener("click", close);
    elements.info?.addEventListener("pointerenter", showKnowledgeGuide);
    elements.info?.addEventListener("pointerleave", hideKnowledgeGuide);
    elements.info?.addEventListener("focus", showKnowledgeGuide);
    elements.info?.addEventListener("blur", hideKnowledgeGuide);
    elements.articleButtons.forEach(button => button.addEventListener("click", () => {
      selectedArticle = clampInt(button.dataset.merchantPathArticle, 1, 5);
      selectedMemoItemId = "";
      showingTradeLog = false;
      render();
    }));
    elements.tradeLog?.addEventListener("click", () => {
      showingTradeLog = true;
      selectedMemoItemId = "";
      selectedTradeLogEntryIndex = 0;
      render();
    });
    elements.categoryTabs?.addEventListener("click", event => {
      const button = event.target.closest("[data-merchant-path-category]");
      if (!button) return;
      selectedCategory = button.dataset.merchantPathCategory || "";
      selectedMemoItemId = "";
      renderArticleFive();
    });
    elements.content?.addEventListener("click", event => {
      const skillButton = event.target.closest("[data-peddler-skill]");
      if (skillButton) {
        acquirePeddlerSkill(skillButton.dataset.peddlerSkill);
        return;
      }
      const logDateButton = event.target.closest("[data-trade-log-id]");
      if (logDateButton) {
        selectedTradeLogId = String(logDateButton.dataset.tradeLogId || "");
        selectedTradeLogEntryIndex = 0;
        renderTradeLog();
        return;
      }
      const logEntryButton = event.target.closest("[data-trade-log-entry-index]");
      if (logEntryButton) {
        selectedTradeLogEntryIndex = Math.max(0, Math.trunc(Number(logEntryButton.dataset.tradeLogEntryIndex) || 0));
        renderTradeLog();
        return;
      }
      const exportToggle = event.target.closest("[data-trade-log-export-toggle]");
      if (exportToggle) {
        tradeLogExportExpanded = !tradeLogExportExpanded;
        renderTradeLog();
        return;
      }
      const exportButton = event.target.closest("[data-trade-log-export-days]");
      if (exportButton) {
        openTradeLogExport(clampInt(exportButton.dataset.tradeLogExportDays, 1, 7));
        return;
      }
      const button = event.target.closest("[data-merchant-path-article-four-section]");
      if (!button) return;
      selectedArticleFourSection = clampInt(button.dataset.merchantPathArticleFourSection, 1, 2);
      renderArticleFour();
      hideKnowledgeGuide();
    });
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

  async function open() {
    if (!elements.modal) return;
    elements.modal.hidden = false;
    window.ProjectWAudio?.playEffect("paper");
    elements.content.replaceChildren(createEmpty("Goods 시트에서 상품 지식을 불러오는 중입니다."));
    const [result] = await Promise.all([window.ProjectWCargo.load(), loadPeddlerDefinitions()]);
    if (elements.modal.hidden) return;
    definitions = knowledgeDefinitions(window.ProjectWCargo.getItemDefinitions());
    if (!selectedCategory || !definitions.some(definition => definition.category === selectedCategory)) {
      selectedCategory = categories()[0] || "";
    }
    render();
    if (result?.source !== "csv") notify("Goods CSV를 불러오지 못해 확인된 상품 정보만 표시합니다.");
  }

  async function openItemMemo(itemId) {
    const normalizedItemId = String(itemId || "").trim();
    if (!normalizedItemId) return false;
    selectedArticle = 5;
    showingTradeLog = false;
    selectedMemoItemId = normalizedItemId;
    await open();
    const definition = definitions.find(entry => entry.id === normalizedItemId);
    if (!definition) {
      selectedMemoItemId = "";
      notify("이 상품은 행상인의 길 메모 대상이 아닙니다.");
      render();
      return false;
    }
    selectedCategory = definition.category;
    render();
    requestAnimationFrame(() => {
      const editor = elements.content?.querySelector(".merchant-path-note-editor");
      editor?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      editor?.querySelector("input")?.focus({ preventScroll: true });
    });
    return true;
  }

  function close() {
    const wasOpen = Boolean(elements.modal && !elements.modal.hidden);
    hideKnowledgeGuide();
    if (elements.modal) elements.modal.hidden = true;
    if (wasOpen) window.ProjectWAudio?.playEffect("paper");
  }

  function refresh() {
    if (elements.modal && !elements.modal.hidden) render();
  }

  function getResumeState() {
    if (!elements.modal || elements.modal.hidden) return null;
    return { selectedArticle, selectedArticleFourSection, selectedCategory, selectedMemoItemId, showingTradeLog, selectedTradeLogId, selectedTradeLogEntryIndex };
  }

  async function restoreResumeState(snapshot = {}) {
    selectedArticle = clampInt(snapshot.selectedArticle, 1, 5);
    selectedArticleFourSection = clampInt(snapshot.selectedArticleFourSection, 1, 2);
    selectedCategory = String(snapshot.selectedCategory || "").trim();
    selectedMemoItemId = String(snapshot.selectedMemoItemId || "").trim();
    showingTradeLog = Boolean(snapshot.showingTradeLog);
    selectedTradeLogId = String(snapshot.selectedTradeLogId || "").trim();
    selectedTradeLogEntryIndex = Math.max(0, Math.trunc(Number(snapshot.selectedTradeLogEntryIndex) || 0));
    await open();
    return Boolean(elements.modal && !elements.modal.hidden);
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(error);
    }
    state = createDefaultState();
    selectedArticle = 5;
    selectedArticleFourSection = 1;
    selectedCategory = "";
    selectedMemoItemId = "";
    showingTradeLog = false;
    selectedTradeLogId = "";
    selectedTradeLogEntryIndex = 0;
    tradeLogExportExpanded = false;
    close();
  }

  function render() {
    if (!elements.modal || elements.modal.hidden) return;
    const article = ARTICLES.find(entry => entry.id === selectedArticle) || ARTICLES[4];
    elements.articleButtons.forEach(button => {
      const active = !showingTradeLog && Number(button.dataset.merchantPathArticle) === selectedArticle;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      const articleId = Number(button.dataset.merchantPathArticle);
      button.classList.toggle("has-peddler-points", articleId <= 3 && getPeddlerProfile().points > 0);
    });
    elements.tradeLog?.classList.toggle("is-active", showingTradeLog);
    elements.tradeLog?.setAttribute("aria-pressed", String(showingTradeLog));
    if (showingTradeLog) {
      elements.articleNumber.textContent = "기록";
      elements.articleTitle.textContent = "상행록";
      elements.articleDescription.textContent = "최근 10일의 복기를 확인하고 외부 역할극용 상행 핵심 내용을 추출합니다.";
      elements.info.hidden = true;
      elements.categoryTabs.hidden = true;
      hideKnowledgeGuide();
      renderTradeLog();
      return;
    }
    elements.articleNumber.textContent = `${article.id}조`;
    elements.articleTitle.textContent = article.title;
    elements.articleDescription.textContent = article.description;
    const hasGuide = selectedArticle === 5;
    elements.info.hidden = !hasGuide;
    elements.info.setAttribute("aria-label", "지식 단계별 해금 정보");
    hideKnowledgeGuide();
    elements.categoryTabs.hidden = selectedArticle !== 5;
    if (selectedArticle <= 3) renderPeddlerArticle(selectedArticle);
    else if (selectedArticle === 4) renderArticleFour();
    else if (selectedArticle === 5) renderArticleFive();
    else elements.content.replaceChildren(createArticlePlaceholder(article.id));
  }

  function renderArticleFour() {
    const wrapper = document.createElement("div");
    wrapper.className = "merchant-path-article-four";
    const navigation = document.createElement("nav");
    navigation.className = "merchant-path-section-tabs";
    [
      [1, "1항", "조합원으로서의 몸가짐"],
      [2, "2항", "상인으로서의 몸가짐"]
    ].forEach(([section, number, label]) => {
      const tab = document.createElement("div");
      tab.className = "merchant-path-section-tab";
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.merchantPathArticleFourSection = String(section);
      button.classList.toggle("is-active", selectedArticleFourSection === section);
      button.setAttribute("aria-pressed", String(selectedArticleFourSection === section));
      const numberLabel = document.createElement("span");
      const title = document.createElement("strong");
      numberLabel.textContent = number;
      title.textContent = label;
      button.append(numberLabel, title);
      const info = document.createElement("button");
      info.type = "button";
      info.className = "merchant-path-section-info";
      info.textContent = "!";
      info.setAttribute("aria-label", section === 1 ? "상업조합 공헌도 단계 안내" : "상회 이용 단계별 보너스");
      info.setAttribute("aria-describedby", "merchant-path-info-tooltip");
      info.addEventListener("pointerenter", () => showArticleFourGuide(section, info));
      info.addEventListener("pointerleave", hideKnowledgeGuide);
      info.addEventListener("focus", () => showArticleFourGuide(section, info));
      info.addEventListener("blur", hideKnowledgeGuide);
      tab.append(button, info);
      navigation.append(tab);
    });
    const body = selectedArticleFourSection === 1
      ? createGuildContributionPanel()
      : createCompanyRelationshipPanel();
    wrapper.append(navigation, body);
    elements.content.replaceChildren(wrapper);
  }

  function createGuildContributionPanel() {
    const profile = getGuildContribution() || {};
    const panel = document.createElement("section");
    panel.className = "merchant-path-guild-contribution";
    const heading = document.createElement("header");
    const headingCopy = document.createElement("div");
    const title = document.createElement("strong");
    const level = document.createElement("em");
    title.textContent = "상업조합 공헌도";
    level.textContent = `${Math.min(5, Math.max(1, Number(profile.level) || 1))}단계`;
    headingCopy.append(title);
    heading.append(headingCopy, level);

    const progress = document.createElement("div");
    progress.className = "merchant-path-guild-progress";
    const progressBar = document.createElement("div");
    const progressFill = document.createElement("span");
    progressFill.style.width = `${Math.round(Math.min(1, Math.max(0, Number(profile.progress) || 0)) * 100)}%`;
    progressBar.append(progressFill);
    const progressCopy = document.createElement("p");
    progressCopy.textContent = profile.nextThreshold == null
      ? `${formatNumber(profile.xp)}점 · 최고 단계`
      : `${formatNumber(profile.levelXp)} / ${formatNumber(profile.nextThreshold)}점`;
    progress.append(progressBar, progressCopy);

    const summary = document.createElement("div");
    summary.className = "merchant-path-guild-summary";
    const attempt = document.createElement("article");
    const attemptLabel = document.createElement("span");
    const attemptValue = document.createElement("strong");
    const attemptNote = document.createElement("small");
    attemptLabel.textContent = "정보 수집 기회";
    attemptValue.textContent = `최대 ${Math.max(1, Number(profile.maxInformationAttempts) || 1)}회`;
    attemptNote.textContent = "상업조합별 3일마다 초기화 · 타임 소모 없음";
    attempt.append(attemptLabel, attemptValue, attemptNote);
    const next = document.createElement("article");
    const nextLabel = document.createElement("span");
    const nextValue = document.createElement("strong");
    const nextNote = document.createElement("small");
    nextLabel.textContent = "다음 단계";
    nextValue.textContent = profile.nextThreshold == null ? "최고 단계" : `${formatNumber(profile.nextThreshold)}점`;
    nextNote.textContent = profile.nextThreshold == null
      ? "상업조합 정보 수집 기회가 최대치입니다."
      : `앞으로 ${formatNumber(Math.max(0, Number(profile.nextThreshold) - Number(profile.levelXp || 0)))}점`;
    next.append(nextLabel, nextValue, nextNote);
    summary.append(attempt, next);

    const description = document.createElement("p");
    description.className = "merchant-path-guild-description";
    description.textContent = "상업조합에 화폐를 공헌하면 납부 가치만큼 공헌도를 얻습니다. 공헌도 단계가 오를수록 상업조합에서 시도할 수 있는 정보 수집 횟수가 늘어납니다.";
    panel.append(heading, progress, summary, description);
    return panel;
  }

  function createCompanyRelationshipPanel() {
    const wrapper = document.createElement("div");
    wrapper.className = "merchant-path-company-list";
    COMPANY_NAMES.forEach(companyName => {
      const profile = getCompanyProfile(companyName);
      const row = document.createElement("article");
      const assetId = COMPANY_ASSET_IDS.get(companyName) || "";
      const assetSource = assetId ? getAssetUrl(assetId) : "";
      if (assetSource) {
        const icon = document.createElement("img");
        icon.className = "merchant-path-company-icon";
        icon.src = assetSource;
        icon.alt = `${companyName} 문장`;
        row.append(icon);
      }
      const copy = document.createElement("div");
      const name = document.createElement("strong");
      const note = document.createElement("span");
      const score = document.createElement("em");
      name.textContent = companyName;
      note.textContent = `${profile.stageName} · ${profile.benefit}`;
      score.textContent = `${formatNumber(profile.score)}점`;
      score.title = profile.nextMinimum == null
        ? "최고 관계 단계"
        : `다음 단계까지 ${formatNumber(profile.nextMinimum - profile.score)}점`;
      copy.append(name, note);
      row.append(copy, score);
      wrapper.append(row);
    });
    return wrapper;
  }

  function renderArticleFive() {
    pruneTradeJourneys();
    const categoryNames = categories();
    if (!selectedCategory || !categoryNames.includes(selectedCategory)) selectedCategory = categoryNames[0] || "";
    const categoryButtons = categoryNames.map(category => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.merchantPathCategory = category;
      button.classList.toggle("is-active", category === selectedCategory);
      button.setAttribute("aria-pressed", String(category === selectedCategory));
      button.textContent = category;
      return button;
    });
    const cleanupButton = document.createElement("button");
    const excludedCount = countExcludedOutlets(selectedCategory);
    cleanupButton.type = "button";
    cleanupButton.className = "merchant-path-outlet-cleanup";
    cleanupButton.textContent = excludedCount ? `취소선 정리 ${excludedCount}` : "취소선 정리";
    cleanupButton.disabled = excludedCount <= 0;
    cleanupButton.addEventListener("click", confirmExcludedOutletCleanup);
    elements.categoryTabs.replaceChildren(...categoryButtons, cleanupButton);

    const items = definitions
      .filter(definition => definition.category === selectedCategory)
      .sort((left, right) => getLevel(right.id) - getLevel(left.id)
        || getXp(right.id) - getXp(left.id)
        || displayName(left).localeCompare(displayName(right), "ko"));
    const list = document.createElement("div");
    list.className = "merchant-path-knowledge-list";
    items.forEach(definition => list.append(createKnowledgeRow(definition)));
    elements.content.replaceChildren(items.length ? list : createEmpty("이 카테고리에 등록된 교역품이 없습니다."));
  }

  function renderTradeLog() {
    recordDailySnapshot({}, false);
    const history = getTradeReviewHistory();
    elements.categoryTabs.hidden = true;
    const wrapper = document.createElement("div");
    wrapper.className = "merchant-path-trade-log";
    wrapper.append(createTradeLogExportControls());
    if (!history.length) {
      selectedTradeLogId = "";
      selectedTradeLogEntryIndex = 0;
      const empty = createEmpty("최근 10일 동안 완료한 상행 복기가 없습니다. 오늘의 여정 기록은 상행록 추출에 포함됩니다.");
      empty.classList.add("merchant-path-trade-log-empty");
      wrapper.append(empty);
      elements.content.replaceChildren(wrapper);
      return;
    }
    if (!history.some(record => record.id === selectedTradeLogId)) selectedTradeLogId = history[0].id;
    const active = history.find(record => record.id === selectedTradeLogId) || history[0];
    selectedTradeLogEntryIndex = Math.min(Math.max(0, selectedTradeLogEntryIndex), Math.max(0, active.entries.length - 1));

    const dateRail = document.createElement("nav");
    dateRail.className = "merchant-path-trade-log-dates";
    dateRail.setAttribute("aria-label", "상행 복기 날짜");
    const dateHeading = document.createElement("header");
    const dateTitle = document.createElement("strong");
    const dateHelp = document.createElement("small");
    dateTitle.textContent = "최근 10일";
    dateHelp.textContent = "복기를 마친 날짜";
    dateHeading.append(dateTitle, dateHelp);
    dateRail.append(dateHeading, ...history.map(record => createTradeLogDateButton(record, record.id === active.id)));

    const screen = document.createElement("section");
    screen.className = "merchant-path-trade-log-screen";
    const screenHeader = document.createElement("header");
    const headingCopy = document.createElement("div");
    const relativeDay = document.createElement("span");
    const heading = document.createElement("h4");
    const count = document.createElement("strong");
    relativeDay.textContent = relativeReviewDay(active.ageDays);
    heading.textContent = "상행 복기";
    count.textContent = `교역 ${formatNumber(active.entries.filter(entry => entry.kind !== "expense").length)}건`;
    headingCopy.append(relativeDay, heading);
    screenHeader.append(headingCopy, count);

    const reviewLayout = document.createElement("div");
    reviewLayout.className = "merchant-path-trade-log-review";
    const entryRail = document.createElement("nav");
    entryRail.className = "merchant-path-trade-log-entries";
    entryRail.setAttribute("aria-label", `${relativeReviewDay(active.ageDays)} 복기 항목`);
    entryRail.append(...active.entries.map((entry, index) => createTradeLogEntryButton(entry, index, index === selectedTradeLogEntryIndex)));
    const detail = document.createElement("article");
    detail.className = "merchant-path-trade-log-detail";
    detail.append(createTradeLogDetail(active.entries[selectedTradeLogEntryIndex]));
    reviewLayout.append(entryRail, detail);
    screen.append(screenHeader, reviewLayout);
    wrapper.append(dateRail, screen);
    elements.content.replaceChildren(wrapper);
  }

  function createTradeLogExportControls() {
    const toolbar = document.createElement("section");
    toolbar.className = "merchant-path-trade-log-export";
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    const description = document.createElement("span");
    title.textContent = "외부 RP용 상행록";
    description.textContent = "여정과 교역, 식사, 나하나의 상태를 줄글로 정리합니다.";
    copy.append(title, description);
    const actions = document.createElement("div");
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.dataset.tradeLogExportToggle = "true";
    toggle.className = "merchant-path-trade-log-export-toggle";
    toggle.setAttribute("aria-expanded", String(tradeLogExportExpanded));
    toggle.textContent = "상행록 추출";
    actions.append(toggle);
    if (tradeLogExportExpanded) {
      [1, 3, 7].forEach(days => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.tradeLogExportDays = String(days);
        button.textContent = `${days}일 추출`;
        actions.append(button);
      });
    }
    toolbar.append(copy, actions);
    return toolbar;
  }

  function openTradeLogExport(lookbackDays) {
    const days = TRADE_LOG_EXPORT_LIMITS.has(lookbackDays) ? lookbackDays : 1;
    recordDailySnapshot();
    const maximum = TRADE_LOG_EXPORT_LIMITS.get(days);
    const summary = composeTradeLogExport(days, maximum);
    const existing = elements.modal.querySelector(".merchant-path-trade-export-layer");
    existing?.remove();

    const layer = document.createElement("div");
    layer.className = "merchant-path-trade-export-layer";
    const dialog = document.createElement("section");
    dialog.className = "merchant-path-trade-export-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-label", `${days}일 상행록 추출`);
    const header = document.createElement("header");
    const headingCopy = document.createElement("div");
    const eyebrow = document.createElement("span");
    const title = document.createElement("strong");
    const closeButton = document.createElement("button");
    eyebrow.textContent = `오늘부터 ${days}일 전까지 · 최대 ${maximum}자`;
    title.textContent = `${days}일 상행록 추출`;
    closeButton.type = "button";
    closeButton.textContent = "닫기";
    headingCopy.append(eyebrow, title);
    header.append(headingCopy, closeButton);
    const help = document.createElement("p");
    help.textContent = "아래 문장을 복사해 외부 나하나 봇과의 역할극에 사용할 수 있습니다.";
    const output = document.createElement("textarea");
    output.readOnly = true;
    output.value = summary;
    output.setAttribute("aria-label", "추출된 상행록");
    const footer = document.createElement("footer");
    const count = document.createElement("span");
    const copyButton = document.createElement("button");
    count.textContent = `${summary.length} / ${maximum}자`;
    copyButton.type = "button";
    copyButton.className = "is-copy";
    copyButton.textContent = "내용 복사";
    footer.append(count, copyButton);
    dialog.append(header, help, output, footer);
    layer.append(dialog);
    elements.modal.append(layer);

    const closeLayer = () => layer.remove();
    closeButton.addEventListener("click", closeLayer);
    layer.addEventListener("pointerdown", event => {
      if (event.target === layer) closeLayer();
    });
    layer.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      closeLayer();
    });
    copyButton.addEventListener("click", async () => {
      let copied = false;
      try {
        await navigator.clipboard.writeText(summary);
        copied = true;
      } catch {
        output.focus();
        output.select();
        copied = Boolean(document.execCommand?.("copy"));
        output.setSelectionRange(0, 0);
      }
      notify(copied ? "상행록 내용을 복사했습니다." : "복사하지 못했습니다. 내용을 직접 선택해 복사해 주세요.");
    });
    output.focus();
    output.setSelectionRange(0, 0);
  }

  function composeTradeLogExport(lookbackDays, maximumLength) {
    const currentDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const minimumDay = Math.max(1, currentDay - lookbackDays);
    const journal = normalizeJourneyJournal(state.journeyJournal)
      .filter(record => record.day >= minimumDay && record.day <= currentDay)
      .sort((left, right) => left.day - right.day);
    const currentCompanion = companionSnapshot();
    const rank = Math.max(1, Math.trunc(Number(currentCompanion.rank) || 1));
    const moods = collapseAdjacentText(journal.flatMap(record => record.moodHistory?.length ? record.moodHistory : [record.moodLabel]));
    if (moods.at(-1) !== currentCompanion.moodLabel) moods.push(currentCompanion.moodLabel);

    const archived = normalizeTradeReviewHistory(state.reviewHistory);
    const trades = [...archived.flatMap(record => record.entries
      .filter(entry => entry.kind !== "expense" && Number(entry.saleDay) >= minimumDay && Number(entry.saleDay) <= currentDay)),
      ...getPendingTradeReviews().filter(entry => entry.kind !== "expense" && entry.saleDay >= minimumDay && entry.saleDay <= currentDay)]
      .filter((entry, index, list) => list.findIndex(candidate => String(candidate.id) === String(entry.id)) === index);
    const expenses = [
      ...archived.flatMap(record => record.entries
        .filter(entry => entry.kind === "expense")
        .flatMap(entry => Array.isArray(entry.details) ? entry.details : [])),
      ...normalizeReviewExpenses(state.reviewExpenses)
    ].filter((entry, index, list) => entry.contractDay >= minimumDay && entry.contractDay <= currentDay
      && list.findIndex(candidate => String(candidate.id) === String(entry.id)) === index);

    const movements = journal.flatMap(record => record.movements.map(movement => ({ ...movement, day: record.day })));
    expenses.filter(entry => entry.type === "ferry").forEach(entry => {
      const match = String(entry.description || "").match(/^(.+?)\s*→\s*(.+?)(?:\s*·|$)/);
      if (!match) return;
      movements.push({ method: "정기선", fromName: match[1].trim(), toName: match[2].trim(), fromSettlement: true, toSettlement: true, routeName: "" });
    });
    const seasons = uniqueText(journal.flatMap(record => record.seasons));
    const specialWeather = journal.flatMap(record => record.specialWeather)
      .filter((entry, index, list) => list.findIndex(candidate => candidate.label === entry.label && candidate.routeName === entry.routeName) === index);
    const cargoCount = lookbackDays <= 1 ? 1 : lookbackDays <= 3 ? 2 : 3;
    const profits = trades.filter(entry => Number(entry.profit) > 0)
      .sort((left, right) => Number(right.profit) - Number(left.profit)).slice(0, cargoCount);
    const losses = trades.filter(entry => Number(entry.profit) < 0)
      .sort((left, right) => Number(left.profit) - Number(right.profit)).slice(0, cargoCount);

    const sentences = [];
    sentences.push(`상행록 범위는 오늘부터 ${lookbackDays}일 전까지의 총 ${lookbackDays + 1}일치 상황이다.`);
    sentences.push(moods.length > 1
      ? `동행 ${rank}등급. 나하나의 최종 기분은 ${currentCompanion.moodLabel}이며, 주요 변화는 ${moods.join("→")}였다.`
      : `동행 ${rank}등급. 나하나의 주요 기분 변화는 없었고 최종 기분은 ${currentCompanion.moodLabel}이다.`);
    sentences.push(`현재 플레이어의 최종 거점은 ${String(getCurrentSettlementName() || "확인되지 않은 거점")}이다.`);
    sentences.push(journeyExportSentence(movements, lookbackDays));
    sentences.push(environmentExportSentence(seasons, specialWeather));
    sentences.push(cargoExportSentence(profits, losses));
    sentences.push(mealExportSentence(expenses.filter(entry => entry.type === "food")));
    return fitExportSentences(sentences, maximumLength);
  }

  function journeyExportSentence(movements, lookbackDays) {
    if (!movements.length) return "기록된 이동 경로는 없다.";
    const settlementLimit = lookbackDays <= 1 ? 4 : lookbackDays <= 3 ? 6 : 9;
    const routeLimit = lookbackDays <= 1 ? 2 : lookbackDays <= 3 ? 4 : 6;
    const settlements = [];
    const routes = [];
    const sailings = [];
    movements.forEach(movement => {
      if (movement.method === "정기선") {
        const sailing = `${movement.fromName || "출발항"}→${movement.toName || "도착항"}`;
        appendUnique(sailings, sailing);
      } else {
        if (movement.fromSettlement && movement.fromName) appendOrdered(settlements, movement.fromName);
        if (movement.toSettlement && movement.toName) appendOrdered(settlements, movement.toName);
        if (movement.routeName) appendUnique(routes, movement.routeName);
      }
    });
    const clauses = [];
    if (settlements.length) clauses.push(`짐마차로 ${shortList(settlements, settlementLimit)} 경유`);
    if (routes.length) clauses.push(`${shortList(routes, routeLimit)} 이용`);
    if (sailings.length) clauses.push(`정기선 ${shortList(sailings, 3)} 이동`);
    return `${clauses.join(", ") || "여정을 이어 갔다"}.`;
  }

  function environmentExportSentence(seasons, specialWeather) {
    const seasonCopy = seasons.length ? `${shortList(seasons, 4)}철` : "계절 기록이 없는 때";
    if (!specialWeather.length) return `${seasonCopy}에 특수 기상 조우는 없었다.`;
    const encounters = specialWeather.map(entry => entry.routeName ? `${entry.routeName}의 ${entry.label}` : entry.label);
    return `${seasonCopy}에 ${shortList(encounters, 5)}에 조우했다.`;
  }

  function cargoExportSentence(profits, losses) {
    const profitCopy = profits.length
      ? profits.map(entry => `${entry.itemName}(+${formatNumber(entry.profit)})`).join("·")
      : "없음";
    const lossCopy = losses.length
      ? losses.map(entry => `${entry.itemName}(${formatNumber(entry.profit)})`).join("·")
      : "없음";
    return `큰 이익 화물: ${profitCopy}; 큰 손실 화물: ${lossCopy}.`;
  }

  function mealExportSentence(foodExpenses) {
    const meals = foodExpenses.flatMap(expense => mealItemsFromExpense(expense).map(item => ({ ...item, sourceLabel: expense.sourceLabel })));
    const tavern = aggregateMealItems(meals.filter(item => item.sourceLabel === "주점 식사"));
    const inn = aggregateMealItems(meals.filter(item => item.sourceLabel === "여관 음식"));
    const clauses = [];
    if (tavern.length) {
      const dishes = tavern.filter(item => item.type !== "음료");
      const drinks = tavern.filter(item => item.type === "음료");
      const core = dishes[0];
      const others = dishes.slice(1, 3);
      let copy = `주점 핵심 ${core?.name || tavern[0].name}`;
      if (drinks.length) copy += `, 음료 ${drinks[0].name}`;
      if (others.length) copy += `, 다른 메뉴 ${others.map(item => item.name).join("·")}`;
      clauses.push(copy);
    }
    if (inn.length) clauses.push(`여관 식사 ${shortList(inn.map(item => item.name), 4)}`);
    if (!clauses.length) return "기록된 주점·여관 식사는 없다.";
    return `${clauses.join(". ")}.`;
  }

  function mealItemsFromExpense(expense) {
    if (Array.isArray(expense.mealItems) && expense.mealItems.length) return expense.mealItems;
    return String(expense.description || "").split(",").map(value => {
      const match = value.trim().match(/^(.*?)\s*×\s*(\d+)/);
      return { name: (match?.[1] || value).trim(), quantity: Math.max(1, Number(match?.[2]) || 1), type: "", value: 0 };
    }).filter(item => item.name);
  }

  function aggregateMealItems(items) {
    const grouped = new Map();
    items.forEach(item => {
      const key = String(item.name || "").trim();
      if (!key) return;
      const current = grouped.get(key) || { name: key, type: String(item.type || ""), quantity: 0, score: 0 };
      const quantity = Math.max(1, Number(item.quantity) || 1);
      current.quantity += quantity;
      current.score += Math.max(0, Number(item.value) || 0) * quantity;
      if (!current.type && item.type) current.type = String(item.type);
      grouped.set(key, current);
    });
    return [...grouped.values()].sort((left, right) => right.score - left.score || right.quantity - left.quantity || left.name.localeCompare(right.name, "ko"));
  }

  function fitExportSentences(sentences, maximumLength) {
    const normalized = sentences.map(sentence => String(sentence || "").replace(/\s+/g, " ").trim()).filter(Boolean);
    let result = normalized.join(" ");
    if (result.length <= maximumLength) return result;
    const budgets = maximumLength <= 500
      ? [38, 75, 38, 85, 55, 82, 90]
      : maximumLength <= 700
        ? [45, 110, 45, 135, 80, 130, 125]
        : [55, 150, 55, 210, 105, 190, 190];
    result = normalized.map((sentence, index) => clipExportSentence(sentence, budgets[index] || 80)).join(" ");
    if (result.length <= maximumLength) return result;
    result = result.slice(0, Math.max(1, maximumLength - 1)).trimEnd();
    const lastStop = Math.max(result.lastIndexOf("."), result.lastIndexOf("다."));
    if (lastStop >= Math.floor(maximumLength * .72)) result = result.slice(0, lastStop + 1);
    else result = `${result.replace(/[,.·\s]+$/g, "")}…`;
    return result.slice(0, maximumLength);
  }

  function clipExportSentence(sentence, maximumLength) {
    const copy = String(sentence || "").trim();
    if (copy.length <= maximumLength) return copy;
    return `${copy.slice(0, Math.max(1, maximumLength - 1)).replace(/[,.·;:\s]+$/g, "")}…`;
  }

  function shortList(values, maximum) {
    const list = uniqueText(values);
    if (list.length <= maximum) return list.join("·");
    return `${list.slice(0, maximum).join("·")} 외 ${formatNumber(list.length - maximum)}곳`;
  }

  function uniqueText(values) {
    return [...new Set((Array.isArray(values) ? values : []).map(value => String(value || "").trim()).filter(Boolean))];
  }

  function collapseAdjacentText(values) {
    const result = [];
    (Array.isArray(values) ? values : []).forEach(value => {
      const normalized = String(value || "").trim();
      if (normalized && result.at(-1) !== normalized) result.push(normalized);
    });
    return result;
  }

  function appendUnique(list, value) {
    const normalized = String(value || "").trim();
    if (normalized && list.at(-1) !== normalized && !list.includes(normalized)) list.push(normalized);
  }

  function appendOrdered(list, value) {
    const normalized = String(value || "").trim();
    if (normalized && list.at(-1) !== normalized) list.push(normalized);
  }

  function createTradeLogDateButton(record, active) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.tradeLogId = record.id;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
    const day = document.createElement("strong");
    const summary = document.createElement("span");
    const tradeCount = record.entries.filter(entry => entry.kind !== "expense").length;
    const expenseTotal = record.entries
      .filter(entry => entry.kind === "expense")
      .reduce((sum, entry) => sum + Math.max(0, Number(entry.total) || 0), 0);
    day.textContent = relativeReviewDay(record.ageDays);
    summary.textContent = `교역 ${formatNumber(tradeCount)} · 지출 ${formatNumber(expenseTotal)}`;
    button.append(day, summary);
    return button;
  }

  function createTradeLogEntryButton(entry, index, active) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.tradeLogEntryIndex = String(index);
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
    if (entry.kind === "expense") button.classList.add("is-expense", `is-${entry.expenseType}`);
    const order = document.createElement("b");
    const label = document.createElement("span");
    const result = document.createElement("strong");
    order.textContent = String(index + 1);
    label.textContent = entry.kind === "expense"
      ? `${entry.summaryLabel || entry.itemName} · ${formatNumber(entry.quantity)}건`
      : `${entry.itemName} · ${formatNumber(entry.quantity)}개`;
    const profit = Number(entry.profit) || 0;
    result.className = profit > 0 ? "is-profit" : profit < 0 ? "is-loss" : "is-neutral";
    result.textContent = entry.kind === "expense"
      ? `${Number(entry.total) > 0 ? "-" : ""}${formatNumber(entry.total)} 가치`
      : `${profit > 0 ? "+" : ""}${formatNumber(profit)} 가치`;
    button.append(order, label, result);
    return button;
  }

  function createTradeLogDetail(entry) {
    if (!entry) return createEmpty("확인할 복기 항목이 없습니다.");
    return entry.kind === "expense" ? createTradeLogExpenseDetail(entry) : createTradeLogGoodsDetail(entry);
  }

  function createTradeLogExpenseDetail(entry) {
    const presentation = reviewExpensePresentation(entry.expenseType);
    const wrapper = document.createElement("div");
    wrapper.className = `merchant-path-log-expense is-${entry.expenseType}`;
    const header = document.createElement("header");
    const copy = document.createElement("div");
    const eyebrow = document.createElement("span");
    const title = document.createElement("h5");
    const total = document.createElement("strong");
    eyebrow.textContent = `${formatNumber(entry.quantity)}건 기록`;
    title.textContent = presentation.itemName;
    total.className = Number(entry.total) > 0 ? "is-loss" : "is-neutral";
    total.textContent = `합계 ${Number(entry.total) > 0 ? "-" : ""}${formatNumber(entry.total)} 가치`;
    copy.append(eyebrow, title);
    header.append(copy, total);
    const list = document.createElement("section");
    list.className = "merchant-path-log-expense-list";
    const records = Array.isArray(entry.details) ? entry.details : [];
    if (!records.length) {
      list.append(createEmpty(presentation.emptyMessage));
    } else {
      records.forEach(record => {
        const row = document.createElement("article");
        const location = document.createElement("div");
        const place = document.createElement("strong");
        const description = document.createElement("span");
        const amount = document.createElement("b");
        place.textContent = `${record.settlementName || "이름 없는 거점"} / ${record.sourceLabel || presentation.sourceLabel}`;
        description.textContent = record.description || presentation.description;
        amount.textContent = `-${formatNumber(record.amount)} 가치`;
        location.append(place, description);
        row.append(location, amount);
        list.append(row);
      });
    }
    wrapper.append(header, list);
    return wrapper;
  }

  function createTradeLogGoodsDetail(entry) {
    const wrapper = document.createElement("div");
    wrapper.className = "merchant-path-log-goods";
    const header = document.createElement("header");
    const copy = document.createElement("div");
    const eyebrow = document.createElement("span");
    const title = document.createElement("h5");
    const result = document.createElement("strong");
    const profit = Number(entry.profit) || 0;
    eyebrow.textContent = `${formatNumber(entry.quantity)}개 · ${formatNumber(entry.elapsedDays)}일 · ${formatNumber(entry.distance)} 거리`;
    title.textContent = entry.itemName || "이름 없는 교역품";
    result.className = profit > 0 ? "is-profit" : profit < 0 ? "is-loss" : "is-neutral";
    result.textContent = `${profit > 0 ? "+" : ""}${formatNumber(profit)} 가치 · ${Number(entry.returnRate) > 0 ? "+" : ""}${formatNumber(entry.returnRate)}%`;
    copy.append(eyebrow, title);
    header.append(copy, result);

    const route = document.createElement("section");
    route.className = "merchant-path-log-route";
    route.append(
      createTradeLogValue("구입", entry.purchase, entry.purchaseTotal),
      createTradeLogValue("판매", entry.close, entry.saleTotal)
    );
    const factors = document.createElement("section");
    factors.className = "merchant-path-log-factors";
    factors.append(
      createTradeLogFactorPanel("구입 주요 요인", entry.purchase?.reviewFactors, "buy"),
      createTradeLogFactorPanel("판매 주요 요인", entry.close?.reviewFactors, "sell")
    );
    wrapper.append(header, route, factors);
    return wrapper;
  }

  function createTradeLogValue(action, record, total) {
    const card = document.createElement("article");
    const label = document.createElement("span");
    const location = document.createElement("strong");
    const value = document.createElement("b");
    const bargain = document.createElement("small");
    label.textContent = action;
    location.textContent = `${record?.settlementName || "이름 없는 거점"} / ${record?.facilityType || "상점"}`;
    value.textContent = `${action}/개 ${formatNumber(record?.unitValue)} · 합계 ${formatNumber(total)}`;
    bargain.textContent = bargainRecordLabel(record?.bargainSuccesses, record?.bargainBenefitValue, action);
    card.append(label, location, value, bargain);
    return card;
  }

  function createTradeLogFactorPanel(titleText, factors, direction) {
    const panel = document.createElement("article");
    const title = document.createElement("strong");
    const list = document.createElement("ul");
    title.textContent = titleText;
    const major = normalizeReviewFactors(factors)
      .filter(factor => Math.abs(Number(factor.value) || 0) >= 10)
      .sort((left, right) => Math.abs(Number(right.value)) - Math.abs(Number(left.value)));
    if (!major.length) {
      const empty = document.createElement("li");
      empty.className = "is-neutral";
      empty.textContent = "10% 이상 작용한 주요 요인이 없습니다.";
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

  function relativeReviewDay(ageDays) {
    const age = Math.max(0, Math.trunc(Number(ageDays) || 0));
    return age === 0 ? "오늘" : `${formatNumber(age)}일 전`;
  }

  function createKnowledgeRow(definition) {
    const knowledge = getKnowledge(definition.id);
    const profile = getDisplayProfile(definition);
    const row = document.createElement("article");
    row.className = "merchant-path-knowledge-row";
    const head = document.createElement("header");
    const identity = document.createElement("div");
    const name = document.createElement("strong");
    const stage = document.createElement("em");
    name.textContent = profile.name;
    stage.textContent = `지식 ${knowledge.level}단계`;
    stage.className = `knowledge-level-${knowledge.level}`;
    identity.append(name);
    head.append(identity, stage);

    const progress = document.createElement("div");
    progress.className = "merchant-path-knowledge-progress";
    const bar = document.createElement("span");
    const nextThreshold = LEVEL_THRESHOLDS[knowledge.level + 1];
    const currentThreshold = LEVEL_THRESHOLDS[knowledge.level] || 0;
    const ratio = nextThreshold == null
      ? 1
      : (knowledge.xp - currentThreshold) / Math.max(1, nextThreshold - currentThreshold);
    bar.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
    progress.append(bar);
    const progressCopy = document.createElement("small");
    progressCopy.textContent = nextThreshold == null
      ? `경험 ${formatNumber(knowledge.xp)} · 최고 단계`
      : `경험 ${formatNumber(knowledge.xp)} / ${formatNumber(nextThreshold)}`;
    const memoButton = document.createElement("button");
    const memoCount = getNoteSlots(definition.id).filter(Boolean).length;
    memoButton.type = "button";
    memoButton.className = "merchant-path-note-toggle";
    memoButton.textContent = memoCount ? `메모 ${memoCount}/3` : "메모";
    memoButton.setAttribute("aria-expanded", String(selectedMemoItemId === definition.id));
    memoButton.addEventListener("click", () => {
      selectedMemoItemId = selectedMemoItemId === definition.id ? "" : definition.id;
      renderArticleFive();
    });
    row.append(head, progress, progressCopy, memoButton);
    if (selectedMemoItemId === definition.id) row.append(createNotebookEditor(definition));
    return row;
  }

  function createNotebookEditor(definition) {
    const panel = document.createElement("section");
    panel.className = "merchant-path-note-editor";
    const notebook = getItemNotebook(definition.id);
    const outletSection = document.createElement("div");
    outletSection.className = "merchant-path-outlet-history";
    const outletTitle = document.createElement("strong");
    outletTitle.textContent = "취급 이력";
    const outletHelp = document.createElement("small");
    outletHelp.textContent = "회색 취급 확인 · 노란색 생산지 표시 · 취소선 수입처 제외";
    outletSection.append(outletTitle, outletHelp);
    if (notebook.outlets.length) {
      const outletList = document.createElement("div");
      outletList.className = "merchant-path-outlet-badges";
      notebook.outlets.forEach(outlet => {
        const badge = document.createElement("button");
        badge.type = "button";
        badge.className = `merchant-path-outlet-badge is-${outlet.state}`;
        badge.textContent = outlet.settlementName;
        badge.title = `${outletStateLabel(outlet.state)} · 최근 구매 ${outlet.year}년 ${outlet.month}월 ${outlet.day}일 · ${outlet.facilityType}`;
        badge.addEventListener("click", () => cycleOutletState(definition.id, outlet.key));
        outletList.append(badge);
      });
      outletSection.append(outletList);
    } else outletSection.append(createEmpty("아직 직접 구매해 확인한 취급처가 없습니다."));

    const memoSection = document.createElement("div");
    memoSection.className = "merchant-path-note-fields";
    const memoTitle = document.createElement("strong");
    memoTitle.textContent = "상품 메모 · 최대 3개";
    memoSection.append(memoTitle);
    getNoteSlots(definition.id).forEach((note, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const count = document.createElement("small");
      input.type = "text";
      input.maxLength = 40;
      input.value = note;
      input.placeholder = `${index + 1}번째 메모`;
      input.setAttribute("aria-label", `${displayName(definition)} ${index + 1}번째 메모`);
      count.textContent = `${note.length}/40`;
      input.addEventListener("input", () => {
        const value = input.value.slice(0, 40);
        setItemNote(definition.id, index, value);
        count.textContent = `${value.length}/40`;
      });
      label.append(input, count);
      memoSection.append(label);
    });

    const historySection = document.createElement("div");
    historySection.className = "merchant-path-trade-history";
    const historyTitle = document.createElement("strong");
    historyTitle.textContent = "완료한 교역 · 최근 6건";
    const history = notebook.journeys;
    historySection.append(historyTitle);
    if (history.length) {
      const list = document.createElement("div");
      list.className = "merchant-path-journey-list";
      history.forEach(record => list.append(createJourneyCard(record)));
      historySection.append(list);
    } else historySection.append(createEmpty("아직 구입과 판매를 모두 마친 교역이 없습니다."));
    panel.append(outletSection, memoSection, historySection);
    return panel;
  }

  function createJourneyCard(record) {
    const card = document.createElement("article");
    card.className = "merchant-path-journey-card";
    const head = document.createElement("header");
    const quantity = document.createElement("strong");
    const result = document.createElement("b");
    const returnRate = journeyReturnRate(record);
    quantity.className = "trade-journey-quantity";
    quantity.textContent = `${formatNumber(record.quantity)}개 거래`;
    result.className = `trade-journey-result ${returnRate > 0 ? "is-profit" : "is-loss"}`;
    result.textContent = `${returnRate > 0 ? "+" : ""}${formatNumber(returnRate)}%`;
    head.append(quantity, result);
    appendReviewBadge(head, record.review);
    const route = document.createElement("div");
    const divider = document.createElement("span");
    const meta = document.createElement("p");
    route.className = "merchant-path-journey-route";
    divider.className = "trade-journey-divider";
    divider.setAttribute("aria-hidden", "true");
    route.append(createJourneyStop("구입", record.purchase), divider, createJourneyStop("판매", record.close));
    meta.className = "merchant-path-journey-meta";
    meta.textContent = `${journeyElapsedDays(record)}일 · ${formatNumber(record.distance)} 거리`;
    card.append(head, route, meta);
    return card;
  }

  function createJourneyStop(action, record) {
    const stop = document.createElement("div");
    stop.className = `merchant-path-journey-stop ${action === "구입" ? "is-purchase" : "is-sale"}`;
    const actionLabel = document.createElement("small");
    const city = document.createElement("strong");
    const detail = document.createElement("span");
    const bargain = document.createElement("em");
    actionLabel.className = "trade-journey-stop-kind";
    actionLabel.textContent = `${action} · ${relativeDayLabel(record?.contractDay)}`;
    city.className = "trade-journey-stop-city is-trade-highlight";
    city.textContent = `${record?.settlementName || "이름 없는 거점"} / ${record?.facilityName || record?.facilityType || "상점"}`;
    city.title = city.textContent;
    const value = document.createElement("b");
    detail.className = "trade-journey-stop-value";
    value.className = "is-trade-highlight";
    value.textContent = `${action}/개 ${formatNumber(record?.unitValue)}`;
    detail.append(value);
    bargain.className = "trade-journey-stop-bargain";
    bargain.textContent = bargainRecordLabel(record?.bargainSuccesses, record?.bargainBenefitValue, action);
    stop.append(actionLabel, bargain, city, detail);
    return stop;
  }

  function appendReviewBadge(container, review) {
    if (!review?.completed) return;
    const badge = document.createElement("span");
    badge.className = `trade-review-record-badge is-${review.outcome === "positive" ? "positive" : "negative"}`;
    badge.textContent = review.outcome === "positive" ? "◆ 복기 · 이익" : "◆ 복기 · 손실";
    container.append(badge);
  }

  function showKnowledgeGuide() {
    if (!elements.infoTooltip || !elements.info || selectedArticle !== 5) return;
    showGuideAt("지식 단계별 해금 정보", [
      ["0단계", "이름_3 · 카테고리 · 칸수 · 무게"],
      ["1단계 · 경험 10", "열화 내구도"],
      ["2단계 · 경험 20", "이름_2"],
      ["3단계 · 경험 40", "희귀등급"],
      ["4단계 · 경험 80", "이름_1 · 상품설명 · 도시 총재고"],
      ["5단계 · 경험 160", "품질 등급 · 품질 수치"],
      ["6단계 · 경험 320", "원산지 · 특산물·명산품 · 거리 보정"],
      ["7단계 · 경험 640", "서로 다른 지식 상품 1종당 흥정 성공률 +4% · 최대 3종"]
    ], elements.info);
  }

  function showArticleFourGuide(section, anchor) {
    const title = section === 1 ? "상업조합 공헌도 단계" : "상회 이용 단계별 보너스";
    const unlocks = section === 1
      ? [
          ["1단계 → 2단계 · 500점", "정보 수집 최대 1회"],
          ["2단계 → 3단계 · 2,500점", "정보 수집 최대 2회"],
          ["3단계 → 4단계 · 12,500점", "정보 수집 최대 3회"],
          ["4단계 → 5단계 · 62,500점", "정보 수집 최대 4회"],
          ["5단계", "정보 수집 최대 5회"]
        ]
      : COMPANY_STAGES.map(stage => [
        `${stage.name} · ${formatNumber(stage.minimum)}점`,
        stage.benefit
      ]);
    showGuideAt(title, unlocks, anchor);
  }

  function showGuideAt(guideTitle, unlocks, anchor) {
    if (!elements.infoTooltip || !anchor) return;
    const title = document.createElement("strong");
    title.textContent = guideTitle;
    const list = document.createElement("ol");
    unlocks.forEach(([level, information]) => {
      const item = document.createElement("li");
      const levelLabel = document.createElement("span");
      const informationLabel = document.createElement("b");
      levelLabel.textContent = level;
      informationLabel.textContent = information;
      item.append(levelLabel, informationLabel);
      list.append(item);
    });
    elements.infoTooltip.replaceChildren(title, list);
    elements.infoTooltip.hidden = false;
    const buttonRect = anchor.getBoundingClientRect();
    const tooltipRect = elements.infoTooltip.getBoundingClientRect();
    const margin = 12;
    let left = buttonRect.right + 10;
    let top = buttonRect.top;
    if (left + tooltipRect.width > window.innerWidth - margin) left = buttonRect.left - tooltipRect.width - 10;
    if (top + tooltipRect.height > window.innerHeight - margin) top = window.innerHeight - tooltipRect.height - margin;
    elements.infoTooltip.style.left = `${Math.max(margin, left)}px`;
    elements.infoTooltip.style.top = `${Math.max(margin, top)}px`;
  }

  function hideKnowledgeGuide() {
    if (elements.infoTooltip) elements.infoTooltip.hidden = true;
  }

  function loadPeddlerDefinitions() {
    if (peddlerLoadPromise) return peddlerLoadPromise;
    peddlerLoadPromise = window.ProjectWData.loadCsv(PEDDLER_CSV_URL)
      .then(rows => {
        peddlerDefinitions = rows.map(row => {
          const category = String(row["분류"] || "").trim();
          return {
            id: String(row.ID || "").trim(),
            name: String(row["이름"] || "").trim(),
            grade: String(row["등급"] || "").trim(),
            cost: Math.max(1, Math.trunc(Number(row["행상포인트"]) || 1)),
            article: Math.trunc(Number.parseInt(category, 10) || 0),
            prerequisite: String(row["선행요구"] || "").trim(),
            effect: PEDDLER_EFFECT_OVERRIDES.get(String(row.ID || "").trim()) || String(row["효과설명"] || "").trim(),
            developer: String(row["개발자용 설명"] || "").trim()
          };
        }).filter(definition => definition.id && definition.effect && definition.article >= 1 && definition.article <= 3);
        return peddlerDefinitions;
      })
      .catch(error => {
        console.error(error);
        peddlerDefinitions = [];
        notify("Peddler 시트의 행상 능력을 불러오지 못했습니다.");
        return peddlerDefinitions;
      });
    return peddlerLoadPromise;
  }

  function renderPeddlerArticle(articleId) {
    const profile = getPeddlerProfile();
    const wrapper = document.createElement("div");
    wrapper.className = "merchant-path-peddler";
    const overview = document.createElement("header");
    overview.className = "merchant-path-peddler-overview";
    const level = document.createElement("div");
    level.innerHTML = `<span>상인 레벨</span><strong>${profile.level}</strong>`;
    const progress = document.createElement("div");
    progress.className = "merchant-path-peddler-progress";
    const progressBar = document.createElement("span");
    const maximumLevel = profile.level >= PEDDLER_MAX_LEVEL;
    progressBar.style.width = maximumLevel
      ? "100%"
      : `${Math.min(100, Math.round((profile.xp / Math.max(1, profile.requirement)) * 100))}%`;
    progress.innerHTML = maximumLevel
      ? "<small>상인 경험치</small><b>최대 레벨</b>"
      : `<small>상인 경험치</small><b>${formatNumber(profile.xp)} / ${formatNumber(profile.requirement)}</b>`;
    progress.append(progressBar);
    const points = document.createElement("div");
    points.innerHTML = `<span>행상포인트</span><strong>${profile.points}</strong>`;
    overview.append(level, progress, points);
    wrapper.append(overview);

    if (articleId === 2) {
      const rules = document.createElement("p");
      rules.className = "merchant-path-bargain-rules";
      rules.textContent = "흥정 성공 시 다음 성공 확률 -8%p · 상품 지식 보정은 서로 다른 상품 최대 3종 · 달변가 완성 시 상품가 기준 양보 한도 상한 10%";
      wrapper.append(rules);
    }

    const available = peddlerDefinitions.filter(definition => definition.article === articleId);
    if (!available.length) {
      wrapper.append(createEmpty("Peddler 시트에 이 조항의 능력이 아직 등록되지 않았습니다."));
      elements.content.replaceChildren(wrapper);
      return;
    }
    const acquired = new Set(profile.skills);
    const list = document.createElement("div");
    list.className = "merchant-path-peddler-skills";
    available.forEach(definition => {
      const card = document.createElement("article");
      card.className = "merchant-path-peddler-skill";
      const copy = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = definition.name
        ? `${definition.name}${definition.grade ? ` ${definition.grade}` : ""}`
        : definition.effect;
      const effect = document.createElement("p");
      effect.textContent = definition.name ? definition.effect : `등급 ${definition.grade || "I"}`;
      copy.append(title, effect);
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.peddlerSkill = definition.id;
      const predecessorMet = !definition.prerequisite || definition.prerequisite.toLowerCase() === "none" || acquired.has(definition.prerequisite);
      const owned = acquired.has(definition.id);
      button.disabled = owned || profile.points < definition.cost || !predecessorMet;
      button.textContent = owned ? "습득 완료" : `${definition.cost} 포인트`;
      button.title = !predecessorMet ? "앞 단계의 능력을 먼저 습득해야 합니다." : "";
      card.classList.toggle("is-acquired", owned);
      card.append(copy, button);
      list.append(card);
    });
    wrapper.append(list);
    elements.content.replaceChildren(wrapper);
  }

  function acquirePeddlerSkill(skillId) {
    const definition = peddlerDefinitions.find(entry => entry.id === String(skillId || ""));
    if (!definition) return false;
    const profile = getPeddlerProfile();
    const skills = new Set(profile.skills);
    const predecessorMet = !definition.prerequisite || definition.prerequisite.toLowerCase() === "none" || skills.has(definition.prerequisite);
    if (skills.has(definition.id) || profile.points < definition.cost || !predecessorMet) return false;
    state.peddler.points -= definition.cost;
    state.peddler.skills.push(definition.id);
    persistState();
    render();
    window.dispatchEvent(new CustomEvent("projectw:peddlerchange", { detail: getPeddlerProfile() }));
    return true;
  }

  function peddlerRequirement(level) {
    const normalizedLevel = Math.min(PEDDLER_MAX_LEVEL, Math.max(1, Math.trunc(Number(level) || 1)));
    if (normalizedLevel >= PEDDLER_MAX_LEVEL) return 0;
    let requirement = PEDDLER_FIRST_REQUIREMENT;
    for (let current = 1; current < normalizedLevel; current += 1) {
      requirement = current === 1
        ? PEDDLER_SECOND_REQUIREMENT
        : Math.max(requirement + 1, Math.floor(requirement * PEDDLER_REQUIREMENT_GROWTH));
    }
    return requirement;
  }

  function getPeddlerProfile() {
    const source = state.peddler || {};
    const level = Math.min(PEDDLER_MAX_LEVEL, Math.max(1, Math.trunc(Number(source.level) || 1)));
    return {
      level,
      xp: level >= PEDDLER_MAX_LEVEL ? 0 : Math.max(0, Math.trunc(Number(source.xp) || 0)),
      requirement: peddlerRequirement(level),
      points: Math.max(0, Math.trunc(Number(source.points) || 0)),
      skills: [...new Set((Array.isArray(source.skills) ? source.skills : []).map(String).filter(Boolean))]
    };
  }

  function recordMerchantProfit(amount) {
    let gained = Math.max(0, Math.floor(Number(amount) || 0));
    if (!gained) return { gained: 0, ...getPeddlerProfile() };
    state.peddler = getPeddlerProfile();
    if (state.peddler.level >= PEDDLER_MAX_LEVEL) return { gained: 0, ...state.peddler };
    state.peddler.xp += gained;
    let levels = 0;
    while (state.peddler.level < PEDDLER_MAX_LEVEL
      && state.peddler.xp >= peddlerRequirement(state.peddler.level)) {
      state.peddler.xp -= peddlerRequirement(state.peddler.level);
      state.peddler.level += 1;
      state.peddler.points += 1;
      levels += 1;
    }
    if (state.peddler.level >= PEDDLER_MAX_LEVEL) state.peddler.xp = 0;
    delete state.peddler.requirement;
    persistState();
    refresh();
    window.dispatchEvent(new CustomEvent("projectw:peddlerchange", { detail: { gained, levels, ...getPeddlerProfile() } }));
    return { gained, levels, ...getPeddlerProfile() };
  }

  function grantPeddlerLevels(amount) {
    const requested = Math.max(0, Math.trunc(Number(amount) || 0));
    state.peddler = getPeddlerProfile();
    const levels = Math.min(requested, PEDDLER_MAX_LEVEL - state.peddler.level);
    if (!levels) return { gained: 0, ...getPeddlerProfile() };
    state.peddler.level += levels;
    state.peddler.points += levels;
    if (state.peddler.level >= PEDDLER_MAX_LEVEL) state.peddler.xp = 0;
    delete state.peddler.requirement;
    persistState();
    refresh();
    const profile = getPeddlerProfile();
    window.dispatchEvent(new CustomEvent("projectw:peddlerchange", { detail: { gained: levels, levels, ...profile } }));
    return { gained: levels, levels, ...profile };
  }

  function grantPeddlerPoints(amount) {
    const gained = Math.max(0, Math.trunc(Number(amount) || 0));
    if (!gained) return { gained: 0, ...getPeddlerProfile() };
    state.peddler = getPeddlerProfile();
    state.peddler.points += gained;
    delete state.peddler.requirement;
    persistState();
    refresh();
    const profile = getPeddlerProfile();
    window.dispatchEvent(new CustomEvent("projectw:peddlerchange", { detail: { gainedPoints: gained, ...profile } }));
    return { gained, ...profile };
  }

  function getBargainingBonuses() {
    const acquired = new Set(getPeddlerProfile().skills);
    return peddlerDefinitions.filter(definition => acquired.has(definition.id)).reduce((bonuses, definition) => {
      const effect = definition.effect;
      const attempts = effect.match(/흥정\s*시도\s*횟수\s*\+(\d+)/);
      const chance = effect.match(/흥정\s*성공률\s*\+(\d+)%/);
      if (attempts) bonuses.attempts += Number(attempts[1]);
      if (chance) bonuses.chance += Number(chance[1]);
      bonuses.valueCap += BARGAIN_VALUE_CAP_SKILLS.get(definition.id) || 0;
      return bonuses;
    }, { attempts: 0, chance: 0, valueCap: 6 });
  }

  function getInformationBonuses() {
    const acquired = new Set(getPeddlerProfile().skills);
    const attempts = Object.fromEntries([...INFORMATION_ATTEMPT_SKILLS].map(([facility, skillId]) => [
      facility,
      acquired.has(skillId) ? 1 : 0
    ]));
    const successChance = INFORMATION_SUCCESS_SKILLS.reduce((sum, skillId) => sum + (acquired.has(skillId) ? .05 : 0), 0);
    const misinformationReduction = INFORMATION_INTUITION_SKILLS.find(([skillId]) => acquired.has(skillId))?.[1] || 0;
    const sourceLevel = INFORMATION_SOURCE_SKILLS.reduce((level, skillId, index) => acquired.has(skillId) ? index + 1 : level, 0);
    return { attempts, successChance, misinformationReduction, sourceLevel };
  }

  function getDeteriorationProtectionChances() {
    const acquired = new Set(getPeddlerProfile().skills);
    const chances = {};
    DETERIORATION_SKILL_GROUPS.forEach(group => {
      const chance = acquired.has(group.second) ? .5 : acquired.has(group.first) ? .25 : 0;
      group.categories.forEach(category => { chances[category] = chance; });
    });
    return chances;
  }

  function createArticlePlaceholder(articleId) {
    const block = document.createElement("div");
    block.className = "merchant-path-placeholder";
    const number = document.createElement("strong");
    const copy = document.createElement("p");
    number.textContent = `${articleId}조`;
    copy.textContent = "세부 항목은 아직 기록되어 있지 않습니다.";
    block.append(number, copy);
    return block;
  }

  function createEmpty(message) {
    const empty = document.createElement("p");
    empty.className = "merchant-path-empty";
    empty.textContent = message;
    return empty;
  }

  function recordCompanyTrade({ name, paidValue } = {}) {
    const companyName = String(name || "").trim();
    const earnedScore = Math.floor(Math.max(0, Number(paidValue) || 0) * .01);
    if (!COMPANY_NAMES.includes(companyName) || earnedScore <= 0) {
      return { earnedScore: 0, profile: getCompanyProfile(companyName) };
    }
    const previous = state.companyUsage[companyName] || { label: companyName, score: 0 };
    state.companyUsage[companyName] = {
      label: companyName,
      score: Math.max(0, Number(previous.score) || 0) + earnedScore
    };
    persistState();
    if (selectedArticle === 4 && elements.modal && !elements.modal.hidden) renderArticleFour();
    return { earnedScore, profile: getCompanyProfile(companyName) };
  }

  function getCompanyProfile(name) {
    const companyName = String(name || "").trim();
    const score = Math.max(0, Number(state.companyUsage[companyName]?.score) || 0);
    let stageIndex = 0;
    COMPANY_STAGES.forEach((stage, index) => {
      if (score >= stage.minimum) stageIndex = index;
    });
    const stage = COMPANY_STAGES[stageIndex];
    const nextStage = COMPANY_STAGES[stageIndex + 1] || null;
    return {
      companyName,
      score,
      stageIndex,
      stageName: stage.name,
      benefit: stage.benefit,
      merchantSellRange: [...stage.merchantSellRange],
      playerSellRange: [...stage.playerSellRange],
      informationBonus: stage.informationBonus,
      nextMinimum: nextStage?.minimum ?? null
    };
  }

  function recordTrade(transactions = [], context = {}) {
    if (!Array.isArray(transactions) || !transactions.length) return;
    const tradeBatchId = `TRADE_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const tradeContext = { ...context, tradeBatchId };
    const allDefinitions = window.ProjectWCargo.getItemDefinitions();
    const eligible = knowledgeDefinitions(allDefinitions);
    const definitionsById = new Map(eligible.map(definition => [definition.id, definition]));
    const groupedTransactions = new Map();
    transactions.forEach(transaction => {
      const itemId = String(transaction.itemId || "");
      const direction = String(transaction.direction || "");
      if (!definitionsById.has(itemId) || !["buy", "sell"].includes(direction)) return;
      const quantity = Math.max(1, Math.trunc(Number(transaction.quantity) || 1));
      const unitValue = Math.max(0, Number(transaction.unitValue) || 0);
      const key = `${direction}:${itemId}`;
      const previous = groupedTransactions.get(key) || { direction, itemId, quantity: 0, totalValue: 0 };
      previous.quantity += quantity;
      previous.totalValue += unitValue * quantity;
      groupedTransactions.set(key, previous);
      if (direction === "buy") recordPurchasedJourney(itemId, { ...transaction, quantity, unitValue }, tradeContext);
      else recordSoldJourney(itemId, { ...transaction, quantity, unitValue }, tradeContext);
    });
    let recorded = 0;
    groupedTransactions.forEach(transaction => {
      const definition = definitionsById.get(String(transaction.itemId || ""));
      if (!definition) return;
      const quantity = Math.max(1, Math.trunc(Number(transaction.quantity) || 1));
      const baseValue = Math.max(0, Number(definition.baseValue) || 0);
      const actualValue = Math.max(0, Number(transaction.totalValue) || 0) / quantity;
      const favorablePercent = baseValue > 0
        ? transaction.direction === "sell"
          ? ((actualValue - baseValue) / baseValue) * 100
          : ((baseValue - actualValue) / baseValue) * 100
        : 0;
      const directPerItem = Math.min(10, Math.max(1, 1 + Math.floor(Math.max(0, favorablePercent) / 10)));
      addXp(definition.id, directPerItem * quantity);
      eligible
        .filter(candidate => candidate.category === definition.category && candidate.id !== definition.id)
        .forEach(candidate => addXp(candidate.id, quantity));
      recorded += quantity;
    });
    if (!recorded) return;
    persistState();
    if (elements.modal && !elements.modal.hidden) render();
    window.dispatchEvent(new CustomEvent("projectw:knowledgechange", { detail: { transactions: recorded } }));
  }

  function addXp(itemId, amount, countTrade = true) {
    const record = state.knowledge[itemId] || { xp: 0, trades: 0 };
    record.xp = Math.max(0, Number(record.xp) || 0) + Math.max(0, Number(amount) || 0);
    record.trades = Math.max(0, Math.trunc(Number(record.trades) || 0)) + (countTrade ? 1 : 0);
    state.knowledge[itemId] = record;
  }

  function createJourneyId(itemId = "") {
    const random = Math.random().toString(36).slice(2, 8);
    return `JOURNEY_${String(itemId || "ITEM")}_${Date.now()}_${random}`;
  }

  function recordPurchasedJourney(itemId, transaction, context = {}) {
    const key = String(itemId || "").trim();
    if (!key) return;
    const notebook = ensureNotebook(key);
    const contractDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const date = contractCalendarDate(contractDay);
    const journeyId = String(transaction.journeyId || createJourneyId(key));
    const purchase = {
      batchId: String(context.tradeBatchId || "").trim(),
      contractDay,
      year: date.year,
      month: date.month,
      day: date.day,
      settlementId: String(context.settlementId || "").trim(),
      settlementName: String(context.settlementName || "이름 없는 거점").trim() || "이름 없는 거점",
      settlementCategory: String(context.settlementCategory || "").trim(),
      facilityType: normalizeFacilityType(context.facilityType),
      facilityName: tradeFacilityName(context.facilityType, context.companyName),
      unitValue: Math.max(0, Number(transaction.unitValue) || 0),
      bargainSuccesses: Math.max(0, Math.trunc(Number(transaction.bargainSuccesses) || 0)),
      bargainBenefitValue: Math.max(0, Number(transaction.bargainBenefitValue) || 0),
      durability: Number.isFinite(Number(transaction.durability)) ? Number(transaction.durability) : null,
      reviewFactors: normalizeReviewFactors(transaction.reviewFactors)
    };
    notebook.journeys.unshift({
      id: journeyId,
      itemId: key,
      quantity: Math.max(1, Math.trunc(Number(transaction.quantity) || 1)),
      status: "pending",
      distance: 0,
      purchase,
      close: null,
      review: { completed: false, outcome: "", completedDay: 0 }
    });
    if (purchase.settlementCategory !== "관문") upsertOutlet(notebook, purchase);
    trimJourneys(notebook);
  }

  function recordSoldJourney(itemId, transaction, context = {}) {
    const key = String(itemId || "").trim();
    if (!key) return;
    const notebook = ensureNotebook(key);
    const contractDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const date = contractCalendarDate(contractDay);
    const close = {
      type: "sold",
      batchId: String(context.tradeBatchId || "").trim(),
      contractDay,
      year: date.year,
      month: date.month,
      day: date.day,
      settlementId: String(context.settlementId || "").trim(),
      settlementName: String(context.settlementName || "이름 없는 거점").trim() || "이름 없는 거점",
      facilityType: normalizeFacilityType(context.facilityType),
      facilityName: tradeFacilityName(context.facilityType, context.companyName),
      unitValue: Math.max(0, Number(transaction.unitValue) || 0),
      bargainSuccesses: Math.max(0, Math.trunc(Number(transaction.bargainSuccesses) || 0)),
      bargainBenefitValue: Math.max(0, Number(transaction.bargainBenefitValue) || 0),
      durability: Number.isFinite(Number(transaction.durability)) ? Number(transaction.durability) : null,
      reviewFactors: normalizeReviewFactors(transaction.reviewFactors)
    };
    const lots = normalizeJourneyLotRecords(transaction.journeyLots, transaction.quantity);
    lots.forEach(lot => closeJourneyQuantity(notebook, lot.journeyId, lot.quantity, "sold", close));
    trimJourneys(notebook);
  }

  function recordCargoLoss(itemId, journeyLots = [], reason = "화물 유실") {
    const key = String(itemId || "").trim();
    if (!key) return 0;
    const notebook = ensureNotebook(key);
    const contractDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const date = contractCalendarDate(contractDay);
    const close = {
      type: "lost",
      contractDay,
      year: date.year,
      month: date.month,
      day: date.day,
      reason: String(reason || "화물 유실")
    };
    let lost = 0;
    normalizeJourneyLotRecords(journeyLots).forEach(lot => {
      lost += closeJourneyQuantity(notebook, lot.journeyId, lot.quantity, "lost", close).quantity;
    });
    if (lost > 0) {
      trimJourneys(notebook);
      persistState();
      refresh();
      window.dispatchEvent(new CustomEvent("projectw:notebookchange", { detail: { itemId: key } }));
    }
    return lost;
  }

  function closeJourneyQuantity(notebook, journeyId, requestedQuantity, status, close) {
    const journey = notebook.journeys.find(record => record.id === journeyId && record.status === "pending");
    if (!journey) return { quantity: 0, record: null };
    const quantity = Math.min(Math.max(1, Math.trunc(Number(requestedQuantity) || 1)), Math.max(1, Number(journey.quantity) || 1));
    let closedJourney = journey;
    if (quantity < journey.quantity) {
      journey.quantity -= quantity;
      closedJourney = {
        ...journey,
        id: `${journey.id}_${status}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        quantity
      };
      notebook.journeys.unshift(closedJourney);
    }
    closedJourney.status = status;
    closedJourney.close = { ...close };
    return { quantity, record: closedJourney };
  }

  function advanceTradeJourneyDistance(amount = 1) {
    const distance = Math.max(0, Number(amount) || 0);
    if (!distance || !state.notebooks || typeof state.notebooks !== "object") return;
    let changed = false;
    Object.values(state.notebooks).forEach(notebook => {
      ensureNotebookShape(notebook).journeys.forEach(journey => {
        if (journey.status !== "pending") return;
        journey.distance = Math.max(0, Number(journey.distance) || 0) + distance;
        changed = true;
      });
    });
    if (changed) persistState();
  }

  function setItemNote(itemId, index, value) {
    const key = String(itemId || "").trim();
    const slotIndex = clampInt(index, 0, 2);
    if (!key) return;
    const notebook = ensureNotebook(key);
    notebook.notes[slotIndex] = String(value || "").slice(0, 40);
    persistState();
    window.dispatchEvent(new CustomEvent("projectw:notebookchange", { detail: { itemId: key } }));
  }

  function getNoteSlots(itemId) {
    return [...ensureNotebook(itemId).notes];
  }

  function getItemNotebook(itemId) {
    pruneTradeJourneys();
    const notebook = ensureNotebook(itemId);
    return {
      notes: notebook.notes.filter(Boolean),
      outlets: notebook.outlets.map(outlet => ({ ...outlet })),
      journeys: visibleJourneys(notebook).map(record => ({
        ...record,
        elapsedDays: journeyElapsedDays(record),
        bargainSuccesses: journeyBargainSuccesses(record),
        purchaseAgeDays: relativeAgeDays(record.purchase?.contractDay),
        closeAgeDays: record.close ? relativeAgeDays(record.close.contractDay) : null,
        returnRate: journeyReturnRate(record),
        purchase: { ...record.purchase, reviewFactors: normalizeReviewFactors(record.purchase?.reviewFactors) },
        close: record.close ? { ...record.close, reviewFactors: normalizeReviewFactors(record.close?.reviewFactors) } : null,
        review: normalizeJourneyReview(record.review)
      }))
    };
  }

  function getItemOutletState(itemId, placement) {
    const key = String(itemId || "").trim();
    const source = state.notebooks?.[key];
    if (!key || !source) return null;
    const settlementId = String(typeof placement === "string" ? placement : placement?.id || "").trim();
    const settlementName = String(typeof placement === "object" ? placement?.name || "" : "").trim();
    if (!settlementId && !settlementName) return null;
    const outlet = ensureNotebook(key).outlets.find(record => {
      const outletId = String(record?.settlementId || "").trim();
      if (settlementId && outletId) return outletId === settlementId;
      return settlementName && String(record?.settlementName || "").trim() === settlementName;
    });
    return outlet ? { ...outlet } : null;
  }

  function getSettlementOutletGoods(placement) {
    const settlementId = String(typeof placement === "string" ? placement : placement?.id || "").trim();
    const settlementName = String(typeof placement === "object" ? placement?.name || "" : "").trim();
    if (!settlementId && !settlementName) return [];

    const catalog = knowledgeDefinitions(window.ProjectWCargo?.getItemDefinitions?.() || []);
    if (catalog.length) definitions = catalog;
    const definitionsById = new Map(definitions.map(definition => [String(definition.id), definition]));
    return Object.keys(state.notebooks || {}).flatMap(itemId => {
      const definition = definitionsById.get(itemId);
      if (!definition) return [];
      const matchingOutlets = ensureNotebook(itemId).outlets.filter(outlet => {
        if (outlet.state === "excluded") return false;
        const outletId = String(outlet.settlementId || "").trim();
        const outletName = String(outlet.settlementName || "").trim();
        return (settlementId && outletId === settlementId)
          || (settlementName && outletName === settlementName);
      });
      if (!matchingOutlets.length) return [];
      const production = matchingOutlets.some(outlet => outlet.state === "production");
      return [{
        itemId,
        name: getDisplayProfile(definition).name,
        state: production ? "production" : "observed",
        stateLabel: production ? "생산지로 표시" : "취급 확인",
        facilityTypes: [...new Set(matchingOutlets.map(outlet => outlet.facilityType).filter(Boolean))]
      }];
    }).sort((left, right) => left.name.localeCompare(right.name, "ko") || left.itemId.localeCompare(right.itemId));
  }

  function getPendingTradeReviews() {
    pruneTradeJourneys();
    const reviewDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const definitionsById = new Map((window.ProjectWCargo?.getItemDefinitions?.() || []).map(definition => [String(definition.id), definition]));
    const entries = [];
    Object.entries(state.notebooks || {}).forEach(([itemId, source]) => {
      const notebook = ensureNotebookShape(source);
      notebook.journeys.forEach(record => {
        if (!isTradeReviewEligible(record, reviewDay)) return;
        const definition = definitionsById.get(String(itemId));
        const profile = definition ? getDisplayProfile(definition) : null;
        const quantity = Math.max(1, Math.trunc(Number(record.quantity) || 1));
        const purchaseTotal = Math.max(0, Number(record.purchase?.unitValue) || 0) * quantity;
        const saleTotal = Math.max(0, Number(record.close?.unitValue) || 0) * quantity;
        entries.push({
          id: record.id,
          itemId: String(itemId),
          itemName: profile?.name || definition?.displayName || definition?.name1 || itemId,
          quantity,
          purchaseTotal,
          saleTotal,
          profit: saleTotal - purchaseTotal,
          returnRate: journeyReturnRate(record),
          distance: Math.max(0, Number(record.distance) || 0),
          elapsedDays: journeyElapsedDays(record),
          saleDay: Math.max(1, Math.trunc(Number(record.close.contractDay) || 1)),
          purchase: { ...record.purchase, reviewFactors: normalizeReviewFactors(record.purchase?.reviewFactors) },
          close: { ...record.close, reviewFactors: normalizeReviewFactors(record.close?.reviewFactors) }
        });
      });
    });
    const tradeEntries = entries.sort((left, right) => left.saleDay - right.saleDay);
    const expenseRecords = normalizeReviewExpenses(state.reviewExpenses);
    const expenseEntries = [...REVIEW_EXPENSE_TYPES].map(type => createExpenseReviewEntry(
      type,
      expenseRecords.filter(record => record.type === type),
      reviewDay
    ));
    return [...expenseEntries, ...tradeEntries];
  }

  function companionSnapshot() {
    const profile = getCompanionProfile() || {};
    const mood = Math.min(100, Math.max(0, Number(profile.mood) || 0));
    const moodLabel = String(profile.moodLabel || (mood <= 24 ? "화남" : mood <= 49 ? "불만" : mood <= 74 ? "통상" : "좋은 상태"));
    return {
      rank: Math.max(1, Math.trunc(Number(profile.rank) || 1)),
      mood,
      moodLabel
    };
  }

  function recordDailySnapshot(details = {}, shouldPersist = true) {
    const worldTime = getWorldTime() || {};
    const day = Math.max(1, Math.trunc(Number(details.contractDay ?? worldTime.day) || 1));
    const companion = companionSnapshot();
    const season = String(details.season || getCurrentSeason() || "").trim();
    state.journeyJournal = normalizeJourneyJournal(state.journeyJournal);
    let record = state.journeyJournal.find(entry => entry.day === day);
    if (!record) {
      record = { day, companionRank: companion.rank, mood: companion.mood, moodLabel: companion.moodLabel, moodHistory: [companion.moodLabel], seasons: [], specialWeather: [], movements: [] };
      state.journeyJournal.push(record);
    }
    record.companionRank = Math.max(1, Math.trunc(Number(details.companionRank ?? companion.rank) || 1));
    record.mood = Math.min(100, Math.max(0, Number(details.mood ?? companion.mood) || 0));
    record.moodLabel = String(details.moodLabel || companion.moodLabel || "통상");
    record.moodHistory = collapseAdjacentText(record.moodHistory);
    if (record.moodHistory.at(-1) !== record.moodLabel) record.moodHistory.push(record.moodLabel);
    if (season && !record.seasons.includes(season)) record.seasons.push(season);
    const currentDay = Math.max(day, Math.trunc(Number(worldTime.day) || day));
    state.journeyJournal = state.journeyJournal
      .filter(entry => entry.day >= Math.max(1, currentDay - (TRADE_REVIEW_HISTORY_DAYS - 1)) && entry.day <= currentDay)
      .sort((left, right) => right.day - left.day);
    if (shouldPersist) persistState();
    return state.journeyJournal.find(entry => entry.day === day) || record;
  }

  function recordJourneyMoment(details = {}) {
    const record = recordDailySnapshot(details, false);
    const method = String(details.method || "짐마차").trim() === "정기선" ? "정기선" : "짐마차";
    const movement = normalizeJourneyMovement({
      method,
      fromId: details.fromId,
      fromName: details.fromName,
      fromSettlement: details.fromSettlement,
      toId: details.toId,
      toName: details.toName,
      toSettlement: details.toSettlement,
      routeName: details.routeName
    });
    if (movement) {
      const last = record.movements.at(-1);
      if (!last || JSON.stringify(last) !== JSON.stringify(movement)) record.movements.push(movement);
    }
    const weather = String(details.weather || "").trim();
    if (TRADE_LOG_SPECIAL_WEATHERS.has(weather)) {
      const encounter = { label: weather, routeName: String(details.routeName || "").trim() };
      if (!record.specialWeather.some(entry => entry.label === encounter.label && entry.routeName === encounter.routeName)) {
        record.specialWeather.push(encounter);
      }
    }
    persistState();
    return true;
  }

  function normalizeJourneyMovement(source) {
    if (!source || typeof source !== "object") return null;
    const fromName = String(source.fromName || "").trim();
    const toName = String(source.toName || "").trim();
    const routeName = String(source.routeName || "").trim();
    if (!fromName && !toName && !routeName) return null;
    return {
      method: String(source.method || "짐마차") === "정기선" ? "정기선" : "짐마차",
      fromId: String(source.fromId || ""),
      fromName,
      fromSettlement: Boolean(source.fromSettlement),
      toId: String(source.toId || ""),
      toName,
      toSettlement: Boolean(source.toSettlement),
      routeName
    };
  }

  function normalizeJourneyJournal(source) {
    return (Array.isArray(source) ? source : []).map(entry => {
      if (!entry || typeof entry !== "object") return null;
      return {
        day: Math.max(1, Math.trunc(Number(entry.day) || 1)),
        companionRank: Math.max(1, Math.trunc(Number(entry.companionRank) || 1)),
        mood: Math.min(100, Math.max(0, Number(entry.mood) || 0)),
        moodLabel: String(entry.moodLabel || "통상"),
        moodHistory: collapseAdjacentText(Array.isArray(entry.moodHistory) && entry.moodHistory.length ? entry.moodHistory : [entry.moodLabel || "통상"]),
        seasons: uniqueText(entry.seasons),
        specialWeather: (Array.isArray(entry.specialWeather) ? entry.specialWeather : []).map(weather => ({
          label: String(weather?.label || "").trim(),
          routeName: String(weather?.routeName || "").trim()
        })).filter(weather => TRADE_LOG_SPECIAL_WEATHERS.has(weather.label)),
        movements: (Array.isArray(entry.movements) ? entry.movements : []).map(normalizeJourneyMovement).filter(Boolean)
      };
    }).filter(Boolean);
  }

  function recordReviewExpense(type, details = {}) {
    const normalizedType = String(type || "").trim();
    const amount = Math.max(0, Number(details.amount) || 0);
    if (!REVIEW_EXPENSE_TYPES.has(normalizedType) || amount <= 0) return false;
    const worldTime = getWorldTime() || {};
    const record = normalizeReviewExpense({
      id: `expense_${normalizedType}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type: normalizedType,
      amount,
      settlementId: details.settlementId,
      settlementName: details.settlementName,
      sourceLabel: details.sourceLabel,
      description: details.description,
      mealItems: details.mealItems,
      contractDay: details.contractDay ?? worldTime.day,
      phaseIndex: details.phaseIndex ?? worldTime.phaseIndex,
      completedAt: details.completedAt || new Date().toISOString()
    });
    if (!record) return false;
    recordDailySnapshot({ contractDay: record.contractDay }, false);
    state.reviewExpenses = normalizeReviewExpenses(state.reviewExpenses);
    state.reviewExpenses.push(record);
    persistState();
    return true;
  }

  function createExpenseReviewEntry(type, records, reviewDay) {
    const presentation = reviewExpensePresentation(type);
    const details = [...records]
      .sort((left, right) => left.contractDay - right.contractDay || left.phaseIndex - right.phaseIndex)
      .map(record => ({
        ...record,
        ageDays: Math.max(0, reviewDay - record.contractDay)
      }));
    const total = details.reduce((sum, record) => sum + record.amount, 0);
    const firstDay = details.length ? Math.min(...details.map(record => record.contractDay)) : reviewDay;
    const lastDay = details.length ? Math.max(...details.map(record => record.contractDay)) : reviewDay;
    return {
      id: `expense:${type}`,
      kind: "expense",
      expenseType: type,
      itemName: presentation.itemName,
      summaryLabel: presentation.summaryLabel,
      quantity: details.length,
      total,
      profit: -total,
      saleDay: lastDay,
      elapsedDays: Math.max(0, lastDay - firstDay),
      details
    };
  }

  function normalizeReviewExpense(source) {
    if (!source || typeof source !== "object") return null;
    const type = String(source.type || "").trim();
    const amount = Math.max(0, Number(source.amount) || 0);
    if (!REVIEW_EXPENSE_TYPES.has(type) || amount <= 0) return null;
    return {
      id: String(source.id || `expense_${type}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`),
      type,
      amount,
      settlementId: String(source.settlementId || ""),
      settlementName: String(source.settlementName || "이름 없는 거점"),
      sourceLabel: String(source.sourceLabel || reviewExpensePresentation(type).sourceLabel),
      description: String(source.description || ""),
      mealItems: (Array.isArray(source.mealItems) ? source.mealItems : []).map(item => ({
        name: String(item?.name || "").trim(),
        type: String(item?.type || "").trim(),
        quantity: Math.max(1, Math.trunc(Number(item?.quantity) || 1)),
        value: Math.max(0, Number(item?.value) || 0)
      })).filter(item => item.name),
      contractDay: Math.max(1, Math.trunc(Number(source.contractDay) || 1)),
      phaseIndex: Math.max(0, Math.trunc(Number(source.phaseIndex) || 0)),
      completedAt: String(source.completedAt || "")
    };
  }

  function normalizeReviewExpenses(source) {
    return (Array.isArray(source) ? source : []).map(normalizeReviewExpense).filter(Boolean);
  }

  function reviewExpensePresentation(type) {
    if (type === "tax") return {
      itemName: "지불한 관세",
      summaryLabel: "관세",
      sourceLabel: "입장 관세소",
      description: "입장 관세",
      emptyMessage: "이날 복기할 관세 지출이 없습니다."
    };
    if (type === "ferry") return {
      itemName: "이용한 정기선",
      summaryLabel: "정기선",
      sourceLabel: "정기선",
      description: "정기선 운임",
      emptyMessage: "이날 복기할 정기선 이용 기록이 없습니다."
    };
    return {
      itemName: "지불한 식비",
      summaryLabel: "식비",
      sourceLabel: "식사",
      description: "식비",
      emptyMessage: "이날 복기할 식비 지출이 없습니다."
    };
  }

  function getTradeReviewHistory() {
    const currentDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const minimumDay = Math.max(1, currentDay - (TRADE_REVIEW_HISTORY_DAYS - 1));
    const normalized = normalizeTradeReviewHistory(state.reviewHistory)
      .filter(record => record.day >= minimumDay && record.day <= currentDay)
      .sort((left, right) => right.day - left.day || String(right.completedAt).localeCompare(String(left.completedAt)));
    if (normalized.length !== (Array.isArray(state.reviewHistory) ? state.reviewHistory.length : 0)) {
      state.reviewHistory = normalized;
      persistState();
    }
    return normalized.map(record => ({
      ...cloneReviewValue(record),
      ageDays: Math.max(0, currentDay - record.day)
    }));
  }

  function archiveTradeReview(entries, completedDay) {
    const day = Math.max(1, Math.trunc(Number(completedDay) || 1));
    const incoming = (Array.isArray(entries) ? entries : []).map(cloneReviewValue).filter(Boolean);
    const history = normalizeTradeReviewHistory(state.reviewHistory);
    let record = history.find(entry => entry.day === day);
    if (!record) {
      record = { id: `trade_review_${day}`, day, completedAt: new Date().toISOString(), entries: [] };
      history.push(record);
    }
    const existingExpenses = new Map(record.entries
      .filter(entry => entry.kind === "expense")
      .map(entry => [entry.expenseType, entry]));
    const incomingExpenses = new Map(incoming
      .filter(entry => entry.kind === "expense")
      .map(entry => [entry.expenseType, entry]));
    const expenseEntries = [...REVIEW_EXPENSE_TYPES].map(type => {
      const details = [
        ...(Array.isArray(existingExpenses.get(type)?.details) ? existingExpenses.get(type).details : []),
        ...(Array.isArray(incomingExpenses.get(type)?.details) ? incomingExpenses.get(type).details : [])
      ];
      const uniqueDetails = [...new Map(details.map(detail => [String(detail.id || `${detail.contractDay}:${detail.phaseIndex}:${detail.amount}:${detail.settlementId}`), detail])).values()];
      return createExpenseReviewEntry(type, uniqueDetails, day);
    });
    const tradeEntries = [...record.entries, ...incoming]
      .filter(entry => entry.kind !== "expense")
      .filter((entry, index, list) => list.findIndex(candidate => String(candidate.id) === String(entry.id)) === index)
      .sort((left, right) => Number(left.saleDay) - Number(right.saleDay));
    record.completedAt = new Date().toISOString();
    record.entries = [...expenseEntries, ...tradeEntries].map(cloneReviewValue);
    const minimumDay = Math.max(1, day - (TRADE_REVIEW_HISTORY_DAYS - 1));
    state.reviewHistory = history
      .filter(entry => entry.day >= minimumDay && entry.day <= day)
      .sort((left, right) => right.day - left.day);
    return true;
  }

  function normalizeTradeReviewHistory(source) {
    return (Array.isArray(source) ? source : []).map(record => {
      if (!record || typeof record !== "object") return null;
      const day = Math.max(1, Math.trunc(Number(record.day) || 1));
      const entries = (Array.isArray(record.entries) ? record.entries : [])
        .filter(entry => entry && typeof entry === "object")
        .map(cloneReviewValue);
      return {
        id: String(record.id || `trade_review_${day}`),
        day,
        completedAt: String(record.completedAt || ""),
        entries
      };
    }).filter(Boolean);
  }

  function cloneReviewValue(value) {
    if (value == null) return value;
    return JSON.parse(JSON.stringify(value));
  }

  function isTradeReviewEligible(record, reviewDay) {
    if (record?.status !== "sold" || !record.close || normalizeJourneyReview(record.review).completed) return false;
    const saleDay = Math.max(1, Math.trunc(Number(record.close.contractDay) || 1));
    return saleDay <= Math.max(1, Math.trunc(Number(reviewDay) || 1));
  }

  function completeTradeReviews(journeyIds = []) {
    const requested = new Set((Array.isArray(journeyIds) ? journeyIds : []).map(value => String(value || "")).filter(Boolean));
    if (!requested.size) return { reviewed: 0, knowledgeGained: 0, expenseGroupsReviewed: 0, expenseRecordsCleared: 0 };
    const currentDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    const pendingEntries = getPendingTradeReviews().filter(entry => requested.has(String(entry.id)));
    const historyRecorded = archiveTradeReview(pendingEntries, currentDay);
    let reviewed = 0;
    Object.entries(state.notebooks || {}).forEach(([itemId, source]) => {
      const notebook = ensureNotebookShape(source);
      notebook.journeys.forEach(record => {
        if (!requested.has(String(record.id)) || record.status !== "sold" || !record.close) return;
        const review = normalizeJourneyReview(record.review);
        if (review.completed) return;
        const outcome = journeyReturnRate(record) > 0 ? "positive" : "negative";
        record.review = { completed: true, outcome, completedDay: currentDay };
        addXp(itemId, 1, false);
        reviewed += 1;
      });
      trimJourneys(notebook);
    });
    const reviewedExpenseTypes = new Set([...REVIEW_EXPENSE_TYPES]
      .filter(type => requested.has(`expense:${type}`)));
    const previousExpenseCount = normalizeReviewExpenses(state.reviewExpenses).length;
    state.reviewExpenses = normalizeReviewExpenses(state.reviewExpenses)
      .filter(record => !reviewedExpenseTypes.has(record.type));
    const expenseRecordsCleared = previousExpenseCount - state.reviewExpenses.length;
    if (reviewed > 0 || expenseRecordsCleared > 0 || historyRecorded) {
      persistState();
      if (reviewed > 0) {
        refresh();
        window.dispatchEvent(new CustomEvent("projectw:knowledgechange", { detail: { tradeReviews: reviewed } }));
        window.dispatchEvent(new CustomEvent("projectw:notebookchange", { detail: { tradeReviews: reviewed } }));
      }
    }
    return {
      reviewed,
      knowledgeGained: reviewed,
      expenseGroupsReviewed: reviewedExpenseTypes.size,
      expenseRecordsCleared,
      historyRecorded
    };
  }

  function ensureNotebook(itemId) {
    const key = String(itemId || "").trim();
    if (!state.notebooks || typeof state.notebooks !== "object") state.notebooks = {};
    const source = state.notebooks[key] || {};
    const notes = Array.from({ length: 3 }, (_, index) => String(source.notes?.[index] || "").slice(0, 40));
    const outlets = Array.isArray(source.outlets) ? source.outlets.map(normalizeOutlet).filter(Boolean) : [];
    const journeys = Array.isArray(source.journeys) ? source.journeys.map(record => normalizeJourney(record, key)).filter(Boolean) : [];
    if (!outlets.length && Array.isArray(source.history)) {
      source.history.filter(record => record?.direction === "buy").forEach(record => {
        const outlet = normalizeOutlet({
          settlementName: record.settlementName,
          facilityType: record.facilityType,
          year: record.year,
          month: record.month,
          day: record.day,
          state: "observed"
        });
        if (outlet && !outlets.some(entry => entry.key === outlet.key)) outlets.push(outlet);
      });
    }
    state.notebooks[key] = { notes, outlets, journeys };
    return state.notebooks[key];
  }

  function ensureNotebookShape(notebook) {
    if (!notebook || typeof notebook !== "object") return { notes: [], outlets: [], journeys: [] };
    if (!Array.isArray(notebook.notes)) notebook.notes = [];
    if (!Array.isArray(notebook.outlets)) notebook.outlets = [];
    if (!Array.isArray(notebook.journeys)) notebook.journeys = [];
    return notebook;
  }

  function pruneTradeJourneys() {
    if (!state.notebooks || typeof state.notebooks !== "object") return;
    let changed = false;
    Object.values(state.notebooks).forEach(notebook => {
      const previousLength = Array.isArray(notebook?.journeys) ? notebook.journeys.length : 0;
      trimJourneys(ensureNotebookShape(notebook));
      if (notebook.journeys.length !== previousLength) changed = true;
    });
    if (changed) persistState();
  }

  function trimJourneys(notebook) {
    const shaped = ensureNotebookShape(notebook);
    mergeCompatibleSoldJourneys(shaped);
    const pending = shaped.journeys.filter(record => record.status === "pending");
    const unreviewedSold = shaped.journeys.filter(record => record.status === "sold" && !normalizeJourneyReview(record.review).completed);
    const completed = shaped.journeys
      .filter(record => record.status === "sold" && !unreviewedSold.includes(record))
      .sort((left, right) => journeySortDay(right) - journeySortDay(left))
      .slice(0, MAX_COMPLETED_JOURNEYS);
    shaped.journeys = [...pending, ...unreviewedSold, ...completed];
  }

  function mergeCompatibleSoldJourneys(notebook) {
    const merged = [];
    const groups = new Map();
    notebook.journeys.forEach(record => {
      if (record.status !== "sold" || !record.close) {
        merged.push(record);
        return;
      }
      const key = soldJourneyMergeKey(record);
      const existing = groups.get(key);
      if (!existing) {
        groups.set(key, record);
        merged.push(record);
        return;
      }
      mergeSoldJourneyRecord(existing, record);
    });
    notebook.journeys = merged;
  }

  function soldJourneyMergeKey(record) {
    const purchase = record.purchase || {};
    const close = record.close || {};
    const purchaseKey = purchase.batchId
      ? `batch:${purchase.batchId}`
      : [purchase.contractDay, purchase.settlementId, purchase.settlementName, purchase.facilityType, purchase.facilityName, Number(purchase.unitValue) || 0, Number(purchase.bargainSuccesses) || 0].join("|");
    const closeKey = close.batchId
      ? `batch:${close.batchId}`
      : [close.contractDay, close.settlementId, close.settlementName, close.facilityType, close.facilityName, Number(close.unitValue) || 0, Number(close.bargainSuccesses) || 0].join("|");
    return `${purchaseKey}=>${closeKey}`;
  }

  function mergeSoldJourneyRecord(target, incoming) {
    const targetQuantity = Math.max(1, Math.trunc(Number(target.quantity) || 1));
    const incomingQuantity = Math.max(1, Math.trunc(Number(incoming.quantity) || 1));
    const totalQuantity = targetQuantity + incomingQuantity;
    target.purchase.unitValue = weightedJourneyNumber(target.purchase?.unitValue, targetQuantity, incoming.purchase?.unitValue, incomingQuantity);
    target.purchase.bargainBenefitValue = weightedJourneyNumber(target.purchase?.bargainBenefitValue, targetQuantity, incoming.purchase?.bargainBenefitValue, incomingQuantity);
    target.purchase.durability = weightedJourneyNumber(target.purchase?.durability, targetQuantity, incoming.purchase?.durability, incomingQuantity, true);
    target.purchase.reviewFactors = mergeJourneyReviewFactors(target.purchase?.reviewFactors, targetQuantity, incoming.purchase?.reviewFactors, incomingQuantity);
    target.close.unitValue = weightedJourneyNumber(target.close?.unitValue, targetQuantity, incoming.close?.unitValue, incomingQuantity);
    target.close.bargainBenefitValue = weightedJourneyNumber(target.close?.bargainBenefitValue, targetQuantity, incoming.close?.bargainBenefitValue, incomingQuantity);
    target.close.durability = weightedJourneyNumber(target.close?.durability, targetQuantity, incoming.close?.durability, incomingQuantity, true);
    target.close.reviewFactors = mergeJourneyReviewFactors(target.close?.reviewFactors, targetQuantity, incoming.close?.reviewFactors, incomingQuantity);
    target.distance = weightedJourneyNumber(target.distance, targetQuantity, incoming.distance, incomingQuantity);
    target.quantity = totalQuantity;
    const targetReview = normalizeJourneyReview(target.review);
    const incomingReview = normalizeJourneyReview(incoming.review);
    const completed = targetReview.completed && incomingReview.completed;
    target.review = {
      completed,
      outcome: completed && journeyReturnRate(target) > 0 ? "positive" : completed ? "negative" : "",
      completedDay: completed ? Math.max(targetReview.completedDay, incomingReview.completedDay) : 0
    };
  }

  function weightedJourneyNumber(left, leftQuantity, right, rightQuantity, nullable = false) {
    const leftNumber = Number(left);
    const rightNumber = Number(right);
    if (nullable && !Number.isFinite(leftNumber) && !Number.isFinite(rightNumber)) return null;
    if (nullable && !Number.isFinite(leftNumber)) return rightNumber;
    if (nullable && !Number.isFinite(rightNumber)) return leftNumber;
    return (((Number.isFinite(leftNumber) ? leftNumber : 0) * leftQuantity)
      + ((Number.isFinite(rightNumber) ? rightNumber : 0) * rightQuantity)) / Math.max(1, leftQuantity + rightQuantity);
  }

  function mergeJourneyReviewFactors(left, leftQuantity, right, rightQuantity) {
    const values = new Map();
    normalizeReviewFactors(left).forEach(entry => values.set(entry.label, { left: entry.value, right: 0 }));
    normalizeReviewFactors(right).forEach(entry => {
      const current = values.get(entry.label) || { left: 0, right: 0 };
      current.right = entry.value;
      values.set(entry.label, current);
    });
    return [...values].map(([label, entry]) => ({
      label,
      value: ((entry.left * leftQuantity) + (entry.right * rightQuantity)) / Math.max(1, leftQuantity + rightQuantity)
    })).filter(entry => Math.abs(entry.value) > .0001);
  }

  function visibleJourneys(notebook) {
    return ensureNotebookShape(notebook).journeys
      .filter(record => record.status === "sold" && record.close)
      .sort((left, right) => journeySortDay(right) - journeySortDay(left))
      .slice(0, MAX_COMPLETED_JOURNEYS);
  }

  function journeySortDay(record) {
    return Math.max(0, Number(record?.close?.contractDay) || Number(record?.purchase?.contractDay) || 0);
  }

  function normalizeJourney(record, itemId) {
    if (!record || typeof record !== "object" || !record.purchase) return null;
    const status = ["pending", "sold", "lost"].includes(record.status) ? record.status : "pending";
    return {
      id: String(record.id || createJourneyId(itemId)),
      itemId: String(record.itemId || itemId),
      quantity: Math.max(1, Math.trunc(Number(record.quantity) || 1)),
      status,
      distance: Math.max(0, Number(record.distance) || 0),
      purchase: { ...record.purchase, reviewFactors: normalizeReviewFactors(record.purchase?.reviewFactors) },
      close: status === "pending" || !record.close ? null : { ...record.close, reviewFactors: normalizeReviewFactors(record.close?.reviewFactors) },
      review: normalizeJourneyReview(record.review)
    };
  }

  function normalizeReviewFactors(value) {
    return (Array.isArray(value) ? value : []).map(entry => ({
      label: String(entry?.label || "").trim(),
      value: Number(entry?.value) || 0
    })).filter(entry => entry.label && Math.abs(entry.value) > .0001);
  }

  function normalizeJourneyReview(value) {
    const completed = Boolean(value?.completed);
    return {
      completed,
      outcome: completed && value?.outcome === "positive" ? "positive" : completed ? "negative" : "",
      completedDay: completed ? Math.max(1, Math.trunc(Number(value?.completedDay) || 1)) : 0
    };
  }

  function normalizeJourneyLotRecords(lots, fallbackQuantity = 0) {
    const normalized = (Array.isArray(lots) ? lots : []).map(lot => ({
      journeyId: String(lot?.journeyId || lot?.id || "").trim(),
      quantity: Math.max(0, Math.trunc(Number(lot?.quantity) || 0))
    })).filter(lot => lot.journeyId && lot.quantity > 0);
    if (!normalized.length && fallbackQuantity > 0) return [];
    return normalized;
  }

  function normalizeOutlet(outlet) {
    if (!outlet || typeof outlet !== "object") return null;
    const settlementId = String(outlet.settlementId || "").trim();
    const settlementName = String(outlet.settlementName || "").trim();
    if (!settlementId && !settlementName) return null;
    const settlementCategory = String(outlet.settlementCategory || "").trim();
    const facilityType = normalizeFacilityType(outlet.facilityType);
    // 이전 저장에는 거점 분류가 없으므로, 관문에서만 운영되는 좌판 기록도 함께 정리한다.
    if (settlementCategory === "관문" || (!settlementCategory && facilityType === "좌판")) return null;
    const stateName = OUTLET_STATES.includes(outlet.state) ? outlet.state : "observed";
    return {
      key: String(outlet.key || settlementId || settlementName).trim(),
      settlementId,
      settlementName: settlementName || settlementId,
      settlementCategory,
      facilityType,
      state: stateName,
      year: Math.max(1, Math.trunc(Number(outlet.year) || CONTRACT_START_DATE.year)),
      month: Math.max(1, Math.min(12, Math.trunc(Number(outlet.month) || 1))),
      day: Math.max(1, Math.min(31, Math.trunc(Number(outlet.day) || 1)))
    };
  }

  function upsertOutlet(notebook, purchase) {
    if (String(purchase?.settlementCategory || "").trim() === "관문") return;
    const key = String(purchase.settlementId || purchase.settlementName || "").trim();
    if (!key) return;
    const existing = notebook.outlets.find(outlet => outlet.key === key);
    if (existing) {
      existing.settlementName = purchase.settlementName;
      existing.facilityType = purchase.facilityType;
      existing.year = purchase.year;
      existing.month = purchase.month;
      existing.day = purchase.day;
      return;
    }
    const normalized = normalizeOutlet({ key, ...purchase, state: "observed" });
    if (normalized) notebook.outlets.push(normalized);
  }

  function cycleOutletState(itemId, outletKey) {
    const notebook = ensureNotebook(itemId);
    const outlet = notebook.outlets.find(entry => entry.key === outletKey);
    if (!outlet) return;
    const currentIndex = Math.max(0, OUTLET_STATES.indexOf(outlet.state));
    outlet.state = OUTLET_STATES[(currentIndex + 1) % OUTLET_STATES.length];
    persistState();
    renderArticleFive();
    window.dispatchEvent(new CustomEvent("projectw:notebookchange", { detail: { itemId } }));
  }

  function outletStateLabel(stateName) {
    return stateName === "production" ? "생산지로 표시" : stateName === "excluded" ? "생산지가 아닌 것으로 표시" : "취급 확인";
  }

  function countExcludedOutlets(category) {
    return definitions.filter(definition => definition.category === category).reduce((count, definition) => (
      count + ensureNotebook(definition.id).outlets.filter(outlet => outlet.state === "excluded").length
    ), 0);
  }

  function confirmExcludedOutletCleanup() {
    const count = countExcludedOutlets(selectedCategory);
    if (!count || !elements.modal) return;
    elements.modal.querySelector(".merchant-path-confirm-layer")?.remove();
    const layer = document.createElement("div");
    layer.className = "merchant-path-confirm-layer";
    const dialog = document.createElement("section");
    dialog.className = "merchant-path-confirm-dialog";
    dialog.setAttribute("role", "alertdialog");
    dialog.setAttribute("aria-modal", "true");
    const title = document.createElement("strong");
    const copy = document.createElement("p");
    const actions = document.createElement("div");
    const cancel = document.createElement("button");
    const confirm = document.createElement("button");
    title.textContent = "취소선 기록 정리";
    copy.textContent = "취소선을 친 취급처 기록을 삭제합니다. 정말 삭제하시겠습니까?";
    cancel.type = confirm.type = "button";
    cancel.textContent = "취소";
    confirm.textContent = `확인 · ${count}개 삭제`;
    confirm.className = "is-confirm";
    cancel.addEventListener("click", () => layer.remove());
    confirm.addEventListener("click", () => {
      definitions.filter(definition => definition.category === selectedCategory).forEach(definition => {
        const notebook = ensureNotebook(definition.id);
        notebook.outlets = notebook.outlets.filter(outlet => outlet.state !== "excluded");
      });
      persistState();
      layer.remove();
      renderArticleFive();
      window.dispatchEvent(new CustomEvent("projectw:notebookchange", { detail: { category: selectedCategory } }));
    });
    actions.append(cancel, confirm);
    dialog.append(title, copy, actions);
    layer.append(dialog);
    elements.modal.append(layer);
    confirm.focus();
  }

  function contractCalendarDate(contractDay) {
    const date = new Date(Date.UTC(CONTRACT_START_DATE.year, CONTRACT_START_DATE.month - 1, CONTRACT_START_DATE.day));
    date.setUTCDate(date.getUTCDate() + Math.max(0, Math.trunc(Number(contractDay) || 1) - 1));
    return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
  }

  function normalizeFacilityType(value) {
    const facility = String(value || "").trim();
    if (facility.includes("상회")) return "상회";
    return ["교역소", "시장", "좌판"].includes(facility) ? facility : "상점";
  }

  function tradeFacilityName(facilityType, companyName = "") {
    const facility = normalizeFacilityType(facilityType);
    const company = String(companyName || "").trim();
    return facility === "상회" && company ? company : facility;
  }

  function relativeAgeDays(contractDay) {
    const currentDay = Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1));
    return Math.max(0, currentDay - Math.max(1, Math.trunc(Number(contractDay) || currentDay)));
  }

  function relativeDayLabel(contractDay) {
    const age = relativeAgeDays(contractDay);
    return age === 0 ? "오늘" : `${formatNumber(age)}일 전`;
  }

  function bargainRecordLabel(value, benefitValue = 0, action = "") {
    const successes = Math.max(0, Math.trunc(Number(value) || 0));
    const benefit = Math.max(0, Number(benefitValue) || 0);
    if (successes <= 0) return "흥정 없음";
    if (benefit <= 0) return `흥정 ${formatNumber(successes)}회 성공 · 양보 미사용`;
    return `흥정 ${formatNumber(successes)}회 성공 · ${action === "구입" ? "절약" : "추가"} ${formatNumber(benefit)} 가치/개`;
  }

  function journeyElapsedDays(record) {
    const currentDay = record.status === "pending"
      ? Math.max(1, Math.trunc(Number(getWorldTime()?.day) || 1))
      : Math.max(1, Math.trunc(Number(record.close?.contractDay) || 1));
    return Math.max(0, currentDay - Math.max(1, Math.trunc(Number(record.purchase?.contractDay) || currentDay)));
  }

  function journeyBargainSuccesses(record) {
    return Math.max(0, Math.trunc(Number(record.purchase?.bargainSuccesses) || 0))
      + Math.max(0, Math.trunc(Number(record.close?.bargainSuccesses) || 0));
  }

  function prepareNotebookTutorial() {
    selectedArticle = 5;
    if (!definitions.length) definitions = knowledgeDefinitions(window.ProjectWCargo?.getItemDefinitions?.() || []);
    const preferred = definitions.find(definition => {
      const notebook = ensureNotebook(definition.id);
      return notebook.notes.some(Boolean) || notebook.outlets.length || notebook.journeys.length;
    }) || definitions[0];
    if (preferred) {
      selectedCategory = preferred.category;
      selectedMemoItemId = preferred.id;
    }
    if (elements.modal && !elements.modal.hidden) {
      render();
      requestAnimationFrame(() => elements.content?.querySelector(".merchant-path-note-editor")?.scrollIntoView({ block: "nearest" }));
    }
    return Boolean(preferred);
  }

  function journeyReturnRate(record) {
    const purchaseValue = Math.max(0, Number(record.purchase?.unitValue) || 0);
    const saleValue = Math.max(0, Number(record.close?.unitValue) || 0);
    return purchaseValue > 0 ? ((saleValue - purchaseValue) / purchaseValue) * 100 : 0;
  }

  function getDisplayProfile(definition, metadata = {}) {
    const excluded = isExcludedCategory(definition?.category);
    const level = excluded ? 7 : getLevel(definition?.id);
    const quality = String(metadata.quality || "통상품질");
    return {
      level,
      name: level >= 4
        ? String(definition?.name1 || definition?.name2 || definition?.name3 || definition?.displayName || definition?.id || "상품")
        : level >= 2
          ? String(definition?.name2 || definition?.name3 || definition?.displayName || definition?.id || "상품")
          : String(definition?.name3 || definition?.displayName || definition?.id || "상품"),
      showRarity: level >= 3,
      showDurability: level >= 1,
      showDescription: level >= 4,
      showCityStock: !excluded && level >= 4,
      showQuality: !excluded && level >= 5,
      showOrigin: !excluded && level >= 6,
      showOriginProduct: !excluded && level >= 6,
      showDistance: !excluded && level >= 6,
      showQualityNumber: !excluded && level >= 5,
      showBargainChanceBonus: !excluded && level >= 7,
      qualityText: excluded ? "" : level >= 5
        ? qualityWithNumber(quality, metadata.qualityRoll, metadata.qualityValueDirection)
        : quality
    };
  }

  function qualityWithNumber(quality, qualityRoll, direction = "playerSell") {
    const ranges = direction === "merchantSell" ? QUALITY_PURCHASE_RANGES : QUALITY_SALE_RANGES;
    const range = ranges[quality] || ranges.통상품질;
    const roll = Math.max(0, Math.min(1, Number.isFinite(Number(qualityRoll)) ? Number(qualityRoll) : .5));
    const value = range[0] + ((range[1] - range[0]) * roll);
    return `${quality} ${value >= 0 ? "+" : ""}${formatNumber(value)}`;
  }

  function getKnowledge(itemId) {
    const xp = getXp(itemId);
    return { xp, level: levelFromXp(xp) };
  }

  function getXp(itemId) {
    return Math.max(0, Number(state.knowledge[String(itemId || "")]?.xp) || 0);
  }

  function getLevel(itemId) {
    return levelFromXp(getXp(itemId));
  }

  function levelFromXp(xp) {
    let level = 0;
    LEVEL_THRESHOLDS.forEach((threshold, index) => {
      if (xp >= threshold) level = index;
    });
    return Math.min(7, level);
  }

  function knowledgeDefinitions(source) {
    return (source || []).filter(definition => definition?.id && !isExcludedCategory(definition.category));
  }

  function categories() {
    return [...new Set(definitions.map(definition => definition.category).filter(Boolean))]
      .sort((left, right) => left.localeCompare(right, "ko"));
  }

  function displayName(definition) {
    return getDisplayProfile(definition).name;
  }

  function isExcludedCategory(category) {
    return EXCLUDED_CATEGORIES.has(String(category || "").replaceAll(" ", ""));
  }

  function createDefaultState() {
    return { schemaVersion: 8, knowledge: {}, companyUsage: {}, notebooks: {}, reviewExpenses: [], reviewHistory: [], journeyJournal: [], peddler: { level: 1, xp: 0, points: 0, skills: [] } };
  }

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return createDefaultState();
      const parsed = JSON.parse(stored);
      if (![1, 2, 3, 4, 5, 6, 7, 8].includes(parsed?.schemaVersion) || typeof parsed.knowledge !== "object" || typeof parsed.companyUsage !== "object") return createDefaultState();
      return {
        schemaVersion: 8,
        knowledge: parsed.knowledge,
        companyUsage: parsed.companyUsage,
        notebooks: typeof parsed.notebooks === "object" && parsed.notebooks ? parsed.notebooks : {},
        reviewExpenses: normalizeReviewExpenses(parsed.reviewExpenses),
        reviewHistory: normalizeTradeReviewHistory(parsed.reviewHistory),
        journeyJournal: normalizeJourneyJournal(parsed.journeyJournal),
        peddler: {
          level: Math.max(1, Math.trunc(Number(parsed.peddler?.level) || 1)),
          xp: Math.max(0, Math.trunc(Number(parsed.peddler?.xp) || 0)),
          points: Math.max(0, Math.trunc(Number(parsed.peddler?.points) || 0)),
          skills: [...new Set((Array.isArray(parsed.peddler?.skills) ? parsed.peddler.skills : []).map(String).filter(Boolean))]
        }
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
      notify("행상인의 길 진행도를 저장하지 못했습니다.");
    }
  }

  function clampInt(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, Math.trunc(Number(value) || minimum)));
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(Number(value) || 0);
  }

  window.ProjectWMerchantPath = {
    init,
    open,
    openItemMemo,
    close,
    refresh,
    getResumeState,
    restoreResumeState,
    loadPeddlerDefinitions,
    reset,
    recordTrade,
    createJourneyId,
    recordCargoLoss,
    advanceTradeJourneyDistance,
    recordCompanyTrade,
    recordMerchantProfit,
    grantPeddlerLevels,
    grantPeddlerPoints,
    getPeddlerProfile,
    getBargainingBonuses,
    getInformationBonuses,
    getDeteriorationProtectionChances,
    getItemNotebook,
    getItemOutletState,
    getSettlementOutletGoods,
    recordReviewExpense,
    recordDailySnapshot,
    recordJourneyMoment,
    getPendingTradeReviews,
    getTradeReviewHistory,
    completeTradeReviews,
    prepareNotebookTutorial,
    getCompanyProfile,
    getKnowledge,
    getLevel,
    getDisplayProfile,
    isExcludedCategory
  };
}());
