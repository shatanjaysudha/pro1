# 7. Inline Prompt Suggestion Engine

## Purpose
Offer contextual AI prompt suggestions that help users convert reading into immediate execution.

## Expected impact
- Engagement: +9% interaction on actionable modules.
- Retention: +10% return from saved prompts.
- Discovery: +12% movement from article to prompt/template assets.

## UX flow
1. User reaches a key section in article.
2. Inline prompt chip appears with suggested prompt.
3. User copies, saves, or launches prompt in concierge.
4. Engine adapts future suggestions based on usage.

## Data / AI usage
- Inputs: section semantics, user role tags, prior prompt interactions.
- Model: prompt-template retrieval + lightweight ranking.

## Frontend + backend design
- Frontend: inline chips in article sections with sticky “Prompt Tray”.
- Backend: `POST /ai/prompts/suggest` with prompt library dataset.

## Acceptance criteria
- Suggestion relevance feedback available per prompt.
- Copy/click tracking emitted for all suggestions.
- Prompt tray is keyboard navigable and screen-reader labeled.
