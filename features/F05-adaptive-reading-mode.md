# 5. Adaptive Reading Mode (Context Aware)

## Purpose
Auto-adjust typography, pane width, and reading aids based on device, reading speed, and focus state.

## Expected impact
- Engagement: +20% deep-read completion.
- Retention: +7% more return readers for long-form pages.
- Discovery: +9% continuation into related posts.

## UX flow
1. User enters split article view.
2. System evaluates viewport + read pace + scroll rhythm.
3. UI transitions into one of three modes (`skim`, `focus`, `study`).
4. User can pin preferred mode.

## Data / AI usage
- Inputs: reading seconds, scroll depth curve, interaction cadence, viewport metrics.
- Model: heuristic mode classifier MVP; personalized mode model full version.

## Frontend + backend design
- Frontend: extend existing reading mode with adaptive mode classes and token overrides.
- Backend: optional profile preference sync endpoint.

## Acceptance criteria
- Mode changes are subtle and reversible.
- No content shift causing layout instability (CLS-safe).
- Accessibility settings always override auto mode.
