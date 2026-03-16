#!/usr/bin/env bash
set -e

cd /var/www/aidaplus-dev

echo "==> Git status before deploy"
git status --short || true

echo "==> Pull latest changes"
git pull origin main

echo "==> Done"
