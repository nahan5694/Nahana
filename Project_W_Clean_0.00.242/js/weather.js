(function exposeWeatherSystem() {
  const UPDATE_INTERVAL_TIMES = 3;
  const WEATHER_LABELS = new Set(["맑음", "흐림", "비", "폭우", "눈", "폭설"]);
  const ENVIRONMENT_WET_BIAS = new Map([
    ["온난", 0],
    ["다습", 8],
    ["추위", 2],
    ["혹한", 4]
  ]);
  const REGION_WET_BIAS = new Map([
    ["북부", 2],
    ["중부", 0],
    ["남부", 4]
  ]);
  const SEASON_WET_BIAS = new Map([
    ["봄", 0],
    ["여름", 4],
    ["가을", 0],
    ["겨울", 4]
  ]);
  const CENTRAL_WINTER_SNOW_BIAS = new Map([
    ["온난", -10],
    ["다습", 0],
    ["추위", 35],
    ["혹한", 65]
  ]);

  function createState() {
    return {
      version: 1,
      seed: createSeed(),
      elapsedTimes: 0,
      updateCount: 0,
      nodeWeather: {},
      dotOwners: {},
      manualOverrideNodeIds: []
    };
  }

  function normalizeState(value) {
    const source = value && typeof value === "object" ? value : {};
    const nodeWeather = {};
    Object.entries(source.nodeWeather && typeof source.nodeWeather === "object" ? source.nodeWeather : {}).forEach(([nodeId, weather]) => {
      if (!/^MAP_NODE_\d+$/.test(nodeId)) return;
      nodeWeather[nodeId] = normalizeWeatherState(weather);
    });
    const dotOwners = {};
    Object.entries(source.dotOwners && typeof source.dotOwners === "object" ? source.dotOwners : {}).forEach(([dotId, nodeId]) => {
      if (/^MAP_DOT_\d+$/.test(dotId) && /^MAP_NODE_\d+$/.test(String(nodeId))) dotOwners[dotId] = String(nodeId);
    });
    const manualOverrideNodeIds = Array.isArray(source.manualOverrideNodeIds)
      ? [...new Set(source.manualOverrideNodeIds.map(String).filter(nodeId => /^MAP_NODE_\d+$/.test(nodeId)))]
      : [];
    return {
      version: 1,
      seed: String(source.seed || createSeed()),
      elapsedTimes: clamp(Math.trunc(Number(source.elapsedTimes) || 0), 0, UPDATE_INTERVAL_TIMES - 1),
      updateCount: Math.max(0, Math.trunc(Number(source.updateCount) || 0)),
      nodeWeather,
      dotOwners,
      manualOverrideNodeIds
    };
  }

  function ensureState(value, graph, options = {}) {
    const state = normalizeState(value);
    if (!graph?.loaded || !Array.isArray(graph.nodes) || !graph.nodes.length) return state;
    const season = normalizeSeason(options.season);
    const nodesById = new Map(graph.nodes.map(node => [node.id, node]));
    const validNodeIds = new Set(nodesById.keys());
    const existingCount = Object.keys(state.nodeWeather).filter(nodeId => validNodeIds.has(nodeId)).length;
    const isFresh = existingCount === 0;

    Object.keys(state.nodeWeather).forEach(nodeId => {
      if (!validNodeIds.has(nodeId)) delete state.nodeWeather[nodeId];
    });
    state.manualOverrideNodeIds = state.manualOverrideNodeIds.filter(nodeId => validNodeIds.has(nodeId));
    graph.nodes.forEach(node => {
      if (state.nodeWeather[node.id]) return;
      const distribution = stationaryDistribution(wetBiasFor(node, season));
      const severity = weightedIndex(distribution, seededUnit(`${state.seed}|initial|${node.id}`));
      const type = severity >= 2
        ? choosePrecipitationType(node, season, seededUnit(`${state.seed}|initial-type|${node.id}`))
        : "";
      state.nodeWeather[node.id] = { severity, type };
    });

    const adjacency = buildAdjacency(graph);
    if (isFresh) smoothInitialWeather(state, graph.nodes, adjacency, season);
    const manualOverrides = new Set(state.manualOverrideNodeIds);
    graph.nodes.forEach(node => {
      const weather = normalizeWeatherState(state.nodeWeather[node.id]);
      if (manualOverrides.has(node.id)) {
        state.nodeWeather[node.id] = weather;
        return;
      }
      state.nodeWeather[node.id] = {
        severity: weather.severity,
        type: enforcePrecipitationType(
          weather.type,
          weather.severity,
          node,
          season,
          seededUnit(`${state.seed}|season-type|${season}|${node.id}`)
        )
      };
    });
    const validDotIds = new Set((graph.dots || []).map(dot => dot.id));
    const ownersValid = validDotIds.size === Object.keys(state.dotOwners).filter(dotId => {
      return validDotIds.has(dotId) && validNodeIds.has(state.dotOwners[dotId]);
    }).length;
    if (!ownersValid) state.dotOwners = assignDotOwners(state.seed, graph, adjacency);
    if (isFresh) applyInitialClearWeather(state, graph, options.initialClearNames);
    return state;
  }

  function applyInitialClearWeather(state, graph, values) {
    const targetNames = new Set((Array.isArray(values) ? values : [])
      .map(normalizePlacementName)
      .filter(Boolean));
    if (!targetNames.size) return;

    const clearNodeIds = new Set();
    graph.nodes.forEach(node => {
      if (targetNames.has(normalizePlacementName(node.name))) clearNodeIds.add(node.id);
    });
    (graph.dots || []).forEach(dot => {
      if (!targetNames.has(normalizePlacementName(dot.name))) return;
      const ownerNodeId = state.dotOwners[dot.id];
      if (ownerNodeId) clearNodeIds.add(ownerNodeId);
    });
    clearNodeIds.forEach(nodeId => {
      if (state.nodeWeather[nodeId]) state.nodeWeather[nodeId] = { severity: 0, type: "" };
    });
  }

  function normalizePlacementName(value) {
    return String(value || "").normalize("NFKC").replace(/\s+/g, "").trim();
  }

  function advanceTime(value, graph, options = {}) {
    const state = ensureState(value, graph, options);
    const times = Math.max(0, Math.trunc(Number(options.times) || 1));
    state.elapsedTimes += times;
    while (state.elapsedTimes >= UPDATE_INTERVAL_TIMES) {
      state.elapsedTimes -= UPDATE_INTERVAL_TIMES;
      updateNodeWeather(state, graph, normalizeSeason(options.season));
    }
    return state;
  }

  function getWeatherAt(value, placementId) {
    const state = normalizeState(value);
    const id = String(placementId || "");
    const ownerId = /^MAP_NODE_\d+$/.test(id) ? id : state.dotOwners[id];
    const weather = normalizeWeatherState(state.nodeWeather[ownerId]);
    return {
      ...weather,
      ownerNodeId: ownerId || "",
      label: weatherLabel(weather)
    };
  }

  function setWeatherAt(value, graph, placementId, label, options = {}) {
    if (!WEATHER_LABELS.has(String(label))) return ensureState(value, graph, options);
    const state = ensureState(value, graph, options);
    const id = String(placementId || "");
    const ownerId = /^MAP_NODE_\d+$/.test(id) ? id : state.dotOwners[id];
    if (!ownerId || !state.nodeWeather[ownerId]) return state;
    const node = graph.nodes.find(candidate => candidate.id === ownerId);
    const weather = weatherStateFromLabel(String(label));
    const precipitationType = options.forcePrecipitationType
      ? weather.type
      : enforcePrecipitationType(
        weather.type,
        weather.severity,
        node,
        normalizeSeason(options.season),
        seededUnit(`${state.seed}|manual-type|${state.updateCount}|${ownerId}`)
      );
    state.nodeWeather[ownerId] = {
      severity: weather.severity,
      type: precipitationType
    };
    const manualOverrides = new Set(state.manualOverrideNodeIds);
    if (options.forcePrecipitationType) manualOverrides.add(ownerId);
    else manualOverrides.delete(ownerId);
    state.manualOverrideNodeIds = [...manualOverrides];
    return state;
  }

  function updateNodeWeather(state, graph, season) {
    if (!graph?.loaded || !graph.nodes?.length) return;
    const adjacency = buildAdjacency(graph);
    const nodeNeighbors = buildNodeNeighbors(graph.nodes, adjacency);
    const nodesById = new Map(graph.nodes.map(node => [node.id, node]));
    const previous = Object.fromEntries(Object.entries(state.nodeWeather).map(([id, weather]) => [id, normalizeWeatherState(weather)]));
    const next = {};
    const updateIndex = state.updateCount + 1;

    graph.nodes.forEach(node => {
      const current = normalizeWeatherState(previous[node.id]);
      const neighbors = (nodeNeighbors.get(node.id) || []).map(nodeId => previous[nodeId]).filter(Boolean);
      const neighborAverage = neighbors.length
        ? neighbors.reduce((sum, weather) => sum + weather.severity, 0) / neighbors.length
        : current.severity;
      const neighborBias = clamp(Math.round((neighborAverage - current.severity) * 3), -6, 6);
      const totalBias = clamp(wetBiasFor(node, season) + neighborBias, -6, 20);
      const random = seededUnit(`${state.seed}|update|${updateIndex}|${node.id}`);
      const severity = rollNextSeverity(current.severity, totalBias, random);
      let type = severity >= 2 ? current.type : "";
      if (severity >= 2 && !type) {
        type = choosePrecipitationType(node, season, seededUnit(`${state.seed}|update-type|${updateIndex}|${node.id}`));
      }
      type = enforcePrecipitationType(type, severity, node, season, seededUnit(`${state.seed}|enforce-type|${updateIndex}|${node.id}`));
      next[node.id] = { severity, type };
    });

    state.nodeWeather = next;
    state.manualOverrideNodeIds = [];
    state.updateCount = updateIndex;
    Object.keys(state.dotOwners).forEach(dotId => {
      if (!nodesById.has(state.dotOwners[dotId])) delete state.dotOwners[dotId];
    });
  }

  function smoothInitialWeather(state, nodes, adjacency, season) {
    const nodeNeighbors = buildNodeNeighbors(nodes, adjacency);
    const nodesById = new Map(nodes.map(node => [node.id, node]));
    for (let pass = 0; pass < 2; pass += 1) {
      const previous = Object.fromEntries(Object.entries(state.nodeWeather).map(([id, weather]) => [id, normalizeWeatherState(weather)]));
      const next = { ...previous };
      nodes.forEach(node => {
        const neighbors = (nodeNeighbors.get(node.id) || []).map(nodeId => previous[nodeId]).filter(Boolean);
        if (!neighbors.length) return;
        const severities = neighbors.map(weather => weather.severity).sort((left, right) => left - right);
        const target = severities[Math.floor(severities.length / 2)];
        const current = previous[node.id];
        if (target === current.severity || seededUnit(`${state.seed}|smooth|${pass}|${node.id}`) >= 0.35) return;
        const severity = current.severity + Math.sign(target - current.severity);
        let type = severity >= 2 ? current.type : "";
        if (severity >= 2 && !type) {
          type = choosePrecipitationType(nodesById.get(node.id), season, seededUnit(`${state.seed}|smooth-type|${pass}|${node.id}`));
        }
        next[node.id] = { severity, type: enforcePrecipitationType(type, severity, node, season, 0.5) };
      });
      state.nodeWeather = next;
    }
  }

  function assignDotOwners(seed, graph, adjacency) {
    const nodesById = new Map(graph.nodes.map(node => [node.id, node]));
    const owners = {};
    (graph.dots || []).forEach(dot => {
      const queue = [{ id: dot.id, distance: 0 }];
      const visited = new Set([dot.id]);
      let nearestDistance = Number.POSITIVE_INFINITY;
      const candidates = [];
      while (queue.length) {
        const current = queue.shift();
        if (current.distance > nearestDistance) break;
        if (nodesById.has(current.id)) {
          nearestDistance = current.distance;
          candidates.push(current.id);
          continue;
        }
        for (const neighborId of adjacency.get(current.id) || []) {
          if (visited.has(neighborId)) continue;
          visited.add(neighborId);
          queue.push({ id: neighborId, distance: current.distance + 1 });
        }
      }
      if (!candidates.length) return;
      candidates.sort((left, right) => {
        const leftHash = hashString(`${seed}|owner|${dot.id}|${left}`);
        const rightHash = hashString(`${seed}|owner|${dot.id}|${right}`);
        return leftHash - rightHash || left.localeCompare(right);
      });
      owners[dot.id] = candidates[0];
    });
    return owners;
  }

  function buildAdjacency(graph) {
    const adjacency = new Map();
    (graph.connections || []).forEach(connection => {
      appendNeighbor(adjacency, connection.fromId, connection.toId);
      appendNeighbor(adjacency, connection.toId, connection.fromId);
    });
    return adjacency;
  }

  function buildNodeNeighbors(nodes, adjacency) {
    const nodeIds = new Set(nodes.map(node => node.id));
    const result = new Map();
    nodes.forEach(node => {
      const queue = [node.id];
      const visited = new Set([node.id]);
      const neighbors = [];
      while (queue.length) {
        const currentId = queue.shift();
        for (const neighborId of adjacency.get(currentId) || []) {
          if (visited.has(neighborId)) continue;
          visited.add(neighborId);
          if (nodeIds.has(neighborId)) {
            neighbors.push(neighborId);
            continue;
          }
          queue.push(neighborId);
        }
      }
      result.set(node.id, neighbors);
    });
    return result;
  }

  function stationaryDistribution(bias) {
    let distribution = [0.25, 0.25, 0.25, 0.25];
    const matrix = transitionMatrix(bias);
    for (let iteration = 0; iteration < 48; iteration += 1) {
      const next = [0, 0, 0, 0];
      distribution.forEach((weight, from) => matrix[from].forEach((probability, to) => {
        next[to] += weight * probability;
      }));
      distribution = next;
    }
    return distribution;
  }

  function transitionMatrix(bias) {
    const upClear = probability(22 + (bias * 0.6), 3, 40);
    const downCloud = probability(25 - (bias * 0.3), 10, 70);
    const upCloud = probability(12 + (bias * 0.4), 3, 40);
    const downRain = probability(18 - (bias * 0.2), 10, 70);
    const upRain = probability(8 + (bias * 0.15), 2, 30);
    const downStorm = probability(50 - (bias * 0.1), 20, 80);
    return [
      [1 - upClear, upClear, 0, 0],
      [downCloud, 1 - downCloud - upCloud, upCloud, 0],
      [0, downRain, 1 - downRain - upRain, upRain],
      [0, 0, downStorm, 1 - downStorm]
    ];
  }

  function rollNextSeverity(severity, bias, random) {
    const row = transitionMatrix(bias)[clamp(Math.trunc(Number(severity) || 0), 0, 3)];
    return weightedIndex(row, random);
  }

  function wetBiasFor(node, season) {
    const environments = Array.isArray(node?.environments) ? node.environments : [];
    const environmentBias = environments.reduce((maximum, environment) => {
      return Math.max(maximum, ENVIRONMENT_WET_BIAS.get(environment) || 0);
    }, 0);
    return clamp(
      environmentBias + (REGION_WET_BIAS.get(node?.region) || 0) + (SEASON_WET_BIAS.get(season) || 0),
      0,
      20
    );
  }

  function choosePrecipitationType(node, season, random) {
    const region = String(node?.region || "").trim();
    if (region === "북부") return season === "여름" ? "rain" : "snow";
    if (region === "남부") return "rain";
    if (region === "중부" && season !== "겨울") return "rain";
    const environments = Array.isArray(node?.environments) ? node.environments : [];
    const environmentSnowBias = environments.reduce((maximum, environment) => {
      return Math.max(maximum, CENTRAL_WINTER_SNOW_BIAS.get(environment) ?? -10);
    }, -10);
    const snowChance = clamp(15 + environmentSnowBias + (season === "겨울" ? 40 : 0), 5, 95) / 100;
    return random < snowChance ? "snow" : "rain";
  }

  function enforcePrecipitationType(type, severity, node, season, random) {
    if (severity < 2) return "";
    const region = String(node?.region || "").trim();
    if (region === "북부") return season === "여름" ? "rain" : "snow";
    if (region === "남부") return "rain";
    if (region === "중부" && season !== "겨울") return "rain";
    if (type === "rain" || type === "snow") return type;
    return choosePrecipitationType(node, season, random);
  }

  function weatherLabel(weather) {
    const state = normalizeWeatherState(weather);
    if (state.severity === 0) return "맑음";
    if (state.severity === 1) return "흐림";
    if (state.type === "snow") return state.severity === 3 ? "폭설" : "눈";
    return state.severity === 3 ? "폭우" : "비";
  }

  function weatherStateFromLabel(label) {
    if (label === "맑음") return { severity: 0, type: "" };
    if (label === "흐림") return { severity: 1, type: "" };
    if (label === "눈") return { severity: 2, type: "snow" };
    if (label === "폭설") return { severity: 3, type: "snow" };
    if (label === "폭우") return { severity: 3, type: "rain" };
    return { severity: 2, type: "rain" };
  }

  function normalizeWeatherState(value) {
    const severity = clamp(Math.trunc(Number(value?.severity) || 0), 0, 3);
    const type = severity >= 2 && value?.type === "snow" ? "snow" : severity >= 2 ? "rain" : "";
    return { severity, type };
  }

  function weightedIndex(weights, random) {
    const total = weights.reduce((sum, weight) => sum + Math.max(0, Number(weight) || 0), 0) || 1;
    let cursor = clamp(Number(random) || 0, 0, 0.999999999) * total;
    for (let index = 0; index < weights.length; index += 1) {
      cursor -= Math.max(0, Number(weights[index]) || 0);
      if (cursor < 0) return index;
    }
    return weights.length - 1;
  }

  function probability(percent, minimum, maximum) {
    return clamp(percent, minimum, maximum) / 100;
  }

  function seededUnit(key) {
    return hashString(String(key)) / 4294967296;
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function createSeed() {
    try {
      const values = new Uint32Array(2);
      crypto.getRandomValues(values);
      return `${values[0].toString(16)}${values[1].toString(16)}`;
    } catch {
      return `${Date.now().toString(16)}${Math.floor(Math.random() * 0xffffffff).toString(16)}`;
    }
  }

  function appendNeighbor(adjacency, fromId, toId) {
    if (!adjacency.has(fromId)) adjacency.set(fromId, []);
    adjacency.get(fromId).push(toId);
  }

  function normalizeSeason(value) {
    return ["봄", "여름", "가을", "겨울"].includes(value) ? value : "봄";
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  window.ProjectWWeather = {
    UPDATE_INTERVAL_TIMES,
    createState,
    normalizeState,
    ensureState,
    advanceTime,
    getWeatherAt,
    setWeatherAt
  };
}());
