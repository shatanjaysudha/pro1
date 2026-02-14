# 3. AI Session Concierge (Multimodal Guidance)

## Purpose
Provide a copilot that helps users turn goals into an actionable session plan using text or voice.

## Expected impact
- Engagement: +18% average session duration for concierge users.
- Retention: +12% return in 7 days via saved plans.
- Discovery: +15% conversion from content to checklist/template.

## UX flow
1. User opens concierge panel.
2. User types or speaks goal.
3. Concierge proposes plan with cited content blocks.
4. User approves steps.
5. Site deep-links to selected step and tracks completion.

## Data / AI usage
- Inputs: site corpus embeddings, user progress, active page context.
- Model: LLM with tool-calling + retrieval.
- Output: plan steps, citations, action intents.

## Frontend + backend design
- Frontend: right rail on desktop, modal on mobile; conversation thread state.
- Backend: `POST /ai/copilot/respond`, tools for content search, path generation, resource recommendation.

## Acceptance criteria
- 100% of responses include citations.
- Action-executing steps require explicit user confirmation.
- Median response latency <2.5s for text mode.
