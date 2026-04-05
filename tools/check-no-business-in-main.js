#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const mainPath = path.join(root, 'src/scripts/main.js');
const baselinePath = path.join(root, 'docs/quality/legacy-baseline.env');

function read(file){
  return fs.readFileSync(file, 'utf8');
}

function countPattern(src, rx){
  const matches = src.match(rx);
  return matches ? matches.length : 0;
}

function readEnv(file){
  if(!fs.existsSync(file)) return {};
  const lines = read(file).split('\n');
  const out = {};
  for(const line of lines){
    const trimmed = line.trim();
    if(!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const idx = trimmed.indexOf('=');
    const key = trimmed.slice(0, idx).trim();
    const value = Number(trimmed.slice(idx + 1).trim());
    if(Number.isFinite(value)) out[key] = value;
  }
  return out;
}

const main = read(mainPath);
const baseline = readEnv(baselinePath);

const metrics = {
  LEGACY_MAIN_OFFER_STAGE_REFS: countPattern(main, /\bofferStage\b/g),
  LEGACY_MAIN_OFFER_LAYOUT_REFS: countPattern(main, /\bofferLayout\b/g),
  LEGACY_MAIN_LEGACY_WORD_REFS: countPattern(main, /\blegacy\b/g),
  LEGACY_MAIN_DEBUG_ACTION_REFS: countPattern(main, /debug-booking/g),
  LEGACY_MAIN_INNERHTML_ASSIGNMENTS: countPattern(main, /innerHTML\s*=/g),
  LEGACY_MAIN_MOBILE_DOCS_COPY_REFS: countPattern(main, /\bMOBILE_DOCS_COPY\b/g),
  LEGACY_MAIN_DESKTOP_MOBILE_TEMPLATES_REFS: countPattern(main, /\bDESKTOP_MOBILE_SECTION_TEMPLATES\b/g)
};

const regressions = [];
for(const [key, value] of Object.entries(metrics)){
  const cap = baseline[key];
  if(Number.isFinite(cap) && value > cap){
    regressions.push({ key, value, cap });
  }
}

const result = {
  ok: regressions.length === 0,
  checked: 'src/scripts/main.js',
  metrics,
  regressions
};

console.log(JSON.stringify(result, null, 2));

if(!result.ok){
  process.exit(1);
}
