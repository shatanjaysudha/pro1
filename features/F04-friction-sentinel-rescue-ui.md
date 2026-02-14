# 4. Friction Sentinel + Rescue UI

## Purpose
Detect behavioral friction in real time and trigger contextual rescue actions.

## Expected impact
- Engagement: +10% completion of split-read sessions.
- Retention: +9% reduced abandonment during high-friction paths.
- Discovery: +11% navigation recovery after stalls.

## UX flow
1. User shows friction patterns (repeat search, rapid back-and-forth, low scroll progress).
2. Sentinel threshold triggers rescue prompt.
3. User picks rescue action (`2-min summary`, `open checklist`, `ask concierge`).
4. Session friction score updates and adapts future prompts.

## Data / AI usage
- Inputs: dead clicks, rage clicks, query repeats, dwell without progression.
- Model: rules engine MVP; classifier with confidence in full version.
- Output: friction score + recommended intervention.

## Frontend + backend design
- Frontend: rescue toast/panel integrated with help widget and reader.
- Backend: optional `POST /ai/friction/classify` for model-assisted scoring.

## Acceptance criteria
- Friction detection precision >=70% in QA-labeled sessions.
- Rescue prompt shows no more than 1 time per 90 seconds.
- Sessions with rescue action show lower exit rate than control.
