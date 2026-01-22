# DATABASE LOG & STRUCTURE
Questo file documenta la struttura del database di Guardalo.
**POSIZIONE FISICA**: `c:\Users\f.magista\Downloads\Guardalo-main\Guardalo-main\js\initial_data.js`

## 1. Principi Fondamentali
1.  **Local First**: I dati risiedono nel file `initial_data.js`.
2.  **Sync**: Lo script `seed_db.js` legge questo file e aggiorna Firebase.
3.  **No Data Loss**: I dati esistenti non vengono mai cancellati se non esplicitamente richiesto.

## 2. Schema Oggetto Anime
Ogni oggetto nell'array `animeData` deve rispettare questo schema:

```javascript
{
    title: "Nome dell'Anime",         // String (Obbligatorio)
    genres: ["Azione", "Fantasy"],    // Array di Stringhe (Obbligatorio)
    year: 2024,                       // Number
    img: "img/nome_file.jpg",         // String (Percorso locale)
    studio: "Nome Studio",            // String
    stato: "Finito" | "In corso",     // Enum
    synopsis: "Descrizione...",       // String (Lunga, Premium, No Spoiler)
    
    // STRUTTURA STAGIONI (Obbligatorio per visualizzazione corretta)
    structure: [
        { name: "Stagione 1", episodes: "12" },
        { name: "Stagione 2", episodes: "24" },
        { name: "OAV", episodes: "1" }
    ],

    // LINK STREAMING (Opzionale)
    links: {
        legal: [
            { name: "Netflix", url: "https://..." }
        ],
        illegal: [
            { name: "StreamingCommunity", url: "https://..." }
        ]
    }
}
```

## 3. Procedura di Aggiornamento
Per aggiungere o modificare anime:
1.  Aprire `js/initial_data.js`.
2.  Aggiungere l'oggetto nell'array `animeData`.
3.  Salvare il file.
4.  Aprire la console del browser e digitare `seedDatabase()` (o usare il pulsante admin se presente).

## 4. Note sui Dati Attuali
- I dati attuali sono aggiornati a Gennaio 2026.
- I link di streaming sono attualmente vuoti (in attesa di inserimento manuale).
