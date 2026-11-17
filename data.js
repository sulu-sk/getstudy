/* =====================================================================
   Get Study - данные сайта.
   Здесь меняются: ссылки и телефоны (CONFIG), курсы (COURSES),
   расписание (SCHEDULE), отзывы (REVIEWS), фото (GALLERY) и все тексты
   интерфейса на русском и узбекском (I18N).
   ===================================================================== */
window.GS = window.GS || {};

/* ---------- Настройки ---------- */
GS.CONFIG = {
  /* Куда отправлять заявки. Пусто = демо-режим: заявка не уходит на сервер,
     а выводится в консоль браузера. Укажите URL обработчика (принимает POST JSON),
     например https://getstudy.uz/api/lead.php */
  leadEndpoint: '',
  vacancyEndpoint: '',

  phones: [
    { raw: '+998909993500', label: '+998 90 999-35-00' },
    { raw: '+998931716969', label: '+998 93 171-69-69' }
  ],
  telegram: 'https://t.me/getstudy',
  instagram: 'https://www.instagram.com/getstudy_uz/',
  logo: 'https://getstudy.uz/wp-content/uploads/2019/02/light_logo_getstudy.png',

  /* Координаты центра (Яндекс Карты): пр. Бунёдкор (дублёр), 11 */
  coords: { lat: 41.289975, lon: 69.222182 },
  yandexRoute: 'https://yandex.uz/maps/?rtext=~41.289975%2C69.222182&rtt=auto',
  twoGisRoute: 'https://2gis.uz/tashkent/directions/points/%7C69.222182%2C41.289975',
  yandexReviews: 'https://yandex.uz/maps/org/get_study/226143722234/reviews/',
  googleReviews: 'https://g.page/getstudy-uz?gm',

  youtube: 'https://www.youtube.com/watch?v=TGqH9HshGLc',
  youtubeThumb: 'https://i.ytimg.com/vi/TGqH9HshGLc/hqdefault.jpg',
  routeVideo: 'https://getstudy.uz/wp-content/uploads/2024/09/video_2024-09-18_18-12-56.mp4',
  calendarEmbed: 'https://embed.styledcalendar.com/#oDGBEC1b0lxHI1nyFKTz',
  privacyPdf: 'https://getstudy.uz/wp-content/uploads/2024/09/politika-obrabotki-personalnyh-dannyh.pdf',
  terms: 'https://getstudy.uz/polzovatelskoe-soglashenie/',

  /* Режим работы (время Ташкента, UTC+5): Пн–Сб 09:00–18:00, обед 13:00–14:00 */
  utcOffset: 5,
  hours: { open: 9 * 60, close: 18 * 60, lunchFrom: 13 * 60, lunchTo: 14 * 60, days: [1, 2, 3, 4, 5, 6] }
};

/* ---------- Фото аудиторий (с сайта getstudy.uz) ---------- */
GS.GALLERY = [
  'https://getstudy.uz/wp-content/uploads/2019/08/photo-6-1024x768.jpg',
  'https://getstudy.uz/wp-content/uploads/2019/08/photo-11-1024x768.jpg',
  'https://getstudy.uz/wp-content/uploads/2019/08/photo-9-1024x768.jpg',
  'https://getstudy.uz/wp-content/uploads/2019/08/photo-7-1024x768.jpg',
  'https://getstudy.uz/wp-content/uploads/2019/08/photo-12-1024x768.jpg',
  'https://getstudy.uz/wp-content/uploads/2019/08/photo-3-1024x768.jpg',
  'https://getstudy.uz/wp-content/uploads/2019/08/photo-8-1024x768.jpg',
  'https://getstudy.uz/wp-content/uploads/2019/08/photo-10-1024x768.jpg',
  'https://getstudy.uz/wp-content/uploads/2020/12/photo_2020-12-22_10-18-18-min-1-1.png'
];

/* ---------- Курсы ----------
   cat: lang | pc | acc | corp. Поле id используется в форме заявки. */
