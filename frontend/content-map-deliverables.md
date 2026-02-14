# Futuristic Article Content Map Deliverables

## 1) UI Mockups

### Desktop (sticky horizontal map in article header)
```text
┌───────────────────────────────────────────────────────────────┐
│ Article Title + Meta                                          │
├───────────────────────────────────────────────────────────────┤
│ Content Map (sticky inside article panel)                     │
│ [Jump Pills →] [Quick Stats] [Related Insights Carousel]      │
│ [Next Steps popup appears at 50% scroll]                      │
├───────────────────────────────────────────────────────────────┤
│ Article Body                                                   │
│ H2/H3 sections, visuals, callouts, engagement blocks          │
└───────────────────────────────────────────────────────────────┘
```

### Tablet (stacked blocks)
```text
┌───────────────────────────────┐
│ Title + Meta                  │
│ Content Map                   │
│ [Pill Grid]                   │
│ [Stats 2-col + Bookmark CTA]  │
│ [Swipeable Related Cards]     │
└───────────────────────────────┘
```

### Mobile (full-width stacked, non-sticky)
```text
┌───────────────────────────┐
│ Title + Meta              │
│ Content Map               │
│ Pills (horizontal swipe)  │
│ Stats (single column)     │
│ Related cards (swipe)     │
│ Next step panel (inline)  │
└───────────────────────────┘
```

## 2) Interaction Specs

| Interaction | Motion | Timing / Curve |
| --- | --- | --- |
| TOC pill hover | `scale(1.04)` + soft shadow | `var(--motion-fast)` + `var(--easing-default)` |
| TOC click | Smooth section scroll + SR announcement | `smooth` (or `auto` on reduced motion) |
| Active pill underline | `scaleX(0 → 1)` | `var(--motion-fast)` |
| Quick stats entrance | fade + soft rise | `300ms`, `var(--easing-default)` |
| Related cards entrance | staggered fade + `translateY` | `340ms`, stagger `42ms` |
| Related card hover | raise + scale `1.03` | `var(--motion-fast)` |
| Next-step popup | slide + fade | `var(--motion-medium)` |

## 3) Code Snippets

### HTML partial (article header content map)
```html
<section class="article-content-map" data-content-map aria-label="Article content map">
  <p class="visually-hidden" data-content-map-live role="status" aria-live="polite"></p>
  <nav class="content-map-pill-row" aria-label="Jump to section links">
    <button class="content-map-pill" data-action="jump-to-section" data-section-id="summary-block">Executive Summary</button>
  </nav>
  <section class="content-map-block content-map-block-related" data-content-map-related data-source="ai" data-post-id="post-id">
    <div class="content-map-related-viewport" data-content-map-related-viewport>
      <div class="content-map-related-track" data-content-map-related-track></div>
    </div>
    <div class="content-map-pagination" data-content-map-pagination></div>
  </section>
</section>
```

### CSS tokens + structure
```css
.article-content-map {
  position: sticky;
  top: 14px;
  border: 1px solid color-mix(in srgb, var(--muted) 20%, var(--border));
  border-radius: 14px;
  background: color-mix(in srgb, var(--surface) 96%, var(--card));
}

.content-map-pill:hover { transform: scale(1.04); }
.content-map-pill.is-active .content-map-pill-underline { transform: scaleX(1); }
.content-map-related-viewport { overflow-x: auto; scroll-snap-type: x mandatory; }
.content-map-related-card { scroll-snap-align: start; }
```

### JS interaction module hooks
```js
scrollToContentMapSection(sectionId, sectionLabel);
updateContentMapActivePill(scrollContainer);
maybeHydrateContentMapRelated(progressValue);   // loads at >= 30%
updateContentMapNextStepPopup(progressValue);   // shows at >= 50%
trackAnalyticsEvent("toc_pin_clicked", payload);
trackAnalyticsEvent("section_scroll_complete", payload);
```

## 4) ARIA / Accessibility Documentation

- TOC pills: focusable `button`s with `aria-label`, `aria-current` on active section.
- Related cards: card container labeled and open button has explicit `aria-label`.
- Screen reader announcement: live region (`role="status"`, `aria-live="polite"`) announces section navigation.
- Bookmark CTA: keyboard reachable, `aria-pressed` state.
- Next-step popup: dismiss button with `aria-label`.
- Reduced motion: JS switches smooth scroll to `auto`; CSS animations disabled under `prefers-reduced-motion`.
- Color/contrast: uses existing theme tokens; no hardcoded low-contrast text on action controls.

## 5) QA Checklist

- [ ] TOC pills scroll to correct section in split-view desktop.
- [ ] Active pill updates while scrolling article body.
- [ ] Related insights do not fetch/render before 30% scroll.
- [ ] Next-step popup appears once at 50% scroll and can be dismissed.
- [ ] Events emitted: `toc_pin_clicked`, `related_card_clicked`, `ai_next_step_shown`, `bookmark_in_contentmap_clicked`, `section_scroll_complete`.
- [ ] Keyboard navigation works across pills, carousel controls, dots, bookmark CTA.
- [ ] `prefers-reduced-motion` removes non-essential animation.
- [ ] Mobile layout remains non-sticky and swipe-friendly.
- [ ] No split-view regression (focus mode, sidebar, scroll restoration, theme switching).

## 6) Testing Plan

### Unit tests
- `buildContentMapRelatedInsights`: dedupe, tag overlap, limit behavior.
- `getContentMapNextStep`: insight and fallback branches.
- `updateContentMapActivePill`: active-id selection by scroll offset.
- `maybeHydrateContentMapRelated`: threshold + single-load guard.

### Integration tests
- Open article in split view, click TOC pill, confirm smooth navigation and analytics.
- Scroll through article and verify:
  - related cards load at ~30%
  - next-step popup appears at ~50%
  - active pill changes with section.
- Click related card and verify post opens + `related_card_clicked`.
- Click content-map bookmark and verify toggle + `bookmark_in_contentmap_clicked`.

### Performance checks
- Ensure no early related-card render before threshold.
- Confirm transforms/opacity animation only.
- Validate no visible layout jump when related cards load (skeleton placeholders in place).
