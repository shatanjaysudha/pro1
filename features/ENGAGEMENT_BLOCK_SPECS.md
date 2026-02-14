# Engagement Block Specs

## Impact Scoring Model
Impact score (0-10) uses weighted inputs:
- reach across sessions
- expected lift in meaningful actions
- retention/return effect
- implementation leverage (value vs effort)

## Feature List with Impact Scores

| ID | Feature | Primary KPI | Impact | Status |
|---|---|---|---:|---|
| F1 | Interactive article quiz + wow prompt | quiz submit rate, dwell depth | 8.8 | Implemented |
| F2 | Dynamic CTA block (behavior-based) | interactive CTA CTR | 8.7 | Implemented |
| F3 | Inline AI helper (contextual) | AI helper open/ask rate | 8.4 | Implemented |
| F4 | Progress badges + streak rewards | weekly return rate | 8.1 | Implemented |
| F5 | Interactive roadmap timeline | hub progression clicks | 7.3 | Implemented |
| F6 | Short-form insight cards carousel | micro-card action rate | 7.6 | Implemented |
| F7 | Hover-reveal glossary terms | completion depth, reduced confusion | 7.2 | Implemented |
| F8 | Celebration micro-interactions | save/bookmark repetition | 6.9 | Implemented |
| F9 | Smart related panel (why-next) | next-read CTR | 8.5 | Implemented |
| F10 | Daily challenge / prompt of day | prompt use + completion | 8.2 | Implemented |
| F11 | Surprise: Weekly identity summary | repeat sessions + email opt-in | 9.0 | Implemented + enhanced |
| F12 | Article engagement-time milestones | engaged-time coverage by article | 7.8 | Implemented (new) |

## UX Flows

### F1 Interactive Quiz
1. User reaches lower section of long article.
2. User selects A/B/C option.
3. System shows instant explanation + wow prompt.
4. User can share score.
5. Badge progress updates and analytics event fires.

### F2 Dynamic CTA
1. Behavior profile derives from category + tags + recent actions.
2. CTA variant selected at render.
3. User opens matched destination.
4. Event logs `cta_id` and destination.

### F3 Inline AI Helper
1. User taps persistent helper button or control-bar action.
2. Modal opens with article context and starter chips.
3. User asks question; contextual response returned.
4. Thread persists locally.
5. Open/ask analytics captured.

### F9 Smart Related Panel
1. User finishes article.
2. Panel proposes sequenced next reads.
3. Each card includes rationale text (why-next).
4. Click routes directly into chosen follow-up article.

### F10 Daily Challenge
1. Daily prompt is selected from a 50+ prompt pool with category fit.
2. User taps "Use in ChatGPT" or marks complete.
3. Completion contributes to badge unlocks.

### F11 Surprise Weekly Identity Summary
1. Weekly behavior is summarized into an identity profile.
2. Summary shows trend vs previous week, consistency score, top topics.
3. User can copy summary or send via email.
4. Summary includes personalized next challenge and recommended reads.

## Implementation Plan + Sequence

### Phase 1: In-article engagement depth
- dynamic CTA
- daily challenge block
- long-form quiz block
- smart related panel
- inline AI helper

### Phase 2: Retention loops
- badges + streaks
- celebration micro-feedback
- short-form carousel cards
- interactive timeline hubs

### Phase 3: Identity + analytics hardening
- weekly identity summary
- summary copy/email flow
- per-article engagement-time milestone tracking
- analytics schema updates + QA checks

## Implementation Mapping (Current Code)
- Reader blocks and behaviors: `frontend/js/main.js` (`renderReader`, helper modules)
- Engagement styling and motion constraints: `frontend/css/style.css`
- Dashboard identity summary card: `frontend/js/main.js` (`renderDashboardPage`)
- Event instrumentation: `frontend/js/main.js` (`trackAnalyticsEvent`, handlers)
