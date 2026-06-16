# INVENTARIO GUARDALO — il database del sito

> Documento **rigenerato** da `tools/inventario.mjs` (`npm run inventario`). NON modificarlo a mano:
> cambia i dati nei file sorgente (vedi §2) e rilancia il comando. Riflette sempre lo stato reale.

**Legenda:** ● = tuo (in lista) · ○ = aggiunto (extra AniList) · `[Essenziale/Consigliato/Da scoprire]` = fascia in quel genere.

## 1. Riepilogo

- **190 titoli** totali: **97 tuoi** ● + **93 aggiunti** ○ · 94 con tuo voto
- Fasce (somma su tutti i generi/percorsi): **97 Essenziali** · 171 Consigliati · 31 Da scoprire
- **18 generi** (in griglia) · **6 percorsi** · 2 generi fuori griglia (slice-of-life, sport)
- Per formato: Serie: 149 · Film: 30 · ONA: 8 · OVA: 3
- Per stato: Concluso: 187 · In corso: 3
- Per durata: Corto: 77 · Medio: 49 · Cortissimo: 33 · Lungo: 20 · Lunghissimo: 11

## 2. Dove sta cosa (mappa dei file)

| Cosa | File | Si modifica a mano? |
|---|---|---|
| Fatti dei titoli (titolo, anno, generi, studio, durata, voto AniList, immagini…) | `sources/anime.json` | ❌ generato da AniList (`npm run fetch`) |
| **La tua lista**: quali sono tuoi + il tuo voto | `editorial/user-ranking.json` | ✅ (o dal pannello /admin) |
| Testi delle schede (hook, tono, "per chi è") | `editorial/titles.json` | ✅ |
| Dritte per la visione | `editorial/tips.json` | ✅ |
| **Percorsi** (titoli dentro ogni percorso) | `editorial/paths.json` | ✅ |
| **Generi**: ordine, appartenenza titoli, **fasce E/C/D**, immagine hero | `editorial/categories.json` | ✅ (o dal pannello /admin) |
| Dataset finale che il sito legge | `js/data.js` + `dist/data.json` | ❌ generato (`npm run gen`) |

Dopo aver toccato un file ✅: `npm run gen` (rigenera i dati) → bumpa `?v=` in `index.html` → `npm run inventario`.

## 3. Generi (18) — cosa c'è dentro

### Battle Shōnen  `battle-shonen`
*hero: JUJUTSU KAISEN* · 27 titoli — 8 Essenziali / 17 Consigliati / 2 Da scoprire

- [Essenziale] ● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
- [Essenziale] ● **ONE PIECE** (1999) · Serie · tuo voto 10 · AniList 8.7 · `one-piece`
- [Essenziale] ● **Naruto** (2002) · Serie · tuo voto 10 · AniList 8 · `naruto`
- [Essenziale] ● **JoJo's Bizarre Adventure (TV)** (2012) · Serie · tuo voto 10 · AniList 7.7 · `jojo-s-bizarre-adventure`
- [Essenziale] ● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
- [Essenziale] ● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
- [Essenziale] ● **JUJUTSU KAISEN** (2020) · Serie · tuo voto 9 · AniList 8.4 · `jujutsu-kaisen`
- [Essenziale] ● **Bleach** (2004) · Serie · tuo voto 9 · AniList 7.9 · `bleach`
- [Consigliato] ● **Mob Psycho 100** (2016) · Serie · tuo voto 9 · AniList 8.4 · `mob-psycho-100`
- [Consigliato] ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
- [Consigliato] ● **Solo Leveling** (2024) · Serie · tuo voto 9 · AniList 8.1 · `solo-leveling`
- [Consigliato] ● **Hell’s Paradise** (2023) · Serie · tuo voto 9 · AniList 8 · `hell-s-paradise-jigokuraku`
- [Consigliato] ● **Kill la Kill** (2013) · Serie · tuo voto 9 · AniList 7.9 · `kill-la-kill`
- [Consigliato] ● **Dragon Ball** (1986) · Serie · tuo voto 9 · AniList 7.8 · `dragon-ball`
- [Consigliato] ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
- [Consigliato] ● **Gachiakuta** (2025) · Serie · tuo voto 8 · AniList 8.2 · `gachiakuta`
- [Consigliato] ● **Kaiju No. 8** (2024) · Serie · tuo voto 8 · AniList 8.1 · `kaiju-no-8`
- [Consigliato] ● **Black Clover** (2017) · Serie · tuo voto 8 · AniList 7.9 · `black-clover`
- [Consigliato] ● **My Hero Academia** (2016) · Serie · tuo voto 8 · AniList 7.7 · `my-hero-academia`
- [Consigliato] ● **Saint Seiya: Knights of the Zodiac** (1986) · Serie · tuo voto 8 · AniList 7.3 · `saint-seiya`
- [Consigliato] ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
- [Consigliato] ● **To Be Hero X** (2025) · ONA · tuo voto 7 · AniList 8.5 · `to-be-hero-x`
- [Consigliato] ● **My Hero Academia: Vigilantes** (2025) · Serie · tuo voto 7 · AniList 7.6 · `my-hero-academia-vigilantes`
- [Consigliato] ● **Tower of God** (2020) · Serie · tuo voto 7 · AniList 7.4 · `tower-of-god`
- [Consigliato] ● **Darwin's Game** (2020) · Serie · tuo voto 7 · AniList 7 · `darwin-s-game`
- [Da scoprire] ○ **Yu Yu Hakusho: Ghostfiles** (1992) · Serie · AniList 8.3 · `yu-yu-hakusho`
- [Da scoprire] ○ **Dr. STONE** (2019) · Serie · AniList 8.1 · `dr-stone`

### Seinen e Roba Adulta  `seinen-e-maturo`
*hero: Monster* · 25 titoli — 3 Essenziali / 19 Consigliati / 3 Da scoprire

- [Essenziale] ● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
- [Essenziale] ● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
- [Essenziale] ● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
- [Consigliato] ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
- [Consigliato] ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
- [Consigliato] ● **Samurai Champloo** (2004) · Serie · tuo voto 9 · AniList 8.4 · `samurai-champloo`
- [Consigliato] ● **Kingdom** (2012) · Serie · tuo voto 9 · AniList 7.4 · `kingdom`
- [Consigliato] ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
- [Consigliato] ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
- [Consigliato] ● **Chainsaw Man** (2022) · Serie · tuo voto 8 · AniList 8.3 · `chainsaw-man`
- [Consigliato] ● **86 EIGHTY-SIX** (2021) · Serie · tuo voto 8 · AniList 8.3 · `86-eighty-six`
- [Consigliato] ● **Trigun** (1998) · Serie · tuo voto 8 · AniList 8 · `trigun`
- [Consigliato] ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
- [Consigliato] ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
- [Consigliato] ● **Devilman Crybaby** (2018) · ONA · tuo voto 8 · AniList 7.6 · `devilman-crybaby`
- [Consigliato] ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
- [Consigliato] ● **Wolf's Rain** (2003) · Serie · tuo voto 8 · AniList 7.4 · `wolf-s-rain`
- [Consigliato] ● **Gantz** (2004) · Serie · tuo voto 8 · AniList 6.4 · `gantz`
- [Consigliato] ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`
- [Consigliato] ● **Death Parade** (2015) · Serie · tuo voto 7 · AniList 8 · `death-parade`
- [Consigliato] ● **Tokyo Revengers** (2021) · Serie · tuo voto 7 · AniList 7.7 · `tokyo-revengers`
- [Consigliato] ● **Deadman Wonderland** (2011) · Serie · tuo voto 7 · AniList 6.7 · `deadman-wonderland`
- [Da scoprire] ○ **Legend of the Galactic Heroes** (1988) · OVA · AniList 8.8 · `legend-of-the-galactic-heroes`
- [Da scoprire] ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`
- [Da scoprire] ○ **Dororo** (2019) · Serie · AniList 8.1 · `dororo`

### Isekai  `isekai`
*hero: Re:ZERO -Starting Life in Another World-* · 19 titoli — 4 Essenziali / 13 Consigliati / 2 Da scoprire

