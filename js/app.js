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
  const GENRE_IDS = ['battle-shonen', 'seinen-e-maturo', 'isekai', 'fantasy', 'sci-fi', 'mecha', 'super-robot',
    'mindfuck', 'horror-e-disagio', 'sopravvivenza', 'storici', 'vendetta', 'viaggi-nel-tempo',
    'crimine', 'supereroi', 'romance', 'commedia', 'cinema-dautore'];
  const GENRE_PATHS = GENRE_IDS.map(id => PATHS.find(p => p.id === id)).filter(Boolean);
  // Categorizzazione PRECISA della lista (i generi AniList sono troppo larghi e sbagliano:
  // es. Shangri-La ha tag Sci-Fi ma è isekai). Un titolo può stare in più categorie.
  const FORCE_TOP = new Set(['jujutsu-kaisen']);
  const isTopT = t => !!(t && (t.top || FORCE_TOP.has(t.id)));
  const CAT_MEMBERS = {
    'battle-shonen': ['jujutsu-kaisen', 'hunter-x-hunter', 'naruto', 'bleach', 'one-piece', 'jojo-s-bizarre-adventure', 'fullmetal-alchemist-brotherhood', 'dragon-ball', 'demon-slayer', 'my-hero-academia', 'black-clover', 'kaiju-no-8', 'solo-leveling', 'mob-psycho-100', 'one-punch-man', 'gurren-lagann', 'kill-la-kill', 'tower-of-god', 'saint-seiya', 'akame-ga-kill', 'hell-s-paradise-jigokuraku', 'gachiakuta', 'my-hero-academia-vigilantes', 'to-be-hero-x', 'darwin-s-game'],
    'seinen-e-maturo': ['berserk', 'vinland-saga', 'monster', 'attack-on-titan', 'cyberpunk-edgerunners', 'cowboy-bebop', 'kingdom', '91-days', 'golden-kamuy', 'gangsta', 'samurai-champloo', 'chainsaw-man', '86-eighty-six', 'akudama-drive', 'devilman-crybaby', 'hellsing-ultimate', 'gantz', 'deadman-wonderland', 'tokyo-revengers', 'trigun', 'wolf-s-rain', 'death-parade'],
    'isekai': ['re-zero-starting-life-in-another-world', 'overlord', 'sword-art-online', 'the-rising-of-the-shield-hero', 'shangri-la-frontier', 'solo-leveling', 'gate', 'grimgar-of-fantasy-and-ash', 'the-eminence-in-shadow', 'reincarnated-as-a-sword', 'the-world-s-finest-assassin-gets-reincarnated-in-another-world-as-an-aristocrat', 'failure-frame-i-became-the-strongest', 'handyman-saitou-in-another-world', 'drifters', 'release-that-witch', 'petals-of-reincarnation', 'sentence-to-be-hero'],
    'fantasy': ['frieren', 'fullmetal-alchemist-brotherhood', 'hunter-x-hunter', 'made-in-abyss', 'claymore', 'ranking-of-kings', 'berserk', 'devil-may-cry', 'burn-the-witch', 'bna-brand-new-animal', 'daemons-of-the-shadow-realm', 'wistoria-wand-and-sword', 'fate-franchise-completo', 'demon-slayer', 'black-clover', 'tower-of-god'],
    'sci-fi': ['steins-gate', 'cyberpunk-edgerunners', 'cowboy-bebop', 'ghost-in-the-shell', 'akira', 'parasyte-the-maxim', 'heavenly-delusion', 'dan-da-dan', 'deca-dence', 'terra-formars', 'lazarus', 'wolf-s-rain', 'trigun', 'akudama-drive'],
    'mecha': ['neon-genesis-evangelion', 'gurren-lagann', 'code-geass', '86-eighty-six', 'pluto', 'promare', 'flcl'],
    'super-robot': ['mazinger-z', 'ufo-robot-grendizer', 'getter-robo', 'mobile-suit-gundam', 'great-mazinger', 'daltanious'],
    'sopravvivenza': ['future-diary', 'darwin-s-game', 'the-promised-neverland', 'akudama-drive', 'deadman-wonderland', 'gantz'],
    'storici': ['vinland-saga', 'kingdom', 'golden-kamuy', 'samurai-champloo', '91-days'],
    'vendetta': ['berserk', 'vinland-saga', '91-days', 'claymore', 'akame-ga-kill', 'hell-s-paradise-jigokuraku'],
    'viaggi-nel-tempo': ['steins-gate', 'erased', 're-zero-starting-life-in-another-world', 'summer-time-rendering', 'tokyo-revengers'],
    'crimine': ['91-days', 'gangsta', 'cowboy-bebop', 'akudama-drive'],
    'supereroi': ['my-hero-academia', 'my-hero-academia-vigilantes', 'one-punch-man', 'to-be-hero-x'],
    'mindfuck': ['death-note', 'steins-gate', 'monster', 'neon-genesis-evangelion', 'code-geass', 'erased', 'the-promised-neverland', 'summer-time-rendering', 'death-parade', 'future-diary', 'parasyte-the-maxim', 'pluto', 're-zero-starting-life-in-another-world', 'ajin-demi-human', 'heavenly-delusion'],
    'horror-e-disagio': ['berserk', 'chainsaw-man', 'devilman-crybaby', 'parasyte-the-maxim', 'the-promised-neverland', 'made-in-abyss', 'hellsing-ultimate', 'claymore', 'gantz', 'terra-formars', 'ajin-demi-human', 'deadman-wonderland', 'future-diary', 'akame-ga-kill', 'summer-time-rendering', 'hell-s-paradise-jigokuraku'],
    'romance': ['sword-art-online', 're-zero-starting-life-in-another-world', 'tokyo-revengers', 'dan-da-dan'],
    'commedia': ['spy-x-family', 'one-punch-man', 'mob-psycho-100', 'dan-da-dan', 'the-eminence-in-shadow', 'handyman-saitou-in-another-world', 'kill-la-kill', 'abenobashi-magical-shopping-street', 'golden-kamuy'],
    'cinema-dautore': ['akira', 'ghost-in-the-shell', 'principessa-mononoke', 'la-citta-incantata', 'promare'],
  };
  // immagine HERO di ogni categoria/percorso: scelta a mano, UNICA (niente doppioni tra categorie)
  // e rappresentativa. Tutti questi titoli hanno un bannerImage orizzontale vero (no copertine stirate).
  const HERO_OF = {
    // generi
    'battle-shonen': 'jujutsu-kaisen', 'seinen-e-maturo': 'monster', 'isekai': 're-zero-starting-life-in-another-world',
    'fantasy': 'frieren', 'sci-fi': 'cyberpunk-edgerunners', 'mecha': 'neon-genesis-evangelion',
    'super-robot': 'mazinger-z', 'mindfuck': 'death-note', 'horror-e-disagio': 'chainsaw-man',
    'sopravvivenza': 'the-promised-neverland', 'storici': 'vinland-saga', 'vendetta': 'berserk',
    'viaggi-nel-tempo': 'steins-gate', 'crimine': '91-days', 'supereroi': 'my-hero-academia',
    'romance': 'sword-art-online', 'commedia': 'spy-x-family', 'cinema-dautore': 'akira',
    // percorsi
    'da-zero-a-otaku': 'fullmetal-alchemist-brotherhood', 'capolavori': 'cowboy-bebop', 'azione': 'demon-slayer',
    'antieroi': 'code-geass', 'il-canone': 'ghost-in-the-shell', 'chicche-e-deep-cut': 'heavenly-delusion',
  };
  // membri di una categoria/percorso: per i generi = lista curata (CAT_MEMBERS) + extra non-inList; altrimenti i titoli del percorso
  const catTitles = (p) => {
    if (p && CAT_MEMBERS[p.id]) {
      const map = new Map();
      CAT_MEMBERS[p.id].forEach(id => { const t = BY_ID.get(id); if (t) map.set(id, t); });
      (pathTitles(p) || []).forEach(t => { if (t && !t.inList) map.set(t.id, t); });
      return [...map.values()];
    }
    return pathTitles(p) || [];
  };
  // percorsi "tematici" (non di genere): journey curati che possono riusare gli stessi titoli.
  // Tutti i percorsi sono liste curate ordinate dal migliore (niente livelli/progressione).
  const PERCORSI_IDS = ['da-zero-a-otaku', 'capolavori', 'azione', 'antieroi', 'il-canone', 'chicche-e-deep-cut'];
  const PERCORSI_PATHS = PERCORSI_IDS.map(id => PATHS.find(p => p.id === id)).filter(Boolean);
  // titoli di un percorso, deduplicati nell'ordine dei livelli
  const pathTitles = p => {
    const seen = new Set(), out = [];
    (p.levels || []).forEach(l => (l.titles || []).forEach(id => {
      if (seen.has(id)) return; seen.add(id);
      const t = BY_ID.get(id); if (t) out.push(t);
    }));
    return out;
  };
  // ordinamento "dal migliore": prima i TOP della classifica utente, poi voto utente, poi AniList
  const rankSort = (a, b) =>
    (b.top ? 1 : 0) - (a.top ? 1 : 0) ||
    (b.userRating || 0) - (a.userRating || 0) ||
    (b.score10 || 0) - (a.score10 || 0);

  // etichetta lunghezza: i film e i one-shot non dicono "Cortissimo" ma cosa sono
  const lenLabel = t => t.format === 'MOVIE' ? 'Film'
    : ((t.sagaEpisodes || t.episodes || 0) <= 1 ? 'Episodio unico' : t.lengthLabel);
  const lenHint = t => t.format === 'MOVIE' ? 'un film, una sera' : t.lengthHint;


  // ── "Lo sapevi?" — curiosità/info utili, scritte bene (soggetto chiaro, niente ripetizioni) ──
  const FACTS = [
    'In Giappone «anime» indica qualsiasi cartone animato, anche straniero: è solo fuori dal Giappone che la parola è diventata sinonimo di animazione giapponese.',
    '«Shōnen» e «seinen» non descrivono la storia ma il pubblico della rivista su cui esce: ragazzi il primo, adulti il secondo. Per questo un seinen può essere più crudo a parità di azione.',
    'La lunghezza di una serie non si misura in stagioni ma in episodi per minuti: un film robusto può pesare quanto un corto di dodici puntate. Per questo qui trovi le fasce di tempo reali.',
    'Gli isekai — storie di chi finisce catapultato in un altro mondo — sono diventati così tanti che alcuni concorsi giapponesi per esordienti li hanno vietati per un periodo.',
    'Lo studio di animazione conta quanto il regista: lo stesso soggetto cambia faccia a seconda di chi lo disegna. Per questo in ogni scheda trovi lo studio e chi l’ha diretto.',
    'Un «mecha» è un robot gigante pilotato; un «super robot» è il filone classico anni ’70 — Mazinga, Goldrake — da cui tutto è partito. Due cose diverse, spesso confuse.',
    'Quasi ogni anime nasce da un manga o da una light novel: l’adattamento può tagliare, aggiungere o cambiare il finale. Quando capita, nelle dritte della scheda te lo segnaliamo.',
    'Molte serie aprono lente e «normali» di proposito: costruiscono la quiete prima della svolta. È una scelta di scrittura, non un difetto di ritmo.',
  ];
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

      // sidebar mobile
      const sb = document.getElementById('sidebar');
      document.getElementById('sideToggle')?.addEventListener('click', () => sb.classList.toggle('open'));
      document.querySelectorAll('.side-nav a').forEach(a => a.addEventListener('click', () => sb.classList.remove('open')));

      // delega azioni "visto / da vedere"
      document.addEventListener('click', e => {
        if (e.target.closest('.js-surprise')) { e.preventDefault(); this.surprise(); return; }
        if (e.target.closest('.js-search')) { e.preventDefault(); this.openSearch(); return; }
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
      const path = decodeURIComponent(location.pathname || '/');
      const [_, seg, arg] = path.split('/');
      let html, active = 'home';
      if (seg === 'p' && arg) { html = this.viewPath(arg); active = PERCORSI_IDS.includes(arg) ? 'percorsi' : 'generi'; }
      else if (seg === 't' && arg) { html = this.viewTitle(arg); active = ''; }
      else if (seg === 'generi') { html = this.viewGeneri(); active = 'generi'; }
      else if (seg === 'percorsi') { html = this.viewPercorsi(); active = 'percorsi'; }
      else if (seg === 'esplora') { html = this.viewEsplora(); active = 'esplora'; }
      else if (seg === 'tempo' && arg) { html = this.viewTempo(arg); active = 'tempo-' + arg; }
      else if (seg === 'lista') { html = this.viewLista(); active = 'lista'; }
      else if (seg === 'info') { html = this.viewInfo(); active = ''; }
      else if (seg === 'privacy') { html = this.viewPrivacy(); active = ''; }
      else if (seg === 'cookie') { html = this.viewCookie(); active = ''; }
      else { html = this.viewHome(); active = 'home'; }

      const app = $('#app');
      app.innerHTML = html;
      document.querySelectorAll('.side-nav a').forEach(a => a.classList.toggle('active', a.dataset.route === active));
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
      const heroSearch = document.getElementById('heroSearch');
      if (heroSearch) heroSearch.addEventListener('click', () => this.openSearch());
      // filtro per tempo dentro la pagina categoria (client-side)
      const cf = document.getElementById('catFilter');
      if (cf) cf.addEventListener('click', e => {
        const b = e.target.closest('.cf-chip');
        if (!b) return;
        cf.querySelectorAll('.cf-chip').forEach(c => c.classList.toggle('on', c === b));
        const sel = b.dataset.band;
        const map = { sera: ['cortissimo', 'corto'], medio: ['medio'], maratona: ['lungo', 'lunghissimo'] };
        document.querySelectorAll('.grid > .card[data-band]').forEach(card => {
          const show = sel === 'all' || (map[sel] && map[sel].includes(card.dataset.band));
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
      const topBadge = t.top ? `<span class="card-top" title="Imperdibile"><i class="ri-vip-crown-fill"></i></span>` : '';
      return `<a class="card ${w ? 'is-watched' : ''} ${l ? 'is-later' : ''} ${t.top ? 'is-top' : ''}" data-card="${esc(t.id)}" data-band="${esc(t.lengthBand)}" href="/t/${esc(t.id)}" ${col}>
        <div class="card-poster">
          <img src="${esc(thumb(cover(t)))}" alt="${esc(t.title)}" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">
          ${rank}${topBadge}
          <div class="card-marks">
            <button class="cm js-watch ${w ? 'on' : ''}" data-id="${esc(t.id)}" title="Visto" aria-label="Segna come visto"><i class="ri-check-line"></i></button>
            <button class="cm js-later ${l ? 'on' : ''}" data-id="${esc(t.id)}" title="Da vedere" aria-label="Aggiungi a Da vedere"><i class="ri-bookmark-line"></i></button>
          </div>
          ${w ? '<span class="card-seen"><i class="ri-check-double-line"></i> Visto</span>' : ''}
          <span class="lchip ls-${t.lengthBand}" title="${esc(lenLabel(t))} · ${esc(lenHint(t))}"><i class="ri-time-line"></i>${esc(lenLabel(t))}</span>
        </div>
        <div class="card-body">
          <div class="card-title">${esc(t.title)}</div>
          <div class="card-len ls-${t.lengthBand}"><i class="ri-time-line"></i>${esc(lenLabel(t))}<span class="card-len-hint">· ${esc(lenHint(t))}</span></div>
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
      const heroImg = [...TITLES].filter(t => t.top && t.bannerImage).sort(rankSort)[0] || [...TITLES].filter(t => t.top && t.coverImage).sort(rankSort)[0];
      const genreBrowse = GENRE_PATHS.map(p => this.pathTile(p)).join('');
      const percorsiBrowse = PERCORSI_PATHS.map(p => this.pathTile(p)).join('');
      const facts = pickN(FACTS, 3);
      return `
      <div class="wrap">
        <div class="home-grid">
          <div class="home-main">
            <section class="home-hero">
              ${heroImg ? `<div class="home-hero-art"><img src="${esc(heroImg.bannerImage || cover(heroImg))}" alt="" loading="eager" onload="this.classList.add('ld')" onerror="this.classList.add('ld')"></div>` : ''}
              <span class="home-hero-veil"></span>
              <div class="home-hero-in">
                <span class="hh-kicker">Guida agli anime · non un catalogo</span>
                <h1 class="hh-title">Cosa guardare, da dove iniziare, dove vederlo.</h1>
                <p class="hh-sub">Anime scelti e spiegati uno per uno: atmosfera, durata reale e la piattaforma giusta. Senza spoiler, senza perdere tempo.</p>
                <div class="hh-cta">
                  <a class="btn-red" href="/esplora"><i class="ri-compass-3-line"></i> Sfoglia il catalogo</a>
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
                <a href="/tempo/sera"><i class="ri-moon-clear-line"></i> Una sera</a>
                <a href="/tempo/weekend"><i class="ri-calendar-2-line"></i> Un weekend</a>
                <a href="/tempo/maratona"><i class="ri-fire-line"></i> Una maratona</a>
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
            ${feat('/p/da-zero-a-otaku', 'ri-seedling-line', 'Parto da zero', 'Guida passo passo per scoprire gli anime.', bnr('hunter-x-hunter'))}
            ${feat('/p/seinen-e-maturo', 'ri-skull-line', 'Voglio roba adulta', 'Storie mature, complesse, senza compromessi.', bnr('attack-on-titan'))}
            ${feat('/tempo/sera', 'ri-time-line', 'Ho poco tempo', 'Episodi brevi, film e serie compatte.', bnr('promare'))}
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

      // ogni percorso/genere: scheda introduttiva + Top + Da vedere + Consigliati
      {
        // membri = titoli curati nel percorso + (per i generi) titoli della lista che combaciano col genere
        const members = catTitles(p);
        const top = members.filter(t => t.inList && isTopT(t)).sort(rankSort);
        const daVedere = members.filter(t => t.inList && !isTopT(t)).sort(rankSort);
        const noPersonal = !top.length && !daVedere.length; // categoria interamente curata (es. classici)
        const consigliati = members.filter(t => !t.inList).sort(rankSort).slice(0, noPersonal ? 24 : 6);
        // se una categoria non ha "Essenziali" (nessun top globale) ma ha titoli in lista, promuovo
        // i migliori (per voto/rank) DI quella categoria così apre comunque con una guida, dai titoli già presenti.
        let essenziali = top, altriInList = daVedere;
        if (!top.length && daVedere.length) {
          const n = Math.min(4, daVedere.length);
          essenziali = daVedere.slice(0, n);
          altriInList = daVedere.slice(n);
        }
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
            <button class="cf-chip" data-band="sera">Una sera</button>
            <button class="cf-chip" data-band="medio">Qualche settimana</button>
            <button class="cf-chip" data-band="maratona">Maratona</button>
          </div>
        </section>`;
        const sec = (label, ic, list) => list.length ? `
          <section class="wrap">
            <div class="sec-divider"><span class="sd-label"><i class="${ic}"></i> ${label}</span><span class="sd-line"></span><span class="sd-count">${list.length} titoli</span></div>
            <div class="grid">${list.map(t => this.card(t)).join('')}</div>
          </section>` : '';
        const body = noPersonal
          ? sec('I classici', 'ri-medal-line', consigliati)
          : sec('Essenziali', 'ri-vip-crown-fill', essenziali)
            + sec('Consigliati', 'ri-bookmark-3-line', altriInList)
            + sec('Da scoprire', 'ri-compass-3-line', consigliati);
        return hero + scheda + filterBar + body;
      }
    }

    // ── VISTA: TITOLO ────────────────────────────────────────────────────────────
    viewTitle(id) {
      const t = BY_ID.get(id);
      if (!t) return this.notFound();
      const w = this.isWatched(id), l = this.isLater(id);

      const genres = (t.genres || []).map(g => `<span class="g-chip" title="${esc(GENRE_GLOSS[g] || '')}">${esc(itGenre(g))}</span>`).join('');
      const tone = (t.tone || []).map(x => `<span class="t-chip">${esc(x)}</span>`).join('');
      const tipsHtml = (t.tips && t.tips.length) ? `
            <div class="t-tips">
              <span class="t-tips-h"><i class="ri-lightbulb-flash-line"></i> Dritte per la visione</span>
              <ul>${t.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            </div>` : '';

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
      const jwUrl = `https://www.justwatch.com/it/cerca?q=${encodeURIComponent(t.title)}`;
      // Affiliazione: sostituisci AMAZON_TAG con il tuo id Amazon Associates al lancio.
      const azUrl = `https://www.amazon.it/s?k=${encodeURIComponent(t.title + ' anime')}&tag=AMAZON_TAG`;
      const streamHtml = `
        <div class="t-sec">
          <h3 class="t-sec-h"><i class="ri-play-circle-line"></i> Dove vederlo <span class="legal-pill">solo legale</span></h3>
          ${streaming.length
            ? `<div class="streams">${streaming.map(s => `<a class="stream" href="${esc(s.url)}" target="_blank" rel="noopener nofollow"><i class="ri-external-link-line"></i> ${esc(s.name)}</a>`).join('')}</div>
               <p class="muted-line">Le piattaforme possono variare per regione. <a href="${esc(jwUrl)}" target="_blank" rel="noopener nofollow">Verifica la disponibilità in Italia (JustWatch) →</a></p>`
            : `<p class="muted-line">Nessuna piattaforma segnalata da AniList per questa regione. <a href="${esc(jwUrl)}" target="_blank" rel="noopener nofollow">Cerca dove vederlo in Italia (JustWatch) →</a></p>`}
          <p class="muted-line shop-line"><i class="ri-shopping-bag-line"></i> Manga, Blu-ray e gadget: <a href="${esc(azUrl)}" target="_blank" rel="noopener sponsored nofollow">cerca «${esc(t.title)}» su Amazon →</a></p>
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

            ${tipsHtml}

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
          <a class="time-chip" href="/tempo/sera">Una sera</a>
          <a class="time-chip" href="/tempo/weekend">Un weekend</a>
          <a class="time-chip" href="/tempo/maratona">Maratona</a>
        </div>
        <div class="genre-chips">${genreChips}</div>
        ${this.factBox()}
      </section>
      <section class="wrap">
        <div class="sec-head sub"><h2><i class="ri-trophy-line"></i> Tutti, dal migliore</h2><span class="sec-count">${all.length} titoli</span></div>
        <div class="grid">${all.map(t => this.card(t)).join('')}</div>
      </section>`;
    }

    // ── VISTA: LA MIA LISTA ──────────────────────────────────────────────────────
    viewLista() {
      const watched = Object.keys(this.watched).map(id => BY_ID.get(id)).filter(Boolean).sort((a, b) => (b.score10 || 0) - (a.score10 || 0));
      const later = Object.keys(this.toWatch).map(id => BY_ID.get(id)).filter(Boolean).sort((a, b) => BANDS.indexOf(a.lengthBand) - BANDS.indexOf(b.lengthBand));
      const hours = watched.reduce((s, t) => s + (t.coreMinutes || 0), 0) / 60;

      const grid = list => `<div class="grid">${list.map(t => this.card(t)).join('')}</div>`;
      const empty = (ic, msg) => `<div class="empty"><i class="${ic}"></i><p>${msg}</p><a class="btn-ghost" href="/percorsi">Vai ai percorsi</a></div>`;

      return `
      <section class="wrap">
        <div class="sec-head"><h1>La mia lista</h1>
          ${later.length ? `<button class="btn-ghost" id="pickFromList"><i class="ri-dice-line"></i> Scegli per me</button>` : ''}</div>
        <div class="list-stats">
          <div class="ls-stat"><b>${watched.length}</b><span>visti</span></div>
          <div class="ls-stat"><b>${later.length}</b><span>da vedere</span></div>
          <div class="ls-stat"><b>${Math.round(hours)}h</b><span>guardate</span></div>
        </div>
        <div class="sec-head sub"><h2><i class="ri-bookmark-line"></i> Da vedere</h2>${later.length ? '<span class="sec-count">dai più corti</span>' : ''}</div>
        ${later.length ? grid(later) : empty('ri-bookmark-line', 'Niente ancora in lista. Sfoglia i percorsi e salva cosa ti incuriosisce.')}
        <div class="sec-head sub"><h2><i class="ri-check-double-line"></i> Visti</h2></div>
        ${watched.length ? grid(watched) : empty('ri-check-double-line', 'Segna i titoli che hai già visto.')}
      </section>`;
    }

    // ── VISTA: QUANTO TEMPO HAI ──────────────────────────────────────────────────
    viewTempo(band) {
      const map = {
        sera: { label: 'Una sera', sub: 'Si comincia e si finisce stasera', bands: ['cortissimo', 'corto'] },
        weekend: { label: 'Un weekend', sub: 'Una manciata di episodi da goderti con calma', bands: ['medio'] },
        maratona: { label: 'Maratona', sub: 'Roba in cui perderti per un bel pezzo', bands: ['lungo', 'lunghissimo'] },
      };
      const m = map[band];
      if (!m) return this.notFound();
      const list = TITLES.filter(t => m.bands.includes(t.lengthBand)).sort((a, b) => (b.score10 || 0) - (a.score10 || 0));
      const chips = Object.entries(map).map(([k, v]) =>
        `<a class="time-chip ${k === band ? 'on' : ''}" href="/tempo/${k}">${esc(v.label)}</a>`).join('');
      return `
      <section class="wrap esplora-head">
        <a class="back" href="/esplora"><i class="ri-arrow-left-line"></i> Esplora</a>
        <h1>Quanto tempo hai?</h1>
        <div class="time-chips">${chips}</div>
        <p>${esc(m.sub)} · ${list.length} titoli, dal più votato.</p>
      </section>
      <section class="wrap"><div class="grid">${list.map(t => this.card(t)).join('')}</div></section>`;
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
