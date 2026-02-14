# Search UI Implementation

## Global entry points
- Sidebar search field (`siteSearch` + datalist suggestions)
- Command palette (`Cmd/Ctrl + K`)
- In-page search result surface via `filterNavigation(...)`

## Covered content types
- Pages
- Hub cards
- Posts
- Resources
- Prompts
- Tools

## Enhancements applied
- Contextual match highlighting in search results and command palette.
- Expanded command index with cross-content records.
- Search analytics instrumentation (`search_open`, `search_query`, `search_select`).
- Prompt-result routing and resource-result modal routing.
