(function exposeBillNotes() {
  const SCHEMA_VERSION = 3;
  const FEE_RATE = 0.03;
  const DENOMINATIONS = Object.freeze([500, 1000, 5000, 10000]);
  const MANAGER_NAMES = Object.freeze([
    "Elias Montfort", "Adrian Vellier", "Lucien Harcourt",
    "Matteo Bellori", "Roland Wycliffe", "Stefan Alder"
  ]);
  let certificateSequence = 0;

  function managerNameFor(branch) {
    let hash = 0;
    for (const character of String(branch || "상업조합")) hash = ((hash * 31) + character.charCodeAt(0)) >>> 0;
    return MANAGER_NAMES[hash % MANAGER_NAMES.length];
  }

  function createState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      certificates: []
    };
  }

  function certificateId() {
    certificateSequence += 1;
    return `bill-${Date.now().toString(36)}-${certificateSequence.toString(36)}`;
  }

  function normalizeCertificate(value, fallbackDenomination = 0) {
    const denomination = DENOMINATIONS.find(entry => entry === Math.trunc(Number(value?.denomination ?? fallbackDenomination) || 0));
    const quantity = Math.max(0, Math.trunc(Number(value?.quantity) || 0));
    if (!denomination || quantity <= 0) return null;
    return {
      id: String(value?.id || certificateId()),
      denomination,
      quantity,
      organization: String(value?.organization || "롬 상업조합"),
      branch: String(value?.branch || "발행 지부 미상"),
      issuedDay: Math.max(0, Math.trunc(Number(value?.issuedDay) || 0)),
      issuedDate: String(value?.issuedDate || "발행일 미상"),
      managerName: String(value?.managerName || managerNameFor(value?.branch))
    };
  }

  function normalizeState(value) {
    const source = value && typeof value === "object" ? value : {};
    const state = createState();
    if (Array.isArray(source.certificates)) {
      state.certificates = source.certificates.map(value => normalizeCertificate(value)).filter(Boolean);
      return state;
    }
    const sourceHoldings = source.holdings && typeof source.holdings === "object" ? source.holdings : source;
    state.certificates = DENOMINATIONS.map(denomination => normalizeCertificate({
      denomination,
      quantity: sourceHoldings?.[denomination],
      organization: "롬 상업조합",
      branch: "이전 발행분",
      issuedDate: "발행일 미상"
    })).filter(Boolean);
    return state;
  }

  function entries(value) {
    const state = normalizeState(value);
    return DENOMINATIONS.map(denomination => ({
      id: String(denomination),
      denomination,
      quantity: state.certificates
        .filter(certificate => certificate.denomination === denomination)
        .reduce((total, certificate) => total + certificate.quantity, 0)
    }));
  }

  function certificates(value) {
    return normalizeState(value).certificates.map(certificate => ({ ...certificate }));
  }

  function totalValue(value) {
    return entries(value).reduce((total, entry) => total + (entry.denomination * entry.quantity), 0);
  }

  function selectionValue(selection) {
    if (!(selection instanceof Map)) return 0;
    return [...selection].reduce((total, [key, quantity]) => {
      const denomination = DENOMINATIONS.find(value => String(value) === String(key));
      return total + ((denomination || 0) * Math.max(0, Math.trunc(Number(quantity) || 0)));
    }, 0);
  }

  function addSelection(value, selection, direction = 1, issuance = {}) {
    const state = normalizeState(value);
    if (!(selection instanceof Map)) return state;
    selection.forEach((rawQuantity, key) => {
      const denomination = DENOMINATIONS.find(entry => String(entry) === String(key));
      if (!denomination) return;
      let quantity = Math.max(0, Math.trunc(Number(rawQuantity) || 0));
      if (quantity <= 0) return;
      if (direction > 0) {
        const certificate = normalizeCertificate({
          ...issuance,
          id: certificateId(),
          denomination,
          quantity
        });
        if (certificate) state.certificates.push(certificate);
        return;
      }
      state.certificates
        .filter(certificate => certificate.denomination === denomination)
        .sort((left, right) => left.issuedDay - right.issuedDay)
        .forEach(certificate => {
          if (quantity <= 0) return;
          const removed = Math.min(quantity, certificate.quantity);
          certificate.quantity -= removed;
          quantity -= removed;
        });
    });
    state.certificates = state.certificates.filter(certificate => certificate.quantity > 0);
    return state;
  }

  function issueCost(faceValue) {
    const value = Math.max(0, Math.trunc(Number(faceValue) || 0));
    const fee = Math.ceil(value * FEE_RATE);
    return { faceValue: value, fee, total: value + fee };
  }

  function redemptionValue(faceValue) {
    const value = Math.max(0, Math.trunc(Number(faceValue) || 0));
    const fee = Math.ceil(value * FEE_RATE);
    return { faceValue: value, fee, total: Math.max(0, value - fee) };
  }

  function walletQuantity(wallet, currencyId) {
    const stored = wallet?.[currencyId];
    const quantity = stored && typeof stored === "object" ? stored.quantity : stored;
    return Math.max(0, Math.trunc(Number(quantity) || 0));
  }

  function bestCurrencySelection(targetValue, currencies, wallet, getValue) {
    const target = Math.max(0, Math.ceil(Number(targetValue) || 0));
    if (target <= 0) return { selection: new Map(), paid: 0, sufficient: true };
    const entries = (Array.isArray(currencies) ? currencies : []).map(currency => ({
      id: currency.id,
      value: Math.max(1, Math.round(Number(getValue(currency)) || 0)),
      quantity: walletQuantity(wallet, currency.id)
    })).filter(entry => entry.id && entry.quantity > 0 && entry.value > 0);
    if (!entries.length) return { selection: new Map(), paid: 0, sufficient: false };

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

    let paid = -1;
    for (let value = target; value <= limit; value += 1) {
      if (best[value]) { paid = value; break; }
    }
    if (paid < 0) {
      for (let value = limit; value >= 0; value -= 1) {
        if (best[value]) { paid = value; break; }
      }
    }
    const selection = new Map();
    let cursor = best[paid];
    while (cursor?.previous) {
      selection.set(cursor.currencyId, (selection.get(cursor.currencyId) || 0) + cursor.quantity);
      cursor = cursor.previous;
    }
    return { selection, paid: Math.max(0, paid), sufficient: paid >= target };
  }

  function deductCurrency(wallet, selection) {
    const result = { ...(wallet || {}) };
    selection?.forEach((quantity, currencyId) => {
      const stored = result[currencyId];
      const next = Math.max(0, walletQuantity(result, currencyId) - Math.max(0, Math.trunc(Number(quantity) || 0)));
      result[currencyId] = stored && typeof stored === "object" ? { ...stored, quantity: next } : next;
    });
    return result;
  }

  function grantCurrencyValue(wallet, targetValue, currencies, region, getValue) {
    const result = { ...(wallet || {}) };
    let remaining = Math.max(0, Math.trunc(Number(targetValue) || 0));
    const regionName = String(region || "중부");
    const ranked = (Array.isArray(currencies) ? currencies : []).map(currency => {
      const regions = String(currency.region || "").split(/[\/,·\s]+/).filter(Boolean);
      return { currency, value: Math.max(1, Math.round(Number(getValue(currency)) || 0)), local: regions.includes(regionName) };
    }).filter(entry => entry.currency?.id && entry.value > 0)
      .sort((left, right) => Number(right.local) - Number(left.local) || right.value - left.value);
    ranked.forEach(entry => {
      if (remaining < entry.value) return;
      const quantity = Math.floor(remaining / entry.value);
      if (quantity <= 0) return;
      const id = entry.currency.id;
      const stored = result[id];
      const next = walletQuantity(result, id) + quantity;
      result[id] = stored && typeof stored === "object" ? { ...stored, quantity: next } : next;
      remaining -= entry.value * quantity;
    });
    return { wallet: result, granted: Math.max(0, Math.trunc(Number(targetValue) || 0) - remaining), remainder: remaining };
  }

  window.ProjectWBillNotes = {
    FEE_RATE,
    DENOMINATIONS,
    createState,
    normalizeState,
    entries,
    certificates,
    managerNameFor,
    totalValue,
    selectionValue,
    addSelection,
    issueCost,
    redemptionValue,
    bestCurrencySelection,
    deductCurrency,
    grantCurrencyValue
  };
}());
