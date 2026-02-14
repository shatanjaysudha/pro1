# Advanced Personal Finance System — User Instructions

## 1) Setup (Google Sheets)
1. Create a new Google Sheet.
2. Open `Extensions -> Apps Script`.
3. Paste `personal-finance-system-builder.gs`.
4. Save and run `buildAdvancedPersonalFinanceSystem()`.
5. Grant script permissions once.
6. Optional: run `qualityStressTestFinanceTemplate()` to seed 500 income + 800 expense rows.

## 2) Sheet Structure
1. Dashboard
2. Income Register
3. Expense Register
4. Cash Flow Tracker
5. Savings & Goals
6. Monthly Summaries
7. Category & Trend Charts
8. Net Worth Tracker
9. Forecasts & Alerts
10. Instructions & Branding

## 3) Where to enter data
- Enter income transactions only in: `Income Register` (columns A:F)
- Enter expense transactions only in: `Expense Register` (columns A:F)
- Enter assets/liabilities monthly balances in: `Net Worth Tracker` (columns B:G)

Formula columns are prefilled and protected in warning-only mode.

## 4) How to add a new year
- Do nothing special. Add dated rows in income/expense sheets.
- Year and month fields are generated automatically.
- Dashboard year selector updates based on available year values.

## 5) How to change categories
- Open `Instructions & Branding`.
- Update lists in the master list zone (H:Q).
- Keep budget and tag mapping aligned with expense category names.
- Data validations in transactional sheets auto-resolve from named ranges.

## 6) How to interpret core outputs
- **Savings Rate**: Net Savings / Total Income for selected year.
- **Income Growth vs Last Year**: Year-over-year growth ratio.
- **Expense Growth vs Last Year**: Year-over-year cost growth ratio.
- **Forecasts & Alerts**:
  - Next-month expense and income projections via linear forecast.
  - Alert if any category exceeds 80% budget usage.
  - Alert if savings rate falls below 25%.
  - Alert if negative cash flow months exist.

## 7) Print/Export settings
- Use `File -> Download` for XLSX/PDF export.
- Recommended: print Dashboard and Forecast sheets in landscape mode.
- Keep formula columns locked and hide technical helper ranges before selling.

## 8) Buyer handoff checklist
- Keep brand title row intact.
- Keep named ranges unchanged.
- Keep protection ranges enabled for formula columns.
- Include this instruction file in your digital delivery ZIP.
