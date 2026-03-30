(function(){
  if (typeof document === 'undefined') return;
  var id = 'ac-cdn-main-css';
  if (!document.getElementById(id)) {
    var style = document.createElement('style');
    style.id = id;
    style.textContent = "    :root{\n      --bg:#eef1f6;\n      --panel:#f7f8fb;\n      --card:#fff;\n      --line:#d9dee8;\n      --text:#1e2430;\n      --muted:#6d7586;\n      --accent:#ff8a00;\n      --accent-2:#ff9f2f;\n      --accent-soft:#fff1df;\n      --shadow:0 18px 40px rgb(20 29 45 / 8%);\n      --z-base:1;\n      --z-hero:2;\n      --z-summary:40;\n      --z-overlay:100;\n      --z-debug:120;\n      --hero-min-height-desktop:600px;\n      --hero-overlap-bottom:-32px;\n      --hero-overlap-y:30px;\n      --hero-overlap-y-hover:28px;\n      --desktop-booking-height:520px;\n      --section-modal-compact-width:clamp(360px,48vw,640px);\n      --section-modal-compact-max-height:min(56vh,500px);\n      --video-card-gap:12px;\n      --team-carousel-card-min:260px;\n      --team-carousel-card-max:300px;\n    }\n\n    *{box-sizing:border-box}\n\n    html,\n    body{\n      margin:0;\n      padding:0;\n      max-width:100%;\n      overflow-x:hidden;\n    }\n\n    body{\n      font-family:Inter,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;\n      background:var(--bg);\n      color:var(--text);\n      min-height:100vh;\n      -webkit-font-smoothing:antialiased;\n      -moz-osx-font-smoothing:grayscale;\n    }\n\n    .hidden{display:none !important}\n\n    .page{\n      max-width:1440px;\n      margin:0 auto;\n      padding:28px 24px 120px;\n    }\n\n    .debug-controls{\n      position:relative;\n      display:grid;\n      gap:8px;\n      margin-bottom:14px;\n      padding-right:40px;\n    }\n\n    .debug-controls-close{\n      position:absolute;\n      top:2px;\n      right:0;\n      width:34px;\n      height:34px;\n      border-radius:11px;\n      border:1px solid rgb(17 24 39 / 16%);\n      background:linear-gradient(180deg,#fff,#f4f7fb);\n      color:#111827;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .15s ease, box-shadow .15s ease;\n      z-index:4;\n    }\n\n    .debug-controls-close:hover{\n      transform:translateY(-1px);\n      box-shadow:0 12px 20px rgb(20 29 45 / 12%);\n    }\n\n    .debug-controls-close .ac-icon{\n      width:16px;\n      height:16px;\n      display:block;\n      object-fit:contain;\n    }\n\n    .mode-switch{\n      display:flex;\n      gap:8px;\n      padding:8px;\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:999px;\n      box-shadow:var(--shadow);\n    }\n\n    .mode-btn{\n      border:none;\n      border-radius:999px;\n      padding:10px 16px;\n      background:transparent;\n      color:var(--text);\n      font-weight:700;\n      font-size:14px;\n      cursor:pointer;\n    }\n\n    .mode-btn.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .mobile-mode-switch{\n      display:flex;\n      gap:6px;\n      align-items:center;\n    }\n\n    .mobile-mode-toggle{\n      border:none;\n      border-radius:999px;\n      min-height:34px;\n      padding:3px 6px 3px 4px;\n      display:inline-flex;\n      align-items:center;\n      gap:8px;\n      background:rgb(255 255 255 / 10%);\n      border:1px solid rgb(255 255 255 / 16%);\n      color:rgb(255 255 255 / 86%);\n      cursor:pointer;\n      transition:background .2s ease, border-color .2s ease;\n    }\n\n    .mobile-mode-toggle-track{\n      width:30px;\n      height:18px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 24%);\n      display:flex;\n      align-items:center;\n      padding:2px;\n      transition:background .2s ease;\n      flex:0 0 auto;\n    }\n\n    .mobile-mode-toggle-thumb{\n      width:14px;\n      height:14px;\n      border-radius:50%;\n      background:#fff;\n      transform:translateX(0);\n      transition:transform .2s ease;\n      box-shadow:0 2px 8px rgb(15 23 42 / 25%);\n    }\n\n    .mobile-mode-toggle-label{\n      font-size:11px;\n      font-weight:800;\n      white-space:nowrap;\n      letter-spacing:.01em;\n      padding-right:1px;\n    }\n\n    .mobile-mode-toggle.is-full{\n      background:rgb(255 138 0 / 20%);\n      border-color:rgb(255 159 47 / 40%);\n    }\n\n    .mobile-mode-toggle.is-full .mobile-mode-toggle-track{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n    }\n\n    .mobile-mode-toggle.is-full .mobile-mode-toggle-thumb{\n      transform:translateX(12px);\n    }\n\n    .mobile-mode-btn{\n      border:none;\n      border-radius:10px;\n      min-height:30px;\n      padding:0 10px;\n      background:transparent;\n      color:rgb(255 255 255 / 82%);\n      font-weight:700;\n      font-size:11px;\n      cursor:pointer;\n    }\n\n    .mobile-mode-btn.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .debug-tools{\n      display:flex;\n      justify-content:center;\n      margin:0;\n    }\n\n    .debug-reset-btn{\n      border:1px dashed #f2b275;\n      border-radius:999px;\n      padding:8px 14px;\n      background:#fff8ef;\n      color:#a24d00;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n    }\n\n    .debug-reset-btn:hover{\n      transform:translateY(-1px);\n      border-color:#e89c53;\n      box-shadow:0 10px 18px rgb(162 77 0 / 10%);\n    }\n\n    .screen{\n      border-radius:30px;\n      overflow:hidden;\n      background:var(--panel);\n      box-shadow:var(--shadow);\n      border:1px solid rgb(255 255 255 / 70%);\n      transition:box-shadow .2s ease;\n    }\n\n    .compact-mode .body-sections{\n      display:none !important;\n    }\n\n    .compact-mobile-hidden{\n      display:block;\n    }\n\n    .compact-mode .compact-mobile-hidden{\n      display:none;\n    }\n\n    .compact-mode .hero-shell{\n      min-height:460px;\n      margin-bottom:44px;\n    }\n\n    .compact-mode .screen{\n      overflow:visible;\n    }\n\n    .mobile-compact-mode .mobile-body-sections{\n      display:none !important;\n    }\n\n    /* compact trust panel removed: duplicated hero navigation / technical debt */\n\n    .compact-panel-photo-grid{\n      display:grid;\n      grid-template-columns:1fr 1fr;\n      gap:10px;\n    }\n\n    .compact-panel-photo{\n      border-radius:16px;\n      overflow:hidden;\n      border:1px solid var(--line);\n      background:#fff;\n      min-height:120px;\n    }\n\n    .compact-panel-photo img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n      aspect-ratio:4/3;\n    }\n\n    .compact-panel-video-list,\n    .compact-panel-review-list{\n      display:grid;\n      gap:10px;\n    }\n\n    .compact-panel-video-card,\n    .compact-panel-review-card{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:18px;\n      padding:14px;\n      box-shadow:var(--shadow);\n    }\n\n    .compact-panel-video-card h4,\n    .compact-panel-review-card strong{\n      display:block;\n      margin:0 0 8px;\n      font-size:14px;\n      line-height:1.4;\n    }\n\n    .compact-panel-video-card p,\n    .compact-panel-review-card span{\n      display:block;\n      margin:0 0 10px;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .compact-panel-link{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:40px;\n      padding:0 12px;\n      border-radius:12px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      text-decoration:none;\n      font-size:12px;\n      font-weight:800;\n    }\n\n    .hero-shell{\n      position:relative;\n      display:grid;\n      grid-template-columns:minmax(0, 1fr) 360px;\n      column-gap:24px;\n      align-items:start;\n      padding:36px 26px 40px;\n      min-height:var(--hero-min-height-desktop);\n      background:\n        linear-gradient(180deg, rgb(11 16 24 / 20%) 0%, rgb(11 16 24 / 74%) 100%),\n        radial-gradient(circle at 18% 18%, rgb(255 138 0 / 18%), transparent 28%),\n        radial-gradient(circle at 88% 12%, rgb(113 166 255 / 16%), transparent 26%),\n        linear-gradient(180deg, rgb(19 28 41 / 10%) 0%, rgb(19 28 41 / 32%) 62%, rgb(19 28 41 / 58%) 100%);\n      color:#fff;\n      overflow:visible;\n      z-index:3;\n      isolation:isolate;\n      border-bottom-left-radius:30px;\n      border-bottom-right-radius:30px;\n      background-clip:padding-box;\n    }\n\n    .hero-bg{\n      position:absolute;\n      inset:0;\n      z-index:0;\n      background-size:cover;\n      background-position:center;\n      transition:opacity 1.15s ease-in-out, transform 6s ease;\n      transform:scale(1.005);\n      opacity:0%;\n      will-change:opacity, transform;\n      border-bottom-left-radius:inherit;\n      border-bottom-right-radius:inherit;\n    }\n\n    /* TEMP DIAGNOSTIC: disable rotating hero background images to isolate seam/corner flicker */\n    .hero-bg{\n      display:none !important;\n    }\n\n    .hero-bg.hidden{\n      opacity:0%;\n    }\n\n    .hero-bg.active{\n      opacity:100%;\n      transform:scale(1.02);\n    }\n\n    .hero-shell::after{\n      content:\"\";\n      position:absolute;\n      inset:0;\n      background:\n        linear-gradient(90deg,\n          rgb(8 12 18 / 82%) 0%,\n          rgb(8 12 18 / 66%) 34%,\n          rgb(8 12 18 / 34%) 64%,\n          rgb(8 12 18 / 18%) 100%\n        ),\n        linear-gradient(180deg,\n          rgb(8 12 18 / 22%) 0%,\n          rgb(8 12 18 / 56%) 100%\n        );\n      pointer-events:none;\n      z-index:1;\n      border-bottom-left-radius:inherit;\n      border-bottom-right-radius:inherit;\n    }\n\n    .hero-overlay{\n      z-index:1;\n      pointer-events:none;\n    }\n\n    .hero-overlay::before{\n      z-index:0;\n    }\n\n    .mobile-hero{\n      min-height:unset;\n      padding:18px 16px 20px;\n      border-radius:30px;\n    }\n\n    .hero-topbar{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:12px;\n      margin-bottom:18px;\n      position:relative;\n      z-index:6;\n      grid-column:1 / -1;\n    }\n\n    .hero-left-tools{\n      display:flex;\n      align-items:flex-start;\n      gap:10px;\n      min-width:0;\n    }\n\n    .hero-brand-meta{\n      display:grid;\n      gap:6px;\n      align-items:start;\n      min-width:0;\n    }\n\n    .hero-brand-label{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      text-align:center;\n      font-size:12px;\n      font-weight:700;\n      color:rgb(255 255 255 / 86%);\n      line-height:1.3;\n      letter-spacing:.01em;\n      text-shadow:0 1px 2px rgb(0 0 0 / 24%);\n    }\n\n    .hero-mode-inline{\n      display:inline-flex;\n      gap:6px;\n      padding:4px;\n      border-radius:12px;\n      background:rgb(8 12 18 / 62%);\n      border:1px solid rgb(255 255 255 / 14%);\n      box-shadow:0 8px 24px rgb(0 0 0 / 18%);\n      backdrop-filter:blur(12px);\n    }\n\n    .mobile-mode-inline{\n      display:inline-flex;\n      gap:6px;\n      padding:6px;\n      border-radius:14px;\n      background:rgb(8 12 18 / 62%);\n      border:1px solid rgb(255 255 255 / 14%);\n      box-shadow:0 8px 24px rgb(0 0 0 / 18%);\n      backdrop-filter:blur(12px);\n    }\n\n    .hero-mode-inline .mode-btn{\n      min-height:28px;\n      padding:0 9px;\n      font-size:10px;\n      border-radius:9px;\n      background:transparent;\n      color:rgb(255 255 255 / 82%);\n      border:1px solid transparent;\n      box-shadow:none;\n    }\n\n    .hero-mode-inline .mode-btn.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      border-color:transparent;\n      box-shadow:0 10px 20px rgb(255 138 0 / 20%);\n    }\n\n    .brand{\n      display:flex;\n      align-items:center;\n      gap:10px;\n      padding:10px 14px 10px 12px;\n      border-radius:999px;\n      background:#fff;\n      color:#111827;\n      font-weight:700;\n      font-size:14px;\n      box-shadow:0 10px 25px rgb(0 0 0 / 8%);\n      white-space:nowrap;\n    }\n\n    .desktop-brand-mark{\n      width:72px;\n      height:72px;\n      padding:8px;\n      justify-content:center;\n      border-radius:16px;\n      background:rgb(8 12 18 / 58%);\n      border:1px solid rgb(255 255 255 / 22%);\n      box-shadow:0 12px 30px rgb(0 0 0 / 22%);\n      color:#fff;\n      backdrop-filter:blur(10px);\n    }\n\n    .desktop-brand-mark .brand-logo img{\n      object-fit:contain;\n      filter:drop-shadow(0 2px 4px rgb(0 0 0 / 28%));\n    }\n\n    .brand-logo{\n      width:100%;\n      height:100%;\n      flex:0 0 auto;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n    }\n\n    .brand-logo svg,\n    .brand-logo img{\n      width:100%;\n      height:100%;\n      display:block;\n    }\n\n    .brand-dot{\n      width:10px;\n      height:10px;\n      border-radius:50%;\n      background:var(--accent);\n      flex:0 0 auto;\n    }\n\n    .hero-menu{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n      justify-content:flex-end;\n      position:relative;\n      z-index:7;\n    }\n\n    .menu-pill{\n      padding:10px 14px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 90%);\n      color:#1f2937;\n      font-size:12px;\n      font-weight:600;\n      box-shadow:0 8px 20px rgb(0 0 0 / 6%);\n      cursor:pointer;\n      border:none;\n      transition:transform .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease;\n    }\n\n    .menu-pill.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .menu-pill:hover{\n      transform:translateY(-1px);\n      box-shadow:0 12px 24px rgb(20 29 45 / 10%);\n    }\n\n    .hero-content{\n      max-width:none;\n      width:auto;\n      position:relative;\n      z-index:6;\n      padding-right:0;\n      padding-bottom:24px;\n      min-width:0;\n    }\n\n    .hero-shell:not(.mobile-hero) .hero-content .hero-tag{\n      display:none;\n    }\n\n    .hero-tag{\n      display:inline-flex;\n      align-items:center;\n      gap:8px;\n      padding:10px 13px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 18%);\n      border:1px solid rgb(255 255 255 / 18%);\n      font-size:12px;\n      margin-bottom:18px;\n      backdrop-filter:blur(8px);\n      box-shadow:inset 0 1px 0 rgb(255 255 255 / 8%);\n    }\n\n    .hero-title{\n      margin:0 0 20px;\n      font-size:clamp(56px, 4.15vw, 64px);\n      font-weight:800;\n      line-height:1;\n      letter-spacing:-.03em;\n      max-width:680px;\n    }\n\n    .mobile-hero .hero-content h2{\n      font-size:28px;\n      line-height:1.1;\n      max-width:none;\n    }\n\n    .hero-sub{\n      color:rgb(255 255 255 / 84%);\n      font-size:18px;\n      line-height:1.5;\n      margin-bottom:28px;\n      max-width:820px;\n    }\n\n    .mobile-hero .hero-sub{\n      font-size:15px;\n      margin-bottom:16px;\n    }\n\n    .hero-slogan{\n      display:inline-block;\n      margin-top:0;\n      font-size:15px;\n      font-weight:600;\n      color:#fff;\n      background:rgb(255 255 255 / 12%);\n      border:1px solid rgb(255 255 255 / 18%);\n      padding:10px 18px;\n      border-radius:999px;\n      backdrop-filter:blur(6px);\n    }\n\n    .hero-proofline{\n      display:flex;\n      flex-wrap:wrap;\n      gap:10px;\n      margin-top:16px;\n    }\n\n    .mobile-hero .hero-proofline{\n      gap:8px;\n      margin-top:14px;\n    }\n\n    .mobile-hero .hero-proofline span{\n      font-size:11px;\n      padding:7px 9px;\n    }\n\n    .hero-proofline span{\n      display:inline-flex;\n      align-items:center;\n      gap:6px;\n      padding:8px 10px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 12%);\n      border:1px solid rgb(255 255 255 / 12%);\n      font-size:12px;\n      color:rgb(255 255 255 / 90%);\n      backdrop-filter:blur(8px);\n    }\n\n    .feature-row{\n      display:flex;\n      gap:10px;\n      flex-wrap:wrap;\n    }\n\n    .hero-benefits-grid{\n      margin-top:20px;\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      gap:14px 16px;\n      width:100%;\n      max-width:980px;\n    }\n\n    .hero-benefit-card{\n      border:1px solid rgb(255 255 255 / 16%);\n      background:linear-gradient(135deg, rgb(8 12 18 / 48%), rgb(8 12 18 / 34%));\n      border-radius:20px;\n      padding:18px 20px;\n      box-shadow:0 18px 34px rgb(0 0 0 / 20%);\n      backdrop-filter:blur(8px);\n      min-height:96px;\n      display:grid;\n      gap:8px;\n    }\n\n    .hero-benefits-grid .hero-benefit-card:first-child{\n      min-height:108px;\n      border-color:rgb(255 159 47 / 34%);\n      box-shadow:0 22px 36px rgb(255 138 0 / 14%);\n    }\n\n    .hero-benefit-card strong{\n      display:block;\n      color:#fff;\n      font-size:20px;\n      line-height:1.25;\n      letter-spacing:-.01em;\n    }\n\n    .hero-benefit-card span{\n      display:block;\n      color:rgb(255 255 255 / 78%);\n      font-size:16px;\n      line-height:1.4;\n    }\n\n    .hero-shell:not(.mobile-hero) .feature-row{\n      margin-top:10px;\n    }\n\n    .hero-shell:not(.mobile-hero) .hero-proofline,\n    .hero-shell:not(.mobile-hero) .feature-row{\n      justify-content:center;\n    }\n\n    .feature-pill{\n      padding:11px 13px;\n      border-radius:16px;\n      background:rgb(0 0 0 / 22%);\n      border:1px solid rgb(255 255 255 / 14%);\n      font-size:12px;\n      min-width:132px;\n      backdrop-filter:blur(10px);\n      transition:transform .18s ease, border-color .18s ease, background .18s ease;\n    }\n\n    .feature-pill:hover{\n      transform:translateY(-1px);\n      border-color:rgb(255 255 255 / 22%);\n      background:rgb(0 0 0 / 26%);\n    }\n\n    .feature-pill strong{\n      display:block;\n      font-size:12px;\n      margin-bottom:3px;\n    }\n\n    .occupancy-badge{\n      display:inline-flex;\n      align-items:center;\n      gap:7px;\n      margin-top:18px;\n      margin-bottom:20px;\n      padding:11px 13px;\n      border-radius:999px;\n      background:rgb(255 138 0 / 18%);\n      border:1px solid rgb(255 138 0 / 34%);\n      color:#fff3e0;\n      font-size:12px;\n      font-weight:700;\n    }\n\n    .hero-shell:not(.mobile-hero) .occupancy-badge{\n      margin-bottom:10px;\n    }\n\n    .hero-booking-card{\n      position:relative;\n      right:auto;\n      top:auto;\n      width:100%;\n      max-width:356px;\n      margin-left:auto;\n      margin-top:42px;\n      margin-bottom:var(--hero-overlap-bottom);\n      padding:24px;\n      border-radius:30px;\n      background:rgb(12 17 24 / 76%);\n      border:1px solid rgb(255 255 255 / 10%);\n      backdrop-filter:blur(18px);\n      box-shadow:0 24px 70px rgb(0 0 0 / 34%);\n      color:#fff;\n      transition:transform .2s ease, box-shadow .2s ease;\n      z-index:3;\n      box-sizing:border-box;\n      transform:translateY(var(--hero-overlap-y));\n    }\n\n    .hero-booking-card:hover{\n      transform:translateY(var(--hero-overlap-y-hover));\n      box-shadow:0 28px 76px rgb(0 0 0 / 36%);\n    }\n\n    #desktop-booking-card{\n      height:var(--desktop-booking-height);\n      min-height:var(--desktop-booking-height);\n      max-height:var(--desktop-booking-height);\n      display:flex;\n      flex-direction:column;\n      overflow:hidden;\n    }\n\n    #desktop-booking-card .booking-step-2{\n      display:flex;\n      flex-direction:column;\n      min-height:0;\n    }\n\n    #desktop-booking-card .shift-list{\n      max-height:none;\n      overflow:visible;\n      padding-right:0;\n    }\n\n    #desktop-booking-card .booking-step-3{\n      margin-top:12px;\n    }\n\n    .hero-booking-card,\n    .mobile-booking-card,\n    .booking-price-box,\n    .shift-option,\n    .feature-pill,\n    .section-card{\n      box-sizing:border-box;\n      max-width:100%;\n    }\n\n    .hero-shell,\n    .page,\n    .body-sections,\n    .mobile-body-sections{\n      overflow-x:clip;\n    }\n\n    .mobile-booking-card{\n      position:static !important;\n      width:100% !important;\n      max-width:100% !important;\n      margin-top:18px;\n      padding:18px;\n      border-radius:24px;\n      background:rgb(12 17 24 / 78%);\n      border:1px solid rgb(255 255 255 / 10%);\n      backdrop-filter:blur(18px);\n      box-shadow:0 22px 60px rgb(0 0 0 / 30%);\n    }\n\n    .mobile-booking-card .guided-inline-hint{\n      background:rgb(255 255 255 / 6%);\n      border-color:rgb(255 255 255 / 8%);\n    }\n\n    .mobile-booking-card .booking-step-2{\n      align-content:start;\n      gap:6px;\n    }\n\n    .booking-step-block{\n      display:grid;\n      gap:8px;\n    }\n\n    .booking-step-block + .booking-step-block{\n      margin-top:12px;\n    }\n\n    .booking-stage-1 #desktop-booking-info,\n    .booking-stage-1 #mobile-booking-info{\n      display:none;\n    }\n\n    .booking-stage-1 .booking-step-2 .guided-callout,\n    .booking-stage-1 .booking-step-2 .guided-inline-hint,\n    .booking-stage-1 .booking-step-2 .shift-calendar-discovery,\n    .booking-stage-1 .booking-step-2 .selected-shift-chip,\n    .booking-stage-1 .booking-step-2 .shift-list,\n    .booking-stage-1 .booking-step-2 .booking-all-shifts-link,\n    .booking-stage-2 .booking-step-3{\n      display:none;\n    }\n\n    .booking-stage-3 .shift-list-veil{\n      display:none;\n    }\n\n    .booking-stage-3 .booking-step-2 .guided-callout,\n    .booking-stage-3 .booking-step-2 .guided-inline-hint,\n    .booking-stage-3 .booking-step-2 .shift-calendar-discovery,\n    .booking-stage-3 .booking-step-2 .selected-shift-chip{\n      display:none;\n    }\n\n    .booking-stage-4 .guided-callout,\n    .booking-stage-4 .guided-inline-hint,\n    .booking-stage-4 .shift-list-veil,\n    .booking-stage-4 .shift-calendar-discovery,\n    .booking-stage-4 .trust-mini{\n      display:none;\n    }\n\n    .booking-stage-3 .booking-hint,\n    .booking-stage-4 .booking-hint{\n      display:none !important;\n    }\n\n    .booking-stage-4 .booking-save-btn{\n      display:block;\n    }\n\n    .selected-shift-chip{\n      display:none;\n      align-items:center;\n      gap:8px;\n      margin:0 0 8px;\n      padding:10px 12px;\n      border-radius:14px;\n      background:rgb(255 255 255 / 10%);\n      border:1px solid rgb(255 255 255 / 12%);\n      color:#fff;\n      font-size:12px;\n      font-weight:800;\n      width:max-content;\n      max-width:100%;\n    }\n\n    .selected-shift-chip.visible{\n      display:inline-flex;\n    }\n\n    .selected-shift-chip button{\n      border:none;\n      width:22px;\n      height:22px;\n      border-radius:8px;\n      background:rgb(255 255 255 / 12%);\n      color:#fff;\n      font-size:13px;\n      font-weight:900;\n      cursor:pointer;\n      flex:0 0 auto;\n    }\n\n    .shift-list.collapsed{\n      display:none;\n    }\n\n    .mobile-booking-card h3{\n      font-size:20px;\n      margin:0 0 6px;\n    }\n\n    .mobile-booking-card p{\n      font-size:13px;\n      line-height:1.5;\n      margin:0 0 10px;\n    }\n\n    .hero-booking-card h3{\n      margin:0 0 8px;\n      font-size:21px;\n      letter-spacing:-.02em;\n    }\n\n    .hero-booking-card p{\n      margin:0 0 14px;\n      color:rgb(255 255 255 / 72%);\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .booking-steps{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:0;\n      margin-bottom:20px;\n      padding:2px 2px 0;\n      pointer-events:none;\n    }\n\n    .booking-step{\n      position:relative;\n      flex:1 1 0;\n      min-width:0;\n      display:grid;\n      justify-items:center;\n      gap:6px;\n      padding:0 6px;\n      text-align:center;\n      font-size:12px;\n      font-weight:800;\n      color:rgb(255 255 255 / 60%);\n      transition:color .18s ease;\n      cursor:default;\n      user-select:none;\n    }\n\n    .booking-step::before{\n      content:attr(data-step);\n      width:28px;\n      height:28px;\n      border-radius:50%;\n      border:1px solid rgb(255 255 255 / 24%);\n      background:rgb(255 255 255 / 8%);\n      color:rgb(255 255 255 / 74%);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:12px;\n      font-weight:900;\n      box-sizing:border-box;\n    }\n\n    .booking-step::after{\n      content:\"\";\n      position:absolute;\n      top:14px;\n      left:calc(50% + 20px);\n      width:calc(100% - 40px);\n      height:2px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 18%);\n      pointer-events:none;\n    }\n\n    .booking-step:last-child::after{\n      display:none;\n    }\n\n    .mobile-booking-card .booking-step{\n      font-size:10px;\n      padding:0 4px;\n    }\n\n    .booking-step.active{\n      color:#fff;\n    }\n\n    .booking-step.active::before{\n      border-color:transparent;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      box-shadow:0 10px 22px rgb(255 138 0 / 34%);\n    }\n\n    .booking-step.done{\n      color:#fff;\n    }\n\n    .booking-step.done::before{\n      content:\"✓\";\n      border-color:rgb(255 255 255 / 26%);\n      background:rgb(255 255 255 / 16%);\n      color:#fff;\n    }\n\n    .booking-step.done::after{\n      background:linear-gradient(90deg,var(--accent),var(--accent-2));\n    }\n\n    .booking-step.pulse{\n      animation:none;\n    }\n\n    .age-tabs{\n      display:flex;\n      gap:12px;\n      margin-bottom:8px;\n      align-items:stretch;\n    }\n\n    .guided-label{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      margin:0 0 8px;\n      font-size:12px;\n      font-weight:800;\n      color:rgb(255 255 255 / 86%);\n      letter-spacing:.02em;\n    }\n\n    .guided-dot{\n      width:8px;\n      height:8px;\n      border-radius:50%;\n      background:var(--accent-2);\n      flex:0 0 auto;\n      box-shadow:0 0 0 4px rgb(255 159 47 / 12%);\n    }\n\n    .guided-callout{\n      margin:0 0 12px;\n      padding:11px 12px;\n      border-radius:14px;\n      background:rgb(255 255 255 / 8%);\n      border:1px solid rgb(255 255 255 / 10%);\n      color:rgb(255 255 255 / 78%);\n      font-size:12px;\n      line-height:1.5;\n    }\n\n    .guided-inline-hint{\n      margin:10px 0 0;\n      padding:10px 12px;\n      border-radius:12px;\n      background:rgb(255 255 255 / 8%);\n      border:1px solid rgb(255 255 255 / 10%);\n      color:rgb(255 255 255 / 82%);\n      font-size:12px;\n      line-height:1.5;\n      opacity:0%;\n      transform:translateY(-4px);\n      pointer-events:none;\n      transition:opacity .2s ease, transform .2s ease;\n      min-height:0;\n    }\n\n    .guided-inline-hint.visible{\n      opacity:100%;\n      transform:translateY(0);\n    }\n\n    .mobile-booking-card .guided-inline-hint:not(.visible){\n      display:none;\n      margin:0;\n      padding:0;\n      border:0;\n    }\n\n    .guided-pulse{\n      animation:guided-pulse 1.2s ease 2;\n    }\n\n    @keyframes guided-pulse{\n      0%{ box-shadow:0 0 0 0 rgb(255 138 0 / 0%); }\n\n      35%{ box-shadow:0 0 0 8px rgb(255 138 0 / 12%); }\n\n      100%{ box-shadow:0 0 0 0 rgb(255 138 0 / 0%); }\n    }\n\n    .section-card h3 + p.section-lead{\n      margin:0 0 12px;\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n    }\n\n    .selected-age-chip{\n      display:none;\n      align-items:center;\n      gap:10px;\n      margin:0 0 12px;\n      padding:10px 12px;\n      border-radius:14px;\n      background:rgb(255 255 255 / 10%);\n      border:1px solid rgb(255 255 255 / 12%);\n      color:#fff;\n      font-size:12px;\n      font-weight:800;\n      width:max-content;\n      max-width:100%;\n    }\n\n    .selected-age-chip.visible{\n      display:inline-flex;\n    }\n\n    .selected-age-chip button{\n      border:none;\n      width:24px;\n      height:24px;\n      border-radius:8px;\n      background:rgb(255 255 255 / 12%);\n      color:#fff;\n      font-size:14px;\n      font-weight:900;\n      cursor:pointer;\n      flex:0 0 auto;\n    }\n\n    .mobile-booking-card .booking-step-1{\n      display:flex;\n      flex-wrap:wrap;\n      gap:8px;\n      align-items:center;\n    }\n\n    .mobile-booking-card .booking-step-1 .age-tabs{\n      width:100%;\n      margin-bottom:0;\n    }\n\n    .mobile-booking-card.has-mobile-summary-chips .booking-step-1 .selected-age-chip,\n    .mobile-booking-card.has-mobile-summary-chips .booking-step-1 .selected-shift-chip{\n      margin:0;\n      width:auto;\n      max-width:calc(50% - 4px);\n      min-width:0;\n      padding:8px 10px;\n      border-radius:12px;\n      font-size:11px;\n      white-space:nowrap;\n      overflow:hidden;\n      text-overflow:ellipsis;\n    }\n\n    .age-tabs.hidden{\n      display:none !important;\n    }\n\n    .age-tab{\n      flex:1;\n      border:1px solid rgb(255 255 255 / 14%);\n      border-radius:19px;\n      padding:16px 14px;\n      min-height:170px;\n      background:rgb(255 255 255 / 10%);\n      color:#fff;\n      cursor:pointer;\n      transition:transform .15s ease, background .15s ease, box-shadow .15s ease, border-color .15s ease;\n      text-align:left;\n      display:grid;\n      gap:7px;\n      align-content:start;\n      position:relative;\n      overflow:hidden;\n    }\n\n    .age-tab.active{\n      background:linear-gradient(135deg, var(--accent), var(--accent-2));\n      box-shadow:0 8px 18px rgb(255 138 0 / 18%);\n      border-color:transparent;\n    }\n\n    .age-tab:hover{\n      transform:translateY(-1px);\n    }\n\n    .age-tab-range{\n      display:block;\n      font-size:20px;\n      font-weight:900;\n      line-height:1;\n      letter-spacing:-.02em;\n      color:#fff;\n      margin-bottom:4px;\n    }\n\n    .age-tab-track{\n      display:block;\n      font-size:16px;\n      font-weight:800;\n      line-height:1.3;\n      color:rgb(255 255 255 / 96%);\n    }\n\n    .age-tab-note{\n      display:block;\n      font-size:13px;\n      line-height:1.42;\n      color:rgb(255 255 255 / 80%);\n    }\n\n    .age-tab::after{\n      content:\"\";\n      position:absolute;\n      right:10px;\n      bottom:10px;\n      width:22px;\n      height:22px;\n      border-radius:8px;\n      background:rgb(255 255 255 / 12%);\n      background-repeat:no-repeat;\n      background-position:center;\n      background-size:14px 14px;\n      opacity:.86;\n    }\n\n    .age-tab[data-track=\"track-1\"]{\n      background:\n        radial-gradient(circle at 18% 18%, rgb(255 191 84 / 30%), transparent 48%),\n        linear-gradient(135deg, rgb(255 169 33 / 30%), rgb(255 138 0 / 22%));\n    }\n\n    .age-tab[data-track=\"track-1\"]::after{\n      background-image:url('https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/clipboard.svg');\n    }\n\n    .age-tab[data-track=\"track-2\"]{\n      background:\n        radial-gradient(circle at 18% 18%, rgb(115 180 255 / 24%), transparent 48%),\n        linear-gradient(135deg, rgb(38 67 110 / 48%), rgb(20 39 70 / 42%));\n    }\n\n    .age-tab[data-track=\"track-2\"]::after{\n      background-image:url('https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/code-xml.svg');\n    }\n\n    .age-tab[data-track=\"track-3\"]{\n      background:\n        radial-gradient(circle at 18% 18%, rgb(138 173 255 / 26%), transparent 48%),\n        linear-gradient(135deg, rgb(44 45 74 / 58%), rgb(24 26 44 / 48%));\n    }\n\n    .age-tab[data-track=\"track-3\"]::after{\n      background-image:url('https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/sparkle.svg');\n    }\n\n    .shift-option{\n      border-radius:16px;\n      background:#fff;\n      color:#111827;\n      padding:13px 14px;\n      margin-bottom:10px;\n      display:grid;\n      gap:10px;\n      font-size:13px;\n      cursor:pointer;\n      border:1px solid transparent;\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .shift-option-head{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:10px;\n    }\n\n    .shift-option-head small{\n      margin:0;\n      text-align:right;\n      color:#6f7788;\n      font-weight:600;\n    }\n\n    .shift-option-actions{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n    }\n\n    .shift-option-action{\n      min-height:32px;\n      border-radius:10px;\n      border:1px solid #d8deea;\n      background:#f7f9fc;\n      color:#1f2937;\n      font-size:12px;\n      font-weight:800;\n      padding:0 10px;\n      cursor:pointer;\n      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n    }\n\n    .shift-option-action:hover{\n      transform:translateY(-1px);\n      border-color:#c4cede;\n      box-shadow:0 8px 14px rgb(17 24 39 / 10%);\n    }\n\n    #desktop-shift-options .shift-option{\n      padding:16px 16px 14px;\n      gap:12px;\n      border-radius:18px;\n      margin-bottom:12px;\n    }\n\n    #desktop-shift-options .shift-option strong{\n      font-size:19px;\n      line-height:1.2;\n      letter-spacing:-.01em;\n    }\n\n    #desktop-shift-options .shift-option-head small{\n      font-size:14px;\n      line-height:1.25;\n      color:#5f6779;\n    }\n\n    #desktop-shift-options .shift-option-action{\n      min-height:36px;\n      font-size:13px;\n      padding:0 12px;\n    }\n\n    .booking-all-shifts-link{\n      display:block;\n      width:max-content;\n      max-width:100%;\n      margin:6px auto 0;\n      padding:0;\n      border:0;\n      background:none;\n      color:rgb(255 255 255 / 74%);\n      font-size:12px;\n      font-weight:600;\n      line-height:1.4;\n      text-decoration:underline;\n      text-underline-offset:3px;\n      cursor:pointer;\n      transition:color .15s ease;\n    }\n\n    .booking-all-shifts-link:hover{\n      color:rgb(255 255 255 / 92%);\n    }\n\n    .shift-inline-panel{\n      display:none;\n      border-radius:12px;\n      border:1px solid #e6ebf4;\n      background:#f8fafe;\n      padding:10px 11px;\n      color:#3e4a5f;\n      font-size:12px;\n      line-height:1.45;\n    }\n\n    .shift-inline-panel.visible{\n      display:block;\n    }\n\n    .shift-inline-panel ul{\n      margin:0;\n      padding-left:16px;\n      display:grid;\n      gap:4px;\n    }\n\n    .shift-inline-calendar{\n      display:none;\n      gap:4px;\n    }\n\n    .shift-inline-calendar.visible{\n      display:grid;\n    }\n\n    .shift-list.disabled{\n      position:relative;\n      opacity:52%;\n      pointer-events:none;\n      filter:saturate(.85);\n    }\n\n    .shift-list.highlight{\n      border-radius:18px;\n      box-shadow:0 0 0 4px rgb(255 138 0 / 10%);\n      padding:4px;\n      margin:-4px 0 0;\n    }\n\n    .shift-list-veil{\n      display:none;\n      margin:0 0 10px;\n      padding:11px 12px;\n      border-radius:14px;\n      background:rgb(255 255 255 / 8%);\n      border:1px dashed rgb(255 255 255 / 14%);\n      color:rgb(255 255 255 / 72%);\n      font-size:12px;\n      line-height:1.5;\n      cursor:pointer;\n    }\n\n    .shift-calendar-discovery{\n      margin:6px 0 14px;\n      color:rgb(255 255 255 / 68%);\n      font-size:12px;\n      line-height:1.5;\n    }\n\n    .shift-calendar-discovery strong{\n      color:#fff;\n      font-weight:800;\n    }\n\n    .shift-list.disabled + .shift-list-veil{\n      display:block;\n    }\n\n    .mobile-booking-card .shift-option{\n      padding:11px 12px;\n      border-radius:16px;\n      margin-bottom:8px;\n    }\n\n    .mobile-booking-card .shift-option:last-child{\n      margin-bottom:0;\n    }\n\n    .mobile-booking-card .shift-option strong{\n      font-size:13px;\n      line-height:1.35;\n    }\n\n    .mobile-booking-card .shift-option small{\n      font-size:11px;\n      line-height:1.4;\n    }\n\n    .shift-option:hover{\n      transform:translateY(-1px);\n      box-shadow:0 10px 24px rgb(20 29 45 / 8%);\n    }\n\n    .shift-option.active{\n      border-color:#ffb15e;\n      box-shadow:0 0 0 3px rgb(255 138 0 / 12%);\n    }\n\n    .shift-option small{\n      color:var(--muted);\n      display:block;\n      margin-top:2px;\n    }\n\n    .shift-price-chip{\n      padding:6px 8px;\n      border-radius:999px;\n      background:var(--accent-soft);\n      color:#a44f00;\n      font-size:11px;\n      font-weight:800;\n      white-space:nowrap;\n    }\n\n    .booking-price-box{\n      border-radius:18px;\n      background:rgb(255 255 255 / 8%);\n      border:1px solid rgb(255 255 255 / 10%);\n      padding:14px 14px 13px;\n      margin-bottom:13px;\n    }\n\n    .booking-next-step-note{\n      border-radius:14px;\n      border:1px dashed rgb(255 255 255 / 22%);\n      background:rgb(255 255 255 / 5%);\n      padding:11px 12px;\n      color:rgb(255 255 255 / 70%);\n      font-size:12px;\n      line-height:1.5;\n      margin-bottom:10px;\n    }\n\n    .mobile-booking-card .booking-price-box{\n      border-radius:16px;\n      padding:13px 13px 12px;\n    }\n\n    .booking-price-head{\n      display:flex;\n      justify-content:space-between;\n      gap:10px;\n      align-items:flex-start;\n    }\n\n    .booking-price-col small{\n      display:block;\n      font-size:11px;\n      color:rgb(255 255 255 / 62%);\n      margin-bottom:4px;\n    }\n\n    .booking-price-main{\n      font-size:18px;\n      font-weight:800;\n      letter-spacing:-.02em;\n      color:#fff;\n    }\n\n    .mobile-booking-card .booking-price-main{\n      font-size:17px;\n    }\n\n    .booking-price-main.big{\n      font-size:24px;\n      font-weight:900;\n      color:#fff3e0;\n      letter-spacing:-.03em;\n    }\n\n    .mobile-booking-card .booking-price-main.big{\n      font-size:21px;\n    }\n\n    .booking-code-line{\n      margin-top:10px;\n      font-size:12px;\n      color:rgb(255 255 255 / 68%);\n    }\n\n    .booking-timer-line{\n      margin-top:8px;\n      font-size:12px;\n      color:#ffd9ae;\n      font-weight:800;\n    }\n\n    .booking-empty-box{\n      border-radius:18px;\n      background:rgb(255 255 255 / 6%);\n      border:1px dashed rgb(255 255 255 / 14%);\n      padding:12px 13px;\n      margin-bottom:12px;\n      color:rgb(255 255 255 / 68%);\n      font-size:12px;\n      line-height:1.5;\n    }\n\n    @keyframes step-pulse{\n      0%{box-shadow:0 0 0 0 rgb(255 138 0 / 18%)}\n\n      70%{box-shadow:0 0 0 8px rgb(255 138 0 / 0%)}\n\n      100%{box-shadow:0 0 0 0 rgb(255 138 0 / 0%)}\n    }\n\n    .cta-main{\n      width:100%;\n      border:none;\n      border-radius:16px;\n      padding:17px 16px;\n      color:#fff;\n      font-weight:800;\n      font-size:16px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 18px 40px rgb(255 122 0 / 45%);\n      cursor:pointer;\n      transition:transform .15s ease, box-shadow .15s ease;\n    }\n\n    .hero-booking-card .cta-main{\n      min-height:56px;\n      font-size:24px;\n      font-weight:700;\n      letter-spacing:-.01em;\n      margin-top:18px;\n      margin-bottom:12px;\n      border-radius:18px;\n    }\n\n    .mobile-booking-card .cta-main{\n      padding:15px 16px;\n      font-size:15px;\n      border-radius:15px;\n      margin-top:0;\n      margin-bottom:0;\n    }\n\n    .cta-main:hover{\n      transform:translateY(-2px) scale(1.01);\n      box-shadow:0 22px 55px rgb(255 122 0 / 55%);\n    }\n\n    .cta-main:focus-visible,\n    .secondary-outline:focus-visible,\n    .inline-link-btn:focus-visible,\n    .mode-btn:focus-visible,\n    .switch-btn:focus-visible,\n    .menu-pill:focus-visible,\n    .age-tab:focus-visible{\n      outline:3px solid rgb(255 138 0 / 30%);\n      outline-offset:2px;\n    }\n\n    .cta-main:disabled{\n      opacity:45%;\n      cursor:not-allowed;\n      box-shadow:none;\n    }\n\n    .cta-main.is-disabled{\n      opacity:50%;\n      cursor:not-allowed;\n      box-shadow:none;\n      transform:none !important;\n    }\n\n    .cta-wrap.highlight{\n      border-radius:18px;\n      box-shadow:0 0 0 4px rgb(255 138 0 / 10%);\n      padding:4px;\n      margin:8px 0 0;\n    }\n\n    .booking-save-btn{\n      display:none;\n      margin-top:10px;\n      border-color:rgb(255 255 255 / 24%);\n      background:rgb(255 255 255 / 6%);\n      color:#fff;\n      box-shadow:none;\n    }\n\n    .cta-subtext{\n      margin-top:8px;\n      font-size:12px;\n      color:rgb(255 255 255 / 60%);\n      text-align:center;\n    }\n\n    .mobile-booking-card .cta-subtext{\n      font-size:11px;\n      margin-top:7px;\n    }\n\n    .trust-mini{\n      margin-top:12px;\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n      font-size:11px;\n      color:rgb(255 255 255 / 55%);\n    }\n\n    .mobile-booking-card .trust-mini{\n      gap:8px;\n      margin-top:12px;\n      font-size:11px;\n    }\n\n    .booking-step1-hooks{\n      display:none;\n      margin-top:14px;\n      margin-bottom:8px;\n      gap:10px;\n    }\n\n    .booking-step1-hooks span{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      color:rgb(255 255 255 / 92%);\n      font-size:16px;\n      line-height:1.4;\n      font-weight:600;\n    }\n\n    .booking-step1-hooks .ac-icon{\n      width:16px;\n      height:16px;\n      flex:0 0 auto;\n      object-fit:contain;\n    }\n\n    .booking-stage-1 .booking-step-3 .booking-step1-hooks{\n      display:grid;\n    }\n\n    .booking-stage-1 .booking-step-3 .trust-mini{\n      display:none;\n    }\n\n    .trust-mini span{\n      background:rgb(255 255 255 / 6%);\n      padding:5px 8px;\n      border-radius:10px;\n    }\n\n    .mobile-booking-card .trust-mini span{\n      padding:5px 8px;\n      border-radius:9px;\n      font-size:10px;\n    }\n\n    .mobile-booking-card .selected-shift-chip{\n      margin-bottom:4px;\n    }\n\n    .mobile-booking-card .shift-list{\n      margin:0;\n      padding:0;\n    }\n\n    .mobile-booking-card.booking-stage-2{\n      padding-bottom:14px;\n    }\n\n    .mobile-booking-card.booking-stage-2 .booking-step-block + .booking-step-block{\n      margin-top:8px;\n    }\n\n    .booking-scarcity{\n      margin-top:10px;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      text-align:center;\n      padding:10px 16px;\n      border-radius:999px;\n      border:1px solid rgb(255 156 64 / 55%);\n      background:rgb(255 138 0 / 12%);\n      color:#ffd6a8;\n      font-size:15px;\n      font-weight:900;\n      letter-spacing:-.01em;\n      box-shadow:0 14px 26px rgb(255 138 0 / 12%);\n    }\n\n    .hero-booking-card .booking-scarcity{\n      margin:2px auto 0;\n    }\n\n    .under-cta{\n      margin-top:11px;\n      text-align:center;\n      color:rgb(255 255 255 / 68%);\n      font-size:12px;\n    }\n\n    .under-cta.is-muted-hidden,\n    .cta-subtext.is-muted-hidden{\n      display:none;\n    }\n\n    .booking-hint{\n      opacity:0%;\n      transform:translateY(6px);\n      transition:opacity .25s ease, transform .25s ease;\n      font-size:13px;\n      color:#ffb86b;\n      margin-top:8px;\n      min-height:18px;\n      pointer-events:none;\n    }\n\n    .booking-hint.visible{\n      opacity:100%;\n      transform:translateY(0);\n    }\n\n    .body-sections{\n      padding:18px 18px 18px;\n      margin-top:0;\n      display:grid;\n      gap:18px;\n      position:relative;\n      z-index:2;\n      border-top-left-radius:30px;\n      border-top-right-radius:30px;\n      overflow:hidden;\n    }\n\n    .body-sections > .section-card:first-child{\n      margin:0;\n    }\n\n    .section-card{\n      background:#fff;\n      border-radius:24px;\n      border:1px solid var(--line);\n      box-shadow:var(--shadow);\n      padding:18px;\n      scroll-margin-top:24px;\n    }\n\n    .trust-band{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n      margin-top:14px;\n    }\n\n    .trust-band-card{\n      border:1px solid var(--line);\n      background:linear-gradient(135deg,#fff8f0,#fff);\n      border-radius:20px;\n      padding:16px;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease;\n    }\n\n    .trust-band-card:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgb(20 29 45 / 10%);\n    }\n\n    .trust-band-card strong{\n      display:block;\n      font-size:18px;\n      letter-spacing:-.02em;\n      margin-bottom:8px;\n      color:#111827;\n    }\n\n    .trust-band-card span{\n      display:block;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .section-card h3{\n      margin:0 0 10px;\n      font-size:22px;\n      letter-spacing:-.02em;\n    }\n\n    .section-card p{\n      margin:0;\n      color:var(--muted);\n      line-height:1.55;\n      font-size:14px;\n    }\n\n    .journey-grid{\n      display:grid;\n      grid-template-columns:repeat(4,1fr);\n      gap:12px;\n      margin-top:14px;\n    }\n\n    .journey-card{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:22px;\n      padding:16px;\n      box-shadow:var(--shadow);\n      display:grid;\n      gap:10px;\n    }\n\n    .journey-heading{\n      display:flex;\n      align-items:center;\n      gap:10px;\n      min-width:0;\n    }\n\n    .journey-num{\n      width:34px;\n      height:34px;\n      border-radius:50%;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:14px;\n      font-weight:900;\n      letter-spacing:-.02em;\n    }\n\n    .journey-card h4{\n      margin:0;\n      font-size:16px;\n      line-height:1.35;\n      letter-spacing:-.01em;\n    }\n\n    .journey-card p{\n      margin:0;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.6;\n    }\n\n    .results-band{\n      margin-top:16px;\n      display:grid;\n      grid-template-columns:repeat(4,1fr);\n      gap:10px;\n    }\n\n    .result-pill{\n      background:linear-gradient(135deg,#fff8f0,#fff);\n      border:1px solid var(--line);\n      border-radius:18px;\n      padding:14px 12px;\n      box-shadow:var(--shadow);\n      text-align:center;\n    }\n\n    .result-pill strong{\n      display:block;\n      font-size:22px;\n      letter-spacing:-.03em;\n      color:#d66a00;\n      margin-bottom:6px;\n    }\n\n    .result-pill span{\n      display:block;\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.45;\n    }\n\n    .grid-3{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n    }\n\n    .programs-layout{\n      display:grid;\n      grid-template-columns:minmax(0, 2fr) minmax(280px, 360px);\n      gap:12px;\n      align-items:end;\n    }\n\n    .programs-main-grid{\n      grid-template-columns:repeat(2,minmax(0,1fr));\n    }\n\n    .programs-short-block{\n      align-self:end;\n      background:linear-gradient(135deg,#f9fbff,#fff);\n      border:1px solid var(--line);\n      border-radius:20px;\n      padding:12px;\n      box-shadow:var(--shadow);\n      display:flex;\n      flex-direction:column;\n      gap:8px;\n    }\n\n    .programs-short-block h4{\n      margin:0;\n      font-size:16px;\n      letter-spacing:-.01em;\n      color:#1d2532;\n    }\n\n    .programs-short-block p{\n      margin:0;\n      font-size:13px;\n      color:var(--muted);\n      line-height:1.42;\n      display:-webkit-box;\n      -webkit-line-clamp:4;\n      -webkit-box-orient:vertical;\n      overflow:hidden;\n    }\n\n    .short-shifts-list{\n      display:grid;\n      gap:6px;\n    }\n\n    .short-shift-card{\n      padding:8px 9px;\n      border-radius:12px;\n      box-shadow:none;\n      background:#fff;\n    }\n\n    .short-shift-head{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:6px;\n      margin-bottom:4px;\n    }\n\n    .short-shift-head h4{\n      margin:0;\n      font-size:13px;\n      letter-spacing:-.01em;\n    }\n\n    .short-shift-tag{\n      display:inline-flex;\n      align-items:center;\n      height:18px;\n      padding:0 6px;\n      border-radius:999px;\n      font-size:9px;\n      font-weight:700;\n      color:#56627a;\n      background:#eef3fb;\n      border:1px solid #dde6f3;\n      white-space:nowrap;\n    }\n\n    .short-shift-meta{\n      margin-top:2px;\n      display:grid;\n      gap:1px;\n      font-size:10px;\n      color:#556175;\n      line-height:1.25;\n    }\n\n    .mini-card{\n      background:#fff;\n      border-radius:20px;\n      border:1px solid var(--line);\n      padding:16px;\n    }\n\n    .mini-card h4{\n      margin:0 0 8px;\n      font-size:16px;\n      letter-spacing:-.01em;\n    }\n\n    .mini-card p{\n      margin:0;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .price-row{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      margin-bottom:8px;\n    }\n\n    .price-row strong{\n      white-space:nowrap;\n    }\n\n    .price-row span{\n      display:flex;\n      align-items:center;\n      justify-content:flex-end;\n      gap:8px;\n      min-width:0;\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.4;\n      text-align:right;\n    }\n\n    .shift-calendar-btn{\n      height:30px;\n      border-radius:9px;\n      border:1px solid var(--line);\n      background:#fff;\n      cursor:pointer;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      gap:4px;\n      padding:0 8px;\n      font-size:12px;\n      font-weight:700;\n      line-height:1;\n      flex:0 0 auto;\n      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n    }\n\n    .shift-calendar-btn:hover{\n      transform:translateY(-1px);\n      border-color:#d5dbe7;\n      box-shadow:0 10px 18px rgb(20 29 45 / 10%);\n    }\n\n    .slot-grid{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n    }\n\n    .slot{\n      min-height:160px;\n      border-radius:20px;\n      border:1px dashed var(--line);\n      background:\n        radial-gradient(circle at 20% 20%, rgb(255 138 0 / 12%), transparent 25%),\n        linear-gradient(135deg,#f5f7fb,#eef2f7);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      color:var(--muted);\n      font-size:13px;\n      font-weight:700;\n      text-transform:uppercase;\n      letter-spacing:.08em;\n    }\n\n    .photo-grid{\n      display:grid;\n      grid-template-columns:1.35fr 1fr 1fr;\n      gap:12px;\n      grid-auto-rows:180px;\n    }\n\n    .filter-row{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n      margin:0 0 14px;\n    }\n\n    .filter-chip{\n      border:none;\n      border-radius:999px;\n      padding:10px 12px;\n      background:#f5f7fb;\n      color:#111827;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease;\n    }\n\n    .filter-chip:hover{\n      transform:translateY(-1px);\n      box-shadow:0 14px 26px rgb(20 29 45 / 10%);\n    }\n\n    .filter-chip.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .media-head{\n      display:flex;\n      align-items:end;\n      justify-content:space-between;\n      gap:12px;\n      flex-wrap:wrap;\n      margin-bottom:14px;\n    }\n\n    .media-head h3{\n      margin:0;\n    }\n\n    .media-head p{\n      margin:0;\n      max-width:760px;\n    }\n\n    .photo-card{\n      position:relative;\n      overflow:hidden;\n      border-radius:20px;\n      border:1px solid var(--line);\n      background:#fff;\n      min-height:180px;\n      box-shadow:var(--shadow);\n      transition:transform .22s ease, box-shadow .22s ease;\n    }\n\n    .photo-card.hero{\n      grid-row:span 2;\n      min-height:372px;\n    }\n\n    .photo-card.wide{\n      grid-column:span 2;\n    }\n\n    .photo-card img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n      aspect-ratio: 4 / 3;\n    }\n\n    .photo-badge{\n      position:absolute;\n      left:10px;\n      bottom:10px;\n      padding:6px 9px;\n      border-radius:999px;\n      background:rgb(17 24 39 / 76%);\n      color:#fff;\n      font-size:11px;\n      font-weight:700;\n      text-transform:uppercase;\n      letter-spacing:.06em;\n      backdrop-filter:blur(8px);\n    }\n\n    .photo-title{\n      position:absolute;\n      left:10px;\n      top:10px;\n      padding:6px 9px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 86%);\n      color:#111827;\n      font-size:11px;\n      font-weight:800;\n      letter-spacing:.04em;\n      text-transform:uppercase;\n    }\n\n    .shift-context-line{\n      margin-top:4px;\n      color:#6c788b;\n      font-size:11px;\n      font-weight:700;\n      line-height:1.45;\n    }\n\n    .media-lightbox{\n      position:fixed;\n      inset:0;\n      background:rgb(10 14 20 / 92%);\n      z-index:120;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:20px;\n      animation:fade-in .2s ease;\n    }\n\n    .media-lightbox.hidden{\n      display:none !important;\n    }\n\n    .media-stage{\n      position:relative;\n      max-width:900px;\n      width:100%;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n    }\n\n    .media-stage.single-item .media-nav{\n      display:none;\n    }\n\n    .media-image{\n      max-width:100%;\n      max-height:80vh;\n      border-radius:18px;\n      box-shadow:0 30px 80px rgb(0 0 0 / 50%);\n    }\n\n    .media-video{\n      width:360px;\n      height:640px;\n      max-height:80vh;\n      border-radius:18px;\n      overflow:hidden;\n      background:#000;\n      box-shadow:0 30px 80px rgb(0 0 0 / 60%);\n    }\n\n    .media-nav{\n      position:absolute;\n      top:50%;\n      transform:translateY(-50%);\n      width:48px;\n      height:48px;\n      border-radius:50%;\n      border:none;\n      background:rgb(255 255 255 / 12%);\n      color:#fff;\n      font-size:20px;\n      cursor:pointer;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      backdrop-filter:blur(8px);\n    }\n\n    .media-prev{ left:-60px; }\n\n    .media-next{ right:-60px; }\n\n    .media-close{\n      position:absolute;\n      top:-60px;\n      right:0;\n      width:42px;\n      height:42px;\n      border-radius:12px;\n      border:none;\n      background:rgb(255 255 255 / 12%);\n      color:#fff;\n      font-size:20px;\n      cursor:pointer;\n    }\n\n    .media-caption{\n      position:absolute;\n      bottom:-50px;\n      left:0;\n      color:#fff;\n      font-size:13px;\n      opacity:80%;\n    }\n\n    .video-modal{\n      position:fixed;\n      inset:0;\n      background:rgb(0 0 0 / 82%);\n      z-index:130;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:20px;\n      animation:fade-in .2s ease;\n    }\n\n    .video-inner{\n      width:min(92vw, 920px);\n      margin:auto;\n      position:relative;\n      border-radius:18px;\n      overflow:hidden;\n      background:#000;\n      box-shadow:0 28px 72px rgb(0 0 0 / 55%);\n    }\n\n    .video-inner.vertical{\n      width:min(92vw, 390px);\n      border-radius:22px;\n    }\n\n    .video-frame{\n      width:100%;\n      max-height:78vh;\n      display:block;\n      aspect-ratio:16/9;\n      background:#000;\n    }\n\n    .video-frame.vertical{\n      aspect-ratio:9/16;\n      max-height:82vh;\n    }\n\n    .video-close{\n      position:absolute;\n      top:10px;\n      right:10px;\n      width:38px;\n      height:38px;\n      border:none;\n      border-radius:10px;\n      background:rgb(0 0 0 / 56%);\n      color:#fff;\n      font-size:20px;\n      line-height:1;\n      cursor:pointer;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      z-index:2;\n    }\n\n    .video-fallback{\n      display:grid;\n      gap:10px;\n      align-content:center;\n      justify-items:flex-start;\n      min-height:280px;\n      padding:18px;\n      background:\n        radial-gradient(circle at 20% 20%, rgb(255 138 0 / 14%), transparent 30%),\n        linear-gradient(135deg,#0f1725,#111c2b);\n      color:#fff;\n    }\n\n    .video-fallback p{\n      margin:0;\n      color:rgb(255 255 255 / 78%);\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .calendar-modal{\n      position:fixed;\n      inset:0;\n      background:rgb(0 0 0 / 72%);\n      z-index:131;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:20px;\n      animation:fade-in .2s ease;\n    }\n\n    .calendar-inner{\n      width:min(92vw, 430px);\n      max-height:min(80vh, 620px);\n      overflow:auto;\n      border-radius:16px;\n      background:#0f1622;\n      border:1px solid rgb(255 255 255 / 12%);\n      box-shadow:0 26px 70px rgb(0 0 0 / 45%);\n      padding:16px;\n      color:#fff;\n    }\n\n    .calendar-header{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      margin-bottom:12px;\n    }\n\n    .calendar-header span{\n      font-size:14px;\n      font-weight:700;\n      line-height:1.45;\n    }\n\n    .calendar-header button{\n      width:34px;\n      height:34px;\n      border-radius:10px;\n      border:1px solid rgb(255 255 255 / 16%);\n      background:rgb(255 255 255 / 8%);\n      color:#fff;\n      cursor:pointer;\n      font-size:18px;\n      line-height:1;\n    }\n\n    .calendar-grid{\n      display:grid;\n      gap:12px;\n    }\n\n    .calendar-month{\n      display:grid;\n      gap:8px;\n    }\n\n    .calendar-month-title{\n      font-size:13px;\n      font-weight:800;\n      color:rgb(255 255 255 / 86%);\n      text-transform:capitalize;\n    }\n\n    .calendar-month-grid{\n      display:grid;\n      grid-template-columns:repeat(7,1fr);\n      gap:6px;\n    }\n\n    .calendar-day{\n      text-align:center;\n      padding:7px 4px;\n      border-radius:10px;\n      opacity:65%;\n      border:1px solid rgb(255 255 255 / 8%);\n      background:rgb(255 255 255 / 3%);\n      min-height:48px;\n      display:grid;\n      align-content:center;\n      gap:3px;\n    }\n\n    .calendar-day span{\n      font-size:13px;\n      font-weight:700;\n      line-height:1;\n    }\n\n    .calendar-day small{\n      font-size:10px;\n      color:rgb(255 255 255 / 72%);\n      line-height:1;\n    }\n\n    .calendar-day.active{\n      background:#ff8a00;\n      color:#111827;\n      border-color:#ff8a00;\n      opacity:100%;\n    }\n\n    .calendar-day.active small{\n      color:#111827;\n      opacity:80%;\n    }\n\n    .calendar-day.empty{\n      opacity:0%;\n      pointer-events:none;\n    }\n\n    .video-carousel-shell{\n      margin-top:14px;\n      display:grid;\n      grid-template-columns:40px minmax(0,1fr) 40px;\n      gap:10px;\n      align-items:center;\n    }\n\n    .video-carousel-nav{\n      width:40px;\n      height:40px;\n      border-radius:12px;\n      border:1px solid var(--line);\n      background:#fff;\n      color:#111827;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .video-carousel-nav:hover{\n      transform:translateY(-1px);\n      border-color:#c6cedd;\n      box-shadow:0 12px 24px rgb(20 29 45 / 10%);\n    }\n\n    .video-carousel-nav .ac-icon{\n      width:16px;\n      height:16px;\n      display:block;\n    }\n\n    .video-list{\n      display:flex;\n      gap:var(--video-card-gap);\n      overflow-x:auto;\n      padding:2px;\n      scroll-snap-type:x mandatory;\n      scrollbar-width:none;\n      scroll-behavior:smooth;\n    }\n\n    .video-list::-webkit-scrollbar{\n      display:none;\n    }\n\n    .inline-link-btn{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      border-radius:14px;\n      padding:12px 16px;\n      font-weight:800;\n      font-size:14px;\n      text-decoration:none;\n    }\n\n    .inline-link-btn.primary{\n      color:#fff;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 12px 24px rgb(255 138 0 / 22%);\n    }\n\n    .video-card{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:20px;\n      padding:12px;\n      box-shadow:var(--shadow);\n      display:flex;\n      flex-direction:column;\n      gap:10px;\n      cursor:pointer;\n      transition:transform .2s ease, box-shadow .2s ease;\n      flex:0 0 calc((100% - (var(--video-card-gap) * 3)) / 4);\n      min-width:0;\n      scroll-snap-align:start;\n    }\n\n    .video-card:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgb(20 29 45 / 12%);\n    }\n\n    .video-poster{\n      min-height:0;\n      aspect-ratio:9/16;\n      width:100%;\n      border-radius:16px;\n      background:\n        radial-gradient(circle at 20% 20%, rgb(255 138 0 / 18%), transparent 28%),\n        linear-gradient(135deg,#dfe7f3,#a9b8cb 50%,#6f829a);\n      position:relative;\n      overflow:hidden;\n    }\n\n    .video-poster img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      object-position:center top;\n      display:block;\n    }\n\n    .video-play{\n      position:absolute;\n      inset:0;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      z-index:2;\n    }\n\n    .video-play span{\n      width:56px;\n      height:56px;\n      border-radius:50%;\n      background:rgb(255 255 255 / 92%);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      color:var(--accent);\n      font-size:22px;\n      box-shadow:0 14px 28px rgb(20 29 45 / 14%);\n    }\n\n    .video-card h4{\n      margin:0;\n      font-size:14px;\n      line-height:1.35;\n      letter-spacing:-.01em;\n      text-align:left;\n      min-height:38px;\n    }\n\n    .contacts-grid{\n      display:grid;\n      grid-template-columns:repeat(4,minmax(0,1fr));\n      gap:12px;\n      margin:14px 0 12px;\n      justify-content:stretch;\n    }\n\n    .contact-link{\n      display:grid;\n      grid-template-columns:42px 1fr;\n      place-items:center start;\n      gap:12px;\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:18px;\n      padding:12px 14px;\n      text-decoration:none;\n      color:var(--text);\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .contact-link:hover,\n    .social-link:hover,\n    .photo-card:hover{\n      transform:translateY(-2px);\n    }\n\n    .contact-link:hover,\n    .social-link:hover{\n      border-color:#cfd7e5;\n      box-shadow:0 18px 32px rgb(20 29 45 / 12%);\n    }\n\n    .contact-link .contact-icon{\n      width:42px;\n      height:42px;\n      border-radius:50%;\n      background:#fff1df;\n      color:#d66a00;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:18px;\n      font-weight:800;\n    }\n\n    .contact-link .contact-icon .ac-icon{\n      width:18px;\n      height:18px;\n      display:block;\n    }\n\n    .contact-link strong{\n      display:block;\n      font-size:14px;\n      line-height:1.35;\n    }\n\n    .contact-link span{\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.4;\n    }\n\n    .socials-grid{\n      display:flex;\n      flex-wrap:wrap;\n      gap:10px;\n      margin-top:6px;\n    }\n\n    .social-link{\n      display:inline-flex;\n      align-items:center;\n      justify-content:flex-start;\n      gap:8px;\n      min-height:44px;\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:12px;\n      text-decoration:none;\n      color:var(--text);\n      box-shadow:var(--shadow);\n      padding:0 14px;\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .social-label{\n      font-size:13px;\n      font-weight:700;\n      color:#253247;\n      line-height:1;\n      white-space:nowrap;\n    }\n\n    .social-badge-mark{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-width:30px;\n      height:28px;\n      border-radius:999px;\n      background:#f5f7fb;\n      border:1px solid var(--line);\n      color:#4a5568;\n      font-size:11px;\n      font-weight:900;\n      letter-spacing:.06em;\n      line-height:1;\n      text-transform:uppercase;\n      padding:0 8px;\n    }\n\n    .map-card{\n      margin-top:14px;\n      border:1px solid var(--line);\n      border-radius:22px;\n      overflow:hidden;\n      background:#fff;\n      box-shadow:var(--shadow);\n    }\n\n    .map-preview{\n      min-height:260px;\n      background:#e5ecf6;\n      position:relative;\n      overflow:hidden;\n      padding:0;\n    }\n\n    .map-frame{\n      width:100%;\n      min-height:260px;\n      border:none;\n      display:block;\n      background:#dde6f3;\n    }\n\n    .map-footer{\n      padding:14px;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:12px;\n      flex-wrap:wrap;\n    }\n\n    .map-open-btn{\n      border:none;\n      border-radius:14px;\n      min-height:44px;\n      padding:0 16px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      font-size:13px;\n      font-weight:800;\n      text-decoration:none;\n      box-shadow:0 14px 26px rgb(255 138 0 / 24%);\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      transition:transform .16s ease, box-shadow .16s ease;\n    }\n\n    .map-open-btn:hover{\n      transform:translateY(-1px);\n      box-shadow:0 18px 34px rgb(255 138 0 / 28%);\n    }\n\n    .map-address{\n      display:grid;\n      gap:4px;\n      color:#111827;\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .map-address span{\n      color:var(--muted);\n      font-size:13px;\n    }\n\n    .map-trust{\n      display:grid;\n      gap:6px;\n      margin-top:10px;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .review-actions{\n      margin-top:14px;\n    }\n\n    .reviews-rating{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      font-size:14px;\n      margin-bottom:12px;\n    }\n\n    .stars{\n      color:#FF8A00;\n      font-size:14px;\n      letter-spacing:2px;\n      margin:4px 0 6px;\n    }\n\n    .review-grid{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n    }\n\n    .reviews-hero{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:18px;\n      flex-wrap:wrap;\n      margin:14px 0 10px;\n      padding:18px;\n      border-radius:22px;\n      background:linear-gradient(135deg,#fff8f0,#fff);\n      border:1px solid var(--line);\n      box-shadow:var(--shadow);\n    }\n\n    .reviews-score-row{\n      display:flex;\n      align-items:center;\n      gap:10px;\n      flex-wrap:wrap;\n      margin-bottom:8px;\n    }\n\n    .reviews-hero-left strong{\n      display:block;\n      font-size:34px;\n      line-height:1;\n      letter-spacing:-.04em;\n      color:#d66a00;\n      margin-bottom:8px;\n    }\n\n    .reviews-hero-left span{\n      display:block;\n      color:#111827;\n      font-size:15px;\n      font-weight:700;\n      line-height:1.4;\n    }\n\n    .reviews-hero-sub{\n      max-width:560px;\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n      align-self:center;\n    }\n\n    .review-source{\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.4;\n      margin-bottom:2px;\n    }\n\n    .faq-empty{\n      display:none;\n      margin-top:14px;\n      padding:14px 16px;\n      border-radius:16px;\n      border:1px dashed var(--line);\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.55;\n      background:#fbfcfe;\n    }\n\n    .faq-empty.visible{\n      display:block;\n    }\n\n    .review-stars{\n      color:#ff9800;\n      font-size:14px;\n      letter-spacing:2px;\n      margin:4px 0 8px;\n    }\n\n    .review-card{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:18px;\n      padding:14px;\n      box-shadow:var(--shadow);\n      transition:transform .2s ease, box-shadow .2s ease;\n    }\n\n    .review-card:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgb(20 29 45 / 10%);\n    }\n\n    .review-card strong{\n      display:block;\n      margin-bottom:6px;\n      font-size:14px;\n    }\n\n    .review-card span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .review-real{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:20px;\n      padding:16px;\n      box-shadow:var(--shadow);\n      display:grid;\n      gap:12px;\n      transition:transform .2s ease, box-shadow .2s ease;\n    }\n\n    .review-real:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgb(20 29 45 / 10%);\n    }\n\n    .review-head-real{\n      display:flex;\n      gap:12px;\n      align-items:flex-start;\n    }\n\n    .review-avatar{\n      width:48px;\n      height:48px;\n      border-radius:50%;\n      overflow:hidden;\n      flex:0 0 auto;\n      background:#f5f7fb;\n      border:1px solid var(--line);\n    }\n\n    .review-avatar img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .review-person{\n      min-width:0;\n    }\n\n    .review-person strong{\n      display:block;\n      font-size:14px;\n      line-height:1.35;\n      margin-bottom:4px;\n    }\n\n    .review-meta{\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.4;\n    }\n\n    .review-quote{\n      color:var(--text);\n      font-size:14px;\n      line-height:1.6;\n    }\n\n    .reviews-summary{\n      display:grid;\n      grid-template-columns:220px 1fr;\n      gap:14px;\n      margin-top:14px;\n      align-items:stretch;\n    }\n\n    .reviews-score{\n      background:linear-gradient(135deg,#fff8f0,#fff);\n      border:1px solid var(--line);\n      border-radius:22px;\n      padding:18px;\n      box-shadow:var(--shadow);\n      display:flex;\n      flex-direction:column;\n      justify-content:center;\n      text-align:center;\n    }\n\n    .reviews-score strong{\n      font-size:42px;\n      line-height:1;\n      letter-spacing:-.04em;\n      color:#d66a00;\n      margin-bottom:8px;\n    }\n\n    .reviews-score span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .team-grid{\n      display:grid;\n      gap:12px;\n      margin-top:14px;\n      align-items:start;\n    }\n\n    .team-layout{\n      display:grid;\n      grid-template-columns:minmax(300px, 1.1fr) minmax(0, 2fr);\n      gap:12px;\n      align-items:stretch;\n    }\n\n    .team-right{\n      display:grid;\n      grid-template-rows:auto 1fr;\n      gap:12px;\n      min-width:0;\n    }\n\n    .team-core-grid{\n      display:grid;\n      gap:12px;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      min-width:0;\n    }\n\n    .team-core-grid .team-card{\n      min-height:100%;\n    }\n\n    .team-core-grid .team-card,\n    .team-carousel .team-card{\n      background:#fff !important;\n      border:1px solid var(--line) !important;\n      box-shadow:var(--shadow);\n      background-clip:padding-box;\n    }\n\n    .team-carousel-shell{\n      display:grid;\n      grid-template-columns:40px minmax(0,1fr) 40px;\n      gap:10px;\n      align-items:center;\n      min-width:0;\n    }\n\n    .team-carousel-nav{\n      width:40px;\n      height:40px;\n      border-radius:12px;\n      border:1px solid var(--line);\n      background:#fff;\n      color:#111827;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .team-carousel-nav:hover{\n      transform:translateY(-1px);\n      border-color:#c6cedd;\n      box-shadow:0 12px 24px rgb(20 29 45 / 10%);\n    }\n\n    .team-carousel-nav .ac-icon{\n      width:16px;\n      height:16px;\n      display:block;\n    }\n\n    .team-carousel{\n      display:flex;\n      gap:12px;\n      overflow-x:auto;\n      padding:2px;\n      scroll-snap-type:x proximity;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n      min-width:0;\n      background:transparent;\n    }\n\n    .team-carousel::-webkit-scrollbar{\n      display:none;\n    }\n\n    .team-carousel .team-card{\n      min-width:calc((100% - 12px) / 2);\n      max-width:calc((100% - 12px) / 2);\n      flex:0 0 calc((100% - 12px) / 2);\n      scroll-snap-align:start;\n      background:#fff;\n      border-color:var(--line);\n    }\n\n    .stay-grid{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n      margin-top:14px;\n    }\n\n    .stay-card{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:20px;\n      overflow:hidden;\n      box-shadow:var(--shadow);\n      display:grid;\n    }\n\n    .stay-card.is-clickable,\n    .mobile-stay-card.is-clickable{\n      cursor:pointer;\n    }\n\n    .stay-card.is-clickable:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgb(20 29 45 / 10%);\n    }\n\n    .stay-card img{\n      width:100%;\n      height:220px;\n      object-fit:cover;\n      display:block;\n    }\n\n    .stay-card-body{\n      padding:14px;\n      display:grid;\n      gap:6px;\n    }\n\n    .stay-card-body strong{\n      font-size:15px;\n      line-height:1.35;\n    }\n\n    .stay-card-body span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .stay-card.placeholder .stay-placeholder{\n      min-height:220px;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      text-align:center;\n      padding:20px;\n      background:\n        radial-gradient(circle at 20% 20%, rgb(255 138 0 / 10%), transparent 26%),\n        linear-gradient(135deg,#f6f8fb,#eef2f7);\n      color:#607086;\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .team-card{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:20px;\n      padding:16px;\n      text-align:center;\n      display:grid;\n      gap:8px;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease;\n    }\n\n    .team-card:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgb(20 29 45 / 10%);\n    }\n\n    .team-avatar{\n      width:88px;\n      height:88px;\n      border-radius:50%;\n      margin:0 auto 12px;\n      background:linear-gradient(135deg,#ffd8b3,#ffb15e);\n      overflow:hidden;\n      border:1px solid var(--line);\n    }\n\n    .team-avatar img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .team-card strong{\n      display:block;\n      margin-bottom:6px;\n      font-size:15px;\n    }\n\n    .team-card span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.45;\n    }\n\n    .team-role{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.45;\n      font-weight:700;\n    }\n\n    .book-team-card{\n      background:linear-gradient(135deg,#fff7ef,#fff);\n      border:2px solid rgb(255 138 0 / 26%);\n      text-align:left;\n      align-content:start;\n      gap:10px;\n      padding:14px;\n      height:100%;\n    }\n\n    .book-team-cover-wrap{\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      min-height:240px;\n      border-radius:16px;\n      background:\n        radial-gradient(circle at 20% 20%, rgb(255 138 0 / 10%), transparent 26%),\n        linear-gradient(135deg,#fff8f1,#fff);\n      overflow:hidden;\n      cursor:pointer;\n    }\n\n    .book-team-cover{\n      width:100%;\n      max-width:220px;\n      height:auto;\n      display:block;\n      object-fit:contain;\n      filter:drop-shadow(0 16px 24px rgb(0 0 0 / 12%));\n    }\n\n    .book-team-title{\n      font-size:24px;\n      line-height:1.1;\n      letter-spacing:-.04em;\n      color:#111827;\n      font-weight:900;\n      margin-top:2px;\n    }\n\n    .book-team-sub{\n      color:#495569;\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .book-team-proof{\n      color:#111827;\n      font-size:12px;\n      line-height:1.55;\n      font-weight:700;\n    }\n\n    .book-team-cta{\n      margin-top:4px;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:44px;\n      padding:0 16px;\n      border-radius:12px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      text-decoration:none;\n      font-size:14px;\n      font-weight:800;\n      box-shadow:0 16px 32px rgb(255 138 0 / 18%);\n      align-self:flex-start;\n    }\n\n    .success-secondary{\n      margin-top:12px;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:44px;\n      padding:0 16px;\n      border-radius:12px;\n      border:1px solid var(--line);\n      background:#fff;\n      color:var(--text);\n      text-decoration:none;\n      font-size:14px;\n      font-weight:800;\n      box-shadow:var(--shadow);\n    }\n\n    /* duplicate compact hero nav removed */\n\n    .mobile-hero-nav{\n      display:flex;\n      gap:8px;\n      margin:10px 0 0;\n      position:relative;\n      z-index:2;\n      align-items:center;\n      min-width:0;\n    }\n\n    .mobile-hero-nav-primary{\n      justify-content:space-between;\n      gap:10px;\n      margin-top:12px;\n    }\n\n    .mobile-hero-nav-primary .mini-nav-link{\n      flex:1 1 0;\n      min-height:38px;\n      padding:0 12px;\n      font-size:13px;\n      font-weight:800;\n      background:#fff;\n      color:#111827;\n      border:1px solid rgb(229 231 235 / 85%);\n      box-shadow:0 8px 16px rgb(15 23 42 / 16%);\n      backdrop-filter:none;\n    }\n\n    .mobile-hero-nav-secondary{\n      gap:10px;\n      margin-top:8px;\n    }\n\n    .mobile-hero-nav-secondary .mini-nav-link{\n      min-height:34px;\n      min-width:34px;\n      width:34px;\n      padding:0;\n      background:rgb(255 255 255 / 12%);\n      border:1px solid rgb(255 255 255 / 20%);\n    }\n\n    .mini-nav-link{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:34px;\n      padding:0 11px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 10%);\n      border:1px solid rgb(255 255 255 / 14%);\n      color:#fff;\n      text-decoration:none;\n      font-size:12px;\n      font-weight:800;\n      backdrop-filter:blur(10px);\n      gap:6px;\n      min-width:0;\n    }\n\n    .mini-nav-link.icon{\n      min-width:34px;\n      width:34px;\n      padding:0;\n    }\n\n    .mini-nav-link img{\n      width:14px;\n      height:14px;\n      filter:brightness(0) invert(1);\n    }\n\n    .mobile-brand{\n      padding:8px;\n      width:40px;\n      height:40px;\n      justify-content:center;\n      border-radius:12px;\n    }\n\n    .mobile-brand-wrap{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      min-width:0;\n    }\n\n    .mobile-brand-meta{\n      min-width:0;\n    }\n\n    .mobile-brand-label{\n      display:inline-flex;\n      align-items:center;\n      padding:8px 12px;\n      border-radius:999px;\n      border:1px solid rgb(255 255 255 / 18%);\n      background:rgb(255 255 255 / 10%);\n      color:#f8fafc;\n      font-size:13px;\n      font-weight:700;\n      line-height:1;\n      white-space:nowrap;\n      text-overflow:ellipsis;\n      overflow:hidden;\n      max-width:190px;\n    }\n\n    .mobile-hero-tools{\n      width:100%;\n      justify-content:space-between;\n      gap:8px;\n      min-width:0;\n    }\n\n    .mobile-hero .hero-tag{\n      display:none;\n    }\n\n    .mobile-hero .feature-row{\n      display:none;\n    }\n\n    .mobile-age-gate{\n      margin-top:12px;\n      border-radius:18px;\n      border:1px solid rgb(255 255 255 / 18%);\n      background:rgb(15 23 42 / 42%);\n      padding:12px;\n      box-shadow:0 14px 26px rgb(2 6 23 / 18%);\n    }\n\n    .mobile-age-gate h3{\n      margin:0;\n      font-size:18px;\n      line-height:1.2;\n      letter-spacing:-.01em;\n      color:#fff;\n    }\n\n    .mobile-age-gate p{\n      margin:6px 0 0;\n      color:#d1d5db;\n      font-size:13px;\n      line-height:1.45;\n    }\n\n    .mobile-age-gate .age-tabs{\n      margin-top:10px;\n    }\n\n    .mobile-age-sticky{\n      position:fixed;\n      left:50%;\n      bottom:12px;\n      transform:translateX(-50%);\n      width:min(520px,calc(100vw - 24px));\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      padding:10px 12px;\n      border-radius:14px;\n      border:1px solid rgb(255 255 255 / 18%);\n      background:rgb(15 23 42 / 92%);\n      color:#f8fafc;\n      box-shadow:0 14px 34px rgb(2 6 23 / 32%);\n      z-index:calc(var(--z-overlay) + 1);\n      backdrop-filter:blur(8px);\n    }\n\n    .mobile-age-sticky span{\n      font-size:12px;\n      line-height:1.35;\n      color:#e5e7eb;\n    }\n\n    .mobile-age-sticky-btn{\n      min-height:36px;\n      padding:0 12px;\n      border-radius:10px;\n      border:none;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      white-space:nowrap;\n    }\n\n    .trust-callout{\n      margin-bottom:14px;\n      border-radius:22px;\n      padding:18px;\n      border:1px solid var(--line);\n      background:\n        radial-gradient(circle at 15% 20%, rgb(255 138 0 / 12%), transparent 24%),\n        linear-gradient(135deg,#fff8f0,#fff);\n      box-shadow:var(--shadow);\n    }\n\n    .trust-callout h4{\n      margin:0 0 8px;\n      font-size:22px;\n      letter-spacing:-.03em;\n      line-height:1.15;\n    }\n\n    .trust-callout p{\n      margin:0;\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n    }\n\n    .book-card{\n      margin-top:14px;\n      display:grid;\n      grid-template-columns:1fr auto;\n      gap:14px;\n      align-items:center;\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:22px;\n      padding:16px;\n      box-shadow:var(--shadow);\n    }\n\n    .book-card h4{\n      margin:0 0 6px;\n      font-size:18px;\n      letter-spacing:-.02em;\n    }\n\n    .book-card p{\n      margin:0;\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .faq-groups{\n      display:grid;\n      gap:12px;\n      margin-top:14px;\n    }\n\n    .faq-filter-row{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n      margin:14px 0 6px;\n    }\n\n    .faq-filter-chip{\n      border:none;\n      border-radius:999px;\n      padding:10px 12px;\n      background:#f5f7fb;\n      color:#111827;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease;\n    }\n\n    .faq-filter-chip:hover{\n      transform:translateY(-1px);\n      box-shadow:0 14px 26px rgb(20 29 45 / 10%);\n    }\n\n    .faq-filter-chip.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .faq-group{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:20px;\n      padding:16px;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease;\n    }\n\n    .faq-group:hover{\n      transform:translateY(-1px);\n      box-shadow:0 22px 42px rgb(20 29 45 / 10%);\n    }\n\n    .faq-group-head{\n      display:flex;\n      align-items:center;\n      gap:10px;\n      margin-bottom:12px;\n    }\n\n    .faq-icon{\n      width:36px;\n      height:36px;\n      border-radius:12px;\n      background:#fff1df;\n      color:#d66a00;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:12px;\n      font-weight:800;\n      text-transform:uppercase;\n      letter-spacing:.06em;\n      flex:0 0 auto;\n    }\n\n    .faq-group-head strong{\n      font-size:16px;\n      letter-spacing:-.01em;\n    }\n\n    .faq-list{\n      display:grid;\n      gap:10px;\n    }\n\n    .faq-line{\n      padding:12px 14px;\n      border-radius:16px;\n      background:#fafbfd;\n      border:1px solid #eef1f5;\n    }\n\n    .faq-line strong{\n      display:block;\n      margin-bottom:6px;\n      font-size:14px;\n      line-height:1.45;\n    }\n\n    .faq-line span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.6;\n    }\n\n    .faq-grid{\n      display:grid;\n      gap:10px;\n    }\n\n    .faq-item{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:18px;\n      padding:14px 16px;\n    }\n\n    .faq-item strong{\n      display:block;\n      margin-bottom:6px;\n      font-size:15px;\n    }\n\n    .faq-item span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .contacts-row{\n      display:grid;\n      grid-template-columns:repeat(4,1fr);\n      gap:12px;\n    }\n\n    .contact-card{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:18px;\n      padding:16px;\n      text-align:center;\n    }\n\n    .contact-icon{\n      width:42px;\n      height:42px;\n      border-radius:50%;\n      margin:0 auto 10px;\n      background:#fff1df;\n      color:#d66a00;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:18px;\n      font-weight:800;\n    }\n\n    footer{\n      padding:18px;\n      background:#fff;\n      border-radius:24px;\n      border:1px solid var(--line);\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:20px;\n    }\n\n    footer h4{\n      margin:0 0 8px;\n      font-size:14px;\n    }\n\n    footer a, footer div{\n      display:block;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.8;\n      text-decoration:none;\n    }\n\n    .footer-legal-links{\n      margin-top:6px;\n      padding-top:8px;\n      border-top:1px dashed #d9e1ed;\n      display:grid;\n      gap:2px;\n    }\n\n    .footer-org-meta{\n      margin-top:8px;\n      display:grid;\n      gap:2px;\n      padding-top:8px;\n      border-top:1px dashed #e1e7f0;\n    }\n\n    .footer-org-meta div{\n      line-height:1.55;\n      font-size:12px;\n      color:#6d7586;\n    }\n\n    .legal-links-grid{\n      display:grid;\n      gap:8px;\n      margin-top:8px;\n    }\n\n    .legal-links-grid a{\n      color:#4a5568;\n      font-size:14px;\n      line-height:1.55;\n      text-decoration:none;\n    }\n\n    .legal-links-grid a:hover{\n      color:#1f2937;\n      text-decoration:underline;\n    }\n\n    .legal-meta-grid{\n      margin-top:10px;\n      padding-top:10px;\n      border-top:1px dashed #dce5f1;\n      display:grid;\n      gap:4px;\n      color:#6d7586;\n      font-size:12px;\n      line-height:1.55;\n    }\n\n    .mobile-journey-band{\n      margin-top:8px;\n    }\n\n    .mobile-about-features{\n      display:grid;\n      gap:8px;\n      margin-top:10px;\n    }\n\n    .mobile-about-feature-item{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:4px;\n    }\n\n    .mobile-about-feature-item small{\n      color:#6b7280;\n      font-size:11px;\n      font-weight:800;\n      text-transform:uppercase;\n      letter-spacing:.05em;\n    }\n\n    .mobile-about-feature-item strong{\n      color:#111827;\n      font-size:15px;\n      line-height:1.3;\n    }\n\n    .mobile-about-feature-item p{\n      margin:0;\n      color:#5b6474;\n      font-size:13px;\n      line-height:1.48;\n    }\n\n    .mobile-journey-flow{\n      margin-top:10px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-journey-active{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:6px;\n    }\n\n    .mobile-journey-active-heading{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      min-width:0;\n    }\n\n    .mobile-journey-active-index{\n      width:26px;\n      height:26px;\n      border-radius:999px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:12px;\n      font-weight:900;\n    }\n\n    .mobile-journey-active strong{\n      font-size:16px;\n      line-height:1.3;\n      color:#111827;\n    }\n\n    .mobile-journey-active p{\n      margin:0;\n      color:#5b6474;\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .mobile-journey-switcher{\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      gap:8px;\n      width:100%;\n      min-width:0;\n      max-width:100%;\n      overflow:hidden;\n    }\n\n    .mobile-journey-switch{\n      border:1px solid var(--line);\n      border-radius:12px;\n      min-height:40px;\n      padding:8px 10px;\n      background:#fff;\n      color:#253247;\n      text-align:left;\n      font-size:12px;\n      font-weight:700;\n      line-height:1.3;\n      cursor:pointer;\n      display:grid;\n      grid-template-columns:18px minmax(0,1fr);\n      column-gap:6px;\n      align-items:center;\n      box-shadow:var(--shadow);\n      width:100%;\n      min-width:0;\n      max-width:100%;\n      overflow:hidden;\n      white-space:normal;\n      word-break:break-word;\n    }\n\n    .mobile-journey-switch span{\n      width:18px;\n      height:18px;\n      border-radius:999px;\n      background:#edf2f8;\n      color:#374151;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:10px;\n      font-weight:900;\n      flex:0 0 auto;\n    }\n\n    .mobile-journey-switch.active{\n      border-color:transparent;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .mobile-journey-switch.active span{\n      background:rgb(255 255 255 / 22%);\n      color:#fff;\n    }\n\n    .mobile-programs-flow{\n      margin-top:10px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-program-selector{\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-program-selector::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-program-chip{\n      border:none;\n      border-radius:999px;\n      min-height:32px;\n      padding:0 12px;\n      white-space:nowrap;\n      background:#eef3f9;\n      color:#162235;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n    }\n\n    .mobile-program-chip.active{\n      color:#fff;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 8px 16px rgb(255 138 0 / 24%);\n    }\n\n    .mobile-program-active-card{\n      border:1px solid var(--line);\n      border-radius:16px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-program-active-card strong{\n      color:#111827;\n      font-size:15px;\n      line-height:1.35;\n    }\n\n    .mobile-program-price{\n      color:#111827;\n      font-size:24px;\n      font-weight:900;\n      letter-spacing:-.02em;\n    }\n\n    .mobile-program-meta{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n    }\n\n    .mobile-program-meta span{\n      min-height:24px;\n      padding:0 10px;\n      border-radius:999px;\n      display:inline-flex;\n      align-items:center;\n      background:#eff3f9;\n      color:#334155;\n      font-size:11px;\n      font-weight:700;\n    }\n\n    .mobile-program-active-card p{\n      margin:0;\n      color:#5b6474;\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .mobile-program-hint{\n      color:#6b7280;\n      font-size:12px;\n      line-height:1.4;\n    }\n\n    .overlay{\n      position:fixed;\n      inset:0;\n      background:rgb(9 14 22 / 64%);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:24px;\n      z-index:var(--z-overlay);\n      animation:fade-in .18s ease;\n    }\n\n    .overlay-card{\n      width:min(100%, 520px);\n      background:#fff;\n      border-radius:26px;\n      box-shadow:0 25px 55px rgb(20 29 45 / 16%);\n      padding:22px;\n      border:1px solid #edf0f5;\n      animation:modal-up .22s ease;\n    }\n\n    .section-modal-card{\n      width:min(100%, 980px);\n      max-height:min(90vh, 920px);\n      padding:0;\n      overflow:hidden;\n      display:flex;\n      flex-direction:column;\n      background:#f4f7fb;\n    }\n\n    .overlay.section-modal-compact{\n      align-items:flex-start;\n      justify-content:flex-start;\n      padding:84px 0 0 18px;\n      background:linear-gradient(90deg, rgb(9 14 22 / 58%) 0%, rgb(9 14 22 / 44%) 56%, rgb(9 14 22 / 0%) 58%);\n    }\n\n    .overlay.section-modal-compact .section-modal-card{\n      width:var(--section-modal-compact-width);\n      max-width:calc(100vw - 420px);\n      max-height:var(--section-modal-compact-max-height);\n      border-radius:20px;\n      box-shadow:0 20px 56px rgb(7 12 20 / 30%);\n    }\n\n    .overlay.section-modal-compact .section-modal-head,\n    .overlay.section-modal-mobile .section-modal-head{\n      padding:14px 16px;\n    }\n\n    .overlay.section-modal-compact .section-modal-head h3,\n    .overlay.section-modal-mobile .section-modal-head h3{\n      font-size:20px;\n    }\n\n    .overlay.section-modal-compact .section-modal-body,\n    .overlay.section-modal-mobile .section-modal-body{\n      padding:14px;\n    }\n\n    .overlay.section-modal-mobile{\n      align-items:flex-end;\n      justify-content:center;\n      padding:0;\n      background:rgb(9 14 22 / 64%);\n    }\n\n    .overlay.section-modal-mobile .section-modal-card{\n      width:100%;\n      max-width:100%;\n      max-height:84vh;\n      border-radius:20px 20px 0 0;\n    }\n\n    .section-modal-head{\n      padding:16px 18px;\n      border-bottom:1px solid #e5ebf4;\n      background:#fff;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n    }\n\n    .section-modal-head h3{\n      margin:0;\n      font-size:22px;\n      letter-spacing:-.02em;\n      color:#111827;\n    }\n\n    .section-modal-body{\n      padding:18px;\n      overflow:auto;\n      display:grid;\n      gap:12px;\n    }\n\n    .section-modal-body .section-card{\n      margin:0;\n      border-radius:20px;\n      box-shadow:none;\n    }\n\n    .section-modal-body .section-card h3{\n      display:none;\n    }\n\n    .overlay-card.dark{\n      background:#121821;\n      border-color:rgb(255 255 255 / 8%);\n      color:#fff;\n    }\n\n    .overlay-card h3{\n      margin:0 0 8px;\n      font-size:24px;\n      letter-spacing:-.03em;\n    }\n\n    .overlay-card p{\n      margin:0 0 16px;\n      color:var(--muted);\n      line-height:1.55;\n      font-size:14px;\n    }\n\n    .overlay-card.dark p{\n      color:rgb(255 255 255 / 72%);\n    }\n\n    .mobile-faq-list,\n    .mobile-team-list,\n    .mobile-stay-list,\n    .mobile-contacts-list{\n      display:grid;\n      gap:10px;\n      margin-top:10px;\n    }\n\n    .mobile-faq-card,\n    .mobile-team-card,\n    .mobile-stay-card,\n    .mobile-contact-card{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      padding:12px;\n      box-shadow:var(--shadow);\n    }\n\n    .mobile-media-filter-row{\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      margin-top:10px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-media-filter-row::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-media-filter{\n      border:none;\n      border-radius:999px;\n      min-height:32px;\n      padding:0 12px;\n      white-space:nowrap;\n      background:#eff3f9;\n      color:#111827;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n    }\n\n    .mobile-media-filter.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      box-shadow:0 10px 20px rgb(255 138 0 / 22%);\n    }\n\n    .mobile-media-stage{\n      margin-top:10px;\n      border-radius:16px;\n      overflow:hidden;\n      background:#0f172a;\n      position:relative;\n      min-height:208px;\n    }\n\n    .mobile-media-stage img{\n      width:100%;\n      height:100%;\n      min-height:208px;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-media-stage button{\n      appearance:none;\n      border:none;\n      width:100%;\n      padding:0;\n      background:transparent;\n      cursor:pointer;\n      text-align:left;\n    }\n\n    .mobile-media-overlay{\n      position:absolute;\n      inset:auto 0 0 0;\n      padding:12px;\n      background:linear-gradient(180deg, rgb(2 6 23 / 0%) 0%, rgb(2 6 23 / 82%) 100%);\n      color:#fff;\n      display:grid;\n      gap:6px;\n    }\n\n    .mobile-media-overlay strong{\n      font-size:14px;\n      line-height:1.3;\n      color:#fff;\n    }\n\n    .mobile-media-overlay span{\n      font-size:12px;\n      line-height:1.3;\n      color:rgb(255 255 255 / 80%);\n    }\n\n    .mobile-media-play{\n      position:absolute;\n      top:50%;\n      left:50%;\n      transform:translate(-50%, -50%);\n      width:54px;\n      height:54px;\n      border-radius:50%;\n      background:rgb(255 255 255 / 92%);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      box-shadow:0 12px 24px rgb(15 23 42 / 24%);\n    }\n\n    .mobile-media-play img{\n      width:24px;\n      height:24px;\n      min-height:0;\n      object-fit:contain;\n      filter:brightness(0) saturate(100%) invert(55%) sepia(92%) saturate(2044%) hue-rotate(359deg) brightness(103%) contrast(105%);\n    }\n\n    .mobile-media-strip{\n      margin-top:10px;\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-media-strip::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-media-thumb{\n      border:none;\n      background:transparent;\n      padding:0;\n      min-width:72px;\n      width:72px;\n      border-radius:10px;\n      overflow:hidden;\n      position:relative;\n      cursor:pointer;\n      border:2px solid transparent;\n      box-shadow:0 8px 16px rgb(15 23 42 / 18%);\n    }\n\n    .mobile-media-thumb.active{\n      border-color:var(--accent);\n    }\n\n    .mobile-media-thumb img{\n      width:100%;\n      height:72px;\n      display:block;\n      object-fit:cover;\n    }\n\n    .mobile-review-social-proof{\n      margin-top:10px;\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-review-top{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n    }\n\n    .mobile-review-top strong{\n      font-size:32px;\n      line-height:1;\n      color:#d97706;\n      letter-spacing:-.02em;\n    }\n\n    .mobile-review-stars{\n      color:#f59e0b;\n      font-size:16px;\n      font-weight:800;\n      letter-spacing:1px;\n      margin-left:4px;\n    }\n\n    .mobile-review-proof{\n      font-size:13px;\n      line-height:1.45;\n      color:#111827;\n      font-weight:700;\n    }\n\n    .mobile-review-main{\n      margin-top:10px;\n    }\n\n    .mobile-review-card{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-review-head{\n      display:grid;\n      grid-template-columns:44px 1fr;\n      gap:10px;\n      align-items:center;\n    }\n\n    .mobile-review-head img{\n      width:44px;\n      height:44px;\n      border-radius:50%;\n      object-fit:cover;\n      border:1px solid var(--line);\n    }\n\n    .mobile-review-head strong{\n      font-size:14px;\n      line-height:1.2;\n      color:#111827;\n      display:block;\n    }\n\n    .mobile-review-head span{\n      font-size:12px;\n      line-height:1.3;\n      color:var(--muted);\n      display:block;\n      margin-top:2px;\n    }\n\n    .mobile-review-text{\n      color:#1f2937;\n      font-size:13px;\n      line-height:1.5;\n      display:-webkit-box;\n      -webkit-line-clamp:6;\n      -webkit-box-orient:vertical;\n      overflow:hidden;\n    }\n\n    .mobile-review-dots{\n      margin-top:10px;\n      display:flex;\n      gap:6px;\n      justify-content:center;\n    }\n\n    .mobile-review-dot{\n      width:7px;\n      height:7px;\n      border-radius:50%;\n      border:none;\n      background:#cbd5e1;\n      padding:0;\n      cursor:pointer;\n    }\n\n    .mobile-review-dot.active{\n      background:var(--accent);\n      box-shadow:0 0 0 3px rgb(255 138 0 / 18%);\n    }\n\n    .mobile-faq-card strong,\n    .mobile-team-card strong,\n    .mobile-stay-card strong,\n    .mobile-contact-card strong{\n      display:block;\n      margin:0 0 6px;\n      font-size:14px;\n      line-height:1.45;\n      color:#111827;\n    }\n\n    .mobile-faq-card span,\n    .mobile-team-card span,\n    .mobile-stay-card span,\n    .mobile-contact-card span{\n      display:block;\n      margin:0;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .mobile-team-card{\n      display:grid;\n      grid-template-columns:56px 1fr;\n      gap:10px;\n      align-items:start;\n    }\n\n    .mobile-team-avatar{\n      width:56px;\n      height:56px;\n      border-radius:50%;\n      overflow:hidden;\n      border:1px solid var(--line);\n      background:#f3f6fb;\n    }\n\n    .mobile-team-avatar img{\n      width:100%;\n      height:100%;\n      display:block;\n      object-fit:cover;\n    }\n\n    .mobile-stay-card{\n      display:grid;\n      grid-template-columns:84px 1fr;\n      gap:10px;\n      align-items:start;\n    }\n\n    .mobile-stay-thumb{\n      width:84px;\n      height:70px;\n      border-radius:10px;\n      overflow:hidden;\n      border:1px solid var(--line);\n      background:#f3f6fb;\n    }\n\n    .mobile-stay-thumb img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-contact-card a{\n      color:#111827;\n      text-decoration:none;\n      font-weight:700;\n      font-size:16px;\n      line-height:1.3;\n    }\n\n    .mobile-socials-row{\n      margin-top:10px;\n      display:flex;\n      flex-wrap:wrap;\n      gap:8px;\n    }\n\n    .mobile-social-link{\n      min-height:38px;\n      border-radius:999px;\n      border:1px solid var(--line);\n      background:#fff;\n      text-decoration:none;\n      color:#111827;\n      display:inline-flex;\n      align-items:center;\n      justify-content:flex-start;\n      gap:6px;\n      padding:0 10px;\n      box-shadow:var(--shadow);\n    }\n\n    .mobile-social-icon{\n      width:20px;\n      height:20px;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n    }\n\n    .mobile-social-icon .social-badge-mark{\n      min-width:0;\n      width:auto;\n      height:auto;\n      border:none;\n      background:transparent;\n      color:#111827;\n      padding:0;\n      font-size:11px;\n      letter-spacing:.06em;\n    }\n\n    .mobile-social-label{\n      font-size:12px;\n      font-weight:700;\n      color:#253247;\n      line-height:1;\n      white-space:nowrap;\n    }\n\n    .mobile-faq-filter-row{\n      display:flex;\n      gap:8px;\n      margin-top:10px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-faq-filter-row::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-faq-filter-chip{\n      border:none;\n      border-radius:999px;\n      min-height:32px;\n      padding:0 12px;\n      white-space:nowrap;\n      background:#eef3f9;\n      color:#162235;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n    }\n\n    .mobile-faq-filter-chip.active{\n      color:#fff;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 8px 16px rgb(255 138 0 / 24%);\n    }\n\n    .mobile-faq-accordion{\n      display:grid;\n      gap:8px;\n      margin-top:10px;\n    }\n\n    .mobile-faq-item{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      overflow:hidden;\n    }\n\n    .mobile-faq-question{\n      width:100%;\n      border:none;\n      background:transparent;\n      min-height:48px;\n      padding:12px;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      cursor:pointer;\n      text-align:left;\n    }\n\n    .mobile-faq-question span{\n      font-size:14px;\n      font-weight:700;\n      line-height:1.35;\n      color:#111827;\n    }\n\n    .mobile-faq-question .ac-icon{\n      width:14px;\n      height:14px;\n      transform:rotate(90deg);\n      opacity:.68;\n      transition:transform .18s ease;\n    }\n\n    .mobile-faq-item.open .mobile-faq-question .ac-icon{\n      transform:rotate(-90deg);\n    }\n\n    .mobile-faq-answer{\n      display:none;\n      padding:0 12px 12px;\n      color:#4b5563;\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .mobile-faq-item.open .mobile-faq-answer{\n      display:block;\n    }\n\n    .mobile-team-list{\n      display:grid;\n      gap:10px;\n      margin-top:10px;\n    }\n\n    .mobile-team-feature-card,\n    .mobile-team-founder-card,\n    .mobile-team-teacher-card{\n      border:1px solid var(--line);\n      border-radius:16px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n    }\n\n    .mobile-team-feature-cover-wrap{\n      border-radius:12px;\n      overflow:hidden;\n      border:1px solid #f7c58a;\n      background:#fff6ea;\n      margin-bottom:10px;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      min-height:170px;\n      cursor:pointer;\n    }\n\n    .mobile-team-feature-cover{\n      width:132px;\n      max-width:60%;\n      height:auto;\n      object-fit:contain;\n      display:block;\n    }\n\n    .mobile-team-feature-card strong,\n    .mobile-team-founder-card strong,\n    .mobile-team-teacher-card strong{\n      display:block;\n      margin:0 0 4px;\n      font-size:16px;\n      line-height:1.28;\n      color:#111827;\n    }\n\n    .mobile-team-feature-card span,\n    .mobile-team-founder-card p,\n    .mobile-team-teacher-card p{\n      margin:0;\n      color:#5b6474;\n      font-size:13px;\n      line-height:1.48;\n    }\n\n    .mobile-team-feature-cta{\n      margin-top:10px;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:38px;\n      padding:0 12px;\n      border-radius:12px;\n      color:#fff;\n      text-decoration:none;\n      font-size:12px;\n      font-weight:800;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n    }\n\n    .mobile-team-role{\n      display:block;\n      margin-bottom:8px;\n      font-size:12px;\n      font-weight:700;\n      color:#6b7280;\n    }\n\n    .mobile-team-carousel-block{\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-team-carousel-head{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n    }\n\n    .mobile-team-carousel-head strong{\n      margin:0;\n      font-size:14px;\n      line-height:1.2;\n      color:#111827;\n    }\n\n    .mobile-team-carousel-controls{\n      display:flex;\n      gap:6px;\n    }\n\n    .mobile-team-carousel-controls button{\n      width:30px;\n      height:30px;\n      border-radius:10px;\n      border:1px solid var(--line);\n      background:#fff;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n    }\n\n    .mobile-team-carousel-controls .ac-icon{\n      width:14px;\n      height:14px;\n    }\n\n    .mobile-team-carousel-dots{\n      display:flex;\n      justify-content:center;\n      gap:6px;\n    }\n\n    .mobile-team-dot{\n      width:7px;\n      height:7px;\n      border-radius:50%;\n      border:none;\n      background:#cbd5e1;\n      cursor:pointer;\n      padding:0;\n    }\n\n    .mobile-team-dot.active{\n      background:var(--accent);\n      box-shadow:0 0 0 3px rgb(255 138 0 / 18%);\n    }\n\n    .mobile-map-preview-card{\n      border:1px solid var(--line);\n      border-radius:16px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-map-preview{\n      border-radius:12px;\n      overflow:hidden;\n      border:1px solid var(--line);\n      height:164px;\n      background:#dbe4f4;\n    }\n\n    .mobile-map-preview iframe{\n      width:100%;\n      height:100%;\n      border:0;\n      display:block;\n    }\n\n    .mobile-map-preview-card strong{\n      margin:0;\n      font-size:14px;\n      line-height:1.35;\n      color:#111827;\n    }\n\n    .mobile-map-preview-card span{\n      margin:0;\n      font-size:12px;\n      line-height:1.45;\n      color:#5b6474;\n    }\n\n    .mobile-map-open-btn{\n      min-height:36px;\n      padding:0 12px;\n      border-radius:10px;\n      text-decoration:none;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      font-size:12px;\n      font-weight:800;\n      color:#fff;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      width:max-content;\n    }\n\n    .mobile-contact-grid{\n      margin-top:10px;\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      gap:8px;\n    }\n\n    .mobile-contact-card{\n      border:1px solid var(--line);\n      border-radius:12px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:10px;\n      text-decoration:none;\n      display:grid;\n      gap:2px;\n      min-height:58px;\n      align-content:center;\n    }\n\n    .mobile-contact-card small{\n      font-size:11px;\n      font-weight:700;\n      color:#6b7280;\n      line-height:1.2;\n    }\n\n    .mobile-contact-card strong{\n      margin:0;\n      font-size:13px;\n      line-height:1.25;\n      color:#111827;\n    }\n\n    .mobile-socials-row{\n      margin-top:10px;\n      display:grid;\n      grid-template-columns:repeat(3,minmax(0,1fr));\n      gap:8px;\n    }\n\n    .mobile-social-link{\n      min-height:34px;\n      border-radius:10px;\n      padding:0 8px;\n      justify-content:center;\n    }\n\n    .mobile-social-icon .social-badge-mark{\n      font-size:10px;\n    }\n\n    .mobile-social-label{\n      font-size:11px;\n      font-weight:700;\n    }\n\n    .mobile-docs-requisites{\n      margin-top:10px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-docs-card{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:4px;\n      color:#4b5563;\n      font-size:13px;\n      line-height:1.45;\n    }\n\n    .mobile-docs-card strong{\n      color:#111827;\n      font-size:15px;\n      line-height:1.3;\n      margin-bottom:4px;\n    }\n\n    .mobile-docs-card a{\n      color:#334155;\n      text-decoration:none;\n    }\n\n    .mobile-docs-card a:hover{\n      text-decoration:underline;\n    }\n\n    .mobile-docs-accordion{\n      margin-top:8px;\n    }\n\n    .mobile-docs-accordion-item{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      overflow:hidden;\n    }\n\n    .mobile-docs-toggle{\n      width:100%;\n      border:none;\n      background:transparent;\n      min-height:46px;\n      padding:10px 12px;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      text-align:left;\n      cursor:pointer;\n    }\n\n    .mobile-docs-toggle span{\n      color:#111827;\n      font-size:13px;\n      font-weight:800;\n      line-height:1.3;\n    }\n\n    .mobile-docs-toggle .ac-icon{\n      width:14px;\n      height:14px;\n      transform:rotate(90deg);\n      opacity:.68;\n      transition:transform .18s ease;\n    }\n\n    .mobile-docs-accordion-item.open .mobile-docs-toggle .ac-icon{\n      transform:rotate(-90deg);\n    }\n\n    .mobile-docs-links{\n      display:none;\n      padding:0 12px 12px;\n      gap:8px;\n      grid-template-columns:1fr;\n    }\n\n    .mobile-docs-accordion-item.open .mobile-docs-links{\n      display:grid;\n    }\n\n    .mobile-docs-links a{\n      color:#4b5563;\n      text-decoration:none;\n      font-size:13px;\n      line-height:1.45;\n    }\n\n    .mobile-docs-links a:hover{\n      text-decoration:underline;\n      color:#253247;\n    }\n\n    .big-price{\n      font-size:42px;\n      font-weight:900;\n      letter-spacing:-.04em;\n      margin-bottom:8px;\n    }\n\n    .offer-headline{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:10px;\n      margin-bottom:8px;\n    }\n\n    .offer-headline h3{\n      margin:0;\n    }\n\n    .offer-close-btn{\n      width:36px;\n      height:36px;\n      border-radius:10px;\n      background:rgb(255 255 255 / 8%);\n      border:1px solid rgb(255 255 255 / 14%);\n      color:#fff;\n      box-shadow:none;\n    }\n\n    .offer-progress-track{\n      height:10px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 12%);\n      overflow:hidden;\n      margin:4px 0 12px;\n    }\n\n    .offer-progress-fill{\n      width:0%;\n      height:100%;\n      border-radius:999px;\n      background:linear-gradient(90deg,#ff8a00,#ffb15e);\n      transition:width .55s ease;\n    }\n\n    .offer-progress-steps{\n      display:grid;\n      gap:8px;\n      margin-top:6px;\n      margin-bottom:2px;\n    }\n\n    .offer-progress-step{\n      color:rgb(255 255 255 / 62%);\n      font-size:12px;\n      line-height:1.45;\n    }\n\n    .offer-progress-step.active{\n      color:#fff;\n      font-weight:800;\n    }\n\n    .offer-code{\n      display:inline-flex;\n      margin-top:10px;\n      padding:8px 10px;\n      border-radius:999px;\n      background:#f7f8fb;\n      color:var(--muted);\n      font-size:12px;\n      font-weight:700;\n    }\n\n    .overlay-card.dark .offer-code{\n      background:rgb(255 255 255 / 8%);\n      color:rgb(255 255 255 / 76%);\n    }\n\n    .overlay-actions{\n      display:grid;\n      gap:10px;\n      margin-top:16px;\n    }\n\n    .secondary-outline{\n      width:100%;\n      border:1px solid var(--line);\n      background:#fff;\n      color:var(--text);\n      border-radius:16px;\n      padding:15px 16px;\n      font-size:14px;\n      font-weight:800;\n      cursor:pointer;\n      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n    }\n\n    .secondary-outline:hover{\n      transform:translateY(-1px);\n      box-shadow:0 14px 26px rgb(20 29 45 / 8%);\n      border-color:#d4dae5;\n    }\n\n    .overlay-card.dark .secondary-outline{\n      background:rgb(255 255 255 / 4%);\n      border-color:rgb(255 255 255 / 10%);\n      color:#fff;\n    }\n\n    .summary-bar{\n      position:fixed;\n      bottom:0;\n      left:0;\n      right:0;\n      z-index:var(--z-summary);\n      background:rgb(255 255 255 / 95%);\n      backdrop-filter:blur(18px);\n      border-top:1px solid var(--line);\n      box-shadow:0 -12px 32px rgb(20 29 45 / 7%);\n      animation:summary-in .24s ease;\n    }\n\n    .compact-mode .summary-bar{\n      background:rgb(255 255 255 / 96%);\n    }\n\n    .summary-inner{\n      max-width:1440px;\n      margin:0 auto;\n      padding:14px 24px;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:20px;\n    }\n\n    .summary-visible .page{\n      padding-bottom:130px;\n    }\n\n    .summary-left{\n      display:flex;\n      align-items:center;\n      gap:14px;\n      flex-wrap:wrap;\n    }\n\n    .summary-item{\n      font-size:15px;\n      font-weight:700;\n    }\n\n    .summary-sub{\n      font-size:12px;\n      color:var(--muted);\n      margin-top:3px;\n    }\n\n    .summary-right{\n      display:flex;\n      align-items:center;\n      gap:12px;\n    }\n\n    .summary-price{\n      text-align:right;\n    }\n\n    .summary-price strong{\n      display:block;\n      font-size:26px;\n      letter-spacing:-.03em;\n    }\n\n    .summary-timer{\n      color:#d56e00;\n      font-size:12px;\n      font-weight:800;\n    }\n\n    .form-drawer{\n      position:fixed;\n      inset:0;\n      background:rgb(8 12 18 / 58%);\n      z-index:var(--z-overlay);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:24px;\n      animation:fade-in .18s ease;\n    }\n\n    .version-badge{\n      z-index:var(--z-debug);\n    }\n\n    .version-badge.hidden{\n      display:none;\n    }\n\n    .form-panel{\n      width:min(100%, 720px);\n      background:#fff;\n      border-radius:28px;\n      padding:24px 22px 26px;\n      box-shadow:0 -24px 60px rgb(20 29 45 / 16%);\n      max-height:min(92vh, 860px);\n      overflow:auto;\n      animation:drawer-up .24s ease;\n    }\n\n    .booking-summary-box{\n      margin:0 0 16px;\n      padding:16px;\n      border:1px solid var(--line);\n      border-radius:18px;\n      background:linear-gradient(135deg,#fbfcfe,#fff);\n      display:grid;\n      gap:8px;\n    }\n\n    .booking-summary-box strong{\n      font-size:14px;\n      line-height:1.35;\n    }\n\n    .booking-summary-list{\n      display:grid;\n      gap:4px;\n      color:#5b6678;\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .success-modal-note{\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n      margin-bottom:14px;\n    }\n\n    .success-delivery-state{\n      margin:0 0 14px;\n      padding:10px 12px;\n      border-radius:12px;\n      border:1px solid #f6d28d;\n      background:#fff6e8;\n      color:#8a4b00;\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .success-delivery-state.error{\n      border-color:#efb2b2;\n      background:#fff3f3;\n      color:#9f2f2f;\n    }\n\n    .success-check{\n      width:64px;\n      height:64px;\n      border-radius:50%;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      margin:0 auto 14px;\n      background:linear-gradient(135deg,#fff7ef,#fff);\n      border:2px solid rgb(255 138 0 / 20%);\n      color:var(--accent);\n      font-size:28px;\n      font-weight:900;\n      box-shadow:0 14px 28px rgb(255 138 0 / 12%);\n    }\n\n    .form-head{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:12px;\n      margin-bottom:14px;\n    }\n\n    .form-head-main{\n      min-width:0;\n    }\n\n    .form-close{\n      width:42px;\n      height:42px;\n      border:none;\n      border-radius:12px;\n      background:#f5f7fb;\n      color:#111827;\n      font-size:20px;\n      font-weight:900;\n      cursor:pointer;\n      flex:0 0 auto;\n      transition:transform .15s ease, box-shadow .15s ease, background .15s ease;\n    }\n\n    .form-close:hover{\n      transform:translateY(-1px);\n      box-shadow:0 12px 24px rgb(20 29 45 / 8%);\n      background:#eef2f7;\n    }\n\n    .form-panel h3{\n      margin:0 0 12px;\n      font-size:28px;\n      letter-spacing:-.03em;\n    }\n\n    .form-summary-box{\n      border:1px solid var(--line);\n      background:#fafbfd;\n      border-radius:20px;\n      padding:16px;\n      margin-bottom:16px;\n    }\n\n    .form-summary-box strong{\n      display:block;\n      margin-bottom:10px;\n      font-size:15px;\n    }\n\n    .form-summary-row{\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n    }\n\n    .form-grid{\n      display:grid;\n      gap:12px;\n    }\n\n    .form-field{\n      display:grid;\n      gap:6px;\n    }\n\n    .form-field label{\n      font-size:13px;\n      color:var(--muted);\n      font-weight:700;\n      line-height:1.35;\n    }\n\n    .input-box{\n      width:100%;\n      min-height:54px;\n      border-radius:16px;\n      border:1px solid var(--line);\n      background:#fff;\n      padding:0 16px;\n      font-size:15px;\n      color:var(--text);\n      outline:none;\n      transition:border-color .15s ease, box-shadow .15s ease, background .15s ease;\n    }\n\n    .input-box.input-error{\n      border-color:#e15b5b;\n      box-shadow:0 0 0 4px rgb(225 91 91 / 10%);\n      background:#fffafa;\n    }\n\n    .field-error{\n      margin-top:8px;\n      color:#c24141;\n      font-size:12px;\n      line-height:1.45;\n      display:none;\n    }\n\n    .field-error.visible{\n      display:block;\n    }\n\n    .input-box:focus{\n      border-color:#ffb15e;\n      box-shadow:0 0 0 4px rgb(255 138 0 / 10%);\n      background:#fffdfa;\n    }\n\n    .input-box::placeholder{\n      color:#95a0b0;\n    }\n\n    .form-panel .under-cta{\n      margin-top:10px;\n      color:var(--muted);\n      text-align:left;\n    }\n\n    @keyframes fade-in{\n      from{\n        opacity:0%;\n      }\n\n      to{\n        opacity:100%;\n      }\n    }\n\n    @keyframes modal-up{\n      from{\n        opacity:0%;\n        transform:translateY(8px) scale(.985);\n      }\n\n      to{\n        opacity:100%;\n        transform:translateY(0) scale(1);\n      }\n    }\n\n    @keyframes drawer-up{\n      from{\n        opacity:0%;\n        transform:translateY(18px);\n      }\n\n      to{\n        opacity:100%;\n        transform:translateY(0);\n      }\n    }\n\n    @keyframes summary-in{\n      from{\n        opacity:0%;\n        transform:translateY(8px);\n      }\n\n      to{\n        opacity:100%;\n        transform:translateY(0);\n      }\n    }\n\n    .check-row{\n      display:flex;\n      align-items:flex-start;\n      gap:10px;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n      margin:6px 0 14px;\n    }\n\n    .muted-note{\n      color:var(--muted);\n      font-size:13px;\n      margin-top:10px;\n      line-height:1.55;\n    }\n\n    @media (width <= 1180px){\n      .hero-booking-card{\n        position:relative;\n        width:100%;\n        max-width:none;\n        margin-top:16px;\n        margin-bottom:0;\n        transform:none;\n        z-index:6;\n      }\n\n      .hero-content,.hero-content.full{\n        max-width:100%;\n        padding-right:0;\n      }\n\n      .hero-shell{\n        display:block;\n        min-height:auto;\n        overflow:hidden;\n      }\n\n      #desktop-booking-card{\n        height:auto;\n        min-height:0;\n        max-height:none;\n      }\n\n      #desktop-booking-card .booking-step-2{\n        flex:none;\n      }\n\n      #desktop-booking-card .shift-list{\n        max-height:none;\n        overflow:visible;\n      }\n\n      .hero-left-tools{\n        width:100%;\n        justify-content:flex-start;\n      }\n\n      .programs-layout{\n        grid-template-columns:1fr;\n      }\n\n      .programs-main-grid{\n        grid-template-columns:1fr;\n      }\n\n      .programs-short-block{\n        align-self:auto;\n      }\n\n      .grid-3,.slot-grid,.team-grid,.contacts-row,footer,.video-list,.contacts-grid,.socials-grid,.review-grid,.journey-grid,.results-band,.trust-band,.reviews-summary,.reviews-hero,.stay-grid{\n        grid-template-columns:1fr;\n      }\n\n      .photo-grid{\n        grid-template-columns:1fr;\n        grid-auto-rows:auto;\n      }\n\n      .photo-card.hero,\n      .photo-card.wide{\n        grid-row:auto;\n        grid-column:auto;\n        min-height:220px;\n      }\n\n      .video-card{\n        flex-basis:calc((100% - 24px) / 3);\n      }\n\n      .book-card{\n        grid-template-columns:1fr;\n      }\n\n      .book-team-cover-wrap{\n        min-height:180px;\n      }\n\n      .book-team-card{\n        grid-row:auto;\n      }\n\n      .team-layout{\n        grid-template-columns:1fr;\n      }\n\n      .team-right{\n        grid-template-rows:auto auto;\n      }\n\n      .team-core-grid{\n        grid-template-columns:1fr;\n      }\n\n      .team-carousel-shell{\n        grid-template-columns:1fr;\n      }\n\n      .team-carousel-nav{\n        display:none;\n      }\n\n      .team-carousel .team-card{\n        min-width:240px;\n        max-width:300px;\n        flex:0 0 auto;\n      }\n\n      .overlay.section-modal-compact{\n        padding:18px 12px;\n        background:rgb(9 14 22 / 64%);\n      }\n\n      .overlay.section-modal-compact .section-modal-card{\n        width:min(100%, 980px);\n        max-height:min(90vh, 920px);\n      }\n    }\n\n    @media (width <= 820px){\n      html,\n      body{\n        max-width:100%;\n        overflow-x:hidden;\n      }\n\n      .page,\n      .screen,\n      .hero-shell,\n      .mobile-hero,\n      .mobile-body-sections,\n      .section-card{\n        width:100%;\n        max-width:100%;\n        min-width:0;\n        overflow-x:clip;\n      }\n\n      .mobile-booking-card,\n      .mobile-booking-card .booking-step-block,\n      .mobile-booking-card .booking-step-1,\n      .mobile-booking-card .booking-step-2,\n      .mobile-booking-card .booking-step-3{\n        max-width:100%;\n        min-width:0;\n      }\n\n      .mobile-booking-card .selected-age-chip,\n      .mobile-booking-card .selected-shift-chip{\n        min-width:0;\n      }\n\n      .mobile-booking-card .selected-age-chip span,\n      .mobile-booking-card .selected-shift-chip span{\n        min-width:0;\n        overflow:hidden;\n        text-overflow:ellipsis;\n      }\n\n      .page{\n        padding:20px 14px 120px;\n      }\n\n      .summary-visible .page{\n        padding-bottom:200px;\n      }\n\n      .title h1{\n        font-size:28px;\n      }\n\n      .summary-inner{\n        flex-direction:column;\n        align-items:stretch;\n        padding:12px 14px;\n      }\n\n      .summary-right{\n        justify-content:space-between;\n        flex-wrap:wrap;\n      }\n\n      .summary-price{\n        text-align:left;\n      }\n\n      .hero-topbar{\n        margin-bottom:18px;\n        gap:10px;\n      }\n\n      .hero-tag{\n        margin-bottom:14px;\n      }\n\n      .feature-row{\n        gap:8px;\n      }\n\n      .hero-benefits-grid{\n        grid-template-columns:1fr;\n        gap:8px;\n      }\n\n      .hero-benefit-card{\n        min-height:auto;\n        padding:11px 12px;\n      }\n\n      .hero-benefit-card strong{\n        font-size:14px;\n      }\n\n      .hero-benefit-card span{\n        font-size:12px;\n      }\n\n      .feature-pill{\n        min-width:0;\n        width:100%;\n        padding:10px 11px;\n      }\n\n      .occupancy-badge{\n        margin-top:14px;\n      }\n\n      .age-tabs{\n        gap:8px;\n      }\n\n      .age-tab{\n        min-height:96px;\n        padding:10px 8px;\n      }\n\n      .age-tab-range{\n        font-size:17px;\n      }\n\n      .age-tab-track{\n        font-size:11px;\n      }\n\n      .age-tab-note{\n        display:none;\n      }\n\n      .reviews-score-row{\n        flex-direction:column;\n        align-items:flex-start;\n      }\n\n      .compact-mobile-hidden{\n        display:block;\n      }\n\n      .mobile-hero-nav{\n        width:100%;\n      }\n\n      .mobile-hero-nav-primary{\n        flex-wrap:nowrap;\n      }\n\n      .mobile-hero-nav-primary .mini-nav-link{\n        white-space:nowrap;\n      }\n\n      .mobile-hero-nav-secondary{\n        flex-wrap:nowrap;\n        overflow-x:auto;\n        padding-bottom:4px;\n        -webkit-overflow-scrolling:touch;\n        scrollbar-width:none;\n      }\n\n      .mobile-hero-nav-secondary::-webkit-scrollbar{\n        display:none;\n      }\n\n      .mobile-brand{\n        width:42px;\n        height:42px;\n        padding:6px;\n        border-radius:10px;\n      }\n\n      .mobile-brand-label{\n        font-size:12px;\n        padding:7px 10px;\n        max-width:152px;\n      }\n\n      .mobile-mode-inline{\n        flex:1;\n        justify-content:flex-end;\n      }\n\n      .mobile-mode-inline .mobile-mode-btn{\n        flex:1;\n      }\n\n      .mobile-mode-inline .mobile-mode-toggle{\n        margin-left:auto;\n      }\n\n      .mobile-age-sticky{\n        width:calc(100vw - 16px);\n        bottom:8px;\n      }\n\n      .hero-mode-inline{\n        width:100%;\n      }\n\n      .hero-mode-inline .mode-btn{\n        flex:1;\n      }\n\n      .team-carousel .team-card{\n        min-width:86%;\n        max-width:86%;\n      }\n\n      .overlay{\n        padding:14px;\n      }\n\n      .overlay-card{\n        padding:18px;\n        border-radius:22px;\n      }\n\n      .section-modal-body{\n        padding:14px;\n      }\n\n      .form-panel{\n        padding:20px 16px 22px;\n        border-radius:24px 24px 0 0;\n        width:100%;\n        max-height:92vh;\n      }\n\n      .form-close{\n        width:38px;\n        height:38px;\n        border-radius:10px;\n      }\n\n      .book-team-title{\n        font-size:22px;\n      }\n\n      .book-team-cover{\n        max-width:160px;\n      }\n\n      .form-drawer{\n        align-items:flex-end;\n        padding:0;\n      }\n\n      .hero-shell{\n        display:block;\n        min-height:auto;\n      }\n\n      .hero-booking-card,\n      .mobile-booking-card{\n        margin-left:0;\n      }\n\n      .video-carousel-shell{\n        grid-template-columns:1fr;\n        gap:8px;\n      }\n\n      .video-carousel-nav{\n        display:none;\n      }\n\n      .video-card{\n        flex:0 0 min(82vw, 280px);\n      }\n\n      #version-badge{\n        top:auto !important;\n        right:12px !important;\n        bottom:12px !important;\n        opacity:50% !important;\n      }\n\n      .map-preview,\n      .map-frame{\n        min-height:220px;\n      }\n    }\n  \n";
    document.head.appendChild(style);
  }
})();

