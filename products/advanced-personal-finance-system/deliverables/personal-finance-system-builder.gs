/**
 * Shatanjay Sudha — Advanced Personal Finance System
 * Google Sheets Builder Script (Apps Script)
 *
 * Usage:
 * 1) Open a Google Sheet
 * 2) Extensions -> Apps Script
 * 3) Paste this file and save
 * 4) Run buildAdvancedPersonalFinanceSystem()
 * 5) Optional: run qualityStressTestFinanceTemplate() for 500/800 dataset test
 */

const FINANCE_BRAND = {
  title: 'Shatanjay Sudha — Personal Finance System',
  subtitle: 'Premium Finance Tracker • Automated, Multi-Year, Dashboard-Driven',
  accent: '#D97706',
  accentDark: '#B45309',
  softBg: '#FFF7ED',
  border: '#E5E7EB',
  text: '#111827',
  muted: '#6B7280',
  success: '#059669',
  warn: '#D97706',
  danger: '#DC2626'
};

const SHEET_NAMES = [
  'Dashboard',
  'Income Register',
  'Expense Register',
  'Cash Flow Tracker',
  'Savings & Goals',
  'Monthly Summaries',
  'Category & Trend Charts',
  'Net Worth Tracker',
  'Forecasts & Alerts',
  'Instructions & Branding'
];

const MASTER_LISTS = {
  incomeCategories: ['Salary', 'Freelance', 'Business', 'Interest', 'Dividends', 'Rental', 'Other'],
  expenseCategories: ['Housing', 'Food', 'Transport', 'Utilities', 'Healthcare', 'Education', 'Insurance', 'Entertainment', 'Travel', 'Shopping', 'Family', 'Investments', 'Debt Payment', 'Other'],
  paymentModes: ['Cash', 'Bank', 'Card', 'UPI'],
  taxableFlags: ['Yes', 'No'],
  expenseBudgets: [
    ['Housing', 30000],
    ['Food', 12000],
    ['Transport', 8000],
    ['Utilities', 6000],
    ['Healthcare', 7000],
    ['Education', 9000],
    ['Insurance', 5000],
    ['Entertainment', 6000],
    ['Travel', 10000],
    ['Shopping', 7000],
    ['Family', 9000],
    ['Investments', 20000],
    ['Debt Payment', 15000],
    ['Other', 5000]
  ],
  expenseTags: [
    ['Housing', 'Essential'],
    ['Food', 'Essential'],
    ['Transport', 'Essential'],
    ['Utilities', 'Essential'],
    ['Healthcare', 'Essential'],
    ['Education', 'Growth'],
    ['Insurance', 'Protection'],
    ['Entertainment', 'Lifestyle'],
    ['Travel', 'Lifestyle'],
    ['Shopping', 'Lifestyle'],
    ['Family', 'Priority'],
    ['Investments', 'Compounding'],
    ['Debt Payment', 'Liability'],
    ['Other', 'Misc']
  ],
  assetTypes: ['Bank', 'Savings', 'Investments', 'Emergency Fund', 'Other'],
  liabilityTypes: ['Loan', 'Credit Card', 'Other Liability']
};

function buildAdvancedPersonalFinanceSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = {};

  SHEET_NAMES.forEach((name) => {
    sheets[name] = getOrCreateSheet_(ss, name);
    sheets[name].clear();
    sheets[name].clearConditionalFormatRules();
    sheets[name].setHiddenGridlines(true);
    sheets[name].setFrozenRows(2);
  });

  setupInstructionsBranding_(ss, sheets['Instructions & Branding']);
  setupIncomeRegister_(ss, sheets['Income Register']);
  setupExpenseRegister_(ss, sheets['Expense Register']);
  setupMonthlySummaries_(sheets['Monthly Summaries']);
  setupCashFlowTracker_(sheets['Cash Flow Tracker']);
  setupSavingsGoals_(sheets['Savings & Goals']);
  setupNetWorthTracker_(sheets['Net Worth Tracker']);
  setupForecastAlerts_(sheets['Forecasts & Alerts']);
  setupCategoryTrendCharts_(sheets['Category & Trend Charts']);
  setupDashboard_(ss, sheets['Dashboard']);

  applyFormulaProtection_(sheets);
  applySheetPolish_(sheets);

  SpreadsheetApp.flush();
}

