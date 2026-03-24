# Step 2E — targeted structural CSS follow-up

## 1. Executive summary
Step 2E выполнен в треке CSS+baseline без расширения scope: удалён структурный legacy CSS-шум (неиспользуемые селекторы), baseline не переснимался, визуальные регрессии не выявлены.

## 2. Что сделано (structural cleanup)
Точечная чистка только non-hot-zone legacy селекторов:
- удалён неиспользуемый контейнер `.mode-wrap`
- удалён неиспользуемый блок legacy compact-panel:
  - `.compact-panel-top`
  - `.compact-panel-top h3`
  - `.compact-panel-top p`
  - `.compact-panel-close`
  - `.compact-panel-tabs`
  - `.compact-panel-tab`
  - `.compact-panel-tab.active`
  - `.compact-panel-section.hidden`

Сделано синхронно в:
- `src/styles/main.css`
- inline CSS в `index.html`

## 3. Что отложено (deferred)
Не трогали protected hot-zones без явной необходимости:
- hero
- booking-card
- seam
- compact modals (runtime-behavior)
- mobile menu
- video
- team
- contacts/socials

## 4. Baseline-aware comparison
Baseline остаётся каноническим reference, не обновлялся.
Сравнивалась только затронутая зона (верх hero / debug+brand area) на отсутствие визуальной деградации:
- `before-after/desktop-hero-top-before.png`
- `before-after/desktop-hero-top-after.png`

Вывод: регрессий не обнаружено.

## 5. Validation
### Stylelint
- `validation/stylelint-before-after.csv`
- before: 0
- after: 0

### CSSTree
- `validation/csstree-findings.csv`
- warnings: 0

### Project Wallace
- `validation/project-wallace-before-after.csv`
- rules/selectors/important/media: без изменений
- `stylesheetSizeBytes`: уменьшился (удалён legacy CSS)

### PurgeCSS estimate
- `validation/purgecss-estimate.csv`
- estimate-only, без удаления из source

### Playwright smoke
- `validation/playwright-summary.json`
- desktop full / desktop compact / mobile full / mobile compact: pass
- errors: 0

## 6. Scores (updated)
- CSS score: **8.3 -> 8.4**
- Project score: **8.4 -> 8.5**

## 7. Baseline note
Changed zones проверены относительно baseline; baseline pack не переснимался и остаётся постоянным эталоном.
