# Checklist — Task 1

- [x] Проверены секции: `#ai`, `#location`, `#photos`, `#video`, `#reviews`, `#team`, `#faq`.
- [x] У каждой секции контент находится внутри центрирующего `inner-container`.
- [x] Для full-mode применён тот же container/layout pattern, что у базовых секций.
- [x] Ширина ограничена не только у `section head`, но и у `section body/content`.
- [x] Проверено, что контент не растягивается на всю ширину экрана.
- [x] Не изменялись:
  - booking logic
  - compact mode
  - hero business logic
  - data sources
- [x] Diff оставлен минимальным.

---

# Checklist — Task 2

- [x] Проверены секции: `#ai`, `#location`, `#photos`, `#video`, `#reviews`, `#team`.
- [x] Стиль карточек соответствует требуемому:
  - [x] `border-radius: 22px`
  - [x] `padding: 22px`
  - [x] `background: #fff`
  - [x] `border: 1px solid rgba(17,24,39,.04)`
  - [x] `box-shadow: 0 16px 40px rgba(15,23,42,.08)`
- [x] Grid обычных full-mode секций: 3 колонки, `gap: 18px`.
- [x] Grid media/reviews/team: 4 колонки, `gap: 14px`.
- [x] Не изменялись:
  - booking logic
  - compact mode
  - hero logic
  - data sources
- [x] Diff оставлен минимальным.

---

# Checklist — Task 3

- [x] Проверены full-mode секции `#photos` и `#video`.
- [x] `#photos` центрирована и использует container-ширину как у верхних секций.
- [x] Для фото есть toolbar фильтров:
  - [x] Все
  - [x] Еда
  - [x] Спорт
  - [x] Бассейн
  - [x] Учёба
- [x] Фильтры реализованы chip-стилем (`.media-chip`, `.media-chip.is-active`).
- [x] Фото остаются в отдельном media-grid, а не в потоковом списке.
- [x] `#video` оформлена как отдельный grid из 4 карточек (`repeat(4, minmax(0,1fr))`, `gap: 14px`).
- [x] Сохранена существующая логика открытия:
  - [x] фото: `openMediaLightbox`
  - [x] видео: `openRutubeVideoLightbox` / `openMediaLightbox`
- [x] Не изменялись:
  - booking logic
  - compact mode
  - hero business logic
  - data sources / media datasets
- [x] Diff оставлен минимальным.

---

# Checklist — Task 4

- [x] Проверены full-mode секции `#reviews` и `#team`.
- [x] `#reviews`:
  - [x] Используется существующий dataset `AC_REVIEWS_DATA`.
  - [x] В full-mode выводится ровно 4 карточки (`slice(0, 4)`).
  - [x] Карточки имеют аккуратный card-style (radius/shadow/padding/spacing) и не растягиваются в текстовые блоки.
- [x] `#team`:
  - [x] Используется существующий источник (`window.__acTeamCards`, fallback из текущих team cards).
  - [x] В full-mode выводится ровно 4 карточки (`slice(0, 4)`).
  - [x] Карточки отображаются как отдельные person cards в grid.
- [x] Hero polish:
  - [x] Compact/full toggle размещён в строке табов справа (`ac-view-switch--in-tabs`) и сделан компактным.
  - [x] Age block (`Выберите возраст` + `Возраст: ...`) собирается в одну строку на desktop.
  - [x] На mobile есть аккуратный перенос (`@media (max-width: 760px)` для `.ac-age__topline`).
  - [x] Age socials добавляются реальными SVG-иконками (VK/IG/TG/WA/FB/Messenger).
  - [x] Contact card есть в правой hero-card, слева сверху, со стеклянным стилем, закрыта по умолчанию и раскрывается по кнопке.
- [x] Не изменялись:
  - booking flow
  - compact mode
  - hero business logic
  - data sources
- [x] Diff оставлен минимальным.

---

# Checklist — Task 5

- [x] Hero verification:
  - [x] `Кратко / Подробно` switch на месте (`#acViewSwitchWrap`, `#acViewToggle`).
  - [x] age block/topline (`.ac-age__topline`) корректно оформлен.
  - [x] contact card (`#acHeroContactCard`) присутствует, closed state по умолчанию.
  - [x] socials (`.ac-age__socials`) присутствуют.
- [x] Layout verification:
  - [x] full-mode секции центрированы через container width.
  - [x] карточки имеют radius/shadow/padding.
  - [x] grid-раскладки для секций присутствуют и адаптивны.
