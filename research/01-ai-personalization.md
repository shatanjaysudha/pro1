# Domain 1: AI Personalization Systems

## Major concepts
- Intent-first personalization: infer whether a user is trying to learn, decide, or implement.
- Two-layer memory: session memory for immediate relevance and profile memory for long-term adaptation.
- Explainable ranking: every recommendation should have a reason label.
- User-governed personalization: opt-in, reset, and profile controls.

## Real examples
- Google Search personalization in AI features emphasizes context-aware recommendations and follow-up interactions.
- Apple Intelligence frames personalization around personal context with privacy boundaries.
- OpenAI memory controls demonstrate explicit user visibility and control over remembered context.
- Spotify (Discover Weekly/daylist/DJ) demonstrates high-frequency personalization with contextual shifts.
- Medium “For You” feed shows recommendation tuning via explicit controls and behavior signals.

## Implementation references
- See `research/SOURCES.md` under sections: `Search and personalization`, `Platform examples`, and `Agents and multimodal`.

## Implementation guidance for shatanjaysudha.com
- Add `intentProfile` and `intentSession` state objects to `frontend/js/main.js`.
- Derive intent score from existing signals already tracked in your app: source affinity, saves, reading seconds, search queries.
- Expose a user-facing “Personalization Controls” modal with:
  - AI personalization toggle.
  - Reset profile button.
  - “Why this recommendation?” panel.

## Suggested KPI targets
- First relevant click time: -30%.
- Recommendation CTR: +20%.
- Repeat weekly active readers: +12%.
