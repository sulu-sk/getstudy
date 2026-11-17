/* =====================================================================
   Get Study - логика страницы (без библиотек).
   Язык RU/UZ, каталог с фильтрами, подстановка курса в форму,
   маска телефона, honeypot, карусели, bottom sheets, шторка меню,
   статус «открыто/закрыто» по времени Ташкента.
   ===================================================================== */
(function () {
  'use strict';

  var GS = window.GS;
  var CONFIG = GS.CONFIG, I18N = GS.I18N, COURSES = GS.COURSES, SCHEDULE = GS.SCHEDULE;
  var REVIEWS = GS.REVIEWS, GALLERY = GS.GALLERY, EXTRAS = GS.EXTRAS, VACANCY = GS.VACANCY;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var mq = function (q) { return window.matchMedia ? window.matchMedia(q).matches : false; };
  var reduceMotion = mq('(prefers-reduced-motion: reduce)');
  var isTouch = mq('(hover: none)');
  var icon = function (name, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; };
  var reflow = function (el) { return el && el.offsetWidth; };

  /* ================= Язык ================= */
  var LANGS = ['ru', 'uz'];
  var lang = (function () {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) { /* старый браузер */ }
    if (LANGS.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem('gs-lang'); if (LANGS.indexOf(s) > -1) return s; } catch (e) { /* storage недоступен */ }
    return 'ru';
  })();

  function t(key, vars) {
    var s = I18N[lang] && I18N[lang][key];
    if (s == null) s = I18N.ru[key];
    if (s == null) { console.warn('[GetStudy] нет перевода:', key); return key; }
    if (vars && typeof s === 'string') s = s.replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ''; });
    return s;
  }
  function L(v) { return (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] != null ? v[lang] : v.ru) : v; }
  function tRu(key) { return I18N.ru[key] != null ? I18N.ru[key] : key; }
  function fmtNum(n) { return new Intl.NumberFormat('ru-RU').format(n).replace(/[   ]/g, ' '); }
  function fmtDate(d) { return t('date.fmt', { y: d[0], m: t('months')[d[1] - 1] }); }

  function allCourses() { return COURSES.concat(EXTRAS, [GS.CONSULT]); }
  function courseTitle(id, lg) {
    var c = allCourses().filter(function (x) { return x.id === id; })[0];
    if (!c) return '';
    return lg ? (c.title[lg] || c.title.ru) : L(c.title);
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', t('meta.desc'));
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html'), { privacy: CONFIG.privacyPdf }); });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); var attr = (p[0] || '').trim(), key = (p[1] || '').trim();
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
    $$('.lang-switch button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    $$('[data-footer-copy]').forEach(function (el) { el.textContent = t('footer.copy', { y: new Date().getFullYear() }); });
  }

  function setLang(next) {
    if (LANGS.indexOf(next) < 0 || next === lang) return;
    lang = next;
    try { localStorage.setItem('gs-lang', lang); } catch (e) { /* ignore */ }
    try {
      var u = new URL(location.href);
      if (u.searchParams.has('lang')) { u.searchParams.set('lang', lang); history.replaceState(history.state, '', u.toString()); }
    } catch (e) { /* ignore */ }
    renderAll();
  }

  /* ================= Каталог: плитки ================= */
  var currentFilter = 'all';
  var TILES = GS.TILES || {};

  function courseById(id) { return COURSES.filter(function (c) { return c.id === id; })[0]; }


  function priceTag(c) {
    var p = c.price || {};
    if (!p.month) return '';
    return '<span class="price-tag"><b>' + fmtNum(p.month) + ' <small>' + esc(t('card.perMonth')) + '</small></b></span>';
  }
  /* Низ плитки: цена (если есть) + «Записаться» и «Подробнее» */
  function foot(c, enrollLabel) {
    return '<div class="tile__foot">' + priceTag(c) +
      '<div class="tile__actions">' +
        '<button type="button" class="btn btn--primary btn--sm" data-enroll="' + c.id + '">' + esc(enrollLabel || t('card.enroll')) + '</button>' +
        '<button type="button" class="link" data-course="' + c.id + '" aria-haspopup="dialog">' + esc(t('card.more')) + icon('arrow-right') + '</button>' +
      '</div></div>';
  }
  function titleHTML(c) {
    return '<h3 class="tile__title">' + esc(L(c.title)) + '</h3><p class="tile__desc">' + esc(L(c.desc)) + '</p>';
  }

  function englishTile(c) {
    var tl = TILES.english || {};
    var heights = [22, 36, 50, 66, 82, 100], levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    return '<article class="tile tile--english" id="card-english" data-cat="lang">' +
      '<div class="english-grid">' +
        '<div class="en-intro"><div class="hello" lang="en" aria-hidden="true">' + esc(tl.hi) + '</div>' + titleHTML(c) + '</div>' +
        '<div class="ladder" aria-hidden="true">' + levels.map(function (l, i) { return '<span data-l="' + l + '" style="--h:' + heights[i] + '%"></span>'; }).join('') + '</div>' +
      '</div>' +
      foot(c) +
    '</article>';
  }

  function ieltsTile(c) {
    return '<article class="tile tile--ielts" id="card-ielts" data-cat="lang">' +
      '<h3 class="big-word">IELTS <span>&amp; TOEFL</span></h3>' +
      '<p class="tile__desc">' + esc(L(c.desc)) + '</p>' +
      '<p class="modules-line">Listening · Reading · Writing · Speaking</p>' +
      foot(c) +
    '</article>';
  }

  function accountingTile(c) {
    var tl = TILES.accounting || {};
    var rows = (tl.ledger || []).map(function (r) {
      return '<div class="ledger__row"><b>' + r.dt + '</b><b>' + r.kt + '</b><span>' + esc(r[lang] || r.ru) + '</span></div>';
    }).join('');
    return '<article class="tile tile--accounting" id="card-accounting" data-cat="acc">' +
      '<div class="acc-grid">' +
        '<div>' + titleHTML(c) + '</div>' +
        '<div class="ledger" aria-hidden="true">' +
          '<div class="ledger__head"><span>' + esc(t('tile.dt')) + '</span><span>' + esc(t('tile.kt')) + '</span><span>' + esc(t('tile.op')) + '</span></div>' + rows + '</div>' +
      '</div>' +
      foot(c) +
    '</article>';
  }

  function computerTile(c) {
    var tl = TILES.computer || {}, sh = tl.sheet;
    var grid = '';
    if (sh) {
      var rows = L(sh.rows), tot = L(sh.total);
      grid = '<span class="h"></span><span class="h">A</span><span class="h">B</span><span class="h"></span>' +
        rows.map(function (r, i) {
          return '<span class="h">' + (i + 1) + '</span><span>' + esc(r[0]) + '</span><span class="n">' + esc(r[1]) + '</span><span class="bar"><i style="--w:' + r[2] + '%"></i></span>';
        }).join('') +
        '<span class="h">' + (rows.length + 1) + '</span><span><b>' + esc(tot[0]) + '</b></span><span class="n sel">' + esc(tot[1]) + '</span><span class="bar"></span>';
    }
    return '<article class="tile tile--computer" id="card-computer" data-cat="pc">' +
      '<div class="pc-grid">' +
        (sh ? '<div class="sheet-mock" aria-hidden="true"><div class="sheet-mock__fx"><b>fx</b><span>' + esc(L(sh.formula)) + '</span></div><div class="sheet-mock__grid">' + grid + '</div></div>' : '') +
        '<div>' + titleHTML(c) + '</div>' +
      '</div>' +
      foot(c) +
    '</article>';
  }

  /* Небольшие плитки языков: вся плитка открывает карточку курса */
  function hiTile(c) {
    var tl = TILES[c.id] || {};
    return '<article class="tile tile--hi st-' + (tl.tint || 'yellow') + '" id="card-' + c.id + '" data-cat="lang">' +
      '<div class="hi-word' + (tl.long ? ' hi-word--long' : '') + '" lang="' + esc(tl.lang || '') + '" aria-hidden="true">' + esc(tl.hi || c.code) + '</div>' +
      '<div class="hi-row"><h3><button type="button" class="stretch" data-course="' + c.id + '" aria-haspopup="dialog">' + esc(L(c.title)) + '&nbsp;' + icon('arrow-right', 'hi-arrow') + '</button></h3>' +
      '<span class="hi-go" aria-hidden="true">' + icon('arrow-right') + '</span></div>' +
    '</article>';
  }

  function corporateTile(c) {
    return '<article class="tile tile--corporate" id="card-corporate" data-cat="corp">' +
      '<div class="corp-row">' +
        '<div>' + titleHTML(c) + '</div>' +
        '<div class="tile__actions">' +
          '<button type="button" class="btn btn--primary btn--sm" data-enroll="corporate">' + esc(t('tile.corpCta')) + '</button>' +
          '<button type="button" class="link" data-course="corporate" aria-haspopup="dialog">' + esc(t('card.more')) + icon('arrow-right') + '</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function tileHTML(c) {
    if (c.id === 'english') return englishTile(c);
    if (c.id === 'ielts') return ieltsTile(c);
    if (c.id === 'accounting') return accountingTile(c);
    if (c.id === 'computer') return computerTile(c);
    if (c.id === 'corporate') return corporateTile(c);
    return hiTile(c);
  }

  /* Порядок плиток: языки, затем бухгалтерия и Excel, затем компании */
  var TILE_ORDER = ['english', 'ielts', 'accounting', 'computer', 'uzbek', 'russian', 'german', 'french', 'chinese', 'korean', 'corporate'];

  function renderCatalog() {
    var grid = $('#courseGrid'); if (!grid) return;
    grid.innerHTML = TILE_ORDER.map(courseById).filter(Boolean).map(tileHTML).join('');
    var ex = $('#extras');
    if (ex) {
      ex.innerHTML = '<b>' + esc(t('extras.label')) + '</b> ' + EXTRAS.map(function (x) {
        return '<button type="button" data-enroll="' + x.id + '">' + esc(L(x.title)) + '</button>';
      }).join('');
    }
    applyFilter(currentFilter, false);
  }

  function applyFilter(f, animate) {
    currentFilter = f;
    var grid = $('#courseGrid'); if (!grid) return;
    grid.setAttribute('data-filter', f);
    $$('.tab').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === f)); });
    $$('#courseGrid > .tile').forEach(function (tile) {
      var show = f === 'all' || tile.getAttribute('data-cat') === f;
      tile.hidden = !show;
      if (show && animate !== false && !reduceMotion) { tile.classList.remove('is-enter'); reflow(tile); tile.classList.add('is-enter'); }
    });
    var ex = $('#extras'); if (ex) ex.hidden = !(f === 'all' || f === 'lang');
    if (animate === false) return;
    var active = $('.tab[aria-pressed="true"]');
    if (active) {
      var bar = active.parentElement;
      bar.scrollTo({ left: Math.max(0, active.offsetLeft - (bar.clientWidth - active.clientWidth) / 2), behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    /* Если вкладки «прилипли» к шапке, возвращаемся к началу списка */
    var tabs = $('.tabs-wrap');
    var limit = tabs ? tabs.getBoundingClientRect().bottom : 0;
    var top = grid.getBoundingClientRect().top;
    if (top < limit - 1) window.scrollTo({ top: window.scrollY + top - limit - 8, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function quick(target) {
    if (drawer && drawer.classList.contains('is-open')) {
      closeDrawer(false);
      setTimeout(function () { quick(target); }, reduceMotion ? 0 : 60);
      return;
    }
    var map = { english: ['lang', 'english'], ielts: ['lang', 'ielts'], computer: ['pc', 'computer'], accounting: ['acc', 'accounting'], corporate: ['corp', 'corporate'], lang: ['lang', null] };
    var m = map[target] || ['all', null];
    applyFilter(m[0], false);
    $$('#courseGrid > .tile:not([hidden])').forEach(function (tile) { tile.classList.remove('is-enter'); reflow(tile); tile.classList.add('is-enter'); });
    scrollToId('courses');
    if (m[1]) {
      var card = $('#card-' + m[1]);
      if (card) setTimeout(function () { card.classList.remove('is-flash'); reflow(card); card.classList.add('is-flash'); }, reduceMotion ? 0 : 650);
    }
  }

  /* ================= Отзывы и фото ================= */
  function renderReviews() {
    var track = $('#reviewsTrack'); if (!track) return;
    track.innerHTML = REVIEWS.map(function (r) {
      var url = r.src === 'yandex' ? CONFIG.yandexReviews : CONFIG.googleReviews;
      var stars = r.stars ? '<div class="note__stars" role="img" aria-label="' + esc(t('reviews.rating', { n: r.stars })) + '">' +
        new Array(r.stars + 1).join('<svg aria-hidden="true"><use href="#i-star"/></svg>') + '</div>' : '';
      return '<article class="note">' + stars +
        '<blockquote lang="' + esc(r.lang || '') + '">' + esc(r.text) + '</blockquote>' +
        '<p class="note__by"><b>' + esc(r.name) + '</b>' +
        '<a href="' + esc(url) + '" target="_blank" rel="noopener" title="' + esc(t('reviews.readFull')) + '">' + esc(t('src.' + r.src)) + ' · ' + esc(fmtDate(r.date)) + icon('external') + '</a></p>' +
      '</article>';
    }).join('');
    var c = track.closest('[data-carousel]'); if (c && c._update) c._update();
  }

  function renderGallery() {
    var track = $('#galleryTrack'); if (!track) return;
    if (!$('figure.print', track)) {
      track.insertAdjacentHTML('beforeend', GALLERY.map(function (src, i) {
        return '<figure class="print"><div class="shot"><img src="' + esc(src) + '" alt="" width="1024" height="768" loading="lazy" decoding="async" data-n="' + (i + 1) + '"></div></figure>';
      }).join(''));
      $$('figure img', track).forEach(function (img) {
        img.addEventListener('error', function () { img.closest('.print').classList.add('is-broken'); });
      });
    }
    $$('figure img', track).forEach(function (img) { img.alt = t('gallery.alt', { n: img.getAttribute('data-n') }); });
    var c = track.closest('[data-carousel]'); if (c && c._update) c._update();
  }

  /* ================= Карусели ================= */
  function initCarousel(root) {
    var track = $('.carousel__track', root), prev = $('[data-prev]', root), next = $('[data-next]', root), thumb = $('.progress span', root);
    if (!track) return;
    var step = function () {
      var item = track.firstElementChild; if (!item) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return item.getBoundingClientRect().width + gap;
    };
    var go = function (dir) { track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' }); };
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      var ratio = track.scrollWidth ? Math.min(1, track.clientWidth / track.scrollWidth) : 1;
      var pos = max > 0 ? track.scrollLeft / max : 0;
      if (thumb) {
        thumb.style.width = (ratio * 100).toFixed(2) + '%';
        thumb.style.transform = 'translateX(' + (pos * (1 / ratio - 1) * 100).toFixed(2) + '%)';
      }
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max - 2;
      root.classList.toggle('is-static', max <= 2);
    };
    var raf = 0;
    track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });
    root._update = update;
    update();
  }

  /* ================= Прокрутка, блокировка, фокус ================= */
  /* Мгновенно показывает «появляющиеся» блоки, чтобы их сдвиг не сбивал точку прокрутки */
  function revealNow(el) {
    if (!el) return;
    var list = [];
    for (var p = el; p && p.classList; p = p.parentElement) if (p.classList.contains('reveal')) list.push(p);
    list.concat($$('.reveal', el)).forEach(function (r) {
      if (r.classList.contains('is-visible')) return;
      r.style.transition = 'none'; r.classList.add('is-visible'); reflow(r); r.style.transition = '';
    });
  }
  function scrollToId(id) {
    var el = document.getElementById(id); if (!el) return;
    revealNow(el);
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  var lockCount = 0;
  function lockScroll(on) {
    lockCount = Math.max(0, lockCount + (on ? 1 : -1));
    document.documentElement.classList.toggle('is-locked', lockCount > 0);
  }

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
  function trapFocus(container, e) {
    var items = $$(FOCUSABLE, container).filter(function (el) { return el.offsetParent !== null && !el.closest('.hp'); });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ================= Шторка меню ================= */
  var drawer, burger, drawerLastFocus = null, drawerTimer = 0;
  function openDrawer() {
    if (!drawer || !drawer.hidden) return;
    clearTimeout(drawerTimer);
    drawerLastFocus = document.activeElement;
    drawer.hidden = false; reflow(drawer);
    drawer.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    lockScroll(true);
    setTimeout(function () { var c = $('.drawer__close', drawer); if (c) c.focus(); }, 60);
  }
  function closeDrawer(restoreFocus) {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    lockScroll(false);
    drawerTimer = setTimeout(function () { drawer.hidden = true; }, reduceMotion ? 0 : 340);
    if (restoreFocus !== false && drawerLastFocus && drawerLastFocus.focus) drawerLastFocus.focus({ preventScroll: true });
  }

  /* ================= Bottom sheet ================= */
  var sheet, sheetPanel, sheetBody, sheetTitle, sheetSub, sheetFoot;
  var sheetState = null, sheetPushed = false, sheetLastFocus = null, sheetTimer = 0, ignorePop = null, schedTab = null;

  function sheetHash(type, data) { return '#' + (type === 'course' ? 'course-' + data.id : type); }
  function parseHash(h) {
    h = (h || '').replace(/^#/, '');
    if (h === 'schedule' || h === 'vacancies') return { type: h, data: {} };
    var m = /^course-([\w-]+)$/.exec(h);
    if (m && COURSES.some(function (c) { return c.id === m[1]; })) return { type: 'course', data: { id: m[1] } };
    return null;
  }

  function openSheet(type, data, opts) {
    data = data || {}; opts = opts || {};
    if (drawer && !drawer.hidden) closeDrawer(false);
    var wasOpen = !!sheetState;
    sheetState = { type: type, data: data };
    clearTimeout(sheetTimer);
    renderSheet();
    if (!wasOpen) {
      sheetLastFocus = document.activeElement;
      sheet.hidden = false; reflow(sheet);
      sheet.classList.add('is-open');
      lockScroll(true);
      setTimeout(function () { sheetPanel.focus({ preventScroll: true }); }, 40);
    }
    sheetBody.scrollTop = 0;
    if (opts.push !== false) {
      try {
        if (wasOpen && sheetPushed) history.replaceState({ gsSheet: type, data: data }, '', sheetHash(type, data));
        else { history.pushState({ gsSheet: type, data: data }, '', sheetHash(type, data)); sheetPushed = true; }
      } catch (e) { /* file:// в некоторых браузерах */ }
    }
  }

  function closeSheet(opts) {
    opts = opts || {};
    if (!sheetState) return Promise.resolve();
    sheetState = null;
    sheet.classList.remove('is-open');
    sheetPanel.style.transform = '';
    lockScroll(false);
    var done = new Promise(function (res) {
      sheetTimer = setTimeout(function () {
        if (!sheetState) { sheet.hidden = true; sheetBody.innerHTML = ''; sheetFoot.innerHTML = ''; }
        res();
      }, reduceMotion ? 0 : 360);
    });
    var hist = Promise.resolve();
    if (!opts.fromPop) {
      if (sheetPushed) {
        sheetPushed = false;
        hist = new Promise(function (res) {
          ignorePop = res;
          try { history.back(); } catch (e) { res(); }
          setTimeout(function () { if (ignorePop === res) { ignorePop = null; res(); } }, 450);
        });
      } else if (parseHash(location.hash)) {
        try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignore */ }
      }
    } else {
      sheetPushed = false;
    }
    if (sheetLastFocus && sheetLastFocus.focus && document.contains(sheetLastFocus)) sheetLastFocus.focus({ preventScroll: true });
    return Promise.all([done, hist]);
  }

  function renderSheet() {
    if (!sheetState) return;
    sheetFoot.innerHTML = ''; sheetFoot.hidden = true;
    var type = sheetState.type, data = sheetState.data;
    if (type === 'schedule') renderScheduleSheet();
    else if (type === 'vacancies') renderVacancySheet();
    else if (type === 'course') renderCourseSheet(data.id);
  }

  /* ----- Расписание ----- */
  function slotHTML(s) {
    var title = L(s.title);
    return '<li class="slot">' +
      '<div class="slot__time">' + esc(s.from) + '<small>' + esc(s.to) + '</small></div>' +
      '<div class="slot__info"><div class="slot__title">' + esc(title) + '</div>' +
        (s.teacher ? '<div class="slot__meta">' + esc(s.teacher) + '</div>' : '') +
        (s.days ? '<span class="slot__days">' + esc(L(s.days)) + '</span>' : '') +
      '</div>' +
      '<button type="button" class="slot__btn" data-enroll="' + esc(s.course) + '" aria-label="' + esc(t('sch.enroll') + ': ' + title + ', ' + s.from) + '">' + icon('plus') + '<span>' + esc(t('card.enroll')) + '</span></button>' +
    '</li>';
  }
  function renderSlots() {
    var list = $('#panel-sched', sheetBody); if (!list) return;
    list.innerHTML = SCHEDULE[schedTab].map(slotHTML).join('');
    list.setAttribute('aria-labelledby', 'tab-' + schedTab);
    $$('.seg-tabs [role="tab"]', sheetBody).forEach(function (b) {
      var on = b.getAttribute('data-tab') === schedTab;
      b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
    });
  }
  function renderScheduleSheet() {
    if (!schedTab) { var d = tashkentNow().getDay(); schedTab = (d === 2 || d === 4 || d === 6) ? 'tts' : 'mwf'; }
    sheetTitle.textContent = t('sch.title');
    sheetSub.textContent = t('sch.lead', { date: L(SCHEDULE.updated) });
    var liveOpen = !!$('.live-cal__frame iframe', sheetBody);
    sheetBody.innerHTML =
      '<div class="seg-tabs" role="tablist" aria-label="' + esc(t('sch.title')) + '">' +
        ['mwf', 'tts'].map(function (k) {
          return '<button type="button" role="tab" id="tab-' + k + '" aria-controls="panel-sched" data-tab="' + k + '">' + esc(t('sch.' + k)) + '</button>';
        }).join('') +
      '</div>' +
      '<ul class="slots" id="panel-sched" role="tabpanel"></ul>' +
      '<div class="live-cal">' +
        '<button type="button" class="btn btn--outline btn--block" data-live-cal>' + icon('calendar') + '<span>' + esc(t('sch.live')) + '</span></button>' +
        '<p class="hint">' + esc(t('sch.liveHint')) + '</p>' +
        '<div class="live-cal__frame" hidden></div>' +
      '</div>';
    renderSlots();
    if (liveOpen) openLiveCalendar();
    sheetFoot.hidden = false;
    sheetFoot.innerHTML = '<div class="sheet-cta sheet-cta--stack"><span>' + esc(t('sch.none')) + '</span>' +
      '<button type="button" class="btn btn--primary btn--block" data-enroll="">' + esc(t('sch.noneCta')) + '</button></div>';
  }
  function openLiveCalendar() {
    var box = $('.live-cal__frame', sheetBody); if (!box) return;
    if (!box.firstChild) {
      box.innerHTML = '<iframe src="' + esc(CONFIG.calendarEmbed) + '" title="' + esc(t('sch.liveTitle')) + '" loading="lazy"></iframe>';
    }
    box.hidden = false;
    var btn = $('[data-live-cal]', sheetBody); if (btn) btn.hidden = true;
  }

  /* ----- Вакансии ----- */
  function radios(name, keys, prefix) {
    return '<div class="seg">' + keys.map(function (k) {
      var id = 'v-' + name + '-' + k;
      return '<input type="radio" id="' + id + '" name="' + name + '" value="' + k + '"><label for="' + id + '">' + esc(t(prefix + k)) + '</label>';
    }).join('') + '</div>';
  }
  function renderVacancySheet() {
    var snap = snapshotForm($('#vacForm'));
    var wasDone = $('#vacSuccess') && !$('#vacSuccess').hidden;
    sheetTitle.textContent = t('vac.title');
    sheetSub.textContent = t('vac.lead');
    var subjOpts = '<option value="" disabled selected>' + esc(t('vac.subjectPh')) + '</option>' +
      VACANCY.subjects.map(function (s) { return '<option value="' + s.id + '">' + esc(s[lang] || s.ru) + '</option>'; }).join('');
    var shiftOpts = VACANCY.shifts.map(function (s) {
      return '<input type="radio" id="v-shift-' + s.k + '" name="shift" value="' + s.k + '"><label for="v-shift-' + s.k + '">' + esc(t('vac.sh.' + s.k)) + ' ' + s.time + '</label>';
    }).join('');
    sheetBody.innerHTML =
      '<h3 class="sheet-h">' + esc(t('vac.subjects')) + '</h3>' +
      '<ul class="chips-list">' + VACANCY.subjects.map(function (s) { return '<li>' + esc(s[lang] || s.ru) + '</li>'; }).join('') + '</ul>' +
      '<p class="hint">' + esc(t('vac.tlangs')) + '</p>' +
      '<h3 class="sheet-h">' + esc(t('vac.req')) + '</h3>' +
      '<ul class="checks">' + [1, 2, 3, 4, 5].map(function (n) { return '<li>' + icon('check') + '<span>' + esc(t('vac.r' + n)) + '</span></li>'; }).join('') + '</ul>' +
      '<h3 class="sheet-h">' + esc(t('vac.duties')) + '</h3>' +
      '<ul class="dots">' + [1, 2, 3].map(function (n) { return '<li>' + esc(t('vac.d' + n)) + '</li>'; }).join('') + '</ul>' +
      '<h3 class="sheet-h">' + esc(t('vac.shifts')) + '</h3>' +
      '<div class="shifts">' + VACANCY.shifts.map(function (s) { return '<div class="shift"><b>' + esc(t('vac.sh.' + s.k)) + '</b><span>' + s.time + '</span></div>'; }).join('') + '</div>' +
      '<div class="apply-card" id="apply">' +
        '<h3>' + esc(t('vac.apply')) + '</h3>' +
        '<form id="vacForm" novalidate>' +
          '<div class="field"><label for="v-name">' + esc(t('vac.name')) + '</label>' +
            '<input class="input" id="v-name" name="name" type="text" autocomplete="name" maxlength="80" placeholder="' + esc(t('vac.namePh')) + '" aria-describedby="v-name-err">' +
            '<p class="field__error" id="v-name-err">' + esc(t('vac.err.name')) + '</p></div>' +
          '<div class="field"><label for="v-phone">' + esc(t('form.phone')) + '</label>' +
            '<div class="phone-field"><span class="phone-prefix" aria-hidden="true">+998</span><input class="input" id="v-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="(90) 123-45-67" aria-describedby="v-phone-err"></div>' +
            '<p class="field__error" id="v-phone-err">' + esc(t('form.err.phone')) + '</p></div>' +
          '<div class="field"><label for="v-subject">' + esc(t('vac.subject')) + '</label>' +
            '<select class="select" id="v-subject" name="subject" required aria-describedby="v-subject-err">' + subjOpts + '</select>' +
            '<p class="field__error" id="v-subject-err">' + esc(t('vac.err.subject')) + '</p></div>' +
          '<details class="more"><summary><span>' + esc(t('vac.more')) + '</span>' + icon('chevron-down') + '</summary><div class="more__body">' +
            '<div class="field"><label for="v-birth">' + esc(t('vac.birth')) + '</label><input class="input input--short" id="v-birth" name="birth" type="date" style="max-width:220px"></div>' +
            '<fieldset class="field"><legend>' + esc(t('vac.edu')) + '</legend>' + radios('edu', ['st', 'ba', 'ma'], 'vac.edu.') + '</fieldset>' +
            '<fieldset class="field"><legend>' + esc(t('vac.shift')) + '</legend><div class="seg">' + shiftOpts + '</div></fieldset>' +
            '<fieldset class="field"><legend>' + esc(t('vac.tlang')) + '</legend>' + radios('tlang', ['en', 'ru', 'uz'], 'vac.tl.') + '</fieldset>' +
            '<fieldset class="field"><legend>' + esc(t('vac.exp')) + '</legend>' + radios('exp', ['y', 'n'], 'vac.exp.') + '</fieldset>' +
            '<fieldset class="field"><legend>' + esc(t('vac.self')) + '</legend><div class="seg">' + [1, 2, 3, 4, 5].map(function (n) {
              return '<input type="radio" id="v-self-' + n + '" name="self" value="' + n + '"><label for="v-self-' + n + '" style="min-width:44px;justify-content:center">' + n + '</label>';
            }).join('') + '</div></fieldset>' +
            '<div class="field"><label for="v-letter">' + esc(t('vac.letter')) + '</label><textarea class="textarea" id="v-letter" name="letter" rows="4" maxlength="1500" placeholder="' + esc(t('vac.letterPh')) + '"></textarea></div>' +
          '</div></details>' +
          '<div class="hp" aria-hidden="true"><label for="v-extra">' + esc(t('form.hp')) + '</label><input id="v-extra" name="gs_extra" type="text" tabindex="-1" autocomplete="off"></div>' +
          '<p class="form-error" role="alert" hidden></p>' +
          '<button class="btn btn--primary btn--lg btn--block" type="submit"><span>' + esc(t('vac.submit')) + '</span><span class="spinner" aria-hidden="true"></span></button>' +
          '<p class="consent">' + t('form.consent', { privacy: CONFIG.privacyPdf }) + '</p>' +
        '</form>' +
        '<div class="form-success" id="vacSuccess" hidden tabindex="-1" role="status">' +
          '<div class="form-success__icon">' + icon('check') + '</div><h3>' + esc(t('vac.ok.title')) + '</h3><p>' + esc(t('vac.ok.text')) + '</p>' +
        '</div>' +
        '<div class="tg-alt"><a class="link-arrow" href="' + esc(CONFIG.telegram) + '" target="_blank" rel="noopener">' + icon('send') + '<span>' + esc(t('vac.tg')) + '</span></a></div>' +
      '</div>';
    var form = $('#vacForm', sheetBody);
    initPhone($('#v-phone', form));
    restoreForm(form, snap);
    form.addEventListener('submit', onVacancySubmit);
    form.addEventListener('input', function (e) { clearFieldError(e.target); });
    form.addEventListener('change', function (e) { clearFieldError(e.target); });
    form._t0 = form._t0 || Date.now();
    if (wasDone) { form.hidden = true; $('#vacSuccess', sheetBody).hidden = false; }
  }

  /* ----- Карточка курса ----- */
  function listBlock(titleKey, items, cls) {
    if (!items || !items.length) return '';
    var body = cls === 'checks'
      ? '<ul class="checks">' + items.map(function (i) { return '<li>' + icon('check') + '<span>' + esc(i) + '</span></li>'; }).join('') + '</ul>'
      : '<ul class="dots">' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
    return '<h3 class="sheet-h">' + esc(t(titleKey)) + '</h3>' + body;
  }
  function lessonsHTML(list, counter) {
    return '<ul class="lessons">' + L(list).map(function (l) {
      counter.n += 1;
      return '<li><span>' + counter.n + '.</span><span>' + esc(l) + '</span></li>';
    }).join('') + '</ul>';
  }
  function programHTML(program) {
    var counter = { n: 0 };
    return '<h3 class="sheet-h">' + esc(t('c.program')) + '</h3><div class="program">' + program.map(function (item, i) {
      var parts = L(item.title).split('. ');
      var badge = parts.length > 1 ? parts.shift() : '';
      var title = parts.join('. ');
      var body = item.weeks
        ? item.weeks.map(function (w) { return '<div class="program__week"><h5>' + esc(L(w.title)) + '</h5>' + lessonsHTML(w.lessons, counter) + '</div>'; }).join('')
        : lessonsHTML(item.lessons, counter);
      return '<details' + (i === 0 ? ' open' : '') + '><summary>' + (badge ? '<span class="program__badge">' + esc(badge) + '</span>' : '') +
        '<span>' + esc(title) + '</span>' + icon('chevron-down', 'chev') + '</summary><div class="program__body">' + body + '</div></details>';
    }).join('') + '</div>';
  }
  function teachersHTML(list) {
    return '<h3 class="sheet-h">' + esc(t(list.length > 1 ? 'c.teachers' : 'c.teacher')) + '</h3><div class="teachers">' + list.map(function (p) {
      var name = L(p.name);
      var initial = String(name).replace(/^(Mr|Ms|Mrs|Mis)\.\s*/, '').charAt(0);
      var photo = p.photo
        ? '<img src="' + esc(p.photo) + '" alt="" loading="lazy" onerror="this.remove()">'
        : '';
      return '<div class="teacher"><span class="avatar" aria-hidden="true">' + esc(initial) + photo + '</span>' +
        '<div><b>' + esc(name) + '</b><p>' + esc(L(p.role)) + '</p></div></div>';
    }).join('') + '</div>';
  }
  function priceMini(c) {
    var p = c.price || {};
    if (p.month) return '<div class="sheet-cta__price"><b>' + fmtNum(p.month) + ' <span style="white-space:nowrap">' + esc(t('card.perMonth')) + '</span></b>' + (p.total ? '<span>' + esc(t('c.full', { x: fmtNum(p.total) })) + '</span>' : '') + '</div>';
    return '<div class="sheet-cta__price"><b style="font-size:1rem">' + esc(t(p.contract ? 'card.contract' : 'card.onRequest')) + '</b><span>' + esc(t('card.trial')) + '</span></div>';
  }
  function renderCourseSheet(id) {
    var c = COURSES.filter(function (x) { return x.id === id; })[0];
    if (!c) { closeSheet(); return; }
    var d = c.details || {};
    sheetTitle.textContent = L(c.title);
    sheetSub.textContent = L(d.subtitle || c.desc);
    var html = '';
    if (d.facts) html += '<dl class="facts">' + d.facts.map(function (f) { return '<div class="fact"><dt>' + esc(t('c.' + f.k)) + '</dt><dd>' + esc(L(f.v)) + '</dd></div>'; }).join('') + '</dl>';
    if (d.text) html += '<p class="sheet-text">' + esc(L(d.text)) + '</p>';
    if (d.programsList) html += listBlock('c.programs', L(d.programsList), 'checks');
    if (d.steps) html += '<h3 class="sheet-h">' + esc(t('c.steps')) + '</h3><ol class="route-steps">' + d.steps.map(function (s) {
      return '<li><b>' + esc(t(s.t)) + '.</b> ' + esc(t(s.d)) + '</li>';
    }).join('') + '</ol>';
    if (d.levels) html += '<h3 class="sheet-h">' + esc(t('c.levels')) + '</h3><ul class="levels">' + d.levels.map(function (l) {
      return '<li><b>' + esc(l.name) + '</b><span>' + esc(L(l.time)) + '</span></li>';
    }).join('') + '</ul>';
    if (d.forWhom) html += listBlock('c.forWhom', L(d.forWhom));
    if (d.outcomes) html += listBlock('c.outcomes', L(d.outcomes), 'checks');
    if (d.program) html += programHTML(d.program);
    var groups = SCHEDULE.mwf.map(function (s) { return Object.assign({ k: 'mwf' }, s); })
      .concat(SCHEDULE.tts.map(function (s) { return Object.assign({ k: 'tts' }, s); }))
      .filter(function (s) { return s.course === id; });
    if (groups.length) {
      html += '<h3 class="sheet-h">' + esc(t('c.groups')) + '</h3><ul class="mini-slots">' + groups.map(function (g) {
        return '<li><b>' + esc(g.from) + '–' + esc(g.to) + '</b> · ' + esc(L(g.title)) + ' · <em>' + esc(g.days ? L(g.days) : t('days.' + g.k)) + '</em>' + (g.teacher ? ' · ' + esc(g.teacher) : '') + '</li>';
      }).join('') + '</ul>';
    }
    if (d.teachers) html += teachersHTML(d.teachers);
    if (d.includes) html += listBlock('c.includes', L(d.includes), 'checks');
    if (!(c.price && (c.price.month || c.price.contract))) html += '<p class="hint">' + esc(t('c.ask')) + '</p>';
    sheetBody.innerHTML = html;
    sheetFoot.hidden = false;
    sheetFoot.innerHTML = '<div class="sheet-cta">' + priceMini(c) + '<button type="button" class="btn btn--primary" data-enroll="' + c.id + '">' + esc(t('c.enroll')) + '</button></div>';
  }

  /* ================= Перетаскивание шторки вниз ================= */
  function initSheetDrag() {
    var startY = 0, dy = 0, startT = 0, dragging = false;
    var down = function (e) {
      if (window.innerWidth >= 768 || !sheetState) return;
      if (e.target.closest('button, a, input, select, textarea')) return;
      dragging = true; startY = e.clientY; dy = 0; startT = Date.now();
      sheet.classList.add('is-dragging');
      if (e.currentTarget.setPointerCapture) { try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } }
    };
    var move = function (e) {
      if (!dragging) return;
      dy = Math.max(0, e.clientY - startY);
      sheetPanel.style.transform = 'translateY(' + dy + 'px)';
    };
    var up = function () {
      if (!dragging) return;
      dragging = false;
      var v = dy / Math.max(1, Date.now() - startT);
      sheet.classList.remove('is-dragging');
      if (dy > 110 || (dy > 30 && v > 0.6)) closeSheet();
      else sheetPanel.style.transform = '';
    };
    [$('.sheet__grab', sheet), $('.sheet__head', sheet)].forEach(function (el) {
      if (!el) return;
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
  }

  /* ================= Маска телефона +998 (XX) XXX-XX-XX ================= */
  function fmtPhone(d) {
    if (!d) return '';
    var s = '(' + d.slice(0, 2);
    if (d.length > 2) s += ') ' + d.slice(2, 5);
    if (d.length > 5) s += '-' + d.slice(5, 7);
    if (d.length > 7) s += '-' + d.slice(7, 9);
    return s;
  }
  function initPhone(el) {
    if (!el || el._phone) return;
    el._phone = true;
    el.dataset.digits = '';
    el.addEventListener('keydown', function (e) {
      if (e.key !== 'Backspace' || el.selectionStart !== el.selectionEnd) return;
      var p = el.selectionStart, v = el.value;
      if (p > 0 && /\D/.test(v.charAt(p - 1))) {
        var q = p; while (q > 0 && /\D/.test(v.charAt(q - 1))) q--;
        if (q > 0) {
          e.preventDefault();
          el.value = v.slice(0, q - 1) + v.slice(p);
          el.setSelectionRange(q - 1, q - 1);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });
    el.addEventListener('input', function (e) {
      var raw = el.value;
      var pos = el.selectionStart == null ? raw.length : el.selectionStart;
      var d = raw.replace(/\D/g, '');
      var strip = 0;
      if (d.length > 9 && d.indexOf('998') === 0) { d = d.slice(3); strip = 3; }
      d = d.slice(0, 9);
      var before = Math.max(0, Math.min(d.length, raw.slice(0, pos).replace(/\D/g, '').length - strip));
      var prev = el.dataset.digits || '';
      if (e.inputType === 'deleteContentBackward' && d === prev && before > 0) {
        d = d.slice(0, before - 1) + d.slice(before); before -= 1;
      }
      el.dataset.digits = d;
      el.value = fmtPhone(d);
      if (document.activeElement === el) {
        var v = el.value, i = 0, count = 0;
        if (before <= 0) i = v.charAt(0) === '(' ? 1 : 0;
        else { for (i = 0; i < v.length; i++) { if (/\d/.test(v.charAt(i))) { count++; if (count === before) { i++; break; } } } }
        try { el.setSelectionRange(i, i); } catch (err) { /* ignore */ }
      }
    });
    el.addEventListener('paste', function () { setTimeout(function () { el.dispatchEvent(new Event('input', { bubbles: true })); }, 0); });
  }

  /* ================= Формы ================= */
  function snapshotForm(form) {
    if (!form) return null;
    var out = {};
    $$('input, select, textarea', form).forEach(function (el) {
      if (!el.name) return;
      if (el.type === 'radio') { if (el.checked) out[el.name] = el.value; }
      else out[el.name] = el.value;
    });
    var det = $('details', form); out.__open = det ? det.open : false;
    out.__digits = ($('input[type="tel"]', form) || {}).dataset ? $('input[type="tel"]', form).dataset.digits : '';
    return out;
  }
  function restoreForm(form, snap) {
    if (!form || !snap) return;
    $$('input, select, textarea', form).forEach(function (el) {
      if (!el.name || snap[el.name] == null) return;
      if (el.type === 'radio') el.checked = el.value === snap[el.name];
      else if (el.type === 'tel') { el.dataset.digits = snap.__digits || ''; el.value = fmtPhone(snap.__digits || ''); }
      else el.value = snap[el.name];
    });
    var det = $('details', form); if (det) det.open = !!snap.__open;
  }
  function setInvalid(el, bad) {
    var f = el.closest('.field'); if (!f) return;
    f.classList.toggle('is-invalid', bad);
    el.setAttribute('aria-invalid', String(bad));
  }
  function clearFieldError(el) {
    if (!el || !el.closest) return;
    var f = el.closest('.field');
    if (f && f.classList.contains('is-invalid')) {
      var ok = el.type === 'tel' ? (el.dataset.digits || '').length === 9 : !!String(el.value).trim();
      if (ok) setInvalid(el, false);
    }
  }
  function setBusy(form, on) {
    var btn = $('button[type="submit"]', form);
    if (btn) { btn.classList.toggle('is-busy', on); btn.setAttribute('aria-busy', String(on)); }
    form.classList.toggle('is-sending', on);
  }
  function send(endpoint, payload) {
    if (!endpoint) {
      console.info('[GetStudy] Демо-режим: заявка не отправлена на сервер. Укажите GS.CONFIG.leadEndpoint / vacancyEndpoint.', payload);
      return new Promise(function (res) { setTimeout(function () { res({ demo: true }); }, 700); });
    }
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return { demo: false };
    }, function (err) { clearTimeout(timer); throw err; });
  }
  function isSpam(form) {
    var hp = $('[name="gs_extra"]', form);
    var tooFast = Date.now() - (form._t0 || 0) < 2500;
    return (hp && hp.value) || tooFast;
  }

  /* ----- Заявка на урок ----- */
  var leadForm, leadSuccess, lastLeadName = '', lastLeadDemo = false;

  function fillCourseSelect() {
    var sel = $('#f-course'); if (!sel) return;
    var val = sel.value;
    var opt = function (c) { return '<option value="' + c.id + '">' + esc(L(c.title)) + '</option>'; };
    sel.innerHTML = '<option value="" disabled' + (val ? '' : ' selected') + '>' + esc(t('form.coursePh')) + '</option>' +
      '<optgroup label="' + esc(t('form.og.lang')) + '">' + COURSES.filter(function (c) { return c.cat === 'lang'; }).map(opt).join('') + '</optgroup>' +
      '<optgroup label="' + esc(t('form.og.skills')) + '">' + COURSES.filter(function (c) { return c.cat === 'pc' || c.cat === 'acc'; }).map(opt).join('') + '</optgroup>' +
      '<optgroup label="' + esc(t('form.og.corp')) + '">' + COURSES.filter(function (c) { return c.cat === 'corp'; }).map(opt).join('') + '</optgroup>' +
      '<optgroup label="' + esc(t('form.og.other')) + '">' + EXTRAS.map(opt).join('') + opt(GS.CONSULT) + '</optgroup>';
    if (val) sel.value = val;
    updatePresetNote();
  }
  var presetId = '';
  function updatePresetNote() {
    var note = $('#presetNote'); if (!note) return;
    if (!presetId || $('#f-course').value !== presetId) { note.hidden = true; return; }
    $('span', note).textContent = t('form.preset', { x: courseTitle(presetId) });
    note.hidden = false;
  }

  function enroll(id) {
    var go = function () {
      var sel = $('#f-course');
      if (leadForm && leadForm.hidden) resetLead();
      if (id && sel && $('option[value="' + id + '"]', sel)) {
        sel.value = id;
        presetId = id;
        setInvalid(sel, false);
        var field = sel.closest('.field');
        field.classList.remove('is-preset'); reflow(field); field.classList.add('is-preset');
        updatePresetNote();
        toast(t('toast.preset', { x: courseTitle(id) }));
      }
      scrollToId('signupForm');
      if (!isTouch) setTimeout(function () { var n = $('#f-name'); if (n && !n.value) n.focus({ preventScroll: true }); }, reduceMotion ? 0 : 700);
    };
    if (drawer && !drawer.hidden) closeDrawer(false);
    if (sheetState) closeSheet().then(go); else go();
  }

  function validateLead() {
    var name = leadForm.elements.name, phone = leadForm.elements.phone, course = leadForm.elements.course;
    var okName = name.value.trim().length >= 2;
    var okPhone = (phone.dataset.digits || '').length === 9;
    var okCourse = !!course.value;
    setInvalid(name, !okName); setInvalid(phone, !okPhone); setInvalid(course, !okCourse);
    var bad = !okName ? name : !okPhone ? phone : !okCourse ? course : null;
    if (bad) { bad.focus(); return false; }
    return true;
  }
  function radioVal(form, name) { var r = $('input[name="' + name + '"]:checked', form); return r ? r.value : ''; }
  function collectLead() {
    var f = leadForm, id = f.elements.course.value;
    var ru = function (prefix, k) { return k ? tRu(prefix + k) : ''; };
    return {
      type: 'lead',
      name: f.elements.name.value.trim(),
      phone: '+998' + (f.elements.phone.dataset.digits || ''),
      course_id: id,
      course: courseTitle(id, 'ru'),
      age: f.elements.age.value,
      level: ru('form.level.', radioVal(f, 'level')),
      format: ru('form.format.', radioVal(f, 'format')),
      days: ru('form.days.', radioVal(f, 'days')),
      time: ru('form.time.', radioVal(f, 'time')),
      group_language: ru('form.glang.', radioVal(f, 'glang')),
      comment: f.elements.comment.value.trim(),
      site_language: lang,
      page: location.href.split('#')[0],
      created_at: new Date().toISOString()
    };
  }
  function showLeadSuccess(name, demo) {
    lastLeadName = name; lastLeadDemo = !!demo;
    leadForm.hidden = true;
    leadSuccess.hidden = false;
    renderLeadSuccess();
    leadSuccess.focus({ preventScroll: true });
    leadSuccess.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }
  function renderLeadSuccess() {
    if (!leadSuccess || leadSuccess.hidden) return;
    $('#leadSuccessText').textContent = t('form.ok.text', { name: lastLeadName });
    var demo = $('#leadDemo'); if (demo) { demo.hidden = !lastLeadDemo; demo.textContent = t('form.demo'); }
  }
  function resetLead() {
    leadForm.reset();
    var ph = leadForm.elements.phone; ph.dataset.digits = ''; ph.value = '';
    presetId = ''; updatePresetNote();
    $$('.field', leadForm).forEach(function (f) { f.classList.remove('is-invalid', 'is-preset'); });
    leadForm.hidden = false; leadSuccess.hidden = true;
    leadForm._t0 = Date.now() - 3000;
  }
  function initLeadForm() {
    leadForm = $('#leadForm'); leadSuccess = $('#leadSuccess');
    if (!leadForm) return;
    leadForm._t0 = Date.now();
    initPhone(leadForm.elements.phone);
    leadForm.addEventListener('input', function (e) { clearFieldError(e.target); });
    leadForm.addEventListener('change', function (e) {
      clearFieldError(e.target);
      if (e.target.name === 'course') updatePresetNote();
    });
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (leadForm.classList.contains('is-sending')) return;
      var err = $('#leadError'); err.hidden = true;
      if (!validateLead()) return;
      var data = collectLead();
      if (isSpam(leadForm)) { console.info('[GetStudy] Honeypot: заявка похожа на спам и не отправлена.'); showLeadSuccess(data.name, false); return; }
      setBusy(leadForm, true);
      send(CONFIG.leadEndpoint, data).then(function (r) {
        showLeadSuccess(data.name, r && r.demo);
      }).catch(function (e2) {
        console.error('[GetStudy] Ошибка отправки заявки:', e2);
        err.textContent = t('form.fail'); err.hidden = false;
      }).then(function () { setBusy(leadForm, false); });
    });
  }

  /* ----- Отклик на вакансию ----- */
  function onVacancySubmit(e) {
    e.preventDefault();
    var form = e.currentTarget;
    if (form.classList.contains('is-sending')) return;
    var err = $('.form-error', form); err.hidden = true;
    var name = form.elements.name, phone = form.elements.phone, subject = form.elements.subject;
    var okName = name.value.trim().length >= 3, okPhone = (phone.dataset.digits || '').length === 9, okSubj = !!subject.value;
    setInvalid(name, !okName); setInvalid(phone, !okPhone); setInvalid(subject, !okSubj);
    var bad = !okName ? name : !okPhone ? phone : !okSubj ? subject : null;
    if (bad) { bad.focus(); return; }
    var subj = VACANCY.subjects.filter(function (s) { return s.id === subject.value; })[0];
    var ru = function (prefix, k) { return k ? tRu(prefix + k) : ''; };
    var shift = radioVal(form, 'shift');
    var payload = {
      type: 'vacancy',
      name: name.value.trim(),
      phone: '+998' + phone.dataset.digits,
      subject: subj ? subj.ru : subject.value,
      birth_date: form.elements.birth.value,
      education: ru('vac.edu.', radioVal(form, 'edu')),
      shift: shift ? tRu('vac.sh.' + shift) : '',
      teaching_language: ru('vac.tl.', radioVal(form, 'tlang')),
      experience: ru('vac.exp.', radioVal(form, 'exp')),
      self_assessment: radioVal(form, 'self'),
      letter: form.elements.letter.value.trim(),
      site_language: lang,
      created_at: new Date().toISOString()
    };
    var done = function () { form.hidden = true; var ok = $('#vacSuccess', sheetBody); ok.hidden = false; ok.focus({ preventScroll: true }); ok.scrollIntoView({ block: 'nearest' }); };
    if (isSpam(form)) { console.info('[GetStudy] Honeypot: отклик похож на спам и не отправлен.'); done(); return; }
    setBusy(form, true);
    send(CONFIG.vacancyEndpoint, payload).then(done).catch(function (e2) {
      console.error('[GetStudy] Ошибка отправки отклика:', e2);
      err.textContent = t('form.fail'); err.hidden = false;
    }).then(function () { setBusy(form, false); });
  }

  /* ================= Режим работы ================= */
  function tashkentNow() {
    var d = new Date();
    return new Date(d.getTime() + (d.getTimezoneOffset() + CONFIG.utcOffset * 60) * 60000);
  }
  function hoursStatus() {
    var n = tashkentNow(), day = n.getDay(), m = n.getHours() * 60 + n.getMinutes(), H = CONFIG.hours;
    var work = H.days.indexOf(day) > -1;
    if (work && m >= H.open && m < H.lunchFrom) return ['open', 'open'];
    if (work && m >= H.lunchFrom && m < H.lunchTo) return ['lunch', 'lunch'];
    if (work && m >= H.lunchTo && m < H.close) return ['open', 'open'];
    if (work && m < H.open) return ['before', 'closed'];
    if (!work) return ['tomorrow', 'closed'];
    return [H.days.indexOf((day + 1) % 7) > -1 ? 'tomorrow' : 'monday', 'closed'];
  }
  function updateHours() {
    var s = hoursStatus();
    $$('[data-status]').forEach(function (el) {
      el.className = 'status status--' + s[1];
      el.textContent = t('status.' + s[0]);
    });
  }

  /* ================= Тост ================= */
  var toastTimer = 0;
  function toast(msg) {
    var el = $('#toast'); if (!el) return;
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-show'); }, 2600);
  }

  /* ================= Рендер всего ================= */
  function renderAll() {
    applyStatic();
    renderCatalog();
    renderReviews();
    renderGallery();
    fillCourseSelect();
    renderLeadSuccess();
    updateHours();
    if (sheetState) renderSheet();
  }

  /* ================= Обработчики ================= */
  function onClick(e) {
    var el = e.target.closest('[data-lang],[data-enroll],[data-course],[data-sheet],[data-scroll],[data-filter],[data-quick],[data-close-sheet],[data-close-drawer],[data-nav],[data-tab],[data-live-cal],[data-route-video],[data-reset-form]');
    if (!el) return;
    if (el.hasAttribute('data-lang')) { setLang(el.getAttribute('data-lang')); return; }
    if (el.hasAttribute('data-enroll')) { e.preventDefault(); enroll(el.getAttribute('data-enroll')); return; }
    if (el.hasAttribute('data-course')) { e.preventDefault(); openSheet('course', { id: el.getAttribute('data-course') }); return; }
    if (el.hasAttribute('data-sheet')) { e.preventDefault(); openSheet(el.getAttribute('data-sheet')); return; }
    if (el.hasAttribute('data-quick')) { e.preventDefault(); quick(el.getAttribute('data-quick')); return; }
    if (el.hasAttribute('data-filter')) { applyFilter(el.getAttribute('data-filter')); return; }
    if (el.hasAttribute('data-close-sheet')) { closeSheet(); return; }
    if (el.hasAttribute('data-close-drawer')) { closeDrawer(); return; }
    if (el.hasAttribute('data-scroll')) { e.preventDefault(); scrollToId(el.getAttribute('data-scroll')); return; }
    if (el.hasAttribute('data-nav')) {
      e.preventDefault();
      var id = (el.getAttribute('href') || '').slice(1);
      closeDrawer(false);
      setTimeout(function () { scrollToId(id); }, reduceMotion ? 0 : 60);
      return;
    }
    if (el.hasAttribute('data-tab')) { schedTab = el.getAttribute('data-tab'); renderSlots(); return; }
    if (el.hasAttribute('data-live-cal')) { openLiveCalendar(); return; }
    if (el.hasAttribute('data-route-video')) {
      var wrap = $('.route-video');
      if (!wrap.firstChild) wrap.innerHTML = '<video controls playsinline preload="metadata" src="' + esc(CONFIG.routeVideo) + '"></video>';
      wrap.hidden = false; el.hidden = true;
      var v = $('video', wrap); if (v && v.play) { var p = v.play(); if (p && p.catch) p.catch(function () { /* автозапуск запрещён - покажем плеер */ }); }
      return;
    }
    if (el.hasAttribute('data-reset-form')) { resetLead(); var n = $('#f-name'); if (n) n.focus(); }
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      if (sheetState) { closeSheet(); return; }
      if (drawer && !drawer.hidden) { closeDrawer(); return; }
    }
    if (e.key === 'Tab') {
      if (sheetState) trapFocus(sheetPanel, e);
      else if (drawer && !drawer.hidden) trapFocus($('.drawer__panel', drawer), e);
    }
    var tab = e.target.closest && e.target.closest('.seg-tabs [role="tab"]');
    if (tab && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      schedTab = schedTab === 'mwf' ? 'tts' : 'mwf';
      renderSlots();
      var nt = $('#tab-' + schedTab); if (nt) nt.focus();
    }
  }

  function initHistory() {
    window.addEventListener('popstate', function (e) {
      if (ignorePop) { var r = ignorePop; ignorePop = null; r(); return; }
      if (sheetState) { closeSheet({ fromPop: true }); return; }
      var st = e.state;
      if (st && st.gsSheet) { openSheet(st.gsSheet, st.data, { push: false }); sheetPushed = true; }
    });
    window.addEventListener('hashchange', function () {
      if (sheetState) return;
      var h = parseHash(location.hash);
      if (h) { openSheet(h.type, h.data, { push: false }); sheetPushed = true; }
    });
    var start = parseHash(location.hash);
    if (start) { openSheet(start.type, start.data, { push: false }); sheetPushed = false; }
  }

  function initHeader() {
    var header = $('#header'), bar = $('#bottomBar');
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    // На мобильных прячем нижнюю панель, пока открыта клавиатура
    document.addEventListener('focusin', function (e) {
      if (bar && e.target.matches && e.target.matches('input:not([type="radio"]), textarea, select') && window.innerWidth < 1024) bar.classList.add('is-hidden');
    });
    document.addEventListener('focusout', function () {
      setTimeout(function () {
        var a = document.activeElement;
        if (bar && !(a && a.matches && a.matches('input:not([type="radio"]), textarea, select'))) bar.classList.remove('is-hidden');
      }, 80);
    });
  }

  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) { items.forEach(function (el) { el.classList.add('is-visible'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  function init() {
    drawer = $('#drawer'); burger = $('#burger');
    sheet = $('#sheet'); sheetPanel = $('.sheet__panel', sheet); sheetBody = $('#sheetBody');
    sheetTitle = $('#sheetTitle'); sheetSub = $('#sheetSub'); sheetFoot = $('#sheetFoot');

    var logoImg = $('.logo img');
    if (logoImg && logoImg.complete && logoImg.naturalWidth === 0) { logoImg.hidden = true; logoImg.nextElementSibling.hidden = false; }

    if (burger) burger.addEventListener('click', function () { if (drawer.hidden) openDrawer(); else closeDrawer(); });
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);

    initLeadForm();
    renderAll();
    $$('[data-carousel]').forEach(initCarousel);
    initSheetDrag();
    initHeader();
    initReveal();
    initHistory();
    setInterval(updateHours, 60000);
    window.addEventListener('resize', function () { if (window.innerWidth >= 1200 && drawer && !drawer.hidden) closeDrawer(false); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
