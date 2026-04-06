/* src/scripts/features/media-sections-flow.js */
(function(){
  function createMediaSectionsFlow(ctx = {}){
    const getState = typeof ctx.getState === 'function' ? ctx.getState : (() => ({}));
    const getMediaContent = typeof ctx.getMediaContent === 'function' ? ctx.getMediaContent : (() => ({}));
    const photoCatLabel = typeof ctx.photoCatLabel === 'function' ? ctx.photoCatLabel : ((v) => String(v || ''));
    const contactIconMarkup = typeof ctx.contactIconMarkup === 'function' ? ctx.contactIconMarkup : (() => '•');
    const socialBadgeMark = typeof ctx.socialBadgeMark === 'function' ? ctx.socialBadgeMark : (() => '•');
    const socialDisplayName = typeof ctx.socialDisplayName === 'function' ? ctx.socialDisplayName : ((item) => String(item?.key || ''));
    const faqGlyph = typeof ctx.faqGlyph === 'function' ? ctx.faqGlyph : (() => 'FAQ');
    const bookingText = typeof ctx.bookingText === 'function' ? ctx.bookingText : (() => '');
    const setPhotoLists = typeof ctx.setPhotoLists === 'function' ? ctx.setPhotoLists : (() => {});
    const prepareStayGalleryTriggers = typeof ctx.prepareStayGalleryTriggers === 'function' ? ctx.prepareStayGalleryTriggers : (() => {});
    const renderCompactTrustPanelContent = typeof ctx.renderCompactTrustPanelContent === 'function' ? ctx.renderCompactTrustPanelContent : (() => {});

    function renderMediaSections(){
      const state = getState();
      const mediaContent = getMediaContent();
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

      if(photoGrid){
        let filteredPhotos = [];
        if(state.photoFilter === 'all') filteredPhotos = mediaContent.photos;
        else if(state.photoFilter === 'camp') filteredPhotos = mediaContent.photos.filter(item => item.cat === 'camp' || item.cat === 'all');
        else filteredPhotos = mediaContent.photos.filter(item => item.cat === state.photoFilter);
        if(state.photoFilter === 'camp'){
          const poolCandidate = mediaContent.photos.find((item) => (
            item &&
            item.cat === 'pool' &&
            String(item.src || '').includes('6a17713f')
          )) || mediaContent.photos.find((item) => item && item.cat === 'pool');
          const alreadyIncludesPool = filteredPhotos.some((item) => item && item.cat === 'pool');
          if(poolCandidate && !alreadyIncludesPool){
            const next = filteredPhotos.slice(0, 4);
            if(next.length >= 3){
              // Keep bottom row slot stable; replace upper-right slot with pool photo.
              next[2] = poolCandidate;
            } else {
              next.push(poolCandidate);
            }
            filteredPhotos = next;
          }
        }
        if(!filteredPhotos.length) filteredPhotos = mediaContent.photos.filter(item => item.cat === 'all');
        if(!filteredPhotos.length) filteredPhotos = mediaContent.photos;
        if(state.photoFilter !== 'all' && state.photoFilter !== 'camp'){
          if(state.photoFilter === 'study' && filteredPhotos.length > 4){
            const featuredRightSlot = filteredPhotos[filteredPhotos.length - 1];
            filteredPhotos = [filteredPhotos[0], filteredPhotos[1], filteredPhotos[2], featuredRightSlot];
          } else {
            filteredPhotos = filteredPhotos.slice(0, 4);
          }
        }
        setPhotoLists(filteredPhotos.slice());
        photoGrid.innerHTML = filteredPhotos.map((item, idx) => `
          <div class="photo-card ${idx === 0 ? 'hero' : ''}" data-action="open-photo" data-photo-index="${idx}">
            <img src="${item.src}" alt="${item.alt}">
            <div class="photo-title">АйДаКемп</div>
            <div class="photo-badge">${photoCatLabel(item.cat)}</div>
          </div>
        `).join('');
      }

      if(videoList){
        videoList.innerHTML = mediaContent.videos.map((item) => `
          <div class="video-card" data-video="${item.url}">
            <div class="video-poster">
              <img src="${item.cover || '/assets/video-covers/cover-week-change.jpg'}" alt="${item.title}">
              <div class="video-play"><span>▶</span></div>
            </div>
            <h4>${item.title}</h4>
          </div>
        `).join('');
      }

      if(bookLinkBtn) bookLinkBtn.href = mediaContent.references.programmingBookUrl;
      if(yandexReviewsBtn){
        yandexReviewsBtn.textContent = mediaContent.references.yandexReviewsLabel;
        yandexReviewsBtn.href = mediaContent.references.yandexReviewsUrl;
      }
      if(locationMapBtn) locationMapBtn.href = mediaContent.references.locationMapUrl;
      if(locationMapFrame) locationMapFrame.src = mediaContent.references.locationMapEmbedUrl || '';

      if(reviewsGrid){
        reviewsGrid.innerHTML = mediaContent.reviews.map(item => `
          <div class="review-real">
            <div class="review-head-real">
              <div class="review-avatar"><img src="${item.avatar}" alt="${item.name}"></div>
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

      if(contactsGrid){
        contactsGrid.innerHTML = mediaContent.contacts.map(item => `
          <a class="contact-link" href="${item.href}" target="_blank" rel="noopener noreferrer">
            <div class="contact-icon">${contactIconMarkup(item.label)}</div>
            <strong>${item.text}</strong>
          </a>
        `).join('');
      }
      if(socialsGrid){
        socialsGrid.innerHTML = mediaContent.socials.map(item => `
          <a class="social-link" href="${item.href}" target="_blank" rel="noopener noreferrer" data-network="${item.key}">
            <span class="social-badge-mark">${socialBadgeMark(item)}</span>
            <span class="social-label">${socialDisplayName(item)}</span>
          </a>
        `).join('');
      }
      if(footerSocialsList){
        footerSocialsList.innerHTML = mediaContent.socials.map(item => `
          <a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.key}</a>
        `).join('');
      }

      if(faqGroups){
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
              ${group.items.map(item => `<div class="faq-line"><strong>${item.q}</strong><span>${item.a}</span></div>`).join('')}
            </div>
          </div>
        `).join('');
        const faqEmpty = document.getElementById('faqEmptyState');
        if(faqEmpty) faqEmpty.classList.toggle('visible', filteredFaq.length === 0);
      }

      const faqFilters = document.getElementById('faqFilters');
      if(faqFilters){
        faqFilters.querySelectorAll('[data-faq-filter]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.faqFilter === state.faqFilter);
        });
      }

      if(teamGrid){
        const text = (key, fallback = '') => {
          const value = bookingText(key);
          return String(value || fallback);
        };
        const renderTeamCard = (item) => `
          <div class="team-card">
            <div class="team-avatar"><img src="${item.avatarUrl}" alt="${item.fio}"></div>
            <strong>${item.fio}</strong>
            <span class="team-role">${item.role}</span>
            <span>${item.bio}</span>
          </div>
        `;
        const byName = new Map(mediaContent.team.map(item => [item.fio, item]));
        const preferredCoreNames = [text('teamCoreLeadName'), text('teamCoreMentorName')].filter(Boolean);
        const fallbackCoreNames = mediaContent.team.slice(0, 2).map((item) => item.fio).filter(Boolean);
        const coreNames = preferredCoreNames.length ? preferredCoreNames : fallbackCoreNames;
        const coreCards = coreNames.map((name) => byName.get(name)).filter(Boolean).map(renderTeamCard).join('');
        const carouselCards = mediaContent.team.filter((item) => !coreNames.includes(item.fio)).map(renderTeamCard).join('');
        const bookCard = `
        <div class="team-card book-team-card">
          <button class="book-team-cover-wrap" type="button" data-action="open-book-photo" aria-label="${text('bookPreviewAria', 'Открыть обложку книги')}">
            <img class="book-team-cover" src="/assets/images/cdn-cache/8fc8172e_8991804334.webp" alt="${text('bookCoverAlt', 'Собственная книга по Python')}">
          </button>
          <div class="book-team-title">${text('bookTeamTitle', 'Собственная книга по Python')}</div>
          <div class="book-team-sub">${text('bookTeamSub', 'Команда не только ведёт занятия, но и создаёт собственные учебники и игровые методики, по которым дети входят в программирование через практику.')}</div>
          <div class="book-team-proof">${text('bookTeamProof', 'Для родителя книга — это более сильное доказательство экспертизы и собственной методики, чем просто ещё одна карточка преподавателя.')}</div>
          <a class="book-team-cta" href="${text('bookTeamHref', '/#')}" target="_blank" rel="noopener noreferrer">${text('bookTeamWatchCta', 'Смотреть книгу')}</a>
        </div>`;
        teamGrid.innerHTML = `
          <div class="team-layout">
            ${bookCard}
            <div class="team-right">
              <div class="team-core-grid">${coreCards}</div>
              <div class="team-carousel-shell">
                <button class="team-carousel-nav prev" type="button" data-action="team-carousel-prev" aria-label="${text('teamPrevAria', 'Предыдущий преподаватель')}"><img class="ac-icon" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>
                <div class="team-carousel" id="teamCarousel">${carouselCards}</div>
                <button class="team-carousel-nav next" type="button" data-action="team-carousel-next" aria-label="${text('teamNextAria', 'Следующий преподаватель')}"><img class="ac-icon" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>
              </div>
            </div>
          </div>
        `;
      }

      const photoFilters = document.getElementById('photoFilters');
      if(photoFilters){
        photoFilters.querySelectorAll('[data-photo-filter]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.photoFilter === state.photoFilter);
        });
      }

      prepareStayGalleryTriggers();
      renderCompactTrustPanelContent();
    }

    return Object.freeze({ renderMediaSections });
  }

  window.AC_FEATURES = window.AC_FEATURES || {};
  window.AC_FEATURES.mediaSectionsFlow = Object.freeze({ create: createMediaSectionsFlow });
})();
