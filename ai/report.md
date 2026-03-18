# Report — Task 1

## Задача
`ai/tasks/task-1.md` — исправить container layout full-mode секций, чтобы контент не растягивался на всю ширину и был выровнен как базовые секции.

## Статус
Выполнено.

## Что проверено и зафиксировано
- Для full-mode секций используется центрирующий контейнерный паттерн:
  - `body:not(.ac-compact-mode) .ac-site-section--extended .ac-site-section__head`
  - `body:not(.ac-compact-mode) .ac-site-section--extended .ac-site-section__inner`
  - ширина: `min(var(--max), calc(100% - 32px))`, выравнивание по центру.
- Все целевые секции имеют контент внутри `ac-site-section__inner`:
  - `#ai`, `#location`, `#photos`, `#video`, `#reviews`, `#team`, `#faq`.
- Для внутренних full-mode контейнеров используется ограничение по ширине (`width: 100%`) и без выхода за viewport.
- Логика booking/compact/hero/data sources не менялась.

## Изменения в коде
- Функциональных изменений в production-файлах не потребовалось.
- Добавлены отчётные файлы в `/ai` по результатам верификации.

---

## Task 2

### Задача
`ai/tasks/task-2.md` — привести карточки и grid full-mode секций к согласованному preview-стилю.

### Статус
Выполнено (верификация текущей реализации).

### Что проверено и зафиксировано
- Full-mode карточки соответствуют целевому стилю:
  - `border-radius: 22px` (через `var(--radius)`)
  - `padding: 22px`
  - `background: #fff`
  - `border: 1px solid rgba(17,24,39,.04)`
  - `box-shadow: 0 16px 40px rgba(15,23,42,.08)` (через `var(--shadow)`)
- Grid для обычных full-mode секций:
  - `.ac-section-grid { grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }`
- Grid для media/reviews/team:
  - `#acFullPhotos .ac-full-photo-grid`
  - `#acFullVideo .ac-full-video-grid`
  - `#acFullReviews .ac-full-cards-grid`
  - `#acFullTeam .ac-full-cards-grid`
  - все с `repeat(4, minmax(0,1fr))` и `gap: 14px`
- Проверены секции: `#ai`, `#location`, `#photos`, `#video`, `#reviews`, `#team`.
- Ограничения соблюдены: booking/compact/hero/data sources не изменялись.

### Изменения в коде
- Production-правки не потребовались.
- Обновлены только отчётные файлы `/ai/report.md` и `/ai/checklist.md`.

---

## Task 3

### Задача
`ai/tasks/task-3.md` — довести full-mode секции `#photos` и `#video` до согласованного preview.

### Статус
Выполнено (верификация текущей реализации).

### Что проверено и зафиксировано
- `#photos`:
  - секция рендерится внутри центрирующего `inner-container`;
  - есть toolbar фильтров `Все / Еда / Спорт / Бассейн / Учёба`;
  - фильтры в chip-стиле (`.media-chip`, `.media-chip.is-active`);
  - используется текущая photo/lightbox логика (`openMediaLightbox`).
- `#video`:
  - секция рендерится внутри центрирующего `inner-container`;
  - full-mode рендерится как grid карточек (`repeat(4, minmax(0,1fr))`, `gap:14px`);
  - используются текущие Rutube/lightbox механики (`openRutubeVideoLightbox` / `openMediaLightbox`);
  - источник видео не изменялся.
- Ожидаемый результат task-3 соблюдён:
  - фото/видео не растягиваются на всю ширину;
  - фото имеют toolbar filters;
  - видео оформлены как аккуратный grid;
  - open/lightbox поведение сохранено.

### Изменения в коде
- Functional changes в production-файлах не потребовались.
- Добавлен файл задания `/ai/tasks/task-3.md`.
- Обновлены `/ai/report.md` и `/ai/checklist.md`.

---

## Task 4

### Задача
`ai/tasks/task-4.md` — довести full-mode секции `#reviews`/`#team` и выполнить visual polish верхнего hero по согласованному preview.

### Статус
Выполнено (верификация текущей реализации).

