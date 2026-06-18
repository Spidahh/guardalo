// ─────────────────────────────────────────────────────────────────────────
// GUARDALO v10 — guida interattiva agli anime (vanilla JS, zero build)
// Dati: window.GUARDALO (generato da tools/build.mjs). Stato utente: localStorage
// (anonimo) + Firebase Firestore (sincronizzato al login). Pubblico per default.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  const DATA   = window.GUARDALO || { titles: [], paths: [], attribution: '' };
  const TITLES = DATA.titles || [];
  const PATHS  = DATA.paths || [];
  const BY_ID  = new Map(TITLES.map(t => [t.id, t]));
  // tassonomia (fonte unica: editorial/categories.json → dist data). Ordine generi/percorsi, membri, hero.
  const CAT    = DATA.categories || {};
  // contenuti home + liste tempo (editorial/home.json → dist data).
  const HOME   = DATA.home || {};
  // liste "Quanto tempo hai?" — fonte UNICA (prima erano duplicate/incoerenti in 3 punti).
  const TEMPO  = HOME.tempo || [];
  const tempoBands = key => (TEMPO.find(t => t.key === key) || {}).bands || [];

  // ── tassonomia generi (EN grezzo → IT) ────────────────────────────────────
  const GENRE_IT = {
    Action: 'Azione', Adventure: 'Avventura', Comedy: 'Commedia', Drama: 'Drammatico',
    Ecchi: 'Ecchi', Fantasy: 'Fantasy', Horror: 'Horror', 'Mahou Shoujo': 'Magical Girl',
    Mecha: 'Mecha', Music: 'Musicale', Mystery: 'Mistero', Psychological: 'Psicologico',
    Romance: 'Romantico', 'Sci-Fi': 'Fantascienza', 'Slice of Life': 'Slice of Life',
    Sports: 'Sport', Supernatural: 'Soprannaturale', Thriller: 'Thriller',
  };
  const itGenre = g => GENRE_IT[g] || g;
  // spiegazione semplice dei generi (niente roba da Wikipedia)
  const GENRE_GLOSS = {
    Action: 'Botte, inseguimenti, adrenalina.', Adventure: 'Viaggi ed esplorazione, un mondo da scoprire.',
    Comedy: 'Fatto per farti ridere.', Drama: 'Punta dritto alle emozioni.',
    Ecchi: 'Ammiccante e piccante, ma niente di esplicito.', Fantasy: 'Magia, mondi inventati, spade e mostri.',
    Horror: 'Vuole farti paura o ribrezzo.', 'Mahou Shoujo': 'Ragazze con poteri magici (magical girl).',
    Mecha: 'Robot giganti pilotati.', Music: 'La musica è al centro.',
    Mystery: 'Un enigma da risolvere con i protagonisti.', Psychological: 'Ti lavora la testa: tensione mentale più che fisica.',
    Romance: 'Storie di cuore.', 'Sci-Fi': 'Tecnologia, futuro, fantascienza.',
    'Slice of Life': 'Quotidianità e ritmi lenti, niente grandi eventi.', Sports: 'Competizione e sport.',
    Supernatural: 'Spiriti, poteri, roba oltre il reale.', Thriller: 'Tensione costante, ti tiene sul filo.',
  };

  // ── fasce lunghezza ────────────────────────────────────────────────────────
  const BANDS = ['cortissimo', 'corto', 'medio', 'lungo', 'lunghissimo'];
  const bandIndex = b => Math.max(0, BANDS.indexOf(b));

  // ── categorie di genere "pulite" (mostrate in home, in quest'ordine) ─────────
  // i percorsi "meta" (da-zero, canone, chicche) e quelli poco amati (sport, slice)
  // NON entrano nella griglia generi — restano raggiungibili da ricerca/Esplora.
  const GENRE_IDS = CAT.genreOrder || [];
  const GENRE_PATHS = GENRE_IDS.map(id => PATHS.find(p => p.id === id)).filter(Boolean);
  // Categorizzazione PRECISA della lista (i generi AniList sono troppo larghi e sbagliano:
  // es. Shangri-La ha tag Sci-Fi ma è isekai). Un titolo può stare in più categorie.
  const CAT_MEMBERS = CAT.members || {};
  // fasce per-genere: tiers[pathId][slug] = 'e' Essenziale | 'c' Consigliato | 'd' Da scoprire (default).
  const TIERS = CAT.tiers || {};
  const tierOf = (pid, slug) => (TIERS[pid] && TIERS[pid][slug]) || 'd';
  // insieme globale degli "Essenziali": titoli marcati 'e' in almeno una sezione → badge sulle card.
  const ESSENTIAL_IDS = new Set();
  for (const pid in TIERS) { const m = TIERS[pid]; for (const id in m) { if (m[id] === 'e') ESSENTIAL_IDS.add(id); } }
  const ESPLORA_PAGE = 24; // quanti titoli mostra Esplora prima di "Mostra altri"
  // immagine HERO di ogni categoria/percorso (editorial/categories.json → hero): scelta a mano, UNICA.
  const HERO_OF = CAT.hero || {};
  // titoli di una sezione (genere o percorso): la lista curata in categories.members. FONTE UNICA.
  const catTitles = (p) => p ? (CAT_MEMBERS[p.id] || []).map(id => BY_ID.get(id)).filter(Boolean) : [];
  const PERCORSI_IDS = CAT.percorsoOrder || [];
  const PERCORSI_PATHS = PERCORSI_IDS.map(id => PATHS.find(p => p.id === id)).filter(Boolean);
  // ordinamento "dal migliore": prima il tuo voto, poi il voto AniList
  const rankSort = (a, b) =>
    (b.userRating || 0) - (a.userRating || 0) ||
    (b.score10 || 0) - (a.score10 || 0);

  // etichetta lunghezza: i film e i one-shot non dicono "Cortissimo" ma cosa sono
  const lenLabel = t => t.format === 'MOVIE' ? 'Film'
    : ((t.sagaEpisodes || t.episodes || 0) <= 1 ? 'Episodio unico' : t.lengthLabel);
  const lenHint = t => t.format === 'MOVIE' ? 'un film, una sera' : t.lengthHint;


  // ── "Lo sapevi?" — curiosità (da editorial/home.json) ──
  const FACTS = HOME.facts || [];
  // pesca n elementi diversi a caso (varietà a ogni visita, senza dipendere dalla data)
  const pickN = (arr, n) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); };

  // ── util ───────────────────────────────────────────────────────────────────
  const $  = (s, r = document) => r.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cover = t => t.coverImage || '';
  // varianti leggere AniList: medium ~24KB (poster card), small ~6KB (mini-strisce)
  const thumb  = u => (u || '').replace('/cover/large/', '/cover/medium/');
  const thumbS = u => (u || '').replace('/cover/large/', '/cover/small/');

  // ════════════════════════════════════════════════════════════════════════
  class Guardalo {
    constructor() {
      this.watched = {};
      this.toWatch = {};
      this.user = null;
      this.isAdmin = false;
      this.boot();
    }

    boot() {
      this.loadLocal();
      this.bindChrome();
      this.initFirebase();
      const attr = $('#footAttr'); if (attr) attr.textContent = DATA.attribution || '';
      window.addEventListener('popstate', () => this.route());
      // intercetta i click sui link interni (URL path-based, niente reload)
      document.addEventListener('click', e => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = e.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || !href.startsWith('/') || href.startsWith('//') || a.target === '_blank' || a.hasAttribute('download')) return;
        e.preventDefault();
        this.go(href);
      });
      this.initCookies();
      this.route();
    }
    // consenso cookie (GDPR): mostra il banner finché non c'è una scelta salvata
    initCookies() {
      let choice = null;
      try { choice = localStorage.getItem('guardalo_cookie'); } catch (e) {}
      const bar = $('#cookieBar');
      if (!bar) return;
      const decide = v => { try { localStorage.setItem('guardalo_cookie', v); } catch (e) {} bar.classList.remove('show'); setTimeout(() => bar.hidden = true, 250);
        if (v === 'all') this.loadAds(); };
      if (!choice) { bar.hidden = false; requestAnimationFrame(() => bar.classList.add('show')); }
      else if (choice === 'all') this.loadAds();
      $('#cookieAccept')?.addEventListener('click', () => decide('all'));
      $('#cookieReject')?.addEventListener('click', () => decide('necessary'));
    }
    // carica gli annunci solo dopo consenso (placeholder: incolla qui lo script AdSense)
    loadAds() {
      // window.adsbygoogle = window.adsbygoogle || []; (...) — abilitare al lancio con il publisher id
    }
    // navigazione interna via History API
    go(path) {
      if (path !== location.pathname) { history.pushState(null, '', path); this.route(); }
      else window.scrollTo(0, 0);
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
      const route = location.pathname || '/';
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
      // null-guard: se un elemento manca NON deve far saltare le righe sotto (la voce «Gestione»).
      if (chip) { chip.hidden = !this.user; if (this.user) chip.textContent = this.user.displayName || this.user.email; }
      if (login) login.hidden = !!this.user;
      if (logout) logout.hidden = !this.user;
      if (badge) badge.hidden = !this.isAdmin;
      const adminLink = $('#sideAdmin'); if (adminLink) adminLink.hidden = !this.isAdmin;
      const topAdmin = $('#topAdmin'); if (topAdmin) topAdmin.hidden = !this.isAdmin;
      const profLink = $('#sideProfile'); if (profLink) profLink.hidden = !this.user;
      // se sono su pannello/profilo quando l'auth si risolve, ridisegno (gate → contenuto)
      if (location.pathname === '/admin' || location.pathname === '/profilo') this.route();
    }

    // ── CHROME (nav, tema, ricerca, login) ────────────────────────────────────
    bindChrome() {
      $('#themeToggle').addEventListener('click', () => this.toggleTheme());
      $('#searchOpen').addEventListener('click', () => this.openSearch());
      $('#searchClose').addEventListener('click', () => this.closeSearch());
      $('#searchOverlay').addEventListener('click', e => { if (e.target.id === 'searchOverlay') this.closeSearch(); });
      $('#searchInput').addEventListener('input', e => this.renderSearch(e.target.value));
      $('#searchInput').addEventListener('keydown', e => this.searchKey(e));
      $('#randomBtn').addEventListener('click', () => this.surprise());

      $('#loginBtn').addEventListener('click', () => $('#loginModal').classList.add('open'));
      $('#loginClose').addEventListener('click', () => $('#loginModal').classList.remove('open'));
      $('#loginModal').addEventListener('click', e => { if (e.target.id === 'loginModal') e.currentTarget.classList.remove('open'); });
      $('#googleLogin').addEventListener('click', () => {
        if (!window.auth) { this.toast('Accesso non disponibile al momento.', 'muted'); return; }
        window.auth.signInWithPopup(new window.firebase.auth.GoogleAuthProvider())
          .then(res => {
            $('#loginModal').classList.remove('open');
            const n = (res.user && (res.user.displayName || res.user.email) || '').split(' ')[0];
            this.toast('👋 Bentornato' + (n ? `, ${n}` : '') + '!', 'ok');
          })
          .catch(err => {
            const code = (err && err.code) || '';
            const msg = code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request'
                ? 'Accesso annullato.'
              : code === 'auth/unauthorized-domain' ? 'Dominio non autorizzato per l’accesso.'
              : code === 'auth/network-request-failed' ? 'Rete assente: accesso non riuscito.'
              : 'Accesso non riuscito. Riprova.';
            this.toast(msg, 'muted');
          });
      });
      $('#logoutBtn').addEventListener('click', () => {
        if (window.auth) window.auth.signOut().then(() => this.toast('Sei uscito.', 'muted')).catch(() => {});
      });
      $('#userChip')?.addEventListener('click', () => this.go('/profilo'));

      // sidebar mobile
      const sb = document.getElementById('sidebar');
      document.getElementById('sideToggle')?.addEventListener('click', () => sb.classList.toggle('open'));
      document.querySelectorAll('.side-nav a').forEach(a => a.addEventListener('click', () => sb.classList.remove('open')));

      // delega azioni "visto / da vedere"
      document.addEventListener('click', e => {
        if (e.target.closest('.js-surprise')) { e.preventDefault(); this.surprise(); return; }
        if (e.target.closest('.js-search')) { e.preventDefault(); this.openSearch(); return; }
        const sh = e.target.closest('.js-share');
        if (sh) { e.preventDefault(); this.share(sh.dataset.title, sh.dataset.id); return; }
        const more = e.target.closest('.js-more');
        if (more) { e.preventDefault(); this.loadMore(); return; }
        const b = e.target.closest('.js-watch, .js-later');
        if (b) { e.preventDefault(); e.stopPropagation(); this.toggle(b.dataset.id, b.classList.contains('js-watch') ? 'watched' : 'toWatch'); }
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { this.closeSearch(); $('#loginModal').classList.remove('open'); }
        if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); this.openSearch(); }
      });
      const toTop = document.getElementById('toTop');
      toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      window.addEventListener('scroll', () => {
        document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 6);
        toTop?.classList.toggle('show', window.scrollY > 600);
      }, { passive: true });
    }
    toggleTheme() {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = next === 'light' ? '#f6f1e7' : '#17140f';
      try { localStorage.setItem('guardalo_theme', next); } catch (e) {}
    }
    async share(title, id) {
      const url = location.origin + '/t/' + id;
      const data = { title: 'GUARDALO — ' + title, text: `${title} — perché guardarlo, da dove iniziare e dove vederlo, su GUARDALO.`, url };
      try {
        if (navigator.share) { await navigator.share(data); return; }
        await navigator.clipboard.writeText(url);
        this.toast('Link copiato negli appunti.', 'ok');
      } catch (e) { /* condivisione annullata: nessun messaggio */ }
    }
    loadMore() {
      const grid = document.getElementById('esploraGrid');
      const btn = document.getElementById('esploraMore');
      if (!grid || !this.esploraAll) return;
      const shown = grid.querySelectorAll('.card').length;
      const next = this.esploraAll.slice(shown, shown + ESPLORA_PAGE);
      grid.insertAdjacentHTML('beforeend', next.map(t => this.card(t)).join(''));
      const remaining = this.esploraAll.length - (shown + next.length);
      if (btn) {
        if (remaining > 0) btn.innerHTML = `<i class="ri-add-line"></i> Mostra altri ${remaining} titoli`;
        else btn.closest('.more-wrap')?.remove();
      }
    }
    openSearch() { const o = $('#searchOverlay'); o.hidden = false; requestAnimationFrame(() => o.classList.add('open')); $('#searchInput').focus(); this.renderSearch(''); }
    closeSearch() { const o = $('#searchOverlay'); o.classList.remove('open'); setTimeout(() => o.hidden = true, 200); $('#searchInput').value = ''; }

    // ── ROUTER ─────────────────────────────────────────────────────────────────
    route() {
      const path = decodeURIComponent(location.pathname || '/');
      const [_, seg, arg, arg2] = path.split('/');
      let html, active = 'home';
      if (seg === 'p' && arg) { html = this.viewPath(arg); active = PERCORSI_IDS.includes(arg) ? 'percorsi' : 'generi'; }
      else if (seg === 'cerca' && arg) { html = this.viewFacet(arg, arg2 || ''); active = 'esplora'; }
      else if (seg === 't' && arg) { html = this.viewTitle(arg); active = ''; }
      else if (seg === 'generi') { html = this.viewGeneri(); active = 'generi'; }
      else if (seg === 'percorsi') { html = this.viewPercorsi(); active = 'percorsi'; }
      else if (seg === 'esplora') { html = this.viewEsplora(); active = 'esplora'; }
      else if (seg === 'tempo' && arg) { html = this.viewTempo(arg); active = 'tempo-' + arg; }
      else if (seg === 'lista') { html = this.viewLista(); active = 'lista'; }
      else if (seg === 'profilo') { html = this.viewProfilo(); active = 'profilo'; }
      else if (seg === 'admin') { html = this.viewAdmin(); active = 'admin'; }
      else if (seg === 'info') { html = this.viewInfo(); active = ''; }
      else if (seg === 'privacy') { html = this.viewPrivacy(); active = ''; }
      else if (seg === 'cookie') { html = this.viewCookie(); active = ''; }
      else { html = this.viewHome(); active = 'home'; }

      const app = $('#app');
      app.innerHTML = html;
      document.querySelectorAll('.side-nav a, .bottom-nav a').forEach(a => { const on = a.dataset.route === active; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
      // ribadisce la visibilità di Gestione/Profilo a ogni navigazione (robustezza)
      const sa = $('#sideAdmin'); if (sa) sa.hidden = !this.isAdmin;
      const ta = $('#topAdmin'); if (ta) ta.hidden = !this.isAdmin;
      const sp = $('#sideProfile'); if (sp) sp.hidden = !this.user;
      window.scrollTo(0, 0);
      this.setMeta(seg, arg);
      this.afterRender(seg);
    }
    // ── SEO: titolo, meta description, Open Graph, JSON-LD per route ──────────────
    setMetaTag(name, content, prop) {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement('meta'); el.setAttribute(prop ? 'property' : 'name', name); document.head.appendChild(el); }
      el.setAttribute('content', content || '');
    }
    setMeta(seg, arg) {
      const BASE = 'GUARDALO';
      let title, desc, img;
      if (seg === 't' && arg && BY_ID.get(arg)) {
        const t = BY_ID.get(arg);
        title = `${t.title}${t.year ? ` (${t.year})` : ''} — dove vederlo e da dove iniziare · ${BASE}`;
        desc = (t.hook || `${t.title}: scheda spoiler-free, dove vederlo, quanto dura.`).slice(0, 158);
        img = cover(t);
      } else if (seg === 'p' && arg && PATHS.find(p => p.id === arg)) {
        const p = PATHS.find(p => p.id === arg);
        title = `${p.title} — i migliori anime del genere · ${BASE}`;
        desc = (p.about || p.blurb || p.tagline || '').slice(0, 158);
      } else if (seg === 'esplora') {
        title = `Esplora tutti gli anime · ${BASE}`;
        desc = 'Tutti gli anime della guida, dal migliore: filtra per genere e per quanto tempo hai.';
      } else if (seg === 'generi') {
        title = `Generi · ${BASE}`;
        desc = 'Tutti i generi: azione, mindfuck, horror, sci-fi, isekai e altro. I migliori anime di ogni categoria.';
      } else if (seg === 'percorsi') {
        title = `Percorsi · ${BASE}`;
        desc = 'Viaggi tematici curati: da dove iniziare, solo capolavori, antieroi e altri percorsi.';
      } else if (seg === 'info') {
        title = `Chi sono · ${BASE}`;
        desc = 'GUARDALO è una guida agli anime creata da Francesco Spidah. Selezione, testi e percorsi sono curatela personale.';
      } else if (seg === 'privacy') {
        title = `Privacy Policy · ${BASE}`;
        desc = 'Come GUARDALO tratta i tuoi dati: navigazione anonima, login opzionale, pubblicità.';
      } else if (seg === 'cookie') {
        title = `Cookie Policy · ${BASE}`;
        desc = 'I cookie usati da GUARDALO e come gestire il consenso.';
      }
      if (!title) {
        title = `${BASE} — La guida agli anime`;
        desc = 'I migliori anime di ogni genere, scelti e spiegati: perché guardarli, da dove iniziare, dove vederli.';
      }
      document.title = title;
      this.setMetaTag('description', desc);
      this.setMetaTag('og:title', title, true);
      this.setMetaTag('og:description', desc, true);
      if (img) this.setMetaTag('og:image', img, true);

      // dati strutturati (rich snippet) sulla scheda titolo
      const old = document.getElementById('ld-json');
      if (old) old.remove();
      if (seg === 't' && arg && BY_ID.get(arg)) {
        const t = BY_ID.get(arg);
        const ld = {
          '@context': 'https://schema.org', '@type': t.typeLabel === 'Film' ? 'Movie' : 'TVSeries',
          name: t.title, image: cover(t) || undefined,
          description: t.hook || undefined,
          ...(t.year ? { datePublished: String(t.year) } : {}),
          genre: (t.genres || []).map(itGenre),
          ...(t.studios && t.studios.length ? { productionCompany: t.studios.map(s => ({ '@type': 'Organization', name: s })) } : {}),
          ...(t.score10 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: t.score10, bestRating: 10, worstRating: 1, ratingCount: Math.max(1, t.popularity || 1) } } : {}),
        };
        const s = document.createElement('script');
        s.type = 'application/ld+json'; s.id = 'ld-json'; s.textContent = JSON.stringify(ld);
        document.head.appendChild(s);
      }
    }
    afterRender(seg) {
      if (seg === 'admin') { this.afterRenderAdmin(); return; }
      if (seg === 'profilo') {
        document.getElementById('profLogin')?.addEventListener('click', () => $('#loginModal').classList.add('open'));
        document.getElementById('profLogout')?.addEventListener('click', () => { if (window.auth) window.auth.signOut().then(() => { this.toast('Sei uscito.', 'muted'); this.go('/'); }).catch(() => {}); });
        return;
      }
      const howClose = document.getElementById('howClose');
      if (howClose) howClose.addEventListener('click', () => {
        try { localStorage.setItem('guardalo_intro', '1'); } catch (e) {}
        document.querySelector('.how')?.remove();
      });
      const pick = document.getElementById('pickFromList');
      if (pick) pick.addEventListener('click', () => {
        const ids = Object.keys(this.toWatch);
        if (ids.length) this.go('/t/' + ids[Math.floor(Math.random() * ids.length)]);
      });
      // ordina / filtra "La mia lista" (Da vedere)
      const lc = document.getElementById('listControls');
      if (lc) lc.addEventListener('click', e => {
        const b = e.target.closest('.lc-btn');
        if (!b) return;
        lc.querySelectorAll('.lc-btn').forEach(x => x.classList.toggle('on', x === b));
        this.listSort = b.dataset.sort;
        this.renderLaterGrid();
      });
      document.getElementById('listGenre')?.addEventListener('change', e => {
        this.listGenre = e.target.value;
        this.renderLaterGrid();
      });
      const heroSearch = document.getElementById('heroSearch');
      if (heroSearch) heroSearch.addEventListener('click', () => this.openSearch());
      // filtro per tempo dentro la pagina categoria (client-side)
      const cf = document.getElementById('catFilter');
      if (cf) cf.addEventListener('click', e => {
        const b = e.target.closest('.cf-chip');
        if (!b) return;
        cf.querySelectorAll('.cf-chip').forEach(c => c.classList.toggle('on', c === b));
        const sel = b.dataset.band;
        const bands = tempoBands(sel);
        document.querySelectorAll('.grid > .card[data-band]').forEach(card => {
          const show = sel === 'all' || bands.includes(card.dataset.band);
          card.style.display = show ? '' : 'none';
        });
        // nasconde le sezioni rimaste vuote
        document.querySelectorAll('.grid').forEach(g => {
          const any = [...g.querySelectorAll('.card[data-band]')].some(c => c.style.display !== 'none');
          const sec = g.closest('section.wrap');
          if (sec && !sec.querySelector('.cat-filter')) sec.style.display = any ? '' : 'none';
        });
      });
    }

    // ── COMPONENTI ──────────────────────────────────────────────────────────────
    lengthScale(t, compact) {
      const idx = bandIndex(t.lengthBand);
      const bars = BANDS.map((b, i) =>
        `<span class="ls-bar ${i <= idx ? 'on' : ''} ls-${t.lengthBand}"></span>`).join('');
      if (compact) return `<span class="lchip ls-${t.lengthBand}" title="${esc(lenLabel(t))} · ${esc(lenHint(t))}"><i class="ri-time-line"></i>${esc(lenLabel(t))}</span>`;
      return `<div class="lscale">
        <div class="ls-bars ls-${t.lengthBand}">${bars}</div>
        <div class="ls-text"><b>${esc(lenLabel(t))}</b><span>${esc(lenHint(t))}</span></div>
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
      const rank = opts.rank ? `<span class="card-rank">${opts.rank}</span>` : '';
      const ess = (!opts.noEss && ESSENTIAL_IDS.has(t.id)) ? `<span class="card-ess"><i class="ri-vip-crown-fill"></i> Essenziale</span>` : '';
      return `<a class="card ${w ? 'is-watched' : ''} ${l ? 'is-later' : ''} ${ess ? 'has-ess' : ''}" data-card="${esc(t.id)}" data-band="${esc(t.lengthBand)}" href="/t/${esc(t.id)}" ${col}>
        <div class="card-poster">
          <img src="${esc(thumb(cover(t)))}" alt="${esc(t.title)}" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">
          ${rank}
          <div class="card-marks">
            <button class="cm js-watch ${w ? 'on' : ''}" data-id="${esc(t.id)}" title="Visto" aria-label="Segna come visto"><i class="ri-check-line"></i></button>
            <button class="cm js-later ${l ? 'on' : ''}" data-id="${esc(t.id)}" title="Da vedere" aria-label="Aggiungi a Da vedere"><i class="ri-bookmark-line"></i></button>
          </div>
          ${w ? '<span class="card-seen"><i class="ri-check-double-line"></i> Visto</span>' : ''}
          <span class="lchip ls-${t.lengthBand}" title="${esc(lenLabel(t))} · ${esc(lenHint(t))}"><i class="ri-time-line"></i>${esc(lenLabel(t))}</span>
        </div>
        <div class="card-body">
          ${ess}
          <div class="card-title">${esc(t.title)}</div>
          <div class="card-sub">
            <div class="card-len ls-${t.lengthBand}"><i class="ri-time-line"></i>${esc(lenLabel(t))}<span class="card-len-hint">· ${esc(lenHint(t))}</span></div>
            <div class="card-meta">${esc(t.year || '')} · ${esc(t.typeLabel)}${t.score10 ? ` · <span class="card-score"><i class="ri-star-fill"></i>${t.score10}</span>` : ''}</div>
          </div>
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
    // tile di un percorso/genere
    pathTile(p) {
      const mem = catTitles(p);
      // hero curata (HERO_OF) → primo membro con banner orizzontale → copertina come ultima spiaggia
      const hero = (HERO_OF[p.id] && BY_ID.get(HERO_OF[p.id])) || mem.find(t => t.bannerImage) || mem.find(t => t.coverImage) || this.pathCovers(p, 1)[0];
      const heroImg = hero ? (hero.bannerImage || cover(hero)) : '';
      return `<a class="path-card" href="/p/${esc(p.id)}" style="--accent:${esc(p.accent)}">
        <div class="path-hero-img">
          ${heroImg ? `<img class="path-1img" src="${esc(heroImg)}" alt="" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">` : ''}
        </div>
        <div class="path-card-body">
          <div class="path-head"><span class="path-ic-wrap"><i class="${esc(p.icon)}"></i></span><h3 class="path-name">${esc(p.title)}</h3></div>
          <p class="path-blurb">${esc(p.blurb || p.tagline)}</p>
          <div class="path-foot">
            <span class="path-levels"><i class="ri-film-line"></i> ${mem.length} titoli</span>
            <span class="path-start">Apri <i class="ri-arrow-right-line"></i></span>
          </div>
        </div>
      </a>`;
    }
    viewHome() {
      const bannerOf = t => t ? (t.bannerImage || cover(t)) : '';
      const bnr = id => bannerOf(BY_ID.get(id));   // banner di un titolo per id
      const feat = (href, ic, title, sub, img) => `
        <a class="path-card" href="${href}" style="--accent:var(--red)">
          <div class="path-hero-img">${img ? `<img class="path-1img" src="${esc(img)}" alt="" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">` : ''}</div>
          <div class="path-card-body">
            <div class="path-head"><span class="path-ic-wrap"><i class="${ic}"></i></span><h3 class="path-name">${title}</h3></div>
            <p class="path-blurb">${sub}</p>
            <div class="path-foot"><span class="path-start">Apri <i class="ri-arrow-right-line"></i></span></div>
          </div>
        </a>`;
      const heroImg = [...TITLES].filter(t => t.inList && t.bannerImage).sort(rankSort)[0] || [...TITLES].filter(t => t.bannerImage).sort(rankSort)[0];
      const genreBrowse = GENRE_PATHS.map(p => this.pathTile(p)).join('');
      const percorsiBrowse = PERCORSI_PATHS.map(p => this.pathTile(p)).join('');
      const facts = pickN(FACTS, 3);
      const H = HOME.hero || {};
      const tempo = HOME.tempo || [];
      const tiles = HOME.tiles || [];
      const firstName = this.user ? esc((this.user.displayName || (this.user.email || '').split('@')[0]).split(' ')[0]) : '';
      // box compatto solo-testo per la home MOBILE (niente immagini)
      const mBox = p => `<a class="hm-box" href="/p/${esc(p.id)}" style="--accent:${esc(p.accent)}"><i class="${esc(p.icon)} hm-box-ic"></i><span class="hm-box-name">${esc(p.title)}</span><span class="hm-box-n">${catTitles(p).length}</span></a>`;
      return `
      <div class="wrap">
        <!-- HOME MOBILE: hero di benvenuto + box generi/percorsi -->
        <div class="home-m">
          <div class="hm-hero">
            ${heroImg ? `<img class="hm-hero-img" src="${esc(heroImg.bannerImage || cover(heroImg))}" alt="" loading="eager" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">` : ''}
            <span class="hm-hero-veil"></span>
            <div class="hm-hero-txt">
              <p class="hm-hi">${firstName ? `Ciao, ${firstName} 👋` : 'Benvenuto su GUARDALO'}</p>
              <h1 class="hm-hero-title">Da dove vuoi partire?</h1>
            </div>
          </div>
          <div class="hm-quick">
            <a class="hm-quick-b" href="/esplora"><i class="ri-compass-3-line"></i> Esplora tutto</a>
            <button class="hm-quick-b ghost js-surprise"><i class="ri-shuffle-line"></i> Sorprendimi</button>
          </div>
          <h2 class="hm-h"><i class="ri-shapes-line"></i> Generi</h2>
          <div class="hm-boxes">${GENRE_PATHS.map(mBox).join('')}</div>
          <h2 class="hm-h"><i class="ri-route-line"></i> Percorsi</h2>
          <div class="hm-boxes">${PERCORSI_PATHS.map(mBox).join('')}</div>
        </div>
        <!-- HOME DESKTOP: invariata -->
        <div class="home-d">
        <div class="home-grid">
          <div class="home-main">
            <section class="home-hero">
              ${heroImg ? `<div class="home-hero-art"><img src="${esc(heroImg.bannerImage || cover(heroImg))}" alt="" loading="eager" onload="this.classList.add('ld')" onerror="this.classList.add('ld')"></div>` : ''}
              <span class="home-hero-veil"></span>
              <div class="home-hero-in">
                <span class="hh-kicker">${this.user ? `<b>Ciao, ${esc((this.user.displayName || (this.user.email || '').split('@')[0]).split(' ')[0])}</b> · ` : ''}${esc(H.kicker || '')}</span>
                <h1 class="hh-title">${esc(H.title || '')}</h1>
                <p class="hh-sub">${esc(H.sub || '')}</p>
                <div class="hh-cta">
                  <a class="btn-red" href="${esc(H.ctaLink || '/esplora')}"><i class="ri-compass-3-line"></i> ${esc(H.ctaText || 'Sfoglia il catalogo')}</a>
                  <button class="hh-btn ghost js-surprise"><i class="ri-shuffle-line"></i> Sorprendimi</button>
                </div>
              </div>
            </section>
          </div>
          <aside class="home-rail">
            <section class="rail-sec rail-tool">
              <div class="rail-h-row"><h3 class="rail-h"><i class="ri-compass-3-line"></i> Aiutami a scegliere</h3></div>
              <p class="rail-q">Quanto tempo hai?</p>
              <div class="rail-times">
                ${tempo.map(t => `<a href="/tempo/${esc(t.key)}"><i class="${esc(t.icon)}"></i> ${esc(t.label)}</a>`).join('')}
              </div>
            </section>
            <section class="rail-sec">
              <div class="rail-h-row"><h3 class="rail-h"><i class="ri-lightbulb-flash-line"></i> Lo sapevi?</h3></div>
              <div class="rail-facts">${facts.map(f => `<p class="rail-fact">${esc(f)}</p>`).join('')}</div>
            </section>
          </aside>
        </div>

        <section class="home-sec home-full">
          <div class="sec-divider"><span class="sd-label"><i class="ri-compass-3-line"></i> Da dove vuoi partire</span><span class="sd-line"></span></div>
          <div class="qgrid">
            ${tiles.map(t => feat(esc(t.link), esc(t.icon), esc(t.title), esc(t.sub), bnr(t.heroSlug))).join('')}
          </div>
        </section>

        <section class="home-sec home-full">
          <div class="sec-divider"><span class="sd-label"><i class="ri-shapes-line"></i> Sfoglia per genere</span><span class="sd-line"></span><a class="sd-count sd-link" href="/generi">Tutti i generi <i class="ri-arrow-right-line"></i></a></div>
          <div class="paths-grid">${genreBrowse}</div>
        </section>

        <section class="home-sec home-full">
          <div class="sec-divider"><span class="sd-label"><i class="ri-route-line"></i> Percorsi guidati</span><span class="sd-line"></span><a class="sd-count sd-link" href="/percorsi">Tutti i percorsi <i class="ri-arrow-right-line"></i></a></div>
          <div class="paths-grid">${percorsiBrowse}</div>
        </section>
        </div>
      </div>`;
    }
    // box "Lo sapevi?" autonomo per le pagine di navigazione (una curiosità a caso)
    factBox() {
      const f = pickN(FACTS, 1)[0];
      return `<div class="page-fact"><i class="ri-lightbulb-flash-line"></i><span><b>Lo sapevi?</b> ${esc(f)}</span></div>`;
    }
    // ── VISTA: GENERI (griglia categorie) ────────────────────────────────────────
    viewGeneri() {
      return `<section class="wrap sec-page">
        <div class="sec-page-head"><h1>Generi</h1><p>${GENRE_PATHS.length} categorie, ognuna una lista ordinata dal migliore.</p></div>
        ${this.factBox()}
        <div class="paths-grid">${GENRE_PATHS.map(p => this.pathTile(p)).join('')}</div>
      </section>`;
    }
    // ── VISTA: PERCORSI (griglia percorsi tematici) ──────────────────────────────
    viewPercorsi() {
      return `<section class="wrap sec-page">
        <div class="sec-page-head"><h1>Percorsi</h1><p>Viaggi tematici curati: dove iniziare, i capolavori, gli antieroi e altro.</p></div>
        ${this.factBox()}
        <div class="paths-grid">${PERCORSI_PATHS.map(p => this.pathTile(p)).join('')}</div>
      </section>`;
    }
    // ── PAGINE STATICHE (doc) ────────────────────────────────────────────────────
    docPage(title, sub, html) {
      return `<section class="wrap doc">
        <a class="back" href="/"><i class="ri-arrow-left-line"></i> Home</a>
        <h1 class="doc-h1">${esc(title)}</h1>
        ${sub ? `<p class="doc-sub">${esc(sub)}</p>` : ''}
        <div class="doc-body">${html}</div>
      </section>`;
    }
    viewInfo() {
      return this.docPage('Chi sono', 'La persona dietro GUARDALO.', `
        <p>GUARDALO è una <b>guida agli anime</b>, non un catalogo: ogni titolo è scelto e spiegato per dirti <i>perché</i> guardarlo, da dove iniziare, quanto ti impegna e dove vederlo. Niente liste a caso, niente spoiler.</p>
        <p>L'ho creata io, <b>Francesco Spidah</b>: selezione, testi e percorsi sono curatela personale. L'obiettivo è far trovare a chiunque l'anime giusto senza perdere ore tra mille schede uguali.</p>
        <h2>I dati</h2>
        <p>Informazioni e copertine provengono da <a href="https://anilist.co" target="_blank" rel="noopener">AniList</a> (usate secondo le loro condizioni). I voti uniscono il dato AniList alla mia selezione editoriale. I titoli e i marchi appartengono ai rispettivi proprietari.</p>
        <h2>Contatti</h2>
        <p>Per segnalazioni, errori o collaborazioni: <a href="mailto:magistaf@gmail.com">magistaf@gmail.com</a>.</p>
        <p class="doc-sign">— Francesco Spidah</p>`);
    }
    viewPrivacy() {
      return this.docPage('Privacy Policy', 'Ultimo aggiornamento: giugno 2026. Modello da personalizzare.', `
        <p><i>Questo è un testo base: adattalo ai servizi che attiverai davvero (analytics, pubblicità) e ai tuoi dati reali prima del lancio.</i></p>
        <h2>Titolare</h2>
        <p>Il titolare del trattamento è <b>Francesco Spidah</b> (contatto: <a href="mailto:magistaf@gmail.com">magistaf@gmail.com</a>).</p>
        <h2>Dati raccolti</h2>
        <p><b>Navigazione anonima:</b> nessun account richiesto. Le tue preferenze (titoli visti/da vedere, tema) sono salvate <b>solo nel tuo browser</b> (localStorage) e non vengono inviate a noi.</p>
        <p><b>Account opzionale (Google):</b> se accedi per sincronizzare i progressi, usiamo Firebase Authentication e Firestore (Google) per salvare la tua lista. Vengono trattati id utente ed email.</p>
        <p><b>Pubblicità e statistiche:</b> se attive, fornitori terzi (es. Google AdSense) possono usare cookie per mostrare annunci pertinenti. Vedi la <a href="/cookie">Cookie Policy</a>.</p>
        <h2>I tuoi diritti (GDPR)</h2>
        <p>Puoi chiedere accesso, rettifica o cancellazione dei tuoi dati scrivendo al contatto sopra. Puoi cancellare i dati locali svuotando i dati del sito dal browser.</p>
        <h2>Terze parti</h2>
        <p>AniList (dati anime), Google Firebase (login/sync opzionale), Google AdSense (pubblicità, se attiva). Ognuno tratta i dati secondo la propria informativa.</p>`);
    }
    viewCookie() {
      return this.docPage('Cookie Policy', 'Ultimo aggiornamento: giugno 2026. Modello da personalizzare.', `
        <p><i>Adatta questo testo ai servizi realmente attivi al lancio.</i></p>
        <h2>Cosa usiamo</h2>
        <p><b>Tecnici / necessari:</b> il sito salva localmente (localStorage) le tue preferenze: titoli visti/da vedere, tema chiaro/scuro, consenso ai cookie. Non servono per profilarti e non si possono disattivare.</p>
        <p><b>Funzionali (opzionali):</b> se accedi con Google, Firebase usa cookie/token per tenerti autenticato.</p>
        <p><b>Pubblicità (opzionali):</b> se attivi Google AdSense, vengono usati cookie di terze parti per annunci e misurazione. Sono soggetti al tuo consenso tramite il banner.</p>
        <h2>Gestire il consenso</h2>
        <p>Puoi accettare o rifiutare i cookie non essenziali dal banner alla prima visita. Puoi cambiare idea cancellando i dati del sito dal browser (il banner ricomparirà).</p>`);
    }

    // ── VISTA: PERCORSO ──────────────────────────────────────────────────────────
    viewPath(id) {
      const p = PATHS.find(x => x.id === id);
      if (!p) return this.notFound();
      const pr = this.pathProgress(p);
      const banner = this.pathCovers(p, 8).map(t =>
        `<span class="phb" style="--cc:${esc(t.coverColor || '#222')}"><img src="${esc(thumbS(t.coverImage))}" alt="" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')"></span>`).join('');
      const hero = `
      <section class="path-hero" style="--accent:${esc(p.accent)}">
        <div class="path-hero-bg">${banner}<span class="path-hero-veil"></span></div>
        <div class="wrap path-hero-content">
          <a class="back" href="/"><i class="ri-arrow-left-line"></i> Home</a>
          <div class="path-hero-in">
            <span class="path-hero-ic-wrap"><i class="${esc(p.icon)}"></i></span>
            <div class="path-hero-txt">
              <h1 class="path-hero-name">${esc(p.title)}</h1>
              <p class="path-hero-blurb">${esc(p.blurb || p.tagline)}</p>
              <div class="path-hero-meta">
                <span>${catTitles(p).length} titoli · ordinati dal migliore</span>
              </div>
            </div>
          </div>
        </div>
      </section>`;

      // ogni percorso/genere: scheda introduttiva + le 3 fasce (per-genere, da categories.json)
      {
        const members = catTitles(p);
        const inTier = code => members.filter(t => tierOf(p.id, t.id) === code).sort(rankSort);
        const essenziali = inTier('e');
        const altriInList = inTier('c');
        const consigliati = inTier('d');
        const noPersonal = !essenziali.length && !altriInList.length; // solo "Da scoprire" → vetrina "I classici"
        const scheda = `
        <section class="wrap cat-intro-wrap">
          <div class="cat-intro" style="--accent:${esc(p.accent)}">
            <span class="cat-intro-ic"><i class="${esc(p.icon)}"></i></span>
            <div class="cat-intro-txt">
              <p class="cat-about">${esc(p.about || p.blurb || p.tagline || '')}</p>
              ${p.curiosita ? `<p class="cat-curio"><b><i class="ri-lightbulb-flash-line"></i> Lo sapevi?</b> ${esc(p.curiosita)}</p>` : ''}
            </div>
          </div>
        </section>`;
        const filterBar = `
        <section class="wrap">
          <div class="cat-filter" id="catFilter">
            <span class="cf-lbl">Quanto tempo hai?</span>
            <button class="cf-chip on" data-band="all">Tutti</button>
            ${TEMPO.map(t => `<button class="cf-chip" data-band="${esc(t.key)}">${esc(t.label)}</button>`).join('')}
          </div>
        </section>`;
        const sec = (label, ic, list, cls) => list.length ? `
          <section class="wrap">
            <div class="sec-divider ${cls || ''}"><span class="sd-label"><i class="${ic}"></i> ${label}</span><span class="sd-line"></span><span class="sd-count">${list.length} titoli</span></div>
            <div class="grid">${list.map(t => this.card(t, { noEss: true })).join('')}</div>
          </section>` : '';
        const body = noPersonal
          ? sec('I classici', 'ri-medal-line', consigliati, 'sd-e')
          : sec('Essenziali', 'ri-vip-crown-fill', essenziali, 'sd-e')
            + sec('Consigliati', 'ri-bookmark-3-line', altriInList, 'sd-c')
            + sec('Da scoprire', 'ri-compass-3-line', consigliati, 'sd-d');
        return hero + scheda + filterBar + body;
      }
    }

    // ── VISTA: TITOLO ────────────────────────────────────────────────────────────
    viewTitle(id) {
      const t = BY_ID.get(id);
      if (!t) return this.notFound();
      const w = this.isWatched(id), l = this.isLater(id);

      const genres = (t.genres || []).map(g => `<a class="g-chip" href="/cerca/genere/${encodeURIComponent(g)}" title="${esc(GENRE_GLOSS[g] || 'Vedi tutti i ' + itGenre(g))}">${esc(itGenre(g))}</a>`).join('');
      const tone = (t.tone || []).map(x => `<a class="t-chip" href="/cerca/tono/${encodeURIComponent(x)}" title="Altri titoli con atmosfera «${esc(x)}»">${esc(x)}</a>`).join('');
      const struct = (t.structure || []);
      const mainSteps = struct.filter(s => s.main);
      const extras = struct.filter(s => !s.main);
      // ogni voce (stagione/film/OVA) è cliccabile: al titolo se è nel sito, altrimenti ricerca su AniList
      const relAnchor = (name, inner, cls) => {
        const m = TITLES.find(x => x.title === name || x.titleNative === name);
        if (m && m.id === t.id) return `<span class="${cls} is-self">${inner}</span>`;   // la serie stessa: non linkare
        return m
          ? `<a class="${cls}" href="/t/${esc(m.id)}">${inner}</a>`
          : `<a class="${cls} is-ext" href="https://anilist.co/search/anime?search=${encodeURIComponent(name)}" target="_blank" rel="noopener nofollow">${inner} <i class="ri-external-link-line"></i></a>`;
      };
      // film/OVA/speciali: se pochi mostrali, se tanti (One Piece = 42) collassali in un menù a scomparsa
      const extraPills = extras.map(s => relAnchor(s.name, esc(s.name), 'se-chip')).join('');
      const extrasHtml = !extras.length ? '' : (extras.length > 6
        ? `<details class="extra-fold"><summary><span class="se-h"><i class="ri-film-line"></i> Film, OVA e speciali <b>(${extras.length})</b></span></summary><div class="se-list">${extraPills}</div></details>`
        : `<div class="struct-extra"><span class="se-h"><i class="ri-film-line"></i> Film, OVA e speciali (${extras.length})</span><div class="se-list">${extraPills}</div></div>`);
      // "Come guardarlo": da dove iniziare + struttura + film/OVA (raggruppati)
      const structInner = struct.length ? `
          ${mainSteps.length ? `<ol class="struct">${mainSteps.map(s => `<li>${relAnchor(s.name, `<span class="st-name">${esc(s.name)}</span><span class="st-ep">${esc(s.episodes)}${s.year ? ` · ${s.year}` : ''}</span>`, 'st-row')}</li>`).join('')}</ol>` : ''}
          ${extrasHtml}` : '';
      // "Buono a sapersi" (note pratiche) va DENTRO il box "Di cosa parla", non come box a sé
      const tipsInner = (t.tips && t.tips.length) ? `
          <div class="t-tips">
            <span class="t-tips-h"><i class="ri-lightbulb-flash-line"></i> Buono a sapersi</span>
            <ul>${t.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>` : '';
      const watchBody = (struct.length || t.startFrom) ? `
          ${t.startFrom ? `<p class="t-startfrom"><b>Da dove iniziare:</b> <em>${esc(t.startFrom)}</em></p>` : ''}
          ${structInner}` : '';

      const streaming = (t.streaming || []);
      const jwUrl = `https://www.justwatch.com/it/cerca?q=${encodeURIComponent(t.title)}`;
      // Affiliazione: sostituisci AMAZON_TAG con il tuo id Amazon Associates al lancio.
      const azUrl = `https://www.amazon.it/s?k=${encodeURIComponent(t.title + ' anime')}&tag=AMAZON_TAG`;
      const streamBody = `
          <p class="t-legal"><span class="legal-pill">solo legale</span></p>
          ${streaming.length
            ? `<div class="streams">${streaming.map(s => `<a class="stream" href="${esc(s.url)}" target="_blank" rel="noopener nofollow"><i class="ri-external-link-line"></i> ${esc(s.name)}</a>`).join('')}</div>
               <p class="muted-line">Le piattaforme possono variare per regione. <a href="${esc(jwUrl)}" target="_blank" rel="noopener nofollow">Verifica la disponibilità in Italia (JustWatch) →</a></p>`
            : `<p class="muted-line">Nessuna piattaforma segnalata da AniList per questa regione. <a href="${esc(jwUrl)}" target="_blank" rel="noopener nofollow">Cerca dove vederlo in Italia (JustWatch) →</a></p>`}
          <p class="muted-line shop-line"><i class="ri-shopping-bag-line"></i> Manga, Blu-ray e gadget: <a href="${esc(azUrl)}" target="_blank" rel="noopener sponsored nofollow">cerca «${esc(t.title)}» su Amazon →</a></p>`;

      const recs = this.recsSections(t);

      // dati cliccabili → portano alla ricerca correlata (/cerca/<campo>/<valore>)
      const fLink = (field, val) => `<a class="cr-link" href="/cerca/${field}/${encodeURIComponent(val)}">${esc(val)}</a>`;
      const credits = [
        t.studios?.length ? ['Studio', t.studios.map(s => fLink('studio', s)).join(', ')] : null,
        t.director ? ['Regia', fLink('regista', t.director)] : null,
        t.creator ? ['Opera originale', fLink('autore', t.creator)] : null,
        t.sourceLabel ? ['Tratto da', esc(t.sourceLabel)] : null,
      ].filter(Boolean).map(([k, v]) => `<div class="cr"><span>${k}</span><b>${v}</b></div>`).join('');

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
              <button class="t-btn ghost js-share" data-id="${esc(t.id)}" data-title="${esc(t.title)}"><i class="ri-share-forward-line"></i> Condividi</button>
            </div>
            ${credits ? this.tFold('credits', 'ri-information-line', 'Scheda tecnica', `<div class="t-credits">${credits}</div>`, false) : ''}
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

            ${(genres || tone) ? `<div class="t-tags">${genres}${tone}</div>` : ''}

            ${this.tFold('about', 'ri-file-text-line', 'Di cosa parla', `
              <p>${esc(t.hook || 'Scheda in arrivo.')}</p>
              ${t.forWho ? `<p class="t-forwho"><b>Per chi è:</b> ${esc(t.forWho)}</p>` : ''}
              ${tipsInner}`, true)}
            ${watchBody ? this.tFold('watch', 'ri-list-ordered', 'Come guardarlo', watchBody, false) : ''}
            ${this.tFold('stream', 'ri-play-circle-line', 'Dove vederlo', streamBody, false)}
            ${recs ? this.tFold('recs', 'ri-heart-3-line', 'Ti potrebbe piacere', recs, false) : ''}
          </div>
        </div>
      </article>`;
    }
    // sezione a fisarmonica (richiudibile su mobile, sempre aperta su desktop)
    tFold(kind, icon, title, body, open) {
      return `<details class="t-fold t-fold-${kind}"${open ? ' open' : ''}>
          <summary class="t-fold-h"><i class="${icon}"></i> <span>${title}</span></summary>
          <div class="t-fold-body">${body}</div>
        </details>`;
    }

    recsSections(t) {
      const r = t.recommendations || {};
      const seen = new Set([t.id]);
      const take = arr => (arr || []).filter(x => { const id = x.id || x; if (seen.has(id)) return false; seen.add(id); return true; });
      // "Se ti è piaciuto" raccoglie i consigli AniList + gli affini per atmosfera
      const simili = take([...(r.simili || []), ...(r.affin || [])]).slice(0, 12);
      const saga = take(r.saga).slice(0, 12);
      const autore = take(r.autore).slice(0, 12);
      const studio = take(r.studio).slice(0, 12);
      const blocks = [
        ['Se ti è piaciuto questo', 'ri-heart-3-line', simili, true],
        ['Stessa saga', 'ri-links-line', saga, false],
        ['Stesso autore o regista', 'ri-user-star-line', autore, true],
        ['Dallo stesso studio', 'ri-building-line', studio, true],
      ];
      return blocks.map(([label, ic, list, why]) => list.length ? `<div class="t-sec">
          <h3 class="t-sec-h"><i class="${ic}"></i> ${label}</h3>
          ${this.row(list, { why })}
        </div>` : '').join('');
    }

    // griglia paginata riusabile: primi ESPLORA_PAGE + bottone "Mostra altri"
    pagedGrid(list) {
      this.esploraAll = list;
      return `<div class="grid" id="esploraGrid">${list.slice(0, ESPLORA_PAGE).map(t => this.card(t)).join('')}</div>
        ${list.length > ESPLORA_PAGE ? `<div class="more-wrap"><button class="btn-ghost js-more" id="esploraMore"><i class="ri-add-line"></i> Mostra altri ${list.length - ESPLORA_PAGE} titoli</button></div>` : ''}`;
    }
    // ── VISTA: ESPLORA (pulita: tempo + generi + tutto dal migliore) ─────────────
    viewEsplora() {
      const all = [...TITLES].sort(rankSort);
      const genreChips = GENRE_PATHS.map(p =>
        `<a class="genre-chip" href="/p/${esc(p.id)}" style="--accent:${esc(p.accent)}"><i class="${esc(p.icon)}"></i>${esc(p.title)}</a>`).join('');
      return `
      <section class="wrap esplora-head">
        <h1>Esplora</h1>
        <p>Tutti i titoli, dal migliore. Salta a un genere o scegli quanto tempo hai. <button class="link-btn" id="esploraSearch">o cerca un titolo →</button></p>
        <div class="time-chips">
          <span class="time-chips-lbl">Quanto tempo hai?</span>
          ${TEMPO.map(t => `<a class="time-chip" href="/tempo/${esc(t.key)}">${esc(t.label)}</a>`).join('')}
        </div>
        <div class="genre-chips">${genreChips}</div>
        ${this.factBox()}
      </section>
      <section class="wrap">
        <div class="sec-head sub"><h2><i class="ri-trophy-line"></i> Tutti, dal migliore</h2><span class="sec-count">${all.length} titoli</span></div>
        ${this.pagedGrid(all)}
      </section>`;
    }

    // ── VISTA: RICERCA CORRELATA (studio/regista/autore/genere/tema cliccabili) ──
    viewFacet(field, value) {
      const FIELDS = {
        studio:  { label: 'Studio',     show: v => v, match: t => (t.studios || []).includes(value) },
        regista: { label: 'Regia di',   show: v => v, match: t => t.director === value },
        autore:  { label: 'Opera di',   show: v => v, match: t => t.creator === value },
        tag:     { label: 'Tema',       show: v => v, match: t => (t.tags || []).includes(value) },
        tono:    { label: 'Atmosfera',  show: v => v, match: t => (t.tone || []).includes(value) },
        genere:  { label: 'Genere',     show: v => itGenre(v), match: t => (t.genres || []).includes(value) },
      };
      const f = FIELDS[field];
      if (!f || !value) return this.notFound();
      const list = TITLES.filter(f.match).sort(rankSort);
      const head = `<section class="wrap esplora-head">
        <a class="back" href="javascript:history.back()"><i class="ri-arrow-left-line"></i> Indietro</a>
        <h1><span class="facet-kind">${esc(f.label)}</span> ${esc(f.show(value))}</h1>
        <p>${list.length ? `${list.length} ${list.length === 1 ? 'titolo' : 'titoli'} nel catalogo, dal migliore.` : 'Nessun titolo trovato per questo.'}</p>
      </section>`;
      return head + (list.length ? `<section class="wrap">${this.pagedGrid(list)}</section>` : '');
    }

    // ── VISTA: LA MIA LISTA ──────────────────────────────────────────────────────
    laterSort(list, mode) {
      const arr = [...list];
      if (mode === 'voto') arr.sort((a, b) => (b.score10 || 0) - (a.score10 || 0));
      else if (mode === 'az') arr.sort((a, b) => a.title.localeCompare(b.title));
      else arr.sort((a, b) => BANDS.indexOf(a.lengthBand) - BANDS.indexOf(b.lengthBand));
      return arr;
    }
    renderLaterGrid() {
      const wrap = document.getElementById('laterGrid');
      if (!wrap) return;
      let list = Object.keys(this.toWatch).map(id => BY_ID.get(id)).filter(Boolean);
      if (this.listGenre) list = list.filter(t => (t.genres || []).includes(this.listGenre));
      list = this.laterSort(list, this.listSort || 'durata');
      const cnt = document.getElementById('laterCount');
      if (cnt) cnt.textContent = `${list.length} ${list.length === 1 ? 'titolo' : 'titoli'}`;
      wrap.innerHTML = list.length
        ? `<div class="grid">${list.map(t => this.card(t)).join('')}</div>`
        : `<div class="empty mini"><i class="ri-filter-off-line"></i><p>Nessun titolo «da vedere» con questo filtro.</p></div>`;
    }
    viewLista() {
      this.listSort = 'durata'; this.listGenre = '';
      const watched = Object.keys(this.watched).map(id => BY_ID.get(id)).filter(Boolean).sort((a, b) => (b.score10 || 0) - (a.score10 || 0));
      const later = this.laterSort(Object.keys(this.toWatch).map(id => BY_ID.get(id)).filter(Boolean), 'durata');
      const hours = watched.reduce((s, t) => s + (t.coreMinutes || 0), 0) / 60;

      const grid = list => `<div class="grid">${list.map(t => this.card(t)).join('')}</div>`;
      const empty = (ic, msg) => `<div class="empty"><i class="${ic}"></i><p>${msg}</p><a class="btn-ghost" href="/percorsi">Vai ai percorsi</a></div>`;

      const genreSet = [...new Set(later.flatMap(t => t.genres || []))].sort((a, b) => itGenre(a).localeCompare(itGenre(b)));
      const controls = later.length > 1 ? `
        <div class="list-controls" id="listControls">
          <div class="lc-sort" role="group" aria-label="Ordina i titoli da vedere">
            <button class="lc-btn on" data-sort="durata"><i class="ri-time-line"></i> Più corti</button>
            <button class="lc-btn" data-sort="voto"><i class="ri-star-line"></i> Voto</button>
            <button class="lc-btn" data-sort="az"><i class="ri-sort-asc"></i> A-Z</button>
          </div>
          ${genreSet.length > 1 ? `<select class="lc-genre" id="listGenre" aria-label="Filtra per genere"><option value="">Tutti i generi</option>${genreSet.map(g => `<option value="${esc(g)}">${esc(itGenre(g))}</option>`).join('')}</select>` : ''}
        </div>` : '';

      return `
      <section class="wrap">
        <div class="sec-head"><h1>La mia lista</h1>
          ${later.length ? `<button class="btn-ghost" id="pickFromList"><i class="ri-dice-line"></i> Scegli per me</button>` : ''}</div>
        <div class="list-stats">
          <div class="ls-stat"><b>${watched.length}</b><span>visti</span></div>
          <div class="ls-stat"><b>${later.length}</b><span>da vedere</span></div>
          <div class="ls-stat"><b>${Math.round(hours)}h</b><span>guardate</span></div>
        </div>
        <div class="sec-head sub"><h2><i class="ri-bookmark-line"></i> Da vedere</h2>${later.length ? `<span class="sec-count" id="laterCount">${later.length} titoli</span>` : ''}</div>
        ${controls}
        ${later.length ? `<div id="laterGrid">${grid(later)}</div>` : empty('ri-bookmark-line', 'Niente ancora in lista. Sfoglia i percorsi e salva cosa ti incuriosisce.')}
        <div class="sec-head sub"><h2><i class="ri-check-double-line"></i> Visti</h2></div>
        ${watched.length ? grid(watched) : empty('ri-check-double-line', 'Segna i titoli che hai già visto.')}
      </section>`;
    }

    // ── VISTA: PROFILO ───────────────────────────────────────────────────────────
    viewProfilo() {
      if (!this.user) {
        return `<section class="wrap prof-gate">
          <span class="prof-gate-ic"><i class="ri-user-3-line"></i></span>
          <h1>Il tuo profilo</h1>
          <p>Accedi per ritrovare la tua lista su ogni dispositivo e vedere le tue statistiche.</p>
          <button class="btn-red" id="profLogin"><i class="ri-google-fill"></i> Accedi con Google</button>
        </section>`;
      }
      const watched = Object.keys(this.watched).map(id => BY_ID.get(id)).filter(Boolean);
      const later = Object.keys(this.toWatch).map(id => BY_ID.get(id)).filter(Boolean);
      const hours = Math.round(watched.reduce((s, t) => s + (t.coreMinutes || 0), 0) / 60);
      const gc = {};
      watched.forEach(t => (t.genres || []).forEach(g => gc[g] = (gc[g] || 0) + 1));
      const topG = Object.entries(gc).sort((a, b) => b[1] - a[1]).slice(0, 6);
      const maxG = topG.length ? topG[0][1] : 1;
      const name = this.user.displayName || (this.user.email || 'Tu').split('@')[0];
      const photo = this.user.photoURL;
      const avatar = photo ? `<img class="prof-avatar" src="${esc(photo)}" alt="" referrerpolicy="no-referrer" onerror="this.style.display='none'">` : `<span class="prof-avatar prof-avatar-ph">${esc((name[0] || 'U').toUpperCase())}</span>`;
      const best = watched.slice().sort((a, b) => (b.score10 || 0) - (a.score10 || 0)).slice(0, 12);
      return `
      <section class="wrap profilo">
        <div class="prof-head">
          ${avatar}
          <div class="prof-id"><h1>Ciao, ${esc(name)}</h1><span>${esc(this.user.email || '')}</span></div>
          <button class="btn-ghost prof-logout" id="profLogout"><i class="ri-logout-box-r-line"></i> Esci</button>
        </div>
        <div class="prof-stats">
          <div class="pstat"><b>${watched.length}</b><span>visti</span></div>
          <div class="pstat"><b>${later.length}</b><span>da vedere</span></div>
          <div class="pstat"><b>${hours}h</b><span>guardate</span></div>
          <div class="pstat"><b>${Object.keys(gc).length}</b><span>generi</span></div>
        </div>
        ${topG.length ? `<div class="sec-head sub"><h2><i class="ri-shapes-line"></i> I tuoi generi preferiti</h2></div>
          <div class="prof-genres">${topG.map(([g, n]) => `<div class="pgen"><span class="pgen-name">${esc(itGenre(g))}</span><span class="pgen-bar"><span style="width:${Math.round(n / maxG * 100)}%"></span></span><span class="pgen-n">${n}</span></div>`).join('')}</div>` : ''}
        ${watched.length
          ? `<div class="sec-head sub"><h2><i class="ri-check-double-line"></i> I tuoi visti, dal migliore</h2><a class="sec-count sd-link" href="/lista">tutta la lista <i class="ri-arrow-right-line"></i></a></div>
             <div class="grid">${best.map(t => this.card(t)).join('')}</div>`
          : `<div class="empty"><i class="ri-compass-3-line"></i><p>Non hai ancora segnato titoli come visti. Esplora e segna cosa hai guardato!</p><a class="btn-ghost" href="/esplora">Esplora</a></div>`}
      </section>`;
    }

    // ── VISTA: QUANTO TEMPO HAI ──────────────────────────────────────────────────
    viewTempo(band) {
      const m = TEMPO.find(t => t.key === band);
      if (!m) return this.notFound();
      const list = TITLES.filter(t => (m.bands || []).includes(t.lengthBand)).sort((a, b) => (b.score10 || 0) - (a.score10 || 0));
      const chips = TEMPO.map(v =>
        `<a class="time-chip ${v.key === band ? 'on' : ''}" href="/tempo/${esc(v.key)}">${esc(v.label)}</a>`).join('');
      return `
      <section class="wrap esplora-head">
        <a class="back" href="/esplora"><i class="ri-arrow-left-line"></i> Esplora</a>
        <h1>Quanto tempo hai?</h1>
        <div class="time-chips">${chips}</div>
        <p>${esc(m.sub)} · ${list.length} titoli, dal più votato.</p>
      </section>
      <section class="wrap"><div class="grid">${list.map(t => this.card(t)).join('')}</div></section>`;
    }

    // ════════════════════════════════════════════════════════════════════════
    // ADMIN — pannello di gestione (solo magistaf@gmail.com). Le modifiche sono
    // in memoria con anteprima dal vivo; "Esporta" scarica i file da committare.
    // ════════════════════════════════════════════════════════════════════════
    viewAdmin() {
      if (!this.isAdmin) {
        return `<section class="wrap admin-gate">
          <span class="admin-gate-ic"><i class="ri-lock-2-line"></i></span>
          <h1>Pannello riservato</h1>
          ${this.user
            ? `<p>Sei loggato come <b>${esc(this.user.email)}</b>, che non è l'account amministratore.</p>`
            : `<p>Accedi con l'account amministratore per gestire generi, titoli e liste.</p>
               <button class="btn-red" id="adminLoginBtn"><i class="ri-google-fill"></i> Accedi</button>`}
        </section>`;
      }
      const tab = this.adminTab || 'generi';
      return `<section class="wrap admin">
        <div class="admin-bar">
          <h1><i class="ri-tools-fill"></i> Gestione</h1>
          <div class="admin-tabs">
            <button class="atab ${tab === 'generi' ? 'on' : ''}" data-atab="generi">Generi e percorsi</button>
            <button class="atab ${tab === 'titoli' ? 'on' : ''}" data-atab="titoli">Titoli</button>
            <button class="atab ${tab === 'home' ? 'on' : ''}" data-atab="home">Home</button>
            <button class="atab ${tab === 'aggiungi' ? 'on' : ''}" data-atab="aggiungi">Aggiungi</button>
          </div>
          <div class="admin-bar-r">
            ${this.adminDirty ? '<span class="admin-dirty">modifiche non esportate</span>' : ''}
            <button class="btn-red" data-aact="export"><i class="ri-download-2-line"></i> Esporta</button>
          </div>
        </div>
        <div id="adminBody">${this.adminBody(tab)}</div>
      </section>`;
    }
    adminBody(tab) {
      if (tab === 'titoli') return this.adminTitoli();
      if (tab === 'aggiungi') return this.adminAggiungi();
      if (tab === 'home') return this.adminHome();
      return this.adminGeneri();
    }
    adminMembersArr(id) {
      const cat = window.GUARDALO.categories || {};
      return (cat.members && cat.members[id]) || null;   // membri di generi E percorsi (fonte unica)
    }
    // ── tab HOME: hero, scorciatoie, "Lo sapevi", liste tempo (editorial/home.json) ──
    adminHome() {
      const h = window.GUARDALO.home || (window.GUARDALO.home = {});
      const hero = h.hero || (h.hero = {});
      const f = (path, val, label, ta) => `<label class="ah-field"><span>${esc(label)}</span>${ta ? `<textarea data-hset="${path}" rows="2">${esc(val || '')}</textarea>` : `<input data-hset="${path}" value="${esc(val || '')}" autocomplete="off">`}</label>`;
      const tiles = (h.tiles || []).map((t, i) => `<div class="ah-card">
        ${f(`tiles.${i}.title`, t.title, 'Titolo')}${f(`tiles.${i}.sub`, t.sub, 'Sottotitolo')}
        ${f(`tiles.${i}.link`, t.link, 'Link (es. /p/seinen-e-maturo, /tempo/sera)')}${f(`tiles.${i}.icon`, t.icon, 'Icona (es. ri-skull-line)')}
        ${f(`tiles.${i}.heroSlug`, t.heroSlug, 'Immagine: slug di un titolo')}
        <button class="amr-rm ah-del" data-aact="rmtile" data-i="${i}"><i class="ri-close-line"></i> togli scorciatoia</button>
      </div>`).join('');
      const facts = (h.facts || []).map((x, i) => `<div class="ah-row"><textarea data-hset="facts.${i}" rows="2">${esc(x)}</textarea><button class="amr-rm" data-aact="rmfact" data-i="${i}"><i class="ri-close-line"></i></button></div>`).join('');
      const tempo = (h.tempo || []).map((t, i) => `<div class="ah-card"><span class="ah-key">${esc(t.key)}</span>
        ${f(`tempo.${i}.label`, t.label, 'Etichetta')}${f(`tempo.${i}.sub`, t.sub, 'Sottotitolo')}
        ${f(`tempo.${i}.bands`, (t.bands || []).join(', '), 'Fasce: cortissimo, corto, medio, lungo, lunghissimo')}</div>`).join('');
      return `
        <h3 class="ah-h">Hero (testa della home)</h3>
        ${f('hero.kicker', hero.kicker, 'Sopra-titolo')}${f('hero.title', hero.title, 'Titolo grande', true)}${f('hero.sub', hero.sub, 'Sottotitolo', true)}
        <div class="ah-two">${f('hero.ctaText', hero.ctaText, 'Bottone: testo')}${f('hero.ctaLink', hero.ctaLink, 'Bottone: link')}</div>
        <h3 class="ah-h">Scorciatoie «Da dove vuoi partire» <button class="ah-add" data-aact="addtile"><i class="ri-add-line"></i> aggiungi</button></h3>
        <div class="ah-grid">${tiles}</div>
        <h3 class="ah-h">«Lo sapevi?» (${(h.facts || []).length} curiosità) <button class="ah-add" data-aact="addfact"><i class="ri-add-line"></i> aggiungi</button></h3>
        <div class="ah-facts">${facts}</div>
        <h3 class="ah-h">«Quanto tempo hai?»</h3>
        <div class="ah-grid">${tempo}</div>`;
    }
    adminHomeSet(path, value) {
      const h = window.GUARDALO.home || (window.GUARDALO.home = {});
      const parts = path.split('.');
      let o = h;
      for (let i = 0; i < parts.length - 1; i++) { const k = parts[i]; o = o[k] = o[k] || (/^\d+$/.test(parts[i + 1]) ? [] : {}); }
      if (path.endsWith('.bands')) value = value.split(',').map(s => s.trim()).filter(Boolean);
      o[parts[parts.length - 1]] = value;
      this.adminDirty = true;
    }
    adminGeneri() {
      const cat = window.GUARDALO.categories || {};
      const genres = cat.genreOrder || [], percorsi = cat.percorsoOrder || [];
      const ids = [...genres, ...percorsi];
      const sel = this.adminGen && ids.includes(this.adminGen) ? this.adminGen : ids[0];
      this.adminGen = sel;
      const nameOf = id => (PATHS.find(p => p.id === id) || {}).title || id;
      const optFor = id => `<option value="${esc(id)}" ${id === sel ? 'selected' : ''}>${esc(nameOf(id))}</option>`;
      const opts = `<optgroup label="Generi">${genres.map(optFor).join('')}</optgroup><optgroup label="Percorsi">${percorsi.map(optFor).join('')}</optgroup>`;
      const tOrder = { e: 0, c: 1, d: 2 }, tLabel = { e: 'Essenziale', c: 'Consigliato', d: 'Da scoprire' };
      const mem = (cat.members[sel] || []).map(s => BY_ID.get(s)).filter(Boolean)
        .sort((a, b) => (tOrder[tierOf(sel, a.id)] - tOrder[tierOf(sel, b.id)]) || rankSort(a, b));
      const hero = (cat.hero || {})[sel] || '';
      const cnt = { e: 0, c: 0, d: 0 }; mem.forEach(t => cnt[tierOf(sel, t.id)]++);
      this._admCnt = cnt;
      const tierBtns = t => ['e', 'c', 'd'].map(code =>
        `<button data-aact="tier" data-tier="${code}" data-slug="${esc(t.id)}" class="atier atier-${code} ${tierOf(sel, t.id) === code ? 'on' : ''}" title="${tLabel[code]}">${code.toUpperCase()}</button>`).join('');
      const rows = mem.map(t => `
        <li class="tr-${tierOf(sel, t.id)}">
          <img src="${esc(thumbS(t.coverImage))}" alt="" loading="lazy">
          <span class="amr-t">${esc(t.title)}${t.inList ? '' : '<span class="amr-extra">aggiunto</span>'}</span>
          <span class="amr-tier">${tierBtns(t)}</span>
          <button data-aact="hero" data-slug="${esc(t.id)}" class="amr-hero ${hero === t.id ? 'on' : ''}" title="Immagine hero del genere"><i class="ri-image-line"></i></button>
          <button data-aact="rm" data-slug="${esc(t.id)}" class="amr-rm" title="Togli dal genere"><i class="ri-close-line"></i></button>
        </li>`).join('');
      const path = PATHS.find(p => p.id === sel) || {};
      const pf = (k, label, ta) => `<label class="ah-field"><span>${esc(label)}</span>${ta ? `<textarea data-pset="${k}" rows="2">${esc(path[k] || '')}</textarea>` : `<input data-pset="${k}" value="${esc(path[k] || '')}" autocomplete="off">`}</label>`;
      const metaBlock = `<details class="admin-meta">
        <summary><i class="ri-edit-2-line"></i> Testi e stile di «${esc(nameOf(sel))}»</summary>
        <div class="ah-two">${pf('title', 'Titolo della sezione')}${pf('icon', 'Icona (es. ri-sword-line)')}</div>
        ${pf('blurb', 'Frase breve (mostrata nella griglia)')}
        ${pf('about', 'Descrizione (in cima alla pagina)', true)}
        ${pf('curiosita', '«Lo sapevi?» della sezione', true)}
        <div class="ah-two">${pf('accent', 'Colore accento (es. #b4542c)')}<label class="ah-field"><span>Anteprima colore</span><span class="ah-swatch" style="background:${esc(path.accent || '#ccc')}"></span></label></div>
      </details>`;
      return `
        <div class="admin-pick">
          <label>Sezione: <select id="adminGenSel">${opts}</select></label>
          <span class="admin-count">${mem.length} titoli · <b class="t-e">${this._admCnt.e} Essenziali</b> · <b class="t-c">${this._admCnt.c} Consigliati</b> · <b class="t-d">${this._admCnt.d} Da scoprire</b> · hero: <b>${esc(hero ? (BY_ID.get(hero)?.title || hero) : '—')}</b></span>
        </div>
        <div class="admin-struct">
          <span class="admin-struct-lbl">Struttura:</span>
          <button data-aact="secup" title="Sposta su nella griglia"><i class="ri-arrow-up-line"></i></button>
          <button data-aact="secdown" title="Sposta giù nella griglia"><i class="ri-arrow-down-line"></i></button>
          <button class="ah-add" data-aact="secnew"><i class="ri-add-line"></i> Nuova sezione</button>
          <button class="amr-rm admin-struct-del" data-aact="secdel"><i class="ri-delete-bin-line"></i> Elimina «${esc(nameOf(sel))}»</button>
        </div>
        ${this.adminNewSec ? `<div class="admin-newsec">
          <input id="adminNewSecTitle" placeholder="Nome della nuova sezione (es. Sportivo)" autocomplete="off">
          <select id="adminNewSecKind"><option value="genere">Genere</option><option value="percorso">Percorso</option></select>
          <button class="btn-red" data-aact="seccreate">Crea</button>
        </div>` : ''}
        ${metaBlock}
        <p class="admin-hint">Clicca <b>E</b>/<b>C</b>/<b>D</b> per mettere ogni titolo in Essenziali, Consigliati o Da scoprire <i>in questa sezione</i>. <i class="ri-image-line"></i> = immagine hero · <i class="ri-close-line"></i> = togli.</p>
        <div class="admin-addrow">
          <input id="adminAddMember" placeholder="Aggiungi un titolo a «${esc(nameOf(sel))}»…" autocomplete="off">
          <div id="adminAddSug" class="admin-sug"></div>
        </div>
        <ol class="admin-members">${rows || '<li class="amr-empty">Nessun titolo in questa sezione.</li>'}</ol>`;
    }
    adminMemberSug(q) {
      if (!q) return '';
      const inGen = new Set((window.GUARDALO.categories.members[this.adminGen]) || []);
      const hits = TITLES.filter(t => !inGen.has(t.id) && (t.title.toLowerCase().includes(q) || (t.titleRomaji || '').toLowerCase().includes(q))).slice(0, 7);
      return hits.map(t => `<button data-aact="addmem" data-slug="${esc(t.id)}">${esc(t.title)}${t.year ? ` <span>(${t.year})</span>` : ''}</button>`).join('') || '<span class="admin-hint">nessun risultato</span>';
    }
    adminTitoli() {
      const sel = this.adminTitle ? BY_ID.get(this.adminTitle) : null;
      return `
        <div class="admin-addrow">
          <input id="adminTSearch" placeholder="Cerca un titolo da modificare…" value="${esc(this.adminTQ || '')}" autocomplete="off">
          <div id="adminTList" class="admin-sug">${this.adminTitleList((this.adminTQ || '').toLowerCase().trim())}</div>
        </div>
        <div id="adminTEditor" class="admin-editor">${sel ? this.adminTitleEditor(sel) : '<p class="admin-hint">Cerca e scegli un titolo per modificarne top, voto e generi.</p>'}</div>`;
    }
    adminTitleList(q) {
      if (!q) return '';
      const hits = TITLES.filter(t => t.title.toLowerCase().includes(q) || (t.titleRomaji || '').toLowerCase().includes(q)).slice(0, 8);
      return hits.map(t => `<button data-aact="pick" data-slug="${esc(t.id)}">${esc(t.title)}${t.inList ? '' : ' <span>aggiunto</span>'}</button>`).join('') || '<span class="admin-hint">nessun risultato</span>';
    }
    adminTitleEditor(t) {
      const cat = window.GUARDALO.categories || {};
      const chip = id => { const inIt = ((cat.members[id]) || []).includes(t.id); return `<button class="agchip ${inIt ? 'on' : ''}" data-aact="togglegen" data-gen="${esc(id)}" data-slug="${esc(t.id)}">${esc((PATHS.find(p => p.id === id) || {}).title || id)}</button>`; };
      const genres = (cat.genreOrder || []).map(chip).join('');
      const percorsi = (cat.percorsoOrder || []).map(chip).join('');
      return `
        <div class="admin-te-head">
          <img src="${esc(thumbS(t.coverImage))}" alt="" loading="lazy">
          <div><h3>${esc(t.title)}</h3><span>${t.year || ''} · ${esc(t.typeLabel)} · AniList ${t.score10 || '—'}</span></div>
        </div>
        <div class="admin-te-row">
          <label class="aswitch"><input type="checkbox" data-aact="inlist" data-slug="${esc(t.id)}" ${t.inList ? 'checked' : ''}> Nella tua lista</label>
          <label class="arate">Tuo voto <input type="number" min="0" max="10" step="0.1" value="${t.userRating ?? ''}" data-aact="rate" data-slug="${esc(t.id)}" placeholder="—"></label>
        </div>
        <div class="admin-te-genres"><span class="admin-te-lbl">Generi (clicca per aggiungere/togliere — la fascia E/C/D si imposta nel tab «Generi e percorsi»):</span><div class="agchips">${genres}</div></div>
        <div class="admin-te-genres"><span class="admin-te-lbl">Percorsi:</span><div class="agchips">${percorsi}</div></div>`;
    }
    adminAggiungi() {
      const pend = (this.adminPending || []).map((p, i) => `<li>${p.coverImage ? `<img src="${esc(p.coverImage)}" alt="">` : ''}<span>${esc(p.title)}${p.year ? ` (${p.year})` : ''}${p.anilistId ? ` <span class="apend-id">AniList #${p.anilistId}</span>` : ''}</span> <button data-aact="rmpend" data-i="${i}"><i class="ri-close-line"></i></button></li>`).join('');
      const has = this.adminPending && this.adminPending.length;
      return `
        <p class="admin-hint">Cerca il titolo su <b>AniList</b> (dati reali, stesso criterio di adesso), aggiungilo alla coda, poi esporta.</p>
        <div class="admin-addrow">
          <input id="adminAniSearch" placeholder="Cerca un anime su AniList… (es. Frieren)" autocomplete="off">
          <div id="adminAniSug" class="admin-sug ani-sug"></div>
        </div>
        <ul class="admin-pend">${pend || '<li class="amr-empty">Nessun titolo in coda.</li>'}</ul>
        ${has ? `<p class="admin-hint">Dopo l'export (<code>seed-da-aggiungere.json</code>): metti gli id in <code>tools/seed-titles.json</code> + <code>MANUAL_MAP</code>, poi <code>npm run fetch &amp;&amp; npm run gen</code>, infine la scheda in <code>editorial/titles.json</code>.</p>` : ''}`;
    }
    async adminAniSearch(q) {
      const query = `query($s:String){Page(perPage:7){media(search:$s,type:ANIME,sort:SEARCH_MATCH){id title{english romaji} startDate{year} format coverImage{medium}}}}`;
      try {
        const res = await fetch('https://graphql.anilist.co', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ query, variables: { s: q } }) });
        const j = await res.json();
        return (j.data && j.data.Page ? j.data.Page.media : []).map(m => ({ anilistId: m.id, title: m.title.english || m.title.romaji, year: (m.startDate && m.startDate.year) || null, format: m.format, coverImage: (m.coverImage && m.coverImage.medium) || null }));
      } catch (e) { return null; }
    }
    // ── azioni admin (delega eventi, agganciata in afterRender) ──────────────
    afterRenderAdmin() {
      const sec = document.querySelector('.admin') || document.querySelector('.admin-gate');
      if (!sec) return;
      const lg = document.getElementById('adminLoginBtn');
      if (lg) lg.addEventListener('click', () => $('#loginModal').classList.add('open'));
      sec.addEventListener('click', e => this.adminClick(e));
      sec.addEventListener('input', e => this.adminInput(e));
      sec.addEventListener('change', e => this.adminChange(e));
    }
    adminRerender() {
      const body = document.getElementById('adminBody');
      if (body) body.innerHTML = this.adminBody(this.adminTab || 'generi');
      const bar = document.querySelector('.admin-bar-r');
      if (bar && !bar.querySelector('.admin-dirty') && this.adminDirty)
        bar.insertAdjacentHTML('afterbegin', '<span class="admin-dirty">modifiche non esportate</span>');
    }
    adminClick(e) {
      const tab = e.target.closest('[data-atab]');
      if (tab) { this.adminTab = tab.dataset.atab; const app = $('#app'); app.innerHTML = this.viewAdmin(); this.afterRenderAdmin(); return; }
      const a = e.target.closest('[data-aact]');
      if (!a) return;
      const act = a.dataset.aact, slug = a.dataset.slug, gen = this.adminGen;
      const arr = this.adminMembersArr(gen);
      const tiersOf = g => { const T = (window.GUARDALO.categories.tiers = window.GUARDALO.categories.tiers || {}); return (T[g] = T[g] || {}); };
      if (act === 'export') return this.adminExport();
      else if (act === 'rm' && arr) { const i = arr.indexOf(slug); if (i >= 0) arr.splice(i, 1); delete tiersOf(gen)[slug]; }
      else if (act === 'tier') { tiersOf(gen)[slug] = a.dataset.tier; }
      else if (act === 'hero') { (window.GUARDALO.categories.hero = window.GUARDALO.categories.hero || {})[gen] = slug; }
      else if (act === 'addmem' && arr) { if (!arr.includes(slug)) arr.push(slug); tiersOf(gen)[slug] = 'd'; }
      else if (act === 'pick') { this.adminTitle = slug; }
      else if (act === 'togglegen') { const g = a.dataset.gen, ar = this.adminMembersArr(g); if (ar) { const i = ar.indexOf(slug); if (i >= 0) { ar.splice(i, 1); delete tiersOf(g)[slug]; } else { ar.push(slug); tiersOf(g)[slug] = 'd'; } } }
      else if (act === 'addpend') { const ti = document.getElementById('adminNewTitle'), yi = document.getElementById('adminNewYear'); const title = (ti.value || '').trim(); if (!title) return; (this.adminPending = this.adminPending || []).push({ title, year: yi.value ? +yi.value : null }); }
      else if (act === 'rmpend') { this.adminPending.splice(+a.dataset.i, 1); }
      else if (act === 'addani') { const m = (this._aniResults || [])[+a.dataset.i]; if (m && !(this.adminPending || []).some(p => p.anilistId === m.anilistId)) { (this.adminPending = this.adminPending || []).push(m); this.toast('«' + m.title + '» in coda.', 'ok'); } }
      else if (act === 'addtile') { const h = window.GUARDALO.home; (h.tiles = h.tiles || []).push({ icon: 'ri-star-line', title: 'Nuova scorciatoia', sub: '', link: '/', heroSlug: '' }); }
      else if (act === 'rmtile') { window.GUARDALO.home.tiles.splice(+a.dataset.i, 1); }
      else if (act === 'addfact') { const h = window.GUARDALO.home; (h.facts = h.facts || []).push('Nuova curiosità…'); }
      else if (act === 'rmfact') { window.GUARDALO.home.facts.splice(+a.dataset.i, 1); }
      else if (act === 'secup' || act === 'secdown') { const c = window.GUARDALO.categories; const ord = c.genreOrder.includes(gen) ? c.genreOrder : c.percorsoOrder; const i = ord.indexOf(gen), j = i + (act === 'secup' ? -1 : 1); if (i >= 0 && j >= 0 && j < ord.length) [ord[i], ord[j]] = [ord[j], ord[i]]; }
      else if (act === 'secnew') { this.adminNewSec = !this.adminNewSec; this.adminDirty = false; }
      else if (act === 'seccreate') {
        const ti = document.getElementById('adminNewSecTitle'), kind = document.getElementById('adminNewSecKind').value;
        const title = (ti.value || '').trim();
        const id = title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const c = window.GUARDALO.categories;
        if (!id || c.members[id]) { this.toast('Nome non valido o sezione già esistente.', 'muted'); return; }
        (kind === 'genere' ? c.genreOrder : c.percorsoOrder).push(id);
        c.members[id] = []; (c.tiers = c.tiers || {})[id] = {};
        PATHS.push({ id, title, blurb: '', about: '', curiosita: '', icon: 'ri-shapes-line', accent: '#b4542c', levels: [] });
        this.adminGen = id; this.adminNewSec = false; this.toast('Sezione «' + title + '» creata. Ricarica per vederla nelle griglie.', 'ok');
      }
      else if (act === 'secdel') {
        const c = window.GUARDALO.categories, name = (PATHS.find(p => p.id === gen) || {}).title || gen;
        if (!confirm('Eliminare la sezione «' + name + '»? I titoli restano nel catalogo, ma la sezione sparisce.')) return;
        [c.genreOrder, c.percorsoOrder].forEach(ord => { const i = ord.indexOf(gen); if (i >= 0) ord.splice(i, 1); });
        delete c.members[gen]; if (c.tiers) delete c.tiers[gen]; if (c.hero) delete c.hero[gen];
        const pi = PATHS.findIndex(p => p.id === gen); if (pi >= 0) PATHS.splice(pi, 1);
        this.adminGen = null; this.toast('Sezione eliminata.', 'muted');
      }
      else return;
      if (act !== 'export' && act !== 'pick') this.adminDirty = true;
      this.adminRerender();
    }
    adminInput(e) {
      const el = e.target;
      if (el.dataset && el.dataset.hset) { this.adminHomeSet(el.dataset.hset, el.value); return; }   // campo home: non ri-renderizzo (tengo il focus)
      if (el.dataset && el.dataset.pset) { const p = PATHS.find(x => x.id === this.adminGen); if (p) { p[el.dataset.pset] = el.value; this.adminDirty = true; } return; }   // testo sezione
      if (el.id === 'adminAddMember') { const s = document.getElementById('adminAddSug'); if (s) s.innerHTML = this.adminMemberSug(el.value.toLowerCase().trim()); }
      else if (el.id === 'adminTSearch') { this.adminTQ = el.value; const l = document.getElementById('adminTList'); if (l) l.innerHTML = this.adminTitleList(el.value.toLowerCase().trim()); }
      else if (el.id === 'adminAniSearch') {
        const q = el.value.trim(); clearTimeout(this._aniT);
        const sug = document.getElementById('adminAniSug');
        if (!q) { if (sug) sug.innerHTML = ''; return; }
        if (sug) sug.innerHTML = '<span class="admin-hint">cerco su AniList…</span>';
        this._aniT = setTimeout(async () => {
          const res = await this.adminAniSearch(q); this._aniResults = res || [];
          const s2 = document.getElementById('adminAniSug'); if (!s2) return;
          s2.innerHTML = res === null ? '<span class="admin-hint">errore di rete</span>'
            : (res.length ? res.map((m, i) => `<button data-aact="addani" data-i="${i}">${m.coverImage ? `<img src="${esc(m.coverImage)}" alt="">` : ''}${esc(m.title)}${m.year ? ` <span>(${m.year})</span>` : ''}</button>`).join('') : '<span class="admin-hint">nessun risultato</span>');
        }, 400);
      }
    }
    adminChange(e) {
      const el = e.target;
      if (el.id === 'adminGenSel') { this.adminGen = el.value; this.adminRerender(); return; }
      const act = el.dataset && el.dataset.aact, t = BY_ID.get(el.dataset && el.dataset.slug);
      if (!t) return;
      if (act === 'inlist') { t.inList = el.checked; }
      else if (act === 'rate') { const v = parseFloat(el.value); t.userRating = isNaN(v) ? null : v; if (!isNaN(v)) t.inList = true; }
      else return;
      this.adminDirty = true;
      this.adminRerender();
    }
    adminExport() {
      const cat = window.GUARDALO.categories || {};
      const categories = { _nota: 'Tassonomia editabile. genreOrder/percorsoOrder = ordine in griglia; members = titoli di ogni genere; hero = immagine; tiers[id] = fascia di ogni titolo in quel genere/percorso (e=Essenziale, c=Consigliato, d=Da scoprire). Dopo modifiche: npm run gen.', genreOrder: cat.genreOrder, percorsoOrder: cat.percorsoOrder, hero: cat.hero, members: cat.members, tiers: cat.tiers || {} };
      const ranking = {};
      TITLES.filter(t => t.inList).sort((a, b) => (b.userRating || 0) - (a.userRating || 0)).forEach(t => { ranking[t.id] = { rating: t.userRating ?? null }; });
      this.adminDownload('categories.json', JSON.stringify(categories, null, 2));
      this.adminDownload('user-ranking.json', JSON.stringify(ranking, null, 2));
      const home = window.GUARDALO.home || {};
      this.adminDownload('home.json', JSON.stringify({ _nota: 'Contenuti home + liste tempo. Dopo modifiche: npm run gen.', ...home }, null, 2));
      // paths.json — testi/stile delle sezioni (solo meta; i titoli stanno in categories.members)
      const KEEP = ['id', 'title', 'tagline', 'icon', 'accent', 'blurb', 'about', 'curiosita'];
      const pathsOut = (window.GUARDALO.paths || []).map(p => { const o = {}; KEEP.forEach(k => { if (p[k] != null) o[k] = p[k]; }); o.levels = []; return o; });
      this.adminDownload('paths.json', JSON.stringify(pathsOut, null, 2));
      let extra = '';
      if (this.adminPending && this.adminPending.length) { this.adminDownload('seed-da-aggiungere.json', JSON.stringify(this.adminPending, null, 2)); extra = ' + seed-da-aggiungere.json'; }
      this.adminDirty = false;
      this.adminRerender();
      this.toast(`✓ Scaricati categories.json, user-ranking.json, home.json e paths.json${extra}. Mettili in editorial/ e fai npm run gen.`, 'ok');
    }
    adminDownload(name, text) {
      const blob = new Blob([text + '\n'], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }

    notFound() {
      return `<section class="wrap empty big"><i class="ri-compass-3-line"></i><h2>Non trovato</h2><p>Questa pagina non esiste.</p><a class="btn-ghost" href="/">Torna alla home</a></section>`;
    }

    // ── RICERCA ──────────────────────────────────────────────────────────────────
    surprise() {
      const t = TITLES[Math.floor(Math.random() * TITLES.length)];
      if (t) { this.closeSearch(); this.go('/t/' + t.id); this.toast('🎲 ' + t.title, 'ok'); }
    }
    searchKey(e) {
      const items = [...document.querySelectorAll('#searchResults .sr-item')];
      if (!items.length) return;
      if (e.key === 'Enter') { e.preventDefault(); (items[this.searchSel] || items[0]).click(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); this.searchSel = Math.min((this.searchSel ?? -1) + 1, items.length - 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); this.searchSel = Math.max((this.searchSel ?? 0) - 1, 0); }
      else return;
      items.forEach((it, i) => it.classList.toggle('sel', i === this.searchSel));
      items[this.searchSel]?.scrollIntoView({ block: 'nearest' });
    }
    renderSearch(q) {
      const box = $('#searchResults');
      this.searchSel = -1;
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
        ? hits.map(t => `<a class="sr-item" href="/t/${esc(t.id)}" data-srclose>
            <img src="${esc(thumbS(cover(t)))}" alt="" loading="lazy">
            <div><b>${esc(t.title)}</b><span>${esc(t.year || '')} · ${esc(t.typeLabel)} · <span class="sr-len ls-${t.lengthBand}">${esc(lenLabel(t))}</span></span></div>
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

  document.addEventListener('DOMContentLoaded', () => {
    window.app = new Guardalo();
    document.addEventListener('click', e => {
      if (e.target.id === 'esploraSearch') window.app.openSearch();
    });
  });
})();
