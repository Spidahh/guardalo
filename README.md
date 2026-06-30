# GUARDALO

**Una guida, non un catalogo.** Un tutor che accompagna chi guarda anime attraverso
**percorsi e generi curati** — dai primi passi ai capolavori più densi. Schede senza
spoiler, durata reale calcolata, dove vederlo (solo legale), motore di consigli.

Sito statico (vanilla JS, zero build) · dati reali da **AniList** · hosting **Vercel** ·
login/sync opzionale con **Firebase**. Tutto su piani gratuiti.

---

## Come funziona (architettura)

```
tools/seed-titles.json        ← lista curata dei titoli (id, titolo, anno)
        │  node tools/build.mjs map     (cerca gli id AniList → tools/anilist-map.json)
        │  node tools/build.mjs fetch   (scarica i FATTI reali + chiude le saghe)
        ▼
sources/anime.json            ← solo FATTI verificati (mai a mano), con provenienza
editorial/titles.json         ← schede spoiler-free (curatela umana)
editorial/paths.json          ← i percorsi curati (curatela umana)
        │  node tools/build.mjs gen     (merge + motore consigli)
        ▼
js/data.js  +  dist/data.json ← dataset finale che il sito legge a runtime
```

**Regola d'oro:** i FATTI vengono solo da AniList (verificati). I TESTI editoriali stanno
in `editorial/` e sono curatela. Non si mescolano mai. Nessun dato inventato.

### Comandi

```bash
npm run map      # cerca gli id AniList dei titoli del seed (raro: solo per nuovi titoli)
npm run fetch    # scarica dati reali + ricostruisce le saghe + calcola lunghezze
npm run gen      # unisce fatti + editoriale → js/data.js
npm run build    # map + fetch + gen (tutto)
npm run report   # statistiche sul dataset
npm run serve    # anteprima locale su http://localhost:4178
npm run prerender   # genera le pagine SEO statiche (/t /p /generi …) + sitemap.xml
npm run build:site  # gen + prerender (build completa per il deploy)
```

> Le pagine prerenderizzate sono gitignorate: vanno (ri)generate al deploy.
> Su Windows passa il dominio così: `$env:SITE_URL="https://tuodominio"; npm run prerender`.

### Aggiungere un titolo
1. Aggiungi `{ "id": "slug-titolo", "title": "Titolo", "year": 2020 }` a `tools/seed-titles.json`.
2. `npm run map` (trova l'id AniList; se sbaglia un titolo ambiguo, correggi in `MANUAL_MAP` dentro `tools/build.mjs`).
3. `npm run fetch && npm run gen`.
4. Scrivi la scheda spoiler-free in `editorial/titles.json` e, se serve, inseriscilo in un percorso in `editorial/paths.json`.

### Modificare percorsi / schede
Si toccano solo `editorial/paths.json` e `editorial/titles.json`, poi `npm run gen`.
**Mai** modificare a mano `sources/anime.json` o `js/data.js` (sono generati).

---

## Lunghezza: come viene calcolata
Non è un campo grezzo. È `episodi × durata media` sommati su tutta la **timeline principale**
della saga (la pipeline segue le relazioni PREQUEL/SEQUEL tra le serie TV/ONA), poi mappato in
una fascia: **Cortissimo / Corto / Medio / Lungo / Lunghissimo**. Così "Naruto" mostra l'impegno
reale di Naruto + Shippuden, non solo della prima stagione.

---

## Dati & licenze (uso commerciale con pubblicità)
- **AniList** — fonte unica (anime). Uso commerciale **gratuito sotto i 150$/mese di ricavi**;
  sopra serve una licenza AniList. Attribuzione mostrata nel footer. Immagini via CDN AniList.
- **TMDB** — **non usato**: la sua licenza gratuita vieta l'uso commerciale.
- **TVmaze** — previsto in **fase 2** per serie/film live-action (CC BY-SA, commerciale ok con
  attribuzione + ShareAlike).
- **Pirateria**: nessun link illegale. Solo streaming ufficiali (da AniList `externalLinks`).
  Requisito per AdSense.

## Refresh automatico
`.github/workflows/refresh.yml` gira ogni lunedì: rifà `fetch` + `gen` e committa i dati
aggiornati. Vercel ridistribuisce in automatico. Il runtime resta statico: gli utenti non
chiamano mai le API.

## Stack & costi
| Pezzo | Scelta | Costo |
|---|---|---|
| Hosting | Vercel statico | €0 |
| Refresh | GitHub Actions cron | €0 |
| Immagini | CDN AniList (hotlink) | €0 |
| Login/sync | Firebase Auth + Firestore (Spark) | €0 |

## TODO lancio
- **AdSense**: inserire lo script publisher in `index.html` (cerca `<!-- AdSense -->`) e compilare
  `ads.txt` alla radice (template già presente) con il proprio publisher id. Nessun contenuto di pirateria → policy ok.
- Immagine social e icone PWA sono già presenti (`og-image.png`, `icon-192.png`, `icon-512.png`).
- Fase 2: serie/film live via TVmaze (riusare lo schema, aggiungere `tools/build-tv.mjs`).