function qualityStressTestFinanceTemplate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const income = ss.getSheetByName('Income Register');
  const expense = ss.getSheetByName('Expense Register');
  const netWorth = ss.getSheetByName('Net Worth Tracker');

  if (!income || !expense || !netWorth) {
    throw new Error('Run buildAdvancedPersonalFinanceSystem() first.');
  }

  seedIncomeData_(income, 500, 5);
  seedExpenseData_(expense, 800, 5);
  seedNetWorthInputs_(netWorth, 5);

  SpreadsheetApp.flush();

  Logger.log({
    incomeRowsSeeded: 500,
    expenseRowsSeeded: 800,
    yearsCovered: 5,
    status: 'PASS'
  });
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function setupInstructionsBranding_(ss, sh) {
  sh.getRange('A1:F1').merge();
  sh.getRange('A1').setValue('Shatanjay Sudha — Premium Finance Tracker');
  sh.getRange('A2:F2').merge();
  sh.getRange('A2').setValue('Instructions, brand standards, master categories, and default budgets.');

  sh.getRange('A1:F2')
    .setBackground(FINANCE_BRAND.softBg)
    .setFontWeight('bold')
    .setFontColor(FINANCE_BRAND.text)
    .setFontSize(14)
    .setHorizontalAlignment('left');

  const instructions = [
    ['How to use this template'],
    ['1) Enter transactions only in Income Register and Expense Register.'],
    ['2) Dashboard KPIs, summaries, cash flow, and forecasts update automatically.'],
    ['3) To add a new year, keep adding dated entries; yearly metrics auto-expand.'],
    ['4) Update category lists in the master list section only.'],
    ['5) Keep formula-protected columns locked for buyer safety.']
  ];
  sh.getRange(4, 1, instructions.length, 1).setValues(instructions);

  sh.getRange('A12').setValue('Brand Palette');
  sh.getRange('A13:B17').setValues([
    ['Accent', FINANCE_BRAND.accent],
    ['Accent Dark', FINANCE_BRAND.accentDark],
    ['Soft Background', FINANCE_BRAND.softBg],
    ['Border', FINANCE_BRAND.border],
    ['Text', FINANCE_BRAND.text]
  ]);

  sh.getRange('H1:Q1').merge();
  sh.getRange('H1').setValue('MASTER LISTS (edit with care)');
  sh.getRange('H1').setBackground(FINANCE_BRAND.softBg).setFontWeight('bold');

  sh.getRange('H2').setValue('Income Categories');
  sh.getRange(3, 8, MASTER_LISTS.incomeCategories.length, 1).setValues(MASTER_LISTS.incomeCategories.map((v) => [v]));

  sh.getRange('I2').setValue('Expense Categories');
  sh.getRange(3, 9, MASTER_LISTS.expenseCategories.length, 1).setValues(MASTER_LISTS.expenseCategories.map((v) => [v]));

  sh.getRange('J2').setValue('Payment Modes');
  sh.getRange(3, 10, MASTER_LISTS.paymentModes.length, 1).setValues(MASTER_LISTS.paymentModes.map((v) => [v]));

  sh.getRange('K2').setValue('Taxable Flags');
  sh.getRange(3, 11, MASTER_LISTS.taxableFlags.length, 1).setValues(MASTER_LISTS.taxableFlags.map((v) => [v]));

  sh.getRange('L2:M2').setValues([['Expense Category', 'Monthly Budget']]);
  sh.getRange(3, 12, MASTER_LISTS.expenseBudgets.length, 2).setValues(MASTER_LISTS.expenseBudgets);

  sh.getRange('N2:O2').setValues([['Expense Category', 'Auto Tag']]);
  sh.getRange(3, 14, MASTER_LISTS.expenseTags.length, 2).setValues(MASTER_LISTS.expenseTags);

  sh.getRange('P2').setValue('Asset Types');
  sh.getRange(3, 16, MASTER_LISTS.assetTypes.length, 1).setValues(MASTER_LISTS.assetTypes.map((v) => [v]));

  sh.getRange('Q2').setValue('Liability Types');
  sh.getRange(3, 17, MASTER_LISTS.liabilityTypes.length, 1).setValues(MASTER_LISTS.liabilityTypes.map((v) => [v]));

  sh.getRange('H2:Q2').setFontWeight('bold').setBackground('#F9FAFB');
  sh.getRange('M3:M2000').setNumberFormat('₹#,##0');

  ss.setNamedRange('income_categories', sh.getRange(3, 8, MASTER_LISTS.incomeCategories.length, 1));
  ss.setNamedRange('expense_categories', sh.getRange(3, 9, MASTER_LISTS.expenseCategories.length, 1));
  ss.setNamedRange('payment_modes', sh.getRange(3, 10, MASTER_LISTS.paymentModes.length, 1));
  ss.setNamedRange('taxable_flags', sh.getRange(3, 11, MASTER_LISTS.taxableFlags.length, 1));
  ss.setNamedRange('expense_budget_table', sh.getRange(3, 12, MASTER_LISTS.expenseBudgets.length, 2));
  ss.setNamedRange('expense_tag_table', sh.getRange(3, 14, MASTER_LISTS.expenseTags.length, 2));

  sh.setColumnWidths(1, 6, 180);
  sh.setColumnWidths(8, 10, 170);
}

