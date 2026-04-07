# Workflow

## 1) Старт работы
```bash
git checkout codex/astro-clean-main
git pull --ff-only origin codex/astro-clean-main
git config core.hooksPath .githooks
```

## 2) Разработка
- Работать только в `src/**`, `docs/**`, `tools/**`.
- Коммиты делать маленькими и тематическими.
- После каждых `3-4` коммитов выполнять `git push`.

## 3) Обязательные проверки перед push
```bash
./tools/quality-check.sh
```

## 4) Push
```bash
git push
```

Если upstream ещё не создан:
```bash
git push -u origin <branch>
```

## 5) Политика веток
- `codex/astro-clean-main` — основной clean контур.
- `origin/Astro` — legacy reference only.
