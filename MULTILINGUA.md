# GUARDALO — Studio: sito multilingua + indicizzazione in più lingue

> Analisi tecnica basata sulla struttura reale del progetto (dati, testi editoriali, routing, build).
> Obiettivo: (1) far scegliere all'utente la lingua di tutto il sito e di ogni contenuto; (2) far indicizzare il sito su Google anche in altre lingue.

---

## 1. Com'è fatto il sito oggi (punto di partenza)

Il sito è statico: HTML + `js/app.js` (single-page app con routing via History API su URL come `/t/<id>`, `/p/<id>`, `/generi`, `/percorsi`). I dati vengono generati da `tools/build.mjs` e prerenderizzati da `tools/prerender.mjs` in pagine statiche (una `index.html` per ogni URL), con SEO completa per pagina (title, description, canonical, Open Graph, JSON-LD).

Il testo in italiano si divide in **tre categorie**, ognuna con una strategia di traduzione diversa:

**A) Etichette derivate** — una dozzina di valori (`Serie`, `Film`, `OVA`, `Concluso`, `In corso`, `Corto/Medio/Lungo`…) centralizzati come enum in `tools/build.mjs`. Tradurle è banale: una tabella di mappatura per lingua.

**B) Stringhe di interfaccia** — circa 60-80 stringhe fisse dentro `js/app.js` (menu, bottoni, "Accedi", "Cerca anime…", "Indietro", ecc.). Vanno estratte in un dizionario per lingua.

**C) Contenuto editoriale** — il cuore del sito, ~15-17k parole scritte a mano in `editorial/*.json`:

| File | Contenuto | Volume |
|---|---|---|
| `titles.json` | hook + "per chi" dei 190 titoli | ~12.000 parole |
| `categories.json` | descrizioni dei generi | ~3.500 parole |
| `paths.json` | descrizioni dei percorsi | ~2.100 parole |
| `tips.json` | consigli | ~1.600 parole |
| `home.json` / `user-ranking.json` | testi vari | ~900 parole |

Questa è la parte che vale (e che costa) tradurre. Il resto è meccanico.

---

## 2. Il punto chiave da capire subito

**Non esiste una scorciatoia SEO per "indicizzare in altre lingue" senza avere davvero il contenuto in quelle lingue.**

Tradurre solo i tag `title`/`description` lasciando il testo in italiano non funziona: Google lo classifica come *doorway page* / contenuto ingannevole e non ranka (rischia penalizzazione). Per comparire su Google in inglese devono esistere pagine reali con contenuto reale in inglese.

Quindi le due richieste ("far scegliere la lingua" e "indicizzare in altre lingue") sono in realtà **lo stesso lavoro**: una volta che il contenuto tradotto esiste ed è servito su URL propri, ottieni sia il selettore lingua sia l'indicizzazione multilingua. Non sono due strade alternative.

---

## 3. Architettura consigliata

### 3.1 Strategia URL (la scelta più importante per la SEO)

Consigliata: **sottocartella per lingua**, italiano alla radice, le altre lingue sotto prefisso.

```
guardalo.vercel.app/            → home IT (invariato)
guardalo.vercel.app/t/berserk   → scheda IT (invariato)
guardalo.vercel.app/en/         → home EN
guardalo.vercel.app/en/t/berserk→ scheda EN
```

Perché sottocartella e non sottodominio o dominio separato: è la più semplice da gestire su hosting statico, non frammenta l'autorità SEO del dominio, ed è la scelta raccomandata da Google per la maggior parte dei siti. Mantenere l'italiano alla radice evita di rompere gli URL già indicizzati (la home è già su Google).

### 3.2 Tag hreflang (obbligatori)

In ogni pagina, in `<head>`, dichiarare tutte le versioni linguistiche di quella pagina, così Google mostra la versione giusta all'utente giusto:

```html
<link rel="alternate" hreflang="it" href="https://guardalo.vercel.app/t/berserk">
<link rel="alternate" hreflang="en" href="https://guardalo.vercel.app/en/t/berserk">
<link rel="alternate" hreflang="x-default" href="https://guardalo.vercel.app/t/berserk">
```

Questo si genera automaticamente in `prerender.mjs` (che già scrive title/canonical/OG per ogni pagina: è il punto giusto dove aggiungere gli hreflang).

### 3.3 Selettore lingua (lato utente)

Meccanismo identico a quello che il sito già usa per il tema chiaro/scuro: la scelta si salva in `localStorage` (es. `guardalo_lang`) e determina la lingua all'avvio. Il selettore in header cambia lingua e naviga all'URL con il prefisso corrispondente (es. da `/t/berserk` a `/en/t/berserk`), così la scelta è anche condivisibile e indicizzabile — non solo uno stato JS invisibile a Google.

