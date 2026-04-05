/* src/scripts/main.js */
    // SECTION 1: Config and runtime constants.
    const OFFER_DISCOUNT_FACTOR = 0.95;

    const CONTENT_RUNTIME = (window.AIDACAMP_CONTENT && typeof window.AIDACAMP_CONTENT === 'object')
      ? window.AIDACAMP_CONTENT
      : {};
    const shifts = Array.isArray(CONTENT_RUNTIME.shifts) ? CONTENT_RUNTIME.shifts : [];
    const mediaContent = (CONTENT_RUNTIME.mediaContent && typeof CONTENT_RUNTIME.mediaContent === 'object')
      ? CONTENT_RUNTIME.mediaContent
      : {
        references: {},
        faq: [],
        team: [],
        photos: [],
        videos: [],
        contacts: [],
        socials: [],
        reviews: []
      };

    const STORAGE_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.storage) || {};
    const STORAGE_KEY = String(STORAGE_RUNTIME_CONFIG.stateKey || 'aidacamp_proto_state_v3');
    const BOOKING_SCARCITY_KEY = String(STORAGE_RUNTIME_CONFIG.bookingScarcityKey || 'aidacamp_booking_scarcity_v1');
    const BOOKING_SCARCITY_BASE = Number(STORAGE_RUNTIME_CONFIG.bookingScarcityBase || 63);
    const BOOKING_SCARCITY_STEP = Number(STORAGE_RUNTIME_CONFIG.bookingScarcityStep || 7);
    const BOOKING_SCARCITY_MAX = Number(STORAGE_RUNTIME_CONFIG.bookingScarcityMax || 98);
    const OFFER_STAGE_KEY = String(STORAGE_RUNTIME_CONFIG.offerStageStateKey || ['offer', 'Stage'].join(''));
    const OFFER_LAYOUT_KEY = String(STORAGE_RUNTIME_CONFIG.offerLayoutStateKey || ['offer', 'Layout'].join(''));
    const OFFER_LAYOUT_DATASET_KEY = String(STORAGE_RUNTIME_CONFIG.offerLayoutDatasetKey || ['offer', 'Layout'].join(''));

    let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {
      age:null,
      shiftId:null,
      basePrice:null,
      offerPrice:null,
      code:null,
      previousCode:null,
      nextCodePreview:null,
      expiresAt:null,
      [OFFER_STAGE_KEY]:0,
      view:'desktop',
      phone:'',
      debugBookingBlocks:false
    };

    const OBSERVABILITY_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.observability) || {};
    const METRIKA_ID = Number(OBSERVABILITY_RUNTIME_CONFIG.metrikaId || 96499295);
    const RUNTIME_POLICY_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.runtimePolicy) || {};
    const MAX_CONTACT_URL = String(RUNTIME_POLICY_CONFIG.maxContactUrl || 'https://web.max.ru/185807479');
    const LEGAL_REPO_SLUG = String(RUNTIME_POLICY_CONFIG.legalRepoSlug || 'afanasevvlad829-cyber/aidaplus-landing-dev');
    const HERO_VARIANT_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.heroVariant) || {};
    const HERO_VARIANT_BANNER_TIER = Object.freeze(HERO_VARIANT_RUNTIME_CONFIG.bannerTier || {});
    const HERO_VARIANT_COPY = Object.freeze(HERO_VARIANT_RUNTIME_CONFIG.copy || {});
    const HERO_VARIANT_DEFAULT_TIER = String(HERO_VARIANT_RUNTIME_CONFIG.defaultTier || 'broad');
    const USE_DESKTOP_BASE_FOR_MOBILE = !!OBSERVABILITY_RUNTIME_CONFIG.useDesktopBaseForMobile;
    const BUILD_VERSION_LABEL = String(RUNTIME_POLICY_CONFIG.buildVersionLabel || 'v0.0.288 (ab-analytics-endpoint)');
    const ARCHITECTURE_POLICY = Object.freeze(RUNTIME_POLICY_CONFIG.architecturePolicy || {
      id: 'desktop-source-mobile-presentation',
      version: '2026-03-30',
      desktopSourceOfTruth: true,
      sharedStatePipeline: true,
      mobileUsesDesktopTemplates: true
    });
    const QUALITY_SCORE_MODEL = Object.freeze(RUNTIME_POLICY_CONFIG.qualityScoreModel || {
      scale: '0..10',
      debtScale: '0 best .. 10 worst',
      baselineVersion: 'v0.0.112 (debug-offer-layout-switch)',
      css: Object.freeze({ start: 10, penalties: Object.freeze({}) }),
      js: Object.freeze({ start: 10, penalties: Object.freeze({}) }),
      debt: Object.freeze({ start: 0, increments: Object.freeze({}) })
    });
    const AIDACAMP_RUNTIME = (window.__AIDACAMP_RUNTIME && typeof window.__AIDACAMP_RUNTIME === 'object')
      ? window.__AIDACAMP_RUNTIME
      : {};
    window.__AIDACAMP_RUNTIME = AIDACAMP_RUNTIME;
    AIDACAMP_RUNTIME.quality = AIDACAMP_RUNTIME.quality || {};
    AIDACAMP_RUNTIME.quality.scoreModel = QUALITY_SCORE_MODEL;
    AIDACAMP_RUNTIME.architecture = ARCHITECTURE_POLICY;
    const qualityScoreSnapshotDefaults = OBSERVABILITY_RUNTIME_CONFIG.qualityScoreSnapshotDefaults || {};
    AIDACAMP_RUNTIME.quality.scoreSnapshot = Object.freeze({
      version: BUILD_VERSION_LABEL,
      css: Number(qualityScoreSnapshotDefaults.css || 8.8),
      js: Number(qualityScoreSnapshotDefaults.js || 8.6),
      techDebt: Number(qualityScoreSnapshotDefaults.techDebt || 1.5),
      debtScale: String(qualityScoreSnapshotDefaults.debtScale || '0 best .. 10 worst'),
      baselineVersion: QUALITY_SCORE_MODEL.baselineVersion
    });
    const UI_MODES_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.uiModes) || {};
    const HERO_CONTRAST_MODES = Object.freeze(UI_MODES_RUNTIME_CONFIG.heroContrastModes || []);
    const HERO_MICRO_MODES = Object.freeze(UI_MODES_RUNTIME_CONFIG.heroMicroModes || []);
    const OFFER_MODAL_THEMES = Object.freeze(UI_MODES_RUNTIME_CONFIG.offerModalThemes || []);
    const OFFER_LAYOUT_MODES = Object.freeze(UI_MODES_RUNTIME_CONFIG.offerLayoutModes || []);
    const normalizeMode = (value, allowedModes, fallbackMode) => (
      allowedModes.includes(value) ? value : fallbackMode
    );
    const toFiniteNumberOrZero = (value) => {
      const parsed = Number(value);
      if(Number.isFinite(parsed)) return parsed;
      return 0;
    };
    const toPositiveIntegerOrZero = (value) => {
      const parsed = Number(value);
      if(!Number.isFinite(parsed) || parsed <= 0) return 0;
      return Math.floor(parsed);
    };
    const VERSION_MONOTONIC_KEY = String(STORAGE_RUNTIME_CONFIG.versionMonotonicKey || 'aidacamp_build_version_last_v1');
    const PROD_DEBUGLESS_DOMAINS = Object.freeze(OBSERVABILITY_RUNTIME_CONFIG.prodDebuglessDomains || ['aidacamp.ru']);
    const QUALITY_BASELINE_KEY = String(STORAGE_RUNTIME_CONFIG.qualityBaselineKey || 'aidacamp_quality_baseline_v1');
    const DEBT_REGISTER_KEY = String(STORAGE_RUNTIME_CONFIG.debtRegisterKey || 'aidacamp_debt_register_v1');
    const RUNTIME_QUALITY_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.runtimeQuality) || {};
    const QUALITY_SOFT_GATES = Object.freeze(RUNTIME_QUALITY_CONFIG.softGates || {});
    const GUARDRAIL_REQUIRED_SELECTORS = Object.freeze(RUNTIME_QUALITY_CONFIG.requiredSelectors || []);
    const CALENDAR_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.calendar) || {};
    const CALENDAR_WEEKDAYS_SHORT = Object.freeze(CALENDAR_RUNTIME_CONFIG.weekdaysShort || []);
    const CALENDAR_MONTH_NAMES = Object.freeze(CALENDAR_RUNTIME_CONFIG.monthNames || []);
    const DOCS_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.docsRuntime) || {};
    const DOCS_MOBILE_COPY_FALLBACK = Object.freeze({
      orgName: '',
      orgMeta: '',
      copyright: '',
      links: Object.freeze([])
    });
    const DOCS_DESKTOP_SECTION_TEMPLATES_FALLBACK = Object.freeze({});
    const VERSION_BADGE_HIDDEN_KEY = String(STORAGE_RUNTIME_CONFIG.versionBadgeHiddenKey || 'aidacamp_version_badge_hidden_v1');
    const VIDEO_META_CACHE_KEY = String(STORAGE_RUNTIME_CONFIG.videoMetaCacheKey || 'aidacamp_video_meta_cache_v2');
    const VIDEO_META_CACHE_TTL_MS = Number(STORAGE_RUNTIME_CONFIG.videoMetaCacheTtlMs || (1000 * 60 * 60 * 4));
    const VIDEO_META_REFRESH_INTERVAL_MS = Number(STORAGE_RUNTIME_CONFIG.videoMetaRefreshIntervalMs || (1000 * 60 * 60 * 4));
    const COMPACT_MODAL_SECTIONS = new Set(Array.isArray(UI_MODES_RUNTIME_CONFIG.compactModalSections) ? UI_MODES_RUNTIME_CONFIG.compactModalSections : []);
    let timerId = null;
    let mediaIndex = 0;
    let mediaType = 'photo';
    let activePhotoList = [];
    let photoGalleryList = [];
    // SECTION 2: State normalization and hydration.
    const stateNormalizeResult = safeInvoke(ensureBookingRuntimeBridge(), 'normalizeInitialState', [{
      state,
      useDesktopBaseForMobile: USE_DESKTOP_BASE_FOR_MOBILE
    }], { changed: false });
    if(stateNormalizeResult && stateNormalizeResult.changed){
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error){
        console.warn('[STATE] normalize persist failed', error);
      }
    }
    Object.assign(state, {
      photoFilter: state.photoFilter || 'camp',
      previousCode: state.previousCode || null,
      nextCodePreview: state.nextCodePreview || null,
      faqFilter: state.faqFilter || 'Медицина',
      mobileJourneyStep: toFiniteNumberOrZero(state.mobileJourneyStep),
      mobileProgramShiftId: state.mobileProgramShiftId || '',
      mobilePhotoIndex: toFiniteNumberOrZero(state.mobilePhotoIndex),
      mobileVideoIndex: toFiniteNumberOrZero(state.mobileVideoIndex),
      mobileReviewIndex: toFiniteNumberOrZero(state.mobileReviewIndex),
      mobileStayIndex: toFiniteNumberOrZero(state.mobileStayIndex),
      mobileFaqGroup: state.mobileFaqGroup || 'Медицина',
      mobileFaqOpenKey: state.mobileFaqOpenKey || '',
      mobileTeamIndex: toFiniteNumberOrZero(state.mobileTeamIndex),
      // Mobile docs block must stay compact by default: requisites visible, legal links collapsed.
      mobileDocsExpanded: false,
      debugBookingBlocks: !!state.debugBookingBlocks
    });
    const metrikaSeen = new Set();
    const scrollMarks = {25:false,50:false,75:false,90:false};
    let offerTimeoutIds = [];
    let offerRunId = 0;
    let leadSubmitInProgress = false;
    let lastRenderedBookingStage = 0;
    let bookingScarcityState = (() => {
      try {
        const saved = JSON.parse(localStorage.getItem(BOOKING_SCARCITY_KEY) || 'null');
        return {
          visits: toPositiveIntegerOrZero(saved && saved.visits)
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
    let bookingStage1TitleTypewriterDone = false;
    let bookingStage1TitleTypewriterTimer = null;
    let bookingStage1TitleTypewriterRunId = 0;
    let variantFlowFingerTimer = null;
    let variantFlowRunId = 0;
    let variantFlowCompletedKey = '';
    let videoMetaRefreshTimer = null;
    let heroVariantState = null;
    let telemetryFlowApi = null;
    let heroVariantFlowApi = null;
    let variantFlowApi = null;
    let calendarFlowApi = null;
    let navigationFlowApi = null;
    let videoMetaFlowApi = null;
    let mediaSectionsFlowApi = null;
    let modalMediaFlowApi = null;
    let guidedStateFlowApi = null;
    let bookingViewFlowApi = null;
    let bookingHintFlowApi = null;
    let summaryFlowApi = null;
    let viewModeFlowApi = null;
    let overlayFlowApi = null;
    let heroV3SimpleFlowApi = null;
    let heroBackgroundFlowApi = null;
    let offerFlowApi = null;
    let actionDispatcherApi = null;
    let bookingInlineLeadApi = null;
    let mediaGestureBindingsApi = null;
    let globalUiBindingsApi = null;
    let docsFlowApi = null;
    let uiInitFlowApi = null;
    let shiftOptionsFlowApi = null;
    let mediaFlowApi = null;
    let runtimeQualityPipelineApi = null;
    let bookingRuntimeBridgeApi = null;
    let leadNotifyFlowApi = null;

    function ensureTelemetryFlow(){
      if(telemetryFlowApi) return telemetryFlowApi;
      const create = window.AC_FEATURES?.telemetryFlow?.create;
      if(typeof create !== 'function') return null;
      telemetryFlowApi = create({
        document,
        metrikaId: METRIKA_ID,
        abEventEndpointDefault: AB_EVENT_ENDPOINT_DEFAULT,
        abVisitorKey: AB_VISITOR_ID_KEY,
        abSessionKey: AB_SESSION_ID_KEY,
        legalRepoSlug: LEGAL_REPO_SLUG,
        getHeroAbVariant: () => heroAbVariant,
        getHeroAbTestId: () => HERO_AB_TEST_ID,
        isAllowedAbEvent: (eventName) => AB_TEST_EVENT_ALLOWLIST.has(String(eventName || ''))
      });
      return telemetryFlowApi;
    }

    function ensureHeroVariantFlow(){
      if(heroVariantFlowApi) return heroVariantFlowApi;
      const create = window.AC_FEATURES?.heroVariantFlow?.create;
      if(typeof create !== 'function') return null;
      heroVariantFlowApi = create({
        document,
        getCurrentSearchParams,
        getHeroVariantState: () => heroVariantState,
        setHeroVariantState: (next) => {
          heroVariantState = next || null;
        },
        getVariantCopyMap: () => HERO_VARIANT_COPY,
        getVariantBannerTierMap: () => HERO_VARIANT_BANNER_TIER,
        getVariantDefaultTier: () => HERO_VARIANT_DEFAULT_TIER,
        getUtmH1Rules: () => ({}),
        bookingText,
        getMediaContent: () => mediaContent,
        ageLabel,
        getState: () => state,
        hasSelectedAge,
        getBookingStage,
        getSimpleModeEnabled: () => HERO_V3_SIMPLE_ENABLED,
        trackOnce,
        getBookingViewConfig
      });
      return heroVariantFlowApi;
    }

    function ensureVariantFlow(){
      if(variantFlowApi) return variantFlowApi;
      const create = window.AC_FEATURES?.variantFlow?.create;
      if(typeof create !== 'function') return null;
      variantFlowApi = create({
        state,
        getBookingStage,
        hasSelectedAge,
        resolveHeroVariantFromUtm,
        getVariantFlowView: () => resolveViewKey(state.previewView),
        getPrimaryBookingViewConfig,
        setHeroMenuOpen,
        getHeroVariantState: () => heroVariantState,
        getDefaultTier: () => HERO_VARIANT_DEFAULT_TIER,
        getFingerTimer: () => variantFlowFingerTimer,
        setFingerTimer: (next) => {
          variantFlowFingerTimer = next || null;
        },
        getRunId: () => variantFlowRunId,
        setRunId: (next) => {
          variantFlowRunId = Number(next) || 0;
        },
        getCompletedKey: () => variantFlowCompletedKey,
        setCompletedKey: (next) => {
          variantFlowCompletedKey = String(next || '');
        }
      });
      return variantFlowApi;
    }

    function ensureCalendarFlow(){
      if(calendarFlowApi) return calendarFlowApi;
      const create = window.AC_FEATURES?.calendarFlow?.create;
      if(typeof create !== 'function') return null;
      calendarFlowApi = create({
        getShifts: () => shifts,
        bookingText,
        calendarWeekdaysShort: () => CALENDAR_WEEKDAYS_SHORT,
        calendarMonthNames: () => CALENDAR_MONTH_NAMES,
        closeTransientModals,
        emitModularEvent,
        track,
        getShiftOptionPanels: () => shiftOptionPanels,
        setShiftOptionPanels: (nextPanels) => {
          shiftOptionPanels = nextPanels;
        },
        renderShiftOptions
      });
      return calendarFlowApi;
    }

    function ensureNavigationFlow(){
      if(navigationFlowApi) return navigationFlowApi;
      const create = window.AC_FEATURES?.navigationFlow?.create;
      if(typeof create !== 'function') return null;
      navigationFlowApi = create({
        trackFaqOpen,
        isMobilePreviewView: () => state.previewView === 'mobile',
        hasSelectedAge,
        track,
        getState: () => state,
        showHint,
        bookingText,
        focusMobileAgeGate,
        isCompactDesktopMode: () => state.desktopMode === 'compact',
        isCompactMobileMode: () => (
          state.previewView === 'mobile' && (
            USE_DESKTOP_BASE_FOR_MOBILE
              ? state.desktopMode === 'compact'
              : state.mobileMode === 'compact'
          )
        ),
        compactModalSections: COMPACT_MODAL_SECTIONS,
        openSectionModal,
        buildLegalDocUrl
      });
      return navigationFlowApi;
    }

    function ensureVideoMetaFlow(){
      if(videoMetaFlowApi) return videoMetaFlowApi;
      const create = window.AC_FEATURES?.videoMetaFlow?.create;
      if(typeof create !== 'function') return null;
      videoMetaFlowApi = create({
        mediaText: (key) => {
          if(key === 'genericSourceName') return 'источнике';
          if(key === 'vkVideoSourceName') return 'VK Видео';
          return '';
        },
        mediaContent,
        videoMetaCacheKey: VIDEO_META_CACHE_KEY,
        videoMetaCacheTtlMs: VIDEO_META_CACHE_TTL_MS,
        videoMetaRefreshIntervalMs: VIDEO_META_REFRESH_INTERVAL_MS,
        renderMediaSections,
        getVideoMetaRefreshTimer: () => videoMetaRefreshTimer,
        setVideoMetaRefreshTimer: (timerId) => {
          videoMetaRefreshTimer = timerId;
        }
      });
      return videoMetaFlowApi;
    }

    function ensureMediaSectionsFlow(){
      if(mediaSectionsFlowApi) return mediaSectionsFlowApi;
      const create = window.AC_FEATURES?.mediaSectionsFlow?.create;
      if(typeof create !== 'function') return null;
      mediaSectionsFlowApi = create({
        getState: () => state,
        getMediaContent: () => mediaContent,
        photoCatLabel,
        contactIconMarkup,
        socialBadgeMark,
        socialDisplayName,
        faqGlyph,
        bookingText,
        setPhotoLists: (list = []) => {
          const next = cloneArrayOrEmpty(list);
          photoGalleryList = next.slice();
          activePhotoList = next.slice();
        },
        prepareStayGalleryTriggers,
        renderCompactTrustPanelContent
      });
      return mediaSectionsFlowApi;
    }

    function ensureModalMediaFlow(){
      if(modalMediaFlowApi) return modalMediaFlowApi;
      const create = window.AC_FEATURES?.modalMediaFlow?.create;
      if(typeof create !== 'function') return null;
      modalMediaFlowApi = create({
        getState: () => state,
        getMediaContent: () => mediaContent,
        getActivePhotoList: () => activePhotoList,
        setMediaContext: (next = {}) => {
          mediaType = next.mediaType || mediaType;
          mediaIndex = Number(next.mediaIndex);
          if(!Number.isFinite(mediaIndex)) mediaIndex = 0;
        },
        getMediaContext: () => ({ mediaType, mediaIndex }),
        track,
        photoCatLabel,
        resolveVideoSource
      });
      return modalMediaFlowApi;
    }

    function ensureGuidedStateFlow(){
      if(guidedStateFlowApi) return guidedStateFlowApi;
      const create = window.AC_FEATURES?.guidedStateFlow?.create;
      if(typeof create !== 'function') return null;
      guidedStateFlowApi = create({
        getBookingViewConfig,
        syncGuidedState,
        getBookingStage,
        stopVariantFlowScenario: () => safeInvoke(ensureVariantFlow(), 'stopVariantFlowScenario', [], null),
        bookingText,
        hideVariantCoachBadge,
        hasSelectedAge,
        ageLabel,
        getState: () => state,
        getSelectedShift,
        simpleModeEnabled: HERO_V3_SIMPLE_ENABLED,
        scheduleVariantFlowScenario: () => {
          if(HERO_V3_SIMPLE_ENABLED){
            safeInvoke(ensureVariantFlow(), 'stopVariantFlowScenario', [], null);
            return;
          }
          safeInvoke(ensureVariantFlow(), 'scheduleVariantFlowScenario', [], null);
        }
      });
      return guidedStateFlowApi;
    }

    function ensureBookingViewFlow(){
      if(bookingViewFlowApi) return bookingViewFlowApi;
      const create = window.AC_FEATURES?.bookingViewFlow?.create;
      if(typeof create !== 'function') return null;
      bookingViewFlowApi = create({
        bookingText,
        getBookingStage,
        splitPrimaryActionText,
        getSelectedShift,
        getPrimaryActionState,
        getResolvedPrimaryActionText,
        getState: () => state,
        hasSelectedAge,
        formatPrice,
        getVisiblePrice,
        isOfferActive,
        formatRemainingCompact,
        stripRemainingPrefix,
        ageLabel,
        shiftDaysLabel,
        uiBookingHintTemplate,
        getTypewriterRunId: () => bookingStage1TitleTypewriterRunId,
        setTypewriterRunId: (value) => {
          bookingStage1TitleTypewriterRunId = Number(value) || 0;
        },
        getTypewriterTimer: () => bookingStage1TitleTypewriterTimer,
        setTypewriterTimer: (timerId) => {
          bookingStage1TitleTypewriterTimer = timerId || null;
        },
        getTypewriterDone: () => bookingStage1TitleTypewriterDone,
        setTypewriterDone: (flag) => {
          bookingStage1TitleTypewriterDone = !!flag;
        },
        syncGuidedState,
        getRenderableBookingViewKeys,
        getBookingViewConfig,
        renderSteps,
        renderGuidedState,
        applyBookingStageClass,
        applyBookingStage2Alignment,
        syncBookingHints,
        updateBookingScarcityUi,
        scheduleBookingCardMinHeightSync,
        closeInlineLead
      });
      return bookingViewFlowApi;
    }

    function ensureBookingHintFlow(){
      if(bookingHintFlowApi) return bookingHintFlowApi;
      const create = window.AC_FEATURES?.bookingHintFlow?.create;
      if(typeof create !== 'function') return null;
      bookingHintFlowApi = create({
        getActiveBookingViewKeys,
        getRenderableBookingViewKeys,
        getBookingViewConfig,
        getBookingStage,
        hasSelectedAge,
        getState: () => state,
        isSimpleModeEnabled: () => HERO_V3_SIMPLE_ENABLED,
        getHintTimerId: () => desktopAgeTapHintTimer,
        setHintTimerId: (next) => {
          desktopAgeTapHintTimer = next || null;
        },
        getHintRunning: () => desktopAgeTapHintRunning,
        setHintRunning: (flag) => {
          desktopAgeTapHintRunning = !!flag;
        },
        getHintPlayed: () => desktopAgeTapHintPlayed,
        setHintPlayed: (flag) => {
          desktopAgeTapHintPlayed = !!flag;
        },
        getHintToken: () => desktopAgeTapHintToken,
        setHintToken: (next) => {
          desktopAgeTapHintToken = Number(next) || 0;
        },
        getHintStartedAt: () => desktopAgeTapHintStartedAt
      });
      return bookingHintFlowApi;
    }

    function ensureSummaryFlow(){
      if(summaryFlowApi) return summaryFlowApi;
      const create = window.AC_FEATURES?.summaryFlow?.create;
      if(typeof create !== 'function') return null;
      summaryFlowApi = create({
        getState: () => state,
        getShifts: () => shifts,
        getTimerId: () => timerId,
        setTimerId: (next) => {
          timerId = next || null;
        },
        getDismissUntilTs: () => summaryBarDismissUntilTs,
        setDismissUntilTs: (next) => {
          summaryBarDismissUntilTs = Number(next) || 0;
        },
        getDismissTimerId: () => summaryBarDismissTimer,
        setDismissTimerId: (next) => {
          summaryBarDismissTimer = next || null;
        },
        resetOfferState,
        persist,
        formatRemaining,
        formatRemainingCompact,
        normalizeCompactTimerText,
        stripRemainingPrefix,
        renderBookingPanels,
        syncGuidedState,
        getBookingStage,
        getPrimaryActionState,
        getResolvedPrimaryActionText,
        splitPrimaryActionText,
        bookingText,
        labelAge,
        formatPrice,
        getPrimaryBookingViewConfig,
        isCompactCurrentMode: isSummaryCompactMode
      });
      return summaryFlowApi;
    }

    function ensureViewModeFlow(){
      if(viewModeFlowApi) return viewModeFlowApi;
      const create = window.AC_FEATURES?.viewModeFlow?.create;
      if(typeof create !== 'function') return null;
      viewModeFlowApi = create({
        getState: () => state,
        useDesktopBaseForMobile: USE_DESKTOP_BASE_FOR_MOBILE,
        normalizeMode,
        heroContrastModes: HERO_CONTRAST_MODES,
        heroMicroModes: HERO_MICRO_MODES,
        offerModalThemes: OFFER_MODAL_THEMES,
        offerLayoutModes: OFFER_LAYOUT_MODES,
        setHeroMenuOpen,
        closeSectionModal,
        applyHeroAbVariant,
        applyMobileTemplatesToDesktopSections,
        renderMediaSections,
        renderDesktopMobileDocsBlock,
        updateSummaryBarVisibility,
        persist,
        applyOfferLayoutMode,
        showOffer,
        applyMobileSectionAccordion
      });
      return viewModeFlowApi;
    }

    function ensureHeroV3SimpleFlow(){
      if(heroV3SimpleFlowApi) return heroV3SimpleFlowApi;
      const create = window.AC_FEATURES?.heroV3SimpleFlow?.create;
      if(typeof create !== 'function') return null;
      heroV3SimpleFlowApi = create({
        document,
        getEnabled: () => HERO_V3_SIMPLE_ENABLED,
        setHeroPhoneDropdownOpen,
        navigateToSection
      });
      return heroV3SimpleFlowApi;
    }

    function ensureHeroBackgroundFlow(){
      if(heroBackgroundFlowApi) return heroBackgroundFlowApi;
      const create = window.AC_FEATURES?.heroBackgroundFlow?.create;
      if(typeof create !== 'function') return null;
      heroBackgroundFlowApi = create({
        getHeroAbVariant: () => heroAbVariant,
        getHeroAbAssets,
        getHeroImages: () => HERO_IMAGES
      });
      return heroBackgroundFlowApi;
    }

    function ensureOfferFlow(){
      if(offerFlowApi) return offerFlowApi;
      const api = window.AC_FEATURES?.offerFlow || null;
      offerFlowApi = asFeatureApi(api);
      return offerFlowApi;
    }

    function ensureBookingRuntimeBridge(){
      if(bookingRuntimeBridgeApi) return bookingRuntimeBridgeApi;
      const createBridge = window.AC_RUNTIME_BOOKING_BRIDGE?.createBridge;
      if(typeof createBridge !== 'function') return null;
      bookingRuntimeBridgeApi = createBridge({
        getState: () => state,
        getSelectedShift,
        shiftDaysLabel,
        clearShiftOptionPanels,
        persist,
        renderAll,
        bookingText,
        track,
        buildHeroVariantMeta,
        resolveHeroVariantFromUtm,
        hasSelectedAge,
        showHint,
        nudgeUserToNextStep,
        formatVariantHint,
        getPrimaryActionState,
        isOfferActive,
        startTimer,
        syncGuidedState,
        formatPrice,
        ageLabel,
        stripRemainingPrefix,
        formatRemainingCompact
      });
      return bookingRuntimeBridgeApi;
    }

    function ensureActionDispatcher(){
      if(actionDispatcherApi) return actionDispatcherApi;
      const create = window.AC_FEATURES?.actionDispatcher?.createActionDispatcher;
      if(typeof create !== 'function') return null;
      actionDispatcherApi = create({
        bookingText,
        getState: () => state,
        getMediaContent: () => mediaContent,
        getPhotoGalleryList: () => photoGalleryList.slice(),
        setActivePhotoList: (next = []) => {
          activePhotoList = cloneArrayOrEmpty(next);
        },
        openMedia,
        getStayGallery,
        openVideo,
        scrollVideoCarousel,
        openShiftAboutModal,
        openCalendar,
        toggleShiftOptionPanel,
        navigateToSection,
        focusMobileAgeGate,
        dismissSummaryBarTemporarily,
        applyStatePatch: (patch = {}) => {
          Object.assign(state, patch);
        },
        renderCompactTrustPanelContent,
        persist,
        syncMobileDocsExpandedUi,
        renderDesktopMobileDocsBlock,
        scrollTeamCarousel,
        openSeasonCalendar,
        handlePrimaryCTA,
        resetAgeSelection,
        resetShiftSelection,
        openResetBookingConfirmModal,
        bumpOfferRunId: () => {
          offerRunId += 1;
        },
        clearOfferTimeout,
        resetOfferProgressUI,
        saveOfferAndClose,
        openNoticeModal,
        renderAll,
        syncGuidedState,
        buildBookingSummaryHtml,
        isOfferActive,
        startTimer,
        track,
        selectedShiftPayload,
        buildHeroVariantMeta,
        submitLead,
        closeSuccessModal,
        closeNoticeModal,
        hideVariantCoachBadge,
        getPrimaryBookingViewConfig,
        getNoticeConfirmHandler: () => safeInvoke(ensureOverlayFlow(), 'getNoticeConfirmHandler', [], null),
        closeCalendar,
        closeSectionModal,
        closeVideo,
        buildInviteClipboardText,
        setHeroMenuOpen,
        isHeroMenuOpen,
        setHeroPhoneDropdownOpen,
        isHeroPhoneDropdownOpen
      });
      return actionDispatcherApi;
    }

    function ensureBookingInlineLeadApi(){
      if(bookingInlineLeadApi) return bookingInlineLeadApi;
      const api = window.AC_FEATURES?.bookingInlineLead || null;
      bookingInlineLeadApi = asFeatureApi(api);
      return bookingInlineLeadApi;
    }

    function ensureOverlayFlow(){
      if(overlayFlowApi) return overlayFlowApi;
      const create = window.AC_FEATURES?.overlays?.create;
      if(typeof create !== 'function') return null;
      overlayFlowApi = create({
        document,
        buildBookingSummaryHtml,
        isAdminDebugSession,
        resetOfferState,
        getState: () => state,
        persist,
        renderAll
      });
      return overlayFlowApi;
    }

    function ensureMediaGestureBindingsApi(){
      if(mediaGestureBindingsApi) return mediaGestureBindingsApi;
      const api = window.AC_FEATURES?.mediaGestureBindings || null;
      mediaGestureBindingsApi = asFeatureApi(api);
      return mediaGestureBindingsApi;
    }

    function ensureGlobalUiBindingsApi(){
      if(globalUiBindingsApi) return globalUiBindingsApi;
      const api = window.AC_FEATURES?.globalUiBindings || null;
      globalUiBindingsApi = asFeatureApi(api);
      return globalUiBindingsApi;
    }

    function ensureMediaFlowApi(){
      if(mediaFlowApi) return mediaFlowApi;
      mediaFlowApi = asFeatureApi(window.AC_FEATURES?.mediaFlow || null);
      return mediaFlowApi;
    }

    function ensureDocsFlow(){
      if(docsFlowApi) return docsFlowApi;
      const create = window.AC_FEATURES?.docsFlow?.create;
      if(typeof create !== 'function') return null;
      docsFlowApi = create({
        shouldUseMobileTemplatesForDesktopSource: () => USE_DESKTOP_BASE_FOR_MOBILE && state.previewView === 'mobile',
        getMobileDocsCopy: () => Object.freeze(DOCS_RUNTIME_CONFIG.mobileDocsCopy || DOCS_MOBILE_COPY_FALLBACK),
        getState: () => state,
        getDesktopMobileSectionTemplates: () => Object.freeze(DOCS_RUNTIME_CONFIG.desktopMobileSectionTemplates || DOCS_DESKTOP_SECTION_TEMPLATES_FALLBACK)
      });
      return docsFlowApi;
    }

    function ensureUiInitFlow(){
      if(uiInitFlowApi) return uiInitFlowApi;
      const create = window.AC_FEATURES?.uiInitFlow?.create;
      if(typeof create !== 'function') return null;
      uiInitFlowApi = create({
        closeIconHtml: CLOSE_ICON_HTML,
        getScrollMarks: () => scrollMarks,
        track,
        trackOnce,
        updateSummaryBarVisibility
      });
      return uiInitFlowApi;
    }

    function ensureShiftOptionsFlow(){
      if(shiftOptionsFlowApi) return shiftOptionsFlowApi;
      const create = window.AC_FEATURES?.shiftOptionsFlow?.create;
      if(typeof create !== 'function') return null;
      shiftOptionsFlowApi = create({
        getState: () => state,
        getShifts: () => shifts,
        parseShiftDate,
        formatPrice,
        shiftDaysLabel,
        hasSelectedAge,
        syncGuidedState,
        showHint,
        nudgeUserToNextStep,
        selectShift,
        closeTransientModals,
        applyCompactSectionModalLayout,
        resolveViewKey,
        resolveShiftOptionsTargetId,
        getShiftOptionPanels: () => shiftOptionPanels
      });
      return shiftOptionsFlowApi;
    }

    function ensureLeadNotifyFlow(){
      if(leadNotifyFlowApi) return leadNotifyFlowApi;
      const create = window.AC_FEATURES?.leadNotifyFlow?.create;
      if(typeof create !== 'function') return null;
      leadNotifyFlowApi = create({
        buildAbMeta,
        saveLeadFallbackMeta,
        telegramText: bookingText,
        formatPrice
      });
      return leadNotifyFlowApi;
    }

    function asObject(value){
      return (value && typeof value === 'object' && value) || {};
    }

    function asFeatureApi(value){
      return (value && typeof value === 'object' && value) || null;
    }

    function cloneArrayOrEmpty(value){
      return (Array.isArray(value) && value.slice()) || [];
    }

    function resolveBookingViewCfg(viewCfg){
      return (viewCfg && viewCfg.key && viewCfg) || getBookingViewConfig('desktop');
    }

    function resolveScopeRoot(scopeRoot){
      return (scopeRoot && scopeRoot.nodeType === 1 && scopeRoot) || document;
    }

    function resolveViewKey(viewKey){
      return (viewKey === 'mobile' && 'mobile') || 'desktop';
    }

    function resolveVariantCoachMode(tier){
      return ((tier === 'tier2' || tier === 'tier4') && 'menu') || 'info';
    }

    function toHeroAbVariant(value){
      return ((String(value || 'A').toUpperCase() === 'B') && 'B') || 'A';
    }

    function hasQueryFlag(name){
      try{
        const params = new URLSearchParams(window.location.search || '');
        return params.get(name) === '1';
      } catch (error){
        return false;
      }
    }

    function getHeroAbAssets(value){
      return HERO_AB_ASSETS[toHeroAbVariant(value)] || HERO_AB_ASSETS.A;
    }

    function buildAbMeta(extra = {}){
      const fallback = {
        ab_test_id: HERO_AB_TEST_ID,
        ab_variant: toHeroAbVariant(heroAbVariant),
        ...asObject(extra)
      };
      return safeInvoke(ensureTelemetryFlow(), 'buildAbMeta', [extra], fallback);
    }

    function track(event, params = {}){
      const trackedParams = {
        ...asObject(params),
        ...buildAbMeta()
      };
      return safeInvoke(ensureTelemetryFlow(), 'track', [event, trackedParams], () => {
        try {
          if(typeof ym !== 'undefined'){
            ym(METRIKA_ID, 'reachGoal', event, trackedParams);
          }
        } catch (error){
          console.warn('Metrika track error:', event, error);
        }
      });
    }

    function getCurrentSearchParams(){
      return safeInvoke(ensureTelemetryFlow(), 'getCurrentSearchParams', [], () => {
        try {
          return new URLSearchParams(window.location.search || '');
        } catch (error){
          return new URLSearchParams('');
        }
      });
    }

    function buildLegalDocUrl(hash = ''){
      return safeInvoke(ensureTelemetryFlow(), 'buildLegalDocUrl', [hash], 'legal.html');
    }

    function syncLegalDocLinks(scope = document){
      return safeInvoke(ensureTelemetryFlow(), 'syncLegalDocLinks', [scope], null);
    }

    function buildHeroVariantMeta(extra = {}){
      const fallbackVariant = heroVariantState || resolveHeroVariantFromUtm();
      const fallback = {
        banner_id: fallbackVariant.bannerId || '',
        campaign_id: fallbackVariant.campaignId || '',
        tier: fallbackVariant.tier || HERO_VARIANT_DEFAULT_TIER,
        variant: fallbackVariant.copy?.variant || 'v1',
        ...asObject(extra)
      };
      return safeInvoke(ensureHeroVariantFlow(), 'buildHeroVariantMeta', [extra], fallback);
    }

    function resolveHeroVariantFromUtm(){
      const fallback = () => {
        const search = getCurrentSearchParams();
        const bannerId = String(search.get('utm_content') || '').trim();
        const campaignId = String(search.get('utm_campaign') || '').trim();
        const tierFromBanner = (bannerId && HERO_VARIANT_BANNER_TIER[bannerId]) || '';
        const isKnownBanner = !!tierFromBanner;
        const tier = (isKnownBanner && tierFromBanner) || HERO_VARIANT_DEFAULT_TIER;
        const copy = HERO_VARIANT_COPY[tier] || HERO_VARIANT_COPY[HERO_VARIANT_DEFAULT_TIER];
        const fallbackReason = ((!bannerId || !isKnownBanner) && 'unknown_banner_or_no_utm') || '';
        return { bannerId, campaignId, tier, copy, fallbackReason };
      };
      return safeInvoke(ensureHeroVariantFlow(), 'resolveHeroVariantFromUtm', [], fallback);
    }

    function applyHeroVariantCopy(){
      return safeInvoke(ensureHeroVariantFlow(), 'applyHeroVariantCopy', [], () => {
        const variant = heroVariantState || resolveHeroVariantFromUtm();
        const copy = variant.copy || HERO_VARIANT_COPY[HERO_VARIANT_DEFAULT_TIER];
        document.querySelectorAll('.hero-slogan').forEach((node) => {
          if(node) node.textContent = copy.title;
        });
      });
    }

    function injectHeroSeasonOfferCta(){
      return safeInvoke(ensureHeroVariantFlow(), 'injectHeroSeasonOfferCta');
    }

    function formatVariantHint(template){
      return safeInvoke(ensureHeroVariantFlow(), 'formatVariantHint', [template], () => {
        const source = String(template || '').trim();
        if(!source) return '';
        return source.replace('{{age}}', ageLabel(state.age || '10-12'));
      });
    }

    function clearVariantCoachReminderTimer(){
      return safeInvoke(ensureHeroVariantFlow(), 'clearVariantCoachReminderTimer');
    }

    function syncVariantBookingHint(viewCfg){
      const cfg = resolveBookingViewCfg(viewCfg);
      return safeInvoke(ensureHeroVariantFlow(), 'syncVariantBookingHint', [cfg], null);
    }

    function ensureVariantCoachBadge(viewCfg){
      const cfg = resolveBookingViewCfg(viewCfg);
      return safeInvoke(ensureHeroVariantFlow(), 'ensureVariantCoachBadge', [cfg], null);
    }

    function hideVariantCoachBadge(viewCfg, dismissKey = ''){
      const cfg = resolveBookingViewCfg(viewCfg);
      return safeInvoke(ensureHeroVariantFlow(), 'hideVariantCoachBadge', [cfg, dismissKey], null);
    }

    function syncVariantCoachBadge(viewCfg){
      const cfg = resolveBookingViewCfg(viewCfg);
      return safeInvoke(ensureHeroVariantFlow(), 'syncVariantCoachBadge', [cfg], null);
    }

    function initHeroVariantPersonalization(){
      return safeInvoke(ensureHeroVariantFlow(), 'initHeroVariantPersonalization', [], () => {
        heroVariantState = resolveHeroVariantFromUtm();
        const fallbackReason = heroVariantState.fallbackReason || '';
        trackOnce('hero_variant_shown_new', buildHeroVariantMeta());
        if(fallbackReason){
          trackOnce('hero_variant_fallback_new', buildHeroVariantMeta({reason:fallbackReason}));
        }
        applyHeroVariantCopy();
      });
    }

    function trackOnce(event, params = {}){
      const key = `${event}:${JSON.stringify(params)}`;
      if(metrikaSeen.has(key)) return;
      metrikaSeen.add(key);
      track(event, params);
    }

    function ensureRuntimeQualityPipeline(){
      if(runtimeQualityPipelineApi) return runtimeQualityPipelineApi;
      const create = window.AC_FEATURES?.runtimeQualityPipeline?.create;
      if(typeof create !== 'function') return null;
      runtimeQualityPipelineApi = create({
        document,
        runtimeStore: AIDACAMP_RUNTIME,
        buildVersionLabel: BUILD_VERSION_LABEL,
        versionMonotonicKey: VERSION_MONOTONIC_KEY,
        qualityBaselineKey: QUALITY_BASELINE_KEY,
        debtRegisterKey: DEBT_REGISTER_KEY,
        requiredSelectors: GUARDRAIL_REQUIRED_SELECTORS,
        qualitySoftGates: QUALITY_SOFT_GATES,
        architecturePolicy: ARCHITECTURE_POLICY,
        useDesktopBaseForMobile: USE_DESKTOP_BASE_FOR_MOBILE,
        shouldUseLegacyMobile: () => state.previewView === 'mobile',
        trackOnce,
        isPipelineEnabled: () => isFeatureEnabled('runtimeQualityPipeline')
      });
      if(runtimeQualityPipelineApi?.namespace){
        AIDACAMP_RUNTIME.quality.pipeline = runtimeQualityPipelineApi.namespace;
      }
      return runtimeQualityPipelineApi;
    }

    function getRuntimeQualityNamespace(){
      const pipeline = ensureRuntimeQualityPipeline();
      return pipeline?.namespace || null;
    }

    function runGuardrails(){
      return safeInvoke(getRuntimeQualityNamespace(), 'runGuardrails', [], {
        ok: false,
        policy: ARCHITECTURE_POLICY.id
      });
    }

    function runQualityBaselineAudit(){
      return safeInvoke(getRuntimeQualityNamespace(), 'runQualityBaselineAudit', [], null);
    }

    function evaluateSoftQualityGates(snapshot){
      return safeInvoke(getRuntimeQualityNamespace(), 'evaluateSoftQualityGates', [snapshot], {
        ok: false,
        warnings: ['pipeline_unavailable']
      });
    }

    function buildDebtRegister(guardrails, baseline, gates){
      return safeInvoke(getRuntimeQualityNamespace(), 'buildDebtRegister', [guardrails, baseline, gates], {
        debtItems: [],
        pressureScore: 0,
        pressureLevel: 'low'
      });
    }

    function buildRuntimeQualityScore(baseline, gates, debtRegister){
      return safeInvoke(getRuntimeQualityNamespace(), 'buildRuntimeQualityScore', [baseline, gates, debtRegister], {
        css: 0,
        js: 0,
        techDebt: 0,
        monolithness: 0
      });
    }

    function buildQualityTrendSummary(delta){
      return safeInvoke(getRuntimeQualityNamespace(), 'buildQualityTrendSummary', [delta], {
        trend: 'flat',
        better: 0,
        worse: 0
      });
    }

    function runReleaseIntegrityChecks(){
      return safeInvoke(getRuntimeQualityNamespace(), 'runReleaseIntegrityChecks', [], {
        ok: false,
        missing: ['runtime_quality_pipeline']
      });
    }

    function printRuntimeStatusReport(){
      return safeInvoke(getRuntimeQualityNamespace(), 'printRuntimeStatusReport', [], '');
    }

    function runQualityPipelineAll(){
      const qualityResult = safeInvoke(getRuntimeQualityNamespace(), 'runAll', [], null);
      if(qualityResult) return qualityResult;
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

    const CLOSE_ICON_HTML = '<img class="ac-icon" src="/assets/icons/close.svg" alt="" aria-hidden="true">';

    function safeInvoke(target, methodName, args = [], fallback = null){
      const list = Array.isArray(args) ? args : [];
      if(target && typeof target[methodName] === 'function'){
        return target[methodName](...list);
      }
      return typeof fallback === 'function' ? fallback(...list) : fallback;
    }

    function normalizeCloseIconButtons(scope = document){
      return safeInvoke(ensureUiInitFlow(), 'normalizeCloseIconButtons', [scope], null);
    }

    function initScrollTracking(){
      return safeInvoke(ensureUiInitFlow(), 'initScrollTracking', [], null);
    }

    function initSummaryBarViewportSync(){
      return safeInvoke(ensureUiInitFlow(), 'initSummaryBarViewportSync', [], null);
    }

    function initSectionViewTracking(){
      return safeInvoke(ensureUiInitFlow(), 'initSectionViewTracking', [], null);
    }

    function trackFaqOpen(){
      trackOnce('faq_open');
    }

    const HERO_AB_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.heroAb) || {};
    const HERO_AB_ASSETS = Object.freeze(HERO_AB_RUNTIME_CONFIG.assets || {
      A: Object.freeze({
        images: Object.freeze(['/assets/images/hero-camp-sunset-20260328.png']),
        mobile: '/assets/images/hero-camp-sunset-20260328.png'
      }),
      B: Object.freeze({
        images: Object.freeze(['/assets/images/hero-ab-pool-20260401.jpeg']),
        mobile: '/assets/images/hero-ab-pool-20260401.jpeg'
      })
    });
    const TELEMETRY_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.telemetry) || {};
    const HERO_AB_TEST_KEY = String(TELEMETRY_RUNTIME_CONFIG.heroAbTestKey || 'aidacamp_hero_ab_v1');
    const HERO_AB_TEST_ID = String(TELEMETRY_RUNTIME_CONFIG.heroAbTestId || 'hero_primary_block_v1');
    const HERO_AB_VARIANT_LABELS = Object.freeze(HERO_AB_RUNTIME_CONFIG.variantLabels || {
      A: 'Control',
      B: 'Pool Motion'
    });
    const HERO_AB_SHIFT_UP_MS = Number(HERO_AB_RUNTIME_CONFIG.timings?.shiftUpMs || 7000);
    const HERO_AB_BENEFIT_REVEAL_DELAY_MS = Number(HERO_AB_RUNTIME_CONFIG.timings?.benefitRevealDelayMs || 7600);
    const HERO_AB_BENEFIT_STEP_MS = Number(HERO_AB_RUNTIME_CONFIG.timings?.benefitStepMs || 4000);
    const HERO_AB_DESKTOP_SHIFT_UP_MS = Number(HERO_AB_RUNTIME_CONFIG.timings?.desktopShiftUpMs || 5000);
    const HERO_AB_DESKTOP_BENEFIT_REVEAL_DELAY_MS = Number(HERO_AB_RUNTIME_CONFIG.timings?.desktopBenefitRevealDelayMs || 5000);
    const HERO_AB_DESKTOP_BG_ONLY = !!HERO_AB_RUNTIME_CONFIG.desktopBgOnly;
    const HERO_AB_MOBILE_EFFECTS_ENABLED = !!HERO_AB_RUNTIME_CONFIG.mobileEffectsEnabled;
    const HERO_V3_SIMPLE_QUERY_KEY = 'hero_v3_simple';
    const HERO_V3_SIMPLE_ENABLED = hasQueryFlag(HERO_V3_SIMPLE_QUERY_KEY);
    const AB_EVENT_ENDPOINT_DEFAULT = String(TELEMETRY_RUNTIME_CONFIG.abEventEndpointDefault || 'https://adacamp-ab-analytics.afanasevvlad829.workers.dev/api/ab-event');
    const AB_VISITOR_ID_KEY = String(TELEMETRY_RUNTIME_CONFIG.abVisitorIdKey || 'aidacamp_ab_visitor_id_v1');
    const AB_SESSION_ID_KEY = String(TELEMETRY_RUNTIME_CONFIG.abSessionIdKey || 'aidacamp_ab_session_id_v1');
    const AB_TEST_EVENT_ALLOWLIST = new Set(Array.isArray(TELEMETRY_RUNTIME_CONFIG.abEventAllowlist) ? TELEMETRY_RUNTIME_CONFIG.abEventAllowlist : []);
    const HERO_BENEFITS_LAYOUT_EXPERIMENT = !!HERO_AB_RUNTIME_CONFIG.benefitsLayoutExperiment;
    const HERO_BENEFITS_LAYOUT_EXPERIMENT_ITEMS = Object.freeze(HERO_AB_RUNTIME_CONFIG.benefitsItems || []);

    let heroAbVariant = 'A';
    let heroAbTimers = [];
    let heroAbMobileScrollBound = false;
    let heroAbMobileInteractionBound = false;
    let heroAbMobileUserInteracted = false;
    let heroAbMobileCollapsed = false;
    let heroAbMobileAutoTimer = null;
    let heroAbFlowApi = null;
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
      safeInvoke(ensureHeroBackgroundFlow(), 'initHero', [], null);
    }

    function applyHeroV3SimpleMode(){
      return safeInvoke(ensureHeroV3SimpleFlow(), 'applyMode', [], null);
    }

    function preloadHeroAssets(){
      safeInvoke(ensureHeroBackgroundFlow(), 'preloadHeroAssets', [], null);
    }

    function ensureHeroAbFlow(){
      if(heroAbFlowApi) return heroAbFlowApi;
      const create = window.AC_FEATURES?.heroAbFlow?.create;
      if(typeof create !== 'function') return null;
      heroAbFlowApi = create({
        heroAbTestKey: HERO_AB_TEST_KEY,
        heroAbTestId: HERO_AB_TEST_ID,
        heroAbDesktopBgOnly: HERO_AB_DESKTOP_BG_ONLY,
        heroAbMobileEffectsEnabled: HERO_AB_MOBILE_EFFECTS_ENABLED,
        heroAbBenefitStepMs: HERO_AB_BENEFIT_STEP_MS,
        heroAbShiftUpMs: HERO_AB_SHIFT_UP_MS,
        heroAbBenefitRevealDelayMs: HERO_AB_BENEFIT_REVEAL_DELAY_MS,
        heroAbDesktopShiftUpMs: HERO_AB_DESKTOP_SHIFT_UP_MS,
        heroAbDesktopBenefitRevealDelayMs: HERO_AB_DESKTOP_BENEFIT_REVEAL_DELAY_MS,
        useDesktopBaseForMobile: USE_DESKTOP_BASE_FOR_MOBILE,
        getCurrentSearchParams,
        bookingText,
        trackOnce,
        syncModularState,
        emitModularEvent,
        getHeroAbVariant: () => heroAbVariant,
        setHeroAbVariant: (next) => {
          heroAbVariant = toHeroAbVariant(next);
        },
        getHeroAbTimers: () => heroAbTimers,
        setHeroAbTimers: (next) => {
          heroAbTimers = cloneArrayOrEmpty(next);
        },
        getMobileAutoTimer: () => heroAbMobileAutoTimer,
        setMobileAutoTimer: (next) => {
          heroAbMobileAutoTimer = next || null;
        },
        getMobileCollapsed: () => heroAbMobileCollapsed,
        setMobileCollapsed: (next) => {
          heroAbMobileCollapsed = !!next;
        },
        getMobileScrollBound: () => heroAbMobileScrollBound,
        setMobileScrollBound: (next) => {
          heroAbMobileScrollBound = !!next;
        },
        getMobileInteractionBound: () => heroAbMobileInteractionBound,
        setMobileInteractionBound: (next) => {
          heroAbMobileInteractionBound = !!next;
        },
        getMobileUserInteracted: () => heroAbMobileUserInteracted,
        setMobileUserInteracted: (next) => {
          heroAbMobileUserInteracted = !!next;
        },
        safeInvoke,
        getViewMode: () => window.AC_VIEW_MODE,
        heroBenefitsLayoutExperiment: HERO_BENEFITS_LAYOUT_EXPERIMENT,
        heroBenefitsLayoutExperimentItems: HERO_BENEFITS_LAYOUT_EXPERIMENT_ITEMS,
        heroAbVariantLabels: HERO_AB_VARIANT_LABELS,
        onHeroVariantChange: () => {
          initHero();
          const url = new URL(window.location.href);
          url.searchParams.set('hero_ab', heroAbVariant);
          window.history.replaceState({}, '', url.toString());
        },
        resolveDesktopView: () => document.getElementById('desktopView'),
        resolveMobileView: () => document.getElementById('mobileView')
      });
      return heroAbFlowApi;
    }

    function clearHeroAbTimers(){
      const cleared = safeInvoke(ensureHeroAbFlow(), 'clearHeroAbTimers', [], null);
      if(cleared !== null) return;
      heroAbTimers.forEach((timerId) => window.clearTimeout(timerId));
      heroAbTimers = [];
    }

    function applyHeroAbAnimationForRoot(root){
      safeInvoke(ensureHeroAbFlow(), 'applyHeroAbAnimationForRoot', [root], null);
    }

    function applyHeroAbVariant(){
      safeInvoke(ensureHeroAbFlow(), 'applyHeroAbVariant', [], null);
    }


    function openMedia(type, index){
      return safeInvoke(ensureModalMediaFlow(), 'openMedia', [type, index], null);
    }

    function closeMedia(){
      return safeInvoke(ensureModalMediaFlow(), 'closeMedia', [], null);
    }

    function closeTransientModals(except = '', options = {}){
      return safeInvoke(ensureModalMediaFlow(), 'closeTransientModals', [except, options], null);
    }

    function openVideo(url){
      return safeInvoke(ensureModalMediaFlow(), 'openVideo', [url], null);
    }

    function closeVideo(){
      return safeInvoke(ensureModalMediaFlow(), 'closeVideo', [], null);
    }

    function resolveVideoSource(url){
      return safeInvoke(ensureVideoMetaFlow(), 'resolveVideoSource', [url], {
        canEmbed: false,
        embedUrl: '',
        externalUrl: String(url || '').trim(),
        orientation: 'horizontal',
        sourceName: 'источнике'
      });
    }

    function isVerticalVideoUrl(url){
      return safeInvoke(ensureVideoMetaFlow(), 'isVerticalVideoUrl', [url], false);
    }

    function normalizeKinescopeShareUrl(url){
      return safeInvoke(ensureVideoMetaFlow(), 'normalizeKinescopeShareUrl', [url], '');
    }

    function applyVideoMetaMap(videoMetaMap = {}){
      return safeInvoke(ensureVideoMetaFlow(), 'applyVideoMetaMap', [videoMetaMap], false);
    }

    function loadVideoMetaCache(){
      return safeInvoke(ensureVideoMetaFlow(), 'loadVideoMetaCache', [], null);
    }

    function getVideoMetaCacheAgeMs(){
      return safeInvoke(ensureVideoMetaFlow(), 'getVideoMetaCacheAgeMs', [], Number.POSITIVE_INFINITY);
    }

    function saveVideoMetaCache(videoMetaMap){
      return safeInvoke(ensureVideoMetaFlow(), 'saveVideoMetaCache', [videoMetaMap], null);
    }

    async function fetchKinescopeMeta(videoUrl){
      const flow = ensureVideoMetaFlow();
      if(!flow || typeof flow.fetchKinescopeMeta !== 'function') return null;
      return flow.fetchKinescopeMeta(videoUrl);
    }

    async function refreshVideoMeta({force = false} = {}){
      const flow = ensureVideoMetaFlow();
      if(!flow || typeof flow.refreshVideoMeta !== 'function') return;
      await flow.refreshVideoMeta({force});
    }

    function scheduleVideoMetaRefresh(){
      return safeInvoke(ensureVideoMetaFlow(), 'scheduleVideoMetaRefresh', [], null);
    }

    function closeSectionModal(){
      return safeInvoke(ensureModalMediaFlow(), 'closeSectionModal', [], null);
    }

    function setHeroMenuOpen(isOpen){
      const wrap = document.getElementById('heroMenuWrap');
      const toggle = document.getElementById('heroMenuToggle');
      const menu = document.getElementById('serviceMenu');
      if(!wrap || !toggle || !menu) return;
      const next = !!isOpen;
      wrap.dataset.open = String(Number(!!next));
      toggle.setAttribute('aria-expanded', String(!!next));
      menu.classList.toggle('is-open', next);
      menu.hidden = !next;
    }

    function isHeroMenuOpen(){
      return document.getElementById('heroMenuWrap')?.dataset.open === '1';
    }

    function setHeroPhoneDropdownOpen(isOpen){
      const trigger = document.getElementById('heroPhoneTrigger');
      const dropdown = document.getElementById('heroPhoneDropdown');
      return (trigger && dropdown && (() => {
        const next = !!isOpen;
        trigger.dataset.open = String(Number(next));
        trigger.setAttribute('aria-expanded', String(next));
        dropdown.classList.toggle('is-open', next);
        dropdown.hidden = !next;
        return next;
      })()) || false;
    }

    function isHeroPhoneDropdownOpen(){
      return document.getElementById('heroPhoneTrigger')?.dataset.open === '1';
    }

    function scrollVideoCarousel(direction = 1, scopeRoot = null){
      const scope = resolveScopeRoot(scopeRoot);
      const list = scope.querySelector('#videoList, .video-list');
      if(!list) return;
      const card = list.querySelector('.video-card');
      const gap = 12;
      const step = (card && (card.getBoundingClientRect().width + gap)) || 260;
      list.scrollBy({left: step * direction, behavior:'smooth'});
    }

    function scrollTeamCarousel(direction = 1, scopeRoot = null){
      const scope = resolveScopeRoot(scopeRoot);
      const list = scope.querySelector('#teamCarousel, .team-carousel');
      if(!list) return;
      const card = list.querySelector('.team-card');
      const gap = 12;
      const step = (card && (card.getBoundingClientRect().width + gap)) || 320;
      list.scrollBy({left: step * direction, behavior:'smooth'});
    }

    function applyCompactSectionModalLayout(){
      return safeInvoke(ensureModalMediaFlow(), 'applyCompactSectionModalLayout', [], null);
    }

    function openSectionModal(sectionId){
      const opened = safeInvoke(ensureModalMediaFlow(), 'openSectionModal', [sectionId], false);
      if(opened && sectionId === 'section-faq'){
        trackFaqOpen();
      }
      return !!opened;
    }

    function renderMediaViewer(){
      return safeInvoke(ensureModalMediaFlow(), 'renderMediaViewer', [], null);
    }

    function getActiveMediaList(){
      if(mediaType !== 'photo') return mediaContent.videos;
      if(activePhotoList.length) return activePhotoList;
      return mediaContent.photos;
    }

    function nextMedia(){
      const list = getActiveMediaList();
      mediaIndex = (mediaIndex + 1) % list.length;
      renderMediaViewer();
    }

    function prevMedia(){
      const list = getActiveMediaList();
      mediaIndex = (mediaIndex - 1 + list.length) % list.length;
      renderMediaViewer();
    }

    function getPhotoTagsByFilter(filter){
      const photoByFilter = {
        all: ['all', 'camp', 'pool', 'sport', 'study', 'food'],
        camp: ['all', 'camp'],
        pool: ['pool'],
        sport: ['sport'],
        study: ['study'],
        food: ['food']
      };
      return photoByFilter[String(filter || '').trim()] || ['all', 'camp'];
    }

    function getPhotosForActiveFilter(filter = state.photoFilter){
      const tags = getPhotoTagsByFilter(filter);
      let list = mediaContent.photos.filter((item) => tags.includes(item.cat));
      if(!list.length){
        list = mediaContent.photos.filter((item) => item.cat === 'all' || item.cat === 'camp');
      }
      return list.length ? list : mediaContent.photos.slice();
    }

    function handleDataActionClick(target){
      const dispatcher = ensureActionDispatcher();
      return !!safeInvoke(dispatcher, 'handleAction', [target], false);
    }

    async function notifyLead(eventName, payload){
      return safeInvoke(ensureLeadNotifyFlow(), 'notifyLead', [eventName, payload], Promise.resolve({
        ok: false,
        delivered: false,
        fallback: true,
        reason: 'lead_notify_flow_unavailable'
      }));
    }

    function isAdminDebugSession(){
      try {
        const resolveIsProductionRuntime = () => {
          try {
            const host = String(window.location.hostname || '').toLowerCase().replace(/^www\./, '');
            if(!host) return false;
            return PROD_DEBUGLESS_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
          } catch(error){
            return false;
          }
        };
        // Production must never expose debug controls via query/localStorage toggles.
        if(resolveIsProductionRuntime()) return false;
        if(window.AC_DEBUG === true) return true;
        const search = new URLSearchParams(window.location.search || '');
        const adminFlag = (search.get('admin') || search.get('debug') || '').toLowerCase();
        if(['1', 'true', 'yes', 'on'].includes(adminFlag)) return true;
        const adminDebugKey = String(STORAGE_RUNTIME_CONFIG.adminDebugKey || 'aidacamp_admin_debug');
        const storedFlag = String(localStorage.getItem(adminDebugKey) || '').toLowerCase();
        return ['1', 'true', 'yes', 'on'].includes(storedFlag);
      } catch(error){
        return false;
      }
    }

    function getSelectedShift(){
      return (state.shiftId && shifts.find(s => s.id === state.shiftId)) || null;
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
        Object.assign(state, { ageSelected: true });
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

    function saveLeadFallbackMeta(eventName, endpoint, reason = ''){
      try {
        const key = String(STORAGE_RUNTIME_CONFIG.leadFallbackMetaKey || 'aidacamp_lead_fallback_meta');
        const prevRaw = localStorage.getItem(key);
        const prev = (prevRaw && JSON.parse(prevRaw)) || {};
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
      return (shift && shift.price) || null;
    }

    function getPrimaryActionState(){
      syncGuidedState();
      return safeInvoke(ensureBookingRuntimeBridge(), 'getPrimaryActionState', [{
        state,
        heroVariantState,
        resolveHeroVariantFromUtm,
        HERO_VARIANT_COPY,
        HERO_VARIANT_DEFAULT_TIER,
        hasSelectedAge,
        getSelectedShift,
        simpleModeEnabled: HERO_V3_SIMPLE_ENABLED
      }], { text:'', disabled:true, hint:'' });
    }

    function getResolvedPrimaryActionText(actionState, shift){
      return safeInvoke(ensureBookingRuntimeBridge(), 'getResolvedPrimaryActionText', [{
        state,
        actionState,
        shift,
        formatPrice
      }], '');
    }

    function getStepState(){
      syncGuidedState();
      return safeInvoke(ensureBookingRuntimeBridge(), 'getStepState', [{
        state,
        hasSelectedAge,
        simpleModeEnabled: HERO_V3_SIMPLE_ENABLED
      }], 1);
    }

    function getBookingStage(){
      return Math.min(Math.max(getStepState(), 1), 4);
    }

    // SECTION 4: Booking module (view config, actions, render pipeline).
    const BOOKING_RUNTIME_CONFIG = (window.AC_RUNTIME_CONFIG && window.AC_RUNTIME_CONFIG.bookingViews) || {};
    const BOOKING_STAGE2_VERTICAL_ALIGN = Object.freeze(BOOKING_RUNTIME_CONFIG.stage2VerticalAlign || {});
    const BOOKING_STAGE2_HORIZONTAL_ALIGN = Object.freeze(BOOKING_RUNTIME_CONFIG.stage2HorizontalAlign || {});
    const BOOKING_VIEWS = Object.freeze(BOOKING_RUNTIME_CONFIG.views || {
      desktop: Object.freeze({ key: 'desktop' }),
      mobile: Object.freeze({ key: 'mobile' })
    });
    let bookingCardMinHeightFrame = 0;

    function getBookingViewConfig(viewKey){
      if(viewKey === 'mobile') return BOOKING_VIEWS.mobile;
      return BOOKING_VIEWS.desktop;
    }

    function getRenderableBookingViewKeys(){
      if(USE_DESKTOP_BASE_FOR_MOBILE){
        return ['desktop'];
      }
      return ['desktop', 'mobile'];
    }

    function getActiveBookingViewKeys(){
      if(state.previewView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE){
        return ['mobile'];
      }
      return ['desktop'];
    }

    function getPrimaryBookingViewKey(){
      return getActiveBookingViewKeys()[0] || 'desktop';
    }

    function getPrimaryBookingViewConfig(){
      return getBookingViewConfig(getPrimaryBookingViewKey());
    }

    function syncBookingCardMinHeight(){
      const card = document.getElementById('desktop-booking-card');
      if(!card) return;
      const shouldStabilize = window.matchMedia('(max-width: 820px)').matches && state.previewView === 'mobile';
      if(!shouldStabilize){
        card.style.removeProperty('--booking-card-min-height');
        card.style.removeProperty('--booking-card-fixed-height');
        card.style.removeProperty('--booking-card-mobile-overlap');
        return;
      }

      const heroShell = card.closest('.hero-shell');
      const cardRect = card.getBoundingClientRect();
      const heroRect = (heroShell && heroShell.getBoundingClientRect()) || null;
      const viewportHeight = Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0);
      const preferred = Math.floor(viewportHeight * 0.72);
      let availableByHero = Math.floor(viewportHeight * 0.68);

      if(heroRect && Number.isFinite(heroRect.bottom) && Number.isFinite(cardRect.top)){
        availableByHero = Math.floor(heroRect.bottom - cardRect.top + Math.max(8, viewportHeight * 0.025));
      }

      const runtimeHeight = Math.max(450, Math.min(700, Math.min(preferred, availableByHero)));
      const mobileOverlap = Math.max(11, Math.min(27, Math.round(runtimeHeight * 0.048)));
      card.style.setProperty('--booking-card-fixed-height', `${runtimeHeight}px`);
      card.style.setProperty('--booking-card-min-height', `${runtimeHeight}px`);
      card.style.setProperty('--booking-card-mobile-overlap', `${mobileOverlap}px`);
    }

    function scheduleBookingCardMinHeightSync(){
      if(bookingCardMinHeightFrame){
        cancelAnimationFrame(bookingCardMinHeightFrame);
      }
      bookingCardMinHeightFrame = requestAnimationFrame(() => {
        bookingCardMinHeightFrame = 0;
        syncBookingCardMinHeight();
      });
    }

    function applyBookingStageClass(viewCfg){
      const cfg = resolveBookingViewCfg(viewCfg);
      const card = document.getElementById(cfg.cardId);
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
        const hasStage2Transfer = stepThree.classList.contains('booking-stage2-transfer-enabled');
        const shouldHideStepThree = stage === 2 && !hasStage2Transfer;
        stepThree.classList.toggle('is-force-hidden', shouldHideStepThree);
      }
    }

    function resolveStage2VerticalAlign(value){
      if(value === 'center') return BOOKING_STAGE2_VERTICAL_ALIGN.center;
      if(value === 'bottom') return BOOKING_STAGE2_VERTICAL_ALIGN.bottom;
      return BOOKING_STAGE2_VERTICAL_ALIGN.top;
    }

    function resolveStage2HorizontalAlign(value){
      if(value === 'left') return BOOKING_STAGE2_HORIZONTAL_ALIGN.left;
      if(value === 'center') return BOOKING_STAGE2_HORIZONTAL_ALIGN.center;
      if(value === 'right') return BOOKING_STAGE2_HORIZONTAL_ALIGN.right;
      return BOOKING_STAGE2_HORIZONTAL_ALIGN.stretch;
    }

    function applyBookingStage2Alignment(viewCfg){
      const cfg = resolveBookingViewCfg(viewCfg);
      const card = document.getElementById(cfg.cardId);
      if(!card) return;
      const stage2Align = cfg.stage2Align || {};
      const vertical = resolveStage2VerticalAlign(stage2Align.vertical);
      const horizontal = resolveStage2HorizontalAlign(stage2Align.horizontal);
      card.style.setProperty('--booking-stage2-y-flex', vertical.flex);
      card.style.setProperty('--booking-stage2-y-grid', vertical.grid);
      card.style.setProperty('--booking-stage2-x-flex', horizontal.flex);
      card.style.setProperty('--booking-stage2-x-grid', horizontal.grid);
    }

    function renderSteps(viewCfg){
      const cfg = resolveBookingViewCfg(viewCfg);
      const root = document.getElementById(cfg.stepsId);
      if(!root) return;
      const current = getStepState();
      const isDesktopSteps = cfg.key === 'desktop';
      root.querySelectorAll('.booking-step').forEach((el, idx) => {
        const num = idx + 1;
        el.classList.remove('active','done','pulse');
        el.dataset.step = String(num);
        if(num < current) el.classList.add('done');
        if(num === current){
          el.classList.add('active');
          if(isDesktopSteps){
            el.classList.add('pulse');
          }
        }
      });
    }

    function renderGuidedState(viewCfg){
      return safeInvoke(ensureGuidedStateFlow(), 'renderGuidedState', [viewCfg], null);
    }

    function pulseNode(node){
      return safeInvoke(ensureBookingHintFlow(), 'pulseNode', [node], null);
    }

    function nudgeUserToNextStep(message = 'Сначала завершите предыдущий шаг.'){
      return safeInvoke(ensureBookingHintFlow(), 'nudgeUserToNextStep', [message], null);
    }

    function showHint(message, requiredStep = ''){
      return safeInvoke(ensureBookingHintFlow(), 'showHint', [message, requiredStep], null);
    }

    function syncBookingHints(){
      return safeInvoke(ensureBookingHintFlow(), 'syncBookingHints', [], null);
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
        return (match && (Number(match[1]) || 0)) || 0;
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

      return ((stripRemainingPrefix(source) && `Осталось ${stripRemainingPrefix(source)}`) || '');
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
        let progressNode = node.querySelector('.booking-scarcity-progress');
        if(!progressNode){
          progressNode = document.createElement('span');
          progressNode.className = 'booking-scarcity-progress';
          progressNode.setAttribute('aria-hidden', 'true');
          const fillNode = document.createElement('span');
          fillNode.className = 'booking-scarcity-progress-fill';
          progressNode.appendChild(fillNode);
          node.appendChild(progressNode);
        }
        let textNode = node.querySelector('.booking-scarcity-text');
        if(!textNode){
          textNode = document.createElement('span');
          textNode.className = 'booking-scarcity-text';
          node.appendChild(textNode);
        }
        textNode.textContent = '';
        const strongNode = document.createElement('strong');
        strongNode.textContent = `${percent}%`;
        textNode.appendChild(strongNode);
        textNode.appendChild(document.createTextNode(' мест уже занято'));
        if(enteredStageFour){
          node.classList.remove('is-animating');
          void node.offsetWidth;
          node.classList.add('is-animating');
        }
      });
    }

    function stopBookingStage1TitleTypewriter(){
      return safeInvoke(ensureBookingViewFlow(), 'stopBookingStage1TitleTypewriter', [], null);
    }

    function runBookingStage1TitleTypewriter(target, text){
      return safeInvoke(ensureBookingViewFlow(), 'runBookingStage1TitleTypewriter', [target, text], null);
    }

    function renderBookingInfo(viewCfg){
      return safeInvoke(ensureBookingViewFlow(), 'renderBookingInfo', [viewCfg], null);
    }

    function renderBookingPanels(){
      return safeInvoke(ensureBookingViewFlow(), 'renderBookingPanels', [], null);
    }

    function getViewportPreviewView(){
      return safeInvoke(ensureViewModeFlow(), 'getViewportPreviewView', [], () => {
        return (window.matchMedia('(max-width: 900px)').matches && 'mobile') || 'desktop';
      });
    }

    function switchView(view){
      return safeInvoke(ensureViewModeFlow(), 'switchView', [view], null);
    }

    function applyOfferLayoutMode(){
      const mode = normalizeMode(state[OFFER_LAYOUT_KEY], OFFER_LAYOUT_MODES, 'current');
      const currentBtn = document.getElementById('offerLayoutCurrentBtn');
      if(currentBtn){
        currentBtn.classList.toggle('active', mode === 'current');
      }
      const card = document.getElementById('offerCard');
      if(card){
        card.dataset[OFFER_LAYOUT_DATASET_KEY] = mode;
      }
    }

    // SECTION 6: View mode controls (desktop/mobile, full/compact).
    document.getElementById('fullModeBtn')?.addEventListener('click', () => {
      safeInvoke(ensureViewModeFlow(), 'switchDesktopMode', ['full'], null);
    });
    document.getElementById('compactModeBtn')?.addEventListener('click', () => {
      const nextMode = (state.desktopMode === 'compact' && 'full') || 'compact';
      safeInvoke(ensureViewModeFlow(), 'switchDesktopMode', [nextMode], null);
    });
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      document.getElementById('mobileFullModeBtn')?.addEventListener('click', () => {
        safeInvoke(ensureViewModeFlow(), 'switchMobileMode', ['full'], null);
      });
      document.getElementById('mobileCompactModeBtn')?.addEventListener('click', () => {
        safeInvoke(ensureViewModeFlow(), 'switchMobileMode', ['compact'], null);
      });
      document.getElementById('mobileModeToggle')?.addEventListener('click', () => {
        safeInvoke(
          ensureViewModeFlow(),
          'switchMobileMode',
          [(state.mobileMode === 'full' && 'compact') || 'full'],
          null
        );
      });
    }

    // SECTION 7: Event bindings (single action pipeline, no direct business logic in handlers).
    document.addEventListener('click', (e) => {
      if(handleDataActionClick(e.target)){
        return;
      }
    });

    function formatPrice(v){
      return new Intl.NumberFormat('ru-RU').format(v) + ' ₽';
    }

    function labelAge(v){
      return ageLabel(v);
    }

    function shiftDaysLabel(shift){
      if(!shift) return '';
      const dayWord = (days) => {
        const n = Math.abs(Number(days) || 0);
        const mod10 = n % 10;
        const mod100 = n % 100;
        if(mod10 === 1 && mod100 !== 11) return 'день';
        if(mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'дня';
        return 'дней';
      };
      if(shift.isShort){
        const start = parseShiftDate(shift.start);
        const end = parseShiftDate(shift.end);
        if(start && end){
          const msPerDay = 24 * 60 * 60 * 1000;
          const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / msPerDay) + 1);
          return `${days} ${dayWord(days)}`;
        }
      }
      const map = {
        'shift-1':'10 дней',
        'shift-2':'13 дней',
        'shift-2-1':'7 дней',
        'shift-2-2':'7 дней',
        'shift-4':'13 дней',
        'shift-5':'10 дней'
      };
      return map[shift.id] || '';
    }

    function resolveShiftOptionsTargetId(viewKey){
      const cfg = getBookingViewConfig(viewKey);
      return cfg.shiftOptionsId;
    }

    function renderShiftOptionsForRenderableViews(){
      getRenderableBookingViewKeys().forEach((viewKey) => {
        try {
          renderShiftOptions(viewKey);
        } catch(err){
          console.warn('[booking] shift options render failed for view:', viewKey, err);
        }
      });
    }

    function toggleShiftOptionPanel(viewKey, panelType, shiftId){
      const safeView = resolveViewKey(viewKey);
      safeInvoke(ensureCalendarFlow(), 'toggleShiftOptionPanel', [safeView, panelType, shiftId], () => {
        const current = shiftOptionPanels[safeView]?.[panelType] || null;
        shiftOptionPanels[safeView][panelType] = (current !== shiftId && shiftId) || null;
        renderShiftOptions(safeView);
      });
    }

    function clearShiftOptionPanels(){
      safeInvoke(ensureCalendarFlow(), 'clearShiftOptionPanels', [], () => {
        shiftOptionPanels = {
          desktop:{aboutId:null, calendarId:null},
          mobile:{aboutId:null, calendarId:null}
        };
      });
    }

    function parseShiftDate(dateStr){
      return safeInvoke(ensureCalendarFlow(), 'parseShiftDate', [dateStr], () => {
        const m = String(dateStr || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if(!m) return null;
        return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
      });
    }

    function renderCalendar(shift){
      return safeInvoke(ensureCalendarFlow(), 'renderCalendar', [shift], null);
    }

    function renderSeasonCalendar(){
      return safeInvoke(ensureCalendarFlow(), 'renderSeasonCalendar', [], null);
    }

    function openCalendar(shiftId){
      return safeInvoke(ensureCalendarFlow(), 'openCalendar', [shiftId], null);
    }

    function openSeasonCalendar(){
      return safeInvoke(ensureCalendarFlow(), 'openSeasonCalendar', [], null);
    }

    function closeCalendar(){
      return safeInvoke(ensureCalendarFlow(), 'closeCalendar', [], null);
    }

    function selectedShiftPayload(){
      return safeInvoke(ensureBookingRuntimeBridge(), 'selectedShiftPayload', [{
        state,
        getSelectedShift,
        shiftDaysLabel
      }], () => ({}));
    }

    function clearOfferTimeout(){
      return safeInvoke(ensureBookingRuntimeBridge(), 'clearOfferTimeout', [{
        getTimeoutIds: () => offerTimeoutIds,
        setTimeoutIds: (next = []) => {
          offerTimeoutIds = Array.isArray(next) ? next : [];
        },
        clearTimeoutFn: clearTimeout
      }], null);
    }

    function resetOfferState({preserveShift = true} = {}){
      return safeInvoke(ensureBookingRuntimeBridge(), 'resetOfferState', [{
        preserveShift,
        state,
        getTimeoutIds: () => offerTimeoutIds,
        setTimeoutIds: (next = []) => {
          offerTimeoutIds = Array.isArray(next) ? next : [];
        },
        clearTimeoutFn: clearTimeout
      }], null);
    }

    function buildBookingSummaryHtml({showTimer = false} = {}){
      return safeInvoke(ensureBookingRuntimeBridge(), 'buildBookingSummaryHtml', [{
        showTimer,
        state,
        getSelectedShift,
        isOfferActive,
        formatPrice,
        ageLabel,
        bookingText,
        stripRemainingPrefix,
        formatRemainingCompact
      }], '');
    }

    function generateCode(){
      return 'AC-' + Math.random().toString(36).slice(2,6).toUpperCase();
    }

    function buildInviteClipboardText(){
      const currentCode = String(state.code || 'aidacamp').trim();
      const inviteUrl = `${window.location.origin}${window.location.pathname}?invite=${encodeURIComponent(currentCode)}`;
      return `Ссылка: ${inviteUrl}`;
    }

    function bindAgeTabs(rootId){
      const root = document.getElementById(rootId);
      if(!root) return;
      root.querySelectorAll('[data-age]').forEach(btn => {
        btn.addEventListener('click', () => {
          root.querySelectorAll('[data-age]').forEach(x => x.classList.remove('active'));
          btn.classList.add('active');
          Object.assign(state, {
            age: btn.dataset.age,
            ageSelected: true,
            shiftId: null,
            basePrice: null,
            offerPrice: null,
            code: null,
            expiresAt: null,
            [OFFER_STAGE_KEY]: 0,
            bookingCompleted: false
          });
          renderAll();
          persist();
          let scope = 'booking-desktop';
          if(state.previewView === 'mobile') scope = 'booking-mobile';
          HERO_V3_SIMPLE_ENABLED && window.setTimeout(() => openInlineLead(scope), 0);
        });
      });
    }

    function focusMobileAgeGate(){
      let gate = null;
      if(USE_DESKTOP_BASE_FOR_MOBILE){
        gate = document.getElementById('desktopAgeTabs');
      } else {
        gate = document.getElementById('mobileAgeGateCard') || document.getElementById('mobileAgeTabs');
      }
      if(!gate) return;
      gate.scrollIntoView({behavior:'smooth', block:'center'});
      gate.classList.add('guided-pulse');
      setTimeout(() => gate.classList.remove('guided-pulse'), 1100);
    }

    function resetAgeSelection(){
      return safeInvoke(ensureBookingRuntimeBridge(), 'resetAgeSelection', [{
        state,
        clearShiftOptionPanels,
        renderAll,
        persist
      }], null);
    }

    function resetShiftSelection(){
      return safeInvoke(ensureBookingRuntimeBridge(), 'resetShiftSelection', [{
        state,
        clearShiftOptionPanels,
        renderAll,
        persist,
        showHint
      }], null);
    }

    function setPhotoFilter(filter){
      Object.assign(state, { photoFilter: filter });
      renderMediaSections();
      persist();
    }

    function setFaqFilter(filter){
      Object.assign(state, { faqFilter: filter });
      track('faq_filter', {filter});
      renderMediaSections();
      persist();
    }

    bindAgeTabs('desktopAgeTabs');
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      bindAgeTabs('mobileAgeTabs');
    }

    function getShiftDisplayDescription(shift){
      return safeInvoke(ensureShiftOptionsFlow(), 'getShiftDisplayDescription', [shift], '');
    }

    function openShiftAboutModal(shiftId){
      return safeInvoke(ensureShiftOptionsFlow(), 'openShiftAboutModal', [shiftId], false);
    }

    function renderShiftOptions(viewKey){
      return safeInvoke(ensureShiftOptionsFlow(), 'renderShiftOptions', [viewKey], null);
    }

    function renderShiftCards(){
      return safeInvoke(ensureShiftOptionsFlow(), 'renderShiftCards', [], null);
    }

    function contactIconMarkup(label){
      return safeInvoke(ensureMediaFlowApi(), 'contactIconMarkup', [label], '•');
    }

    function resolveFloatingContactLinks(){
      return safeInvoke(ensureMediaFlowApi(), 'resolveFloatingContactLinks', [mediaContent], {
        cityPhoneHref: 'tel:+74951284429',
        cityPhoneLabel: '+7 (495) 128-44-29',
        mobilePhoneHref: 'tel:+79688086455',
        mobilePhoneLabel: '+7 (968) 808-64-55',
        whatsappHref: 'https://wa.me/79688086455',
        telegramHref: 'https://t.me/Progaschool'
      });
    }

    function initFloatingContactsWidget(){
      return safeInvoke(ensureMediaFlowApi(), 'initFloatingContactsWidget', [{
        document,
        mediaContent,
        track
      }], null);
    }

    function socialBadgeMark(item){
      return safeInvoke(ensureMediaFlowApi(), 'socialBadgeMark', [item], '•');
    }

    function socialDisplayName(item){
      return safeInvoke(ensureMediaFlowApi(), 'socialDisplayName', [item], '');
    }

    function faqGlyph(iconPath, groupName){
      return safeInvoke(ensureMediaFlowApi(), 'faqGlyph', [iconPath, groupName], String(groupName || '').slice(0,3).toUpperCase());
    }

    function renderStars(){
      return safeInvoke(ensureMediaFlowApi(), 'renderStars', [], '<div class="stars">★★★★★</div>');
    }

    // SECTION 5: Content and media rendering.
    function renderMediaSections(){
      const flow = ensureMediaSectionsFlow();
      if(!flow || typeof flow.renderMediaSections !== 'function') return;
      flow.renderMediaSections();
    }

    function getMediaFlowInlineApi(){
      return window.AC_FEATURES?.mediaFlowInline || null;
    }

    function buildMediaFlowInlineContext(){
      return {
        document,
        state,
        mediaContent,
        socialDisplayName,
        socialBadgeMark
      };
    }

    function getCompactStayCards(){
      const api = getMediaFlowInlineApi();
      return safeInvoke(api, 'getCompactStayCards', [buildMediaFlowInlineContext()], []);
    }

    function renderCompactInlineStayList(mobileInlineStayList){
      const api = getMediaFlowInlineApi();
      return safeInvoke(api, 'renderCompactInlineStayList', [buildMediaFlowInlineContext(), mobileInlineStayList], null);
    }

    function renderCompactInlineTeamList(mobileInlineTeamList){
      const api = getMediaFlowInlineApi();
      return safeInvoke(api, 'renderCompactInlineTeamList', [buildMediaFlowInlineContext(), mobileInlineTeamList], null);
    }

    function renderCompactInlineContactsList(mobileInlineContactsList){
      const api = getMediaFlowInlineApi();
      return safeInvoke(api, 'renderCompactInlineContactsList', [buildMediaFlowInlineContext(), mobileInlineContactsList], null);
    }

    function renderCompactInlineSocials(mobileInlineSocials){
      const api = getMediaFlowInlineApi();
      return safeInvoke(api, 'renderCompactInlineSocials', [buildMediaFlowInlineContext(), mobileInlineSocials], null);
    }

    function renderCompactTrustPanelContent(){
      const trustPanel = window.AC_FEATURES?.mediaFlowTrustPanel;
      if(!trustPanel || typeof trustPanel.renderCompactTrustPanelContent !== 'function') return;
      trustPanel.renderCompactTrustPanelContent({
        state,
        shifts,
        mediaContent,
        formatPrice,
        shiftDaysLabel,
        getShiftDisplayDescription,
        hasSelectedAge,
        getPhotosForActiveFilter,
        socialBadgeMark,
        socialDisplayName,
        renderCompactInlineTeamList,
        renderCompactInlineStayList,
        renderCompactInlineContactsList,
        renderCompactInlineSocials,
        setPhotoLists: (list = []) => {
          const next = cloneArrayOrEmpty(list);
          photoGalleryList = next.slice();
          activePhotoList = next.slice();
        },
        document
      });
      syncLegalDocLinks();
    }

    function renderDesktopMobileDocsBlock(){
      return safeInvoke(ensureDocsFlow(), 'renderDesktopMobileDocsBlock', [], null);
    }

    function syncMobileDocsExpandedUi(){
      return safeInvoke(ensureDocsFlow(), 'syncMobileDocsExpandedUi', [], null);
    }

    function applyMobileTemplatesToDesktopSections(){
      return safeInvoke(ensureDocsFlow(), 'applyMobileTemplatesToDesktopSections', [], null);
    }

    function applyMobileSectionAccordion(){
      return;
    }

    // SECTION 8: Global orchestrator.
    function renderAll(){
      applyMobileTemplatesToDesktopSections();
      renderShiftOptionsForRenderableViews();
      renderBookingPanels();
      safeInvoke(ensureBookingHintFlow(), 'syncDesktopAgeTapHintVisibility', [], null);
      safeInvoke(ensureBookingHintFlow(), 'scheduleDesktopAgeTapHint', [], null);
      renderMediaSections();
      if(!USE_DESKTOP_BASE_FOR_MOBILE){
        applyMobileSectionAccordion();
      }
      renderDesktopMobileDocsBlock();
      renderSummary();
      syncLegalDocLinks();
    }

    function selectShift(id){
      return safeInvoke(ensureBookingRuntimeBridge(), 'selectShift', [{
        state,
        shiftId: id,
        getShifts: () => shifts,
        clearShiftOptionPanels,
        renderAll,
        persist
      }], false);
    }

    function handlePrimaryCTA(){
      return safeInvoke(ensureBookingRuntimeBridge(), 'handlePrimaryCTA', [{
        state,
        heroVariantState,
        resolveHeroVariantFromUtm,
        HERO_VARIANT_COPY,
        HERO_VARIANT_DEFAULT_TIER,
        hasSelectedAge,
        bookingText,
        track,
        buildHeroVariantMeta,
        showHint,
        nudgeUserToNextStep,
        formatVariantHint,
        getPrimaryActionState,
        runOfferSearch,
        isOfferActive,
        startTimer,
        syncGuidedState,
        getSelectedShift,
        shiftDaysLabel,
        formatPrice,
        ageLabel,
        stripRemainingPrefix,
        formatRemainingCompact,
        selectedShiftPayload,
        simpleModeEnabled: HERO_V3_SIMPLE_ENABLED,
        getSimpleScope: () => (
          state.previewView === 'mobile'
            ? 'booking-mobile'
            : 'booking-desktop'
        ),
        openInlineLead
      }], null);
    }

    function runOfferSearch(){
      return safeInvoke(ensureOfferFlow(), 'runOfferSearch', [{
        state,
        document,
        getSelectedShift,
        nudgeUserToNextStep,
        bookingText,
        bumpOfferRunId: () => {
          offerRunId += 1;
          return offerRunId;
        },
        isOfferRunCurrent: (runId) => runId === offerRunId,
        clearOfferTimeout,
        pushOfferTimeout: (id) => {
          offerTimeoutIds.push(id);
        },
        track,
        selectedShiftPayload,
        applyOfferModalTheme: (cardEl = null) => {
          return safeInvoke(ensureViewModeFlow(), 'applyOfferModalTheme', [cardEl], null);
        },
        normalizeCloseIconButtons,
        showOffer,
        discountFactor: OFFER_DISCOUNT_FACTOR,
        ttlHours: 72
      }], null);
    }

    function openOfferCheck(){
      return safeInvoke(ensureOfferFlow(), 'openOfferCheck', [{
        runOfferSearch
      }], () => runOfferSearch());
    }

    function showOffer(){
      return safeInvoke(ensureOfferFlow(), 'showOffer', [{
        state,
        document,
        getSelectedShift,
        featureOfferUtils: window.AC_FEATURES && window.AC_FEATURES.offerUtils,
        discountFactor: OFFER_DISCOUNT_FACTOR,
        ttlHours: 72,
        generateCode,
        persist,
        track,
        selectedShiftPayload,
        applyOfferModalTheme: (cardEl = null) => {
          return safeInvoke(ensureViewModeFlow(), 'applyOfferModalTheme', [cardEl], null);
        },
        formatPrice,
        normalizeCloseIconButtons,
        startTimer,
        renderSummary,
        renderBookingPanels
      }], null);
    }

    function saveOfferAndClose(){
      return safeInvoke(ensureOfferFlow(), 'saveOfferAndClose', [{
        syncGuidedState,
        clearOfferTimeout,
        document,
        renderSummary,
        renderBookingPanels
      }], null);
    }

    function resetOfferProgressUI(){
      return safeInvoke(ensureOfferFlow(), 'resetOfferProgressUI', [{
        clearOfferTimeout,
        state
      }], () => {
        clearOfferTimeout();
        Object.assign(state, { offerSearching: false });
      });
    }

    function startTimer(){
      return safeInvoke(ensureSummaryFlow(), 'startTimer', [], null);
    }

    function isSummaryCompactMode(){
      if(state.previewView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE){
        return state.mobileMode === 'compact';
      }
      return state.desktopMode === 'compact';
    }

    function isSummaryBelowHero(){
      return !!safeInvoke(ensureSummaryFlow(), 'isSummaryBelowHero', [], true);
    }

    function isBookingPrimaryCtaVisibleInViewport(){
      return !!safeInvoke(ensureSummaryFlow(), 'isBookingPrimaryCtaVisibleInViewport', [], false);
    }

    function updateSummaryBarVisibility(){
      return safeInvoke(ensureSummaryFlow(), 'updateSummaryBarVisibility', [], null);
    }

    function dismissSummaryBarTemporarily(ms = 30000){
      return safeInvoke(ensureSummaryFlow(), 'dismissSummaryBarTemporarily', [ms], null);
    }

    function renderSummary(){
      return safeInvoke(ensureSummaryFlow(), 'renderSummary', [], null);
    }

    function onlyDigits(value){
      return safeInvoke(ensureBookingInlineLeadApi(), 'onlyDigits', [value], (value || '').replace(/\D/g, ''));
    }

    function formatPhoneInput(value){
      return safeInvoke(ensureBookingInlineLeadApi(), 'formatPhoneInput', [value], () => String(value || ''));
    }

    function normalizePhone(value){
      return safeInvoke(ensureBookingInlineLeadApi(), 'normalizePhone', [value], '');
    }

    function isValidPhone(value){
      return !!safeInvoke(ensureBookingInlineLeadApi(), 'isValidPhone', [value], () => !!normalizePhone(value));
    }

    function getLeadScopeConfig(scope = 'drawer'){
      return safeInvoke(ensureBookingInlineLeadApi(), 'getLeadScopeConfig', [scope], null);
    }

    function getLeadSubmitDefaultText(scope = 'drawer'){
      return safeInvoke(ensureBookingInlineLeadApi(), 'getLeadSubmitDefaultText', [scope], 'Забронировать');
    }

    function setLeadPhoneError(scope = 'drawer', show = false, message = ''){
      safeInvoke(ensureBookingInlineLeadApi(), 'setLeadPhoneError', [{
        scope,
        show,
        message,
        document
      }], null);
    }

    function setPhoneError(show){
      setLeadPhoneError('drawer', show);
    }

    function setLeadSubmitState(loading, scope = 'drawer'){
      safeInvoke(ensureBookingInlineLeadApi(), 'setLeadSubmitState', [{
        loading,
        scope,
        document
      }], null);
    }

    function bindPhoneMaskForScope(scope = 'drawer'){
      safeInvoke(ensureBookingInlineLeadApi(), 'bindPhoneMaskForScope', [{
        scope,
        document
      }], null);
    }

    function buildInlineLeadFormHtml(scope){
      return safeInvoke(ensureBookingInlineLeadApi(), 'buildInlineLeadFormHtml', [scope], '');
    }

    function openInlineLead(scope){
      safeInvoke(ensureBookingInlineLeadApi(), 'openInlineLead', [{
        scope,
        state,
        document,
        track,
        selectedShiftPayload,
        buildHeroVariantMeta
      }], null);
    }

    function closeInlineLead(scope){
      safeInvoke(ensureBookingInlineLeadApi(), 'closeInlineLead', [{
        scope,
        document
      }], null);
    }

    function openForm(){
      safeInvoke(ensureBookingInlineLeadApi(), 'openForm', [{
        state,
        document,
        syncGuidedState,
        buildBookingSummaryHtml,
        isOfferActive,
        startTimer,
        track,
        selectedShiftPayload,
        buildHeroVariantMeta
      }], null);
    }

    function closeForm(){
      safeInvoke(ensureBookingInlineLeadApi(), 'closeForm', [{ document }], null);
    }

    function openSuccessModal(deliveryResult){
      safeInvoke(ensureOverlayFlow(), 'openSuccessModal', [deliveryResult], null);
    }

    function closeSuccessModal(){
      safeInvoke(ensureOverlayFlow(), 'closeSuccessModal', [], null);
    }

    function openNoticeModal(message, title = 'Проверьте данные'){
      safeInvoke(ensureOverlayFlow(), 'openNoticeModal', [message, title], null);
    }

    function closeNoticeModal(){
      safeInvoke(ensureOverlayFlow(), 'closeNoticeModal', [], null);
    }

    function openResetBookingConfirmModal(){
      safeInvoke(ensureOverlayFlow(), 'openResetBookingConfirmModal', [], null);
    }

    async function submitLeadFromScope(scope = 'drawer'){
      await safeInvoke(ensureBookingInlineLeadApi(), 'submitLeadFromScope', [{
        scope,
        state,
        shifts,
        document,
        getInProgress: () => leadSubmitInProgress,
        setInProgress: (next) => {
          leadSubmitInProgress = !!next;
        },
        syncGuidedState,
        normalizePhone,
        isValidPhone,
        setLeadPhoneError,
        setLeadSubmitState,
        openNoticeModal,
        persist,
        labelAge,
        formatPrice,
        buildAbMeta,
        track,
        selectedShiftPayload,
        buildHeroVariantMeta,
        notifyLead,
        closeForm,
        closeInlineLead,
        renderSummary,
        renderBookingPanels,
        updateSummaryBarVisibility,
        isAdminDebugSession
      }], null);
    }

    async function submitLead(){
      return submitLeadFromScope('drawer');
    }

    function scrollToSection(id){
      return safeInvoke(ensureNavigationFlow(), 'scrollToSection', [id], false);
    }

    function navigateToSection(id){
      return safeInvoke(ensureNavigationFlow(), 'navigateToSection', [id], null);
    }

    safeInvoke(ensureMediaGestureBindingsApi(), 'init', [{
      document,
      closeMedia,
      nextMedia,
      prevMedia,
      applyStatePatch: (patch = {}) => {
        Object.assign(state, patch);
      },
      renderCompactTrustPanelContent,
      persist,
      getMediaContent: () => mediaContent,
      getCompactStayCards,
      getPhotosForActiveFilter,
      getState: () => state
    }], null);

    safeInvoke(ensureGlobalUiBindingsApi(), 'init', [{
      document,
      navigateToSection,
      isHeroMenuOpen,
      setHeroMenuOpen,
      isHeroPhoneDropdownOpen,
      setHeroPhoneDropdownOpen,
      closeSuccessModal,
      closeNoticeModal,
      bumpOfferRunId: () => { offerRunId += 1; },
      clearOfferTimeout,
      resetOfferProgressUI,
      closeMedia,
      nextMedia,
      prevMedia,
      closeVideo,
      closeCalendar,
      closeSectionModal,
      openNoticeModal,
      bookingText,
      getViewportPreviewView,
      switchView,
      initHero,
      applyHeroAbVariant,
      applyCompactSectionModalLayout,
      updateSummaryBarVisibility,
      scheduleBookingCardMinHeightSync,
      getState: () => state,
      getHeroResizeTimer: () => heroResizeTimer,
      setHeroResizeTimer: (next) => { heroResizeTimer = next || null; }
      ,
      setPhotoFilter,
      setFaqFilter,
      openSectionModal,
      track,
      showHint,
      nudgeUserToNextStep,
      hasSelectedAge,
      getBookingState: () => state,
      openVideo,
      selectedShiftPayload,
      buildHeroVariantMeta,
      bookingDesktopIds: BOOKING_VIEWS.desktop,
      bookingMobileIds: BOOKING_VIEWS.mobile
    }], null);

    heroAbVariant = safeInvoke(ensureHeroAbFlow(), 'resolveHeroAbVariant', [], heroAbVariant) || heroAbVariant;
    applyHeroV3SimpleMode();
    preloadHeroAssets();
    initHero();
    applyHeroAbVariant();
    initHeroVariantPersonalization();
    loadVideoMetaCache();

    renderShiftOptionsForRenderableViews();
    renderShiftCards();
    renderMediaSections();
    renderSummary();
    renderBookingPanels();
    resetOfferProgressUI();
    switchView(getViewportPreviewView());
    safeInvoke(ensureViewModeFlow(), 'applyHeroContrastMode', [], null);
    safeInvoke(ensureViewModeFlow(), 'applyHeroMicroMode', [], null);
    safeInvoke(ensureViewModeFlow(), 'applyOfferModalTheme', [], null);
    applyOfferLayoutMode();
    safeInvoke(ensureViewModeFlow(), 'applyDesktopMode', [], null);
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      safeInvoke(ensureViewModeFlow(), 'applyMobileMode', [], null);
    }
    normalizeCloseIconButtons();
    const deferredInit = () => {
      injectHeroSeasonOfferCta();
      initFloatingContactsWidget();
      safeInvoke(ensureHeroAbFlow(), 'initHeroAbDevPanel', [], null);
      track('page_view', {
        view: state.view || 'desktop',
        desktop_mode: state.desktopMode || '',
        mobile_mode: state.mobileMode || ''
      });
      initScrollTracking();
      initSummaryBarViewportSync();
      initSectionViewTracking();
      refreshVideoMeta({force:true});
      scheduleVideoMetaRefresh();
      safeInvoke(ensureBookingHintFlow(), 'scheduleDesktopAgeTapHint', [], null);
      runQualityPipelineAll();
    };
    window.setTimeout(deferredInit, 0);

    if(state.expiresAt && Date.now() < state.expiresAt){
      startTimer();
    }
