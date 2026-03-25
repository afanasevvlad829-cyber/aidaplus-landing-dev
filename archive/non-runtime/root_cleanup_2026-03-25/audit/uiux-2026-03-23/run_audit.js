const fs = require('fs');
const path = require('path');
const { chromium } = require('/tmp/pw-audit/node_modules/playwright');

const URL = 'https://afanasevvlad829-cyber.github.io/aidaplus-landing-dev/gpt.html';
const OUT_DIR = '/Users/vladimirafanasev/aidaplus-dev/audit/uiux-2026-03-23';
const SHOTS_DIR = path.join(OUT_DIR, 'screens');

const viewports = [
  { name: 'desktop-1440x900', type: 'desktop', width: 1440, height: 900 },
  { name: 'desktop-1280x800', type: 'desktop', width: 1280, height: 800 },
  { name: 'desktop-1024x768', type: 'desktop', width: 1024, height: 768 },
  { name: 'mobile-390x844', type: 'mobile', width: 390, height: 844 },
  { name: 'mobile-430x932', type: 'mobile', width: 430, height: 932 },
  { name: 'mobile-360x800', type: 'mobile', width: 360, height: 800 },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function safeClick(page, selector, timeout = 2500) {
  try {
    await page.waitForSelector(selector, { timeout, state: 'visible' });
    await page.click(selector);
    return true;
  } catch {
    return false;
  }
}

async function screenshot(page, file) {
  await page.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: true });
}

async function measure(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const hasOverflowX = root.scrollWidth > window.innerWidth;
    const overflowNodes = [...document.querySelectorAll('*')]
      .filter(el => {
        const cs = getComputedStyle(el);
        return el.scrollWidth - el.clientWidth > 2 && cs.display !== 'inline';
      })
      .slice(0, 20)
      .map(el => ({
        tag: el.tagName,
        id: el.id || null,
        cls: (el.className || '').toString().slice(0, 120),
        sw: el.scrollWidth,
        cw: el.clientWidth
      }));

    return {
      innerWidth: window.innerWidth,
      scrollWidth: root.scrollWidth,
      hasOverflowX,
      overflowNodes,
      visible: {
        summaryBar: !!document.querySelector('#summaryBar') && !document.querySelector('#summaryBar').classList.contains('hidden'),
        offerOverlay: !!document.querySelector('#offerOverlay') && !document.querySelector('#offerOverlay').classList.contains('hidden'),
        formDrawer: !!document.querySelector('#formDrawer') && !document.querySelector('#formDrawer').classList.contains('hidden'),
        mediaLightbox: !!document.querySelector('#mediaLightbox') && !document.querySelector('#mediaLightbox').classList.contains('hidden'),
        compactTrustPanel: !!document.querySelector('#compactTrustPanel') && !document.querySelector('#compactTrustPanel').classList.contains('hidden')
      }
    }
  });
}

