# Content Strategy 2026

Last updated: February 14, 2026

## Purpose
This document defines a content strategy inspired by the structural strengths of `jeffsu.org`, while keeping all articles and framing fully original to Shatanjay Sudha.

## What Was Studied (Structure, Not Copy)
Observations from `jeffsu.org` style and architecture:
- Clear category-driven content streams (AI, Productivity, Career, tools/workspace).
- Practical, implementation-first writing (problem -> framework -> examples -> action).
- Reusable systems framing over one-off tips.
- Strong operational voice with short paragraphs and skimmable sections.
- Cross-linking between related topics to drive deeper session paths.

## High-Performing Theme Signals
Themes with strong practical demand and discoverability:
- AI for professionals: workflow design, prompt quality, automation governance.
- Productivity systems: weekly planning, deep work, execution architecture.
- Google Workspace and Sheets: formulas, dashboards, automation loops.
- Business systems: accounting clarity, reporting reliability, process discipline.
- Career leverage: portfolio assets, decision models, long-term positioning.
- Tool comparisons: workflow-fit decisions instead of feature-list comparisons.

## Original Cluster Map (Shatanjay Platform)
Primary clusters:
1. AI for Professionals
2. Execution Systems
3. Google Sheets Systems
4. Tally Financial Systems
5. Things 3 Workflows
6. AI + Google Workspace
7. Systems for Entrepreneurs
8. Digital Minimalism & Focus
9. Career Leverage
10. Career Architecture

## Publishing Standard (Per Article)
Every long-form article generated from `DISCOVER_TOPIC_CLUSTERS` must include:
- 1800+ words minimum (target range: 2000–3500 where depth requires it).
- Discover-ready headline angle.
- Hero image concept + generation prompt.
- 3 supporting image prompts with alt text and captions.
- 3 internal diagram placeholders.
- SEO block: meta title, meta description, slug, primary + secondary keywords.
- Internal link path (resource/template, related article, hub/category path).
- 1–2 outbound citations to high-authority sources.
- Practical implementation steps.
- Downloadable template idea.
- 2026 insights block.
- Summary + actionable checklist.
- Internal linkage path (related essays, category archive, templates).

## Editorial Tone Rules
- Calm, structured, operator-level.
- No motivational language.
- No hype or exaggerated claims.
- Practical over performative.
- Specific over generic.

## Visual and Diagram Guidance
For each article:
- Hero concept describes the exact scene and decision context.
- Diagram 1: System boundary map.
- Diagram 2: Workflow sequence and review gates.
- Diagram 3: Weekly scorecard (throughput, quality, rework).

## How To Edit Content
Primary file:
- `frontend/js/main.js`

Main constants/functions to edit:
- `DISCOVER_TOPIC_CLUSTERS`: topics, article titles, metadata.
- `buildDiscoverSections(...)`: section structure and writing framework.
- `buildHeroConcept(...)`: hero concept generator.
- `buildDiagramPlaceholders(...)`: internal diagram concepts.
- `buildTemplateIdea(...)`: downloadable template concept per article.
- `build2026Insights(...)`: year-specific insight logic.
- `buildActionChecklist(...)`: implementation checklist logic.
- `padDiscoverArticleLength(...)`: enforced word-count floor.

## Quality Gate Before Publish
Use this checklist before releasing new content:
- Is the article at least 1800 words?
- Does it solve one concrete operator problem?
- Are implementation steps specific and testable?
- Are diagram placeholders present and meaningful?
- Are image prompts + alt text + captions present for hero and supporting visuals?
- Are SEO fields complete (meta title, meta description, slug, keywords)?
- Are 1–2 high-authority outbound citations included?
- Is a template idea included?
- Are 2026-specific insights included?
- Are related links present (2 essays + 1 template + 1 category path)?
- Is tone crisp, non-fluffy, and practical?
