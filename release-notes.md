# Release Notes — Discover Upgrade Patch

## Release Scope
- Discover readiness checks (article + platform + performance dashboard).
- Discover candidate editorial checklist surfaced in UI.
- Enhanced Article JSON-LD (ImageObject, publisher, wordCount).
- SEO feed cleanup (domain fixes in sitemap/RSS).
- Added robots policy (`max-image-preview:large`).
- Added adaptive reading-path widget (surprise enhancement).
- Added analytics events: `article_open`, `theme_change`.

## Staging -> Production Checklist
1. Deploy to staging branch/environment.
2. Validate nav, split view, reading mode, bookmarks, comments, theme, command palette.
3. Validate article schema in Rich Results Test.
4. Verify RSS/sitemap endpoint URLs return `shatanjaysudha.com` links.
5. Verify GA4/GTM receives `article_open` and `theme_change` events.
6. Run Lighthouse on Home, one Article, one Resource page.
7. Toggle feature flags if needed:
   - `discoverReadinessChecks`
   - `adaptiveReadingPath`
8. Approve 5 draft rewrites for publication after human review.
9. Push production deployment.

## Rollback
- Disable feature flags for immediate fallback.
- Revert modified frontend files listed in `patches/high-priority-fixes.md`.
