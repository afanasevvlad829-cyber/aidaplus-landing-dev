const path = require("path");
const fs = require("fs/promises");
const { chromium } = require("playwright");

const config = require("../playwright.config");
const { ensureDir } = require("../helpers/paths");
const { toRunFolderTimestamp, toIsoTimestamp } = require("../helpers/time");

const ROOT_DIR = path.resolve(__dirname, "..", "..", "..");

function parseNumber(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.round(n);
}

function parseArgs(argv) {
  const args = {
    chatUrl: process.env.CHATGPT_DIALOG_URL || "",
    reportPath: process.env.CHATGPT_REPORT_PATH || path.join(ROOT_DIR, "report.md"),
    runId: process.env.AUDIT_RUN_ID || "",
    send: false,
    headless: undefined,
    timeoutMs: parseNumber(process.env.CHATGPT_PUSH_TIMEOUT_MS, 90000),
    keepOpenMs: parseNumber(process.env.CHATGPT_KEEP_OPEN_MS, 0),
    profileDir: process.env.CHATGPT_PROFILE_DIR || path.join(config.artifacts.rootDir, "chatgpt-profile")
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === "--chat-url" && next) {
      args.chatUrl = next;
      i += 1;
      continue;
    }

    if (token === "--report" && next) {
      args.reportPath = next;
      i += 1;
      continue;
    }

    if (token === "--run-id" && next) {
      args.runId = next;
      i += 1;
      continue;
    }

    if (token === "--profile-dir" && next) {
      args.profileDir = next;
      i += 1;
      continue;
    }

    if (token === "--timeout-ms" && next) {
      args.timeoutMs = parseNumber(next, args.timeoutMs);
      i += 1;
      continue;
    }

    if (token === "--keep-open-ms" && next) {
      args.keepOpenMs = parseNumber(next, args.keepOpenMs);
      i += 1;
      continue;
    }

    if (token === "--send") {
      args.send = true;
      continue;
    }

    if (token === "--headed") {
      args.headless = false;
      continue;
    }

    if (token === "--headless") {
      args.headless = true;
      continue;
    }
  }

  return args;
}

function toAbsolute(value) {
  if (!value) return "";
  if (path.isAbsolute(value)) return value;
  return path.resolve(process.cwd(), value);
}

function toRelative(absolutePath) {
  return path.relative(config.rootDir, absolutePath).replace(/\\/g, "/");
}

async function loadReportText(reportPath) {
  const text = await fs.readFile(reportPath, "utf8");
  const normalized = String(text || "").trim();
  if (!normalized) {
    throw new Error("Report file is empty.");
  }
  return normalized;
}

async function findVisibleLocator(page, selectors, timeoutMs) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    for (const selector of selectors) {
      const locator = page.locator(selector).first();
      const count = await locator.count();
      if (!count) continue;
      try {
        await locator.waitFor({ state: "visible", timeout: 450 });
        return { locator, selector };
      } catch (_err) {
        // keep polling
      }
    }
    await page.waitForTimeout(250);
  }

  return null;
}

async function pasteIntoPrompt(promptLocator, promptSelector, text) {
  await promptLocator.click();

  if (promptSelector.indexOf("textarea") >= 0) {
    await promptLocator.fill(text);
    return;
  }

  // ContentEditable fallback.
  await promptLocator.evaluate((node) => {
    node.textContent = "";
    node.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await promptLocator.type(text, { delay: 0 });
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.chatUrl) {
    throw new Error("chat url is required. Pass --chat-url https://chatgpt.com/c/...");
  }

  const reportPath = toAbsolute(args.reportPath);
  const reportText = await loadReportText(reportPath);
  const runId = args.runId || toRunFolderTimestamp(new Date());

  const runReportsDir = path.join(config.artifacts.reportsDir, runId);
  await ensureDir(runReportsDir);

  const resultPath = path.join(runReportsDir, "chatgpt-push.json");
  const screenshotPath = path.join(runReportsDir, "chatgpt-push.png");

  const context = await chromium.launchPersistentContext(toAbsolute(args.profileDir), {
    headless: typeof args.headless === "boolean" ? args.headless : false,
    viewport: config.viewports.desktop
  });

  let page;
  let promptInfo = null;
  let sendInfo = null;

  try {
    page = context.pages()[0] || await context.newPage();
    context.setDefaultTimeout(args.timeoutMs);

    await page.goto(args.chatUrl, {
      waitUntil: config.navigation.gotoWaitUntil,
      timeout: args.timeoutMs
    });

    try {
      await page.waitForLoadState(config.navigation.finalLoadState, {
        timeout: config.navigation.finalLoadTimeoutMs
      });
    } catch (_err) {
      // best effort
    }

    const promptSelectors = [
      "#prompt-textarea",
      "textarea#prompt-textarea",
      "textarea[data-testid='prompt-textarea']",
      "textarea[placeholder*='Message']",
      "textarea[placeholder*='Сообщение']",
      "div[contenteditable='true'][data-testid='composer-text-input']",
      "div[contenteditable='true']"
    ];

    promptInfo = await findVisibleLocator(page, promptSelectors, args.timeoutMs);
    if (!promptInfo) {
      throw new Error("Prompt field was not found. Open dialog and ensure ChatGPT is logged in.");
    }

    await pasteIntoPrompt(promptInfo.locator, promptInfo.selector, reportText);

    if (args.send) {
      const sendSelectors = [
        "button[data-testid='send-button']",
        "button[aria-label='Send message']",
        "button[aria-label='Отправить сообщение']",
        "button[aria-label*='Send']"
      ];
      sendInfo = await findVisibleLocator(page, sendSelectors, 15000);
      if (!sendInfo) {
        throw new Error("Send button was not found after paste.");
      }
      await sendInfo.locator.click();
      await page.waitForTimeout(1200);
    }

    await page.screenshot({ path: screenshotPath, fullPage: false });

    const result = {
      runId,
      timestamp: toIsoTimestamp(new Date()),
      chatUrl: args.chatUrl,
      finalUrl: page.url(),
      reportPath,
      reportLength: reportText.length,
      sendRequested: !!args.send,
      promptSelector: promptInfo.selector,
      sendSelector: sendInfo ? sendInfo.selector : "",
      artifacts: {
        screenshot: toRelative(screenshotPath),
        report: toRelative(resultPath)
      }
    };

    await fs.writeFile(resultPath, JSON.stringify(result, null, 2), "utf8");

    console.log("[audit:chatgpt:push] done");
    console.log(`- dialog: ${result.finalUrl}`);
    console.log(`- chars: ${result.reportLength}`);
    console.log(`- inserted: yes`);
    console.log(`- sent: ${args.send ? "yes" : "no"}`);
    console.log(`- screenshot: ${result.artifacts.screenshot}`);
    console.log(`- report: ${result.artifacts.report}`);

    if (!args.send && args.keepOpenMs > 0) {
      console.log(`- keeping browser open for ${args.keepOpenMs}ms`);
      await page.waitForTimeout(args.keepOpenMs);
    }
  } finally {
    await context.close();
  }
}

run().catch((error) => {
  console.error("[audit:chatgpt:push] failed");
  console.error(error.message);
  process.exitCode = 1;
});
