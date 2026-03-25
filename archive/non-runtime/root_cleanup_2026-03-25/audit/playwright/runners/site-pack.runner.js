const path = require("path");
const fs = require("fs/promises");
const { chromium } = require("playwright");

const config = require("../playwright.config");
const { ensureDir } = require("../helpers/paths");
const { parseCliArgs } = require("../helpers/args");
const { toRunFolderTimestamp, toIsoTimestamp } = require("../helpers/time");

const MODE_KEY = "ac:mode";

const TAB_VIEWS = [
  { tab: "info", label: "О лагере" },
  { tab: "aiprogram", label: "AI" },
  { tab: "location", label: "Локация" },
  { tab: "photo", label: "Фото" },
  { tab: "video", label: "Видео" },
  { tab: "faq", label: "FAQ" },
  { tab: "reviews", label: "Отзывы" },
  { tab: "team", label: "Команда" }
];

const FULL_ANCHOR_VIEWS = [
  { id: "program", label: "Программа", anchor: "program" },
  { id: "format", label: "Формат", anchor: "format" }
];

const MODES = [
  { key: "compact", label: "короткий" },
  { key: "full", label: "полный" }
];

function sanitizeLabel(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function relativeToRoot(absolutePath) {
  return path.relative(config.rootDir, absolutePath).replace(/\\/g, "/");
}

async function waitForStableLoad(page) {
  try {
    await page.waitForLoadState(config.navigation.finalLoadState, {
      timeout: config.navigation.finalLoadTimeoutMs
    });
  } catch (_err) {
    // Best effort network idle wait.
  }
}

async function waitShort() {
  await new Promise((resolve) => setTimeout(resolve, 220));
}

async function isAgeUnlocked(page) {
  return page.evaluate(() => {
    const ageReset = document.getElementById("acAgeReset");
    if (ageReset && !ageReset.hidden) return true;

    const summary = document.getElementById("acProgramSummary");
    const summaryText = String(summary ? summary.textContent : "").toLowerCase();
    return summaryText.indexOf("выберите возраст") === -1;
  });
}

async function ensureAgeSelected(page) {
  if (await isAgeUnlocked(page)) return;

  await page.evaluate(() => {
    const ageInput = document.getElementById("acAgeInput");
    if (!ageInput) return;

    const current = Number(ageInput.value || 0);
    const next = current === 0 ? 1 : current;
    ageInput.value = String(next);
    ageInput.dispatchEvent(new Event("input", { bubbles: true }));
    ageInput.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await waitShort();
  await waitShort();

  if (await isAgeUnlocked(page)) return;

  const ageInput = page.locator("#acAgeInput").first();
  if (await ageInput.count()) {
    await ageInput.focus();
    await page.keyboard.press("ArrowRight");
    await waitShort();
  }

  if (!(await isAgeUnlocked(page))) {
    throw new Error("Age unlock failed: tab switching is blocked until age is selected.");
  }
}

async function screenshotState({ page, index, label, requestedUrl, modeDir, items }) {
  const seq = String(index).padStart(2, "0");
  const fileName = `${seq}-${sanitizeLabel(label)}.png`;
  const screenshotPath = path.join(modeDir, fileName);

  await page.screenshot({ path: screenshotPath, fullPage: false });

  items.push({
    order: index,
    label,
    requestedUrl,
    finalUrl: page.url(),
    title: await page.title(),
    screenshot: relativeToRoot(screenshotPath)
  });
}

async function captureCompactSet({ page, baseUrl, modeDir, items }) {
  await page.goto(baseUrl, {
    waitUntil: config.navigation.gotoWaitUntil,
    timeout: config.navigation.timeoutMs
  });
  await waitForStableLoad(page);

  await page.waitForSelector("#acTopNav [data-action='tab']", { timeout: 10000 });
  await ensureAgeSelected(page);

  let index = 1;

  for (const view of TAB_VIEWS) {
    const selector = `#acTopNav [data-action='tab'][data-tab='${view.tab}']`;
    await page.click(selector);
    await waitShort();
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    await screenshotState({
      page,
      index,
      label: view.label,
      requestedUrl: `${baseUrl}#tab=${view.tab}`,
      modeDir,
      items
    });

    index += 1;
  }

  await page.evaluate(() => {
    const node = document.getElementById("program");
    if (node) node.scrollIntoView({ block: "start", behavior: "auto" });
  });
  await waitShort();
  await screenshotState({
    page,
    index,
    label: "Программа",
    requestedUrl: `${baseUrl}#program`,
    modeDir,
    items
  });
  index += 1;

  let contactCaptured = false;
  const contactButton = page.locator("#acContactButton[data-action='open-contact']").first();
  if (await contactButton.count()) {
    try {
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await waitShort();
      await contactButton.click({ timeout: 5000 });
      await waitShort();
      await screenshotState({
        page,
        index,
        label: "Контакты",
        requestedUrl: `${baseUrl}#contacts`,
        modeDir,
        items
      });
      contactCaptured = true;
    } catch (_err) {
      contactCaptured = false;
    }
  }

  if (!contactCaptured) {
    await page.evaluate(() => {
      const node = document.getElementById("format");
      if (node) node.scrollIntoView({ block: "start", behavior: "auto" });
    });
    await waitShort();
    await screenshotState({
      page,
      index,
      label: "Формат",
      requestedUrl: `${baseUrl}#format`,
      modeDir,
      items
    });
  }
}

async function captureFullSet({ page, baseUrl, modeDir, items }) {
  await page.goto(baseUrl, {
    waitUntil: config.navigation.gotoWaitUntil,
    timeout: config.navigation.timeoutMs
  });
  await waitForStableLoad(page);

  await page.waitForSelector("#acTopNav [data-action='tab']", { timeout: 10000 });
  await ensureAgeSelected(page);

  let index = 1;

  for (const view of FULL_ANCHOR_VIEWS) {
    await page.evaluate((anchor) => {
      const node = document.getElementById(anchor);
      if (node) node.scrollIntoView({ block: "start", behavior: "auto" });
    }, view.anchor);
    await waitShort();

    await screenshotState({
      page,
      index,
      label: view.label,
      requestedUrl: `${baseUrl}#${view.anchor}`,
      modeDir,
      items
    });

    index += 1;
  }

  for (const view of TAB_VIEWS) {
    const selector = `#acTopNav [data-action='tab'][data-tab='${view.tab}']`;
    await page.click(selector);
    await waitShort();

    await screenshotState({
      page,
      index,
      label: view.label,
      requestedUrl: `${baseUrl}#tab=${view.tab}`,
      modeDir,
      items
    });

    index += 1;
  }
}

async function captureModeSet({ browser, baseUrl, viewport, runRoot, mode }) {
  const context = await browser.newContext({ viewport });

  await context.addInitScript(
    ({ key, value }) => {
      try {
        localStorage.setItem(key, value);
      } catch (_err) {
        // ignore
      }
    },
    { key: MODE_KEY, value: mode.key }
  );

  const page = await context.newPage();

  const modeScreenshotDir = path.join(runRoot.screenshotsDir, mode.label);
  const modeReportsDir = path.join(runRoot.reportsDir, mode.label);
  await ensureDir(modeScreenshotDir);
  await ensureDir(modeReportsDir);

  const items = [];

  if (mode.key === "compact") {
    await captureCompactSet({ page, baseUrl, modeDir: modeScreenshotDir, items });
  } else {
    await captureFullSet({ page, baseUrl, modeDir: modeScreenshotDir, items });
  }

  const report = {
    mode: mode.label,
    modeKey: mode.key,
    timestamp: toIsoTimestamp(new Date()),
    viewport,
    baseUrl,
    items
  };

  const reportJsonPath = path.join(modeReportsDir, "report.json");
  const captionsMdPath = path.join(modeReportsDir, "index.md");

  await fs.writeFile(reportJsonPath, JSON.stringify(report, null, 2), "utf8");

  const markdown = [
    `# Набор скриншотов (${mode.label})`,
    "",
    `- URL: ${baseUrl}`,
    `- Время: ${report.timestamp}`,
    "",
    "| # | Страница | Файл |",
    "|---|---|---|",
    ...items.map((item) => `| ${item.order} | ${item.label} | ${item.screenshot} |`),
    ""
  ].join("\n");

  await fs.writeFile(captionsMdPath, markdown, "utf8");

  await page.close();
  await context.close();

  return {
    mode: mode.label,
    screenshotsDir: relativeToRoot(modeScreenshotDir),
    reportPath: relativeToRoot(reportJsonPath),
    captionsPath: relativeToRoot(captionsMdPath),
    count: items.length
  };
}

async function run() {
  const cli = parseCliArgs(process.argv.slice(2));
  const baseUrl = cli.url || process.env.AUDIT_URL || config.defaults.baseURL;

  if (!baseUrl) {
    throw new Error("URL is required. Use --url http://127.0.0.1:4173");
  }

  const viewport = cli.viewport || config.viewports.desktop;
  const runId = cli.runId || `site-pack_${toRunFolderTimestamp(new Date())}`;

  const runRoot = {
    screenshotsDir: path.join(config.artifacts.screenshotsDir, runId),
    reportsDir: path.join(config.artifacts.reportsDir, runId)
  };

  await ensureDir(runRoot.screenshotsDir);
  await ensureDir(runRoot.reportsDir);

  const browser = await chromium.launch({
    headless: typeof cli.headless === "boolean" ? cli.headless : config.browser.headless
  });

  try {
    const results = [];
    for (const mode of MODES) {
      const result = await captureModeSet({ browser, baseUrl, viewport, runRoot, mode });
      results.push(result);
    }

    const summary = {
      runId,
      timestamp: toIsoTimestamp(new Date()),
      baseUrl,
      viewport,
      results
    };

    const summaryPath = path.join(runRoot.reportsDir, "summary.json");
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2), "utf8");

    console.log("[audit:site-pack] done");
    for (const entry of results) {
      console.log(`- mode: ${entry.mode}`);
      console.log(`  screenshots: ${entry.screenshotsDir}`);
      console.log(`  captions: ${entry.captionsPath}`);
      console.log(`  report: ${entry.reportPath}`);
      console.log(`  count: ${entry.count}`);
    }
    console.log(`- summary: ${relativeToRoot(summaryPath)}`);
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error("[audit:site-pack] failed");
  console.error(error.message);
  process.exitCode = 1;
});
