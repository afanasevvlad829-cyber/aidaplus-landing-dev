const fs = require('fs');
const path = require('path');
const { chromium } = require('/tmp/pw-audit/node_modules/playwright');

const URL = 'https://afanasevvlad829-cyber.github.io/aidaplus-landing-dev/gpt.html';
const OUT_DIR = '/Users/vladimirafanasev/aidaplus-dev/audit/uiux-2026-03-23';
const SHOTS_DIR = path.join(OUT_DIR, 'screens');
const REPORT_FILE = path.join(OUT_DIR, 'audit-results.json');

const viewports = [
  { name: 'desktop-1440x900', type: 'desktop', width: 1440, height: 900 },
  { name: 'desktop-1280x800', type: 'desktop', width: 1280, height: 800 },
  { name: 'desktop-1024x768', type: 'desktop', width: 1024, height: 768 },
  { name: 'mobile-390x844', type: 'mobile', width: 390, height: 844 },
  { name: 'mobile-430x932', type: 'mobile', width: 430, height: 932 },
  { name: 'mobile-360x800', type: 'mobile', width: 360, height: 800 }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function safeClick(page, selector, timeout = 2200) {
  try {
    await page.waitForSelector(selector, { timeout, state: 'visible' });
    await page.click(selector);
    return true;
  } catch {
    return false;
  }
}

async function shot(page, file) {
  await page.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: true });
}

async function measure(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const overflow = root.scrollWidth > window.innerWidth;
    const overflowNodes = [...document.querySelectorAll('*')]
      .filter(el => {
        const cs = getComputedStyle(el);
        return cs.display !== 'inline' && el.scrollWidth - el.clientWidth > 2;
      })
      .slice(0, 12)
      .map(el => ({
        sel: el.id ? `#${el.id}` : (el.className ? `.${String(el.className).split(' ')[0]}` : el.tagName.toLowerCase()),
        sw: el.scrollWidth,
        cw: el.clientWidth
      }));

    return {
      width: window.innerWidth,
      scrollWidth: root.scrollWidth,
      overflowX: overflow,
      overflowNodes,
      visible: {
        summaryBar: !!document.querySelector('#summaryBar') && !document.querySelector('#summaryBar').classList.contains('hidden'),
        offerOverlay: !!document.querySelector('#offerOverlay') && !document.querySelector('#offerOverlay').classList.contains('hidden'),
        formDrawer: !!document.querySelector('#formDrawer') && !document.querySelector('#formDrawer').classList.contains('hidden'),
        mediaLightbox: !!document.querySelector('#mediaLightbox') && !document.querySelector('#mediaLightbox').classList.contains('hidden'),
        compactTrustPanel: !!document.querySelector('#compactTrustPanel') && !document.querySelector('#compactTrustPanel').classList.contains('hidden')
      }
    };
  });
}

