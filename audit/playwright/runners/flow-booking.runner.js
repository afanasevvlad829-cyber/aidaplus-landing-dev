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

function relativeToRoot(absPath) {
  return path.relative(config.rootDir, absPath).replace(/\\/g, "/");
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

async function waitShort(ms = 280) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function getUiState(page, tag) {
  return page.evaluate((tag) => {
    const activeTab = document.querySelector("#acTopNav [data-action='tab'].is-active");
    const priceBtn = document.querySelector(".ac-overlay-card--shifts [data-action='shift-price']");
    const fixBtn = document.querySelector(".ac-overlay-card--shifts [data-action='shift-fix']");
    const bookingBtn = document.querySelector(".ac-overlay-card--shifts [data-action='shift-booking']");
    const bookingForm = document.getElementById("acBookingForm");
    const bookingPhone = document.getElementById("acBookingPhone");
    const bookingName = document.getElementById("acBookingName");
    const bookingConsent = document.getElementById("acBookingConsent");
    const bookingSubmit = document.querySelector("[data-action='booking-submit']");
    const bookingNotice = document.getElementById("acBookingPromoNotice");

    return {
      tag,
      timestamp: new Date().toISOString(),
      mode: document.body.getAttribute("data-mode"),
      activeTab: activeTab ? activeTab.getAttribute("data-tab") : null,
      activeTabLabel: activeTab ? activeTab.textContent.trim() : null,
      stepStatus: (document.getElementById("acStepStatus") || {}).textContent || "",
      programSummary: (document.getElementById("acProgramSummary") || {}).textContent || "",
      shiftsOverlayOpen: !!document.querySelector("#acOverlayRoot .ac-overlay-card--shifts"),
      shiftPriceButton: priceBtn
        ? {
            text: priceBtn.textContent.trim(),
            disabled: !!priceBtn.disabled
          }
        : null,
      shiftFixButton: fixBtn
        ? {
            text: fixBtn.textContent.trim(),
            disabled: !!fixBtn.disabled
          }
        : null,
      shiftBookingButtonVisible: !!bookingBtn,
      bookingFormVisible: !!bookingForm && !bookingForm.hidden,
      bookingPhone: bookingPhone ? bookingPhone.value : "",
      bookingName: bookingName ? bookingName.value : "",
      bookingConsentChecked: bookingConsent ? !!bookingConsent.checked : false,
      bookingSubmitText: bookingSubmit ? String(bookingSubmit.textContent || "").trim() : "",
      bookingSubmitDisabled: bookingSubmit ? !!bookingSubmit.disabled : null,
      bookingNoticeText: bookingNotice && !bookingNotice.hidden
        ? String(bookingNotice.textContent || "").trim()
        : ""
    };
  }, tag);
}

async function takeStepScreenshot(page, outDir, index, name) {
  const fileName = `${String(index).padStart(2, "0")}-${name}.png`;
  const absPath = path.join(outDir, fileName);
  await page.screenshot({ path: absPath, fullPage: false });
  return absPath;
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

async function run() {
  const cli = parseCliArgs(process.argv.slice(2));
  const baseUrl = cli.url || process.env.AUDIT_URL || config.defaults.baseURL;
  if (!baseUrl) {
    throw new Error("URL is required. Use --url http://127.0.0.1:4173");
  }

  const viewport = cli.viewport || config.viewports.desktop;
  const runId = cli.runId || `flow-booking_${toRunFolderTimestamp(new Date())}`;

  const screenshotDir = path.join(config.artifacts.screenshotsDir, runId);
  const reportDir = path.join(config.artifacts.reportsDir, runId);
  await ensureDir(screenshotDir);
  await ensureDir(reportDir);

  const browser = await chromium.launch({
    headless: typeof cli.headless === "boolean" ? cli.headless : config.browser.headless
  });

  const steps = [];
  let stepIndex = 1;

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
          // ignore storage errors
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

    const pushStep = async (tag, shotName) => {
      const shotPath = await takeStepScreenshot(page, screenshotDir, stepIndex, shotName);
      const state = await getUiState(page, tag);
      steps.push({
        order: stepIndex,
        tag,
        screenshot: relativeToRoot(shotPath),
        state
      });
      stepIndex += 1;
    };

    await pushStep("initial_locked", "initial-locked");

    await ensureAgeSelected(page);
    await waitShort();
    await pushStep("age_selected", "age-selected");

    await page.click("#acStepNextBtn[data-action='step-next']");
    await page.waitForSelector("#acOverlayRoot .ac-overlay-card--shifts", { timeout: 10000 });
    await waitShort();
    await pushStep("shifts_overlay_open", "shifts-overlay-open");

    await page.click(".ac-overlay-card--shifts [data-action='shift-price']");
    await waitShort();
    await pushStep("price_click_1_checking", "price-click-1-checking");

    await page.waitForFunction(() => {
      const btn = document.querySelector(".ac-overlay-card--shifts [data-action='shift-price']");
      if (!btn) return false;
      if (btn.disabled) return false;
      return /улучшить цену/i.test(String(btn.textContent || ""));
    }, { timeout: 20000 });
    await waitShort();
    await pushStep("price_stage_1_ready", "price-stage-1-ready");

    await page.click(".ac-overlay-card--shifts [data-action='shift-price']");
    await page.waitForSelector("#acShiftFixPhone", { timeout: 10000 });
    await waitShort();
    await pushStep("price_stage_2_phone_gate", "price-stage-2-phone-gate");

    await page.click(".ac-overlay-card--shifts [data-action='shift-booking']");
    await page.waitForFunction(() => {
      const form = document.getElementById("acBookingForm");
      return !!form && !form.hidden;
    }, { timeout: 10000 });
    await waitShort();
    await pushStep("booking_form_open", "booking-form-open");

    const phone = String(process.env.AUDIT_BOOKING_PHONE || "79991234567");
    await page.fill("#acBookingPhone", phone);
    await page.fill("#acBookingName", String(process.env.AUDIT_BOOKING_NAME || "Тест"));
    await page.evaluate(() => {
      const consent = document.getElementById("acBookingConsent");
      if (!consent) return;
      consent.checked = true;
      consent.dispatchEvent(new Event("input", { bubbles: true }));
      consent.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await waitShort();
    await pushStep("booking_form_filled", "booking-form-filled");

    await page.click("[data-action='booking-submit']");
    await page.waitForFunction(() => {
      const submit = document.querySelector("[data-action='booking-submit']");
      const form = document.getElementById("acBookingForm");
      const hasDoneText = submit && /заявка отправлена/i.test(String(submit.textContent || ""));
      const hasSubmittedClass = form && form.classList.contains("is-submitted");
      let hasStoredLead = false;
      try {
        const lead = JSON.parse(localStorage.getItem("acBookingLeadV1") || "null");
        hasStoredLead = !!(lead && lead.submitted);
      } catch (_err) {
        hasStoredLead = false;
      }
      return !!(hasDoneText || hasSubmittedClass || hasStoredLead);
    }, { timeout: 15000 });
    await waitShort();
    await pushStep("booking_submitted", "booking-submitted");

    const report = {
      runId,
      timestamp: toIsoTimestamp(new Date()),
      url: baseUrl,
      viewport,
      flow: "age -> shifts -> improve price x2 -> booking -> fill form -> submit",
      steps
    };

    const reportPath = path.join(reportDir, "flow-booking.json");
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");

    const md = [
      "# Flow Booking Report",
      "",
      `- URL: ${baseUrl}`,
      `- Timestamp: ${report.timestamp}`,
      "",
      "| # | Step | Screenshot |",
      "|---|---|---|",
      ...steps.map((s) => `| ${s.order} | ${s.tag} | ${s.screenshot} |`),
      ""
    ].join("\n");
    const mdPath = path.join(reportDir, "index.md");
    await fs.writeFile(mdPath, md, "utf8");

    console.log("[audit:flow-booking] done");
    console.log(`- screenshots: ${relativeToRoot(screenshotDir)}`);
    console.log(`- report: ${relativeToRoot(reportPath)}`);
    console.log(`- index: ${relativeToRoot(mdPath)}`);
    console.log(`- steps: ${steps.length}`);

    await page.close();
    await context.close();
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error("[audit:flow-booking] failed");
  console.error(error.message);
  process.exitCode = 1;
});
