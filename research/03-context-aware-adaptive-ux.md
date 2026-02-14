# Domain 3: Context-Aware UI and Adaptive UX

## Major concepts
- Dynamic layout adaptation by viewport, intent, and reading mode.
- Progressive complexity: basic mode first, advanced controls on demand.
- Content ordering that responds to user progression stage.
- Persistent context handoff between sessions.

## Real examples
- Android adaptive layout guidance for responsive, context-sensitive surfaces.
- Apple Intelligence examples of contextual prioritization.
- Notion AI connectors and meeting notes demonstrate context retrieval across tools.

## Implementation references
- See `research/SOURCES.md` sections: `Adaptive interfaces`, `Platform examples`.

## Implementation guidance for shatanjaysudha.com
- Extend existing split mode state to include `contextMode` (`discover`, `focus`, `implement`).
- Automatically tune split widths and card density based on context mode.
- Re-rank section blocks in home feed by intent and progression confidence.

## Suggested KPI targets
- Split reader completion rate: +20%.
- Navigation reversals per session: -15%.
- Discover-to-implementation conversion: +12%.
