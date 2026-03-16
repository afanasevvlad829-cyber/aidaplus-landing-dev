#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

mkdir -p dist

python3 - <<'PY'
import json
import re
import urllib.request
from pathlib import Path
from urllib.parse import urljoin

root = Path(".")
base_path = root / "index.html"
out_path = root / "dist" / "index.html"
css_path = root / "src" / "styles" / "main.css"
js_path = root / "src" / "scripts" / "main.js"
components_dir = root / "src" / "components"

base = base_path.read_text(encoding="utf-8")
css = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
js = js_path.read_text(encoding="utf-8") if js_path.exists() else ""

components = []
if components_dir.exists():
    for p in sorted(components_dir.glob("*.html")):
        components.append({"name": p.name, "size": p.stat().st_size})

def classify(caption: str):
    tags = []
    c = (caption or "").lower()
    checks = {
        "hero": r"\bhero\b|геро",
        "all": r"\ball\b|все|всё",
        "food": r"\bfood\b|еда",
        "sport": r"\bsport\b|спорт",
        "study": r"\bstudy\b|учеб|учёб",
        "pool": r"\bpool\b|бассейн",
    }
    for k, rx in checks.items():
        if re.search(rx, c, flags=re.I):
            tags.append(k)
    return tags

def load_media_manifest():
    media_url = "https://aidacamp.ru/media"
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
        "Referer": "https://aidacamp.ru/",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
    }
    req = urllib.request.Request(media_url, headers=headers)
    with urllib.request.urlopen(req, timeout=25) as r:
        html = r.read().decode("utf-8", "ignore")

    entries = []
    seen = set()

    # Image tiles: meta image + meta caption in same tile.
    img_pairs = re.findall(
        r'<meta[^>]+itemprop=["\']image["\'][^>]+content=["\']([^"\']+)["\'][^>]*>.*?<meta[^>]+itemprop=["\']caption["\'][^>]+content=["\']([^"\']+)["\']',
        html,
        flags=re.I | re.S,
    )
    for src, caption in img_pairs:
        abs_src = urljoin(media_url, src.strip())
        if not abs_src or abs_src in seen:
            continue
        key = f"{abs_src} {caption}".lower()
        if re.search(r"logo|icon|avatar|top\.mail|mc\.yandex|vk\.com/rtrg|skolkovo", key):
            continue
        seen.add(abs_src)
        entries.append({
            "src": abs_src,
            "type": "image",
            "caption": caption.strip().lower(),
            "tags": classify(caption),
        })

    # Video wrappers (tilda blocks): data-video-id + nearest caption (best effort).
    for m in re.finditer(r'data-video-id=["\']([^"\']+\.(?:mp4|webm)[^"\']*)["\']', html, flags=re.I):
        src = m.group(1).strip()
        abs_src = urljoin(media_url, src)
        if not abs_src or abs_src in seen:
            continue
        right = html[m.end(): m.end() + 1200]
        cap_match = re.search(
            r'<meta[^>]+itemprop=["\']caption["\'][^>]+content=["\']([^"\']+)["\']',
            right,
            flags=re.I | re.S,
        )
        caption = (cap_match.group(1) if cap_match else "all").strip().lower()
        seen.add(abs_src)
        entries.append({
            "src": abs_src,
            "type": "video",
            "caption": caption,
            "tags": classify(caption) or ["all"],
        })

    return entries

try:
    media_manifest = load_media_manifest()
except Exception:
    media_manifest = []

def replace_or_insert(src: str, start_marker: str, end_marker: str, payload: str, anchor: str) -> str:
    if start_marker in src and end_marker in src:
        start = src.index(start_marker)
        end = src.index(end_marker) + len(end_marker)
        return src[:start] + payload + src[end:]
    if anchor in src:
        return src.replace(anchor, payload + "\n" + anchor, 1)
    return src + "\n" + payload + "\n"

style_block = (
    "<!-- AC_BUILD_STYLE_START -->\n"
    "<style id=\"ac-build-main-css\">\n"
    f"{css}\n"
    "</style>\n"
    "<!-- AC_BUILD_STYLE_END -->"
)

script_block = (
    "<!-- AC_BUILD_SCRIPT_START -->\n"
    f"<script id=\"ac-build-components\" type=\"application/json\">{json.dumps(components, ensure_ascii=False)}</script>\n"
    f"<script id=\"ac-build-media-manifest\" type=\"application/json\">{json.dumps(media_manifest, ensure_ascii=False)}</script>\n"
    "<script id=\"ac-build-main-js\">\n"
    f"{js}\n"
    "</script>\n"
    "<!-- AC_BUILD_SCRIPT_END -->"
)

out = base
out = replace_or_insert(out, "<!-- AC_BUILD_STYLE_START -->", "<!-- AC_BUILD_STYLE_END -->", style_block, "</head>")
out = replace_or_insert(out, "<!-- AC_BUILD_SCRIPT_START -->", "<!-- AC_BUILD_SCRIPT_END -->", script_block, "</body>")
out_path.write_text(out, encoding="utf-8")
print(f"Built: {out_path}")
PY

echo "Build completed: dist/index.html"

