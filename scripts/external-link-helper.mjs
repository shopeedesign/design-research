import http from "node:http";
import { spawn } from "node:child_process";

const HOST = "127.0.0.1";
const PORT = Number(process.env.EXTERNAL_LINK_HELPER_PORT || 47631);
const TOKEN = process.env.EXTERNAL_LINK_HELPER_TOKEN || "design-research-link-helper";

function send(res, statusCode, body, contentType = "text/html; charset=utf-8") {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(body);
}

function isAllowedUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url || "/", `http://${HOST}:${PORT}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "600",
    });
    res.end();
    return;
  }

  if (reqUrl.pathname === "/health") {
    send(res, 200, JSON.stringify({ ok: true }), "application/json; charset=utf-8");
    return;
  }

  if (reqUrl.pathname !== "/open") {
    send(res, 404, "Not found", "text/plain; charset=utf-8");
    return;
  }

  const token = reqUrl.searchParams.get("token");
  const target = reqUrl.searchParams.get("url") || "";

  if (token !== TOKEN) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  if (!isAllowedUrl(target)) {
    send(res, 400, "Only http/https URLs are supported.", "text/plain; charset=utf-8");
    return;
  }

  const child = spawn("/usr/bin/open", [target], {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
  console.log(`[open] ${target}`);

  send(
    res,
    200,
    `<!doctype html><meta charset="utf-8"><title>Opening</title><style>body{font:14px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#202124;margin:16px}</style><p>Opening external browser...</p>`
  );
});

server.listen(PORT, HOST, () => {
  console.log(`External link helper listening on http://${HOST}:${PORT}`);
  console.log(`Token: ${TOKEN}`);
});

process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT", () => server.close(() => process.exit(0)));
