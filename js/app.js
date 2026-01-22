// App principale// GUARDALO - App principale
class GuardaloApp {
    constructor() {
        this.animeData = [];
        this.filteredAnime = [];
        this.filters = {
            search: '',
            genres: [],
            status: 'all'
        };
        this.sortBy = 'rating';
        this.currentUser = null;
        this.userAnime = {};
        this.auth = null;
        this.db = null;
        
        this.init();
    }

    async init() {
        try {
            // Initialize Firebase
            this.initFirebase();
            
            // Load data
            this.loadData();
            
            // Setup UI
            this.setupUI();
            
            // Bind events
            this.bindEvents();
            
            // Initial render
            this.applyFilters();
            
            console.log('Guardalo App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    initFirebase() {
        try {
            // Check if firebase-config.js loaded properly
            if (typeof firebaseConfig === 'undefined') {
                console.warn('Firebase config not found, using localStorage only');
                return;
            }

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            this.auth = firebase.auth();
            this.db = firebase.firestore();

            // Auth state observer
            this.auth.onAuthStateChanged(user => {
                this.currentUser = user;
                if (user) {
                    this.loadUserData();
                } else {
                    this.loadLocalData();
                }
                this.updateAuthUI();
            });
        } catch (error) {
            console.warn('Firebase initialization failed:', error);
        }
    }

    loadData() {
        this.animeData = [...animeData];
        this.filteredAnime = [...this.animeData];
    }

    setupUI() {
        // Setup genre chips
        this.setupGenreChips();
        
        // Setup sort dropdown
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.value = this.sortBy;
        }
        
        // Setup status filter
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.value = this.filters.status;
        }
    }

