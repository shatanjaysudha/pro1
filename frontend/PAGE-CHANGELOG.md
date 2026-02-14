# Frontend Page Changelog

## 2026-02-14
- Reworked sidebar to flat-list navigation (no dropdown/collapsible groups).
- Kept all routes and page rendering logic intact; only navigation hierarchy presentation changed.
- Updated active-state logic so deep pages still highlight their top-level hub item.
- Added static non-interactive `Pages` label for visual separation only.
- Finalized sidebar hierarchy to:
  - Home, Newsletter, I Am Hiring
  - Efficiency Labs (Essential Power Prompts, Courses, Workspace Academy)
  - Articles (AI, Productivity, Job Search, Career)
  - Pages (Intellectual Hub, Resources, Platform)
- Updated nav parent mapping and group persistence defaults for `efficiency-labs`, `articles`, and `pages`.
- Added `nav-item-parent` behavior to Pages sub-items for stable active highlighting on deep hub routes.
- Added nested sidebar groups for Intellectual Hub, Resources, Platform.
- Added new static pages:
  - `research-index`, `systems-library`, `roadmaps`, `contributor-spotlight`
  - `resource-packs`, `downloads-library`, `quick-previews`, `licensing-terms`
  - `courses-workshops`, `membership-insider`, `partner-portal`, `consulting-audits`, `api-integrations`
- Added hub landing filters + save-to-library actions.
- Added persisted nav collapse state and hub filter state.
- Added sidebar search result rendering in main panel.
- Added analytics event hooks for hub/resource/membership/download/bundle/booking flows.

See root `PAGE-CHANGELOG.md` for rollback command snippets.
