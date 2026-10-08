(function exposeDialogueService() {
  const DIALOGUE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=323763130&single=true&output=csv";
  const fallbackRows = [
    ["DL_001", 1, "나하나", 1, "당신도 참, 상인치고는 속 편하고 순진한 사람이네."],
    ["DL_001", 2, "나하나", 1, "아무리 늑대떼로부터 구해줬다곤 해도 의심도 없이 요술을 부리는 마녀를 자기 짐마차에 태우다니."],
    ["DL_001", 3, "나하나", 4, "아니면 음흉한 속셈이라도 가지고 있는거야?"],
    ["DL_001", 4, "나하나", 3, "농담이야. 당신은 그정도로 약은 것도, 멍청해보이지도 않은 걸. 그냥 착해빠진거겠지."],
    ["DL_001", 5, "나하나", 1, "다시 한 번 소개할게. 나는 [ 나하나 ]. 나그네의 정령이야."],
    ["DL_001", 6, "나하나", 1, "그래, 정령. 사람들이 모여 사는 곳이 많아지고 돌로 지은 높은 건물들, 교회라 불리는 것들이 많아진 이후로는 이름도 힘도 잃어가는 존재지."],
    ["DL_001", 7, "나하나", 5, "요즘은 길 위를 정처없이 떠도는 사람이 별로 없어. 확고한 목적을 가지고 같은 길을 왕복하는 사람들 뿐이거든."],
    ["DL_001", 8, "나하나", 12, "덕분에 나그네의 정령인 나는 잊혀지고... 쓸쓸해서... 조만간 사라질 날만 기다리고 있었어."],
    ["DL_001", 9, "나하나", 1, "그때 나타난 게 당신이야. 내 눈에는 떠돌이의 빛이 번쩍번쩍하게 보여서 멀리서도 아주 잘 보였지."],
    ["DL_001", 10, "나하나", 4, "신나서 달려왔더니 늑대떼한테 쫒기고 있었던 건 상정 외였지만."],
    ["DL_001", 11, "나하나", 7, "덕분에 아까 당신을 구해주느라 그나마 먼지만큼 남아있던 힘을 거의 다 써버렸지 뭐야."],
    ["DL_001", 12, "나하나", 4, "조금은 더 고마워하는 표정 하는게 어때?"],
    ["DL_001", 13, "나하나", 3, "...엄청 어색한 얼굴이네. 다른 사람이랑 대화하는 게 어색해? 아니면 여자랑 대화하는 게 어색한건가?"],
    ["DL_001", 14, "나하나", 4, "이해해 줄게. 대체로 날 처음 본 사내들은 얼굴이 벌게져서 어버버 거리는게 보통이니까. 오히려 당신은 말 더듬지 않는 것 만으로 기특한거지."],
    ["DL_001", 15, "나하나", 1, "아무튼, 나를 함께 데리고 다니면 당신의 행상... 그러니까 여정에 내가 도움을 줄 수 있을거야."],
    ["DL_001", 16, "나하나", 1, "당신은 예쁘고 시끌벅적한 동행자를 얻고, 나는 나대로 즐겁게 시간을 보내는거야. 좋은 거래지? 상인으로서 어떻게 생각해?"],
    ["DL_001", 17, "나하나", 4, "...마음에 들어할 줄 알았어."],
    ["DL_001", 18, "나하나", 1, "좋아, 계약 성립. 이건 나그네의 정령이 떠돌이와 맺는 언약이야."],
    ["DL_001", 19, "나하나", 1, "나는 당신의 여정을 지키고 응원할게."],
    ["DL_001", 20, "나하나", 1, "대신 당신은 나를 잊지 말아줘. 단지 그 뿐인 계약."],
    ["DL_001", 21, "나하나", 4, "...그럼 앞으로 잘 부탁해, {{User}}."]
  ].map(([dialogueId, page, speaker, imageAsset, text]) => ({
    "대화 ID": dialogueId,
    "분류": "메인대화",
    "제목": "첫 만남",
    "페이지": String(page),
    "화자": speaker,
    "이미지 분류": "컷신",
    "이미지 에셋": String(imageAsset),
    "대사": text
  }));

  let dialogueStorePromise;

  function preload() {
    if (!dialogueStorePromise) dialogueStorePromise = buildStore();
    return dialogueStorePromise;
  }

  async function getDialogue(dialogueId, options = {}) {
    const result = await preload();
    const storedPages = result.dialogues.get(dialogueId);
    const requestedCategory = String(options.category || "").trim();
    const preferredCategory = requestedCategory || inferDialogueCategory(dialogueId);
    const preferredPages = storedPages?.filter(page => page.dialogueCategory === preferredCategory) || [];
    const pages = preferredPages.length ? preferredPages : storedPages;
    if (!pages?.length) throw new Error(`대화 ID를 찾을 수 없습니다: ${dialogueId}`);
    return { pages, source: result.source, error: result.error };
  }

  function getDialogueByCategory(dialogueId, category) {
    return getDialogue(dialogueId, { category });
  }

  async function getDialogueIds(prefix = "") {
    const result = await preload();
    const normalizedPrefix = String(prefix || "").trim();
    return [...result.dialogues.keys()]
      .filter(dialogueId => !normalizedPrefix || dialogueId.startsWith(normalizedPrefix))
      .sort((left, right) => left.localeCompare(right, "ko", { numeric: true }));
  }

  async function getDialogueCatalog() {
    const result = await preload();
    const entries = [...result.dialogues.entries()]
      .map(([id, pages]) => {
        const preferredPages = pages.filter(page => page.dialogueCategory === inferDialogueCategory(id));
        const catalogPages = preferredPages.length ? preferredPages : pages;
        const firstPage = catalogPages[0] || {};
        return {
          id,
          category: firstPage.dialogueCategory || inferDialogueCategory(id),
          title: firstPage.dialogueTitle || id,
          pageCount: catalogPages.length
        };
      })
      .sort((left, right) => left.id.localeCompare(right.id, "ko", { numeric: true }));
    return { entries, source: result.source, error: result.error };
  }

  async function buildStore() {
    let rows = fallbackRows;
    let source = "fallback";
    let error = null;

    if (window.location.protocol !== "file:") {
      try {
        rows = await window.ProjectWData.loadCsv(DIALOGUE_CSV_URL);
        source = "csv";
      } catch (loadError) {
        error = loadError;
        console.error(loadError);
      }
    }

    return { dialogues: groupDialogues(rows), source, error };
  }

  function groupDialogues(rows) {
    const dialogues = new Map();
    rows.forEach(row => {
      const dialogueId = String(row["대화 ID"] ?? "").trim();
      const text = String(row["대사"] ?? "").trim();
      if (!dialogueId || !text) return;

      const page = Number.parseInt(row["페이지"], 10);
      const imageReference = normalizeImageReference(row["이미지 분류"] ?? row["이미지분류"], row["이미지 에셋"] ?? row["이미지"]);
      const dialoguePage = {
        dialogueId,
        dialogueCategory: normalizeDialogueCategory(row["분류"], dialogueId),
        dialogueTitle: String(row["이름"] || row["제목"] || row["대화명"] || "").trim() || dialogueId,
        appearanceCondition: String(row["등장조건"] ?? "").trim(),
        page: Number.isFinite(page) ? page : Number.MAX_SAFE_INTEGER,
        speaker: String(row["화자"] ?? "").trim(),
        imageCategory: imageReference.category,
        assetId: imageReference.assetId,
        assetName: imageReference.assetName,
        text
      };
      if (!dialogues.has(dialogueId)) dialogues.set(dialogueId, []);
      dialogues.get(dialogueId).push(dialoguePage);
    });

    dialogues.forEach(pages => pages.sort((left, right) => left.page - right.page));
    return dialogues;
  }

  function normalizeDialogueCategory(value, dialogueId) {
    const category = String(value ?? "").trim();
    if (["정면뷰", "군것질", "상태이상", "대화카드", "카드획득", "터치"].includes(category)) return category;
    if (category.includes("교역품")) return "교역품";
    if (category.includes("식사")) return "식사";
    if (category.includes("상식")) return "상식주입";
    if (category.includes("이벤트")) return "이벤트";
    if (category.includes("메인")) return "메인대화";
    return inferDialogueCategory(dialogueId);
  }

  function inferDialogueCategory(dialogueId) {
    const id = String(dialogueId ?? "").toUpperCase();
    if (id.startsWith("DL_TOUCH_")) return "터치";
    if (id.startsWith("DL_R_")) return "정면뷰";
    if (id.startsWith("DL_M_")) return "군것질";
    if (id.startsWith("DL_NS_")) return "상태이상";
    if (id.startsWith("DL_TC_")) return "대화카드";
    if (id.startsWith("DL_G_")) return "교역품";
    if (id.startsWith("DL_T_")) return "식사";
    if (id.startsWith("DL_S_")) return "상식주입";
    if (id.startsWith("DL_E_") || id.startsWith("EV_")) return "이벤트";
    return "메인대화";
  }

  function normalizeImageReference(category, value) {
    const normalizedCategory = String(category ?? "").trim();
    const categoryKey = normalizedCategory.toLowerCase() === "sd" ? "SD" : normalizedCategory;
    const rawValue = String(value ?? "").trim();
    if (!rawValue || rawValue === "0") return { category: categoryKey, assetId: "", assetName: "" };
    if (/^Asset_/i.test(rawValue)) return { category: categoryKey, assetId: rawValue, assetName: "" };

    const prefix = new Map([
      ["컷신", "Asset_N"],
      ["SD", "Asset_SD"],
      ["상황", "Asset_SIT"]
    ]).get(categoryKey) || "Asset_N";
    if (/^\d+$/.test(rawValue)) {
      return { category: categoryKey, assetId: `${prefix}_${rawValue.padStart(2, "0")}`, assetName: "" };
    }
    return { category: categoryKey, assetId: "", assetName: rawValue };
  }

  window.ProjectWDialogue = { preload, getDialogue, getDialogueByCategory, getDialogueIds, getDialogueCatalog };
}());
