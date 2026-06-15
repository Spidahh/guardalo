// ─────────────────────────────────────────────────────────────────────────
// GUARDALO v10 — guida interattiva a livelli (vanilla JS, zero build)
// Dati: window.GUARDALO (generato da tools/build.mjs). Stato utente: localStorage
// (anonimo) + Firebase Firestore (sincronizzato al login). Pubblico per default.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  const DATA   = window.GUARDALO || { titles: [], paths: [], attribution: '' };
  const TITLES = DATA.titles || [];
  const PATHS  = DATA.paths || [];
  const BY_ID  = new Map(TITLES.map(t => [t.id, t]));

  // ── tassonomia generi (EN grezzo → IT) ────────────────────────────────────
  const GENRE_IT = {
    Action: 'Azione', Adventure: 'Avventura', Comedy: 'Commedia', Drama: 'Drammatico',
    Ecchi: 'Ecchi', Fantasy: 'Fantasy', Horror: 'Horror', 'Mahou Shoujo': 'Magical Girl',
    Mecha: 'Mecha', Music: 'Musicale', Mystery: 'Mistero', Psychological: 'Psicologico',
    Romance: 'Romantico', 'Sci-Fi': 'Fantascienza', 'Slice of Life': 'Slice of Life',
    Sports: 'Sport', Supernatural: 'Soprannaturale', Thriller: 'Thriller',
  };
  const itGenre = g => GENRE_IT[g] || g;

  // scaffali per mood nella vista Esplora (genere AniList → titolo scaffale)
  const MOOD_SHELVES = [
    { key: 'Action',       label: 'Azione e adrenalina',  icon: 'ri-sword-line' },
    { key: 'Fantasy',      label: 'Mondi fantasy',        icon: 'ri-magic-line' },
    { key: 'Sci-Fi',       label: 'Fantascienza',         icon: 'ri-rocket-line' },
    { key: 'Psychological', label: 'Ti frigge il cervello', icon: 'ri-brain-line' },
    { key: 'Horror',       label: 'Buio e disagio',       icon: 'ri-skull-2-line' },
    { key: 'Drama',        label: 'Drammi che restano',   icon: 'ri-quill-pen-line' },
    { key: 'Adventure',    label: 'Grandi avventure',     icon: 'ri-compass-3-line' },
    { key: 'Comedy',       label: 'Per ridere',           icon: 'ri-emotion-laugh-line' },
  ];

  // ── fasce lunghezza ────────────────────────────────────────────────────────
  const BANDS = ['cortissimo', 'corto', 'medio', 'lungo', 'lunghissimo'];
  const bandIndex = b => Math.max(0, BANDS.indexOf(b));

  // ── util ───────────────────────────────────────────────────────────────────
  const $  = (s, r = document) => r.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cover = t => t.coverImage || '';
  // variante leggera (AniList ~24KB invece di ~80KB) per card e mini-cover
  const thumb = u => (u || '').replace('/cover/large/', '/cover/medium/');

  // ════════════════════════════════════════════════════════════════════════
  class Guardalo {
    constructor() {
      this.watched = {};
      this.toWatch = {};
      this.user = null;
      this.isAdmin = false;
      this.homeAudience = 'tutti';
      this.boot();
    }

    boot() {
      this.loadLocal();
      this.bindChrome();
      this.initFirebase();
      const attr = $('#footAttr'); if (attr) attr.textContent = DATA.attribution || '';
      window.addEventListener('hashchange', () => this.route());
      this.route();
    }

    // ── persistenza ──────────────────────────────────────────────────────────
    loadLocal() {
      try {
        const r = JSON.parse(localStorage.getItem('guardalo_v10') || '{}');
        this.watched = r.watched || {};
        this.toWatch = r.toWatch || {};
      } catch (e) {}
    }
    save() {
      const payload = { watched: this.watched, toWatch: this.toWatch };
      if (this.user && window.db) {
        window.db.collection('users').doc(this.user.uid).set({ guardalo: payload }, { merge: true }).catch(() => {});
      }
      try { localStorage.setItem('guardalo_v10', JSON.stringify(payload)); } catch (e) {}
    }
    isWatched(id) { return !!this.watched[id]; }
    isLater(id)   { return !!this.toWatch[id]; }

    toggle(id, field) {
      const store = field === 'watched' ? this.watched : this.toWatch;
      if (store[id]) delete store[id];
      else {
        store[id] = true;
        // visto e da-vedere si escludono
        if (field === 'watched') delete this.toWatch[id];
        else delete this.watched[id];
      }
      this.save();
      this.refreshMarks(id);
      const on = field === 'watched' ? this.isWatched(id) : this.isLater(id);
      const msg = field === 'watched'
        ? (on ? '✓ Segnato come visto' : 'Rimosso dai visti')
        : (on ? '🔖 Aggiunto a “Da vedere”' : 'Rimosso da “Da vedere”');
      this.toast(msg, on ? (field === 'watched' ? 'ok' : 'later') : 'muted');
    }

    // aggiorna le spunte visibili senza ri-renderizzare tutta la vista
    refreshMarks(id) {
      document.querySelectorAll(`[data-card="${CSS.escape(id)}"]`).forEach(c => {
        c.classList.toggle('is-watched', this.isWatched(id));
        c.classList.toggle('is-later', this.isLater(id));
        const w = c.querySelector('.js-watch'); if (w) w.classList.toggle('on', this.isWatched(id));
        const l = c.querySelector('.js-later'); if (l) l.classList.toggle('on', this.isLater(id));
      });
      // progressi percorsi / contatori, se in vista
      const route = (location.hash.slice(1) || '/');
      if (route === '/' || route.startsWith('/p/') || route === '/lista') this.route();
    }

    // ── FIREBASE ──────────────────────────────────────────────────────────────
    initFirebase() {
      try {
        if (typeof window.auth === 'undefined') return;
        window.auth.onAuthStateChanged(user => {
          this.user = user;
          const admin = (window.ADMIN_EMAIL || '').toLowerCase();
          this.isAdmin = !!(user && user.email && user.email.toLowerCase() === admin);
          this.updateUserChrome();
          if (user) this.loadCloud();
        });
      } catch (e) {}
    }
    loadCloud() {
      window.db.collection('users').doc(this.user.uid).get().then(doc => {
        const g = (doc.exists && doc.data().guardalo) || null;
        if (g) {
          // unione: locale + cloud (non perdere progressi fatti da sloggati)
          this.watched = Object.assign({}, this.watched, g.watched || {});
          this.toWatch = Object.assign({}, this.toWatch, g.toWatch || {});
        }
        this.save();
        this.route();
      }).catch(() => {});
    }
    updateUserChrome() {
      const chip = $('#userChip'), login = $('#loginBtn'), logout = $('#logoutBtn'), badge = $('#adminBadge');
      if (this.user) {
        chip.hidden = false; chip.textContent = this.user.displayName || this.user.email;
        login.hidden = true; logout.hidden = false;
      } else {
        chip.hidden = true; login.hidden = false; logout.hidden = true;
      }
      if (badge) badge.hidden = !this.isAdmin;
    }

    // ── CHROME (nav, tema, ricerca, login) ────────────────────────────────────
    bindChrome() {
      $('#themeToggle').addEventListener('click', () => this.toggleTheme());
      $('#searchOpen').addEventListener('click', () => this.openSearch());
      $('#searchClose').addEventListener('click', () => this.closeSearch());
      $('#searchOverlay').addEventListener('click', e => { if (e.target.id === 'searchOverlay') this.closeSearch(); });
      $('#searchInput').addEventListener('input', e => this.renderSearch(e.target.value));

      $('#loginBtn').addEventListener('click', () => $('#loginModal').classList.add('open'));
      $('#loginClose').addEventListener('click', () => $('#loginModal').classList.remove('open'));
      $('#loginModal').addEventListener('click', e => { if (e.target.id === 'loginModal') e.currentTarget.classList.remove('open'); });
      $('#googleLogin').addEventListener('click', () => {
        if (window.auth) window.auth.signInWithPopup(new window.firebase.auth.GoogleAuthProvider())
          .then(() => $('#loginModal').classList.remove('open')).catch(() => {});
      });
      $('#logoutBtn').addEventListener('click', () => { if (window.auth) window.auth.signOut(); });

      // delega azioni "visto / da vedere"
      document.addEventListener('click', e => {
        const b = e.target.closest('.js-watch, .js-later');
        if (b) { e.preventDefault(); e.stopPropagation(); this.toggle(b.dataset.id, b.classList.contains('js-watch') ? 'watched' : 'toWatch'); }
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { this.closeSearch(); $('#loginModal').classList.remove('open'); }
        if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); this.openSearch(); }
      });
      window.addEventListener('scroll', () => {
        document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 6);
      }, { passive: true });
    }
    toggleTheme() {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = next === 'light' ? '#f6f1e7' : '#17140f';
      try { localStorage.setItem('guardalo_theme', next); } catch (e) {}
    }
    openSearch() { const o = $('#searchOverlay'); o.hidden = false; requestAnimationFrame(() => o.classList.add('open')); $('#searchInput').focus(); this.renderSearch(''); }
    closeSearch() { const o = $('#searchOverlay'); o.classList.remove('open'); setTimeout(() => o.hidden = true, 200); $('#searchInput').value = ''; }

    // ── ROUTER ─────────────────────────────────────────────────────────────────
    route() {
      const hash = location.hash.slice(1) || '/';
      const [_, seg, arg] = hash.split('/');
      let html, active = 'home';
      if (seg === 'p' && arg) { html = this.viewPath(arg); active = 'home'; }
      else if (seg === 't' && arg) { html = this.viewTitle(arg); active = ''; }
      else if (seg === 'esplora') { html = this.viewEsplora(); active = 'esplora'; }
      else if (seg === 'lista') { html = this.viewLista(); active = 'lista'; }
      else { html = this.viewHome(); active = 'home'; }

      const app = $('#app');
      app.innerHTML = html;
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.route === active));
      window.scrollTo(0, 0);
      this.afterRender(seg);
    }
    afterRender(seg) {
      // bind filtri "porta" in home
      if (!seg || seg === '') {
        document.querySelectorAll('.door').forEach(d => d.addEventListener('click', () => {
          this.homeAudience = d.dataset.aud; this.route();
        }));
      }
    }

    // ── COMPONENTI ──────────────────────────────────────────────────────────────
    lengthScale(t, compact) {
      const idx = bandIndex(t.lengthBand);
      const bars = BANDS.map((b, i) =>
        `<span class="ls-bar ${i <= idx ? 'on' : ''} ls-${t.lengthBand}"></span>`).join('');
      if (compact) return `<span class="lchip ls-${t.lengthBand}" title="${esc(t.lengthLabel)} · ${esc(t.lengthHint)}"><i class="ri-time-line"></i>${esc(t.lengthLabel)}</span>`;
      return `<div class="lscale">
        <div class="ls-bars ls-${t.lengthBand}">${bars}</div>
        <div class="ls-text"><b>${esc(t.lengthLabel)}</b><span>${esc(t.lengthHint)}</span></div>
      </div>`;
    }
    statusBadge(t) {
      const map = { 'Concluso': 'done', 'In corso': 'airing', 'Annunciato': 'soon', 'In pausa': 'soon', 'Cancellato': 'soon' };
      const ic = { 'Concluso': 'ri-check-line', 'In corso': 'ri-loader-2-line', 'Annunciato': 'ri-time-line' };
      return `<span class="status status-${map[t.statusLabel] || 'soon'}"><i class="${ic[t.statusLabel] || 'ri-time-line'}"></i>${esc(t.statusLabel)}</span>`;
    }
    card(t, opts = {}) {
      if (!t) return '';
      const w = this.isWatched(t.id), l = this.isLater(t.id);
      const why = opts.why ? `<span class="card-why">${esc(opts.why)}</span>` : '';
      const col = t.coverColor ? `style="--cc:${esc(t.coverColor)}"` : '';
      return `<a class="card ${w ? 'is-watched' : ''} ${l ? 'is-later' : ''}" data-card="${esc(t.id)}" href="#/t/${esc(t.id)}" ${col}>
        <div class="card-poster">
          <img src="${esc(thumb(cover(t)))}" alt="${esc(t.title)}" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">
          <div class="card-marks">
            <button class="cm js-watch ${w ? 'on' : ''}" data-id="${esc(t.id)}" title="Visto" aria-label="Segna come visto"><i class="ri-check-line"></i></button>
            <button class="cm js-later ${l ? 'on' : ''}" data-id="${esc(t.id)}" title="Da vedere" aria-label="Aggiungi a Da vedere"><i class="ri-bookmark-line"></i></button>
          </div>
          ${w ? '<span class="card-seen"><i class="ri-check-double-line"></i> Visto</span>' : ''}
          ${this.lengthScale(t, true)}
        </div>
        <div class="card-body">
          <div class="card-title">${esc(t.title)}</div>
          <div class="card-meta">${esc(t.year || '')} · ${esc(t.typeLabel)}${t.score10 ? ` · <span class="card-score"><i class="ri-star-fill"></i>${t.score10}</span>` : ''}</div>
          ${why}
        </div>
      </a>`;
    }
    row(ids, opts = {}) {
      const items = ids.map(x => typeof x === 'string' ? { t: BY_ID.get(x) } : { t: BY_ID.get(x.id), why: x.why })
        .filter(o => o.t);
      if (!items.length) return '';
      return `<div class="row-scroll">${items.map(o => this.card(o.t, { why: opts.why ? o.why : null })).join('')}</div>`;
    }

    // ── VISTA: HOME (percorsi) ──────────────────────────────────────────────────
    pathProgress(p) {
      const ids = new Set();
      p.levels.forEach(l => (l.titles || []).forEach(id => ids.add(id)));
      const total = ids.size;
      let done = 0; ids.forEach(id => { if (this.isWatched(id)) done++; });
      return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
    }
    // prime N copertine rappresentative di un percorso (per la card visiva)
    pathCovers(p, n) {
      const seen = new Set(), out = [];
      for (const lv of p.levels) for (const id of (lv.titles || [])) {
        if (seen.has(id)) continue; seen.add(id);
        const t = BY_ID.get(id);
        if (t && t.coverImage) out.push(t);
        if (out.length >= n) return out;
      }
      return out;
    }
    miniCover(t) {
      return `<span class="mc" style="--cc:${esc(t.coverColor || '#2a2419')}"><img src="${esc(thumb(t.coverImage))}" alt="" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')"></span>`;
    }
    viewHome() {
      const aud = this.homeAudience;
      const visible = PATHS.filter(p =>
        aud === 'tutti' ? true :
        aud === 'principiante' ? p.audience !== 'esperto' :
        p.audience !== 'principiante');

      const doors = [
        ['principiante', 'ri-seedling-line', 'Sono alle prime armi', 'Non so da dove iniziare. Guidami passo passo.'],
        ['esperto', 'ri-vip-crown-2-line', 'Ne ho già viste tante', 'Portami in profondità, fammi scoprire roba non ovvia.'],
        ['tutti', 'ri-stack-line', 'Mostrami tutto', 'Fammi vedere tutti i percorsi disponibili.'],
      ].map(([k, ic, t, s]) => `
        <button class="door ${aud === k ? 'on' : ''}" data-aud="${k}">
          <i class="${ic}"></i><b>${t}</b><span>${s}</span>
        </button>`).join('');

      const cards = visible.map(p => {
        const pr = this.pathProgress(p);
        const tag = p.audience === 'principiante' ? 'Per iniziare' : p.audience === 'esperto' ? 'Per esperti' : 'Per tutti';
        const covers = this.pathCovers(p, 4).map(t => this.miniCover(t)).join('');
        return `<a class="path-card" href="#/p/${esc(p.id)}" style="--accent:${esc(p.accent)}">
          <div class="path-covers">${covers}<span class="path-covers-veil"></span><i class="${esc(p.icon)} path-ic"></i></div>
          <div class="path-card-main">
            <div class="path-card-top">
              <h3 class="path-name">${esc(p.title)}</h3>
              <span class="path-aud">${tag}</span>
            </div>
            <p class="path-tag">${esc(p.tagline)}</p>
            <div class="path-foot">
              <span class="path-levels"><i class="ri-stairs-line"></i> ${p.levels.length} livelli</span>
              <span class="path-prog"><span class="pp-bar"><span style="width:${pr.pct}%"></span></span>${pr.done}/${pr.total}</span>
            </div>
          </div>
        </a>`;
      }).join('');

      const iconic = [...TITLES].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 9);
      const heroArt = iconic.map(t => this.miniCover(t)).join('');

      return `
      <section class="hero">
        <div class="hero-in">
          <div class="hero-copy">
            <p class="hero-kicker">La guida agli anime, livello dopo livello</p>
            <h1 class="hero-title">Non un catalogo.<br><em>Un sensei.</em></h1>
            <p class="hero-sub">Percorsi curati che ti prendono per mano — dai primi passi ai capolavori più densi. Segna cosa hai visto, e procedi.</p>
            <div class="doors">${doors}</div>
          </div>
          <div class="hero-art" aria-hidden="true">${heroArt}</div>
        </div>
      </section>
      <section class="wrap">
        <div class="sec-head"><h2>${aud === 'tutti' ? 'Tutti i percorsi' : aud === 'principiante' ? 'Per cominciare' : 'Per chi vuole il profondo'}</h2>
          <span class="sec-count">${visible.length} percorsi</span></div>
        <div class="paths-grid">${cards}</div>
      </section>`;
    }

    // ── VISTA: PERCORSO ──────────────────────────────────────────────────────────
    viewPath(id) {
      const p = PATHS.find(x => x.id === id);
      if (!p) return this.notFound();
      const pr = this.pathProgress(p);
      const levels = p.levels.map((lv, i) => {
        const ids = lv.titles || [];
        const done = ids.filter(x => this.isWatched(x)).length;
        const state = done === ids.length && ids.length ? 'done' : done > 0 ? 'doing' : 'todo';
        const stLabel = state === 'done' ? 'Completato' : state === 'doing' ? 'In corso' : 'Da iniziare';
        const cards = ids.map(x => this.card(BY_ID.get(x))).join('');
        const bonus = (lv.bonus || []).filter(x => BY_ID.get(x));
        const bonusHtml = bonus.length ? `
          <div class="lv-bonus">
            <span class="lv-bonus-h"><i class="ri-add-circle-line"></i> Bonus facoltativi</span>
            <div class="row-scroll">${bonus.map(x => this.card(BY_ID.get(x))).join('')}</div>
          </div>` : '';
        return `
        <article class="level lv-${state}">
          <div class="lv-rail"><span class="lv-num">${i + 1}</span></div>
          <div class="lv-body">
            <div class="lv-head">
              <h3 class="lv-title">${esc(lv.title)}</h3>
              <span class="lv-state lv-state-${state}">${stLabel} · ${done}/${ids.length}</span>
            </div>
            <p class="lv-why">${esc(lv.why)}</p>
            <div class="lv-cards">${cards}</div>
            ${bonusHtml}
          </div>
        </article>`;
      }).join('');

      return `
      <section class="path-hero" style="--accent:${esc(p.accent)}">
        <div class="wrap">
          <a class="back" href="#/"><i class="ri-arrow-left-line"></i> Tutti i percorsi</a>
          <div class="path-hero-in">
            <i class="${esc(p.icon)} path-hero-ic"></i>
            <div>
              <h1 class="path-hero-name">${esc(p.title)}</h1>
              <p class="path-hero-tag">${esc(p.tagline)}</p>
              <div class="path-hero-meta">
                <span class="pp-bar lg"><span style="width:${pr.pct}%"></span></span>
                <span>${pr.done} di ${pr.total} visti · ${p.levels.length} livelli</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="wrap levels">${levels}</section>`;
    }

    // ── VISTA: TITOLO ────────────────────────────────────────────────────────────
    viewTitle(id) {
      const t = BY_ID.get(id);
      if (!t) return this.notFound();
      const w = this.isWatched(id), l = this.isLater(id);

      const genres = (t.genres || []).map(g => `<span class="g-chip">${esc(itGenre(g))}</span>`).join('');
      const tone = (t.tone || []).map(x => `<span class="t-chip">${esc(x)}</span>`).join('');

      const struct = (t.structure || []);
      const mainSteps = struct.filter(s => s.main);
      const extras = struct.filter(s => !s.main);
      const structHtml = struct.length ? `
        <div class="t-sec">
          <h3 class="t-sec-h"><i class="ri-stairs-line"></i> ${t.startFrom ? `Da dove iniziare: <em>${esc(t.startFrom)}</em>` : 'Struttura'}</h3>
          <ol class="struct">${mainSteps.map(s => `<li><span class="st-name">${esc(s.name)}</span><span class="st-ep">${esc(s.episodes)}${s.year ? ` · ${s.year}` : ''}</span></li>`).join('')}</ol>
          ${extras.length ? `<div class="struct-extra"><span class="se-h">Extra (film/OVA collegati)</span>${extras.map(s => `<span class="se-chip">${esc(s.name)}</span>`).join('')}</div>` : ''}
        </div>` : '';

      const streaming = (t.streaming || []);
      const streamHtml = `
        <div class="t-sec">
          <h3 class="t-sec-h"><i class="ri-play-circle-line"></i> Dove vederlo <span class="legal-pill">solo legale</span></h3>
          ${streaming.length
            ? `<div class="streams">${streaming.map(s => `<a class="stream" href="${esc(s.url)}" target="_blank" rel="noopener nofollow"><i class="ri-external-link-line"></i> ${esc(s.name)}</a>`).join('')}</div>`
            : `<p class="muted-line">Nessuna piattaforma legale segnalata da AniList. <a href="https://www.justwatch.com/it/cerca?q=${encodeURIComponent(t.title)}" target="_blank" rel="noopener nofollow">Cerca su JustWatch →</a></p>`}
        </div>`;

      const recs = this.recsSections(t);

      const credits = [
        t.studios?.length ? ['Studio', t.studios.join(', ')] : null,
        t.director ? ['Regia', t.director] : null,
        t.creator ? ['Opera originale', t.creator] : null,
        t.sourceLabel ? ['Tratto da', t.sourceLabel] : null,
      ].filter(Boolean).map(([k, v]) => `<div class="cr"><span>${k}</span><b>${esc(v)}</b></div>`).join('');

      const banner = t.bannerImage
        ? `style="background-image:linear-gradient(180deg,rgba(0,0,0,.15),var(--surface) 92%),url('${esc(t.bannerImage)}')"`
        : `style="background:linear-gradient(180deg,${esc(t.coverColor || '#3a3a3a')}22,var(--surface) 92%)"`;

      return `
      <article class="title-view">
        <div class="t-banner" ${banner}></div>
        <div class="wrap t-grid">
          <aside class="t-aside">
            <img class="t-cover" src="${esc(cover(t))}" alt="${esc(t.title)}">
            <div class="t-actions">
              <button class="t-btn js-watch ${w ? 'on' : ''}" data-id="${esc(t.id)}"><i class="ri-check-double-line"></i> ${w ? 'Visto' : 'Segna visto'}</button>
              <button class="t-btn ghost js-later ${l ? 'on' : ''}" data-id="${esc(t.id)}"><i class="ri-bookmark-line"></i> ${l ? 'In lista' : 'Da vedere'}</button>
            </div>
            <div class="t-credits">${credits}</div>
          </aside>

          <div class="t-main">
            <a class="back" href="javascript:history.back()"><i class="ri-arrow-left-line"></i> Indietro</a>
            <h1 class="t-title">${esc(t.title)}</h1>
            ${t.titleNative ? `<p class="t-native">${esc(t.titleNative)}</p>` : ''}

            <div class="t-badges">
              ${this.lengthScale(t, false)}
              ${this.statusBadge(t)}
              ${t.score10 ? `<span class="t-score"><i class="ri-star-fill"></i> ${t.score10}<span>/10</span></span>` : ''}
              <span class="t-year">${esc(t.year || '')}</span>
            </div>

            ${tone ? `<div class="t-tone">${tone}</div>` : ''}

            <div class="t-hook">
              <span class="t-hook-h"><i class="ri-quote-text"></i> Cosa sapere prima di iniziare</span>
              <p>${esc(t.hook || 'Scheda in arrivo.')}</p>
              ${t.forWho ? `<p class="t-forwho">${esc(t.forWho)}</p>` : ''}
            </div>

            <div class="t-genres">${genres}</div>
            ${structHtml}
            ${streamHtml}
            ${recs}
          </div>
        </div>
      </article>`;
    }

    recsSections(t) {
      const r = t.recommendations || {};
      const blocks = [
        ['simili', 'Se ti è piaciuto questo', 'ri-heart-3-line'],
        ['saga', 'Stessa saga', 'ri-links-line'],
        ['studio', 'Dallo stesso studio', 'ri-building-line'],
        ['autore', 'Stesso autore / regista', 'ri-user-star-line'],
        ['affin', 'Affini per atmosfera', 'ri-shapes-line'],
      ];
      const out = blocks.map(([k, label, ic]) => {
        const list = (r[k] || []).slice(0, 10);
        if (!list.length) return '';
        return `<div class="t-sec">
          <h3 class="t-sec-h"><i class="${ic}"></i> ${label}</h3>
          ${this.row(list, { why: k !== 'saga' })}
        </div>`;
      }).join('');
      return out;
    }

    // ── VISTA: ESPLORA (editoriale, a scaffali) ─────────────────────────────────
    viewEsplora() {
      const byScore = [...TITLES].sort((a, b) => (b.score10 || 0) - (a.score10 || 0));
      const tonight = [...TITLES].filter(t => ['cortissimo', 'corto'].includes(t.lengthBand))
        .sort((a, b) => (b.score10 || 0) - (a.score10 || 0)).slice(0, 14);
      const pillars = byScore.filter(t => (t.year || 0) <= 2010).slice(0, 14);
      const marathon = [...TITLES].filter(t => ['lungo', 'lunghissimo'].includes(t.lengthBand))
        .sort((a, b) => (b.score10 || 0) - (a.score10 || 0)).slice(0, 14);
      const hidden = [...TITLES].filter(t => (t.score10 || 0) >= 7.5 && (t.popularity || 0) < 120000)
        .sort((a, b) => (b.score10 || 0) - (a.score10 || 0)).slice(0, 14);
      const fresh = [...TITLES].filter(t => (t.year || 0) >= 2022)
        .sort((a, b) => (b.score10 || 0) - (a.score10 || 0)).slice(0, 14);

      const shelf = (title, sub, ic, list) => list.length ? `
        <section class="shelf">
          <div class="shelf-head"><h2><i class="${ic}"></i> ${title}</h2><p>${sub}</p></div>
          <div class="row-scroll">${list.map(t => this.card(t)).join('')}</div>
        </section>` : '';

      const moodShelves = MOOD_SHELVES.map(m => {
        const list = byScore.filter(t => (t.genres || []).includes(m.key)).slice(0, 14);
        return shelf(m.label, '', m.icon, list);
      }).join('');

      return `
      <section class="wrap esplora-head">
        <h1>Esplora</h1>
        <p>Niente liste piatte: scaffali curati per umore, tempo e voglia del momento. <button class="link-btn" id="esploraSearch">o cerca un titolo →</button></p>
      </section>
      <div class="wrap">
        ${shelf('Inizia stasera', 'Corti e cortissimi che valgono una serata', 'ri-moon-clear-line', tonight)}
        ${shelf('Le pietre miliari', 'I classici che hanno fatto la storia', 'ri-ancient-pavilion-line', pillars)}
        ${shelf('Appena usciti', 'Il meglio degli ultimi anni', 'ri-fire-line', fresh)}
        ${shelf('Da maratona', 'Quando vuoi qualcosa in cui perderti per mesi', 'ri-calendar-todo-line', marathon)}
        ${shelf('Nascosti bene', 'Gemme che la maggior parte si è persa', 'ri-treasure-map-line', hidden)}
        ${moodShelves}
      </div>`;
    }

    // ── VISTA: LA MIA LISTA ──────────────────────────────────────────────────────
    viewLista() {
      const watched = Object.keys(this.watched).map(id => BY_ID.get(id)).filter(Boolean);
      const later = Object.keys(this.toWatch).map(id => BY_ID.get(id)).filter(Boolean);
      const hours = watched.reduce((s, t) => s + (t.coreMinutes || 0), 0) / 60;

      const grid = list => `<div class="grid">${list.map(t => this.card(t)).join('')}</div>`;
      const empty = (ic, msg) => `<div class="empty"><i class="${ic}"></i><p>${msg}</p><a class="btn-ghost" href="#/">Vai ai percorsi</a></div>`;

      return `
      <section class="wrap">
        <div class="sec-head"><h1>La mia lista</h1></div>
        <div class="list-stats">
          <div class="ls-stat"><b>${watched.length}</b><span>visti</span></div>
          <div class="ls-stat"><b>${later.length}</b><span>da vedere</span></div>
          <div class="ls-stat"><b>${Math.round(hours)}h</b><span>guardate</span></div>
        </div>
        <div class="sec-head sub"><h2><i class="ri-bookmark-line"></i> Da vedere</h2></div>
        ${later.length ? grid(later) : empty('ri-bookmark-line', 'Niente ancora in lista. Sfoglia i percorsi e salva cosa ti incuriosisce.')}
        <div class="sec-head sub"><h2><i class="ri-check-double-line"></i> Visti</h2></div>
        ${watched.length ? grid(watched) : empty('ri-check-double-line', 'Segna i titoli che hai già visto: sbloccano i progressi nei percorsi.')}
      </section>`;
    }

    notFound() {
      return `<section class="wrap empty big"><i class="ri-compass-3-line"></i><h2>Non trovato</h2><p>Questa pagina non esiste.</p><a class="btn-ghost" href="#/">Torna ai percorsi</a></section>`;
    }

    // ── RICERCA ──────────────────────────────────────────────────────────────────
    renderSearch(q) {
      const box = $('#searchResults');
      q = (q || '').toLowerCase().trim();
      if (!q) {
        box.innerHTML = `<p class="sr-hint">Cerca per titolo, studio, genere o atmosfera. Premi <kbd>/</kbd> per riaprire.</p>`;
        return;
      }
      const hits = TITLES.filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.titleRomaji || '').toLowerCase().includes(q) ||
        (t.studios || []).some(s => s.toLowerCase().includes(q)) ||
        (t.genres || []).some(g => itGenre(g).toLowerCase().includes(q) || g.toLowerCase().includes(q)) ||
        (t.tone || []).some(x => x.toLowerCase().includes(q)) ||
        (t.director || '').toLowerCase().includes(q)
      ).slice(0, 24);
      box.innerHTML = hits.length
        ? hits.map(t => `<a class="sr-item" href="#/t/${esc(t.id)}" data-srclose>
            <img src="${esc(cover(t))}" alt="" loading="lazy">
            <div><b>${esc(t.title)}</b><span>${esc(t.year || '')} · ${esc(t.typeLabel)} · ${esc(t.lengthLabel)}</span></div>
          </a>`).join('')
        : `<p class="sr-hint">Nessun titolo per “${esc(q)}”.</p>`;
      box.querySelectorAll('[data-srclose]').forEach(a => a.addEventListener('click', () => this.closeSearch()));
    }

    // ── TOAST ────────────────────────────────────────────────────────────────────
    toast(msg, kind) {
      const t = document.createElement('div');
      t.className = `toast toast-${kind || 'ok'}`;
      t.textContent = msg;
      $('#toasts').appendChild(t);
      requestAnimationFrame(() => t.classList.add('show'));
      setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2400);
    }
  }

  // delega click "cerca" dentro Esplora (rendi dopo il render)
  document.addEventListener('click', e => {
    if (e.target.id === 'esploraSearch' || e.target.closest('#searchOpen')) {}
  });

  document.addEventListener('DOMContentLoaded', () => {
    window.app = new Guardalo();
    document.addEventListener('click', e => {
      if (e.target.id === 'esploraSearch') window.app.openSearch();
    });
  });
})();
