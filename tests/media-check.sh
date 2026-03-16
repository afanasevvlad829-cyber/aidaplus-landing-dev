#!/usr/bin/env bash
set -euo pipefail

DEV_URL="${1:-https://dev.aidaplus.ru/}"
MEDIA_URL="${2:-https://aidacamp.ru/media}"

echo "==> Media diagnostics"
echo "DEV_URL=$DEV_URL"
echo "MEDIA_URL=$MEDIA_URL"

python3 - "$DEV_URL" "$MEDIA_URL" <<'PY'
import re
import sys
import urllib.request
import urllib.error
from html.parser import HTMLParser

dev_url = sys.argv[1]
media_url = sys.argv[2]

def fetch(url):
    variants = [
        {
            "User-Agent": "Mozilla/5.0",
        },
        {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
            "Referer": "https://aidacamp.ru/",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
    ]
    last_err = None
    for headers in variants:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=25) as r:
                body = r.read().decode("utf-8", "ignore")
                hdr = {k.lower(): v for k, v in r.headers.items()}
                return r.status, hdr, body
        except urllib.error.HTTPError as e:
            last_err = f"HTTP {e.code}"
        except Exception as e:
            last_err = str(e)
    return None, {}, "", last_err

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.img = []
        self.video_src = []
        self.captions = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "img" and d.get("src"):
            self.img.append((d.get("src", ""), d.get("alt", "")))
        if tag in ("video", "source") and d.get("src"):
            self.video_src.append(d.get("src", ""))
        if tag == "meta":
            itemprop = (d.get("itemprop", "") or "").strip().lower()
            if itemprop == "caption":
                self.captions.append((d.get("content", "") or "").strip().lower())

def src_kind(src: str) -> str:
    if src.startswith("https://") or src.startswith("http://"):
        return "absolute"
    if src.startswith("/"):
        return "root-relative"
    return "relative"

print("\n[1] Проверка dev-страницы")
dev_ret = fetch(dev_url)
if len(dev_ret) == 4:
    dev_status, dev_headers, dev_html, dev_err = dev_ret
else:
    dev_status, dev_headers, dev_html = dev_ret
    dev_err = None
print("status:", dev_status)
print("tech-version-badge:", "ac-tech-version-badge" in dev_html)
print("media-loader-present:", "loadMediaV8" in dev_html)
if dev_err:
    print("dev fetch error:", dev_err)

print("\n[2] Проверка источника медиа")
media_ret = fetch(media_url)
if len(media_ret) == 4:
    media_status, media_headers, media_html, media_err = media_ret
else:
    media_status, media_headers, media_html = media_ret
    media_err = None
print("status:", media_status)
print("access-control-allow-origin:", media_headers.get("access-control-allow-origin", "<нет>"))
print("content-type:", media_headers.get("content-type", "<нет>"))
if media_err:
    print("media fetch error:", media_err)

p = Parser()
if media_html:
    p.feed(media_html)

print("\n[3] Что реально пришло с media-страницы")
print("img tags:", len(p.img))
print("video/source tags:", len(p.video_src))
print("meta itemprop=caption tags:", len(p.captions))

filtered = []
for src, alt in p.img:
    key = f"{src} {alt}".lower()
    if re.search(r"logo|icon|avatar|top\.mail|tildacdn.*(svg|gif)", key):
        continue
    filtered.append((src, (alt or "").strip().lower()))

cats = {"hero": 0, "all": 0, "food": 0, "sport": 0, "study": 0, "pool": 0}
for src, alt in filtered:
    for c in list(cats.keys()):
        if re.search(rf"\b{re.escape(c)}\b", alt):
            cats[c] += 1

caption_cats = {"hero": 0, "all": 0, "food": 0, "sport": 0, "study": 0, "pool": 0}
for cap in p.captions:
    for c in list(caption_cats.keys()):
        if re.search(rf"\b{re.escape(c)}\b", cap):
            caption_cats[c] += 1

print("usable images (after filters):", len(filtered))
print("categories:", cats)
print("caption categories:", caption_cats)

kind_stats = {"absolute": 0, "root-relative": 0, "relative": 0}
for src, _ in filtered:
    kind_stats[src_kind(src)] += 1
print("url kinds:", kind_stats)

print("\n[4] Примеры первых 10 картинок")
for src, alt in filtered[:10]:
    print("-", src_kind(src), src[:120], "| alt:", alt[:60] if alt else "<empty>")

print("\n[4b] Примеры caption (первые 15)")
for cap in p.captions[:15]:
    print("-", cap if cap else "<empty>")

errors = []
if dev_status != 200:
    errors.append("dev страница недоступна")
if media_status != 200:
    errors.append("media источник недоступен")
if len(filtered) == 0:
    errors.append("после фильтрации нет изображений")
if sum(cats.values()) == 0 and sum(caption_cats.values()) == 0:
    errors.append("нет категорий hero/all/food/sport/study/pool ни в alt, ни в meta[itemprop=caption]")
if kind_stats["root-relative"] > 0 or kind_stats["relative"] > 0:
    errors.append("в media есть не-абсолютные URL; нужно нормализовать src через базовый URL")

print("\n[5] Итог")
if errors:
    print("FAIL")
    for e in errors:
        print(" -", e)
    sys.exit(1)
else:
    print("OK: базовые проверки пройдены")
PY

