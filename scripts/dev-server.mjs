import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"],
  [".txt", "text/plain; charset=utf-8"],
]);

function resolvePath(urlPath) {
  const safePath = decodeURIComponent(urlPath.split("?")[0] || "/");
  const normalized = path.normalize(safePath).replace(/^(\.\.(\\|\/|$))+/, "");
  let filePath = path.join(root, normalized);

  if (safePath.endsWith("/")) {
    filePath = path.join(filePath, "index.html");
  }

  if (path.extname(filePath) === "") {
    return `${filePath}.html`;
  }

  return filePath;
}

const server = http.createServer(async (req, res) => {
  const target = resolvePath(req.url || "/");

  try {
    let filePath = target;
    let info = await stat(filePath).catch(() => null);

    if (!info && path.extname(filePath) === "") {
      filePath = path.join(target, "index.html");
      info = await stat(filePath).catch(() => null);
    }

    if (!info || !info.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes.get(ext) || "application/octet-stream";
    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(body);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server error");
  }
});

server.listen(port, () => {
  console.log(`Static preview server running at http://localhost:${port}`);
});