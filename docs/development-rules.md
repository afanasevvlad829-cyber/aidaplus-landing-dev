# Development Rules (Strict Source-of-Truth Policy)

Updated: 2026-04-06 (Europe/Moscow)

## 1) Source-of-truth map

### Editable source files (allowed)
- `src/pages/index.html` — canonical UI HTML source.
- `src/pages/legal.html` — canonical legal page source.
- `src/scripts/**` — runtime logic source.
- `src/styles/**` — runtime styles source.
- `src/components/**`, `src/partials/**` — templates/partials source (when wired by source runtime).
- `assets/**` — source static assets.
- `docs/**`, `tools/**`, `.github/workflows/**` — process/policy/tooling.

### Generated / runtime / output files (forbidden to edit directly)
- `dist/**`
- `build/**`
- `cdn/**`
- root `legal.html`
- `.runtime/**`
- `.tmp/**`
- `test-results/**`
- `reports/**`

Rule: any direct edits in files above are policy violations unless an explicit controlled release exception is approved.

## 2) Forbidden practices

### A. Direct output edits
- Do not edit release artifacts (`dist/build/cdn/legal.html`) manually.

### B. Source-only changes
- UI, styles, templates, and logic must be changed only in source modules and source styles.

### C. Modularity contract
- Keep split by concern: `layout`, `components`, `sections`, `utilities`, `state`, `interactions`.
- Do not collapse new work into a single giant file.

### D. No hotfix-as-default
- No random point fixes in production artifacts.
- No layered emergency overrides as permanent implementation.

### E. Hardcode minimization
- No new hardcoded spacing/colors/breakpoints/text when token/config/data already exists.
- No unexplained magic numbers.

### F. Style override control
- Avoid long override chains, high specificity escalation, duplicate selectors, and conflicting media rules.

## 3) Required change flow

1. Edit source files only (`src/pages/index.html`, `src/scripts/**`, `src/styles/**`, templates/data/config).
2. Run `./build.sh` to regenerate artifacts.
3. Run `./tools/quality-check.sh`.
4. Stage source/policy/tooling changes only (generated files are blocked by pre-commit guard).
5. Controlled exception for release-only generated artifacts:
   - explicit approval + explicit env override: `AC_ALLOW_GENERATED_STAGE=1`.

## 4) Current known violations (must be reduced over time, not expanded)
- Large monoliths: `src/styles/main.css` and `src/scripts/main.js`.
- Legacy branches present in runtime (`booking-stage-*-legacy`, `offer-legacy-*`).
- High override pressure in styles (`!important` and deep selector chains).
- Inline runtime markup/styles/scripts still present in generated `dist/index.html`.

## 5) Enforcement
- Local hook: `tools/precommit-guard.sh`
- Guard blocks staging of generated/runtime artifacts by default.
- Guard keeps fast-track checks for new entities in monolith entrypoints.
