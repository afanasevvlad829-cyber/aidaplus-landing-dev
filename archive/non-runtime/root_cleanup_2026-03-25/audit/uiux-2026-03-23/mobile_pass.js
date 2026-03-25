const path=require('path');
const fs=require('fs');
const { chromium } = require('/tmp/pw-audit/node_modules/playwright');
const URL='https://afanasevvlad829-cyber.github.io/aidaplus-landing-dev/gpt.html';
const OUT='/Users/vladimirafanasev/aidaplus-dev/audit/uiux-2026-03-23/screens';
const V=[{name:'mobile-390x844',w:390,h:844},{name:'mobile-430x932',w:430,h:932},{name:'mobile-360x800',w:360,h:800}];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function c(page,s,t=1500){try{await page.waitForSelector(s,{state:'visible',timeout:t});await page.click(s);return true;}catch{return false;}}
async function vis(page,s,t=1200){try{await page.waitForSelector(s,{state:'visible',timeout:t});return true;}catch{return false;}}
async function run(v){
  const browser=await chromium.launch({headless:true});
  const ctx=await browser.newContext({viewport:{width:v.w,height:v.h},isMobile:true,hasTouch:true,deviceScaleFactor:3,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'});
  const page=await ctx.newPage();
  page.on('dialog',async d=>{await d.accept();});
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear()}catch{}});
  await page.goto(URL,{waitUntil:'networkidle'});
  await c(page,'#mobileBtn'); await c(page,'#mobileFullModeBtn'); await sleep(200);
  const shot=async n=>page.screenshot({path:path.join(OUT,`${v.name}-${n}.png`),fullPage:true});
  await shot('01-initial');
  await c(page,'#mobileAgeTabs [data-age="10-12"]'); await sleep(150); await shot('02-age-selected');
  await c(page,'#mobileShiftOptions .shift-option:nth-child(1)'); await sleep(150); await shot('03-shift-selected');
  await c(page,'#mobileStartBtn'); await sleep(250); await shot('04-cta');
  await c(page,'#offerApplyBtn'); await sleep(250); await shot('05-form-open');
  if(await vis(page,'#submitLeadBtn',800)){
    await c(page,'#submitLeadBtn'); await sleep(120); await shot('06-form-empty-submit');
  }
  if(await vis(page,'#parentName',800)){
    await page.fill('#parentName','Тест');
    if(await vis(page,'#parentPhone',300)) await page.fill('#parentPhone','+7 (999) 123-45-67');
    await c(page,'#consentCheck',400);
    await c(page,'#submitLeadBtn',600);
    await sleep(180);
    await shot('07-form-filled-submit');
  }
  await c(page,'#formCloseBtn',600); await c(page,'#mobileCompactModeBtn',800); await sleep(200); await shot('08-compact');
  await page.evaluate(()=>document.getElementById('section-photos')?.scrollIntoView({behavior:'auto',block:'start'})); await sleep(180); await shot('09-photos');
  await c(page,'#photoGrid .photo-card:nth-child(1)',1200); await sleep(180); await shot('10-photo-lightbox'); await c(page,'#mediaClose',800);
  await page.evaluate(()=>document.getElementById('section-videos')?.scrollIntoView({behavior:'auto',block:'start'})); await sleep(180); await c(page,'#videoList .video-card:nth-child(1) .video-poster',1200); await sleep(180); await shot('11-video-modal'); await c(page,'#mediaClose',800);
  await page.evaluate(()=>document.getElementById('section-reviews')?.scrollIntoView({behavior:'auto',block:'start'})); await sleep(180); await shot('12-reviews');
  await page.evaluate(()=>document.getElementById('section-faq')?.scrollIntoView({behavior:'auto',block:'start'})); await sleep(180); await shot('13-faq');
  await page.evaluate(()=>document.getElementById('section-contacts')?.scrollIntoView({behavior:'auto',block:'start'})); await sleep(180); await shot('14-contacts');
  await ctx.close(); await browser.close();
}
(async()=>{fs.mkdirSync(OUT,{recursive:true}); for(const v of V){try{await run(v); console.log('ok',v.name);}catch(e){console.log('fail',v.name,e.message);}}})();
