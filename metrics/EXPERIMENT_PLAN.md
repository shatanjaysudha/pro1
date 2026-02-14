# Experiment and Validation Plan

## A/B test design
- Test group: users exposed to feature-enabled flow.
- Control group: existing flow with no predictive adaptation.
- Randomization unit: session ID.
- Sample ratio: 50/50 for primary experiments.

## Experiments
1. Intent-adaptive home ordering (F01)
- Success metric: first relevant click time.
- Guardrail: bounce rate increase must be <=2%.

2. Predictive panel exposure threshold (F02)
- Variant A: show at 20s.
- Variant B: show at 40s.
- Success metric: predictive card CTR and session depth.

3. Rescue prompt language variants (F04)
- Variant A: utilitarian copy.
- Variant B: coaching copy.
- Success metric: rescue acceptance rate.

4. Adaptive reading mode defaults (F05)
- Variant A: neutral focus default.
- Variant B: inferred mode default.
- Success metric: deep-read completion.

5. Prompt chip placement (F07)
- Variant A: inline only.
- Variant B: inline + sticky tray cue.
- Success metric: prompt interaction rate.

## Decision rules
- Minimum detectable effect threshold: 5% relative improvement.
- Confidence threshold: 95%.
- Stop conditions:
  - sustained degradation for 48h.
  - error budget breach.
