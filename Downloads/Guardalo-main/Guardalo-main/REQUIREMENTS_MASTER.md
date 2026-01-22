# REQUIREMENTS MASTER LIST
Questo file è la VERITÀ ASSOLUTA del progetto. Nessuna modifica futura deve violare questi punti.

## 1. Branding
- **Nome Progetto**: GUARDALO (non StarWatch, non altro).
- **Titolo Pagina**: GUARDALO.
- **Logo**: Testo "GUARDALO", font: Anton, Size: Large, Colore: Accent (Rosso/Neon).
- **Posizione**: CENTRALE nella navbar.

## 2. Dati & Database (CRITICO)
- **Source of Truth**: Il file `js/initial_data.js` è il DATABASE MASTER LOCALE. Deve sempre esistere e contenere tutti i dati.
- **Salvataggio**: I dati devono essere salvati nella cartella del progetto, accessibili e leggibili.
- **Struttura Dati**: Vedi `DATABASE_LOG.md` per lo schema obbligatorio (Titolo, Generi, Sinossi, Struttura Stagioni, Link).
- **Seeding**: Lo script `seed_db.js` deve sincronizzare `initial_data.js` con Firebase (merge: true).
- **Descrizioni**: "Premium", senza spoiler, mature.
- **Stagioni**: Visualizzazione dettagliata ("S1 (12)").

## 3. UI/UX - Navbar
- **Layout**: 3 Blocchi distinti.
    - Sinistra: Barra di ricerca.
    - Centro: Logo GUARDALO.
    - Destra: Pulsante Login/Profilo.
- **Stile**: Glassmorphism scuro, sticky top.

## 4. UI/UX - Toolbar & Filtri
- **Generi**:
    - **Multi-selezione**: OBBLIGATORIA. Funzionamento cumulativo (OR/AND).
    - **Aspetto**: Chip ben distanziati.
    - **Stato Attivo**: Colore ROSSO VIVO (accent).
- **Allineamento**: Rigoroso.

## 5. UI/UX - Modale
- **Stile**: "Cinematic", simile a Netflix/Prime.
- **Layout**: Poster a sinistra, info a destra.
- **Links**: Bottoni distinti per Legali e Illegali (stile diverso).

## 6. Processo di Lavoro
- PRIMA di ogni modifica, consultare questo file.
- Documentare ogni cambiamento strutturale in `DATABASE_LOG.md`.
