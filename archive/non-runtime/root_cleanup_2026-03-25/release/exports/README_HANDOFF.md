# Content Handoff

## Files

- `content-handoff-2026-03-22.json`
- `team-photo-mapping-2026-03-22.csv`

## What is inside

- `faq`: FAQ groups with questions/answers and icon path.
- `photos`: gallery items (`cat`, `src`, `alt`).
- `teamPhotoMapping.items`: team members with:
  - `teamId` - stable technical id (`team_01` ...)
  - `bindKey` - normalized key for matching
  - `fio` - exact full name
  - `avatarUrl` - final photo URL
  - `role`, `bio`
- `links`: map/reviews/book URLs.

## Binding rules (recommended)

1. First try match by `bindKey`.
2. If no `bindKey` in target system, match by exact `fio`.
3. If duplicates appear, use `teamId` as final fallback.
