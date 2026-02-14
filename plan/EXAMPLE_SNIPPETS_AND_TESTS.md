# Example Code Snippets and Test Plan

## Example snippet: feature flags and state keys (frontend)
```js
const FEATURE_FLAGS = {
  ...FEATURE_FLAGS,
  predictiveIntentRadar: true,
  predictiveNextCard: true,
  frictionInterceptor: true,
  adaptiveReadingModeV2: true,
  inlinePromptSuggestions: true
};

const STORAGE_KEYS = {
  ...STORAGE_KEYS,
  intentProfile: "ss_intent_profile",
  intentSession: "ss_intent_session",
  frictionSignals: "ss_friction_signals",
  adaptiveUiPrefs: "ss_adaptive_ui_prefs",
  promptHistory: "ss_prompt_history"
};
```

## Example snippet: intent inference MVP
```js
function inferSessionIntentMvp(signals) {
  const score = { learn: 0, implement: 0, buy: 0 };
  if (signals.query.includes("how") || signals.query.includes("guide")) score.learn += 2;
  if (signals.savedCount > 0 || signals.downloadClicks > 0) score.implement += 2;
  if (signals.productViews > 1 || signals.cartClicks > 0) score.buy += 2;

  const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0] || ["learn", 0];
  const confidence = Math.min(0.95, 0.5 + best[1] * 0.1);
  return { intent: best[0], confidence };
}
```

## Example snippet: predictive ranking fallback
```js
function rankNextActions(candidates, context) {
  return candidates
    .map((item) => {
      const topicMatch = item.tags.some((t) => context.interests.has(t)) ? 1 : 0;
      const intentMatch = item.intent === context.intent ? 1 : 0.3;
      const progressGap = 1 - Math.min(1, context.completedSet.has(item.id) ? 1 : 0);
      const recency = 1 / (1 + item.daysOld / 30);
      const quality = item.qualityScore || 0.5;
      const score = 0.30 * topicMatch + 0.20 * intentMatch + 0.20 * progressGap + 0.15 * recency + 0.15 * quality;
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
```

## Unit test plan
- `inferSessionIntentMvp()` returns stable labels for known fixtures.
- Predictive ranking function preserves deterministic ordering.
- Friction score function throttles prompts correctly.
- Adaptive reading mode returns expected mode at threshold boundaries.
- Prompt suggestion fallback returns static list when API fails.

## Example unit test cases
```js
it("infers implement intent when save/download signals dominate", () => {
  const result = inferSessionIntentMvp({ query: "weekly system", savedCount: 2, downloadClicks: 1, productViews: 0, cartClicks: 0 });
  expect(result.intent).toBe("implement");
  expect(result.confidence).toBeGreaterThan(0.5);
});
```

## E2E test plan (Playwright/Cypress)
- User gets intent chip update after first interactions.
- Predictive panel appears after reading threshold.
- Friction nudge appears on synthetic repeated search loop.
- Adaptive reading mode badge switches under simulated pace changes.
- Prompt chip appears in tagged sections and copy action works.
- All features gracefully fallback when AI endpoints are mocked as unavailable.

## Deployment validation checklist
- Feature flags default off in production.
- Event payloads validate against schema.
- API rate limits and auth guard active.
- Accessibility smoke tests pass (tab order, focus, screen reader labels).
- Performance budget check: no >5% bundle regression.
