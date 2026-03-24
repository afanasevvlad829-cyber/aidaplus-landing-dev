# Step 2D — Controlled CSS follow-up (ID contract migration)

## 1) Executive summary
Выполнен **Option A**: остаток `selector-id-pattern` закрыт через контролируемую миграцию ID-контракта в трёх слоях одновременно:
- HTML (`index.html`)
- CSS (`src/styles/main.css`)
- JS (`src/scripts/main.js`)

Baseline не переснимался и остаётся каноническим reference.

## 2) Что изменено
Мигрированы только 4 ID (без расширения scope):
- `desktopBookingCard` -> `desktop-booking-card`
- `desktopBookingInfo` -> `desktop-booking-info`
- `mobileBookingInfo` -> `mobile-booking-info`
- `versionBadge` -> `version-badge`

Все ссылки на эти ID обновлены синхронно в HTML + JS + CSS.

## 3) selector-id-pattern: fixed or deferred
**Fixed (not deferred).**

До шага (из Step 2C accepted snapshot): 12 (`selector-id-pattern`)
После шага: 0.

## 4) Что сознательно не трогали
- Hot-zones не переписывались структурно (hero/booking/seam/compact modals/mobile menu/video/team/contacts).
- Никакой массовой CSS-чистки или layout-рефакторинга.
- Никаких изменений baseline pack.

## 5) Baseline-aware comparison
Сравнение сделано только по изменённой зоне (hero + booking area, где используются мигрированные ID):
- `before-after/desktop-hero-id-contract-before.png` (из канонического baseline)
- `before-after/desktop-hero-id-contract-after.png` (текущий runtime после Step 2D)

Дополнительно:
- `before-after/booking-step1-before.png`
- `before-after/booking-step1-after.png`

Вывод: визуальных регрессий в затронутой зоне не обнаружено.

## 6) Tool validation
См. `validation/*`.

### Stylelint
- `stylelint-before-after.csv`: **12 -> 0** (delta `-12`)
- Остаток `selector-id-pattern` закрыт полностью.

### CSSTree
- `csstree-findings.csv`: warnings = 0
- Spec-level regressions не появилось.

### Project Wallace
- `project-wallace-before-after.csv`
- Ключевые structural метрики (rules/selectors/important/media) без изменений.
- `stylesheetSizeBytes`: +23 (ожидаемо из-за kebab-case ID).

### PurgeCSS estimate
- `purgecss-estimate.csv`
- Оценка без удаления кода; ухудшений не выявлено.

### Playwright smoke
- `playwright-summary.json`
- Desktop full/compact + Mobile full/compact: pass
- Console/page errors: 0

## 7) Scores (updated)
- CSS score: **8.1 -> 8.3**
- Overall project score: **8.2 -> 8.4**

## 8) Что осталось
Для этого CSS-only трека Step 2D — критический хвост закрыт (remaining `selector-id-pattern` устранён).
Дальше имеет смысл идти только в отдельный следующий шаг по новым целям, без пересъёмки baseline.