async function runViewport(browser, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    userAgent: vp.type === 'mobile'
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
      : undefined,
    deviceScaleFactor: vp.type === 'mobile' ? 3 : 1,
    isMobile: vp.type === 'mobile',
    hasTouch: vp.type === 'mobile'
  });

  const page = await context.newPage();
  const logs = { consoleErrors: [], pageErrors: [], failedRequests: [] };

  page.on('console', msg => {
    if (msg.type() === 'error') logs.consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => logs.pageErrors.push(err.message));
  page.on('requestfailed', req => logs.failedRequests.push({ url: req.url(), method: req.method(), failure: req.failure()?.errorText }));

  await page.addInitScript(() => {
    try { localStorage.clear(); sessionStorage.clear(); } catch {}
  });

  const result = { viewport: vp, steps: [], logs };

  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(600);

  // enforce target mode
  if (vp.type === 'desktop') {
    await safeClick(page, '#desktopBtn');
    await safeClick(page, '#fullModeBtn');
  } else {
    await safeClick(page, '#mobileBtn');
    await safeClick(page, '#mobileFullModeBtn');
  }
  await sleep(250);

  // Step 1: initial
  await screenshot(page, `${vp.name}-01-initial.png`);
  result.steps.push({ step: 'initial', measure: await measure(page) });

  // Step 2: age select
  const ageSel = vp.type === 'desktop' ? '#desktopAgeTabs [data-age="10-12"]' : '#mobileAgeTabs [data-age="10-12"]';
  const ageOk = await safeClick(page, ageSel);
  await sleep(250);
  await screenshot(page, `${vp.name}-02-age-selected.png`);
  result.steps.push({ step: 'age-select', ok: ageOk, measure: await measure(page) });

  // Step 3: shift select
  const shiftSel = vp.type === 'desktop' ? '#desktopShiftOptions .shift-option:nth-child(1)' : '#mobileShiftOptions .shift-option:nth-child(1)';
  const shiftOk = await safeClick(page, shiftSel);
  await sleep(250);
  await screenshot(page, `${vp.name}-03-shift-selected.png`);
  result.steps.push({ step: 'shift-select', ok: shiftOk, measure: await measure(page) });

  // Step 4: CTA click
  const ctaSel = vp.type === 'desktop' ? '#desktopStartBtn' : '#mobileStartBtn';
  const ctaOk = await safeClick(page, ctaSel);
  await sleep(500);
  await screenshot(page, `${vp.name}-04-cta.png`);
  result.steps.push({ step: 'cta-click', ok: ctaOk, measure: await measure(page) });

  // Step 5: open form from offer
  let formOpened = false;
  if (await safeClick(page, '#offerApplyBtn', 1500)) {
    await sleep(350);
    formOpened = true;
  } else if (await safeClick(page, '#desktopStartBtn', 1200) || await safeClick(page, '#mobileStartBtn', 1200)) {
    await sleep(350);
    formOpened = true;
  }
  await screenshot(page, `${vp.name}-05-form-open.png`);
  result.steps.push({ step: 'form-open', ok: formOpened, measure: await measure(page) });

  // Validate empty form submit
  let emptyValidationTriggered = false;
  if (await safeClick(page, '#submitLeadBtn', 1000)) {
    emptyValidationTriggered = true;
  }
  await sleep(250);
  result.steps.push({ step: 'form-empty-submit', ok: emptyValidationTriggered, measure: await measure(page) });

  // Fill and submit form
  let submitFilledOk = false;
  if (await safeClick(page, '#parentName', 1200)) {
    await page.fill('#parentName', 'Тест UX');
    await page.fill('#parentPhone', '+7 (999) 123-45-67');
    await safeClick(page, '#consentCheck', 600);
    submitFilledOk = await safeClick(page, '#submitLeadBtn', 800);
    await sleep(350);
  }
  await screenshot(page, `${vp.name}-06-form-submitted-attempt.png`);
  result.steps.push({ step: 'form-filled-submit', ok: submitFilledOk, measure: await measure(page) });

  // Close form if open
  await safeClick(page, '#formCloseBtn', 600);
  await safeClick(page, '#formDrawer', 400);

  // switch full/compact
  if (vp.type === 'desktop') {
    await safeClick(page, '#compactModeBtn');
  } else {
    await safeClick(page, '#mobileCompactModeBtn');
  }
  await sleep(300);
  await screenshot(page, `${vp.name}-07-compact-mode.png`);
  result.steps.push({ step: 'switch-compact', measure: await measure(page) });

  // switch desktop/mobile toggle (cross-check)
  if (vp.type === 'desktop') {
    await safeClick(page, '#mobileBtn');
    await sleep(250);
    await safeClick(page, '#desktopBtn');
  } else {
    await safeClick(page, '#desktopBtn');
    await sleep(250);
    await safeClick(page, '#mobileBtn');
  }
  await sleep(250);
  await screenshot(page, `${vp.name}-08-switch-view-back.png`);
  result.steps.push({ step: 'switch-view', measure: await measure(page) });

  // photo lightbox
  await page.evaluate(() => document.getElementById('section-photos')?.scrollIntoView({behavior:'auto', block:'start'}));
  await sleep(300);
  const photoOpen = await safeClick(page, '#photoGrid .photo-card:nth-child(1)');
  await sleep(250);
  await screenshot(page, `${vp.name}-09-photo-lightbox.png`);
  result.steps.push({ step: 'photo-lightbox', ok: photoOpen, measure: await measure(page) });
  await safeClick(page, '#mediaClose', 700);

  // video modal
  await page.evaluate(() => document.getElementById('section-videos')?.scrollIntoView({behavior:'auto', block:'start'}));
  await sleep(300);
  const videoOpen = await safeClick(page, '#videoList .video-card:nth-child(1) .video-poster');
  await sleep(250);
  await screenshot(page, `${vp.name}-10-video-modal.png`);
  result.steps.push({ step: 'video-modal', ok: videoOpen, measure: await measure(page) });
  await safeClick(page, '#mediaClose', 700);

  // compact trust panel
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(200);
  if (vp.type === 'desktop') {
    await safeClick(page, '#compactModeBtn');
  } else {
    await safeClick(page, '#mobileCompactModeBtn');
  }
  await sleep(250);
  const trustOpen = await safeClick(page, '.compact-trust-btn:nth-child(1)', 1500);
  await sleep(250);
  await screenshot(page, `${vp.name}-11-compact-trust-panel.png`);
  result.steps.push({ step: 'compact-trust-panel', ok: trustOpen, measure: await measure(page) });

  // reviews / faq / contacts
  await page.evaluate(() => document.getElementById('section-reviews')?.scrollIntoView({behavior:'auto', block:'start'}));
  await sleep(250);
  await screenshot(page, `${vp.name}-12-reviews.png`);
  result.steps.push({ step: 'reviews', measure: await measure(page) });

  await page.evaluate(() => document.getElementById('section-faq')?.scrollIntoView({behavior:'auto', block:'start'}));
  await sleep(250);
  await screenshot(page, `${vp.name}-13-faq.png`);
  result.steps.push({ step: 'faq', measure: await measure(page) });

  await page.evaluate(() => document.getElementById('section-contacts')?.scrollIntoView({behavior:'auto', block:'start'}));
  await sleep(250);
  await screenshot(page, `${vp.name}-14-contacts-map.png`);
  result.steps.push({ step: 'contacts-map', measure: await measure(page) });

  await context.close();
  return result;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const report = { generatedAt: new Date().toISOString(), url: URL, results: [] };

  for (const vp of viewports) {
    try {
      report.results.push(await runViewport(browser, vp));
    } catch (e) {
      report.results.push({ viewport: vp, fatal: e.message, stack: e.stack });
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT_DIR, 'audit-results.json'), JSON.stringify(report, null, 2));
  console.log('Saved:', path.join(OUT_DIR, 'audit-results.json'));
})();
