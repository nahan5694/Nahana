const GAME_VERSION = "0.00.270";
const ACCOUNT_SCHEMA_VERSION = 46;
const STORAGE_KEY = "project_w_account_v1";
const ASSETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1354829592&single=true&output=csv";
const NAHANA_STATUS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=138394243&single=true&output=csv";
const NAHANA_BUFF_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1856378851&single=true&output=csv";
const NAHANA_BLESS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=2099271994&single=true&output=csv";
const NAHANA_EVENT_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1090495108&single=true&output=csv";
const TALK_CARD_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=34398197&single=true&output=csv";
const CITY_EVENT_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1113261863&single=true&output=csv";
const ROUTE_EVENT_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=611446833&single=true&output=csv";
const INFORMATION_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=866719207&single=true&output=csv";
const INFORMATION_RULE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1133590437&single=true&output=csv";
const sceneOrder = ["road", "partner", "cargo", "map"];
const PARTNER_APPETITE_STAGES = ["기피", "불호", "통상", "선호", "갈망"];
const PARTNER_APPETITE_STATUS_IDS = new Set([
  "N_S_005", "N_S_017", "N_S_018", "N_S_019", "N_S_020", "N_S_021", "N_S_022"
]);
const TRAVEL_STEP_MS = 30_000;
const TURN_BACK_DURATION_MS = 10_000;
const MAX_TRAVEL_SEGMENT_MS = 180_000;
const MAX_TRAVEL_RATE = 4;
const START_POSITION_ID = "MAP_DOT_0094";
const START_DESTINATION_ID = "MAP_NODE_0036";
const FIRST_TUTORIAL_DESTINATION_ID = "MAP_NODE_0028";
const START_ROUTE = [START_POSITION_ID, START_DESTINATION_ID];
const TIME_PHASES = ["아침", "낮", "오후", "저녁", "밤"];
const BUSINESS_OPEN_PHASES = new Set(["아침", "낮", "오후", "저녁"]);
const DEPARTURE_PHASES = new Set(["아침", "낮", "오후"]);
const INFORMATION_LIMITS = new Map([["주점", 3], ["여관", 1], ["상업조합", 1]]);
const GUILD_CONTRIBUTION_LEVEL_COSTS = [500, 2500, 12500, 62500];
const LODGING_MOOD_RECOVERY = 5;
const LODGING_WITHOUT_MEAL_MOOD_PENALTY = -20;
const DAILY_GREASINESS_RECOVERY = 5;
const CONTRACT_START_DATE = { year: 1433, month: 4, day: 8 };
const CONTRACT_WEEKDAYS = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
const SEASONS_BY_MONTH = new Map([
  [1, "겨울"], [2, "겨울"], [3, "봄"], [4, "봄"], [5, "봄"], [6, "여름"],
  [7, "여름"], [8, "여름"], [9, "가을"], [10, "가을"], [11, "가을"], [12, "겨울"]
]);
const WEATHER_TYPES = new Set(["맑음", "흐림", "비", "폭우", "눈", "폭설"]);
const WET_WEATHER_TYPES = new Set(["비", "폭우"]);
const SNOW_WEATHER_TYPES = new Set(["눈", "폭설"]);
const INITIAL_CLEAR_WEATHER_NAMES = [
  "나그네의 길",
  "하이렌바흐",
  "임멜딩크",
  "로벵",
  "네밀",
  "녹색 관문",
  "멜라 관문",
  "도브레치티",
  "마르켄로트"
];
const HORSE_FEED_IDS = ["G_0267", "G_0268"];
const COMMON_SENSE_LIMIT_DIALOGUES = new Set(["DL_S_001", "DL_S_002", "DL_S_003"]);
const SMALL_DIALOG_DURATION_MS = 10_000;
const TAVERN_DIALOG_DURATION_MS = 15_000;
const ROAD_HUNGER_DIALOG_DURATION_MS = 8_000;
const ROAD_WAGON_DIALOG_DURATION_MS = 12_000;
const PARTNER_TOUCH_DIALOG_DURATION_MS = 5_000;
const PARTNER_TOUCH_CHAIN_WINDOW_MS = 2_000;
const PARTNER_TOUCH_CHAIN_MINIMUM = 3;
const PARTNER_SICK_STATUS_NAMES = Object.freeze([
  "숙취", "피로", "식은 몸", "더위 먹음", "멀미", "과식",
  "고혈당", "아린 혀", "속쓰림", "느글거림", "감기 기운"
]);
const TALK_CARD_HAND_SIZE = 3;
const TALK_CARD_LOVE_CHANCE = 0.03;
const TALK_CARD_CAMP_CHANCE = 0.1;
const TALK_CARD_AREA_SLOT_OFFSETS = Object.freeze([-0.4, -0.2, 0.2, 0.4]);
const MAX_COMPANION_RANK = 50;
const COMPANION_EVENT_RANKS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const NAHANA_SITUATION_EVENT_IDS = Object.freeze(
  Array.from({ length: 15 }, (_, index) => `E_${String(index + 1).padStart(3, "0")}`)
);
const TUTORIAL_IDS = Object.freeze({
  HORSE_FEED: 11,
  EARLY_PARTNER: 12,
  TOP_TOOLBAR: 13,
  WALLET: 14,
  MERCHANT_PATH: 15,
  MEMORIAL: 16,
  INFORMATION_ARCHIVE: 17,
  CURRENCY_EXCHANGE: 18,
  TALK_CARD: 19,
  CITY_COMMERCE: 20,
  CITY_NEWS: 21,
  INFORMATION_GATHERING: 22,
  SPIRIT_BLESSING: 23,
  GUILD_CONTRIBUTION: 24,
  TRADE_REVIEW: 25,
  PARTNER_SOOTHE: 26
});
const TUTORIAL_MAX_ID = Math.max(...Object.values(TUTORIAL_IDS));
const ADVANCED_TRADE_CONTEXTS = ["trade:상회", "trade:교역소", "trade:좌판", "trade:시장"];
const ADVANCED_TUTORIAL_DEFINITIONS = Object.freeze([
  {
    id: "trade-assortment",
    label: "취급 상품",
    contexts: ADVANCED_TRADE_CONTEXTS,
    pages: [
      { title: "먼저 거래 시설을 확인하세요", text: "상단에는 지금 이용하는 거래 시설의 이름이 표시됩니다.\n상회·교역소·좌판·시장은 물건을 들여오는 방식과 취급 범위가 서로 다릅니다.", selector: ".trade-title-block", padding: 12 },
      { title: "상회", text: "상회는 지역 생산품과 정기적으로 들어오는 고정물류, 여러 지역의 수입품을 폭넓게 취급합니다.\n같은 상회를 꾸준히 이용하면 쌓인 관계가 거래에 도움을 줍니다." },
      { title: "교역소", text: "교역소에는 지역 생산품과 고정물류, 그때그때 들어온 수입품이 함께 모입니다.\n서로 다른 유통 경로의 상품을 한자리에서 살피기에 좋습니다." },
      { title: "좌판과 시장", text: "관문의 좌판은 지나가는 상인이 가져온 수입품 중심입니다.\n도시의 시장은 지역 생산품과 꾸준히 들어오는 상품을 찾기 좋으며, 도시와 대도시에서는 간식도 살 수 있습니다." },
      { title: "시장이 매입하지 않는 상품", text: "시장은 모든 화물을 받아 주지는 않습니다.\n큰 자금이 필요하거나 전문적인 보관·감정이 필요한 상품은 매입을 거절하며, 이런 상품은 교역소나 상회에서 거래해야 합니다." },
      { title: "취급 상품 요약", text: "시설의 이름만 보지 말고 실제 재고와 매입 가능 여부를 확인하세요.", summary: ["상회: 세 유통 구분을 폭넓게 취급", "교역소: 서로 다른 유통 상품을 비교", "좌판: 관문에 모인 수입품", "시장: 지역 생산품·정기 유통품·간식", "시장 매입 제한품: 교역소나 상회에서 판매"] }
    ]
  },
  {
    id: "trade-origin",
    label: "생산품·고정물류·수입품",
    contexts: ADVANCED_TRADE_CONTEXTS,
    pages: [
      { title: "상품마다 유통 구분이 다릅니다", text: "상인의 상품 목록에는 생산품, 고정물류와 수입품이 함께 섞여 있을 수 있습니다.\n목록 전체가 한 종류라는 뜻은 아니며, 상품마다 쌓은 지식을 통해 구분을 확인합니다.", selector: ".trade-merchant-catalog > header", padding: 10 },
      { title: "생산품", text: "현재 거점에서 생산되는 상품입니다.\n유통 과정이 짧아 비교적 상태가 좋은 편이며, 현지 공급과 재고가 가격을 판단하는 단서가 됩니다." },
      { title: "고정물류", text: "지역 산업이나 주민 수요를 위해 다른 생산지에서 꾸준히 들어오는 상품입니다.\n현지 생산품은 아니지만 유통망이 자리 잡아 일반 수입품보다 거리의 영향을 적게 받습니다." },
      { title: "수입품", text: "상인이 다른 지역에서 들여온 상품입니다.\n원산지와의 거리와 현지 희소성이 가치에 반영되며, 취급 종류와 재고가 달라질 수 있습니다." },
      { title: "유통 구분 살피기", text: "한 번의 가격만으로 생산지를 단정하기는 어렵습니다.\n여러 거점의 상품 정보와 재고, 나하나의 감상과 거래 기록을 함께 쌓으며 유통 구분을 살펴보세요." }
    ]
  },
  {
    id: "trade-value",
    label: "가치 결정",
    contexts: ADVANCED_TRADE_CONTEXTS,
    pages: [
      { title: "가치는 한 가지 이유로 정해지지 않습니다", text: "상품의 현재 가치는 거점의 공급과 재고, 유통 구분과 원산지 거리, 품질, 열화 내구도, 도시 소식과 정보의 영향을 함께 받습니다.", selector: ".trade-exchange" },
      { title: "해금한 가치 단서", text: "상품에 커서를 올리면 지식 단계로 알아낸 요소만 가치 산정에 표시됩니다.\n가치를 높이는 숫자는 초록색, 낮추는 숫자는 붉은색이며 숨겨진 요소의 합계는 보여 주지 않습니다." },
      { title: "공급과 거리", text: "같은 상품이 거점에 많이 쌓이면 매입 가치는 내려가기 쉽습니다.\n먼 생산지에서 온 상품은 가치가 높아질 수 있지만, 꾸준히 유통되는 고정물류는 거리의 영향이 비교적 완만합니다." },
      { title: "품질과 열화", text: "좋은 품질은 가치를 높이고, 낮은 열화 내구도는 가치를 떨어뜨립니다.\n고정물류와 수입품은 운송 과정도 고려해 생산품과 같은 기준으로만 판단하지 않는 편이 좋습니다." },
      { title: "도시 소식과 정보", text: "도시 이벤트와 유통 정보는 특정 상품군의 공급과 시세를 움직입니다.\n소식이 오래되거나 거짓일 수 있으므로 정보의 신뢰도와 남은 기간도 함께 보세요." },
      { title: "가치 판단 요약", text: "현재 숫자 하나보다 왜 그 값이 되었는지 추리하는 것이 중요합니다.", summary: ["재고가 적고 수요가 높을수록 유리한 판매처가 될 수 있습니다.", "유통 구분과 원산지 거리가 가치에 영향을 줍니다.", "품질과 열화 상태는 같은 상품의 값도 다르게 만듭니다.", "도시 소식과 정보는 평소와 다른 기회를 만듭니다."] }
    ]
  },
  {
    id: "trade-bargain",
    label: "흥정",
    contexts: ADVANCED_TRADE_CONTEXTS,
    pages: [
      { title: "흥정 시도", text: "흥정은 내가 건네는 물건과 화폐의 가치를 한 번의 거래 동안 높여 줍니다.\n버튼에 커서를 올리면 현재 성공 가능성과 성공 시 보정을 확인할 수 있습니다.", selector: "#trade-bargain" },
      { title: "상품 지식과 흥정", text: "지식 7단계에 도달한 서로 다른 상품을 거래안에 올리면 최대 3종까지 흥정 성공 가능성이 높아집니다.\n적용 중인 상품 지식 보정은 흥정 버튼의 툴팁에서 확인할 수 있습니다.", selector: "#trade-bargain" },
      { title: "성공을 이어갈수록", text: "같은 거래에서 흥정에 성공할 때마다 다음 성공 확률은 8%포인트 낮아지고 가치 보정은 쌓입니다.\n가치 보정은 달변가를 모두 익혀도 최대 10%까지만 누적되며, 거래를 확정하면 끝납니다." }
    ]
  },
  {
    id: "trade-advice",
    label: "나하나의 조언",
    contexts: ADVANCED_TRADE_CONTEXTS,
    pages: [
      { title: "나하나의 교역품 감상", text: "거점의 거래 시설에 처음 들어서면 나하나가 판매 중인 물건을 살펴보고 짧은 감상을 남길 수 있습니다." },
      { title: "조언은 단서입니다", text: "품질, 가격, 생산지와 수입 여부에 관한 단서를 얻을 수 있지만 항상 정확한 판단은 아닙니다.\n나하나의 기분이 좋을수록 더 자주 이야기하며, 기분이 나쁘면 감상을 하지 않습니다." }
    ]
  },
  {
    id: "trade-company-relation",
    label: "상회 관계",
    contexts: ["trade:상회"],
    previewMerchantPath: true,
    pages: [
      { title: "상회 이용 관계", text: "상회에서 거래를 이어가면 해당 상회와의 이용 관계가 쌓입니다.\n행상인의 길에서 각 상회의 현재 관계와 다음 혜택을 확인할 수 있습니다.", selector: ".merchant-path-company-list" },
      { title: "관계는 상회마다 따로 쌓입니다", text: "한 상회에서 얻은 관계가 다른 상회에 그대로 적용되지는 않습니다.\n자주 이용할 상회를 정하면 장기적인 거래 기반을 만들기 쉽습니다.", selector: ".merchant-path-company-list" },
      { title: "상회 정보 수집", text: "이용 관계가 단골 고객에 도달하면 상회 거래창에서 정보 수집이 열립니다.\n정보 수집 기회를 한 번에 사용하며, 시간은 흐르지 않습니다.", selector: "#trade-company-information" }
    ]
  },
  {
    id: "trade-company-documents",
    label: "어음과 정보 판매",
    contexts: ["trade:상회"],
    unlockKeys: ["information", "guildAccess"],
    lockLabel: "정보·상업조합 기능 해금 필요",
    pages: [
      { title: "상회에서 다루는 거래 자산", text: "상회에서는 화물과 화폐 외에 보유한 정보와 어음을 거래에 사용할 수 있습니다.", selector: ".trade-player-catalog-tabs" },
      { title: "정보 판매", text: "정보는 상회에 팔아도 보관함에서 사라지지 않지만, 널리 퍼진 만큼 등급과 신뢰도가 낮아집니다.\n같은 상점에는 같은 정보를 반복 판매할 수 없습니다." },
      { title: "어음 사용", text: "어음은 액면가가 정해진 거래용 증서입니다.\n상회의 큰 거래에서 현금 대신 사용할 수 있지만 잔돈처럼 쪼개 쓸 수는 없습니다." }
    ]
  },
  {
    id: "meal-appetite",
    label: "식욕과 상태이상",
    contexts: ["meal"],
    pages: [
      { title: "나하나의 식욕", text: "식욕 창은 단맛, 짠맛, 자극, 기름짐에 대한 현재 성향을 단계로 보여 줍니다.\n정확한 수치보다 기피·불호·통상·선호·갈망의 흐름을 읽으세요.", selector: "#meal-appetite-tooltip", preview: "meal-appetite", padding: 12 },
      { title: "상태이상 확인", text: "식사와 관련된 상태이상은 주문 가능한 음식이나 포만감 한도를 바꿀 수 있습니다.\n식욕 창의 뱃지에 커서를 올리면 현재 영향을 확인할 수 있습니다.", selector: "#meal-appetite-tooltip", preview: "meal-appetite", padding: 12 },
      { title: "질문으로 단서 얻기", text: "나하나에게 질문하면 현재 입맛 가운데 두드러진 성향을 대사로 알려 줍니다.\n질문 기회는 주점에 다시 들어오면 같은 날에도 다시 확인할 수 있습니다.", selector: "#meal-ask-nahana" }
    ]
  },
  {
    id: "meal-tooltip",
    label: "음식 툴팁 UI",
    contexts: ["meal"],
    pages: [
      { title: "메뉴를 살펴보는 법", text: "메뉴에 커서를 올리면 이름과 분류, 가치, 포만감, 음식 설명을 한 번에 확인할 수 있습니다.", selector: "#meal-menu-tooltip", preview: "meal-menu", padding: 12 },
      { title: "맛 변화 뱃지", text: "툴팁의 맛 뱃지는 그 음식이 단맛, 짠맛, 자극, 기름짐을 어느 방향으로 움직이는지 보여 줍니다.\n색이 강할수록 한 끼에 미치는 영향도 큽니다.", selector: "#meal-menu-tooltip", preview: "meal-menu", padding: 12 }
    ]
  },
  {
    id: "camp-comfort",
    label: "안락도",
    contexts: ["camp"],
    pages: [
      { title: "야영 안락도", text: "안락도는 식사, 야영 물품, 날씨와 환경을 합쳐 이번 야영이 얼마나 편안한지 보여 줍니다.", selector: ".camp-comfort-summary" },
      { title: "불편한 야영", text: "안락도가 낮으면 나하나의 기분이 떨어지고 불편한 야영으로 이어질 수 있습니다.\n위험한 상태에서 진행하려 하면 한 번 더 준비를 확인할 수 있습니다." },
      { title: "편안한 야영", text: "식량과 물품을 알맞게 조합해 안락도를 높이면 동행 경험치를 추가로 얻을 수 있습니다.\n비싼 물품을 매번 모두 쓰기보다 환경에 맞게 선택하세요." }
    ]
  },
  {
    id: "camp-items",
    label: "물품 추가 적용",
    contexts: ["camp"],
    pages: [
      { title: "식량과 야영 물품", text: "식량은 선택한 수량만큼 소모됩니다.\n야영 물품은 소모품이 아니며 보유한 물품을 이번 야영에 적용할지 선택합니다.", selector: ".camp-setup-columns" },
      { title: "물품마다 다른 역할", text: "침구, 천막, 조리 도구처럼 물품마다 도움을 주는 상황이 다릅니다.\n화물 설명과 안락도 변화를 함께 보고 이번 환경에 필요한 물품을 고르세요." }
    ]
  },
  {
    id: "guild-information",
    label: "정보 수집",
    contexts: ["guild"],
    unlockKey: "information",
    lockLabel: "정보 수집 기능 해금 필요",
    pages: [
      { title: "상업조합의 정보 수집", text: "정보 수집을 누르면 이 조합에 남은 수집 기회를 한 번에 모두 사용합니다.\n대륙 전역의 정보가 대상이며, 상업조합에서는 시간이 흐르지 않습니다.", selector: "#service-info-collect" },
      { title: "여러 정보를 얻었다면", text: "한 번에 여러 정보를 얻으면 획득 카드를 한 장씩 확인합니다.\n확인을 누르면 다음 카드가 차례로 나타납니다." },
      { title: "공헌도와 수집 기회", text: "상업조합 공헌도는 대륙 전역의 지부가 공유합니다.\n단계가 오르면 모든 지부의 정보 수집 기회가 늘어나며, 기회는 일정 기간마다 다시 채워집니다.", selector: "#service-guild-profile" }
    ]
  },
  {
    id: "guild-contribution",
    label: "공헌",
    contexts: ["guild"],
    unlockKey: "guildContribution",
    lockLabel: "공헌 기능 해금 필요",
    pages: [
      { title: "상업조합 공헌", text: "공헌은 화폐를 조합에 납부해 공헌도를 얻는 기능입니다.\n각 거점의 상업조합에서 하루에 한 번 공헌할 수 있습니다.", selector: "#service-contribution-open" },
      { title: "공헌도 단계", text: "공헌도는 대륙 전역의 상업조합이 공유하며 행상인의 길에서도 확인할 수 있습니다.\n단계가 높아질수록 모든 지부에서 얻는 정보 수집 기회가 늘어납니다.", selector: "#service-guild-profile" },
      { title: "거점별 공헌 기회", text: "공헌도와 단계는 전역에서 공유하지만 하루 1회 제한은 거점마다 따로 적용됩니다.\n다른 도시로 이동하면 그곳의 상업조합에서도 하루 한 번 공헌할 수 있습니다." }
    ]
  },
  {
    id: "guild-notes",
    label: "어음",
    contexts: ["guild"],
    pages: [
      { title: "어음 발급", text: "도시와 대도시의 상업조합에서는 화폐와 수수료를 내고 정해진 액면의 어음을 발급받을 수 있습니다.", selector: "#service-bill-note-open" },
      { title: "어음의 장점", text: "어음은 화물칸과 무게를 차지하지 않으며 통행 관세와 현금 강탈의 부담을 줄여 줍니다.\n도시와 대도시의 상회 거래에도 사용할 수 있습니다." },
      { title: "어음의 불편함", text: "액면을 나눠 쓸 수 없어 작은 거래에는 불편합니다.\n대도시 상업조합에서 현금으로 바꿀 때에도 수수료가 필요합니다." }
    ]
  },
  {
    id: "road-routes",
    label: "정규교역로와 일반경로",
    contexts: ["road"],
    requiresRoadRoute: true,
    lockLabel: "길 위에서 확인할 수 있습니다.",
    pages: [
      { title: "지금 지나고 있는 길", text: "상단에는 현재 지나고 있는 경로의 이름이 표시됩니다.\n금빛 표시는 정규교역로, 회색 표시는 일반경로입니다.", selector: "#road-route-name", padding: 14 },
      { title: "안전하고 빠른 정규교역로", text: "정규교역로는 치안이 좋아 습격 위험이 낮습니다.\n잘 관리된 길 덕분에 더 빠르게 이동하며, 화물 파손 부담도 줄어듭니다.", selector: "#road-route-name", padding: 14 },
      { title: "관문을 거칠 때의 비용", text: "정규교역로는 관문을 자주 거칩니다.\n관문은 그냥 지나칠 수 없으므로, 여러 관문을 지나는 여행에서는 관세 부담이 커질 수 있습니다.", selector: "#road-route-name", padding: 14 },
      { title: "일반경로를 선택한다면", text: "일반경로는 거친 길로 이동이 느리고 화물 파손 부담이 큽니다.\n치안도 경로마다 다르지만, 관문을 덜 거치는 길을 고르면 관세를 아낄 수 있습니다.", selector: "#road-route-name", padding: 14 },
      { title: "막다른 거점", text: "도착한 거점에서 방금 지나온 길밖에 이어지지 않는다면 거점을 지나칠 수 없습니다.\n거점에 들어간 뒤 돌아갈 준비를 하세요." },
      { title: "경로 선택 요약", text: "안전과 이동 속도, 관세 부담을 함께 비교하세요.", summary: ["정규교역로: 좋은 치안과 빠른 이동, 잦은 관문 통과", "일반경로: 거친 길과 치안을 고려해 관문이 적은 길 선택", "어느 길이든 지형과 날씨에 따라 여행 여건이 달라집니다."], selector: "#road-route-name", padding: 14 }
    ]
  },
  {
    id: "road-horse",
    label: "말 상태와 먹이",
    contexts: ["road"],
    pages: [
      { title: "말 상태", text: "위쪽 숫자는 말의 체력, 아래쪽 숫자는 허기입니다.\n커서를 올리면 현재 상태를 더 자세히 확인할 수 있습니다.", selector: ".road-condition-horse", shape: "diamond" },
      { title: "말 식량 먹이기", text: "먹이 버튼으로 등록된 건초나 말먹이를 사용합니다.\n옆의 수량은 현재 등록된 먹이의 남은 개수입니다.", selector: "#horse-feed-controls" },
      { title: "채찍질", text: "이동 중 말의 엉덩이 부근을 누르면 채찍질합니다.\n말의 체력이 0~2 감소하는 대신 다음 지점까지 남은 시간이 0~1초 줄어듭니다. 체력이 33 이하라면 채찍질할 수 없습니다.", selector: "#horse-whip-hitbox", padding: 14 }
    ]
  },
  {
    id: "road-wagon",
    label: "수레 상태와 수레바퀴",
    contexts: ["road"],
    pages: [
      { title: "짐마차 상태", text: "짐마차 상태에는 내구도와 이동에 영향을 주는 고장이 함께 표시됩니다.\n커서를 올려 현재 효과를 확인하세요.", selector: ".road-condition-wagon", shape: "diamond" },
      { title: "수레바퀴 교체", text: "수레바퀴가 손상되고 화물에 예비 수레바퀴가 있다면 짐마차 상태 옆에 교체 버튼이 나타납니다.\n교체하면 예비 바퀴 하나를 사용해 손상을 제거합니다." }
    ]
  },
  {
    id: "road-environment",
    label: "환경",
    contexts: ["road"],
    pages: [
      { title: "경로 환경", text: "환경은 온난, 다습, 추위, 혹한처럼 여행 구역의 기후 성격을 나타냅니다.\n말과 나하나의 상태, 화물 운송 위험에 영향을 줄 수 있습니다.", selector: "#road-environment-button", shape: "diamond" },
      { title: "날씨와 함께 보기", text: "같은 비라도 다습한 곳과 추운 곳에서 체감 위험이 다릅니다.\n상단 날씨와 환경 툴팁을 함께 확인해 준비하세요." }
    ]
  },
  {
    id: "road-surface",
    label: "노면",
    contexts: ["road"],
    pages: [
      { title: "노면 상태", text: "노면은 짐마차의 이동 속도와 화물 파손 위험에 영향을 줍니다.\n비와 눈이 이어지면 젖은 길, 진흙 길, 눈 덮인 길로 바뀔 수 있습니다.", selector: ".road-condition-surface", shape: "diamond" },
      { title: "경로와 날씨의 조합", text: "관리된 길은 이동이 편하지만 날씨가 나빠지면 장점이 줄어듭니다.\n노면 툴팁에서 현재 효과를 확인한 뒤 장거리 운송을 판단하세요." }
    ]
  },
  {
    id: "partner-level",
    label: "동행 레벨",
    contexts: ["partner"],
    pages: [
      { title: "동행등급", text: "함께 이동하고 쉬고, 새로운 대화와 음식을 경험하면 동행 경험치를 얻습니다.\n경험치가 차면 동행등급과 강화포인트가 오릅니다.", selector: ".partner-companion-status" },
      { title: "성장의 의미", text: "동행등급은 정령력과 이벤트, 축복 성장에 연결됩니다.\n여행을 이어가며 자연스럽게 오르는 장기 성장 요소입니다." }
    ]
  },
  {
    id: "partner-mood",
    label: "기분",
    contexts: ["partner"],
    pages: [
      { title: "나하나의 기분", text: "기분은 대사, 교역품 감상, 파트너 기능 이용 가능 여부에 영향을 줍니다.\n정확한 상태와 게이지를 이곳에서 확인할 수 있습니다.", selector: ".partner-mood-status" },
      { title: "여행 중 기분 관리", text: "불편한 야영과 험한 환경은 기분을 떨어뜨립니다.\n식사, 간식, 숙박과 즐거운 사건은 기분 회복에 도움이 됩니다." }
    ]
  },
  {
    id: "partner-appetite",
    label: "식욕",
    contexts: ["partner"],
    pages: [
      { title: "식욕 열기", text: "식욕 버튼을 누르면 단맛, 짠맛, 자극, 기름짐의 현재 성향을 단계로 확인할 수 있습니다.\n창을 연 상태는 다른 화면을 다녀와도 유지됩니다.", selector: "#partner-appetite-panel", preview: "partner-appetite", padding: 12 },
      { title: "식욕과 식사", text: "같은 종류의 맛만 계속 먹으면 기피하거나 갈망하는 상태에 닿을 수 있습니다.\n주점 메뉴의 맛 뱃지와 함께 보며 한 끼를 구성하세요.", selector: "#partner-appetite-panel", preview: "partner-appetite", padding: 12 }
    ]
  },
  {
    id: "partner-snack",
    label: "간식",
    contexts: ["partner"],
    unlockKey: "partnerSnack",
    lockLabel: "간식 기능 해금 필요",
    pages: [
      { title: "간식 주기", text: "화물 가운데 간식으로 등록된 물건을 나하나에게 줄 수 있습니다.\n간식은 하루에 한 번만 줄 수 있습니다.", selector: "#partner-snack-open" },
      { title: "소모 방식", text: "여행 식량은 한 개를 소비하고, 그 밖의 교역품 간식은 열화 내구도가 줄어듭니다.\n시장 간식 구입과 파트너뷰 간식 주기는 같은 날 제한을 공유합니다." }
    ]
  },
  {
    id: "partner-common-sense",
    label: "상식주입",
    contexts: ["partner"],
    pages: [
      { title: "상식주입", text: "상식주입은 나하나가 여행과 교역에 관한 짧은 이야기를 들려주는 기능입니다.\n새로 들은 내용은 메모리얼에 수집됩니다.", selector: "#partner-common-sense" },
      { title: "반복 사용", text: "여러 번 사용할 수 있지만 같은 날 계속 재촉하면 나하나가 그날의 대화를 거절할 가능성이 커집니다." }
    ]
  },
  {
    id: "cargo-ui",
    label: "화물뷰 UI 소개",
    contexts: ["cargo"],
    pages: [
      { title: "화물칸", text: "화물뷰에서는 보유한 물건의 칸, 무게, 열화 상태와 구매 기록을 확인합니다.\n정렬 버튼으로 등급, 가치, 카테고리 순서를 바꿀 수 있습니다.", selector: ".cargo-ui" },
      { title: "화물 상세 정보", text: "물건에 커서를 올리면 현재 공개된 상품 정보와 사용 효과를 확인합니다.\n길게 누르면 행상인의 길에 있는 해당 상품 메모로 바로 이동합니다.", selector: "#cargo-grid" },
      { title: "짐마차와 적재 중량", text: "상단에는 적재 중량과 짐마차 내구도, 상태이상이 표시됩니다.\n한도를 넘긴 무게는 이동을 느리게 만듭니다.", selector: ".cargo-topbar" },
      { title: "화물 이동과 폐기", text: "화물을 끌어 보호·비밀·일반 화물칸 사이로 옮기거나 폐기할 수 있습니다.\n특수 화물칸은 관련 축복을 얻은 뒤 나타납니다." }
    ]
  },
  {
    id: "wallet-currency",
    label: "화폐",
    contexts: ["wallet"],
    pages: [
      { title: "지역별 화폐 가치", text: "화폐의 가치는 지역마다 다르며 시간이 흐르면서 완만하게 움직입니다.\n지갑에는 마지막으로 확인한 시세가 표시됩니다.", selector: "#wallet-tabs" },
      { title: "주 유통 지역과 통용도", text: "화폐는 주로 유통되는 지역에서 가장 믿기 쉽습니다.\n다른 지역에서는 통용도에 따라 가치가 낮아질 수 있습니다.", selector: "#wallet-groups" },
      { title: "시세 갱신", text: "환전상 거리에서 시세 확인을 의뢰하면 현재 지역의 지갑 가치 표시를 최신 정보로 갱신할 수 있습니다." }
    ]
  },
  {
    id: "wallet-notes",
    label: "어음",
    contexts: ["wallet"],
    unlockKey: "guildAccess",
    lockLabel: "상업조합 이용 자격 필요",
    pages: [
      { title: "어음 보관", text: "지갑의 어음증서 탭에서 보유한 액면과 수량을 확인합니다.\n어음은 화폐 가치 합계에도 포함됩니다.", selector: "#wallet-tabs" },
      { title: "증서 내용", text: "어음 항목에 커서를 올리면 발행 지부, 날짜, 액면과 지점장 서명이 적힌 증서 내용을 읽을 수 있습니다." }
    ]
  },
  {
    id: "path-level",
    label: "상인 레벨",
    contexts: ["merchant-path"],
    pages: [
      { title: "상인 경험치", text: "교역품을 산 값보다 비싸게 팔아 순이윤을 만들면 그 이윤만큼 상인 경험치를 얻습니다.\n거래 전체의 맞교환 가치가 아니라 개별 화물의 실제 매입과 매각 차이를 봅니다.", selector: ".merchant-path-articles" },
      { title: "상인 레벨과 행상포인트", text: "상인 경험치가 차면 상인 레벨이 오르고 행상포인트를 얻습니다.\n사용할 행상포인트가 있으면 최상단 행상인의 길에 + 표시가 나타나며, 1조부터 3조의 능력에 사용할 수 있습니다." }
    ]
  },
  {
    id: "path-contribution",
    label: "공헌도",
    contexts: ["merchant-path"],
    unlockKey: "guildContribution",
    lockLabel: "공헌 기능 해금 필요",
    pages: [
      { title: "상업조합 공헌도", text: "행상인의 길 4조에서 현재 공헌도 단계와 다음 단계까지의 진행을 확인할 수 있습니다.\n공헌도는 대륙 전역의 상업조합이 공유하며 정보 수집 기회에 연결됩니다.", selector: ".merchant-path-articles" },
      { title: "공헌도를 올리는 법", text: "상업조합에서 화폐를 납부하면 전역 공헌도가 오릅니다.\n공헌은 각 거점의 상업조합에서 하루 한 번씩 할 수 있습니다." }
    ]
  },
  {
    id: "path-company-score",
    label: "상회 이용점수",
    contexts: ["merchant-path"],
    pages: [
      { title: "상회 이용점수", text: "행상인의 길 4조에서 상회별 이용 관계를 확인할 수 있습니다.\n상회와 거래하며 쌓은 점수에 따라 관계 단계와 혜택이 달라집니다.", selector: ".merchant-path-articles" },
      { title: "상회마다 별도 기록", text: "어느 상회를 자주 이용했는지에 따라 기록이 따로 쌓입니다.\n주력 상회를 정할 때 현재 관계 단계를 참고하세요." },
      { title: "단골 고객의 정보 수집", text: "이용점수가 단골 고객 단계에 도달한 상회에서는 거래창의 정보 수집을 사용할 수 있습니다.\n정보 수집에는 시간이 흐르지 않습니다." }
    ]
  },
  {
    id: "path-product-knowledge",
    label: "상품 정보 개방",
    contexts: ["merchant-path"],
    pages: [
      { title: "상품 지식", text: "상품을 사고팔면 해당 상품에 대한 지식 경험이 쌓입니다.\n지식 단계가 오르면 거래창과 화물뷰에서 숨겨졌던 정보가 차례로 열립니다.", selector: ".merchant-path-articles" },
      { title: "초반 지식 단계", text: "초반에는 열화 내구도와 상품 이름을 알아내고, 이어서 희귀등급과 상품 설명, 도시 총재고를 확인하게 됩니다." },
      { title: "깊어진 상품 지식", text: "더 익숙해지면 품질, 원산지와 특산물·명산품 여부, 거리 보정이 열립니다.\n최종 단계의 서로 다른 상품은 거래안에서 최대 3종까지 흥정에 도움을 줍니다." },
      { title: "정보는 상품마다 따로", text: "한 상품을 많이 다뤄도 다른 상품의 정보가 함께 열리지는 않습니다.\n관심 있는 상품을 반복해서 거래하며 경험을 축적하세요." }
    ]
  },
  {
    id: "path-memo",
    label: "메모",
    contexts: ["merchant-path"],
    pages: [
      { title: "상품 상세 기록", text: "행상인의 길 5조에서 상품을 열면 취급처, 직접 적는 메모와 교역 여정을 한곳에서 관리합니다.", selector: ".merchant-path-note-editor" },
      { title: "취급처", text: "직접 구입한 거점은 취급처 뱃지로 쌓입니다.\n뱃지를 눌러 생산지로 추정하거나 생산지가 아닌 곳으로 제외 표시할 수 있습니다.", selector: ".merchant-path-outlet-history" },
      { title: "직접 남기는 메모", text: "상품마다 짧은 메모를 세 개까지 적을 수 있습니다.\n직접 알아낸 특징과 다음 거래 계획을 기록해 두세요.", selector: ".merchant-path-note-fields" },
      { title: "거래 기록", text: "구입과 판매를 모두 마친 교역만 한 묶음으로 남습니다.\n상행 복기를 마친 기록에는 이익 또는 손실 뱃지도 표시됩니다.", selector: ".merchant-path-trade-history" },
      { title: "화물뷰에서도 확인", text: "작성한 메모와 거래 기록은 화물의 툴팁에도 표시됩니다.\n화물을 길게 누르면 해당 상품 기록으로 바로 이동합니다.", selector: "#cargo-grid", preview: "cargo" }
    ]
  },
  {
    id: "memorial-overview",
    label: "메모리얼",
    contexts: ["memorial"],
    pages: [
      { title: "메모리얼", text: "메모리얼은 수집한 메인대화, 상식주입, 이벤트와 대화카드를 다시 읽는 곳입니다.\n다시 감상한 대화는 진행 조건이나 보상을 반복 적용하지 않습니다.", selector: ".memorial-tabs" },
      { title: "발자취와 음식 컬렉션", text: "발자취에는 여행에서 달성한 특별한 기록이 남습니다.\n주점 음식과 시장 간식 탭에서는 나하나가 경험한 메뉴를 모아 볼 수 있습니다.", selector: "#memorial-grid" }
    ]
  },
  {
    id: "information-reliability",
    label: "신뢰도",
    contexts: ["information"],
    unlockKey: "information",
    lockLabel: "정보 기능 해금 필요",
    pages: [
      { title: "정보 신뢰도", text: "신뢰도는 정보 내용이 실제 상황과 맞을 가능성을 나타냅니다.\n높은 신뢰도일수록 믿을 만하지만 오래되면 정확성이 떨어질 수 있습니다.", selector: "#information-grid" },
      { title: "등급과 신뢰도는 다릅니다", text: "등급은 정보의 희소성과 활용 가치를, 신뢰도는 정확성을 나타냅니다.\n등급이 높아도 신뢰도가 낮다면 중요한 판단을 맡기기 어렵습니다." }
    ]
  },
  {
    id: "information-duration",
    label: "잔여일",
    contexts: ["information"],
    unlockKey: "information",
    lockLabel: "정보 기능 해금 필요",
    pages: [
      { title: "정보의 시간", text: "정보는 생성된 뒤 신선한 소식, 통상적인 소식, 뒤늦은 소식 순으로 오래됩니다.\n잔여일이 줄수록 가치와 정확성도 빠르게 낮아집니다.", selector: "#information-grid" },
      { title: "소멸 전 활용", text: "소멸 단계의 정보는 점차 흐려지고 끝내 보관함에서 사라집니다.\n먼 거점으로 향할 때에는 도착 전에 정보가 얼마나 남을지도 계산하세요." }
    ]
  },
  {
    id: "information-false",
    label: "가짜 정보",
    contexts: ["information"],
    unlockKey: "information",
    lockLabel: "정보 기능 해금 필요",
    pages: [
      { title: "소문에는 오판이 섞일 수 있습니다", text: "낮은 신뢰도의 정보는 그럴듯하게 들리지만 실제 도시 상황과 다른 오판일 수 있습니다.\n카드 이름과 내용만으로 즉시 가짜임을 알아낼 수는 없습니다.", selector: "#information-grid" },
      { title: "교차 확인", text: "다른 정보, 도시 소식, 실제 재고와 시세를 함께 보면 오판 위험을 줄일 수 있습니다.\n오래된 정보일수록 처음에는 맞았어도 도착할 때 달라졌을 가능성이 큽니다." },
      { title: "정보 판단 요약", text: "정보는 확정 답안보다 위험을 줄이는 단서입니다.", summary: ["신뢰도로 정확성의 가능성을 봅니다.", "잔여일로 도착할 때까지 버틸지 판단합니다.", "등급으로 희소성과 판매 가치를 가늠합니다.", "중요한 거래는 여러 단서를 교차 확인합니다."] }
    ]
  },
  {
    id: "inn-review",
    label: "상행 복기",
    contexts: ["inn"],
    pages: [
      { title: "숙박 전에 돌아보는 상행", text: "숙박비를 지불하면 아직 복기하지 않은 완료 교역과 최근 지출을 먼저 살펴봅니다.\n관세와 주점·간식·여관 음식의 식비도 이전 복기 이후 내역이 함께 누적됩니다.", selector: "#inn-lodging" },
      { title: "이익과 손실의 원인", text: "복기 화면은 구입가와 판매가, 최종 손익을 비교하고 가격에 크게 작용한 요소를 보여 줍니다.\n◆는 가장 큰 요소, ▲는 유리한 요소, ▼는 불리한 요소입니다." },
      { title: "복기를 마치면", text: "복기 목록의 거래에는 이익 또는 손실 뱃지가 남고 해당 교역품의 거래지식이 1 오릅니다.\n확인한 관세와 식비는 복기 목록에서 정리되며, 복기 종료 후 기존 숙박으로 이어집니다." }
    ]
  },
  {
    id: "inn-functions",
    label: "여관 기능",
    contexts: ["inn"],
    pages: [
      { title: "식사", text: "여관에서도 그날의 식사를 주문할 수 있습니다.\n오늘 식사했는지는 숙박할 때 나하나의 기분 변화에 영향을 줍니다.", selector: "#inn-meal" },
      { title: "심부름꾼", text: "낮에는 심부름꾼에게 여행 물품을 대신 사 오도록 부탁할 수 있습니다.\n주문한 물품을 받을 화물 여유와 지불할 화폐를 함께 확인하세요.", selector: "#inn-errand" },
      { title: "짐마차 정비", text: "짐마차 내구도를 회복하고 발생한 고장을 골라 수리합니다.\n필요한 작업만 선택해 정비비를 지불할 수 있습니다.", selector: "#inn-maintenance" }
    ]
  },
  {
    id: "inn-lodging",
    label: "숙박",
    contexts: ["inn"],
    pages: [
      { title: "숙박 계산서", text: "숙박에는 객실과 마굿간, 말 먹이와 세면용 물 비용이 포함됩니다.\n거점과 도시 소식에 따라 숙박비가 달라질 수 있습니다.", selector: "#inn-lodging" },
      { title: "식사와 기분", text: "오늘 주점이나 여관에서 식사했다면 숙박 후 나하나의 기분이 회복됩니다.\n식사하지 않았다면 붉은 경고와 함께 큰 기분 감소가 적용됩니다.", selector: ".inn-lodging-effect" },
      { title: "밤을 마무리하기", text: "숙박비를 지불한 뒤 완료된 교역이 있다면 상행 복기를 진행합니다.\n복기를 마치거나 대상이 없다면 다음 날 아침까지 쉬고 말의 체력과 허기가 회복됩니다." }
    ]
  }
]);
const ADVANCED_TUTORIAL_IDS = ADVANCED_TUTORIAL_DEFINITIONS.map(definition => definition.id);
const ADVANCED_TUTORIAL_MENU_LABELS = Object.freeze({
  "trade-assortment": "취급상품",
  "trade-origin": "유통구분",
  "trade-value": "가치결정",
  "trade-bargain": "흥정",
  "trade-advice": "나하나조언",
  "trade-company-relation": "상회관계",
  "trade-company-documents": "어음·정보",
  "meal-appetite": "식욕·상태",
  "meal-tooltip": "음식정보",
  "camp-comfort": "안락도",
  "camp-items": "야영물품",
  "guild-information": "정보수집",
  "guild-contribution": "공헌",
  "guild-notes": "어음",
  "road-routes": "경로비교",
  "road-horse": "말과먹이",
  "road-wagon": "수레상태",
  "road-environment": "환경",
  "road-surface": "노면",
  "partner-level": "동행등급",
  "partner-mood": "기분",
  "partner-appetite": "식욕",
  "partner-snack": "간식",
  "partner-common-sense": "상식주입",
  "cargo-ui": "화물화면",
  "wallet-currency": "화폐",
  "wallet-notes": "어음",
  "path-level": "상인등급",
  "path-contribution": "공헌도",
  "path-company-score": "상회점수",
  "path-product-knowledge": "상품정보",
  "path-memo": "메모",
  "memorial-overview": "메모리얼",
  "information-reliability": "신뢰도",
  "information-duration": "남은기간",
  "information-false": "가짜정보",
  "inn-review": "상행복기",
  "inn-functions": "여관기능",
  "inn-lodging": "숙박"
});
const CAMP_PRIORITY_ITEM_IDS = ["G_0273", "G_0272"];
const LEGACY_HORSE_FEED_ID_MAP = new Map([
  ["G_0320", "G_0267"],
  ["G_0321", "G_0268"]
]);
const CAMP_BASE_COMFORT = -20;
const CAMP_NO_MEAL_COMFORT = -30;
const INITIAL_WALLET = Object.freeze({
  Cur_003: 24,
  Cur_005: 6,
  Cur_008: 36,
  Cur_009: 54,
  Cur_010: 72
});
const CAMP_ENVIRONMENT_COMFORT = new Map([
  ["온난", 0],
  ["추위", -10],
  ["혹한", -15],
  ["다습", -10]
]);
const CAMP_WEATHER_COMFORT = new Map([
  ["비", -10],
  ["폭우", -15]
]);
const TERRAIN_DURATION_MULTIPLIERS = new Map([
  ["평지", 1],
  ["험지", 1.15],
  ["산지", 1.5],
  ["숲길", 1.33],
  ["교량", 1.33]
]);
const TERRAIN_SPEED_LABELS = new Map([
  ["평지", 0],
  ["험지", -15],
  ["산지", -50],
  ["숲길", -33],
  ["교량", -33]
]);
const ROAD_SURFACE_SPEED_MULTIPLIERS = new Map([
  ["거친 길", 0.8],
  ["관리된 길", 1.25],
  ["젖은 길", 0.67],
  ["진흙 길", 0.5],
  ["눈덮힌 길", 0.5]
]);
const WAGON_EFFECT_DESCRIPTIONS = new Map([
  ["차축 삐걱임", "수레바퀴 손상 확률 증가"],
  ["수레바퀴 손상", "이동속도 -50%"],
  ["화물 고정 불량", "험지·산지·숲길의 화물 파손 위험 증가"],
  ["물 새는 천막", "비·폭우의 화물 습기 위험 증가"],
  ["짐마차 반파", "이동속도 -75% · 화물 전량 폐기"]
]);
const SPARE_WHEEL_ITEM_ID = "G_0276";
const ENVIRONMENT_HEALTH_LOSS = new Map([
  ["온난", 0],
  ["다습", 1],
  ["추위", 2],
  ["혹한", 3]
]);
const OUTDOOR_SCENE_ASSETS = {
  partner: "Asset_A_02",
  map: "Asset_A_04"
};
const ROAD_SCENE_ASSET_VARIANTS = Object.freeze({
  "북부": Object.freeze({ road: "Asset_F_01", forest: "Asset_F_04", snowRoad: "Asset_F_07", snowForest: "Asset_F_08" }),
  "중부": Object.freeze({ road: "Asset_F_02", forest: "Asset_F_05", snowRoad: "Asset_F_09", snowForest: "Asset_F_10" }),
  "남부": Object.freeze({ road: "Asset_F_03", forest: "Asset_F_06" })
});
const SETTLEMENT_ASSETS = {
  "마을": "Asset_A_06",
  "도시": "Asset_A_07",
  "대도시": "Asset_A_08",
  "관문": "Asset_A_09"
};
const SERVICE_SCENE_ASSETS = new Map([
  ["주점", "Asset_A_11"],
  ["상업조합", "Asset_A_12"]
]);
const COMPANY_ASSET_IDS = new Map([
  ["인데그루크 상회", "Asset_merchant_01"],
  ["브란트 상회", "Asset_merchant_02"],
  ["첼페니 상회", "Asset_merchant_03"]
]);
const SETTLEMENT_FACILITIES = {
  대도시: [
    { id: "company-1", label: "상회1", type: "상회", trade: true },
    { id: "company-2", label: "상회2", type: "상회", trade: true },
    { id: "trade-post", label: "교역소", type: "교역소", trade: true },
    { id: "market", label: "시장", type: "시장", trade: true },
    { id: "currency-exchange", label: "환전상 거리", type: "환전상", trade: true },
    { id: "tavern", label: "주점", type: "주점", trade: false },
    { id: "guild", label: "상업조합", type: "상업조합", trade: false },
    { id: "inn", label: "여관", type: "여관", trade: false }
  ],
  도시: [
    { id: "company", label: "상회", type: "상회", trade: true },
    { id: "trade-post", label: "교역소", type: "교역소", trade: true },
    { id: "market", label: "시장", type: "시장", trade: true },
    { id: "currency-exchange", label: "환전상 거리", type: "환전상", trade: true },
    { id: "tavern", label: "주점", type: "주점", trade: false },
    { id: "guild", label: "상업조합", type: "상업조합", trade: false },
    { id: "inn", label: "여관", type: "여관", trade: false }
  ],
  마을: [
    { id: "market", label: "시장", type: "시장", trade: true },
    { id: "inn", label: "여관", type: "여관", trade: false }
  ],
  관문: [
    { id: "stall-1", label: "좌판 1", type: "좌판", trade: true },
    { id: "stall-2", label: "좌판 2", type: "좌판", trade: true },
    { id: "stall-3", label: "좌판 3", type: "좌판", trade: true },
    { id: "tavern", label: "주점", type: "주점", trade: false },
    { id: "inn", label: "여관", type: "여관", trade: false }
  ]
};
const assetFallbacks = new Map([
  ["Asset_A_01", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_1.png"],
  ["Asset_A_02", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_2.png"],
  ["Asset_A_03", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_3.png"],
  ["Asset_A_04", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_4.png"],
  ["Asset_A_05", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_5.png"],
  ["Asset_A_06", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_%EB%A7%88%EC%9D%84.png"],
  ["Asset_A_07", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_%EB%8F%84%EC%8B%9C.png"],
  ["Asset_A_08", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_%EB%8C%80%EB%8F%84%EC%8B%9C.png"],
  ["Asset_A_09", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/View_%EA%B4%80%EB%AC%B8.png"],
  ["Asset_Cursor_1", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EC%BB%A4%EC%84%9C.png"],
  ["Asset_Cursor_2", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EC%BB%A4%EC%84%9C_2.png"],
  ["Asset_Pin", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%ED%95%80.png"],
  ["Asset_Map_0", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EC%A0%84%EC%B2%B4%EC%A7%80%EB%8F%84.png"],
  ["Asset_Map_1", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%B6%81%EB%B6%80%EC%A7%80%EB%8F%84.png"],
  ["Asset_Map_2", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EC%A4%91%EB%B6%80%EC%A7%80%EB%8F%84.png"],
  ["Asset_Map_3", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%82%A8%EB%B6%80%EC%A7%80%EB%8F%84.png"],
  ["Asset_M_A_R", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%8C%80%EB%8F%84%EC%8B%9C_R.png"],
  ["Asset_M_A_G", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%8C%80%EB%8F%84%EC%8B%9C_G.png"],
  ["Asset_M_A_B", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%8C%80%EB%8F%84%EC%8B%9C_B.png"],
  ["Asset_M_B_R", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%8F%84%EC%8B%9C_R.png"],
  ["Asset_M_B_G", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%8F%84%EC%8B%9C_G.png"],
  ["Asset_M_B_B", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%8F%84%EC%8B%9C_B.png"],
  ["Asset_M_C_R", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%A7%88%EC%9D%84_R.png"],
  ["Asset_M_C_G", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%A7%88%EC%9D%84_G.png"],
  ["Asset_M_C_B", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EB%A7%88%EC%9D%84_B.png"],
  ["Asset_M_D_R", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EA%B4%80%EB%AC%B8_R.png"],
  ["Asset_M_D_G", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EA%B4%80%EB%AC%B8_G.png"],
  ["Asset_M_D_B", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EA%B4%80%EB%AC%B8_B.png"],
  ["Asset_M_Dot", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/%EA%B2%BD%EB%A1%9C.png"],
  ["Asset_N_01", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Default.png"],
  ["Asset_N_02", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Embarrassed.png"],
  ["Asset_N_03", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Laugh.png"],
  ["Asset_N_04", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Smirk.png"],
  ["Asset_N_05", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Annoyed.png"],
  ["Asset_N_06", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Far.png"],
  ["Asset_N_07", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Stretching.png"],
  ["Asset_N_08", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Jerky.png"],
  ["Asset_N_09", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Map.png"],
  ["Asset_N_10", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Shock.png"],
  ["Asset_N_11", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Magic.png"],
  ["Asset_N_12", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Somber.png"],
  ["Asset_N_13", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Sleep.png"],
  ["Asset_N_14", "https://raw.githubusercontent.com/nahan5694/Project_W/refs/heads/main/Assets/Images/Nahana/Angry.png"]
]);

const titleScreen = document.querySelector("#title-screen");
const titleLayout = document.querySelector(".title-layout");
const appShell = document.querySelector(".app-shell");
const gameLoadingScreen = document.querySelector("#game-loading-screen");
const gameScreen = document.querySelector("#game-screen");
const resumeButton = document.querySelector("#resume-game");
const newJourneyButton = document.querySelector("#new-journey");
const titleTutorialSkip = document.querySelector("#title-skip-tutorials");
const newJourneyConfirm = document.querySelector("#new-journey-confirm");
const newJourneyCancel = document.querySelector("#new-journey-cancel");
const newJourneyConfirmButton = document.querySelector("#new-journey-confirm-button");
const playerNameButton = document.querySelector("#player-name-button");
const walletButton = document.querySelector("#wallet-button");
const merchantPathButton = document.querySelector("#merchant-path-button");
const memorialButton = document.querySelector("#memorial-button");
const informationButton = document.querySelector("#information-button");
const optionsButton = document.querySelector("#options-button");
const cards = [...document.querySelectorAll(".scene-card")];
const gameNotice = document.querySelector("#game-notice");
const footprintNotice = document.querySelector("#footprint-notice");
const footprintNoticeTitle = document.querySelector("#footprint-notice-title");
const bargainResultNotice = document.querySelector("#bargain-result-notice");
const titleNotice = document.querySelector("#title-notice");
const dialogModal = document.querySelector("#dialog-modal");
const dialogCard = document.querySelector("#dialog-card");
const dialogCharacter = document.querySelector("#dialog-character");
const dialogSpeaker = document.querySelector("#dialog-speaker");
const dialogMessage = document.querySelector("#dialog-message");
const dialogActions = document.querySelector("#dialog-actions");
const dialogSkip = document.querySelector("#dialog-skip");
const dialogLogToggle = document.querySelector("#dialog-log-toggle");
const dialogLogPanel = document.querySelector("#dialog-log-panel");
const dialogLogClose = document.querySelector("#dialog-log-close");
const dialogLogEntries = document.querySelector("#dialog-log-entries");
const dialogAdvanceHint = document.querySelector("#dialog-advance-hint");
const optionsTabs = document.querySelector("#options-tabs");
const optionsTabButtons = [...document.querySelectorAll("[data-options-tab]")];
const optionsSoundPanel = document.querySelector("#options-sound-panel");
const optionsCodePanel = document.querySelector("#options-code-panel");
const optionsCodeForm = document.querySelector("#options-code-form");
const optionsCodeInput = document.querySelector("#options-code-input");
const optionsCodeStatus = document.querySelector("#options-code-status");
const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#name-input");
const nameError = document.querySelector("#name-error");
const nameCancel = document.querySelector("#name-cancel");
const sceneTransition = document.querySelector("#scene-transition");
const sceneSituationAsset = document.querySelector("#scene-situation-asset");
const walletModal = document.querySelector("#wallet-modal");
const informationModal = document.querySelector("#information-modal");
const informationAcquiredModal = document.querySelector("#information-acquired-modal");
const merchantPathModal = document.querySelector("#merchant-path-modal");
const memorialModal = document.querySelector("#memorial-modal");
const tradeModal = document.querySelector("#trade-modal");
const mealModal = document.querySelector("#meal-modal");
const mealMenuView = document.querySelector("#meal-menu-view");
const innModal = document.querySelector("#inn-modal");
const mealInfoCollect = document.querySelector("#meal-info-collect");
const serviceModal = document.querySelector("#service-modal");
const serviceWindow = document.querySelector("#service-modal .service-window");
const serviceSceneBackground = document.querySelector("#service-scene-background");
const serviceLocation = document.querySelector("#service-location");
const serviceTitle = document.querySelector("#service-title");
const serviceDescription = document.querySelector("#service-description");
const serviceClose = document.querySelector("#service-close");
const serviceInfoCollect = document.querySelector("#service-info-collect");
const serviceMealOrder = document.querySelector("#service-meal-order");
const serviceContent = document.querySelector("#service-modal .service-content");
const serviceGuildProfile = document.querySelector("#service-guild-profile");
const serviceGuildLevel = document.querySelector("#service-guild-level");
const serviceGuildXp = document.querySelector("#service-guild-xp");
const serviceGuildProgressFill = document.querySelector("#service-guild-progress-fill");
const serviceGuildInformationLimit = document.querySelector("#service-guild-information-limit");
const serviceContributionOpen = document.querySelector("#service-contribution-open");
const serviceContributionView = document.querySelector("#service-contribution-view");
const serviceContributionBack = document.querySelector("#service-contribution-back");
const serviceContributionCurrencies = document.querySelector("#service-contribution-currencies");
const serviceContributionItems = document.querySelector("#service-contribution-items");
const serviceContributionClear = document.querySelector("#service-contribution-clear");
const serviceContributionTotal = document.querySelector("#service-contribution-total");
const serviceContributionConfirm = document.querySelector("#service-contribution-confirm");
const serviceBillNoteOpen = document.querySelector("#service-bill-note-open");
const serviceBillNoteView = document.querySelector("#service-bill-note-view");
const serviceBillNoteBack = document.querySelector("#service-bill-note-back");
const serviceBillNoteTabs = [...document.querySelectorAll("[data-bill-note-mode]")];
const serviceBillNoteDenominations = document.querySelector("#service-bill-note-denominations");
const serviceBillNoteHeading = document.querySelector("#service-bill-note-heading");
const serviceBillNoteDescription = document.querySelector("#service-bill-note-description");
const serviceBillNoteFaceValue = document.querySelector("#service-bill-note-face-value");
const serviceBillNoteFee = document.querySelector("#service-bill-note-fee");
const serviceBillNoteTotalLabel = document.querySelector("#service-bill-note-total-label");
const serviceBillNoteTotal = document.querySelector("#service-bill-note-total");
const serviceBillNotePaymentStatus = document.querySelector("#service-bill-note-payment-status");
const serviceBillNoteConfirm = document.querySelector("#service-bill-note-confirm");
const entryTaxModal = document.querySelector("#entry-tax-modal");
const routeEventModal = document.querySelector("#route-event-modal");
const roadScene = document.querySelector('[data-scene="road"]');
const roadBackground = document.querySelector("#road-scene-background");
const partnerBackground = document.querySelector("#partner-scene-background");
const mapBackground = document.querySelector("#map-scene-background");
const roadLocation = document.querySelector("#road-location");
const roadStatus = document.querySelector("#road-status");
const roadAction = document.querySelector("#road-action");
const roadPassThrough = document.querySelector("#road-pass-through");
const roadTurnBack = document.querySelector("#road-turn-back");
const settlementMealStatus = document.querySelector("#settlement-meal-status");
const settlementDailyStatus = document.querySelector("#settlement-daily-status");
const settlementExitTooltip = document.querySelector("#settlement-exit-tooltip");
const settlementTutorialPrompts = document.querySelector("#settlement-tutorial-prompts");
const settlementCommerceGuide = document.querySelector("#settlement-commerce-guide");
const settlementNewsGuide = document.querySelector("#settlement-news-guide");
const travelToolbarStatus = document.querySelector("#travel-toolbar-status");
const travelToolbarTime = document.querySelector("#travel-toolbar-time");
const gameClock = document.querySelector("#game-clock");
const gameClockDate = document.querySelector("#game-clock-date");
const gameClockSeason = document.querySelector("#game-clock-season");
const gameClockWeather = document.querySelector("#game-clock-weather");
const gameClockPhase = document.querySelector("#game-clock-phase");
const roadRouteBar = document.querySelector("#road-route-bar");
const roadRoutePoints = document.querySelector("#road-route-points");
const roadRouteProgress = document.querySelector("#road-route-progress");
const roadRoutePin = document.querySelector("#road-route-pin");
const roadRouteName = document.querySelector("#road-route-name");
const roadStatusTooltip = document.querySelector("#road-status-tooltip");
const contractTooltip = document.querySelector("#contract-tooltip");
const cargoWagonSummary = document.querySelector("#cargo-wagon-summary");
const cargoWagonCondition = document.querySelector("#cargo-wagon-condition");
const cargoWagonEffects = document.querySelector("#cargo-wagon-effects");
const cargoWagonTooltip = document.querySelector("#cargo-wagon-tooltip");
const roadConditionPanel = document.querySelector(".road-condition-markers");
const roadConditionMarkers = [...document.querySelectorAll("[data-road-condition]")];
const roadWheelReplace = document.querySelector("#road-wheel-replace");
const horseWhipHitbox = document.querySelector("#horse-whip-hitbox");
const horseFeedControls = document.querySelector("#horse-feed-controls");
const horseFeedButton = document.querySelector("#horse-feed-button");
const horseFeedChange = document.querySelector("#horse-feed-change");
const horseFeedCount = document.querySelector("#horse-feed-count");
const campSetup = document.querySelector("#camp-setup");
const campSetupClose = document.querySelector("#camp-setup-close");
const campComfortValue = document.querySelector("#camp-comfort-value");
const campComfortBreakdown = document.querySelector("#camp-comfort-breakdown");
const campMealList = document.querySelector("#camp-meal-list");
const campUtilityList = document.querySelector("#camp-utility-list");
const campSetupStatus = document.querySelector("#camp-setup-status");
const campProceed = document.querySelector("#camp-proceed");
const campRiskConfirm = document.querySelector("#camp-risk-confirm");
const campRiskTitle = document.querySelector("#camp-risk-confirm-title");
const campRiskMessage = document.querySelector("#camp-risk-confirm-message");
const campRiskReview = document.querySelector("#camp-risk-review");
const campRiskForce = document.querySelector("#camp-risk-force");
const campCardPanel = document.querySelector("#camp-card-panel");
const campCardHand = document.querySelector("#camp-card-hand");
const settlementFacilities = document.querySelector("#settlement-facilities");
const settlementFacilitiesTitle = document.querySelector("#settlement-facilities-title");
const settlementFacilitiesCategory = document.querySelector("#settlement-facilities-category");
const settlementFacilityList = document.querySelector("#settlement-facility-list");
const gameCursor = document.querySelector("#game-cursor");
const partnerCharacter = document.querySelector("#partner-character");
const partnerTouchPopup = document.querySelector("#partner-touch-popup");
const partnerTouchMessage = document.querySelector("#partner-touch-message");
const partnerStatusEffects = document.querySelector("#partner-status-effects");
const partnerStatusSource = document.querySelector("#partner-status-source");
const partnerStatusTooltip = document.querySelector("#partner-status-tooltip");
const partnerEventAlert = document.querySelector("#partner-event-alert");
const partnerEventPanel = document.querySelector("#partner-event-panel");
const partnerEventClose = document.querySelector("#partner-event-close");
const partnerEventTitle = document.querySelector("#partner-event-title");
const partnerEventStatus = document.querySelector("#partner-event-status");
const partnerEventCondition1 = document.querySelector("#partner-event-condition-1");
const partnerEventCondition2 = document.querySelector("#partner-event-condition-2");
const partnerEventCondition3 = document.querySelector("#partner-event-condition-3");
const partnerEventCondition1Text = document.querySelector("#partner-event-condition-1-text");
const partnerEventCondition2Text = document.querySelector("#partner-event-condition-2-text");
const partnerEventCondition3Text = document.querySelector("#partner-event-condition-3-text");
const partnerEventRewardText = document.querySelector("#partner-event-reward-text");
const partnerLockNotice = document.querySelector("#partner-lock-notice");
const partnerCardHand = document.querySelector("#partner-card-hand");
const partnerBlessingToggle = document.querySelector("#partner-blessing-toggle");
const partnerSpiritBlessing = document.querySelector("#partner-spirit-blessing");
const partnerSpiritAttention = document.querySelector("#partner-spirit-attention");
const partnerBlessingAttention = document.querySelector("#partner-blessing-attention");
const partnerRank = document.querySelector("#partner-rank");
const partnerRankExperience = document.querySelector("#partner-rank-experience");
const partnerMoodValue = document.querySelector("#partner-mood-value");
const partnerMoodGauge = document.querySelector("#partner-mood-gauge");
const partnerMoodFill = document.querySelector("#partner-mood-fill");
const partnerMoodLabel = document.querySelector("#partner-mood-label");
const partnerAppetiteToggle = document.querySelector("#partner-appetite-toggle");
const partnerAppetitePanel = document.querySelector("#partner-appetite-panel");
const partnerAppetiteLevels = document.querySelector("#partner-appetite-levels");
const partnerAppetiteEffects = document.querySelector("#partner-appetite-effects");
const partnerSpiritValue = document.querySelector("#partner-spirit-value");
const partnerFeaturePanel = document.querySelector("#partner-feature-panel");
const partnerFeatureKicker = document.querySelector("#partner-feature-kicker");
const partnerFeatureTitle = document.querySelector("#partner-feature-title");
const partnerFeatureContent = document.querySelector("#partner-feature-content");
const partnerFeatureClose = document.querySelector("#partner-feature-close");
const partnerSnackOpen = document.querySelector("#partner-snack-open");
const partnerSnackPanel = document.querySelector("#partner-snack-panel");
const partnerSnackClose = document.querySelector("#partner-snack-close");
const partnerSnackStatus = document.querySelector("#partner-snack-status");
const partnerSnackList = document.querySelector("#partner-snack-list");
const partnerCommonSense = document.querySelector("#partner-common-sense");
const partnerCommonSensePopup = document.querySelector("#partner-common-sense-popup");
const partnerCommonSenseCharacter = document.querySelector("#partner-common-sense-character");
const partnerCommonSenseSpeaker = document.querySelector("#partner-common-sense-speaker");
const partnerCommonSenseMessage = document.querySelector("#partner-common-sense-message");
const partnerCommonSenseClose = document.querySelector("#partner-common-sense-close");
const merchantCommentPopup = document.querySelector("#merchant-comment-popup");
const merchantCommentCharacter = document.querySelector("#merchant-comment-character");
const merchantCommentSpeaker = document.querySelector("#merchant-comment-speaker");
const merchantCommentMessage = document.querySelector("#merchant-comment-message");
const merchantCommentClose = document.querySelector("#merchant-comment-close");
const tradeDialogueReview = document.querySelector("#trade-dialogue-review");
const tradeDialogueDismiss = document.querySelector("#trade-dialogue-dismiss");
const tradeDialogueReviewLayer = document.querySelector("#trade-dialogue-review-layer");
const tradeDialogueReviewClose = document.querySelector("#trade-dialogue-review-close");
const tradeDialogueReviewSummary = document.querySelector("#trade-dialogue-review-summary");
const tradeDialogueReviewList = document.querySelector("#trade-dialogue-review-list");
const tavernCommentPopup = document.querySelector("#tavern-comment-popup");
const tavernCommentCharacter = document.querySelector("#tavern-comment-character");
const tavernCommentSpeaker = document.querySelector("#tavern-comment-speaker");
const tavernCommentMessage = document.querySelector("#tavern-comment-message");
const tavernCommentClose = document.querySelector("#tavern-comment-close");
const roadCommentPopup = document.querySelector("#road-comment-popup");
const roadCommentCharacter = document.querySelector("#road-comment-character");
const roadCommentSpeaker = document.querySelector("#road-comment-speaker");
const roadCommentMessage = document.querySelector("#road-comment-message");
const roadCommentClose = document.querySelector("#road-comment-close");
const tutorialLayer = document.querySelector("#tutorial-layer");
const tutorialFocus = document.querySelector("#tutorial-focus");
const tutorialCard = document.querySelector("#tutorial-card");
const tutorialDismiss = document.querySelector("#tutorial-dismiss");
const tutorialTitle = document.querySelector("#tutorial-title");
const tutorialMessage = document.querySelector("#tutorial-message");
const tutorialProgress = document.querySelector("#tutorial-progress");
const tutorialContinue = document.querySelector("#tutorial-continue");
const tutorialSkip = document.querySelector("#tutorial-skip");
const advancedTutorialLayer = document.querySelector("#advanced-tutorial-layer");
const advancedTutorialFocus = document.querySelector("#advanced-tutorial-focus");
const advancedTutorialCard = document.querySelector("#advanced-tutorial-card");
const advancedTutorialTitle = document.querySelector("#advanced-tutorial-title");
const advancedTutorialMessage = document.querySelector("#advanced-tutorial-message");
const advancedTutorialProgress = document.querySelector("#advanced-tutorial-progress");
const advancedTutorialContinue = document.querySelector("#advanced-tutorial-continue");
const advancedTutorialClose = document.querySelector("#advanced-tutorial-close");
const advancedTutorialLaunchers = [...document.querySelectorAll("[data-advanced-launcher]")];

let account = loadAccount();
let currentScene = "road";
let moving = false;
let assetLoadPromise;
let titleRevealStarted = false;
let gameEntryInProgress = false;
let nahanaStatusLoadPromise;
let nahanaProgressionLoadPromise;
let nahanaEventLoadPromise;
let talkCardLoadPromise;
let noticeTimer;
let bargainResultNoticeTimer;
let bargainResultNoticeHideTimer;
let footprintNoticeTimer;
let footprintNoticeActive = false;
const footprintNoticeQueue = [];
let evaluatingPartnerFootprints = false;
let travelStepTimer;
let travelCountdownTimer;
let customCursorMode = "";
let campInProgress = false;
let campSetupOpen = false;
let campMealInstanceIds = new Set();
let campUtilityInstanceIds = new Set();
let campTalkCardRollPromise;
let tutorialCampMealSelections = new Set();
let lastMapFocusPositionId = "";
let pendingNameContext = "initial";
let pendingName = "";
let skipTutorialsForNewJourney = false;
let activeServiceContext = null;
let activeServiceView = "home";
let tavernStoryDialogueLock = false;
let restoringInterfaceState = false;
let interfacePersistTimer;
let partnerCommonSenseTimer;
let partnerCommonSenseHideTimer;
let merchantCommentTimer;
let merchantCommentHideTimer;
let merchantCommentResolve;
let shopSideDialogueSessionKey = "";
let shopSideDialogueEnabled = false;
let shopSideDialogueDismissAvailable = false;
const shopSideDialogueEntries = [];
let tavernCommentTimer;
let tavernCommentHideTimer;
let activeTavernVisit = null;
let roadCommentTimer;
let roadCommentHideTimer;
let roadCommentAvailableAt = 0;
let pendingRoadDialogueCount = 0;
let pendingSystemMiniDialogueCount = 0;
let systemMiniDialogueQueue = Promise.resolve();
const tavernVisitCache = new Map();
let tutorialRuntime = null;
let tutorialFocusTarget = null;
let tutorialPositionFrame = 0;
let advancedTutorialRuntime = null;
let advancedTutorialFocusTarget = null;
let advancedTutorialPositionFrame = 0;
let latestTradeTutorialContext = null;
let activeDialogueAdvance = null;
let dialogueAdvanceLocked = false;
let lastClockPresentation = null;
const clockHighlightTimers = new WeakMap();
const travelPauseReasons = new Set();
const serviceContributionOffer = new Map();
const serviceBillNoteSelection = new Map();
let serviceBillNoteMode = "issue";
const assetMap = new Map(assetFallbacks);
const dialogueAssetNameMap = new Map();
const nahanaStatusDefinitions = new Map();
const nahanaBuffDefinitions = new Map();
const nahanaBlessDefinitions = new Map();
const nahanaEventDefinitions = new Map();
const talkCardDefinitions = new Map();
let activePartnerFeature = "";
let activeBlessCategory = "수레바퀴";
let spiritBlessingInProgress = false;
let nahanaEventRewardDialogOpen = false;
let nahanaEventOpeningId = "";
let pendingNahanaEventOpeningId = "";
let activeNahanaSituationEventId = "";
const nahanaEventHardcodedDialoguesInFlight = new Set();
let activeTalkCardId = "";
let partnerAppetiteOpen = false;
let roadTalkCardGenerationQueue = Promise.resolve();
let talkCardGenerationInProgress = 0;
let pendingNarrativePresentationTimer = 0;
let smallPopupSequence = 0;
let smallPopupLayoutFrame = 0;
let partnerTouchDialogueLoadPromise;
let partnerTouchPopupTimer;
let partnerTouchPopupHideTimer;
let partnerTouchEndTimer;
let partnerTouchTimestamps = [];
let partnerTouchSequenceActive = false;
let lastPartnerTouchDialogueId = "";
let partnerTouchDataWarningShown = false;
let partnerTouchCharacterAssetId = "";
const partnerCharacterHitMapCache = new Map();

window.ProjectWAudio.init({
  getAssetUrl: assetId => assetMap.get(assetId) ?? ""
});
window.ProjectWMapView.init({
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  getInformationCards: () => window.ProjectWInformation?.getCards?.() || [],
  getCityEvents: placement => window.ProjectWCityEvents?.getViewedSettlementEvents?.(placement) || [],
  notify: showGameNotice
});
window.ProjectWCargo.init({
  notify: showGameNotice,
  getCompartmentUnlocks: () => ({
    protected: hasPartnerBlessing("N_Bless_049"),
    secret: hasPartnerBlessing("N_Bless_050")
  }),
  getCapacityLimits: () => partnerCargoCapacityLimits(),
  getOverloadRule: () => partnerOverloadRule()
});
window.ProjectWMerchantPath.init({
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  getWorldTime: () => account?.worldTime ?? { day: 1, phaseIndex: 0 },
  getGuildContribution: () => guildContributionProfile(),
  notify: showGameNotice
});
window.ProjectWMemorial.init({
  getUnlockedIds: () => normalizeDialogueMemorial(account?.dialogueMemorial).unlockedIds,
  getUnlockedFootprintIds: () => normalizeFootprints(account?.footprints).unlockedIds,
  getConsumedFoodIds: () => normalizePartnerState(account?.partner, account?.partnerMoodAdjustment).consumedFoodIds,
  readDialogue: (dialogueId, onComplete) => {
    const finishReplay = () => {
      closeDialog();
      onComplete?.();
    };
    playDialogue(dialogueId, finishReplay, { onSkip: finishReplay, replay: true });
  },
  notify: showGameNotice
});
window.ProjectWWallet.init({
  getHoldings: () => account?.wallet ?? {},
  getBillNotes: () => account?.billNotes ?? window.ProjectWBillNotes.createState(),
  getRegion: () => window.ProjectWMapView.getPlacement(currentEnvironmentPlacementId())?.region || "중부",
  getWorldDay: () => normalizeWorldTime(account?.worldTime).day,
  getMarketState: () => account?.currencyMarket,
  setMarketState: marketState => {
    if (!account) return;
    account.currencyMarket = marketState;
    persistAccount();
  },
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  notify: showGameNotice
});
window.ProjectWCityEvents.init({
  dataUrl: CITY_EVENT_CSV_URL,
  getState: () => account?.cityEvents,
  setState: state => {
    if (!account) return;
    account.cityEvents = state;
    persistAccount();
  },
  getWorldDay: () => normalizeWorldTime(account?.worldTime).day,
  getSeason: currentSeason,
  getWeather: placementId => weatherAtPlacement(placementId).label,
  getSettlements: () => window.ProjectWMapView.getTradeWorldData?.().nodes || [],
  changeMood: amount => changePartnerMood(amount),
  addCompanionExperience: (amount, reason) => addCompanionExperience(amount, reason),
  notify: showGameNotice,
  onChange: handleCityEventChange,
  canPresentObservation: () => {
    const game = document.querySelector("#game-screen");
    const blockers = [
      "#dialog-modal", "#tutorial-layer", "#information-acquired-modal", "#entry-tax-modal",
      "#route-event-modal", "#city-events-modal", "#trade-modal", "#meal-modal", "#inn-modal",
      "#service-modal", "#wallet-modal", "#information-modal", "#merchant-path-modal",
      "#memorial-modal", "#partner-event-panel"
    ].map(selector => document.querySelector(selector));
    return Boolean(game && !game.hidden && blockers.every(element => !element || element.hidden));
  }
});
window.ProjectWWolfenCompany.init({
  getState: () => account?.wolfenCompany,
  setState: state => {
    if (!account) return;
    account.wolfenCompany = state;
  },
  getGraph: () => window.ProjectWMapView.getWeatherGraphData?.(),
  getRegion: placementId => wolfenRegionAtPlacement(placementId),
  isRelocationPaused: () => window.ProjectWInformation?.hasValidWolfenTrack?.() || false
});
window.ProjectWRouteEvents.init({
  dataUrl: ROUTE_EVENT_CSV_URL,
  getState: () => account?.routeEvents,
  setState: state => {
    if (!account) return;
    account.routeEvents = state;
    persistAccount();
  },
  getContext: () => routeEventContext(),
  canTrigger: tutorialAllowsRoadEventSystems,
  pauseTravel: pauseTravelClock,
  resumeTravel: resumeTravelClock,
  persist: persistAccount,
  refresh: syncTravelExperience,
  changeMood: changePartnerMood,
  changeHorse: changeRouteEventHorse,
  changeWagon: changeRouteEventWagon,
  addCompanionExperience,
  removePartnerStatus,
  advanceWorldTime: advanceGameTime,
  damageRandomCargo: damageRandomRouteEventCargo,
  consumeJerky: consumeRouteEventJerky,
  prepareCurrencyData: () => window.ProjectWWallet.load(),
  prepareAssetData: loadAssets,
  getCurrencyCapacity: getRouteEventCurrencyCapacity,
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  autoPayCurrency: autoPayRouteEventCurrency,
  gainRegionalCurrency: gainRouteEventCurrency,
  addTravelDelay: addRouteEventTravelDelay,
  openDemandPayment: openRouteEventDemandPayment,
  consumeSpiritProtection: consumeRouteEventSpiritProtection,
  playSpiritProtectionFlash: playRouteEventSpiritProtectionFlash,
  notify: showGameNotice,
  onResolved: handleRouteEventResolved
});
window.ProjectWInformation.init({
  dataUrl: INFORMATION_CSV_URL,
  ruleUrl: INFORMATION_RULE_CSV_URL,
  getState: () => account?.informationState,
  setState: state => {
    if (!account) return;
    account.informationState = state;
  },
  getWorldDay: () => normalizeWorldTime(account?.worldTime).day,
  getWorldSeed: () => String(account?.worldSeed || "title"),
  getSettlements: () => window.ProjectWMapView.getTradeWorldData?.().nodes || [],
  getRoutes: () => window.ProjectWMapView.getTradeWorldData?.().routes || [],
  getPlacementDistance: (fromId, toId) => window.ProjectWMapView.getShortestPlacementDistance(fromId, toId),
  getCityEvents: placement => window.ProjectWCityEvents.getSettlementEvents(placement),
  getWeather: placementId => weatherAtPlacement(placementId),
  getWolfenState: () => window.ProjectWWolfenCompany.ensureState(),
  getCurrencyTrends: () => window.ProjectWWallet.getTrendSnapshot(),
  getInformationSignals: () => window.ProjectWTrade.getInformationSignals(),
  getPeddlerInformationBonuses: () => window.ProjectWMerchantPath.getInformationBonuses(),
  applyMarketShock: effect => window.ProjectWTrade.applyMarketInformationShock(effect),
  scheduleRestockEffect: effect => window.ProjectWTrade.scheduleInformationRestockEffect(effect),
  dampenMarketOnSale: effect => window.ProjectWTrade.dampenMarketInformation(effect),
  setWolfenMarker: (placementId, assetUrl, details) => window.ProjectWMapView.setWolfenMarker(placementId, assetUrl, details),
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  persist: persistAccount,
  notify: showGameNotice
});
window.ProjectWTrade.init({
  getPlayerWallet: () => account?.wallet ?? {},
  getPlayerBillNotes: () => account?.billNotes ?? window.ProjectWBillNotes.createState(),
  setPlayerBillNotes: billNotes => {
    if (!account) return;
    account.billNotes = window.ProjectWBillNotes.normalizeState(billNotes);
    persistAccount();
    window.ProjectWWallet.refresh();
  },
  getWorldTime: () => account?.worldTime ?? { day: 1, phaseIndex: 0 },
  getWorldSeed: () => String(account?.worldSeed || "title"),
  getFoodUsage: () => account?.foodUsage ?? createInitialFoodUsage(),
  getPartnerMood: () => normalizePartnerState(account?.partner, account?.partnerMoodAdjustment).mood,
  getMerchantCommentBonus: () => activePartnerBuffValue(["N_Buff_021"], 2)
    - (partnerHasStatus(normalizePartnerState(account?.partner, account?.partnerMoodAdjustment), "피로") ? 1 : 0),
  getMerchantCommentMisreadChance: () => partnerHasStatus(
    normalizePartnerState(account?.partner, account?.partnerMoodAdjustment),
    "성실한 학생"
  ) ? 0 : null,
  getCompanyScoreMultiplier: () => partnerCompanyScoreMultiplier(),
  getSettlementVisitToken: () => settlementDialogueVisitToken(),
  getCityEventModifiers: settlement => window.ProjectWCityEvents.getModifiers(settlement),
  hasPartnerHangover: () => {
    const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
    return ["숙취", "과식", "고혈당", "속쓰림"].find(name => partnerHasStatus(partner, name)) || "";
  },
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  showMerchantComment: (page, itemName, itemKey) => showMerchantCommentPopup(page, itemName, itemKey),
  cancelMerchantComments: () => hideMerchantCommentPopup(true),
  getBargainProfile,
  attemptBargain,
  completeBargainTrade,
  updateCompanyInformationButton: (button, companyName, placement) => updateInformationButton(
    button,
    "상회",
    placement,
    { companyName }
  ),
  collectCompanyInformation: (companyName, placement) => collectFacilityInformation(
    "상회",
    placement,
    { companyName }
  ),
  recordMerchantProfit: amount => window.ProjectWMerchantPath.recordMerchantProfit(amount),
  showBargainDialogue: (dialogueId, success) => {
    showBargainResultFeedback(success);
    return showSystemMiniDialogue(dialogueId, success ? "bargain-success" : "bargain-failure");
  },
  setPlayerWallet: wallet => {
    if (!account) return;
    account.wallet = wallet;
    persistAccount();
    window.ProjectWWallet.refresh();
  },
  notify: showGameNotice
});
window.ProjectWEntryTax.init({
  getPlayerWallet: () => account?.wallet ?? {},
  getWorldTime: () => account?.worldTime ?? { day: 1, phaseIndex: 0 },
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  setPlayerWallet: wallet => {
    if (!account) return;
    account.wallet = wallet;
    persistAccount();
    window.ProjectWWallet.refresh();
  },
  getBargainProfile,
  attemptBargain,
  completeBargainTrade,
  showBargainDialogue: (dialogueId, success) => {
    showBargainResultFeedback(success);
    return showSystemMiniDialogue(dialogueId, success ? "bargain-success" : "bargain-failure");
  },
  notify: showGameNotice
});
window.ProjectWMeal.init({
  getPartnerState: () => account?.partner ?? createInitialPartnerState(),
  getAppetiteSnapshot: () => partnerAppetiteSnapshot(),
  setPartnerState: (partner, lastMeal) => {
    if (!account) return;
    const previousPartner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
    account.partner = normalizePartnerState({ ...previousPartner, ...partner, effects: previousPartner.effects });
    account.partnerMoodAdjustment = account.partner.mood - 50;
    syncMoodDrivenPartnerStatuses();
    account.lastMeal = lastMeal;
    awardMealCompanionExperience(lastMeal);
    persistAccount();
    updatePartnerUi();
  },
  getPlayerWallet: () => account?.wallet ?? {},
  setPlayerWallet: wallet => {
    if (!account) return;
    account.wallet = wallet;
    persistAccount();
    window.ProjectWWallet.refresh();
  },
  getFoodUsage: () => account?.foodUsage ?? createInitialFoodUsage(),
  setFoodUsage: usage => {
    if (!account) return;
    account.foodUsage = normalizeFoodUsage(usage, account.worldTime);
    persistAccount();
    const placement = currentSettlementPlacement();
    if (placement && account.travel?.mode === "settlement") {
      renderSettlementDailyStatus(placement, settlementFacilitiesFor(placement));
    }
  },
  getRegion: () => window.ProjectWMapView.getPlacement(currentEnvironmentPlacementId())?.region || "중부",
  getWorldTime: () => account?.worldTime ?? { day: 1, phaseIndex: 0 },
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  getRestrictions: ({ kind, vendor } = {}) => {
    const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
    const fullnessRestriction = partnerMealFullnessRestriction(partner);
    return {
      hangover: partnerHasStatus(partner, "숙취"),
      alcoholDisabled: ["숙취", "속쓰림"].some(name => partnerHasStatus(partner, name)),
      snackDisabled: kind === "snack" && ["숙취", "과식", "고혈당", "속쓰림"].some(name => partnerHasStatus(partner, name)),
      forcedWaterCount: partnerHasStatus(partner, "아린 혀") ? 3 : 0,
      forceMostExpensive: partnerHasStatus(partner, "수행자"),
      moodGainMultiplier: partnerHasStatus(partner, "느글거림") ? 0.5 : 1,
      fullnessMaximum: fullnessRestriction.maximum,
      fullnessLimitReason: fullnessRestriction.reason,
      tutorialMeal: tutorialMealRestriction(vendor),
      tavernQuestionMaximum: 3 + activePartnerBuffValue(["N_Buff_023"], 1),
      snackMaximum: Math.max(
        activePartnerBuff("N_Buff_024") ? 4 : 3,
        kind === "snack" && vendor === "시장"
          ? window.ProjectWCityEvents.getModifiers(currentSettlementPlacement()).snackMaximum
          : 0
      )
    };
  },
  onConsumptionComplete: record => handleFoodConsumptionComplete(record),
  playCompletionTransition: (assetId, onDark) => playSituationTransition(assetId, onDark),
  beforeTavernMealCompletion: () => playTavernTutorialDialogueBeforeMeal(),
  afterTavernMealTransition: () => playTavernTutorialDialogueAfterMeal(),
  showTavernDialogue: (dialogueId, variables) => showTavernDialogue(dialogueId, variables),
  notify: showGameNotice
});
window.ProjectWInn.init({
  getPlayerWallet: () => account?.wallet ?? {},
  setPlayerWallet: wallet => {
    if (!account) return;
    account.wallet = wallet;
    persistAccount();
    window.ProjectWWallet.refresh();
  },
  getWorldTime: () => account?.worldTime ?? { day: 1, phaseIndex: 0 },
  getWorldSeed: () => String(account?.worldSeed || "title"),
  getFoodUsage: () => account?.foodUsage ?? createInitialFoodUsage(),
  getPartnerMood: () => normalizePartnerState(account?.partner, account?.partnerMoodAdjustment).mood,
  getCityEventModifiers: settlement => window.ProjectWCityEvents.getModifiers(settlement),
  getLodgingMoodRecovery: settlement => lodgingMoodChange(settlement),
  getInformationOpportunity: (type, placement) => informationOpportunity(type, placement),
  collectInformation: (type, placement) => collectFacilityInformation(type, placement),
  completeLodging: performLodging,
  getWagonState: () => normalizeWagonState(account?.wagon),
  setWagonState: wagon => {
    if (!account) return;
    account.wagon = normalizeWagonState(wagon);
    persistAccount();
    updateRoadConditionUi();
    updateTravelDisplays();
  },
  getErrandState: () => account?.innErrandState ?? {},
  setErrandState: state => {
    if (!account) return;
    account.innErrandState = normalizeInnErrandState(state);
    persistAccount();
  },
  getAssetUrl: assetId => assetMap.get(assetId) ?? "",
  showReviewDialogue: dialogueId => showSystemMiniDialogue(dialogueId, "notice"),
  persistInterface: () => persistAccount(),
  notify: showGameNotice
});

initCustomCursor();
initRoadStatusUi();
updateAccountUi();
prepareTitleScreen();
loadNahanaStatusDefinitions();
loadNahanaProgressionDefinitions();
loadNahanaEventDefinitions();
syncAudioState();

resumeButton.addEventListener("click", () => {
  if (!account) return;
  skipTutorialsForNewJourney = false;
  closeNewJourneyConfirmation();
  void enterGame();
});

newJourneyButton.addEventListener("click", () => {
  skipTutorialsForNewJourney = Boolean(titleTutorialSkip?.checked);
  titleNotice.hidden = true;
  if (account) {
    newJourneyConfirm.hidden = false;
    newJourneyConfirmButton.focus();
    return;
  }
  beginNewJourney();
});

newJourneyCancel.addEventListener("click", closeNewJourneyConfirmation);
newJourneyConfirmButton.addEventListener("click", beginNewJourney);
titleTutorialSkip.addEventListener("change", () => window.ProjectWAudio.playEffect("click"));

function closeNewJourneyConfirmation() {
  newJourneyConfirm.hidden = true;
  newJourneyButton.focus();
}

function beginNewJourney() {
  skipTutorialsForNewJourney = Boolean(titleTutorialSkip?.checked);
  newJourneyConfirm.hidden = true;
  clearSavedJourneyData();
  updateAccountUi();
  void enterGame();
}

async function enterGame() {
  if (gameEntryInProgress) return;
  gameEntryInProgress = true;
  titleNotice.hidden = true;
  const minimumLoadingTime = wait(2_600);
  const savedInterfaceState = normalizeInterfaceState(account?.interfaceState);
  const restoreSavedInterface = Boolean(account?.introCompleted);
  const resumeIntroAfterLoading = Boolean(account && !account.introCompleted);
  restoringInterfaceState = restoreSavedInterface;

  try {
    await showGameLoadingScreen();
    titleScreen.hidden = true;
    gameScreen.hidden = false;
    if (account) pauseTravelClock("game-loading");

    currentScene = restoreSavedInterface ? savedInterfaceState.scene : "road";
    partnerAppetiteOpen = restoreSavedInterface && savedInterfaceState.partnerAppetiteOpen;
    campSetupOpen = false;
    campMealInstanceIds = new Set();
    campUtilityInstanceIds = new Set();
    if (account?.travel?.moving) account.travel.progressUpdatedAt = Date.now();
    if (account) {
      evaluateSeasonFootprints();
      void evaluateCommonSenseFootprint();
    }
    showScene(currentScene, 1, false);
    syncAudioState();

    const assetPromise = loadAssets();
    const dialoguePromise = window.ProjectWDialogue.preload();
    const cargoPromise = window.ProjectWCargo.load().then(result => {
      updateHorseFeedUi();
      updateRoadConditionUi();
      updatePartnerUi();
      renderCampSetup();
      return result;
    });
    const walletPromise = window.ProjectWWallet.load();
    const informationPromise = window.ProjectWInformation.load();
    const mealPromise = window.ProjectWMeal.load();
    const innPromise = window.ProjectWInn.load();
    const mapLoadPromise = window.ProjectWMapView.load();
    const statusPromise = loadNahanaStatusDefinitions();
    const progressionPromise = loadNahanaProgressionDefinitions();
    const eventPromise = loadNahanaEventDefinitions();
    const talkCardPromise = loadTalkCardDefinitions();

    if (!account || resumeIntroAfterLoading) gameScreen.classList.add("is-onboarding");
    else gameScreen.classList.remove("is-onboarding");
    if (account) prepareTravelExperience();

    mapLoadPromise.then(loaded => {
      if (loaded && account) {
        prepareTravelExperience();
        window.ProjectWInformation.advanceToDay(normalizeWorldTime(account.worldTime).day);
      }
    });

    const loadResults = await Promise.allSettled([
      assetPromise,
      dialoguePromise,
      cargoPromise,
      walletPromise,
      informationPromise,
      mealPromise,
      innPromise,
      mapLoadPromise,
      statusPromise,
      progressionPromise,
      eventPromise,
      talkCardPromise
    ]);
    loadResults
      .filter(result => result.status === "rejected")
      .forEach(result => console.error("게임 진입 준비 중 일부 데이터를 불러오지 못했습니다.", result.reason));

    if (restoreSavedInterface) {
      try {
        await restoreInterfaceState(savedInterfaceState);
      } catch (error) {
        console.error("저장된 화면 복원 준비 중 오류가 발생했습니다.", error);
      }
    }

    const activeSceneImages = [...gameScreen.querySelectorAll(".scene-card.is-active img[data-asset-id]")];
    await Promise.all([
      minimumLoadingTime,
      ...activeSceneImages.map(image => waitForTitleImage(image, 3_500))
    ]);
  } catch (error) {
    console.error("게임 진입 화면을 준비하지 못했습니다.", error);
  } finally {
    if (!account) {
      gameScreen.classList.add("is-onboarding");
      setDialogCharacter("Asset_N_01");
      openOnboardingChoice();
    }

    await finishGameLoadingScreen();
    restoringInterfaceState = false;
    if (account) {
      resumeTravelClock("game-loading");
      persistAccount();
    }
    syncAudioState();

    if (resumeIntroAfterLoading) {
      void startIntroSequence({ skipTransition: true });
    } else if (account?.introCompleted) {
      window.setTimeout(() => {
        const tutorial = normalizeTutorialProgress(account?.tutorialProgress);
        const eventState = normalizeNahanaEventState(account?.nahanaEvents);
        if (tutorial.activeId) resumeActiveTutorial();
        else if (eventState.pendingRewardId) void showPendingNahanaEventReward();
        else if (eventState.pendingTutorialId) void startPendingNahanaEventTutorial();
        else schedulePendingNarrativePresentation();
      }, 0);
    }
    gameEntryInProgress = false;
  }
}

async function showGameLoadingScreen() {
  if (!gameLoadingScreen) return;
  gameLoadingScreen.hidden = false;
  gameLoadingScreen.setAttribute("aria-busy", "true");
  gameLoadingScreen.classList.remove("is-visible", "is-leaving");
  void gameLoadingScreen.offsetWidth;
  window.requestAnimationFrame(() => gameLoadingScreen.classList.add("is-visible"));
  syncAudioState();
  await wait(850);
}

async function finishGameLoadingScreen() {
  if (!gameLoadingScreen || gameLoadingScreen.hidden) return;
  gameLoadingScreen.classList.add("is-leaving");
  await wait(620);
  sceneTransition.hidden = false;
  sceneTransition.classList.add("is-dark");
  await wait(60);
  gameLoadingScreen.hidden = true;
  gameLoadingScreen.setAttribute("aria-busy", "false");
  gameLoadingScreen.classList.remove("is-visible", "is-leaving");
  syncAudioState();
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => sceneTransition.classList.remove("is-dark")));
  await wait(1_350);
  sceneTransition.hidden = true;
}

playerNameButton.addEventListener("click", () => {
  if (canChooseName()) openNameEntry("rename");
});
walletButton.addEventListener("click", () => {
  window.ProjectWWallet.open();
  window.setTimeout(() => maybeStartEarlyFeatureTutorial(TUTORIAL_IDS.WALLET), 0);
});
merchantPathButton.addEventListener("click", () => {
  void window.ProjectWMerchantPath.open().then(() => maybeStartEarlyFeatureTutorial(TUTORIAL_IDS.MERCHANT_PATH));
});
memorialButton.addEventListener("click", () => {
  void window.ProjectWMemorial.open().then(() => maybeStartEarlyFeatureTutorial(TUTORIAL_IDS.MEMORIAL));
});
informationButton?.addEventListener("click", () => {
  window.setTimeout(() => maybeStartEarlyFeatureTutorial(TUTORIAL_IDS.INFORMATION_ARCHIVE), 0);
});
["#wallet-close", "#information-close", "#merchant-path-close", "#memorial-close"].forEach(selector => {
  document.querySelector(selector)?.addEventListener("click", schedulePendingNarrativePresentation);
});
optionsButton.addEventListener("click", openOptionsDialog);
optionsTabButtons.forEach(button => button.addEventListener("click", () => setOptionsTab(button.dataset.optionsTab)));
optionsCodeForm?.addEventListener("submit", handleOptionsCodeSubmit);
partnerAppetiteToggle?.addEventListener("click", () => {
  partnerAppetiteOpen = !partnerAppetiteOpen;
  if (!partnerAppetiteOpen) hidePartnerStatusTooltip();
  renderPartnerAppetite();
});
partnerBlessingToggle?.addEventListener("click", togglePartnerBlessingOptions);
partnerSpiritBlessing?.addEventListener("click", () => {
  openPartnerFeature("buff");
  if (isTutorialActive(TUTORIAL_IDS.SPIRIT_BLESSING)
    && normalizeTutorialProgress(account?.tutorialProgress).step === 0
    && activePartnerFeature === "buff") {
    setTutorialStep(1);
  }
});
partnerFeatureClose?.addEventListener("click", closePartnerFeature);
partnerFeatureContent?.addEventListener("click", handlePartnerFeatureAction);
partnerSnackOpen?.addEventListener("click", handlePartnerSnackAction);
partnerSnackClose?.addEventListener("click", closePartnerSnackPanel);
partnerSnackList?.addEventListener("click", event => {
  const button = event.target.closest("button[data-partner-snack-instance]");
  if (button) givePartnerSnack(button.dataset.partnerSnackInstance);
});
partnerCardHand?.addEventListener("click", handleTalkCardClick);
campCardHand?.addEventListener("click", handleTalkCardClick);
partnerCharacter?.addEventListener("click", handlePartnerCharacterTouch);
partnerCharacter?.addEventListener("keydown", event => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  void handlePartnerCharacterTouch(event);
});
partnerCommonSense?.addEventListener("click", injectCommonSense);
partnerCommonSenseClose?.addEventListener("click", () => hidePartnerCommonSensePopup());
partnerEventAlert?.addEventListener("click", handlePartnerEventAlertClick);
partnerEventClose?.addEventListener("click", closePartnerEventPanel);
dialogCard?.addEventListener("click", handleDialogueCardClick);
dialogLogToggle?.addEventListener("click", () => toggleDialogueLog());
dialogLogClose?.addEventListener("click", () => toggleDialogueLog(false));
merchantCommentClose?.addEventListener("click", () => hideMerchantCommentPopup());
tradeDialogueReview?.addEventListener("click", openShopSideDialogueReview);
tradeDialogueDismiss?.addEventListener("click", dismissShopSideDialogues);
tradeDialogueReviewClose?.addEventListener("click", closeShopSideDialogueReview);
tradeDialogueReviewLayer?.addEventListener("pointerdown", event => {
  if (event.target === tradeDialogueReviewLayer) closeShopSideDialogueReview();
});
window.addEventListener("keydown", event => {
  if (event.key !== "Escape" || !tradeDialogueReviewLayer || tradeDialogueReviewLayer.hidden) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  closeShopSideDialogueReview();
}, true);
tavernCommentClose?.addEventListener("click", () => hideTavernCommentPopup());
roadCommentClose?.addEventListener("click", () => hideRoadCommentPopup());
tutorialContinue?.addEventListener("click", advanceTutorialFromCard);
tutorialDismiss?.addEventListener("click", hideTutorial);
tutorialSkip?.addEventListener("click", skipActiveTutorial);
tutorialLayer?.addEventListener("pointerdown", handleTutorialPointerDown);
tutorialLayer?.addEventListener("wheel", handleTutorialWheel, { passive: false });
advancedTutorialLaunchers.forEach(launcher => launcher.addEventListener("click", handleAdvancedTutorialLauncherClick));
advancedTutorialContinue?.addEventListener("click", advanceAdvancedTutorial);
advancedTutorialClose?.addEventListener("click", () => closeAdvancedTutorial(false));
document.addEventListener("click", event => {
  if (!event.target.closest?.("[data-advanced-launcher]")) closeAdvancedTutorialMenus();
  window.setTimeout(refreshAdvancedTutorialLaunchers, 0);
});
window.addEventListener("resize", scheduleTutorialPosition);
window.addEventListener("resize", scheduleAdvancedTutorialPosition);
window.addEventListener("resize", scheduleSmallPopupLayout);
window.addEventListener("resize", positionSettlementExitTooltip);
window.addEventListener("keydown", event => {
  if (advancedTutorialRuntime && advancedTutorialLayer && !advancedTutorialLayer.hidden) {
    if (event.key === "Escape") closeAdvancedTutorial(false);
    else if (event.code === "Space" || event.key === "Enter") advanceAdvancedTutorial();
    else return;
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  if (!tutorialRuntime || tutorialLayer?.hidden || event.target?.closest?.("#tutorial-layer")) return;
  if (!dialogModal.hidden && activeDialogueAdvance && (event.code === "Space" || event.key === "Enter")) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}, true);
document.querySelector("#next-scene").addEventListener("click", () => moveScene(1));
document.querySelector("#previous-scene").addEventListener("click", () => moveScene(-1));
document.querySelector("#inn-next-scene")?.addEventListener("click", () => moveScene(1));
document.querySelector("#inn-previous-scene")?.addEventListener("click", () => moveScene(-1));
roadAction.addEventListener("click", handleRoadAction);
roadPassThrough.addEventListener("click", handleRoadPassThrough);
roadTurnBack?.addEventListener("click", handleRoadTurnBack);
roadAction.addEventListener("pointerenter", showSettlementExitTooltip);
roadAction.addEventListener("pointerleave", hideSettlementExitTooltip);
roadAction.addEventListener("focus", showSettlementExitTooltip);
roadAction.addEventListener("blur", hideSettlementExitTooltip);
settlementCommerceGuide?.addEventListener("click", () => startTutorial(TUTORIAL_IDS.CITY_COMMERCE));
settlementNewsGuide?.addEventListener("click", () => startTutorial(TUTORIAL_IDS.CITY_NEWS));
window.addEventListener("projectw:cityeventsopen", handleCityNewsTutorialOpen);
horseFeedButton.addEventListener("click", feedHorse);
horseFeedChange.addEventListener("click", changeHorseFeed);
horseWhipHitbox?.addEventListener("click", whipHorse);
campProceed.addEventListener("click", () => void performCamp(false));
campSetupClose.addEventListener("click", closeCampSetup);
campRiskReview?.addEventListener("click", () => {
  campRiskConfirm.hidden = true;
  campProceed?.focus();
});
campRiskForce?.addEventListener("click", () => {
  campRiskConfirm.hidden = true;
  void performCamp(true);
});
roadWheelReplace?.addEventListener("click", replaceDamagedWheel);
settlementFacilityList.addEventListener("click", handleSettlementFacilityClick);
mealInfoCollect?.addEventListener("click", () => collectFacilityInformation("주점"));
serviceClose?.addEventListener("click", () => closeServiceModal());
serviceInfoCollect?.addEventListener("click", async () => {
  const collected = await collectFacilityInformation(activeServiceContext?.type || "");
  if (collected && isTutorialActive(TUTORIAL_IDS.INFORMATION_GATHERING)) {
    completeTutorial(TUTORIAL_IDS.INFORMATION_GATHERING);
  }
});
serviceMealOrder?.addEventListener("click", openServiceMealOrder);
serviceContributionOpen?.addEventListener("click", openGuildContribution);
serviceContributionBack?.addEventListener("click", () => setServiceView("home"));
serviceContributionClear?.addEventListener("click", clearGuildContributionOffer);
serviceContributionConfirm?.addEventListener("click", completeGuildContribution);
serviceContributionCurrencies?.addEventListener("click", handleGuildContributionCurrencyClick);
serviceContributionItems?.addEventListener("click", handleGuildContributionOfferClick);
serviceBillNoteOpen?.addEventListener("click", openBillNoteService);
serviceBillNoteBack?.addEventListener("click", () => setServiceView("home"));
serviceBillNoteTabs.forEach(button => button.addEventListener("click", () => switchBillNoteMode(button.dataset.billNoteMode)));
serviceBillNoteDenominations?.addEventListener("click", handleBillNoteSelectionClick);
serviceBillNoteConfirm?.addEventListener("click", completeBillNoteService);
window.addEventListener("projectw:facilitychange", event => {
  const detail = event.detail || {};
  if (detail.facilityType === "여관") {
    gameScreen.classList.toggle("is-inn-scene-home", Boolean(detail.open));
    if (!detail.open) gameScreen.classList.remove("is-inn-scene-visit");
  }
  if (mealInfoCollect) {
    mealInfoCollect.hidden = !(detail.open && detail.facilityType === "주점");
    if (!mealInfoCollect.hidden) updateInformationButton(mealInfoCollect, "주점");
  }
  void handleNahanaEventFacilityChange(detail);
  handleTutorialFacilityChange(detail);
  updatePartnerUi();
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
});
window.addEventListener("projectw:mealopen", () => {
  handleTutorialMealOpen();
  refreshAdvancedTutorialLaunchers();
});
window.addEventListener("projectw:mealorderchange", event => {
  handleTutorialMealOrderChange(event.detail || {});
  scheduleInterfacePersistence();
});
window.addEventListener("projectw:mealtransitionstart", event => {
  const record = event.detail || {};
  if (isTutorialActive(5)) handleTutorialMealComplete(record);
});
window.addEventListener("projectw:mealcomplete", event => {
  const record = event.detail || {};
  void handleNahanaEventMealComplete(record);
  if (record.kind === "meal" && record.tier === "호화로운 만찬") queueNahanaSituationEvent("E_006");
  if (record.kind === "meal" && record.tier === "과식") queueNahanaSituationEvent("E_007");
  if (record.kind === "snack" && record.vendor === "시장") void showMarketSnackDialogue(record);
});
window.addEventListener("projectw:mealviewchange", event => {
  handleTutorialMealViewChange(event.detail || {});
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
});
window.addEventListener("projectw:entrytaxopen", () => handleTutorialEntryTaxOpen());
window.addEventListener("projectw:innviewchange", event => {
  handleTutorialInnViewChange(event.detail || {});
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
});
window.addEventListener("projectw:tradereviewopen", () => {
  if (isTutorialActive(6)) setTutorialStep(9);
  else if (shouldStartTutorial(TUTORIAL_IDS.TRADE_REVIEW)) startTutorial(TUTORIAL_IDS.TRADE_REVIEW);
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
});
window.addEventListener("projectw:tradereviewcomplete", () => {
  if (isTutorialActive(6)) completeTutorial(6);
  else if (isTutorialActive(TUTORIAL_IDS.TRADE_REVIEW)) completeTutorial(TUTORIAL_IDS.TRADE_REVIEW);
  scheduleInterfacePersistence();
});
window.addEventListener("projectw:tradeopen", event => {
  beginShopSideDialogueSession(event.detail || {});
  handleTutorialTradeOpen(event.detail || {});
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
});
window.addEventListener("projectw:tradeclose", () => {
  closeShopSideDialogueReview();
  shopSideDialogueEnabled = false;
  shopSideDialogueDismissAvailable = false;
  updateShopSideDialogueActions();
  latestTradeTutorialContext = null;
  refreshAdvancedTutorialLaunchers();
});
window.addEventListener("projectw:informationacquiredview", refreshAdvancedTutorialLaunchers);
window.addEventListener("projectw:cargochange", event => {
  if (account?.travel?.moving && !event.detail?.deterioration) {
    reconcileTravelProgress(false);
    if (account?.travel?.moving) {
      account.travel.progressRate = calculateTravelRate(currentScene, account.travel);
      account.travel.progressUpdatedAt = Date.now();
      persistAccount();
      syncTravelExperience();
      scheduleTravelStep();
    }
  }
  updateHorseFeedUi();
  updateRoadConditionUi();
  updatePartnerUi();
  if (account?.travel?.mode === "camp" && !campInProgress) renderCampSetup();
});
window.addEventListener("projectw:peddlerchange", event => {
  updateMerchantPathPointBadge(event.detail);
  const placement = activeServiceContext?.placement || currentSettlementPlacement();
  updateInformationButton(mealInfoCollect, "주점", placement);
  if (activeServiceContext) updateInformationButton(serviceInfoCollect, activeServiceContext.type, activeServiceContext.placement);
  window.ProjectWInn.refresh();
  const levels = Math.max(0, Math.trunc(Number(event.detail?.levels) || 0));
  if (levels > 0) {
    const level = Math.max(1, Math.trunc(Number(event.detail?.level) || 1));
    window.setTimeout(() => showGameNotice(`상인 레벨 상승 · ${level}레벨\n행상포인트 +${levels}`, "level-up"), 0);
  }
});

nameForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = nameInput.value.trim();
  const characterCount = Array.from(value).length;

  if (characterCount < 1) {
    showNameError("이름을 1글자 이상 입력해 주세요.");
    return;
  }
  if (characterCount > 10) {
    showNameError("이름은 최대 10글자까지 입력할 수 있습니다.");
    return;
  }

  pendingName = value;
  openNameConfirmation();
});

nameInput.addEventListener("input", () => {
  nameError.hidden = true;
});

nameCancel.addEventListener("click", () => {
  if (pendingNameContext === "initial") openOnboardingChoice();
  else closeDialog();
});

window.addEventListener("keydown", event => {
  const isTextInput = event.target instanceof HTMLElement
    && (event.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName));
  const isDialogControl = event.target instanceof Element
    && Boolean(event.target.closest("button, a, input, textarea, select, [contenteditable='true']"));
  if (!dialogModal.hidden && activeDialogueAdvance && !isTextInput && !isDialogControl
    && !event.altKey && !event.ctrlKey && !event.metaKey && !event.repeat
    && (event.code === "Space" || event.key === "Enter")) {
    event.preventDefault();
    event.stopPropagation();
    invokeDialogueAdvance();
    return;
  }
  if (window.ProjectWInn.isSceneVisit?.() && event.key === "Escape") {
    event.preventDefault();
    returnToInnScene();
    return;
  }
  const innNavigationKey = event.key.toLowerCase();
  if (window.ProjectWInn.isActive?.()
    && !innModal?.classList.contains("is-detail-view")
    && (innNavigationKey === "a" || innNavigationKey === "d")) {
    event.preventDefault();
    moveScene(innNavigationKey === "d" ? 1 : -1);
    return;
  }
  if (!partnerCommonSensePopup?.hidden && event.key === "Escape") {
    event.preventDefault();
    hidePartnerCommonSensePopup();
    return;
  }
  if (partnerEventPanel && !partnerEventPanel.hidden && event.key === "Escape") {
    event.preventDefault();
    closePartnerEventPanel();
    return;
  }
  if (!tavernCommentPopup?.hidden && event.key === "Escape") {
    event.preventDefault();
    hideTavernCommentPopup();
    return;
  }
  if (!partnerSnackPanel?.hidden && event.key === "Escape") {
    event.preventDefault();
    closePartnerSnackPanel();
    return;
  }
  if (!serviceModal?.hidden && event.key === "Escape") {
    event.preventDefault();
    closeServiceModal();
    return;
  }
  if (!dialogModal.hidden || !walletModal.hidden || !informationModal.hidden || !merchantPathModal.hidden || !memorialModal.hidden || !tradeModal.hidden || !mealModal.hidden || !innModal.hidden || !serviceModal.hidden || !entryTaxModal.hidden || !routeEventModal.hidden || (partnerEventPanel && !partnerEventPanel.hidden) || !sceneTransition.hidden || gameScreen.hidden || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
  if (isTextInput) return;
  if ((tutorialRuntime && tutorialLayer && !tutorialLayer.hidden)
    || (advancedTutorialRuntime && advancedTutorialLayer && !advancedTutorialLayer.hidden)) return;

  const key = event.key.toLowerCase();
  if (key === "z" && hasQuickTravelCode()) {
    event.preventDefault();
    advanceTravelSegmentByCode();
    return;
  }
  if (event.code === "Space" && currentScene === "road") {
    event.preventDefault();
    handleRoadAction();
    return;
  }
  if (key === "d") moveScene(1);
  if (key === "a") moveScene(-1);
});

document.addEventListener("visibilitychange", () => {
  if (!account) return;
  if (document.hidden) {
    reconcileTravelProgress(false);
    persistAccount();
  } else {
    reconcileTravelProgress();
  }
});
window.addEventListener("pagehide", () => {
  if (!account) return;
  freezeTravelProgressForSave();
  persistAccount();
});
window.addEventListener("beforeunload", () => {
  if (!account) return;
  freezeTravelProgressForSave();
  persistAccount();
});

function freezeTravelProgressForSave() {
  const travel = account?.travel;
  if (!travel?.moving) return;
  travel.segmentRemainingMs = liveSegmentRemainingMs(travel);
  travel.progressUpdatedAt = Date.now();
  clearTravelTimers();
}

function scheduleInterfacePersistence() {
  if (!account || gameScreen.hidden || restoringInterfaceState) return;
  window.clearTimeout(interfacePersistTimer);
  interfacePersistTimer = window.setTimeout(() => persistAccount(), 0);
}

document.addEventListener("click", scheduleInterfacePersistence);
document.addEventListener("change", scheduleInterfacePersistence);

function openOnboardingChoice() {
  setDialogCharacter("Asset_N_01");
  openDialog({
    speaker: "나하나",
    message: "내가 당신을 어떻게 부르면 될까?",
    showCharacter: true,
    actions: [
      { label: "당신", primary: true, onClick: chooseAnonymousName },
      { label: "이름 입력", onClick: () => openNameEntry("initial") }
    ]
  });
}

function chooseAnonymousName() {
  const now = new Date().toISOString();
  account = {
    schemaVersion: ACCOUNT_SCHEMA_VERSION,
    gameVersion: GAME_VERSION,
    worldSeed: createWorldSeed(),
    userName: "당신",
    namingChoice: "anonymous",
    nameLocked: false,
    introCompleted: false,
    wallet: createInitialWallet(),
    billNotes: window.ProjectWBillNotes.createState(),
    currencyMarket: null,
    travel: createInitialTravelState(),
    worldTime: createInitialWorldTime(),
    weatherSystem: window.ProjectWWeather.createState(),
    journeyEnvironment: createInitialJourneyEnvironment(),
    horse: createInitialHorseState(),
    horseFeedItemId: HORSE_FEED_IDS[0],
    partner: createInitialPartnerState(),
    partnerMoodAdjustment: 0,
    foodUsage: createInitialFoodUsage(),
    commonSenseUsage: createInitialCommonSenseUsage(),
    dialogueMemorial: createInitialDialogueMemorial(),
    talkCards: createInitialTalkCardState(),
    footprints: createInitialFootprints(),
    tutorialProgress: createNewJourneyTutorialProgress(),
    advancedTutorials: createInitialAdvancedTutorialState(skipTutorialsForNewJourney),
    nahanaEvents: createInitialNahanaEventState(),
    nahanaSituationEvents: createInitialNahanaSituationEventState(),
    partnerWeatherStreak: createInitialPartnerWeatherStreak(),
    informationUsage: createInitialInformationUsage(),
    informationState: window.ProjectWInformation.createState(),
    guildContribution: createInitialGuildContribution(),
    featureUnlocks: createInitialFeatureUnlocks(false),
    codeUnlocks: createInitialCodeUnlocks(),
    bargaining: createInitialBargainingState(1),
    innErrandState: {},
    wagon: createInitialWagonState(),
    settlementDialogueVisit: createInitialSettlementDialogueVisit(),
    interfaceState: createInitialInterfaceState(),
    cityEvents: window.ProjectWCityEvents.createState(1),
    routeEvents: window.ProjectWRouteEvents.createState(),
    wolfenCompany: window.ProjectWWolfenCompany.createState(),
    createdAt: now,
    updatedAt: now
  };
  window.ProjectWWallet.ensureMarketState(account.worldTime.day);
  persistAccount();
  prepareTravelExperience();
  updateAccountUi();
  setDialogCharacter("Asset_N_01");

  openDialog({
    speaker: "나하나",
    message: "이름 같은건 중요하지 않다는 거지?<br>알았어, 당신은 그냥 당신이야.<br>나중에 알려주고 싶으면 그때 가서 알려줘도 상관 없어.",
    showCharacter: true,
    actions: [{ label: "여행 시작", primary: true, onClick: startIntroSequence }]
  });
}

function openNameEntry(context) {
  pendingNameContext = context;
  pendingName = "";
  setDialogCharacter("Asset_N_01");
  openDialog({
    speaker: "나하나",
    message: context === "initial" ? "그럼, 네 이름을 알려줘." : "이제 이름을 알려주는 거야?",
    showCharacter: true,
    actions: []
  });

  dialogActions.hidden = true;
  nameForm.hidden = false;
  nameInput.value = "";
  nameError.hidden = true;
  requestAnimationFrame(() => nameInput.focus());
}

function openNameConfirmation() {
  openDialog({
    speaker: "이름 확정",
    message: `이름을 “${pendingName}”(으)로 확정하면 이후에는 변경할 수 없습니다. 이 이름으로 등록할까요?`,
    showCharacter: false,
    actions: [
      { label: "다시 입력", onClick: reopenPendingName },
      { label: "확정하기", primary: true, onClick: confirmName }
    ]
  });
}

function reopenPendingName() {
  const draft = pendingName;
  openNameEntry(pendingNameContext);
  nameInput.value = draft;
  nameInput.focus();
}

function confirmName() {
  const now = new Date().toISOString();
  const isInitialName = pendingNameContext === "initial" || !account;
  if (isInitialName) {
    account = {
      schemaVersion: ACCOUNT_SCHEMA_VERSION,
      gameVersion: GAME_VERSION,
      worldSeed: createWorldSeed(),
      userName: pendingName,
      namingChoice: "named",
      nameLocked: true,
      introCompleted: false,
      wallet: createInitialWallet(),
      billNotes: window.ProjectWBillNotes.createState(),
      currencyMarket: null,
      travel: createInitialTravelState(),
      worldTime: createInitialWorldTime(),
      weatherSystem: window.ProjectWWeather.createState(),
      journeyEnvironment: createInitialJourneyEnvironment(),
      horse: createInitialHorseState(),
      horseFeedItemId: HORSE_FEED_IDS[0],
      partner: createInitialPartnerState(),
      partnerMoodAdjustment: 0,
      foodUsage: createInitialFoodUsage(),
      commonSenseUsage: createInitialCommonSenseUsage(),
      dialogueMemorial: createInitialDialogueMemorial(),
      talkCards: createInitialTalkCardState(),
      footprints: createInitialFootprints(),
      tutorialProgress: createNewJourneyTutorialProgress(),
      advancedTutorials: createInitialAdvancedTutorialState(skipTutorialsForNewJourney),
      nahanaEvents: createInitialNahanaEventState(),
      nahanaSituationEvents: createInitialNahanaSituationEventState(),
      partnerWeatherStreak: createInitialPartnerWeatherStreak(),
      informationUsage: createInitialInformationUsage(),
      informationState: window.ProjectWInformation.createState(),
      guildContribution: createInitialGuildContribution(),
      featureUnlocks: createInitialFeatureUnlocks(false),
      codeUnlocks: createInitialCodeUnlocks(),
      bargaining: createInitialBargainingState(1),
      innErrandState: {},
      wagon: createInitialWagonState(),
      settlementDialogueVisit: createInitialSettlementDialogueVisit(),
      interfaceState: createInitialInterfaceState(),
      cityEvents: window.ProjectWCityEvents.createState(1),
      routeEvents: window.ProjectWRouteEvents.createState(),
      wolfenCompany: window.ProjectWWolfenCompany.createState(),
      createdAt: now,
      updatedAt: now
    };
    window.ProjectWWallet.ensureMarketState(account.worldTime.day);
  } else {
    account = {
      ...account,
      gameVersion: GAME_VERSION,
      userName: pendingName,
      namingChoice: "named",
      nameLocked: true,
      updatedAt: now
    };
  }

  persistAccount();
  prepareTravelExperience();
  updateAccountUi();
  setDialogCharacter("Asset_N_01");
  openDialog({
    speaker: "나하나",
    message: `${account.userName}... 응, 잘 부탁해, ${account.userName}.`,
    showCharacter: true,
    actions: [{
      label: isInitialName ? "여행 시작" : "계속",
      primary: true,
      onClick: isInitialName ? startIntroSequence : closeDialog
    }]
  });
}

async function startIntroSequence({ skipTransition = false } = {}) {
  closeDialog();
  gameScreen.classList.add("is-onboarding");
  if (!skipTransition) {
    sceneTransition.hidden = false;
    sceneTransition.classList.remove("is-dark");
  }

  const dialoguePromise = window.ProjectWDialogue.getDialogue("DL_001");
  if (!skipTransition) {
    requestAnimationFrame(() => sceneTransition.classList.add("is-dark"));
    await wait(1350);
  }

  try {
    const [dialogue] = await Promise.all([dialoguePromise, loadAssets()]);
    unlockDialogue("DL_001", true, dialogue);
    if (!skipTransition) await wait(650);
    gameScreen.classList.remove("is-onboarding");
    showScene("road", 1, false);
    playDialoguePages(dialogue.pages, finishIntro);
    if (dialogue.error) showGameNotice("대화 CSV를 갱신하지 못해 현재 등록된 대화를 사용합니다.");
  } catch (error) {
    console.error(error);
    gameScreen.classList.remove("is-onboarding");
    showScene("road", 1, false);
    showGameNotice("대화 데이터를 불러오지 못했습니다.");
  }

  if (!skipTransition) {
    sceneTransition.classList.remove("is-dark");
    await wait(1350);
    sceneTransition.hidden = true;
  }
}

function preloadImageSource(source) {
  if (!source) return Promise.resolve();
  return new Promise(resolve => {
    const image = new Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      resolve();
    };
    const timeout = window.setTimeout(finish, 5_000);
    image.onload = finish;
    image.onerror = finish;
    image.src = source;
    if (image.complete) finish();
  });
}

function dialoguePageAssetSource(page) {
  const assetId = dialoguePageCharacterAssetId(page);
  return assetId ? (assetMap.get(assetId) ?? assetFallbacks.get(assetId) ?? "") : "";
}

function dialoguePageCharacterAssetId(page) {
  const assetId = resolveDialogueAssetId(page);
  if (assetId && (assetMap.has(assetId) || assetFallbacks.has(assetId))) return assetId;
  const speaker = String(page?.speaker ?? "").trim();
  const normalizedSpeaker = speaker.toLowerCase();
  if (!speaker || normalizedSpeaker === "none" || isPlayerDialogueSpeaker(speaker)) return "";
  const imageCategory = String(page?.imageCategory || "").trim();
  return speaker.includes("나하나") || imageCategory === "컷신" ? "Asset_N_01" : "";
}

async function playDialoguePages(pages, onComplete = closeDialog, index = 0, options = {}) {
  const pageOptions = Array.isArray(options.dialogueLogEntries)
    ? options
    : { ...options, dialogueLogEntries: [] };
  const page = pages[index];
  const isLast = index === pages.length - 1;
  if (String(page?.text || "").trim() === "{{어두워졌다가 밝아지기}}") {
    await playSituationTransition("");
    if (isLast) onComplete?.();
    else await playDialoguePages(pages, onComplete, index + 1, pageOptions);
    return;
  }
  const rawSpeaker = String(page.speaker ?? "").trim();
  const isNarration = !rawSpeaker || rawSpeaker.toLowerCase() === "none";
  const isPlayerDialogue = isPlayerDialogueSpeaker(rawSpeaker);
  const assetId = dialoguePageCharacterAssetId(page);
  const renderedSpeaker = isNarration ? "" : replaceDialogueVariables(page.speaker, pageOptions.variables);
  const renderedMessage = replaceDialogueVariables(page.text, pageOptions.variables);
  pageOptions.dialogueLogEntries.push({
    speaker: cleanDialogueLogText(renderedSpeaker),
    message: cleanDialogueLogText(renderedMessage)
  });
  await preloadImageSource(dialoguePageAssetSource(page));
  setDialogCharacter(isNarration || isPlayerDialogue ? "" : assetId);
  openDialog({
    speaker: renderedSpeaker,
    message: renderedMessage,
    showCharacter: !isNarration && !isPlayerDialogue && Boolean(assetId),
    playerDialogue: isPlayerDialogue || isNarration,
    bottomDialogue: true,
    narration: false,
    skipAction: pageOptions.onSkip,
    advanceAction: isLast
      ? onComplete
      : () => void playDialoguePages(pages, onComplete, index + 1, pageOptions),
    dialogueLogEntries: pageOptions.dialogueLogEntries,
    actions: []
  });
  const nextPage = pages[index + 1];
  if (nextPage) void preloadImageSource(dialoguePageAssetSource(nextPage));
}

async function playDialogue(dialogueId, onComplete = closeDialog, options = {}) {
  if (activeTalkCardId && options.context !== "talk-card") return false;
  try {
    const [dialogue] = await Promise.all([window.ProjectWDialogue.getDialogue(dialogueId), loadAssets()]);
    if (activeTalkCardId && options.context !== "talk-card") return false;
    if (options.context === "nahana-event" && narrativePresentationBlocked()) return false;
    if (typeof options.appearanceCondition === "function") {
      const matches = dialogue.pages.some(page => options.appearanceCondition(page.appearanceCondition || ""));
      if (!matches) return false;
    }
    unlockDialogue(dialogueId, true, dialogue);
    const finishDialogue = () => {
      if (!options.replay) handleDialogueCompleted(dialogueId);
      onComplete?.();
    };
    const skipDialogue = options.onSkip
      ? () => {
          if (!options.replay) handleDialogueCompleted(dialogueId);
          options.onSkip();
        }
      : null;
    await playDialoguePages(dialogue.pages, finishDialogue, 0, {
      ...options,
      onSkip: skipDialogue,
      dialogueLogEntries: []
    });
    if (dialogue.error) showGameNotice("대화 CSV를 갱신하지 못해 현재 등록된 대화를 사용합니다.");
    return true;
  } catch (error) {
    console.error(error);
    showGameNotice("대화 데이터를 불러오지 못했습니다.");
    return false;
  }
}

async function playDialogueSegment(dialogueId, firstPage, lastPage = Number.POSITIVE_INFINITY, options = {}) {
  try {
    const [dialogue] = await Promise.all([window.ProjectWDialogue.getDialogue(dialogueId), loadAssets()]);
    const pages = dialogue.pages.filter((page, index) => {
      const pageNumber = Number.isFinite(Number(page.page)) ? Number(page.page) : index + 1;
      return pageNumber >= firstPage && pageNumber <= lastPage;
    });
    if (!pages.length) {
      showGameNotice(`${dialogueId}의 ${firstPage}페이지 이후 대화를 찾을 수 없습니다.`);
      return false;
    }
    return await new Promise(resolve => {
      let finished = false;
      const finishSegment = () => {
        if (finished) return;
        finished = true;
        if (options.completeDialogue) {
          unlockDialogue(dialogueId, true, dialogue);
          handleDialogueCompleted(dialogueId);
        }
        closeDialog();
        resolve(true);
      };
      const skipSegment = () => {
        options.onSkip?.();
        finishSegment();
      };
      void playDialoguePages(pages, finishSegment, 0, { ...options, onSkip: skipSegment, dialogueLogEntries: [] });
    });
  } catch (error) {
    console.error(error);
    showGameNotice("대화 데이터를 불러오지 못했습니다.");
    return false;
  }
}

function replaceDialogueVariables(text, variables = {}) {
  const currentPlacement = currentSettlementPlacement();
  const replacements = {
    User: dialogueUserDisplayName(),
    현재거점명: currentPlacement?.name
      || getPlacementName(account?.travel?.settlementId || account?.travel?.positionId)
      || "현재 거점",
    ...variables
  };
  const replacementLookup = new Map();
  Object.entries(replacements).forEach(([key, value]) => {
    replacementLookup.set(key, { key, value });
    replacementLookup.set(normalizeDialogueVariableKey(key), { key, value });
  });
  const replacementIndexes = new Map();
  const pattern = /\{\{([^{}]+)\}\}(\]?)((?:은\s*\/\s*는|는\s*\/\s*은|이\s*\/\s*가|가\s*\/\s*이|을\s*\/\s*를|를\s*\/\s*을|과\s*\/\s*와|와\s*\/\s*과|으로\s*\/\s*로|로\s*\/\s*으로|이랑\s*\/\s*랑|랑\s*\/\s*이랑|이야\s*\/\s*야|야\s*\/\s*이야|은는|는은|이가|가이|을를|를을|과와|와과|으로로|로으로|이랑랑|랑이랑|이야야|야이야|으로(?![가-힣])|로(?![가-힣])|이랑(?![가-힣])|랑(?![가-힣])|이야(?![가-힣])|야(?![가-힣])|이다|다(?![가-힣])|[은는이가을를과와](?![가-힣]))?)/g;
  return String(text ?? "").replace(pattern, (match, rawKey, closingBracket, particle) => {
    const raw = String(rawKey || "").trim();
    const candidates = [raw, raw.split(":")[0].trim()];
    const resolved = candidates
      .map(candidate => replacementLookup.get(candidate) || replacementLookup.get(normalizeDialogueVariableKey(candidate)))
      .find(Boolean);
    if (!resolved) return match;
    const { key, value: replacement } = resolved;
    const index = replacementIndexes.get(key) || 0;
    const selected = Array.isArray(replacement)
      ? replacement[Math.min(index, Math.max(0, replacement.length - 1))]
      : replacement;
    replacementIndexes.set(key, index + 1);
    const descriptor = selected && typeof selected === "object" ? selected : null;
    const value = String(descriptor?.value ?? selected ?? "");
    const display = String(descriptor?.display ?? value);
    const suffix = String(descriptor?.suffix ?? "");
    return `${display}${closingBracket || ""}${particle ? koreanParticle(value, particle) : ""}${suffix}`;
  });
}

function dialogueUserDisplayName() {
  const name = String(account?.userName || "").trim();
  if (!name || !account?.nameLocked || /^(?:user|player|사용자|플레이어)$/i.test(name)) return "당신";
  return name;
}

function normalizeDialogueVariableKey(value) {
  const normalized = String(value ?? "").trim().replace(/[\s_]+/g, "").toLowerCase();
  if (["user", "유저", "사용자", "플레이어"].includes(normalized)) return "user";
  if (["현재거점명", "거점명"].includes(normalized)) return "현재거점명";
  return normalized;
}

function isPlayerDialogueSpeaker(value) {
  return /\{\{\s*(?:user|유저|사용자|플레이어)\s*\}\}/i.test(String(value ?? ""));
}

function koreanParticle(value, particle) {
  const normalized = String(particle || "").replace(/[\s/]/g, "");
  const hasBatchim = hasKoreanFinalConsonant(value);
  if (["은", "는", "은는", "는은"].includes(normalized)) return hasBatchim ? "은" : "는";
  if (["이", "가", "이가", "가이"].includes(normalized)) return hasBatchim ? "이" : "가";
  if (["을", "를", "을를", "를을"].includes(normalized)) return hasBatchim ? "을" : "를";
  if (["과", "와", "과와", "와과"].includes(normalized)) return hasBatchim ? "과" : "와";
  if (["으로", "로", "으로로", "로으로"].includes(normalized)) return hasBatchim && !hasKoreanRieulFinalConsonant(value) ? "으로" : "로";
  if (["이랑", "랑", "이랑랑", "랑이랑"].includes(normalized)) return hasBatchim ? "이랑" : "랑";
  if (["이야", "야", "이야야", "야이야"].includes(normalized)) return hasBatchim ? "이야" : "야";
  if (normalized === "이다" || normalized === "다") return hasBatchim ? "이다" : "다";
  return particle;
}

function hasKoreanRieulFinalConsonant(value) {
  const cleaned = String(value ?? "").trim().replace(/[\s\]\[(){}<>「」『』“”‘’'".,!?…:;·]+$/g, "");
  const lastCharacter = [...cleaned].at(-1) || "";
  const codePoint = lastCharacter.codePointAt(0);
  return codePoint >= 0xAC00 && codePoint <= 0xD7A3 && ((codePoint - 0xAC00) % 28) === 8;
}

function hasKoreanFinalConsonant(value) {
  const cleaned = String(value ?? "").trim().replace(/[\s\]\[(){}<>「」『』“”‘’'".,!?…:;·]+$/g, "");
  const lastCharacter = [...cleaned].at(-1) || "";
  const codePoint = lastCharacter.codePointAt(0);
  if (codePoint >= 0xAC00 && codePoint <= 0xD7A3) return ((codePoint - 0xAC00) % 28) !== 0;
  if (/\d/.test(lastCharacter)) return new Set(["0", "1", "3", "6", "7", "8"]).has(lastCharacter);
  return false;
}

function wait(milliseconds) {
  return new Promise(resolve => window.setTimeout(resolve, milliseconds));
}

async function waitForSceneVisuals(images) {
  const imagePromises = images.filter(Boolean).map(image => {
    if (image.complete) {
      return typeof image.decode === "function" ? image.decode().catch(() => {}) : Promise.resolve();
    }
    return new Promise(resolve => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  });
  await Promise.race([Promise.all(imagePromises), wait(1500)]);
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

async function playSituationTransition(assetId = "", onDark = null) {
  sceneTransition.hidden = false;
  sceneTransition.classList.remove("is-dark");
  if (sceneSituationAsset) {
    sceneSituationAsset.classList.remove("is-visible");
    sceneSituationAsset.hidden = true;
    sceneSituationAsset.removeAttribute("src");
  }
  requestAnimationFrame(() => sceneTransition.classList.add("is-dark"));
  await wait(1350);

  try {
    if (typeof onDark === "function") await onDark();

    if (assetId) await loadAssets();
    const source = assetId ? (assetMap.get(assetId) ?? assetFallbacks.get(assetId) ?? "") : "";
    if (assetId && source && sceneSituationAsset) {
      sceneSituationAsset.dataset.assetId = assetId;
      sceneSituationAsset.src = source;
      sceneSituationAsset.alt = "상황 연출";
      sceneSituationAsset.hidden = false;
      await waitForSceneVisuals([sceneSituationAsset]);
      requestAnimationFrame(() => sceneSituationAsset.classList.add("is-visible"));
      await wait(2000);
      sceneSituationAsset.classList.remove("is-visible");
      await wait(600);
      sceneSituationAsset.hidden = true;
    } else {
      if (assetId && !source) {
        console.error(`상황 에셋을 찾을 수 없습니다: ${assetId}`);
        showGameNotice(`${assetId} 상황 에셋을 불러오지 못했습니다.`);
      }
      await wait(550);
    }
  } finally {
    sceneSituationAsset?.classList.remove("is-visible");
    if (sceneSituationAsset) sceneSituationAsset.hidden = true;
    sceneTransition.classList.remove("is-dark");
    await wait(1350);
    sceneTransition.hidden = true;
  }
}

function finishIntro() {
  account = {
    ...account,
    gameVersion: GAME_VERSION,
    introCompleted: true,
    updatedAt: new Date().toISOString()
  };
  persistAccount();
  prepareTravelExperience();
  setDialogCharacter("Asset_N_01");
  closeDialog();
  handleDialogueCompleted("DL_001");
}

function openOptionsDialog() {
  openDialog({
    speaker: "옵션",
    message: "게임 설정",
    showCharacter: false,
    actions: [
      { label: "계정 초기화", danger: true, onClick: openResetDialog },
      { label: "닫기", primary: true, onClick: closeDialog }
    ]
  });
  dialogCard.classList.add("is-options-dialog");
  if (optionsTabs) optionsTabs.hidden = false;
  window.ProjectWAudio.renderControls();
  setOptionsTab("sound");
}

function setOptionsTab(tab) {
  const activeTab = tab === "code" ? "code" : "sound";
  optionsTabButtons.forEach(button => {
    const active = button.dataset.optionsTab === activeTab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (optionsSoundPanel) optionsSoundPanel.hidden = activeTab !== "sound";
  if (optionsCodePanel) optionsCodePanel.hidden = activeTab !== "code";
  if (activeTab === "code") {
    renderOptionsCodeStatus();
    window.requestAnimationFrame(() => optionsCodeInput?.focus());
  }
}

function createInitialCodeUnlocks() {
  return { quickTravelStep: false };
}

function normalizeCodeUnlocks(value) {
  return { quickTravelStep: Boolean(value?.quickTravelStep) };
}

function hasQuickTravelCode() {
  return Boolean(normalizeCodeUnlocks(account?.codeUnlocks).quickTravelStep);
}

function renderOptionsCodeStatus(message = "", tone = "") {
  if (!optionsCodeStatus) return;
  const enabled = hasQuickTravelCode();
  optionsCodeStatus.textContent = message || (enabled
    ? "코드 적용됨 · 이동 중 Z 키로 다음 구간까지 이동"
    : "등록된 코드가 없습니다.");
  optionsCodeStatus.classList.toggle("is-success", tone === "success" || (enabled && tone !== "error"));
  optionsCodeStatus.classList.toggle("is-error", tone === "error");
}

function handleOptionsCodeSubmit(event) {
  event.preventDefault();
  if (!account) return;
  const code = String(optionsCodeInput?.value || "").trim();
  if (code !== "0782") {
    renderOptionsCodeStatus("유효하지 않은 코드입니다.", "error");
    optionsCodeInput?.select();
    return;
  }
  account.codeUnlocks = normalizeCodeUnlocks(account.codeUnlocks);
  account.codeUnlocks.quickTravelStep = true;
  persistAccount();
  if (optionsCodeInput) optionsCodeInput.value = "";
  renderOptionsCodeStatus("코드가 적용되었습니다. 이동 중 Z 키로 다음 구간까지 이동할 수 있습니다.", "success");
}

function openResetDialog() {
  if (!account) return;
  openDialog({
    speaker: "계정 초기화",
    message: "저장된 플레이어 이름과 게임 데이터를 모두 삭제합니다. 초기화한 데이터는 복구할 수 없습니다.",
    showCharacter: false,
    actions: [
      { label: "취소", onClick: closeDialog },
      { label: "초기화", danger: true, onClick: resetAccount }
    ]
  });
}

function clearSavedJourneyData() {
  window.clearTimeout(interfacePersistTimer);
  window.clearTimeout(pendingNarrativePresentationTimer);
  interfacePersistTimer = undefined;
  pendingNarrativePresentationTimer = 0;
  talkCardGenerationInProgress = 0;
  activeTalkCardId = "";
  nahanaEventOpeningId = "";
  pendingNahanaEventOpeningId = "";
  activeNahanaSituationEventId = "";
  restoringInterfaceState = false;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error(error);
  }
  window.ProjectWMerchantPath.reset();
  window.ProjectWMemorial.close(false);
  window.ProjectWCargo.reset();
  window.ProjectWWallet.close();
  window.ProjectWTrade.reset();
  window.ProjectWMeal.close();
  window.ProjectWInn.close();
  window.ProjectWEntryTax.close(false);
  window.ProjectWMapView.endDestinationSelection();
  gameScreen.classList.remove("is-destination-picking", "is-wagon-moving");
  travelPauseReasons.clear();
  clearTravelTimers();
  window.ProjectWMapView.setPlayerPosition("");
  lastMapFocusPositionId = "";
  account = null;
  syncTravelExperience();
  closeDialog();
  closePartnerSnackPanel();
  hidePartnerCommonSensePopup(true);
  gameScreen.classList.remove("is-onboarding");
}

function resetAccount() {
  clearSavedJourneyData();
  skipTutorialsForNewJourney = false;
  if (titleTutorialSkip) titleTutorialSkip.checked = false;
  updateAccountUi();
  gameScreen.hidden = true;
  titleScreen.hidden = false;
  syncAudioState();
  titleNotice.textContent = "계정 초기화가 완료되었습니다.";
  titleNotice.hidden = false;
}

function openDialog({
  speaker,
  message,
  showCharacter,
  playerDialogue = false,
  bottomDialogue = false,
  narration = false,
  skipAction = null,
  advanceAction = null,
  dialogueLogEntries: logEntries = null,
  actions = []
}) {
  pauseTravelClock("dialog");
  dialogModal.hidden = false;
  dialogCard.classList.remove("is-options-dialog", "is-event-completion", "is-narration", "is-dialogue-sequence", "is-log-open", "is-turn-back-confirm");
  if (optionsTabs) optionsTabs.hidden = true;
  optionsSoundPanel.hidden = true;
  if (optionsCodePanel) optionsCodePanel.hidden = true;
  dialogCard.classList.toggle("is-player-dialog", playerDialogue);
  dialogCard.classList.toggle("is-narration", narration);
  dialogCard.classList.toggle("without-character", !showCharacter && !playerDialogue && !bottomDialogue);
  dialogCharacter.hidden = !showCharacter || playerDialogue;
  dialogSpeaker.hidden = narration;
  dialogSpeaker.textContent = speaker;
  renderDialogMessage(message);
  nameForm.hidden = true;
  nameError.hidden = true;
  activeDialogueAdvance = typeof advanceAction === "function" ? advanceAction : null;
  dialogueAdvanceLocked = false;
  dialogCard.classList.toggle("is-dialogue-sequence", Boolean(activeDialogueAdvance));
  dialogActions.hidden = Boolean(activeDialogueAdvance);
  dialogActions.replaceChildren(...actions.map(createDialogButton));
  if (dialogAdvanceHint) dialogAdvanceHint.hidden = !activeDialogueAdvance;
  if (dialogLogToggle) {
    dialogLogToggle.hidden = !activeDialogueAdvance || !Array.isArray(logEntries) || !logEntries.length;
    dialogLogToggle.setAttribute("aria-expanded", "false");
  }
  if (dialogLogPanel) dialogLogPanel.hidden = true;
  if (activeDialogueAdvance) {
    renderDialogueLog(logEntries);
    dialogCard.tabIndex = 0;
  } else {
    dialogCard.removeAttribute("tabindex");
    dialogLogEntries?.replaceChildren();
  }
  if (dialogSkip) {
    dialogSkip.hidden = typeof skipAction !== "function";
    dialogSkip.onclick = typeof skipAction === "function" ? skipAction : null;
  }

  const firstButton = dialogActions.querySelector("button");
  if (firstButton) requestAnimationFrame(() => firstButton.focus());
  else if (activeDialogueAdvance) requestAnimationFrame(() => dialogCard.focus({ preventScroll: true }));
  refreshAdvancedTutorialLaunchers();
}

function renderDialogMessage(message) {
  renderFormattedText(dialogMessage, message);
}

function cleanDialogueLogText(value) {
  return String(value ?? "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/\[([^\[\]\r\n]*)\]/g, "$1")
    .replace(/\{\{([^{}]+)\}\}/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderDialogueLog(entries = []) {
  if (!dialogLogEntries) return;
  const rows = entries.map(entry => {
    const article = document.createElement("article");
    article.className = "dialog-log-entry";
    const speaker = cleanDialogueLogText(entry?.speaker);
    const message = cleanDialogueLogText(entry?.message);
    if (speaker) {
      const heading = document.createElement("strong");
      heading.textContent = speaker;
      article.append(heading);
    }
    const copy = document.createElement("p");
    copy.textContent = message;
    article.append(copy);
    return article;
  });
  dialogLogEntries.replaceChildren(...rows);
  requestAnimationFrame(() => { dialogLogEntries.scrollTop = dialogLogEntries.scrollHeight; });
}

function toggleDialogueLog(force) {
  if (!dialogLogPanel || !dialogLogToggle || !activeDialogueAdvance) return;
  const open = typeof force === "boolean" ? force : dialogLogPanel.hidden;
  dialogLogPanel.hidden = !open;
  dialogCard?.classList.toggle("is-log-open", open);
  dialogLogToggle.setAttribute("aria-expanded", String(open));
  if (open) dialogLogClose?.focus();
  else dialogCard?.focus({ preventScroll: true });
}

function invokeDialogueAdvance() {
  if (!activeDialogueAdvance || dialogueAdvanceLocked || !dialogLogPanel?.hidden) return;
  const action = activeDialogueAdvance;
  dialogueAdvanceLocked = true;
  Promise.resolve().then(action).catch(error => {
    console.error("대화 진행 중 오류가 발생했습니다.", error);
    dialogueAdvanceLocked = false;
  });
}

function handleDialogueCardClick(event) {
  if (!activeDialogueAdvance || !event.target.closest(".dialog-panel")) return;
  if (event.target.closest("button, a, input, textarea, select, [contenteditable='true']")) return;
  invokeDialogueAdvance();
}

function renderFormattedText(target, message) {
  if (!target) return;
  const source = String(message ?? "");
  const tokenPattern = /<br\s*\/?\s*>|\[([^\[\]\r\n]*)\]/gi;
  const fragment = document.createDocumentFragment();
  let sourceIndex = 0;
  let match;

  while ((match = tokenPattern.exec(source)) !== null) {
    if (match.index > sourceIndex) {
      fragment.append(document.createTextNode(source.slice(sourceIndex, match.index)));
    }

    if (match[0].startsWith("<")) {
      fragment.append(document.createElement("br"));
    } else {
      const emphasis = document.createElement("strong");
      emphasis.className = "dialog-emphasis";
      emphasis.textContent = match[1].trim();
      fragment.append(emphasis);
    }
    sourceIndex = tokenPattern.lastIndex;
  }

  if (sourceIndex < source.length) {
    fragment.append(document.createTextNode(source.slice(sourceIndex)));
  }
  target.replaceChildren(fragment);
}

function createDialogButton(action) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "dialog-button";
  if (action.primary) button.classList.add("dialog-button-primary");
  if (action.danger) button.classList.add("dialog-button-danger");
  button.textContent = action.label;
  button.addEventListener("click", action.onClick);
  return button;
}

function closeDialog() {
  dialogModal.hidden = true;
  dialogCard.classList.remove("is-options-dialog", "is-player-dialog", "is-event-completion", "is-narration", "is-dialogue-sequence", "is-log-open", "is-turn-back-confirm", "without-character");
  dialogCard.removeAttribute("tabindex");
  activeDialogueAdvance = null;
  dialogueAdvanceLocked = false;
  dialogSpeaker.hidden = false;
  if (optionsTabs) optionsTabs.hidden = true;
  optionsSoundPanel.hidden = true;
  if (optionsCodePanel) optionsCodePanel.hidden = true;
  dialogActions.replaceChildren();
  dialogActions.hidden = false;
  if (dialogAdvanceHint) dialogAdvanceHint.hidden = true;
  if (dialogLogToggle) {
    dialogLogToggle.hidden = true;
    dialogLogToggle.setAttribute("aria-expanded", "false");
  }
  if (dialogLogPanel) dialogLogPanel.hidden = true;
  dialogLogEntries?.replaceChildren();
  if (dialogSkip) {
    dialogSkip.hidden = true;
    dialogSkip.onclick = null;
  }
  nameForm.hidden = true;
  resumeTravelClock("dialog");
  refreshAdvancedTutorialLaunchers();
  schedulePendingNarrativePresentation();
}

function setDialogCharacter(assetId) {
  if (!assetId) {
    dialogCharacter.hidden = true;
    dialogCharacter.removeAttribute("src");
    delete dialogCharacter.dataset.assetId;
    return;
  }
  dialogCharacter.dataset.assetId = assetId;
  const source = assetMap.get(assetId) ?? assetFallbacks.get(assetId);
  if (source) {
    dialogCharacter.src = source;
    return;
  }
  dialogCharacter.hidden = true;
  dialogCharacter.removeAttribute("src");
  delete dialogCharacter.dataset.assetId;
}

function showNameError(message) {
  nameError.textContent = message;
  nameError.hidden = false;
  nameInput.focus();
}

function loadAccount() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed.userName !== "string" || !parsed.userName.trim()) return null;
    const storedSchemaVersion = Number(parsed.schemaVersion) || 1;
    let migrated = storedSchemaVersion < ACCOUNT_SCHEMA_VERSION;
    if (!String(parsed.worldSeed || "").trim()) migrated = true;
    parsed.worldSeed = normalizeWorldSeed(parsed.worldSeed);
    if (storedSchemaVersion < 7 && (!parsed.wallet || !Object.keys(parsed.wallet).length)) {
      parsed.wallet = createInitialWallet();
      migrated = true;
    }
    parsed.schemaVersion = Math.max(ACCOUNT_SCHEMA_VERSION, storedSchemaVersion);
    if (!parsed.billNotes) migrated = true;
    parsed.billNotes = window.ProjectWBillNotes.normalizeState(parsed.billNotes);
    if (!parsed.currencyMarket || typeof parsed.currencyMarket !== "object") {
      parsed.currencyMarket = null;
      migrated = true;
    }
    parsed.travel = normalizeTravelState(parsed.travel);
    parsed.worldTime = normalizeWorldTime(parsed.worldTime);
    parsed.weatherSystem = window.ProjectWWeather.normalizeState(parsed.weatherSystem);
    parsed.journeyEnvironment = normalizeJourneyEnvironment(parsed.journeyEnvironment, parsed.travel.positionId);
    parsed.horse = normalizeHorseState(parsed.horse);
    parsed.horseFeedItemId = LEGACY_HORSE_FEED_ID_MAP.get(parsed.horseFeedItemId) || parsed.horseFeedItemId;
    parsed.horseFeedItemId = HORSE_FEED_IDS.includes(parsed.horseFeedItemId) ? parsed.horseFeedItemId : HORSE_FEED_IDS[0];
    parsed.partnerMoodAdjustment = Number(parsed.partnerMoodAdjustment) || 0;
    if (storedSchemaVersion < 42 && parsed.partner && Number.isFinite(Number(parsed.partner.weight))) {
      parsed.partner.weight = 100 - clampNumber(Number(parsed.partner.weight), 0, 100, 50);
      migrated = true;
    }
    parsed.partner = normalizePartnerState(parsed.partner, parsed.partnerMoodAdjustment);
    parsed.partnerMoodAdjustment = parsed.partner.mood - 50;
    parsed.foodUsage = normalizeFoodUsage(parsed.foodUsage, parsed.worldTime);
    if (!parsed.commonSenseUsage) migrated = true;
    parsed.commonSenseUsage = normalizeCommonSenseUsage(parsed.commonSenseUsage, parsed.worldTime);
    if (!parsed.dialogueMemorial) migrated = true;
    parsed.dialogueMemorial = normalizeDialogueMemorial(parsed.dialogueMemorial);
    if (!parsed.talkCards) migrated = true;
    parsed.talkCards = normalizeTalkCardState(parsed.talkCards);
    if (!parsed.footprints) migrated = true;
    parsed.footprints = normalizeFootprints(parsed.footprints);
    if (parsed.introCompleted && !parsed.dialogueMemorial.unlockedIds.includes("DL_001")) {
      parsed.dialogueMemorial.unlockedIds.push("DL_001");
      migrated = true;
    }
    if (!parsed.tutorialProgress) {
      parsed.tutorialProgress = normalizeTutorialProgress({ reachedHirenbach: true });
      migrated = true;
    } else {
      parsed.tutorialProgress = normalizeTutorialProgress(parsed.tutorialProgress);
      if (storedSchemaVersion < 29 && parsed.tutorialProgress.activeId === 1 && parsed.tutorialProgress.step >= 6) {
        parsed.tutorialProgress.step += 2;
      }
      if (storedSchemaVersion < 29 && parsed.tutorialProgress.activeId === 2 && parsed.tutorialProgress.step >= 2) {
        parsed.tutorialProgress.step += 1;
      }
    }
    if (!parsed.advancedTutorials) migrated = true;
    parsed.advancedTutorials = normalizeAdvancedTutorialState(parsed.advancedTutorials);
    const beforeEarlyTalkCards = !parsed.tutorialProgress.earlyTutorialBranchReached;
    const orphanedTalkCardTutorial = !parsed.talkCards.hand.length
      && (parsed.tutorialProgress.talkCardTutorialPending
        || parsed.tutorialProgress.activeId === TUTORIAL_IDS.TALK_CARD);
    if (beforeEarlyTalkCards && (parsed.talkCards.hand.length || parsed.talkCards.campCardIds.length)) {
      parsed.talkCards = createInitialTalkCardState();
      parsed.tutorialProgress.talkCardTutorialPending = false;
      if (parsed.tutorialProgress.activeId === TUTORIAL_IDS.TALK_CARD) {
        parsed.tutorialProgress.activeId = 0;
        parsed.tutorialProgress.step = 0;
      }
      migrated = true;
    } else if (orphanedTalkCardTutorial) {
      parsed.tutorialProgress.talkCardTutorialPending = false;
      if (parsed.tutorialProgress.activeId === TUTORIAL_IDS.TALK_CARD) {
        parsed.tutorialProgress.activeId = 0;
        parsed.tutorialProgress.step = 0;
      }
      migrated = true;
    }
    if (!parsed.nahanaEvents) migrated = true;
    parsed.nahanaEvents = normalizeNahanaEventState(parsed.nahanaEvents);
    if (!parsed.nahanaSituationEvents) migrated = true;
    parsed.nahanaSituationEvents = normalizeNahanaSituationEventState(parsed.nahanaSituationEvents);
    parsed.partnerWeatherStreak = normalizePartnerWeatherStreak(parsed.partnerWeatherStreak);
    parsed.informationUsage = normalizeInformationUsage(parsed.informationUsage, parsed.worldTime);
    if (!parsed.informationState) migrated = true;
    parsed.informationState = window.ProjectWInformation.normalizeState(parsed.informationState);
    if (!parsed.guildContribution) migrated = true;
    parsed.guildContribution = normalizeGuildContribution(parsed.guildContribution);
    if (!parsed.featureUnlocks) migrated = true;
    parsed.featureUnlocks = normalizeFeatureUnlocks(parsed.featureUnlocks, false);
    if (!parsed.codeUnlocks) migrated = true;
    parsed.codeUnlocks = normalizeCodeUnlocks(parsed.codeUnlocks);
    const firstEventRewardConfirmed = parsed.nahanaEvents.completedIds.includes("N_E_001")
      && parsed.nahanaEvents.pendingRewardId !== "N_E_001";
    if (firstEventRewardConfirmed && !parsed.featureUnlocks.permanentBlessing) {
      parsed.featureUnlocks.permanentBlessing = true;
      migrated = true;
    }
    if (storedSchemaVersion < 29 && firstEventRewardConfirmed) {
      const settlementId = parsed.travel.settlementId || parsed.travel.positionId;
      const leftHirenbach = !(parsed.travel.mode === "settlement" && settlementId === FIRST_TUTORIAL_DESTINATION_ID);
      if (leftHirenbach) {
        parsed.featureUnlocks.partnerSnack = true;
        parsed.tutorialProgress.earlyTutorialBranchReached = true;
      }
      migrated = true;
    }
    parsed.bargaining = normalizeBargainingState(parsed.bargaining, parsed.worldTime);
    parsed.innErrandState = normalizeInnErrandState(parsed.innErrandState);
    parsed.wagon = normalizeWagonState(parsed.wagon);
    parsed.settlementDialogueVisit = normalizeSettlementDialogueVisit(parsed.settlementDialogueVisit);
    if (!parsed.interfaceState) migrated = true;
    parsed.interfaceState = normalizeInterfaceState(parsed.interfaceState);
    if (!parsed.cityEvents) migrated = true;
    parsed.cityEvents = window.ProjectWCityEvents.normalizeState(parsed.cityEvents, parsed.worldTime.day);
    if (!parsed.routeEvents) migrated = true;
    parsed.routeEvents = window.ProjectWRouteEvents.normalizeState(parsed.routeEvents);
    if (!parsed.wolfenCompany) migrated = true;
    parsed.wolfenCompany = window.ProjectWWolfenCompany.normalizeState(parsed.wolfenCompany);
    if (migrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function persistAccount() {
  try {
    if (account) {
      if (!restoringInterfaceState && !gameScreen?.hidden) captureInterfaceState();
      account.gameVersion = GAME_VERSION;
      account.schemaVersion = Math.max(ACCOUNT_SCHEMA_VERSION, Number(account.schemaVersion) || 1);
      account.updatedAt = new Date().toISOString();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  } catch (error) {
    console.error(error);
    showGameNotice("브라우저 저장소에 계정을 저장하지 못했습니다.");
  }
}

function createInitialInterfaceState() {
  return {
    scene: "road",
    partnerAppetiteOpen: false,
    camp: {
      setupOpen: false,
      mealInstanceIds: [],
      utilityInstanceIds: [],
      riskConfirmationOpen: false
    },
    overlay: null
  };
}

function normalizeInterfaceState(value) {
  const initial = createInitialInterfaceState();
  if (!value || typeof value !== "object") return initial;
  const scene = sceneOrder.includes(value.scene) ? value.scene : "road";
  const camp = value.camp && typeof value.camp === "object" ? value.camp : {};
  const normalizeIds = entries => [...new Set((Array.isArray(entries) ? entries : [])
    .map(entry => String(entry || "").trim())
    .filter(Boolean))];
  const overlay = value.overlay && typeof value.overlay === "object" && String(value.overlay.type || "").trim()
    ? JSON.parse(JSON.stringify(value.overlay))
    : null;
  return {
    scene,
    partnerAppetiteOpen: Boolean(value.partnerAppetiteOpen),
    camp: {
      setupOpen: Boolean(camp.setupOpen),
      mealInstanceIds: normalizeIds(camp.mealInstanceIds),
      utilityInstanceIds: normalizeIds(camp.utilityInstanceIds),
      riskConfirmationOpen: Boolean(camp.riskConfirmationOpen)
    },
    overlay
  };
}

function captureInterfaceState() {
  if (!account) return createInitialInterfaceState();
  let overlay = null;
  const moduleResumeState = (module, type) => {
    try {
      const state = module?.getResumeState?.();
      return state ? { type, state } : null;
    } catch (error) {
      console.error(`${type} 화면 상태를 저장하지 못했습니다.`, error);
      return null;
    }
  };

  if (!entryTaxModal?.hidden) overlay = moduleResumeState(window.ProjectWEntryTax, "entry-tax");
  else if (!mealModal?.hidden) overlay = moduleResumeState(window.ProjectWMeal, "meal");
  else if (window.ProjectWInn?.isActive?.()) overlay = moduleResumeState(window.ProjectWInn, "inn");
  else if (!tradeModal?.hidden) overlay = moduleResumeState(window.ProjectWTrade, "trade");
  else if (!serviceModal?.hidden && activeServiceContext) {
    overlay = {
      type: "service",
      state: {
        facilityType: activeServiceContext.type,
        facilityLabel: activeServiceContext.label,
        view: activeServiceView,
        contributionOffer: [...serviceContributionOffer.entries()],
        billNoteSelection: [...serviceBillNoteSelection.entries()],
        billNoteMode: serviceBillNoteMode
      }
    };
  } else if (!walletModal?.hidden) overlay = moduleResumeState(window.ProjectWWallet, "wallet");
  else if (!informationModal?.hidden) overlay = { type: "information" };
  else if (!merchantPathModal?.hidden) overlay = moduleResumeState(window.ProjectWMerchantPath, "merchant-path");
  else if (!memorialModal?.hidden) overlay = moduleResumeState(window.ProjectWMemorial, "memorial");
  else if (!dialogModal?.hidden && dialogCard?.classList.contains("is-options-dialog")) overlay = { type: "options" };
  else if (partnerEventPanel && !partnerEventPanel.hidden) overlay = { type: "partner-event" };
  else if (partnerFeaturePanel && !partnerFeaturePanel.hidden && activePartnerFeature) {
    overlay = { type: "partner-feature", state: { feature: activePartnerFeature } };
  } else if (partnerSnackPanel && !partnerSnackPanel.hidden) overlay = { type: "partner-snack" };

  account.interfaceState = {
    scene: currentScene,
    partnerAppetiteOpen,
    camp: {
      setupOpen: account.travel?.mode === "camp" && campSetupOpen,
      mealInstanceIds: [...campMealInstanceIds],
      utilityInstanceIds: [...campUtilityInstanceIds],
      riskConfirmationOpen: account.travel?.mode === "camp" && campSetupOpen && Boolean(campRiskConfirm && !campRiskConfirm.hidden)
    },
    overlay
  };
  return account.interfaceState;
}

function restoreMapEntries(target, entries) {
  target.clear();
  (Array.isArray(entries) ? entries : []).forEach(entry => {
    if (!Array.isArray(entry) || entry.length < 2) return;
    const key = String(entry[0] || "").trim();
    const quantity = Math.max(0, Math.trunc(Number(entry[1]) || 0));
    if (key && quantity > 0) target.set(key, quantity);
  });
}

async function restoreInterfaceState(savedValue) {
  if (!account || gameScreen.hidden) return false;
  try {
    const saved = normalizeInterfaceState(savedValue);
    currentScene = saved.scene;
    partnerAppetiteOpen = saved.partnerAppetiteOpen;
    campSetupOpen = account.travel?.mode === "camp" && saved.camp.setupOpen;
    campMealInstanceIds = new Set(campSetupOpen ? saved.camp.mealInstanceIds : []);
    campUtilityInstanceIds = new Set(campSetupOpen ? saved.camp.utilityInstanceIds : []);
    if (campSetupOpen && isTutorialActive(2)) {
      const inventory = window.ProjectWCargo.getInventoryItems();
      tutorialCampMealSelections = new Set(inventory
        .filter(item => campMealInstanceIds.has(item.instanceId))
        .map(item => item.itemId));
    }
    showScene(currentScene, 1, false);
    syncTravelExperience();
    if (campSetupOpen) {
      renderCampSetup();
      if (campRiskConfirm) campRiskConfirm.hidden = !saved.camp.riskConfirmationOpen;
    }
    renderPartnerAppetite();

    const overlay = saved.overlay;
    if (!overlay?.type) return true;
    const placement = currentSettlementPlacement();
    if (overlay.type === "wallet") window.ProjectWWallet.restoreResumeState?.(overlay.state);
    else if (overlay.type === "information") window.ProjectWInformation.open();
    else if (overlay.type === "merchant-path") await window.ProjectWMerchantPath.restoreResumeState?.(overlay.state);
    else if (overlay.type === "memorial") await window.ProjectWMemorial.restoreResumeState?.(overlay.state);
    else if (overlay.type === "options") openOptionsDialog();
    else if (overlay.type === "partner-event" && currentScene === "partner") openPartnerEventPanel();
    else if (overlay.type === "partner-feature" && currentScene === "partner") {
      openPartnerFeature(String(overlay.state?.feature || ""));
    } else if (overlay.type === "partner-snack" && currentScene === "partner") {
      await openPartnerSnackPanel();
    } else if (overlay.type === "service" && placement) {
      const type = String(overlay.state?.facilityType || "");
      const label = String(overlay.state?.facilityLabel || type);
      if (["주점", "상업조합"].includes(type)) {
        openServiceModal(placement, type, label, { resumeTavernVisit: type === "주점" });
        restoreMapEntries(serviceContributionOffer, overlay.state?.contributionOffer);
        restoreMapEntries(serviceBillNoteSelection, overlay.state?.billNoteSelection);
        serviceBillNoteMode = overlay.state?.billNoteMode === "redeem" ? "redeem" : "issue";
        setServiceView(String(overlay.state?.view || "home"));
      }
    } else if (overlay.type === "trade" && placement) {
      await window.ProjectWTrade.restoreResumeState?.(overlay.state, { settlement: placement });
    } else if (overlay.type === "meal" && placement) {
      const vendor = String(overlay.state?.vendor || "주점");
      await window.ProjectWMeal.restoreResumeState?.(overlay.state, {
        settlement: placement,
        onReturn: vendor === "여관"
          ? () => window.ProjectWInn.open({ settlement: placement })
          : vendor === "주점"
            ? () => openServiceModal(placement, "주점", "주점", { resumeTavernVisit: true })
            : null
      });
    } else if (overlay.type === "inn" && placement) {
      await window.ProjectWInn.restoreResumeState?.(overlay.state, { settlement: placement });
      if (window.ProjectWInn.isSceneVisit?.()) {
        gameScreen.classList.remove("is-inn-scene-home");
        gameScreen.classList.add("is-inn-scene-visit");
        applyInnSceneBackgroundContext();
      }
    } else if (overlay.type === "entry-tax") {
      await enterSettlement();
      window.ProjectWEntryTax.restoreResumeState?.(overlay.state);
    }
    return true;
  } catch (error) {
    console.error("저장된 화면을 복원하지 못했습니다.", error);
    showGameNotice("이전 진행 상황은 유지했지만 열려 있던 화면 하나를 복원하지 못했습니다.");
    return false;
  }
}

function createInitialWallet() {
  return { ...INITIAL_WALLET };
}

function updateAccountUi() {
  const anonymous = account?.userName === "당신" && !account?.nameLocked;
  playerNameButton.textContent = account?.userName === "당신" || !account ? "플레이어" : account.userName;
  playerNameButton.disabled = !anonymous;
  playerNameButton.title = anonymous ? "이름 확정" : account ? "확정된 이름은 변경할 수 없습니다" : "계정이 없습니다";
  resumeButton.disabled = !account;
  resumeButton.setAttribute("aria-disabled", String(!account));
  resumeButton.title = account ? "저장된 여정을 계속합니다" : "저장된 여정이 없습니다";
  titleScreen.classList.toggle("has-saved-journey", Boolean(account));
  if (memorialButton) memorialButton.disabled = !account;
  updateMerchantPathPointBadge();
  updateGameClock();
  updatePartnerUi();
  updateCargoWagonUi();
  window.ProjectWWallet.refresh();
  window.ProjectWInformation.refresh();
  refreshAdvancedTutorialLaunchers();
}

function updateMerchantPathPointBadge(profile = window.ProjectWMerchantPath?.getPeddlerProfile?.()) {
  if (!merchantPathButton) return;
  const points = Math.max(0, Math.trunc(Number(profile?.points) || 0));
  merchantPathButton.classList.toggle("has-peddler-points", points > 0);
  merchantPathButton.dataset.availablePeddlerPoints = String(points);
  merchantPathButton.title = points > 0 ? `사용 가능한 행상포인트 ${points}` : "";
}

function partnerMoodPresentation(mood) {
  const value = clampNumber(Number(mood), 0, 100, 50);
  if (value <= 24) return { label: "화남", assetId: "Asset_N_14" };
  if (value <= 49) return { label: "불만", assetId: "Asset_N_05" };
  if (value <= 74) return { label: "통상", assetId: "Asset_N_01" };
  return { label: "좋은 상태", assetId: "Asset_N_01" };
}

function partnerMealFullnessRestriction(partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment)) {
  const candidates = [
    { name: "숙취", maximum: 100 },
    { name: "과식", maximum: 100 },
    { name: "고혈당", maximum: 150 },
    { name: "속쓰림", maximum: 100 }
  ].filter(rule => partnerHasStatus(partner, rule.name));
  if (!candidates.length) return { maximum: 0, reason: "" };
  candidates.sort((left, right) => left.maximum - right.maximum);
  const maximum = candidates[0].maximum;
  return {
    maximum,
    reason: candidates.filter(rule => rule.maximum === maximum).map(rule => rule.name).join(" · ")
  };
}

function partnerAppetiteStageIndex(value) {
  const normalized = clampNumber(Number(value), 0, 100, 50);
  return Math.min(PARTNER_APPETITE_STAGES.length - 1, Math.floor(normalized / 20));
}

function partnerAppetiteSnapshot(partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment)) {
  const parameters = [
    { key: "sweet", label: "단맛", value: partner.sweet },
    { key: "salty", label: "짠맛", value: partner.salty },
    { key: "stimulus", label: "자극", value: partner.stimulus },
    { key: "weight", label: "기름짐", value: partner.weight }
  ].map(entry => ({
    ...entry,
    stageIndex: partnerAppetiteStageIndex(entry.value),
    stage: PARTNER_APPETITE_STAGES[partnerAppetiteStageIndex(entry.value)]
  }));
  const statuses = partner.effects.flatMap(effect => {
    const key = String(effect || "").trim();
    const definition = nahanaStatusDefinitions.get(key) || null;
    const id = definition?.id || key;
    if (!PARTNER_APPETITE_STATUS_IDS.has(id)) return [];
    return [{
      id,
      name: definition?.name || key,
      category: definition?.category || "상태",
      description1: definition?.description1 || "",
      description2: definition?.description2 || "",
      duration: definition?.duration || ""
    }];
  });
  return { parameters, stages: [...PARTNER_APPETITE_STAGES], statuses };
}

function renderPartnerAppetite() {
  if (!partnerAppetiteToggle || !partnerAppetitePanel || !partnerAppetiteLevels || !partnerAppetiteEffects) return;
  const snapshot = partnerAppetiteSnapshot();
  partnerAppetiteToggle.setAttribute("aria-expanded", String(partnerAppetiteOpen));
  partnerAppetiteToggle.classList.toggle("is-active", partnerAppetiteOpen);
  partnerAppetitePanel.hidden = !partnerAppetiteOpen;
  partnerAppetiteLevels.replaceChildren(...snapshot.parameters.map(parameter => {
    const row = document.createElement("section");
    row.className = "partner-appetite-row";
    const label = document.createElement("strong");
    label.textContent = parameter.label;
    const stages = document.createElement("div");
    stages.className = "partner-appetite-stage-buttons";
    stages.classList.toggle("has-taste-direction-guide", parameter.key === "sweet");
    [...snapshot.stages].map((stage, index) => ({ stage, index })).reverse().forEach(({ stage, index }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.tabIndex = -1;
      button.textContent = stage;
      button.classList.toggle("is-active", index === parameter.stageIndex);
      button.setAttribute("aria-pressed", String(index === parameter.stageIndex));
      stages.append(button);
    });
    row.append(label, stages);
    return row;
  }));
  partnerAppetiteEffects.replaceChildren();
  partnerAppetiteEffects.hidden = snapshot.statuses.length === 0;
  if (snapshot.statuses.length) {
    const label = document.createElement("strong");
    label.textContent = "식욕 관련 상태";
    const badges = document.createElement("div");
    badges.className = "partner-appetite-effect-badges";
    snapshot.statuses.forEach(status => badges.append(createPartnerStatusBadge(status.id, "is-appetite-status")));
    partnerAppetiteEffects.append(label, badges);
  }
}

function updatePartnerUi() {
  let partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  partner.activeBuffs = partner.activeBuffs.filter(buff => buff.expiresDay > normalizeWorldTime(account?.worldTime).day);
  if (account) {
    account.partner = partner;
    syncMoodDrivenPartnerStatuses();
    partner = account.partner;
  }
  if (partnerTouchPopup && !partnerTouchPopup.hidden && partnerHasStatus(partner, "추가 수면")) {
    resetPartnerTouchSequence();
    hidePartnerTouchDialogue(true);
  }
  const presentation = partnerMoodPresentation(partner.mood);
  if (partnerRank) partnerRank.textContent = String(partner.companionRank);
  if (partnerRankExperience) {
    const requirement = companionExperienceRequirement(partner.companionRank);
    partnerRankExperience.textContent = requirement > 0
      ? `${partner.companionExperience} / ${requirement}`
      : `${partner.companionExperience} · 최고 등급`;
  }
  const moodValue = Math.round(clampNumber(partner.mood, 0, 100, 50));
  if (partnerMoodValue) partnerMoodValue.textContent = `${moodValue} / 100`;
  if (partnerMoodLabel) partnerMoodLabel.textContent = presentation.label;
  if (partnerMoodGauge) {
    partnerMoodGauge.dataset.moodState = presentation.label;
    partnerMoodGauge.setAttribute("aria-valuenow", String(moodValue));
    partnerMoodGauge.setAttribute("aria-valuetext", `${presentation.label} ${moodValue}`);
  }
  if (partnerMoodFill) partnerMoodFill.style.width = `${moodValue}%`;
  renderPartnerAppetite();
  if (partnerSpiritValue) partnerSpiritValue.textContent = `${partner.spirit} / ${companionSpiritMaximum(partner.companionRank)}`;
  updatePartnerCharacterUi(presentation);
  renderPartnerStatusEffects(partner.effects);
  updatePartnerAccessUi(partner, presentation);
  renderPartnerTalkCards();
  updatePartnerEventUi();
  if (activePartnerFeature) renderPartnerFeature();
  if (!gameScreen.hidden) evaluatePartnerParameterFootprints();
}

function updatePartnerCharacterUi(presentation = partnerMoodPresentation(normalizePartnerState(account?.partner, account?.partnerMoodAdjustment).mood)) {
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  const statusOverride = partnerStatusCharacterOverride(partner);
  const snackOpen = Boolean(partnerSnackPanel && !partnerSnackPanel.hidden);
  const featureOpen = Boolean(activePartnerFeature && partnerFeaturePanel && !partnerFeaturePanel.hidden);
  const assetId = statusOverride?.assetId || partnerTouchCharacterAssetId || (featureOpen ? "Asset_N_11" : snackOpen ? "Asset_N_08" : presentation.assetId);
  if (partnerCharacter) {
    partnerCharacter.dataset.assetId = assetId;
    partnerCharacter.alt = statusOverride
      ? `${statusOverride.label} 상태의 나하나`
      : partnerTouchCharacterAssetId
        ? "터치에 반응하는 나하나"
        : featureOpen
        ? "정령의 힘을 다루는 나하나"
        : snackOpen
          ? "간식을 고르는 나하나"
          : `${presentation.label} 상태의 나하나`;
    const source = assetMap.get(assetId) ?? assetFallbacks.get(assetId);
    if (source) partnerCharacter.src = source;
  }
}

function applyPartnerTouchCharacterAsset(page) {
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  const statusOverride = partnerStatusCharacterOverride(partner);
  const statusLocksCharacterAsset = Boolean(statusOverride)
    || PARTNER_SICK_STATUS_NAMES.some(name => partnerHasStatus(partner, name));
  const assetId = statusLocksCharacterAsset ? "" : resolveDialogueAssetId(page);
  const source = assetId ? (assetMap.get(assetId) ?? assetFallbacks.get(assetId)) : "";
  partnerTouchCharacterAssetId = source ? assetId : "";
  updatePartnerCharacterUi();
}

function restorePartnerTouchCharacterAsset() {
  if (!partnerTouchCharacterAssetId) return;
  partnerTouchCharacterAssetId = "";
  updatePartnerCharacterUi();
}

function createPartnerTouchPools() {
  return { normal: [], continuous: [], end: [], unhappy: [], error: null };
}

async function loadPartnerTouchDialogues() {
  if (partnerTouchDialogueLoadPromise) return partnerTouchDialogueLoadPromise;
  partnerTouchDialogueLoadPromise = (async () => {
    const pools = createPartnerTouchPools();
    try {
      const dialogueIds = await window.ProjectWDialogue.getDialogueIds("DL_Touch_");
      const dialogues = await Promise.all(dialogueIds.map(async dialogueId => ({
        dialogueId,
        dialogue: await window.ProjectWDialogue.getDialogue(dialogueId)
      })));
      dialogues.forEach(({ dialogueId, dialogue }) => {
        const page = dialogue.pages?.[0];
        if (!page) return;
        const condition = String(page.appearanceCondition || "").trim();
        const entry = { dialogueId, page };
        if (condition.includes("불만")) pools.unhappy.push(entry);
        else if (condition.includes("종료")) pools.end.push(entry);
        else if (condition.includes("연속")) pools.continuous.push(entry);
        else pools.normal.push(entry);
        if (dialogue.error) pools.error = dialogue.error;
      });
    } catch (error) {
      pools.error = error;
      console.error("터치 대화를 불러오지 못했습니다.", error);
    }
    return pools;
  })();
  return partnerTouchDialogueLoadPromise;
}

function selectPartnerTouchDialogue(pool) {
  if (!Array.isArray(pool) || !pool.length) return null;
  const candidates = pool.length > 1
    ? pool.filter(entry => entry.dialogueId !== lastPartnerTouchDialogueId)
    : pool;
  const selected = candidates[Math.floor(Math.random() * candidates.length)] || pool[0];
  lastPartnerTouchDialogueId = selected?.dialogueId || "";
  return selected;
}

async function showPartnerTouchDialogue(kind) {
  if (!partnerTouchPopup || !partnerTouchMessage || currentScene !== "partner") return false;
  const pools = await loadPartnerTouchDialogues();
  const selected = selectPartnerTouchDialogue(pools[kind]);
  if (!selected) {
    if (!partnerTouchDataWarningShown) {
      partnerTouchDataWarningShown = true;
      showGameNotice("Dialogue 시트에서 사용할 수 있는 터치 대화를 찾지 못했습니다.");
    }
    return false;
  }
  if (currentScene !== "partner") return false;

  window.clearTimeout(partnerTouchPopupTimer);
  window.clearTimeout(partnerTouchPopupHideTimer);
  partnerTouchPopup.hidden = false;
  partnerTouchPopup.classList.remove("is-leaving");
  renderFormattedText(partnerTouchMessage, replaceDialogueVariables(selected.page.text));
  applyPartnerTouchCharacterAsset(selected.page);
  requestAnimationFrame(() => requestAnimationFrame(() => partnerTouchPopup.classList.add("is-visible")));
  partnerTouchPopupTimer = window.setTimeout(() => hidePartnerTouchDialogue(), PARTNER_TOUCH_DIALOG_DURATION_MS);
  return true;
}

function hidePartnerTouchDialogue(immediate = false) {
  restorePartnerTouchCharacterAsset();
  if (!partnerTouchPopup || partnerTouchPopup.hidden) return;
  window.clearTimeout(partnerTouchPopupTimer);
  window.clearTimeout(partnerTouchPopupHideTimer);
  if (immediate) {
    partnerTouchPopup.classList.remove("is-visible", "is-leaving");
    partnerTouchPopup.hidden = true;
    return;
  }
  partnerTouchPopup.classList.remove("is-visible");
  partnerTouchPopup.classList.add("is-leaving");
  partnerTouchPopupHideTimer = window.setTimeout(() => {
    partnerTouchPopup.hidden = true;
    partnerTouchPopup.classList.remove("is-leaving");
  }, 360);
}

function resetPartnerTouchSequence() {
  window.clearTimeout(partnerTouchEndTimer);
  partnerTouchEndTimer = 0;
  partnerTouchTimestamps = [];
  partnerTouchSequenceActive = false;
}

function schedulePartnerTouchEndDialogue() {
  window.clearTimeout(partnerTouchEndTimer);
  partnerTouchEndTimer = window.setTimeout(() => {
    partnerTouchEndTimer = 0;
    if (!partnerTouchSequenceActive) return;
    partnerTouchSequenceActive = false;
    partnerTouchTimestamps = [];
    const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
    const moodState = partnerMoodPresentation(partner.mood).label;
    const unableToReact = partnerHasStatus(partner, "추가 수면");
    const unhappyReaction = partnerUsesUnhappyTouchReaction(partner);
    if (currentScene === "partner" && !unableToReact && !unhappyReaction && (moodState === "통상" || moodState === "좋은 상태")) {
      void showPartnerTouchDialogue("end");
    }
  }, PARTNER_TOUCH_CHAIN_WINDOW_MS);
}

async function loadPartnerCharacterHitMap(image) {
  const source = image?.currentSrc || image?.src || "";
  if (!source) return null;
  if (partnerCharacterHitMapCache.has(source)) return partnerCharacterHitMapCache.get(source);

  const promise = new Promise(resolve => {
    const probe = new Image();
    probe.crossOrigin = "anonymous";
    probe.onload = () => {
      try {
        const maximumSide = 512;
        const scale = Math.min(1, maximumSide / Math.max(probe.naturalWidth, probe.naturalHeight));
        const width = Math.max(1, Math.round(probe.naturalWidth * scale));
        const height = Math.max(1, Math.round(probe.naturalHeight * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) {
          resolve(null);
          return;
        }
        context.drawImage(probe, 0, 0, width, height);
        context.getImageData(0, 0, 1, 1);
        resolve({ context, width, height, naturalWidth: probe.naturalWidth, naturalHeight: probe.naturalHeight });
      } catch {
        resolve(null);
      }
    };
    probe.onerror = () => resolve(null);
    probe.src = source;
  });
  partnerCharacterHitMapCache.set(source, promise);
  return promise;
}

async function isPartnerCharacterPaintedAt(image, clientX, clientY) {
  if (!image || !Number.isFinite(clientX) || !Number.isFinite(clientY)) return true;
  const bounds = image.getBoundingClientRect();
  if (clientX < bounds.left || clientX > bounds.right || clientY < bounds.top || clientY > bounds.bottom) return false;
  const hitMap = await loadPartnerCharacterHitMap(image);
  if (!hitMap) return true;

  const fittedScale = Math.min(bounds.width / hitMap.naturalWidth, bounds.height / hitMap.naturalHeight);
  const renderedWidth = hitMap.naturalWidth * fittedScale;
  const renderedHeight = hitMap.naturalHeight * fittedScale;
  const renderedLeft = bounds.right - renderedWidth;
  const renderedTop = bounds.bottom - renderedHeight;
  const localX = clientX - renderedLeft;
  const localY = clientY - renderedTop;
  if (localX < 0 || localX >= renderedWidth || localY < 0 || localY >= renderedHeight) return false;

  try {
    const x = Math.min(hitMap.width - 1, Math.max(0, Math.floor(localX / renderedWidth * hitMap.width)));
    const y = Math.min(hitMap.height - 1, Math.max(0, Math.floor(localY / renderedHeight * hitMap.height)));
    return hitMap.context.getImageData(x, y, 1, 1).data[3] >= 24;
  } catch {
    return true;
  }
}

async function handlePartnerCharacterTouch(event) {
  if (!account || currentScene !== "partner" || moving || !partnerCharacter) return;
  if (event.type === "click" && !await isPartnerCharacterPaintedAt(partnerCharacter, event.clientX, event.clientY)) return;
  if (currentScene !== "partner") return;

  const partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const moodState = partnerMoodPresentation(partner.mood).label;
  if (partnerHasStatus(partner, "추가 수면")) {
    resetPartnerTouchSequence();
    hidePartnerTouchDialogue(true);
    return;
  }
  if (moodState === "불만" || partnerUsesUnhappyTouchReaction(partner)) {
    resetPartnerTouchSequence();
    await showPartnerTouchDialogue("unhappy");
    return;
  }
  if (moodState === "화남") {
    resetPartnerTouchSequence();
    hidePartnerTouchDialogue(true);
    return;
  }
  if (moodState !== "통상" && moodState !== "좋은 상태") return;

  const now = Date.now();
  partnerTouchTimestamps = partnerTouchTimestamps
    .filter(timestamp => now - timestamp <= PARTNER_TOUCH_CHAIN_WINDOW_MS);
  partnerTouchTimestamps.push(now);
  if (partnerTouchSequenceActive || partnerTouchTimestamps.length >= PARTNER_TOUCH_CHAIN_MINIMUM) {
    partnerTouchSequenceActive = true;
    await showPartnerTouchDialogue("continuous");
    schedulePartnerTouchEndDialogue();
    return;
  }
  await showPartnerTouchDialogue("normal");
}

function partnerStatusCharacterOverride(partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment)) {
  if (partnerHasStatus(partner, "추가 수면")) return { assetId: "Asset_N_13", label: "추가 수면" };
  if (partner.mood <= 25) return null;
  const matchedStatus = PARTNER_SICK_STATUS_NAMES.find(name => partnerHasStatus(partner, name));
  return matchedStatus ? { assetId: "Asset_N_15", label: matchedStatus } : null;
}

function partnerUsesUnhappyTouchReaction(partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment)) {
  if (partnerHasStatus(partner, "삐짐")) return true;
  return PARTNER_SICK_STATUS_NAMES.some(name => partnerHasStatus(partner, name));
}

function partnerHasStatus(partner, statusName) {
  const knownStatusIds = {
    "추가 수면": "N_S_001",
    "화남": "N_S_002",
    "삐짐": "N_S_003",
    "불만": "N_S_004",
    "출출함": "N_S_005",
    "숙취": "N_S_006",
    "개운함": "N_S_007",
    "든든함": "N_S_008",
    "기대감": "N_S_009",
    "즐거운 연회": "N_S_010",
    "성실한 학생": "N_S_011",
    "피로": "N_S_012",
    "젖은 어깨": "N_S_013",
    "식은 몸": "N_S_014",
    "더위 먹음": "N_S_015",
    "멀미": "N_S_016",
    "과식": "N_S_017",
    "고혈당": "N_S_018",
    "아린 혀": "N_S_019",
    "속쓰림": "N_S_020",
    "느글거림": "N_S_021",
    "수행자": "N_S_022",
    "따분함": "N_S_023",
    "감기 기운": "N_S_024"
  };
  const expectedId = knownStatusIds[String(statusName || "").trim()] || "";
  return partner.effects.some(effect => {
    const key = String(effect || "").trim();
    return key === statusName || key === expectedId || nahanaStatusDefinitions.get(key)?.name === statusName;
  });
}

function partnerAccessState(partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment), presentation = partnerMoodPresentation(partner.mood)) {
  if (presentation.label === "화남" || partnerHasStatus(partner, "화남")) return { allLocked: true, cardsLocked: true, reason: "나하나가 화가 나 있어 파트너 기능을 사용할 수 없습니다." };
  if (partnerHasStatus(partner, "추가 수면")) return { allLocked: true, cardsLocked: true, reason: "나하나가 추가 수면 상태라 파트너 기능을 사용할 수 없습니다." };
  if (partnerHasStatus(partner, "감기 기운")) return { allLocked: true, cardsLocked: true, reason: "나하나가 감기 기운으로 쉬고 있어 파트너 기능을 사용할 수 없습니다." };
  const atSettlement = account?.travel?.mode === "settlement";
  const atInn = atSettlement && Boolean(window.ProjectWInn?.isActive?.());
  if (atInn) return { allLocked: false, cardsLocked: false, reason: "" };
  if (atSettlement) return {
    allLocked: true,
    cardsLocked: false,
    reason: "거점에서는 일부 파트너 기능을 사용할 수 없습니다. 정령의 가호와 축복 부여는 두 사람만 있는 길 위나 여관에서 사용할 수 있습니다."
  };
  return { allLocked: false, cardsLocked: false, reason: "" };
}

function updatePartnerAccessUi(partner, presentation) {
  const access = partnerAccessState(partner, presentation);
  if (partnerLockNotice) {
    partnerLockNotice.hidden = !access.reason;
    partnerLockNotice.textContent = access.reason;
  }
  [partnerCardHand, campCardHand].filter(Boolean).forEach(cardHand => {
    cardHand.classList.toggle("is-locked", access.cardsLocked);
    cardHand.setAttribute("aria-disabled", String(access.cardsLocked));
  });
  if (partnerBlessingToggle) {
    const featureLocked = !isFeatureUnlocked("permanentBlessing");
    partnerBlessingToggle.disabled = access.allLocked || featureLocked;
    partnerBlessingToggle.classList.toggle("is-system-locked", access.allLocked || featureLocked);
    partnerBlessingToggle.title = featureLocked ? "아직 축복 부여 기능이 해금되지 않았습니다." : access.reason;
  }
  if (partnerSpiritBlessing) {
    const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
    const featureLocked = !isFeatureUnlocked("spiritBlessing");
    partnerSpiritBlessing.disabled = access.allLocked || featureLocked;
    partnerSpiritBlessing.classList.toggle("is-system-locked", access.allLocked || featureLocked);
    partnerSpiritBlessing.title = featureLocked
      ? "아직 정령의 가호 기능이 해금되지 않았습니다."
      : access.allLocked
      ? access.reason
      : partner.spirit < 1
        ? "정령력이 부족합니다."
        : "정령력 1을 사용해 무작위 가호를 얻습니다.";
  }
  updatePartnerAttentionMarks(partner, access);
  if (access.allLocked) {
    closePartnerSnackPanel();
    closePartnerFeature();
  }
  updatePartnerSnackUi(access);
  updatePartnerCommonSenseUi(access);
}

function loadTalkCardDefinitions() {
  if (talkCardLoadPromise) return talkCardLoadPromise;
  talkCardLoadPromise = window.ProjectWData.loadCsv(TALK_CARD_CSV_URL)
    .then(rows => {
      talkCardDefinitions.clear();
      rows.forEach(row => {
        const id = String(row.ID || "").trim();
        const title = String(row["노출되는 이름"] || "").trim();
        const dialogueId = String(row["불러오기_대화"] || "").trim();
        if (!id || !title || !dialogueId) return;
        talkCardDefinitions.set(id, {
          id,
          title,
          category: String(row["분류"] || "일반").replace(/[\[\]]/g, "").trim() || "일반",
          dialogueId,
          conditions: {
            regions: splitTalkCardValues(row["발생 지역 조건"]),
            routes: splitTalkCardValues(row["발생 상행로 조건"]),
            terrains: splitTalkCardValues(row["발생 지형 조건"]),
            environments: splitTalkCardValues(row["발생 환경 조건"])
          },
          effects: {
            sweet: talkCardNumber(row["단맛"]),
            salty: talkCardNumber(row["짠맛"]),
            stimulus: talkCardNumber(row["자극"]),
            weight: talkCardNumber(row["무거움"]),
            mood: talkCardNumber(row["기분"]),
            statuses: splitTalkCardValues(row["상태이상"])
              .filter(status => !["없음", "none", "-"].includes(status.toLowerCase())),
            companionExperience: Math.max(0, talkCardNumber(row["동행 경험치"] ?? row["동행경험치"]))
          }
        });
      });
      if (!talkCardDefinitions.size) throw new Error("Talk_card 시트에 사용할 수 있는 카드가 없습니다.");
      renderPartnerTalkCards();
      return true;
    })
    .catch(error => {
      console.error(error);
      showGameNotice("대화 카드 데이터를 불러오지 못했습니다. Talk_card 시트 연결을 확인해 주세요.");
      renderPartnerTalkCards(true);
      return false;
    });
  return talkCardLoadPromise;
}

function splitTalkCardValues(value) {
  return [...new Set(String(value ?? "")
    .split(/[\n,;|·/]+/)
    .map(item => item.trim())
    .filter(Boolean))];
}

function talkCardNumber(value) {
  const number = Number.parseFloat(String(value ?? "").replace(/[^\d+\-.]/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function renderPartnerTalkCards(loadFailed = false) {
  if (!partnerCardHand && !campCardHand) return;
  const state = normalizeTalkCardState(account?.talkCards);
  if (account) account.talkCards = state;
  if (account && !talkCardDefinitions.size && !loadFailed) void loadTalkCardDefinitions();
  [partnerCardHand, campCardHand].filter(Boolean).forEach(container => {
    const cards = state.hand.map(cardId => createPartnerTalkCard(cardId, loadFailed));
    while (cards.length < TALK_CARD_HAND_SIZE) {
      const empty = document.createElement("div");
      empty.className = "partner-empty-card";
      empty.setAttribute("aria-label", "빈 대화 카드");
      cards.push(empty);
    }
    container.replaceChildren(...cards);
  });
}

function createPartnerTalkCard(cardId, loadFailed = false) {
  const definition = talkCardDefinitions.get(cardId);
  if (!definition) {
    const unavailable = document.createElement("div");
    unavailable.className = "partner-empty-card";
    unavailable.setAttribute("aria-label", loadFailed ? "대화 카드 연결 실패" : "대화 카드 정보 불러오는 중");
    return unavailable;
  }
  const card = document.createElement("article");
  card.className = "partner-talk-card";
  card.dataset.category = definition.category;
  card.classList.toggle("is-special-event-card", definition.id === "T_C_999");
  card.classList.toggle("is-resolving", activeTalkCardId === cardId);
  const contextLockReason = talkCardContextLockReason(definition);
  card.classList.toggle("is-context-locked", Boolean(contextLockReason));
  if (contextLockReason) {
    card.dataset.lockedLabel = definition.id === "T_C_999"
      ? "길 위에서 사용"
      : account?.travel?.mode === "camp" ? "야영 중 사용 불가" : "야영에서 사용";
    card.title = contextLockReason;
  }

  const main = document.createElement("button");
  main.type = "button";
  main.className = "partner-talk-card-main";
  main.dataset.talkCardId = cardId;
  main.disabled = activeTalkCardId === cardId || Boolean(contextLockReason);
  main.setAttribute("aria-label", contextLockReason
    ? `${definition.title}, ${contextLockReason}`
    : `${definition.title} 대화 시작`);
  const title = document.createElement("strong");
  title.textContent = definition.title;
  const category = document.createElement("small");
  category.textContent = definition.category;
  main.append(category, title);
  card.append(main);

  const unlocked = normalizeDialogueMemorial(account?.dialogueMemorial).unlockedIds.includes(definition.dialogueId);
  if (unlocked) {
    const quick = document.createElement("button");
    quick.type = "button";
    quick.className = "partner-talk-card-skip";
    quick.dataset.talkCardQuick = cardId;
    quick.disabled = activeTalkCardId === cardId || Boolean(contextLockReason);
    quick.textContent = "대화";
    quick.title = "이미 감상한 대화를 생략하고 카드 효과만 적용합니다.";
    card.append(quick);
  }
  return card;
}

function talkCardContextLockReason(definition) {
  if (!definition) return "대화 카드 정보를 확인할 수 없습니다.";
  const camping = account?.travel?.mode === "camp";
  if (definition.id === "T_C_999" && account?.travel?.mode !== "road") return "정령의 가호를 위한 특수 대화 카드는 길 위에서만 사용할 수 있습니다.";
  if (definition.category === "야영" && !camping) return "야영 대화 카드는 야영지에서만 사용할 수 있습니다.";
  if (camping && definition.category !== "야영") return "야영 중에는 야영 분류의 대화 카드만 사용할 수 있습니다.";
  return "";
}

function handleTalkCardClick(event) {
  const quick = event.target.closest("button[data-talk-card-quick]");
  const main = event.target.closest("button[data-talk-card-id]");
  const cardId = quick?.dataset.talkCardQuick || main?.dataset.talkCardId || "";
  if (!cardId || !account || activeTalkCardId) return;
  const access = partnerAccessState();
  if (access.cardsLocked && !isTutorialActive(TUTORIAL_IDS.TALK_CARD)) {
    if (access.reason) showGameNotice(access.reason);
    return;
  }
  if (isTutorialActive(TUTORIAL_IDS.TALK_CARD)
    && normalizeTutorialProgress(account.tutorialProgress).step === 1
    && main) {
    pauseTravelClock("talk-card");
    completeTutorial(TUTORIAL_IDS.TALK_CARD);
  }
  void useTalkCard(cardId, Boolean(quick));
}

async function useTalkCard(cardId, quickResolve = false) {
  await Promise.all([loadTalkCardDefinitions(), loadNahanaStatusDefinitions()]);
  const state = normalizeTalkCardState(account?.talkCards);
  const definition = talkCardDefinitions.get(cardId);
  if (!account || !definition || !state.hand.includes(cardId) || activeTalkCardId) return false;
  const contextLockReason = talkCardContextLockReason(definition);
  if (contextLockReason) {
    showGameNotice(contextLockReason);
    return false;
  }
  const alreadyUnlocked = normalizeDialogueMemorial(account.dialogueMemorial).unlockedIds.includes(definition.dialogueId);
  if (quickResolve && !alreadyUnlocked) return false;
  const outcomeBefore = {
    mood: normalizePartnerState(account.partner, account.partnerMoodAdjustment).mood,
    companionExperience: companionLifetimeExperience(account.partner)
  };

  activeTalkCardId = cardId;
  pauseTravelClock("talk-card");
  renderPartnerTalkCards();
  let settled = false;
  const settle = () => {
    if (settled) return;
    settled = true;
    closeDialog();
    applyTalkCardOutcome(definition, alreadyUnlocked, outcomeBefore);
  };
  if (quickResolve) {
    settle();
    return true;
  }
  const played = await playDialogue(definition.dialogueId, settle, { onSkip: settle, context: "talk-card" });
  if (!played) {
    activeTalkCardId = "";
    resumeTravelClock("talk-card");
    renderPartnerTalkCards();
  }
  return played;
}

function applyTalkCardOutcome(definition, alreadyUnlocked = false, outcomeBefore = null) {
  if (!account || !definition) return;
  const state = normalizeTalkCardState(account.talkCards);
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const partner = account.partner;
  ["sweet", "salty", "stimulus", "weight", "mood"].forEach(key => {
    partner[key] = clampNumber(partner[key] + (Number(definition.effects[key]) || 0), 0, 100, partner[key]);
  });
  state.hand = state.hand.filter(cardId => cardId !== definition.id);
  state.campCardIds = state.campCardIds.filter(cardId => cardId !== definition.id);
  state.readCount += 1;
  account.talkCards = state;
  account.partnerMoodAdjustment = partner.mood - 50;
  syncMoodDrivenPartnerStatuses();
  definition.effects.statuses.forEach(status => {
    const statusId = nahanaStatusDefinitions.get(status)?.id || status;
    addPartnerStatus(statusId);
  });
  if (definition.effects.companionExperience > 0) {
    addCompanionExperience(definition.effects.companionExperience, `대화 카드 · ${definition.title}`);
  }
  if (alreadyUnlocked) addCompanionExperience(2, `다시 나눈 대화 · ${definition.title}`);
  evaluateTalkCardFootprints(state.readCount);
  activeTalkCardId = "";
  persistAccount();
  updatePartnerUi();
  resumeTravelClock("talk-card");
  const previousMood = Number(outcomeBefore?.mood);
  const previousExperience = Number(outcomeBefore?.companionExperience);
  const currentExperience = companionLifetimeExperience(account.partner);
  const moodChange = partner.mood - (Number.isFinite(previousMood) ? previousMood : partner.mood);
  const experienceChange = Math.max(0, currentExperience
    - (Number.isFinite(previousExperience) ? previousExperience : currentExperience));
  const moodCopy = moodChange > 0
    ? `기분 +${formatCompactNumber(moodChange)}`
    : moodChange < 0
      ? `기분 ${formatCompactNumber(moodChange)}`
      : "기분 변화 없음";
  showGameNotice(`대화 카드 · ${definition.title} · ${moodCopy} · 동행 경험치 +${formatCompactNumber(experienceChange)}`);
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (definition.id === "T_C_999" && eventState.activeId === "N_E_003" && eventState.stage === 2) {
    void resolveNahanaEventCondition(2);
  }
  window.setTimeout(() => {
    maybeStartEarlyPartnerTutorial();
    schedulePendingNarrativePresentation();
  }, 0);
}

function companionLifetimeExperience(partnerState = account?.partner) {
  const partner = normalizePartnerState(partnerState, account?.partnerMoodAdjustment);
  let total = Math.max(0, Math.trunc(Number(partner.companionExperience) || 0));
  for (let rank = 1; rank < partner.companionRank; rank += 1) {
    total += companionExperienceRequirement(rank);
  }
  return total;
}

async function ensureSpiritEventTalkCard() {
  if (!account) return false;
  const loaded = await loadTalkCardDefinitions();
  const definition = talkCardDefinitions.get("T_C_999");
  if (!loaded || !definition) return false;
  const state = normalizeTalkCardState(account.talkCards);
  if (state.hand.includes(definition.id)) return true;
  state.hand = [definition.id, ...state.hand.filter(cardId => cardId !== definition.id)].slice(0, TALK_CARD_HAND_SIZE);
  account.talkCards = state;
  persistAccount();
  renderPartnerTalkCards();
  showGameNotice(`특수 대화 카드 · ${definition.title}`);
  return true;
}

function evaluateTalkCardFootprints(readCount = 0) {
  if (readCount >= 10) unlockFootprint("FOOTPRINT_020");
  if (readCount >= 30) unlockFootprint("FOOTPRINT_021");
  if (readCount >= 100) unlockFootprint("FOOTPRINT_022");
}

function talkCardGenerationChance(mood) {
  const value = clampNumber(Number(mood), 0, 100, 50);
  if (value <= 25) return 0;
  if (value < 50) return 0.1 * ((value - 25) / 25);
  if (value < 75) return 0.1;
  return 0.1 + (0.1 * ((value - 75) / 25));
}

function rollTalkCardGeneration(placementId) {
  if (!account || isNodeId(placementId) || !hasReachedEarlyTutorialBranch()) return false;
  account.talkCards = normalizeTalkCardState(account.talkCards);
  if (account.talkCards.hand.length >= TALK_CARD_HAND_SIZE) return false;
  const mood = normalizePartnerState(account.partner, account.partnerMoodAdjustment).mood;
  const baseChance = talkCardGenerationChance(mood);
  const chance = baseChance <= 0 ? 0 : Math.min(1, baseChance + partnerDialogueCardChanceBonus());
  if (Math.random() >= chance) return false;
  const context = talkCardContextAtPlacement(placementId);
  talkCardGenerationInProgress += 1;
  const queued = roadTalkCardGenerationQueue.then(() => generateTalkCard(context));
  roadTalkCardGenerationQueue = queued.catch(error => {
    console.error("대화 카드 영역 생성 중 오류가 발생했습니다.", error);
    return false;
  }).finally(() => {
    talkCardGenerationInProgress = Math.max(0, talkCardGenerationInProgress - 1);
    schedulePendingNarrativePresentation();
    schedulePendingRoadArrivalContinuation();
  });
  return roadTalkCardGenerationQueue;
}

function talkCardAreaRouteKey(travel) {
  const path = Array.isArray(travel?.routePath) ? travel.routePath : [];
  return path.length > 1 ? `local-slots-v2:${path.join(">")}` : "";
}

function storedTravelRoutePosition(travel) {
  if (!travel?.routePath?.length) return 0;
  const routeIndex = Math.min(Math.max(0, Math.trunc(Number(travel.routeIndex) || 0)), travel.routePath.length - 1);
  if (!travel.moving || routeIndex >= travel.routePath.length - 1) return routeIndex;
  const storedRemaining = Number(travel.segmentRemainingMs);
  const remaining = Number.isFinite(storedRemaining) ? Math.max(0, storedRemaining) : TRAVEL_STEP_MS;
  const segmentProgress = clampNumber(1 - (remaining / TRAVEL_STEP_MS), 0, 1, 0);
  return routeIndex + segmentProgress;
}

function ensureRoadTalkCardAreaPlan(travel = account?.travel) {
  if (!travel?.routePath?.length) return false;
  const routeKey = talkCardAreaRouteKey(travel);
  if (!routeKey) return false;
  if (travel.talkCardAreaRouteKey === routeKey && Array.isArray(travel.talkCardAreaRolls)) return false;
  const lastIndex = travel.routePath.length - 1;
  const currentPosition = storedTravelRoutePosition(travel);
  travel.talkCardAreaRouteKey = routeKey;
  travel.talkCardAreaRolls = travel.routePath.flatMap((placementId, anchorIndex) => {
    if (anchorIndex <= 0 || anchorIndex >= lastIndex || isNodeId(placementId)) return [];
    const areaSlots = TALK_CARD_AREA_SLOT_OFFSETS.map(offset => anchorIndex + offset);
    const availableSlots = areaSlots.filter(position => position > currentPosition + 0.00001);
    const triggerPosition = availableSlots.length
      ? availableSlots[Math.floor(Math.random() * availableSlots.length)]
      : areaSlots.at(-1);
    return [{
      anchorIndex,
      placementId,
      triggerPosition: Math.round(triggerPosition * 10000) / 10000,
      resolved: !availableSlots.length
    }];
  }).sort((left, right) => left.triggerPosition - right.triggerPosition || left.anchorIndex - right.anchorIndex);
  return true;
}

function resolveRoadTalkCardAreaRolls(travel, fromPosition, toPosition) {
  if (!travel?.routePath?.length || toPosition <= fromPosition) return false;
  ensureRoadTalkCardAreaPlan(travel);
  const due = (travel.talkCardAreaRolls || [])
    .filter(entry => !entry.resolved
      && entry.triggerPosition > fromPosition + 0.00001
      && entry.triggerPosition <= toPosition + 0.00001)
    .sort((left, right) => left.triggerPosition - right.triggerPosition || left.anchorIndex - right.anchorIndex);
  if (!due.length) return false;
  due.forEach(entry => {
    entry.resolved = true;
    void rollTalkCardGeneration(entry.placementId);
  });
  return true;
}

function nextRoadTalkCardAreaDelay(travel, rate) {
  if (!travel?.moving || travel.routeIndex >= travel.routePath.length - 1) return Number.POSITIVE_INFINITY;
  ensureRoadTalkCardAreaPlan(travel);
  const currentPosition = storedTravelRoutePosition(travel);
  const segmentEnd = travel.routeIndex + 1;
  const next = (travel.talkCardAreaRolls || []).find(entry => !entry.resolved
    && entry.triggerPosition > currentPosition + 0.00001
    && entry.triggerPosition < segmentEnd - 0.00001);
  if (!next) return Number.POSITIVE_INFINITY;
  const targetFraction = clampNumber(next.triggerPosition - travel.routeIndex, 0, 1, 0);
  const targetRemaining = (1 - targetFraction) * TRAVEL_STEP_MS;
  const progressUntilTrigger = Math.max(0, Number(travel.segmentRemainingMs) - targetRemaining);
  return progressUntilTrigger / rate;
}

async function generateTalkCard(context) {
  const loaded = await loadTalkCardDefinitions();
  if (!loaded || !account) return false;
  const state = normalizeTalkCardState(account.talkCards);
  if (state.hand.length >= TALK_CARD_HAND_SIZE) return false;
  const held = new Set(state.hand);
  const partnerRank = normalizePartnerState(account.partner, account.partnerMoodAdjustment).companionRank;
  const eligible = [...talkCardDefinitions.values()]
    .filter(definition => definition.id !== "T_C_999" && !held.has(definition.id) && talkCardMatchesContext(definition, context));
  const loveCards = partnerRank >= 21 ? eligible.filter(definition => definition.category === "애정") : [];
  const regularCards = eligible.filter(definition => !["애정", "야영"].includes(definition.category));
  const pool = loveCards.length && Math.random() < TALK_CARD_LOVE_CHANCE ? loveCards : regularCards;
  if (!pool.length) return false;
  const selected = pool[Math.floor(Math.random() * pool.length)];
  return acquireTalkCard(selected);
}

function acquireTalkCard(definition, options = {}) {
  if (!account || !definition) return false;
  const state = normalizeTalkCardState(account.talkCards);
  if (state.hand.length >= TALK_CARD_HAND_SIZE || state.hand.includes(definition.id)) return false;
  state.hand.push(definition.id);
  if (options.campTemporary) state.campCardIds.push(definition.id);
  account.talkCards = state;
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  if (!account.tutorialProgress.completed.includes(TUTORIAL_IDS.TALK_CARD)) {
    account.tutorialProgress.talkCardTutorialPending = true;
  }
  persistAccount();
  renderPartnerTalkCards();
  void showSystemMiniDialogue(
    ["DL_TC_001", "DL_TC_002", "DL_TC_003"][Math.floor(Math.random() * 3)],
    "talk-card"
  );
  showGameNotice(`${options.noticePrefix || "새 대화 카드"} · ${definition.title}`);
  schedulePendingNarrativePresentation();
  return true;
}

function currentCampTalkCardSessionKey() {
  const travel = account?.travel;
  if (!travel || travel.mode !== "camp") return "";
  const day = normalizeWorldTime(account?.worldTime).day;
  return [account.createdAt || "account", day, travel.positionId, travel.destinationNodeId, travel.routeIndex].join(":");
}

function ensureCampTalkCardSession() {
  const sessionKey = currentCampTalkCardSessionKey();
  if (!account || !sessionKey) return;
  const state = normalizeTalkCardState(account.talkCards);
  if (state.campSessionKey !== sessionKey) {
    const staleCampCards = new Set(state.campCardIds);
    state.hand = state.hand.filter(cardId => !staleCampCards.has(cardId));
    state.campSessionKey = sessionKey;
    state.campCardIds = [];
    state.campRollResolved = false;
    account.talkCards = state;
    persistAccount();
    renderPartnerTalkCards();
  }
  if (state.campRollResolved || campTalkCardRollPromise) return;
  campTalkCardRollPromise = rollCampTalkCard(sessionKey)
    .finally(() => { campTalkCardRollPromise = undefined; });
}

async function rollCampTalkCard(sessionKey) {
  if (!account || currentCampTalkCardSessionKey() !== sessionKey) return false;
  const state = normalizeTalkCardState(account.talkCards);
  if (state.campSessionKey !== sessionKey || state.campRollResolved) return false;
  state.campRollResolved = true;
  account.talkCards = state;

  if (!hasReachedEarlyTutorialBranch()) {
    persistAccount();
    renderPartnerTalkCards();
    return false;
  }

  const loaded = await loadTalkCardDefinitions();
  if (!account || currentCampTalkCardSessionKey() !== sessionKey) return false;

  let selected = null;
  if (loaded && state.hand.length < TALK_CARD_HAND_SIZE && Math.random() < TALK_CARD_CAMP_CHANCE) {
    const held = new Set(state.hand);
    const context = talkCardContextAtPlacement(account.travel.positionId);
    const pool = [...talkCardDefinitions.values()]
      .filter(definition => definition.category === "야영"
        && !held.has(definition.id)
        && talkCardMatchesContext(definition, context));
    if (pool.length) selected = pool[Math.floor(Math.random() * pool.length)];
  }

  if (selected) {
    return acquireTalkCard(selected, { campTemporary: true, noticePrefix: "야영 대화 카드" });
  }
  persistAccount();
  renderPartnerTalkCards();
  return false;
}

function expireCampTalkCards(render = true) {
  if (!account) return;
  const state = normalizeTalkCardState(account.talkCards);
  const temporaryIds = new Set(state.campCardIds);
  state.hand = state.hand.filter(cardId => {
    if (temporaryIds.has(cardId)) return false;
    return talkCardDefinitions.get(cardId)?.category !== "야영";
  });
  state.campCardIds = [];
  state.campSessionKey = "";
  state.campRollResolved = false;
  account.talkCards = state;
  if (!state.hand.length) {
    const progress = normalizeTutorialProgress(account.tutorialProgress);
    progress.talkCardTutorialPending = false;
    if (progress.activeId === TUTORIAL_IDS.TALK_CARD) {
      progress.activeId = 0;
      progress.step = 0;
      if (tutorialRuntime?.id === TUTORIAL_IDS.TALK_CARD) {
        tutorialRuntime = null;
        hideTutorial();
        resumeTravelClock("tutorial");
      }
    }
    account.tutorialProgress = progress;
  }
  if (render) renderPartnerTalkCards();
}

function talkCardContextAtPlacement(placementId) {
  const conditions = getCurrentRoadConditions(placementId);
  const placement = window.ProjectWMapView.getPlacement(placementId);
  return {
    region: conditions.region,
    route: placement?.kind === "dot" && placement.name ? placement.name : getCurrentRouteName(account?.travel),
    terrains: conditions.terrains,
    environments: [...conditions.environments, ...conditions.roadSurfaces, conditions.weather, conditions.season]
  };
}

function talkCardMatchesContext(definition, context) {
  const matchesAny = (requirements, values) => !requirements.length
    || requirements.some(requirement => values.includes(requirement));
  return matchesAny(definition.conditions.regions, [context.region])
    && matchesAny(definition.conditions.routes, [context.route])
    && matchesAny(definition.conditions.terrains, context.terrains)
    && matchesAny(definition.conditions.environments, context.environments);
}

function updatePartnerAttentionMarks(partner, access = partnerAccessState(partner)) {
  const normalized = normalizePartnerState(partner, account?.partnerMoodAdjustment);
  const canObtainBuff = isFeatureUnlocked("spiritBlessing")
    && !access.allLocked
    && normalized.spirit >= 1
    && availableBuffNames(normalized).length > 0;
  if (partnerSpiritAttention) partnerSpiritAttention.hidden = !canObtainBuff;
  const canInvestBlessing = isFeatureUnlocked("permanentBlessing") && normalized.upgradePoints > 0;
  if (partnerBlessingAttention) partnerBlessingAttention.hidden = !canInvestBlessing;
  partnerSpiritBlessing?.classList.toggle("has-attention", canObtainBuff);
  partnerBlessingToggle?.classList.toggle("has-attention", canInvestBlessing);
}

function partnerSnackItems() {
  return window.ProjectWCargo.getInventoryItems()
    .filter(item => item.quantity > 0 && item.definition?.isSnack);
}

function updatePartnerSnackUi(access = partnerAccessState()) {
  if (!partnerSnackOpen || !account) return;
  account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
  const used = account.foodUsage.snackUsed;
  const snacks = partnerSnackItems();
  const partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const featureLocked = !isFeatureUnlocked("partnerSnack");
  const angry = partnerIsAngry(partner);
  if (angry) {
    const sootheBlocked = account.foodUsage.sootheBlocked;
    partnerSnackOpen.disabled = featureLocked || sootheBlocked;
    partnerSnackOpen.classList.toggle("is-limit-exhausted", sootheBlocked);
    partnerSnackOpen.classList.toggle("is-system-locked", featureLocked);
    partnerSnackOpen.textContent = sootheBlocked ? "오늘 달래기 종료" : "달래기";
    partnerSnackOpen.title = featureLocked
      ? "극초반 여정을 마치면 사용할 수 있습니다."
      : sootheBlocked
        ? "오늘은 나하나가 더 이상 말을 걸지 말아 달라고 했습니다."
        : "나하나를 달래 기분을 조금 회복합니다. 거절하면 오늘은 다시 시도할 수 없습니다.";
    closePartnerSnackPanel();
    return;
  }
  const statusLocked = ["숙취", "과식", "고혈당", "속쓰림"].some(name => partnerHasStatus(partner, name));
  partnerSnackOpen.disabled = featureLocked || access.allLocked || statusLocked || used || !snacks.length;
  partnerSnackOpen.classList.toggle("is-limit-exhausted", used);
  partnerSnackOpen.classList.toggle("is-system-locked", featureLocked || access.allLocked || statusLocked);
  partnerSnackOpen.textContent = used ? "오늘 간식 완료" : "간식 주기";
  partnerSnackOpen.title = featureLocked
    ? "극초반 여정을 마치면 사용할 수 있습니다."
    : access.allLocked
    ? access.reason
    : statusLocked
      ? "현재 상태 때문에 간식을 먹을 수 없습니다."
    : used
      ? "오늘은 이미 간식을 주었습니다."
      : snacks.length
        ? "화물에서 간식으로 줄 물건을 고릅니다."
        : "Goods 시트에서 간식으로 지정된 보유 물건이 없습니다.";
  if (!partnerSnackPanel?.hidden) renderPartnerSnackList(snacks, used);
}

function partnerIsAngry(partner = account?.partner) {
  const normalized = normalizePartnerState(partner, account?.partnerMoodAdjustment);
  return normalized.mood <= 25 || partnerHasStatus(normalized, "화남");
}

function handlePartnerSnackAction() {
  if (partnerIsAngry()) {
    sootheAngryPartner();
    return;
  }
  void openPartnerSnackPanel();
}

function sootheAngryPartner() {
  if (!account || !partnerIsAngry()) return;
  account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
  if (!isFeatureUnlocked("partnerSnack") || account.foodUsage.sootheBlocked) {
    updatePartnerUi();
    return;
  }
  if (Math.random() < 0.1) {
    account.foodUsage.sootheBlocked = true;
    persistAccount();
    updatePartnerUi();
    showGameNotice("나하나가 오늘은 더 이상 말을 걸지 말아 달라고 했습니다.");
    return;
  }
  const moodGain = changePartnerMood(1 + Math.floor(Math.random() * 2));
  persistAccount();
  updatePartnerUi();
  showGameNotice(`나하나를 달랬습니다. · 기분 +${moodGain}`);
}

function renderPartnerSnackList(items = partnerSnackItems(), used = Boolean(account?.foodUsage?.snackUsed)) {
  if (!partnerSnackList || !partnerSnackStatus) return;
  partnerSnackList.replaceChildren();
  if (used) {
    partnerSnackStatus.textContent = "오늘은 이미 간식을 주었습니다.";
    return;
  }
  if (!items.length) {
    partnerSnackStatus.textContent = "Goods 시트에서 간식으로 지정된 보유 물건이 없습니다.";
    return;
  }
  partnerSnackStatus.textContent = "간식은 하루에 한 번 줄 수 있으며 나하나의 기분이 3 증가합니다.";
  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "partner-snack-item";
    button.dataset.partnerSnackInstance = item.instanceId;
    const name = document.createElement("strong");
    name.textContent = item.definition.displayName || item.definition.name3 || item.itemId;
    const detail = document.createElement("span");
    detail.textContent = item.definition.category === "여행 식량"
      ? `여행 식량 · 보유 ${formatCompactNumber(item.quantity)} · 1개 소모`
      : `${item.definition.category || "교역품"} · 열화내구도 10% 감소`;
    button.append(name, detail);
    fragment.append(button);
  });
  partnerSnackList.append(fragment);
}

async function openPartnerSnackPanel() {
  const access = partnerAccessState();
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  const statusLocked = ["숙취", "과식", "고혈당", "속쓰림"].some(name => partnerHasStatus(partner, name));
  if (!isFeatureUnlocked("partnerSnack") || access.allLocked || statusLocked || account?.foodUsage?.snackUsed) return;
  await window.ProjectWCargo.load();
  if (!partnerSnackPanel) return;
  partnerSnackPanel.hidden = false;
  updatePartnerCharacterUi();
  renderPartnerSnackList();
}

function closePartnerSnackPanel() {
  if (!partnerSnackPanel || partnerSnackPanel.hidden) return;
  partnerSnackPanel.hidden = true;
  updatePartnerCharacterUi();
}

function givePartnerSnack(instanceId) {
  if (!account) return;
  const access = partnerAccessState();
  account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
  if (access.allLocked) {
    showGameNotice(access.reason);
    return;
  }
  if (account.foodUsage.snackUsed) {
    showGameNotice("오늘은 이미 간식을 주었습니다.");
    updatePartnerUi();
    return;
  }
  const item = window.ProjectWCargo.getInventoryItems().find(entry => entry.instanceId === instanceId);
  if (!item?.definition?.isSnack) {
    showGameNotice("선택한 물건을 간식으로 사용할 수 없습니다.");
    updatePartnerUi();
    return;
  }
  const travelFood = item.definition.category === "여행 식량";
  const applied = travelFood
    ? window.ProjectWCargo.consumeInstance(instanceId, 1)
    : Boolean(window.ProjectWCargo.damageItem(instanceId, Math.max(0, Number(item.definition.durability) || 0) * 0.1));
  if (!applied) {
    showGameNotice("선택한 간식을 사용할 수 없습니다.");
    updatePartnerUi();
    return;
  }
  account.foodUsage.snackUsed = true;
  const moodGain = changePartnerMood(3);
  account.partner.statusStreaks.idleDots = 0;
  removePartnerStatus("N_S_005");
  if (Math.random() < 0.33) addCompanionExperience(1, "간식 경험");
  persistAccount();
  closePartnerSnackPanel();
  updatePartnerUi();
  showGameNotice(`나하나에게 ${item.definition.displayName || "간식"}을 주었습니다. · 기분 +${moodGain}`);
}

function updatePartnerCommonSenseUi(access = partnerAccessState()) {
  if (!partnerCommonSense || !account) return;
  account.commonSenseUsage = normalizeCommonSenseUsage(account.commonSenseUsage, account.worldTime);
  const usage = account.commonSenseUsage;
  const nextLimitChance = Math.min(100, usage.attempts * 10);
  partnerCommonSense.disabled = access.allLocked || usage.locked;
  partnerCommonSense.classList.toggle("is-system-locked", access.allLocked);
  partnerCommonSense.classList.toggle("is-limit-exhausted", usage.locked);
  partnerCommonSense.textContent = usage.locked ? "오늘 상식주입 종료" : "상식 주입";
  partnerCommonSense.title = access.allLocked
    ? access.reason
    : usage.locked
      ? "오늘은 더 이상 상식을 주입할 수 없습니다."
      : `다음 시도의 제한 확률 ${nextLimitChance}%`;
  if (access.allLocked) hidePartnerCommonSensePopup(true);
}

async function injectCommonSense() {
  if (!account) return;
  const access = partnerAccessState();
  account.commonSenseUsage = normalizeCommonSenseUsage(account.commonSenseUsage, account.worldTime);
  const usage = account.commonSenseUsage;
  if (access.allLocked) {
    showGameNotice(access.reason);
    return;
  }
  if (usage.locked) {
    showGameNotice("오늘은 더 이상 상식을 주입할 수 없습니다.");
    updatePartnerUi();
    return;
  }

  partnerCommonSense.disabled = true;
  try {
    const [dialogueIds] = await Promise.all([
      window.ProjectWDialogue.getDialogueIds("DL_S_"),
      loadAssets()
    ]);
    const limitIds = dialogueIds.filter(dialogueId => COMMON_SENSE_LIMIT_DIALOGUES.has(dialogueId));
    const regularIds = dialogueIds.filter(dialogueId => !COMMON_SENSE_LIMIT_DIALOGUES.has(dialogueId));
    const limitChance = Math.min(100, usage.attempts * 10);
    const limited = limitIds.length > 0 && (Math.random() * 100) < limitChance;
    const pool = limited ? limitIds : regularIds;
    if (!pool.length) {
      showGameNotice(limited
        ? "Dialogue 시트에서 상식주입 제한 대사를 찾을 수 없습니다."
        : "Dialogue 시트에서 일반 상식주입 대사를 찾을 수 없습니다.");
      return;
    }
    const dialogueId = pool[Math.floor(Math.random() * pool.length)];
    const dialogue = await window.ProjectWDialogue.getDialogue(dialogueId);
    const page = dialogue.pages[0];
    if (!page) throw new Error(`상식주입 대화에 표시할 페이지가 없습니다: ${dialogueId}`);

    account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
    if (limited) {
      usage.locked = true;
      account.partner.commonSenseSuccessStreak = 0;
    } else {
      usage.attempts += 1;
      account.partner.commonSenseSuccessStreak += 1;
      account.partner.statusStreaks.idleDots = 0;
      if (account.partner.commonSenseSuccessStreak >= 6) {
        addPartnerStatus("N_S_011", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
        account.partner.commonSenseSuccessStreak = 0;
      }
    }
    account.commonSenseUsage = usage;
    unlockDialogue(dialogueId, false);
    persistAccount();
    updatePartnerUi();
    showPartnerCommonSensePopup(page);
    if (dialogue.error) showGameNotice("Dialogue CSV를 갱신하지 못해 현재 등록된 대화를 사용합니다.");
  } catch (error) {
    console.error(error);
    showGameNotice("상식주입 대화를 불러오지 못했습니다. Dialogue 시트 연결을 확인해 주세요.");
  } finally {
    updatePartnerUi();
  }
}

function registerSmallPopup(popup) {
  if (!popup) return;
  popup.dataset.smallPopupActiveAnchor = popup.dataset.smallPopupAnchor || "upper";
  popup.dataset.smallPopupSequence = String(++smallPopupSequence);
  scheduleSmallPopupLayout();
}

function showSystemMiniDialogue(dialogueId, tone = "notice", duration = SMALL_DIALOG_DURATION_MS, variables = {}) {
  const queuedTone = ["talk-card", "status-buff", "status-debuff"].includes(tone);
  if (!queuedTone) return presentSystemMiniDialogue(dialogueId, tone, duration, variables, false);
  pendingSystemMiniDialogueCount += 1;
  const queued = systemMiniDialogueQueue
    .then(() => waitForSystemMiniDialogueSlot())
    .then(available => available
      ? presentSystemMiniDialogue(dialogueId, tone, duration, variables, true)
      : false);
  systemMiniDialogueQueue = queued
    .catch(error => {
      console.error(`미니 대화 ${dialogueId} 대기열을 처리하지 못했습니다.`, error);
      return false;
    })
    .finally(() => {
      pendingSystemMiniDialogueCount = Math.max(0, pendingSystemMiniDialogueCount - 1);
      schedulePendingNarrativePresentation();
      schedulePendingRoadArrivalContinuation();
    });
  return queued;
}

function waitForSystemMiniDialogueSlot() {
  return new Promise(resolve => {
    const check = () => {
      if (!account || gameScreen.hidden) {
        resolve(false);
        return;
      }
      if (!systemMiniDialoguePresentationBlocked()) {
        resolve(true);
        return;
      }
      window.setTimeout(check, 250);
    };
    check();
  });
}

function systemMiniDialoguePresentationBlocked() {
  return Boolean(gameEntryInProgress || activeTalkCardId || tutorialRuntime || advancedTutorialRuntime
    || travelPauseReasons.has("talk-card") || travelPauseReasons.has("tutorial")
    || travelPauseReasons.has("advanced-tutorial") || travelPauseReasons.has("dialog")
    || travelPauseReasons.has("road-comment") || travelPauseReasons.has("route-event-check")
    || travelPauseReasons.has("route-event") || !dialogModal.hidden || !walletModal.hidden
    || !informationModal.hidden || !merchantPathModal.hidden || !memorialModal.hidden
    || !tradeModal.hidden || !mealModal.hidden || !innModal.hidden || !serviceModal.hidden
    || !entryTaxModal.hidden || !routeEventModal.hidden || !sceneTransition.hidden
    || (partnerEventPanel && !partnerEventPanel.hidden));
}

async function presentSystemMiniDialogue(dialogueId, tone, duration, variables, awaitDismissal) {
  try {
    const dialogueRequest = tone === "talk-card"
      ? window.ProjectWDialogue.getDialogueByCategory(dialogueId, "카드획득")
      : window.ProjectWDialogue.getDialogue(dialogueId);
    const [dialogue] = await Promise.all([dialogueRequest, loadAssets()]);
    const page = dialogue?.pages?.[0];
    if (!page || !gameScreen) return false;
    const popup = document.createElement("aside");
    popup.className = `partner-common-sense-popup system-mini-popup is-${tone}`;
    popup.dataset.smallPopupAnchor = "upper";
    popup.hidden = false;

    const character = document.createElement("img");
    character.className = "partner-common-sense-character";
    character.alt = "";
    const assetId = resolveDialogueAssetId(page) || (page.imageCategory === "SD" ? "Asset_SD_01" : "");
    const source = assetId ? (assetMap.get(assetId) ?? assetFallbacks.get(assetId) ?? "") : "";
    character.hidden = !source;
    if (source) character.src = source;

    const copy = document.createElement("div");
    copy.className = "partner-common-sense-copy";
    const header = document.createElement("header");
    const speaker = document.createElement("strong");
    speaker.textContent = replaceDialogueVariables(page.speaker || "나하나", variables);
    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "닫기";
    header.append(speaker, close);
    const message = document.createElement("p");
    renderFormattedText(message, replaceDialogueVariables(page.text, variables));
    copy.append(header, message);
    popup.append(character, copy);
    const popupHost = tone === "bargain-success" || tone === "bargain-failure"
      ? document.body
      : gameScreen;
    popupHost.append(popup);
    registerSmallPopup(popup);

    let timer = 0;
    let resolveDismissal = () => {};
    const dismissal = new Promise(resolve => { resolveDismissal = resolve; });
    let removalStarted = false;
    const remove = () => {
      window.clearTimeout(timer);
      if (removalStarted) return;
      removalStarted = true;
      if (!popup.isConnected) {
        resolveDismissal(true);
        return;
      }
      popup.classList.remove("is-visible");
      popup.classList.add("is-leaving");
      window.setTimeout(() => {
        unregisterSmallPopup(popup);
        popup.remove();
        resolveDismissal(true);
      }, 380);
    };
    close.addEventListener("click", remove);
    requestAnimationFrame(() => {
      popup.classList.add("is-visible");
      scheduleSmallPopupLayout();
    });
    timer = window.setTimeout(remove, Math.max(1000, Number(duration) || SMALL_DIALOG_DURATION_MS));
    return awaitDismissal ? dismissal : true;
  } catch (error) {
    console.error(`미니 대화 ${dialogueId}를 표시하지 못했습니다.`, error);
    return false;
  }
}

async function showPartnerStatusAcquiredDialogue(effectId) {
  await loadNahanaStatusDefinitions();
  const definition = nahanaStatusDefinitions.get(effectId);
  const category = String(definition?.category || "").trim();
  const isBuff = category === "버프";
  const statusName = String(definition?.name || effectId || "상태 변화").trim();
  return showSystemMiniDialogue(
    isBuff ? "DL_NS_001" : "DL_NS_002",
    isBuff ? "status-buff" : "status-debuff",
    SMALL_DIALOG_DURATION_MS,
    {
      상태이상: {
        value: statusName,
        display: `상태이상 : ${statusName}`,
        suffix: " 획득"
      }
    }
  );
}

function unregisterSmallPopup(popup) {
  if (!popup) return;
  delete popup.dataset.smallPopupSequence;
  delete popup.dataset.smallPopupActiveAnchor;
  popup.style.setProperty("--small-popup-stack-offset", "0px");
  scheduleSmallPopupLayout();
}

function scheduleSmallPopupLayout() {
  window.cancelAnimationFrame(smallPopupLayoutFrame);
  smallPopupLayoutFrame = window.requestAnimationFrame(() => {
    smallPopupLayoutFrame = 0;
    ["upper", "lower"].forEach(anchor => {
      const popups = [...document.querySelectorAll(`[data-small-popup-active-anchor="${anchor}"]`)]
        .filter(popup => !popup.hidden && popup.dataset.smallPopupSequence)
        .sort((left, right) => Number(left.dataset.smallPopupSequence) - Number(right.dataset.smallPopupSequence));
      let offset = 0;
      popups.forEach(popup => {
        popup.style.setProperty("--small-popup-stack-offset", `${offset}px`);
        offset += popup.offsetHeight + 12;
      });
    });
  });
}

function showPartnerCommonSensePopup(page) {
  if (!partnerCommonSensePopup || !partnerCommonSenseMessage) return;
  window.clearTimeout(partnerCommonSenseTimer);
  window.clearTimeout(partnerCommonSenseHideTimer);
  partnerCommonSensePopup.hidden = false;
  partnerCommonSensePopup.classList.remove("is-visible", "is-leaving");
  registerSmallPopup(partnerCommonSensePopup);
  partnerCommonSenseSpeaker.textContent = replaceDialogueVariables(page.speaker || "나하나");
  renderFormattedText(partnerCommonSenseMessage, replaceDialogueVariables(page.text));

  const resolvedAssetId = resolveDialogueAssetId(page);
  const assetId = resolvedAssetId || (page.imageCategory === "SD" ? "Asset_SD_01" : "");
  const source = assetId ? (assetMap.get(assetId) ?? assetFallbacks.get(assetId) ?? "") : "";
  if (partnerCommonSenseCharacter) {
    partnerCommonSenseCharacter.hidden = !source;
    if (source) {
      partnerCommonSenseCharacter.dataset.assetId = assetId;
      partnerCommonSenseCharacter.src = source;
      partnerCommonSenseCharacter.alt = `${partnerCommonSenseSpeaker.textContent} SD 캐릭터`;
    } else {
      partnerCommonSenseCharacter.removeAttribute("src");
      delete partnerCommonSenseCharacter.dataset.assetId;
    }
  }
  if (page.assetName && !resolvedAssetId) {
    console.error(`Dialogue 이미지 이름을 Assets 시트에서 찾을 수 없습니다: ${page.imageCategory} / ${page.assetName}`);
    showGameNotice(`Dialogue 이미지 '${page.assetName}'을 Assets 시트에서 찾을 수 없습니다.`);
  }

  requestAnimationFrame(() => requestAnimationFrame(() => partnerCommonSensePopup.classList.add("is-visible")));
  partnerCommonSenseTimer = window.setTimeout(() => hidePartnerCommonSensePopup(), SMALL_DIALOG_DURATION_MS);
}

function hidePartnerCommonSensePopup(immediate = false) {
  if (!partnerCommonSensePopup || partnerCommonSensePopup.hidden) return;
  window.clearTimeout(partnerCommonSenseTimer);
  window.clearTimeout(partnerCommonSenseHideTimer);
  if (immediate) {
    partnerCommonSensePopup.hidden = true;
    partnerCommonSensePopup.classList.remove("is-visible", "is-leaving");
    unregisterSmallPopup(partnerCommonSensePopup);
    return;
  }
  partnerCommonSensePopup.classList.remove("is-visible");
  partnerCommonSensePopup.classList.add("is-leaving");
  partnerCommonSenseHideTimer = window.setTimeout(() => {
    partnerCommonSensePopup.hidden = true;
    partnerCommonSensePopup.classList.remove("is-leaving");
    unregisterSmallPopup(partnerCommonSensePopup);
  }, 560);
}

function beginShopSideDialogueSession(detail = {}) {
  const facilityType = String(detail.facilityType || "").trim();
  shopSideDialogueSessionKey = `${String(detail.settlementId || "")}|${facilityType}|${Date.now()}`;
  shopSideDialogueEnabled = ["상회", "교역소", "시장", "좌판"].includes(facilityType);
  shopSideDialogueDismissAvailable = shopSideDialogueEnabled;
  shopSideDialogueEntries.splice(0);
  closeShopSideDialogueReview();
  updateShopSideDialogueActions();
}

function recordShopSideDialogue(entry = {}) {
  if (!shopSideDialogueEnabled || tradeModal?.hidden) return;
  const text = String(entry.text || "").replace(/\s+/g, " ").trim();
  if (!text) return;
  shopSideDialogueEntries.push({
    sessionKey: shopSideDialogueSessionKey,
    kind: String(entry.kind || "점포 대사"),
    speaker: String(entry.speaker || "나하나"),
    text,
    itemName: String(entry.itemName || ""),
    itemKey: String(entry.itemKey || "")
  });
  shopSideDialogueDismissAvailable = true;
  updateShopSideDialogueActions();
  if (tradeDialogueReviewLayer && !tradeDialogueReviewLayer.hidden) renderShopSideDialogueReview();
}

function updateShopSideDialogueActions() {
  if (tradeDialogueReview) {
    tradeDialogueReview.hidden = !shopSideDialogueEnabled;
    tradeDialogueReview.disabled = !shopSideDialogueEnabled || shopSideDialogueEntries.length === 0;
    tradeDialogueReview.textContent = shopSideDialogueEntries.length > 0
      ? `확인한 조언 ${shopSideDialogueEntries.length}`
      : "확인한 조언";
  }
  if (tradeDialogueDismiss) {
    tradeDialogueDismiss.hidden = !shopSideDialogueEnabled;
    tradeDialogueDismiss.disabled = !shopSideDialogueEnabled || !shopSideDialogueDismissAvailable;
  }
}

function dismissShopSideDialogues() {
  if (!shopSideDialogueEnabled) return;
  window.ProjectWTrade?.dismissMerchantCommentary?.();
  hideMerchantCommentPopup(true);
  document.querySelectorAll(".system-mini-popup.is-bargain-success, .system-mini-popup.is-bargain-failure")
    .forEach(popup => popup.querySelector("button")?.click());
  shopSideDialogueDismissAvailable = false;
  updateShopSideDialogueActions();
}

function openShopSideDialogueReview() {
  if (!tradeDialogueReviewLayer || !shopSideDialogueEnabled || shopSideDialogueEntries.length === 0) return;
  renderShopSideDialogueReview();
  tradeDialogueReviewLayer.hidden = false;
  requestAnimationFrame(() => tradeDialogueReviewClose?.focus());
}

function closeShopSideDialogueReview() {
  if (tradeDialogueReviewLayer) tradeDialogueReviewLayer.hidden = true;
}

function renderShopSideDialogueReview() {
  if (!tradeDialogueReviewList || !tradeDialogueReviewSummary) return;
  tradeDialogueReviewList.replaceChildren();
  tradeDialogueReviewSummary.textContent = `이 점포에서 확인한 상품 조언 ${shopSideDialogueEntries.length}건`;
  shopSideDialogueEntries.forEach((entry, index) => {
    const article = document.createElement("article");
    const heading = document.createElement("header");
    const meta = document.createElement("div");
    const kind = document.createElement("span");
    kind.textContent = entry.kind;
    const sequence = document.createElement("small");
    sequence.textContent = `${index + 1}`.padStart(2, "0");
    meta.append(kind, sequence);
    const speaker = document.createElement("strong");
    speaker.textContent = entry.itemName ? `${entry.speaker} · ${entry.itemName}` : entry.speaker;
    heading.append(meta, speaker);
    const message = document.createElement("p");
    message.textContent = entry.text;
    article.append(heading, message);
    if (entry.itemKey) {
      const focus = document.createElement("button");
      focus.type = "button";
      focus.textContent = "상품 위치 보기";
      focus.addEventListener("click", () => {
        closeShopSideDialogueReview();
        window.ProjectWTrade?.focusMerchantItem?.(entry.itemKey);
      });
      article.append(focus);
    }
    tradeDialogueReviewList.append(article);
  });
}

function showMerchantCommentPopup(page, itemName, itemKey = "") {
  if (!merchantCommentPopup || !merchantCommentMessage) return Promise.resolve();
  hideMerchantCommentPopup(true);
  return new Promise(resolve => {
    merchantCommentResolve = resolve;
    merchantCommentPopup.hidden = false;
    merchantCommentPopup.classList.remove("is-visible", "is-leaving");
    registerSmallPopup(merchantCommentPopup);
    merchantCommentSpeaker.textContent = replaceDialogueVariables(page?.speaker || "나하나");
    renderFormattedText(merchantCommentMessage, replaceDialogueVariables(page?.text, {
      교역품명: String(itemName || "이 물건")
    }));
    recordShopSideDialogue({
      kind: "상품 조언",
      speaker: merchantCommentSpeaker.textContent,
      text: merchantCommentMessage.textContent,
      itemName,
      itemKey
    });
    const itemLink = [...merchantCommentMessage.querySelectorAll(".dialog-emphasis")]
      .find(element => element.textContent.trim() === String(itemName || "").trim());
    if (itemLink && itemKey) {
      itemLink.classList.add("merchant-comment-item-link");
      itemLink.setAttribute("role", "button");
      itemLink.setAttribute("tabindex", "0");
      itemLink.setAttribute("aria-label", `${itemName} 상품 위치로 이동`);
      const focusItem = () => {
        if (window.ProjectWTrade?.focusMerchantItem?.(itemKey)) hideMerchantCommentPopup();
      };
      itemLink.addEventListener("click", focusItem);
      itemLink.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        focusItem();
      });
    }

    const resolvedAssetId = resolveDialogueAssetId(page);
    const assetId = resolvedAssetId || (page?.imageCategory === "SD" ? "Asset_SD_01" : "");
    const source = assetId ? (assetMap.get(assetId) ?? assetFallbacks.get(assetId) ?? "") : "";
    if (merchantCommentCharacter) {
      merchantCommentCharacter.hidden = !source;
      if (source) {
        merchantCommentCharacter.dataset.assetId = assetId;
        merchantCommentCharacter.src = source;
        merchantCommentCharacter.alt = `${merchantCommentSpeaker.textContent} SD 캐릭터`;
      } else {
        merchantCommentCharacter.removeAttribute("src");
        delete merchantCommentCharacter.dataset.assetId;
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(() => merchantCommentPopup.classList.add("is-visible")));
    merchantCommentTimer = window.setTimeout(() => hideMerchantCommentPopup(), SMALL_DIALOG_DURATION_MS);
  });
}

function hideMerchantCommentPopup(immediate = false) {
  window.clearTimeout(merchantCommentTimer);
  window.clearTimeout(merchantCommentHideTimer);
  const finish = () => {
    if (merchantCommentPopup) {
      merchantCommentPopup.hidden = true;
      merchantCommentPopup.classList.remove("is-visible", "is-leaving");
      unregisterSmallPopup(merchantCommentPopup);
    }
    const resolve = merchantCommentResolve;
    merchantCommentResolve = null;
    resolve?.();
  };
  if (!merchantCommentPopup || merchantCommentPopup.hidden || immediate) {
    finish();
    return;
  }
  merchantCommentPopup.classList.remove("is-visible");
  merchantCommentPopup.classList.add("is-leaving");
  merchantCommentHideTimer = window.setTimeout(finish, 560);
}

function beginTavernVisit(placement) {
  hideTavernCommentPopup(true);
  const visitToken = settlementDialogueVisitToken();
  const cacheKey = `${visitToken}|${placement?.id || placement?.name || "tavern"}`;
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  const hangover = partnerHasStatus(partner, "숙취");
  const cached = tavernVisitCache.get(cacheKey);
  const cachedMatchesHangover = Boolean(cached?.dialogueId === "DL_T_009") === hangover;
  if (cached && cachedMatchesHangover) {
    activeTavernVisit = cached;
    return activeTavernVisit;
  }
  if (cached) tavernVisitCache.delete(cacheKey);
  if (!hangover && partner.mood <= 25) {
    activeTavernVisit = { token: cacheKey, placementId: placement?.id || "", dialogueId: "", special: null, variables: {}, readyPromise: Promise.resolve() };
    tavernVisitCache.set(cacheKey, activeTavernVisit);
    return activeTavernVisit;
  }
  account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
  const dialogueId = hangover
    ? "DL_T_009"
    : account.foodUsage.mealUsed
    ? "DL_T_007"
    : `DL_T_${String(1 + Math.floor(Math.random() * 6)).padStart(3, "0")}`;
  activeTavernVisit = { token: cacheKey, placementId: placement?.id || "", dialogueId, special: null, variables: {}, readyPromise: null };
  tavernVisitCache.set(cacheKey, activeTavernVisit);
  activeTavernVisit.readyPromise = prepareTavernVisit(activeTavernVisit, placement);
  return activeTavernVisit;
}

async function prepareTavernVisit(visit, placement) {
  if (!visit) return;
  let dialogueId = visit.dialogueId;
  let variables = {};
  if (dialogueId === "DL_T_002") {
    const special = await window.ProjectWMeal.prepareTavernSpecial("menu", placement);
    if (special?.foodNames?.length === 2) {
      visit.special = special;
      variables = { 메뉴명: special.foodNames };
    } else dialogueId = "DL_T_003";
  } else if (dialogueId === "DL_T_006") {
    visit.special = await window.ProjectWMeal.prepareTavernSpecial("alcohol", placement);
  }
  visit.dialogueId = dialogueId;
  visit.variables = variables;
}

function cancelTavernVisit(preserveSpecial = false) {
  if (preserveSpecial) return;
  hideTavernCommentPopup(true);
  activeTavernVisit = null;
}

async function replayTavernVisitDialogue() {
  const visit = activeTavernVisit;
  if (!visit?.dialogueId) return;
  await visit.readyPromise;
  if (visit !== activeTavernVisit || !window.ProjectWMeal?.isOpen?.()) return;
  await showTavernDialogue(visit.dialogueId, visit.variables || {});
}

async function showTavernDialogue(dialogueId, variables = {}) {
  const dialogueKey = String(dialogueId || "");
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  if (dialogueKey === "DL_T_009" && !partnerHasStatus(partner, "숙취")) return false;
  if (/^DL_T_00[1-8]$/.test(dialogueKey) && partner.mood <= 25) return false;
  try {
    const [dialogue] = await Promise.all([window.ProjectWDialogue.getDialogue(dialogueId), loadAssets()]);
    const page = dialogue.pages[0];
    if (!page) return false;
    showTavernCommentPopup(page, variables);
    if (dialogue.error) showGameNotice("Dialogue CSV를 갱신하지 못해 주점 대화를 불러오지 못했습니다.");
    return true;
  } catch (error) {
    console.error(error);
    showGameNotice("주점 대화를 불러오지 못했습니다. Dialogue 시트 연결을 확인해 주세요.");
    return false;
  }
}

async function showMarketSnackDialogue(record) {
  if (record?.kind !== "snack" || record?.vendor !== "시장") return false;
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  if (partner.mood <= 33) return false;
  const reactions = (Array.isArray(record.foods) ? record.foods : [])
    .map(food => String(food?.reaction || "").trim() || `${String(food?.name || "간식").trim()}, 생각보다 맛있어.`)
    .filter(Boolean);
  if (reactions.length === 0) return false;
  const reaction = reactions[Math.floor(Math.random() * reactions.length)];
  try {
    const [dialogue] = await Promise.all([window.ProjectWDialogue.getDialogue("DL_M_001"), loadAssets()]);
    const page = dialogue.pages[0];
    if (!page) return false;
    showTavernCommentPopup(page, { 리액션: reaction });
    if (dialogue.error) showGameNotice("Dialogue CSV를 갱신하지 못해 간식 대화를 불러오지 못했습니다.");
    return true;
  } catch (error) {
    console.error(error);
    showGameNotice("간식 대화를 불러오지 못했습니다. Dialogue 시트 연결을 확인해 주세요.");
    return false;
  }
}

function showTavernCommentPopup(page, variables = {}) {
  if (!tavernCommentPopup || !tavernCommentMessage) return;
  hideTavernCommentPopup(true);
  tavernCommentPopup.hidden = false;
  tavernCommentPopup.classList.remove("is-visible", "is-leaving");
  registerSmallPopup(tavernCommentPopup);
  tavernCommentSpeaker.textContent = replaceDialogueVariables(page?.speaker || "나하나", variables);
  renderFormattedText(tavernCommentMessage, replaceDialogueVariables(page?.text, variables));
  const resolvedAssetId = resolveDialogueAssetId(page);
  const assetId = resolvedAssetId || (page?.imageCategory === "SD" ? "Asset_SD_01" : "");
  const source = assetId ? (assetMap.get(assetId) ?? assetFallbacks.get(assetId) ?? "") : "";
  if (tavernCommentCharacter) {
    tavernCommentCharacter.hidden = !source;
    if (source) {
      tavernCommentCharacter.dataset.assetId = assetId;
      tavernCommentCharacter.src = source;
      tavernCommentCharacter.alt = `${tavernCommentSpeaker.textContent} SD 캐릭터`;
    } else {
      tavernCommentCharacter.removeAttribute("src");
      delete tavernCommentCharacter.dataset.assetId;
    }
  }
  requestAnimationFrame(() => requestAnimationFrame(() => tavernCommentPopup.classList.add("is-visible")));
  tavernCommentTimer = window.setTimeout(() => hideTavernCommentPopup(), TAVERN_DIALOG_DURATION_MS);
}

function hideTavernCommentPopup(immediate = false) {
  window.clearTimeout(tavernCommentTimer);
  window.clearTimeout(tavernCommentHideTimer);
  if (!tavernCommentPopup || tavernCommentPopup.hidden) return;
  const finish = () => {
    tavernCommentPopup.hidden = true;
    tavernCommentPopup.classList.remove("is-visible", "is-leaving");
    unregisterSmallPopup(tavernCommentPopup);
  };
  if (immediate) {
    finish();
    return;
  }
  tavernCommentPopup.classList.remove("is-visible");
  tavernCommentPopup.classList.add("is-leaving");
  tavernCommentHideTimer = window.setTimeout(finish, 560);
}

function showRoadDialogue(dialogueId, durationMs) {
  const now = Date.now();
  const startsAt = Math.max(now, roadCommentAvailableAt);
  roadCommentAvailableAt = startsAt + durationMs + 700;
  pendingRoadDialogueCount += 1;
  window.setTimeout(() => void presentRoadDialogue(dialogueId, durationMs), Math.max(0, startsAt - now));
  return true;
}

function roadDialoguePresentationBlocked() {
  if (!account || gameScreen.hidden || gameEntryInProgress) return true;
  return Boolean(activeTalkCardId || tutorialRuntime || advancedTutorialRuntime
    || pendingSystemMiniDialogueCount > 0
    || travelPauseReasons.has("talk-card") || travelPauseReasons.has("tutorial")
    || travelPauseReasons.has("advanced-tutorial") || travelPauseReasons.has("dialog")
    || travelPauseReasons.has("road-comment") || travelPauseReasons.has("route-event-check")
    || travelPauseReasons.has("route-event") || !dialogModal.hidden || !routeEventModal.hidden
    || !sceneTransition.hidden || (partnerEventPanel && !partnerEventPanel.hidden));
}

async function presentRoadDialogue(dialogueId, durationMs) {
  if (!roadCommentPopup || !roadCommentMessage) {
    pendingRoadDialogueCount = Math.max(0, pendingRoadDialogueCount - 1);
    schedulePendingRoadArrivalContinuation();
    return false;
  }
  if (!account || gameScreen.hidden) {
    pendingRoadDialogueCount = Math.max(0, pendingRoadDialogueCount - 1);
    schedulePendingNarrativePresentation();
    schedulePendingRoadArrivalContinuation();
    return false;
  }
  if (roadDialoguePresentationBlocked()) {
    window.setTimeout(() => void presentRoadDialogue(dialogueId, durationMs), 250);
    return false;
  }
  try {
    const [dialogue] = await Promise.all([window.ProjectWDialogue.getDialogue(dialogueId), loadAssets()]);
    const page = dialogue.pages?.[0];
    if (!page) return false;
    hideRoadCommentPopup(true);
    pauseTravelClock("road-comment");
    roadCommentPopup.hidden = false;
    roadCommentPopup.classList.remove("is-visible", "is-leaving");
    registerSmallPopup(roadCommentPopup);
    roadCommentSpeaker.textContent = replaceDialogueVariables(page.speaker || "나하나");
    renderFormattedText(roadCommentMessage, replaceDialogueVariables(page.text));
    const resolvedAssetId = resolveDialogueAssetId(page);
    const assetId = resolvedAssetId || (page.imageCategory === "SD" ? "Asset_SD_01" : "");
    const source = assetId ? (assetMap.get(assetId) ?? assetFallbacks.get(assetId) ?? "") : "";
    if (roadCommentCharacter) {
      roadCommentCharacter.hidden = !source;
      if (source) {
        roadCommentCharacter.dataset.assetId = assetId;
        roadCommentCharacter.src = source;
        roadCommentCharacter.alt = `${roadCommentSpeaker.textContent} SD 캐릭터`;
      } else roadCommentCharacter.removeAttribute("src");
    }
    requestAnimationFrame(() => requestAnimationFrame(() => roadCommentPopup.classList.add("is-visible")));
    roadCommentTimer = window.setTimeout(() => hideRoadCommentPopup(), durationMs);
    return true;
  } catch (error) {
    console.error(error);
    resumeTravelClock("road-comment");
    return false;
  } finally {
    pendingRoadDialogueCount = Math.max(0, pendingRoadDialogueCount - 1);
    if (account?.travel?.pendingRoadArrivalContinuation && !isTravelClockPaused()) scheduleTravelStep();
  }
}

function hideRoadCommentPopup(immediate = false) {
  window.clearTimeout(roadCommentTimer);
  window.clearTimeout(roadCommentHideTimer);
  if (!roadCommentPopup || roadCommentPopup.hidden) {
    resumeTravelClock("road-comment");
    return;
  }
  const finish = () => {
    roadCommentPopup.hidden = true;
    roadCommentPopup.classList.remove("is-visible", "is-leaving");
    unregisterSmallPopup(roadCommentPopup);
    resumeTravelClock("road-comment");
    schedulePendingNarrativePresentation();
  };
  if (immediate) return finish();
  roadCommentPopup.classList.remove("is-visible");
  roadCommentPopup.classList.add("is-leaving");
  roadCommentHideTimer = window.setTimeout(finish, 560);
}

function loadNahanaStatusDefinitions() {
  if (nahanaStatusLoadPromise) return nahanaStatusLoadPromise;
  if (partnerStatusSource) {
    partnerStatusSource.hidden = false;
    partnerStatusSource.textContent = "상태 정보 불러오는 중";
  }
  nahanaStatusLoadPromise = window.ProjectWData.loadCsv(NAHANA_STATUS_CSV_URL)
    .then(rows => {
      nahanaStatusDefinitions.clear();
      rows.forEach(row => {
        const id = String(row.ID ?? "").trim();
        const name = String(row["이름"] ?? "").trim();
        if (!id || !name) return;
        const definition = {
          id,
          name,
          category: String(row["분류"] ?? "").trim(),
          description1: String(row["설명_1"] ?? "").trim(),
          description2: String(row["설명_2"] ?? "").trim(),
          duration: String(row["지속 시간"] ?? row["지속시간"] ?? "").trim()
        };
        nahanaStatusDefinitions.set(id, definition);
        nahanaStatusDefinitions.set(name, definition);
      });
      if (!nahanaStatusDefinitions.size) throw new Error("Nahana_S 시트에 표시할 상태이상 데이터가 없습니다.");
      if (partnerStatusSource) partnerStatusSource.hidden = true;
      updatePartnerUi();
      return true;
    })
    .catch(error => {
      console.error(error);
      if (partnerStatusSource) {
        partnerStatusSource.hidden = false;
        partnerStatusSource.textContent = "상태 정보 연결 실패 · 이름만 표시";
      }
      renderPartnerStatusEffects(normalizePartnerState(account?.partner, account?.partnerMoodAdjustment).effects);
      return false;
    });
  return nahanaStatusLoadPromise;
}

function loadNahanaEventDefinitions() {
  if (nahanaEventLoadPromise) return nahanaEventLoadPromise;
  nahanaEventLoadPromise = window.ProjectWData.loadCsv(NAHANA_EVENT_CSV_URL)
    .then(rows => {
      nahanaEventDefinitions.clear();
      rows.forEach(row => {
        const id = String(row.ID ?? "").trim();
        const name = String(row["이름"] ?? "").trim();
        if (!id || !name) return;
        nahanaEventDefinitions.set(id, {
          id,
          name,
          condition1: String(row["이벤트 발생 조건"] ?? row["조건_1"] ?? "").trim(),
          condition2: String(row["이벤트 진행 조건"] ?? row["조건_2"] ?? "").trim(),
          condition3: String(row["이벤트 완료 조건"] ?? row["조건_3"] ?? "").trim(),
          reward: String(row["보상"] ?? "").trim(),
          hardcodedDialogues: [1, 2, 3].map(index => String(row[`연결된 대화_하드코딩_${index}`] ?? "").trim()),
          linkedDialogues: [1, 2, 3].map(index => String(row[`연결된 대화_${index}`] ?? "").trim()),
          tutorialId: parseNahanaEventTutorialId(row["튜토리얼"], id)
        });
      });
      if (!nahanaEventDefinitions.size) throw new Error("Nahana_Event 시트에 이벤트 데이터가 없습니다.");
      updatePartnerEventUi();
      if (partnerEventPanel && !partnerEventPanel.hidden) renderPartnerEventPanel();
      return true;
    })
    .catch(error => {
      console.error(error);
      if (partnerEventPanel && !partnerEventPanel.hidden) renderPartnerEventPanel(true);
      return false;
    });
  return nahanaEventLoadPromise;
}

function parseNahanaEventTutorialId(value, eventId = "") {
  const eventTutorialId = {
    N_E_002: TUTORIAL_IDS.INFORMATION_GATHERING,
    N_E_003: TUTORIAL_IDS.SPIRIT_BLESSING,
    N_E_004: TUTORIAL_IDS.GUILD_CONTRIBUTION
  }[eventId];
  if (eventTutorialId) return eventTutorialId;
  const match = String(value ?? "").trim().match(/(\d+)/);
  return match ? Math.max(0, Math.trunc(Number(match[1]) || 0)) : 0;
}

function grantNahanaEventFeatureUnlocks(eventId) {
  if (!account) return false;
  account.featureUnlocks = normalizeFeatureUnlocks(account.featureUnlocks, false);
  const keys = eventId === "N_E_002"
    ? ["information"]
    : eventId === "N_E_003"
      ? ["spiritBlessing"]
      : eventId === "N_E_004"
        ? ["guildAccess", "guildContribution"]
        : [];
  let changed = false;
  keys.forEach(key => {
    if (!account.featureUnlocks[key]) {
      account.featureUnlocks[key] = true;
      changed = true;
    }
  });
  if (changed) {
    updatePartnerUi();
    updateInformationButton(mealInfoCollect, "주점");
    if (activeServiceContext) updateInformationButton(serviceInfoCollect, activeServiceContext.type, activeServiceContext.placement);
    updateGuildContributionAvailabilityUi();
    if (keys.includes("guildAccess")) syncTravelExperience();
  }
  return changed;
}

async function applyNahanaEventStageEffects(eventId, stage) {
  if (!account) return;
  if (eventId === "N_E_005" && stage === 3) {
    window.ProjectWTrade?.refresh?.();
    return;
  }
  if (eventId === "N_E_003" && stage === 2) {
    await ensureSpiritEventTalkCard();
    return;
  }
  if (eventId === "N_E_003" && stage === 3) {
    grantNahanaEventFeatureUnlocks(eventId);
    account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
    account.partner.spirit = Math.max(1, account.partner.spirit);
    persistAccount();
    closePartnerEventPanel();
    if (window.ProjectWInn?.isOpen?.() && window.ProjectWInn?.isSceneVisit?.()) openInnSceneView("partner", 1);
    else showScene("partner", 1, false);
    if (shouldStartTutorial(TUTORIAL_IDS.SPIRIT_BLESSING)) startTutorial(TUTORIAL_IDS.SPIRIT_BLESSING);
    return;
  }
  if (eventId === "N_E_004" && stage === 3) {
    unlockFeature("guildAccess");
    const state = normalizeNahanaEventState(account.nahanaEvents);
    state.pendingTutorialId = TUTORIAL_IDS.GUILD_CONTRIBUTION;
    account.nahanaEvents = state;
    persistAccount();
    window.setTimeout(() => {
      const current = normalizeNahanaEventState(account?.nahanaEvents);
      if (current.activeId !== "N_E_004" || current.stage !== 3
        || current.pendingTutorialId !== TUTORIAL_IDS.GUILD_CONTRIBUTION) return;
      closePartnerEventPanel();
      showScene("road", -1, false);
      void startPendingNahanaEventTutorial();
    }, 0);
    return;
  }
  if (eventId === "N_E_011" && stage === 3) {
    const currentTravel = ensureTravelState();
    if (currentTravel?.mode === "camp") return;
    await playSituationTransition("", async () => {
      const travel = ensureTravelState();
      if (!travel || travel.positionId !== START_POSITION_ID) return;
      account.worldTime = normalizeWorldTime(account.worldTime);
      account.worldTime.phaseIndex = TIME_PHASES.indexOf("저녁");
      enterCampAtCurrentPosition(travel);
      persistAccount();
      syncTravelExperience();
      await waitForSceneVisuals([roadBackground, partnerBackground, mapBackground]);
    });
  }
}

function reconcileActiveNahanaEventStage() {
  if (!account) return;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (!state.activeId) return;
  void applyNahanaEventStageEffects(state.activeId, state.stage);
}

function companionEventIds() {
  return ["N_E_001", ...COMPANION_EVENT_RANKS.map((_, index) => `N_E_${String(index + 2).padStart(3, "0")}`)];
}

function queueNahanaSituationEvent(eventId) {
  if (!account) return false;
  const id = String(eventId || "").trim();
  if (!NAHANA_SITUATION_EVENT_IDS.includes(id)) return false;
  const state = normalizeNahanaSituationEventState(account.nahanaSituationEvents);
  if (state.completedIds.includes(id) || state.pendingIds.includes(id) || activeNahanaSituationEventId === id) return false;
  state.pendingIds.push(id);
  account.nahanaSituationEvents = state;
  persistAccount();
  schedulePendingNarrativePresentation();
  return true;
}

function queueNahanaSituationEventsForArrival(placementId = "") {
  if (!account) return false;
  const id = String(placementId || "").trim();
  const placement = window.ProjectWMapView.getPlacement(id);
  if (!id || !placement) return false;
  const region = String(placement.region || wolfenRegionAtPlacement(id) || "").trim();
  const routeName = String(placement.name || "").replace(/\s+/g, "");
  const weather = String(weatherAtPlacement(id)?.label || "").trim();
  let queued = false;
  if (region === "북부") queued = queueNahanaSituationEvent("E_001") || queued;
  if (region === "남부") queued = queueNahanaSituationEvent("E_002") || queued;
  if (/대호수.*가도/.test(routeName)) queued = queueNahanaSituationEvent("E_003") || queued;
  if (id === "MAP_DOT_0147") queued = queueNahanaSituationEvent("E_004") || queued;
  if (id === "MAP_DOT_0005") queued = queueNahanaSituationEvent("E_005") || queued;
  const weatherEventId = ({ 비: "E_012", 눈: "E_013", 폭우: "E_014", 폭설: "E_015" })[weather];
  if (weatherEventId) queued = queueNahanaSituationEvent(weatherEventId) || queued;
  return queued;
}

function nahanaSituationEventRewardExperience(definition) {
  const match = String(definition?.reward || "").match(/동행\s*(?:포인트|경험치)?\s*(\d+)/);
  return Math.max(0, Math.trunc(Number(match?.[1]) || 10));
}

function completeNahanaSituationEvent(eventId, definition) {
  if (!account) return false;
  const id = String(eventId || "").trim();
  const state = normalizeNahanaSituationEventState(account.nahanaSituationEvents);
  if (state.completedIds.includes(id)) {
    activeNahanaSituationEventId = "";
    state.pendingIds = state.pendingIds.filter(pendingId => pendingId !== id);
    account.nahanaSituationEvents = state;
    persistAccount();
    closeDialog();
    return false;
  }
  state.pendingIds = state.pendingIds.filter(pendingId => pendingId !== id);
  state.completedIds.push(id);
  account.nahanaSituationEvents = state;
  activeNahanaSituationEventId = "";
  persistAccount();
  closeDialog();
  const reward = nahanaSituationEventRewardExperience(definition);
  if (reward > 0) addCompanionExperience(reward, `${definition?.name || "나하나 상황 이벤트"} 완료`);
  if (state.pendingIds.length) schedulePendingNarrativePresentation();
  else schedulePendingRoadArrivalContinuation();
  return true;
}

async function beginNextNahanaSituationEvent() {
  if (!account || activeNahanaSituationEventId || narrativePresentationBlocked()) return false;
  let state = normalizeNahanaSituationEventState(account.nahanaSituationEvents);
  const eventId = state.pendingIds[0] || "";
  if (!eventId) return false;
  activeNahanaSituationEventId = eventId;
  const loaded = await loadNahanaEventDefinitions();
  state = normalizeNahanaSituationEventState(account?.nahanaSituationEvents);
  const definition = nahanaEventDefinitions.get(eventId);
  if (!loaded || !definition || !state.pendingIds.includes(eventId)) {
    activeNahanaSituationEventId = "";
    if (state.pendingIds.includes(eventId)) {
      state.pendingIds = state.pendingIds.filter(pendingId => pendingId !== eventId);
      account.nahanaSituationEvents = state;
      persistAccount();
      showGameNotice("나하나 상황 이벤트 데이터를 불러오지 못해 이번 표시를 건너뜁니다.");
    }
    schedulePendingNarrativePresentation();
    schedulePendingRoadArrivalContinuation();
    return false;
  }
  if (narrativePresentationBlocked({ ignoreSituationEvent: true })) {
    activeNahanaSituationEventId = "";
    schedulePendingNarrativePresentation();
    return false;
  }
  const dialogueId = definition.linkedDialogues[0];
  if (!dialogueId) return completeNahanaSituationEvent(eventId, definition);
  const finish = () => completeNahanaSituationEvent(eventId, definition);
  const played = await playDialogue(dialogueId, finish, { onSkip: finish, context: "nahana-situation" });
  if (!played) {
    activeNahanaSituationEventId = "";
    if (narrativePresentationBlocked()) {
      schedulePendingNarrativePresentation();
    } else {
      state = normalizeNahanaSituationEventState(account?.nahanaSituationEvents);
      state.pendingIds = state.pendingIds.filter(pendingId => pendingId !== eventId);
      account.nahanaSituationEvents = state;
      persistAccount();
      showGameNotice("나하나 상황 대화를 시작하지 못해 이번 표시를 건너뜁니다.");
      schedulePendingNarrativePresentation();
      schedulePendingRoadArrivalContinuation();
    }
  }
  return played;
}

function activateNahanaEvent(eventId, attention = "new", occurrenceSatisfied = false) {
  if (!account) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  const ids = companionEventIds();
  const eventIndex = ids.indexOf(String(eventId || ""));
  if (eventIndex < 0 || state.completedIds.includes(ids[eventIndex])) return false;
  if (state.activeId === ids[eventIndex]) {
    if (occurrenceSatisfied && state.stage === 1) {
      pendingNahanaEventOpeningId = state.activeId;
      schedulePendingNarrativePresentation();
    }
    return true;
  }
  if (state.activeId) return false;
  if (!ids.slice(0, eventIndex).every(id => state.completedIds.includes(id))) return false;
  state.activeId = ids[eventIndex];
  state.stage = 1;
  state.attention = attention === "progress" ? "progress" : "new";
  state.context = { settlementId: "", tavernVisited: false, giftPurchased: false };
  account.nahanaEvents = state;
  persistAccount();
  updatePartnerEventUi();
  if (occurrenceSatisfied) {
    pendingNahanaEventOpeningId = state.activeId;
    schedulePendingNarrativePresentation();
  }
  return true;
}

async function beginNahanaEventOpening(eventId) {
  if (!account || !eventId || nahanaEventOpeningId === eventId || narrativePresentationBlocked()) return false;
  nahanaEventOpeningId = eventId;
  await loadNahanaEventDefinitions();
  const state = normalizeNahanaEventState(account.nahanaEvents);
  const definition = nahanaEventDefinitions.get(eventId);
  if (state.activeId !== eventId || state.stage !== 1 || !definition) {
    if (pendingNahanaEventOpeningId === eventId) pendingNahanaEventOpeningId = "";
    nahanaEventOpeningId = "";
    schedulePendingNarrativePresentation();
    schedulePendingRoadArrivalContinuation();
    return false;
  }
  if (narrativePresentationBlocked()) {
    nahanaEventOpeningId = "";
    return false;
  }
  if (pendingNahanaEventOpeningId === eventId) pendingNahanaEventOpeningId = "";
  const dialogueId = definition.linkedDialogues[0];
  if (dialogueId) {
    const played = await playDialogue(dialogueId, closeDialog, { onSkip: closeDialog, context: "nahana-event" });
    if (!played) {
      nahanaEventOpeningId = "";
      if (narrativePresentationBlocked()) {
        pendingNahanaEventOpeningId = eventId;
        schedulePendingNarrativePresentation();
      } else {
        if (pendingNahanaEventOpeningId === eventId) pendingNahanaEventOpeningId = "";
        showGameNotice("나하나 이벤트 대화를 시작하지 못했습니다. 이벤트 알림은 유지됩니다.");
        schedulePendingNarrativePresentation();
        schedulePendingRoadArrivalContinuation();
      }
    }
    return played;
  }
  state.stage = 2;
  state.attention = "progress";
  account.nahanaEvents = state;
  persistAccount();
  updatePartnerEventUi();
  await applyNahanaEventStageEffects(eventId, state.stage);
  if (eventId === "N_E_001") {
    const placement = currentSettlementPlacement();
    if (placement?.id === FIRST_TUTORIAL_DESTINATION_ID) {
      window.setTimeout(() => void playNahanaEventHardcodedDialogue("N_E_001", 0, {
        현재거점명: placement.name || "하이렌바흐"
      }), 0);
    }
  }
  nahanaEventOpeningId = "";
  schedulePendingRoadArrivalContinuation();
  return true;
}

function triggerNahanaEventOccurrence(eventId) {
  if (!account || !eventId) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId === eventId && state.stage === 1) {
    pendingNahanaEventOpeningId = eventId;
    schedulePendingNarrativePresentation();
    return true;
  }
  return activateNahanaEvent(eventId, "new", true);
}

function isNahanaEventDialogueCompleted(dialogueId) {
  const id = String(dialogueId || "").trim();
  return Boolean(id) && normalizeTutorialProgress(account?.tutorialProgress).dialogueCompleted.includes(id);
}

async function playNahanaEventHardcodedDialogue(eventId, dialogueIndex, variables = {}) {
  if (!account) return false;
  await loadNahanaEventDefinitions();
  const state = normalizeNahanaEventState(account.nahanaEvents);
  const dialogueId = nahanaEventDefinitions.get(eventId)?.hardcodedDialogues?.[dialogueIndex] || "";
  const key = `${eventId}:${dialogueId}`;
  if (state.activeId !== eventId || !dialogueId || isNahanaEventDialogueCompleted(dialogueId)
    || nahanaEventHardcodedDialoguesInFlight.has(key)) return false;
  nahanaEventHardcodedDialoguesInFlight.add(key);
  const finish = () => {
    nahanaEventHardcodedDialoguesInFlight.delete(key);
    closeDialog();
  };
  const played = await playDialogue(dialogueId, finish, { onSkip: finish, variables });
  if (!played) nahanaEventHardcodedDialoguesInFlight.delete(key);
  return played;
}

async function resolveNahanaEventCondition(conditionNumber) {
  if (!account || (conditionNumber !== 2 && conditionNumber !== 3)) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (!state.activeId) return false;
  if (conditionNumber === 2 && state.stage !== 2) return false;
  if (conditionNumber === 3 && state.stage !== 3) return false;
  await loadNahanaEventDefinitions();
  const definition = nahanaEventDefinitions.get(state.activeId);
  if (!definition) return false;
  const dialogueId = definition.linkedDialogues[conditionNumber - 1];
  if (dialogueId) {
    const variables = {
      현재거점명: currentSettlementPlacement()?.name
        || (state.context.settlementId ? getPlacementName(state.context.settlementId) : "")
        || getPlacementName(account.travel?.positionId)
    };
    return playDialogue(dialogueId, closeDialog, { onSkip: closeDialog, variables });
  }
  if (conditionNumber === 3) return completeNahanaEvent(state.activeId);
  state.stage = 3;
  state.attention = "progress";
  account.nahanaEvents = state;
  persistAccount();
  updatePartnerEventUi();
  await applyNahanaEventStageEffects(state.activeId, state.stage);
  return true;
}

function refreshNahanaEventAvailability() {
  if (!account) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  account.nahanaEvents = state;
  if (state.activeId) return false;
  const ids = companionEventIds();
  const nextIndex = ids.findIndex(id => !state.completedIds.includes(id));
  if (nextIndex < 0) return false;
  if (ids[nextIndex] === "N_E_001") {
    const completedDialogues = normalizeTutorialProgress(account.tutorialProgress).dialogueCompleted;
    if (!completedDialogues.includes("DL_002")) return false;
    return activateNahanaEvent(ids[nextIndex], "new", true);
  }
  const rank = normalizePartnerState(account.partner, account.partnerMoodAdjustment).companionRank;
  const rankIndex = nextIndex - 1;
  if (rankIndex < 0 || rank < COMPANION_EVENT_RANKS[rankIndex]) return false;
  return activateNahanaEvent(ids[nextIndex], "new", true);
}

async function handleNahanaEventSettlementEntry(placement) {
  if (!account || !placement) return;
  let state = normalizeNahanaEventState(account.nahanaEvents);
  account.nahanaEvents = state;
  if (placement.id === FIRST_TUTORIAL_DESTINATION_ID && !state.hirenbachTriggered) {
    state.hirenbachTriggered = true;
    account.nahanaEvents = state;
    persistAccount();
    updatePartnerEventUi();
  }
  await loadNahanaEventDefinitions();
  if (!state.activeId) refreshNahanaEventAvailability();
  state = normalizeNahanaEventState(account.nahanaEvents);
  if (!state.activeId) return;
  if (state.stage === 2 && state.activeId === "N_E_001" && placement.id === FIRST_TUTORIAL_DESTINATION_ID) {
    await playNahanaEventHardcodedDialogue("N_E_001", 0, { 현재거점명: placement.name || "하이렌바흐" });
    return;
  }
  if (state.stage === 2 && state.activeId === "N_E_002" && ["도시", "대도시"].includes(String(placement.category || ""))) {
    await resolveNahanaEventCondition(2);
    return;
  }
  if (state.stage === 2 && state.activeId === "N_E_004" && placement.category === "대도시") {
    await resolveNahanaEventCondition(2);
    return;
  }
  if (state.stage === 2 && state.activeId === "N_E_007" && placement.category === "관문") {
    state.context.settlementId = placement.id;
    account.nahanaEvents = state;
    persistAccount();
    await resolveNahanaEventCondition(2);
    return;
  }
  if (state.stage === 2 && state.activeId === "N_E_008" && placement.category === "대도시") {
    state.context.settlementId = placement.id;
    account.nahanaEvents = state;
    persistAccount();
    const festivalId = ({ 북부: "C_E_121", 중부: "C_E_122", 남부: "C_E_123" })[String(placement.region || "")];
    if (festivalId) await window.ProjectWCityEvents?.applyScriptedEvent?.(placement, festivalId);
    await resolveNahanaEventCondition(2);
    return;
  }
  if (state.stage === 2 && state.activeId === "N_E_009"
    && placement.category === "대도시" && placement.region === "남부") {
    state.context.settlementId = placement.id;
    account.nahanaEvents = state;
    persistAccount();
    await resolveNahanaEventCondition(2);
    return;
  }
  if (state.stage === 2 && state.activeId === "N_E_010"
    && placement.category === "마을" && placement.region === "북부") {
    state.context.settlementId = placement.id;
    account.nahanaEvents = state;
    persistAccount();
    await resolveNahanaEventCondition(2);
    return;
  }
  if (state.stage !== 1) return;
  const definition = nahanaEventDefinitions.get(state.activeId);
  if (definition?.condition1 && matchesNahanaEventLocation(definition.condition1, placement)) {
    pendingNahanaEventOpeningId = state.activeId;
    schedulePendingNarrativePresentation();
  }
}

function matchesNahanaEventLocation(condition, placement) {
  const normalized = String(condition || "").replaceAll(" ", "").toLowerCase();
  const placementId = String(placement?.id || "").replaceAll(" ", "").toLowerCase();
  const placementName = String(placement?.name || "").replaceAll(" ", "").toLowerCase();
  return Boolean(normalized && ((placementId && normalized.includes(placementId)) || (placementName && normalized.includes(placementName))));
}

async function openPartnerEventPanel() {
  if (!partnerEventPanel || !account) return;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (!state.activeId) return;
  closePartnerSnackPanel();
  closePartnerFeature();
  partnerEventPanel.hidden = false;
  state.attention = "";
  account.nahanaEvents = state;
  persistAccount();
  updatePartnerEventUi();
  renderPartnerEventPanel();
  await loadNahanaEventDefinitions();
  if (!partnerEventPanel.hidden) renderPartnerEventPanel();
  if (isTutorialActive(3) && normalizeTutorialProgress(account.tutorialProgress).step === 1) setTutorialStep(2);
}

async function handlePartnerEventAlertClick() {
  if (!account) return;
  if (currentScene !== "partner") {
    if (window.ProjectWInn?.isOpen?.()) openInnSceneView("partner", 1);
    else showScene("partner", 1, true);
    return;
  }
  await openPartnerEventPanel();
}

function closePartnerEventPanel() {
  if (partnerEventPanel) partnerEventPanel.hidden = true;
  partnerEventAlert?.setAttribute("aria-expanded", "false");
  if (isTutorialActive(3) && normalizeTutorialProgress(account?.tutorialProgress).step === 3) setTutorialStep(4);
  schedulePendingNarrativePresentation();
}

function renderPartnerEventPanel(loadFailed = false) {
  if (!partnerEventPanel || !account) return;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  const definition = nahanaEventDefinitions.get(state.activeId);
  if (partnerEventTitle) partnerEventTitle.textContent = definition?.name || state.activeId || "이벤트";
  if (partnerEventStatus) {
    partnerEventStatus.textContent = loadFailed
      ? "Nahana_Event 시트를 불러오지 못했습니다. 연결 상태를 확인해 주세요."
      : !definition
        ? "이벤트 정보를 불러오고 있습니다."
        : state.stage === 3
          ? "진행 조건을 마쳤습니다. 이벤트 완료 조건을 확인하세요."
          : state.stage === 2
            ? "이벤트가 시작되었습니다. 진행 조건을 확인하세요."
            : "이벤트 발생 조건을 확인하세요.";
  }
  if (partnerEventCondition1Text) partnerEventCondition1Text.textContent = definition?.condition1 || "등록된 이벤트 발생 조건이 없습니다.";
  if (partnerEventCondition2Text) partnerEventCondition2Text.textContent = definition?.condition2 || "등록된 이벤트 진행 조건이 없습니다.";
  if (partnerEventCondition3Text) partnerEventCondition3Text.textContent = definition?.condition3 || "등록된 이벤트 완료 조건이 없습니다.";
  if (partnerEventRewardText) partnerEventRewardText.textContent = definition?.reward || "등록된 보상이 없습니다.";
  partnerEventCondition1?.classList.toggle("is-current", state.stage === 1);
  partnerEventCondition1?.classList.toggle("is-complete", state.stage >= 2);
  partnerEventCondition2?.classList.toggle("is-current", state.stage === 2);
  partnerEventCondition2?.classList.toggle("is-complete", state.stage >= 3);
  partnerEventCondition3?.classList.toggle("is-current", state.stage === 3);
}

function applyNahanaEventReward(eventId, state) {
  if (!account || state.rewardGrantedIds.includes(eventId)) return false;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  if (["N_E_001", "N_E_005", "N_E_008", "N_E_011"].includes(eventId)) account.partner.upgradePoints += 1;
  if (["N_E_006", "N_E_007", "N_E_009", "N_E_010"].includes(eventId)) {
    window.ProjectWMerchantPath?.grantPeddlerPoints?.(1);
  }
  if (["N_E_002", "N_E_003", "N_E_004"].includes(eventId)) grantNahanaEventFeatureUnlocks(eventId);
  state.rewardGrantedIds.push(eventId);
  updatePartnerUi();
  return true;
}

function reconcileCompletedNahanaEventRewards() {
  if (!account) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  let changed = false;
  state.completedIds.forEach(eventId => {
    if (applyNahanaEventReward(eventId, state)) changed = true;
  });
  account.nahanaEvents = state;
  return changed;
}

function completeNahanaEvent(eventId) {
  if (!account || !eventId) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId !== eventId) return false;
  if (!state.completedIds.includes(eventId)) state.completedIds.push(eventId);
  applyNahanaEventReward(eventId, state);
  state.activeId = "";
  state.stage = 1;
  state.attention = "";
  state.context = { settlementId: "", tavernVisited: false, giftPurchased: false };
  state.pendingRewardId = eventId;
  account.nahanaEvents = normalizeNahanaEventState(state);
  persistAccount();
  closePartnerEventPanel();
  updatePartnerEventUi();
  window.setTimeout(() => void showPendingNahanaEventReward(), 0);
  return true;
}

async function showPendingNahanaEventReward() {
  if (!account || nahanaEventRewardDialogOpen) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (!state.pendingRewardId) return false;
  await loadNahanaEventDefinitions();
  const definition = nahanaEventDefinitions.get(state.pendingRewardId);
  if (!definition) return false;
  nahanaEventRewardDialogOpen = true;
  openDialog({
    speaker: "이벤트 완료",
    message: "",
    showCharacter: false,
    actions: [{
      label: "보상 확인",
      primary: true,
      onClick: () => closeNahanaEventReward(definition)
    }]
  });
  dialogCard.classList.add("is-event-completion");
  const summary = document.createElement("section");
  summary.className = "event-completion-summary";
  const eventHeader = document.createElement("header");
  const eventLabel = document.createElement("span");
  eventLabel.textContent = "완료한 이벤트";
  const eventName = document.createElement("strong");
  eventName.textContent = definition.name;
  eventHeader.append(eventLabel, eventName);
  const reward = document.createElement("div");
  const rewardLabel = document.createElement("span");
  rewardLabel.textContent = "완료 보상";
  const rewardText = document.createElement("p");
  rewardText.textContent = definition.reward || "새로운 기능이 해금되었습니다.";
  reward.append(rewardLabel, rewardText);
  summary.append(eventHeader, reward);
  dialogMessage.replaceChildren(summary);
  return true;
}

function closeNahanaEventReward(definition) {
  if (!account) return;
  const eventId = String(definition?.id || "");
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.pendingRewardId === eventId) state.pendingRewardId = "";
  state.pendingTutorialId = Math.max(0, Math.trunc(Number(definition?.tutorialId) || 0));
  account.nahanaEvents = state;
  if (eventId === "N_E_001") unlockFeature("permanentBlessing");
  nahanaEventRewardDialogOpen = false;
  closeDialog();
  persistAccount();
  if (eventId === "N_E_001" && shouldStartTutorial(7)) {
    addPartnerStatus("N_S_006");
    startTutorial(7);
    return;
  }
  void startPendingNahanaEventTutorial();
}

async function startPendingNahanaEventTutorial() {
  if (!account) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  const tutorialId = state.pendingTutorialId;
  if (!tutorialId) return false;
  const tutorial = normalizeTutorialProgress(account.tutorialProgress);
  if (tutorial.completed.includes(tutorialId)) {
    if (tutorialId === TUTORIAL_IDS.GUILD_CONTRIBUTION) unlockFeature("guildContribution");
    state.pendingTutorialId = 0;
    account.nahanaEvents = state;
    persistAccount();
    return false;
  }
  if (tutorial.activeId && tutorial.activeId !== tutorialId) return false;
  if (tutorialId === 10) {
    await playSituationTransition("", async () => {
      closePartnerEventPanel();
      closePartnerFeature();
      if (window.ProjectWInn?.isOpen?.() && window.ProjectWInn?.isSceneVisit?.()) openInnSceneView("partner", 1);
      else showScene("partner", 1, false);
    });
  }
  state.pendingTutorialId = 0;
  account.nahanaEvents = state;
  persistAccount();
  return startTutorial(tutorialId);
}

function updatePartnerEventUi() {
  if (!partnerEventAlert) return;
  const state = normalizeNahanaEventState(account?.nahanaEvents);
  const visible = Boolean(account && state.activeId && !state.completedIds.includes(state.activeId));
  partnerEventAlert.hidden = !visible;
  partnerEventAlert.setAttribute("aria-hidden", String(!visible));
  partnerEventAlert.classList.toggle("is-new", visible && state.attention === "new");
  partnerEventAlert.classList.toggle("is-progress", visible && state.attention === "progress");
  const alertLabel = state.attention === "progress"
    ? "진행 조건이 갱신된 나하나 이벤트가 있습니다"
    : "진행 중인 나하나 이벤트가 있습니다";
  partnerEventAlert.setAttribute("aria-label", currentScene === "partner"
    ? `${alertLabel} 이벤트 창을 엽니다`
    : `${alertLabel} 파트너뷰로 이동합니다`);
  partnerEventAlert.setAttribute("aria-expanded", String(Boolean(partnerEventPanel && !partnerEventPanel.hidden)));
  if (!visible && partnerEventPanel && !partnerEventPanel.hidden) closePartnerEventPanel();
}

async function handleNahanaEventDialogueCompleted(dialogueId) {
  if (!account) return false;
  const id = String(dialogueId || "").trim();
  if (!id) return false;
  let state = normalizeNahanaEventState(account.nahanaEvents);
  if (id === "DL_002" && !state.completedIds.includes("N_E_001")) {
    if (!state.activeId || state.activeId === "N_E_001") return triggerNahanaEventOccurrence("N_E_001");
  }
  if (!state.activeId) return false;
  await loadNahanaEventDefinitions();
  const definition = nahanaEventDefinitions.get(state.activeId);
  if (!definition) {
    nahanaEventOpeningId = "";
    updatePartnerEventUi();
    schedulePendingRoadArrivalContinuation();
    return false;
  }
  const linkedIndex = definition.linkedDialogues.findIndex(linkedId => linkedId === id);
  if (linkedIndex >= 0) {
    if (linkedIndex === 0) nahanaEventOpeningId = "";
    if (linkedIndex === 2) return completeNahanaEvent(state.activeId);
    state.stage = linkedIndex === 0 ? 2 : 3;
    state.attention = "progress";
    account.nahanaEvents = normalizeNahanaEventState(state);
    persistAccount();
    updatePartnerEventUi();
    await applyNahanaEventStageEffects(state.activeId, state.stage);
    schedulePendingRoadArrivalContinuation();
    return true;
  }

  const hardcodedIndex = definition.hardcodedDialogues.findIndex(linkedId => linkedId === id);
  if (state.activeId === "N_E_001" && hardcodedIndex === 0) {
    window.setTimeout(maybeStartFirstTavernTutorial, 0);
  } else if (state.activeId === "N_E_001" && hardcodedIndex === 1) {
    // DL_E_001_2의 마지막 구간은 식사 연출 뒤에 끝난다.
    // 이 시점에는 식사 튜토리얼을 다시 띄우지 않고 완료 처리까지 이어 간다.
  } else if (state.activeId === "N_E_001" && hardcodedIndex === 2 && state.stage === 3) {
    return completeNahanaEvent(state.activeId);
  } else if (state.activeId === "N_E_006" && hardcodedIndex === 1 && state.stage === 3) {
    state.context.tavernVisited = true;
    state.attention = "progress";
  } else if (state.activeId === "N_E_006" && hardcodedIndex === 2
    && state.stage === 3 && state.context.tavernVisited) {
    return completeNahanaEvent(state.activeId);
  } else {
    updatePartnerEventUi();
    return false;
  }
  account.nahanaEvents = normalizeNahanaEventState(state);
  persistAccount();
  updatePartnerEventUi();
  return true;
}

function loadNahanaProgressionDefinitions() {
  if (nahanaProgressionLoadPromise) return nahanaProgressionLoadPromise;
  nahanaProgressionLoadPromise = Promise.all([
    window.ProjectWData.loadCsv(NAHANA_BUFF_CSV_URL),
    window.ProjectWData.loadCsv(NAHANA_BLESS_CSV_URL)
  ]).then(([buffRows, blessRows]) => {
    nahanaBuffDefinitions.clear();
    buffRows.forEach(row => {
      const id = String(row.ID || "").trim();
      const name = String(row["이름"] || "").trim();
      if (!id || !name) return;
      nahanaBuffDefinitions.set(id, {
        id,
        name,
        grade: String(row["등급"] || "I").trim() || "I",
        gradeNumber: romanGradeNumber(row["등급"]),
        description: String(row["설명"] || "").trim(),
        effectDescription: String(row["효과설명"] || "").trim()
      });
    });
    nahanaBlessDefinitions.clear();
    blessRows.forEach(row => {
      const id = String(row.ID || "").trim();
      const name = String(row["이름"] || "").trim();
      if (!id || !name) return;
      nahanaBlessDefinitions.set(id, {
        id,
        name,
        grade: String(row["등급"] || "").trim(),
        cost: Math.max(1, Math.trunc(Number(row["강화포인트"]) || 1)),
        category: String(row["분류"] || "짐마차").trim() === "화물칸" ? "짐마차" : (String(row["분류"] || "짐마차").trim() || "짐마차"),
        prerequisite: String(row["선행요구"] || "").trim(),
        effectDescription: String(row["효과설명"] || "").trim()
      });
    });
    if (!nahanaBuffDefinitions.size || !nahanaBlessDefinitions.size) throw new Error("Nahana_Buff 또는 Nahana_Bless 시트가 비어 있습니다.");
    renderPartnerFeature();
    updatePartnerUi();
    return true;
  }).catch(error => {
    console.error(error);
    showGameNotice("나하나의 가호·축복 시트를 불러오지 못했습니다.");
    renderPartnerFeature();
    return false;
  });
  return nahanaProgressionLoadPromise;
}

function hasPartnerBlessing(blessingId) {
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  return partner.blessings.includes(String(blessingId || "").trim());
}

function highestPartnerBlessing(prefix, start, end) {
  for (let number = end; number >= start; number -= 1) {
    const id = `${prefix}${String(number).padStart(3, "0")}`;
    if (hasPartnerBlessing(id)) return number;
  }
  return 0;
}

function partnerOverloadRule() {
  const highest = highestPartnerBlessing("N_Bless_", 19, 23);
  if (highest === 23) return { thresholdPercent: 5, penaltyPerThreshold: 3 };
  if (highest >= 19) return { thresholdPercent: highest - 17, penaltyPerThreshold: 5 };
  return { thresholdPercent: 1, penaltyPerThreshold: 5 };
}

function activePartnerBuff(buffId) {
  const id = String(buffId || "").trim();
  if (!id) return null;
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  return partner.activeBuffs.find(buff => buff.id === id) || null;
}

function activePartnerBuffValue(buffIds, value, fallback = 0) {
  return (Array.isArray(buffIds) ? buffIds : [buffIds]).some(id => activePartnerBuff(id)) ? value : fallback;
}

function activePartnerBuffTierValue(entries, fallback = 0) {
  for (const [id, value] of entries) {
    if (activePartnerBuff(id)) return value;
  }
  return fallback;
}

function partnerCargoCapacityLimits() {
  const slotTargets = new Map([
    [29, 33], [30, 36], [31, 39], [32, 43], [33, 47],
    [34, 51], [35, 55], [36, 60], [37, 65], [38, 70]
  ]);
  const weightTargets = new Map([
    [39, 81], [40, 87], [41, 93], [42, 100], [43, 107],
    [44, 114], [45, 122], [46, 130], [47, 138], [48, 150]
  ]);
  const slotBlessing = highestPartnerBlessing("N_Bless_", 29, 38);
  const weightBlessing = highestPartnerBlessing("N_Bless_", 39, 48);
  const totalNormalSlots = slotTargets.get(slotBlessing) || 30;
  const protectedSlots = hasPartnerBlessing("N_Bless_049") ? 30 : 0;
  return {
    normal: Math.max(0, totalNormalSlots - protectedSlots),
    protected: protectedSlots,
    secret: hasPartnerBlessing("N_Bless_050") ? 3 : 0,
    totalCargoSlots: totalNormalSlots,
    maxWeight: weightTargets.get(weightBlessing) || 75
  };
}

function partnerHorseHealthConsumptionMultiplier() {
  return activePartnerBuff("N_Buff_004") ? 0.75 : 1;
}

function partnerHorseHungerConsumptionMultiplier() {
  return activePartnerBuff("N_Buff_005") ? 0.75 : 1;
}

function partnerCargoBreakageReductionChance() {
  return activePartnerBuffTierValue([
    ["N_Buff_008", 0.60], ["N_Buff_007", 0.40], ["N_Buff_006", 0.25]
  ]);
}

function partnerCargoFreshReductionChance() {
  return activePartnerBuffTierValue([
    ["N_Buff_011", 0.60], ["N_Buff_010", 0.40], ["N_Buff_009", 0.25]
  ]);
}

function partnerWagonDamageReductionChance() {
  return activePartnerBuffTierValue([
    ["N_Buff_014", 1], ["N_Buff_013", 0.75], ["N_Buff_012", 0.50]
  ]);
}

function partnerCampComfortBonus() {
  return activePartnerBuffTierValue([
    ["N_Buff_017", 10], ["N_Buff_016", 7], ["N_Buff_015", 4]
  ]);
}

function partnerMoodBuffChance() {
  return activePartnerBuffTierValue([
    ["N_Buff_020", 0.33], ["N_Buff_019", 0.25], ["N_Buff_018", 0.20]
  ]);
}

function partnerGuildContributionMultiplier() {
  return activePartnerBuff("N_Buff_029") ? 1.25 : 1;
}

function partnerCompanyScoreMultiplier() {
  return activePartnerBuffTierValue([
    ["N_Buff_032", 1.50], ["N_Buff_031", 1.40], ["N_Buff_030", 1.30]
  ], 1);
}

function partnerEntryTariffMultiplier() {
  return activePartnerBuffTierValue([
    ["N_Buff_035", 0], ["N_Buff_034", 0.33], ["N_Buff_033", 0.67]
  ], 1);
}

function partnerHasWeatherInsight() {
  return Boolean(activePartnerBuff("N_Buff_025"));
}

function partnerDialogueCardBuffGrade() {
  return activePartnerBuffTierValue([
    ["N_Buff_028", 3], ["N_Buff_027", 2], ["N_Buff_026", 1]
  ]);
}

function partnerDialogueCardChanceBonus() {
  for (const id of ["N_Buff_028", "N_Buff_027", "N_Buff_026"]) {
    const buff = activePartnerBuff(id);
    if (!buff) continue;
    const match = /대화\s*카드[^\d]*(\d+(?:\.\d+)?)%/.exec(buff.effectDescription);
    if (match) return Number(match[1]) / 100;
  }
  return 0;
}

window.ProjectWPartnerBuffs = {
  getDialogueCardGenerationGrade: () => partnerDialogueCardBuffGrade(),
  hasWeatherInsight: () => partnerHasWeatherInsight()
};

function activeCompanionTravelSpeedMultiplier() {
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  return partner.activeBuffs.reduce((product, buff) => {
    const match = /짐마차\s*(?:이동\s*)?속도\s*\+(\d+(?:\.\d+)?)%/.exec(buff.effectDescription);
    return product * (match ? 1 + (Number(match[1]) / 100) : 1);
  }, 1);
}

function addCompanionExperience(amount, reason = "") {
  if (!account) return { gained: 0, rankUps: 0 };
  const gained = Math.max(0, Math.trunc(Number(amount) || 0));
  if (!gained) return { gained: 0, rankUps: 0 };
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  account.partner.companionExperience += gained;
  let rankUps = 0;
  let upgradePointsGained = 0;
  while (account.partner.companionRank < MAX_COMPANION_RANK) {
    const required = companionExperienceRequirement(account.partner.companionRank);
    if (account.partner.companionExperience < required) break;
    account.partner.companionExperience -= required;
    account.partner.companionRank += 1;
    const earnedPoints = account.partner.companionRank >= 40 ? 3 : account.partner.companionRank >= 20 ? 2 : 1;
    account.partner.upgradePoints += earnedPoints;
    upgradePointsGained += earnedPoints;
    rankUps += 1;
  }
  persistAccount();
  updatePartnerUi();
  if (rankUps > 0) {
    const companionRank = account.partner.companionRank;
    window.setTimeout(() => showGameNotice(`동행등급 상승 · ${companionRank}등급\n강화포인트 +${upgradePointsGained}`, "level-up"), 0);
  }
  else if (reason) showGameNotice(`${reason} · 동행 경험치 +${gained}`);
  if (rankUps > 0) refreshNahanaEventAvailability();
  return { gained, rankUps, upgradePointsGained };
}

function recordCompanionArrival(placementId = "") {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const previousRewards = Math.floor(account.partner.arrivalCount / 10);
  account.partner.arrivalCount += 1;
  const nextRewards = Math.floor(account.partner.arrivalCount / 10);
  if (nextRewards > previousRewards) addCompanionExperience(nextRewards - previousRewards, "여정 10지점 도달");
  const normalizedId = String(placementId || "").trim();
  if (normalizedId) queueNahanaSituationEventsForArrival(normalizedId);
  if (normalizedId && isNodeId(normalizedId) && Math.random() < .33) {
    addCompanionExperience(1, "거점 도착");
  }
  if (normalizedId && isNodeId(normalizedId) && partnerHasStatus(account.partner, "기대감")) {
    removePartnerStatus("N_S_009");
    addCompanionExperience(1, "새 거점에 대한 기대감");
  }
}

function recordCompanionSettlementEntry(placementId = "") {
  if (!account) return false;
  const normalizedId = String(placementId || "").trim();
  if (!normalizedId) return false;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  if (account.partner.visitedNodeIds.includes(normalizedId)) return false;
  account.partner.visitedNodeIds.push(normalizedId);
  const category = String(window.ProjectWMapView.getPlacement(normalizedId)?.category || "마을").trim();
  const reward = ({ 마을: 1, 관문: 5, 도시: 3, 대도시: 5 })[category] || 1;
  addCompanionExperience(reward, `새로운 ${category} 최초 방문`);
  return true;
}

function driftPartnerTasteParameters(placementId = "") {
  if (!account || isNodeId(String(placementId || "").trim())) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const keys = ["sweet", "salty", "stimulus", "weight"];
  keys.forEach(key => {
    const trend = account.partner.tasteDrift[key];
    if (trend.macroRemaining <= 0) {
      trend.macroDirection = Math.random() < .5 ? -1 : 1;
      trend.macroRemaining = 8 + Math.floor(Math.random() * 11);
    }
    if (trend.microRemaining <= 0) {
      trend.microDirection = Math.random() < .5 ? -1 : 1;
      trend.microRemaining = 2 + Math.floor(Math.random() * 5);
    }
    const macro = Math.random() < .72 ? trend.macroDirection : 0;
    const micro = Math.random() < .42 ? trend.microDirection : 0;
    const delta = Math.max(-2, Math.min(2, macro + micro));
    account.partner[key] = clampNumber(account.partner[key] + delta, 0, 100, account.partner[key]);
    trend.macroRemaining -= 1;
    trend.microRemaining -= 1;
  });
}

function recoverDailyPartnerGreasiness() {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  // 다른 입맛과 마찬가지로 weight도 높을수록 해당 맛을 갈망한다.
  // 하루가 지나 느끼함이 해소되면 기름진 음식에 대한 갈망이 다시 오른다.
  account.partner.weight = Math.min(100, account.partner.weight + DAILY_GREASINESS_RECOVERY);
}

function awardMealCompanionExperience(lastMeal) {
  if (!lastMeal) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const newFoods = [...new Set((Array.isArray(lastMeal.foods) ? lastMeal.foods : [])
    .map(food => String(food?.id || "").trim()).filter(Boolean))]
    .filter(foodId => !account.partner.consumedFoodIds.includes(foodId));
  if (newFoods.length) {
    account.partner.consumedFoodIds.push(...newFoods);
    addCompanionExperience(newFoods.length, `새로운 음식·음료 ${newFoods.length}종`);
  }
  if (lastMeal.kind === "snack") {
    if (Math.random() < 0.33) addCompanionExperience(1, "간식 경험");
    return;
  }
  if (lastMeal.kind !== "meal" || lastMeal.vendor !== "주점") return;
  const humble = lastMeal.tier === "소박한 만찬" || lastMeal.tier === "푸짐한 식사";
  addCompanionExperience(humble ? 1 : 3, humble ? "주점의 푸짐한 식사" : "주점의 만찬");
}

function handleFoodConsumptionComplete(record) {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  account.partner.statusStreaks.idleDots = 0;
  if (record?.kind === "snack") {
    const snackKinds = new Set((Array.isArray(record.foods) ? record.foods : [])
      .map(food => String(food?.id || "").trim()).filter(Boolean)).size;
    if (record.vendor === "시장" && snackKinds >= 3) unlockFootprint("FOOTPRINT_014");
    removePartnerStatus("N_S_005");
    persistAccount();
    updatePartnerUi();
    return;
  }
  if (record?.kind !== "meal") return;

  const consumedSingleMealStatuses = ["N_S_019", "N_S_021", "N_S_022"]
    .filter(effectId => account.partner.effects.includes(effectId));
  consumedSingleMealStatuses.forEach(removePartnerStatus);

  const fullness = Math.max(0, Number(record.fullness) || 0);
  if (fullness >= 200) {
    queuePartnerMorningStatus("N_S_017");
    unlockFootprint("FOOTPRINT_028");
  }
  else if (fullness >= 100) queuePartnerMorningStatus("N_S_008");

  const tasteDelta = record.tasteDelta && typeof record.tasteDelta === "object" ? record.tasteDelta : {};
  if ((Number(tasteDelta.sweet) || 0) <= -40) queuePartnerMorningStatus("N_S_018");
  if ((Number(tasteDelta.salty) || 0) <= -40) addPartnerStatus("N_S_019", { remainingTimes: 10 });
  if ((Number(tasteDelta.stimulus) || 0) <= -40) addPartnerStatus("N_S_020", { remainingTimes: 10 });
  if ((Number(tasteDelta.weight) || 0) <= -40) addPartnerStatus("N_S_021", { remainingTimes: 10 });
  if ((Number(tasteDelta.weight) || 0) >= 40) addPartnerStatus("N_S_022", { remainingTimes: 10 });

  const alcoholCount = Math.max(0, Math.trunc(Number(record.alcoholCount) || 0));
  const hangover = alcoholCount > 0 && rollHangover(alcoholCount);
  const added = hangover ? addPartnerStatus("N_S_006") : false;
  if (!hangover && record.vendor === "주점" && alcoholCount >= 2
    && Math.random() < Math.min(1, alcoholCount * .20)) {
    queuePartnerMorningStatus("N_S_010");
  }
  persistAccount();
  updatePartnerUi();
  if (added) showGameNotice("술기운이 오래 남았습니다. 나하나가 숙취 상태가 되었습니다.");
}

function rollHangover(alcoholCount) {
  const count = Math.max(0, Math.trunc(Number(alcoholCount) || 0));
  return count > 0 && Math.random() < 1 - Math.pow(0.85, count);
}

function recoverSpiritAfterSleep() {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const day = normalizeWorldTime(account.worldTime).day;
  if (account.partner.lastSpiritRecoveryDay >= day) return;
  const recovery = companionSpiritDailyRecovery(account.partner.companionRank);
  const bonus = recovery.bonusChance > 0 && Math.random() < recovery.bonusChance ? 1 : 0;
  const maximum = companionSpiritMaximum(account.partner.companionRank);
  account.partner.spirit = Math.min(maximum, account.partner.spirit + recovery.guaranteed + bonus);
  account.partner.lastSpiritRecoveryDay = day;
  // R_E_002, R_E_003 늑대 습격은 사용 가능한 정령력을 자동 소비해 피해를 완화한다.
}

function companionSpiritDailyRecovery(rank) {
  const maximum = companionSpiritMaximum(rank);
  return {
    guaranteed: 1 + Math.floor(maximum / 4),
    bonusChance: (maximum % 4) * .25
  };
}

function openPartnerFeature(feature) {
  if (feature === "buff" && !isFeatureUnlocked("spiritBlessing")) {
    showGameNotice("아직 정령의 가호 기능이 해금되지 않았습니다.");
    return;
  }
  if (feature === "bless" && !isFeatureUnlocked("permanentBlessing")) {
    showGameNotice("아직 축복 부여 기능이 해금되지 않았습니다.");
    return;
  }
  if (!partnerFeaturePanel || partnerAccessState().allLocked) return;
  closePartnerSnackPanel();
  activePartnerFeature = feature === "bless" ? "bless" : "buff";
  partnerFeaturePanel.hidden = false;
  partnerBlessingToggle?.setAttribute("aria-expanded", String(activePartnerFeature === "bless"));
  updatePartnerCharacterUi();
  loadNahanaProgressionDefinitions();
  renderPartnerFeature();
}

function closePartnerFeature() {
  if (!partnerFeaturePanel) return;
  activePartnerFeature = "";
  partnerFeaturePanel.hidden = true;
  partnerBlessingToggle?.setAttribute("aria-expanded", "false");
  updatePartnerCharacterUi();
}

function renderPartnerFeature() {
  if (!activePartnerFeature || !partnerFeatureContent || !partnerFeaturePanel || partnerFeaturePanel.hidden) return;
  const partner = normalizePartnerState(account?.partner, account?.partnerMoodAdjustment);
  partnerFeatureContent.replaceChildren();
  partnerFeaturePanel.dataset.feature = activePartnerFeature;
  if (activePartnerFeature === "buff") renderSpiritBlessingFeature(partner);
  else renderBlessingInvestmentFeature(partner);
}

function renderSpiritBlessingFeature(partner) {
  partnerFeatureKicker.textContent = "여정에 머무는 일시적인 은총";
  partnerFeatureTitle.textContent = "정령의 가호";
  const maximumSpirit = companionSpiritMaximum(partner.companionRank);
  const availableNames = availableBuffNames(partner);
  const recovery = companionSpiritDailyRecovery(partner.companionRank);

  const overview = document.createElement("section");
  overview.className = "partner-feature-overview spirit-overview is-compact";
  const resource = document.createElement("div");
  resource.className = "partner-spirit-resource";
  const resourceCopy = document.createElement("div");
  const resourceLabel = document.createElement("span");
  resourceLabel.textContent = "보유 정령력";
  const resourceValue = document.createElement("strong");
  resourceValue.textContent = `${partner.spirit} / ${maximumSpirit}`;
  const recoveryLabel = document.createElement("small");
  recoveryLabel.textContent = `일일 회복 +${recovery.guaranteed}${recovery.bonusChance > 0 ? ` · 추가 +1 확률 ${Math.round(recovery.bonusChance * 100)}%` : ""}`;
  resourceCopy.append(resourceLabel, resourceValue, recoveryLabel);
  const pips = document.createElement("div");
  pips.className = "partner-spirit-pips";
  pips.setAttribute("aria-label", `정령력 ${partner.spirit} / ${maximumSpirit}`);
  for (let index = 0; index < maximumSpirit; index += 1) {
    const pip = document.createElement("span");
    pip.classList.toggle("is-filled", index < partner.spirit);
    pips.append(pip);
  }
  resource.append(resourceCopy, pips);
  overview.append(resource, createPartnerFeaturePrivacyNotice());

  const activeSection = document.createElement("section");
  activeSection.className = "partner-feature-section active-buff-section";
  activeSection.append(createPartnerFeatureSectionHeading("현재 적용 중인 가호", "남은 기간은 다음 날 아침을 기준으로 줄어듭니다."));
  const list = document.createElement("div");
  list.className = "partner-feature-list active-buff-list";
  if (!partner.activeBuffs.length) {
    const empty = document.createElement("p");
    empty.className = "partner-feature-empty";
    empty.textContent = "아직 여정에 머무는 가호가 없습니다.";
    list.append(empty);
  } else partner.activeBuffs.forEach(buff => {
    const card = document.createElement("article");
    card.className = "partner-feature-card is-active-buff";
    const seal = document.createElement("span");
    seal.className = `partner-feature-grade grade-${buff.gradeNumber}`;
    seal.textContent = buff.grade;
    const cardCopy = document.createElement("div");
    const cardHeader = document.createElement("header");
    const name = document.createElement("strong");
    name.textContent = buff.name;
    const duration = document.createElement("b");
    duration.textContent = `${Math.max(0, buff.expiresDay - normalizeWorldTime(account.worldTime).day)}일 남음`;
    cardHeader.append(name, duration);
    const description = document.createElement("p");
    description.textContent = buff.effectDescription || buff.description;
    cardCopy.append(cardHeader, description);
    card.append(seal, cardCopy);
    list.append(card);
  });
  activeSection.append(list);

  const chance = companionBuffGradeChances(partner.companionRank);
  const chanceSection = document.createElement("section");
  chanceSection.className = "partner-feature-section spirit-chance-section";
  chanceSection.append(createPartnerFeatureSectionHeading("가호 등급 확률", "동행등급에 비례해 고등급 가호의 확률 증가"));
  const chanceGrid = document.createElement("div");
  chanceGrid.className = "partner-spirit-chances";
  [1, 2, 3].forEach(gradeNumber => {
    const item = document.createElement("div");
    item.className = `grade-${gradeNumber}`;
    const grade = document.createElement("span");
    grade.textContent = ["I등급", "II등급", "III등급"][gradeNumber - 1];
    const probability = document.createElement("strong");
    probability.textContent = `${chance[gradeNumber]}%`;
    const days = document.createElement("small");
    days.textContent = `${gradeNumber + 2}일 지속`;
    item.append(grade, probability, days);
    chanceGrid.append(item);
  });
  chanceSection.append(chanceGrid);

  const action = document.createElement("footer");
  action.className = "partner-feature-action";
  const actionCopy = document.createElement("div");
  const actionTitle = document.createElement("strong");
  const actionDescription = document.createElement("span");
  actionTitle.textContent = "무작위 가호를 청합니다.";
  actionDescription.textContent = partner.spirit < 1
    ? "정령력이 부족합니다."
    : availableNames.length
      ? "정령력 1을 사용해 현재 등급 확률에 따라 가호를 얻습니다."
      : "획득 가능한 가호가 없습니다.";
  actionCopy.append(actionTitle, actionDescription);
  const obtain = document.createElement("button");
  obtain.type = "button";
  obtain.className = "partner-feature-confirm";
  obtain.dataset.partnerFeatureAction = "obtain-buff";
  obtain.disabled = partner.spirit < 1 || !availableNames.length;
  obtain.textContent = "가호 획득";
  action.append(actionCopy, obtain);
  partnerFeatureContent.append(overview, activeSection, chanceSection, action);
}

function renderBlessingInvestmentFeature(partner) {
  partnerFeatureKicker.textContent = "함께한 여정으로 새기는 영구 강화";
  partnerFeatureTitle.textContent = "축복 부여";
  const overview = document.createElement("section");
  overview.className = "partner-feature-overview blessing-overview";
  const rankSeal = document.createElement("div");
  rankSeal.className = "partner-blessing-rank";
  rankSeal.innerHTML = `<span>동행등급</span><strong>${partner.companionRank}</strong>`;
  const pointSeal = document.createElement("div");
  pointSeal.className = `partner-blessing-points ${partner.upgradePoints > 0 ? "has-points" : ""}`;
  pointSeal.innerHTML = `<span>강화포인트</span><strong>${partner.upgradePoints}</strong>`;
  overview.append(rankSeal, pointSeal, createPartnerFeaturePrivacyNotice());

  const tabs = document.createElement("nav");
  tabs.className = "partner-feature-tabs";
  ["수레바퀴", "짐마차"].forEach(category => {
    const categoryDefinitions = [...nahanaBlessDefinitions.values()].filter(definition => definition.category === category);
    const acquiredCount = categoryDefinitions.filter(definition => partner.blessings.includes(definition.id)).length;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.partnerFeatureAction = "bless-category";
    button.dataset.category = category;
    button.classList.toggle("is-active", activeBlessCategory === category);
    const label = document.createElement("strong");
    label.textContent = category;
    const progress = document.createElement("span");
    progress.textContent = `${acquiredCount} / ${categoryDefinitions.length}`;
    button.append(label, progress);
    tabs.append(button);
  });

  const blessingSection = document.createElement("section");
  blessingSection.className = "partner-feature-section blessing-section";
  blessingSection.append(createPartnerFeatureSectionHeading(`${activeBlessCategory} 축복`, "같은 이름의 축복은 한 묶음으로 표시됩니다."));
  const list = document.createElement("div");
  list.className = "partner-feature-list is-blessing-list";
  const definitions = [...nahanaBlessDefinitions.values()].filter(definition => definition.category === activeBlessCategory);
  if (!definitions.length) {
    const empty = document.createElement("p");
    empty.className = "partner-feature-empty";
    empty.textContent = nahanaProgressionLoadPromise ? "시트에서 강화 목록을 불러오는 중입니다." : "강화 목록을 불러올 수 없습니다.";
    list.append(empty);
  }
  const groups = new Map();
  definitions.forEach(definition => {
    if (!groups.has(definition.name)) groups.set(definition.name, []);
    groups.get(definition.name).push(definition);
  });
  groups.forEach(groupDefinitions => {
    const group = document.createElement("section");
    group.className = "blessing-family";
    const familyTitle = document.createElement("h4");
    familyTitle.className = "blessing-family-title";
    familyTitle.textContent = groupDefinitions[0]?.name || "축복";
    group.append(familyTitle);
    const orderedDefinitions = [...groupDefinitions]
      .sort((a, b) => romanGradeNumber(a.grade) - romanGradeNumber(b.grade));
    const gradeNumbers = new Set(orderedDefinitions.map(definition => romanGradeNumber(definition.grade)));
    const highestGrade = Math.max(0, ...gradeNumbers);
    const displaysGrade = (highestGrade === 5 || highestGrade === 10)
      && Array.from({ length: highestGrade }, (_, index) => index + 1).every(grade => gradeNumbers.has(grade));
    orderedDefinitions
      .forEach(definition => {
        const acquired = partner.blessings.includes(definition.id);
        const prerequisiteId = definition.prerequisite && definition.prerequisite.toLowerCase() !== "none"
          ? definition.prerequisite
          : "";
        const prerequisiteMet = !prerequisiteId || partner.blessings.includes(prerequisiteId);
        const affordable = prerequisiteMet && partner.upgradePoints >= definition.cost;
        const gradeNumber = romanGradeNumber(definition.grade);
        const card = document.createElement("article");
        card.className = `partner-feature-card blessing-card blessing-grade-${gradeNumber} ${acquired ? "is-acquired" : affordable ? "is-available" : "is-locked"}`;
        const cardCopy = document.createElement("div");
        cardCopy.className = "blessing-card-copy";
        const header = document.createElement("header");
        const name = document.createElement("strong");
        name.textContent = `${definition.name}${displaysGrade && definition.grade ? ` ${definition.grade}` : ""}`;
        header.append(name);
        const description = document.createElement("p");
        description.textContent = definition.effectDescription || "이 단계에서 추가되는 수치 효과는 없습니다.";
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.partnerFeatureAction = "acquire-blessing";
        button.dataset.blessingId = definition.id;
        button.disabled = acquired || !affordable;
        button.textContent = acquired ? "획득됨" : `축복 부여 · ${definition.cost}포인트`;
        cardCopy.append(header, description);
        card.append(cardCopy, button);
        group.append(card);
      });
    list.append(group);
  });
  blessingSection.append(list);
  partnerFeatureContent.append(overview, tabs, blessingSection);
}

function createPartnerFeaturePrivacyNotice() {
  const notice = document.createElement("p");
  notice.className = "partner-feature-privacy-notice";
  notice.textContent = "정령의 힘은 두 사람만 있을 때 사용할 수 있습니다. 길 위나 여관에서 정령의 가호와 축복을 확인하세요.";
  return notice;
}

function appendPartnerFeatureLedgerRow(target, label, value) {
  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = label;
  description.textContent = value;
  wrapper.append(term, description);
  target.append(wrapper);
}

function createPartnerFeatureSectionHeading(title, description) {
  const header = document.createElement("header");
  header.className = "partner-feature-section-heading";
  const heading = document.createElement("strong");
  const copy = document.createElement("span");
  heading.textContent = title;
  copy.textContent = description;
  header.append(heading, copy);
  return header;
}

function companionBuffGradeChances(rank) {
  const grade3 = Math.min(25, 5 + (Math.floor((Math.max(1, rank) - 1) / 2)));
  return { 1: 75 - grade3, 2: 25, 3: grade3 };
}

function availableBuffNames(partner) {
  const activeNames = new Set((partner?.activeBuffs || []).map(buff => buff.name));
  return [...new Set([...nahanaBuffDefinitions.values()].map(definition => definition.name))]
    .filter(name => !activeNames.has(name));
}

function handlePartnerFeatureAction(event) {
  const button = event.target.closest("[data-partner-feature-action]");
  if (!button || button.disabled) return;
  if (button.dataset.partnerFeatureAction === "obtain-buff") void acquireRandomSpiritBlessing();
  if (button.dataset.partnerFeatureAction === "bless-category") {
    activeBlessCategory = button.dataset.category === "짐마차" ? "짐마차" : "수레바퀴";
    renderPartnerFeature();
    const tutorial = normalizeTutorialProgress(account?.tutorialProgress);
    if (isTutorialActive(10) && tutorial.step === 1 && activeBlessCategory === "수레바퀴") setTutorialStep(2);
    else if (isTutorialActive(10) && tutorial.step === 3 && activeBlessCategory === "짐마차") setTutorialStep(4);
  }
  if (button.dataset.partnerFeatureAction === "acquire-blessing") acquirePartnerBlessing(button.dataset.blessingId);
}

async function acquireRandomSpiritBlessing() {
  if (!account || spiritBlessingInProgress) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const partner = account.partner;
  const names = availableBuffNames(partner);
  if (!names.length || partner.spirit < 1) return;
  const name = names[Math.floor(Math.random() * names.length)];
  const chance = companionBuffGradeChances(partner.companionRank);
  const roll = Math.random() * 100;
  const gradeNumber = roll < chance[3] ? 3 : roll < chance[3] + chance[2] ? 2 : 1;
  const definition = [...nahanaBuffDefinitions.values()].find(entry => entry.name === name && entry.gradeNumber === gradeNumber)
    || [...nahanaBuffDefinitions.values()].find(entry => entry.name === name);
  if (!definition) return;
  const acquiredDay = normalizeWorldTime(account.worldTime).day;
  partner.spirit -= 1;
  partner.activeBuffs.push({
    ...definition,
    acquiredDay,
    expiresDay: acquiredDay + gradeNumber + 2
  });
  persistAccount();
  spiritBlessingInProgress = true;
  partnerFeaturePanel?.classList.add("is-spirit-revealing");
  gameScreen.classList.add("is-spirit-blessing-reveal");
  await wait(2000);
  partnerFeaturePanel?.classList.remove("is-spirit-revealing");
  gameScreen.classList.remove("is-spirit-blessing-reveal");
  if (account.travel?.moving) reconcileTravelProgress(false);
  if (definition.gradeNumber === 3) {
    addCompanionExperience(1, "3등급 가호 획득");
    unlockFootprint("FOOTPRINT_013");
  }
  persistAccount();
  if (account.travel?.moving) {
    account.travel.progressRate = calculateTravelRate(currentScene, account.travel);
    account.travel.progressUpdatedAt = Date.now();
    scheduleTravelStep();
  }
  renderPartnerFeature();
  updatePartnerUi();
  spiritBlessingInProgress = false;
  showGameNotice(`${definition.name} ${definition.grade}등급 가호를 얻었습니다. · ${gradeNumber + 2}일 지속`);
  if (isTutorialActive(TUTORIAL_IDS.SPIRIT_BLESSING)) {
    completeTutorial(TUTORIAL_IDS.SPIRIT_BLESSING);
  }
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (eventState.activeId === "N_E_003" && eventState.stage === 3) {
    closePartnerFeature();
    void resolveNahanaEventCondition(3);
  }
}

function consumeRouteEventSpiritProtection() {
  if (!account) return false;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  if (account.partner.spirit < 1) return false;
  account.partner.spirit -= 1;
  persistAccount();
  updatePartnerUi();
  return true;
}

async function playRouteEventSpiritProtectionFlash() {
  gameScreen?.classList.add("is-spirit-blessing-reveal");
  await wait(2000);
  gameScreen?.classList.remove("is-spirit-blessing-reveal");
}

function acquirePartnerBlessing(blessingId) {
  if (!account) return;
  const blessingScrollTop = partnerFeatureContent?.querySelector(".is-blessing-list")?.scrollTop || 0;
  const definition = nahanaBlessDefinitions.get(String(blessingId || ""));
  if (!definition) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const partner = account.partner;
  const prerequisiteId = definition.prerequisite && definition.prerequisite.toLowerCase() !== "none"
    ? definition.prerequisite
    : "";
  if (partner.blessings.includes(definition.id)
    || partner.upgradePoints < definition.cost
    || (prerequisiteId && !partner.blessings.includes(prerequisiteId))) return;
  partner.upgradePoints -= definition.cost;
  partner.blessings.push(definition.id);
  if (/^N_Bless_01[4-8]$/.test(definition.id)) {
    account.wagon = normalizeWagonState(account.wagon);
    account.wagon.maxCondition += 20;
    account.wagon.condition += 20;
  }
  persistAccount();
  window.ProjectWCargo.reconcileCapacityLimits?.();
  if (account.travel?.moving) {
    reconcileTravelProgress(false);
    account.travel.progressRate = calculateTravelRate(currentScene, account.travel);
    account.travel.progressUpdatedAt = Date.now();
    scheduleTravelStep();
  }
  renderPartnerFeature();
  updatePartnerUi();
  const refreshedBlessingList = partnerFeatureContent?.querySelector(".is-blessing-list");
  if (refreshedBlessingList) refreshedBlessingList.scrollTop = blessingScrollTop;
  showGameNotice(`${definition.name}${definition.grade ? ` ${definition.grade}` : ""} 축복을 획득했습니다.`);
}

function createPartnerStatusBadge(effect, extraClass = "") {
  const key = String(effect || "").trim();
  const definition = nahanaStatusDefinitions.get(key) || null;
  const badge = document.createElement("span");
  badge.className = [
    "partner-status-badge",
    definition?.category === "버프" ? "is-buff" : "",
    extraClass
  ].filter(Boolean).join(" ");
  badge.tabIndex = 0;
  badge.textContent = definition?.name || key || "상태";
  badge.setAttribute("aria-describedby", "partner-status-tooltip");
  badge.addEventListener("pointerenter", () => showPartnerStatusTooltip(definition, key, badge));
  badge.addEventListener("pointerleave", hidePartnerStatusTooltip);
  badge.addEventListener("focus", () => showPartnerStatusTooltip(definition, key, badge));
  badge.addEventListener("blur", hidePartnerStatusTooltip);
  return badge;
}

function renderPartnerStatusEffects(effects = []) {
  if (!partnerStatusEffects) return;
  hidePartnerStatusTooltip();
  partnerStatusEffects.replaceChildren();
  if (!effects.length) {
    const empty = document.createElement("span");
    empty.className = "partner-status-empty";
    empty.textContent = "없음";
    partnerStatusEffects.append(empty);
    return;
  }
  const fragment = document.createDocumentFragment();
  effects.forEach(effect => {
    const key = String(effect || "").trim();
    if (!key) return;
    fragment.append(createPartnerStatusBadge(key));
  });
  if (!fragment.childNodes.length) {
    const empty = document.createElement("span");
    empty.className = "partner-status-empty";
    empty.textContent = "없음";
    fragment.append(empty);
  }
  partnerStatusEffects.append(fragment);
}

function showPartnerStatusTooltip(definition, fallbackName, anchor) {
  if (!partnerStatusTooltip || !anchor) return;
  const title = document.createElement("strong");
  title.textContent = definition?.name || fallbackName || "상태이상";
  const category = document.createElement("span");
  category.textContent = definition?.category || "상태";
  const header = document.createElement("header");
  header.append(title, category);
  const body = document.createElement("div");
  [["상태 설명", definition?.description1], ["적용 효과", definition?.description2]]
    .filter(([, description]) => Boolean(description))
    .forEach(([label, description]) => {
      const section = document.createElement("section");
      section.className = "partner-status-description";
      const heading = document.createElement("strong");
      heading.textContent = label;
      const paragraph = document.createElement("p");
      paragraph.textContent = description;
      section.append(heading, paragraph);
      body.append(section);
    });
  if (definition?.duration) {
    const paragraph = document.createElement("p");
    paragraph.className = "partner-status-duration";
    paragraph.textContent = `지속시간 : ${definition.duration}`;
    body.append(paragraph);
  }
  if (!body.childNodes.length) {
    const paragraph = document.createElement("p");
    paragraph.textContent = "Nahana_S에서 상세 정보를 불러오지 못했습니다.";
    body.append(paragraph);
  }
  partnerStatusTooltip.replaceChildren(header, body);
  partnerStatusTooltip.hidden = false;
  const anchorRect = anchor.getBoundingClientRect();
  const tooltipRect = partnerStatusTooltip.getBoundingClientRect();
  const margin = 12;
  let left = anchorRect.right + 10;
  let top = anchorRect.top;
  if (left + tooltipRect.width > window.innerWidth - margin) left = anchorRect.left - tooltipRect.width - 10;
  if (top + tooltipRect.height > window.innerHeight - margin) top = window.innerHeight - tooltipRect.height - margin;
  partnerStatusTooltip.style.left = `${Math.max(margin, left)}px`;
  partnerStatusTooltip.style.top = `${Math.max(margin, top)}px`;
}

function hidePartnerStatusTooltip() {
  if (partnerStatusTooltip) partnerStatusTooltip.hidden = true;
}

function togglePartnerBlessingOptions() {
  openPartnerFeature("bless");
  if (isTutorialActive(10) && normalizeTutorialProgress(account.tutorialProgress).step === 0) setTutorialStep(1);
}

function canChooseName() {
  return account?.userName === "당신" && !account.nameLocked;
}

async function prepareTitleScreen() {
  if (titleRevealStarted) return;
  titleRevealStarted = true;

  try {
    await Promise.race([
      loadAssets(),
      new Promise(resolve => window.setTimeout(resolve, 10_000))
    ]);
    const titleImages = [...titleScreen.querySelectorAll("img[data-asset-id^='Asset_Main_']")];
    const loadingImages = [...(gameLoadingScreen?.querySelectorAll("img[data-asset-id^='Asset_Load_']") ?? [])];
    await Promise.all([...titleImages, ...loadingImages].map(image => waitForTitleImage(image)));
  } catch (error) {
    console.error(error);
  } finally {
    window.requestAnimationFrame(() => window.requestAnimationFrame(revealTitleScreen));
  }
}

function waitForTitleImage(image, timeout = 8_000) {
  if (!image?.src || image.complete) return Promise.resolve();
  return new Promise(resolve => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };
    const timeoutId = window.setTimeout(finish, Math.max(0, Number(timeout) || 0));
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });
}

function revealTitleScreen() {
  titleScreen.classList.remove("is-loading");
  titleScreen.classList.add("is-ready");
  titleScreen.setAttribute("aria-busy", "false");
  titleLayout?.removeAttribute("inert");
  syncAudioState();
}

function loadAssets() {
  if (assetLoadPromise) return assetLoadPromise;

  if (window.location.protocol === "file:") {
    assetLoadPromise = Promise.resolve();
    return assetLoadPromise;
  }

  assetLoadPromise = window.ProjectWData.loadCsv(ASSETS_CSV_URL)
    .then(rows => {
      rows.forEach(row => {
        const assetId = String(row.Asset_ID || "").trim();
        const assetLink = String(row.Asset_Link || "").trim();
        const assetName = String(row.Asset_Name || "").trim();
        if (assetId && assetLink) assetMap.set(assetId, assetLink);
        if (assetId && assetName) registerDialogueAssetName(assetId, assetName);
      });

      document.querySelectorAll("img[data-asset-id]").forEach(image => {
        const assetUrl = assetMap.get(image.dataset.assetId);
        if (assetUrl) image.src = assetUrl;
      });
      window.ProjectWMapView.refreshAssets();
      window.ProjectWInformation.refresh();
      window.ProjectWWallet.refresh();
      window.ProjectWTrade.refresh();
      window.ProjectWMeal.refresh();
      window.ProjectWInn.refresh();
      window.ProjectWMerchantPath.refresh();
      window.ProjectWAudio.refreshAssets();
      updateCustomCursorAsset();
      syncTravelExperience();
    })
    .catch(error => {
      console.error(error);
      const message = "Assets 목록을 갱신하지 못해 현재 등록된 링크를 사용합니다.";
      if (!titleScreen.hidden) {
        titleNotice.textContent = message;
        titleNotice.hidden = false;
      } else {
        showGameNotice(message);
      }
    });

  return assetLoadPromise;
}

function normalizeDialogueAssetName(value) {
  return String(value || "").normalize("NFKC").trim().toLocaleLowerCase("ko-KR");
}

function dialogueAssetFamilyFromId(assetId) {
  if (/^Asset_SD_/i.test(assetId)) return "SD";
  if (/^Asset_SIT_/i.test(assetId)) return "상황";
  if (/^Asset_N_/i.test(assetId)) return "컷신";
  return "";
}

function registerDialogueAssetName(assetId, assetName) {
  const family = dialogueAssetFamilyFromId(assetId);
  if (!family) return;
  const fullName = normalizeDialogueAssetName(assetName);
  const shortName = normalizeDialogueAssetName(String(assetName).split("_").at(-1));
  if (fullName) dialogueAssetNameMap.set(`${family}:${fullName}`, assetId);
  if (shortName) dialogueAssetNameMap.set(`${family}:${shortName}`, assetId);
}

function resolveDialogueAssetId(page) {
  if (page?.assetId) return page.assetId;
  const assetName = normalizeDialogueAssetName(page?.assetName);
  if (!assetName) return "";
  const family = page?.imageCategory === "SD" || String(page?.imageCategory || "").toLowerCase() === "sd"
    ? "SD"
    : page?.imageCategory === "상황"
      ? "상황"
      : "컷신";
  return dialogueAssetNameMap.get(`${family}:${assetName}`) || "";
}

function createInitialWorldTime() {
  return { day: 1, phaseIndex: 0 };
}

function createWorldSeed() {
  const timestamp = Date.now().toString(36);
  let randomPart = "";
  try {
    const values = new Uint32Array(2);
    crypto.getRandomValues(values);
    randomPart = [...values].map(value => value.toString(36)).join("");
  } catch (error) {
    randomPart = `${Math.random().toString(36).slice(2)}${performance.now().toString(36)}`;
  }
  const letters = Array.from({ length: 8 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join("");
  return `${timestamp}-${randomPart}-${letters}`;
}

function normalizeWorldSeed(value) {
  return String(value || "").trim() || createWorldSeed();
}

function createInitialHorseState() {
  return { health: 100, maxHealth: 100, hunger: 90, maxHunger: 100 };
}

function createInitialPartnerState() {
  return {
    mood: 75,
    sweet: 50,
    salty: 50,
    stimulus: 50,
    weight: 50,
    effects: [],
    statusTimers: {},
    pendingMorningStatuses: [],
    statusStreaks: createInitialPartnerStatusStreaks(),
    commonSenseSuccessStreak: 0,
    companionRank: 1,
    companionExperience: 0,
    upgradePoints: 0,
    spirit: 0,
    lastSpiritRecoveryDay: 0,
    arrivalCount: 0,
    visitedNodeIds: [],
    consumedFoodIds: [],
    tasteDrift: createInitialTasteDrift(),
    activeBuffs: [],
    blessings: []
  };
}

function createInitialPartnerStatusStreaks() {
  return { rain: 0, extremeCold: 0, summerHumidity: 0, roughTravel: 0, idleDots: 0 };
}

function normalizePartnerStatusStreaks(value) {
  const initial = createInitialPartnerStatusStreaks();
  return Object.fromEntries(Object.keys(initial).map(key => [
    key,
    Math.max(0, Math.trunc(Number(value?.[key]) || 0))
  ]));
}

function createInitialTasteDrift() {
  return Object.fromEntries(["sweet", "salty", "stimulus", "weight"].map((key, index) => [key, {
    macroDirection: index % 2 === 0 ? 1 : -1,
    macroRemaining: 8 + (index * 2),
    microDirection: index % 2 === 0 ? -1 : 1,
    microRemaining: 3 + (index % 3)
  }]));
}

function normalizeTasteDrift(value) {
  const initial = createInitialTasteDrift();
  return Object.fromEntries(Object.keys(initial).map(key => {
    const stored = value?.[key];
    const macroRemaining = Number(stored?.macroRemaining);
    const microRemaining = Number(stored?.microRemaining);
    return [key, {
      macroDirection: Number(stored?.macroDirection) < 0 ? -1 : 1,
      macroRemaining: Number.isFinite(macroRemaining) ? Math.max(0, Math.trunc(macroRemaining)) : initial[key].macroRemaining,
      microDirection: Number(stored?.microDirection) < 0 ? -1 : 1,
      microRemaining: Number.isFinite(microRemaining) ? Math.max(0, Math.trunc(microRemaining)) : initial[key].microRemaining
    }];
  }));
}

function createInitialFoodUsage() {
  return { day: 1, mealUsed: false, snackUsed: false, sootheBlocked: false, tavernSoldOutBySettlement: {} };
}

function createInitialCommonSenseUsage() {
  return { day: 1, attempts: 0, locked: false };
}

function createInitialDialogueMemorial() {
  return { unlockedIds: [] };
}

function createInitialTalkCardState() {
  return {
    hand: [],
    readCount: 0,
    campSessionKey: "",
    campCardIds: [],
    campRollResolved: false
  };
}

function createInitialFootprints() {
  return { unlockedIds: [], observedSeasons: ["봄"] };
}

function createInitialTutorialProgress() {
  return {
    reachedHirenbach: false,
    completed: [],
    activeId: 0,
    step: 0,
    dialogueCompleted: [],
    firstCampSeen: false,
    firstHirenbachArrivalSeen: false,
    tavernTutorialMealCompleted: false,
    tavernEventDialogueStage: 0,
    waitingForTavernExit: false,
    waitingForInnExit: false,
    earlyTutorialBranchReached: false,
    talkCardTutorialPending: false,
    sootheTutorialPending: false
  };
}

function createNewJourneyTutorialProgress() {
  const progress = createInitialTutorialProgress();
  if (skipTutorialsForNewJourney) {
    progress.completed = Array.from({ length: TUTORIAL_MAX_ID }, (_, index) => index + 1);
  }
  return progress;
}

function createInitialNahanaEventState() {
  return {
    activeId: "",
    stage: 1,
    attention: "",
    completedIds: [],
    rewardGrantedIds: [],
    pendingRewardId: "",
    pendingTutorialId: 0,
    hirenbachTriggered: false,
    context: { settlementId: "", tavernVisited: false, giftPurchased: false }
  };
}

function createInitialNahanaSituationEventState() {
  return { completedIds: [], pendingIds: [] };
}

function createInitialPartnerWeatherStreak() {
  return { type: "", count: 0 };
}

function createInitialInformationUsage() {
  return { cycle: 0, facilities: {} };
}

function createInitialAdvancedTutorialState(readAll = false) {
  return { readIds: readAll ? [...ADVANCED_TUTORIAL_IDS] : [] };
}

function normalizeAdvancedTutorialState(value) {
  const validIds = new Set(ADVANCED_TUTORIAL_IDS);
  return {
    readIds: [...new Set((Array.isArray(value?.readIds) ? value.readIds : [])
      .map(id => String(id || "").trim())
      .filter(id => validIds.has(id)))]
  };
}

function createInitialFeatureUnlocks(unlocked = false) {
  return {
    spiritBlessing: Boolean(unlocked),
    permanentBlessing: Boolean(unlocked),
    information: Boolean(unlocked),
    guildContribution: Boolean(unlocked),
    partnerSnack: Boolean(unlocked),
    guildAccess: Boolean(unlocked)
  };
}

function normalizeFeatureUnlocks(value, legacyUnlocked = false) {
  if (!value || typeof value !== "object") return createInitialFeatureUnlocks(legacyUnlocked);
  const normalized = createInitialFeatureUnlocks(false);
  Object.keys(normalized).forEach(key => { normalized[key] = Boolean(value[key]); });
  return normalized;
}

function isFeatureUnlocked(key) {
  return Boolean(normalizeFeatureUnlocks(account?.featureUnlocks, false)[key]);
}

function unlockFeature(key) {
  if (!account) return false;
  account.featureUnlocks = normalizeFeatureUnlocks(account.featureUnlocks, false);
  if (!(key in account.featureUnlocks) || account.featureUnlocks[key]) return false;
  account.featureUnlocks[key] = true;
  persistAccount();
  updatePartnerUi();
  updateInformationButton(mealInfoCollect, "주점");
  if (activeServiceContext) updateInformationButton(serviceInfoCollect, activeServiceContext.type, activeServiceContext.placement);
  updateGuildContributionAvailabilityUi();
  if (key === "guildAccess") syncTravelExperience();
  refreshAdvancedTutorialLaunchers();
  return true;
}

window.ProjectWFeatureUnlocks = { isUnlocked: isFeatureUnlocked, unlock: unlockFeature };

function createInitialBargainingState(day = 1) {
  return { day: Math.max(1, Math.trunc(Number(day) || 1)), attemptsUsedByFacility: {}, successesByFacility: {} };
}

function normalizeBargainingState(value, worldTime = account?.worldTime) {
  const day = normalizeWorldTime(worldTime).day;
  if (!value || typeof value !== "object" || Math.max(1, Math.trunc(Number(value.day) || 1)) !== day) {
    return createInitialBargainingState(day);
  }
  return {
    day,
    attemptsUsedByFacility: Object.fromEntries(Object.entries(value.attemptsUsedByFacility || {})
      .map(([key, count]) => [String(key), Math.max(0, Math.trunc(Number(count) || 0))])),
    successesByFacility: Object.fromEntries(Object.entries(value.successesByFacility || {})
      .map(([key, count]) => [String(key), Math.max(0, Math.trunc(Number(count) || 0))]))
  };
}

function bargainFacilityModifier(type) {
  return ({ 상회: -10, 좌판: -5, 교역소: -5, 시장: 10, 입장관세: 0 })[String(type || "")] ?? 0;
}

function getBargainProfile(context = {}) {
  if (!account) return { available: false, attemptsRemaining: 0, attemptsMaximum: 0, chance: 0, bonusPercent: 0, valuePerSuccess: 3, valueMaximum: 6, knowledgeItemBonus: 0 };
  account.bargaining = normalizeBargainingState(account.bargaining, account.worldTime);
  const bonuses = window.ProjectWMerchantPath?.getBargainingBonuses?.() || { attempts: 0, chance: 0, valueCap: 6 };
  const facilityKey = String(context.facilityKey || "").trim();
  const successes = Math.max(0, account.bargaining.successesByFacility[facilityKey] || 0);
  const attemptsMaximum = Math.max(1, 1 + (Number(bonuses.attempts) || 0));
  const attemptsUsed = Math.max(0, account.bargaining.attemptsUsedByFacility[facilityKey] || 0);
  const attemptsRemaining = Math.max(0, attemptsMaximum - attemptsUsed);
  const valuePerSuccess = 3;
  const valueMaximum = Math.max(6, Number(bonuses.valueCap) || 6);
  const knowledgeItemBonus = Math.max(0, Number(context.knowledgeItemBonus) || 0);
  const chance = Math.max(0, Math.min(100,
    50 + bargainFacilityModifier(context.facilityType) + (Number(bonuses.chance) || 0) + knowledgeItemBonus - (successes * 8)
  ));
  return {
    available: Boolean(facilityKey) && attemptsRemaining > 0,
    attemptsMaximum,
    attemptsRemaining,
    chance,
    successes,
    knowledgeItemBonus,
    valuePerSuccess,
    valueMaximum,
    bonusPercent: Math.min(valueMaximum, successes * valuePerSuccess)
  };
}

function attemptBargain(context = {}) {
  const profile = getBargainProfile(context);
  if (!profile.available) return { unavailable: true, ...profile };
  const facilityKey = String(context.facilityKey || "");
  account.bargaining.attemptsUsedByFacility[facilityKey] = Math.max(0, account.bargaining.attemptsUsedByFacility[facilityKey] || 0) + 1;
  const success = Math.random() * 100 < profile.chance;
  if (success) account.bargaining.successesByFacility[facilityKey] = profile.successes + 1;
  persistAccount();
  return { success, ...getBargainProfile(context) };
}

function completeBargainTrade(context = {}) {
  if (!account) return;
  account.bargaining = normalizeBargainingState(account.bargaining, account.worldTime);
  delete account.bargaining.successesByFacility[String(context.facilityKey || "")];
  persistAccount();
}

function createInitialGuildContribution() {
  return { xp: 0, lastContributionDayBySettlement: {} };
}

function createInitialWagonState() {
  return { condition: 200, maxCondition: 200, effects: [] };
}

function createInitialJourneyEnvironment() {
  return { roadByDotId: {} };
}

function createInitialSettlementDialogueVisit() {
  return { settlementId: "", token: "" };
}

function normalizeSettlementDialogueVisit(value) {
  return {
    settlementId: String(value?.settlementId || "").trim(),
    token: String(value?.token || "").trim()
  };
}

function normalizeWorldTime(value) {
  return {
    day: Math.max(1, Math.trunc(Number(value?.day) || 1)),
    phaseIndex: Math.min(Math.max(0, Math.trunc(Number(value?.phaseIndex) || 0)), TIME_PHASES.length - 1)
  };
}

function normalizeHorseState(value) {
  const maxHealth = Math.max(1, Number(value?.maxHealth) || 100);
  const maxHunger = Math.max(1, Number(value?.maxHunger) || 100);
  return {
    health: clampNumber(Number(value?.health), 0, maxHealth, maxHealth),
    maxHealth,
    hunger: clampNumber(Number(value?.hunger), 0, maxHunger, maxHunger),
    maxHunger
  };
}

function normalizePartnerState(value, legacyMoodAdjustment = 0) {
  const initial = createInitialPartnerState();
  const companionRank = Math.min(MAX_COMPANION_RANK, Math.max(1, Math.trunc(Number(value?.companionRank) || 1)));
  const maxSpirit = companionSpiritMaximum(companionRank);
  return {
    mood: clampNumber(Number(value?.mood), 0, 100, clampNumber(initial.mood + (Number(legacyMoodAdjustment) || 0), 0, 100, initial.mood)),
    sweet: clampNumber(Number(value?.sweet), 0, 100, initial.sweet),
    salty: clampNumber(Number(value?.salty), 0, 100, initial.salty),
    stimulus: clampNumber(Number(value?.stimulus), 0, 100, initial.stimulus),
    weight: clampNumber(Number(value?.weight), 0, 100, initial.weight),
    effects: Array.isArray(value?.effects) ? value.effects.map(effect => String(effect).trim()).filter(Boolean) : [],
    statusTimers: normalizePartnerStatusTimers(value?.statusTimers),
    pendingMorningStatuses: [...new Set((Array.isArray(value?.pendingMorningStatuses) ? value.pendingMorningStatuses : [])
      .map(id => String(id || "").trim()).filter(Boolean))],
    statusStreaks: normalizePartnerStatusStreaks(value?.statusStreaks),
    commonSenseSuccessStreak: Math.max(0, Math.trunc(Number(value?.commonSenseSuccessStreak) || 0)),
    companionRank,
    companionExperience: Math.max(0, Math.trunc(Number(value?.companionExperience) || 0)),
    upgradePoints: Math.max(0, Math.trunc(Number(value?.upgradePoints) || 0)),
    spirit: Math.min(maxSpirit, Math.max(0, Math.trunc(Number(value?.spirit) || 0))),
    lastSpiritRecoveryDay: Math.max(0, Math.trunc(Number(value?.lastSpiritRecoveryDay) || 0)),
    arrivalCount: Math.max(0, Math.trunc(Number(value?.arrivalCount) || 0)),
    visitedNodeIds: [...new Set((Array.isArray(value?.visitedNodeIds) ? value.visitedNodeIds : [])
      .map(id => String(id || "").trim()).filter(Boolean))],
    consumedFoodIds: [...new Set((Array.isArray(value?.consumedFoodIds) ? value.consumedFoodIds : [])
      .map(id => String(id || "").trim()).filter(Boolean))],
    tasteDrift: normalizeTasteDrift(value?.tasteDrift),
    activeBuffs: (Array.isArray(value?.activeBuffs) ? value.activeBuffs : [])
      .map(normalizeActiveBuff)
      .filter(buff => buff.name),
    blessings: [...new Set((Array.isArray(value?.blessings) ? value.blessings : [])
      .map(id => String(id || "").trim()).filter(Boolean))]
  };
}

function normalizeActiveBuff(value) {
  return {
    id: String(value?.id || "").trim(),
    name: String(value?.name || "").trim(),
    grade: String(value?.grade || "I").trim() || "I",
    gradeNumber: Math.min(3, Math.max(1, Math.trunc(Number(value?.gradeNumber) || romanGradeNumber(value?.grade)))),
    description: String(value?.description || "").trim(),
    effectDescription: String(value?.effectDescription || "").trim(),
    acquiredDay: Math.max(1, Math.trunc(Number(value?.acquiredDay) || 1)),
    expiresDay: Math.max(1, Math.trunc(Number(value?.expiresDay) || 1))
  };
}

function companionSpiritMaximum(rank) {
  return Math.min(6, 1 + Math.floor(Math.max(1, Number(rank) || 1) / 10));
}

function companionExperienceRequirement(rank) {
  const value = Math.max(1, Math.trunc(Number(rank) || 1));
  if (value >= MAX_COMPANION_RANK) return 0;
  const earlyRequirements = [0, 25, 12, 18, 27, 40];
  if (value < earlyRequirements.length) return earlyRequirements[value];
  const linearRequirement = 60 + ((value - 6) * (102 / 43));
  return Math.round(linearRequirement / 5) * 5;
}

function romanGradeNumber(grade) {
  const normalized = String(grade || "").trim().toUpperCase();
  return ({ I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 })[normalized]
    || Math.max(1, Math.trunc(Number(normalized) || 1));
}

function normalizeFoodUsage(value, worldTime = account?.worldTime) {
  const day = normalizeWorldTime(worldTime).day;
  if (Math.max(1, Math.trunc(Number(value?.day) || 1)) !== day) {
    return { day, mealUsed: false, snackUsed: false, sootheBlocked: false, tavernSoldOutBySettlement: {} };
  }
  return {
    day,
    mealUsed: Boolean(value?.mealUsed),
    snackUsed: Boolean(value?.snackUsed),
    sootheBlocked: Boolean(value?.sootheBlocked),
    tavernSoldOutBySettlement: Object.fromEntries(Object.entries(value?.tavernSoldOutBySettlement || {})
      .map(([key, ids]) => [String(key), [...new Set((Array.isArray(ids) ? ids : []).map(id => String(id || "").trim()).filter(Boolean))]]))
  };
}

function normalizeCommonSenseUsage(value, worldTime = account?.worldTime) {
  const day = normalizeWorldTime(worldTime).day;
  if (Math.max(1, Math.trunc(Number(value?.day) || 1)) !== day) {
    return { day, attempts: 0, locked: false };
  }
  return {
    day,
    attempts: Math.max(0, Math.trunc(Number(value?.attempts) || 0)),
    locked: Boolean(value?.locked)
  };
}

function normalizeDialogueMemorial(value) {
  return {
    unlockedIds: [...new Set((Array.isArray(value?.unlockedIds) ? value.unlockedIds : [])
      .map(dialogueId => String(dialogueId || "").trim())
      .filter(Boolean))]
  };
}

function normalizeTalkCardState(value) {
  const hand = [...new Set((Array.isArray(value?.hand) ? value.hand : [])
    .map(cardId => String(cardId || "").trim())
    .filter(Boolean))].slice(0, TALK_CARD_HAND_SIZE);
  return {
    hand,
    readCount: Math.max(0, Math.trunc(Number(value?.readCount) || 0)),
    campSessionKey: String(value?.campSessionKey || "").trim(),
    campCardIds: [...new Set((Array.isArray(value?.campCardIds) ? value.campCardIds : [])
      .map(cardId => String(cardId || "").trim())
      .filter(cardId => hand.includes(cardId)))],
    campRollResolved: Boolean(value?.campRollResolved)
  };
}

function normalizeFootprints(value) {
  const seasons = new Set((Array.isArray(value?.observedSeasons) ? value.observedSeasons : ["봄"])
    .map(season => String(season || "").trim())
    .filter(season => ["봄", "여름", "가을", "겨울"].includes(season)));
  seasons.add("봄");
  return {
    unlockedIds: [...new Set((Array.isArray(value?.unlockedIds) ? value.unlockedIds : [])
      .map(footprintId => String(footprintId || "").trim())
      .filter(Boolean))],
    observedSeasons: [...seasons]
  };
}

function normalizeTutorialProgress(value) {
  const initial = createInitialTutorialProgress();
  const completed = [...new Set((Array.isArray(value?.completed) ? value.completed : [])
    .map(id => Math.trunc(Number(id)))
    .filter(id => id >= 1 && id <= TUTORIAL_MAX_ID))];
  return {
    ...initial,
    reachedHirenbach: Boolean(value?.reachedHirenbach),
    completed,
    activeId: Math.min(TUTORIAL_MAX_ID, Math.max(0, Math.trunc(Number(value?.activeId) || 0))),
    step: Math.max(0, Math.trunc(Number(value?.step) || 0)),
    dialogueCompleted: [...new Set((Array.isArray(value?.dialogueCompleted) ? value.dialogueCompleted : [])
      .map(id => String(id || "").trim()).filter(Boolean))],
    firstCampSeen: Boolean(value?.firstCampSeen),
    firstHirenbachArrivalSeen: Boolean(value?.firstHirenbachArrivalSeen),
    tavernTutorialMealCompleted: Boolean(value?.tavernTutorialMealCompleted),
    tavernEventDialogueStage: Math.min(3, Math.max(0, Math.trunc(Number(value?.tavernEventDialogueStage) || 0))),
    waitingForTavernExit: Boolean(value?.waitingForTavernExit),
    waitingForInnExit: Boolean(value?.waitingForInnExit),
    earlyTutorialBranchReached: Boolean(value?.earlyTutorialBranchReached),
    talkCardTutorialPending: Boolean(value?.talkCardTutorialPending),
    sootheTutorialPending: Boolean(value?.sootheTutorialPending)
  };
}

function normalizePartnerStatusTimers(value) {
  const timers = {};
  Object.entries(value && typeof value === "object" ? value : {}).forEach(([effectId, timer]) => {
    const id = String(effectId || "").trim();
    if (!id || !timer || typeof timer !== "object") return;
    timers[id] = {
      remainingTimes: Math.max(0, Math.trunc(Number(timer.remainingTimes) || 0)),
      expiresAfterDay: Math.max(0, Math.trunc(Number(timer.expiresAfterDay) || 0)),
      appliedDay: Math.max(1, Math.trunc(Number(timer.appliedDay) || 1))
    };
  });
  return timers;
}

function normalizeNahanaEventState(value) {
  const eventIds = companionEventIds();
  const completedIds = [...new Set((Array.isArray(value?.completedIds) ? value.completedIds : [])
    .map(id => String(id || "").trim())
    .filter(id => eventIds.includes(id)))]
    .sort((left, right) => eventIds.indexOf(left) - eventIds.indexOf(right));
  const requestedActiveId = String(value?.activeId || "").trim();
  const activeId = eventIds.includes(requestedActiveId) && !completedIds.includes(requestedActiveId)
    ? requestedActiveId
    : "";
  const attention = value?.attention === "new" || value?.attention === "progress"
    ? value.attention
    : "";
  const rewardGrantedIds = [...new Set((Array.isArray(value?.rewardGrantedIds) ? value.rewardGrantedIds : [])
    .map(id => String(id || "").trim())
    .filter(id => eventIds.includes(id)))];
  const requestedPendingRewardId = String(value?.pendingRewardId || "").trim();
  const pendingRewardId = completedIds.includes(requestedPendingRewardId) ? requestedPendingRewardId : "";
  const context = {
    settlementId: String(value?.context?.settlementId || "").trim(),
    tavernVisited: Boolean(value?.context?.tavernVisited),
    giftPurchased: Boolean(value?.context?.giftPurchased)
  };
  return {
    activeId,
    stage: activeId ? Math.min(3, Math.max(1, Math.trunc(Number(value?.stage) || 1))) : 1,
    attention: activeId ? attention : "",
    completedIds,
    rewardGrantedIds,
    pendingRewardId,
    pendingTutorialId: Math.min(99, Math.max(0, Math.trunc(Number(value?.pendingTutorialId) || 0))),
    hirenbachTriggered: Boolean(value?.hirenbachTriggered),
    context
  };
}

function normalizeNahanaSituationEventState(value) {
  const completedIds = [...new Set((Array.isArray(value?.completedIds) ? value.completedIds : [])
    .map(id => String(id || "").trim())
    .filter(id => NAHANA_SITUATION_EVENT_IDS.includes(id)))];
  const completed = new Set(completedIds);
  const pendingIds = [...new Set((Array.isArray(value?.pendingIds) ? value.pendingIds : [])
    .map(id => String(id || "").trim())
    .filter(id => NAHANA_SITUATION_EVENT_IDS.includes(id) && !completed.has(id)))];
  return { completedIds, pendingIds };
}

function normalizePartnerWeatherStreak(value) {
  const type = value?.type === "rain" || value?.type === "snow" ? value.type : "";
  return { type, count: type ? Math.max(1, Math.trunc(Number(value?.count) || 1)) : 0 };
}

function unlockFootprint(footprintId) {
  const id = String(footprintId || "").trim();
  const definition = window.ProjectWMemorial?.getFootprint?.(id);
  if (!account || !definition) return false;
  account.footprints = normalizeFootprints(account.footprints);
  if (account.footprints.unlockedIds.includes(id)) return false;
  account.footprints.unlockedIds.push(id);
  persistAccount();
  window.ProjectWMemorial?.refresh?.();
  queueFootprintNotice(definition.title);
  addCompanionExperience(5);
  return true;
}

function evaluatePartnerParameterFootprints() {
  if (!account || evaluatingPartnerFootprints) return;
  evaluatingPartnerFootprints = true;
  try {
    const partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
    if (partner.mood <= 25) unlockFootprint("FOOTPRINT_001");
    if (partner.sweet <= 0) unlockFootprint("FOOTPRINT_002");
    if (partner.sweet >= 100) unlockFootprint("FOOTPRINT_003");
    if (partner.salty <= 0) unlockFootprint("FOOTPRINT_004");
    if (partner.salty >= 100) unlockFootprint("FOOTPRINT_005");
    if (partner.stimulus <= 0) unlockFootprint("FOOTPRINT_006");
    if (partner.stimulus >= 100) unlockFootprint("FOOTPRINT_007");
    if (partner.weight <= 0) unlockFootprint("FOOTPRINT_008");
    if (partner.weight >= 100) unlockFootprint("FOOTPRINT_009");
  } finally {
    evaluatingPartnerFootprints = false;
  }
}

function evaluateSeasonFootprints() {
  if (!account) return;
  account.footprints = normalizeFootprints(account.footprints);
  const season = currentSeason();
  const observed = new Set(account.footprints.observedSeasons);
  const returnedToSpring = season === "봄" && [...observed].some(value => value !== "봄");
  if (season === "여름") unlockFootprint("FOOTPRINT_016");
  if (season === "가을") unlockFootprint("FOOTPRINT_017");
  if (season === "겨울") unlockFootprint("FOOTPRINT_018");
  if (returnedToSpring) unlockFootprint("FOOTPRINT_019");
  if (!observed.has(season)) {
    account.footprints.observedSeasons.push(season);
    persistAccount();
  }
}

function evaluateJourneyFootprints(conditions, becameHalfBroken = false) {
  if (!account) return;
  if (becameHalfBroken) unlockFootprint("FOOTPRINT_023");
  if (normalizeHorseState(account.horse).hunger <= 0) unlockFootprint("FOOTPRINT_024");
  if (conditions?.region === "북부") unlockFootprint("FOOTPRINT_025");
  if (conditions?.region === "남부") unlockFootprint("FOOTPRINT_026");
  if (["눈", "폭설"].includes(conditions?.weather)) unlockFootprint("FOOTPRINT_027");
}

async function evaluateCommonSenseFootprint() {
  if (!account || normalizeFootprints(account.footprints).unlockedIds.includes("FOOTPRINT_015")) return;
  try {
    const dialogueIds = await window.ProjectWDialogue.getDialogueIds("DL_S_");
    const unlocked = new Set(normalizeDialogueMemorial(account.dialogueMemorial).unlockedIds);
    if (dialogueIds.length && dialogueIds.every(dialogueId => unlocked.has(dialogueId))) {
      unlockFootprint("FOOTPRINT_015");
    }
  } catch (error) {
    console.error(error);
  }
}

window.ProjectWFootprints = { unlock: unlockFootprint };

function unlockDialogue(dialogueId, save = true, dialogue = null) {
  const id = String(dialogueId || "").trim();
  if (!account || !id) return false;
  account.dialogueMemorial = normalizeDialogueMemorial(account.dialogueMemorial);
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  if (account.dialogueMemorial.unlockedIds.includes(id)) return false;
  account.dialogueMemorial.unlockedIds.push(id);
  const cutsceneDialogue = dialogue?.pages?.some(page => page.imageCategory === "컷신")
    || dialogue?.dialogueCategory === "메인대화"
    || dialogue?.dialogueCategory === "대화카드"
    || dialogue?.pages?.some(page => page.dialogueCategory === "대화카드");
  if (cutsceneDialogue) addCompanionExperience(8, "새 컷신·대화카드 수집");
  if (id.startsWith("DL_S_")) void evaluateCommonSenseFootprint();
  if (save) persistAccount();
  window.ProjectWMemorial?.refresh?.();
  return true;
}

function normalizeInformationUsage(value, worldTime = account?.worldTime) {
  const day = normalizeWorldTime(worldTime).day;
  const cycle = Math.floor((day - 1) / 3);
  const storedCycle = Number.isFinite(Number(value?.cycle))
    ? Math.max(0, Math.trunc(Number(value.cycle)))
    : Math.floor((Math.max(1, Math.trunc(Number(value?.day) || 1)) - 1) / 3);
  if (storedCycle !== cycle) {
    return { cycle, facilities: {} };
  }
  const facilities = {};
  Object.entries(value?.facilities || {}).forEach(([key, count]) => {
    facilities[String(key)] = Math.max(0, Math.trunc(Number(count) || 0));
  });
  return { cycle, facilities };
}

function normalizeGuildContribution(value) {
  const lastContributionDayBySettlement = {};
  Object.entries(value?.lastContributionDayBySettlement || {}).forEach(([settlementId, day]) => {
    const normalizedSettlementId = String(settlementId || "").trim();
    const normalizedDay = Math.max(0, Math.trunc(Number(day) || 0));
    if (normalizedSettlementId && normalizedDay > 0) lastContributionDayBySettlement[normalizedSettlementId] = normalizedDay;
  });
  return {
    xp: Math.max(0, Math.floor(Number(value?.xp) || 0)),
    lastContributionDayBySettlement
  };
}

function guildContributionProfile(value = account?.guildContribution) {
  const normalized = normalizeGuildContribution(value);
  let level = 1;
  let levelXp = normalized.xp;
  while (level < 5 && levelXp >= GUILD_CONTRIBUTION_LEVEL_COSTS[level - 1]) {
    levelXp -= GUILD_CONTRIBUTION_LEVEL_COSTS[level - 1];
    level += 1;
  }
  const nextLevelCost = GUILD_CONTRIBUTION_LEVEL_COSTS[level - 1] ?? null;
  const progress = nextLevelCost == null
    ? 1
    : Math.min(1, Math.max(0, levelXp / Math.max(1, nextLevelCost)));
  return {
    xp: normalized.xp,
    levelXp,
    level,
    nextThreshold: nextLevelCost,
    progress,
    maxInformationAttempts: level
  };
}

function normalizeInnErrandState(value) {
  const result = {};
  Object.entries(value || {}).forEach(([key, record]) => {
    if (!record || typeof record !== "object") return;
    const stock = {};
    Object.entries(record.stock || {}).forEach(([itemId, quantity]) => {
      stock[String(itemId)] = Math.max(0, Math.trunc(Number(quantity) || 0));
    });
    result[String(key)] = {
      day: Math.max(1, Math.trunc(Number(record.day) || 1)),
      stock
    };
  });
  return result;
}

function changePartnerMood(amount) {
  if (!account) return 0;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const before = account.partner.mood;
  account.partner.mood = clampNumber(before + (Number(amount) || 0), 0, 100, before);
  account.partnerMoodAdjustment = account.partner.mood - 50;
  syncMoodDrivenPartnerStatuses();
  updatePartnerUi();
  return account.partner.mood - before;
}

function canAcquirePartnerStatus(effectId = "") {
  const progress = normalizeTutorialProgress(account?.tutorialProgress);
  if (!progress.reachedHirenbach) return false;
  if (progress.completed.includes(7)) return true;
  return String(effectId || "").trim() === "N_S_006";
}

function enforcePartnerStatusTutorialGate() {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  if (canAcquirePartnerStatus("N_S_002")) return;
  const allowedEffects = account.partner.effects.filter(effectId => canAcquirePartnerStatus(effectId));
  const allowedIds = new Set(allowedEffects);
  account.partner.effects = allowedEffects;
  account.partner.statusTimers = Object.fromEntries(Object.entries(account.partner.statusTimers)
    .filter(([effectId]) => allowedIds.has(effectId)));
  account.partner.pendingMorningStatuses = account.partner.pendingMorningStatuses
    .filter(effectId => canAcquirePartnerStatus(effectId));
}

function syncMoodDrivenPartnerStatuses() {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  enforcePartnerStatusTutorialGate();
  const shouldBeAngry = account.partner.mood <= 25;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (shouldBeAngry
    && !progress.completed.includes(TUTORIAL_IDS.PARTNER_SOOTHE)
    && progress.activeId !== TUTORIAL_IDS.PARTNER_SOOTHE
    && !progress.sootheTutorialPending) {
    progress.sootheTutorialPending = true;
    account.tutorialProgress = progress;
    schedulePendingNarrativePresentation();
  }
  if (!shouldBeAngry && progress.sootheTutorialPending) {
    progress.sootheTutorialPending = false;
    account.tutorialProgress = progress;
  }
  if (!canAcquirePartnerStatus("N_S_002")) return;
  const hasAngry = account.partner.effects.includes("N_S_002");
  if (shouldBeAngry && !hasAngry) {
    account.partner.effects.push("N_S_002");
    void showPartnerStatusAcquiredDialogue("N_S_002");
  }
  if (!shouldBeAngry && hasAngry) {
    account.partner.effects = account.partner.effects.filter(effect => effect !== "N_S_002");
    delete account.partner.statusTimers.N_S_002;
  }
}

function addPartnerStatus(effectId, options = {}) {
  if (!account) return false;
  const normalizedId = String(effectId || "").trim();
  if (!normalizedId || !canAcquirePartnerStatus(normalizedId)) return false;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const alreadyApplied = account.partner.effects.includes(normalizedId);
  if (!alreadyApplied) account.partner.effects.push(normalizedId);
  const timer = partnerStatusTimer(normalizedId, options);
  if (timer) account.partner.statusTimers[normalizedId] = timer;
  updatePartnerUi();
  if (!alreadyApplied) void showPartnerStatusAcquiredDialogue(normalizedId);
  return !alreadyApplied;
}

function partnerStatusTimer(effectId, options = {}) {
  const day = normalizeWorldTime(account?.worldTime).day;
  if (Number(options.remainingTimes) > 0) {
    return { remainingTimes: Math.trunc(Number(options.remainingTimes)), expiresAfterDay: 0, appliedDay: day };
  }
  if (Number.isFinite(Number(options.expiresAfterDay))) {
    return { remainingTimes: 0, expiresAfterDay: Math.max(day, Math.trunc(Number(options.expiresAfterDay))), appliedDay: day };
  }
  if (effectId === "N_S_001" || effectId === "N_S_005") return { remainingTimes: 1, expiresAfterDay: 0, appliedDay: day };
  if (["N_S_004", "N_S_018", "N_S_019", "N_S_020", "N_S_021", "N_S_022", "N_S_024"].includes(effectId)) {
    return { remainingTimes: 10, expiresAfterDay: 0, appliedDay: day };
  }
  if (effectId === "N_S_006") return { remainingTimes: 0, expiresAfterDay: day, appliedDay: day };
  if (["N_S_007", "N_S_008", "N_S_010", "N_S_011", "N_S_012", "N_S_013", "N_S_014", "N_S_015", "N_S_016", "N_S_017", "N_S_023"].includes(effectId)) {
    return { remainingTimes: 0, expiresAfterDay: day, appliedDay: day };
  }
  return null;
}

function queuePartnerMorningStatus(effectId) {
  if (!account) return false;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const id = String(effectId || "").trim();
  if (!id || !canAcquirePartnerStatus(id) || account.partner.pendingMorningStatuses.includes(id)) return false;
  account.partner.pendingMorningStatuses.push(id);
  return true;
}

function applyPendingPartnerMorningStatuses() {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const pending = [...account.partner.pendingMorningStatuses];
  account.partner.pendingMorningStatuses = [];
  const day = normalizeWorldTime(account.worldTime).day;
  pending.forEach(effectId => addPartnerStatus(effectId, { expiresAfterDay: day }));
}

function removePartnerStatus(effectId) {
  if (!account) return false;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const before = account.partner.effects.length;
  account.partner.effects = account.partner.effects.filter(effect => effect !== effectId);
  delete account.partner.statusTimers[effectId];
  return account.partner.effects.length !== before;
}

function ensurePartnerStatusTimers() {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  account.partner.effects.forEach(effectId => {
    if (account.partner.statusTimers[effectId]) return;
    const timer = partnerStatusTimer(effectId);
    if (timer) account.partner.statusTimers[effectId] = timer;
  });
}

function processPartnerStatusesAfterTimeAdvance() {
  if (!account) return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const partner = account.partner;
  const day = normalizeWorldTime(account.worldTime).day;
  const removals = new Set();
  const adjustMood = amount => {
    partner.mood = clampNumber(partner.mood + (Number(amount) || 0), 0, 100, partner.mood);
  };
  partner.effects.forEach(effectId => {
    const timer = partner.statusTimers[effectId];
    if (timer?.expiresAfterDay > 0 && day > timer.expiresAfterDay) {
      removals.add(effectId);
      return;
    }
    if (effectId === "N_S_003") {
      if (partner.mood >= 49) removals.add(effectId);
      else adjustMood(Math.min(2, 49 - partner.mood));
    }
    if (effectId === "N_S_004" && partner.mood > 10) adjustMood(-1);
    if (effectId === "N_S_005" && !normalizeFoodUsage(account.foodUsage, account.worldTime).snackUsed) {
      adjustMood(-Math.floor(Math.random() * 4));
    }
    if (effectId === "N_S_006") adjustMood(-1);
    if (effectId === "N_S_015") adjustMood(-3);
    if (effectId === "N_S_016") adjustMood(-2);
    if (effectId === "N_S_023" && partner.mood > 20) adjustMood(-Math.min(3, partner.mood - 20));
    if (effectId === "N_S_024" && partner.mood > 30) adjustMood(-Math.min(3, partner.mood - 30));
    if (effectId === "N_S_002" && partner.mood > 25) removals.add(effectId);
    if (!timer) return;
    if (timer.remainingTimes > 0) {
      timer.remainingTimes -= 1;
      if (timer.remainingTimes <= 0) removals.add(effectId);
    }
  });
  if (removals.size) {
    partner.effects = partner.effects.filter(effectId => !removals.has(effectId));
    removals.forEach(effectId => delete partner.statusTimers[effectId]);
  }
  account.partner = partner;
  account.partnerMoodAdjustment = partner.mood - 50;
  if (partner.mood >= 5 && partner.mood <= 25 && Math.random() < .05) addPartnerStatus("N_S_003");
  if (partner.mood >= 30 && partner.mood <= 50 && Math.random() < .03) addPartnerStatus("N_S_004");
  syncMoodDrivenPartnerStatuses();
}

function rollRoadArrivalPartnerStatuses(placementId) {
  if (!account || isNodeId(placementId) || account.travel?.mode !== "road") return;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const weather = weatherAtPlacement(placementId).label;
  if ((weather === "맑음" || weather === "흐림") && !partnerHasStatus(account.partner, "개운함")) {
    const currentDay = normalizeWorldTime(account.worldTime).day;
    const recentUncomfortableCamp = Boolean(account.lastCamp?.uncomfortable)
      && Math.max(1, Math.trunc(Number(account.lastCamp?.contractDay) || 1)) >= currentDay - 1;
    const chance = Math.min(1,
      (recentUncomfortableCamp ? .15 : .01)
      + (partnerHasStatus(account.partner, "피로") ? .25 : 0)
      + (partnerHasStatus(account.partner, "과식") ? .10 : 0)
      + (partnerHasStatus(account.partner, "고혈당") ? .10 : 0));
    if (Math.random() < chance) addPartnerStatus("N_S_001", { remainingTimes: 1 });
  }
  account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
  if (!account.foodUsage.snackUsed && !partnerHasStatus(account.partner, "든든함") && Math.random() < .10) {
    const added = addPartnerStatus("N_S_005", { remainingTimes: 1 });
    if (added) {
      const dialogueId = Math.random() < .5 ? "DL_R_001" : "DL_R_002";
      void showRoadDialogue(dialogueId, ROAD_HUNGER_DIALOG_DURATION_MS);
    }
  }
  account.partner.statusStreaks.idleDots += 1;
  const idleDots = account.partner.statusStreaks.idleDots;
  if (!partnerHasStatus(account.partner, "따분함") && idleDots >= 6) {
    const chance = Math.min(1, .20 + ((idleDots - 6) * .10));
    if (Math.random() < chance) {
      addPartnerStatus("N_S_023", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
      account.partner.statusStreaks.idleDots = 0;
    }
  }
}

function normalizeWagonState(value) {
  const storedMaximum = Math.max(1, Number(value?.maxCondition) || 200);
  const legacyMaximum = storedMaximum <= 100;
  const maxCondition = legacyMaximum ? 200 : Math.max(200, storedMaximum);
  const storedCondition = Number(value?.condition);
  const condition = legacyMaximum && Number.isFinite(storedCondition)
    ? (storedCondition / storedMaximum) * maxCondition
    : storedCondition;
  return {
    condition: clampNumber(condition, 0, maxCondition, maxCondition),
    maxCondition,
    effects: [...new Set(Array.isArray(value?.effects) ? value.effects.map(effect => String(effect).trim()).filter(Boolean) : [])]
  };
}

function normalizeRoadSurfaceEntry(value) {
  const roadStage = Math.min(2, Math.max(0, Math.trunc(Number(value?.roadStage) || 0)));
  const precipitationType = value?.precipitationType === "snow" || value?.precipitationType === "wet"
    ? value.precipitationType
    : "";
  return { roadStage, precipitationType };
}

function normalizeJourneyEnvironment(value, legacyPlacementId = "") {
  const source = value && typeof value === "object" ? value : {};
  const roadByDotId = Object.fromEntries(Object.entries(source.roadByDotId || {})
    .filter(([dotId]) => /^MAP_DOT_\d+$/.test(dotId))
    .map(([dotId, entry]) => [dotId, normalizeRoadSurfaceEntry(entry)]));
  if (!Object.keys(roadByDotId).length && /^MAP_DOT_\d+$/.test(String(legacyPlacementId || ""))) {
    const legacy = normalizeRoadSurfaceEntry(source);
    if (legacy.roadStage > 0) roadByDotId[String(legacyPlacementId)] = legacy;
  }
  return { roadByDotId };
}

function clampNumber(value, minimum, maximum, fallback = minimum) {
  const number = Number.isFinite(value) ? value : fallback;
  return Math.min(Math.max(number, minimum), maximum);
}

function createInitialTravelState() {
  return {
    mode: "road",
    positionId: START_POSITION_ID,
    destinationNodeId: START_DESTINATION_ID,
    routePath: [...START_ROUTE],
    routeIndex: 0,
    moving: false,
    turningBack: false,
    turnBackEndsAt: 0,
    segmentRemainingMs: TRAVEL_STEP_MS,
    progressUpdatedAt: null,
    progressRate: 1,
    settlementId: "",
    settlementName: "",
    settlementAssetId: "",
    departureNodeId: "",
    pendingRoadArrivalContinuation: false,
    pendingRoadArrivalPhase: "",
    talkCardAreaRouteKey: "",
    talkCardAreaRolls: []
  };
}

function normalizeTravelState(value) {
  const initial = createInitialTravelState();
  if (!value || typeof value !== "object") return initial;

  let routePath = Array.isArray(value.routePath)
    ? value.routePath.map(item => String(item ?? "").trim()).filter(Boolean)
    : [...initial.routePath];
  let positionId = String(value.positionId ?? routePath[0] ?? initial.positionId).trim() || initial.positionId;
  if (!routePath.length) routePath = [positionId];

  let routeIndex = Math.min(Math.max(0, Math.trunc(Number(value.routeIndex) || 0)), routePath.length - 1);
  if (routePath[routeIndex] !== positionId) {
    const matchingIndex = routePath.indexOf(positionId);
    if (matchingIndex >= 0) routeIndex = matchingIndex;
    else {
      routePath = [positionId];
      routeIndex = 0;
    }
  }

  const mode = value.mode === "settlement" || value.mode === "camp" ? value.mode : "road";
  const canMove = mode === "road" && routeIndex < routePath.length - 1;
  const savedTurnBackEndsAt = Math.max(0, Number(value.turnBackEndsAt) || 0);
  const turningBack = mode === "road" && Boolean(value.turningBack) && savedTurnBackEndsAt > 0;
  const moving = Boolean(value.moving) && canMove && !turningBack;
  const pendingRoadArrivalContinuation = moving && Boolean(value.pendingRoadArrivalContinuation);
  const pendingRoadArrivalPhase = pendingRoadArrivalContinuation
    ? (["before-route-event", "after-route-event"].includes(value.pendingRoadArrivalPhase)
      ? value.pendingRoadArrivalPhase
      : "before-route-event")
    : "";
  const savedRate = clampNumber(Number(value.progressRate), 0.1, MAX_TRAVEL_RATE, 1);
  const savedRemaining = value.segmentRemainingMs == null ? Number.NaN : Number(value.segmentRemainingMs);
  const legacyNextStepAt = value.nextStepAt == null ? Number.NaN : Number(value.nextStepAt);
  const segmentRemainingMs = Number.isFinite(savedRemaining)
    ? Math.min(Math.max(0, savedRemaining), MAX_TRAVEL_SEGMENT_MS)
    : Number.isFinite(legacyNextStepAt) && canMove
      ? Math.min(Math.max(0, legacyNextStepAt - Date.now()), MAX_TRAVEL_SEGMENT_MS)
      : TRAVEL_STEP_MS;
  const savedUpdatedAt = value.progressUpdatedAt == null ? Number.NaN : Number(value.progressUpdatedAt);
  const talkCardAreaRolls = (Array.isArray(value.talkCardAreaRolls) ? value.talkCardAreaRolls : [])
    .map(entry => ({
      anchorIndex: Math.max(0, Math.trunc(Number(entry?.anchorIndex) || 0)),
      placementId: String(entry?.placementId || "").trim(),
      triggerPosition: Math.max(0, Number(entry?.triggerPosition) || 0),
      resolved: Boolean(entry?.resolved)
    }))
    .filter(entry => entry.placementId && entry.anchorIndex < routePath.length && entry.triggerPosition <= routePath.length - 1)
    .sort((left, right) => left.triggerPosition - right.triggerPosition || left.anchorIndex - right.anchorIndex);
  return {
    mode,
    positionId,
    destinationNodeId: String(value.destinationNodeId ?? routePath.at(-1) ?? "").trim(),
    routePath,
    routeIndex,
    moving,
    turningBack,
    turnBackEndsAt: turningBack ? savedTurnBackEndsAt : 0,
    segmentRemainingMs,
    progressUpdatedAt: moving && Number.isFinite(savedUpdatedAt) ? savedUpdatedAt : moving ? Date.now() : null,
    progressRate: savedRate,
    settlementId: String(value.settlementId ?? "").trim(),
    settlementName: String(value.settlementName ?? "").trim(),
    settlementAssetId: String(value.settlementAssetId ?? "").trim(),
    departureNodeId: String(value.departureNodeId ?? "").trim(),
    pendingRoadArrivalContinuation,
    pendingRoadArrivalPhase,
    talkCardAreaRouteKey: String(value.talkCardAreaRouteKey || "").trim(),
    talkCardAreaRolls
  };
}

function ensureTravelState() {
  if (!account) return null;
  account.worldSeed = normalizeWorldSeed(account.worldSeed);
  account.travel = normalizeTravelState(account.travel);
  account.worldTime = normalizeWorldTime(account.worldTime);
  account.weatherSystem = window.ProjectWWeather.normalizeState(account.weatherSystem);
  account.journeyEnvironment = normalizeJourneyEnvironment(account.journeyEnvironment);
  account.horse = normalizeHorseState(account.horse);
  account.wagon = normalizeWagonState(account.wagon);
  account.settlementDialogueVisit = normalizeSettlementDialogueVisit(account.settlementDialogueVisit);
  account.horseFeedItemId = LEGACY_HORSE_FEED_ID_MAP.get(account.horseFeedItemId) || account.horseFeedItemId;
  account.horseFeedItemId = HORSE_FEED_IDS.includes(account.horseFeedItemId) ? account.horseFeedItemId : HORSE_FEED_IDS[0];
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  ensurePartnerStatusTimers();
  syncMoodDrivenPartnerStatuses();
  account.partnerMoodAdjustment = account.partner.mood - 50;
  account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
  account.commonSenseUsage = normalizeCommonSenseUsage(account.commonSenseUsage, account.worldTime);
  account.dialogueMemorial = normalizeDialogueMemorial(account.dialogueMemorial);
  account.talkCards = normalizeTalkCardState(account.talkCards);
  if (account.travel.mode !== "camp"
    && (account.talkCards.campSessionKey || account.talkCards.campCardIds.length)) {
    expireCampTalkCards(false);
  }
  account.footprints = normalizeFootprints(account.footprints);
  account.nahanaEvents = normalizeNahanaEventState(account.nahanaEvents);
  account.partnerWeatherStreak = normalizePartnerWeatherStreak(account.partnerWeatherStreak);
  account.informationUsage = normalizeInformationUsage(account.informationUsage, account.worldTime);
  account.informationState = window.ProjectWInformation.normalizeState(account.informationState);
  account.guildContribution = normalizeGuildContribution(account.guildContribution);
  account.featureUnlocks = normalizeFeatureUnlocks(account.featureUnlocks, false);
  account.advancedTutorials = normalizeAdvancedTutorialState(account.advancedTutorials);
  account.billNotes = window.ProjectWBillNotes.normalizeState(account.billNotes);
  account.bargaining = normalizeBargainingState(account.bargaining, account.worldTime);
  account.innErrandState = normalizeInnErrandState(account.innErrandState);
  account.cityEvents = window.ProjectWCityEvents.normalizeState(account.cityEvents, account.worldTime.day);
  account.routeEvents = window.ProjectWRouteEvents.normalizeState(account.routeEvents);
  account.wolfenCompany = window.ProjectWWolfenCompany.normalizeState(account.wolfenCompany);
  account.interfaceState = normalizeInterfaceState(account.interfaceState);
  account.schemaVersion = Math.max(ACCOUNT_SCHEMA_VERSION, Number(account.schemaVersion) || 1);
  return account.travel;
}

function isTravelClockPaused() {
  return travelPauseReasons.size > 0;
}

function pauseTravelClock(reason) {
  const key = String(reason || "ui");
  if (!account || travelPauseReasons.has(key)) return;
  if (!travelPauseReasons.size && account.travel?.moving) reconcileTravelProgress(false);
  travelPauseReasons.add(key);
  clearTravelTimers();
  if (account.travel?.moving) account.travel.progressUpdatedAt = Date.now();
  gameScreen.classList.remove("is-wagon-moving");
  syncAudioState();
}

function pauseTravelClockAtArrival(reason) {
  const key = String(reason || "ui");
  if (!account || travelPauseReasons.has(key)) return;
  travelPauseReasons.add(key);
  clearTravelTimers();
  if (account.travel?.moving) account.travel.progressUpdatedAt = Date.now();
  gameScreen.classList.remove("is-wagon-moving");
  syncAudioState();
}

function resumeTravelClock(reason) {
  const key = String(reason || "ui");
  if (!travelPauseReasons.delete(key) || travelPauseReasons.size) return;
  if (account?.travel?.moving) {
    account.travel.progressUpdatedAt = Date.now();
    persistAccount();
    syncTravelExperience();
    scheduleTravelStep();
  } else if (account?.travel?.turningBack) {
    syncTravelExperience();
    scheduleTravelStep();
  }
  schedulePendingNarrativePresentation();
}

function prepareTravelExperience() {
  const travel = ensureTravelState();
  if (!travel) return;
  ensureRoadTalkCardAreaPlan(travel);
  reconcileCompletedNahanaEventRewards();
  refreshNahanaEventAvailability();
  void loadNahanaEventDefinitions().then(() => reconcileActiveNahanaEventStage());
  ensureWeatherSystem();
  window.ProjectWWolfenCompany.ensureState();
  void window.ProjectWCityEvents.ensureCurrentDay();
  if (account.routeEvents?.pending) pauseTravelClock("route-event");
  void window.ProjectWRouteEvents.load().then(() => window.ProjectWRouteEvents.restorePending());
  reconcileTravelProgress(false);
  const currentTravel = account?.travel;
  if (currentTravel?.moving) {
    currentTravel.progressRate = calculateTravelRate(currentScene, currentTravel);
    currentTravel.progressUpdatedAt = Date.now();
  }
  persistAccount();
  syncTravelExperience();
  scheduleTravelStep();
}

function reconcileTravelProgress(reschedule = true) {
  const travel = ensureTravelState();
  if (!travel) return;
  if (travel.pendingRoadArrivalContinuation && travel.moving && !isTravelClockPaused()) {
    resumePendingRoadArrivalContinuation(travel);
    return;
  }
  const now = Date.now();
  let changed = false;

  if (travel.turningBack) {
    if (now >= travel.turnBackEndsAt) completeTurnBack(travel);
    else {
      syncTravelExperience();
      if (reschedule) scheduleTravelStep();
    }
    return;
  }

  if (travel.moving && isTravelClockPaused()) {
    travel.progressUpdatedAt = now;
    syncTravelExperience();
    return;
  }

  if (travel.moving) {
    let talkCardProgressCursor = storedTravelRoutePosition(travel);
    const updatedAt = Number.isFinite(travel.progressUpdatedAt) ? travel.progressUpdatedAt : now;
    let elapsedMs = Math.max(0, now - updatedAt);
    travel.progressUpdatedAt = now;
    changed = elapsedMs > 0;

    while (travel.moving && elapsedMs >= travel.segmentRemainingMs / travel.progressRate) {
      elapsedMs -= Math.max(0, travel.segmentRemainingMs / travel.progressRate);
      const segmentEndPosition = Math.min(travel.routePath.length - 1, travel.routeIndex + 1);
      resolveRoadTalkCardAreaRolls(travel, talkCardProgressCursor, segmentEndPosition);
      talkCardProgressCursor = segmentEndPosition;
      travel.segmentRemainingMs = TRAVEL_STEP_MS;
      if (travel.routeIndex >= travel.routePath.length - 1) {
        stopTravelAtCurrentPosition(travel);
        break;
      }

      travel.routeIndex += 1;
      travel.positionId = travel.routePath[travel.routeIndex];
      changed = true;
      completeTravelStep(travel);
      if (isTravelClockPaused()) {
        elapsedMs = 0;
        break;
      }
    }

    if (travel.moving && elapsedMs > 0) {
      travel.segmentRemainingMs = Math.max(0, travel.segmentRemainingMs - (elapsedMs * travel.progressRate));
    }
    resolveRoadTalkCardAreaRolls(travel, talkCardProgressCursor, storedTravelRoutePosition(travel));
  }

  if (travel.moving && travel.routeIndex >= travel.routePath.length - 1) {
    stopTravelAtCurrentPosition(travel);
    changed = true;
  }

  if (changed) persistAccount();
  syncTravelExperience();
  if (reschedule) scheduleTravelStep();
}

function stopTravelAtCurrentPosition(travel) {
  travel.moving = false;
  travel.turningBack = false;
  travel.turnBackEndsAt = 0;
  travel.pendingRoadArrivalContinuation = false;
  travel.pendingRoadArrivalPhase = "";
  travel.segmentRemainingMs = TRAVEL_STEP_MS;
  travel.progressUpdatedAt = null;
  travel.progressRate = 1;
  clearTravelTimers();
}

function completeTravelStep(travel) {
  if (!travel || travel !== account?.travel || !travel.moving) return;
  // 도착 후속 처리(튜토리얼·길 이벤트·나하나 이벤트·야영 판정)가 끝날 때까지
  // 다음 구간으로 넘어가지 않도록 공통 도착 잠금을 유지한다.
  travel.pendingRoadArrivalContinuation = true;
  travel.pendingRoadArrivalPhase = "before-route-event";
  // 방금 지나온 구간에는 현재 시점의 날씨와 그 날씨로 갱신된 노면을 적용한다.
  // 이후 시간과 날씨가 바뀌어도 이미 완료한 구간의 결과는 달라지지 않는다.
  advanceRoadSurfaceState();
  const completedSegmentConditions = getCurrentRoadConditions(travel.positionId);
  advanceGameTime({ roadSurfaceAlreadyAdvanced: true });
  window.ProjectWMerchantPath?.advanceTradeJourneyDistance?.(1);
  applyTravelStepConsequences(travel.positionId, completedSegmentConditions);
  if (isNodeId(travel.positionId)) {
    window.ProjectWCityEvents.clearRouteEffects(travel.positionId);
    window.ProjectWRouteEvents.clearDestinationEffects(travel.positionId);
  } else window.ProjectWRouteEvents.completeDotArrival();
  recordCompanionArrival(travel.positionId);
  driftPartnerTasteParameters(travel.positionId);
  rollRoadArrivalPartnerStatuses(travel.positionId);
  notifyArrivalOutsideRoadView(travel.positionId);
  if (travel.positionId === FIRST_TUTORIAL_DESTINATION_ID) {
    account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
    account.tutorialProgress.reachedHirenbach = true;
  }

  if (!isNodeId(travel.positionId) && shouldStartTutorial(3)
    && normalizeTutorialProgress(account.tutorialProgress).dialogueCompleted.includes("DL_002")) {
    stopTravelAtCurrentPosition(travel);
    startTutorial(3);
    return;
  }

  if (travel.positionId === FIRST_TUTORIAL_DESTINATION_ID && shouldStartTutorial(4)) {
    stopTravelAtCurrentPosition(travel);
    account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
    account.tutorialProgress.firstHirenbachArrivalSeen = true;
    startTutorial(4);
    return;
  }

  if (maybeStartHorseFeedTutorial(travel)) return;

  return continueRoadArrivalAfterTutorial(travel);
}

function notifyArrivalOutsideRoadView(placementId) {
  if (!["partner", "cargo", "map"].includes(currentScene)) return;
  if (isNodeId(placementId)) {
    showGameNotice(`${getPlacementName(placementId)}에 도착했습니다. 짐마차가 멈췄습니다.`);
    return;
  }
  showGameNotice("길 위의 다음 지점을 지났습니다.");
}

function continueRoadArrivalAfterTutorial(travel) {
  if (!travel || travel !== account?.travel || !travel.moving) return;
  if (travel.pendingRoadArrivalPhase === "after-route-event") {
    return continueTravelAfterRouteEvent(travel);
  }
  if (handleNahanaEventRoadArrival(travel)) return;

  if (travel.routeIndex >= travel.routePath.length - 1 || isNodeId(travel.positionId)) {
    stopTravelAtCurrentPosition(travel);
    return;
  }
  return resolveRouteEventAtCurrentDot(travel);
}

function handleNahanaEventRoadArrival(travel) {
  if (!account || !travel || travel.positionId !== START_POSITION_ID) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId !== "N_E_011" || state.stage !== 2) return false;
  stopTravelAtCurrentPosition(travel);
  void resolveNahanaEventCondition(2);
  return true;
}

function hasPendingRoadArrivalPresentation() {
  if (!account) return false;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  const nonRoutePause = [...travelPauseReasons]
    .some(reason => reason !== "route-event" && reason !== "route-event-check");
  return pendingRoadDialogueCount > 0
    || pendingSystemMiniDialogueCount > 0
    || Boolean(pendingNahanaEventOpeningId || nahanaEventOpeningId)
    || Boolean(activeNahanaSituationEventId
      || normalizeNahanaSituationEventState(account.nahanaSituationEvents).pendingIds.length)
    || talkCardGenerationInProgress > 0
    || Boolean(progress.talkCardTutorialPending)
    || Boolean(progress.sootheTutorialPending && isFeatureUnlocked("partnerSnack"))
    || Boolean(activeTalkCardId)
    || nonRoutePause;
}

function schedulePendingRoadArrivalContinuation() {
  const travel = account?.travel;
  if (!travel?.moving || !travel.pendingRoadArrivalContinuation || isTravelClockPaused()) return false;
  scheduleTravelStep();
  return true;
}

async function resolveRouteEventAtCurrentDot(travel) {
  if (!travel?.moving || isNodeId(travel.positionId)) return;
  pauseTravelClockAtArrival("route-event-check");
  try {
    const context = routeEventContext(travel.positionId);
    let event = null;
    if (window.ProjectWWolfenCompany.canEncounter(travel.positionId)) {
      event = await window.ProjectWRouteEvents.rollForcedAtDot("R_E_007", context, {
        cooldown: window.ProjectWWolfenCompany.ENCOUNTER_COOLDOWN_TIMES,
        source: "wolfen-company"
      });
      if (event) window.ProjectWWolfenCompany.recordEncounter();
    }
    if (!event) event = await window.ProjectWRouteEvents.rollAtDot(context);
    if (event) {
      travel.pendingRoadArrivalPhase = "after-route-event";
      persistAccount();
      pauseTravelClock("route-event");
      return;
    }
    travel.pendingRoadArrivalPhase = "after-route-event";
    continueTravelAfterRouteEvent(travel);
  } catch (error) {
    console.error("경로 이벤트 판정 중 오류가 발생했습니다.", error);
    travel.pendingRoadArrivalPhase = "after-route-event";
    continueTravelAfterRouteEvent(travel);
  } finally {
    resumeTravelClock("route-event-check");
    if (account?.travel === travel && travel.moving && !isTravelClockPaused()) scheduleTravelStep();
    schedulePendingNarrativePresentation();
  }
}

function continueTravelAfterRouteEvent(travel = account?.travel) {
  if (!travel || travel !== account?.travel || !travel.moving) return;
  if (travel.routeIndex >= travel.routePath.length - 1 || isNodeId(travel.positionId)) {
    stopTravelAtCurrentPosition(travel);
    return;
  }
  if (["저녁", "밤"].includes(currentTimePhase())) {
    enterCampAtCurrentPosition(travel);
    return;
  }
  if (hasPendingRoadArrivalPresentation()) {
    travel.pendingRoadArrivalContinuation = true;
    travel.pendingRoadArrivalPhase = "after-route-event";
    persistAccount();
    syncTravelExperience();
    return;
  }
  travel.pendingRoadArrivalContinuation = false;
  travel.pendingRoadArrivalPhase = "";
  travel.progressRate = calculateTravelRate(currentScene, travel);
  travel.progressUpdatedAt = Date.now();
  persistAccount();
  syncTravelExperience();
  if (!isTravelClockPaused()) scheduleTravelStep();
}

function handleRouteEventResolved(event) {
  if (["R_E_002", "R_E_003", "R_E_004"].includes(event?.id)) {
    unlockFootprint("FOOTPRINT_010");
    queueNahanaSituationEvent("E_008");
  }
  if (event?.id === "R_E_005") {
    unlockFootprint("FOOTPRINT_011");
    queueNahanaSituationEvent("E_009");
  }
  if (["R_E_006", "R_E_007"].includes(event?.id)) {
    unlockFootprint("FOOTPRINT_012");
    queueNahanaSituationEvent("E_010");
  }
  if (account?.travel?.pendingRoadArrivalContinuation) {
    account.travel.pendingRoadArrivalPhase = "after-route-event";
  }
  continueTravelAfterRouteEvent(account?.travel);
  persistAccount();
  syncTravelExperience();
  schedulePendingNarrativePresentation();
}

function advanceGameTime(options = {}) {
  if (!options.roadSurfaceAlreadyAdvanced) advanceRoadSurfaceState();
  const time = normalizeWorldTime(account?.worldTime);
  const previousDay = time.day;
  time.phaseIndex += 1;
  if (time.phaseIndex >= TIME_PHASES.length) {
    time.phaseIndex = 0;
    time.day += 1;
  }
  account.worldTime = time;
  if (time.day > previousDay) window.ProjectWWallet.advanceMarketToDay(time.day);
  if (time.day > previousDay) window.ProjectWInformation.advanceToDay(time.day);
  if (time.day > previousDay) addCompanionExperience(1, "함께한 하루");
  if (time.day > previousDay) recoverSpiritAfterSleep();
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  if (time.day > previousDay) recoverDailyPartnerGreasiness();
  account.partner.activeBuffs = account.partner.activeBuffs.filter(buff => buff.expiresDay > time.day);
  processPartnerStatusesAfterTimeAdvance();
  window.ProjectWRouteEvents.advanceTime();
  if (time.day > previousDay) applyPendingPartnerMorningStatuses();
  const moodBuffChance = partnerMoodBuffChance();
  if (moodBuffChance > 0 && Math.random() < moodBuffChance) changePartnerMood(2);
  advanceWeatherTime();
  window.ProjectWWolfenCompany.advanceTime();
  window.ProjectWInformation.refresh();
  evaluateSeasonFootprints();
  if (time.day > previousDay) void window.ProjectWCityEvents.ensureCurrentDay();
}

function handleCityEventChange(change) {
  const placement = change?.placement;
  const event = change?.event;
  if (!placement || !event || account?.travel?.mode !== "settlement" || account.travel.settlementId !== placement.id) return;
  const action = change.type === "ended" ? "종료" : "발생";
  showGameNotice(`${placement.name || "거점"} 도시 이벤트 ${action}: ${event.name}`);
  renderSettlementFacilities(placement, placement.name || "거점");
}

function currentTimePhase() {
  const time = normalizeWorldTime(account?.worldTime);
  return TIME_PHASES[time.phaseIndex];
}

function currentSeason() {
  return seasonForWorldTime(account?.worldTime);
}

function seasonForWorldTime(value) {
  const time = normalizeWorldTime(value);
  const month = contractCalendarDate(time.day).month;
  return SEASONS_BY_MONTH.get(month) || "봄";
}

function ensureWeatherSystem() {
  if (!account) return null;
  const graph = window.ProjectWMapView.getWeatherGraphData?.();
  account.weatherSystem = window.ProjectWWeather.ensureState(account.weatherSystem, graph, {
    season: currentSeason(),
    initialClearNames: INITIAL_CLEAR_WEATHER_NAMES
  });
  return account.weatherSystem;
}

function advanceWeatherTime() {
  if (!account) return;
  const graph = window.ProjectWMapView.getWeatherGraphData?.();
  account.weatherSystem = window.ProjectWWeather.advanceTime(account.weatherSystem, graph, {
    season: currentSeason(),
    times: 1
  });
}

function currentEnvironmentPlacementId() {
  const travel = account?.travel;
  if (!travel) return "";
  return travel.mode === "settlement" ? travel.settlementId || travel.positionId : travel.positionId;
}

function weatherAtPlacement(placementId = currentEnvironmentPlacementId()) {
  const weatherSystem = ensureWeatherSystem();
  return window.ProjectWWeather.getWeatherAt(weatherSystem, placementId);
}

function wolfenRegionAtPlacement(placementId) {
  const placement = window.ProjectWMapView.getPlacement(placementId);
  if (placement?.region) return placement.region;
  const weatherSystem = window.ProjectWWeather.normalizeState(account?.weatherSystem);
  const ownerNodeId = window.ProjectWWeather.getWeatherAt(weatherSystem, placementId).ownerNodeId;
  return window.ProjectWMapView.getPlacement(ownerNodeId)?.region || "";
}

function advanceRoadSurfaceState() {
  if (!account) return;
  const graph = window.ProjectWMapView.getWeatherGraphData?.();
  if (!graph?.loaded) return;
  const weatherSystem = ensureWeatherSystem();
  const environment = normalizeJourneyEnvironment(account?.journeyEnvironment);
  const validDotIds = new Set((graph.dots || []).map(dot => dot.id));
  Object.keys(environment.roadByDotId).forEach(dotId => {
    if (!validDotIds.has(dotId)) delete environment.roadByDotId[dotId];
  });
  (graph.dots || []).forEach(dot => {
    const road = normalizeRoadSurfaceEntry(environment.roadByDotId[dot.id]);
    const weather = window.ProjectWWeather.getWeatherAt(weatherSystem, dot.id).label;
    if (WET_WEATHER_TYPES.has(weather)) {
      road.precipitationType = "wet";
      road.roadStage = Math.min(2, road.roadStage + (weather === "폭우" ? 2 : 1));
    } else if (SNOW_WEATHER_TYPES.has(weather)) {
      road.precipitationType = "snow";
      road.roadStage = Math.min(2, road.roadStage + (weather === "폭설" ? 2 : 1));
    } else {
      road.roadStage = Math.max(0, road.roadStage - 1);
      if (road.roadStage === 0) road.precipitationType = "";
    }
    if (road.roadStage > 0) environment.roadByDotId[dot.id] = road;
    else delete environment.roadByDotId[dot.id];
  });
  account.journeyEnvironment = environment;
}

function applyTravelStepConsequences(placementId, conditionsOverride = null) {
  account.horse = normalizeHorseState(account.horse);
  account.wagon = normalizeWagonState(account.wagon);
  const conditions = conditionsOverride || getCurrentRoadConditions(placementId);
  const healthLoss = Math.max(0, Math.round(calculateHorseHealthLoss(placementId, conditions) * partnerHorseHealthConsumptionMultiplier()));
  const hungerLoss = Math.max(0, Math.round((Math.floor(Math.random() * 10) + 6) * partnerHorseHungerConsumptionMultiplier()));

  account.horse.health = Math.max(0, account.horse.health - healthLoss);
  account.horse.hunger = Math.max(0, account.horse.hunger - hungerLoss);
  if (!isNodeId(placementId)) {
    applyTravelMoodChange(conditions);
    const conditionChanceMultiplier = wagonEffectChanceMultiplier(account.wagon);
    const axleChance = hasPartnerBlessing("N_Bless_006") ? 0.002 : 0.003;
    if (Math.random() < axleChance * conditionChanceMultiplier) addWagonEffect("차축 삐걱임");
    const baseWheelChance = hasPartnerBlessing("N_Bless_007") ? 0.0007 : 0.001;
    const wheelDamageChance = (account.wagon.effects.includes("차축 삐걱임") ? baseWheelChance * 5 : baseWheelChance)
      * conditionChanceMultiplier;
    if (Math.random() < wheelDamageChance) addWagonEffect("수레바퀴 손상");
    if (Math.random() < (hasPartnerBlessing("N_Bless_024") ? 0.002 : 0.003) * conditionChanceMultiplier) {
      addWagonEffect("화물 고정 불량");
    }
    if (Math.random() < (hasPartnerBlessing("N_Bless_025") ? 0.002 : 0.003) * conditionChanceMultiplier) {
      addWagonEffect("물 새는 천막");
    }
  } else {
    account.partnerWeatherStreak = createInitialPartnerWeatherStreak();
    account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
    account.partner.statusStreaks.rain = 0;
    account.partner.statusStreaks.extremeCold = 0;
    account.partner.statusStreaks.summerHumidity = 0;
    account.partner.statusStreaks.roughTravel = 0;
  }
  if (Math.random() < 0.33) {
    const reduced = Math.random() < partnerWagonDamageReductionChance();
    account.wagon.condition = Math.max(0, account.wagon.condition - (reduced ? 0 : 1));
  }
  const becameHalfBroken = account.wagon.condition <= 0 && !account.wagon.effects.includes("짐마차 반파");
  if (becameHalfBroken) {
    addWagonEffect("짐마차 반파");
    window.ProjectWCargo.discardAll("짐마차가 반파되어 적재 중이던 화물을 모두 잃었습니다.");
  }
  const hasBadCargoSecuring = account.wagon.effects.includes("화물 고정 불량")
    && conditions.terrains.some(terrain => ["험지", "산지", "숲길"].includes(terrain));
  const hasLeakingCanopy = account.wagon.effects.includes("물 새는 천막")
    && ["비", "폭우"].includes(conditions.weather);
  const cityRouteEffect = isNodeId(placementId)
    ? { breakageMaximum: 0, freshMaximum: 0 }
    : window.ProjectWCityEvents.getRouteEffects();
  const routeEventDeterioration = isNodeId(placementId)
    ? { breakageMaximum: 0, freshMaximum: 0 }
    : window.ProjectWRouteEvents.getDeteriorationModifiers();
  const breakageMinimumReduction = hasPartnerBlessing("N_Bless_013")
    && conditions.terrains.some(terrain => ["험지", "산지", "숲길"].includes(terrain)) ? -1 : 0;
  const freshMinimumReduction = (hasPartnerBlessing("N_Bless_026") && conditions.environments.includes("다습") ? -1 : 0)
    + (hasPartnerBlessing("N_Bless_027") && conditions.season === "여름" ? -1 : 0)
    + (hasPartnerBlessing("N_Bless_028") && conditions.weather === "폭우" ? -1 : 0);
  window.ProjectWCargo.applyTravelDeterioration({
    terrains: conditions.terrains,
    environments: conditions.environments,
    roadSurfaces: conditions.roadSurfaces,
    season: conditions.season,
    weather: conditions.weather,
    extraBreakageMinimum: (hasBadCargoSecuring ? 1 : 0) + breakageMinimumReduction,
    extraBreakageMaximum: (hasBadCargoSecuring ? 1 : 0)
      + (Number(cityRouteEffect.breakageMaximum) || 0)
      + (Number(routeEventDeterioration.breakageMaximum) || 0),
    extraFreshMinimum: (hasLeakingCanopy ? 1 : 0) + freshMinimumReduction,
    extraFreshMaximum: (hasLeakingCanopy ? 1 : 0)
      + (Number(cityRouteEffect.freshMaximum) || 0)
      + (Number(routeEventDeterioration.freshMaximum) || 0),
    breakageReductionChance: partnerCargoBreakageReductionChance(),
    freshReductionChance: partnerCargoFreshReductionChance(),
    categoryReductionChances: window.ProjectWMerchantPath.getDeteriorationProtectionChances()
  });
  evaluateJourneyFootprints(conditions, becameHalfBroken);
}

function applyTravelMoodChange(conditions) {
  if (!account) return 0;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const weather = String(conditions?.weather || "");
  const previous = normalizePartnerWeatherStreak(account.partnerWeatherStreak);
  let weatherType = "";
  let weatherChange = 0;
  if (WET_WEATHER_TYPES.has(weather)) {
    weatherType = "rain";
    weatherChange = -Math.floor(Math.random() * 4);
  } else if (SNOW_WEATHER_TYPES.has(weather)) {
    weatherType = "snow";
    weatherChange = 2 - Math.floor(Math.random() * 4);
  }

  const streakCount = weatherType ? (previous.type === weatherType ? previous.count + 1 : 1) : 0;
  if (weatherType) weatherChange -= Math.min(3, Math.max(0, streakCount - 1));
  account.partnerWeatherStreak = weatherType
    ? { type: weatherType, count: streakCount }
    : createInitialPartnerWeatherStreak();

  const statusStreaks = account.partner.statusStreaks;
  const environments = [...new Set(conditions?.environments || [])];
  const terrains = [...new Set(conditions?.terrains || [])];
  statusStreaks.rain = WET_WEATHER_TYPES.has(weather) ? statusStreaks.rain + 1 : 0;
  statusStreaks.extremeCold = environments.includes("혹한") ? statusStreaks.extremeCold + 1 : 0;
  statusStreaks.summerHumidity = conditions?.season === "여름" && environments.includes("다습")
    ? statusStreaks.summerHumidity + 1
    : 0;
  statusStreaks.roughTravel = (conditions?.roadSurfaces || []).includes("진흙 길")
    || terrains.some(terrain => ["험지", "산지", "산길"].includes(terrain))
    ? statusStreaks.roughTravel + 1
    : 0;
  if (statusStreaks.rain >= 3) addPartnerStatus("N_S_013", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
  if (statusStreaks.extremeCold >= 3) addPartnerStatus("N_S_014", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
  if (statusStreaks.summerHumidity >= 2) addPartnerStatus("N_S_015", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
  if (statusStreaks.roughTravel >= 5) addPartnerStatus("N_S_016", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
  if (partnerHasStatus(account.partner, "젖은 어깨") && environments.some(value => value === "추위" || value === "혹한")) {
    addPartnerStatus("N_S_024", { remainingTimes: 10 });
  }

  if (partnerHasStatus(account.partner, "젖은 어깨") && WET_WEATHER_TYPES.has(weather)) weatherChange -= 1;
  if (partnerHasStatus(account.partner, "즐거운 연회") && weatherChange < 0) weatherChange += 1;
  const environmentPenalties = new Map([["추위", -1], ["다습", -2], ["혹한", -3]]);
  const terrainPenalties = new Map([["숲길", -1], ["험지", -2], ["산지", -3], ["산길", -3]]);
  let environmentChange = environments
    .reduce((sum, environment) => sum + (environmentPenalties.get(environment) || 0), 0);
  let terrainChange = terrains
    .reduce((sum, terrain) => sum + (terrainPenalties.get(terrain) || 0), 0);
  if (partnerHasStatus(account.partner, "식은 몸") && environments.some(value => value === "추위" || value === "혹한")) {
    environmentChange -= 1;
  }
  if (partnerHasStatus(account.partner, "즐거운 연회") && terrainChange < 0) terrainChange += 1;
  const requestedChange = weatherChange + environmentChange + terrainChange;
  const appliedChange = changePartnerMood(requestedChange);
  account.lastTravelMoodChange = {
    weather,
    weatherChange,
    weatherStreak: streakCount,
    environmentChange,
    terrainChange,
    total: appliedChange
  };
  return appliedChange;
}

function addWagonEffect(effect) {
  if (!account?.wagon || account.wagon.effects.includes(effect)) return false;
  account.wagon.effects.push(effect);
  showGameNotice(`짐마차 상태이상 발생: ${effect}`);
  const dialogueIds = new Map([
    ["차축 삐걱임", "DL_R_003"],
    ["수레바퀴 손상", "DL_R_004"],
    ["화물 고정 불량", "DL_R_005"],
    ["물 새는 천막", "DL_R_006"],
    ["짐마차 반파", "DL_R_007"]
  ]);
  const dialogueId = dialogueIds.get(effect);
  if (dialogueId && account.travel?.mode === "road") void showRoadDialogue(dialogueId, ROAD_WAGON_DIALOG_DURATION_MS);
  return true;
}

function calculateHorseHealthLoss(placementId = account?.travel?.positionId, conditionsOverride = null) {
  const load = window.ProjectWCargo.getLoadSummary();
  const loadRatio = load.maxWeight > 0 ? Math.max(0, load.weight / load.maxWeight) : 0;
  const loadHealthLoss = Math.floor(loadRatio / 0.25);
  const conditions = conditionsOverride || getCurrentRoadConditions(placementId);
  const environmentHealthLoss = conditions.environments.reduce((maximum, environment) => {
    return Math.max(maximum, ENVIRONMENT_HEALTH_LOSS.get(environment) ?? 0);
  }, 0);
  return 1 + loadHealthLoss + environmentHealthLoss;
}

function enterCampAtCurrentPosition(travel) {
  stopTravelAtCurrentPosition(travel);
  travel.mode = "camp";
  campSetupOpen = false;
  campMealInstanceIds = new Set();
  campUtilityInstanceIds = new Set();
  tutorialCampMealSelections = new Set();
  ensureCampTalkCardSession();
  if (currentScene !== "road") showScene("road", 1, false);
  // 야영 상태와 진입 버튼을 먼저 화면에 반영한 뒤 첫 야영 튜토리얼을 연다.
  // 정면뷰에서 바로 야영에 들어간 경우 showScene이 화면을 다시 그리지 않으므로
  // 여기서 명시적으로 동기화해야 이전의 비활성 이동 버튼이 남지 않는다.
  syncTravelExperience();
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  persistAccount();
  refreshAdvancedTutorialLaunchers();
  // 첫 야영 튜토리얼도 공통 서사 대기열에서 시작해 다른 대화와 겹치지 않게 한다.
  window.requestAnimationFrame(() => window.setTimeout(schedulePendingNarrativePresentation, 0));
}

function maybeStartFirstCampTutorial() {
  if (!account || account.travel?.mode !== "camp" || !shouldStartTutorial(2)) return false;
  const started = startTutorial(2);
  if (!started) return false;
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  account.tutorialProgress.firstCampSeen = true;
  persistAccount();
  if (campSetupOpen && account.tutorialProgress.step === 0) setTutorialStep(1);
  return true;
}

function getCurrentRoadConditions(placementId = account?.travel?.positionId) {
  const placement = window.ProjectWMapView.getPlacement(placementId);
  const terrains = Array.isArray(placement?.terrains)
    ? placement.terrains.filter(terrain => terrain !== "담수" && terrain !== "항구")
    : [];
  const environments = Array.isArray(placement?.environments)
    ? placement.environments.filter(environment => ENVIRONMENT_HEALTH_LOSS.has(environment))
    : [];
  const connection = getCurrentRouteConnection();
  const baseRoadSurface = connection.routeType === "trade" ? "관리된 길" : "거친 길";
  const journeyEnvironment = normalizeJourneyEnvironment(account?.journeyEnvironment);
  const roadEnvironment = /^MAP_DOT_\d+$/.test(String(placementId || ""))
    ? normalizeRoadSurfaceEntry(journeyEnvironment.roadByDotId[placementId])
    : normalizeRoadSurfaceEntry(null);
  const weather = weatherAtPlacement(placementId);
  const weatherOwner = window.ProjectWMapView.getPlacement(weather.ownerNodeId);
  const region = placement?.region || weatherOwner?.region || "중부";
  const roadSurfaces = [baseRoadSurface];
  if (roadEnvironment.roadStage === 1) roadSurfaces.push("젖은 길");
  if (roadEnvironment.roadStage >= 2) {
    roadSurfaces.push(roadEnvironment.precipitationType === "snow" ? "눈덮힌 길" : "진흙 길");
  }
  return {
    placement,
    region,
    terrains,
    environments,
    routeType: connection.routeType,
    baseRoadSurface,
    roadSurfaces,
    roadStage: roadEnvironment.roadStage,
    season: currentSeason(),
    weather: weather.label,
    weatherOwnerNodeId: weather.ownerNodeId
  };
}

function routeEventContext(placementId = account?.travel?.positionId) {
  const conditions = getCurrentRoadConditions(placementId);
  const placement = conditions.placement;
  const routeCondition = window.ProjectWInformation.getRouteCondition(placementId, conditions.roadSurfaces);
  return {
    placementId: String(placementId || ""),
    placementName: String(placement?.name || ""),
    destinationId: String(account?.travel?.destinationNodeId || ""),
    routeName: String(placement?.name || roadRouteName?.textContent || "이름 없는 길"),
    region: conditions.region,
    terrains: conditions.terrains,
    environments: conditions.environments,
    weather: conditions.weather,
    season: conditions.season,
    stability: routeCondition.stability,
    security: routeCondition.security,
    worldDay: normalizeWorldTime(account?.worldTime).day,
    isNode: isNodeId(placementId)
  };
}

function changeRouteEventHorse(change = {}) {
  if (!account) return;
  account.horse = normalizeHorseState(account.horse);
  account.horse.health = clampNumber(account.horse.health + (Number(change.health) || 0), 0, account.horse.maxHealth, account.horse.health);
  account.horse.hunger = clampNumber(account.horse.hunger + (Number(change.hunger) || 0), 0, account.horse.maxHunger, account.horse.hunger);
}

function changeRouteEventWagon(amount) {
  if (!account) return;
  account.wagon = normalizeWagonState(account.wagon);
  account.wagon.condition = clampNumber(account.wagon.condition + (Number(amount) || 0), 0, account.wagon.maxCondition, account.wagon.condition);
  if (account.wagon.condition <= 0 && !account.wagon.effects.includes("짐마차 반파")) {
    addWagonEffect("짐마차 반파");
    window.ProjectWCargo.discardAll("짐마차가 반파되어 적재 중이던 화물을 모두 잃었습니다.");
  }
}

function damageRandomRouteEventCargo(count, minimumPercent, maximumPercent, options = {}) {
  const candidates = window.ProjectWCargo.getInventoryItems().filter(item => {
    const maximum = Number(item.definition?.durability) || 0;
    if (maximum <= 0 || maximum >= 9999 || Number(item.durability) <= 0) return false;
    return !(options.excludeProtected && item.slotType === "protected");
  });
  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [candidates[index], candidates[swap]] = [candidates[swap], candidates[index]];
  }
  const selected = candidates.slice(0, Math.min(candidates.length, Math.max(0, Math.trunc(Number(count) || 0))));
  let discarded = 0;
  selected.forEach(item => {
    const minimum = Math.min(Number(minimumPercent) || 0, Number(maximumPercent) || 0);
    const maximum = Math.max(Number(minimumPercent) || 0, Number(maximumPercent) || 0);
    const percent = minimum + (Math.random() * (maximum - minimum));
    const damage = Math.max(1, (Number(item.definition?.durability) || 0) * (percent / 100));
    const result = window.ProjectWCargo.damageItem(item.instanceId, damage);
    if (result?.discarded) discarded += 1;
  });
  return { affected: selected.length, discarded };
}

function consumeRouteEventJerky() {
  const ids = ["G_0269", "G_0270"];
  const total = ids.reduce((sum, id) => sum + window.ProjectWCargo.getItemQuantity(id), 0);
  if (total <= 0) return 0;
  let remaining = 1 + Math.floor(Math.random() * total);
  const consumed = remaining;
  ids.forEach(id => {
    const quantity = window.ProjectWCargo.getItemQuantity(id);
    const amount = Math.min(quantity, remaining);
    if (amount > 0) window.ProjectWCargo.consumeItem(id, amount);
    remaining -= amount;
  });
  return consumed - remaining;
}

function routeEventWalletQuantity(currencyId) {
  const value = account?.wallet?.[currencyId];
  const quantity = typeof value === "object" && value !== null ? value.quantity : value;
  return Math.max(0, Math.trunc(Number(quantity) || 0));
}

function setRouteEventWalletQuantity(currencyId, quantity) {
  if (!account) return;
  const current = account.wallet?.[currencyId];
  if (typeof current === "object" && current !== null) account.wallet[currencyId] = { ...current, quantity: Math.max(0, Math.trunc(quantity)) };
  else account.wallet[currencyId] = Math.max(0, Math.trunc(quantity));
}

function getRouteEventCurrencyCapacity(region) {
  return window.ProjectWWallet.getCurrencies().reduce((total, currency) => {
    const value = window.ProjectWWallet.getCurrencyValue(currency, region);
    return total + (Math.max(0, Number(value) || 0) * routeEventWalletQuantity(currency.id));
  }, 0);
}

function autoPayRouteEventCurrency(requiredValue, region) {
  const currencies = window.ProjectWWallet.getCurrencies()
    .map(currency => ({ currency, value: window.ProjectWWallet.getCurrencyValue(currency, region) }))
    .filter(entry => entry.value > 0)
    .sort((left, right) => right.value - left.value);
  const selected = new Map();
  let paid = 0;
  for (const entry of currencies) {
    const held = routeEventWalletQuantity(entry.currency.id);
    const needed = Math.max(0, requiredValue - paid);
    const quantity = Math.min(held, Math.floor(needed / entry.value));
    if (quantity > 0) {
      selected.set(entry.currency.id, quantity);
      paid += entry.value * quantity;
    }
  }
  if (paid < requiredValue) {
    const candidates = currencies
      .filter(entry => (selected.get(entry.currency.id) || 0) < routeEventWalletQuantity(entry.currency.id))
      .sort((left, right) => left.value - right.value);
    const covering = candidates.find(entry => entry.value >= requiredValue - paid) || candidates.at(-1);
    if (covering) {
      selected.set(covering.currency.id, (selected.get(covering.currency.id) || 0) + 1);
      paid += covering.value;
    }
  }
  selected.forEach((quantity, currencyId) => setRouteEventWalletQuantity(currencyId, routeEventWalletQuantity(currencyId) - quantity));
  window.ProjectWWallet.refresh();
  if (selected.size > 0) window.ProjectWAudio?.playEffect("coin");
  return { required: requiredValue, paid };
}

function gainRouteEventCurrency(targetValue, region, minimumValue = targetValue, maximumValue = targetValue) {
  const minimum = Math.max(0, Number(minimumValue) || 0);
  const maximum = Math.max(minimum, Number(maximumValue) || minimum);
  const local = window.ProjectWWallet.getCurrencies().filter(currency => String(currency.region || "")
    .split(/[\/,·\s]+/).map(value => value.trim()).includes(String(region || "")));
  const eligible = currencies => currencies
    .map(currency => ({ currency, value: window.ProjectWWallet.getCurrencyValue(currency, region) }))
    .map(entry => ({
      ...entry,
      minimumQuantity: entry.value > 0 ? Math.ceil(minimum / entry.value) : 0,
      maximumQuantity: entry.value > 0 ? Math.floor(maximum / entry.value) : -1
    }))
    .filter(entry => entry.value > 0 && entry.minimumQuantity <= entry.maximumQuantity);
  const localCandidates = eligible(local);
  const candidates = localCandidates.length ? localCandidates : eligible(window.ProjectWWallet.getCurrencies());
  const chosen = candidates[Math.floor(Math.random() * candidates.length)] || null;
  if (!chosen) return { value: 0, name: "화폐" };
  const quantity = clampNumber(
    Math.round((Number(targetValue) || minimum) / chosen.value),
    chosen.minimumQuantity,
    chosen.maximumQuantity,
    chosen.minimumQuantity
  );
  setRouteEventWalletQuantity(chosen.currency.id, routeEventWalletQuantity(chosen.currency.id) + quantity);
  window.ProjectWWallet.refresh();
  if (quantity > 0) window.ProjectWAudio?.playEffect("coin");
  return { value: chosen.value * quantity, name: chosen.currency.name, quantity };
}

function addRouteEventTravelDelay(milliseconds) {
  const travel = account?.travel;
  if (!travel?.moving) return;
  travel.segmentRemainingMs = Math.max(0, Number(travel.segmentRemainingMs) || TRAVEL_STEP_MS)
    + Math.max(0, Number(milliseconds) || 0);
}

async function openRouteEventDemandPayment({ event, percentage, allowCargo, context, onPaid }) {
  return window.ProjectWEntryTax.openDemand({
    settlement: { id: context.placementId || "road", name: context.routeName || "길 위", category: "경로", region: context.region },
    region: context.region,
    percentage,
    allowCargo,
    compulsory: true,
    location: `${context.routeName || "길 위"} · ${event.name}`,
    paymentNoun: event.id === "R_E_007" ? "쿼터" : "통행세",
    confirmLabel: event.id === "R_E_007" ? "쿼터 지불" : "통행세 지불",
    onPaid
  });
}

function getCurrentRouteConnection(travel = account?.travel) {
  const path = Array.isArray(travel?.routePath) ? travel.routePath : [];
  const index = Math.min(Math.max(0, Number(travel?.routeIndex) || 0), Math.max(0, path.length - 1));
  let fromId = path[index] || travel?.positionId || "";
  let toId = path[index + 1] || "";
  if (!toId && index > 0) {
    fromId = path[index - 1];
    toId = path[index];
  }
  const routeType = window.ProjectWMapView.getConnectionType?.(fromId, toId) === "trade" ? "trade" : "normal";
  return { fromId, toId, routeType };
}

function scheduleTravelStep() {
  clearTravelTimers();
  const travel = account?.travel;
  if (travel?.turningBack) {
    const delay = Math.max(16, travel.turnBackEndsAt - Date.now());
    travelStepTimer = window.setTimeout(reconcileTravelProgress, delay + 8);
    travelCountdownTimer = window.setInterval(updateTravelDisplays, 250);
    return;
  }
  if (!travel?.moving || isTravelClockPaused()) return;
  if (travel.pendingRoadArrivalContinuation) {
    resumePendingRoadArrivalContinuation(travel);
    return;
  }
  const rate = clampNumber(Number(travel.progressRate), 0.1, MAX_TRAVEL_RATE, 1);
  const segmentDelay = travel.segmentRemainingMs / rate;
  const talkCardDelay = nextRoadTalkCardAreaDelay(travel, rate);
  const delay = Math.max(16, Math.min(segmentDelay, talkCardDelay));
  travelStepTimer = window.setTimeout(reconcileTravelProgress, delay + 8);
  travelCountdownTimer = window.setInterval(updateTravelDisplays, 250);
}

function updateTravelDisplays() {
  updateRoadControls();
  updateTravelToolbar();
  updateTravelPinPositions();
}

function calculateTravelRate(sceneName, travel = account?.travel) {
  const horse = normalizeHorseState(account?.horse);
  const wagon = normalizeWagonState(account?.wagon);
  const conditions = getCurrentRoadConditions(travel?.positionId);
  const healthDuration = conditionDurationMultiplier(horse.health, 1.25, 1.5);
  const hungerDuration = conditionDurationMultiplier(horse.hunger, 1.25, 1.5);
  const wagonDuration = 1 / wagonSpeedMultiplier(wagon.condition, wagon.maxCondition, wagon.effects);
  const terrainDuration = conditions.terrains.reduce((maximum, terrain) => {
    return Math.max(maximum, TERRAIN_DURATION_MULTIPLIERS.get(terrain) ?? 1);
  }, 1);
  const roadSpeedMultiplier = conditions.roadSurfaces.reduce((product, surface) => {
    let multiplier = partnerRoadSpeedMultiplier(surface);
    const routeEffect = window.ProjectWCityEvents.getRouteEffects();
    if (surface === "눈덮힌 길" && Number(routeEffect.snowPenaltyPoints)) {
      multiplier += Math.max(0, -Number(routeEffect.snowPenaltyPoints) / 100);
    }
    return product * multiplier;
  }, 1);
  const roadDuration = 1 / Math.max(0.1, roadSpeedMultiplier);
  const loadSpeedMultiplier = window.ProjectWCargo.getLoadSummary().speedMultiplier;
  const overloadDuration = 1 / clampNumber(loadSpeedMultiplier, 0.1, 1, 1);
  const cityRouteSpeed = Math.max(.1, 1 + ((Number(window.ProjectWCityEvents.getRouteEffects().speedPercent) || 0) / 100));
  const routeEventSpeed = Math.max(.1, 1 + ((Number(window.ProjectWRouteEvents.getSpeedPercent(travel?.destinationNodeId)) || 0) / 100));
  const blessingSpeed = partnerBaseTravelSpeedMultiplier() * activeCompanionTravelSpeedMultiplier() * cityRouteSpeed * routeEventSpeed;
  const totalDuration = Math.min(10, healthDuration * hungerDuration * wagonDuration * terrainDuration * roadDuration * overloadDuration);
  return clampNumber(blessingSpeed / totalDuration, 0.1, MAX_TRAVEL_RATE, 1);
}

function partnerBaseTravelSpeedMultiplier() {
  const highest = highestPartnerBlessing("N_Bless_", 1, 5);
  const secondsByBlessing = new Map([[1, 28], [2, 26], [3, 24], [4, 22], [5, 20]]);
  const seconds = secondsByBlessing.get(highest) || 30;
  return 30 / seconds;
}

function partnerRoadSpeedMultiplier(surface) {
  const enhanced = new Map([
    ["관리된 길", ["N_Bless_008", 1.5]],
    ["거친 길", ["N_Bless_009", 1]],
    ["젖은 길", ["N_Bless_010", 0.8]],
    ["진흙 길", ["N_Bless_011", 0.75]],
    ["눈덮힌 길", ["N_Bless_012", 0.75]]
  ]).get(surface);
  if (enhanced && hasPartnerBlessing(enhanced[0])) return enhanced[1];
  return ROAD_SURFACE_SPEED_MULTIPLIERS.get(surface) ?? 1;
}

function conditionDurationMultiplier(value, warningMultiplier, dangerMultiplier) {
  if (value <= 25) return dangerMultiplier;
  if (value <= 50) return warningMultiplier;
  return 1;
}

function wagonEffectChanceMultiplier(wagonState = account?.wagon) {
  const wagon = normalizeWagonState(wagonState);
  const conditionRatio = clampNumber(wagon.condition / wagon.maxCondition, 0, 1, 1);
  return 2 - conditionRatio;
}

function wagonSpeedMultiplier(condition, maxCondition, effects = []) {
  const conditionRatio = clampNumber(Number(condition) / Math.max(1, Number(maxCondition) || 1), 0, 1, 1);
  let speedMultiplier = conditionRatio >= 0.5
    ? 1
    : 0.33 + (0.67 * (conditionRatio / 0.5));
  if (effects.includes("수레바퀴 손상")) speedMultiplier -= 0.5;
  if (effects.includes("짐마차 반파")) speedMultiplier -= 0.75;
  return Math.max(0.1, speedMultiplier);
}

function hasRemainingRoute(travel) {
  return Boolean(travel) && travel.routeIndex < travel.routePath.length - 1;
}

function nextPointSeconds(travel) {
  if (!travel?.moving) return 0;
  const rate = clampNumber(Number(travel.progressRate), 0.1, MAX_TRAVEL_RATE, 1);
  const remainingProgress = liveSegmentRemainingMs(travel);
  return Math.ceil(remainingProgress / rate / 1000);
}

function liveSegmentRemainingMs(travel) {
  if (!travel?.moving) return Math.max(0, Number(travel?.segmentRemainingMs) || TRAVEL_STEP_MS);
  const rate = clampNumber(Number(travel.progressRate), 0.1, MAX_TRAVEL_RATE, 1);
  const updatedAt = Number.isFinite(travel.progressUpdatedAt) ? travel.progressUpdatedAt : Date.now();
  const elapsedProgress = Math.max(0, Date.now() - updatedAt) * rate;
  return Math.max(0, travel.segmentRemainingMs - elapsedProgress);
}

function liveSegmentProgress(travel) {
  if (!travel?.moving || travel.routeIndex >= travel.routePath.length - 1) return 0;
  return clampNumber(1 - (liveSegmentRemainingMs(travel) / TRAVEL_STEP_MS), 0, 1, 0);
}

function routeProgressPercent(travel) {
  const lastIndex = Math.max(1, travel?.routePath?.length - 1);
  const segment = liveSegmentProgress(travel);
  return clampNumber(((travel.routeIndex + segment) / lastIndex) * 100, 0, 100, 0);
}

function updateTravelPinPositions(travel = account?.travel) {
  if (!travel?.routePath?.length) return;
  const progress = routeProgressPercent(travel);
  const segmentProgress = liveSegmentProgress(travel);
  const nextPlacementId = travel.moving ? travel.routePath[travel.routeIndex + 1] || "" : "";
  roadRouteProgress.style.width = `${progress}%`;
  roadRoutePin.style.left = `${travel.routePath.length === 1 ? 50 : progress}%`;
  window.ProjectWMapView.updatePlayerProgress(travel.positionId, nextPlacementId, segmentProgress);
}

function updateTravelToolbar() {
  const travel = account?.travel;
  const active = Boolean(travel?.moving || travel?.turningBack);
  travelToolbarStatus.hidden = !active;
  if (!active) return;
  travelToolbarTime.textContent = travel.turningBack
    ? `회차 ${turnBackSeconds(travel)}초`
    : `다음 지점 ${nextPointSeconds(travel)}초`;
  travelToolbarStatus.classList.toggle("is-half-speed", travel.progressRate < 1);
}

function clearTravelTimers() {
  window.clearTimeout(travelStepTimer);
  window.clearInterval(travelCountdownTimer);
  travelStepTimer = undefined;
  travelCountdownTimer = undefined;
}

function syncTravelExperience() {
  const travel = account?.travel;
  const presentingMovement = Boolean(travel?.moving && !isTravelClockPaused());
  gameScreen.classList.toggle("is-wagon-moving", presentingMovement);
  updateGameClock();
  window.ProjectWWallet.refresh();
  updatePartnerUi();
  updateWeatherPresentation();
  if (!travel) {
    applyOutdoorSceneContext();
    updateTravelToolbar();
    renderRoadRouteBar();
    updateRoadConditionUi();
    updateHorseFeedUi();
    syncAudioState();
    return;
  }
  const nextPositionId = travel.moving ? travel.routePath[travel.routeIndex + 1] || "" : "";
  const segmentProgress = liveSegmentProgress(travel);
  if (travel.positionId !== lastMapFocusPositionId) {
    window.ProjectWMapView.setPlayerPosition(travel.positionId, nextPositionId, segmentProgress);
    lastMapFocusPositionId = travel.positionId;
  } else {
    window.ProjectWMapView.updatePlayerProgress(travel.positionId, nextPositionId, segmentProgress);
  }
  if (travel.mode === "settlement") applySettlementSceneContext(travel);
  else if (travel.mode === "camp") applyCampSceneContext();
  else applyOutdoorSceneContext();
  applyInnSceneBackgroundContext();
  updateRoadControls();
  updateTravelToolbar();
  renderRoadRouteBar();
  updateRoadConditionUi();
  updateHorseFeedUi();
  syncAudioState();
}

function syncAudioState() {
  const travel = account?.travel;
  const titleActive = !titleScreen.hidden;
  const loadingActive = Boolean(gameLoadingScreen && !gameLoadingScreen.hidden);
  const placementId = travel?.mode === "settlement"
    ? travel.settlementId || travel.positionId
    : travel?.positionId || "";
  const placement = placementId ? window.ProjectWMapView.getPlacement(placementId) : null;
  const conditions = account ? getCurrentRoadConditions(placementId) : null;
  window.ProjectWAudio.setState({
    active: titleActive || loadingActive || !gameScreen.hidden,
    region: conditions?.region || placement?.region || "중부",
    mode: loadingActive ? "loading" : titleActive ? "title" : travel?.mode || "road",
    settlementCategory: !titleActive && !loadingActive && travel?.mode === "settlement" ? placement?.category || "" : "",
    moving: !titleActive && !loadingActive && Boolean(travel?.moving) && !isTravelClockPaused(),
    weather: account ? currentWeatherLabel() : "맑음"
  });
}

function applyOutdoorSceneContext() {
  campSetupOpen = false;
  gameScreen.classList.remove("is-at-settlement");
  roadScene.classList.remove("is-camp-active", "is-camp-setup-open", "is-settlement-active");
  campSetup.hidden = true;
  if (campCardPanel) campCardPanel.hidden = true;
  settlementFacilities.hidden = true;
  if (settlementMealStatus) settlementMealStatus.hidden = true;
  if (settlementDailyStatus) settlementDailyStatus.hidden = true;
  if (settlementTutorialPrompts) settlementTutorialPrompts.hidden = true;
  hideSettlementExitTooltip();
  window.ProjectWTrade.close();
  window.ProjectWMeal.close();
  window.ProjectWInn.close();
  closeServiceModal();
  const conditions = getCurrentRoadConditions();
  const roadAssetId = roadSceneAssetForConditions(conditions);
  const terrainName = conditions.terrains.includes("숲길") ? "숲길" : "길";
  const surfaceName = conditions.roadSurfaces.includes("눈덮힌 길") ? "눈덮힌" : "일반";
  setSceneBackground(roadBackground, roadAssetId, `${conditions.region} ${terrainName} ${surfaceName} 정면 풍경`);
  setSceneBackground(partnerBackground, OUTDOOR_SCENE_ASSETS.partner, "마부석의 파트너 방향 풍경");
  setSceneBackground(mapBackground, OUTDOOR_SCENE_ASSETS.map, "여행 지도");
  roadScene.setAttribute("aria-label", "정면뷰");
}

function roadSceneAssetForConditions(conditions = getCurrentRoadConditions()) {
  const variants = ROAD_SCENE_ASSET_VARIANTS[conditions.region] || ROAD_SCENE_ASSET_VARIANTS["중부"];
  const forest = conditions.terrains.includes("숲길");
  const snowCovered = conditions.roadSurfaces.includes("눈덮힌 길");
  if (snowCovered) {
    const snowAssetId = forest ? variants.snowForest : variants.snowRoad;
    if (snowAssetId) return snowAssetId;
  }
  return forest ? variants.forest : variants.road;
}

function applySettlementSceneContext(travel) {
  campSetupOpen = false;
  gameScreen.classList.add("is-at-settlement");
  roadScene.classList.remove("is-camp-active", "is-camp-setup-open");
  roadScene.classList.add("is-settlement-active");
  campSetup.hidden = true;
  if (campCardPanel) campCardPanel.hidden = true;
  const placement = window.ProjectWMapView.getPlacement(travel.settlementId || travel.positionId);
  const assetId = travel.settlementAssetId || SETTLEMENT_ASSETS[placement?.category] || "Asset_A_06";
  const name = travel.settlementName || placement?.name || "거점";
  setSceneBackground(roadBackground, assetId, `${name} 거점 풍경`);
  setSceneBackground(partnerBackground, assetId, `${name} 거점의 파트너뷰 배경`);
  setSceneBackground(mapBackground, assetId, `${name} 거점의 지도뷰 배경`);
  roadScene.setAttribute("aria-label", `${name} 거점뷰`);
  renderSettlementFacilities(placement, name);
}

function renderSettlementFacilities(placement, fallbackName = "거점") {
  const category = placement?.category || "";
  const facilities = settlementFacilitiesFor(placement);
  renderSettlementDailyStatus(placement, facilities);
  renderSettlementTutorialPrompts(placement);
  settlementFacilitiesTitle.textContent = placement?.name || fallbackName;
  settlementFacilitiesCategory.textContent = category ? `${category} 시설` : "거점 시설";
  if (!facilities.length) {
    settlementFacilityList.replaceChildren();
    settlementFacilities.hidden = true;
    return;
  }

  const createFacilityButton = facility => {
    const button = document.createElement("button");
    button.type = "button";
    const mealFacility = facility.type === "주점";
    const serviceFacility = ["주점", "여관", "상업조합"].includes(facility.type);
    const repairing = facility.type === "여관"
      && placement.id === START_DESTINATION_ID
      && !normalizeTutorialProgress(account?.tutorialProgress).reachedHirenbach;
    const guildLocked = facility.type === "상업조합" && !isFeatureUnlocked("guildAccess");
    const open = isFacilityOpen(facility.type) && !repairing && !guildLocked;
    button.className = facility.trade
      ? "is-trade-facility"
      : serviceFacility
        ? "is-service-facility"
        : "is-pending-facility";
    button.dataset.facilityId = facility.id;
    button.dataset.facilityLabel = facility.label;
    button.dataset.facilityType = facility.type;
    button.dataset.facilityTrade = String(facility.trade);
    if (facility.companyName) button.dataset.companyName = facility.companyName;
    if (facility.assetId) button.dataset.assetId = facility.assetId;
    const name = document.createElement("strong");
    name.textContent = facility.label;
    const description = document.createElement("span");
    description.textContent = guildLocked
      ? "자격 부족"
      : repairing
      ? "수리중"
      : !open
      ? `${currentTimePhase()} · 영업 종료`
      : facility.type === "환전상"
      ? "화폐 교환"
      : mealFacility
        ? "식사 주문"
      : facility.type === "여관"
        ? "정비 숙박"
      : facility.type === "상업조합"
        ? "정보 수집"
      : facility.trade
        ? "구입 · 판매"
        : "준비 중";
    button.disabled = !open;
    button.classList.toggle("is-closed-facility", !open);
    if (guildLocked) button.title = "자격 부족 · 메인 퀘스트 진행 후 이용할 수 있습니다.";
    if (facility.assetId && (assetMap.get(facility.assetId) ?? "")) {
      const icon = document.createElement("img");
      const copy = document.createElement("div");
      const source = assetMap.get(facility.assetId) ?? "";
      button.classList.add("is-company-facility");
      icon.className = "settlement-company-icon";
      icon.alt = `${facility.label} 문장`;
      icon.src = source;
      copy.className = "settlement-facility-copy";
      copy.append(name, description);
      button.append(icon, copy);
    } else {
      button.append(name, description);
    }
    return button;
  };
  const groups = [
    { label: "거래 시설", className: "is-trade-group", facilities: facilities.filter(facility => facility.trade) },
    { label: "생활 시설", className: "is-service-group", facilities: facilities.filter(facility => !facility.trade) }
  ].filter(group => group.facilities.length);
  settlementFacilityList.replaceChildren(...groups.map(group => {
    const section = document.createElement("section");
    section.className = `settlement-facility-group ${group.className}`;
    const heading = document.createElement("h3");
    heading.textContent = group.label;
    const buttons = document.createElement("div");
    buttons.className = "settlement-facility-buttons";
    buttons.append(...group.facilities.map(createFacilityButton));
    section.append(heading, buttons);
    return section;
  }));
  window.ProjectWCityEvents.mountButton(settlementFacilityList, placement);
  settlementFacilities.hidden = false;
}

function settlementFacilitiesFor(placement) {
  const category = placement?.category || "";
  const baseFacilities = (SETTLEMENT_FACILITIES[category] || []).filter(facility => facility.type !== "상회");
  const companyLimit = category === "대도시" ? 2 : category === "도시" ? 1 : 0;
  const companyFacilities = (placement?.companyNames || [])
    .slice(0, companyLimit)
    .map(companyName => ({
      id: `company:${companyName}`,
      label: companyName,
      companyName,
      assetId: COMPANY_ASSET_IDS.get(companyName) || "",
      type: "상회",
      trade: true
    }));
  return [...companyFacilities, ...baseFacilities];
}

function renderSettlementDailyStatus(placement, facilities = settlementFacilitiesFor(placement)) {
  if (!account || !placement) return;
  account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
  const meal = document.createElement("span");
  meal.className = `settlement-daily-chip ${account.foodUsage.mealUsed ? "is-exhausted" : "is-available"}`;
  const mealLabel = document.createElement("small");
  const mealValue = document.createElement("strong");
  mealLabel.textContent = "오늘 식사";
  mealValue.textContent = account.foodUsage.mealUsed ? "완료" : "가능";
  meal.append(mealLabel, mealValue);
  if (settlementMealStatus) {
    settlementMealStatus.replaceChildren(meal);
    settlementMealStatus.hidden = false;
  }

  const informationTypes = [...new Set(facilities.map(facility => facility.type)
    .filter(type => INFORMATION_LIMITS.has(type)))];
  const information = informationTypes.map(type => {
    const opportunity = informationOpportunity(type, placement);
    const chip = document.createElement("span");
    chip.className = `settlement-daily-chip is-information ${opportunity.remaining <= 0 ? "is-exhausted" : "is-available"}`;
    const label = document.createElement("small");
    const value = document.createElement("strong");
    label.textContent = `${type} 정보`;
    value.textContent = opportunity.locked ? "잠김" : `${opportunity.remaining}/${opportunity.maximum}회`;
    chip.append(label, value);
    return chip;
  });
  if (settlementDailyStatus) {
    settlementDailyStatus.replaceChildren(...information);
    settlementDailyStatus.hidden = information.length === 0;
  }
}

function renderSettlementTutorialPrompts(placement) {
  if (!settlementTutorialPrompts || !settlementCommerceGuide || !settlementNewsGuide || !account) return;
  const eligible = ["도시", "대도시"].includes(String(placement?.category || ""));
  if (!eligible) {
    settlementTutorialPrompts.hidden = true;
    return;
  }
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  const commerceCompleted = progress.completed.includes(TUTORIAL_IDS.CITY_COMMERCE);
  const newsCompleted = progress.completed.includes(TUTORIAL_IDS.CITY_NEWS);
  const eventCount = window.ProjectWCityEvents.getSettlementEvents(placement).length;
  settlementCommerceGuide.hidden = commerceCompleted;
  settlementCommerceGuide.disabled = Boolean(progress.activeId && progress.activeId !== TUTORIAL_IDS.CITY_COMMERCE);
  settlementNewsGuide.hidden = newsCompleted;
  settlementNewsGuide.disabled = eventCount < 1 || Boolean(progress.activeId && progress.activeId !== TUTORIAL_IDS.CITY_NEWS);
  settlementNewsGuide.classList.toggle("has-news", eventCount > 0);
  const newsCopy = settlementNewsGuide.querySelector("span");
  if (newsCopy) newsCopy.textContent = eventCount > 0 ? `현재 소식 ${eventCount}건` : "현재 소식 없음";
  settlementTutorialPrompts.hidden = commerceCompleted && newsCompleted;
}

function showSettlementExitTooltip() {
  const travel = account?.travel;
  if (!settlementExitTooltip || !travel || travel.mode !== "settlement" || roadAction.disabled) return;
  const inventory = window.ProjectWCargo.getInventoryItems().filter(item => Number(item.quantity) > 0);
  const quantityByCategory = category => {
    const grouped = new Map();
    inventory.filter(item => item.definition?.category === category).forEach(item => {
      const key = item.itemId || item.definition?.displayName || "item";
      const stored = grouped.get(key) || { ...item, quantity: 0 };
      stored.quantity += Math.max(0, Number(item.quantity) || 0);
      grouped.set(key, stored);
    });
    return [...grouped.values()];
  };
  const feedTotal = HORSE_FEED_IDS.reduce((sum, itemId) => sum + window.ProjectWCargo.getItemQuantity(itemId), 0);
  const categories = [
    { label: "여행 물품", category: "여행 물품", danger: feedTotal <= 0, warning: "건초·말먹이 없음" },
    { label: "야영 물품", category: "야영 물품", danger: quantityByCategory("야영 물품").length === 0, warning: "보유 물품 없음" },
    { label: "야영 식량", category: "여행 식량", danger: quantityByCategory("여행 식량").length === 0, warning: "보유 식량 없음" }
  ];
  const heading = document.createElement("header");
  const eyebrow = document.createElement("span");
  const title = document.createElement("strong");
  eyebrow.textContent = "나가기 전 확인";
  title.textContent = "여행 준비 물자";
  heading.append(eyebrow, title);
  const list = document.createElement("div");
  categories.forEach(entry => {
    const row = document.createElement("section");
    row.className = `settlement-exit-resource ${entry.danger ? "is-danger" : ""}`;
    const label = document.createElement("strong");
    const content = document.createElement("span");
    label.textContent = entry.label;
    const items = quantityByCategory(entry.category);
    content.textContent = items.length
      ? items.map(item => `${item.definition?.displayName || item.itemId} x${formatCompactNumber(item.quantity)}`).join(" · ")
      : "없음";
    row.append(label, content);
    if (entry.danger) {
      const warning = document.createElement("em");
      warning.textContent = entry.warning;
      row.append(warning);
    }
    list.append(row);
  });
  settlementExitTooltip.replaceChildren(heading, list);
  settlementExitTooltip.hidden = false;
  requestAnimationFrame(positionSettlementExitTooltip);
}

function positionSettlementExitTooltip() {
  if (!settlementExitTooltip || settlementExitTooltip.hidden) return;
  const anchor = roadAction.getBoundingClientRect();
  const rect = settlementExitTooltip.getBoundingClientRect();
  const margin = 12;
  const left = Math.min(window.innerWidth - rect.width - margin, Math.max(margin, anchor.right - rect.width));
  const top = Math.max(margin, anchor.top - rect.height - 12);
  settlementExitTooltip.style.left = `${Math.round(left)}px`;
  settlementExitTooltip.style.top = `${Math.round(top)}px`;
}

function hideSettlementExitTooltip() {
  if (settlementExitTooltip) settlementExitTooltip.hidden = true;
}

function handleCityNewsTutorialOpen() {
  if (!isTutorialActive(TUTORIAL_IDS.CITY_NEWS)) return;
  if (normalizeTutorialProgress(account.tutorialProgress).step === 0) setTutorialStep(1);
}

async function handleNahanaEventFacilityChange(detail = {}) {
  if (!account || !detail.open) return false;
  const facilityType = String(detail.facilityType || "");
  const placement = currentSettlementPlacement();
  if (!placement) return false;
  let state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId === "N_E_001" && state.stage === 2
    && placement.id === FIRST_TUTORIAL_DESTINATION_ID && facilityType === "주점") {
    return playFirstTavernEventOpeningDialogue();
  }
  if (state.activeId === "N_E_002" && state.stage === 3 && facilityType === "주점") {
    return resolveNahanaEventCondition(3);
  }
  if (state.activeId === "N_E_005" && state.stage === 2
    && facilityType === "시장" && placement.category === "도시") {
    state.context.settlementId = placement.id;
    account.nahanaEvents = state;
    persistAccount();
    return resolveNahanaEventCondition(2);
  }
  if (state.activeId === "N_E_006" && state.stage === 3
    && placement.id === state.context.settlementId && facilityType === "주점" && !state.context.tavernVisited) {
    return playNahanaEventHardcodedDialogue("N_E_006", 1, { 현재거점명: placement.name || "현재 거점" });
  }
  state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId === "N_E_006" && state.stage === 3
    && placement.id === state.context.settlementId && facilityType === "여관" && state.context.tavernVisited) {
    return playNahanaEventHardcodedDialogue("N_E_006", 2, { 현재거점명: placement.name || "현재 거점" });
  }
  if (state.activeId === "N_E_008" && state.stage === 3
    && placement.id === state.context.settlementId && facilityType === "시장") {
    return resolveNahanaEventCondition(3);
  }
  if (state.activeId === "N_E_009" && state.stage === 3
    && placement.id === state.context.settlementId && facilityType === "여관") {
    return resolveNahanaEventCondition(3);
  }
  return false;
}

function handleNahanaEventMealComplete(record = {}) {
  if (!account || record.vendor !== "주점" || record.kind !== "meal" || Number(record.fullness) < 100) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId !== "N_E_001" || state.stage !== 2
    || record.settlementId !== FIRST_TUTORIAL_DESTINATION_ID
    || !isNahanaEventDialogueCompleted("DL_E_001_2")) return false;
  state.stage = 3;
  state.attention = "progress";
  state.context.settlementId = record.settlementId;
  account.nahanaEvents = state;
  persistAccount();
  updatePartnerEventUi();
  return true;
}

function getNahanaEventMarketGift({ settlementId = "", facilityType = "" } = {}) {
  if (!account || facilityType !== "시장") return null;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId !== "N_E_005" || state.stage !== 3 || state.context.giftPurchased
    || state.context.settlementId !== String(settlementId || "")) return null;
  return {
    id: "EVENT_N_E_005_GIFT",
    name: "깃털 자수 손수건",
    value: 40,
    description: "돌아오길 바라는 마음을 담아 깃털 자수를 놓은 깨끗한 손수건입니다."
  };
}

async function completeNahanaEventMarketGiftPurchase({ settlementId = "", facilityType = "" } = {}) {
  const gift = getNahanaEventMarketGift({ settlementId, facilityType });
  if (!gift) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  state.context.giftPurchased = true;
  account.nahanaEvents = state;
  persistAccount();
  window.ProjectWTrade?.refresh?.();
  return resolveNahanaEventCondition(3);
}

function handleSettlementFacilityClick(event) {
  const button = event.target.closest("button[data-facility-id]");
  if (!button || !settlementFacilityList.contains(button)) return;
  const travel = ensureTravelState();
  const placement = window.ProjectWMapView.getPlacement(travel?.settlementId || travel?.positionId);
  if (!travel || travel.mode !== "settlement" || !placement) {
    showGameNotice("현재 거점 정보를 확인할 수 없습니다.");
    return;
  }
  const facilityType = button.dataset.facilityType || "";
  if (facilityType === "상업조합" && !isFeatureUnlocked("guildAccess")) {
    showGameNotice("상업조합을 이용할 자격이 부족합니다. 메인 퀘스트를 진행하면 해금됩니다.");
    return;
  }
  if (!isFacilityOpen(facilityType)) {
    showGameNotice(`${button.dataset.facilityLabel}은(는) ${currentTimePhase()}에 영업하지 않습니다.`);
    return;
  }
  if (facilityType === "여관") {
    closeServiceModal();
    window.ProjectWInn.open({ settlement: placement });
    return;
  }
  if (["주점", "상업조합"].includes(facilityType)) {
    openServiceModal(placement, facilityType, button.dataset.facilityLabel || facilityType);
    return;
  }
  if (button.dataset.facilityTrade !== "true") {
    showGameNotice(`${button.dataset.facilityLabel} 기능은 추후 추가됩니다.`);
    return;
  }
  window.ProjectWTrade.open({
    settlement: placement,
    facilityId: button.dataset.facilityId,
    facilityLabel: button.dataset.facilityLabel,
    facilityType: button.dataset.facilityType,
    companyName: button.dataset.companyName || "",
    companyAssetId: button.dataset.assetId || ""
  });
}

function isFacilityOpen(type) {
  if (type === "여관") return true;
  return BUSINESS_OPEN_PHASES.has(currentTimePhase());
}

function currentSettlementPlacement() {
  const travel = ensureTravelState();
  if (!travel || travel.mode !== "settlement") return null;
  return window.ProjectWMapView.getPlacement(travel.settlementId || travel.positionId);
}

function openServiceModal(placement, type, label = type, options = {}) {
  if (!serviceModal || !serviceWindow) return;
  const resumeTavernVisit = Boolean(options.resumeTavernVisit);
  closeServiceModal(false, resumeTavernVisit);
  activeServiceContext = { placement, type, label };
  serviceContributionOffer.clear();
  serviceBillNoteSelection.clear();
  serviceBillNoteMode = "issue";
  setServiceView("home");
  setSceneBackground(serviceSceneBackground, SERVICE_SCENE_ASSETS.get(type) || "Asset_A_11", `${label} 내부 풍경`);
  serviceModal.hidden = false;
  serviceWindow.classList.toggle("is-guild", type === "상업조합");
  serviceWindow.classList.toggle("is-tavern", type === "주점");
  syncTavernStoryDialogueLockUi();
  serviceLocation.textContent = `${placement?.name || "거점"} · ${type}`;
  serviceTitle.textContent = label;
  serviceDescription.textContent = type === "주점"
    ? "식사를 주문하거나 사람들의 이야기를 들으며 시간을 보낼 수 있습니다."
    : "상업조합에서 할 행동을 선택하세요.";
  serviceMealOrder.hidden = type !== "주점";
  account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
  const mealUsed = type === "주점" && account.foodUsage.mealUsed;
  serviceMealOrder.disabled = mealUsed;
  serviceMealOrder.classList.toggle("is-limit-exhausted", mealUsed);
  serviceMealOrder.title = mealUsed ? "오늘은 이미 식사를 했습니다." : "주점의 식사 메뉴를 엽니다.";
  serviceContributionOpen.hidden = type !== "상업조합";
  serviceBillNoteOpen.hidden = type !== "상업조합" || !["도시", "대도시"].includes(String(placement?.category || ""));
  serviceGuildProfile.hidden = type !== "상업조합";
  const mealActionDescription = serviceMealOrder.querySelector("span");
  if (mealActionDescription) mealActionDescription.textContent = "주점의 음식과 음료를 주문합니다.";
  serviceInfoCollect.hidden = !INFORMATION_LIMITS.has(type);
  updateInformationButton(serviceInfoCollect, type, placement);
  if (type === "상업조합") {
    renderServiceGuildProfile();
    updateGuildContributionAvailabilityUi();
  }
  if (type !== "주점") cancelTavernVisit();
  window.dispatchEvent(new CustomEvent("projectw:facilitychange", { detail: { open: true, facilityType: type } }));
  refreshAdvancedTutorialLaunchers();
}

function closeServiceModal(emitEvent = true, preserveTavernVisit = false) {
  if (!serviceModal || serviceModal.hidden) return;
  const type = activeServiceContext?.type || "";
  if (tavernStoryDialogueLock && type === "주점") {
    showGameNotice("나하나와의 대화가 끝난 뒤 주점에서 나갈 수 있습니다.");
    return false;
  }
  if (type === "주점") cancelTavernVisit(preserveTavernVisit);
  serviceModal.hidden = true;
  serviceContributionOffer.clear();
  serviceBillNoteSelection.clear();
  setServiceView("home");
  activeServiceContext = null;
  if (emitEvent) window.dispatchEvent(new CustomEvent("projectw:facilitychange", { detail: { open: false, facilityType: type } }));
  if (type === "주점") handleTutorialTavernExit();
  refreshAdvancedTutorialLaunchers();
  return true;
}

function setTavernStoryDialogueLock(locked) {
  tavernStoryDialogueLock = Boolean(locked);
  syncTavernStoryDialogueLockUi();
}

function syncTavernStoryDialogueLockUi() {
  const applies = tavernStoryDialogueLock && (!activeServiceContext || activeServiceContext.type === "주점");
  serviceModal?.classList.toggle("is-tavern-story-locked", applies);
  if (serviceClose) {
    serviceClose.disabled = applies;
    serviceClose.title = applies ? "나하나와의 대화가 끝난 뒤 나갈 수 있습니다." : "";
  }
}

function setServiceView(view) {
  activeServiceView = ["contribution", "bill-note"].includes(view) ? view : "home";
  const contributionOpen = activeServiceView === "contribution";
  const billNoteOpen = activeServiceView === "bill-note";
  if (serviceContent) serviceContent.hidden = contributionOpen || billNoteOpen;
  if (serviceContributionView) serviceContributionView.hidden = !contributionOpen;
  if (serviceBillNoteView) serviceBillNoteView.hidden = !billNoteOpen;
  serviceWindow?.classList.toggle("is-contribution-view", contributionOpen);
  serviceWindow?.classList.toggle("is-bill-note-view", billNoteOpen);
  if (contributionOpen) renderGuildContribution();
  if (billNoteOpen) renderBillNoteService();
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
}

function renderServiceGuildProfile() {
  if (!serviceGuildProfile) return;
  const profile = guildContributionProfile();
  serviceGuildLevel.textContent = `${profile.level}단계`;
  serviceGuildXp.textContent = profile.nextThreshold == null
    ? `${formatCompactNumber(profile.xp)} · 최고 단계`
    : `${formatCompactNumber(profile.levelXp)} / ${formatCompactNumber(profile.nextThreshold)}`;
  serviceGuildProgressFill.style.width = `${Math.round(profile.progress * 100)}%`;
  serviceGuildInformationLimit.textContent = `정보 수집 최대 ${profile.maxInformationAttempts}회 / 3일`;
}

function guildContributionAvailability(placement = activeServiceContext?.placement || currentSettlementPlacement()) {
  const contribution = normalizeGuildContribution(account?.guildContribution);
  const settlementId = String(placement?.id || "").trim();
  const settlementName = String(placement?.name || "현재 거점").trim() || "현재 거점";
  const day = normalizeWorldTime(account?.worldTime).day;
  return {
    settlementId,
    settlementName,
    day,
    completed: Boolean(settlementId) && contribution.lastContributionDayBySettlement[settlementId] === day
  };
}

function activeNahanaEventContributionRequirement() {
  const state = normalizeNahanaEventState(account?.nahanaEvents);
  return state.activeId === "N_E_004" && state.stage === 3 ? 300 : 0;
}

function updateGuildContributionAvailabilityUi() {
  if (!serviceContributionOpen) return;
  const availability = guildContributionAvailability();
  const featureLocked = !isFeatureUnlocked("guildContribution");
  const copy = serviceContributionOpen.querySelector("span");
  serviceContributionOpen.disabled = availability.completed || featureLocked;
  serviceContributionOpen.classList.toggle("is-limit-exhausted", availability.completed || featureLocked);
  if (copy) copy.textContent = featureLocked
    ? "이벤트를 통해 기능을 해금할 수 있습니다."
    : availability.completed
    ? `${availability.settlementName} · 오늘 공헌 완료`
    : `${availability.settlementName} · 오늘 1회 공헌 가능`;
  serviceContributionOpen.title = featureLocked
    ? "아직 상업조합 공헌 기능이 해금되지 않았습니다."
    : availability.completed
    ? `${availability.settlementName}에서는 오늘 이미 공헌했습니다.`
    : `${availability.settlementName}에서 오늘 한 번 공헌할 수 있습니다.`;
}

function openGuildContribution() {
  if (activeServiceContext?.type !== "상업조합") return;
  if (!isFeatureUnlocked("guildContribution")) {
    showGameNotice("아직 상업조합 공헌 기능이 해금되지 않았습니다.");
    return;
  }
  const availability = guildContributionAvailability();
  if (availability.completed) {
    showGameNotice(`${availability.settlementName}에서는 오늘 이미 공헌했습니다.`);
    updateGuildContributionAvailabilityUi();
    return;
  }
  serviceContributionOffer.clear();
  setServiceView("contribution");
  if (isTutorialActive(TUTORIAL_IDS.GUILD_CONTRIBUTION)
    && normalizeTutorialProgress(account.tutorialProgress).step === 5) {
    setTutorialStep(6);
  }
}

function guildContributionCurrencies() {
  return window.ProjectWWallet.getCurrencies().map((currency, index) => ({
    ...currency,
    assetId: `Asset_Coin_${index + 1}`,
    value: Math.max(0, Number(window.ProjectWWallet.getCurrencyValue(currency)) || 0),
    quantity: walletCurrencyQuantity(currency.id)
  }));
}

function walletCurrencyQuantity(currencyId) {
  const stored = account?.wallet?.[currencyId];
  const quantity = typeof stored === "object" && stored !== null ? stored.quantity : stored;
  return Math.max(0, Math.floor(Number(quantity) || 0));
}

function guildContributionTotal() {
  const currencyById = new Map(guildContributionCurrencies().map(currency => [currency.id, currency]));
  let total = 0;
  serviceContributionOffer.forEach((quantity, currencyId) => {
    total += (currencyById.get(currencyId)?.value || 0) * quantity;
  });
  return Math.max(0, Math.round(total));
}

function renderGuildContribution() {
  if (!serviceContributionCurrencies || !serviceContributionItems) return;
  const currencies = guildContributionCurrencies();
  const currencyById = new Map(currencies.map(currency => [currency.id, currency]));
  const walletFragment = document.createDocumentFragment();
  currencies.forEach(currency => {
    const offered = serviceContributionOffer.get(currency.id) || 0;
    const available = Math.max(0, currency.quantity - offered);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "service-contribution-currency";
    button.dataset.currencyId = currency.id;
    button.disabled = available <= 0;
    const image = document.createElement("img");
    const assetSource = assetMap.get(currency.assetId) || "";
    if (assetSource) image.src = assetSource;
    image.alt = "";
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    const detail = document.createElement("small");
    const count = document.createElement("b");
    name.textContent = currency.name;
    detail.textContent = `가치 ${formatCompactNumber(currency.value)}`;
    count.textContent = `× ${formatCompactNumber(available)}`;
    copy.append(name, detail);
    button.append(image, copy, count);
    walletFragment.append(button);
  });
  serviceContributionCurrencies.replaceChildren(walletFragment);

  const offeredFragment = document.createDocumentFragment();
  const offeredEntries = [...serviceContributionOffer.entries()].filter(([, quantity]) => quantity > 0);
  if (!offeredEntries.length) {
    const empty = document.createElement("p");
    empty.className = "service-contribution-empty";
    empty.textContent = "공헌할 화폐를 선택하세요.";
    offeredFragment.append(empty);
  } else {
    offeredEntries.forEach(([currencyId, quantity]) => {
      const currency = currencyById.get(currencyId);
      if (!currency) return;
      const row = document.createElement("div");
      row.className = "service-contribution-row";
      const image = document.createElement("img");
      const assetSource = assetMap.get(currency.assetId) || "";
      if (assetSource) image.src = assetSource;
      image.alt = "";
      const copy = document.createElement("span");
      const name = document.createElement("strong");
      const detail = document.createElement("small");
      name.textContent = currency.name;
      detail.textContent = `${formatCompactNumber(currency.value)} × ${quantity} = ${formatCompactNumber(currency.value * quantity)}`;
      copy.append(name, detail);
      const controls = document.createElement("span");
      controls.className = "service-contribution-row-controls";
      [
        { action: "remove", label: "−" },
        { action: "add", label: "+" }
      ].forEach(specification => {
        const control = document.createElement("button");
        control.type = "button";
        control.dataset.contributionAction = specification.action;
        control.dataset.currencyId = currencyId;
        control.textContent = specification.label;
        control.disabled = specification.action === "add" && quantity >= currency.quantity;
        controls.append(control);
      });
      row.append(image, copy, controls);
      offeredFragment.append(row);
    });
  }
  serviceContributionItems.replaceChildren(offeredFragment);
  const total = guildContributionTotal();
  const availability = guildContributionAvailability();
  serviceContributionTotal.textContent = formatCompactNumber(total);
  const eventRequirement = activeNahanaEventContributionRequirement();
  serviceContributionConfirm.disabled = total <= 0 || total < eventRequirement || availability.completed;
  serviceContributionConfirm.title = availability.completed
    ? `${availability.settlementName}에서는 오늘 이미 공헌했습니다.`
    : total < eventRequirement
      ? `이번 이벤트를 진행하려면 300 가치 이상 공헌해야 합니다. · 부족 ${formatCompactNumber(eventRequirement - total)}`
      : "";
}

function handleGuildContributionCurrencyClick(event) {
  const button = event.target.closest("[data-currency-id]");
  if (!button || button.disabled) return;
  const currencyId = button.dataset.currencyId;
  const quantity = serviceContributionOffer.get(currencyId) || 0;
  if (quantity >= walletCurrencyQuantity(currencyId)) return;
  serviceContributionOffer.set(currencyId, quantity + 1);
  window.ProjectWAudio?.playEffect("coin");
  renderGuildContribution();
}

function handleGuildContributionOfferClick(event) {
  const button = event.target.closest("[data-contribution-action][data-currency-id]");
  if (!button || button.disabled) return;
  const currencyId = button.dataset.currencyId;
  const quantity = serviceContributionOffer.get(currencyId) || 0;
  if (button.dataset.contributionAction === "add") {
    if (quantity < walletCurrencyQuantity(currencyId)) serviceContributionOffer.set(currencyId, quantity + 1);
  } else if (quantity <= 1) serviceContributionOffer.delete(currencyId);
  else serviceContributionOffer.set(currencyId, quantity - 1);
  window.ProjectWAudio?.playEffect("coin");
  renderGuildContribution();
}

function clearGuildContributionOffer() {
  if (!serviceContributionOffer.size) return;
  serviceContributionOffer.clear();
  window.ProjectWAudio?.playEffect("coin");
  renderGuildContribution();
}

function completeGuildContribution() {
  if (!account || activeServiceContext?.type !== "상업조합") return;
  if (!isFeatureUnlocked("guildContribution")) return;
  const availability = guildContributionAvailability();
  if (availability.completed) {
    serviceContributionOffer.clear();
    setServiceView("home");
    updateGuildContributionAvailabilityUi();
    showGameNotice(`${availability.settlementName}에서는 오늘 이미 공헌했습니다.`);
    return;
  }
  const total = guildContributionTotal();
  if (total <= 0) return;
  const eventRequirement = activeNahanaEventContributionRequirement();
  if (eventRequirement && total < eventRequirement) {
    showGameNotice(`이번 이벤트를 진행하려면 300 가치 이상 공헌해야 합니다. · 부족 ${formatCompactNumber(eventRequirement - total)}`);
    return;
  }
  for (const [currencyId, quantity] of serviceContributionOffer) {
    if (quantity > walletCurrencyQuantity(currencyId)) {
      showGameNotice("보유 화폐가 변경되었습니다. 공헌할 화폐를 다시 선택해 주세요.");
      renderGuildContribution();
      return;
    }
  }
  if (!account.wallet || typeof account.wallet !== "object") account.wallet = {};
  serviceContributionOffer.forEach((quantity, currencyId) => {
    account.wallet[currencyId] = Math.max(0, walletCurrencyQuantity(currencyId) - quantity);
  });
  account.guildContribution = normalizeGuildContribution(account.guildContribution);
  const earnedContribution = Math.floor(total * partnerGuildContributionMultiplier());
  account.guildContribution.xp += earnedContribution;
  account.guildContribution.lastContributionDayBySettlement[availability.settlementId] = availability.day;
  serviceContributionOffer.clear();
  persistAccount();
  window.ProjectWWallet.refresh();
  window.ProjectWMerchantPath.refresh();
  renderServiceGuildProfile();
  updateGuildContributionAvailabilityUi();
  updateInformationButton(serviceInfoCollect, "상업조합", activeServiceContext.placement);
  window.ProjectWAudio?.playCurrencyCompletion?.("trade");
  setServiceView("home");
  showGameNotice(`${formatCompactNumber(earnedContribution)}의 공헌도를 획득했습니다${earnedContribution > total ? ` · 가호 보너스 +${formatCompactNumber(earnedContribution - total)}` : ""}.`);
  if (isTutorialActive(TUTORIAL_IDS.GUILD_CONTRIBUTION)) {
    completeTutorial(TUTORIAL_IDS.GUILD_CONTRIBUTION);
  }
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (eventState.activeId === "N_E_004" && eventState.stage === 3) {
    void resolveNahanaEventCondition(3);
  }
}

async function openBillNoteService() {
  if (!account || activeServiceContext?.type !== "상업조합") return;
  const category = String(activeServiceContext.placement?.category || "");
  if (!["도시", "대도시"].includes(category)) {
    showGameNotice("어음증서는 도시와 대도시의 상업조합에서만 취급합니다.");
    return;
  }
  await window.ProjectWWallet.load();
  serviceBillNoteMode = "issue";
  serviceBillNoteSelection.clear();
  setServiceView("bill-note");
}

function switchBillNoteMode(mode) {
  if (!['issue', 'redeem'].includes(mode) || activeServiceContext?.type !== "상업조합") return;
  if (mode === "redeem" && String(activeServiceContext.placement?.category || "") !== "대도시") {
    showGameNotice("어음의 화폐 환전은 대도시 상업조합에서만 가능합니다.");
    return;
  }
  serviceBillNoteMode = mode;
  serviceBillNoteSelection.clear();
  renderBillNoteService();
}

function billNotePaymentPlan(faceValue = window.ProjectWBillNotes.selectionValue(serviceBillNoteSelection)) {
  const cost = window.ProjectWBillNotes.issueCost(faceValue);
  const region = String(activeServiceContext?.placement?.region || "중부");
  const currencies = window.ProjectWWallet.getCurrencies();
  const payment = window.ProjectWBillNotes.bestCurrencySelection(
    cost.total,
    currencies,
    account?.wallet || {},
    currency => window.ProjectWWallet.getCurrencyValue(currency, region)
  );
  return { cost, payment, region, currencies };
}

function renderBillNoteService() {
  if (!serviceBillNoteView || activeServiceContext?.type !== "상업조합") return;
  account.billNotes = window.ProjectWBillNotes.normalizeState(account.billNotes);
  const metropolis = String(activeServiceContext.placement?.category || "") === "대도시";
  serviceBillNoteTabs.forEach(button => {
    const mode = button.dataset.billNoteMode;
    const unavailable = mode === "redeem" && !metropolis;
    button.disabled = unavailable;
    button.title = unavailable ? "화폐 환전은 대도시 상업조합에서만 가능합니다." : "";
    const active = mode === serviceBillNoteMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const issue = serviceBillNoteMode === "issue";
  serviceBillNoteHeading.textContent = issue ? "발급할 어음을 선택하세요." : "환전할 어음을 선택하세요.";
  serviceBillNoteDescription.textContent = issue
    ? "액면가와 발급 수수료 3%를 현재 지역 가치의 화폐로 자동 납부합니다. 어음은 칸과 무게를 차지하지 않습니다."
    : "선택한 어음의 액면가에서 환전 수수료 3%를 제한 뒤 현재 지역의 화폐로 지급합니다.";
  const holdings = new Map(window.ProjectWBillNotes.entries(account.billNotes).map(entry => [entry.id, entry.quantity]));
  const rows = window.ProjectWBillNotes.DENOMINATIONS.map(denomination => {
    const id = String(denomination);
    const selected = serviceBillNoteSelection.get(id) || 0;
    const held = holdings.get(id) || 0;
    const row = document.createElement("article");
    row.className = "service-bill-note-row";
    const seal = document.createElement("span");
    seal.className = "service-bill-note-seal";
    seal.textContent = "어음";
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = `어음증서 · 액면가 ${formatCompactNumber(denomination)}`;
    const detail = document.createElement("small");
    detail.textContent = `보유 ${formatCompactNumber(held)}장 · 선택 ${formatCompactNumber(selected)}장`;
    copy.append(name, detail);
    const controls = document.createElement("span");
    controls.className = "service-bill-note-controls";
    [{ action: "remove", label: "−" }, { action: "add", label: "+" }].forEach(specification => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.billNoteAction = specification.action;
      button.dataset.denomination = id;
      button.textContent = specification.label;
      button.disabled = specification.action === "remove"
        ? selected <= 0
        : issue ? selected >= 99 : selected >= held;
      controls.append(button);
    });
    row.append(seal, copy, controls);
    return row;
  });
  serviceBillNoteDenominations.replaceChildren(...rows);

  const faceValue = window.ProjectWBillNotes.selectionValue(serviceBillNoteSelection);
  const calculation = issue ? window.ProjectWBillNotes.issueCost(faceValue) : window.ProjectWBillNotes.redemptionValue(faceValue);
  serviceBillNoteFaceValue.textContent = formatCompactNumber(calculation.faceValue);
  serviceBillNoteFee.textContent = formatCompactNumber(calculation.fee);
  serviceBillNoteTotalLabel.textContent = issue ? "자동 납부액" : "받을 화폐 가치";
  serviceBillNoteTotal.textContent = formatCompactNumber(calculation.total);
  serviceBillNoteConfirm.textContent = issue ? "어음 발급" : "화폐로 환전";
  if (faceValue <= 0) {
    serviceBillNotePaymentStatus.textContent = issue ? "발급할 어음을 선택하세요." : "환전할 어음을 선택하세요.";
    serviceBillNoteConfirm.disabled = true;
    return;
  }
  if (issue) {
    const { payment } = billNotePaymentPlan(faceValue);
    serviceBillNotePaymentStatus.textContent = payment.sufficient
      ? `화폐 ${formatCompactNumber(payment.paid)} 가치 자동 납부${payment.paid > calculation.total ? ` · 거스름돈 ${formatCompactNumber(payment.paid - calculation.total)}` : ""}`
      : `필요 ${formatCompactNumber(calculation.total)} · 보유 화폐 가치가 부족합니다.`;
    serviceBillNoteConfirm.disabled = !payment.sufficient;
  } else {
    serviceBillNotePaymentStatus.textContent = `액면가 ${formatCompactNumber(faceValue)}에서 수수료를 제한 금액을 지급합니다.`;
    serviceBillNoteConfirm.disabled = false;
  }
}

function handleBillNoteSelectionClick(event) {
  const button = event.target.closest("[data-bill-note-action][data-denomination]");
  if (!button || button.disabled) return;
  const id = button.dataset.denomination;
  const previous = serviceBillNoteSelection.get(id) || 0;
  const maximum = serviceBillNoteMode === "issue"
    ? 99
    : window.ProjectWBillNotes.entries(account?.billNotes).find(entry => entry.id === id)?.quantity || 0;
  const next = button.dataset.billNoteAction === "add"
    ? Math.min(maximum, previous + 1)
    : Math.max(0, previous - 1);
  if (next > 0) serviceBillNoteSelection.set(id, next);
  else serviceBillNoteSelection.delete(id);
  window.ProjectWAudio?.playEffect("paper");
  renderBillNoteService();
}

function completeBillNoteService() {
  if (!account || activeServiceContext?.type !== "상업조합") return;
  const faceValue = window.ProjectWBillNotes.selectionValue(serviceBillNoteSelection);
  if (faceValue <= 0) return;
  const region = String(activeServiceContext.placement?.region || "중부");
  const currencies = window.ProjectWWallet.getCurrencies();
  if (serviceBillNoteMode === "issue") {
    const { cost, payment } = billNotePaymentPlan(faceValue);
    if (!payment.sufficient) {
      showGameNotice("어음을 발급할 화폐가 부족합니다.");
      renderBillNoteService();
      return;
    }
    let wallet = window.ProjectWBillNotes.deductCurrency(account.wallet, payment.selection);
    const change = Math.max(0, payment.paid - cost.total);
    if (change > 0) wallet = window.ProjectWBillNotes.grantCurrencyValue(
      wallet,
      change,
      currencies,
      region,
      currency => window.ProjectWWallet.getCurrencyValue(currency, region)
    ).wallet;
    account.wallet = wallet;
    const placement = activeServiceContext.placement || {};
    const date = contractCalendarDate(normalizeWorldTime(account.worldTime).day);
    account.billNotes = window.ProjectWBillNotes.addSelection(account.billNotes, serviceBillNoteSelection, 1, {
      organization: "롬 상업조합",
      branch: `${placement.name || "소재지 미상"} 지부`,
      issuedDay: normalizeWorldTime(account.worldTime).day,
      issuedDate: `${date.year}년 ${date.month}월 ${date.day}일`,
      managerName: window.ProjectWBillNotes.managerNameFor(`${placement.name || "소재지 미상"} 지부`)
    });
    serviceBillNoteSelection.clear();
    persistAccount();
    window.ProjectWWallet.refresh();
    window.ProjectWAudio?.playCurrencyCompletion?.("trade");
    showGameNotice(`${formatCompactNumber(faceValue)} 가치의 어음을 발급받았습니다 · 수수료 ${formatCompactNumber(cost.fee)}`);
    renderBillNoteService();
    return;
  }
  if (String(activeServiceContext.placement?.category || "") !== "대도시") return;
  const holdings = new Map(window.ProjectWBillNotes.entries(account.billNotes).map(entry => [entry.id, entry.quantity]));
  if ([...serviceBillNoteSelection].some(([id, quantity]) => quantity > (holdings.get(id) || 0))) {
    showGameNotice("보유 어음이 변경되었습니다. 환전할 어음을 다시 선택해 주세요.");
    serviceBillNoteSelection.clear();
    renderBillNoteService();
    return;
  }
  const redemption = window.ProjectWBillNotes.redemptionValue(faceValue);
  account.billNotes = window.ProjectWBillNotes.addSelection(account.billNotes, serviceBillNoteSelection, -1);
  account.wallet = window.ProjectWBillNotes.grantCurrencyValue(
    account.wallet,
    redemption.total,
    currencies,
    region,
    currency => window.ProjectWWallet.getCurrencyValue(currency, region)
  ).wallet;
  serviceBillNoteSelection.clear();
  persistAccount();
  window.ProjectWWallet.refresh();
  window.ProjectWAudio?.playCurrencyCompletion?.("trade");
  showGameNotice(`${formatCompactNumber(redemption.total)} 가치의 화폐를 받았습니다 · 수수료 ${formatCompactNumber(redemption.fee)}`);
  renderBillNoteService();
}

function informationUsageKey(placement, type, qualifier = "") {
  const suffix = String(qualifier || "").trim();
  return `${placement?.id || placement?.name || "unknown"}:${type}${suffix ? `:${suffix}` : ""}`;
}

function informationOpportunity(type, placement = currentSettlementPlacement(), options = {}) {
  if (!isFeatureUnlocked("information")) {
    return { maximum: 0, used: 0, remaining: 0, resetInDays: 3, locked: true, lockReason: "아직 정보 수집 기능이 해금되지 않았습니다." };
  }
  const companyName = String(options.companyName || "").trim();
  const companyProfile = type === "상회" ? window.ProjectWMerchantPath.getCompanyProfile?.(companyName) : null;
  let maximum = type === "상회"
    ? Math.max(0, Number(companyProfile?.informationBonus) || 0)
    : type === "상업조합"
      ? guildContributionProfile().maxInformationAttempts
      : INFORMATION_LIMITS.get(type) || 0;
  if (type === "상회" && maximum <= 0) {
    return {
      maximum: 0,
      used: 0,
      remaining: 0,
      resetInDays: 3,
      locked: true,
      lockReason: `상회 이용점수 ${formatCompactNumber(companyProfile?.score || 0)} / 1,500 · 단골 고객부터 이용할 수 있습니다.`,
      companyScore: Math.max(0, Number(companyProfile?.score) || 0)
    };
  }
  if (type === "여관" && activePartnerBuff("N_Buff_022")) maximum += 1;
  maximum += Number(window.ProjectWMerchantPath.getInformationBonuses()?.attempts?.[type]) || 0;
  maximum += Number(window.ProjectWCityEvents.getModifiers(placement).information[type]) || 0;
  if (!account || !maximum || !placement) return { maximum, used: 0, remaining: 0, resetInDays: 3 };
  account.informationUsage = normalizeInformationUsage(account.informationUsage, account.worldTime);
  const used = Math.min(maximum, account.informationUsage.facilities[informationUsageKey(placement, type, companyName)] || 0);
  const day = normalizeWorldTime(account.worldTime).day;
  const cycle = Math.floor((day - 1) / 3);
  const resetInDays = ((cycle + 1) * 3) + 1 - day;
  return { maximum, used, remaining: Math.max(0, maximum - used), resetInDays };
}

function updateInformationButton(button, type, placement = currentSettlementPlacement(), options = {}) {
  if (!button) return;
  const opportunity = informationOpportunity(type, placement, options);
  const copy = button.querySelector("span");
  const timeCost = ["상업조합", "상회"].includes(type) ? "타임 소모 없음" : "1타임";
  button.dataset.informationAttemptCount = String(opportunity.remaining);
  if (copy) copy.textContent = opportunity.locked
    ? type === "상회" && opportunity.companyScore !== undefined
      ? `이용점수 ${formatCompactNumber(opportunity.companyScore)} / 1,500`
      : "이벤트를 통해 기능을 해금할 수 있습니다."
    : `${timeCost} · 남은 ${opportunity.remaining}회 모두 시도 · ${opportunity.resetInDays}일 후 초기화`;
  button.disabled = opportunity.remaining <= 0;
  button.classList.toggle("is-limit-exhausted", opportunity.remaining <= 0);
  const blockedReason = opportunity.locked
    ? opportunity.lockReason || "아직 정보 수집 기능이 해금되지 않았습니다."
    : opportunity.remaining <= 0 ? "이번 3일 주기의 정보 수집 기회를 모두 사용했습니다." : "";
  const currentPhaseIndex = normalizeWorldTime(account?.worldTime).phaseIndex;
  const nextPhase = TIME_PHASES[(currentPhaseIndex + 1) % TIME_PHASES.length];
  button.dataset.informationTimeTransition = ["상업조합", "상회"].includes(type)
    ? "변화 없음"
    : `${TIME_PHASES[currentPhaseIndex]} → ${nextPhase}`;
  window.ProjectWInformation.updateCollectionTooltip(button, type, blockedReason);
}

let facilityInformationPending = false;

async function collectFacilityInformation(type, requestedPlacement = null, options = {}) {
  if (facilityInformationPending) return false;
  if (!isFeatureUnlocked("information")) {
    showGameNotice("아직 정보 수집 기능이 해금되지 않았습니다.");
    return false;
  }
  if (type === "여관" && currentTimePhase() === "밤") {
    showGameNotice("밤에는 여관에서 정보를 수집할 수 없습니다.");
    window.ProjectWInn.refresh();
    return false;
  }
  const placement = requestedPlacement || activeServiceContext?.placement || currentSettlementPlacement();
  const opportunity = informationOpportunity(type, placement, options);
  if (opportunity.locked) {
    showGameNotice(opportunity.lockReason || "아직 이 시설에서 정보를 수집할 수 없습니다.");
    return false;
  }
  if (!placement || opportunity.maximum <= 0) return false;
  if (opportunity.remaining <= 0) {
    showGameNotice("이번 3일 주기의 정보 수집 기회를 모두 사용했습니다.");
    return false;
  }
  facilityInformationPending = true;
  try {
    const attemptsToUse = opportunity.remaining;
    const results = [];
    for (let attempt = 0; attempt < attemptsToUse; attempt += 1) {
      const result = await window.ProjectWInformation.collect({ facility: type, placement });
      results.push(result);
      if (!result?.attempted) break;
    }
    const attemptedResults = results.filter(result => result?.attempted);
    if (!attemptedResults.length) {
      const result = results[0];
      showGameNotice(`정보 획득 실패 · ${result?.message || "정보를 준비하지 못했습니다. 다시 시도해 주세요."}`);
      return false;
    }
    const acquiredResults = attemptedResults.filter(result => result.acquired);
    if (acquiredResults.length) addCompanionExperience(acquiredResults.length, `정보 수집 성공 ${acquiredResults.length}건`);
    const key = informationUsageKey(placement, type, options.companyName);
    account.informationUsage.facilities[key] = opportunity.used + attemptsToUse;
    const consumesTime = !["상업조합", "상회"].includes(type);
    if (consumesTime) {
      advanceGameTime();
    }
    account.informationUsage = normalizeInformationUsage(account.informationUsage, account.worldTime);
    persistAccount();
    if (consumesTime && currentTimePhase() === "밤" && type !== "여관") {
      window.ProjectWMeal.close();
      closeServiceModal();
    }
    syncTravelExperience();
    updateInformationButton(mealInfoCollect, "주점", placement);
    if (activeServiceContext) updateInformationButton(serviceInfoCollect, activeServiceContext.type, activeServiceContext.placement);
    if (activeServiceContext?.type === "상업조합") renderServiceGuildProfile();
    window.ProjectWInn.refresh();
    const failedCount = Math.max(0, attemptsToUse - acquiredResults.length);
    const resultSummary = acquiredResults.length
      ? `정보 수집 ${attemptsToUse}회 · 정보 ${acquiredResults.length}건 획득${failedCount ? ` · ${failedCount}회 실패` : ""}`
      : `정보 수집 ${attemptsToUse}회 · 획득한 정보 없음`;
    showGameNotice(`${resultSummary}${consumesTime ? ` · 1타임이 지나 ${currentTimePhase()}이 되었습니다.` : " · 타임은 흐르지 않습니다."}`);
    return true;
  } finally {
    facilityInformationPending = false;
  }
}

async function collectBrightEarInformation(placement) {
  if (!placement || placement.category !== "대도시" || !isFeatureUnlocked("information")) return false;
  const skills = new Set(window.ProjectWMerchantPath.getPeddlerProfile()?.skills || []);
  if (!skills.has("PED_035")) return false;
  const result = await window.ProjectWInformation.collect({ facility: "밝은 귀", placement });
  showGameNotice(result?.acquired
    ? `${result.message} · 시간과 정보 수집 기회는 소모되지 않았습니다.`
    : `정보 획득 실패 · 밝은 귀 · ${result?.message || "새로운 정보를 얻지 못했습니다."}`);
  return Boolean(result?.acquired);
}

async function openServiceMealOrder() {
  const previousContext = activeServiceContext;
  const placement = previousContext?.placement || currentSettlementPlacement();
  const vendor = previousContext?.type === "여관" ? "여관" : "주점";
  const label = previousContext?.label || vendor;
  if (!placement) return;
  if (vendor === "주점") {
    beginTavernVisit(placement);
    if (activeTavernVisit?.readyPromise) await activeTavernVisit.readyPromise;
  }
  closeServiceModal(true, true);
  const opened = await window.ProjectWMeal.open({
    settlement: placement,
    vendor,
    kind: "meal",
    tavernSpecial: vendor === "주점" ? activeTavernVisit?.special : null,
    backgroundAssetId: SERVICE_SCENE_ASSETS.get(vendor) || "",
    onReturn: () => openServiceModal(placement, vendor, label, { resumeTavernVisit: vendor === "주점" })
  });
  if (opened && vendor === "주점" && !isTutorialActive(5)) void replayTavernVisitDialogue();
  if (!opened && !window.ProjectWMeal.isOpen()) openServiceModal(placement, vendor, label, { resumeTavernVisit: vendor === "주점" });
}

function advanceUntilNextMorning() {
  if (!account) return;
  const startingDay = normalizeWorldTime(account.worldTime).day;
  do {
    advanceGameTime();
  } while (normalizeWorldTime(account.worldTime).day === startingDay || currentTimePhase() !== "아침");
}

async function performLodging() {
  if (!account) return false;
  const lodgingPlacement = currentSettlementPlacement();
  // 다음 날 식사 횟수가 초기화되기 전에, 잠드는 날의 식사 여부로 효과를 확정한다.
  const requestedMoodChange = lodgingMoodChange(lodgingPlacement);
  const hadMeal = normalizeFoodUsage(account.foodUsage, account.worldTime).mealUsed;
  let appliedMoodChange = 0;
  const tutorialLodging = isTutorialActive(6);
  if (tutorialLodging) hideTutorial();
  await playSituationTransition("Asset_SIT_03", async () => {
    removePartnerStatus("N_S_006");
    account.horse = normalizeHorseState(account.horse);
    account.horse.health = account.horse.maxHealth;
    account.horse.hunger = account.horse.maxHunger;
    appliedMoodChange = changePartnerMood(requestedMoodChange);
    advanceUntilNextMorning();
    addPartnerStatus("N_S_007", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
    addCompanionExperience(2);
    recoverSpiritAfterSleep();
    account.foodUsage = normalizeFoodUsage(account.foodUsage, account.worldTime);
    account.informationUsage = normalizeInformationUsage(account.informationUsage, account.worldTime);
    persistAccount();
    window.ProjectWInn.wake();
    syncTravelExperience();
    await waitForSceneVisuals([document.querySelector("#inn-scene-background")]);
  });
  const moodNotice = appliedMoodChange === 0 ? "변화 없음" : formatSigned(appliedMoodChange);
  showGameNotice(`숙박을 마쳤습니다. 말의 체력과 허기가 회복되고 다음 날 아침이 되었습니다 · ${hadMeal ? "식사 후 숙박" : "식사 없이 숙박"} · 나하나 기분 ${moodNotice}.`);
  if (tutorialLodging) {
    completeTutorial(6);
  }
  await handleNahanaEventLodgingComplete(lodgingPlacement);
  return true;
}

function lodgingMoodChange(settlement = currentSettlementPlacement()) {
  const hadMeal = normalizeFoodUsage(account?.foodUsage, account?.worldTime).mealUsed;
  if (!hadMeal) return LODGING_WITHOUT_MEAL_MOOD_PENALTY;
  const eventBonus = Number(window.ProjectWCityEvents.getModifiers(settlement).lodgingMoodBonus) || 0;
  return LODGING_MOOD_RECOVERY + eventBonus;
}

async function handleNahanaEventLodgingComplete(placement) {
  if (!account || !placement) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId === "N_E_001" && state.stage === 3
    && placement.id === FIRST_TUTORIAL_DESTINATION_ID) {
    return playNahanaEventHardcodedDialogue("N_E_001", 2, { 현재거점명: placement.name || "하이렌바흐" });
  }
  if (state.activeId === "N_E_006" && state.stage === 2) {
    state.context.settlementId = placement.id;
    state.context.tavernVisited = false;
    account.nahanaEvents = state;
    persistAccount();
    return resolveNahanaEventCondition(2);
  }
  if (state.activeId === "N_E_007" && state.stage === 3
    && placement.id === state.context.settlementId) {
    return resolveNahanaEventCondition(3);
  }
  if (state.activeId === "N_E_010" && state.stage === 3
    && placement.id === state.context.settlementId) {
    return resolveNahanaEventCondition(3);
  }
  return false;
}

function applyCampSceneContext() {
  gameScreen.classList.remove("is-at-settlement");
  roadScene.classList.remove("is-settlement-active");
  roadScene.classList.add("is-camp-active");
  roadScene.classList.toggle("is-camp-setup-open", campSetupOpen);
  settlementFacilities.hidden = true;
  if (settlementMealStatus) settlementMealStatus.hidden = true;
  if (settlementDailyStatus) settlementDailyStatus.hidden = true;
  if (settlementTutorialPrompts) settlementTutorialPrompts.hidden = true;
  window.ProjectWTrade.close();
  window.ProjectWMeal.close();
  window.ProjectWInn.close();
  closeServiceModal();
  campSetup.hidden = !campSetupOpen;
  if (campCardPanel) campCardPanel.hidden = campSetupOpen;
  ensureCampTalkCardSession();
  renderPartnerTalkCards();
  setSceneBackground(roadBackground, "Asset_A_05", "저녁 야영지 풍경");
  setSceneBackground(partnerBackground, "Asset_A_05", "야영지의 파트너뷰 배경");
  setSceneBackground(mapBackground, "Asset_A_05", "야영지의 지도뷰 배경");
  roadScene.setAttribute("aria-label", "야영뷰");
  if (campSetupOpen) renderCampSetup();
  if (!tutorialRuntime) window.setTimeout(schedulePendingNarrativePresentation, 0);
}

function setSceneBackground(image, assetId, alt) {
  if (!image) return;
  image.dataset.assetId = assetId;
  image.alt = alt;
  const source = assetMap.get(assetId) ?? assetFallbacks.get(assetId);
  if (source) image.src = source;
}

function nahanaEventDepartureLockMessage() {
  const state = normalizeNahanaEventState(account?.nahanaEvents);
  if (state.stage !== 3) return "";
  if (state.activeId === "N_E_002") return "주점에서 나하나와 정보 수집에 관한 대화를 마쳐야 거점을 떠날 수 있습니다.";
  if (state.activeId === "N_E_004") return "상업조합에 300 가치 이상 공헌해야 거점을 떠날 수 있습니다.";
  if (state.activeId === "N_E_005") return "시장에서 나하나를 위한 선물을 구입해야 거점을 떠날 수 있습니다.";
  if (state.activeId === "N_E_006") return "주점을 방문한 뒤 여관으로 돌아가야 거점을 떠날 수 있습니다.";
  if (state.activeId === "N_E_007") return "관문의 여관에서 숙박해야 거점을 떠날 수 있습니다.";
  if (state.activeId === "N_E_008") return "축제가 열린 시장을 방문해야 거점을 떠날 수 있습니다.";
  if (state.activeId === "N_E_009") return "이 도시의 여관을 방문해야 거점을 떠날 수 있습니다.";
  if (state.activeId === "N_E_010") return "마을 여관에서 숙박해야 거점을 떠날 수 있습니다.";
  return "";
}

function updateRoadControls() {
  const travel = account?.travel;
  if (roadPassThrough) roadPassThrough.hidden = true;
  if (roadTurnBack) roadTurnBack.hidden = true;
  if (travel?.mode !== "settlement") hideSettlementExitTooltip();
  if (!travel) {
    roadLocation.textContent = "여행 준비 중";
    roadStatus.textContent = "계정을 만든 뒤 여행을 시작할 수 있습니다.";
    setRoadAction("출발", "Space", true);
    return;
  }

  if (travel.mode === "settlement") {
    const locationName = travel.settlementName || getPlacementName(travel.positionId);
    const eventLockMessage = nahanaEventDepartureLockMessage();
    const canDepart = DEPARTURE_PHASES.has(currentTimePhase()) && !eventLockMessage;
    roadLocation.textContent = locationName;
    roadStatus.textContent = eventLockMessage
      ? eventLockMessage
      : canDepart
      ? `${locationName}에 머물고 있습니다.`
      : `${currentTimePhase()}에는 거점을 떠날 수 없습니다. 여관에서 다음 날을 준비하세요.`;
    setRoadAction("나가기", "", !canDepart);
    return;
  }

  if (travel.mode === "camp") {
    roadLocation.textContent = "야영지 · 저녁";
    roadStatus.textContent = "야영을 진행하거나 야영지에서 다른 행동을 준비할 수 있습니다.";
    setRoadAction("야영 진행", "Space", campInProgress);
    return;
  }

  const destinationName = getPlacementName(travel.destinationNodeId);
  if (travel.turningBack) {
    roadLocation.textContent = `${destinationName} 방면`;
    roadStatus.textContent = `짐마차를 돌리는 중 · ${turnBackSeconds(travel)}초`;
    setRoadAction("회차 중", "", true);
    if (roadTurnBack) {
      roadTurnBack.hidden = false;
      roadTurnBack.textContent = "회차 취소";
    }
    return;
  }
  if (travel.moving) {
    roadLocation.textContent = `${destinationName} 방면`;
    roadStatus.textContent = `이동 중 · 다음 지점까지 ${nextPointSeconds(travel)}초`;
    setRoadAction("이동 중", "", true);
    if (roadTurnBack) {
      roadTurnBack.hidden = false;
      roadTurnBack.textContent = "되돌아가기";
    }
    return;
  }

  if (isNodeId(travel.positionId) && !hasRemainingRoute(travel)) {
    const locationName = getPlacementName(travel.positionId);
    const placement = window.ProjectWMapView.getPlacement(travel.positionId);
    roadLocation.textContent = locationName;
    roadStatus.textContent = `${locationName}에 도착했습니다.`;
    setRoadAction("진입", "", false);
    if (roadPassThrough) {
      const tutorialBlocksPassThrough = travel.positionId === FIRST_TUTORIAL_DESTINATION_ID && shouldStartTutorial(4);
      const entryIsMandatory = placement?.category === "관문";
      const deadEndArrival = isDeadEndArrival(travel);
      roadPassThrough.hidden = entryIsMandatory || deadEndArrival || tutorialBlocksPassThrough || !["대도시", "도시", "마을"].includes(placement?.category);
    }
    return;
  }

  roadLocation.textContent = isNodeId(travel.positionId)
    ? `${getPlacementName(travel.positionId)} → ${destinationName}`
    : `${destinationName} 방면`;
  roadStatus.textContent = "짐마차가 멈춰 있습니다.";
  setRoadAction("출발", "Space", !hasRemainingRoute(travel));
}

function isDeadEndArrival(travel = ensureTravelState()) {
  if (!travel || !isNodeId(travel.positionId)) return false;
  const departureNodeId = String(travel.departureNodeId || travel.routePath?.[0] || "").trim();
  if (!departureNodeId || departureNodeId === travel.positionId) return false;
  const connectedRoutes = window.ProjectWMapView.getConnectedNodeRoutes?.(travel.positionId) || [];
  if (!connectedRoutes.length) return false;
  return !connectedRoutes.some(route => {
    const connectedNodeId = String(route?.node?.id || "").trim();
    return connectedNodeId && connectedNodeId !== departureNodeId;
  });
}

function setRoadAction(label, shortcut, disabled) {
  roadAction.disabled = disabled;
  if (disabled) hideSettlementExitTooltip();
  roadAction.replaceChildren(document.createTextNode(label));
  if (shortcut) {
    const hint = document.createElement("span");
    hint.textContent = shortcut;
    roadAction.append(hint);
  }
}

function handleRoadAction() {
  const travel = ensureTravelState();
  if (!travel || travel.moving || travel.turningBack) return;
  if (travel.mode === "settlement") {
    openExitDirectionDialog();
    return;
  }
  if (travel.mode === "camp") {
    openCampSetup();
    return;
  }
  if (hasRemainingRoute(travel)) {
    if (isTutorialActive(1) && normalizeTutorialProgress(account.tutorialProgress).step === 12) completeTutorial(1);
    if (isTutorialActive(3) && normalizeTutorialProgress(account.tutorialProgress).step === 5) completeTutorial(3);
    startTravel();
    return;
  }
  if (isNodeId(travel.positionId)) {
    enterSettlement();
    return;
  }
}

function handleRoadPassThrough() {
  const travel = ensureTravelState();
  if (!travel || travel.mode !== "road" || travel.moving || hasRemainingRoute(travel) || !isNodeId(travel.positionId)) return;
  const placement = window.ProjectWMapView.getPlacement(travel.positionId);
  if (placement?.category === "관문") {
    enterSettlement();
    return;
  }
  if (!["대도시", "도시", "마을"].includes(placement?.category)) return;
  if (isDeadEndArrival(travel)) {
    showGameNotice("되돌아가는 길밖에 없어 이 거점은 지나칠 수 없습니다.");
    return;
  }
  window.ProjectWRouteEvents.consumeDestinationTariffDiscount(placement.id);
  showGameNotice(`${placement.name || "거점"}에 진입하지 않고 다음 경로를 선택합니다.`);
  openExitDirectionDialog();
}

function turnBackSeconds(travel = account?.travel) {
  return Math.max(0, Math.ceil((Number(travel?.turnBackEndsAt) - Date.now()) / 1000));
}

function handleRoadTurnBack() {
  const travel = ensureTravelState();
  if (!travel || travel.mode !== "road") return;
  if (travel.turningBack) {
    cancelTurnBack(travel);
    return;
  }
  if (!travel.moving) return;
  reconcileTravelProgress(false);
  if (!account?.travel?.moving) return;
  openDialog({
    speaker: "되돌아가기",
    message: "지금 지나온 방향으로 짐마차를 돌립니다.\n회차에는 10초가 걸리며, 도중에 취소할 수 있습니다.",
    showCharacter: false,
    actions: [
      { label: "계속 이동", onClick: closeDialog },
      { label: "되돌아가기", primary: true, onClick: beginTurnBack }
    ]
  });
  dialogCard.classList.add("is-turn-back-confirm");
}

function beginTurnBack() {
  const travel = ensureTravelState();
  if (!travel || travel.mode !== "road" || !travel.moving) {
    closeDialog();
    return;
  }
  travel.moving = false;
  travel.turningBack = true;
  travel.pendingRoadArrivalContinuation = false;
  travel.pendingRoadArrivalPhase = "";
  travel.turnBackEndsAt = Date.now() + TURN_BACK_DURATION_MS;
  travel.progressUpdatedAt = null;
  persistAccount();
  closeDialog();
  syncTravelExperience();
  scheduleTravelStep();
}

function cancelTurnBack(travel = ensureTravelState()) {
  if (!travel?.turningBack) return;
  travel.turningBack = false;
  travel.turnBackEndsAt = 0;
  travel.moving = hasRemainingRoute(travel);
  travel.progressUpdatedAt = travel.moving ? Date.now() : null;
  travel.progressRate = travel.moving ? calculateTravelRate(currentScene, travel) : 1;
  persistAccount();
  syncTravelExperience();
  scheduleTravelStep();
  showGameNotice("회차를 취소하고 이동을 계속합니다.");
}

function completeTurnBack(travel = ensureTravelState()) {
  if (!travel?.turningBack) return;
  const reachedPath = travel.routePath.slice(0, travel.routeIndex + 1).reverse();
  const previousDestinationId = travel.destinationNodeId;
  travel.turningBack = false;
  travel.turnBackEndsAt = 0;
  travel.routePath = reachedPath.length ? reachedPath : [travel.positionId];
  travel.routeIndex = 0;
  travel.positionId = travel.routePath[0];
  travel.destinationNodeId = travel.routePath.at(-1) || travel.positionId;
  travel.departureNodeId = previousDestinationId;
  travel.segmentRemainingMs = TRAVEL_STEP_MS;
  travel.moving = travel.routePath.length > 1;
  travel.progressUpdatedAt = travel.moving ? Date.now() : null;
  travel.progressRate = travel.moving ? calculateTravelRate(currentScene, travel) : 1;
  travel.pendingRoadArrivalContinuation = false;
  travel.pendingRoadArrivalPhase = "";
  travel.talkCardAreaRouteKey = "";
  travel.talkCardAreaRolls = [];
  if (travel.moving) ensureRoadTalkCardAreaPlan(travel);
  persistAccount();
  syncTravelExperience();
  scheduleTravelStep();
  showGameNotice(travel.moving ? "짐마차를 돌려 출발지 방향으로 이동합니다." : "출발 지점으로 되돌아왔습니다.");
}

function startTravel() {
  const travel = ensureTravelState();
  if (!travel || travel.turningBack || travel.routeIndex >= travel.routePath.length - 1) {
    showGameNotice("선택된 이동 경로가 없습니다.");
    return;
  }
  ensureRoadTalkCardAreaPlan(travel);
  travel.moving = true;
  travel.pendingRoadArrivalContinuation = false;
  travel.pendingRoadArrivalPhase = "";
  travel.segmentRemainingMs = TRAVEL_STEP_MS;
  travel.progressUpdatedAt = Date.now();
  travel.progressRate = calculateTravelRate(currentScene, travel);
  persistAccount();
  syncTravelExperience();
  scheduleTravelStep();
  window.setTimeout(maybeStartEarlyToolbarTutorial, 0);
}

function advanceTravelSegmentByCode() {
  let travel = ensureTravelState();
  if (!hasQuickTravelCode()) return;
  if (!travel?.moving || travel.mode !== "road" || !hasRemainingRoute(travel)) {
    showGameNotice("짐마차가 이동 중일 때 사용할 수 있습니다.");
    return;
  }
  if (isTravelClockPaused() || travel.pendingRoadArrivalContinuation) return;

  reconcileTravelProgress(false);
  travel = account?.travel;
  if (!travel?.moving || travel.mode !== "road" || !hasRemainingRoute(travel)
    || isTravelClockPaused() || travel.pendingRoadArrivalContinuation) return;

  clearTravelTimers();
  const talkCardProgressCursor = storedTravelRoutePosition(travel);
  const segmentEndPosition = Math.min(travel.routePath.length - 1, travel.routeIndex + 1);
  resolveRoadTalkCardAreaRolls(travel, talkCardProgressCursor, segmentEndPosition);
  travel.segmentRemainingMs = TRAVEL_STEP_MS;
  travel.routeIndex = segmentEndPosition;
  travel.positionId = travel.routePath[travel.routeIndex];
  travel.progressUpdatedAt = Date.now();
  completeTravelStep(travel);
  persistAccount();
  syncTravelExperience();
  if (travel.moving && !isTravelClockPaused()) scheduleTravelStep();
}

function renderCampSetup() {
  if (!campSetup) return;
  const active = account?.travel?.mode === "camp" && campSetupOpen;
  campSetup.hidden = !active;
  if (!active) return;

  const items = window.ProjectWCargo.getInventoryItems();
  const availableIds = new Set(items.map(item => item.instanceId));
  campMealInstanceIds = new Set([...campMealInstanceIds].filter(instanceId => availableIds.has(instanceId)));

  const meals = items.filter(item => item.quantity > 0 && item.definition.category === "여행 식량");
  const requiredUtility = getPriorityCampUtility(items);
  const priorityUtilityIds = new Set(items
    .filter(item => CAMP_PRIORITY_ITEM_IDS.includes(item.itemId))
    .map(item => item.instanceId));
  priorityUtilityIds.forEach(instanceId => campUtilityInstanceIds.delete(instanceId));
  if (requiredUtility) campUtilityInstanceIds.add(requiredUtility.instanceId);
  const utilities = items.filter(item => item.quantity > 0
    && item.definition.category !== "여행 식량"
    && (!CAMP_PRIORITY_ITEM_IDS.includes(item.itemId) || item.instanceId === requiredUtility?.instanceId)
    && Boolean(item.definition.campEffect));
  const usableUtilityIds = new Set(utilities
    .filter(item => campItemAvailability(item).usable)
    .map(item => item.instanceId));
  campUtilityInstanceIds = new Set([...campUtilityInstanceIds].filter(instanceId => usableUtilityIds.has(instanceId)));
  campMealList.replaceChildren(...(meals.length
    ? meals.map(item => createCampItemOption(item, "meal"))
    : [createCampEmptyMessage("보유한 여행 식량이 없습니다.")]));
  campUtilityList.replaceChildren(...(utilities.length
    ? utilities.map(item => createCampItemOption(item, "utility", {
      locked: item.instanceId === requiredUtility?.instanceId
    }))
    : [createCampEmptyMessage("사용 가능한 야영 물품이 없습니다.")]));
  updateCampComfortDisplay();
}

function openCampSetup() {
  if (account?.travel?.mode !== "camp" || campInProgress) return;
  if (campRiskConfirm) campRiskConfirm.hidden = true;
  campSetupOpen = true;
  applyCampSceneContext();
  if (isTutorialActive(2) && normalizeTutorialProgress(account.tutorialProgress).step === 0) setTutorialStep(1);
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
  requestAnimationFrame(() => campSetupClose?.focus());
}

function closeCampSetup() {
  if (campInProgress) return;
  if (campRiskConfirm) campRiskConfirm.hidden = true;
  campSetupOpen = false;
  campSetup.hidden = true;
  roadScene.classList.remove("is-camp-setup-open");
  if (campCardPanel) campCardPanel.hidden = false;
  renderPartnerTalkCards();
  updateRoadControls();
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
  roadAction?.focus();
}

function getPriorityCampUtility(items = window.ProjectWCargo.getInventoryItems()) {
  for (const itemId of CAMP_PRIORITY_ITEM_IDS) {
    const item = items.find(entry => entry.itemId === itemId && entry.quantity > 0);
    if (item) return item;
  }
  return null;
}

function createCampEmptyMessage(message) {
  const empty = document.createElement("p");
  empty.className = "camp-item-empty";
  empty.textContent = message;
  return empty;
}

function createCampItemOption(item, kind, options = {}) {
  const locked = Boolean(options.locked);
  const availability = campItemAvailability(item);
  const environmentRecommended = availability.usable && campItemEnvironments(item).length > 0;
  const option = document.createElement("label");
  option.className = "camp-item-option";
  option.classList.toggle("is-locked", locked);
  option.classList.toggle("is-unavailable", !availability.usable);
  option.classList.toggle("has-environment-condition", campItemEnvironments(item).length > 0);
  option.classList.toggle("is-environment-recommended", environmentRecommended);
  option.dataset.itemInstance = item.instanceId;
  option.dataset.itemId = item.itemId;

  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = kind === "meal" ? "camp-meal" : "camp-utility";
  input.checked = kind === "meal"
    ? campMealInstanceIds.has(item.instanceId)
    : campUtilityInstanceIds.has(item.instanceId);
  input.disabled = locked || !availability.usable;
  input.addEventListener("change", () => {
    if (!campItemAvailability(item).usable) {
      renderCampSetup();
      return;
    }
    if (kind === "meal" && input.checked) {
      const inventory = window.ProjectWCargo.getInventoryItems();
      const duplicateIds = new Set(inventory
        .filter(entry => entry.itemId === item.itemId && entry.instanceId !== item.instanceId)
        .map(entry => entry.instanceId));
      duplicateIds.forEach(instanceId => campMealInstanceIds.delete(instanceId));
      campMealList.querySelectorAll(".camp-item-option").forEach(entry => {
        if (entry !== option && entry.dataset.itemId === item.itemId) {
          const duplicateInput = entry.querySelector("input[type='checkbox']");
          if (duplicateInput) duplicateInput.checked = false;
        }
      });
      campMealInstanceIds.add(item.instanceId);
      if (isTutorialActive(2)) tutorialCampMealSelections.add(item.itemId);
    } else if (kind === "meal") {
      campMealInstanceIds.delete(item.instanceId);
      if (isTutorialActive(2)) tutorialCampMealSelections.delete(item.itemId);
    }
    else if (input.checked) {
      const inventory = window.ProjectWCargo.getInventoryItems();
      const duplicateIds = new Set(inventory
        .filter(entry => entry.itemId === item.itemId && entry.instanceId !== item.instanceId)
        .map(entry => entry.instanceId));
      duplicateIds.forEach(instanceId => campUtilityInstanceIds.delete(instanceId));
      campUtilityList.querySelectorAll(".camp-item-option").forEach(entry => {
        if (entry !== option && entry.dataset.itemId === item.itemId) {
          const duplicateInput = entry.querySelector("input[type='checkbox']");
          if (duplicateInput) duplicateInput.checked = false;
        }
      });
      campUtilityInstanceIds.add(item.instanceId);
    }
    else campUtilityInstanceIds.delete(item.instanceId);
    updateCampComfortDisplay();
  });

  const copy = document.createElement("span");
  copy.className = "camp-item-copy";
  const name = document.createElement("strong");
  name.textContent = `${item.definition.displayName} ×${item.quantity}`;
  const effect = document.createElement("span");
  effect.textContent = normalizeEffectText(item.definition.campEffect) || "야영 안락도 변화 없음";
  const notice = document.createElement("small");
  if (kind === "meal") notice.textContent = "선택 시 야영 진행에서 1개 소모";
  else if (/소모\s*없음/.test(item.definition.campEffect)) notice.textContent = "소모 없음";
  else {
    const explicitDamage = explicitCampDurabilityDamage(item);
    const damage = campDurabilityDamage(item);
    const damageCopy = explicitDamage === null
      ? `열화 내구도 -10% (${formatCompactNumber(damage)})`
      : `열화 내구도 -${formatCompactNumber(damage)}`;
    notice.textContent = `${locked ? "필수 적용 · 해제 불가 · " : ""}사용 시 ${damageCopy}`;
  }
  if (!availability.usable) notice.textContent = availability.reason;
  copy.append(name, effect, notice);
  option.append(input, copy);
  attachCampItemTooltip(option, item.instanceId);
  return option;
}

function attachCampItemTooltip(option, instanceId) {
  option.addEventListener("pointerenter", event => window.ProjectWCargo.showItemTooltip(instanceId, event.clientX, event.clientY));
  option.addEventListener("pointermove", event => window.ProjectWCargo.showItemTooltip(instanceId, event.clientX, event.clientY));
  option.addEventListener("pointerleave", window.ProjectWCargo.hideTooltip);
  option.addEventListener("focusin", () => {
    const rect = option.getBoundingClientRect();
    window.ProjectWCargo.showItemTooltip(instanceId, rect.right, rect.top + (rect.height / 2));
  });
  option.addEventListener("focusout", window.ProjectWCargo.hideTooltip);
}

function normalizeEffectText(value) {
  return String(value || "").replace(/<br\s*\/?\s*>/gi, " · ").trim();
}

function campItemEnvironments(item) {
  // 사용 가능 환경과 효과량은 Goods의 야영 효과에서 읽는다.
  if (item?.itemId === "G_0280") return ["비", "폭우"];
  const effect = String(item?.definition?.campEffect || "").replace(/<br\s*\/?\s*>/gi, "\n");
  const match = effect.match(/(?:^|[.\n])\s*([^!.\n]+?)에서만\s*사용\s*가능/);
  return match ? match[1].split(/[,·/、]|\s+또는\s+/).map(value => value.trim()).filter(Boolean) : [];
}

function campItemAvailability(item, conditions = getCurrentRoadConditions()) {
  if (!item || !(item.quantity > 0)) return { usable: false, reason: "보유한 물품이 없습니다." };
  const requiredEnvironments = campItemEnvironments(item);
  const activeConditions = new Set([...(conditions.environments || []), conditions.weather].filter(Boolean));
  if (requiredEnvironments.length && !requiredEnvironments.some(environment => activeConditions.has(environment))) {
    return { usable: false, reason: `현재 환경에서는 사용 불가 · ${requiredEnvironments.join("·")}에서만 사용 가능` };
  }
  if (item.definition.category !== "여행 식량"
    && !CAMP_PRIORITY_ITEM_IDS.includes(item.itemId)
    && !(Number(item.durability) > 0)
    && !/소모\s*없음/.test(item.definition.campEffect)) {
    return { usable: false, reason: "열화 내구도가 소진되어 사용할 수 없습니다." };
  }
  return { usable: true, reason: "" };
}

function unselectedCampEnvironmentItems(details = campComfortDetails()) {
  const conditions = getCurrentRoadConditions();
  const selectedItemIds = new Set([...campUtilityInstanceIds]
    .map(instanceId => details.byInstanceId.get(instanceId)?.itemId)
    .filter(Boolean));
  const seenItemIds = new Set();
  return [...details.byInstanceId.values()].filter(item => {
    if (item?.definition?.category !== "야영 물품"
      || selectedItemIds.has(item.itemId)
      || seenItemIds.has(item.itemId)
      || campItemEnvironments(item).length === 0
      || !campItemAvailability(item, conditions).usable) return false;
    seenItemIds.add(item.itemId);
    return true;
  });
}

function showCampPreparationConfirmation(details, meals) {
  const reasons = [];
  if (!meals.length) reasons.push("아무 음식도 선택하지 않았습니다. 식사 없음으로 야영 안락도가 30 감소합니다.");
  const omittedEnvironmentItems = unselectedCampEnvironmentItems(details);
  if (omittedEnvironmentItems.length) {
    const names = omittedEnvironmentItems.map(item => item.definition.displayName).join(", ");
    reasons.push(`현재 환경에 알맞은 야영 물품을 보유하고 있지만 선택하지 않았습니다: ${names}`);
  }
  if (details.total <= -20) {
    reasons.push("야영 안락도가 -20 이하라 불만족스러운 야영이 될 가능성이 높습니다.");
  }
  if (!reasons.length) return false;
  if (campRiskTitle) campRiskTitle.textContent = "야영 준비를 다시 확인하세요";
  if (campRiskMessage) {
    campRiskMessage.replaceChildren(...reasons.flatMap((reason, index) => {
      const fragment = [document.createTextNode(reason)];
      if (index < reasons.length - 1) fragment.push(document.createElement("br"));
      return fragment;
    }));
  }
  campRiskConfirm.hidden = false;
  campRiskReview?.focus();
  return true;
}

function explicitCampDurabilityDamage(item) {
  if (item?.definition?.category !== "야영 물품") return null;
  const match = String(item.definition.campEffect || "")
    .match(/사용\s*시\s*열화\s*내구도\s*-\s*(\d+(?:\.\d+)?)/i);
  return match ? Math.max(0, Number(match[1]) || 0) : null;
}

function campDurabilityDamage(item) {
  const explicitDamage = explicitCampDurabilityDamage(item);
  if (explicitDamage !== null) return explicitDamage;
  return Math.max(0, Number(item?.definition?.durability) || 0) * 0.1;
}

function campComfortDetails() {
  const items = window.ProjectWCargo.getInventoryItems();
  const byInstanceId = new Map(items.map(item => [item.instanceId, item]));
  const conditions = getCurrentRoadConditions();
  const environmentEntries = conditions.environments
    .filter(environment => CAMP_ENVIRONMENT_COMFORT.has(environment))
    .map(environment => ({ environment, value: CAMP_ENVIRONMENT_COMFORT.get(environment) }));
  const weatherEntries = CAMP_WEATHER_COMFORT.has(conditions.weather)
    ? [{ weather: conditions.weather, value: CAMP_WEATHER_COMFORT.get(conditions.weather) }]
    : [];
  const selectedIds = [...new Set([...campMealInstanceIds, ...campUtilityInstanceIds])];
  const appliedItemIds = new Set();
  const itemEntries = selectedIds
    .map(instanceId => byInstanceId.get(instanceId))
    .filter(item => {
      if (!campItemAvailability(item, conditions).usable || appliedItemIds.has(item.itemId)) return false;
      appliedItemIds.add(item.itemId);
      return true;
    })
    .map(item => ({
      item,
      value: item.itemId === "G_0280" ? 10 : parseCampComfort(item.definition.campEffect)
    }));
  const hasMeal = itemEntries.some(entry => entry.item.definition.category === "여행 식량");
  const noMealComfort = hasMeal ? 0 : CAMP_NO_MEAL_COMFORT;
  const environmentComfort = environmentEntries.reduce((sum, entry) => sum + entry.value, 0);
  const weatherComfort = weatherEntries.reduce((sum, entry) => sum + entry.value, 0);
  const itemComfort = itemEntries.reduce((sum, entry) => sum + entry.value, 0);
  const buffComfort = partnerCampComfortBonus();
  const routeEventComfort = window.ProjectWRouteEvents.getCampComfortBonus();
  return {
    total: CAMP_BASE_COMFORT + noMealComfort + environmentComfort + weatherComfort + itemComfort + buffComfort + routeEventComfort,
    hasMeal,
    noMealComfort,
    buffComfort,
    routeEventComfort,
    environmentEntries,
    weatherEntries,
    itemEntries,
    byInstanceId
  };
}

function parseCampComfort(effectText) {
  const match = /야영\s*안락도\s*([+-]?\d+(?:\.\d+)?)/.exec(String(effectText || ""));
  return match ? Number(match[1]) : 0;
}

function formatSigned(value) {
  const number = Number(value) || 0;
  return number > 0 ? `+${formatCompactNumber(number)}` : formatCompactNumber(number);
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(Number(value) || 0);
}

function tutorialCampMealsReady(meals = []) {
  if (!isTutorialActive(2)) return true;
  const requiredItemIds = ["G_0269", "G_0271"];
  return requiredItemIds.every(itemId => tutorialCampMealSelections.has(itemId)
    && meals.some(item => item.itemId === itemId));
}

function updateCampComfortDisplay() {
  if (!campSetup || account?.travel?.mode !== "camp") return;
  const details = campComfortDetails();
  campComfortValue.textContent = formatSigned(details.total);
  campComfortValue.classList.toggle("is-negative", details.total < 0);
  campComfortValue.classList.toggle("is-positive", details.total >= 10);
  const breakdown = [`기본 ${formatSigned(CAMP_BASE_COMFORT)}`];
  if (!details.hasMeal) breakdown.push(`식사 없음 ${formatSigned(details.noMealComfort)}`);
  details.environmentEntries.forEach(entry => breakdown.push(`${entry.environment} ${formatSigned(entry.value)}`));
  details.weatherEntries.forEach(entry => breakdown.push(`${entry.weather} ${formatSigned(entry.value)}`));
  details.itemEntries.forEach(entry => breakdown.push(`${entry.item.definition.displayName} ${formatSigned(entry.value)}`));
  if (details.buffComfort) breakdown.push(`정령의 가호 ${formatSigned(details.buffComfort)}`);
  if (details.routeEventComfort) breakdown.push(`경로 사건 ${formatSigned(details.routeEventComfort)}`);
  campComfortBreakdown.textContent = breakdown.join(" · ");
  const meals = [...campMealInstanceIds]
    .map(instanceId => details.byInstanceId.get(instanceId))
    .filter(item => item?.definition.category === "여행 식량" && item.quantity > 0);
  const tutorialRequiredMealsReady = tutorialCampMealsReady(meals);
  if (isTutorialActive(2)
    && normalizeTutorialProgress(account.tutorialProgress).step === 3
    && tutorialRequiredMealsReady) {
    window.setTimeout(() => {
      if (isTutorialActive(2) && normalizeTutorialProgress(account.tutorialProgress).step === 3) setTutorialStep(4);
    }, 0);
  }
  campProceed.disabled = campInProgress;
  campSetupStatus.textContent = !tutorialRequiredMealsReady
    ? "여행 육포와 건조 흑빵을 각각 직접 체크해야 첫 야영을 진행할 수 있습니다."
    : meals.length
      ? `선택한 식사 ${meals.length}종과 물품의 효과를 적용하고 다음 날 아침을 맞이합니다.`
      : "식사 없이 진행할 수 있습니다. 이번 야영의 안락도가 30 감소합니다.";
  if (account?.travel?.mode === "camp") setRoadAction("야영 진행", "Space", campProceed.disabled);
}

async function performCamp(forceConfirmation = false) {
  const travel = ensureTravelState();
  if (!travel || travel.mode !== "camp" || !campSetupOpen || campInProgress) return;
  const details = campComfortDetails();
  const meals = [...campMealInstanceIds]
    .map(instanceId => details.byInstanceId.get(instanceId))
    .filter(item => item?.definition.category === "여행 식량" && item.quantity > 0);
  if (meals.length !== campMealInstanceIds.size) {
    showGameNotice("선택한 식사를 사용할 수 없습니다.");
    updateCampComfortDisplay();
    return;
  }
  if (!tutorialCampMealsReady(meals)) {
    showGameNotice("이번 튜토리얼에서는 여행 육포와 건조 흑빵을 둘 다 체크해야 합니다.");
    updateCampComfortDisplay();
    return;
  }
  if (!forceConfirmation && showCampPreparationConfirmation(details, meals)) return;

  if (campRiskConfirm) campRiskConfirm.hidden = true;
  campInProgress = true;
  // 강행을 누른 순간부터 이번 야영을 닫는다. 수면 중 발생하는 상태 변화나
  // 자동 저장이 이전 야영 준비 화면을 다시 저장하지 못하게 한다.
  campSetupOpen = false;
  updateCampComfortDisplay();
  window.ProjectWCargo.hideTooltip();
  // 안락도에 실제 반영된 물품만 마모한다. 저장된 선택이 현재 환경과
  // 맞지 않아 제외되었다면 효과도 내구도 소모도 발생하지 않는다.
  const utilityItems = details.itemEntries
    .map(entry => entry.item)
    .filter(item => item.definition.category !== "여행 식량");
  const campAlcoholCount = utilityItems.reduce((count, item) => {
    const category = String(item.definition?.category || "");
    const subcategory = String(item.definition?.subcategory || "");
    return count + (/주류|술/.test(category) || /주류|술/.test(subcategory) ? 1 : 0);
  }, 0);
  const campHangover = rollHangover(campAlcoholCount);
  const comfort = details.total;
  for (const meal of meals) {
    if (!window.ProjectWCargo.consumeInstance(meal.instanceId, 1)) {
      campInProgress = false;
      renderCampSetup();
      showGameNotice("선택한 식사를 사용할 수 없습니다.");
      return;
    }
  }
  utilityItems.forEach(item => {
    if (/소모\s*없음/.test(item.definition.campEffect)) return;
    window.ProjectWCargo.damageItem(item.instanceId, campDurabilityDamage(item));
  });
  window.ProjectWRouteEvents.consumeCampComfortBonus();

  const uncomfortableChance = comfort < 0 ? Math.min(100, Math.abs(comfort)) : 0;
  const uncomfortable = !isTutorialActive(2) && uncomfortableChance > 0 && (Math.random() * 100) < uncomfortableChance;
  const fatigueChance = comfort < 0 ? Math.min(100, Math.abs(comfort) * 5) : 0;
  const fatigue = !isTutorialActive(2) && fatigueChance > 0 && (Math.random() * 100) < fatigueChance;
  const comfortMoodChange = comfort;
  const appliedComfortMoodChange = changePartnerMood(comfortMoodChange);
  const appliedUncomfortableMoodChange = uncomfortable ? changePartnerMood(-20) : 0;
  let uncomfortableStatusAdded = false;
  const appliedPartnerMoodChange = appliedComfortMoodChange + appliedUncomfortableMoodChange;
  account.lastCamp = {
    contractDay: normalizeWorldTime(account.worldTime).day,
    comfort,
    uncomfortableChance,
    uncomfortable,
    comfortMoodChange: appliedComfortMoodChange,
    uncomfortableMoodChange: appliedUncomfortableMoodChange,
    uncomfortableStatusId: fatigue ? "N_S_012" : "",
    uncomfortableStatusAdded,
    partnerMoodChange: appliedPartnerMoodChange,
    completedAt: new Date().toISOString()
  };

  await playSituationTransition("Asset_SIT_02", async () => {
    removePartnerStatus("N_S_006");
    expireCampTalkCards(false);
    // 시간 경과와 상태이상 처리 중에도 저장이 일어난다. 그보다 먼저 현재
    // 계정의 travel 객체를 road로 확정해 아침에 같은 야영이 재개되지 않게 한다.
    const completedTravel = ensureTravelState();
    if (completedTravel) {
      completedTravel.mode = "road";
      completedTravel.moving = false;
      completedTravel.turningBack = false;
      completedTravel.turnBackEndsAt = 0;
      completedTravel.segmentRemainingMs = TRAVEL_STEP_MS;
      completedTravel.progressUpdatedAt = null;
    }
    advanceUntilNextMorning();
    if (fatigue) {
      uncomfortableStatusAdded = addPartnerStatus("N_S_012", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
      account.lastCamp.uncomfortableStatusAdded = uncomfortableStatusAdded;
    }
    if (comfort >= 10) addPartnerStatus("N_S_007", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
    if (campHangover) addPartnerStatus("N_S_006", { expiresAfterDay: normalizeWorldTime(account.worldTime).day });
    addCompanionExperience(2 + (comfort >= 1 ? 1 : 0));
    recoverSpiritAfterSleep();
    const morningTravel = ensureTravelState();
    if (morningTravel) morningTravel.progressRate = calculateTravelRate("road", morningTravel);
    persistAccount();
    showScene("road", 1, false);
    syncTravelExperience();
    await waitForSceneVisuals([roadBackground, partnerBackground, mapBackground]);
  });
  campInProgress = false;
  campSetupOpen = false;
  campMealInstanceIds = new Set();
  campUtilityInstanceIds = new Set();
  tutorialCampMealSelections = new Set();
  if (campRiskConfirm) campRiskConfirm.hidden = true;
  updateTravelDisplays();
  if (isTutorialActive(2)) completeTutorial(2);
  await handleNahanaEventCampComplete();
  if (uncomfortable) queueNahanaSituationEvent("E_011");

  let result = `야영 안락도 ${formatSigned(comfort)}`;
  if (appliedPartnerMoodChange < 0) result += ` · 파트너 기분 ${appliedPartnerMoodChange}`;
  else if (appliedPartnerMoodChange > 0) result += ` · 파트너 기분 +${appliedPartnerMoodChange}`;
  else result += " · 파트너 기분 변화 없음";
  if (comfort < 0) {
    if (uncomfortable) {
      result += " · 불편한 야영";
    } else result += " · 불편한 야영을 무사히 넘겼습니다.";
    if (fatigue) {
      const statusName = nahanaStatusDefinitions.get("N_S_012")?.name || "피로";
      result += ` · ${statusName} ${uncomfortableStatusAdded ? "획득" : "지속"}`;
    }
  }
  if (campHangover) result += " · 숙취 획득";
  showGameNotice(result);
  schedulePendingNarrativePresentation();
}

async function handleNahanaEventCampComplete() {
  if (!account) return false;
  const state = normalizeNahanaEventState(account.nahanaEvents);
  if (state.activeId !== "N_E_011" || state.stage !== 3) return false;
  return resolveNahanaEventCondition(3);
}

async function enterSettlement() {
  const travel = ensureTravelState();
  if (!travel || !isNodeId(travel.positionId)) return;
  const loaded = await window.ProjectWMapView.load();
  if (!loaded) {
    showGameNotice("거점 정보를 불러오지 못했습니다.");
    return;
  }
  const placement = window.ProjectWMapView.getPlacement(travel.positionId);
  if (!placement) {
    showGameNotice("현재 거점 정보를 찾을 수 없습니다.");
    return;
  }
  await window.ProjectWCityEvents.ensureCurrentDay();

  const departure = travel.departureNodeId
    ? window.ProjectWMapView.getPlacement(travel.departureNodeId)
    : null;
  const crossesBorder = Boolean(departure?.affiliation && placement.affiliation
    && departure.affiliation !== placement.affiliation);
  const tariffMultiplier = partnerEntryTariffMultiplier();
  const routeTariffMultiplier = window.ProjectWRouteEvents.getDestinationTariffMultiplier(placement.id);
  const borderTaxRate = (crossesBorder ? 5 : 0) * tariffMultiplier * routeTariffMultiplier;
  const cityEventTariffPoints = window.ProjectWCityEvents.getModifiers(placement).entryTariffPoints;
  const effectivePlacement = {
    ...placement,
    entryTariffRate: Math.max(0, ((Number(placement.entryTariffRate) || 0) + cityEventTariffPoints) * routeTariffMultiplier * tariffMultiplier)
  };
  const taxable = ["대도시", "도시", "관문"].includes(placement.category)
    && (Number(effectivePlacement.entryTariffRate) > 0 || borderTaxRate > 0);
  if (taxable) {
    if (window.ProjectWEntryTax.isOpen()) return;
    const opened = await window.ProjectWEntryTax.open({
      settlement: effectivePlacement,
      additionalRate: borderTaxRate,
      departure,
      onPaid: () => {
        window.ProjectWRouteEvents.consumeDestinationTariffDiscount(placement.id);
        completeSettlementEntry(placement);
      },
      onCancel: () => showGameNotice(`${placement.name || "거점"} 입장을 취소했습니다.`)
    });
    if (opened) return;
  }

  window.ProjectWRouteEvents.consumeDestinationTariffDiscount(placement.id);
  completeSettlementEntry(placement);
}

function completeSettlementEntry(placement) {
  const travel = ensureTravelState();
  if (!travel || !placement) return;
  travel.mode = "settlement";
  travel.moving = false;
  travel.segmentRemainingMs = TRAVEL_STEP_MS;
  travel.progressUpdatedAt = null;
  travel.progressRate = 1;
  travel.settlementId = placement.id;
  travel.settlementName = placement.name || "거점";
  travel.settlementAssetId = SETTLEMENT_ASSETS[placement.category] || "Asset_A_06";
  account.settlementDialogueVisit = {
    settlementId: placement.id,
    token: `${placement.id}:${normalizeWorldTime(account.worldTime).day}:${Date.now()}`
  };
  activeTavernVisit = null;
  recordCompanionSettlementEntry(placement.id);
  persistAccount();
  if ((SETTLEMENT_FACILITIES[placement.category] || []).some(facility => facility.type === "주점")) beginTavernVisit(placement);
  clearTravelTimers();
  syncTravelExperience();
  refreshAdvancedTutorialLaunchers();
  void handleNahanaEventSettlementEntry(placement)
    .finally(() => window.ProjectWCityEvents.observeSettlementEntry(placement));
  handleTutorialSettlementEntry(placement);
  void collectBrightEarInformation(placement);
}

function settlementDialogueVisitToken() {
  if (!account) return "";
  account.settlementDialogueVisit = normalizeSettlementDialogueVisit(account.settlementDialogueVisit);
  const settlementId = String(account.travel?.settlementId || account.travel?.positionId || "").trim();
  if (!account.settlementDialogueVisit.token || account.settlementDialogueVisit.settlementId !== settlementId) {
    account.settlementDialogueVisit = {
      settlementId,
      token: `${settlementId || "road"}:${normalizeWorldTime(account.worldTime).day}:${Date.now()}`
    };
  }
  return account.settlementDialogueVisit.token;
}

async function openExitDirectionDialog() {
  const travel = ensureTravelState();
  if (!travel) return;
  const eventLockMessage = travel.mode === "settlement" ? nahanaEventDepartureLockMessage() : "";
  if (eventLockMessage) {
    showGameNotice(eventLockMessage);
    return;
  }
  if (travel.mode === "settlement" && !DEPARTURE_PHASES.has(currentTimePhase())) {
    showGameNotice("거점에서는 아침과 낮에만 출발할 수 있습니다.");
    return;
  }
  const loaded = await window.ProjectWMapView.load();
  if (!loaded) {
    showGameNotice("출발 경로를 불러오지 못했습니다.");
    return;
  }

  const originId = travel.settlementId || travel.positionId;
  const connectedRoutes = window.ProjectWMapView.getConnectedNodeRoutes(originId);
  const routes = isFirstParneDepartureRestricted(originId)
    ? connectedRoutes.filter(route => route.node.id === FIRST_TUTORIAL_DESTINATION_ID)
    : connectedRoutes;
  const locationName = travel.settlementName || getPlacementName(originId);
  if (!routes.length) {
    openDialog({
      speaker: `${locationName} 출발`,
      message: isFirstParneDepartureRestricted(originId)
        ? "첫 여정의 목적지인 하이렌바흐로 이어지는 경로를 찾을 수 없습니다. 지도 데이터를 확인해 주세요."
        : "이 거점에서 이어지는 경로를 찾을 수 없습니다.",
      showCharacter: false,
      actions: [{ label: "닫기", primary: true, onClick: closeDialog }]
    });
    return;
  }

  gameScreen.classList.add("is-destination-picking");
  window.ProjectWMapView.beginDestinationSelection(routes, {
    originName: locationName,
    weatherInfoByPlacementId: buildDepartureWeatherInfo(routes),
    onSelect: chooseDepartureRoute,
    onCancel: cancelDepartureSelection
  });
  showScene("map", 1, true);
}

function buildDepartureWeatherInfo(routes) {
  const weatherInfo = new Map();
  const hasProphecy = partnerHasWeatherInsight();
  routes.forEach(route => {
    const origin = window.ProjectWMapView.getPlacement(route.path[0]);
    const destination = route.node;
    const crossesBorder = Boolean(origin?.affiliation && destination?.affiliation && origin.affiliation !== destination.affiliation);
    const routeDotIds = route.path.slice(1, -1)
      .filter(placementId => window.ProjectWMapView.getPlacement(placementId)?.kind === "dot");
    const firstDotId = routeDotIds[0];
    if (window.ProjectWMapView.getPlacement(firstDotId)?.kind !== "dot") return;
    const firstDot = window.ProjectWMapView.getPlacement(firstDotId);
    const firstWeather = weatherAtPlacement(firstDotId);
    const forecastLabel = firstWeather.label === "폭우" ? "비" : firstWeather.label === "폭설" ? "눈" : firstWeather.label;
    if (!hasProphecy) {
      weatherInfo.set(route.node.id, {
        mode: "forecast",
        label: forecastLabel,
        sourceName: firstDot?.name || "연결 경로",
        borderTaxRate: crossesBorder ? 5 : 0,
        originAffiliation: origin?.affiliation || "",
        destinationAffiliation: destination?.affiliation || ""
      });
      return;
    }

    const prediction = predictRouteArrivalWeather(route);
    const zones = prediction.zones;
    const wolfenPositionId = window.ProjectWWolfenCompany.getPosition?.() || "";
    const wolfenDetected = Boolean(wolfenPositionId && route.path.includes(wolfenPositionId));
    const wolfenPlacement = wolfenDetected ? window.ProjectWMapView.getPlacement(wolfenPositionId) : null;
    weatherInfo.set(route.node.id, {
      mode: "prophecy",
      label: prediction.destination.label,
      sourceName: firstDot?.name || `${route.node.name || "목적지"} 방면`,
      zones: zones.map((zone, index) => ({
        name: `${index + 1}구역`,
        routeName: `${zone.name} · ${zone.arrivalText}`,
        label: zone.label,
        dotCount: zone.dotCount
      })),
      destination: {
        name: route.node.name || "최종 목적지",
        label: prediction.destination.label,
        arrivalText: prediction.destination.arrivalText
      },
      wolfenDetected,
      wolfenRouteName: wolfenPlacement?.name || "선택한 경로",
      borderTaxRate: crossesBorder ? 5 : 0,
      originAffiliation: origin?.affiliation || "",
      destinationAffiliation: destination?.affiliation || ""
    });
  });
  return weatherInfo;
}

function predictRouteArrivalWeather(route) {
  const graph = window.ProjectWMapView.getWeatherGraphData?.();
  const initialWeather = ensureWeatherSystem();
  if (!graph?.loaded || !initialWeather || !Array.isArray(route?.path)) {
    const fallback = weatherAtPlacement(route?.node?.id);
    return { zones: [], destination: { label: fallback.label, arrivalText: "도착 시점" } };
  }
  let forecastWeather = window.ProjectWWeather.normalizeState(initialWeather);
  const forecastTime = normalizeWorldTime(account?.worldTime);
  const startDay = forecastTime.day;
  const zones = [];
  const advanceForecastTime = () => {
    forecastTime.phaseIndex += 1;
    if (forecastTime.phaseIndex >= TIME_PHASES.length) {
      forecastTime.phaseIndex = 0;
      forecastTime.day += 1;
    }
    forecastWeather = window.ProjectWWeather.advanceTime(forecastWeather, graph, {
      season: seasonForWorldTime(forecastTime),
      times: 1
    });
  };
  const arrivalText = () => {
    const dayOffset = Math.max(0, forecastTime.day - startDay);
    return `${dayOffset ? `${dayOffset}일 후` : "오늘"} ${TIME_PHASES[forecastTime.phaseIndex]}`;
  };
  let destination = { label: weatherAtPlacement(route.node.id).label, arrivalText: "도착 시점" };
  for (let index = 1; index < route.path.length; index += 1) {
    const placementId = route.path[index];
    const placement = window.ProjectWMapView.getPlacement(placementId);
    advanceForecastTime();
    const weather = window.ProjectWWeather.getWeatherAt(forecastWeather, placementId);
    if (index >= route.path.length - 1 || placement?.kind === "node") {
      destination = { label: weather.label, arrivalText: arrivalText() };
      break;
    }
    const previous = zones.at(-1);
    if (previous?.ownerNodeId === weather.ownerNodeId && previous.label === weather.label) {
      previous.dotCount += 1;
      previous.arrivalText = arrivalText();
    } else {
      zones.push({
        ownerNodeId: weather.ownerNodeId || placementId,
        name: placement?.name || "이름 없는 경로",
        label: weather.label,
        dotCount: 1,
        arrivalText: arrivalText()
      });
    }
    if (["저녁", "밤"].includes(TIME_PHASES[forecastTime.phaseIndex])) {
      const campStartDay = forecastTime.day;
      do advanceForecastTime();
      while (forecastTime.day === campStartDay || TIME_PHASES[forecastTime.phaseIndex] !== "아침");
    }
  }
  return { zones, destination };
}

function chooseDepartureRoute(route) {
  const travel = ensureTravelState();
  if (!travel || !route?.node || !Array.isArray(route.path) || route.path.length < 2) return;
  const firstParneDeparture = isFirstParneDepartureRestricted(route.path[0])
    && route.node.id === FIRST_TUTORIAL_DESTINATION_ID;
  window.ProjectWCityEvents.captureRouteEffects(route.path[0], route.node.id);
  travel.mode = "road";
  travel.positionId = route.path[0];
  travel.destinationNodeId = route.node.id;
  travel.routePath = [...route.path];
  travel.routeIndex = 0;
  travel.moving = false;
  travel.turningBack = false;
  travel.turnBackEndsAt = 0;
  travel.segmentRemainingMs = TRAVEL_STEP_MS;
  travel.progressUpdatedAt = null;
  travel.progressRate = 1;
  travel.departureNodeId = route.path[0];
  travel.settlementId = "";
  travel.settlementName = "";
  travel.settlementAssetId = "";
  travel.talkCardAreaRouteKey = "";
  travel.talkCardAreaRolls = [];
  ensureRoadTalkCardAreaPlan(travel);
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (route.path[0] === FIRST_TUTORIAL_DESTINATION_ID && eventState.completedIds.includes("N_E_001")) {
    account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
    account.tutorialProgress.earlyTutorialBranchReached = true;
  }
  const destinationCategory = String(route.node.category || "");
  const anticipationChance = destinationCategory === "대도시" ? .20 : destinationCategory === "도시" ? .10 : 0;
  if (anticipationChance > 0 && Math.random() < anticipationChance) addPartnerStatus("N_S_009");
  persistAccount();
  window.ProjectWMapView.endDestinationSelection();
  gameScreen.classList.remove("is-destination-picking");
  showScene("road", 1, false);
  clearTravelTimers();
  syncTravelExperience();
  if (firstParneDeparture && !normalizeDialogueMemorial(account.dialogueMemorial).unlockedIds.includes("DL_002")) {
    playDialogue("DL_002", closeDialog, {
      appearanceCondition: condition => condition.includes("처음 파르네") && condition.includes("나그네의 길")
    });
  }
}

function isFirstParneDepartureRestricted(originId) {
  return originId === START_DESTINATION_ID
    && !normalizeTutorialProgress(account?.tutorialProgress).reachedHirenbach;
}

function cancelDepartureSelection() {
  window.ProjectWMapView.endDestinationSelection();
  gameScreen.classList.remove("is-destination-picking");
  showScene("road", -1, true);
}

function getPlacementName(placementId) {
  const placement = window.ProjectWMapView.getPlacement(placementId);
  if (placement?.name) return placement.name;
  if (placementId === START_DESTINATION_ID) return "파르네";
  return placementId || "목적지";
}

function isNodeId(placementId) {
  return /^MAP_NODE_\d+$/.test(String(placementId ?? ""));
}

function updateGameClock() {
  if (!gameClock) return;
  const time = normalizeWorldTime(account?.worldTime);
  const date = contractCalendarDate(time.day);
  const season = SEASONS_BY_MONTH.get(date.month) || "봄";
  const weather = currentWeatherLabel();
  const presentation = {
    date: `${date.year}-${date.month}-${date.day}`,
    season,
    weather,
    phase: TIME_PHASES[time.phaseIndex]
  };
  if (gameClockDate) gameClockDate.textContent = `${date.year}년 ${date.month}월 ${date.day}일 ${date.weekday}`;
  if (gameClockSeason) gameClockSeason.textContent = season;
  if (gameClockWeather) {
    gameClockWeather.textContent = weather;
    gameClockWeather.dataset.weatherKind = weatherVisualKind(weather);
  }
  const phase = presentation.phase;
  if (gameClockPhase) gameClockPhase.textContent = phase;
  appShell?.classList.toggle("is-evening-phase", phase === "저녁");
  appShell?.classList.toggle("is-night-phase", phase === "밤");
  gameScreen.classList.toggle("is-evening-phase", phase === "저녁");
  gameScreen.classList.toggle("is-night-phase", phase === "밤");
  gameClock.setAttribute("aria-label", `${season}, ${date.year}년 ${date.month}월 ${date.day}일 ${date.weekday}, ${weather}, ${phase}`);
  if (gameClockDate) gameClockDate.setAttribute("aria-label", `${date.year}년 ${date.month}월 ${date.day}일 ${date.weekday}, 나하나와의 계약 ${time.day}일차`);
  if (account && lastClockPresentation) {
    if (lastClockPresentation.date !== presentation.date) emphasizeClockElement(gameClockDate, "date");
    if (lastClockPresentation.season !== presentation.season) emphasizeClockElement(gameClockSeason, "season");
    if (lastClockPresentation.weather !== presentation.weather) emphasizeClockElement(gameClockWeather, "weather");
    if (lastClockPresentation.phase !== presentation.phase) emphasizeClockElement(gameClockPhase, "time");
  }
  lastClockPresentation = account ? presentation : null;
}

function emphasizeClockElement(element, kind) {
  if (!element) return;
  const classes = ["is-date-updated", "is-season-updated", "is-weather-updated", "is-time-updated"];
  const previousTimer = clockHighlightTimers.get(element);
  if (previousTimer) window.clearTimeout(previousTimer);
  element.classList.remove(...classes);
  void element.offsetWidth;
  element.classList.add(`is-${kind}-updated`);
  clockHighlightTimers.set(element, window.setTimeout(() => {
    element.classList.remove(...classes);
    clockHighlightTimers.delete(element);
  }, 2300));
}

function currentWeatherLabel() {
  return account ? weatherAtPlacement(currentEnvironmentPlacementId()).label : "맑음";
}

function weatherVisualKind(weather) {
  if (weather === "비" || weather === "폭우") return "rain";
  if (weather === "눈" || weather === "폭설") return "snow";
  if (weather === "흐림") return "cloudy";
  return "clear";
}

function updateWeatherPresentation() {
  const weather = currentWeatherLabel();
  gameScreen.dataset.weatherKind = weatherVisualKind(weather);
  gameScreen.dataset.weatherIntensity = weather === "폭우" || weather === "폭설" ? "heavy" : "normal";
}

function contractCalendarDate(contractDay) {
  const date = new Date(Date.UTC(CONTRACT_START_DATE.year, CONTRACT_START_DATE.month - 1, CONTRACT_START_DATE.day));
  const dayOffset = Math.max(0, Math.trunc(Number(contractDay) || 1) - 1);
  date.setUTCDate(date.getUTCDate() + dayOffset);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    weekday: CONTRACT_WEEKDAYS[dayOffset % CONTRACT_WEEKDAYS.length]
  };
}

function renderRoadRouteBar() {
  const travel = account?.travel;
  const visible = Boolean(travel && travel.mode === "road" && travel.routePath.length);
  roadRouteBar.hidden = !visible;
  if (!visible) {
    roadRoutePoints.replaceChildren();
    if (roadRouteName) roadRouteName.hidden = true;
    return;
  }

  const path = travel.routePath;
  const lastIndex = Math.max(1, path.length - 1);
  updateTravelPinPositions(travel);
  const pinSource = assetMap.get("Asset_Pin") ?? assetFallbacks.get("Asset_Pin");
  if (pinSource) roadRoutePin.src = pinSource;
  if (roadRouteName) {
    const routeName = getCurrentRouteName(travel);
    const routeType = getCurrentRouteConnection(travel).routeType;
    roadRouteName.textContent = routeName;
    roadRouteName.hidden = !routeName;
    roadRouteName.classList.toggle("is-trade-route", routeType === "trade");
    roadRouteName.classList.toggle("is-normal-route", routeType !== "trade");
    roadRouteName.setAttribute("aria-label", routeName);
  }

  const markers = path.map((placementId, index) => {
    const placement = window.ProjectWMapView.getPlacement(placementId);
    const marker = document.createElement("button");
    const position = path.length === 1 ? 50 : (index / lastIndex) * 100;
    marker.type = "button";
    marker.className = `road-route-point ${isNodeId(placementId) ? "is-node" : "is-dot"}`;
    marker.classList.toggle("is-passed", index < travel.routeIndex);
    marker.classList.toggle("is-current", index === travel.routeIndex);
    marker.style.left = `${position}%`;
    marker.dataset.placementId = placementId;
    marker.setAttribute("aria-label", `${placement?.name || placementId} 정보`);

    const visual = document.createElement("span");
    visual.className = "road-route-point-visual";
    const assetSource = placement?.assetId ? assetMap.get(placement.assetId) : "";
    if (assetSource) {
      const image = document.createElement("img");
      image.src = assetSource;
      image.alt = "";
      image.draggable = false;
      visual.append(image);
    } else {
      visual.textContent = isNodeId(placementId) ? "◆" : "●";
    }
    marker.append(visual);

    if (isNodeId(placementId)) {
      const name = document.createElement("span");
      name.className = "road-route-point-name";
      name.textContent = placement?.name || getPlacementName(placementId);
      marker.append(name);
    }
    attachRoadRouteTooltip(marker, placementId);
    return marker;
  });
  roadRoutePoints.replaceChildren(
    ...markers,
    ...createRoadRouteWeatherMarkers(travel, path, lastIndex),
    ...createRoadRouteCampPreviewMarkers(travel, path, lastIndex)
  );
}

function createRoadRouteCampPreviewMarkers(travel, path, lastIndex) {
  const phaseIndex = normalizeWorldTime(account?.worldTime).phaseIndex;
  const stepsUntilEvening = (TIME_PHASES.indexOf("저녁") - phaseIndex + TIME_PHASES.length) % TIME_PHASES.length;
  if (stepsUntilEvening <= 0) return [];
  const index = travel.routeIndex + stepsUntilEvening;
  if (index <= travel.routeIndex || index >= path.length || isNodeId(path[index])) return [];
  const marker = document.createElement("button");
  marker.type = "button";
  marker.className = "road-route-camp-preview";
  marker.style.left = `${path.length === 1 ? 50 : (index / lastIndex) * 100}%`;
  marker.setAttribute("aria-label", "예상 야영 지점");
  marker.setAttribute("aria-describedby", "road-status-tooltip");
  const sky = document.createElement("span");
  sky.className = "road-route-camp-sky";
  const moon = document.createElement("i");
  sky.append(moon);
  marker.append(sky);
  const show = (clientX, clientY) => {
    const header = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = "예상 야영 지점";
    header.append(title);
    const paragraph = document.createElement("p");
    paragraph.className = "road-route-camp-tooltip-copy";
    paragraph.textContent = "이 지점에 도달하면 저녁이 되어 야영에 들어갑니다.";
    roadStatusTooltip.replaceChildren(header, paragraph);
    roadStatusTooltip.hidden = false;
    positionRoadStatusTooltip(clientX, clientY);
  };
  marker.addEventListener("pointerenter", event => show(event.clientX, event.clientY));
  marker.addEventListener("pointermove", event => positionRoadStatusTooltip(event.clientX, event.clientY));
  marker.addEventListener("pointerleave", hideRoadStatusTooltip);
  marker.addEventListener("focus", () => {
    const rect = marker.getBoundingClientRect();
    show(rect.right, rect.bottom);
  });
  marker.addEventListener("blur", hideRoadStatusTooltip);
  return [marker];
}

function createRoadRouteWeatherMarkers(travel, path, lastIndex) {
  const markerIndexes = travel.moving
    ? [travel.routeIndex, travel.routeIndex + 1]
    : [travel.routeIndex - 1, travel.routeIndex + 1];
  return [...new Set(markerIndexes)]
    .filter(index => index >= 0 && index < path.length)
    .map(index => {
      const placementId = path[index];
      const placement = window.ProjectWMapView.getPlacement(placementId);
      const weather = weatherAtPlacement(placementId);
      const placementName = placement?.name
        || (placement?.kind === "node" ? getPlacementName(placementId) : getCurrentRouteName(travel))
        || "현재 경로";
      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = `road-route-weather-marker is-${weatherVisualKind(weather.label)}`;
      if (weather.label === "폭우" || weather.label === "폭설") marker.classList.add("is-heavy");
      marker.style.left = `${path.length === 1 ? 50 : (index / lastIndex) * 100}%`;
      marker.setAttribute("aria-label", `${placementName} 날씨 ${weather.label}`);
      marker.setAttribute("aria-describedby", "road-status-tooltip");
      marker.addEventListener("pointerenter", event => showRouteWeatherTooltip({
        weather: weather.label,
        placementName
      }, event.clientX, event.clientY));
      marker.addEventListener("pointermove", event => positionRoadStatusTooltip(event.clientX, event.clientY));
      marker.addEventListener("pointerleave", hideRoadStatusTooltip);
      marker.addEventListener("focus", () => {
        const rect = marker.getBoundingClientRect();
        showRouteWeatherTooltip({
          weather: weather.label,
          placementName
        }, rect.right, rect.bottom);
      });
      marker.addEventListener("blur", hideRoadStatusTooltip);
      return marker;
    });
}

function showRouteWeatherTooltip(info, clientX, clientY) {
  if (!roadStatusTooltip) return;
  const fragment = document.createDocumentFragment();
  const header = document.createElement("header");
  const title = document.createElement("strong");
  const badge = document.createElement("span");
  title.textContent = `${info.placementName} 날씨`;
  badge.className = `weather-tooltip-badge is-${weatherVisualKind(info.weather)}`;
  badge.textContent = info.weather;
  header.append(title, badge);
  const list = document.createElement("dl");
  [["화물 영향", describeWeatherRisk(info.weather)]].forEach(([term, description]) => {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    appendRiskHighlightedText(dd, description);
    list.append(dt, dd);
  });
  fragment.append(header, list);
  roadStatusTooltip.replaceChildren(fragment);
  roadStatusTooltip.hidden = false;
  positionRoadStatusTooltip(clientX, clientY);
}

function getCurrentRouteName(travel) {
  const candidates = [
    travel.routePath[travel.routeIndex],
    travel.routePath[travel.routeIndex + 1],
    travel.routePath[travel.routeIndex - 1]
  ];
  for (const placementId of candidates) {
    const placement = window.ProjectWMapView.getPlacement(placementId);
    if (placement?.kind === "dot" && placement.name) return placement.name;
  }
  return "";
}

function attachRoadRouteTooltip(marker, placementId) {
  marker.addEventListener("pointerenter", event => window.ProjectWMapView.showPlacementTooltip(placementId, event.clientX, event.clientY));
  marker.addEventListener("pointermove", event => window.ProjectWMapView.positionTooltip(event.clientX, event.clientY));
  marker.addEventListener("pointerleave", window.ProjectWMapView.hideTooltip);
  marker.addEventListener("focus", () => {
    const rect = marker.getBoundingClientRect();
    window.ProjectWMapView.showPlacementTooltip(placementId, rect.right, rect.bottom);
  });
  marker.addEventListener("blur", window.ProjectWMapView.hideTooltip);
}

function initRoadStatusUi() {
  roadConditionMarkers.forEach(marker => {
    const kind = marker.dataset.roadCondition;
    marker.addEventListener("pointerenter", event => showRoadStatusTooltip(kind, event.clientX, event.clientY));
    marker.addEventListener("pointermove", event => positionRoadStatusTooltip(event.clientX, event.clientY));
    marker.addEventListener("pointerleave", hideRoadStatusTooltip);
    marker.addEventListener("focus", () => {
      const rect = marker.getBoundingClientRect();
      showRoadStatusTooltip(kind, rect.right, rect.top + (rect.height / 2));
    });
    marker.addEventListener("blur", hideRoadStatusTooltip);
  });
  roadRoutePin.addEventListener("pointerenter", event => showRoadStatusTooltip("speed", event.clientX, event.clientY));
  roadRoutePin.addEventListener("pointermove", event => positionRoadStatusTooltip(event.clientX, event.clientY));
  roadRoutePin.addEventListener("pointerleave", hideRoadStatusTooltip);
  roadRoutePin.addEventListener("focus", () => {
    const rect = roadRoutePin.getBoundingClientRect();
    showRoadStatusTooltip("speed", rect.right, rect.bottom);
  });
  roadRoutePin.addEventListener("blur", hideRoadStatusTooltip);
  gameClockDate.addEventListener("pointerenter", event => showContractTooltip(event.clientX, event.clientY));
  gameClockDate.addEventListener("pointermove", event => positionFloatingTooltip(contractTooltip, event.clientX, event.clientY));
  gameClockDate.addEventListener("pointerleave", hideContractTooltip);
  gameClockDate.addEventListener("focus", () => {
    const rect = gameClockDate.getBoundingClientRect();
    showContractTooltip(rect.left, rect.bottom);
  });
  gameClockDate.addEventListener("blur", hideContractTooltip);
  cargoWagonSummary?.addEventListener("pointerenter", event => showCargoWagonTooltip(event.clientX, event.clientY));
  cargoWagonSummary?.addEventListener("pointermove", event => positionFloatingTooltip(cargoWagonTooltip, event.clientX, event.clientY));
  cargoWagonSummary?.addEventListener("pointerleave", hideCargoWagonTooltip);
  cargoWagonSummary?.addEventListener("focus", () => {
    const rect = cargoWagonSummary.getBoundingClientRect();
    showCargoWagonTooltip(rect.left, rect.bottom);
  });
  cargoWagonSummary?.addEventListener("blur", hideCargoWagonTooltip);
  window.addEventListener("resize", () => {
    hideRoadStatusTooltip();
    hideCargoWagonTooltip();
    hideContractTooltip();
  });
}

function updateRoadConditionUi() {
  updateCargoWagonUi();
  const travel = account?.travel;
  const visible = Boolean(travel && travel.mode === "road");
  roadConditionPanel.hidden = !visible;
  horseFeedControls.hidden = !visible;
  if (horseWhipHitbox) {
    const horse = normalizeHorseState(account?.horse);
    const lowHealth = horse.health <= 33;
    horseWhipHitbox.hidden = !visible;
    horseWhipHitbox.disabled = !travel?.moving || lowHealth;
    horseWhipHitbox.setAttribute("aria-label", lowHealth
      ? "말의 체력이 33 이하라 채찍질할 수 없습니다"
      : travel?.moving ? "말 채찍질" : "이동 중에만 채찍질할 수 있습니다");
    horseWhipHitbox.title = lowHealth ? "말의 체력이 33 이하라 채찍질할 수 없습니다." : "";
  }
  if (!visible) {
    if (roadWheelReplace) roadWheelReplace.hidden = true;
    hideRoadStatusTooltip();
    return;
  }

  const horse = normalizeHorseState(account.horse);
  const wagon = normalizeWagonState(account.wagon);
  const conditions = getCurrentRoadConditions();
  roadConditionMarkers.forEach(marker => {
    const kind = marker.dataset.roadCondition;
    const label = marker.querySelector("span");
    marker.classList.remove("is-warning", "is-danger");
    if (kind === "horse") {
      const health = label.querySelector("[data-horse-health]");
      const hunger = label.querySelector("[data-horse-hunger]");
      if (health) health.textContent = String(Math.round(horse.health));
      if (hunger) hunger.textContent = String(Math.round(horse.hunger));
      const lowest = Math.min(horse.health, horse.hunger);
      marker.classList.toggle("is-warning", lowest <= 50 && lowest > 25);
      marker.classList.toggle("is-danger", lowest <= 25);
      marker.setAttribute("aria-label", `말 상태, 체력 ${Math.round(horse.health)}, 허기 ${Math.round(horse.hunger)}`);
    } else if (kind === "surface") {
      label.textContent = "노면 상태";
      const terrainDuration = currentTerrainDuration(conditions.terrains);
      const combinedSpeed = currentRoadSpeedMultiplier(conditions.roadSurfaces) / terrainDuration;
      marker.classList.toggle("is-warning", combinedSpeed < 1 && combinedSpeed > 0.5);
      marker.classList.toggle("is-danger", combinedSpeed <= 0.5);
      marker.setAttribute("aria-label", `노면 상태, 지형 ${conditions.terrains.join(", ") || "미분류"}, 노면 ${conditions.roadSurfaces.join(", ")}`);
    } else if (kind === "environment") {
      label.textContent = "환경";
      marker.classList.toggle("is-warning", ["비", "눈"].includes(conditions.weather) || conditions.environments.some(value => ["추위", "다습"].includes(value)));
      marker.classList.toggle("is-danger", ["폭우", "폭설"].includes(conditions.weather) || conditions.environments.includes("혹한"));
      marker.setAttribute("aria-label", `환경, 지역 ${conditions.environments.join(", ") || "미분류"}, ${conditions.season}, ${conditions.weather}`);
    } else {
      label.textContent = "짐마차 상태";
      marker.classList.toggle("is-warning", wagon.condition <= 50 && wagon.condition > 25);
      marker.classList.toggle("is-danger", wagon.condition <= 25);
      marker.setAttribute("aria-label", `짐마차 상태 ${Math.round(wagon.condition)}`);
    }
  });
  if (roadWheelReplace) {
    const spareWheelCount = window.ProjectWCargo.getItemQuantity(SPARE_WHEEL_ITEM_ID);
    const canReplaceWheel = wagon.effects.includes("수레바퀴 손상") && spareWheelCount > 0;
    roadWheelReplace.hidden = !canReplaceWheel;
    roadWheelReplace.title = canReplaceWheel ? `예비 수레 바퀴를 사용합니다 · 보유 ${spareWheelCount}개` : "";
    roadWheelReplace.setAttribute("aria-label", `바퀴 교체, 예비 수레 바퀴 ${spareWheelCount}개 보유`);
  }
}

function whipHorse(event) {
  const travel = account?.travel;
  if (!travel?.moving || travel.mode !== "road" || isTravelClockPaused()) return;
  account.horse = normalizeHorseState(account.horse);
  if (account.horse.health <= 33) {
    updateRoadConditionUi();
    return;
  }
  const currentRate = clampNumber(Number(travel.progressRate), 0.1, MAX_TRAVEL_RATE, 1);
  const remainingProgress = liveSegmentRemainingMs(travel);
  const healthLoss = Math.floor(Math.random() * 3);
  const timeReductionSeconds = Math.floor(Math.random() * 2);

  account.horse.health = Math.max(0, account.horse.health - healthLoss);
  travel.segmentRemainingMs = Math.max(0, remainingProgress - (timeReductionSeconds * 1000 * currentRate));
  travel.progressRate = calculateTravelRate(currentScene, travel);
  travel.progressUpdatedAt = Date.now();

  window.ProjectWAudio?.playEffect("whip");
  if (healthLoss > 0) window.setTimeout(() => window.ProjectWAudio?.playEffect("horseBreath", .56), 45);
  showHorseWhipFloatingNumber(event, healthLoss, timeReductionSeconds);
  persistAccount();
  syncTravelExperience();
  scheduleTravelStep();
}

function showHorseWhipFloatingNumber(event, healthLoss, timeReductionSeconds) {
  if (!roadScene || !horseWhipHitbox) return;
  const sceneRect = roadScene.getBoundingClientRect();
  const hitRect = horseWhipHitbox.getBoundingClientRect();
  const indicator = document.createElement("span");
  const damage = document.createElement("strong");
  const time = document.createElement("small");
  indicator.className = "horse-whip-floating-damage";
  damage.textContent = healthLoss > 0 ? `−${healthLoss}` : "0";
  time.textContent = timeReductionSeconds > 0 ? `다음 지점 −${timeReductionSeconds}초` : "시간 단축 없음";
  indicator.style.left = `${(Number(event?.clientX) || hitRect.left + (hitRect.width / 2)) - sceneRect.left}px`;
  indicator.style.top = `${(Number(event?.clientY) || hitRect.top + (hitRect.height / 2)) - sceneRect.top}px`;
  indicator.append(damage, time);
  roadScene.append(indicator);
  window.setTimeout(() => indicator.remove(), 1100);
}

function replaceDamagedWheel() {
  if (!account) return false;
  account.wagon = normalizeWagonState(account.wagon);
  if (!account.wagon.effects.includes("수레바퀴 손상")) {
    updateRoadConditionUi();
    return false;
  }
  if (!window.ProjectWCargo.consumeItem(SPARE_WHEEL_ITEM_ID, 1)) {
    showGameNotice("교체에 사용할 예비 수레 바퀴가 없습니다.");
    updateRoadConditionUi();
    return false;
  }
  account.wagon.effects = account.wagon.effects.filter(effect => effect !== "수레바퀴 손상");
  persistAccount();
  updateRoadConditionUi();
  updateTravelDisplays();
  showGameNotice("바퀴를 교체했습니다.");
  return true;
}

function currentTerrainDuration(terrains = getCurrentRoadConditions().terrains) {
  return terrains.reduce((maximum, terrain) => Math.max(maximum, TERRAIN_DURATION_MULTIPLIERS.get(terrain) ?? 1), 1);
}

function currentRoadSpeedMultiplier(roadSurfaces = getCurrentRoadConditions().roadSurfaces) {
  return roadSurfaces.reduce((product, surface) => product * (ROAD_SURFACE_SPEED_MULTIPLIERS.get(surface) ?? 1), 1);
}

function updateHorseFeedUi() {
  if (!horseFeedButton || !horseFeedChange) return;
  const quantities = new Map(HORSE_FEED_IDS.map(itemId => [itemId, window.ProjectWCargo.getItemQuantity(itemId)]));
  const availableIds = HORSE_FEED_IDS.filter(itemId => quantities.get(itemId) > 0);
  if (account && (!HORSE_FEED_IDS.includes(account.horseFeedItemId) || !quantities.get(account.horseFeedItemId))) {
    account.horseFeedItemId = availableIds[0] || HORSE_FEED_IDS[0];
  }

  const selectedId = account?.horseFeedItemId || HORSE_FEED_IDS[0];
  const definition = window.ProjectWCargo.getItemDefinition(selectedId);
  const quantity = quantities.get(selectedId) || 0;
  const itemName = definition?.displayName || selectedId;
  const buttonLabel = horseFeedButton.querySelector("span");
  if (buttonLabel) buttonLabel.textContent = `${itemName} 먹이기`;
  if (horseFeedCount) {
    const countLabel = horseFeedCount.querySelector("b");
    if (countLabel) countLabel.textContent = `x${formatCompactNumber(quantity)}`;
    horseFeedCount.setAttribute("aria-label", `등록된 ${itemName} ${formatCompactNumber(quantity)}개`);
    horseFeedCount.classList.toggle("is-empty", quantity <= 0);
  }
  horseFeedButton.disabled = !account || quantity <= 0;
  horseFeedButton.title = quantity > 0 ? `${itemName} 먹이기 · ${quantity}개 보유` : "먹일 수 있는 말 먹이가 없습니다.";
  horseFeedButton.setAttribute("aria-label", horseFeedButton.title);
  horseFeedChange.hidden = availableIds.length < 2;
  horseFeedChange.title = availableIds.length >= 2 ? "먹일 아이템 변경" : "선택 가능한 다른 말 먹이가 없습니다.";
}

function changeHorseFeed() {
  if (!account) return;
  const availableIds = HORSE_FEED_IDS.filter(itemId => window.ProjectWCargo.getItemQuantity(itemId) > 0);
  if (availableIds.length < 2) return;
  const currentIndex = availableIds.indexOf(account.horseFeedItemId);
  account.horseFeedItemId = availableIds[(currentIndex + 1) % availableIds.length];
  persistAccount();
  updateHorseFeedUi();
  const definition = window.ProjectWCargo.getItemDefinition(account.horseFeedItemId);
  showGameNotice(`${definition?.displayName || account.horseFeedItemId}(으)로 먹이를 변경했습니다.`);
}

function feedHorse() {
  if (!account) return;
  const itemId = HORSE_FEED_IDS.includes(account.horseFeedItemId) ? account.horseFeedItemId : HORSE_FEED_IDS[0];
  if (isTutorialActive(TUTORIAL_IDS.HORSE_FEED)
    && normalizeTutorialProgress(account.tutorialProgress).step === 1
    && itemId !== HORSE_FEED_IDS[0]) {
    showGameNotice("이번 튜토리얼에서는 건초를 먹여 주세요.");
    return;
  }
  const definition = window.ProjectWCargo.getItemDefinition(itemId);
  if (!definition || window.ProjectWCargo.getItemQuantity(itemId) <= 0) {
    updateHorseFeedUi();
    showGameNotice("먹일 수 있는 말 먹이가 없습니다.");
    return;
  }

  if (account.travel?.moving) reconcileTravelProgress(false);
  const horse = normalizeHorseState(account.horse);
  const hungerRecovery = Math.max(0, Number(definition.horseHungerRecovery) || 0);
  const healthRecovery = Math.max(0, Number(definition.horseHealthRecovery) || 0);
  const nextHunger = Math.min(horse.maxHunger, horse.hunger + hungerRecovery);
  const nextHealth = Math.min(horse.maxHealth, horse.health + healthRecovery);
  if (nextHunger === horse.hunger && nextHealth === horse.health) {
    showGameNotice("말은 지금 먹이가 필요하지 않습니다.");
    return;
  }

  if (!window.ProjectWCargo.consumeItem(itemId, 1)) return;
  const restoredHunger = nextHunger - horse.hunger;
  const restoredHealth = nextHealth - horse.health;
  horse.hunger = nextHunger;
  horse.health = nextHealth;
  account.horse = horse;
  if (account.travel?.moving) {
    account.travel.progressRate = calculateTravelRate(currentScene, account.travel);
    account.travel.progressUpdatedAt = Date.now();
  }
  persistAccount();
  syncTravelExperience();
  scheduleTravelStep();
  if (isTutorialActive(TUTORIAL_IDS.HORSE_FEED)
    && normalizeTutorialProgress(account.tutorialProgress).step === 1) {
    setTutorialStep(2);
  }
  const recovered = [
    restoredHunger > 0 ? `허기 +${Math.round(restoredHunger)}` : "",
    restoredHealth > 0 ? `체력 +${Math.round(restoredHealth)}` : ""
  ].filter(Boolean);
  showGameNotice(`${definition.displayName}을(를) 먹였습니다${recovered.length ? ` · ${recovered.join(" · ")}` : ""}.`);
}

function showRoadStatusTooltip(kind, clientX, clientY) {
  if (!account || !roadStatusTooltip) return;
  roadStatusTooltip.classList.toggle("is-horse", kind === "horse");
  roadStatusTooltip.replaceChildren(buildRoadStatusTooltip(kind));
  roadStatusTooltip.hidden = false;
  positionRoadStatusTooltip(clientX, clientY);
}

function updateCargoWagonUi() {
  if (!cargoWagonSummary || !cargoWagonCondition || !cargoWagonEffects) return;
  const wagon = normalizeWagonState(account?.wagon);
  cargoWagonCondition.textContent = `${formatCompactNumber(wagon.condition)} / ${formatCompactNumber(wagon.maxCondition)}`;
  cargoWagonEffects.textContent = wagon.effects.length ? `상태이상 ${wagon.effects.length}` : "상태이상 없음";
  cargoWagonSummary.classList.toggle("is-warning", wagon.condition <= 50 && wagon.condition > 25);
  cargoWagonSummary.classList.toggle("is-danger", wagon.condition <= 25);
  cargoWagonSummary.classList.toggle("has-effects", wagon.effects.length > 0);
  cargoWagonSummary.setAttribute("aria-label", `짐마차 상태 ${Math.round(wagon.condition)} / ${Math.round(wagon.maxCondition)}, ${wagon.effects.join(", ") || "상태이상 없음"}`);
}

function showCargoWagonTooltip(clientX, clientY) {
  if (!account || !cargoWagonTooltip) return;
  cargoWagonTooltip.replaceChildren(buildRoadStatusTooltip("wagon"));
  cargoWagonTooltip.hidden = false;
  positionFloatingTooltip(cargoWagonTooltip, clientX, clientY);
}

function hideCargoWagonTooltip() {
  if (cargoWagonTooltip) cargoWagonTooltip.hidden = true;
}

function buildRoadStatusTooltip(kind) {
  const fragment = document.createDocumentFragment();
  const header = document.createElement("header");
  const title = document.createElement("strong");
  const rows = [];

  if (kind === "speed") {
    const travel = account?.travel;
    const rate = travel?.moving
      ? clampNumber(Number(travel.progressRate), 0.1, MAX_TRAVEL_RATE, 1)
      : calculateTravelRate("road", travel);
    title.textContent = "현재 이동속도";
    rows.push(["최종 반영", `기본 속도의 ${Math.round(rate * 100)}%`]);
    const load = window.ProjectWCargo.getLoadSummary();
    if (load.overweightPercent > 0) {
      rows.push(["과적", `+${formatCompactNumber(load.overweightPercent)}% · 속도 -${formatCompactNumber(load.speedPenaltyPercent)}%`, "is-danger"]);
    } else rows.push(["과적", "없음", "is-healthy"]);
  } else if (kind === "horse") {
    const horse = normalizeHorseState(account.horse);
    title.textContent = "말 상태";
    rows.push(["체력", `${Math.round(horse.health)} / ${Math.round(horse.maxHealth)}`, conditionTextClass(horse.health)]);
    rows.push(["허기", `${Math.round(horse.hunger)} / ${Math.round(horse.maxHunger)}`, conditionTextClass(horse.hunger)]);
  } else if (kind === "surface") {
    const conditions = getCurrentRoadConditions();
    title.textContent = "노면 상태";
    rows.push(["지형", describeTerrainConditions(conditions.terrains), "", "condition"]);
    rows.push(["노면", describeRoadSurfaceConditions(conditions.roadSurfaces), "", "condition"]);
  } else if (kind === "environment") {
    const conditions = getCurrentRoadConditions();
    title.textContent = "환경";
    rows.push(["지역 환경", describeRegionalEnvironment(conditions.environments), "", "environment"]);
    rows.push(["계절", `${conditions.season} · ${describeSeasonRisk(conditions.season)}`, "", "environment"]);
    rows.push(["날씨 환경", `${conditions.weather} · ${describeWeatherRisk(conditions.weather)}`, "", "environment"]);
  } else {
    const wagon = normalizeWagonState(account.wagon);
    title.textContent = "짐마차 상태";
    rows.push(["상태", `${Math.round(wagon.condition)} / ${Math.round(wagon.maxCondition)}`, conditionTextClass(wagon.condition)]);
    rows.push(["상태이상", describeWagonEffects(wagon.effects), "", "wagonEffects"]);
  }

  header.append(title);
  const list = document.createElement("dl");
  if (kind === "environment") list.classList.add("road-environment-list");
  rows.forEach(([term, description, valueClass, presentation]) => {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    if (presentation === "condition") appendConditionEffects(dd, description);
    else if (presentation === "environment") appendEnvironmentEffects(dd, description);
    else if (presentation === "wagonEffects") appendWagonEffectRows(dd, description);
    else appendRiskHighlightedText(dd, description);
    if (valueClass) {
      dt.classList.add(valueClass);
      dd.classList.add(valueClass);
    }
    list.append(dt, dd);
  });
  fragment.append(header, list);
  return fragment;
}

function appendEnvironmentEffects(target, value) {
  String(value ?? "—").split(" / ").forEach(entry => {
    const line = document.createElement("span");
    line.className = "road-environment-line";
    const [state, ...effects] = entry.split(" · ");
    const stateLabel = document.createElement("strong");
    stateLabel.textContent = state || "미분류";
    const effectLabel = document.createElement("span");
    appendRiskHighlightedText(effectLabel, effects.join(" · ") || "변동 없음");
    line.append(stateLabel, effectLabel);
    target.append(line);
  });
}

function appendConditionEffects(target, value) {
  String(value ?? "—").split(" / ").forEach(entry => {
    const line = document.createElement("span");
    line.className = "road-condition-line";
    const [state, ...effects] = entry.split(" · ");
    const stateLabel = document.createElement("span");
    stateLabel.className = "road-condition-state";
    stateLabel.textContent = state;
    line.append(stateLabel);
    if (effects.length) {
      const effectLabel = document.createElement("span");
      effectLabel.className = "road-condition-effect";
      appendRiskHighlightedText(effectLabel, effects.join(" · "));
      line.append(effectLabel);
    }
    target.append(line);
  });
}

function appendWagonEffectRows(target, value) {
  const entries = String(value ?? "없음").split(" / ");
  entries.forEach(entry => {
    const line = document.createElement("span");
    line.className = "wagon-effect-line";
    const [state, ...effects] = entry.split(" · ");
    const stateLabel = document.createElement("strong");
    stateLabel.textContent = state;
    line.append(stateLabel);
    if (effects.length) {
      const effectLabel = document.createElement("span");
      appendRiskHighlightedText(effectLabel, effects.join(" · "));
      line.append(effectLabel);
    }
    target.append(line);
  });
}

function appendRiskHighlightedText(target, value) {
  String(value ?? "—").split(/(습기|파손)/g).forEach(fragment => {
    if (!fragment) return;
    if (fragment !== "습기" && fragment !== "파손") {
      target.append(document.createTextNode(fragment));
      return;
    }
    const emphasis = document.createElement("strong");
    emphasis.className = fragment === "습기" ? "risk-term-moisture" : "risk-term-breakage";
    emphasis.textContent = fragment;
    target.append(emphasis);
  });
}

function conditionTextClass(value) {
  if (value <= 25) return "is-danger";
  if (value <= 50) return "is-warning";
  return "is-healthy";
}

function describeWagonEffects(effects = []) {
  if (!effects.length) return "없음";
  return effects.map(effect => {
    const description = WAGON_EFFECT_DESCRIPTIONS.get(effect);
    return description ? `${effect} · ${description}` : effect;
  }).join(" / ");
}

function formatDurationEffect(multiplier) {
  const increase = Math.round((multiplier - 1) * 100);
  return increase > 0 ? `이동 시간 +${increase}%` : "변경 없음";
}

function describeTerrainConditions(terrains) {
  if (!terrains.length) return "미분류 · 이동속도 변경 없음";
  return terrains.map(terrain => {
    const speed = TERRAIN_SPEED_LABELS.get(terrain);
    if (speed == null || speed === 0) return `${terrain} · 이동속도 변경 없음`;
    return `${terrain} · 이동속도 ${speed}%`;
  }).join(" / ");
}

function describeRoadSurfaceConditions(roadSurfaces) {
  return roadSurfaces.map(surface => {
    const speedMultiplier = ROAD_SURFACE_SPEED_MULTIPLIERS.get(surface) ?? 1;
    const speedPercent = Math.round((speedMultiplier - 1) * 100);
    const speedText = speedPercent === 0
      ? "이동속도 변경 없음"
      : `이동속도 ${speedPercent > 0 ? "+" : ""}${speedPercent}%`;
    const riskText = surface === "거친 길"
      ? "화물 파손 위험 증가"
      : surface === "관리된 길"
        ? "화물 파손 위험 감소"
        : "파손 위험 변동 없음";
    return `${surface} · ${speedText} · ${riskText}`;
  }).join(" / ");
}

function describeRegionalEnvironment(environments) {
  if (!environments.length) return "미분류 · 변동 없음";
  return environments.map(environment => {
    if (environment === "다습") return `${environment} · 화물 습기 위험 증가`;
    if (environment === "추위" || environment === "혹한") return `${environment} · 화물 습기 위험 감소`;
    return `${environment} · 변동 없음`;
  }).join(" / ");
}

function describeSeasonRisk(season) {
  if (season === "여름") return "화물 습기 위험 증가";
  if (season === "겨울") return "화물 습기 위험 감소";
  return "변동 없음";
}

function describeWeatherRisk(weather) {
  if (weather === "비" || weather === "폭우") return "화물 습기 위험 증가";
  if (weather === "눈" || weather === "폭설") return "화물 습기 위험 감소";
  return "변동 없음";
}

function positionRoadStatusTooltip(clientX, clientY) {
  positionFloatingTooltip(roadStatusTooltip, clientX, clientY);
}

function showContractTooltip(clientX, clientY) {
  if (!contractTooltip) return;
  const time = normalizeWorldTime(account?.worldTime);
  contractTooltip.textContent = `나하나와의 계약 ${time.day}일차`;
  contractTooltip.hidden = false;
  positionFloatingTooltip(contractTooltip, clientX, clientY);
}

function hideContractTooltip() {
  if (contractTooltip) contractTooltip.hidden = true;
}

function positionFloatingTooltip(tooltip, clientX, clientY) {
  if (!tooltip || tooltip.hidden) return;
  const margin = 12;
  const gap = 16;
  const rect = tooltip.getBoundingClientRect();
  let left = clientX + gap;
  let top = clientY + gap;
  if (left + rect.width > window.innerWidth - margin) left = clientX - rect.width - gap;
  if (top + rect.height > window.innerHeight - margin) top = clientY - rect.height - gap;
  tooltip.style.left = `${Math.round(clampNumber(left, margin, window.innerWidth - rect.width - margin, margin))}px`;
  tooltip.style.top = `${Math.round(clampNumber(top, margin, window.innerHeight - rect.height - margin, margin))}px`;
}

function hideRoadStatusTooltip() {
  if (!roadStatusTooltip) return;
  roadStatusTooltip.hidden = true;
  roadStatusTooltip.classList.remove("is-horse");
}

function initCustomCursor() {
  if (!gameCursor || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  gameCursor.addEventListener("load", () => document.documentElement.classList.add("has-project-cursor"));
  gameCursor.addEventListener("error", () => {
    document.documentElement.classList.remove("has-project-cursor");
    gameCursor.hidden = true;
  });
  document.addEventListener("pointermove", event => {
    gameCursor.style.left = `${event.clientX}px`;
    gameCursor.style.top = `${event.clientY}px`;
    gameCursor.hidden = false;
    const target = event.target instanceof Element ? event.target : null;
    const help = Boolean(target?.closest(".map-view-placement-layer .map-marker, .road-route-point, .road-route-weather-marker, .road-route-pin, [data-road-condition], #horse-whip-hitbox, .horse-feed-controls button, .camp-item-option, .toolbar-date, .cargo-slot.is-occupied, .cargo-weight-panel, .cargo-wagon-summary, .wallet-currency, .merchant-path-window button, .memorial-window button, .meal-window button, .meal-modal-layer > button, .window-side-button, [data-advanced-launcher] button, .service-window button, .service-modal-layer > button, .inn-window button, .partner-event-alert, .partner-event-panel button"));
    setCustomCursorMode(help ? "help" : "default");
  });
  document.documentElement.addEventListener("pointerleave", () => { gameCursor.hidden = true; });
  window.addEventListener("blur", () => { gameCursor.hidden = true; });
  setCustomCursorMode("default", true);
}

function setCustomCursorMode(mode, force = false) {
  const normalizedMode = mode === "help" ? "help" : "default";
  const assetId = normalizedMode === "help" ? "Asset_Cursor_2" : "Asset_Cursor_1";
  const source = assetMap.get(assetId) ?? assetFallbacks.get(assetId);
  if (!source) return;
  if (!force && customCursorMode === normalizedMode && gameCursor.src === source) return;
  customCursorMode = normalizedMode;
  gameCursor.dataset.assetId = assetId;
  gameCursor.src = source;
}

function updateCustomCursorAsset() {
  setCustomCursorMode(customCursorMode || "default", true);
}

function advancedTutorialDefinition(id) {
  return ADVANCED_TUTORIAL_DEFINITIONS.find(definition => definition.id === String(id || "")) || null;
}

function advancedTutorialIsUnlocked(definition) {
  if (!definition) return false;
  if (definition.requiresRoadRoute && (account?.travel?.mode !== "road" || !account.travel.routePath?.length)) return false;
  const keys = Array.isArray(definition.unlockKeys)
    ? definition.unlockKeys
    : definition.unlockKey
      ? [definition.unlockKey]
      : [];
  return keys.every(isFeatureUnlocked);
}

function advancedTutorialIsRead(id) {
  return normalizeAdvancedTutorialState(account?.advancedTutorials).readIds.includes(String(id || ""));
}

function advancedTutorialsForContext(context) {
  const normalized = String(context || "").trim();
  if (!normalized) return [];
  return ADVANCED_TUTORIAL_DEFINITIONS.filter(definition => definition.contexts.includes(normalized));
}

function currentAdvancedScreenContext() {
  if (!account || gameScreen?.hidden || !advancedTutorialLayer?.hidden) return "";
  if (!dialogModal?.hidden || !informationAcquiredModal?.hidden || !innModal?.hidden
    || !partnerEventPanel?.hidden || !partnerFeaturePanel?.hidden) return "";
  if (!walletModal?.hidden) return "wallet";
  if (!informationModal?.hidden) return "information";
  if (!merchantPathModal?.hidden) return "merchant-path";
  if (!memorialModal?.hidden) return "memorial";
  if (!serviceModal?.hidden) return activeServiceContext?.type === "상업조합" ? "guild" : "";
  if (!tradeModal?.hidden || !mealModal?.hidden || campSetupOpen || !entryTaxModal?.hidden || !routeEventModal?.hidden) return "";
  if (currentScene === "road") return account?.travel?.mode === "road" ? "road" : "";
  return ["partner", "cargo"].includes(currentScene) ? currentScene : "";
}

function renderAdvancedTutorialLauncher(launcher, context) {
  if (!launcher) return;
  const definitions = advancedTutorialsForContext(context);
  const menu = launcher.querySelector(".advanced-tutorial-menu");
  const toggle = launcher.querySelector(".advanced-tutorial-toggle");
  const contextChanged = launcher.dataset.advancedContext !== (context || "");
  launcher.dataset.advancedContext = context || "";
  if (contextChanged && menu) menu.hidden = true;
  if (contextChanged) toggle?.setAttribute("aria-expanded", "false");
  launcher.hidden = !account || !definitions.length;
  if (launcher.hidden) {
    if (menu) menu.hidden = true;
    toggle?.setAttribute("aria-expanded", "false");
    return;
  }
  const unread = definitions.some(definition => advancedTutorialIsUnlocked(definition) && !advancedTutorialIsRead(definition.id));
  toggle?.classList.toggle("is-unread", unread);
  if (toggle) {
    toggle.title = unread ? "아직 읽지 않은 심화 안내가 있습니다." : "이 화면의 심화 안내를 확인합니다.";
    const subtitle = toggle.querySelector("span:last-child");
    if (launcher.classList.contains("advanced-tutorial-type-a") && subtitle) subtitle.textContent = `${definitions.length}개 안내`;
  }
  if (!menu) return;
  const fragment = document.createDocumentFragment();
  definitions.forEach(definition => {
    const unlocked = advancedTutorialIsUnlocked(definition);
    const button = document.createElement("button");
    const label = document.createElement("span");
    const status = document.createElement("small");
    button.type = "button";
    button.className = "advanced-tutorial-item";
    button.dataset.advancedTutorialId = definition.id;
    button.disabled = !unlocked;
    button.title = unlocked ? definition.label : (definition.lockLabel || "진행 후 해금됩니다.");
    button.classList.toggle("is-unread", unlocked && !advancedTutorialIsRead(definition.id));
    label.textContent = ADVANCED_TUTORIAL_MENU_LABELS[definition.id] || definition.label;
    status.textContent = unlocked
      ? (advancedTutorialIsRead(definition.id) ? "읽음" : "새 안내")
      : (definition.lockLabel || "진행 후 해금");
    button.append(label, status);
    fragment.append(button);
  });
  menu.replaceChildren(fragment);
}

function refreshAdvancedTutorialLaunchers() {
  if (!advancedTutorialLaunchers.length) return;
  if (tutorialRuntime || (advancedTutorialRuntime && advancedTutorialLayer && !advancedTutorialLayer.hidden)) {
    advancedTutorialLaunchers.forEach(launcher => renderAdvancedTutorialLauncher(launcher, ""));
    return;
  }
  if (dialogModal && !dialogModal.hidden) {
    advancedTutorialLaunchers.forEach(launcher => renderAdvancedTutorialLauncher(launcher, ""));
    return;
  }
  const tradeType = String(tradeModal?.dataset?.facilityType || "").trim();
  const tradeContext = !tradeModal?.hidden && ["상회", "교역소", "좌판", "시장"].includes(tradeType)
    ? `trade:${tradeType}`
    : "";
  const mealContext = !mealModal?.hidden
    && mealModal.dataset.mealVendor === "주점"
    && (mealModal.dataset.mealKind || "meal") === "meal"
    && mealMenuView && !mealMenuView.hidden
    ? "meal"
    : "";
  const campContext = campSetupOpen && campSetup && !campSetup.hidden ? "camp" : "";
  const innContext = !innModal?.hidden ? "inn" : "";
  advancedTutorialLaunchers.forEach(launcher => {
    const type = launcher.dataset.advancedLauncher;
    const context = type === "trade"
      ? tradeContext
      : type === "meal"
        ? mealContext
        : type === "camp"
          ? campContext
          : type === "inn"
            ? innContext
          : type === "screen"
            ? currentAdvancedScreenContext()
            : "";
    renderAdvancedTutorialLauncher(launcher, context);
  });
}

function closeAdvancedTutorialMenus(except = null) {
  advancedTutorialLaunchers.forEach(launcher => {
    if (launcher === except) return;
    const menu = launcher.querySelector(".advanced-tutorial-menu");
    const toggle = launcher.querySelector(".advanced-tutorial-toggle");
    if (menu) menu.hidden = true;
    toggle?.setAttribute("aria-expanded", "false");
  });
}

function handleAdvancedTutorialLauncherClick(event) {
  const launcher = event.currentTarget;
  const item = event.target.closest("button[data-advanced-tutorial-id]");
  if (item) {
    event.preventDefault();
    event.stopPropagation();
    if (!item.disabled) void startAdvancedTutorial(item.dataset.advancedTutorialId);
    return;
  }
  const toggle = event.target.closest(".advanced-tutorial-toggle");
  if (!toggle) return;
  event.preventDefault();
  event.stopPropagation();
  const definitions = advancedTutorialsForContext(launcher.dataset.advancedContext);
  const only = definitions.length === 1 ? definitions[0] : null;
  if (only && advancedTutorialIsUnlocked(only)) {
    void startAdvancedTutorial(only.id);
    return;
  }
  const menu = launcher.querySelector(".advanced-tutorial-menu");
  if (!menu) return;
  const opening = menu.hidden;
  closeAdvancedTutorialMenus(opening ? launcher : null);
  menu.hidden = !opening;
  toggle.setAttribute("aria-expanded", String(opening));
}

async function startAdvancedTutorial(id) {
  const definition = advancedTutorialDefinition(id);
  if (!definition || !advancedTutorialIsUnlocked(definition)) return false;
  if (tutorialRuntime) {
    showGameNotice("진행 중인 튜토리얼을 마친 뒤 심화 안내를 확인할 수 있습니다.");
    return false;
  }
  if (advancedTutorialRuntime) closeAdvancedTutorial(false);
  closeAdvancedTutorialMenus();
  let previewOpened = false;
  if (definition.previewMerchantPath) {
    await window.ProjectWMerchantPath.restoreResumeState?.({ selectedArticle: 4, selectedArticleFourSection: 2 });
    previewOpened = Boolean(window.ProjectWMerchantPath.getResumeState?.());
  }
  pauseTravelClock("advanced-tutorial");
  advancedTutorialRuntime = {
    id: definition.id,
    step: 0,
    previewOpened,
    activePreview: "",
    partnerAppetiteWasOpen: partnerAppetiteOpen
  };
  renderAdvancedTutorial();
  return true;
}

function syncAdvancedTutorialPreview(page) {
  if (!advancedTutorialRuntime) return;
  const nextPreview = String(page?.preview || "");
  if (advancedTutorialRuntime.activePreview === nextPreview) return;
  window.ProjectWMeal?.hideAdvancedTutorialPreview?.();
  if (advancedTutorialRuntime.activePreview === "partner-appetite"
    && !advancedTutorialRuntime.partnerAppetiteWasOpen) {
    partnerAppetiteOpen = false;
    renderPartnerAppetite();
  }
  advancedTutorialRuntime.activePreview = nextPreview;
  if (nextPreview === "meal-appetite") window.ProjectWMeal?.showAdvancedTutorialPreview?.("appetite");
  else if (nextPreview === "meal-menu") window.ProjectWMeal?.showAdvancedTutorialPreview?.("menu");
  else if (nextPreview === "partner-appetite") {
    partnerAppetiteOpen = true;
    renderPartnerAppetite();
  } else if (nextPreview === "cargo") {
    window.ProjectWMerchantPath?.close?.();
    if (currentScene !== "cargo") showScene("cargo", 1, true);
  }
}

function currentAdvancedTutorialPage() {
  const definition = advancedTutorialDefinition(advancedTutorialRuntime?.id);
  if (!definition) return { definition: null, page: null };
  return { definition, page: definition.pages[advancedTutorialRuntime.step] || null };
}

function renderAdvancedTutorialMessage(page) {
  if (!advancedTutorialMessage) return;
  advancedTutorialMessage.replaceChildren();
  const paragraph = document.createElement("p");
  paragraph.textContent = String(page?.text || "");
  advancedTutorialMessage.append(paragraph);
  if (Array.isArray(page?.summary) && page.summary.length) {
    const list = document.createElement("ul");
    list.className = "advanced-tutorial-summary-list";
    page.summary.forEach(copy => {
      const item = document.createElement("li");
      item.textContent = String(copy || "");
      list.append(item);
    });
    advancedTutorialMessage.append(list);
  }
}

function renderAdvancedTutorial() {
  if (!advancedTutorialRuntime || !advancedTutorialLayer) return;
  const { definition, page } = currentAdvancedTutorialPage();
  if (!definition || !page) {
    closeAdvancedTutorial(Boolean(definition));
    return;
  }
  advancedTutorialFocus.hidden = true;
  advancedTutorialLayer.hidden = false;
  syncAdvancedTutorialPreview(page);
  refreshAdvancedTutorialLaunchers();
  advancedTutorialTitle.textContent = page.title || definition.label;
  renderAdvancedTutorialMessage(page);
  advancedTutorialProgress.textContent = `${advancedTutorialRuntime.step + 1} / ${definition.pages.length}`;
  advancedTutorialContinue.textContent = advancedTutorialRuntime.step >= definition.pages.length - 1 ? "완료" : "다음";
  advancedTutorialCard?.classList.toggle("is-summary", Boolean(page.summary?.length));
  scheduleAdvancedTutorialPosition();
}

function isTutorialTargetMoving(target) {
  const scene = target?.closest(".scene-card");
  if (!scene) return false;
  // 화면 전환 중의 좌표를 최종 좌표로 고정하지 않는다.
  // 전환 종료 타이머와 실제 CSS transform 종료 사이도 계속 추적한다.
  return moving || (scene.getAnimations?.() || []).some(animation =>
    animation.playState === "running" && animation.transitionProperty === "transform");
}

function scheduleAdvancedTutorialPosition() {
  if (!advancedTutorialRuntime || !advancedTutorialLayer || advancedTutorialLayer.hidden) return;
  if (advancedTutorialPositionFrame) cancelAnimationFrame(advancedTutorialPositionFrame);
  advancedTutorialPositionFrame = requestAnimationFrame(positionAdvancedTutorial);
}

function positionAdvancedTutorial() {
  advancedTutorialPositionFrame = 0;
  if (!advancedTutorialRuntime || !advancedTutorialLayer || advancedTutorialLayer.hidden) return;
  const { page } = currentAdvancedTutorialPage();
  advancedTutorialFocusTarget = page?.selector ? document.querySelector(page.selector) : null;
  if (isTutorialTargetMoving(advancedTutorialFocusTarget)) scheduleAdvancedTutorialPosition();
  const rect = advancedTutorialFocusTarget?.getBoundingClientRect();
  const visible = rect && rect.width > 0 && rect.height > 0;
  advancedTutorialFocus.classList.toggle("is-screen-dimmer", !visible);
  advancedTutorialFocus.classList.toggle("is-diamond", page?.shape === "diamond" && visible);
  advancedTutorialCard.classList.remove("is-left", "is-right", "is-top", "is-bottom");
  if (!visible) {
    advancedTutorialFocus.style.left = "-4px";
    advancedTutorialFocus.style.top = "-4px";
    advancedTutorialFocus.style.width = "1px";
    advancedTutorialFocus.style.height = "1px";
    advancedTutorialCard.classList.add("is-bottom");
    advancedTutorialFocus.hidden = false;
    return;
  }
  const padding = Math.max(5, Number(page?.padding) || 10);
  const horizontal = rect.left + rect.width / 2;
  const vertical = rect.top + rect.height / 2;
  if (page?.shape === "diamond") {
    const side = (Math.min(rect.width, rect.height) / Math.SQRT2) + padding * 2;
    advancedTutorialFocus.style.left = `${horizontal - side / 2}px`;
    advancedTutorialFocus.style.top = `${vertical - side / 2}px`;
    advancedTutorialFocus.style.width = `${side}px`;
    advancedTutorialFocus.style.height = `${side}px`;
  } else {
    advancedTutorialFocus.style.left = `${Math.max(4, rect.left - padding)}px`;
    advancedTutorialFocus.style.top = `${Math.max(4, rect.top - padding)}px`;
    advancedTutorialFocus.style.width = `${Math.min(window.innerWidth - 8, rect.width + padding * 2)}px`;
    advancedTutorialFocus.style.height = `${Math.min(window.innerHeight - 8, rect.height + padding * 2)}px`;
  }
  if (horizontal > window.innerWidth * .62) advancedTutorialCard.classList.add("is-left");
  else if (horizontal < window.innerWidth * .38) advancedTutorialCard.classList.add("is-right");
  else if (vertical > window.innerHeight * .55) advancedTutorialCard.classList.add("is-top");
  else advancedTutorialCard.classList.add("is-bottom");
  advancedTutorialFocus.hidden = false;
}

function advanceAdvancedTutorial() {
  if (!advancedTutorialRuntime) return;
  const definition = advancedTutorialDefinition(advancedTutorialRuntime.id);
  if (!definition) {
    closeAdvancedTutorial(false);
    return;
  }
  if (advancedTutorialRuntime.step >= definition.pages.length - 1) {
    closeAdvancedTutorial(true);
    return;
  }
  advancedTutorialRuntime.step += 1;
  renderAdvancedTutorial();
}

function closeAdvancedTutorial(markRead = false) {
  const runtime = advancedTutorialRuntime;
  if (advancedTutorialPositionFrame) cancelAnimationFrame(advancedTutorialPositionFrame);
  advancedTutorialPositionFrame = 0;
  advancedTutorialFocusTarget = null;
  window.ProjectWMeal?.hideAdvancedTutorialPreview?.();
  if (runtime?.activePreview === "partner-appetite" && !runtime.partnerAppetiteWasOpen) {
    partnerAppetiteOpen = false;
    renderPartnerAppetite();
  }
  advancedTutorialRuntime = null;
  if (advancedTutorialLayer) advancedTutorialLayer.hidden = true;
  advancedTutorialCard?.classList.remove("is-left", "is-right", "is-top", "is-bottom", "is-summary");
  if (runtime?.previewOpened) window.ProjectWMerchantPath.close?.();
  if (runtime) resumeTravelClock("advanced-tutorial");
  if (markRead && account && runtime?.id) {
    account.advancedTutorials = normalizeAdvancedTutorialState(account.advancedTutorials);
    if (!account.advancedTutorials.readIds.includes(runtime.id)) account.advancedTutorials.readIds.push(runtime.id);
    persistAccount();
  }
  refreshAdvancedTutorialLaunchers();
}

function shouldStartTutorial(tutorialId) {
  if (!account) return false;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  return !progress.completed.includes(tutorialId) && (!progress.activeId || progress.activeId === tutorialId);
}

function hasReachedEarlyTutorialBranch() {
  return Boolean(account && normalizeTutorialProgress(account.tutorialProgress).earlyTutorialBranchReached);
}

function maybeStartEarlyFeatureTutorial(tutorialId) {
  if (!hasReachedEarlyTutorialBranch() || !shouldStartTutorial(tutorialId)) return false;
  return startTutorial(tutorialId);
}

function maybeStartEarlyPartnerTutorial() {
  if (!hasReachedEarlyTutorialBranch()) return false;
  unlockFeature("partnerSnack");
  if (currentScene !== "partner" || !shouldStartTutorial(TUTORIAL_IDS.EARLY_PARTNER)) return false;
  return startTutorial(TUTORIAL_IDS.EARLY_PARTNER);
}

function maybeStartEarlyToolbarTutorial() {
  if (!hasReachedEarlyTutorialBranch() || !shouldStartTutorial(TUTORIAL_IDS.TOP_TOOLBAR)) return false;
  return startTutorial(TUTORIAL_IDS.TOP_TOOLBAR);
}

function maybeStartHorseFeedTutorial(travel = account?.travel) {
  if (!account || !travel || travel.mode !== "road" || isNodeId(travel.positionId)) return false;
  const horse = normalizeHorseState(account.horse);
  if (horse.hunger > 80 || !shouldStartTutorial(TUTORIAL_IDS.HORSE_FEED)) return false;
  if (window.ProjectWCargo.getItemQuantity(HORSE_FEED_IDS[0]) <= 0) return false;
  travel.pendingRoadArrivalContinuation = true;
  account.horseFeedItemId = HORSE_FEED_IDS[0];
  persistAccount();
  syncTravelExperience();
  updateHorseFeedUi();
  const started = startTutorial(TUTORIAL_IDS.HORSE_FEED);
  if (!started) persistAccount();
  return started;
}

function resumePendingRoadArrivalContinuation(travel = account?.travel) {
  if (!travel || travel !== account?.travel || !travel.moving
    || travel.mode !== "road" || !travel.pendingRoadArrivalContinuation) return false;
  clearTravelTimers();
  travel.progressUpdatedAt = Date.now();
  persistAccount();
  void continueRoadArrivalAfterTutorial(travel);
  return true;
}

function maybeStartPendingTalkCardTutorial() {
  if (!account) return false;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (!hasReachedEarlyTutorialBranch()) return false;
  if (!progress.talkCardTutorialPending || !shouldStartTutorial(TUTORIAL_IDS.TALK_CARD)) return false;
  if (gameEntryInProgress || talkCardGenerationInProgress > 0 || pendingSystemMiniDialogueCount > 0
    || activeTalkCardId || tutorialRuntime
    || advancedTutorialRuntime || (tutorialLayer && !tutorialLayer.hidden)
    || (advancedTutorialLayer && !advancedTutorialLayer.hidden)) return false;
  const state = normalizeTalkCardState(account.talkCards);
  if (!state.hand.length) {
    progress.talkCardTutorialPending = false;
    account.tutorialProgress = progress;
    persistAccount();
    return false;
  }
  if (account.travel?.mode === "camp") {
    const hasUsableCampCard = state.hand.some(cardId => talkCardDefinitions.get(cardId)?.category === "야영");
    if (!hasUsableCampCard) return false;
  }
  const modalOpen = !dialogModal.hidden || !walletModal.hidden || !informationModal.hidden
    || !merchantPathModal.hidden || !memorialModal.hidden || !tradeModal.hidden || !mealModal.hidden
    || !innModal.hidden || !serviceModal.hidden || !entryTaxModal.hidden || !routeEventModal.hidden
    || !sceneTransition.hidden || (partnerEventPanel && !partnerEventPanel.hidden);
  if (modalOpen || travelPauseReasons.has("route-event-check") || travelPauseReasons.has("route-event")) return false;
  if (currentScene !== "partner") showScene("partner", 1, true);
  if (!startTutorial(TUTORIAL_IDS.TALK_CARD)) return false;
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  account.tutorialProgress.talkCardTutorialPending = false;
  persistAccount();
  return true;
}

function maybeStartPendingSootheTutorial() {
  if (!account) return false;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (!progress.sootheTutorialPending || !shouldStartTutorial(TUTORIAL_IDS.PARTNER_SOOTHE)) return false;
  if (!isFeatureUnlocked("partnerSnack")) return false;
  if (!partnerIsAngry()) {
    progress.sootheTutorialPending = false;
    account.tutorialProgress = progress;
    persistAccount();
    return false;
  }
  if (gameEntryInProgress || talkCardGenerationInProgress > 0
    || pendingSystemMiniDialogueCount > 0 || pendingRoadDialogueCount > 0
    || activeTalkCardId || activeNahanaSituationEventId || tutorialRuntime || advancedTutorialRuntime
    || (tutorialLayer && !tutorialLayer.hidden) || (advancedTutorialLayer && !advancedTutorialLayer.hidden)) return false;
  const modalOpen = !dialogModal.hidden || !walletModal.hidden || !informationModal.hidden
    || !merchantPathModal.hidden || !memorialModal.hidden || !tradeModal.hidden || !mealModal.hidden
    || !innModal.hidden || !serviceModal.hidden || !entryTaxModal.hidden || !routeEventModal.hidden
    || !sceneTransition.hidden || (partnerEventPanel && !partnerEventPanel.hidden);
  if (modalOpen || travelPauseReasons.has("route-event-check") || travelPauseReasons.has("route-event")) return false;
  if (currentScene !== "partner") showScene("partner", 1, true);
  if (!startTutorial(TUTORIAL_IDS.PARTNER_SOOTHE)) return false;
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  account.tutorialProgress.sootheTutorialPending = false;
  persistAccount();
  return true;
}

function narrativePresentationBlocked(options = {}) {
  if (!account || gameScreen.hidden || gameEntryInProgress
    || (activeNahanaSituationEventId && !options.ignoreSituationEvent)
    || talkCardGenerationInProgress > 0
    || pendingSystemMiniDialogueCount > 0
    || activeTalkCardId || travelPauseReasons.has("talk-card") || tutorialRuntime
    || pendingRoadDialogueCount > 0 || travelPauseReasons.has("road-comment")
    || travelPauseReasons.has("route-event-check") || travelPauseReasons.has("route-event")
    || advancedTutorialRuntime || (tutorialLayer && !tutorialLayer.hidden)
    || (advancedTutorialLayer && !advancedTutorialLayer.hidden)) return true;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (progress.activeId || (progress.talkCardTutorialPending && !options.ignoreTalkCardTutorialPending)) return true;
  return !dialogModal.hidden || !walletModal.hidden || !informationModal.hidden
    || !merchantPathModal.hidden || !memorialModal.hidden || !tradeModal.hidden || !mealModal.hidden
    || !innModal.hidden || !serviceModal.hidden || !entryTaxModal.hidden || !routeEventModal.hidden
    || !sceneTransition.hidden || (partnerEventPanel && !partnerEventPanel.hidden);
}

function continuePendingNarrativePresentation() {
  if (!account || gameScreen.hidden) return false;
  // 필수 화면 전환을 마친 뒤 첫 야영 안내를 가장 먼저 정리한다.
  // 대화 카드 안내는 그 다음이며, 나하나 메인 이벤트와 상황 이벤트가 순서대로 이어진다.
  if (account.travel?.mode === "camp" && shouldStartTutorial(2)
    && !narrativePresentationBlocked({ ignoreTalkCardTutorialPending: true })
    && maybeStartFirstCampTutorial()) return true;
  if (maybeStartPendingSootheTutorial()) return true;
  if (maybeStartPendingTalkCardTutorial()) return true;
  if (narrativePresentationBlocked()) return false;
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  const eventId = pendingNahanaEventOpeningId;
  if (eventId && eventState.activeId === eventId && eventState.stage === 1) {
    void beginNahanaEventOpening(eventId);
    return true;
  }
  if (eventId) {
    pendingNahanaEventOpeningId = "";
  }
  const situationState = normalizeNahanaSituationEventState(account.nahanaSituationEvents);
  if (activeNahanaSituationEventId) return true;
  if (situationState.pendingIds.length) {
    void beginNextNahanaSituationEvent();
    return true;
  }
  schedulePendingRoadArrivalContinuation();
  return false;
}

function schedulePendingNarrativePresentation() {
  window.clearTimeout(pendingNarrativePresentationTimer);
  pendingNarrativePresentationTimer = window.setTimeout(() => {
    pendingNarrativePresentationTimer = 0;
    continuePendingNarrativePresentation();
  }, 0);
}

function isTutorialActive(tutorialId) {
  return Boolean(account && normalizeTutorialProgress(account.tutorialProgress).activeId === tutorialId);
}

function startTutorial(tutorialId, step = 0) {
  if (!shouldStartTutorial(tutorialId) || !tutorialLayer) return false;
  if (step === 0 && [3, 4].includes(tutorialId) && currentScene !== "road") {
    showScene("road", -1, false);
  }
  if (tutorialId === TUTORIAL_IDS.MERCHANT_PATH) window.ProjectWMerchantPath?.prepareNotebookTutorial?.();
  pauseTravelClock("tutorial");
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  account.tutorialProgress.activeId = tutorialId;
  account.tutorialProgress.step = Math.max(0, Math.trunc(Number(step) || 0));
  tutorialRuntime = { id: tutorialId };
  persistAccount();
  renderTutorial();
  return true;
}

function resumeActiveTutorial() {
  if (!account || gameScreen.hidden) return;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (!progress.activeId || progress.completed.includes(progress.activeId)) return;
  tutorialRuntime = { id: progress.activeId };
  pauseTravelClock("tutorial");
  renderTutorial();
}

function reconcileTutorialSceneProgress(progress) {
  if (!account || !tutorialRuntime || tutorialRuntime.id !== 1) return progress;
  let resolvedStep = progress.step;
  if (resolvedStep === 2 && currentScene === "partner") resolvedStep = 3;
  else if (resolvedStep === 4 && currentScene === "cargo") resolvedStep = 5;
  else if (resolvedStep === 8 && currentScene === "map") resolvedStep = 9;
  else if (resolvedStep === 11 && currentScene === "road") resolvedStep = 12;
  if (resolvedStep === progress.step) return progress;
  const reconciled = { ...progress, step: resolvedStep };
  account.tutorialProgress = reconciled;
  persistAccount();
  return reconciled;
}

function setTutorialStep(step) {
  if (!account || !tutorialRuntime) return;
  const normalizedStep = Math.max(0, Math.trunc(Number(step) || 0));
  if (tutorialRuntime.id === TUTORIAL_IDS.GUILD_CONTRIBUTION && normalizedStep >= 5) {
    unlockFeature("guildContribution");
  }
  if (tutorialRuntime.id === TUTORIAL_IDS.MERCHANT_PATH && normalizedStep >= 6) {
    window.ProjectWMerchantPath?.close?.();
    if (currentScene !== "cargo") showScene("cargo", 1, true);
  }
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  account.tutorialProgress.step = normalizedStep;
  persistAccount();
  renderTutorial();
}

function completeTutorial(tutorialId = tutorialRuntime?.id) {
  if (!account || !tutorialId) return;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (!progress.completed.includes(tutorialId)) progress.completed.push(tutorialId);
  progress.activeId = 0;
  progress.step = 0;
  account.tutorialProgress = progress;
  tutorialRuntime = null;
  hideTutorial();
  resumeTravelClock("tutorial");
  persistAccount();
  syncTravelExperience();
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (eventState.pendingRewardId) window.setTimeout(() => void showPendingNahanaEventReward(), 0);
  else if (eventState.pendingTutorialId) window.setTimeout(() => void startPendingNahanaEventTutorial(), 0);
  else schedulePendingNarrativePresentation();
  if (currentScene === "partner" && tutorialId !== TUTORIAL_IDS.TALK_CARD) {
    window.setTimeout(maybeStartEarlyPartnerTutorial, 0);
  }
  const modalOpen = !walletModal.hidden || !informationModal.hidden || !merchantPathModal.hidden || !memorialModal.hidden
    || !tradeModal.hidden || !mealModal.hidden || !innModal.hidden || !serviceModal.hidden
    || !entryTaxModal.hidden || !routeEventModal.hidden || !dialogModal.hidden;
  if (account.travel?.mode === "road" && !modalOpen) {
    window.setTimeout(() => maybeStartHorseFeedTutorial(account.travel), 0);
  }
  if (account.travel?.mode === "camp" && tutorialId !== 2) {
    window.setTimeout(schedulePendingNarrativePresentation, 0);
  }
}

function skipActiveTutorial() {
  if (!tutorialRuntime || !account) return;
  const tutorialId = tutorialRuntime.id;
  if ([3, 4, 5, 6, 7, 10].includes(tutorialId)) {
    const eventState = normalizeNahanaEventState(account.nahanaEvents);
    if (eventState.activeId === "N_E_001"
      || eventState.completedIds.includes("N_E_001")
      || eventState.pendingRewardId === "N_E_001") {
      applyNahanaEventReward("N_E_001", eventState);
      account.nahanaEvents = eventState;
      unlockFeature("permanentBlessing");
      persistAccount();
    }
  }
  if (tutorialId === TUTORIAL_IDS.GUILD_CONTRIBUTION) unlockFeature("guildContribution");
  completeTutorial(tutorialId);
  if (tutorialId === 5 && shouldStartTutorial(6)) window.setTimeout(() => startTutorial(6), 0);
  if (tutorialId === 8) window.setTimeout(maybeStartSnackTutorial, 0);
}

function tutorialStepConfiguration(tutorialId, step) {
  const partnerMoveSelector = window.ProjectWInn?.isOpen?.() ? "#inn-next-scene" : "#next-scene";
  const configurations = {
    1: [
      ["첫 여정", "길 위의 현재 위치와 다음 지점을 이 막대에서 확인합니다.", "#road-route-bar", false, { padding: 18 }],
      ["정면뷰", "말과 노면, 환경, 짐마차 상태는 정면뷰에서 살펴볼 수 있습니다.", ".road-condition-markers"],
      ["파트너뷰로 이동", "화면 오른쪽 가장자리를 눌러 파트너뷰로 이동하세요.", "#next-scene", true],
      ["파트너뷰", "이곳에서 나하나의 상태와 동행 기능을 확인합니다.", ".partner-dashboard", false, { padding: 12 }],
      ["화물뷰로 이동", "다시 오른쪽 가장자리를 눌러 화물뷰로 이동하세요.", "#next-scene", true],
      ["화물뷰", "이곳에서 짐마차의 화물과 남은 적재 공간을 확인할 수 있습니다.", ".cargo-ui"],
      ["야영 물품", "야영 물품에는 카테고리, 구매 가치, 무게와 열화내구도가 표시됩니다. 사용하면서 내구도가 줄지만 한 번에 소모되지는 않습니다.", ".cargo-slot.is-item-head[data-item-id='G_0272']", false, { padding: 12 }],
      ["교역품 정보", "이것은 교역품입니다. 같은 교역품을 직접 구입하고 판매하면 거래 경험이 쌓입니다. 경험이 쌓일수록 숨겨진 이름과 상태, 품질과 원산지를 단계적으로 알아냅니다.", ".cargo-slot.is-item-head[data-item-id='G_0006']", false, { padding: 12 }],
      ["지도뷰로 이동", "한 번 더 오른쪽 가장자리를 눌러 지도뷰로 이동하세요.", "#next-scene", true],
      ["현재 위치", "금빛으로 강조된 핀이 현재 내 위치입니다. 지도에서 현재 위치와 앞으로 갈 길을 함께 확인할 수 있습니다.", ".map-player-pin", false, { padding: 18 }],
      ["지역 지도", "북부·중부·남부 버튼으로 대륙의 다른 지역 지도를 전환할 수 있습니다. 목적지와 먼 지역의 상황을 살필 때 사용하세요.", ".map-view-ui > .map-region-tabs", false, { padding: 12 }],
      ["정면뷰로 돌아가기", "오른쪽 가장자리를 한 번 더 눌러 정면뷰로 돌아가세요.", "#next-scene", true],
      ["여정 시작", "출발을 눌러 짐마차를 움직이고 첫 여정을 시작하세요.", "#road-action", true, { padding: 14 }]
    ],
    2: [
      ["첫 야영", "야영 진행 버튼으로 오늘 밤의 준비를 시작하세요.", "#road-action", true],
      ["야영 준비", "식사와 야영 물품을 고르면 야영 안락도가 달라집니다.", "#camp-setup"],
      ["기분과 안락도", "음식을 먹지 않거나 야영 물품이 부족해 안락도가 낮아지면 나하나의 기분도 나빠집니다. 준비한 물품과 안락도를 함께 확인하세요.", ".camp-comfort-summary"],
      ["첫 식사", "목록에서 여행 육포와 건조 흑빵을 각각 직접 체크하세요. 두 체크가 끝날 때까지 야영 진행은 잠깁니다.", "#camp-meal-list", true],
      ["아침 맞이", "야영 진행을 눌러 식량을 소비하고 다음 날 아침을 맞이하세요.", "#camp-proceed", true]
    ],
    3: [
      ["이벤트 확인", "파트너뷰로 이동해 새로 생긴 이벤트를 확인하세요.", "#next-scene", true],
      ["나하나 이벤트", "화면 상단의 마름모 느낌표를 눌러 이벤트 조건을 확인하세요. 다른 뷰에서는 먼저 파트너뷰로 이동합니다.", "#partner-event-alert", true, { padding: 12, shape: "diamond" }],
      ["이벤트 조건", "이 창에서 현재 조건과 다음 목표, 완료 보상을 확인할 수 있습니다.", "#partner-event-panel", false, { padding: 18 }],
      ["이벤트 창 닫기", "확인을 마쳤다면 이벤트 창을 닫으세요.", "#partner-event-close", true],
      ["정면뷰로 이동", "왼쪽 가장자리를 눌러 정면뷰로 돌아가세요.", "#previous-scene", true],
      ["여정 계속", "짐마차를 출발시켜 다음 지점으로 이동하세요.", "#road-action", true, { padding: 14 }]
    ],
    4: [
      ["하이렌바흐 입장", "하이렌바흐 도시에 진입합니다.", "#road-action", true],
      ["화물로 납부", "입장관세는 화폐뿐 아니라 화물로도 납부할 수 있습니다.", "#entry-tax-cargo"],
      ["자동 납부안", "큰 단위 화폐부터 자동으로 납부안에 올려 둡니다.", "#entry-tax-offer"],
      ["관세 납부", "자동으로 등록된 화폐를 확인하고 관세를 납부하세요.", "#entry-tax-confirm", true]
    ],
    5: [
      ["저녁 식사", "하이렌바흐의 주점에 들어가 저녁 식사를 준비하세요.", "#settlement-facility-list button[data-facility-type='주점']", true],
      ["식사 주문", "식사 주문을 눌러 메뉴판을 여세요.", "#service-meal-order", true],
      ["메뉴 고르기", "음식과 음료를 눌러 조건에 맞게 주문서를 채우세요.", "#meal-modal .meal-window", true, {
        dismissible: true,
        conditions: [["포만감", "100 이상 · 200 이하"], ["술", "3개 이상"]]
      }],
      ["주문 확인", "조건을 맞췄습니다. 결제 화면으로 이동하세요.", "#meal-confirm", true],
      ["식사값 지불", "자동으로 올린 화폐를 확인하고 식사값을 지불하세요.", "#meal-payment-confirm", true]
    ],
    6: [
      ["여관", "주점에서 나와 여관으로 들어가세요.", "#settlement-facility-list button[data-facility-type='여관']", true],
      ["정보 수집", "여관에서는 남은 수집 기회를 한 번에 모두 사용해 주변 이야기를 모읍니다. 여러 정보를 얻으면 카드를 차례로 확인합니다.", "#inn-information"],
      ["식사 주문", "여관에서 식사를 주문할 수 있습니다.\n오늘 주점이나 여관에서 식사하면 숙박할 때 기분이 회복되고, 식사 없이 자면 기분이 나빠집니다.", "#inn-meal"],
      ["심부름꾼", "여행 물품이 필요하면 심부름꾼에게 부탁할 수 있습니다.", "#inn-errand"],
      ["짐마차 정비", "돈을 내고 짐마차 내구도와 상태이상을 정비합니다.", "#inn-maintenance"],
      ["숙박", "숙박을 눌러 말과 나하나를 쉬게 하세요.", "#inn-lodging", true],
      ["숙박 계산서", "객실과 마굿간 비용을 확인한 뒤 현금으로 지불합니다.", ".inn-invoice-wrap", false, { padding: 18 }],
      ["숙박비 준비", "숙박비 지불을 눌러 자동 납부안을 확인하세요.", "#inn-lodging-pay", true],
      ["숙박비 지불", "올려 둔 화폐로 숙박비를 지불하세요. 완료한 교역이 있다면 잠들기 전에 상행 복기가 이어집니다.", "#inn-payment-confirm", true],
      ["상행 복기", "구입부터 판매까지 끝낸 교역을 하나씩 돌아봅니다. 왼쪽 목록에서 거래를 바꾸며 각 결과를 확인할 수 있습니다.", "#inn-trade-review-view", false, { padding: 12 }],
      ["가격을 움직인 원인", "구입과 판매에서 10% 이상 작용한 주요 요인이 표시됩니다. ◆는 가장 큰 요소, ▲는 유리한 요소, ▼는 불리한 요소입니다.", ".inn-trade-review-factors", false, { padding: 12 }],
      ["복기 종료", "복기 종료를 누르면 그날 제시된 거래 전체에 결과 뱃지가 남고 상품마다 거래지식이 1 상승합니다. 화면이 어두워진 뒤 숙박으로 이어집니다.", "#inn-trade-review-finish", true, { padding: 10 }]
    ],
    7: [
      ["상태 확인", "파트너뷰로 이동해 나하나의 상태를 확인하세요.", partnerMoveSelector, true],
      ["상태이상", "나하나에게 생긴 상태는 이곳에 뱃지로 표시됩니다. 뱃지에 커서를 올리면 상세 내용을 볼 수 있습니다.", ".partner-status-panel"]
    ],
    8: [
      ["내 화물", "왼쪽 목록은 현재 짐마차에 실린 화물입니다. 상품의 칸수와 상태를 확인할 수 있습니다.", "#trade-player-items"],
      ["판매 판단", "구매액은 이 화물을 샀을 때 지불한 가치입니다. 손익률은 구매액과 현재 판매가의 차이를 보여주며, 판매 가치는 이 상인이 지금 인정하는 가격입니다.", "#trade-player-items .trade-item-value", false, { padding: 10 }],
      ["상인의 상품", "오른쪽 목록에는 이 상인이 판매하는 상품이 표시됩니다. 상품을 눌러 거래안에 올릴 수 있습니다.", "#trade-merchant-items"],
      ["가격과 재고", "구매 가치는 상인이 요구하는 가격입니다. 재고는 이곳에서 지금 구입할 수 있는 수량입니다.", "#trade-merchant-items .trade-item-card", false, { padding: 10 }],
      ["시설별 공급", "상회, 교역소, 시장은 서로 다른 물품과 재고를 취급할 수 있습니다. 재고는 이 거점에서 해당 교역품이 공급되는 정도에 비례하며, 매입가와 판매가를 판단하는 단서가 됩니다.", "#trade-merchant-items"],
      ["화폐 사용", "거래할 화폐를 이곳에서 올리거나 내릴 수 있습니다.", "#trade-player-currencies"],
      ["거래 가치 비교", "양쪽이 건네는 가치가 거래 가능한 범위인지 가운데에서 비교합니다.", ".trade-balance"],
      ["거래 후 적재", "거래를 확정했을 때 남을 화물칸과 적재 중량을 미리 확인합니다.", "#trade-cargo-preview"]
    ],
    9: [
      ["시장 간식", "도시와 대도시의 시장에서는 이 버튼으로 나하나에게 줄 간식을 살 수 있습니다.", "#trade-snack-open"]
    ],
    10: [
      ["축복 부여", "동행 중 얻은 강화포인트로 짐마차에 영구적인 축복을 부여할 수 있습니다. 축복 부여를 눌러 확인하세요.", "#partner-blessing-toggle", true],
      ["수레바퀴 축복", "수레바퀴 영역을 눌러 이동과 바퀴에 관련된 축복을 확인하세요.", ".partner-feature-tabs button[data-category='수레바퀴']", true],
      ["수레바퀴 영역", "수레바퀴 축복은 이동속도와 노면 대응 등 여정의 움직임을 강화합니다.", ".blessing-section"],
      ["짐마차 축복", "짐마차 영역을 눌러 화물과 짐마차에 관련된 축복을 확인하세요.", ".partner-feature-tabs button[data-category='짐마차']", true],
      ["짐마차 영역", "짐마차 축복은 화물칸과 운송 안정성을 강화합니다.", ".blessing-section"],
      ["축복 선택", "원하는 축복은 이후 강화 포인트를 모아 선택할 수 있습니다.", ".partner-feature-panel", false, { padding: 14 }]
    ],
    [TUTORIAL_IDS.HORSE_FEED]: [
      ["말의 허기", "말의 허기가 80 이하로 떨어졌습니다. 허기가 낮아지면 여정을 이어가기 어려워집니다.", ".road-condition-marker[data-road-condition='horse']", false, { padding: 14 }],
      ["건초 먹이기", "건초 먹이기를 눌러 말에게 먹이를 주세요.", "#horse-feed-button", true, { padding: 12 }],
      ["허기 회복", "먹이를 먹은 말의 허기가 회복되었습니다. 정면뷰에서 체력과 허기를 계속 살펴보세요.", ".road-condition-marker[data-road-condition='horse']", false, { padding: 14 }]
    ],
    [TUTORIAL_IDS.EARLY_PARTNER]: [
      ["간식 주기", "이제 화물에 든 간식을 하루 한 번 나하나에게 줄 수 있습니다. 간식은 기분을 회복하는 데 도움이 됩니다.", "#partner-snack-open", false, { padding: 6 }],
      ["상식 주입", "상식 주입으로 나하나와 짧은 이야기를 나눌 수 있습니다. 여러 번 반복하면 그날은 나하나가 대화를 거절할 수도 있습니다.", "#partner-common-sense", false, { padding: 12 }]
    ],
    [TUTORIAL_IDS.TOP_TOOLBAR]: [
      ["여행 도구", "여행이 본격적으로 시작되었습니다. 최상단에는 여정에 필요한 기록과 상태가 모여 있습니다.", ".game-toolbar", false, { padding: 10 }],
      ["지갑", "보유 화폐와 현재 알고 있는 화폐 가치를 확인합니다. 처음 열면 자세한 안내가 이어집니다.", "#wallet-button", false, { padding: 10 }],
      ["행상인의 길", "상인 능력, 상품 지식과 직접 남긴 상품 메모를 확인합니다.", "#merchant-path-button", false, { padding: 10 }],
      ["메모리얼", "나하나와 함께 수집한 대화와 발자취를 다시 살펴봅니다.", "#memorial-button", false, { padding: 10 }],
      ["정보", "수집한 정보 카드를 보관하고 오래된 정도와 신뢰도를 확인합니다.", "#information-button", false, { padding: 10 }],
      ["시간과 계절", "날짜와 계절, 현재 날씨와 시간대를 확인합니다. 시간대에 따라 시설 영업과 출발 가능 여부가 달라집니다.", "#game-clock", false, { padding: 10 }]
    ],
    [TUTORIAL_IDS.WALLET]: [
      ["지갑", "화폐는 지역마다 가치가 달라질 수 있습니다. 이곳에는 마지막으로 확인한 화폐 가치가 표시됩니다.", ".wallet-window", false, { padding: 12 }],
      ["보유 가치", "상단의 합계는 현재 알고 있는 가치로 계산한 대략적인 총액입니다.", ".wallet-window-total", false, { padding: 10 }]
    ],
    [TUTORIAL_IDS.MERCHANT_PATH]: [
      ["행상인의 길", "1조부터 3조는 행상포인트로 능력을 익히고, 4조와 5조에서는 조합과 상품 지식을 확인합니다.", ".merchant-path-articles", false, { padding: 12 }],
      ["상품 지식", "5조에서 교역품을 사고팔며 쌓은 지식 단계와 해금된 정보를 확인합니다.", "button[data-merchant-path-article='5']", false, { padding: 10 }],
      ["상품 상세 기록", "상품을 열면 취급처, 직접 적는 메모와 최근 교역 여정을 한곳에서 확인할 수 있습니다.", ".merchant-path-note-editor", false, { padding: 12 }],
      ["취급처", "직접 구입한 거점은 취급처 뱃지로 남습니다. 뱃지를 눌러 생산지로 추정하거나 생산지가 아닌 곳으로 제외 표시할 수 있습니다.", ".merchant-path-outlet-history", false, { padding: 10 }],
      ["메모", "상품마다 짧은 메모를 세 개까지 남길 수 있습니다. 직접 알아낸 특징과 다음 거래 계획을 기록해 두세요.", ".merchant-path-note-fields", false, { padding: 10 }],
      ["거래 기록", "구입과 판매를 모두 마친 교역만 기록됩니다. 한 번에 사고판 수량은 한 묶음으로 표시되며, 운송 거리와 손익, 상행 복기 결과를 함께 확인할 수 있습니다.", ".merchant-path-trade-history", false, { padding: 10 }],
      ["화물뷰에서 빠르게 확인", "메모와 거래 기록은 화물의 툴팁에도 표시됩니다. 화물을 길게 누르면 행상인의 길의 해당 상품 기록으로 바로 이동합니다.", "#cargo-grid", false, { padding: 12 }]
    ],
    [TUTORIAL_IDS.MEMORIAL]: [
      ["메모리얼", "수집한 메인대화, 상식주입, 대화카드와 이벤트 대화를 다시 읽을 수 있습니다.", ".memorial-tabs", false, { padding: 12 }],
      ["발자취", "발자취는 여정에서 달성한 특별한 기록입니다. 처음 해금할 때 동행 경험치를 얻습니다.", "button[data-memorial-category='발자취']", false, { padding: 10 }]
    ],
    [TUTORIAL_IDS.INFORMATION_ARCHIVE]: [
      ["정보 보관함", "수집한 정보 카드는 이곳에 보관됩니다. 정보는 시간이 지나면 가치와 정확도가 낮아지고 끝내 소멸합니다.", ".information-window", false, { padding: 12 }],
      ["정보 확인", "새 정보의 은은한 강조는 목록에 커서를 올리면 사라집니다. 커서를 올린 동안 상세 내용도 확인할 수 있습니다. 정보 수집 기능은 이후 진행에서 해금됩니다.", "#information-grid", false, { padding: 12 }]
    ],
    [TUTORIAL_IDS.CURRENCY_EXCHANGE]: [
      ["환전상 거리", "환전상에서는 상품 없이 화폐끼리만 교환합니다.", ".trade-window", false, { padding: 12 }],
      ["내가 지불할 화폐", "왼쪽에서 환전상에게 건넬 화폐를 고릅니다.", "#trade-player-currencies", false, { padding: 10 }],
      ["받을 화폐 자동 구성", "내가 지불할 화폐를 올린 뒤 금화·은화·동화 중점을 누르면 선택한 종류를 우선해 받을 화폐를 자동으로 구성합니다.\n부족한 잔액은 다른 종류의 화폐로 보충합니다.", "#trade-exchange-focus", false, { padding: 10 }],
      ["받을 화폐", "오른쪽에서 환전상에게 받을 화폐를 고릅니다. 거래에는 환전 할증이 더해집니다.", "#trade-merchant-currencies", false, { padding: 10 }],
      ["화폐 시세", "화폐 시세 버튼에서 정보비를 내고 현재 지역의 최신 화폐 가치를 갱신할 수 있습니다.", "#trade-currency-rates", false, { padding: 10 }]
    ],
    [TUTORIAL_IDS.TALK_CARD]: [
      ["새 대화 카드", "길 위에서 나하나와 나눌 대화 카드가 생겼습니다. 파트너뷰의 카드 슬롯에서 확인할 수 있습니다.", "#partner-card-hand", false, { padding: 12 }],
      ["대화 시작", "새로 생긴 대화 카드를 눌러 나하나와 대화하세요.", "#partner-card-hand .partner-talk-card-main:not(:disabled)", true, { padding: 10 }]
    ],
    [TUTORIAL_IDS.CITY_COMMERCE]: [
      ["거래 시설 비교", "같은 거점에서도 시설마다 취급 상품, 재고, 보유 화폐와 거래 조건이 다릅니다. 물건을 사고팔기 전에 여러 시설을 둘러보세요.", ".settlement-facility-group.is-trade-group", false, { padding: 10 }],
      ["상회의 상품", "상회는 지역 생산품과 고정물류, 여러 지역의 수입품을 폭넓게 취급합니다. 큰 거래를 감당할 상품과 화폐도 넉넉한 편입니다.", "#settlement-facility-list button[data-facility-type='상회']", false, { padding: 8 }],
      ["상회의 거래", "상회는 선택지가 많은 대신 사고파는 가치 차이가 크고 흥정도 까다로운 편입니다. 한 번의 거래로 많은 물량을 다룰 때 유용합니다.", "#settlement-facility-list button[data-facility-type='상회']", false, { padding: 8 }],
      ["교역소", "교역소에는 지역 생산품과 꾸준히 들어오는 고정물류, 다른 지역의 수입품이 함께 모입니다. 서로 다른 유통 상품을 비교하기 좋습니다.", "#settlement-facility-list button[data-facility-type='교역소']", false, { padding: 8 }],
      ["시장의 상품", "시장은 현재 거점의 생산품과 주민 수요나 지역 산업을 위해 꾸준히 들어오는 상품을 중심으로 취급합니다. 지역의 가격과 재고를 살피기에 알맞습니다.", "#settlement-facility-list button[data-facility-type='시장']", false, { padding: 8 }],
      ["시장의 이용", "시장은 사고파는 가치 차이가 비교적 작습니다. 도시와 대도시의 시장에서는 거래와 별도로 나하나의 간식도 살 수 있습니다.", "#settlement-facility-list button[data-facility-type='시장']", false, { padding: 8 }]
    ],
    [TUTORIAL_IDS.CITY_NEWS]: [
      ["도시 소식", "현재 거점에 진행 중인 사건이 있습니다. 빛나는 도시 소식 버튼을 눌러 확인하세요.", ".city-events-entry .city-events-button.has-events", true, { padding: 8 }],
      ["진행 중인 사건", "도시 소식에는 이 거점에서 지금 벌어지는 사건이 모입니다. 다른 거점의 사건은 그곳에 도착해야 확인할 수 있습니다.", ".city-events-window", false, { padding: 12 }],
      ["남은 기간", "사건마다 효과가 유지되는 기간이 다릅니다. 남은 기간이 끝나면 소식과 효과가 함께 사라집니다.", ".city-events-window", false, { padding: 12 }],
      ["상품과 시세", "경제 사건은 관련 상품의 재고와 시세를 바꿉니다. 어떤 상품군에 영향을 주는지 효과 설명에서 확인하세요.", ".city-events-window", false, { padding: 12 }],
      ["시설의 변화", "사건에 따라 숙박과 정비 비용, 정보 수집 기회, 관세 같은 거점 이용 조건이 달라질 수 있습니다.", ".city-events-window", false, { padding: 12 }],
      ["이어지는 여정", "일부 사건의 영향은 거점을 떠난 뒤에도 다음 목적지에 도착할 때까지 이어집니다. 출발 전에 내용을 확인하세요.", ".city-events-window", false, { padding: 12 }],
      ["관람 보상", "보상이 있는 도시 이벤트는 거점에 진입하면 자동으로 관람합니다. 사건 내용과 획득한 기분 또는 동행 경험치가 카드로 표시되며, 같은 사건을 다시 관람하려면 충분한 시간이 지나야 합니다.", ".city-events-window", false, { padding: 12 }]
    ],
    [TUTORIAL_IDS.INFORMATION_GATHERING]: [
      ["정보 수집 해금", "주점, 여관과 상업조합에서 소식을 수집할 수 있게 되었습니다. 정보 수집 한 번으로 현재 시설의 남은 기회를 모두 사용합니다.", "#service-info-collect", false, { padding: 10 }],
      ["장소에 따른 정보망", "주점과 여관에서는 현재 거점과 가까운 거점·경로의 소식이 자주 나옵니다. 상업조합과 상회에서는 대륙 전역의 정보를 고르게 다룹니다.", "#service-info-collect", false, { padding: 10 }],
      ["정보 수집 시도", "각 기회마다 정보 획득을 판정하며 여러 장을 얻으면 차례로 확인합니다. 주점과 여관은 1타임이 흐르고, 상업조합과 상회에서는 시간이 흐르지 않습니다.", "#service-info-collect", true, { padding: 10 }]
    ],
    [TUTORIAL_IDS.SPIRIT_BLESSING]: [
      ["정령의 가호 해금", "정령력을 사용해 여정에 도움이 되는 일시적인 가호를 얻을 수 있습니다. 정령의 가호를 열어보세요.", "#partner-spirit-blessing", true, { padding: 10 }],
      ["정령력과 가호", "가호 하나를 얻을 때 정령력 1을 사용합니다. 높은 동행등급일수록 높은 등급의 가호가 나올 가능성이 커집니다.", ".partner-feature-panel", false, { padding: 14 }],
      ["첫 가호", "가호 획득을 눌러 정령력으로 첫 가호를 받아보세요.", ".partner-feature-confirm", true, { padding: 10 }]
    ],
    [TUTORIAL_IDS.GUILD_CONTRIBUTION]: [
      ["상업조합 자격", "상업조합을 이용할 자격을 얻었습니다. 현재 대도시의 상업조합으로 들어가세요.", "#settlement-facility-list button[data-facility-type='상업조합']", true, { padding: 10 }],
      ["상업조합", "상업조합에서는 조합원으로서의 공헌도와 대륙의 정보를 다룹니다. 현금을 안전하게 옮길 어음증서도 이용할 수 있습니다.", ".service-content", false, { padding: 14 }],
      ["조합 공헌도", "공헌도와 단계는 대륙 전역의 상업조합이 공유합니다. 단계가 오르면 모든 지부에서 시도할 수 있는 정보 수집 횟수가 늘어납니다.", "#service-guild-profile", false, { padding: 10 }],
      ["정보 수집", "상업조합의 정보 수집은 시간을 소모하지 않으며, 한 번 누르면 남은 기회를 모두 사용합니다. 현재 공헌도 단계만큼 3일마다 수집 기회를 받습니다.", "#service-info-collect", false, { padding: 10 }],
      ["어음증서", "도시와 대도시의 상업조합에서는 현금을 정해진 액면의 어음으로 바꿀 수 있습니다. 어음은 화물칸과 무게를 차지하지 않습니다.", "#service-bill-note-open", false, { padding: 10 }],
      ["조합 공헌", "마지막으로 공헌 기능입니다. 공헌을 눌러 조합에 납부할 화폐를 준비하세요.", "#service-contribution-open", true, { padding: 10 }],
      ["첫 공헌", "화폐를 골라 공헌 가치가 300 이상이 되도록 맞춘 뒤 공헌하세요. 공헌은 각 거점의 상업조합에서 하루에 한 번만 할 수 있습니다.", "#service-contribution-view", true, {
        padding: 14,
        conditions: [["공헌 가치", "300 이상"]]
      }]
    ],
    [TUTORIAL_IDS.TRADE_REVIEW]: [
      ["첫 상행 복기", "숙박비를 지불한 뒤, 완료한 교역과 최근에 지불한 관세·식비를 잠들기 전에 돌아봅니다. 거래와 지출은 복기를 마칠 때까지 누적됩니다.", "#inn-trade-review-view", false, { padding: 12 }],
      ["교역과 지출", "교역 항목에서는 구입·판매 가격과 손익을 비교합니다. 관세와 식비 항목에서는 합계와 지점별 지출 내역을 확인할 수 있습니다.", "#inn-trade-review-detail", false, { padding: 12 }],
      ["중요한 가격 요인", "교역 항목에는 10% 이상 작용한 가격 요인이 복수로 표시됩니다. ◆는 가장 큰 요소이며, 초록 ▲는 이익에 도움을 준 요인, 빨간 ▼는 손실을 키운 요인입니다.", "#inn-trade-review-detail", false, { padding: 12 }],
      ["다른 거래도 확인", "왼쪽 목록에 복기할 거래가 여러 개라면 눌러서 결과를 바꿔 볼 수 있습니다. 아직 열어보지 않은 거래는 은은하게 강조됩니다.", "#inn-trade-review-list", false, { padding: 10 }],
      ["복기 종료", "복기 종료를 누르면 거래에는 결과 뱃지와 거래지식 1이 적용되고, 확인한 관세·식비는 목록에서 정리됩니다. 화면이 어두워지며 숙박을 계속합니다.", "#inn-trade-review-finish", true, { padding: 10 }]
    ],
    [TUTORIAL_IDS.PARTNER_SOOTHE]: [
      ["화난 나하나 달래기", "나하나가 화난 상태라면 간식 주기 버튼이 달래기로 바뀝니다.\n달래기에 성공하면 기분이 1~2 회복됩니다.", "#partner-snack-open", false, { padding: 12 }],
      ["오늘은 거절할 수도 있습니다", "달래기를 거절하면 오늘은 더 시도할 수 없습니다.\n다음 날에도 화난 상태라면 다시 달랠 수 있습니다.", "#partner-snack-open", false, { padding: 12 }]
    ]
  };
  const entry = configurations[tutorialId]?.[step];
  if (!entry) return null;
  return { title: entry[0], message: entry[1], selector: entry[2], interactive: Boolean(entry[3]), ...(entry[4] || {}) };
}

function renderTutorial() {
  if (!tutorialRuntime || !tutorialLayer || !account) return;
  mealModal?.classList.remove("is-tutorial-condition-guide");
  const progress = reconcileTutorialSceneProgress(normalizeTutorialProgress(account.tutorialProgress));
  const configuration = tutorialStepConfiguration(tutorialRuntime.id, progress.step);
  if (!configuration) {
    completeTutorial(tutorialRuntime.id);
    return;
  }
  tutorialLayer.hidden = false;
  tutorialTitle.textContent = configuration.title;
  tutorialMessage.replaceChildren(document.createTextNode(formatTutorialMessage(configuration.message)));
  if (Array.isArray(configuration.conditions) && configuration.conditions.length) {
    const conditionList = document.createElement("span");
    conditionList.className = "tutorial-conditions";
    configuration.conditions.forEach(([label, value]) => {
      const condition = document.createElement("span");
      condition.className = "tutorial-condition";
      const heading = document.createElement("strong");
      heading.textContent = label;
      const copy = document.createElement("span");
      copy.textContent = value;
      condition.append(heading, copy);
      conditionList.append(condition);
    });
    tutorialMessage.append(conditionList);
  }
  const total = Array.from({ length: 20 }, (_, index) => tutorialStepConfiguration(tutorialRuntime.id, index)).filter(Boolean).length;
  tutorialProgress.textContent = `${progress.step + 1} / ${total}`;
  tutorialContinue.hidden = configuration.interactive;
  tutorialContinue.textContent = progress.step === total - 1 ? "완료" : "다음";
  if (tutorialDismiss) tutorialDismiss.hidden = !configuration.dismissible;
  tutorialFocusTarget = document.querySelector(configuration.selector);
  tutorialLayer.classList.toggle("is-interactive-step", configuration.interactive);
  scheduleTutorialPosition();
}

function formatTutorialMessage(message) {
  return String(message ?? "").replace(/\.\s+(?=\S)/g, ".\n");
}

function hideTutorial() {
  if (tutorialPositionFrame) cancelAnimationFrame(tutorialPositionFrame);
  tutorialPositionFrame = 0;
  tutorialFocusTarget = null;
  if (tutorialLayer) tutorialLayer.hidden = true;
  const progress = normalizeTutorialProgress(account?.tutorialProgress);
  const showMealConditionGuide = isTutorialActive(5)
    && progress.step === 2
    && mealModal
    && !mealModal.hidden;
  mealModal?.classList.toggle("is-tutorial-condition-guide", Boolean(showMealConditionGuide));
}

function scheduleTutorialPosition() {
  if (!tutorialRuntime || !tutorialLayer || tutorialLayer.hidden) return;
  if (tutorialPositionFrame) cancelAnimationFrame(tutorialPositionFrame);
  tutorialPositionFrame = requestAnimationFrame(positionTutorial);
}

function positionTutorial() {
  tutorialPositionFrame = 0;
  if (!tutorialRuntime || !tutorialLayer || tutorialLayer.hidden) return;
  const progress = normalizeTutorialProgress(account?.tutorialProgress);
  const configuration = tutorialStepConfiguration(tutorialRuntime.id, progress.step);
  tutorialFocusTarget = configuration ? document.querySelector(configuration.selector) : null;
  if (isTutorialTargetMoving(tutorialFocusTarget)) scheduleTutorialPosition();
  const rect = tutorialFocusTarget?.getBoundingClientRect();
  const visible = rect && rect.width > 0 && rect.height > 0;
  tutorialFocus.hidden = false;
  tutorialFocus.classList.toggle("is-screen-dimmer", !visible);
  tutorialFocus.classList.toggle("is-diamond", configuration?.shape === "diamond" && visible);
  tutorialCard.classList.remove("is-left", "is-right", "is-top", "is-bottom");
  if (!visible) {
    tutorialFocus.style.left = "-4px";
    tutorialFocus.style.top = "-4px";
    tutorialFocus.style.width = "1px";
    tutorialFocus.style.height = "1px";
    tutorialCard.classList.add("is-bottom");
    window.setTimeout(scheduleTutorialPosition, 120);
    return;
  }
  const padding = Math.max(4, Number(configuration?.padding) || 8);
  const horizontal = rect.left + rect.width / 2;
  const vertical = rect.top + rect.height / 2;
  if (configuration?.shape === "diamond") {
    const side = (Math.min(rect.width, rect.height) / Math.SQRT2) + padding * 2;
    tutorialFocus.style.left = `${horizontal - side / 2}px`;
    tutorialFocus.style.top = `${vertical - side / 2}px`;
    tutorialFocus.style.width = `${side}px`;
    tutorialFocus.style.height = `${side}px`;
  } else {
    tutorialFocus.style.left = `${Math.max(4, rect.left - padding)}px`;
    tutorialFocus.style.top = `${Math.max(4, rect.top - padding)}px`;
    tutorialFocus.style.width = `${Math.min(window.innerWidth - 8, rect.width + padding * 2)}px`;
    tutorialFocus.style.height = `${Math.min(window.innerHeight - 8, rect.height + padding * 2)}px`;
  }
  if (horizontal > window.innerWidth * 0.62) tutorialCard.classList.add("is-left");
  else if (horizontal < window.innerWidth * 0.38) tutorialCard.classList.add("is-right");
  else if (vertical > window.innerHeight * 0.55) tutorialCard.classList.add("is-top");
  else tutorialCard.classList.add("is-bottom");
}

function handleTutorialPointerDown(event) {
  if (!tutorialRuntime || event.target.closest("#tutorial-card, #tutorial-skip")) return;
  event.preventDefault();
  event.stopPropagation();
  const progress = normalizeTutorialProgress(account?.tutorialProgress);
  const configuration = tutorialStepConfiguration(tutorialRuntime.id, progress.step);
  tutorialLayer.style.pointerEvents = "none";
  const underlying = document.elementFromPoint(event.clientX, event.clientY);
  tutorialLayer.style.pointerEvents = "";
  if (tutorialRuntime.id === 2
    && progress.step === 3
    && underlying?.closest?.("#camp-proceed, #road-action")) {
    showGameNotice("이번 튜토리얼에서는 여행 육포와 건조 흑빵을 둘 다 체크해야 합니다.");
    campSetupStatus.textContent = "여행 육포와 건조 흑빵을 각각 직접 체크해야 첫 야영을 진행할 수 있습니다.";
    return;
  }
  if (!configuration?.interactive || !tutorialFocusTarget) return;
  const rect = tutorialFocusTarget.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
  const clickable = underlying?.closest?.("button, [role='button'], input, label");
  if (clickable && tutorialFocusTarget.contains(clickable) && !clickable.disabled) clickable.click();
  else if (tutorialFocusTarget.matches("button, [role='button']") && !tutorialFocusTarget.disabled) tutorialFocusTarget.click();
}

function handleTutorialWheel(event) {
  if (!tutorialRuntime || tutorialLayer.hidden) return;
  const progress = normalizeTutorialProgress(account?.tutorialProgress);
  const configuration = tutorialStepConfiguration(tutorialRuntime.id, progress.step);
  if (!configuration?.interactive || tutorialRuntime.id !== 5 || progress.step !== 2) return;
  const scrollTarget = document.querySelector("#meal-menu-list");
  if (!scrollTarget) return;
  event.preventDefault();
  event.stopPropagation();
  scrollTarget.scrollTop += event.deltaY;
}

function advanceTutorialFromCard() {
  if (!tutorialRuntime || !account) return;
  const { id } = tutorialRuntime;
  const step = normalizeTutorialProgress(account.tutorialProgress).step;
  const nextSteps = {
    "1:0": 1, "1:1": 2, "1:3": 4, "1:5": 6,
    "2:1": 2,
    "4:1": 2, "4:2": 3,
    "6:1": 2, "6:2": 3, "6:3": 4, "6:4": 5, "6:6": 7
  };
  const configuration = tutorialStepConfiguration(id, step);
  const nextConfiguration = tutorialStepConfiguration(id, step + 1);
  if ((id === 7 && step === 1) || !nextConfiguration) {
    completeTutorial(id);
    if (id === 8) window.setTimeout(maybeStartSnackTutorial, 0);
    return;
  }
  const next = nextSteps[`${id}:${step}`];
  if (next != null) setTutorialStep(next);
  else if (!configuration?.interactive) setTutorialStep(step + 1);
}

function handleTutorialSceneChanged(scene) {
  if (!tutorialRuntime || !account) return;
  const id = tutorialRuntime.id;
  const step = normalizeTutorialProgress(account.tutorialProgress).step;
  if (id === 1) {
    if (step === 2 && scene === "partner") setTutorialStep(3);
    else if (step === 4 && scene === "cargo") setTutorialStep(5);
    else if (step === 8 && scene === "map") setTutorialStep(9);
    else if (step === 11 && scene === "road") setTutorialStep(12);
  } else if (id === 3 && step === 0 && scene === "partner") setTutorialStep(1);
  else if (id === 3 && step === 4 && scene === "road") setTutorialStep(5);
  else if (id === 7 && step === 0 && scene === "partner") setTutorialStep(1);
  else scheduleTutorialPosition();
}

function handleDialogueCompleted(dialogueId) {
  if (!account) return;
  const id = String(dialogueId || "").trim();
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (!progress.dialogueCompleted.includes(id)) progress.dialogueCompleted.push(id);
  account.tutorialProgress = progress;
  account.partner = normalizePartnerState(account.partner, account.partnerMoodAdjustment);
  account.partner.statusStreaks.idleDots = 0;
  persistAccount();
  void handleNahanaEventDialogueCompleted(id);
  if (id === "DL_001" && shouldStartTutorial(1)) startTutorial(1);
  if (id === "DL_E_001_1") window.setTimeout(maybeStartFirstTavernTutorial, 0);
}

function maybeStartFirstTavernTutorial() {
  if (!account) return false;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (progress.completed.includes(5) || progress.activeId === 5) return progress.activeId === 5;
  if (progress.activeId || !progress.dialogueCompleted.includes("DL_E_001_1")) return false;
  const placement = currentSettlementPlacement();
  if (placement?.id !== FIRST_TUTORIAL_DESTINATION_ID) return false;
  account.worldTime = normalizeWorldTime(account.worldTime);
  account.worldTime.phaseIndex = TIME_PHASES.indexOf("저녁");
  persistAccount();
  syncTravelExperience();
  return startTutorial(5);
}

function handleTutorialSettlementEntry(placement) {
  if (!account || placement?.id !== FIRST_TUTORIAL_DESTINATION_ID) return;
  if (isTutorialActive(4)) completeTutorial(4);
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (eventState.activeId === "N_E_001" && !progress.dialogueCompleted.includes("DL_E_001_1")) return;
  window.setTimeout(maybeStartFirstTavernTutorial, 0);
}

function handleTutorialEntryTaxOpen() {
  if (isTutorialActive(4) && normalizeTutorialProgress(account.tutorialProgress).step === 0) setTutorialStep(1);
}

function tutorialMealRestriction(vendor) {
  if (!isTutorialActive(5) || vendor !== "주점") return null;
  return { active: true, minimumFullness: 100, maximumFullness: 200, minimumAlcohol: 3 };
}

async function handleTutorialMealOpen() {
  if (!isTutorialActive(5)) return;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (progress.step !== 1) return;
  if (isTutorialActive(5) && progress.step === 1) setTutorialStep(2);
}

async function handleTutorialTavernEntered() {
  if (!isTutorialActive(5)) return;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (progress.step !== 0) return;
  setTutorialStep(1);
  if (progress.tavernEventDialogueStage < 1) hideTutorial();
  else renderTutorial();
}

async function playFirstTavernEventOpeningDialogue() {
  if (!account) return false;
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (eventState.activeId !== "N_E_001" || eventState.stage !== 2
    || currentSettlementPlacement()?.id !== FIRST_TUTORIAL_DESTINATION_ID) return false;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (progress.tavernEventDialogueStage >= 1) {
    if (isTutorialActive(5)) renderTutorial();
    return true;
  }
  const key = "N_E_001:DL_E_001_2:opening";
  if (nahanaEventHardcodedDialoguesInFlight.has(key)) return true;
  nahanaEventHardcodedDialoguesInFlight.add(key);
  const played = await playDialogueSegment("DL_E_001_2", 1, 4, {
    variables: { 현재거점명: currentSettlementPlacement()?.name || "하이렌바흐" }
  });
  nahanaEventHardcodedDialoguesInFlight.delete(key);
  if (!played) return false;
  const next = normalizeTutorialProgress(account.tutorialProgress);
  next.tavernEventDialogueStage = Math.max(next.tavernEventDialogueStage, 1);
  account.tutorialProgress = next;
  persistAccount();
  if (isTutorialActive(5)) renderTutorial();
  return true;
}

async function playTavernTutorialDialogueBeforeMeal() {
  if (!account) return false;
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (eventState.activeId !== "N_E_001" || eventState.stage !== 2
    || currentSettlementPlacement()?.id !== FIRST_TUTORIAL_DESTINATION_ID) return false;
  let progress = normalizeTutorialProgress(account.tutorialProgress);
  if (progress.tavernEventDialogueStage >= 2) return true;
  if (progress.tavernEventDialogueStage < 1 && !await playFirstTavernEventOpeningDialogue()) return false;
  if (isTutorialActive(5)) hideTutorial();
  const played = await playDialogueSegment("DL_E_001_2", 5, 11, {
    variables: { 현재거점명: currentSettlementPlacement()?.name || "하이렌바흐" }
  });
  if (!played) return false;
  progress = normalizeTutorialProgress(account.tutorialProgress);
  progress.tavernEventDialogueStage = Math.max(progress.tavernEventDialogueStage, 2);
  account.tutorialProgress = progress;
  persistAccount();
  return true;
}

async function playTavernTutorialDialogueAfterMeal() {
  if (!account) return false;
  const eventState = normalizeNahanaEventState(account.nahanaEvents);
  if (eventState.activeId !== "N_E_001" || eventState.stage !== 2
    || currentSettlementPlacement()?.id !== FIRST_TUTORIAL_DESTINATION_ID) {
    setTavernStoryDialogueLock(false);
    return false;
  }
  let progress = normalizeTutorialProgress(account.tutorialProgress);
  if (progress.tavernEventDialogueStage >= 3) {
    setTavernStoryDialogueLock(false);
    return true;
  }
  setTavernStoryDialogueLock(true);
  try {
    if (progress.tavernEventDialogueStage < 2 && !await playTavernTutorialDialogueBeforeMeal()) return false;
    const played = await playDialogueSegment("DL_E_001_2", 12, Number.POSITIVE_INFINITY, {
      completeDialogue: true,
      variables: { 현재거점명: currentSettlementPlacement()?.name || "하이렌바흐" }
    });
    if (!played) return false;
    progress = normalizeTutorialProgress(account.tutorialProgress);
    progress.tavernEventDialogueStage = 3;
    account.tutorialProgress = progress;
    persistAccount();
    return true;
  } finally {
    setTavernStoryDialogueLock(false);
  }
}

function handleTutorialMealOrderChange(detail) {
  if (!isTutorialActive(5)) return;
  const step = normalizeTutorialProgress(account.tutorialProgress).step;
  if (step === 2 && detail.valid && detail.fullness >= 100 && detail.fullness <= 200 && detail.alcoholCount >= 3) setTutorialStep(3);
  else if (step === 2) scheduleTutorialPosition();
}

function handleTutorialMealViewChange(detail) {
  if (isTutorialActive(5) && normalizeTutorialProgress(account.tutorialProgress).step === 3 && detail.view === "payment") setTutorialStep(4);
}

function handleTutorialMealComplete(detail) {
  if (!isTutorialActive(5) || detail.vendor !== "주점" || detail.kind !== "meal") return;
  setTavernStoryDialogueLock(true);
  account.tutorialProgress = normalizeTutorialProgress(account.tutorialProgress);
  account.tutorialProgress.tavernTutorialMealCompleted = true;
  account.tutorialProgress.waitingForTavernExit = true;
  completeTutorial(5);
}

function handleTutorialTavernExit() {
  if (!account) return;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (!progress.waitingForTavernExit || !progress.completed.includes(5) || !shouldStartTutorial(6)) return;
  progress.waitingForTavernExit = false;
  account.tutorialProgress = progress;
  persistAccount();
  startTutorial(6);
}

function handleTutorialFacilityChange(detail) {
  if (!account) return;
  const progress = normalizeTutorialProgress(account.tutorialProgress);
  if (isTutorialActive(5) && progress.step === 0 && detail.open && detail.facilityType === "주점") void handleTutorialTavernEntered();
  if (isTutorialActive(6) && progress.step === 0 && detail.open && detail.facilityType === "여관") setTutorialStep(1);
  if (isTutorialActive(TUTORIAL_IDS.GUILD_CONTRIBUTION)
    && progress.step === 0
    && detail.open
    && detail.facilityType === "상업조합") {
    setTutorialStep(1);
  }
  scheduleTutorialPosition();
}

function handleTutorialTradeOpen(detail) {
  const facilityType = String(detail.facilityType || "");
  if (facilityType === "환전상") {
    if (shouldStartTutorial(TUTORIAL_IDS.CURRENCY_EXCHANGE)) {
      window.setTimeout(() => {
        if (window.ProjectWTrade.isOpen?.()) startTutorial(TUTORIAL_IDS.CURRENCY_EXCHANGE);
      }, 0);
    }
    return;
  }
  if (!["상회", "교역소", "시장", "좌판"].includes(facilityType)) return;
  latestTradeTutorialContext = {
    facilityType,
    settlementCategory: String(detail.settlementCategory || ""),
    snackAvailable: Boolean(detail.snackAvailable)
  };
  if (shouldStartTutorial(8)) {
    window.setTimeout(() => {
      if (latestTradeTutorialContext && window.ProjectWTrade.isOpen?.()) startTutorial(8);
    }, 0);
    return;
  }
  maybeStartSnackTutorial();
}

function maybeStartSnackTutorial() {
  if (!latestTradeTutorialContext || !window.ProjectWTrade.isOpen?.() || !shouldStartTutorial(9)) return;
  const cityMarket = latestTradeTutorialContext.facilityType === "시장"
    && ["도시", "대도시"].includes(latestTradeTutorialContext.settlementCategory)
    && latestTradeTutorialContext.snackAvailable;
  if (cityMarket) startTutorial(9);
}

function handleTutorialInnViewChange(detail) {
  if (!isTutorialActive(6)) return;
  const step = normalizeTutorialProgress(account.tutorialProgress).step;
  if (step === 5 && detail.view === "lodging") setTutorialStep(6);
  else if (step === 7 && detail.view === "payment") setTutorialStep(8);
}

// 이벤트 연결 규칙:
// 연결된 대화_1~3은 이벤트 발생·진행·완료 조건 순서로 재생한다.
// 연결된 대화_하드코딩_1~3은 튜토리얼처럼 기존 기능과 결합된 대화를 이벤트별 코드에서 처리한다.
// 보상은 아이템 데이터가 아니라 이벤트 ID별 기능 해금 코드로 지급하며, 모든 이벤트는 ID 순서대로 진행한다.
function tutorialAllowsRoadEventSystems() {
  const progress = normalizeTutorialProgress(account?.tutorialProgress);
  return progress.reachedHirenbach;
}
function showGameNotice(message, tone = "") {
  window.clearTimeout(noticeTimer);
  const copy = String(message || "").trim();
  const deteriorationDiscard = copy.includes("열화내구도") && copy.includes("폐기");
  const levelUp = tone === "level-up";
  gameNotice.textContent = copy;
  gameNotice.classList.toggle("is-deterioration-discard", deteriorationDiscard);
  gameNotice.classList.toggle("is-level-up", levelUp);
  gameNotice.setAttribute("aria-live", deteriorationDiscard || levelUp ? "assertive" : "polite");
  gameNotice.hidden = false;
  const displayDuration = Math.min(10000, Math.max(levelUp ? 7000 : 5000, 3500 + (copy.length * 60)));
  noticeTimer = window.setTimeout(() => {
    gameNotice.hidden = true;
  }, displayDuration);
}

function showBargainResultFeedback(success) {
  if (!bargainResultNotice) return;
  window.clearTimeout(bargainResultNoticeTimer);
  window.clearTimeout(bargainResultNoticeHideTimer);
  bargainResultNotice.classList.remove("is-visible", "is-success", "is-failure");
  bargainResultNotice.classList.add(success ? "is-success" : "is-failure");
  bargainResultNotice.textContent = success
    ? "흥정 성공 · 내가 건네는 것의 가치가 상승했습니다."
    : "흥정 실패 · 추가 가치 보정을 얻지 못했습니다.";
  bargainResultNotice.hidden = false;
  requestAnimationFrame(() => bargainResultNotice.classList.add("is-visible"));
  bargainResultNoticeTimer = window.setTimeout(() => {
    bargainResultNotice.classList.remove("is-visible");
    bargainResultNoticeHideTimer = window.setTimeout(() => {
      bargainResultNotice.hidden = true;
    }, 240);
  }, 3000);
}

function queueFootprintNotice(title) {
  footprintNoticeQueue.push(String(title || "새로운 발자취"));
  if (!footprintNoticeActive) showNextFootprintNotice();
}

function showNextFootprintNotice() {
  if (!footprintNotice || !footprintNoticeTitle || !footprintNoticeQueue.length) {
    footprintNoticeActive = false;
    return;
  }
  footprintNoticeActive = true;
  footprintNoticeTitle.textContent = footprintNoticeQueue.shift();
  footprintNotice.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => footprintNotice.classList.add("is-visible")));
  window.clearTimeout(footprintNoticeTimer);
  footprintNoticeTimer = window.setTimeout(() => {
    footprintNotice.classList.remove("is-visible");
    footprintNoticeTimer = window.setTimeout(() => {
      footprintNotice.hidden = true;
      footprintNoticeActive = false;
      showNextFootprintNotice();
    }, 350);
  }, 10000);
}

function moveScene(direction) {
  if (partnerEventPanel && !partnerEventPanel.hidden) return;
  if (window.ProjectWInn.isActive?.()) {
    if (innModal?.classList.contains("is-detail-view")) return;
    const innSceneOrder = ["inn", "partner", "cargo", "map"];
    const activeInnScene = window.ProjectWInn.isOpen?.() ? "inn" : currentScene;
    const currentIndex = Math.max(0, innSceneOrder.indexOf(activeInnScene));
    const nextScene = innSceneOrder[(currentIndex + direction + innSceneOrder.length) % innSceneOrder.length];
    if (nextScene === "inn") returnToInnScene(direction);
    else openInnSceneView(nextScene, direction);
    return;
  }
  if (window.ProjectWTrade.isOpen() || window.ProjectWMeal.isOpen() || window.ProjectWEntryTax.isOpen() || !serviceModal?.hidden || moving || gameScreen.classList.contains("is-onboarding") || gameScreen.classList.contains("is-destination-picking")) return;
  const currentIndex = sceneOrder.indexOf(currentScene);
  const nextScene = sceneOrder[(currentIndex + direction + sceneOrder.length) % sceneOrder.length];
  showScene(nextScene, direction, true);
}

function openInnSceneView(sceneName, direction = 1) {
  if (!["partner", "cargo", "map"].includes(sceneName)) return;
  if (window.ProjectWInn.isOpen?.() && !window.ProjectWInn.suspendForScene?.()) return;
  if (!window.ProjectWInn.isSceneVisit?.()) return;
  gameScreen.classList.remove("is-inn-scene-home");
  gameScreen.classList.add("is-inn-scene-visit");
  applyInnSceneBackgroundContext();
  showScene(sceneName, direction, true);
  updatePartnerUi();
}

function applyInnSceneBackgroundContext() {
  if (!window.ProjectWInn?.isSceneVisit?.()
    || !gameScreen.classList.contains("is-inn-scene-visit")
    || account?.travel?.mode !== "settlement") return;
  setSceneBackground(partnerBackground, "Asset_A_10", "여관 객실의 파트너뷰 배경");
  setSceneBackground(mapBackground, "Asset_A_10", "여관 객실에서 펼쳐 본 지도");
}

function returnToInnScene(direction = -1) {
  if (!window.ProjectWInn.isSceneVisit?.()) return;
  gameScreen.classList.remove("is-inn-scene-visit");
  gameScreen.classList.add("is-inn-scene-home");
  window.ProjectWInn.resumeFromScene?.();
  showScene("road", direction, true);
  syncTravelExperience();
  updatePartnerUi();
}

function showScene(next, direction, animate) {
  const previous = currentScene;
  if (account?.travel?.moving && previous !== next) reconcileTravelProgress(false);
  currentScene = next;
  if (account?.travel?.moving && previous !== next) {
    account.travel.progressRate = calculateTravelRate(next, account.travel);
    account.travel.progressUpdatedAt = Date.now();
    persistAccount();
  }
  const incoming = cards.find(card => card.dataset.scene === next);
  const outgoing = cards.find(card => card.dataset.scene === previous);
  if (next !== "partner") {
    closePartnerEventPanel();
      closePartnerSnackPanel();
    hidePartnerCommonSensePopup(true);
    resetPartnerTouchSequence();
    hidePartnerTouchDialogue(true);
  } else {
    updatePartnerUi();
  }
  if (next !== "road") hideRoadStatusTooltip();
  if (next !== "cargo") hideCargoWagonTooltip();
  if (next !== "cargo") window.ProjectWCargo.hideTooltip();
  if (next !== "map") window.ProjectWMapView.hideTooltip();
  if (next === "map") {
    window.ProjectWMapView.load().then(loaded => {
      if (loaded && account?.travel?.positionId) {
        const travel = account.travel;
        window.ProjectWMapView.updatePlayerProgress(
          travel.positionId,
          travel.moving ? travel.routePath[travel.routeIndex + 1] || "" : "",
          liveSegmentProgress(travel)
        );
      }
    });
  }

  if (animate && outgoing && incoming) {
    moving = true;
    incoming.classList.add(direction > 0 ? "is-entering-from-right" : "is-entering-from-left");
    incoming.removeAttribute("aria-hidden");

    requestAnimationFrame(() => requestAnimationFrame(() => {
      outgoing.classList.add(direction > 0 ? "is-leaving-left" : "is-leaving-right");
      incoming.classList.add("is-active");
      incoming.classList.remove("is-entering-from-right", "is-entering-from-left");
    }));

    window.setTimeout(() => {
      outgoing.classList.remove("is-active", "is-leaving-left", "is-leaving-right");
      outgoing.setAttribute("aria-hidden", "true");
      moving = false;
    }, 540);
  } else {
    cards.forEach(card => {
      const active = card.dataset.scene === next;
      card.classList.toggle("is-active", active);
      if (active) card.removeAttribute("aria-hidden");
      else card.setAttribute("aria-hidden", "true");
    });
  }
  if (account?.travel?.moving && previous !== next) {
    syncTravelExperience();
    scheduleTravelStep();
  }
  handleTutorialSceneChanged(next);
  if (next === "partner") window.setTimeout(maybeStartEarlyPartnerTutorial, 0);
  updatePartnerEventUi();
  refreshAdvancedTutorialLaunchers();
  scheduleInterfacePersistence();
}

window.ProjectWAccount = {
  getUserName: () => account?.userName ?? "당신",
  getDisplayName: () => account?.userName === "당신" || !account ? "플레이어" : account.userName
};

window.ProjectWDialoguePlayer = {
  play: playDialogue
};

window.ProjectWNahanaEvents = {
  start: eventId => triggerNahanaEventOccurrence(eventId),
  progress: () => resolveNahanaEventCondition(2),
  complete: () => resolveNahanaEventCondition(3),
  getMarketGift: options => getNahanaEventMarketGift(options),
  completeMarketGiftPurchase: options => completeNahanaEventMarketGiftPurchase(options)
};
