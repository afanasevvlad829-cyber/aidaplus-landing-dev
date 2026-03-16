# AidaPlus Landing — AI Context

## Goal
Одностраничный лендинг AidaCamp/AidaPlus с модульной разработкой и single-file результатом для деплоя.

## Project root
`/var/www/aidaplus-dev`

## Current source of truth
- Основная исполняемая страница: `index.html`
- Исторический baseline (не удалять): `index-aidacamp-final-v8.html`
- Модульные патчи:
  - `src/styles/main.css`
  - `src/scripts/main.js`

## Build and deploy
- Сборка: `build.sh` -> `dist/index.html`
- Деплой: `deploy.sh` (build -> copy в root `index.html` -> reload nginx)
- В `index.html` используются build markers для инъекции CSS/JS.

## Structure (actual)
- `src/partials/` - вынесенные HTML-секции из монолита (partialization artifacts)
- `src/components/` - секционные контракты/заглушки компонентов
- `src/styles/` - модульные стили
- `src/scripts/` - модульная JS-логика
- `tests/` - сервисные проверки (smoke/media)
- `dist/` - итоговый артефакт сборки

## Active business/UX rules
- Цена смены не видна по умолчанию.
- После выбора смены цена показывается только у выбранной карточки.
- Календарь открывается по клику на компактную иконку в карточке смены.
- Возраст сохраняется между визитами (`localStorage`).
- Кнопка «Выбрать возраст заново» сбрасывает возраст и возвращает к шагу выбора.
- До выбора возраста взаимодействие с остальными элементами страницы блокируется.

## Media model
- Источник: `https://aidacamp.ru/media`
- Приоритет: build-time manifest, fallback: runtime parsing.
- Фото раскладываются по вкладкам:
  - `all`, `food`, `sport`, `pool`, `study`
- Видео рендерятся в отдельной секции.
- Клик по фото/видео открывает lightbox с навигацией.
- `hero`-метки используются для ротации фоновых изображений.

## Runtime notes
- Проект содержит legacy inline скрипты в `index.html`.
- `src/scripts/main.js` работает как patch layer и повторно применяет критичную логику после legacy-инициализаций.
- Для стабильности используются защитные механизмы (debounce/guards) вокруг динамических обновлений.
