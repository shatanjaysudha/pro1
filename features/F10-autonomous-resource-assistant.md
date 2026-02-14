# 10. Autonomous Resource Assistant

## Purpose
Proactively find and assemble the right templates, guides, and tools for a user’s current goal.

## Expected impact
- Engagement: +13% resource interactions/session.
- Retention: +10% return for implementation-focused users.
- Discovery: +18% improvement in resource fit-to-goal clicks.

## UX flow
1. User defines current objective.
2. Assistant proposes a resource bundle with rationale.
3. User accepts, edits, or rejects bundle.
4. Assistant updates recommendations and tracks implementation outcomes.

## Data / AI usage
- Inputs: objective text, role tags, historical outcomes, resource metadata.
- Model: retrieval + bundle-ranking model.

## Frontend + backend design
- Frontend: assistant panel with bundle cards and compare mode.
- Backend: `POST /ai/resources/assemble` and `POST /ai/resources/feedback`.

## Acceptance criteria
- Bundle recommendations include per-item relevance reasons.
- User can remove any auto-suggested item before apply.
- Bundle accept-to-download conversion is measurable and attributable.
