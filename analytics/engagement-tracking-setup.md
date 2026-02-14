# Engagement Tracking Setup Guide

## Objective
Instrument engagement-first experiences while preserving existing tracking behavior.

## Event Taxonomy

| Event Name | Trigger | Required Params |
|---|---|---|
| `scroll_depth` | Reader crosses 25/50/75/100% | `source`, `post_id`, `milestone` |
| `article_engagement_time` | Reader hits time milestone on article | `source`, `post_id`, `milestone_seconds`, `total_seconds` |
| `interactive_cta_click` | Dynamic CTA clicked | `cta_id`, `destination`, `source` |
| `inline_ai_helper_open` | Helper opened | `source`, `post_id` |
| `inline_ai_helper_ask` | Question submitted | `source`, `post_id`, `prompt_length` |
| `article_quiz_submit` | Quiz option selected | `quiz_id`, `source`, `post_id`, `correct` |
| `article_quiz_share` | Quiz share action used | `score` |
| `daily_prompt_use` | Prompt launched to ChatGPT | `challenge_id` |
| `daily_prompt_complete` | Daily challenge marked complete | `challenge_id` |
| `micro_insight_use` | Insight prompt copied | `insight_id` |
| `timeline_step_open` | Interactive timeline step opened | `timeline_id`, `page_id` |
| `badge_unlocked` | Badge transitions to unlocked | `badge_id`, `badge_title`, `trigger` |
| `save_celebration` | Save/bookmark celebration shown | `context` |
| `article_save` | Save toggled | `source`, `post_id`, `saved` |
| `article_share` | Share used | `source`, `post_id`, `shares` |
| `weekly_summary_view` | Weekly summary card viewed (once/day) | `identity`, `reads`, `consistency`, `trend` |
| `weekly_summary_copy` | Weekly summary copied | `identity`, `reads`, `consistency` |
| `weekly_summary_optin` | Weekly summary email form submitted | `source`, `identity`, `reads`, `consistency` |

## KPI Mapping

| KPI | Primary Event(s) | Calculation |
|---|---|---|
| Scroll depth | `scroll_depth` | sessions reaching each depth milestone |
| Engagement time/article | `article_engagement_time` | % articles reaching 30/60/120/300s |
| CTA engagement | `interactive_cta_click` | clicks / article views |
| AI helper usage | `inline_ai_helper_open`, `inline_ai_helper_ask` | ask/open ratio |
| Quiz participation | `article_quiz_submit` | submits / eligible long-form views |
| Save/share rate | `article_save`, `article_share` | saves+shares / article views |
| Daily prompt actions | `daily_prompt_use`, `daily_prompt_complete` | completion rate per challenge |
| Identity-loop adoption | `weekly_summary_view`, `weekly_summary_copy`, `weekly_summary_optin` | view->copy/optin conversion |

## Expected Improvements (Inference)
Assuming stable traffic and clean instrumentation over 4-8 weeks:

| KPI | Expected Movement |
|---|---:|
| Avg session duration | +14% to +26% |
| Bounce rate | -8% to -16% |
| 75% scroll-depth reach | +10% to +22% |
| Interactive CTA CTR | +15% to +32% |
| Save/bookmark actions | +18% to +36% |
| Weekly returning visitors | +9% to +18% |
| Newsletter conversion | +10% to +24% |

Inference basis: personalization, retrieval-practice, and progress-loop evidence summarized in `engagement-research/README.md`.

## GA4 Setup Notes
- Keep `scroll_depth` custom milestone tracking (granular).
- Register custom dimensions for:
  - `milestone`
  - `milestone_seconds`
  - `cta_id`
  - `quiz_id`
  - `challenge_id`
  - `timeline_id`
  - `identity`
  - `consistency`

## QA Checklist
1. Validate one event emission per user action.
2. Validate event payload keys in GA4 DebugView.
3. Verify reduced-motion mode does not suppress analytics.
4. Verify events survive split-view rerenders.
5. Confirm weekly summary view logs once per day.
6. Confirm email summary flow still fails gracefully when popup/mail client is blocked.

## References
- GA4 event reference: https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events
- GA4 recommended events: https://support.google.com/analytics/answer/9234069?hl=en
- Percent-scrolled dimension: https://support.google.com/analytics/answer/13439171?hl=en
