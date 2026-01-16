# REQUIREMENTS MASTER LIST
Questo file è la VERITÀ ASSOLUTA del progetto. Nessuna modifica futura deve violare questi punti.

## 1. Branding
- **Nome Progetto**: GUARDALO (non StarWatch, non altro).
- **Titolo Pagina**: GUARDALO.
- **Logo**: Testo "GUARDALO", font: Anton, Size: Large, Colore: Accent (Rosso/Neon).
- **Posizione**: CENTRALE nella navbar.

## 2. Dati (Content)
- **Descrizioni**: Devono essere di alta qualità, "premium", senza spoiler, mature e dettagliate.
- **Stagioni/Episodi**: La scheda (modale) DEVE mostrare la struttura dettagliata (es. "S1 (12) • S2 (12)"). NON sommari generici.
- **Aggiornamento**: Dati aggiornati a Gennaio 2026.
- **Script Seeding**: `seed_db.js` deve usare `merge: true` per aggiornare senza cancellare.

## 3. UI/UX - Navbar
- **Layout**: 3 Blocchi distinti.
    - Sinistra: Barra di ricerca.
    - Centro: Logo GUARDALO.
    - Destra: Pulsante Login/Profilo.
- **Stile**: Glassmorphism scuro, sticky top.

## 4. UI/UX - Toolbar & Filtri
- **Generi**:
    - **Multi-selezione**: OBBLIGATORIA. L'utente può selezionare più chip contemporaneamente.
    - **Aspetto**: Chip ben distanziati.
    - **Stato Attivo**: Colore ROSSO VIVO (accent) quando selezionato.
- **Allineamento**: Tutto deve essere allineato rigorosamente.

## 5. UI/UX - Modale
- **Stile**: "Cinematic", simile a Netflix/Prime.
- **Layout**: Poster a sinistra, info a destra (desktop).
- **Links**: Bottoni distinti per Legali e Illegali (stile diverso).

## 6. Processo di Lavoro
- PRIMA di ogni modifica, consultare questo file.
- MAI rimuovere feature approvate (es. multi-selezione genere).
