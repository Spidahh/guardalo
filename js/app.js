// GUARDALO — app.js v8
class GuardaloApp {
    constructor() {
        this.animeData = [];
        this.filteredAnime = [];
        this.filters = { search: '', genres: [], status: 'all' };
        this.sortBy = 'rating';
        this.currentUser = null;
        this.userAnime = {};
        this.init();
    }

    async init() {
        this.animeData = [...animeData];
        this.filteredAnime = [...animeData];
        this.buildGenreChips();
        this.bindEvents();
        this.applyFilters();
        this.initFirebase();
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
                if (doc.exists) this.userAnime = doc.data().anime || {};
                this.applyFilters();
            })
            .catch(() => this.loadFromLocal());
    }

    loadFromLocal() {
        try {
            const raw = localStorage.getItem('guardalo_anime');
            if (raw) this.userAnime = JSON.parse(raw);
        } catch (e) {}
        this.applyFilters();
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

    // ── GENRE CHIPS ───────────────────────────────────────────
    buildGenreChips() {
        const genres = [...new Set(animeData.flatMap(a => a.genres))].sort();
        const container = document.getElementById('genreChips');
        genres.forEach(genre => {
            const btn = document.createElement('button');
            btn.className = 'genre-chip';
            btn.textContent = genre;
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                if (btn.classList.contains('active')) {
                    this.filters.genres.push(genre);
                } else {
                    this.filters.genres = this.filters.genres.filter(g => g !== genre);
                }
                this.applyFilters();
            });
            container.appendChild(btn);
        });
    }

    // ── EVENTI ───────────────────────────────────────────────
    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');

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
            this.filters = { search: '', genres: [], status: 'all' };
            this.sortBy = 'rating';
            document.getElementById('searchInput').value = '';
            document.getElementById('statusFilter').value = 'all';
            document.getElementById('sortSelect').value = 'rating';
            clearSearch.classList.remove('visible');
            document.querySelectorAll('.genre-chip.active').forEach(c => c.classList.remove('active'));
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
            if (search) {
                const q = search;
                const match =
                    a.title.toLowerCase().includes(q) ||
                    a.genres.some(g => g.toLowerCase().includes(q)) ||
                    (a.studio?.toLowerCase().includes(q)) ||
                    (a.synopsis?.toLowerCase().includes(q));
                if (!match) return false;
            }
            if (genres.length > 0) {
                if (!genres.every(g => a.genres.includes(g))) return false;
            }
            if (status !== 'all') {
                const us = this.userAnime[a.title];
                if (status === 'watched' && !us?.watched) return false;
                if (status === 'towatch' && !us?.toWatch) return false;
                if (status === 'top' && !a.top) return false;
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
        const grid    = document.getElementById('animeGrid');
        const counter = document.getElementById('results-count');
        const tot     = animeData.length;
        const shown   = this.filteredAnime.length;

        counter.textContent = shown === tot
            ? `${tot} anime`
            : `${shown} di ${tot} anime`;

        grid.innerHTML = '';

        if (shown === 0) {
            grid.innerHTML = `<div class="no-results">
                <i class="ri-search-line"></i>
                <strong>Nessun risultato</strong>
                Prova a cambiare i filtri o la ricerca
            </div>`;
            return;
        }

        this.filteredAnime.forEach(anime => grid.appendChild(this.makeCard(anime)));
    }

    makeCard(anime) {
        const us = this.userAnime[anime.title] || {};
        const card = document.createElement('div');
        card.className = 'card' + (anime.top ? ' card-top' : '');

        const scoreClass = anime.rating >= 9 ? 'score-gold'
                         : anime.rating >= 7 ? 'score-green'
                         : 'score-blue';

        const topBadge = anime.top
            ? `<span class="card-badge-top">TOP</span>`
            : '';

        let statusBadge = '';
        if (us.watched)
            statusBadge = `<span class="card-badge-status badge-watched">✓ Visto</span>`;
        else if (us.toWatch)
            statusBadge = `<span class="card-badge-status badge-towatch">🔖 Da vedere</span>`;

        card.innerHTML = `
            <div class="card-poster-wrap">
                <img class="card-poster" src="${anime.img}" alt="${anime.title}" loading="lazy"
                     onerror="this.outerHTML='<div class=card-poster-placeholder><i class=ri-image-line></i></div>'">
                ${topBadge}
                <span class="card-score ${scoreClass}">★ ${anime.rating}</span>
                ${statusBadge}
            </div>
            <div class="card-info">
                <div class="card-title">${anime.title}</div>
                <div class="card-year">${anime.year}</div>
            </div>`;

        card.addEventListener('click', () => this.openDetail(anime));
        return card;
    }

    // ── MODAL DETTAGLIO ───────────────────────────────────────
    openDetail(anime) {
        const us    = this.userAnime[anime.title] || {};
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

        modal.querySelector('.legal-links').innerHTML =
            anime.links.legal.map(l =>
                `<a href="${l.url}" target="_blank" rel="noopener" class="link-btn link-legal">${l.name}</a>`
            ).join('');

        modal.querySelector('.illegal-links').innerHTML =
            anime.links.illegal.map(l =>
                `<a href="${l.url}" target="_blank" rel="noopener" class="link-btn link-search">${l.name}</a>`
            ).join('');

        const watchBtn = document.getElementById('btn-watched');
        const laterBtn = document.getElementById('btn-towatch');
        watchBtn.classList.toggle('active', !!us.watched);
        laterBtn.classList.toggle('active', !!us.toWatch);

        watchBtn.onclick = () => this.toggleStatus(anime.title, 'watched');
        laterBtn.onclick = () => this.toggleStatus(anime.title, 'toWatch');

        modal.querySelector('.modal-right').scrollTop = 0;
        modal.classList.add('open');
    }

    toggleStatus(title, field) {
        if (!this.userAnime[title]) this.userAnime[title] = {};
        this.userAnime[title][field] = !this.userAnime[title][field];

        if (field === 'watched' && this.userAnime[title].watched)  this.userAnime[title].toWatch = false;
        if (field === 'toWatch' && this.userAnime[title].toWatch)  this.userAnime[title].watched = false;

        this.save();
        this.applyFilters();

        const anime = this.animeData.find(a => a.title === title);
        if (anime) this.openDetail(anime);

        const isOn = this.userAnime[title][field];
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
