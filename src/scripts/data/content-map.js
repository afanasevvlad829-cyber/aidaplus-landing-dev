(function () {
  "use strict";
  var ICON_MAP = (window.AC_DATA && window.AC_DATA.ICON_MAP) || {};

  var CONTENT_MAP = {
    menu: [
      { key: "info", label: "О лагере", icon: ICON_MAP.robot, href: "#program" },
      { key: "aiprogram", label: "AI программы", icon: ICON_MAP.sparkle, href: "#ai" },
      { key: "location", label: "Локация", icon: ICON_MAP.pool, href: "#location" },
      { key: "photo", label: "Фото", icon: ICON_MAP.search, href: "#photos" },
      { key: "video", label: "Видео", icon: ICON_MAP.play, href: "#video" },
      { key: "faq", label: "FAQ", icon: ICON_MAP.clipboard, href: "#faq" },
      { key: "reviews", label: "Отзывы", icon: ICON_MAP.fire, href: "#reviews" },
      { key: "team", label: "Команда", icon: ICON_MAP.check, href: "#team" }
    ],
    sectionTitles: {
      program: "Программа по возрастам",
      format: "Формат и условия",
      ai: "AI-программы",
      location: "Локация",
      photos: "Фото лагеря",
      video: "Видео",
      reviews: "Отзывы родителей",
      team: "Команда",
      faq: "FAQ"
    },
    footer: {
      brand: "© AiDaCamp",
      tagline: "Лагерь в Подмосковье для детей 7-14 лет"
    },
    ui: {
      prev: "Назад",
      next: "Вперёд",
      all: "Все",
      list: "Список",
      grid: "Плитка",
      close: "Закрыть",
      closeAria: "Закрыть",
      confirm: "Подтвердить",
      contactTitle: "Связаться с нами",
      shiftsTitle: "Смены и цены",
      shiftsMeta: "Выберите смену по возрасту и направлению.",
      techBadge: "TECH v2026.03.18-01",
      modeCompactLabel: "Кратко",
      modeFullLabel: "Подробно",
      brandSub: "IT-лагерь 7-14 лет",
      ageLabel: "Выберите возраст",
      heroContactLabel: "Связаться с нами",
      heroCampaignLabel: "AI-программы июнь",
      heroOverlayTitle: "ПРОГРАММА И БЕЗОПАСНОСТЬ",
      heroSafetyMedTitle: "Медик 24/7",
      heroSafetyMedDesc: "Врач на территории всю смену",
      heroSafetyLockTitle: "Охрана",
      heroSafetyLockDesc: "Закрытая территория, КПП",
      heroSafetyFoodTitle: "5-разовое питание",
      heroSafetyFoodDesc: "Горячее каждый день",
      heroSafetyPoolTitle: "Бассейн",
      heroSafetyPoolDesc: "Каждый день, тренер рядом",
      stepLabel: "Шаг",
      stepLabelDelimiter: "из",
      finalBookingCta: "Смотреть даты и цены смен",
      locationWhereTitle: "Где проходит смена",
      locationNearbyTitle: "Что рядом и внутри",
      watchVideoLabel: "Смотреть видео",
      contactMeta: "Оставьте заявку, и мы подберем смену по возрасту и интересам ребенка.",
      phoneLabel: "Телефон",
      telegramLabel: "Telegram",
      emailLabel: "Email",
      shiftPriceFrom: "от 74 900 ₽"
    },
    programCards: [
      {
        title: "7-9 лет",
        text: "Scratch + базовый Python. Визуальное программирование, первые игры, логика."
      },
      {
        title: "10-12 лет",
        text: "Python + веб. Проекты на Python, основы HTML/CSS, мини-сайт."
      },
      {
        title: "13-14 лет",
        text: "AI-интенсив. Нейросети, боты, хакатон с защитой проекта."
      }
    ],
    formatCards: [
      {
        title: "Что внутри смены",
        list: [
          "IT-проекты по уровню ребёнка",
          "Бассейн каждый день",
          "Внутренняя экономика и лагерная валюта",
          "Командные активности и спорт"
        ]
      },
      {
        title: "Безопасность и условия",
        list: [
          "Медик 24/7 на территории",
          "Закрытая территория и охрана",
          "Организованный режим и звонки родителям",
          "Безопасность, условия проживания и организованный режим"
        ]
      },
      {
        title: "Бронирование и цены",
        text: "Все актуальные смены, места и финальные цены остаются в интерактивном блоке выше. Кнопка в меню ведёт прямо к нему, а форма заявки остаётся рабочей."
      }
    ],
    aiStats: [
      { value: "+43%", label: "Больше зарплата", text: "у разработчиков с AI-навыками — это +18 000 $ в год к зарплате обычного программиста." },
      { value: "<1%", label: "разработчиков владеют AI-стеком", text: "" },
      { value: "97M", label: "новых рабочих мест создаст ИИ к 2025 г. (WEF)", text: "" },
      { value: "85M", label: "рутинных должностей автоматизируют — но не творческих", text: "" },
      { value: "↑2×", label: "быстрее растут вакансии AI/ML vs обычный IT", text: "" }
    ],
    aiCopy: [
      "ИИ не заменит людей — он заменит тех, кто не умеет с ним работать.",
      "Настоящая угроза не в роботах, а в том, что ваш ребёнок вырастет потребителем ИИ, а не его создателем. Разница в доходах между этими двумя группами — уже сейчас в 3–5 раз.",
      "На нашем лагере дети за 13 дней строят реальные AI-проекты: нейросети, ботов, компьютерное зрение. Не «играют в программирование» — а создают то, что работает."
    ],
    location: {
      where: [
        "📍 60 км от Москвы · Киевское шоссе",
        "Санаторий «Изумруд», Наро-Фоминский район"
      ],
      nearby: [
        "🚗 60 км по Киевскому шоссе",
        "🚌 Трансфер от м. Юго-Западная",
        "🌳 Закрытая территория 14 га",
        "🏊 Бассейн, спорт, лес"
      ],
      mapUrl: "https://yandex.ru/map-widget/v1/?ll=36.7318%2C55.3506&z=13&pt=36.7318,55.3506,pm2rdm"
    },
    photoCategories: [
      { id: "all", label: "Все" },
      { id: "food", label: "Еда" },
      { id: "sport", label: "Спорт" },
      { id: "pool", label: "Бассейн" },
      { id: "study", label: "Учёба" }
    ],
    photos: [
      { cat: "all", src: "https://static.tildacdn.com/tild3632-6563-4432-b438-346535383038/photo_2025-06-14_08-.jpg", alt: "all" },
      { cat: "all", src: "https://static.tildacdn.com/tild6436-6337-4466-b637-623363613935/photo.jpg", alt: "all" },
      { cat: "all", src: "https://static.tildacdn.com/tild6666-3333-4534-a639-386666343634/photo_2025-06-14_08-.jpg", alt: "all" },
      { cat: "all", src: "https://static.tildacdn.com/tild6336-6536-4238-a436-303937666565/photo_2025-06-17_13-.jpg", alt: "all" },
      { cat: "study", src: "https://static.tildacdn.com/tild3263-3537-4961-b536-363837386238/IMG_1543.JPG", alt: "study" },
      { cat: "food", src: "https://static.tildacdn.com/tild6330-6330-4664-b762-666363643137/photo_2025-06-14_08-.jpg", alt: "food" },
      { cat: "food", src: "https://static.tildacdn.com/tild3864-3738-4763-b633-303434303665/photo_2025-06-14_08-.jpg", alt: "food" },
      { cat: "food", src: "https://static.tildacdn.com/tild3134-3366-4638-b331-366662396639/photo.jpg", alt: "food" },
      { cat: "study", src: "https://static.tildacdn.com/tild3066-3464-4137-a537-626336356335/photo_2025-06-14_08-.jpg", alt: "study" },
      { cat: "study", src: "https://static.tildacdn.com/tild3637-6139-4636-b261-386434323832/photo_2025-06-14_08-.jpg", alt: "study" },
      { cat: "study", src: "https://static.tildacdn.com/tild6266-6134-4235-b166-393766376531/photo_2025-06-14_08-.jpg", alt: "study" },
      { cat: "study", src: "https://static.tildacdn.com/tild3238-6633-4862-a535-373731303734/photo_2025-06-14_08-.jpg", alt: "study" },
      { cat: "pool", src: "https://static.tildacdn.com/tild6135-3464-4332-b565-386630323830/photo_2025-06-14_08-.jpg", alt: "pool" },
      { cat: "pool", src: "https://static.tildacdn.com/tild3932-3632-4530-b038-613561623337/photo_2025-06-14_08-.jpg", alt: "pool" },
      { cat: "sport", src: "https://static.tildacdn.com/tild3639-3532-4334-b035-316562666439/photo.jpg", alt: "sport" },
      { cat: "sport", src: "https://static.tildacdn.com/tild3963-3938-4335-b335-656531616265/photo_2025-06-14_07-.jpg", alt: "sport" },
      { cat: "sport", src: "https://static.tildacdn.com/tild6538-6438-4432-b737-313138346237/photo_2025-06-14_08-.jpg", alt: "sport" }
    ],
    videos: [
      {
        title: "За неделю в лагере ребёнок меняется больше, чем за год дома",
        poster: "https://static.tildacdn.com/tild3130-3234-4630-b533-343030653636/photo_2024-02-04_171.jpeg"
      },
      {
        title: "Зачем детям копить деньги в лагере?",
        poster: "https://static.tildacdn.com/tild3031-3662-4930-b463-353632336564/img_DZVzy7hiSoR0c1MR.png"
      },
      {
        title: "Ребёнок сам откажется от телефона за 3 дня?",
        poster: "https://static.tildacdn.com/tild3865-3066-4131-b036-323163393864/photo_2024-02-04_161.jpeg"
      }
    ],
    reviews: [
      {
        name: "Сергей Найденов",
        meta: "папа участника, 13 лет",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
        quote: "Сын вернулся из лагеря более собранным и уверенным. Очень зашло, что учеба была через проекты, а не через сухую теорию. Для нас это был лучший формат каникул."
      },
      {
        name: "Natalia Savenkova",
        meta: "мама участницы, 11 лет",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80",
        quote: "Это был первый выездной лагерь для дочери, и всё прошло спокойно. Вожатые всегда на связи, программа насыщенная, ребёнок просится обратно уже на следующую смену."
      },
      {
        name: "Виктория",
        meta: "мама участника, 12 лет",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
        quote: "Сильное место и по атмосфере, и по содержанию. Ребёнок не просто отдохнул, а действительно прокачался в IT и стал намного самостоятельнее в бытовых вопросах."
      },
      {
        name: "Отзыв родителя",
        meta: "из Яндекс Карт",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
        quote: "Для нас было важно, чтобы лагерь дал результат, а не просто занял время. Итог: готовые мини-проекты, новые друзья и заметно выросшая мотивация к учебе."
      },
      {
        name: "Екатерина Л.",
        meta: "мама участника, 10 лет",
        avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=300&q=80",
        quote: "Спасибо команде лагеря за внимание к детям и понятную обратную связь для родителей."
      }
    ],
    team: [
      {
        name: "Дарья Афанасьева",
        role: "основатель и вдохновитель АйДаКемп",
        avatar: "https://static.tildacdn.com/tild3633-3838-4462-a338-336166376565/photo.png",
        bio: "предприниматель в сфере детского IT-образования и мама подростка, которая строит лагерь таким, каким сама хотела бы видеть обучение своего ребёнка."
      },
      {
        name: "Никита Брагин",
        role: "преподаватель Scratch, Minecraft и Python",
        avatar: "https://static.tildacdn.com/tild3830-6337-4038-b634-333236613738/photo.png",
        bio: "автор учебника по разработке игр; специализируется на геймдеве и помогает детям создавать собственные игровые миры."
      },
      {
        name: "Александр Ташкин",
        role: "преподаватель Scratch, Minecraft и Python",
        avatar: "https://static.tildacdn.com/tild3639-3337-4636-a233-306337633035/photo.png",
        bio: "соавтор учебника по разработке игр; умеет зажигать интерес к программированию через практические задачи и командные проекты."
      },
      {
        name: "Омар Алхамви",
        role: "преподаватель Python и нейросетей",
        avatar: "https://static.tildacdn.com/tild3737-3334-4538-a139-656430373836/photo.png",
        bio: "работает со старшими и продвинутыми группами, часть занятий ведёт на английском и показывает, как применять AI в реальных проектах."
      },
      {
        name: "Дарья Воронцова",
        role: "преподаватель Python и Scratch",
        avatar: "https://static.tildacdn.com/tild3931-6630-4534-b239-373333393430/ChatGPT_Image_18__20.png",
        bio: "помогает детям легко войти в программирование через игры, логику и первые самостоятельные программы."
      }
    ],
    faqTabs: [
      { id: "medicine", label: "Медицина" },
      { id: "security", label: "Безопасность" },
      { id: "food", label: "Питание" },
      { id: "living", label: "Проживание" },
      { id: "organization", label: "Организация" },
      { id: "other", label: "Другое" }
    ],
    faqItems: {
      medicine: [
        "Есть ли медик в лагере?",
        "Что если ребёнок заболеет?",
        "Можно давать лекарства?",
        "Учитываются аллергии?"
      ],
      security: [
        "Территория закрыта?",
        "Кто контролирует доступ на территорию?",
        "Как организованы прогулки и перемещения?",
        "Есть ли связь с родителями?"
      ],
      food: [
        "Сколько приёмов пищи в день?",
        "Есть ли диетическое меню?",
        "Как учитываются ограничения по питанию?",
        "Можно ли передать ребёнку еду?"
      ],
      living: [
        "Сколько детей в комнате?",
        "Как устроены душ и бытовые условия?",
        "Можно ли привезти свои вещи?",
        "Есть ли прачечная?"
      ],
      organization: [
        "Как проходит день в лагере?",
        "Как формируются группы?",
        "Можно ли выбрать смену заранее?",
        "Как проходит обратная связь для родителей?"
      ],
      other: [
        "Можно ли приехать на экскурсию до смены?",
        "Какие документы нужны при заезде?",
        "Есть ли трансфер?",
        "Как вернуть оплату при отмене?"
      ]
    }
  };

  var TABS = CONTENT_MAP.menu;

  var AGE_PROFILES = [
    {
      id: "7-9",
      min: 7,
      max: 9,
      title: "AiDaCamp: IT-лагерь без телефонов в Подмосковье",
      subtitle: "Для детей 7-14 лет: свои IT-проекты, бассейн и спорт каждый день, внутренняя экономика с лагерной валютой.",
      progress: "63 % - мест занято",
      ageText: "Возраст: 7-9 лет -> Scratch + базовый Python",
      benefits: [
        { icon: ICON_MAP.robot, text: "IT-проекты по уровню" },
        { icon: ICON_MAP.money, text: "Внутренняя экономика и лагерная валюта" },
        { icon: ICON_MAP.pool, text: "Собственный бассейн каждый день" }
      ]
    },
    {
      id: "10-12",
      min: 10,
      max: 12,
      title: "AiDaCamp: IT-лагерь без телефонов в Подмосковье",
      subtitle: "Для детей 10-12 лет: Python, веб-проекты, командные задачи и баланс учебы, спорта и отдыха.",
      progress: "58 % - мест занято",
      ageText: "Возраст: 10-12 лет -> Python + веб",
      benefits: [
        { icon: ICON_MAP.robot, text: "Практика Python и веб-разработки" },
        { icon: ICON_MAP.money, text: "Экономические игровые механики" },
        { icon: ICON_MAP.pool, text: "Бассейн и спорт ежедневно" }
      ]
    },
    {
      id: "13-14",
      min: 13,
      max: 14,
      title: "AiDaCamp: IT-лагерь без телефонов в Подмосковье",
      subtitle: "Для детей 13-14 лет: AI-интенсив, хакатоны, презентация проектов и продуктовый подход.",
      progress: "49 % - мест занято",
      ageText: "Возраст: 13-14 лет -> AI + проектная работа",
      benefits: [
        { icon: ICON_MAP.robot, text: "AI-инструменты и прикладные кейсы" },
        { icon: ICON_MAP.money, text: "Управление бюджетом командных проектов" },
        { icon: ICON_MAP.pool, text: "Фокус на режиме, здоровье и спорте" }
      ]
    }
  ];

  var SHIFTS = [
    {
      id: "shift-1",
      direction: "base",
      line: "7-9 лет",
      summary: "Визуальное программирование, первые игры, логика.",
      nextCta: "Уточнить формат",
      benefits: [
        { icon: ICON_MAP.robot, text: "Визуальные IT-проекты по уровню ребёнка" },
        { icon: ICON_MAP.money, text: "Первые шаги во внутренней экономике" },
        { icon: ICON_MAP.pool, text: "Бассейн и активность каждый день" }
      ]
    },
    {
      id: "shift-2",
      direction: "web",
      line: "10-12 лет",
      summary: "Python, веб-проекты и командные мини-спринты.",
      nextCta: "Проверить безопасность",
      benefits: [
        { icon: ICON_MAP.robot, text: "Python + веб-проекты в мини-командах" },
        { icon: ICON_MAP.money, text: "Игровая экономика: роли, бюджет, решения" },
        { icon: ICON_MAP.pool, text: "Ежедневный спорт и бассейн по расписанию" }
      ]
    },
    {
      id: "shift-3",
      direction: "ai",
      line: "13-14 лет",
      summary: "AI-практика, анализ данных, проектная защита.",
      nextCta: "Выбрать смену",
      benefits: [
        { icon: ICON_MAP.robot, text: "AI-кейсы, аналитика и защита проекта" },
        { icon: ICON_MAP.money, text: "Управление ресурсами в проектной команде" },
        { icon: ICON_MAP.pool, text: "Баланс: интеллектуальная и физическая нагрузка" }
      ]
    },
    {
      id: "shift-4",
      direction: "pro",
      line: "Смена и цены",
      summary: "Финальный выбор смены, условий и бронирования.",
      nextCta: "Смотреть даты и цены смен",
      benefits: [
        { icon: ICON_MAP.robot, text: "Финальная программа по выбранному направлению" },
        { icon: ICON_MAP.money, text: "Прозрачные даты, цены и условия бронирования" },
        { icon: ICON_MAP.pool, text: "Подтверждение смены и организационных деталей" }
      ]
    }
  ];

  var DIRECTIONS = [
    { id: "base", label: "База" },
    { id: "web", label: "Web" },
    { id: "ai", label: "AI" },
    { id: "pro", label: "Pro" }
  ];

  var TAB_TO_SECTION = {
    info: "program",
    aiprogram: "ai",
    location: "location",
    photo: "photos",
    video: "video",
    faq: "faq",
    reviews: "reviews",
    team: "team"
  };

  var AGE_SLIDER_POINTS = [9, 11, 13];

  window.AC_DATA = window.AC_DATA || {};
  window.AC_DATA.ICON_MAP = ICON_MAP;
  window.AC_DATA.CONTENT_MAP = CONTENT_MAP;
  window.AC_DATA.TABS = TABS;
  window.AC_DATA.AGE_PROFILES = AGE_PROFILES;
  window.AC_DATA.SHIFTS = SHIFTS;
  window.AC_DATA.DIRECTIONS = DIRECTIONS;
  window.AC_DATA.TAB_TO_SECTION = TAB_TO_SECTION;
  window.AC_DATA.AGE_SLIDER_POINTS = AGE_SLIDER_POINTS;
})();