- [Essenziale] ● **Solo Leveling** (2024) · Serie · tuo voto 9 · AniList 8.1 · `solo-leveling`
- [Essenziale] ● **Sentenced to Be a Hero** (2026) · Serie · tuo voto 9 · AniList 8.1 · `sentence-to-be-hero`
- [Essenziale] ● **Shangri-La Frontier** (2023) · Serie · tuo voto 9 · AniList 8 · `shangri-la-frontier`
- [Essenziale] ● **Grimgar of Fantasy and Ash** (2016) · Serie · tuo voto 9 · AniList 7.4 · `grimgar-of-fantasy-and-ash`
- [Consigliato] ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
- [Consigliato] ● **Overlord** (2015) · Serie · tuo voto 8 · AniList 7.7 · `overlord`
- [Consigliato] ● **The Rising of the Shield Hero** (2019) · Serie · tuo voto 8 · AniList 7.7 · `the-rising-of-the-shield-hero`
- [Consigliato] ● **Gate** (2015) · Serie · tuo voto 8 · AniList 7.4 · `gate`
- [Consigliato] ● **Reincarnated as a Sword** (2022) · ONA · tuo voto 8 · AniList 7.4 · `reincarnated-as-a-sword`
- [Consigliato] ● **Handyman Saitou in Another World** (2023) · Serie · tuo voto 8 · AniList 7.2 · `handyman-saitou-in-another-world`
- [Consigliato] ● **Sword Art Online** (2012) · Serie · tuo voto 8 · AniList 7 · `sword-art-online`
- [Consigliato] ● **Failure Frame: I Became the Strongest and Annihilated Everything with Low-Level Spells** (2024) · Serie · tuo voto 8 · AniList 6.3 · `failure-frame-i-became-the-strongest`
- [Consigliato] ● **The Eminence in Shadow** (2022) · Serie · tuo voto 7 · AniList 8.1 · `the-eminence-in-shadow`
- [Consigliato] ● **DRIFTERS** (2016) · Serie · tuo voto 7 · AniList 7.5 · `drifters`
- [Consigliato] ● **The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat** (2021) · Serie · tuo voto 7 · AniList 7.2 · `the-world-s-finest-assassin-gets-reincarnated-in-another-world-as-an-aristocrat`
- [Consigliato] ● **Release that Witch** (2026) · ONA · AniList 8 · `release-that-witch`
- [Consigliato] ● **Petals of Reincarnation** (2026) · Serie · AniList 6 · `petals-of-reincarnation`
- [Da scoprire] ○ **Mushoku Tensei: Jobless Reincarnation** (2021) · Serie · AniList 8.2 · `mushoku-tensei`
- [Da scoprire] ○ **That Time I Got Reincarnated as a Slime** (2018) · Serie · AniList 8 · `tensura`

### Fantasy  `fantasy`
*hero: Frieren: Beyond Journey’s End* · 17 titoli — 3 Essenziali / 13 Consigliati / 1 Da scoprire

