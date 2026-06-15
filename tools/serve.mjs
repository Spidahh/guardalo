#!/usr/bin/env node
// Server statico minimale per l'anteprima locale (zero dipendenze).
//   node tools/serve.mjs   →  http://localhost:4178
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = process.env.PORT || 4178;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon',
};

const send = (res, data, ext) => {
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  res.end(data);
};

createServer(async (req, res) => {
  let path = decodeURIComponent(req.url.split('?')[0]);
  if (path === '/' || path === '') path = '/index.html';
  // 1. file esatto
  try { const data = await readFile(join(ROOT, path)); return send(res, data, extname(path)); } catch (e) {}
  // 2. route senza estensione → prova la versione prerenderizzata (path/index.html)
  if (!extname(path)) {
    try { const data = await readFile(join(ROOT, path, 'index.html')); return send(res, data, '.html'); } catch (e) {}
    // 3. fallback SPA: serve la index.html principale (il router gestisce la route)
    try { const data = await readFile(join(ROOT, 'index.html')); return send(res, data, '.html'); } catch (e) {}
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404');
}).listen(PORT, () => console.log(`GUARDALO → http://localhost:${PORT}`));
