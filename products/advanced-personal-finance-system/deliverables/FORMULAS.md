# Formula Documentation — Advanced Personal Finance System

## Dashboard KPIs
- Total Income (Year)
```gs
=IFERROR(SUMIFS('Income Register'!$D:$D,'Income Register'!$G:$G,$B$3),0)
```
- Total Expenses (Year)
```gs
=IFERROR(SUMIFS('Expense Register'!$D:$D,'Expense Register'!$G:$G,$B$3),0)
```
- Net Savings (Year)
```gs
=B6-F6
```
- Savings Rate
```gs
=IFERROR(J6/B6,0)
```
- Average Monthly Expense
```gs
=IFERROR(F6/COUNTUNIQUE(FILTER('Expense Register'!$H:$H,'Expense Register'!$G:$G=$B$3)),0)
```
- Highest Expense Category
```gs
=IFERROR(INDEX(QUERY({'Expense Register'!$C$2:$C,'Expense Register'!$D$2:$D,'Expense Register'!$G$2:$G},"select Col1,sum(Col2) where Col1 is not null and Col3="&$B$3&" group by Col1 order by sum(Col2) desc label sum(Col2) ''",0),2,1),"N/A")
```

## Income Register Automation
- Year extraction
```gs
=ARRAYFORMULA(IF(A2:A="",,YEAR(A2:A)))
```
- Month extraction
```gs
=ARRAYFORMULA(IF(A2:A="",,TEXT(A2:A,"YYYY-MM")))
```
- Duplicate detection (Date + Source + Amount)
```gs
=ARRAYFORMULA(IF(A2:A="",,IF(COUNTIFS(A2:A,A2:A,B2:B,B2:B,D2:D,D2:D)>1,"Duplicate","")))
```

## Expense Register Automation
- Year and month extraction
```gs
=ARRAYFORMULA(IF(A2:A="",,YEAR(A2:A)))
=ARRAYFORMULA(IF(A2:A="",,TEXT(A2:A,"YYYY-MM")))
```
- Budget utilization ratio
```gs
=ARRAYFORMULA(IF(C2:C="",,IFERROR(D2:D/VLOOKUP(C2:C,expense_budget_table,2,FALSE),0)))
```
- 80% budget alert
```gs
=ARRAYFORMULA(IF(I2:I="",,IF(I2:I>=0.8,"Over 80%","OK")))
```
- Category auto-tag
```gs
=ARRAYFORMULA(IF(C2:C="",,IFERROR(VLOOKUP(C2:C,expense_tag_table,2,FALSE),"General")))
```

## Monthly Summaries
- Income by month
```gs
=QUERY({'Income Register'!H2:H,'Income Register'!D2:D},"select Col1,sum(Col2) where Col1 is not null group by Col1 label Col1 'Month',sum(Col2) 'Income'",0)
```
- Expense by month
```gs
=QUERY({'Expense Register'!H2:H,'Expense Register'!D2:D},"select Col1,sum(Col2) where Col1 is not null group by Col1 label Col1 'Month',sum(Col2) 'Expense'",0)
```
- Savings by month
```gs
=ARRAYFORMULA(IF(A4:A="",,IFERROR(B4:B-VLOOKUP(A4:A,D4:E,2,FALSE),B4:B)))
```

## Cash Flow Tracker
- Monthly totals pull
```gs
=ARRAYFORMULA(IF(A3:A="",,IFERROR(VLOOKUP(A3:A,'Monthly Summaries'!A4:B,2,FALSE),0)))
=ARRAYFORMULA(IF(A3:A="",,IFERROR(VLOOKUP(A3:A,'Monthly Summaries'!D4:E,2,FALSE),0)))
```
- Net cash flow
```gs
=ARRAYFORMULA(IF(A3:A="",,B3:B-C3:C))
```
- Cumulative cash flow
```gs
=IF(A3="","",SUM($D$3:D3))
```
- Projection
```gs
=IF(A3="","",IF(COUNT($D$3:D3)<6,"",FORECAST.LINEAR(ROW()+1,$D$3:D3,ROW($D$3:D3))))
```

## Net Worth Tracker
- Assets, liabilities, and net worth
```gs
=IF(A3="","",SUM(B3:D3))
=IF(A3="","",SUM(F3:G3))
=IF(A3="","",E3-H3)
```
- YoY net worth change
```gs
=IF(ROW()<=14,"",IFERROR((I3-INDEX($I:$I,ROW()-12))/INDEX($I:$I,ROW()-12),0))
```

## Forecasts & Alerts
- Expense and income forecast
```gs
=IFERROR(FORECAST.LINEAR(COUNTA(FILTER('Monthly Summaries'!E4:E,'Monthly Summaries'!E4:E<>""))+1,FILTER('Monthly Summaries'!E4:E,'Monthly Summaries'!E4:E<>""),SEQUENCE(COUNTA(FILTER('Monthly Summaries'!E4:E,'Monthly Summaries'!E4:E<>"")))),0)
```
- Warning rollup
```gs
=IF(OR(B7>0,B8="Yes",B9>0),"Attention Required","Stable")
```

## Notes on scalability
- All major calculations use open-ended columns (`A:A`, `D:D`, etc.) or dynamic arrays.
- Multi-year support is native through date-based `YEAR()` and `TEXT(...,"YYYY-MM")` columns.
