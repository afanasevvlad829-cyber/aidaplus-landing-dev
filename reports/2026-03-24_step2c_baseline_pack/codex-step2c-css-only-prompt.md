# Codex task — Step 2C / CSS-only cleanup with baseline-aware output

## Scope rule for this conversation
This task is **CSS + baseline only**.
Do **not** mix in:
- git/repo cleanup
- archive/rename work
- broad audits
- design-flow redesign
- non-CSS refactors

Git housekeeping is being handled in a separate conversation/track.
In this branch/task, focus only on **Step 2C low-risk CSS cleanup** and **baseline-aware before/after output**.

## Context
Step 2A and Step 2B are already done.
Accepted visual baseline has already been captured and must remain the canonical visual reference.
Do not refresh the baseline automatically.
Use it only as comparison input for changed zones.

Current state after Step 2B:
- CSS is valid at spec level (CSSTree clean)
- Stylelint debt still exists
- hot-zones were already manually stabilized in Step 2B
- next step must be low-risk and must not disturb approved UI

## Goal
Run **Step 2C** as a small, low-risk CSS cleanup step:
- reduce remaining low-risk Stylelint debt
- avoid behavior/layout regressions
- keep hot-zones stable
- use baseline as reference
- return before/after only for zones that actually changed

## What to clean in Step 2C
Prioritize only low-risk findings such as:
- `alpha-value-notation`
- `color-function-notation`
- similarly low-risk notation/style findings, but only if they are safe

## Do not do
- no large CSS refactor
- no redesign
- no git/repo cleanup
- no baseline refresh
- no mass edits in fragile selectors just to reduce counts
- no behavior changes in hero/booking/modals/team/video unless absolutely necessary and still low-risk

## Keep hot-zones stable
Treat these zones as protected:
- hero
- booking-card
- seam
- compact modals
- mobile menu
- video
- team
- contacts/socials

If a remaining lint finding touches one of these zones and creates regression risk, leave it deferred and document it.

## Validation required after Step 2C
Re-run:
- Stylelint
- CSSTree
- Project Wallace
- PurgeCSS estimate
- Playwright smoke

Return before/after metrics.

## Output policy
Do not re-capture the whole site baseline.
In the patch output include:
- `before` / `after` screenshots only for changed zones
- short explanation of what changed and why
- what findings were intentionally left deferred

## Deliverables
Return a package containing:
- updated build artifacts (`gpt.html`, `legal.html` if touched)
- diff
- report
- validation outputs
- before/after screenshots for changed zones only

## Acceptance criteria
- low-risk Stylelint debt reduced
- CSSTree remains clean
- Playwright smoke remains green
- approved UI not disturbed
- baseline remains canonical and unchanged
- report clearly separates fixed vs deferred findings
