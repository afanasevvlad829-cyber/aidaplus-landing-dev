# Artifact Inventory / Cleanup Report

## 1. Executive summary
Repository has a high artifact load: generated outputs, audit bundles, screenshot dumps, and backups are mixed with active source. This increases noise, slows reviews, and makes it hard to identify canonical files.

## 2. Что найдено
- Inventoried artifact files (requested scopes): **7305**
- Git states in this inventory:
  - tracked-clean: 12
  - tracked-dirty: 29
  - untracked: 1663
  - ignored: 5601
- Category counts:
  - A Build/Release: 6
  - B Audit/Report: 5592
  - C Screens/Visual: 1545
  - D Legacy/Backup/Archive: 172
  - E Runtime/Source Docs: 12

## 3. Основные риски текущего хранения артефактов
1. Source and generated outputs coexist in root (`gpt.html`, `legal.html`, `build/*`, `dist/*`) causing divergence risk.
2. Large binary zip accumulation (`patch_*`, `audit_*`, `release/*`) inflates repo and obscures what is canonical.
3. Screenshot sprawl (`screens/*`) without curated baseline makes visual review non-deterministic.
4. Backup/legacy snapshots are mixed into active workspace, increasing accidental commit risk.

## 4. Recommended artifact structure
Use a single policy-driven structure:
- `src/pages/*` for canonical source html pages.
- `docs/*` for canonical process/runtime docs.
- `artifacts/audits/final/*` for final accepted reports.
- `artifacts/screens/final/*` for curated baseline screenshots only.
- `artifacts/screens/debug/*` (gitignored) for temporary/debug captures.
- `archive/legacy/*` for historical backups (outside active development flow).
- `release/*` only for release notes/checksums; binary bundles preferably outside git.

## 5. Что обязательно коммитить
- Current runtime/release docs (`docs/contracts.md`, `docs/state-schema.md`, `docs/release-checklist.md`, `docs/project-map.md`).
- Canonical source page (`src/pages/legal.html`) instead of generated `dist/legal.html`.
- One final artifact-policy report (this package contents in extracted textual form).
- Optional: 5–10 baseline screenshots in `artifacts/screens/final` only.

## 6. Что оставить вне git
- Bulk zip bundles (`patch_*`, `audit_*`, `release/*.zip`, exports).
- Generated outputs (`build/*`, most of `dist/*` unless policy requires one deploy file).
- Bulk screenshots/debug captures.

## 7. Что архивировать
- Historical backups and legacy snapshots under `archive/legacy/*`.
- Old patch/audit bundles after extracting final textual report artifacts.

## 8. Что можно игнорировать
- `audit/playwright/artifacts/*`
- debug screenshot folders
- generated diffs and temporary exports
- zip bundles by default

## 9. Минимальный безопасный working set
- `docs/*` (canonical docs)
- `src/pages/gpt.html` and `src/pages/legal.html` (canonical source pages)
- 1 final report (`artifacts/audits/final/.../report.md`)
- 1 final CSV set (`artifact-inventory.csv`, `artifact-classification.csv`, `commit-now.csv`, `gitignore-recommendations.csv`)
- 5–10 final baseline screenshots max

## 10. Следующий практический шаг
1. Approve `.gitignore` policy snippet.
2. Move/curate artifacts into proposed folders.
3. Commit only canonical docs/source + curated final report/baselines.
4. Keep all zip/debug artifacts outside git (or in external artifact storage).