### 3.4 Struttura dei dati e della build

Due approcci possibili:

- **File per lingua** (consigliato): `editorial/en/titles.json`, `editorial/en/categories.json`, ecc. `build.mjs` genera `dist/data.it.json` e `dist/data.en.json`; `prerender.mjs` gira una volta per lingua producendo l'albero `/en/…`. Pulito, scalabile a N lingue.
- **Campi per lingua nello stesso oggetto** (es. `hook_it`, `hook_en`): più rapido da bootstrappare ma sporca lo schema. Sconsigliato oltre 2 lingue.

Le stringhe UI di `app.js` vanno in un dizionario tipo `js/i18n/it.js`, `js/i18n/en.js`, con `app.js` che pesca la lingua attiva.

### 3.5 Sitemap per lingua

`prerender.mjs` genera già `sitemap.xml`. Va esteso per includere gli URL `/en/…` (idealmente con i riferimenti hreflang dentro la sitemap). Poi si reinvia in Search Console.

---

## 4. Come tradurre concretamente il contenuto (le 3 opzioni)

**Opzione 1 — Manuale.** Qualità massima, tono curato come l'italiano attuale. Ma ~15k parole a lingua: lungo e costoso se fatto a mano.

**Opzione 2 — Traduzione assistita da AI (realistica e veloce).** Posso generare io le traduzioni inglesi dei file `editorial/*.json` mantenendo struttura JSON e chiavi, con lo stesso tono asciutto dell'originale. Tu fai una revisione finale. È l'approccio con il miglior rapporto qualità/tempo per partire.

**Opzione 3 — Ibrido (consigliato).** AI per la prima stesura di tutto, revisione umana prioritaria sui testi ad alto traffico (home, descrizioni generi, i 20-30 titoli più cercati). Il resto si rifinisce nel tempo.

Nota: i titoli delle opere e i dati "duri" (anno, episodi, studio) vengono già da AniList in più lingue, quindi molti metadati non vanno nemmeno tradotti.

---

## 5. Quanto è difficile, davvero

Difficoltà tecnica: **media**. Non ci sono ostacoli architetturali — il sito è già prerenderizzato con SEO per pagina e routing path-based, che è esattamente ciò che serve. Il lavoro è di refactoring ordinato, non di reinvenzione.

Le tre voci di lavoro:

1. **Codice** (routing con prefisso lingua, dizionario UI, hreflang nel prerender, build+sitemap per lingua): lavoro contenuto e ben delimitato. Fattibile.
2. **Contenuto** (tradurre ~15k parole per lingua): è la voce più pesante, ma l'AI la abbatte drasticamente.
3. **SEO** (hreflang, sitemap multilingua, reinvio a Search Console, attesa indicizzazione): standard.

Il rischio maggiore non è tecnico ma di **qualità dei contenuti tradotti**: una traduzione scadente indicizza male e rende peggio dell'italiano da solo. Per questo conviene partire da **una sola seconda lingua (inglese)** fatta bene, misurare, e poi replicare il pattern per altre lingue.

---

## 6. Piano a fasi consigliato

**Fase 0 — Fondamenta i18n (solo IT).** Estrarre le stringhe UI in un dizionario, spostare i testi editoriali in una struttura per-lingua (`editorial/it/…`), far girare build+prerender per-lingua parametrico. Il sito resta identico in italiano, ma la macchina è pronta ad accogliere lingue. *Nessun rischio, nessun cambiamento visibile.*

**Fase 1 — Aggiunta inglese (MVP multilingua).** Generare `editorial/en/*`, dizionario UI EN, prefisso `/en/`, selettore lingua, hreflang, sitemap estesa. Deploy. Reinvio sitemap a Search Console.

**Fase 2 — Rifinitura e misura.** Revisione umana dei testi EN ad alto traffico, monitoraggio in Search Console (impressioni/click per lingua e per pagina), correzioni.

**Fase 3 — Scalare.** Con il pattern collaudato, aggiungere altre lingue (spagnolo, francese…) è ripetere la Fase 1 su nuovi file di traduzione.

---

## 7. Cosa posso fare io, subito, senza altri prerequisiti

- Implementare la **Fase 0** (refactor i18n a lingua singola: dizionario UI + struttura dati per-lingua + build/prerender parametrico + hreflang predisposti). È tutto lavoro su file del repo, committabile e verificabile, che non cambia nulla per l'utente italiano.
- In parallelo, **generare la prima stesura inglese** dei file editoriali, pronta per la tua revisione.

Da lì la Fase 1 diventa in gran parte "accendere" ciò che è già predisposto.
