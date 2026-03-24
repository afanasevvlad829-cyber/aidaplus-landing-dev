const fs = require('fs');
const path = require('path');
const { chromium } = require('/tmp/pw-audit/node_modules/playwright');

const URL = 'https://afanasevvlad829-cyber.github.io/aidaplus-landing-dev/gpt.html';
const OUT = '/Users/vladimirafanasev/aidaplus-dev/audit/uiux-2026-03-23/metrics.json';
const viewports = [
  { name: 'desktop-1440x900', type: 'desktop', width: 1440, height: 900 },
  { name: 'desktop-1280x800', type: 'desktop', width: 1280, height: 800 },
  { name: 'desktop-1024x768', type: 'desktop', width: 1024, height: 768 },
  { name: 'mobile-390x844', type: 'mobile', width: 390, height: 844 },
  { name: 'mobile-430x932', type: 'mobile', width: 430, height: 932 },
  { name: 'mobile-360x800', type: 'mobile', width: 360, height: 800 },
];
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function c(page, sel, timeout=2000){
  try { await page.waitForSelector(sel,{state:'visible',timeout}); await page.click(sel); return true; }
  catch { return false; }
}
async function stat(page){
  return page.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
    visible: {
      offer: !!document.querySelector('#offerOverlay') && !document.querySelector('#offerOverlay').classList.contains('hidden'),
      form: !!document.querySelector('#formDrawer') && !document.querySelector('#formDrawer').classList.contains('hidden'),
      media: !!document.querySelector('#mediaLightbox') && !document.querySelector('#mediaLightbox').classList.contains('hidden'),
      trust: !!document.querySelector('#compactTrustPanel') && !document.querySelector('#compactTrustPanel').classList.contains('hidden'),
      summary: !!document.querySelector('#summaryBar') && !document.querySelector('#summaryBar').classList.contains('hidden')
    },
    counts: {
      shiftOptionsDesktop: document.querySelectorAll('#desktopShiftOptions .shift-option').length,
      shiftOptionsMobile: document.querySelectorAll('#mobileShiftOptions .shift-option').length,
      photoCards: document.querySelectorAll('#photoGrid .photo-card').length,
      videoCards: document.querySelectorAll('#videoList .video-card').length,
      faqGroups: document.querySelectorAll('#faqGroups .faq-group').length,
      reviewCards: document.querySelectorAll('#reviewsGrid .review-real').length,
      contactCards: document.querySelectorAll('#contactsGrid .contact-link').length
    }
  }));
}

(async()=>{
  const browser = await chromium.launch({headless:true});
  const report = {url:URL, generatedAt:new Date().toISOString(), results:[]};
  for(const vp of viewports){
    const ctx = await browser.newContext({
      viewport:{width:vp.width,height:vp.height},
      isMobile: vp.type==='mobile', hasTouch: vp.type==='mobile', deviceScaleFactor: vp.type==='mobile'?3:1,
      userAgent: vp.type==='mobile' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' : undefined
    });
    const page = await ctx.newPage();
    const row = { viewport: vp, events: { consoleErrors:[], pageErrors:[], failedRequests:[], dialogs:[] }, steps:{} };
    page.on('console', m=>{ if(m.type()==='error') row.events.consoleErrors.push(m.text()); });
    page.on('pageerror', e=> row.events.pageErrors.push(e.message));
    page.on('requestfailed', r=> row.events.failedRequests.push({url:r.url(), error:r.failure()?.errorText}));
    page.on('dialog', async d => { row.events.dialogs.push({type:d.type(),message:d.message()}); await d.accept(); });

    await page.addInitScript(()=>{ try{ localStorage.clear(); sessionStorage.clear(); }catch{} });
    await page.goto(URL,{waitUntil:'networkidle'});
    if(vp.type==='desktop'){ await c(page,'#desktopBtn'); await c(page,'#fullModeBtn'); }
    else { await c(page,'#mobileBtn'); await c(page,'#mobileFullModeBtn'); }
    await sleep(200);
    row.steps.initial = await stat(page);

    row.steps.ageSelected = { ok: await c(page, vp.type==='desktop' ? '#desktopAgeTabs [data-age="10-12"]' : '#mobileAgeTabs [data-age="10-12"]')};
    await sleep(120); row.steps.ageSelected.state = await stat(page);

    row.steps.shiftSelected = { ok: await c(page, vp.type==='desktop' ? '#desktopShiftOptions .shift-option:nth-child(1)' : '#mobileShiftOptions .shift-option:nth-child(1)')};
    await sleep(120); row.steps.shiftSelected.state = await stat(page);

    row.steps.cta = { ok: await c(page, vp.type==='desktop' ? '#desktopStartBtn' : '#mobileStartBtn')};
    await sleep(220); row.steps.cta.state = await stat(page);

    row.steps.offerApply = { ok: await c(page, '#offerApplyBtn', 1200) };
    await sleep(220); row.steps.offerApply.state = await stat(page);

    row.steps.compact = { ok: await c(page, vp.type==='desktop' ? '#compactModeBtn' : '#mobileCompactModeBtn')};
    await sleep(150); row.steps.compact.state = await stat(page);

    row.steps.switchView = { ok: true };
    if(vp.type==='desktop'){ await c(page,'#mobileBtn',700); await c(page,'#desktopBtn',700); }
    else { await c(page,'#desktopBtn',700); await c(page,'#mobileBtn',700); }
    await sleep(120); row.steps.switchView.state = await stat(page);

    await page.evaluate(()=>document.getElementById('section-photos')?.scrollIntoView({behavior:'auto',block:'start'}));
    row.steps.photoLightbox = { ok: await c(page,'#photoGrid .photo-card:nth-child(1)',1200) };
    await sleep(150); row.steps.photoLightbox.state = await stat(page);
    await c(page,'#mediaClose',700);

    await page.evaluate(()=>document.getElementById('section-videos')?.scrollIntoView({behavior:'auto',block:'start'}));
    row.steps.videoModal = { ok: await c(page,'#videoList .video-card:nth-child(1) .video-poster',1200) };
    await sleep(150); row.steps.videoModal.state = await stat(page);
    await c(page,'#mediaClose',700);

    await page.evaluate(()=>window.scrollTo(0,0));
    await c(page, vp.type==='desktop' ? '#compactModeBtn' : '#mobileCompactModeBtn',700);
    row.steps.compactTrust = { ok: await c(page,'.compact-trust-btn:nth-child(1)',1200)};
    await sleep(150); row.steps.compactTrust.state = await stat(page);

    await page.evaluate(()=>document.getElementById('section-reviews')?.scrollIntoView({behavior:'auto',block:'start'}));
    row.steps.reviews = await stat(page);
    await page.evaluate(()=>document.getElementById('section-faq')?.scrollIntoView({behavior:'auto',block:'start'}));
    row.steps.faq = await stat(page);
    await page.evaluate(()=>document.getElementById('section-contacts')?.scrollIntoView({behavior:'auto',block:'start'}));
    row.steps.contacts = await stat(page);

    await ctx.close();
    report.results.push(row);
  }
  await browser.close();
  fs.writeFileSync(OUT, JSON.stringify(report,null,2));
  console.log('saved', OUT);
})();
