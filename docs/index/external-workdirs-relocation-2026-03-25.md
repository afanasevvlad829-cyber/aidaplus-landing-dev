# External Workdirs Relocation — 2026-03-25

Summary:
- Moved external sibling folders from `../` into:
  `archive/local_wip/2026-03-25/external-workdirs/`
- Goal: keep workspace root/parent clean, preserve recoverability, and index all moved snapshots.
- Tracking policy: local-only archive (excluded from git due size).

Machine index:
- `docs/index/external-workdirs-relocation-2026-03-25.csv`

Lookup:
```bash
sed -n '1,80p' docs/index/external-workdirs-relocation-2026-03-25.csv
ls -la archive/local_wip/2026-03-25/external-workdirs
```
