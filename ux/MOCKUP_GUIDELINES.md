# Mockup Guidelines (Figma + Tokens)

## File structure recommendation
- Page 1: `00 Foundations`
- Page 2: `01 Components`
- Page 3: `02 Flows Desktop`
- Page 4: `03 Flows Mobile`
- Page 5: `04 Error and Edge States`
- Page 6: `05 Accessibility QA`

## Frame standards
- Desktop base frame: `1440 x 1024`
- Tablet frame: `1024 x 1366`
- Mobile frame: `390 x 844`
- Spacing system: `8px` base grid.

## Component inventory
- Intent chip group (default/loading/resolved/error).
- Predictive panel (loading/ready/empty/error).
- Rescue nudge (warning/info/success).
- Reading mode badge and segmented control.
- Prompt chip and prompt tray card.

## Motion specs for prototypes
- Standard enter: `220ms ease-out`.
- Standard exit: `140ms ease-in`.
- Reorder motion: max `260ms`; no spring effects.
- Reduce motion mode: opacity transition only.

## Design token mapping
- Map new tokens in `frontend/css/style.css` under `:root` and theme overrides.
- Keep typography tied to existing `--h*` and `--body-size` variables.
- Add feature-specific tokens with `--ai-*` prefix.

## Accessibility checklist for mockups
- Minimum touch target: `44 x 44` on mobile.
- Focus order annotated on every interactive frame.
- Color contrast annotations for all semantic states.
- Error copy must include action-oriented recovery guidance.
