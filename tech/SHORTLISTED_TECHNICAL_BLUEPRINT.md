# Phase 5: Technical Blueprint (Shortlisted Features)

Scope: F01, F02, F04, F05, F07

## 1) API needs

### Core endpoints
- `POST /api/ai/intent/infer`
  - Request: session features + page context.
  - Response: `intent_label`, `confidence`, `reorder_hint`.
- `POST /api/ai/rank/next`
  - Request: `intent_label`, `active_page`, `history_features`.
  - Response: ranked action cards with reasons.
- `POST /api/ai/friction/evaluate`
  - Request: friction telemetry window.
  - Response: `friction_score`, `rescue_action`.
- `POST /api/ai/reading/mode`
  - Request: reading telemetry and viewport metrics.
  - Response: mode recommendation (`skim`/`focus`/`study`).
- `POST /api/ai/prompts/suggest`
  - Request: section/topic context + user role tags.
  - Response: ranked prompts with usage intent metadata.

### Real-time and streaming
- `GET /api/stream/session-signals` (SSE)
  - Pushes latest inferred intent, friction changes, and ranking updates.
- Webhook receiver: `POST /api/webhooks/model-events`
  - Receives async model completion or degraded service notifications.

## 2) Data layer design

### Session store (ephemeral)
- Storage: client memory + `sessionStorage`.
- Key objects:
  - `intentSession`
  - `frictionSignals`
  - `predictivePanelState`
  - `adaptiveReadingState`

### Persistent user signal store
- Storage: `localStorage` first, backend profile optional.
- Key objects:
  - `intentProfile`
  - `promptInteractionHistory`
  - `adaptiveUiPrefs`

### Event envelope
- Required fields:
  - `event_name`
  - `event_id`
  - `timestamp`
  - `session_id`
  - `page_id`
  - `user_id_hash` (optional)
  - `feature_id`
  - `payload`

## 3) Model integration

### Intent Radar (F01)
- MVP: client rule score from query tokens + interaction cadence.
- Full: hosted classifier model with confidence calibration.

### Predictive Forecast Panel (F02)
- MVP: deterministic formula ranking.
- Full: reranker model using implicit feedback loop.

### Friction Sentinel (F04)
- MVP: thresholded friction index.
- Full: binary/ordinal classifier predicting dropoff risk.

### Adaptive Reading (F05)
- MVP: heuristic classification by reading speed and viewport.
- Full: personalized mode model from profile history.

### Prompt Suggestion Engine (F07)
- MVP: tag-match retrieval from curated prompt library.
- Full: embedding search + reranker by context and role.

## 4) Frontend component patterns

## Component map
- `IntentRadarChip`
- `PredictiveForecastPanel`
- `FrictionRescueNudge`
- `AdaptiveReadingModeBadge`
- `InlinePromptChip`
- `PromptTray`

## State management pattern
- Keep all feature states in central `state` object in `frontend/js/main.js`.
- Persist only stable/longitudinal keys.
- Avoid storing raw text feedback in local storage.

## Rendering strategy
- Render guards via feature flags.
- Progressive enhancement: each feature has static fallback.
- No hard dependency chain between features.

## 5) Real-time triggers and webhooks

## Trigger rules
- Trigger intent inference at:
  - session start.
  - first search input.
  - 3rd navigation event.
- Trigger forecast panel after:
  - `engagement_time_msec >= 20000` and `scroll_depth_pct >= 25`.
- Trigger friction evaluation every 15s during split-reading session.
- Trigger prompt suggestion on entering tagged section landmarks.

## Webhook usage
- Model provider async completion callback.
- Feature health notifications (degraded/inactive mode).
- Alert pipeline to disable model-assisted mode and fallback to rules.

## 6) Privacy and security

## Privacy controls
- Explicit toggle for AI personalization.
- “Reset AI memory” control clears local and server profile artifacts.
- Clear “why this recommendation” reason strings on all predictive cards.

## Security controls
- Signed server tokens for model endpoints.
- Rate limits per IP/session for AI endpoints.
- Strict schema validation on all event payloads.
- PII redaction in telemetry pipeline.

## Compliance posture
- Data minimization by default.
- Retention limits per event category.
- Support DSR/erasure workflows for profile-linked data.
