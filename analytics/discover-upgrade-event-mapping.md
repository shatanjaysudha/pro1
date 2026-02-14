# Discover Upgrade Event Mapping

## New/Updated Events

### `article_open`
- Trigger: split-view article is rendered in reader panel.
- Params: `source`, `post_id`, `title`, `category`.

### `theme_change`
- Trigger: theme option click (light/dark/auto).
- Params: `theme_choice`, `page`.

### Existing Events Verified in Flow
- `page_view`
- `article_view`
- `download_click`
- `download_complete`
- `add_to_cart`
- `purchase`
- `hub_open`
- `resource_view`
- `membership_view`
- `booking_initiate`

## GTM Trigger Notes
- Keep existing custom event trigger pattern (`event equals <event_name>`).
- Add two new triggers:
  - `EV - article_open`
  - `EV - theme_change`

## Recommended GA4 Dimensions
- `content_source`
- `content_category`
- `theme_choice`
- `is_discover_candidate` (optional future param)