### Что проверено и зафиксировано
- `#reviews` (full mode):
  - используется существующий dataset `AC_REVIEWS_DATA`;
  - выводится ровно 4 карточки (`AC_REVIEWS_DATA.slice(0, 4)`);
  - карточки рендерятся в отдельном grid (`.ac-full-cards-grid--reviews`) и не растягиваются в текстовый поток;
  - визуальные параметры карточек соответствуют preview-стилю (`radius/shadow/padding/spacing`).
- `#team` (full mode):
  - используется существующий источник (`window.__acTeamCards`, fallback из существующих team cards);
  - выводится ровно 4 карточки (`cards.slice(0, 4)`);
  - карточки рендерятся как отдельные person cards в grid (`.ac-full-cards-grid--team`), без деградации в текстовую колонку.
- Hero polish:
  - переключатель compact/full переносится в строку табов справа (`ac-view-switch--in-tabs`) и имеет компактные размеры;
  - age block собирается в topline (`.ac-age__topline`) для одной строки на desktop, с адаптивным переносом на mobile;
  - age socials добавляются как реальные SVG-иконки (VK/Instagram/Telegram/WhatsApp/Facebook/Messenger) в стиле preview;
  - contact card (`#acHeroContactCard`) располагается в правой hero-card слева сверху, имеет glass-стиль, closed state по умолчанию и раскрытие по кнопке.

### Изменения в коде
- Functional changes в production-файлах не потребовались: требования Task 4 уже реализованы.
- Добавлен файл задания `/ai/tasks/task-4.md`.
- Обновлены `/ai/report.md` и `/ai/checklist.md`.

---

## Task 5

### Задача
`TASK 5 — FINAL VERIFICATION + BUILD` — выполнить финальный verification pass перед деплоем и обновить `dist/index.html` через `build.sh`.

### Статус
Выполнено.

### Что проверено и зафиксировано
- Hero:
  - переключатель `Кратко / Подробно` присутствует (`#acViewSwitchWrap`, `#acViewToggle`);
  - age block собирается в одну строку на desktop (`.ac-age__topline`) с адаптивным переносом;
  - contact card присутствует (`#acHeroContactCard`, `.ac-hero-contact-card`), closed state по умолчанию, раскрытие по кнопке;
  - socials присутствуют (`.ac-age__socials`).
- Layout:
  - full-mode секции используют центрирующий контейнер (`.ac-site-section--extended .ac-site-section__head/.ac-site-section__inner`);
  - карточный стиль применяется (`radius/shadow/padding`);
  - grid-конфигурации для full mode присутствуют и адаптивно переключаются.
- Media:
  - photos grid (`.ac-full-photo-grid`) + toolbar filters (`.media-chip`);
  - video grid (`.ac-full-video-grid`);
  - lightbox/open логика сохранена (`openMediaLightbox`, `openRutubeVideoLightbox`).
- Content:
  - reviews: 4 карточки (`AC_REVIEWS_DATA.slice(0, 4)`);
  - team: 4 карточки (`cards.slice(0, 4)`);
  - FAQ full-mode секция отображается (`#acFullFaq`).
- Menu:
  - якоря верхнего меню присутствуют и соответствующие `id` секций есть (`#hero/#program/#format/#ai/#location/#photos/#video/#reviews/#team/#faq/#booking`).
- Debug cleanliness:
  - проверено по `index.html`, `src/scripts/main.js`, `src/styles/main.css`, `dist/index.html`;
  - `block-id`, `data-block`, debug labels/annotations не найдены.

### Build
- Выполнен `bash build.sh`.
- Результат: `dist/index.html` обновлён (`Built: dist/index.html`).
- Деплой на этом окружении не выполнен: `./deploy.sh` завершился ошибкой `cd /var/www/aidaplus-dev: No such file or directory`.

---

## Task 6

### Задача
`TASK 6 — PERFORMANCE + UX POLISH` — сделать лёгкий performance pass для снижения CLS и стабилизации layout перед финальным деплоем.

### Статус
Выполнено.

