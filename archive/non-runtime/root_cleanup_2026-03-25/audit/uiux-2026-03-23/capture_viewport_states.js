const path=require('path');
const fs=require('fs');
const { chromium } = require('/tmp/pw-audit/node_modules/playwright');
const URL='https://afanasevvlad829-cyber.github.io/aidaplus-landing-dev/gpt.html';
const OUT='/Users/vladimirafanasev/aidaplus-dev/audit/uiux-2026-03-23/screens_viewport';
const VIEWPORTS=[
  {name:'desktop-1440x900',type:'desktop',w:1440,h:900},
  {name:'desktop-1280x800',type:'desktop',w:1280,h:800},
  {name:'desktop-1024x768',type:'desktop',w:1024,h:768},
  {name:'mobile-390x844',type:'mobile',w:390,h:844},
  {name:'mobile-430x932',type:'mobile',w:430,h:932},
  {name:'mobile-360x800',type:'mobile',w:360,h:800},
];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function click(page,sel,t=1400){try{await page.waitForSelector(sel,{state:'visible',timeout:t});await page.click(sel);return true;}catch{return false;}}
async function cap(page,name){await page.screenshot({path:path.join(OUT,name)});} 
async function run(v){
  const browser=await chromium.launch({headless:true});
  const ctx=await browser.newContext({viewport:{width:v.w,height:v.h},isMobile:v.type==='mobile',hasTouch:v.type==='mobile',deviceScaleFactor:v.type==='mobile'?3:1,userAgent:v.type==='mobile'?'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1':undefined});
  const page=await ctx.newPage();
  page.on('dialog',async d=>{await d.accept();});
  await page.addInitScript(()=>{try{localStorage.clear();sessionStorage.clear();}catch{}});
  await page.goto(URL,{waitUntil:'networkidle'});
  if(v.type==='desktop'){await click(page,'#desktopBtn'); await click(page,'#fullModeBtn');}
  else {await click(page,'#mobileBtn'); await click(page,'#mobileFullModeBtn');}
  await sleep(200);
  await cap(page,`${v.name}-01-initial.png`);

  await click(page,v.type==='desktop'?'#desktopAgeTabs [data-age="10-12"]':'#mobileAgeTabs [data-age="10-12"]');
  await sleep(160); await cap(page,`${v.name}-02-age.png`);

  await click(page,v.type==='desktop'?'#desktopShiftOptions .shift-option:nth-child(1)':'#mobileShiftOptions .shift-option:nth-child(1)');
  await sleep(180); await cap(page,`${v.name}-03-shift.png`);

  await click(page,v.type==='desktop'?'#desktopStartBtn':'#mobileStartBtn');
  await sleep(220); await cap(page,`${v.name}-04-cta-offer.png`);

  await click(page,'#offerApplyBtn',1000);
  await sleep(220); await cap(page,`${v.name}-05-form.png`);

  await click(page,'#formCloseBtn',600); await click(page,'#formDrawer',300);

  await click(page,v.type==='desktop'?'#compactModeBtn':'#mobileCompactModeBtn',1000);
  await sleep(180); await cap(page,`${v.name}-06-compact.png`);

  await page.evaluate(()=>document.getElementById('section-photos')?.scrollIntoView({behavior:'auto',block:'start'}));
  await sleep(180); await cap(page,`${v.name}-07-photos.png`);
  await click(page,'#photoGrid .photo-card:nth-child(1)',1200); await sleep(180); await cap(page,`${v.name}-08-photo-lightbox.png`); await click(page,'#mediaClose',700);

  await page.evaluate(()=>document.getElementById('section-videos')?.scrollIntoView({behavior:'auto',block:'start'}));
  await sleep(180); await cap(page,`${v.name}-09-videos.png`);
  await click(page,'#videoList .video-card:nth-child(1) .video-poster',1200); await sleep(180); await cap(page,`${v.name}-10-video-modal.png`); await click(page,'#mediaClose',700);

  await page.evaluate(()=>window.scrollTo(0,0)); await sleep(120);
  await click(page,v.type==='desktop'?'#compactModeBtn':'#mobileCompactModeBtn',900);
  await click(page,'.compact-trust-btn:nth-child(1)',1200); await sleep(180); await cap(page,`${v.name}-11-compact-trust.png`);

  await page.evaluate(()=>document.getElementById('section-reviews')?.scrollIntoView({behavior:'auto',block:'start'})); await sleep(180); await cap(page,`${v.name}-12-reviews.png`);
  await page.evaluate(()=>document.getElementById('section-faq')?.scrollIntoView({behavior:'auto',block:'start'})); await sleep(180); await cap(page,`${v.name}-13-faq.png`);
  await page.evaluate(()=>document.getElementById('section-contacts')?.scrollIntoView({behavior:'auto',block:'start'})); await sleep(180); await cap(page,`${v.name}-14-contacts.png`);

  await ctx.close(); await browser.close();
}
(async()=>{fs.mkdirSync(OUT,{recursive:true}); for(const v of VIEWPORTS){try{await run(v); console.log('ok',v.name);}catch(e){console.log('fail',v.name,e.message);}}})();
