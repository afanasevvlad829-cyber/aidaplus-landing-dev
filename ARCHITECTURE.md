# AidaPlus Landing Architecture

## Scope
Single-page landing for AidaCamp/AidaPlus.
Development keeps source files modular, while runtime/deploy target is a single `index.html`.

## Repository Layout
- `index.html` - main runtime page (base template + inline platform script blocks + build markers)
- `index-aidacamp-final-v8.html` - preserved historical monolith baseline
- `dist/index.html` - build output for deploy
- `build.sh` - injects modular CSS/JS into `index.html`, builds `dist/index.html`, embeds media manifest
- `deploy.sh` - runs build, copies `dist/index.html` to root `index.html`, reloads nginx
- `src/styles/main.css` - modular style overrides and UI fixes
- `src/scripts/main.js` - modular behavior patch layer over legacy page logic
- `src/partials/` - extracted HTML sections from monolith (reference/partialization artifacts)
- `src/components/` - component placeholders/contracts for section boundaries
- `tests/` - helper scripts for smoke/media diagnostics

## Runtime Model
- Core page still runs legacy inline script logic from `index.html`.
- `src/scripts/main.js` acts as a stabilizing patch layer to:
  - enforce static logo rendering,
  - enhance shifts UI (calendar icon popup, single-price visibility),
  - normalize media loading and gallery rendering (tabs/photos/videos/lightbox),
  - guard against observer recursion/perf regressions,
  - manage age UX (persist selected age, reset action, interaction gate before age selection).
- `src/styles/main.css` overrides legacy CSS where behavior/UX fixes are required.

## Build Pipeline
1. `build.sh` reads `index.html`.
2. Replaces content between style/script build markers with:
   - inline CSS from `src/styles/main.css`,
   - inline JS from `src/scripts/main.js`.
3. Fetches/parses media source page and embeds JSON manifest into output.
4. Writes final artifact to `dist/index.html`.

## Deployment Flow
1. Execute `deploy.sh`.
2. Script runs `build.sh`.
3. `dist/index.html` is copied to root `index.html`.
4. Nginx reload is triggered.

## Key Constraints
- Preserve visual/layout compatibility with existing landing.
- Do not remove historical baseline file.
- Keep patches additive and minimal over legacy script base.
- Final deliverable remains single-file HTML for hosting/Tilda-style integration.