### Что сделано
- Images / loading:
  - в runtime-шаблонах добавлены `width`/`height` и `loading`/`decoding` для ключевых изображений:
    - логотип в hero,
    - аватары отзывов,
    - фото-карточки,
    - постеры видео,
    - карточки команды,
    - обложка книги.
  - добавлен универсальный pass `applyImagePerformanceHints(document)`:
    - hero-изображения получают eager-поведение (`loading="eager"`, `fetchpriority="high"` для не-иконок),
    - изображения вне hero получают `loading="lazy"`,
    - для изображений без размеров проставляются безопасные `width/height` по типу элемента.
- Media grid stability:
  - для видео-карточек зафиксировано соотношение сторон через `aspect-ratio: 9 / 16` на уровне карточки/постера;
  - убран авто-рост высоты video (`height: 100%`), чтобы карточки не прыгали при загрузке.
- Video load behavior:
  - подтверждено, что iframe Rutube создаётся только в lightbox по клику (в списке показываются только poster cards).
- Fonts:
  - `font-display: swap` уже присутствует в Google Fonts import (`display=swap`), дополнительная правка не требовалась.
- Hover/layout jumps:
  - проверено, что внесённые правки не добавляют hover-изменений, влияющих на layout.

### Ограничения
- Не менялись:
  - booking logic,
  - compact mode,
  - hero business logic,
  - data sources.

### Что не сделано явно
- Ручная проверка в браузере (desktop/mobile) не выполнялась в рамках этого шага.
- Автопроверка синтаксиса через `node --check` не выполнена: `node` отсутствует в текущем окружении.

---

## Task 7

### Задача
Точечная доработка full mode: исправить вывод видео, починить фильтры фото, убрать служебные подписи, выровнять секции по единому container pattern и синхронизировать `dist/index.html`.

### Статус
Выполнено.

### Что сделано
- Видео в full mode:
  - обновлён `renderFullModeVideoSection()`:
    - сначала берутся Rutube-элементы (если валидны),
    - если Rutube-элементы недоступны, используется fallback на `window.__acMediaMap.videos`;
  - рендер остаётся карточным, открытие по клику идёт через текущую lightbox-логику (`openRutubeVideoLightbox` / `openMediaLightbox`).
- Фото-фильтры в full mode:
  - устранён конфликт с глобальным делегированием кликов по `.ac-left-photo-cat`;
  - в full mode фильтры переведены на отдельный класс `.ac-full-photo-cat`;
  - active-state и фильтрация по категориям работают без перезагрузки.

---

## Task 13

### Задача
Точечная доработка навигации full mode: скрывать верхнее header-меню в `Подробно`, переносить текущее hero-меню (`#acLeftTabs`) в header с FLIP-анимацией и возвращать обратно в `Кратко` без клонирования DOM.

### Статус
Откат выполнен (по запросу пользователя).

### Что сделано
- Откатены изменения последней задачи по full mode navigation.
- Удалено из `index.html`:
  - header-slot `#acHeaderHeroMenuSlot`;
  - дополнительные `mode-compact/mode-full` toggles в `applyMode()`;
  - dispatch события `ac:view-mode-change`.
- Удалено из `src/scripts/main.js`:
  - `ensureFloatingHeroNav()`,
  - `ensureHeroMenuLabels()`,
  - `animateHeroMenuFlip()`,
  - вызов `ensureFloatingHeroNav()` из `renderFullModeExtension()`.
- Удалено из `src/styles/main.css`:
  - все `mode-full` правила, которые скрывали `.ac-site-nav` и оформляли перенос `#acLeftTabs` в header.

### Ограничения
- Остальные секции и логика (booking/compact/full content/reviews/team/video/photo/faq) не менялись.
- Выполнен `bash build.sh`, `dist/index.html` синхронизирован после отката.

### Ограничения
- Не менялись:
  - booking logic,
  - compact mode,
  - hero business logic,
  - data sources.

---

## Task 8

### Задача
Точечная доработка full mode: уменьшить вертикальные отступы между секциями, доработать contact card, исправить подгрузку видео, добавить стрелки в `Отзывы/Команда`, сделать FAQ с вкладками, сохранить совместимость с compact/hero/booking.

### Статус
Выполнено.

### Что сделано
- Vertical spacing:
  - в full mode уменьшены отступы секций: `padding-top/padding-bottom` с 60 до 20;
  - уменьшен отступ `section head` до более плотного (`margin-bottom: 10px`).
