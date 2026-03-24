## 1. Executive summary
Сделан Step 2A как **safe CSS cleanup** без изменения логики/UI-поведения.

Что выполнено:
- stylelint findings классифицированы на `safe / caution / defer`
- почищен только safe-бэклог
- hot-zones не трогались агрессивно
- прогнаны post-cleanup: Stylelint, CSSTree, Project Wallace, PurgeCSS estimate, Playwright smoke

Итог Step 2A:
- Stylelint: **651 -> 608** (`-43`)
- Поведенческих регрессий в smoke не найдено
- CSSTree остаётся чистым

## 2. Stylelint triage
| Finding type | Count | Safe / caution / defer | Почему | Что делать |
|---|---:|---|---|---|
| `rule-empty-line-before` | 42 | safe | чисто формат/читаемость, без влияния на каскад | исправлено в Step 2A |
| `declaration-block-no-redundant-longhand-properties` | 1 | safe | эквивалентный shorthand, без изменения поведения | исправлено в Step 2A |
| `declaration-block-single-line-max-declarations` | 9 | caution | может раздувать критичные utility-блоки/анимации | оставить на ручной Step 2B |
| `keyframes-name-pattern` | 7 | caution | требует rename + sync всех `animation` ссылок | перенос в Step 2B |
| `media-feature-range-notation` | 2 | caution | смена синтаксиса media, ручная проверка browser-риска | перенос в Step 2B |
| `alpha-value-notation` | 190 | defer | массовая косметика, высокий churn в hot-zones | оставить до отдельного format-step |
| `color-function-alias-notation` | 190 | defer | массовая косметика, низкая практическая ценность сейчас | defer |
| `color-function-notation` | 190 | defer | массовая косметика, высокий diff-noise | defer |
| `color-hex-length` | 8 | defer | косметика | defer |
| `selector-id-pattern` | 12 | defer | naming debt, не для safe-step | defer |

## 3. Что вошло в safe cleanup
Изменения только в `src/styles/main.css`:
- убраны нарушения `rule-empty-line-before` (42)
- убран 1 случай `declaration-block-no-redundant-longhand-properties`

В Step 2A сознательно не делалась массовая нормализация цветов/alpha, чтобы не размыть hot-zones и не увеличивать риск визуального дрейфа.

## 4. Что сознательно НЕ трогали
- hero/booking overlap values
- seam/overlap tuning
- compact modal geometry
- mobile menu layout
- team/video/contacts-specific каскад
- массовые color/alpha notation фиксы по всему файлу
- rename keyframes

## 5. Hot-zones left for manual cleanup
Оценка по распределению stylelint findings (до cleanup) по диапазонам hot-zones:

| Hot zone | Findings count | Что оставлено нетронутым | Почему |
|---|---:|---|---|
| hero | 143 | notation/id-pattern/style debt | высокий риск визуального дрейфа первого экрана |
| booking-card | 203 | notation + cascade-sensitive step rules | зона критична для funnel/stability |
| seam/overlap | 16 | overlap-related style debt | чувствительно к px-изменениям |
| compact-modals | 18 | modal geometry + notation | риск modal regressions |
| mobile-menu | 17 | nav spacing/cascade | риск UX-поломок на mobile |
| team | 11 | card/grid styling debt | риск layout drift |
| video | 67 | carousel/card overlay styles | риск визуального слома media-блока |
| contacts/socials | 10 | compact contacts/social styles | риск паритета mobile/full |
| footer/legal | 2 | footer selectors | low volume, но оставлено в defer |

## 6. Tool validation after cleanup
- Stylelint: выполнено, backlog уменьшен
- CSSTree: `No validator warnings`
- Project Wallace: структура CSS практически неизменна
- PurgeCSS estimate: небольшой drift (только аналитика)
- Playwright smoke:
  - desktop full: OK
  - desktop compact: OK
  - mobile full: OK
  - mobile compact: OK
  - console/page errors: 0

## 7. Before / after metrics
### Stylelint
- total: `651 -> 608` (`-43`)
- снято:
  - `rule-empty-line-before`: `42 -> 0`
  - `declaration-block-no-redundant-longhand-properties`: `1 -> 0`

### CSSTree
- before: 0 warnings
- after: 0 warnings

### Project Wallace (ключевые)
- `rulesTotal`: `550 -> 550` (unchanged)
- `selectorsTotal`: `615 -> 615` (unchanged)
- `importantTotal`: `14 -> 14` (unchanged)
- `compiledLinesOfCode`: `4155 -> 4209` (+54, форматный шум)
- `complexityScore`: `8571 -> 8568` (без существенного изменения)

### PurgeCSS estimate
- estimated unused: `~7.21% -> ~7.22%` (практически без изменений)

## 8. Новая оценка CSS-слоя
- До Step 2A: **5.8/10**
- После Step 2A: **6.2/10**

Причина роста: уменьшен stylelint-noise в безопасной зоне и сохранена стабильность runtime.

## 9. Новая оценка проекта
- До Step 2A: **6.8/10**
- После Step 2A: **7.0/10**

Почему не выше: основные архитектурные/hot-zone риски оставлены намеренно на ручной Step 2B.

## 10. Что осталось на Step 2B
1. Ручная чистка hot-zones (hero/booking/seam/modals/mobile-nav/video/team)
2. Решение по large deferred style backlog (`alpha/color notation`) отдельным controlled pass
3. Адресная правка caution-правил:
   - `declaration-block-single-line-max-declarations`
   - `keyframes-name-pattern`
   - `media-feature-range-notation`
4. Проверка каскада после каждого hot-zone блока, а не массовой автоправкой
