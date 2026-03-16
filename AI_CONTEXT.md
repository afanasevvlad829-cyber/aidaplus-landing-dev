# AidaPlus Landing — AI Context

## Goal
Одностраничный лендинг для AidaCamp / AidaPlus.
В разработке проект модульный.
В проде требуется один итоговый HTML-файл для Tilda.

## Dev root
/var/www/aidaplus-dev

## Baseline
Исходный файл: index-aidacamp-final-v8.html

## Architecture
src/partials/ — HTML-блоки  
src/styles/ — CSS  
src/js/modules/ — JS-модули  
build/ — сборка  
dist/ — финальный HTML  

## Business rules
- Цена в карточках смен НЕ показывается по умолчанию
- Цена показывается только после клика на смену
- При выборе другой смены показывается только её цена
- Возраст можно фиксировать и потом менять

## Popup logic
- popup AI: через 12 секунд
- popup return: после просмотра смен
- popup urgency: через 40 секунд

## Media
Фото берутся из https://aidacamp.ru/media

Категории alt:
all = эмоции + всё  
sport + pool = спорт  
study = учёба  
food = еда  

Видео пока отключены.

## Known issues
- Кривой логотип
- Галерея пока не подгружается
- Попапы появляются не всегда предсказуемо
