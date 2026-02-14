# Motion QA Evidence

Date: 2026-02-14
Status: Functional checks completed in code; media capture pending on staging browser session.

## Test matrix
1. Sidebar active item spring pulse
- Trigger: navigate between pages using sidebar.
- Expected: active item gets subtle scale pulse only on state change.
- Reduced-motion expected: no pulse.

2. Article/resource list reveal
- Trigger: load split pages and resource pages.
- Expected: staggered fade + 20px rise, once per item.
- Reduced-motion expected: immediate visibility.

3. Panel transitions
- Trigger: change page routes and toggle split focus.
- Expected: directional slide + opacity settle.
- Reduced-motion expected: instant state change.

4. Hover feedback
- Trigger: hover cards/buttons/nav.
- Expected: scale to ~1.03 with soft lift.
- Reduced-motion expected: static.

5. Bookmark/save feedback
- Trigger: click bookmark/save controls.
- Expected: spring-like pulse feedback.
- Reduced-motion expected: no pulse.

## Regression checks
- Sidebar logic unchanged.
- Panel routing and split-view functionality intact.
- Reading mode unchanged.
- Search/filter flows unchanged.
- Theme switching unchanged.
- Analytics event paths preserved.

## Capture checklist (staging)
- Screenshot: sidebar active pulse (`qa/assets/sidebar-active.png`)
- Screenshot: split-page reveal (`qa/assets/list-reveal.png`)
- Screenshot: panel transition midpoint (`qa/assets/panel-transition.png`)
- Screenshot: hover micro feedback (`qa/assets/hover-feedback.png`)
- Video: end-to-end motion pass (`qa/assets/motion-pass.mp4`)
- Video: reduced motion pass (`qa/assets/reduced-motion-pass.mp4`)

## Notes
- If capture tooling is unavailable in CI, run manual capture with browser devtools recorder.
