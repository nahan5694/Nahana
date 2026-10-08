(function exposeMemorial() {
  const CATEGORIES = ["메인대화", "상식주입", "대화카드", "이벤트", "발자취", "주점 음식", "시장 간식"];
  const FOOD_DATA_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1425391005&single=true&output=csv";
  const FOOTPRINTS = Object.freeze([
    { id: "FOOTPRINT_001", title: "나하나가 화나다", description: "참고 참던 나하나의 기분이 끝내 바닥을 드러냈습니다.", developerDescription: "나하나 기분이 25 이하가 되었을 때 해금." },
    { id: "FOOTPRINT_002", title: "나하나가 단맛에 질리다", description: "달콤한 것이라면 한동안 보기만 해도 고개를 저을 듯합니다.", developerDescription: "단맛 패러미터가 0에 도달했을 때 해금." },
    { id: "FOOTPRINT_003", title: "나하나가 단맛을 갈망하다", description: "머릿속이 온통 달콤한 맛으로 가득 찼습니다.", developerDescription: "단맛 패러미터가 100에 도달했을 때 해금." },
    { id: "FOOTPRINT_004", title: "나하나가 짠맛에 질리다", description: "짭짤한 한입조차 당기지 않는 날이 찾아왔습니다.", developerDescription: "짠맛 패러미터가 0에 도달했을 때 해금." },
    { id: "FOOTPRINT_005", title: "나하나가 짠맛을 갈망하다", description: "유난히 짭짤한 음식이 생각나는 모양입니다.", developerDescription: "짠맛 패러미터가 100에 도달했을 때 해금." },
    { id: "FOOTPRINT_006", title: "나하나가 자극적인 맛에 질리다", description: "강한 향과 얼얼한 맛을 잠시 멀리하고 싶어 합니다.", developerDescription: "자극 패러미터가 0에 도달했을 때 해금." },
    { id: "FOOTPRINT_007", title: "나하나가 자극적인 맛을 갈망하다", description: "평범한 맛으로는 성에 차지 않는 날이 찾아왔습니다.", developerDescription: "자극 패러미터가 100에 도달했을 때 해금." },
    { id: "FOOTPRINT_008", title: "나하나가 기름진 음식에 질리다", description: "기름진 음식이 쌓여 속이 잔뜩 무거워졌습니다.", developerDescription: "기름짐 패러미터가 0에 도달했을 때 해금." },
    { id: "FOOTPRINT_009", title: "나하나가 기름진 음식을 갈망하다", description: "든든하고 기름진 한 접시가 간절해졌습니다.", developerDescription: "기름짐 패러미터가 100에 도달했을 때 해금." },
    { id: "FOOTPRINT_010", title: "늑대의 습격에서 벗어나다", description: "사나운 울음소리를 등지고 무사히 길을 이어 갑니다.", developerDescription: "늑대 습격에서 벗어났을 때 해금. 현재 관련 기능 미구현." },
    { id: "FOOTPRINT_011", title: "도적의 위협에서 벗어나다", description: "탐욕스러운 시선을 따돌리고 짐마차를 지켜 냈습니다.", developerDescription: "도적의 위협에서 벗어났을 때 해금. 현재 관련 기능 미구현." },
    { id: "FOOTPRINT_012", title: "용병의 위협에서 벗어나다", description: "무기를 든 자들의 위협 앞에서도 여정을 지켜 냈습니다.", developerDescription: "용병의 위협에서 벗어났을 때 해금. 현재 관련 기능 미구현." },
    { id: "FOOTPRINT_013", title: "3등급 가호를 획득하다", description: "강한 정령의 가호가 두 사람의 여행길에 깃들었습니다.", developerDescription: "3등급 정령의 가호를 획득했을 때 해금." },
    { id: "FOOTPRINT_014", title: "오물오물 햄스터", description: "양손 가득 간식을 안겨 주자 볼이 바쁘게 움직였습니다.", developerDescription: "시장에서 한 번에 서로 다른 간식 3종을 구입했을 때 해금." },
    { id: "FOOTPRINT_015", title: "어깨너머 행상인", description: "함께 나눈 이야기가 어느새 제법 훌륭한 행상의 지식이 되었습니다.", developerDescription: "모든 상식주입 대화를 메모리얼에 수집했을 때 해금." },
    { id: "FOOTPRINT_016", title: "무더운 바람", description: "길 위로 아지랑이가 피어오르는 첫 여름을 맞았습니다.", developerDescription: "처음 여름에 진입했을 때 해금." },
    { id: "FOOTPRINT_017", title: "밟히는 낙엽", description: "바퀴 아래 낙엽이 바스락거리는 첫 가을을 맞았습니다.", developerDescription: "처음 가을에 진입했을 때 해금." },
    { id: "FOOTPRINT_018", title: "어깨 위의 눈꽃", description: "차가운 계절의 눈꽃이 두 사람의 어깨 위에 내려앉았습니다.", developerDescription: "처음 겨울에 진입했을 때 해금." },
    { id: "FOOTPRINT_019", title: "다시, 풀밭의 들꽃", description: "계절을 한 바퀴 건너 다시 피어난 들꽃과 만났습니다.", developerDescription: "시작 계절인 봄을 제외하고, 다른 계절을 지난 뒤 다시 봄에 진입했을 때 해금." },
    { id: "FOOTPRINT_020", title: "사라지는 지루함", description: "길 위의 이야기가 무료한 시간을 조금씩 밀어냈습니다.", developerDescription: "대화 카드를 누적 10회 읽었을 때 해금." },
    { id: "FOOTPRINT_021", title: "떠들썩한 짐마차", description: "짐마차 안에는 이제 끊이지 않는 이야기가 가득합니다.", developerDescription: "대화 카드를 누적 30회 읽었을 때 해금." },
    { id: "FOOTPRINT_022", title: "당연해진 옆 자리", description: "수많은 이야기를 나눈 끝에 곁에 있는 일이 자연스러워졌습니다.", developerDescription: "대화 카드를 누적 100회 읽었을 때 해금." },
    { id: "FOOTPRINT_023", title: "절체절명의 위기", description: "반파된 짐마차 앞에서도 두 사람은 여정을 포기하지 않았습니다.", developerDescription: "짐마차 반파 상태를 처음 경험했을 때 해금." },
    { id: "FOOTPRINT_024", title: "분노의 투레질", description: "배고픔을 참지 못한 말이 거칠게 땅을 박찼습니다.", developerDescription: "말 허기가 0에 도달했을 때 해금." },
    { id: "FOOTPRINT_025", title: "북부에 오다", description: "차고 높은 북부의 공기가 새로운 여정을 알립니다.", developerDescription: "북부 지역에 처음 진입했을 때 해금." },
    { id: "FOOTPRINT_026", title: "남부에 오다", description: "따뜻하고 낯선 남부의 바람이 짐마차를 맞이합니다.", developerDescription: "남부 지역에 처음 진입했을 때 해금." },
    { id: "FOOTPRINT_027", title: "첫 눈", description: "여행길 위에서 처음 마주한 눈송이가 오래 기억에 남았습니다.", developerDescription: "눈 또는 폭설 날씨인 지점에 처음 진입했을 때 해금." },
    { id: "FOOTPRINT_028", title: "과유불급", description: "풍성한 식사는 좋았지만, 마지막 한입은 조금 지나쳤습니다.", developerDescription: "처음으로 포만감 200 이상의 과식 식사를 마쳤을 때 해금." }
  ]);
  const FOOTPRINT_BY_ID = new Map(FOOTPRINTS.map(entry => [entry.id, entry]));
  let elements;
  let activeCategory = CATEGORIES[0];
  let catalog = [];
  let foodCatalog = [];
  let loading = false;
  let getUnlockedIds = () => [];
  let getUnlockedFootprintIds = () => [];
  let getConsumedFoodIds = () => [];
  let readDialogue = () => {};
  let notify = () => {};

  function init(options = {}) {
    getUnlockedIds = typeof options.getUnlockedIds === "function" ? options.getUnlockedIds : getUnlockedIds;
    getUnlockedFootprintIds = typeof options.getUnlockedFootprintIds === "function"
      ? options.getUnlockedFootprintIds
      : getUnlockedFootprintIds;
    getConsumedFoodIds = typeof options.getConsumedFoodIds === "function"
      ? options.getConsumedFoodIds
      : getConsumedFoodIds;
    readDialogue = typeof options.readDialogue === "function" ? options.readDialogue : readDialogue;
    notify = typeof options.notify === "function" ? options.notify : notify;
    elements = {
      modal: document.querySelector("#memorial-modal"),
      close: document.querySelector("#memorial-close"),
      tabs: [...document.querySelectorAll("[data-memorial-category]")],
      grid: document.querySelector("#memorial-grid"),
      status: document.querySelector("#memorial-status"),
      count: document.querySelector("#memorial-count")
    };
    if (!elements.modal) return;
    elements.close?.addEventListener("click", close);
    elements.tabs.forEach(button => button.addEventListener("click", () => {
      activeCategory = CATEGORIES.includes(button.dataset.memorialCategory)
        ? button.dataset.memorialCategory
        : CATEGORIES[0];
      render();
    }));
    elements.grid?.addEventListener("click", event => {
      const button = event.target.closest("button[data-dialogue-id]");
      if (!button || button.disabled) return;
      const dialogueId = button.dataset.dialogueId;
      close(false);
      readDialogue(dialogueId, () => open(activeCategory));
    });
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !isOpen()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    });
  }

  async function open(category = activeCategory) {
    if (!elements?.modal) return;
    activeCategory = CATEGORIES.includes(category) ? category : CATEGORIES[0];
    elements.modal.hidden = false;
    window.ProjectWAudio?.playEffect("paper");
    await load();
    if (isOpen()) render();
  }

  function close(playSound = true) {
    if (!isOpen()) return;
    elements.modal.hidden = true;
    if (playSound) window.ProjectWAudio?.playEffect("paper");
  }

  function isOpen() {
    return Boolean(elements?.modal && !elements.modal.hidden);
  }

  function getResumeState() {
    return isOpen() ? { activeCategory } : null;
  }

  async function restoreResumeState(snapshot = {}) {
    await open(snapshot.activeCategory);
    return isOpen();
  }

  async function load() {
    if (loading) return;
    loading = true;
    if (elements.status) elements.status.textContent = "수집한 기록을 정리하고 있습니다.";
    try {
      const [dialogueResult, foodResult] = await Promise.allSettled([
        window.ProjectWDialogue.getDialogueCatalog(),
        window.ProjectWData.loadCsv(FOOD_DATA_URL)
      ]);
      if (dialogueResult.status === "fulfilled") {
        catalog = dialogueResult.value.entries || [];
        if (dialogueResult.value.error) notify("Dialogue CSV를 갱신하지 못해 현재 등록된 대화를 사용합니다.");
      } else {
        console.error(dialogueResult.reason);
        catalog = [];
        notify("메모리얼의 Dialogue 데이터를 불러오지 못했습니다.");
      }
      if (foodResult.status === "fulfilled") foodCatalog = foodResult.value.map(normalizeFoodEntry).filter(Boolean);
      else {
        console.error(foodResult.reason);
        foodCatalog = [];
        notify("메모리얼의 Foods 데이터를 불러오지 못했습니다.");
      }
    } finally {
      loading = false;
    }
  }

  function foodValue(row, header) {
    const key = Object.keys(row || {}).find(candidate => candidate.trim() === header);
    return key ? String(row[key] ?? "").trim() : "";
  }

  function normalizeFoodEntry(row) {
    const id = foodValue(row, "ID");
    const title = foodValue(row, "이름");
    const vendor = foodValue(row, "상세 판매처");
    if (!id || !title || !["주점", "시장"].includes(vendor)) return null;
    return {
      id,
      title,
      vendor,
      type: foodValue(row, "종류"),
      description: foodValue(row, "설명")
    };
  }

  function entriesForCategory(category) {
    if (category === "발자취") return [...FOOTPRINTS];
    if (category === "주점 음식") return foodCatalog.filter(entry => entry.vendor === "주점");
    if (category === "시장 간식") return foodCatalog.filter(entry => entry.vendor === "시장");
    return catalog.filter(entry => entry.category === category);
  }

  function render() {
    if (!elements || loading) return;
    const unlockedDialogue = new Set(getUnlockedIds().map(id => String(id || "").trim()).filter(Boolean));
    const unlockedFootprints = new Set(getUnlockedFootprintIds().map(id => String(id || "").trim()).filter(Boolean));
    const consumedFoods = new Set(getConsumedFoodIds().map(id => String(id || "").trim()).filter(Boolean));
    elements.tabs.forEach(button => {
      const category = button.dataset.memorialCategory;
      const categoryEntries = entriesForCategory(category);
      const unlockedSet = category === "발자취"
        ? unlockedFootprints
        : ["주점 음식", "시장 간식"].includes(category) ? consumedFoods : unlockedDialogue;
      const unlockedCount = categoryEntries.filter(entry => unlockedSet.has(entry.id)).length;
      button.classList.toggle("is-active", category === activeCategory);
      button.setAttribute("aria-pressed", String(category === activeCategory));
      const count = button.querySelector("span");
      if (count) count.textContent = `${unlockedCount} / ${categoryEntries.length}`;
    });

    const footprintCategory = activeCategory === "발자취";
    const foodCategory = ["주점 음식", "시장 간식"].includes(activeCategory);
    const unlockedSet = footprintCategory ? unlockedFootprints : foodCategory ? consumedFoods : unlockedDialogue;
    const entries = entriesForCategory(activeCategory).sort((left, right) => {
      const unlockDifference = Number(unlockedSet.has(right.id)) - Number(unlockedSet.has(left.id));
      return unlockDifference || left.id.localeCompare(right.id, "ko", { numeric: true });
    });
    const unlockedCount = entries.filter(entry => unlockedSet.has(entry.id)).length;
    elements.count.textContent = `${unlockedCount} / ${entries.length} 수집`;
    elements.status.textContent = entries.length
      ? footprintCategory
        ? "여정에서 처음 이룬 발자취가 기록됩니다. 아직 이루지 못한 발자취는 물음표로 남습니다."
        : foodCategory
          ? `${activeCategory}을 직접 맛보면 이름과 설명이 이곳에 기록됩니다.`
        : "수집한 대화는 다시 읽을 수 있습니다. 아직 만나지 못한 대화는 물음표로 남습니다."
      : "이 분류에 등록된 기록이 없습니다.";
    elements.grid.replaceChildren(...entries.map(entry => {
      if (footprintCategory) return createFootprintSlot(entry, unlockedSet.has(entry.id));
      if (foodCategory) return createFoodSlot(entry, unlockedSet.has(entry.id));
      return createDialogueSlot(entry, unlockedSet.has(entry.id));
    }));
  }

  function createFoodSlot(entry, unlocked) {
    const article = document.createElement("article");
    article.className = `memorial-slot is-food ${unlocked ? "is-unlocked" : "is-locked"}`;
    if (!unlocked) {
      appendLockedSlotContent(article, "아직 맛보지 못함");
      return article;
    }
    const label = document.createElement("small");
    label.className = "memorial-food-label";
    label.textContent = entry.type || entry.vendor;
    const title = document.createElement("strong");
    title.textContent = entry.title;
    const description = document.createElement("p");
    description.className = "memorial-food-description";
    description.textContent = entry.description || "함께 맛본 음식입니다.";
    article.append(label, title, description);
    return article;
  }

  function createDialogueSlot(entry, unlocked) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `memorial-slot ${unlocked ? "is-unlocked" : "is-locked"}`;
    button.disabled = !unlocked;
    if (unlocked) {
      button.dataset.dialogueId = entry.id;
      const title = document.createElement("strong");
      title.textContent = entry.title || entry.id;
      const pages = document.createElement("small");
      pages.textContent = `${entry.pageCount}쪽 · 다시 읽기`;
      button.append(title, pages);
    } else appendLockedSlotContent(button, "미수집 대화");
    return button;
  }

  function createFootprintSlot(entry, unlocked) {
    const article = document.createElement("article");
    article.className = `memorial-slot is-footprint ${unlocked ? "is-unlocked" : "is-locked"}`;
    if (!unlocked) {
      appendLockedSlotContent(article, "미해금 발자취");
      return article;
    }
    const label = document.createElement("small");
    label.className = "memorial-footprint-label";
    label.textContent = "발자취 해금";
    const title = document.createElement("strong");
    title.textContent = entry.title;
    const description = document.createElement("p");
    description.className = "memorial-footprint-description";
    description.textContent = entry.description;
    article.append(label, title, description);
    return article;
  }

  function appendLockedSlotContent(slot, labelText) {
    const question = document.createElement("strong");
    question.className = "memorial-slot-question";
    question.textContent = "?";
    const label = document.createElement("small");
    label.textContent = labelText;
    slot.append(question, label);
  }

  function getFootprint(id) {
    return FOOTPRINT_BY_ID.get(String(id || "").trim()) || null;
  }

  window.ProjectWMemorial = { init, open, close, isOpen, refresh: render, getFootprint, getResumeState, restoreResumeState };
}());