    bindEvents() {
        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Sort
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.applyFilters();
            });
        }

        // Status filter
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.applyFilters();
            });
        }

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

        // Login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.showLoginModal();
            });
        }

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

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (this.auth) {
                    this.auth.signOut();
                } else {
                    this.clearLocalData();
                }
            });
        }

        // Filter buttons
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearAllFilters();
        });
    }

    setupGenreChips() {
        const genres = [...new Set(animeData.flatMap(a => a.genres))].sort();
        const container = document.getElementById('genreChips');
        
        genres.forEach(genre => {
            const chip = document.createElement('button');
            chip.className = 'chip';
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
            // Search filter
            if (this.filters.search && !anime.title.toLowerCase().includes(this.filters.search)) {
                return false;
            }

            // Genre filter - MULTI-SELECT SUPPORT
            if (this.filters.genres.length > 0) {
                // Must match ALL selected genres
                if (!this.filters.genres.every(g => anime.genres.includes(g))) {
                    return false;
                }
            }

            // Status filter
            if (this.filters.status !== 'all') {
                const userStatus = this.userAnime[anime.title];
                if (this.filters.status === 'watched' && !userStatus?.watched) return false;
                if (this.filters.status === 'towatch' && !userStatus?.toWatch) return false;
                if (this.filters.status === 'top' && !anime.top) return false;
            }

            return true;
        });

        this.sortAnime();
        this.renderAnime();
    }

    sortAnime() {
        this.filteredAnime.sort((a, b) => {
            switch (this.sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'year':
                    return b.year - a.year;
                default:
                    return b.rating - a.rating;
            }
        });
    }

    renderAnime() {
        const container = document.getElementById('animeGrid');
        container.innerHTML = '';

        if (this.filteredAnime.length === 0) {
            container.innerHTML = '<div class="no-results">Nessun anime trovato</div>';
            return;
        }

        this.filteredAnime.forEach(anime => {
            const card = this.createAnimeCard(anime);
            container.appendChild(card);
        });
    }

    createAnimeCard(anime) {
        const card = document.createElement('div');
        card.className = 'anime-card';
        
        const userStatus = this.userAnime[anime.title] || {};
        const statusBadge = userStatus.watched ? 'watched' : userStatus.toWatch ? 'to-watch' : '';
        
        card.innerHTML = `
            <div class="anime-poster">
                <img src="${anime.img}" alt="${anime.title}" loading="lazy" onerror="this.style.display='none'">
                ${statusBadge ? `<div class="status-badge ${statusBadge}">${statusBadge === 'watched' ? 'VISTO' : 'DA VEDERE'}</div>` : ''}
            </div>
            <div class="anime-info">
                <h3 class="anime-title">${anime.title}</h3>
                <div class="anime-meta">
                    <span>${anime.year}</span>
                    <span class="separator"></span>
                    <span>${anime.episodes} ep</span>
                </div>
                <div class="anime-rating">
                    <i class="ri-star-fill"></i> ${anime.rating}
                </div>
                <div class="anime-genres">
                    ${anime.genres.slice(0, 2).map(g => `<span class="genre-tag">${g}</span>`).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => this.showAnimeDetail(anime));
        return card;
    }

    showAnimeDetail(anime) {
        const modal = document.getElementById('detail-modal');
        const userStatus = this.userAnime[anime.title] || {};
        
        modal.querySelector('.modal-title').textContent = anime.title;
        modal.querySelector('.modal-poster img').src = anime.img;
        modal.querySelector('.modal-rating').innerHTML = `<i class="ri-star-fill"></i> ${anime.rating}`;
        modal.querySelector('.modal-year').textContent = anime.year;
        modal.querySelector('.modal-episodes').textContent = `${anime.episodes} episodi`;
        modal.querySelector('.modal-studio').textContent = anime.studio;
        modal.querySelector('.modal-status').textContent = anime.status;
        modal.querySelector('.modal-synopsis').textContent = anime.synopsis;
        
        // Status buttons
        const watchedBtn = modal.querySelector('#btn-watched');
        const toWatchBtn = modal.querySelector('#btn-towatch');
        
        watchedBtn.classList.toggle('active', userStatus.watched);
        toWatchBtn.classList.toggle('active', userStatus.toWatch);
        
        watchedBtn.onclick = () => this.toggleAnimeStatus(anime.title, 'watched');
        toWatchBtn.onclick = () => this.toggleAnimeStatus(anime.title, 'toWatch');
        
        // Genres
        const genresContainer = modal.querySelector('.modal-tags');
        genresContainer.innerHTML = anime.genres.map(g => `<span class="genre-tag">${g}</span>`).join('');
        
        // Structure
        const structureContainer = modal.querySelector('.modal-structure');
        structureContainer.innerHTML = anime.structure.map(s => 
            `<div class="structure-item">
                <span class="structure-name">${s.name}</span>
                <span class="structure-episodes">${s.episodes}</span>
            </div>`
        ).join('');
        
        // Links
        const legalLinks = modal.querySelector('.legal-links');
        const illegalLinks = modal.querySelector('.illegal-links');
        
        legalLinks.innerHTML = anime.links.legal.map(l => 
            `<a href="${l.url}" target="_blank" class="link-button">${l.name}</a>`
        ).join('');
        
        illegalLinks.innerHTML = anime.links.illegal.map(l => 
            `<a href="${l.url}" target="_blank" class="link-button">${l.name}</a>`
        ).join('');
        
        modal.classList.add('active');
        
        // Add backdrop click to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
    }

    toggleAnimeStatus(animeTitle, status) {
        if (!this.userAnime[animeTitle]) {
            this.userAnime[animeTitle] = {};
        }
        
        // Toggle status
        this.userAnime[animeTitle][status] = !this.userAnime[animeTitle][status];
        
        // If setting watched, remove toWatch and vice versa
        if (status === 'watched' && this.userAnime[animeTitle].watched) {
            this.userAnime[animeTitle].toWatch = false;
        } else if (status === 'toWatch' && this.userAnime[animeTitle].toWatch) {
            this.userAnime[animeTitle].watched = false;
        }
        
        // Save data
        this.saveUserData();
        
        // Update UI
        this.applyFilters();
        this.showAnimeDetail(this.animeData.find(a => a.title === animeTitle));
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }

    showLoginModal() {
        document.getElementById('login-modal').classList.add('active');
        document.getElementById('login-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('login-modal')) {
                this.closeModal(document.getElementById('login-modal'));
            }
        });
    }

    loadUserData() {
        if (!this.currentUser || !this.db) return;
        
        this.db.collection('users').doc(this.currentUser.uid).get()
            .then(doc => {
                if (doc.exists) {
                    this.userAnime = doc.data().anime || {};
                    this.applyFilters();
                }
            })
            .catch(error => {
                console.error('Error loading user data:', error);
            });
    }

    loadLocalData() {
        const data = localStorage.getItem('guardalo_anime');
        if (data) {
            this.userAnime = JSON.parse(data);
            this.applyFilters();
        }
    }

    saveUserData() {
        if (this.currentUser && this.db) {
            // Save to Firestore
            this.db.collection('users').doc(this.currentUser.uid).set({
                anime: this.userAnime
            }, { merge: true });
        } else {
            // Save to localStorage
            localStorage.setItem('guardalo_anime', JSON.stringify(this.userAnime));
        }
    }

    clearLocalData() {
        this.userAnime = {};
        localStorage.removeItem('guardalo_anime');
        this.applyFilters();
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');
        
        if (this.currentUser) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            userInfo.textContent = this.currentUser.displayName || this.currentUser.email;
        } else {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
            userInfo.textContent = '';
        }
    }

    clearAllFilters() {
        this.filters = {
            search: '',
            genres: [],
            status: 'all'
        };
        
        document.getElementById('searchInput').value = '';
        document.getElementById('statusFilter').value = 'all';
        document.querySelectorAll('.chip.active').forEach(chip => {
            chip.classList.remove('active');
        });
        
        this.applyFilters();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.guardaloApp = new GuardaloApp();
});
