# Motion Component Library

## Engine
- Runtime: Motion One-compatible spring helpers + CSS token durations.
- Fallback: JS frame interpolation when external module is unavailable.

## Reusable patterns
- `reveal`: section fade-up entrance
- `card-hover`: subtle lift + shadow increase
- `button-press`: spring scale pulse
- `progress-bar`: width interpolation with reduced-motion fallback
- `content-map`: staggered card entrances and skeleton transitions

## Reduced-motion policy
- Removes non-essential translation/scale.
- Keeps state changes instant and readable.
- Preserves interaction semantics without motion dependence.
