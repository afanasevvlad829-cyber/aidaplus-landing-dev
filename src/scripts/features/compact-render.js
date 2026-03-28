(function () {
  "use strict";

  window.AC_FEATURES = window.AC_FEATURES || {};

  function renderAboutFeaturesHtml() {
    return (
      '<article class="mobile-about-feature-item"><small>Проекты</small><strong>AI и программирование</strong><p>Scratch, Python, Minecraft и нейросети через реальные командные задачи.</p></article>' +
      '<article class="mobile-about-feature-item"><small>Среда</small><strong>Бассейн и живая лагерная среда</strong><p>Каждый день спорт, коммуникация и режим без бессмысленного скроллинга.</p></article>' +
      '<article class="mobile-about-feature-item"><small>Результат</small><strong>Итог за смену</strong><p>Ребёнок уезжает с проектом, опытом защиты и более уверенной самостоятельностью.</p></article>'
    );
  }

  function getJourneySteps() {
    return [
      {
        title: "Быстрое включение",
        text: "В первый день дети знакомятся, собираются в команды и быстро входят в игровой формат смены."
      },
      {
        title: "Практика вместо теории",
        text: "Scratch, Python, Minecraft, AI и мини-проекты — без пересказа, с реальной работой руками."
      },
      {
        title: "Живая среда",
        text: "Бассейн, спорт и внутренняя экономика лагеря формируют дисциплину, ритм и командность."
      },
      {
        title: "Финальный результат",
        text: "К концу смены у ребёнка есть понятный проект, защита и видимый рост по навыкам."
      }
    ];
  }

  function renderJourneyHtml(currentStep) {
    var steps = getJourneySteps();
    var safeStep = Math.max(0, Math.min(Number(currentStep || 0), steps.length - 1));
    var activeStep = steps[safeStep];
    var html =
      '<article class="mobile-journey-active">' +
      '<div class="mobile-journey-active-heading">' +
      '<div class="mobile-journey-active-index">' + (safeStep + 1) + "</div>" +
      "<strong>" + activeStep.title + "</strong>" +
      "</div>" +
      "<p>" + activeStep.text + "</p>" +
      "</article>" +
      '<div class="mobile-journey-switcher">' +
      steps.map(function (step, idx) {
        return (
          '<button type="button" class="mobile-journey-switch ' + (idx === safeStep ? "active" : "") + '" data-action="mobile-journey-step" data-step-index="' + idx + '">' +
          "<span>" + (idx + 1) + "</span>" + step.title +
          "</button>"
        );
      }).join("") +
      "</div>";

    return { safeStep: safeStep, html: html };
  }

  function buildProgramsHtml(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var items = Array.isArray(safeInput.items) ? safeInput.items : [];
    if (!items.length) return { activeShiftId: "", html: "" };

    var requestedId = String(safeInput.activeShiftId || "");
    var hasRequested = items.some(function (item) { return item.id === requestedId; });
    var activeShiftId = hasRequested ? requestedId : items[0].id;
    var activeShift = items.find(function (item) { return item.id === activeShiftId; }) || items[0];

    var html =
      '<div class="mobile-program-selector">' +
      items.map(function (shift) {
        return (
          '<button type="button" class="mobile-program-chip ' + (shift.id === activeShift.id ? "active" : "") + '" data-action="mobile-program-select" data-shift-id="' + shift.id + '">' +
          shift.title +
          "</button>"
        );
      }).join("") +
      "</div>" +
      '<article class="mobile-program-active-card">' +
      "<strong>" + activeShift.title + " · " + activeShift.dates + "</strong>" +
      '<div class="mobile-program-price">' + activeShift.priceText + "</div>" +
      '<div class="mobile-program-meta"><span>' + activeShift.daysText + "</span><span>Осталось " + activeShift.left + " мест</span></div>" +
      "<p>" + activeShift.desc + "</p>" +
      '<button class="shift-calendar-btn" type="button" data-action="open-calendar" data-shift-id="' + activeShift.id + '" aria-label="Календарь ' + activeShift.title + '">' +
      '<span aria-hidden="true">📅</span><span>Календарь</span></button>' +
      "</article>";

    return { activeShiftId: activeShiftId, html: html };
  }

  function renderDocsRequisitesHtml() {
    return (
      '<article class="mobile-docs-card">' +
      "<strong>ООО «ВОИП КОННЕКТ»</strong>" +
      "<div>ИНН 7729713637</div>" +
      "<div>РТО 025773</div>" +
      '<div><a href="legal.html#education-license" target="_blank" rel="noopener noreferrer">Образовательная лицензия Л035-01298-77/01082973</a></div>' +
      '<div><a href="mailto:hello@codims.ru">hello@codims.ru</a></div>' +
      "</article>"
    );
  }

  function renderDocsAccordionHtml(expanded) {
    return (
      '<article class="mobile-docs-accordion-item ' + (expanded ? "open" : "") + '">' +
      '<button type="button" class="mobile-docs-toggle" data-action="mobile-docs-toggle">' +
      "<span>Все документы и юридическая информация</span>" +
      '<img class="ac-icon" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
      '<div class="mobile-docs-links">' +
      '<a href="https://www.codims.ru/privacy" target="_blank" rel="noopener noreferrer">Политика обработки персональных данных</a>' +
      '<a href="legal.html#legal-info" target="_blank" rel="noopener noreferrer">Юридическая информация</a>' +
      '<a href="legal.html#org-info" target="_blank" rel="noopener noreferrer">Сведения об организации</a>' +
      '<a href="legal.html#children-rest" target="_blank" rel="noopener noreferrer">Отдых и оздоровление детей</a>' +
      '<a href="legal.html#partners-info" target="_blank" rel="noopener noreferrer">Условия для партнёров</a>' +
      '<a href="legal.html#bloggers-info" target="_blank" rel="noopener noreferrer">Сотрудничество с блогерами</a>' +
      "</div></article>"
    );
  }

  function buildMobilePhotoGalleryHtml(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var list = Array.isArray(safeInput.list) ? safeInput.list : [];
    var requestedIndex = Number(safeInput.activeIndex || 0);
    var safeIndex = Math.min(Math.max(requestedIndex, 0), Math.max(list.length - 1, 0));
    var active = list[safeIndex];
    if (!active) return { safeIndex: safeIndex, html: "" };

    var html =
      '<div class="mobile-media-stage"><button type="button" data-action="open-photo" data-photo-index="' + safeIndex + '">' +
      '<img src="' + active.src + '" alt="' + (active.alt || "Фото лагеря") + '">' +
      '<div class="mobile-media-overlay"><strong>' + String(active.alt || "Атмосфера лагеря").replace(/^all$/i, "Атмосфера") + "</strong><span>Тапните, чтобы открыть фото</span></div>" +
      "</button></div>" +
      '<div class="mobile-media-strip">' +
      list.map(function (item, idx) {
        return (
          '<button class="mobile-media-thumb ' + (idx === safeIndex ? "active" : "") + '" type="button" data-action="mobile-photo-select" data-photo-index="' + idx + '">' +
          '<img src="' + item.src + '" alt="' + (item.alt || "Фото") + '">' +
          "</button>"
        );
      }).join("") +
      "</div>";

    return { safeIndex: safeIndex, html: html };
  }

  function buildMobileVideoGalleryHtml(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var list = Array.isArray(safeInput.list) ? safeInput.list : [];
    var requestedIndex = Number(safeInput.activeIndex || 0);
    var safeIndex = Math.min(Math.max(requestedIndex, 0), Math.max(list.length - 1, 0));
    var active = list[safeIndex];
    if (!active) return { safeIndex: safeIndex, html: "" };

    var html =
      '<div class="mobile-media-stage"><button type="button" data-action="open-video" data-video="' + active.url + '">' +
      '<img src="' + active.cover + '" alt="' + active.title + '">' +
      '<span class="mobile-media-play"><img class="ac-icon" src="/assets/icons/play.svg" alt="" aria-hidden="true"></span>' +
      '<div class="mobile-media-overlay"><strong>' + active.title + "</strong><span>Смотреть видео</span></div>" +
      "</button></div>" +
      '<div class="mobile-media-strip">' +
      list.map(function (item, idx) {
        return (
          '<button class="mobile-media-thumb ' + (idx === safeIndex ? "active" : "") + '" type="button" data-action="mobile-video-select" data-video-index="' + idx + '">' +
          '<img src="' + item.cover + '" alt="' + item.title + '">' +
          "</button>"
        );
      }).join("") +
      "</div>";

    return { safeIndex: safeIndex, html: html };
  }

  function buildMobileReviewsGalleryHtml(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var list = Array.isArray(safeInput.list) ? safeInput.list : [];
    var requestedIndex = Number(safeInput.activeIndex || 0);
    var safeIndex = Math.min(Math.max(requestedIndex, 0), Math.max(list.length - 1, 0));
    var active = list[safeIndex];
    if (!active) return { safeIndex: safeIndex, html: "" };
    var yandexUrl = String(safeInput.yandexReviewsUrl || "#");

    var html =
      '<div class="mobile-review-social-proof"><div class="mobile-review-top"><div><strong>5.0</strong><span class="mobile-review-stars">★★★★★</span></div>' +
      '<a class="inline-link-btn primary" href="' + yandexUrl + '" target="_blank" rel="noopener noreferrer">Отзывы на Яндекс Картах</a></div>' +
      '<div class="mobile-review-proof">Более 40 реальных отзывов на Яндекс.Картах</div></div>' +
      '<div class="mobile-review-main"><div class="mobile-review-card"><div class="mobile-review-head">' +
      '<img src="' + active.avatar + '" alt="' + active.name + '"><div><strong>' + active.name + "</strong><span>" + active.meta + '</span><span class="mobile-review-stars">★★★★★</span></div></div>' +
      '<div class="mobile-review-text">' + active.quote + "</div></div>" +
      '<div class="mobile-review-dots">' +
      list.map(function (_item, idx) {
        return (
          '<button class="mobile-review-dot ' + (idx === safeIndex ? "active" : "") + '" type="button" data-action="mobile-review-select" data-review-index="' + idx + '" aria-label="Показать отзыв ' + (idx + 1) + '"></button>'
        );
      }).join("") +
      "</div></div>";

    return { safeIndex: safeIndex, html: html };
  }

  function buildMobileFaqVm(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var faq = Array.isArray(safeInput.faq) ? safeInput.faq : [];
    var currentGroup = String(safeInput.currentGroup || "");
    var currentOpenKey = String(safeInput.currentOpenKey || "");
    var groups = faq.map(function (group) { return group.group; });
    var safeGroup = groups.indexOf(currentGroup) >= 0 ? currentGroup : (groups[0] || "Медицина");
    var activeFaqGroup = faq.find(function (group) { return group.group === safeGroup; });
    var faqItems = (activeFaqGroup && Array.isArray(activeFaqGroup.items) ? activeFaqGroup.items : []).map(function (item, index) {
      return { key: safeGroup + ":" + index, q: item.q, a: item.a };
    });
    var fallbackKey = (faqItems[0] && faqItems[0].key) || "";
    var activeKey = faqItems.some(function (item) { return item.key === currentOpenKey; }) ? currentOpenKey : fallbackKey;

    var filtersHtml = groups.map(function (group) {
      return '<button type="button" class="mobile-faq-filter-chip ' + (group === safeGroup ? "active" : "") + '" data-action="mobile-faq-filter" data-faq-group="' + group + '">' + group + "</button>";
    }).join("");

    var listHtml = faqItems.map(function (item) {
      return (
        '<article class="mobile-faq-item ' + (item.key === activeKey ? "open" : "") + '">' +
        '<button type="button" class="mobile-faq-question" data-action="mobile-faq-toggle" data-faq-key="' + item.key + '">' +
        "<span>" + item.q + '</span><img class="ac-icon" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
        '<div class="mobile-faq-answer">' + item.a + "</div></article>"
      );
    }).join("");

    return { safeGroup: safeGroup, activeKey: activeKey, filtersHtml: filtersHtml, listHtml: listHtml };
  }

  function buildMobileTeamVm(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var founder = safeInput.founder || null;
    var teachers = Array.isArray(safeInput.teachers) ? safeInput.teachers : [];
    var requestedIndex = Number(safeInput.currentIndex || 0);
    var safeIndex = teachers.length ? ((requestedIndex % teachers.length) + teachers.length) % teachers.length : 0;
    var activeTeacher = teachers[safeIndex];
    var programmingBookUrl = String(safeInput.programmingBookUrl || "#");

    var html =
      '<article class="mobile-team-feature-card">' +
      '<div class="mobile-team-feature-cover-wrap" data-action="open-book-photo" role="button" tabindex="0" aria-label="Открыть обложку книги">' +
      '<img class="mobile-team-feature-cover" src="/assets/images/cdn-cache/8fc8172e_8991804334.webp" alt="Собственная книга по Python"></div>' +
      "<strong>Собственная книга по Python</strong>" +
      "<span>Команда не только ведёт занятия, но и создаёт собственные учебники и игровые методики.</span>" +
      '<a class="mobile-team-feature-cta" href="' + programmingBookUrl + '" target="_blank" rel="noopener noreferrer">Смотреть книгу</a>' +
      "</article>";

    if (founder) {
      html +=
        '<article class="mobile-team-founder-card"><div class="mobile-team-avatar"><img src="' + founder.avatarUrl + '" alt="' + founder.fio + '"></div>' +
        "<strong>" + founder.fio + "</strong><span class=\"mobile-team-role\">" + founder.role + "</span><p>" + founder.bio + "</p></article>";
    }

    if (activeTeacher) {
      html +=
        '<div class="mobile-team-carousel-block"><div class="mobile-team-carousel-head"><strong>Преподаватели</strong>' +
        '<div class="mobile-team-carousel-controls">' +
        '<button type="button" data-action="mobile-team-prev" aria-label="Предыдущий преподаватель"><img class="ac-icon" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true"></button>' +
        '<button type="button" data-action="mobile-team-next" aria-label="Следующий преподаватель"><img class="ac-icon" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true"></button>' +
        "</div></div>" +
        '<article class="mobile-team-teacher-card"><div class="mobile-team-avatar"><img src="' + activeTeacher.avatarUrl + '" alt="' + activeTeacher.fio + '"></div>' +
        "<strong>" + activeTeacher.fio + "</strong><span class=\"mobile-team-role\">" + activeTeacher.role + "</span><p>" + activeTeacher.bio + "</p></article>" +
        '<div class="mobile-team-carousel-dots">' +
        teachers.map(function (_item, index) {
          return '<button type="button" class="mobile-team-dot ' + (index === safeIndex ? "active" : "") + '" data-action="mobile-team-select" data-team-index="' + index + '" aria-label="Переключить преподавателя"></button>';
        }).join("") +
        "</div></div>";
    }

    return { safeIndex: safeIndex, html: html };
  }

  function renderMobileContactsHtml(input) {
    var safeInput = input && typeof input === "object" ? input : {};
    var mapUrl = String(safeInput.mapUrl || "#");
    var mapEmbedUrl = String(safeInput.mapEmbedUrl || "");
    var cityPhone = safeInput.cityPhone || null;
    var mobilePhone = safeInput.mobilePhone || null;
    var whatsapp = safeInput.whatsapp || null;
    var telegram = safeInput.telegram || null;

    return (
      '<article class="mobile-map-preview-card"><div class="mobile-map-preview"><iframe src="' + mapEmbedUrl + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Карта локации лагеря"></iframe></div>' +
      "<strong>66 км от Москвы · Киевское шоссе</strong><span>Удобный заезд на машине, маршрут открывается в Яндекс Картах.</span>" +
      '<a class="mobile-map-open-btn" href="' + mapUrl + '" target="_blank" rel="noopener noreferrer">Открыть карту</a></article>' +
      '<div class="mobile-contact-grid">' +
      (cityPhone ? '<a class="mobile-contact-card" href="' + cityPhone.href + '"><small>Телефон 1</small><strong>' + cityPhone.text + "</strong></a>" : "") +
      (mobilePhone ? '<a class="mobile-contact-card" href="' + mobilePhone.href + '"><small>Телефон 2</small><strong>' + mobilePhone.text + "</strong></a>" : "") +
      (whatsapp ? '<a class="mobile-contact-card" href="' + whatsapp.href + '" target="_blank" rel="noopener noreferrer"><small>WhatsApp</small><strong>WhatsApp</strong></a>' : "") +
      (telegram ? '<a class="mobile-contact-card" href="' + telegram.href + '" target="_blank" rel="noopener noreferrer"><small>Telegram</small><strong>@proga_school</strong></a>' : "") +
      "</div>"
    );
  }

  function renderMobileSocialsHtml(items) {
    var list = Array.isArray(items) ? items : [];
    return list.map(function (item) {
      return '<a class="mobile-social-link" href="' + item.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + item.key + '">' +
        '<span class="mobile-social-icon"><span class="social-badge-mark">' + item.mark + '</span></span>' +
        '<span class="mobile-social-label">' + item.key + "</span></a>";
    }).join("");
  }

  window.AC_FEATURES.compactRender = {
    renderAboutFeaturesHtml: renderAboutFeaturesHtml,
    renderJourneyHtml: renderJourneyHtml,
    buildProgramsHtml: buildProgramsHtml,
    renderDocsRequisitesHtml: renderDocsRequisitesHtml,
    renderDocsAccordionHtml: renderDocsAccordionHtml,
    buildMobilePhotoGalleryHtml: buildMobilePhotoGalleryHtml,
    buildMobileVideoGalleryHtml: buildMobileVideoGalleryHtml,
    buildMobileReviewsGalleryHtml: buildMobileReviewsGalleryHtml,
    buildMobileFaqVm: buildMobileFaqVm,
    buildMobileTeamVm: buildMobileTeamVm,
    renderMobileContactsHtml: renderMobileContactsHtml,
    renderMobileSocialsHtml: renderMobileSocialsHtml
  };
})();
