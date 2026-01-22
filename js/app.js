// App principale GUARDALO
class GuardaloApp {
    constructor() {
        this.currentUser = null;
        this.userAnime = {};
        this.filteredAnime = [];
        this.filters = {
            search: '',
            genres: [],
            status: 'all',
            top: 'all'
        };
        this.sortBy = 'rating-desc';
        
        this.init();
    }

    async init() {
        await this.initFirebase();
        this.bindEvents();
        this.setupGenreChips();
        this.renderAnime();
        this.checkAuthState();
    }

    async initFirebase() {
        try {
            // Inizializza Firebase se le credenziali sono configurate
            if (typeof firebase !== 'undefined' && firebaseConfig.apiKey) {
                firebase.initializeApp(firebaseConfig);
                this.auth = firebase.auth();
                this.db = firebase.firestore();
                
                // Listener per auth state
                this.auth.onAuthStateChanged(user => {
                    this.currentUser = user;
                    this.updateUI();
                    if (user) {
                        this.loadUserData();
                    }
                });
            }
        } catch (error) {
            console.warn('Firebase non configurato, procedo senza login');
        }
    }

    bindEvents() {
        // Search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Sort
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applyFilters();
        });

        // Status filters
        document.querySelectorAll('.btn-group button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.btn-group button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filters.status = btn.dataset.status;
                this.applyFilters();
            });
        });

        // TOP filter - da rimuovere perché non esiste nell'HTML
        // document.getElementById('topFilter').addEventListener('change', (e) => {
        //     this.filters.top = e.target.value;
        //     this.applyFilters();
        // });

        // Modal close
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal(btn.closest('.modal-overlay')));
        });

        // Close modal buttons
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('detail-modal').classList.remove('active');
        });
        
        document.getElementById('close-login').addEventListener('click', () => {
            document.getElementById('login-modal').classList.remove('active');
        });
        
        // Google login button in modal
        const googleLoginBtn = document.getElementById('google-login');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                if (this.auth) {
                    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
                } else {
                    alert('Firebase non configurato. Configura le credenziali in firebase-config.js');
                }
            });
        }

        // Close modal on backdrop click
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    setupGenreChips() {
        const genres = [...new Set(animeData.flatMap(a => a.genres))].sort();
        const container = document.getElementById('genre-chips');
        
        genres.forEach(genre => {
            const chip = document.createElement('button');
            chip.className = 'genre-chip';
            chip.textContent = genre;
            chip.addEventListener('click', () => {
                chip.classList.toggle('active');
                if (chip.classList.contains('active')) {
                    this.filters.genres.push(genre);
                } else {
                    this.filters.genres = this.filters.genres.filter(g => g !== genre);
                }
                this.applyFilters();
            });
            container.appendChild(chip);
        });
    }

    applyFilters() {
        this.filteredAnime = animeData.filter(anime => {
            // Search
            if (this.filters.search && !anime.title.toLowerCase().includes(this.filters.search)) {
                return false;
            }

            // Genres
            if (this.filters.genres.length > 0) {
                if (!this.filters.genres.some(g => anime.genres.includes(g))) {
                    return false;
                }
            }

            // Status
            if (this.filters.status !== 'all') {
                const userStatus = this.userAnime[anime.title];
                if (this.filters.status === 'watched' && !userStatus?.watched) return false;
                if (this.filters.status === 'towatch' && !userStatus?.toWatch) return false;
            }

            // TOP
            if (this.filters.top === 'top' && !anime.top) return false;
            if (this.filters.top === 'normal' && anime.top) return false;

            return true;
        });

        this.sortAnime();
        this.renderAnime();
    }

    sortAnime() {
        this.filteredAnime.sort((a, b) => {
            switch (this.sortBy) {
                case 'rating-desc':
                    return b.rating - a.rating;
                case 'rating-asc':
                    return a.rating - b.rating;
                case 'year-desc':
                    return b.year - a.year;
                case 'year-asc':
                    return a.year - b.year;
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }

    renderAnime() {
        const grid = document.getElementById('anime-grid');
        grid.innerHTML = '';

        this.filteredAnime.forEach(anime => {
            const card = this.createAnimeCard(anime);
            grid.appendChild(card);
        });

        if (this.filteredAnime.length === 0) {
            grid.innerHTML = '<div class="no-results">Nessun anime trovato</div>';
        }
    }

    createAnimeCard(anime) {
        const card = document.createElement('div');
        card.className = 'anime-card';
        
        const userStatus = this.userAnime[anime.title];
        const statusClass = userStatus?.watched ? 'watched' : userStatus?.toWatch ? 'to-watch' : '';
        
        card.innerHTML = `
            <div class="anime-poster">
                <img src="${anime.img}" alt="${anime.title}" loading="lazy">
                ${anime.top ? '<div class="top-badge">TOP</div>' : ''}
                ${statusClass ? `<div class="status-badge ${statusClass}">${statusClass === 'watched' ? '✓ Visto' : 'Da vedere'}</div>` : ''}
            </div>
            <div class="anime-info">
                <h3 class="anime-title">${anime.title}</h3>
                <div class="anime-meta">
                    <span class="anime-year">${anime.year}</span>
                    <span class="anime-episodes">${anime.episodes} episodi</span>
                </div>
                <div class="anime-rating">
                    <span class="rating-value">⭐ ${anime.rating}/10</span>
                </div>
                <div class="anime-genres">
                    ${anime.genres.slice(0, 3).map(g => `<span class="genre-tag">${g}</span>`).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => this.showAnimeDetails(anime));
        return card;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
    }

    showAnimeDetails(anime) {
        const modal = document.getElementById('detail-modal');
        const userStatus = this.userAnime[anime.title];
        
        document.getElementById('modal-title').textContent = anime.title;
        document.getElementById('modal-poster').src = anime.img;
        document.getElementById('modal-meta').innerHTML = `<span>${anime.year} • ${anime.studio} • ${anime.status} • ${anime.episodes} episodi</span>`;
        document.getElementById('modal-rating').innerHTML = `⭐ ${anime.rating}/10`;
        document.getElementById('modal-synopsis').textContent = anime.synopsis;
        document.getElementById('modal-tags').innerHTML = anime.genres.map(g => `<span class="tag">${g}</span>`).join('');
        
        // Struttura
        const structureHtml = anime.structure.map(s => 
            `<div class="structure-item"><strong>${s.name}:</strong> ${s.episodes} episodi</div>`
        ).join('');
        document.getElementById('modal-structure').innerHTML = structureHtml;
        
        // Link streaming
        const legalLinks = anime.links.legal.map(l => 
            `<a href="${l.url}" target="_blank" class="streaming-link legal">${l.name}</a>`
        ).join('');
        
        const illegalLinks = anime.links.illegal.map(l => 
            `<a href="${l.url}" target="_blank" class="streaming-link illegal">${l.name}</a>`
        ).join('');
        
        document.getElementById('modal-legal-links').innerHTML = legalLinks || '<span class="no-link">Non disponibile</span>';
        document.getElementById('modal-illegal-links').innerHTML = illegalLinks;
        
        // Pulsanti stato
        const watchedBtn = document.getElementById('btn-watched');
        const toWatchBtn = document.getElementById('btn-towatch');
        
        watchedBtn.classList.toggle('active', userStatus?.watched || false);
        toWatchBtn.classList.toggle('active', userStatus?.toWatch || false);
        
        // Eventi pulsanti
        watchedBtn.onclick = () => this.toggleAnimeStatus(anime.title, 'watched');
        toWatchBtn.onclick = () => this.toggleAnimeStatus(anime.title, 'toWatch');
        
        modal.classList.add('active');
    }

    toggleAnimeStatus(title, status) {
        if (!this.currentUser) {
            document.getElementById('login-modal').classList.add('active');
            return;
        }

        const anime = this.userAnime[title] || {};
        
        if (status === 'watched') {
            anime.watched = !anime.watched;
            anime.toWatch = false;
        } else if (status === 'toWatch') {
            anime.toWatch = !anime.toWatch;
            anime.watched = false;
        }

        this.userAnime[title] = anime;
        this.saveUserData();
        this.applyFilters();
        this.showAnimeDetails(animeData.find(a => a.title === title));
    }

    async saveUserData() {
        if (this.currentUser && this.db) {
            try {
                await this.db.collection('users').doc(this.currentUser.uid).set({
                    anime: this.userAnime
                });
            } catch (error) {
                console.error('Errore salvataggio dati:', error);
            }
        }
    }

    async loadUserData() {
        if (this.currentUser && this.db) {
            try {
                const doc = await this.db.collection('users').doc(this.currentUser.uid).get();
                if (doc.exists) {
                    this.userAnime = doc.data().anime || {};
                    this.applyFilters();
                }
            } catch (error) {
                console.error('Errore caricamento dati:', error);
            }
        }
    }

    checkAuthState() {
        this.updateUI();
    }

    updateUI() {
        const loginBtn = document.getElementById('auth-btn');
        
        if (this.currentUser) {
            loginBtn.innerHTML = '<i class="ri-user-line"></i> ' + this.currentUser.displayName;
            loginBtn.onclick = () => this.auth.signOut();
        } else {
            loginBtn.innerHTML = '<i class="ri-user-line"></i> <span>ACCEDI</span>';
            loginBtn.onclick = () => {
                if (this.auth) {
                    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
                } else {
                    alert('Firebase non configurato. Configura le credenziali in firebase-config.js');
                }
            };
        }
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }
}

// Inizializza l'app quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    new GuardaloApp();
});
