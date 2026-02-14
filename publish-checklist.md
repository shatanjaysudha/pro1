# Publish Checklist (Global)

## Pre-launch setup
- [ ] Confirm all 25 `/products/<slug>/` folders exist with required files.
- [ ] Validate secure download URLs and file integrity.
- [ ] Validate product metadata (price, tier, SKU, tags, license terms).
- [ ] Validate schema JSON-LD on each landing page.
- [ ] Validate accessibility: alt text, keyboard navigation, readable contrast.

## Checkout & delivery QA (staging)
- [ ] Test checkout payload for each product (success + cancel flows).
- [ ] Verify receipt email includes secure download link.
- [ ] Verify gated freebie email unlock flow.
- [ ] Verify bundle upsell appears when cart has 2+ items.

## Analytics QA
- [ ] Fire and verify `product_view`.
- [ ] Fire and verify `add_to_cart`.
- [ ] Fire and verify `purchase`.
- [ ] Fire and verify `download_complete`.
- [ ] Confirm GTM trigger naming convention is applied.

## Marketing readiness
- [ ] Launch email and 3 follow-ups scheduled per product.
- [ ] 3 social captions prepared per product.
- [ ] 15s Reel scripts prepared per product.
- [ ] Paid campaign prepared for flagship bundle.

## Go-live
- [ ] Publish priority products by launch calendar date.
- [ ] Monitor first-hour conversion and error logs.
- [ ] Trigger fallback support protocol for broken links.
- [ ] Run daily conversion snapshot and issue log.
