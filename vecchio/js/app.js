// ===================================
// GUARDALO - APP LOGIC (Clean Version)
// ===================================

const state = {
    animes: [],
    currentUser: null,
    userLists: { watched: [], towatch: [] },
    filters: {
        genres: new Set(),
        search: '',
        status: 'all'
    },
    sortMode: 'recommended',
    currentAnime: null
};

const ui = {
    grid: document.getElementById('anime-grid'),
    search: document.getElementById('search-input'),
    genreChips: document.getElementById('genre-chips'),
    statusBtns: document.getElementById('status-btns'),
    sortSelect: document.getElementById('sort-select'),

    detailModal: document.getElementById('detail-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalMeta: document.getElementById('modal-meta'),
    modalSynopsis: document.getElementById('modal-synopsis'),
    modalTags: document.getElementById('modal-tags'),
    modalLinks: document.getElementById('modal-links'),
    btnWatched: document.getElementById('btn-watched'),
    btnTowatch: document.getElementById('btn-towatch'),
    closeModal: document.getElementById('close-modal'),

    loginModal: document.getElementById('login-modal'),
    loginForm: document.getElementById('login-form'),
    googleLogin: document.getElementById('google-login'),
    closeLogin: document.getElementById('close-login'),
    authBtn: document.getElementById('auth-btn')
};

// === INIT ===
function init() {
    console.log('🎬 GUARDALO Starting...');
    state.animes = typeof animeData !== 'undefined' ? [...animeData] : [];
    console.log(`📚 ${state.animes.length} anime loaded`);

    if (window.auth) {
        window.auth.onAuthStateChanged(handleAuthChange);
    } else {
        ui.authBtn.innerHTML = '<i class="ri-wifi-off-line"></i>';
        ui.authBtn.disabled = true;
    }

    buildGenreChips();
    setupEventListeners();
    render();
}

// === AUTH ===
function handleAuthChange(user) {
    state.currentUser = user;
    if (user) {
        ui.authBtn.innerHTML = '<i class="ri-user-smile-line"></i>';
        loadUserLists(user.uid);
        closeLoginModal();
    } else {
        ui.authBtn.innerHTML = '<i class="ri-user-line"></i> <span>ACCEDI</span>';
        state.userLists = { watched: [], towatch: [] };
        render();
    }
}

function loadUserLists(uid) {
    window.db.collection('users').doc(uid).onSnapshot(doc => {
        if (doc.exists) {
            state.userLists = doc.data();
        } else {
            window.db.collection('users').doc(uid).set({ watched: [], towatch: [] });
        }
        render();
        updateModalButtons();
    });
}

async function toggleUserList(type, title) {
    if (!state.currentUser) {
        openLoginModal();
        return;
    }
    const ref = window.db.collection('users').doc(state.currentUser.uid);
    const list = state.userLists[type] || [];
    try {
        if (list.includes(title)) {
            await ref.update({ [type]: firebase.firestore.FieldValue.arrayRemove(title) });
        } else {
            await ref.update({ [type]: firebase.firestore.FieldValue.arrayUnion(title) });
        }
    } catch (e) {
        console.error('Update failed:', e);
    }
}

// === FILTERS ===
function buildGenreChips() {
    const genres = new Set();
    state.animes.forEach(a => a.genres?.forEach(g => genres.add(g)));
    const sorted = Array.from(genres).sort();

    ui.genreChips.innerHTML = `<button class="filter-chip active" data-genre="ALL">Tutti</button>` +
        sorted.map(g => `<button class="filter-chip" data-genre="${g}">${g}</button>`).join('');
}

function setGenreFilter(genre) {
    if (genre === 'ALL') {
        state.filters.genres.clear();
    } else {
        state.filters.genres.has(genre) ? state.filters.genres.delete(genre) : state.filters.genres.add(genre);
    }

    ui.genreChips.querySelectorAll('.filter-chip').forEach(chip => {
        const g = chip.dataset.genre;
        chip.classList.toggle('active', g === 'ALL' ? state.filters.genres.size === 0 : state.filters.genres.has(g));
    });
    render();
}

function getFilteredAnimes() {
    let list = [...state.animes];

    // Search
    if (state.filters.search) {
        const q = state.filters.search.toLowerCase();
        list = list.filter(a => a.title.toLowerCase().includes(q));
    }

    // Genre
    if (state.filters.genres.size > 0) {
        list = list.filter(a => a.genres && [...state.filters.genres].every(g => a.genres.includes(g)));
    }

    // Status
    if (state.filters.status !== 'all') {
        const target = state.userLists[state.filters.status] || [];
        list = list.filter(a => target.includes(a.title));
    }

    // Sort
    if (state.sortMode === 'title') {
        list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (state.sortMode === 'year') {
        list.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else {
        // Recommended: TOP first, then by year
        list.sort((a, b) => {
            if (a.top && !b.top) return -1;
            if (!a.top && b.top) return 1;
            return (b.year || 0) - (a.year || 0);
        });
    }

    return list;
}

// === RENDER ===
function render() {
    const animes = getFilteredAnimes();

    if (animes.length === 0) {
        ui.grid.innerHTML = '<div class="status-msg">Nessun risultato</div>';
        return;
    }

    ui.grid.innerHTML = animes.map(createCard).join('');
}

function createCard(anime) {
    const isWatched = state.userLists.watched?.includes(anime.title);
    const isTowatch = state.userLists.towatch?.includes(anime.title);
    const isTop = anime.top === true;
    const statusClass = anime.stato === 'In corso' ? 'ongoing' : 'finished';
    const statusText = anime.stato === 'In corso' ? 'IN CORSO' : anime.stato === 'Film' ? 'FILM' : 'FINITO';

    return `
        <div class="card" onclick="openDetail('${esc(anime.title)}')">
            <div class="card-img-wrapper">
                <img class="card-img" src="${anime.img}" alt="${esc(anime.title)}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/300x450/111/333?text=No+Image'">
                ${isTop ? '<div class="badge-top"><i class="ri-fire-fill"></i> TOP</div>' : ''}
                <div class="card-actions">
                    <button class="action-btn watched ${isWatched ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleList('watched', '${esc(anime.title)}')" title="Visto">
                        <i class="ri-check-line"></i>
                    </button>
                    <button class="action-btn towatch ${isTowatch ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleList('towatch', '${esc(anime.title)}')" title="Da vedere">
                        <i class="ri-time-line"></i>
                    </button>
                </div>
            </div>
            <div class="card-info">
                <div class="card-title">${esc(anime.title)}</div>
                <div class="card-meta">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    <span class="card-episodes">${anime.episodes || '?'} ep</span>
                </div>
            </div>
        </div>
    `;
}

// === DETAIL MODAL ===
function openDetail(title) {
    const anime = state.animes.find(a => a.title === title);
    if (!anime) return;

    state.currentAnime = anime;

    // Get modal elements
    const posterEl = document.getElementById('modal-poster');

    // Update poster as header background
    if (posterEl) {
        posterEl.src = anime.img;
        posterEl.classList.remove('modal-poster');
        posterEl.classList.add('modal-header-img');
    }

    ui.modalTitle.textContent = anime.title;
    ui.modalSynopsis.textContent = anime.synopsis || 'Nessuna descrizione.';

    // Meta
    const statusClass = anime.stato === 'In corso' ? 'ongoing' : 'finished';
    let structureHtml = '';
    if (anime.structure?.length) {
        structureHtml = `<div class="structure-tags">${anime.structure.map(s =>
            `<span class="season-tag">${s.name} <span class="ep-count">${s.episodes}</span></span>`
        ).join('')}</div>`;
    }

    ui.modalMeta.innerHTML = `
        <div class="meta-row">
            <span class="year">${anime.year || ''}</span>
            <span class="studio">${anime.studio || ''}</span>
            <span class="status-badge ${statusClass}">${anime.stato || 'Finito'}</span>
            <span class="episodes-total">${anime.episodes || '?'} episodi</span>
        </div>
        ${structureHtml}
    `;

    // Genres
    ui.modalTags.innerHTML = anime.genres?.map(g => `<span class="genre-tag">${g}</span>`).join('') || '';

    // Links
    const legal = anime.links?.legal || [];
    const alt = anime.links?.alt || [];

    if (legal.length === 0 && alt.length === 0) {
        ui.modalLinks.innerHTML = '<span style="color:var(--text-muted)">Nessun link</span>';
    } else {
        ui.modalLinks.innerHTML =
            legal.map(l => `<a href="${l.url}" target="_blank" class="stream-link legal"><i class="ri-play-circle-fill"></i> ${l.name}</a>`).join('') +
            alt.map(l => `<a href="${l.url}" target="_blank" class="stream-link alt"><i class="ri-search-line"></i> ${l.name}</a>`).join('');
    }

    updateModalButtons();
    ui.detailModal.classList.add('active');
}

function updateModalButtons() {
    if (!state.currentAnime) return;
    const isW = state.userLists.watched?.includes(state.currentAnime.title);
    const isT = state.userLists.towatch?.includes(state.currentAnime.title);
    ui.btnWatched.classList.toggle('active', isW);
    ui.btnTowatch.classList.toggle('active', isT);
}

function closeDetailModal() {
    ui.detailModal.classList.remove('active');
    state.currentAnime = null;
}

function openLoginModal() { ui.loginModal.classList.add('active'); }
function closeLoginModal() { ui.loginModal.classList.remove('active'); }

// === EVENTS ===
function setupEventListeners() {
    ui.search.addEventListener('input', e => { state.filters.search = e.target.value; render(); });

    ui.genreChips.addEventListener('click', e => {
        if (e.target.classList.contains('filter-chip')) setGenreFilter(e.target.dataset.genre);
    });

    ui.statusBtns.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (btn?.dataset.status) {
            ui.statusBtns.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filters.status = btn.dataset.status;
            render();
        }
    });

    ui.sortSelect.addEventListener('change', e => { state.sortMode = e.target.value; render(); });

    // Modal
    ui.closeModal.addEventListener('click', closeDetailModal);
    ui.detailModal.addEventListener('click', e => { if (e.target === ui.detailModal) closeDetailModal(); });
    ui.btnWatched.addEventListener('click', () => { if (state.currentAnime) toggleUserList('watched', state.currentAnime.title); });
    ui.btnTowatch.addEventListener('click', () => { if (state.currentAnime) toggleUserList('towatch', state.currentAnime.title); });

    // Auth
    ui.authBtn.addEventListener('click', () => {
        state.currentUser ? confirm('Logout?') && window.auth.signOut() : openLoginModal();
    });
    ui.closeLogin.addEventListener('click', closeLoginModal);
    ui.loginModal.addEventListener('click', e => { if (e.target === ui.loginModal) closeLoginModal(); });

    ui.loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        try {
            await window.auth.signInWithEmailAndPassword(email, pass);
        } catch (err) {
            if (err.code === 'auth/user-not-found' && confirm('Creare account?')) {
                await window.auth.createUserWithEmailAndPassword(email, pass);
            } else {
                alert('Errore: ' + err.message);
            }
        }
    });

    ui.googleLogin.addEventListener('click', async () => {
        try { await window.auth.signInWithPopup(window.googleProvider); }
        catch (e) { alert('Errore: ' + e.message); }
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDetailModal(); closeLoginModal(); } });
}

document.addEventListener('DOMContentLoaded', init);

// === GLOBALS ===
window.openDetail = openDetail;
window.toggleList = toggleUserList;

function esc(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
}

// Start
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
