# Shatanjay Sudha — Digital Headquarters (Phase 6 Functional Expansion)

Premium sidebar-driven personal authority platform built with HTML, CSS, and vanilla JS.

## Run locally
1. `cd frontend`
2. `python3 -m http.server 8080`
3. Open `http://localhost:8080`

## Stack
- HTML + CSS + Vanilla JS
- Lucide icons CDN: `https://unpkg.com/lucide@latest`
- Fonts: `IBM Plex Sans` (UI) + `Allura` (signature SVG text) via Google Fonts

## Phase 6 implemented in this commit
1. Download intelligence:
   - Per-resource download counters (persistent)
   - Session + long-term download history
   - Offline download library page
2. Resource metadata depth:
   - File format, file size, setup time, difficulty
   - Compatibility labels (`Mac`, `Windows`, `Web`)
   - Tool compatibility labels (filterable)
   - Version + last updated + changelog support
3. Resource workflows:
   - Quick preview modal (no redirect)
   - Delivery modal with direct download or email-unlock flow
   - Post-download related-resource recommendations
4. Filtering and discovery upgrades:
   - Free/Premium filtering
   - Best-for filtering (`Students`, `Freelancers`, `Founders`, `Managers`)
   - Category-scoped search (`Templates`, `AI`, `Guides`) on Articles page
   - System Index directory (A-Z + filter)
5. Bundle and comparison tools:
   - Multi-resource bundle selection
   - Bundle clear/download actions
   - Featured collections (`AI Starter Kit`, `Productivity OS`, `30-Day Reset Pack`)
   - Side-by-side Resource Compare page
6. Save-state and library organization:
   - Differentiated saves: Articles, Templates, Guides
   - `My Library` page for saved content by type
7. Guide intelligence:
   - Interactive checklist mode per guide (local persistence)
   - Progress indicator per guide
   - Structured learning paths with step progress
8. Engagement signals:
   - Usefulness feedback (`Very Useful`, `Somewhat Useful`, `Needs Improvement`)
   - Trend labels (`Trending`, `Rising`, `Most Downloaded`)
9. Reader utility enhancement:
   - Quick action toolbar in article view:
     - Save
     - Download related template
     - Copy link
10. Print support:
    - Print-friendly mode retained and exposed in resource surfaces

## Where to edit content (non-technical)
All editable content is in `frontend/js/main.js` constants:
- `frontend/sidebar-config.json`: sidebar order, labels, icons, and flat navigation routes
- `frontend/CONTENT_STRATEGY_2026.md`: editorial strategy, cluster mapping, and quality gate checklist
- `DISCOVER_TOPIC_CLUSTERS`: primary long-form article library (Google Discover-ready clusters)
- Discover corpus standard: each generated long-form article is padded to `1800+` words and includes SEO + image prompt + citation metadata.
- Current corpus volume in `DISCOVER_TOPIC_CLUSTERS`: `66` articles across AI, Productivity, Google Sheets, Tally, Things 3, Career, and systems clusters.
- `DISCOVER_VISUAL_POOL`: hero and section visual pool used by long-form articles
- `buildHeroConcept(...)`: hero-image concept generator for each long-form article
- `buildDiscoverSeoBlock(...)`: meta title/description, slug, keyword block for Discover publishing
- `buildDiscoverImagePromptPack(...)`: hero + supporting image prompt objects (alt/caption/prompt)
- `buildDiscoverOutboundCitations(...)`: high-authority external references
- `buildDiscoverInternalLinks(...)`: internal link path (resource/template/article/hub)
- `buildDiagramPlaceholders(...)`: 3 internal diagram placeholders per article
- `buildTemplateIdea(...)`: downloadable template idea block per article
- `build2026Insights(...)`: updated insights logic for 2026 context
- `buildActionChecklist(...)`: actionable checklist block per article
- `TEMPLATE_TOOLKIT_CATALOG`: main template/toolkit catalog (cards + product page content)
- `HOME_FEATURED_TEMPLATE_IDS`: controls homepage Featured Systems items
- `GUIDE_HUB_ITEMS`: guide cards, metadata, filters, checklist labels
- `USE_CASE_PATHS`: curated use-case pages (article/template/guide links)
- `RESOURCE_TOOLS_DB`: Tools & Stack database entries
- `TRUST_BADGES`: home trust-strip icons/labels
- `COURSES_TOOLKITS`: Courses & Toolkits hub cards/external links
- `WORKSPACE_TOOLKIT_ITEMS`: Workspace Toolkit cards + delivery type
- `TEMPLATE_MARKET_ITEMS`: Templates gallery cards + preview text
- `DOWNLOAD_CENTER_ITEMS`: Download Center entries (format/size/type)
- `RESOURCE_METADATA`: Advanced metadata (difficulty, setup time, version, changelog, best-for, compatibility)
- `BEST_FOR_SEGMENTS`: Segment labels used in filtering
- `RESOURCE_COMPATIBILITY_LABELS`: Platform compatibility labels
- `FEATURED_COLLECTIONS`: Curated collection bundles
- `LEARNING_PATH_ROADMAP`: Learning path step sequences
- `TESTIMONIALS`: Home + Newsletter social proof content
- `GLOBAL_FAQS`: FAQ content (Global FAQ + help widget + course/toolkit FAQs)
- `HELP_COLLISION_CONFIG`: floating help collision selectors (global + per-page trigger zones)
- `NEWSLETTER_VIDEO_SPOTLIGHT`: Newsletter video carousel items
- `INLINE_MEDIA_BLOCKS`: Article/newsletter inline multimedia embeds
- `INLINE_ARTICLE_TESTIMONIALS`: Inline testimonial callouts in essays
- `ARTICLE_PROMOTION_BLOCKS`: Contextual inline CTAs in essays
- `CLUSTER_DEFINITIONS`: cluster landing copy + suggested start essay
- `ABOUT_TIMELINE`: About timeline milestones
- `MULTIMEDIA_ARCHIVE_ITEMS`: Multimedia archive entries
- `WORKSHOP_DATES`: Speaking/workshop upcoming dates
- `OFFER_TIERS`: Offer page pricing tiers
- `HOME_STORY_SNIPPETS`: Home narrative snippets

