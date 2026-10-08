const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const HOST = "127.0.0.1";
const PORT = Number(process.env.PROJECT_W_PORT) || 8766;
const ROOT = path.resolve(__dirname, "..");
const SHEET_PROXY_PATH = "/__project_w_sheet_proxy";
const MIME_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".csv", "text/csv; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp3", "audio/mpeg"],
  [".ogg", "audio/ogg"],
  [".wav", "audio/wav"],
  [".ico", "image/x-icon"]
]);

const server = http.createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      sendText(response, 405, "Method Not Allowed");
      return;
    }

    const requestUrl = new URL(request.url, `http://${HOST}:${PORT}`);
    if (requestUrl.pathname === SHEET_PROXY_PATH) {
      await proxyPublishedSheet(requestUrl, request, response);
      return;
    }
    serveStaticFile(requestUrl, request, response);
  } catch (error) {
    console.error(error);
    if (!response.headersSent) sendText(response, 500, "Project_W local server error");
    else response.end();
  }
});

async function proxyPublishedSheet(requestUrl, request, response) {
  const rawTarget = requestUrl.searchParams.get("url");
  let target;
  try {
    target = new URL(rawTarget);
  } catch {
    sendText(response, 400, "Invalid sheet URL");
    return;
  }

  const allowed = target.protocol === "https:"
    && target.hostname === "docs.google.com"
    && target.pathname.startsWith("/spreadsheets/d/e/")
    && target.pathname.endsWith("/pub")
    && target.searchParams.get("output") === "csv";
  if (!allowed) {
    sendText(response, 403, "Sheet URL is not allowed");
    return;
  }

  const upstream = await fetch(target, {
    redirect: "follow",
    cache: "no-store",
    headers: { "User-Agent": "Project_W local server" }
  });
  if (!upstream.ok) {
    sendText(response, upstream.status, `Google Sheets request failed (${upstream.status})`);
    return;
  }

  const body = Buffer.from(await upstream.arrayBuffer());
  response.writeHead(200, {
    "Content-Type": upstream.headers.get("content-type") || "text/csv; charset=utf-8",
    "Content-Length": body.length,
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*"
  });
  if (request.method === "HEAD") response.end();
  else response.end(body);
}

function serveStaticFile(requestUrl, request, response) {
  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    sendText(response, 400, "Invalid path");
    return;
  }
  if (pathname === "/") pathname = "/index.html";

  const relativePath = pathname.replace(/^\/+/, "").replaceAll("/", path.sep);
  const filePath = path.resolve(ROOT, relativePath);
  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) {
    sendText(response, 403, "Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    sendText(response, 404, "Not Found");
    return;
  }

  const body = fs.readFileSync(filePath);
  response.writeHead(200, {
    "Content-Type": MIME_TYPES.get(path.extname(filePath).toLowerCase()) || "application/octet-stream",
    "Content-Length": body.length,
    "Cache-Control": "no-store"
  });
  if (request.method === "HEAD") response.end();
  else response.end(body);
}

function sendText(response, status, message) {
  const body = Buffer.from(message, "utf8");
  response.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Length": body.length,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

server.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}/`;
  console.log(`[Project_W Clean] ${url}`);
  console.log("Keep this window open while playing the game.");
  if (process.env.PROJECT_W_NO_BROWSER === "1") return;
  const browser = spawn("cmd", ["/c", "start", "", url], {
    detached: true,
    stdio: "ignore",
    windowsHide: true
  });
  browser.unref();
});

server.on("error", error => {
  if (error.code === "EADDRINUSE") {
    console.error(`[Project_W Clean] Port ${PORT} is already in use.`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
