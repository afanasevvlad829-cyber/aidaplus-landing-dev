#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import re

ROOT = Path(__file__).resolve().parents[1]

CSS_MAIN = ROOT / 'src/styles/main.css'
JS_MAIN = ROOT / 'src/scripts/main.js'
CSS_MODULE_DIRS = [ROOT / 'src/styles/base', ROOT / 'src/styles/layout', ROOT / 'src/styles/components', ROOT / 'src/styles/features', ROOT / 'src/styles/dev']
JS_MODULE_DIRS = [ROOT / 'src/scripts/data', ROOT / 'src/scripts/core', ROOT / 'src/scripts/features']

OUT_DIR = ROOT / 'reports' / 'modular_gap'
OUT_DIR.mkdir(parents=True, exist_ok=True)

def read(p: Path) -> str:
    return p.read_text(encoding='utf-8', errors='ignore') if p.exists() else ''

def files(dirs, ext):
    out = []
    for d in dirs:
        if d.exists():
            out.extend(sorted(d.glob(f'*.{ext}')))
    return out

def normalize_css_line(s: str) -> str:
    s = re.sub(r'/\*.*?\*/', '', s)
    return re.sub(r'\s+', ' ', s).strip()

def normalize_js_line(s: str) -> str:
    s = re.sub(r'/\*.*?\*/', '', s)
    s = re.sub(r'//.*$', '', s)
    return re.sub(r'\s+', ' ', s).strip()

def analyze(main_path: Path, module_paths, kind='css'):
    main = read(main_path).splitlines()
    mods_text = []
    for p in module_paths:
        mods_text.extend(read(p).splitlines())

    norm = normalize_css_line if kind == 'css' else normalize_js_line

    main_norm = [norm(x) for x in main]
    mod_norm = [norm(x) for x in mods_text]

    main_norm_nonempty = [x for x in main_norm if x]
    mod_norm_nonempty = [x for x in mod_norm if x]

    mod_set = set(mod_norm_nonempty)
    main_set = set(main_norm_nonempty)

    covered_in_modules = sum(1 for x in main_norm_nonempty if x in mod_set)
    covered_in_main = sum(1 for x in mod_norm_nonempty if x in main_set)

    main_cov = (covered_in_modules / len(main_norm_nonempty) * 100) if main_norm_nonempty else 100.0
    mod_cov = (covered_in_main / len(mod_norm_nonempty) * 100) if mod_norm_nonempty else 100.0

    missing_runs = []
    run_start = None
    run_lines = []

    for i, x in enumerate(main_norm_nonempty):
        if x and x not in mod_set:
            if run_start is None:
                run_start = i
                run_lines = [x]
            else:
                run_lines.append(x)
        else:
            if run_start is not None:
                missing_runs.append((run_start, len(run_lines), run_lines[:3]))
                run_start = None
                run_lines = []
    if run_start is not None:
        missing_runs.append((run_start, len(run_lines), run_lines[:3]))

    missing_runs.sort(key=lambda t: t[1], reverse=True)

    return {
        'main_path': str(main_path.relative_to(ROOT)),
        'module_paths': [str(p.relative_to(ROOT)) for p in module_paths],
        'main_lines': len(main),
        'main_nonempty_norm': len(main_norm_nonempty),
        'mods_nonempty_norm': len(mod_norm_nonempty),
        'main_coverage_in_modules_pct': round(main_cov, 2),
        'modules_coverage_in_main_pct': round(mod_cov, 2),
        'top_missing_runs': missing_runs[:20],
    }

def write_md(css, js):
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    out = []
    out.append(f"# Modular Gap Report\n\nGenerated: {now}\n")
    for title, d in [('CSS', css), ('JS', js)]:
        out.append(f"## {title}\n")
        out.append(f"- main: `{d['main_path']}`")
        out.append(f"- modules: {len(d['module_paths'])} files")
        out.append(f"- normalized non-empty lines in main: {d['main_nonempty_norm']}")
        out.append(f"- normalized non-empty lines in modules: {d['mods_nonempty_norm']}")
        out.append(f"- main coverage in modules: **{d['main_coverage_in_modules_pct']}%**")
        out.append(f"- modules coverage in main: **{d['modules_coverage_in_main_pct']}%**\n")

        out.append("Top missing runs in main (not found in modules):")
        if not d['top_missing_runs']:
            out.append("- none\n")
        else:
            for idx, (start, length, preview) in enumerate(d['top_missing_runs'][:10], 1):
                sample = ' | '.join(preview)
                out.append(f"{idx}. run_len={length}, approx_norm_line={start}, preview: `{sample[:220]}`")
            out.append("")

    (OUT_DIR / 'report.md').write_text('\n'.join(out), encoding='utf-8')

def write_csv(css, js):
    lines = [
        'asset,main_path,module_files,main_nonempty_norm,modules_nonempty_norm,main_coverage_in_modules_pct,modules_coverage_in_main_pct',
        f"css,{css['main_path']},{len(css['module_paths'])},{css['main_nonempty_norm']},{css['mods_nonempty_norm']},{css['main_coverage_in_modules_pct']},{css['modules_coverage_in_main_pct']}",
        f"js,{js['main_path']},{len(js['module_paths'])},{js['main_nonempty_norm']},{js['mods_nonempty_norm']},{js['main_coverage_in_modules_pct']},{js['modules_coverage_in_main_pct']}",
    ]
    (OUT_DIR / 'summary.csv').write_text('\n'.join(lines) + '\n', encoding='utf-8')


def write_top_gaps(name, data):
    rows = ['rank,run_len,approx_norm_line,preview']
    for i, (start, length, preview) in enumerate(data['top_missing_runs'], 1):
        p = ' | '.join(preview).replace('"', "''")
        rows.append(f'{i},{length},{start},"{p[:300]}"')
    (OUT_DIR / f'{name}_top_gaps.csv').write_text('\n'.join(rows) + '\n', encoding='utf-8')

if __name__ == '__main__':
    css_mods = files(CSS_MODULE_DIRS, 'css')
    js_mods = files(JS_MODULE_DIRS, 'js')
    css = analyze(CSS_MAIN, css_mods, 'css')
    js = analyze(JS_MAIN, js_mods, 'js')
    write_md(css, js)
    write_csv(css, js)
    write_top_gaps('css', css)
    write_top_gaps('js', js)
    print((OUT_DIR / 'report.md').as_posix())
