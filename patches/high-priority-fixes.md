# High-Priority Staging Fixes

## Scope Applied
- Discover readiness checks (automated, runtime).
- Schema and metadata hardening for article pages.
- SEO domain cleanup in sitemap/RSS feeds.
- Core rendering/performance refinements (image dimensions, article cache).
- Surprise enhancement: adaptive reading-path widget.

## Files Changed
- `frontend/js/main.js`
- `frontend/css/style.css`
- `frontend/index.html`
- `frontend/sitemap.xml`
- `frontend/rss.xml`
- `frontend/rss-ai.xml`
- `frontend/rss-career.xml`
- `frontend/rss-newsletter.xml`
- `frontend/rss-productivity.xml`
- `frontend/robots.txt`
- `analytics/ga4-event-schema.json`

## Feature Flags (rollback-safe)
In `frontend/js/main.js`:
- `FEATURE_FLAGS.discoverReadinessChecks`
- `FEATURE_FLAGS.adaptiveReadingPath`

Set either to `false` to disable without removing routing/features.

## Rollback Steps
1. Revert only Discover layer:
   - Set `discoverReadinessChecks: false`.
2. Revert surprise enhancement:
   - Set `adaptiveReadingPath: false`.
3. Full frontend rollback:
   - Restore previous versions of `frontend/js/main.js`, `frontend/css/style.css`, `frontend/index.html`.
4. Keep SEO feed fixes unless intentionally reverting domain:
   - `frontend/*.xml`, `frontend/robots.txt`.

## Notes
- Existing split view, reading mode, bookmarks, comments, command palette, theme switcher, and hash routing are preserved.
- Changes are additive and non-destructive.
