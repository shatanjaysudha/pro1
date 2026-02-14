# 8. Contextual Energy Mode

## Purpose
Tune visual energy (contrast, density, motion, color temperature) based on time and user preference for sustained focus.

## Expected impact
- Engagement: +8% longer low-friction sessions.
- Retention: +6% improvement among evening users.
- Discovery: +5% due to less visual fatigue.

## UX flow
1. System reads local time + explicit preference.
2. UI shifts to matching energy profile (`calm`, `neutral`, `high-contrast`).
3. User can lock or schedule profiles.

## Data / AI usage
- Inputs: time window, ambient mode preference, interaction speed.
- Model: rule-based personalization.

## Frontend + backend design
- Frontend: design token profile switcher layered over current theme tokens.
- Backend: optional preference persistence API.

## Acceptance criteria
- Energy mode switch causes no loss of contrast compliance.
- Reduced-motion settings respected always.
- User manual override persists across sessions.
