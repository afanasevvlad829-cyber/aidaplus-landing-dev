# AidaCamp Repo Hygiene — Phase 3 Owner Decisions

Date: 2026-03-24
Branch: `chatgpt/phase3-execution-plan-20260324`

## Final decisions confirmed

### 1. `release/patch_big_bundle_report/report.md`
**Decision:** keep in repository.

**Reasoning:**
- operational history / change-report value;
- not product code;
- not a low-value temp artifact;
- can remain in-repo without increasing cleanup risk.

**Action:** no cleanup action in Phase 3.

---

### 2. Root `gpt.html`
**Decision:** manual keep for now.

**Reasoning:**
- appears to be a generated/manual working copy rather than canonical source;
- still should not be auto-deleted until canonical-vs-working-copy status is explicitly closed.

**Action:** no delete, no archive in this step.

---

### 3. Root `legal.html`
**Decision:** manual keep for now.

**Reasoning:**
- appears to be a generated/manual working copy tied to legal/support content;
- still should not be auto-deleted until canonical-vs-working-copy status is explicitly closed.

**Action:** no delete, no archive in this step.

---

## Effective Phase 3 execution state after owner decisions

### Approved now
- keep `release/patch_big_bundle_report/report.md` in repo;
- keep root `gpt.html` unchanged for now;
- keep root `legal.html` unchanged for now;
- low-risk `.tmp/*` shortlist remains approved for delete;
- curated baseline visuals remain approved for promotion;
- legacy archive candidates remain approved for archive classification, not mass delete.

### Explicitly not approved in this step
- delete root `gpt.html`;
- delete root `legal.html`;
- archive root `gpt.html`;
- archive root `legal.html`;
- remove `release/patch_big_bundle_report/report.md` from repo.

## Recommended next safe action
1. Keep current owner decisions as the governing rule set.
2. If desired later, run one final canonical check comparing:
   - `gpt.html` vs `src/pages/gpt.html`
   - `legal.html` vs `src/pages/legal.html`
3. Only after that, decide whether root HTML should eventually be archived or removed.

## Summary
Phase 3 remains conservative:
- no product code changes;
- no risky mass deletes;
- no cleanup of ambiguous root HTML;
- operational release history remains preserved in-repo.
