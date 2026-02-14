# Phase 3: Prioritization and Feasibility

## Estimation assumptions
- Team composition unit: 1 PM + 1 Product Designer + 2 Frontend + 1 Backend/ML.
- Effort is person-days for MVP implementation and initial QA.
- Impact score: 1 (low) to 5 (high).
- Effort score: 1 (low) to 5 (high).

## Impact vs effort ranking

| Rank | Feature | Impact score | Effort score | Effort (person-days) | Suggested team size | Impact/Effort | MVP scope | Full scope | AI/model dependencies | Dataset dependencies |
|---|---|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | Intent Radar + Adaptive Surface | 5 | 2 | 16 | 4 | 2.50 | Session intent rules + adaptive reorder + override chip | Per-user intent classifier + profile sync | Lightweight intent classifier (optional in full) | Query logs, page events, save/bookmark history |
| 2 | Friction Sentinel + Rescue UI | 4 | 2 | 14 | 4 | 2.00 | Rules-based friction score + rescue prompts | ML friction classifier + intervention optimization | Binary classifier (full) | Dead click, rage click, search repeat signals |
| 3 | Contextual Energy Mode | 2 | 1 | 8 | 3 | 2.00 | Time + preference based token profiles | Adaptive energy personalization by behavior | None required (rules) | Theme preference + local time buckets |
| 4 | Inline Prompt Suggestion Engine | 3 | 2 | 12 | 4 | 1.50 | Static prompt mapping + contextual chips | LLM-ranked prompt suggestions | Embeddings reranker (full) | Prompt library, content tags |
| 5 | Predictive Content Forecasting Panel | 4 | 3 | 18 | 5 | 1.33 | Rules-based top-3 next actions + feedback | ML reranker with confidence calibration | Reranker model | Engagement stream + progression state |
| 6 | Adaptive Reading Mode | 4 | 3 | 18 | 4 | 1.33 | 3-mode adaptive heuristics (`skim/focus/study`) | Personalized reading profile model | Mode classifier (optional full) | Scroll cadence + reading time + viewport |
| 7 | Real-Time Insight Panels | 4 | 4 | 22 | 5 | 1.00 | Streamed metrics cards + next-action hints | Predictive momentum/risk scoring | Forecast model (full) | Event stream + derived user metrics |
| 8 | AI Session Concierge | 5 | 5 | 28 | 6 | 1.00 | Text-only copilot with 3 tools and confirmations | Multimodal agent with long-term memory | LLM + tool-calling + optional ASR | Content corpus index + path/resource metadata |
| 9 | Autonomous Resource Assistant | 4 | 5 | 24 | 5 | 0.80 | Rule/embedding bundle suggestions | Outcome-optimized bundle recommender | Embedding retrieval + ranking model | Product metadata + bundle performance history |
| 10 | Smart Topic Summarizer | 3 | 4 | 20 | 5 | 0.75 | Topic summary endpoint with citations | Abstractive summary + personalization layer | LLM + RAG + summary guardrails | Chunked content corpus + topic graph |

## Eagle matrix (high impact + low effort first)

### Eagle Lane A: High impact, low effort (start first)
1. Intent Radar + Adaptive Surface (F01)
2. Friction Sentinel + Rescue UI (F04)
3. Predictive Content Forecasting Panel (F02)
4. Adaptive Reading Mode (F05)
5. Inline Prompt Suggestion Engine (F07)

### Eagle Lane B: Medium impact, low effort (parallel quick wins)
1. Contextual Energy Mode (F08)

### Eagle Lane C: High impact, high effort (prepare in parallel, ship later)
1. AI Session Concierge (F03)
2. Autonomous Resource Assistant (F10)
3. Real-Time Insight Panels (F09)

### Eagle Lane D: Medium impact, high effort (defer unless strategic)
1. Smart Topic Summarizer (F06)

## MVP vs full version cut lines
- MVP (3-week feasible): F01, F02, F04, F05, F07.
- Full version (6-12 week horizon): F03, F06, F09, F10 and advanced model layers for MVP features.

## Recommended shortlist for Phase 4-6
1. F01 Intent Radar + Adaptive Surface
2. F02 Predictive Content Forecasting Panel
3. F04 Friction Sentinel + Rescue UI
4. F05 Adaptive Reading Mode
5. F07 Inline Prompt Suggestion Engine
