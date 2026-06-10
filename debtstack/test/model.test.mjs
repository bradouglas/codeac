import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const M = require('../js/model.js');

// --- baseline scenario runs and is internally consistent -----------------
const scn = M.defaultScenario();
const res = M.run(scn);

assert.equal(res.price, 2800000, 'price = revenue x multiple');
assert.ok(res.totalConsideration < res.price, 'retention adjustment trims deferred payments');
assert.ok(res.totalConsideration > 0.9 * res.price, 'but not by much at 5% attrition');

// funding splits add up
const t0 = res.tranches[0];
assert.ok(Math.abs(t0.payment - (t0.debtDrawn + t0.equity)) < 1e-6, 'debt + equity = payment');
assert.equal(t0.retention, 1, 'completion tranche never retention-adjusted');

// debt fully amortises within the facility term
const lastBal = res.monthly.debtBalance[res.monthly.debtBalance.length - 1];
assert.ok(res.peakDebt > res.totalDebtDrawn * 0.9, 'peak debt near total drawn');
assert.ok(lastBal < res.peakDebt, 'debt amortising');

// exit identity
const ex = res.exit;
assert.ok(Math.abs(ex.grossPrice - ex.saleCosts - ex.debtRepaid - ex.netProceeds) < 1e-6);
assert.ok(ex.netProceeds > 0, 'baseline exit clears the debt');

// equity cashflows produce sane return metrics
assert.ok(res.equityIrr > 0.10 && res.equityIrr < 1.0, `IRR plausible, got ${res.equityIrr}`);
assert.ok(res.moic > 1.5 && res.moic < 10, `MOIC plausible, got ${res.moic}`);
assert.ok(res.minDscr > 1, 'baseline deal services its debt');
assert.equal(res.warnings.length, 0, `no warnings expected: ${res.warnings}`);

// --- 100% cash deal: no debt, no interest ---------------------------------
const cash = M.defaultScenario();
cash.acquisition.tranches.forEach(t => { t.debtPct = 0; });
const cres = M.run(cash);
assert.equal(cres.totalDebtDrawn, 0);
assert.equal(cres.peakDebt, 0);
assert.equal(cres.minDscr, null);
assert.ok(Math.abs(cres.totalEquity - cres.totalConsideration) < 1e-6);

// --- amortisation maths: single drawdown, no IO, no fee --------------------
const simple = M.defaultScenario();
simple.acquisition.tranches = [{ label: 'All', pctOfPrice: 100, month: 0, debtPct: 100 }];
simple.acquisition.retentionAdjusted = false;
simple.facility.interestOnlyMonths = 0;
simple.facility.establishmentFeePct = 0;
simple.facility.termYears = 5;
simple.exit.year = 6;
const sres = M.run(simple);
const afterTerm = sres.monthly.debtBalance[61];
assert.ok(afterTerm < 1, `loan repaid by end of term, residual ${afterTerm}`);
const totalPrincipal = sres.monthly.principal.reduce((s, v) => s + v, 0);
assert.ok(Math.abs(totalPrincipal - sres.price) < 1, 'principal repaid equals amount borrowed');

// --- IRR utility -----------------------------------------------------------
const flat = M.irr([-100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110]); // +10% over 12 months
assert.ok(Math.abs(flat - 0.10) < 0.001, `12-month 10% return, got ${flat}`);
assert.equal(M.irr([-100, -50]), null, 'no positive flows -> null');

// --- tranche % warning ------------------------------------------------------
const bad = M.defaultScenario();
bad.acquisition.tranches[0].pctOfPrice = 50;
assert.ok(M.run(bad).warnings.length > 0, 'warns when tranches do not sum to 100%');

// --- sensitivity grid --------------------------------------------------------
const grid = M.exitSensitivity(scn);
assert.equal(grid.length, 5);
assert.equal(grid[0].cells.length, 5);
assert.ok(grid.some(r => r.cells.some(c => c.base)), 'grid marks the base case');

console.log('All model tests passed.');
console.log(`Baseline: price $${(res.price / 1e6).toFixed(2)}m, equity $${(res.totalEquity / 1e6).toFixed(2)}m, ` +
  `peak debt $${(res.peakDebt / 1e6).toFixed(2)}m, min DSCR ${res.minDscr.toFixed(2)}x, ` +
  `IRR ${(res.equityIrr * 100).toFixed(1)}%, MOIC ${res.moic.toFixed(2)}x, payback month ${res.paybackMonth}`);
