# Measurement Framework

## North-star outcomes
- Increase relevance speed.
- Increase deep engagement.
- Increase implementation conversion.
- Preserve UX quality and accessibility.

## KPI definitions
- `time_to_first_relevant_click_sec`
- `predictive_panel_ctr`
- `friction_recovery_rate`
- `deep_read_completion_rate`
- `prompt_suggestion_interaction_rate`
- `weekly_returning_reader_rate`
- `save_to_download_conversion_rate`

## KPI targets (first 30 days post-release)
- Time to first relevant click: `-30%`.
- Predictive panel CTR: `>= 8%`.
- Friction recovery rate: `>= 12%`.
- Deep read completion: `+20%`.
- Prompt interaction rate: `>= 10%` on exposed sessions.

## Metric to event mapping
- `time_to_first_relevant_click_sec`
  - Events: `page_view`, `article_open`, `predictive_card_click`.
- `predictive_panel_ctr`
  - Events: `predictive_card_view`, `predictive_card_click`.
- `friction_recovery_rate`
  - Events: `friction_signal_detected`, `friction_rescue_accept`.
- `deep_read_completion_rate`
  - Events: `article_open`, `reading_mode_shift`, `article_complete` (new).
- `prompt_suggestion_interaction_rate`
  - Events: `prompt_suggestion_view`, `prompt_suggestion_click`.

## Segmentation
- Device: desktop/mobile.
- Source: AI/Productivity/Career/Newsletter.
- Intent: learn/implement/buy.
- Session type: new/returning.

## Guardrail metrics
- API error rate per feature endpoint.
- p95 interaction latency.
- Accessibility defect count (critical).
- Negative feedback rate on predictive surfaces.
