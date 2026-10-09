(function exposeStaticDataLoader() {
  const REQUEST_TIMEOUT_MS = 20_000;

  async function loadCsv(url) {
    const requestUrl = resolveRequestUrl(url);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let response;
    try {
      response = await fetch(requestUrl, { cache: "no-store", signal: controller.signal });
    } catch (error) {
      if (error?.name === "AbortError") throw new Error("정적 데이터 요청 시간이 초과되었습니다.");
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
    if (!response.ok) throw new Error(`정적 데이터 요청 실패 (${response.status})`);

    const rows = parseCsv(await response.text());
    if (rows.length < 2) throw new Error("정적 데이터에 헤더와 데이터 행이 필요합니다.");

    const [headers, ...records] = rows;
    return records
      .filter(row => row.some(value => value !== ""))
      .map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
  }

  function resolveRequestUrl(url) {
    const target = new URL(url, window.location.href);
    const publishedGoogleSheet = target.protocol === "https:"
      && target.hostname === "docs.google.com"
      && target.pathname.startsWith("/spreadsheets/d/e/")
      && target.pathname.endsWith("/pub")
      && target.searchParams.get("output") === "csv";
    if (!publishedGoogleSheet) return target.href;

    if (window.location.protocol === "file:") {
      throw new Error("Google Sheets CSV는 index.html 직접 실행으로 불러올 수 없습니다. start-project-w.cmd로 실행해 주세요.");
    }

    const localHost = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    if (localHost) return `/__project_w_sheet_proxy?url=${encodeURIComponent(target.href)}`;
    return target.href;
  }

  function parseCsv(input) {
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;

    for (let index = 0; index < input.length; index += 1) {
      const character = input[index];
      if (quoted && character === '"' && input[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (!quoted && character === ",") {
        row.push(cell);
        cell = "";
      } else if (!quoted && (character === "\n" || character === "\r")) {
        if (character === "\r" && input[index + 1] === "\n") index += 1;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += character;
      }
    }

    if (cell.length || row.length) {
      row.push(cell);
      rows.push(row);
    }
    if (rows.length && rows[0][0]?.charCodeAt(0) === 0xfeff) rows[0][0] = rows[0][0].slice(1);
    return rows;
  }

  window.ProjectWData = { loadCsv };
}());
