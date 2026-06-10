/*
 * UI smoke test: loads index.html in jsdom (with the canvas package so
 * Chart.js gets a real 2D context), waits for the app to boot, then checks
 * the KPIs, tables and charts render and react to input changes.
 *
 * Run from debtstack/:  node --experimental-vm-modules test/ui.smoke.mjs
 * Requires jsdom + canvas installed (e.g. in /tmp/node_modules — see NODE_PATH).
 */
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// jsdom may live next to this repo or in an external node_modules (NODE_PATH-style)
const requireFrom = (base) => { try { return createRequire(base)('jsdom'); } catch { return null; } };
const jsdomPkg = requireFrom(import.meta.url)
  || (process.env.NODE_PATH ? requireFrom(path.join(process.env.NODE_PATH, 'x.js')) : null);
if (!jsdomPkg) { console.error('jsdom not found — npm i jsdom canvas, or set NODE_PATH'); process.exit(1); }
const { JSDOM } = jsdomPkg;

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(here, '..');

// serve the app over http so jsdom gets a non-opaque origin (localStorage)
const { createServer } = await import('node:http');
const { readFile } = await import('node:fs/promises');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
const server = createServer(async (req, res) => {
  const file = path.join(appRoot, req.url === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404); res.end();
  }
});
await new Promise((res) => server.listen(0, '127.0.0.1', res));
const baseUrl = `http://127.0.0.1:${server.address().port}/`;

const errors = [];
const dom = await JSDOM.fromURL(baseUrl, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  beforeParse(window) {
    // jsdom has no ResizeObserver; Chart.js only needs it for live resizing
    window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  },
});
dom.window.addEventListener('error', (e) => errors.push(e.message));

// wait for load + the app's debounced recompute
await new Promise((res) => dom.window.addEventListener('load', res));
await new Promise((res) => setTimeout(res, 600));

const doc = dom.window.document;
const $ = (s) => doc.querySelector(s);
const $$ = (s) => doc.querySelectorAll(s);

assert.deepEqual(errors, [], `page errors: ${errors.join(' | ')}`);
assert.ok(dom.window.Chart, 'Chart.js loaded from local vendor file');
assert.ok(dom.window.DebtStackModel, 'model loaded');

// KPIs rendered with real numbers
const kpis = $$('#kpis .kpi');
assert.equal(kpis.length, 8, `expected 8 KPI cards, got ${kpis.length}`);
const kpiText = $('#kpis').textContent;
assert.ok(kpiText.includes('$2.80m'), 'purchase price KPI shows $2.80m');
assert.ok(!kpiText.includes('NaN'), 'no NaN in KPIs');
assert.ok($('#derivedPrice').textContent.includes('$2.80m'), 'derived price shown');

// tables rendered
assert.ok($$('#annualTable tbody tr').length >= 7, 'annual table has year rows');
assert.ok($$('#trancheSummaryTable tbody tr').length === 4, 'tranche summary: 3 tranches + total');
assert.ok($$('#sensTable tbody tr').length === 5, 'sensitivity grid has 5 multiple rows');
assert.ok($$('#sensTable td.base').length === 1, 'sensitivity grid marks base case');

// charts created on real canvases
['chartDebt', 'chartCashflow', 'chartWaterfall'].forEach((id) => {
  const inst = dom.window.Chart.getChart(doc.getElementById(id));
  assert.ok(inst, `chart ${id} instantiated`);
});

// scenario persisted with a uuid hash route
assert.match(dom.window.location.hash, /^#\/scenarios\/[\w-]+/, 'hash route set');
const stored = JSON.parse(dom.window.localStorage.getItem('debtstack.scenarios.v1'));
assert.equal(Object.keys(stored).length, 1, 'scenario saved to localStorage');

// changing an input recomputes the outputs
const revInput = doc.querySelector('[data-path="acquisition.recurringRevenue"]');
revInput.value = '2000000';
revInput.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
await new Promise((res) => setTimeout(res, 300));
assert.ok($('#derivedPrice').textContent.includes('$5.60m'), 'price reacts to revenue change');
assert.ok($('#kpis').textContent.includes('$5.60m'), 'KPIs react to revenue change');

// tranche editor: add a payment row
const nTranches = $$('#trancheTable tbody tr').length;
$('#btnAddTranche').dispatchEvent(new dom.window.Event('click', { bubbles: true }));
await new Promise((res) => setTimeout(res, 300));
assert.equal($$('#trancheTable tbody tr').length, nTranches + 1, 'tranche row added');
assert.ok(!$('#warnings').classList.contains('hidden'), 'warning shown when tranches exceed 100%');

assert.deepEqual(errors, [], `page errors after interaction: ${errors.join(' | ')}`);
console.log('UI smoke test passed: boot, KPIs, tables, 3 charts, persistence, reactivity, tranche editor.');
server.close();
process.exit(0);
