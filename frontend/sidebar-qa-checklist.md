# Sidebar Flat Navigation QA Checklist

Date: 2026-02-14

## Functional
- [x] Sidebar renders as a flat list (no dropdown, no collapsible groups, no nested expansion).
- [x] Item order is exact: Home, Newsletter, I Am Hiring, Essential Power Prompts, Courses, Workspace Academy, AI, Productivity, Job Search, Career, Intellectual Hub, Resources, Platform.
- [x] Click on every item loads in main panel via hash routing (no full page reload).
- [x] Split view behavior remains intact for AI/Productivity/Job Search/Career.
- [x] Newsletter panel behavior remains intact.
- [x] Existing routes and deep pages continue to work.

## Interaction
- [x] Sidebar search filters visible nav rows and opens results in main panel.
- [x] Active nav state is visible and updates for direct routes and deep routes (parent hub items).
- [x] Keyboard Arrow Up/Down navigation between visible sidebar items still works.

## Layout / UX
- [x] All nav items are directly visible.
- [x] Sidebar remains independently scrollable when content exceeds viewport height.
- [x] No indentation/sublist styling is used for nav items.
- [x] Spacing rhythm updated for clean flat-list readability.

## Mobile
- [x] Sidebar remains off-canvas on mobile.
- [x] Flat order is preserved in mobile drawer.
- [x] No collapsible behavior appears on mobile.

## Stability
- [x] `node --check frontend/js/main.js` passes.
- [x] Theme switcher Light/Dark/Auto remains functional.
- [x] Analytics sidebar click tracking (`sidebar_item_click`) remains active.
