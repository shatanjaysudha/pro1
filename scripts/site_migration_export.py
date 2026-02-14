#!/usr/bin/env python3
"""Crawl a public website and export a migration-ready content package.

Outputs:
- site_content_dump.json
- articles/*.md
- pages/*.md
- media/* (original + webp + lqip)
- navigation.json
- taxonomy.json
- seo_metadata.json
- schema_data.json
- internal_links_map.json
- MIGRATION_PLAN.md
- QA_REPORT.md
- CHANGELOG.md
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import posixpath
import re
import time
from collections import Counter, deque
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Set, Tuple
from urllib.parse import parse_qsl, urlencode, urljoin, urlparse, urlunparse
from urllib.robotparser import RobotFileParser

# Local vendored dependencies
import sys

DEPS_DIR = Path(__file__).resolve().parent / ".deps"
if DEPS_DIR.exists():
    sys.path.insert(0, str(DEPS_DIR))

import requests
import yaml
from bs4 import BeautifulSoup
from lxml import etree
from markdownify import markdownify as md
from PIL import Image, ImageFilter, UnidentifiedImageError
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


TRACKING_QUERY_PREFIXES = (
    "utm_",
    "fbclid",
    "gclid",
    "igshid",
    "mc_cid",
    "mc_eid",
)

EXPECTED_TAXONOMY_CATEGORIES = [
    "Articles",
    "AI",
    "Productivity",
    "Career",
    "Job Search",
    "Newsletter",
    "Resources",
    "Intellectual Hub",
    "Platform",
    "Efficiency Labs",
    "Gear",
    "Templates",
]

ARTICLE_SCHEMA_TYPES = {
    "article",
    "blogposting",
    "newsarticle",
    "report",
    "analysisnewsarticle",
}

SKIP_PATH_NEEDLES = (
    "/wp-json/",
    "/wp-admin/",
    "/wp-login.php",
    "/xmlrpc.php",
    "/feed/",
    "/comments/",
    "/embed/",
)


@dataclass
class FetchResult:
    url: str
    status_code: int
    content_type: str
    text: str
    content: bytes
    error: Optional[str] = None


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    return value or "item"


def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def normalize_query(query: str) -> str:
    if not query:
        return ""
    kept = []
    for key, val in parse_qsl(query, keep_blank_values=True):
        low = key.lower()
        if low.startswith(TRACKING_QUERY_PREFIXES):
            continue
        kept.append((key, val))
    if not kept:
        return ""
    return urlencode(kept, doseq=True)


def normalize_url(url: str, base_url: str = "") -> str:
    if not url:
        return ""
    abs_url = urljoin(base_url, url)
    p = urlparse(abs_url)
    if p.scheme not in {"http", "https"}:
        return ""
    scheme = p.scheme.lower()
    netloc = p.netloc.lower()
    path = p.path or "/"
    path = re.sub(r"/{2,}", "/", path)
    if path != "/" and path.endswith("/"):
        path = path[:-1]
    query = normalize_query(p.query)
    return urlunparse((scheme, netloc, path, "", query, ""))


def strip_www(host: str) -> str:
    return host[4:] if host.startswith("www.") else host


def same_domain(url: str, base_host: str) -> bool:
    host = urlparse(url).netloc.lower()
    return strip_www(host) == strip_www(base_host)


def safe_filename(name: str) -> str:
    name = name.strip()
    name = re.sub(r"[^\w.\-]+", "-", name, flags=re.ASCII)
    name = re.sub(r"-{2,}", "-", name).strip("-")
    return name or "file"


def choose_best_src(src: str, srcset: str, page_url: str) -> str:
    src_abs = normalize_url(src, page_url)
    best = src_abs
    best_width = -1
    for item in (srcset or "").split(","):
        part = item.strip()
        if not part:
            continue
        bits = part.split()
        candidate = normalize_url(bits[0], page_url)
        width = -1
        if len(bits) > 1 and bits[1].endswith("w"):
            try:
                width = int(bits[1][:-1])
            except ValueError:
                width = -1
        if width > best_width and candidate:
            best = candidate
            best_width = width
    return best or src_abs


def parse_json_or_none(raw: str) -> Any:
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


def flatten_json_ld(item: Any) -> List[Dict[str, Any]]:
    out: List[Dict[str, Any]] = []
    if isinstance(item, list):
        for child in item:
            out.extend(flatten_json_ld(child))
    elif isinstance(item, dict):
        if "@graph" in item and isinstance(item["@graph"], list):
            out.extend(flatten_json_ld(item["@graph"]))
        else:
            out.append(item)
    return out


def extract_breadcrumbs(soup: BeautifulSoup, schema_blocks: List[Dict[str, Any]]) -> List[str]:
    crumbs: List[str] = []
    for obj in schema_blocks:
        t = obj.get("@type")
        types = {t.lower()} if isinstance(t, str) else {x.lower() for x in t or [] if isinstance(x, str)}
        if "breadcrumblist" not in types:
            continue
        for li in obj.get("itemListElement", []):
            if isinstance(li, dict):
                name = li.get("name")
                if isinstance(name, str) and clean_text(name):
                    crumbs.append(clean_text(name))
    if crumbs:
        return crumbs
    nav = soup.select_one('nav[aria-label*="breadcrumb" i], .breadcrumb, .breadcrumbs')
    if not nav:
        return []
    for a in nav.select("a, span, li"):
        txt = clean_text(a.get_text(" ", strip=True))
        if txt:
            crumbs.append(txt)
    deduped = []
    seen = set()
    for c in crumbs:
        if c.lower() in seen:
            continue
        seen.add(c.lower())
        deduped.append(c)
    return deduped


def taxonomy_from_record(record: Dict[str, Any]) -> Tuple[Optional[str], List[str]]:
    categories: List[str] = []
    tags: List[str] = []

    for obj in record.get("schema", []):
        if not isinstance(obj, dict):
            continue
        section = obj.get("articleSection")
        if isinstance(section, str):
            categories.extend([clean_text(x) for x in section.split(",") if clean_text(x)])
        elif isinstance(section, list):
            categories.extend([clean_text(str(x)) for x in section if clean_text(str(x))])
        keywords = obj.get("keywords")
        if isinstance(keywords, str):
            tags.extend([clean_text(x) for x in keywords.split(",") if clean_text(x)])
        elif isinstance(keywords, list):
            tags.extend([clean_text(str(x)) for x in keywords if clean_text(str(x))])

    for bc in record.get("breadcrumbs", []):
        low = bc.lower()
        if low in {"home", "front page"}:
            continue
        if low in {"newsletter", "resources", "gear", "templates", "platform", "intellectual hub"}:
            categories.append(bc)

    path = record.get("path", "").lower()
    inferred = {
        "newsletter": "Newsletter",
        "resources": "Resources",
        "gear": "Gear",
        "template": "Templates",
        "ai": "AI",
        "career": "Career",
        "job-search": "Job Search",
        "productivity": "Productivity",
    }
    for needle, name in inferred.items():
        if needle in path:
            categories.append(name)

    category = None
    if categories:
        category = categories[0]
    tags = sorted({t for t in tags if t})
    return category, tags


def classify_page(record: Dict[str, Any]) -> str:
    path = record.get("path", "").lower()
    schema_types: Set[str] = set()
    for obj in record.get("schema", []):
        t = obj.get("@type")
        if isinstance(t, str):
            schema_types.add(t.lower())
        elif isinstance(t, list):
            schema_types.update({x.lower() for x in t if isinstance(x, str)})

    if schema_types & ARTICLE_SCHEMA_TYPES:
        return "article"
    if "newsletter" in path:
        return "article"
    if any(seg in path for seg in ["/blog", "/article", "/post"]):
        return "article"
    return "page"


def build_new_path(record: Dict[str, Any], used: Set[str]) -> str:
    old_path = record.get("path", "/")
    slug = slugify(old_path.strip("/") or "home")
    section = "pages"
    if record.get("content_type") == "article":
        if "newsletter" in old_path.lower():
            section = "newsletter"
        else:
            section = "articles"
    candidate = f"/{section}/{slug}/"
    i = 2
    while candidate in used:
        candidate = f"/{section}/{slug}-{i}/"
        i += 1
    used.add(candidate)
    return candidate


def markdown_frontmatter(frontmatter: Dict[str, Any], body: str) -> str:
    yaml_frontmatter = yaml.safe_dump(frontmatter, sort_keys=False, allow_unicode=False).strip()
    return f"---\n{yaml_frontmatter}\n---\n\n{body.strip()}\n"


def image_role(img_tag: Any, index: int) -> str:
    classes = " ".join(img_tag.get("class", [])).lower()
    alt = (img_tag.get("alt") or "").lower()
    src = (img_tag.get("src") or "").lower()
    if index == 0 and any(k in classes for k in ["hero", "banner"]):
        return "hero"
    if any(k in classes for k in ["thumb", "thumbnail"]) or "thumb" in src or "thumbnail" in src:
        return "thumbnail"
    if "hero" in classes or "hero" in alt:
        return "hero"
    return "inline"


def suggest_alt_from_url(url: str) -> str:
    path = urlparse(url).path
    name = Path(path).stem
    name = re.sub(r"[_\-]+", " ", name)
    name = re.sub(r"\d+", " ", name)
    words = [w for w in name.split() if len(w) > 1]
    if not words:
        return "Website image"
    return clean_text(" ".join(words)).capitalize()


def path_depth_score(word_count: int) -> int:
    if word_count >= 1800:
        return 5
    if word_count >= 1200:
        return 4
    if word_count >= 700:
        return 3
    if word_count >= 300:
        return 2
    return 1


class SiteMigrationExporter:
    def __init__(self, source: str, output_dir: Path, max_pages: int = 500, delay: float = 0.2) -> None:
        self.source = normalize_url(source)
        if not self.source:
            raise ValueError("Invalid source URL.")
        parsed = urlparse(self.source)
        self.base_host = parsed.netloc
        self.output_dir = output_dir
        self.max_pages = max_pages
        self.delay = delay

        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "SiteMigrationExporter/1.0 (+content migration bot; respects robots.txt)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            }
        )
        retry = Retry(
            total=2,
            connect=2,
            read=2,
            backoff_factor=0.3,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET", "HEAD"],
        )
        adapter = HTTPAdapter(max_retries=retry, pool_connections=20, pool_maxsize=20)
        self.session.mount("https://", adapter)
        self.session.mount("http://", adapter)
        self.robot_parser = RobotFileParser()
        self.allowed_by_default = True

        self.pages: List[Dict[str, Any]] = []
        self.url_status: Dict[str, int] = {}
        self.fetch_errors: Dict[str, str] = {}
        self.media_manifest: List[Dict[str, Any]] = []
        self.navigation: Dict[str, Any] = {}
        self.taxonomy: Dict[str, Any] = {}
        self.internal_links_map: Dict[str, Any] = {}
        self.qa_report: Dict[str, Any] = {}

    def allowed(self, url: str) -> bool:
        if not self.robot_parser:
            return True
        try:
            return bool(self.robot_parser.can_fetch("*", url))
        except Exception:
            return True

    def fetch(self, url: str, timeout: Tuple[int, int] = (6, 15)) -> FetchResult:
        try:
            resp = self.session.get(url, timeout=timeout)
            content_type = resp.headers.get("Content-Type", "").lower()
            text = ""
            if "text" in content_type or "json" in content_type or "xml" in content_type or "html" in content_type:
                resp.encoding = resp.encoding or "utf-8"
                text = resp.text
            return FetchResult(
                url=url,
                status_code=resp.status_code,
                content_type=content_type,
                text=text,
                content=resp.content,
                error=None,
            )
        except requests.RequestException as exc:
            return FetchResult(
                url=url,
                status_code=0,
                content_type="",
                text="",
                content=b"",
                error=str(exc),
            )

    def should_skip_url(self, url: str) -> bool:
        lower = url.lower()
        if re.search(r"\.(jpg|jpeg|png|gif|webp|svg|pdf|zip|xml|json|txt|ico|css|js)$", lower):
            return True
        parsed = urlparse(lower)
        if any(needle in parsed.path for needle in SKIP_PATH_NEEDLES):
            return True
        if parsed.path.endswith("/amp"):
            return True
        query = parsed.query
        if "replytocom=" in query or "share=" in query:
            return True
        return False

    def load_robots(self) -> List[str]:
        robots_url = normalize_url("/robots.txt", self.source)
        result = self.fetch(robots_url)
        sitemap_urls: List[str] = []
        if result.status_code and result.status_code < 400 and result.text:
            self.robot_parser.parse(result.text.splitlines())
            self.allowed_by_default = True
            for line in result.text.splitlines():
                if line.lower().startswith("sitemap:"):
                    sm = normalize_url(line.split(":", 1)[1].strip())
                    if sm:
                        sitemap_urls.append(sm)
        else:
            self.allowed_by_default = True

        default_candidates = [
            normalize_url("/sitemap.xml", self.source),
            normalize_url("/sitemap_index.xml", self.source),
            normalize_url("/wp-sitemap.xml", self.source),
        ]
        all_sitemaps = []
        seen = set()
        for sm in sitemap_urls + default_candidates:
            if sm and sm not in seen:
                seen.add(sm)
                all_sitemaps.append(sm)
        return all_sitemaps

    def parse_sitemap(self, sitemap_url: str) -> Tuple[List[str], List[str]]:
        result = self.fetch(sitemap_url)
        if result.status_code >= 400 or not result.content:
            return [], []
        try:
            root = etree.fromstring(result.content)
        except etree.XMLSyntaxError:
            return [], []
        urls: List[str] = []
        child_sitemaps: List[str] = []
        node_name = etree.QName(root.tag).localname.lower()
        parent_name = "sitemap" if node_name == "sitemapindex" else "url"
        for parent in root.iter():
            if etree.QName(parent.tag).localname.lower() != parent_name:
                continue
            loc_text = ""
            for child in parent:
                if etree.QName(child.tag).localname.lower() == "loc":
                    loc_text = clean_text(child.text or "")
                    break
            loc_url = normalize_url(loc_text)
            if not loc_url:
                continue
            if node_name == "sitemapindex":
                child_sitemaps.append(loc_url)
            else:
                urls.append(loc_url)
        return urls, child_sitemaps

    def discover_urls_from_sitemaps(self, sitemap_urls: List[str]) -> Set[str]:
        urls: Set[str] = set()
        queue = deque(sitemap_urls)
        seen = set()
        print(f"[sitemap] starting discovery from {len(sitemap_urls)} sitemap endpoints", flush=True)
        while queue:
            sm = queue.popleft()
            if sm in seen:
                continue
            seen.add(sm)
            page_urls, children = self.parse_sitemap(sm)
            print(
                f"[sitemap] {sm} -> pages={len(page_urls)} child_sitemaps={len(children)}",
                flush=True,
            )
            for u in page_urls:
                if same_domain(u, self.base_host):
                    urls.add(u)
            for c in children:
                if c not in seen:
                    queue.append(c)
        return urls

    def crawl(self) -> None:
        sitemap_urls = self.load_robots()
        seed_urls = self.discover_urls_from_sitemaps(sitemap_urls)
        seed_urls.add(self.source)

        queue = deque(sorted(seed_urls))
        queued: Set[str] = set(queue)
        visited: Set[str] = set()
        print(f"[crawl] seed urls={len(seed_urls)} max_pages={self.max_pages}", flush=True)

        while queue and len(visited) < self.max_pages:
            url = queue.popleft()
            queued.discard(url)
            url = normalize_url(url)
            if not url or url in visited:
                continue
            if not same_domain(url, self.base_host):
                continue
            if not self.allowed(url):
                continue
            if self.should_skip_url(url):
                continue
            visited.add(url)

            result = self.fetch(url)
            self.url_status[url] = result.status_code
            if result.error:
                self.fetch_errors[url] = result.error
                continue
            if result.status_code >= 400:
                continue
            if "html" not in result.content_type and "<html" not in result.text.lower():
                continue

            page = self.extract_page(url, result.text)
            page["status_code"] = result.status_code
            self.pages.append(page)

            for link in page.get("internal_links", []):
                n_link = normalize_url(link)
                if not n_link:
                    continue
                if n_link in visited:
                    continue
                if n_link in queued:
                    continue
                if not same_domain(n_link, self.base_host):
                    continue
                if self.should_skip_url(n_link):
                    continue
                queue.append(n_link)
                queued.add(n_link)

            if len(visited) % 25 == 0:
                print(
                    f"[crawl] visited={len(visited)} extracted_pages={len(self.pages)} queue={len(queue)}",
                    flush=True,
                )

            if self.delay:
                time.sleep(self.delay)

    def extract_page(self, url: str, html: str) -> Dict[str, Any]:
        soup = BeautifulSoup(html, "lxml")
        parsed = urlparse(url)
        path = parsed.path or "/"
        if path != "/" and path.endswith("/"):
            path = path[:-1]

        title_tag = soup.find("title")
        page_title = clean_text(title_tag.get_text(" ", strip=True) if title_tag else "")
        meta_title = clean_text(
            (soup.select_one("meta[property='og:title']") or {}).get("content", "")  # type: ignore[union-attr]
        ) or page_title
        meta_description = clean_text(
            (soup.select_one("meta[name='description']") or {}).get("content", "")  # type: ignore[union-attr]
        )
        canonical = clean_text(
            (soup.select_one("link[rel='canonical']") or {}).get("href", "")  # type: ignore[union-attr]
        )
        canonical = normalize_url(canonical, url) if canonical else ""

        schema_blocks: List[Dict[str, Any]] = []
        for node in soup.select("script[type='application/ld+json']"):
            raw = (node.string or node.get_text() or "").strip()
            if not raw:
                continue
            loaded = parse_json_or_none(raw)
            if loaded is None:
                continue
            schema_blocks.extend(flatten_json_ld(loaded))

        breadcrumbs = extract_breadcrumbs(soup, schema_blocks)

        main = soup.find("main") or soup.find("article") or soup.find("body") or soup
        working = BeautifulSoup(str(main), "lxml")
        for trash in working(["script", "style", "noscript"]):
            trash.decompose()

        heading_nodes = working.select("h1, h2, h3, h4, h5, h6")
        headings = [
            {"level": int(h.name[1]), "text": clean_text(h.get_text(" ", strip=True))}
            for h in heading_nodes
            if clean_text(h.get_text(" ", strip=True))
        ]

        body_markdown = md(
            str(working),
            heading_style="ATX",
            bullets="-",
            strip=["script", "style", "noscript"],
        )
        body_markdown = re.sub(r"\n{3,}", "\n\n", body_markdown).strip()
        body_text = clean_text(working.get_text(" ", strip=True))

        images = []
        for i, img in enumerate(working.select("img")):
            src = img.get("src", "")
            srcset = img.get("srcset", "")
            full = choose_best_src(src, srcset, url)
            if not full:
                continue
            alt = clean_text(img.get("alt", ""))
            title = clean_text(img.get("title", ""))
            caption = ""
            figure = img.find_parent("figure")
            if figure:
                cap_node = figure.find("figcaption")
                if cap_node:
                    caption = clean_text(cap_node.get_text(" ", strip=True))
            images.append(
                {
                    "src": full,
                    "original_src": normalize_url(src, url),
                    "alt": alt,
                    "caption": caption or title,
                    "role": image_role(img, i),
                    "srcset": srcset,
                    "width": img.get("width"),
                    "height": img.get("height"),
                }
            )

        internal_links = []
        for a in working.select("a[href]"):
            href = normalize_url(a.get("href", ""), url)
            if not href:
                continue
            if same_domain(href, self.base_host):
                internal_links.append(href)
        internal_links = sorted(set(internal_links))

        sidebar_refs = []
        for aside in soup.select("aside"):
            for a in aside.select("a[href]"):
                txt = clean_text(a.get_text(" ", strip=True))
                href = normalize_url(a.get("href", ""), url)
                if txt and href:
                    sidebar_refs.append({"text": txt, "url": href})

        related_refs = []
        related_candidates = soup.select("[class*='related' i] a[href], [id*='related' i] a[href]")
        for a in related_candidates:
            txt = clean_text(a.get_text(" ", strip=True))
            href = normalize_url(a.get("href", ""), url)
            if txt and href:
                related_refs.append({"text": txt, "url": href})
        related_refs = list({(r["text"], r["url"]): r for r in related_refs}.values())

        forms = []
        for form in working.select("form"):
            action = normalize_url(form.get("action", ""), url) or url
            method = (form.get("method", "get") or "get").lower()
            inputs = []
            for field in form.select("input, textarea, select"):
                name = field.get("name") or field.get("id") or field.get("type") or "field"
                ftype = field.get("type") or field.name
                inputs.append({"name": clean_text(name), "type": clean_text(ftype)})
            forms.append({"action": action, "method": method, "inputs": inputs})

        ctas = []
        for node in working.select("a, button"):
            txt = clean_text(node.get_text(" ", strip=True))
            if not txt:
                continue
            marker = " ".join(node.get("class", [])).lower() + " " + (node.get("id") or "").lower() + " " + txt.lower()
            if any(k in marker for k in ["cta", "button", "subscribe", "join", "download", "start", "buy", "learn"]):
                href = normalize_url(node.get("href", ""), url) if node.name == "a" else ""
                ctas.append({"text": txt, "url": href})
        ctas = list({(c["text"], c.get("url", "")): c for c in ctas}.values())

        record: Dict[str, Any] = {
            "url": url,
            "path": path,
            "title": page_title,
            "meta_title": meta_title,
            "meta_description": meta_description,
            "canonical": canonical,
            "breadcrumbs": breadcrumbs,
            "schema": schema_blocks,
            "headings": headings,
            "body_markdown": body_markdown,
            "body_text": body_text,
            "images": images,
            "internal_links": internal_links,
            "sidebar_references": sidebar_refs,
            "related_links": related_refs,
            "forms": forms,
            "cta_blocks": ctas,
            "meta": {
                "og_title": clean_text(
                    (soup.select_one("meta[property='og:title']") or {}).get("content", "")  # type: ignore[union-attr]
                ),
                "og_description": clean_text(
                    (soup.select_one("meta[property='og:description']") or {}).get("content", "")  # type: ignore[union-attr]
                ),
                "og_image": normalize_url(
                    (soup.select_one("meta[property='og:image']") or {}).get("content", ""), url  # type: ignore[union-attr]
                ),
                "canonical": canonical,
            },
            "hero_image": next((img["src"] for img in images if img["role"] == "hero"), ""),
        }
        category, tags = taxonomy_from_record(record)
        record["category"] = category
        record["tags"] = tags
        record["content_type"] = classify_page(record)
        return record

    def extract_global_navigation(self) -> Dict[str, Any]:
        home = None
        for page in self.pages:
            if page.get("path") in {"", "/"}:
                home = page
                break
        home_url = self.source if not home else home["url"]
        result = self.fetch(home_url)
        if result.status_code >= 400 or not result.text:
            return {
                "site_logo_text": "",
                "header_navigation": [],
                "sidebar_items": [],
                "footer_links": [],
                "mobile_navigation": [],
                "theme_switcher": {},
            }
        soup = BeautifulSoup(result.text, "lxml")

        logo_text = ""
        header = soup.find("header")
        if header:
            logo = header.select_one("a[rel='home'], .custom-logo-link, .site-title a, a")
            if logo:
                logo_text = clean_text(logo.get_text(" ", strip=True))

        def nav_links(container: Any) -> List[Dict[str, str]]:
            links = []
            for a in container.select("a[href]"):
                txt = clean_text(a.get_text(" ", strip=True))
                href = normalize_url(a.get("href", ""), home_url)
                if txt and href and same_domain(href, self.base_host):
                    links.append({"text": txt, "url": href})
            dedup = list({(x["text"], x["url"]): x for x in links}.values())
            return dedup

        header_links = nav_links(header) if header else []
        footer = soup.find("footer")
        footer_links = nav_links(footer) if footer else []

        mobile_links = []
        for node in soup.select("[class*='mobile' i], [id*='mobile' i], [class*='drawer' i]"):
            mobile_links.extend(nav_links(node))
        mobile_links = list({(x["text"], x["url"]): x for x in mobile_links}.values())

        theme_nodes = soup.select(
            "[class*='theme-toggle' i], [id*='theme-toggle' i], [data-theme], [aria-label*='theme' i]"
        )
        theme_switcher = {
            "present": bool(theme_nodes),
            "selectors": sorted({node.name + "." + ".".join(node.get("class", [])) for node in theme_nodes}),
        }

        sidebar_counter = Counter()
        for page in self.pages:
            for ref in page.get("sidebar_references", []):
                key = (ref.get("text", ""), ref.get("url", ""))
                sidebar_counter[key] += 1
        sidebar_items = [
            {"text": k[0], "url": k[1], "occurrences": c}
            for k, c in sidebar_counter.most_common()
            if k[0] and k[1]
        ]

        return {
            "site_logo_text": logo_text,
            "header_navigation": header_links,
            "sidebar_items": sidebar_items,
            "footer_links": footer_links,
            "mobile_navigation": mobile_links,
            "theme_switcher": theme_switcher,
        }

    def build_taxonomy(self) -> Dict[str, Any]:
        categories = Counter()
        tags = Counter()
        for p in self.pages:
            if p.get("category"):
                categories[p["category"]] += 1
            for tag in p.get("tags", []):
                tags[tag] += 1

        for expected in EXPECTED_TAXONOMY_CATEGORIES:
            categories.setdefault(expected, 0)

        return {
            "categories": [{"name": name, "count": count} for name, count in sorted(categories.items())],
            "tags": [{"name": name, "count": count} for name, count in sorted(tags.items())],
        }

    def export_markdown_content(self) -> Dict[str, str]:
        articles_dir = self.output_dir / "articles"
        pages_dir = self.output_dir / "pages"
        articles_dir.mkdir(parents=True, exist_ok=True)
        pages_dir.mkdir(parents=True, exist_ok=True)

        used_filenames: Set[str] = set()
        url_to_md_path: Dict[str, str] = {}

        for page in self.pages:
            slug = slugify(page["path"].strip("/") or "home")
            folder = articles_dir if page.get("content_type") == "article" else pages_dir
            filename = f"{slug}.md"
            i = 2
            while str(folder / filename) in used_filenames:
                filename = f"{slug}-{i}.md"
                i += 1
            full_path = folder / filename
            used_filenames.add(str(full_path))

            frontmatter = {
                "title": page.get("title") or page.get("meta_title"),
                "url": page.get("url"),
                "path": page.get("path"),
                "meta_title": page.get("meta_title"),
                "meta_description": page.get("meta_description"),
                "canonical": page.get("canonical"),
                "content_type": page.get("content_type"),
                "category": page.get("category"),
                "tags": page.get("tags", []),
                "old_url": page.get("url"),
                "new_url": page.get("new_path"),
                "status_code": page.get("status_code"),
            }
            full_path.write_text(
                markdown_frontmatter(frontmatter, page.get("body_markdown", "")),
                encoding="utf-8",
            )
            url_to_md_path[page["url"]] = str(full_path.relative_to(self.output_dir))
        return url_to_md_path

    def media_local_path(self, image_url: str, ext_hint: str = "") -> Path:
        parsed = urlparse(image_url)
        path = parsed.path.strip("/")
        if not path:
            name = hashlib.sha1(image_url.encode("utf-8")).hexdigest()[:16] + (ext_hint or ".bin")
            return Path("original") / name
        parts = [safe_filename(p) for p in path.split("/") if p]
        if not parts:
            name = hashlib.sha1(image_url.encode("utf-8")).hexdigest()[:16] + (ext_hint or ".bin")
            return Path("original") / name
        last = parts[-1]
        if "." not in last and ext_hint:
            last = last + ext_hint
            parts[-1] = last
        return Path("original") / Path(*parts)

    def download_and_transform_media(self) -> None:
        media_dir = self.output_dir / "media"
        original_root = media_dir / "original"
        webp_root = media_dir / "webp"
        lqip_root = media_dir / "lqip"
        original_root.mkdir(parents=True, exist_ok=True)
        webp_root.mkdir(parents=True, exist_ok=True)
        lqip_root.mkdir(parents=True, exist_ok=True)

        unique_images = {}
        for page in self.pages:
            for img in page.get("images", []):
                src = normalize_url(img.get("src", ""))
                if not src or not same_domain(src, self.base_host):
                    continue
                unique_images.setdefault(src, img)

        print(f"[media] unique images discovered={len(unique_images)}", flush=True)
        for idx, (img_url, img_meta) in enumerate(unique_images.items(), start=1):
            result = self.fetch(img_url, timeout=(6, 20))
            if result.status_code >= 400 or result.error:
                self.media_manifest.append(
                    {
                        "source_url": img_url,
                        "status": "error",
                        "error": result.error or f"HTTP {result.status_code}",
                    }
                )
                continue
            ext = Path(urlparse(img_url).path).suffix.lower()
            if ext not in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tif", ".tiff"}:
                if "png" in result.content_type:
                    ext = ".png"
                elif "jpeg" in result.content_type or "jpg" in result.content_type:
                    ext = ".jpg"
                elif "webp" in result.content_type:
                    ext = ".webp"
                else:
                    ext = ".bin"

            rel_original = self.media_local_path(img_url, ext_hint=ext)
            abs_original = media_dir / rel_original
            abs_original.parent.mkdir(parents=True, exist_ok=True)
            abs_original.write_bytes(result.content)

            manifest_item: Dict[str, Any] = {
                "source_url": img_url,
                "original_path": str(Path("media") / rel_original),
                "variants": [],
                "lqip": "",
                "status": "ok",
                "alt_text": img_meta.get("alt") or suggest_alt_from_url(img_url),
                "alt_generated": not bool(clean_text(img_meta.get("alt", ""))),
            }

            try:
                with Image.open(abs_original) as opened:
                    image = opened.copy()
                if image.mode not in {"RGB", "RGBA"}:
                    image = image.convert("RGB")
                elif image.mode == "RGBA":
                    # Preserve transparent inputs while keeping WEBP output stable.
                    image = image.convert("RGBA")

                with image:
                    width, height = image.size
                    manifest_item["width"] = width
                    manifest_item["height"] = height
                    base_name = safe_filename(abs_original.stem)
                    sizes = [400, 800, 1200, 1600]
                    for size in sizes:
                        if width < size and size != sizes[0]:
                            continue
                        variant = image.copy()
                        variant.thumbnail((size, max(1, int(size * (height / width)))))
                        variant_rel = Path("webp") / f"{base_name}-{size}.webp"
                        variant_abs = media_dir / variant_rel
                        variant_abs.parent.mkdir(parents=True, exist_ok=True)
                        try:
                            variant.save(variant_abs, format="WEBP", quality=85, method=6)
                            manifest_item["variants"].append(str(Path("media") / variant_rel))
                        except Exception:
                            pass

                    lqip = image.copy()
                    if lqip.mode not in {"RGB", "RGBA"}:
                        lqip = lqip.convert("RGB")
                    lqip.thumbnail((32, 32))
                    lqip = lqip.filter(ImageFilter.GaussianBlur(radius=1.2))
                    lqip_rel = Path("lqip") / f"{base_name}-lqip.webp"
                    lqip_abs = media_dir / lqip_rel
                    try:
                        lqip.save(lqip_abs, format="WEBP", quality=45, method=6)
                        manifest_item["lqip"] = str(Path("media") / lqip_rel)
                    except Exception:
                        lqip_rel = Path("lqip") / f"{base_name}-lqip.png"
                        lqip_abs = media_dir / lqip_rel
                        lqip.save(lqip_abs, format="PNG", optimize=True)
                        manifest_item["lqip"] = str(Path("media") / lqip_rel)
            except (UnidentifiedImageError, OSError):
                manifest_item["status"] = "unsupported"

            self.media_manifest.append(manifest_item)

            if idx % 25 == 0 and self.delay:
                print(f"[media] processed {idx}/{len(unique_images)}", flush=True)
                time.sleep(self.delay)

        media_lookup = {m["source_url"]: m for m in self.media_manifest if m.get("status") == "ok"}
        for page in self.pages:
            for img in page.get("images", []):
                src = normalize_url(img.get("src", ""))
                if src in media_lookup:
                    m = media_lookup[src]
                    img["local_path"] = m.get("original_path")
                    img["webp_variants"] = m.get("variants", [])
                    img["lqip"] = m.get("lqip", "")
                    if not clean_text(img.get("alt", "")):
                        img["alt"] = m.get("alt_text", "")
                        img["alt_generated"] = True
                    else:
                        img["alt_generated"] = False

        (self.output_dir / "media_manifest.json").write_text(
            json.dumps(
                {
                    "generated_at": now_iso(),
                    "source": self.source,
                    "total_images": len(unique_images),
                    "items": self.media_manifest,
                },
                indent=2,
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )

    def build_internal_link_map(self) -> Dict[str, Any]:
        url_to_new = {p["url"]: p.get("new_path", "") for p in self.pages}
        mappings = [{"old_url": p["url"], "new_url": p.get("new_path", ""), "content_type": p.get("content_type")} for p in self.pages]
        rewrites = []
        crawled = set(url_to_new.keys())
        for page in self.pages:
            for link in page.get("internal_links", []):
                rewrites.append(
                    {
                        "source_url": page["url"],
                        "old_link": link,
                        "new_link": url_to_new.get(link, ""),
                        "target_found": link in crawled,
                    }
                )
        return {
            "generated_at": now_iso(),
            "source": self.source,
            "mappings": mappings,
            "link_rewrites": rewrites,
        }

    def compute_duplicates(self) -> List[List[str]]:
        buckets: Dict[str, List[str]] = {}
        for page in self.pages:
            text = page.get("body_markdown", "").strip().lower()
            normalized = re.sub(r"\s+", " ", text)
            digest = hashlib.sha1(normalized.encode("utf-8")).hexdigest()
            buckets.setdefault(digest, []).append(page["url"])
        return [urls for urls in buckets.values() if len(urls) > 1]

    def build_qa_report(self, duplicate_clusters: List[List[str]]) -> Dict[str, Any]:
        missing_meta = [
            {
                "url": p["url"],
                "missing_meta_title": not bool(clean_text(p.get("meta_title", ""))),
                "missing_meta_description": not bool(clean_text(p.get("meta_description", ""))),
            }
            for p in self.pages
            if (not clean_text(p.get("meta_title", ""))) or (not clean_text(p.get("meta_description", "")))
        ]

        crawled_urls = {p["url"] for p in self.pages}
        broken_links = []
        for p in self.pages:
            for link in p.get("internal_links", []):
                if link not in crawled_urls:
                    broken_links.append({"source_url": p["url"], "target_url": link, "reason": "target_not_crawled"})

        missing_alt = []
        for p in self.pages:
            for img in p.get("images", []):
                if not clean_text(img.get("alt", "")):
                    missing_alt.append({"url": p["url"], "image": img.get("src", "")})

        schema_discrepancies = []
        for p in self.pages:
            types = set()
            for obj in p.get("schema", []):
                t = obj.get("@type")
                if isinstance(t, str):
                    types.add(t.lower())
                elif isinstance(t, list):
                    types.update({x.lower() for x in t if isinstance(x, str)})
            if not types:
                schema_discrepancies.append({"url": p["url"], "issue": "no_json_ld_schema"})
            elif "breadcrumblist" not in types:
                schema_discrepancies.append({"url": p["url"], "issue": "missing_breadcrumb_schema"})

        depth_scores = []
        for p in self.pages:
            words = len((p.get("body_text") or "").split())
            depth_scores.append(
                {
                    "url": p["url"],
                    "word_count": words,
                    "depth_score": path_depth_score(words),
                }
            )

        return {
            "generated_at": now_iso(),
            "source": self.source,
            "summary": {
                "pages_crawled": len(self.pages),
                "missing_meta_count": len(missing_meta),
                "broken_link_count": len(broken_links),
                "missing_alt_count": len(missing_alt),
                "schema_discrepancy_count": len(schema_discrepancies),
                "duplicate_cluster_count": len(duplicate_clusters),
            },
            "missing_meta": missing_meta,
            "broken_internal_links": broken_links,
            "missing_alt_text": missing_alt,
            "schema_discrepancies": schema_discrepancies,
            "content_depth_scores": depth_scores,
            "duplicate_content_clusters": duplicate_clusters,
        }

    def write_migration_plan(self) -> None:
        sample_mappings = self.internal_links_map.get("mappings", [])[:30]
        redirects_lines = []
        for item in sample_mappings:
            redirects_lines.append(f"- `{item['old_url']}` -> `{item['new_url']}`")
        redirects_preview = "\n".join(redirects_lines) if redirects_lines else "- No mappings available."

        missing_meta = self.qa_report.get("summary", {}).get("missing_meta_count", 0)
        duplicates = self.qa_report.get("summary", {}).get("duplicate_cluster_count", 0)
        broken = self.qa_report.get("summary", {}).get("broken_link_count", 0)

        content = f"""# MIGRATION PLAN

