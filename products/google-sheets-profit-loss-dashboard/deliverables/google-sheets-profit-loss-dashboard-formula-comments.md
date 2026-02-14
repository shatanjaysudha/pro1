# Google Sheets Profit & Loss Dashboard — Formula Notes

- `=SUMIFS(F:F, A:A, A2, H:H, "Completed")` totals completed hours by week.
- `=IF(E2=0, 0, ROUND(F2/E2, 2))` tracks estimate accuracy.
- `=QUERY(A:I, "select A, sum(F), avg(G) where A is not null group by A", 1)` creates weekly trend table.
- `=SPARKLINE(F2:F)` visualizes throughput in one cell.

Add comments directly in Sheet cells explaining business logic assumptions.
