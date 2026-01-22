// === STARWATCH CORE LOGIC (CLEAN START) ===

const state = {
    animeList: [],
    currentUser: null,
    userLists: { watched: [], towatch: [] },
    filters: {
        activeGenres: new Set(),
        search: '',
        status: 'Tutti'
    },
    sortMode: 'popolarita'
};

// DOM Elements Mapped Carefully
const ui = {
    grid: document.getElementById('grid-content'),
    search: document.getElementById('main-search'),
    genres: document.getElementById('filter-wrapper'),
    statusBtns: document.querySelectorAll('button[data-status]'),
    sort: document.getElementById('sort-order'),

    // Modals
    modalApp: document.getElementById('app-modal'),
    modalLogin: document.getElementById('login-modal'),

    // Auth
    btnLoginMain: document.getElementById('bg-login-btn'),
    formLogin: document.getElementById('login-form'),
    btnGoogle: document.getElementById('btn-google'),

    // Content Modal DOM
    mPoster: document.getElementById('m-poster'),
    mTitle: document.getElementById('m-title'),
    mYear: document.getElementById('m-year'),
    mStudio: document.getElementById('m-studio'),
    mDesc: document.getElementById('m-desc'),
    mTags: document.getElementById('m-tags'),
    mLinks: document.getElementById('m-links'),
    btnWatched: document.getElementById('act-watched'),
    btnToWatch: document.getElementById('act-towatch')
};

async function init() {
    console.log("[SYSTEM] Starting StarWatch Clean Engine...");

    // 1. Auth Listener (SAFE MODE check)
    if (window.auth) {
        window.auth.onAuthStateChanged(user => {
            state.currentUser = user;
            if (user) {
                ui.btnLoginMain.innerHTML = '<i class="ri-user-smile-line"></i> PROFILO';
                loadUserLists(user.uid);
                ui.modalLogin.style.display = 'none';
            } else {
                ui.btnLoginMain.innerHTML = '<i class="ri-user-line"></i> ACCEDI';
                state.userLists = { watched: [], towatch: [] };
                render();
            }
        });
    } else {
        console.warn("[SYSTEM] Firebase Auth not available. Running in OFFLINE/SAFE MODE.");
        ui.btnLoginMain.innerHTML = '<i class="ri-error-warning-line"></i> OFFLINE';
        ui.btnLoginMain.disabled = true;
        ui.btnLoginMain.title = "Login non disponibile (Server Offline)";
    }

    // 2. Load Data
    // 2. Load Data (Hybrid System: Remote -> Local Fallback)
    try {
        console.log("[DATA] Connecting to Firestore...");
        const snapshot = await window.db.collection('animes').get();

        if (!snapshot.empty) {
            state.animeList = snapshot.docs.map(doc => doc.data());
            console.log(`[DATA] Loaded ${state.animeList.length} items from Firestore.`);
        } else {
            throw new Error("Firestore is empty");
        }
    } catch (e) {
        console.warn(`[DATA] Remote load failed (${e.message}). Switching to LOCAL MASTER.`);

        if (typeof animeData !== 'undefined') {
            state.animeList = [...animeData]; // Use local copy
            console.log(`[DATA] Loaded ${state.animeList.length} items from Local File.`);

            // Auto-Heal: Seed DB in background if it was empty/unreachable
            if (e.message === "Firestore is empty" && typeof seedDatabase === 'function') {
                console.log("[SYSTEM] Starting Auto-Seeding to repair remote DB...");
                seedDatabase();
            }
        } else {
            console.error("[CRITICAL] No local data found. System empty.");
            ui.grid.innerHTML = '<div style="color:red; padding:20px;">ERRORE CRITICO: Nessun dato disponibile (Né Online, Né Locale).</div>';
        }
    }

    // 3. Init UI
    initFilters();
    initListeners();
    render();
}

