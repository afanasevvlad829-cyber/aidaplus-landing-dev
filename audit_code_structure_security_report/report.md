# 1. Executive summary
Проект рабочий и функционально покрывает 4 режима (desktop/mobile × full/compact), но технически находится в **patch-driven** состоянии с критичным системным риском: **рассинхрон артефактов сборки** (`build/gpt.html` уже не совпадает с актуальным `gpt.html/dist/index.html`).

Ключевой вывод: дальше развивать можно, но только после короткого P0 cleanup (артефакты, reset/storage, source-of-truth дисциплина). Без этого стоимость каждой правки и риск «выкатили не то» будет расти.

# 2. Scores (1–10)
- Архитектурная целостность: **5/10**
- Поддерживаемость: **4/10**
- Устойчивость flow: **6/10**
- Качество CSS-слоя: **4/10**
- Качество JS/state слоя: **5/10**
- Security hygiene: **6/10**
- Риск накопленных конфликтов: **8/10**

# 3. Основные риски
1. **[P0] Артефакты сборки рассинхронизированы**: `build/gpt.html` устарел относительно `gpt.html/dist/index.html`.
2. **[P0] Split source of truth**: параллельно живут активный монолит (`src/scripts/main.js`, `src/styles/main.css`) и отдельные «модульные» деревья `src/scripts/core|features|data`, `src/styles/base|components|layout|features`, которые не участвуют в build-пайплайне.
3. **[P0] Debug reset опасно широк**: `localStorage.clear()` + `sessionStorage.clear()` удаляют все ключи origin.
4. **[P0] PII fallback в localStorage**: при падении `/api/lead` данные лида сохраняются локально без TTL.
5. **[P1] CSS seam/overlap хрупкий**: hero+booking и стык с первой секцией держатся на негативных отступах/translate/override.

# 4. Что уже хорошо
- В активном runtime **нет Telegram token/chat_id** и нет прямого вызова Telegram API (в `src/scripts/main.js`).
- Lead-отправка сведена к одному endpoint-контуру (`/api/lead`) с fallback-поведением.
- Внешние ссылки с `target="_blank"` в проверенных файлах имеют `rel="noopener noreferrer"`.
- Offer-flow уже защищён от части race-условий (`offerRunId`, `offerTimeoutIds`, `clearOfferTimeout`).
- Есть единый data-action router и базовая модальная координация.
- Локальный runtime smoke (headless) не дал console/page/network errors в проверенном сценарии.

# 5. Архитектура
## Что проверено
- `index.html`, `src/styles/main.css`, `src/scripts/main.js`, `src/pages/legal.html`, `build/gpt.html`, `build/legal.html`, `build.sh`, `deploy.sh`.

## Находки
- Канон по факту: `index.html` + `src/styles/main.css` + `src/scripts/main.js`.
- Build использует только `src/scripts/main.js` (`build.sh:17-20`), хотя в `src/scripts/**` есть большой параллельный контур.
- Аналогично по CSS: runtime-файл `main.css`, при этом split-CSS дерево присутствует и не импортируется.
- `deploy.sh` публикует `dist/index.html -> index.html` на сервере, что смешивает понятия source template и deploy artifact.

## Вывод
- Без широкого рефакторинга жить можно, но нельзя оставлять параллельные неиспользуемые контуры без жёсткой политики и проверок.

# 6. CSS/layout audit
См. таблицу: `tables/css-risks.csv`.

Ключевые зоны хрупкости:
- Hero/booking overlap: `.hero-booking-card` (`margin-bottom:-32px`, `transform:translateY(-12px)`).
- Seam patch: `.body-sections > .section-card:first-child` с отрицательными отступами/снятием бордеров.
- Многоступенчатые override по тем же селекторам между base + `@media (1180)` + `@media (820)`.
- Микс `overflow:visible` и `overflow-x:clip` в соседних контейнерах.
- Stage-классы booking (`booking-stage-*`) скрывают большие куски DOM и очень чувствительны к перестановкам разметки.

# 7. JS/state audit
См. таблицу: `tables/js-state-risks.csv`.

Ключевые технические риски:
- Один большой mutable state и много прямых мутаций (`~95` присваиваний `state.*`).
- Высокая связанность рендера (например, `renderSummary()` вызывает `renderBookingPanels()` внутри).
- Сложная event-матрица: несколько `document.addEventListener('click', ...)` + `data-action` + отдельные ветки.
- Сильная зависимость UI от stage-классов + branch logic по режимам.
- Неиспользуемые функции в активном runtime: `formatTelegramMessage`, `renderStars`, `openOfferCheck`.

