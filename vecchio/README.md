# GUARDALO - Definitivo

Sito personale per consigliare anime agli amici.

## Come Usare

1. **Apri `index.html`** nel browser (doppio click sul file)
2. Naviga tra gli anime con i filtri genere, stato e ordinamento
3. Clicca su una card per vedere i dettagli
4. Login con Google o Email per salvare le tue liste

## Struttura

```
Guardalo-Definitivo/
├── index.html          # Pagina principale
├── css/
│   └── style.css       # Stili e design
├── js/
│   ├── app.js          # Logica applicazione
│   ├── data.js         # Database anime
│   └── firebase-config.js  # Config Firebase
└── README.md
```

## Personalizzazione

### Aggiungere un anime

Modifica `js/data.js` e aggiungi un oggetto:

```javascript
{
    title: "Nome Anime",
    genres: ["Action", "Fantasy"],
    year: 2024,
    img: "URL_IMMAGINE",
    studio: "Nome Studio",
    stato: "Finito", // o "In corso"
    recommended: true, // opzionale
    synopsis: "Descrizione...",
    structure: [{ name: "Stagione 1", episodes: "12" }],
    links: {
        legal: [{ name: "Netflix", url: "https://..." }],
        illegal: [{ name: "Cerca", url: "https://..." }]
    }
}
```

### Cambiare colori

Modifica le variabili CSS in `css/style.css`:

```css
:root {
    --accent: #E50914;        /* Colore principale */
    --bg-main: #0a0a0a;       /* Sfondo */
    --color-success: #10b981; /* Colore "Visto" */
}
```

## Deploy


---