- Contact card:
  - сохранён compact closed-state по умолчанию;
  - подтверждён рабочий toggle по стрелке (открытие/закрытие);
  - набор каналов приведён к требуемому:
    - WhatsApp
    - Telegram
    - Max
    - Позвонить
- Видео:
  - усилен fallback в `renderFullModeVideoSection()`:
    - если нет Rutube items, берутся `window.__acMediaMap.videos`,
    - если и там пусто, читаются `video`-элементы из `ac-build-media-manifest`;
  - сохранена текущая lightbox-логика открытия.
- Отзывы и Команда:
  - добавлены стрелки влево/вправо;
  - реализовано аккуратное слайдер-поведение в full mode (без изменения data sources).
- FAQ:
  - добавлены вкладки-фильтры (chip-style) над FAQ;
  - FAQ-элементы группируются по категориям (медицина/безопасность/питание/бассейн/проживание/организация/что взять/другое);
  - при переключении вкладки показывается только релевантный блок.
- Удаление служебных текстов:
  - убраны технические пояснения/подписи из full-mode секций.
- Build:
  - выполнен `bash build.sh`, `dist/index.html` синхронизирован.

### Ограничения
- Не менялись:
  - booking logic,
  - compact mode,
  - hero business logic,
  - data sources.

---

## Task 9

### Задача
Точечная доработка full mode секций `Отзывы` и `Команда`: вернуть корректный слайдер с 4 карточками в видимой области на desktop, убрать пустую область справа, сохранить текущие data sources и стили карточек.

### Статус
Выполнено.

### Что сделано
- `renderFullModeReviewsSection()`:
  - использует полный текущий dataset `AC_REVIEWS_DATA` (без принудительного `slice(0, 4)`);
  - обновлена логика `perSlide`:
    - desktop: 4 карточки,
    - tablet: 2,
    - mobile: 1;
  - слайд строится с динамической `gridTemplateColumns = repeat(perSlide, ...)`, чтобы не оставлять пустые колонки справа;
  - стрелки влево/вправо продолжают корректно листать слайды.
- `renderFullModeTeamSection()`:
  - убрано принудительное ограничение `cards.slice(0, 4)`;
  - аналогично обновлён `perSlide` (4/2/1);
  - применён динамический grid внутри слайда для устранения пустой правой области;
  - стрелки листают карточки корректно.
- Build:
  - выполнен `bash build.sh`, `dist/index.html` синхронизирован.

### Ограничения
- Не менялись:
  - compact mode,
  - booking/data source логика,
  - hero.

---

## Task 10

### Задача
Точечная доработка секции `Видео` в full mode: устранить отсутствие карточек, не ломая media source/manifest и существующую lightbox-логику.

### Статус
Выполнено.

### Откуда берутся видео
- Основной источник: `window.__acMediaMap.videos` (данные из media manifest).
- Fallback: чтение `video`-элементов напрямую из `#ac-build-media-manifest`.
- Резервный fallback: dev Rutube feed (только если данных из manifest/mediaMap нет).

### Что было сломано
- В full-mode рендере видео приоритетно использовался dev Rutube feed.
- Из-за этого реальный media-source/manifest мог не попадать в DOM full-mode секции как основной контент.

### Что исправлено
- В `renderFullModeVideoSection()` изменён приоритет источников:
  - сначала manifest/mediaMap,
  - затем fallback на Rutube.
- Добавлен принудительный ре-рендер full-mode видео после построения mediaMap (`renderGalleryFromMap(...)`), чтобы секция обновлялась сразу после загрузки данных.
- Сохранена существующая логика открытия:
  - для manifest-видео: `openMediaLightbox`,
  - для Rutube fallback: `openRutubeVideoLightbox`.
- Выполнен `bash build.sh`, `dist/index.html` синхронизирован.

### Ограничения
- Не менялись:
  - compact mode,
  - data sources,
  - hero и booking logic.

---

## Task 11

### Задача
Точечная доработка `Фото лагеря` в full mode: заменить обычную grid-сетку на горизонтальную карусель в один ряд, сохранить фильтры и существующий lightbox.

### Статус
Выполнено.

