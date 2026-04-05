(function registerHeroV3SimpleFlow(windowObj){
  'use strict';

  if(!windowObj) return;
  windowObj.AC_FEATURES = windowObj.AC_FEATURES || {};
  windowObj.AC_FEATURES.heroV3SimpleFlow = windowObj.AC_FEATURES.heroV3SimpleFlow || {};

  var DEFAULT_COPY = Object.freeze({
    menuToggleText: '⋯',
    heroTag: '66 км от Москвы · смены июнь–август',
    heroTitleHtml: 'AI-лагерь 7–14:<br><span class="hero-title-accent">проект за смену</span>',
    heroSub: 'Python · Minecraft · AI · Хакатон · Бассейн',
    heroSlogan: '6 лет работы · 1200+ детей · ★ 5.0 Яндекс Карты',
    bookingTitle: 'Подберём смену за 1 минуту',
    bookingLead: 'Программу и даты — за 10 минут',
    stepLabels: Object.freeze(['1. ВОЗРАСТ', '2. ВАШ ТЕЛЕФОН', '3. —', '4. —'])
  });

  function setTextIfPresent(root, selector, value){
    var node = root.querySelector(selector);
    if(node && typeof value === 'string' && value){
      node.textContent = value;
    }
  }

  function create(context){
    var ctx = context || {};
    var doc = ctx.document || windowObj.document;
    var getEnabled = ctx.getEnabled || function(){ return false; };
    var setHeroPhoneDropdownOpen = ctx.setHeroPhoneDropdownOpen || function(){};
    var copy = Object.freeze(Object.assign({}, DEFAULT_COPY, ctx.copy || {}));

    function applyMode(){
      var enabled = !!getEnabled();
      var desktopView = doc.getElementById('desktopView');
      var mobileView = doc.getElementById('mobileView');
      doc.documentElement.classList.toggle('hero-v3-simple-enabled', enabled);
      doc.body.classList.toggle('hero-v3-simple-enabled', enabled);
      if(desktopView) desktopView.classList.toggle('hero-v3-simple', enabled);
      if(mobileView) mobileView.classList.toggle('hero-v3-simple', enabled);
      if(enabled){
        var debugControls = doc.getElementById('debugControls');
        if(debugControls) debugControls.classList.add('hidden');
      }
      setHeroPhoneDropdownOpen(false);

      var menuToggleText = doc.querySelector('.hero-menu-toggle-text');
      if(menuToggleText){
        menuToggleText.textContent = enabled ? copy.menuToggleText : 'Меню';
      }
      if(!enabled){
        return;
      }

      setTextIfPresent(doc, '#desktopView .hero-tag', copy.heroTag);
      setTextIfPresent(doc, '#desktopView .hero-sub', copy.heroSub);
      setTextIfPresent(doc, '#desktopView .hero-slogan', copy.heroSlogan);
      setTextIfPresent(doc, '#desktopBookingTitle', copy.bookingTitle);
      setTextIfPresent(doc, '#desktopBookingLead', copy.bookingLead);

      var heroTitle = doc.querySelector('#desktopView .hero-title');
      if(heroTitle && copy.heroTitleHtml){
        heroTitle.innerHTML = copy.heroTitleHtml;
      }
      var labels = Array.isArray(copy.stepLabels) ? copy.stepLabels : DEFAULT_COPY.stepLabels;
      doc.querySelectorAll('#desktop-booking-card .booking-step').forEach(function(node, idx){
        if(node && labels[idx]){
          node.textContent = labels[idx];
        }
      });
    }

    return Object.freeze({
      applyMode: applyMode
    });
  }

  windowObj.AC_FEATURES.heroV3SimpleFlow.create = create;
})(window);
