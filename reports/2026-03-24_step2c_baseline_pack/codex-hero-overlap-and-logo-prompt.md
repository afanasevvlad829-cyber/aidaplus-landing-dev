# Codex task — hero bottom reshape, booking overlap, logo restore, deploy, report

## Scope
Work only on this focused UI patch:
- hero bottom edge reshape
- controlled booking-card overlap into next section
- remove ugly double lower layer / dirty lower-right corner in full desktop hero
- restore visible logo in hero
- finish debug-controls close button visually

Do **not** mix in:
- broad CSS cleanup
- git cleanup
- archive work
- unrelated flow redesign
- unrelated runtime refactors

## Source of truth and working method
You must work from the **latest working build pipeline**, not by hand-editing the deployed artifact only.

Required approach:
1. start from the latest working project state in the GitHub repository you were already using
2. identify the real source files that build the published `gpt.html`
3. make changes in source, preserving current architecture
4. rebuild the project
5. deploy the updated build to Pages
6. provide report + screenshots

Important:
- do **not** patch Pages artifact as an isolated hotfix if the same result can be produced correctly through source → build → deploy
- preserve current booking logic, reservation flow, reset logic, and existing development rules
- avoid patch-on-patch chaos; keep the current architecture consistent

## Current visual intent
Patch only the first-screen zone.

### Hero bottom shape
Target visual intent:
- raise the hero bottom edge to the user-marked level
- create clean lower-left and lower-right rounding on hero
- remove the current flat/heavy lower edge feeling
- remove the dirty double layer / awkward lower-right corner in desktop full

### Booking overlap
Target visual intent:
- the booking card should overlap slightly into the next white block
- overlap must look intentional and premium
- overlap must be smaller and cleaner than the old oversized version
- it must **not** cover the text in the “О лагере” block
- booking card remains the visual bridge between hero and next section

### Logo
Target visual intent:
- restore visible logo in hero
- use the provided logo asset already discussed in this thread/repo context
- ensure logo is visually present in the current published result

### Debug close button
Target visual intent:
- close button for debug controls must be visually complete and clean
- no half-drawn / broken cross icon

## Constraints
- desktop full is the primary target
- then verify no regressions in:
  - desktop compact
  - mobile full
  - mobile compact
- keep booking logic stable
- keep modal / flow behavior stable
- do not refresh baseline automatically

## Validation requirements
After changes, do all of the following:
- rebuild project
- deploy updated build to Pages
- take screenshots
- compare changed zone against current accepted visual baseline / latest working state
- include report

## Required screenshots
At minimum include:
1. desktop full — hero after patch
2. desktop full — hero + overlap into next block
3. desktop full — lower-right hero corner / seam close-up
4. desktop full — logo visible in hero
5. debug controls close button visible
6. compact/mobile smoke screenshots if needed to confirm no regressions

## Required report location
Put the report here:
- `reports/2026-03-24_hero_overlap_logo_followup/`

Expected structure:
- `reports/2026-03-24_hero_overlap_logo_followup/report.md`
- `reports/2026-03-24_hero_overlap_logo_followup/diff/changes.diff`
- `reports/2026-03-24_hero_overlap_logo_followup/screens/*`
- `reports/2026-03-24_hero_overlap_logo_followup/build-info.md`

## What report.md must contain
1. what source files were changed
2. confirmation that work was done from source → build → deploy
3. how hero bottom edge was reshaped
4. how booking overlap was adjusted
5. how dirty lower-right corner / double layer was removed
6. how logo was restored
7. how debug close icon was fixed
8. what was checked after deploy
9. link/path to the deployed result
10. screenshot list
11. whether visual result matches requested intent

## Acceptance criteria
This task is successful only if:
- hero bottom edge is visibly raised and rounded
- booking card overlaps the next block slightly and cleanly
- text in “О лагере” stays readable
- ugly lower-right corner / double-layer effect is gone
- logo is visible in hero
- debug close icon looks complete
- deployment is done from rebuilt source
- screenshots are attached in the report
