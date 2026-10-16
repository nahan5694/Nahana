(function exposeSaveSlots() {
  const META_KEY = "project_w_save_slots_v1";
  const PENDING_ACTION_KEY = "project_w_save_slot_pending_action_v1";
  const SLOT_COUNT = 3;
  const BASE_KEYS = Object.freeze([
    "project_w_account_v1",
    "project_w_cargo_v1",
    "project_w_merchant_path_v1",
    "project_w_trade_v1"
  ]);

  let available = true;
  let meta = loadMeta();
  migrateLegacySave();

  function slotKey(slot, baseKey) {
    return `project_w_save_slot_${normalizeSlot(slot)}__${String(baseKey || "")}`;
  }

  function normalizeSlot(value) {
    return Math.min(SLOT_COUNT, Math.max(1, Math.trunc(Number(value) || 1)));
  }

  function loadMeta() {
    try {
      const parsed = JSON.parse(localStorage.getItem(META_KEY) || "null");
      return {
        schemaVersion: 1,
        activeSlot: normalizeSlot(parsed?.activeSlot),
        migrationPending: Boolean(parsed?.migrationPending)
      };
    } catch (error) {
      console.error("세이브 슬롯 설정을 불러오지 못했습니다.", error);
      return { schemaVersion: 1, activeSlot: 1, migrationPending: true };
    }
  }

  function persistMeta(nextMeta = meta) {
    localStorage.setItem(META_KEY, JSON.stringify(nextMeta));
    const verified = JSON.parse(localStorage.getItem(META_KEY) || "null");
    if (!verified || normalizeSlot(verified.activeSlot) !== normalizeSlot(nextMeta.activeSlot)) {
      throw new Error("세이브 슬롯 설정 검증에 실패했습니다.");
    }
  }

  function migrateLegacySave() {
    try {
      const hasLegacy = BASE_KEYS.some(baseKey => localStorage.getItem(baseKey) !== null);
      if (!hasLegacy) {
        meta.migrationPending = false;
        persistMeta(meta);
        return;
      }

      meta.activeSlot = 1;
      meta.migrationPending = true;
      persistMeta(meta);
      BASE_KEYS.forEach(baseKey => {
        const legacyValue = localStorage.getItem(baseKey);
        if (legacyValue === null) return;
        const destination = slotKey(1, baseKey);
        if (localStorage.getItem(destination) === null) localStorage.setItem(destination, legacyValue);
        if (localStorage.getItem(destination) !== legacyValue) {
          throw new Error(`${baseKey}의 슬롯 1 복사 검증에 실패했습니다.`);
        }
        localStorage.removeItem(baseKey);
      });
      meta.migrationPending = false;
      persistMeta(meta);
    } catch (error) {
      available = false;
      meta = { schemaVersion: 1, activeSlot: 1, migrationPending: true };
      console.error("기존 세이브를 슬롯 1로 옮기지 못했습니다. 기존 저장 키를 보존합니다.", error);
    }
  }

  function resolvedKey(baseKey) {
    const base = String(baseKey || "");
    if (!available && meta.activeSlot === 1 && localStorage.getItem(base) !== null) return base;
    return slotKey(meta.activeSlot, base);
  }

  function parseStored(slot, baseKey) {
    const raw = localStorage.getItem(slotKey(slot, baseKey));
    if (raw === null) return { exists: false, value: null };
    try {
      return { exists: true, value: JSON.parse(raw) };
    } catch (error) {
      return { exists: true, value: null };
    }
  }

  function slotSummary(slot) {
    const normalizedSlot = normalizeSlot(slot);
    const accountResult = parseStored(normalizedSlot, "project_w_account_v1");
    if (!accountResult.exists) {
      return { slot: normalizedSlot, state: "empty", occupied: false, active: normalizedSlot === meta.activeSlot };
    }
    const account = accountResult.value;
    if (!account || typeof account.userName !== "string" || !account.userName.trim()) {
      return { slot: normalizedSlot, state: "damaged", occupied: false, active: normalizedSlot === meta.activeSlot };
    }
    const merchantPath = parseStored(normalizedSlot, "project_w_merchant_path_v1").value;
    return {
      slot: normalizedSlot,
      state: "occupied",
      occupied: true,
      active: normalizedSlot === meta.activeSlot,
      name: account.userName.trim(),
      peddlerLevel: Math.max(1, Math.trunc(Number(merchantPath?.peddler?.level) || 1)),
      companionLevel: Math.max(1, Math.trunc(Number(account.partner?.companionRank) || 1)),
      day: Math.max(1, Math.trunc(Number(account.worldTime?.day) || 1)),
      difficultyScore: Number.isFinite(Number(account.difficulty?.score))
        ? Math.trunc(Number(account.difficulty.score))
        : 0
    };
  }

  function activate(slot) {
    if (!available) return false;
    const nextMeta = { ...meta, activeSlot: normalizeSlot(slot), migrationPending: false };
    try {
      persistMeta(nextMeta);
      meta = nextMeta;
      return true;
    } catch (error) {
      console.error("선택한 세이브 슬롯을 활성화하지 못했습니다.", error);
      return false;
    }
  }

  function setPendingAction(action, options = {}) {
    try {
      if (["resume", "new"].includes(action)) {
        sessionStorage.setItem(PENDING_ACTION_KEY, JSON.stringify({
          action,
          skipTutorials: action === "new" && Boolean(options.skipTutorials)
        }));
      }
      else sessionStorage.removeItem(PENDING_ACTION_KEY);
    } catch (error) {
      console.error(error);
    }
  }

  function consumePendingAction() {
    try {
      const stored = sessionStorage.getItem(PENDING_ACTION_KEY) || "";
      sessionStorage.removeItem(PENDING_ACTION_KEY);
      if (["resume", "new"].includes(stored)) return { action: stored, skipTutorials: false };
      const parsed = JSON.parse(stored || "null");
      return ["resume", "new"].includes(parsed?.action)
        ? { action: parsed.action, skipTutorials: Boolean(parsed.skipTutorials) }
        : { action: "", skipTutorials: false };
    } catch (error) {
      console.error(error);
      return { action: "", skipTutorials: false };
    }
  }

  window.ProjectWSaveSlots = {
    SLOT_COUNT,
    key: resolvedKey,
    activeSlot: () => meta.activeSlot,
    isAvailable: () => available && !meta.migrationPending,
    activate,
    slotSummary,
    summaries: () => Array.from({ length: SLOT_COUNT }, (_, index) => slotSummary(index + 1)),
    hasAnySave: () => Array.from({ length: SLOT_COUNT }, (_, index) => slotSummary(index + 1)).some(summary => summary.occupied),
    setPendingAction,
    consumePendingAction
  };
}());