Generated: {now_iso()}
Source: {self.source}

## Target Folder Structure

```text
articles/
pages/
media/
  original/
  webp/
  lqip/
site_content_dump.json
navigation.json
taxonomy.json
seo_metadata.json
schema_data.json
internal_links_map.json
media_manifest.json
```

## Suggested Slug Strategy

- Keep slugs lowercase, hyphenated.
- Route articles to `/articles/<slug>/`.
- Route newsletter content to `/newsletter/<slug>/`.
- Route static pages to `/pages/<slug>/`.
- Preserve one-to-one old URL mapping in `internal_links_map.json`.

## 301 Redirect Strategy

Use deterministic redirects from legacy URLs to their new target paths.

{redirects_preview}

## Link Rewrite Strategy

- Rewrite internal links in markdown using `internal_links_map.json`.
- Flag unresolved links where `target_found=false`.
- Prioritize updates for high-traffic pages and navigation entries first.

## SEO Improvements During Import

- Fill missing meta title/description entries: {missing_meta} pages.
- Resolve unresolved internal links: {broken} instances.
- Consolidate duplicate clusters: {duplicates} clusters.
- Ensure canonical tags and OpenGraph tags are retained per page.
- Keep JSON-LD blocks attached to migrated content entries.
"""
        (self.output_dir / "MIGRATION_PLAN.md").write_text(content, encoding="utf-8")

    def write_changelog(self) -> None:
        summary = self.qa_report.get("summary", {})
        content = f"""# CHANGELOG

