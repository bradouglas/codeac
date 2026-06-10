/* DebtStack — UI layer. Depends on js/model.js (DebtStackModel) and Chart.js. */
(function () {
  'use strict';

  var M = window.DebtStackModel;
  var STORE_KEY = 'debtstack.scenarios.v1';

  var scenario = null;   // the live scenario being edited
  var charts = {};       // Chart.js instances

  /* ------------------------------------------------------------ format */

  function fmtMoney(v) {
    if (v === null || v === undefined || !isFinite(v)) return '—';
    var sign = v < 0 ? '-' : '';
    var a = Math.abs(v);
    if (a >= 1e6) return sign + '$' + (a / 1e6).toFixed(2) + 'm';
    if (a >= 1e3) return sign + '$' + (a / 1e3).toFixed(0) + 'k';
    return sign + '$' + a.toFixed(0);
  }
  function fmtPct(v, dp) {
    if (v === null || v === undefined || !isFinite(v)) return '—';
    return (v * 100).toFixed(dp === undefined ? 1 : dp) + '%';
  }
  function fmtX(v, dp) {
    if (v === null || v === undefined || !isFinite(v)) return '—';
    return v.toFixed(dp === undefined ? 2 : dp) + 'x';
  }
  function fmtYears(months) {
    if (months === null || months === undefined) return '—';
    return (months / 12).toFixed(1) + ' yrs';
  }

  function $(sel) { return document.querySelector(sel); }

  function getPath(obj, path) {
    return path.split('.').reduce(function (o, k) { return o ? o[k] : undefined; }, obj);
  }
  function setPath(obj, path, value) {
    var keys = path.split('.');
    var last = keys.pop();
    var target = keys.reduce(function (o, k) { return o[k]; }, obj);
    target[last] = value;
  }

  /* ------------------------------------------------------------ storage */

  // localStorage can be unavailable (private browsing, opaque origins) —
  // fall back to an in-memory store so the app still works for the session.
  var memStore = null;
  function loadStore() {
    if (memStore) return memStore;
    try { return JSON.parse(window.localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { memStore = memStore || {}; return memStore; }
  }
  function saveStore(store) {
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(store)); }
    catch (e) { memStore = store; }
  }
  function persistCurrent() {
    var store = loadStore();
    store[scenario.id] = scenario;
    saveStore(store);
    renderScenarioSelect();
  }
  function newId() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
      : 'sc-' + Date.now() + '-' + Math.floor(Math.random() * 1e6);
  }
  function idFromHash() {
    var m = location.hash.match(/^#\/scenarios\/([\w-]+)/);
    return m ? m[1] : null;
  }

  function openScenario(id) {
    var store = loadStore();
    if (id && store[id]) {
      scenario = store[id];
    } else {
      scenario = M.defaultScenario();
      scenario.id = newId();
      scenario.name = 'Scenario ' + (Object.keys(store).length + 1);
      store[scenario.id] = scenario;
      saveStore(store);
    }
    location.hash = '#/scenarios/' + scenario.id;
    syncInputs();
    renderScenarioSelect();
    recompute();
  }

  function renderScenarioSelect() {
    var store = loadStore();
    var sel = $('#scenarioSelect');
    sel.innerHTML = '';
    Object.keys(store).forEach(function (id) {
      var opt = document.createElement('option');
      opt.value = id;
      opt.textContent = store[id].name || 'Untitled';
      if (id === scenario.id) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  /* ----------------------------------------------------- inputs binding */

  function syncInputs() {
    document.querySelectorAll('[data-path]').forEach(function (el) {
      var v = getPath(scenario, el.dataset.path);
      if (el.type === 'checkbox') el.checked = !!v;
      else el.value = v;
    });
    $('#scenarioName').value = scenario.name;
    renderTrancheEditor();
  }

  function bindInputs() {
    document.querySelectorAll('[data-path]').forEach(function (el) {
      el.addEventListener('input', function () {
        var v;
        if (el.type === 'checkbox') v = el.checked;
        else if (el.tagName === 'SELECT') v = el.value;
        else {
          v = parseFloat(el.value);
          if (!isFinite(v)) return; // keep previous value while typing
          if (el.min !== '' && v < Number(el.min)) v = Number(el.min);
          if (el.max !== '' && v > Number(el.max)) v = Number(el.max);
        }
        setPath(scenario, el.dataset.path, v);
        persistCurrent();
        recompute();
      });
    });

    $('#scenarioName').addEventListener('input', function () {
      scenario.name = this.value;
      persistCurrent();
    });
    $('#scenarioSelect').addEventListener('change', function () { openScenario(this.value); });

    $('#btnNew').addEventListener('click', function () { openScenario(null); });
    $('#btnDuplicate').addEventListener('click', function () {
      var copy = JSON.parse(JSON.stringify(scenario));
      copy.id = newId();
      copy.name = scenario.name + ' (copy)';
      var store = loadStore();
      store[copy.id] = copy;
      saveStore(store);
      openScenario(copy.id);
    });
    $('#btnDelete').addEventListener('click', function () {
      if (!confirm('Delete scenario "' + scenario.name + '"?')) return;
      var store = loadStore();
      delete store[scenario.id];
      saveStore(store);
      var next = Object.keys(store)[0] || null;
      openScenario(next);
    });
    $('#btnExport').addEventListener('click', function () {
      var blob = new Blob([JSON.stringify(scenario, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = (scenario.name || 'scenario').replace(/[^\w-]+/g, '_') + '.json';
      a.click();
      URL.revokeObjectURL(a.href);
    });
    $('#importFile').addEventListener('change', function () {
      var file = this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(reader.result);
          var base = M.defaultScenario();
          ['acquisition', 'operating', 'facility', 'exit'].forEach(function (k) {
            if (!data[k]) data[k] = base[k];
          });
          data.id = newId();
          data.name = data.name || file.name.replace(/\.json$/i, '');
          var store = loadStore();
          store[data.id] = data;
          saveStore(store);
          openScenario(data.id);
        } catch (e) {
          alert('Could not read that file as a DebtStack scenario.');
        }
      };
      reader.readAsText(file);
      this.value = '';
    });

    $('#btnAddTranche').addEventListener('click', function () {
      var last = scenario.acquisition.tranches[scenario.acquisition.tranches.length - 1];
      scenario.acquisition.tranches.push({
        label: 'Deferred payment',
        pctOfPrice: 10,
        month: last ? last.month + 12 : 0,
        debtPct: last ? last.debtPct : 80,
      });
      renderTrancheEditor();
      persistCurrent();
      recompute();
    });

    document.querySelectorAll('#tabs .tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#tabs .tab').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        $('#panel-' + btn.dataset.tab).classList.add('active');
      });
    });

    window.addEventListener('hashchange', function () {
      var id = idFromHash();
      if (id && scenario && id !== scenario.id) openScenario(id);
    });
  }

  function renderTrancheEditor() {
    var tbody = $('#trancheTable tbody');
    tbody.innerHTML = '';
    scenario.acquisition.tranches.forEach(function (t, i) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><input type="text" value="' + String(t.label).replace(/"/g, '&quot;') + '" data-tfield="label" data-ti="' + i + '"></td>' +
        '<td><input type="number" value="' + t.pctOfPrice + '" min="0" max="100" step="1" data-tfield="pctOfPrice" data-ti="' + i + '"></td>' +
        '<td><input type="number" value="' + t.month + '" min="0" step="1" data-tfield="month" data-ti="' + i + '"></td>' +
        '<td><input type="number" value="' + t.debtPct + '" min="0" max="100" step="5" data-tfield="debtPct" data-ti="' + i + '"></td>' +
        '<td><button class="t-remove" title="Remove payment" data-tremove="' + i + '">&times;</button></td>';
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('input').forEach(function (el) {
      el.addEventListener('input', function () {
        var t = scenario.acquisition.tranches[Number(el.dataset.ti)];
        if (el.dataset.tfield === 'label') t.label = el.value;
        else {
          var v = parseFloat(el.value);
          if (!isFinite(v)) return;
          if (el.min !== '' && v < Number(el.min)) v = Number(el.min);
          if (el.max !== '' && v > Number(el.max)) v = Number(el.max);
          t[el.dataset.tfield] = v;
        }
        persistCurrent();
        recompute();
      });
    });
    tbody.querySelectorAll('[data-tremove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        scenario.acquisition.tranches.splice(Number(btn.dataset.tremove), 1);
        renderTrancheEditor();
        persistCurrent();
        recompute();
      });
    });
  }

  /* ------------------------------------------------------------- render */

  var recomputeTimer = null;
  function recompute() {
    clearTimeout(recomputeTimer);
    recomputeTimer = setTimeout(function () {
      var res = M.run(scenario);
      renderWarnings(res);
      renderKpis(res);
      renderCharts(res);
      renderAnnualTable(res);
      renderDebtTables(res);
      renderExit(res);
      $('#derivedPrice').textContent = fmtMoney(res.price);
    }, 80);
  }

  function renderWarnings(res) {
    var box = $('#warnings');
    if (!res.warnings.length) { box.classList.add('hidden'); return; }
    box.classList.remove('hidden');
    box.innerHTML = res.warnings.map(function (w) {
      return '<div>&#9888;&#65039; ' + w + '</div>';
    }).join('');
  }

  function kpiCard(label, value, sub, tone) {
    return '<div class="kpi ' + (tone || '') + '">' +
      '<div class="label">' + label + '</div>' +
      '<div class="value">' + value + '</div>' +
      (sub ? '<div class="sub">' + sub + '</div>' : '') +
      '</div>';
  }

  function renderKpis(res) {
    var dscrTone = res.minDscr === null ? '' : res.minDscr < 1 ? 'bad' : res.minDscr < 1.25 ? 'warn' : 'good';
    var irrTone = res.equityIrr === null ? '' : res.equityIrr < 0 ? 'bad' : res.equityIrr < 0.12 ? 'warn' : 'good';
    var gearing = res.totalConsideration > 0 ? res.totalDebtDrawn / res.totalConsideration : 0;
    $('#kpis').innerHTML =
      kpiCard('Purchase price', fmtMoney(res.price), fmtX(scenario.acquisition.revenueMultiple, 1) + ' recurring revenue') +
      kpiCard('Total paid', fmtMoney(res.totalConsideration), fmtX(res.effectiveMultiple) + ' effective multiple') +
      kpiCard('Your equity in', fmtMoney(res.totalEquity), fmtPct(1 - gearing, 0) + ' of consideration') +
      kpiCard('Peak debt', fmtMoney(res.peakDebt), fmtPct(gearing, 0) + ' debt funded') +
      kpiCard('Min DSCR', fmtX(res.minDscr), 'EBITDA / debt service', dscrTone) +
      kpiCard('Equity IRR', fmtPct(res.equityIrr), 'incl. exit in year ' + scenario.exit.year, irrTone) +
      kpiCard('MOIC', fmtX(res.moic), 'cash out / cash in') +
      kpiCard('Payback', fmtYears(res.paybackMonth), 'equity fully recovered');
  }

  /* -------------------------------------------------------------- charts */

  var palette = {
    navy: '#16395d', blue: '#1f7aec', blueSoft: 'rgba(31,122,236,.15)',
    green: '#0e9f6e', greenSoft: 'rgba(14,159,110,.15)',
    red: '#d64545', amber: '#e3a008', grey: '#94a6b8',
  };

  function ensureChart(id, config) {
    if (typeof Chart === 'undefined') return null;
    if (charts[id]) { charts[id].destroy(); }
    charts[id] = new Chart($('#' + id), config);
    return charts[id];
  }

  function renderCharts(res) {
    if (typeof Chart === 'undefined') return;
    var mLabels = res.monthly.debtBalance.map(function (_, m) {
      return m % 12 === 0 ? 'Yr ' + (m / 12) : '';
    });
    var cum = [], c = 0;
    res.monthly.equityCF.forEach(function (v) { c += v; cum.push(c); });

    ensureChart('chartDebt', {
      type: 'line',
      data: {
        labels: mLabels,
        datasets: [
          { label: 'Debt balance', data: res.monthly.debtBalance, borderColor: palette.navy,
            backgroundColor: palette.blueSoft, fill: true, pointRadius: 0, borderWidth: 2, tension: .15 },
          { label: 'Cumulative equity cashflow', data: cum, borderColor: palette.green,
            backgroundColor: palette.greenSoft, fill: false, pointRadius: 0, borderWidth: 2, tension: .15 },
        ],
      },
      options: chartOpts(function (v) { return fmtMoney(v); }),
    });

    var yLabels = res.years.map(function (r) { return 'Year ' + r.year; });
    ensureChart('chartCashflow', {
      type: 'bar',
      data: {
        labels: yLabels,
        datasets: [
          { label: 'Interest', data: res.years.map(function (r) { return r.interest; }), backgroundColor: palette.amber, stack: 's' },
          { label: 'Principal', data: res.years.map(function (r) { return r.principal; }), backgroundColor: palette.navy, stack: 's' },
          { label: 'Tax', data: res.years.map(function (r) { return r.tax; }), backgroundColor: palette.grey, stack: 's' },
          { label: 'Net cash to you', data: res.years.map(function (r) { return r.netCash; }), backgroundColor: palette.green, stack: 's' },
          { label: 'EBITDA', type: 'line', data: res.years.map(function (r) { return r.ebitda; }),
            borderColor: palette.blue, borderWidth: 2, pointRadius: 3, fill: false, tension: .2 },
        ],
      },
      options: chartOpts(function (v) { return fmtMoney(v); }, true),
    });
  }

  function chartOpts(tickFmt, stacked) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { boxWidth: 12, font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: function (ctx) { return ctx.dataset.label + ': ' + fmtMoney(ctx.parsed.y); },
          },
        },
      },
      scales: {
        x: { stacked: !!stacked, grid: { display: false }, ticks: { autoSkip: false, maxRotation: 0, font: { size: 10 } } },
        y: { stacked: !!stacked, ticks: { callback: tickFmt, font: { size: 10 } } },
      },
    };
  }

  /* -------------------------------------------------------------- tables */

  function renderAnnualTable(res) {
    var html = '<thead><tr><th>Year</th><th>Revenue</th><th>EBITDA</th><th>Interest</th>' +
      '<th>Principal</th><th>Tax</th><th>Equity invested</th><th>Net cash to you</th>' +
      '<th>Closing debt</th><th>DSCR</th><th>Debt / EBITDA</th></tr></thead><tbody>';
    var tot = { revenue: 0, ebitda: 0, interest: 0, principal: 0, tax: 0, equityIn: 0, netCash: 0 };
    res.years.forEach(function (r) {
      Object.keys(tot).forEach(function (k) { tot[k] += r[k]; });
      html += '<tr><td>Year ' + r.year + '</td>' +
        '<td>' + fmtMoney(r.revenue) + '</td>' +
        '<td>' + fmtMoney(r.ebitda) + '</td>' +
        '<td>' + fmtMoney(r.interest) + '</td>' +
        '<td>' + fmtMoney(r.principal) + '</td>' +
        '<td>' + fmtMoney(r.tax) + '</td>' +
        '<td>' + (r.equityIn > 0.5 ? fmtMoney(r.equityIn) : '—') + '</td>' +
        '<td class="' + (r.netCash < 0 ? 'neg' : '') + '">' + fmtMoney(r.netCash) + '</td>' +
        '<td>' + fmtMoney(r.closingDebt) + '</td>' +
        '<td class="' + dscrClass(r.dscr) + '">' + fmtX(r.dscr) + '</td>' +
        '<td>' + fmtX(r.debtToEbitda) + '</td></tr>';
    });
    html += '<tr class="total"><td>Total</td>' +
      '<td>' + fmtMoney(tot.revenue) + '</td><td>' + fmtMoney(tot.ebitda) + '</td>' +
      '<td>' + fmtMoney(tot.interest) + '</td><td>' + fmtMoney(tot.principal) + '</td>' +
      '<td>' + fmtMoney(tot.tax) + '</td><td>' + fmtMoney(tot.equityIn) + '</td>' +
      '<td class="' + (tot.netCash < 0 ? 'neg' : '') + '">' + fmtMoney(tot.netCash) + '</td>' +
      '<td></td><td></td><td></td></tr></tbody>';
    $('#annualTable').innerHTML = html;
  }

  function dscrClass(d) {
    if (d === null || d === undefined) return '';
    return d < 1 ? 'neg' : d >= 1.25 ? 'ok' : '';
  }

  function renderDebtTables(res) {
    var html = '<thead><tr><th>Payment</th><th>Month due</th><th>% of price</th>' +
      '<th>Retention factor</th><th>Amount paid</th><th>Debt drawn</th><th>Equity cheque</th></tr></thead><tbody>';
    res.tranches.forEach(function (t) {
      html += '<tr><td>' + t.label + '</td><td>' + t.month + '</td>' +
        '<td>' + t.pctOfPrice + '%</td>' +
        '<td>' + (t.retention < 1 ? (t.retention * 100).toFixed(1) + '%' : '100%') + '</td>' +
        '<td>' + fmtMoney(t.payment) + '</td>' +
        '<td>' + fmtMoney(t.debtDrawn) + '</td>' +
        '<td>' + fmtMoney(t.equity) + '</td></tr>';
    });
    var tp = res.tranches.reduce(function (s, t) { return s + t.payment; }, 0);
    var td = res.tranches.reduce(function (s, t) { return s + t.debtDrawn; }, 0);
    var te = res.tranches.reduce(function (s, t) { return s + t.equity; }, 0);
    html += '<tr class="total"><td>Total</td><td></td><td></td><td></td>' +
      '<td>' + fmtMoney(tp) + '</td><td>' + fmtMoney(td) + '</td><td>' + fmtMoney(te) + '</td></tr></tbody>';
    $('#trancheSummaryTable').innerHTML = html;

    var dHtml = '<thead><tr><th>Year</th><th>Drawdowns</th><th>Interest paid</th>' +
      '<th>Principal repaid</th><th>Closing balance</th></tr></thead><tbody>';
    var mo = res.monthly;
    res.years.forEach(function (r) {
      var a = (r.year - 1) * 12 + 1, b = Math.min(r.year * 12, mo.drawdowns.length - 1);
      var draws = (r.year === 1 ? mo.drawdowns[0] : 0);
      for (var m = a; m <= b; m++) draws += mo.drawdowns[m];
      dHtml += '<tr><td>Year ' + r.year + '</td>' +
        '<td>' + (draws > 0.5 ? fmtMoney(draws) : '—') + '</td>' +
        '<td>' + fmtMoney(r.interest) + '</td>' +
        '<td>' + fmtMoney(r.principal) + '</td>' +
        '<td>' + fmtMoney(r.closingDebt) + '</td></tr>';
    });
    dHtml += '</tbody>';
    $('#debtTable').innerHTML = dHtml;
  }

  /* ----------------------------------------------------------------- exit */

  function renderExit(res) {
    var ex = res.exit;
    var tone = ex.netProceeds < 0 ? 'bad' : 'good';
    $('#exitKpis').innerHTML =
      kpiCard('Gross sale price', fmtMoney(ex.grossPrice),
        fmtX(ex.impliedRevenueMultiple) + ' revenue / ' + fmtX(ex.impliedEbitdaMultiple, 1) + ' EBITDA') +
      kpiCard('Revenue at exit', fmtMoney(ex.revenueAtExit), 'EBITDA ' + fmtMoney(ex.ebitdaAtExit)) +
      kpiCard('Debt repaid at exit', fmtMoney(ex.debtRepaid), 'remaining facility balance') +
      kpiCard('Net proceeds to you', fmtMoney(ex.netProceeds), 'after debt and ' + fmtMoney(ex.saleCosts) + ' costs', tone) +
      kpiCard('Equity IRR', fmtPct(res.equityIrr), 'whole-of-deal, incl. exit') +
      kpiCard('MOIC', fmtX(res.moic), 'on ' + fmtMoney(res.totalEquity) + ' invested');

    if (typeof Chart !== 'undefined') {
      var g = ex.grossPrice, sc = ex.saleCosts, d = ex.debtRepaid, n = ex.netProceeds;
      ensureChart('chartWaterfall', {
        type: 'bar',
        data: {
          labels: ['Gross sale price', 'Sale costs', 'Debt repaid', 'Net proceeds'],
          datasets: [{
            data: [[0, g], [g - sc, g], [g - sc - d, g - sc], [0, n]],
            backgroundColor: [palette.blue, palette.amber, palette.navy, n < 0 ? palette.red : palette.green],
            borderRadius: 4,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  var r = ctx.raw;
                  return fmtMoney(Math.abs(r[1] - r[0]));
                },
              },
            },
          },
          scales: { y: { ticks: { callback: function (v) { return fmtMoney(v); }, font: { size: 10 } } },
                    x: { grid: { display: false } } },
        },
      });
    }

    renderSensitivity();
  }

  function irrColor(irr) {
    if (irr === null || irr === undefined) return '#eef1f5';
    var t = Math.max(0, Math.min(1, (irr - 0) / 0.35)); // 0% -> red, 35%+ -> green
    var r1 = 214, g1 = 92, b1 = 92, r2 = 96, g2 = 190, b2 = 134;
    var r = Math.round(r1 + (r2 - r1) * t), g = Math.round(g1 + (g2 - g1) * t), b = Math.round(b1 + (b2 - b1) * t);
    return 'rgba(' + r + ',' + g + ',' + b + ',.32)';
  }

  function renderSensitivity() {
    var grid = M.exitSensitivity(scenario);
    if (!grid.length) { $('#sensTable').innerHTML = ''; return; }
    var html = '<thead><tr><th>Exit multiple \\ year</th>';
    grid[0].cells.forEach(function (c) {
      html += '<th>' + (c.year >= 1 ? 'Year ' + c.year : '') + '</th>';
    });
    html += '</tr></thead><tbody>';
    grid.forEach(function (row) {
      html += '<tr><td><strong>' + fmtX(row.multiple) + '</strong></td>';
      row.cells.forEach(function (c) {
        if (c.skip) { html += '<td></td>'; return; }
        html += '<td class="' + (c.base ? 'base' : '') + '" style="background:' + irrColor(c.irr) + '">' +
          fmtPct(c.irr) + '<span class="moic">' + fmtX(c.moic) + '</span></td>';
      });
      html += '</tr>';
    });
    html += '</tbody>';
    $('#sensTable').innerHTML = html;
  }

  /* ------------------------------------------------------------------ go */

  document.addEventListener('DOMContentLoaded', function () {
    bindInputs();
    var store = loadStore();
    var id = idFromHash();
    if (!id || !store[id]) id = Object.keys(store)[0] || null;
    openScenario(id);
  });
}());
