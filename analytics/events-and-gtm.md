# GA4 + GTM Events

## Core event schema
- SS-001 (productivity-os): product_view, add_to_cart, purchase, download_complete
- SS-002 (deep-work-system): product_view, add_to_cart, purchase, download_complete
- SS-003 (weekly-planning-dashboard): product_view, add_to_cart, purchase, download_complete
- SS-004 (ai-prompt-vault): product_view, add_to_cart, purchase, download_complete
- SS-005 (google-sheets-profit-loss-dashboard): product_view, add_to_cart, purchase, download_complete
- SS-006 (things3-master-setup): product_view, add_to_cart, purchase, download_complete
- SS-007 (tally-quickstart-pack): product_view, add_to_cart, purchase, download_complete
- SS-008 (prompt-engineering-mini-course): product_view, add_to_cart, purchase, download_complete
- SS-009 (productivity-email-templates): product_view, add_to_cart, purchase, download_complete
- SS-010 (system-audit-workbook): product_view, add_to_cart, purchase, download_complete
- SS-011 (automations-pack): product_view, add_to_cart, purchase, download_complete
- SS-012 (career-leverage-playbook): product_view, add_to_cart, purchase, download_complete
- SS-013 (google-workspace-power-prompts): product_view, add_to_cart, purchase, download_complete
- SS-014 (focus-toolkit): product_view, add_to_cart, purchase, download_complete
- SS-015 (project-decision-matrix-kit): product_view, add_to_cart, purchase, download_complete
- SS-016 (startup-sops-template-bundle): product_view, add_to_cart, purchase, download_complete
- SS-017 (productivity-templates-mini-pack): product_view, add_to_cart, purchase, download_complete
- SS-018 (design-your-system-workshop-recording): product_view, add_to_cart, purchase, download_complete
- SS-019 (premium-newsletter-subscription): product_view, add_to_cart, purchase, download_complete
- SS-020 (google-sheets-advanced-functions-series): product_view, add_to_cart, purchase, download_complete
- SS-021 (productivity-audit-consulting-package): product_view, add_to_cart, purchase, download_complete
- SS-022 (affiliate-toolkit): product_view, add_to_cart, purchase, download_complete
- SS-023 (roadmap-planner-pack): product_view, add_to_cart, purchase, download_complete
- SS-024 (resource-library-membership): product_view, add_to_cart, purchase, download_complete
- SS-025 (everything-bundle): product_view, add_to_cart, purchase, download_complete

## GTM Trigger Naming Convention
- GTM_ProductView_<SKU>
- GTM_AddToCart_<SKU>
- GTM_Purchase_<SKU>
- GTM_DownloadComplete_<SKU>
- GTM_HubOpen
- GTM_ResourceView
- GTM_DownloadClick
- GTM_BundleAdd
- GTM_MembershipView
- GTM_BookingInitiate

## Sidebar + Platform Events
- `hub_open`
  - Params: `source`, `hub_page`
  - Trigger: sidebar click or hub page view under `Intellectual Hub`
- `resource_view`
  - Params: `source`, `resource_page`
  - Trigger: sidebar click or page view under `Resources`
- `download_click`
  - Params: `resource_id`, `source`
  - Trigger: any `Get` action before opening delivery modal
- `bundle_add`
  - Params: `resource_id` or `collection_id`, `source`, `count`
  - Trigger: add single resource or collection into bundle selection
- `membership_view`
  - Params: `source`, `page_id`
  - Trigger: `Membership / Insider` sidebar click + page view
- `booking_initiate`
  - Params: `source`, `page_id` or `organization`
  - Trigger: sidebar open for consulting/workshops, booking modal CTA, workshop submit

## A/B Testing Recommendation
- Test headline angle (clarity vs speed) and price point (A vs B).
- Monitor add-to-cart rate, purchase conversion, revenue per visitor, refund rate.