Generated: {now_iso()}
Source: {self.source}

## Extraction Summary

- Crawled pages: {len(self.pages)}
- Media items processed: {len(self.media_manifest)}
- Navigation entries (header): {len(self.navigation.get("header_navigation", []))}
- Footer links: {len(self.navigation.get("footer_links", []))}
- Taxonomy categories: {len(self.taxonomy.get("categories", []))}
- Taxonomy tags: {len(self.taxonomy.get("tags", []))}

## Normalization Performed

- Normalized URLs (tracking query parameters removed).
- Converted page body HTML to clean markdown.
- Generated frontmatter for page/article markdown exports.
- Consolidated internal links and produced old->new mapping.
- Downloaded media assets and generated webp + LQIP derivatives.
- Generated fallback alt text when source alt text was missing.

## Missing / Regenerated Data

- Missing meta entries: {summary.get("missing_meta_count", 0)}
- Missing alt text after crawl: {summary.get("missing_alt_count", 0)}
- Schema discrepancies: {summary.get("schema_discrepancy_count", 0)}
- Duplicate content clusters: {summary.get("duplicate_cluster_count", 0)}

## Editorial Review Notes

- Review auto-generated alt text for correctness and accessibility tone.
- Review pages with thin content depth scores before publishing.
- Validate 301 redirect mapping against final IA decisions before go-live.
"""
        (self.output_dir / "CHANGELOG.md").write_text(content, encoding="utf-8")

    def write_qa_report(self) -> None:
        summary = self.qa_report.get("summary", {})
        sample_broken = self.qa_report.get("broken_internal_links", [])[:40]
        sample_missing_meta = self.qa_report.get("missing_meta", [])[:40]

        content = ["# QA REPORT", "", f"Generated: {now_iso()}", f"Source: {self.source}", ""]
        content.append("## Summary")
        content.append(f"- Pages crawled: {summary.get('pages_crawled', 0)}")
        content.append(f"- Missing meta items: {summary.get('missing_meta_count', 0)}")
        content.append(f"- Broken internal links: {summary.get('broken_link_count', 0)}")
        content.append(f"- Missing alt text: {summary.get('missing_alt_count', 0)}")
        content.append(f"- Schema discrepancies: {summary.get('schema_discrepancy_count', 0)}")
        content.append(f"- Duplicate content clusters: {summary.get('duplicate_cluster_count', 0)}")
        content.append("")
        content.append("## Missing Meta (sample)")
        for row in sample_missing_meta:
            content.append(
                f"- {row['url']} (title_missing={row['missing_meta_title']}, description_missing={row['missing_meta_description']})"
            )
        if not sample_missing_meta:
            content.append("- None.")
        content.append("")
        content.append("## Broken Internal Links (sample)")
        for row in sample_broken:
            content.append(f"- {row['source_url']} -> {row['target_url']}")
        if not sample_broken:
            content.append("- None.")
        content.append("")
        content.append("## Duplicate Clusters")
        for i, cluster in enumerate(self.qa_report.get("duplicate_content_clusters", []), start=1):
            content.append(f"- Cluster {i}: {', '.join(cluster)}")
        if not self.qa_report.get("duplicate_content_clusters"):
            content.append("- None.")

        (self.output_dir / "QA_REPORT.md").write_text("\n".join(content) + "\n", encoding="utf-8")

    def write_json_files(self, url_to_md_path: Dict[str, str], duplicate_clusters: List[List[str]]) -> None:
        seo_rows = []
        schema_rows = []
        for page in self.pages:
            seo_rows.append(
                {
                    "url": page["url"],
                    "meta_title": page.get("meta_title", ""),
                    "meta_description": page.get("meta_description", ""),
                    "canonical": page.get("canonical", ""),
                    "og_title": page.get("meta", {}).get("og_title", ""),
                    "og_description": page.get("meta", {}).get("og_description", ""),
                    "og_image": page.get("meta", {}).get("og_image", ""),
                    "hero_image": page.get("hero_image", ""),
                }
            )
            schema_rows.append({"url": page["url"], "schema": page.get("schema", [])})

        site_dump = {
            "generated_at": now_iso(),
            "source": self.source,
            "stats": {
                "pages_crawled": len(self.pages),
                "media_items": len(self.media_manifest),
                "duplicate_clusters": len(duplicate_clusters),
            },
            "pages": self.pages,
        }

        files = {
            "site_content_dump.json": site_dump,
            "navigation.json": self.navigation,
            "taxonomy.json": self.taxonomy,
            "seo_metadata.json": {"generated_at": now_iso(), "items": seo_rows},
            "schema_data.json": {"generated_at": now_iso(), "items": schema_rows},
            "internal_links_map.json": self.internal_links_map,
            "content_index.json": {"generated_at": now_iso(), "url_to_markdown_path": url_to_md_path},
            "qa_report.json": self.qa_report,
        }
        for filename, payload in files.items():
            (self.output_dir / filename).write_text(
                json.dumps(payload, indent=2, ensure_ascii=False),
                encoding="utf-8",
            )

    def run(self) -> None:
        self.output_dir.mkdir(parents=True, exist_ok=True)
        print(f"[run] source={self.source}", flush=True)
        self.crawl()
        print(f"[run] crawl complete: pages={len(self.pages)}", flush=True)

        used_new_paths: Set[str] = set()
        for page in self.pages:
            page["new_path"] = build_new_path(page, used_new_paths)
            page["content_hash"] = hashlib.sha1(
                re.sub(r"\s+", " ", page.get("body_markdown", "").strip().lower()).encode("utf-8")
            ).hexdigest()

        self.navigation = self.extract_global_navigation()
        self.taxonomy = self.build_taxonomy()

        print("[run] starting media export", flush=True)
        self.download_and_transform_media()
        print("[run] media export complete", flush=True)

        duplicate_clusters = self.compute_duplicates()
        self.internal_links_map = self.build_internal_link_map()
        self.qa_report = self.build_qa_report(duplicate_clusters)
        url_to_md_path = self.export_markdown_content()

        self.write_json_files(url_to_md_path, duplicate_clusters)
        self.write_migration_plan()
        self.write_qa_report()
        self.write_changelog()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Crawl a site and export migration-ready content assets.")
    parser.add_argument("--source", default="https://shatanjaysudha.com", help="Source website URL")
    parser.add_argument(
        "--output",
        default="site_migration_export",
        help="Output directory for exports (default: site_migration_export)",
    )
    parser.add_argument("--max-pages", type=int, default=500, help="Maximum HTML pages to crawl")
    parser.add_argument("--delay", type=float, default=0.2, help="Delay between page requests")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    exporter = SiteMigrationExporter(
        source=args.source,
        output_dir=Path(args.output).resolve(),
        max_pages=args.max_pages,
        delay=args.delay,
    )
    exporter.run()
    print(f"Export completed in: {args.output}")
    print(f"Pages crawled: {len(exporter.pages)}")
    print(f"Media processed: {len(exporter.media_manifest)}")


if __name__ == "__main__":
    main()
