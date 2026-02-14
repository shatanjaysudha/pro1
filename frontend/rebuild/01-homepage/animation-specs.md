# Homepage Motion Spec

## Tokenized motion
- Fast: `120ms`
- Medium: `220ms`
- Slow: `360ms`
- Curve: `cubic-bezier(.22,.85,.4,1)`

## Applied behaviors
- Hero media hover lift.
- Card hover micro-lift and border-emphasis.
- Section reveal via staggered observer.
- CTA buttons with spring-like transform.

## Reduced-motion behavior
- Non-essential transforms and reveal effects are disabled/reduced when `prefers-reduced-motion` is active.
