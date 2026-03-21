# Project Map (Canonical)

## Source of truth
- `index.html`
- `src/scripts/**`
- `src/styles/**`
- `assets/**`

## Runtime entrypoints
- HTML: `index.html`
- JS: `src/scripts/app.js` (module entry)
- CSS: `src/styles/main.css`

## Build entrypoints
- `build.sh`
- `deploy.sh`

## Build output
- `dist/**` is generated only via `build.sh`.
- Never edit files in `dist/` manually.

## What is non-runtime / archive
- `release/**` (exports, snapshots, bundles)
- `archive/**` (legacy backups, old exports)
- `*.zip`, `*.bak*`
- local runtime artifacts: `.codex-artifacts/`, `.tmp_runtime_audit/`

## Legacy files policy
- `script.js` / `styles.css` are legacy and not part of active runtime.
- old backup html files are moved to `archive/legacy-html/`.

## Release flow
1. Update source files in `index.html`, `src/**`, `assets/**`.
2. Run `bash build.sh`.
3. Deploy via `deploy.sh` (or wrappers).
4. Optionally run `tests/smoke-test.sh <url>`.

## Parity rule
- `dist/index.html` must equal deterministic transform of `index.html`:
  `/src/* -> ./src/*` and `/assets/* -> ./assets/*`.
- `build.sh` enforces this parity check.