- [Essenziale] ● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
- [Essenziale] ● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
- [Essenziale] ● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
- [Consigliato] ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
- [Consigliato] ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
- [Consigliato] ● **Ranking of Kings** (2021) · Serie · tuo voto 8 · AniList 8.3 · `ranking-of-kings`
- [Consigliato] ● **Fate/Zero** (2011) · Serie · tuo voto 8 · AniList 8.1 · `fate-franchise-completo`
- [Consigliato] ● **Black Clover** (2017) · Serie · tuo voto 8 · AniList 7.9 · `black-clover`
- [Consigliato] ● **Devil May Cry** (2007) · Serie · tuo voto 8 · AniList 6.6 · `devil-may-cry`
- [Consigliato] ● **Frieren: Beyond Journey’s End** (2023) · Serie · tuo voto 7 · AniList 9.1 · `frieren`
- [Consigliato] ● **Wistoria: Wand and Sword** (2024) · Serie · tuo voto 7 · AniList 7.9 · `wistoria-wand-and-sword`
- [Consigliato] ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`
- [Consigliato] ● **Tower of God** (2020) · Serie · tuo voto 7 · AniList 7.4 · `tower-of-god`
- [Consigliato] ● **BNA** (2020) · ONA · tuo voto 7 · AniList 7.2 · `bna-brand-new-animal`
- [Consigliato] ● **BURN THE WITCH** (2020) · ONA · tuo voto 7 · AniList 7 · `burn-the-witch`
- [Consigliato] ● **Daemons of the Shadow Realm** (2026) · Serie · AniList 7.8 · `daemons-of-the-shadow-realm`
- [Da scoprire] ○ **Delicious in Dungeon** (2024) · Serie · AniList 8.5 · `dungeon-meshi`

### Fantascienza  `sci-fi`
*hero: Cyberpunk: Edgerunners* · 18 titoli — 2 Essenziali / 12 Consigliati / 4 Da scoprire

- [Essenziale] ● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
- [Essenziale] ● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
- [Consigliato] ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
- [Consigliato] ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
- [Consigliato] ● **Heavenly Delusion** (2023) · Serie · tuo voto 9 · AniList 8.1 · `heavenly-delusion`
- [Consigliato] ● **Ghost in the Shell** (1995) · Film · tuo voto 9 · AniList 8 · `ghost-in-the-shell`
- [Consigliato] ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
- [Consigliato] ● **Parasyte -the maxim-** (2014) · Serie · tuo voto 8 · AniList 8.1 · `parasyte-the-maxim`
- [Consigliato] ● **Trigun** (1998) · Serie · tuo voto 8 · AniList 8 · `trigun`
- [Consigliato] ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
- [Consigliato] ● **Wolf's Rain** (2003) · Serie · tuo voto 8 · AniList 7.4 · `wolf-s-rain`
- [Consigliato] ● **LAZARUS** (2025) · Serie · tuo voto 8 · AniList 7 · `lazarus`
- [Consigliato] ● **DECA-DENCE** (2020) · Serie · tuo voto 7 · AniList 7.1 · `deca-dence`
- [Consigliato] ● **Terra Formars** (2014) · Serie · tuo voto 7 · AniList 6.5 · `terra-formars`
- [Da scoprire] ○ **Vivy -Fluorite Eye's Song-** (2021) · Serie · AniList 8.2 · `vivy-fluorite-eyes-song`
- [Da scoprire] ○ **PSYCHO-PASS** (2012) · Serie · AniList 8.1 · `psycho-pass`
- [Da scoprire] ○ **From the New World** (2012) · Serie · AniList 8 · `from-the-new-world`
- [Da scoprire] ○ **Ergo Proxy** (2006) · Serie · AniList 7.6 · `ergo-proxy`

### Mecha  `mecha`
*hero: Neon Genesis Evangelion* · 10 titoli — 2 Essenziali / 5 Consigliati / 3 Da scoprire

- [Essenziale] ● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
- [Essenziale] ● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
- [Consigliato] ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
- [Consigliato] ● **PLUTO** (2023) · ONA · tuo voto 8 · AniList 8.4 · `pluto`
- [Consigliato] ● **86 EIGHTY-SIX** (2021) · Serie · tuo voto 8 · AniList 8.3 · `86-eighty-six`
- [Consigliato] ● **FLCL** (2000) · OVA · tuo voto 8 · AniList 7.9 · `flcl`
- [Consigliato] ● **Promare** (2019) · Film · tuo voto 8 · AniList 7.7 · `promare`
- [Da scoprire] ○ **Mobile Suit GUNDAM Iron Blooded Orphans** (2015) · Serie · AniList 7.8 · `gundam-iron-blooded-orphans`
- [Da scoprire] ○ **Eureka Seven** (2005) · Serie · AniList 7.8 · `eureka-seven`
- [Da scoprire] ○ **Mobile Suit Gundam: The Witch from Mercury** (2022) · Serie · AniList 7.8 · `gundam-witch-from-mercury`

### Super Robot Classici  `super-robot`
*hero: Mazinger Z* · 6 titoli — 0 Essenziali / 0 Consigliati / 6 Da scoprire

- [Da scoprire] ○ **Mobile Suit Gundam** (1979) · Serie · AniList 7.7 · `mobile-suit-gundam`
- [Da scoprire] ○ **UFO Robo Grendizer** (1975) · Serie · AniList 7.1 · `ufo-robot-grendizer`
- [Da scoprire] ○ **Mazinger Z** (1972) · Serie · AniList 6.8 · `mazinger-z`
- [Da scoprire] ○ **Great Mazinger** (1974) · Serie · AniList 6.8 · `great-mazinger`
- [Da scoprire] ○ **Getter Robo** (1974) · Serie · AniList 6.4 · `getter-robo`
- [Da scoprire] ○ **Future Robot Daltanious** (1979) · Serie · AniList 6.4 · `daltanious`

### Mindfuck  `mindfuck`
*hero: Death Note* · 22 titoli — 4 Essenziali / 11 Consigliati / 7 Da scoprire

- [Essenziale] ● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
- [Essenziale] ● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
- [Essenziale] ● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
- [Essenziale] ● **Summer Time Rendering** (2022) · Serie · tuo voto 9 · AniList 8.3 · `summer-time-rendering`
- [Consigliato] ● **Heavenly Delusion** (2023) · Serie · tuo voto 9 · AniList 8.1 · `heavenly-delusion`
- [Consigliato] ● **The Future Diary** (2011) · Serie · tuo voto 9 · AniList 6.9 · `future-diary`
- [Consigliato] ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
- [Consigliato] ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
- [Consigliato] ● **The Promised Neverland** (2019) · Serie · tuo voto 8 · AniList 8.4 · `the-promised-neverland`
- [Consigliato] ● **PLUTO** (2023) · ONA · tuo voto 8 · AniList 8.4 · `pluto`
- [Consigliato] ● **Parasyte -the maxim-** (2014) · Serie · tuo voto 8 · AniList 8.1 · `parasyte-the-maxim`
- [Consigliato] ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
- [Consigliato] ● **ERASED** (2016) · Serie · tuo voto 7 · AniList 8.1 · `erased`
- [Consigliato] ● **Death Parade** (2015) · Serie · tuo voto 7 · AniList 8 · `death-parade`
- [Consigliato] ● **AJIN: Demi-Human** (2016) · Serie · tuo voto 7 · AniList 7.1 · `ajin-demi-human`
- [Da scoprire] ○ **The Tatami Galaxy** (2010) · Serie · AniList 8.5 · `the-tatami-galaxy`
- [Da scoprire] ○ **Puella Magi Madoka Magica** (2011) · Serie · AniList 8.3 · `madoka-magica`
- [Da scoprire] ○ **Serial Experiments Lain** (1998) · Serie · AniList 8 · `serial-experiments-lain`
- [Da scoprire] ○ **Terror in Resonance** (2014) · Serie · AniList 7.8 · `terror-in-resonance`
- [Da scoprire] ○ **ID: INVADED** (2020) · Serie · AniList 7.7 · `id-invaded`
- [Da scoprire] ○ **Ergo Proxy** (2006) · Serie · AniList 7.6 · `ergo-proxy`
- [Da scoprire] ○ **Paranoia Agent** (2004) · Serie · AniList 7.6 · `paranoia-agent`

### Horror e Disagio  `horror-e-disagio`
*hero: Chainsaw Man* · 22 titoli — 2 Essenziali / 14 Consigliati / 6 Da scoprire

- [Essenziale] ● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
- [Essenziale] ● **Summer Time Rendering** (2022) · Serie · tuo voto 9 · AniList 8.3 · `summer-time-rendering`
- [Consigliato] ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
- [Consigliato] ● **Hell’s Paradise** (2023) · Serie · tuo voto 9 · AniList 8 · `hell-s-paradise-jigokuraku`
- [Consigliato] ● **The Future Diary** (2011) · Serie · tuo voto 9 · AniList 6.9 · `future-diary`
- [Consigliato] ● **The Promised Neverland** (2019) · Serie · tuo voto 8 · AniList 8.4 · `the-promised-neverland`
- [Consigliato] ● **Chainsaw Man** (2022) · Serie · tuo voto 8 · AniList 8.3 · `chainsaw-man`
- [Consigliato] ● **Parasyte -the maxim-** (2014) · Serie · tuo voto 8 · AniList 8.1 · `parasyte-the-maxim`
- [Consigliato] ● **Devilman Crybaby** (2018) · ONA · tuo voto 8 · AniList 7.6 · `devilman-crybaby`
- [Consigliato] ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
- [Consigliato] ● **Gantz** (2004) · Serie · tuo voto 8 · AniList 6.4 · `gantz`
- [Consigliato] ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`
- [Consigliato] ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`
- [Consigliato] ● **AJIN: Demi-Human** (2016) · Serie · tuo voto 7 · AniList 7.1 · `ajin-demi-human`
- [Consigliato] ● **Deadman Wonderland** (2011) · Serie · tuo voto 7 · AniList 6.7 · `deadman-wonderland`
- [Consigliato] ● **Terra Formars** (2014) · Serie · tuo voto 7 · AniList 6.5 · `terra-formars`
- [Da scoprire] ○ **From the New World** (2012) · Serie · AniList 8 · `from-the-new-world`
- [Da scoprire] ○ **Tokyo Ghoul** (2014) · Serie · AniList 7.6 · `tokyo-ghoul`
- [Da scoprire] ○ **Dark Gathering** (2023) · Serie · AniList 7.5 · `dark-gathering`
- [Da scoprire] ○ **Shiki** (2010) · Serie · AniList 7.5 · `shiki`
- [Da scoprire] ○ **When They Cry** (2006) · Serie · AniList 7.5 · `higurashi`
- [Da scoprire] ○ **Another** (2012) · Serie · AniList 7.1 · `another`

### Sopravvivenza  `sopravvivenza`
*hero: The Promised Neverland* · 6 titoli — 4 Essenziali / 2 Consigliati / 0 Da scoprire

- [Essenziale] ● **The Future Diary** (2011) · Serie · tuo voto 9 · AniList 6.9 · `future-diary`
- [Essenziale] ● **The Promised Neverland** (2019) · Serie · tuo voto 8 · AniList 8.4 · `the-promised-neverland`
- [Essenziale] ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
- [Essenziale] ● **Gantz** (2004) · Serie · tuo voto 8 · AniList 6.4 · `gantz`
- [Consigliato] ● **Darwin's Game** (2020) · Serie · tuo voto 7 · AniList 7 · `darwin-s-game`
- [Consigliato] ● **Deadman Wonderland** (2011) · Serie · tuo voto 7 · AniList 6.7 · `deadman-wonderland`

### Storico  `storici`
*hero: Vinland Saga* · 5 titoli — 4 Essenziali / 1 Consigliati / 0 Da scoprire

- [Essenziale] ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
- [Essenziale] ● **Samurai Champloo** (2004) · Serie · tuo voto 9 · AniList 8.4 · `samurai-champloo`
- [Essenziale] ● **Kingdom** (2012) · Serie · tuo voto 9 · AniList 7.4 · `kingdom`
- [Essenziale] ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
- [Consigliato] ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`

### Vendetta  `vendetta`
*hero: Berserk* · 6 titoli — 1 Essenziali / 5 Consigliati / 0 Da scoprire

