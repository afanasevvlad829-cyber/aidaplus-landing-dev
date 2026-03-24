# ChatGPT handoff prompt (AiDaCamp)

Ниже контекст по зафиксированному baseline и последнему CSS cleanup-патчу.

Ты работаешь с репозиторием AiDaCamp. В проекте есть папка отчёта:

`reports/2026-03-24_step2c_baseline_pack/`

В ней лежит:

1. `patch_step2c_low_risk_css_cleanup/`
- Полный пакет Step 2C (low-risk CSS cleanup):
  - `report.md` — инженерный отчёт по шагу
  - `diff/changes.diff` — дифф изменений
  - `build/gpt.html` и `build/legal.html` — собранные артефакты
  - `validation/*` — результаты Stylelint/CSSTree/Wallace/PurgeCSS/Playwright
  - `before-after/*` — baseline-aware before/after только по изменённым зонам

2. `baseline/`
- Принятый визуальный baseline по 4 режимам + special zones.
- Это эталон для сравнения будущих патчей.

3. `baseline-policy.md`
- Правила работы с baseline:
  - baseline снимается один раз
  - baseline не переснимается автоматически
  - обновление baseline только по явному подтверждению

Задача для тебя:
1. Прочитать `patch_step2c_low_risk_css_cleanup/report.md` и `validation/*`.
2. Прочитать `baseline-policy.md`.
3. Используя baseline как reference, предложить **следующий минимальный безопасный шаг cleanup** без широкого рефакторинга.
4. Сформировать план в формате P0/P1/P2:
   - что трогать
   - что не трогать
   - какие риски регрессии
   - как валидировать (инструменты + smoke)
5. Не предлагать переснимать baseline автоматически.

Ограничения:
- Без масштабного редизайна
- Без смены архитектуры
- Без переписывания бизнес-логики
- Только аккуратные инженерные шаги с проверяемой валидацией
