# 1. Executive summary
Проведён one-sprint аудит по схеме: ручной инженерный разбор -> внешние инструменты -> интерпретация -> сводный вывод.

Итог: проект частично соответствует целевой модели «1 system / 4 views».
- Что хорошо: единый build-canon (`dist/index.html`), единый core-state booking, policy full/compact подтверждена runtime.
- Главный риск: semantic divergence в mobile full (урезание контента и отдельные представления), плюс хрупкие hot-zones CSS/JS из patch-driven роста.
- Критичный security finding: `state.phone` сохраняется в persistent storage.

# 2. Target architecture definition
Целевая модель для этого аудита:
- единый data-source
- единая смысловая структура блоков
- единая поведенческая логика flow
- 4 представления отличаются только формой (layout/style), а не смыслом/доступностью.

# 3. Manual engineering audit results
Проверены:
- source/build/deploy chain: `build.sh`, `deploy.sh`, `dist/index.html`, `gpt.html`, `build/gpt.html`
- DOM/структура: `index.html`
- CSS hot-zones: `src/styles/main.css`
- JS/state/event hot-zones: `src/scripts/main.js`

Ручные выводы:
- Pipeline канонизирован, но perception split остаётся (много файлов в `src/scripts/**`/`src/styles/**`, runtime реально на `main.js`/`main.css`).
- Структурно desktop и mobile по ряду блоков живут разными ветками DOM.
- В mobile full есть content reduction (photos/reviews/faq/team/journey/contacts), что уже нарушает «same meaning in full modes».
- Event layer и modal routing перегружены (несколько слушателей документа + data-action router + отдельные overlay handlers).

# 4. Tool-assisted validation results
Период прогона: 2026-03-24.

## Stylelint
Источник: `validation/raw-stylelint.txt`, `validation/stylelint-findings.csv`
- Findings: 651
- Основные правила: `alpha-value-notation`, `color-function-*`, `rule-empty-line-before`
- Интерпретация: в основном стиль/формат, не runtime-breakers.

## CSSTree
Источник: `validation/raw-csstree.txt`, `validation/csstree-findings.csv`
- Spec-level invalid declarations: не обнаружено.
- Интерпретация: синтаксическая валидность CSS в норме.

## Project Wallace
Источник: `validation/raw-wallace.txt`, `validation/project-wallace-metrics.csv`
- `compiledLinesOfCode`: 4155
- `rulesTotal`: 550
- `selectorsTotal`: 615 (`selectorsUnique`: 534)
- `importantTotal`: 14
- `mediaQueriesTotal`: 2
- Интерпретация: крупный монолит, высокая сложность, низкая breakpoint-granularity.

## PurgeCSS estimate
Источник: `validation/raw-purgecss.txt`, `validation/purgecss-estimate.csv`
- Потенциально неиспользуемо: ~7.21% (оценка)
- Интерпретация: небольшой, но не нулевой dead-style tail.

## Playwright smoke (4 режима)
Источник: `validation/playwright-summary.json`
- policy checks: `policyOk=true` во всех 4 режимах
- console/page errors: отсутствуют
- Интерпретация: базовая runtime-стабильность и navigation policy работают.

# 5. What is already unified
- Единый build-canon (`dist/index.html`) и sync-check артефактов.
- Единый state-driven booking flow (общий state + общие переходы).
- Full/compact policy реализована и подтверждена runtime.
- Lead submit идёт через `/api/lead` (без client Telegram token/chat_id).

# 6. What is still divergent
- Mobile full режет semantic richness контента (не только layout-разница).
- FAQ/reviews/team/journey/contacts имеют разные модели представления между full-режимами.
- Stay для mobile собирается из desktop DOM (кросс-веточная зависимость).
- Section modal использует clone-модель с риском деградации интерактива.

# 7. Unique elements found
См. `tables/unique-elements.csv`.
Ключевое:
- `serviceMenu` (desktop-only) и отдельная mobile nav-схема — допустимая divergence.
- `debug-controls` в runtime DOM — технически полезно, но должно быть build-flag gated.
- `mobileInline*` укороченные ветки — частично оправданы, но сейчас избыточно режут смысл full-mode.

# 8. Cut/reduced content findings
См. `tables/cut-content.csv`.
Наиболее проблемное:
- mobile full срезает photos/reviews/faq/team/journey/contacts.
- Это уже не «тот же блок в другом виде», а «другой объём смысла».

# 9. CSS audit findings
См. `tables/css-risks.csv`.
Главные hot-zones:
- hero/booking overlap на magic numbers (`min-height`, negative margin, translate)
- id-heavy селекторы (~226 id references)
- многослойный z-index/modals stack
- геометрия compact modals через сложные формулы
- монолитный `main.css` (4154 lines)

# 10. JS/state audit findings
См. `tables/js-state-risks.csv`.
Главные риски:
- перегруженный monolith runtime (`main.js` ~2793 lines)
- конкурирующие click handlers + data-action router
- широкое использование `innerHTML`
- сложная mode/state связность
- hidden dependency: mobile stay derives from desktop DOM
- reset scope logic и storage policy требуют ужесточения

# 11. Security/build findings
См. `tables/security-build-risks.csv`.
Главное:
- **Critical**: `state.phone` в persistent storage.
- Major: permissive embed branch; debug controls в продовом DOM; optional remote fetch в build.
- Build/deploy в целом стабилен, но нужен жёсткий operational policy (что именно публикуется и откуда).

# 12. What is already good and should not be broken
- Канонический build target и артефактный sync-check.
- Full/compact navigation policy.
- Основной booking funnel и offer guards.
- Lead endpoint abstraction (`/api/lead`) вместо прямого Telegram API.
- Runtime smoke без JS runtime errors.

# 13. Minimal cleanup plan
Минимальные шаги без большого рефакторинга:
1. Убрать `phone` из localStorage persistence (оставить transient/session).
2. Перевести `clearProjectStorage()` на whitelist ключей.
3. Убрать cross-view derivation для stay (единый data source).
4. В full-mode вернуть semantic parity для FAQ/reviews/team/journey.
5. Свести document click-handling в единый router слой.
6. Зафиксировать debug-controls под build-time flag.

# 14. P0 / P1 / P2 sync plan
См. `tables/sync-plan.csv`.

Кратко:
- P0: storage privacy + source-of-truth policy + event routing simplification.
- P1: semantic parity full/full + remove cross-view dependencies + hero/booking tokenization.
- P2: CSS modularization и footer parity polish.

# 15. Final compliance score
Оценка соответствия целевой архитектуре (1–10):
- Архитектурная целостность: **6.7**
- Data unification: **6.2**
- Structure unification: **5.9**
- Behavior unification: **6.5**
- CSS quality: **5.8**
- Responsive stability: **6.3**
- JS/state reliability: **6.1**
- Security hygiene: **5.6**
- Build/release reliability: **7.7**
- Overall target-architecture compliance: **6.3**

Вывод: проект уже рабочий и управляемый, но до строгой модели «единая система / 4 представления» мешают именно semantic cuts в mobile full, storage privacy риск и patch-driven сложность CSS/JS hot-zones.
