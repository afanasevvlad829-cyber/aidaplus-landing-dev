(function registerHeroSimpleBookingFlow(windowObj){
  'use strict';

  if(!windowObj || !windowObj.document) return;

  var STORAGE_KEY = 'aidacamp_hero_simple_lead_v1';
  var doc = windowObj.document;

  function loadState(){
    try {
      var raw = windowObj.localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if(!parsed || typeof parsed !== 'object') return { age:'', phone:'', consent:false };
      return {
        age: typeof parsed.age === 'string' ? parsed.age : '',
        phone: typeof parsed.phone === 'string' ? parsed.phone : '',
        consent: !!parsed.consent
      };
    } catch(_err){
      return { age:'', phone:'', consent:false };
    }
  }

  function saveState(state){
    try {
      windowObj.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch(_err){
      // noop
    }
  }

  function digitsOnly(value){
    return String(value || '').replace(/\D+/g, '');
  }

  function normalizePhone(value){
    var digits = digitsOnly(value);
    if(digits.charAt(0) === '8') digits = '7' + digits.slice(1);
    if(digits.charAt(0) !== '7') digits = '7' + digits;
    return digits.slice(0, 11);
  }

  function formatPhone(value){
    var d = normalizePhone(value);
    var p1 = d.slice(1,4);
    var p2 = d.slice(4,7);
    var p3 = d.slice(7,9);
    var p4 = d.slice(9,11);
    var out = '+7';
    if(p1) out += ' (' + p1;
    if(p1 && p1.length === 3) out += ')';
    if(p2) out += ' ' + p2;
    if(p3) out += '-' + p3;
    if(p4) out += '-' + p4;
    return out;
  }

  function isPhoneValid(value){
    return normalizePhone(value).length === 11;
  }

  function resolveAge(root){
    var active = root.querySelector('.age-tab.active[data-age], .age-tab.is-selected[data-age]');
    return active ? String(active.getAttribute('data-age') || '') : '';
  }

  function setActiveAge(root, age){
    if(!root) return;
    root.querySelectorAll('.age-tab[data-age]').forEach(function(btn){
      var currentAge = String(btn.getAttribute('data-age') || '');
      var isActive = !!age && currentAge === age;
      btn.classList.toggle('active', isActive);
      btn.classList.toggle('is-selected', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function setStatus(root, text, isError){
    var node = root.querySelector('[data-role="hero-status"]');
    if(!node) return;
    node.textContent = text || '';
    node.style.color = isError ? '#b42318' : '#4f5d73';
  }

  function syncSubmitDisabled(root, state){
    var btn = root.querySelector('[data-role="hero-submit"]');
    if(!btn) return;
    btn.disabled = false;
  }

  function bindForScope(scope){
    var card = doc.getElementById(scope === 'mobile' ? 'mobileBookingCard' : 'desktop-booking-card');
    if(!card) return;

    var form = card.querySelector('[data-role="hero-simple-form"][data-scope="' + scope + '"]');
    if(!form) return;

    var input = form.querySelector('[data-role="hero-phone-input"]');
    var consent = form.querySelector('[data-role="hero-consent"]');
    var ageTabsRoot = doc.getElementById(scope === 'mobile' ? 'mobileAgeTabs' : 'desktopAgeTabs');

    var state = loadState();

    if(input){
      input.value = state.phone ? formatPhone(state.phone) : '';
      input.addEventListener('input', function(){
        state.phone = normalizePhone(input.value);
        input.value = formatPhone(state.phone);
        saveState(state);
        syncSubmitDisabled(form, state);
      });
    }

    if(consent){
      consent.checked = !!state.consent;
      consent.addEventListener('change', function(){
        state.consent = !!consent.checked;
        saveState(state);
        syncSubmitDisabled(form, state);
      });
    }

    if(ageTabsRoot){
      ageTabsRoot.addEventListener('click', function(event){
        var btn = event.target && event.target.closest && event.target.closest('.age-tab[data-age]');
        if(!btn) return;
        state.age = String(btn.getAttribute('data-age') || '');
        setActiveAge(ageTabsRoot, state.age);
        saveState(state);
        syncSubmitDisabled(form, state);
        setStatus(form, '', false);
      });
      var resolvedAge = resolveAge(ageTabsRoot);
      if(resolvedAge) state.age = resolvedAge;
      if(state.age){
        setActiveAge(ageTabsRoot, state.age);
      }
    }

    form.addEventListener('submit', function(event){
      event.preventDefault();

      state.age = resolveAge(ageTabsRoot) || state.age;
      state.phone = input ? normalizePhone(input.value) : state.phone;
      state.consent = consent ? !!consent.checked : state.consent;

      if(!state.age){
        setStatus(form, 'Выберите возраст', true);
        return;
      }
      if(!isPhoneValid(state.phone)){
        setStatus(form, 'Введите корректный телефон', true);
        return;
      }
      if(!state.consent){
        setStatus(form, 'Нужно согласие на обработку данных', true);
        return;
      }

      saveState(state);

      var payload = {
        lead_type: 'hero_simple',
        age: state.age,
        phone: state.phone,
        consent: true,
        source: scope,
        sent_at_local: new Date().toLocaleString('ru-RU')
      };

      var track = windowObj.AC_FEATURES && windowObj.AC_FEATURES.track;
      if(typeof track === 'function'){
        track('lead_submit', payload);
      }

      var notifyLead = windowObj.AC_FEATURES && windowObj.AC_FEATURES.notifyLead;
      if(typeof notifyLead === 'function'){
        Promise.resolve(notifyLead('lead_submit', payload)).then(function(sent){
          setStatus(form, sent ? 'Заявка отправлена' : 'Заявка сохранена, менеджер свяжется', false);
        }).catch(function(){
          setStatus(form, 'Заявка сохранена, менеджер свяжется', false);
        });
      } else {
        setStatus(form, 'Заявка принята', false);
      }
    });

    syncSubmitDisabled(form, state);
  }

  function init(){
    bindForScope('desktop');
    bindForScope('mobile');
  }

  if(doc.readyState === 'loading'){
    doc.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})(window);