# 8. Security audit
См. таблицу: `tables/security-findings.csv`.

Главное:
- В активном runtime токенов/секретов не найдено.
- Но есть риски хранения персональных данных в localStorage fallback.
- Debug-reset доступен в интерфейсе и затрагивает весь origin storage.
- В репозитории есть legacy-модуль `src/scripts/features/analytics.js` с Telegram sender (не в активном build-пути, но риск регресса при реинтеграции).

# 9. Build pipeline audit
См. таблицу: `tables/build-pipeline-risks.csv`.

Факт рассинхрона (после локального `build.sh`):
- `dist/index.html` SHA16: `99f9ed5f4d5e3b72`
- `gpt.html` SHA16: `99f9ed5f4d5e3b72`
- `build/gpt.html` SHA16: `c07a79987cff56ee` (устаревший)

Это **critical operational risk** для релиза/приёмки.

# 10. Runtime audit
Проверенный локальный сценарий (`snippets/runtime-smoke.json`):
- pageErrors: 0
- consoleErrors: 0
- consoleWarnings: 0
- requestFailed: 0

Проверялось:
- загрузка `gpt.html`
- переключение desktop/mobile
- mobile compact + section modal open/close
- video modal open/close
- calendar modal open/close
- debug reset

Репродуцируемых критических JS-ошибок в этом smoke не обнаружено.

# 11. Technical debt
Основной накопленный долг:
- Patch-driven CSS с seam/overlap hack-цепочкой.
- Runtime-монолит `main.js` (~2772 строки) + параллельный неиспользуемый JS-контур.
- Параллельный неиспользуемый CSS-контур при живом монолите `main.css` (~4155 строк).
- Размноженные build-артефакты и неполная артефактная синхронизация.

# 12. P0 / P1 / P2 plan
См. `tables/cleanup-plan.csv`.

Критично до дальнейшего роста (обязательно):
- P0 артефактная синхронизация и единый release target.
- P0 ограничение debug-reset только на aidacamp ключи.
- P0 убрать PII fallback из localStorage.
- P0 закрыть parallel-dead-source риск (JS/CSS).

Можно терпеть временно:
- P2 `alert()` в форме.
- P2 отсутствие CSP при текущем низком уровне инъекций (но лучше закрыть).

# 13. Minimal cleanup plan
Минимальный пакет (без большого рефакторинга), который резко снижает риск:
1. Build discipline (0.5 дня):
   - Обновлять один artifact path.
   - Убрать `build/gpt.html` из acceptance-процесса или начать его генерировать тем же build-step.
   - Добавить checksum step в build/release.
2. Storage hardening (0.5 дня):
   - В reset удалять только префиксные ключи (`aidacamp_*`).
   - Убрать `localStorage.clear/sessionStorage.clear`.
3. Lead fallback hardening (0.5 дня):
   - Не хранить имя/телефон локально.
   - Хранить только `event + timestamp + retry_flag`.
4. CSS seam stabilization (1 день):
   - Зафиксировать единый контракт hero→section без отрицательных first-child патчей.
   - Сохранить controlled overlap через отдельный wrapper.
5. Dead-path hygiene (0.5 дня):
   - Явно пометить неиспользуемые `src/scripts/features/**`, `src/styles/**` (или архивировать).
   - Добавить lint/check, чтобы изменения шли в runtime-файлы.

---

## Отдельный раздел: где именно «колхоз в CSS» (топ подозрительных мест)
1. `src/styles/main.css:658-681` — overlap через `margin-bottom:-32px` + `translateY` + hover delta.
2. `src/styles/main.css:1301-1307` — seam patch первой секции отрицательным margin и снятием боковых бордеров.
3. `src/styles/main.css:311-376` — многослойный hero + псевдо-overlay + отдельные z-index уровни.
4. `src/styles/main.css:694-699` — `overflow-x:clip` на контейнерах при `overflow:visible` в hero.
5. `src/styles/main.css:702-704` — `!important` для mobile booking card (inline style override smell).
6. `src/styles/main.css:728-755` — stage-driven массовое скрытие блоков (`booking-stage-*`).
7. `src/styles/main.css:3201-3330` — compact/mobile section modal sizing через magic numbers.
8. `src/styles/main.css:1943-2170` — coexist старого main-video и новой карточной модели.
9. `src/styles/main.css:3912-4151` — плотный стек media overrides по тем же селекторам.
10. `src/styles/main.css:4144-4147` — `#versionBadge` mobile override через `!important`.

## Проверка ограничений
- Фичи/правки в продуктовую логику не вносились.
- Выполнен только аудит текущего состояния.
