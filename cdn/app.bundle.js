(function(){
  if (typeof document === 'undefined') return;
  var id = 'ac-cdn-main-css';
  if (!document.getElementById(id)) {
    var style = document.createElement('style');
    style.id = id;
    style.textContent = ":root{\n      --bg:#eef1f6;\n      --panel:#f7f8fb;\n      --card:#ffffff;\n      --line:#d9dee8;\n      --text:#1e2430;\n      --muted:#6d7586;\n      --accent:#ff8a00;\n      --accent-2:#ff9f2f;\n      --accent-soft:#fff1df;\n      --shadow:0 18px 40px rgba(20,29,45,.08);\n      --z-base:1;\n      --z-hero:2;\n      --z-summary:40;\n      --z-overlay:100;\n      --z-debug:120;\n      --hero-min-height-desktop:584px;\n      --hero-overlap-bottom:-48px;\n      --hero-overlap-y:0px;\n      --hero-overlap-y-hover:0px;\n      --desktop-booking-height:620px;\n      --section-modal-compact-width:clamp(360px,42vw,620px);\n      --section-modal-compact-max-height:min(58vh,560px);\n      --video-card-gap:12px;\n      --team-carousel-card-min:260px;\n      --team-carousel-card-max:300px;\n      --close-btn-size:36px;\n    }\n\n    *{box-sizing:border-box}\n\n    html,\n    body{\n      margin:0;\n      padding:0;\n    }\n\n    body{\n      font-family:Inter,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;\n      background:var(--bg);\n      color:var(--text);\n      min-height:100vh;\n      -webkit-font-smoothing:antialiased;\n      -moz-osx-font-smoothing:grayscale;\n    }\n\n    .hidden{display:none !important}\n\n    .page{\n      max-width:1440px;\n      margin:0 auto;\n      padding:28px 24px 120px;\n    }\n\n    .debug-controls{\n      position:relative;\n      display:grid;\n      gap:8px;\n      margin-bottom:14px;\n      padding-right:40px;\n    }\n\n    .debug-controls-close{\n      position:absolute;\n      top:2px;\n      right:0;\n      width:34px;\n      height:34px;\n      border-radius:11px;\n      border:1px solid rgba(17,24,39,.16);\n      background:linear-gradient(180deg,#fff,#f4f7fb);\n      color:#111827;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .15s ease, box-shadow .15s ease;\n      z-index:4;\n    }\n\n    .debug-controls-close:hover{\n      transform:translateY(-1px);\n      box-shadow:0 12px 20px rgba(20,29,45,.12);\n    }\n\n    .debug-controls-close .ac-icon{\n      width:16px;\n      height:16px;\n      display:block;\n      object-fit:contain;\n    }\n\n    .mode-switch{\n      display:flex;\n      gap:8px;\n      padding:8px;\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:999px;\n      box-shadow:var(--shadow);\n    }\n\n    .mode-btn{\n      border:none;\n      border-radius:999px;\n      padding:10px 16px;\n      background:transparent;\n      color:var(--text);\n      font-weight:700;\n      font-size:14px;\n      cursor:pointer;\n    }\n\n    .mode-btn.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .mobile-mode-switch{\n      display:flex;\n      gap:6px;\n      align-items:center;\n    }\n\n    .mobile-mode-toggle{\n      appearance:none;\n      border:1px solid rgba(255,255,255,.14);\n      border-radius:999px;\n      min-height:34px;\n      padding:3px 10px 3px 6px;\n      background:rgba(255,255,255,.08);\n      color:rgba(255,255,255,.92);\n      display:inline-flex;\n      align-items:center;\n      gap:8px;\n      cursor:pointer;\n      transition:background .18s ease, border-color .18s ease, box-shadow .18s ease;\n    }\n\n    .mobile-mode-toggle:hover{\n      background:rgba(255,255,255,.12);\n      border-color:rgba(255,255,255,.24);\n    }\n\n    .mobile-mode-toggle-track{\n      width:38px;\n      height:22px;\n      border-radius:999px;\n      background:rgba(15,23,42,.7);\n      border:1px solid rgba(255,255,255,.18);\n      position:relative;\n      flex:0 0 auto;\n    }\n\n    .mobile-mode-toggle-thumb{\n      position:absolute;\n      top:2px;\n      left:2px;\n      width:16px;\n      height:16px;\n      border-radius:50%;\n      background:#fff;\n      box-shadow:0 2px 6px rgba(15,23,42,.3);\n      transition:transform .18s ease, background .18s ease;\n    }\n\n    .mobile-mode-toggle[aria-checked=\"true\"]{\n      background:rgba(255,138,0,.16);\n      border-color:rgba(255,166,74,.54);\n      box-shadow:0 10px 24px rgba(255,138,0,.2);\n    }\n\n    .mobile-mode-toggle[aria-checked=\"true\"] .mobile-mode-toggle-track{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      border-color:transparent;\n    }\n\n    .mobile-mode-toggle[aria-checked=\"true\"] .mobile-mode-toggle-thumb{\n      transform:translateX(16px);\n      background:#fff8ef;\n    }\n\n    .mobile-mode-toggle-label{\n      font-size:11px;\n      font-weight:800;\n      line-height:1;\n      white-space:nowrap;\n      letter-spacing:.01em;\n    }\n\n    .debug-tools{\n      display:flex;\n      justify-content:center;\n      align-items:center;\n      gap:10px;\n      flex-wrap:wrap;\n      margin:0;\n    }\n\n    .debug-reset-btn{\n      border:1px dashed #f2b275;\n      border-radius:999px;\n      padding:8px 14px;\n      background:#fff8ef;\n      color:#a24d00;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n    }\n\n    .debug-reset-btn:hover{\n      transform:translateY(-1px);\n      border-color:#e89c53;\n      box-shadow:0 10px 18px rgba(162,77,0,.10);\n    }\n\n    .screen{\n      border-radius:30px;\n      overflow:hidden;\n      background:var(--panel);\n      box-shadow:var(--shadow);\n      border:1px solid rgba(255,255,255,.7);\n      transition:box-shadow .2s ease;\n    }\n\n    .compact-mode .body-sections{\n      display:none !important;\n    }\n\n    .compact-mobile-hidden{\n      display:block;\n    }\n\n    .compact-mode .compact-mobile-hidden{\n      display:none;\n    }\n\n    .compact-mode .hero-shell{\n      min-height:460px;\n      margin-bottom:0;\n    }\n\n    .compact-mode .hero-shell,\n    .compact-mode .hero-bg,\n    .compact-mode .hero-shell::before,\n    .compact-mode .hero-shell::after{\n      border-radius:30px;\n    }\n\n    .compact-mode .screen{\n      overflow:visible;\n    }\n\n    .mobile-compact-mode .mobile-body-sections{\n      display:none !important;\n    }\n\n    /* compact trust panel removed: duplicated hero navigation / technical debt */\n\n    .compact-panel-photo-grid{\n      display:grid;\n      grid-template-columns:1fr 1fr;\n      gap:10px;\n    }\n\n    .compact-panel-photo{\n      border-radius:16px;\n      overflow:hidden;\n      border:1px solid var(--line);\n      background:#fff;\n      min-height:120px;\n    }\n\n    .compact-panel-photo img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n      aspect-ratio:4/3;\n    }\n\n    .compact-panel-video-list,\n    .compact-panel-review-list{\n      display:grid;\n      gap:10px;\n    }\n\n    .compact-panel-video-card,\n    .compact-panel-review-card{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:18px;\n      padding:14px;\n      box-shadow:var(--shadow);\n    }\n\n    .compact-panel-video-card h4,\n    .compact-panel-review-card strong{\n      display:block;\n      margin:0 0 8px;\n      font-size:14px;\n      line-height:1.4;\n    }\n\n    .compact-panel-video-card p,\n    .compact-panel-review-card span{\n      display:block;\n      margin:0 0 10px;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .compact-panel-link{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:40px;\n      padding:0 12px;\n      border-radius:12px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      text-decoration:none;\n      font-size:12px;\n      font-weight:800;\n    }\n\n    .hero-shell{\n      position:relative;\n      display:grid;\n      grid-template-columns:minmax(0, 1fr) 356px;\n      column-gap:24px;\n      align-items:start;\n      padding:20px 22px 20px;\n      min-height:var(--hero-min-height-desktop);\n      background:\n        linear-gradient(180deg, rgba(11,16,24,.20) 0%, rgba(11,16,24,.74) 100%),\n        radial-gradient(circle at 18% 18%, rgba(255,138,0,.18), transparent 28%),\n        radial-gradient(circle at 88% 12%, rgba(113,166,255,.16), transparent 26%),\n        linear-gradient(180deg, rgba(19,28,41,.10) 0%, rgba(19,28,41,.32) 62%, rgba(19,28,41,.58) 100%);\n      color:#fff;\n      overflow:visible;\n      z-index:3;\n      isolation:isolate;\n      border-radius:30px;\n      background-clip:padding-box;\n    }\n\n    .hero-bg{\n      position:absolute;\n      inset:0;\n      z-index:0;\n      background-size:cover;\n      background-position:center;\n      transition:opacity 1.15s ease-in-out;\n      transform:none;\n      opacity:0;\n      will-change:opacity;\n      border-radius:inherit;\n      pointer-events:none;\n      backface-visibility:hidden;\n    }\n\n    .hero-bg.hidden{\n      opacity:0;\n    }\n\n    .hero-bg.active{\n      opacity:1;\n      transform:none;\n    }\n\n    #desktopView .hero-bg.active{\n      transform:none;\n      animation:none;\n      will-change:opacity;\n    }\n\n    /* Keep rounded lower corners stable while animated background is transformed */\n    #desktopView:not(.compact-mode) .hero-bg,\n    #desktopView:not(.compact-mode) .hero-bg.active::after,\n    #desktopView:not(.compact-mode) .hero-shell::before,\n    #desktopView:not(.compact-mode) .hero-shell::after{\n      border-radius:inherit;\n    }\n\n    #desktopView .hero-bg.active::after{\n      content:\"\";\n      position:absolute;\n      inset:0;\n      border-radius:inherit;\n      pointer-events:none;\n      background:\n        radial-gradient(48% 36% at 16% 14%, rgba(14,34,22,.10) 0%, rgba(14,34,22,.05) 42%, rgba(14,34,22,0) 74%),\n        radial-gradient(42% 32% at 80% 12%, rgba(16,40,26,.08) 0%, rgba(16,40,26,.04) 44%, rgba(16,40,26,0) 76%);\n      opacity:.08;\n      animation:heroLeavesDrift 20s ease-in-out infinite;\n      will-change:transform, opacity;\n    }\n\n    #mobileView .hero-bg.active,\n    .mobile-hero .hero-bg.active{\n      animation:none;\n      transform:none;\n      will-change:auto;\n    }\n\n    .hero-shell::before{\n      content:\"\";\n      position:absolute;\n      inset:0;\n      pointer-events:none;\n      z-index:1;\n      border-radius:inherit;\n      background:\n        radial-gradient(58% 44% at 70% 30%, rgba(255,220,150,.10) 0%, rgba(255,220,150,.04) 42%, rgba(255,220,150,0) 76%),\n        radial-gradient(40% 32% at 88% 14%, rgba(255,214,142,.09) 0%, rgba(255,206,132,.04) 40%, rgba(255,188,116,0) 74%);\n      opacity:.08;\n      transform:translate3d(0, 0, 0);\n      animation:heroLightBreath 12s ease-in-out infinite;\n      will-change:transform, opacity;\n    }\n\n    .hero-shell::after{\n      content:\"\";\n      position:absolute;\n      inset:0;\n      background:\n        radial-gradient(128% 42% at 50% 100%, rgba(6,10,18,.46) 0%, rgba(6,10,18,.22) 44%, rgba(6,10,18,0) 78%),\n        radial-gradient(circle at 92% 14%, rgba(255,208,132,.34) 0%, rgba(255,188,104,.16) 16%, rgba(255,166,86,.08) 30%, rgba(255,150,72,0) 48%),\n        linear-gradient(90deg, rgba(8,12,18,.56) 0%, rgba(8,12,18,.42) 34%, rgba(8,12,18,.24) 64%, rgba(8,12,18,.10) 100%),\n        linear-gradient(180deg, rgba(8,12,18,.10) 0%, rgba(8,12,18,.30) 100%);\n      pointer-events:none;\n      z-index:2;\n      border-radius:inherit;\n    }\n\n    #desktopView.hero-contrast-before .hero-shell::after{\n      background:\n        radial-gradient(128% 42% at 50% 100%, rgba(6,10,18,.50) 0%, rgba(6,10,18,.24) 44%, rgba(6,10,18,0) 78%),\n        radial-gradient(circle at 92% 14%, rgba(255,208,132,.36) 0%, rgba(255,188,104,.20) 14%, rgba(255,166,86,.10) 26%, rgba(255,150,72,0) 44%),\n        linear-gradient(90deg, rgba(8,12,18,.84) 0%, rgba(8,12,18,.69) 34%, rgba(8,12,18,.42) 64%, rgba(8,12,18,.18) 100%),\n        linear-gradient(180deg, rgba(8,12,18,.16) 0%, rgba(8,12,18,.52) 100%);\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-shell::after{\n      background:\n        radial-gradient(128% 42% at 50% 100%, rgba(6,10,18,.40) 0%, rgba(6,10,18,.16) 44%, rgba(6,10,18,0) 78%),\n        radial-gradient(ellipse at 24% 60%, rgba(255, 230, 170, 0.10) 0%, rgba(255, 216, 146, 0.06) 28%, rgba(255, 198, 124, 0.025) 50%, rgba(255, 180, 104, 0) 75%),\n        radial-gradient(circle at 50% 36%, rgba(8, 12, 18, 0.03) 0%, rgba(8, 12, 18, 0) 64%),\n        linear-gradient(180deg, rgba(8,12,18,.06) 0%, rgba(8,12,18,.18) 100%);\n    }\n\n    /* Compact mode must keep the same hero background treatment as full mode. */\n\n    /* Debug microanimation toggle */\n    #desktopView.hero-micro-off .hero-bg.active,\n    #desktopView.hero-micro-off .hero-bg.active::after,\n    #desktopView.hero-micro-off .hero-shell::before{\n      animation:none !important;\n      transform:none !important;\n      opacity:.06 !important;\n    }\n\n    #desktopView.hero-micro-off .hero-bg.active::after{\n      opacity:0 !important;\n    }\n\n    #desktopView.hero-micro-on:not(.compact-mode) .hero-bg.active{\n      animation:heroBgMicroDrift 18s ease-in-out infinite !important;\n      will-change:transform;\n    }\n\n    #desktopView.hero-micro-on:not(.compact-mode) .hero-bg.active::after{\n      opacity:.08 !important;\n      animation:heroLeavesDrift 20s ease-in-out infinite !important;\n    }\n\n    #desktopView.hero-micro-on .hero-shell::before{\n      opacity:.08 !important;\n      animation:heroLightBreath 12s ease-in-out infinite !important;\n    }\n\n    #desktopView.hero-micro-demo:not(.compact-mode) .hero-bg.active{\n      animation:heroBgMicroDriftDemo 14s ease-in-out infinite !important;\n      will-change:transform;\n    }\n\n    #desktopView.hero-micro-demo:not(.compact-mode) .hero-bg.active::after{\n      opacity:.18 !important;\n      animation:heroLeavesDriftDemo 16s ease-in-out infinite !important;\n    }\n\n    #desktopView.hero-micro-demo .hero-shell::before{\n      opacity:.14 !important;\n      animation:heroLightBreathDemo 10s ease-in-out infinite !important;\n    }\n\n    #desktopView.hero-static-bg .hero-bg{\n      transition:none !important;\n    }\n\n    #desktopView.hero-static-bg #heroBg1{\n      opacity:1 !important;\n    }\n\n    #desktopView.hero-static-bg #heroBg2{\n      display:none !important;\n      opacity:0 !important;\n      background-image:none !important;\n    }\n\n    #mobileView .hero-shell::before,\n    .mobile-hero.hero-shell::before{\n      display:none;\n      animation:none;\n    }\n\n    @keyframes heroBgMicroDrift{\n      0%{\n        transform:translate3d(0, 0, 0);\n      }\n\n      50%{\n        transform:translate3d(0, 4px, 0);\n      }\n\n      100%{\n        transform:translate3d(0, 0, 0);\n      }\n    }\n\n    @keyframes heroLightBreath{\n      0%,\n      100%{\n        opacity:.08;\n        transform:translate3d(0, 0, 0) scale(1);\n      }\n\n      50%{\n        opacity:.12;\n        transform:translate3d(0, 0, 0) scale(1);\n      }\n    }\n\n    @keyframes heroLeavesDrift{\n      0%,\n      100%{\n        opacity:.08;\n        transform:translate3d(0, 0, 0) rotate(-0.2deg);\n      }\n\n      50%{\n        opacity:.12;\n        transform:translate3d(2px, 2px, 0) rotate(0.3deg);\n      }\n    }\n\n    @keyframes heroBgMicroDriftDemo{\n      0%{\n        transform:translate3d(0, 0, 0);\n      }\n\n      50%{\n        transform:translate3d(0, 10px, 0);\n      }\n\n      100%{\n        transform:translate3d(0, 0, 0);\n      }\n    }\n\n    @keyframes heroLightBreathDemo{\n      0%,\n      100%{\n        opacity:.10;\n        transform:translate3d(0, 0, 0) scale(1);\n      }\n\n      50%{\n        opacity:.20;\n        transform:translate3d(0, 0, 0) scale(1.035);\n      }\n    }\n\n    @keyframes heroLeavesDriftDemo{\n      0%,\n      100%{\n        opacity:.14;\n        transform:translate3d(0, 0, 0) rotate(-0.45deg);\n      }\n\n      50%{\n        opacity:.22;\n        transform:translate3d(5px, 4px, 0) rotate(0.85deg);\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce){\n      #desktopView .hero-bg.active,\n      #desktopView .hero-bg.active::after,\n      #desktopView .hero-shell::before{\n        animation:none !important;\n        transform:none !important;\n      }\n\n      #desktopView .hero-shell::before{\n        opacity:.08;\n      }\n    }\n\n    .hero-overlay{\n      z-index:1;\n      pointer-events:none;\n    }\n\n    .hero-overlay::before{\n      z-index:0;\n    }\n\n    .mobile-hero{\n      min-height:unset;\n      padding:18px 16px 20px;\n      border-radius:30px;\n    }\n\n    .hero-topbar{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:4px;\n      margin-bottom:12px;\n      position:relative;\n      z-index:6;\n      grid-column:1 / -1;\n      min-width:0;\n    }\n\n    .hero-left-tools{\n      display:flex;\n      align-items:flex-start;\n      gap:10px;\n      flex:1 1 auto;\n      min-width:0;\n    }\n\n    .hero-brand-meta{\n      display:grid;\n      gap:6px;\n      align-items:start;\n      min-width:0;\n    }\n\n    .hero-brand-label{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      text-align:center;\n      font-size:12px;\n      font-weight:700;\n      color:rgba(255,255,255,.86);\n      line-height:1.3;\n      letter-spacing:.01em;\n      text-shadow:0 1px 2px rgba(0,0,0,.24);\n    }\n\n    .hero-mode-inline{\n      display:inline-flex;\n      flex-direction:row-reverse;\n      align-items:center;\n      gap:0;\n      padding:0;\n      border-radius:0;\n      background:transparent;\n      border:none;\n      box-shadow:none;\n      backdrop-filter:none;\n      margin-left:-8px;\n    }\n\n    .hero-mode-inline .mode-btn{\n      min-height:32px;\n      min-width:112px;\n      padding:0 14px 0 36px;\n      font-size:10px;\n      border-radius:12px;\n      background:transparent;\n      color:rgba(255,255,255,.82);\n      border:1px solid rgba(255,255,255,.09);\n      box-shadow:none;\n      transition:background .18s ease, color .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;\n    }\n\n    .hero-mode-inline .mode-btn:hover{\n      background:rgba(255,255,255,.08);\n      color:rgba(255,255,255,.95);\n    }\n\n    .hero-mode-inline .mode-btn.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      border-color:rgba(255,255,255,.28);\n      box-shadow:0 10px 20px rgba(255,138,0,.24);\n      transform:none;\n    }\n\n    .hero-mode-inline .mode-toggle{\n      min-width:42px;\n      width:42px;\n      min-height:32px;\n      padding:0;\n      border-radius:999px;\n      border:none;\n      background:transparent;\n      position:relative;\n      transition:background .18s ease, border-color .18s ease, box-shadow .18s ease;\n      margin-right:-34px;\n      z-index:2;\n    }\n\n    .hero-mode-inline .mode-toggle .mode-toggle-thumb{\n      position:absolute;\n      top:3px;\n      left:4px;\n      width:26px;\n      height:26px;\n      border-radius:50%;\n      background:#fff;\n      box-shadow:0 3px 10px rgba(0,0,0,.24);\n      transition:transform .18s ease, background .18s ease;\n    }\n\n    .hero-mode-inline .mode-toggle.active{\n      background:transparent;\n      border-color:transparent;\n      box-shadow:none;\n    }\n\n    .hero-mode-inline .mode-toggle.active .mode-toggle-thumb{\n      transform:none;\n      background:#fff;\n    }\n\n    .hero-mode-inline .mode-toggle:not(.active) .mode-toggle-thumb{\n      transform:translateX(10px);\n      background:#f3f4f6;\n    }\n\n    .hero-mode-hashtag{\n      display:block;\n      margin-top:2px;\n      padding-left:6px;\n      font-size:12px;\n      font-weight:700;\n      letter-spacing:.01em;\n      line-height:1.25;\n      color:rgba(255,193,128,.92);\n      text-shadow:0 1px 2px rgba(0,0,0,.3);\n    }\n\n    .brand{\n      display:flex;\n      align-items:center;\n      gap:10px;\n      padding:10px 14px 10px 12px;\n      border-radius:999px;\n      background:#fff;\n      color:#111827;\n      font-weight:700;\n      font-size:14px;\n      box-shadow:0 10px 25px rgba(0,0,0,.08);\n      white-space:nowrap;\n    }\n\n    .desktop-brand-mark{\n      width:90px;\n      height:90px;\n      padding:0;\n      justify-content:center;\n      border-radius:0;\n      background:transparent;\n      border:none;\n      box-shadow:none;\n      color:#fff;\n      backdrop-filter:none;\n    }\n\n    .desktop-brand-mark .brand-logo img{\n      object-fit:contain;\n      filter:drop-shadow(0 2px 4px rgba(0,0,0,.28));\n    }\n\n    .brand-logo{\n      width:100%;\n      height:100%;\n      flex:0 0 auto;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n    }\n\n    .brand-logo svg,\n    .brand-logo img{\n      width:100%;\n      height:100%;\n      display:block;\n    }\n\n    .brand-dot{\n      width:10px;\n      height:10px;\n      border-radius:50%;\n      background:var(--accent);\n      flex:0 0 auto;\n    }\n\n    .hero-menu-wrap{\n      position:relative;\n      z-index:8;\n      margin-left:auto;\n      flex:0 0 auto;\n      align-self:flex-start;\n    }\n\n    .hero-menu-toggle{\n      min-height:38px;\n      min-width:108px;\n      padding:0 12px;\n      border-radius:12px;\n      border:1px solid rgba(255,255,255,.18);\n      background:rgba(8,12,18,.62);\n      color:#fff;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      gap:8px;\n      cursor:pointer;\n      font-size:12px;\n      font-weight:700;\n      box-shadow:0 8px 24px rgba(0,0,0,.18);\n      backdrop-filter:blur(12px);\n      transition:background .18s ease, border-color .18s ease, transform .18s ease;\n    }\n\n    .hero-menu-toggle:hover{\n      background:rgba(8,12,18,.74);\n      border-color:rgba(255,255,255,.3);\n      transform:translateY(-1px);\n    }\n\n    .hero-menu-toggle-icon{\n      position:relative;\n      width:14px;\n      height:10px;\n      flex:0 0 auto;\n      border-top:2px solid currentColor;\n      border-bottom:2px solid currentColor;\n    }\n\n    .hero-menu-toggle-icon-img{\n      display:none;\n      width:18px;\n      height:18px;\n      flex:0 0 auto;\n      object-fit:contain;\n    }\n\n    .hero-menu-toggle-icon::before{\n      content:\"\";\n      position:absolute;\n      left:0;\n      right:0;\n      top:3px;\n      border-top:2px solid currentColor;\n    }\n\n    .hero-menu-toggle-text{\n      display:inline;\n    }\n\n    .hero-menu{\n      position:absolute;\n      right:0;\n      top:calc(100% + 8px);\n      display:none;\n      gap:6px;\n      width:min(320px, calc(100vw - 28px));\n      padding:10px;\n      border-radius:14px;\n      background:rgba(10,15,24,.92);\n      border:1px solid rgba(255,255,255,.14);\n      box-shadow:0 20px 42px rgba(2,8,20,.45);\n      backdrop-filter:blur(12px);\n      z-index:9;\n    }\n\n    .hero-menu.is-open{\n      display:grid;\n      grid-template-columns:1fr;\n    }\n\n    .menu-pill{\n      width:100%;\n      text-align:left;\n      padding:10px 12px;\n      border-radius:10px;\n      background:rgba(255,255,255,.92);\n      color:#111827;\n      font-size:12px;\n      font-weight:600;\n      box-shadow:none;\n      cursor:pointer;\n      border:none;\n      transition:transform .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease;\n    }\n\n    .menu-pill.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .menu-pill:hover{\n      transform:translateY(-1px);\n      box-shadow:0 12px 24px rgba(20,29,45,.10);\n    }\n\n    #desktopView .hero-menu-toggle{\n      display:none;\n    }\n\n    #desktopView #serviceMenu{\n      position:static;\n      top:auto;\n      right:auto;\n      width:auto;\n      min-width:0;\n      display:flex !important;\n      flex-wrap:wrap;\n      justify-content:flex-end;\n      gap:8px;\n      padding:0;\n      border:none;\n      border-radius:0;\n      background:transparent;\n      box-shadow:none;\n      backdrop-filter:none;\n    }\n\n    #desktopView #serviceMenu[hidden]{\n      display:flex !important;\n    }\n\n    #desktopView .menu-pill{\n      width:auto;\n      text-align:center;\n      padding:8px 13px;\n      border-radius:11px;\n      border:none;\n      background:rgba(255,255,255,.92);\n      color:#111827;\n      font-size:13px;\n      font-weight:650;\n      box-shadow:0 8px 18px rgba(2,8,20,.14);\n    }\n\n    #desktopView .menu-pill:hover{\n      background:#ffffff;\n      color:#111827;\n      transform:translateY(-1px);\n      box-shadow:0 12px 22px rgba(2,8,20,.18);\n    }\n\n    #desktopView .menu-pill.active{\n      border-color:rgba(255,171,74,.52);\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      box-shadow:0 12px 28px rgba(255,138,0,.34);\n    }\n\n    #desktopView.mobile-preview-active .hero-menu-toggle{\n      display:inline-flex;\n    }\n\n    #desktopView.mobile-preview-active #serviceMenu{\n      position:fixed;\n      top:16px;\n      right:12px;\n      width:max-content;\n      min-width:max-content;\n      max-width:calc(100vw - 24px);\n      max-height:calc(100vh - 32px);\n      overflow-y:auto;\n      display:none !important;\n      grid-template-columns:1fr;\n      flex-wrap:nowrap;\n      justify-content:start;\n      justify-items:stretch;\n      gap:6px;\n      padding:10px;\n      border:1px solid rgba(255,255,255,.14);\n      border-radius:14px;\n      background:rgba(10,15,24,.92);\n      box-shadow:0 20px 42px rgba(2,8,20,.45);\n      backdrop-filter:blur(12px);\n      z-index:420;\n    }\n\n    #desktopView.mobile-preview-active .hero-menu-wrap{\n      z-index:421;\n    }\n\n    #desktopView.mobile-preview-active #serviceMenu.is-open{\n      display:grid !important;\n    }\n\n    #desktopView.mobile-preview-active #serviceMenu[hidden]{\n      display:none !important;\n    }\n\n    #desktopView.mobile-preview-active .menu-pill{\n      width:100%;\n      text-align:left;\n      padding:10px 12px;\n      border:none;\n      border-radius:10px;\n      background:rgba(255,255,255,.92);\n      color:#111827;\n      font-size:12px;\n      font-weight:600;\n      box-shadow:none;\n      white-space:nowrap;\n    }\n\n    .hero-content{\n      max-width:none;\n      width:auto;\n      position:relative;\n      z-index:6;\n      isolation:isolate;\n      padding-right:0;\n      padding-bottom:8px;\n      min-width:0;\n    }\n\n    #desktopView.hero-contrast-after .hero-content.full::before,\n    #desktopView:not(.hero-contrast-before) .hero-content.full::before{\n      content:\"\";\n      position:absolute;\n      left:-26px;\n      top:58px;\n      width:min(760px, 96%);\n      height:220px;\n      border-radius:38px;\n      background:\n        radial-gradient(ellipse at 28% 36%, rgba(10,15,25,.70) 0%, rgba(10,15,25,.54) 38%, rgba(10,15,25,.30) 62%, rgba(10,15,25,0) 100%);\n      pointer-events:none;\n      z-index:-1;\n      filter:blur(.2px);\n    }\n\n    #desktopView.hero-contrast-after .hero-content.full::after,\n    #desktopView:not(.hero-contrast-before) .hero-content.full::after{\n      content:\"\";\n      position:absolute;\n      left:-18px;\n      top:272px;\n      width:min(680px, 86%);\n      height:86px;\n      border-radius:34px;\n      background:radial-gradient(ellipse at 28% 46%, rgba(10,15,25,.56) 0%, rgba(10,15,25,.38) 54%, rgba(10,15,25,0) 100%);\n      pointer-events:none;\n      z-index:-1;\n    }\n\n    .hero-shell:not(.mobile-hero) .hero-content .hero-tag{\n      display:none;\n    }\n\n    .hero-tag{\n      display:inline-flex;\n      align-items:center;\n      gap:8px;\n      padding:10px 13px;\n      border-radius:999px;\n      background:rgba(255,255,255,.18);\n      border:1px solid rgba(255,255,255,.18);\n      font-size:12px;\n      margin-bottom:18px;\n      backdrop-filter:blur(8px);\n      box-shadow:inset 0 1px 0 rgba(255,255,255,.08);\n    }\n\n    .hero-title{\n      margin:0 0 12px;\n      font-size:38px;\n      font-weight:800;\n      line-height:1.08;\n      letter-spacing:-.03em;\n      max-width:820px;\n    }\n\n    .mobile-hero .hero-content h2{\n      font-size:28px;\n      line-height:1.1;\n      max-width:none;\n    }\n\n    .hero-sub{\n      color:rgba(255,255,255,.84);\n      font-size:17px;\n      line-height:1.5;\n      margin-bottom:20px;\n    }\n\n    .hero-mobile-age-cta{\n      display:none;\n      align-items:center;\n      justify-content:center;\n      gap:8px;\n      min-height:42px;\n      border-radius:12px;\n      border:1px solid rgba(255,138,0,.44);\n      background:linear-gradient(135deg, rgba(255,138,0,.94), rgba(255,177,70,.92));\n      color:#fff;\n      font-size:14px;\n      font-weight:800;\n      letter-spacing:-.01em;\n      padding:0 14px;\n      cursor:pointer;\n      box-shadow:0 10px 22px rgba(255,138,0,.26);\n      transition:transform .16s ease, box-shadow .16s ease, filter .16s ease;\n    }\n\n    .hero-mobile-age-cta:hover{\n      transform:translateY(-1px);\n      box-shadow:0 14px 24px rgba(255,138,0,.30);\n      filter:saturate(1.04);\n    }\n\n    .mobile-hero .hero-sub{\n      font-size:15px;\n      margin-bottom:16px;\n    }\n\n    .hero-slogan{\n      display:inline-block;\n      margin-top:12px;\n      font-size:14px;\n      font-weight:600;\n      color:#fff;\n      background:rgba(255,255,255,.12);\n      border:1px solid rgba(255,255,255,.18);\n      padding:6px 10px;\n      border-radius:999px;\n      backdrop-filter:blur(6px);\n    }\n\n    .hero-proofline{\n      display:flex;\n      flex-wrap:wrap;\n      gap:10px;\n      margin-top:16px;\n    }\n\n    .mobile-hero .hero-proofline{\n      gap:8px;\n      margin-top:14px;\n    }\n\n    .mobile-hero .hero-proofline span{\n      font-size:11px;\n      padding:7px 9px;\n    }\n\n    .hero-proofline span{\n      display:inline-flex;\n      align-items:center;\n      gap:6px;\n      padding:8px 10px;\n      border-radius:999px;\n      background:rgba(255,255,255,.12);\n      border:1px solid rgba(255,255,255,.12);\n      font-size:12px;\n      color:rgba(255,255,255,.9);\n      backdrop-filter:blur(8px);\n    }\n\n    .feature-row{\n      display:flex;\n      gap:10px;\n      flex-wrap:wrap;\n    }\n\n    .hero-benefits-grid{\n      margin-top:20px;\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      gap:18px 20px;\n      width:100%;\n      max-width:980px;\n      position:relative;\n      z-index:0;\n    }\n\n    #desktopView.hero-contrast-after .hero-benefits-grid::before,\n    #desktopView:not(.hero-contrast-before) .hero-benefits-grid::before{\n      content:\"\";\n      position:absolute;\n      left:-28px;\n      right:-18px;\n      top:-14px;\n      bottom:-16px;\n      border-radius:36px;\n      background:radial-gradient(ellipse at 22% 34%, rgba(10,15,25,.58) 0%, rgba(10,15,25,.40) 44%, rgba(10,15,25,.22) 66%, rgba(10,15,25,0) 100%);\n      pointer-events:none;\n      z-index:-1;\n    }\n\n    #desktopView.hero-contrast-before .hero-content.full::before,\n    #desktopView.hero-contrast-before .hero-content.full::after,\n    #desktopView.hero-contrast-before .hero-benefits-grid::before{\n      content:none;\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-content.full::before,\n    #desktopView.hero-contrast-after-soft .hero-content.full::after{\n      content:none;\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-shell::after{\n      background:\n        radial-gradient(circle at 92% 14%, rgba(255,208,132,.28) 0%, rgba(255,188,104,.12) 16%, rgba(255,166,86,.06) 30%, rgba(255,150,72,0) 48%),\n        linear-gradient(90deg, rgba(8,12,18,.44) 0%, rgba(8,12,18,.30) 34%, rgba(8,12,18,.16) 64%, rgba(8,12,18,.06) 100%),\n        linear-gradient(180deg, rgba(8,12,18,.06) 0%, rgba(8,12,18,.20) 100%);\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-bg{\n      filter:brightness(.95) contrast(1.08) saturate(1.02);\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-benefits-grid{\n      margin-top:30px;\n      gap:24px 28px;\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-benefits-grid::before{\n      content:none;\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-benefit-card{\n      position:relative;\n      z-index:1;\n      border:none;\n      background:transparent;\n      box-shadow:none;\n      padding:12px 6px 14px;\n      min-height:0;\n      gap:3px;\n      align-content:start;\n      border-radius:0;\n      backdrop-filter:none;\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-benefit-card::before{\n      content:\"\";\n      position:absolute;\n      inset:-12px -14px;\n      z-index:-1;\n      border-radius:22px;\n      background:radial-gradient(ellipse at 24% 52%, rgba(8,12,20,.42) 0%, rgba(8,12,20,.24) 52%, rgba(8,12,20,0) 100%);\n      filter:blur(10px);\n      pointer-events:none;\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-benefits-grid .hero-benefit-card:first-child{\n      min-height:0;\n      border:none;\n      box-shadow:none;\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-benefit-card strong{\n      text-shadow:0 2px 10px rgba(6,10,16,.92), 0 0 20px rgba(6,10,16,.56);\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-benefit-card span{\n      color:rgba(255,255,255,.88);\n      text-shadow:0 2px 10px rgba(6,10,16,.82), 0 0 16px rgba(6,10,16,.48);\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-title,\n    #desktopView.hero-contrast-after-soft .hero-sub,\n    #desktopView.hero-contrast-after-soft .hero-slogan{\n      position:relative;\n      z-index:1;\n    }\n\n    #desktopView.hero-contrast-after-soft .hero-title::before,\n    #desktopView.hero-contrast-after-soft .hero-sub::before,\n    #desktopView.hero-contrast-after-soft .hero-slogan::before{\n      content:\"\";\n      position:absolute;\n      inset:-18px -20px;\n      z-index:-1;\n      border-radius:24px;\n      background:radial-gradient(ellipse at 28% 48%, rgba(8,12,20,.46) 0%, rgba(8,12,20,.26) 52%, rgba(8,12,20,0) 100%);\n      filter:blur(12px);\n      pointer-events:none;\n    }\n\n    .hero-benefit-card{\n      border:1px solid rgba(255,255,255,.16);\n      background:linear-gradient(135deg, rgba(8,12,18,.48), rgba(8,12,18,.34));\n      border-radius:20px;\n      padding:18px 20px;\n      box-shadow:0 18px 34px rgba(0,0,0,.20);\n      backdrop-filter:blur(8px);\n      min-height:96px;\n      display:grid;\n      gap:4px;\n      align-content:start;\n    }\n\n    .hero-benefits-grid .hero-benefit-card:first-child{\n      min-height:108px;\n      border-color:rgba(255,159,47,.34);\n      box-shadow:0 22px 36px rgba(255,138,0,.14);\n    }\n\n    .hero-benefit-card strong{\n      display:block;\n      color:#fff;\n      font-size:20px;\n      line-height:1.15;\n      letter-spacing:-.01em;\n      margin:0;\n    }\n\n    .hero-benefit-card strong.hero-benefit-tight{\n      white-space: nowrap;\n    }\n\n    .hero-benefit-card strong.hero-benefit-tight + span{\n      margin-top:-2px;\n    }\n\n    .hero-benefit-card span{\n      display:block;\n      color:rgba(255,255,255,.78);\n      font-size:16px;\n      line-height:1.28;\n      margin:0;\n    }\n\n    .hero-shell:not(.mobile-hero) .feature-row{\n      margin-top:10px;\n      justify-content:center;\n    }\n\n    .hero-shell:not(.mobile-hero) .hero-proofline{\n      justify-content:center;\n    }\n\n    .feature-pill{\n      padding:11px 13px;\n      border-radius:16px;\n      background:rgba(0,0,0,.22);\n      border:1px solid rgba(255,255,255,.14);\n      font-size:12px;\n      min-width:132px;\n      backdrop-filter:blur(10px);\n      transition:transform .18s ease, border-color .18s ease, background .18s ease;\n    }\n\n    .feature-pill:hover{\n      transform:translateY(-1px);\n      border-color:rgba(255,255,255,.22);\n      background:rgba(0,0,0,.26);\n    }\n\n    .feature-pill strong{\n      display:block;\n      font-size:12px;\n      margin-bottom:3px;\n    }\n\n    .occupancy-badge{\n      display:inline-flex;\n      align-items:center;\n      gap:7px;\n      margin-top:18px;\n      margin-bottom:20px;\n      padding:11px 13px;\n      border-radius:999px;\n      background:rgba(255,138,0,.18);\n      border:1px solid rgba(255,138,0,.34);\n      color:#fff3e0;\n      font-size:12px;\n      font-weight:700;\n    }\n\n    .hero-shell:not(.mobile-hero) .occupancy-badge{\n      margin-bottom:10px;\n    }\n\n    .hero-booking-card{\n      position:relative;\n      right:auto;\n      top:auto;\n      width:100%;\n      max-width:356px;\n      margin-left:auto;\n      margin-top:0;\n      margin-bottom:var(--hero-overlap-bottom);\n      padding:20px;\n      border-radius:26px;\n      background:rgba(12,17,24,.76);\n      border:1px solid rgba(255,255,255,.10);\n      -webkit-backdrop-filter:blur(18px);\n      backdrop-filter:blur(18px);\n      isolation:isolate;\n      background-clip:padding-box;\n      overflow:hidden;\n      clip-path:inset(0 round 26px);\n      box-shadow:\n        0 24px 70px rgba(0,0,0,.34),\n        0 20px 30px -18px rgba(76,255,184,.34);\n      color:#fff;\n      transition:transform .2s ease, box-shadow .2s ease;\n      z-index:3;\n      box-sizing:border-box;\n      contain:paint;\n      will-change:transform;\n      transform:translateY(var(--hero-overlap-y));\n    }\n\n    .hero-booking-card::after{\n      content:\"\";\n      position:absolute;\n      left:12px;\n      right:12px;\n      bottom:0;\n      height:52px;\n      border-radius:0 0 20px 20px;\n      background:none;\n      pointer-events:none;\n      z-index:0;\n      opacity:0;\n    }\n\n    .hero-booking-card > *{\n      position:relative;\n      z-index:1;\n    }\n\n    .hero-booking-card:hover{\n      transform:translateY(var(--hero-overlap-y-hover));\n      box-shadow:0 28px 76px rgba(0,0,0,.36);\n    }\n\n    #desktop-booking-card{\n      height:var(--desktop-booking-height);\n      min-height:var(--desktop-booking-height);\n      max-height:var(--desktop-booking-height);\n      display:flex;\n      flex-direction:column;\n      overflow:hidden;\n    }\n\n    #desktop-booking-card .booking-step-2{\n      display:flex;\n      flex-direction:column;\n      min-height:0;\n    }\n\n    #desktop-booking-card .shift-list{\n      max-height:none;\n      overflow:visible;\n      padding-right:0;\n    }\n\n    #desktop-booking-card .shift-list::-webkit-scrollbar{\n      width:6px;\n    }\n\n    #desktop-booking-card .shift-list::-webkit-scrollbar-thumb{\n      border-radius:999px;\n      background:rgba(255,255,255,.22);\n    }\n\n    #desktop-booking-card .booking-step-3{\n      margin-top:12px;\n    }\n\n    .hero-booking-card,\n    .mobile-booking-card,\n    .booking-price-box,\n    .shift-option,\n    .feature-pill,\n    .section-card{\n      box-sizing:border-box;\n      max-width:100%;\n    }\n\n    .hero-shell,\n    .page,\n    .body-sections,\n    .mobile-body-sections{\n      overflow-x:clip;\n    }\n\n    .mobile-booking-card{\n      position:static !important;\n      width:100% !important;\n      max-width:100% !important;\n      margin-top:18px;\n      padding:18px;\n      border-radius:24px;\n      background:rgba(12,17,24,.78);\n      border:1px solid rgba(255,255,255,.10);\n      backdrop-filter:blur(18px);\n      box-shadow:0 22px 60px rgba(0,0,0,.30);\n    }\n\n    .mobile-booking-card .guided-inline-hint{\n      background:rgba(255,255,255,.06);\n      border-color:rgba(255,255,255,.08);\n    }\n\n    #desktopView.mobile-preview-active .body-sections{\n      gap:12px !important;\n      padding:14px !important;\n      width:100%;\n      max-width:100%;\n      box-sizing:border-box;\n      overflow-x:hidden;\n    }\n\n    #desktopView.mobile-preview-active .body-sections > .section-card{\n      padding:12px;\n      border-radius:16px;\n      width:100%;\n      max-width:100%;\n      margin:0;\n      box-sizing:border-box;\n      overflow:hidden;\n    }\n\n    #desktopView.mobile-preview-active .body-sections > .section-card > h3{\n      margin:0 0 6px;\n      font-size:18px;\n      letter-spacing:-.02em;\n      line-height:1.1;\n    }\n\n    #desktopView.mobile-preview-active .body-sections > .section-card > .section-lead{\n      margin:0 0 8px;\n      color:#5b6474;\n      font-size:12px;\n      line-height:1.42;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    .section-card.mobile-template#section-about .section-lead{\n      margin-bottom:8px;\n      font-size:13px;\n      line-height:1.46;\n      color:#5b6474;\n    }\n\n    .mobile-about-features{\n      display:grid;\n      gap:2px;\n      margin-top:8px;\n    }\n\n    .mobile-about-feature-item{\n      position:relative;\n      border:none;\n      border-bottom:1px solid rgba(208,217,230,.7);\n      border-radius:0;\n      background:transparent;\n      box-shadow:none;\n      padding:9px 2px 10px 13px;\n      display:grid;\n      gap:3px;\n      overflow:hidden;\n    }\n\n    .mobile-about-feature-item:last-child{\n      border-bottom:none;\n      padding-bottom:6px;\n    }\n\n    .mobile-about-feature-item::before{\n      content:\"\";\n      position:absolute;\n      left:0;\n      top:9px;\n      bottom:10px;\n      width:2px;\n      border-radius:99px;\n      background:linear-gradient(180deg,var(--accent),var(--accent-2));\n      opacity:.78;\n    }\n\n    .mobile-about-feature-item small{\n      color:#8a97ab;\n      font-size:10px;\n      font-weight:800;\n      text-transform:uppercase;\n      letter-spacing:.08em;\n      line-height:1.2;\n      margin-left:5px;\n    }\n\n    .mobile-about-feature-item strong{\n      color:#111827;\n      font-size:15px;\n      line-height:1.26;\n      letter-spacing:-.01em;\n      margin-left:5px;\n    }\n\n    .mobile-about-feature-item p{\n      margin:0 0 0 5px;\n      color:#556274;\n      font-size:12px;\n      line-height:1.42;\n    }\n\n    .mobile-journey-flow{\n      margin-top:8px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-journey-active{\n      border:1px solid var(--line);\n      border-radius:13px;\n      background:linear-gradient(150deg, #fff, #f8fbff);\n      box-shadow:0 8px 18px rgba(15,23,42,.08);\n      padding:11px 12px;\n      display:grid;\n      gap:5px;\n      min-height:132px;\n      contain:layout paint;\n    }\n\n    .mobile-journey-active-heading{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      min-width:0;\n    }\n\n    .mobile-journey-active-index{\n      width:26px;\n      height:26px;\n      border-radius:999px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:12px;\n      font-weight:900;\n    }\n\n    .mobile-journey-active strong{\n      font-size:15px;\n      line-height:1.28;\n      color:#111827;\n    }\n\n    .mobile-journey-active p{\n      margin:0;\n      color:#5b6474;\n      font-size:12px;\n      line-height:1.42;\n    }\n\n    .mobile-journey-switcher{\n      display:flex;\n      gap:6px;\n      overflow-x:auto;\n      padding-bottom:2px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-journey-switcher::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-journey-switch{\n      border:1px solid var(--line);\n      border-radius:999px;\n      min-height:46px;\n      padding:7px 10px 7px 8px;\n      background:#fff;\n      color:#253247;\n      text-align:left;\n      font-size:11px;\n      font-weight:700;\n      line-height:1.2;\n      cursor:pointer;\n      display:inline-grid;\n      grid-template-columns:16px minmax(0,1fr);\n      column-gap:6px;\n      align-items:center;\n      box-shadow:0 4px 10px rgba(15,23,42,.06);\n      white-space:normal;\n      width:138px;\n      flex:0 0 auto;\n    }\n\n    .mobile-journey-switch span{\n      width:16px;\n      height:16px;\n      border-radius:999px;\n      background:#edf2f8;\n      color:#374151;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:9px;\n      font-weight:900;\n    }\n\n    .mobile-journey-switch.active{\n      border-color:transparent;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .mobile-journey-switch.active span{\n      background:rgba(255,255,255,.22);\n      color:#fff;\n    }\n\n    .mobile-programs-flow{\n      margin-top:8px;\n      display:grid;\n      gap:6px;\n    }\n\n    .mobile-program-selector{\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-program-selector::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-program-chip{\n      border:none;\n      border-radius:999px;\n      min-height:32px;\n      padding:0 12px;\n      white-space:nowrap;\n      background:#eef3f9;\n      color:#162235;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n    }\n\n    .mobile-program-chip.active{\n      color:#fff;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 8px 16px rgba(255,138,0,.24);\n    }\n\n    .mobile-program-chip.short{\n      background:#edf7f0;\n      color:#1f6d45;\n      border:1px solid rgba(61,224,151,.38);\n    }\n\n    .mobile-program-active-card{\n      border:1px solid var(--line);\n      border-radius:16px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:10px;\n      display:grid;\n      gap:6px;\n    }\n\n    .mobile-program-active-card strong{\n      color:#111827;\n      font-size:15px;\n      line-height:1.35;\n    }\n\n    .mobile-program-dates{\n      color:#475569;\n      font-size:12px;\n      line-height:1.35;\n      margin-top:-2px;\n    }\n\n    .mobile-program-dates .mobile-program-dates-sub{\n      display:block;\n      margin-top:2px;\n      font-size:11px;\n      line-height:1.3;\n      color:#6f7d93;\n      font-weight:700;\n    }\n\n    .mobile-program-price{\n      color:#111827;\n      font-size:24px;\n      font-weight:900;\n      letter-spacing:-.02em;\n    }\n\n    .mobile-program-meta{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n    }\n\n    .mobile-program-meta span{\n      min-height:24px;\n      padding:0 10px;\n      border-radius:999px;\n      display:inline-flex;\n      align-items:center;\n      background:#eff3f9;\n      color:#334155;\n      font-size:11px;\n      font-weight:700;\n    }\n\n    .mobile-program-short-badge{\n      background:#e9f8ef !important;\n      color:#1f6d45 !important;\n      border:1px solid rgba(61,224,151,.42);\n    }\n\n    .mobile-program-active-card p{\n      margin:0;\n      color:#5b6474;\n      font-size:13px;\n      line-height:1.5;\n      display:-webkit-box;\n      -webkit-box-orient:vertical;\n      -webkit-line-clamp:3;\n      overflow:hidden;\n    }\n\n    .mobile-program-hint{\n      color:#74839a;\n      font-size:11px;\n      line-height:1.35;\n      margin-top:-1px;\n    }\n\n    .mobile-program-short-note{\n      margin:0;\n      color:#5f6f87;\n      font-size:11px;\n      line-height:1.35;\n      font-weight:600;\n    }\n\n    .mobile-program-dots{\n      display:flex;\n      justify-content:center;\n      gap:7px;\n      margin-top:6px;\n    }\n\n    .mobile-program-dot{\n      width:9px;\n      height:9px;\n      border-radius:999px;\n      border:none;\n      padding:0;\n      background:#cfd8e5;\n      cursor:pointer;\n      flex:0 0 auto;\n    }\n\n    .mobile-program-dot.active{\n      background:var(--accent);\n      transform:scale(1.18);\n    }\n\n    .mobile-body-sections > .section-card{\n      padding:12px;\n    }\n\n    .mobile-media-stage{\n      margin-top:10px;\n      border-radius:16px;\n      overflow:hidden;\n      background:#0f172a;\n      position:relative;\n      height:180px;\n      min-height:180px;\n      max-height:180px;\n    }\n\n    .mobile-media-stage img{\n      width:100%;\n      height:100%;\n      min-height:0;\n      max-height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-video-stage{\n      aspect-ratio:9 / 16;\n      height:auto;\n      min-height:0;\n      max-height:none;\n      width:min(72vw, 236px);\n      max-width:100%;\n      margin:10px auto 0;\n      border-radius:14px;\n      border:1px solid rgba(255,255,255,.08);\n      box-shadow:0 10px 20px rgba(15,23,42,.18);\n      position:relative;\n      overflow:hidden;\n      background:#0b1220;\n    }\n\n    .mobile-video-stage .mobile-media-overlay{\n      padding:10px 11px;\n    }\n\n    .mobile-video-stage .mobile-media-overlay strong{\n      font-size:13px;\n      line-height:1.3;\n    }\n\n    .mobile-video-stage .mobile-media-overlay span{\n      font-size:11px;\n      line-height:1.3;\n    }\n\n    .mobile-video-preview-strip{\n      margin-top:8px;\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-video-preview-strip::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-video-preview-thumb{\n      border:none;\n      background:transparent;\n      padding:0;\n      min-width:68px;\n      width:68px;\n      height:112px;\n      border-radius:10px;\n      overflow:hidden;\n      position:relative;\n      cursor:pointer;\n      opacity:.78;\n      box-shadow:0 4px 10px rgba(15,23,42,.10);\n      flex:0 0 auto;\n      transition:opacity .16s ease, transform .16s ease, box-shadow .16s ease;\n    }\n\n    .mobile-video-preview-thumb img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-video-preview-thumb.active{\n      opacity:1;\n      transform:translateY(-1px);\n      box-shadow:0 8px 16px rgba(15,23,42,.20);\n    }\n\n    .mobile-media-filter-row{\n      margin-top:8px;\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-media-filter-row::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-media-filter{\n      border:none;\n      border-radius:999px;\n      min-height:30px;\n      padding:0 12px;\n      white-space:nowrap;\n      background:#eef3f9;\n      color:#162235;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      flex:0 0 auto;\n    }\n\n    .mobile-media-filter.active{\n      color:#fff;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 8px 16px rgba(255,138,0,.22);\n    }\n\n    .mobile-photo-stage{\n      height:196px;\n      min-height:196px;\n      max-height:196px;\n      border-radius:14px;\n      border:1px solid rgba(255,255,255,.08);\n      box-shadow:0 10px 20px rgba(15,23,42,.18);\n      overflow:hidden;\n    }\n\n    .mobile-photo-preview-strip{\n      margin-top:8px;\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-photo-preview-strip::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-photo-preview-thumb{\n      border:none;\n      background:transparent;\n      padding:0;\n      min-width:84px;\n      width:84px;\n      height:56px;\n      border-radius:10px;\n      overflow:hidden;\n      position:relative;\n      cursor:pointer;\n      opacity:.78;\n      box-shadow:0 4px 10px rgba(15,23,42,.10);\n      flex:0 0 auto;\n      transition:opacity .16s ease, transform .16s ease, box-shadow .16s ease;\n    }\n\n    .mobile-photo-preview-thumb img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-photo-preview-thumb.active{\n      opacity:1;\n      transform:translateY(-1px);\n      box-shadow:0 8px 16px rgba(15,23,42,.20);\n    }\n\n    .mobile-photo-more{\n      margin-top:10px;\n      display:flex;\n      justify-content:center;\n    }\n\n    .mobile-photo-more-btn{\n      min-height:32px;\n      padding:0 12px;\n      border-radius:999px;\n      border:1px solid #d8e2ef;\n      background:#f8fbff;\n      color:#253247;\n      text-decoration:none;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      font-size:12px;\n      font-weight:800;\n      line-height:1;\n    }\n\n    .mobile-media-stage button{\n      appearance:none;\n      border:none;\n      width:100%;\n      padding:0;\n      background:transparent;\n      cursor:pointer;\n      text-align:left;\n    }\n\n    .mobile-media-strip{\n      margin-top:8px;\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-media-strip::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-media-thumb{\n      border:none;\n      background:transparent;\n      padding:0;\n      min-width:72px;\n      width:72px;\n      height:56px;\n      border-radius:10px;\n      overflow:hidden;\n      position:relative;\n      cursor:pointer;\n      opacity:.8;\n      transition:opacity .18s ease, transform .18s ease;\n    }\n\n    .mobile-media-thumb img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-media-thumb.active{\n      opacity:1;\n      transform:translateY(-1px);\n      box-shadow:0 8px 14px rgba(15,23,42,.2);\n    }\n\n    .mobile-review-social-proof{\n      margin-top:10px;\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-review-main{\n      margin-top:10px;\n    }\n\n    .mobile-review-top{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      flex-wrap:nowrap;\n      min-width:0;\n    }\n\n    .mobile-review-scoreline{\n      display:flex;\n      align-items:center;\n      gap:6px;\n      flex:0 0 auto;\n      min-width:0;\n      white-space:nowrap;\n    }\n\n    .mobile-review-top strong{\n      font-size:30px;\n      line-height:1;\n      color:#d97706;\n      letter-spacing:-.02em;\n    }\n\n    .mobile-review-stars{\n      color:#f59e0b;\n      font-size:13px;\n      font-weight:800;\n      letter-spacing:.4px;\n      margin-left:0;\n      white-space:nowrap;\n    }\n\n    .mobile-review-top .inline-link-btn.primary{\n      min-height:30px;\n      padding:0 10px;\n      font-size:11px;\n      white-space:nowrap;\n      flex:0 0 auto;\n    }\n\n    .mobile-review-main-nav{\n      margin-top:8px;\n      display:none;\n      justify-content:space-between;\n      gap:8px;\n    }\n\n    .mobile-review-nav-btn{\n      min-height:30px;\n      border:none;\n      border-radius:999px;\n      padding:0 12px;\n      background:#eef3f9;\n      color:#1f2937;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n    }\n\n    .mobile-review-proof{\n      font-size:13px;\n      line-height:1.44;\n      color:#111827;\n      font-weight:700;\n    }\n\n    .mobile-review-trust-note{\n      margin:0;\n      color:#5b6474;\n      font-size:12px;\n      line-height:1.4;\n    }\n\n    .mobile-review-card{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:12px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-review-head{\n      display:grid;\n      grid-template-columns:44px 1fr;\n      gap:10px;\n      align-items:center;\n    }\n\n    .mobile-review-head img{\n      width:44px;\n      height:44px;\n      border-radius:50%;\n      object-fit:cover;\n      border:1px solid var(--line);\n    }\n\n    .mobile-review-head strong{\n      font-size:14px;\n      line-height:1.2;\n      color:#111827;\n      display:block;\n    }\n\n    .mobile-review-head span{\n      font-size:12px;\n      line-height:1.3;\n      color:var(--muted);\n      display:block;\n      margin-top:2px;\n    }\n\n    .mobile-review-text{\n      color:#1f2937;\n      font-size:13px;\n      line-height:1.5;\n      display:-webkit-box;\n      -webkit-line-clamp:5;\n      -webkit-box-orient:vertical;\n      overflow:hidden;\n    }\n\n    .mobile-review-dots{\n      margin-top:10px;\n      display:flex;\n      gap:6px;\n      justify-content:center;\n    }\n\n    .mobile-review-dot{\n      width:10px;\n      height:10px;\n      border-radius:999px;\n      border:none;\n      background:#cbd5e1;\n      cursor:pointer;\n      padding:0;\n      flex:0 0 auto;\n    }\n\n    .mobile-review-dot.active{\n      background:var(--accent);\n      transform:scale(1.2);\n    }\n\n    .mobile-review-more{\n      margin-top:10px;\n      display:flex;\n      justify-content:center;\n    }\n\n    .mobile-review-more-btn{\n      min-height:32px;\n      padding:0 12px;\n      border-radius:999px;\n      border:1px solid #d8e2ef;\n      background:#f8fbff;\n      color:#253247;\n      text-decoration:none;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      font-size:12px;\n      font-weight:800;\n      line-height:1;\n    }\n\n    .mobile-faq-accordion{\n      display:grid;\n      gap:8px;\n      margin-top:10px;\n    }\n\n    .mobile-faq-filter-row{\n      margin-top:8px;\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-faq-filter-row::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-faq-filter-chip{\n      border:none;\n      border-radius:999px;\n      min-height:30px;\n      padding:0 12px;\n      white-space:nowrap;\n      background:#eef3f9;\n      color:#162235;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      flex:0 0 auto;\n    }\n\n    .mobile-faq-filter-chip.active{\n      color:#fff;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 8px 16px rgba(255,138,0,.22);\n    }\n\n    .mobile-faq-item{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      overflow:hidden;\n    }\n\n    .mobile-faq-question{\n      width:100%;\n      border:none;\n      background:transparent;\n      min-height:48px;\n      padding:12px;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      cursor:pointer;\n      text-align:left;\n    }\n\n    .mobile-faq-question span{\n      color:#111827;\n      font-size:14px;\n      font-weight:700;\n      line-height:1.34;\n    }\n\n    .mobile-faq-question .ac-icon{\n      width:14px;\n      height:14px;\n      opacity:.68;\n      transform:rotate(90deg);\n      transition:transform .18s ease;\n    }\n\n    .mobile-faq-item.open .mobile-faq-question .ac-icon{\n      transform:rotate(-90deg);\n    }\n\n    .mobile-faq-answer{\n      display:none;\n      padding:0 12px 12px;\n      color:#374151;\n      font-size:13px;\n      line-height:1.52;\n    }\n\n    .mobile-faq-item.open .mobile-faq-answer{\n      display:block;\n    }\n\n    .mobile-contact-grid{\n      margin-top:10px;\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      gap:8px;\n      align-items:stretch;\n    }\n\n    .mobile-map-open-btn{\n      min-height:0;\n      padding:0;\n      border-radius:0;\n      display:inline-flex;\n      align-items:center;\n      justify-content:flex-start;\n      font-size:12px;\n      font-weight:800;\n      color:#d66a00;\n      background:transparent;\n      width:auto;\n      border:none;\n      text-decoration:underline;\n      text-underline-offset:2px;\n    }\n\n    .mobile-map-preview-card{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:10px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-map-preview{\n      border-radius:10px;\n      overflow:hidden;\n      border:1px solid rgba(203,213,225,.9);\n      height:108px;\n      background:#dbe4f4;\n    }\n\n    .mobile-map-preview iframe{\n      width:100%;\n      height:100%;\n      border:0;\n      display:block;\n    }\n\n    .mobile-map-preview-card strong{\n      margin:0;\n      font-size:13px;\n      line-height:1.35;\n      color:#111827;\n    }\n\n    .mobile-map-preview-card span{\n      margin:0;\n      font-size:12px;\n      line-height:1.4;\n      color:#5b6474;\n    }\n\n    .mobile-map-inline-link{\n      color:#d66a00;\n      font-weight:800;\n      text-decoration:underline;\n      text-underline-offset:2px;\n      white-space:nowrap;\n    }\n\n    .section-card.mobile-template#section-contacts .mobile-socials-row{\n      margin-top:8px;\n      display:flex;\n      flex-wrap:wrap;\n      gap:6px;\n    }\n\n    .section-card.mobile-template#section-contacts .mobile-social-link{\n      min-height:30px;\n      min-width:30px;\n      width:30px;\n      padding:0;\n      border-radius:999px;\n      justify-content:center;\n      box-shadow:none;\n      background:#f8fafc;\n      border:1px solid #d7e0ec;\n    }\n\n    .section-card.mobile-template#section-contacts .mobile-social-label{\n      display:none;\n    }\n\n    .mobile-docs-accordion{\n      margin-top:8px;\n    }\n\n    #mobileDocsRequisites:empty{\n      display:none;\n    }\n\n    .mobile-docs-accordion-item{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      overflow:hidden;\n    }\n\n    .mobile-docs-toggle{\n      width:100%;\n      border:none;\n      background:transparent;\n      min-height:46px;\n      padding:10px 12px;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      text-align:left;\n      cursor:pointer;\n    }\n\n    .mobile-docs-toggle-copy{\n      display:grid;\n      gap:2px;\n      min-width:0;\n    }\n\n    .mobile-docs-toggle-main{\n      font-size:14px;\n      font-weight:700;\n      line-height:1.2;\n      color:#0f172a;\n      white-space:nowrap;\n      overflow:hidden;\n      text-overflow:ellipsis;\n    }\n\n    .mobile-docs-toggle-meta{\n      font-size:12px;\n      line-height:1.25;\n      color:#64748b;\n      white-space:nowrap;\n      overflow:hidden;\n      text-overflow:ellipsis;\n    }\n\n    .mobile-docs-toggle .ac-icon{\n      width:16px;\n      height:16px;\n      transition:transform .2s ease;\n      flex:0 0 auto;\n    }\n\n    .mobile-docs-links{\n      display:none;\n      padding:0 12px 12px;\n      gap:8px;\n      grid-template-columns:1fr;\n    }\n\n    .mobile-docs-accordion-item.open .mobile-docs-links{\n      display:grid;\n    }\n\n    .mobile-docs-accordion-item.open .mobile-docs-toggle .ac-icon{\n      transform:rotate(90deg);\n    }\n\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline{\n      display:block;\n      padding:16px;\n      border:1px solid #d3d9e6;\n      border-radius:18px;\n      background:#fff;\n      box-shadow:0 10px 26px rgba(15,23,42,.08);\n    }\n\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline .mobile-docs-shell{\n      display:grid;\n      gap:10px;\n    }\n\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline h4{\n      display:none !important;\n    }\n\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline > div{\n      all:unset;\n      display:block;\n    }\n\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline a,\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline div,\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline span,\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline strong{\n      line-height:1.4;\n      font-size:13px;\n      color:#111827;\n      text-decoration:none;\n    }\n\n    #desktopView.mobile-preview-active #section-legal.mobile-docs-inline .mobile-docs-links a{\n      color:#475569;\n    }\n\n    /* Mobile preview mode uses desktop section IDs with mobile templates/classes. */\n    #desktopView.mobile-preview-active .section-card.mobile-template{\n      padding:14px;\n      border-radius:20px;\n      max-width:100%;\n      box-sizing:border-box;\n      overflow:hidden;\n    }\n\n    #desktopView.mobile-preview-active .section-card.mobile-template *{\n      max-width:100%;\n      box-sizing:border-box;\n      min-width:0;\n      overflow-wrap:anywhere;\n    }\n\n    .booking-step-block{\n      display:grid;\n      gap:8px;\n    }\n\n    .booking-step-block + .booking-step-block{\n      margin-top:12px;\n    }\n\n    /* Prevent first-paint flicker before JS applies the current booking stage. */\n    #desktop-booking-card:not(.booking-stage-1):not(.booking-stage-2):not(.booking-stage-3):not(.booking-stage-4) .booking-step-2,\n    #desktop-booking-card:not(.booking-stage-1):not(.booking-stage-2):not(.booking-stage-3):not(.booking-stage-4) .booking-step-3,\n    #mobileBookingCard:not(.booking-stage-1):not(.booking-stage-2):not(.booking-stage-3):not(.booking-stage-4) .booking-step-2,\n    #mobileBookingCard:not(.booking-stage-1):not(.booking-stage-2):not(.booking-stage-3):not(.booking-stage-4) .booking-step-3{\n      display:none;\n    }\n\n    #desktop-booking-card.booking-stage-2 .booking-step-block + .booking-step-block{\n      margin-top:6px;\n    }\n\n    .booking-step-3.is-force-hidden{\n      display:none !important;\n    }\n\n    .booking-stage-1 #desktop-booking-info,\n    .booking-stage-1 #mobile-booking-info{\n      display:none;\n    }\n\n    .booking-stage-1 .booking-step-2 .guided-callout,\n    .booking-stage-1 .booking-step-2 .guided-inline-hint,\n    .booking-stage-1 .booking-step-2 .shift-calendar-discovery,\n    .booking-stage-1 .booking-step-2 .selected-shift-chip,\n    .booking-stage-1 .booking-step-2 .shift-list,\n    .booking-stage-1 .booking-step-3,\n    .booking-stage-2 .booking-step-3{\n      display:none;\n    }\n\n    .booking-stage-1 .booking-step-2{\n      display:none;\n    }\n\n    .booking-stage-3 .booking-step-2,\n    .booking-stage-4 .booking-step-2{\n      display:none;\n    }\n\n    .booking-stage-3 .booking-hint,\n    .booking-stage-4 .booking-hint{\n      display:none !important;\n    }\n\n    .selected-shift-chip{\n      display:none;\n      align-items:center;\n      gap:8px;\n      margin:0 0 8px;\n      padding:10px 12px;\n      border-radius:14px;\n      background:rgba(255,255,255,.10);\n      border:1px solid rgba(255,255,255,.12);\n      color:#fff;\n      font-size:12px;\n      font-weight:800;\n      width:max-content;\n      max-width:100%;\n    }\n\n    .selected-shift-chip.visible{\n      display:inline-flex;\n    }\n\n    .selected-shift-chip button{\n      border:none;\n      width:22px;\n      height:22px;\n      border-radius:8px;\n      background:rgba(255,255,255,.12);\n      color:#fff;\n      font-size:13px;\n      font-weight:900;\n      cursor:pointer;\n      flex:0 0 auto;\n    }\n\n    .shift-list.collapsed{\n      display:none;\n    }\n\n    .mobile-booking-card h3{\n      font-size:20px;\n      margin:0 0 8px;\n    }\n\n    .mobile-booking-card p{\n      font-size:13px;\n      line-height:1.5;\n      margin:0 0 14px;\n    }\n\n    .hero-booking-card h3{\n      margin:0 0 8px;\n      font-size:21px;\n      letter-spacing:-.02em;\n    }\n\n    .hero-booking-card p{\n      margin:0 0 14px;\n      color:rgba(255,255,255,.72);\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    #desktop-booking-card #desktopBookingLead:empty,\n    .mobile-booking-card #mobileBookingLead:empty{\n      display:none;\n      margin:0;\n    }\n\n    .booking-steps{\n      display:grid;\n      grid-template-columns:repeat(4,minmax(0,1fr));\n      gap:0;\n      margin-bottom:16px;\n    }\n\n    .booking-summary-chips{\n      display:none;\n      flex-wrap:wrap;\n      gap:8px;\n      margin:0 0 10px;\n    }\n\n    .booking-summary-chips.visible{\n      display:flex;\n    }\n\n    .booking-summary-chips .selected-age-chip,\n    .booking-summary-chips .selected-shift-chip{\n      margin:0;\n    }\n\n    .booking-step{\n      position:relative;\n      padding:40px 2px 0;\n      text-align:center;\n      font-size:11px;\n      line-height:1.2;\n      font-weight:800;\n      background:transparent;\n      color:rgb(255 255 255 / 72%);\n      border:none;\n      transition:color .18s ease;\n    }\n\n    .booking-step::before{\n      content:attr(data-step);\n      position:absolute;\n      top:0;\n      left:50%;\n      transform:translateX(-50%);\n      width:34px;\n      height:34px;\n      border-radius:999px;\n      border:2px solid rgb(255 255 255 / 28%);\n      background:rgb(255 255 255 / 7%);\n      color:rgb(255 255 255 / 76%);\n      display:grid;\n      place-items:center;\n      font-size:19px;\n      font-weight:900;\n      line-height:1;\n      box-sizing:border-box;\n      transition:all .18s ease;\n    }\n\n    .booking-step::after{\n      content:'';\n      position:absolute;\n      top:16px;\n      left:calc(50% + 21px);\n      right:calc(-50% + 21px);\n      height:2px;\n      border-radius:999px;\n      background:rgb(255 255 255 / 22%);\n      transition:background .18s ease;\n    }\n\n    .booking-step:last-child::after{\n      display:none;\n    }\n\n    .booking-step.active{\n      color:#fff;\n    }\n\n    .booking-all-shifts-link{\n      width:100%;\n      min-height:32px;\n      margin-top:10px;\n      padding:8px 12px;\n      border-radius:10px;\n      border:1px solid rgba(255,255,255,.18);\n      background:#0b1119;\n      color:#ffffff;\n      font-size:14px;\n      font-weight:700;\n      line-height:1.2;\n      display:none;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      transition:background .18s ease, border-color .18s ease, transform .18s ease;\n    }\n\n    .booking-all-shifts-link:hover{\n      background:#131c29;\n      border-color:rgba(255,255,255,.28);\n      transform:translateY(-1px);\n    }\n\n    .booking-all-shifts-link:active{\n      transform:translateY(0);\n    }\n\n    .booking-step.active::before{\n      border-color:transparent;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      box-shadow:0 10px 20px rgb(255 138 0 / 34%);\n    }\n\n    .booking-step.done{\n      color:#fff;\n    }\n\n    .booking-step.done::before{\n      content:'✓';\n      border-color:rgb(255 255 255 / 30%);\n      background:rgb(255 255 255 / 14%);\n      color:#fff;\n    }\n\n    .booking-step.done::after{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n    }\n\n    .mobile-booking-card .booking-step{\n      padding-top:34px;\n      font-size:11px;\n    }\n\n    .mobile-booking-card .booking-step::before{\n      width:28px;\n      height:28px;\n      font-size:13px;\n      top:0;\n    }\n\n    .mobile-booking-card .booking-step::after{\n      top:13px;\n      left:calc(50% + 18px);\n      right:calc(-50% + 18px);\n    }\n\n    .booking-step.pulse::before{\n      box-shadow:0 0 0 4px rgb(255 138 0 / 18%);\n      animation:step-pulse 1.6s ease-in-out infinite;\n    }\n\n    .age-tabs{\n      display:flex;\n      gap:10px;\n      margin-bottom:8px;\n    }\n\n    #desktop-booking-card .booking-step-1{\n      display:flex;\n      flex-direction:column;\n      flex:1;\n      min-height:0;\n    }\n\n    #desktop-booking-card .booking-step-1 .age-tabs{\n      margin-bottom:0;\n      flex:1;\n      min-height:0;\n      align-items:stretch;\n    }\n\n    #desktop-booking-card .booking-step-1 .age-tab{\n      height:100%;\n      min-height:0;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tabs{\n      display:flex;\n      flex-direction:column;\n      gap:14px;\n      align-items:stretch;\n      margin-top:0;\n      position:relative;\n    }\n\n    #desktop-booking-card.booking-stage-1 #desktopBookingTitle,\n    #desktop-booking-card.booking-stage-1 #desktopBookingLead{\n      display:none;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab{\n      min-height:124px;\n      height:124px;\n      padding:18px 20px;\n      border-radius:18px;\n      border:1px solid var(--age-border, rgb(255 164 66 / 54%));\n      display:grid;\n      grid-template-columns:minmax(0, 1fr);\n      align-items:start;\n      gap:6px;\n      text-align:initial;\n      background:var(--age-bg, linear-gradient(135deg, rgb(255 255 255 / 10%), rgb(14 23 39 / 82%)));\n      box-shadow:none;\n      transition:transform .16s ease, border-color .16s ease, background .16s ease;\n      position:relative;\n      overflow:hidden;\n      box-sizing:border-box;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab::before{\n      display:none;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab::after{\n      display:none;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-range{\n      margin:0;\n      font-size:15px;\n      font-weight:500;\n      letter-spacing:-.01em;\n      line-height:1.2;\n      color:rgb(255 255 255 / 88%);\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-main{\n      display:grid;\n      grid-template-rows:auto auto 1fr;\n      gap:7px;\n      min-width:0;\n      height:100%;\n      align-content:start;\n      padding:0;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-head{\n      display:grid;\n      gap:5px;\n      min-width:0;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-track{\n      margin:0;\n      font-size:clamp(20px, 1.32vw, 22px);\n      font-weight:700;\n      line-height:1.14;\n      letter-spacing:-.01em;\n      color:rgb(255 255 255 / 97%);\n      display:-webkit-box;\n      -webkit-box-orient:vertical;\n      -webkit-line-clamp:2;\n      overflow:hidden;\n      text-overflow:ellipsis;\n      min-width:0;\n      overflow-wrap:anywhere;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-anchor{\n      font-size:15px;\n      font-weight:600;\n      line-height:1.32;\n      color:rgb(255 255 255 / 91%);\n      white-space:normal;\n      padding-left:0;\n      overflow-wrap:anywhere;\n      min-width:0;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-bullets{\n      display:flex;\n      flex-wrap:wrap;\n      gap:4px 10px;\n      margin-top:auto;\n      font-size:14px;\n      line-height:1.35;\n      color:rgb(255 255 255 / 76%);\n      min-height:0;\n      min-width:0;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-bullets span{\n      display:block;\n      padding-left:0;\n      white-space:normal;\n      overflow-wrap:anywhere;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-bullets span::before{\n      display:none;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-foot{\n      display:none;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab:hover{\n      transform:translateY(-2px);\n      border-color:var(--age-border-hover, rgb(255 188 108 / 72%));\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab.active{\n      border-color:var(--age-border-active, var(--age-border, rgb(255 164 66 / 62%)));\n      background:var(--age-bg-active, var(--age-bg));\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab[data-track=\"track-1\"]{\n      --age-border:rgb(255 168 84 / 54%);\n      --age-border-hover:rgb(255 188 118 / 68%);\n      --age-border-active:rgb(255 201 132 / 78%);\n      --age-bg:linear-gradient(135deg, rgb(255 176 82 / 22%), rgb(15 24 40 / 84%));\n      --age-bg-active:linear-gradient(135deg, rgb(255 188 98 / 26%), rgb(16 26 43 / 86%));\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab[data-track=\"track-2\"]{\n      --age-border:rgb(116 160 255 / 50%);\n      --age-border-hover:rgb(139 177 255 / 66%);\n      --age-border-active:rgb(162 194 255 / 76%);\n      --age-bg:linear-gradient(135deg, rgb(95 138 239 / 22%), rgb(14 23 39 / 84%));\n      --age-bg-active:linear-gradient(135deg, rgb(108 153 255 / 26%), rgb(15 24 42 / 86%));\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab[data-track=\"track-3\"]{\n      --age-border:rgb(170 134 255 / 50%);\n      --age-border-hover:rgb(188 156 255 / 64%);\n      --age-border-active:rgb(203 176 255 / 74%);\n      --age-bg:linear-gradient(135deg, rgb(129 95 224 / 24%), rgb(14 23 39 / 84%));\n      --age-bg-active:linear-gradient(135deg, rgb(143 108 239 / 28%), rgb(15 24 42 / 86%));\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tap-hint{\n      position:absolute;\n      top:0;\n      left:0;\n      width:56px;\n      height:72px;\n      z-index:28;\n      opacity:0;\n      pointer-events:none;\n      user-select:none;\n      transform:translate3d(var(--age-hint-x, 8px), var(--age-hint-y, 8px), 0);\n      transition:transform 1.08s cubic-bezier(.22,.68,.2,1), opacity .24s ease;\n      filter:drop-shadow(0 7px 14px rgba(8,18,32,.42));\n      color:rgb(255 160 58 / 98%);\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tap-hint.is-visible{\n      opacity:.96;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tap-hint .age-tap-finger{\n      position:absolute;\n      right:0;\n      bottom:0;\n      width:56px;\n      height:72px;\n      background:currentColor;\n      -webkit-mask:url(\"https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/click-2383.svg\") center / contain no-repeat;\n      mask:url(\"https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/click-2383.svg\") center / contain no-repeat;\n      transform-origin:34% 10%;\n      filter:drop-shadow(0 0 10px rgba(255,154,55,.32));\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tap-hint.is-tapping .age-tap-finger{\n      animation:desktop-age-hint-finger .64s ease-out;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tap-hint .age-tap-ripple{\n      position:absolute;\n      left:14px;\n      top:4px;\n      width:20px;\n      height:20px;\n      border-radius:999px;\n      background:radial-gradient(circle, rgba(255,176,96,.72) 0%, rgba(255,150,52,.42) 48%, rgba(255,147,45,0) 100%);\n      box-shadow:0 0 0 1px rgba(255,185,122,.18);\n      filter:blur(.4px);\n      opacity:0;\n      transform:translateZ(0) scale(.3);\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tap-hint.is-tapping .age-tap-ripple{\n      animation:desktop-age-hint-ripple .96s ease-out;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tap-hint.is-tapping .age-tap-ripple.delay{\n      animation-delay:.16s;\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab.is-hint-target{\n      transform:translateY(-2px);\n      border-color:var(--age-border-hover, rgb(255 188 108 / 72%));\n    }\n\n    #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab.is-hint-tapping{\n      animation:desktop-age-card-hint .64s ease-out;\n    }\n\n    @keyframes desktop-age-card-hint{\n      0%{\n        transform:translateY(-2px);\n      }\n      38%{\n        transform:translateY(-3px);\n      }\n      72%{\n        transform:translateY(-1px);\n      }\n      100%{\n        transform:translateY(-2px);\n      }\n    }\n\n    @keyframes desktop-age-hint-finger{\n      0%{\n        transform:translateY(0) scale(1);\n      }\n      45%{\n        transform:translateY(2px) scale(.92);\n      }\n      100%{\n        transform:translateY(0) scale(1);\n      }\n    }\n\n    @keyframes desktop-age-hint-ripple{\n      0%{\n        opacity:.82;\n        transform:scale(.2);\n      }\n      62%{\n        opacity:.24;\n      }\n      100%{\n        opacity:0;\n        transform:scale(2.7);\n      }\n    }\n\n    @media (max-width: 1240px){\n      #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab{\n        min-height:118px;\n        height:118px;\n        padding:16px 18px;\n      }\n\n      #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-track{\n        font-size:18px;\n      }\n\n      #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-anchor{\n        font-size:14px;\n      }\n\n      #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-bullets{\n        font-size:13px;\n      }\n\n    }\n\n    @media (prefers-reduced-motion: reduce){\n      #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tap-hint{\n        display:none !important;\n      }\n    }\n\n    .guided-label{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      margin:0 0 8px;\n      font-size:12px;\n      font-weight:800;\n      color:rgb(255 255 255 / 86%);\n      letter-spacing:.02em;\n    }\n\n    .guided-dot{\n      width:8px;\n      height:8px;\n      border-radius:50%;\n      background:var(--accent-2);\n      flex:0 0 auto;\n      box-shadow:0 0 0 4px rgb(255 159 47 / 12%);\n    }\n\n    .guided-callout{\n      margin:0 0 12px;\n      padding:11px 12px;\n      border-radius:14px;\n      background:rgb(255 255 255 / 8%);\n      border:1px solid rgb(255 255 255 / 10%);\n      color:rgb(255 255 255 / 78%);\n      font-size:12px;\n      line-height:1.5;\n    }\n\n    .guided-inline-hint{\n      display:none;\n      margin:10px 0 0;\n      padding:10px 12px;\n      border-radius:12px;\n      background:rgb(255 255 255 / 8%);\n      border:1px solid rgb(255 255 255 / 10%);\n      color:rgb(255 255 255 / 82%);\n      font-size:12px;\n      line-height:1.5;\n      opacity:0%;\n      transform:translateY(-4px);\n      pointer-events:none;\n      transition:opacity .2s ease, transform .2s ease;\n      min-height:0;\n    }\n\n    .guided-inline-hint:empty{\n      display:none !important;\n    }\n\n    .guided-inline-hint.visible{\n      display:block;\n      opacity:100%;\n      transform:translateY(0);\n    }\n\n    .guided-pulse{\n      animation:guided-pulse 1.2s ease 2;\n    }\n\n    @keyframes guided-pulse{\n      0%{ box-shadow:0 0 0 0 rgb(255 138 0 / 0%); }\n\n      35%{ box-shadow:0 0 0 8px rgb(255 138 0 / 12%); }\n\n      100%{ box-shadow:0 0 0 0 rgb(255 138 0 / 0%); }\n    }\n\n    .section-card h3 + p.section-lead{\n      margin:0 0 12px;\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n    }\n\n    .selected-age-chip{\n      display:none;\n      align-items:center;\n      gap:10px;\n      margin:0 0 12px;\n      padding:10px 12px;\n      border-radius:14px;\n      background:rgb(255 255 255 / 10%);\n      border:1px solid rgb(255 255 255 / 12%);\n      color:#fff;\n      font-size:12px;\n      font-weight:800;\n      width:max-content;\n      max-width:100%;\n    }\n\n    .selected-age-chip.visible{\n      display:inline-flex;\n    }\n\n    .selected-age-chip button{\n      border:none;\n      width:24px;\n      height:24px;\n      border-radius:8px;\n      background:rgb(255 255 255 / 12%);\n      color:#fff;\n      font-size:14px;\n      font-weight:900;\n      cursor:pointer;\n      flex:0 0 auto;\n    }\n\n    .mobile-booking-card .booking-step-1{\n      display:flex;\n      flex-wrap:wrap;\n      gap:8px;\n      align-items:center;\n    }\n\n    .mobile-booking-card .booking-step-1 .age-tabs{\n      width:100%;\n      margin-bottom:0;\n    }\n\n    .mobile-booking-card.has-mobile-summary-chips .booking-step-1 .selected-age-chip,\n    .mobile-booking-card.has-mobile-summary-chips .booking-step-1 .selected-shift-chip{\n      margin:0;\n      width:auto;\n      max-width:calc(50% - 4px);\n      min-width:0;\n      padding:8px 10px;\n      border-radius:12px;\n      font-size:11px;\n      white-space:nowrap;\n      overflow:hidden;\n      text-overflow:ellipsis;\n    }\n\n    .age-tabs.hidden{\n      display:none !important;\n    }\n\n    .age-tab{\n      flex:1;\n      border:none;\n      border-radius:14px;\n      padding:13px 10px;\n      min-height:48px;\n      background:rgb(255 255 255 / 10%);\n      color:#fff;\n      font-size:13px;\n      font-weight:800;\n      cursor:pointer;\n      transition:transform .15s ease, background .15s ease, box-shadow .15s ease;\n    }\n\n    .age-tab.active{\n      background:linear-gradient(135deg, var(--accent), var(--accent-2));\n      box-shadow:0 8px 18px rgb(255 138 0 / 18%);\n    }\n\n    .age-tab:hover{\n      transform:translateY(-1px);\n    }\n\n    .shift-option{\n      border-radius:16px;\n      background:#fff;\n      color:#111827;\n      padding:13px 14px;\n      margin-bottom:10px;\n      display:grid;\n      gap:10px;\n      font-size:13px;\n      cursor:pointer;\n      border:1px solid transparent;\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .shift-option-head{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:10px;\n    }\n\n    .shift-option-head small{\n      margin:0;\n      text-align:right;\n      color:#6f7788;\n      font-weight:600;\n      display:grid;\n      justify-items:end;\n      gap:2px;\n      min-width:128px;\n      flex:0 0 128px;\n      line-height:1.25;\n    }\n\n    .shift-option-head .shift-option-price,\n    .shift-option-head .shift-option-seats{\n      display:block;\n      white-space:nowrap;\n    }\n\n    .shift-option-head .shift-option-price{\n      color:#5f6779;\n      font-weight:800;\n    }\n\n    .shift-option-head .shift-option-seats{\n      color:#6f7788;\n      font-weight:700;\n    }\n\n    .shift-option-tagline{\n      margin:0;\n      font-size:13px;\n      line-height:1.4;\n      color:#4b5563;\n      font-weight:700;\n    }\n\n    .shift-option-actions{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n    }\n\n    .shift-option-select-indicator{\n      margin-left:auto;\n      width:34px;\n      height:34px;\n      border-radius:999px;\n      border:1px solid #d8deea;\n      background:linear-gradient(135deg,#fff,#f4f7fc);\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      box-shadow:0 0 0 0 rgb(255 138 0 / 0%);\n      transition:transform .18s ease, border-color .18s ease, box-shadow .18s ease;\n      animation:shift-indicator-glow 1.9s ease-in-out infinite;\n      flex:0 0 auto;\n    }\n\n    .shift-option-select-indicator:hover{\n      transform:translateX(1px);\n      border-color:#ffb76b;\n    }\n\n    .shift-option-select-indicator .ac-icon{\n      width:14px;\n      height:14px;\n      opacity:.85;\n    }\n\n    @keyframes shift-indicator-glow{\n      0%, 100%{\n        box-shadow:0 0 0 0 rgb(255 138 0 / 0%);\n      }\n      50%{\n        box-shadow:0 0 0 6px rgb(255 138 0 / 12%);\n      }\n    }\n\n    .shift-option-action{\n      min-height:32px;\n      border-radius:10px;\n      border:1px solid #d8deea;\n      background:#f7f9fc;\n      color:#1f2937;\n      font-size:12px;\n      font-weight:800;\n      padding:0 10px;\n      display:inline-flex;\n      align-items:center;\n      gap:6px;\n      cursor:pointer;\n      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n    }\n\n    .shift-option-action:hover{\n      transform:translateY(-1px);\n      border-color:#c4cede;\n      box-shadow:0 8px 14px rgb(17 24 39 / 10%);\n    }\n\n    .shift-option-action .ac-icon{\n      width:16px;\n      height:16px;\n      flex:0 0 16px;\n      display:block;\n    }\n\n    #desktop-shift-options .shift-option-head small{\n      font-size:13px;\n      line-height:1.2;\n      min-width:138px;\n      flex:0 0 138px;\n    }\n\n    #desktop-shift-options .shift-option-head .shift-option-price,\n    #desktop-shift-options .shift-option-head .shift-option-seats{\n      font-size:13px;\n    }\n\n    #desktop-booking-card.booking-stage-2 .shift-list{\n      display:flex;\n      width:100%;\n      justify-content:flex-start;\n      align-items:stretch;\n      flex:1 1 auto;\n      min-height:0;\n      margin-top:0;\n      max-height:none;\n      overflow:visible;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options{\n      display:grid;\n      grid-template-rows:repeat(2,minmax(0,1fr));\n      gap:10px;\n      width:100%;\n      min-width:0;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options,\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option,\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head,\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head > strong,\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-tagline{\n      min-width:0;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktopBookingLead,\n    #desktop-booking-card.booking-stage-2 #desktop-booking-info{\n      display:none !important;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option{\n      margin-bottom:0;\n      width:100%;\n      max-width:100%;\n      min-height:0;\n      padding:14px 14px 14px;\n      align-content:start;\n      justify-self:stretch;\n      box-sizing:border-box;\n      overflow:hidden;\n    }\n\n    #desktop-booking-card.booking-stage-2 .booking-step-2{\n      display:flex;\n      flex-direction:column;\n      align-items:stretch;\n      gap:6px;\n      min-height:0;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktopBookingTitle{\n      margin-bottom:4px;\n    }\n\n    #desktop-booking-card.booking-stage-2 .selected-shift-chip{\n      margin-bottom:4px;\n    }\n\n    #desktop-booking-card.booking-stage-2 .booking-all-shifts-link{\n      display:flex;\n      margin-top:6px;\n      align-self:stretch;\n    }\n\n    #mobileBookingCard.booking-stage-2 .booking-all-shifts-link{\n      display:flex;\n      margin-top:6px;\n      align-self:stretch;\n    }\n\n    #desktop-booking-card.booking-stage-3 .booking-all-shifts-link,\n    #desktop-booking-card.booking-stage-4 .booking-all-shifts-link{\n      display:none !important;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head > strong{\n      flex:1 1 auto;\n      min-width:0;\n      font-size:26px;\n      font-weight:900;\n      white-space:normal;\n      line-height:1.08;\n      letter-spacing:-.01em;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head small{\n      margin-left:auto;\n      min-width:132px;\n      flex:0 0 132px;\n      gap:4px;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head{\n      justify-content:flex-start;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head .shift-option-price{\n      font-size:19px;\n      font-weight:900;\n      line-height:1.05;\n      color:#111827;\n      letter-spacing:-.02em;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head .shift-option-seats{\n      font-size:13px;\n      line-height:1.15;\n      color:#4b5563;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-tagline{\n      font-size:12px;\n      line-height:1.38;\n      font-weight:700;\n      letter-spacing:.005em;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-actions{\n      margin-top:auto;\n      align-items:center;\n      flex-wrap:nowrap;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-action{\n      min-height:38px;\n      padding:0 14px;\n      font-size:14px;\n    }\n\n    #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-select-indicator{\n      width:38px;\n      height:38px;\n    }\n\n    .shift-inline-panel{\n      display:none;\n      border-radius:12px;\n      border:1px solid #e6ebf4;\n      background:#f8fafe;\n      padding:10px 11px;\n      color:#3e4a5f;\n      font-size:12px;\n      line-height:1.45;\n    }\n\n    .shift-inline-panel.visible{\n      display:block;\n    }\n\n    .shift-inline-panel ul{\n      margin:0;\n      padding-left:16px;\n      display:grid;\n      gap:4px;\n    }\n\n    .shift-inline-calendar{\n      display:none;\n      gap:4px;\n    }\n\n    .shift-inline-calendar.visible{\n      display:grid;\n    }\n\n    .shift-modal-content{\n      display:grid;\n      gap:14px;\n    }\n\n    .shift-modal-content__meta{\n      display:grid;\n      gap:4px;\n    }\n\n    .shift-modal-content__meta strong{\n      font-size:20px;\n      line-height:1.2;\n      letter-spacing:-.02em;\n      color:#111827;\n    }\n\n    .shift-modal-content__meta span{\n      font-size:14px;\n      line-height:1.45;\n      color:#5f6779;\n    }\n\n    .shift-modal-content__desc{\n      margin:0;\n      font-size:15px;\n      line-height:1.55;\n      color:#2a3242;\n    }\n\n    .shift-modal-content__list{\n      margin:0;\n      padding-left:18px;\n      display:grid;\n      gap:6px;\n      color:#334155;\n      font-size:14px;\n      line-height:1.5;\n    }\n\n    .shift-modal-content__dates{\n      display:grid;\n      gap:4px;\n      padding:10px 12px;\n      border-radius:12px;\n      border:1px solid #e6ebf4;\n      background:#f8fafe;\n      color:#334155;\n      font-size:13px;\n      line-height:1.45;\n    }\n\n    .shift-list.disabled{\n      position:relative;\n      opacity:52%;\n      pointer-events:none;\n      filter:saturate(.85);\n    }\n\n    .shift-list.highlight{\n      border-radius:18px;\n      box-shadow:0 0 0 4px rgb(255 138 0 / 10%);\n      padding:4px;\n      margin:-4px 0 0;\n    }\n\n    .shift-list-veil{\n      display:none;\n      margin:0 0 10px;\n      padding:2px 0 0;\n      border-radius:0;\n      background:transparent;\n      border:none;\n      color:rgb(255 255 255 / 72%);\n      font-size:12px;\n      line-height:1.5;\n      cursor:pointer;\n      box-shadow:none;\n    }\n\n    .shift-calendar-discovery{\n      margin:6px 0 14px;\n      color:rgb(255 255 255 / 68%);\n      font-size:12px;\n      line-height:1.5;\n    }\n\n    .shift-calendar-discovery strong{\n      color:#fff;\n      font-weight:800;\n    }\n\n    .shift-list.disabled + .shift-list-veil{\n      display:block;\n    }\n\n    .mobile-booking-card .shift-option{\n      padding:11px 12px;\n      border-radius:16px;\n    }\n\n    .mobile-booking-card .shift-option strong{\n      font-size:14px;\n      line-height:1.28;\n    }\n\n    .mobile-booking-card .shift-option small{\n      font-size:12px;\n      line-height:1.22;\n      min-width:108px;\n      flex:0 0 108px;\n      gap:1px;\n    }\n\n    .mobile-booking-card .shift-option .shift-option-tagline{\n      font-size:12px;\n      line-height:1.35;\n    }\n\n    .shift-option:hover{\n      transform:translateY(-1px);\n      box-shadow:0 10px 24px rgb(20 29 45 / 8%);\n    }\n\n    .shift-option.active{\n      border-color:#ffb15e;\n      box-shadow:0 0 0 3px rgb(255 138 0 / 12%);\n    }\n\n    .shift-option small{\n      color:var(--muted);\n      display:block;\n      margin-top:0;\n    }\n\n    .shift-price-chip{\n      padding:6px 8px;\n      border-radius:999px;\n      background:var(--accent-soft);\n      color:#a44f00;\n      font-size:11px;\n      font-weight:800;\n      white-space:nowrap;\n    }\n\n    .booking-price-box{\n      border-radius:18px;\n      background:rgb(255 255 255 / 8%);\n      border:1px solid rgb(255 255 255 / 10%);\n      padding:14px 14px 13px;\n      margin-bottom:13px;\n    }\n\n    .booking-next-step-note{\n      border-radius:14px;\n      border:1px dashed rgb(255 255 255 / 22%);\n      background:rgb(255 255 255 / 5%);\n      padding:11px 12px;\n      color:rgb(255 255 255 / 70%);\n      font-size:12px;\n      line-height:1.5;\n      margin-bottom:10px;\n    }\n\n    .mobile-booking-card .booking-price-box{\n      border-radius:16px;\n      padding:13px 13px 12px;\n    }\n\n    .booking-price-head{\n      display:flex;\n      justify-content:space-between;\n      gap:10px;\n      align-items:flex-start;\n    }\n\n    .booking-price-col small{\n      display:block;\n      font-size:11px;\n      color:rgb(255 255 255 / 62%);\n      margin-bottom:4px;\n    }\n\n    .booking-price-main{\n      font-size:18px;\n      font-weight:800;\n      letter-spacing:-.02em;\n      color:#fff;\n    }\n\n    .mobile-booking-card .booking-price-main{\n      font-size:17px;\n    }\n\n    .booking-price-main.big{\n      font-size:24px;\n      font-weight:900;\n      color:#fff3e0;\n      letter-spacing:-.03em;\n    }\n\n    .booking-price-discount{\n      margin-top:4px;\n      font-size:12px;\n      font-weight:700;\n      color:rgba(255,215,173,.88);\n      letter-spacing:.01em;\n    }\n\n    .mobile-booking-card .booking-price-main.big{\n      font-size:21px;\n    }\n\n    .booking-code-line{\n      margin-top:10px;\n      font-size:12px;\n      color:rgb(255 255 255 / 68%);\n    }\n\n    .booking-timer-line{\n      margin-top:8px;\n      font-size:12px;\n      color:#ffd9ae;\n      font-weight:800;\n      display:inline-block;\n      min-width:30ch;\n      white-space:nowrap;\n      font-variant-numeric:tabular-nums;\n      font-feature-settings:\"tnum\" 1;\n    }\n\n    .booking-empty-box{\n      border-radius:18px;\n      background:rgb(255 255 255 / 6%);\n      border:1px dashed rgb(255 255 255 / 14%);\n      padding:12px 13px;\n      margin-bottom:12px;\n      color:rgb(255 255 255 / 68%);\n      font-size:12px;\n      line-height:1.5;\n    }\n\n    .booking-next-steps{\n      margin-top:10px;\n      border-radius:16px;\n      border:1px solid rgb(255 255 255 / 11%);\n      background:rgb(255 255 255 / 6%);\n      padding:12px;\n      display:grid;\n      gap:8px;\n    }\n\n    .booking-summary-mini .booking-next-steps{\n      margin-top:8px;\n      padding:9px 10px;\n      border-radius:12px;\n      gap:6px;\n    }\n\n    .booking-next-steps-title{\n      margin:0;\n      font-size:13px;\n      font-weight:800;\n      color:#fff;\n      letter-spacing:-.01em;\n    }\n\n    .booking-next-steps-text{\n      margin:0;\n      font-size:11px;\n      line-height:1.35;\n      color:rgb(255 255 255 / 82%);\n    }\n\n    .booking-referral-link{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      width:100%;\n      min-height:32px;\n      padding:0 12px;\n      border-radius:10px;\n      border:1px solid rgb(255 255 255 / 20%);\n      background:rgb(255 255 255 / 9%);\n      color:#fff;\n      text-decoration:none;\n      font-size:12px;\n      font-weight:800;\n      font-family:inherit;\n      cursor:pointer;\n      transition:background .16s ease, border-color .16s ease;\n    }\n\n    .booking-referral-link:hover{\n      background:rgb(255 255 255 / 13%);\n      border-color:rgb(255 255 255 / 28%);\n    }\n\n    .booking-referral-image{\n      width:100%;\n      max-height:102px;\n      object-fit:cover;\n      border-radius:12px;\n      border:1px solid rgb(255 255 255 / 12%);\n      display:block;\n    }\n\n    .booking-summary-mini--completed .booking-price-head:first-child .booking-price-main{\n      font-size:42%;\n      line-height:1.04;\n      letter-spacing:-.01em;\n      white-space:normal;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    .booking-summary-mini--completed .booking-price-head:first-child{\n      margin-bottom:0;\n    }\n\n    .booking-summary-mini--completed .booking-price-head:first-child .booking-price-col small{\n      margin-bottom:2px;\n      font-size:10px;\n      line-height:1.1;\n    }\n\n    .completed-followup-text{\n      margin:0;\n      font-size:10px;\n      line-height:1.15;\n      color:rgba(255,255,255,.88);\n      width:100%;\n      max-width:100%;\n      min-width:0;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    .completed-followup-image{\n      width:100%;\n      max-height:min(36vh, 240px);\n      object-fit:cover;\n      object-position:center 12%;\n      border-radius:10px;\n      border:1px solid rgba(255,255,255,.12);\n      margin-top:1px;\n      display:block;\n    }\n\n    .completed-followup-image-trigger{\n      border:none;\n      padding:0;\n      margin:0;\n      width:100%;\n      background:transparent;\n      cursor:zoom-in;\n      display:block;\n    }\n\n    .completed-followup-note{\n      margin:1px 0 0;\n      font-size:9px;\n      line-height:1.14;\n      color:rgba(255,255,255,.82);\n      width:100%;\n      max-width:100%;\n      min-width:0;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    .completed-followup-link{\n      margin-top:0;\n      display:inline-block;\n      color:#ffd5a5;\n      font-size:9px;\n      font-weight:700;\n      text-decoration:underline;\n      text-underline-offset:2px;\n      cursor:pointer;\n      white-space:normal;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    .booking-summary-mini--completed{\n      width:100%;\n      max-width:100%;\n      min-width:0;\n      overflow:hidden;\n      overflow-x:clip;\n      box-sizing:border-box;\n    }\n\n    .booking-summary-mini--completed .booking-price-head{\n      width:100%;\n      max-width:100%;\n      display:grid;\n      grid-template-columns:minmax(0,1fr) minmax(0,1fr);\n      align-items:start;\n      gap:10px;\n    }\n\n    .booking-summary-mini--completed .booking-price-col{\n      min-width:0;\n      max-width:100%;\n    }\n\n    .booking-summary-mini--completed .booking-price-main{\n      min-width:0;\n      max-width:100%;\n      white-space:normal;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    .booking-summary-mini--completed .booking-price-head:last-child .booking-price-col:last-child .booking-price-main{\n      word-break:break-all;\n      overflow-wrap:anywhere;\n    }\n\n    .booking-summary-mini--completed .booking-price-head:last-child .booking-price-main{\n      font-size:50%;\n      line-height:1.08;\n      white-space:normal;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    .booking-summary-mini--completed .booking-price-head:last-child .booking-price-main.big{\n      font-size:50%;\n    }\n\n    .booking-summary-mini--completed .booking-price-head:last-child small{\n      font-size:9px;\n    }\n\n    @keyframes step-pulse{\n      0%{box-shadow:0 0 0 0 rgb(255 138 0 / 18%)}\n\n      70%{box-shadow:0 0 0 8px rgb(255 138 0 / 0%)}\n\n      100%{box-shadow:0 0 0 0 rgb(255 138 0 / 0%)}\n    }\n\n    .cta-main{\n      width:100%;\n      border:none;\n      border-radius:16px;\n      padding:17px 16px;\n      color:#fff;\n      font-weight:800;\n      font-size:16px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 18px 40px rgb(255 122 0 / 45%);\n      cursor:pointer;\n      transition:transform .15s ease, box-shadow .15s ease;\n    }\n\n    .hero-booking-card .cta-main.cta-main-compact{\n      width:auto;\n      min-height:40px;\n      margin:0;\n      padding:10px 16px;\n      font-size:14px;\n      font-weight:800;\n      border-radius:12px;\n      box-shadow:0 10px 24px rgba(255,122,0,.26);\n      letter-spacing:0;\n    }\n\n    .mobile-booking-card .cta-main{\n      padding:15px 16px;\n      font-size:15px;\n      border-radius:15px;\n    }\n\n    .cta-main:hover{\n      transform:translateY(-2px) scale(1.01);\n      box-shadow:0 22px 55px rgb(255 122 0 / 55%);\n    }\n\n    .cta-main:focus-visible,\n    .secondary-outline:focus-visible,\n    .inline-link-btn:focus-visible,\n    .mode-btn:focus-visible,\n    .menu-pill:focus-visible,\n    .age-tab:focus-visible{\n      outline:3px solid rgb(255 138 0 / 30%);\n      outline-offset:2px;\n    }\n\n    .cta-main:disabled{\n      opacity:45%;\n      cursor:not-allowed;\n      box-shadow:none;\n    }\n\n    .cta-main.is-disabled{\n      opacity:50%;\n      cursor:not-allowed;\n      box-shadow:none;\n      transform:none !important;\n    }\n\n    .cta-wrap.highlight{\n      border-radius:18px;\n      box-shadow:0 0 0 4px rgb(255 138 0 / 10%);\n      padding:4px;\n      margin:8px 0 0;\n    }\n\n    .cta-subtext{\n      margin-top:8px;\n      font-size:12px;\n      color:rgb(255 255 255 / 60%);\n      text-align:center;\n    }\n\n    .mobile-booking-card .cta-subtext{\n      font-size:11px;\n      margin-top:7px;\n    }\n\n    .trust-mini{\n      margin-top:12px;\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n      font-size:11px;\n      color:rgb(255 255 255 / 55%);\n    }\n\n    .mobile-booking-card .trust-mini{\n      gap:8px;\n      margin-top:12px;\n      font-size:11px;\n    }\n\n    .trust-mini span{\n      background:rgb(255 255 255 / 6%);\n      padding:5px 8px;\n      border-radius:10px;\n    }\n\n    .mobile-booking-card .trust-mini span{\n      padding:5px 8px;\n      border-radius:9px;\n    }\n\n    .booking-scarcity{\n      margin-top:10px;\n      display:grid;\n      gap:8px;\n      text-align:center;\n      padding:11px 16px;\n      border-radius:18px;\n      border:1px solid rgba(255,156,64,.55);\n      background:linear-gradient(180deg, rgba(255,138,0,.13), rgba(255,138,0,.08));\n      color:#ffd6a8;\n      font-size:14px;\n      font-weight:800;\n      box-shadow:0 14px 26px rgba(255,138,0,.12);\n      width:min(320px, 100%);\n      --scarcity-fill:63%;\n    }\n\n    .hero-booking-card .booking-scarcity{\n      margin:2px auto 0;\n    }\n\n    .booking-scarcity-progress{\n      width:100%;\n      height:6px;\n      border-radius:999px;\n      background:rgba(255,255,255,.20);\n      overflow:hidden;\n    }\n\n    .booking-scarcity-progress-fill{\n      display:block;\n      width:var(--scarcity-fill);\n      height:100%;\n      border-radius:999px;\n      background:linear-gradient(90deg,#ffd8a6,#ff9f2f);\n      box-shadow:0 0 14px rgba(255,179,92,.55);\n      transition:width .9s ease;\n    }\n\n    .booking-scarcity-text{\n      display:inline-flex;\n      align-items:baseline;\n      justify-content:center;\n      gap:6px;\n      line-height:1.2;\n    }\n\n    .booking-scarcity-text strong{\n      font-size:24px;\n      line-height:1;\n      letter-spacing:-.02em;\n      color:#fff;\n    }\n\n    .booking-scarcity.is-animating .booking-scarcity-progress-fill{\n      animation:bookingScarcityPulse 1.2s ease;\n    }\n\n    @keyframes bookingScarcityPulse{\n      0%{transform-origin:left center; transform:scaleX(.2);}\n      100%{transform-origin:left center; transform:scaleX(1);}\n    }\n\n    .under-cta{\n      margin-top:11px;\n      text-align:center;\n      color:rgb(255 255 255 / 68%);\n      font-size:12px;\n    }\n\n    #desktop-booking-card.booking-stage-3 .booking-step-3 .under-cta,\n    #desktop-booking-card.booking-stage-3 .booking-step-3 .booking-step1-hooks,\n    #desktop-booking-card.booking-stage-3 .booking-step-3 .trust-mini,\n    #desktop-booking-card.booking-stage-3 .booking-step-3 .booking-scarcity,\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .under-cta,\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .booking-step1-hooks,\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .trust-mini,\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .booking-scarcity{\n      display:none;\n    }\n\n    #desktop-booking-card.booking-stage-3 .booking-step-3,\n    #desktop-booking-card.booking-stage-4 .booking-step-3{\n      margin-top:0;\n    }\n\n    #desktop-booking-card.booking-stage-3 .booking-step-3 .cta-wrap,\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .cta-wrap{\n      margin:0;\n      padding:0;\n      box-shadow:none;\n    }\n\n    #desktop-booking-card.booking-stage-3 #desktop-booking-info{\n      display:flex;\n      flex:1 1 auto;\n      min-height:0;\n      min-width:0;\n      margin:0 0 6px !important;\n    }\n\n    #desktop-booking-card.booking-stage-3 #desktop-booking-info .booking-shift-focus{\n      flex:1 1 auto;\n      min-height:100%;\n      height:100%;\n      min-width:0;\n      padding:0;\n      gap:8px;\n      align-content:stretch;\n      display:flex;\n      flex-direction:column;\n      border:none;\n      border-radius:0;\n      background:transparent;\n    }\n\n    #desktop-booking-card.booking-stage-3 #desktop-booking-info .booking-shift-focus__dates{\n      font-size:clamp(24px,1.9vw,30px);\n      line-height:1.06;\n      letter-spacing:-.02em;\n      white-space:normal;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    #desktop-booking-card.booking-stage-3 #desktop-booking-info .booking-shift-focus__meta{\n      font-size:clamp(14px,1vw,16px);\n      line-height:1.3;\n    }\n\n    #desktop-booking-card.booking-stage-3 #desktop-booking-info .booking-shift-focus__desc{\n      font-size:clamp(13px,.95vw,15px);\n      line-height:1.36;\n      color:rgba(255,255,255,.92);\n      flex:1 1 auto;\n      margin:0;\n      max-height:none;\n      overflow:auto;\n    }\n\n    #desktop-booking-card.booking-stage-3 #desktop-booking-info .booking-shift-focus__desc-title{\n      font-size:clamp(13px,.88vw,15px);\n      line-height:1.25;\n      font-weight:800;\n      color:rgba(255,255,255,.96);\n      margin:2px 0 0;\n    }\n\n    #desktop-booking-card.booking-stage-3 #desktop-booking-info .booking-shift-focus__context{\n      margin-top:auto;\n      font-size:clamp(12px,.82vw,14px);\n      line-height:1.32;\n      color:rgba(255,255,255,.84);\n    }\n\n    #desktop-booking-card.booking-stage-3 #desktop-booking-info .booking-preliminary-chip{\n      align-self:flex-start;\n      margin-top:6px;\n      min-height:30px;\n      padding:0 12px;\n      border-radius:999px;\n      display:inline-flex;\n      align-items:center;\n      font-size:13px;\n      font-weight:800;\n      letter-spacing:.01em;\n      color:rgba(255,255,255,.94);\n      background:rgba(255,255,255,.10);\n      border:1px solid rgba(255,255,255,.18);\n    }\n\n    #desktop-booking-card.booking-stage-3 .booking-step-3 .cta-main,\n    #desktop-booking-card.booking-stage-3 .booking-step-3 .cta-main.cta-main-compact{\n      width:100%;\n      min-height:48px;\n      border-radius:14px;\n      padding:11px 16px;\n      font-size:18px;\n      font-weight:900;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info{\n      display:flex;\n      flex:1 1 auto;\n      align-items:center;\n      min-height:0;\n      min-width:0;\n      margin:0 0 4px !important;\n    }\n\n    /* Stage 4 compositing fix: prevent bottom-right backdrop-filter artifact */\n    #desktop-booking-card.booking-stage-4{\n      background:rgba(12,17,24,.90);\n      -webkit-backdrop-filter:none;\n      backdrop-filter:none;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-summary-mini{\n      flex:1 1 auto;\n      min-height:100%;\n      height:100%;\n      min-width:0;\n      display:flex;\n      flex-direction:column;\n      justify-content:flex-start;\n      gap:6px;\n      padding:12px 12px 12px;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-price-head{\n      align-items:flex-start;\n      gap:10px;\n      margin-bottom:1px;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-price-main{\n      font-size:24px;\n      line-height:1.08;\n      letter-spacing:-.03em;\n      font-variant-numeric:tabular-nums;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-price-main.big{\n      font-size:clamp(22px,1.8vw,27px);\n      white-space:normal;\n      overflow-wrap:anywhere;\n      line-height:1;\n      font-variant-numeric:tabular-nums;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-price-col--fixed{\n      display:flex;\n      flex-direction:column;\n      align-items:flex-end;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-code-line{\n      font-size:13px;\n      line-height:1.26;\n      overflow-wrap:anywhere;\n      word-break:break-word;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-timer-line{\n      margin-top:auto;\n      min-height:18px;\n      font-size:15px;\n      line-height:1.15;\n      font-variant-numeric:tabular-nums;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-price-discount{\n      margin-top:6px;\n      font-size:11px;\n      opacity:.95;\n    }\n\n    #desktop-booking-card.booking-stage-4 #desktop-booking-info .booking-shift-description{\n      flex:1 1 auto;\n      min-height:auto;\n      margin-top:2px;\n      padding:0;\n      border:none;\n      background:transparent;\n      color:rgba(255,255,255,.88);\n      font-size:12px;\n      line-height:1.24;\n      max-height:none;\n      overflow:visible;\n    }\n\n    #mobileBookingCard.booking-stage-4 #mobile-booking-info .booking-shift-description{\n      flex:1 1 auto;\n      min-height:auto;\n      max-height:none;\n      overflow:visible;\n    }\n\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .cta-main,\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .cta-main.cta-main-compact{\n      width:100%;\n      min-height:54px;\n      border-radius:14px;\n      font-size:18px;\n      font-weight:800;\n      padding:9px 16px;\n      letter-spacing:-.02em;\n    }\n\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .cta-main[data-cta-layout=\"stacked\"]{\n      display:flex;\n      flex-direction:column;\n      align-items:center;\n      justify-content:center;\n      gap:2px;\n      padding:10px 14px;\n      line-height:1.08;\n    }\n\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .cta-main[data-cta-layout=\"stacked\"] .cta-main-line--primary{\n      font-size:16px;\n      font-weight:700;\n    }\n\n    #desktop-booking-card.booking-stage-4 .booking-step-3 .cta-main[data-cta-layout=\"stacked\"] .cta-main-line--accent{\n      font-size:22px;\n      font-weight:900;\n    }\n\n    #mobileBookingCard.booking-stage-3 #mobile-booking-info .booking-shift-focus{\n      padding:14px 13px;\n      gap:8px;\n    }\n\n    #mobileBookingCard.booking-stage-3 #mobile-booking-info .booking-shift-focus__dates{\n      font-size:clamp(24px,6.2vw,30px);\n      line-height:1.06;\n    }\n\n    #mobileBookingCard.booking-stage-3 #mobile-booking-info .booking-shift-focus__meta{\n      font-size:13px;\n      line-height:1.3;\n    }\n\n    #mobileBookingCard.booking-stage-3 #mobile-booking-info .booking-shift-focus__desc{\n      font-size:14px;\n      line-height:1.38;\n    }\n\n    #mobileBookingCard.booking-stage-3 #mobile-booking-info .booking-shift-focus__context{\n      font-size:13px;\n      line-height:1.34;\n    }\n\n    #desktop-booking-card.booking-completed .booking-steps,\n    #desktop-booking-card.booking-completed .booking-step-block,\n    #mobile-booking-card.booking-completed .booking-step-block,\n    #mobileBookingCard.booking-completed .booking-steps{\n      display:none !important;\n    }\n\n    #desktop-booking-card.booking-completed .booking-summary-mini,\n    #mobileBookingCard.booking-completed .booking-summary-mini{\n      margin-top:0;\n    }\n\n    #desktop-booking-card.booking-completed .booking-summary-mini--completed,\n    #mobileBookingCard.booking-completed .booking-summary-mini--completed{\n      border:none;\n      background:transparent;\n      box-shadow:none;\n    }\n\n    .booking-shift-focus{\n      border-radius:18px;\n      border:1px solid rgba(255,255,255,.14);\n      background:linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.04));\n      padding:14px 14px 13px;\n      display:grid;\n      gap:8px;\n    }\n\n    .booking-shift-focus__dates{\n      font-size:22px;\n      font-weight:800;\n      line-height:1.2;\n      letter-spacing:-.02em;\n      color:#fff;\n    }\n\n    .booking-shift-focus__meta{\n      font-size:13px;\n      font-weight:700;\n      line-height:1.4;\n      color:rgba(255,255,255,.78);\n    }\n\n    .booking-shift-focus__desc{\n      margin:0;\n      font-size:14px;\n      line-height:1.5;\n      color:rgba(255,255,255,.88);\n    }\n\n    .booking-shift-focus__context{\n      margin:0;\n      font-size:12px;\n      line-height:1.45;\n      color:rgba(255,255,255,.70);\n    }\n\n    .under-cta.is-muted-hidden,\n    .cta-subtext.is-muted-hidden{\n      display:none;\n    }\n\n    .booking-hint{\n      opacity:0%;\n      transform:translateY(6px);\n      transition:opacity .25s ease, transform .25s ease;\n      font-size:13px;\n      color:#ffb86b;\n      margin-top:8px;\n      min-height:18px;\n      pointer-events:none;\n    }\n\n    .inline-lead-host{\n      margin-top:10px;\n    }\n\n    .inline-lead-card{\n      border-radius:16px;\n      border:1px solid rgba(255,255,255,.16);\n      background:linear-gradient(160deg, rgba(255,255,255,.10), rgba(255,255,255,.04));\n      padding:12px;\n      display:grid;\n      gap:10px;\n    }\n\n    .inline-lead-card--offer{\n      border-color:#e0e7f2;\n      background:#f8fafe;\n    }\n\n    .inline-lead-card .form-field{\n      gap:6px;\n    }\n\n    .inline-lead-card .form-field label{\n      font-size:12px;\n      font-weight:700;\n      color:rgba(255,255,255,.82);\n    }\n\n    .inline-lead-card--offer .form-field label{\n      color:#5d6a7f;\n    }\n\n    .inline-lead-card .input-box{\n      min-height:42px;\n    }\n\n    .inline-lead-check{\n      margin:0;\n      padding:0;\n      border:none;\n      background:transparent;\n    }\n\n    .inline-lead-card .check-row span{\n      color:rgba(255,255,255,.84);\n      font-size:12px;\n      line-height:1.4;\n    }\n\n    .inline-lead-card--offer .check-row span{\n      color:#4f5d73;\n    }\n\n    .inline-lead-card .cta-main.inline-lead-submit{\n      margin:0;\n      min-height:44px;\n      font-size:15px;\n      border-radius:14px;\n      padding:12px 14px;\n      box-shadow:0 12px 24px rgba(255,122,0,.30);\n    }\n\n    .booking-hint.visible{\n      opacity:100%;\n      transform:translateY(0);\n    }\n\n    .body-sections{\n      padding:0 18px 18px;\n      margin-top:0;\n      display:grid;\n      gap:18px;\n      position:relative;\n      z-index:2;\n      border-top-left-radius:0;\n      border-top-right-radius:0;\n      overflow:visible;\n    }\n\n    #desktopView:not(.compact-mode) .body-sections{\n      margin-top:14px;\n    }\n\n    .body-sections > .section-card:first-child{\n      margin:0;\n    }\n\n    .section-card{\n      background:#fff;\n      border-radius:24px;\n      border:1px solid var(--line);\n      box-shadow:var(--shadow);\n      padding:18px;\n      scroll-margin-top:24px;\n    }\n\n    .trust-band{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n      margin-top:14px;\n    }\n\n    .trust-band-card{\n      border:1px solid var(--line);\n      background:linear-gradient(135deg,#fff8f0,#fff);\n      border-radius:20px;\n      padding:16px;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease;\n    }\n\n    .trust-band-card:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgb(20 29 45 / 10%);\n    }\n\n    .trust-band-card strong{\n      display:block;\n      font-size:18px;\n      letter-spacing:-.02em;\n      margin-bottom:8px;\n      color:#111827;\n    }\n\n    .trust-band-card span{\n      display:block;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .section-card h3{\n      margin:0 0 10px;\n      font-size:22px;\n      letter-spacing:-.02em;\n    }\n\n    .section-card p{\n      margin:0;\n      color:var(--muted);\n      line-height:1.55;\n      font-size:14px;\n    }\n\n    .journey-grid{\n      display:grid;\n      grid-template-columns:repeat(4,1fr);\n      gap:14px;\n      margin-top:16px;\n    }\n\n    .journey-card{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:22px;\n      padding:16px;\n      box-shadow:var(--shadow);\n      display:grid;\n      gap:10px;\n    }\n\n    .journey-heading{\n      display:flex;\n      align-items:center;\n      gap:10px;\n      min-width:0;\n    }\n\n    .journey-num{\n      width:34px;\n      height:34px;\n      border-radius:50%;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:14px;\n      font-weight:900;\n      letter-spacing:-.02em;\n    }\n\n    .journey-card h4{\n      margin:0;\n      font-size:16px;\n      line-height:1.35;\n      letter-spacing:-.01em;\n    }\n\n    .journey-card p{\n      margin:0;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.6;\n    }\n\n    .results-band{\n      margin-top:20px;\n      display:grid;\n      grid-template-columns:repeat(4,1fr);\n      gap:12px;\n    }\n\n    .result-pill{\n      background:linear-gradient(135deg,#fff8f0,#fff);\n      border:1px solid var(--line);\n      border-radius:18px;\n      padding:14px 12px;\n      box-shadow:var(--shadow);\n      text-align:center;\n    }\n\n    .result-pill strong{\n      display:block;\n      font-size:22px;\n      letter-spacing:-.03em;\n      color:#d66a00;\n      margin-bottom:6px;\n    }\n\n    .result-pill span{\n      display:block;\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.45;\n    }\n\n    .grid-3{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n    }\n\n    .programs-layout{\n      display:grid;\n      grid-template-columns:minmax(0, 2fr) minmax(280px, 360px);\n      gap:12px;\n      align-items:stretch;\n    }\n\n    .programs-main-grid{\n      display:grid;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      grid-template-rows:repeat(2,minmax(0,1fr));\n      height:100%;\n    }\n\n    .programs-short-block{\n      align-self:stretch;\n      background:linear-gradient(135deg,#f9fbff,#fff);\n      border:1px solid var(--line);\n      border-radius:20px;\n      padding:12px;\n      box-shadow:var(--shadow);\n      display:flex;\n      flex-direction:column;\n      gap:8px;\n      height:100%;\n    }\n\n    .programs-short-block h4{\n      margin:0;\n      font-size:16px;\n      letter-spacing:-.01em;\n      color:#1d2532;\n    }\n\n    .programs-short-block p{\n      margin:0;\n      font-size:13px;\n      color:var(--muted);\n      line-height:1.42;\n      display:-webkit-box;\n      -webkit-line-clamp:4;\n      -webkit-box-orient:vertical;\n      overflow:hidden;\n    }\n\n    .short-shifts-list{\n      display:grid;\n      gap:6px;\n    }\n\n    .short-shift-card{\n      padding:8px 9px;\n      border-radius:12px;\n      box-shadow:none;\n      background:#fff;\n    }\n\n    .short-shift-head{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:6px;\n      margin-bottom:4px;\n    }\n\n    .short-shift-head h4{\n      margin:0;\n      font-size:13px;\n      letter-spacing:-.01em;\n    }\n\n    .short-shift-tag{\n      display:inline-flex;\n      align-items:center;\n      height:18px;\n      padding:0 6px;\n      border-radius:999px;\n      font-size:9px;\n      font-weight:700;\n      color:#56627a;\n      background:#eef3fb;\n      border:1px solid #dde6f3;\n      white-space:nowrap;\n    }\n\n    .short-shift-meta{\n      margin-top:2px;\n      display:grid;\n      gap:1px;\n      font-size:10px;\n      color:#556175;\n      line-height:1.25;\n    }\n\n    .short-shift-subline{\n      display:block;\n      margin-top:2px;\n      font-size:11px;\n      line-height:1.3;\n      color:#6f7d93;\n      font-weight:700;\n    }\n\n    .short-shift-note{\n      margin:0;\n      color:#5f6f87;\n      font-size:12px;\n      line-height:1.4;\n      font-weight:600;\n    }\n\n    .mini-card{\n      background:#fff;\n      border-radius:20px;\n      border:1px solid var(--line);\n      padding:16px;\n    }\n\n    .mini-card h4{\n      margin:0 0 8px;\n      font-size:16px;\n      letter-spacing:-.01em;\n    }\n\n    .mini-card h4 .program-shift-index{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-width:30px;\n      height:30px;\n      border-radius:50%;\n      font-size:14px;\n      font-weight:900;\n      line-height:1;\n      letter-spacing:-.01em;\n      border:1px solid transparent;\n    }\n\n    .mini-card h4 .program-shift-index-main{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      box-shadow:0 10px 20px rgba(255,138,0,.20);\n    }\n\n    .short-shift-head h4 .program-shift-index{\n      min-width:28px;\n      height:28px;\n      font-size:13px;\n      background:#eef3fb;\n      border-color:#dde6f3;\n      color:#56627a;\n      box-shadow:none;\n    }\n\n    .mini-card p{\n      margin:0;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .price-row{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      margin-bottom:8px;\n    }\n\n    .price-row strong{\n      white-space:nowrap;\n    }\n\n    .price-row span{\n      display:flex;\n      align-items:center;\n      justify-content:flex-end;\n      gap:8px;\n      min-width:0;\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.4;\n      text-align:right;\n    }\n\n    .shift-calendar-btn{\n      height:30px;\n      border-radius:9px;\n      border:1px solid var(--line);\n      background:#fff;\n      cursor:pointer;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      gap:4px;\n      padding:0 8px;\n      font-size:12px;\n      font-weight:700;\n      line-height:1;\n      flex:0 0 auto;\n      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n    }\n\n    .shift-calendar-btn .ac-icon{\n      width:14px;\n      height:14px;\n      display:block;\n    }\n\n    .shift-calendar-btn-label{\n      line-height:1;\n    }\n\n    .shift-calendar-btn:hover{\n      transform:translateY(-1px);\n      border-color:#d5dbe7;\n      box-shadow:0 10px 18px rgb(20 29 45 / 10%);\n    }\n\n    .overlay.section-modal-compact .section-modal-body .price-row span{\n      flex-direction:column;\n      align-items:flex-end;\n      justify-content:flex-start;\n      gap:6px;\n      text-align:right;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .shift-calendar-btn{\n      width:30px;\n      min-width:30px;\n      padding:0;\n      gap:0;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .shift-calendar-btn .shift-calendar-btn-label{\n      display:none;\n    }\n\n    .slot-grid{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n    }\n\n    .slot{\n      min-height:160px;\n      border-radius:20px;\n      border:1px dashed var(--line);\n      background:\n        radial-gradient(circle at 20% 20%, rgb(255 138 0 / 12%), transparent 25%),\n        linear-gradient(135deg,#f5f7fb,#eef2f7);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      color:var(--muted);\n      font-size:13px;\n      font-weight:700;\n      text-transform:uppercase;\n      letter-spacing:.08em;\n    }\n\n    .photo-grid{\n      display:grid;\n      grid-template-columns:1.35fr 1fr 1fr;\n      gap:12px;\n      grid-auto-rows:180px;\n    }\n\n    .filter-row{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n      margin:0 0 14px;\n    }\n\n    .filter-chip{\n      border:none;\n      border-radius:999px;\n      padding:10px 12px;\n      background:#f5f7fb;\n      color:#111827;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease;\n    }\n\n    .filter-chip:hover{\n      transform:translateY(-1px);\n      box-shadow:0 14px 26px rgba(20,29,45,.10);\n    }\n\n    .filter-chip.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .media-head{\n      display:flex;\n      align-items:end;\n      justify-content:space-between;\n      gap:12px;\n      flex-wrap:wrap;\n      margin-bottom:14px;\n    }\n\n    .media-head h3{\n      margin:0;\n    }\n\n    .media-head p{\n      margin:0;\n      max-width:760px;\n    }\n\n    .photo-card{\n      position:relative;\n      overflow:hidden;\n      border-radius:20px;\n      border:1px solid var(--line);\n      background:#fff;\n      min-height:180px;\n      box-shadow:var(--shadow);\n      transition:transform .22s ease, box-shadow .22s ease;\n    }\n\n    .photo-card.hero{\n      grid-row:span 2;\n      min-height:372px;\n    }\n\n    .photo-card.wide{\n      grid-column:span 2;\n    }\n\n    .photo-card img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n      aspect-ratio: 4 / 3;\n    }\n\n    .photo-badge{\n      position:absolute;\n      left:10px;\n      bottom:10px;\n      padding:6px 9px;\n      border-radius:999px;\n      background:rgba(17,24,39,.76);\n      color:#fff;\n      font-size:11px;\n      font-weight:700;\n      text-transform:uppercase;\n      letter-spacing:.06em;\n      backdrop-filter:blur(8px);\n    }\n\n    .photo-title{\n      position:absolute;\n      left:10px;\n      top:10px;\n      padding:6px 9px;\n      border-radius:999px;\n      background:rgba(255,255,255,.86);\n      color:#111827;\n      font-size:11px;\n      font-weight:800;\n      letter-spacing:.04em;\n      text-transform:uppercase;\n    }\n\n    .shift-context-line{\n      margin-top:4px;\n      color:#6c788b;\n      font-size:11px;\n      font-weight:700;\n      line-height:1.45;\n    }\n\n    .media-lightbox{\n      position:fixed;\n      inset:0;\n      background:rgba(10,14,20,.92);\n      z-index:120;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:20px;\n      animation:fade-in .2s ease;\n    }\n\n    .media-lightbox.hidden{\n      display:none !important;\n    }\n\n    .media-stage{\n      position:relative;\n      max-width:900px;\n      width:100%;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n    }\n\n    .media-image{\n      max-width:100%;\n      max-height:80vh;\n      border-radius:18px;\n      box-shadow:0 30px 80px rgba(0,0,0,.5);\n    }\n\n    .media-video{\n      width:360px;\n      height:640px;\n      max-height:80vh;\n      border-radius:18px;\n      overflow:hidden;\n      background:#000;\n      box-shadow:0 30px 80px rgba(0,0,0,.6);\n    }\n\n    .media-nav{\n      position:absolute;\n      top:50%;\n      transform:translateY(-50%);\n      width:48px;\n      height:48px;\n      border-radius:50%;\n      border:none;\n      background:rgba(255,255,255,.12);\n      color:#fff;\n      font-size:20px;\n      cursor:pointer;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      backdrop-filter:blur(8px);\n    }\n\n    .media-prev{ left:-60px; }\n\n    .media-next{ right:-60px; }\n\n    .media-close{\n      position:absolute;\n      top:-60px;\n      right:0;\n      width:var(--close-btn-size);\n      height:var(--close-btn-size);\n      border-radius:12px;\n      border:1px solid rgba(255,255,255,.42);\n      background:rgba(255,255,255,.22);\n      color:#fff;\n      font-size:20px;\n      cursor:pointer;\n      display:grid;\n      place-items:center;\n      padding:0;\n      line-height:0;\n      box-shadow:0 10px 22px rgba(0,0,0,.24);\n    }\n\n    .media-caption{\n      position:absolute;\n      bottom:-50px;\n      left:0;\n      color:#fff;\n      font-size:13px;\n      opacity:.8;\n    }\n\n    @media (max-width: 900px){\n      .media-nav{\n        width:40px;\n        height:40px;\n        border-radius:12px;\n        font-size:18px;\n      }\n\n      .media-prev{ left:8px; }\n      .media-next{ right:8px; }\n\n      .media-close{\n        top:8px;\n        right:8px;\n      }\n\n      .media-caption{\n        left:12px;\n        right:12px;\n        bottom:8px;\n        font-size:12px;\n      }\n    }\n\n    .video-modal{\n      position:fixed;\n      inset:0;\n      background:rgba(0,0,0,.82);\n      z-index:130;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:20px;\n      animation:fade-in .2s ease;\n    }\n\n    .video-inner{\n      width:min(92vw, 920px);\n      margin:auto;\n      position:relative;\n      border-radius:18px;\n      overflow:hidden;\n      background:#000;\n      box-shadow:0 28px 72px rgba(0,0,0,.55);\n    }\n\n    .video-inner.vertical{\n      width:min(92vw, 390px);\n      border-radius:22px;\n    }\n\n    .video-frame{\n      width:100%;\n      max-height:78vh;\n      display:block;\n      aspect-ratio:16/9;\n      background:#000;\n    }\n\n    .video-frame.vertical{\n      aspect-ratio:9/16;\n      max-height:82vh;\n    }\n\n    .video-close{\n      position:absolute;\n      top:10px;\n      right:10px;\n      width:var(--close-btn-size);\n      height:var(--close-btn-size);\n      border:1px solid rgba(255,255,255,.38);\n      border-radius:10px;\n      background:rgba(255,255,255,.20);\n      color:#fff;\n      font-size:20px;\n      line-height:1;\n      cursor:pointer;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      z-index:2;\n      box-shadow:0 8px 18px rgba(0,0,0,.28);\n    }\n\n    .video-fallback{\n      display:grid;\n      gap:10px;\n      align-content:center;\n      justify-items:flex-start;\n      min-height:280px;\n      padding:18px;\n      background:\n        radial-gradient(circle at 20% 20%, rgba(255,138,0,.14), transparent 30%),\n        linear-gradient(135deg,#0f1725,#111c2b);\n      color:#fff;\n    }\n\n    .video-fallback p{\n      margin:0;\n      color:rgba(255,255,255,.78);\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .calendar-modal{\n      position:fixed;\n      inset:0;\n      background:rgba(0,0,0,.72);\n      z-index:131;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:20px;\n      animation:fade-in .2s ease;\n    }\n\n    .calendar-inner{\n      width:min(92vw, 430px);\n      max-height:min(80vh, 620px);\n      overflow:auto;\n      border-radius:16px;\n      background:#0f1622;\n      border:1px solid rgba(255,255,255,.12);\n      box-shadow:0 26px 70px rgba(0,0,0,.45);\n      padding:16px;\n      color:#fff;\n    }\n\n    .calendar-header{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n      margin-bottom:12px;\n    }\n\n    .calendar-header span{\n      font-size:14px;\n      font-weight:700;\n      line-height:1.45;\n    }\n\n    .calendar-header button{\n      width:34px;\n      height:34px;\n      border-radius:10px;\n      border:1px solid rgba(255,255,255,.16);\n      background:rgba(255,255,255,.08);\n      color:#fff;\n      cursor:pointer;\n      font-size:18px;\n      line-height:1;\n    }\n\n    .calendar-grid{\n      display:grid;\n      gap:12px;\n    }\n\n    .calendar-month{\n      display:grid;\n      gap:8px;\n    }\n\n    .calendar-month-title{\n      font-size:13px;\n      font-weight:800;\n      color:rgba(255,255,255,.86);\n      text-transform:capitalize;\n    }\n\n    .calendar-month-grid{\n      display:grid;\n      grid-template-columns:repeat(7,1fr);\n      gap:6px;\n    }\n\n    .calendar-day{\n      text-align:center;\n      padding:7px 4px;\n      border-radius:10px;\n      opacity:.65;\n      border:1px solid rgba(255,255,255,.08);\n      background:rgba(255,255,255,.03);\n      min-height:48px;\n      display:grid;\n      align-content:center;\n      gap:3px;\n    }\n\n    .calendar-day span{\n      font-size:13px;\n      font-weight:700;\n      line-height:1;\n    }\n\n    .calendar-day small{\n      font-size:10px;\n      color:rgba(255,255,255,.72);\n      line-height:1;\n    }\n\n    .calendar-day.active{\n      background:#ff8a00;\n      color:#111827;\n      border-color:#ff8a00;\n      opacity:1;\n    }\n\n    .calendar-day.active small{\n      color:#111827;\n      opacity:.8;\n    }\n\n    .calendar-day.empty{\n      opacity:0;\n      pointer-events:none;\n    }\n\n    .video-carousel-shell{\n      margin-top:14px;\n      display:grid;\n      grid-template-columns:40px minmax(0,1fr) 40px;\n      gap:10px;\n      align-items:center;\n    }\n\n    .video-carousel-nav{\n      width:40px;\n      height:40px;\n      border-radius:12px;\n      border:1px solid var(--line);\n      background:#fff;\n      color:#111827;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .video-carousel-nav:hover{\n      transform:translateY(-1px);\n      border-color:#c6cedd;\n      box-shadow:0 12px 24px rgba(20,29,45,.10);\n    }\n\n    .video-carousel-nav .ac-icon{\n      width:16px;\n      height:16px;\n      display:block;\n    }\n\n    .video-list{\n      display:flex;\n      gap:var(--video-card-gap);\n      overflow-x:auto;\n      padding:2px;\n      scroll-snap-type:x mandatory;\n      scrollbar-width:none;\n      scroll-behavior:smooth;\n    }\n\n    .video-list::-webkit-scrollbar{\n      display:none;\n    }\n\n    .inline-link-btn{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      border-radius:14px;\n      padding:12px 16px;\n      font-weight:800;\n      font-size:14px;\n      text-decoration:none;\n    }\n\n    .inline-link-btn.primary{\n      color:#fff;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      box-shadow:0 12px 24px rgba(255,138,0,.22);\n    }\n\n    .video-card{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:20px;\n      padding:12px;\n      box-shadow:var(--shadow);\n      display:flex;\n      flex-direction:column;\n      gap:10px;\n      cursor:pointer;\n      transition:transform .2s ease, box-shadow .2s ease;\n      flex:0 0 calc((100% - (var(--video-card-gap) * 3)) / 4);\n      min-width:0;\n      scroll-snap-align:start;\n      overflow:hidden;\n      position:relative;\n      isolation:isolate;\n      clip-path:inset(0 round 20px);\n      backface-visibility:hidden;\n    }\n\n    .video-card:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgba(20,29,45,.12);\n    }\n\n    .video-poster{\n      min-height:0;\n      aspect-ratio:9/16;\n      width:100%;\n      border-radius:16px;\n      background:\n        radial-gradient(circle at 20% 20%, rgba(255,138,0,.18), transparent 28%),\n        linear-gradient(135deg,#dfe7f3,#a9b8cb 50%,#6f829a);\n      position:relative;\n      overflow:hidden;\n    }\n\n    .video-poster img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      object-position:center top;\n      display:block;\n    }\n\n    .video-play{\n      position:absolute;\n      inset:0;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      z-index:2;\n    }\n\n    .video-play span{\n      width:56px;\n      height:56px;\n      border-radius:50%;\n      background:rgba(255,255,255,.92);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      color:var(--accent);\n      font-size:22px;\n      box-shadow:0 14px 28px rgba(20,29,45,.14);\n    }\n\n    .video-card h4{\n      margin:0;\n      font-size:14px;\n      line-height:1.35;\n      letter-spacing:-.01em;\n      text-align:left;\n      min-height:38px;\n    }\n\n    .contacts-grid{\n      display:grid;\n      grid-template-columns:repeat(4,minmax(0,1fr));\n      gap:12px;\n      margin:14px 0 12px;\n      justify-content:stretch;\n    }\n\n    .contact-link{\n      display:grid;\n      grid-template-columns:42px 1fr;\n      place-items:center start;\n      gap:12px;\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:18px;\n      padding:12px 14px;\n      text-decoration:none;\n      color:var(--text);\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .contact-link:hover,\n    .social-link:hover,\n    .photo-card:hover{\n      transform:translateY(-2px);\n    }\n\n    .contact-link:hover,\n    .social-link:hover{\n      border-color:#cfd7e5;\n      box-shadow:0 18px 32px rgba(20,29,45,.12);\n    }\n\n    .contact-link .contact-icon{\n      width:42px;\n      height:42px;\n      border-radius:50%;\n      background:#fff1df;\n      color:#d66a00;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:18px;\n      font-weight:800;\n    }\n\n    .contact-link .contact-icon .ac-icon{\n      width:18px;\n      height:18px;\n      display:block;\n    }\n\n    .contact-link strong{\n      display:block;\n      font-size:14px;\n      line-height:1.35;\n    }\n\n    .contact-link span{\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.4;\n    }\n\n    .socials-grid{\n      display:flex;\n      flex-wrap:wrap;\n      gap:10px;\n      margin-top:6px;\n    }\n\n    .social-link{\n      display:inline-flex;\n      align-items:center;\n      justify-content:flex-start;\n      gap:8px;\n      min-height:44px;\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:12px;\n      text-decoration:none;\n      color:var(--text);\n      box-shadow:var(--shadow);\n      padding:0 14px;\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .social-label{\n      font-size:13px;\n      font-weight:700;\n      color:#253247;\n      line-height:1;\n      white-space:nowrap;\n    }\n\n    .social-badge-mark{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-width:30px;\n      height:28px;\n      border-radius:999px;\n      background:#f5f7fb;\n      border:1px solid var(--line);\n      color:#4a5568;\n      font-size:11px;\n      font-weight:900;\n      letter-spacing:.06em;\n      line-height:1;\n      text-transform:uppercase;\n      padding:0 8px;\n    }\n\n    .map-card{\n      margin-top:14px;\n      border:1px solid var(--line);\n      border-radius:22px;\n      overflow:hidden;\n      background:#fff;\n      box-shadow:var(--shadow);\n    }\n\n    .map-preview{\n      min-height:260px;\n      background:#e5ecf6;\n      position:relative;\n      overflow:hidden;\n      padding:0;\n    }\n\n    .map-frame{\n      width:100%;\n      min-height:260px;\n      border:none;\n      display:block;\n      background:#dde6f3;\n    }\n\n    .map-footer{\n      padding:14px;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:12px;\n      flex-wrap:wrap;\n    }\n\n    .map-open-btn{\n      border:none;\n      border-radius:14px;\n      min-height:44px;\n      padding:0 16px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      font-size:13px;\n      font-weight:800;\n      text-decoration:none;\n      box-shadow:0 14px 26px rgba(255,138,0,.24);\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      transition:transform .16s ease, box-shadow .16s ease;\n    }\n\n    .map-open-btn:hover{\n      transform:translateY(-1px);\n      box-shadow:0 18px 34px rgba(255,138,0,.28);\n    }\n\n    .map-address{\n      display:grid;\n      gap:4px;\n      color:#111827;\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .map-address span{\n      color:var(--muted);\n      font-size:13px;\n    }\n\n    .map-trust{\n      display:grid;\n      gap:6px;\n      margin-top:10px;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .review-actions{\n      margin-top:14px;\n    }\n\n    .reviews-rating{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      font-size:14px;\n      margin-bottom:12px;\n    }\n\n    .stars{\n      color:#FF8A00;\n      font-size:14px;\n      letter-spacing:2px;\n      margin:4px 0 6px;\n    }\n\n    .review-grid{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n    }\n\n    .reviews-hero{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:18px;\n      flex-wrap:wrap;\n      margin:14px 0 10px;\n      padding:18px;\n      border-radius:22px;\n      background:linear-gradient(135deg,#fff8f0,#ffffff);\n      border:1px solid var(--line);\n      box-shadow:var(--shadow);\n    }\n\n    .reviews-score-row{\n      display:flex;\n      align-items:center;\n      gap:10px;\n      flex-wrap:wrap;\n      margin-bottom:8px;\n    }\n\n    .reviews-hero-left strong{\n      display:block;\n      font-size:34px;\n      line-height:1;\n      letter-spacing:-.04em;\n      color:#d66a00;\n      margin-bottom:8px;\n    }\n\n    .reviews-hero-left span{\n      display:block;\n      color:#111827;\n      font-size:15px;\n      font-weight:700;\n      line-height:1.4;\n    }\n\n    .reviews-hero-sub{\n      max-width:560px;\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n      align-self:center;\n    }\n\n    .review-source{\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.4;\n      margin-bottom:2px;\n    }\n\n    .faq-empty{\n      display:none;\n      margin-top:14px;\n      padding:14px 16px;\n      border-radius:16px;\n      border:1px dashed var(--line);\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.55;\n      background:#fbfcfe;\n    }\n\n    .faq-empty.visible{\n      display:block;\n    }\n\n    .review-stars{\n      color:#ff9800;\n      font-size:14px;\n      letter-spacing:2px;\n      margin:4px 0 8px;\n    }\n\n    .review-card{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:18px;\n      padding:14px;\n      box-shadow:var(--shadow);\n      transition:transform .2s ease, box-shadow .2s ease;\n    }\n\n    .review-card:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgba(20,29,45,.10);\n    }\n\n    .review-card strong{\n      display:block;\n      margin-bottom:6px;\n      font-size:14px;\n    }\n\n    .review-card span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .review-real{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:20px;\n      padding:16px;\n      box-shadow:var(--shadow);\n      display:grid;\n      gap:12px;\n      transition:transform .2s ease, box-shadow .2s ease;\n    }\n\n    .review-real:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgba(20,29,45,.10);\n    }\n\n    .review-head-real{\n      display:flex;\n      gap:12px;\n      align-items:flex-start;\n    }\n\n    .review-avatar{\n      width:48px;\n      height:48px;\n      border-radius:50%;\n      overflow:hidden;\n      flex:0 0 auto;\n      background:#f5f7fb;\n      border:1px solid var(--line);\n    }\n\n    .review-avatar img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .review-person{\n      min-width:0;\n    }\n\n    .review-person strong{\n      display:block;\n      font-size:14px;\n      line-height:1.35;\n      margin-bottom:4px;\n    }\n\n    .review-meta{\n      color:var(--muted);\n      font-size:12px;\n      line-height:1.4;\n    }\n\n    .review-quote{\n      color:var(--text);\n      font-size:14px;\n      line-height:1.6;\n    }\n\n    .reviews-summary{\n      display:grid;\n      grid-template-columns:220px 1fr;\n      gap:14px;\n      margin-top:14px;\n      align-items:stretch;\n    }\n\n    .reviews-score{\n      background:linear-gradient(135deg,#fff8f0,#ffffff);\n      border:1px solid var(--line);\n      border-radius:22px;\n      padding:18px;\n      box-shadow:var(--shadow);\n      display:flex;\n      flex-direction:column;\n      justify-content:center;\n      text-align:center;\n    }\n\n    .reviews-score strong{\n      font-size:42px;\n      line-height:1;\n      letter-spacing:-.04em;\n      color:#d66a00;\n      margin-bottom:8px;\n    }\n\n    .reviews-score span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .team-grid{\n      display:grid;\n      gap:12px;\n      margin-top:14px;\n      align-items:start;\n    }\n\n    .team-layout{\n      display:grid;\n      grid-template-columns:minmax(300px, 1.1fr) minmax(0, 2fr);\n      gap:12px;\n      align-items:stretch;\n    }\n\n    .team-right{\n      display:grid;\n      grid-template-rows:auto 1fr;\n      gap:12px;\n      min-width:0;\n    }\n\n    .team-core-grid{\n      display:grid;\n      gap:12px;\n      grid-template-columns:repeat(2,minmax(0,1fr));\n      min-width:0;\n    }\n\n    .team-core-grid .team-card{\n      min-height:100%;\n    }\n\n    .team-core-grid .team-card,\n    .team-carousel .team-card{\n      background:#fff !important;\n      border:1px solid var(--line) !important;\n      box-shadow:var(--shadow);\n      background-clip:padding-box;\n      overflow:hidden;\n      position:relative;\n      isolation:isolate;\n      clip-path:inset(0 round 20px);\n      backface-visibility:hidden;\n    }\n\n    .team-carousel-shell{\n      display:grid;\n      grid-template-columns:40px minmax(0,1fr) 40px;\n      gap:10px;\n      align-items:center;\n      min-width:0;\n    }\n\n    .team-carousel-nav{\n      width:40px;\n      height:40px;\n      border-radius:12px;\n      border:1px solid var(--line);\n      background:#fff;\n      color:#111827;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n    }\n\n    .team-carousel-nav:hover{\n      transform:translateY(-1px);\n      border-color:#c6cedd;\n      box-shadow:0 12px 24px rgba(20,29,45,.10);\n    }\n\n    .team-carousel-nav .ac-icon{\n      width:16px;\n      height:16px;\n      display:block;\n    }\n\n    .team-carousel{\n      display:flex;\n      gap:12px;\n      overflow-x:auto;\n      align-items:stretch;\n      padding:2px;\n      scroll-snap-type:x proximity;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n      min-width:0;\n      background:transparent;\n    }\n\n    .team-carousel::-webkit-scrollbar{\n      display:none;\n    }\n\n    .team-carousel .team-card{\n      min-width:calc((100% - 12px) / 2);\n      max-width:calc((100% - 12px) / 2);\n      flex:0 0 calc((100% - 12px) / 2);\n      scroll-snap-align:start;\n      background:#fff;\n      border-color:var(--line);\n    }\n\n    .stay-grid{\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:12px;\n      margin-top:14px;\n    }\n\n    .stay-card{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:20px;\n      overflow:hidden;\n      box-shadow:var(--shadow);\n      display:grid;\n    }\n\n    .stay-card.is-clickable,\n    .mobile-stay-card.is-clickable{\n      cursor:pointer;\n    }\n\n    .stay-card.is-clickable:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgba(20,29,45,.10);\n    }\n\n    .stay-card img{\n      width:100%;\n      height:220px;\n      object-fit:cover;\n      display:block;\n    }\n\n    .stay-card-body{\n      padding:14px;\n      display:grid;\n      gap:6px;\n    }\n\n    .stay-card-body strong{\n      font-size:15px;\n      line-height:1.35;\n    }\n\n    .stay-card-body span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .stay-card.placeholder .stay-placeholder{\n      min-height:220px;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      text-align:center;\n      padding:20px;\n      background:\n        radial-gradient(circle at 20% 20%, rgba(255,138,0,.10), transparent 26%),\n        linear-gradient(135deg,#f6f8fb,#eef2f7);\n      color:#607086;\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .team-card{\n      background:#fff;\n      border:1px solid var(--line);\n      border-radius:20px;\n      padding:16px;\n      text-align:center;\n      display:grid;\n      gap:8px;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease;\n    }\n\n    .team-card:hover{\n      transform:translateY(-2px);\n      box-shadow:0 22px 42px rgba(20,29,45,.10);\n    }\n\n    .team-avatar{\n      width:88px;\n      height:88px;\n      border-radius:50%;\n      margin:0 auto 12px;\n      background:linear-gradient(135deg,#ffd8b3,#ffb15e);\n      overflow:hidden;\n      border:1px solid var(--line);\n    }\n\n    .team-avatar img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .team-card strong{\n      display:block;\n      margin-bottom:6px;\n      font-size:15px;\n    }\n\n    .team-card span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.45;\n    }\n\n    .team-role{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.45;\n      font-weight:700;\n    }\n\n    .book-team-card{\n      background:linear-gradient(135deg,#fff7ef,#ffffff);\n      border:2px solid rgba(255,138,0,.26);\n      text-align:left;\n      align-content:start;\n      gap:10px;\n      padding:14px;\n      height:100%;\n    }\n\n    .book-team-cover-wrap{\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      min-height:180px;\n      border-radius:16px;\n      background:\n        radial-gradient(circle at 20% 20%, rgba(255,138,0,.10), transparent 26%),\n        linear-gradient(135deg,#fff8f1,#fff);\n      overflow:hidden;\n    }\n\n    .book-team-cover{\n      width:100%;\n      max-width:170px;\n      height:auto;\n      display:block;\n      object-fit:contain;\n      filter:drop-shadow(0 16px 24px rgba(0,0,0,.12));\n    }\n\n    .book-team-title{\n      font-size:24px;\n      line-height:1.1;\n      letter-spacing:-.04em;\n      color:#111827;\n      font-weight:900;\n      margin-top:2px;\n    }\n\n    .book-team-sub{\n      color:#495569;\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .book-team-proof{\n      color:#111827;\n      font-size:12px;\n      line-height:1.55;\n      font-weight:700;\n    }\n\n    .book-team-cta{\n      margin-top:4px;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:44px;\n      padding:0 16px;\n      border-radius:12px;\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n      text-decoration:none;\n      font-size:14px;\n      font-weight:800;\n      box-shadow:0 16px 32px rgba(255,138,0,.18);\n      align-self:flex-start;\n    }\n\n    .success-secondary{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:40px;\n      padding:0 14px;\n      border-radius:12px;\n      border:1px solid var(--line);\n      background:#fff;\n      color:var(--text);\n      text-decoration:none;\n      font-size:13px;\n      font-weight:700;\n      white-space:nowrap;\n      box-shadow:none;\n    }\n\n    /* duplicate compact hero nav removed */\n\n    .mobile-hero-nav{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n      margin:10px 0 0;\n      position:relative;\n      z-index:2;\n      align-items:center;\n      min-width:0;\n    }\n\n    .mini-nav-link{\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      min-height:34px;\n      padding:0 11px;\n      border-radius:999px;\n      background:rgba(255,255,255,.10);\n      border:1px solid rgba(255,255,255,.14);\n      color:#fff;\n      text-decoration:none;\n      font-size:12px;\n      font-weight:800;\n      backdrop-filter:blur(10px);\n      gap:6px;\n      min-width:0;\n    }\n\n    .mini-nav-link.icon{\n      min-width:34px;\n      width:34px;\n      padding:0;\n    }\n\n    .mini-nav-link img{\n      width:14px;\n      height:14px;\n      filter:brightness(0) invert(1);\n    }\n\n    .mobile-brand{\n      padding:8px;\n      width:40px;\n      height:40px;\n      justify-content:center;\n      border-radius:12px;\n    }\n\n    .mobile-brand-wrap{\n      display:flex;\n      align-items:center;\n      gap:8px;\n      min-width:0;\n      flex:1 1 auto;\n    }\n\n    .mobile-brand-meta{\n      display:grid;\n      gap:2px;\n      min-width:0;\n    }\n\n    .mobile-brand-label{\n      font-size:11px;\n      font-weight:700;\n      line-height:1.2;\n      color:rgba(255,255,255,.9);\n      text-shadow:0 1px 2px rgba(0,0,0,.3);\n      white-space:nowrap;\n      overflow:hidden;\n      text-overflow:ellipsis;\n      letter-spacing:.01em;\n    }\n\n    .mobile-mode-inline{\n      display:inline-flex;\n      align-items:center;\n      gap:6px;\n      padding:4px;\n      border-radius:12px;\n      background:rgba(8,12,18,.62);\n      border:1px solid rgba(255,255,255,.14);\n      box-shadow:0 8px 24px rgba(0,0,0,.18);\n      backdrop-filter:blur(10px);\n      flex:0 0 auto;\n      margin-left:auto;\n      max-width:52%;\n    }\n\n    .mobile-mode-inline .mobile-mode-toggle{\n      min-height:30px;\n      padding:2px 8px 2px 5px;\n      gap:6px;\n      background:transparent;\n      border-color:rgba(255,255,255,.1);\n      box-shadow:none;\n    }\n\n    .mobile-mode-inline .mobile-mode-toggle-label{\n      font-size:10px;\n    }\n\n    .mobile-hero-tools{\n      width:100%;\n      justify-content:space-between;\n      align-items:flex-start;\n      gap:8px;\n      min-width:0;\n    }\n\n    .mobile-hero .hero-topbar{\n      margin-bottom:10px;\n    }\n\n    .mobile-hero-nav-primary{\n      margin-top:8px;\n    }\n\n    .mobile-hero-nav-secondary{\n      margin-top:6px;\n    }\n\n    .trust-callout{\n      margin-bottom:14px;\n      border-radius:22px;\n      padding:18px;\n      border:1px solid var(--line);\n      background:\n        radial-gradient(circle at 15% 20%, rgba(255,138,0,.12), transparent 24%),\n        linear-gradient(135deg,#fff8f0,#ffffff);\n      box-shadow:var(--shadow);\n    }\n\n    .trust-callout h4{\n      margin:0 0 8px;\n      font-size:22px;\n      letter-spacing:-.03em;\n      line-height:1.15;\n    }\n\n    .trust-callout p{\n      margin:0;\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n    }\n\n    .book-card{\n      margin-top:14px;\n      display:grid;\n      grid-template-columns:1fr auto;\n      gap:14px;\n      align-items:center;\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:22px;\n      padding:16px;\n      box-shadow:var(--shadow);\n    }\n\n    .book-card h4{\n      margin:0 0 6px;\n      font-size:18px;\n      letter-spacing:-.02em;\n    }\n\n    .book-card p{\n      margin:0;\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .faq-groups{\n      display:grid;\n      gap:12px;\n      margin-top:14px;\n    }\n\n    .faq-filter-row{\n      display:flex;\n      gap:8px;\n      flex-wrap:wrap;\n      margin:14px 0 6px;\n    }\n\n    .faq-filter-chip{\n      border:none;\n      border-radius:999px;\n      padding:10px 12px;\n      background:#f5f7fb;\n      color:#111827;\n      font-size:12px;\n      font-weight:800;\n      cursor:pointer;\n      box-shadow:var(--shadow);\n      transition:transform .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease;\n    }\n\n    .faq-filter-chip:hover{\n      transform:translateY(-1px);\n      box-shadow:0 14px 26px rgba(20,29,45,.10);\n    }\n\n    .faq-filter-chip.active{\n      background:linear-gradient(135deg,var(--accent),var(--accent-2));\n      color:#fff;\n    }\n\n    .faq-group{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:20px;\n      padding:16px;\n      box-shadow:var(--shadow);\n      transition:transform .18s ease, box-shadow .18s ease;\n    }\n\n    .faq-group:hover{\n      transform:translateY(-1px);\n      box-shadow:0 22px 42px rgba(20,29,45,.10);\n    }\n\n    .faq-group-head{\n      display:flex;\n      align-items:center;\n      gap:10px;\n      margin-bottom:12px;\n    }\n\n    .faq-icon{\n      width:36px;\n      height:36px;\n      border-radius:12px;\n      background:#fff1df;\n      color:#d66a00;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:12px;\n      font-weight:800;\n      text-transform:uppercase;\n      letter-spacing:.06em;\n      flex:0 0 auto;\n    }\n\n    .faq-group-head strong{\n      font-size:16px;\n      letter-spacing:-.01em;\n    }\n\n    .faq-list{\n      display:grid;\n      gap:10px;\n    }\n\n    .faq-line{\n      padding:12px 14px;\n      border-radius:16px;\n      background:#fafbfd;\n      border:1px solid #eef1f5;\n    }\n\n    .faq-line strong{\n      display:block;\n      margin-bottom:6px;\n      font-size:14px;\n      line-height:1.45;\n    }\n\n    .faq-line span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.6;\n    }\n\n    .faq-grid{\n      display:grid;\n      gap:10px;\n    }\n\n    .faq-item{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:18px;\n      padding:14px 16px;\n    }\n\n    .faq-item strong{\n      display:block;\n      margin-bottom:6px;\n      font-size:15px;\n    }\n\n    .faq-item span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n    }\n\n    .contacts-row{\n      display:grid;\n      grid-template-columns:repeat(4,1fr);\n      gap:12px;\n    }\n\n    .contact-card{\n      border:1px solid var(--line);\n      background:#fff;\n      border-radius:18px;\n      padding:16px;\n      text-align:center;\n    }\n\n    .contact-icon{\n      width:42px;\n      height:42px;\n      border-radius:50%;\n      margin:0 auto 10px;\n      background:#fff1df;\n      color:#d66a00;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      font-size:18px;\n      font-weight:800;\n    }\n\n    footer{\n      padding:18px;\n      background:#fff;\n      border-radius:24px;\n      border:1px solid var(--line);\n      display:grid;\n      grid-template-columns:repeat(3,1fr);\n      gap:20px;\n    }\n\n    footer h4{\n      margin:0 0 8px;\n      font-size:14px;\n    }\n\n    footer a, footer div{\n      display:block;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.8;\n      text-decoration:none;\n    }\n\n    .footer-legal-links{\n      margin-top:6px;\n      padding-top:8px;\n      border-top:1px dashed #d9e1ed;\n      display:grid;\n      gap:2px;\n    }\n\n    .footer-org-meta{\n      margin-top:8px;\n      display:grid;\n      gap:2px;\n      padding-top:8px;\n      border-top:1px dashed #e1e7f0;\n    }\n\n    .footer-org-meta div{\n      line-height:1.55;\n      font-size:12px;\n      color:#6d7586;\n    }\n\n    .legal-links-grid{\n      display:grid;\n      gap:8px;\n      margin-top:8px;\n    }\n\n    .legal-links-grid a{\n      color:#4a5568;\n      font-size:14px;\n      line-height:1.55;\n      text-decoration:none;\n    }\n\n    .legal-links-grid a:hover{\n      color:#1f2937;\n      text-decoration:underline;\n    }\n\n    .legal-meta-grid{\n      margin-top:10px;\n      padding-top:10px;\n      border-top:1px dashed #dce5f1;\n      display:grid;\n      gap:4px;\n      color:#6d7586;\n      font-size:12px;\n      line-height:1.55;\n    }\n\n    .footer-copyright-mini{\n      margin-top:8px;\n      font-size:11px;\n      line-height:1.35;\n      color:#8a93a3;\n    }\n\n    .mobile-journey-band{\n      margin-top:8px;\n    }\n\n    .overlay{\n      position:fixed;\n      inset:0;\n      background:linear-gradient(90deg, rgba(9,14,22,.72) 0%, rgba(9,14,22,.62) 62%, rgba(9,14,22,.24) 100%);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:24px;\n      z-index:var(--z-overlay);\n      animation:fade-in .18s ease;\n    }\n\n    .overlay-card{\n      width:min(100%, 520px);\n      background:#fff;\n      border-radius:26px;\n      box-shadow:0 25px 55px rgba(20,29,45,.16);\n      padding:22px;\n      border:1px solid #edf0f5;\n      animation:modal-up .22s ease;\n    }\n\n    /* Unified geometry for booking flow modals:\n       \"Ищем цену\" -> \"Нашли лучшие условия\" -> \"Оформление брони\" */\n    #offerOverlay,\n    #formDrawer{\n      align-items:center;\n      justify-content:center;\n    }\n\n    #offerOverlay .overlay-card,\n    #formDrawer .form-panel{\n      width:min(100%, 420px);\n      min-height:min(86vh, 430px);\n      max-height:min(86vh, 430px);\n      border-radius:24px;\n    }\n\n    #offerOverlay .overlay-card{\n      padding:14px;\n      overflow:auto;\n    }\n\n    #formDrawer .form-panel{\n      padding:14px;\n      overflow:auto;\n    }\n\n    .overlay-card.success-card{\n      width:min(100%, 720px);\n      min-height:min(92vh, 620px);\n      max-height:min(92vh, 860px);\n      padding:24px 22px 26px;\n      overflow:auto;\n      border-radius:28px;\n    }\n\n    .section-modal-card{\n      width:min(100%, 980px);\n      max-height:min(90vh, 920px);\n      padding:0;\n      overflow:hidden;\n      display:flex;\n      flex-direction:column;\n      background:#f4f7fb;\n      position:relative;\n    }\n\n    .overlay.section-modal-compact{\n      align-items:flex-start;\n      justify-content:flex-start;\n      padding:0;\n      background:linear-gradient(90deg, rgba(9,14,22,.70) 0%, rgba(9,14,22,.58) 62%, rgba(9,14,22,.20) 100%);\n    }\n\n    .overlay.section-modal-compact .section-modal-card{\n      position:fixed;\n      left:var(--section-modal-compact-runtime-left, 18px);\n      top:var(--section-modal-compact-runtime-top, 84px);\n      right:auto;\n      width:var(--section-modal-compact-runtime-width, var(--section-modal-compact-width));\n      height:var(--section-modal-compact-runtime-height, var(--section-modal-compact-max-height));\n      max-width:calc(100vw - var(--section-modal-compact-runtime-left, 18px) - 18px);\n      max-height:calc(100vh - var(--section-modal-compact-runtime-top, 84px) - 14px);\n      margin:0;\n      border-radius:20px;\n      overflow:visible;\n      box-shadow:0 20px 56px rgba(7,12,20,.30);\n    }\n\n    .overlay.section-modal-compact .section-modal-head{\n      display:none !important;\n    }\n\n    .overlay.section-modal-compact .section-modal-head,\n    .overlay.section-modal-mobile .section-modal-head{\n      padding:14px 16px;\n    }\n\n    .overlay.section-modal-compact .section-modal-head h3,\n    .overlay.section-modal-mobile .section-modal-head h3{\n      font-size:20px;\n    }\n\n    .overlay.section-modal-compact .section-modal-body,\n    .overlay.section-modal-mobile .section-modal-body{\n      padding:14px;\n      min-height:0;\n      flex:1 1 auto;\n      overflow-y:auto;\n      overscroll-behavior:contain;\n      -webkit-overflow-scrolling:touch;\n      touch-action:pan-y;\n    }\n\n    .overlay.section-modal-compact .section-modal-body{\n      height:auto;\n      max-height:none;\n      padding:16px;\n      min-height:0;\n      flex:1 1 auto;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-card > h3,\n    .overlay.section-modal-compact .section-modal-body .media-head h3{\n      display:none;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts{\n      display:grid;\n      grid-template-columns:minmax(0,1fr) minmax(290px,340px);\n      align-items:stretch;\n      grid-template-rows:auto minmax(0,1fr) auto;\n      gap:10px;\n      margin-bottom:0;\n      min-height:0;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .section-lead{\n      grid-column:1 / -1;\n      margin:0 0 4px;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .map-card{\n      grid-column:1;\n      grid-row:2;\n      align-self:stretch;\n      min-height:0;\n      height:100%;\n      margin-top:0;\n      display:grid;\n      grid-template-rows:minmax(300px,1fr) auto;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .contacts-grid{\n      grid-column:2;\n      grid-row:2;\n      display:flex;\n      flex-direction:column;\n      justify-content:flex-start;\n      gap:8px;\n      margin:0;\n      align-self:stretch;\n      min-height:0;\n      height:100%;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .socials-grid{\n      grid-column:1 / -1;\n      grid-row:3;\n      display:flex;\n      flex-wrap:wrap;\n      gap:6px;\n      margin:0;\n      align-self:start;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .contact-link{\n      min-height:40px;\n      grid-template-columns:36px 1fr;\n      gap:10px;\n      padding:10px 10px;\n      border-radius:14px;\n      min-width:0;\n      align-items:center;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .contact-link strong,\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .contact-link span{\n      white-space:normal;\n      overflow:visible;\n      text-overflow:clip;\n      overflow-wrap:anywhere;\n      word-break:normal;\n      line-height:1.25;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .map-preview,\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .map-frame{\n      min-height:300px;\n      height:min(50vh, 420px);\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .map-footer{\n      padding:10px 12px;\n      min-height:0;\n      gap:10px;\n      align-items:flex-start;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .map-address{\n      font-size:13px;\n      gap:4px;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .map-address > div{\n      display:block;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .map-address > span{\n      display:block;\n      -webkit-box-orient:initial;\n      -webkit-line-clamp:initial;\n      overflow:visible;\n      font-size:12px;\n      line-height:1.38;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .map-open-btn{\n      min-height:34px;\n      border-radius:10px;\n      padding:0 12px;\n      font-size:12px;\n      font-weight:800;\n      box-shadow:0 10px 18px rgba(255,138,0,.20);\n      white-space:nowrap;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .social-link{\n      width:34px;\n      min-width:34px;\n      height:34px;\n      min-height:34px;\n      padding:0;\n      border-radius:999px;\n      justify-content:center;\n      box-shadow:none;\n      background:#fff;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .social-label{\n      display:none;\n    }\n\n    .overlay.section-modal-compact .section-modal-body .section-modal-contacts .social-badge-mark{\n      min-width:0;\n      height:auto;\n      padding:0;\n      border:none;\n      background:transparent;\n      border-radius:0;\n      font-size:10px;\n      line-height:1;\n    }\n\n    .section-modal-close-floating{\n      position:absolute;\n      top:-14px;\n      bottom:auto;\n      right:-14px;\n      z-index:20;\n      display:none;\n    }\n\n    .overlay.section-modal-compact .section-modal-close-floating{\n      display:flex;\n      top:-14px;\n      bottom:auto;\n      right:-14px;\n      left:auto;\n      transform:none;\n      position:absolute;\n    }\n\n    .overlay.section-modal-compact .form-close.section-modal-close-floating{\n      width:36px;\n      height:36px;\n      border-radius:11px;\n      background:rgba(255,255,255,.90);\n      color:rgba(17,24,39,.96);\n      box-shadow:0 10px 22px rgba(15,23,42,.28);\n      border:1px solid rgba(255,255,255,.52);\n      backdrop-filter:blur(4px);\n      transition:transform .16s ease, background .16s ease, border-color .16s ease;\n    }\n\n    .overlay.section-modal-compact .section-modal-body > p:first-child,\n    .overlay.section-modal-compact .section-modal-body > .section-lead,\n    .overlay.section-modal-compact .section-modal-body .section-card > .section-lead{\n      padding-right:72px;\n    }\n\n    .overlay.section-modal-compact .form-close.section-modal-close-floating:hover{\n      background:rgba(255,255,255,.44);\n      border-color:rgba(255,255,255,.78);\n      animation:close-float-wiggle .22s ease-out 1;\n    }\n\n    @keyframes close-float-wiggle{\n      0%{\n        transform:translate3d(0,0,0);\n      }\n      50%{\n        transform:translate3d(0,-1px,0);\n      }\n      100%{\n        transform:translate3d(0,0,0);\n      }\n    }\n\n    .overlay.section-modal-mobile{\n      align-items:flex-end;\n      justify-content:center;\n      padding:0;\n      background:linear-gradient(90deg, rgba(9,14,22,.72) 0%, rgba(9,14,22,.62) 62%, rgba(9,14,22,.24) 100%);\n    }\n\n    .overlay.section-modal-mobile .section-modal-card{\n      width:100%;\n      max-width:100%;\n      max-height:84vh;\n      border-radius:20px 20px 0 0;\n    }\n\n    .section-modal-head{\n      padding:16px 18px;\n      border-bottom:1px solid #e5ebf4;\n      background:#fff;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:10px;\n    }\n\n    .section-modal-head h3{\n      margin:0;\n      font-size:22px;\n      letter-spacing:-.02em;\n      color:#111827;\n    }\n\n    .section-modal-body{\n      padding:18px;\n      overflow:auto;\n      display:grid;\n      gap:12px;\n      min-height:0;\n      flex:1 1 auto;\n      overscroll-behavior:contain;\n      -webkit-overflow-scrolling:touch;\n    }\n\n    .section-modal-body .section-card{\n      margin:0;\n      border-radius:20px;\n      box-shadow:none;\n    }\n\n    .section-modal-body .section-card h3{\n      display:none;\n    }\n\n    .overlay-card.dark{\n      background:#121821;\n      border-color:rgba(255,255,255,.08);\n      color:#fff;\n    }\n\n    .overlay-card h3{\n      margin:0 0 8px;\n      font-size:24px;\n      letter-spacing:-.03em;\n    }\n\n    .overlay-card p{\n      margin:0 0 16px;\n      color:var(--muted);\n      line-height:1.55;\n      font-size:14px;\n    }\n\n    .notice-card{\n      width:min(100%, 430px);\n      padding:18px;\n    }\n\n    .notice-card .form-head{\n      margin-bottom:4px;\n    }\n\n    .notice-message{\n      margin:0;\n      color:var(--muted);\n      line-height:1.4;\n      font-size:13px;\n    }\n\n    .overlay-card.dark p{\n      color:rgba(255,255,255,.72);\n    }\n\n    .mobile-faq-list,\n    .mobile-team-list,\n    .mobile-stay-list,\n    .mobile-contacts-list{\n      display:grid;\n      gap:10px;\n      margin-top:10px;\n    }\n\n    .mobile-faq-card,\n    .mobile-team-card,\n    .mobile-stay-card,\n    .mobile-contact-card{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      padding:12px;\n      box-shadow:var(--shadow);\n    }\n\n    .mobile-faq-card strong,\n    .mobile-team-card strong,\n    .mobile-stay-card strong,\n    .mobile-contact-card strong{\n      display:block;\n      margin:0 0 6px;\n      font-size:14px;\n      line-height:1.45;\n      color:#111827;\n    }\n\n    .mobile-contact-card strong:last-child{\n      margin-bottom:0;\n    }\n\n    .mobile-contact-card{\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      min-height:42px;\n      padding:10px 8px;\n      text-align:center;\n      overflow:hidden;\n      color:#111827;\n      text-decoration:none;\n    }\n\n    .mobile-contact-card:visited,\n    .mobile-contact-card:hover,\n    .mobile-contact-card:active,\n    .mobile-contact-card:focus-visible{\n      color:#111827;\n      text-decoration:none;\n    }\n\n    .mobile-contact-card strong{\n      margin:0;\n      font-size:13px;\n      line-height:1.2;\n      white-space:nowrap;\n      overflow:hidden;\n      text-overflow:ellipsis;\n    }\n\n    .mobile-faq-card span,\n    .mobile-team-card span,\n    .mobile-stay-card span,\n    .mobile-contact-card span{\n      display:block;\n      margin:0;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .mobile-team-card{\n      display:grid;\n      grid-template-columns:56px 1fr;\n      gap:10px;\n      align-items:start;\n    }\n\n    .mobile-team-avatar{\n      width:56px;\n      height:56px;\n      border-radius:50%;\n      overflow:hidden;\n      border:1px solid var(--line);\n      background:#f3f6fb;\n    }\n\n    .mobile-team-avatar img{\n      width:100%;\n      height:100%;\n      display:block;\n      object-fit:cover;\n    }\n\n    .mobile-team-feature-card,\n    .mobile-team-founder-card,\n    .mobile-team-carousel-block{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:11px;\n    }\n\n    .mobile-team-feature-card{\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-team-feature-cover-wrap{\n      border-radius:10px;\n      overflow:hidden;\n      border:1px solid #d9e2ee;\n      height:108px;\n      padding:6px;\n      cursor:pointer;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      background:#f7fafc;\n    }\n\n    .mobile-team-feature-cover{\n      width:100%;\n      height:100%;\n      object-fit:contain;\n      object-position:center top;\n      display:block;\n    }\n\n    .mobile-team-feature-card strong{\n      margin:0;\n      font-size:15px;\n      line-height:1.28;\n      color:#111827;\n    }\n\n    .mobile-team-feature-card span{\n      margin:0;\n      color:#5b6474;\n      font-size:12px;\n      line-height:1.45;\n      display:block;\n    }\n\n    .mobile-team-feature-link{\n      color:var(--accent);\n      font-weight:700;\n      text-decoration:underline;\n      text-underline-offset:2px;\n      white-space:nowrap;\n    }\n\n    .mobile-team-founder-card{\n      display:grid;\n      grid-template-columns:48px 1fr;\n      column-gap:10px;\n      row-gap:4px;\n      align-items:start;\n    }\n\n    .mobile-team-founder-card .mobile-team-avatar{\n      width:48px;\n      height:48px;\n      grid-row:1 / span 3;\n    }\n\n    .mobile-team-founder-card strong{\n      margin:0;\n      font-size:15px;\n      line-height:1.25;\n      color:#111827;\n    }\n\n    .mobile-team-role{\n      color:#6b7280;\n      font-size:11px;\n      line-height:1.3;\n      font-weight:700;\n    }\n\n    .mobile-team-founder-card p{\n      margin:2px 0 0;\n      color:#4b5563;\n      font-size:12px;\n      line-height:1.4;\n      display:-webkit-box;\n      -webkit-box-orient:vertical;\n      -webkit-line-clamp:3;\n      overflow:hidden;\n    }\n\n    .mobile-team-carousel-head{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:8px;\n      margin-bottom:8px;\n    }\n\n    .mobile-team-carousel-head strong{\n      margin:0;\n      font-size:14px;\n      line-height:1.25;\n      color:#111827;\n    }\n\n    .mobile-team-carousel-track{\n      display:flex;\n      gap:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-team-carousel-track::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-team-teacher-card{\n      min-width:178px;\n      width:178px;\n      border:1px solid #dbe3ef;\n      border-radius:12px;\n      background:#f8fbff;\n      padding:10px;\n      display:grid;\n      grid-template-columns:40px 1fr;\n      column-gap:8px;\n      row-gap:3px;\n      align-items:start;\n      flex:0 0 auto;\n    }\n\n    .mobile-team-teacher-card .mobile-team-avatar{\n      width:40px;\n      height:40px;\n      grid-row:1 / span 2;\n    }\n\n    .mobile-team-teacher-card strong{\n      margin:0;\n      font-size:13px;\n      line-height:1.2;\n      color:#111827;\n    }\n\n    .mobile-stay-card{\n      display:grid;\n      grid-template-columns:84px 1fr;\n      gap:10px;\n      align-items:start;\n    }\n\n    .mobile-stay-feature{\n      border:1px solid var(--line);\n      border-radius:14px;\n      background:#fff;\n      box-shadow:var(--shadow);\n      padding:10px;\n      display:grid;\n      gap:8px;\n    }\n\n    .mobile-stay-feature-photo{\n      border:none;\n      padding:0;\n      width:100%;\n      height:148px;\n      border-radius:10px;\n      overflow:hidden;\n      background:#0f172a;\n      cursor:pointer;\n    }\n\n    .mobile-stay-feature-photo img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-stay-feature strong{\n      margin:0;\n      font-size:15px;\n      line-height:1.3;\n      color:#111827;\n    }\n\n    .mobile-stay-feature p{\n      margin:0;\n      color:#5b6474;\n      font-size:12px;\n      line-height:1.42;\n    }\n\n    .mobile-stay-preview-strip{\n      display:flex;\n      gap:8px;\n      margin-top:8px;\n      overflow-x:auto;\n      padding-bottom:4px;\n      -webkit-overflow-scrolling:touch;\n      scrollbar-width:none;\n    }\n\n    .mobile-stay-preview-strip::-webkit-scrollbar{\n      display:none;\n    }\n\n    .mobile-stay-preview-thumb{\n      border:none;\n      padding:0;\n      min-width:72px;\n      width:72px;\n      height:54px;\n      border-radius:10px;\n      overflow:hidden;\n      opacity:.78;\n      cursor:pointer;\n      box-shadow:0 4px 10px rgba(15,23,42,.08);\n      flex:0 0 auto;\n      background:#e5eaf3;\n      transition:opacity .18s ease, transform .18s ease, box-shadow .18s ease;\n    }\n\n    .mobile-stay-preview-thumb img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-stay-preview-thumb.active{\n      opacity:1;\n      transform:translateY(-1px);\n      box-shadow:0 8px 14px rgba(15,23,42,.18);\n    }\n\n    .mobile-stay-thumb{\n      width:84px;\n      height:70px;\n      border-radius:10px;\n      overflow:hidden;\n      border:1px solid var(--line);\n      background:#f3f6fb;\n    }\n\n    .mobile-stay-thumb img{\n      width:100%;\n      height:100%;\n      object-fit:cover;\n      display:block;\n    }\n\n    .mobile-contact-card a{\n      color:#111827;\n      text-decoration:none;\n      font-weight:700;\n      font-size:16px;\n      line-height:1.3;\n    }\n\n    .mobile-socials-row{\n      margin-top:10px;\n      display:flex;\n      flex-wrap:wrap;\n      gap:8px;\n    }\n\n    .mobile-social-link{\n      min-height:38px;\n      border-radius:999px;\n      border:1px solid var(--line);\n      background:#fff;\n      text-decoration:none;\n      color:#111827;\n      display:inline-flex;\n      align-items:center;\n      justify-content:flex-start;\n      gap:6px;\n      padding:0 10px;\n      box-shadow:var(--shadow);\n    }\n\n    .mobile-social-icon{\n      width:20px;\n      height:20px;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n    }\n\n    .mobile-social-icon .social-badge-mark{\n      min-width:0;\n      width:auto;\n      height:auto;\n      border:none;\n      background:transparent;\n      color:#111827;\n      padding:0;\n      font-size:11px;\n      letter-spacing:.06em;\n    }\n\n    .mobile-social-label{\n      font-size:12px;\n      font-weight:700;\n      color:#253247;\n      line-height:1;\n      white-space:nowrap;\n    }\n\n    .big-price{\n      font-size:42px;\n      font-weight:900;\n      letter-spacing:-.04em;\n      margin-bottom:8px;\n    }\n\n    .offer-headline{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:10px;\n      margin-bottom:8px;\n    }\n\n    .offer-card-stable{\n      min-height:0;\n      height:auto;\n      max-height:min(86vh, 430px);\n      overflow:hidden;\n    }\n\n    .offer-state-shell{\n      display:flex;\n      flex-direction:column;\n      min-height:100%;\n      height:100%;\n    }\n\n    .offer-state-shell--search,\n    .offer-state-shell--result{\n      gap:8px;\n    }\n\n    .offer-state-shell--result .overlay-actions{\n      margin-top:auto;\n    }\n\n    .offer-state-shell--result .offer-booking-block{\n      margin-top:4px;\n      padding:10px;\n      gap:6px;\n    }\n\n    .offer-state-shell--result .offer-booking-note{\n      margin:0;\n      font-size:13px;\n      line-height:1.35;\n    }\n\n    .offer-headline h3{\n      margin:0;\n      font-size:32px;\n      line-height:1.06;\n    }\n\n    .offer-close-placeholder{\n      visibility:hidden;\n      pointer-events:none;\n    }\n\n    .offer-close-btn{\n      width:36px;\n      height:36px;\n      border-radius:10px;\n      background:transparent;\n      border:none;\n      color:rgba(17,24,39,.72);\n      box-shadow:none;\n      cursor:pointer;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:0;\n      line-height:0;\n    }\n\n    .overlay-card.dark .offer-close-btn{\n      background:transparent;\n      border:none;\n      color:#fff;\n    }\n\n    .media-close .ac-icon,\n    .video-close .ac-icon,\n    .offer-close-btn .ac-icon{\n      width:16px;\n      height:16px;\n      display:block;\n      margin:0;\n      transform:translate(0.5px, 0.5px);\n      filter:brightness(0) invert(1) drop-shadow(0 1px 1px rgba(0,0,0,.45));\n    }\n\n    .offer-close-btn .ac-icon{\n      filter:brightness(0) saturate(100%) invert(14%) sepia(13%) saturate(897%) hue-rotate(182deg) brightness(95%) contrast(90%);\n    }\n\n    .overlay-card.dark .offer-close-btn .ac-icon{\n      filter:brightness(0) invert(1) drop-shadow(0 1px 1px rgba(0,0,0,.45));\n    }\n\n    .overlay.section-modal-compact .form-close.section-modal-close-floating .ac-icon{\n      width:16px;\n      height:16px;\n      display:block;\n      filter:brightness(0) saturate(100%) invert(8%) sepia(9%) saturate(1128%) hue-rotate(182deg) brightness(95%) contrast(95%);\n    }\n\n    .offer-progress-track{\n      height:10px;\n      border-radius:999px;\n      background:#e8edf5;\n      overflow:hidden;\n      margin:4px 0 12px;\n    }\n\n    .overlay-card.dark .offer-progress-track{\n      background:rgba(255,255,255,.12);\n    }\n\n    .offer-progress-fill{\n      width:0%;\n      height:100%;\n      border-radius:999px;\n      background:linear-gradient(90deg,#ff8a00,#ffb15e);\n      transition:width 1.15s cubic-bezier(.22,1,.36,1);\n    }\n\n    .offer-progress-steps{\n      display:grid;\n      gap:8px;\n      margin-top:6px;\n      margin-bottom:2px;\n    }\n\n    .offer-progress-step{\n      color:#6b7280;\n      font-size:12px;\n      line-height:1.45;\n    }\n\n    .overlay-card.dark .offer-progress-step{\n      color:rgba(255,255,255,.62);\n    }\n\n    .offer-progress-step.active{\n      color:#111827;\n      font-weight:800;\n    }\n\n    .overlay-card.dark .offer-progress-step.active{\n      color:#fff;\n    }\n\n    .offer-state-shell--search-legacy,\n    .offer-state-shell--result-legacy{\n      min-height:100%;\n      height:100%;\n    }\n\n    .offer-state-shell--search-legacy{\n      align-items:center;\n      justify-content:center;\n      text-align:center;\n      gap:14px;\n    }\n\n    .offer-state-shell--search-legacy .offer-headline h3{\n      font-size:28px;\n      line-height:1.06;\n      letter-spacing:-.03em;\n    }\n\n    .offer-legacy-search-icon{\n      width:68px;\n      height:68px;\n      border-radius:22px;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      background:#fff;\n      border:none;\n      box-shadow:none;\n    }\n\n    .offer-legacy-search-icon__asset{\n      width:38px;\n      height:38px;\n      display:block;\n      object-fit:contain;\n    }\n\n    .offer-legacy-status{\n      margin:0;\n      color:#111827;\n      font-size:20px;\n      line-height:1.2;\n      font-weight:700;\n      min-height:48px;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n    }\n\n    .offer-progress-track--legacy{\n      width:100%;\n      height:12px;\n      margin:2px 0 4px;\n    }\n\n    .offer-legacy-note{\n      margin:0;\n      color:#6b7280;\n      font-size:14px;\n      line-height:1.22;\n      font-weight:600;\n    }\n\n    .offer-state-shell--result-legacy{\n      gap:12px;\n      justify-content:space-between;\n    }\n\n    .offer-legacy-result-banner{\n      display:flex;\n      align-items:center;\n      gap:14px;\n      padding:14px 16px;\n      border-radius:14px;\n      border:1px solid rgba(255,119,0,.22);\n      background:linear-gradient(135deg,#fff8ef,#fff3e0);\n    }\n\n    .offer-legacy-result-banner__icon{\n      width:54px;\n      height:54px;\n      border-radius:14px;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      background:#fff;\n      border:none;\n      box-shadow:none;\n      flex:0 0 54px;\n    }\n\n    .offer-legacy-result-banner__asset{\n      width:32px;\n      height:32px;\n      display:block;\n    }\n\n    .offer-legacy-result-banner__text strong{\n      display:block;\n      font-size:18px;\n      line-height:1.12;\n      color:#111827;\n    }\n\n    .offer-legacy-result-banner__text span{\n      display:block;\n      margin-top:4px;\n      font-size:14px;\n      line-height:1.2;\n      color:#6b7280;\n    }\n\n    .offer-legacy-price-box{\n      display:grid;\n      gap:4px;\n      padding:12px;\n      border-radius:14px;\n      border:1px solid #e6ebf4;\n      background:#f8fafe;\n      text-align:center;\n    }\n\n    .offer-legacy-price-box small{\n      font-size:11px;\n      font-weight:700;\n      color:#6b7280;\n    }\n\n    .offer-legacy-price-box strong{\n      font-size:26px;\n      line-height:1.05;\n      letter-spacing:-.03em;\n      color:#ff7700;\n    }\n\n    .offer-legacy-price-box span{\n      font-size:13px;\n      line-height:1.35;\n      color:#8c95a5;\n      text-decoration:line-through;\n    }\n\n    .overlay-card.dark .offer-legacy-search-icon{\n      background:#fff;\n      border:none;\n    }\n\n    .overlay-card.dark .offer-legacy-status{\n      color:#fff;\n    }\n\n    .overlay-card.dark .offer-legacy-note{\n      color:rgba(255,255,255,.64);\n    }\n\n    .overlay-card.dark .offer-legacy-result-banner{\n      border-color:rgba(255,153,72,.35);\n      background:rgba(255,255,255,.04);\n    }\n\n    .overlay-card.dark .offer-legacy-result-banner__text strong{\n      color:#fff;\n    }\n\n    .overlay-card.dark .offer-legacy-result-banner__text span{\n      color:rgba(255,255,255,.7);\n    }\n\n    .overlay-card.dark .offer-legacy-price-box{\n      border-color:rgba(255,255,255,.10);\n      background:rgba(255,255,255,.05);\n    }\n\n    .overlay-card.dark .offer-legacy-price-box small{\n      color:rgba(255,255,255,.7);\n    }\n\n    .overlay-card.dark .offer-legacy-price-box strong{\n      color:#ffd8b0;\n    }\n\n    .overlay-card.dark .offer-legacy-price-box span{\n      color:rgba(255,255,255,.55);\n    }\n\n    .offer-code{\n      display:inline-flex;\n      margin-top:10px;\n      padding:8px 10px;\n      border-radius:999px;\n      background:#f7f8fb;\n      color:var(--muted);\n      font-size:12px;\n      font-weight:700;\n    }\n\n    .overlay-card.dark .offer-code{\n      background:rgba(255,255,255,.08);\n      color:rgba(255,255,255,.76);\n    }\n\n    .offer-price-compare{\n      display:grid;\n      gap:10px;\n      margin:4px 0 10px;\n    }\n\n    .offer-price-compare__new{\n      display:grid;\n      gap:2px;\n    }\n\n    .offer-price-compare__new small{\n      font-size:12px;\n      color:#5f6779;\n      font-weight:700;\n    }\n\n    .offer-price-compare__new strong{\n      font-size:26px;\n      line-height:1.05;\n      letter-spacing:-.03em;\n      color:#1f2937;\n    }\n\n    .offer-price-compare__old{\n      display:flex;\n      align-items:center;\n      gap:8px;\n    }\n\n    .offer-price-compare__old small{\n      font-size:12px;\n      color:#7b8494;\n      font-weight:700;\n    }\n\n    .offer-price-compare__old span{\n      font-size:16px;\n      color:#8c95a5;\n      text-decoration:line-through;\n      text-decoration-thickness:1px;\n    }\n\n    .offer-price-compare__benefits{\n      display:flex;\n      flex-wrap:wrap;\n      gap:8px;\n    }\n\n    .offer-benefit-chip{\n      display:inline-flex;\n      align-items:center;\n      gap:5px;\n      min-height:30px;\n      padding:6px 10px;\n      border-radius:999px;\n      background:#edf2fa;\n      border:1px solid #dde5f1;\n      color:#2f3a56;\n      font-size:12px;\n      font-weight:700;\n      line-height:1;\n    }\n\n    .offer-benefit-chip strong{\n      color:#1f2937;\n      font-weight:800;\n    }\n\n    .offer-booking-block{\n      margin-top:8px;\n      padding:12px;\n      border-radius:14px;\n      border:1px solid #e6ebf4;\n      background:#f8fafe;\n      display:grid;\n      gap:8px;\n    }\n\n    .offer-booking-line{\n      display:flex;\n      align-items:center;\n      min-height:20px;\n    }\n\n    .offer-booking-line--single{\n      justify-content:space-between;\n      gap:10px;\n      flex-wrap:nowrap;\n      min-width:0;\n    }\n\n    .offer-booking-block .offer-code{\n      margin-top:0;\n      padding:7px 10px;\n      background:#edf2fa;\n      border:1px solid #dde5f1;\n      border-radius:999px;\n      color:#2a3242;\n      font-size:13px;\n      line-height:1;\n      width:max-content;\n      max-width:100%;\n    }\n\n    .offer-booking-block .offer-code strong{\n      color:#111827;\n    }\n\n    .offer-booking-block .summary-timer{\n      font-size:13px;\n      font-weight:700;\n      color:#c16a00;\n      margin:0;\n      white-space:nowrap;\n    }\n\n    .offer-booking-note{\n      margin:0;\n      color:#5f6779;\n      font-size:12px;\n      line-height:1.45;\n      font-weight:600;\n    }\n\n    .overlay-actions{\n      display:grid;\n      gap:10px;\n      margin-top:16px;\n    }\n\n    @media (max-width: 720px){\n      #offerOverlay{\n        align-items:flex-start;\n        justify-content:center;\n        padding:10px;\n      }\n\n      #offerOverlay .overlay-card{\n        width:100%;\n        max-width:100%;\n        max-height:calc(100vh - 140px);\n        padding:12px;\n        border-radius:20px;\n        overflow:auto;\n      }\n\n      .offer-card-stable{\n        min-height:0;\n        height:auto;\n        max-height:calc(100vh - 140px);\n        overflow:hidden;\n      }\n\n      .offer-state-shell{\n        min-height:0;\n        height:auto;\n      }\n\n      .offer-state-shell--result{\n        gap:4px;\n      }\n\n      .offer-headline{\n        margin-bottom:2px;\n      }\n\n      .offer-headline h3{\n        font-size:17px;\n        line-height:1.1;\n      }\n\n      .offer-legacy-result-banner{\n        padding:8px 10px;\n        gap:8px;\n      }\n\n      .offer-legacy-result-banner__icon{\n        width:36px;\n        height:36px;\n        border-radius:9px;\n        flex:0 0 36px;\n      }\n\n      .offer-legacy-result-banner__asset{\n        width:20px;\n        height:20px;\n      }\n\n      .offer-legacy-result-banner__text strong{\n        font-size:13px;\n        line-height:1.2;\n      }\n\n      .offer-legacy-result-banner__text span{\n        margin-top:2px;\n        font-size:11px;\n        line-height:1.2;\n      }\n\n      .offer-legacy-price-box{\n        padding:7px 10px;\n        gap:2px;\n      }\n\n      .offer-legacy-price-box strong{\n        font-size:22px;\n        line-height:1.04;\n      }\n\n      .offer-legacy-price-box span{\n        font-size:10px;\n      }\n\n      .offer-price-compare{\n        gap:6px;\n        margin:1px 0 4px;\n      }\n\n      .offer-price-compare__new strong{\n        font-size:22px;\n        line-height:1.05;\n      }\n\n      .offer-benefit-chip{\n        min-height:24px;\n        padding:4px 7px;\n        font-size:9px;\n      }\n\n      .offer-booking-block{\n        margin-top:2px;\n        padding:7px;\n        border-radius:12px;\n        gap:4px;\n      }\n\n      .offer-booking-note{\n        font-size:10px;\n        line-height:1.2;\n      }\n\n      .overlay-actions{\n        margin-top:4px;\n      }\n\n      .overlay-actions .cta-main{\n        min-height:40px;\n        padding:8px 12px;\n        font-size:16px;\n        line-height:1.05;\n      }\n\n      #offerOverlay,\n      #formDrawer{\n        align-items:flex-start;\n        justify-content:center;\n        padding:10px;\n      }\n\n      #offerOverlay .overlay-card,\n      #formDrawer .form-panel{\n        width:min(100%, 420px);\n        max-width:100%;\n        min-height:calc(100vh - 140px);\n        max-height:calc(100vh - 140px);\n        border-radius:20px;\n        padding:12px;\n      }\n    }\n\n    .secondary-outline{\n      width:100%;\n      border:1px solid var(--line);\n      background:#fff;\n      color:var(--text);\n      border-radius:16px;\n      padding:15px 16px;\n      font-size:14px;\n      font-weight:800;\n      cursor:pointer;\n      transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n    }\n\n    .secondary-outline:hover{\n      transform:translateY(-1px);\n      box-shadow:0 14px 26px rgba(20,29,45,.08);\n      border-color:#d4dae5;\n    }\n\n    .overlay-card.dark .secondary-outline{\n      background:rgba(255,255,255,.04);\n      border-color:rgba(255,255,255,.10);\n      color:#fff;\n    }\n\n    .summary-bar{\n      position:fixed;\n      bottom:0;\n      left:0;\n      right:0;\n      z-index:var(--z-summary);\n      background:rgba(255,255,255,.95);\n      backdrop-filter:blur(18px);\n      border-top:1px solid var(--line);\n      box-shadow:0 -12px 32px rgba(20,29,45,.07);\n      opacity:0;\n      transform:translateY(18px);\n      pointer-events:none;\n      transition:opacity .24s ease, transform .24s ease;\n    }\n\n    .compact-mode .summary-bar{\n      background:rgba(255,255,255,.96);\n    }\n\n    .summary-bar.is-visible{\n      opacity:1;\n      transform:translateY(0);\n      pointer-events:auto;\n    }\n\n    .summary-inner{\n      position:relative;\n      max-width:1440px;\n      margin:0 auto;\n      padding:14px 24px;\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:20px;\n    }\n\n    .summary-visible .page{\n      padding-bottom:130px;\n    }\n\n    .summary-left{\n      display:flex;\n      align-items:center;\n      gap:14px;\n      flex-wrap:wrap;\n    }\n\n    .summary-item{\n      font-size:15px;\n      font-weight:700;\n    }\n\n    .summary-sub{\n      font-size:12px;\n      color:var(--muted);\n      margin-top:3px;\n    }\n\n    .summary-right{\n      display:flex;\n      align-items:center;\n      gap:12px;\n    }\n\n    .summary-dismiss-btn{\n      position:absolute;\n      top:8px;\n      right:8px;\n      width:22px;\n      height:22px;\n      border:none;\n      border-radius:8px;\n      background:rgba(15,23,42,.10);\n      color:#0f172a;\n      display:none;\n      align-items:center;\n      justify-content:center;\n      cursor:pointer;\n      padding:0;\n      line-height:0;\n    }\n\n    .summary-dismiss-btn .ac-icon{\n      width:11px;\n      height:11px;\n      display:block;\n      filter:brightness(0) saturate(100%) invert(9%) sepia(13%) saturate(1388%) hue-rotate(184deg) brightness(92%) contrast(95%);\n    }\n\n    .summary-dismiss-btn:hover{\n      background:rgba(15,23,42,.16);\n    }\n\n    .summary-price{\n      text-align:right;\n    }\n\n    .summary-price strong{\n      display:block;\n      font-size:26px;\n      letter-spacing:-.03em;\n    }\n\n    .summary-timer{\n      color:#d56e00;\n      font-size:12px;\n      font-weight:800;\n    }\n\n    #summaryTimer,\n    .booking-timer-line{\n      font-variant-numeric:tabular-nums;\n      font-feature-settings:\"tnum\" 1;\n    }\n\n    #summaryTimer{\n      display:inline-block;\n      min-width:20ch;\n      white-space:nowrap;\n    }\n\n    .summary-bar.summary-bar--stage4 .summary-item,\n    .summary-bar.summary-bar--stage4 .summary-price strong{\n      display:none;\n    }\n\n    .summary-bar.summary-bar--stage4 .summary-sub{\n      margin-top:0;\n      font-size:13px;\n      font-weight:700;\n      color:#334155;\n    }\n\n    .summary-bar.summary-bar--stage4 .summary-right{\n      margin-left:auto;\n      gap:10px;\n      align-items:center;\n    }\n\n    .summary-bar.summary-bar--stage4 .summary-price{\n      text-align:right;\n      min-width:0;\n    }\n\n    .summary-bar.summary-bar--stage4 .summary-timer{\n      font-size:13px;\n      font-weight:800;\n      white-space:nowrap;\n    }\n\n    .summary-bar.summary-bar--stage4 [data-action=\"primary-cta\"]{\n      display:flex;\n      flex-direction:column;\n      align-items:center;\n      justify-content:center;\n      gap:2px;\n      min-height:48px;\n      padding:10px 16px;\n      line-height:1.05;\n      white-space:nowrap;\n    }\n\n    .summary-bar.summary-bar--stage4 [data-action=\"primary-cta\"] .cta-main-line--primary{\n      font-size:14px;\n      font-weight:700;\n    }\n\n    .summary-bar.summary-bar--stage4 [data-action=\"primary-cta\"] .cta-main-line--accent{\n      font-size:18px;\n      font-weight:900;\n    }\n\n    .form-drawer{\n      position:fixed;\n      inset:0;\n      background:rgba(8,12,18,.58);\n      z-index:var(--z-overlay);\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      padding:24px;\n      animation:fade-in .18s ease;\n    }\n\n    .version-badge{\n      z-index:var(--z-debug);\n      display:flex;\n      align-items:center;\n      gap:8px;\n    }\n\n    .version-badge.hidden{\n      display:none;\n    }\n\n    .version-badge-label{\n      display:inline-flex;\n      align-items:center;\n      min-width:0;\n    }\n\n    .version-badge-close{\n      border:none;\n      background:transparent;\n      color:rgba(255,255,255,.86);\n      cursor:pointer;\n      width:16px;\n      height:16px;\n      line-height:1;\n      font-size:14px;\n      padding:0;\n      display:inline-flex;\n      align-items:center;\n      justify-content:center;\n      flex:0 0 auto;\n    }\n\n    .version-badge-close:hover{\n      color:#fff;\n      transform:scale(1.06);\n    }\n\n    .form-panel{\n      width:min(100%, 680px);\n      min-height:0;\n      background:#fff;\n      border-radius:24px;\n      padding:18px 18px 18px;\n      box-shadow:0 -24px 60px rgba(20,29,45,.16);\n      max-height:min(90vh, 760px);\n      overflow:auto;\n      animation:drawer-up .24s ease;\n    }\n\n    .booking-summary-box{\n      margin:0 0 12px;\n      padding:12px;\n      border:1px solid var(--line);\n      border-radius:16px;\n      background:linear-gradient(135deg,#fbfcfe,#ffffff);\n      display:grid;\n      gap:6px;\n    }\n\n    .booking-summary-box.success-summary-box{\n      position:relative;\n      padding-right:72px;\n      margin-bottom:10px;\n    }\n\n    .booking-summary-box.success-summary-box::after{\n      content:\"✓\";\n      position:absolute;\n      top:16px;\n      right:16px;\n      width:42px;\n      height:42px;\n      border-radius:50%;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      background:linear-gradient(135deg,#fff7ef,#fff);\n      border:2px solid rgba(255,138,0,.20);\n      color:var(--accent);\n      font-size:22px;\n      font-weight:900;\n      box-shadow:0 10px 22px rgba(255,138,0,.12);\n    }\n\n    .booking-summary-box strong{\n      font-size:14px;\n      line-height:1.35;\n    }\n\n    .booking-summary-selection{\n      font-size:15px;\n      line-height:1.25;\n      font-weight:800;\n      letter-spacing:-.01em;\n      color:#1f2937;\n    }\n\n    .booking-summary-price{\n      font-size:28px;\n      line-height:1.02;\n      font-weight:900;\n      letter-spacing:-.03em;\n      color:#111827;\n    }\n\n    .booking-summary-timer{\n      margin-top:2px;\n      padding:8px 10px;\n      border-radius:12px;\n      border:1px solid rgba(255,138,0,.26);\n      background:linear-gradient(135deg,#fff7ee,#fff);\n      display:grid;\n      justify-items:center;\n      gap:4px;\n    }\n\n    .booking-summary-timer-title{\n      font-size:12px;\n      font-weight:700;\n      color:#8a4b00;\n      line-height:1.2;\n    }\n\n    .booking-summary-timer .booking-timer-line{\n      margin-top:0;\n      min-width:0;\n      font-size:20px;\n      line-height:1;\n      letter-spacing:.02em;\n      color:#d56e00;\n      font-weight:900;\n      text-align:center;\n    }\n\n    .booking-summary-guarantee{\n      font-size:13px;\n      line-height:1.35;\n      color:#4b5563;\n    }\n\n    .booking-summary-list{\n      display:grid;\n      gap:4px;\n      color:#5b6678;\n      font-size:14px;\n      line-height:1.55;\n    }\n\n    .success-modal-note{\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n      margin-bottom:14px;\n    }\n\n    .success-actions{\n      margin-top:12px;\n      display:flex;\n      align-items:center;\n      gap:10px;\n      flex-wrap:wrap;\n    }\n\n    .success-actions .cta-main{\n      width:auto;\n      min-height:40px;\n      padding:0 18px;\n      font-size:14px;\n      border-radius:12px;\n      box-shadow:0 12px 30px rgba(255,122,0,.24);\n      flex:0 0 auto;\n      margin:0;\n    }\n\n    .success-actions .success-secondary{\n      margin-top:0;\n      flex:0 0 auto;\n    }\n\n    .success-delivery-state{\n      margin:0 0 14px;\n      padding:10px 12px;\n      border-radius:12px;\n      border:1px solid #f6d28d;\n      background:#fff6e8;\n      color:#8a4b00;\n      font-size:13px;\n      line-height:1.5;\n    }\n\n    .success-delivery-state.error{\n      border-color:#efb2b2;\n      background:#fff3f3;\n      color:#9f2f2f;\n    }\n\n    .success-check{\n      width:64px;\n      height:64px;\n      border-radius:50%;\n      display:flex;\n      align-items:center;\n      justify-content:center;\n      margin:0 auto 14px;\n      background:linear-gradient(135deg,#fff7ef,#fff);\n      border:2px solid rgba(255,138,0,.20);\n      color:var(--accent);\n      font-size:28px;\n      font-weight:900;\n      box-shadow:0 14px 28px rgba(255,138,0,.12);\n    }\n\n    .form-head{\n      display:flex;\n      align-items:flex-start;\n      justify-content:space-between;\n      gap:12px;\n      margin-bottom:14px;\n    }\n\n    .form-head-main{\n      min-width:0;\n    }\n\n    #formLead:empty{\n      display:none;\n    }\n\n    .form-close{\n      width:var(--close-btn-size);\n      height:var(--close-btn-size);\n      border:none;\n      border-radius:12px;\n      background:transparent;\n      color:rgba(17,24,39,.72);\n      font-size:20px;\n      font-weight:900;\n      cursor:pointer;\n      flex:0 0 auto;\n      transition:transform .15s ease, color .15s ease;\n      box-shadow:none;\n    }\n\n    .form-close:hover{\n      transform:translateY(-1px);\n      box-shadow:none;\n      background:transparent;\n      color:rgba(17,24,39,.92);\n    }\n\n    .form-panel h3{\n      margin:0 0 8px;\n      font-size:20px;\n      letter-spacing:-.03em;\n    }\n\n    .form-summary-box{\n      border:1px solid var(--line);\n      background:#fafbfd;\n      border-radius:20px;\n      padding:16px;\n      margin-bottom:16px;\n    }\n\n    .form-summary-box strong{\n      display:block;\n      margin-bottom:10px;\n      font-size:15px;\n    }\n\n    .form-summary-row{\n      color:var(--muted);\n      font-size:14px;\n      line-height:1.6;\n    }\n\n    .form-grid{\n      display:grid;\n      gap:8px;\n    }\n\n    .form-field{\n      display:grid;\n      gap:4px;\n    }\n\n    .form-field label{\n      font-size:13px;\n      color:var(--muted);\n      font-weight:700;\n      line-height:1.35;\n    }\n\n    .input-box{\n      width:100%;\n      min-height:46px;\n      border-radius:14px;\n      border:1px solid var(--line);\n      background:#fff;\n      padding:0 14px;\n      font-size:14px;\n      color:var(--text);\n      outline:none;\n      transition:border-color .15s ease, box-shadow .15s ease, background .15s ease;\n    }\n\n    .form-panel .cta-main{\n      padding:14px 14px;\n      border-radius:14px;\n      font-size:15px;\n      box-shadow:0 14px 28px rgb(255 122 0 / 34%);\n    }\n\n    .input-box.input-error{\n      border-color:#e15b5b;\n      box-shadow:0 0 0 4px rgba(225,91,91,.10);\n      background:#fffafa;\n    }\n\n    .field-error{\n      margin-top:8px;\n      color:#c24141;\n      font-size:12px;\n      line-height:1.45;\n      display:none;\n    }\n\n    .field-error.visible{\n      display:block;\n    }\n\n    .input-box:focus{\n      border-color:#ffb15e;\n      box-shadow:0 0 0 4px rgba(255,138,0,.10);\n      background:#fffdfa;\n    }\n\n    .input-box::placeholder{\n      color:#95a0b0;\n    }\n\n    .form-panel .under-cta{\n      margin-top:10px;\n      color:#8a4b00;\n      font-weight:700;\n      font-size:13px;\n      line-height:1.45;\n      text-align:left;\n    }\n\n    @keyframes fade-in{\n      from{\n        opacity:0;\n      }\n\n      to{\n        opacity:1;\n      }\n    }\n\n    @keyframes modal-up{\n      from{\n        opacity:0;\n        transform:translateY(8px) scale(.985);\n      }\n\n      to{\n        opacity:1;\n        transform:translateY(0) scale(1);\n      }\n    }\n\n    @keyframes drawer-up{\n      from{\n        opacity:0;\n        transform:translateY(18px);\n      }\n\n      to{\n        opacity:1;\n        transform:translateY(0);\n      }\n    }\n\n    @keyframes summary-in{\n      from{\n        opacity:0;\n        transform:translateY(8px);\n      }\n\n      to{\n        opacity:1;\n        transform:translateY(0);\n      }\n    }\n\n    .check-row{\n      display:flex;\n      align-items:flex-start;\n      gap:10px;\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.55;\n      margin:6px 0 14px;\n    }\n\n    .muted-note{\n      color:var(--muted);\n      font-size:13px;\n      margin-top:10px;\n      line-height:1.55;\n    }\n\n    @media (max-width: 1180px){\n      :root{\n        --desktop-booking-height:600px;\n      }\n\n      .hero-booking-card{\n        position:relative;\n        width:100%;\n        max-width:none;\n        margin-top:0;\n        margin-bottom:var(--hero-overlap-bottom);\n        transform:translateY(var(--hero-overlap-y));\n        z-index:6;\n      }\n\n      .hero-booking-card:hover{\n        transform:translateY(var(--hero-overlap-y-hover));\n      }\n\n      .hero-content,.hero-content.full{\n        max-width:100%;\n        padding-right:0;\n      }\n\n      .hero-shell{\n        display:block;\n        min-height:auto;\n        overflow:visible;\n      }\n\n      #desktop-booking-card{\n        height:var(--desktop-booking-height);\n        min-height:var(--desktop-booking-height);\n        max-height:var(--desktop-booking-height);\n      }\n\n      #desktop-booking-card .booking-step-2{\n        flex:none;\n      }\n\n      #desktop-booking-card .shift-list{\n        max-height:none;\n        overflow:visible;\n      }\n\n      .hero-left-tools{\n        width:100%;\n        justify-content:flex-start;\n      }\n\n      .programs-layout{\n        grid-template-columns:1fr;\n      }\n\n      .programs-main-grid{\n        grid-template-columns:1fr;\n      }\n\n      .programs-short-block{\n        align-self:auto;\n      }\n\n      .grid-3,.slot-grid,.team-grid,.contacts-row,footer,.video-list,.contacts-grid,.socials-grid,.review-grid,.journey-grid,.results-band,.trust-band,.reviews-summary,.reviews-hero,.stay-grid{\n        grid-template-columns:1fr;\n      }\n\n      .photo-grid{\n        grid-template-columns:1fr;\n        grid-auto-rows:auto;\n      }\n\n      .photo-card.hero,\n      .photo-card.wide{\n        grid-row:auto;\n        grid-column:auto;\n        min-height:220px;\n      }\n\n      .video-card{\n        flex-basis:calc((100% - 24px) / 3);\n      }\n\n      .book-card{\n        grid-template-columns:1fr;\n      }\n\n      .book-team-cover-wrap{\n        min-height:180px;\n      }\n\n      .book-team-card{\n        grid-row:auto;\n      }\n\n      .team-layout{\n        grid-template-columns:1fr;\n      }\n\n      .team-right{\n        grid-template-rows:auto auto;\n      }\n\n      .team-core-grid{\n        grid-template-columns:1fr;\n      }\n\n      .team-carousel-shell{\n        grid-template-columns:1fr;\n      }\n\n      .team-carousel-nav{\n        display:none;\n      }\n\n      .team-carousel .team-card{\n        min-width:240px;\n        max-width:300px;\n        flex:0 0 auto;\n      }\n\n      .overlay.section-modal-compact{\n        padding:0;\n        background:linear-gradient(90deg, rgba(9,14,22,.72) 0%, rgba(9,14,22,.62) 62%, rgba(9,14,22,.24) 100%);\n      }\n\n      .overlay.section-modal-compact .section-modal-card{\n        right:auto;\n        width:var(--section-modal-compact-runtime-width, var(--section-modal-compact-width));\n        max-width:calc(100vw - var(--section-modal-compact-runtime-left, 12px) - 12px);\n        max-height:var(--section-modal-compact-runtime-height, min(90vh, 920px));\n        margin:0;\n      }\n    }\n\n    @media (max-width: 820px){\n      .page{\n        padding:20px 14px 120px;\n      }\n\n      .summary-visible .page{\n        padding-bottom:200px;\n      }\n\n      .title h1{\n        font-size:28px;\n      }\n\n      .summary-inner{\n        flex-direction:column;\n        align-items:stretch;\n        padding:12px 14px;\n      }\n\n      .summary-dismiss-btn{\n        display:inline-flex;\n      }\n\n      .summary-right{\n        justify-content:space-between;\n        flex-wrap:wrap;\n      }\n\n      .summary-price{\n        text-align:left;\n      }\n\n      .booking-summary-mini--completed{\n        padding:10px 10px 8px;\n        gap:6px;\n      }\n\n      .booking-summary-mini--completed .booking-price-head{\n        gap:8px;\n      }\n\n      .booking-summary-mini--completed .booking-price-head:first-child .booking-price-main{\n        font-size:36%;\n        line-height:1.03;\n      }\n\n      .booking-summary-mini--completed .booking-price-head:last-child .booking-price-main,\n      .booking-summary-mini--completed .booking-price-head:last-child .booking-price-main.big{\n        font-size:44%;\n        line-height:1.04;\n      }\n\n      .completed-followup-image{\n        max-height:min(31vh, 208px);\n      }\n\n      .completed-followup-text{\n        font-size:9px;\n        line-height:1.2;\n      }\n\n      .completed-followup-note{\n        font-size:8.5px;\n        line-height:1.2;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info{\n        min-width:0;\n        width:100%;\n        max-width:100%;\n        overflow-x:clip;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info .booking-summary-mini--completed{\n        min-width:0;\n        width:100%;\n        max-width:100%;\n        overflow-x:clip;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info .booking-price-head{\n        grid-template-columns:minmax(0,1fr);\n        gap:6px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info .booking-price-col{\n        min-width:0;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info .booking-price-col--fixed{\n        align-items:flex-start !important;\n        text-align:left !important;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info .booking-price-main{\n        font-size:16px;\n        line-height:1.12;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info .booking-price-main.big{\n        font-size:24px;\n        line-height:1.06;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info .completed-followup-text,\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-completed #desktop-booking-info .completed-followup-note{\n        max-width:100%;\n        min-width:0;\n        overflow-wrap:anywhere;\n        word-break:break-word;\n      }\n\n      #mobileBookingCard.booking-completed #mobile-booking-info{\n        min-width:0;\n        width:100%;\n        max-width:100%;\n        overflow-x:clip;\n      }\n\n      #mobileBookingCard.booking-completed #mobile-booking-info .booking-summary-mini--completed{\n        min-width:0;\n        width:100%;\n        max-width:100%;\n        overflow-x:clip;\n      }\n\n      #mobileBookingCard.booking-completed #mobile-booking-info .booking-price-head{\n        grid-template-columns:minmax(0,1fr);\n        gap:6px;\n      }\n\n      #mobileBookingCard.booking-completed #mobile-booking-info .booking-price-col{\n        min-width:0;\n      }\n\n      #mobileBookingCard.booking-completed #mobile-booking-info .booking-price-col--fixed{\n        align-items:flex-start !important;\n        text-align:left !important;\n      }\n\n      #mobileBookingCard.booking-completed #mobile-booking-info .booking-price-main{\n        font-size:16px;\n        line-height:1.12;\n      }\n\n      #mobileBookingCard.booking-completed #mobile-booking-info .booking-price-main.big{\n        font-size:24px;\n        line-height:1.06;\n      }\n\n      .hero-topbar{\n        margin-bottom:18px;\n        gap:10px;\n      }\n\n      #desktopView.mobile-preview-active .hero-menu-toggle{\n        min-width:auto;\n        width:56px;\n        height:56px;\n        padding:0;\n        border:none;\n        background:transparent;\n        box-shadow:none;\n        backdrop-filter:none;\n      }\n\n      #desktopView.mobile-preview-active .hero-menu-toggle:hover{\n        background:transparent;\n        border:none;\n        transform:none;\n      }\n\n      #desktopView.mobile-preview-active .hero-menu-toggle-icon{\n        display:none;\n      }\n\n      #desktopView.mobile-preview-active .summary-dismiss-btn{\n        display:inline-flex;\n      }\n\n      #desktopView.mobile-preview-active .hero-menu-toggle-icon-img{\n        display:block;\n        width:36px;\n        height:36px;\n        filter:brightness(0) invert(1);\n      }\n\n      #desktopView.mobile-preview-active .hero-menu-toggle-text{\n        display:none;\n      }\n\n      #desktopView.mobile-preview-active .hero-mode-inline{\n        gap:8px;\n      }\n\n      #desktopView.mobile-preview-active .hero-mode-inline #fullModeBtn{\n        min-width:98px;\n      }\n\n      #desktopView.mobile-preview-active .hero-mode-inline #compactModeBtn{\n        min-width:46px;\n      }\n\n      #desktopView.mobile-preview-active .hero-shell{\n        min-height:auto;\n        padding:10px 10px 10px;\n        border-radius:22px;\n      }\n\n      #desktopView.mobile-preview-active .hero-topbar{\n        margin-bottom:6px;\n        gap:8px;\n      }\n\n      #desktopView.mobile-preview-active .hero-brand-label{\n        font-size:11px;\n        line-height:1.2;\n      }\n\n      #desktopView.mobile-preview-active .hero-content.full{\n        padding-bottom:4px;\n      }\n\n      #desktopView.mobile-preview-active .hero-content.full::before,\n      #desktopView.mobile-preview-active .hero-content.full::after{\n        display:none;\n      }\n\n      #desktopView.mobile-preview-active .hero-title{\n        margin:0 0 6px;\n        font-size:26px;\n        line-height:1.06;\n        max-width:100%;\n      }\n\n      #desktopView.mobile-preview-active .hero-sub{\n        margin:0 0 6px;\n        font-size:12px;\n        line-height:1.28;\n        max-width:100%;\n      }\n\n      #desktopView.mobile-preview-active .hero-mobile-age-cta{\n        display:none;\n        margin:0;\n      }\n\n      #desktopView.mobile-preview-active .hero-slogan{\n        display:none;\n      }\n\n      #desktopView.mobile-preview-active .hero-benefits-grid{\n        margin-top:0;\n        grid-template-columns:1fr;\n        gap:0;\n      }\n\n      #desktopView.mobile-preview-active .hero-benefits-grid .hero-benefit-card{\n        display:none;\n      }\n\n      #desktopView.mobile-preview-active .hero-benefits-grid .hero-benefit-card:first-child{\n        display:grid;\n        min-height:auto;\n        padding:8px 10px;\n        border-radius:12px;\n      }\n\n      #desktopView.mobile-preview-active .hero-benefits-grid .hero-benefit-card:first-child strong{\n        font-size:13px;\n        line-height:1.22;\n      }\n\n      #desktopView.mobile-preview-active .hero-benefits-grid .hero-benefit-card:first-child span{\n        font-size:11px;\n        line-height:1.3;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card{\n        margin-top:8px;\n        height:560px;\n        min-height:560px;\n        max-height:560px;\n        display:flex;\n        flex-direction:column;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card h3{\n        font-size:21px;\n        line-height:1.1;\n        margin-bottom:5px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card p#desktopBookingLead{\n        font-size:12px;\n        line-height:1.3;\n        margin-bottom:8px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card .booking-steps{\n        margin-bottom:6px;\n        gap:2px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card .booking-step{\n        font-size:10px;\n        gap:2px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card .booking-step::before{\n        width:30px;\n        height:30px;\n        font-size:12px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tabs{\n        grid-template-columns:repeat(3,minmax(0,1fr));\n        gap:4px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab{\n        height:auto;\n        min-height:68px;\n        padding:4px 6px 5px;\n        border-radius:12px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-main{\n        display:flex;\n        flex-direction:column;\n        justify-content:flex-start;\n        gap:4px;\n        min-height:0;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-head{\n        gap:3px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-range{\n        font-size:10px;\n        line-height:1.05;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-track{\n        font-size:8px;\n        line-height:1.08;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-anchor{\n        display:block;\n        font-size:8px;\n        line-height:1.1;\n        margin:0;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-bullets{\n        display:none;\n      }\n\n      #desktopView.mobile-preview-active .hero-shell{\n        min-height:auto;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card{\n        width:68%;\n        max-width:68%;\n        margin-left:auto;\n        margin-right:0;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card > .booking-step-block{\n        flex:1 1 auto;\n        min-height:0;\n        overflow:auto;\n        overscroll-behavior:contain;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card > .booking-step-block::-webkit-scrollbar{\n        width:5px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card > .booking-step-block::-webkit-scrollbar-thumb{\n        background:rgba(255,255,255,.2);\n        border-radius:999px;\n      }\n\n      #mobileBookingCard{\n        height:560px;\n        min-height:560px;\n        max-height:560px;\n        display:flex;\n        flex-direction:column;\n      }\n\n      #mobileBookingCard > .booking-step-block{\n        flex:1 1 auto;\n        min-height:0;\n        overflow:auto;\n        overscroll-behavior:contain;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-1 .booking-step-1 .age-tab .age-tab-bullets span{\n        font-size:9px;\n        line-height:1.15;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option{\n        padding:12px;\n        min-height:148px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head small{\n        min-width:118px;\n        flex:0 0 118px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head .shift-option-price{\n        font-size:17px;\n      }\n\n      #desktopView.mobile-preview-active #desktop-booking-card.booking-stage-2 #desktop-shift-options .shift-option-head .shift-option-seats{\n        font-size:12px;\n      }\n\n      .hero-tag{\n        margin-bottom:14px;\n      }\n\n      .feature-row{\n        gap:8px;\n      }\n\n      .hero-benefits-grid{\n        grid-template-columns:1fr;\n        gap:8px;\n      }\n\n      .hero-benefit-card{\n        min-height:auto;\n        padding:11px 12px;\n      }\n\n      .hero-benefit-card strong{\n        font-size:14px;\n      }\n\n      .hero-benefit-card span{\n        font-size:12px;\n      }\n\n      .feature-pill{\n        min-width:0;\n        width:100%;\n        padding:10px 11px;\n      }\n\n      .occupancy-badge{\n        margin-top:14px;\n      }\n\n      .reviews-score-row{\n        flex-direction:column;\n        align-items:flex-start;\n      }\n\n      .compact-mobile-hidden{\n        display:block;\n      }\n\n      .mobile-hero-nav{\n        flex-wrap:nowrap;\n        overflow-x:auto;\n        padding-bottom:4px;\n        -webkit-overflow-scrolling:touch;\n        scrollbar-width:none;\n      }\n\n      .mobile-hero-nav::-webkit-scrollbar{\n        display:none;\n      }\n\n      .mobile-hero-nav .mini-nav-link{\n        white-space:nowrap;\n      }\n\n      .mobile-brand{\n        width:38px;\n        height:38px;\n        padding:7px;\n        border-radius:10px;\n      }\n\n      .hero-mode-inline{\n        width:100%;\n      }\n\n      .hero-mode-inline .mode-btn{\n        flex:1;\n      }\n\n      .team-carousel .team-card{\n        min-width:86%;\n        max-width:86%;\n      }\n\n      .overlay{\n        padding:14px;\n      }\n\n      .overlay-card{\n        padding:18px;\n        border-radius:22px;\n      }\n\n      .overlay-card.success-card{\n        min-height:auto;\n        width:100%;\n        border-radius:24px 24px 0 0;\n        padding:20px 16px 22px;\n      }\n\n      .section-modal-body{\n        padding:14px;\n      }\n\n      .form-panel{\n        padding:20px 16px 22px;\n        border-radius:24px 24px 0 0;\n        width:100%;\n        min-height:auto;\n        max-height:92vh;\n      }\n\n      .form-close{\n        width:var(--close-btn-size);\n        height:var(--close-btn-size);\n        border-radius:10px;\n      }\n\n      .book-team-title{\n        font-size:22px;\n      }\n\n      .book-team-cover{\n        max-width:160px;\n      }\n\n      .form-drawer{\n        align-items:flex-end;\n        padding:0;\n      }\n\n      #offerOverlay,\n      #formDrawer{\n        align-items:flex-start;\n        justify-content:center;\n        padding:10px;\n      }\n\n      #offerOverlay .overlay-card,\n      #formDrawer .form-panel{\n        width:min(100%, 420px);\n        max-width:100%;\n        min-height:calc(100vh - 140px);\n        max-height:calc(100vh - 140px);\n        border-radius:20px;\n      }\n\n      .hero-shell{\n        display:block;\n        min-height:auto;\n      }\n\n      .hero-booking-card,\n      .mobile-booking-card{\n        margin-left:0;\n      }\n\n      .video-carousel-shell{\n        grid-template-columns:1fr;\n        gap:8px;\n      }\n\n      .video-carousel-nav{\n        display:none;\n      }\n\n      .video-card{\n        flex:0 0 min(82vw, 280px);\n      }\n\n      #version-badge{\n        top:auto !important;\n        right:12px !important;\n        bottom:12px !important;\n        opacity:.5 !important;\n      }\n\n      .map-preview,\n      .map-frame{\n        min-height:220px;\n      }\n    }";
    document.head.appendChild(style);
  }
})();

/* src/scripts/main.js */
/* src/scripts/main.js */
    const OFFER_DISCOUNT_FACTOR = 0.95;

    const shifts = [
      {
        id:'shift-1',
        title:'1',
        label:'Смена 1',
        dates:'30 мая — 8 июня',
        start:'2025-05-30',
        end:'2025-06-08',
        price:94800,
        left:12,
        occupied:33,
        badge:'HIT',
        desc:'Стартовая смена с мягким входом в программирование и знакомством с ИИ.',
        fullDesc:'Мягкий вход в программирование через понятные и быстрые результаты. Для 7–9 лет: ребёнок работает в Scratch и Minecraft, делает первые проекты и понимает базовую логику через игру. Для 10–12 лет: начинает писать код на Python, создаёт простые программы и видит, как работает логика внутри. Для 13–14 лет: пробует первые проекты с элементами AI, знакомится с нейросетями и делает первые осмысленные шаги в сторону современных технологий. Главное — ребёнок не слушает, а делает и получает результат уже в первые дни.'
      },
      {
        id:'shift-2',
        title:'2',
        label:'Смена 2',
        dates:'10 июня — 16 июня',
        start:'2025-06-10',
        end:'2025-06-16',
        price:57600,
        left:8,
        occupied:37,
        badge:'',
        desc:'Полное погружение: проекты, логика и первые шаги в нейросетях.',
        fullDesc:'Смена, где ребёнок начинает реально понимать, как всё устроено. Для 7–9 лет: усложняются проекты, появляется больше самостоятельности, ребёнок начинает осознанно собирать логику. Для 10–12 лет: работает с Python, делает игры и ботов, начинает понимать структуру кода и алгоритмы. Для 13–14 лет: разбирается с более сложными задачами, пробует нейросети и делает проекты с логикой «как в реальных IT-продуктах». Результат — не просто интерес, а ощущение «я могу и понимаю».'
      },
      {
        id:'shift-3',
        title:'3',
        label:'Смена 3',
        dates:'16 июня — 23 июня',
        start:'2025-06-16',
        end:'2025-06-23',
        price:78000,
        left:5,
        occupied:40,
        badge:'',
        desc:'Летняя смена с акцентом на проекты, командную работу и уверенность.',
        fullDesc:'Баланс между программированием, командной работой и лагерной жизнью. Для 7–9 лет: ребёнок продолжает делать проекты, но больше взаимодействует с другими, учится работать в команде. Для 10–12 лет: объединяет навыки кода и общения, участвует в командных задачах и учится доводить идеи до результата. Для 13–14 лет: работает над более цельными проектами, распределяет роли в команде и понимает, как создаются продукты. Смена даёт уверенность: ребёнок не просто учится, а начинает действовать.'
      },
      {
        id:'shift-4',
        title:'4',
        label:'Смена 4',
        dates:'10 июня — 23 июня',
        start:'2025-06-10',
        end:'2025-06-23',
        price:114000,
        left:14,
        occupied:31,
        badge:'',
        desc:'Финальная смена: закрепление навыков и защита мини-проектов.',
        fullDesc:'Смена, где ребёнок собирает всё, чему научился, в понятный результат. Для 7–9 лет: заканчивает проекты и начинает объяснять, как они работают. Для 10–12 лет: делает законченные программы и может показать, что именно он сделал и как. Для 13–14 лет: создаёт более сложные проекты, оформляет их и презентует как готовый продукт. Итог — ребёнок уезжает не с эмоциями, а с реальным результатом и пониманием своего прогресса.'
      }
    ];

    const mediaContent = {
      references: {
        yandexReviewsLabel: 'Отзывы на Яндекс Картах',
        yandexReviewsUrl: 'https://yandex.ru/maps/org/aydakemp/35558479035/reviews/',
        locationMapUrl: 'https://yandex.ru/maps/-/CPR0vYMT',
        locationMapEmbedUrl: 'https://yandex.ru/map-widget/v1/?ll=36.719422%2C55.261573&z=8&pt=36.719422,55.261573,pm2rdm',
        programmingBookUrl: 'https://www.codims.ru/python-book'
      },
      faq: [
        {
          group:'Медицина',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/med.svg',
          items:[
            {q:'Есть ли медик в лагере?',a:'Медработник на территории 24/7 всю смену.'},
            {q:'Что если ребёнок заболеет?',a:'Медик осматривает, при необходимости вызывает скорую. Вы получите звонок сразу.'},
            {q:'Можно давать лекарства?',a:'Передайте медику с инструкцией — будет выдавать по расписанию.'}
          ]
        },
        {
          group:'Безопасность',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/lock.svg',
          items:[
            {q:'Территория закрыта?',a:'Да, огорожена, КПП с охраной. Посторонние не допускаются.'},
            {q:'Сколько детей на вожатого?',a:'Не более 8–10 детей, вожатые работают в парах.'}
          ]
        },
        {
          group:'Питание',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/food.svg',
          items:[
            {q:'Сколько раз кормят?',a:'5 раз в день: завтрак, второй завтрак, обед, полдник, ужин. Всё горячее.'},
            {q:'Учитываются аллергии?',a:'Да. В лагере гипоаллергенная среда: минимум растений, которые вызывают аллергию.'}
          ]
        },
        {
          group:'Проживание',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/check.svg',
          items:[
            {q:'Сколько детей в комнате?',a:'2-4 человека, оборудованные санузлы в каждой комнате.'}
          ]
        },
        {
          group:'Связь',
          icon:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/phone-mobile.svg',
          items:[
            {q:'Будет ли телефон у ребёнка?',a:'Лагерь «без телефонов». Телефон сдаётся на хранение: звонки родителям — раз в день или по запросу в любое время. В любое время можно связаться с вожатым, вожатые и старшие смены на связи 24/7.'},
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
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/15b41072_photo.png',
          bio:'предприниматель в сфере детского IT-образования и мама подростка, которая строит лагерь таким, каким сама хотела бы видеть обучение своего ребёнка.'
        },
        {
          teamId:'team_02',
          bindKey:'никита_брагин',
          fio:'Никита Брагин',
          role:'преподаватель Scratch, Minecraft и Python',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/dc9ef9b6_photo.png',
          bio:'автор учебника по разработке игр; специализируется на геймдеве и помогает детям создавать собственные игровые миры.'
        },
        {
          teamId:'team_03',
          bindKey:'александр_ташкин',
          fio:'Александр Ташкин',
          role:'преподаватель Scratch, Minecraft и Python',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/1e93e3b8_photo.png',
          bio:'соавтор учебника по разработке игр; умеет зажигать интерес к программированию через практические задачи и командные проекты.'
        },
        {
          teamId:'team_04',
          bindKey:'омар_алхамви',
          fio:'Омар Алхамви',
          role:'преподаватель Python и нейросетей',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/67852b0a_photo.png',
          bio:'работает со старшими и продвинутыми группами, часть занятий ведёт на английском и показывает, как применять AI в реальных проектах.'
        },
        {
          teamId:'team_05',
          bindKey:'дарья_воронцова',
          fio:'Дарья Воронцова',
          role:'преподаватель Python и Scratch',
          avatarUrl:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/791a236a_ChatGPT_Image_18__20.png',
          bio:'помогает детям легко войти в программирование через игры, логику и первые самостоятельные программы.'
        }
      ],
      photos: [
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/atmosphere-pool-kids.jpeg',alt:'Атмосфера лагеря'},
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/a5f92a14_photo_2025-06-14_08-.jpg',alt:'all'},
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/8cca10f8_photo.jpg',alt:'all'},
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/1ac9b8f7_photo_2025-06-14_08-.jpg',alt:'all'},
        {cat:'all',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/1063273d_photo_2025-06-17_13-.jpg',alt:'all'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/a591ceb9_IMG_1543.JPG',alt:'study'},
        {cat:'food',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/9e4f4646_photo_2025-06-14_08-.jpg',alt:'food'},
        {cat:'food',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/8aee104b_photo_2025-06-14_08-.jpg',alt:'food'},
        {cat:'food',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/5babf9c8_photo.jpg',alt:'food'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/d8b90de0_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/7e509c20_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/81652cd9_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/0e2e55a2_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'pool',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/pool-kids-training.webp',alt:'Бассейн'},
        {cat:'pool',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/0d2ab9ef_photo_2025-06-14_08-.jpg',alt:'pool'},
        {cat:'pool',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/6a17713f_photo_2025-06-14_08-.jpg',alt:'pool'},
        {cat:'sport',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/cab7c193_photo.jpg',alt:'sport'},
        {cat:'sport',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/841dac3d_photo_2025-06-14_07-.jpg',alt:'sport'},
        {cat:'sport',src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/e7095a88_photo_2025-06-14_08-.jpg',alt:'sport'}
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
    const BOOKING_SCARCITY_KEY = 'aidacamp_booking_scarcity_v1';
    const BOOKING_SCARCITY_BASE = 63;
    const BOOKING_SCARCITY_STEP = 7;
    const BOOKING_SCARCITY_MAX = 98;

    let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {
      age:null,
      shiftId:null,
      basePrice:null,
      offerPrice:null,
      code:null,
      expiresAt:null,
      offerStage:0,
      view:'desktop',
      phone:''
    };

    const METRIKA_ID = 96499295;
    const USE_DESKTOP_BASE_FOR_MOBILE = true;
    const BUILD_VERSION_LABEL = 'v0.0.246 (offer-booking-modals-compact-33pct)';
    const QUALITY_SCORE_MODEL = Object.freeze({
      scale: '0..10',
      debtScale: '0 best .. 10 worst',
      baselineVersion: 'v0.0.112 (debug-offer-layout-switch)',
      css: Object.freeze({
        start: 10,
        penalties: Object.freeze({
          duplicateSelectors: 0.25,
          deadRules: 0.2,
          highSpecificityHotspots: 0.35,
          stageLeakage: 0.4,
          mobileDesktopDivergence: 0.35
        })
      }),
      js: Object.freeze({
        start: 10,
        penalties: Object.freeze({
          branchComplexity: 0.35,
          stateCoupling: 0.35,
          duplicateHandlers: 0.25,
          magicNumbers: 0.15,
          legacyFlagsInProdPath: 0.35
        })
      }),
      debt: Object.freeze({
        start: 0,
        increments: Object.freeze({
          noGuardrails: 0.8,
          monolithEdits: 0.7,
          duplicatedUiLogic: 0.7,
          unresolvedStageRegressions: 0.9,
          debugArtifactsInProdPath: 0.7
        })
      })
    });
    const AIDACAMP_RUNTIME = (window.__AIDACAMP_RUNTIME && typeof window.__AIDACAMP_RUNTIME === 'object')
      ? window.__AIDACAMP_RUNTIME
      : {};
    window.__AIDACAMP_RUNTIME = AIDACAMP_RUNTIME;
    AIDACAMP_RUNTIME.quality = AIDACAMP_RUNTIME.quality || {};
    AIDACAMP_RUNTIME.quality.scoreModel = QUALITY_SCORE_MODEL;
    AIDACAMP_RUNTIME.quality.scoreSnapshot = Object.freeze({
      version: BUILD_VERSION_LABEL,
      css: 8.8,
      js: 8.6,
      techDebt: 1.5,
      debtScale: '0 best .. 10 worst',
      baselineVersion: QUALITY_SCORE_MODEL.baselineVersion
    });
    const HERO_CONTRAST_MODES = Object.freeze(['before', 'after', 'after-soft']);
    const HERO_MICRO_MODES = Object.freeze(['on', 'demo']);
    const OFFER_MODAL_THEMES = Object.freeze(['light', 'dark']);
    const OFFER_LAYOUT_MODES = Object.freeze(['legacy', 'current']);
    const normalizeMode = (value, allowedModes, fallbackMode) => (
      allowedModes.includes(value) ? value : fallbackMode
    );
    const VERSION_MONOTONIC_KEY = 'aidacamp_build_version_last_v1';
    const QUALITY_BASELINE_KEY = 'aidacamp_quality_baseline_v1';
    const DEBT_REGISTER_KEY = 'aidacamp_debt_register_v1';
    const QUALITY_SOFT_GATES = Object.freeze({
      cssDuplicateSelectorsMax: 320,
      jsBranchPointsMax: 760,
      jsListenersMax: 220,
      jsBytesMax: 360000,
      cssBytesMax: 240000
    });
    const GUARDRAIL_REQUIRED_SELECTORS = Object.freeze([
      '#desktopView',
      '#mobileView',
      '.hero-shell',
      '#desktop-booking-card',
      '#mobileBookingCard',
      '#summaryBar',
      '#offerOverlay',
      '#offerCard',
      '#sectionModal',
      '#videoModal',
      '#calendarModal'
    ]);
    const VERSION_BADGE_HIDDEN_KEY = 'aidacamp_version_badge_hidden_v1';
    const VIDEO_META_CACHE_KEY = 'aidacamp_video_meta_cache_v2';
    const VIDEO_META_CACHE_TTL_MS = 1000 * 60 * 60 * 4;
    const VIDEO_META_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 4;
    const COMPACT_MODAL_SECTIONS = new Set([
      'section-about',
      'section-journey',
      'section-programs',
      'section-photos',
      'section-videos',
      'section-reviews',
      'section-faq',
      'section-team',
      'section-stay',
      'section-contacts'
    ]);
    let timerId = null;
    let mediaIndex = 0;
    let mediaType = 'photo';
    let activePhotoList = [];
    let photoGalleryList = [];
    state.previewView = state.previewView || state.view || 'desktop';
    if(USE_DESKTOP_BASE_FOR_MOBILE && state.previewView === 'mobile'){
      state.view = 'desktop';
    }
    state.desktopMode = state.desktopMode || 'compact';
    state.mobileMode = state.mobileMode || 'compact';
    state.heroContrastMode = 'after-soft';
    state.heroMicroMode = 'off';
    state.offerModalTheme = 'light';
    state.offerLayout = state.offerLayout || 'legacy';
    state.ageSelected = typeof state.ageSelected === 'boolean' ? state.ageSelected : false;
    state.bookingCompleted = !!state.bookingCompleted;
    let stateWasNormalized = false;
    if(!state.age){
      if(state.ageSelected || state.shiftId || state.basePrice || state.offerPrice || state.code || state.expiresAt || state.offerStage || state.bookingCompleted){
        stateWasNormalized = true;
      }
      state.ageSelected = false;
      state.shiftId = null;
      state.basePrice = null;
      state.offerPrice = null;
      state.code = null;
      state.expiresAt = null;
      state.offerStage = 0;
      state.bookingCompleted = false;
    } else {
      if(!state.ageSelected){
        stateWasNormalized = true;
      }
      state.ageSelected = true;
      if(!state.shiftId){
        if(state.basePrice || state.offerPrice || state.code || state.expiresAt || state.offerStage || state.bookingCompleted){
          stateWasNormalized = true;
        }
        state.basePrice = null;
        state.offerPrice = null;
        state.code = null;
        state.expiresAt = null;
        state.offerStage = 0;
        state.bookingCompleted = false;
      }
    }
    const normalizedOfferStage = Number(state.offerStage);
    if(!Number.isFinite(normalizedOfferStage) || normalizedOfferStage < 0){
      state.offerStage = 0;
      stateWasNormalized = true;
    } else if(normalizedOfferStage > 4){
      state.offerStage = 4;
      stateWasNormalized = true;
    }
    if(stateWasNormalized){
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error){
        console.warn('[STATE] normalize persist failed', error);
      }
    }
    state.photoFilter = state.photoFilter || 'camp';
    state.faqFilter = state.faqFilter || 'Медицина';
    state.mobileJourneyStep = Number.isFinite(Number(state.mobileJourneyStep)) ? Number(state.mobileJourneyStep) : 0;
    state.mobileProgramShiftId = state.mobileProgramShiftId || '';
    state.mobilePhotoIndex = Number.isFinite(Number(state.mobilePhotoIndex)) ? Number(state.mobilePhotoIndex) : 0;
    state.mobileVideoIndex = Number.isFinite(Number(state.mobileVideoIndex)) ? Number(state.mobileVideoIndex) : 0;
    state.mobileReviewIndex = Number.isFinite(Number(state.mobileReviewIndex)) ? Number(state.mobileReviewIndex) : 0;
    state.mobileStayIndex = Number.isFinite(Number(state.mobileStayIndex)) ? Number(state.mobileStayIndex) : 0;
    state.mobileFaqGroup = state.mobileFaqGroup || 'Медицина';
    state.mobileFaqOpenKey = state.mobileFaqOpenKey || '';
    state.mobileTeamIndex = Number.isFinite(Number(state.mobileTeamIndex)) ? Number(state.mobileTeamIndex) : 0;
    // Mobile docs block must stay compact by default: requisites visible, legal links collapsed.
    state.mobileDocsExpanded = false;
    const metrikaSeen = new Set();
    const scrollMarks = {25:false,50:false,75:false,90:false};
    let offerTimeoutIds = [];
    let offerRunId = 0;
    let leadSubmitInProgress = false;
    let lastRenderedBookingStage = 0;
    let bookingScarcityState = (() => {
      try {
        const saved = JSON.parse(localStorage.getItem(BOOKING_SCARCITY_KEY) || 'null');
        const visits = Number(saved && saved.visits);
        return {
          visits: Number.isFinite(visits) && visits > 0 ? Math.floor(visits) : 0
        };
      } catch (error){
        return { visits: 0 };
      }
    })();
    let shiftOptionPanels = {
      desktop:{aboutId:null, calendarId:null},
      mobile:{aboutId:null, calendarId:null}
    };
    let desktopAgeTapHintTimer = null;
    let desktopAgeTapHintRunning = false;
    let desktopAgeTapHintPlayed = false;
    let desktopAgeTapHintToken = 0;
    const desktopAgeTapHintStartedAt = Date.now();
    let videoMetaRefreshTimer = null;

    function track(event, params = {}){
      try {
        if(typeof ym !== 'undefined'){
          ym(METRIKA_ID, 'reachGoal', event, params);
        }
      } catch (err){
        console.warn('Metrika track error:', event, err);
      }
    }

    function applyDebugUiState(){
      const badge = document.getElementById('version-badge');
      if(!badge) return;
      const badgeLabel = document.getElementById('version-badge-label');
      const isHidden = localStorage.getItem(VERSION_BADGE_HIDDEN_KEY) === '1';
      const label = BUILD_VERSION_LABEL.trim();
      if(badgeLabel) badgeLabel.textContent = label;
      badge.title = label;
      badge.classList.toggle('hidden', isHidden);
    }

    function trackOnce(event, params = {}){
      const key = `${event}:${JSON.stringify(params)}`;
      if(metrikaSeen.has(key)) return;
      metrikaSeen.add(key);
      track(event, params);
    }

    function parseBuildVersionNumber(label){
      const match = String(label || '').trim().match(/^v(\d+)\.(\d+)\.(\d+)/i);
      if(!match) return null;
      const major = Number(match[1]);
      const minor = Number(match[2]);
      const patch = Number(match[3]);
      if(!Number.isFinite(major) || !Number.isFinite(minor) || !Number.isFinite(patch)) return null;
      return (major * 1000000) + (minor * 1000) + patch;
    }

    function runBuildVersionGuardrail(){
      const currentLabel = BUILD_VERSION_LABEL.trim();
      const currentValue = parseBuildVersionNumber(currentLabel);
      const previousLabel = String(localStorage.getItem(VERSION_MONOTONIC_KEY) || '').trim();
      const previousValue = parseBuildVersionNumber(previousLabel);
      let monotonic = true;

      if(previousValue !== null && currentValue !== null && currentValue < previousValue){
        monotonic = false;
        console.error('[GUARDRAIL] Version regression detected', {
          previous: previousLabel,
          current: currentLabel
        });
        trackOnce('guardrail_version_regression', {
          previous: previousLabel,
          current: currentLabel
        });
      } else if(currentValue !== null){
        localStorage.setItem(VERSION_MONOTONIC_KEY, currentLabel);
      }

      return {
        ok: monotonic,
        previous: previousLabel || null,
        current: currentLabel,
        previousValue,
        currentValue
      };
    }

    function runRuntimeSmokeGuardrail(){
      const missing = [];
      GUARDRAIL_REQUIRED_SELECTORS.forEach((selector) => {
        if(!document.querySelector(selector)){
          missing.push(selector);
        }
      });
      const ok = missing.length === 0;
      if(!ok){
        console.error('[GUARDRAIL] Smoke check failed', { missing });
        trackOnce('guardrail_smoke_failed', {
          missing: missing.slice(0, 6).join(',')
        });
      }
      return {
        ok,
        checked: GUARDRAIL_REQUIRED_SELECTORS.length,
        missing
      };
    }

    function runGuardrails(){
      const version = runBuildVersionGuardrail();
      const smoke = runRuntimeSmokeGuardrail();
      const summary = {
        timestamp: new Date().toISOString(),
        build: BUILD_VERSION_LABEL,
        version,
        smoke,
        ok: !!(version.ok && smoke.ok)
      };
      AIDACAMP_RUNTIME.quality.guardrails = summary;
      return summary;
    }

    function pickMainScriptText(){
      const scripts = Array.from(document.querySelectorAll('script:not([type="application/json"])'));
      let candidate = '';
      scripts.forEach((node) => {
        const text = String(node.textContent || '');
        if(text.length > candidate.length){
          candidate = text;
        }
      });
      return candidate;
    }

    function collectDuplicateSelectors(cssText){
      const map = new Map();
      const cleaned = String(cssText || '')
        .replace(/\/\*[\s\S]*?\*\//g, '');
      const blocks = cleaned.split('{');
      blocks.forEach((left) => {
        const selectorRaw = String(left || '').trim();
        if(!selectorRaw || selectorRaw.startsWith('@')) return;
        selectorRaw
          .split(',')
          .map((item) => item.trim().replace(/\s+/g, ' '))
          .filter(Boolean)
          .forEach((selector) => {
            const current = map.get(selector) || 0;
            map.set(selector, current + 1);
          });
      });
      let duplicates = 0;
      map.forEach((count) => {
        if(count > 1) duplicates += 1;
      });
      return {
        uniqueSelectors: map.size,
        duplicateSelectors: duplicates
      };
    }

    function runQualityBaselineAudit(){
      let previousBaseline = null;
      try {
        previousBaseline = JSON.parse(localStorage.getItem(QUALITY_BASELINE_KEY) || 'null');
      } catch (error){
        previousBaseline = null;
      }

      const cssNode = document.querySelector('style');
      const cssText = String(cssNode?.textContent || '');
      const jsText = pickMainScriptText();
      const cssRules = (cssText.match(/{/g) || []).length;
      const jsFunctions = (jsText.match(/\bfunction\s+[a-zA-Z0-9_$]+\s*\(/g) || []).length;
      const jsBranches = (jsText.match(/\bif\s*\(|\bswitch\s*\(/g) || []).length;
      const jsListeners = (jsText.match(/addEventListener\s*\(/g) || []).length;
      const selectorStats = collectDuplicateSelectors(cssText);
      const makeDelta = (current, previous) => {
        if(!Number.isFinite(Number(current)) || !Number.isFinite(Number(previous))) return null;
        return Number(current) - Number(previous);
      };

      const delta = Object.freeze({
        versionFrom: previousBaseline?.version || null,
        css: Object.freeze({
          bytes: makeDelta(cssText.length, previousBaseline?.css?.bytes),
          rules: makeDelta(cssRules, previousBaseline?.css?.rules),
          uniqueSelectors: makeDelta(selectorStats.uniqueSelectors, previousBaseline?.css?.uniqueSelectors),
          duplicateSelectors: makeDelta(selectorStats.duplicateSelectors, previousBaseline?.css?.duplicateSelectors)
        }),
        js: Object.freeze({
          bytes: makeDelta(jsText.length, previousBaseline?.js?.bytes),
          functions: makeDelta(jsFunctions, previousBaseline?.js?.functions),
          branchPoints: makeDelta(jsBranches, previousBaseline?.js?.branchPoints),
          listeners: makeDelta(jsListeners, previousBaseline?.js?.listeners)
        })
      });

      const snapshot = Object.freeze({
        version: BUILD_VERSION_LABEL,
        timestamp: new Date().toISOString(),
        delta,
        css: Object.freeze({
          bytes: cssText.length,
          rules: cssRules,
          uniqueSelectors: selectorStats.uniqueSelectors,
          duplicateSelectors: selectorStats.duplicateSelectors
        }),
        js: Object.freeze({
          bytes: jsText.length,
          functions: jsFunctions,
          branchPoints: jsBranches,
          listeners: jsListeners
        })
      });

      AIDACAMP_RUNTIME.quality.baseline = snapshot;
      AIDACAMP_RUNTIME.quality.baselineDelta = delta;
      try {
        localStorage.setItem(QUALITY_BASELINE_KEY, JSON.stringify(snapshot));
      } catch (error){
        console.warn('[QUALITY] baseline persist failed', error);
      }
      return snapshot;
    }

    function evaluateSoftQualityGates(snapshot){
      const data = snapshot || AIDACAMP_RUNTIME.quality.baseline;
      if(!data) return { ok:false, warnings:['baseline_missing'], thresholds: QUALITY_SOFT_GATES };

      const warnings = [];
      const pushWarn = (key, value, max) => {
        warnings.push(`${key}:${value}>${max}`);
      };

      if((data.css?.duplicateSelectors || 0) > QUALITY_SOFT_GATES.cssDuplicateSelectorsMax){
        pushWarn('css.duplicateSelectors', data.css.duplicateSelectors, QUALITY_SOFT_GATES.cssDuplicateSelectorsMax);
      }
      if((data.css?.bytes || 0) > QUALITY_SOFT_GATES.cssBytesMax){
        pushWarn('css.bytes', data.css.bytes, QUALITY_SOFT_GATES.cssBytesMax);
      }
      if((data.js?.branchPoints || 0) > QUALITY_SOFT_GATES.jsBranchPointsMax){
        pushWarn('js.branchPoints', data.js.branchPoints, QUALITY_SOFT_GATES.jsBranchPointsMax);
      }
      if((data.js?.listeners || 0) > QUALITY_SOFT_GATES.jsListenersMax){
        pushWarn('js.listeners', data.js.listeners, QUALITY_SOFT_GATES.jsListenersMax);
      }
      if((data.js?.bytes || 0) > QUALITY_SOFT_GATES.jsBytesMax){
        pushWarn('js.bytes', data.js.bytes, QUALITY_SOFT_GATES.jsBytesMax);
      }

      const result = {
        ok: warnings.length === 0,
        warnings,
        thresholds: QUALITY_SOFT_GATES,
        version: BUILD_VERSION_LABEL
      };
      AIDACAMP_RUNTIME.quality.softGates = result;

      if(!result.ok){
        console.warn('[QUALITY] soft gates warnings', result);
        trackOnce('quality_soft_gates_warn', {
          count: warnings.length,
          top: warnings[0] || ''
        });
      }
      return result;
    }

    function buildDebtRegister(guardrails, baseline, gates){
      const items = [];
      const addItem = (id, severity, source, detail) => {
        items.push({
          id,
          severity,
          source,
          detail
        });
      };

      if(!guardrails?.version?.ok){
        addItem(
          'version-regression',
          'critical',
          'guardrails.version',
          `Версия откатилась: ${guardrails?.version?.previous || 'n/a'} -> ${guardrails?.version?.current || 'n/a'}`
        );
      }

      if(!guardrails?.smoke?.ok){
        addItem(
          'runtime-smoke-missing-selectors',
          'high',
          'guardrails.smoke',
          `Отсутствуют критические селекторы: ${(guardrails?.smoke?.missing || []).slice(0, 6).join(', ')}`
        );
      }

      const warnings = gates?.warnings || [];
      warnings.forEach((warning) => {
        const key = String(warning || '').split(':')[0];
        const severity = key.includes('bytes') ? 'medium' : 'high';
        addItem(
          `quality-gate-${key || 'unknown'}`,
          severity,
          'quality.soft-gates',
          warning
        );
      });

      if((baseline?.css?.duplicateSelectors || 0) > 280){
        addItem(
          'css-duplicate-selector-pressure',
          'medium',
          'quality.baseline.css',
          `Дубли селекторов=${baseline.css.duplicateSelectors}, желательно < 280`
        );
      }

      const scoreMap = { low: 1, medium: 2, high: 3, critical: 4 };
      const pressure = items.reduce((sum, item) => sum + (scoreMap[item.severity] || 0), 0);
      const summary = {
        version: BUILD_VERSION_LABEL,
        timestamp: new Date().toISOString(),
        debtItems: items,
        pressureScore: pressure,
        pressureLevel: pressure >= 9 ? 'high' : (pressure >= 4 ? 'medium' : 'low')
      };

      AIDACAMP_RUNTIME.quality.debtRegister = summary;
      try {
        localStorage.setItem(DEBT_REGISTER_KEY, JSON.stringify(summary));
      } catch (error){
        console.warn('[DEBT] register persist failed', error);
      }
      return summary;
    }

    function buildRuntimeQualityScore(baseline, gates, debtRegister){
      const globalAidacampExports = Object.keys(window).filter((key) => key.startsWith('__AIDACAMP_')).length;
      const cssDupPenalty = Math.min(2.2, Math.max(0, ((baseline?.css?.duplicateSelectors || 0) - 220) / 120));
      const cssSizePenalty = Math.min(1.8, Math.max(0, ((baseline?.css?.bytes || 0) - 180000) / 80000));
      const cssRulePenalty = Math.min(1.4, Math.max(0, ((baseline?.css?.rules || 0) - 1100) / 400));
      const jsBranchPenalty = Math.min(2.2, Math.max(0, ((baseline?.js?.branchPoints || 0) - 620) / 220));
      const jsFunctionPenalty = Math.min(1.6, Math.max(0, ((baseline?.js?.functions || 0) - 180) / 80));
      const jsListenerPenalty = Math.min(1.6, Math.max(0, ((baseline?.js?.listeners || 0) - 170) / 90));
      const jsSizePenalty = Math.min(1.8, Math.max(0, ((baseline?.js?.bytes || 0) - 280000) / 120000));
      const gatesPenalty = Math.min(1.5, (gates?.warnings?.length || 0) * 0.3);
      const globalFootprintPenalty = Math.min(1.1, Math.max(0, ((globalAidacampExports - 2) / 6) * 0.9));
      const architectureSignals = Object.freeze({
        runtimeStore: !!AIDACAMP_RUNTIME,
        qualityStore: !!AIDACAMP_RUNTIME?.quality,
        pipelineNamespace: !!AIDACAMP_RUNTIME?.quality?.pipeline,
        runAllOrchestrator: typeof AIDACAMP_RUNTIME?.quality?.pipeline?.runAll === 'function',
        lowGlobalExports: globalAidacampExports <= 2
      });
      const architectureSignalCount = Object.values(architectureSignals).filter(Boolean).length;
      const architectureBonus = Math.min(1.2, architectureSignalCount * 0.24);

      const cssScore = Math.max(0, Math.min(10, Number((10 - cssDupPenalty - cssSizePenalty - gatesPenalty * 0.35).toFixed(1))));
      const jsScore = Math.max(0, Math.min(10, Number((10 - jsBranchPenalty - jsListenerPenalty - jsSizePenalty - gatesPenalty * 0.4).toFixed(1))));
      const debtScore = Math.max(
        0,
        Math.min(
          10,
          Number((((debtRegister?.pressureScore || 0) * 0.55) + (gates?.warnings?.length || 0) * 0.35).toFixed(1))
        )
      );
      const pipelineBonus = AIDACAMP_RUNTIME.quality.pipeline ? 0.6 : 0;
      const monolithScore = Math.max(
        0,
        Math.min(
          10,
          Number((
            10
            - cssRulePenalty * 0.8
            - cssSizePenalty * 0.4
            - jsFunctionPenalty * 0.9
            - jsBranchPenalty * 0.8
            - jsSizePenalty * 0.5
            - globalFootprintPenalty
            + architectureBonus
          ).toFixed(1))
        )
      );

      const runtimeScore = Object.freeze({
        version: BUILD_VERSION_LABEL,
        timestamp: new Date().toISOString(),
        css: cssScore,
        js: jsScore,
        techDebt: debtScore,
        debtScale: '0 best .. 10 worst',
        monolithness: monolithScore,
        monolithScale: '0 monolith .. 10 modular',
        globalExports: globalAidacampExports,
        architectureSignals: architectureSignals
      });
      AIDACAMP_RUNTIME.quality.runtimeScore = runtimeScore;
      return runtimeScore;
    }

    function buildQualityTrendSummary(delta){
      const d = delta || AIDACAMP_RUNTIME.quality.baselineDelta || {};
      const probes = [
        { key:'css.bytes', value:d?.css?.bytes },
        { key:'css.duplicateSelectors', value:d?.css?.duplicateSelectors },
        { key:'js.bytes', value:d?.js?.bytes },
        { key:'js.branchPoints', value:d?.js?.branchPoints },
        { key:'js.listeners', value:d?.js?.listeners }
      ];
      let better = 0;
      let worse = 0;
      const details = [];
      probes.forEach((probe) => {
        const value = Number(probe.value);
        if(!Number.isFinite(value) || value === 0) return;
        if(value < 0){
          better += 1;
          details.push(`${probe.key}: ${value}`);
        } else {
          worse += 1;
          details.push(`${probe.key}: +${value}`);
        }
      });
      const trend = worse > better ? 'worse' : (better > worse ? 'better' : 'flat');
      const summary = Object.freeze({
        version: BUILD_VERSION_LABEL,
        fromVersion: d?.versionFrom || null,
        trend,
        better,
        worse,
        details
      });
      AIDACAMP_RUNTIME.quality.trend = summary;
      return summary;
    }

    function runReleaseIntegrityChecks(){
      const required = Object.freeze([
        'guardrails',
        'baseline',
        'softGates',
        'debtRegister',
        'runtimeScore'
      ]);
      const missing = required.filter((key) => (
        typeof AIDACAMP_RUNTIME.quality[key] === 'undefined' || AIDACAMP_RUNTIME.quality[key] === null
      ));
      const result = Object.freeze({
        version: BUILD_VERSION_LABEL,
        timestamp: new Date().toISOString(),
        ok: missing.length === 0,
        required,
        missing
      });
      AIDACAMP_RUNTIME.quality.releaseIntegrity = result;

      if(!result.ok){
        console.error('[RELEASE] integrity failed', result);
        trackOnce('release_integrity_failed', {
          count: missing.length,
          first: missing[0] || ''
        });
      }
      return result;
    }

    function printRuntimeStatusReport(){
      const runtime = AIDACAMP_RUNTIME.quality.runtimeScore || {};
      const integrity = AIDACAMP_RUNTIME.quality.releaseIntegrity || {};
      const gates = AIDACAMP_RUNTIME.quality.softGates || {};
      const trend = AIDACAMP_RUNTIME.quality.trend || {};
      const reportLine =
        `[AIDACAMP][STATUS] ${BUILD_VERSION_LABEL} | css=${runtime.css ?? 'n/a'}` +
        ` | js=${runtime.js ?? 'n/a'}` +
        ` | debt=${runtime.techDebt ?? 'n/a'}(0 best)` +
        ` | monolith=${runtime.monolithness ?? 'n/a'}(10 best)` +
        ` | integrity=${integrity.ok ? 'ok' : 'fail'}` +
        ` | softWarnings=${Array.isArray(gates.warnings) ? gates.warnings.length : 'n/a'}` +
        ` | trend=${trend.trend || 'n/a'}`;
      console.info(reportLine);
      AIDACAMP_RUNTIME.quality.statusLine = reportLine;
      return reportLine;
    }

    function runQualityPipelineAll(){
      const guardrailReport = runGuardrails();
      const qualityBaseline = runQualityBaselineAudit();
      const qualityGates = evaluateSoftQualityGates(qualityBaseline);
      const debtRegister = buildDebtRegister(guardrailReport, qualityBaseline, qualityGates);
      buildRuntimeQualityScore(qualityBaseline, qualityGates, debtRegister);
      buildQualityTrendSummary(qualityBaseline?.delta);
      runReleaseIntegrityChecks();
      printRuntimeStatusReport();
      return {
        guardrailReport,
        qualityBaseline,
        qualityGates,
        debtRegister
      };
    }

    const QUALITY_PIPELINE_NAMESPACE = Object.freeze({
      runGuardrails,
      runQualityBaselineAudit,
      evaluateSoftQualityGates,
      buildDebtRegister,
      buildRuntimeQualityScore,
      buildQualityTrendSummary,
      runReleaseIntegrityChecks,
      printRuntimeStatusReport,
      runAll: runQualityPipelineAll
    });
    AIDACAMP_RUNTIME.quality.pipeline = QUALITY_PIPELINE_NAMESPACE;

    const CLOSE_ICON_HTML = '<img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/close.svg" alt="" aria-hidden="true">';

    function normalizeCloseIconButtons(scope = document){
      const root = scope || document;
      const nodes = root.querySelectorAll(
        [
          '.version-badge-close',
          '.media-close',
          '.video-close',
          '.form-close',
          "[data-action='close-version-badge']",
          "[data-action='close-debug-controls']",
          "[data-action='close-form']",
          "[data-action='close-success']",
          "[data-action='close-section-modal']",
          "[data-action='close-video-modal']",
          "[data-action='close-calendar']"
        ].join(',')
      );

      nodes.forEach((btn) => {
        if(!btn || btn.dataset.closeIconNormalized === '1') return;

        const raw = (btn.textContent || '').trim();

        if(
          raw === '×' ||
          raw === '✕' ||
          btn.classList.contains('version-badge-close') ||
          btn.classList.contains('media-close') ||
          btn.classList.contains('video-close') ||
          btn.classList.contains('form-close') ||
          btn.classList.contains('offer-close-btn')
        ){
          if(!btn.querySelector('img.ac-icon')){
            btn.innerHTML = CLOSE_ICON_HTML;
          }
        }

        btn.dataset.closeIconNormalized = '1';
      });
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
        if(typeof updateSummaryBarVisibility === 'function'){
          updateSummaryBarVisibility();
        }
      }, {passive:true});
    }

    function initSummaryBarViewportSync(){
      const sync = () => {
        if(typeof updateSummaryBarVisibility === 'function'){
          updateSummaryBarVisibility();
        }
      };
      window.addEventListener('scroll', sync, {passive:true});
      window.addEventListener('orientationchange', sync, {passive:true});
      document.addEventListener('visibilitychange', () => {
        if(document.hidden) return;
        sync();
      });
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
      'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/hero-camp-sunset-20260328.jpeg'
    ];

    const HERO_MOBILE =
      'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/hero-camp-sunset-20260328.jpeg';

    let heroIndex = 0;
    let heroTimer = null;
    let heroResizeTimer = null;
    let summaryBarDismissUntilTs = 0;
    let summaryBarDismissTimer = null;

    function persist(){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function persistBookingScarcity(){
      try {
        localStorage.setItem(BOOKING_SCARCITY_KEY, JSON.stringify({
          visits: bookingScarcityState.visits
        }));
      } catch (error){
        // ignore storage failures
      }
    }

    function getBookingScarcityPercent(){
      const visits = Math.max(1, Number(bookingScarcityState.visits || 0));
      const raw = BOOKING_SCARCITY_BASE + ((visits - 1) * BOOKING_SCARCITY_STEP);
      return Math.min(BOOKING_SCARCITY_MAX, raw);
    }

    function initHero(){
      const isMobile = window.innerWidth < 768;

      const bg1 = document.getElementById('heroBg1');
      const bg2 = document.getElementById('heroBg2');
      const desktopView = document.getElementById('desktopView');
      if(!bg1) return;
      if(heroTimer){
        clearInterval(heroTimer);
        heroTimer = null;
      }
      if(desktopView){
        desktopView.classList.toggle('hero-static-bg', HERO_IMAGES.length <= 1);
      }

      if(isMobile){
        bg1.style.backgroundImage = `url(${HERO_MOBILE})`;
        bg1.classList.add('active');
        bg1.classList.remove('hidden');
        if(bg2){
          bg2.style.backgroundImage = `url(${HERO_MOBILE})`;
          bg2.classList.remove('active');
          bg2.classList.add('hidden');
        }
        return;
      }

      heroIndex = 0;
      bg1.style.backgroundImage = `url(${HERO_IMAGES[heroIndex]})`;
      bg1.classList.add('active');
      bg1.classList.remove('hidden');
      if(!bg2) return;
      bg2.classList.remove('active');
      bg2.classList.add('hidden');

      if(HERO_IMAGES.length <= 1){
        bg1.classList.add('active');
        bg1.classList.remove('hidden');
        bg2.style.backgroundImage = 'none';
        bg2.classList.remove('active');
        bg2.classList.add('hidden');
        return;
      }

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

    function openMedia(type, index){
      closeTransientModals('media', {keepSection: true});
      mediaType = type;
      mediaIndex = index;
      if(type === 'photo'){
        const source = activePhotoList.length ? activePhotoList : mediaContent.photos;
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
      document.getElementById('mediaLightbox').classList.remove('hidden');
    }

    function closeMedia(){
      document.getElementById('mediaLightbox').classList.add('hidden');
      document.getElementById('mediaContent').innerHTML = '';
    }

    function closeTransientModals(except = '', options = {}){
      const keepSection = !!options.keepSection;
      if(except !== 'section' && !keepSection){
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

      closeTransientModals('video', {keepSection: true});
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
      const card = modal.querySelector('.section-modal-card');
      modal.classList.add('hidden');
      modal.classList.remove('section-modal-compact');
      modal.classList.remove('section-modal-mobile');
      if(card){
        card.style.left = '';
        card.style.top = '';
        card.style.right = '';
        card.style.width = '';
        card.style.height = '';
      }
    }

    function setHeroMenuOpen(isOpen){
      const wrap = document.getElementById('heroMenuWrap');
      const toggle = document.getElementById('heroMenuToggle');
      const menu = document.getElementById('serviceMenu');
      if(!wrap || !toggle || !menu) return;
      const next = !!isOpen;
      wrap.dataset.open = next ? '1' : '0';
      toggle.setAttribute('aria-expanded', next ? 'true' : 'false');
      menu.classList.toggle('is-open', next);
      menu.hidden = !next;
    }

    function isHeroMenuOpen(){
      return document.getElementById('heroMenuWrap')?.dataset.open === '1';
    }

    function scrollVideoCarousel(direction = 1, scopeRoot = null){
      const scope = scopeRoot && scopeRoot.nodeType === 1 ? scopeRoot : document;
      const list = scope.querySelector('#videoList, .video-list');
      if(!list) return;
      const card = list.querySelector('.video-card');
      const gap = 12;
      const step = card ? (card.getBoundingClientRect().width + gap) : 260;
      list.scrollBy({left: step * direction, behavior:'smooth'});
    }

    function scrollTeamCarousel(direction = 1, scopeRoot = null){
      const scope = scopeRoot && scopeRoot.nodeType === 1 ? scopeRoot : document;
      const list = scope.querySelector('#teamCarousel, .team-carousel');
      if(!list) return;
      const card = list.querySelector('.team-card');
      const gap = 12;
      const step = card ? (card.getBoundingClientRect().width + gap) : 320;
      list.scrollBy({left: step * direction, behavior:'smooth'});
    }

    function applyCompactSectionModalLayout(){
      const modal = document.getElementById('sectionModal');
      const hero = document.getElementById('hero') || document.querySelector('#desktopView .hero-shell');
      const booking = document.getElementById('desktop-booking-card');
      const topbar = hero?.querySelector('.hero-topbar');
      const card = modal?.querySelector('.section-modal-card');
      if(!modal || !hero || !card || !modal.classList.contains('section-modal-compact')) return;

      const heroRect = hero.getBoundingClientRect();
      const bookingRoot = booking?.closest('.hero-booking-card') || booking;
      const bookingRect = bookingRoot ? bookingRoot.getBoundingClientRect() : null;
      const topbarRect = topbar ? topbar.getBoundingClientRect() : null;
      const inset = 14;
      const bookingGap = 14;
      const maxCompactWidth = 980;
      const minCompactWidth = 460;

      const left = Math.max(inset, Math.floor(heroRect.left + inset));
      const topAnchor = Math.floor(topbarRect ? (topbarRect.bottom + 8) : (heroRect.top + 10));
      const top = Math.max(inset, topAnchor);

      const heroRight = Math.floor(heroRect.right - inset);
      let slotRight = heroRight;
      if(bookingRect && bookingRect.width > 140 && bookingRect.left > left){
        slotRight = Math.min(slotRight, Math.floor(bookingRect.left - bookingGap));
      }

      const slotWidth = Math.floor(slotRight - left);
      if(slotWidth <= 0) return;

      const width = Math.max(Math.min(maxCompactWidth, slotWidth), Math.min(minCompactWidth, slotWidth));
      const rightEdge = left + width;
      const runtimeRight = Math.max(inset, Math.floor(window.innerWidth - rightEdge));
      const availableHeight = Math.floor((heroRect.bottom - inset) - top);
      if(availableHeight <= 0) return;

      modal.style.setProperty('--section-modal-compact-runtime-left', `${left}px`);
      modal.style.setProperty('--section-modal-compact-runtime-top', `${top}px`);
      modal.style.setProperty('--section-modal-compact-runtime-right', `${runtimeRight}px`);
      modal.style.setProperty('--section-modal-compact-runtime-width', `${width}px`);
      modal.style.setProperty('--section-modal-compact-runtime-height', `${availableHeight}px`);
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
      card.style.right = 'auto';
      card.style.width = `${width}px`;
      card.style.height = `${availableHeight}px`;
    }

    function openSectionModal(sectionId){
      const modal = document.getElementById('sectionModal');
      const titleEl = document.getElementById('sectionModalTitle');
      const bodyEl = document.getElementById('sectionModalBody');
      const sourceSection = document.getElementById(sectionId);
      if(!modal || !titleEl || !bodyEl || !sourceSection) return false;
      closeTransientModals('section');
      const isCompactDesktop = state.previewView === 'desktop' && state.desktopMode === 'compact';
      const isMobilePanel = state.previewView === 'mobile';
      modal.classList.toggle('section-modal-compact', isCompactDesktop);
      modal.classList.toggle('section-modal-mobile', isMobilePanel);

      const sourceTitle = sourceSection.querySelector('h3')?.textContent?.trim() || 'Раздел';
      titleEl.textContent = sourceTitle;

      const clone = sourceSection.cloneNode(true);
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      clone.classList.remove('section-modal-contacts');
      if(sectionId === 'section-contacts'){
        clone.classList.add('section-modal-contacts');
      }

      bodyEl.innerHTML = '';
      bodyEl.appendChild(clone);
      modal.classList.remove('hidden');
      applyCompactSectionModalLayout();
      return true;
    }

    function renderMediaViewer(){
      const content = document.getElementById('mediaContent');
      const caption = document.getElementById('mediaCaption');

      if(mediaType === 'photo'){
        const source = activePhotoList.length ? activePhotoList : mediaContent.photos;
        const item = source[mediaIndex];
        if(!item) return;
        content.innerHTML = `<img class="media-image" src="${item.src}" />`;
        caption.textContent = `${photoCatLabel(item.cat)} · ${mediaIndex + 1}/${source.length}`;
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
      const list = mediaType === 'photo'
        ? (activePhotoList.length ? activePhotoList : mediaContent.photos)
        : mediaContent.videos;
      mediaIndex = (mediaIndex + 1) % list.length;
      renderMediaViewer();
    }

    function prevMedia(){
      const list = mediaType === 'photo'
        ? (activePhotoList.length ? activePhotoList : mediaContent.photos)
        : mediaContent.videos;
      mediaIndex = (mediaIndex - 1 + list.length) % list.length;
      renderMediaViewer();
    }

    function handleDataActionClick(target){
      const actionEl = target.closest('[data-action]');
      if(!actionEl) return false;

      const action = actionEl.dataset.action;

      if(action === 'open-photo'){
        const index = Number(actionEl.dataset.photoIndex || 0);
        activePhotoList = photoGalleryList.length ? photoGalleryList.slice() : mediaContent.photos.slice();
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

      if(action === 'open-referral-photo'){
        activePhotoList = [{
          src:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/referral-hoodie.jpeg',
          alt:'Фирменная толстовка лагеря',
          cat:'all'
        }];
        openMedia('photo', 0);
        return true;
      }

      if(action === 'video-carousel-prev'){
        const scopeRoot = actionEl.closest('.section-modal-body') || document;
        scrollVideoCarousel(-1, scopeRoot);
        return true;
      }

      if(action === 'video-carousel-next'){
        const scopeRoot = actionEl.closest('.section-modal-body') || document;
        scrollVideoCarousel(1, scopeRoot);
        return true;
      }

      if(action === 'toggle-shift-about'){
        const shiftId = actionEl.dataset.shiftId || '';
        const viewKey = actionEl.dataset.shiftView || 'desktop';
        if(shiftId){
          if(viewKey === 'desktop'){
            openShiftAboutModal(shiftId);
          } else {
            toggleShiftOptionPanel(viewKey, 'aboutId', shiftId);
          }
        }
        return true;
      }

      if(action === 'toggle-shift-calendar-inline'){
        const shiftId = actionEl.dataset.shiftId || '';
        const viewKey = actionEl.dataset.shiftView || 'desktop';
        if(shiftId){
          if(viewKey === 'desktop'){
            openCalendar(shiftId);
          } else {
            toggleShiftOptionPanel(viewKey, 'calendarId', shiftId);
          }
        }
        return true;
      }

      if(action === 'open-all-shifts'){
        navigateToSection('section-programs');
        return true;
      }

      if(action === 'mobile-focus-age'){
        focusMobileAgeGate();
        return true;
      }

      if(action === 'dismiss-summary-bar'){
        dismissSummaryBarTemporarily(30000);
        return true;
      }

      if(action === 'mobile-photo-select'){
        const index = Number(actionEl.dataset.photoIndex || 0);
        if(Number.isFinite(index)){
          const photosByFilter = {
            camp: ['all'],
            pool: ['pool'],
            sport: ['sport'],
            study: ['study'],
            food: ['food']
          };
          const tags = photosByFilter[state.photoFilter] || ['all'];
          const list = mediaContent.photos.filter((item) => tags.includes(item.cat));
          const maxIndex = Math.max(0, (list.length || 1) - 1);
          state.mobilePhotoIndex = Math.max(0, Math.min(index, maxIndex));
          renderCompactTrustPanelContent();
          openMedia('photo', state.mobilePhotoIndex);
          persist();
        }
        return true;
      }

      if(action === 'mobile-video-select'){
        const index = Number(actionEl.dataset.videoIndex || 0);
        if(Number.isFinite(index)){
          const maxIndex = Math.max(0, (mediaContent.videos?.length || 1) - 1);
          state.mobileVideoIndex = Math.max(0, Math.min(index, maxIndex));
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-review-select'){
        const index = Number(actionEl.dataset.reviewIndex || 0);
        if(Number.isFinite(index)){
          const maxIndex = Math.max(0, (mediaContent.reviews?.length || 1) - 1);
          state.mobileReviewIndex = Math.max(0, Math.min(index, maxIndex));
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-review-prev'){
        const total = Math.max(0, mediaContent.reviews?.length || 0);
        if(total){
          state.mobileReviewIndex = (Math.max(0, state.mobileReviewIndex || 0) - 1 + total) % total;
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-review-next'){
        const total = Math.max(0, mediaContent.reviews?.length || 0);
        if(total){
          state.mobileReviewIndex = (Math.max(0, state.mobileReviewIndex || 0) + 1) % total;
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-stay-select'){
        const index = Number(actionEl.dataset.stayIndex || 0);
        if(Number.isFinite(index)){
          state.mobileStayIndex = Math.max(0, index);
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-faq-filter'){
        const group = (actionEl.dataset.faqGroup || '').trim();
        if(group){
          state.mobileFaqGroup = group;
          state.mobileFaqOpenKey = '';
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-faq-toggle'){
        const key = (actionEl.dataset.faqKey || '').trim();
        if(key){
          state.mobileFaqOpenKey = key;
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-team-prev'){
        const list = mediaContent.team.filter((item) => item.fio !== 'Дарья Афанасьева');
        if(list.length){
          state.mobileTeamIndex = (state.mobileTeamIndex - 1 + list.length) % list.length;
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-team-next'){
        const list = mediaContent.team.filter((item) => item.fio !== 'Дарья Афанасьева');
        if(list.length){
          state.mobileTeamIndex = (state.mobileTeamIndex + 1 + list.length) % list.length;
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
            state.mobileTeamIndex = Math.max(0, Math.min(index, list.length - 1));
            renderCompactTrustPanelContent();
            persist();
          }
        }
        return true;
      }

      if(action === 'mobile-journey-step'){
        const index = Number(actionEl.dataset.stepIndex || 0);
        if(Number.isFinite(index)){
          state.mobileJourneyStep = Math.max(0, Math.min(index, 3));
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-program-select'){
        const shiftId = (actionEl.dataset.shiftId || '').trim();
        if(shiftId){
          state.mobileProgramShiftId = shiftId;
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-docs-toggle'){
        state.mobileDocsExpanded = !state.mobileDocsExpanded;
        syncMobileDocsExpandedUi();
        renderDesktopMobileDocsBlock();
        syncMobileDocsExpandedUi();
        persist();
        return true;
      }

      if(action === 'open-book-photo'){
        activePhotoList = [{ src: 'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/8fc8172e_8991804334.webp', alt: 'Собственная книга по Python', cat: 'study' }];
        openMedia('photo', 0);
        return true;
      }

      if(action === 'team-carousel-prev'){
        const scopeRoot = actionEl.closest('.section-modal-body') || document;
        scrollTeamCarousel(-1, scopeRoot);
        return true;
      }

      if(action === 'team-carousel-next'){
        const scopeRoot = actionEl.closest('.section-modal-body') || document;
        scrollTeamCarousel(1, scopeRoot);
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
        state.offerStage = Math.max(state.offerStage, 1);
        persist();
        renderAll();
        document.getElementById('offerOverlay')?.classList.add('hidden');
        openForm();
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

      if(action === 'submit-inline-lead'){
        const scope = (actionEl.dataset.inlineScope || '').trim();
        submitLeadFromScope(scope);
        return true;
      }

      if(action === 'close-success'){
        closeSuccessModal();
        return true;
      }

      if(action === 'close-notice'){
        closeNoticeModal();
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

      if(action === 'invite-friend'){
        openNoticeModal('Ссылку-приглашение добавим в следующем шаге.');
        return true;
      }

      if(action === 'copy-invite-link'){
        const inviteUrl = `${window.location.origin}${window.location.pathname}?invite=${encodeURIComponent(state.code || 'aidacamp')}`;
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(inviteUrl)
            .then(() => openNoticeModal('Ссылка приглашения скопирована.'))
            .catch(() => openNoticeModal('Не удалось скопировать автоматически. Скопируйте ссылку из адресной строки.'));
        } else {
          openNoticeModal('Скопируйте ссылку из адресной строки браузера.');
        }
        return true;
      }

      if(action === 'close-debug-controls'){
        document.getElementById('debugControls')?.classList.add('hidden');
        return true;
      }

      if(action === 'close-version-badge'){
        document.getElementById('version-badge')?.classList.add('hidden');
        localStorage.setItem(VERSION_BADGE_HIDDEN_KEY, '1');
        return true;
      }

      if(action === 'toggle-hero-menu'){
        setHeroMenuOpen(!isHeroMenuOpen());
        return true;
      }

      return false;
    }

    async function notifyLead(eventName, payload){
      const cfg = window.AC_NOTIFY_CONFIG || {};
      const body = {event: eventName, payload};
      const endpoint = cfg.leadEndpoint || '/api/lead';

      try {
        const response = await fetch(endpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(body),
          keepalive:true
        });
        if(response.ok){
          return {ok: true, delivered: true, endpoint};
        }

        const telegramResult = await sendLeadToTelegram(eventName, payload, cfg);
        if(telegramResult.ok){
          saveLeadFallbackMeta(eventName, endpoint, `http_${response.status}_telegram_ok`);
          return telegramResult;
        }

        saveLeadFallbackMeta(eventName, endpoint, `http_${response.status}`);
        console.warn('[LEAD_MOCK_FALLBACK]', {endpoint, body});
        return {ok: false, delivered: false, fallback: true};
      } catch(error){
        const telegramResult = await sendLeadToTelegram(eventName, payload, cfg);
        if(telegramResult.ok){
          saveLeadFallbackMeta(eventName, endpoint, 'network_telegram_ok');
          return telegramResult;
        }
        console.error('notifyLead error', error);
        saveLeadFallbackMeta(eventName, endpoint, String(error));
        return {ok: false, delivered: false, fallback: true, error: String(error)};
      }
    }

    async function sendLeadToTelegram(eventName, payload, cfg){
      const token = String(cfg?.telegramBotToken || '');
      const chatId = String(cfg?.telegramChatId || '');
      if(!token || !chatId){
        return {ok:false, delivered:false, fallback:true, reason:'telegram_not_configured'};
      }
      try {
        const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            chat_id: chatId,
            text: formatTelegramMessage(eventName, payload),
            disable_web_page_preview: true
          }),
          keepalive:true
        });
        if(tgResponse.ok){
          return {ok:true, delivered:true, endpoint:'telegram_bot', fallback:true};
        }
      } catch(error){
      }
      return {ok:false, delivered:false, fallback:true};
    }

    function isAdminDebugSession(){
      try {
        if(window.AC_DEBUG === true) return true;
        const search = new URLSearchParams(window.location.search || '');
        const adminFlag = (search.get('admin') || search.get('debug') || '').toLowerCase();
        if(['1', 'true', 'yes', 'on'].includes(adminFlag)) return true;
        const storedFlag = String(localStorage.getItem('aidacamp_admin_debug') || '').toLowerCase();
        return ['1', 'true', 'yes', 'on'].includes(storedFlag);
      } catch(error){
        return false;
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
      const age = String(state.age || '').trim();
      return !!state.ageSelected || age === '7-9' || age === '10-12' || age === '13-14';
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
        state.ageSelected = true;
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
      const fromDesktopCards = Array.from(document.querySelectorAll('#section-stay .stay-card')).map((card) => {
        const image = card.querySelector('img');
        if(!image) return null;
        const title = (card.querySelector('.stay-card-body strong')?.textContent || '').trim();
        return {
          cat:'stay',
          src:image.getAttribute('src') || '',
          alt:image.getAttribute('alt') || title || 'Размещение'
        };
      }).filter((item) => item && item.src);

      if(fromDesktopCards.length){
        return fromDesktopCards;
      }

      const fromMobilePreview = Array.from(document.querySelectorAll('.mobile-stay-preview-thumb img, .mobile-stay-feature-photo img'))
        .map((img) => {
          const src = img.getAttribute('src') || '';
          if(!src) return null;
          return {
            cat:'stay',
            src,
            alt:img.getAttribute('alt') || 'Размещение'
          };
        })
        .filter((item) => item && item.src);

      const unique = [];
      const seen = new Set();
      fromMobilePreview.forEach((item) => {
        if(seen.has(item.src)) return;
        seen.add(item.src);
        unique.push(item);
      });
      return unique;
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

      const keepView = state.previewView || state.view || 'desktop';
      const keepDesktopMode = state.desktopMode || 'full';
      const keepMobileMode = state.mobileMode || 'full';
      const keepOfferModalTheme = state.offerModalTheme === 'dark' ? 'dark' : 'light';
      const keepOfferLayout = state.offerLayout || 'legacy';
      state = {
        age: null,
        ageSelected: false,
        bookingCompleted: false,
        shiftId: null,
        basePrice: null,
        offerPrice: null,
        code: null,
        expiresAt: null,
        offerStage: 0,
        view: keepView,
        previewView: keepView,
        phone: '',
        desktopMode: keepDesktopMode,
        mobileMode: keepMobileMode,
        offerModalTheme: keepOfferModalTheme,
        offerLayout: keepOfferLayout,
        photoFilter: 'camp',
        faqFilter: 'Медицина',
        mobileJourneyStep: 0,
        mobileProgramShiftId: '',
        mobilePhotoIndex: 0,
        mobileVideoIndex: 0,
        mobileReviewIndex: 0,
        mobileStayIndex: 0,
        mobileFaqGroup: 'Медицина',
        mobileFaqOpenKey: '',
        mobileTeamIndex: 0,
        mobileDocsExpanded: false,
        offerSearching: false
      };

      ['parentName','parentPhone'].forEach((id) => {
        const input = document.getElementById(id);
        if(input) input.value = '';
      });
      const consentCheck = document.getElementById('consentCheck');
      if(consentCheck) consentCheck.checked = false;
      setPhoneError(false);
      ['desktopInlineLeadHost','mobileInlineLeadHost','offerInlineLeadHost'].forEach((id) => {
        const host = document.getElementById(id);
        if(host){
          host.classList.add('hidden');
          host.innerHTML = '';
        }
      });
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
      applyDesktopMode();
      applyMobileMode();
      persist();
      showHint('Сценарий бронирования сброшен. Начните с выбора возраста.');
    }

    function getShiftContextLine(shift){
      if(!shift) return '';
      if(!hasSelectedAge()){
        return '';
      }
      const age = ageLabel(state.age);
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
          text:'Показать подходящие смены',
          disabled:true,
          hint:''
        };
      }

      if(state.bookingCompleted){
        return {
          text:'Заявка принята',
          disabled:true,
          hint:''
        };
      }

      if(!shift){
        return {
          text:'Выберите смену',
          disabled:true,
          hint:''
        };
      }

      if(state.offerStage === 0){
        return {
          text:'Уточнить цену',
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

    function getResolvedPrimaryActionText(actionState, shift){
      if(!actionState) return '';
      if(!shift || state.offerStage < 1){
        return actionState.text || '';
      }
      const baseForGain = state.basePrice || shift.price || 0;
      const gainValue = Math.max(0, baseForGain - (state.offerPrice || baseForGain));
      return gainValue > 0
        ? `Оформить заявку · выгода ${formatPrice(gainValue)}`
        : 'Оформить заявку';
    }

    function getStepState(){
      syncGuidedState();
      if(state.bookingCompleted){
        return 4;
      }
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
      const cardId = prefix === 'desktop' ? 'desktop-booking-card' : `${prefix}BookingCard`;
      const card = document.getElementById(cardId);
      if(!card) return;
      const stage = getBookingStage();
      card.classList.remove('booking-stage-1', 'booking-stage-2', 'booking-stage-3', 'booking-stage-4');
      card.classList.remove('booking-completed');
      card.classList.add(`booking-stage-${stage}`);
      if(state.bookingCompleted){
        card.classList.add('booking-completed');
      }
      const stepThree = card.querySelector('.booking-step-3');
      if(stepThree){
        stepThree.classList.toggle('is-force-hidden', stage < 3);
      }
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
      const stage = getBookingStage();
      const shiftList = document.getElementById(`${prefix}ShiftList`);
      const ctaWrap = document.getElementById(`${prefix}CtaWrap`);
      const ageTabs = document.getElementById(`${prefix}AgeTabs`);
      const chipHost = document.getElementById(`${prefix}BookingSummaryChips`);
      const ageChip = document.getElementById(`${prefix}AgeChip`);
      const ageChipText = document.getElementById(`${prefix}AgeChipText`);
      const shiftChip = document.getElementById(`${prefix}ShiftChip`);
      const shiftChipText = document.getElementById(`${prefix}ShiftChipText`);
      const bookingCard = document.getElementById(prefix === 'desktop' ? 'desktop-booking-card' : `${prefix}BookingCard`);
      const stepThree = bookingCard?.querySelector('.booking-step-3');
      const allShiftsBtn = bookingCard?.querySelector('.booking-all-shifts-link');

      if(!shiftList || !ctaWrap || !ageTabs || !ageChip || !ageChipText || !shiftChip || !shiftChipText) return;
      const isMobile = prefix === 'mobile';
      if(state.bookingCompleted){
        shiftList.classList.add('disabled');
        ageTabs.classList.add('hidden');
        ctaWrap.classList.add('hidden');
        ageChip.classList.remove('visible');
        shiftChip.classList.remove('visible');
        if(chipHost){
          chipHost.classList.remove('visible');
        }
        if(stepThree){
          stepThree.classList.add('is-force-hidden');
        }
        if(allShiftsBtn){
          allShiftsBtn.classList.add('hidden');
        }
        if(isMobile){
          document.getElementById('mobileBookingCard')?.classList.remove('has-mobile-summary-chips');
        }
        return;
      }
      if(allShiftsBtn){
        allShiftsBtn.textContent = hasSelectedAge()
          ? `Все смены для ${ageLabel(state.age)}`
          : 'Все смены по возрастам';
        allShiftsBtn.classList.toggle('hidden', stage !== 2 || state.offerStage >= 1);
      }
      if(chipHost){
        if(ageChip.parentElement !== chipHost){
          chipHost.appendChild(ageChip);
        }
        if(shiftChip.parentElement !== chipHost){
          chipHost.appendChild(shiftChip);
        }
      }

      shiftList.classList.remove('disabled','highlight','collapsed');
      ctaWrap.classList.remove('hidden');
      ctaWrap.classList.remove('highlight');
      ageTabs.classList.remove('hidden');
      ageChip.classList.remove('visible');
      shiftChip.classList.remove('visible');
      if(chipHost){
        chipHost.classList.remove('visible');
      }
      if(stepThree){
        stepThree.classList.add('is-force-hidden');
      }
      if(isMobile){
        document.getElementById('mobileBookingCard')?.classList.remove('has-mobile-summary-chips');
      }

      if(!hasSelectedAge()){
        shiftList.classList.add('disabled');
        return;
      }

      ageChipText.textContent = ageLabel(state.age);
      ageChip.classList.add('visible');
      if(chipHost){
        chipHost.classList.add('visible');
      }
      ageTabs.classList.add('hidden');

      if(hasSelectedAge() && !state.shiftId){
        shiftList.classList.remove('collapsed');
        shiftList.classList.add('highlight');
        return;
      }

      const shift = getSelectedShift();
      if(shift){
        shiftChipText.textContent = shift.dates;
        if(isMobile){
          document.getElementById('mobileBookingCard')?.classList.add('has-mobile-summary-chips');
        }
        shiftChip.classList.add('visible');
        shiftList.classList.add('collapsed');
        if(stepThree){
          stepThree.classList.remove('is-force-hidden');
        }
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

    function nudgeUserToNextStep(message = 'Сначала завершите предыдущий шаг.'){
      const prefixes = (state.previewView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE)
        ? ['mobile']
        : ['desktop'];
      prefixes.forEach((prefix) => {
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
      const prefixes = (state.previewView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE)
        ? ['mobile']
        : ['desktop'];
      prefixes.forEach((prefix) => {
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
      ['desktop', 'mobile'].forEach((prefix) => {
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

    function formatRemainingClock(diff){
      if(diff <= 0) return '';
      const totalSeconds = Math.max(0, Math.floor(diff / 1000));
      const totalHours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const hoursPart = String(totalHours).padStart(2, '0');
      const minutesPart = String(minutes).padStart(2, '0');
      const secondsPart = String(seconds).padStart(2, '0');
      return `Осталось ${hoursPart}:${minutesPart}:${secondsPart}`;
    }

    function formatRemaining(diff){
      return formatRemainingClock(diff);
    }

    function formatRemainingCompact(diff){
      return formatRemainingClock(diff);
    }

    function normalizeCompactTimerText(text){
      if(!text) return '';
      const source = String(text).replace(/,/g, ' ');
      const clockMatch = source.match(/(\d{1,4})\s*:\s*(\d{1,2})\s*:\s*(\d{1,2})/);
      if(clockMatch){
        const hh = String(Math.max(0, Number(clockMatch[1]) || 0)).padStart(2, '0');
        const mm = String(Math.max(0, Math.min(59, Number(clockMatch[2]) || 0))).padStart(2, '0');
        const ss = String(Math.max(0, Math.min(59, Number(clockMatch[3]) || 0))).padStart(2, '0');
        return `Осталось ${hh}:${mm}:${ss}`;
      }

      const extract = (pattern) => {
        const match = source.match(pattern);
        return match ? Number(match[1]) || 0 : 0;
      };

      const days = extract(/(\d+)\s*(?:д(?:ень|ня|ней)?|[dDД])/);
      const hours = extract(/(\d+)\s*(?:час(?:а|ов)?|[hHчЧ])/);
      const minutes = extract(/(\d+)\s*(?:мин(?:ут(?:а|ы)?|ут)?|[mMмМ])/);
      const seconds = extract(/(\d+)\s*(?:сек(?:унд(?:а|ы)?|унд)?|[sSсС])/);
      const totalHours = (days * 24) + hours;

      if(days || hours || minutes || seconds){
        const hh = String(Math.max(0, totalHours)).padStart(2, '0');
        const mm = String(Math.max(0, Math.min(59, minutes))).padStart(2, '0');
        const ss = String(Math.max(0, Math.min(59, seconds))).padStart(2, '0');
        return `Осталось ${hh}:${mm}:${ss}`;
      }

      return stripRemainingPrefix(source) ? `Осталось ${stripRemainingPrefix(source)}` : '';
    }

    function stripRemainingPrefix(text){
      return String(text || '').replace(/^\s*Осталось[:\s]*/i, '').trim();
    }

    function formatOfferDeadline(ts){
      if(!ts) return '';
      const date = new Date(ts);
      if(Number.isNaN(date.getTime())) return '';
      const formatted = date.toLocaleString('ru-RU', {
        day:'numeric',
        month:'long',
        hour:'numeric',
        minute:'2-digit'
      });
      return formatted.replace(/\b0(\d):(\d{2})\b/, '$1:$2');
    }

    function updateBookingScarcityUi(){
      const nodes = document.querySelectorAll('.booking-scarcity');
      if(!nodes.length) return;
      const stage = getBookingStage();
      const enteredStageFour = stage === 4 && lastRenderedBookingStage !== 4;
      if(enteredStageFour){
        bookingScarcityState.visits = Math.max(0, Number(bookingScarcityState.visits || 0)) + 1;
        persistBookingScarcity();
      }
      lastRenderedBookingStage = stage;

      const percent = getBookingScarcityPercent();
      nodes.forEach((node) => {
        node.style.setProperty('--scarcity-fill', `${percent}%`);
        node.innerHTML = `
          <span class="booking-scarcity-progress" aria-hidden="true">
            <span class="booking-scarcity-progress-fill"></span>
          </span>
          <span class="booking-scarcity-text"><strong>${percent}%</strong> мест уже занято</span>
        `;
        if(enteredStageFour){
          node.classList.remove('is-animating');
          void node.offsetWidth;
          node.classList.add('is-animating');
        }
      });
    }

    function renderBookingInfo(targetInfoId, targetTitleId, targetLeadId, targetBtnId, targetHintId){
      const info = document.getElementById(targetInfoId);
      const title = document.getElementById(targetTitleId);
      const lead = document.getElementById(targetLeadId);
      const btn = document.getElementById(targetBtnId);
      const hint = document.getElementById(targetHintId);
      const shift = getSelectedShift();
      const action = getPrimaryActionState();
      const isDesktopPanel = targetInfoId === 'desktop-booking-info';
      const isPriceCheckStage = !!shift && state.offerStage === 0;
      const actionText = getResolvedPrimaryActionText(action, shift);

      if(btn){
        btn.classList.remove('hidden');
        const shouldUseStackedCta = isDesktopPanel && state.offerStage >= 1 && /^Оформить заявку · выгода /i.test(actionText);
        if(shouldUseStackedCta){
          const gainText = actionText.replace(/^Оформить заявку · выгода /i, '').trim();
          btn.innerHTML = `
            <span class="cta-main-line cta-main-line--primary">Оформить заявку</span>
            <span class="cta-main-line cta-main-line--accent">Выгода ${gainText}</span>
          `;
          btn.dataset.ctaLayout = 'stacked';
          btn.setAttribute('aria-label', actionText);
        } else {
          btn.textContent = actionText;
          btn.removeAttribute('data-cta-layout');
          btn.removeAttribute('aria-label');
        }
        btn.classList.toggle('is-disabled', !!action.disabled);
        btn.classList.toggle('cta-main-compact', isDesktopPanel && isPriceCheckStage);
        btn.setAttribute('aria-disabled', action.disabled ? 'true' : 'false');
        btn.disabled = !!action.disabled;
      }
      if(hint){
        hint.textContent = action.hint;
      }
      if(state.bookingCompleted){
        if(title) title.textContent = 'Что дальше?';
        if(lead) lead.textContent = '';
        if(btn){
          btn.classList.add('is-disabled');
          btn.setAttribute('aria-disabled', 'true');
          btn.disabled = true;
          btn.classList.add('hidden');
          btn.removeAttribute('data-cta-layout');
          btn.removeAttribute('aria-label');
          btn.textContent = 'Заявка принята';
          btn.classList.remove('cta-main-compact');
        }
        if(!shift){
          if(info) info.innerHTML = '';
          return;
        }
        const visiblePriceWithFallback = formatPrice(getVisiblePrice());
        if(info){
          info.innerHTML = `
            <div class="booking-price-box booking-summary-mini booking-summary-mini--completed">
              <div class="booking-price-head">
                <div class="booking-price-col">
                  <small>Ваша смена</small>
                  <div class="booking-price-main">${shift.dates}</div>
                </div>
                <div class="booking-price-col booking-price-col--fixed" style="text-align:right;">
                  <small>Возраст</small>
                  <div class="booking-price-main">${ageLabel(state.age)}</div>
                </div>
              </div>
              <p class="completed-followup-text">Мы свяжемся с вами в ближайшее время.</p>
              <button class="completed-followup-image-trigger" type="button" data-action="open-referral-photo" aria-label="Открыть фото в полном размере">
                <img class="completed-followup-image" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/referral-hoodie.jpeg" alt="Фирменная толстовка лагеря">
              </button>
              <p class="completed-followup-note">Обычно дети приезжают с друзьями, так им проще адаптироваться. Позовите друга, подарим вам обоим фирменную толстовку.</p>
              <a class="completed-followup-link" href="#" data-action="copy-invite-link">Копировать ссылку приглашения</a>
              <div class="booking-price-head">
                <div class="booking-price-col">
                  <small>Зафиксированная цена</small>
                  <div class="booking-price-main big">${visiblePriceWithFallback}</div>
                </div>
                <div class="booking-price-col" style="text-align:right;">
                  <small>Код бронирования</small>
                  <div class="booking-price-main">${state.code || '—'}</div>
                </div>
              </div>
            </div>
          `;
        }
        return;
      }

      if(!hasSelectedAge()){
        if(title) title.textContent = 'Выберите возраст';
        if(lead) lead.textContent = 'Покажем подходящие смены, программу и условия.';
        if(info) info.innerHTML = '';
        return;
      }

      if(!shift){
        if(title) title.textContent = `Смены для ${ageLabel(state.age)}`;
        if(lead) lead.textContent = '';
        if(info) info.innerHTML = '';
        if(btn) btn.classList.remove('cta-main-compact');
        return;
      }

      const currentPrice = formatPrice(shift.price);
      const visiblePriceValue = getVisiblePrice();
      const visiblePrice = formatPrice(visiblePriceValue);
      const shiftDescription = hasSelectedAge()
        ? getShiftAgeFocusedDescription(shift, state.age || '7-9')
        : (shift.desc || '');
      const timerText = isOfferActive() ? formatRemainingCompact(state.expiresAt - Date.now()) : '';
      const deadlineText = formatOfferDeadline(state.expiresAt);
      const basePriceValue = Number(state.basePrice || shift.price || 0);
      const safeVisiblePrice = Number(visiblePriceValue || 0);
      const discountPercent = basePriceValue > 0
        ? Math.max(0, Math.round(((basePriceValue - safeVisiblePrice) / basePriceValue) * 100))
        : 0;
      if(state.offerStage >= 1){
        if(title) title.textContent = 'Оформление брони';
        if(lead) lead.textContent = '';
      } else {
        if(title) title.textContent = 'Проверим цену и условия';
        if(lead) lead.textContent = '';
      }

      if(isDesktopPanel && state.offerStage === 0){
        const shiftLongDescription = getShiftDisplayDescription(shift);
        if(info) info.innerHTML = `
          <div class="booking-shift-focus">
            <div class="booking-shift-focus__dates">${shift.dates}</div>
            <div class="booking-shift-focus__meta">${shiftDaysLabel(shift)} · ${formatPrice(shift.price)} · осталось ${shift.left} мест</div>
            <div class="booking-shift-focus__desc-title">Описание смены</div>
            <p class="booking-shift-focus__desc">${shiftLongDescription}</p>
          </div>
        `;
        return;
      }

      const isSummaryStage = state.offerStage >= 1;
      if(info) info.innerHTML = isSummaryStage ? `
        <div class="booking-price-box booking-summary-mini">
          <div class="booking-price-head">
            <div class="booking-price-col">
              <small>Возраст</small>
              <div class="booking-price-main">${ageLabel(state.age)}</div>
            </div>
            <div class="booking-price-col booking-price-col--fixed" style="text-align:right;">
              <small>Зафиксированная цена</small>
              <div class="booking-price-main big">${visiblePrice}</div>
              ${discountPercent > 0 ? `<div class="booking-price-discount">Скидка ${discountPercent}%</div>` : ''}
            </div>
          </div>
          <div class="booking-code-line">Даты: <strong style="color:#fff;">${shift.dates}</strong></div>
          ${state.code ? `<div class="booking-code-line">Код бронирования: <strong style="color:#fff;">${state.code}</strong></div>` : ''}
          <div class="booking-shift-description">${shiftDescription}</div>
          ${timerText ? `<div class="booking-timer-line" data-live-timer="true">${timerText}</div>` : ''}
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
      const useLegacyMobileRuntime = !USE_DESKTOP_BASE_FOR_MOBILE;
      renderBookingInfo(
        'desktop-booking-info',
        'desktopBookingTitle',
        'desktopBookingLead',
        'desktopStartBtn',
        'desktopBookingHint'
      );

      if(useLegacyMobileRuntime){
        renderBookingInfo(
          'mobile-booking-info',
          'mobileBookingTitle',
          'mobileBookingLead',
          'mobileStartBtn',
          'mobileBookingHint'
        );
      }

      renderSteps('desktopBookingSteps');
      if(useLegacyMobileRuntime){
        renderSteps('mobileBookingSteps');
      }
      renderGuidedState('desktop');
      if(useLegacyMobileRuntime){
        renderGuidedState('mobile');
      }
      applyBookingStageClass('desktop');
      if(useLegacyMobileRuntime){
        applyBookingStageClass('mobile');
      }
      syncBookingHints();
      updateBookingScarcityUi();
      if(getBookingStage() < 4){
        closeInlineLead('booking-desktop');
        if(useLegacyMobileRuntime){
          closeInlineLead('booking-mobile');
        }
      }
    }

    function getViewportPreviewView(){
      return window.matchMedia('(max-width: 820px)').matches ? 'mobile' : 'desktop';
    }

    function switchView(view){
      const requestedView = view === 'mobile' ? 'mobile' : 'desktop';
      const effectiveView = (requestedView === 'mobile' && USE_DESKTOP_BASE_FOR_MOBILE)
        ? 'desktop'
        : requestedView;
      setHeroMenuOpen(false);
      if(requestedView === 'mobile'){
        state.mobileDocsExpanded = false;
      }
      state.previewView = requestedView;
      state.view = effectiveView;
      const desktopView = document.getElementById('desktopView');
      const mobileView = document.getElementById('mobileView');
      if(desktopView){
        desktopView.classList.toggle('hidden', effectiveView !== 'desktop');
        desktopView.classList.toggle(
          'mobile-preview-active',
          requestedView === 'mobile' && USE_DESKTOP_BASE_FOR_MOBILE
        );
      }
      if(mobileView){
        const showLegacyMobile = requestedView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE;
        mobileView.classList.toggle('hidden', !showLegacyMobile);
      }
      const desktopModeWrap = document.getElementById('desktopModeWrap');
      if(desktopModeWrap){
        desktopModeWrap.classList.toggle('hidden', effectiveView !== 'desktop');
      }
      if(effectiveView !== 'desktop'){
        closeSectionModal();
      }
      if(requestedView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE){
        applyMobileMode();
      }
      if(effectiveView === 'desktop'){
        applyDesktopMode();
      }
      applyMobileTemplatesToDesktopSections();
      renderMediaSections();
      renderDesktopMobileDocsBlock();
      updateSummaryBarVisibility();
      persist();
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }

    function applyHeroContrastMode(){
      const desktopView = document.getElementById('desktopView');
      const beforeBtn = document.getElementById('heroContrastBeforeBtn');
      const afterBtn = document.getElementById('heroContrastAfterBtn');
      const afterSoftBtn = document.getElementById('heroContrastAfterSoftBtn');
      if(!desktopView) return;
      const mode = normalizeMode(state.heroContrastMode, HERO_CONTRAST_MODES, 'after-soft');
      desktopView.classList.toggle('hero-contrast-before', mode === 'before');
      desktopView.classList.toggle('hero-contrast-after', mode === 'after');
      desktopView.classList.toggle('hero-contrast-after-soft', mode === 'after-soft');
      if(beforeBtn){
        beforeBtn.classList.toggle('active', mode === 'before');
      }
      if(afterBtn){
        afterBtn.classList.toggle('active', mode === 'after');
      }
      if(afterSoftBtn){
        afterSoftBtn.classList.toggle('active', mode === 'after-soft');
      }
    }

    function switchHeroContrastMode(mode){
      state.heroContrastMode = normalizeMode(mode, HERO_CONTRAST_MODES, 'after-soft');
      applyHeroContrastMode();
      persist();
    }

    function applyHeroMicroMode(){
      const desktopView = document.getElementById('desktopView');
      const offBtn = document.getElementById('heroMicroOffBtn');
      const onBtn = document.getElementById('heroMicroOnBtn');
      const demoBtn = document.getElementById('heroMicroDemoBtn');
      if(!desktopView) return;
      const mode = normalizeMode(state.heroMicroMode, HERO_MICRO_MODES, 'off');
      desktopView.classList.toggle('hero-micro-on', mode === 'on');
      desktopView.classList.toggle('hero-micro-demo', mode === 'demo');
      desktopView.classList.toggle('hero-micro-off', mode === 'off');
      if(offBtn){
        offBtn.classList.toggle('active', mode === 'off');
      }
      if(onBtn){
        onBtn.classList.toggle('active', mode === 'on');
      }
      if(demoBtn){
        demoBtn.classList.toggle('active', mode === 'demo');
      }
    }

    function switchHeroMicroMode(mode){
      state.heroMicroMode = normalizeMode(mode, HERO_MICRO_MODES, 'off');
      applyHeroMicroMode();
      persist();
    }

    function applyOfferModalTheme(cardEl = null){
      const mode = normalizeMode(state.offerModalTheme, OFFER_MODAL_THEMES, 'light');
      const lightBtn = document.getElementById('offerThemeLightBtn');
      const darkBtn = document.getElementById('offerThemeDarkBtn');
      if(lightBtn){
        lightBtn.classList.toggle('active', mode === 'light');
      }
      if(darkBtn){
        darkBtn.classList.toggle('active', mode === 'dark');
      }
      const card = cardEl || document.getElementById('offerCard');
      if(card){
        card.classList.toggle('dark', mode === 'dark');
      }
    }

    function switchOfferModalTheme(mode){
      state.offerModalTheme = normalizeMode(mode, OFFER_MODAL_THEMES, 'light');
      applyOfferModalTheme();
      persist();
    }

    function applyOfferLayoutMode(){
      const mode = normalizeMode(state.offerLayout, OFFER_LAYOUT_MODES, 'current');
      const currentBtn = document.getElementById('offerLayoutCurrentBtn');
      const legacyBtn = document.getElementById('offerLayoutLegacyBtn');
      if(currentBtn){
        currentBtn.classList.toggle('active', mode === 'current');
      }
      if(legacyBtn){
        legacyBtn.classList.toggle('active', mode === 'legacy');
      }
      const card = document.getElementById('offerCard');
      if(card){
        card.dataset.offerLayout = mode;
      }
    }

    function switchOfferLayout(mode){
      const normalizedMode = normalizeMode(mode, OFFER_LAYOUT_MODES, 'current');
      state.offerLayout = normalizedMode;
      applyOfferLayoutMode();
      persist();
      const overlay = document.getElementById('offerOverlay');
      if(overlay && !overlay.classList.contains('hidden') && !state.offerSearching && state.offerStage > 0){
        showOffer();
      }
    }

    function applyDesktopMode(){
      const desktopView = document.getElementById('desktopView');
      const fullBtn = document.getElementById('fullModeBtn');
      const compactBtn = document.getElementById('compactModeBtn');
      if(!desktopView || !fullBtn || !compactBtn) return;

      desktopView.classList.toggle('compact-mode', state.desktopMode === 'compact');
      fullBtn.classList.toggle('active', state.desktopMode === 'full');
      compactBtn.classList.toggle('active', state.desktopMode === 'full');
      compactBtn.setAttribute('aria-pressed', state.desktopMode === 'full' ? 'true' : 'false');
    }

    function switchDesktopMode(mode){
      state.desktopMode = mode;
      applyDesktopMode();
      if(mode !== 'compact'){
        closeSectionModal();
      }
      updateSummaryBarVisibility();
      persist();
    }

    function applyMobileMode(){
      if(USE_DESKTOP_BASE_FOR_MOBILE){
        return;
      }
      const mobileView = document.getElementById('mobileView');
      const fullBtn = document.getElementById('mobileFullModeBtn');
      const compactBtn = document.getElementById('mobileCompactModeBtn');
      const modeToggle = document.getElementById('mobileModeToggle');
      const modeToggleLabel = modeToggle?.querySelector('.mobile-mode-toggle-label');
      if(!mobileView) return;

      mobileView.classList.toggle('mobile-compact-mode', state.mobileMode === 'compact');
      if(fullBtn) fullBtn.classList.toggle('active', state.mobileMode === 'full');
      if(compactBtn) compactBtn.classList.toggle('active', state.mobileMode === 'compact');
      if(modeToggle){
        const isFull = state.mobileMode === 'full';
        modeToggle.setAttribute('aria-checked', isFull ? 'true' : 'false');
        modeToggle.classList.toggle('is-compact', !isFull);
        if(modeToggleLabel){
          modeToggleLabel.textContent = isFull ? 'Подробный' : 'Кратко';
        }
      }
      applyMobileSectionAccordion();
    }

    function switchMobileMode(mode){
      state.mobileMode = mode;
      applyMobileMode();
      updateSummaryBarVisibility();
      persist();
    }
    document.getElementById('fullModeBtn')?.addEventListener('click', () => switchDesktopMode('full'));
    document.getElementById('compactModeBtn')?.addEventListener('click', () => {
      const nextMode = state.desktopMode === 'compact' ? 'full' : 'compact';
      switchDesktopMode(nextMode);
    });
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      document.getElementById('mobileFullModeBtn')?.addEventListener('click', () => switchMobileMode('full'));
      document.getElementById('mobileCompactModeBtn')?.addEventListener('click', () => switchMobileMode('compact'));
      document.getElementById('mobileModeToggle')?.addEventListener('click', () => {
        switchMobileMode(state.mobileMode === 'full' ? 'compact' : 'full');
      });
    }

    document.addEventListener('click', (e) => {
      if(handleDataActionClick(e.target)){
        return;
      }

      const photoFilterBtn = e.target.closest('[data-photo-filter]');
      if(photoFilterBtn){
        setPhotoFilter(photoFilterBtn.dataset.photoFilter);
        const sectionModal = document.getElementById('sectionModal');
        const sectionModalOpened = !!(sectionModal && !sectionModal.classList.contains('hidden'));
        if((state.previewView === 'desktop' && state.desktopMode === 'compact') || (state.previewView === 'mobile' && sectionModalOpened)){
          openSectionModal('section-photos');
        }
        return;
      }

      const faqFilterBtn = e.target.closest('[data-faq-filter]');
      if(faqFilterBtn){
        setFaqFilter(faqFilterBtn.dataset.faqFilter);
        const sectionModal = document.getElementById('sectionModal');
        const sectionModalOpened = !!(sectionModal && !sectionModal.classList.contains('hidden'));
        if((state.previewView === 'desktop' && state.desktopMode === 'compact') || (state.previewView === 'mobile' && sectionModalOpened)){
          openSectionModal('section-faq');
        }
        return;
      }

      const ageWrap = e.target.closest('#desktopAgeTabs');
      const ageBtn = e.target.closest('button');
      if(ageWrap && ageBtn){
        const ageText = (ageBtn.textContent || '').trim();
        if(ageText){
          track('age_select', {age_label: ageText});
        }
      }

      const shiftWrap = e.target.closest('#desktop-shift-options');
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

      const shiftDisabled = e.target.closest('#desktopShiftList.disabled');
      if(shiftDisabled){
        showHint('Сначала выберите возраст ребёнка', 'age');
        nudgeUserToNextStep('Сначала выберите возраст ребёнка — тогда откроется список смен.');
      }

      const shiftVeil = e.target.closest('.shift-list-veil');
      if(shiftVeil){
        showHint('Сначала выберите возраст ребёнка', 'age');
        nudgeUserToNextStep('Сначала выберите возраст ребёнка — после этого откроются смены.');
      }

      const ctaBtn = e.target.closest('#desktopStartBtn');
      if(ctaBtn && ctaBtn.classList.contains('is-disabled')){
        if(!hasSelectedAge()){
          showHint('Выберите возраст', 'age');
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
      if(safeView === 'mobile' && USE_DESKTOP_BASE_FOR_MOBILE){
        return;
      }
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

      title.textContent = `${start.toLocaleDateString('ru-RU')} — ${end.toLocaleDateString('ru-RU')}`;

      const firstMonth = new Date(start.getFullYear(), start.getMonth(), 1);
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);
      const cursor = new Date(firstMonth);
      const isMultiMonthRange = firstMonth.getTime() !== lastMonth.getTime();
      let html = '';

      while(cursor <= lastMonth){
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let displayFrom = 1;
        let displayTo = daysInMonth;

        if(isMultiMonthRange){
          const isFirst = year === firstMonth.getFullYear() && month === firstMonth.getMonth();
          const isLast = year === lastMonth.getFullYear() && month === lastMonth.getMonth();

          if(isFirst){
            displayFrom = Math.max(1, daysInMonth - 13);
          }else if(isLast){
            displayTo = Math.min(daysInMonth, 14);
          }
        }

        const leading = new Date(year, month, displayFrom).getDay();

        html += `
          <div class="calendar-month">
            <div class="calendar-month-title">${ruMonth[month]} ${year}</div>
            <div class="calendar-month-grid">
        `;

        for(let i = 0; i < leading; i += 1){
          html += '<div class="calendar-day empty"></div>';
        }

        for(let day = displayFrom; day <= displayTo; day += 1){
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
      state.offerStage = 0;
      state.offerPrice = null;
      state.code = null;
      state.expiresAt = null;
      state.offerSearching = false;
      state.bookingCompleted = false;
      if(!preserveShift){
        state.shiftId = null;
        state.basePrice = null;
      }
    }

    function buildBookingSummaryHtml({showTimer = false} = {}){
      const shift = getSelectedShift();
      if(!shift) return '';
      const shouldShowTimer = !!showTimer && isOfferActive();
      const timeLeft = shouldShowTimer ? stripRemainingPrefix(formatRemainingCompact(state.expiresAt - Date.now())) : '';
      return `
        <div class="booking-summary-selection">${ageLabel(state.age)} · ${shift.dates}</div>
        <div class="booking-summary-price">${formatPrice(state.offerPrice || state.basePrice || shift.price)}</div>
        ${timeLeft ? `
        <div class="booking-summary-timer">
          <div class="booking-summary-timer-title">Цена закреплена за вами</div>
          <div class="booking-timer-line" data-live-timer="true">${timeLeft}</div>
        </div>
        ` : ''}
        <div class="booking-summary-guarantee">Мы держим для вас место.<br>Никакой оплаты сейчас не требуется.</div>
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
          state.age = btn.dataset.age;
          state.ageSelected = true;
          state.shiftId = null;
          state.basePrice = null;
          state.offerPrice = null;
          state.code = null;
          state.expiresAt = null;
          state.offerStage = 0;
          state.bookingCompleted = false;
          renderAll();
          persist();
        });
      });
    }

    function focusMobileAgeGate(){
      const gate = (USE_DESKTOP_BASE_FOR_MOBILE
        ? document.getElementById('desktopAgeTabs')
        : (document.getElementById('mobileAgeGateCard') || document.getElementById('mobileAgeTabs')));
      if(!gate) return;
      gate.scrollIntoView({behavior:'smooth', block:'center'});
      gate.classList.add('guided-pulse');
      setTimeout(() => gate.classList.remove('guided-pulse'), 1100);
    }

    function waitDesktopAgeTapHint(ms){
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }

    function canRunDesktopAgeTapHint(){
      const card = document.getElementById('desktop-booking-card');
      if(!card || !card.classList.contains('booking-stage-1')) return false;
      if(state.previewView === 'mobile') return false;
      if(state.previewView !== 'desktop') return false;
      if(hasSelectedAge() || state.ageSelected) return false;
      const tabs = document.getElementById('desktopAgeTabs');
      if(!tabs) return false;
      return tabs.querySelectorAll('.age-tab[data-age]').length >= 3;
    }

    function ensureDesktopAgeTapHintNode(){
      const tabs = document.getElementById('desktopAgeTabs');
      if(!tabs) return null;
      let hint = tabs.querySelector('.age-tap-hint');
      if(hint) return hint;
      hint = document.createElement('div');
      hint.className = 'age-tap-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.innerHTML = '<span class="age-tap-finger"></span><span class="age-tap-ripple"></span><span class="age-tap-ripple delay"></span>';
      tabs.appendChild(hint);
      return hint;
    }

    function placeDesktopAgeTapHint(hintNode, ageRow){
      if(!hintNode || !ageRow) return;
      const host = hintNode.parentElement;
      if(!host) return;
      const hostRect = host.getBoundingClientRect();
      const rowRect = ageRow.getBoundingClientRect();
      const x = Math.max(8, rowRect.right - hostRect.left - 60);
      const y = Math.max(6, rowRect.top - hostRect.top - 2);
      hintNode.style.setProperty('--age-hint-x', `${Math.round(x)}px`);
      hintNode.style.setProperty('--age-hint-y', `${Math.round(y)}px`);
    }

    function clearDesktopAgeTapHintRows(){
      const tabs = document.getElementById('desktopAgeTabs');
      if(!tabs) return;
      tabs.querySelectorAll('.age-tab.is-hint-target, .age-tab.is-hint-tapping').forEach((row) => {
        row.classList.remove('is-hint-target', 'is-hint-tapping');
      });
    }

    function pulseDesktopAgeTapHint(hintNode, ageRow){
      if(!hintNode) return;
      hintNode.classList.remove('is-tapping');
      void hintNode.offsetWidth;
      hintNode.classList.add('is-tapping');
      if(ageRow){
        ageRow.classList.add('is-hint-target');
        ageRow.classList.remove('is-hint-tapping');
        void ageRow.offsetWidth;
        ageRow.classList.add('is-hint-tapping');
        setTimeout(() => {
          ageRow.classList.remove('is-hint-tapping');
        }, 680);
      }
    }

    function hideDesktopAgeTapHint(){
      const hintNode = document.querySelector('#desktopAgeTabs .age-tap-hint');
      if(!hintNode) return;
      hintNode.classList.remove('is-visible', 'is-tapping');
      clearDesktopAgeTapHintRows();
    }

    async function runDesktopAgeTapHint(){
      if(desktopAgeTapHintPlayed || desktopAgeTapHintRunning) return;
      if(!canRunDesktopAgeTapHint()) return;
      const hintNode = ensureDesktopAgeTapHintNode();
      const tabs = document.getElementById('desktopAgeTabs');
      if(!hintNode || !tabs) return;
      const ageRows = [...tabs.querySelectorAll('.age-tab[data-age]')];
      if(!ageRows.length) return;

      desktopAgeTapHintRunning = true;
      const runToken = ++desktopAgeTapHintToken;
      hintNode.classList.add('is-visible');

      for(let rowIndex = 0; rowIndex < ageRows.length; rowIndex += 1){
        const ageRow = ageRows[rowIndex];
        if(runToken !== desktopAgeTapHintToken || !canRunDesktopAgeTapHint()) break;
        clearDesktopAgeTapHintRows();
        ageRow.classList.add('is-hint-target');
        placeDesktopAgeTapHint(hintNode, ageRow);
        await waitDesktopAgeTapHint(rowIndex === 0 ? 320 : 1000);
        for(let tapIndex = 0; tapIndex < 2; tapIndex += 1){
          if(runToken !== desktopAgeTapHintToken || !canRunDesktopAgeTapHint()) break;
          pulseDesktopAgeTapHint(hintNode, ageRow);
          await waitDesktopAgeTapHint(680);
          if(tapIndex === 0){
            await waitDesktopAgeTapHint(120);
          }
        }
        hintNode.classList.remove('is-tapping');
        await waitDesktopAgeTapHint(120);
      }

      hintNode.classList.remove('is-visible', 'is-tapping');
      clearDesktopAgeTapHintRows();
      desktopAgeTapHintRunning = false;
      desktopAgeTapHintPlayed = true;
    }

    function syncDesktopAgeTapHintVisibility(){
      const hintNode = document.querySelector('#desktopAgeTabs .age-tap-hint');
      if(!hintNode) return;
      if(desktopAgeTapHintRunning && canRunDesktopAgeTapHint()){
        hintNode.classList.add('is-visible');
        return;
      }
      hintNode.classList.remove('is-visible', 'is-tapping');
      clearDesktopAgeTapHintRows();
    }

    function scheduleDesktopAgeTapHint(){
      if(desktopAgeTapHintPlayed || desktopAgeTapHintRunning) return;
      if(!canRunDesktopAgeTapHint()) return;
      if(desktopAgeTapHintTimer){
        return;
      }
      const elapsedMs = Date.now() - desktopAgeTapHintStartedAt;
      const delayMs = Math.max(0, 7000 - elapsedMs);
      desktopAgeTapHintTimer = setTimeout(() => {
        desktopAgeTapHintTimer = null;
        runDesktopAgeTapHint().catch(() => {
          desktopAgeTapHintRunning = false;
          hideDesktopAgeTapHint();
        });
      }, delayMs);
    }

    function resetAgeSelection(){
      clearShiftOptionPanels();
      state.age = null;
      state.ageSelected = false;
      state.shiftId = null;
      state.basePrice = null;
      state.offerPrice = null;
      state.code = null;
      state.expiresAt = null;
      state.offerStage = 0;
      state.bookingCompleted = false;

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
      state.shiftId = null;
      state.basePrice = null;
      state.offerPrice = null;
      state.code = null;
      state.expiresAt = null;
      state.offerStage = 0;
      state.offerSearching = false;
      state.bookingCompleted = false;
      showHint('Смена сброшена. Выберите подходящий вариант.', 'shift');
      renderAll();
      persist();
    }

    function setPhotoFilter(filter){
      state.photoFilter = filter;
      renderMediaSections();
      persist();
    }

    function setFaqFilter(filter){
      state.faqFilter = filter;
      track('faq_filter', {filter});
      renderMediaSections();
      persist();
    }

    bindAgeTabs('desktopAgeTabs');
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      bindAgeTabs('mobileAgeTabs');
    }

    function getShiftSummaryLines(ageKey){
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
      return summaryByAge[ageKey] || summaryByAge['7-9'];
    }

    function getShiftCardTagline(shift){
      if(!shift) return '';
      return shift.desc || '';
    }

    function getShiftDisplayDescription(shift){
      if(!shift) return '';
      if(!hasSelectedAge()) return shift.desc || '';
      return getShiftAgeFocusedDescription(shift, state.age || '7-9');
    }

    function normalizeShiftText(value){
      return String(value || '').replace(/\s+/g, ' ').trim();
    }

    function getShiftAgeFocusedDescription(shift, ageKey){
      if(!shift) return '';
      const full = String(shift.fullDesc || '').replace(/\r/g, '').trim();
      if(!full) return shift.desc || '';
      const compact = normalizeShiftText(full);
      const firstPart = normalizeShiftText(
        compact.split(/Для\s+(?:7[–-]9|10[–-]12|13[–-]14)\s+лет:/i)[0] || ''
      );

      const markerPatternByAge = {
        '7-9': 'Для\\s+7[–-]9\\s+лет:',
        '10-12': 'Для\\s+10[–-]12\\s+лет:',
        '13-14': 'Для\\s+13[–-]14\\s+лет:'
      };
      const ageLabelByAge = {
        '7-9': 'Для 7–9 лет:',
        '10-12': 'Для 10–12 лет:',
        '13-14': 'Для 13–14 лет:'
      };
      const markerPattern = markerPatternByAge[ageKey] || markerPatternByAge['7-9'];
      const ageLabel = ageLabelByAge[ageKey] || ageLabelByAge['7-9'];
      const agePartMatch = compact.match(
        new RegExp(`${markerPattern}\\s*([\\s\\S]*?)(?=\\s*Для\\s+(?:7[–-]9|10[–-]12|13[–-]14)\\s+лет:|$)`, 'i')
      );
      const agePart = normalizeShiftText(agePartMatch?.[1] || '');

      const sentences = compact.match(/[^.!?]+[.!?]?/g) || [];
      const finalPart = normalizeShiftText(sentences.length ? sentences[sentences.length - 1] : '');

      const result = [];
      if(firstPart) result.push(firstPart);
      if(agePart) result.push(`${ageLabel} ${agePart}`);
      if(finalPart && !result.includes(finalPart)){
        result.push(finalPart);
      }
      return result.join(' ').trim();
    }

    function openShiftAboutModal(shiftId){
      const modal = document.getElementById('sectionModal');
      const titleEl = document.getElementById('sectionModalTitle');
      const bodyEl = document.getElementById('sectionModalBody');
      const shift = shifts.find((item) => item.id === shiftId);
      if(!modal || !titleEl || !bodyEl || !shift) return false;

      closeTransientModals('section');
      const isCompactDesktop = state.previewView === 'desktop' && state.desktopMode === 'compact';
      const isMobilePanel = state.previewView === 'mobile';
      modal.classList.toggle('section-modal-compact', isCompactDesktop);
      modal.classList.toggle('section-modal-mobile', isMobilePanel);

      const start = parseShiftDate(shift.start);
      const end = parseShiftDate(shift.end);
      const startText = start ? start.toLocaleDateString('ru-RU') : shift.start;
      const endText = end ? end.toLocaleDateString('ru-RU') : shift.end;
      const summaryLines = getShiftSummaryLines(state.age || '7-9');

      titleEl.textContent = `${shift.label || `Смена ${shift.title}`}: программа`;
      bodyEl.innerHTML = `
        <article class="shift-modal-content">
          <div class="shift-modal-content__meta">
            <strong>${shift.dates}</strong>
            <span>${formatPrice(shift.price)} · ${shiftDaysLabel(shift)} · осталось ${shift.left} мест</span>
          </div>
          <p class="shift-modal-content__desc"><strong>Коротко:</strong> ${shift.desc}</p>
          <p class="shift-modal-content__desc"><strong>Подробно:</strong> ${getShiftDisplayDescription(shift)}</p>
          <ul class="shift-modal-content__list">
            ${summaryLines.map((line) => `<li>${line}</li>`).join('')}
          </ul>
          <div class="shift-modal-content__dates">
            <div><strong>Заезд:</strong> ${startText}</div>
            <div><strong>Выезд:</strong> ${endText}</div>
          </div>
        </article>
      `;

      modal.classList.remove('hidden');
      applyCompactSectionModalLayout();
      return true;
    }

    function renderShiftOptions(targetId){
      const box = document.getElementById(targetId);
      if(!box) return;
      const viewKey = bookingViewKeyByTargetId(targetId);

      const selectedAge = state.age || '7-9';
      const summaryLines = getShiftSummaryLines(selectedAge);

      box.innerHTML = shifts.slice(0,2).map(s => {
        const isInlineView = viewKey === 'mobile';
        const showAbout = isInlineView && shiftOptionPanels[viewKey]?.aboutId === s.id;
        const showCalendar = isInlineView && shiftOptionPanels[viewKey]?.calendarId === s.id;
        const start = parseShiftDate(s.start);
        const end = parseShiftDate(s.end);
        const startText = start ? start.toLocaleDateString('ru-RU') : s.start;
        const endText = end ? end.toLocaleDateString('ru-RU') : s.end;

        return `
        <div class="shift-option ${state.shiftId === s.id ? 'active' : ''}" data-id="${s.id}">
          <div class="shift-option-head">
            <strong>${s.dates}</strong>
            <small>
              <span class="shift-option-price">${formatPrice(s.price)}</span>
              <span class="shift-option-seats">осталось ${s.left} мест</span>
            </small>
          </div>
          <div class="shift-option-tagline">${s.desc || ''}</div>
          <div class="shift-option-actions">
            <button class="shift-option-action" type="button" data-action="toggle-shift-about" data-shift-id="${s.id}" data-shift-view="${viewKey}">
              О смене
            </button>
            <button class="shift-option-action" type="button" data-action="toggle-shift-calendar-inline" data-shift-id="${s.id}" data-shift-view="${viewKey}">
              <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/calendar.svg" alt="" aria-hidden="true">
              <span>Календарь</span>
            </button>
            <button class="shift-option-select-indicator" type="button" aria-label="Выбрать смену ${s.dates}">
              <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
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
      const mainShifts = shifts;
      const shortShifts = shifts
        .filter((s) => shortShiftIds.has(s.id))
        .map((s) => ({
          ...s,
          title: s.id === 'shift-2' ? '2.1' : '2.2'
        }));
      const showExtendedDescription = hasSelectedAge();

      grid.innerHTML = mainShifts.map(s => `
        <div class="mini-card">
          <h4><span class="program-shift-index program-shift-index-main">${s.title}</span></h4>
          <div class="price-row">
            <strong>${formatPrice(s.price)}</strong>
            <span>
              ${s.dates} · ${shiftDaysLabel(s)}
              <button class="shift-calendar-btn" type="button" data-action="open-calendar" data-shift-id="${s.id}" aria-label="Календарь ${s.title}">
                <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/calendar.svg" alt="" aria-hidden="true">
                <span class="shift-calendar-btn-label">календарь</span>
              </button>
            </span>
          </div>
          ${showExtendedDescription
            ? `
              <p><strong>Коротко:</strong> ${s.desc || ''}</p>
              <p><strong>Подробно:</strong> ${getShiftDisplayDescription(s)}</p>
            `
            : `<p>${s.desc || ''}</p>`
          }
        </div>
      `).join('');

      if(shortGrid){
        shortGrid.innerHTML = shortShifts.map((s) => `
          <div class="mini-card short-shift-card">
            <div class="short-shift-head">
              <h4><span class="program-shift-index">${s.title}</span></h4>
              <span class="short-shift-tag">короткая смена</span>
            </div>
            <div class="price-row">
              <strong>${formatPrice(s.price)}</strong>
              <span>
                ${s.dates}
                <small class="short-shift-subline">Короткий формат · ${shiftDaysLabel(s)}</small>
                <button class="shift-calendar-btn" type="button" data-action="open-calendar" data-shift-id="${s.id}" aria-label="Календарь ${s.title}">
                  <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/calendar.svg" alt="" aria-hidden="true">
                  <span class="shift-calendar-btn-label">календарь</span>
                </button>
              </span>
            </div>
            <p class="short-shift-note">Подходит тем, кто едет впервые, сомневается или хочет мягко попробовать формат лагеря.</p>
            ${showExtendedDescription
              ? `
                <p><strong>Коротко:</strong> ${s.desc || ''}</p>
                <p><strong>Подробно:</strong> ${getShiftDisplayDescription(s)}</p>
              `
              : `<p>${s.desc || ''}</p>`
            }
          </div>
        `).join('');
        shortGrid.closest('.programs-short-block')?.classList.remove('hidden');
      }
    }

    function contactIconMarkup(label){
      const map = {
        city_phone:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/phone-city.svg',
        mobile_phone:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/phone-mobile.svg',
        whatsapp:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/whatsapp.svg',
        telegram:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/telegram.svg'
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
        photoGalleryList = filteredPhotos.slice();
        activePhotoList = photoGalleryList.slice();

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
              <img src="${item.cover || 'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/video-covers/cover-week-change.jpg'}" alt="${item.title}">
              <div class="video-play"><span>▶</span></div>
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
          <div class="book-team-cover-wrap">
            <img
              class="book-team-cover"
              src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/8fc8172e_8991804334.webp"
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
                  <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/chevron-left.svg" alt="" aria-hidden="true">
                </button>
                <div class="team-carousel" id="teamCarousel">${carouselCards}</div>
                <button class="team-carousel-nav next" type="button" data-action="team-carousel-next" aria-label="Следующие преподаватели">
                  <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
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

    function renderCompactInlineStayList(mobileInlineStayList){
      if(!mobileInlineStayList) return;
      let stayCards = Array.from(document.querySelectorAll('#section-stay .stay-card')).map((card) => {
        return {
          img: card.querySelector('img')?.getAttribute('src') || '',
          title: (card.querySelector('.stay-card-body strong')?.textContent || '').trim(),
          text: (card.querySelector('.stay-card-body span')?.textContent || '').trim()
        };
      }).filter((item) => item.title);
      if(!stayCards.length){
        stayCards = [
          {
            img:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/53d52bed_45b1eb46cf5961c2188d.jpg.webp',
            title:'Комнаты и размещение',
            text:'Спокойные светлые комнаты, удобное размещение и бытовая среда без ощущения «походного лагеря».'
          },
          {
            img:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/62b758b3_63e9322f53ec8ca1b307.jpg.webp',
            title:'Санузлы и бытовые зоны',
            text:'Родителям важно понимать не только программу, но и бытовой комфорт ребёнка.'
          },
          {
            img:'https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/stay-common-lounge.webp',
            title:'Общая гостиная и зона отдыха',
            text:'Тёплое общее пространство для спокойного досуга, настольных игр и вечернего общения под присмотром вожатых.'
          }
        ];
      }
      if(!stayCards.length){
        mobileInlineStayList.innerHTML = '';
        return;
      }

      const safeIndex = Math.min(Math.max(state.mobileStayIndex || 0, 0), stayCards.length - 1);
      state.mobileStayIndex = safeIndex;
      const active = stayCards[safeIndex];

      mobileInlineStayList.innerHTML = `
        <article class="mobile-stay-feature">
          <button
            type="button"
            class="mobile-stay-feature-photo"
            data-action="open-stay-photo"
            data-stay-index="${safeIndex}"
            aria-label="Открыть фото: ${active.title}"
          >
            ${active.img ? `<img src="${active.img}" alt="${active.title}">` : ''}
          </button>
          <strong>${active.title}</strong>
          <p>${active.text}</p>
        </article>
        <div class="mobile-stay-preview-strip">
          ${stayCards.map((item, idx) => `
            <button
              type="button"
              class="mobile-stay-preview-thumb ${idx === safeIndex ? 'active' : ''}"
              data-action="mobile-stay-select"
              data-stay-index="${idx}"
              aria-label="Показать: ${item.title}"
            >
              ${item.img ? `<img src="${item.img}" alt="${item.title}">` : ''}
            </button>
          `).join('')}
        </div>
      `;
    }

    function renderCompactInlineTeamList(mobileInlineTeamList){
      if(!mobileInlineTeamList) return;
      const founder = mediaContent.team.find((item) => item.fio === 'Дарья Афанасьева') || mediaContent.team[0];
      const teachers = mediaContent.team.filter((item) => item.fio !== founder?.fio);
      const founderSummary = founder?.bio
        ? founder.bio.split('.').map((part) => part.trim()).filter(Boolean).slice(0, 2).join('. ') + '.'
        : '';
      const teacherFocusMap = {
        'Никита Брагин':'Scratch, Minecraft и Python',
        'Омар Алхамви':'Python и нейросети',
        'Александр Ташкин':'Scratch, Minecraft и Python'
      };

      mobileInlineTeamList.innerHTML = `
        <article class="mobile-team-feature-card">
          <div class="mobile-team-feature-cover-wrap" data-action="open-book-photo" role="button" tabindex="0" aria-label="Открыть обложку книги">
            <img class="mobile-team-feature-cover" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/images/cdn-cache/8fc8172e_8991804334.webp" alt="Собственная книга по Python">
          </div>
          <strong>Собственная книга по Python</strong>
          <span>Команда не только ведёт занятия, но и создаёт собственные учебники и игровые методики. <a class="mobile-team-feature-link" href="${mediaContent.references.programmingBookUrl}" target="_blank" rel="noopener noreferrer">Смотреть книгу</a></span>
        </article>
        ${founder ? `
          <article class="mobile-team-founder-card">
            <div class="mobile-team-avatar">
              <img src="${founder.avatarUrl}" alt="${founder.fio}">
            </div>
            <strong>${founder.fio}</strong>
            <span class="mobile-team-role">${founder.role}</span>
            <p>${founderSummary}</p>
          </article>
        ` : ''}
        ${teachers.length ? `
          <div class="mobile-team-carousel-block">
            <div class="mobile-team-carousel-head">
              <strong>Преподаватели</strong>
            </div>
            <div class="mobile-team-carousel-track">
              ${teachers.map((teacher) => `
                <article class="mobile-team-teacher-card">
                  <div class="mobile-team-avatar">
                    <img src="${teacher.avatarUrl}" alt="${teacher.fio}">
                  </div>
                  <strong>${teacher.fio}</strong>
                  <span class="mobile-team-role">${teacherFocusMap[teacher.fio] || teacher.role}</span>
                </article>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
    }

    function renderCompactInlineContactsList(mobileInlineContactsList){
      if(!mobileInlineContactsList) return;
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
          <strong>Московская область, Наро-Фоминский округ</strong>
          <span>
            Удобный заезд и понятная локация. Маршрут открывается в Яндекс.Картах.
            <a class="mobile-map-inline-link" href="${mapUrl}" target="_blank" rel="noopener noreferrer">Открыть карту</a>
          </span>
        </article>
        <div class="mobile-contact-grid">
          ${cityPhone ? `<a class="mobile-contact-card" href="${cityPhone.href}"><strong>${cityPhone.text}</strong></a>` : ''}
          ${mobilePhone ? `<a class="mobile-contact-card" href="${mobilePhone.href}"><strong>${mobilePhone.text}</strong></a>` : ''}
          ${whatsapp ? `<a class="mobile-contact-card" href="${whatsapp.href}" target="_blank" rel="noopener noreferrer"><strong>${whatsapp.text}</strong></a>` : ''}
          ${telegram ? `<a class="mobile-contact-card" href="${telegram.href}" target="_blank" rel="noopener noreferrer"><strong>Telegram</strong></a>` : ''}
        </div>
      `;
    }

    function renderCompactInlineSocials(mobileInlineSocials){
      if(!mobileInlineSocials) return;
      mobileInlineSocials.innerHTML = mediaContent.socials.map((item) => `
        <a class="mobile-social-link" href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.key}">
          <span class="mobile-social-icon"><span class="social-badge-mark">${socialBadgeMark(item)}</span></span>
          <span class="mobile-social-label">${item.key}</span>
        </a>
      `).join('');
    }

    function renderCompactTrustPanelContent(){
      const aboutTargets = document.querySelectorAll('#mobileAboutFeatures, #mobileAboutFeaturesDesktop');
      const journeyTargets = document.querySelectorAll('#mobileJourneyContent, #mobileJourneyContentDesktop');
      const programsTargets = document.querySelectorAll('#mobileProgramsContent, #mobileProgramsContentDesktop');
      const photoGalleryTargets = document.querySelectorAll('#mobilePhotoGallery, #mobilePhotoGalleryDesktop');
      const videoGalleryTargets = document.querySelectorAll('#mobileVideoGallery, #mobileVideoGalleryDesktop');
      const reviewsGalleryTargets = document.querySelectorAll('#mobileReviewsGallery, #mobileReviewsGalleryDesktop');
      const faqFiltersTargets = document.querySelectorAll('#mobileFaqFilters, #mobileFaqFiltersDesktop');
      const faqListTargets = document.querySelectorAll('#mobileFaqList, #mobileFaqListDesktop');
      const teamTargets = document.querySelectorAll('#mobileInlineTeamList, #mobileInlineTeamListDesktop');
      const stayTargets = document.querySelectorAll('#mobileInlineStayList, #mobileInlineStayListDesktop');
      const contactsTargets = document.querySelectorAll('#mobileInlineContactsList, #mobileInlineContactsListDesktop');
      const socialsTargets = document.querySelectorAll('#mobileInlineSocials, #mobileInlineSocialsDesktop');
      const mobileDocsRequisites = document.getElementById('mobileDocsRequisites');
      const mobileDocsAccordion = document.getElementById('mobileDocsAccordion');

      if (aboutTargets.length) {
        const aboutHtml = `
          <article class="mobile-about-feature-item">
            <small>Проекты</small>
            <strong>AI и программирование</strong>
            <p>Реальные проекты: Scratch, Python, Minecraft, нейросети.</p>
          </article>
          <article class="mobile-about-feature-item">
            <small>Среда</small>
            <strong>Бассейн и живая лагерная среда</strong>
            <p>Спорт, команда и общение — не только экран.</p>
          </article>
          <article class="mobile-about-feature-item">
            <small>Результат</small>
            <strong>Итог за смену</strong>
            <p>Ребёнок уезжает с проектом, опытом и уверенностью.</p>
          </article>
        `;
        aboutTargets.forEach((target) => {
          target.innerHTML = aboutHtml;
        });
      }

      if (journeyTargets.length) {
        const steps = [
          {
            title: 'Быстрое включение',
            text: 'В первый же день дети знакомятся, собираются в команды и входят в механику смены без долгой раскачки.'
          },
          {
            title: 'Практика вместо теории',
            text: 'Scratch, Python, Minecraft и AI через реальные задачи: меньше теории, больше практики.'
          },
          {
            title: 'Живая среда',
            text: 'Бассейн, спорт и командная среда формируют ритм, дисциплину и уверенность.'
          },
          {
            title: 'Финальный результат',
            text: 'К концу смены у ребёнка есть проект, защита и заметный рост по навыкам.'
          }
        ];
        const safeStep = Math.max(0, Math.min(state.mobileJourneyStep || 0, steps.length - 1));
        state.mobileJourneyStep = safeStep;
        const activeStep = steps[safeStep];
        const journeyHtml = `
          <article class="mobile-journey-active">
            <div class="mobile-journey-active-heading">
              <div class="mobile-journey-active-index">${safeStep + 1}</div>
              <strong>${activeStep.title}</strong>
            </div>
            <p>${activeStep.text}</p>
          </article>
        `;
        journeyTargets.forEach((target) => {
          target.innerHTML = journeyHtml;
        });
      }

      if (programsTargets.length) {
        const shortProgramShifts = shifts
          .filter((s) => s.id === 'shift-2' || s.id === 'shift-3')
          .map((s) => ({
            ...s,
            id: `${s.id}-short`,
            title: s.id === 'shift-2' ? '2.1' : '2.2',
            isShort:true,
            sourceId:s.id
          }));
        const mainShifts = [...shifts.slice(), ...shortProgramShifts];
        if(mainShifts.length){
          const activeShiftId = mainShifts.some((shift) => shift.id === state.mobileProgramShiftId)
            ? state.mobileProgramShiftId
            : mainShifts[0].id;
          state.mobileProgramShiftId = activeShiftId;
          const activeShift = mainShifts.find((shift) => shift.id === activeShiftId) || mainShifts[0];
          const selectorLabel = (shift) => String(shift.title || '').trim();
          const ageHint = hasSelectedAge()
            ? ''
            : 'Сначала выберите возраст ребёнка, чтобы увидеть персональную подсказку.';

          const programsHtml = `
            <div class="mobile-program-selector">
              ${mainShifts.map((shift) => `
                <button
                  type="button"
                  class="mobile-program-chip ${shift.id === activeShift.id ? 'active' : ''} ${shift.isShort ? 'short' : ''}"
                  data-action="mobile-program-select"
                  data-shift-id="${shift.id}"
                >${selectorLabel(shift)}</button>
              `).join('')}
            </div>
            <article class="mobile-program-active-card">
              <strong>${selectorLabel(activeShift)}</strong>
              <div class="mobile-program-dates">
                ${activeShift.dates}
                ${activeShift.isShort ? `<span class="mobile-program-dates-sub">Короткий формат · ${shiftDaysLabel(activeShift)}</span>` : ''}
              </div>
              <div class="mobile-program-price">${formatPrice(activeShift.price)}</div>
              <div class="mobile-program-meta">
                <span>${shiftDaysLabel(activeShift)}</span>
                <span>Осталось ${activeShift.left} мест</span>
                ${activeShift.isShort ? '<span class="mobile-program-short-badge">Короткая смена</span>' : ''}
              </div>
              <p>${getShiftDisplayDescription(activeShift)}</p>
              ${activeShift.isShort ? '<p class="mobile-program-short-note">Подходит тем, кто едет впервые, сомневается или хочет мягко попробовать формат лагеря.</p>' : ''}
              ${ageHint ? `<div class="mobile-program-hint">${ageHint}</div>` : ''}
              <button
                class="shift-calendar-btn"
                type="button"
                data-action="open-calendar"
                data-shift-id="${activeShift.sourceId || activeShift.id}"
                aria-label="Календарь ${activeShift.title}"
              >
                <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/calendar.svg" alt="" aria-hidden="true"><span>Календарь</span>
              </button>
            </article>
            <div class="mobile-program-dots">
              ${mainShifts.map((shift, idx) => `
                <button
                  class="mobile-program-dot ${shift.id === activeShift.id ? 'active' : ''}"
                  type="button"
                  data-action="mobile-program-select"
                  data-shift-id="${shift.id}"
                  aria-label="Показать смену ${selectorLabel(shift) || (idx + 1)}"
                ></button>
              `).join('')}
            </div>
          `;
          programsTargets.forEach((target) => {
            target.innerHTML = programsHtml;
          });
        } else {
          programsTargets.forEach((target) => {
            target.innerHTML = '';
          });
        }
      }

      if (photoGalleryTargets.length) {
        const photoByFilter = {
          camp: ['all'],
          pool: ['pool'],
          sport: ['sport'],
          study: ['study'],
          food: ['food']
        };
        const tags = photoByFilter[state.photoFilter] || ['all'];
        const list = mediaContent.photos.filter((item) => tags.includes(item.cat));
        const activeIndex = Math.min(Math.max(state.mobilePhotoIndex || 0, 0), Math.max(list.length - 1, 0));
        state.mobilePhotoIndex = activeIndex;
        const active = list[activeIndex];

        if(active){
          const photoHtml = `
            <div class="mobile-media-stage mobile-photo-stage">
              <button type="button" data-action="open-photo" data-photo-index="${activeIndex}">
                <img src="${active.src}" alt="${active.alt || 'Фото лагеря'}">
                <div class="mobile-media-overlay">
                  <strong>${(active.alt || 'Атмосфера лагеря').replace(/^all$/i, 'Атмосфера')}</strong>
                  <span>Тапните, чтобы открыть фото</span>
                </div>
              </button>
            </div>
            <div class="mobile-photo-preview-strip">
              ${list.map((item, idx) => `
                <button class="mobile-photo-preview-thumb ${idx === activeIndex ? 'active' : ''}" type="button" data-action="mobile-photo-select" data-photo-index="${idx}" aria-label="Выбрать фото ${idx + 1}">
                  <img src="${item.src}" alt="${item.alt || 'Фото'}">
                </button>
              `).join('')}
            </div>
          `;
          photoGalleryTargets.forEach((target) => {
            target.innerHTML = photoHtml;
          });
        } else {
          photoGalleryTargets.forEach((target) => {
            target.innerHTML = '';
          });
        }
      }

      if (videoGalleryTargets.length) {
        const list = mediaContent.videos || [];
        const activeIndex = Math.min(Math.max(state.mobileVideoIndex || 0, 0), Math.max(list.length - 1, 0));
        state.mobileVideoIndex = activeIndex;
        const active = list[activeIndex];

        if(active){
          const videoHtml = `
            <div class="mobile-media-stage mobile-video-stage">
              <button type="button" data-action="open-video" data-video="${active.url}">
                <img src="${active.cover}" alt="${active.title}">
                <span class="mobile-media-play"><img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/play.svg" alt="" aria-hidden="true"></span>
                <div class="mobile-media-overlay">
                  <strong>${active.title}</strong>
                  <span>Смотреть видео</span>
                </div>
              </button>
            </div>
            <div class="mobile-video-preview-strip">
              ${list.map((item, idx) => `
                <button class="mobile-video-preview-thumb ${idx === activeIndex ? 'active' : ''}" type="button" data-action="mobile-video-select" data-video-index="${idx}" aria-label="Выбрать видео ${idx + 1}">
                  <img src="${item.cover}" alt="${item.title}">
                </button>
              `).join('')}
            </div>
          `;
          videoGalleryTargets.forEach((target) => {
            target.innerHTML = videoHtml;
          });
        } else {
          videoGalleryTargets.forEach((target) => {
            target.innerHTML = '';
          });
        }
      }

      if (reviewsGalleryTargets.length) {
        const list = mediaContent.reviews || [];
        const activeIndex = Math.min(Math.max(state.mobileReviewIndex || 0, 0), Math.max(list.length - 1, 0));
        state.mobileReviewIndex = activeIndex;
        const active = list[activeIndex];
        if(active){
          const reviewsHtml = `
            <div class="mobile-review-social-proof">
              <div class="mobile-review-top">
                <div class="mobile-review-scoreline">
                  <strong>5.0</strong><span class="mobile-review-stars">★★★★★</span>
                </div>
                <a class="inline-link-btn primary" href="${mediaContent.references.yandexReviewsUrl}" target="_blank" rel="noopener noreferrer">Отзывы в Яндекс</a>
              </div>
              <div class="mobile-review-proof">Более 40 реальных отзывов на Яндекс.Картах</div>
              <p class="mobile-review-trust-note">Родители пишут не про “анимацию”, а про сильную команду и реальные проекты.</p>
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
              <div class="mobile-review-main-nav">
                <button class="mobile-review-nav-btn" type="button" data-action="mobile-review-prev" aria-label="Предыдущий отзыв">Назад</button>
                <button class="mobile-review-nav-btn" type="button" data-action="mobile-review-next" aria-label="Следующий отзыв">Далее</button>
              </div>
            </div>
          `;
          reviewsGalleryTargets.forEach((target) => {
            target.innerHTML = reviewsHtml;
          });
        } else {
          reviewsGalleryTargets.forEach((target) => {
            target.innerHTML = '';
          });
        }
      }

      if (faqListTargets.length || faqFiltersTargets.length) {
        const rawGroups = mediaContent.faq.map((group) => group.group);
        const primaryGroups = rawGroups.filter((group) => group !== 'all' && group !== 'Все');
        const tailGroups = rawGroups.filter((group) => group === 'all' || group === 'Все');
        const groups = [...primaryGroups, ...tailGroups];
        const safeGroup = groups.includes(state.mobileFaqGroup) ? state.mobileFaqGroup : (groups[0] || 'Медицина');
        state.mobileFaqGroup = safeGroup;
        const activeFaqGroup = mediaContent.faq.find((group) => group.group === safeGroup);
        const faqItems = (activeFaqGroup?.items || []).map((item, index) => ({
          key: `${safeGroup}:${index}`,
          q: item.q,
          a: item.a
        }));
        const fallbackKey = faqItems[0]?.key || '';
        const activeKey = faqItems.some((item) => item.key === state.mobileFaqOpenKey) ? state.mobileFaqOpenKey : fallbackKey;
        state.mobileFaqOpenKey = activeKey;

        const faqFiltersHtml = groups.map((group) => `
            <button
              type="button"
              class="mobile-faq-filter-chip ${group === safeGroup ? 'active' : ''}"
              data-action="mobile-faq-filter"
              data-faq-group="${group}"
            >${group}</button>
          `).join('');
        faqFiltersTargets.forEach((target) => {
          target.innerHTML = faqFiltersHtml;
        });

        const faqListHtml = faqItems.map((item) => `
          <article class="mobile-faq-item ${item.key === activeKey ? 'open' : ''}">
            <button
              type="button"
              class="mobile-faq-question"
              data-action="mobile-faq-toggle"
              data-faq-key="${item.key}"
            >
              <span>${item.q}</span>
              <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
            </button>
            <div class="mobile-faq-answer">${item.a}</div>
          </article>
        `).join('');
        faqListTargets.forEach((target) => {
          target.innerHTML = faqListHtml;
        });
      }

      teamTargets.forEach((target) => renderCompactInlineTeamList(target));
      stayTargets.forEach((target) => renderCompactInlineStayList(target));
      contactsTargets.forEach((target) => renderCompactInlineContactsList(target));
      socialsTargets.forEach((target) => renderCompactInlineSocials(target));

      if (mobileDocsRequisites) {
        mobileDocsRequisites.innerHTML = '';
      }

      if (mobileDocsAccordion) {
        mobileDocsAccordion.innerHTML = `
          <article class="mobile-docs-accordion-item ${state.mobileDocsExpanded ? 'open' : ''}">
            <button type="button" class="mobile-docs-toggle" data-action="mobile-docs-toggle">
              <span class="mobile-docs-toggle-copy">
                <span class="mobile-docs-toggle-main">ООО «ВОИП КОННЕКТ»</span>
                <span class="mobile-docs-toggle-meta">ИНН 7729713637 · РТО 025773</span>
              </span>
              <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
            </button>
            <div class="mobile-docs-links">
              <a href="legal.html#education-license" target="_blank" rel="noopener noreferrer">Образовательная лицензия Л035-01298-77/01082973</a>
              <a href="mailto:hello@codims.ru">hello@codims.ru</a>
              <a href="https://www.codims.ru/privacy" target="_blank" rel="noopener noreferrer">Политика обработки персональных данных</a>
              <a href="legal.html#legal-info" target="_blank" rel="noopener noreferrer">Юридическая информация</a>
              <a href="legal.html#org-info" target="_blank" rel="noopener noreferrer">Сведения об организации</a>
              <a href="legal.html#children-rest" target="_blank" rel="noopener noreferrer">Отдых и оздоровление детей</a>
              <a href="legal.html#partners-info" target="_blank" rel="noopener noreferrer">Условия для партнёров</a>
              <a href="legal.html#bloggers-info" target="_blank" rel="noopener noreferrer">Сотрудничество с блогерами</a>
            </div>
          </article>
          <div class="footer-copyright-mini">© 2019–2026</div>
        `;
      }

      document.querySelectorAll('#mobilePhotoFilters [data-photo-filter], #mobilePhotoFiltersDesktop [data-photo-filter]').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.photoFilter === state.photoFilter);
      });
    }

    function renderDesktopMobileDocsBlock(){
      const footer = document.getElementById('section-legal');
      if(!footer) return;

      if(!footer.dataset.originalMarkup){
        footer.dataset.originalMarkup = footer.innerHTML;
      }

      const useMobileDocs = USE_DESKTOP_BASE_FOR_MOBILE && state.previewView === 'mobile';
      if(!useMobileDocs){
        if(footer.dataset.mobileDocsApplied === '1'){
          footer.innerHTML = footer.dataset.originalMarkup || footer.innerHTML;
          footer.dataset.mobileDocsApplied = '0';
        }
        footer.classList.remove('mobile-docs-inline');
        return;
      }

      footer.classList.add('mobile-docs-inline');
      footer.dataset.mobileDocsApplied = '1';
      footer.innerHTML = `
        <div class="mobile-docs-shell">
          <article class="mobile-docs-accordion-item ${state.mobileDocsExpanded ? 'open' : ''}">
            <button type="button" class="mobile-docs-toggle" data-action="mobile-docs-toggle">
              <span class="mobile-docs-toggle-copy">
                <span class="mobile-docs-toggle-main">ООО «ВОИП КОННЕКТ»</span>
                <span class="mobile-docs-toggle-meta">ИНН 7729713637 · РТО 025773</span>
              </span>
              <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
            </button>
            <div class="mobile-docs-links">
              <a href="legal.html#education-license" target="_blank" rel="noopener noreferrer">Образовательная лицензия Л035-01298-77/01082973</a>
              <a href="mailto:hello@codims.ru">hello@codims.ru</a>
              <a href="https://www.codims.ru/privacy" target="_blank" rel="noopener noreferrer">Политика обработки персональных данных</a>
              <a href="legal.html#legal-info" target="_blank" rel="noopener noreferrer">Юридическая информация</a>
              <a href="legal.html#org-info" target="_blank" rel="noopener noreferrer">Сведения об организации</a>
              <a href="legal.html#children-rest" target="_blank" rel="noopener noreferrer">Отдых и оздоровление детей</a>
              <a href="legal.html#partners-info" target="_blank" rel="noopener noreferrer">Условия для партнёров</a>
              <a href="legal.html#bloggers-info" target="_blank" rel="noopener noreferrer">Сотрудничество с блогерами</a>
            </div>
          </article>
          <div class="footer-copyright-mini">© 2019–2026</div>
        </div>
      `;
    }

    function syncMobileDocsExpandedUi(){
      document.querySelectorAll('.mobile-docs-accordion-item').forEach((item) => {
        item.classList.toggle('open', !!state.mobileDocsExpanded);
      });
    }

    const DESKTOP_MOBILE_SECTION_TEMPLATES = {
      'section-about': `
        <h3>О лагере</h3>
        <p class="section-lead">AiDaCamp — место, где ребёнок создаёт, двигается, работает в команде и уезжает со смены с понятным результатом.</p>
        <div class="mobile-about-features" id="mobileAboutFeaturesDesktop"></div>
      `,
      'section-journey': `
        <h3>Как проходит смена</h3>
        <p class="section-lead">4 шага: от быстрого включения к понятному результату за смену.</p>
        <div class="mobile-journey-flow" id="mobileJourneyContentDesktop"></div>
      `,
      'section-programs': `
        <h3>Описание смен</h3>
        <p class="section-lead">Выберите смену в селекторе — ниже покажем одну карточку с ключевыми деталями.</p>
        <div class="mobile-programs-flow" id="mobileProgramsContentDesktop"></div>
      `,
      'section-photos': `
        <h3>Фото</h3>
        <p class="section-lead">Живые кадры лагеря: занятия, бассейн, спорт, питание, команда и атмосфера.</p>
        <div class="mobile-media-filter-row" id="mobilePhotoFiltersDesktop">
          <button class="mobile-media-filter active" type="button" data-photo-filter="camp">Атмосфера</button>
          <button class="mobile-media-filter" type="button" data-photo-filter="pool">Бассейн</button>
          <button class="mobile-media-filter" type="button" data-photo-filter="sport">Спорт</button>
          <button class="mobile-media-filter" type="button" data-photo-filter="study">Учёба</button>
          <button class="mobile-media-filter" type="button" data-photo-filter="food">Питание</button>
        </div>
        <div id="mobilePhotoGalleryDesktop"></div>
      `,
      'section-videos': `
        <h3>Видео</h3>
        <p class="section-lead">Короткие видео, которые быстро объясняют, почему дети в лагере меняются сильнее, чем родители ожидают.</p>
        <div id="mobileVideoGalleryDesktop"></div>
      `,
      'section-reviews': `
        <h3>Отзывы</h3>
        <p class="section-lead">Сильный внешний social proof: реальные отзывы родителей на Яндекс Картах.</p>
        <div id="mobileReviewsGalleryDesktop"></div>
      `,
      'section-faq': `
        <h3>FAQ</h3>
        <p class="section-lead">Ключевые вопросы по медицине, безопасности, питанию и проживанию.</p>
        <div class="mobile-faq-filter-row" id="mobileFaqFiltersDesktop"></div>
        <div class="mobile-faq-accordion" id="mobileFaqListDesktop"></div>
      `,
      'section-team': `
        <h3>Команда</h3>
        <p class="section-lead">Люди, которые ведут смены и работают с детьми в проектном формате.</p>
        <div class="mobile-team-list" id="mobileInlineTeamListDesktop"></div>
      `,
      'section-stay': `
        <h3>Размещение</h3>
        <p class="section-lead">Комнаты, бытовые зоны и территория лагеря.</p>
        <div class="mobile-stay-list" id="mobileInlineStayListDesktop"></div>
      `,
      'section-contacts': `
        <h3>Контакты</h3>
        <p class="section-lead">Быстрая связь и маршрут до лагеря.</p>
        <div class="mobile-contacts-list" id="mobileInlineContactsListDesktop"></div>
        <div class="mobile-socials-row" id="mobileInlineSocialsDesktop"></div>
      `
    };

    function applyMobileTemplatesToDesktopSections(){
      const useMobileTemplates = USE_DESKTOP_BASE_FOR_MOBILE && state.previewView === 'mobile';
      Object.entries(DESKTOP_MOBILE_SECTION_TEMPLATES).forEach(([sectionId, template]) => {
        const section = document.getElementById(sectionId);
        if(!section) return;
        if(!section.dataset.desktopOriginalMarkup){
          section.dataset.desktopOriginalMarkup = section.innerHTML;
        }
        if(useMobileTemplates){
          section.innerHTML = template;
          section.classList.add('mobile-template');
        } else if(section.dataset.desktopOriginalMarkup){
          section.innerHTML = section.dataset.desktopOriginalMarkup;
          section.classList.remove('mobile-template');
        }
      });
    }

    function applyMobileSectionAccordion(){
      return;
    }

    function renderAll(){
      applyMobileTemplatesToDesktopSections();
      renderShiftOptions('desktop-shift-options');
      if(!USE_DESKTOP_BASE_FOR_MOBILE){
        renderShiftOptions('mobileShiftOptions');
      }
      renderBookingPanels();
      renderGuidedState('desktop');
      if(!USE_DESKTOP_BASE_FOR_MOBILE){
        renderGuidedState('mobile');
      }
      syncDesktopAgeTapHintVisibility();
      scheduleDesktopAgeTapHint();
      renderMediaSections();
      if(!USE_DESKTOP_BASE_FOR_MOBILE){
        applyMobileSectionAccordion();
      }
      renderDesktopMobileDocsBlock();
      renderSummary();
    }

    function selectShift(id){
      const shift = shifts.find(s => s.id === id);
      clearShiftOptionPanels();
      state.shiftId = id;
      state.basePrice = shift.price;
      state.offerPrice = null;
      state.code = null;
      state.expiresAt = null;
      state.offerStage = 0;
      renderAll();
      persist();
    }

    function handlePrimaryCTA(){
      if(!hasSelectedAge()){
        showHint('Выберите возраст', 'age');
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
      card?.classList.add('offer-card-stable');
      offerRunId += 1;
      const currentRunId = offerRunId;
      state.offerSearching = true;
      clearOfferTimeout();
      track('offer_open', selectedShiftPayload());
      track('offer_start', selectedShiftPayload());
      wrap.classList.remove('hidden');
      applyOfferModalTheme(card);

      const useLegacyLayout = state.offerLayout === 'legacy';
      card.innerHTML = useLegacyLayout
        ? `
          <div class="offer-state-shell offer-state-shell--search offer-state-shell--search-legacy">
            <div class="offer-headline">
              <h3>Ищем лучшую цену</h3>
              <button class="form-close offer-close-btn offer-close-placeholder" type="button" aria-hidden="true" tabindex="-1">
                <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/close.svg" alt="" aria-hidden="true">
              </button>
            </div>
            <div class="offer-legacy-search-icon" aria-hidden="true">
              <img class="offer-legacy-search-icon__asset" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/offer-search.svg" alt="">
            </div>
            <div class="offer-legacy-status" id="offerProgressLead">Смотрим текущие бронирования...</div>
            <div class="offer-progress-track offer-progress-track--legacy">
              <div class="offer-progress-fill" id="offerProgressFillLine"></div>
            </div>
            <p class="offer-legacy-note">Проверяем доступные условия по выбранной смене.</p>
          </div>
        `
        : `
          <div class="offer-state-shell offer-state-shell--search">
            <div class="offer-headline">
              <h3>Ищем лучшую цену</h3>
              <button class="form-close offer-close-btn offer-close-placeholder" type="button" aria-hidden="true" tabindex="-1">
                <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/close.svg" alt="" aria-hidden="true">
              </button>
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
          </div>
        `;
      normalizeCloseIconButtons(card);
      card.querySelectorAll('[data-action="close-offer"]').forEach((btn) => btn.remove());
      const fillEl = document.getElementById('offerProgressFillLine');
      const leadEl = document.getElementById('offerProgressLead');
      const stepA = document.getElementById('offerStepA');
      const stepB = document.getElementById('offerStepB');
      const stepC = document.getElementById('offerStepC');

      const progressDurationMs = 7000;
      if(fillEl){
        fillEl.style.transition = 'none';
        fillEl.style.width = '0%';
        requestAnimationFrame(() => {
          if(currentRunId !== offerRunId) return;
          fillEl.style.transition = `width ${progressDurationMs}ms linear`;
          fillEl.style.width = '100%';
        });
      }

      const progressSteps = (useLegacyLayout
        ? [
          { delay: 900, lead: 'Смотрим текущие бронирования...' },
          { delay: 2700, lead: 'Ищем свободные места...' },
          { delay: 4700, lead: 'Проверяем отказы и неоплаты...' },
          { delay: 6400, lead: 'Считаем максимально доступную цену...' }
        ]
        : [
          {
            delay: 2300,
            lead: 'Сверяем цену и проверяем, можно ли зафиксировать условия.',
            from: stepA,
            to: stepB
          },
          {
            delay: 4700,
            lead: 'Готовим персональный код бронирования и закрепляем цену.',
            from: stepB,
            to: stepC
          }
        ]);

      progressSteps.forEach((step) => {
        offerTimeoutIds.push(setTimeout(() => {
          if(currentRunId !== offerRunId) return;
          if(leadEl && step.lead) leadEl.textContent = step.lead;
          if(step.from && step.from.classList) step.from.classList.remove('active');
          if(step.to && step.to.classList) step.to.classList.add('active');
        }, step.delay));
      });

      const finalProgressDelay = progressDurationMs + 160;

      offerTimeoutIds.push(setTimeout(() => {
        if(currentRunId !== offerRunId) return;
        clearOfferTimeout();
        showOffer();
      }, finalProgressDelay));
    }

    function openOfferCheck(){
      runOfferSearch();
    }

    function showOffer(){
      const card = document.getElementById('offerCard');
      const featureOfferUtils = window.AC_FEATURES && window.AC_FEATURES.offerUtils;
      const selectedShift = getSelectedShift();
      const basePrice = state.basePrice || (selectedShift ? selectedShift.price : null);

      if(basePrice){
        if(featureOfferUtils && typeof featureOfferUtils.buildOfferState === 'function'){
          const nextOfferState = featureOfferUtils.buildOfferState({
            basePrice,
            discountFactor: OFFER_DISCOUNT_FACTOR,
            now: Date.now(),
            ttlHours: 72
          });
          state.offerPrice = nextOfferState.offerPrice;
          state.expiresAt = nextOfferState.expiresAt;
          state.offerStage = nextOfferState.offerStage;
        } else {
          state.offerPrice = Math.round(basePrice * OFFER_DISCOUNT_FACTOR);
          state.expiresAt = Date.now() + 72 * 60 * 60 * 1000;
          state.offerStage = 1;
        }
      }

      state.code = generateCode();
      state.offerSearching = false;
      persist();
      track('offer_complete', selectedShiftPayload());
      card?.classList.add('offer-card-stable');
      applyOfferModalTheme(card);
      const oldPriceText = basePrice ? formatPrice(basePrice) : '—';
      const newPriceText = formatPrice(state.offerPrice);
      const appliedPrice = state.offerPrice || basePrice || 0;
      const savingsValue = Math.max(0, (basePrice || 0) - appliedPrice);
      const savingsText = formatPrice(savingsValue);
      const savingsPercent = basePrice
        ? `${Math.max(0, Math.round((savingsValue / basePrice) * 100))}%`
        : '0%';

      const useLegacyLayout = state.offerLayout === 'legacy';
      card.innerHTML = useLegacyLayout
        ? `
          <div class="offer-state-shell offer-state-shell--result offer-state-shell--result-legacy">
            <div class="offer-headline">
              <h3>Нашли лучшие условия</h3>
              <button class="form-close offer-close-btn" type="button" data-action="close-offer" aria-label="Закрыть">
                <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/close.svg" alt="" aria-hidden="true">
              </button>
            </div>
            <div class="offer-legacy-result-banner">
              <div class="offer-legacy-result-banner__icon" aria-hidden="true">
                <img class="offer-legacy-result-banner__asset" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/search-job-svgrepo-com.svg" alt="">
              </div>
              <div class="offer-legacy-result-banner__text">
                <strong>Цена закреплена за вами</strong>
                <span>На ограниченное время</span>
              </div>
            </div>
            <div class="offer-legacy-price-box">
              <small>Ваша цена</small>
              <strong>${newPriceText}</strong>
              <span>Вместо ${oldPriceText}</span>
            </div>
            <div class="offer-price-compare__benefits">
              <span class="offer-benefit-chip"><strong>Выгода:</strong> ${savingsText}</span>
              <span class="offer-benefit-chip"><strong>Разница:</strong> ${savingsPercent}</span>
              ${state.code ? `<span class="offer-benefit-chip"><strong>Код бронирования:</strong> ${state.code}</span>` : ''}
            </div>
            <div class="offer-booking-block">
              <p class="offer-booking-note">Действует 72 часа. Вы можете спокойно подумать и вернуться.</p>
            </div>
            <div class="overlay-actions">
              <button class="cta-main" id="offerApplyBtn" data-action="apply-offer" type="button">Оформить заявку</button>
            </div>
            <div class="inline-lead-host hidden" id="offerInlineLeadHost"></div>
          </div>
        `
        : `
          <div class="offer-state-shell offer-state-shell--result">
            <div class="offer-headline">
              <h3>Нашли лучшие условия</h3>
              <button class="form-close offer-close-btn" type="button" data-action="close-offer" aria-label="Закрыть">
                <img class="ac-icon" src="https://cdn.jsdelivr.net/gh/afanasevvlad829-cyber/aidaplus-landing-dev@tilda-prod/assets/icons/close.svg" alt="" aria-hidden="true">
              </button>
            </div>
            <div class="offer-price-compare">
              <div class="offer-price-compare__new">
                <small>Новая цена после проверки</small>
                <strong>${newPriceText}</strong>
              </div>
              <div class="offer-price-compare__old">
                <small>Старая цена</small>
                <span>${oldPriceText}</span>
              </div>
              <div class="offer-price-compare__benefits">
                <span class="offer-benefit-chip"><strong>Выгода:</strong> ${savingsText}</span>
                <span class="offer-benefit-chip"><strong>Разница:</strong> ${savingsPercent}</span>
                ${state.code ? `<span class="offer-benefit-chip"><strong>Код бронирования:</strong> ${state.code}</span>` : ''}
              </div>
            </div>
            <div class="offer-booking-block">
              <p class="offer-booking-note">Действует 72 часа. Вы можете спокойно подумать и вернуться.</p>
            </div>

            <div class="overlay-actions">
              <button class="cta-main" id="offerApplyBtn" data-action="apply-offer" type="button">Оформить заявку</button>
            </div>
            <div class="inline-lead-host hidden" id="offerInlineLeadHost"></div>
          </div>
        `;
      normalizeCloseIconButtons(card);

      startTimer();
      renderSummary();
      renderBookingPanels();
    }

    function saveOfferAndClose(){
      syncGuidedState();
      clearOfferTimeout();
      document.getElementById('offerOverlay').classList.add('hidden');
      renderSummary();
      renderBookingPanels();
    }

    function resetOfferProgressUI(){
      clearOfferTimeout();
      state.offerSearching = false;
    }

    function startTimer(){
      if(timerId) clearInterval(timerId);

      const updateTimers = () => {
        if(!state.expiresAt) return;

        const diff = state.expiresAt - Date.now();
        const offerTimer = document.getElementById('offerTimer');
        const summaryTimer = document.getElementById('summaryTimer');
        const bookingTimers = document.querySelectorAll('.booking-timer-line[data-live-timer="true"]');

        if(diff <= 0){
          clearInterval(timerId);
          resetOfferState({preserveShift:true});
          persist();
          if(offerTimer) offerTimer.textContent = '';
          if(summaryTimer) summaryTimer.textContent = '';
          bookingTimers.forEach((node) => {
            node.textContent = '';
          });
          renderBookingPanels();
          return;
        }

        const fullText = formatRemaining(diff);
        const compactText = normalizeCompactTimerText(formatRemainingCompact(diff));

        if(offerTimer) offerTimer.textContent = fullText;
        if(summaryTimer) summaryTimer.textContent = compactText;
        bookingTimers.forEach((node) => {
          node.textContent = compactText;
        });
      };

      updateTimers();
      timerId = setInterval(updateTimers, 1000);
    }

    function isSummaryCompactMode(){
      if(state.previewView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE){
        return state.mobileMode === 'compact';
      }
      return state.desktopMode === 'compact';
    }

    function isSummaryBelowHero(){
      const heroSelector = '#desktopView .hero-shell';
      const hero = document.querySelector(heroSelector);
      if(!hero) return true;
      const rect = hero.getBoundingClientRect();
      return rect.bottom <= 8;
    }

    function isBookingPrimaryCtaVisibleInViewport(){
      const cardSelector = (state.previewView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE)
        ? '#mobileBookingCard'
        : '#desktop-booking-card';
      const card = document.querySelector(cardSelector);
      if(!card || card.classList.contains('hidden')) return false;
      const ctaButtons = Array.from(card.querySelectorAll('[data-action="primary-cta"]'));
      if(!ctaButtons.length) return false;

      return ctaButtons.some((button) => {
        if(!button || button.disabled) return false;
        const style = window.getComputedStyle(button);
        if(style.display === 'none' || style.visibility === 'hidden') return false;
        if(Number(style.opacity || 1) === 0) return false;
        if(Number(style.height || 0) === 0 || Number(style.width || 0) === 0) return false;
        const rect = button.getBoundingClientRect();
        if(rect.width < 2 || rect.height < 2) return false;
        return !(rect.bottom <= -16 || rect.top >= window.innerHeight + 16);
      });
    }

    function updateSummaryBarVisibility(){
      const bar = document.getElementById('summaryBar');
      if(!bar) return;

      if(state.bookingCompleted){
        bar.classList.remove('is-visible');
        bar.classList.add('hidden');
        document.body.classList.remove('summary-visible');
        return;
      }

      if(!state.shiftId || isSummaryCompactMode()){
        bar.classList.remove('is-visible');
        bar.classList.add('hidden');
        document.body.classList.remove('summary-visible');
        return;
      }

      if(Date.now() < summaryBarDismissUntilTs){
        bar.classList.remove('is-visible');
        bar.classList.add('hidden');
        document.body.classList.remove('summary-visible');
        return;
      }

      const action = getPrimaryActionState();
      if(!action || action.disabled){
        bar.classList.remove('is-visible');
        bar.classList.add('hidden');
        document.body.classList.remove('summary-visible');
        return;
      }

      const shouldShow = isSummaryBelowHero() && !isBookingPrimaryCtaVisibleInViewport();
      bar.classList.remove('hidden');
      bar.classList.toggle('is-visible', shouldShow);
      document.body.classList.toggle('summary-visible', shouldShow);
    }

    function dismissSummaryBarTemporarily(ms = 30000){
      summaryBarDismissUntilTs = Date.now() + Math.max(1000, Number(ms) || 30000);
      if(summaryBarDismissTimer){
        clearTimeout(summaryBarDismissTimer);
      }
      summaryBarDismissTimer = setTimeout(() => {
        summaryBarDismissUntilTs = 0;
        summaryBarDismissTimer = null;
        updateSummaryBarVisibility();
      }, Math.max(1000, Number(ms) || 30000));
      updateSummaryBarVisibility();
    }

    function renderSummary(){
      syncGuidedState();
      if(state.expiresAt && Date.now() >= state.expiresAt){
        resetOfferState({preserveShift:true});
        persist();
      }
      const bar = document.getElementById('summaryBar');
      if(bar){
        bar.classList.remove('summary-bar--stage4');
      }

      if(!state.shiftId){
        updateSummaryBarVisibility();
        renderBookingPanels();
        return;
      }

      const shift = shifts.find(s => s.id === state.shiftId);
      const price = state.offerPrice || state.basePrice || shift.price;
      const summaryStage = getBookingStage();
      const isStageFourSummary = summaryStage === 4 && !state.bookingCompleted;
      bar.classList.toggle('summary-bar--stage4', isStageFourSummary);

      document.getElementById('summaryMain').textContent = isStageFourSummary ? '' : `${labelAge(state.age)}`;
      document.getElementById('summaryMeta').textContent = `${shift.dates}${state.code ? ` · Код ${state.code}` : ''}`;
      document.getElementById('summaryPrice').textContent = formatPrice(price);
      const summaryCtaBtn = bar.querySelector('[data-action="primary-cta"]');
      if(summaryCtaBtn){
        const action = getPrimaryActionState();
        const actionText = getResolvedPrimaryActionText(action, shift);
        if(isStageFourSummary && /^Оформить заявку · выгода /i.test(actionText)){
          const gainText = actionText.replace(/^Оформить заявку · выгода /i, '').trim();
          summaryCtaBtn.innerHTML = `
            <span class="cta-main-line cta-main-line--primary">Оформить заявку</span>
            <span class="cta-main-line cta-main-line--accent">Выгода ${gainText}</span>
          `;
          summaryCtaBtn.setAttribute('aria-label', actionText);
        } else {
          summaryCtaBtn.textContent = actionText;
          summaryCtaBtn.removeAttribute('aria-label');
        }
        summaryCtaBtn.classList.toggle('is-disabled', !!action.disabled);
        summaryCtaBtn.setAttribute('aria-disabled', action.disabled ? 'true' : 'false');
        summaryCtaBtn.disabled = false;
      }

      updateSummaryBarVisibility();
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

    function getLeadScopeConfig(scope = 'drawer'){
      const map = {
        drawer: {
          hostId:'formDrawer',
          phoneInputId:'parentPhone',
          consentId:'consentCheck',
          errorId:'phoneError',
          submitId:'submitLeadBtn'
        },
        'booking-desktop': {
          hostId:'desktopInlineLeadHost',
          phoneInputId:'inlineLeadPhoneDesktop',
          consentId:'inlineLeadConsentDesktop',
          errorId:'inlineLeadErrorDesktop',
          submitId:'inlineLeadSubmitDesktop'
        },
        'booking-mobile': {
          hostId:'mobileInlineLeadHost',
          phoneInputId:'inlineLeadPhoneMobile',
          consentId:'inlineLeadConsentMobile',
          errorId:'inlineLeadErrorMobile',
          submitId:'inlineLeadSubmitMobile'
        },
        offer: {
          hostId:'offerInlineLeadHost',
          phoneInputId:'inlineLeadPhoneOffer',
          consentId:'inlineLeadConsentOffer',
          errorId:'inlineLeadErrorOffer',
          submitId:'inlineLeadSubmitOffer'
        }
      };
      return map[scope] || null;
    }

    function getLeadSubmitDefaultText(scope = 'drawer'){
      return 'Забронировать место';
    }

    function setLeadPhoneError(scope = 'drawer', show = false, message = ''){
      const cfg = getLeadScopeConfig(scope);
      if(!cfg) return;
      const input = document.getElementById(cfg.phoneInputId);
      const error = document.getElementById(cfg.errorId);
      if(!input || !error) return;
      if(message) error.textContent = message;
      input.classList.toggle('input-error', !!show);
      error.classList.toggle('visible', !!show);
    }

    function setPhoneError(show){
      setLeadPhoneError('drawer', show);
    }

    function setLeadSubmitState(loading, scope = 'drawer'){
      const cfg = getLeadScopeConfig(scope);
      if(!cfg) return;
      const btn = document.getElementById(cfg.submitId);
      if(!btn) return;
      btn.disabled = !!loading;
      btn.textContent = loading ? 'Бронируем...' : getLeadSubmitDefaultText(scope);
    }

    function bindPhoneMaskForScope(scope = 'drawer'){
      const cfg = getLeadScopeConfig(scope);
      if(!cfg) return;
      const phoneInput = document.getElementById(cfg.phoneInputId);
      if(!phoneInput || phoneInput.dataset.maskBound === '1') return;

      phoneInput.addEventListener('input', (e) => {
        e.target.value = formatPhoneInput(e.target.value);
        setLeadPhoneError(scope, false);
      });
      phoneInput.addEventListener('blur', () => {
        const val = phoneInput.value.trim();
        if(!val){
          setLeadPhoneError(scope, false);
          return;
        }
        setLeadPhoneError(scope, !isValidPhone(val));
      });
      phoneInput.addEventListener('paste', () => {
        requestAnimationFrame(() => {
          phoneInput.value = formatPhoneInput(phoneInput.value);
          setLeadPhoneError(scope, false);
        });
      });
      phoneInput.dataset.maskBound = '1';
    }

    function buildInlineLeadFormHtml(scope){
      const cfg = getLeadScopeConfig(scope);
      if(!cfg) return '';
      return `
        <div class="inline-lead-card ${scope === 'offer' ? 'inline-lead-card--offer' : ''}" data-inline-scope="${scope}">
          <div class="form-field">
            <label for="${cfg.phoneInputId}">Телефон</label>
            <input class="input-box" id="${cfg.phoneInputId}" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" maxlength="18" />
            <div class="field-error" id="${cfg.errorId}">Введите телефон полностью в формате +7 (___) ___-__-__</div>
          </div>
          <label class="check-row inline-lead-check">
            <input type="checkbox" id="${cfg.consentId}" />
            <span>Я согласен(на) на обработку персональных данных.</span>
          </label>
          <button class="cta-main inline-lead-submit" id="${cfg.submitId}" type="button" data-action="submit-inline-lead" data-inline-scope="${scope}">
            ${getLeadSubmitDefaultText(scope)}
          </button>
        </div>
      `;
    }

    function openInlineLead(scope){
      const cfg = getLeadScopeConfig(scope);
      if(!cfg) return;
      const host = document.getElementById(cfg.hostId);
      if(!host) return;

      if(!host.innerHTML.trim()){
        host.innerHTML = buildInlineLeadFormHtml(scope);
      }
      host.classList.remove('hidden');

      const phoneInput = document.getElementById(cfg.phoneInputId);
      if(phoneInput){
        phoneInput.value = formatPhoneInput(state.phone || '');
      }
      const consentCheck = document.getElementById(cfg.consentId);
      if(consentCheck){
        consentCheck.checked = false;
      }
      setLeadPhoneError(scope, false);
      setLeadSubmitState(false, scope);
      bindPhoneMaskForScope(scope);
      phoneInput?.focus();
      track('form_open', {
        ...selectedShiftPayload(),
        lead_scope: scope
      });
    }

    function closeInlineLead(scope){
      const cfg = getLeadScopeConfig(scope);
      if(!cfg) return;
      const host = document.getElementById(cfg.hostId);
      if(!host) return;
      host.classList.add('hidden');
    }

    function openForm(){
      syncGuidedState();
      if(!state.shiftId) return;

      const formLead = document.getElementById('formLead');
      if(formLead){
        formLead.textContent = '';
      }

      const phoneInput = document.getElementById('parentPhone');
      document.getElementById('parentPhone').value = state.phone || '';
      if(phoneInput) phoneInput.value = formatPhoneInput(state.phone || '');
      const bookingSummaryBox = document.getElementById('bookingSummaryBox');
      if(bookingSummaryBox) bookingSummaryBox.innerHTML = buildBookingSummaryHtml({showTimer: true});
      setLeadPhoneError('drawer', false);
      setLeadSubmitState(false, 'drawer');
      bindPhoneMaskForScope('drawer');
      if(isOfferActive()){
        startTimer();
      }
      track('form_open', selectedShiftPayload());
      document.getElementById('formDrawer').classList.remove('hidden');
    }

    function closeForm(){
      document.getElementById('formDrawer').classList.add('hidden');
    }

    function openSuccessModal(deliveryResult){
      const box = document.getElementById('successSummaryBox');
      if(box) box.innerHTML = buildBookingSummaryHtml();
      const deliveryState = document.getElementById('successDeliveryState');
      if(deliveryState){
        const isAdmin = isAdminDebugSession();
        if(isAdmin && deliveryResult && deliveryResult.ok === false){
          deliveryState.textContent = 'Заявка сохранена локально, но сейчас нет связи с сервером отправки. Если мы не ответим в течение 15 минут, напишите нам в Telegram.';
          deliveryState.classList.remove('hidden');
          deliveryState.classList.add('error');
        } else {
          deliveryState.textContent = '';
          deliveryState.classList.add('hidden');
          deliveryState.classList.remove('error');
        }
      }
      document.getElementById('successOverlay').classList.remove('hidden');
    }

    function closeSuccessModal(){
      document.getElementById('successOverlay').classList.add('hidden');
    }

    function openNoticeModal(message, title = 'Проверьте данные'){
      const overlay = document.getElementById('noticeOverlay');
      if(!overlay) return;
      const titleEl = document.getElementById('noticeTitle');
      const messageEl = document.getElementById('noticeMessage');
      if(titleEl) titleEl.textContent = title;
      if(messageEl) messageEl.textContent = message || '';
      overlay.classList.remove('hidden');
    }

    function closeNoticeModal(){
      document.getElementById('noticeOverlay')?.classList.add('hidden');
    }

    async function submitLeadFromScope(scope = 'drawer'){
      if(leadSubmitInProgress) return;
      syncGuidedState();
      const cfg = getLeadScopeConfig(scope);
      if(!cfg) return;
      const phoneInput = document.getElementById(cfg.phoneInputId);
      const consentInput = document.getElementById(cfg.consentId);
      const nameInput = document.getElementById('parentName');
      const name = (nameInput && nameInput.value.trim()) || 'Родитель';
      const phoneRaw = phoneInput ? phoneInput.value.trim() : '';
      const phone = normalizePhone(phoneRaw);
      const consent = !!(consentInput && consentInput.checked);

      if(!phoneRaw){
        setLeadPhoneError(scope, true);
        openNoticeModal('Введите номер телефона.');
        phoneInput?.focus();
        return;
      }

      if(!consent){
        openNoticeModal('Подтвердите согласие на обработку персональных данных.');
        consentInput?.focus();
        return;
      }

      if(!isValidPhone(phoneRaw)){
        setLeadPhoneError(scope, true);
        openNoticeModal('Проверьте номер телефона.');
        phoneInput?.focus();
        return;
      }

      setLeadPhoneError(scope, false);
      leadSubmitInProgress = true;
      setLeadSubmitState(true, scope);

      state.phone = phone;
      persist();

      const shift = shifts.find(s => s.id === state.shiftId);
      const price = state.offerPrice || state.basePrice || (shift ? shift.price : null);
      const payload = {
        name,
        phone,
        age: labelAge(state.age),
        shift_id: shift ? shift.id : '',
        shift_name: shift ? shift.dates : '',
        shift_date: shift ? shift.dates : '',
        price_final: price || null,
        price_text: price ? formatPrice(price) : '—',
        promo_code: state.code || '',
        promo_status: state.offerPrice ? (state.offerStage >= 2 ? 'improved_again' : 'fixed') : 'none',
        mode: state.previewView === 'mobile'
          ? `mobile:${state.mobileMode || 'full'}`
          : `desktop:${state.desktopMode || 'full'}`,
        sent_at_local: new Date().toLocaleString('ru-RU')
      };
      track('form_submit', {
        ...selectedShiftPayload(),
        booking_code: state.code || '',
        lead_scope: scope,
        parent_name_present: !!name,
        phone_present: !!phone
      });
      try {
        const deliveryResult = await notifyLead('booking_submitted', payload);
        state.bookingCompleted = true;
        state.offerSearching = false;
        persist();
        if(scope === 'drawer'){
          closeForm();
        } else {
          closeInlineLead(scope);
        }
        if(scope === 'offer'){
          document.getElementById('offerOverlay')?.classList.add('hidden');
        }
        renderSummary();
        renderBookingPanels();
        updateSummaryBarVisibility();
        if(!isAdminDebugSession() || !deliveryResult || deliveryResult.ok !== false){
          // Skip dedicated success popup; keep booking in final booked card state.
        }
      } finally {
        leadSubmitInProgress = false;
        setLeadSubmitState(false, scope);
      }
    }

    async function submitLead(){
      return submitLeadFromScope('drawer');
    }

    function scrollToSection(id){
      const cleanId = String(id || '').replace(/^#/, '');
      if(!cleanId) return false;
      const el = document.getElementById(cleanId);
      if(!el) return false;

      el.scrollIntoView({behavior:'smooth', block:'start'});
      return true;
    }

    function navigateToSection(id){
      const cleanId = String(id || '').replace(/^#/, '');
      if(!cleanId) return;
      const isMobilePreview = state.previewView === 'mobile';

      if(isMobilePreview && cleanId === 'section-programs' && !hasSelectedAge()){
        track('mobile_shifts_click_without_age', {
          mode: state.mobileMode || 'full'
        });
        showHint('Сначала выберите возраст ребёнка', 'age');
        focusMobileAgeGate();
        return;
      }

      if(isMobilePreview && cleanId === 'section-programs' && hasSelectedAge()){
        track('mobile_shifts_opened_after_age', {
          mode: state.mobileMode || 'full',
          age: state.age || ''
        });
      }

      const isDesktopCompact = !isMobilePreview && state.desktopMode === 'compact';
      const isMobileCompact = isMobilePreview && (
        USE_DESKTOP_BASE_FOR_MOBILE
          ? state.desktopMode === 'compact'
          : state.mobileMode === 'compact'
      );

      if(isDesktopCompact || isMobileCompact){
        if(COMPACT_MODAL_SECTIONS.has(cleanId) && openSectionModal(cleanId)){
          return;
        }
        if(!scrollToSection(cleanId) && cleanId === 'section-legal'){
          window.open('legal.html#legal-info', '_blank', 'noopener');
        }
        return;
      }

      if(!scrollToSection(cleanId) && cleanId === 'section-legal'){
        window.open('legal.html#legal-info', '_blank', 'noopener');
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
        setHeroMenuOpen(false);
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

    document.addEventListener('click', (e) => {
      if(!isHeroMenuOpen()) return;
      const withinMenu = e.target.closest('#heroMenuWrap');
      if(!withinMenu){
        setHeroMenuOpen(false);
      }
    });

    window.addEventListener('scroll', () => {
      if(isHeroMenuOpen()){
        setHeroMenuOpen(false);
      }
    }, {passive:true});

    document.addEventListener('scroll', () => {
      if(isHeroMenuOpen()){
        setHeroMenuOpen(false);
      }
    }, {capture:true, passive:true});

    bindPhoneMaskForScope('drawer');

    document.getElementById('formDrawer').addEventListener('click', (e) => {
      if(e.target.id === 'formDrawer') closeForm();
    });

    const successOverlay = document.getElementById('successOverlay');
    if(successOverlay){
      successOverlay.addEventListener('click', (e) => {
        if(e.target.id === 'successOverlay') closeSuccessModal();
      });
    }

    const noticeOverlay = document.getElementById('noticeOverlay');
    if(noticeOverlay){
      noticeOverlay.addEventListener('click', (e) => {
        if(e.target.id === 'noticeOverlay') closeNoticeModal();
      });
    }

    const offerOverlay = document.getElementById('offerOverlay');
    if(offerOverlay){
      offerOverlay.addEventListener('click', (e) => {
        if(e.target.id === 'offerOverlay'){
          offerRunId += 1;
          clearOfferTimeout();
          offerOverlay.classList.add('hidden');
          resetOfferProgressUI();
        }
      });
    }

    document.getElementById('mediaClose').addEventListener('click', closeMedia);
    document.getElementById('mediaNext').addEventListener('click', nextMedia);
    document.getElementById('mediaPrev').addEventListener('click', prevMedia);

    document.getElementById('mediaLightbox').addEventListener('click', (e) => {
      if(e.target.id === 'mediaLightbox') closeMedia();
    });

    (function bindMediaSwipe(){
      const lightbox = document.getElementById('mediaLightbox');
      const content = document.getElementById('mediaContent');
      if(!lightbox || !content) return;
      let startX = 0;
      let startY = 0;
      let moved = false;

      content.addEventListener('touchstart', (e) => {
        if(lightbox.classList.contains('hidden')) return;
        const touch = e.touches && e.touches[0];
        if(!touch) return;
        startX = touch.clientX;
        startY = touch.clientY;
        moved = false;
      }, {passive:true});

      content.addEventListener('touchmove', (e) => {
        if(lightbox.classList.contains('hidden')) return;
        const touch = e.touches && e.touches[0];
        if(!touch) return;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if(Math.abs(dx) > 6 || Math.abs(dy) > 6){
          moved = true;
        }
      }, {passive:true});

      content.addEventListener('touchend', (e) => {
        if(lightbox.classList.contains('hidden')) return;
        const touch = (e.changedTouches && e.changedTouches[0]) || null;
        if(!touch || !moved) return;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if(Math.abs(dx) < 36 || Math.abs(dx) <= Math.abs(dy)) return;
        if(dx < 0){
          nextMedia();
        } else {
          prevMedia();
        }
      }, {passive:true});
    })();

    (function bindMobileReviewSwipe(){
      let startX = 0;
      let startY = 0;
      let track = null;

      document.addEventListener('touchstart', (e) => {
        const card = e.target.closest('.mobile-review-card');
        if(!card) return;
        const touch = e.touches && e.touches[0];
        if(!touch) return;
        track = card;
        startX = touch.clientX;
        startY = touch.clientY;
      }, {passive:true});

      document.addEventListener('touchend', (e) => {
        if(!track) return;
        const touch = (e.changedTouches && e.changedTouches[0]) || null;
        track = null;
        if(!touch) return;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if(Math.abs(dx) < 36 || Math.abs(dx) <= Math.abs(dy)) return;
        const total = Math.max(0, mediaContent.reviews?.length || 0);
        if(!total) return;
        if(dx < 0){
          state.mobileReviewIndex = (Math.max(0, state.mobileReviewIndex || 0) + 1) % total;
        } else {
          state.mobileReviewIndex = (Math.max(0, state.mobileReviewIndex || 0) - 1 + total) % total;
        }
        renderCompactTrustPanelContent();
        persist();
      }, {passive:true});
    })();

    (function bindMobileEdgeTapNavigation(){
      function getVisibleElement(nodeList){
        const list = Array.from(nodeList || []);
        return list.find((node) => node && node.offsetParent !== null) || list[0] || null;
      }

      function getEdgeDirection(stageEl, clientX){
        if(!stageEl || !Number.isFinite(clientX)) return 0;
        const rect = stageEl.getBoundingClientRect();
        if(!rect || rect.width < 120) return 0;
        const leftZone = rect.left + rect.width * 0.28;
        const rightZone = rect.right - rect.width * 0.28;
        if(clientX <= leftZone) return -1;
        if(clientX >= rightZone) return 1;
        return 0;
      }

      function stepThumb(root, stripSelector, thumbSelector, direction){
        const strip = getVisibleElement(root.querySelectorAll(stripSelector));
        if(!strip) return false;
        const thumbs = Array.from(strip.querySelectorAll(thumbSelector));
        if(!thumbs.length) return false;
        const currentIndex = Math.max(0, thumbs.findIndex((thumb) => thumb.classList.contains('active')));
        const nextIndex = (currentIndex + direction + thumbs.length) % thumbs.length;
        thumbs[nextIndex]?.click();
        return true;
      }

      document.addEventListener('click', (e) => {
        const stage = e.target.closest('.mobile-photo-stage, .mobile-video-stage, .mobile-review-card, .mobile-stay-feature, .mobile-program-active-card, .mobile-journey-active');
        if(!stage) return;
        if(e.target.closest('button, a, [data-action], iframe, input, textarea, select')) return;
        const direction = getEdgeDirection(stage, e.clientX);
        if(!direction) return;

        const root = stage.closest('.section-card, .section-modal-body, #mobileView, #desktopView') || document;

        if(stage.classList.contains('mobile-photo-stage')){
          if(stepThumb(root, '.mobile-photo-preview-strip', '.mobile-photo-preview-thumb', direction)){
            persist();
          }
          return;
        }

        if(stage.classList.contains('mobile-video-stage')){
          if(stepThumb(root, '.mobile-video-preview-strip', '.mobile-video-preview-thumb', direction)){
            persist();
          }
          return;
        }

        if(stage.classList.contains('mobile-program-active-card')){
          if(stepThumb(root, '.mobile-program-dots', '.mobile-program-dot', direction)){
            persist();
          }
          return;
        }

        if(stage.classList.contains('mobile-stay-feature')){
          if(stepThumb(root, '.mobile-stay-preview-strip', '.mobile-stay-preview-thumb', direction)){
            persist();
          }
          return;
        }

        if(stage.classList.contains('mobile-journey-active')){
          const total = 4;
          const current = Math.max(0, Number(state.mobileJourneyStep || 0));
          state.mobileJourneyStep = (current + (direction > 0 ? 1 : -1) + total) % total;
          renderCompactTrustPanelContent();
          persist();
          return;
        }

        if(stage.classList.contains('mobile-review-card')){
          const total = Math.max(0, mediaContent.reviews?.length || 0);
          if(!total) return;
          if(direction > 0){
            state.mobileReviewIndex = (Math.max(0, state.mobileReviewIndex || 0) + 1) % total;
          }else{
            state.mobileReviewIndex = (Math.max(0, state.mobileReviewIndex || 0) - 1 + total) % total;
          }
          renderCompactTrustPanelContent();
          persist();
        }
      });
    })();

    (function bindMobileProgramSwipe(){
      let startX = 0;
      let startY = 0;
      let activeCard = null;

      function stepProgramBySwipe(card, direction){
        if(!card || !direction) return;
        const root = card.closest('.section-card, .section-modal-body, #mobileView, #desktopView') || document;
        const dots = Array.from(root.querySelectorAll('.mobile-program-dots .mobile-program-dot'));
        if(!dots.length) return;
        const current = Math.max(0, dots.findIndex((dot) => dot.classList.contains('active')));
        const next = (current + direction + dots.length) % dots.length;
        dots[next]?.click();
        persist();
      }

      document.addEventListener('touchstart', (e) => {
        const card = e.target.closest('.mobile-program-active-card');
        if(!card) return;
        const touch = e.touches && e.touches[0];
        if(!touch) return;
        activeCard = card;
        startX = touch.clientX;
        startY = touch.clientY;
      }, {passive:true});

      document.addEventListener('touchend', (e) => {
        if(!activeCard) return;
        const card = activeCard;
        const touch = e.changedTouches && e.changedTouches[0];
        if(!touch){
          activeCard = null;
          return;
        }
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        activeCard = null;
        if(Math.abs(dx) < 38 || Math.abs(dx) <= Math.abs(dy)) return;
        stepProgramBySwipe(card, dx < 0 ? 1 : -1);
      }, {passive:true});
    })();

    (function bindMobileJourneySwipe(){
      let startX = 0;
      let startY = 0;
      let activeCard = null;

      document.addEventListener('touchstart', (e) => {
        const card = e.target.closest('.mobile-journey-active');
        if(!card) return;
        const touch = e.touches && e.touches[0];
        if(!touch) return;
        activeCard = card;
        startX = touch.clientX;
        startY = touch.clientY;
      }, {passive:true});

      document.addEventListener('touchend', (e) => {
        if(!activeCard) return;
        const touch = e.changedTouches && e.changedTouches[0];
        activeCard = null;
        if(!touch) return;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if(Math.abs(dx) < 32 || Math.abs(dx) <= Math.abs(dy)) return;
        const total = 4;
        const current = Math.max(0, Number(state.mobileJourneyStep || 0));
        state.mobileJourneyStep = (current + (dx < 0 ? 1 : -1) + total) % total;
        renderCompactTrustPanelContent();
        persist();
      }, {passive:true});
    })();

    const videoModal = document.getElementById('videoModal');
    if(videoModal){
      videoModal.addEventListener('click', (e) => {
        if(e.target.id === 'videoModal') closeVideo();
      });
    }

    const calendarModal = document.getElementById('calendarModal');
    if(calendarModal){
      calendarModal.addEventListener('click', (e) => {
        if(e.target.id === 'calendarModal') closeCalendar();
      });
    }

    const sectionModal = document.getElementById('sectionModal');
    if(sectionModal){
      sectionModal.addEventListener('click', (e) => {
        if(e.target.id === 'sectionModal') closeSectionModal();
      });
      const sectionModalBody = document.getElementById('sectionModalBody');
      let sectionModalTouchY = 0;
      sectionModal.addEventListener('wheel', (e) => {
        if(sectionModal.classList.contains('hidden')) return;
        const scroller = e.target.closest('.section-modal-body') || sectionModalBody;
        if(!scroller || !sectionModal.contains(scroller)) return;
        if(scroller.scrollHeight <= scroller.clientHeight + 1) return;
        e.preventDefault();
        scroller.scrollTop += e.deltaY;
      }, {passive:false});
      sectionModal.addEventListener('touchstart', (e) => {
        if(sectionModal.classList.contains('hidden')) return;
        const touch = e.touches && e.touches[0];
        if(!touch) return;
        sectionModalTouchY = touch.clientY;
      }, {passive:true});
      sectionModal.addEventListener('touchmove', (e) => {
        if(sectionModal.classList.contains('hidden')) return;
        const scroller = e.target.closest('.section-modal-body') || sectionModalBody;
        if(!scroller || !sectionModal.contains(scroller)) return;
        if(scroller.scrollHeight <= scroller.clientHeight + 1) return;
        const touch = e.touches && e.touches[0];
        if(!touch) return;
        const deltaY = sectionModalTouchY - touch.clientY;
        sectionModalTouchY = touch.clientY;
        if(Math.abs(deltaY) < 0.5) return;
        e.preventDefault();
        scroller.scrollTop += deltaY;
      }, {passive:false});
    }

    document.addEventListener('visibilitychange', () => {
      try{
        // FastTrack toggle: temporarily disable welcome-back popup on return.
        const ENABLE_WELCOME_BACK_POPUP = false;
        if(!ENABLE_WELCOME_BACK_POPUP) return;
        const hiddenKey = 'aidacamp_hidden_once';
        const shownKey = 'aidacamp_welcome_back_shown';
        if(document.hidden){
          sessionStorage.setItem(hiddenKey, '1');
          return;
        }
        if(
          sessionStorage.getItem(hiddenKey) === '1' &&
          sessionStorage.getItem(shownKey) !== '1'
        ){
          openNoticeModal('А мы уже заждались. Рады, что вернулись.', 'С возвращением');
          sessionStorage.setItem(shownKey, '1');
        }
      }catch(e){
      }
    });

    document.addEventListener('keydown', (e) => {
      if(document.getElementById('mediaLightbox').classList.contains('hidden')) return;
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
        const autoView = getViewportPreviewView();
        if(autoView !== state.previewView){
          switchView(autoView);
          return;
        }
        initHero();
        applyCompactSectionModalLayout();
        updateSummaryBarVisibility();
      }, 160);
    }, {passive:true});

    initHero();
    loadVideoMetaCache();

    renderShiftOptions('desktop-shift-options');
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      renderShiftOptions('mobileShiftOptions');
    }
    renderShiftCards();
    renderMediaSections();
    renderSummary();
    renderBookingPanels();
    resetOfferProgressUI();
    applyDebugUiState();
    track('page_view', {
      view: state.view || 'desktop',
      desktop_mode: state.desktopMode || '',
      mobile_mode: state.mobileMode || ''
    });
    initScrollTracking();
    initSummaryBarViewportSync();
    initSectionViewTracking();
    switchView(getViewportPreviewView());
    applyHeroContrastMode();
    applyHeroMicroMode();
    applyOfferModalTheme();
    applyOfferLayoutMode();
    applyDesktopMode();
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      applyMobileMode();
    }
    normalizeCloseIconButtons();
    refreshVideoMeta({force:true});
    scheduleVideoMetaRefresh();
    scheduleDesktopAgeTapHint();
    runQualityPipelineAll();

    if(state.expiresAt && Date.now() < state.expiresAt){
      startTimer();
    }
