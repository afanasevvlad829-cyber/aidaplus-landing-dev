# Codex task — Step 2D / controlled CSS follow-up after Step 2C

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
- Step 2C validation:
  - `reports/2026-03-24_step2c_baseline_pack/validation/`
- Baseline screenshots (canonical visual reference):
  - `reports/2026-03-24_step2c_baseline_pack/baseline/`
- Step 2D handoff template:
  - `reports/2026-03-24_step2c_baseline_pack/codex-step2d-css-handoff-template.md`

## Current state after Step 2C
Known state from the accepted report:
- Stylelint total was reduced from `593 -> 12`
- Remaining finding class is `selector-id-pattern` only
- Baseline comparison on changed zones showed no visual regressions
- CSSTree stayed clean
- Playwright smoke stayed green
- CSS score improved to ~`8.1/10`
- Project score improved to ~`8.2/10`

## Goal of Step 2D
Run a **controlled, CSS-led follow-up** to address the remaining debt carefully.

The expected focus is:
1. decide whether the remaining `selector-id-pattern` findings should be fixed now or deferred
2. if fixed, do it only through a controlled HTML + JS + CSS contract migration
3. if not fixed, explicitly document why it remains deferred
4. keep approved UI stable and baseline-aligned

This is **not** a mass-refactor step.
This is a narrow, controlled follow-up.

## Primary task
### Option A — Controlled ID contract migration
If you judge it safe, migrate the remaining ID-based naming that violates `selector-id-pattern`.

Rules:
- do it only if the migration can be executed coherently across:
  - HTML
  - JS
  - CSS
- do not leave partially migrated IDs
- do not break any booking/menu/modal/runtime contract
- do not touch unrelated selectors
- keep scope as small as possible

### Option B — Explicit defer with rationale
If safe migration is not justified inside this step:
- keep runtime untouched
- leave the remaining findings deferred
- produce a precise explanation of why these findings should stay as-is for now
- propose the correct future migration boundary

## Protected hot-zones
Treat these as protected and do not disturb them except where absolutely necessary for the chosen migration:
- hero
- booking-card
- seam
- compact modals
- mobile menu
- video
- team
- contacts/socials

If the remaining selector work touches one of these zones and creates visual risk, prefer defer + documentation over risky cleanup.

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
- `reports/2026-03-24_step2d_css_followup/`

Expected structure:
- `reports/2026-03-24_step2d_css_followup/report.md`
- `reports/2026-03-24_step2d_css_followup/diff/changes.diff`
- `reports/2026-03-24_step2d_css_followup/validation/*`
- `reports/2026-03-24_step2d_css_followup/before-after/*`

## Required deliverables
Return:
1. what changed
2. whether `selector-id-pattern` was fixed or intentionally deferred
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
- Stylelint either improves further, or the remaining debt is explicitly justified as deferred
- CSSTree remains clean
- Playwright smoke remains green
- no unrelated scope is mixed in
