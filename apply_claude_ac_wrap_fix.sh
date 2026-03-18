#!/bin/bash
set -e

cd /var/www/aidaplus-dev || exit 1

STAMP=$(date +%Y%m%d_%H%M%S)

cp src/styles/main.css "src/styles/main.css.bak_claude_ac_wrap_${STAMP}"

python3 - <<'PY'
from pathlib import Path
import re

css_path = Path("src/styles/main.css")
css = css_path.read_text(encoding="utf-8")

# 1. Remove obsolete conflicting overrides
css = re.sub(
    r'\.ac-wrap,\s*\.ac-site-main\s+\.ac-wrap\s*\{\s*margin-top:\s*0\s*!important;\s*padding-top:\s*0\s*!important;\s*\}',
    '',
    css,
    flags=re.S
)

css = re.sub(
    r'html\s+body\s+\.ac-wrap\s*\{\s*margin-top:\s*0\s*!important;\s*\}',
    '',
    css,
    flags=re.S
)

# 2. Remove previous Claude block if re-running script
css = re.sub(
    r'/\* ===== LAYOUT FIX: \.ac-wrap hero container ===== \*/.*?(?=\n/\* =====|\Z)',
    '',
    css,
    flags=re.S
)

# 3. Append canonical .ac-wrap block
fix_block = """
/* ===== LAYOUT FIX: .ac-wrap hero container ===== */
/* Removes top gap caused by min-height:100vh + align-items:center */
.ac-wrap {
  width: 100%;
  min-height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 40px;
}

@media (max-width: 640px) {
  .ac-wrap {
    padding: 16px;
    min-height: auto;
  }
}
"""

css = css.rstrip() + "\n\n" + fix_block + "\n"
css_path.write_text(css, encoding="utf-8")
print("src/styles/main.css updated")
PY

bash build.sh
if [ -x ./deploy.sh ]; then
  ./deploy.sh
fi

echo
echo "DONE"
echo "Backup created:"
echo "  src/styles/main.css.bak_claude_ac_wrap_${STAMP}"