/* src/scripts/main.js */
/* src/scripts/main.js */
    const shifts = [
      {id:'shift-1',title:'1',dates:'30 мая — 8 июня',start:'2025-05-30',end:'2025-06-08',price:79000,left:12,occupied:33,badge:'HIT',desc:'Визуальное программирование, первые игры, логика.'},
      {id:'shift-2',title:'2.1',dates:'10 июня — 16 июня',start:'2025-06-10',end:'2025-06-16',price:48000,left:8,occupied:37,badge:'',desc:'Python, веб-проекты и командные мини-спринты.'},
      {id:'shift-3',title:'2.2',dates:'16 июня — 23 июня',start:'2025-06-16',end:'2025-06-23',price:65000,left:5,occupied:40,badge:'',desc:'AI-практика, анализ данных, проектная защита.'},
      {id:'shift-4',title:'2',dates:'10 июня — 23 июня',start:'2025-06-10',end:'2025-06-23',price:95000,left:14,occupied:31,badge:'',desc:'Длинная смена: полный цикл обучения и проектной практики.'},
      {id:'shift-5',title:'3',dates:'3 августа — 15 августа',start:'2025-08-03',end:'2025-08-15',price:89400,left:10,occupied:29,badge:'',desc:'Летняя смена: проекты, спорт и командный формат с фокусом на результат.'},
      {id:'shift-6',title:'4',dates:'17 августа — 26 августа',start:'2025-08-17',end:'2025-08-26',price:69600,left:9,occupied:27,badge:'',desc:'Финальная смена сезона: закрепление навыков и защита мини-проектов.'}
    ];
    const OFFER_DISCOUNT_FACTOR = 0.95;

    const mediaContent = {
      references: {
        yandexReviewsLabel: 'Отзывы на Яндекс Картах',
        yandexReviewsUrl: 'https://yandex.ru/maps/org/aydakemp/35558479035/reviews/',
        locationMapUrl: 'https://yandex.ru/maps/-/CPR0vYMT',
        locationMapEmbedUrl: 'https://yandex.ru/map-widget/v1/?ll=36.719422%2C55.261573&z=15&pt=36.719422,55.261573,pm2rdm',
        programmingBookUrl: 'https://www.codims.ru/python-book'
      },
      faq: [
        {
          group:'Медицина',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/med.svg',
          items:[
            {q:'Есть ли медик в лагере?',a:'Медработник на территории 24/7 всю смену.'},
            {q:'Что если ребёнок заболеет?',a:'Медик осматривает, при необходимости вызывает скорую. Вы получите звонок сразу.'},
            {q:'Можно давать лекарства?',a:'Передайте медику с инструкцией — будет выдавать по расписанию.'}
          ]
        },
        {
          group:'Безопасность',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/lock.svg',
          items:[
            {q:'Территория закрыта?',a:'Да, огорожена, КПП с охраной. Посторонние не допускаются.'},
            {q:'Сколько детей на вожатого?',a:'Не более 8–10 детей, вожатые работают в парах.'}
          ]
        },
        {
          group:'Питание',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/food.svg',
          items:[
            {q:'Сколько раз кормят?',a:'5 раз в день: завтрак, второй завтрак, обед, полдник, ужин. Всё горячее.'},
            {q:'Учитываются аллергии?',a:'Да. В лагере гипоаллергенная среда: минимум растений, которые вызывают аллергию.'}
          ]
        },
        {
          group:'Проживание',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/check.svg',
          items:[
            {q:'Сколько детей в комнате?',a:'2–4 человека, все удобства на этаже.'}
          ]
        },
        {
          group:'Связь',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/phone-mobile.svg',
          items:[
            {q:'Будет ли телефон у ребёнка?',a:'Лагерь «без телефонов». Сдаётся на хранение, звонки родителям 1–2 раза в день.'},
            {q:'Как следить что происходит?',a:'Родительский Telegram-чат, фото каждый день.'}
          ]
        }
      ],
      team: [
        {
          teamId:'team_01',
          bindKey:'дарья_афанасьева',
          fio:'Дарья Афанасьева',
          role:'основатель и вдохновитель АйДаКемп',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/15b41072_photo.png',
          bio:'предприниматель в сфере детского IT-образования и мама подростка, которая строит лагерь таким, каким сама хотела бы видеть обучение своего ребёнка.'
        },
        {
          teamId:'team_02',
          bindKey:'никита_брагин',
          fio:'Никита Брагин',
          role:'преподаватель Scratch, Minecraft и Python',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/dc9ef9b6_photo.png',
          bio:'автор учебника по разработке игр; специализируется на геймдеве и помогает детям создавать собственные игровые миры.'
        },
        {
          teamId:'team_03',
          bindKey:'александр_ташкин',
          fio:'Александр Ташкин',
          role:'преподаватель Scratch, Minecraft и Python',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/1e93e3b8_photo.png',
          bio:'соавтор учебника по разработке игр; умеет зажигать интерес к программированию через практические задачи и командные проекты.'
        },
        {
          teamId:'team_04',
          bindKey:'омар_алхамви',
          fio:'Омар Алхамви',
          role:'преподаватель Python и нейросетей',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/67852b0a_photo.png',
          bio:'работает со старшими и продвинутыми группами, часть занятий ведёт на английском и показывает, как применять AI в реальных проектах.'
        },
        {
          teamId:'team_05',
          bindKey:'дарья_воронцова',
          fio:'Дарья Воронцова',
          role:'преподаватель Python и Scratch',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/791a236a_ChatGPT_Image_18__20.png',
          bio:'помогает детям легко войти в программирование через игры, логику и первые самостоятельные программы.'
        }
      ],
      photos: [
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/atmosphere-pool-kids.jpeg',alt:'Атмосфера лагеря'},
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/a5f92a14_photo_2025-06-14_08-.jpg',alt:'all'},
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/8cca10f8_photo.jpg',alt:'all'},
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/1ac9b8f7_photo_2025-06-14_08-.jpg',alt:'all'},
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/1063273d_photo_2025-06-17_13-.jpg',alt:'all'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/a591ceb9_IMG_1543.JPG',alt:'study'},
        {cat:'food',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/9e4f4646_photo_2025-06-14_08-.jpg',alt:'food'},
        {cat:'food',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/8aee104b_photo_2025-06-14_08-.jpg',alt:'food'},
        {cat:'food',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/5babf9c8_photo.jpg',alt:'food'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/d8b90de0_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/7e509c20_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/81652cd9_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/0e2e55a2_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'pool',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/pool-kids-training.webp',alt:'Бассейн'},
        {cat:'pool',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/0d2ab9ef_photo_2025-06-14_08-.jpg',alt:'pool'},
        {cat:'pool',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/6a17713f_photo_2025-06-14_08-.jpg',alt:'pool'},
        {cat:'sport',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/cab7c193_photo.jpg',alt:'sport'},
        {cat:'sport',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/841dac3d_photo_2025-06-14_07-.jpg',alt:'sport'},
        {cat:'sport',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/e7095a88_photo_2025-06-14_08-.jpg',alt:'sport'}
      ],
      videos: [
        {
          title:'IT-лагерь — это не “сидеть за компьютером”. Вот что происходит на самом деле',
          url:'https://kinescope.io/embed/qmLxu2S7uaS44CKkhoV1Jj',
          cover:'https://edge-msk-11.kinescopecdn.net/14f5f68a-5403-49e7-9854-07f3d37b31cd/posters/f4189828-d218-4a2e-a103-dec988cca42a/poster_lg/35865925-2d43-426a-84f3-74989b3a65bb.jpg',
          orientation:'vertical'
        },
        {
          title:'За неделю в лагере ребёнок меняется больше, чем за год дома #результаты #АйДаКемп',
          url:'https://kinescope.io/embed/tJAaAnvCYYJ5vRz7uyUepj',
          cover:'https://edge-msk-1.kinescopecdn.net/14f5f68a-5403-49e7-9854-07f3d37b31cd/posters/3ffb469d-184c-4a4d-8944-184414a40d55/poster_lg/88340cab-36d7-4e68-bb7c-c4e8eec1eac0.jpg',
          orientation:'vertical'
        },
        {
          title:'Не хочу в лагерь… Через 3 дня_ ХОЧУ ЕЩЁ!',
          url:'https://kinescope.io/embed/naDfzrei9duApz3AnaencH',
          cover:'https://edge-msk-1.kinescopecdn.net/14f5f68a-5403-49e7-9854-07f3d37b31cd/posters/6401a850-e417-4313-92b9-f2a4ac8ac1bb/poster_lg/200d335b-73b4-43e3-b427-c6b270ebc01f.jpg',
          orientation:'vertical'
        },
        {
          title:'Ребенок сам откажется от телефона за 3 дня_! лагерь АйДаКемп #детскийлагерь #лагерьбезтелефонов',
          url:'https://kinescope.io/embed/eTmCgZHcwhcWQQs3HLCz1S',
          cover:'https://edge-msk-11.kinescopecdn.net/14f5f68a-5403-49e7-9854-07f3d37b31cd/posters/76e9a3e0-91a2-4019-a9fb-8ef54eaf76ff/poster_lg/e8cae335-b421-461d-bd90-5aa553717a05.jpg',
          orientation:'vertical'
        },
        {
          title:'Зачем детям копить деньги в лагере_ Узнай ответ!',
          url:'https://kinescope.io/embed/s1SCYKqLx6C94fMRumitHF',
          cover:'https://edge-msk-1.kinescopecdn.net/14f5f68a-5403-49e7-9854-07f3d37b31cd/posters/e78e019c-d1a6-47de-8b49-fbb13185c0c5/poster_lg/1487d473-8463-4b3e-8e41-f327343c7fc4.jpg',
          orientation:'vertical'
        }
      ],
      contacts: [
        {label:'city_phone',href:'tel:+74951234567',text:'+7 (495) 123-45-67'},
        {label:'mobile_phone',href:'tel:+79688086455',text:'+7 (968) 808-64-55'},
        {label:'whatsapp',href:'https://wa.me/79688086455',text:'WhatsApp'},
        {label:'telegram',href:'https://t.me/proga_school',text:'@proga_school'}
      ],
      socials: [
        { key:'VK', label:'VK', href:'https://vk.com/aidacamp' },
        { key:'Rutube', label:'RT', href:'https://rutube.ru/channel/53394996/' },
        { key:'Instagram', label:'IG', href:'https://www.instagram.com/aida_codit' },
        { key:'Одноклассники', label:'OK', href:'https://ok.ru/group/64689601773621' },
        { key:'YouTube', label:'YT', href:'https://www.youtube.com/@aidacamp' },
        { key:'LinkedIn', label:'LI', href:'https://www.linkedin.com/company/%D0%B8%D1%82-%D0%BB%D0%B0%D0%B3%D0%B5%D1%80%D1%8C-%D0%B4%D0%BB%D1%8F-%D0%B4%D0%B5%D1%82%D0%B5%D0%B9-%D0%B0%D0%B9%D0%B4%D0%B0%D0%BA%D0%B5%D0%BC%D0%BF/?viewAsMember=true' },
        { key:'TikTok', label:'TT', href:'https://www.tiktok.com/@aidacodit0' },
        { key:'Pinterest', label:'PI', href:'https://ru.pinterest.com/pbalgoritmika/' },
        { key:'Yappy', label:'YA', href:'https://yappy.media/n/acceptable.lizardxw?utm_source=url&utm_medium=share&utm_campaign=profile' }
      ],
      reviews: [
        {
          name:'Сергей Найденов',
          meta:'Яндекс Карты · 2 февраля 2026',
          avatar:'https://avatars.mds.yandex.net/get-yapic/27503/0r-4/islands-68',
          quote:'Отличное расположение в живописном месте, большие просторные аудитории для занятий. Большое значение придавалось и активностям вне аудиторных занятий: футбол, бадминтон и прочее.'
        },
        {
          name:'виктория',
          meta:'Яндекс Карты · 13 ноября 2024',
          avatar:'https://avatars.mds.yandex.net/get-yapic/54535/fsnR7nvUqoioiSqyIVRArH7QSFs-1/islands-68',
          quote:'Лагерь «Айдакемп» — это круто. Была там несколько раз, и каждый раз это был незабываемый опыт.'
        },
        {
          name:'Natalia Savenkova',
          meta:'Яндекс Карты · 10 ноября 2024',
          avatar:'https://avatars.mds.yandex.net/get-yapic/68143/0s-4/islands-68',
          quote:'Хочу поблагодарить АйДаКемп за отличную организацию и правильный подход в общении и воспитании детей в лагере. Потрясающие вожатые и педагоги.'
        },
        {
          name:'Надежда Ш.',
          meta:'Яндекс Карты · 12 августа 2025',
          avatar:'https://avatars.mds.yandex.net/get-yapic/58107/0f-1/islands-68',
          quote:'Сын в 9 лет этим летом побывал в первый раз в этом лагере. Остался в полном восторге и сказал, что обязательно поедет ещё.'
        },
        {
          name:'Кристина',
          meta:'Яндекс Карты · 8 ноября 2024',
          avatar:'https://avatars.mds.yandex.net/get-yapic/49368/enc-f5d05dcd44e9fc6a6283d03f5fc4dfbadc08d6b278aedeb06cfa14e5027cfb80/islands-68',
          quote:'Дочери лагерь понравился, с удовольствием провела время на каникулах. Интересные занятия, вкусная еда, комфортное размещение.'
        },
        {
          name:'Мария Григорьева',
          meta:'Яндекс Карты · 13 ноября 2024',
          avatar:'https://avatars.mds.yandex.net/get-yapic/56823/XGlOg8N65vTR91xedCasHKXWqI-1/islands-68',
          quote:'Отправляла детей 10 и 14 лет, оба остались довольны и готовы снова ехать на следующий год. Благодарна за опыт и пользу для детей.'
        }
      ]
    };

    const STORAGE_KEY = 'aidacamp_proto_state_v3';

    const storedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {};
    const normalizeStoredView = (value) => ((value === 'mobile' || value === 'desktop') && value) || 'desktop';
    const defaultState = {
      age:null,
      shiftId:null,
      basePrice:null,
      offerPrice:null,
      code:null,
      expiresAt:null,
      offerStage:0,
      view: normalizeStoredView(storedState.view),
      phone:''
    };
    let state = { ...defaultState, ...storedState, view: normalizeStoredView(storedState.view) };

    const METRIKA_ID = 96499295;
    const DEBUG_UI = false;
    const MOBILE_AGE_GATE_SHOWN_KEY = 'aidacamp_mobile_age_gate_shown_v1';
    const VIDEO_META_CACHE_KEY = 'aidacamp_video_meta_cache_v1';
    const VIDEO_META_CACHE_TTL_MS = 1000 * 60 * 60 * 4;
    const VIDEO_META_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 4;
    const SECTION_NAVIGATION_RULES = {
      defaultNavigationMode: 'scroll-or-fallback',
      compactNavigationMode: 'modal-or-scroll',
      sectionPolicies: {
        'section-about': { mode: 'modal-or-scroll' },
        'section-journey': { mode: 'modal-or-scroll' },
        'section-programs': {
          mode: 'modal-or-scroll',
          requiresAge: true
        },
        'section-photos': { mode: 'modal-or-scroll' },
        'section-videos': { mode: 'modal-or-scroll' },
        'section-reviews': { mode: 'modal-or-scroll' },
        'section-faq': { mode: 'modal-or-scroll' },
        'section-team': { mode: 'modal-or-scroll' },
        'section-stay': { mode: 'modal-or-scroll' },
        'section-contacts': { mode: 'modal-or-scroll' }
      },
      fallbackBySection: {
        'section-legal': 'legal.html#legal-info'
      },
      fallbackPolicy: {
        openInNewTab: ['section-legal'],
        openInNewTabMode: '_blank'
      }
    };
    const sectionPolicySchema = {
      mode: new Set(['scroll-or-fallback', 'modal-or-scroll']),
    };

    const SECTION_NAVIGATION_ACTIONS = {
      'modal-or-scroll': (navAction) => {
        const section = navAction?.sectionId || '';
        if(openSectionModal(section)){
          return {
            navigated: true,
            source: 'section-modal'
          };
        }
        const navigated = openSectionOrFallback(section);
        return {
          navigated,
          source: navigated ? 'section-scroll' : 'none'
        };
      },
      'scroll-or-fallback': (navAction) => {
        const section = navAction?.sectionId || '';
        return {
          navigated: openSectionOrFallback(section),
          source: 'section-scroll'
        };
      },
      noop: () => {
        return {
          navigated: false,
          source: 'noop'
        };
      }
    };
    function getSectionPolicy(sectionId){
      return SECTION_NAVIGATION_RULES.sectionPolicies[sectionId] || {};
    }
    function getNavigationMode(sectionId){
      const policy = getSectionPolicy(sectionId);
      const mode = policy.mode || SECTION_NAVIGATION_RULES.defaultNavigationMode;
      return sectionPolicySchema.mode.has(mode) && mode || SECTION_NAVIGATION_RULES.defaultNavigationMode;
    }

    function resolveNavigationProfile(sectionId){
      const cleanId = normalizeSectionId(sectionId);
      if(!cleanId){
        return {
        sectionId: '',
        mode: 'noop'
      };
      }
      const fallback = resolveSectionFallbackPolicy(cleanId);
      const baseMode = getNavigationMode(cleanId);
      const compactOnlyMode = isCompactMode() && baseMode === SECTION_NAVIGATION_RULES.compactNavigationMode && baseMode
        || SECTION_NAVIGATION_RULES.defaultNavigationMode;

      return {
        sectionId: cleanId,
        mode: compactOnlyMode,
        fallbackPath: fallback.path,
        fallbackTarget: fallback.target
      };
    }
    let timerId = null;
    let mediaIndex = 0;
    let mediaType = 'photo';
    let activePhotoList = [];
    let mediaCustomCaption = '';
    const metrikaSeen = new Set();
    const scrollMarks = {25:false,50:false,75:false,90:false};
    let offerTimeoutIds = [];
    let offerRunId = 0;
    let leadSubmitInProgress = false;
    let videoMetaRefreshTimer = null;
    let shiftOptionPanels = {
      desktop:{aboutId:null, calendarId:null},
      mobile:{aboutId:null, calendarId:null}
    };

    function patchState(patch){
      Object.assign(state, patch);
    }

    patchState({
      desktopMode: state.desktopMode || 'full',
      mobileMode: state.mobileMode || 'full',
      ageSelected: typeof state.ageSelected === 'boolean' ? state.ageSelected : false,
      photoFilter: state.photoFilter || 'camp',
      faqFilter: state.faqFilter || 'Медицина',
      mobilePhotoIndex: Number.isFinite(state.mobilePhotoIndex) ? state.mobilePhotoIndex : 0,
      mobileVideoIndex: Number.isFinite(state.mobileVideoIndex) ? state.mobileVideoIndex : 0,
      mobileReviewIndex: Number.isFinite(state.mobileReviewIndex) ? state.mobileReviewIndex : 0,
      mobileFaqGroup: state.mobileFaqGroup || state.faqFilter || 'Медицина',
      mobileFaqOpenKey: state.mobileFaqOpenKey || '',
      mobileTeamIndex: Number.isFinite(state.mobileTeamIndex) ? state.mobileTeamIndex : 0,
      mobileJourneyStep: Number.isFinite(state.mobileJourneyStep) ? state.mobileJourneyStep : 0,
      mobileProgramShiftId: state.mobileProgramShiftId || '',
      mobileDocsExpanded: typeof state.mobileDocsExpanded === 'boolean' ? state.mobileDocsExpanded : false
    });

    function track(event, params = {}){
      try {
        if(typeof ym !== 'undefined'){
          ym(METRIKA_ID, 'reachGoal', event, params);
        }
      } catch (_){
        // keep analytics failures non-blocking
      }
    }

    function applyDebugUiState(){
      const badge = document.getElementById('version-badge');
      if(!badge) return;
      badge.classList.toggle('hidden', !DEBUG_UI);
    }

    function trackOnce(event, params = {}){
      const key = `${event}:${JSON.stringify(params)}`;
      if(metrikaSeen.has(key)) return;
      metrikaSeen.add(key);
      track(event, params);
    }

    function trackOncePerSession(event, sessionKey, params = {}){
      try {
        if(sessionStorage.getItem(sessionKey)) return;
        sessionStorage.setItem(sessionKey, '1');
      } catch (error){
        // ignore and still track
      }
      track(event, params);
    }

    function initScrollTracking(){
      window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        if(max <= 0) return;
        const scrolled = (h.scrollTop / max) * 100;
        [25,50,75,90].forEach((p) => {
          if(scrolled >= p && !scrollMarks[p]){
            scrollMarks[p] = true;
            track(`scroll_${p}`);
          }
        });
      }, {passive:true});
    }

    function initSectionViewTracking(){
      const targets = [
        {id:'section-stay', event:'stay_view'},
        {id:'section-reviews', event:'reviews_view'},
        {id:'section-team', event:'team_view'}
      ];

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(!entry.isIntersecting) return;
          const found = targets.find(t => t.id === entry.target.id);
          if(found) trackOnce(found.event);
        });
      }, {threshold:0.35});

      targets.forEach((t) => {
        const el = document.getElementById(t.id);
        if(el) io.observe(el);
      });
    }

    const HERO_IMAGES = [
      'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/0b6b9a8c_day.png',
      'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/4e868442_photo.png',
      'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/ce98dc63_photo.png'
    ];

    let heroIndex = 0;
    let heroTimer = null;
    let heroResizeTimer = null;

    function persist(){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function initHero(){
      const isMobile = window.innerWidth < 768;

      const bg1 = document.getElementById('heroBg1');
      const bg2 = document.getElementById('heroBg2');
      if(!bg1) return;
      if(heroTimer){
        clearInterval(heroTimer);
        heroTimer = null;
      }

      if(isMobile){
        bg1.style.backgroundImage = 'none';
        bg1.classList.add('active');
        bg1.classList.remove('hidden');
        if(bg2){
          bg2.style.backgroundImage = 'none';
          bg2.classList.remove('active');
          bg2.classList.add('hidden');
        }
        return;
      }

      bg1.style.backgroundImage = `url(${HERO_IMAGES[0]})`;
      bg1.classList.add('active');
      bg1.classList.remove('hidden');
      if(!bg2) return;
      bg2.classList.remove('active');
      bg2.classList.add('hidden');

      heroTimer = setInterval(() => {
        heroIndex = (heroIndex + 1) % HERO_IMAGES.length;

        const next = HERO_IMAGES[heroIndex];

        if(bg1.classList.contains('active')){
          bg2.style.backgroundImage = `url(${next})`;
          bg2.classList.remove('hidden');
          bg2.classList.add('active');
          bg1.classList.remove('active');
          bg1.classList.add('hidden');
        } else {
          bg1.style.backgroundImage = `url(${next})`;
          bg1.classList.remove('hidden');
          bg1.classList.add('active');
          bg2.classList.remove('active');
          bg2.classList.add('hidden');
        }
      }, 5500);
    }

    function getActiveMediaList(){
      if(mediaType === 'photo'){
        return activePhotoList.length ? activePhotoList : mediaContent.photos;
      }
      return mediaContent.videos;
    }

    function updateMediaNavState(){
      const stage = document.getElementById('mediaStage');
      const list = getActiveMediaList();
      const single = list.length <= 1;
      if(stage){
        stage.classList.toggle('single-item', single);
      }
    }

    function openMedia(type, index, options = {}){
      closeTransientModals('media');
      mediaType = type;
      mediaIndex = index;
      mediaCustomCaption = options.caption || '';
      if(type === 'photo'){
        const source = getActiveMediaList();
        const item = source[index];
        track('photo_open', {
          category: item?.cat || '',
          index: index + 1
        });
      }
      if(type === 'video'){
        const item = mediaContent.videos[index];
        track('video_open', {
          title: item?.title || '',
          index: index + 1
        });
      }
      renderMediaViewer();
      updateMediaNavState();
      document.getElementById('mediaLightbox')?.classList.remove('hidden');
    }

    function closeMedia(){
      document.getElementById('mediaLightbox')?.classList.add('hidden');
      const mediaContent = document.getElementById('mediaContent');
      if(mediaContent) mediaContent.innerHTML = '';
      mediaCustomCaption = '';
    }

    function closeTransientModals(except = ''){
      if(except !== 'section'){
        document.getElementById('sectionModal')?.classList.add('hidden');
      }
      if(except !== 'media'){
        document.getElementById('mediaLightbox')?.classList.add('hidden');
      }
      if(except !== 'video'){
        const iframe = document.getElementById('videoFrame');
        const inner = document.getElementById('videoInner');
        const fallback = document.getElementById('videoFallback');
        if(iframe){
          iframe.src = '';
          iframe.classList.remove('vertical');
          iframe.classList.remove('hidden');
        }
        if(inner){
          inner.classList.remove('vertical');
        }
        if(fallback){
          fallback.classList.add('hidden');
        }
        document.getElementById('videoModal')?.classList.add('hidden');
      }
      if(except !== 'calendar'){
        document.getElementById('calendarModal')?.classList.add('hidden');
      }
    }

    function openVideo(url){
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoFrame');
      const inner = document.getElementById('videoInner');
      const fallback = document.getElementById('videoFallback');
      const fallbackLink = document.getElementById('videoFallbackLink');
      if(!modal || !iframe || !inner || !fallback || !fallbackLink || !url) return;

      closeTransientModals('video');
      const source = resolveVideoSource(url);
      const isVertical = source.orientation === 'vertical';
      inner.classList.toggle('vertical', isVertical);
      iframe.classList.toggle('vertical', isVertical);

      if(source.canEmbed){
        iframe.classList.remove('hidden');
        fallback.classList.add('hidden');
        iframe.src = source.embedUrl;
      } else {
        iframe.src = '';
        iframe.classList.add('hidden');
        fallback.classList.remove('hidden');
        fallbackLink.href = source.externalUrl;
        fallbackLink.textContent = `Смотреть на ${source.sourceName}`;
      }
      modal.classList.remove('hidden');
    }

    function closeVideo(){
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoFrame');
      const inner = document.getElementById('videoInner');
      const fallback = document.getElementById('videoFallback');
      if(!modal || !iframe || !inner || !fallback) return;

      iframe.src = '';
      inner.classList.remove('vertical');
      iframe.classList.remove('vertical');
      iframe.classList.remove('hidden');
      fallback.classList.add('hidden');
      modal.classList.add('hidden');
    }

    function resolveVideoSource(url){
      const externalUrl = String(url || '').trim();
      const fallback = {
        canEmbed: false,
        embedUrl: '',
        externalUrl,
        orientation: isVerticalVideoUrl(externalUrl) ? 'vertical' : 'horizontal',
        sourceName: 'источнике'
      };
      if(!externalUrl) return fallback;
      try {
        const u = new URL(externalUrl, window.location.origin);
        const host = (u.hostname || '').replace(/^www\./, '');
        const parts = u.pathname.split('/').filter(Boolean);
        if(host.includes('rutube.ru')) fallback.sourceName = 'Rutube';
        if(host.includes('youtube.com') || host === 'youtu.be') fallback.sourceName = 'YouTube';
        if(host.includes('vkvideo.ru') || host === 'vk.com' || host.endsWith('.vk.com')) fallback.sourceName = 'VK Видео';
        if(host.includes('kinescope.io')) fallback.sourceName = 'Kinescope';

        if(host.includes('kinescope.io')){
          if(parts[0] === 'embed' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: externalUrl,
              externalUrl,
              orientation: 'vertical',
              sourceName: 'Kinescope'
            };
          }
        }

        if(host.includes('rutube.ru')){
          if(parts[0] === 'play' && parts[1] === 'embed' && parts[2]){
            return {
              canEmbed: true,
              embedUrl: `https://rutube.ru/play/embed/${parts[2]}`,
              externalUrl,
              orientation: fallback.orientation,
              sourceName: 'Rutube'
            };
          }
          if(parts[0] === 'shorts' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: `https://rutube.ru/play/embed/${parts[1]}`,
              externalUrl,
              orientation: 'vertical',
              sourceName: 'Rutube'
            };
          }
          if(parts[0] === 'video' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: `https://rutube.ru/play/embed/${parts[1]}`,
              externalUrl,
              orientation: 'horizontal',
              sourceName: 'Rutube'
            };
          }
        }

        if(host === 'youtu.be' && parts[0]){
          return {
            canEmbed: true,
            embedUrl: `https://www.youtube.com/embed/${parts[0]}`,
            externalUrl,
            orientation: fallback.orientation,
            sourceName: 'YouTube'
          };
        }

        if(host.includes('youtube.com')){
          if(parts[0] === 'watch' && u.searchParams.get('v')){
            return {
              canEmbed: true,
              embedUrl: `https://www.youtube.com/embed/${u.searchParams.get('v')}`,
              externalUrl,
              orientation: 'horizontal',
              sourceName: 'YouTube'
            };
          }
          if(parts[0] === 'shorts' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: `https://www.youtube.com/embed/${parts[1]}`,
              externalUrl,
              orientation: 'vertical',
              sourceName: 'YouTube'
            };
          }
          if(parts[0] === 'embed' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: externalUrl,
              externalUrl,
              orientation: fallback.orientation,
              sourceName: 'YouTube'
            };
          }
        }

        if(parts[0] === 'embed'){
          return {
            canEmbed: true,
            embedUrl: externalUrl,
            externalUrl,
            orientation: fallback.orientation,
            sourceName: fallback.sourceName
          };
        }
      } catch(e){
      }
      return fallback;
    }

    function isVerticalVideoUrl(url){
      const value = String(url || '').toLowerCase();
      return (
        value.includes('/shorts/') ||
        value.includes('shortvideo') ||
        value.includes('/reel') ||
        value.includes('vertical') ||
        value.includes('story')
      );
    }

    function normalizeKinescopeShareUrl(url){
      const raw = String(url || '').trim();
      if(!raw) return '';
      try{
        const u = new URL(raw, window.location.origin);
        const host = (u.hostname || '').replace(/^www\./, '');
        if(!host.includes('kinescope.io')) return '';
        const parts = u.pathname.split('/').filter(Boolean);
        if(!parts.length) return '';
        const id = parts[0] === 'embed' ? parts[1] : parts[0];
        if(!id) return '';
        return `https://kinescope.io/${id}`;
      }catch(e){
        return '';
      }
    }

    function applyVideoMetaMap(videoMetaMap = {}){
      let changed = false;
      mediaContent.videos = mediaContent.videos.map((item) => {
        const meta = videoMetaMap[item.url];
        if(!meta) return item;
        const nextTitle = String(meta.title || '').trim() || item.title;
        const nextCover = String(meta.cover || '').trim() || item.cover;
        if(nextTitle === item.title && nextCover === item.cover) return item;
        changed = true;
        return {
          ...item,
          title: nextTitle,
          cover: nextCover
        };
      });
      return changed;
    }

    function loadVideoMetaCache(){
      try{
        const raw = localStorage.getItem(VIDEO_META_CACHE_KEY);
        if(!raw) return;
        const cached = JSON.parse(raw);
        const map = cached && typeof cached === 'object' ? cached.map : null;
        if(!map || typeof map !== 'object') return;
        applyVideoMetaMap(map);
      }catch(e){
      }
    }

    function getVideoMetaCacheAgeMs(){
      try{
        const raw = localStorage.getItem(VIDEO_META_CACHE_KEY);
        if(!raw) return Number.POSITIVE_INFINITY;
        const cached = JSON.parse(raw);
        const ts = Number(cached?.ts || 0);
        if(!ts) return Number.POSITIVE_INFINITY;
        return Date.now() - ts;
      }catch(e){
        return Number.POSITIVE_INFINITY;
      }
    }

    function saveVideoMetaCache(videoMetaMap){
      try{
        let existingMap = {};
        const raw = localStorage.getItem(VIDEO_META_CACHE_KEY);
        if(raw){
          const cached = JSON.parse(raw);
          if(cached && typeof cached.map === 'object' && cached.map){
            existingMap = cached.map;
          }
        }

        localStorage.setItem(VIDEO_META_CACHE_KEY, JSON.stringify({
          ts: Date.now(),
          map: {...existingMap, ...videoMetaMap}
        }));
      }catch(e){
      }
    }

    async function fetchKinescopeMeta(videoUrl){
      const shareUrl = normalizeKinescopeShareUrl(videoUrl);
      if(!shareUrl) return null;
      const endpoint = `https://kinescope.io/oembed?url=${encodeURIComponent(shareUrl)}&format=json`;
      const response = await fetch(endpoint, {method:'GET', credentials:'omit'});
      if(!response.ok) return null;
      const data = await response.json();
      const title = String(data?.title || '').trim();
      const cover = String(data?.thumbnail_url || '').trim();
      if(!title && !cover) return null;
      return {title, cover};
    }

    async function refreshVideoMeta({force = false} = {}){
      const age = getVideoMetaCacheAgeMs();
      if(!force && age <= VIDEO_META_CACHE_TTL_MS) return;

      const updates = {};
      const tasks = mediaContent.videos.map(async (item) => {
        try{
          const meta = await fetchKinescopeMeta(item.url);
          if(meta) updates[item.url] = meta;
        }catch(e){
        }
      });

      await Promise.all(tasks);
      if(!Object.keys(updates).length) return;

      const changed = applyVideoMetaMap(updates);
      saveVideoMetaCache(updates);
      if(changed){
        renderMediaSections();
      }
    }

    function scheduleVideoMetaRefresh(){
      if(videoMetaRefreshTimer){
        clearInterval(videoMetaRefreshTimer);
      }
      videoMetaRefreshTimer = setInterval(() => {
        refreshVideoMeta();
      }, VIDEO_META_REFRESH_INTERVAL_MS);
    }

    function closeSectionModal(){
      const modal = document.getElementById('sectionModal');
      if(!modal) return;
      modal.classList.add('hidden');
      modal.classList.remove('section-modal-compact');
      modal.classList.remove('section-modal-mobile');
    }

    function scrollVideoCarousel(direction = 1){
      const list = document.getElementById('videoList');
      if(!list) return;
      const card = list.querySelector('.video-card');
      const gap = 12;
      const step = card ? (card.getBoundingClientRect().width + gap) : 260;
      list.scrollBy({left: step * direction, behavior:'smooth'});
    }

    function scrollTeamCarousel(direction = 1){
      const list = document.getElementById('teamCarousel');
      if(!list) return;
      const card = list.querySelector('.team-card');
      const gap = 12;
      const step = card ? (card.getBoundingClientRect().width + gap) : 320;
      list.scrollBy({left: step * direction, behavior:'smooth'});
    }

    function getSectionByTargetId(sectionId, view = getCurrentView()){
      const normalizedSectionId = resolveSectionTargetId(sectionId, view);
      return document.getElementById(normalizedSectionId) || document.getElementById(normalizeSectionId(normalizedSectionId));
    }

    function getSectionFallbackPath(sectionId){
      const cleanId = normalizeSectionId(sectionId);
      if(!cleanId) return null;
      return SECTION_NAVIGATION_RULES.fallbackBySection[cleanId] || null;
    }

    function resolveSectionFallbackPolicy(sectionId){
      const cleanId = normalizeSectionId(sectionId);
      return {
        path: getSectionFallbackPath(cleanId),
        target: SECTION_NAVIGATION_RULES.fallbackPolicy.openInNewTab.includes(cleanId)
          ? SECTION_NAVIGATION_RULES.fallbackPolicy.openInNewTabMode
          : '_self'
      };
    }

    function isSectionModalOpen(){
      const sectionModal = document.getElementById('sectionModal');
      return !!(sectionModal && !sectionModal.classList.contains('hidden'));
    }

    function shouldOpenSectionModalForCurrentMode(){
      const isMobile = isCurrentViewMobile();
      const isCompact = isCompactMode();
      return (isCompact && !isMobile) || (isMobile && isSectionModalOpen());
    }

    function openSectionModal(sectionId){
      const modal = document.getElementById('sectionModal');
      const titleEl = document.getElementById('sectionModalTitle');
      const bodyEl = document.getElementById('sectionModalBody');
      const sourceSection = getSectionByTargetId(sectionId, getCurrentView());
      if(!modal || !titleEl || !bodyEl || !sourceSection) return false;
      closeTransientModals('section');
      const isMobilePanel = isCurrentViewMobile();
      const isCompactCurrentView = isCompactMode();
      modal.classList.toggle('section-modal-compact', isCompactCurrentView && !isMobilePanel);
      modal.classList.toggle('section-modal-mobile', isMobilePanel);

      const sourceTitle = sourceSection.querySelector('h3')?.textContent?.trim() || 'Раздел';
      titleEl.textContent = sourceTitle;

      const clone = sourceSection.cloneNode(true);
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));

      bodyEl.innerHTML = '';
      bodyEl.appendChild(clone);
      modal.classList.remove('hidden');
      return true;
    }

    function renderMediaViewer(){
      const content = document.getElementById('mediaContent');
      const caption = document.getElementById('mediaCaption');

      if(mediaType === 'photo'){
        const source = getActiveMediaList();
        const item = source[mediaIndex];
        if(!item) return;
        content.innerHTML = `<img class="media-image" src="${item.src}" />`;
        caption.textContent = mediaCustomCaption || `${photoCatLabel(item.cat)} · ${mediaIndex + 1}/${source.length}`;
      }

      if(mediaType === 'video'){
        const item = mediaContent.videos[mediaIndex];
        const source = resolveVideoSource(item.url);
        if(!source.canEmbed){
          content.innerHTML = `
            <div class="video-fallback">
              <strong>Видео доступно во внешнем источнике</strong>
              <p>Откройте ролик в отдельной вкладке, если встраивание недоступно.</p>
              <a class="inline-link-btn primary" href="${source.externalUrl}" target="_blank" rel="noopener noreferrer">Смотреть на ${source.sourceName}</a>
            </div>
          `;
          caption.textContent = `${mediaIndex + 1}/${mediaContent.videos.length}`;
          return;
        }
        content.innerHTML = `
          <iframe
            class="media-video"
            src="${source.embedUrl}"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>`;
        caption.textContent = `${mediaIndex + 1}/${mediaContent.videos.length}`;
      }
    }

    function nextMedia(){
      const list = getActiveMediaList();
      if(list.length <= 1) return;
      mediaIndex = (mediaIndex + 1) % list.length;
      renderMediaViewer();
    }

    function prevMedia(){
      const list = getActiveMediaList();
      if(list.length <= 1) return;
      mediaIndex = (mediaIndex - 1 + list.length) % list.length;
      renderMediaViewer();
    }

    function handleDataActionClick(target){
      const actionEl = target.closest('[data-action]');
      if(!actionEl) return false;

      const action = actionEl.dataset.action;

      if(action === 'open-photo'){
        const index = Number(actionEl.dataset.photoIndex || 0);
        if(actionEl.closest('#mobilePhotoGallery')){
          const photoByFilter = {
            camp: ['all'],
            pool: ['pool'],
            sport: ['sport'],
            study: ['study'],
            food: ['food']
          };
          const tags = photoByFilter[state.photoFilter] || ['all'];
          activePhotoList = mediaContent.photos.filter(item => tags.includes(item.cat));
        }
        openMedia('photo', index);
        return true;
      }

      if(action === 'open-stay-photo'){
        const index = Number(actionEl.dataset.stayIndex || 0);
        const stayGallery = getStayGallery();
        if(!stayGallery.length) return true;
        activePhotoList = stayGallery;
        openMedia('photo', Math.max(0, Math.min(index, stayGallery.length - 1)));
        return true;
      }

      if(action === 'open-book-photo'){
        activePhotoList = [{
          src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/8fc8172e_8991804334.webp',
          cat:'all',
          alt:'Собственная книга по Python'
        }];
        openMedia('photo', 0, {caption:'Собственная книга по Python'});
        return true;
      }

      if(action === 'open-video'){
        const directUrl = actionEl.dataset.video || '';
        if(directUrl){
          openVideo(directUrl);
          return true;
        }
        const index = Number(actionEl.dataset.videoIndex || 0);
        const item = mediaContent.videos[index];
        if(item?.url) openVideo(item.url);
        return true;
      }

      if(action === 'mobile-photo-select'){
        const index = Number(actionEl.dataset.photoIndex || 0);
        if(Number.isFinite(index)){
          patchState({mobilePhotoIndex: Math.max(0, index)});
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-video-select'){
        const index = Number(actionEl.dataset.videoIndex || 0);
        if(Number.isFinite(index)){
          patchState({mobileVideoIndex: Math.max(0, index)});
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-review-select'){
        const index = Number(actionEl.dataset.reviewIndex || 0);
        if(Number.isFinite(index)){
          patchState({mobileReviewIndex: Math.max(0, index)});
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-faq-filter'){
        const group = (actionEl.dataset.faqGroup || '').trim();
        if(group){
          patchState({
            mobileFaqGroup: group,
            mobileFaqOpenKey: ''
          });
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-faq-toggle'){
        const key = (actionEl.dataset.faqKey || '').trim();
        if(key){
          patchState({mobileFaqOpenKey: state.mobileFaqOpenKey === key ? '' : key});
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-team-prev' || action === 'mobile-team-next'){
        const list = mediaContent.team.filter((item) => item.fio !== 'Дарья Афанасьева');
        if(list.length){
          const delta = action === 'mobile-team-next' ? 1 : -1;
          patchState({mobileTeamIndex: (state.mobileTeamIndex + delta + list.length) % list.length});
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-team-select'){
        const list = mediaContent.team.filter((item) => item.fio !== 'Дарья Афанасьева');
        if(list.length){
          const index = Number(actionEl.dataset.teamIndex || 0);
          if(Number.isFinite(index)){
            patchState({mobileTeamIndex: Math.max(0, Math.min(index, list.length - 1))});
            renderCompactTrustPanelContent();
            persist();
          }
        }
        return true;
      }

      if(action === 'mobile-journey-step'){
        const index = Number(actionEl.dataset.stepIndex || 0);
        if(Number.isFinite(index)){
          patchState({mobileJourneyStep: Math.max(0, Math.min(index, 3))});
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-program-select'){
        const shiftId = (actionEl.dataset.shiftId || '').trim();
        if(shiftId){
          patchState({mobileProgramShiftId: shiftId});
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-docs-toggle'){
        patchState({mobileDocsExpanded: !state.mobileDocsExpanded});
        renderCompactTrustPanelContent();
        persist();
        return true;
      }

      if(action === 'video-carousel-prev'){
        scrollVideoCarousel(-1);
        return true;
      }

      if(action === 'video-carousel-next'){
        scrollVideoCarousel(1);
        return true;
      }

      if(action === 'toggle-shift-about'){
        const shiftId = actionEl.dataset.shiftId || '';
        const viewKey = actionEl.dataset.shiftView || 'desktop';
        if(shiftId){
          toggleShiftOptionPanel(viewKey, 'aboutId', shiftId);
        }
        return true;
      }

      if(action === 'toggle-shift-calendar-inline'){
        const shiftId = actionEl.dataset.shiftId || '';
        const viewKey = actionEl.dataset.shiftView || 'desktop';
        if(shiftId){
          toggleShiftOptionPanel(viewKey, 'calendarId', shiftId);
        }
        return true;
      }

      if(action === 'open-all-shifts'){
        navigateToSection('section-programs');
        return true;
      }

      if(action === 'team-carousel-prev'){
        scrollTeamCarousel(-1);
        return true;
      }

      if(action === 'team-carousel-next'){
        scrollTeamCarousel(1);
        return true;
      }

      if(action === 'open-calendar'){
        const shiftId = actionEl.dataset.shiftId || '';
        if(shiftId) openCalendar(shiftId);
        return true;
      }

      if(action === 'primary-cta'){
        handlePrimaryCTA();
        return true;
      }

      if(action === 'mobile-focus-age'){
        focusMobileAgeGate();
        return true;
      }

      if(action === 'reset-age-selection'){
        resetAgeSelection();
        return true;
      }

      if(action === 'reset-shift-selection'){
        resetShiftSelection();
        return true;
      }

      if(action === 'close-offer'){
        offerRunId += 1;
        clearOfferTimeout();
        document.getElementById('offerOverlay')?.classList.add('hidden');
        resetOfferProgressUI();
        return true;
      }

      if(action === 'save-on-device'){
        saveOfferAndClose();
        showHint('Условия сохранены на этом устройстве.');
        return true;
      }

      if(action === 'apply-offer'){
        clearOfferTimeout();
        patchState({offerStage: Math.max(state.offerStage, 1)});
        document.getElementById('offerOverlay')?.classList.add('hidden');
        renderAll();
        openForm();
        persist();
        return true;
      }

      if(action === 'close-form'){
        closeForm();
        return true;
      }

      if(action === 'submit-form'){
        submitLead();
        return true;
      }

      if(action === 'close-success'){
        closeSuccessModal();
        return true;
      }

      if(action === 'close-calendar'){
        closeCalendar();
        return true;
      }

      if(action === 'close-section-modal'){
        closeSectionModal();
        return true;
      }

      if(action === 'close-video-modal'){
        closeVideo();
        return true;
      }

      if(action === 'debug-reset-booking'){
        resetBookingFlowDebug();
        return true;
      }

      if(action === 'close-debug-controls'){
        document.getElementById('debugControls')?.classList.add('hidden');
        return true;
      }

      return false;
    }

    async function notifyLead(eventName, payload){
      try {
        const cfg = window.AC_NOTIFY_CONFIG || {};
        const body = {event: eventName, payload};
        const endpoint = cfg.leadEndpoint || '/api/lead';
        const response = await fetch(endpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(body)
        });
        if(response.ok){
          return {ok: true, delivered: true, endpoint};
        }

        saveLeadFallbackMeta(eventName, endpoint, `http_${response.status}`);
        return {ok: false, delivered: false, fallback: true};
      } catch(error){
        const cfg = window.AC_NOTIFY_CONFIG || {};
        const endpoint = cfg.leadEndpoint || '/api/lead';
        saveLeadFallbackMeta(eventName, endpoint, String(error));
        return {ok: false, delivered: false, fallback: true, error: String(error)};
      }
    }

    function formatTelegramMessage(eventName, payload){
      const lines = [];

      if(eventName === 'promo_fixed'){
        lines.push('AiDaCamp • Фиксация цены');
        lines.push('');
        lines.push(`Тип: ${payload.promo_status === 'improved_again' ? 'повторное улучшение' : 'первая фиксация'}`);
        lines.push(`Телефон: ${payload.phone || 'не указан'}`);
        lines.push(`Возраст: ${payload.age || '—'}`);
        lines.push(`Смена: ${payload.shift_name || '—'}`);
        lines.push(`Даты: ${payload.shift_date || '—'}`);
        lines.push(`Цена: ${payload.price_final ? formatPrice(payload.price_final) : '—'}`);
        lines.push(`Код: ${payload.promo_code || '—'}`);
        lines.push(`Действует до: ${payload.promo_expires_at_local || '—'}`);
        lines.push('');
        lines.push(`Режим: ${payload.mode || '—'}`);
        lines.push(`Отправлено: ${payload.sent_at_local || '—'}`);
      }

      if(eventName === 'booking_submitted'){
        lines.push('AiDaCamp • Новая заявка');
        lines.push('');
        lines.push(`Имя: ${payload.name || '—'}`);
        lines.push(`Телефон: ${payload.phone || '—'}`);
        lines.push(`Возраст: ${payload.age || '—'}`);
        lines.push(`Смена: ${payload.shift_name || '—'}`);
        lines.push(`Даты: ${payload.shift_date || '—'}`);
        lines.push(`Цена: ${payload.price_text || '—'}`);
        lines.push(`Код: ${payload.promo_code || '—'}`);
        lines.push(`Статус промо: ${payload.promo_status || '—'}`);
        lines.push('');
        lines.push(`Режим: ${payload.mode || '—'}`);
        lines.push(`Отправлено: ${payload.sent_at_local || '—'}`);
      }

      if(eventName === 'booking_draft_saved'){
        lines.push('AiDaCamp • Черновик заявки');
        lines.push('');
        lines.push(`Имя: ${payload.name || '—'}`);
        lines.push(`Телефон: ${payload.phone || '—'}`);
        lines.push(`Смена: ${payload.shift_name || payload.shift_text || '—'}`);
        lines.push(`Цена: ${payload.price_text || '—'}`);
        lines.push(`Код: ${payload.promo_code || '—'}`);
        lines.push('');
        lines.push(`Отправлено: ${payload.sent_at_local || '—'}`);
      }

      if(eventName === 'promo_cancelled'){
        lines.push('AiDaCamp • Отмена промо / брони');
        lines.push('');
        lines.push(`Имя: ${payload.name || '—'}`);
        lines.push(`Телефон: ${payload.phone || '—'}`);
        lines.push(`Смена: ${payload.shift_name || '—'}`);
        lines.push(`Код: ${payload.promo_code || '—'}`);
        lines.push(`Цена: ${payload.price_final ? formatPrice(payload.price_final) : '—'}`);
        lines.push('');
        lines.push(`Отправлено: ${payload.sent_at_local || '—'}`);
      }

      if(lines.length === 0){
        lines.push('AiDaCamp lead');
        lines.push(`Event: ${eventName}`);
        lines.push(JSON.stringify(payload, null, 2));
      }

      return lines.join('\n');
    }

    function getSelectedShift(){
      return state.shiftId ? shifts.find(s => s.id === state.shiftId) : null;
    }

    function hasSelectedAge(){
      return !!state.ageSelected;
    }

    function hasActiveBookingContext(){
      return !!(
        state.shiftId ||
        state.basePrice ||
        state.offerPrice ||
        state.code ||
        state.expiresAt
      );
    }

    function syncGuidedState(){
      if(hasActiveBookingContext() && state.age){
        patchState({ageSelected: true});
      }
    }

    function ageLabel(value){
      if(value === '7-9') return '7–9 лет';
      if(value === '10-12') return '10–12 лет';
      if(value === '13-14') return '13–14 лет';
      return '—';
    }

    function photoCatLabel(cat){
      if(cat === 'pool') return 'Бассейн';
      if(cat === 'sport') return 'Спорт';
      if(cat === 'study') return 'Учёба';
      if(cat === 'food') return 'Питание';
      if(cat === 'all') return 'Атмосфера';
      if(cat === 'camp') return 'Атмосфера';
      if(cat === 'stay') return 'Размещение';
      return cat;
    }

    function getStayGallery(){
      return Array.from(document.querySelectorAll('#section-stay .stay-card')).map((card) => {
        const image = card.querySelector('img');
        if(!image) return null;
        const title = (card.querySelector('.stay-card-body strong')?.textContent || '').trim();
        return {
          cat:'stay',
          src:image.getAttribute('src') || '',
          alt:image.getAttribute('alt') || title || 'Размещение'
        };
      }).filter((item) => item && item.src);
    }

    function prepareStayGalleryTriggers(){
      const stayCards = Array.from(document.querySelectorAll('#section-stay .stay-card'));
      let stayPhotoIndex = 0;

      stayCards.forEach((card) => {
        const image = card.querySelector('img');
        if(!image) return;
        card.dataset.action = 'open-stay-photo';
        card.dataset.stayIndex = String(stayPhotoIndex);
        card.classList.add('is-clickable');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        stayPhotoIndex += 1;
      });
    }

    function clearBookingCookies(){
      const isBookingCookie = (name) => /(aidacamp|booking|promo|lead|aida|ac_)/i.test(name);
      const pairs = document.cookie ? document.cookie.split(';') : [];
      const host = window.location.hostname || '';
      const hostParts = host.split('.').filter(Boolean);
      const baseDomain = hostParts.length >= 2 ? `.${hostParts.slice(-2).join('.')}` : '';
      const domains = ['', host ? `;domain=${host}` : '', baseDomain ? `;domain=${baseDomain}` : ''];
      const paths = [';path=/', ';path=/;SameSite=Lax'];

      pairs.forEach((pair) => {
        const name = pair.split('=')[0].trim();
        if(!name || !isBookingCookie(name)) return;
        domains.forEach((domain) => {
          paths.forEach((path) => {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT${path}${domain}`;
          });
        });
      });
    }

    function clearProjectStorage(){
      const isProjectKey = (key) => /(aidacamp|booking|promo|lead|aida|ac_)/i.test(String(key || ''));

      try {
        const keys = [];
        for(let i = 0; i < localStorage.length; i += 1){
          const key = localStorage.key(i);
          if(key && isProjectKey(key)) keys.push(key);
        }
        keys.forEach((key) => localStorage.removeItem(key));
      } catch(e){
      }

      try {
        const keys = [];
        for(let i = 0; i < sessionStorage.length; i += 1){
          const key = sessionStorage.key(i);
          if(key && isProjectKey(key)) keys.push(key);
        }
        keys.forEach((key) => sessionStorage.removeItem(key));
      } catch(e){
      }
    }

    function saveLeadFallbackMeta(eventName, endpoint, reason = ''){
      try {
        const key = 'aidacamp_lead_fallback_meta';
        const prevRaw = localStorage.getItem(key);
        const prev = prevRaw ? JSON.parse(prevRaw) : {};
        const count = Number(prev.count || 0) + 1;
        const safeMeta = {
          ts: Date.now(),
          event: String(eventName || ''),
          endpoint: String(endpoint || ''),
          reason: String(reason || ''),
          count
        };
        localStorage.setItem(key, JSON.stringify(safeMeta));
      } catch(e){
      }
    }

    function resetBookingFlowDebug(){
      clearOfferTimeout();
      clearShiftOptionPanels();
      if(timerId){
        clearInterval(timerId);
        timerId = null;
      }
      offerRunId += 1;
      leadSubmitInProgress = false;
      setLeadSubmitState(false);
      closeTransientModals();

      clearProjectStorage();
      clearBookingCookies();
      metrikaSeen.clear();
      Object.keys(scrollMarks).forEach((k) => {
        scrollMarks[k] = false;
      });
      activePhotoList = [];

      const keepView = normalizeViewState(state.view);
      const keepDesktopMode = getModeByView('desktop');
      const keepMobileMode = getModeByView('mobile');
      state = {
        age: null,
        ageSelected: false,
        shiftId: null,
        basePrice: null,
        offerPrice: null,
        code: null,
        expiresAt: null,
        offerStage: 0,
        view: keepView,
        phone: '',
        desktopMode: keepDesktopMode,
        mobileMode: keepMobileMode,
        photoFilter: 'camp',
        faqFilter: 'Медицина',
        offerSearching: false
      };

      ['parentName','parentPhone'].forEach((id) => {
        const input = document.getElementById(id);
        if(input) input.value = '';
      });
      const consentCheck = document.getElementById('consentCheck');
      if(consentCheck) consentCheck.checked = false;
      setPhoneError(false);
      ['desktopBookingHintInline', 'mobileBookingHintInline', 'desktopInlineHint', 'mobileInlineHint'].forEach((id) => {
        const el = document.getElementById(id);
        if(!el) return;
        el.textContent = '';
        el.classList.remove('visible');
        delete el.dataset.requiredStep;
      });
      document.querySelectorAll('[data-age].active').forEach((el) => el.classList.remove('active'));
      document.querySelectorAll('#serviceMenu [data-nav]').forEach((el) => el.classList.remove('active'));
      document.querySelector('#serviceMenu [data-nav="section-about"]')?.classList.add('active');
      if(window.history?.replaceState){
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      renderShiftCards();
      renderAll();
      switchView(keepView);
      applyAllModeStates();
      persist();
      showHint('Сценарий бронирования сброшен. Начните с выбора возраста.');
    }

    function getShiftContextLine(shift){
      if(!shift) return '';
      if(!hasSelectedAge()){
        return '';
      }
      const age = ageLabel(state.age);
      if(shift.id === 'shift-1'){
        return `Подходит для ${age} · часто выбирают ближайшую короткую смену.`;
      }
      if(shift.id === 'shift-2'){
        return `Подходит для ${age} · хороший входной формат без длинной адаптации.`;
      }
      if(shift.id === 'shift-3'){
        return `Подходит для ${age} · чаще выбирают ради AI-практики и проектной защиты.`;
      }
      if(shift.id === 'shift-4'){
        return `Подходит для ${age} · длинная смена для более глубокого погружения.`;
      }
      return `Подходит для ${age}.`;
    }

    function isOfferActive(){
      return !!(state.expiresAt && Date.now() < state.expiresAt);
    }

    function getVisiblePrice(){
      const shift = getSelectedShift();
      if(state.offerPrice) return state.offerPrice;
      if(state.basePrice) return state.basePrice;
      return shift ? shift.price : null;
    }

    function getPrimaryActionState(){
      syncGuidedState();
      const shift = getSelectedShift();
      if(!hasSelectedAge()){
        return {
          text:'Выберите возраст',
          disabled:true,
          hint:''
        };
      }

      if(!shift){
        return {
          text:'Показать смены',
          disabled:true,
          hint:''
        };
      }

      if(state.offerStage === 0){
        return {
          text:'Проверить цену и условия',
          disabled:false,
          hint:''
        };
      }

      return {
        text:'Оформить заявку',
        disabled:false,
        hint:''
      };
    }

    function getStepState(){
      syncGuidedState();
      if(!hasSelectedAge()){
        return 1;
      }
      if(hasSelectedAge() && !state.shiftId){
        return 2;
      }
      if(state.shiftId && state.offerStage === 0){
        return 3;
      }
      if(state.offerStage >= 1 && !state.code){
        return 4;
      }
      if(state.offerStage >= 1){
        return 4;
      }
      return 1;
    }

    function getBookingStage(){
      return Math.min(Math.max(getStepState(), 1), 4);
    }

    function applyBookingStageClass(prefix){
      const cardId = BOOKING_CARD_IDS[prefix];
      const card = document.getElementById(cardId);
      if(!card) return;
      card.classList.remove('booking-stage-1', 'booking-stage-2', 'booking-stage-3', 'booking-stage-4');
      card.classList.add(`booking-stage-${getBookingStage()}`);
    }

    function renderSteps(targetId){
      const root = document.getElementById(targetId);
      if(!root) return;
      const current = getStepState();
      root.querySelectorAll('.booking-step').forEach((el, idx) => {
        const num = idx + 1;
        el.classList.remove('active','done');
        el.dataset.step = String(num);
        if(num < current) el.classList.add('done');
        if(num === current) el.classList.add('active');
      });
    }

    function renderGuidedState(prefix){
      syncGuidedState();
      const shiftList = document.getElementById(`${prefix}ShiftList`);
      const ctaWrap = document.getElementById(`${prefix}CtaWrap`);
      const ageTabs = document.getElementById(`${prefix}AgeTabs`);
      const ageChip = document.getElementById(`${prefix}AgeChip`);
      const ageChipText = document.getElementById(`${prefix}AgeChipText`);
      const shiftChip = document.getElementById(`${prefix}ShiftChip`);
      const shiftChipText = document.getElementById(`${prefix}ShiftChipText`);

      if(!shiftList || !ctaWrap || !ageTabs || !ageChip || !ageChipText || !shiftChip || !shiftChipText) return;
      const isMobile = prefix === 'mobile';
      const stepOne = document.querySelector(BOOKING_STEP_ONE_SELECTORS[prefix] || '');
      if(isMobile && stepOne && shiftChip.parentElement !== stepOne){
        stepOne.insertBefore(shiftChip, ageTabs);
      }

      shiftList.classList.remove('disabled','highlight','collapsed');
      ctaWrap.classList.remove('highlight');
      ageTabs.classList.remove('hidden');
      ageChip.classList.remove('visible');
      shiftChip.classList.remove('visible');
      if(isMobile){
        const card = document.getElementById(BOOKING_CARD_IDS[prefix]);
        card?.classList.remove('has-mobile-summary-chips');
      }

      if(!hasSelectedAge()){
        shiftList.classList.add('disabled');
        return;
      }

      ageChipText.textContent = isMobile ? ageLabel(state.age) : `Возраст: ${ageLabel(state.age)}`;
      ageChip.classList.add('visible');
      ageTabs.classList.add('hidden');

      if(hasSelectedAge() && !state.shiftId){
        shiftList.classList.remove('collapsed');
        shiftList.classList.add('highlight');
        return;
      }

      const shift = getSelectedShift();
      if(shift){
        shiftChipText.textContent = isMobile ? shift.dates : `Смена: ${shift.title} · ${shift.dates}`;
        if(isMobile){
          const card = document.getElementById(BOOKING_CARD_IDS[prefix]);
          card?.classList.add('has-mobile-summary-chips');
        }
        shiftChip.classList.add('visible');
        shiftList.classList.add('collapsed');
      }

      if(state.shiftId && state.offerStage === 0){
        ctaWrap.classList.add('highlight');
        return;
      }
    }

    function pulseNode(node){
      if(!node) return;
      node.classList.remove('guided-pulse');
      void node.offsetWidth;
      node.classList.add('guided-pulse');
      window.setTimeout(() => {
        node.classList.remove('guided-pulse');
      }, 1300);
    }

    const BOOKING_INFO_IDS = {
      desktop: 'desktop-booking-info',
      mobile: 'mobile-booking-info'
    };

    const BOOKING_CARD_IDS = {
      desktop: 'desktop-booking-card',
      mobile: 'mobileBookingCard'
    };

    const BOOKING_STEP_ONE_SELECTORS = {
      mobile: '#mobileBookingCard .booking-step-1'
    };

    const SECTION_ID_MAP_BY_VIEW = {
      desktop: {},
      mobile: {
        'section-about':'mobile-section-about',
        'section-journey':'mobile-section-journey',
        'section-programs':'mobile-section-programs',
        'section-photos':'mobile-section-photos',
        'section-videos':'mobile-section-videos',
        'section-reviews':'mobile-section-reviews',
        'section-faq':'mobile-section-faq',
        'section-team':'mobile-section-team',
        'section-stay':'mobile-section-stay',
        'section-contacts':'mobile-section-contacts',
        'section-legal':'mobile-section-docs'
      }
    };

    const getSectionIdMapForView = (view) => {
      const safeView = normalizeViewState(view);
      return SECTION_ID_MAP_BY_VIEW[safeView] || {};
    };

    function resolveSectionTargetId(sectionId, view = getCurrentView()){
      const normalized = normalizeSectionId(sectionId);
      const map = getSectionIdMapForView(view);
      return map[normalized] || normalized;
    }

    function normalizeSectionId(sectionId){
      return String(sectionId || '').trim().replace(/^#/, '');
    }

    function getBookingViewPrefixes(){
      return Object.keys(modeViewConfig);
    }

    function getActiveBookingViewPrefixes(){
      return [getCurrentView()];
    }

    function nudgeUserToNextStep(message = 'Сначала завершите предыдущий шаг.'){
      getActiveBookingViewPrefixes().forEach((prefix) => {
        const inlineHint = document.getElementById(`${prefix}InlineHint`);
        if(inlineHint){
          inlineHint.textContent = message;
          inlineHint.classList.add('visible');
          pulseNode(inlineHint);
          window.clearTimeout(inlineHint.__hideTimer);
          inlineHint.__hideTimer = window.setTimeout(() => {
            inlineHint.classList.remove('visible');
          }, 2400);
        }

        if(!hasSelectedAge()){
          pulseNode(document.getElementById(`${prefix}AgeTabs`));
          return;
        }

        if(!state.shiftId){
          pulseNode(document.getElementById(`${prefix}ShiftList`));
          return;
        }

        if(state.offerStage === 0){
          pulseNode(document.getElementById(`${prefix}CtaWrap`));
        }
      });
    }

    function showHint(message, requiredStep = ''){
      getBookingViewPrefixes().forEach((prefix) => {
        const el = document.getElementById(`${prefix}BookingHintInline`);
        const baseHint = document.getElementById(`${prefix}BookingHint`);
        if(!el) return;
        window.clearTimeout(el.__hideTimer);
        el.textContent = message;
        if(requiredStep){
          el.dataset.requiredStep = requiredStep;
        } else {
          delete el.dataset.requiredStep;
          el.__hideTimer = window.setTimeout(() => {
            el.classList.remove('visible');
            el.textContent = '';
            if(baseHint) baseHint.classList.remove('is-muted-hidden');
          }, 2400);
        }
        el.classList.add('visible');
        if(baseHint) baseHint.classList.add('is-muted-hidden');
      });
    }

    function syncBookingHints(){
      getBookingViewPrefixes().forEach((prefix) => {
        const el = document.getElementById(`${prefix}BookingHintInline`);
        const baseHint = document.getElementById(`${prefix}BookingHint`);
        if(!el) return;
        const requiredStep = el.dataset.requiredStep || '';
        if(!requiredStep){
          if(!el.classList.contains('visible') && baseHint){
            baseHint.classList.remove('is-muted-hidden');
          }
          return;
        }

        const resolved = (
          (requiredStep === 'age' && hasSelectedAge()) ||
          (requiredStep === 'shift' && !!state.shiftId) ||
          !!state.shiftId
        );

        if(resolved){
          el.classList.remove('visible');
          el.textContent = '';
          delete el.dataset.requiredStep;
          if(baseHint) baseHint.classList.remove('is-muted-hidden');
        }
      });
    }

    function formatRemaining(diff){
      if(diff <= 0) return '';
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      return `Действует ${h}ч ${m}м`;
    }

    function renderBookingInfo(targetInfoId, targetTitleId, targetLeadId, targetBtnId, targetHintId){
      const info = document.getElementById(targetInfoId);
      const title = document.getElementById(targetTitleId);
      const lead = document.getElementById(targetLeadId);
      const btn = document.getElementById(targetBtnId);
      const hint = document.getElementById(targetHintId);
      const shift = getSelectedShift();
      const action = getPrimaryActionState();

      if(btn){
        btn.textContent = action.text;
        btn.classList.toggle('is-disabled', !!action.disabled);
        btn.setAttribute('aria-disabled', action.disabled ? 'true' : 'false');
        btn.disabled = false;
      }
      if(hint){
        hint.textContent = action.hint;
      }

      if(!hasSelectedAge()){
        if(title) title.textContent = 'Выберите возраст ребёнка';
        if(lead) lead.textContent = 'Мы покажем подходящие смены, программу и условия именно для этого возраста.';
        if(info) info.innerHTML = '';
        return;
      }

      if(!shift){
        if(title) title.textContent = 'Выберите смену';
        if(lead) lead.textContent = `Мы показали смены, которые подходят для возраста ${ageLabel(state.age)}.`;
        if(info) info.innerHTML = '';
        return;
      }

      const currentPrice = formatPrice(shift.price);
      const visiblePrice = formatPrice(getVisiblePrice());
      const timerText = isOfferActive() ? formatRemaining(state.expiresAt - Date.now()) : '';

      if(state.offerStage >= 1){
        if(title) title.textContent = 'Оформление заявки';
        if(lead) lead.textContent = '';
      } else {
        if(title) title.textContent = 'Проверим цену и условия';
        if(lead) lead.textContent = `${shift.title} · ${shift.dates}`;
      }

      const isSummaryStage = state.offerStage >= 1;
      if(info) info.innerHTML = isSummaryStage ? `
        <div class="booking-price-box booking-summary-mini">
          <div class="booking-price-head">
            <div class="booking-price-col">
              <small>Возраст</small>
              <div class="booking-price-main">${ageLabel(state.age)}</div>
            </div>
            <div class="booking-price-col" style="text-align:right;">
              <small>Цена</small>
              <div class="booking-price-main big">${visiblePrice}</div>
            </div>
          </div>
          <div class="booking-code-line">Смена: <strong style="color:#fff;">${shift.title}</strong></div>
          ${state.code ? `<div class="booking-code-line">Код бронирования: <strong style="color:#fff;">${state.code}</strong></div>` : ''}
          ${timerText ? `<div class="booking-timer-line">${timerText}</div>` : ''}
        </div>
      ` : `
        <div class="booking-price-box">
          <div class="booking-price-head">
            <div class="booking-price-col">
              <small>Текущая цена</small>
              <div class="booking-price-main">${currentPrice}</div>
            </div>
            <div class="booking-price-col" style="text-align:right;">
              <small>После проверки</small>
              <div class="booking-price-main big">${visiblePrice}</div>
            </div>
          </div>
        </div>
      `;
    }

    function renderBookingPanels(){
      syncGuidedState();
      const views = getBookingViewPrefixes();
      views.forEach((prefix) => {
        const infoId = BOOKING_INFO_IDS[prefix];
        const titleId = `${prefix}BookingTitle`;
        const leadId = `${prefix}BookingLead`;
        const btnId = `${prefix}StartBtn`;
        const hintId = `${prefix}BookingHint`;
        const stepsId = `${prefix}BookingSteps`;
        renderBookingInfo(infoId, titleId, leadId, btnId, hintId);
        renderSteps(stepsId);
        renderGuidedState(prefix);
        applyBookingStageClass(prefix);
      });
      syncBookingHints();
      updateMobileAgeGateUi();
    }

    function focusMobileAgeGate(){
      const gate = document.getElementById('mobileAgeGateCard');
      const tabs = document.getElementById('mobileAgeTabs');
      if(gate){
        gate.scrollIntoView({behavior:'smooth', block:'center'});
        pulseNode(gate);
      }
      if(tabs){
        pulseNode(tabs);
      }
    }

    function updateMobileAgeGateUi(){
      const sticky = document.getElementById('mobileAgeStickyBar');
      if(!sticky) return;
      const showSticky = isCurrentViewMobile() && !hasSelectedAge();
      sticky.classList.toggle('hidden', !showSticky);

      if(showSticky){
        trackOncePerSession('mobile_age_gate_shown', MOBILE_AGE_GATE_SHOWN_KEY, {
          mode: getModeSummaryForView('mobile')
        });
      }
    }

    function switchView(view){
      const safeView = normalizeViewState(view);
      patchState({view: safeView});
      setActiveViewButtons(safeView);
      Object.entries(modeViewConfig).forEach(([key, cfg]) => {
        const isCurrent = key === safeView;
        document.getElementById(cfg.rootId || '')?.classList.toggle('hidden', !isCurrent);
        if(cfg.modeWrapId){
          document.getElementById(cfg.modeWrapId)?.classList.toggle('hidden', !isCurrent);
        }
      });
      if(safeView !== 'desktop'){
        closeSectionModal();
      }
      updateMobileAgeGateUi();
      persist();
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }

    const modeViewConfig = {
      desktop: {
        rootId: 'desktopView',
        viewButtonId: 'desktopBtn',
        fullBtnId: 'fullModeBtn',
        compactBtnId: 'compactModeBtn',
        modeWrapId: 'desktopModeWrap',
        closeSectionModalOnFull: true,
        postModeApply: () => {}
      },
      mobile: {
        rootId: 'mobileView',
        viewButtonId: 'mobileBtn',
        fullBtnId: 'mobileFullModeBtn',
        compactBtnId: 'mobileCompactModeBtn',
        compactToggleId: 'mobileModeToggle',
        closeSectionModalOnFull: false,
        postModeApply: () => updateMobileAgeGateUi()
      }
    };

    const MODE_ROOT_CLASS_BY_VIEW = {
      desktop: 'compact-mode',
      mobile: 'mobile-compact-mode'
    };

    const MODE_VALUE_MAP = {
      compact: 'compact',
      full: 'full'
    };

    const MODE_TOGGLE_MAP = {
      full: 'compact',
      compact: 'full'
    };

    function getModeStateKey(view){
      return `${view}Mode`;
    }

    function getModeByView(view){
      return MODE_VALUE_MAP[state[getModeStateKey(view)]] || 'full';
    }

    function isCurrentViewMobile(){
      return state.view === 'mobile';
    }

    function getCurrentView(){
      return state.view || 'desktop';
    }

    function isCompactMode(view){
      return getModeByView(view || getCurrentView()) === 'compact';
    }

    function getCurrentModeSummary(){
      return getModeSummaryForView();
    }

    function getModeSummaryForView(view = getCurrentView()){
      const safeView = normalizeViewState(view);
      return safeView + ':' + getModeByView(safeView);
    }

    function applyModeForView(view){
      const cfg = modeViewConfig[view];
      const isCompact = getModeByView(view) === 'compact';
      document.getElementById(cfg.rootId || '')?.classList.toggle(MODE_ROOT_CLASS_BY_VIEW[view] || 'compact-mode', isCompact);
      document.getElementById(cfg.fullBtnId || '')?.classList.toggle('active', !isCompact);
      document.getElementById(cfg.compactBtnId || '')?.classList.toggle('active', isCompact);

      const isCompactToggle = cfg.compactToggleId;
      const toggleState = !isCompact;
      document.getElementById(isCompactToggle || '')?.classList.toggle('is-full', toggleState);
      document.getElementById(isCompactToggle || '')?.setAttribute('aria-checked', String(toggleState));
      cfg.postModeApply?.();
    }

    function switchModeForView(view, mode){
      const safeMode = MODE_VALUE_MAP[mode] || 'full';
      const key = getModeStateKey(view);
      patchState({[key]: safeMode});
      applyModeForView(view);
      if(safeMode !== 'compact' && modeViewConfig[view]?.closeSectionModalOnFull){
        closeSectionModal();
      }
      persist();
    }

    function applyAllModeStates(){
      Object.keys(modeViewConfig).forEach(applyModeForView);
    }


    const setActiveViewButtons = (activeView) => {
      const currentView = activeView || getCurrentView();
      Object.entries(modeViewConfig).forEach(([key, cfg]) => {
        document.getElementById(cfg.viewButtonId || '')?.classList.toggle('active', key === currentView);
      });
    };

    const normalizeViewState = (value) => {
      return modeViewConfig[value] ? value : 'desktop';
    };

    Object.entries(modeViewConfig).forEach(([view, cfg]) => {
      document.getElementById(cfg.viewButtonId || '')?.addEventListener('click', () => switchView(view));
      document.getElementById(cfg.fullBtnId || '')?.addEventListener('click', () => switchModeForView(view, MODE_VALUE_MAP.full));
      document.getElementById(cfg.compactBtnId || '')?.addEventListener('click', () => switchModeForView(view, MODE_VALUE_MAP.compact));
      document.getElementById(cfg.compactToggleId || '')?.addEventListener('click', () => {
        switchModeForView(view, MODE_TOGGLE_MAP[getModeByView(view)] || MODE_VALUE_MAP.compact);
      });
    });

    document.addEventListener('click', (e) => {
      if(handleDataActionClick(e.target)){
        return;
      }

      const photoFilterBtn = e.target.closest('[data-photo-filter]');
      if(photoFilterBtn){
        setPhotoFilter(photoFilterBtn.dataset.photoFilter);
        if(shouldOpenSectionModalForCurrentMode()){
          openSectionModal('section-photos');
        }
        return;
      }

      const faqFilterBtn = e.target.closest('[data-faq-filter]');
      if(faqFilterBtn){
        setFaqFilter(faqFilterBtn.dataset.faqFilter);
        if(shouldOpenSectionModalForCurrentMode()){
          openSectionModal('section-faq');
        }
        return;
      }

      const ageWrap = e.target.closest('#desktopAgeTabs, #mobileAgeTabs');
      const ageBtn = e.target.closest('button');
      if(ageWrap && ageBtn){
        const ageText = (ageBtn.textContent || '').trim();
        if(ageText){
          track('age_select', {age_label: ageText});
        }
      }

      const shiftWrap = e.target.closest('#desktop-shift-options, #mobileShiftOptions');
      const shiftBtn = e.target.closest('button, .shift-option, .slot-card');
      if(shiftWrap && shiftBtn){
        const shiftText = (shiftBtn.textContent || '').trim().split('\n')[0];
        if(shiftText){
          track('shift_select', {
            shift_label: shiftText,
            age: state.age || ''
          });
        }
      }
    });

    document.addEventListener('click', (e) => {
      const videoCard = e.target.closest('[data-video]');
      if(videoCard){
        const url = videoCard.dataset.video || '';
        if(url){
          if(videoCard.tagName === 'A') e.preventDefault();
          openVideo(url);
          return;
        }
      }

      const shiftDisabled = e.target.closest('#desktopShiftList.disabled, #mobileShiftList.disabled');
      if(shiftDisabled){
        showHint('Сначала выберите возраст ребёнка', 'age');
        nudgeUserToNextStep('Сначала выберите возраст ребёнка — тогда откроется список смен.');
      }

      const shiftVeil = e.target.closest('.shift-list-veil');
      if(shiftVeil){
        showHint('Сначала выберите возраст ребёнка', 'age');
        nudgeUserToNextStep('Сначала выберите возраст ребёнка — после этого откроются смены.');
      }

      const ctaBtn = e.target.closest('#desktopStartBtn, #mobileStartBtn');
      if(ctaBtn && ctaBtn.classList.contains('is-disabled')){
        if(!hasSelectedAge()){
          showHint('Выберите возраст ребёнка', 'age');
        } else if(!state.shiftId){
          showHint('Выберите подходящую смену', 'shift');
        }
        nudgeUserToNextStep();
      }

      const summaryBtn = e.target.closest('#summaryBar button, #summaryBar .cta-main');
      if(summaryBtn && (!hasSelectedAge() || !state.shiftId)){
        if(!hasSelectedAge()){
          showHint('Сначала выберите возраст ребёнка', 'age');
          nudgeUserToNextStep('Чтобы перейти дальше, сначала выберите возраст ребёнка.');
        } else {
          showHint('Выберите подходящую смену', 'shift');
          nudgeUserToNextStep('Чтобы перейти дальше, выберите смену.');
        }
      }
    });

    document.getElementById('locationMapBtn')?.addEventListener('click', () => {
      track('map_click', {source:'contacts_map'});
    });

    document.getElementById('yandexReviewsBtn')?.addEventListener('click', () => {
      track('social_click', {network:'Яндекс Отзывы'});
    });

    document.getElementById('socialsGrid')?.addEventListener('click', (e) => {
      const link = e.target.closest('.social-link');
      if(!link) return;
      const network = (link.querySelector('span')?.textContent || '').trim();
      track('social_click', {network});
    });

    document.getElementById('successTelegramBtn')?.addEventListener('click', () => {
      track('telegram_click', {
        source:'success_modal',
        ...selectedShiftPayload()
      });
    });

    function formatPrice(v){
      return new Intl.NumberFormat('ru-RU').format(v) + ' ₽';
    }

    function labelAge(v){
      if(v === '7-9') return '7–9 лет';
      if(v === '10-12') return '10–12 лет';
      return '13–14 лет';
    }

    function shiftDaysLabel(shift){
      if(!shift) return '';
      const map = {
        'shift-1':'10 дней',
        'shift-2':'7 дней',
        'shift-3':'8 дней',
        'shift-4':'14 дней',
        'shift-5':'13 дней',
        'shift-6':'10 дней'
      };
      return map[shift.id] || '';
    }

    function bookingViewKeyByTargetId(targetId){
      return String(targetId || '').startsWith('mobile') ? 'mobile' : 'desktop';
    }

    function toggleShiftOptionPanel(viewKey, panelType, shiftId){
      const safeView = viewKey === 'mobile' ? 'mobile' : 'desktop';
      const current = shiftOptionPanels[safeView]?.[panelType] || null;
      shiftOptionPanels[safeView][panelType] = current === shiftId ? null : shiftId;
      renderShiftOptions(safeView === 'mobile' ? 'mobileShiftOptions' : 'desktop-shift-options');
    }

    function clearShiftOptionPanels(){
      shiftOptionPanels = {
        desktop:{aboutId:null, calendarId:null},
        mobile:{aboutId:null, calendarId:null}
      };
    }

    function parseShiftDate(dateStr){
      const m = String(dateStr || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if(!m) return null;
      return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    }

    function renderCalendar(shift){
      const grid = document.getElementById('calendarGrid');
      const title = document.getElementById('calendarTitle');
      if(!grid || !title || !shift) return;

      const start = parseShiftDate(shift.start);
      const end = parseShiftDate(shift.end);
      if(!start || !end) return;

      const ruWeek = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
      const ruMonth = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];

      title.textContent = `${shift.title}: ${start.toLocaleDateString('ru-RU')} — ${end.toLocaleDateString('ru-RU')}`;

      const firstMonth = new Date(start.getFullYear(), start.getMonth(), 1);
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);
      const cursor = new Date(firstMonth);
      let html = '';

      while(cursor <= lastMonth){
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const leading = firstDay.getDay();

        html += `
          <div class="calendar-month">
            <div class="calendar-month-title">${ruMonth[month]} ${year}</div>
            <div class="calendar-month-grid">
        `;

        for(let i = 0; i < leading; i += 1){
          html += '<div class="calendar-day empty"></div>';
        }

        for(let day = 1; day <= daysInMonth; day += 1){
          const d = new Date(year, month, day);
          const isInRange = d >= start && d <= end;
          html += `
            <div class="calendar-day ${isInRange ? 'active' : ''}">
              <span>${day}</span>
              <small>${ruWeek[d.getDay()]}</small>
            </div>
          `;
        }

        html += '</div></div>';
        cursor.setMonth(cursor.getMonth() + 1);
      }

      grid.innerHTML = html;
    }

    function openCalendar(shiftId){
      const shift = shifts.find(s => s.id === shiftId);
      if(!shift) return;
      closeTransientModals('calendar');
      renderCalendar(shift);
      document.getElementById('calendarModal')?.classList.remove('hidden');
    }

    function closeCalendar(){
      document.getElementById('calendarModal')?.classList.add('hidden');
    }

    function selectedShiftPayload(){
      const shift = getSelectedShift();
      return {
        shift_id: state.shiftId || '',
        shift_title: shift ? shift.title : '',
        shift_dates: shift ? shift.dates : '',
        shift_days: shift ? shiftDaysLabel(shift) : '',
        age: state.age || '',
        price: state.offerPrice || state.basePrice || (shift ? shift.price : '')
      };
    }

    function clearOfferTimeout(){
      if(!offerTimeoutIds.length) return;
      offerTimeoutIds.forEach((id) => clearTimeout(id));
      offerTimeoutIds = [];
    }

    function resetOfferState({preserveShift = true} = {}){
      clearOfferTimeout();
      patchState({
        offerStage: 0,
        offerPrice: null,
        code: null,
        expiresAt: null,
        offerSearching: false
      });
      if(!preserveShift){
        patchState({
          shiftId: null,
          basePrice: null
        });
      }
    }

    function buildBookingSummaryHtml(){
      const shift = getSelectedShift();
      if(!shift) return '';
      return `
        <strong>Что мы сейчас фиксируем за вами</strong>
        <div class="booking-summary-list">
          <div>Смена: ${shift.title}</div>
          <div>Даты: ${shift.dates}</div>
          <div>Длительность: ${shiftDaysLabel(shift)}</div>
          <div>Возраст: ${ageLabel(state.age)}</div>
          <div>Цена: ${formatPrice(state.offerPrice || state.basePrice || shift.price)}</div>
          <div>Код бронирования: ${state.code || '—'}</div>
        </div>
        <div class="micro-note">Без предоплаты. Мы сначала подтверждаем бронь вручную.</div>
      `;
    }

    function generateCode(){
      return 'AC-' + Math.random().toString(36).slice(2,6).toUpperCase();
    }

    function bindAgeTabs(rootId){
      const root = document.getElementById(rootId);
      if(!root) return;
      root.querySelectorAll('[data-age]').forEach(btn => {
        btn.addEventListener('click', () => {
          root.querySelectorAll('[data-age]').forEach(x => x.classList.remove('active'));
          btn.classList.add('active');
          patchState({
            age: btn.dataset.age,
            ageSelected: true,
            shiftId: null,
            basePrice: null,
            offerPrice: null,
            code: null,
            expiresAt: null,
            offerStage: 0
          });
          if(rootId === 'mobileAgeTabs'){
            track('mobile_age_selected', {
              age: state.age || '',
              age_label: ageLabel(state.age)
            });
          }
          renderAll();
          persist();
        });
      });
    }

    function resetAgeSelection(){
      clearShiftOptionPanels();
      patchState({
        age: null,
        ageSelected: false,
        shiftId: null,
        basePrice: null,
        offerPrice: null,
        code: null,
        expiresAt: null,
        offerStage: 0
      });

      ['desktopAgeTabs','mobileAgeTabs'].forEach(id => {
        const root = document.getElementById(id);
        if(root){
          root.querySelectorAll('[data-age]').forEach(x => x.classList.remove('active'));
        }
      });

      renderAll();
      persist();
    }

    function resetShiftSelection(){
      clearShiftOptionPanels();
      patchState({
        shiftId: null,
        basePrice: null,
        offerPrice: null,
        code: null,
        expiresAt: null,
        offerStage: 0,
        offerSearching: false
      });
      showHint('Смена сброшена. Выберите подходящий вариант.', 'shift');
      renderAll();
      persist();
    }

    function setPhotoFilter(filter){
      patchState({photoFilter: filter});
      renderMediaSections();
      persist();
    }

    function setFaqFilter(filter){
      patchState({faqFilter: filter});
      track('faq_filter', {filter});
      renderMediaSections();
      persist();
    }

    bindAgeTabs('desktopAgeTabs');
    bindAgeTabs('mobileAgeTabs');

    function renderShiftOptions(targetId){
      const box = document.getElementById(targetId);
      if(!box) return;
      const viewKey = bookingViewKeyByTargetId(targetId);

      const summaryByAge = {
        '7-9': [
          'IT-проекты: Scratch / Python',
          'Бассейн каждый день',
          'Живая среда без гаджетного залипания',
          'Подходит для 7–9 лет'
        ],
        '10-12': [
          'Python и командные мини-спринты',
          'Бассейн и спорт ежедневно',
          'Командные роли и самостоятельность',
          'Подходит для 10–12 лет'
        ],
        '13-14': [
          'AI-практика и проектная защита',
          'Спорт + живая лагерная среда',
          'Меньше телефонов, больше результата',
          'Подходит для 13–14 лет'
        ]
      };

      const selectedAge = state.age || '7-9';
      const summaryLines = summaryByAge[selectedAge] || summaryByAge['7-9'];

      box.innerHTML = shifts.slice(0,2).map(s => {
        const showAbout = shiftOptionPanels[viewKey]?.aboutId === s.id;
        const showCalendar = shiftOptionPanels[viewKey]?.calendarId === s.id;
        const start = parseShiftDate(s.start);
        const end = parseShiftDate(s.end);
        const startText = start ? start.toLocaleDateString('ru-RU') : s.start;
        const endText = end ? end.toLocaleDateString('ru-RU') : s.end;

        return `
        <div class="shift-option ${state.shiftId === s.id ? 'active' : ''}" data-id="${s.id}">
          <div class="shift-option-head">
            <strong>${s.dates}</strong>
            <small>${formatPrice(s.price)} · осталось ${s.left} мест</small>
          </div>
          <div class="shift-option-actions">
            <button class="shift-option-action" type="button" data-action="toggle-shift-about" data-shift-id="${s.id}" data-shift-view="${viewKey}">
              О смене
            </button>
            <button class="shift-option-action" type="button" data-action="toggle-shift-calendar-inline" data-shift-id="${s.id}" data-shift-view="${viewKey}">
              Календарь
            </button>
          </div>
          <div class="shift-inline-panel ${showAbout ? 'visible' : ''}">
            <ul>
              ${summaryLines.map((line) => `<li>${line}</li>`).join('')}
            </ul>
          </div>
          <div class="shift-inline-panel shift-inline-calendar ${showCalendar ? 'visible' : ''}">
            <div><strong>Заезд:</strong> ${startText}</div>
            <div><strong>Выезд:</strong> ${endText}</div>
            <div><strong>Длительность:</strong> ${shiftDaysLabel(s)}</div>
          </div>
        </div>
      `;
      }).join('');

      box.querySelectorAll('.shift-option').forEach(el => {
        el.addEventListener('click', (event) => {
          if(event.target.closest('.shift-option-action')){
            return;
          }
          if(!hasSelectedAge()){
            showHint('Сначала выберите возраст ребёнка', 'age');
            nudgeUserToNextStep('Сначала выберите возраст ребёнка — тогда откроется список смен.');
            return;
          }
          selectShift(el.dataset.id);
        });
      });
    }

    function renderShiftCards(){
      syncGuidedState();
      const grid = document.getElementById('shiftCardsGrid');
      if(!grid) return;
      const shortGrid = document.getElementById('shortShiftCards');
      const shortShiftIds = new Set(['shift-2','shift-3']);
      const mainShifts = shifts.filter(s => !shortShiftIds.has(s.id));
      const shortShifts = shifts.filter(s => shortShiftIds.has(s.id));

      grid.innerHTML = mainShifts.map(s => `
        <div class="mini-card">
          <h4>${s.title}</h4>
          <div class="price-row">
            <strong>${formatPrice(s.price)}</strong>
            <span>
              ${s.dates} · ${shiftDaysLabel(s)}
              <button class="shift-calendar-btn" type="button" data-action="open-calendar" data-shift-id="${s.id}" aria-label="Календарь ${s.title}">
                <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/calendar.svg" alt="" aria-hidden="true" />
                <span>календарь</span>
              </button>
            </span>
          </div>
          <p>${s.desc}</p>
          ${getShiftContextLine(s) ? `<div class="shift-context-line">${getShiftContextLine(s)}</div>` : ''}
        </div>
      `).join('');

      if(shortGrid){
        shortGrid.innerHTML = shortShifts.map((s, idx) => `
          <div class="mini-card short-shift-card">
            <div class="short-shift-head">
              <h4>${s.title}</h4>
              <span class="short-shift-tag">короткий формат</span>
            </div>
            <div class="price-row">
              <strong>${formatPrice(s.price)}</strong>
              <span>${s.dates}</span>
            </div>
            <div class="short-shift-meta">
              <div><strong>Длительность:</strong> ${shiftDaysLabel(s)}</div>
              <div><strong>Мест:</strong> ${s.left}</div>
            </div>
          </div>
        `).join('');
      }
    }

    function contactIconMarkup(label){
      const map = {
        city_phone:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/phone-city.svg',
        mobile_phone:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/phone-mobile.svg',
        whatsapp:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/whatsapp.svg',
        telegram:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/telegram.svg'
      };
      const src = map[label];
      return src ? `<img class="ac-icon" src="${src}" alt="" aria-hidden="true">` : '•';
    }

    function socialBadgeMark(item){
      const mark = String(item?.label || '').trim().toUpperCase();
      const allowed = new Set(['VK','RT','IG','OK','YT','LI','TT','PI','YA']);
      return allowed.has(mark) ? mark : '•';
    }

    function faqGlyph(iconPath, groupName){
      if(iconPath && iconPath.includes('med')) return 'MED';
      if(iconPath && iconPath.includes('lock')) return 'SAFE';
      if(iconPath && iconPath.includes('food')) return 'FOOD';
      if(iconPath && iconPath.includes('check')) return 'ROOM';
      if(iconPath && iconPath.includes('phone')) return 'CALL';
      return groupName.slice(0,3).toUpperCase();
    }

    function renderStars(){
      return '<div class="stars">★★★★★</div>';
    }

    function renderMediaSections(){
      const photoGrid = document.getElementById('photoGrid');
      const videoList = document.getElementById('videoList');
      const contactsGrid = document.getElementById('contactsGrid');
      const socialsGrid = document.getElementById('socialsGrid');
      const footerSocialsList = document.getElementById('footerSocialsList');
      const faqGroups = document.getElementById('faqGroups');
      const teamGrid = document.getElementById('teamGrid');
      const bookLinkBtn = document.getElementById('bookLinkBtn');
      const yandexReviewsBtn = document.getElementById('yandexReviewsBtn');
      const reviewsGrid = document.getElementById('reviewsGrid');
      const locationMapBtn = document.getElementById('locationMapBtn');
      const locationMapFrame = document.getElementById('locationMapFrame');

      if (photoGrid) {
        let filteredPhotos = [];

        if(state.photoFilter === 'all'){
          filteredPhotos = mediaContent.photos;
        } else if(state.photoFilter === 'camp'){
          filteredPhotos = mediaContent.photos.filter(item => item.cat === 'camp' || item.cat === 'all');
        } else {
          filteredPhotos = mediaContent.photos.filter(item => item.cat === state.photoFilter);
        }

        if(!filteredPhotos.length){
          filteredPhotos = mediaContent.photos.filter(item => item.cat === 'all');
        }
        if(!filteredPhotos.length){
          filteredPhotos = mediaContent.photos;
        }

        // Keep category view compact (hero + 3 small cards) and avoid growing the block.
        if(state.photoFilter !== 'all' && state.photoFilter !== 'camp'){
          if(state.photoFilter === 'study' && filteredPhotos.length > 4){
            const featuredRightSlot = filteredPhotos[filteredPhotos.length - 1];
            filteredPhotos = [filteredPhotos[0], filteredPhotos[1], filteredPhotos[2], featuredRightSlot];
          } else {
            filteredPhotos = filteredPhotos.slice(0, 4);
          }
        }
        activePhotoList = filteredPhotos;

        photoGrid.innerHTML = filteredPhotos.map((item, idx) => `
          <div
            class="photo-card ${idx === 0 ? 'hero' : ''}"
            data-action="open-photo"
            data-photo-index="${idx}"
          >
            <img src="${item.src}" alt="${item.alt}">
            <div class="photo-title">АйДаКемп</div>
            <div class="photo-badge">${photoCatLabel(item.cat)}</div>
          </div>
        `).join('');
      }

      if (videoList) {
        videoList.innerHTML = mediaContent.videos.map((item) => `
          <div class="video-card" data-video="${item.url}">
            <div class="video-poster">
              <img src="${item.cover || 'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/video-covers/cover-week-change.jpg'}" alt="${item.title}">
              <div class="video-play"><img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/play.svg" alt="" aria-hidden="true" /></div>
            </div>
            <h4>${item.title}</h4>
          </div>
        `).join('');
      }

      if (bookLinkBtn) bookLinkBtn.href = mediaContent.references.programmingBookUrl;

      if(yandexReviewsBtn){
        yandexReviewsBtn.textContent = mediaContent.references.yandexReviewsLabel;
        yandexReviewsBtn.href = mediaContent.references.yandexReviewsUrl;
      }

      if (locationMapBtn) {
        locationMapBtn.href = mediaContent.references.locationMapUrl;
      }

      if (locationMapFrame) {
        locationMapFrame.src = mediaContent.references.locationMapEmbedUrl || '';
      }

      if(reviewsGrid){
        reviewsGrid.innerHTML = mediaContent.reviews.map(item => `
          <div class="review-real">
            <div class="review-head-real">
              <div class="review-avatar">
                <img src="${item.avatar}" alt="${item.name}">
              </div>
              <div class="review-person">
                <strong>${item.name}</strong>
                <div class="review-source">Яндекс Карты</div>
                <div class="review-stars">★★★★★</div>
                <div class="review-meta">${item.meta}</div>
              </div>
            </div>
            <div class="review-quote">«${item.quote}»</div>
          </div>
        `).join('');
      }

      if (contactsGrid) {
        contactsGrid.innerHTML = mediaContent.contacts.map(item => `
          <a class="contact-link" href="${item.href}" target="_blank" rel="noopener noreferrer">
            <div class="contact-icon">${contactIconMarkup(item.label)}</div>
            <strong>${item.text}</strong>
          </a>
        `).join('');
      }

      if (socialsGrid) {
        socialsGrid.innerHTML = mediaContent.socials.map(item => `
          <a class="social-link" href="${item.href}" target="_blank" rel="noopener noreferrer">
            <span class="social-badge-mark">${socialBadgeMark(item)}</span>
            <span class="social-label">${item.key}</span>
          </a>
        `).join('');
      }

      if (footerSocialsList) {
        footerSocialsList.innerHTML = mediaContent.socials.map(item => `
          <a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.key}</a>
        `).join('');
      }

      if (faqGroups) {
        const filteredFaq = state.faqFilter === 'all'
          ? mediaContent.faq
          : mediaContent.faq.filter(group => group.group === state.faqFilter);

        faqGroups.innerHTML = filteredFaq.map(group => `
          <div class="faq-group">
            <div class="faq-group-head">
              <div class="faq-icon">${faqGlyph(group.icon, group.group)}</div>
              <strong>${group.group}</strong>
            </div>
            <div class="faq-list">
              ${group.items.map(item => `
                <div class="faq-line">
                  <strong>${item.q}</strong>
                  <span>${item.a}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('');

        const faqEmpty = document.getElementById('faqEmptyState');
        if (faqEmpty) {
          faqEmpty.classList.toggle('visible', filteredFaq.length === 0);
        }
      }

      const faqFilters = document.getElementById('faqFilters');
      if (faqFilters) {
        faqFilters.querySelectorAll('[data-faq-filter]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.faqFilter === state.faqFilter);
        });
      }

      if (teamGrid) {
        const renderTeamCard = (item) => `
          <div class="team-card">
            <div class="team-avatar">
              <img src="${item.avatarUrl}" alt="${item.fio}">
            </div>
            <strong>${item.fio}</strong>
            <span class="team-role">${item.role}</span>
            <span>${item.bio}</span>
          </div>
        `;

        const byName = new Map(mediaContent.team.map(item => [item.fio, item]));
        const coreNames = ['Дарья Афанасьева', 'Никита Брагин'];
        const coreCards = coreNames
          .map((name) => byName.get(name))
          .filter(Boolean)
          .map(renderTeamCard)
          .join('');

        const carouselCards = mediaContent.team
          .filter((item) => !coreNames.includes(item.fio))
          .map(renderTeamCard)
          .join('');

        const bookCard = `
        <div class="team-card book-team-card">
          <div class="book-team-cover-wrap" data-action="open-book-photo" role="button" tabindex="0" aria-label="Открыть обложку книги">
            <img
              class="book-team-cover"
              src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/8fc8172e_8991804334.webp"
              alt="Книга Python для детей"
            >
          </div>
          <div class="book-team-title">Собственная книга по Python</div>
          <div class="book-team-sub">Команда не только ведёт занятия, но и создаёт собственные учебники и игровые методики, по которым дети входят в программирование через практику.</div>
          <div class="book-team-proof">Для родителя книга — это более сильное доказательство экспертизы и собственной методики, чем просто ещё одна карточка преподавателя.</div>
          <a
            class="book-team-cta"
            href="https://www.codims.ru/python-book"
            target="_blank"
            rel="noopener noreferrer"
          >Смотреть книгу</a>
        </div>
        `;

        teamGrid.innerHTML = `
          <div class="team-layout">
            ${bookCard}
            <div class="team-right">
              <div class="team-core-grid">${coreCards}</div>
              <div class="team-carousel-shell">
                <button class="team-carousel-nav prev" type="button" data-action="team-carousel-prev" aria-label="Предыдущие преподаватели">
                  <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/chevron-left.svg" alt="" aria-hidden="true">
                </button>
                <div class="team-carousel" id="teamCarousel">${carouselCards}</div>
                <button class="team-carousel-nav next" type="button" data-action="team-carousel-next" aria-label="Следующие преподаватели">
                  <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
                </button>
              </div>
            </div>
          </div>
        `;
      }

      const photoFilters = document.getElementById('photoFilters');
      if (photoFilters) {
        photoFilters.querySelectorAll('[data-photo-filter]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.photoFilter === state.photoFilter);
        });
      }

      prepareStayGalleryTriggers();
      renderCompactTrustPanelContent();
    }

    function renderCompactTrustPanelContent(){
      const mobilePhotoGallery = document.getElementById('mobilePhotoGallery');
      const mobileVideoGallery = document.getElementById('mobileVideoGallery');
      const mobileReviewsGallery = document.getElementById('mobileReviewsGallery');
      const mobileFaqList = document.getElementById('mobileFaqList');
      const mobileInlineTeamList = document.getElementById('mobileInlineTeamList');
      const mobileInlineStayList = document.getElementById('mobileInlineStayList');
      const mobileInlineContactsList = document.getElementById('mobileInlineContactsList');
      const mobileInlineSocials = document.getElementById('mobileInlineSocials');
      const mobileAboutFeatures = document.getElementById('mobileAboutFeatures');
      const mobileJourneyContent = document.getElementById('mobileJourneyContent');
      const mobileProgramsContent = document.getElementById('mobileProgramsContent');
      const mobileDocsRequisites = document.getElementById('mobileDocsRequisites');
      const mobileDocsAccordion = document.getElementById('mobileDocsAccordion');

      if (mobileAboutFeatures) {
        mobileAboutFeatures.innerHTML = `
          <article class="mobile-about-feature-item">
            <small>Проекты</small>
            <strong>AI и программирование</strong>
            <p>Scratch, Python, Minecraft и нейросети через реальные командные задачи.</p>
          </article>
          <article class="mobile-about-feature-item">
            <small>Среда</small>
            <strong>Бассейн и живая лагерная среда</strong>
            <p>Каждый день спорт, коммуникация и режим без бессмысленного скроллинга.</p>
          </article>
          <article class="mobile-about-feature-item">
            <small>Результат</small>
            <strong>Итог за смену</strong>
            <p>Ребёнок уезжает с проектом, опытом защиты и более уверенной самостоятельностью.</p>
          </article>
        `;
      }

      if (mobileJourneyContent) {
        const steps = [
          {
            title: 'Быстрое включение',
            text: 'В первый день дети знакомятся, собираются в команды и быстро входят в игровой формат смены.'
          },
          {
            title: 'Практика вместо теории',
            text: 'Scratch, Python, Minecraft, AI и мини-проекты — без пересказа, с реальной работой руками.'
          },
          {
            title: 'Живая среда',
            text: 'Бассейн, спорт и внутренняя экономика лагеря формируют дисциплину, ритм и командность.'
          },
          {
            title: 'Финальный результат',
            text: 'К концу смены у ребёнка есть понятный проект, защита и видимый рост по навыкам.'
          }
        ];
        const safeStep = Math.max(0, Math.min(state.mobileJourneyStep || 0, steps.length - 1));
        patchState({mobileJourneyStep: safeStep});
        const activeStep = steps[safeStep];

        mobileJourneyContent.innerHTML = `
          <article class="mobile-journey-active">
            <div class="mobile-journey-active-heading">
              <div class="mobile-journey-active-index">${safeStep + 1}</div>
              <strong>${activeStep.title}</strong>
            </div>
            <p>${activeStep.text}</p>
          </article>
          <div class="mobile-journey-switcher">
            ${steps.map((step, idx) => `
              <button
                type="button"
                class="mobile-journey-switch ${idx === safeStep ? 'active' : ''}"
                data-action="mobile-journey-step"
                data-step-index="${idx}"
              >
                <span>${idx + 1}</span>${step.title}
              </button>
            `).join('')}
          </div>
        `;
      }

      if (mobileProgramsContent) {
        const shortShiftIds = new Set(['shift-2','shift-3']);
        const mainShifts = shifts.filter((shift) => !shortShiftIds.has(shift.id));
        if(mainShifts.length){
          const activeShiftId = mainShifts.some((shift) => shift.id === state.mobileProgramShiftId)
            ? state.mobileProgramShiftId
            : mainShifts[0].id;
          patchState({mobileProgramShiftId: activeShiftId});
          const activeShift = mainShifts.find((shift) => shift.id === activeShiftId) || mainShifts[0];

          mobileProgramsContent.innerHTML = `
            <div class="mobile-program-selector">
              ${mainShifts.map((shift) => `
                <button
                  type="button"
                  class="mobile-program-chip ${shift.id === activeShift.id ? 'active' : ''}"
                  data-action="mobile-program-select"
                  data-shift-id="${shift.id}"
                >${shift.title}</button>
              `).join('')}
            </div>
            <article class="mobile-program-active-card">
              <strong>${activeShift.title} · ${activeShift.dates}</strong>
              <div class="mobile-program-price">${formatPrice(activeShift.price)}</div>
              <div class="mobile-program-meta">
                <span>${shiftDaysLabel(activeShift)}</span>
                <span>Осталось ${activeShift.left} мест</span>
              </div>
              <p>${activeShift.desc}</p>
              <button
                class="shift-calendar-btn"
                type="button"
                data-action="open-calendar"
                data-shift-id="${activeShift.id}"
                aria-label="Календарь ${activeShift.title}"
              >
                <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/calendar.svg" alt="" aria-hidden="true" />
                <span>Календарь</span>
              </button>
            </article>
          `;
        } else {
          mobileProgramsContent.innerHTML = '';
        }
      }

      if (mobilePhotoGallery) {
        const photoByFilter = {
          camp: ['all'],
          pool: ['pool'],
          sport: ['sport'],
          study: ['study'],
          food: ['food']
        };
        const tags = photoByFilter[state.photoFilter] || ['all'];
        const list = mediaContent.photos.filter(item => tags.includes(item.cat));
        const activeIndex = Math.min(Math.max(state.mobilePhotoIndex || 0, 0), Math.max(list.length - 1, 0));
        patchState({mobilePhotoIndex: activeIndex});
        const active = list[activeIndex];

        const filters = document.getElementById('mobilePhotoFilters');
        if(filters){
          filters.querySelectorAll('[data-photo-filter]').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.photoFilter === state.photoFilter);
          });
        }

        if(active){
          mobilePhotoGallery.innerHTML = `
            <div class="mobile-media-stage">
              <button type="button" data-action="open-photo" data-photo-index="${activeIndex}">
                <img src="${active.src}" alt="${active.alt || 'Фото лагеря'}">
                <div class="mobile-media-overlay">
                  <strong>${(active.alt || 'Атмосфера лагеря').replace(/^all$/i, 'Атмосфера')}</strong>
                  <span>Тапните, чтобы открыть фото</span>
                </div>
              </button>
            </div>
            <div class="mobile-media-strip">
              ${list.map((item, idx) => `
                <button class="mobile-media-thumb ${idx === activeIndex ? 'active' : ''}" type="button" data-action="mobile-photo-select" data-photo-index="${idx}">
                  <img src="${item.src}" alt="${item.alt || 'Фото'}">
                </button>
              `).join('')}
            </div>
          `;
        } else {
          mobilePhotoGallery.innerHTML = '';
        }
      }

      if (mobileVideoGallery) {
        const list = mediaContent.videos || [];
        const activeIndex = Math.min(Math.max(state.mobileVideoIndex || 0, 0), Math.max(list.length - 1, 0));
        patchState({mobileVideoIndex: activeIndex});
        const active = list[activeIndex];

        if(active){
          mobileVideoGallery.innerHTML = `
            <div class="mobile-media-stage">
              <button type="button" data-action="open-video" data-video="${active.url}">
                <img src="${active.cover}" alt="${active.title}">
                <span class="mobile-media-play"><img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/play.svg" alt="" aria-hidden="true"></span>
                <div class="mobile-media-overlay">
                  <strong>${active.title}</strong>
                  <span>Смотреть видео</span>
                </div>
              </button>
            </div>
            <div class="mobile-media-strip">
              ${list.map((item, idx) => `
                <button class="mobile-media-thumb ${idx === activeIndex ? 'active' : ''}" type="button" data-action="mobile-video-select" data-video-index="${idx}">
                  <img src="${item.cover}" alt="${item.title}">
                </button>
              `).join('')}
            </div>
          `;
        } else {
          mobileVideoGallery.innerHTML = '';
        }
      }

      if (mobileReviewsGallery) {
        const list = mediaContent.reviews || [];
        const activeIndex = Math.min(Math.max(state.mobileReviewIndex || 0, 0), Math.max(list.length - 1, 0));
        patchState({mobileReviewIndex: activeIndex});
        const active = list[activeIndex];
        if(active){
          mobileReviewsGallery.innerHTML = `
            <div class="mobile-review-social-proof">
              <div class="mobile-review-top">
                <div>
                  <strong>5.0</strong><span class="mobile-review-stars">★★★★★</span>
                </div>
                <a class="inline-link-btn primary" href="${mediaContent.references.yandexReviewsUrl}" target="_blank" rel="noopener noreferrer">Отзывы на Яндекс Картах</a>
              </div>
              <div class="mobile-review-proof">Более 40 реальных отзывов на Яндекс.Картах</div>
            </div>
            <div class="mobile-review-main">
              <div class="mobile-review-card">
                <div class="mobile-review-head">
                  <img src="${active.avatar}" alt="${active.name}">
                  <div>
                    <strong>${active.name}</strong>
                    <span>${active.meta}</span>
                    <span class="mobile-review-stars">★★★★★</span>
                  </div>
                </div>
                <div class="mobile-review-text">${active.quote}</div>
              </div>
              <div class="mobile-review-dots">
                ${list.map((_, idx) => `
                  <button class="mobile-review-dot ${idx === activeIndex ? 'active' : ''}" type="button" data-action="mobile-review-select" data-review-index="${idx}" aria-label="Показать отзыв ${idx + 1}"></button>
                `).join('')}
              </div>
            </div>
          `;
        } else {
          mobileReviewsGallery.innerHTML = '';
        }
      }

      if (mobileFaqList) {
        const groups = mediaContent.faq.map((group) => group.group);
        const safeGroup = groups.includes(state.mobileFaqGroup) ? state.mobileFaqGroup : (groups[0] || 'Медицина');
        patchState({mobileFaqGroup: safeGroup});
        const activeFaqGroup = mediaContent.faq.find((group) => group.group === safeGroup);
        const faqItems = (activeFaqGroup?.items || []).map((item, index) => ({
          key: `${safeGroup}:${index}`,
          q: item.q,
          a: item.a
        }));
        const fallbackKey = faqItems[0]?.key || '';
        const activeKey = faqItems.some((item) => item.key === state.mobileFaqOpenKey) ? state.mobileFaqOpenKey : fallbackKey;
        patchState({mobileFaqOpenKey: activeKey});

        const mobileFaqFilters = document.getElementById('mobileFaqFilters');
        if(mobileFaqFilters){
          mobileFaqFilters.innerHTML = groups.map((group) => `
            <button
              type="button"
              class="mobile-faq-filter-chip ${group === safeGroup ? 'active' : ''}"
              data-action="mobile-faq-filter"
              data-faq-group="${group}"
            >${group}</button>
          `).join('');
        }

        mobileFaqList.innerHTML = faqItems.map((item) => `
          <article class="mobile-faq-item ${item.key === activeKey ? 'open' : ''}">
            <button
              type="button"
              class="mobile-faq-question"
              data-action="mobile-faq-toggle"
              data-faq-key="${item.key}"
            >
              <span>${item.q}</span>
              <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
            </button>
            <div class="mobile-faq-answer">${item.a}</div>
          </article>
        `).join('');
      }

      if (mobileInlineTeamList) {
        const founder = mediaContent.team.find((item) => item.fio === 'Дарья Афанасьева') || mediaContent.team[0];
        const teachers = mediaContent.team.filter((item) => item.fio !== founder?.fio);
        const safeIndex = teachers.length ? ((state.mobileTeamIndex % teachers.length) + teachers.length) % teachers.length : 0;
        patchState({mobileTeamIndex: safeIndex});
        const activeTeacher = teachers[safeIndex];

        mobileInlineTeamList.innerHTML = `
          <article class="mobile-team-feature-card">
            <div class="mobile-team-feature-cover-wrap" data-action="open-book-photo" role="button" tabindex="0" aria-label="Открыть обложку книги">
              <img class="mobile-team-feature-cover" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/images/cdn-cache/8fc8172e_8991804334.webp" alt="Собственная книга по Python">
            </div>
            <strong>Собственная книга по Python</strong>
            <span>Команда не только ведёт занятия, но и создаёт собственные учебники и игровые методики.</span>
            <a class="mobile-team-feature-cta" href="${mediaContent.references.programmingBookUrl}" target="_blank" rel="noopener noreferrer">Смотреть книгу</a>
          </article>
          ${founder ? `
            <article class="mobile-team-founder-card">
              <div class="mobile-team-avatar">
                <img src="${founder.avatarUrl}" alt="${founder.fio}">
              </div>
              <strong>${founder.fio}</strong>
              <span class="mobile-team-role">${founder.role}</span>
              <p>${founder.bio}</p>
            </article>
          ` : ''}
          ${activeTeacher ? `
            <div class="mobile-team-carousel-block">
              <div class="mobile-team-carousel-head">
                <strong>Преподаватели</strong>
                <div class="mobile-team-carousel-controls">
                  <button type="button" data-action="mobile-team-prev" aria-label="Предыдущий преподаватель">
                    <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/chevron-left.svg" alt="" aria-hidden="true">
                  </button>
                  <button type="button" data-action="mobile-team-next" aria-label="Следующий преподаватель">
                    <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
                  </button>
                </div>
              </div>
              <article class="mobile-team-teacher-card">
                <div class="mobile-team-avatar">
                  <img src="${activeTeacher.avatarUrl}" alt="${activeTeacher.fio}">
                </div>
                <strong>${activeTeacher.fio}</strong>
                <span class="mobile-team-role">${activeTeacher.role}</span>
                <p>${activeTeacher.bio}</p>
              </article>
              <div class="mobile-team-carousel-dots">
                ${teachers.map((_, index) => `
                  <button
                    type="button"
                    class="mobile-team-dot ${index === safeIndex ? 'active' : ''}"
                    data-action="mobile-team-select"
                    data-team-index="${index}"
                    aria-label="Переключить преподавателя"
                  ></button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        `;
      }

      if (mobileInlineStayList) {
        const stayCards = Array.from(document.querySelectorAll('#section-stay .stay-card')).map((card) => {
          return {
            img: card.querySelector('img')?.getAttribute('src') || '',
            title: (card.querySelector('.stay-card-body strong')?.textContent || '').trim(),
            text: (card.querySelector('.stay-card-body span')?.textContent || '').trim()
          };
        }).filter(item => item.title);

        mobileInlineStayList.innerHTML = stayCards.slice(0, 3).map((item, idx) => `
          <div class="mobile-stay-card is-clickable" data-action="open-stay-photo" data-stay-index="${idx}" role="button" tabindex="0">
            <div class="mobile-stay-thumb">${item.img ? `<img src="${item.img}" alt="${item.title}">` : ''}</div>
            <div>
              <strong>${item.title}</strong>
              <span>${item.text}</span>
            </div>
          </div>
        `).join('');
      }

      if (mobileInlineContactsList) {
        const mapUrl = mediaContent.references.locationMapUrl;
        const mapEmbedUrl = mediaContent.references.locationMapEmbedUrl;
        const cityPhone = mediaContent.contacts.find((item) => item.label === 'city_phone');
        const mobilePhone = mediaContent.contacts.find((item) => item.label === 'mobile_phone');
        const whatsapp = mediaContent.contacts.find((item) => item.label === 'whatsapp');
        const telegram = mediaContent.contacts.find((item) => item.label === 'telegram');

        mobileInlineContactsList.innerHTML = `
          <article class="mobile-map-preview-card">
            <div class="mobile-map-preview">
              <iframe
                src="${mapEmbedUrl}"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Карта локации лагеря"
              ></iframe>
            </div>
            <strong>66 км от Москвы · Киевское шоссе</strong>
            <span>Удобный заезд на машине, маршрут открывается в Яндекс Картах.</span>
            <a class="mobile-map-open-btn" href="${mapUrl}" target="_blank" rel="noopener noreferrer">Открыть карту</a>
          </article>
          <div class="mobile-contact-grid">
            ${cityPhone ? `<a class="mobile-contact-card" href="${cityPhone.href}"><small>Телефон 1</small><strong>${cityPhone.text}</strong></a>` : ''}
            ${mobilePhone ? `<a class="mobile-contact-card" href="${mobilePhone.href}"><small>Телефон 2</small><strong>${mobilePhone.text}</strong></a>` : ''}
            ${whatsapp ? `<a class="mobile-contact-card" href="${whatsapp.href}" target="_blank" rel="noopener noreferrer"><small>WhatsApp</small><strong>WhatsApp</strong></a>` : ''}
            ${telegram ? `<a class="mobile-contact-card" href="${telegram.href}" target="_blank" rel="noopener noreferrer"><small>Telegram</small><strong>@proga_school</strong></a>` : ''}
          </div>
        `;
      }

      if (mobileInlineSocials) {
        mobileInlineSocials.innerHTML = mediaContent.socials.map(item => `
          <a class="mobile-social-link" href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.key}">
            <span class="mobile-social-icon"><span class="social-badge-mark">${socialBadgeMark(item)}</span></span>
            <span class="mobile-social-label">${item.key}</span>
          </a>
        `).join('');
      }

      if (mobileDocsRequisites) {
        mobileDocsRequisites.innerHTML = `
          <article class="mobile-docs-card">
            <strong>ООО «ВОИП КОННЕКТ»</strong>
            <div>ИНН 7729713637</div>
            <div>РТО 025773</div>
            <div><a href="legal.html#education-license" target="_blank" rel="noopener noreferrer">Образовательная лицензия Л035-01298-77/01082973</a></div>
            <div><a href="mailto:hello@codims.ru">hello@codims.ru</a></div>
          </article>
        `;
      }

      if (mobileDocsAccordion) {
        mobileDocsAccordion.innerHTML = `
          <article class="mobile-docs-accordion-item ${state.mobileDocsExpanded ? 'open' : ''}">
            <button type="button" class="mobile-docs-toggle" data-action="mobile-docs-toggle">
              <span>Все документы и юридическая информация</span>
              <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
            </button>
            <div class="mobile-docs-links">
              <a href="https://www.codims.ru/privacy" target="_blank" rel="noopener noreferrer">Политика обработки персональных данных</a>
              <a href="legal.html#legal-info" target="_blank" rel="noopener noreferrer">Юридическая информация</a>
              <a href="legal.html#org-info" target="_blank" rel="noopener noreferrer">Сведения об организации</a>
              <a href="legal.html#children-rest" target="_blank" rel="noopener noreferrer">Отдых и оздоровление детей</a>
              <a href="legal.html#partners-info" target="_blank" rel="noopener noreferrer">Условия для партнёров</a>
              <a href="legal.html#bloggers-info" target="_blank" rel="noopener noreferrer">Сотрудничество с блогерами</a>
            </div>
          </article>
        `;
      }
    }

    function renderAll(){
      renderShiftCards();
      renderShiftOptions('desktop-shift-options');
      renderShiftOptions('mobileShiftOptions');
      renderBookingPanels();
      renderMediaSections();
      renderSummary();
    }

    function selectShift(id){
      const shift = shifts.find(s => s.id === id);
      clearShiftOptionPanels();
      patchState({
        shiftId: id,
        basePrice: shift.price,
        offerPrice: null,
        code: null,
        expiresAt: null,
        offerStage: 0
      });
      renderAll();
      persist();
    }

    function handlePrimaryCTA(){
      if(!hasSelectedAge()){
        showHint('Выберите возраст ребёнка', 'age');
        nudgeUserToNextStep('Сначала выберите возраст ребёнка');
        return;
      }

      if(!state.shiftId){
        showHint('Выберите подходящую смену', 'shift');
        nudgeUserToNextStep('Теперь выберите подходящую смену');
        return;
      }

      const action = getPrimaryActionState();
      if(action.disabled) return;

      if(state.offerStage === 0){
        track(isCurrentViewMobile() ? 'mobile_price_or_booking_started' : 'desktop_price_or_booking_started', {
          mode: getCurrentModeSummary(),
          age: state.age || '',
          shift_id: state.shiftId || ''
        });
        runOfferSearch();
        return;
      }

      openForm();
    }

    function runOfferSearch(){
      const shift = getSelectedShift();
      if(!shift){
        nudgeUserToNextStep('Сначала выберите смену — потом мы сможем показать цену и условия.');
        return;
      }

      const wrap = document.getElementById('offerOverlay');
      const card = document.getElementById('offerCard');
      offerRunId += 1;
      const currentRunId = offerRunId;
      patchState({offerSearching: true});
      clearOfferTimeout();
      track('offer_open', selectedShiftPayload());
      track('offer_start', selectedShiftPayload());
      wrap.classList.remove('hidden');

      card.innerHTML = `
        <div class="offer-headline">
          <h3>Ищем лучшую цену</h3>
          <button class="form-close offer-close-btn" type="button" data-action="close-offer" aria-label="Закрыть"><img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/close.svg" alt="" aria-hidden="true" /></button>
        </div>
        <p id="offerProgressLead">Проверяем остаток мест и доступные условия для выбранной смены.</p>
        <div class="offer-progress-track">
          <div class="offer-progress-fill" id="offerProgressFillLine"></div>
        </div>
        <div class="offer-progress-steps">
          <div class="offer-progress-step active" id="offerStepA">Проверяем смену</div>
          <div class="offer-progress-step" id="offerStepB">Сверяем цену</div>
          <div class="offer-progress-step" id="offerStepC">Генерируем код</div>
        </div>
      `;
      const fillEl = document.getElementById('offerProgressFillLine');
      const leadEl = document.getElementById('offerProgressLead');
      const stepA = document.getElementById('offerStepA');
      const stepB = document.getElementById('offerStepB');
      const stepC = document.getElementById('offerStepC');

      if(fillEl) fillEl.style.width = '18%';
      offerTimeoutIds.push(setTimeout(() => {
        if(currentRunId !== offerRunId) return;
        if(fillEl) fillEl.style.width = '44%';
        if(leadEl) leadEl.textContent = 'Сверяем цену и проверяем, можно ли зафиксировать условия.';
        stepA?.classList.remove('active');
        stepB?.classList.add('active');
      }, 1200));

      offerTimeoutIds.push(setTimeout(() => {
        if(currentRunId !== offerRunId) return;
        if(fillEl) fillEl.style.width = '76%';
        if(leadEl) leadEl.textContent = 'Готовим персональный код бронирования и закрепляем цену.';
        stepB?.classList.remove('active');
        stepC?.classList.add('active');
      }, 2500));

      offerTimeoutIds.push(setTimeout(() => {
        if(currentRunId !== offerRunId) return;
        if(fillEl) fillEl.style.width = '100%';
      }, 3300));

      offerTimeoutIds.push(setTimeout(() => {
        if(currentRunId !== offerRunId) return;
        clearOfferTimeout();
        showOffer();
      }, 3600));
    }

    function openOfferCheck(){
      runOfferSearch();
    }

    function showOffer(){
      const card = document.getElementById('offerCard');

      const selectedShift = getSelectedShift();
      const basePrice = state.basePrice || (selectedShift ? selectedShift.price : null);
      if(basePrice){
        patchState({
          offerPrice: Math.round(basePrice * OFFER_DISCOUNT_FACTOR),
          expiresAt: Date.now() + 72 * 60 * 60 * 1000,
          offerStage: 1
        });
      }

      patchState({
        code: generateCode(),
        offerSearching: false
      });
      persist();
      track('offer_complete', selectedShiftPayload());

      card.innerHTML = `
        <div class="offer-headline">
          <h3>Удалось закрепить цену</h3>
          <button class="form-close offer-close-btn" type="button" data-action="close-offer" aria-label="Закрыть"><img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-test-release/assets/icons/close.svg" alt="" aria-hidden="true" /></button>
        </div>
        <p>Ваша цена сохранится на ограниченное время, чтобы вы могли спокойно принять решение.</p>
        <div class="big-price">${formatPrice(state.offerPrice)}</div>
        <div class="summary-timer" id="offerTimer"></div>
        <div class="offer-code">Код бронирования: ${state.code}</div>

        <div class="overlay-actions">
          <button class="cta-main" id="offerApplyBtn" data-action="apply-offer" type="button">Закрепить по телефону</button>
          <button class="secondary-outline" id="offerCloseBtn" data-action="close-offer" type="button">Закрыть</button>
        </div>
      `;

      startTimer();
      renderSummary();
      renderBookingPanels();
    }

    function saveOfferAndClose(){
      syncGuidedState();
      clearOfferTimeout();
      document.getElementById('offerOverlay')?.classList.add('hidden');
      renderSummary();
      renderBookingPanels();
    }

    function resetOfferProgressUI(){
      clearOfferTimeout();
      patchState({offerSearching: false});
    }

    function startTimer(){
      if(timerId) clearInterval(timerId);

      timerId = setInterval(() => {
        if(!state.expiresAt) return;

        const diff = state.expiresAt - Date.now();
        const offerTimer = document.getElementById('offerTimer');
        const summaryTimer = document.getElementById('summaryTimer');

        if(diff <= 0){
          clearInterval(timerId);
          resetOfferState({preserveShift:true});
          persist();
          if(offerTimer) offerTimer.textContent = '';
          if(summaryTimer) summaryTimer.textContent = '';
          renderBookingPanels();
          return;
        }

        const text = formatRemaining(diff);

        if(offerTimer) offerTimer.textContent = text;
        if(summaryTimer) summaryTimer.textContent = text;
      }, 1000);
    }

    function renderSummary(){
      syncGuidedState();
      if(state.expiresAt && Date.now() >= state.expiresAt){
        resetOfferState({preserveShift:true});
        persist();
      }
      const bar = document.getElementById('summaryBar');
      if(!bar) return;

      if(!state.shiftId){
        bar.classList.add('hidden');
        document.body.classList.remove('summary-visible');
        renderBookingPanels();
        return;
      }

      const shift = shifts.find(s => s.id === state.shiftId);
      const price = state.offerPrice || state.basePrice || shift.price;

      const summaryMain = document.getElementById('summaryMain');
      const summaryMeta = document.getElementById('summaryMeta');
      const summaryPrice = document.getElementById('summaryPrice');
      if(summaryMain) summaryMain.textContent = `${labelAge(state.age)} · ${shift.title}`;
      if(summaryMeta) summaryMeta.textContent = `${shift.dates}${state.code ? ` · Код ${state.code}` : ''}`;
      if(summaryPrice) summaryPrice.textContent = formatPrice(price);

      bar.classList.remove('hidden');
      document.body.classList.add('summary-visible');
      renderBookingPanels();
    }

    function onlyDigits(value){
      return (value || '').replace(/\D/g, '');
    }

    function formatPhoneInput(value){
      let digits = onlyDigits(value);

      if(!digits) return '';

      if(digits[0] === '8') digits = '7' + digits.slice(1);
      if(digits[0] === '9') digits = '7' + digits;
      if(digits[0] !== '7') digits = '7' + digits;

      digits = digits.slice(0, 11);

      let out = '+7';
      if(digits.length > 1) out += ` (${digits.slice(1, 4)}`;
      if(digits.length >= 4) out += ')';
      if(digits.length > 4) out += ` ${digits.slice(4, 7)}`;
      if(digits.length > 7) out += `-${digits.slice(7, 9)}`;
      if(digits.length > 9) out += `-${digits.slice(9, 11)}`;

      return out;
    }

    function normalizePhone(value){
      let digits = onlyDigits(value);
      if(!digits) return '';

      if(digits[0] === '8') digits = '7' + digits.slice(1);
      if(digits[0] === '9') digits = '7' + digits;
      if(digits[0] !== '7') digits = '7' + digits;

      digits = digits.slice(0, 11);
      return digits.length === 11 ? `+${digits}` : '';
    }

    function isValidPhone(value){
      return !!normalizePhone(value);
    }

    function setPhoneError(show){
      const input = document.getElementById('parentPhone');
      const error = document.getElementById('phoneError');
      if(!input || !error) return;
      input.classList.toggle('input-error', !!show);
      error.classList.toggle('visible', !!show);
    }

    function setFormValidationHint(message){
      const hint = document.getElementById('formValidationHint');
      hint && (
        hint.textContent = message || 'Без предоплаты. Мы сначала подтверждаем бронь вручную.',
        hint.style.color = message && 'rgb(255 153 153)' || ''
      );
    }

    function setLeadSubmitState(loading){
      const btn = document.getElementById('submitLeadBtn');
      if(!btn) return;
      btn.disabled = !!loading;
      btn.textContent = loading ? 'Отправляем...' : 'Оформить и отправить заявку';
    }

    function openForm(){
      syncGuidedState();
      if(!state.shiftId) return;

      const shift = shifts.find(s => s.id === state.shiftId);
      const price = state.offerPrice || state.basePrice || shift.price;

      const formLead = document.getElementById('formLead');
      formLead && (formLead.textContent = `${shift.title} · ${shift.dates} · ${labelAge(state.age)} · ${formatPrice(price)}${state.code ? ` · Код ${state.code}` : ''}`);
      const phoneInput = document.getElementById('parentPhone');
      phoneInput && (phoneInput.value = formatPhoneInput(state.phone || ''));
      const bookingSummaryBox = document.getElementById('bookingSummaryBox');
      bookingSummaryBox && (bookingSummaryBox.innerHTML = buildBookingSummaryHtml());
      setPhoneError(false);
      setLeadSubmitState(false);
      setFormValidationHint('');
      track('form_open', selectedShiftPayload());
      document.getElementById('formDrawer')?.classList.remove('hidden');
    }

    function closeForm(){
      document.getElementById('formDrawer')?.classList.add('hidden');
    }

    function openSuccessModal(deliveryResult){
      const box = document.getElementById('successSummaryBox');
      box && (box.innerHTML = buildBookingSummaryHtml());
      const deliveryState = document.getElementById('successDeliveryState');
      if(deliveryState) deliveryState.textContent = deliveryResult && deliveryResult.ok === false
        ? 'Заявка сохранена локально, но сейчас нет связи с сервером отправки. Если мы не ответим в течение 15 минут, напишите нам в Telegram.'
        : '';
      if(deliveryState){
        deliveryState.classList.toggle('hidden', !(deliveryResult && deliveryResult.ok === false));
        deliveryState.classList.toggle('error', deliveryResult && deliveryResult.ok === false);
      }
      document.getElementById('successOverlay')?.classList.remove('hidden');
    }

    function closeSuccessModal(){
      document.getElementById('successOverlay')?.classList.add('hidden');
    }

    async function submitLead(){
      if(leadSubmitInProgress) return;
      syncGuidedState();
      const parentNameInput = document.getElementById('parentName');
      const consentInput = document.getElementById('consentCheck');
      const phoneInput = document.getElementById('parentPhone');
      const name = parentNameInput ? parentNameInput.value.trim() : '';
      const phoneRaw = phoneInput ? phoneInput.value.trim() : '';
      const phone = normalizePhone(phoneRaw);
      const consent = !!(consentInput && consentInput.checked);

      if(!name || !phoneRaw || !consent){
        if(!phoneRaw) setPhoneError(true);
        setFormValidationHint('Заполните имя, телефон и подтвердите согласие.');
        return;
      }

      if(!isValidPhone(phoneRaw)){
        setPhoneError(true);
        setFormValidationHint('Проверьте номер телефона.');
        return;
      }
      setFormValidationHint('');

      setPhoneError(false);
      leadSubmitInProgress = true;
      setLeadSubmitState(true);

      patchState({phone});
      persist();

      const shift = shifts.find(s => s.id === state.shiftId);
      const price = state.offerPrice || state.basePrice || (shift ? shift.price : null);
      const payload = {
        name,
        phone,
        age: labelAge(state.age),
        shift_id: shift ? shift.id : '',
        shift_name: shift ? shift.title : '',
        shift_date: shift ? shift.dates : '',
        price_final: price || null,
        price_text: price ? formatPrice(price) : '—',
        promo_code: state.code || '',
        promo_status: state.offerPrice ? 'fixed' : 'none',
        mode: getCurrentModeSummary(),
        sent_at_local: new Date().toLocaleString('ru-RU')
      };
      track('form_submit', {
        ...selectedShiftPayload(),
        booking_code: state.code || '',
        parent_name_present: !!name,
        phone_present: !!phone
      });
      try {
        const deliveryResult = await notifyLead('booking_submitted', payload);
        closeForm();
        openSuccessModal(deliveryResult);
      } finally {
        leadSubmitInProgress = false;
        setLeadSubmitState(false);
      }
    }

    function scrollToSection(id){
      const cleanId = normalizeSectionId(id);
      if(!cleanId) return false;

      const el = getSectionByTargetId(cleanId, getCurrentView());
      if(!el) return false;

      el.scrollIntoView({behavior:'smooth', block:'start'});
      return true;
    }

    function openSectionOrFallback(id){
      const cleanId = normalizeSectionId(id);
      if(!cleanId) return false;
      if(scrollToSection(cleanId)){
        return true;
      }
      return false;
    }

    function isNavigationDispatched(result){
      return !!result?.navigated;
    }

    function resolveSectionNavigationAction(sectionId){
      const cleanId = normalizeSectionId(sectionId);
      const profile = resolveNavigationProfile(cleanId);
      if(profile.mode === 'noop'){
        return profile;
      }

      const sectionPolicy = getSectionPolicy(cleanId);
      const action = {
        mode: profile.mode,
        sectionId: cleanId,
        requiresAge: !!sectionPolicy.requiresAge,
        fallbackPath: profile.fallbackPath,
        fallbackTarget: profile.fallbackTarget
      };
      return action;
    }

    function resolveAgeGate(action){
      if(!action?.requiresAge || !isCurrentViewMobile()){
        return { allowed: true, shouldReturn: false };
      }
      if(hasSelectedAge()){
        track('mobile_shifts_opened_after_age', {
          mode: getModeSummaryForView('mobile'),
          age: state.age || ''
        });
        return { allowed: true, shouldReturn: false };
      }
      track('mobile_shifts_click_without_age', {
        mode: getModeSummaryForView('mobile')
      });
      showHint('Сначала выберите возраст ребёнка', 'age');
      focusMobileAgeGate();
      return { allowed: false, shouldReturn: true };
    }

    function navigateToSection(id){
      const cleanId = normalizeSectionId(id);
      if(!cleanId) return;

      const navAction = resolveSectionNavigationAction(cleanId);
      const programsGuard = resolveAgeGate(navAction);
      if(!programsGuard.allowed){
        return;
      }

      const action = SECTION_NAVIGATION_ACTIONS[navAction.mode] || SECTION_NAVIGATION_ACTIONS.noop;
      const navResult = action(navAction);
      if(!isNavigationDispatched(navResult) && navAction.fallbackPath){
        window.open(navAction.fallbackPath, navAction.fallbackTarget || '_self', 'noopener');
      }
    }

    document.addEventListener('click', (e) => {
      const navEl = e.target.closest('[data-nav]');
      if(!navEl) return;

      e.preventDefault();
      const target = navEl.dataset.nav;
      if(!target) return;

      if(navEl.closest('#serviceMenu')){
        document.querySelectorAll('#serviceMenu [data-nav]').forEach(x => x.classList.remove('active'));
        navEl.classList.add('active');
      }

      navigateToSection(target);
    });

    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#section-"]');
      if(!anchor) return;
      const href = anchor.getAttribute('href');
      if(!href) return;
      e.preventDefault();
      navigateToSection(href);
    });

    const parentPhoneInput = document.getElementById('parentPhone');
    if(parentPhoneInput){
      parentPhoneInput.addEventListener('input', (e) => {
        e.target.value = formatPhoneInput(e.target.value);
        setPhoneError(false);
      });
      parentPhoneInput.addEventListener('blur', () => {
        const val = parentPhoneInput.value.trim();
        if(!val) return setPhoneError(false);
        setPhoneError(!isValidPhone(val));
      });
      parentPhoneInput.addEventListener('paste', () => {
        requestAnimationFrame(() => {
          parentPhoneInput.value = formatPhoneInput(parentPhoneInput.value);
          setPhoneError(false);
        });
      });
    }

    document.getElementById('formDrawer').addEventListener('click', (e) => {
      if(e.target.id === 'formDrawer') closeForm();
    });

    document.getElementById('successOverlay')?.addEventListener('click', (e) => {
      if(e.target.id === 'successOverlay') closeSuccessModal();
    });

    document.getElementById('offerOverlay')?.addEventListener('click', (e) => {
      if(e.target.id === 'offerOverlay'){
        offerRunId += 1;
        clearOfferTimeout();
        const offerOverlay = document.getElementById('offerOverlay');
        offerOverlay && offerOverlay.classList.add('hidden');
        resetOfferProgressUI();
      }
    });

    document.getElementById('mediaClose').addEventListener('click', closeMedia);
    document.getElementById('mediaNext').addEventListener('click', nextMedia);
    document.getElementById('mediaPrev').addEventListener('click', prevMedia);

    document.getElementById('mediaLightbox').addEventListener('click', (e) => {
      if(e.target.id === 'mediaLightbox') closeMedia();
    });

    document.getElementById('videoModal')?.addEventListener('click', (e) => {
      if(e.target.id === 'videoModal') closeVideo();
    });

    document.getElementById('calendarModal')?.addEventListener('click', (e) => {
      if(e.target.id === 'calendarModal') closeCalendar();
    });

    document.getElementById('sectionModal')?.addEventListener('click', (e) => {
      if(e.target.id === 'sectionModal') closeSectionModal();
    });

    document.addEventListener('keydown', (e) => {
      const mediaLightbox = document.getElementById('mediaLightbox');
      if(!mediaLightbox || mediaLightbox.classList.contains('hidden')) return;
      if(e.key === 'Escape') closeMedia();
      if(e.key === 'ArrowRight') nextMedia();
      if(e.key === 'ArrowLeft') prevMedia();
    });

    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('videoModal');
      if(!modal || modal.classList.contains('hidden')) return;
      if(e.key === 'Escape') closeVideo();
    });

    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('calendarModal');
      if(!modal || modal.classList.contains('hidden')) return;
      if(e.key === 'Escape') closeCalendar();
    });

    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('sectionModal');
      if(!modal || modal.classList.contains('hidden')) return;
      if(e.key === 'Escape') closeSectionModal();
    });

    window.addEventListener('resize', () => {
      if(heroResizeTimer){
        clearTimeout(heroResizeTimer);
      }
      heroResizeTimer = setTimeout(() => {
        initHero();
      }, 160);
    }, {passive:true});

    initHero();
    loadVideoMetaCache();

    renderShiftOptions('desktop-shift-options');
    renderShiftOptions('mobileShiftOptions');
    renderShiftCards();
    renderMediaSections();
    renderSummary();
    renderBookingPanels();
    resetOfferProgressUI();
    applyDebugUiState();
    track('page_view', {
      view: getCurrentView(),
      desktop_mode: getModeByView('desktop'),
      mobile_mode: getModeByView('mobile')
    });
    initScrollTracking();
    initSectionViewTracking();
    switchView(state.view);
    applyAllModeStates();
    refreshVideoMeta();
    scheduleVideoMetaRefresh();

    if(state.expiresAt && Date.now() < state.expiresAt){
      startTimer();
    }
  

