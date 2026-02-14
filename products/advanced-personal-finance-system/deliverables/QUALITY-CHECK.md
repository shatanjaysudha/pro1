# Quality Check Protocol — Advanced Personal Finance System

## Required Stress Test
Run this Apps Script function:
```js
qualityStressTestFinanceTemplate()
```

This seeds:
- 500 income rows
- 800 expense rows
- 5-year timeline
- Net worth movement rows

## Validation Checklist
- [ ] Dashboard KPIs update without manual edits
- [ ] Year selector updates and switches metrics correctly
- [ ] Income and Expense year/month columns auto-fill
- [ ] Duplicate flag logic marks repeated entries
- [ ] Expense budget utilization and alerts populate
- [ ] Monthly summaries refresh correctly
- [ ] Cash flow cumulative and projections calculate
- [ ] Savings goals status reflects completion ratios
- [ ] Net worth calculations remain stable across years
- [ ] Forecast signals produce warning status correctly

## Performance Checks
- [ ] No formula errors (`#N/A`, `#REF!`, `#VALUE!`) on core sheets
- [ ] Dashboard remains responsive after stress dataset load
- [ ] Charts still render with seeded data

## Accuracy Checks
- [ ] Verify 3 random months manually:
  - Income total from register equals summary value
  - Expense total from register equals summary value
  - Net cash flow equals Income - Expense
- [ ] Verify 3 categories for budget utilization ratio:
  - `Amount / Budget` matches expected percentage

## Export Readiness
- [ ] Formula columns protected (warning-only)
- [ ] Named ranges intact
- [ ] Instructions sheet included
- [ ] Branding header present on Dashboard
- [ ] File clean for buyer delivery (no temporary notes)