### Что сделано
- В `renderFullModePhotosSection()`:
  - заменён full-mode grid-рендер на карусельную структуру с `viewport + track + arrows`;
  - добавлены стрелки влево/вправо в стиле остальных каруселей (`ac-full-cards-slider__arrow`);
  - реализован рендер слайдов по `perSlide`:
    - desktop: 4 карточки,
    - tablet: 2,
    - mobile: 1;
  - фото остаются кликабельными и открываются через существующий `openMediaLightbox(...)`;
  - фильтры `Все / Еда / Спорт / Бассейн / Учёба` сохранены и при переключении корректно пересобирают карусель (без возврата к grid).
- В CSS (`src/styles/main.css`):
  - для `#acFullPhotos .ac-full-photo-grid` включён горизонтальный track (`display:flex`);
  - добавлен стиль `#acFullPhotos .ac-full-photo-slide` как единичного слайда шириной `100%` в один ряд.
- Build:
  - выполнен `bash build.sh`, `dist/index.html` синхронизирован.

### Ограничения
- Не менялись:
  - compact mode,
  - existing lightbox logic,
  - data sources.

---

## Task 12

### Задача
Точечная доработка hero/full mode UI: компактный `contact card` с раскрывающимся списком, выравнивание соцсетей в age block вправо, ужесточение FAQ-фильтрации с дефолтной вкладкой `Медицина`.

### Статус
Выполнено.

### Что сделано
- Contact card (`Связаться с нами`):
  - уменьшена ширина карточки примерно в 2 раза (`280 -> 150`);
  - сохранено положение в правом hero-блоке;
  - раскрытие по стрелке работает, список оформлен как dropdown под карточкой;
  - в списке каналы:
    - Телефон
    - Telegram
    - WhatsApp
    - Max
- Age socials:
  - блок соцсетей выровнен по правому краю age-блока (`justify-content: flex-end`).
- FAQ:
  - скрыты служебные group-title элементы внутри full-mode FAQ;
  - вкладки продолжают фильтровать DOM;
  - по умолчанию выбирается `Медицина` (если раздел присутствует), и показываются только её вопросы.
- Build:
  - выполнен `bash build.sh`, `dist/index.html` синхронизирован.

### Ограничения
- Не менялись:
  - booking logic,
  - compact mode,
  - hero/данные вне указанного UI-пасса.

---

## Task 14

### Задача
Точечная доработка full mode navigation и выравнивание общего фона страницы без изменения hero/grid/booking и уже реализованных секций A/B/C/D.

### Статус
Выполнено.

### Что сделано
- Full mode navigation:
  - в `index.html` добавлена отдельная зона между `header` и `hero`:
    - `#acFullNavZone`,
    - `#acFullNavMenuSlot`;
  - в `applyMode()` возвращены служебные mode-классы и событие:
    - `body.mode-compact`,
    - `body.mode-full`,
    - `ac:view-mode-change`.
- Перенос hero-меню на одном DOM-элементе:
  - в `src/scripts/main.js` добавлены:
    - `ensureFloatingHeroNav()` — перенос `#acLeftTabs` между hero и `#acFullNavMenuSlot`,
    - `animateHeroMenuFlip()` — сдержанная FLIP-анимация (плавный перелёт + лёгкий overshoot),
    - `ensureHeroMenuLabels()` — показ подписей вкладок в full mode;
  - в `renderFullModeExtension()` подключён вызов `ensureFloatingHeroNav()`.
- Визуальный слой навигации и фон:
  - в `src/styles/main.css` добавлены стили для отдельной зоны `.ac-full-nav-zone` и floating-режима `#acLeftTabs.ac-left-tabs--floating-mode`;
  - в full mode скрывается только верхнее `.ac-site-nav` (DOM не удаляется);
  - выровнен фон страницы до единого светло-серого оттенка (`#f0f0f5`) для `body/.ac-site-main/.ac-site-section`.

### Ограничения
- Не менялись:
  - reviews/team/video/photo/faq/contact/booking logic,
  - hero grid и содержимое hero,
  - compact mode композиция.

### Build
- Выполнен `bash build.sh`, `dist/index.html` синхронизирован.

---

## Task 19

