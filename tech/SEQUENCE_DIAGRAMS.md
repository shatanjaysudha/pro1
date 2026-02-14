# Sequence Diagrams

## F01 Intent Radar + Adaptive Surface
```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant AI as Intent API
  participant EV as Event Pipeline

  U->>FE: Open home page
  FE->>FE: Collect early session signals
  FE->>AI: POST /api/ai/intent/infer
  AI-->>FE: intent_label + confidence
  FE->>FE: Reorder blocks and show intent chip
  FE->>EV: Emit intent_inferred
```

## F02 Predictive Content Forecasting Panel
```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant RK as Ranking API
  participant EV as Event Pipeline

  U->>FE: Read content (20s+)
  FE->>RK: POST /api/ai/rank/next
  RK-->>FE: 3 ranked recommendations
  FE->>U: Show forecasting panel
  U->>FE: Click recommendation
  FE->>EV: Emit predictive_card_click
```

## F04 Friction Sentinel + Rescue UI
```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant FR as Friction API
  participant EV as Event Pipeline

  loop every 15s
    FE->>FE: Compute friction telemetry window
    FE->>FR: POST /api/ai/friction/evaluate
    FR-->>FE: friction_score + rescue_action
  end
  alt score above threshold
    FE->>U: Show rescue nudge
    U->>FE: Accept rescue action
    FE->>EV: Emit friction_signal_detected
  end
```

## F05 Adaptive Reading Mode
```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant RM as Reading Mode API
  participant EV as Event Pipeline

  U->>FE: Open split article
  FE->>FE: Track reading pace + viewport
  FE->>RM: POST /api/ai/reading/mode
  RM-->>FE: mode=focus
  FE->>U: Apply typography + layout adjustments
  FE->>EV: Emit reading_mode_shift
```

## F07 Inline Prompt Suggestion Engine
```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant PS as Prompt Suggest API
  participant EV as Event Pipeline

  U->>FE: Scroll to tagged section
  FE->>PS: POST /api/ai/prompts/suggest
  PS-->>FE: Suggested prompts list
  FE->>U: Render prompt chip + tray
  U->>FE: Copy prompt
  FE->>EV: Emit prompt_suggestion_click
```
