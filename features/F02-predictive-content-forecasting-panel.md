# 2. Predictive Content Forecasting Panel

## Purpose
Offer a proactive “next 3 best actions” panel that forecasts user-relevant content and resources.

## Expected impact
- Engagement: +12% more pages/session.
- Retention: +8% repeat visits from guided progression.
- Discovery: +20% deeper movement from article to implementation assets.

## UX flow
1. User reads for 20-40 seconds.
2. Forecasting panel appears with 3 ranked next actions.
3. Each card shows rationale (`because you saved X`, `next in path`, etc.).
4. User selects one action or dismisses.
5. Model learns from accept/reject feedback.

## Data / AI usage
- Inputs: source affinity, session intent, progression state, popularity quality, recency.
- Model: ranking formula MVP; reranker model in full version.
- Output: ordered list of 3 actions with confidence and rationale.

## Frontend + backend design
- Frontend: `renderPredictiveNextCard()` plus compact panel variant in reader sidebar.
- Backend: `POST /ai/rank/next` and cached scoring store.

## Acceptance criteria
- Forecast panel CTR >=8% within first release.
- Dismiss action respected for current session.
- Ranking fallback works client-side when backend unavailable.