### Задача
Сделать упрощённую и стабильную логику navigation для режимов `Кратко / Подробно` без FLIP/перелётов/DOM-переносов.

### Статус
Выполнено.

### Какая логика FLIP/floating была отключена
- В `src/scripts/main.js` `ensureFloatingHeroNav()` переведена в no-op:
  - удалено перемещение меню между контейнерами;
  - удалены наблюдатели/route-обработчики FLIP-потока;
  - снимается только legacy-класс `ac-left-tabs--floating-mode`.

### Как теперь показывается/скрывается header nav
- Через CSS и классы `body`:
  - `body.mode-compact .ac-site-nav { display: none !important; }`
  - `body.mode-full .ac-site-nav { display: block !important; }`

### Как теперь показывается/скрывается hero menu
- Через CSS и классы `body`:
  - `body.mode-compact #acLeftTabs { display: flex !important; }`
  - `body.mode-full #acLeftTabs { display: none !important; }`

### Дополнительно
- `full-nav-zone` отключён от текущего UI-потока:
  - `body.mode-full .ac-full-nav-zone { display: none !important; }`
- `switch` остаётся на постоянном месте, не переносится и не участвует в nav relocation.

### Build
- Выполнен `bash build.sh`, `dist/index.html` синхронизирован.

---

## Task 15

### Задача
Точечно исправить конфликт full/compact navigation: оставить один master-поток режима, зафиксировать `switch` в постоянном месте и перемещать только `#acLeftTabs`.

### Статус
Выполнено.

### Что сделано
- `src/scripts/main.js`:
  - в `ensureHeroFullModePolish()` удалён перенос `#acViewSwitchWrap` в `#acLeftTabs`;
  - в `ensureFloatingHeroNav()` удалены любые перемещения `switch` между слотами;
  - теперь между контейнерами перемещается только `#acLeftTabs` (hero slot ↔ full-nav-zone), FLIP-анимация сохранена.
- `index.html`:
  - отключены конфликтующие inline-переносы `switch`:
    - `moveViewSwitch()` больше не делает `appendChild`, только снимает legacy-класс;
    - `moveSwitchExact()` больше не делает `appendChild`, только снимает legacy-класс.
- В итоге `switch` живёт в постоянном контейнере (его исходная разметка в topbar hero) и больше не участвует в relocation-логике.

### Какая дублирующая логика отключена
- Отключены inline-паттерны перемещения `switch` из `index.html` (V4/V5 patch-скрипты).
- В основном JS удалено перемещение `switch` в `#acFullNavSwitchSlot` и обратно в меню.

### Build
- Выполнен `bash build.sh`, `dist/index.html` синхронизирован.

---

## Task 16

### Задача
Исправить визуальное раскрытие dropdown `Связаться с нами`: контакты есть в DOM, но body обрезался и не раскрывался визуально.

### Статус
Выполнено.

### Что мешало раскрытию (CSS)
- В закрытом состоянии dropdown-body не имел явного контролируемого `max-height`, а в окружении с конфликтующими патч-стилями это приводило к визуальному обрезанию.
- При открытии не было жёсткого гарантированного правила для полной видимости через `max-height`, из-за чего блок мог оставаться «сжатым».

### Что изменено
- В `src/styles/main.css` для `.ac-hero-contact-card__body`:
  - добавлен `max-height: 0` в закрытом состоянии;
  - добавлен transition по `max-height` (плюс существующие `opacity/transform/visibility`).
- Для `.ac-hero-contact-card.is-open .ac-hero-contact-card__body`:
  - добавлен `max-height: 260px`;
  - сохранены `opacity:1`, `visibility:visible`, `pointer-events:auto`.
- Добавлен safeguard:
  - `.ac-hero-contact-card.is-open { overflow: visible !important; }`
  - чтобы открытый dropdown не резался конфликтующими правилами.

### Как теперь работает `.is-open`
- Кнопка toggle в JS (без изменений бизнес-логики) переключает `.is-open` и `aria-expanded`.
- В закрытом состоянии body скрыт (`max-height:0`, `opacity:0`, `pointer-events:none`).
- В открытом состоянии body раскрывается полностью (`max-height:260px`) и ссылки кликабельны.
- Клик вне карточки закрывает dropdown, клики внутри по ссылкам не блокируются.

