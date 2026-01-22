# GUARDALO - Versione Offline Completa

Sito personale per consigliare anime - **90 ANIME TOTALI** - Funziona completamente offline!

## 🚀 Novità della Versione Offline

### ✅ Problemi Risolti
- **Nessuna dipendenza Firebase** - Funziona senza internet
- **Immagini con fallback automatico** - Placeholder SVG se CDN non carica
- **90 anime invece di 47** - Database aggiornato
- **Login semplificato** - Basta inserire qualsiasi email
- **Performance migliorate** - Nessuna richiesta esterna

### 📁 Struttura
```
Guardalo/
├── index.html          # Pagina principale
├── css/
│   └── style.css       # Stili moderni
├── js/
│   ├── app.js          # Logica applicazione (offline)
│   ├── data.js         # 90 anime database
│   ├── local-storage.js # Sistema storage locale
│   └── image-manager.js # Gestione immagini offline
├── img/                # Cartella per immagini future
└── README_OFFLINE.md   # Questo file
```

## 🎯 Come Usare

1. **Apri `index.html`** nel browser (doppio click)
2. **Login**: Inserisci qualsiasi email (es: tu@email.com) o clicca "Accesso Rapido"
3. **Naviga**: Usa filtri, ricerca e ordinamento
4. **Salva liste**: I tuoi dati sono salvati localmente nel browser

### 💾 Backup Dati
Puoi esportare/importare le tue liste:
- Vai nella console (F12)
- `window.storageManager.exportData()` - Scarica backup
- `window.storageManager.importData(json)` - Ripristina backup

## 📊 Database Anime (90 totali)

### Categorie Principali
- **Action/Adventure** - 35 anime
- **Fantasy/Isekai** - 18 anime  
- **Drama/Romance** - 15 anime
- **Sci-Fi/Cyberpunk** - 10 anime
- **Sports** - 8 anime
- **Horror/Thriller** - 4 anime

### Top Consigliati
Imposta `top: true` in `data.js` per evidenziare i migliori:
- Attack on Titan
- Steins;Gate
- Frieren
- Oshi no Ko
- Your Name

## 🛠 Personalizzazione

### Aggiungere Anime
Modifica `js/data.js`:
```javascript
{
    title: "Nuovo Anime",
    genres: ["Action", "Fantasy"],
    year: 2024,
    img: "URL_IMMAGINE",
    studio: "Studio Name",
    stato: "In corso", // o "Finito", "Film"
    top: false, // metti true per top
    episodes: 12,
    synopsis: "Descrizione...",
    structure: [{ name: "S1", episodes: "12" }],
    links: {
        legal: [{ name: "Netflix", url: "#" }],
        alt: [{ name: "Cerca", url: "#" }]
    }
}
```

### Cambiare Colori
Modifica `css/style.css`:
```css
:root {
    --accent: #dc2626;        /* Rosso principale */
    --bg: #0d0d0d;           /* Sfondo */
    --surface: #151515;      /* Card/superfici */
    --text: #fff;            /* Testo principale */
}
```

## 🚨 Note Tecniche

### Immagini Offline
- Se le immagini CDN non caricano, appaiono placeholder SVG colorati
- Per immagini completamente offline: scarica in `img/` e usa percorsi locali
- Il sistema gestisce automaticamente timeout di 3 secondi

### Storage Locale
- Dati salvati nel browser localStorage
- Nessun limite di dimensioni per le liste anime
- Persiste tra sessioni dello stesso browser

### Compatibilità
- ✅ Chrome/Edge (consigliato)
- ✅ Firefox
- ✅ Safari
- ✅ Funziona su PC aziendali bloccati
- ❌ Non richiede connessione internet

## 🔄 Aggiornamenti Futuri

### Suggerimenti
- Scaricare immagini localmente (~50MB per 90 anime)
- Aggiungere funzione di valutazione stelle
- Implementare filtri per anno/studio
- Aggiungere sezione "Simili a..."

### Come Aggiornare
1. Backup con `exportData()`
2. Aggiungi/Modifica anime in `data.js`
3. Testa nel browser
4. Ripristina dati se necessario

---

**Creato per funzionare ovunque, anche senza internet! 🎌**