GS.COURSES = [
  {
    id: 'english', cat: 'lang', code: 'EN', tone: 'blue',
    title: { ru: 'Английский язык', uz: 'Ingliz tili' },
    desc: { ru: 'С нуля до IELTS: все уровни от A1 до C2', uz: 'Noldan IELTS gacha: A1 dan C2 gacha barcha darajalar' },
    meta: { ru: ['3 раза в неделю', '90 минут', 'Мини-группы'], uz: ['Haftasiga 3 marta', '90 daqiqa', 'Kichik guruhlar'] },
    price: { month: 600000 },
    priceNote: { ru: 'Семейная скидка 10%', uz: 'Oilaviy chegirma 10%' },
    details: {
      subtitle: { ru: 'Английский с «нуля» до IELTS, все уровни', uz: 'Ingliz tili «noldan» IELTS gacha, barcha darajalar' },
      facts: [
        { k: 'duration', v: { ru: 'От 3 месяцев до 2 лет - зависит от стартового уровня и цели', uz: 'Boshlangʻich daraja va maqsadga qarab 3 oydan 2 yilgacha' } },
        { k: 'lessons', v: { ru: '3 раза в неделю по 90 минут', uz: 'Haftasiga 3 marta, 90 daqiqadan' } },
        { k: 'format', v: { ru: 'Мини-группы, разные возрастные группы', uz: 'Kichik guruhlar, turli yosh guruhlari' } },
        { k: 'price', v: { ru: '600 000 сум/мес, семейная скидка 10%', uz: '600 000 soʻm/oy, 10% oilaviy chegirma' } }
      ],
      levels: [
        { name: 'A1 Beginner', time: { ru: '3–4 мес.', uz: '3–4 oy' } },
        { name: 'A2 Elementary', time: { ru: '4–6 мес.', uz: '4–6 oy' } },
        { name: 'B1 Intermediate', time: { ru: '6–9 мес.', uz: '6–9 oy' } },
        { name: 'B2 Upper-Intermediate', time: { ru: '9–12 мес.', uz: '9–12 oy' } },
        { name: 'C1 Advanced', time: { ru: '12–18 мес.', uz: '12–18 oy' } },
        { name: 'C2 Proficiency', time: { ru: '18–24 мес.', uz: '18–24 oy' } }
      ],
      teachers: [
        { name: 'Mr. Tigran', role: { ru: 'Многолетний опыт преподавания, делает упор на разговорную речь', uz: 'Koʻp yillik tajriba, ogʻzaki nutqqa alohida eʼtibor beradi' }, photo: 'https://getstudy.uz/wp-content/uploads/2024/09/photo_2024-09-29_00-50-17.jpg' },
        { name: 'Ms. Katerina', role: { ru: 'Готовит к экзаменам IELTS и TOEFL', uz: 'IELTS va TOEFL imtihonlariga tayyorlaydi' }, photo: 'https://getstudy.uz/wp-content/uploads/2024/09/photo_2024-09-30_17-48-02.jpg' },
        { name: 'Ms. Malika', role: { ru: 'Готовит к экзаменам IELTS и TOEFL', uz: 'IELTS va TOEFL imtihonlariga tayyorlaydi' }, photo: 'https://getstudy.uz/wp-content/uploads/2024/09/photo_2024-09-30_17-49-01.jpg' }
      ],
      includes: {
        ru: ['Первое занятие бесплатно', 'Преподаватель на выбор', 'Мини-группы и 80% практики', 'Ментор на занятиях и в закрытой Telegram-группе', 'Сертификат по окончании', 'Любая форма оплаты'],
        uz: ['Birinchi dars bepul', 'Oʻqituvchini tanlash imkoni', 'Kichik guruhlar va 80% amaliyot', 'Mentor darsda va yopiq Telegram-guruhda', 'Kurs yakunida sertifikat', 'Istalgan toʻlov usuli']
      }
    }
  },
  {
    id: 'ielts', cat: 'lang', code: 'IELTS', tone: 'navy', small: true,
    title: { ru: 'IELTS & TOEFL', uz: 'IELTS & TOEFL' },
    desc: { ru: 'Подготовка к международным экзаменам: группы Pre-IELTS и IELTS', uz: 'Xalqaro imtihonlarga tayyorgarlik: Pre-IELTS va IELTS guruhlari' },
    meta: { ru: ['2–9 месяцев', 'Мини-группы', 'Сертификат'], uz: ['2–9 oy', 'Kichik guruhlar', 'Sertifikat'] },
    price: null,
    details: {
      subtitle: { ru: 'Подготовка к IELTS и TOEFL', uz: 'IELTS va TOEFL ga tayyorgarlik' },
      facts: [
        { k: 'duration', v: { ru: 'С уровня B1 - 6–9 мес., с B2 - 3–6 мес., с C1 - 2–4 мес.', uz: 'B1 dan - 6–9 oy, B2 dan - 3–6 oy, C1 dan - 2–4 oy' } },
        { k: 'format', v: { ru: 'Мини-группы Pre-IELTS и IELTS', uz: 'Pre-IELTS va IELTS kichik guruhlari' } }
      ],
      teachers: [
        { name: 'Ms. Katerina', role: { ru: 'Готовит к экзаменам IELTS и TOEFL', uz: 'IELTS va TOEFL imtihonlariga tayyorlaydi' }, photo: 'https://getstudy.uz/wp-content/uploads/2024/09/photo_2024-09-30_17-48-02.jpg' },
        { name: 'Ms. Malika', role: { ru: 'Готовит к экзаменам IELTS и TOEFL', uz: 'IELTS va TOEFL imtihonlariga tayyorlaydi' }, photo: 'https://getstudy.uz/wp-content/uploads/2024/09/photo_2024-09-30_17-49-01.jpg' }
      ],
      includes: {
        ru: ['Первое занятие бесплатно', 'Подбор группы по уровню', 'Мини-группы', 'Сертификат по окончании'],
        uz: ['Birinchi dars bepul', 'Darajaga mos guruh', 'Kichik guruhlar', 'Kurs yakunida sertifikat']
      }
    }
  },
  {
    id: 'uzbek', cat: 'lang', code: 'UZ', tone: 'teal',
    title: { ru: 'Узбекский язык', uz: 'Oʻzbek tili' },
    desc: { ru: 'Полный курс «от А до Я»', uz: '«A dan Z gacha» toʻliq kurs' },
    meta: { ru: ['Мини-группы', 'Полный курс'], uz: ['Kichik guruhlar', 'Toʻliq kurs'] },
    price: null,
    details: {
      text: { ru: 'Полный курс узбекского языка «от А до Я». Подберём группу по вашему уровню.', uz: 'Oʻzbek tilining «A dan Z gacha» toʻliq kursi. Darajangizga mos guruh tanlaymiz.' },
      teachers: [{ name: 'Ms. Guli', role: { ru: 'Преподаватель узбекского языка', uz: 'Oʻzbek tili oʻqituvchisi' } }]
    }
  },
  {
    id: 'russian', cat: 'lang', code: 'RU', tone: 'red',
    title: { ru: 'Русский язык', uz: 'Rus tili' },
    desc: { ru: 'Полный курс «от А до Я» и группа «Русский для иностранцев»', uz: '«A dan Z gacha» toʻliq kurs va «Chet elliklar uchun rus tili» guruhi' },
    meta: { ru: ['Мини-группы', 'Полный курс'], uz: ['Kichik guruhlar', 'Toʻliq kurs'] },
    price: null,
    details: {
      text: { ru: 'Полный курс русского языка «от А до Я», в том числе группа «Русский для иностранцев» для тех, кто начинает с нуля.', uz: 'Rus tilining «A dan Z gacha» toʻliq kursi, jumladan noldan boshlovchilar uchun «Chet elliklar uchun rus tili» guruhi.' },
      teachers: [{ name: 'Saodat Ismailovna', role: { ru: 'Ведёт курс «Русский для иностранцев»', uz: '«Chet elliklar uchun rus tili» kursini olib boradi' } }]
    }
  },
  {
    id: 'german', cat: 'lang', code: 'DE', tone: 'amber',
    title: { ru: 'Немецкий язык', uz: 'Nemis tili' },
    desc: { ru: 'Базовый курс, все уровни', uz: 'Asosiy kurs, barcha darajalar' },
    meta: { ru: ['Мини-группы', 'Все уровни'], uz: ['Kichik guruhlar', 'Barcha darajalar'] },
    price: null,
    details: {
      text: { ru: 'Базовый курс немецкого языка, группы для разных уровней.', uz: 'Nemis tilining asosiy kursi, turli darajalar uchun guruhlar.' },
      teachers: [{ name: 'Mr. Bilol', role: { ru: 'Преподаватель немецкого языка', uz: 'Nemis tili oʻqituvchisi' } }]
    }
  },
  {
    id: 'french', cat: 'lang', code: 'FR', tone: 'sky',
    title: { ru: 'Французский язык', uz: 'Fransuz tili' },
    desc: { ru: 'Базовый курс для начинающих', uz: 'Boshlovchilar uchun asosiy kurs' },
    meta: { ru: ['Мини-группы', 'С нуля'], uz: ['Kichik guruhlar', 'Noldan'] },
    price: null,
    details: { text: { ru: 'Базовый курс французского языка для начинающих.', uz: 'Boshlovchilar uchun fransuz tilining asosiy kursi.' } }
  },
  {
    id: 'chinese', cat: 'lang', code: 'ZH', tone: 'rose',
    title: { ru: 'Китайский язык', uz: 'Xitoy tili' },
    desc: { ru: 'Базовый курс для начинающих', uz: 'Boshlovchilar uchun asosiy kurs' },
    meta: { ru: ['Мини-группы', 'С нуля'], uz: ['Kichik guruhlar', 'Noldan'] },
    price: null,
    details: { text: { ru: 'Базовый курс китайского языка для начинающих.', uz: 'Boshlovchilar uchun xitoy tilining asosiy kursi.' } }
  },
  {
    id: 'korean', cat: 'lang', code: 'KO', tone: 'slate',
    title: { ru: 'Корейский язык', uz: 'Koreys tili' },
    desc: { ru: 'Базовый курс для начинающих', uz: 'Boshlovchilar uchun asosiy kurs' },
    meta: { ru: ['Мини-группы', 'С нуля'], uz: ['Kichik guruhlar', 'Noldan'] },
    price: null,
    details: { text: { ru: 'Базовый курс корейского языка для начинающих.', uz: 'Boshlovchilar uchun koreys tilining asosiy kursi.' } }
  },
  {
    id: 'computer', cat: 'pc', icon: 'table', tone: 'green',
    title: { ru: 'Компьютерные курсы и Excel', uz: 'Kompyuter kurslari va Excel' },
    desc: { ru: 'Windows, Word, PowerPoint и уверенный Excel: от формул до сводных таблиц', uz: 'Windows, Word, PowerPoint va ishonchli Excel: formulalardan yigʻma jadvallargacha' },
    meta: { ru: ['2 месяца', '2 раза в неделю', 'Выдаётся ноутбук'], uz: ['2 oy', 'Haftasiga 2 marta', 'Noutbuk beriladi'] },
    price: { month: 900000, total: 1800000 },
    details: {
      subtitle: { ru: 'Microsoft Office с акцентом на Excel', uz: 'Excel ga urgʻu berilgan Microsoft Office kursi' },
      facts: [
        { k: 'duration', v: { ru: '2 месяца', uz: '2 oy' } },
        { k: 'lessons', v: { ru: '16 занятий по 90 минут, 2 раза в неделю', uz: '90 daqiqadan 16 ta dars, haftasiga 2 marta' } },
        { k: 'format', v: { ru: 'Мини-группы, 80% практики', uz: 'Kichik guruhlar, 80% amaliyot' } },
        { k: 'price', v: { ru: '900 000 сум/мес · 1 800 000 сум за курс', uz: '900 000 soʻm/oy · kurs uchun 1 800 000 soʻm' } }
      ],
      forWhom: {
        ru: ['Начинающим, кто хочет уверенно работать за компьютером', 'Бухгалтерам, менеджерам, секретарям и всем, кто работает с документами и таблицами'],
        uz: ['Kompyuterda ishonchli ishlashni istagan boshlovchilarga', 'Buxgalter, menejer, kotiba va hujjat hamda jadvallar bilan ishlaydigan barchaga']
      },
      program: [
        { title: { ru: 'Неделя 1. Основы ПК и Windows', uz: '1-hafta. Kompyuter va Windows asoslari' }, lessons: { ru: ['Знакомство с компьютером, Windows, файлы и папки', 'Основы Word: создание и редактирование документов'], uz: ['Kompyuter bilan tanishuv, Windows, fayl va papkalar', 'Word asoslari: hujjat yaratish va tahrirlash'] } },
        { title: { ru: 'Неделя 2. Word', uz: '2-hafta. Word' }, lessons: { ru: ['Форматирование текста, таблицы, изображения и объекты, настройка печати', 'Практика: создание и оформление документов'], uz: ['Matnni formatlash, jadval, rasm va obyektlar, chop etishni sozlash', 'Amaliyot: hujjat yaratish va bezash'] } },
        { title: { ru: 'Неделя 3. Excel: старт', uz: '3-hafta. Excel: boshlanish' }, lessons: { ru: ['Таблицы, ввод данных, базовые формулы и функции', 'Вычисления, автозаполнение, функции СУММ и СРЗНАЧ'], uz: ['Jadvallar, maʼlumot kiritish, asosiy formula va funksiyalar', 'Hisob-kitoblar, avtotoʻldirish, SUM va AVERAGE funksiyalari'] } },
        { title: { ru: 'Неделя 4. Excel: инструменты анализа', uz: '4-hafta. Excel: tahlil vositalari' }, lessons: { ru: ['Сортировка, фильтры, условное форматирование', 'ВПР, СУММЕСЛИ, сводные таблицы, анализ данных'], uz: ['Saralash, filtrlar, shartli formatlash', 'VLOOKUP, SUMIF, yigʻma jadvallar, maʼlumotlar tahlili'] } },
        { title: { ru: 'Неделя 5. Excel: продвинутый уровень', uz: '5-hafta. Excel: yuqori daraja' }, lessons: { ru: ['Диаграммы и графики', 'Большие объёмы данных, импорт из разных источников, отчёты и дашборды'], uz: ['Diagramma va grafiklar', 'Katta hajmdagi maʼlumotlar, turli manbalardan import, hisobot va dashbordlar'] } },
        { title: { ru: 'Неделя 6. Excel: закрепление', uz: '6-hafta. Excel: mustahkamlash' }, lessons: { ru: ['Практика со сложными таблицами, расчётами и диаграммами', 'Типичные ошибки, оптимизация, отчёты к печати'], uz: ['Murakkab jadvallar, hisob-kitoblar va diagrammalar bilan amaliyot', 'Odatiy xatolar, optimallashtirish, chop etishga tayyor hisobotlar'] } },
        { title: { ru: 'Неделя 7. PowerPoint', uz: '7-hafta. PowerPoint' }, lessons: { ru: ['Создание и дизайн слайдов: текст, изображения, схемы', 'Диаграммы, анимация и переходы'], uz: ['Slayd yaratish va dizayni: matn, rasm, sxemalar', 'Diagrammalar, animatsiya va oʻtishlar'] } },
        { title: { ru: 'Неделя 8. Итоговый проект', uz: '8-hafta. Yakuniy loyiha' }, lessons: { ru: ['Комплексное задание в Excel, Word и PowerPoint', 'Презентация проекта, разбор и ответы на вопросы'], uz: ['Excel, Word va PowerPoint boʻyicha kompleks topshiriq', 'Loyiha taqdimoti, tahlil va savol-javob'] } }
      ],
      includes: {
        ru: ['Первое занятие бесплатно', 'Выдаётся ноутбук', 'Ментор-практик: на занятиях и в закрытой Telegram-группе', 'Сертификат по окончании', 'Любая форма оплаты'],
        uz: ['Birinchi dars bepul', 'Noutbuk beriladi', 'Amaliyotchi mentor: darsda va yopiq Telegram-guruhda', 'Kurs yakunida sertifikat', 'Istalgan toʻlov usuli']
      }
    }
  },
  {
    id: 'accounting', cat: 'acc', icon: 'calculator', tone: 'accent',
    title: { ru: 'Бухгалтерия и 1С', uz: 'Buxgalteriya va 1C' },
    desc: { ru: 'Бухучёт с нуля и практика в «1С:Бухгалтерия 8» - от первичных документов до отчётности', uz: 'Noldan buxgalteriya hisobi va «1C:Buxgalteriya 8» da amaliyot - birlamchi hujjatlardan hisobotgacha' },
    meta: { ru: ['3 месяца', '3 раза в неделю', 'Выдаётся ноутбук'], uz: ['3 oy', 'Haftasiga 3 marta', 'Noutbuk beriladi'] },
    price: { month: 1350000, total: 3600000 },
    priceNote: { ru: 'Выгоднее при оплате курса целиком', uz: 'Toʻliq toʻlovda arzonroq' },
    details: {
      subtitle: { ru: '«1С:Бухгалтерия» и бухучёт для начинающих', uz: 'Boshlovchilar uchun «1C:Buxgalteriya» va buxgalteriya hisobi' },
      facts: [
        { k: 'duration', v: { ru: '3 месяца (12 недель)', uz: '3 oy (12 hafta)' } },
        { k: 'lessons', v: { ru: '36 занятий по 90 минут, 3 раза в неделю (72 академ. часа)', uz: '90 daqiqadan 36 ta dars, haftasiga 3 marta (72 akademik soat)' } },
        { k: 'format', v: { ru: 'Офлайн, мини-группы, 80% практики и домашние задания', uz: 'Oflayn, kichik guruhlar, 80% amaliyot va uy vazifalari' } },
        { k: 'price', v: { ru: '1 350 000 сум/мес или 3 600 000 сум при оплате всего курса', uz: '1 350 000 soʻm/oy yoki butun kurs uchun 3 600 000 soʻm' } }
      ],
      forWhom: {
        ru: ['Новичкам, которые хотят освоить бухучёт с нуля и работать в 1С', 'Студентам экономических специальностей', 'Предпринимателям, которые хотят вести учёт самостоятельно', 'Тем, кто начинает карьеру бухгалтера или обновляет знания'],
        uz: ['Buxgalteriyani noldan oʻrganib, 1C da ishlashni istagan boshlovchilarga', 'Iqtisodiyot yoʻnalishi talabalariga', 'Hisobni mustaqil yuritmoqchi boʻlgan tadbirkorlarga', 'Buxgalterlik faoliyatini boshlayotgan yoki bilimini yangilamoqchi boʻlganlarga']
      },
      outcomes: {
        ru: ['Принципы бухучёта и их применение на практике', 'Ключевые функции «1С:Бухгалтерии» для ведения учёта', 'Работа с первичными документами, расчётами и отчётностью', 'Автоматизация учётных процессов в 1С'],
        uz: ['Buxgalteriya hisobi tamoyillari va ularni amalda qoʻllash', 'Hisob yuritish uchun «1C:Buxgalteriya»ning asosiy funksiyalari', 'Birlamchi hujjatlar, hisob-kitoblar va hisobotlar bilan ishlash', '1C da hisob jarayonlarini avtomatlashtirish']
      },
      program: [
        {
          title: { ru: 'Месяц 1. Основы программы и учёт операций', uz: '1-oy. Dastur asoslari va operatsiyalar hisobi' },
          weeks: [
            { title: { ru: 'Неделя 1. Введение и первоначальная настройка', uz: '1-hafta. Kirish va dastlabki sozlash' }, lessons: { ru: ['Введение в бухучёт и базовые принципы', 'Первоначальная настройка «1С:Бухгалтерии»: параметры под вид деятельности', 'Работа со справочниками'], uz: ['Buxgalteriya hisobiga kirish va asosiy tamoyillar', '«1C:Buxgalteriya»ni dastlabki sozlash: faoliyat turiga koʻra parametrlar', 'Maʼlumotnomalar bilan ishlash'] } },
            { title: { ru: 'Неделя 2. Денежные средства', uz: '2-hafta. Pul mablagʻlari' }, lessons: { ru: ['Банковские операции: платёжные документы и выписки', 'Кассовые операции: приходные и расходные ордера', 'Валютные операции и учёт в нескольких валютах'], uz: ['Bank operatsiyalari: toʻlov hujjatlari va koʻchirmalar', 'Kassa operatsiyalari: kirim va chiqim orderlari', 'Valyuta operatsiyalari va bir necha valyutada hisob'] } },
            { title: { ru: 'Неделя 3. Расчёты с подотчётными лицами', uz: '3-hafta. Hisobdor shaxslar bilan hisob-kitoblar' }, lessons: { ru: ['Авансы и подотчётные суммы', 'Авансовые отчёты и подотчётные операции', 'Практическое задание'], uz: ['Avanslar va hisobdor summalar', 'Avans hisobotlari va hisobdor operatsiyalar', 'Amaliy topshiriq'] } },
            { title: { ru: 'Неделя 4. Торговые операции', uz: '4-hafta. Savdo operatsiyalari' }, lessons: { ru: ['Покупка и продажа товаров', 'Складской учёт: поступление и списание товаров', 'Практическое задание'], uz: ['Tovarlarni sotib olish va sotish', 'Ombor hisobi: tovarlarning kirimi va hisobdan chiqarilishi', 'Amaliy topshiriq'] } }
          ]
        },
        {
          title: { ru: 'Месяц 2. Учёт активов и расчёты', uz: '2-oy. Aktivlar hisobi va hisob-kitoblar' },
          weeks: [
            { title: { ru: 'Неделя 5. Основные средства и НМА', uz: '5-hafta. Asosiy vositalar va nomoddiy aktivlar' }, lessons: { ru: ['Основные средства: оприходование, амортизация', 'Нематериальные активы, в том числе программы и лицензии', 'Практическое задание'], uz: ['Asosiy vositalar: kirim qilish, amortizatsiya', 'Nomoddiy aktivlar, jumladan dasturlar va litsenziyalar', 'Amaliy topshiriq'] } },
            { title: { ru: 'Неделя 6. Внешнеэкономические операции', uz: '6-hafta. Tashqi iqtisodiy operatsiyalar' }, lessons: { ru: ['Импорт: документы и расчёты', 'Экспорт и валютные расчёты', 'Практическое задание'], uz: ['Import: hujjatlar va hisob-kitoblar', 'Eksport va valyuta hisob-kitoblari', 'Amaliy topshiriq'] } },
            { title: { ru: 'Неделя 7. Заработная плата', uz: '7-hafta. Ish haqi' }, lessons: { ru: ['Начисление и выплата зарплаты', 'Налоги с зарплаты, социальные взносы и НДФЛ', 'Практическое задание'], uz: ['Ish haqini hisoblash va toʻlash', 'Ish haqidan soliqlar, ijtimoiy badallar va JShDS', 'Amaliy topshiriq'] } },
            { title: { ru: 'Неделя 8. Материалы и склад', uz: '8-hafta. Materiallar va ombor' }, lessons: { ru: ['Основы учёта материалов и склада', 'Движение ТМЦ: поступление и списание', 'Практическое задание'], uz: ['Materiallar va ombor hisobi asoslari', 'TMQ harakati: kirim va hisobdan chiqarish', 'Amaliy topshiriq'] } }
          ]
        },
        {
          title: { ru: 'Месяц 3. Производство и отчётность', uz: '3-oy. Ishlab chiqarish va hisobot' },
          weeks: [
            { title: { ru: 'Неделя 9. Производство', uz: '9-hafta. Ishlab chiqarish' }, lessons: { ru: ['Учёт производства: планирование и затраты', 'Себестоимость продукции, полуфабрикаты', 'Практическое задание'], uz: ['Ishlab chiqarish hisobi: rejalashtirish va xarajatlar', 'Mahsulot tannarxi, yarim tayyor mahsulotlar', 'Amaliy topshiriq'] } },
            { title: { ru: 'Неделя 10. Закрытие периода', uz: '10-hafta. Davrni yopish' }, lessons: { ru: ['Закрытие месяца, регламентные операции', 'Аналитические отчёты, баланс, оборотно-сальдовая ведомость', 'Практическое задание'], uz: ['Oyni yopish, reglament operatsiyalari', 'Tahliliy hisobotlar, balans, aylanma-saldo qaydnomasi', 'Amaliy topshiriq'] } },
            { title: { ru: 'Неделя 11. Налоговая и бухгалтерская отчётность', uz: '11-hafta. Soliq va buxgalteriya hisoboti' }, lessons: { ru: ['Бухгалтерская отчётность: формы и сроки', 'Налоговая отчётность: НДС и налог на прибыль', 'Практическое задание'], uz: ['Buxgalteriya hisoboti: shakllar va muddatlar', 'Soliq hisoboti: QQS va foyda soligʻi', 'Amaliy topshiriq'] } },
            { title: { ru: 'Неделя 12. Бонус и итоговая работа', uz: '12-hafta. Bonus va yakuniy ish' }, lessons: { ru: ['Бонусный модуль: анализ учёта и поиск ошибок', 'Учёт в «1С:Бухгалтерия 8», повторение курса', 'Итоговое практическое занятие: комплексный учёт'], uz: ['Bonus modul: hisob tahlili va xatolarni topish', '«1C:Buxgalteriya 8» da hisob yuritish, kursni takrorlash', 'Yakuniy amaliy mashgʻulot: kompleks hisob'] } }
          ]
        }
      ],
      teachers: [
        { name: { ru: 'Ольга Викторовна', uz: 'Olga Viktorovna' }, role: { ru: 'Практикующий бухгалтер с опытом более 20 лет, ведёт учёт трёх компаний из разных отраслей. В Get Study подготовила более 500 учеников, многие из них нашли работу сразу после курса.', uz: '20 yildan ortiq tajribaga ega amaliyotchi buxgalter, turli sohalardagi uchta kompaniya hisobini yuritadi. Get Study da 500 dan ortiq oʻquvchi tayyorlagan, ularning koʻpchiligi kursdan soʻng darhol ishga joylashgan.' } }
      ],
      includes: {
        ru: ['Первое занятие бесплатно', 'Выдаётся ноутбук', 'Ментор на занятиях и в закрытой Telegram-группе', 'Сертификат по окончании', 'Скидка при оплате всего курса', 'Любая форма оплаты'],
        uz: ['Birinchi dars bepul', 'Noutbuk beriladi', 'Mentor darsda va yopiq Telegram-guruhda', 'Kurs yakunida sertifikat', 'Butun kurs uchun toʻlovda chegirma', 'Istalgan toʻlov usuli']
      }
    }
  },
  {
    id: 'corporate', cat: 'corp', icon: 'building', tone: 'navy',
    title: { ru: 'Корпоративное обучение', uz: 'Korporativ taʼlim' },
    desc: { ru: 'Excel и деловой английский для сотрудников, программа под сферу компании', uz: 'Xodimlar uchun Excel va ishbilarmonlik ingliz tili, dastur kompaniya sohasiga moslanadi' },
    meta: { ru: ['По договору', 'Сертификаты', 'Отчёт с рекомендациями'], uz: ['Shartnoma asosida', 'Sertifikatlar', 'Tavsiyalar bilan hisobot'] },
    price: { contract: true },
    details: {
      subtitle: { ru: 'Обучение сотрудников для юридических лиц', uz: 'Yuridik shaxslar uchun xodimlarni oʻqitish' },
      programsList: {
        ru: ['Компьютерные курсы с углублённым изучением Excel', 'Корпоративный английский язык для специалистов'],
        uz: ['Excel chuqur oʻrganiladigan kompyuter kurslari', 'Mutaxassislar uchun korporativ ingliz tili']
      },
      steps: [
        { t: 'corp.s1t', d: 'corp.s1d' }, { t: 'corp.s2t', d: 'corp.s2d' }, { t: 'corp.s3t', d: 'corp.s3d' }, { t: 'corp.s4t', d: 'corp.s4d' }
      ],
      includes: {
        ru: ['Программа под сферу деятельности компании', 'Договор и оплата перечислением', 'Сертификаты по итогам курса', 'Индивидуальные рекомендации для каждого сотрудника'],
        uz: ['Kompaniya faoliyat sohasiga moslangan dastur', 'Shartnoma va pul oʻtkazish yoʻli bilan toʻlov', 'Kurs yakunida sertifikatlar', 'Har bir xodim uchun individual tavsiyalar']
      }
    }
  }
];

