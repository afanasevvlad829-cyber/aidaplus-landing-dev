#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

mkdir -p dist build dist/cdn cdn

python3 - <<'PY'
import json
import os
import re
import subprocess
import urllib.request
from html import unescape
from pathlib import Path
from urllib.parse import urljoin

root = Path(".")
base_path = root / "index.html"
out_path = root / "dist" / "index.html"
cdn_bundle_path = root / "dist" / "cdn" / "app.bundle.js"
cdn_repo_bundle_path = root / "cdn" / "app.bundle.js"
cdn_tilda_bundle_path = root / "dist" / "cdn" / "app.tilda.js"
cdn_tilda_repo_bundle_path = root / "cdn" / "app.tilda.js"
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

def detect_github_repo_slug() -> str:
    override = (os.getenv("AC_CDN_REPO") or "").strip()
    if override:
        return override
    try:
        remote = subprocess.check_output(
            ["git", "remote", "get-url", "origin"],
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
    except Exception:
        return ""
    m = re.search(r"github\.com[:/](?P<slug>[^/]+/[^/.]+)(?:\.git)?$", remote)
    return m.group("slug") if m else ""

cdn_ref = (os.getenv("AC_CDN_REF") or "").strip()
cdn_repo = detect_github_repo_slug()
cdn_asset_base = f"https://cdn.jsdelivr.net/gh/{cdn_repo}@{cdn_ref}" if cdn_repo and cdn_ref else ""

def rewrite_assets_to_cdn(text: str, asset_base: str) -> str:
    if not text or not asset_base:
        return text
    out = text
    out = re.sub(r"(?P<q>['\"])\/assets\/", rf"\g<q>{asset_base}/assets/", out)
    out = re.sub(r"url\((?P<q>['\"]?)\/assets\/", rf"url(\g<q>{asset_base}/assets/", out)
    return out

css_for_cdn = rewrite_assets_to_cdn(css, cdn_asset_base)
js_for_cdn = rewrite_assets_to_cdn(js, cdn_asset_base)

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

# Single-file CDN bundle for Tilda/jsDelivr:
# injects CSS once, then executes app JS.
bundle = (
    "(function(){\n"
    "  if (typeof document === 'undefined') return;\n"
    "  var id = 'ac-cdn-main-css';\n"
    "  if (!document.getElementById(id)) {\n"
    "    var style = document.createElement('style');\n"
    "    style.id = id;\n"
    f"    style.textContent = {json.dumps(css_for_cdn, ensure_ascii=False)};\n"
    "    document.head.appendChild(style);\n"
    "  }\n"
    "})();\n\n"
    "/* src/scripts/main.js */\n"
    + js_for_cdn
    + "\n"
)
cdn_bundle_path.write_text(bundle, encoding="utf-8")
print(f"Built: {cdn_bundle_path}")
cdn_repo_bundle_path.write_text(bundle, encoding="utf-8")
print(f"Built: {cdn_repo_bundle_path}")

body_match = re.search(r"<body[^>]*>(?P<body>.*)</body>", out, flags=re.I | re.S)
body_html = body_match.group("body") if body_match else ""
body_html = re.sub(r"<script\\b[^>]*>.*?</script>\\s*", "", body_html, flags=re.I | re.S)
body_for_cdn = rewrite_assets_to_cdn(body_html, cdn_asset_base)

tilda_bundle = (
    "(function(){\n"
    "  var mount = function(){\n"
    "    var root = document.getElementById('aidaplus-root');\n"
    "    if (!root) {\n"
    "      root = document.createElement('div');\n"
    "      root.id = 'aidaplus-root';\n"
    "      document.body.appendChild(root);\n"
    "    }\n"
    "    if (root.dataset.aidaplusMounted === '1') return;\n"
    "    root.dataset.aidaplusMounted = '1';\n"
    f"    root.innerHTML = {json.dumps(body_for_cdn, ensure_ascii=False)};\n"
    "    var cssId = 'ac-cdn-main-css';\n"
    "    if (!document.getElementById(cssId)) {\n"
    "      var style = document.createElement('style');\n"
    "      style.id = cssId;\n"
    f"      style.textContent = {json.dumps(css_for_cdn, ensure_ascii=False)};\n"
    "      document.head.appendChild(style);\n"
    "    }\n"
    "    var jsId = 'ac-cdn-main-js';\n"
    "    if (!document.getElementById(jsId)) {\n"
    "      var script = document.createElement('script');\n"
    "      script.id = jsId;\n"
    f"      script.textContent = {json.dumps(js_for_cdn, ensure_ascii=False)};\n"
    "      document.body.appendChild(script);\n"
    "    }\n"
    "  };\n"
    "  if (document.readyState === 'loading') {\n"
    "    document.addEventListener('DOMContentLoaded', mount);\n"
    "  } else {\n"
    "    mount();\n"
    "  }\n"
    "})();\n"
)
cdn_tilda_bundle_path.write_text(tilda_bundle, encoding="utf-8")
print(f"Built: {cdn_tilda_bundle_path}")
cdn_tilda_repo_bundle_path.write_text(tilda_bundle, encoding="utf-8")
print(f"Built: {cdn_tilda_repo_bundle_path}")
if cdn_asset_base:
    print(f"CDN asset base: {cdn_asset_base}")
else:
    print("CDN asset base: disabled (set AC_CDN_REF to enable '/assets' rewriting)")
PY

echo "Build completed: dist/index.html"
echo "Canonical release artifact: dist/index.html"
cp dist/index.html dist/index.htm
echo "Artifacts updated: dist/index.htm"
echo "CDN artifact: dist/cdn/app.bundle.js"
echo "CDN artifact for GitHub/jsDelivr: cdn/app.bundle.js"
echo "Tilda single-script artifact: dist/cdn/app.tilda.js"
echo "Tilda single-script artifact for GitHub/jsDelivr: cdn/app.tilda.js"

if [ -f src/pages/legal.html ]; then
  cp src/pages/legal.html dist/legal.html
  cp src/pages/legal.html legal.html
  cp src/pages/legal.html build/legal.html
  echo "Artifacts updated: legal.html, build/legal.html"
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
