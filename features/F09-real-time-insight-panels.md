# 9. Real-Time Insight Panels

## Purpose
Surface live reader insights (progress, confidence, momentum, friction) to guide next actions in-session.

## Expected impact
- Engagement: +11% increase in completion of planned actions.
- Retention: +9% weekly return from visible progress loop.
- Discovery: +10% guided exploration via insight prompts.

## UX flow
1. User opens dashboard or split page.
2. Insight panel displays live metrics and one suggested next action.
3. User accepts action and sees metrics update.

## Data / AI usage
- Inputs: engagement telemetry, path progress, saved/downloaded resources.
- Model: scoring functions for momentum and risk-of-dropoff.

## Frontend + backend design
- Frontend: side panel widget + compact mobile strip.
- Backend: event stream aggregator + optional predictive scoring endpoint.

## Acceptance criteria
- Metrics refresh in near real time (<5s stream window).
- Suggested action confidence and rationale visible.
- Panel fallback to static metrics when stream unavailable.
