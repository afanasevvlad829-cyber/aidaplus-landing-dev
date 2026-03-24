const path = require("path");
const fs = require("fs/promises");
const { chromium } = require("playwright");

const config = require("../playwright.config");
const { parseCliArgs } = require("../helpers/args");
const { ensureDir, slugifyUrl } = require("../helpers/paths");
const { toRunFolderTimestamp, toIsoTimestamp } = require("../helpers/time");

function resolveViewport(cliOptions) {
  if (cliOptions.viewport) return cliOptions.viewport;

  const presetName = cliOptions.viewportPreset || config.defaults.viewportPreset;
  return config.viewports[presetName] || config.viewports.desktop;
}

function resolveTargetUrl(cliOptions) {
  return cliOptions.url || process.env.AUDIT_URL || config.defaults.baseURL;
}

function getRelativeArtifactPath(absolutePath) {
  return path.relative(config.rootDir, absolutePath).replace(/\\/g, "/");
}

async function run() {
  const cliOptions = parseCliArgs(process.argv.slice(2));
  const requestedUrl = resolveTargetUrl(cliOptions);

  if (!requestedUrl) {
    throw new Error("URL is required. Use --url https://example.com or AUDIT_URL env.");
  }

  const viewport = resolveViewport(cliOptions);
  const runId = cliOptions.runId || toRunFolderTimestamp(new Date());

  const runScreenshotDir = path.join(config.artifacts.screenshotsDir, runId);
  const runReportsDir = path.join(config.artifacts.reportsDir, runId);

  await ensureDir(runScreenshotDir);
  await ensureDir(runReportsDir);

  const browser = await chromium.launch({
    headless: typeof cliOptions.headless === "boolean" ? cliOptions.headless : config.browser.headless
  });

  let page;
  let context;

  const consoleErrors = [];
  const networkErrors = [];

  try {
    context = await browser.newContext({ viewport });
    page = await context.newPage();

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("requestfailed", (request) => {
      const failure = request.failure();
      networkErrors.push({
        url: request.url(),
        method: request.method(),
        errorText: failure ? failure.errorText : "unknown"
      });
    });

    const response = await page.goto(requestedUrl, {
      waitUntil: config.navigation.gotoWaitUntil,
      timeout: config.navigation.timeoutMs
    });

    try {
      await page.waitForLoadState(config.navigation.finalLoadState, {
        timeout: config.navigation.finalLoadTimeoutMs
      });
    } catch (_err) {
      // Network idle is best-effort for stage 1.
    }

    const finalUrl = page.url();
    const title = await page.title();
    const slug = slugifyUrl(finalUrl);

    const screenshotPath = path.join(runScreenshotDir, `${slug}.png`);
    const reportPath = path.join(runReportsDir, `${slug}.json`);

    await page.screenshot({ path: screenshotPath, fullPage: true });

    const report = {
      url: requestedUrl,
      finalUrl,
      timestamp: toIsoTimestamp(new Date()),
      viewport,
      title,
      httpStatus: response ? response.status() : null,
      artifacts: {
        screenshot: getRelativeArtifactPath(screenshotPath),
        report: getRelativeArtifactPath(reportPath)
      },
      diagnostics: {
        consoleErrorCount: consoleErrors.length,
        networkErrorCount: networkErrors.length,
        consoleErrors,
        networkErrors
      }
    };

    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");

    console.log("[audit:screenshot] done");
    console.log(`- url: ${requestedUrl}`);
    console.log(`- finalUrl: ${finalUrl}`);
    console.log(`- screenshot: ${report.artifacts.screenshot}`);
    console.log(`- report: ${report.artifacts.report}`);
  } finally {
    if (page) await page.close();
    if (context) await context.close();
    await browser.close();
  }
}

run().catch((error) => {
  console.error("[audit:screenshot] failed");
  console.error(error.message);
  process.exitCode = 1;
});
