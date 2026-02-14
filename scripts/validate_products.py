#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_DIR = ROOT / "products"

REQUIRED = [
    "product-metadata.json",
    "landing-page.md",
    "discover-article.md",
    "seo-block.md",
    "schema-product.jsonld",
    "schema-article.jsonld",
    "checkout-config.json",
    "marketing-assets.md",
    "upsell-bundle.md",
    "ab-test.md",
    "analytics-events.md",
    "implementation-checklist.md",
    "readme.txt",
    "preview-images/hero-1200x675.png",
    "preview-images/thumbnail-800x800.png",
    "preview-images/screenshot-1200x1200.png",
]


def main() -> None:
    products = sorted([p for p in PRODUCTS_DIR.iterdir() if p.is_dir()])
    missing = {}
    for pdir in products:
        misses = [item for item in REQUIRED if not (pdir / item).exists()]
        if misses:
            missing[pdir.name] = misses

    print(f"Products checked: {len(products)}")
    if not missing:
        print("Validation PASS: all required artifacts exist.")
        return

    print("Validation FAIL")
    for slug, misses in sorted(missing.items()):
        print(f"- {slug}: {', '.join(misses)}")


if __name__ == "__main__":
    main()
