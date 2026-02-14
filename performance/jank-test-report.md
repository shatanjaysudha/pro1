# Motion Performance & Jank Report

Date: 2026-02-14
Scope: `frontend/js/main.js`, `frontend/css/style.css`, motion deliverables

## Performance strategy implemented
- Animate only `transform` and `opacity` for primary motion.
- Use IntersectionObserver for scroll reveal instead of scroll-loop animation.
- Lazy-load motion engine via dynamic import with idle/deferred trigger.
- Fallback to WAAPI/CSS when motion library is unavailable.
- Respect reduced motion to skip expensive sequences.

## Risk controls
- Avoid layout-thrashing patterns (read before write, no repeated layout-forcing loops).
- Keep stagger small (`~28ms`) and reveal distance modest (`20px`).
- Set `will-change` only during active transition windows.

## Suggested measurement method (staging)
1. Chrome DevTools Performance: record page switch, split-panel toggle, list reveal.
2. Enable Rendering > FPS meter and Paint flashing.
3. Lighthouse timespan run on top 3 pages (`home`, split page, resources page).
4. Collect Interaction to Next Paint (INP), Long tasks, and dropped-frame count.

## Analytical before/after expectations
These are forecast targets based on transform/opacity-only migration and deferred loading.

- List reveal dropped frames: `18-30%` lower on mid-range devices.
- Panel transition long tasks >50ms: `10-20%` lower.
- Perceived smoothness score (internal QA rubric): `+20-35%`.
- Scroll reveal CPU overhead: neutral to slightly improved (`0-8%`).
- CLS impact: no regression expected (motion does not alter layout geometry).

## Pass/fail thresholds
- No animation path introduces measurable CLS regression.
- No key interaction exceeds 10% jank in repeated test runs.
- Reduced-motion mode shows zero decorative animation.
- No regressions in sidebar routing, split view, search/filter, save/bookmark, analytics hooks.

## Open items
- Browser trace artifacts and exact numbers should be added after staging capture.
- Optional: automate with Playwright trace + performance budgets in CI.
