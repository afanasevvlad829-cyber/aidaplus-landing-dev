    const shifts = [
      {id:'shift-1',title:'1 смена',dates:'30 мая — 8 июня',start:'2025-05-30',end:'2025-06-08',price:79000,left:12,occupied:33,badge:'HIT',desc:'Визуальное программирование, первые игры, логика.'},
      {id:'shift-2',title:'2 смена',dates:'10 июня — 16 июня',start:'2025-06-10',end:'2025-06-16',price:48000,left:8,occupied:37,badge:'',desc:'Python, веб-проекты и командные мини-спринты.'},
      {id:'shift-3',title:'3 смена',dates:'16 июня — 23 июня',start:'2025-06-16',end:'2025-06-23',price:65000,left:5,occupied:40,badge:'',desc:'AI-практика, анализ данных, проектная защита.'},
      {id:'shift-4',title:'4 смена',dates:'10 июня — 23 июня',start:'2025-06-10',end:'2025-06-23',price:95000,left:14,occupied:31,badge:'',desc:'Длинная смена: полный цикл обучения и проектной практики.'}
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
          avatarUrl:'https://static.tildacdn.com/tild3633-3838-4462-a338-336166376565/photo.png',
          bio:'предприниматель в сфере детского IT-образования и мама подростка, которая строит лагерь таким, каким сама хотела бы видеть обучение своего ребёнка.'
        },
        {
          teamId:'team_02',
          bindKey:'никита_брагин',
          fio:'Никита Брагин',
          role:'преподаватель Scratch, Minecraft и Python',
          avatarUrl:'https://static.tildacdn.com/tild3830-6337-4038-b634-333236613738/photo.png',
          bio:'автор учебника по разработке игр; специализируется на геймдеве и помогает детям создавать собственные игровые миры.'
        },
        {
          teamId:'team_03',
          bindKey:'александр_ташкин',
          fio:'Александр Ташкин',
          role:'преподаватель Scratch, Minecraft и Python',
          avatarUrl:'https://static.tildacdn.com/tild3639-3337-4636-a233-306337633035/photo.png',
          bio:'соавтор учебника по разработке игр; умеет зажигать интерес к программированию через практические задачи и командные проекты.'
        },
        {
          teamId:'team_04',
          bindKey:'омар_алхамви',
          fio:'Омар Алхамви',
          role:'преподаватель Python и нейросетей',
          avatarUrl:'https://static.tildacdn.com/tild3737-3334-4538-a139-656430373836/photo.png',
          bio:'работает со старшими и продвинутыми группами, часть занятий ведёт на английском и показывает, как применять AI в реальных проектах.'
        },
        {
          teamId:'team_05',
          bindKey:'дарья_воронцова',
          fio:'Дарья Воронцова',
          role:'преподаватель Python и Scratch',
          avatarUrl:'https://static.tildacdn.com/tild3931-6630-4534-b239-373333393430/ChatGPT_Image_18__20.png',
          bio:'помогает детям легко войти в программирование через игры, логику и первые самостоятельные программы.'
        }
      ],
      photos: [
        {cat:'all',src:'https://static.tildacdn.com/tild3632-6563-4432-b438-346535383038/photo_2025-06-14_08-.jpg',alt:'all'},
        {cat:'all',src:'https://static.tildacdn.com/tild6436-6337-4466-b637-623363613935/photo.jpg',alt:'all'},
        {cat:'all',src:'https://static.tildacdn.com/tild6666-3333-4534-a639-386666343634/photo_2025-06-14_08-.jpg',alt:'all'},
        {cat:'all',src:'https://static.tildacdn.com/tild6336-6536-4238-a436-303937666565/photo_2025-06-17_13-.jpg',alt:'all'},
        {cat:'study',src:'https://static.tildacdn.com/tild3263-3537-4961-b536-363837386238/IMG_1543.JPG',alt:'study'},
        {cat:'food',src:'https://static.tildacdn.com/tild6330-6330-4664-b762-666363643137/photo_2025-06-14_08-.jpg',alt:'food'},
        {cat:'food',src:'https://static.tildacdn.com/tild3864-3738-4763-b633-303434303665/photo_2025-06-14_08-.jpg',alt:'food'},
        {cat:'food',src:'https://static.tildacdn.com/tild3134-3366-4638-b331-366662396639/photo.jpg',alt:'food'},
        {cat:'study',src:'https://static.tildacdn.com/tild3066-3464-4137-a537-626336356335/photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://static.tildacdn.com/tild3637-6139-4636-b261-386434323832/photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://static.tildacdn.com/tild6266-6134-4235-b166-393766376531/photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'study',src:'https://static.tildacdn.com/tild3238-6633-4862-a535-373731303734/photo_2025-06-14_08-.jpg',alt:'study'},
        {cat:'pool',src:'https://static.tildacdn.com/tild6135-3464-4332-b565-386630323830/photo_2025-06-14_08-.jpg',alt:'pool'},
        {cat:'pool',src:'https://static.tildacdn.com/tild3932-3632-4530-b038-613561623337/photo_2025-06-14_08-.jpg',alt:'pool'},
        {cat:'sport',src:'https://static.tildacdn.com/tild3639-3532-4334-b035-316562666439/photo.jpg',alt:'sport'},
        {cat:'sport',src:'https://static.tildacdn.com/tild3963-3938-4335-b335-656531616265/photo_2025-06-14_07-.jpg',alt:'sport'},
        {cat:'sport',src:'https://static.tildacdn.com/tild6538-6438-4432-b737-313138346237/photo_2025-06-14_08-.jpg',alt:'sport'}
      ],
      videos: [
        {
          title:'За неделю в лагере ребёнок меняется больше, чем за год дома',
          url:'https://rutube.ru/shorts/f1538387b19f82f0305f7ae7222bf57d/',
          cover:'https://static.tildacdn.com/tild3632-6563-4432-b438-346535383038/photo_2025-06-14_08-.jpg',
          orientation:'vertical'
        },
        {
          title:'Зачем детям копить деньги в лагере?',
          url:'https://rutube.ru/shorts/01ca8a077f86db0b95bb0adfebd8ebce/',
          cover:'https://static.tildacdn.com/tild6135-3464-4332-b565-386630323830/photo_2025-06-14_08-.jpg',
          orientation:'vertical'
        },
        {
          title:'Ребёнок сам откажется от телефона за 3 дня?',
          url:'https://rutube.ru/shorts/41bbae1d1b167cd49c7aad94cc76b133/',
          cover:'https://static.tildacdn.com/tild3639-3532-4334-b035-316562666439/photo.jpg',
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
        { key:'Telegram', label:'TG', href:'https://t.me/aidacamp' },
        { key:'VK', label:'VK', href:'https://vk.com/aidacamp' },
        { key:'Rutube', label:'RT', href:'https://rutube.ru/channel/53394996/' },
        { key:'Instagram', label:'IG', href:'https://www.instagram.com/aida_codit' },
        { key:'Одноклассники', label:'OK', href:'https://ok.ru/group/64689601773621' },
        { key:'YouTube', label:'YT', href:'https://www.youtube.com/@aidacamp' }
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
      age:'7-9',
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
    const COMPACT_MODAL_SECTIONS = new Set([
      'section-about',
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
    state.faqFilter = state.faqFilter || 'all';
    const metrikaSeen = new Set();
    const scrollMarks = {25:false,50:false,75:false,90:false};
    let offerTimeoutId = null;
    let offerRunId = 0;
    let leadSubmitInProgress = false;

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
      const badge = document.getElementById('versionBadge');
      if(!badge) return;
      badge.classList.toggle('hidden', !DEBUG_UI);
    }

    function trackOnce(event, params = {}){
      const key = `${event}:${JSON.stringify(params)}`;
      if(metrikaSeen.has(key)) return;
      metrikaSeen.add(key);
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
      'https://static.tildacdn.com/tild6163-6430-4337-b034-636439306264/day.png',
      'https://static.tildacdn.com/tild3262-6236-4330-a631-323063383933/photo.png',
      'https://static.tildacdn.com/tild3939-6137-4633-a635-303734373930/photo.png'
    ];

    const HERO_MOBILE =
      'https://static.tildacdn.com/tild3939-6137-4633-a635-303734373930/photo.png';

    let heroIndex = 0;
    let heroTimer = null;

    function persist(){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function initHero(){
      const isMobile = window.innerWidth < 768;

      const bg1 = document.getElementById('heroBg1');
      const bg2 = document.getElementById('heroBg2');
      if(!bg1) return;

      if(isMobile){
        bg1.style.backgroundImage = `url(${HERO_MOBILE})`;
        if(bg2) bg2.remove();
        return;
      }

      bg1.style.backgroundImage = `url(${HERO_IMAGES[0]})`;
      if(!bg2) return;

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
        orientation: isVerticalVideoUrl(externalUrl) ? 'vertical' : 'horizontal'
      };
      if(!externalUrl) return fallback;
      try {
        const u = new URL(externalUrl, window.location.origin);
        const host = (u.hostname || '').replace(/^www\./, '');
        const parts = u.pathname.split('/').filter(Boolean);

        if(host.includes('rutube.ru')){
          if(parts[0] === 'play' && parts[1] === 'embed' && parts[2]){
            return {
              canEmbed: true,
              embedUrl: `https://rutube.ru/play/embed/${parts[2]}`,
              externalUrl,
              orientation: fallback.orientation
            };
          }
          if(parts[0] === 'shorts' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: `https://rutube.ru/play/embed/${parts[1]}`,
              externalUrl,
              orientation: 'vertical'
            };
          }
          if(parts[0] === 'video' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: `https://rutube.ru/play/embed/${parts[1]}`,
              externalUrl,
              orientation: 'horizontal'
            };
          }
        }

        if(host === 'youtu.be' && parts[0]){
          return {
            canEmbed: true,
            embedUrl: `https://www.youtube.com/embed/${parts[0]}`,
            externalUrl,
            orientation: fallback.orientation
          };
        }

        if(host.includes('youtube.com')){
          if(parts[0] === 'watch' && u.searchParams.get('v')){
            return {
              canEmbed: true,
              embedUrl: `https://www.youtube.com/embed/${u.searchParams.get('v')}`,
              externalUrl,
              orientation: 'horizontal'
            };
          }
          if(parts[0] === 'shorts' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: `https://www.youtube.com/embed/${parts[1]}`,
              externalUrl,
              orientation: 'vertical'
            };
          }
          if(parts[0] === 'embed' && parts[1]){
            return {
              canEmbed: true,
              embedUrl: externalUrl,
              externalUrl,
              orientation: fallback.orientation
            };
          }
        }

        if(parts[0] === 'embed'){
          return {
            canEmbed: true,
            embedUrl: externalUrl,
            externalUrl,
            orientation: fallback.orientation
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

    function closeSectionModal(){
      const modal = document.getElementById('sectionModal');
      if(!modal) return;
      modal.classList.add('hidden');
      modal.classList.remove('section-modal-compact');
    }

    function openSectionModal(sectionId){
      const modal = document.getElementById('sectionModal');
      const titleEl = document.getElementById('sectionModalTitle');
      const bodyEl = document.getElementById('sectionModalBody');
      const sourceSection = document.getElementById(sectionId);
      if(!modal || !titleEl || !bodyEl || !sourceSection) return false;
      closeTransientModals('section');
      const isCompactDesktop = state.view === 'desktop' && state.desktopMode === 'compact';
      modal.classList.toggle('section-modal-compact', isCompactDesktop);

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
              <a class="inline-link-btn primary" href="${source.externalUrl}" target="_blank" rel="noopener noreferrer">Открыть видео</a>
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
        openMedia('photo', index);
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

      if(action === 'close-offer'){
        offerRunId += 1;
        clearOfferTimeout();
        document.getElementById('offerOverlay')?.classList.add('hidden');
        resetOfferProgressUI();
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

        localStorage.setItem('aidacamp_lead_fallback', JSON.stringify({
          ts: Date.now(),
          event: eventName,
          payload
        }));
        console.warn('[LEAD_MOCK_FALLBACK]', {endpoint, body});
        return {ok: false, delivered: false, fallback: true};
      } catch(error){
        console.error('notifyLead error', error);
        localStorage.setItem('aidacamp_lead_fallback', JSON.stringify({
          ts: Date.now(),
          event: eventName,
          payload
        }));
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
      return cat;
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

    function resetBookingFlowDebug(){
      clearOfferTimeout();
      if(timerId){
        clearInterval(timerId);
        timerId = null;
      }
      offerRunId += 1;
      leadSubmitInProgress = false;
      setLeadSubmitState(false);
      closeTransientModals();

      try { localStorage.clear(); } catch(e) {}
      try { sessionStorage.clear(); } catch(e) {}
      clearBookingCookies();

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
        faqFilter: 'all',
        offerSearching: false
      };

      ['parentName','parentPhone'].forEach((id) => {
        const input = document.getElementById(id);
        if(input) input.value = '';
      });
      const consentCheck = document.getElementById('consentCheck');
      if(consentCheck) consentCheck.checked = false;
      setPhoneError(false);

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
          hint:'Без предоплаты. Мы сначала подтверждаем бронь вручную.'
        };
      }

      if(!shift){
        return {
          text:'Выберите смену',
          disabled:true,
          hint:'Без предоплаты. Мы сначала подтверждаем бронь вручную.'
        };
      }

      return {
        text:'Оформить заявку',
        disabled:false,
        hint:'Без предоплаты. Мы сначала подтверждаем бронь вручную.'
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
      const hint = document.getElementById(`${prefix}GuidedHint`);
      const ctaWrap = document.getElementById(`${prefix}CtaWrap`);
      const ageTabs = document.getElementById(`${prefix}AgeTabs`);
      const ageChip = document.getElementById(`${prefix}AgeChip`);
      const ageChipText = document.getElementById(`${prefix}AgeChipText`);

      if(!shiftList || !hint || !ctaWrap || !ageTabs || !ageChip || !ageChipText) return;

      shiftList.classList.remove('disabled','highlight');
      ctaWrap.classList.remove('highlight');
      ageTabs.classList.remove('hidden');
      ageChip.classList.remove('visible');

      if(!hasSelectedAge()){
        shiftList.classList.add('disabled');
        hint.textContent = 'Сначала выберите возраст ребёнка. Это нужно, чтобы показать подходящие смены.';
        return;
      }

      ageChipText.textContent = `Возраст: ${ageLabel(state.age)}`;
      ageChip.classList.add('visible');
      ageTabs.classList.add('hidden');

      if(hasSelectedAge() && !state.shiftId){
        shiftList.classList.add('highlight');
        hint.textContent = 'Отлично. Теперь выберите смену, которая подходит по датам, длительности и формату.';
        return;
      }

      if(state.shiftId && state.offerStage === 0){
        ctaWrap.classList.add('highlight');
        hint.textContent = 'Смена выбрана. Теперь можно проверить условия, получить код бронирования и перейти к заявке.';
        return;
      }

      hint.textContent = 'Всё готово: цена найдена, код бронирования сохранён, можно отправлять заявку.';
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
        if(!el) return;
        el.textContent = message;
        if(requiredStep){
          el.dataset.requiredStep = requiredStep;
        } else {
          delete el.dataset.requiredStep;
        }
        el.classList.add('visible');
      });
    }

    function syncBookingHints(){
      ['desktop', 'mobile'].forEach((prefix) => {
        const el = document.getElementById(`${prefix}BookingHintInline`);
        if(!el) return;
        const requiredStep = el.dataset.requiredStep || '';
        if(!requiredStep) return;

        const resolved = (
          (requiredStep === 'age' && hasSelectedAge()) ||
          (requiredStep === 'shift' && !!state.shiftId)
        );

        if(resolved){
          el.classList.remove('visible');
          el.textContent = '';
          delete el.dataset.requiredStep;
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

      btn.textContent = action.text;
      btn.disabled = !!action.disabled;
      hint.textContent = action.hint;

      if(!shift){
        title.textContent = 'Выберите смену';
        lead.textContent = 'Сначала выберите возраст, затем смену — и мы покажем актуальную цену и условия.';
        info.innerHTML = `
          <div class="booking-empty-box">
            Сначала выберите одну из ближайших смен ниже. После этого мы покажем текущую цену и предложим проверить условия бронирования.
          </div>
        `;
        return;
      }

      const currentPrice = formatPrice(shift.price);
      const visiblePrice = formatPrice(getVisiblePrice());
      const timerText = isOfferActive() ? formatRemaining(state.expiresAt - Date.now()) : '';

      title.textContent = state.offerPrice ? 'Ваша цена готова' : 'Смена выбрана';
      lead.textContent = `${shift.title} · ${shift.dates}`;

      info.innerHTML = `
        <div class="booking-price-box">
          <div class="booking-price-head">
            <div class="booking-price-col">
              <small>Текущая цена</small>
              <div class="booking-price-main">${currentPrice}</div>
            </div>
            <div class="booking-price-col" style="text-align:right;">
              <small>${state.offerPrice ? 'Ваша цена' : 'После проверки'}</small>
              <div class="booking-price-main big">${visiblePrice}</div>
            </div>
          </div>
          ${state.code ? `<div class="booking-code-line">Код бронирования: <strong style="color:#fff;">${state.code}</strong></div>` : ''}
          ${timerText ? `<div class="booking-timer-line">${timerText}</div>` : ''}
        </div>
      `;
    }

    function renderBookingPanels(){
      syncGuidedState();
      renderBookingInfo(
        'desktopBookingInfo',
        'desktopBookingTitle',
        'desktopBookingLead',
        'desktopStartBtn',
        'desktopBookingHint'
      );

      renderBookingInfo(
        'mobileBookingInfo',
        'mobileBookingTitle',
        'mobileBookingLead',
        'mobileStartBtn',
        'mobileBookingHint'
      );

      renderSteps('desktopBookingSteps');
      renderSteps('mobileBookingSteps');
      renderGuidedState('desktop');
      renderGuidedState('mobile');
      syncBookingHints();
    }

    function switchView(view){
      state.view = view;
      document.getElementById('desktopBtn').classList.toggle('active', view === 'desktop');
      document.getElementById('mobileBtn').classList.toggle('active', view === 'mobile');
      document.getElementById('desktopView').classList.toggle('hidden', view !== 'desktop');
      document.getElementById('mobileView').classList.toggle('hidden', view !== 'mobile');
      document.getElementById('desktopModeWrap').classList.toggle('hidden', view !== 'desktop');
      if(view !== 'desktop'){
        closeSectionModal();
      }
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
        if(state.view === 'desktop' && state.desktopMode === 'compact'){
          openSectionModal('section-photos');
        }
        return;
      }

      const faqFilterBtn = e.target.closest('[data-faq-filter]');
      if(faqFilterBtn){
        setFaqFilter(faqFilterBtn.dataset.faqFilter);
        if(state.view === 'desktop' && state.desktopMode === 'compact'){
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
      if(ctaBtn && ctaBtn.disabled){
        if(!hasSelectedAge()){
          showHint('Выберите возраст ребёнка', 'age');
        } else if(!state.shiftId){
          showHint('Выберите подходящую смену', 'shift');
        }
        nudgeUserToNextStep();
      }

      const summaryBtn = e.target.closest('#summaryBar button, #summaryBar .cta-main');
      if(summaryBtn && !state.shiftId){
        nudgeUserToNextStep('Чтобы перейти дальше, сначала выберите возраст и смену.');
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
      if(offerTimeoutId){
        clearTimeout(offerTimeoutId);
        offerTimeoutId = null;
      }
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
          renderAll();
          persist();
        });
      });
    }

    function resetAgeSelection(){
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
      box.innerHTML = shifts.slice(0,2).map(s => `
        <div class="shift-option ${state.shiftId === s.id ? 'active' : ''}" data-id="${s.id}">
          <div>
            <strong>${s.dates}</strong>
            <small>${s.title} · ${formatPrice(s.price)} · осталось ${s.left} мест</small>
          </div>
          <div class="shift-price-chip">${s.left} мест</div>
        </div>
      `).join('');

      box.querySelectorAll('.shift-option').forEach(el => {
        el.addEventListener('click', () => {
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
      grid.innerHTML = shifts.map(s => `
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
    }

    function iconGlyph(label){
      const map = {
        city_phone:'☎',
        mobile_phone:'📱',
        whatsapp:'W',
        telegram:'✈'
      };
      return map[label] || '•';
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
        activePhotoList = filteredPhotos;

        photoGrid.innerHTML = filteredPhotos.map((item, idx) => `
          <div
            class="photo-card ${idx === 0 ? 'hero' : ''} ${idx === 4 ? 'wide' : ''}"
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
        videoList.innerHTML = mediaContent.videos.map((item, idx) => `
          <div class="video-card" data-video="${item.url}">
            <div class="video-poster">
              <img src="${item.cover || ''}" alt="${item.title}">
              <div class="video-play"><span>▶</span></div>
            </div>
            <h4>${item.title}</h4>
            <p>${idx === 0 ? 'Про быстрые изменения ребёнка за одну смену.' : idx === 1 ? 'Про внутреннюю экономику.' : 'Про отказ от телефона.'}</p>
          </div>
        `).join('');
      }

      const mainVideoBtn = document.getElementById('mainVideoBtn');
      const mainVideoBox = document.getElementById('mainVideoBox');
      if (mediaContent.videos[0]) {
        if (mainVideoBtn) {
          mainVideoBtn.href = mediaContent.videos[0].url;
          mainVideoBtn.dataset.video = mediaContent.videos[0].url;
        }
        if (mainVideoBox) {
          mainVideoBox.href = mediaContent.videos[0].url;
          mainVideoBox.dataset.video = mediaContent.videos[0].url;
          const mainCover = mediaContent.videos[0].cover || '';
          if(mainCover){
            mainVideoBox.innerHTML = `
              <img src="${mainCover}" alt="${mediaContent.videos[0].title}">
              <div class="video-play"><span>▶</span></div>
            `;
          }
        }
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
            <div class="contact-icon">${iconGlyph(item.label)}</div>
            <strong>${item.text}</strong>
            <span>${item.label.replace('_',' ')}</span>
          </a>
        `).join('');
      }

      if (socialsGrid) {
        socialsGrid.innerHTML = mediaContent.socials.map(item => `
          <a class="social-link" href="${item.href}" target="_blank" rel="noopener noreferrer">
            <div class="social-glyph">${item.label}</div>
            <span>${item.key}</span>
          </a>
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
        const teamCards = mediaContent.team.map(item => `
          <div class="team-card">
            <div class="team-avatar">
              <img src="${item.avatarUrl}" alt="${item.fio}">
            </div>
            <strong>${item.fio}</strong>
            <span class="team-role">${item.role}</span>
            <span>${item.bio}</span>
          </div>
        `).join('');

        const bookCard = `
        <div class="team-card book-team-card">
          <div class="book-team-cover-wrap">
            <img
              class="book-team-cover"
              src="https://static.tildacdn.com/tild6165-3133-4138-a638-333532306465/8991804334.webp"
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

        teamGrid.innerHTML = [teamCards, bookCard].join('');
      }

      const photoFilters = document.getElementById('photoFilters');
      if (photoFilters) {
        photoFilters.querySelectorAll('[data-photo-filter]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.photoFilter === state.photoFilter);
        });
      }

      renderCompactTrustPanelContent();
    }

    function renderCompactTrustPanelContent(){
      const mobileInlinePhotoGrid = document.getElementById('mobileInlinePhotoGrid');
      const mobileInlineVideoList = document.getElementById('mobileInlineVideoList');
      const mobileInlineReviewsList = document.getElementById('mobileInlineReviewsList');
      const mobileFaqList = document.getElementById('mobileFaqList');
      const mobileInlineTeamList = document.getElementById('mobileInlineTeamList');
      const mobileInlineStayList = document.getElementById('mobileInlineStayList');
      const mobileInlineContactsList = document.getElementById('mobileInlineContactsList');

      if (mobileInlinePhotoGrid) {
        mobileInlinePhotoGrid.innerHTML = mediaContent.photos.slice(0,4).map(item => `
          <div class="compact-panel-photo">
            <img src="${item.src}" alt="${item.alt}">
          </div>
        `).join('');
      }

      if (mobileInlineVideoList) {
        mobileInlineVideoList.innerHTML = mediaContent.videos.map((item, idx) => `
          <button class="compact-panel-video-card" type="button" data-video="${item.url}">
            <h4>${item.title}</h4>
            <p>${idx === 0 ? 'Про быстрые изменения ребёнка за одну смену.' : idx === 1 ? 'Про внутреннюю экономику и зачем она детям.' : 'Про отказ от телефона и что происходит вместо него.'}</p>
            <span class="compact-panel-link">Смотреть видео</span>
          </button>
        `).join('');
      }

      if (mobileInlineReviewsList) {
        mobileInlineReviewsList.innerHTML = mediaContent.reviews.slice(0,3).map(item => `
          <div class="compact-panel-review-card">
            <strong>${item.name}</strong>
            <div class="review-stars">★★★★★</div>
            <span>${item.quote}</span>
          </div>
        `).join('');
      }

      if (mobileFaqList) {
        const flatFaq = mediaContent.faq.flatMap(group => group.items.map(item => ({
          group: group.group,
          q: item.q,
          a: item.a
        })));
        mobileFaqList.innerHTML = flatFaq.slice(0, 6).map(item => `
          <div class="mobile-faq-card">
            <strong>${item.group} · ${item.q}</strong>
            <span>${item.a}</span>
          </div>
        `).join('');
      }

      if (mobileInlineTeamList) {
        mobileInlineTeamList.innerHTML = mediaContent.team.slice(0, 4).map(item => `
          <div class="mobile-team-card">
            <div class="mobile-team-avatar">
              <img src="${item.avatarUrl}" alt="${item.fio}">
            </div>
            <div>
              <strong>${item.fio}</strong>
              <span>${item.role}</span>
            </div>
          </div>
        `).join('');
      }

      if (mobileInlineStayList) {
        const stayCards = Array.from(document.querySelectorAll('#section-stay .stay-card')).map((card) => {
          return {
            img: card.querySelector('img')?.getAttribute('src') || '',
            title: (card.querySelector('.stay-card-body strong')?.textContent || '').trim(),
            text: (card.querySelector('.stay-card-body span')?.textContent || '').trim()
          };
        }).filter(item => item.title);

        mobileInlineStayList.innerHTML = stayCards.slice(0, 3).map(item => `
          <div class="mobile-stay-card">
            <div class="mobile-stay-thumb">${item.img ? `<img src="${item.img}" alt="${item.title}">` : ''}</div>
            <div>
              <strong>${item.title}</strong>
              <span>${item.text}</span>
            </div>
          </div>
        `).join('');
      }

      if (mobileInlineContactsList) {
        mobileInlineContactsList.innerHTML = mediaContent.contacts.map(item => `
          <div class="mobile-contact-card">
            <strong>${item.label.replace('_', ' ')}</strong>
            <a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.text}</a>
          </div>
        `).join('');
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
        <h3>Проверяем условия</h3>
        <p>Смотрим, можем ли закрепить лучшую цену для этой смены.</p>
        <div style="height:12px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:10px;">
          <div style="width:72%;height:100%;background:linear-gradient(90deg,#ff8a00,#ffb15e);"></div>
        </div>
        <div style="height:12px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:10px;">
          <div style="width:54%;height:100%;background:linear-gradient(90deg,#ff8a00,#ffb15e);"></div>
        </div>
        <div style="height:12px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;">
          <div style="width:36%;height:100%;background:linear-gradient(90deg,#ff8a00,#ffb15e);"></div>
        </div>
      `;

      offerTimeoutId = setTimeout(() => {
        if(currentRunId !== offerRunId) return;
        offerTimeoutId = null;
        showOffer();
      }, 700);
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
        <h3>${state.offerStage === 2 ? 'Рады, что вы вернулись' : 'Удалось закрепить цену'}</h3>
        <p>${state.offerStage === 2 ? 'Мы смогли ещё немного улучшить условия. Эта цена действует 24 часа.' : 'Ваша цена сохранится на ограниченное время, чтобы вы могли спокойно принять решение.'}</p>
        <div class="big-price">${formatPrice(state.offerPrice)}</div>
        <div class="summary-timer" id="offerTimer"></div>
        <div class="offer-code">Код бронирования: ${state.code}</div>

        <div class="overlay-actions">
          <button class="cta-main" id="offerApplyBtn" data-action="apply-offer" type="button">Закрепить по телефону</button>
          <button class="secondary-outline" id="offerCloseBtn" data-action="close-offer" type="button">Сохранить на этом устройстве</button>
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
        'section-programs':'mobile-section-programs',
        'section-photos':'mobile-section-photos',
        'section-videos':'mobile-section-videos',
        'section-reviews':'mobile-section-reviews',
        'section-faq':'mobile-section-faq',
        'section-team':'mobile-section-team',
        'section-stay':'mobile-section-stay',
        'section-contacts':'mobile-section-contacts'
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

      if(state.view === 'mobile' && state.mobileMode === 'compact'){
        switchMobileMode('full');
        window.setTimeout(() => {
          scrollToSection(cleanId);
        }, 50);
        return;
      }

      if(state.view === 'desktop' && state.desktopMode === 'compact'){
        if(COMPACT_MODAL_SECTIONS.has(cleanId)){
          openSectionModal(cleanId);
          return;
        }

        switchDesktopMode('full');
        window.setTimeout(() => {
          scrollToSection(cleanId);
        }, 50);
        return;
      }

      scrollToSection(cleanId);
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

    initHero();

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

    if(state.expiresAt && Date.now() < state.expiresAt){
      startTimer();
    }
  
