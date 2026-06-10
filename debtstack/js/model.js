/*
 * DebtStack — financial engine
 *
 * Models the acquisition of a financial advice business where the purchase
 * price is paid over several years (upfront + deferred tranches) and each
 * payment is part-funded by a debt facility. All cashflows are modelled
 * monthly and aggregated to years for display.
 *
 * Pure functions only — no DOM access — so the engine runs in both the
 * browser and Node (for tests).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DebtStackModel = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------------------------------------------------- defaults */

  function defaultScenario() {
    return {
      id: null,
      name: 'New scenario',
      acquisition: {
        recurringRevenue: 1000000,   // annual ongoing advice fees of the target
        revenueMultiple: 2.8,        // price = recurring revenue x multiple
        tranches: [
          { label: 'Completion', pctOfPrice: 60, month: 0,  debtPct: 80 },
          { label: 'Year 1 deferred', pctOfPrice: 20, month: 12, debtPct: 80 },
          { label: 'Year 2 deferred', pctOfPrice: 20, month: 24, debtPct: 80 },
        ],
        retentionAdjusted: true,     // deferred tranches scale with revenue retained
      },
      operating: {
        attritionYear1: 5,           // % of revenue lost in the first year post-completion
        growthAfterYear1: 3,         // % p.a. net growth thereafter
        ebitdaMargin: 50,            // % of revenue retained as EBITDA after servicing costs
        taxRate: 25,                 // % company tax on (EBITDA - interest)
      },
      facility: {
        interestRate: 8.5,           // % p.a., charged monthly on the balance
        termYears: 7,                // total facility term per drawdown
        interestOnlyMonths: 12,      // IO period at the start of each drawdown
        establishmentFeePct: 1.0,    // % of each drawdown, capitalised into the loan
      },
      exit: {
        year: 7,                     // sell at the end of this year
        basis: 'revenue',            // 'revenue' or 'ebitda'
        multiple: 3.0,               // exit multiple on the chosen basis
        saleCostsPct: 2.0,           // % of gross price (advisers, legals)
      },
    };
  }

  /* ------------------------------------------------------------ helpers */

  function clampNum(v, lo, hi, fallback) {
    var n = Number(v);
    if (!isFinite(n)) n = fallback;
    return Math.min(hi, Math.max(lo, n));
  }

  // Annual revenue run-rate at month m (m=0 is completion).
  function revenueAt(scn, m) {
    var rev0 = scn.acquisition.recurringRevenue;
    var a = scn.operating.attritionYear1 / 100;
    var g = scn.operating.growthAfterYear1 / 100;
    var t = m / 12;
    if (t <= 1) return rev0 * Math.pow(1 - a, t);
    return rev0 * (1 - a) * Math.pow(1 + g, t - 1);
  }

  // Build the monthly schedule for one drawdown of the facility.
  function buildLoan(amount, facility, drawMonth) {
    var feePct = facility.establishmentFeePct / 100;
    var balance = amount * (1 + feePct);
    var r = facility.interestRate / 100 / 12;
    var io = Math.round(facility.interestOnlyMonths);
    var n = Math.round(facility.termYears * 12) - io; // amortising months
    if (n < 1) { n = 1; io = Math.round(facility.termYears * 12) - 1; if (io < 0) io = 0; }

    var annuity;
    if (r > 0) annuity = balance * r / (1 - Math.pow(1 + r, -n));
    else annuity = balance / n;

    var rows = []; // {month, interest, principal, balance(end)}
    var bal = balance;
    for (var k = 0; k < io + n && bal > 0.005; k++) {
      var interest = bal * r;
      var principal = 0;
      if (k >= io) {
        principal = Math.min(annuity - interest, bal);
        if (principal < 0) principal = 0;
      }
      bal -= principal;
      rows.push({ month: drawMonth + k + 1, interest: interest, principal: principal, balance: bal });
    }
    return { drawMonth: drawMonth, drawnAmount: balance, rows: rows };
  }

  // IRR of monthly cashflows via bisection; returns annualised rate or null.
  function irr(cashflows) {
    var hasNeg = false, hasPos = false;
    for (var i = 0; i < cashflows.length; i++) {
      if (cashflows[i] < 0) hasNeg = true;
      if (cashflows[i] > 0) hasPos = true;
    }
    if (!hasNeg || !hasPos) return null;

    function npv(rate) {
      var v = 0;
      for (var m = 0; m < cashflows.length; m++) v += cashflows[m] / Math.pow(1 + rate, m);
      return v;
    }
    var lo = -0.08, hi = 0.5; // monthly bounds: ~-63% to ~+13000% annualised
    if (npv(lo) * npv(hi) > 0) return null;
    for (var it = 0; it < 200; it++) {
      var mid = (lo + hi) / 2;
      if (npv(lo) * npv(mid) <= 0) hi = mid; else lo = mid;
    }
    var monthly = (lo + hi) / 2;
    return Math.pow(1 + monthly, 12) - 1;
  }

  /* --------------------------------------------------------------- run */

  function run(scn) {
    var acq = scn.acquisition, op = scn.operating, fac = scn.facility, ex = scn.exit;
    var warnings = [];

    var price = acq.recurringRevenue * acq.revenueMultiple;
    var exitMonth = Math.round(ex.year * 12);
    var horizon = exitMonth; // months 0..horizon inclusive

    // --- consideration tranches ----------------------------------------
    var tranches = acq.tranches.map(function (t) {
      var retention = 1;
      if (acq.retentionAdjusted && t.month > 0) {
        retention = Math.min(1, revenueAt(scn, t.month) / acq.recurringRevenue);
      }
      var payment = price * (t.pctOfPrice / 100) * retention;
      var debt = payment * (t.debtPct / 100);
      if (t.month > exitMonth) {
        warnings.push('"' + t.label + '" falls after the exit (month ' + t.month + ') and is excluded.');
      }
      return {
        label: t.label, month: t.month, pctOfPrice: t.pctOfPrice,
        retention: retention, payment: payment, debtDrawn: debt, equity: payment - debt,
      };
    }).filter(function (t) { return t.month <= exitMonth; });

    var pctTotal = acq.tranches.reduce(function (s, t) { return s + Number(t.pctOfPrice || 0); }, 0);
    if (Math.abs(pctTotal - 100) > 0.01) {
      warnings.push('Payment tranches total ' + pctTotal.toFixed(1) + '% of the price (expected 100%).');
    }

    // --- debt schedules -------------------------------------------------
    var loans = tranches
      .filter(function (t) { return t.debtDrawn > 0; })
      .map(function (t) { return buildLoan(t.debtDrawn, fac, t.month); });

    // --- monthly series -------------------------------------------------
    var M = horizon + 1;
    var revenue = new Array(M).fill(0);
    var ebitda = new Array(M).fill(0);
    var interest = new Array(M).fill(0);
    var principal = new Array(M).fill(0);
    var drawdowns = new Array(M).fill(0);
    var equityIn = new Array(M).fill(0);

    for (var m = 1; m < M; m++) {
      revenue[m] = revenueAt(scn, m) / 12;
      ebitda[m] = revenue[m] * (op.ebitdaMargin / 100);
    }
    tranches.forEach(function (t) {
      equityIn[t.month] += t.equity;
      drawdowns[t.month] += t.debtDrawn;
    });
    loans.forEach(function (loan) {
      loan.rows.forEach(function (r) {
        if (r.month < M) {
          interest[r.month] += r.interest;
          principal[r.month] += r.principal;
        }
      });
    });

    // Debt balance at the end of each month.
    var debtBalance = new Array(M).fill(0);
    var bal = 0;
    for (m = 0; m < M; m++) {
      bal += drawdowns[m] * (1 + fac.establishmentFeePct / 100);
      bal -= principal[m];
      if (bal < 0.005) bal = 0;
      debtBalance[m] = bal;
    }

    // Equity cashflow: -equity contributions + after-tax free cash after debt service.
    var tax = new Array(M).fill(0);
    var netCash = new Array(M).fill(0);
    var equityCF = new Array(M).fill(0);
    for (m = 0; m < M; m++) {
      tax[m] = Math.max(0, ebitda[m] - interest[m]) * (op.taxRate / 100);
      netCash[m] = ebitda[m] - interest[m] - tax[m] - principal[m];
      equityCF[m] = netCash[m] - equityIn[m];
    }

    // --- exit ------------------------------------------------------------
    var revAtExit = revenueAt(scn, exitMonth);
    var ebitdaAtExit = revAtExit * (op.ebitdaMargin / 100);
    var grossPrice = (ex.basis === 'ebitda' ? ebitdaAtExit : revAtExit) * ex.multiple;
    var saleCosts = grossPrice * (ex.saleCostsPct / 100);
    var debtAtExit = debtBalance[exitMonth];
    var netProceeds = grossPrice - saleCosts - debtAtExit;
    equityCF[exitMonth] += netProceeds;

    var exitResult = {
      month: exitMonth,
      revenueAtExit: revAtExit,
      ebitdaAtExit: ebitdaAtExit,
      grossPrice: grossPrice,
      saleCosts: saleCosts,
      debtRepaid: debtAtExit,
      netProceeds: netProceeds,
      impliedRevenueMultiple: revAtExit > 0 ? grossPrice / revAtExit : 0,
      impliedEbitdaMultiple: ebitdaAtExit > 0 ? grossPrice / ebitdaAtExit : 0,
    };
    if (netProceeds < 0) warnings.push('Exit proceeds do not cover the remaining debt — the exit leaves a shortfall.');

    // --- annual aggregation ---------------------------------------------
    var years = [];
    var nYears = Math.ceil(horizon / 12);
    for (var y = 1; y <= nYears; y++) {
      var a = (y - 1) * 12 + 1, b = Math.min(y * 12, horizon);
      var row = { year: y, revenue: 0, ebitda: 0, interest: 0, principal: 0, tax: 0, netCash: 0, equityIn: 0 };
      for (m = a; m <= b; m++) {
        row.revenue += revenue[m]; row.ebitda += ebitda[m];
        row.interest += interest[m]; row.principal += principal[m];
        row.tax += tax[m]; row.netCash += netCash[m];
        row.equityIn += equityIn[m];
      }
      row.equityIn += (y === 1 ? equityIn[0] : 0); // completion equity sits in year 1
      row.debtService = row.interest + row.principal;
      row.closingDebt = debtBalance[b];
      row.dscr = row.debtService > 0.005 ? row.ebitda / row.debtService : null;
      row.debtToEbitda = row.ebitda > 0.005 ? row.closingDebt / row.ebitda : null;
      years.push(row);
    }

    // --- headline metrics -------------------------------------------------
    var totalEquity = equityIn.reduce(function (s, v) { return s + v; }, 0);
    var totalDebtDrawn = tranches.reduce(function (s, t) { return s + t.debtDrawn; }, 0);
    var totalConsideration = tranches.reduce(function (s, t) { return s + t.payment; }, 0);
    var peakDebt = Math.max.apply(null, debtBalance);
    var minDscr = null;
    years.forEach(function (r) {
      if (r.dscr !== null && (minDscr === null || r.dscr < minDscr)) minDscr = r.dscr;
    });

    var inflows = 0, outflows = 0;
    equityCF.forEach(function (v) { if (v > 0) inflows += v; else outflows -= v; });
    var moic = outflows > 0.005 ? inflows / outflows : null;

    var cum = 0, paybackMonth = null;
    for (m = 0; m < M; m++) {
      cum += equityCF[m];
      if (paybackMonth === null && cum >= 0 && m > 0) paybackMonth = m;
    }

    var equityIrr = irr(equityCF);

    return {
      price: price,
      totalConsideration: totalConsideration,
      effectiveMultiple: acq.recurringRevenue > 0 ? totalConsideration / acq.recurringRevenue : 0,
      totalDebtDrawn: totalDebtDrawn,
      totalEquity: totalEquity,
      peakDebt: peakDebt,
      minDscr: minDscr,
      paybackMonth: paybackMonth,
      equityIrr: equityIrr,
      moic: moic,
      tranches: tranches,
      loans: loans,
      monthly: {
        revenue: revenue, ebitda: ebitda, interest: interest, principal: principal,
        tax: tax, netCash: netCash, equityIn: equityIn, equityCF: equityCF,
        debtBalance: debtBalance, drawdowns: drawdowns,
      },
      years: years,
      exit: exitResult,
      warnings: warnings,
    };
  }

  // IRR sensitivity grid across exit year and exit multiple.
  function exitSensitivity(scn, yearSpan, multipleStep) {
    yearSpan = yearSpan || 2;       // +/- years around the chosen exit year
    multipleStep = multipleStep || 0.25;
    var rows = [];
    var baseYear = scn.exit.year, baseMult = scn.exit.multiple;
    for (var dm = 2; dm >= -2; dm--) {
      var mult = +(baseMult + dm * multipleStep).toFixed(2);
      if (mult <= 0) continue;
      var cells = [];
      for (var dy = -yearSpan; dy <= yearSpan; dy++) {
        var yr = baseYear + dy;
        if (yr < 1) { cells.push({ year: yr, irr: null, skip: true }); continue; }
        var copy = JSON.parse(JSON.stringify(scn));
        copy.exit.year = yr;
        copy.exit.multiple = mult;
        var res = run(copy);
        cells.push({ year: yr, irr: res.equityIrr, moic: res.moic, base: dy === 0 && dm === 0 });
      }
      rows.push({ multiple: mult, cells: cells });
    }
    return rows;
  }

  return {
    defaultScenario: defaultScenario,
    run: run,
    irr: irr,
    revenueAt: revenueAt,
    exitSensitivity: exitSensitivity,
    clampNum: clampNum,
  };
}));
