# 6. Smart Topic Summarizer

## Purpose
Generate concise topic summaries and action checklists across related essays and resources.

## Expected impact
- Engagement: +14% completion for users who open summaries.
- Retention: +8% repeat usage via quick review loops.
- Discovery: +13% transitions to full article or download asset.

## UX flow
1. User opens a topic cluster or article.
2. User taps `Summarize Topic`.
3. System returns summary, key claims, and next actions.
4. User expands into full source references.

## Data / AI usage
- Inputs: chunked content embeddings, tagged metadata, user intent.
- Model: retrieval + LLM summarization with source constraints.

## Frontend + backend design
- Frontend: summary drawer with collapsed and expanded states.
- Backend: `POST /ai/summarize/topic` using RAG index.

## Acceptance criteria
- Summary response includes linked source list.
- Hallucination guard: no unsupported claims in QA set.
- Summary generation succeeds in <3s for cached topics.