- [Essenziale] ● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
- [Consigliato] ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
- [Consigliato] ● **Hell’s Paradise** (2023) · Serie · tuo voto 9 · AniList 8 · `hell-s-paradise-jigokuraku`
- [Consigliato] ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
- [Consigliato] ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
- [Consigliato] ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`

### Viaggi nel Tempo  `viaggi-nel-tempo`
*hero: Steins;Gate* · 5 titoli — 2 Essenziali / 3 Consigliati / 0 Da scoprire

- [Essenziale] ● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
- [Essenziale] ● **Summer Time Rendering** (2022) · Serie · tuo voto 9 · AniList 8.3 · `summer-time-rendering`
- [Consigliato] ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
- [Consigliato] ● **ERASED** (2016) · Serie · tuo voto 7 · AniList 8.1 · `erased`
- [Consigliato] ● **Tokyo Revengers** (2021) · Serie · tuo voto 7 · AniList 7.7 · `tokyo-revengers`

### Crimine e Gangster  `crimine`
*hero: 91 Days* · 5 titoli — 4 Essenziali / 0 Consigliati / 1 Da scoprire

- [Essenziale] ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
- [Essenziale] ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
- [Essenziale] ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
- [Essenziale] ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
- [Da scoprire] ○ **PSYCHO-PASS** (2012) · Serie · AniList 8.1 · `psycho-pass`

### Supereroi  `supereroi`
*hero: My Hero Academia* · 4 titoli — 4 Essenziali / 0 Consigliati / 0 Da scoprire

- [Essenziale] ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
- [Essenziale] ● **My Hero Academia** (2016) · Serie · tuo voto 8 · AniList 7.7 · `my-hero-academia`
- [Essenziale] ● **To Be Hero X** (2025) · ONA · tuo voto 7 · AniList 8.5 · `to-be-hero-x`
- [Essenziale] ● **My Hero Academia: Vigilantes** (2025) · Serie · tuo voto 7 · AniList 7.6 · `my-hero-academia-vigilantes`

### Romance  `romance`
*hero: Sword Art Online* · 18 titoli — 4 Essenziali / 0 Consigliati / 14 Da scoprire

- [Essenziale] ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
- [Essenziale] ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
- [Essenziale] ● **Sword Art Online** (2012) · Serie · tuo voto 8 · AniList 7 · `sword-art-online`
- [Essenziale] ● **Tokyo Revengers** (2021) · Serie · tuo voto 7 · AniList 7.7 · `tokyo-revengers`
- [Da scoprire] ○ **Clannad: After Story** (2008) · Serie · AniList 8.8 · `clannad-after-story`
- [Da scoprire] ○ **NANA** (2006) · Serie · AniList 8.5 · `nana`
- [Da scoprire] ○ **Your lie in April** (2014) · Serie · AniList 8.4 · `your-lie-in-april`
- [Da scoprire] ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`
- [Da scoprire] ○ **Kaguya-sama: Love is War** (2019) · Serie · AniList 8.3 · `kaguya-sama-love-is-war`
- [Da scoprire] ○ **Fruits Basket (2019)** (2019) · Serie · AniList 8.2 · `fruits-basket-2019`
- [Da scoprire] ○ **Maquia: When the Promised Flower Blooms** (2018) · Film · AniList 8.2 · `maquia`
- [Da scoprire] ○ **Horimiya** (2021) · Serie · AniList 8.1 · `horimiya`
- [Da scoprire] ○ **Rascal Does Not Dream of Bunny Girl Senpai** (2018) · Serie · AniList 8.1 · `bunny-girl-senpai`
- [Da scoprire] ○ **Skip and Loafer** (2023) · Serie · AniList 8.1 · `skip-and-loafer`
- [Da scoprire] ○ **My Dress-Up Darling** (2022) · Serie · AniList 8 · `my-dress-up-darling`
- [Da scoprire] ○ **Toradora!** (2008) · Serie · AniList 7.8 · `toradora`
- [Da scoprire] ○ **Clannad** (2007) · Serie · AniList 7.7 · `clannad`
- [Da scoprire] ○ **Honey and Clover** (2005) · Serie · AniList 7.6 · `honey-and-clover`

### Commedia  `commedia`
*hero: SPY x FAMILY* · 20 titoli — 4 Essenziali / 5 Consigliati / 11 Da scoprire

- [Essenziale] ● **Mob Psycho 100** (2016) · Serie · tuo voto 9 · AniList 8.4 · `mob-psycho-100`
- [Essenziale] ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
- [Essenziale] ● **Kill la Kill** (2013) · Serie · tuo voto 9 · AniList 7.9 · `kill-la-kill`
- [Essenziale] ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
- [Consigliato] ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
- [Consigliato] ● **Handyman Saitou in Another World** (2023) · Serie · tuo voto 8 · AniList 7.2 · `handyman-saitou-in-another-world`
- [Consigliato] ● **Magical Shopping Arcade Abenobashi** (2002) · Serie · tuo voto 8 · AniList 6.9 · `abenobashi-magical-shopping-street`
- [Consigliato] ● **SPY x FAMILY** (2022) · Serie · tuo voto 7 · AniList 8.3 · `spy-x-family`
- [Consigliato] ● **The Eminence in Shadow** (2022) · Serie · tuo voto 7 · AniList 8.1 · `the-eminence-in-shadow`
- [Da scoprire] ○ **Gintama** (2006) · Serie · AniList 8.5 · `gintama`
- [Da scoprire] ○ **GTO: Great Teacher Onizuka** (1999) · Serie · AniList 8.4 · `great-teacher-onizuka`
- [Da scoprire] ○ **Nichijou - My Ordinary Life** (2011) · Serie · AniList 8.3 · `nichijou`
- [Da scoprire] ○ **The Disastrous Life of Saiki K.** (2016) · Serie · AniList 8.3 · `saiki-k`
- [Da scoprire] ○ **Kaguya-sama: Love is War** (2019) · Serie · AniList 8.3 · `kaguya-sama-love-is-war`
- [Da scoprire] ○ **Grand Blue Dreaming** (2018) · Serie · AniList 8.2 · `grand-blue`
- [Da scoprire] ○ **HINAMATSURI** (2018) · Serie · AniList 8 · `hinamatsuri`
- [Da scoprire] ○ **Daily Lives of High School Boys** (2012) · Serie · AniList 8 · `daily-lives-of-high-school-boys`
- [Da scoprire] ○ **KONOSUBA -God's blessing on this wonderful world!** (2016) · Serie · AniList 7.9 · `konosuba`
- [Da scoprire] ○ **Asobi Asobase - workshop of fun -** (2018) · Serie · AniList 7.9 · `asobi-asobase`
- [Da scoprire] ○ **Komi Can’t Communicate** (2021) · Serie · AniList 7.6 · `komi-cant-communicate`

### Film d'Animazione  `cinema-dautore`
*hero: Akira* · 29 titoli — 4 Essenziali / 1 Consigliati / 24 Da scoprire

- [Essenziale] ● **Spirited Away** (2001) · Film · tuo voto 9 · AniList 8.6 · `la-citta-incantata`
- [Essenziale] ● **Princess Mononoke** (1997) · Film · tuo voto 9 · AniList 8.5 · `principessa-mononoke`
- [Essenziale] ● **Ghost in the Shell** (1995) · Film · tuo voto 9 · AniList 8 · `ghost-in-the-shell`
- [Essenziale] ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
- [Consigliato] ● **Promare** (2019) · Film · tuo voto 8 · AniList 7.7 · `promare`
- [Da scoprire] ○ **A Silent Voice** (2016) · Film · AniList 8.8 · `a-silent-voice`
- [Da scoprire] ○ **Your Name.** (2016) · Film · AniList 8.6 · `your-name`
- [Da scoprire] ○ **Howl‘s Moving Castle** (2004) · Film · AniList 8.5 · `howls-moving-castle`
- [Da scoprire] ○ **Perfect Blue** (1998) · Film · AniList 8.5 · `perfect-blue`
- [Da scoprire] ○ **Grave of the Fireflies** (1988) · Film · AniList 8.3 · `grave-of-the-fireflies`
- [Da scoprire] ○ **Wolf Children** (2012) · Film · AniList 8.3 · `wolf-children`
- [Da scoprire] ○ **My Neighbor Totoro** (1988) · Film · AniList 8.1 · `my-neighbor-totoro`
- [Da scoprire] ○ **Nausicaä of the Valley of the Wind** (1984) · Film · AniList 8.1 · `nausicaa`
- [Da scoprire] ○ **Kiki's Delivery Service** (1989) · Film · AniList 8.1 · `kikis-delivery-service`
- [Da scoprire] ○ **The Tale of The Princess Kaguya** (2013) · Film · AniList 8.1 · `the-tale-of-the-princess-kaguya`
- [Da scoprire] ○ **Whisper of the Heart** (1995) · Film · AniList 8.1 · `whisper-of-the-heart`
- [Da scoprire] ○ **Weathering With You** (2019) · Film · AniList 8.1 · `weathering-with-you`
- [Da scoprire] ○ **Millennium Actress** (2002) · Film · AniList 8.1 · `millennium-actress`
- [Da scoprire] ○ **Tokyo Godfathers** (2003) · Film · AniList 8.1 · `tokyo-godfathers`
- [Da scoprire] ○ **Redline** (2009) · Film · AniList 8.1 · `redline`
- [Da scoprire] ○ **Castle in the Sky** (1986) · Film · AniList 8 · `castle-in-the-sky`
- [Da scoprire] ○ **The Wind Rises** (2013) · Film · AniList 8 · `the-wind-rises`
- [Da scoprire] ○ **Ponyo** (2008) · Film · AniList 7.9 · `ponyo`
- [Da scoprire] ○ **Paprika** (2006) · Film · AniList 7.9 · `paprika`
- [Da scoprire] ○ **Porco Rosso** (1992) · Film · AniList 7.8 · `porco-rosso`
- [Da scoprire] ○ **The Girl Who Leapt Through Time** (2006) · Film · AniList 7.8 · `the-girl-who-leapt-through-time`
- [Da scoprire] ○ **The Boy and the Heron** (2023) · Film · AniList 7.7 · `the-boy-and-the-heron`
- [Da scoprire] ○ **Summer Wars** (2009) · Film · AniList 7.7 · `summer-wars`
- [Da scoprire] ○ **5 Centimeters per Second** (2007) · Film · AniList 7.2 · `5-centimeters-per-second`

