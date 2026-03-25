    const shifts = [
      {id:'shift-1',title:'1 смена',dates:'30 мая — 8 июня',start:'2025-05-30',end:'2025-06-08',price:94800,left:12,occupied:33,badge:'HIT',desc:'Визуальное программирование, первые игры, логика.'},
      {id:'shift-2',title:'2 смена',dates:'10 июня — 16 июня',start:'2025-06-10',end:'2025-06-16',price:57600,left:8,occupied:37,badge:'',desc:'Python, веб-проекты и командные мини-спринты.'},
      {id:'shift-3',title:'3 смена',dates:'16 июня — 23 июня',start:'2025-06-16',end:'2025-06-23',price:78000,left:5,occupied:40,badge:'',desc:'AI-практика, анализ данных, проектная защита.'},
      {id:'shift-4',title:'4 смена',dates:'10 июня — 23 июня',start:'2025-06-10',end:'2025-06-23',price:114000,left:14,occupied:31,badge:'',desc:'Длинная смена: полный цикл обучения и проектной практики.'},
      {id:'shift-5',title:'5 смена',dates:'3 августа — 15 августа',start:'2025-08-03',end:'2025-08-15',price:107280,left:10,occupied:29,badge:'',desc:'Летняя смена: проекты, спорт и командный формат с фокусом на результат.'},
      {id:'shift-6',title:'6 смена',dates:'17 августа — 26 августа',start:'2025-08-17',end:'2025-08-26',price:83520,left:9,occupied:27,badge:'',desc:'Финальная смена сезона: закрепление навыков и защита мини-проектов.'}
    ];

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
          icon:'/assets/icons/med.svg',
          items:[
            {q:'Есть ли медик в лагере?',a:'Медработник на территории 24/7 всю смену.'},
            {q:'Что если ребёнок заболеет?',a:'Медик осматривает, при необходимости вызывает скорую. Вы получите звонок сразу.'},
            {q:'Можно давать лекарства?',a:'Передайте медику с инструкцией — будет выдавать по расписанию.'}
          ]
        },
        {
          group:'Безопасность',
          icon:'/assets/icons/lock.svg',
          items:[
            {q:'Территория закрыта?',a:'Да, огорожена, КПП с охраной. Посторонние не допускаются.'},
            {q:'Сколько детей на вожатого?',a:'Не более 8–10 детей, вожатые работают в парах.'}
          ]
        },
        {
          group:'Питание',
          icon:'/assets/icons/food.svg',
          items:[
            {q:'Сколько раз кормят?',a:'5 раз в день: завтрак, второй завтрак, обед, полдник, ужин. Всё горячее.'},
            {q:'Учитываются аллергии?',a:'Да. В лагере гипоаллергенная среда: минимум растений, которые вызывают аллергию.'}
          ]
        },
        {
          group:'Проживание',
          icon:'/assets/icons/check.svg',
          items:[
            {q:'Сколько детей в комнате?',a:'2–4 человека, все удобства на этаже.'}
          ]
        },
        {
          group:'Связь',
          icon:'/assets/icons/phone-mobile.svg',
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
          avatarUrl:'/assets/images/cdn-cache/15b41072_photo.png',
          bio:'предприниматель в сфере детского IT-образования и мама подростка, которая строит лагерь таким, каким сама хотела бы видеть обучение своего ребёнка.'
        },
        {
          teamId:'team_02',
          bindKey:'никита_брагин',
          fio:'Никита Брагин',
          role:'преподаватель Scratch, Minecraft и Python',
          avatarUrl:'/assets/images/cdn-cache/dc9ef9b6_photo.png',
          bio:'автор учебника по разработке игр; специализируется на геймдеве и помогает детям создавать собственные игровые миры.'
        },
        {
          teamId:'team_03',
          bindKey:'александр_ташкин',
          fio:'Александр Ташкин',
          role:'преподаватель Scratch, Minecraft и Python',
          avatarUrl:'/assets/images/cdn-cache/1e93e3b8_photo.png',
          bio:'соавтор учебника по разработке игр; умеет зажигать интерес к программированию через практические задачи и командные проекты.'
        },
        {
          teamId:'team_04',
          bindKey:'омар_алхамви',
          fio:'Омар Алхамви',
          role:'преподаватель Python и нейросетей',
          avatarUrl:'/assets/images/cdn-cache/67852b0a_photo.png',
          bio:'работает со старшими и продвинутыми группами, часть занятий ведёт на английском и показывает, как применять AI в реальных проектах.'
        },
        {
          teamId:'team_05',
          bindKey:'дарья_воронцова',
          fio:'Дарья Воронцова',
          role:'преподаватель Python и Scratch',
          avatarUrl:'/assets/images/cdn-cache/791a236a_ChatGPT_Image_18__20.png',
          bio:'помогает детям легко войти в программирование через игры, логику и первые самостоятельные программы.'
        }
      ],
      photos: [
        {cat:'all',src:'/assets/images/atmosphere-pool-kids.jpeg',alt:'Атмосфера лагеря'},
        {cat:'all',src:'/assets/images/cdn-cache/a5f92a14_photo_2025-06-14_08-.jpg',alt:'all'},
        {cat:'all',src:'/assets/images/cdn-cache/8cca10f8_photo.jpg',alt:'all'},
        {cat:'all',src:'/assets/images/cdn-cache/1ac9b8f7_photo_2025-06-14_08-.jpg',alt:'all'},
        {cat:'all',src:'/assets/images/cdn-cache/1063273d_photo_2025-06-17_13-.jpg',alt:'all'},
        {cat:'study',src:'/assets/images/cdn-cache/a591ceb9_IMG_1543.JPG',alt:'study'},
        {cat:'food',src:'/assets/images/cdn-cache/9e4f4646_photo_2025-06-14_08-.jpg',alt:'food'},
        {cat:'food',src:'/assets/images/cdn-cache/8aee104b_photo_2025-06-14_08-.jpg',alt:'food'},
        {cat:'food',src:'/assets/images/cdn-cache/5babf9c8_photo.jpg',alt:'food'},
        {cat:'study',src:'/assets/images/cdn-cache/d8b90de0_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'/assets/images/cdn-cache/7e509c20_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'/assets/images/cdn-cache/81652cd9_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'/assets/images/cdn-cache/0e2e55a2_photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'pool',src:'/assets/images/pool-kids-training.webp',alt:'Бассейн'},
        {cat:'pool',src:'/assets/images/cdn-cache/0d2ab9ef_photo_2025-06-14_08-.jpg',alt:'pool'},
        {cat:'pool',src:'/assets/images/cdn-cache/6a17713f_photo_2025-06-14_08-.jpg',alt:'pool'},
        {cat:'sport',src:'/assets/images/cdn-cache/cab7c193_photo.jpg',alt:'sport'},
        {cat:'sport',src:'/assets/images/cdn-cache/841dac3d_photo_2025-06-14_07-.jpg',alt:'sport'},
        {cat:'sport',src:'/assets/images/cdn-cache/e7095a88_photo_2025-06-14_08-.jpg',alt:'sport'}
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
    const DEBUG_UI = false;
    const MOBILE_AGE_GATE_SHOWN_KEY = 'aidacamp_mobile_age_gate_shown_v1';
    const VIDEO_META_CACHE_KEY = 'aidacamp_video_meta_cache_v1';
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
    state.desktopMode = state.desktopMode || 'full';
    state.mobileMode = state.mobileMode || 'full';
    state.ageSelected = typeof state.ageSelected === 'boolean' ? state.ageSelected : false;
    state.photoFilter = state.photoFilter || 'camp';
    state.faqFilter = state.faqFilter || 'Медицина';
    state.mobilePhotoIndex = Number.isFinite(state.mobilePhotoIndex) ? state.mobilePhotoIndex : 0;
    state.mobileVideoIndex = Number.isFinite(state.mobileVideoIndex) ? state.mobileVideoIndex : 0;
    state.mobileReviewIndex = Number.isFinite(state.mobileReviewIndex) ? state.mobileReviewIndex : 0;
    state.mobileFaqGroup = state.mobileFaqGroup || state.faqFilter || 'Медицина';
    state.mobileFaqOpenKey = state.mobileFaqOpenKey || '';
    state.mobileTeamIndex = Number.isFinite(state.mobileTeamIndex) ? state.mobileTeamIndex : 0;
    state.mobileJourneyStep = Number.isFinite(state.mobileJourneyStep) ? state.mobileJourneyStep : 0;
    state.mobileProgramShiftId = state.mobileProgramShiftId || '';
    state.mobileDocsExpanded = typeof state.mobileDocsExpanded === 'boolean' ? state.mobileDocsExpanded : false;
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

    function track(event, params = {}){
      try {
        if(typeof ym !== 'undefined'){
          ym(METRIKA_ID, 'reachGoal', event, params);
        }
      } catch (err){
        console.warn('Metrika track error:', event, err);
      }
      if(DEBUG_UI){
        console.log('[TRACK]', event, params);
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
      '/assets/images/cdn-cache/0b6b9a8c_day.png',
      '/assets/images/cdn-cache/4e868442_photo.png',
      '/assets/images/cdn-cache/ce98dc63_photo.png'
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

    function openMedia(type, index){
      closeTransientModals('media');
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

    function openSectionModal(sectionId){
      const modal = document.getElementById('sectionModal');
      const titleEl = document.getElementById('sectionModalTitle');
      const bodyEl = document.getElementById('sectionModalBody');
      const sourceSection = document.getElementById(sectionId);
      if(!modal || !titleEl || !bodyEl || !sourceSection) return false;
      closeTransientModals('section');
      const isCompactDesktop = state.view === 'desktop' && state.desktopMode === 'compact';
      const isMobilePanel = state.view === 'mobile';
      modal.classList.toggle('section-modal-compact', isCompactDesktop);
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
          state.mobilePhotoIndex = Math.max(0, index);
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-video-select'){
        const index = Number(actionEl.dataset.videoIndex || 0);
        if(Number.isFinite(index)){
          state.mobileVideoIndex = Math.max(0, index);
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-review-select'){
        const index = Number(actionEl.dataset.reviewIndex || 0);
        if(Number.isFinite(index)){
          state.mobileReviewIndex = Math.max(0, index);
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
          state.mobileFaqOpenKey = state.mobileFaqOpenKey === key ? '' : key;
          renderCompactTrustPanelContent();
          persist();
        }
        return true;
      }

      if(action === 'mobile-team-prev' || action === 'mobile-team-next'){
        const list = mediaContent.team.filter((item) => item.fio !== 'Дарья Афанасьева');
        if(list.length){
          const delta = action === 'mobile-team-next' ? 1 : -1;
          state.mobileTeamIndex = (state.mobileTeamIndex + delta + list.length) % list.length;
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
        state.offerStage = Math.max(state.offerStage, 1);
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
        console.warn('[LEAD_MOCK_FALLBACK]', {endpoint, body});
        return {ok: false, delivered: false, fallback: true};
      } catch(error){
        console.error('notifyLead error', error);
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

      const keepView = state.view || 'desktop';
      const keepDesktopMode = state.desktopMode || 'full';
      const keepMobileMode = state.mobileMode || 'full';
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
      applyDesktopMode();
      applyMobileMode();
      persist();
      showHint('Сценарий бронирования сброшен. Начните с выбора возраста.');
    }

    function getShiftContextLine(shift){
      if(!shift) return '';
      if(!hasSelectedAge()){
        return 'Сначала выберите возраст ребёнка, чтобы увидеть персональную подсказку.';
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
          text:'Выберите смену',
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
      const cardId = prefix === 'desktop' ? 'desktop-booking-card' : `${prefix}BookingCard`;
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
        el.classList.remove('pulse');
        if(num < current) el.classList.add('done');
        if(num === current){
          el.classList.add('active');
          el.classList.add('pulse');
        }
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

      shiftList.classList.remove('disabled','highlight','collapsed');
      ctaWrap.classList.remove('highlight');
      ageTabs.classList.remove('hidden');
      ageChip.classList.remove('visible');
      shiftChip.classList.remove('visible');

      if(!hasSelectedAge()){
        shiftList.classList.add('disabled');
        return;
      }

      ageChipText.textContent = `Возраст: ${ageLabel(state.age)}`;
      ageChip.classList.add('visible');
      ageTabs.classList.add('hidden');

      if(hasSelectedAge() && !state.shiftId){
        shiftList.classList.remove('collapsed');
        shiftList.classList.add('highlight');
        return;
      }

      const shift = getSelectedShift();
      if(shift){
        shiftChipText.textContent = `Смена: ${shift.title} · ${shift.dates}`;
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

    function nudgeUserToNextStep(message = 'Сначала завершите предыдущий шаг.'){
      const prefixes = state.view === 'mobile' ? ['mobile'] : ['desktop'];
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
      ['desktop', 'mobile'].forEach((prefix) => {
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
        if(lead) lead.textContent = 'Сначала выберите возраст, чтобы активировать список смен.';
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
      renderBookingInfo(
        'desktop-booking-info',
        'desktopBookingTitle',
        'desktopBookingLead',
        'desktopStartBtn',
        'desktopBookingHint'
      );

      renderBookingInfo(
        'mobile-booking-info',
        'mobileBookingTitle',
        'mobileBookingLead',
        'mobileStartBtn',
        'mobileBookingHint'
      );

      renderSteps('desktopBookingSteps');
      renderSteps('mobileBookingSteps');
      renderGuidedState('desktop');
      renderGuidedState('mobile');
      applyBookingStageClass('desktop');
      applyBookingStageClass('mobile');
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
      const showSticky = state.view === 'mobile' && !hasSelectedAge();
      sticky.classList.toggle('hidden', !showSticky);

      if(showSticky){
        trackOncePerSession('mobile_age_gate_shown', MOBILE_AGE_GATE_SHOWN_KEY, {
          mode: state.mobileMode || 'full'
        });
      }
    }

    function switchView(view){
      state.view = view;
      document.getElementById('desktopBtn').classList.toggle('active', view === 'desktop');
      document.getElementById('mobileBtn').classList.toggle('active', view === 'mobile');
      document.getElementById('desktopView').classList.toggle('hidden', view !== 'desktop');
      document.getElementById('mobileView').classList.toggle('hidden', view !== 'mobile');
      const desktopModeWrap = document.getElementById('desktopModeWrap');
      if(desktopModeWrap){
        desktopModeWrap.classList.toggle('hidden', view !== 'desktop');
      }
      if(view !== 'desktop'){
        closeSectionModal();
      }
      updateMobileAgeGateUi();
      persist();
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }

    function applyDesktopMode(){
      const desktopView = document.getElementById('desktopView');
      const fullBtn = document.getElementById('fullModeBtn');
      const compactBtn = document.getElementById('compactModeBtn');

      desktopView.classList.toggle('compact-mode', state.desktopMode === 'compact');
      fullBtn.classList.toggle('active', state.desktopMode === 'full');
      compactBtn.classList.toggle('active', state.desktopMode === 'compact');
    }

    function switchDesktopMode(mode){
      state.desktopMode = mode;
      applyDesktopMode();
      if(mode !== 'compact'){
        closeSectionModal();
      }
      persist();
    }

    function applyMobileMode(){
      const mobileView = document.getElementById('mobileView');
      const fullBtn = document.getElementById('mobileFullModeBtn');
      const compactBtn = document.getElementById('mobileCompactModeBtn');
      if(!mobileView || !fullBtn || !compactBtn) return;

      mobileView.classList.toggle('mobile-compact-mode', state.mobileMode === 'compact');
      fullBtn.classList.toggle('active', state.mobileMode === 'full');
      compactBtn.classList.toggle('active', state.mobileMode === 'compact');
      updateMobileAgeGateUi();
    }

    function switchMobileMode(mode){
      state.mobileMode = mode;
      applyMobileMode();
      persist();
    }

    document.getElementById('desktopBtn').addEventListener('click', () => switchView('desktop'));
    document.getElementById('mobileBtn').addEventListener('click', () => switchView('mobile'));
    document.getElementById('fullModeBtn').addEventListener('click', () => switchDesktopMode('full'));
    document.getElementById('compactModeBtn').addEventListener('click', () => switchDesktopMode('compact'));
    document.getElementById('mobileFullModeBtn').addEventListener('click', () => switchMobileMode('full'));
    document.getElementById('mobileCompactModeBtn').addEventListener('click', () => switchMobileMode('compact'));

    document.addEventListener('click', (e) => {
      if(handleDataActionClick(e.target)){
        return;
      }

      const photoFilterBtn = e.target.closest('[data-photo-filter]');
      if(photoFilterBtn){
        setPhotoFilter(photoFilterBtn.dataset.photoFilter);
        const sectionModal = document.getElementById('sectionModal');
        const sectionModalOpened = !!(sectionModal && !sectionModal.classList.contains('hidden'));
        if((state.view === 'desktop' && state.desktopMode === 'compact') || (state.view === 'mobile' && sectionModalOpened)){
          openSectionModal('section-photos');
        }
        return;
      }

      const faqFilterBtn = e.target.closest('[data-faq-filter]');
      if(faqFilterBtn){
        setFaqFilter(faqFilterBtn.dataset.faqFilter);
        const sectionModal = document.getElementById('sectionModal');
        const sectionModalOpened = !!(sectionModal && !sectionModal.classList.contains('hidden'));
        if((state.view === 'desktop' && state.desktopMode === 'compact') || (state.view === 'mobile' && sectionModalOpened)){
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

      const shiftWrap = e.target.closest('#desktopShiftOptions, #mobileShiftOptions');
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
      renderShiftOptions(safeView === 'mobile' ? 'mobileShiftOptions' : 'desktopShiftOptions');
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
      state.offerStage = 0;
      state.offerPrice = null;
      state.code = null;
      state.expiresAt = null;
      state.offerSearching = false;
      if(!preserveShift){
        state.shiftId = null;
        state.basePrice = null;
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
          state.age = btn.dataset.age;
          state.ageSelected = true;
          state.shiftId = null;
          state.basePrice = null;
          state.offerPrice = null;
          state.code = null;
          state.expiresAt = null;
          state.offerStage = 0;
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
      state.age = null;
      state.ageSelected = false;
      state.shiftId = null;
      state.basePrice = null;
      state.offerPrice = null;
      state.code = null;
      state.expiresAt = null;
      state.offerStage = 0;

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
                <span aria-hidden="true">📅</span>
                <span>календарь</span>
              </button>
            </span>
          </div>
          <p>${s.desc}</p>
          <div class="shift-context-line">${getShiftContextLine(s)}</div>
        </div>
      `).join('');

      if(shortGrid){
        shortGrid.innerHTML = shortShifts.map((s, idx) => `
          <div class="mini-card short-shift-card">
            <div class="short-shift-head">
              <h4>Смена 2.${idx + 1}</h4>
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
        city_phone:'/assets/icons/phone-city.svg',
        mobile_phone:'/assets/icons/phone-mobile.svg',
        whatsapp:'/assets/icons/whatsapp.svg',
        telegram:'/assets/icons/telegram.svg'
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
              <img src="${item.cover || '/assets/video-covers/cover-week-change.jpg'}" alt="${item.title}">
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
              src="/assets/images/cdn-cache/8fc8172e_8991804334.webp"
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
                  <img class="ac-icon" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true">
                </button>
                <div class="team-carousel" id="teamCarousel">${carouselCards}</div>
                <button class="team-carousel-nav next" type="button" data-action="team-carousel-next" aria-label="Следующие преподаватели">
                  <img class="ac-icon" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
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
        state.mobileJourneyStep = safeStep;
        const activeStep = steps[safeStep];

        mobileJourneyContent.innerHTML = `
          <article class="mobile-journey-active">
            <div class="mobile-journey-active-index">${safeStep + 1}</div>
            <strong>${activeStep.title}</strong>
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
          state.mobileProgramShiftId = activeShiftId;
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
                <span aria-hidden="true">📅</span><span>Календарь</span>
              </button>
              ${hasSelectedAge()
                ? ''
                : '<div class="mobile-program-hint">Сначала выберите возраст ребёнка, чтобы увидеть персональную подсказку.</div>'}
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
        state.mobilePhotoIndex = activeIndex;
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
        state.mobileVideoIndex = activeIndex;
        const active = list[activeIndex];

        if(active){
          mobileVideoGallery.innerHTML = `
            <div class="mobile-media-stage">
              <button type="button" data-action="open-video" data-video="${active.url}">
                <img src="${active.cover}" alt="${active.title}">
                <span class="mobile-media-play"><img class="ac-icon" src="/assets/icons/play.svg" alt="" aria-hidden="true"></span>
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
        state.mobileReviewIndex = activeIndex;
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
              <img class="ac-icon" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
            </button>
            <div class="mobile-faq-answer">${item.a}</div>
          </article>
        `).join('');
      }

      if (mobileInlineTeamList) {
        const founder = mediaContent.team.find((item) => item.fio === 'Дарья Афанасьева') || mediaContent.team[0];
        const teachers = mediaContent.team.filter((item) => item.fio !== founder?.fio);
        const safeIndex = teachers.length ? ((state.mobileTeamIndex % teachers.length) + teachers.length) % teachers.length : 0;
        state.mobileTeamIndex = safeIndex;
        const activeTeacher = teachers[safeIndex];

        mobileInlineTeamList.innerHTML = `
          <article class="mobile-team-feature-card">
            <div class="mobile-team-feature-cover-wrap">
              <img class="mobile-team-feature-cover" src="/assets/images/cdn-cache/8fc8172e_8991804334.webp" alt="Собственная книга по Python">
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
                    <img class="ac-icon" src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true">
                  </button>
                  <button type="button" data-action="mobile-team-next" aria-label="Следующий преподаватель">
                    <img class="ac-icon" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
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
              <img class="ac-icon" src="/assets/icons/chevron-right.svg" alt="" aria-hidden="true">
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
      renderShiftOptions('desktopShiftOptions');
      renderShiftOptions('mobileShiftOptions');
      renderBookingPanels();
      renderGuidedState('desktop');
      renderGuidedState('mobile');
      renderMediaSections();
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
        if(state.view === 'mobile'){
          track('mobile_price_or_booking_started', {
            mode: state.mobileMode || 'full',
            age: state.age || '',
            shift_id: state.shiftId || ''
          });
        }
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
      state.offerSearching = true;
      clearOfferTimeout();
      track('offer_open', selectedShiftPayload());
      track('offer_start', selectedShiftPayload());
      wrap.classList.remove('hidden');

      card.innerHTML = `
        <div class="offer-headline">
          <h3>Ищем лучшую цену</h3>
          <button class="form-close offer-close-btn" type="button" data-action="close-offer" aria-label="Закрыть">×</button>
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

      if(state.offerStage === 0){
        state.offerPrice = Math.round(state.basePrice * 0.96);
        state.expiresAt = Date.now() + 72 * 60 * 60 * 1000;
        state.offerStage = 1;
      } else if(state.offerStage === 1 && state.expiresAt && Date.now() < state.expiresAt){
        state.offerPrice = Math.round(state.offerPrice * 0.97);
        state.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
        state.offerStage = 2;
      }

      state.code = generateCode();
      state.offerSearching = false;
      persist();
      track('offer_complete', selectedShiftPayload());

      card.innerHTML = `
        <div class="offer-headline">
          <h3>${state.offerStage === 2 ? 'Рады, что вы вернулись' : 'Удалось закрепить цену'}</h3>
          <button class="form-close offer-close-btn" type="button" data-action="close-offer" aria-label="Закрыть">×</button>
        </div>
        <p>${state.offerStage === 2 ? 'Мы смогли ещё немного улучшить условия. Эта цена действует 24 часа.' : 'Ваша цена сохранится на ограниченное время, чтобы вы могли спокойно принять решение.'}</p>
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

      if(!state.shiftId){
        bar.classList.add('hidden');
        document.body.classList.remove('summary-visible');
        renderBookingPanels();
        return;
      }

      const shift = shifts.find(s => s.id === state.shiftId);
      const price = state.offerPrice || state.basePrice || shift.price;

      document.getElementById('summaryMain').textContent = `${labelAge(state.age)} · ${shift.title}`;
      document.getElementById('summaryMeta').textContent = `${shift.dates}${state.code ? ` · Код ${state.code}` : ''}`;
      document.getElementById('summaryPrice').textContent = formatPrice(price);

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
      if(formLead){
        formLead.textContent = `${shift.title} · ${shift.dates} · ${labelAge(state.age)} · ${formatPrice(price)}${state.code ? ` · Код ${state.code}` : ''}`;
      }

      const phoneInput = document.getElementById('parentPhone');
      document.getElementById('parentPhone').value = state.phone || '';
      if(phoneInput) phoneInput.value = formatPhoneInput(state.phone || '');
      const bookingSummaryBox = document.getElementById('bookingSummaryBox');
      if(bookingSummaryBox) bookingSummaryBox.innerHTML = buildBookingSummaryHtml();
      setPhoneError(false);
      setLeadSubmitState(false);
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
        if(deliveryResult && deliveryResult.ok === false){
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

    async function submitLead(){
      if(leadSubmitInProgress) return;
      syncGuidedState();
      const name = document.getElementById('parentName').value.trim();
      const phoneRaw = document.getElementById('parentPhone').value.trim();
      const phone = normalizePhone(phoneRaw);
      const consent = document.getElementById('consentCheck').checked;

      if(!name || !phoneRaw || !consent){
        if(!phoneRaw) setPhoneError(true);
        alert('Заполните имя, телефон и подтвердите согласие.');
        return;
      }

      if(!isValidPhone(phoneRaw)){
        setPhoneError(true);
        alert('Проверьте номер телефона.');
        return;
      }

      setPhoneError(false);
      leadSubmitInProgress = true;
      setLeadSubmitState(true);

      state.phone = phone;
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
        promo_status: state.offerPrice ? (state.offerStage >= 2 ? 'improved_again' : 'fixed') : 'none',
        mode: state.view === 'mobile'
          ? `mobile:${state.mobileMode || 'full'}`
          : `desktop:${state.desktopMode || 'full'}`,
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
      const cleanId = String(id || '').replace(/^#/, '');
      if(!cleanId) return false;

      const mobileMap = {
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
      };

      const targetId = state.view === 'mobile'
        ? (mobileMap[cleanId] || cleanId)
        : cleanId;
      const el = document.getElementById(targetId) || document.getElementById(cleanId);
      if(!el) return false;

      el.scrollIntoView({behavior:'smooth', block:'start'});
      return true;
    }

    function navigateToSection(id){
      const cleanId = String(id || '').replace(/^#/, '');
      if(!cleanId) return;

      if(state.view === 'mobile' && cleanId === 'section-programs' && !hasSelectedAge()){
        track('mobile_shifts_click_without_age', {
          mode: state.mobileMode || 'full'
        });
        showHint('Сначала выберите возраст ребёнка', 'age');
        focusMobileAgeGate();
        return;
      }

      if(state.view === 'mobile' && cleanId === 'section-programs' && hasSelectedAge()){
        track('mobile_shifts_opened_after_age', {
          mode: state.mobileMode || 'full',
          age: state.age || ''
        });
      }

      const isDesktopCompact = state.view === 'desktop' && state.desktopMode === 'compact';
      const isMobileCompact = state.view === 'mobile' && state.mobileMode === 'compact';

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

    const successOverlay = document.getElementById('successOverlay');
    if(successOverlay){
      successOverlay.addEventListener('click', (e) => {
        if(e.target.id === 'successOverlay') closeSuccessModal();
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
    }

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
        initHero();
      }, 160);
    }, {passive:true});

    initHero();
    loadVideoMetaCache();

    renderShiftOptions('desktopShiftOptions');
    renderShiftOptions('mobileShiftOptions');
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
    initSectionViewTracking();
    switchView(state.view || 'desktop');
    applyDesktopMode();
    applyMobileMode();
    refreshVideoMeta();
    scheduleVideoMetaRefresh();

    if(state.expiresAt && Date.now() < state.expiresAt){
      startTimer();
    }
  
