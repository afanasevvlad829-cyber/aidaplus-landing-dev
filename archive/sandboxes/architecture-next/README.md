# architecture-next

Параллельный контур разработки: модульная архитектура с финальной сборкой в один файл.

## Зачем это нужно

- Разрабатывать проще: код разбит по областям (`core`, `features`, `ui`, `styles`).
- Деплой остается прежним: на выходе один `dist/index.single.html`.
- Основной проект не затрагивается, пока мы не будем готовы мигрировать.

## Структура

- `src/core` — состояние, события, эффекты, bootstrap.
- `src/features/*` — бизнес-фичи (смены, медиа, бронь).
- `src/ui` — оболочка интерфейса и рендер.
- `src/styles` — дизайн-токены и базовые стили.
- `src/index.template.html` — шаблон single-file.
- `scripts/build-single.mjs` — сборка в один HTML.

## Запуск сборки

```bash
cd architecture-next
npm run build:single
```

Результат:

- `architecture-next/dist/index.html` — основной файл (полный контент текущего сайта).
- `architecture-next/dist/index.single.html` — то же, для явного single-file артефакта.
- `architecture-next/dist/index.lab.html` — модульная лаборатория архитектуры.

## Принцип миграции

1. Переносим одну фичу за раз в `src/features/*`.
2. Подключаем ее через `src/core/bootstrap.js`.
3. Проверяем поведение локально.
4. Сборка всегда генерирует один файл для релиза.
