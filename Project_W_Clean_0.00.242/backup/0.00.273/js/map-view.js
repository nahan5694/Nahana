(function exposeMapView() {
  const CITYS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=0&single=true&output=csv";
  const ROUTES_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=878415316&single=true&output=csv";
  const MAP_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyyCK6mm4FwUdj_pw5jYjvtCLahL1HM8vIibuXGGeaSYMgzBFEkpSRvQKglScB3USEAW3dy8RoMune/pub?gid=1200522902&single=true&output=csv";
  const SOURCE_MAP_ID = "Asset_Map_0";
  const SOURCE_MAP_WIDTH = 870;
  const SOURCE_MAP_HEIGHT = 1520;
  const MAP_IDS = ["Asset_Map_1", "Asset_Map_2", "Asset_Map_3"];
  const MAP_CROPS = {
    Asset_Map_1: { startY: 0, height: 520 },
    Asset_Map_2: { startY: 500, height: 520 },
    Asset_Map_3: { startY: 1000, height: 520 }
  };

  let getAssetUrl = () => "";
  let getInformationCards = () => [];
  let getCityEvents = () => [];
  let notify = () => {};
  let initialized = false;
  let loaded = false;
  let loadPromise = null;
  let currentMapId = MAP_IDS[0];
  let lastPointer = null;
  let playerPositionId = "";
  let playerNextPositionId = "";
  let playerSegmentProgress = 0;
  let wolfenMarkerPlacementId = "";
  let wolfenMarkerAssetUrl = "";
  let wolfenMarkerDetails = { remainingDays: 0, expiresDay: 0 };
  let destinationSelection = null;
  let focusedSettlementId = "";
  let mapData = createEmptyData();
  const distanceCache = new Map();
  const elements = {};

  function createEmptyData() {
    return { nodes: [], dots: [], labels: [], connections: [], placementsById: new Map() };
  }

  function init(options = {}) {
    if (initialized) return;
    getAssetUrl = typeof options.getAssetUrl === "function" ? options.getAssetUrl : getAssetUrl;
    getInformationCards = typeof options.getInformationCards === "function" ? options.getInformationCards : getInformationCards;
    getCityEvents = typeof options.getCityEvents === "function" ? options.getCityEvents : getCityEvents;
    notify = typeof options.notify === "function" ? options.notify : notify;

    elements.root = document.querySelector("#map-view-ui");
    elements.image = document.querySelector("#map-view-image");
    elements.imageEmpty = document.querySelector("#map-view-empty");
    elements.dataStatus = document.querySelector("#map-view-data-status");
    elements.routes = document.querySelector("#map-view-routes");
    elements.placements = document.querySelector("#map-view-placements");
    elements.tooltip = document.querySelector("#map-tooltip");
    elements.informationTooltip = document.querySelector("#map-information-tooltip");
    elements.destinationPicker = document.querySelector("#map-destination-picker");
    elements.destinationMessage = document.querySelector("#map-destination-message");
    elements.destinationCancel = document.querySelector("#map-destination-cancel");
    elements.searchToggle = document.querySelector("#map-search-toggle");
    elements.searchPanel = document.querySelector("#map-search-panel");
    elements.searchClose = document.querySelector("#map-search-close");
    elements.searchInput = document.querySelector("#map-search-input");
    elements.searchCount = document.querySelector("#map-search-count");
    elements.searchList = document.querySelector("#map-search-list");
    elements.tabs = [...elements.root.querySelectorAll("[data-map-tab]")];
    if (Object.values(elements).some(value => value == null)) return;

    elements.placements.classList.add("map-view-placement-layer");
    elements.tabs.forEach(tab => tab.addEventListener("click", () => setCurrentMap(tab.dataset.mapId)));
    elements.destinationCancel.addEventListener("click", cancelDestinationSelection);
    elements.searchToggle.addEventListener("click", () => setSettlementSearchOpen(elements.searchPanel.hidden));
    elements.searchClose.addEventListener("click", () => setSettlementSearchOpen(false));
    elements.searchInput.addEventListener("input", renderSettlementSearchList);
    window.addEventListener("resize", () => {
      if (!elements.tooltip.hidden && lastPointer) positionTooltip(lastPointer.x, lastPointer.y);
    });

    initialized = true;
    setCurrentMap(currentMapId);
  }

  function load() {
    if (!initialized) return Promise.resolve(false);
    if (loaded) {
      renderSettlementSearchList();
      return Promise.resolve(true);
    }
    if (loadPromise) return loadPromise;

    setDataStatus("Citys·Routes·Map 데이터를 불러오는 중입니다.", false);
    loadPromise = Promise.all([
      window.ProjectWData.loadCsv(CITYS_CSV_URL),
      window.ProjectWData.loadCsv(ROUTES_CSV_URL),
      window.ProjectWData.loadCsv(MAP_CSV_URL)
    ])
      .then(([cityRows, routeRows, mapRows]) => {
        const nodes = parseCityRows(cityRows);
        const dots = parseRouteRows(routeRows);
        const labels = parseMapRows(mapRows);
        if (!nodes.length) throw new Error("Citys 시트에 표시 가능한 Node가 없습니다.");
        if (!dots.length) throw new Error("Routes 시트에 표시 가능한 Dot이 없습니다.");

        const placementsById = new Map([...nodes, ...dots].map(placement => [placement.id, placement]));
        mapData = {
          nodes,
          dots,
          labels,
          connections: buildConnections(dots, placementsById),
          placementsById
        };
        distanceCache.clear();
        loaded = true;
        setDataStatus("", true);
        renderSettlementSearchList();
        focusPlayerPosition();
        return true;
      })
      .catch(error => {
        console.error(error);
        loaded = false;
        mapData = createEmptyData();
        renderMapContents();
        const directFile = window.location.protocol === "file:";
        const status = directFile
          ? "브라우저 보안상 index.html 직접 실행으로는 지도 CSV를 읽을 수 없습니다. 프로젝트의 start-project-w.cmd로 실행해 주세요."
          : "지도 CSV를 불러오지 못했습니다. 로컬 서버와 네트워크 상태를 확인해 주세요.";
        setDataStatus(status, false, true);
        notify(directFile
          ? "지도 CSV 연결을 위해 start-project-w.cmd로 게임을 실행해 주세요."
          : "Citys·Routes·Map CSV를 불러오지 못해 지도 객체를 표시할 수 없습니다.");
        return false;
      })
      .finally(() => {
        if (!loaded) loadPromise = null;
      });
    return loadPromise;
  }

  function parseCityRows(rows) {
    return rows.flatMap(row => {
      const id = cell(row, "ID");
      const point = parsePoint(row);
      const assetId = cell(row, "에셋");
      if (!/^MAP_NODE_\d+$/.test(id) || !point || !assetId) return [];
      return [{
        id,
        kind: "node",
        name: cell(row, "이름"),
        category: cell(row, "분류"),
        affiliation: cell(row, "소속"),
        region: cell(row, "지역 분류"),
        assetId,
        x: point.x,
        y: point.y,
        terrains: splitValues(cell(row, "지형 분류")),
        environments: splitValues(cell(row, "환경 분류")),
        description: cell(row, "설명"),
        entryTariffRate: parsePercent(cell(row, "입장관세") || cell(row, "입장 관세")),
        companyNames: [cell(row, "상회_1"), cell(row, "상회_2")].filter(Boolean),
        specialtyNames: Object.entries(row)
          .filter(([header, value]) => /^특산물(?:_\d+)?$/.test(String(header).trim()) && String(value).trim())
          .map(([, value]) => String(value).trim()),
        famousProductNames: Object.entries(row)
          .filter(([header, value]) => /^(?:명산품|명산물)(?:_\d+)?$/.test(String(header).trim()) && String(value).trim())
          .map(([, value]) => String(value).trim()),
        productionNames: Object.entries(row)
          .filter(([header, value]) => /^생산물(?:_\d+)?$/.test(String(header).trim()) && String(value).trim())
          .map(([, value]) => String(value).trim()),
        logisticsNames: Object.entries(row)
          .filter(([header, value]) => /^(?:고정물류|물류)(?:_\d+)?$/.test(String(header).trim()) && String(value).trim())
          .map(([, value]) => String(value).trim()),
        demandScores: Object.fromEntries(Object.entries(row)
          .filter(([header]) => /^S_/.test(String(header).trim()))
          .map(([header, value]) => [String(header).trim().slice(2), clamp(Number(value) || 0, 0, 50)]))
      }];
    });
  }

  function parseRouteRows(rows) {
    return rows.flatMap(row => {
      const id = cell(row, "ID");
      const point = parsePoint(row);
      if (!/^MAP_DOT_\d+$/.test(id) || !point) return [];
      const stabilityText = cell(row, "안정도");
      const securityText = cell(row, "치안");
      const stability = Number(stabilityText);
      const security = Number(securityText);
      return [{
        id,
        kind: "dot",
        name: cell(row, "이름"),
        assetId: cell(row, "에셋") || "Asset_M_Dot",
        x: point.x,
        y: point.y,
        connectionRefs: parseConnectionRefs(cell(row, "연결된 루트")),
        routeSegment: cell(row, "루트구분"),
        baseStability: clamp(stabilityText && Number.isFinite(stability) ? stability : 50, 0, 100),
        baseSecurity: clamp(securityText && Number.isFinite(security) ? security : 50, 0, 100),
        region: cell(row, "지역 분류"),
        terrains: splitValues(cell(row, "지형 분류")),
        environments: splitValues(cell(row, "환경 분류")),
        description: cell(row, "설명")
      }];
    });
  }

  function parseMapRows(rows) {
    return rows.flatMap(row => {
      const id = cell(row, "ID");
      const point = parsePoint(row);
      const name = cell(row, "이름");
      if (!/^MAP_LABEL_\d+$/.test(id) || !point || !name) return [];
      const category = cell(row, "분류");
      return [{
        id,
        kind: "label",
        name,
        displayName: category === "국가" ? `=${name}=` : name,
        category,
        description: cell(row, "설명"),
        x: point.x,
        y: point.y,
        labelSize: clamp(Math.round(Number(cell(row, "사이즈")) || 22), 10, 48)
      }];
    });
  }

  function parsePoint(row) {
    const xText = cell(row, "X축");
    const yText = cell(row, "Y축");
    if (!xText || !yText) return null;
    const x = Number(xText);
    const y = Number(yText);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    if (x < 0 || x > SOURCE_MAP_WIDTH || y < 0 || y > SOURCE_MAP_HEIGHT) return null;
    return { x, y };
  }

  function parseConnectionRefs(value) {
    return splitValues(value).flatMap(entry => {
      const match = /^(MAP_(?:NODE|DOT)_\d+)(?:\((정규|일반)\))?$/.exec(entry);
      if (!match) return [];
      return [{ id: match[1], routeType: match[2] === "정규" ? "trade" : "normal" }];
    });
  }

  function buildConnections(dots, placementsById) {
    const byPair = new Map();
    dots.forEach(dot => {
      dot.connectionRefs.forEach(reference => {
        if (!placementsById.has(reference.id) || reference.id === dot.id) return;
        const pair = [dot.id, reference.id].sort((left, right) => left.localeCompare(right));
        const key = pair.join("|");
        const existing = byPair.get(key);
        if (existing) {
          if (reference.routeType === "trade") existing.routeType = "trade";
          return;
        }
        byPair.set(key, {
          id: `MAP_VIEW_ROUTE_${String(byPair.size + 1).padStart(4, "0")}`,
          fromId: pair[0],
          toId: pair[1],
          routeType: reference.routeType
        });
      });
    });
    return [...byPair.values()];
  }

  function setCurrentMap(mapId) {
    if (!MAP_IDS.includes(mapId)) return;
    currentMapId = mapId;
    hideTooltip();
    elements.tabs.forEach(tab => {
      const active = tab.dataset.mapId === mapId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    renderMapImage();
    renderMapContents();
    renderSettlementSearchList();
  }

  function setSettlementSearchOpen(open) {
    const expanded = Boolean(open);
    elements.searchPanel.hidden = !expanded;
    elements.searchToggle.classList.toggle("is-active", expanded);
    elements.searchToggle.setAttribute("aria-expanded", String(expanded));
    if (!expanded) return;
    renderSettlementSearchList();
    window.requestAnimationFrame(() => elements.searchInput.focus({ preventScroll: true }));
  }

  function renderSettlementSearchList() {
    if (!initialized || !elements.searchList) return;
    const query = normalizeSearchText(elements.searchInput.value);
    const settlements = [...mapData.nodes]
      .filter(settlement => !query || normalizeSearchText(settlement.name).includes(query))
      .sort((left, right) => String(left.name).localeCompare(String(right.name), "ko"));
    elements.searchCount.textContent = `${settlements.length}곳`;
    if (!settlements.length) {
      const empty = document.createElement("p");
      empty.className = "map-search-empty";
      empty.textContent = loaded ? "일치하는 거점이 없습니다." : "지도 데이터를 불러오고 있습니다.";
      elements.searchList.replaceChildren(empty);
      return;
    }
    elements.searchList.replaceChildren(...settlements.map(createSettlementSearchItem));
  }

  function createSettlementSearchItem(settlement) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "map-search-item";
    button.classList.toggle("is-focused", settlement.id === focusedSettlementId);
    button.dataset.settlementId = settlement.id;
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = settlement.name || "이름 없는 거점";
    const region = document.createElement("small");
    region.textContent = settlement.region || "지역 미상";
    copy.append(name, region);
    const meta = document.createElement("span");
    meta.className = "map-search-item-meta";
    const category = document.createElement("b");
    category.textContent = settlement.category || "거점";
    const information = document.createElement("em");
    const informationCount = informationCardsForPlacement(settlement).length;
    information.textContent = `정보 ${informationCount}`;
    information.classList.toggle("has-information", informationCount > 0);
    meta.append(category, information);
    button.append(copy, meta);
    button.addEventListener("click", () => focusSettlementFromSearch(settlement));
    return button;
  }

  function focusSettlementFromSearch(settlement) {
    focusedSettlementId = settlement.id;
    const mapId = mapIdForRegion(settlement.region) || mapIdForY(settlement.y);
    setCurrentMap(mapId);
    window.requestAnimationFrame(() => {
      const marker = elements.placements.querySelector(`[data-map-view-placement-id="${settlement.id}"]`);
      marker?.focus({ preventScroll: true });
    });
  }

  function normalizeSearchText(value) {
    return String(value || "").trim().replace(/\s+/g, "").toLocaleLowerCase("ko-KR");
  }

  function renderMapImage() {
    const crop = currentCrop();
    const url = getAssetUrl(SOURCE_MAP_ID);
    elements.image.dataset.assetId = SOURCE_MAP_ID;
    elements.image.alt = `${mapName(currentMapId)} 통합 지도 구간`;
    if (!url) {
      elements.image.hidden = true;
      elements.image.removeAttribute("src");
      elements.imageEmpty.textContent = `${SOURCE_MAP_ID}의 Asset_Link가 비어 있습니다.`;
      elements.imageEmpty.hidden = false;
      return;
    }

    elements.image.hidden = false;
    elements.imageEmpty.hidden = true;
    elements.image.style.top = `${-(crop.startY / crop.height) * 100}%`;
    elements.image.style.right = "0";
    elements.image.style.bottom = "auto";
    elements.image.style.left = "0";
    elements.image.style.width = "100%";
    elements.image.style.height = `${(SOURCE_MAP_HEIGHT / crop.height) * 100}%`;
    elements.image.onload = () => {
      elements.image.hidden = false;
      elements.imageEmpty.hidden = true;
    };
    elements.image.onerror = () => {
      elements.image.hidden = true;
      elements.imageEmpty.textContent = `${SOURCE_MAP_ID} 이미지를 표시하지 못했습니다.`;
      elements.imageEmpty.hidden = false;
    };
    elements.image.src = url;
  }

  function renderMapContents() {
    if (!initialized) return;
    if (!elements.tooltip.hidden) hideTooltip();
    const placements = [...mapData.nodes, ...mapData.dots, ...mapData.labels]
      .filter(placementIntersectsCurrentCrop);
    const markers = placements.map(createMarker);
    const playerPoint = interpolatedPlayerPoint();
    if (playerPoint && placementIntersectsCurrentCrop(playerPoint)) {
      markers.push(createPlayerPin(playerPoint));
    }
    const wolfenPlacement = mapData.placementsById.get(wolfenMarkerPlacementId);
    updateWolfenRegionTabs(wolfenPlacement);
    if (wolfenPlacement && placementIntersectsCurrentCrop(wolfenPlacement)) {
      markers.push(createWolfenMarker(wolfenPlacement));
    }
    elements.placements.replaceChildren(...markers);
    renderRoutes();
  }

  function createPlayerPin(point) {
    const marker = document.createElement("span");
    marker.className = "map-player-pin";
    marker.setAttribute("aria-label", "플레이어 현재 위치");
    setMarkerPosition(marker, point);
    const url = getAssetUrl("Asset_Pin");
    if (url) {
      const image = document.createElement("img");
      image.src = url;
      image.alt = "";
      image.draggable = false;
      marker.append(image);
    }
    return marker;
  }

  function createWolfenMarker(placement) {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "map-wolfen-marker";
    marker.setAttribute("aria-describedby", "map-tooltip map-information-tooltip");
    marker.setAttribute("aria-label", `울펜 용병단 추정 위치, ${placement.name || placement.region || "경로"}, 정보 지속시간 ${wolfenMarkerDetails.remainingDays}일`);
    setMarkerPosition(marker, placement);
    const assetUrl = wolfenMarkerAssetUrl || getAssetUrl("Asset_Pin_2");
    const fallback = document.createElement("span");
    fallback.className = "map-wolfen-marker-fallback";
    fallback.setAttribute("aria-hidden", "true");
    const fallbackSymbol = document.createElement("span");
    fallbackSymbol.className = "map-wolfen-marker-fallback-symbol";
    fallbackSymbol.textContent = "!";
    fallback.append(fallbackSymbol);
    if (assetUrl) {
      const image = document.createElement("img");
      image.src = assetUrl;
      image.alt = "";
      image.draggable = false;
      image.addEventListener("error", () => image.replaceWith(fallback), { once: true });
      marker.append(image);
    } else {
      marker.append(fallback);
    }
    marker.addEventListener("pointerenter", event => showWolfenTooltip(placement, event.clientX, event.clientY));
    marker.addEventListener("pointermove", event => positionTooltip(event.clientX, event.clientY));
    marker.addEventListener("pointerleave", hideTooltip);
    marker.addEventListener("focus", () => {
      const rect = marker.getBoundingClientRect();
      showWolfenTooltip(placement, rect.right, rect.top + (rect.height / 2));
    });
    marker.addEventListener("blur", hideTooltip);
    return marker;
  }

  function updateWolfenRegionTabs(placement) {
    const regionMapId = placement ? mapIdForRegion(placement.region) || mapIdForY(placement.y) : "";
    elements.tabs.forEach(tab => {
      const marked = Boolean(regionMapId) && tab.dataset.mapId === regionMapId;
      tab.classList.toggle("has-wolfen-intel", marked);
      if (marked) tab.setAttribute("aria-label", `${mapName(regionMapId)} 지도, 울펜 용병단 추정 위치 있음`);
      else tab.removeAttribute("aria-label");
    });
  }

  function showWolfenTooltip(placement, clientX, clientY) {
    lastPointer = { x: clientX, y: clientY };
    elements.tooltip.classList.remove("has-prophecy");
    elements.tooltip.classList.add("is-wolfen");

    const fragment = document.createDocumentFragment();
    const header = document.createElement("header");
    const heading = document.createElement("strong");
    heading.textContent = "울펜 용병단 추정 위치";
    const region = document.createElement("span");
    region.textContent = placement.region || mapName(mapIdForY(placement.y));
    header.append(heading, region);

    const list = document.createElement("dl");
    appendTooltipRow(list, "추정 위치", placement.name || "이름 없는 경로");

    const description = document.createElement("p");
    description.textContent = "울펜 용병단이 마지막으로 목격된 것으로 전해지는 지점입니다.";
    fragment.append(header, list, description);
    elements.tooltip.replaceChildren(fragment);
    elements.tooltip.hidden = false;
    elements.tooltip.dataset.kind = "wolfen";
    showInformationTooltip(placement, { wolfenOnly: true });
    positionTooltip(clientX, clientY);
  }

  function createMarker(placement) {
    if (placement.kind === "label") return createLabelMarker(placement);
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `map-marker map-marker-${placement.kind} is-view-marker`;
    marker.setAttribute("aria-describedby", "map-tooltip map-information-tooltip");
    marker.classList.toggle("is-metropolis", placement.category === "대도시");
    marker.classList.toggle("is-search-focused", placement.id === focusedSettlementId);
    marker.dataset.mapViewPlacementId = placement.id;
    setMarkerPosition(marker, placement);

    const visual = document.createElement("span");
    visual.className = "map-marker-visual";
    appendAssetVisual(visual, placement);
    marker.append(visual);

    if (placement.kind === "node" && placement.name) {
      const name = document.createElement("span");
      name.className = "map-marker-name";
      name.textContent = placement.name;
      marker.append(name);
    }

    marker.setAttribute("aria-label", placement.kind === "node" ? `${placement.name || "이름 없는 거점"} 정보` : `${placement.name || "이름 없는 경로"} 정보`);
    if (destinationSelection) {
      const route = destinationSelection.routesByNodeId.get(placement.id);
      const weatherInfo = destinationSelection.weatherInfoByPlacementId.get(placement.id);
      const selectable = placement.kind === "node" && Boolean(route);
      marker.classList.toggle("is-destination-choice", selectable);
      marker.classList.toggle("is-destination-route-point", placement.kind === "dot" && destinationSelection.activePlacementIds.has(placement.id));
      marker.classList.toggle("is-destination-disabled", !selectable && !marker.classList.contains("is-destination-route-point"));
      marker.setAttribute("aria-disabled", String(!selectable));
      if (selectable) {
        marker.setAttribute("aria-label", `${placement.name || "이름 없는 거점"} 방면 선택`);
        marker.addEventListener("click", () => selectDestination(route));
      }
      if (weatherInfo) {
        const weatherDescription = weatherInfo.mode === "prophecy"
          ? `가호 예지, 경로 ${weatherInfo.zones?.length || 0}개 기후 구역, 도착 시점 목적지 기후 ${weatherInfo.destination?.label || weatherInfo.label}${weatherInfo.wolfenDetected ? ", 울펜 용병단 감지" : ""}`
          : `경로 예측 기상상태 ${weatherInfo.label}`;
        marker.setAttribute("aria-label", `${marker.getAttribute("aria-label")}, ${weatherDescription}`);
      }
      attachTooltipEvents(marker, placement);
    } else {
      attachTooltipEvents(marker, placement);
    }
    return marker;
  }

  function createLabelMarker(placement) {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "map-marker map-marker-label is-view-marker";
    marker.classList.toggle("is-country-label", placement.category === "국가");
    marker.dataset.mapViewPlacementId = placement.id;
    marker.setAttribute("aria-label", `${placement.name} 정보`);
    marker.setAttribute("aria-describedby", "map-tooltip map-information-tooltip");
    setMarkerPosition(marker, placement);
    const label = document.createElement("span");
    label.className = "map-name-tag";
    label.style.setProperty("--map-name-tag-size", `${placement.labelSize}px`);
    label.textContent = placement.displayName;
    marker.append(label);
    if (destinationSelection) {
      marker.classList.add("is-destination-disabled");
      marker.setAttribute("aria-disabled", "true");
    }
    attachTooltipEvents(marker, placement);
    return marker;
  }

  function attachTooltipEvents(marker, placement) {
    marker.addEventListener("pointerenter", event => showTooltip(placement, event.clientX, event.clientY));
    marker.addEventListener("pointermove", event => positionTooltip(event.clientX, event.clientY));
    marker.addEventListener("pointerleave", hideTooltip);
    marker.addEventListener("focus", () => {
      const rect = marker.getBoundingClientRect();
      showTooltip(placement, rect.right, rect.top + (rect.height / 2));
    });
    marker.addEventListener("blur", hideTooltip);
  }

  function appendAssetVisual(container, placement) {
    const url = getAssetUrl(placement.assetId);
    const fallback = document.createElement("span");
    fallback.className = `map-asset-fallback map-asset-${placement.assetId.toLowerCase().replaceAll("_", "-")}`;
    fallback.textContent = placement.kind === "dot" ? "·" : placement.category?.slice(0, 1) || "?";
    if (!url) {
      container.append(fallback);
      return;
    }
    const image = document.createElement("img");
    image.src = url;
    image.alt = "";
    image.draggable = false;
    image.addEventListener("error", () => image.replaceWith(fallback), { once: true });
    container.append(image);
  }

  function setMarkerPosition(marker, placement) {
    const local = globalToLocalPoint(placement);
    marker.style.left = `${local.x}%`;
    marker.style.top = `${local.y}%`;
  }

  function renderRoutes() {
    const fragments = mapData.connections
      .filter(connectionIntersectsCurrentCrop)
      .flatMap(connection => {
        const from = mapData.placementsById.get(connection.fromId);
        const to = mapData.placementsById.get(connection.toId);
        if (!from || !to) return [];
        const localFrom = globalToLocalPoint(from);
        const localTo = globalToLocalPoint(to);
        const outline = createSvgLine(connection, localFrom, localTo, "map-route-outline");
        const line = createSvgLine(connection, localFrom, localTo, "map-route-line");
        if (connection.routeType === "trade") {
          outline.classList.add("is-trade-route");
          line.classList.add("is-trade-route");
        }
        if (destinationSelection) {
          const available = destinationSelection.routeKeys.has(connectionPairKey(connection.fromId, connection.toId));
          outline.classList.add(available ? "is-destination-route" : "is-destination-route-disabled");
          line.classList.add(available ? "is-destination-route" : "is-destination-route-disabled");
        }
        return [outline, line];
      });
    elements.routes.replaceChildren(...fragments);
  }

  function createSvgLine(connection, from, to, className) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add(className);
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    return line;
  }

  function showTooltip(placement, clientX, clientY) {
    lastPointer = { x: clientX, y: clientY };
    elements.tooltip.classList.remove("is-wolfen");
    const weatherInfo = destinationSelection?.weatherInfoByPlacementId.get(placement.id);
    elements.tooltip.classList.toggle("has-prophecy", weatherInfo?.mode === "prophecy");
    elements.tooltip.replaceChildren(buildTooltipContents(placement));
    elements.tooltip.hidden = false;
    elements.tooltip.dataset.kind = placement.kind;
    showInformationTooltip(placement);
    positionTooltip(clientX, clientY);
  }

  function showInformationTooltip(placement, options = {}) {
    const cityEvents = options.wolfenOnly ? [] : cityEventsForPlacement(placement);
    const cards = informationCardsForPlacement(placement, options);
    if (!cityEvents.length && !cards.length) {
      elements.informationTooltip.classList.remove("has-city-events");
      elements.informationTooltip.hidden = true;
      elements.informationTooltip.replaceChildren();
      return;
    }

    elements.informationTooltip.classList.toggle("has-city-events", cityEvents.length > 0);

    const fragment = document.createDocumentFragment();
    const header = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = cityEvents.length ? "확인한 거점 소식" : "보유 정보";
    const count = document.createElement("span");
    count.textContent = [cityEvents.length ? `사건 ${cityEvents.length}` : "", cards.length ? `정보 ${cards.length}` : ""]
      .filter(Boolean).join(" · ");
    header.append(title, count);
    fragment.append(header);

    const list = document.createElement("div");
    list.className = "map-information-list";
    cityEvents.forEach(event => list.append(buildCityEventCard(event)));
    cards.forEach(card => list.append(buildInformationCard(card)));
    fragment.append(list);
    elements.informationTooltip.replaceChildren(fragment);
    elements.informationTooltip.hidden = false;
  }

  function cityEventsForPlacement(placement) {
    if (!placement || placement.kind !== "node") return [];
    return [...getCityEvents(placement)]
      .sort((left, right) => Number(left.remainingDays) - Number(right.remainingDays)
        || String(left.name).localeCompare(String(right.name), "ko"));
  }

  function buildCityEventCard(event) {
    const section = document.createElement("section");
    section.className = "map-information-card map-city-event-card";
    const title = document.createElement("strong");
    title.className = "map-information-card-title";
    title.textContent = event.name || "이름 없는 도시 사건";
    const meta = document.createElement("dl");
    appendTooltipRow(meta, "분류", event.category || "도시 사건");
    appendTooltipRow(meta, "잔여일수", `${Math.max(0, Math.trunc(Number(event.remainingDays) || 0))}일`);
    const contentLabel = document.createElement("small");
    contentLabel.textContent = "도시 사건";
    const content = document.createElement("p");
    content.textContent = event.description || "이 거점에 영향을 주는 사건이 이어지고 있습니다.";
    section.append(title, meta, contentLabel, content);
    return section;
  }

  function informationCardsForPlacement(placement, { wolfenOnly = false } = {}) {
    if (!placement || placement.kind === "label") return [];
    const placementSegment = String(placement.routeSegment || placement.name || placement.id || "").trim();
    return [...getInformationCards()]
      .filter(card => {
        const target = card?.target || {};
        if (wolfenOnly) return card.special === "WOLFEN_TRACK";
        if (card.special === "WOLFEN_TRACK") return false;
        if (target.settlementId) return placement.kind === "node" && target.settlementId === placement.id;
        if (target.targetKind === "settlement") return placement.kind === "node" && target.targetId === placement.id;
        if (target.targetKind === "route") return placement.kind === "dot" && target.targetId === placementSegment;
        if (target.targetKind === "region") return target.targetId === placement.region;
        if (target.segmentId) return placement.kind === "dot" && target.segmentId === placementSegment;
        if (target.region) return target.region === placement.region;
        return false;
      })
      .sort((left, right) => Number(left.remainingDays) - Number(right.remainingDays)
        || Number(right.grade) - Number(left.grade)
        || String(left.title).localeCompare(String(right.title), "ko"));
  }

  function buildInformationCard(card) {
    const section = document.createElement("section");
    section.className = "map-information-card";
    const title = document.createElement("strong");
    title.className = "map-information-card-title";
    title.textContent = card.title || "이름 없는 정보";

    const meta = document.createElement("dl");
    appendTooltipRow(meta, "등급", informationLevelValue(card.gradeLabel, "등급"));
    appendTooltipRow(meta, "신뢰도", informationLevelValue(card.trustLabel, "신뢰도"));
    appendTooltipRow(meta, "잔여일수", `${Math.max(0, Math.trunc(Number(card.remainingDays) || 0))}일`);

    const contentLabel = document.createElement("small");
    contentLabel.textContent = "정보 내용";
    const content = document.createElement("p");
    content.textContent = card.content || "확인할 수 있는 내용이 없습니다.";
    section.append(title, meta, contentLabel, content);
    return section;
  }

  function informationLevelValue(value, prefix) {
    const text = String(value || "—").trim();
    return text.startsWith(prefix) ? text.slice(prefix.length).trim() || "—" : text;
  }

  function showPlacementTooltip(placementId, clientX, clientY) {
    const placement = mapData.placementsById.get(placementId);
    if (!placement) return;
    showTooltip(placement, clientX, clientY);
  }

  function buildTooltipContents(placement) {
    const fragment = document.createDocumentFragment();
    const header = document.createElement("header");
    const heading = document.createElement("strong");
    heading.textContent = placement.name || "이름 없음";
    const kind = document.createElement("span");
    kind.textContent = placement.kind === "node"
      ? [placement.region, placement.category || "거점"].filter(Boolean).join(" / ")
      : placement.kind === "dot"
        ? "경로"
        : "";
    header.append(heading);
    if (kind.textContent) header.append(kind);

    const description = document.createElement("p");
    description.textContent = placement.description || "등록된 설명이 없습니다.";
    if (placement.kind === "label") {
      fragment.append(header, description);
      return fragment;
    }

    const list = document.createElement("dl");
    if (placement.kind === "node") {
      appendTooltipRow(list, "소속", placement.affiliation, affiliationClassName(placement.affiliation));
    }
    appendTooltipRow(list, "지형 분류", placement.terrains.join(", "));
    appendTooltipRow(list, "환경 분류", placement.environments.join(", "));

    fragment.append(header, list);
    const weatherInfo = destinationSelection?.weatherInfoByPlacementId.get(placement.id);
    if (weatherInfo) {
      fragment.append(buildWeatherPreview(weatherInfo));
      if (Number(weatherInfo.borderTaxRate) > 0) fragment.append(buildBorderTaxPreview(weatherInfo));
    }
    fragment.append(description);
    return fragment;
  }

  function buildBorderTaxPreview(weatherInfo) {
    const notice = document.createElement("section");
    notice.className = "map-tooltip-border-tax";
    const label = document.createElement("span");
    label.textContent = "국경 통과";
    const value = document.createElement("strong");
    value.textContent = `추가 입장관세 +${Math.max(0, Number(weatherInfo.borderTaxRate) || 0)}%`;
    const route = document.createElement("small");
    route.textContent = [weatherInfo.originAffiliation, weatherInfo.destinationAffiliation].filter(Boolean).join(" → ");
    notice.append(label, value);
    if (route.textContent) notice.append(route);
    return notice;
  }

  function buildWeatherPreview(weatherInfo) {
    const section = document.createElement("section");
    if (weatherInfo.mode === "prophecy") return buildProphecyWeatherPreview(section, weatherInfo);
    const kind = weatherVisualKind(weatherInfo.label);
    section.className = `map-tooltip-weather is-${kind}`;
    section.classList.add("is-forecast");

    const heading = document.createElement("div");
    const eyebrow = document.createElement("small");
    const weather = document.createElement("strong");
    eyebrow.textContent = "경로 예측 기상상태";
    weather.textContent = weatherInfo.label;
    heading.append(eyebrow, weather);

    const source = document.createElement("span");
    source.textContent = weatherInfo.sourceName || "연결 경로";
    section.append(heading, source);
    return section;
  }

  function buildProphecyWeatherPreview(section, weatherInfo) {
    section.className = "map-tooltip-weather is-prophecy";

    const heading = document.createElement("div");
    heading.className = "prophecy-weather-heading";
    const badge = document.createElement("small");
    badge.className = "prophecy-weather-badge";
    badge.textContent = "[ 가호 : 예지 ]";
    const title = document.createElement("strong");
    title.textContent = "도착 시점 기상 예견";
    const routeName = document.createElement("span");
    routeName.textContent = weatherInfo.sourceName || "연결 경로";
    heading.append(badge, title, routeName);

    const list = document.createElement("div");
    list.className = "prophecy-weather-list";
    (weatherInfo.zones || []).forEach(zone => {
      list.append(createProphecyWeatherRow({
        kind: "route",
        name: zone.name,
        detail: zone.routeName,
        label: zone.label
      }));
    });
    if (!list.childElementCount) {
      list.append(createProphecyWeatherRow({
        kind: "route",
        name: "경로 구역",
        detail: weatherInfo.sourceName || "연결 경로",
        label: weatherInfo.label
      }));
    }

    const destination = weatherInfo.destination || { name: "최종 목적지", label: weatherInfo.label };
    const destinationRow = createProphecyWeatherRow({
      kind: "destination",
      name: "최종 목적지",
      detail: [destination.name, destination.arrivalText].filter(Boolean).join(" · "),
      label: destination.label
    });
    section.append(heading, list, destinationRow);
    if (weatherInfo.wolfenDetected) {
      const warning = document.createElement("div");
      warning.className = "prophecy-wolfen-notice";
      const symbol = document.createElement("strong");
      symbol.textContent = "[ 가호 : 예지 ]";
      const copy = document.createElement("span");
      copy.textContent = `${weatherInfo.wolfenRouteName || "선택한 경로"}에서 울펜 용병단의 기척이 느껴집니다.`;
      warning.append(symbol, copy);
      section.append(warning);
    }
    return section;
  }

  function createProphecyWeatherRow({ kind, name, detail, label }) {
    const row = document.createElement("div");
    row.className = `prophecy-weather-row is-${kind} is-${weatherVisualKind(label)}`;
    const marker = document.createElement("i");
    marker.setAttribute("aria-hidden", "true");
    const copy = document.createElement("span");
    const title = document.createElement("b");
    title.textContent = name;
    const subtitle = document.createElement("small");
    subtitle.textContent = detail || "—";
    copy.append(title, subtitle);
    const weather = document.createElement("strong");
    weather.textContent = label || "맑음";
    row.append(marker, copy, weather);
    return row;
  }

  function weatherVisualKind(weather) {
    if (weather === "비" || weather === "폭우") return "rain";
    if (weather === "눈" || weather === "폭설") return "snow";
    if (weather === "흐림") return "cloudy";
    return "clear";
  }

  function appendTooltipRow(list, label, value, valueClass = "") {
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value || "—";
    if (valueClass) description.classList.add(valueClass);
    list.append(term, description);
  }

  function affiliationClassName(affiliation) {
    return ({
      "브라벤": "is-affiliation-braven",
      "라베르": "is-affiliation-rabere",
      "마레시아": "is-affiliation-maresia"
    })[affiliation] || "";
  }

  function positionTooltip(clientX, clientY) {
    if (!initialized || elements.tooltip.hidden) return;
    lastPointer = { x: clientX, y: clientY };
    const gap = 16;
    const margin = 12;
    const rect = elements.tooltip.getBoundingClientRect();
    let left = clientX + gap;
    let top = clientY + gap;
    let horizontal = "right";
    let vertical = "below";
    if (left + rect.width > window.innerWidth - margin) {
      left = clientX - gap - rect.width;
      horizontal = "left";
    }
    if (top + rect.height > window.innerHeight - margin) {
      top = clientY - gap - rect.height;
      vertical = "above";
    }
    left = clamp(left, margin, Math.max(margin, window.innerWidth - rect.width - margin));
    top = clamp(top, margin, Math.max(margin, window.innerHeight - rect.height - margin));
    elements.tooltip.style.left = `${Math.round(left)}px`;
    elements.tooltip.style.top = `${Math.round(top)}px`;
    elements.tooltip.dataset.horizontal = horizontal;
    elements.tooltip.dataset.vertical = vertical;
    positionInformationTooltip();
  }

  function positionInformationTooltip() {
    if (!elements.informationTooltip || elements.informationTooltip.hidden || elements.tooltip.hidden) return;
    const gap = 10;
    const margin = 12;
    const anchor = elements.tooltip.getBoundingClientRect();
    const rect = elements.informationTooltip.getBoundingClientRect();
    let left = anchor.right + gap;
    let top = anchor.top;

    if (left + rect.width > window.innerWidth - margin) left = anchor.left - gap - rect.width;
    if (left < margin) {
      left = clamp(anchor.left, margin, Math.max(margin, window.innerWidth - rect.width - margin));
      top = anchor.bottom + gap;
      if (top + rect.height > window.innerHeight - margin) top = anchor.top - gap - rect.height;
    }

    left = clamp(left, margin, Math.max(margin, window.innerWidth - rect.width - margin));
    top = clamp(top, margin, Math.max(margin, window.innerHeight - rect.height - margin));
    elements.informationTooltip.style.left = `${Math.round(left)}px`;
    elements.informationTooltip.style.top = `${Math.round(top)}px`;
  }

  function hideTooltip() {
    if (!initialized) return;
    elements.tooltip.hidden = true;
    elements.tooltip.replaceChildren();
    elements.informationTooltip.hidden = true;
    elements.informationTooltip.replaceChildren();
    lastPointer = null;
  }

  function refreshAssets() {
    if (!initialized) return;
    renderMapImage();
    renderMapContents();
  }

  function setPlayerPosition(placementId, nextPlacementId = "", segmentProgress = 0) {
    playerPositionId = String(placementId ?? "").trim();
    playerNextPositionId = String(nextPlacementId ?? "").trim();
    playerSegmentProgress = clamp(Number(segmentProgress) || 0, 0, 1);
    if (loaded) focusPlayerPosition();
  }

  function updatePlayerProgress(placementId, nextPlacementId = "", segmentProgress = 0) {
    playerPositionId = String(placementId ?? "").trim();
    playerNextPositionId = String(nextPlacementId ?? "").trim();
    playerSegmentProgress = clamp(Number(segmentProgress) || 0, 0, 1);
    if (!loaded) return;
    const point = interpolatedPlayerPoint();
    const currentPin = elements.placements.querySelector(".map-player-pin");
    if (!point || !placementIntersectsCurrentCrop(point)) {
      currentPin?.remove();
      return;
    }
    if (currentPin) setMarkerPosition(currentPin, point);
    else elements.placements.append(createPlayerPin(point));
  }

  function interpolatedPlayerPoint() {
    const from = mapData.placementsById.get(playerPositionId);
    if (!from) return null;
    const to = mapData.placementsById.get(playerNextPositionId);
    if (!to || playerSegmentProgress <= 0) return { x: from.x, y: from.y };
    return {
      x: from.x + ((to.x - from.x) * playerSegmentProgress),
      y: from.y + ((to.y - from.y) * playerSegmentProgress)
    };
  }

  function focusPlayerPosition() {
    const point = interpolatedPlayerPoint();
    if (!point) {
      renderMapContents();
      return;
    }
    const targetMapId = mapIdForY(point.y);
    if (targetMapId !== currentMapId) {
      setCurrentMap(targetMapId);
      return;
    }
    renderMapContents();
  }

  function mapIdForY(y) {
    if (y < MAP_CROPS.Asset_Map_2.startY) return "Asset_Map_1";
    if (y < MAP_CROPS.Asset_Map_3.startY) return "Asset_Map_2";
    return "Asset_Map_3";
  }

  function mapIdForRegion(region) {
    return ({ 북부: "Asset_Map_1", 중부: "Asset_Map_2", 남부: "Asset_Map_3" })[String(region || "").trim()] || "";
  }

  function getPlacement(placementId) {
    return mapData.placementsById.get(placementId) ?? null;
  }

  function getConnectionType(leftId, rightId) {
    if (!leftId || !rightId) return "normal";
    const key = connectionPairKey(leftId, rightId);
    const connection = mapData.connections.find(candidate => connectionPairKey(candidate.fromId, candidate.toId) === key);
    return connection?.routeType === "trade" ? "trade" : "normal";
  }

  function getWeatherGraphData() {
    return {
      loaded,
      nodes: mapData.nodes.map(node => ({
        id: node.id,
        name: node.name,
        kind: node.kind,
        region: node.region,
        environments: [...node.environments]
      })),
      dots: mapData.dots.map(dot => ({
        id: dot.id,
        kind: dot.kind,
        name: dot.name,
        region: dot.region,
        routeSegment: dot.routeSegment,
        baseStability: dot.baseStability,
        baseSecurity: dot.baseSecurity,
        terrains: [...dot.terrains],
        environments: [...dot.environments],
        x: dot.x,
        y: dot.y
      })),
      connections: mapData.connections.map(connection => ({
        fromId: connection.fromId,
        toId: connection.toId
      }))
    };
  }

  function getConnectedNodeRoutes(originNodeId) {
    const origin = mapData.placementsById.get(originNodeId);
    if (!loaded || origin?.kind !== "node") return [];

    const adjacency = new Map();
    mapData.connections.forEach(connection => {
      appendNeighbor(adjacency, connection.fromId, connection.toId);
      appendNeighbor(adjacency, connection.toId, connection.fromId);
    });

    const routes = new Map();
    const queue = [{ id: originNodeId, path: [originNodeId] }];
    const visited = new Set([originNodeId]);
    while (queue.length) {
      const current = queue.shift();
      for (const neighborId of adjacency.get(current.id) ?? []) {
        if (visited.has(neighborId)) continue;
        visited.add(neighborId);
        const path = [...current.path, neighborId];
        const placement = mapData.placementsById.get(neighborId);
        if (!placement) continue;
        if (placement.kind === "node") {
          routes.set(neighborId, { node: placement, path });
          continue;
        }
        queue.push({ id: neighborId, path });
      }
    }

    return [...routes.values()].sort((left, right) => {
      const distanceDifference = left.path.length - right.path.length;
      return distanceDifference || left.node.name.localeCompare(right.node.name, "ko");
    });
  }

  function getShortestPlacementDistance(fromId, toId) {
    if (!loaded || !mapData.placementsById.has(fromId) || !mapData.placementsById.has(toId)) return Number.POSITIVE_INFINITY;
    if (fromId === toId) return 0;
    const cacheKey = [fromId, toId].sort((left, right) => left.localeCompare(right)).join("|");
    if (distanceCache.has(cacheKey)) return distanceCache.get(cacheKey);
    const adjacency = new Map();
    mapData.connections.forEach(connection => {
      appendNeighbor(adjacency, connection.fromId, connection.toId);
      appendNeighbor(adjacency, connection.toId, connection.fromId);
    });
    const queue = [{ id: fromId, distance: 0 }];
    const visited = new Set([fromId]);
    while (queue.length) {
      const current = queue.shift();
      for (const neighborId of adjacency.get(current.id) ?? []) {
        if (visited.has(neighborId)) continue;
        const distance = current.distance + 1;
        if (neighborId === toId) {
          distanceCache.set(cacheKey, distance);
          return distance;
        }
        visited.add(neighborId);
        queue.push({ id: neighborId, distance });
      }
    }
    distanceCache.set(cacheKey, Number.POSITIVE_INFINITY);
    return Number.POSITIVE_INFINITY;
  }

  function getTradeWorldData() {
    return {
      loaded,
      nodes: mapData.nodes.map(node => ({
        ...node,
        terrains: [...node.terrains],
        environments: [...node.environments],
        companyNames: [...(node.companyNames || [])],
        productionNames: [...(node.productionNames || [])],
        logisticsNames: [...(node.logisticsNames || [])],
        specialtyNames: [...(node.specialtyNames || [])],
        famousProductNames: [...(node.famousProductNames || [])],
        demandScores: { ...(node.demandScores || {}) }
      })),
      routes: mapData.dots.map(dot => ({
        ...dot,
        connectionRefs: [...dot.connectionRefs],
        terrains: [...dot.terrains],
        environments: [...dot.environments]
      }))
    };
  }

  function setWolfenMarker(placementId = "", assetUrl = "", details = {}) {
    wolfenMarkerPlacementId = String(placementId || "").trim();
    wolfenMarkerAssetUrl = String(assetUrl || "").trim();
    wolfenMarkerDetails = {
      remainingDays: Math.max(0, Math.trunc(Number(details?.remainingDays) || 0)),
      expiresDay: Math.max(0, Math.trunc(Number(details?.expiresDay) || 0))
    };
    if (loaded) renderMapContents();
    else updateWolfenRegionTabs(null);
  }

  function beginDestinationSelection(routes, options = {}) {
    if (!initialized) return;
    setSettlementSearchOpen(false);
    const validRoutes = (Array.isArray(routes) ? routes : [])
      .filter(route => route?.node?.kind === "node" && Array.isArray(route.path) && route.path.length >= 2);
    const routesByNodeId = new Map(validRoutes.map(route => [route.node.id, route]));
    const activePlacementIds = new Set(validRoutes.flatMap(route => route.path));
    const routeKeys = new Set();
    validRoutes.forEach(route => {
      for (let index = 0; index < route.path.length - 1; index += 1) {
        routeKeys.add(connectionPairKey(route.path[index], route.path[index + 1]));
      }
    });

    destinationSelection = {
      routesByNodeId,
      activePlacementIds,
      routeKeys,
      weatherInfoByPlacementId: options.weatherInfoByPlacementId instanceof Map
        ? new Map(options.weatherInfoByPlacementId)
        : new Map(),
      onSelect: typeof options.onSelect === "function" ? options.onSelect : null,
      onCancel: typeof options.onCancel === "function" ? options.onCancel : null
    };
    hideTooltip();
    elements.root.classList.add("is-destination-selection");
    elements.destinationPicker.hidden = false;
    const originName = String(options.originName ?? "현재 거점").trim() || "현재 거점";
    elements.destinationMessage.textContent = `${originName}에서 이어진 ${validRoutes.length}개 거점 중 하나를 선택하세요.`;
    focusPlayerPosition();
  }

  function endDestinationSelection() {
    if (!initialized) return;
    destinationSelection = null;
    hideTooltip();
    elements.root.classList.remove("is-destination-selection");
    elements.destinationPicker.hidden = true;
    renderMapContents();
  }

  function cancelDestinationSelection() {
    const onCancel = destinationSelection?.onCancel;
    endDestinationSelection();
    onCancel?.();
  }

  function selectDestination(route) {
    const onSelect = destinationSelection?.onSelect;
    endDestinationSelection();
    onSelect?.(route);
  }

  function connectionPairKey(leftId, rightId) {
    return [leftId, rightId].sort((left, right) => left.localeCompare(right)).join("|");
  }

  function appendNeighbor(adjacency, fromId, toId) {
    if (!adjacency.has(fromId)) adjacency.set(fromId, []);
    adjacency.get(fromId).push(toId);
  }

  function setDataStatus(message, hidden, failed = false) {
    elements.dataStatus.textContent = message;
    elements.dataStatus.hidden = hidden;
    elements.dataStatus.classList.toggle("is-error", failed);
  }

  function placementIntersectsCurrentCrop(placement) {
    const crop = currentCrop();
    return placement.x >= 0
      && placement.x <= SOURCE_MAP_WIDTH
      && placement.y >= crop.startY
      && placement.y <= crop.startY + crop.height;
  }

  function connectionIntersectsCurrentCrop(connection) {
    const from = mapData.placementsById.get(connection.fromId);
    const to = mapData.placementsById.get(connection.toId);
    if (!from || !to) return false;
    const crop = currentCrop();
    const cropEnd = crop.startY + crop.height;
    return Math.max(from.y, to.y) >= crop.startY && Math.min(from.y, to.y) <= cropEnd;
  }

  function globalToLocalPoint(point) {
    const crop = currentCrop();
    return {
      x: (point.x / SOURCE_MAP_WIDTH) * 100,
      y: ((point.y - crop.startY) / crop.height) * 100
    };
  }

  function currentCrop() {
    return MAP_CROPS[currentMapId];
  }

  function cell(row, key) {
    return String(row?.[key] ?? "").trim();
  }

  function parsePercent(value) {
    const raw = String(value ?? "").replaceAll(",", "").trim();
    const number = Number(raw.replace("%", ""));
    if (!Number.isFinite(number)) return 0;
    if (!raw.includes("%") && number > 0 && number < 1) return number * 100;
    return Math.max(0, number);
  }

  function splitValues(value) {
    return String(value ?? "")
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }

  function mapName(mapId) {
    return ({ Asset_Map_1: "북부", Asset_Map_2: "중부", Asset_Map_3: "남부" })[mapId] ?? "지역";
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  window.ProjectWMapView = {
    init,
    load,
    refreshAssets,
    hideTooltip,
    setPlayerPosition,
    updatePlayerProgress,
    getPlacement,
    getConnectionType,
    getWeatherGraphData,
    getConnectedNodeRoutes,
    getShortestPlacementDistance,
    getTradeWorldData,
    setWolfenMarker,
    beginDestinationSelection,
    endDestinationSelection,
    showPlacementTooltip,
    positionTooltip
  };
}());
