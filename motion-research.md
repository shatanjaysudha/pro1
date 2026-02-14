# Motion Research Brief (Things 3-style, web-safe)

Research date: 2026-02-14

## What was researched
- Natural spring curves and parameters from Motion/Framer, Popmotion, and Apple spring talks.
- Web motion performance constraints and anti-jank patterns.
- Motion accessibility requirements (`prefers-reduced-motion`, WCAG 2.3.3).
- Practical stagger/reveal patterns and lazy-loading strategies.

## Curated sources
- Motion transitions docs: https://motion.dev/docs/react-transitions
- Motion animate docs (stagger, spring): https://motion.dev/docs/animate
- Motion LazyMotion (bundle strategy): https://motion.dev/motion/lazy-motion/
- Popmotion spring API: https://popmotion.io/api/spring/
- Popmotion repo spring options: https://github.com/Popmotion/popmotion
- GSAP CSS transforms docs: https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/
- web.dev animation performance: https://web.dev/articles/animations-guide
- web.dev layout thrashing: https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
- MDN `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- WCAG 2.1 SC 2.3.3: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- MDN Intersection Observer API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- Apple WWDC23 (Animate with springs): https://developer.apple.com/videos/play/wwdc2023/10158/
- Things product context (design direction only): https://culturedcode.com/things/

## Key takeaways
1. Use physics springs for interaction-coupled motion.
Motion and Popmotion both expose `stiffness`, `damping`, and `mass` because springs feel more natural when they respond like physical systems, especially in drag/tap/panel interactions.

2. Keep reveal motion subtle and short.
For lists/cards, the premium-app pattern is low-amplitude translate + fade, with short stagger. This gives hierarchy without looking decorative.

3. Animate `transform` + `opacity` only for primary motion.
web.dev explicitly recommends avoiding layout/paint-heavy properties for smoothness.

4. Avoid forced synchronous layout.
Read values first, then write style changes in batches. This reduces layout thrashing and protects interaction latency.

5. Reduced motion must be first-class.
MDN and WCAG emphasize honoring user preference and allowing interaction-triggered animation to be disabled unless essential.

6. Use IntersectionObserver for scroll reveal.
Observer-based reveals are async and scalable versus manual scroll listeners, and support threshold/root margin tuning.

7. Lazy-load motion features when possible.
Motion docs show large bundle savings with LazyMotion / deferred feature loading. For vanilla, dynamic import + WAAPI fallback is a practical equivalent.

8. Premium app feel comes from consistency more than complex effects.
Inference from Things/Apple UX direction: the "high-end" feeling is coherent timing and restrained overshoot, not large travel distance or exaggerated bounce.

## Recommended baseline parameters
- Spring stiffness: `170`
- Spring damping: `22`
- Durations: `120ms / 220ms / 360ms`
- Default easing (non-spring): `cubic-bezier(.22,.85,.4,1)`
- List stagger: `20-40ms` (implemented at `28ms`)
- Reveal offset: `20px`

These values keep motion snappy but damped, aligning with a Things-like "calm momentum" feel.

## Mapping to this implementation
- Enter/Exit UI animation: spring fade + directional slide in `renderPage` transitions.
- List reveal: IntersectionObserver + stagger + spring reveal.
- Panel transitions: split-view focus changes animate both panes.
- Hover micro feedback: `motion-hoverable` class with lift/scale and shadow tuning.
- Accessibility: global reduced-motion class + JS guard rails.
- Performance: transform/opacity only, lazy import of motion engine, graceful WAAPI fallback.

