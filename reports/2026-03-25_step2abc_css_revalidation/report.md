# Step 2A/2B/2C Revalidation (current baseline, local-only)

## 1) Что было проблемой
Ранее Step 2A/2B/2C закрывались не на том runtime-состоянии. Нужно было повторить triage + safe cleanup + hot-zone контроль на **текущем baseline** без деплоя.

## 2) Safety / backup
- Ветка: `dev`
- Safety tag: `safety/step2abc_revalidation_2026-03-25` -> `ba965c2`
- Backup zip: `reports/2026-03-25_step2abc_revalidation_safety/baseline_backup_2026-03-25_23-02-55.zip`

## 3) Step 2A — Stylelint triage
Before (по используемому stylelint config):
- total findings: `4`
- тип: `selector-id-pattern`
- зона: desktop shift selector id (`#desktopShiftOptions`)

Triage:
- Safe: `0`
- Caution: `4` (требовалась согласованная правка HTML+JS+CSS id)
- Defer: `0`

## 4) Что вошло в safe/manual cleanup
Сделан один целевой low-risk фикс (без изменения бизнес-логики):
- `desktopShiftOptions` -> `desktop-shift-options`
- Синхронно в:
  - `index.html` (id)
  - `src/scripts/main.js` (селекторы/targets)
  - `src/styles/main.css` (селекторы)

## 5) Step 2B/2C — Hot-zones контроль
Hot-zones не трогались массово.
- см. `tables/hotzones-left.csv`
- изменён только selector/id вне защищённых hot-zones

## 6) Validation after cleanup
### Stylelint
- before: `4`
- after: `0`
- delta: `-4`
- файл: `validation/stylelint-before-after.csv`

### CSSTree
- warnings: `0`
- файл: `validation/csstree-findings.csv`

### Project Wallace (proxy method, comparable internal metrics)
- rulesTotal: `806 -> 806`
- selectorsTotal: `1152 -> 1152`
- selectorsUnique: `715 -> 715`
- importantTotal: `17 -> 17`
- mediaQueriesTotal: `2 -> 2`
- файл: `validation/project-wallace-before-after.csv`

### PurgeCSS estimate
- source_css_bytes: `125591`
- purgecss_output_bytes: `125492`
- removed estimate: `99 bytes` (`0.079%`)
- файл: `validation/purgecss-estimate.csv`

### Smoke
- Авто-smoke в этом проходе не запускался намеренно (CSS-only стабилизация, без runtime perturbation).
- файл: `validation/playwright-summary.json`

## 7) Сборка
- `./build.sh` выполнен успешно
- Canonical artifact: `dist/index.html`

## 8) Итоговая оценка после повтора Step 2A/2B/2C
- CSS слой: улучшен по enforced-stylelint rule (`4 -> 0`)
- CSSTree: чисто
- Структурный риск: без роста
- Изменения: локальные, безопасные, без деплоя

## 9) Что осталось
- При необходимости следующего шага — только отдельный targeted pass по заранее согласованным правилам stylelint (если расширяем rule set).
- Baseline и runtime не пересобирались в новую архитектуру, только revalidation + минимальный safe fix.
