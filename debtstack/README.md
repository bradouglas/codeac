# DebtStack — Advice Practice Acquisition & Debt Facility Modeller

A self-contained web app for modelling the acquisition of financial advice
businesses (client books / practices) where the purchase price is paid over a
number of years and funded with debt facilities. Includes a full exit
modelling module.

## Running it

No build step and no internet required — Chart.js is vendored locally.
Open `index.html` directly in a browser, or serve the folder:

```sh
npx http-server debtstack
# or: python3 -m http.server --directory debtstack
```

## What it models

**The deal.** A target with annual recurring revenue (ongoing advice fees),
priced at a multiple of that revenue. The price is paid in tranches — e.g.
60% at completion, 20% at year 1, 20% at year 2 — and deferred tranches can
optionally scale down with revenue retained (the usual clawback protection).

**The funding.** Each tranche is split between an equity cheque and a
drawdown on a debt facility. The facility has an interest rate, a term, an
optional interest-only period and a capitalised establishment fee. Each
drawdown amortises independently (principal & interest, monthly).

**Running the book.** Year-1 net attrition, growth thereafter, an EBITDA
margin on acquired revenue, and tax on EBITDA less interest.

**The exit.** Sell at the end of a chosen year at a multiple of recurring
revenue or EBITDA; the model repays the remaining facility balance, deducts
sale costs and returns the net proceeds to equity.

## Key metrics

- Purchase price, total consideration and effective multiple actually paid
- Equity invested vs peak debt (gearing)
- DSCR (EBITDA / debt service) per year and minimum, debt / EBITDA
- Net cash to the owner each year, payback period
- Whole-of-deal equity IRR and MOIC including exit proceeds
- Exit waterfall (gross price → sale costs → debt → net proceeds)
- IRR/MOIC sensitivity grid across exit year × exit multiple

## Scenarios

Scenarios save automatically to the browser's localStorage, are addressable
at `#/scenarios/<id>`, and can be duplicated, exported and imported as JSON
for sharing.

## Structure

```
index.html           app shell (inputs panel, KPI strip, tabbed outputs)
css/styles.css       styling
js/model.js          pure financial engine (runs in browser and Node)
js/app.js            UI: bindings, charts, tables, scenario persistence
js/vendor-chart.umd.js  Chart.js 4.4.7, vendored
test/model.test.mjs  engine tests:        node test/model.test.mjs
test/ui.smoke.mjs    jsdom UI smoke test: npm i jsdom canvas && node test/ui.smoke.mjs
```

## Simplifications to be aware of

- Tax ignores amortisation of the acquired client book (conservative on cash
  tax) and any CGT on exit.
- Monthly modelling throughout; revenue changes follow smooth annual rates.
- One set of facility terms applies to all drawdowns.

Indicative modelling only — not financial or credit advice.
