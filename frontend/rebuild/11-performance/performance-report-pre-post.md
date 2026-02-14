# Performance Report (Pre vs Post)

Measurement timestamp (post): 2026-02-15 00:54:15 IST
Method: static file-size comparison (`wc -c`) for core frontend artifacts.

## Baseline (pre)
- `frontend/index.html`: 12,396 bytes
- `frontend/css/style.css`: 124,515 bytes
- `frontend/js/main.js`: 900,376 bytes
- `frontend/sitemap.xml`: 1,064 bytes
- `frontend/robots.txt`: 146 bytes
- Total: 1,038,497 bytes

## After rebuild patch
- `frontend/index.html`: 12,802 bytes
- `frontend/css/style.css`: 134,429 bytes
- `frontend/js/main.js`: 923,548 bytes
- `frontend/sitemap.xml`: 2,046 bytes
- `frontend/robots.txt`: 249 bytes
- Total: 1,073,074 bytes

## Delta
- `index.html`: +406 bytes
- `style.css`: +9,914 bytes
- `main.js`: +23,172 bytes
- `sitemap.xml`: +982 bytes
- `robots.txt`: +103 bytes
- Total delta: +34,577 bytes (+3.33%)

## Interpretation
- Increase is expected due to expanded search index coverage, new homepage sections, AI hub assistant UI/logic, and resources suggestion UX.
- No runtime syntax regressions detected (`node --check frontend/js/main.js` passed).

## Next recommended profiling
- Run Lighthouse (mobile + desktop) for LCP/CLS/INP verification.
- Run real-user monitoring sample for command palette search latency and resources filter responsiveness.
