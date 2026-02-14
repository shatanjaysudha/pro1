# Domain 5: Real-Time Engagement Signals

## Major concepts
- Behavioral telemetry pipelines: scroll depth, dwell, dead clicks, repeated queries.
- Friction detection: detect stalls and confusion in-session.
- Sentiment enrichment: classify feedback urgency and affect.
- Experiment-ready instrumentation: support feature and ranking A/B tests.

## Real examples
- Microsoft Clarity and Hotjar provide heatmaps and friction evidence.
- GA4 engagement and event systems provide standardized measurement.
- Google Cloud NLP and AWS Comprehend support sentiment scoring and topic extraction.

## Implementation references
- See `research/SOURCES.md` section: `Analytics, heatmaps, and sentiment`.

## Implementation guidance for shatanjaysudha.com
- Add `frictionSignals` in local session state and event stream.
- Trigger adaptive nudges when a threshold is crossed (for example, repeated search + low scroll progression).
- Send feedback text through sentiment API in asynchronous batches.

## Suggested KPI targets
- Session abandonment after friction signal: -20%.
- Nudge acceptance rate: >12%.
- Median time-to-resolution for negative feedback: -30%.