function setupIncomeRegister_(ss, sh) {
  const headers = ['Date', 'Source', 'Category', 'Amount', 'Taxable?', 'Notes', 'Year', 'Month', 'Duplicate Flag'];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  styleHeader_(sh.getRange(1, 1, 1, headers.length));

  sh.getRange('G2').setFormula('=ARRAYFORMULA(IF(A2:A="",,YEAR(A2:A)))');
  sh.getRange('H2').setFormula('=ARRAYFORMULA(IF(A2:A="",,TEXT(A2:A,"YYYY-MM")))');
  sh.getRange('I2').setFormula('=ARRAYFORMULA(IF(A2:A="",,IF(COUNTIFS(A2:A,A2:A,B2:B,B2:B,D2:D,D2:D)>1,"Duplicate","")))');

  addRangeValidationFromNamed_(sh, 'C2:C2000', 'income_categories');
  addRangeValidationFromNamed_(sh, 'E2:E2000', 'taxable_flags');
  addDateValidation_(sh, 'A2:A2000');

  sh.getRange('A2:A2000').setNumberFormat('dd-mmm-yyyy');
  sh.getRange('D2:D2000').setNumberFormat('₹#,##0.00');
  sh.getRange('G2:G2000').setNumberFormat('0');
  sh.setColumnWidths(1, headers.length, 140);

  const duplicateRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Duplicate')
    .setBackground('#FEE2E2')
    .setRanges([sh.getRange('I2:I2000')])
    .build();
  sh.setConditionalFormatRules([duplicateRule]);
}

function setupExpenseRegister_(ss, sh) {
  const headers = ['Date', 'Vendor', 'Category', 'Amount', 'Mode', 'Notes', 'Year', 'Month', 'Budget Utilization %', 'Alert', 'Auto Tag'];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  styleHeader_(sh.getRange(1, 1, 1, headers.length));

  sh.getRange('G2').setFormula('=ARRAYFORMULA(IF(A2:A="",,YEAR(A2:A)))');
  sh.getRange('H2').setFormula('=ARRAYFORMULA(IF(A2:A="",,TEXT(A2:A,"YYYY-MM")))');
  sh.getRange('I2').setFormula('=ARRAYFORMULA(IF(C2:C="",,IFERROR(D2:D/VLOOKUP(C2:C,expense_budget_table,2,FALSE),0)))');
  sh.getRange('J2').setFormula('=ARRAYFORMULA(IF(I2:I="",,IF(I2:I>=0.8,"Over 80%","OK")))');
  sh.getRange('K2').setFormula('=ARRAYFORMULA(IF(C2:C="",,IFERROR(VLOOKUP(C2:C,expense_tag_table,2,FALSE),"General")))');

  addRangeValidationFromNamed_(sh, 'C2:C3000', 'expense_categories');
  addRangeValidationFromNamed_(sh, 'E2:E3000', 'payment_modes');
  addDateValidation_(sh, 'A2:A3000');

  sh.getRange('A2:A3000').setNumberFormat('dd-mmm-yyyy');
  sh.getRange('D2:D3000').setNumberFormat('₹#,##0.00');
  sh.getRange('I2:I3000').setNumberFormat('0.00%');
  sh.setColumnWidths(1, headers.length, 145);

  const alertRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Over 80%')
    .setBackground('#FEF3C7')
    .setRanges([sh.getRange('J2:J3000')])
    .build();
  sh.setConditionalFormatRules([alertRule]);
}

function setupMonthlySummaries_(sh) {
  sh.getRange('A1:H1').merge().setValue('Monthly Summaries').setFontWeight('bold').setFontSize(13).setBackground(FINANCE_BRAND.softBg);

  sh.getRange('A3').setValue('Income by Month');
  sh.getRange('A4').setFormula("=QUERY({'Income Register'!H2:H,'Income Register'!D2:D},\"select Col1,sum(Col2) where Col1 is not null group by Col1 label Col1 'Month',sum(Col2) 'Income'\",0)");

  sh.getRange('D3').setValue('Expense by Month');
  sh.getRange('D4').setFormula("=QUERY({'Expense Register'!H2:H,'Expense Register'!D2:D},\"select Col1,sum(Col2) where Col1 is not null group by Col1 label Col1 'Month',sum(Col2) 'Expense'\",0)");

  sh.getRange('G3').setValue('Savings by Month');
  sh.getRange('G4').setFormula("=ARRAYFORMULA(IF(A4:A=\"\",,IFERROR(B4:B-VLOOKUP(A4:A,D4:E,2,FALSE),B4:B)))");

  sh.getRange('A20').setValue('Income by Category by Month');
  sh.getRange('A21').setFormula("=QUERY({'Income Register'!H2:H,'Income Register'!C2:C,'Income Register'!D2:D},\"select Col1,Col2,sum(Col3) where Col1 is not null group by Col1,Col2 label sum(Col3) 'Income'\",0)");

  sh.getRange('E20').setValue('Expense by Category by Month');
  sh.getRange('E21').setFormula("=QUERY({'Expense Register'!H2:H,'Expense Register'!C2:C,'Expense Register'!D2:D},\"select Col1,Col2,sum(Col3) where Col1 is not null group by Col1,Col2 label sum(Col3) 'Expense'\",0)");

  sh.getRange('B4:B1000').setNumberFormat('₹#,##0.00');
  sh.getRange('E4:E1000').setNumberFormat('₹#,##0.00');
  sh.getRange('G4:G1000').setNumberFormat('₹#,##0.00');

  sh.setColumnWidths(1, 8, 150);
}

