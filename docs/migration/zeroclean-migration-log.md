# ZeroClean Migration Log

## Operation
- Date: 2026-04-06
- Source branch: `codex/modular-foundation-dev`
- ZeroClean baseline ref: `460e91bbff9298164726573d12a23b6bfcf49bc9`

## Stage 1 — Backup snapshot (completed)

### Git backup refs
- Backup branch: `backup/pre-zeroclean-reset-2026-04-06`
- Backup tag: `pre-zeroclean-reset-2026-04-06`
- Snapshot SHA: `460e91bbff9298164726573d12a23b6bfcf49bc9`

### Filesystem backup (full rollback)
- Repo-local backup proof file:
  - `archive/migration-backups/pre-zeroclean-reset-2026-04-06_162019.tar.gz.sha256`
  - SHA256: `9bc767a15d0605e9f24adcaa31abda1d7100813c11a42268b8bbd681acb0adc3`
- Full archive (external, full tree):
  - `/tmp/pre-zeroclean-reset-2026-04-06_162057.tar.gz`
  - SHA256: `9f48e6804bb496eee38c310d5e470c221ee66927a3f61dad29cc5eaa0dfca871`

### Restore commands
```bash
git switch backup/pre-zeroclean-reset-2026-04-06
git reset --hard 460e91bbff9298164726573d12a23b6bfcf49bc9
```

Optional full workspace restore from archive:
```bash
tar -xzf /tmp/pre-zeroclean-reset-2026-04-06_162057.tar.gz -C /Users/vladimirafanasev
```

## Stage 2 — ZeroClean baseline gate (completed)
- Verification method: build from clean exported tree at `460e91b` (outside dirty workspace).
- Command: `./build.sh`
- Result: `PASS` (`BASELINE_BUILD_EXIT=0`)

### Baseline quality notes
- Cleaner base traits confirmed:
  - monolith reduction trajectory (`zero-monolith` line)
  - extracted runtime feature flows
  - lock-gates present in baseline commits
- Known baseline gaps:
  - CDN sync reports missing legacy asset refs (non-blocking for build, risk for runtime content if referenced).
- Residual risks:
  - asset completeness in CDN mirror
  - legacy CSS branches still present and require package-level review before transfer.

## Stage 3 — Diff inventory (completed)
- Inventory source:
  - tracked delta: `git diff --name-only HEAD`
  - untracked delta: `git ls-files --others --exclude-standard`
- Total paths in migration backlog: `146`

See package map: `docs/migration/zeroclean-diff-packages.md`.

## Stage 4 — Migration execution policy (active)
- Enforced order: `A -> B -> C -> D`, `E` only after explicit sign-off.
- For each package:
  - apply package allowlist only
  - `./build.sh`
  - smoke checks
  - append report entry in this log
  - checkpoint tag `migrate/zeroclean-<PKG>-done-YYYYMMDD-HHMM`

## Hard rules
- No mass merge from old branch into `ZeroClean`.
- No generated/output files as source-of-truth (`dist/**`, `cdn/**`).
- No mixed governance + risky UI in same package.
- No legacy override-chain transfer without separate review.
- No unlogged hotfix patches.

## Next action
- Execute Package A (governance/policy/tooling) as first transfer unit with separate report block.

## Final readiness snapshot (2026-04-06, 20:37 MSK)

### Quality delta (stabilization checkpoint)
| Metric | 20260406-202545 | 20260406-203711 | Delta |
|---|---:|---:|---:|
| Stylelint total warnings | 3212 | 1309 | -1903 |
| `!important` | 823 | 419 | -404 |
| `id_refs` | 2412 | 696 | -1716 |
| hardcoded `hex` | 1006 | 879 | -127 |
| hardcoded `px` | 4229 | 3899 | -330 |
| Runtime page errors | 0 | 0 | 0 |
| CssSyntaxError | 0 | 0 | 0 |
| Madge cycles | 0 | 0 | 0 |
| jscpd duplicates | 0.43% (5 clones) | 0.58% (7 clones) | +0.15pp |

