# Engagement UI Guidelines

## Experience Direction
- Keep the current visual language and typography system.
- Use interaction emphasis through cards, tags, icon cues, and subtle gradients.
- Prioritize readability and implementation clarity over decorative complexity.

## Motion + Delight
- Easing baseline: `cubic-bezier(.22,.85,.4,1)`.
- Motion style: short fade + slight rise + micro-scale.
- Celebration motion: brief particle burst only on save/bookmark success.
- Reduced-motion mode: no non-essential animation.

## Reader Insertion Order
1. Dynamic CTA (personalized)
2. Daily challenge block
3. Core article body
4. End-of-article quiz (long-form only)
5. Smart related panel (why-next)
6. Signature + engagement bar + comments

## Mockups (Low-Fidelity)

### A) Inline Context AI Helper
```text
+---------------------------------------------------+
| Need help with this article?                   [X] |
| Context: title • date • read time                 |
| ------------------------------------------------- |
| Assistant: Ask me anything about this article...  |
| You: What should I do first?                      |
| Assistant: Start with checkpoint #1...            |
| ------------------------------------------------- |
| [Starter] [Starter] [Starter]                     |
| [Ask input............................] [Ask]     |
+---------------------------------------------------+
```

### B) End-of-Article Quiz
```text
+---------------------------------------------------+
| Interactive Quiz                                  |
| What should you do first in this scenario?        |
| [A] [B] [C]                                       |
| Instant feedback + explanation + wow prompt       |
| [Share Result]                                    |
+---------------------------------------------------+
```

### C) Smart Daily Prompt
```text
+---------------------------------------------------+
| Prompt of the Day                                 |
| Prompt text                                       |
| Why this matters                                  |
| [Use in ChatGPT] [Mark Complete]                  |
+---------------------------------------------------+
```

### D) Weekly Identity Summary (Surprise)
```text
+---------------------------------------------------+
| Your Weekly Insight Summary                       |
| Window + identity + confidence                    |
| Reads/minutes + active days + consistency         |
| Trend vs previous week                            |
| Top categories/topics + next reads                |
| [Copy Summary] [Email Me This Summary]            |
+---------------------------------------------------+
```

## Interaction Details
- Hover/focus state: small lift, subtle accent-border reinforcement.
- Glossary terms: dotted underline + keyboard-focus popover.
- Timeline nodes: direct "Open Step" action for progression.
- Helper FAB: persistent on article pages; compresses to full-width on narrow mobile.

## Responsive + Print
- Mobile: helper and form controls stack cleanly.
- Desktop split view remains unchanged.
- Print mode hides floating/interactivity-only controls.
