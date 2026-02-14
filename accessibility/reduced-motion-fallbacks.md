# Reduced Motion Fallbacks

## Goal
Preserve full functionality while disabling non-essential motion when users set reduced motion preferences.

## Required behavior
- Detect user preference with `matchMedia("(prefers-reduced-motion: reduce)")`.
- Add a global body class (implemented: `body.is-reduced-motion`).
- Disable spring/list/panel/hover animations in JS paths.
- Keep state changes instant but visible (opacity/state classes).
- Keep keyboard and focus behavior unchanged.

## Current implementation status
- JS preference listener updates on system changes.
- Reveal animations switch to immediate visible state.
- Hover motion is disabled when reduced motion is active.
- Split view and page transition animation helpers short-circuit.
- CSS media query globally neutralizes transitions and keyframes.

## Accessibility checks
1. Keyboard only: open/close split focus, bookmark, and navigate sidebar with no animation dependency.
2. Screen reader: ensure live regions/toasts still announce after motion bypass.
3. Reduced motion ON: verify no non-essential transform animation is visible.
4. Reduced motion OFF: verify animation returns without reload.
5. Print: confirm print stylesheet remains unaffected.

## WCAG alignment
- SC 2.3.3 Animation from Interactions: interaction-triggered motion can be suppressed except essential transitions.
- Motion remains optional and does not block content access.
