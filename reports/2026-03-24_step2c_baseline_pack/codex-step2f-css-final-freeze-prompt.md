# Codex task — Step 2F / final CSS freeze pass

## Scope for this conversation
This track is **CSS + baseline only**.
Do **not** mix in:
- git/repo cleanup
- archive/rename work
- broad audits outside CSS validation
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
- Step 2E structural followup report (if present):
  - `reports/2026-03-24_step2e_css_structural_followup/report.md`
- Validation outputs from prior steps:
  - `reports/2026-03-24_step2c_baseline_pack/validation/`
  - `reports/2026-03-24_step2d_css_followup/validation/` (if present)
  - `reports/2026-03-24_step2e_css_structural_followup/validation/` (if present)
- Baseline screenshots (canonical visual reference):
  - `reports/2026-03-24_step2c_baseline_pack/baseline/`

## Goal of Step 2F
Run the **final CSS freeze pass** for this cleanup track.

This step should:
1. make the last low-risk / moderate-risk CSS improvements that are still justified
2. avoid any new visual experimentation
3. preserve the approved baseline and approved UI behavior
4. produce a final, reviewable CSS state with explicit deferred items
5. prepare the CSS track for freeze / handoff

## What Step 2F should focus on
Prioritize only the last justified CSS work, such as:
- final targeted cleanup in non-hot-zones
- safe consolidation of residual duplicate/overlapping rules
- cleanup of leftover runtime CSS debt that is clearly safe
- final readability/maintainability improvements that do not disturb approved visuals

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

If a possible cleanup touches these areas and creates visual risk, defer it and document it.

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
- `reports/2026-03-24_step2f_css_final_freeze/`

Expected structure:
- `reports/2026-03-24_step2f_css_final_freeze/report.md`
- `reports/2026-03-24_step2f_css_final_freeze/diff/changes.diff`
- `reports/2026-03-24_step2f_css_final_freeze/validation/*`
- `reports/2026-03-24_step2f_css_final_freeze/before-after/*`

## Required deliverables
Return:
1. what final CSS cleanup was done
2. what was intentionally left deferred and frozen for later
3. Stylelint / CSSTree / Wallace / PurgeCSS / Playwright results
4. before/after screenshots for changed zones only
5. explicit note that changed zones were compared with baseline
6. updated CSS score
7. updated overall project score
8. final recommendation: CSS track can be considered frozen / not frozen

## Acceptance criteria
This step is successful only if:
- approved UI stays visually stable
- baseline remains canonical and unchanged
- changed zones are compared against baseline
- CSS debt decreases or is explicitly frozen with rationale
- CSSTree remains clean
- Playwright smoke remains green
- no unrelated scope is mixed in
- report clearly states whether the CSS cleanup track is ready to freeze