async function runOne(browser, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.type === 'mobile',
    hasTouch: vp.type === 'mobile',
    deviceScaleFactor: vp.type === 'mobile' ? 3 : 1,
    userAgent: vp.type === 'mobile' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' : undefined
  });

  const page = await context.newPage();
  const out = { viewport: vp, steps: [], logs: { consoleErrors: [], pageErrors: [], failedRequests: [], dialogs: [] } };

  page.on('console', m => { if (m.type() === 'error') out.logs.consoleErrors.push(m.text()); });
  page.on('pageerror', e => out.logs.pageErrors.push(e.message));
  page.on('requestfailed', r => out.logs.failedRequests.push({ url: r.url(), error: r.failure()?.errorText }));
  page.on('dialog', async d => {
    out.logs.dialogs.push({ type: d.type(), message: d.message() });
    await d.accept();
  });

  await page.addInitScript(() => { try { localStorage.clear(); sessionStorage.clear(); } catch {} });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(500);

  if (vp.type === 'desktop') {
    await safeClick(page, '#desktopBtn');
    await safeClick(page, '#fullModeBtn');
  } else {
    await safeClick(page, '#mobileBtn');
    await safeClick(page, '#mobileFullModeBtn');
  }
  await sleep(200);

  const steps = [];
  const add = async (name, file, fn) => {
    const ok = fn ? await fn() : true;
    await sleep(180);
    await shot(page, `${vp.name}-${file}.png`);
    steps.push({ step: name, ok, measure: await measure(page) });
  };

  await add('initial', '01-initial');
  await add('age-select', '02-age-selected', async () => safeClick(page, vp.type === 'desktop' ? '#desktopAgeTabs [data-age="10-12"]' : '#mobileAgeTabs [data-age="10-12"]'));
  await add('shift-select', '03-shift-selected', async () => safeClick(page, vp.type === 'desktop' ? '#desktopShiftOptions .shift-option:nth-child(1)' : '#mobileShiftOptions .shift-option:nth-child(1)'));
  await add('cta-click', '04-cta', async () => safeClick(page, vp.type === 'desktop' ? '#desktopStartBtn' : '#mobileStartBtn'));
  await add('form-open', '05-form-open', async () => {
    if (await safeClick(page, '#offerApplyBtn', 1000)) return true;
    return safeClick(page, vp.type === 'desktop' ? '#desktopStartBtn' : '#mobileStartBtn', 1000);
  });
  await add('form-empty-submit', '06-form-empty-submit', async () => safeClick(page, '#submitLeadBtn', 1000));
  await add('form-filled-submit', '07-form-filled-submit', async () => {
    const can = await safeClick(page, '#parentName', 1000);
    if (!can) return false;
    await page.fill('#parentName', 'Тест UX');
    await page.fill('#parentPhone', '+7 (999) 123-45-67');
    await safeClick(page, '#consentCheck', 500);
    return safeClick(page, '#submitLeadBtn', 1000);
  });

  await safeClick(page, '#formCloseBtn', 500);
  await safeClick(page, '#formDrawer', 300);

  await add('switch-compact', '08-compact-mode', async () => safeClick(page, vp.type === 'desktop' ? '#compactModeBtn' : '#mobileCompactModeBtn'));
  await add('switch-view-back', '09-switch-view-back', async () => {
    if (vp.type === 'desktop') {
      await safeClick(page, '#mobileBtn', 700);
      await safeClick(page, '#desktopBtn', 700);
    } else {
      await safeClick(page, '#desktopBtn', 700);
      await safeClick(page, '#mobileBtn', 700);
    }
    return true;
  });

  await add('photo-lightbox', '10-photo-lightbox', async () => {
    await page.evaluate(() => document.getElementById('section-photos')?.scrollIntoView({ behavior: 'auto', block: 'start' }));
    return safeClick(page, '#photoGrid .photo-card:nth-child(1)', 1000);
  });
  await safeClick(page, '#mediaClose', 600);

  await add('video-modal', '11-video-modal', async () => {
    await page.evaluate(() => document.getElementById('section-videos')?.scrollIntoView({ behavior: 'auto', block: 'start' }));
    return safeClick(page, '#videoList .video-card:nth-child(1) .video-poster', 1000);
  });
  await safeClick(page, '#mediaClose', 600);

  await add('compact-trust-panel', '12-compact-trust-panel', async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await safeClick(page, vp.type === 'desktop' ? '#compactModeBtn' : '#mobileCompactModeBtn', 700);
    return safeClick(page, '.compact-trust-btn:nth-child(1)', 1200);
  });

  await add('reviews', '13-reviews', async () => {
    await page.evaluate(() => document.getElementById('section-reviews')?.scrollIntoView({ behavior: 'auto', block: 'start' }));
    return true;
  });
  await add('faq', '14-faq', async () => {
    await page.evaluate(() => document.getElementById('section-faq')?.scrollIntoView({ behavior: 'auto', block: 'start' }));
    return true;
  });
  await add('contacts-map', '15-contacts-map', async () => {
    await page.evaluate(() => document.getElementById('section-contacts')?.scrollIntoView({ behavior: 'auto', block: 'start' }));
    return true;
  });

  out.steps = steps;
  await context.close();
  return out;
}

(async () => {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = { generatedAt: new Date().toISOString(), url: URL, results: [] };
  for (const vp of viewports) {
    try {
      report.results.push(await runOne(browser, vp));
    } catch (e) {
      report.results.push({ viewport: vp, fatal: e.message });
    }
  }
  await browser.close();
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  console.log('done', REPORT_FILE);
})();
