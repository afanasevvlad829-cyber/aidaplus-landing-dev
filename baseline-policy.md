# Baseline Policy

## Purpose
`artifacts/baseline/` is the accepted visual reference baseline for AiDaCamp landing.

## Rules
1. Baseline is captured once and treated as reference.
2. Baseline is **not** re-captured automatically on every patch.
3. All future patches should compare changed zones against this baseline.
4. Patch ZIPs should include:
   - `after` screenshots for changed zones
   - optional `before` screenshots only for touched zones
   - optional comparison note vs baseline
5. Baseline update is allowed **only** after explicit manual approval.
6. Without explicit approval, baseline files in `artifacts/baseline/` must remain unchanged.

## Scope
Baseline covers:
- desktop full
- desktop compact
- mobile full
- mobile compact
- special visual zones

## Ownership
Baseline maintenance is manual and approval-driven; no CI auto-refresh.
