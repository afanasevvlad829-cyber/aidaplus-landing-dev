# Codex handoff — next CSS step after Step 2C

## Scope for this conversation
This track is **CSS + baseline only**.
Do not mix in:
- git/repo cleanup
- archive/rename work
- broad audits
- design-flow redesign
- non-CSS refactors

## Read this context first
Use the existing Step 2C materials as the source of truth for the current state:

- Baseline pack root:
  - `reports/2026-03-24_step2c_baseline_pack/`
- Step 2C report:
  - `reports/2026-03-24_step2c_baseline_pack/patch_step2c_low_risk_css_cleanup/report.md`
- Validation outputs:
  - `reports/2026-03-24_step2c_baseline_pack/validation/`
- Baseline screenshots:
  - `reports/2026-03-24_step2c_baseline_pack/baseline/`

## Working rule
Before making any CSS changes:
1. read the Step 2C report and validation outputs
2. use baseline screenshots as the canonical visual reference
3. compare only the zones you actually touch
4. do not refresh baseline automatically

## Where the next step instructions should live
When the next CSS step is defined, use a dedicated instruction file in this same area, for example:
- `reports/2026-03-24_step2c_baseline_pack/next-css-step.md`

If that file exists, treat it as the authoritative task description for the next CSS step.

## Where to put your next report
Place the next report in a new sibling folder under `reports/`, not mixed into the old Step 2C pack.

Recommended target location:
- `reports/2026-03-24_step2d_css_followup/`

Expected structure:
- `reports/2026-03-24_step2d_css_followup/report.md`
- `reports/2026-03-24_step2d_css_followup/diff/changes.diff`
- `reports/2026-03-24_step2d_css_followup/validation/*`
- `reports/2026-03-24_step2d_css_followup/before-after/*`

## Output policy
For the next CSS step:
- baseline is not re-captured
- include `before/after` screenshots only for changed zones
- include tool metrics before/after
- clearly separate fixed findings vs deferred findings
- keep approved UI stable

## Required deliverables for the next CSS step
Return:
1. summary of what changed
2. stylelint / csstree / wallace / purgecss / playwright results
3. before/after screenshots for changed zones only
4. explicit note that changed zones were compared against baseline
5. new score after the step

## Acceptance reminder
The next step is successful only if:
- CSS debt decreases
- CSSTree stays clean
- Playwright smoke stays green
- changed zones remain visually aligned with baseline or intentionally improved
- no unrelated scope is mixed in