- [x] Media verification:
  - [x] photos grid есть (`.ac-full-photo-grid`).
  - [x] photo filters есть (`.media-chip`).
  - [x] video grid есть (`.ac-full-video-grid`).
  - [x] lightbox/open behavior сохранён (`openMediaLightbox`, `openRutubeVideoLightbox`).
- [x] Content verification:
  - [x] reviews = 4 карточки (`AC_REVIEWS_DATA.slice(0, 4)`).
  - [x] team = 4 карточки (`cards.slice(0, 4)`).
  - [x] FAQ full-mode секция отображается (`#acFullFaq`).
- [x] Menu verification:
  - [x] anchors в меню присутствуют.
  - [x] соответствующие `id` секций присутствуют.
- [x] Debug-clean verification:
  - [x] `block-id` не найден.
  - [x] `data-block` не найден.
  - [x] debug labels/annotations не найдены.
- [x] Build:
  - [x] Выполнен `bash build.sh`.
  - [x] `dist/index.html` обновлён.
- [ ] Deploy:
  - [ ] `./deploy.sh` не выполнен на этом окружении (нет пути `/var/www/aidaplus-dev`).

---

# Checklist — Task 6

- [x] Images:
  - [x] Для runtime-изображений добавлены `width` и `height` (logo/reviews/team/photos/video poster/book cover).
  - [x] Изображения вне hero получают `loading="lazy"`.
  - [x] Hero-изображения получают eager-загрузку.
  - [x] Добавлен дополнительный runtime-pass `applyImagePerformanceHints(...)` для стабилизации late-rendered контента.
- [x] Media grid:
  - [x] Видео-карточки получили фиксированный `aspect-ratio: 9 / 16`.
  - [x] Высота видео стабилизирована (`height: 100%`) без post-load прыжков.
- [x] Video:
  - [x] iframe не рендерится в карточках заранее.
  - [x] iframe создаётся только в lightbox при клике.
- [x] Fonts:
  - [x] `display=swap` уже используется в webfont import.
- [x] Buttons/hover:
  - [x] В рамках правок не добавлено hover-изменений, меняющих layout.
- [x] Hero/Layout stability:
  - [x] Внесённые правки направлены на снижение CLS без изменения бизнес-логики.
- [x] Ограничения соблюдены:
  - [x] booking logic не изменён.
  - [x] compact mode не изменён.
  - [x] hero business logic не изменён.
  - [x] data sources не изменены.
- [x] Diff оставлен минимальным.
- [ ] Ручная browser-проверка (desktop/mobile) в рамках task-6 не проводилась.
- [ ] Локальная проверка синтаксиса `node --check` не выполнена (`node` не установлен в окружении).

---

# Checklist — Task 7

- [x] Видео в `#video` full mode рендерится из существующих источников:
  - [x] primary: Rutube feed (при валидных URL),
  - [x] fallback: `window.__acMediaMap.videos`.
- [x] Для видео сохранена текущая логика открытия через lightbox.
- [x] Удалены служебные/технические подписи в full mode секциях:
  - [x] `#program`
  - [x] `#format`
  - [x] `#ai`
  - [x] `#location`
  - [x] `#photos`
  - [x] `#video`
  - [x] `#reviews`
  - [x] `#team`
  - [x] `#faq`
- [x] Единый container pattern применён ко всем указанным full mode секциям.
- [x] Фото-фильтры в `#photos` работают без перезагрузки:
  - [x] устранён конфликт обработчиков (full mode использует `.ac-full-photo-cat`);
  - [x] active-state переключается.
- [x] Фото в full mode по клику открываются в существующем fullscreen/lightbox с навигацией.
- [x] Compact mode не изменён.
- [x] Hero не изменён.
- [x] Booking logic не изменён.
- [x] Data sources не изменены.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 8

- [x] Уменьшены вертикальные отступы между full-mode секциями (более плотный layout).
- [x] Contact card:
  - [x] стрелка/триггер раскрытия работает;
  - [x] в раскрытии есть каналы:
    - [x] WhatsApp
    - [x] Telegram
    - [x] Max
    - [x] Позвонить
  - [x] compact closed-state сохранён.
- [x] Видео:
  - [x] доработана подгрузка из существующих источников (Rutube / `__acMediaMap.videos` / manifest fallback);
  - [x] сохранена текущая video/lightbox logic.
