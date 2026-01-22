// SISTEMA GESTIONE IMMAGINI OFFLINE
class ImageManager {
    constructor() {
        this.cache = new Map();
        this.fallbackMap = new Map();
        this.init();
    }

    init() {
        // Crea placeholder SVG per fallback
        this.createFallbackImages();
    }

    createFallbackImages() {
        // Genera placeholder SVG per ogni anime
        const colors = [
            '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#a16207',
            '#65a30d', '#16a34a', '#059669', '#0d9488', '#0e7490',
            '#0369a1', '#1d4ed8', '#2563eb', '#4f46e5', '#6366f1',
            '#7c3aed', '#8b5cf6', '#9333ea', '#a21caf', '#be185d'
        ];

        animeData.forEach((anime, index) => {
            const color = colors[index % colors.length];
            const svg = this.createPlaceholderSVG(anime.title, color);
            this.fallbackMap.set(anime.title, `data:image/svg+xml;base64,${btoa(svg)}`);
        });
    }

    createPlaceholderSVG(title, color) {
        const initials = title.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        return `
            <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
                        <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
                    </linearGradient>
                </defs>
                <rect width="300" height="450" fill="#151515"/>
                <rect width="300" height="450" fill="url(#grad)"/>
                <text x="150" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
                      text-anchor="middle" fill="white">${initials}</text>
                <text x="150" y="240" font-family="Arial, sans-serif" font-size="16" 
                      text-anchor="middle" fill="white" opacity="0.8">${title}</text>
            </svg>
        `;
    }

    async loadImage(url, title) {
        // Se l'immagine è già in cache, ritornala
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }

        return new Promise((resolve) => {
            const img = new Image();
            const timeout = setTimeout(() => {
                // Se l'immagine non carica in 3 secondi, usa fallback
                console.warn(`Immagine non caricata: ${title}`);
                resolve(this.fallbackMap.get(title));
            }, 3000);

            img.onload = () => {
                clearTimeout(timeout);
                this.cache.set(url, url);
                resolve(url);
            };

            img.onerror = () => {
                clearTimeout(timeout);
                console.warn(`Errore caricamento: ${title}`);
                resolve(this.fallbackMap.get(title));
            };

            img.src = url;
        });
    }

    getImageUrl(anime) {
        // Prova prima l'immagine originale
        if (this.cache.has(anime.img)) {
            return this.cache.get(anime.img);
        }
        
        // Altrimenti ritorna l'URL con un gestore di errori
        return anime.img;
    }
}

// Istanza globale
window.imageManager = new ImageManager();
