import { chromium } from 'playwright';

const BASE_URL = 'http://127.0.0.1:4173/gpt.html';

function now(){ return new Date().toISOString(); }

async function isVisible(page, selector){
  try { return await page.locator(selector).isVisible(); } catch { return false; }
}

async function sectionDisplayState(page, id){
  return page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return { exists:false, visible:false, display:'missing' };
    const style = window.getComputedStyle(el);
    const visible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    return { exists:true, visible, display:style.display };
  }, id);
}

async function run(){
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleErrors = [];
  const pageErrors = [];
  const runtime = { startedAt: now(), url: BASE_URL, checks: {} };

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    pageErrors.push(String(err));
  });

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);

  runtime.checks.baseline = {
    desktopViewVisible: await isVisible(page, '#desktopView:not(.hidden)'),
    mobileViewVisible: await isVisible(page, '#mobileView:not(.hidden)'),
    desktopJourneyExists: await page.locator('#section-journey').count(),
    desktopLegalExists: await page.locator('#section-legal').count(),
    mobileJourneyExists: await page.locator('#mobile-section-journey').count(),
    mobileLegalExists: await page.locator('#mobile-section-legal').count()
  };

  // Desktop full policy
  await page.click('#desktopBtn');
  await page.click('#fullModeBtn');
  await page.waitForTimeout(250);
  await page.click('#serviceMenu [data-nav="section-journey"]');
  await page.waitForTimeout(450);
  runtime.checks.desktopFull = {
    modalOpenedOnNav: await isVisible(page, '#sectionModal:not(.hidden)'),
    journeyTopAfterNavPx: await page.evaluate(() => {
      const el = document.getElementById('section-journey');
      return el ? Math.round(el.getBoundingClientRect().top) : null;
    }),
    sectionJourneyState: await sectionDisplayState(page, 'section-journey'),
    sectionLegalState: await sectionDisplayState(page, 'section-legal')
  };
  runtime.checks.desktopFull.policyOk = runtime.checks.desktopFull.modalOpenedOnNav === false;

  // Desktop compact policy
  await page.click('#compactModeBtn');
  await page.waitForTimeout(250);
  await page.click('#serviceMenu [data-nav="section-team"]');
  await page.waitForTimeout(350);
  const deskCompactTeamModal = await isVisible(page, '#sectionModal:not(.hidden)');
  const deskCompactTeamTitle = (await page.locator('#sectionModalTitle').textContent() || '').trim();
  if (deskCompactTeamModal) {
    await page.click('[data-action="close-section-modal"]');
    await page.waitForTimeout(120);
  }
  await page.click('#serviceMenu [data-nav="section-legal"]');
  await page.waitForTimeout(350);
  const deskCompactLegalModal = await isVisible(page, '#sectionModal:not(.hidden)');
  const deskCompactLegalTitle = (await page.locator('#sectionModalTitle').textContent() || '').trim();
  if (deskCompactLegalModal) {
    await page.click('[data-action="close-section-modal"]');
    await page.waitForTimeout(120);
  }

  runtime.checks.desktopCompact = {
    modalOnTeamNav: deskCompactTeamModal,
    teamModalTitle: deskCompactTeamTitle,
    modalOnLegalNav: deskCompactLegalModal,
    legalModalTitle: deskCompactLegalTitle,
    sectionJourneyState: await sectionDisplayState(page, 'section-journey'),
    sectionLegalState: await sectionDisplayState(page, 'section-legal')
  };
  runtime.checks.desktopCompact.policyOk = deskCompactTeamModal === true && deskCompactLegalModal === true;

  // Mobile full policy
  await page.click('#mobileBtn');
  await page.click('#mobileFullModeBtn');
  await page.waitForTimeout(280);
  await page.click('#mobileView .mobile-hero-nav [data-nav="section-journey"]');
  await page.waitForTimeout(450);
  runtime.checks.mobileFull = {
    modalOpenedOnNav: await isVisible(page, '#sectionModal:not(.hidden)'),
    journeyTopAfterNavPx: await page.evaluate(() => {
      const el = document.getElementById('mobile-section-journey');
      return el ? Math.round(el.getBoundingClientRect().top) : null;
    }),
    sectionJourneyState: await sectionDisplayState(page, 'mobile-section-journey'),
    sectionLegalState: await sectionDisplayState(page, 'mobile-section-legal')
  };
  runtime.checks.mobileFull.policyOk = runtime.checks.mobileFull.modalOpenedOnNav === false;

  // Mobile compact policy
  await page.click('#mobileCompactModeBtn');
  await page.waitForTimeout(280);
  await page.click('#mobileView .mobile-hero-nav [data-nav="section-faq"]');
  await page.waitForTimeout(350);
  const mobCompactFaqModal = await isVisible(page, '#sectionModal:not(.hidden)');
  const mobCompactFaqTitle = (await page.locator('#sectionModalTitle').textContent() || '').trim();
  if (mobCompactFaqModal) {
    await page.click('[data-action="close-section-modal"]');
    await page.waitForTimeout(120);
  }
  await page.click('#mobileView .mobile-hero-nav [data-nav="section-legal"]');
  await page.waitForTimeout(350);
  const mobCompactLegalModal = await isVisible(page, '#sectionModal:not(.hidden)');
  const mobCompactLegalTitle = (await page.locator('#sectionModalTitle').textContent() || '').trim();
  if (mobCompactLegalModal) {
    await page.click('[data-action="close-section-modal"]');
    await page.waitForTimeout(120);
  }

  runtime.checks.mobileCompact = {
    modalOnFaqNav: mobCompactFaqModal,
    faqModalTitle: mobCompactFaqTitle,
    modalOnLegalNav: mobCompactLegalModal,
    legalModalTitle: mobCompactLegalTitle,
    sectionJourneyState: await sectionDisplayState(page, 'mobile-section-journey'),
    sectionLegalState: await sectionDisplayState(page, 'mobile-section-legal')
  };
  runtime.checks.mobileCompact.policyOk = mobCompactFaqModal === true && mobCompactLegalModal === true;

  runtime.consoleErrors = consoleErrors;
  runtime.pageErrors = pageErrors;
  runtime.finishedAt = now();

  await browser.close();
  return runtime;
}

const summary = await run();
console.log(JSON.stringify(summary, null, 2));