- [x] Отзывы:
  - [x] добавлены стрелки влево/вправо;
  - [x] карточки листаются как компактный слайдер.
- [x] Команда:
  - [x] добавлены стрелки влево/вправо;
  - [x] карточки листаются как компактный слайдер.
- [x] FAQ:
  - [x] добавлены вкладки (chip-style) над списком;
  - [x] active state вкладки переключается;
  - [x] показывается только выбранный раздел.
- [x] Удалены служебные технические подписи в full mode.
- [x] Compact mode не изменён.
- [x] Hero не изменён.
- [x] Booking logic не изменён.
- [x] Data sources не изменены.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 9

- [x] `Отзывы` в full mode:
  - [x] в desktop-viewport показывается 4 карточки;
  - [x] пустая область справа устранена;
  - [x] стрелки влево/вправо листают слайды;
  - [x] используется текущий dataset (без фиксации только 4 карточками).
- [x] `Команда` в full mode:
  - [x] в desktop-viewport показывается 4 карточки;
  - [x] пустая область справа устранена;
  - [x] стрелки влево/вправо листают слайды;
  - [x] используется текущий источник данных команды.
- [x] Логика viewport/track/slide:
  - [x] убран конфликт фиксированной 4-колоночной сетки при 2 карточках в слайде;
  - [x] применена динамическая сетка `repeat(perSlide, ...)`.
- [x] Адаптивность не сломана (desktop/tablet/mobile: 4/2/1).
- [x] Compact mode не изменён.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 10

- [x] Найден текущий источник видео:
  - [x] `window.__acMediaMap.videos` (из media manifest),
  - [x] fallback чтение `#ac-build-media-manifest`.
- [x] Исправлен рендер full mode `#video`:
  - [x] видео-карточки реально выводятся в DOM,
  - [x] без служебных заглушек.
- [x] Сохранена существующая lightbox-логика:
  - [x] `openMediaLightbox` для manifest/mediaMap-видео,
  - [x] `openRutubeVideoLightbox` для fallback Rutube.
- [x] Исправлен приоритет источников (manifest/media source выше dev Rutube fallback).
- [x] Добавлен ре-рендер секции `Видео` после загрузки mediaMap.
- [x] Compact mode не изменён.
- [x] Data source/manifest не изменён.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 11

- [x] Full mode `Фото лагеря` переведён с grid на горизонтальную карусель.
- [x] Фото идут в один ряд (без 2/3 ряда на desktop).
- [x] Добавлены рабочие стрелки влево/вправо.
- [x] Overflow скрыт через viewport/track структуру.
- [x] Клик по фото открывает существующий fullscreen/lightbox (`openMediaLightbox`).
- [x] Фильтры сохранены:
  - [x] Все
  - [x] Еда
  - [x] Спорт
  - [x] Бассейн
  - [x] Учёба
- [x] После переключения фильтра карусель корректно обновляется.
- [x] Compact mode не изменён.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 12

- [x] Contact card:
  - [x] ширина уменьшена примерно в 2 раза.
  - [x] остаётся в правом hero-блоке.
  - [x] стрелка раскрывает/сворачивает список.
  - [x] список содержит:
    - [x] Телефон
    - [x] Telegram
    - [x] WhatsApp
    - [x] Max
  - [x] раскрытие оформлено как аккуратный dropdown под карточкой.
- [x] Соцсети в age block прижаты вправо.
- [x] FAQ:
  - [x] вкладки сохранены.
  - [x] дефолтная вкладка — Медицина (если присутствует).
  - [x] при активной Медицине показываются только соответствующие вопросы.
  - [x] заголовки других разделов скрываются до переключения вкладки.
- [x] Compact mode не изменён.
- [x] Booking logic не изменён.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 13

- [x] Выполнен откат Task 13 по запросу пользователя.
- [x] Удалён `#acHeaderHeroMenuSlot` из `index.html`.
- [x] Удалены `mode-compact/mode-full` классы и `ac:view-mode-change` dispatch из `applyMode()`.
- [x] Удалены функции FLIP/переноса меню из `src/scripts/main.js`.
- [x] Удалены `mode-full` nav-стили из `src/styles/main.css`.
- [x] Остальные секции и логика не затронуты.
- [x] `dist/index.html` синхронизирован через `bash build.sh`.

---

# Checklist — Task 14