### Readiness decision
- ZeroClean remains **GO WITH CONDITIONS**.
- Runtime blockers are closed; remaining debt is cascade discipline and specificity management.
- Migration start is allowed in controlled order: **A -> B -> C**.
- Package D stays behind visual parity checklist; Package E stays explicit-review-only.

## Package report — A (governance/policy/tooling)
- Status: **validated (ready to commit as Package A)**
- Risk: **low**
- Validation timestamp: 2026-04-06 20:41 MSK
- Gate report: `reports/quality/zeroclean/gates/20260406-204109/quality-gate.md`

### Included changes (A allowlist)
- `build.sh`
- `tools/precommit-guard.sh`
- `tools/function-index.sh`
- `docs/project-artifact-policy.md`
- `docs/release-checklist.md`
- `docs/index/repo-change-index.md`
- `docs/project-map.md`
- `docs/quality/README.md`
- `docs/development-rules.md`
- `docs/style-audit-current-ui-2026-04-06.md`

### Validation
- `./build.sh` -> PASS
- `bash tools/quality-gate.sh` -> PASS
- Runtime smoke -> `pageErrors=0` (desktop+mobile)

### Intentionally excluded from Package A
- Any runtime/UI behavior files under `src/pages`, `src/styles`, `src/scripts` outside tooling/policy scope.
- Generated artifacts (`dist/**`, `cdn/**`) and binary assets.
- High-risk/legacy package groups (C/D/E).

### Follow-up
- Next package in order: **B (safe cleanup)** after Package A commit checkpoint.

## Package report — B (safe cleanup)
- Status: **validated (ready to commit as Package B)**
- Risk: **low-medium**
- Validation timestamp: 2026-04-06 20:43 MSK
- Gate report: `reports/quality/zeroclean/gates/20260406-204332/quality-gate.md`

### Included changes (B scope in this pass)
- Removed temporary local probe files:
  - `tmp-check-*.js`
  - `check-features.cjs`
- Removed local test output directory:
  - `test-results/`

### Validation
- `./build.sh` -> PASS
- `bash tools/quality-gate.sh` -> PASS
- Runtime smoke -> `pageErrors=0` (desktop+mobile)

### Intentionally excluded from Package B in this pass
- `archive/**` evidence/backup folders (kept untouched as rollback evidence).
- Runtime/UI source changes from technical/product packages (C/D/E).

### Follow-up
- Next package in order: **C (technical fixes)**.

## Package report — C (technical fixes)
- Status: **validated in workspace (ready for isolated review/commit)**
- Risk: **medium**
- Validation timestamp: 2026-04-06 20:44 MSK
- Gate report (current technical baseline): `reports/quality/zeroclean/gates/20260406-204332/quality-gate.md`

### Included technical scope (C allowlist)
- Runtime and wiring layer:
  - `src/scripts/main.js`
  - `src/scripts/features/action-dispatcher.js`
  - `src/scripts/features/events.js`
  - `src/scripts/features/global-ui-bindings.js`
  - `src/scripts/features/hero-v3-simple-flow.js`
  - `src/scripts/features/shift-options-flow.js`
  - `src/scripts/features/calendar-flow.js`
  - `src/scripts/features/hero-nav-flow.js`
  - `src/scripts/features/hero-simple-booking-flow.js`
  - `src/scripts/features/media-sections-flow.js`
  - `src/scripts/features/modal-media-flow.js`
  - `src/scripts/features/runtime-action-flow.js`
  - `src/scripts/features/video-meta-flow.js`

### Validation
- `./build.sh` -> PASS
- `bash tools/quality-gate.sh` -> PASS
- Runtime smoke -> `pageErrors=0` (desktop+mobile)

### Follow-up
- Package C is technically stable under gate; next step is isolated commit checkpoint for A/B/C and then D under visual checklist.
