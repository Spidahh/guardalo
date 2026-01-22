# GUARDALO - Sito Anime Personale

Sito web per gestire e scoprire anime con votazioni personali, filtri avanzati e tracking dei visti/da vedere.

## Caratteristiche

- ✅ Login con Google (Firebase Auth)
- ✅ Database con 50+ anime con voti personali (1-10)
- ✅ Badge TOP per anime consigliati
- ✅ Filtri multipli per generi
- ✅ Ricerca testuale
- ✅ Ordinamento per voto, anno, titolo
- ✅ Stato Visto/Da Vedere per utente
- ✅ Link streaming legali e illegali
- ✅ Design scuro e moderno
- ✅ Responsive per mobile

## Setup Firebase

1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Crea nuovo progetto "guardalo-anime"
3. Abilita:
   - Authentication → Google Sign-In
   - Firestore Database
4. Copia le credenziali in `js/firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "TUA_API_KEY",
    authDomain: "TUO_PROJ.firebaseapp.com",
    projectId: "TUO_PROJ",
    storageBucket: "TUO_PROJ.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456:web:abc123"
};
```

## Deploy su Vercel

1. Installa Vercel CLI:
```bash
npm i -g vercel
```

2. Esegui deploy:
```bash
vercel --prod
```

3. Configura dominio personalizzato in Vercel dashboard

## Struttura File

```
/
├── index.html          # Pagina principale
├── css/
│   └── style.css       # Stili scuri e moderni
├── js/
│   ├── firebase-config.js  # Config Firebase
│   ├── data.js         # Database anime
│   └── app.js          # Logica applicazione
└── README.md           # Questo file
```

## Funzionalità

### Filtri
- **Ricerca**: Cerca per titolo
- **Generi**: Seleziona multipli generi
- **Stato**: Tutti / Visti / Da Vedere
- **TOP**: Filtra anime TOP
- **Ordinamento**: Voto (decrescente/crescente), Anno, Titolo

### Tracking Utente
- Segna anime come "Visto" o "Da Vedere"
- Dati salvati su Firebase
- Badge visivi sulle card

### Dettagli Anime
- Sinossi completa
- Informazioni studio, episodi, anno
- Struttura stagioni
- Link streaming:
  - Legal: Netflix, Crunchyroll, etc.
  - Illegal: Google Search

## Personalizzazione

### Aggiungere Anime
Modifica `js/data.js` aggiungendo nuovi oggetti:

```javascript
{
    title: "Titolo Anime",
    rating: 8, // 1-10
    top: false, // true per badge TOP
    genres: ["Action", "Fantasy"],
    year: 2024,
    img: "URL_IMMAGINE",
    studio: "Studio",
    status: "In corso",
    episodes: 12,
    synopsis: "Descrizione...",
    structure: [{ name: "S1", episodes: "12" }],
    links: {
        legal: [{ name: "Crunchyroll", url: "#" }],
        illegal: [{ name: "Cerca", url: "https://google.com/search?q=titolo+streaming" }]
    }
}
```

### Modificare Stili
Tutti i colori sono variabili CSS in `style.css`:

```css
:root {
    --bg-primary: #0a0a0a;
    --bg-secondary: #1a1a1a;
    --accent: #ff4444;
    /* ecc... */
}
```

## Licenza

MIT - Fai quello che vuoi