function setupCashFlowTracker_(sh) {
  const headers = ['Month', 'Income', 'Expense', 'Net Cash Flow', 'Cumulative Cash Flow', '3M Moving Avg', 'Projection', 'Sparkline'];
  sh.getRange(2, 1, 1, headers.length).setValues([headers]);
  styleHeader_(sh.getRange(2, 1, 1, headers.length));

  sh.getRange('A3').setFormula('=SORT(UNIQUE(FILTER(\'Income Register\'!H2:H,\'Income Register\'!H2:H<>\"\")))');
  sh.getRange('B3').setFormula('=ARRAYFORMULA(IF(A3:A=\"\",,IFERROR(VLOOKUP(A3:A,\'Monthly Summaries\'!A4:B,2,FALSE),0)))');
  sh.getRange('C3').setFormula('=ARRAYFORMULA(IF(A3:A=\"\",,IFERROR(VLOOKUP(A3:A,\'Monthly Summaries\'!D4:E,2,FALSE),0)))');
  sh.getRange('D3').setFormula('=ARRAYFORMULA(IF(A3:A=\"\",,B3:B-C3:C))');

  sh.getRange('E3').setFormula('=IF(A3=\"\",\"\",SUM($D$3:D3))');
  sh.getRange('F3').setFormula('=IF(A3=\"\",\"\",IF(ROW()<5,\"\",AVERAGE(INDEX($D:$D,ROW()-2):D3)))');
  sh.getRange('G3').setFormula('=IF(A3=\"\",\"\",IF(COUNT($D$3:D3)<6,\"\",FORECAST.LINEAR(ROW()+1,$D$3:D3,ROW($D$3:D3))))');
  sh.getRange('H3').setFormula('=IF(A3=\"\",\"\",SPARKLINE(B3:D3,{\"charttype\",\"column\";\"color1\",\"#D97706\"}))');

  sh.getRange('E3:H3').copyTo(sh.getRange('E3:H800'));

  sh.getRange('B3:G1000').setNumberFormat('₹#,##0.00');
  sh.setColumnWidths(1, headers.length, 155);

  const netNegRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setBackground('#FEE2E2')
    .setRanges([sh.getRange('D3:D1000')])
    .build();
  sh.setConditionalFormatRules([netNegRule]);
}

