# Domain 2: Predictive Content Surfaces

## Major concepts
- Anticipatory UI: show the likely next action before the user searches.
- Click-less previews: reveal gist, utility, and confidence inline.
- Context timing: vary recommendations by time, device, and session depth.
- Multi-objective ranking: optimize relevance and progression, not just popularity.

## Real examples
- Google AI Mode and Search Live patterns reduce query friction through conversational refinement.
- Medium feed surfaces topical relevance with algorithmic personalization.
- Spotify daylist adapts output by context windows across the day.

## Implementation references
- See `research/SOURCES.md` sections: `Search and personalization` and `Platform examples`.

## Implementation guidance for shatanjaysudha.com
- Add `renderPredictiveNextCard()` to home and split-reader contexts.
- Add a preview layer for command palette results with quick actions (`open`, `save`, `add-to-path`).
- Use current `trackAnalyticsEvent()` plumbing for `predictive_card_view`, `predictive_card_click`, `preview_layer_open`, `preview_layer_convert`.

## Suggested KPI targets
- Predictive card CTR: >8% baseline in first iteration.
- Content depth per session: +15%.
- Save-to-download conversion: +10%.
