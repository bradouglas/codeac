// Renders DebtStack in headless Chromium and screenshots each tab.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const { chromium } = createRequire('/tmp/x.js')('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(here, '..');
const outDir = process.argv[2] || '/tmp/shots';

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
const server = createServer(async (req, res) => {
  const file = path.join(appRoot, req.url === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));
  try {
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1.5 });
page.on('pageerror', (e) => { console.error('PAGE ERROR:', e.message); process.exitCode = 1; });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(700);

await page.screenshot({ path: `${outDir}/1-overview.png`, fullPage: true });
for (const [tab, name] of [['cashflows', '2-annual-cashflows'], ['debt', '3-debt-schedule'], ['exit', '4-exit-modelling']]) {
  await page.click(`[data-tab="${tab}"]`);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
}
await browser.close();
server.close();
console.log('Screenshots written to', outDir);
