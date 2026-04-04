/* src/scripts/main.js */
    // SECTION 1: Config and runtime constants.
    const OFFER_DISCOUNT_FACTOR = 0.95;

    const shifts = [
      {
        id:'shift-1',
        title:'1',
        label:'Смена 1',
        dates:'30 мая — 8 июня',
        start:'2025-05-30',
        end:'2025-06-08',
        price:74900,
        left:12,
        occupied:33,
        badge:'HIT',
        isShort:false,
        desc:'Стартовая смена с мягким входом в программирование и знакомством с ИИ.',
        fullDesc:'Мягкий вход в программирование через понятные и быстрые результаты. Для 7–9 лет: ребёнок работает в Scratch и Minecraft, делает первые проекты и понимает базовую логику через игру. Для 10–12 лет: начинает писать код на Python, создаёт простые программы и видит, как работает логика внутри. Для 13–14 лет: пробует первые проекты с элементами AI, знакомится с нейросетями и делает первые осмысленные шаги в сторону современных технологий. Главное — ребёнок не слушает, а делает и получает результат уже в первые дни.'
      },
      {
        id:'shift-2',
        title:'2',
        label:'Смена 2',
        dates:'10 июня — 23 июня',
        start:'2025-06-10',
        end:'2025-06-23',
        price:95000,
        left:8,
        occupied:37,
        badge:'',
        isShort:false,
        desc:'Полная смена на 13 дней: проекты, логика и первые шаги в нейросетях.',
        fullDesc:'Смена, где ребёнок начинает реально понимать, как всё устроено. Для 7–9 лет: усложняются проекты, появляется больше самостоятельности, ребёнок начинает осознанно собирать логику. Для 10–12 лет: работает с Python, делает игры и ботов, начинает понимать структуру кода и алгоритмы. Для 13–14 лет: разбирается с более сложными задачами, пробует нейросети и делает проекты с логикой «как в реальных IT-продуктах». Результат — не просто интерес, а ощущение «я могу и понимаю».'
      },
      {
        id:'shift-2-1',
        title:'2.1',
        label:'Смена 2.1',
        dates:'10 июня — 16 июня',
        start:'2025-06-10',
        end:'2025-06-16',
        price:48000,
        left:8,
        occupied:37,
        badge:'',
        isShort:true,
        sourceId:'shift-2',
        desc:'Короткая смена 7 дней: проекты, логика и быстрый вход в программу.',
        fullDesc:'Короткая смена на 7 дней. Ускоренный формат с фокусом на практике: ребёнок делает проект, прокачивает логику и закрепляет базовые навыки программирования через понятные задачи. Для 7–9 лет — упор на Scratch и визуальную логику; для 10–12 лет — первые уверенные шаги в Python и структуре кода; для 13–14 лет — проектная сборка с элементами AI. Формат короткий, но результатный.'
      },
      {
        id:'shift-2-2',
        title:'2.2',
        label:'Смена 2.2',
        dates:'16 июня — 23 июня',
        start:'2025-06-16',
        end:'2025-06-23',
        price:65000,
        left:8,
        occupied:37,
        badge:'',
        isShort:true,
        sourceId:'shift-2',
        desc:'Короткая смена 8 дней: интенсив по проектам, логике и закреплению навыков.',
        fullDesc:'Короткая смена на 8 дней. Интенсивное продолжение проектной работы: ребёнок усиливает логику, доводит задачи до результата и закрепляет навыки программирования в прикладном формате. Для 7–9 лет — развитие проектов в Scratch; для 10–12 лет — практический Python и алгоритмы; для 13–14 лет — более сложные задачи и работа с AI-инструментами. Короткий цикл с фокусом на конкретный прогресс.'
      },
      {
        id:'shift-4',
        title:'4',
        label:'Смена 4',
        dates:'3 августа — 15 августа',
        start:'2025-08-03',
        end:'2025-08-15',
        price:89400,
        left:5,
        occupied:40,
        badge:'',
        isShort:false,
        desc:'Летняя смена с акцентом на проекты, командную работу и уверенность.',
        fullDesc:'Баланс между программированием, командной работой и лагерной жизнью. Для 7–9 лет: ребёнок продолжает делать проекты, но больше взаимодействует с другими, учится работать в команде. Для 10–12 лет: объединяет навыки кода и общения, участвует в командных задачах и учится доводить идеи до результата. Для 13–14 лет: работает над более цельными проектами, распределяет роли в команде и понимает, как создаются продукты. Смена даёт уверенность: ребёнок не просто учится, а начинает действовать.'
      },
      {
        id:'shift-5',
        title:'5',
        label:'Смена 5',
        dates:'17 августа — 26 августа',
        start:'2025-08-17',
        end:'2025-08-26',
        price:69600,
        left:14,
        occupied:31,
        badge:'',
        isShort:false,
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
            {q:'Сколько детей в комнате?',a:'2-4 человека, оборудованные санузлы в каждой комнате.'}
          ]
        },
        {
          group:'Связь',
          icon:'/assets/icons/phone-mobile.svg',
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
        {label:'city_phone',href:'tel:+74951284429',text:'+7 (495) 128-44-29'},
        {label:'mobile_phone',href:'tel:+79688086455',text:'+7 (968) 808-64-55'},
        {label:'whatsapp',href:'https://wa.me/79688086455',text:'WhatsApp'},
        {label:'telegram',href:'https://t.me/Progaschool',text:'@Progaschool'}
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
      previousCode:null,
      nextCodePreview:null,
      expiresAt:null,
      offerStage:0,
      view:'desktop',
      phone:'',
      debugBookingBlocks:false
    };

    const METRIKA_ID = 96499295;
    const MAX_CONTACT_URL = 'https://web.max.ru/185807479';
    const LEGAL_REPO_SLUG = 'afanasevvlad829-cyber/aidaplus-landing-dev';
    const HERO_VARIANT_BANNER_TIER = Object.freeze({
      '212861185':'tier1',
      '212861186':'tier1',
      '212861188':'tier1',
      '212861189':'tier2',
      '212861195':'tier2',
      '212861200':'tier2',
      '212861205':'tier3',
      '212861206':'tier3',
      '212861207':'tier3',
      '212861210':'tier4',
      '212861211':'tier4',
      '212861212':'tier4',
      '212861214':'broad',
      '212861215':'broad',
      '212861216':'broad'
    });
    const HERO_VARIANT_COPY = Object.freeze({
      tier1: Object.freeze({
        tier:'tier1',
        variant:'v1',
        title:'Выездной IT-лагерь в Подмосковье: гаджеты под контролем',
        sub:'Ребёнок 10–12 лет сделает проект за смену, а вы будете спокойны за безопасность.',
        cta:'Получить программу смен',
        hintStage1:'Чтобы получить программу смен, выберите возраст.',
        hintStage1Followup:'Нажмите на возраст — сразу откроем программу смен.',
        hintStage2:'На втором шаге нажмите кнопку i у смены, чтобы получить программу смен.'
      }),
      tier2: Object.freeze({
        tier:'tier2',
        variant:'v1',
        title:'IT-лагерь, где ребёнок возвращается из экрана в проект',
        sub:'Сравните формат: проектная работа, команда, бассейн, природа Подмосковья.',
        cta:'Сравнить смены и цены',
        hintStage1:'Чтобы сравнить смены и цены, выберите возраст.',
        hintStage1Followup:'Выберите возраст — и откроем все смены с ценами.',
        hintStage2:'Нажмите «Все смены для {{age}}», чтобы сравнить смены и цены.'
      }),
      tier3: Object.freeze({
        tier:'tier3',
        variant:'v1',
        title:'Не просто лагерь: IT-смена с результатом за 14 дней',
        sub:'Проект, презентация, наставники-айтишники и режим гаджетов по правилам.',
        cta:'Посмотреть программу',
        hintStage1:'Чтобы посмотреть программу, выберите возраст.',
        hintStage1Followup:'Выберите возраст — и покажем программу смен на шаге 2.',
        hintStage2:'На втором шаге нажмите кнопку i у смены, чтобы посмотреть программу.'
      }),
      tier4: Object.freeze({
        tier:'tier4',
        variant:'v1',
        title:'Если нужен форматный IT-лагерь, а не “просто отдых”',
        sub:'Выездные смены в Подмосковье для 10–12 лет: IT + спорт + командная среда.',
        cta:'Выбрать формат смены',
        hintStage1:'Чтобы выбрать формат смены, выберите возраст.',
        hintStage1Followup:'Выберите возраст — откроем форматы смен под ребёнка.',
        hintStage2:'Нажмите «Все смены для {{age}}», чтобы выбрать формат смены.'
      }),
      broad: Object.freeze({
        tier:'broad',
        variant:'v1',
        title:'Летние IT-смены в Подмосковье для детей 10–12 лет',
        sub:'Программирование, проекты, бассейн, природа и меньше экранного времени.',
        cta:'Узнать условия',
        hintStage1:'Чтобы узнать условия, выберите возраст.',
        hintStage1Followup:'Выберите возраст — подберём смену и условия.',
        hintStage2:'Выберите подходящую смену.'
      })
    });
    const HERO_VARIANT_DEFAULT_TIER = 'broad';
    const USE_DESKTOP_BASE_FOR_MOBILE = true;
    const BUILD_VERSION_LABEL = 'v0.0.288 (ab-analytics-endpoint)';
    const ARCHITECTURE_POLICY = Object.freeze({
      id: 'desktop-source-mobile-presentation',
      version: '2026-03-30',
      desktopSourceOfTruth: true,
      sharedStatePipeline: true,
      mobileUsesDesktopTemplates: true
    });
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
    AIDACAMP_RUNTIME.architecture = ARCHITECTURE_POLICY;
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
    const PROD_DEBUGLESS_DOMAINS = Object.freeze(['aidacamp.ru']);
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
    // SECTION 2: State normalization and hydration.
    state.previewView = state.previewView || state.view || 'desktop';
    if(USE_DESKTOP_BASE_FOR_MOBILE && state.previewView === 'mobile'){
      state.view = 'desktop';
    }
    state.desktopMode = 'full';
    state.mobileMode = 'full';
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
    state.previousCode = state.previousCode || null;
    state.nextCodePreview = state.nextCodePreview || null;
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
    state.debugBookingBlocks = !!state.debugBookingBlocks;
    const metrikaSeen = new Set();
    const scrollMarks = {25:false,50:false,75:false,90:false};
    let offerTimeoutIds = [];
    let offerRunId = 0;
    let leadSubmitInProgress = false;
    let noticeConfirmHandler = null;
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
    let bookingDebugFlowApi = null;

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
        trackOnce,
        getBookingViewConfig
      });
      return heroVariantFlowApi;
    }

    function ensureBookingDebugFlow(){
      if(bookingDebugFlowApi) return bookingDebugFlowApi;
      const create = window.AC_FEATURES?.bookingDebugFlow?.create;
      if(typeof create !== 'function') return null;
      bookingDebugFlowApi = create({
        document,
        isLocalRuntime,
        bookingText,
        getBuildVersionLabel: () => BUILD_VERSION_LABEL.trim(),
        versionBadgeHiddenKey: VERSION_BADGE_HIDDEN_KEY,
        getState: () => state,
        getShifts: () => shifts,
        offerDiscountFactor: OFFER_DISCOUNT_FACTOR,
        generateCode,
        clearOfferTimeout,
        clearShiftOptionPanels,
        applyStatePatch: (patch = {}, options = {}) => {
          Object.assign(state, patch);
          if(options.persistState){
            persist();
          }
        },
        renderAll,
        persist
      });
      return bookingDebugFlowApi;
    }

    function buildAbMeta(extra = {}){
      const fallback = {
        ab_test_id: HERO_AB_TEST_ID,
        ab_variant: String(heroAbVariant || '').toUpperCase() === 'B' ? 'B' : 'A',
        ...(extra && typeof extra === 'object' ? extra : {})
      };
      return safeInvoke(ensureTelemetryFlow(), 'buildAbMeta', [extra], fallback);
    }

    function track(event, params = {}){
      const trackedParams = {
        ...(params && typeof params === 'object' ? params : {}),
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
        ...(extra && typeof extra === 'object' ? extra : {})
      };
      return safeInvoke(ensureHeroVariantFlow(), 'buildHeroVariantMeta', [extra], fallback);
    }

    function resolveHeroVariantFromUtm(){
      const fallback = () => {
        const search = getCurrentSearchParams();
        const bannerId = String(search.get('utm_content') || '').trim();
        const campaignId = String(search.get('utm_campaign') || '').trim();
        const tierFromBanner = bannerId ? HERO_VARIANT_BANNER_TIER[bannerId] : '';
        const isKnownBanner = !!tierFromBanner;
        const tier = isKnownBanner ? tierFromBanner : HERO_VARIANT_DEFAULT_TIER;
        const copy = HERO_VARIANT_COPY[tier] || HERO_VARIANT_COPY[HERO_VARIANT_DEFAULT_TIER];
        const fallbackReason = !bannerId
          ? 'unknown_banner_or_no_utm'
          : (!isKnownBanner ? 'unknown_banner_or_no_utm' : '');
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
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
      return safeInvoke(ensureHeroVariantFlow(), 'syncVariantBookingHint', [cfg], null);
    }

    function ensureVariantCoachBadge(viewCfg){
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
      return safeInvoke(ensureHeroVariantFlow(), 'ensureVariantCoachBadge', [cfg], null);
    }

    function hideVariantCoachBadge(viewCfg, dismissKey = ''){
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
      return safeInvoke(ensureHeroVariantFlow(), 'hideVariantCoachBadge', [cfg, dismissKey], null);
    }

    function syncVariantCoachBadge(viewCfg){
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
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

    function applyDebugUiState(){
      return safeInvoke(ensureBookingDebugFlow(), 'applyDebugUiState', [], null);
    }

    function applyBookingDebugBlocksUi(){
      return safeInvoke(ensureBookingDebugFlow(), 'applyBookingDebugBlocksUi', [], null);
    }

    function setBookingDebugBlocks(enabled){
      return safeInvoke(ensureBookingDebugFlow(), 'setBookingDebugBlocks', [enabled], null);
    }

    function forceBookingDebugStage(mode){
      return safeInvoke(ensureBookingDebugFlow(), 'forceBookingDebugStage', [mode], null);
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

    function runUnifiedArchitectureGuardrail(){
      const issues = [];
      if(!USE_DESKTOP_BASE_FOR_MOBILE){
        issues.push('USE_DESKTOP_BASE_FOR_MOBILE=false');
      }
      const desktopView = document.getElementById('desktopView');
      if(!desktopView){
        issues.push('desktopView_missing');
      }
      const mobileView = document.getElementById('mobileView');
      if(mobileView && state.previewView === 'mobile'){
        const styles = window.getComputedStyle(mobileView);
        const legacyVisible = styles.display !== 'none' && styles.visibility !== 'hidden' && !mobileView.hidden;
        if(legacyVisible){
          issues.push('legacy_mobile_view_visible');
        }
      }
      const ok = issues.length === 0;
      if(!ok){
        console.error('[GUARDRAIL] Unified architecture check failed', { issues });
        trackOnce('guardrail_architecture_failed', {
          issues: issues.slice(0, 4).join(',')
        });
      }
      return {
        ok,
        policy: ARCHITECTURE_POLICY.id,
        policyVersion: ARCHITECTURE_POLICY.version,
        issues
      };
    }

    function runGuardrails(){
      const version = runBuildVersionGuardrail();
      const smoke = runRuntimeSmokeGuardrail();
      const architecture = runUnifiedArchitectureGuardrail();
      const summary = {
        timestamp: new Date().toISOString(),
        build: BUILD_VERSION_LABEL,
        version,
        smoke,
        architecture,
        ok: !!(version.ok && smoke.ok && architecture.ok)
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

    const CLOSE_ICON_HTML = '<img class="ac-icon" src="/assets/icons/close.svg" alt="" aria-hidden="true">';

    function safeInvoke(target, methodName, args = [], fallback = null){
      const list = Array.isArray(args) ? args : [];
      if(target && typeof target[methodName] === 'function'){
        return target[methodName](...list);
      }
      return typeof fallback === 'function' ? fallback(...list) : fallback;
    }

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
        safeInvoke({updateSummaryBarVisibility}, 'updateSummaryBarVisibility');
      }, {passive:true});
    }

    function initSummaryBarViewportSync(){
      const sync = () => {
        safeInvoke({updateSummaryBarVisibility}, 'updateSummaryBarVisibility');
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
        {id:'section-reviews', event:'eviews_view'},
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

    function trackFaqOpen(){
      trackOnce('faq_open');
    }

    const HERO_IMAGES = [
      '/assets/images/hero-camp-sunset-20260328.png'
    ];

    const HERO_MOBILE =
      '/assets/images/hero-camp-sunset-20260328.png';
    const HERO_IMAGES_B = [
      '/assets/images/hero-ab-pool-20260401.jpeg'
    ];
    const HERO_MOBILE_B =
      '/assets/images/hero-ab-pool-20260401.jpeg';
    const HERO_AB_TEST_KEY = 'aidacamp_hero_ab_v1';
    const HERO_AB_TEST_ID = 'hero_primary_block_v1';
    const HERO_AB_VARIANT_LABELS = Object.freeze({
      A: 'Control',
      B: 'Pool Motion'
    });
    const HERO_AB_SHIFT_UP_MS = 7000;
    const HERO_AB_BENEFIT_REVEAL_DELAY_MS = 7600;
    const HERO_AB_BENEFIT_STEP_MS = 4000;
    const HERO_AB_DESKTOP_SHIFT_UP_MS = 5000;
    const HERO_AB_DESKTOP_BENEFIT_REVEAL_DELAY_MS = 5000;
    const HERO_AB_DESKTOP_BG_ONLY = false;
    const HERO_AB_MOBILE_EFFECTS_ENABLED = false;
    const AB_EVENT_ENDPOINT_DEFAULT = 'https://adacamp-ab-analytics.afanasevvlad829.workers.dev/api/ab-event';
    const AB_VISITOR_ID_KEY = 'aidacamp_ab_visitor_id_v1';
    const AB_SESSION_ID_KEY = 'aidacamp_ab_session_id_v1';
    const AB_TEST_EVENT_ALLOWLIST = new Set([
      'page_view',
      'hero_ab_assigned_v1',
      'hero_variant_shown_new',
      'hero_variant_fallback_new',
      'form_submit',
      'hero_variant_form_submit_new',
      'telegram_click',
      'hero_variant_telegram_click_new'
    ]);
    const HERO_BENEFITS_LAYOUT_EXPERIMENT = true;
    const HERO_BENEFITS_LAYOUT_EXPERIMENT_ITEMS = Object.freeze([
      Object.freeze({
        title:'AI-проект за смену',
        icon:'/assets/icons/ai-svgrepo-com.svg',
        iconClass:''
      }),
      Object.freeze({
        title:'Без телефонов',
        icon:'/assets/icons/mobile-off-svgrepo-com.svg',
        iconClass:''
      }),
      Object.freeze({
        title:'Бассейн и спорт',
        icon:'/assets/icons/swim-svgrepo-com.svg',
        iconClass:''
      })
    ]);

    let heroIndex = 0;
    let heroTimer = null;
    let heroAbVariant = 'A';
    let heroAbTimers = [];
    let heroAbMobileScrollBound = false;
    let heroAbMobileInteractionBound = false;
    let heroAbMobileUserInteracted = false;
    let heroAbMobileCollapsed = false;
    let heroAbMobileAutoTimer = null;
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
      const heroImages = heroAbVariant === 'B' ? HERO_IMAGES_B : HERO_IMAGES;
      const heroMobile = heroAbVariant === 'B' ? HERO_MOBILE_B : HERO_MOBILE;

      const bg1 = document.getElementById('heroBg1');
      const bg2 = document.getElementById('heroBg2');
      const desktopView = document.getElementById('desktopView');
      const mobileView = document.getElementById('mobileView');
      if(!bg1) return;
      if(heroTimer){
        clearInterval(heroTimer);
        heroTimer = null;
      }
      if(desktopView){
        desktopView.classList.toggle('hero-static-bg', HERO_IMAGES.length <= 1);
        desktopView.classList.remove('hero-ready');
        desktopView.classList.add('hero-loading');
      }
      if(mobileView){
        mobileView.classList.remove('hero-ready');
        mobileView.classList.add('hero-loading');
      }
      const markHeroReady = () => {
        if(desktopView){
          desktopView.classList.remove('hero-loading');
          desktopView.classList.add('hero-ready');
        }
        if(mobileView){
          mobileView.classList.remove('hero-loading');
          mobileView.classList.add('hero-ready');
        }
      };
      const applySingleHeroFrame = (src) => {
        bg1.style.backgroundImage = `url(${src})`;
        bg1.classList.add('active');
        bg1.classList.remove('hidden');
        if(bg2){
          bg2.style.backgroundImage = `url(${src})`;
          bg2.classList.remove('active');
          bg2.classList.add('hidden');
        }
      };
      const preloadAndApplyFirstFrame = (src) => {
        let done = false;
        const finish = () => {
          if(done) return;
          done = true;
          applySingleHeroFrame(src);
          requestAnimationFrame(markHeroReady);
        };
        try{
          const img = new Image();
          img.decoding = 'async';
          img.onload = finish;
          img.onerror = finish;
          img.src = src;
          if(img.complete){
            finish();
          } else {
            window.setTimeout(finish, 1200);
          }
        } catch (error){
          finish();
        }
      };

      if(isMobile){
        preloadAndApplyFirstFrame(heroMobile);
        return;
      }

      heroIndex = 0;
      preloadAndApplyFirstFrame(heroImages[heroIndex]);
      if(!bg2) return;

      if(heroImages.length <= 1){
        bg2.style.backgroundImage = 'none';
        return;
      }

      heroTimer = setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;

        const next = heroImages[heroIndex];

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

    function preloadHeroAssets(){
      const heroImages = heroAbVariant === 'B' ? HERO_IMAGES_B : HERO_IMAGES;
      const heroMobile = heroAbVariant === 'B' ? HERO_MOBILE_B : HERO_MOBILE;
      const preloadList = [...heroImages, heroMobile].filter(Boolean);
      preloadList.forEach((src) => {
        try{
          const img = new Image();
          img.decoding = 'async';
          img.src = src;
        } catch (error){
          // ignore preload failures
        }
      });
    }

    function clearHeroAbTimers(){
      heroAbTimers.forEach((timerId) => window.clearTimeout(timerId));
      heroAbTimers = [];
    }

    function getForcedHeroAbVariant(){
      const search = getCurrentSearchParams();
      const forcedRaw = String(search.get('hero_ab') || search.get('hero_mode') || '').trim();
      const normalized = forcedRaw.toUpperCase();
      if(normalized === 'A' || normalized === 'CONTROL') return 'A';
      if(normalized === 'B' || normalized === 'POOL' || normalized === 'POOL_MOTION') return 'B';
      return '';
    }

    function resolveHeroAbVariant(){
      const forced = getForcedHeroAbVariant();
      if(forced){
        localStorage.setItem(HERO_AB_TEST_KEY, forced);
        return forced;
      }
      localStorage.setItem(HERO_AB_TEST_KEY, 'B');
      return 'B';
    }

    function applyHeroAbAnimationForRoot(root){
      if(!root) return;
      const isDesktopRoot = root.id === 'desktopView' && !root.classList.contains('mobile-preview-active');
      const isMobileRuntimeRoot = !isDesktopRoot;
      const shouldAnimateForRoot = isDesktopRoot ? true : heroAbVariant === 'B';
      root.classList.remove('hero-ab-b', 'hero-ab-b-shifted');
      root.querySelectorAll('.hero-slogan').forEach((node) => {
        const current = String(node.textContent || '').trim();
        if(!node.dataset.heroSloganOriginal){
          node.dataset.heroSloganOriginal = current;
        }
        node.textContent = node.dataset.heroSloganOriginal || current;
      });
      root.querySelectorAll('.hero-benefits-grid .hero-benefit-card').forEach((card) => {
        card.classList.remove('hero-benefit-visible');
      });
      if(isDesktopRoot && HERO_AB_DESKTOP_BG_ONLY){
        // Desktop A/B parity: keep visuals and animation identical for A and B.
        // Only background image differs via initHero() image source selection.
        return;
      }
      if(isMobileRuntimeRoot && !HERO_AB_MOBILE_EFFECTS_ENABLED){
        // Mobile stability mode: disable experimental A/B visual effects.
        return;
      }
      if(!shouldAnimateForRoot) return;

      root.classList.add('hero-ab-b');
      if(heroAbVariant === 'B'){
        root.querySelectorAll('.hero-slogan').forEach((node) => {
          node.textContent = 'Летние IT-смены в Подмосковье';
        });
      }
      const cards = Array.from(root.querySelectorAll('.hero-benefits-grid .hero-benefit-card'));
      if(!cards.length) return;
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(prefersReducedMotion){
        root.classList.add('hero-ab-b-shifted');
        cards.forEach((card) => card.classList.add('hero-benefit-visible'));
        return;
      }
      const shiftUpMs = isDesktopRoot ? HERO_AB_DESKTOP_SHIFT_UP_MS : HERO_AB_SHIFT_UP_MS;
      const revealDelayMs = isDesktopRoot ? HERO_AB_DESKTOP_BENEFIT_REVEAL_DELAY_MS : HERO_AB_BENEFIT_REVEAL_DELAY_MS;

      const shiftUpTimer = window.setTimeout(() => {
        root.classList.add('hero-ab-b-shifted');
      }, shiftUpMs);
      heroAbTimers.push(shiftUpTimer);

      let revealIndex = 0;
      const revealNext = () => {
        const card = cards[revealIndex];
        if(card){
          card.classList.add('hero-benefit-visible');
          revealIndex += 1;
        }
        if(revealIndex >= cards.length && revealInterval){
          window.clearInterval(revealInterval);
        }
      };
      let revealInterval = null;
      const revealStartTimer = window.setTimeout(() => {
        revealNext();
        revealInterval = window.setInterval(revealNext, HERO_AB_BENEFIT_STEP_MS);
        heroAbTimers.push(revealInterval);
      }, revealDelayMs);
      heroAbTimers.push(revealStartTimer);
    }

    function applyHeroBenefitsLayoutExperiment(root){
      if(!root) return;
      const grid = root.querySelector('.hero-benefits-grid');
      if(!grid) return;

      if(!grid.dataset.heroBenefitsOriginalHtml){
        grid.dataset.heroBenefitsOriginalHtml = grid.innerHTML;
      }

      if(!HERO_BENEFITS_LAYOUT_EXPERIMENT){
        root.classList.remove('hero-benefits-exp-3');
        grid.classList.remove('hero-benefits-grid--compact3');
        if(grid.dataset.heroBenefitsOriginalHtml){
          grid.innerHTML = grid.dataset.heroBenefitsOriginalHtml;
        }
        return;
      }

      root.classList.add('hero-benefits-exp-3');
      grid.classList.add('hero-benefits-grid--compact3');
      grid.innerHTML = HERO_BENEFITS_LAYOUT_EXPERIMENT_ITEMS.map((item) => `
        <article class="hero-benefit-card hero-benefit-card--compact">
          <span class="hero-benefit-icon-wrap ${item.iconClass || ''}">
            <img class="ac-icon hero-benefit-icon" src="${item.icon}" alt="" aria-hidden="true">
          </span>
          <strong>${item.title}</strong>
        </article>
      `).join('');
    }

    function applyHeroAbVariant(){
      clearHeroAbTimers();
      if(heroAbMobileAutoTimer){
        window.clearTimeout(heroAbMobileAutoTimer);
        heroAbMobileAutoTimer = null;
      }
      const desktopView = document.getElementById('desktopView');
      const mobileView = document.getElementById('mobileView');
      const resolveMobileHeroRoot = () => {
        if(desktopView && desktopView.classList.contains('mobile-preview-active')){
          return desktopView;
        }
        if(mobileView && !mobileView.classList.contains('hidden')){
          return mobileView;
        }
        if(USE_DESKTOP_BASE_FOR_MOBILE && desktopView){
          return desktopView;
        }
        return mobileView || desktopView || null;
      };
      const isMobileHeroRuntime = () => {
        if(desktopView && desktopView.classList.contains('mobile-preview-active')) return true;
        if(mobileView && !mobileView.classList.contains('hidden')) return true;
        return window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
      };
      const desktopIsMobilePreview = !!(desktopView && desktopView.classList.contains('mobile-preview-active'));
      applyHeroBenefitsLayoutExperiment(desktopView, HERO_BENEFITS_LAYOUT_EXPERIMENT && !desktopIsMobilePreview);
      applyHeroBenefitsLayoutExperiment(mobileView, false);
      applyHeroAbAnimationForRoot(desktopView);
      applyHeroAbAnimationForRoot(mobileView);
      if(desktopView){
        desktopView.classList.remove('hero-ab-b-mobile-precollapse');
        desktopView.classList.remove('hero-ab-b-mobile-collapsed');
      }
      if(mobileView){
        mobileView.classList.remove('hero-ab-b-mobile-precollapse');
        mobileView.classList.remove('hero-ab-b-mobile-collapsed');
      }
      heroAbMobileCollapsed = false;
      if(!HERO_AB_MOBILE_EFFECTS_ENABLED){
        if(heroAbMobileAutoTimer){
          window.clearTimeout(heroAbMobileAutoTimer);
          heroAbMobileAutoTimer = null;
        }
        trackOnce('hero_ab_assigned_v1', {
          test_id: HERO_AB_TEST_ID,
          variant: heroAbVariant
        });
        return;
      }
      const collapseMobileHero = (reason = 'scroll') => {
        if(heroAbVariant !== 'B') return;
        if(heroAbMobileCollapsed) return;
        const mobileRoot = resolveMobileHeroRoot();
        if(!mobileRoot) return;
        heroAbMobileCollapsed = true;
        mobileRoot.classList.remove('hero-ab-b-mobile-precollapse');
        mobileRoot.classList.add('hero-ab-b-mobile-collapsed');
        if(heroAbMobileAutoTimer){
          window.clearTimeout(heroAbMobileAutoTimer);
          heroAbMobileAutoTimer = null;
        }
        trackOnce('hero_ab_mobile_scroll_collapse_v1', {
          test_id: HERO_AB_TEST_ID,
          variant: heroAbVariant,
          reason
        });
      };
      if(!heroAbMobileScrollBound){
        window.addEventListener('scroll', () => {
          if(!isMobileHeroRuntime()) return;
          if(!heroAbMobileUserInteracted) return;
          const y = window.scrollY || document.documentElement.scrollTop || 0;
          if(y < 12) return;
          collapseMobileHero('scroll');
        }, {passive:true});
        heroAbMobileScrollBound = true;
      }
      if(!heroAbMobileInteractionBound){
        const markHeroAbInteracted = () => {
          heroAbMobileUserInteracted = true;
        };
        window.addEventListener('touchstart', markHeroAbInteracted, {passive:true});
        window.addEventListener('pointerdown', markHeroAbInteracted, {passive:true});
        window.addEventListener('wheel', markHeroAbInteracted, {passive:true});
        window.addEventListener('keydown', markHeroAbInteracted);
        heroAbMobileInteractionBound = true;
      }
      if(heroAbVariant === 'B' && isMobileHeroRuntime()){
        heroAbMobileUserInteracted = false;
        const mobileRoot = resolveMobileHeroRoot();
        if(mobileRoot){
          mobileRoot.classList.add('hero-ab-b-mobile-precollapse');
        }
        heroAbMobileAutoTimer = window.setTimeout(() => {
          collapseMobileHero('timeout_10s');
        }, 10000);
      }
      trackOnce('hero_ab_assigned_v1', {
        test_id: HERO_AB_TEST_ID,
        variant: heroAbVariant
      });
    }

    function initHeroAbDevPanel(){
      const host = String(window.location.hostname || '').toLowerCase();
      const isDevHost = (
        host === 'localhost' ||
        host === '127.0.0.1'
      );
      if(!isDevHost) return;
      if(document.getElementById('heroAbDevPanel')) return;
      const panel = document.createElement('div');
      panel.id = 'heroAbDevPanel';
      panel.className = 'hero-ab-dev-panel';
      panel.innerHTML = `
        <div class="hero-ab-dev-title">Hero A/B (Dev)</div>
        <div class="hero-ab-dev-status">Current: <span data-hero-ab-current></span></div>
        <div class="hero-ab-dev-modes">
          <button type="button" class="hero-ab-dev-btn" data-hero-ab-set="A">A · ${HERO_AB_VARIANT_LABELS.A || 'A'}</button>
          <button type="button" class="hero-ab-dev-btn" data-hero-ab-set="B">B · ${HERO_AB_VARIANT_LABELS.B || 'B'}</button>
        </div>
      `;
      document.body.appendChild(panel);
      const currentNode = panel.querySelector('[data-hero-ab-current]');
      const syncPanelState = () => {
        if(currentNode){
          currentNode.textContent = HERO_AB_VARIANT_LABELS[heroAbVariant] || heroAbVariant;
        }
        panel.querySelectorAll('[data-hero-ab-set]').forEach((button) => {
          const value = String(button.getAttribute('data-hero-ab-set') || '').toUpperCase();
          button.classList.toggle('is-active', value === heroAbVariant);
        });
      };
      syncPanelState();
      panel.querySelectorAll('[data-hero-ab-set]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const next = String(btn.getAttribute('data-hero-ab-set') || '').toUpperCase();
          if(next !== 'A' && next !== 'B') return;
          if(next === heroAbVariant){
            syncPanelState();
            return;
          }
          heroAbVariant = next;
          localStorage.setItem(HERO_AB_TEST_KEY, next);
          const url = new URL(window.location.href);
          url.searchParams.set('hero_ab', next);
          window.history.replaceState({}, '', url.toString());
          initHero();
          applyHeroAbVariant();
          syncPanelState();
        });
      });
      trackOnce('hero_ab_dev_panel_shown_v1', {
        test_id: HERO_AB_TEST_ID,
        variant: heroAbVariant,
        mode_label: HERO_AB_VARIANT_LABELS[heroAbVariant] || ''
      });
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
      if(sectionId === 'section-faq'){
        trackFaqOpen();
      }
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
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
      const actionEl = target.closest('[data-action]');
      if(!actionEl) return false;

      const action = actionEl.dataset.action;

      if(action === 'open-photo'){
        const index = Number(actionEl.dataset.photoIndex || 0);
        const clickedFromMobilePhoto = !!actionEl.closest('.mobile-photo-stage, .mobile-photo-preview-strip');
        const source = clickedFromMobilePhoto
          ? getPhotosForActiveFilter(state.photoFilter)
          : (photoGalleryList.length ? photoGalleryList.slice() : mediaContent.photos.slice());
        activePhotoList = source;
        const safeIndex = Math.max(0, Math.min(index, Math.max(source.length - 1, 0)));
        state.mobilePhotoIndex = safeIndex;
        openMedia('photo', safeIndex);
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
          src:'/assets/images/referral-hoodie.jpeg',
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
        if(shiftId){
          openShiftAboutModal(shiftId);
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
        activePhotoList = [{ src: '/assets/images/cdn-cache/8fc8172e_8991804334.webp', alt: 'Собственная книга по Python', cat: 'study' }];
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

      if(action === 'open-season-calendar'){
        openSeasonCalendar();
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

      if(action === 'reset-booking-all'){
        openResetBookingConfirmModal();
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

      if(action === 'close-variant-coach'){
        const dismissKey = String(actionEl.dataset.variantKey || '').trim();
        hideVariantCoachBadge(getPrimaryBookingViewConfig(), dismissKey);
        return true;
      }

      if(action === 'confirm-notice'){
        const confirmHandler = noticeConfirmHandler;
        closeNoticeModal();
        if(typeof confirmHandler === 'function'){
          confirmHandler();
        }
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

      if(action === 'debug-booking-blocks'){
        setBookingDebugBlocks(!state.debugBookingBlocks);
        return true;
      }

      if(action === 'debug-booking-stage-3'){
        forceBookingDebugStage('stage-3');
        return true;
      }

      if(action === 'debug-booking-stage-4'){
        forceBookingDebugStage('stage-4');
        return true;
      }

      if(action === 'debug-booking-what-to-do'){
        forceBookingDebugStage('what-to-do');
        return true;
      }

      if(action === 'invite-friend'){
        const invitePayload = buildInviteClipboardText();
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(invitePayload)
            .then(() => openNoticeModal('Ссылка скопирована в буфер обмена'))
            .catch(() => openNoticeModal('Не удалось скопировать автоматически. Скопируйте ссылку вручную.'));
        } else {
          openNoticeModal('Скопируйте ссылку вручную.');
        }
        return true;
      }

      if(action === 'copy-invite-link'){
        const invitePayload = buildInviteClipboardText();
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(invitePayload)
            .then(() => openNoticeModal('Ссылка скопирована в буфер обмена'))
            .catch(() => openNoticeModal('Не удалось скопировать автоматически. Скопируйте ссылку вручную.'));
        } else {
          openNoticeModal('Скопируйте ссылку вручную.');
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
      const enrichedPayload = {
        ...(payload && typeof payload === 'object' ? payload : {}),
        ...buildAbMeta()
      };
      const body = {event: eventName, payload: enrichedPayload};
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

        const telegramResult = await sendLeadToTelegram(eventName, enrichedPayload, cfg);
        if(telegramResult.ok){
          saveLeadFallbackMeta(eventName, endpoint, `http_${response.status}_telegram_ok`);
          return telegramResult;
        }

        saveLeadFallbackMeta(eventName, endpoint, `http_${response.status}`);
        console.warn('[LEAD_MOCK_FALLBACK]', {endpoint, body});
        return {ok: false, delivered: false, fallback: true};
      } catch(error){
        const telegramResult = await sendLeadToTelegram(eventName, enrichedPayload, cfg);
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
        const formBody = new URLSearchParams();
        formBody.set('chat_id', chatId);
        formBody.set('text', formatTelegramMessage(eventName, payload));
        formBody.set('disable_web_page_preview', 'true');
        const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method:'POST',
          body: formBody,
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
        // Production must never expose debug controls via query/localStorage toggles.
        if(isProductionRuntime()) return false;
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

    function isProductionRuntime(){
      try {
        const host = String(window.location.hostname || '').toLowerCase().replace(/^www\./, '');
        if(!host) return false;
        return PROD_DEBUGLESS_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
      } catch(error){
        return false;
      }
    }

    function isLocalRuntime(){
      try {
        const host = String(window.location.hostname || '').toLowerCase();
        return host === 'localhost' || host === '127.0.0.1';
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
      const keepDebugBookingBlocks = !!state.debugBookingBlocks;
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
        offerSearching: false,
        debugBookingBlocks: keepDebugBookingBlocks
      };

      ['parentName','parentPhone'].forEach((id) => {
        const input = document.getElementById(id);
        if(input) input.value = '';
      });
      const consentCheck = document.getElementById('consentCheck');
      if(consentCheck) consentCheck.checked = false;
      setPhoneError(false);
      ['desktop', 'mobile'].forEach((viewKey) => {
        const hostId = getLeadScopeConfig(getBookingViewConfig(viewKey).inlineLeadScope)?.hostId;
        const host = hostId ? document.getElementById(hostId) : null;
        if(host){
          host.classList.add('hidden');
          host.innerHTML = '';
        }
      });
      ['desktop', 'mobile'].forEach((viewKey) => {
        const cfg = getBookingViewConfig(viewKey);
        [cfg.inlineHintId, cfg.guidedInlineHintId].forEach((id) => {
          const el = document.getElementById(id);
          if(!el) return;
          el.textContent = '';
          el.classList.remove('visible');
          delete el.dataset.requiredStep;
        });
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
      applyBookingDebugBlocksUi();
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
      const variant = heroVariantState || resolveHeroVariantFromUtm();
      const variantCta = variant.copy?.cta || HERO_VARIANT_COPY[HERO_VARIANT_DEFAULT_TIER].cta;
      if(!hasSelectedAge()){
        return {
          text:variantCta,
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
        text:'Забронировать',
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
        ? `Завершить бронирование · выгода ${formatPrice(gainValue)}`
        : 'Завершить бронирование';
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

    // SECTION 4: Booking module (view config, actions, render pipeline).
    const BOOKING_STAGE2_VERTICAL_ALIGN = Object.freeze({
      top: Object.freeze({flex: 'flex-start', grid: 'start'}),
      center: Object.freeze({flex: 'center', grid: 'center'}),
      bottom: Object.freeze({flex: 'flex-end', grid: 'end'})
    });
    const BOOKING_STAGE2_HORIZONTAL_ALIGN = Object.freeze({
      left: Object.freeze({flex: 'flex-start', grid: 'start'}),
      center: Object.freeze({flex: 'center', grid: 'center'}),
      right: Object.freeze({flex: 'flex-end', grid: 'end'}),
      stretch: Object.freeze({flex: 'stretch', grid: 'stretch'})
    });

    const BOOKING_VIEWS = Object.freeze({
      desktop: Object.freeze({
        key: 'desktop',
        cardId: 'desktop-booking-card',
        shiftOptionsId: 'desktop-shift-options',
        infoId: 'desktop-booking-info',
        titleId: 'desktopBookingTitle',
        leadId: 'desktopBookingLead',
        startBtnId: 'desktopStartBtn',
        hintId: 'desktopBookingHint',
        stepsId: 'desktopBookingSteps',
        inlineHintId: 'desktopBookingHintInline',
        shiftListId: 'desktopShiftList',
        ctaWrapId: 'desktopCtaWrap',
        ageTabsId: 'desktopAgeTabs',
        summaryChipsId: 'desktopBookingSummaryChips',
        ageChipId: 'desktopAgeChip',
        ageChipTextId: 'desktopAgeChipText',
        shiftChipId: 'desktopShiftChip',
        shiftChipTextId: 'desktopShiftChipText',
        guidedInlineHintId: 'desktopInlineHint',
        inlineLeadScope: 'booking-desktop',
        stage2Align: Object.freeze({
          vertical: 'center',
          horizontal: 'stretch'
        })
      }),
      mobile: Object.freeze({
        key: 'mobile',
        cardId: 'mobileBookingCard',
        shiftOptionsId: 'mobileShiftOptions',
        infoId: 'mobile-booking-info',
        titleId: 'mobileBookingTitle',
        leadId: 'mobileBookingLead',
        startBtnId: 'mobileStartBtn',
        hintId: 'mobileBookingHint',
        stepsId: 'mobileBookingSteps',
        inlineHintId: 'mobileBookingHintInline',
        shiftListId: 'mobileShiftList',
        ctaWrapId: 'mobileCtaWrap',
        ageTabsId: 'mobileAgeTabs',
        summaryChipsId: 'mobileBookingSummaryChips',
        ageChipId: 'mobileAgeChip',
        ageChipTextId: 'mobileAgeChipText',
        shiftChipId: 'mobileShiftChip',
        shiftChipTextId: 'mobileShiftChipText',
        guidedInlineHintId: 'mobileInlineHint',
        inlineLeadScope: 'booking-mobile',
        stage2Align: Object.freeze({
          vertical: 'center',
          horizontal: 'stretch'
        })
      })
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
      const heroRect = heroShell ? heroShell.getBoundingClientRect() : null;
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
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
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
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
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

    function applyBookingStructureSchema(viewCfg){
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
      const card = document.getElementById(cfg.cardId);
      if(!card) return;
      const stage = getBookingStage();

      card.querySelectorAll('[data-booking-region]').forEach((node) => {
        delete node.dataset.bookingRegion;
        delete node.dataset.bookingRegionLabel;
        delete node.dataset.bookingRegionZero;
        delete node.dataset.bookingRegionLabelSide;
      });

      const mainSelector = (() => {
        if(stage === 2) return '.booking-step-2';
        if(stage >= 3) return `#${cfg.infoId}`;
        return '.booking-step-1';
      })();

      const structureMap = Object.freeze({
        top: `#${cfg.stepsId}`,
        chips: `#${cfg.summaryChipsId}`,
        header: `#${cfg.titleId}`,
        main: mainSelector,
        bottom: '.booking-step-3'
      });
      const regionLabelSideMap = Object.freeze({
        top: 'right',
        chips: 'right',
        header: 'left',
        main: 'right',
        bottom: 'left'
      });

      const resolveRegionLabel = (regionName, node) => {
        if(!node) return regionName;
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        const isZeroHeight = style.display === 'none' || style.visibility === 'hidden' || node.offsetHeight === 0 || rect.height < 1;
        return isZeroHeight ? `${regionName} 0` : regionName;
      };

      const isRegionZero = (node) => {
        if(!node) return false;
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        return style.display === 'none' || style.visibility === 'hidden' || node.offsetHeight === 0 || rect.height < 1;
      };

      Object.entries(structureMap).forEach(([regionName, selector]) => {
        const node = card.querySelector(selector);
        if(!node) return;
        node.dataset.bookingRegion = regionName;
        node.dataset.bookingRegionLabel = resolveRegionLabel(regionName, node);
        node.dataset.bookingRegionZero = isRegionZero(node) ? '1' : '0';
        node.dataset.bookingRegionLabelSide = regionLabelSideMap[regionName] || 'left';
      });
    }

    function ensureStage2TransferHost(stepThree){
      if(!stepThree) return null;
      let host = stepThree.querySelector('.booking-stage2-transfer-host');
      if(!host){
        host = document.createElement('div');
        host.className = 'booking-stage2-transfer-host';
      }
      return host;
    }

    function placeStage2ContentForView(cfg, stage, bookingCard){
      if(!cfg || !bookingCard) return;
      const stepTwo = bookingCard.querySelector('.booking-step-2');
      const stepThree = bookingCard.querySelector('.booking-step-3');
      if(!stepTwo || !stepThree) return;

      const allShiftsBtn = bookingCard.querySelector('.booking-all-shifts-link');
      const host = ensureStage2TransferHost(stepThree);
      if(!host) return;

      const toTransfer = [allShiftsBtn].filter(Boolean);
      const insertBackToStepTwo = (node) => {
        const anchor = stepTwo.querySelector('.guided-inline-hint');
        if(anchor && anchor.parentElement === stepTwo){
          if(anchor.nextSibling){
            stepTwo.insertBefore(node, anchor.nextSibling);
          } else {
            stepTwo.appendChild(node);
          }
          return;
        }
        stepTwo.appendChild(node);
      };

      if(stage === 2){
        if(host.parentElement !== stepThree){
          stepThree.prepend(host);
        }
        toTransfer.forEach((node) => host.appendChild(node));
        stepThree.classList.add('booking-stage2-transfer-enabled');
        return;
      }

      if(host.parentElement){
        toTransfer.forEach((node) => insertBackToStepTwo(node));
        host.remove();
      }
      stepThree.classList.remove('booking-stage2-transfer-enabled');
    }

    function syncCompletedBookingScaffold(viewCfg, bookingCard){
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
      const card = bookingCard || document.getElementById(cfg.cardId);
      if(!card) return;
      const stepsRoot = document.getElementById(cfg.stepsId);
      const chipHost = document.getElementById(cfg.summaryChipsId);
      const stepThree = card.querySelector('.booking-step-3');
      if(!stepsRoot || !stepThree) return;

      let topClose = stepsRoot.querySelector('.booking-completed-top-close');
      let chipBar = chipHost?.querySelector('.booking-completed-chipbar');
      let bottomWrap = stepThree.querySelector('.booking-completed-bottom');

      if(state.bookingCompleted){
        stepsRoot.classList.add('booking-steps-completed');
        if(topClose){
          topClose.remove();
        }
        if(chipHost){
          chipHost.classList.add('visible', 'booking-summary-chips--completed');
          if(!chipBar){
            chipBar = document.createElement('div');
            chipBar.className = 'booking-completed-chipbar';
            chipHost.appendChild(chipBar);
          }
          chipBar.innerHTML = `
            <span class="booking-completed-chipbar-title">Что дальше?</span>
            <button type="button" class="booking-completed-top-close booking-completed-chipbar-close" data-action="reset-booking-all" aria-label="Сбросить бронирование">
              <img class="ac-icon" src="/assets/icons/close.svg" alt="" aria-hidden="true">
            </button>
          `;
        }
        if(!bottomWrap){
          bottomWrap = document.createElement('div');
          bottomWrap.className = 'booking-completed-bottom';
          stepThree.appendChild(bottomWrap);
        }
        bottomWrap.innerHTML = '<a class="completed-followup-link completed-followup-link--bottom cta-main" href="#" data-action="copy-invite-link">Копировать ссылку приглашение</a>';
        stepThree.classList.add('booking-completed-bottom-step');
        return;
      }

      stepsRoot.classList.remove('booking-steps-completed');
      if(topClose) topClose.remove();
      if(chipBar) chipBar.remove();
      if(chipHost){
        chipHost.classList.remove('booking-summary-chips--completed');
      }
      if(bottomWrap) bottomWrap.remove();
      stepThree.classList.remove('booking-completed-bottom-step');
    }

    function renderSteps(viewCfg){
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
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
      const cfg = viewCfg && viewCfg.key ? viewCfg : getBookingViewConfig('desktop');
      syncGuidedState();
      const stage = getBookingStage();
      const shiftList = document.getElementById(cfg.shiftListId);
      const ctaWrap = document.getElementById(cfg.ctaWrapId);
      const ageTabs = document.getElementById(cfg.ageTabsId);
      const chipHost = document.getElementById(cfg.summaryChipsId);
      const ageChip = document.getElementById(cfg.ageChipId);
      const ageChipText = document.getElementById(cfg.ageChipTextId);
      const shiftChip = document.getElementById(cfg.shiftChipId);
      const shiftChipText = document.getElementById(cfg.shiftChipTextId);
      const baseHint = document.getElementById(cfg.hintId);
      const guidedInlineHint = document.getElementById(cfg.guidedInlineHintId);
      const bookingCard = document.getElementById(cfg.cardId);
      const stepThree = bookingCard?.querySelector('.booking-step-3');
      const allShiftsBtn = bookingCard?.querySelector('.booking-all-shifts-link');

      if(!shiftList || !ctaWrap || !ageTabs || !ageChip || !ageChipText || !shiftChip || !shiftChipText) return;

      placeStage2ContentForView(cfg, stage, bookingCard);
      syncCompletedBookingScaffold(cfg, bookingCard);
      const isMobile = cfg.key === 'mobile';
      if(state.bookingCompleted){
        stopVariantFlowScenario();
        shiftList.classList.add('disabled');
        ageTabs.classList.add('hidden');
        ctaWrap.classList.add('hidden');
        ageChip.classList.remove('visible');
        shiftChip.classList.remove('visible');
        if(chipHost){
          chipHost.classList.add('visible', 'booking-summary-chips--completed');
        }
        if(stepThree){
          stepThree.classList.remove('is-force-hidden');
        }
        if(allShiftsBtn){
          allShiftsBtn.classList.add('hidden');
        }
        if(isMobile){
          document.getElementById(cfg.cardId)?.classList.remove('has-mobile-summary-chips');
        }
        if(baseHint){
          baseHint.textContent = '';
          baseHint.classList.remove('is-muted-hidden');
        }
        if(guidedInlineHint){
          guidedInlineHint.textContent = '';
          guidedInlineHint.classList.remove('visible', 'variant-coach');
        }
        return;
      }
      if(allShiftsBtn){
        allShiftsBtn.textContent = 'Все смены по возрастам';
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
        const shouldShowStepThree = stage >= 1;
        stepThree.classList.toggle('is-force-hidden', !shouldShowStepThree);
      }
      if(isMobile){
        document.getElementById(cfg.cardId)?.classList.remove('has-mobile-summary-chips');
      }

      if(stage === 1 || stage === 2){
        ctaWrap.classList.add('hidden');
      }

      if(!hasSelectedAge()){
        const ageHintText = 'Выберите возраст, чтобы увидеть смены и цены.';
        if(baseHint){
          baseHint.textContent = '';
          baseHint.classList.add('is-muted-hidden');
        }
        if(guidedInlineHint){
          guidedInlineHint.textContent = '';
          guidedInlineHint.classList.remove('visible');
          guidedInlineHint.classList.remove('variant-coach');
        }
        stopVariantFlowScenario();
        shiftList.classList.add('disabled');
        hideVariantCoachBadge(cfg);
        return;
      }

      if(baseHint){
        baseHint.textContent = '';
        baseHint.classList.remove('is-muted-hidden');
      }
      if(guidedInlineHint){
        guidedInlineHint.textContent = '';
        guidedInlineHint.classList.remove('visible', 'variant-coach');
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
        scheduleVariantFlowScenario();
        hideVariantCoachBadge(cfg);
        return;
      }

      const shift = getSelectedShift();
      if(shift){
        shiftChipText.textContent = shift.dates;
        if(isMobile){
          document.getElementById(cfg.cardId)?.classList.add('has-mobile-summary-chips');
        }
        shiftChip.classList.add('visible');
        shiftList.classList.add('collapsed');
        if(stepThree){
          stepThree.classList.remove('is-force-hidden');
        }
      }

      if(state.shiftId && state.offerStage === 0){
        stopVariantFlowScenario();
        ctaWrap.classList.add('highlight');
        hideVariantCoachBadge(cfg);
        return;
      }

      stopVariantFlowScenario();
      hideVariantCoachBadge(cfg);
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
      getActiveBookingViewKeys().forEach((prefix) => {
        const cfg = getBookingViewConfig(prefix);
        const inlineHint = document.getElementById(cfg.guidedInlineHintId);
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
          pulseNode(document.getElementById(cfg.ageTabsId));
          return;
        }

        if(!state.shiftId){
          pulseNode(document.getElementById(cfg.shiftListId));
          return;
        }

        if(state.offerStage === 0){
          pulseNode(document.getElementById(cfg.ctaWrapId));
        }
      });
    }

    function showHint(message, requiredStep = ''){
      getActiveBookingViewKeys().forEach((prefix) => {
        const cfg = getBookingViewConfig(prefix);
        const el = document.getElementById(cfg.inlineHintId);
        const baseHint = document.getElementById(cfg.hintId);
        const stage = getBookingStage();
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
        if(baseHint){
          if(stage <= 1){
            baseHint.classList.remove('is-muted-hidden');
          } else {
            baseHint.classList.add('is-muted-hidden');
          }
        }
      });
    }

    function syncBookingHints(){
      getRenderableBookingViewKeys().forEach((prefix) => {
        const cfg = getBookingViewConfig(prefix);
        const el = document.getElementById(cfg.inlineHintId);
        const baseHint = document.getElementById(cfg.hintId);
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

    function stopBookingStage1TitleTypewriter(){
      bookingStage1TitleTypewriterRunId += 1;
      if(bookingStage1TitleTypewriterTimer){
        window.clearTimeout(bookingStage1TitleTypewriterTimer);
        bookingStage1TitleTypewriterTimer = null;
      }
    }

    function runBookingStage1TitleTypewriter(target, text){
      if(!target) return;
      const phrase = String(text || '').trim();
      if(!phrase){
        target.textContent = '';
        target.classList.remove('booking-title-typewriter', 'is-typing', 'is-typed');
        return;
      }
      if(target.classList.contains('is-typing') && target.dataset.typewriterText === phrase){
        return;
      }
      stopBookingStage1TitleTypewriter();
      const runId = bookingStage1TitleTypewriterRunId;
      const typeDelay = 156;
      const moveDelay = 92;
      target.dataset.typewriterText = phrase;
      target.textContent = '';
      target.classList.add('booking-title-typewriter', 'is-typing');
      target.classList.remove('is-typed');
      const wait = (ms) => new Promise((resolve) => {
        bookingStage1TitleTypewriterTimer = window.setTimeout(() => {
          bookingStage1TitleTypewriterTimer = null;
          resolve();
        }, ms);
      });
      const canContinue = () => runId === bookingStage1TitleTypewriterRunId;
      const escapeHtml = (value) => String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      let value = '';
      let caret = 0;
      const render = (showCaret = true) => {
        const left = escapeHtml(value.slice(0, caret));
        const right = escapeHtml(value.slice(caret));
        target.innerHTML = `${left}${showCaret ? '<span class="booking-title-typewriter__caret" aria-hidden="true"></span>' : ''}${right}`;
      };
      const moveCaretTo = async (targetPos) => {
        const to = Math.max(0, Math.min(value.length, targetPos));
        while(caret !== to){
          if(!canContinue()) return false;
          caret += caret < to ? 1 : -1;
          render(true);
          await wait(moveDelay);
        }
        return canContinue();
      };
      const insertAtCaret = async (chunk) => {
        const source = String(chunk || '');
        for(let i = 0; i < source.length; i += 1){
          if(!canContinue()) return false;
          value = value.slice(0, caret) + source[i] + value.slice(caret);
          caret += 1;
          render(true);
          await wait(typeDelay);
        }
        return canContinue();
      };
      const deleteBackward = async (count = 1) => {
        let remaining = Math.max(0, Number(count) || 0);
        while(remaining > 0 && caret > 0){
          if(!canContinue()) return false;
          value = value.slice(0, caret - 1) + value.slice(caret);
          caret -= 1;
          remaining -= 1;
          render(true);
          await wait(typeDelay);
        }
        return canContinue();
      };
      const runScript = async () => {
        if(!await insertAtCaret('Выберите возраст, чтобы увидеть цены и смены.')) return;
        await wait(1200);

        const seenWordStart = value.indexOf('увидеть');
        if(seenWordStart >= 0){
          const letterEPos = seenWordStart + 4;
          if(!await moveCaretTo(letterEPos + 1)) return;
          if(!await deleteBackward(1)) return;
          if(!await insertAtCaret('И')) return;
        }

        await wait(900);
        const pricesStart = value.indexOf('цены и смены');
        if(pricesStart >= 0){
          if(!await moveCaretTo(pricesStart + 'цены и смены'.length)) return;
          if(!await deleteBackward('цены и смены'.length)) return;
          if(!await insertAtCaret('смены и цены')) return;
        }

        await wait(1000);
        const chooseStart = value.indexOf('Выберите');
        if(chooseStart >= 0){
          const itRusStart = chooseStart + 5;
          if(!await moveCaretTo(itRusStart + 2)) return;
          if(!await deleteBackward(2)) return;
          if(!await insertAtCaret('IT')) return;
        }

        if(!canContinue()) return;
        render(true);
        target.classList.remove('is-typing');
        target.classList.add('is-typed');
        bookingStage1TitleTypewriterDone = true;
      };
      runScript().catch(() => {
        bookingStage1TitleTypewriterDone = true;
        target.classList.remove('is-typing');
        target.classList.add('is-typed');
      });
    }

    function renderBookingInfo(viewCfg){
      if(!viewCfg) return;
      const info = document.getElementById(viewCfg.infoId);
      const title = document.getElementById(viewCfg.titleId);
      const lead = document.getElementById(viewCfg.leadId);
      const btn = document.getElementById(viewCfg.startBtnId);
      const hint = document.getElementById(viewCfg.hintId);
      const shift = getSelectedShift();
      const action = getPrimaryActionState();
      const isDesktopPanel = viewCfg.key === 'desktop';
      const isPriceCheckStage = !!shift && state.offerStage === 0;
      const actionText = getResolvedPrimaryActionText(action, shift);

      if(btn){
        btn.classList.remove('hidden');
        const isStageFour = getBookingStage() === 4 && !state.bookingCompleted;
        const shouldUseStackedCta = isStageFour && /^(?:Завершить бронирование|Оформить заявку|Бронировать)\s*·\s*выгода\s+/i.test(actionText);
        if(shouldUseStackedCta){
          const gainText = actionText.replace(/^(?:Завершить бронирование|Оформить заявку|Бронировать)\s*·\s*выгода\s+/i, '').trim();
          btn.innerHTML = `
            <span class="cta-main-line cta-main-line--primary">Завершить бронирование</span>
            <span class="cta-main-line cta-main-line--accent">Выгода ${gainText}</span>
          `;
          btn.dataset.ctaLayout = 'stacked';
          btn.setAttribute('aria-label', `Завершить бронирование. Выгода ${gainText}`);
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
        stopBookingStage1TitleTypewriter();
        bookingStage1TitleTypewriterDone = false;
        if(title){
          title.classList.remove('booking-title-typewriter', 'is-typing', 'is-typed');
        }
        if(title) title.textContent = 'Мы свяжемся с вами в ближайшее время.';
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
        if(info){
          info.innerHTML = `
            <div class="booking-completed-main">
              <button class="completed-followup-image-trigger" type="button" data-action="open-referral-photo" aria-label="Открыть фото в полном размере">
                <img class="completed-followup-image" src="/assets/images/referral-hoodie.jpeg" alt="Фирменная толстовка лагеря">
                <span class="completed-followup-note-overlay">Обычно дети приезжают с друзьями, так им проще адаптироваться. Позовите друга, подарим вам обоим фирменную толстовку.</span>
              </button>
            </div>
          `;
        }
        return;
      }

      if(!hasSelectedAge()){
        const stage1TitleText = 'Выберите возраст, чтобы увидеть смены и цены.';
        if(title){
          if(!bookingStage1TitleTypewriterDone){
            runBookingStage1TitleTypewriter(title, stage1TitleText);
          } else {
            title.textContent = 'ВыбериITе возраст, чтобы увидИть смены и цены.';
            title.classList.add('booking-title-typewriter', 'is-typed');
            title.classList.remove('is-typing');
          }
        }
        if(lead) lead.textContent = '';
        if(info) info.innerHTML = '';
        return;
      }

      stopBookingStage1TitleTypewriter();
      bookingStage1TitleTypewriterDone = false;
      if(title){
        title.classList.remove('booking-title-typewriter', 'is-typing', 'is-typed');
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
      const timerText = isOfferActive() ? formatRemainingCompact(state.expiresAt - Date.now()) : '';
      const basePriceValue = Number(state.basePrice || shift.price || 0);
      const safeVisiblePrice = Number(visiblePriceValue || 0);
      const savingsValue = Math.max(0, basePriceValue - safeVisiblePrice);
      const savingsText = formatPrice(savingsValue);
      const discountPercent = basePriceValue > 0
        ? Math.max(0, Math.round(((basePriceValue - safeVisiblePrice) / basePriceValue) * 100))
        : 0;
      if(state.offerStage >= 1){
        if(title) title.textContent = 'Ваши условия';
        if(lead) lead.textContent = '';
      } else {
        if(title) title.textContent = 'Проверим цену и условия';
        if(lead) lead.textContent = '';
      }

      if(isDesktopPanel && state.offerStage === 0){
        if(info) info.innerHTML = `
          <div class="booking-shift-focus">
            <div class="booking-shift-focus__dates">${shift.dates}</div>
            <div class="booking-shift-focus__days">${shiftDaysLabel(shift)}</div>
            <div class="booking-shift-focus__preliminary">
              <span class="booking-shift-focus__preliminary-label">Предварительная цена</span>
              <span class="booking-shift-focus__preliminary-value">${formatPrice(shift.price)}</span>
            </div>
            <div class="booking-shift-focus__seats">Осталось ${shift.left} мест</div>
          </div>
        `;
        return;
      }

      const isSummaryStage = state.offerStage >= 1;
      if(info) info.innerHTML = isSummaryStage ? `
        <div class="booking-price-box booking-summary-mini">
          <div class="booking-summary-stage4-head">
            <div class="booking-summary-stage4-age">${ageLabel(state.age)} · ${shift.dates}</div>
          </div>
          <div class="booking-price-head">
            <div class="booking-price-col booking-price-col--fixed" style="text-align:left;">
              <small>Зафиксированная цена</small>
              <div class="booking-price-main big">${visiblePrice}</div>
            </div>
          </div>
          <div class="booking-stage4-badges">
            ${discountPercent > 0 ? `<span class="booking-stage4-badge">Скидка ${discountPercent}%</span>` : ''}
            ${savingsValue > 0 ? `<span class="booking-stage4-badge">Выгода ${savingsText}</span>` : ''}
            ${state.code ? `<span class="booking-stage4-badge booking-stage4-badge--code">Код бронирования: ${state.code}</span>` : ''}
          </div>
          <div class="booking-stage4-note">Мы вас ждём</div>
          ${timerText ? `<div class="booking-timer-line" data-live-timer="true"><span class="booking-timer-label">Осталось</span><span class="booking-timer-value">${stripRemainingPrefix(timerText)}</span></div>` : ''}
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
      const renderableViews = getRenderableBookingViewKeys();
      renderableViews.forEach((viewKey) => {
        const cfg = getBookingViewConfig(viewKey);
        try {
          renderBookingInfo(cfg);
          renderSteps(cfg);
          renderGuidedState(cfg);
          applyBookingStageClass(cfg);
          applyBookingStage2Alignment(cfg);
          applyBookingStructureSchema(cfg);
        } catch(err){
          console.warn('[booking] render failed for view:', cfg.key, err);
        }
      });
      syncBookingHints();
      updateBookingScarcityUi();
      scheduleBookingCardMinHeightSync();
      if(getBookingStage() < 4){
        renderableViews.forEach((viewKey) => {
          const cfg = getBookingViewConfig(viewKey);
          closeInlineLead(cfg.inlineLeadScope);
        });
      }
    }

    function getViewportPreviewView(){
      return window.matchMedia('(max-width: 900px)').matches ? 'mobile' : 'desktop';
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
      document.body.classList.toggle(
        'mobile-preview-active',
        requestedView === 'mobile' && USE_DESKTOP_BASE_FOR_MOBILE
      );
      if(mobileView){
        const showLegacyMobile = requestedView === 'mobile' && !USE_DESKTOP_BASE_FOR_MOBILE;
        mobileView.classList.toggle('hidden', !showLegacyMobile);
      }
      safeInvoke({applyHeroAbVariant}, 'applyHeroAbVariant');
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
      safeInvoke({updateSummaryBarVisibility}, 'updateSummaryBarVisibility');
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

    // SECTION 6: View mode controls (desktop/mobile, full/compact).
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

    // SECTION 7: Event bindings (single action pipeline, no direct business logic in handlers).
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

      const ageWrap = e.target.closest(`#${BOOKING_VIEWS.desktop.ageTabsId}, #${BOOKING_VIEWS.mobile.ageTabsId}`);
      const ageBtn = e.target.closest('button');
      if(ageWrap && ageBtn){
        const ageText = (ageBtn.textContent || '').trim();
        if(ageText){
          track('age_select', {age_label: ageText});
        }
      }

      const shiftWrap = e.target.closest(`#${BOOKING_VIEWS.desktop.shiftOptionsId}, #${BOOKING_VIEWS.mobile.shiftOptionsId}`);
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

      const shiftDisabled = e.target.closest(`#${BOOKING_VIEWS.desktop.shiftListId}.disabled, #${BOOKING_VIEWS.mobile.shiftListId}.disabled`);
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
      const network = String(link.dataset.network || '').trim() || (link.querySelector('.social-label')?.textContent || '').trim();
      track('social_click', {network});
    });

    document.getElementById('successTelegramBtn')?.addEventListener('click', () => {
      track('telegram_click', {
        source:'success_modal',
        ...selectedShiftPayload()
      });
      track('hero_variant_telegram_click_new', buildHeroVariantMeta({
        source:'success_modal',
        ...selectedShiftPayload()
      }));
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
      const safeView = viewKey === 'mobile' ? 'mobile' : 'desktop';
      const current = shiftOptionPanels[safeView]?.[panelType] || null;
      shiftOptionPanels[safeView][panelType] = current === shiftId ? null : shiftId;
      renderShiftOptions(safeView);
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

    function renderSeasonCalendar(){
      const grid = document.getElementById('calendarGrid');
      const title = document.getElementById('calendarTitle');
      if(!grid || !title) return;
      const seasonShifts = shifts
        .map((shift, idx) => ({
          ...shift,
          startDate: parseShiftDate(shift.start),
          endDate: parseShiftDate(shift.end),
          colorIndex: idx % 6
        }))
        .filter((shift) => shift.startDate && shift.endDate)
        .sort((a, b) => a.startDate - b.startDate);
      if(!seasonShifts.length) return;
      const seasonShiftById = new Map(seasonShifts.map((shift) => [shift.id, shift]));

      const ruWeek = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
      const ruMonth = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
      const colorPalette = ['#ff8a00', '#38bdf8', '#a78bfa', '#22c55e', '#f43f5e', '#f59e0b'];
      const minStart = seasonShifts[0].startDate;
      const maxEnd = seasonShifts[seasonShifts.length - 1].endDate;
      const firstMonth = new Date(minStart.getFullYear(), minStart.getMonth(), 1);
      const lastMonth = new Date(maxEnd.getFullYear(), maxEnd.getMonth(), 1);
      const cursor = new Date(firstMonth);

      title.textContent = 'Смены лета 2026 · от 48 000 рублей за 7 дней';
      let html = '';

      while(cursor <= lastMonth){
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        if(month === 6){
          cursor.setMonth(cursor.getMonth() + 1);
          continue;
        }
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInMonth = totalDaysInMonth;
        const leading = new Date(year, month, 1).getDay();

        html += `
          <div class="calendar-month">
            <div class="calendar-month-title">${ruMonth[month]} ${year}</div>
            <div class="calendar-month-grid">
        `;
        const cells = [];
        for(let i = 0; i < leading; i += 1){
          cells.push({ empty: true, hasShift: false, html: '<div class="calendar-day empty"></div>' });
        }
        for(let day = 1; day <= daysInMonth; day += 1){
          const date = new Date(year, month, day);
          const matched = seasonShifts.filter((shift) => date >= shift.startDate && date <= shift.endDate);
          const parentOverlays = matched
            .map((shift) => (shift.sourceId ? seasonShiftById.get(shift.sourceId) : null))
            .filter((shift) => shift && date >= shift.startDate && date <= shift.endDate);
          parentOverlays.forEach((parentShift) => {
            if(!matched.some((shift) => shift.id === parentShift.id)){
              matched.push(parentShift);
            }
          });
          matched.sort((a, b) => {
            if(a.id === 'shift-2' && b.id !== 'shift-2') return -1;
            if(b.id === 'shift-2' && a.id !== 'shift-2') return 1;
            const aChild = !!a.sourceId;
            const bChild = !!b.sourceId;
            if(aChild !== bChild) return aChild ? 1 : -1;
            return (a.startDate - b.startDate) || String(a.id).localeCompare(String(b.id));
          });
          if(!matched.length){
            cells.push({
              empty: false,
              hasShift: false,
              html: `
              <div class="calendar-day">
                <span>${day}</span>
                <small>${ruWeek[date.getDay()]}</small>
              </div>
            `
            });
            continue;
          }
          const primary = matched[0];
          const multi = matched.length > 1;
          const hasParentOverlay = matched.some((shift) => shift.id === 'shift-2') && matched.some((shift) => shift.sourceId === 'shift-2');
          const parentShift = matched.find((shift) => shift.id === 'shift-2') || null;
          const childShift = matched.find((shift) => shift.sourceId === 'shift-2') || matched[1] || matched[0];
          const mixA = colorPalette[matched[0].colorIndex] || colorPalette[0];
          const mixB = colorPalette[matched[1]?.colorIndex ?? matched[0].colorIndex] || colorPalette[1];
          const mixC = colorPalette[matched[2]?.colorIndex ?? matched[0].colorIndex] || colorPalette[2];
          const parentOverlayColor = colorPalette[parentShift?.colorIndex ?? matched[0].colorIndex] || colorPalette[0];
          const childOverlayColor = colorPalette[childShift?.colorIndex ?? matched[1]?.colorIndex ?? matched[0].colorIndex] || colorPalette[1];
          cells.push({
            empty: false,
            hasShift: true,
            html: `
            <div class="calendar-day active shift-color-${primary.colorIndex} ${multi ? `multi stack-${Math.min(matched.length, 4)}` : ''} ${hasParentOverlay ? 'has-parent-overlay' : ''}" style="--shift-mix-a:${mixA};--shift-mix-b:${mixB};--shift-mix-c:${mixC};--parent-overlay-color:${parentOverlayColor};--child-overlay-color:${childOverlayColor};" title="${matched.map((shift) => `${shift.label || shift.title}: ${shift.dates}`).join(' · ')}">
              <span>${day}</span>
              <small>${ruWeek[date.getDay()]}${multi ? ` · ${matched.length}` : ''}</small>
            </div>
          `
          });
        }
        while(cells.length % 7 !== 0){
          cells.push({ empty: true, hasShift: false, html: '<div class="calendar-day empty"></div>' });
        }
        for(let i = 0; i < cells.length; i += 7){
          const week = cells.slice(i, i + 7);
          const hasShiftWeek = week.some((cell) => cell.hasShift);
          if(!hasShiftWeek) continue;
          html += `<div class="calendar-week">${week.map((cell) => cell.html).join('')}</div>`;
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

    function openSeasonCalendar(){
      closeTransientModals('calendar');
      renderSeasonCalendar();
      document.getElementById('calendarModal')?.classList.remove('hidden');
      track('season_calendar_open');
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
        <div class="booking-summary-line">
          <span class="booking-summary-line__segment booking-summary-line__segment--price"><span class="booking-summary-price">${formatPrice(state.offerPrice || state.basePrice || shift.price)}</span></span>
          <span class="booking-summary-sep" aria-hidden="true">•</span>
          <span class="booking-summary-line__segment">
            <span class="booking-summary-selection">${ageLabel(state.age)}</span>
          </span>
          <span class="booking-summary-sep" aria-hidden="true">•</span>
          <span class="booking-summary-line__segment booking-summary-line__segment--date">
            <span class="booking-summary-selection booking-summary-selection--date">${shift.dates}</span>
          </span>
        </div>
        ${timeLeft ? `
        <div class="booking-summary-timer">
          <div class="booking-summary-timer-title">Цена закреплена за вами</div>
          <div class="booking-timer-line booking-timer-line--summary" data-live-timer="true">${timeLeft}</div>
        </div>
        ` : ''}
      `;
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
        for(let tapIndex = 0; tapIndex < 3; tapIndex += 1){
          if(runToken !== desktopAgeTapHintToken || !canRunDesktopAgeTapHint()) break;
          pulseDesktopAgeTapHint(hintNode, ageRow);
          await waitDesktopAgeTapHint(680);
          if(tapIndex < 2){
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
      const isFirstRun = desktopAgeTapHintToken === 0;
      const delayMs = isFirstRun
        ? Math.max(0, 7000 - elapsedMs)
        : 7000;
      desktopAgeTapHintTimer = setTimeout(() => {
        desktopAgeTapHintTimer = null;
        runDesktopAgeTapHint().catch(() => {
          desktopAgeTapHintRunning = false;
          hideDesktopAgeTapHint();
        });
      }, delayMs);
    }

    function clearVariantFlowFingerTimer(){
      if(!variantFlowFingerTimer) return;
      window.clearTimeout(variantFlowFingerTimer);
      variantFlowFingerTimer = null;
    }

    function waitVariantFlow(ms, runId){
      return new Promise((resolve) => {
        variantFlowFingerTimer = window.setTimeout(() => {
          variantFlowFingerTimer = null;
          resolve(runId === variantFlowRunId);
        }, ms);
      });
    }

    function ensureVariantFlowFinger(){
      let node = document.getElementById('variantFlowFinger');
      if(!node){
        node = document.createElement('div');
        node.id = 'variantFlowFinger';
        node.className = 'variant-flow-finger';
        node.setAttribute('aria-hidden', 'true');
        document.body.appendChild(node);
      }
      if(!node.querySelector('.variant-flow-finger-glyph')){
        node.innerHTML = `
          <span class="variant-flow-finger-glyph" aria-hidden="true"></span>
          <span class="variant-flow-finger-ripple" aria-hidden="true"></span>
          <span class="variant-flow-finger-ripple delay" aria-hidden="true"></span>
        `;
      }
      return node;
    }

    function hideVariantFlowFinger(){
      const node = document.getElementById('variantFlowFinger');
      if(node){
        node.classList.remove('visible', 'is-tapping');
      }
      document.querySelectorAll('.variant-flow-target').forEach((el) => {
        el.classList.remove('variant-flow-target');
      });
    }

    function stopVariantFlowScenario(){
      variantFlowRunId += 1;
      clearVariantFlowFingerTimer();
      hideVariantFlowFinger();
    }

    function placeVariantFlowFinger(finger, targetEl){
      if(!finger || !targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const x = rect.left + (rect.width * 0.5);
      const y = rect.top + (rect.height * 0.5);
      finger.style.setProperty('--variant-flow-x', `${Math.round(x)}px`);
      finger.style.setProperty('--variant-flow-y', `${Math.round(y)}px`);
      finger.classList.add('visible');
    }

    async function runVariantFlowForTargets(targets, runId){
      const finger = ensureVariantFlowFinger();
      if(!finger || !targets.length) return;
      for(const target of targets){
        if(runId !== variantFlowRunId) return;
        if(!target || !target.isConnected) continue;
        document.querySelectorAll('.variant-flow-target').forEach((el) => el.classList.remove('variant-flow-target'));
        target.classList.add('variant-flow-target');
        placeVariantFlowFinger(finger, target);
        const warmupOk = await waitVariantFlow(260, runId);
        if(!warmupOk) return;
        for(let tap = 0; tap < 3; tap += 1){
          if(runId !== variantFlowRunId) return;
          finger.classList.remove('is-tapping');
          void finger.offsetWidth;
          finger.classList.add('is-tapping');
          const tapOk = await waitVariantFlow(360, runId);
          if(!tapOk) return;
          if(tap < 2){
            const pauseOk = await waitVariantFlow(220, runId);
            if(!pauseOk) return;
          }
        }
        const settleOk = await waitVariantFlow(360, runId);
        if(!settleOk) return;
      }
    }

    function getVariantFlowKey(){
      const variant = heroVariantState || resolveHeroVariantFromUtm();
      const tier = variant.tier || HERO_VARIANT_DEFAULT_TIER;
      const mode = (tier === 'tier2' || tier === 'tier4') ? 'menu' : 'info';
      const view = state.previewView === 'mobile' ? 'mobile' : 'desktop';
      return `${tier}:${mode}:${view}`;
    }

    async function runVariantFlowScenario(){
      if(!hasSelectedAge() || !!state.shiftId || getBookingStage() !== 2 || state.bookingCompleted){
        hideVariantFlowFinger();
        return;
      }
      const variant = heroVariantState || resolveHeroVariantFromUtm();
      const tier = variant.tier || HERO_VARIANT_DEFAULT_TIER;
      const mode = (tier === 'tier2' || tier === 'tier4') ? 'menu' : 'info';
      const runId = ++variantFlowRunId;
      const flowKey = getVariantFlowKey();
      if(variantFlowCompletedKey === flowKey){
        return;
      }
      hideVariantFlowFinger();
      const preWaitOk = await waitVariantFlow(320, runId);
      if(!preWaitOk || runId !== variantFlowRunId) return;

      if(mode === 'info'){
        const cfg = getPrimaryBookingViewConfig();
        const host = document.getElementById(cfg.shiftOptionsId || '');
        const infoButtons = host ? [...host.querySelectorAll('[data-action="toggle-shift-about"]')].slice(0, 2) : [];
        await runVariantFlowForTargets(infoButtons, runId);
      } else if(state.previewView === 'mobile'){
        setHeroMenuOpen(true);
        const openOk = await waitVariantFlow(280, runId);
        if(!openOk || runId !== variantFlowRunId) return;
        const shiftsMenuBtn = document.querySelector('#serviceMenu [data-nav="section-programs"]');
        await runVariantFlowForTargets(shiftsMenuBtn ? [shiftsMenuBtn] : [], runId);
        if(runId === variantFlowRunId){
          setHeroMenuOpen(false);
        }
      } else {
        const cfg = getPrimaryBookingViewConfig();
        const card = document.getElementById(cfg.cardId || '');
        const allShiftsBtn = card?.querySelector('.booking-all-shifts-link');
        await runVariantFlowForTargets(allShiftsBtn ? [allShiftsBtn] : [], runId);
      }

      if(runId === variantFlowRunId){
        hideVariantFlowFinger();
        variantFlowCompletedKey = flowKey;
      }
    }

    function scheduleVariantFlowScenario(){
      if(!hasSelectedAge() || !!state.shiftId || getBookingStage() !== 2 || state.bookingCompleted){
        stopVariantFlowScenario();
        return;
      }
      runVariantFlowScenario().catch(() => {
        stopVariantFlowScenario();
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

    function renderShiftOptions(viewKey){
      const safeViewKey = viewKey === 'mobile' ? 'mobile' : 'desktop';
      const targetId = resolveShiftOptionsTargetId(safeViewKey);
      const box = document.getElementById(targetId);
      if(!box) return;

      const selectedAge = state.age || '7-9';
      const summaryLines = getShiftSummaryLines(selectedAge);

      box.innerHTML = shifts.slice(0,2).map(s => {
        const isInlineView = safeViewKey === 'mobile';
        const showAbout = isInlineView && shiftOptionPanels[safeViewKey]?.aboutId === s.id;
        const showCalendar = isInlineView && shiftOptionPanels[safeViewKey]?.calendarId === s.id;
        const start = parseShiftDate(s.start);
        const end = parseShiftDate(s.end);
        const startText = start ? start.toLocaleDateString('ru-RU') : s.start;
        const endText = end ? end.toLocaleDateString('ru-RU') : s.end;

        return `
        <div class="shift-option ${state.shiftId === s.id ? 'active' : ''}" data-id="${s.id}">
          <div class="shift-option-head">
            <strong>
              <span class="shift-option-dates">${s.dates}</span>
            </strong>
            <small>
              <span class="shift-option-seats">осталось ${s.left} мест</span>
              <span class="shift-option-price-row">
                <span class="shift-option-price">${formatPrice(s.price)}</span>
                <span class="shift-option-inline-actions">
                  <button class="shift-option-action shift-option-action-info" type="button" data-action="toggle-shift-about" data-shift-id="${s.id}" data-shift-view="${safeViewKey}" aria-label="Описание смены ${s.dates}">
                    <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/info-circle.svg" alt="" aria-hidden="true">
                  </button>
                  <button class="shift-option-action shift-option-action-calendar" type="button" data-action="toggle-shift-calendar-inline" data-shift-id="${s.id}" data-shift-view="${safeViewKey}" aria-label="Календарь ${s.dates}">
                    <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/calendar3.svg" alt="" aria-hidden="true">
                  </button>
                  <button class="shift-option-select-indicator" type="button" aria-label="Выбрать смену ${s.dates}">
                    <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/chevron-right.svg" alt="" aria-hidden="true">
                  </button>
                </span>
              </span>
            </small>
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
      const mainShifts = shifts.filter((s) => !s.isShort);
      const shortShifts = shifts.filter((s) => !!s.isShort);
      const showExtendedDescription = hasSelectedAge();
      const cleanShiftCardTitle = (title) => {
        const raw = String(title || '').trim();
        const cleaned = raw
          .replace(/^\s*\d+(?:[.,]\d+)?\s*[\])}.:\-–—,]?\s*/u, '')
          .replace(/^(?:TT|ТТ)\s*[\d.]+[\s:.\-–—]*/iu, '')
          .trim();
        return cleaned || raw;
      };

      grid.innerHTML = mainShifts.map(s => `
        <div class="mini-card">
          <h4>${cleanShiftCardTitle(s.title)}</h4>
          <div class="price-row">
            <strong>${formatPrice(s.price)}</strong>
            <span class="price-row-actions">
              <button class="shift-calendar-btn shift-about-btn" type="button" data-action="toggle-shift-about" data-shift-id="${s.id}" aria-label="Описание смены ${s.title}">
                <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/info-circle.svg" alt="" aria-hidden="true">
              </button>
              <button class="shift-calendar-btn" type="button" data-action="open-calendar" data-shift-id="${s.id}" aria-label="Календарь ${s.title}">
                <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/calendar3.svg" alt="" aria-hidden="true">
              </button>
            </span>
          </div>
          <div class="price-row-meta">${s.dates} · ${shiftDaysLabel(s)}</div>
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
              <h4>${cleanShiftCardTitle(s.title)}</h4>
              <span class="short-shift-tag">короткая смена</span>
            </div>
            <div class="price-row">
              <strong>${formatPrice(s.price)}</strong>
              <span class="price-row-actions">
                <button class="shift-calendar-btn shift-about-btn" type="button" data-action="toggle-shift-about" data-shift-id="${s.id}" aria-label="Описание смены ${s.title}">
                  <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/info-circle.svg" alt="" aria-hidden="true">
                </button>
                <button class="shift-calendar-btn" type="button" data-action="open-calendar" data-shift-id="${s.id}" aria-label="Календарь ${s.title}">
                  <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/calendar3.svg" alt="" aria-hidden="true">
                </button>
              </span>
            </div>
            <div class="price-row-meta">${s.dates}</div>
            ${showExtendedDescription
              ? `
                <p><strong>Коротко:</strong> ${s.desc || ''}</p>
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
        city_phone:'/assets/icons/phone-city.svg',
        mobile_phone:'/assets/icons/phone-mobile.svg',
        whatsapp:'/assets/icons/whatsapp.svg',
        telegram:'/assets/icons/telegram.svg'
      };
      const src = map[label];
      return src ? `<img class="ac-icon" src="${src}" alt="" aria-hidden="true">` : '•';
    }

    function resolveFloatingContactLinks(){
      const contacts = Array.isArray(mediaContent.contacts) ? mediaContent.contacts : [];
      const mobilePhone = contacts.find((item) => item.label === 'mobile_phone');
      const cityPhone = contacts.find((item) => item.label === 'city_phone');
      const whatsapp = contacts.find((item) => item.label === 'whatsapp');
      const telegram = contacts.find((item) => item.label === 'telegram');
      return {
        cityPhoneHref: (cityPhone && cityPhone.href) || 'tel:+74951284429',
        cityPhoneLabel: (cityPhone && cityPhone.text) || '+7 (495) 128-44-29',
        mobilePhoneHref: (mobilePhone && mobilePhone.href) || 'tel:+79688086455',
        mobilePhoneLabel: (mobilePhone && mobilePhone.text) || '+7 (968) 808-64-55',
        whatsappHref: (whatsapp && whatsapp.href) || 'https://wa.me/79688086455',
        telegramHref: (telegram && telegram.href) || 'https://t.me/Progaschool',
      };
    }

    function initFloatingContactsWidget(){
      if(document.getElementById('floatingContactsWidget')) return;
      const links = resolveFloatingContactLinks();
      const host = document.createElement('div');
      host.id = 'floatingContactsWidget';
      host.className = 'floating-contacts';
      host.innerHTML = `
        <div class="floating-contacts-panel" id="floatingContactsPanel" aria-label="Быстрые контакты">
          <a class="floating-contacts-link" href="${links.cityPhoneHref}">
            <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/telephone.svg" alt="" aria-hidden="true">
            <span class="floating-contacts-label">${links.cityPhoneLabel}</span>
          </a>
          <a class="floating-contacts-link" href="${links.mobilePhoneHref}">
            <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/telephone-fill.svg" alt="" aria-hidden="true">
            <span class="floating-contacts-label">${links.mobilePhoneLabel}</span>
          </a>
          <a class="floating-contacts-link" href="${links.whatsappHref}" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/whatsapp.svg" alt="" aria-hidden="true">
            <span class="floating-contacts-label">WhatsApp</span>
          </a>
          <a class="floating-contacts-link" href="${links.telegramHref}" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/telegram.svg" alt="" aria-hidden="true">
            <span class="floating-contacts-label">Telegram</span>
          </a>
        </div>
        <button type="button" class="floating-contacts-toggle" id="floatingContactsToggle" aria-expanded="false" aria-controls="floatingContactsPanel" aria-label="Открыть контакты">
          <svg class="floating-contacts-glyph" viewBox="0 0 24 24" aria-hidden="true">
            <path class="floating-contacts-glyph-outline" d="M4.5 5.5h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4.5 3v-3H4.5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"></path>
            <circle class="floating-contacts-dot floating-contacts-dot-left" cx="8" cy="11.5" r="1.35"></circle>
            <circle class="floating-contacts-dot floating-contacts-dot-center" cx="12" cy="11.5" r="1.35"></circle>
            <circle class="floating-contacts-dot floating-contacts-dot-right" cx="16" cy="11.5" r="1.35"></circle>
          </svg>
        </button>
      `;
      document.body.appendChild(host);

      const toggle = host.querySelector('#floatingContactsToggle');
      if(!toggle) return;
      toggle.addEventListener('click', () => {
        const isOpen = host.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        track('floating_contacts_toggle', {open:isOpen ? 1 : 0});
      });

      host.querySelectorAll('.floating-contacts-link').forEach((link) => {
        link.addEventListener('click', () => {
          host.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          const label = String(link.querySelector('.floating-contacts-label')?.textContent || '').toLowerCase();
          track('floating_contacts_click', {channel: label});
        });
      });

      document.addEventListener('click', (event) => {
        if(!host.classList.contains('is-open')) return;
        if(host.contains(event.target)) return;
        host.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });

      document.addEventListener('keydown', (event) => {
        if(event.key !== 'Escape') return;
        if(!host.classList.contains('is-open')) return;
        host.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }

    function socialBadgeMark(item){
      const mark = String(item?.label || '').trim().toUpperCase();
      const allowed = new Set(['VK','RT','IG','OK','YT','LI','TT','PI','YA']);
      return allowed.has(mark) ? mark : '•';
    }

    function socialDisplayName(item){
      const key = String(item?.key || '').trim();
      const badge = socialBadgeMark(item);
      if(!key) return badge;
      if(key.toUpperCase() !== badge) return key;
      if(key === 'VK') return 'ВКонтакте';
      return key;
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

    // SECTION 5: Content and media rendering.
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
          <a class="social-link" href="${item.href}" target="_blank" rel="noopener noreferrer" data-network="${item.key}">
            <span class="social-badge-mark">${socialBadgeMark(item)}</span>
            <span class="social-label">${socialDisplayName(item)}</span>
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
                  <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/chevron-right.svg" alt="" aria-hidden="true">
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
      const stayCards = getCompactStayCards();
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

    function getCompactStayCards(){
      let cards = Array.from(document.querySelectorAll('#section-stay .stay-card')).map((card) => {
        return {
          img: card.querySelector('img')?.getAttribute('src') || '',
          title: (card.querySelector('.stay-card-body strong')?.textContent || '').trim(),
          text: (card.querySelector('.stay-card-body span')?.textContent || '').trim()
        };
      }).filter((item) => item.title);
      if(!cards.length){
        cards = [
          {
            img:'/assets/images/cdn-cache/53d52bed_45b1eb46cf5961c2188d.jpg.webp',
            title:'Комнаты и размещение',
            text:'Спокойные светлые комнаты, удобное размещение и бытовая среда без ощущения «походного лагеря».'
          },
          {
            img:'/assets/images/cdn-cache/62b758b3_63e9322f53ec8ca1b307.jpg.webp',
            title:'Санузлы и бытовые зоны',
            text:'Родителям важно понимать не только программу, но и бытовой комфорт ребёнка.'
          },
          {
            img:'/assets/images/stay-common-lounge.webp',
            title:'Общая гостиная и зона отдыха',
            text:'Тёплое общее пространство для спокойного досуга, настольных игр и вечернего общения под присмотром вожатых.'
          }
        ];
      }
      return cards;
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
            <img class="mobile-team-feature-cover" src="/assets/images/cdn-cache/8fc8172e_8991804334.webp" alt="Собственная книга по Python">
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
        <a class="mobile-social-link" href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${socialDisplayName(item)}">
          <span class="mobile-social-icon"><span class="social-badge-mark">${socialBadgeMark(item)}</span></span>
          <span class="mobile-social-label">${socialDisplayName(item)}</span>
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
          <div class="mobile-journey-dots" aria-label="Навигация по шагам">
            ${steps.map((_, index) => `
              <button
                type="button"
                class="mobile-journey-dot ${index === safeStep ? 'active' : ''}"
                data-action="mobile-journey-step"
                data-step-index="${index}"
                aria-label="Шаг ${index + 1}"
              ></button>
            `).join('')}
          </div>
        `;
        journeyTargets.forEach((target) => {
          target.innerHTML = journeyHtml;
        });
      }

      if (programsTargets.length) {
        const mainShifts = shifts.slice();
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
              <div class="mobile-program-dates">
                ${activeShift.dates}
              </div>
              <div class="mobile-program-price-row">
                <div class="mobile-program-price">${formatPrice(activeShift.price)}</div>
                <div class="mobile-program-inline-actions">
                  <button
                    class="shift-calendar-btn shift-about-btn"
                    type="button"
                    data-action="toggle-shift-about"
                    data-shift-id="${activeShift.id}"
                    aria-label="Описание смены ${activeShift.title}"
                  >
                    <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/info-circle.svg" alt="" aria-hidden="true">
                  </button>
                  <button
                    class="shift-calendar-btn"
                    type="button"
                    data-action="open-calendar"
                    data-shift-id="${activeShift.id}"
                    aria-label="Календарь ${activeShift.title}"
                  >
                    <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/calendar3.svg" alt="" aria-hidden="true">
                  </button>
                </div>
              </div>
              <div class="mobile-program-meta">
                ${activeShift.isShort ? '' : `<span>${shiftDaysLabel(activeShift)}</span>`}
                <span>Осталось ${activeShift.left} мест</span>
                ${activeShift.isShort ? '<span class="mobile-program-short-badge">Короткая смена</span>' : ''}
              </div>
              <p>${activeShift.isShort ? (activeShift.desc || '') : getShiftDisplayDescription(activeShift)}</p>
              ${ageHint ? `<div class="mobile-program-hint">${ageHint}</div>` : ''}
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
        const list = getPhotosForActiveFilter(state.photoFilter);
        photoGalleryList = list.slice();
        activePhotoList = list.slice();
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
                <span class="mobile-media-play"><img class="ac-icon" src="/assets/icons/play.svg" alt="" aria-hidden="true"></span>
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
              <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/chevron-right.svg" alt="" aria-hidden="true">
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
              <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/chevron-right.svg" alt="" aria-hidden="true">
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
              <img class="ac-icon" src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/chevron-right.svg" alt="" aria-hidden="true">
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

    // SECTION 8: Global orchestrator.
    function renderAll(){
      applyMobileTemplatesToDesktopSections();
      renderShiftOptionsForRenderableViews();
      renderBookingPanels();
      syncDesktopAgeTapHintVisibility();
      scheduleDesktopAgeTapHint();
      renderMediaSections();
      if(!USE_DESKTOP_BASE_FOR_MOBILE){
        applyMobileSectionAccordion();
      }
      renderDesktopMobileDocsBlock();
      renderSummary();
      syncLegalDocLinks();
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
      const variant = heroVariantState || resolveHeroVariantFromUtm();
      const copy = variant.copy || HERO_VARIANT_COPY[HERO_VARIANT_DEFAULT_TIER];
      if(!hasSelectedAge()){
        track('hero_variant_click_new', buildHeroVariantMeta({cta: variant.copy?.cta || ''}));
        const hintText = copy.hintStage1 || 'Чтобы продолжить, выберите возраст.';
        showHint(hintText, 'age');
        nudgeUserToNextStep(hintText);
        return;
      }

      if(!state.shiftId){
        const hintText = formatVariantHint(copy.hintStage2 || 'Выберите подходящую смену.');
        showHint(hintText, 'shift');
        nudgeUserToNextStep(hintText);
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
                <img class="ac-icon" src="/assets/icons/close.svg" alt="" aria-hidden="true">
              </button>
            </div>
            <div class="offer-legacy-search-icon" aria-hidden="true">
              <img class="offer-legacy-search-icon__asset" src="/assets/icons/offer-search.svg" alt="">
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
                <img class="ac-icon" src="/assets/icons/close.svg" alt="" aria-hidden="true">
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

      if(state.code){
        state.previousCode = state.code;
      }
      state.code = generateCode();
      state.nextCodePreview = null;
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
                <img class="ac-icon" src="/assets/icons/close.svg" alt="" aria-hidden="true">
              </button>
            </div>
            <div class="offer-legacy-result-banner">
              <div class="offer-legacy-result-banner__icon" aria-hidden="true">
                <img class="offer-legacy-result-banner__asset" src="/assets/icons/search-job-svgrepo-com.svg" alt="">
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
              <button class="cta-main" id="offerApplyBtn" data-action="apply-offer" type="button">Забронировать</button>
            </div>
            <div class="inline-lead-host hidden" id="offerInlineLeadHost"></div>
          </div>
        `
        : `
          <div class="offer-state-shell offer-state-shell--result">
            <div class="offer-headline">
              <h3>Нашли лучшие условия</h3>
              <button class="form-close offer-close-btn" type="button" data-action="close-offer" aria-label="Закрыть">
                <img class="ac-icon" src="/assets/icons/close.svg" alt="" aria-hidden="true">
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
              <button class="cta-main" id="offerApplyBtn" data-action="apply-offer" type="button">Забронировать</button>
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
            const timerValueNode = node.querySelector('.booking-timer-value');
            if(timerValueNode){
              timerValueNode.textContent = '';
            } else {
              node.textContent = '';
            }
          });
          renderBookingPanels();
          return;
        }

        const fullText = formatRemaining(diff);
        const compactText = normalizeCompactTimerText(formatRemainingCompact(diff));

        if(offerTimer) offerTimer.textContent = fullText;
        if(summaryTimer) summaryTimer.textContent = compactText;
        bookingTimers.forEach((node) => {
          const timerValueNode = node.querySelector('.booking-timer-value');
          if(timerValueNode){
            timerValueNode.textContent = stripRemainingPrefix(compactText);
          } else {
            node.textContent = compactText;
          }
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
      const cardSelector = `#${getPrimaryBookingViewConfig().cardId}`;
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
      document.getElementById('summaryMeta').textContent = isStageFourSummary
        ? ''
        : `${shift.dates}${state.code ? ` · Код ${state.code}` : ''}`;
      document.getElementById('summaryPrice').textContent = formatPrice(price);
      const summaryCtaBtn = bar.querySelector('[data-action="primary-cta"]');
      if(summaryCtaBtn){
        const action = getPrimaryActionState();
        const actionText = getResolvedPrimaryActionText(action, shift);
        if(isStageFourSummary && /^(?:Завершить бронирование|Оформить заявку|Бронировать)\s*·\s*выгода\s+/i.test(actionText)){
          const gainText = actionText.replace(/^(?:Завершить бронирование|Оформить заявку|Бронировать)\s*·\s*выгода\s+/i, '').trim();
          summaryCtaBtn.innerHTML = `
            <span class="cta-main-line cta-main-line--primary">Завершить бронирование</span>
            <span class="cta-main-line cta-main-line--accent">Выгода ${gainText}</span>
          `;
          summaryCtaBtn.setAttribute('aria-label', `Завершить бронирование · Выгода ${gainText}`);
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
      return 'Забронировать';
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
      track('hero_variant_form_open_new', buildHeroVariantMeta({
        ...selectedShiftPayload(),
        lead_scope: scope
      }));
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
      track('hero_variant_form_open_new', buildHeroVariantMeta({
        ...selectedShiftPayload(),
        lead_scope: 'drawer'
      }));
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
      const actionsEl = document.getElementById('noticeActions');
      noticeConfirmHandler = null;
      if(titleEl) titleEl.textContent = title;
      if(messageEl) messageEl.textContent = message || '';
      if(actionsEl){
        actionsEl.classList.add('hidden');
        actionsEl.classList.remove('notice-actions--reset-booking');
      }
      overlay.classList.remove('hidden');
    }

    function closeNoticeModal(){
      noticeConfirmHandler = null;
      const actionsEl = document.getElementById('noticeActions');
      if(actionsEl){
        actionsEl.classList.add('hidden');
        actionsEl.classList.remove('notice-actions--reset-booking');
      }
      document.getElementById('noticeOverlay')?.classList.add('hidden');
    }

    function ensureNoticeActions(){
      const overlay = document.getElementById('noticeOverlay');
      const card = overlay?.querySelector('.notice-card');
      if(!overlay || !card) return null;
      let actionsEl = document.getElementById('noticeActions');
      if(actionsEl) return actionsEl;
      actionsEl = document.createElement('div');
      actionsEl.id = 'noticeActions';
      actionsEl.className = 'notice-actions hidden';
      actionsEl.innerHTML = `
        <button class="secondary-outline notice-cancel-btn" type="button" data-action="close-notice">Отмена</button>
        <button class="cta-main notice-confirm-btn" type="button" data-action="confirm-notice">Подтвердить</button>
      `;
      card.appendChild(actionsEl);
      return actionsEl;
    }

    function openResetBookingConfirmModal(){
      openNoticeModal(
        'Это действие аннулирует ваше предварительное бронирование. Вы точно хотите продолжить?',
        'Сбросить бронирование?'
      );
      const actionsEl = ensureNoticeActions();
      if(!actionsEl) return;
      const cancelBtn = actionsEl.querySelector('.notice-cancel-btn');
      const confirmBtn = actionsEl.querySelector('.notice-confirm-btn');
      if(cancelBtn) cancelBtn.textContent = 'Отмена';
      if(confirmBtn) confirmBtn.textContent = 'Сбросить';
      actionsEl.classList.add('notice-actions--reset-booking');
      noticeConfirmHandler = () => {
        resetOfferState({preserveShift:false});
        state.age = null;
        state.ageSelected = false;
        persist();
        renderAll();
      };
      actionsEl.classList.remove('hidden');
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
        sent_at_local: new Date().toLocaleString('ru-RU'),
        ...buildAbMeta()
      };
      track('form_submit', {
        ...selectedShiftPayload(),
        booking_code: state.code || '',
        lead_scope: scope,
        parent_name_present: !!name,
        phone_present: !!phone
      });
      track('hero_variant_form_submit_new', buildHeroVariantMeta({
        ...selectedShiftPayload(),
        booking_code: state.code || '',
        lead_scope: scope,
        parent_name_present: !!name,
        phone_present: !!phone
      }));
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
      if(cleanId === 'section-faq'){
        trackFaqOpen();
      }
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
          window.open(buildLegalDocUrl('#legal-info'), '_blank', 'noopener');
        }
        return;
      }

      if(!scrollToSection(cleanId) && cleanId === 'section-legal'){
        window.open(buildLegalDocUrl('#legal-info'), '_blank', 'noopener');
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

    (function bindMobileStaySwipe(){
      let startX = 0;
      let startY = 0;
      let activeCard = null;

      document.addEventListener('touchstart', (e) => {
        const card = e.target.closest('.mobile-stay-feature, .mobile-stay-feature-photo');
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
        const list = getCompactStayCards();
        const total = Math.max(0, list.length || 0);
        if(!total) return;
        state.mobileStayIndex = (Math.max(0, state.mobileStayIndex || 0) + (dx < 0 ? 1 : -1) + total) % total;
        renderCompactTrustPanelContent();
        persist();
      }, {passive:true});
    })();

    (function bindMobilePhotoSwipe(){
      let startX = 0;
      let startY = 0;
      let activeNode = null;

      document.addEventListener('touchstart', (e) => {
        const node = e.target.closest('.mobile-photo-stage, .mobile-photo-preview-strip');
        if(!node) return;
        const touch = e.touches && e.touches[0];
        if(!touch) return;
        activeNode = node;
        startX = touch.clientX;
        startY = touch.clientY;
      }, {passive:true});

      document.addEventListener('touchend', (e) => {
        if(!activeNode) return;
        const touch = e.changedTouches && e.changedTouches[0];
        activeNode = null;
        if(!touch) return;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if(Math.abs(dx) < 34 || Math.abs(dx) <= Math.abs(dy)) return;
        const list = getPhotosForActiveFilter(state.photoFilter);
        const total = Math.max(0, list.length || 0);
        if(!total) return;
        const current = Math.max(0, Number(state.mobilePhotoIndex || 0));
        state.mobilePhotoIndex = (current + (dx < 0 ? 1 : -1) + total) % total;
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
        safeInvoke({applyHeroAbVariant}, 'applyHeroAbVariant');
        applyCompactSectionModalLayout();
        safeInvoke({updateSummaryBarVisibility}, 'updateSummaryBarVisibility');
        scheduleBookingCardMinHeightSync();
      }, 160);
    }, {passive:true});

    heroAbVariant = resolveHeroAbVariant();
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
    applyHeroContrastMode();
    applyHeroMicroMode();
    applyOfferModalTheme();
    applyOfferLayoutMode();
    applyDesktopMode();
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      applyMobileMode();
    }
    normalizeCloseIconButtons();
    const deferredInit = () => {
      applyDebugUiState();
      injectHeroSeasonOfferCta();
      initFloatingContactsWidget();
      initHeroAbDevPanel();
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
      scheduleDesktopAgeTapHint();
      runQualityPipelineAll();
    };
    window.setTimeout(deferredInit, 0);

    if(state.expiresAt && Date.now() < state.expiresAt){
      startTimer();
    }
