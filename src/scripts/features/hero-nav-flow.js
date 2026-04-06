(function registerHeroNavFlow(windowObj){
  'use strict';

  if(!windowObj) return;
  windowObj.AC_FEATURES = windowObj.AC_FEATURES || {};
  windowObj.AC_FEATURES.heroNavFlow = windowObj.AC_FEATURES.heroNavFlow || {};

  function asArray(value){
    if(Array.isArray(value)) return value;
    if(!value) return [];
    try {
      return Array.from(value);
    } catch (_err) {
      return [];
    }
  }

  function create(context){
    var ctx = context || {};
    var doc = windowObj.document;
    if(!doc) return null;

    function getAllMenus(){
      var menus = asArray(doc.querySelectorAll('.hero-menu[id]'));
      return menus.filter(function(menu){
        return menu && menu.id;
      });
    }

    function getMenuForTrigger(trigger){
      if(!trigger || typeof trigger.getAttribute !== 'function'){
        return null;
      }
      var controlsId = String(trigger.getAttribute('aria-controls') || '').trim();
      if(!controlsId){
        return null;
      }
      return doc.getElementById(controlsId);
    }

    function getMenuNodes(trigger){
      var menus = getAllMenus();
      var menuFromTrigger = getMenuForTrigger(trigger);
      return {
        menu: menuFromTrigger || menus[0] || null,
        menus: menus,
        toggleButtons: asArray(doc.querySelectorAll('[data-action="toggle-hero-menu"]'))
      };
    }

    function getPhoneTriggerButtons(){
      return asArray(doc.querySelectorAll('[data-action="toggle-hero-phone-dropdown"]'));
    }

    function getAllPhoneDropdowns(){
      return asArray(doc.querySelectorAll('.hero-phone-dropdown'));
    }

    function getPhoneDropdownForTrigger(trigger){
      if(!trigger) return null;
      var explicit = trigger.getAttribute('aria-controls');
      if(explicit){
        var byId = doc.getElementById(explicit);
        if(byId) return byId;
      }

      var host = trigger.closest('.hero-topbar, [data-role="hero-topbar"], [data-role="hero-topbar-mobile"]');
      if(host){
        var byHost = host.querySelector('.hero-phone-dropdown');
        if(byHost) return byHost;
      }

      var wrap = trigger.closest('[data-role="hero-phone-wrap"]');
      if(wrap){
        var byWrap = wrap.querySelector('.hero-phone-dropdown');
        if(byWrap) return byWrap;
      }

      return doc.querySelector('.hero-phone-dropdown');
    }

    function getPhoneNodes(trigger){
      return {
        dropdown: getPhoneDropdownForTrigger(trigger),
        allDropdowns: getAllPhoneDropdowns(),
        triggerButtons: getPhoneTriggerButtons()
      };
    }

    function isMenuVisible(menu){
      return !!(menu && menu.classList.contains('is-open') && !menu.hasAttribute('hidden'));
    }

    function isDropdownVisible(dropdown){
      return !!(dropdown && dropdown.classList.contains('is-open') && !dropdown.hasAttribute('hidden'));
    }

    function setHeroMenuOpen(isOpen, trigger){
      var nodes = getMenuNodes(trigger);
      var menu = nodes.menu;
      var shouldOpen = !!isOpen;
      if(!menu && !nodes.menus.length) return false;
      var root = doc.documentElement;
      var body = doc.body;
      var heroShell = menu && menu.closest ? menu.closest('.hero-shell') : null;

      nodes.menus.forEach(function(node){
        var isTarget = node === menu;
        var openNode = shouldOpen && isTarget;
        node.classList.toggle('is-open', openNode);
        if(openNode){
          node.removeAttribute('hidden');
        } else {
          node.setAttribute('hidden', '');
        }
      });
      if(root){
        root.classList.toggle('hero-menu-open', shouldOpen);
      }
      if(body){
        body.classList.toggle('hero-menu-open', shouldOpen);
      }
      nodes.toggleButtons.forEach(function(btn){
        var controlled = getMenuForTrigger(btn);
        var isExpanded = shouldOpen && controlled === menu;
        btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      });
      if(heroShell && typeof heroShell.scrollTo === 'function'){
        heroShell.scrollTo({ left: 0, top: 0, behavior: 'auto' });
      } else if(heroShell){
        heroShell.scrollLeft = 0;
      }
      return shouldOpen;
    }

    function isHeroMenuOpen(trigger){
      var menu = getMenuForTrigger(trigger);
      if(menu){
        return isMenuVisible(menu);
      }
      return getAllMenus().some(function(menuNode){
        return isMenuVisible(menuNode);
      });
    }

    function isHeroAnyMenuOpen(){
      return getAllMenus().some(function(menu){
        return isMenuVisible(menu);
      });
    }

    function setHeroPhoneDropdownOpen(isOpen, trigger){
      var nodes = getPhoneNodes(trigger);
      var dropdown = nodes.dropdown;
      var shouldOpen = !!isOpen;
      if(trigger && !dropdown) return false;
      if(!trigger && !nodes.allDropdowns.length) return false;

      if(trigger && shouldOpen){
        nodes.allDropdowns.forEach(function(other){
          if(other === dropdown){
            return;
          }
          other.classList.remove('is-open');
          other.setAttribute('hidden', '');
        });
      }

      if(trigger){
        dropdown.classList.toggle('is-open', shouldOpen);
        if(shouldOpen){
          dropdown.removeAttribute('hidden');
        } else {
          dropdown.setAttribute('hidden', '');
        }
      } else {
        nodes.allDropdowns.forEach(function(node){
          node.classList.toggle('is-open', shouldOpen);
          if(shouldOpen){
            node.removeAttribute('hidden');
          } else {
            node.setAttribute('hidden', '');
          }
        });
      }

      nodes.triggerButtons.forEach(function(btn){
        var current = getPhoneDropdownForTrigger(btn);
        var isTarget = btn === trigger || current === dropdown;
        btn.setAttribute('aria-expanded', (shouldOpen && isTarget) ? 'true' : 'false');
      });
      if(trigger && typeof trigger.setAttribute === 'function'){
        trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      }
      return shouldOpen;
    }

    function isHeroPhoneDropdownOpen(trigger){
      if(!trigger){
        return getAllPhoneDropdowns().some(function(node){
          return isDropdownVisible(node);
        });
      }
      var dropdown = getPhoneDropdownForTrigger(trigger);
      return isDropdownVisible(dropdown);
    }

    function getActiveMediaList(){
      var mediaType = typeof ctx.getMediaType === 'function' ? ctx.getMediaType() : 'photo';
      var mediaContent = (typeof ctx.getMediaContent === 'function' && ctx.getMediaContent()) || {};
      if(mediaType === 'video') return asArray(mediaContent.videos);
      if(mediaType === 'review') return asArray(mediaContent.reviews);
      if(typeof ctx.getActivePhotoList === 'function'){
        return asArray(ctx.getActivePhotoList());
      }
      return asArray(mediaContent.photos);
    }

    function renderCurrentMedia(){
      if(typeof ctx.renderMediaViewer !== 'function') return null;
      var list = getActiveMediaList();
      if(!list.length) return null;
      var currentIndex = (typeof ctx.getMediaIndex === 'function' && Number(ctx.getMediaIndex())) || 0;
      var index = ((currentIndex % list.length) + list.length) % list.length;
      if(typeof ctx.setMediaIndex === 'function'){
        ctx.setMediaIndex(index);
      }
      return ctx.renderMediaViewer(index);
    }

    function nextMedia(){
      var list = getActiveMediaList();
      if(!list.length) return null;
      var currentIndex = (typeof ctx.getMediaIndex === 'function' && Number(ctx.getMediaIndex())) || 0;
      if(typeof ctx.setMediaIndex === 'function'){
        ctx.setMediaIndex((currentIndex + 1) % list.length);
      }
      return renderCurrentMedia();
    }

    function prevMedia(){
      var list = getActiveMediaList();
      if(!list.length) return null;
      var currentIndex = (typeof ctx.getMediaIndex === 'function' && Number(ctx.getMediaIndex())) || 0;
      if(typeof ctx.setMediaIndex === 'function'){
        ctx.setMediaIndex((currentIndex - 1 + list.length) % list.length);
      }
      return renderCurrentMedia();
    }

    function getPhotoTagsByFilter(filter){
      var mediaContent = (typeof ctx.getMediaContent === 'function' && ctx.getMediaContent()) || {};
      var photos = asArray(mediaContent.photos);
      var requested = String(filter || '');
      var filtered = requested ? photos.filter(function(photo){
        var tags = asArray(photo && photo.tags);
        return tags.includes(requested);
      }) : photos;
      var tagSet = new Set();
      filtered.forEach(function(photo){
        asArray(photo && photo.tags).forEach(function(tag){
          if(tag) tagSet.add(String(tag));
        });
      });
      var result = Array.from(tagSet);
      if(!result.includes('all')) result.unshift('all');
      return result;
    }

    function getPhotosForActiveFilter(filter){
      var mediaContent = (typeof ctx.getMediaContent === 'function' && ctx.getMediaContent()) || {};
      var photos = asArray(mediaContent.photos);
      var requested = String(filter || '');
      if(!requested || requested === 'all') return photos;
      return photos.filter(function(photo){
        return asArray(photo && photo.tags).includes(requested);
      });
    }

    function openSectionModal(sectionId){
      if(typeof ctx.openSectionModalBase === 'function'){
        return !!ctx.openSectionModalBase(sectionId);
      }
      return false;
    }

    function scrollVideoCarousel(direction, scopeRoot){
      var root = (scopeRoot && scopeRoot.nodeType === 1 && scopeRoot) || doc;
      var track = root.querySelector('#videoList, #videoCarousel, [data-role="video-carousel-track"]');
      if(!track || typeof track.scrollBy !== 'function') return;
      scrollCarouselLoop(track, direction, 320);
    }

    function scrollTeamCarousel(direction, scopeRoot){
      var root = (scopeRoot && scopeRoot.nodeType === 1 && scopeRoot) || doc;
      var track = root.querySelector('#teamCarousel, [data-role="team-carousel-track"]');
      if(!track || typeof track.scrollBy !== 'function') return;
      scrollCarouselLoop(track, direction, 320);
    }

    function scrollCarouselLoop(track, direction, step){
      var dir = (Number(direction) || 1) > 0 ? 1 : -1;
      var stepSize = Math.max(1, Number(step) || 320);
      var delta = stepSize * dir;
      var maxLeft = Math.max(0, (Number(track.scrollWidth) || 0) - (Number(track.clientWidth) || 0));
      if(maxLeft <= 1){
        return;
      }
      var current = Number(track.scrollLeft) || 0;
      var edge = 4;
      var nextLeft = current + delta;
      if(dir > 0 && (current >= (maxLeft - edge) || nextLeft >= (maxLeft - edge))){
        track.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      if(dir < 0 && (current <= edge || nextLeft <= edge)){
        track.scrollTo({ left: maxLeft, behavior: 'smooth' });
        return;
      }
      track.scrollBy({ left: delta, behavior: 'smooth' });
    }

    return Object.freeze({
      setHeroMenuOpen: setHeroMenuOpen,
      isHeroMenuOpen: isHeroMenuOpen,
      isHeroAnyMenuOpen: isHeroAnyMenuOpen,
      setHeroPhoneDropdownOpen: setHeroPhoneDropdownOpen,
      isHeroPhoneDropdownOpen: isHeroPhoneDropdownOpen,
      getActiveMediaList: getActiveMediaList,
      nextMedia: nextMedia,
      prevMedia: prevMedia,
      getPhotoTagsByFilter: getPhotoTagsByFilter,
      getPhotosForActiveFilter: getPhotosForActiveFilter,
      openSectionModal: openSectionModal,
      scrollVideoCarousel: scrollVideoCarousel,
      scrollTeamCarousel: scrollTeamCarousel
    });
  }

  windowObj.AC_FEATURES.heroNavFlow.create = create;
})(window);
