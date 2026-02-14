# QA Checklist

## Functional
- [ ] Homepage renders brand story, featured categories, and deep CTA sections.
- [ ] Hero CTAs route to expected destination pages.
- [ ] Command palette search returns pages, posts, resources, prompts, tools, and hub cards.
- [ ] Search results show highlighted query matches.
- [ ] Resources hub suggestions (datalist + chips) apply query correctly.
- [ ] Resource detail modal opens from search and resources cards.
- [ ] Intellectual hub AI assistant returns recommendations and opens selected pages.

## Accessibility (WCAG AA target)
- [ ] Keyboard navigation reaches all newly added controls.
- [ ] Focus indicators visible in dark and light themes.
- [ ] Reduced-motion mode avoids non-essential animation.
- [ ] Inputs have labels and readable placeholders.

## Responsive
- [ ] Homepage new grids collapse correctly at <=980 and <=840 breakpoints.
- [ ] Resources hub cards/filters are usable on mobile.
- [ ] Hub AI assistant is single-column and readable on mobile.

## Analytics
- [ ] `search_open`, `search_query`, `search_select` emitted.
- [ ] `resources_autocomplete_select` emitted.
- [ ] `hub_ai_assistant_use` and `hub_ai_suggestion_open` emitted.

## Screenshot Capture Plan
- Capture set A: homepage desktop (hero + brand story + categories + go deeper).
- Capture set B: resources hub with active query + suggestion chips.
- Capture set C: intellectual hub AI assistant with populated recommendations.
- Capture set D: command palette search results with highlighted matches.

Suggested capture files:
- `frontend/rebuild/10-qa/screenshots/homepage-desktop.png`
- `frontend/rebuild/10-qa/screenshots/resources-hub-search.png`
- `frontend/rebuild/10-qa/screenshots/intellectual-hub-ai-assistant.png`
- `frontend/rebuild/10-qa/screenshots/command-palette-search.png`
