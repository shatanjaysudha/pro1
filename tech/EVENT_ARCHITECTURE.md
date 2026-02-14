# Event Architecture

## Event flow
1. UI interaction or derived signal occurs in `frontend/js/main.js`.
2. Event normalized into shared envelope.
3. Event routed to local analytics hook and optional backend collector.
4. Stream processor derives session-level aggregates.
5. Derived features feed ranking, friction, and adaptation services.

## Core event set (new)
- `intent_inferred`
- `intent_override`
- `predictive_card_view`
- `predictive_card_click`
- `predictive_card_dismiss`
- `friction_signal_detected`
- `friction_rescue_accept`
- `reading_mode_shift`
- `prompt_suggestion_view`
- `prompt_suggestion_click`
- `prompt_suggestion_feedback`

## Event schema (example)
```json
{
  "event_name": "predictive_card_click",
  "event_id": "evt_01HXYZ...",
  "timestamp": "2026-02-14T20:00:00Z",
  "session_id": "sess_abc123",
  "page_id": "ai",
  "feature_id": "F02",
  "payload": {
    "entry_key": "ai::post-42",
    "intent_label": "implement",
    "confidence": 0.81,
    "rank_position": 1
  }
}
```

## Reliability and QoS
- Client-side queue with retry/backoff.
- At-least-once delivery semantics to collector.
- Server dedupe by `event_id`.
- Feature-specific rate limits for high-volume signals.
