# How to pass this report package to ChatGPT

## Option A (recommended)
1. Open this folder in GitHub.
2. Download the whole folder as ZIP (or clone branch).
3. Upload these files to ChatGPT:
   - `README.md`
   - `phase2_manual_classification_full.csv`
   - `phase2_baseline_visuals_shortlist.csv`
   - `phase2_final_reports_shortlist.csv`
   - `phase2_archive_shortlist.csv`
   - `phase2_lowrisk_delete_shortlist.csv`
   - `project-artifact-policy.md`

Use this prompt:

"Analyze AidaCamp repo hygiene package. Build a conservative execution plan for Phase 3 with no product code changes. Keep manual review for ambiguous root html (`gpt.html`, `legal.html`) and avoid risky mass deletes. Return exact approve/reject matrix for each shortlist file."

## Option B (GitHub link)
If your ChatGPT environment can access GitHub links, send the direct folder URL and ask it to read all CSV/MD inside this folder.
