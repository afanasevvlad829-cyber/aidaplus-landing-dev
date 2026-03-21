#!/bin/bash
set -euo pipefail

PROJECT_DIR="/var/www/aidaplus-dev"

cd "$PROJECT_DIR"

echo "Watching for changes in:"
echo "  index-aidacamp-final-v8.html"
echo "  src/"
echo "  styles.css"
echo "  script.js"
echo

while inotifywait -r -e close_write,create,move,delete \
  index-aidacamp-final-v8.html src styles.css script.js 2>/dev/null
do
  echo
  echo "==> Change detected at $(date '+%Y-%m-%d %H:%M:%S')"
  ./deploy.sh || true
  echo "==> Waiting for next change..."
done
