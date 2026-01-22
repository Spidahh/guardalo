# GUARDALO - MANUALE TECNICO COMPLETO

Questo documento raccoglie TUTTE le informazioni necessarie per il progetto Guardalo: Requisiti, Struttura Database, Procedure Tecniche e Posizioni dei File.

---

## 1. FILE MASTER DEL PROGETTO
*   **Database Dati (Master)**: `js/initial_data.js` (Contiene `const animeData = [...]`)
*   **Logica Applicazione**: `script.js` (Contiene il motore principale)
*   **Gestione Sync Database**: `js/seed_db.js` (Sincronizza locale -> cloud)
*   **Configurazione Firebase**: `firebase-config.js` (API Keys)
*   **Stile & Grafica**: `style.css` ("Guardalo Premium" Theme)
*   **Pagina Principale**: `index.html`

---

## 2. REQUISITI INTANGIBILI
1.  **Nome**: GUARDALO (Branding Anton Font).
2.  **Stabilità**: Il sito DEVE funzionare anche se Firebase è offline (grazie a `initial_data.js`).
3.  **UI/UX**:
    *   Navbar centrata.
    *   Filtri a multi-selezione rossi.
    *   Modale con dettaglio stagioni ("S1 (12)...").
    *   Niente spoiler nelle sinossi.

---

## 3. STRUTTURA DATABASE (animeData)
Per aggiungere un anime, apri `js/initial_data.js` e aggiungi un oggetto in questo formato:

```javascript
{
    title: "Titolo Anime",
    genres: ["Azione", "Horror"],
    year: 2024,
    img: "img/poster.jpg",          // Deve esistere nella cartella img/
    studio: "Studio Name",
    stato: "Finito" | "In corso",
    synopsis: "Descrizione dettagliata...",
    
    // CRITICO: Struttura Stagioni
    structure: [
        { name: "Stagione 1", episodes: "12" },
        { name: "Stagione 2", episodes: "24" }
    ],

    // Opzionale: Link Streaming
    links: {
        legal: [],
        illegal: []
    }
}
```

---

## 4. PROCEDURA DI AGGIORNAMENTO
Se modifichi `initial_data.js`:
1.  Salva il file.
2.  Ricarica il sito.
3.  Lo script `seedDatabase()` proverà ad aggiornare Firebase automaticamente se necessario, oppure puoi chiamarlo dalla console browser (`seedDatabase()`).

---

## 5. RISOLUZIONE PROBLEMI (SAFE MODE)
Se vedi schermo bianco o errori:
*   Il sito entra automaticamente in **SAFE MODE**.
*   Significa che usa SOLO i dati in `initial_data.js`.
*   Funzionalità come "Login" e "Salvataggio Preferiti" saranno disabilitate, ma la CONSULTAZIONE e la GRAFICA funzioneranno sempre.
