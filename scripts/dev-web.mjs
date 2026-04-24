import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, "../web");
const port = 1420;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    const reqPath = req.url === "/" ? "/index.html" : req.url;
    const safePath = path.normalize(reqPath).replace(/^(\.\.[/\\])+/, "");
    const filePath = path.join(webDir, safePath);
    const ext = path.extname(filePath);
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`TREAL web dev server running at http://localhost:${port}`);
});
