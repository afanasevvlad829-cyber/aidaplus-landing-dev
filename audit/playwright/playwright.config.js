const path = require("path");

const ROOT_DIR = __dirname;

module.exports = {
  rootDir: ROOT_DIR,
  defaults: {
    baseURL: process.env.AUDIT_BASE_URL || "",
    viewportPreset: "desktop"
  },
  browser: {
    name: "chromium",
    headless: process.env.AUDIT_HEADLESS !== "false"
  },
  navigation: {
    gotoWaitUntil: "domcontentloaded",
    finalLoadState: "networkidle",
    timeoutMs: 30000,
    finalLoadTimeoutMs: 5000
  },
  viewports: {
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
  },
  artifacts: {
    rootDir: path.join(ROOT_DIR, "artifacts"),
    screenshotsDir: path.join(ROOT_DIR, "artifacts", "screenshots"),
    reportsDir: path.join(ROOT_DIR, "artifacts", "reports")
  },
  safety: {
    sameDomainOnly: true,
    dangerousActionSelectors: [
      "button[type='submit']",
      "[data-action='delete']",
      "[data-action='remove']",
      "[data-action='payment']"
    ]
  }
};
