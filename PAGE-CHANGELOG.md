# Page Changelog

## 2026-02-14 — Flat Sidebar (No Dropdown)

### Scope
- Converted sidebar from collapsible/nested navigation to a flat, always-visible list.
- Preserved all existing routes, dynamic panel rendering, split views, and hash-based navigation.

### Files Changed
- `frontend/index.html`
  - Replaced grouped/collapsible nav markup with flat `data-nav-row` button list.
  - Added static `Pages` section label (non-interactive, non-collapsible).
- `frontend/css/style.css`
  - Increased flat list rhythm (`.nav-list` gap) and added section-label spacing styles.
- `frontend/js/main.js`
  - Updated `updateActiveNav()` for flat-list active-state mapping (including deep-route parent highlighting).
- `frontend/sidebar-config.json`
  - Updated to a flat navigation config structure.

## 2026-02-14 — Final Sidebar Structure Alignment

### Scope
- Aligned sidebar order to final structure:
  - `Home`
  - `Newsletter`
  - `I Am Hiring`
  - `Efficiency Labs` (`Essential Power Prompts`, `Courses`, `Workspace Academy`)
  - `Articles` (`AI`, `Productivity`, `Job Search`, `Career`)
  - `Pages` (`Intellectual Hub`, `Resources`, `Platform`)
- Preserved hash routing, dynamic rendering, split-view, reading mode, search, analytics, save/bookmark, and theme switcher behavior.

### Files Changed
- `frontend/index.html`
  - Marked `Pages` sub-items as `nav-item-parent` for correct parent highlighting and keyboard collapse/expand support.
- `frontend/js/main.js`
  - Updated `NAV_PARENT_PAGE` to keep direct sidebar items self-mapped and deep routes mapped to hub parents.
  - Updated `DEFAULT_NAV_GROUP_STATE` to current group IDs: `efficiency-labs`, `articles`, `pages`.
  - Updated active-nav auto-expand logic to expand the actual containing group for active/parent nav targets.
- `frontend/sidebar-config.json`
  - Synced config with final sidebar hierarchy and order.
- `README.md`
  - Updated sidebar structure documentation to match implementation.
- `frontend/sidebar-qa-checklist.md`
  - Updated QA assertions to final structure order.

## 2026-02-14 — Sidebar Hub Expansion (Non-Destructive)

### Scope
- Added nested sidebar groups for:
  - `Intellectual Hub`
  - `Resources` (enhanced)
  - `Platform`
- Preserved existing route IDs, split-view, reading mode, save/bookmark logic, analytics base hooks, command palette, theme system, and global footer behavior.

### Files Changed
- `frontend/index.html`
  - Replaced flat hub links with collapsible grouped structure and nested sub-items.
  - Added ARIA/controls metadata for accessible expand/collapse.
- `frontend/css/style.css`
  - Added collapsible group styles (`.nav-group-collapsible`, `.nav-group-toggle`, `.nav-sublist`, `.nav-row-sub`).
  - Added enhanced hub landing two-column layout styles (`.hub-layout`, `.hub-index-*`).
  - Added responsive support for new sidebar and hub layout.
- `frontend/js/main.js`
  - Added new pages/routes:
    - `research-index`, `systems-library`, `roadmaps`, `contributor-spotlight`
    - `resource-packs`, `downloads-library`, `quick-previews`, `licensing-terms`
    - `courses-workshops`, `membership-insider`, `partner-portal`, `consulting-audits`, `api-integrations`
  - Added persisted sidebar collapse state in localStorage (`ss_nav_group_state`).
  - Added persisted hub filter state (`ss_hub_filters`) and saved hub item state (`ss_saved_hub_items`).
  - Added grouped-sidebar keyboard behavior (`ArrowLeft`/`ArrowRight` expand/collapse on parent items).
  - Added navigation search result rendering in main panel.
  - Added hub landing tag filters + `Save to Library` actions.
  - Added partner portal lead form handler.
  - Added analytics hooks for:
    - `hub_open`
    - `resource_view`
    - `download_click`
    - `bundle_add`
    - `membership_view`
    - `booking_initiate`
- `frontend/sidebar-config.json`
  - Added explicit sidebar configuration deliverable (labels, icons, order, routes).
- `analytics/events-and-gtm.md`
  - Documented new events + trigger naming.
- `analytics/ga4-event-schema.json`
  - Added event schema entries for new sidebar/platform events.
- `README.md`
  - Added nested sidebar structure and config edit location.

### Backward Compatibility Notes
- Existing IDs and key pages are preserved:
  - `home`, `newsletter`, `intellectual-hub`, `resources-hub`, `platform-hub`
  - Existing `gear`, `templates`, `case-studies`, `speaking`, `partnerships`, etc. remain available.
- Existing hash routing and panel rendering are unchanged.

### Rollback
1. Full rollback of this change set:
```bash
git checkout -- frontend/index.html frontend/css/style.css frontend/js/main.js frontend/sidebar-config.json analytics/events-and-gtm.md analytics/ga4-event-schema.json README.md PAGE-CHANGELOG.md
```

2. Partial rollback (sidebar-only):
```bash
git checkout -- frontend/index.html frontend/css/style.css frontend/js/main.js
```

3. If analytics changes need revert only:
```bash
git checkout -- analytics/events-and-gtm.md analytics/ga4-event-schema.json
```
