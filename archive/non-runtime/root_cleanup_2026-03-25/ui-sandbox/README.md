# Temporary prototype export. Not for production use.

Этот каталог содержит изолированные sandbox-выгрузки только для:
- UI/UX audit
- redesign exploration
- visual experiments
- flow analysis

## Ограничения
- НЕ деплоить в production
- НЕ сливать в main/master/production
- НЕ использовать как source of truth
- НЕ перестраивать прод-архитектуру на основе этого экспорта

Все файлы внутри `ui-sandbox/` являются временными и утилизируемыми.

## Новые sandbox-копии
- `order-flow-copy/` — изолированная страница флоу выбора смены/фиксации цены/бронирования.
- `current-design-flow/` — та же логика, но в визуальном стиле текущего сайта (`ac-*`).