function initFilters() {
    // Collect Genres
    const all = new Set();
    state.animeList.forEach(a => {
        if (a.genres) a.genres.forEach(g => all.add(g));
    });

    const sorted = Array.from(all).sort();

    let html = `<button class="filter-chip active" onclick="setGenre('ALL')">TUTTI</button>`;
    sorted.forEach(g => {
        html += `<button class="filter-chip" onclick="setGenre('${g}')">${g}</button>`;
    });
    ui.genres.innerHTML = html;
}

// Global for inline onclick
window.setGenre = (genre) => {
    if (genre === 'ALL') state.filters.activeGenres.clear();
    else {
        if (state.filters.activeGenres.has(genre)) state.filters.activeGenres.delete(genre);
        else state.filters.activeGenres.add(genre);
    }

    // Update visual chips
    const chips = ui.genres.querySelectorAll('button');
    chips.forEach(b => {
        if (b.innerText === 'TUTTI') {
            b.classList.toggle('active', state.filters.activeGenres.size === 0);
        } else {
            b.classList.toggle('active', state.filters.activeGenres.has(b.innerText));
        }
    });

    render();
};

function getFiltered() {
    let list = state.animeList;

    // Search
    if (state.filters.search) {
        const q = state.filters.search.toLowerCase();
        list = list.filter(a => a.title.toLowerCase().includes(q));
    }

    // Genres
    if (state.filters.activeGenres.size > 0) {
        list = list.filter(a => {
            if (!a.genres) return false;
            for (let g of state.filters.activeGenres) if (!a.genres.includes(g)) return false;
            return true;
        });
    }

    // Status
    if (state.filters.status !== 'Tutti') {
        const target = state.filters.status === 'watched' ? state.userLists.watched : state.userLists.towatch;
        if (!target) list = [];
        else list = list.filter(a => target.includes(a.title));
    }

    // Sort
    if (state.sortMode === 'titolo') {
        list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (state.sortMode === 'anno') {
        list.sort((a, b) => b.year - a.year);
    }

    return list;
}

function render() {
    const data = getFiltered();
    ui.grid.innerHTML = '';

    if (data.length === 0) {
        ui.grid.innerHTML = '<div style="color:#666; padding:20px;">Nessun risultato.</div>';
        return;
    }

    data.forEach(anime => {
        const isWatched = state.userLists.watched?.includes(anime.title);
        const isToWatch = state.userLists.towatch?.includes(anime.title);
        // Simple "Recommended" logic: arbitrary or based on data
        const isRecommended = anime.recommended === true || (anime.rating && anime.rating > 8.5) || Math.random() > 0.8;

        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
            <img src="${anime.img || 'img/placeholder.jpg'}" loading="lazy">
            ${isRecommended ? '<div class="badge-recommended"><i class="ri-fire-fill"></i> TOP</div>' : ''}
            <div class="card-overlay">
                <div class="card-title">${anime.title}</div>
                <div class="card-meta">
                    <span>${anime.year || 'N/A'}</span> • <span>${anime.studio || 'Studio'}</span>
                </div>
            </div>
            
            <div class="card-actions">
                <div class="action-btn ${isWatched ? 'watched' : ''}" title="Visto">
                    <i class="ri-check-line"></i>
                </div>
                <div class="action-btn ${isToWatch ? 'towatch' : ''}" title="Da Vedere">
                    <i class="ri-time-line"></i>
                </div>
            </div>
        `;

        // CLICK LOGIC
        el.onclick = () => openModal(anime);

        ui.grid.appendChild(el);
    });
}

function openModal(anime) {
    if (!anime) return;

    ui.mPoster.src = anime.img;
    ui.mTitle.innerText = anime.title;
    ui.mYear.innerText = anime.year || 'N/A';
    ui.mStudio.innerText = anime.studio || 'Unknown';
    ui.mDesc.innerText = anime.synopsis || 'No description available.';


    // NEW: Episodes & Seasons Logic (Fixed for 'structure' array)
    const metaContainer = document.querySelector('.modal-meta');

    // Calculate totals and build string
    let structureHtml = '';
    let totalEps = 0;

    if (anime.structure && Array.isArray(anime.structure)) {
        // Build a nice list: "S1 (25) • S2 (12) • OAV (1)"
        structureHtml = anime.structure.map(s => {
            const num = parseInt(s.episodes) || 0;
            totalEps += num;
            return `<span class="season-tag">${s.name} <span class="ep-count">${s.episodes}</span></span>`;
        }).join('');
    } else {
        structureHtml = '<span class="season-tag">Dati stagioni non disponibili</span>';
    }

    metaContainer.innerHTML = `
        <div class="meta-row main">
            <span class="meta-year">${anime.year || ''}</span> 
            <span class="meta-studio">${anime.studio || ''}</span>
            <span class="meta-status ${anime.stato === 'In corso' ? 'ongoing' : 'finished'}">${anime.stato || 'Finito'}</span>
        </div>
        <div class="meta-row structure">
            ${structureHtml}
        </div>
        <div class="meta-total">
            Totale: ${totalEps} Episodi
        </div>
    `;

    // Tags
    ui.mTags.innerHTML = '';
    if (anime.genres) anime.genres.forEach(g => {
        const s = document.createElement('span');
        s.style.color = '#ccc';
        s.style.background = 'rgba(255,255,255,0.1)';
        s.style.border = '1px solid #333';
        s.style.padding = '4px 10px';
        s.style.borderRadius = '20px'; // Pill shape
        s.style.fontSize = '0.75rem';
        s.style.fontWeight = '600';
        s.innerText = g;
        ui.mTags.appendChild(s);
    });

    // Links (Distinguish Legal vs Illegal)
    ui.mLinks.innerHTML = '';

    const legalLinks = anime.links?.legal || [];
    const illegalLinks = anime.links?.illegal || [];

    if (legalLinks.length === 0 && illegalLinks.length === 0) {
        ui.mLinks.innerHTML = '<span style="color:#666">Nessuna fonte disponibile.</span>';
    }

    legalLinks.forEach(l => {
        const a = createLinkBtn(l, 'legal');
        ui.mLinks.appendChild(a);
    });

    // Separator if both exist
    if (legalLinks.length > 0 && illegalLinks.length > 0) {
        const sep = document.createElement('div');
        sep.style.height = '10px';
        ui.mLinks.appendChild(sep);
    }

    illegalLinks.forEach(l => {
        const a = createLinkBtn(l, 'illegal');
        ui.mLinks.appendChild(a);
    });

    // Update Buttons
    updateModalBtns(anime.title);

    // Setup Toggles
    ui.btnWatched.onclick = () => toggleStatus(anime.title, 'watched');
    ui.btnToWatch.onclick = () => toggleStatus(anime.title, 'towatch');

    ui.modalApp.style.display = 'flex';
}

function createLinkBtn(link, type) {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.className = type === 'illegal' ? 'stream-btn illegal' : 'stream-btn';

    // Icons
    let icon = 'ri-play-circle-fill';
    let text = link.name || 'Stream';

    if (type === 'illegal') {
        icon = 'ri-skull-line'; // Pirate icon
        a.style.background = '#7f1d1d'; // Dark Red
        a.style.border = '1px solid #b91c1c';
        text += ' (Alternative)';
    } else {
        a.style.background = '#222';
        a.style.border = '1px solid #333';
    }

    a.innerHTML = `<i class="${icon}"></i> ${text}`;
    a.style.display = 'inline-flex';
    a.style.alignItems = 'center';
    a.style.gap = '6px';
    a.style.color = 'white';
    a.style.textDecoration = 'none';
    a.style.padding = '8px 14px';
    a.style.borderRadius = '4px';
    a.style.fontSize = '0.85rem';
    a.style.marginRight = '8px';
    a.style.marginBottom = '8px';
    a.style.transition = '0.2s';

    a.onmouseover = () => { a.style.filter = 'brightness(1.2)'; };
    a.onmouseout = () => { a.style.filter = 'brightness(1)'; };

    return a;
}

function updateModalBtns(title) {
    const isW = state.userLists.watched?.includes(title);
    const isT = state.userLists.towatch?.includes(title);

    ui.btnWatched.style.background = isW ? 'white' : 'rgba(255,255,255,0.1)';
    ui.btnWatched.style.color = isW ? 'black' : 'white';

    ui.btnToWatch.style.background = isT ? 'var(--accent)' : 'rgba(255,255,255,0.1)';
}

async function toggleStatus(title, type) {
    if (!state.currentUser) {
        alert("Login required!");
        ui.modalApp.style.display = 'none';
        ui.modalLogin.style.display = 'flex';
        return;
    }

    const ref = window.db.collection('users').doc(state.currentUser.uid);
    const list = state.userLists[type] || [];

    if (list.includes(title)) {
        await ref.update({ [type]: firebase.firestore.FieldValue.arrayRemove(title) });
    } else {
        await ref.update({ [type]: firebase.firestore.FieldValue.arrayUnion(title) });
    }
    // Listener updates UI
    ui.modalApp.style.display = 'none'; // Close to refresh or stay open? 
    // Ideally stay open and update btns, but listener refreshes state.
    // Let's just manually update for speed
    // Actually listener is fast. Keep open and re-update btns
    setTimeout(() => updateModalBtns(title), 500);
}

function loadUserLists(uid) {
    window.db.collection('users').doc(uid).onSnapshot(doc => {
        if (doc.exists) {
            state.userLists = doc.data();
            render();
            // If modal open, update it?
            if (ui.modalApp.style.display === 'flex') {
                updateModalBtns(ui.mTitle.innerText);
            }
        } else {
            window.db.collection('users').doc(uid).set({ watched: [], towatch: [] });
        }
    });
}

function initListeners() {
    // Search
    ui.search.addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        render();
    });

    // Status Buttons
    ui.statusBtns.forEach(btn => {
        btn.onclick = () => {
            ui.statusBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filters.status = btn.dataset.status;
            render();
        };
    });

    // Sort
    ui.sort.addEventListener('change', (e) => {
        state.sortMode = e.target.value;
        render();
    });

    // Modals Close
    document.getElementById('close-modal-btn').onclick = () => ui.modalApp.style.display = 'none';
    document.getElementById('close-login-btn').onclick = () => ui.modalLogin.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === ui.modalApp) ui.modalApp.style.display = 'none';
        if (e.target === ui.modalLogin) ui.modalLogin.style.display = 'none';
    };

    // Auth Open
    ui.btnLoginMain.onclick = () => {
        if (state.currentUser) {
            if (confirm("Logout?")) window.auth.signOut();
        } else {
            ui.modalLogin.style.display = 'flex';
        }
    };

    // Google
    ui.btnGoogle.onclick = async () => {
        try {
            const p = new firebase.auth.GoogleAuthProvider();
            await window.auth.signInWithPopup(p);
            ui.modalLogin.style.display = 'none';
        } catch (e) { alert("Login Error: " + e.message); }
    };

    // Email Login
    ui.formLogin.onsubmit = async (e) => {
        e.preventDefault();
        const em = document.getElementById('u-email').value;
        const ps = document.getElementById('u-pass').value;
        try {
            await window.auth.signInWithEmailAndPassword(em, ps);
            ui.modalLogin.style.display = 'none';
        } catch (err) {
            // Try Register if user not found
            if (err.code === 'auth/user-not-found') {
                if (confirm("Utente non trovato. Creare nuovo account?")) {
                    await window.auth.createUserWithEmailAndPassword(em, ps);
                    ui.modalLogin.style.display = 'none';
                }
            } else {
                alert("Errore: " + err.message);
            }
        }
    };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();