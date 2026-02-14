# System Architecture Flow

## High-level architecture
```mermaid
flowchart LR
  A[Browser UI] --> B[Feature Orchestrator in main.js]
  B --> C[Local Session Store]
  B --> D[Analytics/Event Collector]
  B --> E[AI API Gateway]
  E --> F[Intent Service]
  E --> G[Ranking Service]
  E --> H[Friction Service]
  E --> I[Prompt Suggestion Service]
  E --> J[Reading Mode Service]
  F --> K[(Feature Store)]
  G --> K
  H --> K
  I --> K
  J --> K
  D --> L[(Event Warehouse)]
  L --> M[Model Training / Calibration]
  M --> E
```

## Runtime flow summary
1. Browser orchestrator captures interaction and context signals.
2. Local decisions run immediately for low-latency behavior.
3. AI API calls provide higher quality inference and ranking where available.
4. Event collector records outcomes and feeds model calibration loop.
5. If AI services degrade, UI falls back to deterministic rules.

## Degradation and fallback strategy
- Priority 1: maintain navigation and reading UX.
- Priority 2: maintain deterministic recommendation logic.
- Priority 3: disable only model-assisted enhancements.