/* ---------- Оформление плиток каталога ---------- */
GS.TILES = {
  english: { hi: 'Hello!', lang: 'en' },
  uzbek: { hi: 'Salom!', lang: 'uz', tint: 'mint' },
  russian: { hi: 'Привет!', lang: 'ru', tint: 'blue' },
  german: { hi: 'Hallo!', lang: 'de', tint: 'yellow' },
  french: { hi: 'Bonjour!', lang: 'fr', tint: 'pink' },
  chinese: { hi: '你好！', lang: 'zh', tint: 'mint' },
  korean: { hi: '안녕하세요!', lang: 'ko', tint: 'blue', long: true },
  computer: {
    sheet: {
      formula: { ru: '=СУММ(B1:B3)', uz: '=SUM(B1:B3)' },
      rows: { ru: [['Янв', '1 200', 70], ['Фев', '1 450', 85], ['Мар', '1 700', 100]], uz: [['Yan', '1 200', 70], ['Fev', '1 450', 85], ['Mar', '1 700', 100]] },
      total: { ru: ['Итого', '4 350'], uz: ['Jami', '4 350'] }
    }
  },
  accounting: {
    /* Типовые проводки по плану счетов Узбекистана (НСБУ 21) */
    ledger: [
      { dt: '5010', kt: '5110', ru: 'Наличные с р/с в кассу', uz: 'Hisob raqamdan kassaga naqd pul' },
      { dt: '6010', kt: '5110', ru: 'Оплата поставщику', uz: 'Yetkazib beruvchiga toʻlov' },
      { dt: '2010', kt: '6710', ru: 'Начислена зарплата', uz: 'Ish haqi hisoblandi' }
    ]
  }
};

