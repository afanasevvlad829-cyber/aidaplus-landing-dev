#!/bin/bash
set -euo pipefail

SRC="${1:-}"
DST="/var/www/aidaplus-dev/index.html"

if [ -z "$SRC" ]; then
  echo "Usage: ./apply-build.sh /path/to/source/index.html"
  exit 1
fi

if [ ! -f "$SRC" ]; then
  echo "Source file not found: $SRC"
  exit 1
fi

cp "$SRC" "$DST"
echo "Applied build: $SRC -> $DST"
