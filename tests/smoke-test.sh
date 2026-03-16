#!/usr/bin/env bash
set -e

BASE_URL="${1:-http://dev.aidaplus.ru}"

echo "==> Smoke test for: $BASE_URL"

echo "-- Проверяю index.html"
curl -fsS "$BASE_URL" | grep -q "Песочница лендинга запущена"
echo "OK: index.html отвечает"

echo "-- Проверяю styles.css"
curl -fsSI "$BASE_URL/styles.css" | grep -q "200 OK"
echo "OK: styles.css отвечает"

echo "-- Проверяю script.js"
curl -fsSI "$BASE_URL/script.js" | grep -q "200 OK"
echo "OK: script.js отвечает"

echo "-- Проверяю robots header"
curl -fsSI "$BASE_URL" | grep -iq "x-robots-tag"
echo "OK: X-Robots-Tag присутствует"

echo "==> Smoke test completed successfully"
