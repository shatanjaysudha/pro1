# Phase 4: Futuristic UX Spec (Shortlisted 5 Features)

Shortlisted features:
1. F01 Intent Radar + Adaptive Surface
2. F02 Predictive Content Forecasting Panel
3. F04 Friction Sentinel + Rescue UI
4. F05 Adaptive Reading Mode
5. F07 Inline Prompt Suggestion Engine

## Global UX constraints
- Contrast: WCAG 2.2 AA minimum for all text and controls.
- Keyboard: all controls operable without mouse.
- Focus: visible ring using existing `--focus` token and 3px outline.
- Motion: respect `prefers-reduced-motion`; use opacity-only fallback.

## Design token additions
- `--intent-learn`: `#2D9CDB`
- `--intent-implement`: `#27AE60`
- `--intent-buy`: `#F2994A`
- `--surface-elevated-2`: `#2B2D31`
- `--card-radius-lg`: `16px`
- `--motion-enter`: `220ms cubic-bezier(.2,.9,.25,1)`
- `--motion-emphasis`: `320ms cubic-bezier(.2,.9,.25,1)`

## F01: Intent Radar + Adaptive Surface

### Screens
- `home.intent-radar`
- `split.intent-radar`
- `intent.controls-modal`

### Interaction steps
1. User lands on page, radar chip starts in `Analyzing...` state.
2. After minimum signal threshold, intent chip resolves to one label.
3. Surface sections reorder with soft transition.
4. User can open intent controls and override.

### Element sizes and animations
- Intent chip desktop: `height 36px`, `min-width 140px`.
- Intent chip mobile: `height 34px`, `min-width 116px`.
- Reorder animation: `transform + opacity`, `220ms`, stagger `30ms`.

### Accessibility constraints
- Chip has `aria-live="polite"` when status changes.
- Override control is a proper segmented control with roving tabindex.
- Reorder updates should not move keyboard focus unexpectedly.

### Desktop and mobile flows
- Desktop: chip in hero utility row + settings icon.
- Mobile: chip pinned under top app bar; settings opens bottom sheet.

### Error states
- `INTENT_SIGNAL_LOW`: show neutral state “Explore mode active”.
- `INTENT_SERVICE_DOWN`: fallback to rules-only local intent.

## F02: Predictive Content Forecasting Panel

### Screens
- `home.predictive-panel`
- `split.predictive-next`
- `predictive.feedback-sheet`

### Interaction steps
1. User reads for threshold time.
2. Forecast panel slides in with 3 cards.
3. User selects `Open`, `Save`, or `Dismiss`.
4. Feedback sheet captures “Not relevant” reasons.

### Element sizes and animations
- Panel width desktop: `320px`; mobile: full-width bottom card.
- Card height: `88px` compact, `112px` expanded.
- Entry animation: slide-up `180ms`; exit `140ms`.

### Accessibility constraints
- Cards are list items with clear heading, reason text, and action button.
- Dismiss is keyboard reachable and announced.
- Panel does not trap focus unless expanded modal mode is opened.

### Desktop and mobile flows
- Desktop: fixed right rail near reader header.
- Mobile: collapsible bottom panel with swipe handle.

### Error states
- `RANKING_TIMEOUT`: show last cached recommendations.
- `NO_RECOMMENDATIONS`: show empty state with manual category shortcuts.

## F04: Friction Sentinel + Rescue UI

### Screens
- `split.friction-alert`
- `home.friction-nudge`
- `rescue.action-modal`

### Interaction steps
1. Friction score crosses threshold.
2. Nudge appears with one primary rescue action.
3. User accepts rescue or dismisses.
4. System cools down prompt frequency.

### Element sizes and animations
- Nudge toast desktop: `max-width 420px`.
- Nudge toast mobile: `calc(100vw - 24px)`.
- Pulse cue (optional): `2 cycles`, `320ms` each, then static.

### Accessibility constraints
- Nudge uses `role="status"` and can be dismissed by keyboard.
- No autoplay audio/vibration.
- Prompt frequency capped to reduce cognitive overload.

### Desktop and mobile flows
- Desktop: bottom-right above help widget lane.
- Mobile: anchored inline below active content header.

### Error states
- `FRICTION_FALSE_POSITIVE`: quick “Not helpful” action suppresses similar prompts.
- `FRICTION_MODEL_ERROR`: no prompt shown; logging-only mode.

## F05: Adaptive Reading Mode

### Screens
- `split.reading-mode-banner`
- `split.reader-mode-controls`
- `settings.reading-preferences`

### Interaction steps
1. User enters article.
2. System classifies mode (`skim`, `focus`, `study`).
3. Typography and pane ratios adapt.
4. User pins preferred mode or returns to auto.

### Element sizes and animations
- Mode badge: `32px` height, icon + label.
- Reader width range desktop: `640px` to `860px`.
- Transition: font-size and spacing animate over `200ms`.

### Accessibility constraints
- Dynamic font changes limited to prevent disorientation.
- Respect browser zoom and user font-size preferences.
- Provide static mode lock for assistive technology users.

### Desktop and mobile flows
- Desktop: mode switch near split toolbar.
- Mobile: mode switch inside reading quick-actions tray.

### Error states
- `MODE_CLASSIFIER_LOW_CONFIDENCE`: stay in neutral `focus` mode.
- `TOKEN_OVERRIDE_FAIL`: revert to baseline design tokens.

## F07: Inline Prompt Suggestion Engine

### Screens
- `article.inline-prompt-chip`
- `article.prompt-tray`
- `prompt.feedback-popover`

### Interaction steps
1. User reaches high-intent section.
2. Prompt chip appears inline.
3. User copies or sends prompt to concierge.
4. User can rate relevance.

### Element sizes and animations
- Prompt chip: `height 30px`, pill shape.
- Prompt tray desktop width: `360px`; mobile full-width drawer.
- Chip reveal: fade + y-translate `140ms`.

### Accessibility constraints
- Chip includes visible label and assistive description.
- Copy action announces success via polite live region.
- Prompt tray supports full keyboard navigation.

### Desktop and mobile flows
- Desktop: right-side tray with sticky behavior.
- Mobile: bottom sheet with prompt cards and single primary CTA.

### Error states
- `PROMPT_SERVICE_DOWN`: show static fallback prompts from local library.
- `PROMPT_EMPTY`: hide tray and keep section spacing stable.