- [x] Добавлена отдельная full-mode nav-зона между `header` и `hero`:
  - [x] `#acFullNavZone`
  - [x] `#acFullNavMenuSlot`
- [x] В `applyMode()` восстановлены:
  - [x] `mode-compact/mode-full` классы на `body`
  - [x] событие `ac:view-mode-change`
- [x] Реализован перенос одного DOM-элемента `#acLeftTabs` (без клонирования):
  - [x] в full mode — в верхнюю nav-зону
  - [x] в compact mode — обратно в hero
- [x] Реализована сдержанная FLIP-анимация переноса (premium-плавность без shuffle).
- [x] В full mode:
  - [x] верхнее `.ac-site-nav` скрывается через CSS
  - [x] hero-menu отображается в формате иконка + подпись
- [x] Выравнен общий фон страницы:
  - [x] верх/низ в едином светло-сером тоне без резкого перехода.
- [x] Не затронуты:
  - [x] reviews/team/video/photo/FAQ/contact/booking logic
  - [x] hero grid/layout
  - [x] compact mode UX
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 15

- [x] Убрана дублирующая/конфликтующая логика перемещения `switch` из inline-скриптов `index.html`.
- [x] В `src/scripts/main.js` удалены перемещения `switch` между контейнерами:
  - [x] нет `appendChild`/`insertBefore` для `#acViewSwitchWrap`;
  - [x] `switch` не вставляется в `#acLeftTabs` и не переносится в `#acFullNavSwitchSlot`.
- [x] В relocation-логике перемещается только `#acLeftTabs`:
  - [x] compact mode: меню в hero;
  - [x] full mode: меню в `#acFullNavMenuSlot`.
- [x] FLIP-анимация переноса меню сохранена для `#acLeftTabs`.
- [x] `switch` остаётся в одном постоянном контейнере и не исчезает из-за relocation.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 16

- [x] Dropdown `Связаться с нами` раскрывается визуально полностью.
- [x] В закрытом состоянии body скрыт:
  - [x] `max-height: 0`
  - [x] `opacity: 0`
  - [x] `pointer-events: none`
- [x] В открытом состоянии (`.is-open`) body раскрыт:
  - [x] `max-height` увеличен до рабочего значения
  - [x] `opacity: 1`
  - [x] `visibility: visible`
  - [x] `pointer-events: auto`
- [x] Добавлен safeguard от обрезания в open state:
  - [x] `.ac-hero-contact-card.is-open { overflow: visible !important; }`
- [x] JS-логика toggle/close не ломалась:
  - [x] `.is-open` переключается
  - [x] `aria-expanded` обновляется
  - [x] клик вне карточки закрывает dropdown
  - [x] клики по ссылкам внутри не блокируются
- [x] Hero layout / menu / booking / секции не изменены.
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.

---

# Checklist — Task 17

- [x] Master-логика режима остаётся единой и предсказуемой:
  - [x] `ac-compact-mode` переключается через `applyMode`.
  - [x] `mode-compact/mode-full` синхронизируются стабильно.
  - [x] не зафиксировано новых конфликтующих переносов `switch`.
- [x] `switch` живёт в постоянном контейнере (`.ac-card__topbar`) и не переносится по DOM.
- [x] Перемещается только `#acLeftTabs`:
  - [x] compact -> внутри hero
  - [x] full -> `#acFullNavMenuSlot`
  - [x] без клонирования, один DOM-элемент
- [x] Для `switch` не используются `appendChild/insertBefore/prepend` паттерны.
- [x] Full-mode menu опущено ниже и визуально отделено:
  - [x] `body.mode-full .ac-full-nav-zone { padding: 18px 0; }`
  - [x] mobile/tablet: `padding: 16px 0`
  - [x] конечная позиция задаётся `.ac-full-nav-zone`.
  - [x] добавлен safeguard `transform: none !important` для floating menu, чтобы убрать залипание финальной transform-позиции.
- [x] Contact dropdown раскрывается полностью и не обрезается:
  - [x] body раскрывается через `max-height` + `opacity/visibility/pointer-events`.
  - [x] ссылки кликабельны.
  - [x] outside-click закрытие работает.
- [x] Не затронуты:
  - [x] reviews/team/video/photo carousel/FAQ
  - [x] contact links data/socials links data
  - [x] booking logic
  - [x] hero content/grid
- [x] Выполнен `bash build.sh`.
- [x] `dist/index.html` синхронизирован.
