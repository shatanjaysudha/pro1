# Homepage Layout Spec (shatanjaysudha.com)

## Canvas and Grid
- Content width: `min(1100px, 100%)`
- Section rhythm: `48px` desktop, `32px` mobile
- Hero layout:
  - Desktop: 2-column (`~56% copy / 44% media`)
  - Mobile: single column, copy first
- Typography:
  - Hero H1: `44px` minimum desktop, scales to `64px`
  - Section H2: design token `--h2-size`
  - Body: `17px` base

## Final Homepage Structure
1. Hero (clarity + emotion)
2. Value proposition (4 outcome cards)
3. Quick engagement anchors
4. Core section previews
5. Social proof and trust
6. Featured resources
7. Newsletter CTA
8. Global footer signature (existing shell footer)

## Section Specs

### 1) Hero
- Eyebrow: identity cue
- H1: direct value proposition
- Subheading: immediate practical outcome
- Primary CTA: `Explore Productivity Systems`
- Secondary CTA: `See Examples`
- Hero image: responsive `<picture>` with preload and LQIP
- Proofline: subscriber validation

### 2) Value Proposition
- 4 cards with icon, title, and short outcome copy:
  - Practical Frameworks
  - AI-Boosted Templates
  - Career Strategy
  - Time-Saving Systems

### 3) Engagement Anchors
- Prompt of the day: actionable prompt + completion state
- Today’s quick tip: one-click copy prompt
- Featured articles carousel: short rotating editorial picks
- Smart topic picker: rapid path selector for current user intent

### 4) Core Section Previews
- 4 preview cards:
  - Articles
  - Prompts
  - Tools & Templates
  - Intellectual Hub
- Each card has:
  - Image
  - 3 bullets
  - CTA button

### 5) Social Proof / Trust
- Metrics strip
- Trust badges
- Success story cards
- Testimonial carousel

### 6) Featured Resources
- 3 visual cards:
  - Google Sheets Systems
  - AI Prompt Library
  - Productivity Kits

### 7) Newsletter CTA
- Benefit-first headline
- Short trust microcopy
- Accessible form with required fields

## Motion Interaction Spec
- Reveal motion: fade + translateY via existing reveal observer
- Card hover: subtle lift and border emphasis
- Button hover: spring-like upward micro-motion using existing motion timing tokens
- Carousel: auto-advance with manual controls
- Reduced motion: all transitions and animations gracefully reduced by global `prefers-reduced-motion` rules

## Accessibility Spec
- Semantic sectioning with heading hierarchy (`h1` then `h2` blocks)
- All controls keyboard reachable (`button` elements for interactive UI)
- Form fields have labels (visually hidden where needed)
- Decorative icons marked with `aria-hidden="true"`
- Color contrast aligned with existing theme tokens
- Mobile layout keeps touch targets >= 44px

## Performance and Measurement Spec
- Hero image uses preload + responsive source sets
- Non-critical images use `loading="lazy"` and `decoding="async"`
- Section-level `content-visibility` inherited from `.section-stack`
- New instrumentation:
  - `home_cta_click` for hero/core/topic CTA actions
  - `home_scroll_depth` at 50/75/100 milestones
  - Existing `newsletter_signup` event remains active
- Primary goals:
  - Scroll depth > 50%
  - CTA click rate
  - Newsletter signups
  - Internal navigation from homepage
