// GUARDALO — app.js v9
// Generi principali (in italiano) con accorpamento dei generi grezzi rari.
// Un titolo appartiene al gruppo se ha almeno uno dei generi "raw".
const GENRE_GROUPS = [
    { name: 'Azione',         icon: 'ri-sword-line',        raw: ['Action', 'Martial Arts', 'Military', 'Western'] },
    { name: 'Avventura',      icon: 'ri-compass-3-line',    raw: ['Adventure'] },
    { name: 'Fantasy',        icon: 'ri-magic-line',        raw: ['Fantasy'] },
    { name: 'Fantascienza',   icon: 'ri-rocket-line',       raw: ['Sci-Fi', 'Cyberpunk', 'Post-apocalyptic', 'Time Travel', 'Game'] },
    { name: 'Drammatico',     icon: 'ri-emotion-sad-line',  raw: ['Drama'] },
    { name: 'Soprannaturale', icon: 'ri-ghost-line',        raw: ['Supernatural', 'Vampire'] },
    { name: 'Commedia',       icon: 'ri-emotion-laugh-line',raw: ['Comedy', 'Parody'] },
    { name: 'Horror',         icon: 'ri-skull-2-line',      raw: ['Horror'] },
    { name: 'Thriller',       icon: 'ri-search-eye-line',   raw: ['Thriller', 'Mystery', 'Crime', 'Psychological'] },
    { name: 'Storico',        icon: 'ri-ancient-gate-line', raw: ['Historical'] },
    { name: 'Isekai',         icon: 'ri-door-open-line',    raw: ['Isekai'] },
    { name: 'Supereroi',      icon: 'ri-shield-star-line',  raw: ['Superhero'] },
    { name: 'Mecha',          icon: 'ri-robot-line',        raw: ['Mecha'] },
];

class GuardaloApp {
    constructor() {
        this.animeData = [];
        this.filteredAnime = [];
        this.filters = { search: '', genres: [], status: 'all', category: 'animazione' };
        this.sortBy = 'rating';
        this.viewMode = 'grid';
        this.currentUser = null;
        this.userAnime = {};
        this.init();
    }

    async init() {
        this.animeData = [...animeData];
        this.filteredAnime = [...animeData];
        document.body.dataset.cat = this.filters.category;
        this.initTheme();
        this.initView();
        this.updateCatCounts();
        this.buildGenreChips();
        this.bindEvents();
        this.applyFilters();
        this.initFirebase();
    }

    // Titoli appartenenti alla categoria attiva
    inCategory(a) {
        // retro-compatibile: voci senza category sono "animazione"
        return (a.category || 'animazione') === this.filters.category;
    }

    updateCatCounts() {
        const counts = { animazione: 0, live: 0 };
        animeData.forEach(a => { counts[a.category || 'animazione']++; });
        const an = document.getElementById('count-animazione');
        const lv = document.getElementById('count-live');
        if (an) an.textContent = counts.animazione;
        if (lv) lv.textContent = counts.live;
    }

    switchCategory(cat) {
        if (this.filters.category === cat) return;
        this.filters.category = cat;
        this.filters.genres = [];
        document.body.dataset.cat = cat;
        document.querySelectorAll('.cat-tab').forEach(t =>
            t.classList.toggle('active', t.dataset.cat === cat));
        const search = document.getElementById('searchInput');
        search.placeholder = cat === 'live' ? 'Cerca serie TV...' : 'Cerca anime...';

        // View Transitions API (2026): crossfade nativo, con fallback automatico
        const update = () => { this.buildGenreChips(); this.applyFilters(); };
        if (document.startViewTransition) document.startViewTransition(update);
        else update();
    }

    // ── FIREBASE ──────────────────────────────────────────────
    initFirebase() {
        try {
            if (typeof auth === 'undefined') return;
            auth.onAuthStateChanged(user => {
                this.currentUser = user;
                this.updateNavUI();
                if (user) this.loadFromCloud();
                else this.loadFromLocal();
            });
        } catch (e) {
            console.warn('Firebase non disponibile', e);
            this.loadFromLocal();
        }
    }

    loadFromCloud() {
        db.collection('users').doc(this.currentUser.uid).get()
            .then(doc => {
                const raw = doc.exists ? (doc.data().anime || {}) : {};
                this.userAnime = this.migrateUserAnime(raw);
                if (this._userAnimeMigrated) this.save(); // riscrive in cloud con chiave id
                this.applyFilters();
            })
            .catch(() => this.loadFromLocal());
    }

