/*
  Discover-Ready Site Script
  -----------------------------------------------------------------
  Customization quick-start:
  1) Update SITE.brandName, SITE.baseUrl, and SITE.social links.
  2) Replace placeholder checkout links in CHECKOUT_LINKS.
  3) Edit articles[] and templates[] data objects below.
  4) Replace placeholder Unsplash image URLs with your own assets.
*/

(() => {
  "use strict";

  const SITE = {
    brandName: "Shatanjay Sudha",
    baseUrl: "https://shatanjaysudha.com",
    audience: "Students and young professionals",
    defaultOgImage:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
    social: {
      x: "https://x.com",
      facebook: "https://www.facebook.com",
      linkedin: "https://www.linkedin.com",
      youtube: "https://www.youtube.com"
    }
  };

  const CHECKOUT_LINKS = {
    gumroadDefault: "https://gumroad.com",
    paypalDefault: "https://paypal.com"
  };

  const STORAGE_KEYS = {
    newsletter: "ss_newsletter_subscribers",
    darkMode: "ss_dark_mode",
    readingHistory: "ss_reading_history",
    contactSubmissions: "ss_contact_submissions"
  };

  const AUTHOR = {
    name: "Shatanjay Sudha",
    bio: "Systems builder focused on practical productivity, AI workflows, and career execution for students and young professionals."
  };

  const templateSeed = [
    {
      id: 1,
      name: "Weekly Focus OS",
      slug: "weekly-focus-os",
      description: "Plan and execute your week with a low-friction review cadence.",
      fullDescription:
        "Weekly Focus OS is a lightweight Notion setup designed to help you plan, execute, and review without overwhelm. It includes a weekly planning board, execution checkpoints, and a Friday reflection workflow so your system stays alive in real weeks.",
      price: 0,
      isFree: true,
      category: "student",
      features: ["Weekly planner", "Priority dashboard", "Friday review checklist"],
      images: [
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [12, 13, 14],
      buyUrl: "https://gumroad.com/l/weekly-focus-os",
      rating: 4.8,
      requirements: ["Notion account", "30 minutes setup", "Weekly review habit"]
    },
    {
      id: 2,
      name: "AI Workflow Blueprint",
      slug: "ai-workflow-blueprint",
      description: "Deploy AI steps in real workflows without quality drift.",
      fullDescription:
        "AI Workflow Blueprint gives you prompt specs, review checkpoints, and a quality rubric to run AI tasks with consistency. Built for operators who want repeatable output quality, not random wins.",
      price: 49,
      isFree: false,
      category: "business",
      features: ["Prompt spec template", "QA rubric", "Workflow governance checklist"],
      images: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [8, 9, 10, 11],
      buyUrl: "https://gumroad.com/l/ai-workflow-blueprint",
      rating: 4.9,
      requirements: ["Any LLM tool", "Basic workflow knowledge", "1 hour setup"]
    },
    {
      id: 3,
      name: "Career Compounding Canvas",
      slug: "career-compounding-canvas",
      description: "Design long-term career moves with structured trade-off clarity.",
      fullDescription:
        "Career Compounding Canvas helps you evaluate opportunities using clear criteria: learning slope, leverage potential, and long-term positioning. Great for students and young professionals navigating role decisions.",
      price: 0,
      isFree: true,
      category: "career",
      features: ["Opportunity scorecard", "Skill compounding tracker", "Decision matrix"],
      images: [
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [15, 16, 17, 18],
      buyUrl: "https://gumroad.com/l/career-compounding-canvas",
      rating: 4.7,
      requirements: ["Notion or Google Sheets", "Quarterly career review"]
    },
    {
      id: 4,
      name: "Quarterly Planning System",
      slug: "quarterly-planning-system",
      description: "Translate strategic goals into realistic execution sprints.",
      fullDescription:
        "Quarterly Planning System links big goals with monthly milestones and weekly actions. It is built to close the gap between planning excitement and day-to-day execution.",
      price: 39,
      isFree: false,
      category: "planning",
      features: ["Quarter map", "Milestone tracker", "Weekly bridge board"],
      images: [
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [1, 4, 12],
      buyUrl: "https://gumroad.com/l/quarterly-planning-system",
      rating: 4.6,
      requirements: ["Notion account", "Quarterly planning session"]
    },
    {
      id: 5,
      name: "Notion Knowledge OS",
      slug: "notion-knowledge-os",
      description: "Build a calm second-brain with reliable retrieval and review loops.",
      fullDescription:
        "Notion Knowledge OS organizes capture, tagging, and review so your ideas remain useful over time. Designed for students, writers, and researchers who want long-term clarity.",
      price: 59,
      isFree: false,
      category: "student",
      features: ["Capture inbox", "Source tagging", "Review cadence board"],
      images: [
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [5, 6, 7],
      buyUrl: "https://gumroad.com/l/notion-knowledge-os",
      rating: 4.9,
      requirements: ["Notion account", "Tagging discipline"]
    },
    {
      id: 6,
      name: "Decision Framework Kit",
      slug: "decision-framework-kit",
      description: "Apply mental models to high-stakes decisions with clear trade-offs.",
      fullDescription:
        "Decision Framework Kit includes practical worksheets for inversion, pre-mortem, and opportunity-cost analysis. Use it to make faster and more confident decisions.",
      price: 0,
      isFree: true,
      category: "business",
      features: ["Decision framing template", "Trade-off table", "Pre-mortem worksheet"],
      images: [
        "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [11, 18],
      buyUrl: "https://gumroad.com/l/decision-framework-kit",
      rating: 4.8,
      requirements: ["15-minute decision review slot"]
    },
    {
      id: 7,
      name: "Productivity OS — Notion System",
      slug: "productivity-os",
      description: "A full operating system for planning, execution, and review.",
      fullDescription:
        "Productivity OS is a full-stack Notion workspace for weekly planning, deep work scheduling, and reflection. Built from real operator workflows with templates that stay useful as responsibilities grow.",
      price: 156,
      isFree: false,
      category: "student",
      features: ["Execution dashboard", "Weekly review engine", "Goal-to-action mapping"],
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [12, 14, 17],
      buyUrl: "https://gumroad.com/l/productivity-os",
      rating: 4.9,
      requirements: ["Notion account", "90-minute setup"]
    },
    {
      id: 8,
      name: "AI Prompt Vault (200 Prompts)",
      slug: "ai-prompt-vault",
      description: "A categorized prompt library for work, writing, and strategy.",
      fullDescription:
        "AI Prompt Vault gives you 200 practical prompts organized by objective, context, and output style. It is designed to reduce trial-and-error and speed up quality output across common work tasks.",
      price: 24,
      isFree: false,
      category: "ai",
      features: ["200 production prompts", "Prompt categories by use-case", "Quick-start guide"],
      images: [
        "https://images.unsplash.com/photo-1677442135136-760c813029c0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [2, 8, 9],
      buyUrl: "https://gumroad.com/l/ai-prompt-vault",
      rating: 4.7,
      requirements: ["Any LLM tool", "15-minute setup"]
    },
    {
      id: 9,
      name: "Weekly Planning Dashboard",
      slug: "weekly-planning-dashboard",
      description: "A Google Sheets planner for weekly priorities and time blocks.",
      fullDescription:
        "Weekly Planning Dashboard is a clean Google Sheets template for weekly outcomes, time blocks, and review metrics. Great for users who prefer spreadsheets over full workspace tools.",
      price: 11,
      isFree: false,
      category: "google-sheets",
      features: ["Priority planner", "Time-block tracker", "Weekly review metrics"],
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551281044-8b7eaec3c0f2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
      ],
      tutorialLink: "https://youtube.com",
      relatedArticles: [1, 4, 13],
      buyUrl: "https://gumroad.com/l/weekly-planning-dashboard",
      rating: 4.6,
      requirements: ["Google account", "20-minute setup"]
    }
  ];

  const articleSeed = [
    {
      id: 1,
      title: "Google Sheets: The Formula Fix That Updates Itself",
      slug: "google-sheets-formula-fix-updates-itself",
      excerpt: "Build formulas that survive structure changes without constant repair.",
      datePublished: "2026-02-13",
      dateModified: "2026-02-14",
      readTime: 7,
      featuredImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
      tags: ["google-workspace", "automation", "systems"],
      category: "tutorials",
      relatedTemplates: [9, 4],
      quote: "Durable spreadsheets are designed like systems, not quick hacks.",
      takeaways: [
        "Separate data input, transformation, and reporting layers.",
        "Use named ranges to reduce breakage from structural changes.",
        "Audit formula dependencies weekly."
      ],
      templateSlug: "weekly-planning-dashboard",
      relatedArticleSlug: "time-blocks-that-survive-real-workdays"
    },
    {
      id: 2,
      title: "Google Gemini: A Generalist Prompt That Makes You Look Smart",
      slug: "gemini-generalist-prompt-that-makes-you-look-smart",
      excerpt: "A reusable prompt skeleton for analysis, synthesis, and execution planning.",
      datePublished: "2026-02-06",
      dateModified: "2026-02-10",
      readTime: 6,
      featuredImage:
        "https://images.unsplash.com/photo-1677442135136-760c813029c0?auto=format&fit=crop&w=1600&q=80",
      tags: ["ai", "prompting", "writing"],
      category: "ai",
      relatedTemplates: [8, 2],
      quote: "Prompt quality is specification quality.",
      takeaways: [
        "Define role, objective, constraints, and output format.",
        "Add a quality gate before you trust the output.",
        "Create reusable prompt templates per use-case."
      ],
      templateSlug: "ai-prompt-vault",
      relatedArticleSlug: "10-percent-ai-tools-drive-90-percent-results"
    },
    {
      id: 3,
      title: "Google Contacts: The Lazy Person's Guide to Contact Management",
      slug: "lazy-guide-google-contacts-management",
      excerpt: "Design a low-maintenance contact system that keeps your network useful.",
      datePublished: "2026-01-30",
      dateModified: "2026-02-05",
      readTime: 5,
      featuredImage:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80",
      tags: ["google-workspace", "productivity", "networking"],
      category: "tutorials",
      relatedTemplates: [1, 7],
      quote: "Useful systems are the ones you can maintain on busy weeks.",
      takeaways: [
        "Capture minimal but important context.",
        "Tag contacts by relationship and priority.",
        "Use one monthly review ritual."
      ],
      templateSlug: "weekly-focus-os",
      relatedArticleSlug: "build-career-portfolio-not-just-resume"
    },
    {
      id: 4,
      title: "Google Calendar: Turn Your Tasks Into Time Blocks",
      slug: "turn-tasks-into-time-blocks",
      excerpt: "Translate task lists into realistic execution blocks.",
      datePublished: "2026-01-23",
      dateModified: "2026-01-29",
      readTime: 8,
      featuredImage:
        "https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?auto=format&fit=crop&w=1600&q=80",
      tags: ["time-management", "planning", "productivity"],
      category: "productivity",
      relatedTemplates: [1, 9, 4],
      quote: "Tasks become real only when they get time on your calendar.",
      takeaways: [
        "Schedule high-energy work first.",
        "Use fallback blocks for interruptions.",
        "Keep buffer time between deep sessions."
      ],
      templateSlug: "weekly-focus-os",
      relatedArticleSlug: "weekly-review-that-actually-sticks"
    },
    {
      id: 5,
      title: "Google Chrome: 3 Tips That Won Me $100 in Bets",
      slug: "google-chrome-3-productivity-tips",
      excerpt: "Browser defaults that compound into real productivity gains.",
      datePublished: "2026-02-13",
      dateModified: "2026-02-13",
      readTime: 9,
      featuredImage:
        "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1600&q=80",
      tags: ["browser", "systems", "focus"],
      category: "tutorials",
      relatedTemplates: [5, 1],
      quote: "Attention follows defaults, not motivation.",
      takeaways: [
        "Use dedicated browser profiles by context.",
        "Pin only recurring workflow tabs.",
        "Create a shutdown ritual for tabs."
      ],
      templateSlug: "notion-knowledge-os",
      relatedArticleSlug: "cut-context-switching-in-half"
    },
    {
      id: 6,
      title: "Google Docs: The Editing Shortcut Most People Miss",
      slug: "google-docs-editing-shortcut",
      excerpt: "How to reduce editing friction with keyboard-native review.",
      datePublished: "2026-02-06",
      dateModified: "2026-02-09",
      readTime: 6,
      featuredImage:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
      tags: ["writing", "google-workspace", "productivity"],
      category: "tutorials",
      relatedTemplates: [5, 8],
      quote: "Editing quality improves when the review sequence is explicit.",
      takeaways: [
        "Structure first, sentence polish later.",
        "Convert comments into concrete tasks.",
        "Run one clarity pass at the end."
      ],
      templateSlug: "notion-knowledge-os",
      relatedArticleSlug: "gemini-generalist-prompt-that-makes-you-look-smart"
    },
    {
      id: 7,
      title: "Gemini: Your Files + The Entire Web in One Prompt",
      slug: "gemini-files-plus-web-in-one-prompt",
      excerpt: "How to combine internal context and external context responsibly.",
      datePublished: "2026-01-16",
      dateModified: "2026-01-21",
      readTime: 7,
      featuredImage:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1600&q=80",
      tags: ["ai", "research", "systems"],
      category: "ai",
      relatedTemplates: [5, 2, 8],
      quote: "Synthesis is only as strong as source quality.",
      takeaways: [
        "Define source boundaries before prompting.",
        "Ask for source-backed claims.",
        "Treat AI synthesis as draft, not final truth."
      ],
      templateSlug: "ai-workflow-blueprint",
      relatedArticleSlug: "if-overwhelmed-by-ai-tools-read-this"
    },
    {
      id: 8,
      title: "If You're Overwhelmed by AI Tools, Read This",
      slug: "if-overwhelmed-by-ai-tools-read-this",
      excerpt: "Focus on workflows, not tool hype.",
      datePublished: "2026-02-03",
      dateModified: "2026-02-08",
      readTime: 11,
      featuredImage:
        "https://images.unsplash.com/photo-1677442135136-760c813029c0?auto=format&fit=crop&w=1600&q=80",
      tags: ["ai", "strategy", "execution"],
      category: "ai",
      relatedTemplates: [2, 8],
      quote: "Pick one workflow and improve it weekly before adding tools.",
      takeaways: [
        "Solve one expensive problem first.",
        "Document prompt and QA standards.",
        "Scale only after stable output quality."
      ],
      templateSlug: "ai-workflow-blueprint",
      relatedArticleSlug: "start-with-problem-not-tool"
    },
    {
      id: 9,
      title: "The 10% of AI Tools That Drive 90% of My Results",
      slug: "10-percent-ai-tools-drive-90-percent-results",
      excerpt: "A compact stack that prioritizes leverage and reliability.",
      datePublished: "2026-01-20",
      dateModified: "2026-01-24",
      readTime: 8,
      featuredImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      tags: ["ai", "productivity", "automation"],
      category: "ai",
      relatedTemplates: [8, 2],
      quote: "Smaller stacks usually produce stronger execution.",
      takeaways: [
        "Keep tool roles clear.",
        "Measure output quality weekly.",
        "Retire low-leverage tools."
      ],
      templateSlug: "ai-prompt-vault",
      relatedArticleSlug: "if-overwhelmed-by-ai-tools-read-this"
    },
    {
      id: 10,
      title: "6 AI Trends That Actually Matter for Your Work in 2026",
      slug: "ai-trends-that-matter-2026",
      excerpt: "The trends that will affect real workflows this year.",
      datePublished: "2026-01-06",
      dateModified: "2026-01-16",
      readTime: 9,
      featuredImage:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
      tags: ["ai", "career", "future-of-work"],
      category: "ai",
      relatedTemplates: [2, 8, 3],
      quote: "Workflow-native AI adoption will define high-performing teams.",
      takeaways: [
        "Move from prompt hacks to process design.",
        "Use human-in-the-loop checkpoints.",
        "Strengthen source and data quality."
      ],
      templateSlug: "ai-workflow-blueprint",
      relatedArticleSlug: "start-with-problem-not-tool"
    },
    {
      id: 11,
      title: "Start With the Problem, Not the Tool",
      slug: "start-with-problem-not-tool",
      excerpt: "Why problem-first framing prevents wasted implementation cycles.",
      datePublished: "2025-12-22",
      dateModified: "2026-01-03",
      readTime: 10,
      featuredImage:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
      tags: ["ai", "decision-making", "strategy"],
      category: "ai",
      relatedTemplates: [6, 2],
      quote: "A clear bottleneck beats a shiny tool every time.",
      takeaways: [
        "Define the bottleneck in one sentence.",
        "Design one measurable intervention.",
        "Scale only after quality stabilizes."
      ],
      templateSlug: "decision-framework-kit",
      relatedArticleSlug: "if-overwhelmed-by-ai-tools-read-this"
    },
    {
      id: 12,
      title: "The Weekly Review That Actually Sticks",
      slug: "weekly-review-that-actually-sticks",
      excerpt: "A fixed review cadence that survives busy schedules.",
      datePublished: "2026-01-29",
      dateModified: "2026-02-01",
      readTime: 7,
      featuredImage:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
      tags: ["planning", "execution", "productivity"],
      category: "productivity",
      relatedTemplates: [1, 4, 7],
      quote: "Consistency wins when your review loop is short and specific.",
      takeaways: [
        "Use a fixed 30-minute checklist.",
        "Schedule next actions before closing the review.",
        "Delete stale commitments weekly."
      ],
      templateSlug: "weekly-focus-os",
      relatedArticleSlug: "time-blocks-that-survive-real-workdays"
    },
    {
      id: 13,
      title: "Time Blocks That Survive Real Workdays",
      slug: "time-blocks-that-survive-real-workdays",
      excerpt: "Flexible time blocking without calendar fantasy.",
      datePublished: "2026-01-18",
      dateModified: "2026-01-24",
      readTime: 6,
      featuredImage:
        "https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?auto=format&fit=crop&w=1600&q=80",
      tags: ["time-management", "planning", "focus"],
      category: "productivity",
      relatedTemplates: [9, 1],
      quote: "Resilient schedules use priorities and fallback plans.",
      takeaways: [
        "Protect deep-work windows first.",
        "Maintain a fallback task queue.",
        "Review time-block quality weekly."
      ],
      templateSlug: "weekly-planning-dashboard",
      relatedArticleSlug: "weekly-review-that-actually-sticks"
    },
    {
      id: 14,
      title: "How to Cut Context Switching in Half",
      slug: "cut-context-switching-in-half",
      excerpt: "Reduce hidden attention costs with environmental controls.",
      datePublished: "2026-01-05",
      dateModified: "2026-01-12",
      readTime: 8,
      featuredImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
      tags: ["focus", "systems", "productivity"],
      category: "productivity",
      relatedTemplates: [7, 1],
      quote: "Your environment should defend focus by default.",
      takeaways: [
        "Batch communication windows.",
        "Disable non-critical notifications.",
        "Use one universal capture inbox."
      ],
      templateSlug: "productivity-os",
      relatedArticleSlug: "weekly-review-that-actually-sticks"
    },
    {
      id: 15,
      title: "Build a Story Arc That Makes Recruiters Pay Attention",
      slug: "story-arc-recruiters-pay-attention",
      excerpt: "A narrative framework that aligns your resume, portfolio, and interviews.",
      datePublished: "2026-01-24",
      dateModified: "2026-01-27",
      readTime: 8,
      featuredImage:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
      tags: ["job-search", "positioning", "career"],
      category: "job-search",
      relatedTemplates: [3, 6],
      quote: "Evidence and narrative together create stronger signal than claims alone.",
      takeaways: [
        "Define your theme in one sentence.",
        "Choose proof artifacts that support the theme.",
        "Keep language consistent across resume and portfolio."
      ],
      templateSlug: "career-compounding-canvas",
      relatedArticleSlug: "build-career-portfolio-not-just-resume"
    },
    {
      id: 16,
      title: "Interview Prep as a Repeatable System",
      slug: "interview-prep-repeatable-system",
      excerpt: "A practical prep loop for confidence under pressure.",
      datePublished: "2026-01-12",
      dateModified: "2026-01-19",
      readTime: 9,
      featuredImage:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      tags: ["interviews", "systems", "job-search"],
      category: "job-search",
      relatedTemplates: [3, 6],
      quote: "Confidence is usually a byproduct of structured repetition.",
      takeaways: [
        "Map role priorities before prep.",
        "Practice answers out loud.",
        "Review and refine after each interview."
      ],
      templateSlug: "career-compounding-canvas",
      relatedArticleSlug: "story-arc-recruiters-pay-attention"
    },
    {
      id: 17,
      title: "Build a Career Portfolio, Not Just a Resume",
      slug: "build-career-portfolio-not-just-resume",
      excerpt: "Design professional assets that keep working for you.",
      datePublished: "2026-01-28",
      dateModified: "2026-02-02",
      readTime: 8,
      featuredImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
      tags: ["career", "portfolio", "positioning"],
      category: "career",
      relatedTemplates: [3, 7],
      quote: "A compounding career is built on reusable proof assets.",
      takeaways: [
        "Document outcomes, not tasks.",
        "Publish work evidence consistently.",
        "Tie projects to measurable impact."
      ],
      templateSlug: "career-compounding-canvas",
      relatedArticleSlug: "decision-filter-career-opportunities"
    },
    {
      id: 18,
      title: "Use a Decision Filter for Career Opportunities",
      slug: "decision-filter-career-opportunities",
      excerpt: "Evaluate roles with a framework, not emotion.",
      datePublished: "2026-01-14",
      dateModified: "2026-01-20",
      readTime: 6,
      featuredImage:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      tags: ["career", "decision-making", "strategy"],
      category: "career",
      relatedTemplates: [6, 3],
      quote: "Clear criteria protect you from short-term noise.",
      takeaways: [
        "Define non-negotiables and growth criteria.",
        "Score options consistently.",
        "Review decisions after 90 days."
      ],
      templateSlug: "decision-framework-kit",
      relatedArticleSlug: "build-career-portfolio-not-just-resume"
    }
  ];

  function templateNameBySlug(slug) {
    const template = templateSeed.find((item) => item.slug === slug);
    return template ? template.name : "related template";
  }

  function articleTitleBySlug(slug) {
    const article = articleSeed.find((item) => item.slug === slug);
    return article ? article.title : "related article";
  }

  function buildArticleContent(seed) {
    return `
      <p>${seed.excerpt} This guide breaks down a practical approach you can apply this week.</p>

      <h2>Why this matters now</h2>
      <p>Most people already know what to do. The real gap is operational consistency. This article focuses on the execution layer so your system works even on high-noise days.</p>
      <blockquote>${seed.quote}</blockquote>

      <h2>7-day implementation blueprint</h2>
      <h3>Day 1-2: Diagnose the bottleneck</h3>
      <p>Start by identifying where work gets delayed, forgotten, or repeated. Name one workflow that produces the most stress and map its current steps.</p>
      <h3>Day 3-4: Build a low-friction sequence</h3>
      <p>Design a sequence simple enough to run under pressure. Make each step explicit, measurable, and easy to repeat without extra decisions.</p>
      <h3>Day 5-7: Review and tighten</h3>
      <p>Run one short review loop. Remove complexity, improve naming, and keep only what improves output quality.</p>

      <h2>Core takeaways</h2>
      <ul>
        ${seed.takeaways.map((item) => `<li>${item}</li>`).join("")}
      </ul>

      <figure>
        <img src="${seed.featuredImage}" alt="${seed.title}" loading="lazy" width="1600" height="900">
        <figcaption>Implementation-first systems outperform motivation-first routines over time.</figcaption>
      </figure>

      <h2>Use these internal resources next</h2>
      <p>To put this into action fast, open <a href="template-detail.html?slug=${seed.templateSlug}">${templateNameBySlug(seed.templateSlug)}</a>.</p>
      <p>Then continue with <a href="article.html?slug=${seed.relatedArticleSlug}">${articleTitleBySlug(seed.relatedArticleSlug)}</a> to deepen your execution model.</p>
    `;
  }

  const articles = articleSeed.map((item) => ({
    ...item,
    author: AUTHOR.name,
    authorBio: AUTHOR.bio,
    content: buildArticleContent(item)
  }));

  const templates = templateSeed.map((item) => ({ ...item }));

  const allTags = [...new Set(articles.flatMap((article) => article.tags))].sort();
  const allArticleCategories = [...new Set(articles.map((article) => article.category))].sort();
  const allTemplateCategories = [...new Set(templates.map((template) => template.category))].sort();

  function byNewest(a, b) {
    return new Date(b.datePublished) - new Date(a.datePublished);
  }

  function toTitleCase(value) {
    return String(value)
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(" ");
  }

  function formatDate(value) {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function stripHtml(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  }

  function slugify(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }
      return JSON.parse(raw);
    } catch (_error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      // Ignore quota errors for demo mode.
    }
  }

  function getBodyPage() {
    return document.body.getAttribute("data-page") || "home";
  }

  function getUrlParams() {
    return new URLSearchParams(window.location.search);
  }

  function updateQuery(nextValues) {
    const params = new URLSearchParams(window.location.search);

    Object.entries(nextValues).forEach(([key, value]) => {
      const normalized = value === undefined || value === null ? "" : String(value).trim();
      if (!normalized || normalized === "all" || (key === "page" && normalized === "1")) {
        params.delete(key);
      } else {
        params.set(key, normalized);
      }
    });

    const query = params.toString();
    window.location.href = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  }

  function absoluteUrl(pathWithQuery) {
    return new URL(pathWithQuery, `${SITE.baseUrl}/`).toString();
  }

  function ensureCurrentYear() {
    document.querySelectorAll("#currentYear").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  }

  function showToast(message) {
    let stack = document.querySelector(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      stack.setAttribute("aria-live", "polite");
      document.body.appendChild(stack);
    }

    const toast = document.createElement("p");
    toast.className = "toast";
    toast.textContent = message;
    stack.appendChild(toast);

    window.setTimeout(() => {
      toast.remove();
    }, 2500);
  }

  function sanitizeText(value) {
    return String(value).replace(/\s+/g, " ").trim();
  }

  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEYS.darkMode);
    const fallback = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = stored || fallback;
    document.body.setAttribute("data-theme", theme);

    const toggle = document.getElementById("themeToggle");
    if (!toggle) {
      return;
    }

    const icon = toggle.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon";
    }

    toggle.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEYS.darkMode, next);
      if (icon) {
        icon.className = next === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon";
      }
    });
  }

  function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("primaryNav");
    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setActiveNav() {
    const page = getBodyPage();
    const map = {
      home: "home",
      articles: "articles",
      article: "articles",
      tag: "articles",
      templates: "templates",
      "template-detail": "templates",
      about: "about",
      contact: "contact",
      privacy: "",
      terms: ""
    };

    const activeKey = map[page] || "";
    document.querySelectorAll(".primary-nav a[data-nav]").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("data-nav") === activeKey);
    });
  }

  function initGlobalSearch() {
    const form = document.getElementById("globalSearchForm");
    const input = document.getElementById("globalSearchInput");
    if (!form || !input) {
      return;
    }

    form.addEventListener("submit", (event) => {
      const query = sanitizeText(input.value).toLowerCase();
      if (!query) {
        return;
      }

      const page = getBodyPage();
      if (page === "articles" || page === "templates") {
        return;
      }

      event.preventDefault();
      const articleHit = articles.find((article) => {
        const text = `${article.title} ${article.excerpt} ${article.tags.join(" ")} ${stripHtml(article.content)}`.toLowerCase();
        return text.includes(query);
      });
      if (articleHit) {
        window.location.href = `article.html?slug=${encodeURIComponent(articleHit.slug)}`;
        return;
      }

      const templateHit = templates.find((template) => {
        const text = `${template.name} ${template.description} ${template.features.join(" ")}`.toLowerCase();
        return text.includes(query);
      });
      if (templateHit) {
        window.location.href = `template-detail.html?slug=${encodeURIComponent(templateHit.slug)}`;
        return;
      }

      window.location.href = `articles.html?q=${encodeURIComponent(query)}`;
    });
  }

  function initNewsletterForms() {
    document.querySelectorAll(".js-newsletter-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = form.querySelector('input[name="email"]');
        if (!(emailInput instanceof HTMLInputElement)) {
          return;
        }

        const email = sanitizeText(emailInput.value).toLowerCase();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!valid) {
          showToast("Enter a valid email address.");
          emailInput.focus();
          return;
        }

        const current = readStorage(STORAGE_KEYS.newsletter, []);
        if (current.includes(email)) {
          showToast("You are already subscribed.");
          return;
        }

        current.push(email);
        writeStorage(STORAGE_KEYS.newsletter, current);
        form.reset();
        showToast("Subscribed successfully.");
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = sanitizeText(formData.get("name") || "");
      const email = sanitizeText(formData.get("email") || "").toLowerCase();
      const subject = sanitizeText(formData.get("subject") || "");
      const message = sanitizeText(formData.get("message") || "");

      if (!name || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Please complete all fields with a valid email.");
        return;
      }

      const submissions = readStorage(STORAGE_KEYS.contactSubmissions, []);
      submissions.push({
        id: `${Date.now()}`,
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString()
      });
      writeStorage(STORAGE_KEYS.contactSubmissions, submissions);
      form.reset();
      showToast("Message saved. Demo mode active.");
    });
  }

  function setMeta({
    title,
    description,
    keywords,
    canonical,
    ogImage,
    type = "website"
  }) {
    const metaDescription = document.getElementById("metaDescription");
    const metaKeywords = document.getElementById("metaKeywords");
    const canonicalLink = document.getElementById("canonicalLink");
    const ogTitle = document.getElementById("ogTitle");
    const ogDescription = document.getElementById("ogDescription");
    const ogImageNode = document.getElementById("ogImage");
    const twitterTitle = document.getElementById("twitterTitle");
    const twitterDescription = document.getElementById("twitterDescription");
    const twitterImage = document.getElementById("twitterImage");
    const ogType = document.querySelector('meta[property="og:type"]');

    const trimmedDescription = String(description || "").slice(0, 155);

    if (title) {
      document.title = title;
      if (ogTitle) {
        ogTitle.setAttribute("content", title);
      }
      if (twitterTitle) {
        twitterTitle.setAttribute("content", title);
      }
    }
    if (metaDescription) {
      metaDescription.setAttribute("content", trimmedDescription);
    }
    if (metaKeywords) {
      metaKeywords.setAttribute("content", (keywords || []).join(", "));
    }
    if (canonicalLink && canonical) {
      canonicalLink.setAttribute("href", canonical);
    }
    if (ogDescription) {
      ogDescription.setAttribute("content", trimmedDescription);
    }
    if (twitterDescription) {
      twitterDescription.setAttribute("content", trimmedDescription);
    }
    if (ogImageNode) {
      ogImageNode.setAttribute("content", ogImage || SITE.defaultOgImage);
    }
    if (twitterImage) {
      twitterImage.setAttribute("content", ogImage || SITE.defaultOgImage);
    }
    if (ogType) {
      ogType.setAttribute("content", type);
    }
  }

  function setSchema(schemaObject) {
    const script = document.getElementById("dynamicSchema");
    if (!script) {
      return;
    }
    script.textContent = JSON.stringify(schemaObject);
  }

  function breadcrumbSchemaFrom(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.url
      }))
    };
  }

  function websiteSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.brandName,
      url: `${SITE.baseUrl}/`,
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE.baseUrl}/articles.html?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }

  function articleSchema(article, canonical) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      author: {
        "@type": "Person",
        name: article.author
      },
      publisher: {
        "@type": "Organization",
        name: SITE.brandName,
        url: SITE.baseUrl
      },
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      description: article.excerpt,
      image: article.featuredImage,
      mainEntityOfPage: canonical,
      articleSection: toTitleCase(article.category),
      keywords: article.tags
    };
  }

  function productSchema(template, canonical) {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: template.name,
      description: template.description,
      image: template.images,
      category: toTitleCase(template.category),
      brand: {
        "@type": "Brand",
        name: SITE.brandName
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: template.price,
        availability: "https://schema.org/InStock",
        url: canonical
      }
    };
  }

  function renderBreadcrumb(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    container.innerHTML = `
      <ol>
        ${items
          .map((item, index) => {
            if (index === items.length - 1 || !item.href) {
              return `<li><span aria-current="page">${escapeHtml(item.label)}</span></li>`;
            }
            return `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`;
          })
          .join("")}
      </ol>
    `;
  }

  function renderSkeletonCards(container, count = 3) {
    container.innerHTML = Array.from({ length: count })
      .map(
        () => `
        <article class="card">
          <div class="skeleton" style="height: 160px;"></div>
          <div class="skeleton" style="height: 16px; margin-top: 12px;"></div>
          <div class="skeleton" style="height: 16px; margin-top: 8px;"></div>
        </article>
      `
      )
      .join("");
  }

  function renderArticleCard(article) {
    return `
      <article class="article-card">
        <img src="${escapeHtml(article.featuredImage)}" alt="${escapeHtml(article.title)}" loading="lazy" width="1200" height="700">
        <div class="card-body">
          <div class="meta-row">
            <span>${formatDate(article.datePublished)}</span>
            <span>•</span>
            <span>${article.readTime} min read</span>
          </div>
          <h3><a href="article.html?slug=${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></h3>
          <p>${escapeHtml(article.excerpt)}</p>
          <p class="meta-row">${article.tags
            .slice(0, 3)
            .map((tag) => `<a class="tag-link" href="tag.html?tag=${encodeURIComponent(tag)}">#${escapeHtml(tag)}</a>`)
            .join("")}</p>
          <a class="btn btn-secondary" href="article.html?slug=${encodeURIComponent(article.slug)}">Read Article</a>
        </div>
      </article>
    `;
  }

  function renderTemplateCard(template) {
    const priceLabel = template.isFree ? "Free" : `$${template.price}`;
    return `
      <article class="template-card">
        <img src="${escapeHtml(template.images[0])}" alt="${escapeHtml(template.name)}" loading="lazy" width="1200" height="700">
        <div class="card-body">
          <div class="meta-row">
            <span class="badge">${escapeHtml(toTitleCase(template.category))}</span>
            <span class="badge">${escapeHtml(priceLabel)}</span>
          </div>
          <h3><a href="template-detail.html?slug=${encodeURIComponent(template.slug)}">${escapeHtml(template.name)}</a></h3>
          <p>${escapeHtml(template.description)}</p>
          <p class="meta-row">${template.features
            .slice(0, 3)
            .map((feature) => `<span class="tag">${escapeHtml(feature)}</span>`)
            .join("")}</p>
          <a class="btn btn-secondary" href="template-detail.html?slug=${encodeURIComponent(template.slug)}">View Template</a>
        </div>
      </article>
    `;
  }

  function paginated(items, page, perPage) {
    const totalPages = Math.max(1, Math.ceil(items.length / perPage));
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const start = (safePage - 1) * perPage;
    return {
      page: safePage,
      totalPages,
      slice: items.slice(start, start + perPage)
    };
  }

  function renderPagination(containerId, totalPages, currentPage, hrefBuilder) {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }
    if (totalPages <= 1) {
      container.innerHTML = "";
      return;
    }

    const parts = [];
    if (currentPage > 1) {
      parts.push(`<a href="${hrefBuilder(currentPage - 1)}" aria-label="Previous page">Prev</a>`);
    }
    for (let page = 1; page <= totalPages; page += 1) {
      if (page === currentPage) {
        parts.push(`<span class="is-current" aria-current="page">${page}</span>`);
      } else {
        parts.push(`<a href="${hrefBuilder(page)}">${page}</a>`);
      }
    }
    if (currentPage < totalPages) {
      parts.push(`<a href="${hrefBuilder(currentPage + 1)}" aria-label="Next page">Next</a>`);
    }

    container.innerHTML = parts.join("");
  }

  function queryWith(base, paramsObj) {
    const params = new URLSearchParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === "all") {
        return;
      }
      params.set(key, String(value));
    });
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }

  function initHomePage() {
    const featuredTemplates = templates.slice(0, 3);
    const recentArticles = articles.slice().sort(byNewest).slice(0, 3);

    const homeTemplatesGrid = document.getElementById("homeTemplatesGrid");
    const homeArticlesGrid = document.getElementById("homeArticlesGrid");

    if (homeTemplatesGrid) {
      renderSkeletonCards(homeTemplatesGrid, 3);
      setTimeout(() => {
        homeTemplatesGrid.innerHTML = featuredTemplates.map(renderTemplateCard).join("");
      }, 120);
    }

    if (homeArticlesGrid) {
      renderSkeletonCards(homeArticlesGrid, 3);
      setTimeout(() => {
        homeArticlesGrid.innerHTML = recentArticles.map(renderArticleCard).join("");
      }, 140);
    }

    const canonical = absoluteUrl("index.html");
    setMeta({
      title: `${SITE.brandName} | Notion Templates and Articles`,
      description:
        "Premium Notion templates and practical implementation-first articles for students and young professionals who want better execution.",
      keywords: ["notion templates", "productivity systems", "google discover", "student workflows"],
      canonical,
      ogImage: SITE.defaultOgImage,
      type: "website"
    });

    setSchema([websiteSchema()]);
  }

  function initArticlesPage() {
    const params = getUrlParams();
    const query = sanitizeText(params.get("q") || "");
    const category = sanitizeText(params.get("category") || "all");
    const tag = sanitizeText(params.get("tag") || "all");
    const page = Number.parseInt(params.get("page") || "1", 10) || 1;

    const searchInput = document.getElementById("articlesSearch");
    const categorySelect = document.getElementById("articlesCategory");
    const tagSelect = document.getElementById("articlesTag");
    const filterForm = document.getElementById("articlesFilterForm");

    if (searchInput) {
      searchInput.value = query;
    }

    if (categorySelect) {
      categorySelect.innerHTML = ["all", ...allArticleCategories]
        .map(
          (item) =>
            `<option value="${escapeHtml(item)}" ${item === category ? "selected" : ""}>${
              item === "all" ? "All categories" : escapeHtml(toTitleCase(item))
            }</option>`
        )
        .join("");
    }

    if (tagSelect) {
      tagSelect.innerHTML = ["all", ...allTags]
        .map(
          (item) =>
            `<option value="${escapeHtml(item)}" ${item === tag ? "selected" : ""}>${
              item === "all" ? "All tags" : escapeHtml(`#${item}`)
            }</option>`
        )
        .join("");
    }

    if (filterForm) {
      filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        updateQuery({
          q: searchInput ? searchInput.value : "",
          category: categorySelect ? categorySelect.value : "all",
          tag: tagSelect ? tagSelect.value : "all",
          page: 1
        });
      });
    }

    const filtered = articles
      .slice()
      .sort(byNewest)
      .filter((article) => {
        const categoryMatch = category === "all" || article.category === category;
        const tagMatch = tag === "all" || article.tags.includes(tag);
        const text = `${article.title} ${article.excerpt} ${article.tags.join(" ")} ${stripHtml(article.content)}`.toLowerCase();
        const queryMatch = !query || text.includes(query.toLowerCase());
        return categoryMatch && tagMatch && queryMatch;
      });

    const { page: safePage, totalPages, slice } = paginated(filtered, page, 6);
    const grid = document.getElementById("articlesGrid");
    if (grid) {
      renderSkeletonCards(grid, 3);
      setTimeout(() => {
        grid.innerHTML =
          slice.length > 0
            ? slice.map(renderArticleCard).join("")
            : '<div class="empty-state">No articles found for the selected filters.</div>';
      }, 120);
    }

    renderPagination("articlesPagination", totalPages, safePage, (nextPage) =>
      queryWith("articles.html", {
        q: query,
        category,
        tag,
        page: nextPage
      })
    );

    const tagCounts = allTags
      .map((item) => ({
        tag: item,
        count: articles.filter((article) => article.tags.includes(item)).length
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 16);

    const popularTags = document.getElementById("popularTags");
    if (popularTags) {
      popularTags.innerHTML = tagCounts
        .map(
          (entry) =>
            `<a class="tag-link" href="tag.html?tag=${encodeURIComponent(entry.tag)}">#${escapeHtml(entry.tag)} (${entry.count})</a>`
        )
        .join("");
    }

    const breadcrumbItems = [
      { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
      { label: "Articles", href: "articles.html", url: absoluteUrl("articles.html") }
    ];

    renderBreadcrumb("pageBreadcrumb", breadcrumbItems);

    const canonical = absoluteUrl(queryWith("articles.html", {
      q: query || undefined,
      category: category !== "all" ? category : undefined,
      tag: tag !== "all" ? tag : undefined,
      page: safePage > 1 ? safePage : undefined
    }));

    setMeta({
      title:
        query || category !== "all" || tag !== "all"
          ? `Articles Filtered | ${SITE.brandName}`
          : `Articles | ${SITE.brandName}`,
      description:
        "Browse practical articles on AI, productivity, and career systems with filters by category and tags.",
      keywords: ["articles", "ai", "productivity", "career"],
      canonical,
      ogImage: SITE.defaultOgImage,
      type: "website"
    });

    setSchema([breadcrumbSchemaFrom(breadcrumbItems)]);
  }

  function initTagPage() {
    const params = getUrlParams();
    const selectedTag = sanitizeText(params.get("tag") || "").toLowerCase();
    const titleNode = document.getElementById("tagPageTitle");
    const descNode = document.getElementById("tagPageDescription");
    const grid = document.getElementById("tagArticlesGrid");

    const matches = selectedTag ? articles.filter((article) => article.tags.includes(selectedTag)) : [];

    if (titleNode) {
      titleNode.textContent = selectedTag ? `#${selectedTag}` : "Tag Not Found";
    }

    if (descNode) {
      descNode.textContent = selectedTag
        ? `Articles tagged with ${selectedTag}.`
        : "Select a valid tag from the article pages.";
    }

    if (grid) {
      grid.innerHTML =
        matches.length > 0
          ? matches.sort(byNewest).map(renderArticleCard).join("")
          : '<div class="empty-state">No articles found for this tag.</div>';
    }

    const otherTags = document.getElementById("otherPopularTags");
    if (otherTags) {
      otherTags.innerHTML = allTags
        .filter((tag) => tag !== selectedTag)
        .slice(0, 18)
        .map((tag) => `<a class="tag-link" href="tag.html?tag=${encodeURIComponent(tag)}">#${escapeHtml(tag)}</a>`)
        .join("");
    }

    const breadcrumbItems = [
      { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
      { label: "Tags", href: "articles.html", url: absoluteUrl("articles.html") },
      {
        label: selectedTag ? `#${selectedTag}` : "Tag",
        href: selectedTag ? `tag.html?tag=${encodeURIComponent(selectedTag)}` : "tag.html",
        url: absoluteUrl(selectedTag ? `tag.html?tag=${encodeURIComponent(selectedTag)}` : "tag.html")
      }
    ];

    renderBreadcrumb("tagBreadcrumb", breadcrumbItems);

    const canonical = absoluteUrl(selectedTag ? `tag.html?tag=${encodeURIComponent(selectedTag)}` : "tag.html");
    setMeta({
      title: selectedTag ? `#${selectedTag} Articles | ${SITE.brandName}` : `Tag Archive | ${SITE.brandName}`,
      description: selectedTag
        ? `Read ${selectedTag} articles with actionable workflows, templates, and implementation guides.`
        : "Browse article tags and topic clusters.",
      keywords: selectedTag ? [selectedTag, "tag archive", "articles"] : ["tag archive", "articles"],
      canonical,
      ogImage: SITE.defaultOgImage,
      type: "website"
    });

    setSchema([breadcrumbSchemaFrom(breadcrumbItems)]);
  }

  function getArticleByParam() {
    const params = getUrlParams();
    const slug = sanitizeText(params.get("slug") || "");
    const id = Number.parseInt(params.get("id") || "", 10);

    if (slug) {
      const bySlug = articles.find((article) => article.slug === slug);
      if (bySlug) {
        return bySlug;
      }
    }

    if (!Number.isNaN(id)) {
      const byId = articles.find((article) => article.id === id);
      if (byId) {
        return byId;
      }
    }

    return null;
  }

  function getTemplateByParam() {
    const params = getUrlParams();
    const slug = sanitizeText(params.get("slug") || "");
    const id = Number.parseInt(params.get("id") || "", 10);

    if (slug) {
      const bySlug = templates.find((template) => template.slug === slug);
      if (bySlug) {
        return bySlug;
      }
    }

    if (!Number.isNaN(id)) {
      const byId = templates.find((template) => template.id === id);
      if (byId) {
        return byId;
      }
    }

    return null;
  }

  function articleInternalLinks(article) {
    const relatedTemplates = templates.filter((template) => article.relatedTemplates.includes(template.id));
    const relatedArticles = getRelatedArticles(article, 3);
    return {
      relatedTemplates,
      relatedArticles
    };
  }

  function getRelatedArticles(article, count) {
    return articles
      .filter((candidate) => candidate.id !== article.id)
      .map((candidate) => ({
        item: candidate,
        score: candidate.tags.filter((tag) => article.tags.includes(tag)).length
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || byNewest(a.item, b.item))
      .slice(0, count)
      .map((entry) => entry.item);
  }

  function updateReadingHistory(slug) {
    const history = readStorage(STORAGE_KEYS.readingHistory, []);
    const filtered = history.filter((item) => item !== slug);
    filtered.unshift(slug);
    writeStorage(STORAGE_KEYS.readingHistory, filtered.slice(0, 25));
  }

  function getMightLike(article, count = 2) {
    const history = readStorage(STORAGE_KEYS.readingHistory, []);
    const seen = new Set([article.slug]);

    const fromHistory = history
      .map((slug) => articles.find((entry) => entry.slug === slug))
      .filter((entry) => entry && entry.slug !== article.slug)
      .filter((entry) => {
        if (seen.has(entry.slug)) {
          return false;
        }
        seen.add(entry.slug);
        return true;
      })
      .slice(0, count);

    if (fromHistory.length >= count) {
      return fromHistory;
    }

    const fallbacks = getRelatedArticles(article, 4).filter((entry) => !seen.has(entry.slug));
    return [...fromHistory, ...fallbacks].slice(0, count);
  }

  function prepareArticleContent(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const headings = Array.from(temp.querySelectorAll("h2, h3"));

    const toc = headings.map((heading, index) => {
      const text = sanitizeText(heading.textContent || `Section ${index + 1}`);
      const id = heading.id || `${slugify(text)}-${index + 1}`;
      heading.id = id;
      return {
        id,
        text,
        level: heading.tagName.toLowerCase()
      };
    });

    return {
      html: temp.innerHTML,
      toc
    };
  }

  function commentsStorageKey(slug) {
    return `ss_comments_${slug}`;
  }

  function renderComments(article) {
    const list = readStorage(commentsStorageKey(article.slug), []);
    return list
      .map((comment) => {
        const dateLabel = formatDate(comment.date.slice(0, 10));
        return `
          <article class="comment-item">
            <div class="comment-head">
              <strong>${escapeHtml(comment.name)}</strong>
              <span>${escapeHtml(dateLabel)}</span>
            </div>
            <p>${escapeHtml(comment.text)}</p>
          </article>
        `;
      })
      .join("");
  }

  function initArticlePage() {
    const article = getArticleByParam();
    const container = document.getElementById("articleDetail");

    if (!container) {
      return;
    }

    if (!article) {
      container.innerHTML = `
        <section class="article-head">
          <h1>Article Not Found</h1>
          <p>The requested article could not be found.</p>
          <a class="btn btn-primary" href="articles.html">Back to Articles</a>
        </section>
      `;

      const breadcrumbItems = [
        { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
        { label: "Articles", href: "articles.html", url: absoluteUrl("articles.html") },
        { label: "Not Found", href: "article.html", url: absoluteUrl("article.html") }
      ];
      renderBreadcrumb("articleBreadcrumb", breadcrumbItems);
      setSchema([breadcrumbSchemaFrom(breadcrumbItems)]);
      return;
    }

    updateReadingHistory(article.slug);
    const canonical = absoluteUrl(`article.html?slug=${encodeURIComponent(article.slug)}`);
    const { relatedTemplates, relatedArticles } = articleInternalLinks(article);
    const mightLike = getMightLike(article, 3);
    const prepared = prepareArticleContent(article.content);

    const breadcrumbItems = [
      { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
      { label: "Articles", href: "articles.html", url: absoluteUrl("articles.html") },
      {
        label: toTitleCase(article.category),
        href: `articles.html?category=${encodeURIComponent(article.category)}`,
        url: absoluteUrl(`articles.html?category=${encodeURIComponent(article.category)}`)
      },
      {
        label: article.title,
        href: `article.html?slug=${encodeURIComponent(article.slug)}`,
        url: canonical
      }
    ];

    renderBreadcrumb("articleBreadcrumb", breadcrumbItems);

    const shareUrl = encodeURIComponent(canonical);
    const shareText = encodeURIComponent(article.title);

    container.innerHTML = `
      <header class="article-head">
        <h1>${escapeHtml(article.title)}</h1>
        <div class="meta-row">
          <span>By ${escapeHtml(article.author)}</span>
          <span>•</span>
          <span>Published ${formatDate(article.datePublished)}</span>
          <span>•</span>
          <span>Updated ${formatDate(article.dateModified)}</span>
          <span>•</span>
          <span>${article.readTime} min read</span>
        </div>
        <p class="meta-row">
          <a class="tag-link" href="articles.html?category=${encodeURIComponent(article.category)}">${escapeHtml(
      toTitleCase(article.category)
    )}</a>
          ${article.tags
            .map((tag) => `<a class="tag-link" href="tag.html?tag=${encodeURIComponent(tag)}">#${escapeHtml(tag)}</a>`)
            .join("")}
        </p>
        ${prepared.toc.length >= 3
          ? `
            <aside class="toc-box">
              <h2>Table of Contents</h2>
              <ol>
                ${prepared.toc
                  .map(
                    (entry) =>
                      `<li><a href="#${escapeHtml(entry.id)}">${escapeHtml(entry.text)}</a></li>`
                  )
                  .join("")}
              </ol>
            </aside>
          `
          : ""}
      </header>

      <figure class="article-featured">
        <img src="${escapeHtml(article.featuredImage)}" alt="${escapeHtml(article.title)}" width="1600" height="900" fetchpriority="high">
      </figure>

      <section class="share-row" aria-label="Share article">
        <span>Share:</span>
        <div class="share-links">
          <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}" target="_blank" rel="noopener noreferrer" aria-label="Share on X">
            <i class="fa-brands fa-x-twitter" aria-hidden="true"></i>
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
            <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
          </a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
            <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
          </a>
          <a href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
          </a>
        </div>
      </section>

      <section class="article-content">
        ${prepared.html}
      </section>

      <section class="author-box">
        <h2>About the Author</h2>
        <p><strong>${escapeHtml(article.author)}</strong></p>
        <p>${escapeHtml(article.authorBio)}</p>
      </section>

      <section class="related-section">
        <h2>Related Templates</h2>
        <div class="related-grid">
          ${relatedTemplates.length > 0
            ? relatedTemplates
                .map(
                  (template) => `
                  <article class="card">
                    <h3><a href="template-detail.html?slug=${encodeURIComponent(template.slug)}">${escapeHtml(
                    template.name
                  )}</a></h3>
                    <p>${escapeHtml(template.description)}</p>
                    <a class="btn btn-secondary" href="template-detail.html?slug=${encodeURIComponent(template.slug)}">View Template</a>
                  </article>
                `
                )
                .join("")
            : '<p class="empty-state">No related templates found.</p>'}
        </div>
      </section>

      <section class="related-section">
        <h2>Related Articles</h2>
        <div class="related-grid">
          ${relatedArticles.length > 0
            ? relatedArticles
                .map(
                  (entry) => `
                  <article class="card">
                    <h3><a href="article.html?slug=${encodeURIComponent(entry.slug)}">${escapeHtml(entry.title)}</a></h3>
                    <p>${escapeHtml(entry.excerpt)}</p>
                    <a class="btn btn-secondary" href="article.html?slug=${encodeURIComponent(entry.slug)}">Read</a>
                  </article>
                `
                )
                .join("")
            : '<p class="empty-state">No related articles found.</p>'}
        </div>
      </section>

      <section class="might-like">
        <h2>You Might Also Like</h2>
        <div class="might-like-grid">
          ${mightLike.length > 0
            ? mightLike
                .map(
                  (entry) => `
                  <article class="card">
                    <h3><a href="article.html?slug=${encodeURIComponent(entry.slug)}">${escapeHtml(entry.title)}</a></h3>
                    <p>${escapeHtml(entry.excerpt)}</p>
                  </article>
                `
                )
                .join("")
            : '<p class="empty-state">Read more articles to personalize this section.</p>'}
        </div>
      </section>

      <section class="inline-newsletter">
        <h2>Get Articles Like This in Your Inbox</h2>
        <p>Join the newsletter and receive one implementation-first idea each week.</p>
        <form class="newsletter-form js-newsletter-form" novalidate>
          <label class="sr-only" for="inlineNewsletterEmail">Email address</label>
          <input id="inlineNewsletterEmail" name="email" type="email" placeholder="Your email address" required>
          <button class="btn btn-primary" type="submit">Subscribe</button>
        </form>
      </section>

      <section class="comment-section">
        <h2>Comments</h2>
        <div id="commentList">${renderComments(article) || '<p class="meta-row">No comments yet. Be the first to contribute.</p>'}</div>
        <form id="commentForm" class="comment-form" novalidate>
          <div class="form-row">
            <input type="text" id="commentName" name="name" placeholder="Your name" required>
            <input type="email" id="commentEmail" name="email" placeholder="Your email (not published)" required>
          </div>
          <textarea id="commentText" name="comment" rows="4" placeholder="Share your thoughts" required></textarea>
          <button class="btn btn-secondary" type="submit">Post Comment</button>
        </form>
      </section>
    `;

    initNewsletterForms();
    initComments(article);
    initReadingProgress();

    setMeta({
      title: `${article.title} | ${SITE.brandName}`,
      description: article.excerpt,
      keywords: [...article.tags, article.category, "notion templates"],
      canonical,
      ogImage: article.featuredImage,
      type: "article"
    });

    setSchema([articleSchema(article, canonical), breadcrumbSchemaFrom(breadcrumbItems)]);
  }

  function initComments(article) {
    const form = document.getElementById("commentForm");
    const listContainer = document.getElementById("commentList");
    if (!form || !listContainer) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = sanitizeText(data.get("name") || "");
      const email = sanitizeText(data.get("email") || "").toLowerCase();
      const text = sanitizeText(data.get("comment") || "");

      if (!name || !text || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Please fill valid comment details.");
        return;
      }

      const key = commentsStorageKey(article.slug);
      const comments = readStorage(key, []);
      comments.unshift({
        name,
        email,
        text,
        date: new Date().toISOString()
      });
      writeStorage(key, comments.slice(0, 100));
      form.reset();
      listContainer.innerHTML = renderComments(article);
      showToast("Comment saved.");
    });
  }

  function initReadingProgress() {
    const progressBar = document.getElementById("readingProgressBar");
    if (!progressBar) {
      return;
    }

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress)).toFixed(2)}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initTemplatesPage() {
    const params = getUrlParams();
    const query = sanitizeText(params.get("q") || "");
    const category = sanitizeText(params.get("category") || "all");
    const price = sanitizeText(params.get("price") || "all");
    const page = Number.parseInt(params.get("page") || "1", 10) || 1;

    const searchInput = document.getElementById("templatesSearch");
    const categorySelect = document.getElementById("templatesCategory");
    const priceSelect = document.getElementById("templatesPrice");
    const form = document.getElementById("templatesFilterForm");

    if (searchInput) {
      searchInput.value = query;
    }

    if (categorySelect) {
      categorySelect.innerHTML = ["all", ...allTemplateCategories]
        .map(
          (item) =>
            `<option value="${escapeHtml(item)}" ${item === category ? "selected" : ""}>${
              item === "all" ? "All categories" : escapeHtml(toTitleCase(item))
            }</option>`
        )
        .join("");
    }

    if (priceSelect) {
      priceSelect.value = ["all", "free", "paid"].includes(price) ? price : "all";
    }

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        updateQuery({
          q: searchInput ? searchInput.value : "",
          category: categorySelect ? categorySelect.value : "all",
          price: priceSelect ? priceSelect.value : "all",
          page: 1
        });
      });
    }

    const filtered = templates.filter((template) => {
      const categoryMatch = category === "all" || template.category === category;
      const priceMatch =
        price === "all" || (price === "free" ? template.isFree : !template.isFree);
      const text = `${template.name} ${template.description} ${template.fullDescription} ${template.features.join(" ")}`.toLowerCase();
      const queryMatch = !query || text.includes(query.toLowerCase());
      return categoryMatch && priceMatch && queryMatch;
    });

    const { page: safePage, totalPages, slice } = paginated(filtered, page, 6);
    const grid = document.getElementById("templatesGrid");
    if (grid) {
      renderSkeletonCards(grid, 3);
      setTimeout(() => {
        grid.innerHTML =
          slice.length > 0
            ? slice.map(renderTemplateCard).join("")
            : '<div class="empty-state">No templates found for selected filters.</div>';
      }, 120);
    }

    renderPagination("templatesPagination", totalPages, safePage, (nextPage) =>
      queryWith("templates.html", {
        q: query,
        category,
        price,
        page: nextPage
      })
    );

    const breadcrumbItems = [
      { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
      { label: "Templates", href: "templates.html", url: absoluteUrl("templates.html") }
    ];

    renderBreadcrumb("pageBreadcrumb", breadcrumbItems);

    const canonical = absoluteUrl(
      queryWith("templates.html", {
        q: query || undefined,
        category: category !== "all" ? category : undefined,
        price: price !== "all" ? price : undefined,
        page: safePage > 1 ? safePage : undefined
      })
    );

    setMeta({
      title: `Templates | ${SITE.brandName}`,
      description:
        "Browse free and premium Notion templates with filters by category and price.",
      keywords: ["notion templates", "productivity tools", "student templates"],
      canonical,
      ogImage: SITE.defaultOgImage,
      type: "website"
    });

    setSchema([breadcrumbSchemaFrom(breadcrumbItems)]);
  }

  function initTemplateDetailPage() {
    const template = getTemplateByParam();
    const container = document.getElementById("templateDetail");
    if (!container) {
      return;
    }

    if (!template) {
      container.innerHTML = `
        <section class="card">
          <h1>Template Not Found</h1>
          <p>The requested template could not be found.</p>
          <a class="btn btn-primary" href="templates.html">Back to Templates</a>
        </section>
      `;
      const breadcrumbItems = [
        { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
        { label: "Templates", href: "templates.html", url: absoluteUrl("templates.html") },
        { label: "Not Found", href: "template-detail.html", url: absoluteUrl("template-detail.html") }
      ];
      renderBreadcrumb("templateBreadcrumb", breadcrumbItems);
      setSchema([breadcrumbSchemaFrom(breadcrumbItems)]);
      return;
    }

    const canonical = absoluteUrl(`template-detail.html?slug=${encodeURIComponent(template.slug)}`);
    const priceLabel = template.isFree ? "Free" : `$${template.price}`;
    const relatedArticles = articles.filter((article) => template.relatedArticles.includes(article.id)).slice(0, 3);
    const relatedTemplates = templates
      .filter((entry) => entry.id !== template.id && entry.category === template.category)
      .slice(0, 3);

    container.innerHTML = `
      <section class="template-top">
        <div>
          <h1>${escapeHtml(template.name)}</h1>
          <p class="meta-row">
            <span class="badge">${escapeHtml(toTitleCase(template.category))}</span>
            <span class="badge">${escapeHtml(priceLabel)}</span>
          </p>
          <p>${escapeHtml(template.description)}</p>
          <p class="template-price">${escapeHtml(priceLabel)}</p>
          <p class="rating" aria-label="Rating">${"★".repeat(4)}☆ (${template.rating.toFixed(1)} rating placeholder)</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="${escapeHtml(template.buyUrl || CHECKOUT_LINKS.gumroadDefault)}" target="_blank" rel="noopener noreferrer">Buy Template</a>
            <a class="btn btn-secondary" href="${escapeHtml(template.tutorialLink)}" target="_blank" rel="noopener noreferrer">Watch Tutorial</a>
          </div>
        </div>
        <div class="template-gallery">
          ${template.images
            .map(
              (image, index) =>
                `<img src="${escapeHtml(image)}" alt="${escapeHtml(template.name)} preview ${index + 1}" loading="lazy" width="1200" height="900">`
            )
            .join("")}
        </div>
      </section>

      <section class="template-meta-grid">
        <article class="template-meta-card">
          <h2>Full Description</h2>
          <p>${escapeHtml(template.fullDescription)}</p>
        </article>
        <article class="template-meta-card">
          <h2>Features</h2>
          <ul>${template.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
        </article>
        <article class="template-meta-card">
          <h2>Requirements</h2>
          <ul>${(template.requirements || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
        <article class="template-meta-card">
          <h2>Quick Notes</h2>
          <p>This template is designed for ${SITE.audience.toLowerCase()} and includes setup guidance for faster onboarding.</p>
        </article>
      </section>

      <section class="related-section">
        <h2>Related Articles</h2>
        <div class="related-grid">
          ${relatedArticles
            .map(
              (article) => `
              <article class="card">
                <h3><a href="article.html?slug=${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></h3>
                <p>${escapeHtml(article.excerpt)}</p>
                <a class="btn btn-secondary" href="article.html?slug=${encodeURIComponent(article.slug)}">Read Article</a>
              </article>
            `
            )
            .join("")}
        </div>
      </section>

      <section class="related-section">
        <h2>Related Templates</h2>
        <div class="related-grid">
          ${relatedTemplates.length
            ? relatedTemplates
                .map(
                  (entry) => `
                  <article class="card">
                    <h3><a href="template-detail.html?slug=${encodeURIComponent(entry.slug)}">${escapeHtml(
                    entry.name
                  )}</a></h3>
                    <p>${escapeHtml(entry.description)}</p>
                    <a class="btn btn-secondary" href="template-detail.html?slug=${encodeURIComponent(entry.slug)}">View</a>
                  </article>
                `
                )
                .join("")
            : '<p class="empty-state">No related templates available.</p>'}
        </div>
      </section>
    `;

    const breadcrumbItems = [
      { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
      { label: "Templates", href: "templates.html", url: absoluteUrl("templates.html") },
      {
        label: toTitleCase(template.category),
        href: `templates.html?category=${encodeURIComponent(template.category)}`,
        url: absoluteUrl(`templates.html?category=${encodeURIComponent(template.category)}`)
      },
      {
        label: template.name,
        href: `template-detail.html?slug=${encodeURIComponent(template.slug)}`,
        url: canonical
      }
    ];

    renderBreadcrumb("templateBreadcrumb", breadcrumbItems);

    setMeta({
      title: `${template.name} | ${SITE.brandName}`,
      description: template.description,
      keywords: [template.category, ...template.features.map(slugify)],
      canonical,
      ogImage: template.images[0],
      type: "product"
    });

    setSchema([productSchema(template, canonical), breadcrumbSchemaFrom(breadcrumbItems)]);
  }

  function initStaticPage(page) {
    const map = {
      about: {
        title: `About | ${SITE.brandName}`,
        description: "Read the story and mission behind this template and content platform.",
        path: "about.html",
        crumbs: [
          { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
          { label: "About", href: "about.html", url: absoluteUrl("about.html") }
        ]
      },
      contact: {
        title: `Contact | ${SITE.brandName}`,
        description: "Contact page for support, partnerships, and inquiries.",
        path: "contact.html",
        crumbs: [
          { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
          { label: "Contact", href: "contact.html", url: absoluteUrl("contact.html") }
        ]
      },
      privacy: {
        title: `Privacy Policy | ${SITE.brandName}`,
        description: "Privacy policy covering data collection and usage on this website.",
        path: "privacy.html",
        crumbs: [
          { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
          { label: "Privacy Policy", href: "privacy.html", url: absoluteUrl("privacy.html") }
        ]
      },
      terms: {
        title: `Terms of Service | ${SITE.brandName}`,
        description: "Terms of service governing use of website content and templates.",
        path: "terms.html",
        crumbs: [
          { label: "Home", href: "index.html", url: absoluteUrl("index.html") },
          { label: "Terms", href: "terms.html", url: absoluteUrl("terms.html") }
        ]
      }
    };

    const cfg = map[page];
    if (!cfg) {
      return;
    }

    renderBreadcrumb("pageBreadcrumb", cfg.crumbs);
    setMeta({
      title: cfg.title,
      description: cfg.description,
      keywords: [page, SITE.brandName],
      canonical: absoluteUrl(cfg.path),
      ogImage: SITE.defaultOgImage,
      type: "website"
    });
    setSchema([breadcrumbSchemaFrom(cfg.crumbs)]);
  }

  function bootstrap() {
    ensureCurrentYear();
    initTheme();
    initMobileNav();
    setActiveNav();
    initGlobalSearch();
    initNewsletterForms();
    initContactForm();

    const page = getBodyPage();
    if (page === "home") {
      initHomePage();
    } else if (page === "articles") {
      initArticlesPage();
    } else if (page === "article") {
      initArticlePage();
    } else if (page === "tag") {
      initTagPage();
    } else if (page === "templates") {
      initTemplatesPage();
    } else if (page === "template-detail") {
      initTemplateDetailPage();
    } else {
      initStaticPage(page);
    }
  }

  document.addEventListener("DOMContentLoaded", bootstrap);
})();
