# Accessibility and Performance QoL Checklist

## Accessibility
- [ ] All engagement controls are keyboard reachable and actionable.
- [ ] Visible focus styles exist on quiz options, daily prompt actions, AI helper controls, and summary actions.
- [ ] Glossary popovers can be triggered by focus (not hover-only).
- [ ] Inline AI helper modal has keyboard close path (Escape + close button).
- [ ] Floating helper has descriptive label and does not block critical controls.
- [ ] Weekly summary copy/email controls are operable without pointer input.

## Motion Safety
- [ ] `prefers-reduced-motion` disables celebration particles and non-essential transitions.
- [ ] Celebration animation remains short and subtle (<700ms).
- [ ] No continuous decorative animation loops on content pages.

## Performance
- [ ] Engagement blocks render from local data/state only.
- [ ] No blocking network dependency in article render flow.
- [ ] Images and heavy media remain lazy-loaded where possible.
- [ ] Engagement timers do not leak intervals after rerender.
- [ ] New persisted maps (`articleReadSeconds`, milestones) are bounded.

## Analytics Integrity
- [ ] Existing events are unchanged for legacy controls.
- [ ] New events (`article_engagement_time`, weekly summary events) emit with required params.
- [ ] No duplicate events from rerender loops.
- [ ] Scroll and engagement milestones only fire once per entry per milestone.

## Print + Responsive
- [ ] Floating helper and non-essential interaction controls stay hidden in print mode.
- [ ] Mobile stack for weekly summary form is readable and touch-safe.
- [ ] Timeline, quiz, CTA, and related blocks remain usable at 320px width.

## Regression Guardrails
- [ ] Sidebar behavior unchanged.
- [ ] Split-view behavior unchanged.
- [ ] Reading mode unchanged.
- [ ] Search/filter behavior unchanged.
- [ ] Theme controls unchanged.
