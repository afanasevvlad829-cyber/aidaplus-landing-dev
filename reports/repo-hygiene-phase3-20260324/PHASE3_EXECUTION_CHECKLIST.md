# AidaCamp Repo Hygiene — Phase 3 Execution Checklist

Date: 2026-03-24
Branch: `chatgpt/phase3-execution-plan-20260324`
Scope: documentation-only Phase 3 guidance, no product code changes.

## Approved now
- [ ] Keep `release/patch_big_bundle_report/report.md` in repository.
- [ ] Keep root `gpt.html` unchanged for now.
- [ ] Keep root `legal.html` unchanged for now.
- [ ] Delete the 8 approved low-risk `.tmp/*` files.
- [ ] Promote the 10 approved baseline screenshots into a canonical curated baseline folder.
- [ ] Add a short README to the curated baseline folder explaining why these screenshots are retained.
- [ ] Treat Phase 2 archive shortlist as archive candidates only, not mass-delete candidates.

## Do not do in this step
- [ ] Do not change `index.html`.
- [ ] Do not change anything in `src/**`.
- [ ] Do not change anything in `assets/**`.
- [ ] Do not change anything in `src/pages/**`.
- [ ] Do not change anything in `docs/**` except approved hygiene/report docs.
- [ ] Do not delete root `gpt.html`.
- [ ] Do not delete root `legal.html`.
- [ ] Do not archive root `gpt.html`.
- [ ] Do not archive root `legal.html`.
- [ ] Do not remove `release/patch_big_bundle_report/report.md` from repo.
- [ ] Do not perform risky mass delete under `audit/**`, `release/**`, `ui-sandbox/**`, `screens/**`, or `.tmp/` beyond the approved shortlist.

## Optional later check
- [ ] Compare `gpt.html` vs `src/pages/gpt.html` before any future cleanup decision.
- [ ] Compare `legal.html` vs `src/pages/legal.html` before any future cleanup decision.

## Exit criteria
- [ ] No product code changed.
- [ ] No ambiguous root HTML deleted.
- [ ] Operational release history preserved.
- [ ] Only approved low-risk cleanup performed.
- [ ] Curated baseline visuals explicitly retained.
