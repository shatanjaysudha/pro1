# Surprise Enhancement: Adaptive Reading Path

## What It Is
A context-aware "Adaptive Reading Path" block appears below each article's Continue Reading section.

It selects 3 next essays based on:
- Primary category continuity.
- Shared tags with the current article.
- Followed tags/categories from the user's saved preferences.
- Recency de-prioritization (prefers unread/recently-unopened items).

## Why It Matters
- Increases session depth without visual clutter.
- Feels premium and intentional because recommendations are tied to the active reading context.
- Uses existing content graph and preserves all current routing logic.

## Where Implemented
- Logic: `frontend/js/main.js` (`getAdaptiveReadingPath`)
- UI block: `frontend/js/main.js` (`renderReader`)
- Styling: `frontend/css/style.css` (`.adaptive-path-widget`)

## Feature Flag
- `FEATURE_FLAGS.adaptiveReadingPath`

## Demo Steps
1. Open any split-view article (AI/Productivity/Job Search/Career).
2. Scroll to the section after "Continue Reading".
3. Confirm the "Adaptive Reading Path" section shows three steps.
4. Click "Open Step" and verify hash routing + split view open behavior remain intact.