### Build
- Выполнен `bash build.sh`, `dist/index.html` синхронизирован.

---

## Task 17

### Задача
Финальный polishing для full/compact navigation и contact dropdown: стабилизировать одну master-логику режима, оставить `switch` в постоянном месте, опустить full-mode menu в отдельной верхней зоне и дофиксить визуальное раскрытие dropdown.

### Статус
Выполнено.

### Что сделано
- Режим и switch:
  - подтверждена единая master-логика режима: переключение идёт через `applyMode()` (inline) + реакцию `src/scripts/main.js` (`syncFromBody()`/`MutationObserver`);
  - `switch` остаётся в постоянном контейнере (`.ac-card__topbar`) и не переносится по DOM;
  - перемещается только `#acLeftTabs` (hero slot ↔ `#acFullNavMenuSlot`) с FLIP-анимацией.
- Full mode menu position:
  - в `src/styles/main.css` увеличены вертикальные отступы зоны:
    - `body.mode-full .ac-full-nav-zone { padding: 18px 0; }`
    - на `<=980px`: `padding: 16px 0;`
  - для floating-меню добавлен safeguard:
    - `body.mode-full #acLeftTabs.ac-left-tabs--floating-mode { transform: none !important; }`
  - итоговая позиция меню теперь задаётся контейнером `.ac-full-nav-zone` (а не остаточным transform).
- Contact dropdown:
  - `ac-hero-contact-card__body` переведён на стабильное раскрытие под head-блоком:
    - `position: static`, `margin: 0 10px 10px`, `max-height: 0` (closed),
    - `max-height: 260px` в `.is-open`,
    - сохранены `opacity/visibility/pointer-events` переключения.
  - ссылки остаются кликабельными; outside click/aria-toggle логика в JS сохранена.

### Что именно было отключено/убрано ранее и остаётся в силе
- Убраны паттерны перемещения `switch`:
  - `tabs.appendChild(sw)`
  - `menu.appendChild(sw)`
  - `right.appendChild(sw)`
  - и аналогичные `insertBefore/prepend` для `switch`.

### Build
- Выполнен `bash build.sh`, `dist/index.html` синхронизирован.

---

## Task 18

### Задача
Точечная полировка full-mode секций `Команда / Видео / фон страницы` без изменения hero/nav/booking и уже стабилизированных блоков.

### Статус
Выполнено.

### Что сделано
- Команда (портреты):
  - причина искажения: в full-mode карточке изображение растягивалось на всю ширину карточки (`width: 100%`) и выглядело вытянутым;
  - исправлено в `.ac-full-cards-grid--team .ac-team-slider__img`:
    - `width: clamp(86px, 7vw, 112px)`
    - `aspect-ratio: 1 / 1`
    - `border-radius: 50%`
    - центрирование через `margin-left/right: auto`.
- Видео (источник данных):
  - в `renderFullModeVideoSection()` добавлен приоритет Rutube-источника (того же, что используется в эталонном видео-блоке);
  - fallback-видео из `media manifest` очищается от шаблонных `video.tilda.cc/tpl_1035-*` через `sanitizeMediaVideos(...)`;
  - итог: в full-mode больше не подмешиваются шаблонные Tilda-видео.
- Видео (стрелки):
  - секция `#video` переведена на карточный slider-контейнер с кнопками:
    - `#acFullVideoPrev`
    - `#acFullVideoNext`
  - стрелки всегда присутствуют визуально; при недостатке контента получают `disabled`.
- Фон:
  - выровнен фон вокруг секций `#video`, `#reviews`, `#team` под общий светло-серый фон страницы:
    - `body.ac-page #video, #reviews, #team { background-color: #f0f0f5; }`.

### Откуда теперь берутся видео
- Основной источник: `AC_DEV_RUTUBE_VIDEOS` (через валидные Rutube URL и текущую lightbox-логику).
- Fallback (если Rutube недоступен): `window.__acMediaMap.videos` / manifest, но без шаблонных Tilda-заглушек.

### Build
- Выполнен `bash build.sh`, `dist/index.html` синхронизирован.
