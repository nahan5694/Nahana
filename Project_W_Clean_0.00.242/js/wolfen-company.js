(function exposeWolfenCompany() {
  const STATE_SCHEMA_VERSION = 2;
  const MOVE_INTERVAL_TIMES = 2;
  const RELOCATION_INTERVAL_TIMES = 25;
  const ENCOUNTER_COOLDOWN_TIMES = 60;
  const REGIONS = ["북부", "중부", "남부"];

  let getState = () => null;
  let setState = () => {};
  let getGraph = () => null;
  let getRegion = () => "";
  let isRelocationPaused = () => false;

  function init(options = {}) {
    getState = typeof options.getState === "function" ? options.getState : getState;
    setState = typeof options.setState === "function" ? options.setState : setState;
    getGraph = typeof options.getGraph === "function" ? options.getGraph : getGraph;
    getRegion = typeof options.getRegion === "function" ? options.getRegion : getRegion;
    isRelocationPaused = typeof options.isRelocationPaused === "function" ? options.isRelocationPaused : isRelocationPaused;
  }

  function createState() {
    return {
      schemaVersion: STATE_SCHEMA_VERSION,
      positionId: "",
      previousPositionId: "",
      movementElapsedTimes: 0,
      relocationElapsedTimes: 0,
      relocationSerial: 0,
      encounterCooldownTimes: 0
    };
  }

  function normalizeState(value) {
    const source = value && typeof value === "object" ? value : {};
    return {
      schemaVersion: STATE_SCHEMA_VERSION,
      positionId: text(source.positionId),
      previousPositionId: text(source.previousPositionId),
      movementElapsedTimes: clampInteger(source.movementElapsedTimes, 0, MOVE_INTERVAL_TIMES - 1),
      relocationElapsedTimes: clampInteger(source.relocationElapsedTimes, 0, RELOCATION_INTERVAL_TIMES - 1),
      relocationSerial: Math.max(0, integer(source.relocationSerial)),
      encounterCooldownTimes: Math.max(0, integer(source.encounterCooldownTimes))
    };
  }

  function ensureState() {
    const graph = currentGraph();
    const state = normalizeState(getState());
    if (!graph) {
      setState(state);
      return state;
    }
    const placementIds = new Set([...graph.nodes, ...graph.dots].map(placement => placement.id));
    if (!placementIds.has(state.positionId)) {
      state.positionId = randomEntry(graph.dots)?.id || "";
      state.previousPositionId = "";
      state.movementElapsedTimes = 0;
      state.relocationElapsedTimes = 0;
    }
    if (!placementIds.has(state.previousPositionId)) state.previousPositionId = "";
    setState(state);
    return state;
  }

  function advanceTime(times = 1) {
    const graph = currentGraph();
    const state = ensureState();
    if (!graph || !state.positionId) return state;
    const elapsed = Math.max(0, integer(times) || 1);
    for (let index = 0; index < elapsed; index += 1) {
      if (state.encounterCooldownTimes > 0) state.encounterCooldownTimes -= 1;
      if (!isRelocationPaused()) state.relocationElapsedTimes += 1;
      state.movementElapsedTimes += 1;
      if (!isRelocationPaused() && state.relocationElapsedTimes >= RELOCATION_INTERVAL_TIMES) {
        relocateToOtherRegion(state, graph);
        state.relocationElapsedTimes = 0;
        state.relocationSerial += 1;
        state.movementElapsedTimes = 0;
        continue;
      }
      if (state.movementElapsedTimes >= MOVE_INTERVAL_TIMES) {
        moveOnePlacement(state, graph);
        state.movementElapsedTimes = 0;
      }
    }
    setState(state);
    return state;
  }

  function moveOnePlacement(state, graph) {
    const neighbors = graph.connections.flatMap(connection => {
      if (connection.fromId === state.positionId) return [connection.toId];
      if (connection.toId === state.positionId) return [connection.fromId];
      return [];
    });
    if (!neighbors.length) return;
    const forward = neighbors.filter(placementId => placementId !== state.previousPositionId);
    const destinationId = randomEntry(forward.length ? forward : neighbors);
    if (!destinationId) return;
    state.previousPositionId = state.positionId;
    state.positionId = destinationId;
  }

  function relocateToOtherRegion(state, graph) {
    const currentRegion = normalizeRegion(getRegion(state.positionId));
    const allowedRegions = currentRegion ? REGIONS.filter(region => region !== currentRegion) : REGIONS;
    let candidates = graph.dots.filter(dot => {
      return dot.id !== state.positionId && allowedRegions.includes(normalizeRegion(getRegion(dot.id)));
    });
    if (!candidates.length) candidates = graph.dots.filter(dot => dot.id !== state.positionId);
    const destination = randomEntry(candidates);
    if (!destination) return;
    state.positionId = destination.id;
    state.previousPositionId = "";
  }

  function canEncounter(placementId) {
    const id = text(placementId);
    if (!/^MAP_DOT_\d+$/.test(id)) return false;
    const state = ensureState();
    return state.encounterCooldownTimes <= 0 && state.positionId === id;
  }

  function recordEncounter() {
    const state = ensureState();
    state.encounterCooldownTimes = ENCOUNTER_COOLDOWN_TIMES;
    setState(state);
    return state;
  }

  function getPosition() {
    return ensureState().positionId;
  }

  function currentGraph() {
    const graph = getGraph();
    if (!graph?.loaded || !Array.isArray(graph.nodes) || !Array.isArray(graph.dots) || !Array.isArray(graph.connections)) return null;
    return graph;
  }

  function normalizeRegion(value) {
    const region = text(value);
    return REGIONS.includes(region) ? region : "";
  }

  function randomEntry(values) {
    if (!Array.isArray(values) || !values.length) return null;
    return values[Math.floor(Math.random() * values.length)] ?? null;
  }

  function clampInteger(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, integer(value)));
  }

  function integer(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.trunc(number) : 0;
  }

  function text(value) {
    return String(value ?? "").trim();
  }

  window.ProjectWWolfenCompany = {
    init,
    createState,
    normalizeState,
    ensureState,
    advanceTime,
    canEncounter,
    recordEncounter,
    getPosition,
    MOVE_INTERVAL_TIMES,
    RELOCATION_INTERVAL_TIMES,
    ENCOUNTER_COOLDOWN_TIMES
  };
}());
