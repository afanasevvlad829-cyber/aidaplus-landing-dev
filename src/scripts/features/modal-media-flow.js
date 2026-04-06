/* src/scripts/features/modal-media-flow.js */
(function(){
  function createModalMediaFlow(ctx = {}){
    const getState = typeof ctx.getState === 'function' ? ctx.getState : (() => ({}));
    const getMediaContent = typeof ctx.getMediaContent === 'function' ? ctx.getMediaContent : (() => ({}));
    const getActivePhotoList = typeof ctx.getActivePhotoList === 'function' ? ctx.getActivePhotoList : (() => []);
    const setMediaContext = typeof ctx.setMediaContext === 'function' ? ctx.setMediaContext : (() => {});
    const getMediaContext = typeof ctx.getMediaContext === 'function' ? ctx.getMediaContext : (() => ({mediaType: 'photo', mediaIndex: 0}));
    const track = typeof ctx.track === 'function' ? ctx.track : (() => {});
    const photoCatLabel = typeof ctx.photoCatLabel === 'function' ? ctx.photoCatLabel : ((v) => String(v || ''));
    const resolveVideoSource = typeof ctx.resolveVideoSource === 'function' ? ctx.resolveVideoSource : (() => ({
      canEmbed: false,
      embedUrl: '',
      externalUrl: '',
      sourceName: 'источнике'
    }));

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

    function renderMediaViewer(){
      const { mediaType, mediaIndex } = getMediaContext();
      const content = document.getElementById('mediaContent');
      const caption = document.getElementById('mediaCaption');
      const mediaContent = getMediaContent();

      if(!content || !caption) return;

      if(mediaType === 'photo'){
        const sourceList = getActivePhotoList();
        const source = sourceList.length ? sourceList : (Array.isArray(mediaContent.photos) ? mediaContent.photos : []);
        const item = source[mediaIndex];
        if(!item) return;
        content.innerHTML = `<img class="media-image" src="${item.src}" />`;
        caption.textContent = `${photoCatLabel(item.cat)} · ${mediaIndex + 1}/${source.length}`;
      }

      if(mediaType === 'video'){
        const videos = Array.isArray(mediaContent.videos) ? mediaContent.videos : [];
        const item = videos[mediaIndex];
        if(!item || !item.url) return;
        const source = resolveVideoSource(item.url);
        if(!source.canEmbed){
          content.innerHTML = `
            <div class="video-fallback">
              <strong>Видео доступно во внешнем источнике</strong>
              <p>Откройте ролик в отдельной вкладке, если встраивание недоступно.</p>
              <a class="inline-link-btn primary" href="${source.externalUrl}" target="_blank" rel="noopener noreferrer">Смотреть на ${source.sourceName}</a>
            </div>
          `;
          caption.textContent = `${mediaIndex + 1}/${videos.length}`;
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
        caption.textContent = `${mediaIndex + 1}/${videos.length}`;
      }
    }

    function openMedia(type, index){
      closeTransientModals('media', {keepSection: true});
      setMediaContext({ mediaType: type, mediaIndex: index });
      const mediaContent = getMediaContent();
      if(type === 'photo'){
        const sourceList = getActivePhotoList();
        const source = sourceList.length ? sourceList : (Array.isArray(mediaContent.photos) ? mediaContent.photos : []);
        const item = source[index];
        track('photo_open', {
          category: item?.cat || '',
          index: index + 1
        });
      }
      if(type === 'video'){
        const videos = Array.isArray(mediaContent.videos) ? mediaContent.videos : [];
        const item = videos[index];
        track('video_open', {
          title: item?.title || '',
          index: index + 1
        });
      }
      renderMediaViewer();
      document.getElementById('mediaLightbox')?.classList.remove('hidden');
    }

    function closeMedia(){
      document.getElementById('mediaLightbox')?.classList.add('hidden');
      const content = document.getElementById('mediaContent');
      if(content) content.innerHTML = '';
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

    function closeSectionModal(){
      const modal = document.getElementById('sectionModal');
      if(!modal) return;
      const card = modal.querySelector('.section-modal-card');
      modal.classList.add('hidden');
      modal.classList.remove('section-modal-compact');
      modal.classList.remove('section-modal-mobile');
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      if(card){
        card.style.left = '';
        card.style.top = '';
        card.style.right = '';
        card.style.width = '';
        card.style.height = '';
      }
    }

    function applyCompactSectionModalLayout(){
      const modal = document.getElementById('sectionModal');
      const hero = document.getElementById('hero') || document.querySelector('#desktopView .hero-shell');
      const booking = document.getElementById('desktop-booking-card');
      const topbar = hero?.querySelector('.hero-topbar');
      const card = modal?.querySelector('.section-modal-card');
      if(!modal || !hero || !card || !modal.classList.contains('section-modal-compact')) return;
      const isNarrowViewport = window.innerWidth <= 900;
      if(isNarrowViewport){
        modal.style.removeProperty('--section-modal-compact-runtime-left');
        modal.style.removeProperty('--section-modal-compact-runtime-top');
        modal.style.removeProperty('--section-modal-compact-runtime-right');
        modal.style.removeProperty('--section-modal-compact-runtime-width');
        modal.style.removeProperty('--section-modal-compact-runtime-height');
        card.style.left = '';
        card.style.top = '';
        card.style.right = '';
        card.style.width = '';
        card.style.height = '';
        return;
      }

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
      const state = getState();
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
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      applyCompactSectionModalLayout();
      return true;
    }

    return Object.freeze({
      openMedia,
      closeMedia,
      closeTransientModals,
      openVideo,
      closeVideo,
      renderMediaViewer,
      closeSectionModal,
      applyCompactSectionModalLayout,
      openSectionModal
    });
  }

  window.AC_FEATURES = window.AC_FEATURES || {};
  window.AC_FEATURES.modalMediaFlow = Object.freeze({ create: createModalMediaFlow });
})();
