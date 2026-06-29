# GUARDALO — Kit di lancio

Sito: **https://guardalo.vercel.app**

Il sito è pronto tecnicamente (SEO, sitemap, robots, dati). Quello che manca per
avere visite è **off-site** e richiede i tuoi account: vanno fatti UNA volta, in ordine.

---

## PARTE A — Cosa fare TU, in ordine

### 1. Attiva le statistiche visite (2 min) — per VEDERE chi entra
- Vai su **vercel.com** → progetto **guardalo** → scheda **Analytics** → **Enable**.
- Da quel momento vedi lì: visite, pagine più viste, da dove arrivano.
- (Lo script è già nel sito, si attiva da solo dopo l'Enable.)

### 2. Registra il sito su Google (10 min) — è IL passo che lo fa apparire su Google
- Vai su **search.google.com/search-console**.
- "Aggiungi proprietà" → tipo **URL prefix** → incolla `https://guardalo.vercel.app`.
- Verifica: scegli **HTML tag**, copia il codice `google-site-verification=...` e mandamelo
  → te lo metto nel sito in 1 minuto e poi clicchi "Verifica". (Oppure verifica via DNS se hai un dominio tuo.)
- Verificato → menu **Sitemap** → incolla `sitemap.xml` → **Invia**.
- Poi menu **Controllo URL** → incolla `https://guardalo.vercel.app` → **Richiedi indicizzazione**.
- ⏳ Google ci mette da qualche giorno a un paio di settimane a indicizzare. È normale.

### 3. Immagine anteprima link (5 min) — così quando condividi il link esce un'immagine
- Nel progetto c'è **`og-image.svg`** (già disegnata, 1200×630).
- Convertila in PNG: aprila su **cloudconvert.com/svg-to-png** (o screenshot a schermo intero),
  salvala come **`og-image.png`** nella cartella principale del sito, e caricala (commit/push).
- I tag social puntano già a `og-image.png`: appena c'è, le anteprime su WhatsApp/Reddit/Discord
  mostrano la card di GUARDALO.

### 4. Primi visitatori VERI (oggi stesso) — la SEO è lenta, questo no
Posta il sito dove stanno gli appassionati (testi pronti sotto, PARTE B). Bastano 2-3 post fatti bene.
Ogni post = primi visitatori + un link che aiuta anche Google a scoprire il sito.
- **Reddit**: r/anime (in inglese), r/AnimeItalia, r/Animeita.
- **Discord**: server anime italiani (canali #self-promo / #progetti).
- **Instagram / TikTok**: profilo a tema anime, video breve che mostra il sito.
- Gruppi **Facebook** di anime in italiano.

> Regola: NON spammare lo stesso testo ovunque. Personalizza un minimo, chiedi un parere
> ("che ne pensate?"), rispondi ai commenti. Le community puniscono lo spam, premiano chi partecipa.

---

## PARTE B — Testi pronti da copiare

### Reddit / Forum (italiano)
**Titolo:** Ho fatto una guida agli anime: cosa guardare, da dove iniziare e dove vederlo
**Testo:**
> Ho messo su **GUARDALO** (guardalo.vercel.app): una guida dove ogni anime è scelto e
> spiegato uno per uno — atmosfera, quanto ti impegna, da dove iniziare e dove vederlo,
> senza spoiler. Niente liste a caso. Ci sono generi, percorsi tematici e una ricerca.
> È gratis e senza account. Mi farebbe piacere un parere onesto: cosa aggiungereste o togliereste?

### Discord (breve)
> Ho fatto una guida agli anime, **guardalo.vercel.app** — anime spiegati uno per uno
> (cosa sono, da dove iniziare, dove vederli), divisi per genere e per percorso. Gratis,
> niente account. Se vi va datele un'occhiata e ditemi che ne pensate 🙏

### Instagram / TikTok (caption)
> Non sai cosa guardare? 👀 Ho fatto GUARDALO: una guida agli anime spiegati uno per uno —
> da dove iniziare, quanto durano, dove vederli. Gratis. Link in bio: guardalo.vercel.app
> #anime #animeitalia #cosaguardare #guidaanime

### Frase corta (WhatsApp / commenti)
> Guida agli anime, gratis e senza account: cosa guardare, da dove iniziare e dove vederlo → guardalo.vercel.app

---

## Cosa ho già fatto io (non serve che lo rifai)
- SEO tecnica: pagine pre-renderizzate per Google, `sitemap.xml`, `robots.txt` (crawling permesso),
  dati strutturati (JSON-LD), titoli/descrizioni per pagina.
- Tag social (Open Graph + Twitter) pronti, puntano a `og-image.png`.
- Script analytics inserito (manca solo il tuo "Enable" su Vercel, punto 1).
- Immagine social disegnata (`og-image.svg`, manca solo l'export in PNG, punto 3).