## 4. Percorsi (6) — cosa c'è dentro

### Da Zero a Otaku  `da-zero-a-otaku`
*hero: Fullmetal Alchemist: Brotherhood* · 
19 titoli — 11 Essenziali / 8 Consigliati / 0 Da scoprire

- [Essenziale] ● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
- [Essenziale] ● **ONE PIECE** (1999) · Serie · tuo voto 10 · AniList 8.7 · `one-piece`
- [Essenziale] ● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
- [Essenziale] ● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
- [Essenziale] ● **Naruto** (2002) · Serie · tuo voto 10 · AniList 8 · `naruto`
- [Essenziale] ● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
- [Essenziale] ● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
- [Essenziale] ● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
- [Essenziale] ● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
- [Essenziale] ● **JUJUTSU KAISEN** (2020) · Serie · tuo voto 9 · AniList 8.4 · `jujutsu-kaisen`
- [Essenziale] ● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
- [Consigliato] ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
- [Consigliato] ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
- [Consigliato] ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
- [Consigliato] ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
- [Consigliato] ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
- [Consigliato] ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
- [Consigliato] ● **Dragon Ball** (1986) · Serie · tuo voto 9 · AniList 7.8 · `dragon-ball`
- [Consigliato] ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`

### Solo Capolavori  `capolavori`
*hero: Cowboy Bebop* · Le opere che non si discutono: i voti più alti e le pietre miliari. Se hai poco tempo e vu…
17 titoli — 10 Essenziali / 5 Consigliati / 2 Da scoprire

- [Essenziale] ● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
- [Essenziale] ● **ONE PIECE** (1999) · Serie · tuo voto 10 · AniList 8.7 · `one-piece`
- [Essenziale] ● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
- [Essenziale] ● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
- [Essenziale] ● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
- [Essenziale] ● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
- [Essenziale] ● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
- [Essenziale] ● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
- [Essenziale] ● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
- [Essenziale] ● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
- [Consigliato] ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
- [Consigliato] ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
- [Consigliato] ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
- [Consigliato] ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
- [Consigliato] ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
- [Da scoprire] ○ **Perfect Blue** (1998) · Film · AniList 8.5 · `perfect-blue`
- [Da scoprire] ○ **The Tatami Galaxy** (2010) · Serie · AniList 8.5 · `the-tatami-galaxy`

### Azione Adrenalinica  `azione`
*hero: Demon Slayer: Kimetsu no Yaiba* · Solo adrenalina: combattimenti spettacolari, ritmo serrato e animazione che lascia a bocca…
13 titoli — 4 Essenziali / 9 Consigliati / 0 Da scoprire

- [Essenziale] ● **JoJo's Bizarre Adventure (TV)** (2012) · Serie · tuo voto 10 · AniList 7.7 · `jojo-s-bizarre-adventure`
- [Essenziale] ● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
- [Essenziale] ● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
- [Essenziale] ● **JUJUTSU KAISEN** (2020) · Serie · tuo voto 9 · AniList 8.4 · `jujutsu-kaisen`
- [Consigliato] ● **Mob Psycho 100** (2016) · Serie · tuo voto 9 · AniList 8.4 · `mob-psycho-100`
- [Consigliato] ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
- [Consigliato] ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
- [Consigliato] ● **Kill la Kill** (2013) · Serie · tuo voto 9 · AniList 7.9 · `kill-la-kill`
- [Consigliato] ● **Chainsaw Man** (2022) · Serie · tuo voto 8 · AniList 8.3 · `chainsaw-man`
- [Consigliato] ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
- [Consigliato] ● **Kaiju No. 8** (2024) · Serie · tuo voto 8 · AniList 8.1 · `kaiju-no-8`
- [Consigliato] ● **Promare** (2019) · Film · tuo voto 8 · AniList 7.7 · `promare`
- [Consigliato] ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`

### Antieroi & Vendetta  `antieroi`
*hero: Code Geass: Lelouch of the Rebellion* · Protagonisti che non sono eroi: vendetta, ambiguità morale, mezzi discutibili per fini dis…
12 titoli — 2 Essenziali / 9 Consigliati / 1 Da scoprire

- [Essenziale] ● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
- [Essenziale] ● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
- [Consigliato] ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
- [Consigliato] ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
- [Consigliato] ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
- [Consigliato] ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
- [Consigliato] ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
- [Consigliato] ● **Devilman Crybaby** (2018) · ONA · tuo voto 8 · AniList 7.6 · `devilman-crybaby`
- [Consigliato] ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
- [Consigliato] ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
- [Consigliato] ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`
- [Da scoprire] ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`

### I Grandi Classici  `il-canone`
*hero: Ghost in the Shell* · 
22 titoli — 7 Essenziali / 11 Consigliati / 4 Da scoprire

- [Essenziale] ● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
- [Essenziale] ● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
- [Essenziale] ● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
- [Essenziale] ● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
- [Essenziale] ● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
- [Essenziale] ● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
- [Essenziale] ● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
- [Consigliato] ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
- [Consigliato] ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
- [Consigliato] ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
- [Consigliato] ● **Samurai Champloo** (2004) · Serie · tuo voto 9 · AniList 8.4 · `samurai-champloo`
- [Consigliato] ● **Ghost in the Shell** (1995) · Film · tuo voto 9 · AniList 8 · `ghost-in-the-shell`
- [Consigliato] ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
- [Consigliato] ● **Dragon Ball** (1986) · Serie · tuo voto 9 · AniList 7.8 · `dragon-ball`
- [Consigliato] ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
- [Consigliato] ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
- [Consigliato] ● **Trigun** (1998) · Serie · tuo voto 8 · AniList 8 · `trigun`
- [Consigliato] ● **Frieren: Beyond Journey’s End** (2023) · Serie · tuo voto 7 · AniList 9.1 · `frieren`
- [Da scoprire] ○ **Legend of the Galactic Heroes** (1988) · OVA · AniList 8.8 · `legend-of-the-galactic-heroes`
- [Da scoprire] ○ **Clannad: After Story** (2008) · Serie · AniList 8.8 · `clannad-after-story`
- [Da scoprire] ○ **Yu Yu Hakusho: Ghostfiles** (1992) · Serie · AniList 8.3 · `yu-yu-hakusho`
- [Da scoprire] ○ **Puella Magi Madoka Magica** (2011) · Serie · AniList 8.3 · `madoka-magica`

### Chicche Nascoste  `chicche-e-deep-cut`
*hero: Heavenly Delusion* · 
17 titoli — 4 Essenziali / 8 Consigliati / 5 Da scoprire