/* Направления, которые были в старой форме заявки и в расписании */
GS.EXTRAS = [
  { id: 'math', title: { ru: 'Математика для абитуриентов', uz: 'Abituriyentlar uchun matematika' } },
  { id: 'spanish', title: { ru: 'Испанский язык', uz: 'Ispan tili' } },
  { id: 'italian', title: { ru: 'Итальянский язык', uz: 'Italyan tili' } },
  { id: 'turkish', title: { ru: 'Турецкий язык', uz: 'Turk tili' } }
];
GS.CONSULT = { id: 'consult', title: { ru: 'Не знаю, нужна консультация', uz: 'Bilmayman, maslahat kerak' } };

/* ---------- Расписание (с онлайн-календаря центра, ноябрь 2026) ---------- */
GS.SCHEDULE = {
  updated: { ru: 'ноябрь 2026', uz: '2026-yil noyabr' },
  mwf: [
    { from: '09:00', to: '10:00', course: 'english', title: 'English «Elementary»', teacher: 'Ms. Raisa' },
    { from: '14:00', to: '15:30', course: 'english', title: 'English «Beginner»', teacher: 'Mr. Tigran' },
    { from: '17:00', to: '18:30', course: 'german', title: { ru: 'Немецкий язык', uz: 'Nemis tili' }, teacher: 'Mr. Bilol' },
    { from: '19:00', to: '20:30', course: 'uzbek', title: { ru: 'Узбекский язык', uz: 'Oʻzbek tili' }, teacher: 'Ms. Guli', days: { ru: 'только Пн и Пт', uz: 'faqat Du va Ju' }, short: { ru: 'Пн и Пт', uz: 'Du va Ju' } }
  ],
  tts: [
    { from: '15:30', to: '17:00', course: 'english', title: 'English «Elementary»', teacher: 'Ms. Malika' },
    { from: '16:00', to: '17:30', course: 'russian', title: { ru: 'Русский для иностранцев', uz: 'Chet elliklar uchun rus tili' }, teacher: 'Saodat Ismailovna', days: { ru: 'только Вт и Чт', uz: 'faqat Se va Pay' }, short: { ru: 'Вт и Чт', uz: 'Se va Pay' } },
    { from: '16:30', to: '18:00', course: 'math', title: { ru: 'Математика для абитуриентов', uz: 'Abituriyentlar uchun matematika' } },
    { from: '17:00', to: '18:30', course: 'english', title: 'English «Pre-Intermediate»', teacher: 'Ms. Kate' },
    { from: '17:00', to: '18:30', course: 'english', title: 'English «Upper-Intermediate»', teacher: 'Ms. Malika' }
  ]
};

