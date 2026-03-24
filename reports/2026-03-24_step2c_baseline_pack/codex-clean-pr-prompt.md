# Codex task — clean baseline-only commit / PR

## Context
A previous commit that updated the baseline handoff/policy also included unrelated staged rename changes.
We need to isolate the **baseline report pack** into a clean, reviewable commit/PR so the git history remains explicit and easy to reference.

This task is **not** a product/UI patch.
Do **not** change site behavior, styles, scripts, or build outputs.
Do **not** mix this with archive / rename / refactor work.

## Goal
Create a **clean separate commit/PR** that contains **only** the baseline report pack materials and nothing unrelated.

## Canonical scope for the clean commit
Keep only the following scope in the clean commit/PR:
- `reports/2026-03-24_step2c_baseline_pack/`
- if needed, the corresponding baseline policy file **only if it belongs to this pack and is required for the pack to be self-contained**

Do **not** include:
- unrelated staged renames
- archive moves
- legacy file reorganization
- build artifact churn outside the pack
- CSS/JS/HTML/source changes unrelated to baseline report packaging

## Required actions
1. Inspect current branch status and identify which changes are unrelated.
2. Prepare a clean branch or a clean commit sequence so that the resulting diff contains only the baseline report pack scope.
3. If necessary, unstage/split unrelated changes.
4. Produce a clean commit with a clear message.
5. Open or prepare a clean PR containing only this scope.

## Commit/PR intent
This commit/PR should establish that:
- the baseline pack is the accepted visual reference package
- the baseline policy is explicit
- the repo history has a clean reference point for future before/after comparisons

## Suggested commit message
`docs: isolate accepted baseline pack into clean reviewable commit`

## Suggested PR title
`Docs: isolate accepted baseline pack as canonical visual baseline`

## Verification checklist
Before finalizing, verify that:
- the diff contains only baseline-pack files
- no unrelated rename/move noise is present
- no product code behavior changed
- no accidental source/build changes were included
- the PR is easy to review as a baseline-only documentation/history checkpoint

## Deliverables
Return:
1. branch name used
2. commit SHA
3. PR link
4. short note confirming that unrelated rename/move changes were excluded
5. list of files included in the clean PR

## Important
If the working tree is too noisy to safely isolate this in-place, create a fresh branch from the appropriate base and cherry-pick/copy only the required report-pack files.
The priority is a **clean history artifact**, not preserving a messy branch state.