    loadFromLocal() {
        let raw = {};
        try {
            const stored = localStorage.getItem('guardalo_anime');
            if (stored) raw = JSON.parse(stored);
        } catch (e) {}
        this.userAnime = this.migrateUserAnime(raw);
        if (this._userAnimeMigrated) this.save();
        this.applyFilters();
    }

    // Migra lo stato salvato dalla vecchia chiave (titolo) all'id stabile.
    // Idempotente: ai caricamenti successivi le chiavi sono già id e non cambia nulla.
    migrateUserAnime(raw) {
        const titleToId = {};
        animeData.forEach(a => { titleToId[a.title] = a.id; });
        const out = {};
        let changed = false;
        for (const [key, val] of Object.entries(raw || {})) {
            const mappedId = titleToId[key];
            if (mappedId) changed = true;          // la chiave era un titolo → convertita
            const k = mappedId || key;             // altrimenti è già un id
            out[k] = { ...(out[k] || {}), ...val };
        }
        this._userAnimeMigrated = changed;
        return out;
    }

    save() {
        if (this.currentUser && typeof db !== 'undefined') {
            db.collection('users').doc(this.currentUser.uid)
                .set({ anime: this.userAnime }, { merge: true });
        } else {
            localStorage.setItem('guardalo_anime', JSON.stringify(this.userAnime));
        }
    }

    updateNavUI() {
        const loginBtn  = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo  = document.getElementById('userInfo');
        if (this.currentUser) {
            loginBtn.style.display  = 'none';
            logoutBtn.style.display = 'flex';
            userInfo.textContent = this.currentUser.displayName || this.currentUser.email;
        } else {
            loginBtn.style.display  = 'flex';
            logoutBtn.style.display = 'none';
            userInfo.textContent = '';
        }
    }

    // ── TEMA CHIARO/SCURO ─────────────────────────────────────
    initTheme() {
        let theme = 'dark';
        try { theme = localStorage.getItem('guardalo_theme') || 'dark'; } catch (e) {}
        this.applyTheme(theme);
    }

    applyTheme(theme) {
        document.body.dataset.theme = theme;
        const icon = document.querySelector('#themeToggle i');
        if (icon) icon.className = theme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
        // aggiorna il colore della barra di stato del browser/PWA
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f5f8' : '#0b0b0f');
    }

    toggleTheme() {
        const next = document.body.dataset.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(next);
        try { localStorage.setItem('guardalo_theme', next); } catch (e) {}
    }

    // ── VISTA: griglia / elenco compatto ──────────────────────
    initView() {
        let v = 'grid';
        try { v = localStorage.getItem('guardalo_view') || 'grid'; } catch (e) {}
        this.applyView(v);
    }

