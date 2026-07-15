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
  const LANG = DATA.lang === 'en' ? 'en' : 'it';
  const PFX = LANG === 'en' ? '/en' : '';
  const itGenre = LANG === 'en' ? (g => g) : (g => GENRE_IT[g] || g);
  // ── dizionario testi UI (IT default, EN per la versione inglese) ──────────
  const TT = {
    it: {
      hi:'Ciao,', welcome:'Benvenuto su GUARDALO', whereStart:'Da dove vuoi partire?',
      startHere:'Inizia da qui', pickMethod:'scegli metodo, tono o tempo', quickPicks:'Scelte rapide',
      howMuchTime:'Quanto tempo hai?', exploreAll:'Esplora tutto', seeGenres:'Vedi generi',
      chooseStart:'Scegli un punto di partenza', methodFirst:'prima metodo, poi tono o durata',
      watched:'Visto', toWatch:'Da vedere', seen:'Visto', notFoundH:'Pagina non trovata', notFoundP:'La pagina che cerchi non esiste o è stata spostata.', backHome:'Torna alla home',
      titles:'titoli', bestTitle:'Il meglio', bestOf:'Il meglio di GUARDALO', bestLead:'I migliori di tutti: titoli messi in cima ad almeno un genere o percorso, senza doppioni e ordinati dal migliore.', bestBlurb:'I titoli più forti presi da generi e percorsi, senza doppioni.', safeBet:'vai sul sicuro', pathWord:'percorso',
      generiTitle:'Generi', generiLead:'Scegli il tipo di storia. Viaggi nel tempo resta qui, nella zona mente e fantascienza.', percorsiTitle:'Percorsi', percorsiLead:'Non generi: scorciatoie editoriali per decidere più in fretta.',
      laneAction:'Azione e adrenalina', laneDark:'Cupo, adulto, vendetta', laneMind:'Mente, tempo e fantascienza', laneFeel:'Sentimenti e quotidiano', laneWorlds:'Mondi, storia e cinema',
      back:'Indietro', markWatched:'Segna visto', saved:'Salvato', share:'Condividi', techSheet:'Scheda tecnica', about:'Di cosa parla', comingSoon:'Scheda in arrivo.', forWhoLbl:'Per chi è:', howToWatch:'Come guardarlo', whereToWatch:'Dove vederlo', youMightLike:'Ti potrebbe piacere', startFromLbl:'Da dove iniziare:', goodToKnow:'Buono a sapersi', filmsOvas:'Film, OVA e speciali', legalOnly:'solo legale', noStream:'Nessuna piattaforma in streaming segnalata al momento.', lblRegia:'Regia', lblOrig:'Opera originale', lblBasedOn:'Tratto da', filterAll:'Tutti', showMore:'Mostra altri', likedThis:'Se ti è piaciuto questo', sameSaga:'Stessa saga', sameAuthor:'Stesso autore o regista', sameStudio:'Dallo stesso studio', mTit:'dove vederlo e da dove iniziare', mDescTfb:t=>`${t}: scheda spoiler-free, dove vederlo, quanto dura.`, mPathSuf:'i migliori anime del genere', mBest:'Il meglio', mBestD:'I migliori anime di GUARDALO: titoli in cima a generi e percorsi, senza doppioni.', mExpl:'Esplora tutti gli anime', mExplD:'Tutti gli anime della guida, dal migliore: filtra per genere e per quanto tempo hai.', mGen:'Generi', mGenD:'Tutti i generi: azione, mindfuck, horror, sci-fi, isekai e altro.', mPer:'Percorsi', mPerD:'Viaggi tematici curati: storie che spezzano, protagonisti geniali, antieroi e altro.', mList:'La mia lista', mListD:'La tua lista personale: salva gli anime da vedere e segna quelli visti.', mTempoFb:'Quanto tempo hai?', mTempoD:x=>`${x}: anime selezionati in base al tempo che hai.`,
      entry:[['Il meglio','solo priorità alte'],['Generi','per tipo di storia'],['Percorsi','liste editoriali'],['Esplora','tutti i filtri']],
      moods:[['Roba adulta','seinen, disagio, crime'],['Azione','ritmo e combattimenti'],['Viaggi tempo','loop, passato, scelte'],['Antieroi','morale sporca'],['Storico','epoche e guerre'],['Film','una serata secca']],
      guide:[['Generi','Sono il tipo di storia: azione, storico, horror, romance, viaggi nel tempo.'],['Percorsi','Sono tagli curati: antieroi, vendetta, mind game, roba adulta, chicche.'],['Fasce','Da vedere prima = priorità. Consigliati = solidi. Extra = recuperi dopo.']],
    },
    en: {
      hi:'Hi,', welcome:'Welcome to GUARDALO', whereStart:'Where do you want to start?',
      startHere:'Start here', pickMethod:'pick a method, mood or time', quickPicks:'Quick picks',
      howMuchTime:'How much time do you have?', exploreAll:'Explore all', seeGenres:'See genres',
      chooseStart:'Choose a starting point', methodFirst:'method first, then mood or length',
      watched:'Watched', toWatch:'To watch', seen:'Watched', notFoundH:'Page not found', notFoundP:'The page you are looking for does not exist or has moved.', backHome:'Back to home',
      titles:'titles', bestTitle:'The Best', bestOf:'The best of GUARDALO', bestLead:'The best of all: titles placed at the top of at least one genre or path, no duplicates, ordered best first.', bestBlurb:'The strongest titles from genres and paths, no duplicates.', safeBet:'a safe bet', pathWord:'path',
      generiTitle:'Genres', generiLead:'Choose the type of story. Time travel lives here, in the mind & sci-fi area.', percorsiTitle:'Paths', percorsiLead:'Not genres: editorial shortcuts to decide faster.',
      laneAction:'Action & adrenaline', laneDark:'Dark, adult, revenge', laneMind:'Mind, time & sci-fi', laneFeel:'Feelings & everyday', laneWorlds:'Worlds, history & cinema',
      back:'Back', markWatched:'Mark watched', saved:'Saved', share:'Share', techSheet:'Details', about:"What it's about", comingSoon:'Details coming soon.', forWhoLbl:"Who it's for:", howToWatch:'How to watch it', whereToWatch:'Where to watch', youMightLike:'You might like', startFromLbl:'Where to start:', goodToKnow:'Good to know', filmsOvas:'Films, OVA & specials', legalOnly:'legal only', noStream:'No streaming platform listed at the moment.', lblRegia:'Director', lblOrig:'Original work', lblBasedOn:'Based on', filterAll:'All', showMore:'Show', likedThis:'If you liked this', sameSaga:'Same saga', sameAuthor:'Same author or director', sameStudio:'From the same studio', mTit:'where to watch and where to start', mDescTfb:t=>`${t}: spoiler-free guide, where to watch, how long it is.`, mPathSuf:'the best anime of the genre', mBest:'The Best', mBestD:"GUARDALO's best anime: titles at the top of genres and paths, no duplicates.", mExpl:'Explore all anime', mExplD:'Every anime in the guide, best first: filter by genre and by how much time you have.', mGen:'Genres', mGenD:'Every genre: action, mindfuck, horror, sci-fi, isekai and more.', mPer:'Paths', mPerD:'Curated themed journeys: stories that break you, brilliant minds, antiheroes and more.', mList:'My list', mListD:'Your personal list: save anime to watch and mark the ones you have seen.', mTempoFb:'How much time do you have?', mTempoD:x=>`${x}: anime selected based on the time you have.`,
      entry:[['The Best','top priority only'],['Genres','by type of story'],['Paths','editorial lists'],['Explore','all filters']],
      moods:[['Adult stuff','seinen, dread, crime'],['Action','pace and fights'],['Time travel','loops, past, choices'],['Antiheroes','dirty morals'],['Historical','eras and wars'],['Films','one evening']],
      guide:[['Genres','The type of story: action, historical, horror, romance, time travel.'],['Paths','Curated cuts: antiheroes, revenge, mind games, adult stuff, gems.'],['Bands','Watch first = priority. Recommended = solid. Extra = catch up later.']],
    },
  };
  const T = TT[LANG];
  Object.assign(TT.it, {
    explore:'Esplora', exploreLead:'Tutti i titoli. Filtra per trovare quello giusto.', orSearch:'o cerca un titolo →',
    genresAndPaths:'Generi e percorsi', clear:'Pulisci', genresLbl:'Generi', pathsLbl:'Percorsi',
    anyLength:'Qualsiasi durata', seriesAndFilms:'Serie e film', onlySeries:'Solo serie', onlyFilms:'Solo film', onlyTop:'Solo top',
    sortBest:'Dal migliore', sortScore:'Voto più alto', sortRecent:'Più recenti', results:'Risultati',
    titleSing:'titolo', titlePlural:'titoli', noResults:'Nessun titolo trovato per questo.', fromBest:'dal migliore.',
    fStudio:'Studio', fDirector:'Regia di', fWork:'Opera di', fTheme:'Tema', fMood:'Atmosfera', fGenre:'Genere',
    listEmptyH:'La tua lista è vuota', listEmptyP:'Salva i titoli che vuoi vedere (segnalibro 🔖) e segna quelli già visti (✓). Li ritrovi qui, sincronizzati se accedi.',
    browseGenres:'Sfoglia i generi', goToPaths:'Vai ai percorsi', noToWatchFilter:'Nessun titolo «da vedere» con questo filtro.',
    allGenres:'Tutti i generi', shortest:'Più corti', score:'Voto', myList:'La mia lista', pickForMe:'Scegli per me',
    statWatched:'visti', statToWatch:'da vedere', statHours:'guardate', toWatchH:'Da vedere', watchedH:'Visti',
    nothingYet:'Niente ancora in lista. Sfoglia i percorsi e salva cosa ti incuriosisce.', markSeen:'Segna i titoli che hai già visto.',
    yourProfile:'Il tuo profilo', profileGate:'Accedi per ritrovare la tua lista su ogni dispositivo e vedere le tue statistiche.',
    signInGoogle:'Accedi con Google', signOut:'Esci', browsePaths:'Sfoglia i percorsi e salva cosa ti incuriosisce.',
    searchHint:'Cerca per titolo, studio, regista, genere o atmosfera.', noSearch:'Nessun titolo per', tWatched:'✓ Segnato come visto', tUnwatched:'Rimosso dai visti', tLater:'🔖 Aggiunto a Da vedere', tUnlater:'Rimosso da Da vedere', orderedBest:'ordinati dal migliore',
    syncFail:'Sincronizzazione non riuscita — riprova più tardi.',
  });
  Object.assign(TT.en, {
    explore:'Explore', exploreLead:'All titles. Filter to find the right one.', orSearch:'or search a title →',
    genresAndPaths:'Genres and paths', clear:'Clear', genresLbl:'Genres', pathsLbl:'Paths',
    anyLength:'Any length', seriesAndFilms:'Series & films', onlySeries:'Series only', onlyFilms:'Films only', onlyTop:'Top only',
    sortBest:'Best first', sortScore:'Highest rated', sortRecent:'Most recent', results:'Results',
    titleSing:'title', titlePlural:'titles', noResults:'No titles found for this.', fromBest:'best first.',
    fStudio:'Studio', fDirector:'Directed by', fWork:'Work by', fTheme:'Theme', fMood:'Mood', fGenre:'Genre',
    listEmptyH:'Your list is empty', listEmptyP:'Save the titles you want to watch (bookmark 🔖) and mark the ones you have seen (✓). You will find them here, synced if you sign in.',
    browseGenres:'Browse genres', goToPaths:'Go to paths', noToWatchFilter:'No "to watch" titles with this filter.',
    allGenres:'All genres', shortest:'Shortest', score:'Score', myList:'My list', pickForMe:'Pick for me',
    statWatched:'watched', statToWatch:'to watch', statHours:'watched', toWatchH:'To watch', watchedH:'Watched',
    nothingYet:'Nothing here yet. Browse the paths and save what catches your eye.', markSeen:'Mark the titles you have already seen.',
    yourProfile:'Your profile', profileGate:'Sign in to find your list on every device and see your stats.',
    signInGoogle:'Sign in with Google', signOut:'Sign out', browsePaths:'Browse the paths and save what catches your eye.',
    searchHint:'Search by title, studio, director, genre or mood.', noSearch:'No titles for', tWatched:'✓ Marked as watched', tUnwatched:'Removed from watched', tLater:'🔖 Added to To watch', tUnlater:'Removed from To watch', orderedBest:'best first',
    syncFail:'Sync failed — try again later.',
  });
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
  // fasce per-genere: tiers[pathId][slug] = 'e' Da vedere prima | 'c' Consigliato | 'd' Extra (default).
  const TIERS = CAT.tiers || {};
  const tierOf = (pid, slug) => (TIERS[pid] && TIERS[pid][slug]) || 'd';
  const TIER_LABEL = LANG === 'en' ? { e: 'Watch first', c: 'Recommended', d: 'Extra' } : { e: 'Da vedere prima', c: 'Consigliati', d: 'Extra' };
  const PATH_USE = {
    'da-zero-a-otaku': 'porta d ingresso',
    'storie-che-spezzano': 'dramma forte',
    'protagonisti-geniali': 'duelli mentali',
    'spettacolo-occhi': 'animazione forte',
    azione: 'azione pura',
    antieroi: 'morale sporca',
    'chicche-e-deep-cut': 'recuperi meno ovvi',
  };
  // insieme globale dei Top: titoli marcati 'e' in almeno una sezione → badge sulle card.
  const ESSENTIAL_IDS = new Set();
  for (const pid in TIERS) { const m = TIERS[pid]; for (const id in m) { if (m[id] === 'e') ESSENTIAL_IDS.add(id); } }
  const essentialTitles = () => [...ESSENTIAL_IDS].map(id => BY_ID.get(id)).filter(Boolean).sort(rankSort);
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


  // ── util ───────────────────────────────────────────────────────────────────
  const $  = (s, r = document) => r.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cover = t => t.coverImage || '';
  // varianti leggere AniList: medium ~24KB (poster card), small ~6KB (mini-strisce)
  const thumb  = u => (u || '').replace('/cover/large/', '/cover/medium/');
  const thumbS = u => (u || '').replace('/cover/large/', '/cover/small/');
  const loadScript = src => new Promise((resolve, reject) => {
    const existing = [...document.scripts].find(s => s.getAttribute('src') === src);
    if (existing) {
      if (existing.dataset.loaded === '1') resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = () => { s.dataset.loaded = '1'; resolve(); };
    s.onerror = reject;
    document.head.appendChild(s);
  });

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
      // Rilevamento lingua: primo ingresso senza scelta salvata + browser inglese → versione /en.
      try {
        const saved = localStorage.getItem('guardalo_lang');
        const isBot = /bot|crawl|spider|slurp|googlebot|bingbot/i.test(navigator.userAgent || '');
        if (!saved && LANG === 'it' && location.pathname === '/' && !isBot && /^en\b/i.test(navigator.language || '')) { location.replace('/en/'); return; }
      } catch (e) {}
      this.loadLocal();
      this.bindChrome();
      const attr = $('#footAttr'); if (attr) attr.textContent = DATA.attribution || '';
      window.addEventListener('popstate', () => { this.route(); this.trackPage(); });
      // intercetta i click sui link interni (URL path-based, niente reload)
      document.addEventListener('click', e => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = e.target.closest('a');
        if (!a) return;
        if (a.classList.contains('lang-switch')) { try { localStorage.setItem('guardalo_lang', a.dataset.lang || 'it'); } catch (e) {} return; }
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
        if (v === 'all') { this.loadAds(); if (typeof window.gtag === 'function') gtag('consent', 'update', { analytics_storage: 'granted' }); } };
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
      if (PFX && path.charAt(0) === '/' && path !== PFX && !path.startsWith(PFX + '/')) path = PFX + (path === '/' ? '/' : path);
      if (path !== location.pathname) { history.pushState(null, '', path); this.route(); this.trackPage(); }
      else window.scrollTo(0, 0);
    }
    // invia una visualizzazione di pagina "virtuale" a GA4 a ogni navigazione interna (SPA)
    trackPage() {
      if (typeof window.gtag !== 'function') return;
      gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: location.href,
        page_title: document.title
      });
    }

    // ── persistenza ──────────────────────────────────────────────────────────
    loadLocal() {
      try {
        const r = JSON.parse(localStorage.getItem('guardalo_v10') || '{}');
        this.watched = r.watched || {};
        this.toWatch = r.toWatch || {};
        this.dataTs = r.updatedAt || 0;
      } catch (e) {}
    }
    save() {
      this.dataTs = Date.now();
      const payload = { watched: this.watched, toWatch: this.toWatch, updatedAt: this.dataTs };
      try { localStorage.setItem('guardalo_v10', JSON.stringify(payload)); } catch (e) {}   // locale: immediato
      if (this.user && window.db) this.queueCloudSave();   // cloud: raggruppato (debounce 1.2s)
    }
    queueCloudSave() {
      clearTimeout(this._cloudTimer);
      this._cloudTimer = setTimeout(() => {
        if (!this.user || !window.db) return;
        window.db.collection('users').doc(this.user.uid)
          .set({ guardalo: { watched: this.watched, toWatch: this.toWatch, updatedAt: this.dataTs } }, { merge: true })
          .catch(() => { this.toast(T.syncFail, 'muted'); });
      }, 1200);
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
        ? (on ? T.tWatched : T.tUnwatched)
        : (on ? T.tLater : T.tUnlater);
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
      // scheda titolo: i bottoni grandi non hanno data-card → aggiorno stato + etichetta a mano
      const wb = document.querySelector(`.t-btn.js-watch[data-id="${CSS.escape(id)}"]`);
      if (wb) { wb.classList.toggle('on', this.isWatched(id)); wb.innerHTML = `<i class="ri-check-double-line"></i> ${this.isWatched(id) ? T.watched : T.markWatched}`; }
      const lb = document.querySelector(`.t-btn.js-later[data-id="${CSS.escape(id)}"]`);
      if (lb) { lb.classList.toggle('on', this.isLater(id)); lb.innerHTML = `<i class="ri-bookmark-line"></i> ${this.isLater(id) ? T.saved : T.toWatch}`; }
      // su home e pagine genere bastano le spunte: NON ri-renderizzare (niente salto in cima)
      // su /lista la composizione delle liste cambia: ri-renderizza ma conserva ordine/filtro e scroll
      if ((location.pathname || '/') === '/lista') {
        const sort = this.listSort, gen = this.listGenre, y = window.scrollY;
        this.route();
        this.listSort = sort; this.listGenre = gen;
        const lc = document.getElementById('listControls');
        if (lc) lc.querySelectorAll('.lc-btn').forEach(b => b.classList.toggle('on', b.dataset.sort === sort));
        const sel = document.getElementById('listGenre'); if (sel) { sel.value = gen; if (sel.value !== gen) this.listGenre = ''; }
        if (sort !== 'durata' || this.listGenre) this.renderLaterGrid();
        window.scrollTo(0, y);
      }
    }

    // ── FIREBASE ──────────────────────────────────────────────────────────────
    ensureFirebase() {
      if (window.auth && window.db) {
        this.initFirebase();
        return Promise.resolve();
      }
      if (this._firebasePromise) return this._firebasePromise;
      this._firebasePromise = Promise.resolve()
        .then(() => loadScript('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js'))
        .then(() => loadScript('https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js'))
        .then(() => loadScript('https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js'))
        .then(() => loadScript('js/firebase-config.js'))
        .then(() => this.initFirebase())
        .catch(err => {
          this._firebasePromise = null;
          this.toast('Accesso non disponibile al momento.', 'muted');
          throw err;
        });
      return this._firebasePromise;
    }
    initFirebase() {
      try {
        if (this._authBound) return;
        if (typeof window.auth === 'undefined') return;
        this._authBound = true;
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
      if (!window.db || !this.user) return;
      window.db.collection('users').doc(this.user.uid).get().then(doc => {
        const g = (doc.exists && doc.data().guardalo) || null;
        const localTs = this.dataTs || 0;
        const cloudTs = (g && g.updatedAt) || 0;
        const localEmpty = !Object.keys(this.watched).length && !Object.keys(this.toWatch).length;
        if (g && (cloudTs > localTs || localEmpty)) {
          // il cloud è più recente (o il locale è vuoto): adotto il cloud → le cancellazioni si propagano
          this.watched = g.watched || {};
          this.toWatch = g.toWatch || {};
          this.dataTs = cloudTs;
          try { localStorage.setItem('guardalo_v10', JSON.stringify({ watched: this.watched, toWatch: this.toWatch, updatedAt: cloudTs })); } catch (e) {}
        } else {
          // il locale è più recente (o cloud assente): lo salvo sul cloud
          this.save();
        }
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
    openLogin() {
      $('#loginModal')?.classList.add('open');
      this.ensureFirebase().catch(() => {});
    }
    bindChrome() {
      $('#themeToggle')?.addEventListener('click', () => this.toggleTheme());
      $('#searchOpen')?.addEventListener('click', () => this.openSearch());
      $('#searchClose')?.addEventListener('click', () => this.closeSearch());
      $('#searchOverlay')?.addEventListener('click', e => { if (e.target.id === 'searchOverlay') this.closeSearch(); });
      $('#searchInput')?.addEventListener('input', e => this.renderSearch(e.target.value));
      $('#searchInput')?.addEventListener('keydown', e => this.searchKey(e));
      $('#randomBtn')?.addEventListener('click', () => this.surprise());

      $('#loginBtn')?.addEventListener('click', () => this.openLogin());
      $('#loginClose')?.addEventListener('click', () => $('#loginModal')?.classList.remove('open'));
      $('#loginModal')?.addEventListener('click', e => { if (e.target.id === 'loginModal') e.currentTarget.classList.remove('open'); });
      $('#googleLogin')?.addEventListener('click', async () => {
        try { await this.ensureFirebase(); }
        catch (e) { return; }
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
      $('#logoutBtn')?.addEventListener('click', () => {
        if (window.auth) window.auth.signOut().then(() => this.toast('Sei uscito.', 'muted')).catch(() => {});
      });
      $('#userChip')?.addEventListener('click', () => this.go('/profilo'));

      // sidebar mobile
      const sb = document.getElementById('sidebar');
      document.getElementById('sideToggle')?.addEventListener('click', () => sb.classList.toggle('open'));
      document.querySelectorAll('.side-nav a, .side-time-nav a').forEach(a => a.addEventListener('click', () => sb.classList.remove('open')));

      // delega azioni "visto / da vedere"
      document.addEventListener('click', e => {
        if (e.target.closest('.js-surprise')) { e.preventDefault(); this.surprise(); return; }
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
      if (navigator.share) {
        try { await navigator.share(data); } catch (e) { /* annullato dall'utente: nessun messaggio */ }
        return;
      }
      try {
        await navigator.clipboard.writeText(url);
        this.toast('Link copiato negli appunti.', 'ok');
      } catch (e) {
        this.toast('Copia il link dalla barra degli indirizzi.', 'muted');
      }
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
        if (remaining > 0) btn.innerHTML = `<i class="ri-add-line"></i> ${T.showMore} ${remaining} ${T.titlePlural}`;
        else btn.closest('.more-wrap')?.remove();
      }
    }
    openSearch() { const o = $('#searchOverlay'); o.hidden = false; requestAnimationFrame(() => o.classList.add('open')); $('#searchInput').focus(); this.renderSearch(''); }
    closeSearch() { const o = $('#searchOverlay'); o.classList.remove('open'); setTimeout(() => o.hidden = true, 200); $('#searchInput').value = ''; }

    // ── ROUTER ─────────────────────────────────────────────────────────────────
    route() {
      const path = decodeURIComponent(location.pathname || '/').replace(/^\/en(?=\/|$)/, '') || '/';
      const [_, seg, arg, arg2] = path.split('/');
      let html, active = 'home';
      if (seg === 'p' && arg) { html = this.viewPath(arg); active = PERCORSI_IDS.includes(arg) ? 'percorsi' : (GENRE_IDS.includes(arg) ? 'generi' : ''); }
      else if (seg === 'cerca' && arg) { html = this.viewFacet(arg, arg2 || ''); active = 'esplora'; }
      else if (seg === 't' && arg) { html = this.viewTitle(arg); active = ''; }
      else if (seg === 'essenziali') { html = this.viewEssenziali(); active = 'percorsi'; }
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
      else if (!seg) { html = this.viewHome(); active = 'home'; }
      else { html = this.notFound(); active = ''; }   // URL sconosciuta → "non trovato", non la home

      const app = $('#app');
      app.innerHTML = html;
      document.querySelectorAll('.side-nav a, .side-time-nav a, .bottom-nav a').forEach(a => { const on = a.dataset.route === active; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
      const ls = document.querySelector('.lang-switch'); if (ls) ls.setAttribute('href', LANG === 'en' ? (location.pathname.replace(/^\/en/, '') || '/') : ('/en' + (location.pathname === '/' ? '/' : location.pathname)));
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
        title = `${t.title}${t.year ? ` (${t.year})` : ''} — ${T.mTit} · ${BASE}`;
        desc = (t.hook || T.mDescTfb(t.title)).slice(0, 158);
        img = cover(t);
      } else if (seg === 'p' && arg && PATHS.find(p => p.id === arg)) {
        const p = PATHS.find(p => p.id === arg);
        title = `${p.title} — ${T.mPathSuf} · ${BASE}`;
        desc = (p.about || p.blurb || p.tagline || '').slice(0, 158);
      } else if (seg === 'essenziali') {
        title = `${T.mBest} · ${BASE}`;
        desc = T.mBestD;
      } else if (seg === 'esplora') {
        title = `${T.mExpl} · ${BASE}`;
        desc = T.mExplD;
      } else if (seg === 'generi') {
        title = `${T.mGen} · ${BASE}`;
        desc = T.mGenD;
      } else if (seg === 'percorsi') {
        title = `${T.mPer} · ${BASE}`;
        desc = T.mPerD;
      } else if (seg === 'tempo' && arg) {
        const m = TEMPO.find(t => t.key === arg);
        title = `${m ? m.label : T.mTempoFb} · ${BASE}`;
        desc = m
          ? `${m.sub}: anime selezionati in base al tempo che hai a disposizione.`
          : 'Anime selezionati in base al tempo che hai a disposizione.';
      } else if (seg === 'lista') {
        title = `${T.mList} · ${BASE}`;
        desc = T.mListD;
      } else if (seg === 'profilo') {
        title = `Profilo · ${BASE}`;
        desc = 'Statistiche personali, progressi e preferenze salvate su GUARDALO.';
      } else if (seg === 'admin') {
        title = `Gestione · ${BASE}`;
        desc = 'Pannello di gestione riservato per curare titoli, generi e percorsi di GUARDALO.';
      } else if (seg === 'info') {
        title = `Chi sono · ${BASE}`;
        desc = 'GUARDALO è una guida agli anime creata da Francesco Spidah. Selezione, testi e percorsi sono curatela personale.';
      } else if (seg === 'privacy') {
        title = `Privacy Policy · ${BASE}`;
        desc = 'Come GUARDALO tratta i tuoi dati: navigazione anonima, login opzionale, pubblicità.';
      } else if (seg === 'cookie') {
        title = `Cookie Policy · ${BASE}`;
        desc = 'I cookie usati da GUARDALO e come gestire il consenso.';
      } else if (seg) {
        title = `Pagina non trovata · ${BASE}`;
        desc = 'Questa pagina di GUARDALO non esiste o non è più disponibile.';
      }
      if (!title) {
        title = `${BASE} — La guida agli anime`;
        desc = 'I migliori anime di ogni genere, scelti e spiegati: perché guardarli, da dove iniziare, dove vederli.';
      }
      document.title = title;
      this.setMetaTag('description', desc);
      this.setMetaTag('og:title', title, true);
      this.setMetaTag('og:description', desc, true);
      const metaImg = img || (location.origin + '/og-image.png');
      this.setMetaTag('og:image', metaImg, true);
      this.setMetaTag('twitter:image', metaImg);

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
      if (seg === 'admin') { this.ensureFirebase().catch(() => {}); this.afterRenderAdmin(); return; }
      if (seg === 'profilo') {
        this.ensureFirebase().catch(() => {});
        document.getElementById('profLogin')?.addEventListener('click', () => this.openLogin());
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
      // Esplora: pannello filtri (genere · durata · tipo · ordina)
      document.getElementById('esploraFilters')?.addEventListener('change', () => this.applyEsploraFilters());
      document.getElementById('efClearGenres')?.addEventListener('click', () => {
        document.querySelectorAll('input[name="efGenre"]').forEach(input => { input.checked = false; });
        this.applyEsploraFilters();
      });
      document.getElementById('esploraSearch')?.addEventListener('click', () => this.openSearch());
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
      const map = { 'Concluso': 'done', 'In corso': 'airing', 'Annunciato': 'soon', 'In pausa': 'soon', 'Cancellato': 'soon', 'Completed': 'done', 'Ongoing': 'airing', 'Upcoming': 'soon' };
      const ic = { 'Concluso': 'ri-check-line', 'In corso': 'ri-loader-2-line', 'Annunciato': 'ri-time-line', 'Completed': 'ri-check-line', 'Ongoing': 'ri-loader-2-line', 'Upcoming': 'ri-time-line' };
      return `<span class="status status-${map[t.statusLabel] || 'soon'}"><i class="${ic[t.statusLabel] || 'ri-time-line'}"></i>${esc(t.statusLabel)}</span>`;
    }
    card(t, opts = {}) {
      if (!t) return '';
      const w = this.isWatched(t.id), l = this.isLater(t.id);
      const why = opts.why ? `<span class="card-why" title="${esc(opts.why)}">${esc(opts.why)}</span>` : '';
      const col = t.coverColor ? `style="--cc:${esc(t.coverColor)}"` : '';
      const rank = opts.rank ? `<span class="card-rank">${opts.rank}</span>` : '';
      const essMark = (!opts.noEss && ESSENTIAL_IDS.has(t.id));
      const essTag = c => essMark ? `<span class="card-ess ${c}"><i class="ri-vip-crown-fill"></i> Top</span>` : '';
      const TCARD = T;
      return `<a class="card ${w ? 'is-watched' : ''} ${l ? 'is-later' : ''} ${essMark ? 'has-ess' : ''}" data-card="${esc(t.id)}" data-band="${esc(t.lengthBand)}" href="/t/${esc(t.id)}" ${col}>
        <div class="card-poster">
          <img src="${esc(thumb(cover(t)))}" alt="${esc(t.title)}" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">
          ${rank}
          <div class="card-marks">
            <button class="cm js-watch ${w ? 'on' : ''}" data-id="${esc(t.id)}" title="${TCARD.watched}" aria-label="${TCARD.watched}"><i class="ri-check-line"></i></button>
            <button class="cm js-later ${l ? 'on' : ''}" data-id="${esc(t.id)}" title="${TCARD.toWatch}" aria-label="${TCARD.toWatch}"><i class="ri-bookmark-line"></i></button>
          </div>
          ${w ? `<span class="card-seen"><i class="ri-check-double-line"></i> ${TCARD.seen}</span>` : ''}
          ${essTag('card-ess-poster')}
          <span class="lchip ls-${t.lengthBand}" title="${esc(lenLabel(t))} · ${esc(lenHint(t))}"><i class="ri-time-line"></i>${esc(lenLabel(t))}</span>
        </div>
        <div class="card-body">
          ${essTag('card-ess-body')}
          <div class="card-title" title="${esc(t.title)}">${esc(t.title)}</div>
          <div class="card-sub">
            <div class="card-len ls-${t.lengthBand}"><i class="ri-time-line"></i>${esc(lenLabel(t))}<span class="card-len-hint">· ${esc(lenHint(t))}</span></div>
            <div class="card-meta">${t.year ? esc(t.year) + ' · ' : ''}${esc(t.typeLabel)}${t.score10 ? ` · <span class="card-score"><i class="ri-star-fill"></i>${t.score10.toFixed(1)}</span>` : ''}</div>
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
    // prime N copertine rappresentative di un percorso (per il banner): dai membri reali della sezione
    pathCovers(p, n) {
      return catTitles(p).filter(t => t && t.coverImage).slice(0, n);
    }
    previewTitles(list, pid, n = 3) {
      return [...list].sort((a, b) => {
        const wt = t => tierOf(pid, t.id) === 'e' ? 2 : (tierOf(pid, t.id) === 'c' ? 1 : 0);
        return wt(b) - wt(a) || rankSort(a, b);
      }).slice(0, n);
    }
    // tile di un percorso/genere
    pathTile(p, opts = {}) {
      const mem = catTitles(p);
      // GENERI: card pulita e uniforme, SENZA immagine (icona accent + nome + numero). Niente crop a caso.
      if (opts.genre) {
        return `<a class="genre-card" href="/p/${esc(p.id)}" style="--accent:${esc(p.accent)}">
          <span class="genre-card-ic"><i class="${esc(p.icon)}"></i></span>
          <span class="genre-card-txt">
            <span class="genre-card-name">${esc(p.title)}</span>
            <span class="genre-card-n">${mem.length} ${T.titlePlural}</span>
          </span>
          <i class="ri-arrow-right-s-line genre-card-arr"></i>
        </a>`;
      }
      // PERCORSI: card con immagine + descrizione (viaggi tematici curati)
      const hero = (HERO_OF[p.id] && BY_ID.get(HERO_OF[p.id])) || mem.find(t => t.bannerImage) || mem.find(t => t.coverImage) || this.pathCovers(p, 1)[0];
      const heroImg = hero ? (hero.bannerImage || cover(hero)) : '';
      return `<a class="path-card" href="/p/${esc(p.id)}" style="--accent:${esc(p.accent)}">
        <div class="path-hero-img">
          ${heroImg ? `<img class="path-1img" src="${esc(heroImg)}" alt="" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">` : ''}
        </div>
        <div class="path-card-body">
          <div class="path-head"><span class="path-ic-wrap"><i class="${esc(p.icon)}"></i></span><h3 class="path-name">${esc(p.title)}</h3></div>
          ${PATH_USE[p.id] ? `<span class="path-use">${esc(PATH_USE[p.id])}</span>` : ''}
          <p class="path-blurb">${esc(p.blurb || p.tagline)}</p>
          <div class="path-foot">
            <span class="path-levels"><i class="ri-film-line"></i> ${mem.length} ${T.titlePlural}</span>
            <span class="path-start">Apri <i class="ri-arrow-right-line"></i></span>
          </div>
        </div>
      </a>`;
    }
    essentialTile() {
      const mem = essentialTitles();
      const hero = mem.find(t => t.bannerImage) || mem.find(t => t.coverImage);
      const heroImg = hero ? (hero.bannerImage || cover(hero)) : '';
      return `<a class="path-card path-card-essential" href="/essenziali" style="--accent:var(--gold)">
        <div class="path-hero-img">
          ${heroImg ? `<img class="path-1img" src="${esc(heroImg)}" alt="" loading="lazy" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">` : ''}
        </div>
        <div class="path-card-body">
          <div class="path-head"><span class="path-ic-wrap"><i class="ri-vip-crown-fill"></i></span><h3 class="path-name">Il meglio</h3></div>
          <span class="path-use">vai sul sicuro</span>
          <p class="path-blurb">${T.bestBlurb}</p>
          <div class="path-foot">
            <span class="path-levels"><i class="ri-film-line"></i> ${mem.length} ${T.titlePlural}</span>
            <span class="path-start">Apri <i class="ri-arrow-right-line"></i></span>
          </div>
        </div>
      </a>`;
    }
    viewHome() {
      const heroImg = [...TITLES].filter(t => t.inList && t.bannerImage).sort(rankSort)[0] || [...TITLES].filter(t => t.bannerImage).sort(rankSort)[0];
      const EIC = ['ri-vip-crown-fill','ri-shapes-line','ri-route-line','ri-compass-3-line'];
      const EHR = ['/essenziali','/generi','/percorsi','/esplora']; const ETO = ['gold','blue','cyan','blue'];
      const entry = T.entry.map((e,i) => [e[0], e[1], EIC[i], EHR[i], ETO[i]]);
      const MIC = ['ri-skull-line','ri-sword-line','ri-time-line','ri-knife-line','ri-book-open-line','ri-movie-2-line'];
      const MHR = ['/p/seinen-e-maturo','/p/azione','/p/viaggi-nel-tempo','/p/antieroi','/p/storici','/p/cinema-dautore'];
      const MAC = ['#e05252','#ef7c35','#45c2ee','#9b6cf4','#d99e12','#20b486'];
      const moods = T.moods.map((m,i) => [m[0], m[1], MIC[i], MHR[i], MAC[i]]);
      const GIC = ['ri-shapes-line','ri-route-line','ri-list-check-3'];
      const guide = T.guide.map((g,i) => [g[0], g[1], GIC[i]]);
      const entryCard = ([title, sub, ic, href, tone]) => `<a class="home-entry-card ${tone === 'gold' ? 'gold' : ''}" href="${href}"><i class="${ic}"></i><span><b>${title}</b><em>${sub}</em></span></a>`;
      const moodCard = ([title, sub, ic, href, accent]) => `<a class="home-mood-card" href="${href}" style="--accent:${accent}"><i class="${ic}"></i><span><b>${title}</b><em>${sub}</em></span></a>`;
      const guideCard = ([title, text]) => `<div class="home-guide-card"><b>${title}</b><span>${text}</span></div>`;
      const H = HOME.hero || {};
      const tempo = HOME.tempo || [];
      const timeCard = t => `<a class="home-time-card" href="/tempo/${esc(t.key)}"><i class="${esc(t.icon)}"></i><span><b>${esc(t.label)}</b><em>${esc(t.sub || '')}</em></span></a>`;
      const firstName = this.user ? esc((this.user.displayName || (this.user.email || '').split('@')[0]).split(' ')[0]) : '';
      return `
      <div class="wrap">
        <!-- HOME MOBILE: launcher asciutto -->
        <div class="home-m">
          <div class="hm-hero">
            ${heroImg ? `<img class="hm-hero-img" src="${esc(heroImg.bannerImage || cover(heroImg))}" alt="" loading="eager" onload="this.classList.add('ld')" onerror="this.classList.add('ld')">` : ''}
            <span class="hm-hero-veil"></span>
            <div class="hm-hero-txt">
              <p class="hm-hi">${firstName ? `${T.hi} ${firstName}` : T.welcome}</p>
              <h1 class="hm-hero-title">${T.whereStart}</h1>
            </div>
          </div>
          <section class="hm-panel">
            <div class="hm-panel-head">
              <b>${T.startHere}</b>
              <span>${T.pickMethod}</span>
            </div>
            <div class="home-entry-grid mobile">${entry.map(entryCard).join('')}</div>
            <div class="hm-mini-title"><i class="ri-compass-3-line"></i> ${T.quickPicks}</div>
            <div class="home-mood-grid mobile">${moods.map(moodCard).join('')}</div>
            <div class="hm-mini-title"><i class="ri-time-line"></i> ${T.howMuchTime}</div>
            <div class="home-time-row mobile">${tempo.map(timeCard).join('')}</div>
          </section>
          <div class="home-guide mobile">${guide.map(guideCard).join('')}</div>
        </div>
        <!-- HOME DESKTOP: ingresso unico, niente liste duplicate -->
        <div class="home-d">
        <section class="home-hero home-hero-full">
          ${heroImg ? `<div class="home-hero-art"><img src="${esc(heroImg.bannerImage || cover(heroImg))}" alt="" loading="eager" onload="this.classList.add('ld')" onerror="this.classList.add('ld')"></div>` : ''}
          <span class="home-hero-veil"></span>
          <div class="home-hero-in">
            ${this.user ? `<span class="hh-kicker">${T.hi} ${esc((this.user.displayName || (this.user.email || '').split('@')[0]).split(' ')[0])}</span>` : ''}
            <h1 class="hh-title">${esc(H.title || '')}</h1>
            <p class="hh-sub">${esc(H.sub || '')}</p>
            <div class="hh-cta">
              <a class="btn-red" href="/esplora"><i class="ri-compass-3-line"></i> ${T.exploreAll}</a>
              <a class="hh-btn ghost" href="/generi"><i class="ri-shapes-line"></i> ${T.seeGenres}</a>
            </div>
          </div>
        </section>

        <section class="home-start home-full">
          <div class="home-start-head">
            <div><b>${T.chooseStart}</b><span>${T.methodFirst}</span></div>
            <i class="ri-cursor-line"></i>
          </div>
          <div class="home-entry-grid">${entry.map(entryCard).join('')}</div>
          <div class="home-start-body">
            <div class="home-cluster">
              <div class="home-cluster-head"><i class="ri-compass-3-line"></i><span>${T.quickPicks}</span></div>
              <div class="home-mood-grid">${moods.map(moodCard).join('')}</div>
            </div>
            <div class="home-cluster home-cluster-time">
              <div class="home-cluster-head"><i class="ri-time-line"></i><span>${T.howMuchTime}</span></div>
              <div class="home-time-row">${tempo.map(timeCard).join('')}</div>
            </div>
          </div>
        </section>
        <section class="home-guide-band home-full">
          <div class="home-guide">${guide.map(guideCard).join('')}</div>
        </section>
        </div>
      </div>`;
    }
    viewEssenziali() {
      const list = essentialTitles();
      return `<section class="wrap esplora-head essentials-head">
        <h1>${T.bestTitle}</h1>
        <p>${T.bestLead}</p>
      </section>
      <section class="wrap">
        <div class="sec-head sub"><h2><i class="ri-vip-crown-fill"></i> ${T.bestOf}</h2><span class="sec-count">${list.length} ${T.titles}</span></div>
        ${this.pagedGrid(list)}
      </section>`;
    }
    // ── VISTA: GENERI (griglia categorie) ────────────────────────────────────────
    viewGeneri() {
      const lane = (title, icon, ids) => {
        const paths = ids.map(id => PATHS.find(p => p.id === id)).filter(Boolean);
        if (!paths.length) return '';
        return `<section class="genre-lane">
          <div class="genre-lane-head"><h2><i class="${icon}"></i> ${title}</h2><span>${paths.length}</span></div>
          <div class="genre-grid">${paths.map(p => this.pathTile(p, { genre: true })).join('')}</div>
        </section>`;
      };
      const used = new Set([
        'battle-shonen','azione','supereroi','sport',
        'seinen-e-maturo','horror-e-disagio','sopravvivenza','vendetta','antieroi','crimine',
        'mindfuck','viaggi-nel-tempo','sci-fi','mecha','super-robot',
        'romance','commedia','slice-of-life',
        'fantasy','isekai','storici','cinema-dautore'
      ]);
      const other = GENRE_PATHS.map(p => p.id).filter(id => !used.has(id));
      return `<section class="wrap sec-page">
        <div class="sec-page-head genre-page-head"><h1>${T.generiTitle}</h1><p>${T.generiLead}</p></div>
        <div class="genre-map">
          ${lane(T.laneAction, 'ri-sword-line', ['battle-shonen','azione','supereroi','sport'])}
          ${lane(T.laneDark, 'ri-skull-line', ['seinen-e-maturo','horror-e-disagio','sopravvivenza','vendetta','antieroi','crimine'])}
          ${lane(T.laneMind, 'ri-brain-line', ['mindfuck','viaggi-nel-tempo','sci-fi','mecha','super-robot'])}
          ${lane(T.laneFeel, 'ri-heart-3-line', ['romance','commedia','slice-of-life'])}
          ${lane(T.laneWorlds, 'ri-earth-line', ['fantasy','isekai','storici','cinema-dautore', ...other])}
        </div>
      </section>`;
    }
    // ── VISTA: PERCORSI (griglia percorsi tematici) ──────────────────────────────
    viewPercorsi() {
      const row = (p, opts = {}) => {
        const mem = opts.essential ? essentialTitles() : catTitles(p);
        const title = opts.essential ? T.bestTitle : p.title;
        const href = opts.essential ? '/essenziali' : `/p/${esc(p.id)}`;
        const icon = opts.essential ? 'ri-vip-crown-fill' : p.icon;
        const use = opts.essential ? T.safeBet : (LANG === 'en' ? T.pathWord : (PATH_USE[p.id] || T.pathWord));
        const blurb = opts.essential ? T.bestBlurb : (p.blurb || p.tagline);
        const accent = opts.essential ? 'var(--gold)' : p.accent;
        return `<a class="route-row" href="${href}" style="--accent:${esc(accent)}">
          <span class="route-ic"><i class="${esc(icon)}"></i></span>
          <span class="route-main"><b>${esc(title)}</b><em>${esc(blurb)}</em></span>
          <span class="route-meta"><i>${esc(use)}</i><strong>${mem.length} ${T.titles}</strong></span>
        </a>`;
      };
      return `<section class="wrap sec-page">
        <div class="sec-page-head route-page-head"><h1>${T.percorsiTitle}</h1><p>${T.percorsiLead}</p></div>
        <div class="route-list">${row(null, { essential: true })}${PERCORSI_PATHS.map(p => row(p)).join('')}</div>
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
      if (LANG === 'en') return this.docPage('About', 'The person behind GUARDALO.', `
        <p>GUARDALO is an <b>anime guide</b>, not a catalog: every title is picked and explained to tell you <i>why</i> to watch it, where to start, how much it asks of you and where to see it. No random lists, no spoilers.</p>
        <p>I built it myself, <b>Francesco Spidah</b>: the selection, texts and paths are personal curation. The goal is to help anyone find the right anime without wasting hours among a thousand identical entries.</p>
        <h2>The data</h2>
        <p>Information and cover art come from <a href="https://anilist.co" target="_blank" rel="noopener">AniList</a> (used under their terms). Ratings combine the AniList data with my editorial selection. Titles and trademarks belong to their respective owners.</p>
        <h2>Contact</h2>
        <p>For reports, errors or collaborations: <a href="mailto:magistaf@gmail.com">magistaf@gmail.com</a>.</p>
        <p class="doc-sign">— Francesco Spidah</p>`);
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
      if (LANG === 'en') return this.docPage('Privacy Policy', 'Last updated: June 2026.', `
        <h2>Data controller</h2>
        <p>The data controller is <b>Francesco Spidah</b> (contact: <a href="mailto:magistaf@gmail.com">magistaf@gmail.com</a>).</p>
        <h2>Data collected</h2>
        <p><b>Anonymous browsing:</b> no account required. Your preferences (watched/to-watch titles, theme) are stored <b>only in your browser</b> (localStorage) and are not sent to us.</p>
        <p><b>Optional account (Google):</b> if you sign in to sync your progress, we use Firebase Authentication and Firestore (Google) to save your list. User id and email are processed.</p>
        <p><b>Advertising and analytics:</b> if enabled, third parties (e.g. Google AdSense) may use cookies to show relevant ads. See the <a href="/cookie">Cookie Policy</a>.</p>
        <h2>Your rights (GDPR)</h2>
        <p>You can request access, rectification or deletion of your data by writing to the contact above. You can delete local data by clearing this site's data in your browser.</p>
        <h2>Third parties</h2>
        <p>AniList (anime data), Google Firebase (optional login/sync), Google AdSense (advertising, if enabled). Each processes data under its own policy.</p>`);
      return this.docPage('Privacy Policy', 'Ultimo aggiornamento: giugno 2026.', `
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
      if (LANG === 'en') return this.docPage('Cookie Policy', 'Last updated: June 2026.', `
        <h2>What we use</h2>
        <p><b>Strictly necessary:</b> the site stores your preferences locally (localStorage): watched/to-watch titles, light/dark theme, cookie consent. They are not used to profile you and cannot be disabled.</p>
        <p><b>Functional (optional):</b> if you sign in with Google, Firebase uses cookies/tokens to keep you authenticated.</p>
        <p><b>Advertising (optional):</b> if Google AdSense is enabled, third-party cookies are used for ads and measurement. They are subject to your consent via the banner.</p>
        <h2>Manage consent</h2>
        <p>You can accept or reject non-essential cookies from the banner on your first visit. You can change your mind by clearing this site's data in your browser (the banner will reappear).</p>`);
      return this.docPage('Cookie Policy', 'Ultimo aggiornamento: giugno 2026.', `
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
                <span>${catTitles(p).length} ${T.titlePlural} · ${T.orderedBest}</span>
              </div>
            </div>
          </div>
        </div>
      </section>`;

      // ogni percorso/genere: scheda introduttiva + le 3 fasce (per-genere, da categories.json)
      {
        const members = catTitles(p);
        const inTier = code => members.filter(t => tierOf(p.id, t.id) === code).sort(rankSort);
        const top = inTier('e');
        const consigliati = inTier('c');
        const extra = inTier('d');
        const noPersonal = !top.length && !consigliati.length;
        const scheda = `
        <section class="wrap cat-intro-wrap">
          <div class="cat-intro" style="--accent:${esc(p.accent)}">
            <span class="cat-intro-ic"><i class="${esc(p.icon)}"></i></span>
            <div class="cat-intro-txt">
              <p class="cat-about">${esc(p.about || p.blurb || p.tagline || '')}</p>
            </div>
          </div>
        </section>`;
        const filterBar = `
        <section class="wrap">
          <div class="cat-filter" id="catFilter">
            <span class="cf-lbl">Quanto tempo hai?</span>
            <button class="cf-chip on" data-band="all">${T.filterAll}</button>
            ${TEMPO.map(t => `<button class="cf-chip" data-band="${esc(t.key)}">${esc(t.label)}</button>`).join('')}
          </div>
        </section>`;
        const sec = (label, ic, list, cls) => list.length ? `
          <section class="wrap">
            <div class="sec-divider ${cls || ''}"><span class="sd-label"><i class="${ic}"></i> ${label}</span><span class="sd-line"></span><span class="sd-count">${list.length} ${T.titles}</span></div>
            <div class="grid">${list.map(t => this.card(t, { noEss: true })).join('')}</div>
          </section>` : '';
        const body = noPersonal
          ? sec(TIER_LABEL.d, 'ri-compass-3-line', extra, 'sd-d')
          : sec(TIER_LABEL.e, 'ri-vip-crown-fill', top, 'sd-e')
            + sec(TIER_LABEL.c, 'ri-bookmark-3-line', consigliati, 'sd-c')
            + sec(TIER_LABEL.d, 'ri-compass-3-line', extra, 'sd-d');
        return hero + scheda + filterBar + body;
      }
    }

    // ── VISTA: TITOLO ────────────────────────────────────────────────────────────
    viewTitle(id) {
      const t = BY_ID.get(id);
      if (!t) return this.notFound();
      const w = this.isWatched(id), l = this.isLater(id);

      // ETICHETTE = TUTTE le categorie del sito a cui appartiene il titolo (generi + percorsi + altre),
      // coerenti con la navigazione e cliccabili. Generi prima, poi percorsi/altre.
      // GENERI = SOLO le categorie del sito a cui appartiene il titolo (i 18 generi + slice/sport),
      // NON i percorsi/liste e NON i generi grezzi AniList. Scelta confermata da Francesco (lui ne aggiunge via SCHEMA).
      const genreSecs = [...GENRE_IDS, ...Object.keys(CAT_MEMBERS).filter(s => !GENRE_IDS.includes(s) && !PERCORSI_IDS.includes(s))];
      const siteSecs = genreSecs.filter(sid => (CAT_MEMBERS[sid] || []).includes(t.id));
      const genres = siteSecs.map(sid => { const p = PATHS.find(x => x.id === sid); return p ? `<a class="g-chip" href="/p/${esc(sid)}">${esc(p.title)}</a>` : ''; }).filter(Boolean).join('');
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
        ? `<details class="extra-fold"><summary><span class="se-h"><i class="ri-film-line"></i> ${T.filmsOvas} <b>(${extras.length})</b></span></summary><div class="se-list">${extraPills}</div></details>`
        : `<div class="struct-extra"><span class="se-h"><i class="ri-film-line"></i> ${T.filmsOvas} (${extras.length})</span><div class="se-list">${extraPills}</div></div>`);
      // "Come guardarlo": da dove iniziare + struttura + film/OVA (raggruppati)
      const structInner = struct.length ? `
          ${mainSteps.length ? `<ol class="struct">${mainSteps.map(s => `<li>${relAnchor(s.name, `<span class="st-name">${esc(s.name)}</span><span class="st-ep">${esc(s.episodes)}${s.year ? ` · ${s.year}` : ''}</span>`, 'st-row')}</li>`).join('')}</ol>` : ''}
          ${extrasHtml}` : '';
      // "Buono a sapersi" (note pratiche) va DENTRO il box "Di cosa parla", non come box a sé
      const tipsInner = (t.tips && t.tips.length) ? `
          <div class="t-tips">
            <span class="t-tips-h"><i class="ri-lightbulb-flash-line"></i> ${T.goodToKnow}</span>
            <ul>${t.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>` : '';
      const watchBody = (struct.length || t.startFrom) ? `
          ${t.startFrom ? `<p class="t-startfrom"><b>${T.startFromLbl}</b> <em>${esc(t.startFrom)}</em></p>` : ''}
          ${structInner}` : '';

      const streaming = (t.streaming || []);
      const streamBody = `
          <p class="t-legal"><span class="legal-pill">${T.legalOnly}</span></p>
          ${streaming.length
            ? `<div class="streams">${streaming.map(s => `<a class="stream" href="${esc(s.url)}" target="_blank" rel="noopener nofollow"><i class="ri-external-link-line"></i> ${esc(s.name)}</a>`).join('')}</div>`
            : `<p class="muted-line">${T.noStream}</p>`}`;

      const recs = this.recsSections(t);

      // dati cliccabili → portano alla ricerca correlata (/cerca/<campo>/<valore>)
      const fLink = (field, val) => `<a class="cr-link" href="/cerca/${field}/${encodeURIComponent(val)}" title="Vedi altri titoli">${esc(val)}</a>`;
      const credits = [
        t.studios?.length ? ['Studio', t.studios.map(s => fLink('studio', s)).join(', ')] : null,
        t.director ? [T.lblRegia, fLink('regista', t.director)] : null,
        t.creator ? [T.lblOrig, fLink('autore', t.creator)] : null,
        t.sourceLabel ? [T.lblBasedOn, esc(t.sourceLabel)] : null,
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
              <button class="t-btn js-watch ${w ? 'on' : ''}" data-id="${esc(t.id)}"><i class="ri-check-double-line"></i> ${w ? T.watched : T.markWatched}</button>
              <button class="t-btn ghost js-later ${l ? 'on' : ''}" data-id="${esc(t.id)}"><i class="ri-bookmark-line"></i> ${l ? T.saved : T.toWatch}</button>
              <button class="t-btn ghost js-share" data-id="${esc(t.id)}" data-title="${esc(t.title)}"><i class="ri-share-forward-line"></i> ${T.share}</button>
            </div>
            ${credits ? this.tFold('credits', 'ri-information-line', T.techSheet, `<div class="t-credits">${credits}</div>`, false) : ''}
          </aside>

          <div class="t-main">
            <a class="back" href="javascript:history.back()"><i class="ri-arrow-left-line"></i> ${T.back}</a>
            <h1 class="t-title">${esc(t.title)}</h1>
            ${(t.titleNative && t.titleNative.toLowerCase().replace(/\s+/g, '') !== t.title.toLowerCase().replace(/\s+/g, '')) ? `<p class="t-native">${esc(t.titleNative)}</p>` : ''}

            <div class="t-badges">
              ${this.lengthScale(t, false)}
              ${this.statusBadge(t)}
              ${t.score10 ? `<span class="t-score"><i class="ri-star-fill"></i> ${t.score10.toFixed(1)}<span>/10</span></span>` : ''}
              <span class="t-year">${esc(t.year || '')}</span>
            </div>

            ${genres ? `<div class="t-tags">${genres}</div>` : ''}

            ${this.tFold('about', 'ri-file-text-line', T.about, `
              <p>${esc(t.hook || T.comingSoon)}</p>
              ${t.forWho ? `<p class="t-forwho"><b>${T.forWhoLbl}</b> ${esc(t.forWho)}</p>` : ''}
              ${tipsInner}`, true)}
            ${watchBody ? this.tFold('watch', 'ri-list-ordered', T.howToWatch, watchBody, false) : ''}
            ${this.tFold('stream', 'ri-play-circle-line', T.whereToWatch, streamBody, false)}
            ${recs ? this.tFold('recs', 'ri-heart-3-line', T.youMightLike, recs, false) : ''}
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
        [T.likedThis, 'ri-heart-3-line', simili, true],
        [T.sameSaga, 'ri-links-line', saga, false],
        [T.sameAuthor, 'ri-user-star-line', autore, true],
        [T.sameStudio, 'ri-building-line', studio, true],
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
        ${list.length > ESPLORA_PAGE ? `<div class="more-wrap"><button class="btn-ghost js-more" id="esploraMore"><i class="ri-add-line"></i> ${T.showMore} ${list.length - ESPLORA_PAGE} ${T.titles}</button></div>` : ''}`;
    }
    // filtra+ordina la lista Esplora secondo i menù
    esploraList() {
      const f = this.esploraFilters || {};
      let list = [...TITLES];
      if (f.essenziali) list = list.filter(t => ESSENTIAL_IDS.has(t.id));
      if (f.genres?.length) list = list.filter(t => f.genres.every(id => (CAT_MEMBERS[id] || []).includes(t.id)));
      if (f.durata) { const bands = tempoBands(f.durata); list = list.filter(t => bands.includes(t.lengthBand)); }
      if (f.tipo) list = list.filter(t => (f.tipo === 'film' ? /film|movie/i.test(t.typeLabel || '') : !/film|movie/i.test(t.typeLabel || '')));
      if (f.sort === 'voto') list.sort((a, b) => (b.score10 || 0) - (a.score10 || 0));
      else if (f.sort === 'recenti') list.sort((a, b) => (b.year || 0) - (a.year || 0));
      else if (f.sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
      else list.sort(rankSort);
      return list;
    }
    applyEsploraFilters() {
      this.esploraFilters = {
        genres: [...document.querySelectorAll('input[name="efGenre"]:checked')].map(input => input.value),
        durata: document.getElementById('efDurata')?.value || '',
        tipo: document.getElementById('efTipo')?.value || '',
        essenziali: !!document.getElementById('efEssenziali')?.checked,
        sort: document.getElementById('efSort')?.value || 'best',
      };
      const list = this.esploraList();
      const box = document.getElementById('esploraResults');
      if (box) box.innerHTML = this.pagedGrid(list);
      const cnt = document.getElementById('esploraCount');
      if (cnt) cnt.textContent = `${list.length} ${list.length === 1 ? T.titleSing : T.titlePlural}`;
    }
    // ── VISTA: ESPLORA (con pannello filtri: genere · durata · tipo · ordina) ─────
    viewEsplora() {
      this.esploraFilters = { genres: [], durata: '', tipo: '', essenziali: false, sort: 'best' };
      const list = this.esploraList();
      const chip = p => `<label class="ef-chip"><input type="checkbox" name="efGenre" value="${esc(p.id)}"><span>${esc(p.title)}</span></label>`;
      const durataOpts = TEMPO.map(t => `<option value="${esc(t.key)}">${esc(t.label)}</option>`).join('');
      return `
      <section class="wrap esplora-head">
        <h1>${T.explore}</h1>
        <p>${T.exploreLead} <button class="link-btn" id="esploraSearch">${T.orSearch}</button></p>
        <div class="esplora-filters" id="esploraFilters">
          <div class="ef-multi" aria-label="${T.genresAndPaths}">
            <div class="ef-multi-head">
              <span>${T.genresAndPaths}</span>
              <button type="button" id="efClearGenres">${T.clear}</button>
            </div>
            <div class="ef-group-label">${T.genresLbl}</div>
            <div class="ef-chip-grid">${GENRE_PATHS.map(chip).join('')}</div>
            <div class="ef-group-label">${T.pathsLbl}</div>
            <div class="ef-chip-grid">${PERCORSI_PATHS.map(chip).join('')}</div>
          </div>
          <div class="ef-row">
          <select id="efDurata" aria-label="Durata"><option value="">${T.anyLength}</option>${durataOpts}</select>
          <select id="efTipo" aria-label="Tipo"><option value="">${T.seriesAndFilms}</option><option value="serie">${T.onlySeries}</option><option value="film">${T.onlyFilms}</option></select>
          <label class="ef-check"><input id="efEssenziali" type="checkbox"> ${T.onlyTop}</label>
          <select id="efSort" aria-label="Ordina"><option value="best">${T.sortBest}</option><option value="voto">${T.sortScore}</option><option value="recenti">${T.sortRecent}</option><option value="az">A-Z</option></select>
        </div>
        </div>
      </section>
      <section class="wrap">
        <div class="sec-head sub"><h2><i class="ri-trophy-line"></i> ${T.results}</h2><span class="sec-count" id="esploraCount">${list.length} ${T.titlePlural}</span></div>
        <div id="esploraResults">${this.pagedGrid(list)}</div>
      </section>`;
    }

    // ── VISTA: RICERCA CORRELATA (studio/regista/autore/genere/tema cliccabili) ──
    viewFacet(field, value) {
      const FIELDS = {
        studio:  { label: T.fStudio,   show: v => v, match: t => (t.studios || []).includes(value) },
        regista: { label: T.fDirector, show: v => v, match: t => t.director === value },
        autore:  { label: T.fWork,     show: v => v, match: t => t.creator === value },
        tag:     { label: T.fTheme,    show: v => v, match: t => (t.tags || []).includes(value) },
        tono:    { label: T.fMood,     show: v => v, match: t => (t.tone || []).includes(value) },
        genere:  { label: T.fGenre,    show: v => itGenre(v), match: t => (t.genres || []).includes(value) },
      };
      const f = FIELDS[field];
      if (!f || !value) return this.notFound();
      const list = TITLES.filter(f.match).sort(rankSort);
      const head = `<section class="wrap esplora-head">
        <a class="back" href="javascript:history.back()"><i class="ri-arrow-left-line"></i> ${T.back}</a>
        <h1><span class="facet-kind">${esc(f.label)}</span> ${esc(f.show(value))}</h1>
        <p>${list.length ? `${list.length} ${list.length === 1 ? T.titleSing : T.titlePlural}, ${T.fromBest}` : T.noResults}</p>
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
      if (cnt) cnt.textContent = `${list.length} ${list.length === 1 ? T.titleSing : T.titlePlural}`;
      wrap.innerHTML = list.length
        ? `<div class="grid">${list.map(t => this.card(t)).join('')}</div>`
        : `<div class="empty mini"><i class="ri-filter-off-line"></i><p>${T.noToWatchFilter}</p></div>`;
    }
    viewLista() {
      this.listSort = 'durata'; this.listGenre = '';
      const watched = Object.keys(this.watched).map(id => BY_ID.get(id)).filter(Boolean).sort((a, b) => (b.score10 || 0) - (a.score10 || 0));
      const later = this.laterSort(Object.keys(this.toWatch).map(id => BY_ID.get(id)).filter(Boolean), 'durata');
      const hours = watched.reduce((s, t) => s + (t.coreMinutes || 0), 0) / 60;

      // lista del tutto vuota → un solo messaggio accogliente (niente due box vuoti + zeri)
      if (!watched.length && !later.length) {
        return `<section class="wrap"><div class="empty big">
          <i class="ri-bookmark-line"></i>
          <h1>${T.listEmptyH}</h1>
          <p>${T.listEmptyP}</p>
          <a class="btn-red" href="/generi"><i class="ri-shapes-line"></i> ${T.browseGenres}</a>
        </div></section>`;
      }

      const grid = list => `<div class="grid">${list.map(t => this.card(t)).join('')}</div>`;
      const empty = (ic, msg) => `<div class="empty"><i class="${ic}"></i><p>${msg}</p><a class="btn-ghost" href="/percorsi">${T.goToPaths}</a></div>`;

      const genreSet = [...new Set(later.flatMap(t => t.genres || []))].sort((a, b) => itGenre(a).localeCompare(itGenre(b)));
      const controls = later.length > 1 ? `
        <div class="list-controls" id="listControls">
          <div class="lc-sort" role="group" aria-label="Ordina i titoli da vedere">
            <button class="lc-btn on" data-sort="durata"><i class="ri-time-line"></i> ${T.shortest}</button>
            <button class="lc-btn" data-sort="voto"><i class="ri-star-line"></i> ${T.score}</button>
            <button class="lc-btn" data-sort="az"><i class="ri-sort-asc"></i> A-Z</button>
          </div>
          ${genreSet.length > 1 ? `<select class="lc-genre" id="listGenre" aria-label="Filtra per genere"><option value="">${T.allGenres}</option>${genreSet.map(g => `<option value="${esc(g)}">${esc(itGenre(g))}</option>`).join('')}</select>` : ''}
        </div>` : '';

      return `
      <section class="wrap">
        <div class="sec-head"><h1>${T.myList}</h1>
          ${later.length ? `<button class="btn-ghost" id="pickFromList"><i class="ri-dice-line"></i> ${T.pickForMe}</button>` : ''}</div>
        <div class="list-stats">
          <div class="ls-stat"><b>${watched.length}</b><span>${T.statWatched}</span></div>
          <div class="ls-stat"><b>${later.length}</b><span>${T.statToWatch}</span></div>
          <div class="ls-stat"><b>${Math.round(hours)}h</b><span>${T.statHours}</span></div>
        </div>
        <div class="sec-head sub"><h2><i class="ri-bookmark-line"></i> ${T.toWatchH}</h2>${later.length ? `<span class="sec-count" id="laterCount">${later.length} ${T.titlePlural}</span>` : ''}</div>
        ${controls}
        ${later.length ? `<div id="laterGrid">${grid(later)}</div>` : empty('ri-bookmark-line', T.nothingYet)}
        <div class="sec-head sub"><h2><i class="ri-check-double-line"></i> ${T.watchedH}</h2></div>
        ${watched.length ? grid(watched) : empty('ri-check-double-line', T.markSeen)}
      </section>`;
    }

    // ── VISTA: PROFILO ───────────────────────────────────────────────────────────
    viewProfilo() {
      if (!this.user) {
        return `<section class="wrap prof-gate">
          <span class="prof-gate-ic"><i class="ri-user-3-line"></i></span>
          <h1>${T.yourProfile}</h1>
          <p>${T.profileGate}</p>
          <button class="btn-red" id="profLogin"><i class="ri-google-fill"></i> ${T.signInGoogle}</button>
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
          <div class="prof-id"><h1>${T.hi} ${esc(name)}</h1><span>${esc(this.user.email || '')}</span></div>
          <button class="btn-ghost prof-logout" id="profLogout"><i class="ri-logout-box-r-line"></i> ${T.signOut}</button>
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
      const tOrder = { e: 0, c: 1, d: 2 }, tLabel = { e: 'Da vedere prima', c: 'Consigliato', d: 'Extra' };
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
          <span class="admin-count">${mem.length} titoli · <b class="t-e">${this._admCnt.e} Da vedere prima</b> · <b class="t-c">${this._admCnt.c} Consigliati</b> · <b class="t-d">${this._admCnt.d} Extra</b> · hero: <b>${esc(hero ? (BY_ID.get(hero)?.title || hero) : '—')}</b></span>
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
        <p class="admin-hint">Clicca <b>E</b>/<b>C</b>/<b>D</b> per mettere ogni titolo in Da vedere prima, Consigliati o Extra <i>in questa sezione</i>. <i class="ri-image-line"></i> = immagine hero · <i class="ri-close-line"></i> = togli.</p>
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
      if (lg) lg.addEventListener('click', () => this.openLogin());
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
      const categories = { _nota: 'Tassonomia editabile. genreOrder/percorsoOrder = ordine in griglia; members = titoli di ogni genere; hero = immagine; tiers[id] = fascia di ogni titolo in quel genere/percorso (e=Da vedere prima, c=Consigliato, d=Extra). Dopo modifiche: npm run gen.', genreOrder: cat.genreOrder, percorsoOrder: cat.percorsoOrder, hero: cat.hero, members: cat.members, tiers: cat.tiers || {} };
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
      return `<section class="wrap empty big"><i class="ri-compass-3-line"></i><h1>${T.notFoundH}</h1><p>${T.notFoundP}</p><a class="btn-ghost" href="/">${T.backHome}</a></section>`;
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
        box.innerHTML = `<p class="sr-hint">${T.searchHint}<span class="sr-kbd"> ${LANG==='en'?'Press':'Premi'} <kbd>/</kbd> ${LANG==='en'?'to reopen.':'per riaprire.'}</span></p>`;
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
        : `<p class="sr-hint">${T.noSearch} “${esc(q)}”.</p>`;
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
