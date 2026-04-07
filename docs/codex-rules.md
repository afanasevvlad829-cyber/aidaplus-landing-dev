# Codex Rules

## Основная ветка разработки
- Активная ветка для нового контура: `codex/astro-clean-main`.
- Ветка `origin/Astro` считается legacy/грязной, не использовать как базу для новых задач.

## Push-дисциплина (обязательно)
- Пушить каждые `3-4` локальных коммита.
- Если `ahead > 4`, push блокируется локальным hook.
- Для рабочих веток обязателен upstream (`git push -u origin <branch>`).

## Что запрещено
- Большие пачки коммитов без промежуточного push.
- Работа в legacy-ветках как в mainline.
- Смешивание clean и legacy изменений в одном коммите.

## Техническое принуждение
- Локально: `.githooks/pre-push`.
- CI: `.github/workflows/push-discipline.yml`.

## Инициализация hooks (локально, один раз)
```bash
git config core.hooksPath .githooks
```