- [Essenziale] ● **Heavenly Delusion** (2023) · Serie · tuo voto 9 · AniList 8.1 · `heavenly-delusion`
- [Essenziale] ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
- [Essenziale] ● **FLCL** (2000) · OVA · tuo voto 8 · AniList 7.9 · `flcl`
- [Essenziale] ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
- [Consigliato] ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
- [Consigliato] ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
- [Consigliato] ● **Wolf's Rain** (2003) · Serie · tuo voto 8 · AniList 7.4 · `wolf-s-rain`
- [Consigliato] ● **Magical Shopping Arcade Abenobashi** (2002) · Serie · tuo voto 8 · AniList 6.9 · `abenobashi-magical-shopping-street`
- [Consigliato] ● **To Be Hero X** (2025) · ONA · tuo voto 7 · AniList 8.5 · `to-be-hero-x`
- [Consigliato] ● **Death Parade** (2015) · Serie · tuo voto 7 · AniList 8 · `death-parade`
- [Consigliato] ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`
- [Consigliato] ● **DECA-DENCE** (2020) · Serie · tuo voto 7 · AniList 7.1 · `deca-dence`
- [Da scoprire] ○ **MUSHI-SHI** (2005) · Serie · AniList 8.5 · `mushishi`
- [Da scoprire] ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`
- [Da scoprire] ○ **Welcome to the N-H-K** (2006) · Serie · AniList 8.2 · `welcome-to-the-nhk`
- [Da scoprire] ○ **Dororo** (2019) · Serie · AniList 8.1 · `dororo`
- [Da scoprire] ○ **Planetes** (2003) · Serie · AniList 8 · `planetes`

## 5. Generi fuori griglia (raggiungibili solo da ricerca/URL)

### Slice of Life  `slice-of-life` — 5 titoli — 0 Essenziali / 0 Consigliati / 5 Da scoprire
- [Da scoprire] ○ **Violet Evergarden** (2018) · Serie · AniList 8.5 · `violet-evergarden`
- [Da scoprire] ○ **MUSHI-SHI** (2005) · Serie · AniList 8.5 · `mushishi`
- [Da scoprire] ○ **March comes in like a lion** (2016) · Serie · AniList 8.3 · `march-comes-in-like-a-lion`
- [Da scoprire] ○ **Barakamon** (2014) · Serie · AniList 8.2 · `barakamon`
- [Da scoprire] ○ **Laid-Back Camp** (2018) · Serie · AniList 8.1 · `laid-back-camp`

### Sport  `sport` — 6 titoli — 0 Essenziali / 0 Consigliati / 6 Da scoprire
- [Da scoprire] ○ **Hajime no Ippo: The Fighting!** (2000) · Serie · AniList 8.7 · `hajime-no-ippo`
- [Da scoprire] ○ **Ping Pong the Animation** (2014) · Serie · AniList 8.6 · `ping-pong-the-animation`
- [Da scoprire] ○ **HAIKYU!!** (2014) · Serie · AniList 8.4 · `haikyuu`
- [Da scoprire] ○ **Slam Dunk** (1993) · Serie · AniList 8.3 · `slam-dunk`
- [Da scoprire] ○ **Run with the Wind** (2018) · Serie · AniList 8.3 · `run-with-the-wind`
- [Da scoprire] ○ **BLUE LOCK** (2022) · Serie · AniList 8 · `blue-lock`

## 6. I tuoi titoli vs gli aggiunti

### ● I tuoi 97 (in lista, da user-ranking.json)
1. ● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
2. ● **ONE PIECE** (1999) · Serie · tuo voto 10 · AniList 8.7 · `one-piece`
3. ● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
4. ● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
5. ● **Naruto** (2002) · Serie · tuo voto 10 · AniList 8 · `naruto`
6. ● **JoJo's Bizarre Adventure (TV)** (2012) · Serie · tuo voto 10 · AniList 7.7 · `jojo-s-bizarre-adventure`
7. ● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
8. ● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
9. ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
10. ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
11. ● **Spirited Away** (2001) · Film · tuo voto 9 · AniList 8.6 · `la-citta-incantata`
12. ● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
13. ● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
14. ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
15. ● **Princess Mononoke** (1997) · Film · tuo voto 9 · AniList 8.5 · `principessa-mononoke`
16. ● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
17. ● **JUJUTSU KAISEN** (2020) · Serie · tuo voto 9 · AniList 8.4 · `jujutsu-kaisen`
18. ● **Mob Psycho 100** (2016) · Serie · tuo voto 9 · AniList 8.4 · `mob-psycho-100`
19. ● **Samurai Champloo** (2004) · Serie · tuo voto 9 · AniList 8.4 · `samurai-champloo`
20. ● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
21. ● **Summer Time Rendering** (2022) · Serie · tuo voto 9 · AniList 8.3 · `summer-time-rendering`
22. ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
23. ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
24. ● **Heavenly Delusion** (2023) · Serie · tuo voto 9 · AniList 8.1 · `heavenly-delusion`
25. ● **Solo Leveling** (2024) · Serie · tuo voto 9 · AniList 8.1 · `solo-leveling`
26. ● **Sentenced to Be a Hero** (2026) · Serie · tuo voto 9 · AniList 8.1 · `sentence-to-be-hero`
27. ● **Ghost in the Shell** (1995) · Film · tuo voto 9 · AniList 8 · `ghost-in-the-shell`
28. ● **Hell’s Paradise** (2023) · Serie · tuo voto 9 · AniList 8 · `hell-s-paradise-jigokuraku`
29. ● **Shangri-La Frontier** (2023) · Serie · tuo voto 9 · AniList 8 · `shangri-la-frontier`
30. ● **Bleach** (2004) · Serie · tuo voto 9 · AniList 7.9 · `bleach`
31. ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
32. ● **Kill la Kill** (2013) · Serie · tuo voto 9 · AniList 7.9 · `kill-la-kill`
33. ● **Dragon Ball** (1986) · Serie · tuo voto 9 · AniList 7.8 · `dragon-ball`
34. ● **Grimgar of Fantasy and Ash** (2016) · Serie · tuo voto 9 · AniList 7.4 · `grimgar-of-fantasy-and-ash`
35. ● **Kingdom** (2012) · Serie · tuo voto 9 · AniList 7.4 · `kingdom`
36. ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
37. ● **The Future Diary** (2011) · Serie · tuo voto 9 · AniList 6.9 · `future-diary`
38. ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
39. ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
40. ● **PLUTO** (2023) · ONA · tuo voto 8 · AniList 8.4 · `pluto`
41. ● **The Promised Neverland** (2019) · Serie · tuo voto 8 · AniList 8.4 · `the-promised-neverland`
42. ● **Chainsaw Man** (2022) · Serie · tuo voto 8 · AniList 8.3 · `chainsaw-man`
43. ● **86 EIGHTY-SIX** (2021) · Serie · tuo voto 8 · AniList 8.3 · `86-eighty-six`
44. ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
45. ● **Ranking of Kings** (2021) · Serie · tuo voto 8 · AniList 8.3 · `ranking-of-kings`
46. ● **Gachiakuta** (2025) · Serie · tuo voto 8 · AniList 8.2 · `gachiakuta`
47. ● **Kaiju No. 8** (2024) · Serie · tuo voto 8 · AniList 8.1 · `kaiju-no-8`
48. ● **Parasyte -the maxim-** (2014) · Serie · tuo voto 8 · AniList 8.1 · `parasyte-the-maxim`
49. ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
50. ● **Fate/Zero** (2011) · Serie · tuo voto 8 · AniList 8.1 · `fate-franchise-completo`
51. ● **Trigun** (1998) · Serie · tuo voto 8 · AniList 8 · `trigun`
52. ● **Black Clover** (2017) · Serie · tuo voto 8 · AniList 7.9 · `black-clover`
53. ● **FLCL** (2000) · OVA · tuo voto 8 · AniList 7.9 · `flcl`
54. ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
55. ● **My Hero Academia** (2016) · Serie · tuo voto 8 · AniList 7.7 · `my-hero-academia`
56. ● **Overlord** (2015) · Serie · tuo voto 8 · AniList 7.7 · `overlord`
57. ● **Promare** (2019) · Film · tuo voto 8 · AniList 7.7 · `promare`
58. ● **The Rising of the Shield Hero** (2019) · Serie · tuo voto 8 · AniList 7.7 · `the-rising-of-the-shield-hero`
59. ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
60. ● **Devilman Crybaby** (2018) · ONA · tuo voto 8 · AniList 7.6 · `devilman-crybaby`
61. ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
62. ● **Gate** (2015) · Serie · tuo voto 8 · AniList 7.4 · `gate`
63. ● **Reincarnated as a Sword** (2022) · ONA · tuo voto 8 · AniList 7.4 · `reincarnated-as-a-sword`
64. ● **Wolf's Rain** (2003) · Serie · tuo voto 8 · AniList 7.4 · `wolf-s-rain`
65. ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
66. ● **Saint Seiya: Knights of the Zodiac** (1986) · Serie · tuo voto 8 · AniList 7.3 · `saint-seiya`
67. ● **Handyman Saitou in Another World** (2023) · Serie · tuo voto 8 · AniList 7.2 · `handyman-saitou-in-another-world`
68. ● **LAZARUS** (2025) · Serie · tuo voto 8 · AniList 7 · `lazarus`
69. ● **Sword Art Online** (2012) · Serie · tuo voto 8 · AniList 7 · `sword-art-online`
70. ● **Magical Shopping Arcade Abenobashi** (2002) · Serie · tuo voto 8 · AniList 6.9 · `abenobashi-magical-shopping-street`
71. ● **Devil May Cry** (2007) · Serie · tuo voto 8 · AniList 6.6 · `devil-may-cry`
72. ● **Gantz** (2004) · Serie · tuo voto 8 · AniList 6.4 · `gantz`
73. ● **Failure Frame: I Became the Strongest and Annihilated Everything with Low-Level Spells** (2024) · Serie · tuo voto 8 · AniList 6.3 · `failure-frame-i-became-the-strongest`
74. ● **Frieren: Beyond Journey’s End** (2023) · Serie · tuo voto 7 · AniList 9.1 · `frieren`
75. ● **To Be Hero X** (2025) · ONA · tuo voto 7 · AniList 8.5 · `to-be-hero-x`
76. ● **SPY x FAMILY** (2022) · Serie · tuo voto 7 · AniList 8.3 · `spy-x-family`
77. ● **ERASED** (2016) · Serie · tuo voto 7 · AniList 8.1 · `erased`
78. ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`
79. ● **The Eminence in Shadow** (2022) · Serie · tuo voto 7 · AniList 8.1 · `the-eminence-in-shadow`
80. ● **Death Parade** (2015) · Serie · tuo voto 7 · AniList 8 · `death-parade`
81. ● **Wistoria: Wand and Sword** (2024) · Serie · tuo voto 7 · AniList 7.9 · `wistoria-wand-and-sword`
82. ● **Tokyo Revengers** (2021) · Serie · tuo voto 7 · AniList 7.7 · `tokyo-revengers`
83. ● **My Hero Academia: Vigilantes** (2025) · Serie · tuo voto 7 · AniList 7.6 · `my-hero-academia-vigilantes`
84. ● **DRIFTERS** (2016) · Serie · tuo voto 7 · AniList 7.5 · `drifters`
85. ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`
86. ● **Tower of God** (2020) · Serie · tuo voto 7 · AniList 7.4 · `tower-of-god`
87. ● **BNA** (2020) · ONA · tuo voto 7 · AniList 7.2 · `bna-brand-new-animal`
88. ● **The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat** (2021) · Serie · tuo voto 7 · AniList 7.2 · `the-world-s-finest-assassin-gets-reincarnated-in-another-world-as-an-aristocrat`
89. ● **AJIN: Demi-Human** (2016) · Serie · tuo voto 7 · AniList 7.1 · `ajin-demi-human`
90. ● **DECA-DENCE** (2020) · Serie · tuo voto 7 · AniList 7.1 · `deca-dence`
91. ● **BURN THE WITCH** (2020) · ONA · tuo voto 7 · AniList 7 · `burn-the-witch`
92. ● **Darwin's Game** (2020) · Serie · tuo voto 7 · AniList 7 · `darwin-s-game`
93. ● **Deadman Wonderland** (2011) · Serie · tuo voto 7 · AniList 6.7 · `deadman-wonderland`
94. ● **Terra Formars** (2014) · Serie · tuo voto 7 · AniList 6.5 · `terra-formars`
95. ● **Release that Witch** (2026) · ONA · AniList 8 · `release-that-witch`
96. ● **Daemons of the Shadow Realm** (2026) · Serie · AniList 7.8 · `daemons-of-the-shadow-realm`
97. ● **Petals of Reincarnation** (2026) · Serie · AniList 6 · `petals-of-reincarnation`

