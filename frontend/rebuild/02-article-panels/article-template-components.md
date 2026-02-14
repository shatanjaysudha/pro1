# Article Panel Template Components

## Included components (implemented)
- Rich reader header with subtitle/meta/tags.
- Reading progress bar + depth indicator.
- Sticky content map with jump pills.
- Related insight carousel + next-step popup.
- Contextual CTA + inline newsletter insert.
- AI helper launcher and adaptive reading path.
- Related essays/systems + engagement reactions/comments.

## Component map
- `renderReader(...)` renders the full article panel shell.
- `getPostMeta(...)` computes TOC, summary, difficulty, dependencies.
- `updateContentMapActivePill(...)` keeps TOC state synced to scroll.
- `maybeHydrateContentMapRelated(...)` lazily loads related cards.
- `updateContentMapNextStepPopup(...)` shows contextual next-step module.