/* ---------- Отзывы (Google и Яндекс Карты) ----------
   Короткие фрагменты реальных отзывов в оригинальном написании,
   полные тексты открываются по ссылке на площадку. */
GS.REVIEWS = [
  { name: 'Ситора Назарбаева', src: 'google', date: [2021, 4], stars: 5, course: 'accounting', lang: 'ru', text: 'Хожу на курсы бухгалтерии… Очень хороший преподаватель, преподают и программу 1С' },
  { name: 'Farangis Shukurova', src: 'google', date: [2021, 4], stars: 5, course: 'english', lang: 'ru', text: '…смогут научить вас английскому даже с нуля, лично проверено :)' },
  { name: 'Зилола Обидова', src: 'google', date: [2021, 4], stars: 5, lang: 'ru', text: 'Отличный учебный центр, учителя интересно проводят занятия.' },
  { name: 'Packet_man', src: 'google', date: [2021, 4], stars: 5, lang: 'ru', text: '…хорошие учителя, соотношение цены и качества очень оправдано!' },
  { name: "Dilrabo G'anixo'jayeva", src: 'yandex', date: [2023, 5], lang: 'en', text: 'One of the best education centres.' },
  { name: 'Бехруз Талипджанов', src: 'google', date: [2021, 4], stars: 5, lang: 'ru', text: 'Тут очень хорошо и понятно учат' },
  { name: 'Асад Бахтиёров', src: 'google', date: [2021, 4], stars: 5, course: 'english', lang: 'uz-Cyrl', text: '…буерда жудахам яхши дарсла олип боришади' },
  { name: 'Shakh 01', src: 'google', date: [2021, 4], stars: 5, course: 'english', lang: 'ru', text: 'Очень хороший центр, я хожу 2 месяца… очень хорошие учителя по английскому языку' },
  { name: 'Владимир Королёв', src: 'google', date: [2021, 4], stars: 5, lang: 'ru', text: 'Хорошее расположение и доступные цены, советую!' },
  { name: 'Danka Bro', src: 'google', date: [2021, 4], stars: 5, lang: 'ru', text: 'Очень приятные учителя, хорошее место расположение' }
];

/* ---------- Вакансии ---------- */
GS.VACANCY = {
  subjects: [
    { id: 'english', ru: 'Английский язык', uz: 'Ingliz tili' },
    { id: 'accounting', ru: 'Бухгалтерия', uz: 'Buxgalteriya' },
    { id: 'spanish', ru: 'Испанский язык', uz: 'Ispan tili' },
    { id: 'italian', ru: 'Итальянский язык', uz: 'Italyan tili' },
    { id: 'chinese', ru: 'Китайский язык', uz: 'Xitoy tili' },
    { id: 'computer', ru: 'Компьютерные курсы', uz: 'Kompyuter kurslari' },
    { id: 'korean', ru: 'Корейский язык', uz: 'Koreys tili' },
    { id: 'math', ru: 'Математика', uz: 'Matematika' },
    { id: 'german', ru: 'Немецкий язык', uz: 'Nemis tili' },
    { id: 'russian', ru: 'Русский язык', uz: 'Rus tili' },
    { id: 'turkish', ru: 'Турецкий язык', uz: 'Turk tili' },
    { id: 'uzbek', ru: 'Узбекский язык', uz: 'Oʻzbek tili' },
    { id: 'french', ru: 'Французский язык', uz: 'Fransuz tili' }
  ],
  shifts: [
    { k: 'full', time: '09:00–21:00' },
    { k: 'am', time: '09:00–13:00' },
    { k: 'day', time: '13:00–18:00' },
    { k: 'pm', time: '18:00–21:00' }
  ]
};

