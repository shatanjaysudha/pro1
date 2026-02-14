# 1. Intent Radar + Adaptive Surface

## Purpose
Detect user intent (`learn`, `implement`, `buy`) in-session and adapt layout and recommendations before explicit clicks.

## Expected impact
- Engagement: +15% to +25% session depth.
- Retention: +10% weekly return through faster relevance.
- Discovery: -30% time-to-first-relevant-content.

## UX flow
1. User lands on home or split page.
2. System infers initial intent from search terms + early interactions.
3. Home blocks and CTAs reorder to match predicted intent.
4. User can override with a visible intent switcher.
5. Model confidence updates as behavior continues.

## Data / AI usage
- Inputs: search query tokens, page transitions, scroll rate, save/bookmark events, dwell.
- Model: weighted rules MVP, classifier in full version.
- Outputs: intent label + confidence + recommended block order.

## Frontend + backend design
- Frontend: add `predictiveIntentRadar` feature flag in `frontend/js/main.js`; render intent switcher chip row; apply adaptive classnames to layout blocks.
- Backend: `POST /ai/intent/infer`; optional profile sync for logged-in users.

## Acceptance criteria
- Intent inferred within first 5 interactions for >=80% sessions.
- Override control always visible and takes effect in <150ms.
- Recommendation reason label displayed for all adapted blocks.
