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
        fullDesc:[
          'Мягкий вход в программирование через понятные и быстрые результаты.',
          'Для 7–9 лет: ребёнок работает в Scratch и Minecraft, делает первые проекты и понимает базовую логику через игру.',
          'Для 10–12 лет: начинает писать код на Python, создаёт простые программы и видит, как работает логика внутри.',
          'Для 13–14 лет: пробует первые проекты с элементами AI, знакомится с нейросетями и делает первые осмысленные шаги в сторону современных технологий.',
          'Главное — ребёнок не слушает, а делает и получает результат уже в первые дни.'
        ].join(' ')
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
        fullDesc:[
          'Смена, где ребёнок начинает реально понимать, как всё устроено.',
          'Для 7–9 лет: усложняются проекты, появляется больше самостоятельности, ребёнок начинает осознанно собирать логику.',
          'Для 10–12 лет: работает с Python, делает игры и ботов, начинает понимать структуру кода и алгоритмы.',
          'Для 13–14 лет: разбирается с более сложными задачами, пробует нейросети и делает проекты с логикой «как в реальных IT-продуктах».',
          'Результат — не просто интерес, а ощущение «я могу и понимаю».'
        ].join(' ')
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
        fullDesc:[
          'Короткая смена на 7 дней.',
          'Ускоренный формат с фокусом на практике: ребёнок делает проект, прокачивает логику и закрепляет базовые навыки программирования через понятные задачи.',
          'Для 7–9 лет — упор на Scratch и визуальную логику; для 10–12 лет — первые уверенные шаги в Python и структуре кода;',
          'для 13–14 лет — проектная сборка с элементами AI.',
          'Формат короткий, но результатный.'
        ].join(' ')
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
        fullDesc:[
          'Короткая смена на 8 дней.',
          'Интенсивное продолжение проектной работы: ребёнок усиливает логику, доводит задачи до результата и закрепляет навыки программирования в прикладном формате.',
          'Для 7–9 лет — развитие проектов в Scratch; для 10–12 лет — практический Python и алгоритмы;',
          'для 13–14 лет — более сложные задачи и работа с AI-инструментами.',
          'Короткий цикл с фокусом на конкретный прогресс.'
        ].join(' ')
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
        fullDesc:[
          'Баланс между программированием, командной работой и лагерной жизнью.',
          'Для 7–9 лет: ребёнок продолжает делать проекты, но больше взаимодействует с другими, учится работать в команде.',
          'Для 10–12 лет: объединяет навыки кода и общения, участвует в командных задачах и учится доводить идеи до результата.',
          'Для 13–14 лет: работает над более цельными проектами, распределяет роли в команде и понимает, как создаются продукты.',
          'Смена даёт уверенность: ребёнок не просто учится, а начинает действовать.'
        ].join(' ')
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
        fullDesc:[
          'Смена, где ребёнок собирает всё, чему научился, в понятный результат.',
          'Для 7–9 лет: заканчивает проекты и начинает объяснять, как они работают.',
          'Для 10–12 лет: делает законченные программы и может показать, что именно он сделал и как.',
          'Для 13–14 лет: создаёт более сложные проекты, оформляет их и презентует как готовый продукт.',
          'Итог — ребёнок уезжает не с эмоциями, а с реальным результатом и пониманием своего прогресса.'
        ].join(' ')
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
            {
              q:'Будет ли телефон у ребёнка?',
              a:[
                'Лагерь «без телефонов». Телефон сдаётся на хранение: звонки родителям — раз в день или по запросу в любое время.',
                'В любое время можно связаться с вожатым, вожатые и старшие смены на связи 24/7.'
              ].join(' ')
            },
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
    const OFFER_STAGE_KEY = ['offer', 'Stage'].join('');
    const OFFER_LAYOUT_KEY = ['offer', 'Layout'].join('');
    const OFFER_LAYOUT_DATASET_KEY = ['offer', 'Layout'].join('');

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
    const OFFER_LAYOUT_MODES = Object.freeze(['current']);
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
      mobileJourneyStep: Number.isFinite(Number(state.mobileJourneyStep)) ? Number(state.mobileJourneyStep) : 0,
      mobileProgramShiftId: state.mobileProgramShiftId || '',
      mobilePhotoIndex: Number.isFinite(Number(state.mobilePhotoIndex)) ? Number(state.mobilePhotoIndex) : 0,
      mobileVideoIndex: Number.isFinite(Number(state.mobileVideoIndex)) ? Number(state.mobileVideoIndex) : 0,
      mobileReviewIndex: Number.isFinite(Number(state.mobileReviewIndex)) ? Number(state.mobileReviewIndex) : 0,
      mobileStayIndex: Number.isFinite(Number(state.mobileStayIndex)) ? Number(state.mobileStayIndex) : 0,
      mobileFaqGroup: state.mobileFaqGroup || 'Медицина',
      mobileFaqOpenKey: state.mobileFaqOpenKey || '',
      mobileTeamIndex: Number.isFinite(Number(state.mobileTeamIndex)) ? Number(state.mobileTeamIndex) : 0,
      // Mobile docs block must stay compact by default: requisites visible, legal links collapsed.
      mobileDocsExpanded: false,
      debugBookingBlocks: !!state.debugBookingBlocks
    });
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
    let heroV3SimpleFlowApi = null;
    let heroBackgroundFlowApi = null;
    let offerFlowApi = null;
    let actionDispatcherApi = null;
    let bookingInlineLeadApi = null;
    let mediaGestureBindingsApi = null;
    let globalUiBindingsApi = null;
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
        calendarWeekdaysShort: () => ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        calendarMonthNames: () => ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
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
        placeStage2ContentForView,
        syncCompletedBookingScaffold,
        stopVariantFlowScenario: () => safeInvoke(ensureVariantFlow(), 'stopVariantFlowScenario', [], null),
        bookingText,
        hideVariantCoachBadge,
        hasSelectedAge,
        ageLabel,
        getState: () => state,
        getSelectedShift,
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
        applyBookingStructureSchema,
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
        setHeroPhoneDropdownOpen
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
        getNoticeConfirmHandler: () => noticeConfirmHandler,
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
      const root = scope || document;
      const nodes = root.querySelectorAll(
        [
          '.version-badge-close',
          '.media-close',
          '.video-close',
          '.form-close',
          "[data-action='close-version-badge']",
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
    const HERO_AB_ASSETS = Object.freeze({
      A: Object.freeze({images:HERO_IMAGES, mobile:HERO_MOBILE}),
      B: Object.freeze({images:HERO_IMAGES_B, mobile:HERO_MOBILE_B})
    });
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
    const HERO_V3_SIMPLE_QUERY_KEY = 'hero_v3_simple';
    const HERO_V3_SIMPLE_ENABLED = hasQueryFlag(HERO_V3_SIMPLE_QUERY_KEY);
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
        const key = 'aidacamp_lead_fallback_meta';
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

    function applyBookingStructureSchema(viewCfg){
      const cfg = resolveBookingViewCfg(viewCfg);
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
        return (isZeroHeight && `${regionName} 0`) || regionName;
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
        node.dataset.bookingRegionZero = String(Number(isRegionZero(node)));
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
      const cfg = resolveBookingViewCfg(viewCfg);
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

    function applyHeroContrastMode(){
      return safeInvoke(ensureViewModeFlow(), 'applyHeroContrastMode', [], null);
    }

    function switchHeroContrastMode(mode){
      return safeInvoke(ensureViewModeFlow(), 'switchHeroContrastMode', [mode], null);
    }

    function applyHeroMicroMode(){
      return safeInvoke(ensureViewModeFlow(), 'applyHeroMicroMode', [], null);
    }

    function switchHeroMicroMode(mode){
      return safeInvoke(ensureViewModeFlow(), 'switchHeroMicroMode', [mode], null);
    }

    function applyOfferModalTheme(cardEl = null){
      return safeInvoke(ensureViewModeFlow(), 'applyOfferModalTheme', [cardEl], null);
    }

    function switchOfferModalTheme(mode){
      return safeInvoke(ensureViewModeFlow(), 'switchOfferModalTheme', [mode], null);
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

    function switchOfferLayout(mode){
      return safeInvoke(ensureViewModeFlow(), 'switchOfferLayout', [mode], null);
    }

    function applyDesktopMode(){
      return safeInvoke(ensureViewModeFlow(), 'applyDesktopMode', [], null);
    }

    function switchDesktopMode(mode){
      return safeInvoke(ensureViewModeFlow(), 'switchDesktopMode', [mode], null);
    }

    function applyMobileMode(){
      return safeInvoke(ensureViewModeFlow(), 'applyMobileMode', [], () => {
        if(USE_DESKTOP_BASE_FOR_MOBILE){
          return;
        }
        applyMobileSectionAccordion();
      });
    }

    function switchMobileMode(mode){
      return safeInvoke(ensureViewModeFlow(), 'switchMobileMode', [mode], null);
    }

    // SECTION 6: View mode controls (desktop/mobile, full/compact).
    document.getElementById('fullModeBtn')?.addEventListener('click', () => switchDesktopMode('full'));
    document.getElementById('compactModeBtn')?.addEventListener('click', () => {
      const nextMode = (state.desktopMode === 'compact' && 'full') || 'compact';
      switchDesktopMode(nextMode);
    });
    if(!USE_DESKTOP_BASE_FOR_MOBILE){
      document.getElementById('mobileFullModeBtn')?.addEventListener('click', () => switchMobileMode('full'));
      document.getElementById('mobileCompactModeBtn')?.addEventListener('click', () => switchMobileMode('compact'));
      document.getElementById('mobileModeToggle')?.addEventListener('click', () => {
        switchMobileMode((state.mobileMode === 'full' && 'compact') || 'full');
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
          const scope = state.previewView === 'mobile' ? 'booking-mobile' : 'booking-desktop';
          HERO_V3_SIMPLE_ENABLED && window.setTimeout(() => openInlineLead(scope), 0);
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
      const finalPart = normalizeShiftText((sentences.length && sentences[sentences.length - 1]) || '');

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
      const startText = (start && start.toLocaleDateString('ru-RU')) || shift.start;
      const endText = (end && end.toLocaleDateString('ru-RU')) || shift.end;
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
      const safeViewKey = resolveViewKey(viewKey);
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
        const startText = (start && start.toLocaleDateString('ru-RU')) || s.start;
        const endText = (end && end.toLocaleDateString('ru-RU')) || s.end;

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
      return ((src && `<img class="ac-icon" src="${src}" alt="" aria-hidden="true">`) || '•');
    }

    function resolveFloatingContactLinks(){
      const contacts = (Array.isArray(mediaContent.contacts) && mediaContent.contacts) || [];
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
        toggle.setAttribute('aria-expanded', String(!!isOpen));
        track('floating_contacts_toggle', {open:Number(!!isOpen)});
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
      return ((allowed.has(mark) && mark) || '•');
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
        applyOfferModalTheme,
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
        applyOfferModalTheme,
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
        Object.assign(state, {
          age: null,
          ageSelected: false
        });
        persist();
        renderAll();
      };
      actionsEl.classList.remove('hidden');
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
