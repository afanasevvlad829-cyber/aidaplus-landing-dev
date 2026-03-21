import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const WORKSPACE_ROOT = path.resolve(ROOT, "..");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const LEGACY_DIST_INDEX = path.join(WORKSPACE_ROOT, "dist", "index.html");

const CSS_ORDER = [
  "styles/tokens.css",
  "styles/base.css"
];

const JS_ORDER = [
  "core/namespace.js",
  "core/events.js",
  "core/store.js",
  "core/effects.js",
  "features/shifts/index.js",
  "features/media/index.js",
  "features/booking/index.js",
  "ui/app-shell.js",
  "core/bootstrap.js",
  "main.js"
];

function read(relPath) {
  const abs = path.join(SRC, relPath);
  return fs.readFileSync(abs, "utf8");
}

function joinFiles(paths) {
  return paths.map((p) => {
    const content = read(p);
    return `/* file: ${p} */\n${content}`;
  }).join("\n\n");
}

function buildSingle() {
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

  const template = fs.readFileSync(path.join(SRC, "index.template.html"), "utf8");
  const css = joinFiles(CSS_ORDER);
  const js = joinFiles(JS_ORDER).replace(/<\/script/gi, "<\\/script");

  const labHtml = template
    .replace("/* inject:styles */", css)
    .replace("/* inject:scripts */", js);

  const labPath = path.join(DIST, "index.lab.html");
  fs.writeFileSync(labPath, labHtml, "utf8");

  let singleHtml = labHtml;
  let sourceLabel = "lab";
  if (fs.existsSync(LEGACY_DIST_INDEX)) {
    singleHtml = fs.readFileSync(LEGACY_DIST_INDEX, "utf8");
    sourceLabel = "../dist/index.html";
  }

  const singlePath = path.join(DIST, "index.single.html");
  const indexPath = path.join(DIST, "index.html");
  fs.writeFileSync(singlePath, singleHtml, "utf8");
  fs.writeFileSync(indexPath, singleHtml, "utf8");

  console.log(`[build-single] done: ${path.relative(ROOT, singlePath)} (source: ${sourceLabel})`);
  console.log(`[build-single] done: ${path.relative(ROOT, labPath)} (source: modular-lab)`);
}

buildSingle();
