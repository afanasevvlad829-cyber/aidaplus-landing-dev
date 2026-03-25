# 1. Что было проблемой
- P0 рассинхрон артефактов: `dist/index.html`, `gpt.html`, `build/gpt.html` могли расходиться.
- Debug reset чистил весь origin storage (`localStorage.clear()` / `sessionStorage.clear()`).
- Fallback `notifyLead()` сохранял payload с PII в localStorage.
- Build/deploy policy была не до конца формализована как единый канонический release target.

# 2. Что изменено в P0 cleanup
- Введён один канонический release target: `dist/index.html`.
- `build.sh` теперь всегда синхронизирует зеркала: `gpt.html`, `build/gpt.html`, и legal-артефакты.
- Добавлен обязательный sync-check (`cmp`) в `build.sh`.
- `resetBookingFlowDebug()` переведён на project-scoped очистку storage (без `clear()` всего origin).
- `notifyLead()` fallback переведён на safe meta storage без PII.
- Документация `project-map` и `release-checklist` обновлена под новую policy.

# 3. Как устранён рассинхрон build-артефактов
Изменения в `build.sh`:
- `mkdir -p dist build`
- после сборки:
  - `dist/index.html -> gpt.html`
  - `dist/index.html -> build/gpt.html`
  - `src/pages/legal.html -> dist/legal.html -> legal.html -> build/legal.html`
- добавлен sync guard:
  - `cmp dist/index.html gpt.html`
  - `cmp dist/index.html build/gpt.html`
  - и аналогично для legal

Проверка checksum после шага:
- `dist/index.html` = `gpt.html` = `build/gpt.html` (SHA1 совпадает)
- `dist/legal.html` = `legal.html` = `build/legal.html` (SHA1 совпадает)

# 4. Как зафиксирован канонический release target
- Канон зафиксирован в runtime/process документации:
  - `docs/project-map.md`
  - `docs/release-checklist.md`
- Явно обозначено:
  - канонический release artifact: `dist/index.html`
  - `gpt.html` и `build/gpt.html` — зеркала, не source-of-truth.

# 5. Как ограничен reset scope
В `src/scripts/main.js`:
- добавлен `clearProjectStorage()`
  - удаляет только ключи по regex: `(aidacamp|booking|promo|lead|aida|ac_)`
  - отдельно для localStorage и sessionStorage
- в `resetBookingFlowDebug()` заменено:
  - было: `localStorage.clear()` + `sessionStorage.clear()`
  - стало: `clearProjectStorage()`
- cookie cleanup остался project-scoped (`clearBookingCookies()`), без тотального wipe.

# 6. Как убрано PII из fallback storage
В `src/scripts/main.js`:
- добавлен `saveLeadFallbackMeta(eventName, endpoint, reason)`
- в `notifyLead()` fallback больше НЕ сохраняет `payload`.
- теперь сохраняется только безопасный минимум:
  - `ts`
  - `event`
  - `endpoint`
  - `reason`
  - `count`
- key: `aidacamp_lead_fallback_meta`.

# 7. Результаты tool validation
## Stylelint
Файл: `validation/raw-stylelint.txt`, `validation/stylelint-findings.csv`
- Всего findings: **651**
- Топ-правила:
  - `alpha-value-notation` (190)
  - `color-function-alias-notation` (190)
  - `color-function-notation` (190)
  - `rule-empty-line-before` (42)
- Вывод: в основном это **стилевые/форматные** замечания, не функциональные P0-блокеры.

## CSSTree
Файл: `validation/raw-csstree.txt`, `validation/csstree-findings.csv`
- Валидатор не показал spec-level ошибок для текущего CSS.
- Итог: `No validator warnings`.

## Project Wallace
Файл: `validation/raw-wallace.txt`, `validation/project-wallace-metrics.csv`
Ключевые метрики:
- `sourceLinesOfCode`: 3105
- `compiledLinesOfCode`: 4155
- `rulesTotal`: 550
- `selectorsTotal`: 615
- `selectorsUnique`: 534
- `importantTotal`: 14
- `specificityMax`: `1:1:1`

Вывод: CSS остаётся объёмным и patch-heavy, но без аномального `!important` перегруза.

## PurgeCSS estimate (optional)
Файл: `validation/purgecss-estimate.csv`
- `originalCssBytes`: 85891
- `purgedCssBytes`: 79697
- `estimatedUnusedBytes`: 6194
- `estimatedUnusedPercent`: 7.21%

Это только аналитическая оценка, удаления не выполнялись.

# 8. Обновлённая оценка проекта после шага 1
- До: **5.4/10**
- После: **6.8/10**

Почему рост:
- закрыты P0 operational/security риски (artifact sync + scoped reset + no PII fallback).
- build/deploy трактовка стала однозначнее.

# 9. Что осталось на шаг 2
- CSS normalization (stylelint-format backlog 651 пунктов, пакетно и безопасно).
- Явное снятие split source-of-truth в JS/CSS деревьях (mark/archive non-runtime ветки).
- Лёгкая автоматизация release smoke (чтобы не полагаться только на manual checklist).
