# Get Study - новый сайт (mobile-first)

Откройте `index.html` в браузере - всё работает без сборки и без сервера.

## Структура

- `index.html` - разметка страницы.
- `assets/style.css` - стили. Цвета, шрифты, радиусы - переменные в начале файла (`:root`).
- `assets/data.js` - всё содержимое: настройки, курсы, расписание, отзывы, фото и тексты RU/UZ.
  Наполнение плиток каталога (приветствия на языках, журнал проводок 1С, мини-таблица Excel) - в `GS.TILES`.
- `assets/app.js` - логика (без библиотек).

## Что настроить перед запуском

1. **Приём заявок.** В `assets/data.js` укажите `GS.CONFIG.leadEndpoint` (и `vacancyEndpoint` для откликов) -
   URL обработчика, который принимает `POST` с JSON. Пока поле пустое, сайт работает в демо-режиме:
   заявка не уходит на сервер, а выводится в консоль браузера.
   Поля заявки: `name`, `phone` (+998XXXXXXXXX), `course_id`, `course`, `age`, `level`, `format`, `days`,
   `time`, `group_language`, `comment`, `site_language`, `page`, `created_at`.
2. **Расписание.** Список групп - в `GS.SCHEDULE`. Кнопка «Открыть онлайн-календарь» в окне расписания
   подгружает живой календарь центра (Styled Calendar), он обновляется сам.
3. **Отзывы.** Массив `GS.REVIEWS`: имя, площадка (`google` / `yandex`), дата, оценка, фрагмент текста.
4. **Старые адреса.** Чтобы не потерять переходы со старых ссылок, настройте редиректы:
   `/raspisanie-zanjatij-uchebnogo-centra/` → `/#schedule`, `/job/` → `/#vacancies`,
   `/buhgalterskie-kursy/` → `/#course-accounting`, `/kompyuternye-kursy-v-tashkente/` → `/#course-computer`,
   `/english-courses/` → `/#course-english`, `/korporativnoe-obuchenie/` → `/#course-corporate`.

## Прямые ссылки

`#schedule`, `#vacancies`, `#course-<id>` (например `#course-english`) открывают нужное окно сразу.
Язык можно задать параметром `?lang=uz`.

## Внешние ресурсы

Логотип, фото классов и видео-маршрут подключены прямыми ссылками с getstudy.uz,
шрифты Manrope и Inter - с Google Fonts. Если логотип не загрузится, вместо него покажется текстовый вариант.
