(() => {
  "use strict";

  const DATA_URL = "data/portfolio-index.json";
  const DEFAULT_PAGE_SIZE = 16;
  const REDUCED_MOTION_QUERY = window.matchMedia("(prefers-reduced-motion: reduce)");

  const SITE_ORIGIN = window.location.origin && window.location.origin !== "null"
    ? window.location.origin
    : "https://www.shatanjaysudha.com";

  const SITE_NAME = "Shatanjay Sudha";
  const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/hero/hero-1200.jpg`;

  const ORGANIZATION_SCHEMA = {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/assets/signature-segoe.svg`,
    sameAs: [
      "https://www.linkedin.com/in/shatanjay-sudha-487216b7/",
      "https://www.youtube.com/@Shatanjaysudha",
      "https://x.com/shatanjays"
    ]
  };

  // Work card data for modals
  const WORK_DATA = {
    1: {
      category: "Systems",
      title: "Deep Work System",
      description: "A comprehensive framework for sustained focus in distracted environments. Built on principles of cognitive science and practical implementation.",
      howMade: "Designed through extensive research into attention economics, then tested across 50+ implementations. Templates built in Notion with custom API integrations."
    },
    2: {
      category: "AI",
      title: "Prompt Engineering Course",
      description: "Practical techniques for getting better results from AI tools. Move beyond basic prompts to advanced patterns that deliver consistent value.",
      howMade: "Created through iterative testing of 200+ prompt variations. Content structured from user feedback and real-world application scenarios."
    },
    3: {
      category: "Career",
      title: "Career Leverage Playbook",
      description: "Strategic frameworks for career advancement and negotiation. Practical tactics backed by real compensation data and negotiation outcomes.",
      howMade: "Researched through analysis of 500+ negotiation case studies. Framework validated with career coaches and senior leaders across industries."
    }
  };

  let portfolioDataPromise = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, """)
      .replace(/'/g, "&#39;");
  }

  function slugify(value) {
    return normalizeText(value)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function sanitizeUrl(rawUrl) {
    const raw = normalizeText(rawUrl);
    if (!raw) {
      return "";
    }

    if (/^(javascript|data):/i.test(raw)) {
      return "";
    }

    if (
      raw.startsWith("/") ||
      raw.startsWith("./") ||
      raw.startsWith("../") ||
      raw.startsWith("#") ||
      /^[a-z0-9][a-z0-9/_\-.]*$/i.test(raw)
    ) {
      return raw;
    }

    try {
      const parsed = new URL(raw, SITE_ORIGIN);
      if (["http:", "https:", "mailto:"].includes(parsed.protocol)) {
        return parsed.href;
      }
    } catch {
      return "";
    }

    return "";
  }

  function isExternalUrl(url) {
    try {
      const parsed = new URL(url, SITE_ORIGIN);
      return parsed.origin !== SITE_ORIGIN;
    } catch {
      return false;
    }
  }

  function formatDate(article) {
    if (article.dateLabel) {
      return article.dateLabel;
    }

    if (!article.dateIso) {
      return "Undated";
    }

    const parsed = new Date(article.dateIso);
    if (Number.isNaN(parsed.getTime())) {
      return "Undated";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(parsed);
  }

  function prefersReducedMotion() {
    return REDUCED_MOTION_QUERY.matches;
  }

  function setFooterYear() {
    const yearNode = byId("footerYear");
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  }

  function setHeaderScrollState(headerNode) {
    if (!headerNode) {
      return;
    }

    headerNode.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function normalizePath(pathname) {
    let path = pathname || "/";

    if (path.endsWith("/index.html")) {
      path = path.slice(0, -"index.html".length);
    }

    if (path !== "/" && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    return path || "/";
  }

  function initPrimaryNav() {
    const header = byId("siteHeader");
    const toggle = byId("navToggle");
    const nav = byId("primaryNav");

    if (!header) {
      return;
    }

    const closeNav = () => {
      if (!toggle) {
        return;
      }

      header.setAttribute("data-nav-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    };

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = header.getAttribute("data-nav-open") === "true";
        header.setAttribute("data-nav-open", isOpen ? "false" : "true");
        toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
      });

      nav.addEventListener("click", (event) => {
        if (!event.target.closest("a")) {
          return;
        }
        closeNav();
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) {
        closeNav();
      }
    });

    setHeaderScrollState(header);
    window.addEventListener("scroll", () => setHeaderScrollState(header), { passive: true });
  }

  function markActiveNav() {
    const page = document.body.getAttribute("data-page") || "";

    const pageToNav = {
      home: "home",
      portfolio: "portfolio",
      tag: "portfolio",
      article: "portfolio",
      about: "about",
      contact: "contact",
      "editorial-policy": "",
      terms: "",
      privacy: "",
      disclaimer: ""
    };

    const navTarget = pageToNav[page];
    if (!navTarget) {
      return;
    }

    const activeLink = document.querySelector(`[data-nav="${navTarget}"]`);
    if (activeLink) {
      activeLink.setAttribute("aria-current", "page");
    }
  }

  function bindSmoothInternalAnchors() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href*='#']");
      if (!link) {
        return;
      }

      const href = link.getAttribute("href") || "";
      if (!href || href === "#") {
        return;
      }

      let parsed;
      try {
        parsed = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (!parsed.hash) {
        return;
      }

      const currentPath = normalizePath(window.location.pathname);
      const targetPath = normalizePath(parsed.pathname);

      if (parsed.origin !== window.location.origin || currentPath !== targetPath) {
        return;
      }

      const targetId = decodeURIComponent(parsed.hash.replace(/^#/, ""));
      const targetNode = document.getElementById(targetId);
      if (!targetNode) {
        return;
      }

      event.preventDefault();

      targetNode.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start"
      });

      window.history.replaceState({}, "", `#${encodeURIComponent(targetId)}`);
    });
  }

  function applyRevealObserver(root = document) {
    const nodes = Array.from(root.querySelectorAll("[data-reveal]"));
    if (nodes.length === 0) {
      return;
    }

    nodes.forEach((node, index) => {
      if (node.style.getPropertyValue("--reveal-delay")) {
        return;
      }
      const delay = Math.min((index % 10) * 40, 280);
      node.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observerInstance.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    nodes.forEach((node) => observer.observe(node));
  }

  /* ========================================
     Hero Parallax Effect
     ======================================== */
  function initHeroParallax() {
    const heroMedia = byId("heroMedia");
    if (!heroMedia) {
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      const hero = heroMedia.closest(".hero");
      if (!hero) {
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const heroTop = heroRect.top;
      const heroHeight = heroRect.height;
      const windowHeight = window.innerHeight;

      // Only animate when hero is in view
      if (heroTop > windowHeight || heroTop + heroHeight < 0) {
        ticking = false;
        return;
      }

      // Calculate parallax offset (-6% to +6% based on scroll)
      const progress = (scrollY / (heroHeight * 0.5));
      const clampedProgress = Math.max(-1, Math.min(1, progress));
      const scale = 1 + (clampedProgress * 0.03); // 1 to 1.03

      heroMedia.style.transform = `scale(${scale}) translateY(${scrollY * 0.05}px)`;

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial call
    updateParallax();
  }

  /* ========================================
     Modal Functionality
     ======================================== */
  function initModal() {
    const modal = byId("workModal");
    if (!modal) {
      return;
    }

    const closeModal = () => {
      modal.setAttribute("hidden", "");
      modal.classList.remove("is-visible");
      document.body.style.overflow = "";
      
      // Reset focus
      const closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) {
        closeBtn.blur();
      }
    };

    const openModal = (workId) => {
      const workData = WORK_DATA[workId];
      if (!workData) {
        return;
      }

      const categoryEl = byId("modalCategory");
      const titleEl = byId("modalTitle");
      const descEl = byId("modalDescription");
      const howMadeEl = byId("modalHowMade");

      if (categoryEl) categoryEl.textContent = workData.category;
      if (titleEl) titleEl.textContent = workData.title;
      if (descEl) descEl.textContent = workData.description;
      if (howMadeEl) howMadeEl.textContent = workData.howMade;

      modal.removeAttribute("hidden");
      
      // Small delay for CSS transition
      requestAnimationFrame(() => {
        modal.classList.add("is-visible");
        document.body.style.overflow = "hidden";
        
        // Focus the close button for accessibility
        const closeBtn = modal.querySelector(".modal-close");
        if (closeBtn) {
          closeBtn.focus();
        }
      });
    };

    // Close on backdrop click
    const backdrop = modal.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", closeModal);
    }

    // Close on close button
    const closeButtons = modal.querySelectorAll("[data-modal-close]");
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });

    // Close on Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-visible")) {
        closeModal();
      }
    });

    // Open modal on work card click
    const workTriggers = document.querySelectorAll("[data-work-modal]");
    workTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        const workId = trigger.getAttribute("data-work-modal");
        if (workId) {
          openModal(parseInt(workId, 10));
        }
      });
    });

    // Prevent click propagation from modal content
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }
  }

  function setMetaTag(id, value) {
    const node = byId(id);
    if (!node || !value) {
      return;
    }
    node.setAttribute("content", value);
  }

  function setCanonical(url) {
    const node = byId("canonicalLink");
    if (!node || !url) {
      return;
    }
    node.setAttribute("href", url);
  }

  function applyPageMeta(options) {
    const {
      title,
      description,
      image,
      canonical,
      type,
      url
    } = options;

    if (title) {
      document.title = title;
      setMetaTag("ogTitle", title);
      setMetaTag("twitterTitle", title);
    }

    if (description) {
      setMetaTag("metaDescription", description);
      setMetaTag("ogDescription", description);
      setMetaTag("twitterDescription", description);
    }

    if (image) {
      setMetaTag("ogImage", image);
      setMetaTag("twitterImage", image);
    }

    if (type) {
      setMetaTag("ogType", type);
    }

    if (url) {
      setMetaTag("ogUrl", url);
    }

    if (canonical) {
      setCanonical(canonical);
    }
  }

  function injectSchema(graphItems) {
    const node = byId("dynamicSchema");
    if (!node) {
      return;
    }

    node.textContent = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@graph": graphItems
      },
      null,
      2
    );
  }

  function getWebsiteSchema() {
    return {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: SITE_NAME,
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`
      }
    };
  }

  function normalizeTags(rawTags) {
    const tags = Array.isArray(rawTags) ? rawTags : [];
    const seen = new Set();
    const clean = [];

    tags.forEach((tag) => {
      const label = normalizeText(tag);
      if (!label) {
        return;
      }

      const key = label.toLowerCase();
      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      clean.push(label);
    });

    return clean;
  }

  function normalizeArticle(rawArticle) {
    const slugRaw = normalizeText(rawArticle.slug || rawArticle.id || "");
    const title = normalizeText(rawArticle.title || "Untitled Article");

    return {
      id: normalizeText(rawArticle.id || slugRaw || slugify(title)),
      slug: slugRaw || slugify(title),
      title,
      excerpt: normalizeText(rawArticle.excerpt || title),
      category: normalizeText(rawArticle.category || "Portfolio"),
      tags: normalizeTags(rawArticle.tags),
      dateLabel: normalizeText(rawArticle.dateLabel),
      dateIso: normalizeText(rawArticle.dateIso),
      thumbnail: sanitizeUrl(rawArticle.thumbnail),
      thumbnailAlt: normalizeText(rawArticle.thumbnailAlt || `Thumbnail for ${title}`),
      metaTitle: normalizeText(rawArticle.metaTitle),
      metaDescription: normalizeText(rawArticle.metaDescription),
      canonical: sanitizeUrl(rawArticle.canonical),
      sourceUrl: sanitizeUrl(rawArticle.sourceUrl),
      contentPath: sanitizeUrl(rawArticle.contentPath),
      wordCount: Number(rawArticle.wordCount || 0),
      readingMinutes: Number(rawArticle.readingMinutes || 0)
    };
  }

  function compareArticleDate(a, b) {
    const dateA = a.dateIso || "1970-01-01";
    const dateB = b.dateIso || "1970-01-01";

    const byDate = dateB.localeCompare(dateA);
    if (byDate !== 0) {
      return byDate;
    }

    const aIsSuffixed = /-\d+$/.test(a.slug);
    const bIsSuffixed = /-\d+$/.test(b.slug);

    if (aIsSuffixed !== bIsSuffixed) {
      return aIsSuffixed ? 1 : -1;
    }

    return a.slug.localeCompare(b.slug);
  }

  function dedupeAndSortArticles(rawArticles) {
    const normalized = Array.isArray(rawArticles)
      ? rawArticles.map((entry) => normalizeArticle(entry))
      : [];

    normalized.sort(compareArticleDate);

    const seen = new Set();
    const deduped = [];

    normalized.forEach((article) => {
      const canonicalKey = normalizeText(article.canonical || article.sourceUrl).toLowerCase();
      const titleKey = normalizeText(article.title).toLowerCase();

      const dedupeKey = canonicalKey || titleKey;
      if (!dedupeKey) {
        return;
      }

      if (seen.has(dedupeKey)) {
        return;
      }

      seen.add(dedupeKey);
      deduped.push(article);
    });

    return deduped;
  }

  function buildTagStats(articles) {
    const map = new Map();

    articles.forEach((article) => {
      article.tags.forEach((tag) => {
        const key = tag.toLowerCase();
        const current = map.get(key) || { tag, count: 0 };
        current.count += 1;
        if (tag.length < current.tag.length) {
          current.tag = tag;
        }
        map.set(key, current);
      });
    });

    return Array.from(map.values()).sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.tag.localeCompare(b.tag);
    });
  }

  async function fetchPortfolioData() {
    if (!portfolioDataPromise) {
      portfolioDataPromise = window
        .fetch(DATA_URL, { headers: { Accept: "application/json" } })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load portfolio index (${response.status})`);
          }

          return response.json();
        })
        .then((payload) => {
          const articles = dedupeAndSortArticles(payload.articles || []);
          const tagStats = buildTagStats(articles);

          return {
            ...payload,
            articles,
            tagStats
          };
        });
    }

    return portfolioDataPromise;
  }

  function renderPortfolioCard(article, index) {
    const tags = article.tags.slice(0, 4);
    const tagsMarkup = tags
      .map((tag) => {
        const safeTag = encodeURIComponent(tag);
        return `<a class="card-tag" href="tag.html?tag=${safeTag}" aria-label="Filter by tag ${escapeHtml(
          tag
        )}">${escapeHtml(tag)}</a>`;
      })
      .join("");

    const image = article.thumbnail || DEFAULT_IMAGE;
    const safeDelay = Math.min(index * 42, 320);

    return `
      <article class="portfolio-card reveal" data-reveal style="--reveal-delay: ${safeDelay}ms">
        <div class="portfolio-thumb-wrap">
          <img
            class="portfolio-thumb"
            src="${escapeHtml(image)}"
            alt="${escapeHtml(article.thumbnailAlt || article.title)}"
            loading="lazy"
            decoding="async"
          >
        </div>
        <div class="portfolio-body">
          <p class="portfolio-date">${escapeHtml(formatDate(article))}</p>
          <h3 class="portfolio-title">
            <a href="article.html?slug=${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a>
          </h3>
          <p class="portfolio-excerpt">${escapeHtml(article.excerpt)}</p>
          <div class="card-tag-row" aria-label="Article tags">${tagsMarkup}</div>
          <a class="read-more" href="article.html?slug=${encodeURIComponent(article.slug)}" aria-label="Read ${escapeHtml(
      article.title
    )}">Read article</a>
        </div>
      </article>
    `;
  }

  function renderTagChips(tagStats, activeTag) {
    const totalTagUse = tagStats.reduce((total, entry) => total + entry.count, 0);

    return [
      `<button class="tag-chip" type="button" data-filter-tag="all" aria-pressed="${
        activeTag.toLowerCase() === "all" ? "true" : "false"
      }">All tags (${totalTagUse})</button>`,
      ...tagStats.map((entry) => {
        const isActive = entry.tag.toLowerCase() === activeTag.toLowerCase();

        return `<button class="tag-chip" type="button" data-filter-tag="${escapeHtml(
          entry.tag
        )}" aria-pressed="${isActive ? "true" : "false"}">${escapeHtml(entry.tag)} (${entry.count})</button>`;
      })
    ].join("");
  }

  function getSearchBlob(article) {
    return [article.title, article.excerpt, article.category, article.tags.join(" ")]
      .join(" ")
      .toLowerCase();
  }

  function createPortfolioController(options) {
    const {
      articles,
      tagStats,
      ids,
      pageSize = DEFAULT_PAGE_SIZE,
      initialTag = "all",
      onStateChange = () => {}
    } = options;

    const searchInput = byId(ids.searchInput);
    const tagFilters = byId(ids.tagFilters);
    const countNode = byId(ids.countNode);
    const gridNode = byId(ids.gridNode);
    const emptyNode = byId(ids.emptyNode);
    const loadMoreButton = byId(ids.loadMoreButton);

    const state = {
      search: "",
      tag: normalizeText(initialTag) || "all",
      visible: pageSize
    };

    function getFilteredArticles() {
      const searchQuery = state.search.toLowerCase();
      const activeTag = state.tag.toLowerCase();

      return articles.filter((article) => {
        if (activeTag !== "all") {
          const hasTag = article.tags.some((tag) => tag.toLowerCase() === activeTag);
          if (!hasTag) {
            return false;
          }
        }

        if (!searchQuery) {
          return true;
        }

        return getSearchBlob(article).includes(searchQuery);
      });
    }

    function updateChipState() {
      if (!tagFilters) {
        return;
      }

      const chips = Array.from(tagFilters.querySelectorAll("[data-filter-tag]"));
      chips.forEach((chip) => {
        const chipTag = normalizeText(chip.getAttribute("data-filter-tag") || "all").toLowerCase();
        chip.setAttribute("aria-pressed", chipTag === state.tag.toLowerCase() ? "true" : "false");
      });
    }

    function render() {
      if (!gridNode) {
        return;
      }

      const filtered = getFilteredArticles();
      const visibleItems = filtered.slice(0, state.visible);

      gridNode.innerHTML = visibleItems
        .map((article, index) => renderPortfolioCard(article, index))
        .join("");

      applyRevealObserver(gridNode);
      updateChipState();

      if (countNode) {
        countNode.textContent = `${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"}`;
      }

      if (emptyNode) {
        emptyNode.hidden = filtered.length !== 0;
      }

      if (loadMoreButton) {
        loadMoreButton.hidden = filtered.length <= state.visible;
      }

      onStateChange({ ...state }, filtered);
    }

    function setTag(nextTag) {
      state.tag = normalizeText(nextTag || "all") || "all";
      state.visible = pageSize;
      render();
    }

    function bindEvents() {
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          state.search = normalizeText(searchInput.value);
          state.visible = pageSize;
          render();
        });
      }

      if (tagFilters) {
        tagFilters.addEventListener("click", (event) => {
          const chip = event.target.closest("[data-filter-tag]");
          if (!chip) {
            return;
          }

          state.tag = normalizeText(chip.getAttribute("data-filter-tag") || "all") || "all";
          state.visible = pageSize;
          render();
        });
      }

      if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
          state.visible += pageSize;
          render();
        });
      }
    }

    if (tagFilters) {
      tagFilters.innerHTML = renderTagChips(tagStats, state.tag);
    }

    bindEvents();
    render();

    return {
      setTag,
      getState: () => ({ ...state }),
      render
    };
  }

  function getHomeSchema(articles) {
    const itemList = {
      "@type": "ItemList",
      name: "Portfolio",
      itemListElement: articles.slice(0, 20).map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          name: article.title,
          url: `${SITE_ORIGIN}/article.html?slug=${encodeURIComponent(article.slug)}`
        }
      }))
    };

    return [
      ORGANIZATION_SCHEMA,
      getWebsiteSchema(),
      {
        "@type": "CollectionPage",
        "@id": `${SITE_ORIGIN}/#home`,
        url: `${SITE_ORIGIN}/`,
        name: `${SITE_NAME} Portfolio`,
        description: "Portfolio-first publishing with practical writing on systems, AI, productivity, and career growth."
      },
      itemList
    ];
  }

  async function initHomePage() {
    const data = await fetchPortfolioData();

    createPortfolioController({
      articles: data.articles,
      tagStats: data.tagStats,
      ids: {
        searchInput: "homeSearch",
        tagFilters: "homeTagFilters",
        countNode: "homeCount",
        gridNode: "homeGrid",
        emptyNode: "homeEmpty",
        loadMoreButton: "homeLoadMore"
      },
      pageSize: 16
    });

    applyPageMeta({
      title: `${SITE_NAME} | Portfolio Publishing Platform`,
      description: "Portfolio-first publishing platform featuring practical writing on AI, productivity, systems, and career strategy.",
      image: DEFAULT_IMAGE,
      canonical: `${SITE_ORIGIN}/`,
      type: "website",
      url: `${SITE_ORIGIN}/`
    });

    injectSchema(getHomeSchema(data.articles));
  }

  async function initPortfolioPage() {
    const data = await fetchPortfolioData();

    createPortfolioController({
      articles: data.articles,
      tagStats: data.tagStats,
      ids: {
        searchInput: "portfolioSearch",
        tagFilters: "portfolioTagFilters",
        countNode: "portfolioCount",
        gridNode: "portfolioGrid",
        emptyNode: "portfolioEmpty",
        loadMoreButton: "portfolioLoadMore"
      },
      pageSize: 20
    });

    applyPageMeta({
      title: `Portfolio | ${SITE_NAME}`,
      description: "Browse the full portfolio archive with live search and tag filters.",
      image: DEFAULT_IMAGE,
      canonical: `${SITE_ORIGIN}/articles.html`,
      type: "website",
      url: `${SITE_ORIGIN}/articles.html`
    });

    injectSchema([
      ORGANIZATION_SCHEMA,
      getWebsiteSchema(),
      {
        "@type": "CollectionPage",
        "@id": `${SITE_ORIGIN}/articles.html#collection`,
        url: `${SITE_ORIGIN}/articles.html`,
        name: "Portfolio Archive",
        description: "Complete portfolio archive with live search and tag filtering."
      }
    ]);
  }

  function updateTagHeader(tag, count) {
    const titleNode = byId("tagTitle");
    const descriptionNode = byId("tagDescription");

    const isAll = !tag || tag.toLowerCase() === "all";

    if (titleNode) {
      titleNode.textContent = isAll ? "Tag Explorer" : `Tag: ${tag}`;
    }

    if (descriptionNode) {
      descriptionNode.textContent = isAll
        ? "Browse all tags sorted by usage, or search portfolio pieces instantly."
        : `${count} ${count === 1 ? "piece" : "pieces"} tagged "${tag}".`;
    }
  }

  async function initTagPage() {
    const data = await fetchPortfolioData();
    const params = new URLSearchParams(window.location.search);
    const requestedTag = normalizeText(params.get("tag") || "all") || "all";

    const controller = createPortfolioController({
      articles: data.articles,
      tagStats: data.tagStats,
      ids: {
        searchInput: "tagSearch",
        tagFilters: "tagTagFilters",
        countNode: "tagCount",
        gridNode: "tagGrid",
        emptyNode: "tagEmpty",
        loadMoreButton: "tagLoadMore"
      },
      pageSize: 20,
      initialTag: requestedTag,
      onStateChange: (state, filtered) => {
        updateTagHeader(state.tag, filtered.length);

        const isAll = !state.tag || state.tag.toLowerCase() === "all";
        const currentUrl = new URL(window.location.href);

        if (isAll) {
          currentUrl.searchParams.delete("tag");
        } else {
          currentUrl.searchParams.set("tag", state.tag);
        }

        window.history.replaceState({}, "", currentUrl.toString());

        applyPageMeta({
          title: isAll ? `Tag Explorer | ${SITE_NAME}` : `Tag: ${state.tag} | ${SITE_NAME}`,
          description: isAll
            ? "Browse portfolio content by high-signal tags with usage counts."
            : `Portfolio pieces tagged ${state.tag}.`,
          image: DEFAULT_IMAGE,
          canonical: currentUrl.toString(),
          type: "website",
          url: currentUrl.toString()
        });

        injectSchema([
          ORGANIZATION_SCHEMA,
          getWebsiteSchema(),
          {
            "@type": "CollectionPage",
            "@id": `${SITE_ORIGIN}/tag.html#collection`,
            url: currentUrl.toString(),
            name: isAll ? "Tag Explorer" : `Tag: ${state.tag}`,
            description: isAll
              ? "Portfolio content sorted and filterable by tags."
              : `Portfolio pieces tagged ${state.tag}.`
          }
        ]);
      }
    });

    controller.setTag(requestedTag);
  }

  function stripFrontMatter(markdown) {
    return String(markdown || "").replace(/^---\s*[\r\n]+[\s\S]*?[\r\n]---\s*/m, "");
  }

  function cleanArticleMarkdown(markdown) {
    let cleaned = stripFrontMatter(markdown).replace(/\r\n/g, "\n");

    cleaned = cleaned.replace(/^#\s+.+\n+/m, "");
    cleaned = cleaned.replace(/\nTable of Contents[\s\S]*?(?=\n##\s)/i, "\n");
    cleaned = cleaned.replace(/\n\[Toggle\]\(#\)\n?/gi, "\n");
    cleaned = cleaned.replace(/\n###\s*Share this:[\s\S]*$/i, "");
    cleaned = cleaned.replace(/\n###\s*Like this:[\s\S]*$/i, "");
    cleaned = cleaned.replace(/\n##\s*Comments[\s\S]*$/i, "");

    return cleaned.trim();
  }

  function renderInline(text) {
    const placeholders = [];

    const tokenized = String(text || "").replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      const idx = placeholders.length;
      placeholders.push({ label: normalizeText(label), url: normalizeText(url) });
      return `@@LINK_${idx}@@`;
    });

    let rendered = escapeHtml(tokenized)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");

    rendered = rendered.replace(/@@LINK_(\d+)@@/g, (_, idxValue) => {
      const link = placeholders[Number(idxValue)] || { label: "Link", url: "" };
      const href = sanitizeUrl(link.url);
      if (!href) {
        return escapeHtml(link.label);
      }

      const external = isExternalUrl(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeHtml(href)}"${external}>${escapeHtml(link.label)}</a>`;
    });

    return rendered;
  }

  function renderMarkdownImage(line) {
    const match = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/);
    if (!match) {
      return "";
    }

    const alt = normalizeText(match[1] || "Article image");
    const src = sanitizeUrl(match[2]);
    const caption = normalizeText(match[3] || "");

    if (!src) {
      return "";
    }

    return `
      <figure>
        <img src="${escapeHtml(src)}" alt="${escapeHtml(alt || "Article image")}" loading="lazy" decoding="async">
        ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  function markdownToHtml(markdown) {
    const lines = String(markdown || "").split("\n");

    // Code block delimiter - using char codes to avoid regex issues
    const CODE_BLOCK = String.fromCharCode(96, 96, 96); // 
```

    const html = [];
    let paragraphBuffer = [];
    let listType = "";
    let listItems = [];
    let quoteBuffer = [];
    let codeBuffer = [];
    let codeLanguage = "";
    let inCodeBlock = false;

    const flushParagraph = () => {
      if (paragraphBuffer.length === 0) {
        return;
      }
      html.push(`<p>${renderInline(paragraphBuffer.join(" "))}</p>`);
      paragraphBuffer = [];
    };

    const flushList = () => {
      if (!listType || listItems.length === 0) {
        return;
      }
      html.push(`<${listType}>${listItems.join("")}</${listType}>`);
      listType = "";
      listItems = [];
    };

    const flushQuote = () => {
      if (quoteBuffer.length === 0) {
        return;
      }
      html.push(`<blockquote><p>${renderInline(quoteBuffer.join(" "))}</p></blockquote>`);
      quoteBuffer = [];
    };

    const flushCode = () => {
      if (codeBuffer.length === 0) {
        return;
      }
      const className = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : "";
      html.push(`<pre><code${className}>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
      codeBuffer = [];
      codeLanguage = "";
    };

    lines.forEach((rawLine) => {
      const line = rawLine.replace(/\t/g, "    ");
      const trimmed = line.trim();

      if (inCodeBlock) {
        if (trimmed === '
```
') {
          inCodeBlock = false;
          flushCode();
        } else {
          codeBuffer.push(line);
        }
        return;
      }

      if (trimmed === '
```
') {
        flushParagraph();
        flushList();
        flushQuote();
        inCodeBlock = true;
        codeLanguage = trimmed.replace(/^
```
/, "").trim();
        return;
      }

      if (!trimmed) {
        flushParagraph();
        flushList();
        flushQuote();
        return;
      }

      const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        flushParagraph();
        flushList();
        flushQuote();
        const level = headingMatch[1].length;
        html.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
        return;
      }

      if (/^---+$/.test(trimmed)) {
        flushParagraph();
        flushList();
        flushQuote();
        html.push("<hr>");
        return;
      }

      const imageMarkup = renderMarkdownImage(trimmed);
      if (imageMarkup) {
        flushParagraph();
        flushList();
        flushQuote();
        html.push(imageMarkup);
        return;
      }

      const unorderedMatch = trimmed.match(/^[-*+]\s+(.+)$/);
      if (unorderedMatch) {
        flushParagraph();
        flushQuote();
        if (listType !== "ul") {
          flushList();
          listType = "ul";
        }
        listItems.push(`<li>${renderInline(unorderedMatch[1])}</li>`);
        return;
      }

      const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (orderedMatch) {
        flushParagraph();
        flushQuote();
        if (listType !== "ol") {
          flushList();
          listType = "ol";
        }
        listItems.push(`<li>${renderInline(orderedMatch[1])}</li>`);
        return;
      }

      const quoteMatch = trimmed.match(/^>\s?(.*)$/);
      if (quoteMatch) {
        flushParagraph();
        flushList();
        quoteBuffer.push(quoteMatch[1]);
        return;
      }

      paragraphBuffer.push(trimmed);
    });

    flushParagraph();
    flushList();
    flushQuote();
    flushCode();

    return html.join("\n");
  }

  function getArticleParent(article) {
    const firstTag = Array.isArray(article.tags) && article.tags.length > 0
      ? article.tags[0]
      : "";

    if (firstTag) {
      const href = `tag.html?tag=${encodeURIComponent(firstTag)}`;
      return {
        name: firstTag,
        href,
        schemaItem: `${SITE_ORIGIN}/${href}`
      };
    }

    const category = normalizeText(article.category);
    if (category) {
      return {
        name: category,
        href: "articles.html",
        schemaItem: `${SITE_ORIGIN}/articles.html`
      };
    }

    return {
      name: "Portfolio",
      href: "articles.html",
      schemaItem: `${SITE_ORIGIN}/articles.html`
    };
  }

  function renderArticleError(message) {
    const titleNode = byId("articleTitle");
    const metaNode = byId("articleMeta");
    const contentNode = byId("articleContent");

    if (titleNode) {
      titleNode.textContent = "Article not available";
    }

    if (metaNode) {
      metaNode.textContent = "";
    }

    if (contentNode) {
      contentNode.innerHTML = `<p class="empty-state">${escapeHtml(message)}</p>`;
    }
  }

  async function initArticlePage() {
    const params = new URLSearchParams(window.location.search);
    const slug = normalizeText(params.get("slug"));

    if (!slug) {
      renderArticleError("No article slug was provided.");
      return;
    }

    const data = await fetchPortfolioData();
    const article = data.articles.find((entry) => entry.slug === slug);

    if (!article) {
      renderArticleError("The requested article could not be found.");
      return;
    }

    const titleNode = byId("articleTitle");
    const metaNode = byId("articleMeta");
    const tagsNode = byId("articleTags");
    const contentNode = byId("articleContent");
    const breadcrumbCurrent = byId("breadcrumbCurrent");
    const breadcrumbParent = byId("breadcrumbParent");
    const heroWrap = byId("articleHero");
    const heroImage = byId("articleHeroImage");

    if (titleNode) {
      titleNode.textContent = article.title;
    }

    if (metaNode) {
      const minutes = article.readingMinutes > 0 ? article.readingMinutes : Math.max(1, Math.round(article.wordCount / 220));
      metaNode.textContent = `${formatDate(article)}${minutes ? ` • ${minutes} min read` : ""}`;
    }

    if (tagsNode) {
      tagsNode.innerHTML = article.tags
        .map((tag) => `<a href="tag.html?tag=${encodeURIComponent(tag)}">${escapeHtml(tag)}</a>`)
        .join("");
    }

    if (breadcrumbCurrent) {
      breadcrumbCurrent.textContent = article.title;
    }

    const parent = getArticleParent(article);

    if (breadcrumbParent) {
      breadcrumbParent.textContent = parent.name;
      breadcrumbParent.setAttribute("href", parent.href);
    }

    if (heroWrap && heroImage) {
      const image = article.thumbnail || DEFAULT_IMAGE;
      heroWrap.hidden = !image;
      heroImage.setAttribute("src", image);
      heroImage.setAttribute("alt", article.thumbnailAlt || article.title);
      heroImage.setAttribute("loading", "eager");
      heroImage.setAttribute("decoding", "async");
    }

    if (!contentNode) {
      return;
    }

    const contentPath = sanitizeUrl(article.contentPath);

    if (!contentPath) {
      renderArticleError("Article content path is missing.");
      return;
    }

    let markdown;
    try {
      const response = await window.fetch(contentPath, {
        headers: { Accept: "text/markdown,text/plain" }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content (${response.status})`);
      }

      markdown = await response.text();
    } catch (error) {
      renderArticleError(`Unable to load article content. ${error.message}`);
      return;
    }

    const cleanedMarkdown = cleanArticleMarkdown(markdown);
    const html = markdownToHtml(cleanedMarkdown);
    contentNode.innerHTML = html;

    Array.from(contentNode.children).forEach((child) => {
      child.setAttribute("data-reveal", "");
    });

    applyRevealObserver(contentNode);

    const canonical = article.canonical || `${SITE_ORIGIN}/article.html?slug=${encodeURIComponent(article.slug)}`;

    applyPageMeta({
      title: `${article.title} | ${SITE_NAME}`,
      description: article.metaDescription || article.excerpt,
      image: article.thumbnail || DEFAULT_IMAGE,
      canonical,
      type: "article",
      url: canonical
    });

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: parent.name,
          item: parent.schemaItem
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: canonical
        }
      ]
    };

    const articleSchema = {
      "@type": "Article",
      "@id": canonical,
      headline: article.title,
      description: article.metaDescription || article.excerpt,
      datePublished: article.dateIso || data.generatedAt,
      dateModified: data.generatedAt,
      image: article.thumbnail ? [article.thumbnail] : [DEFAULT_IMAGE],
      keywords: article.tags.join(", "),
      author: {
        "@type": "Person",
        name: SITE_NAME
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical
      }
    };

    injectSchema([ORGANIZATION_SCHEMA, breadcrumbSchema, articleSchema]);
  }

  function initAboutPage() {
    applyPageMeta({
      title: `About | ${SITE_NAME}`,
      description: "About the portfolio publishing platform, editorial direction, and working principles.",
      image: DEFAULT_IMAGE,
      canonical: `${SITE_ORIGIN}/about.html`,
      type: "profile",
      url: `${SITE_ORIGIN}/about.html`
    });

    injectSchema([
      ORGANIZATION_SCHEMA,
      {
        "@type": "AboutPage",
        "@id": `${SITE_ORIGIN}/about.html#about`,
        url: `${SITE_ORIGIN}/about.html`,
        name: `About ${SITE_NAME}`,
        description: "Editorial direction and publishing operating model."
      }
    ]);
  }

  function initContactPage() {
    applyPageMeta({
      title: `Contact | ${SITE_NAME}`,
      description: "Contact page for editorial requests, collaborations, and newsletter access.",
      image: DEFAULT_IMAGE,
      canonical: `${SITE_ORIGIN}/contact.html`,
      type: "website",
      url: `${SITE_ORIGIN}/contact.html`
    });

    injectSchema([
      ORGANIZATION_SCHEMA,
      {
        "@type": "ContactPage",
        "@id": `${SITE_ORIGIN}/contact.html#contact`,
        url: `${SITE_ORIGIN}/contact.html`,
        name: `Contact ${SITE_NAME}`
      }
    ]);
  }

  function initPolicyPage(page) {
    const policyMap = {
      "editorial-policy": {
        title: `Editorial Policy | ${SITE_NAME}`,
        description: "Editorial standards, review workflow, updates, and correction policy.",
        canonical: `${SITE_ORIGIN}/editorial-policy.html`
      },
      terms: {
        title: `Terms of Use | ${SITE_NAME}`,
        description: "Terms governing use of this website and published material.",
        canonical: `${SITE_ORIGIN}/terms.html`
      },
      privacy: {
        title: `Privacy Policy | ${SITE_NAME}`,
        description: "How information is collected, used, stored, and protected.",
        canonical: `${SITE_ORIGIN}/privacy.html`
      },
      disclaimer: {
        title: `Disclaimer | ${SITE_NAME}`,
        description: "Important limitation, responsibility, and risk notes for this website.",
        canonical: `${SITE_ORIGIN}/disclaimer.html`
      }
    };

    const config = policyMap[page];
    if (!config) {
      return;
    }

    applyPageMeta({
      title: config.title,
      description: config.description,
      image: DEFAULT_IMAGE,
      canonical: config.canonical,
      type: "website",
      url: config.canonical
    });

    injectSchema([
      ORGANIZATION_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${config.canonical}#page`,
        url: config.canonical,
        name: config.title,
        description: config.description
      }
    ]);
  }

  function handlePageError(error) {
    const page = document.body.getAttribute("data-page") || "";

    const emptyMap = {
      home: byId("homeEmpty"),
      portfolio: byId("portfolioEmpty"),
      tag: byId("tagEmpty")
    };

    const node = emptyMap[page];
    if (node) {
      node.hidden = false;
      node.textContent = `Unable to load content: ${error.message}`;
    }
  }

  async function initPage() {
    setFooterYear();
    initPrimaryNav();
    markActiveNav();
    bindSmoothInternalAnchors();
    applyRevealObserver(document);
    
    // Initialize new components for Firefly-inspired design
    initHeroParallax();
    initModal();

    const page = document.body.getAttribute("data-page") || "";

    try {
      if (page === "home") {
        await initHomePage();
      } else if (page === "portfolio") {
        await initPortfolioPage();
      } else if (page === "tag") {
        await initTagPage();
      } else if (page === "article") {
        await initArticlePage();
      } else if (page === "about") {
        initAboutPage();
      } else if (page === "contact") {
        initContactPage();
      } else if (["editorial-policy", "terms", "privacy", "disclaimer"].includes(page)) {
        initPolicyPage(page);
      }
    } catch (error) {
      handlePageError(error);
    }
  }

  initPage();
})();
