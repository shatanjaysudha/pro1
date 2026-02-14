# Style Guide

## Visual Direction
Calm authority: quiet surfaces, strong hierarchy, low-noise UI, and restrained accent usage.

## Foundations
- Layout: left `280px` sidebar rail, no top header, dynamic content panel
- Main gutter: `32px`
- Content max: `1200px`
- Reading column: `~820px`
- Split view: `350px` list pane + reader pane

## Typography
- Font family (brand + UI): `"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Signature mark: inline SVG logotype using `Allura` script (`https://fonts.googleapis.com/css2?family=Allura`)
- Brand label: `600`, `20px`, slight negative tracking
- Type scale:
  - H1: `44 / 700 / 1.15`
  - H2: `32 / 700 / 1.2`
  - H3: `24 / 600 / 1.3`
  - Body: `16 / 400 / 1.7`
  - Sidebar label: `15 / 500`
  - Meta: `13 / 400`

## Color System
- Dark mode:
  - `--bg: #0b0b0f`
  - `--surface: #131217`
  - `--card: #1e1c20`
  - `--border: #2a2730`
  - `--text: #e8e7ea`
  - `--muted: #9a95a0`
  - `--accent: #f28a2b`
- Light mode:
  - `--bg: #f4f5f7`
  - `--surface: #ffffff`
  - `--card: #f8f8fa`
  - `--border: #d9dce3`
  - `--text: #101216`
  - `--muted: #606774`
  - `--accent: #d97706`

## Iconography
- Icon set: Lucide (outline)
- Sidebar icons: `18px`
- Meta/UI icons: `14-16px`
- CDN: `https://unpkg.com/lucide@latest`

## Sidebar Navigation
- Flat list (no dropdowns/collapsibles), all items visible.
- Order:
  - `Home`, `Newsletter`, `I Am Hiring`
  - `Essential Power Prompts`, `Courses`, `Workspace Academy`
  - `AI`, `Productivity`, `Job Search`, `Career`
  - `Intellectual Hub`, `Resources`, `Platform`
- Static section label used for `Pages` grouping only (non-interactive).

## Interaction Rules
- Hover: `translateY(-2px)` with soft shadow reinforcement
- Focus: `3px` ring using theme focus token
- Transition timing: `160-240ms` (context dependent)
- Respect `prefers-reduced-motion`

## Content Experience
- Split-view archives for newsletter and article categories
- Dedicated `Guides` hub (separate from Articles)
- `Templates & Toolkits` product catalog with filter/sort controls
- `Tools & Stack` resource database with structured filters
- Reader controls:
  - Reading mode toggle
  - Font size up/down
  - Copy article link
  - Bookmark
- Reading progress bar:
  - Thin, top-aligned
  - Fades on scroll-up

## Phase 3 Components
- Home trust strip: monochrome icon badges (`As Featured On / Built With / Used By`)
- Home featured systems: curated template/toolkit cards
- Home use-case paths: guided discovery entry points
- Template product page:
  - Problem
  - What’s inside
  - Who it’s for
  - Preview screenshots
  - Benefits
  - FAQ
  - CTA
- Related systems block inside article reader (tag-overlap matching)

## Responsive Rules
- `<=1160px`: sidebar becomes off-canvas with overlay + menu button
- `<=980px`: split panes collapse into one column
- `<=840px`: stacked forms and compact heading scale
- `<=640px`: footer and command palette spacing tighten

## Help Widget Collision
- Config source: `frontend/js/main.js` in `HELP_COLLISION_CONFIG`.
- Default section selectors:
  - `[data-help-collision]`
  - `.section-help-trigger`
- Optional per-page selectors:
  - `HELP_COLLISION_CONFIG.pageSelectors.<pageId>` (for example: `home`, `newsletter`, `templates`, `guides`, `explore`).
- Behavior:
  - Footer collision and section collision both compute lift values.
  - Applied lift uses `max(footerLift, sectionLift)` and writes to `--help-widget-lift`.
  - Help widget moves via `transform` only (no layout shift), with motion token timing.
- QA steps:
  - Scroll a configured section into the lower-right viewport zone and confirm help button lifts smoothly.
  - Scroll away and confirm smooth return to default position.
  - Confirm footer push still works and never overlaps the footer.
  - Verify behavior on desktop, tablet, and mobile.
  - Enable reduced motion (`prefers-reduced-motion`) and confirm no aggressive animation.

## Discover Readiness Layer
- Article-level discover badge:
  - `Discover Candidate` (pass)
  - `Discover Improvements Required` (fail)
- Discover score block includes:
  - Readiness score
  - Word count
  - Image count
  - Passed checks count
- Checklist styling:
  - Pass/fail border tone only (no loud colors)
  - Compact icon + label + detail line
- Platform QA panel mirrors the same readiness logic for pre-publish review.

## Surprise Enhancement
- `Adaptive Reading Path` appears after `Continue Reading` in article view.
- Selection logic:
  - category continuity
  - tag overlap
  - followed-topic weighting
- Keep card style consistent with existing design tokens (no new visual language).
