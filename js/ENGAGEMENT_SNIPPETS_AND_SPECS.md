# JS Engagement Specs and Snippets

## Core Storage Keys
From `frontend/js/main.js`:
- `STORAGE_KEYS.quizProgress`
- `STORAGE_KEYS.unlockedBadges`
- `STORAGE_KEYS.dailyChallengeState`
- `STORAGE_KEYS.weeklySummary`
- `STORAGE_KEYS.scrollDepthMilestones`
- `STORAGE_KEYS.articleReadSeconds`
- `STORAGE_KEYS.articleEngagementMilestones`

## Feature Flags in Use
- `engagementOverhaul`
- `inlineAiHelper`
- `articleQuizzes`
- `dailyChallenges`
- `smartRelatedPanel`
- `engagementBadges`
- `celebrationMicroFx`
- `interactiveHubTimeline`

## Implemented Modules
- Daily challenge selection/state: `getDailyChallenge`, `markDailyChallenge`
- Quiz engine: `getArticleQuiz`, `getQuizState`
- Badge progression: `getBadgeModels`, `evaluateBadgeUnlocks`
- Dynamic CTA personalization: `getReaderBehaviorProfile`, `getDynamicArticleCta`
- Smart related sequence: `getSmartRelatedRecommendations`
- Inline AI helper: `openInlineAiHelperModal`, `submitInlineAiQuestion`
- Celebration FX: `triggerCelebrationBurst`
- Scroll depth: `trackScrollDepthMilestones`
- Article engagement time milestones: `trackArticleEngagementTick`, `trackArticleEngagementMilestones`
- Surprise summary: `getWeeklyInsightSummary`, `buildWeeklySummaryLines`, `buildWeeklySummaryMailtoUrl`

## Snippet: Add Another Engagement-Time Milestone
```js
// inside trackArticleEngagementMilestones(...)
const milestones = [30, 60, 120, 180, 300, 600, 900];
```

## Snippet: Add Another Badge Rule
```js
ENGAGEMENT_BADGE_DEFINITIONS.push({
  id: "badge-share-5",
  title: "Amplifier",
  description: "Shared 5 articles.",
  icon: "megaphone"
});

// Extend unlock switch + progress snapshot:
// case "badge-share-5": return progress.shares >= 5;
```

## Snippet: Force Dashboard Summary Refresh
```js
state.weeklySummary.lastViewedKey = "";
renderPage("dashboard", { preserveScroll: true, focusMain: false });
```

## AI Upgrade Path (Optional)
Current helper is context-aware local logic. To move to model-backed responses:
1. Replace `buildInlineAiResponse(...)` with API request wrapper.
2. Keep current modal and starter chips unchanged.
3. Preserve existing events (`inline_ai_helper_open`, `inline_ai_helper_ask`).
4. Add timeout fallback to maintain non-blocking UX.

## Guardrails
- Keep all interactive controls keyboard-usable.
- Persist new state through `persistState()`.
- Do not block render path with async work.
- Maintain compatibility with split view, reading mode, and existing search/filter actions.