/* ---------- Тексты интерфейса RU / UZ ---------- */
GS.I18N = {
  ru: {
    'meta.title': 'Get Study - учебный центр в Ташкенте у метро «Новза»: языки, Excel, 1С',
    'meta.desc': 'Учебный центр Get Study в Ташкенте с 2010 года: английский и IELTS, узбекский, русский, немецкий, французский, китайский и корейский языки, Excel и 1С:Бухгалтерия. Мини-группы, первое занятие бесплатно.',
    'skip': 'Перейти к содержанию',
    'logo.alt': 'Get Study - учебный центр',

    'nav.main': 'Основное меню',
    'nav.courses': 'Курсы',
    'nav.about': 'О центре',
    'nav.reviews': 'Отзывы',
    'nav.corporate': 'Компаниям',
    'nav.signup': 'Запись',
    'nav.contacts': 'Контакты',
    'nav.schedule': 'Расписание',
    'nav.vacancies': 'Вакансии',

    'header.cta': 'Записаться',
    'header.menu': 'Открыть меню',
    'header.call': 'Позвонить',
    'lang.label': 'Язык сайта',

    'drawer.title': 'Меню',
    'drawer.close': 'Закрыть меню',
    'drawer.contacts': 'Связаться с нами',
    'drawer.cta': 'Записаться на бесплатный урок',
    'hero.title': 'Языки, Excel и 1С <span class="flag-text">в\u00A0<span class="nowrap">мини-группах</span></span> у\u00A0метро «Новза»',
    'hero.lead': 'Подберём группу под ваш уровень и удобное время.',
    'hero.cta1': 'Записаться на бесплатный урок',
    'hero.cta2': 'Выбрать курс',
    'hero.tags': 'Быстрый выбор направления',
    'tag.english': 'Английский',
    'tag.ielts': 'IELTS & TOEFL',
    'tag.excel': 'Excel',
    'tag.acc': '1С: Бухгалтерия',
    'courses.title': 'Курсы',
    'filter.label': 'Фильтр направлений',
    'filter.all': 'Все',
    'filter.lang': 'Языки',
    'filter.pc': 'Компьютер и Excel',
    'filter.acc': 'Бухгалтерия и 1С',
    'filter.corp': 'Для компаний',
    'card.enroll': 'Записаться',
    'card.more': 'Подробнее',
    'card.perMonth': 'сум/мес',
    'card.onRequest': 'Цена по запросу',
    'card.contract': 'Цена по договору',
    'card.trial': '1-й урок бесплатно',
    'about.title': 'Почему выбирают Get\u00A0Study',
    'stat.years': 'лет в Ташкенте',
    'stat.grads': 'выпускников',
    'stat.dirs': 'направлений обучения',
    'perk.1': 'Классы с кондиционерами и проекторами',
    'perk.2': 'Мини-группы по уровню и возрасту',
    'perk.3': 'Наглядные материалы и электронная библиотека',
    'perk.4': 'Ментор на связи в Telegram',
    'perk.5': 'Сертификат по окончании курса',
    'perk.6': 'Семейная скидка 10% на английский',
    'video.title': 'Знакомство с Get\u00A0Study',
    'gallery.alt': 'Класс учебного центра Get Study, фото {n}',
    'gallery.region': 'Фото классов',
    'carousel.prev': 'Назад',
    'carousel.next': 'Вперёд',
    'reviews.title': 'Что говорят ученики',
    'reviews.region': 'Отзывы учеников',
    'reviews.google': 'Отзывы в Google',
    'reviews.yandex': 'Отзывы на Яндекс Картах',
    'reviews.readFull': 'Полностью',
    'reviews.rating': 'Оценка: {n} из 5',
    'src.google': 'Google',
    'src.yandex': 'Яндекс Карты',
    'corp.s1t': 'Тестирование',
    'corp.s1d': 'Присылаем ссылку на тест и оцениваем текущий уровень знаний сотрудников.',
    'corp.s2t': 'Согласование',
    'corp.s2d': 'Обсуждаем формат, количество слушателей и стоимость, обмениваемся документами, оплата по договору.',
    'corp.s3t': 'Обучение',
    'corp.s3d': 'Проводим занятия по согласованной программе, по итогам курса выдаём сертификаты.',
    'corp.s4t': 'Рекомендации',
    'corp.s4d': 'Готовим отчёт с рекомендациями, в том числе индивидуальными для каждого сотрудника.',

    'form.eyebrow': 'Запись',
    'form.title': 'Запишитесь на бесплатный урок',
    'form.lead': 'Администратор перезвонит, ответит на вопросы и подберёт группу.',
    'form.altTg': 'Написать в Telegram',
    'form.name': 'Имя',
    'form.namePh': 'Как к вам обращаться',
    'form.phone': 'Телефон',
    'form.course': 'Направление',
    'form.coursePh': 'Выберите курс',
    'form.more': 'Дополнительные пожелания (необязательно)',
    'form.age': 'Возраст',
    'form.agePh': 'Например, 25',
    'form.level': 'Уровень',
    'form.level.beg': 'Начинающий',
    'form.level.mid': 'Средний',
    'form.level.adv': 'Продвинутый',
    'form.format': 'Формат занятий',
    'form.format.group': 'В группе',
    'form.format.indiv': 'Индивидуально',
    'form.format.online': 'Онлайн, индивидуально',
    'form.days': 'Дни',
    'form.days.any': 'Любые',
    'form.days.mwf': 'Пн, Ср, Пт',
    'form.days.tts': 'Вт, Чт, Сб',
    'form.time': 'Время',
    'form.time.any': 'Любое (09:00–20:00)',
    'form.time.am': 'Утро (09:00–13:00)',
    'form.time.day': 'День (13:00–18:00)',
    'form.time.pm': 'Вечер (18:00–20:00)',
    'form.glang': 'Язык группы',
    'form.glang.uz': 'Узбекский',
    'form.glang.ru': 'Русский',
    'form.comment': 'Комментарий',
    'form.commentPh': 'Например: хочу подготовиться к IELTS к лету',
    'form.hp': 'Не заполняйте это поле',
    'form.consent': 'Нажимая кнопку, вы соглашаетесь с <a href="{privacy}" target="_blank" rel="noopener">политикой обработки персональных данных</a>.',
    'form.submit': 'Записаться бесплатно',
    'form.err.name': 'Введите имя',
    'form.err.phone': 'Введите номер полностью: 9 цифр после +998',
    'form.err.course': 'Выберите направление',
    'form.ok.title': 'Заявка отправлена!',
    'form.ok.text': 'Спасибо, {name}! Администратор перезвонит вам в рабочее время: Пн–Сб, 09:00–18:00.',
    'form.ok.again': 'Отправить ещё одну заявку',
    'form.fail': 'Не удалось отправить заявку. Позвоните нам или напишите в Telegram - мы на связи.',
    'form.demo': 'Демо-режим: заявка показана в консоли браузера. Подключите обработчик в CONFIG.leadEndpoint.',
    'form.preset': 'Выбрано направление: {x}',
    'form.og.lang': 'Языки',
    'form.og.skills': 'Компьютер и бухгалтерия',
    'form.og.corp': 'Для компаний',
    'form.og.other': 'Другие направления',
    'contacts.title': 'Как нас найти',
    'contacts.addr': 'Ташкент, Чиланзарский район, пр.\u00A0Бунёдкор (дублёр), 11',
    'contacts.addr2': 'Чиланзар, квартал «Е», дом 10 · 1 этаж',
    'contacts.hoursLine': 'Пн–Сб 09:00–18:00, обед 13:00–14:00<br>Вс - выходной',
    'contacts.yandex': 'Яндекс Карты',
    'contacts.twogis': '2GIS',
    'contacts.how': 'Как пройти от метро «Новза»',
    'contacts.h1': 'Доедьте до станции «Новза» (Чиланзарская линия) и выйдите на проспект Бунёдкор.',
    'contacts.h2': 'Идите вдоль проспекта в сторону станции «Мирзо Улугбек», то есть от центра города, по той стороне, где «Трастбанк».',
    'contacts.h3': 'Примерно через 250 метров (3–4 минуты пешком) - здание пр.\u00A0Бунёдкор (дублёр), 11, рядом с «Трастбанком» и 1-м Республиканским медицинским колледжем.',
    'contacts.h4': 'Get Study находится на 1 этаже. Если сомневаетесь, позвоните - администратор подскажет дорогу.',
    'contacts.bus': 'На автобусе: остановка «Новза» в 160 м от центра.',
    'contacts.video': 'Видео: путь от метро',
    'status.open': 'Сейчас открыто · до 18:00',
    'status.lunch': 'Обеденный перерыв · до 14:00',
    'status.before': 'Закрыто · откроемся в 09:00',
    'status.tomorrow': 'Закрыто · откроемся завтра в 09:00',
    'status.monday': 'Закрыто · откроемся в понедельник в 09:00',
    'footer.nav': 'Разделы',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Пользовательское соглашение',
    'footer.copy': '© 2010–{y} Get Study. Учебный центр в Ташкенте.',

    'bar.label': 'Быстрые действия',
    'bar.call': 'Позвонить',
    'bar.tg': 'Telegram',
    'bar.enroll': 'Записаться',

    'sheet.close': 'Закрыть',

    'sch.title': 'Расписание занятий',
    'sch.lead': 'Актуально на {date}. Группы набираются постоянно - точное время уточнит администратор.',
    'sch.mwf': 'Пн · Ср · Пт',
    'sch.tts': 'Вт · Чт · Сб',
    'sch.enroll': 'Записаться в группу',
    'sch.live': 'Открыть онлайн-календарь',
    'sch.liveHint': 'Календарь центра обновляется автоматически.',
    'sch.liveTitle': 'Онлайн-календарь занятий Get Study',
    'sch.none': 'Не нашли удобное время? Оставьте заявку - подберём группу.',
    'sch.noneCta': 'Оставить заявку',

    'vac.title': 'Вакансии',
    'vac.lead': 'Ищем преподавателей в команду Get Study',
    'vac.subjects': 'Предметы',
    'vac.tlangs': 'Языки преподавания: английский, русский, узбекский.',
    'vac.req': 'Кого мы ищем',
    'vac.r1': 'Эксперта в своём предмете, готового развиваться и делиться актуальными знаниями',
    'vac.r2': 'Педагога, который объясняет сложное просто, мотивирует и удерживает интерес учеников',
    'vac.r3': 'Честного и ответственного человека, соблюдающего профессиональную этику',
    'vac.r4': 'Терпеливого и тактичного в общении с разными учениками',
    'vac.r5': 'Организованного, умеющего планировать уроки',
    'vac.duties': 'Чем предстоит заниматься',
    'vac.d1': 'Вести занятия по своему предмету',
    'vac.d2': 'Выстраивать учебный процесс для лучшего результата',
    'vac.d3': 'Строить с учениками отношения взаимного уважения и доверия',
    'vac.shifts': 'График на выбор',
    'vac.sh.full': 'Полный день',
    'vac.sh.am': 'Утро',
    'vac.sh.day': 'День',
    'vac.sh.pm': 'Вечер',
    'vac.apply': 'Откликнуться',
    'vac.name': 'Имя и фамилия',
    'vac.namePh': 'Например, Малика Каримова',
    'vac.subject': 'Предмет',
    'vac.subjectPh': 'Выберите предмет',
    'vac.more': 'Расскажите о себе (необязательно)',
    'vac.birth': 'Дата рождения',
    'vac.edu': 'Образование',
    'vac.edu.st': 'Студент',
    'vac.edu.ba': 'Бакалавр',
    'vac.edu.ma': 'Магистр',
    'vac.shift': 'Удобный график',
    'vac.tlang': 'Язык преподавания',
    'vac.tl.en': 'Английский',
    'vac.tl.ru': 'Русский',
    'vac.tl.uz': 'Узбекский',
    'vac.exp': 'Есть опыт преподавания?',
    'vac.exp.y': 'Да',
    'vac.exp.n': 'Нет',
    'vac.self': 'Оцените свой уровень владения предметом от 1 до 5',
    'vac.letter': 'Сопроводительное письмо',
    'vac.letterPh': 'Коротко о вашем опыте и о том, почему хотите преподавать у нас',
    'vac.submit': 'Отправить отклик',
    'vac.ok.title': 'Отклик отправлен!',
    'vac.ok.text': 'Спасибо! Мы изучим анкету и свяжемся с вами.',
    'vac.tg': 'Или напишите нам в Telegram',
    'vac.err.name': 'Введите имя и фамилию',
    'vac.err.subject': 'Выберите предмет',

    'c.duration': 'Длительность',
    'c.lessons': 'Занятия',
    'c.format': 'Формат',
    'c.price': 'Стоимость',
    'c.program': 'Программа курса',
    'c.teacher': 'Преподаватель',
    'c.teachers': 'Преподаватели',
    'c.forWhom': 'Для кого',
    'c.outcomes': 'Чему научитесь',
    'c.includes': 'Что входит',
    'c.groups': 'Группы в расписании',
    'c.levels': 'Уровни и ориентировочные сроки',
    'c.enroll': 'Записаться на курс',
    'c.ask': 'Стоимость и ближайший старт подскажет администратор.',
    'c.programs': 'Программы',
    'c.steps': 'Этапы сотрудничества',
    'c.month': 'мес',
    'c.full': '{x} сум за весь курс',

    'toast.preset': 'Направление «{x}» выбрано в форме',
    'days.mwf': 'Пн, Ср, Пт',
    'days.tts': 'Вт, Чт, Сб',
    'months': ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    'date.fmt': '{m} {y}',
    'hero.sticker': '1-й урок бесплатно',
    'ticket.no': 'урок',
    'map.title': 'Схема: путь от метро «Новза» до Get Study',
    'map.avenue': 'пр. Бунёдкор',
    'map.street': 'ул. Мукими',
    'map.metro': 'Новза',
    'map.bank': 'Трастбанк',
    'map.college': 'Мед. колледж',
    'map.walk': '≈ 250 м · 3–4 мин',
    'map.note': 'Схема, не в масштабе',
    'tile.dt': 'Дт',
    'tile.kt': 'Кт',
    'tile.op': 'Операция',
    'tile.corpCta': 'Обсудить обучение',
    'extras.label': 'Ещё набираем:'
  },

  uz: {
    'meta.title': 'Get Study - Toshkentdagi oʻquv markazi, «Novza» metrosi yonida: tillar, Excel, 1C',
    'meta.desc': 'Get Study oʻquv markazi Toshkentda 2010-yildan beri: ingliz tili va IELTS, oʻzbek, rus, nemis, fransuz, xitoy va koreys tillari, Excel va 1C:Buxgalteriya. Kichik guruhlar, birinchi dars bepul.',
    'skip': 'Asosiy mazmunga oʻtish',
    'logo.alt': 'Get Study - oʻquv markazi',

    'nav.main': 'Asosiy menyu',
    'nav.courses': 'Kurslar',
    'nav.about': 'Markaz haqida',
    'nav.reviews': 'Fikrlar',
    'nav.corporate': 'Kompaniyalarga',
    'nav.signup': 'Yozilish',
    'nav.contacts': 'Aloqa',
    'nav.schedule': 'Dars jadvali',
    'nav.vacancies': 'Vakansiyalar',

    'header.cta': 'Yozilish',
    'header.menu': 'Menyuni ochish',
    'header.call': 'Qoʻngʻiroq qilish',
    'lang.label': 'Sayt tili',

    'drawer.title': 'Menyu',
    'drawer.close': 'Menyuni yopish',
    'drawer.contacts': 'Biz bilan bogʻlaning',
    'drawer.cta': 'Bepul darsga yozilish',
    'hero.title': '«Novza» metrosi yonida <span class="flag-text">kichik guruhlarda</span> tillar, Excel va 1C',
    'hero.lead': 'Darajangiz va qulay vaqtingizga mos guruh tanlaymiz.',
    'hero.cta1': 'Bepul darsga yozilish',
    'hero.cta2': 'Kurs tanlash',
    'hero.tags': 'Yoʻnalishni tez tanlash',
    'tag.english': 'Ingliz tili',
    'tag.ielts': 'IELTS & TOEFL',
    'tag.excel': 'Excel',
    'tag.acc': '1C: Buxgalteriya',
    'courses.title': 'Kurslar',
    'filter.label': 'Yoʻnalishlar filtri',
    'filter.all': 'Barchasi',
    'filter.lang': 'Tillar',
    'filter.pc': 'Kompyuter va Excel',
    'filter.acc': 'Buxgalteriya va 1C',
    'filter.corp': 'Kompaniyalar uchun',
    'card.enroll': 'Yozilish',
    'card.more': 'Batafsil',
    'card.perMonth': 'soʻm/oy',
    'card.onRequest': 'Narxi soʻrov boʻyicha',
    'card.contract': 'Narxi shartnoma boʻyicha',
    'card.trial': '1-dars bepul',
    'about.title': 'Nega Get\u00A0Study ni tanlashadi',
    'stat.years': 'yildan beri Toshkentda',
    'stat.grads': 'bitiruvchi',
    'stat.dirs': 'taʼlim yoʻnalishi',
    'perk.1': 'Konditsioner va proyektorli sinfxonalar',
    'perk.2': 'Daraja va yoshga koʻra kichik guruhlar',
    'perk.3': 'Koʻrgazmali materiallar va elektron kutubxona',
    'perk.4': 'Mentor Telegramda doim aloqada',
    'perk.5': 'Kurs yakunida sertifikat',
    'perk.6': 'Ingliz tiliga 10% oilaviy chegirma',
    'video.title': 'Get\u00A0Study bilan tanishuv',
    'gallery.alt': 'Get Study oʻquv markazi sinfxonasi, {n}-surat',
    'gallery.region': 'Sinfxonalar suratlari',
    'carousel.prev': 'Orqaga',
    'carousel.next': 'Oldinga',
    'reviews.title': 'Oʻquvchilar nima deydi',
    'reviews.region': 'Oʻquvchilar fikrlari',
    'reviews.google': 'Googleʼdagi fikrlar',
    'reviews.yandex': 'Yandex Xaritalardagi fikrlar',
    'reviews.readFull': 'Toʻliq',
    'reviews.rating': 'Baho: 5 dan {n}',
    'src.google': 'Google',
    'src.yandex': 'Yandex Xaritalar',
    'corp.s1t': 'Test sinovi',
    'corp.s1d': 'Test havolasini yuboramiz va xodimlarning hozirgi bilim darajasini baholaymiz.',
    'corp.s2t': 'Kelishuv',
    'corp.s2d': 'Format, tinglovchilar soni va narxni kelishamiz, hujjat almashamiz, toʻlov shartnoma boʻyicha.',
    'corp.s3t': 'Oʻqitish',
    'corp.s3d': 'Kelishilgan dastur boʻyicha darslar oʻtamiz, kurs yakunida sertifikatlar beramiz.',
    'corp.s4t': 'Tavsiyalar',
    'corp.s4d': 'Tavsiyalar bilan hisobot tayyorlaymiz, jumladan har bir xodim uchun individual tavsiyalar.',

    'form.eyebrow': 'Yozilish',
    'form.title': 'Bepul darsga yoziling',
    'form.lead': 'Administrator qoʻngʻiroq qilib, savollaringizga javob beradi va guruh tanlaydi.',
    'form.altTg': 'Telegramga yozish',
    'form.name': 'Ism',
    'form.namePh': 'Sizga qanday murojaat qilaylik',
    'form.phone': 'Telefon',
    'form.course': 'Yoʻnalish',
    'form.coursePh': 'Kursni tanlang',
    'form.more': 'Qoʻshimcha istaklar (ixtiyoriy)',
    'form.age': 'Yosh',
    'form.agePh': 'Masalan, 25',
    'form.level': 'Daraja',
    'form.level.beg': 'Boshlangʻich',
    'form.level.mid': 'Oʻrta',
    'form.level.adv': 'Yuqori',
    'form.format': 'Dars formati',
    'form.format.group': 'Guruhda',
    'form.format.indiv': 'Individual',
    'form.format.online': 'Onlayn, individual',
    'form.days': 'Kunlar',
    'form.days.any': 'Istalgan',
    'form.days.mwf': 'Du, Chor, Ju',
    'form.days.tts': 'Se, Pay, Sha',
    'form.time': 'Vaqt',
    'form.time.any': 'Istalgan (09:00–20:00)',
    'form.time.am': 'Ertalab (09:00–13:00)',
    'form.time.day': 'Kunduzi (13:00–18:00)',
    'form.time.pm': 'Kechqurun (18:00–20:00)',
    'form.glang': 'Guruh tili',
    'form.glang.uz': 'Oʻzbekcha',
    'form.glang.ru': 'Ruscha',
    'form.comment': 'Izoh',
    'form.commentPh': 'Masalan: yozgacha IELTS ga tayyorlanmoqchiman',
    'form.hp': 'Bu maydonni toʻldirmang',
    'form.consent': 'Tugmani bosish orqali <a href="{privacy}" target="_blank" rel="noopener">shaxsiy maʼlumotlarni qayta ishlash siyosatiga</a> rozilik bildirasiz.',
    'form.submit': 'Bepul yozilish',
    'form.err.name': 'Ismingizni kiriting',
    'form.err.phone': 'Raqamni toʻliq kiriting: +998 dan keyin 9 ta raqam',
    'form.err.course': 'Yoʻnalishni tanlang',
    'form.ok.title': 'Ariza yuborildi!',
    'form.ok.text': 'Rahmat, {name}! Administrator ish vaqtida qoʻngʻiroq qiladi: Du–Sha, 09:00–18:00.',
    'form.ok.again': 'Yana ariza yuborish',
    'form.fail': 'Arizani yuborib boʻlmadi. Bizga qoʻngʻiroq qiling yoki Telegramga yozing - biz aloqadamiz.',
    'form.demo': 'Demo rejim: ariza brauzer konsolida koʻrsatildi. CONFIG.leadEndpoint da ishlovchini ulang.',
    'form.preset': 'Tanlangan yoʻnalish: {x}',
    'form.og.lang': 'Tillar',
    'form.og.skills': 'Kompyuter va buxgalteriya',
    'form.og.corp': 'Kompaniyalar uchun',
    'form.og.other': 'Boshqa yoʻnalishlar',
    'contacts.title': 'Bizni qanday topish mumkin',
    'contacts.addr': 'Toshkent, Chilonzor tumani, Bunyodkor shoh koʻchasi (dubler), 11',
    'contacts.addr2': 'Chilonzor, «E» mavzesi, 10-uy · 1-qavat',
    'contacts.hoursLine': 'Du–Sha 09:00–18:00, tushlik 13:00–14:00<br>Yak - dam olish kuni',
    'contacts.yandex': 'Yandex Xaritalar',
    'contacts.twogis': '2GIS',
    'contacts.how': '«Novza» metrosidan qanday yetib kelish mumkin',
    'contacts.h1': '«Novza» bekatigacha (Chilonzor yoʻli) keling va Bunyodkor shoh koʻchasiga chiqing.',
    'contacts.h2': 'Koʻcha boʻylab «Mirzo Ulugʻbek» bekati tomon, yaʼni shahar markazidan uzoqlashib, «Trastbank» joylashgan tomondan yuring.',
    'contacts.h3': 'Taxminan 250 metrdan soʻng (piyoda 3–4 daqiqa) - Bunyodkor shoh koʻchasi (dubler), 11-uy, «Trastbank» va 1-Respublika tibbiyot kolleji yonida.',
    'contacts.h4': 'Get Study 1-qavatda joylashgan. Ikkilansangiz, qoʻngʻiroq qiling - administrator yoʻlni tushuntiradi.',
    'contacts.bus': 'Avtobusda: «Novza» bekati markazdan 160 m uzoqlikda.',
    'contacts.video': 'Video: metrodan yoʻl',
    'status.open': 'Hozir ochiq · 18:00 gacha',
    'status.lunch': 'Tushlik tanaffusi · 14:00 gacha',
    'status.before': 'Yopiq · 09:00 da ochiladi',
    'status.tomorrow': 'Yopiq · ertaga 09:00 da ochiladi',
    'status.monday': 'Yopiq · dushanba kuni 09:00 da ochiladi',
    'footer.nav': 'Boʻlimlar',
    'footer.privacy': 'Maxfiylik siyosati',
    'footer.terms': 'Foydalanuvchi kelishuvi',
    'footer.copy': '© 2010–{y} Get Study. Toshkentdagi oʻquv markazi.',

    'bar.label': 'Tezkor amallar',
    'bar.call': 'Qoʻngʻiroq',
    'bar.tg': 'Telegram',
    'bar.enroll': 'Yozilish',

    'sheet.close': 'Yopish',

    'sch.title': 'Dars jadvali',
    'sch.lead': '{date} holatiga. Guruhlar doimiy yigʻiladi - aniq vaqtni administrator aytadi.',
    'sch.mwf': 'Du · Chor · Ju',
    'sch.tts': 'Se · Pay · Sha',
    'sch.enroll': 'Guruhga yozilish',
    'sch.live': 'Onlayn taqvimni ochish',
    'sch.liveHint': 'Markaz taqvimi avtomatik yangilanadi.',
    'sch.liveTitle': 'Get Study darslarining onlayn taqvimi',
    'sch.none': 'Qulay vaqt topilmadimi? Ariza qoldiring - guruh tanlaymiz.',
    'sch.noneCta': 'Ariza qoldirish',

    'vac.title': 'Vakansiyalar',
    'vac.lead': 'Get Study jamoasiga oʻqituvchilar izlayapmiz',
    'vac.subjects': 'Fanlar',
    'vac.tlangs': 'Dars berish tillari: ingliz, rus, oʻzbek.',
    'vac.req': 'Kimni izlayapmiz',
    'vac.r1': 'Oʻz fanining mutaxassisi, rivojlanishga va dolzarb bilimlarni ulashishga tayyor',
    'vac.r2': 'Murakkab narsani sodda tushuntira oladigan, ruhlantiradigan va oʻquvchilar qiziqishini saqlay oladigan pedagog',
    'vac.r3': 'Kasb etikasiga rioya qiladigan halol va masʼuliyatli inson',
    'vac.r4': 'Turli oʻquvchilar bilan muloqotda sabrli va xushmuomala',
    'vac.r5': 'Tartibli, darslarni rejalashtira oladigan',
    'vac.duties': 'Vazifalar',
    'vac.d1': 'Oʻz fanidan darslar oʻtish',
    'vac.d2': 'Eng yaxshi natija uchun oʻquv jarayonini tashkil etish',
    'vac.d3': 'Oʻquvchilar bilan oʻzaro hurmat va ishonchga asoslangan munosabat qurish',
    'vac.shifts': 'Tanlash uchun ish jadvali',
    'vac.sh.full': 'Toʻliq kun',
    'vac.sh.am': 'Ertalab',
    'vac.sh.day': 'Kunduzi',
    'vac.sh.pm': 'Kechqurun',
    'vac.apply': 'Ariza topshirish',
    'vac.name': 'Ism va familiya',
    'vac.namePh': 'Masalan, Malika Karimova',
    'vac.subject': 'Fan',
    'vac.subjectPh': 'Fanni tanlang',
    'vac.more': 'Oʻzingiz haqingizda (ixtiyoriy)',
    'vac.birth': 'Tugʻilgan sana',
    'vac.edu': 'Maʼlumoti',
    'vac.edu.st': 'Talaba',
    'vac.edu.ba': 'Bakalavr',
    'vac.edu.ma': 'Magistr',
    'vac.shift': 'Qulay ish jadvali',
    'vac.tlang': 'Dars berish tili',
    'vac.tl.en': 'Ingliz',
    'vac.tl.ru': 'Rus',
    'vac.tl.uz': 'Oʻzbek',
    'vac.exp': 'Dars berish tajribangiz bormi?',
    'vac.exp.y': 'Ha',
    'vac.exp.n': 'Yoʻq',
    'vac.self': 'Fan boʻyicha darajangizni 1 dan 5 gacha baholang',
    'vac.letter': 'Motivatsion xat',
    'vac.letterPh': 'Tajribangiz va nega bizda dars bermoqchi ekaningiz haqida qisqacha',
    'vac.submit': 'Arizani yuborish',
    'vac.ok.title': 'Ariza yuborildi!',
    'vac.ok.text': 'Rahmat! Anketani koʻrib chiqib, siz bilan bogʻlanamiz.',
    'vac.tg': 'Yoki Telegramga yozing',
    'vac.err.name': 'Ism va familiyani kiriting',
    'vac.err.subject': 'Fanni tanlang',

    'c.duration': 'Davomiyligi',
    'c.lessons': 'Darslar',
    'c.format': 'Format',
    'c.price': 'Narxi',
    'c.program': 'Kurs dasturi',
    'c.teacher': 'Oʻqituvchi',
    'c.teachers': 'Oʻqituvchilar',
    'c.forWhom': 'Kimlar uchun',
    'c.outcomes': 'Nimalarni oʻrganasiz',
    'c.includes': 'Nimalar kiradi',
    'c.groups': 'Jadvaldagi guruhlar',
    'c.levels': 'Darajalar va taxminiy muddatlar',
    'c.enroll': 'Kursga yozilish',
    'c.ask': 'Narx va yaqin boshlanish sanasini administrator aytib beradi.',
    'c.programs': 'Dasturlar',
    'c.steps': 'Hamkorlik bosqichlari',
    'c.month': 'oy',
    'c.full': 'butun kurs uchun {x} soʻm',

    'toast.preset': '«{x}» yoʻnalishi formada tanlandi',
    'days.mwf': 'Du, Chor, Ju',
    'days.tts': 'Se, Pay, Sha',
    'months': ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    'date.fmt': '{y}-yil, {m}',
    'hero.sticker': '1-dars bepul',
    'ticket.no': 'dars',
    'map.title': 'Sxema: «Novza» metrosidan Get Study gacha yoʻl',
    'map.avenue': 'Bunyodkor sh. koʻch.',
    'map.street': 'Muqimiy koʻch.',
    'map.metro': 'Novza',
    'map.bank': 'Trastbank',
    'map.college': 'Tibbiyot kolleji',
    'map.walk': '≈ 250 m · 3–4 daq',
    'map.note': 'Sxema, masshtabsiz',
    'tile.dt': 'Dt',
    'tile.kt': 'Kt',
    'tile.op': 'Operatsiya',
    'tile.corpCta': 'Oʻqitishni muhokama qilish',
    'extras.label': 'Yana yigʻilmoqda:'
  }
};
