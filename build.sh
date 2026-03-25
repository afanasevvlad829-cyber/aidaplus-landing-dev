#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

mkdir -p dist build

python3 - <<'PY'
import json
import os
import re
import urllib.request
from html import unescape
from pathlib import Path
from urllib.parse import urljoin

root = Path(".")
base_path = root / "index.html"
out_path = root / "dist" / "index.html"
css_path = root / "src" / "styles" / "main.css"
script_paths = [
    root / "src" / "scripts" / "main.js",
]
components_dir = root / "src" / "components"

base = base_path.read_text(encoding="utf-8")

def load_css_bundle(path: Path, seen=None) -> str:
    if seen is None:
        seen = set()
    path = path.resolve()
    if path in seen or not path.exists():
        return ""
    seen.add(path)
    raw = path.read_text(encoding="utf-8")
    out = []
    for line in raw.splitlines():
        m = re.match(r'\s*@import\s+url\(["\']([^"\']+)["\']\)\s*;\s*$', line)
        if m:
            nested = (path.parent / m.group(1)).resolve()
            out.append(load_css_bundle(nested, seen))
        else:
            out.append(line)
    return "\n".join(out) + "\n"

css = load_css_bundle(css_path) if css_path.exists() else ""
script_chunks = []
for script_path in script_paths:
    if not script_path.exists():
        continue
    script_chunks.append(f"/* {script_path.as_posix()} */\n" + script_path.read_text(encoding="utf-8"))
js = "\n\n".join(script_chunks)

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

MEDIA_URL = "https://aidacamp.ru/media"
FETCH_REMOTE = (os.getenv("AC_BUILD_FETCH_REMOTE", "0") == "1")

def clean_text(value: str) -> str:
    text = unescape(re.sub(r"<[^>]+>", " ", value or ""))
    return re.sub(r"\s+", " ", text).strip()

def load_remote_media_html():
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
        "Referer": "https://aidacamp.ru/",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
    }
    req = urllib.request.Request(MEDIA_URL, headers=headers)
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read().decode("utf-8", "ignore")

def load_media_manifest(html: str):
    entries = []
    seen = set()

    # Image tiles: meta image + meta caption in same tile.
    img_pairs = re.findall(
        r'<meta[^>]+itemprop=["\']image["\'][^>]+content=["\']([^"\']+)["\'][^>]*>.*?<meta[^>]+itemprop=["\']caption["\'][^>]+content=["\']([^"\']+)["\']',
        html,
        flags=re.I | re.S,
    )
    for src, caption in img_pairs:
        abs_src = urljoin(MEDIA_URL, src.strip())
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
        abs_src = urljoin(MEDIA_URL, src)
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

def load_team_manifest(html: str):
    anchor_match = re.search(r'<a\s+name=["\']team["\'][^>]*>', html, flags=re.I)
    if not anchor_match:
        return []

    scope = html[anchor_match.end(): anchor_match.end() + 24000]
    cards = []
    for li in re.findall(r"<li\b[^>]*class=[\"'][^\"']*t524__col[^\"']*[\"'][^>]*>.*?</li>", scope, flags=re.I | re.S):
        img_match = (
            re.search(r'<meta[^>]+itemprop=["\']image["\'][^>]+content=["\']([^"\']+)["\']', li, flags=re.I | re.S)
            or re.search(r'data-original=["\']([^"\']+)["\']', li, flags=re.I | re.S)
            or re.search(r'<img[^>]+src=["\']([^"\']+)["\']', li, flags=re.I | re.S)
        )
        name_match = re.search(r'<div[^>]+t524__persname[^>]*>(.*?)</div>', li, flags=re.I | re.S)
        role_match = re.search(r'<div[^>]+t524__persdescr[^>]*>(.*?)</div>', li, flags=re.I | re.S)
        name = clean_text(name_match.group(1) if name_match else "")
        role = clean_text(role_match.group(1) if role_match else "")
        img = urljoin(MEDIA_URL, img_match.group(1).strip()) if img_match else ""
        if not name:
            continue
        cards.append({
            "img": img,
            "name": name,
            "role": role or "Преподаватель / вожатый",
        })
    return cards

if FETCH_REMOTE:
    try:
        remote_media_html = load_remote_media_html()
        media_manifest = load_media_manifest(remote_media_html)
    except Exception:
        remote_media_html = ""
        media_manifest = []
    try:
        team_manifest = load_team_manifest(remote_media_html) if remote_media_html else []
    except Exception:
        team_manifest = []
else:
    remote_media_html = ""
    media_manifest = []
    team_manifest = []

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
    f"<script id=\"ac-build-team-manifest\" type=\"application/json\">{json.dumps(team_manifest, ensure_ascii=False)}</script>\n"
    "<script id=\"ac-build-main-js\">\n"
    f"{js}\n"
    "</script>\n"
    "<!-- AC_BUILD_SCRIPT_END -->"
)

out = base
# Dist must be self-contained: strip runtime src links and inject built bundles only.
out = re.sub(r'<link[^>]+href=["\']/src/styles/main\.css["\'][^>]*>\s*', "", out, flags=re.I)
out = re.sub(r'<script[^>]+src=["\']/src/scripts/[^"\']+["\'][^>]*>\s*</script>\s*', "", out, flags=re.I)
out = replace_or_insert(out, "<!-- AC_BUILD_STYLE_START -->", "<!-- AC_BUILD_STYLE_END -->", style_block, "</head>")
out = replace_or_insert(out, "<!-- AC_BUILD_SCRIPT_START -->", "<!-- AC_BUILD_SCRIPT_END -->", script_block, "</body>")
out_path.write_text(out, encoding="utf-8")
print(f"Built: {out_path}")
PY

echo "Build completed: dist/index.html"
echo "Canonical release artifact: dist/index.html"
cp dist/index.html dist/index.htm
cp dist/index.html gpt.html
cp dist/index.html build/gpt.html
echo "Artifacts updated: dist/index.htm, gpt.html, build/gpt.html"

if [ -f src/pages/legal.html ]; then
  cp src/pages/legal.html dist/legal.html
  cp src/pages/legal.html legal.html
  cp src/pages/legal.html build/legal.html
  echo "Artifacts updated: legal.html, build/legal.html"
fi

if ! cmp -s dist/index.html gpt.html; then
  echo "ERROR: gpt.html is not synchronized with dist/index.html" >&2
  exit 1
fi

if ! cmp -s dist/index.html build/gpt.html; then
  echo "ERROR: build/gpt.html is not synchronized with dist/index.html" >&2
  exit 1
fi

if [ -f dist/legal.html ] && [ -f legal.html ] && ! cmp -s dist/legal.html legal.html; then
  echo "ERROR: legal.html is not synchronized with dist/legal.html" >&2
  exit 1
fi

if [ -f dist/legal.html ] && [ -f build/legal.html ] && ! cmp -s dist/legal.html build/legal.html; then
  echo "ERROR: build/legal.html is not synchronized with dist/legal.html" >&2
  exit 1
fi

echo "Artifact sync check: OK"