## Key pages/panels (Phase 6 + existing)
- Sidebar navigation (flat, non-collapsible):
  - `Home`
  - `Newsletter`
  - `I Am Hiring`
  - `Essential Power Prompts`
  - `Courses`
  - `Workspace Academy`
  - `AI`
  - `Productivity`
  - `Job Search`
  - `Career`
  - `Intellectual Hub`
  - `Resources`
  - `Platform`
- `Courses & Toolkits`
- `Workspace Toolkit`
- `Templates & Toolkits`
- `Guides`
- `Tools & Stack`
- `Multimedia Archive`
- `Download Center`
- `My Library`
- `Resource Compare`
- `Offline Library`
- `System Index`
- `Offer`
- `Global FAQ`
- `Template Product` (dynamic page)
- `Use Case` paths:
  - `I want better focus`
  - `I want to use AI effectively`
  - `I want career clarity`
  - `I want structured systems`

## Modal/interactive features
- Resource `Preview` modal (template preview overlay)
- Resource `Get` modal (direct download stub vs email delivery form)
- Purchase modal (payment/provider next-step stub)
- Video lightbox modal for YouTube cards
- Sitewide help widget with top FAQs + contact quick action
- Workshop request form validation + console logging + success toast
- Bundle download flow with resource aggregation modal
- Usefulness feedback voting per resource
- Interactive guide checklists + learning path progress persistence
- Newsletter testimonials carousel (autoplay + manual controls)
- Newsletter video carousel (autoplay + manual controls + lightbox playback)

## Acceptance checklist
- [x] Download counters persist per resource and are visible in resource pages
- [x] File metadata shown: format, size, compatibility, setup time, difficulty
- [x] Quick preview modal works without page navigation
- [x] Free/Premium + Best-for + compatibility filters are active
- [x] Session download history and clear action implemented
- [x] Interactive checklist mode + progress saved locally for guides
- [x] Version + last updated + changelog visible on template product page
- [x] Multi-download bundle flow implemented
- [x] Post-download related recommendations shown
- [x] Email-unlock flow available for gated resources
- [x] Saved content differentiated (Articles/Templates/Guides) in `My Library`
- [x] Usefulness feedback UI and counts available per resource
- [x] Tool compatibility labels displayed and filterable
- [x] Resource comparison tool implemented
- [x] Featured collections integrated with bundle flow
- [x] Trend indicators shown for resource cards
- [x] Category-scoped search added on Articles page
- [x] Offline download library implemented
- [x] Quick article action toolbar added
- [x] System index directory implemented


## Digital Products Packaging

Generated publishing assets live in:
- `products/<slug>/` (full product package)
- `landing-pages/` (landing copy + discover articles)
- `marketing/` (email/social/ad/reel assets)
- `analytics/` (GA4/GTM events, staging validation, A/B skeleton)
- `launch-calendar.csv` (30-day schedule)
- `publish-checklist.md` (global QA + go-live)

Regenerate all product assets with:
```bash
python3 scripts/generate_products.py
```

## Advanced Finance Template Package

New premium finance template package:
- `products/advanced-personal-finance-system/`

Core deliverable:
- `products/advanced-personal-finance-system/deliverables/personal-finance-system-builder.gs`

Build in Google Sheets:
1. Open a blank Google Sheet
2. Open `Extensions -> Apps Script`
3. Paste the builder script
4. Run `buildAdvancedPersonalFinanceSystem()`
5. Optional stress test: `qualityStressTestFinanceTemplate()`

## Discover Upgrade (2026-02-14)

Staging artifacts for the full-site Discover-readiness audit and patch:
- `audit-report.md`
- `patches/high-priority-fixes.md`
- `qa/staging-qa-report.md`
- `release-notes.md`
- `surprise/adaptive-reading-path.md`
- `analytics/discover-upgrade-event-mapping.md`
- `content/discover-drafts/` (5 rewrite drafts, human review required)

Feature flags in `frontend/js/main.js`:
- `FEATURE_FLAGS.discoverReadinessChecks`
- `FEATURE_FLAGS.adaptiveReadingPath`
