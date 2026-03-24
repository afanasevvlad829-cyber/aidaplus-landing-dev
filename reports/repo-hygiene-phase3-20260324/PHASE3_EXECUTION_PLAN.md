# AidaCamp Repo Hygiene — Phase 3 Conservative Execution Plan

Date: 2026-03-24
Base branch: `codex/manual-classification-phase2-20260324_113954`
Execution branch: `chatgpt/phase3-execution-plan-20260324`
Scope: no product code changes, no risky mass deletes, root `gpt.html` / `legal.html` remain manual-review items.

## 1. Decision summary

### Approve now
1. **Low-risk delete shortlist** — approve delete for all 8 `.tmp/*` scratch files.
2. **Baseline visuals shortlist** — approve promotion of all 10 selected screenshots as the curated baseline set.
3. **Final report shortlist / legacy audit report** — approve archive of `audit/old-site-2026-03-23/assets_export_v2/test_processing/test_processing_report.md` outside the active tree.

### Defer / manual keep
1. `release/patch_big_bundle_report/report.md` — keep for manual review before archive or retention.
2. Root `gpt.html` — manual review only.
3. Root `legal.html` — manual review only.

### Approve as archive candidates, not delete
1. Entire `phase2_archive_shortlist.csv` set — approve archive classification.
2. Do **not** mass-delete these from the repo tree in Phase 3.
3. Preferred action: move out of active tree to external archive storage or a cold-storage path outside normal development flow.

## 2. Exact matrix by shortlist

### 2.1 Baseline visuals shortlist
Decision: **approve** all 10.
Recommended action: move to a stable canonical baseline folder and commit only that curated set.
Recommended target:
- `artifacts/screens/final/2026-03-24/desktop-top-final.png`
- `artifacts/screens/final/2026-03-24/mobile-final.png`
- `artifacts/screens/final/2026-03-24/mobile-full-final.png`
- `artifacts/screens/final/2026-03-24/mobile-menu-final.png`
- `artifacts/screens/final/2026-03-24/mobile-toggle-final.png`
- `artifacts/screens/final/2026-03-24/mobile-contacts-final.png`
- `artifacts/screens/final/2026-03-24/video-final-review-mobile.png`
- `artifacts/screens/final/2026-03-24/compact-menu-final.png`
- `artifacts/screens/final/2026-03-24/compact-modal-final.png`
- `artifacts/screens/final/2026-03-24/compact-menu-final-review.png`
Rationale: the shortlist is already curated to the intended 5–10 baseline range and was selected specifically for future visual regression/reference.
Risk: medium, but acceptable because this is promotion/curation, not cleanup-by-deletion.

### 2.2 Final reports shortlist
- `audit/old-site-2026-03-23/assets_export_v2/test_processing/test_processing_report.md`
  - Decision: **approve**
  - Recommended action: `archive`
  - Rationale: legacy export snapshot, preserve outside active tree.
  - Risk: medium

- `release/patch_big_bundle_report/report.md`
  - Decision: **defer**
  - Recommended action: `manual keep`
  - Rationale: may still be operationally relevant.
  - Risk: medium

### 2.3 Archive shortlist
Decision: **approve archive classification** for the full shortlist.
Recommended action: archive outside active tree, not immediate deletion.
Buckets:
- top-level `audit/*.png` support captures
- `audit/old-site-2026-03-23/**` legacy export snapshot
- `.DS_Store` and binary support files within audit trees
Rationale: these are non-canonical support artifacts and historical exports; preserving them outside the active tree is safer than deleting them.
Risk: medium

### 2.4 Low-risk delete shortlist
Decision: **approve** all 8.
Recommended action: delete.
Files:
- `.tmp/cached_after_gitignore.txt`
- `.tmp/cached_before_gitignore.txt`
- `.tmp/gitignore_before.txt`
- `.tmp/noisy_removed_by_gitignore.txt`
- `.tmp/status_after_gitignore.txt`
- `.tmp/status_before_gitignore.txt`
- `.tmp/untracked_after_gitignore.txt`
- `.tmp/untracked_before_gitignore.txt`
Rationale: temporary local analysis scratch, reproducible, non-canonical.
Risk: low

## 3. Specific recommendation for root HTML

### `gpt.html`
Decision: **defer**
Recommended action: manual review only.
Preferred end-state: if `src/pages/gpt.html` exists and is the maintained source, root `gpt.html` should eventually be archived or deleted as a generated/manual working copy.

### `legal.html`
Decision: **defer**
Recommended action: manual review only.
Preferred end-state: if `src/pages/legal.html` is canonical, root `legal.html` should eventually be archived or deleted as a generated/manual working copy.

## 4. Phase 3 execution sequence
1. Create/keep a dedicated Phase 3 branch.
2. Promote the 10 approved baseline visuals into `artifacts/screens/final/2026-03-24/`.
3. Add a short README in that baseline folder describing why these 10 are retained.
4. Delete the 8 approved `.tmp/*` low-risk files.
5. Move the approved archive candidate groups to external archive storage or a non-active archive location, but do not mass-delete them in the same step.
6. Leave `release/patch_big_bundle_report/report.md`, `gpt.html`, and `legal.html` untouched pending owner decision.
7. Commit only the curated baseline visuals + README + any explicit Phase 3 plan docs. If Phase 3 only affects untracked/unversioned local files, no commit is needed for those cleanup parts.

## 5. Expected effect
- canonical baseline visuals become explicit and versionable;
- temporary `.tmp/*` noise can be removed safely;
- legacy audit/export artifacts remain recoverable but outside the active working set;
- ambiguous root HTML remains protected from accidental cleanup.

## 6. Owner decisions still needed
1. Should `release/patch_big_bundle_report/report.md` be retained in-repo for operational history, or archived outside the active tree?
2. Are root `gpt.html` and `legal.html` disposable generated copies, or do you still use them as manual working files?
