# MIGRATION PLAN

Generated: 2026-02-14T18:50:51+00:00
Source: https://shatanjaysudha.com/

## Target Folder Structure

```text
articles/
pages/
media/
  original/
  webp/
  lqip/
site_content_dump.json
navigation.json
taxonomy.json
seo_metadata.json
schema_data.json
internal_links_map.json
media_manifest.json
```

## Suggested Slug Strategy

- Keep slugs lowercase, hyphenated.
- Route articles to `/articles/<slug>/`.
- Route newsletter content to `/newsletter/<slug>/`.
- Route static pages to `/pages/<slug>/`.
- Preserve one-to-one old URL mapping in `internal_links_map.json`.

## 301 Redirect Strategy

Use deterministic redirects from legacy URLs to their new target paths.

- `https://shatanjaysudha.com/` -> `/pages/home/`
- `https://shatanjaysudha.com/anti-indian-racism-abroad` -> `/articles/anti-indian-racism-abroad/`
- `https://shatanjaysudha.com/build-10-lakh-portfolio-by-2025` -> `/articles/build-10-lakh-portfolio-by-2025/`
- `https://shatanjaysudha.com/carbon-offsets-and-credits-guide` -> `/articles/carbon-offsets-and-credits-guide/`
- `https://shatanjaysudha.com/debt-instruments-medium-term-wealth` -> `/articles/debt-instruments-medium-term-wealth/`
- `https://shatanjaysudha.com/earn-six-figures-in-2025-salary-growth-roadmap` -> `/articles/earn-six-figures-in-2025-salary-growth-roadmap/`
- `https://shatanjaysudha.com/explore-all` -> `/pages/explore-all/`
- `https://shatanjaysudha.com/explore-all/goal-setting-and-motivation` -> `/pages/explore-all-goal-setting-and-motivation/`
- `https://shatanjaysudha.com/explore-all/happiness-and-self-esteem` -> `/pages/explore-all-happiness-and-self-esteem/`
- `https://shatanjaysudha.com/iphone-17-pro-review` -> `/articles/iphone-17-pro-review/`
- `https://shatanjaysudha.com/long-term-investing-in-equities-guide` -> `/articles/long-term-investing-in-equities-guide/`
- `https://shatanjaysudha.com/mobile-phones` -> `/pages/mobile-phones/`
- `https://shatanjaysudha.com/nifty-50-index-funds-retirement-wealth-building` -> `/articles/nifty-50-index-funds-retirement-wealth-building/`
- `https://shatanjaysudha.com/page/12` -> `/pages/page-12/`
- `https://shatanjaysudha.com/page/2` -> `/pages/page-2/`
- `https://shatanjaysudha.com/page/3` -> `/pages/page-3/`
- `https://shatanjaysudha.com/real-estate-alternatives-for-young-earners-2025` -> `/articles/real-estate-alternatives-for-young-earners-2025/`
- `https://shatanjaysudha.com/short-term-money-mistakes` -> `/articles/short-term-money-mistakes/`
- `https://shatanjaysudha.com/tag/affiliate-marketing-guide` -> `/pages/tag-affiliate-marketing-guide/`
- `https://shatanjaysudha.com/tag/agentic-ai-systems` -> `/pages/tag-agentic-ai-systems/`
- `https://shatanjaysudha.com/tag/apple` -> `/pages/tag-apple/`
- `https://shatanjaysudha.com/tag/artificial-intelligence-trends` -> `/pages/tag-artificial-intelligence-trends/`
- `https://shatanjaysudha.com/tag/best-books-to-read` -> `/pages/tag-best-books-to-read/`
- `https://shatanjaysudha.com/tag/blogging-for-beginners` -> `/articles/tag-blogging-for-beginners/`
- `https://shatanjaysudha.com/tag/brother-and-sister-bond` -> `/pages/tag-brother-and-sister-bond/`
- `https://shatanjaysudha.com/tag/build-better-habits` -> `/pages/tag-build-better-habits/`
- `https://shatanjaysudha.com/tag/celebration-ideas` -> `/pages/tag-celebration-ideas/`
- `https://shatanjaysudha.com/tag/create-and-sell-ebooks` -> `/pages/tag-create-and-sell-ebooks/`
- `https://shatanjaysudha.com/tag/create-digital-content` -> `/pages/tag-create-digital-content/`
- `https://shatanjaysudha.com/tag/digital-products-guide` -> `/pages/tag-digital-products-guide/`

## Link Rewrite Strategy

- Rewrite internal links in markdown using `internal_links_map.json`.
- Flag unresolved links where `target_found=false`.
- Prioritize updates for high-traffic pages and navigation entries first.

## SEO Improvements During Import

- Fill missing meta title/description entries: 25 pages.
- Resolve unresolved internal links: 276 instances.
- Consolidate duplicate clusters: 5 clusters.
- Ensure canonical tags and OpenGraph tags are retained per page.
- Keep JSON-LD blocks attached to migrated content entries.
