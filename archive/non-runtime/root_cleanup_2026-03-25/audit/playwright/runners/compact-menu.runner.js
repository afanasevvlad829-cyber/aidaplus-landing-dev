const path = require("path");
const fs = require("fs/promises");
const { chromium } = require("playwright");

const config = require("../playwright.config");
const { parseCliArgs } = require("../helpers/args");
const { ensureDir } = require("../helpers/paths");
const { toRunFolderTimestamp, toIsoTimestamp } = require("../helpers/time");

const MODE_KEY = "ac:mode";
const AGE_KEY = "ac:age";
const PROMO_KEY = "acPromoV1";
const LEAD_KEY = "acBookingLeadV1";

const TAB_VIEWS = [
  { tab: "info", label: "О лагере" },
  { tab: "aiprogram", label: "AI программы" },
  { tab: "location", label: "Локация" },
  { tab: "photo", label: "Фото" },
  { tab: "video", label: "Видео" },
  { tab: "faq", label: "FAQ" },
  { tab: "reviews", label: "Отзывы" },
  { tab: "team", label: "Команда" }
];

function relativeToRoot(absPath) {
  return path.relative(config.rootDir, absPath).replace(/\\/g, "/");
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

async function waitForStableLoad(page) {
  try {
    await page.waitForLoadState(config.navigation.finalLoadState, {
      timeout: config.navigation.finalLoadTimeoutMs
    });
  } catch (_err) {
    // Best effort.
  }
}

async function waitShort(ms = 260) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureAgeSelected(page) {
  await page.evaluate(() => {
    const ageInput = document.getElementById("acAgeInput");
    if (!ageInput) return;

    const current = Number(ageInput.value || 0);
    const next = current === 0 ? 1 : current;
    ageInput.value = String(next);
    ageInput.dispatchEvent(new Event("input", { bubbles: true }));
    ageInput.dispatchEvent(new Event("change", { bubbles: true }));
  });

  await page.waitForFunction(() => {
    const summary = document.getElementById("acProgramSummary");
    const text = String(summary ? summary.textContent : "").toLowerCase();
    const ageReset = document.getElementById("acAgeReset");
    return text.indexOf("выберите возраст") === -1 || (ageReset && !ageReset.hidden);
  }, { timeout: 10000 });
}

async function readState(page) {
  return page.evaluate(() => {
    const active = document.querySelector("#acTopNav [data-action='tab'].is-active");
    return {
      activeTab: active ? active.getAttribute("data-tab") : null,
      activeLabel: active ? active.textContent.trim() : null,
      heroTitle: (document.getElementById("acHeroTitle") || {}).textContent || "",
      summary: (document.getElementById("acProgramSummary") || {}).textContent || "",
      mode: document.body.getAttribute("data-mode")
    };
  });
}

async function run() {
  const cli = parseCliArgs(process.argv.slice(2));
  const baseUrl = cli.url || process.env.AUDIT_URL || config.defaults.baseURL;
  if (!baseUrl) {
    throw new Error("URL is required. Use --url http://127.0.0.1:4173");
  }

  const viewport = cli.viewport || config.viewports.desktop;
  const runId = cli.runId || `compact-menu_${toRunFolderTimestamp(new Date())}`;

  const screenshotDir = path.join(config.artifacts.screenshotsDir, runId);
  const reportDir = path.join(config.artifacts.reportsDir, runId);
  await ensureDir(screenshotDir);
  await ensureDir(reportDir);

  const browser = await chromium.launch({
    headless: typeof cli.headless === "boolean" ? cli.headless : config.browser.headless
  });

  try {
    const context = await browser.newContext({ viewport });
    await context.addInitScript(
      ({ modeKey, ageKey, promoKey, leadKey }) => {
        try {
          localStorage.setItem(modeKey, "compact");
          localStorage.removeItem(ageKey);
          localStorage.removeItem(promoKey);
          localStorage.removeItem(leadKey);
        } catch (_err) {
          // ignore
        }
      },
      {
        modeKey: MODE_KEY,
        ageKey: AGE_KEY,
        promoKey: PROMO_KEY,
        leadKey: LEAD_KEY
      }
    );

    const page = await context.newPage();
    await page.goto(baseUrl, {
      waitUntil: config.navigation.gotoWaitUntil,
      timeout: config.navigation.timeoutMs
    });
    await waitForStableLoad(page);
    await page.waitForSelector("#acTopNav [data-action='tab']", { timeout: 10000 });
    await ensureAgeSelected(page);
    await waitShort();

    const shots = [];

    for (let i = 0; i < TAB_VIEWS.length; i += 1) {
      const view = TAB_VIEWS[i];
      const selector = `#acTopNav [data-action='tab'][data-tab='${view.tab}']`;
      await page.click(selector);
      await waitShort();
      await page.evaluate(() => window.scrollTo(0, 0));

      const fileName = `${String(i + 1).padStart(2, "0")}-${slug(view.label)}.png`;
      const absPath = path.join(screenshotDir, fileName);
      await page.screenshot({ path: absPath, fullPage: false });

      shots.push({
        order: i + 1,
        tab: view.tab,
        label: view.label,
        screenshot: relativeToRoot(absPath),
        state: await readState(page)
      });
    }

    const report = {
      runId,
      timestamp: toIsoTimestamp(new Date()),
      mode: "compact",
      url: baseUrl,
      viewport,
      shots
    };

    const reportPath = path.join(reportDir, "compact-menu.json");
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");

    const md = [
      "# Compact Menu Screenshots",
      "",
      `- URL: ${baseUrl}`,
      `- Timestamp: ${report.timestamp}`,
      "",
      "| # | Tab | Label | Screenshot |",
      "|---|---|---|---|",
      ...shots.map((s) => `| ${s.order} | ${s.tab} | ${s.label} | ${s.screenshot} |`),
      ""
    ].join("\n");
    const mdPath = path.join(reportDir, "index.md");
    await fs.writeFile(mdPath, md, "utf8");

    console.log("[audit:compact-menu] done");
    console.log(`- screenshots: ${relativeToRoot(screenshotDir)}`);
    console.log(`- report: ${relativeToRoot(reportPath)}`);
    console.log(`- index: ${relativeToRoot(mdPath)}`);
    console.log(`- count: ${shots.length}`);

    await page.close();
    await context.close();
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error("[audit:compact-menu] failed");
  console.error(error.message);
  process.exitCode = 1;
});

