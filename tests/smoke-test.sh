#!/usr/bin/env bash
set -e

BASE_URL="${1:-http://dev.aidaplus.ru}"

echo "==> Smoke test for: $BASE_URL"

echo "-- Проверяю index.html"
HTML="$(curl -fsS "$BASE_URL")"
echo "$HTML" | grep -q "AiDaCamp"
echo "OK: index.html отвечает"

echo "-- Проверяю self-contained build markers"
echo "$HTML" | grep -q "ac-build-main-css"
echo "$HTML" | grep -q "ac-build-main-js"
echo "OK: build-блоки присутствуют"

echo "-- Проверяю отсутствие runtime-зависимости от /src"
if echo "$HTML" | grep -q "/src/scripts/"; then
  echo "FAIL: найдена ссылка на /src/scripts в собранном index.html"
  exit 1
fi
echo "OK: /src/scripts ссылки отсутствуют"

if echo "$BASE_URL" | grep -Eq "localhost|127\\.0\\.0\\.1"; then
  echo "-- Проверяю robots header: SKIP (local run)"
else
  echo "-- Проверяю robots header"
  curl -fsSI "$BASE_URL" | grep -iq "x-robots-tag"
  echo "OK: X-Robots-Tag присутствует"
fi

echo "==> Smoke test completed successfully"