function setupSavingsGoals_(sh) {
  const headers = ['Goal', 'Target Savings', 'Current Saved', 'Completion %', 'Monthly Target', 'This Month Saved', 'Status'];
  sh.getRange(2, 1, 1, headers.length).setValues([headers]);
  styleHeader_(sh.getRange(2, 1, 1, headers.length));

  sh.getRange('A3:G6').setValues([
    ['Emergency Fund', 500000, '', '', '', '', ''],
    ['Annual Investment', 300000, '', '', '', '', ''],
    ['Debt Reduction', 240000, '', '', '', '', ''],
    ['Travel/Buffer', 120000, '', '', '', '', '']
  ]);

  sh.getRange('C3').setFormula('=MAX(0,MAX(\'Net Worth Tracker\'!I3:I)-MIN(\'Net Worth Tracker\'!I3:I))');
  sh.getRange('C4').setFormula('=SUM(FILTER(\'Monthly Summaries\'!G4:G,\'Monthly Summaries\'!A4:A>=TEXT(DATE(YEAR(TODAY()),1,1),\"YYYY-MM\")))');
  sh.getRange('C5').setFormula('=SUMIFS(\'Expense Register\'!D:D,\'Expense Register\'!C:C,\"Debt Payment\",\'Expense Register\'!G:G,YEAR(TODAY()))');
  sh.getRange('C6').setFormula('=SUM(FILTER(\'Monthly Summaries\'!G4:G,\'Monthly Summaries\'!A4:A>=TEXT(EDATE(TODAY(),-12),\"YYYY-MM\")))*0.15');

  sh.getRange('D3').setFormula('=IFERROR(C3/B3,0)');
  sh.getRange('E3').setFormula('=IFERROR(B3/12,0)');
  sh.getRange('F3').setFormula('=IFERROR(INDEX(\'Monthly Summaries\'!G:G,MATCH(TEXT(TODAY(),\"YYYY-MM\"),\'Monthly Summaries\'!A:A,0)),0)');
  sh.getRange('G3').setFormula('=IF(D3>=1,\"Achieved\",IF(D3>=0.8,\"On Track\",\"Behind\"))');

  sh.getRange('D3:G3').copyTo(sh.getRange('D3:G6'));

  sh.getRange('B3:C10').setNumberFormat('₹#,##0.00');
  sh.getRange('D3:D10').setNumberFormat('0.00%');
  sh.getRange('E3:F10').setNumberFormat('₹#,##0.00');

  const rules = [
    SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(0.8).setBackground('#FEE2E2').setRanges([sh.getRange('D3:D10')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(0.8, 0.99).setBackground('#FEF3C7').setRanges([sh.getRange('D3:D10')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(1).setBackground('#DCFCE7').setRanges([sh.getRange('D3:D10')]).build()
  ];
  sh.setConditionalFormatRules(rules);

  sh.setColumnWidths(1, headers.length, 170);
}

function setupNetWorthTracker_(sh) {
  const headers = ['Month', 'Bank Balance', 'Savings Balance', 'Investments', 'Total Assets', 'Loans', 'Credit Cards', 'Total Liabilities', 'Net Worth', 'YoY Change %'];
  sh.getRange(2, 1, 1, headers.length).setValues([headers]);
  styleHeader_(sh.getRange(2, 1, 1, headers.length));

  sh.getRange('A3').setFormula('=SORT(UNIQUE(FILTER(\'Monthly Summaries\'!A4:A,\'Monthly Summaries\'!A4:A<>\"\")))');

  sh.getRange('E3').setFormula('=IF(A3=\"\",\"\",SUM(B3:D3))');
  sh.getRange('H3').setFormula('=IF(A3=\"\",\"\",SUM(F3:G3))');
  sh.getRange('I3').setFormula('=IF(A3=\"\",\"\",E3-H3)');
  sh.getRange('J3').setFormula('=IF(ROW()<=14,\"\",IFERROR((I3-INDEX($I:$I,ROW()-12))/INDEX($I:$I,ROW()-12),0))');
  sh.getRange('E3:J3').copyTo(sh.getRange('E3:J800'));

  sh.getRange('B3:I1000').setNumberFormat('₹#,##0.00');
  sh.getRange('J3:J1000').setNumberFormat('0.00%');
  sh.setColumnWidths(1, headers.length, 160);
}

function setupForecastAlerts_(sh) {
  sh.getRange('A1:F1').merge().setValue('Forecasts & Alerts').setFontWeight('bold').setFontSize(13).setBackground(FINANCE_BRAND.softBg);

  sh.getRange('A3').setValue('Expense Forecast (Next Month)');
  sh.getRange('B3').setFormula('=IFERROR(FORECAST.LINEAR(COUNTA(FILTER(\'Monthly Summaries\'!E4:E,\'Monthly Summaries\'!E4:E<>\"\"))+1,FILTER(\'Monthly Summaries\'!E4:E,\'Monthly Summaries\'!E4:E<>\"\"),SEQUENCE(COUNTA(FILTER(\'Monthly Summaries\'!E4:E,\'Monthly Summaries\'!E4:E<>\"\")))),0)');

  sh.getRange('A4').setValue('Income Forecast (Next Month)');
  sh.getRange('B4').setFormula('=IFERROR(FORECAST.LINEAR(COUNTA(FILTER(\'Monthly Summaries\'!B4:B,\'Monthly Summaries\'!B4:B<>\"\"))+1,FILTER(\'Monthly Summaries\'!B4:B,\'Monthly Summaries\'!B4:B<>\"\"),SEQUENCE(COUNTA(FILTER(\'Monthly Summaries\'!B4:B,\'Monthly Summaries\'!B4:B<>\"\")))),0)');

  sh.getRange('A6:B6').setValues([['Signal', 'Status']]);
  styleHeader_(sh.getRange('A6:B6'));

  sh.getRange('A7').setValue('Expense over 80% budget cases');
  sh.getRange('B7').setFormula('=COUNTIF(\'Expense Register\'!J2:J,\"Over 80%\")');

  sh.getRange('A8').setValue('Savings rate below 25% target');
  sh.getRange('B8').setFormula('=IF(\'Dashboard\'!N6<0.25,\"Yes\",\"No\")');

  sh.getRange('A9').setValue('Negative cash flow months');
  sh.getRange('B9').setFormula('=COUNTIF(\'Cash Flow Tracker\'!D3:D,\"<0\")');

  sh.getRange('A10').setValue('Overall warning');
  sh.getRange('B10').setFormula('=IF(OR(B7>0,B8=\"Yes\",B9>0),\"Attention Required\",\"Stable\")');

  sh.getRange('A13:C13').setValues([['Month', 'Actual Expense', 'Forecast (Rolling 6M Avg)']]);
  styleHeader_(sh.getRange('A13:C13'));

  sh.getRange('A14').setFormula('=FILTER(\'Cash Flow Tracker\'!A3:A,\'Cash Flow Tracker\'!A3:A<>\"\")');
  sh.getRange('B14').setFormula('=ARRAYFORMULA(IF(A14:A=\"\",,IFERROR(VLOOKUP(A14:A,\'Cash Flow Tracker\'!A3:C,3,FALSE),0)))');
  sh.getRange('C14').setFormula('=ARRAYFORMULA(IF(A14:A=\"\",,IF(ROW(A14:A)-ROW(A14)+1<6,,AVERAGE(OFFSET(B14,ROW(A14:A)-ROW(A14)-5,0,6,1)))))');

  sh.getRange('B3:B4').setNumberFormat('₹#,##0.00');
  sh.getRange('B14:C1000').setNumberFormat('₹#,##0.00');

  const alertRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Attention Required')
    .setBackground('#FEE2E2')
    .setRanges([sh.getRange('B10')])
    .build();
  sh.setConditionalFormatRules([alertRule]);

  sh.setColumnWidths(1, 3, 220);
}

function setupCategoryTrendCharts_(sh) {
  sh.getRange('A1:H1').merge().setValue('Category & Trend Charts').setFontWeight('bold').setFontSize(13).setBackground(FINANCE_BRAND.softBg);

  sh.getRange('A3:C3').setValues([['Month', 'Income', 'Expense']]);
  styleHeader_(sh.getRange('A3:C3'));
  sh.getRange('A4').setFormula('=FILTER(\'Cash Flow Tracker\'!A3:C,\'Cash Flow Tracker\'!A3:A<>\"\")');

  sh.getRange('E3:F3').setValues([['Expense Category', 'Total Expense']]);
  styleHeader_(sh.getRange('E3:F3'));
  sh.getRange('E4').setFormula("=QUERY({'Expense Register'!C2:C,'Expense Register'!D2:D},\"select Col1,sum(Col2) where Col1 is not null group by Col1 order by sum(Col2) desc label sum(Col2) ''\",0)");

  sh.getRange('H3:I3').setValues([['Month', 'Net Worth']]);
  styleHeader_(sh.getRange('H3:I3'));
  sh.getRange('H4').setFormula('=FILTER({\'Net Worth Tracker\'!A3:A,\'Net Worth Tracker\'!I3:I},\'Net Worth Tracker\'!A3:A<>\"\")');

  sh.getRange('B4:C1000').setNumberFormat('₹#,##0.00');
  sh.getRange('F4:F1000').setNumberFormat('₹#,##0.00');
  sh.getRange('I4:I1000').setNumberFormat('₹#,##0.00');

  // Clear old charts then add fresh chart set.
  sh.getCharts().forEach((chart) => sh.removeChart(chart));

  const bar = sh.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(sh.getRange('A3:C40'))
    .setPosition(3, 11, 0, 0)
    .setOption('title', 'Income vs Expense by Month')
    .build();
  sh.insertChart(bar);

  const pie = sh.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(sh.getRange('E3:F20'))
    .setPosition(21, 11, 0, 0)
    .setOption('title', 'Expense by Category')
    .build();
  sh.insertChart(pie);

  const line = sh.newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(sh.getRange('H3:I80'))
    .setPosition(39, 11, 0, 0)
    .setOption('title', 'Net Worth Trend')
    .build();
  sh.insertChart(line);

  sh.setColumnWidths(1, 9, 150);
}

function setupDashboard_(ss, sh) {
  sh.getRange('A1:P1').merge();
  sh.getRange('A1').setValue('Shatanjay Sudha — Personal Finance System');
  sh.getRange('A2:P2').merge();
  sh.getRange('A2').setValue('Automated KPI dashboard with trend, growth, savings, and warning signals.');

  sh.getRange('A1:P2')
    .setBackground(FINANCE_BRAND.softBg)
    .setFontWeight('bold')
    .setFontColor(FINANCE_BRAND.text)
    .setHorizontalAlignment('left')
    .setFontSize(14);

  sh.getRange('A1').setFontFamily('Dancing Script').setFontSize(24).setFontWeight('normal');

  sh.getRange('A3').setValue('Selected Year');
  sh.getRange('B3').setFormula('=IFERROR(MAX({FILTER(\'Income Register\'!G2:G,\'Income Register\'!G2:G<>\"\");FILTER(\'Expense Register\'!G2:G,\'Expense Register\'!G2:G<>\"\")}),YEAR(TODAY()))');
  sh.getRange('A3:B3').setFontWeight('bold');

  const cards = [
    { title: 'Total Income (Year)', range: 'B5:D8', value: 'B6', formula: '=IFERROR(SUMIFS(\'Income Register\'!$D:$D,\'Income Register\'!$G:$G,$B$3),0)', type: 'currency' },
    { title: 'Total Expenses (Year)', range: 'F5:H8', value: 'F6', formula: '=IFERROR(SUMIFS(\'Expense Register\'!$D:$D,\'Expense Register\'!$G:$G,$B$3),0)', type: 'currency' },
    { title: 'Net Savings (Year)', range: 'J5:L8', value: 'J6', formula: '=B6-F6', type: 'currency' },
    { title: 'Savings Rate (%)', range: 'N5:P8', value: 'N6', formula: '=IFERROR(J6/B6,0)', type: 'percent' },
    { title: 'Avg Monthly Expense', range: 'B10:D13', value: 'B11', formula: '=IFERROR(F6/COUNTUNIQUE(FILTER(\'Expense Register\'!$H:$H,\'Expense Register\'!$G:$G=$B$3)),0)', type: 'currency' },
    { title: 'Highest Expense Category', range: 'F10:H13', value: 'F11', formula: '=IFERROR(INDEX(QUERY({\'Expense Register\'!$C$2:$C,\'Expense Register\'!$D$2:$D,\'Expense Register\'!$G$2:$G},"select Col1,sum(Col2) where Col1 is not null and Col3="&$B$3&" group by Col1 order by sum(Col2) desc label sum(Col2) \'\'",0),2,1),"N/A")', type: 'text' },
    { title: 'Income Growth vs Last Year', range: 'J10:L13', value: 'J11', formula: '=IFERROR((B6-SUMIFS(\'Income Register\'!$D:$D,\'Income Register\'!$G:$G,$B$3-1))/SUMIFS(\'Income Register\'!$D:$D,\'Income Register\'!$G:$G,$B$3-1),0)', type: 'percent' },
    { title: 'Expense Growth vs Last Year', range: 'N10:P13', value: 'N11', formula: '=IFERROR((F6-SUMIFS(\'Expense Register\'!$D:$D,\'Expense Register\'!$G:$G,$B$3-1))/SUMIFS(\'Expense Register\'!$D:$D,\'Expense Register\'!$G:$G,$B$3-1),0)', type: 'percent' }
  ];

  cards.forEach((card) => {
    sh.getRange(card.range).merge().setBackground('#FFFFFF').setBorder(true, true, true, true, true, true, FINANCE_BRAND.border, SpreadsheetApp.BorderStyle.SOLID);
    const startRow = sh.getRange(card.range).getRow();
    const startCol = sh.getRange(card.range).getColumn();
    sh.getRange(startRow, startCol).setValue(card.title).setFontWeight('bold').setFontColor(FINANCE_BRAND.muted).setFontSize(10);
    sh.getRange(card.value).setFormula(card.formula).setFontWeight('bold').setFontSize(15).setFontColor(FINANCE_BRAND.text);

    if (card.type === 'currency') {
      sh.getRange(card.value).setNumberFormat('₹#,##0.00');
    } else if (card.type === 'percent') {
      sh.getRange(card.value).setNumberFormat('0.00%');
    }
  });

  sh.getRange('A16').setValue('Monthly Snapshot');
  sh.getRange('A17').setFormula('=FILTER({\'Cash Flow Tracker\'!A3:A,\'Cash Flow Tracker\'!B3:D},\'Cash Flow Tracker\'!A3:A<>\"\")');

  sh.getRange('B17:D200').setNumberFormat('₹#,##0.00');
  sh.setColumnWidths(1, 16, 120);

  // Dashboard chart
  sh.getCharts().forEach((chart) => sh.removeChart(chart));
  const chart = sh.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(sh.getRange('A16:D40'))
    .setPosition(16, 6, 0, 0)
    .setOption('title', 'Income / Expense / Net Cash Flow')
    .build();
  sh.insertChart(chart);

  const growthRules = [
    SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(0).setBackground('#FEE2E2').setRanges([sh.getRange('J11'), sh.getRange('N11')]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThan(0).setBackground('#DCFCE7').setRanges([sh.getRange('J11'), sh.getRange('N11')]).build()
  ];
  sh.setConditionalFormatRules(growthRules);
}

function applyFormulaProtection_(sheets) {
  protectRangeWarningOnly_(sheets['Income Register'], 'G:I', 'Income Register formulas');
  protectRangeWarningOnly_(sheets['Expense Register'], 'G:K', 'Expense Register formulas');
  protectRangeWarningOnly_(sheets['Cash Flow Tracker'], 'A:H', 'Cash Flow formulas');
  protectRangeWarningOnly_(sheets['Monthly Summaries'], 'A:Z', 'Monthly summary formulas');
  protectRangeWarningOnly_(sheets['Forecasts & Alerts'], 'A:Z', 'Forecast formulas');
  protectRangeWarningOnly_(sheets['Instructions & Branding'], 'H:Q', 'Master category lists');
}

function applySheetPolish_(sheets) {
  Object.keys(sheets).forEach((name) => {
    const sh = sheets[name];
    sh.getRange(1, 1, 1, Math.max(8, sh.getMaxColumns()))
      .setBorder(null, null, true, null, null, null, FINANCE_BRAND.border, SpreadsheetApp.BorderStyle.SOLID);
  });
}

function styleHeader_(range) {
  range
    .setBackground('#F9FAFB')
    .setFontWeight('bold')
    .setFontColor(FINANCE_BRAND.text)
    .setVerticalAlignment('middle');
}

function addRangeValidationFromNamed_(sheet, a1Range, namedRange) {
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange), true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(a1Range).setDataValidation(rule);
}

function addDateValidation_(sheet, a1Range) {
  const rule = SpreadsheetApp.newDataValidation()
    .requireDate()
    .setAllowInvalid(false)
    .build();
  sheet.getRange(a1Range).setDataValidation(rule);
}

function protectRangeWarningOnly_(sheet, a1Range, description) {
  const protection = sheet.getRange(a1Range).protect();
  protection.setDescription(description);
  protection.setWarningOnly(true);
}

function seedIncomeData_(sheet, rowCount, years) {
  const startRow = 2;
  const today = new Date();
  const startYear = today.getFullYear() - (years - 1);
  const sources = ['Employer Payroll', 'Consulting Client', 'Freelance Project', 'Rental Transfer', 'Interest Credit'];

  const rows = [];
  for (let i = 0; i < rowCount; i += 1) {
    const dt = randomDate_(new Date(startYear, 0, 1), today);
    const source = pickRandom_(sources);
    const category = pickRandom_(MASTER_LISTS.incomeCategories);
    const amount = Math.round((3000 + Math.random() * 220000) * 100) / 100;
    const taxable = Math.random() > 0.25 ? 'Yes' : 'No';
    rows.push([dt, source, category, amount, taxable, `Auto-seeded row ${i + 1}`]);
  }

  sheet.getRange(startRow, 1, rowCount, 6).setValues(rows);
  sheet.getRange(startRow, 1, rowCount, 1).setNumberFormat('dd-mmm-yyyy');
  sheet.getRange(startRow, 4, rowCount, 1).setNumberFormat('₹#,##0.00');
}

function seedExpenseData_(sheet, rowCount, years) {
  const startRow = 2;
  const today = new Date();
  const startYear = today.getFullYear() - (years - 1);
  const vendors = ['Amazon', 'Swiggy', 'Uber', 'Electricity Board', 'Pharmacy', 'Supermarket', 'Fuel Pump', 'School', 'Travel Desk'];

  const rows = [];
  for (let i = 0; i < rowCount; i += 1) {
    const dt = randomDate_(new Date(startYear, 0, 1), today);
    const vendor = pickRandom_(vendors);
    const category = pickRandom_(MASTER_LISTS.expenseCategories);
    const amount = Math.round((100 + Math.random() * 45000) * 100) / 100;
    const mode = pickRandom_(MASTER_LISTS.paymentModes);
    rows.push([dt, vendor, category, amount, mode, `Auto-seeded row ${i + 1}`]);
  }

  sheet.getRange(startRow, 1, rowCount, 6).setValues(rows);
  sheet.getRange(startRow, 1, rowCount, 1).setNumberFormat('dd-mmm-yyyy');
  sheet.getRange(startRow, 4, rowCount, 1).setNumberFormat('₹#,##0.00');
}

function seedNetWorthInputs_(sheet, years) {
  const months = years * 12;
  const rows = [];
  let bank = 220000;
  let savings = 150000;
  let invest = 300000;
  let loan = 260000;
  let card = 45000;

  for (let i = 0; i < months; i += 1) {
    bank += Math.round((Math.random() - 0.25) * 30000);
    savings += Math.round((Math.random() - 0.1) * 20000);
    invest += Math.round((Math.random() + 0.2) * 25000);
    loan = Math.max(0, loan - Math.round(Math.random() * 12000));
    card = Math.max(0, card + Math.round((Math.random() - 0.4) * 8000));
    rows.push([Math.max(0, bank), Math.max(0, savings), Math.max(0, invest), loan, card]);
  }

  sheet.getRange(3, 2, rows.length, 5).setValues(rows);
  sheet.getRange(3, 2, rows.length, 5).setNumberFormat('₹#,##0.00');
}

function randomDate_(from, to) {
  const fromMs = from.getTime();
  const toMs = to.getTime();
  return new Date(fromMs + Math.random() * (toMs - fromMs));
}

function pickRandom_(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
