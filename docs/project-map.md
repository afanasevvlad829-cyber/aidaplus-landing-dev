# Project Map (Canonical)

## Source of truth
- `/index.html`
- `/src/scripts/**`
- `/src/styles/**`
- `/assets/**`
- `/docs/**`

## Runtime entrypoints (dev)
- HTML: `/index.html`
- Styles: `/src/styles/main.css`
- Scripts: `/src/scripts/main.js`

## Runtime scope guard
- В production build подключаются только:
  - `/src/styles/main.css` (и его `@import`)
  - `/src/scripts/main.js`
- Любые другие JS/CSS файлы вне этих entrypoint не считаются runtime, пока не подключены явно в `build.sh`.

## Build entrypoints
- `/build.sh` — единственный build pipeline
- `/deploy.sh` — единственный deploy pipeline

## Build output
- `/dist/index.html` — **canonical release artifact**, do not edit manually
- `/dist/legal.html` — canonical legal artifact (if `src/pages/legal.html` exists)
- `/legal.html`, `/build/legal.html` — generated mirrors, do not edit manually

## Archive / non-runtime
- `/archive/legacy/**` — старые backup/legacy scripts/html/css/js
- `/archive/non-runtime/**` — exports, snapshots, временные артефакты

## Rules
- Не редактировать `dist/index.html` вручную
- Не редактировать `dist/legal.html` / `legal.html` / `build/legal.html` вручную
- Не добавлять новые deploy/build скрипты вне `build.sh`/`deploy.sh`
- Весь runtime-код изменять только в `/index.html` и `/src/**`