### ○ Gli 93 aggiunti da Claude (extra AniList ≥8.0, non in lista)
1. ○ **A Silent Voice** (2016) · Film · AniList 8.8 · `a-silent-voice`
2. ○ **Clannad: After Story** (2008) · Serie · AniList 8.8 · `clannad-after-story`
3. ○ **Legend of the Galactic Heroes** (1988) · OVA · AniList 8.8 · `legend-of-the-galactic-heroes`
4. ○ **The Apothecary Diaries** (2023) · Serie · AniList 8.8 · `the-apothecary-diaries`
5. ○ **Hajime no Ippo: The Fighting!** (2000) · Serie · AniList 8.7 · `hajime-no-ippo`
6. ○ **Your Name.** (2016) · Film · AniList 8.6 · `your-name`
7. ○ **Ping Pong the Animation** (2014) · Serie · AniList 8.6 · `ping-pong-the-animation`
8. ○ **Violet Evergarden** (2018) · Serie · AniList 8.5 · `violet-evergarden`
9. ○ **MUSHI-SHI** (2005) · Serie · AniList 8.5 · `mushishi`
10. ○ **NANA** (2006) · Serie · AniList 8.5 · `nana`
11. ○ **Gintama** (2006) · Serie · AniList 8.5 · `gintama`
12. ○ **Perfect Blue** (1998) · Film · AniList 8.5 · `perfect-blue`
13. ○ **Delicious in Dungeon** (2024) · Serie · AniList 8.5 · `dungeon-meshi`
14. ○ **Howl‘s Moving Castle** (2004) · Film · AniList 8.5 · `howls-moving-castle`
15. ○ **The Tatami Galaxy** (2010) · Serie · AniList 8.5 · `the-tatami-galaxy`
16. ○ **Your lie in April** (2014) · Serie · AniList 8.4 · `your-lie-in-april`
17. ○ **HAIKYU!!** (2014) · Serie · AniList 8.4 · `haikyuu`
18. ○ **GTO: Great Teacher Onizuka** (1999) · Serie · AniList 8.4 · `great-teacher-onizuka`
19. ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`
20. ○ **March comes in like a lion** (2016) · Serie · AniList 8.3 · `march-comes-in-like-a-lion`
21. ○ **Kaguya-sama: Love is War** (2019) · Serie · AniList 8.3 · `kaguya-sama-love-is-war`
22. ○ **Slam Dunk** (1993) · Serie · AniList 8.3 · `slam-dunk`
23. ○ **Run with the Wind** (2018) · Serie · AniList 8.3 · `run-with-the-wind`
24. ○ **Nichijou - My Ordinary Life** (2011) · Serie · AniList 8.3 · `nichijou`
25. ○ **The Disastrous Life of Saiki K.** (2016) · Serie · AniList 8.3 · `saiki-k`
26. ○ **Puella Magi Madoka Magica** (2011) · Serie · AniList 8.3 · `madoka-magica`
27. ○ **Yu Yu Hakusho: Ghostfiles** (1992) · Serie · AniList 8.3 · `yu-yu-hakusho`
28. ○ **Wolf Children** (2012) · Film · AniList 8.3 · `wolf-children`
29. ○ **Grave of the Fireflies** (1988) · Film · AniList 8.3 · `grave-of-the-fireflies`
30. ○ **Barakamon** (2014) · Serie · AniList 8.2 · `barakamon`
31. ○ **Fruits Basket (2019)** (2019) · Serie · AniList 8.2 · `fruits-basket-2019`
32. ○ **Maquia: When the Promised Flower Blooms** (2018) · Film · AniList 8.2 · `maquia`
33. ○ **Grand Blue Dreaming** (2018) · Serie · AniList 8.2 · `grand-blue`
34. ○ **Welcome to the N-H-K** (2006) · Serie · AniList 8.2 · `welcome-to-the-nhk`
35. ○ **Mushoku Tensei: Jobless Reincarnation** (2021) · Serie · AniList 8.2 · `mushoku-tensei`
36. ○ **Vivy -Fluorite Eye's Song-** (2021) · Serie · AniList 8.2 · `vivy-fluorite-eyes-song`
37. ○ **Laid-Back Camp** (2018) · Serie · AniList 8.1 · `laid-back-camp`
38. ○ **Horimiya** (2021) · Serie · AniList 8.1 · `horimiya`
39. ○ **Rascal Does Not Dream of Bunny Girl Senpai** (2018) · Serie · AniList 8.1 · `bunny-girl-senpai`
40. ○ **PSYCHO-PASS** (2012) · Serie · AniList 8.1 · `psycho-pass`
41. ○ **Dr. STONE** (2019) · Serie · AniList 8.1 · `dr-stone`
42. ○ **Dororo** (2019) · Serie · AniList 8.1 · `dororo`
43. ○ **Weathering With You** (2019) · Film · AniList 8.1 · `weathering-with-you`
44. ○ **Millennium Actress** (2002) · Film · AniList 8.1 · `millennium-actress`
45. ○ **Tokyo Godfathers** (2003) · Film · AniList 8.1 · `tokyo-godfathers`
46. ○ **My Neighbor Totoro** (1988) · Film · AniList 8.1 · `my-neighbor-totoro`
47. ○ **Nausicaä of the Valley of the Wind** (1984) · Film · AniList 8.1 · `nausicaa`
48. ○ **Redline** (2009) · Film · AniList 8.1 · `redline`
49. ○ **Kiki's Delivery Service** (1989) · Film · AniList 8.1 · `kikis-delivery-service`
50. ○ **The Tale of The Princess Kaguya** (2013) · Film · AniList 8.1 · `the-tale-of-the-princess-kaguya`
51. ○ **Whisper of the Heart** (1995) · Film · AniList 8.1 · `whisper-of-the-heart`
52. ○ **Skip and Loafer** (2023) · Serie · AniList 8.1 · `skip-and-loafer`
53. ○ **BLUE LOCK** (2022) · Serie · AniList 8 · `blue-lock`
54. ○ **Daily Lives of High School Boys** (2012) · Serie · AniList 8 · `daily-lives-of-high-school-boys`
55. ○ **HINAMATSURI** (2018) · Serie · AniList 8 · `hinamatsuri`
56. ○ **Planetes** (2003) · Serie · AniList 8 · `planetes`
57. ○ **Serial Experiments Lain** (1998) · Serie · AniList 8 · `serial-experiments-lain`
58. ○ **That Time I Got Reincarnated as a Slime** (2018) · Serie · AniList 8 · `tensura`
59. ○ **Castle in the Sky** (1986) · Film · AniList 8 · `castle-in-the-sky`
60. ○ **The Wind Rises** (2013) · Film · AniList 8 · `the-wind-rises`
61. ○ **From the New World** (2012) · Serie · AniList 8 · `from-the-new-world`
62. ○ **My Dress-Up Darling** (2022) · Serie · AniList 8 · `my-dress-up-darling`
63. ○ **Paprika** (2006) · Film · AniList 7.9 · `paprika`
64. ○ **Ponyo** (2008) · Film · AniList 7.9 · `ponyo`
65. ○ **KONOSUBA -God's blessing on this wonderful world!** (2016) · Serie · AniList 7.9 · `konosuba`
66. ○ **Asobi Asobase - workshop of fun -** (2018) · Serie · AniList 7.9 · `asobi-asobase`
67. ○ **The Girl Who Leapt Through Time** (2006) · Film · AniList 7.8 · `the-girl-who-leapt-through-time`
68. ○ **Porco Rosso** (1992) · Film · AniList 7.8 · `porco-rosso`
69. ○ **Mobile Suit GUNDAM Iron Blooded Orphans** (2015) · Serie · AniList 7.8 · `gundam-iron-blooded-orphans`
70. ○ **Eureka Seven** (2005) · Serie · AniList 7.8 · `eureka-seven`
71. ○ **Mobile Suit Gundam: The Witch from Mercury** (2022) · Serie · AniList 7.8 · `gundam-witch-from-mercury`
72. ○ **Toradora!** (2008) · Serie · AniList 7.8 · `toradora`
73. ○ **Terror in Resonance** (2014) · Serie · AniList 7.8 · `terror-in-resonance`
74. ○ **Summer Wars** (2009) · Film · AniList 7.7 · `summer-wars`
75. ○ **The Boy and the Heron** (2023) · Film · AniList 7.7 · `the-boy-and-the-heron`
76. ○ **Clannad** (2007) · Serie · AniList 7.7 · `clannad`
77. ○ **ID: INVADED** (2020) · Serie · AniList 7.7 · `id-invaded`
78. ○ **Mobile Suit Gundam** (1979) · Serie · AniList 7.7 · `mobile-suit-gundam`
79. ○ **Ergo Proxy** (2006) · Serie · AniList 7.6 · `ergo-proxy`
80. ○ **Honey and Clover** (2005) · Serie · AniList 7.6 · `honey-and-clover`
81. ○ **Tokyo Ghoul** (2014) · Serie · AniList 7.6 · `tokyo-ghoul`
82. ○ **Komi Can’t Communicate** (2021) · Serie · AniList 7.6 · `komi-cant-communicate`
83. ○ **Paranoia Agent** (2004) · Serie · AniList 7.6 · `paranoia-agent`
84. ○ **Shiki** (2010) · Serie · AniList 7.5 · `shiki`
85. ○ **When They Cry** (2006) · Serie · AniList 7.5 · `higurashi`
86. ○ **Dark Gathering** (2023) · Serie · AniList 7.5 · `dark-gathering`
87. ○ **5 Centimeters per Second** (2007) · Film · AniList 7.2 · `5-centimeters-per-second`
88. ○ **Another** (2012) · Serie · AniList 7.1 · `another`
89. ○ **UFO Robo Grendizer** (1975) · Serie · AniList 7.1 · `ufo-robot-grendizer`
90. ○ **Mazinger Z** (1972) · Serie · AniList 6.8 · `mazinger-z`
91. ○ **Great Mazinger** (1974) · Serie · AniList 6.8 · `great-mazinger`
92. ○ **Getter Robo** (1974) · Serie · AniList 6.4 · `getter-robo`
93. ○ **Future Robot Daltanious** (1979) · Serie · AniList 6.4 · `daltanious`

## 7. Controllo automatico

- **Titoli in NESSUN genere né percorso** (solo ricerca/Esplora): 1
  - ○ **The Apothecary Diaries** (2023) · Serie · AniList 8.8 · `the-apothecary-diaries`
- **Titoli in 4+ categorie** (molto trasversali): 27
  - Berserk → in 7 categorie `berserk`
  - Vinland Saga → in 7 categorie `vinland-saga`
  - Steins;Gate → in 6 categorie `steins-gate`
  - 91 Days → in 6 categorie `91-days`
  - Akudama Drive → in 6 categorie `akudama-drive`
  - Cowboy Bebop → in 6 categorie `cowboy-bebop`
  - Monster → in 6 categorie `monster`
  - Cyberpunk: Edgerunners → in 5 categorie `cyberpunk-edgerunners`
  - Death Note → in 5 categorie `death-note`
  - Fullmetal Alchemist: Brotherhood → in 5 categorie `fullmetal-alchemist-brotherhood`
  - Gurren Lagann → in 5 categorie `gurren-lagann`
  - Hunter x Hunter (2011) → in 5 categorie `hunter-x-hunter`
  - Neon Genesis Evangelion → in 5 categorie `neon-genesis-evangelion`
  - Code Geass: Lelouch of the Rebellion → in 5 categorie `code-geass`
  - DAN DA DAN → in 5 categorie `dan-da-dan`
- **Generi con meno di 5 titoli**: supereroi (4)
- **Titoli senza scheda editoriale (hook)**: nessuno ✓
- **Titoli senza copertina**: nessuno ✓

*Generato il 2026-06-16 — 190 titoli, 18 generi, 6 percorsi.*
