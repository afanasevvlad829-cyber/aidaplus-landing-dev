# Codex task — Step 2E / targeted structural CSS cleanup after Step 2D

## Scope for this conversation
This track is **CSS + baseline only**.
Do **not** mix in:
- git/repo cleanup
- archive/rename work
- broad audits
- design-flow redesign
- unrelated JS/feature work
- build/deploy policy changes unless strictly required by this CSS step

## Read this guide first
Use these files as the authoritative context before doing anything:

- Baseline pack root:
  - `reports/2026-03-24_step2c_baseline_pack/`
- Step 2C report:
  - `reports/2026-03-24_step2c_baseline_pack/patch_step2c_low_risk_css_cleanup/report.md`
- Step 2D followup report (if present):
  - `reports/2026-03-24_step2d_css_followup/report.md`
- Validation outputs:
  - `reports/2026-03-24_step2c_baseline_pack/validation/`
  - `reports/2026-03-24_step2d_css_followup/validation/` (if present)
- Baseline screenshots (canonical visual reference):
  - `reports/2026-03-24_step2c_baseline_pack/baseline/`

## Current direction
Step 2A/2B/2C already reduced safe lint debt and stabilized hot-zones.
This next step is **not** a mass cleanup.
It is a **targeted structural CSS cleanup** meant to improve maintainability and reduce patch-over-patch fragility outside the already approved visual baseline.

## Goal of Step 2E
Run a controlled CSS-only step focused on:
1. reducing structural CSS debt in low-risk or medium-risk areas
2. simplifying duplicated / overlapping selector logic where safe
3. improving maintainability outside the highest-risk visual hot-zones
4. preserving baseline-approved visuals

## What Step 2E should target
Prioritize structural cleanup such as:
- duplicated or overlapping selector blocks in non-hot-zones
- unnecessary local overrides in low-risk sections
- leftover legacy CSS that still sits in runtime path but is no longer needed
- structural cleanup in non-hot-zones where selector relationships can be simplified safely
- improving readability/maintainability without changing approved visuals

## Protected hot-zones
Treat these as protected and do not disturb them unless absolutely necessary and clearly justified:
- hero
- booking-card
- seam
- compact modals
- mobile menu
- video
- team
- contacts/socials

If a potential cleanup touches these areas and creates visual risk, defer it and document it.

## Required validations
After the step, always re-run:
- Stylelint
- CSSTree
- Project Wallace
- PurgeCSS estimate
- Playwright smoke

## Baseline comparison rule
Baseline is canonical and must not be refreshed.
For this step:
- compare only the zones that actually changed
- include `before/after` screenshots only for changed zones
- explicitly state that changed zones were compared against baseline
- explicitly report whether any visual regressions were found

## Expected output location
Put the new report here:
- `reports/2026-03-24_step2e_css_structural_followup/`

Expected structure:
- `reports/2026-03-24_step2e_css_structural_followup/report.md`
- `reports/2026-03-24_step2e_css_structural_followup/diff/changes.diff`
- `reports/2026-03-24_step2e_css_structural_followup/validation/*`
- `reports/2026-03-24_step2e_css_structural_followup/before-after/*`

## Required deliverables
Return:
1. what structural CSS cleanup was done
2. what was intentionally left deferred
3. Stylelint / CSSTree / Wallace / PurgeCSS / Playwright results
4. before/after screenshots for changed zones only
5. explicit note that changed zones were compared with baseline
6. updated CSS score
7. updated overall project score

## Acceptance criteria
This step is successful only if:
- approved UI stays visually stable
- baseline remains canonical and unchanged
- changed zones are compared against baseline
- structural CSS debt decreases without layout regressions
- CSSTree remains clean
- Playwright smoke remains green
- no unrelated scope is mixed in