    applyView(v) {
        this.viewMode = v === 'list' ? 'list' : 'grid';
        const btn = document.getElementById('viewToggle');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon) icon.className = this.viewMode === 'list' ? 'ri-layout-grid-fill' : 'ri-list-unordered';
            btn.title = this.viewMode === 'list' ? 'Vista griglia' : 'Vista elenco';
            btn.setAttribute('aria-pressed', this.viewMode === 'list' ? 'true' : 'false');
        }
    }

    toggleView() {
        this.applyView(this.viewMode === 'list' ? 'grid' : 'list');
        try { localStorage.setItem('guardalo_view', this.viewMode); } catch (e) {}
        this.render();
    }

    // ── GENRE CHIPS ───────────────────────────────────────────
    // Un titolo appartiene a un gruppo se ha almeno uno dei suoi generi raw
    matchesGroup(anime, group) {
        return anime.genres.some(g => group.raw.includes(g));
    }

    buildGenreChips() {
        const container = document.getElementById('genreChips');
        if (!container) return;
        container.innerHTML = '';
        const inCat = animeData.filter(a => this.inCategory(a));

        GENRE_GROUPS.forEach(group => {
            const count = inCat.filter(a => this.matchesGroup(a, group)).length;
            if (count === 0) return; // niente categorie vuote nella sezione corrente
            const active = this.filters.genres.includes(group.name);
            const btn = document.createElement('button');
            btn.className = 'genre-chip' + (active ? ' active' : '');
            btn.innerHTML =
                `<i class="${group.icon} g-icon"></i>` +
                `<span class="g-name">${group.name}</span>` +
                `<span class="g-count">${count}</span>`;
            btn.addEventListener('click', () => this.toggleGenre(group.name));
            container.appendChild(btn);
        });
    }

    toggleGenre(name) {
        if (this.filters.genres.includes(name)) {
            this.filters.genres = this.filters.genres.filter(g => g !== name);
        } else {
            this.filters.genres.push(name);
        }
        this.buildGenreChips();
        this.applyFilters();
    }

    clearGenres() {
        this.filters.genres = [];
        this.buildGenreChips();
        this.applyFilters();
    }

    // ── EVENTI ───────────────────────────────────────────────
    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');

        // Tab categoria
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchCategory(tab.dataset.cat));
        });

        // Toggle tema chiaro/scuro
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Toggle vista griglia / elenco
        document.getElementById('viewToggle').addEventListener('click', () => this.toggleView());

        // "Mostra tutti" — azzera i generi selezionati
        document.getElementById('genreClear').addEventListener('click', () => this.clearGenres());


        searchInput.addEventListener('input', () => {
            this.filters.search = searchInput.value.toLowerCase().trim();
            clearSearch.classList.toggle('visible', !!searchInput.value);
            this.applyFilters();
        });

        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            this.filters.search = '';
            clearSearch.classList.remove('visible');
            searchInput.focus();
            this.applyFilters();
        });

        document.getElementById('sortSelect').addEventListener('change', e => {
            this.sortBy = e.target.value;
            this.applyFilters();
        });

        document.getElementById('statusFilter').addEventListener('change', e => {
            this.filters.status = e.target.value;
            this.applyFilters();
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            this.filters = { search: '', genres: [], status: 'all', category: this.filters.category };
            this.sortBy = 'rating';
            document.getElementById('searchInput').value = '';
            document.getElementById('statusFilter').value = 'all';
            document.getElementById('sortSelect').value = 'rating';
            clearSearch.classList.remove('visible');
            this.buildGenreChips();
            this.applyFilters();
        });

        // Modal chiudi
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal('detail-modal'));
        document.getElementById('close-login').addEventListener('click', () => this.closeModal('login-modal'));
        document.getElementById('detail-modal').addEventListener('click', e => {
            if (e.target === e.currentTarget) this.closeModal('detail-modal');
        });
        document.getElementById('login-modal').addEventListener('click', e => {
            if (e.target === e.currentTarget) this.closeModal('login-modal');
        });

        // Login / Logout
        document.getElementById('loginBtn').addEventListener('click', () => {
            document.getElementById('login-modal').classList.add('open');
        });
        document.getElementById('logoutBtn').addEventListener('click', () => {
            if (typeof auth !== 'undefined') auth.signOut();
        });
        document.getElementById('google-login').addEventListener('click', () => {
            if (typeof auth !== 'undefined') {
                auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            }
        });

        // Keyboard
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                this.closeModal('detail-modal');
                this.closeModal('login-modal');
            }
            if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
        });

        // Swipe to close su mobile
        const modalEl = document.querySelector('#detail-modal .modal');
        let touchY = 0;
        modalEl.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; }, { passive: true });
        modalEl.addEventListener('touchend', e => {
            if (e.changedTouches[0].clientY - touchY > 70) this.closeModal('detail-modal');
        }, { passive: true });
    }

    closeModal(id) {
        document.getElementById(id)?.classList.remove('open');
    }

    // ── FILTRI + RENDER ───────────────────────────────────────
    applyFilters() {
        const { search, genres, status } = this.filters;

        this.filteredAnime = animeData.filter(a => {
            if (!this.inCategory(a)) return false;
            if (search) {
                const q = search;
                const match =
                    a.title.toLowerCase().includes(q) ||
                    a.genres.some(g => g.toLowerCase().includes(q)) ||
                    GENRE_GROUPS.some(gr => gr.name.toLowerCase().includes(q) && this.matchesGroup(a, gr)) ||
                    (a.studio?.toLowerCase().includes(q)) ||
                    (a.synopsis?.toLowerCase().includes(q));
                if (!match) return false;
            }
            if (genres.length > 0) {
                const ok = genres.every(name => {
                    const group = GENRE_GROUPS.find(gr => gr.name === name);
                    return group && this.matchesGroup(a, group);
                });
                if (!ok) return false;
            }
            if (status !== 'all') {
                const us = this.userAnime[a.id];
                if (status === 'watched' && !us?.watched) return false;
                if (status === 'towatch' && !us?.toWatch) return false;
            }
            return true;
        });

        this.filteredAnime.sort((a, b) => {
            if (this.sortBy === 'title') return a.title.localeCompare(b.title);
            if (this.sortBy === 'year')  return b.year - a.year;
            return b.rating - a.rating;
        });

        this.render();
    }

    render() {
        const grid     = document.getElementById('animeGrid');
        const counter  = document.getElementById('results-count');
        const catTotal = animeData.filter(a => this.inCategory(a)).length;
        const shown    = this.filteredAnime.length;
        const noun     = this.filters.category === 'live' ? 'serie TV' : 'titoli';

        counter.textContent = shown === catTotal
            ? `${catTotal} ${noun}`
            : `${shown} di ${catTotal} ${noun}`;

        const rt = document.getElementById('results-title');
        if (rt) rt.textContent = this.filters.category === 'live'
            ? 'Serie TV consigliate' : 'Animazione consigliata';

        grid.className = this.viewMode === 'list' ? 'list-view' : 'grid';
        grid.innerHTML = '';

        if (shown === 0) {
            // Categoria ancora vuota (es. Serie TV non ancora popolata)
            if (catTotal === 0) {
                grid.innerHTML = `<div class="no-results">
                    <i class="ri-tv-2-line"></i>
                    <strong>Sezione in arrivo</strong>
                    Qui troverai presto le serie TV consigliate
                </div>`;
            } else {
                grid.innerHTML = `<div class="no-results">
                    <i class="ri-search-line"></i>
                    <strong>Nessun risultato</strong>
                    Prova a cambiare i filtri o la ricerca
                </div>`;
            }
            return;
        }

        const make = this.viewMode === 'list'
            ? a => this.makeListRow(a)
            : a => this.makeCard(a);
        this.filteredAnime.forEach(anime => grid.appendChild(make(anime)));
    }

    // Markup condiviso dei due tasti "spunta rapida" (Visto / Da vedere)
    quickActionsHTML(us) {
        return `<div class="card-actions">
            <button class="card-act act-watch ${us.watched ? 'active' : ''}" data-act="watched" title="Segna come Visto" aria-label="Segna come Visto"><i class="ri-check-line"></i></button>
            <button class="card-act act-later ${us.toWatch ? 'active' : ''}" data-act="toWatch" title="Aggiungi a Da vedere" aria-label="Aggiungi a Da vedere"><i class="ri-bookmark-line"></i></button>
        </div>`;
    }

    // Collega i tasti spunta di una card/riga senza aprire il dettaglio
    bindQuickActions(el, anime) {
        el.querySelectorAll('.card-act').forEach(btn =>
            btn.addEventListener('click', e => {
                e.stopPropagation();
                this.toggleStatus(anime.id, btn.dataset.act);
            }));
    }

    // ── RIGA VISTA ELENCO (compatta: thumb minuscola + info principali) ──
    makeListRow(anime) {
        const us = this.userAnime[anime.id] || {};
        const row = document.createElement('div');
        row.className = 'list-row' + (anime.top ? ' is-top' : '');
        row.tabIndex = 0;
        row.setAttribute('role', 'button');
        row.setAttribute('aria-label', anime.title);

        const durata = anime.type === 'Film' ? 'Film' : `${anime.episodes} ep`;
        const sub = [anime.year, durata, anime.type].filter(Boolean).join('  ·  ');

        row.innerHTML = `
            <img class="list-thumb" src="${anime.img}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
            <div class="list-main">
                <span class="list-title">${anime.top ? '<i class="ri-vip-crown-fill list-crown"></i>' : ''}${anime.title}</span>
                <span class="list-sub">${sub}</span>
            </div>
            <span class="list-score"><i class="ri-star-fill"></i>${anime.rating}</span>
            ${this.quickActionsHTML(us)}`;

        row.addEventListener('click', () => this.openDetail(anime));
        row.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.openDetail(anime); }
        });
        this.bindQuickActions(row, anime);
        return row;
    }

    makeCard(anime) {
        const us = this.userAnime[anime.id] || {};
        const card = document.createElement('div');
        card.className = 'card' + (anime.top ? ' card-top' : '');
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', anime.title);

        const scoreClass = anime.rating >= 9 ? 'score-gold'
                         : anime.rating >= 7 ? 'score-green'
                         : 'score-blue';

        const topBadge = anime.top
            ? `<span class="card-badge-top">TOP</span>`
            : '';

        card.innerHTML = `
            <div class="card-poster-wrap">
                <img class="card-poster" src="${anime.img}" alt="${anime.title}" loading="lazy" style="aspect-ratio:2/3"
                     onerror="this.outerHTML='<div class=card-poster-placeholder><i class=ri-image-line></i></div>'">
                ${topBadge}
                <span class="card-score ${scoreClass}"><i class="ri-star-fill"></i>${anime.rating}</span>
                ${this.quickActionsHTML(us)}
            </div>
            <div class="card-info">
                <div class="card-title">${anime.title}</div>
                <div class="card-meta">
                    <span class="card-year">${anime.year}</span>
                    <span class="card-type">${anime.type || ''}</span>
                </div>
            </div>`;

        card.addEventListener('click', () => this.openDetail(anime));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.openDetail(anime); }
        });
        this.bindQuickActions(card, anime);
        return card;
    }

    // ── MODAL DETTAGLIO ───────────────────────────────────────
    openDetail(anime) {
        const us    = this.userAnime[anime.id] || {};
        const modal = document.getElementById('detail-modal');

        modal.querySelector('.modal-title').textContent = anime.title;
        modal.querySelector('.modal-img').src  = anime.img;
        modal.querySelector('.modal-img').alt  = anime.title;
        modal.querySelector('.modal-rating').textContent   = anime.rating;
        modal.querySelector('.modal-year').textContent     = anime.year;
        modal.querySelector('.modal-episodes').textContent = `${anime.episodes} ep.`;
        modal.querySelector('.modal-studio').textContent   = anime.studio;
        modal.querySelector('.modal-status').textContent   = anime.status;
        modal.querySelector('.modal-synopsis').textContent = anime.synopsis;

        document.getElementById('score-fill').style.width = `${anime.rating * 10}%`;

        modal.querySelector('.modal-tags').innerHTML =
            anime.genres.map(g => `<span class="chip-tag">${g}</span>`).join('');

        modal.querySelector('.modal-structure').innerHTML =
            anime.structure.map(s => `
                <div class="struct-item">
                    <span class="struct-name">${s.name}</span>
                    <span class="struct-ep">${s.episodes}</span>
                </div>`).join('');

        const legal  = anime.links.legal  || [];
        const search = anime.links.illegal || [];

        modal.querySelector('.legal-links').innerHTML = legal.length
            ? legal.map(l =>
                `<a href="${l.url}" target="_blank" rel="noopener" class="link-btn link-legal"><i class="ri-play-circle-fill"></i> ${l.name}</a>`
              ).join('')
            : `<span class="link-none"><i class="ri-information-line"></i> Nessuno streaming legale noto</span>`;

        modal.querySelector('.illegal-links').innerHTML =
            search.map(l =>
                `<a href="${l.url}" target="_blank" rel="noopener" class="link-btn link-search"><i class="ri-search-line"></i> ${l.name === 'Cerca' ? 'Cerca dove vederlo' : l.name}</a>`
            ).join('');

        const watchBtn = document.getElementById('btn-watched');
        const laterBtn = document.getElementById('btn-towatch');
        watchBtn.classList.toggle('active', !!us.watched);
        laterBtn.classList.toggle('active', !!us.toWatch);

        watchBtn.onclick = () => this.toggleStatus(anime.id, 'watched');
        laterBtn.onclick = () => this.toggleStatus(anime.id, 'toWatch');

        modal.querySelector('.modal-right').scrollTop = 0;
        modal.classList.add('open');
    }

    toggleStatus(id, field) {
        if (!this.userAnime[id]) this.userAnime[id] = {};
        this.userAnime[id][field] = !this.userAnime[id][field];

        if (field === 'watched' && this.userAnime[id].watched)  this.userAnime[id].toWatch = false;
        if (field === 'toWatch' && this.userAnime[id].toWatch)  this.userAnime[id].watched = false;

        this.save();
        this.applyFilters();

        // Riallinea il modal SOLO se è aperto (le spunte sulle card non lo aprono)
        const modalEl = document.getElementById('detail-modal');
        if (modalEl && modalEl.classList.contains('open')) {
            const anime = this.animeData.find(a => a.id === id);
            if (anime) this.openDetail(anime);
        }

        const isOn = this.userAnime[id][field];
        const msgs = {
            watched: ['✓ Segnato come Visto',     'toast-watched'],
            toWatch: ['🔖 Aggiunto a Da vedere', 'toast-towatch'],
        };
        const [msg, cls] = isOn ? msgs[field] : ['Rimosso dalla lista', 'toast-removed'];
        this.toast(msg, cls);
    }

    // ── TOAST ─────────────────────────────────────────────────
    toast(msg, cls) {
        const t = document.createElement('div');
        t.className = `toast ${cls}`;
        t.textContent = msg;
        document.getElementById('toast-container').appendChild(t);
        requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
        setTimeout(() => {
            t.classList.remove('show');
            setTimeout(() => t.remove(), 400);
        }, 2500);
    }
}

document.addEventListener('DOMContentLoaded', () => { window.app = new GuardaloApp(); });

// Navbar che si "stacca" allo scroll (look 2026)
window.addEventListener('scroll', () => {
    const n = document.querySelector('.navbar');
    if (n) n.classList.toggle('is-scrolled', window.scrollY > 8);
}, { passive: true });
