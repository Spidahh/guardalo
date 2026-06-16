# INVENTARIO GUARDALO — il database del sito

> Documento **rigenerato** da `tools/inventario.mjs` (`npm run inventario`). NON modificarlo a mano:
> cambia i dati nei file sorgente (vedi §2) e rilancia il comando. Riflette sempre lo stato reale.

**Legenda:** ★ = top · ● = tuo (in lista, da `user-ranking.json`) · ○ = aggiunto da Claude (extra AniList).

## 1. Riepilogo

- **190 titoli** totali: **97 tuoi** ● + **93 aggiunti** ○
- **14 top** ★ · 94 con tuo voto
- **18 generi** (in griglia) · **6 percorsi** · 2 generi fuori griglia (slice-of-life, sport)
- Per formato: Serie: 149 · Film: 30 · ONA: 8 · OVA: 3
- Per stato: Concluso: 187 · In corso: 3
- Per durata: Corto: 77 · Medio: 49 · Cortissimo: 33 · Lungo: 20 · Lunghissimo: 11

## 2. Dove sta cosa (mappa dei file)

| Cosa | File | Si modifica a mano? |
|---|---|---|
| Fatti dei titoli (titolo, anno, generi, studio, durata, voto AniList, immagini…) | `sources/anime.json` | ❌ generato da AniList (`npm run fetch`) |
| **La tua lista**: quali sono tuoi, il tuo voto, il flag top | `editorial/user-ranking.json` | ✅ |
| Testi delle schede (hook, tono, "per chi è") | `editorial/titles.json` | ✅ |
| Dritte per la visione | `editorial/tips.json` | ✅ |
| **Percorsi** (titoli dentro ogni percorso) | `editorial/paths.json` | ✅ |
| **Appartenenza ai generi** (CAT_MEMBERS) | `js/app.js` | ✅ |
| Immagine hero di ogni genere/percorso (HERO_OF) | `js/app.js` | ✅ |
| Ordine/elenco generi in griglia (GENRE_IDS) e percorsi (PERCORSI_IDS) | `js/app.js` | ✅ |
| Dataset finale che il sito legge | `js/data.js` + `dist/data.json` | ❌ generato (`npm run gen`) |

Dopo aver toccato un file ✅: `npm run gen` (rigenera i dati) → bumpa `?v=` in `index.html` → `npm run inventario`.

## 3. Generi (18) — cosa c'è dentro

### Battle Shōnen  `battle-shonen`
*hero: JUJUTSU KAISEN* · 27 titoli — 25 tuoi ● / 2 aggiunti ○ / 7 top ★

1. ★● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
2. ★● **ONE PIECE** (1999) · Serie · tuo voto 10 · AniList 8.7 · `one-piece`
3. ★● **Naruto** (2002) · Serie · tuo voto 10 · AniList 8 · `naruto`
4. ★● **JoJo's Bizarre Adventure (TV)** (2012) · Serie · tuo voto 10 · AniList 7.7 · `jojo-s-bizarre-adventure`
5. ★● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
6. ★● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
7. ★● **Bleach** (2004) · Serie · tuo voto 9 · AniList 7.9 · `bleach`
8.  ● **JUJUTSU KAISEN** (2020) · Serie · tuo voto 9 · AniList 8.4 · `jujutsu-kaisen`
9.  ● **Mob Psycho 100** (2016) · Serie · tuo voto 9 · AniList 8.4 · `mob-psycho-100`
10.  ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
11.  ● **Solo Leveling** (2024) · Serie · tuo voto 9 · AniList 8.1 · `solo-leveling`
12.  ● **Hell’s Paradise** (2023) · Serie · tuo voto 9 · AniList 8 · `hell-s-paradise-jigokuraku`
13.  ● **Kill la Kill** (2013) · Serie · tuo voto 9 · AniList 7.9 · `kill-la-kill`
14.  ● **Dragon Ball** (1986) · Serie · tuo voto 9 · AniList 7.8 · `dragon-ball`
15.  ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
16.  ● **Gachiakuta** (2025) · Serie · tuo voto 8 · AniList 8.2 · `gachiakuta`
17.  ● **Kaiju No. 8** (2024) · Serie · tuo voto 8 · AniList 8.1 · `kaiju-no-8`
18.  ● **Black Clover** (2017) · Serie · tuo voto 8 · AniList 7.9 · `black-clover`
19.  ● **My Hero Academia** (2016) · Serie · tuo voto 8 · AniList 7.7 · `my-hero-academia`
20.  ● **Saint Seiya: Knights of the Zodiac** (1986) · Serie · tuo voto 8 · AniList 7.3 · `saint-seiya`
21.  ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
22.  ● **To Be Hero X** (2025) · ONA · tuo voto 7 · AniList 8.5 · `to-be-hero-x`
23.  ● **My Hero Academia: Vigilantes** (2025) · Serie · tuo voto 7 · AniList 7.6 · `my-hero-academia-vigilantes`
24.  ● **Tower of God** (2020) · Serie · tuo voto 7 · AniList 7.4 · `tower-of-god`
25.  ● **Darwin's Game** (2020) · Serie · tuo voto 7 · AniList 7 · `darwin-s-game`
26.  ○ **Yu Yu Hakusho: Ghostfiles** (1992) · Serie · AniList 8.3 · `yu-yu-hakusho`
27.  ○ **Dr. STONE** (2019) · Serie · AniList 8.1 · `dr-stone`

### Seinen e Roba Adulta  `seinen-e-maturo`
*hero: Monster* · 25 titoli — 22 tuoi ● / 3 aggiunti ○ / 3 top ★

1. ★● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
2. ★● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
3. ★● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
4.  ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
5.  ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
6.  ● **Samurai Champloo** (2004) · Serie · tuo voto 9 · AniList 8.4 · `samurai-champloo`
7.  ● **Kingdom** (2012) · Serie · tuo voto 9 · AniList 7.4 · `kingdom`
8.  ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
9.  ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
10.  ● **Chainsaw Man** (2022) · Serie · tuo voto 8 · AniList 8.3 · `chainsaw-man`
11.  ● **86 EIGHTY-SIX** (2021) · Serie · tuo voto 8 · AniList 8.3 · `86-eighty-six`
12.  ● **Trigun** (1998) · Serie · tuo voto 8 · AniList 8 · `trigun`
13.  ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
14.  ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
15.  ● **Devilman Crybaby** (2018) · ONA · tuo voto 8 · AniList 7.6 · `devilman-crybaby`
16.  ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
17.  ● **Wolf's Rain** (2003) · Serie · tuo voto 8 · AniList 7.4 · `wolf-s-rain`
18.  ● **Gantz** (2004) · Serie · tuo voto 8 · AniList 6.4 · `gantz`
19.  ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`
20.  ● **Death Parade** (2015) · Serie · tuo voto 7 · AniList 8 · `death-parade`
21.  ● **Tokyo Revengers** (2021) · Serie · tuo voto 7 · AniList 7.7 · `tokyo-revengers`
22.  ● **Deadman Wonderland** (2011) · Serie · tuo voto 7 · AniList 6.7 · `deadman-wonderland`
23.  ○ **Legend of the Galactic Heroes** (1988) · OVA · AniList 8.8 · `legend-of-the-galactic-heroes`
24.  ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`
25.  ○ **Dororo** (2019) · Serie · AniList 8.1 · `dororo`

### Isekai  `isekai`
*hero: Re:ZERO -Starting Life in Another World-* · 17 titoli — 17 tuoi ● / 0 aggiunti ○ / 0 top ★

1.  ● **Solo Leveling** (2024) · Serie · tuo voto 9 · AniList 8.1 · `solo-leveling`
2.  ● **Sentenced to Be a Hero** (2026) · Serie · tuo voto 9 · AniList 8.1 · `sentence-to-be-hero`
3.  ● **Shangri-La Frontier** (2023) · Serie · tuo voto 9 · AniList 8 · `shangri-la-frontier`
4.  ● **Grimgar of Fantasy and Ash** (2016) · Serie · tuo voto 9 · AniList 7.4 · `grimgar-of-fantasy-and-ash`
5.  ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
6.  ● **Overlord** (2015) · Serie · tuo voto 8 · AniList 7.7 · `overlord`
7.  ● **The Rising of the Shield Hero** (2019) · Serie · tuo voto 8 · AniList 7.7 · `the-rising-of-the-shield-hero`
8.  ● **Gate** (2015) · Serie · tuo voto 8 · AniList 7.4 · `gate`
9.  ● **Reincarnated as a Sword** (2022) · ONA · tuo voto 8 · AniList 7.4 · `reincarnated-as-a-sword`
10.  ● **Handyman Saitou in Another World** (2023) · Serie · tuo voto 8 · AniList 7.2 · `handyman-saitou-in-another-world`
11.  ● **Sword Art Online** (2012) · Serie · tuo voto 8 · AniList 7 · `sword-art-online`
12.  ● **Failure Frame: I Became the Strongest and Annihilated Everything with Low-Level Spells** (2024) · Serie · tuo voto 8 · AniList 6.3 · `failure-frame-i-became-the-strongest`
13.  ● **The Eminence in Shadow** (2022) · Serie · tuo voto 7 · AniList 8.1 · `the-eminence-in-shadow`
14.  ● **DRIFTERS** (2016) · Serie · tuo voto 7 · AniList 7.5 · `drifters`
15.  ● **The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat** (2021) · Serie · tuo voto 7 · AniList 7.2 · `the-world-s-finest-assassin-gets-reincarnated-in-another-world-as-an-aristocrat`
16.  ● **Release that Witch** (2026) · ONA · AniList 8 · `release-that-witch`
17.  ● **Petals of Reincarnation** (2026) · Serie · AniList 6 · `petals-of-reincarnation`

### Fantasy  `fantasy`
*hero: Frieren: Beyond Journey’s End* · 16 titoli — 16 tuoi ● / 0 aggiunti ○ / 3 top ★

1. ★● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
2. ★● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
3. ★● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
4.  ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
5.  ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
6.  ● **Ranking of Kings** (2021) · Serie · tuo voto 8 · AniList 8.3 · `ranking-of-kings`
7.  ● **Fate/Zero** (2011) · Serie · tuo voto 8 · AniList 8.1 · `fate-franchise-completo`
8.  ● **Black Clover** (2017) · Serie · tuo voto 8 · AniList 7.9 · `black-clover`
9.  ● **Devil May Cry** (2007) · Serie · tuo voto 8 · AniList 6.6 · `devil-may-cry`
10.  ● **Frieren: Beyond Journey’s End** (2023) · Serie · tuo voto 7 · AniList 9.1 · `frieren`
11.  ● **Wistoria: Wand and Sword** (2024) · Serie · tuo voto 7 · AniList 7.9 · `wistoria-wand-and-sword`
12.  ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`
13.  ● **Tower of God** (2020) · Serie · tuo voto 7 · AniList 7.4 · `tower-of-god`
14.  ● **BNA** (2020) · ONA · tuo voto 7 · AniList 7.2 · `bna-brand-new-animal`
15.  ● **BURN THE WITCH** (2020) · ONA · tuo voto 7 · AniList 7 · `burn-the-witch`
16.  ● **Daemons of the Shadow Realm** (2026) · Serie · AniList 7.8 · `daemons-of-the-shadow-realm`

### Fantascienza  `sci-fi`
*hero: Cyberpunk: Edgerunners* · 14 titoli — 14 tuoi ● / 0 aggiunti ○ / 2 top ★

1. ★● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
2. ★● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
3.  ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
4.  ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
5.  ● **Heavenly Delusion** (2023) · Serie · tuo voto 9 · AniList 8.1 · `heavenly-delusion`
6.  ● **Ghost in the Shell** (1995) · Film · tuo voto 9 · AniList 8 · `ghost-in-the-shell`
7.  ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
8.  ● **Parasyte -the maxim-** (2014) · Serie · tuo voto 8 · AniList 8.1 · `parasyte-the-maxim`
9.  ● **Trigun** (1998) · Serie · tuo voto 8 · AniList 8 · `trigun`
10.  ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
11.  ● **Wolf's Rain** (2003) · Serie · tuo voto 8 · AniList 7.4 · `wolf-s-rain`
12.  ● **LAZARUS** (2025) · Serie · tuo voto 8 · AniList 7 · `lazarus`
13.  ● **DECA-DENCE** (2020) · Serie · tuo voto 7 · AniList 7.1 · `deca-dence`
14.  ● **Terra Formars** (2014) · Serie · tuo voto 7 · AniList 6.5 · `terra-formars`

### Mecha  `mecha`
*hero: Neon Genesis Evangelion* · 7 titoli — 7 tuoi ● / 0 aggiunti ○ / 2 top ★

1. ★● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
2. ★● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
3.  ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
4.  ● **PLUTO** (2023) · ONA · tuo voto 8 · AniList 8.4 · `pluto`
5.  ● **86 EIGHTY-SIX** (2021) · Serie · tuo voto 8 · AniList 8.3 · `86-eighty-six`
6.  ● **FLCL** (2000) · OVA · tuo voto 8 · AniList 7.9 · `flcl`
7.  ● **Promare** (2019) · Film · tuo voto 8 · AniList 7.7 · `promare`

### Super Robot Classici  `super-robot`
*hero: Mazinger Z* · 6 titoli — 0 tuoi ● / 6 aggiunti ○ / 0 top ★

1.  ○ **Mobile Suit Gundam** (1979) · Serie · AniList 7.7 · `mobile-suit-gundam`
2.  ○ **UFO Robo Grendizer** (1975) · Serie · AniList 7.1 · `ufo-robot-grendizer`
3.  ○ **Mazinger Z** (1972) · Serie · AniList 6.8 · `mazinger-z`
4.  ○ **Great Mazinger** (1974) · Serie · AniList 6.8 · `great-mazinger`
5.  ○ **Getter Robo** (1974) · Serie · AniList 6.4 · `getter-robo`
6.  ○ **Future Robot Daltanious** (1979) · Serie · AniList 6.4 · `daltanious`

### Mindfuck  `mindfuck`
*hero: Death Note* · 21 titoli — 15 tuoi ● / 6 aggiunti ○ / 4 top ★

1. ★● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
2. ★● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
3. ★● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
4. ★● **Summer Time Rendering** (2022) · Serie · tuo voto 9 · AniList 8.3 · `summer-time-rendering`
5.  ● **Heavenly Delusion** (2023) · Serie · tuo voto 9 · AniList 8.1 · `heavenly-delusion`
6.  ● **The Future Diary** (2011) · Serie · tuo voto 9 · AniList 6.9 · `future-diary`
7.  ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
8.  ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
9.  ● **The Promised Neverland** (2019) · Serie · tuo voto 8 · AniList 8.4 · `the-promised-neverland`
10.  ● **PLUTO** (2023) · ONA · tuo voto 8 · AniList 8.4 · `pluto`
11.  ● **Parasyte -the maxim-** (2014) · Serie · tuo voto 8 · AniList 8.1 · `parasyte-the-maxim`
12.  ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
13.  ● **ERASED** (2016) · Serie · tuo voto 7 · AniList 8.1 · `erased`
14.  ● **Death Parade** (2015) · Serie · tuo voto 7 · AniList 8 · `death-parade`
15.  ● **AJIN: Demi-Human** (2016) · Serie · tuo voto 7 · AniList 7.1 · `ajin-demi-human`
16.  ○ **The Tatami Galaxy** (2010) · Serie · AniList 8.5 · `the-tatami-galaxy`
17.  ○ **Puella Magi Madoka Magica** (2011) · Serie · AniList 8.3 · `madoka-magica`
18.  ○ **Serial Experiments Lain** (1998) · Serie · AniList 8 · `serial-experiments-lain`
19.  ○ **Terror in Resonance** (2014) · Serie · AniList 7.8 · `terror-in-resonance`
20.  ○ **ID: INVADED** (2020) · Serie · AniList 7.7 · `id-invaded`
21.  ○ **Paranoia Agent** (2004) · Serie · AniList 7.6 · `paranoia-agent`

### Horror e Disagio  `horror-e-disagio`
*hero: Chainsaw Man* · 21 titoli — 16 tuoi ● / 5 aggiunti ○ / 2 top ★

1. ★● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
2. ★● **Summer Time Rendering** (2022) · Serie · tuo voto 9 · AniList 8.3 · `summer-time-rendering`
3.  ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
4.  ● **Hell’s Paradise** (2023) · Serie · tuo voto 9 · AniList 8 · `hell-s-paradise-jigokuraku`
5.  ● **The Future Diary** (2011) · Serie · tuo voto 9 · AniList 6.9 · `future-diary`
6.  ● **The Promised Neverland** (2019) · Serie · tuo voto 8 · AniList 8.4 · `the-promised-neverland`
7.  ● **Chainsaw Man** (2022) · Serie · tuo voto 8 · AniList 8.3 · `chainsaw-man`
8.  ● **Parasyte -the maxim-** (2014) · Serie · tuo voto 8 · AniList 8.1 · `parasyte-the-maxim`
9.  ● **Devilman Crybaby** (2018) · ONA · tuo voto 8 · AniList 7.6 · `devilman-crybaby`
10.  ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
11.  ● **Gantz** (2004) · Serie · tuo voto 8 · AniList 6.4 · `gantz`
12.  ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`
13.  ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`
14.  ● **AJIN: Demi-Human** (2016) · Serie · tuo voto 7 · AniList 7.1 · `ajin-demi-human`
15.  ● **Deadman Wonderland** (2011) · Serie · tuo voto 7 · AniList 6.7 · `deadman-wonderland`
16.  ● **Terra Formars** (2014) · Serie · tuo voto 7 · AniList 6.5 · `terra-formars`
17.  ○ **Tokyo Ghoul** (2014) · Serie · AniList 7.6 · `tokyo-ghoul`
18.  ○ **Dark Gathering** (2023) · Serie · AniList 7.5 · `dark-gathering`
19.  ○ **Shiki** (2010) · Serie · AniList 7.5 · `shiki`
20.  ○ **When They Cry** (2006) · Serie · AniList 7.5 · `higurashi`
21.  ○ **Another** (2012) · Serie · AniList 7.1 · `another`

### Sopravvivenza  `sopravvivenza`
*hero: The Promised Neverland* · 6 titoli — 6 tuoi ● / 0 aggiunti ○ / 0 top ★

1.  ● **The Future Diary** (2011) · Serie · tuo voto 9 · AniList 6.9 · `future-diary`
2.  ● **The Promised Neverland** (2019) · Serie · tuo voto 8 · AniList 8.4 · `the-promised-neverland`
3.  ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
4.  ● **Gantz** (2004) · Serie · tuo voto 8 · AniList 6.4 · `gantz`
5.  ● **Darwin's Game** (2020) · Serie · tuo voto 7 · AniList 7 · `darwin-s-game`
6.  ● **Deadman Wonderland** (2011) · Serie · tuo voto 7 · AniList 6.7 · `deadman-wonderland`

### Storico  `storici`
*hero: Vinland Saga* · 5 titoli — 5 tuoi ● / 0 aggiunti ○ / 0 top ★

1.  ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
2.  ● **Samurai Champloo** (2004) · Serie · tuo voto 9 · AniList 8.4 · `samurai-champloo`
3.  ● **Kingdom** (2012) · Serie · tuo voto 9 · AniList 7.4 · `kingdom`
4.  ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
5.  ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`

### Vendetta  `vendetta`
*hero: Berserk* · 6 titoli — 6 tuoi ● / 0 aggiunti ○ / 1 top ★

1. ★● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
2.  ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
3.  ● **Hell’s Paradise** (2023) · Serie · tuo voto 9 · AniList 8 · `hell-s-paradise-jigokuraku`
4.  ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
5.  ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
6.  ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`

### Viaggi nel Tempo  `viaggi-nel-tempo`
*hero: Steins;Gate* · 5 titoli — 5 tuoi ● / 0 aggiunti ○ / 2 top ★

1. ★● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
2. ★● **Summer Time Rendering** (2022) · Serie · tuo voto 9 · AniList 8.3 · `summer-time-rendering`
3.  ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
4.  ● **ERASED** (2016) · Serie · tuo voto 7 · AniList 8.1 · `erased`
5.  ● **Tokyo Revengers** (2021) · Serie · tuo voto 7 · AniList 7.7 · `tokyo-revengers`

### Crimine e Gangster  `crimine`
*hero: 91 Days* · 4 titoli — 4 tuoi ● / 0 aggiunti ○ / 0 top ★

1.  ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
2.  ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
3.  ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
4.  ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`

### Supereroi  `supereroi`
*hero: My Hero Academia* · 4 titoli — 4 tuoi ● / 0 aggiunti ○ / 0 top ★

1.  ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
2.  ● **My Hero Academia** (2016) · Serie · tuo voto 8 · AniList 7.7 · `my-hero-academia`
3.  ● **To Be Hero X** (2025) · ONA · tuo voto 7 · AniList 8.5 · `to-be-hero-x`
4.  ● **My Hero Academia: Vigilantes** (2025) · Serie · tuo voto 7 · AniList 7.6 · `my-hero-academia-vigilantes`

### Romance  `romance`
*hero: Sword Art Online* · 18 titoli — 4 tuoi ● / 14 aggiunti ○ / 0 top ★

1.  ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
2.  ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
3.  ● **Sword Art Online** (2012) · Serie · tuo voto 8 · AniList 7 · `sword-art-online`
4.  ● **Tokyo Revengers** (2021) · Serie · tuo voto 7 · AniList 7.7 · `tokyo-revengers`
5.  ○ **Clannad: After Story** (2008) · Serie · AniList 8.8 · `clannad-after-story`
6.  ○ **NANA** (2006) · Serie · AniList 8.5 · `nana`
7.  ○ **Your lie in April** (2014) · Serie · AniList 8.4 · `your-lie-in-april`
8.  ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`
9.  ○ **Kaguya-sama: Love is War** (2019) · Serie · AniList 8.3 · `kaguya-sama-love-is-war`
10.  ○ **Fruits Basket (2019)** (2019) · Serie · AniList 8.2 · `fruits-basket-2019`
11.  ○ **Maquia: When the Promised Flower Blooms** (2018) · Film · AniList 8.2 · `maquia`
12.  ○ **Horimiya** (2021) · Serie · AniList 8.1 · `horimiya`
13.  ○ **Rascal Does Not Dream of Bunny Girl Senpai** (2018) · Serie · AniList 8.1 · `bunny-girl-senpai`
14.  ○ **Skip and Loafer** (2023) · Serie · AniList 8.1 · `skip-and-loafer`
15.  ○ **My Dress-Up Darling** (2022) · Serie · AniList 8 · `my-dress-up-darling`
16.  ○ **Toradora!** (2008) · Serie · AniList 7.8 · `toradora`
17.  ○ **Clannad** (2007) · Serie · AniList 7.7 · `clannad`
18.  ○ **Honey and Clover** (2005) · Serie · AniList 7.6 · `honey-and-clover`

### Commedia  `commedia`
*hero: SPY x FAMILY* · 20 titoli — 9 tuoi ● / 11 aggiunti ○ / 0 top ★

1.  ● **Mob Psycho 100** (2016) · Serie · tuo voto 9 · AniList 8.4 · `mob-psycho-100`
2.  ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
3.  ● **Kill la Kill** (2013) · Serie · tuo voto 9 · AniList 7.9 · `kill-la-kill`
4.  ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
5.  ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
6.  ● **Handyman Saitou in Another World** (2023) · Serie · tuo voto 8 · AniList 7.2 · `handyman-saitou-in-another-world`
7.  ● **Magical Shopping Arcade Abenobashi** (2002) · Serie · tuo voto 8 · AniList 6.9 · `abenobashi-magical-shopping-street`
8.  ● **SPY x FAMILY** (2022) · Serie · tuo voto 7 · AniList 8.3 · `spy-x-family`
9.  ● **The Eminence in Shadow** (2022) · Serie · tuo voto 7 · AniList 8.1 · `the-eminence-in-shadow`
10.  ○ **Gintama** (2006) · Serie · AniList 8.5 · `gintama`
11.  ○ **GTO: Great Teacher Onizuka** (1999) · Serie · AniList 8.4 · `great-teacher-onizuka`
12.  ○ **Nichijou - My Ordinary Life** (2011) · Serie · AniList 8.3 · `nichijou`
13.  ○ **The Disastrous Life of Saiki K.** (2016) · Serie · AniList 8.3 · `saiki-k`
14.  ○ **Kaguya-sama: Love is War** (2019) · Serie · AniList 8.3 · `kaguya-sama-love-is-war`
15.  ○ **Grand Blue Dreaming** (2018) · Serie · AniList 8.2 · `grand-blue`
16.  ○ **HINAMATSURI** (2018) · Serie · AniList 8 · `hinamatsuri`
17.  ○ **Daily Lives of High School Boys** (2012) · Serie · AniList 8 · `daily-lives-of-high-school-boys`
18.  ○ **KONOSUBA -God's blessing on this wonderful world!** (2016) · Serie · AniList 7.9 · `konosuba`
19.  ○ **Asobi Asobase - workshop of fun -** (2018) · Serie · AniList 7.9 · `asobi-asobase`
20.  ○ **Komi Can’t Communicate** (2021) · Serie · AniList 7.6 · `komi-cant-communicate`

### Film d'Animazione  `cinema-dautore`
*hero: Akira* · 29 titoli — 5 tuoi ● / 24 aggiunti ○ / 0 top ★

1.  ● **Spirited Away** (2001) · Film · tuo voto 9 · AniList 8.6 · `la-citta-incantata`
2.  ● **Princess Mononoke** (1997) · Film · tuo voto 9 · AniList 8.5 · `principessa-mononoke`
3.  ● **Ghost in the Shell** (1995) · Film · tuo voto 9 · AniList 8 · `ghost-in-the-shell`
4.  ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
5.  ● **Promare** (2019) · Film · tuo voto 8 · AniList 7.7 · `promare`
6.  ○ **A Silent Voice** (2016) · Film · AniList 8.8 · `a-silent-voice`
7.  ○ **Your Name.** (2016) · Film · AniList 8.6 · `your-name`
8.  ○ **Howl‘s Moving Castle** (2004) · Film · AniList 8.5 · `howls-moving-castle`
9.  ○ **Perfect Blue** (1998) · Film · AniList 8.5 · `perfect-blue`
10.  ○ **Grave of the Fireflies** (1988) · Film · AniList 8.3 · `grave-of-the-fireflies`
11.  ○ **Wolf Children** (2012) · Film · AniList 8.3 · `wolf-children`
12.  ○ **My Neighbor Totoro** (1988) · Film · AniList 8.1 · `my-neighbor-totoro`
13.  ○ **Nausicaä of the Valley of the Wind** (1984) · Film · AniList 8.1 · `nausicaa`
14.  ○ **Kiki's Delivery Service** (1989) · Film · AniList 8.1 · `kikis-delivery-service`
15.  ○ **The Tale of The Princess Kaguya** (2013) · Film · AniList 8.1 · `the-tale-of-the-princess-kaguya`
16.  ○ **Whisper of the Heart** (1995) · Film · AniList 8.1 · `whisper-of-the-heart`
17.  ○ **Weathering With You** (2019) · Film · AniList 8.1 · `weathering-with-you`
18.  ○ **Millennium Actress** (2002) · Film · AniList 8.1 · `millennium-actress`
19.  ○ **Tokyo Godfathers** (2003) · Film · AniList 8.1 · `tokyo-godfathers`
20.  ○ **Redline** (2009) · Film · AniList 8.1 · `redline`
21.  ○ **Castle in the Sky** (1986) · Film · AniList 8 · `castle-in-the-sky`
22.  ○ **The Wind Rises** (2013) · Film · AniList 8 · `the-wind-rises`
23.  ○ **Ponyo** (2008) · Film · AniList 7.9 · `ponyo`
24.  ○ **Paprika** (2006) · Film · AniList 7.9 · `paprika`
25.  ○ **Porco Rosso** (1992) · Film · AniList 7.8 · `porco-rosso`
26.  ○ **The Girl Who Leapt Through Time** (2006) · Film · AniList 7.8 · `the-girl-who-leapt-through-time`
27.  ○ **The Boy and the Heron** (2023) · Film · AniList 7.7 · `the-boy-and-the-heron`
28.  ○ **Summer Wars** (2009) · Film · AniList 7.7 · `summer-wars`
29.  ○ **5 Centimeters per Second** (2007) · Film · AniList 7.2 · `5-centimeters-per-second`

## 4. Percorsi (6) — cosa c'è dentro

### Da Zero a Otaku  `da-zero-a-otaku`
*hero: Fullmetal Alchemist: Brotherhood* · 
19 titoli — 19 tuoi ● / 0 aggiunti ○ / 10 top ★

1. ★● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
2. ★● **ONE PIECE** (1999) · Serie · tuo voto 10 · AniList 8.7 · `one-piece`
3. ★● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
4. ★● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
5. ★● **Naruto** (2002) · Serie · tuo voto 10 · AniList 8 · `naruto`
6. ★● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
7. ★● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
8. ★● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
9. ★● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
10. ★● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
11.  ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
12.  ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
13.  ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
14.  ● **JUJUTSU KAISEN** (2020) · Serie · tuo voto 9 · AniList 8.4 · `jujutsu-kaisen`
15.  ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
16.  ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
17.  ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
18.  ● **Dragon Ball** (1986) · Serie · tuo voto 9 · AniList 7.8 · `dragon-ball`
19.  ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`

### Solo Capolavori  `capolavori`
*hero: Cowboy Bebop* · Le opere che non si discutono: i voti più alti e le pietre miliari. Se hai poco tempo e vu…
17 titoli — 15 tuoi ● / 2 aggiunti ○ / 10 top ★

1. ★● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
2. ★● **ONE PIECE** (1999) · Serie · tuo voto 10 · AniList 8.7 · `one-piece`
3. ★● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
4. ★● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
5. ★● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
6. ★● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
7. ★● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
8. ★● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
9. ★● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
10. ★● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
11.  ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
12.  ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
13.  ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
14.  ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
15.  ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
16.  ○ **Perfect Blue** (1998) · Film · AniList 8.5 · `perfect-blue`
17.  ○ **The Tatami Galaxy** (2010) · Serie · AniList 8.5 · `the-tatami-galaxy`

### Azione Adrenalinica  `azione`
*hero: Demon Slayer: Kimetsu no Yaiba* · Solo adrenalina: combattimenti spettacolari, ritmo serrato e animazione che lascia a bocca…
13 titoli — 13 tuoi ● / 0 aggiunti ○ / 3 top ★

1. ★● **JoJo's Bizarre Adventure (TV)** (2012) · Serie · tuo voto 10 · AniList 7.7 · `jojo-s-bizarre-adventure`
2. ★● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
3. ★● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
4.  ● **JUJUTSU KAISEN** (2020) · Serie · tuo voto 9 · AniList 8.4 · `jujutsu-kaisen`
5.  ● **Mob Psycho 100** (2016) · Serie · tuo voto 9 · AniList 8.4 · `mob-psycho-100`
6.  ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
7.  ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
8.  ● **Kill la Kill** (2013) · Serie · tuo voto 9 · AniList 7.9 · `kill-la-kill`
9.  ● **Chainsaw Man** (2022) · Serie · tuo voto 8 · AniList 8.3 · `chainsaw-man`
10.  ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
11.  ● **Kaiju No. 8** (2024) · Serie · tuo voto 8 · AniList 8.1 · `kaiju-no-8`
12.  ● **Promare** (2019) · Film · tuo voto 8 · AniList 7.7 · `promare`
13.  ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`

### Antieroi & Vendetta  `antieroi`
*hero: Code Geass: Lelouch of the Rebellion* · Protagonisti che non sono eroi: vendetta, ambiguità morale, mezzi discutibili per fini dis…
12 titoli — 11 tuoi ● / 1 aggiunti ○ / 2 top ★

1. ★● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
2. ★● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
3.  ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
4.  ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
5.  ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
6.  ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
7.  ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
8.  ● **Devilman Crybaby** (2018) · ONA · tuo voto 8 · AniList 7.6 · `devilman-crybaby`
9.  ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
10.  ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
11.  ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`
12.  ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`

### I Grandi Classici  `il-canone`
*hero: Ghost in the Shell* · 
22 titoli — 18 tuoi ● / 4 aggiunti ○ / 7 top ★

1. ★● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
2. ★● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
3. ★● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
4. ★● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
5. ★● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
6. ★● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
7. ★● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
8.  ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
9.  ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
10.  ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
11.  ● **Samurai Champloo** (2004) · Serie · tuo voto 9 · AniList 8.4 · `samurai-champloo`
12.  ● **Ghost in the Shell** (1995) · Film · tuo voto 9 · AniList 8 · `ghost-in-the-shell`
13.  ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
14.  ● **Dragon Ball** (1986) · Serie · tuo voto 9 · AniList 7.8 · `dragon-ball`
15.  ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
16.  ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
17.  ● **Trigun** (1998) · Serie · tuo voto 8 · AniList 8 · `trigun`
18.  ● **Frieren: Beyond Journey’s End** (2023) · Serie · tuo voto 7 · AniList 9.1 · `frieren`
19.  ○ **Legend of the Galactic Heroes** (1988) · OVA · AniList 8.8 · `legend-of-the-galactic-heroes`
20.  ○ **Clannad: After Story** (2008) · Serie · AniList 8.8 · `clannad-after-story`
21.  ○ **Yu Yu Hakusho: Ghostfiles** (1992) · Serie · AniList 8.3 · `yu-yu-hakusho`
22.  ○ **Puella Magi Madoka Magica** (2011) · Serie · AniList 8.3 · `madoka-magica`

### Chicche Nascoste  `chicche-e-deep-cut`
*hero: Heavenly Delusion* · 
17 titoli — 12 tuoi ● / 5 aggiunti ○ / 0 top ★

1.  ● **Heavenly Delusion** (2023) · Serie · tuo voto 9 · AniList 8.1 · `heavenly-delusion`
2.  ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
3.  ● **FLCL** (2000) · OVA · tuo voto 8 · AniList 7.9 · `flcl`
4.  ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
5.  ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
6.  ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
7.  ● **Wolf's Rain** (2003) · Serie · tuo voto 8 · AniList 7.4 · `wolf-s-rain`
8.  ● **Magical Shopping Arcade Abenobashi** (2002) · Serie · tuo voto 8 · AniList 6.9 · `abenobashi-magical-shopping-street`
9.  ● **To Be Hero X** (2025) · ONA · tuo voto 7 · AniList 8.5 · `to-be-hero-x`
10.  ● **Death Parade** (2015) · Serie · tuo voto 7 · AniList 8 · `death-parade`
11.  ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`
12.  ● **DECA-DENCE** (2020) · Serie · tuo voto 7 · AniList 7.1 · `deca-dence`
13.  ○ **MUSHI-SHI** (2005) · Serie · AniList 8.5 · `mushishi`
14.  ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`
15.  ○ **Welcome to the N-H-K** (2006) · Serie · AniList 8.2 · `welcome-to-the-nhk`
16.  ○ **Dororo** (2019) · Serie · AniList 8.1 · `dororo`
17.  ○ **Planetes** (2003) · Serie · AniList 8 · `planetes`

## 5. Generi fuori griglia (raggiungibili solo da ricerca/URL)

### Slice of Life  `slice-of-life` — 5 titoli — 0 tuoi ● / 5 aggiunti ○ / 0 top ★
1.  ○ **Violet Evergarden** (2018) · Serie · AniList 8.5 · `violet-evergarden`
2.  ○ **MUSHI-SHI** (2005) · Serie · AniList 8.5 · `mushishi`
3.  ○ **March comes in like a lion** (2016) · Serie · AniList 8.3 · `march-comes-in-like-a-lion`
4.  ○ **Barakamon** (2014) · Serie · AniList 8.2 · `barakamon`
5.  ○ **Laid-Back Camp** (2018) · Serie · AniList 8.1 · `laid-back-camp`

### Sport  `sport` — 6 titoli — 0 tuoi ● / 6 aggiunti ○ / 0 top ★
1.  ○ **Hajime no Ippo: The Fighting!** (2000) · Serie · AniList 8.7 · `hajime-no-ippo`
2.  ○ **Ping Pong the Animation** (2014) · Serie · AniList 8.6 · `ping-pong-the-animation`
3.  ○ **HAIKYU!!** (2014) · Serie · AniList 8.4 · `haikyuu`
4.  ○ **Slam Dunk** (1993) · Serie · AniList 8.3 · `slam-dunk`
5.  ○ **Run with the Wind** (2018) · Serie · AniList 8.3 · `run-with-the-wind`
6.  ○ **BLUE LOCK** (2022) · Serie · AniList 8 · `blue-lock`

## 6. I tuoi titoli vs gli aggiunti

### ● I tuoi 97 (in lista, da user-ranking.json)
1. ★● **Fullmetal Alchemist: Brotherhood** (2009) · Serie · tuo voto 10 · AniList 9 · `fullmetal-alchemist-brotherhood`
2. ★● **ONE PIECE** (1999) · Serie · tuo voto 10 · AniList 8.7 · `one-piece`
3. ★● **Attack on Titan** (2013) · Serie · tuo voto 10 · AniList 8.5 · `attack-on-titan`
4. ★● **Berserk** (1997) · Serie · tuo voto 10 · AniList 8.4 · `berserk`
5. ★● **Naruto** (2002) · Serie · tuo voto 10 · AniList 8 · `naruto`
6. ★● **JoJo's Bizarre Adventure (TV)** (2012) · Serie · tuo voto 10 · AniList 7.7 · `jojo-s-bizarre-adventure`
7. ★● **Hunter x Hunter (2011)** (2011) · Serie · tuo voto 9 · AniList 8.9 · `hunter-x-hunter`
8. ★● **Steins;Gate** (2011) · Serie · tuo voto 9 · AniList 8.9 · `steins-gate`
9. ★● **Cyberpunk: Edgerunners** (2022) · ONA · tuo voto 9 · AniList 8.5 · `cyberpunk-edgerunners`
10. ★● **Gurren Lagann** (2007) · Serie · tuo voto 9 · AniList 8.5 · `gurren-lagann`
11. ★● **Death Note** (2006) · Serie · tuo voto 9 · AniList 8.4 · `death-note`
12. ★● **Neon Genesis Evangelion** (1995) · Serie · tuo voto 9 · AniList 8.3 · `neon-genesis-evangelion`
13. ★● **Summer Time Rendering** (2022) · Serie · tuo voto 9 · AniList 8.3 · `summer-time-rendering`
14. ★● **Bleach** (2004) · Serie · tuo voto 9 · AniList 7.9 · `bleach`
15.  ● **Vinland Saga** (2019) · Serie · tuo voto 9 · AniList 8.7 · `vinland-saga`
16.  ● **Cowboy Bebop** (1998) · Serie · tuo voto 9 · AniList 8.6 · `cowboy-bebop`
17.  ● **Spirited Away** (2001) · Film · tuo voto 9 · AniList 8.6 · `la-citta-incantata`
18.  ● **Made in Abyss** (2017) · Serie · tuo voto 9 · AniList 8.5 · `made-in-abyss`
19.  ● **Princess Mononoke** (1997) · Film · tuo voto 9 · AniList 8.5 · `principessa-mononoke`
20.  ● **JUJUTSU KAISEN** (2020) · Serie · tuo voto 9 · AniList 8.4 · `jujutsu-kaisen`
21.  ● **Mob Psycho 100** (2016) · Serie · tuo voto 9 · AniList 8.4 · `mob-psycho-100`
22.  ● **Samurai Champloo** (2004) · Serie · tuo voto 9 · AniList 8.4 · `samurai-champloo`
23.  ● **DAN DA DAN** (2024) · Serie · tuo voto 9 · AniList 8.3 · `dan-da-dan`
24.  ● **Demon Slayer: Kimetsu no Yaiba** (2019) · Serie · tuo voto 9 · AniList 8.3 · `demon-slayer`
25.  ● **Heavenly Delusion** (2023) · Serie · tuo voto 9 · AniList 8.1 · `heavenly-delusion`
26.  ● **Solo Leveling** (2024) · Serie · tuo voto 9 · AniList 8.1 · `solo-leveling`
27.  ● **Sentenced to Be a Hero** (2026) · Serie · tuo voto 9 · AniList 8.1 · `sentence-to-be-hero`
28.  ● **Ghost in the Shell** (1995) · Film · tuo voto 9 · AniList 8 · `ghost-in-the-shell`
29.  ● **Hell’s Paradise** (2023) · Serie · tuo voto 9 · AniList 8 · `hell-s-paradise-jigokuraku`
30.  ● **Shangri-La Frontier** (2023) · Serie · tuo voto 9 · AniList 8 · `shangri-la-frontier`
31.  ● **Akira** (1988) · Film · tuo voto 9 · AniList 7.9 · `akira`
32.  ● **Kill la Kill** (2013) · Serie · tuo voto 9 · AniList 7.9 · `kill-la-kill`
33.  ● **Dragon Ball** (1986) · Serie · tuo voto 9 · AniList 7.8 · `dragon-ball`
34.  ● **Grimgar of Fantasy and Ash** (2016) · Serie · tuo voto 9 · AniList 7.4 · `grimgar-of-fantasy-and-ash`
35.  ● **Kingdom** (2012) · Serie · tuo voto 9 · AniList 7.4 · `kingdom`
36.  ● **GANGSTA.** (2015) · Serie · tuo voto 9 · AniList 7.1 · `gangsta`
37.  ● **The Future Diary** (2011) · Serie · tuo voto 9 · AniList 6.9 · `future-diary`
38.  ● **Monster** (2004) · Serie · tuo voto 8 · AniList 8.8 · `monster`
39.  ● **Code Geass: Lelouch of the Rebellion** (2006) · Serie · tuo voto 8 · AniList 8.5 · `code-geass`
40.  ● **PLUTO** (2023) · ONA · tuo voto 8 · AniList 8.4 · `pluto`
41.  ● **The Promised Neverland** (2019) · Serie · tuo voto 8 · AniList 8.4 · `the-promised-neverland`
42.  ● **Chainsaw Man** (2022) · Serie · tuo voto 8 · AniList 8.3 · `chainsaw-man`
43.  ● **86 EIGHTY-SIX** (2021) · Serie · tuo voto 8 · AniList 8.3 · `86-eighty-six`
44.  ● **One-Punch Man** (2015) · Serie · tuo voto 8 · AniList 8.3 · `one-punch-man`
45.  ● **Ranking of Kings** (2021) · Serie · tuo voto 8 · AniList 8.3 · `ranking-of-kings`
46.  ● **Gachiakuta** (2025) · Serie · tuo voto 8 · AniList 8.2 · `gachiakuta`
47.  ● **Kaiju No. 8** (2024) · Serie · tuo voto 8 · AniList 8.1 · `kaiju-no-8`
48.  ● **Parasyte -the maxim-** (2014) · Serie · tuo voto 8 · AniList 8.1 · `parasyte-the-maxim`
49.  ● **Re:ZERO -Starting Life in Another World-** (2016) · Serie · tuo voto 8 · AniList 8.1 · `re-zero-starting-life-in-another-world`
50.  ● **Fate/Zero** (2011) · Serie · tuo voto 8 · AniList 8.1 · `fate-franchise-completo`
51.  ● **Trigun** (1998) · Serie · tuo voto 8 · AniList 8 · `trigun`
52.  ● **Black Clover** (2017) · Serie · tuo voto 8 · AniList 7.9 · `black-clover`
53.  ● **FLCL** (2000) · OVA · tuo voto 8 · AniList 7.9 · `flcl`
54.  ● **Golden Kamuy** (2018) · Serie · tuo voto 8 · AniList 7.7 · `golden-kamuy`
55.  ● **My Hero Academia** (2016) · Serie · tuo voto 8 · AniList 7.7 · `my-hero-academia`
56.  ● **Overlord** (2015) · Serie · tuo voto 8 · AniList 7.7 · `overlord`
57.  ● **Promare** (2019) · Film · tuo voto 8 · AniList 7.7 · `promare`
58.  ● **The Rising of the Shield Hero** (2019) · Serie · tuo voto 8 · AniList 7.7 · `the-rising-of-the-shield-hero`
59.  ● **91 Days** (2016) · Serie · tuo voto 8 · AniList 7.6 · `91-days`
60.  ● **Devilman Crybaby** (2018) · ONA · tuo voto 8 · AniList 7.6 · `devilman-crybaby`
61.  ● **Akudama Drive** (2020) · Serie · tuo voto 8 · AniList 7.5 · `akudama-drive`
62.  ● **Gate** (2015) · Serie · tuo voto 8 · AniList 7.4 · `gate`
63.  ● **Reincarnated as a Sword** (2022) · ONA · tuo voto 8 · AniList 7.4 · `reincarnated-as-a-sword`
64.  ● **Wolf's Rain** (2003) · Serie · tuo voto 8 · AniList 7.4 · `wolf-s-rain`
65.  ● **Akame ga Kill!** (2014) · Serie · tuo voto 8 · AniList 7.3 · `akame-ga-kill`
66.  ● **Saint Seiya: Knights of the Zodiac** (1986) · Serie · tuo voto 8 · AniList 7.3 · `saint-seiya`
67.  ● **Handyman Saitou in Another World** (2023) · Serie · tuo voto 8 · AniList 7.2 · `handyman-saitou-in-another-world`
68.  ● **LAZARUS** (2025) · Serie · tuo voto 8 · AniList 7 · `lazarus`
69.  ● **Sword Art Online** (2012) · Serie · tuo voto 8 · AniList 7 · `sword-art-online`
70.  ● **Magical Shopping Arcade Abenobashi** (2002) · Serie · tuo voto 8 · AniList 6.9 · `abenobashi-magical-shopping-street`
71.  ● **Devil May Cry** (2007) · Serie · tuo voto 8 · AniList 6.6 · `devil-may-cry`
72.  ● **Gantz** (2004) · Serie · tuo voto 8 · AniList 6.4 · `gantz`
73.  ● **Failure Frame: I Became the Strongest and Annihilated Everything with Low-Level Spells** (2024) · Serie · tuo voto 8 · AniList 6.3 · `failure-frame-i-became-the-strongest`
74.  ● **Frieren: Beyond Journey’s End** (2023) · Serie · tuo voto 7 · AniList 9.1 · `frieren`
75.  ● **To Be Hero X** (2025) · ONA · tuo voto 7 · AniList 8.5 · `to-be-hero-x`
76.  ● **SPY x FAMILY** (2022) · Serie · tuo voto 7 · AniList 8.3 · `spy-x-family`
77.  ● **ERASED** (2016) · Serie · tuo voto 7 · AniList 8.1 · `erased`
78.  ● **Hellsing Ultimate** (2006) · OVA · tuo voto 7 · AniList 8.1 · `hellsing-ultimate`
79.  ● **The Eminence in Shadow** (2022) · Serie · tuo voto 7 · AniList 8.1 · `the-eminence-in-shadow`
80.  ● **Death Parade** (2015) · Serie · tuo voto 7 · AniList 8 · `death-parade`
81.  ● **Wistoria: Wand and Sword** (2024) · Serie · tuo voto 7 · AniList 7.9 · `wistoria-wand-and-sword`
82.  ● **Tokyo Revengers** (2021) · Serie · tuo voto 7 · AniList 7.7 · `tokyo-revengers`
83.  ● **My Hero Academia: Vigilantes** (2025) · Serie · tuo voto 7 · AniList 7.6 · `my-hero-academia-vigilantes`
84.  ● **DRIFTERS** (2016) · Serie · tuo voto 7 · AniList 7.5 · `drifters`
85.  ● **Claymore** (2007) · Serie · tuo voto 7 · AniList 7.4 · `claymore`
86.  ● **Tower of God** (2020) · Serie · tuo voto 7 · AniList 7.4 · `tower-of-god`
87.  ● **BNA** (2020) · ONA · tuo voto 7 · AniList 7.2 · `bna-brand-new-animal`
88.  ● **The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat** (2021) · Serie · tuo voto 7 · AniList 7.2 · `the-world-s-finest-assassin-gets-reincarnated-in-another-world-as-an-aristocrat`
89.  ● **AJIN: Demi-Human** (2016) · Serie · tuo voto 7 · AniList 7.1 · `ajin-demi-human`
90.  ● **DECA-DENCE** (2020) · Serie · tuo voto 7 · AniList 7.1 · `deca-dence`
91.  ● **BURN THE WITCH** (2020) · ONA · tuo voto 7 · AniList 7 · `burn-the-witch`
92.  ● **Darwin's Game** (2020) · Serie · tuo voto 7 · AniList 7 · `darwin-s-game`
93.  ● **Deadman Wonderland** (2011) · Serie · tuo voto 7 · AniList 6.7 · `deadman-wonderland`
94.  ● **Terra Formars** (2014) · Serie · tuo voto 7 · AniList 6.5 · `terra-formars`
95.  ● **Release that Witch** (2026) · ONA · AniList 8 · `release-that-witch`
96.  ● **Daemons of the Shadow Realm** (2026) · Serie · AniList 7.8 · `daemons-of-the-shadow-realm`
97.  ● **Petals of Reincarnation** (2026) · Serie · AniList 6 · `petals-of-reincarnation`

### ○ Gli 93 aggiunti da Claude (extra AniList ≥8.0, non in lista)
1.  ○ **A Silent Voice** (2016) · Film · AniList 8.8 · `a-silent-voice`
2.  ○ **Clannad: After Story** (2008) · Serie · AniList 8.8 · `clannad-after-story`
3.  ○ **Legend of the Galactic Heroes** (1988) · OVA · AniList 8.8 · `legend-of-the-galactic-heroes`
4.  ○ **The Apothecary Diaries** (2023) · Serie · AniList 8.8 · `the-apothecary-diaries`
5.  ○ **Hajime no Ippo: The Fighting!** (2000) · Serie · AniList 8.7 · `hajime-no-ippo`
6.  ○ **Your Name.** (2016) · Film · AniList 8.6 · `your-name`
7.  ○ **Ping Pong the Animation** (2014) · Serie · AniList 8.6 · `ping-pong-the-animation`
8.  ○ **Violet Evergarden** (2018) · Serie · AniList 8.5 · `violet-evergarden`
9.  ○ **MUSHI-SHI** (2005) · Serie · AniList 8.5 · `mushishi`
10.  ○ **NANA** (2006) · Serie · AniList 8.5 · `nana`
11.  ○ **Gintama** (2006) · Serie · AniList 8.5 · `gintama`
12.  ○ **Perfect Blue** (1998) · Film · AniList 8.5 · `perfect-blue`
13.  ○ **Delicious in Dungeon** (2024) · Serie · AniList 8.5 · `dungeon-meshi`
14.  ○ **Howl‘s Moving Castle** (2004) · Film · AniList 8.5 · `howls-moving-castle`
15.  ○ **The Tatami Galaxy** (2010) · Serie · AniList 8.5 · `the-tatami-galaxy`
16.  ○ **Your lie in April** (2014) · Serie · AniList 8.4 · `your-lie-in-april`
17.  ○ **HAIKYU!!** (2014) · Serie · AniList 8.4 · `haikyuu`
18.  ○ **GTO: Great Teacher Onizuka** (1999) · Serie · AniList 8.4 · `great-teacher-onizuka`
19.  ○ **BANANA FISH** (2018) · Serie · AniList 8.4 · `banana-fish`
20.  ○ **March comes in like a lion** (2016) · Serie · AniList 8.3 · `march-comes-in-like-a-lion`
21.  ○ **Kaguya-sama: Love is War** (2019) · Serie · AniList 8.3 · `kaguya-sama-love-is-war`
22.  ○ **Slam Dunk** (1993) · Serie · AniList 8.3 · `slam-dunk`
23.  ○ **Run with the Wind** (2018) · Serie · AniList 8.3 · `run-with-the-wind`
24.  ○ **Nichijou - My Ordinary Life** (2011) · Serie · AniList 8.3 · `nichijou`
25.  ○ **The Disastrous Life of Saiki K.** (2016) · Serie · AniList 8.3 · `saiki-k`
26.  ○ **Puella Magi Madoka Magica** (2011) · Serie · AniList 8.3 · `madoka-magica`
27.  ○ **Yu Yu Hakusho: Ghostfiles** (1992) · Serie · AniList 8.3 · `yu-yu-hakusho`
28.  ○ **Wolf Children** (2012) · Film · AniList 8.3 · `wolf-children`
29.  ○ **Grave of the Fireflies** (1988) · Film · AniList 8.3 · `grave-of-the-fireflies`
30.  ○ **Barakamon** (2014) · Serie · AniList 8.2 · `barakamon`
31.  ○ **Fruits Basket (2019)** (2019) · Serie · AniList 8.2 · `fruits-basket-2019`
32.  ○ **Maquia: When the Promised Flower Blooms** (2018) · Film · AniList 8.2 · `maquia`
33.  ○ **Grand Blue Dreaming** (2018) · Serie · AniList 8.2 · `grand-blue`
34.  ○ **Welcome to the N-H-K** (2006) · Serie · AniList 8.2 · `welcome-to-the-nhk`
35.  ○ **Mushoku Tensei: Jobless Reincarnation** (2021) · Serie · AniList 8.2 · `mushoku-tensei`
36.  ○ **Vivy -Fluorite Eye's Song-** (2021) · Serie · AniList 8.2 · `vivy-fluorite-eyes-song`
37.  ○ **Laid-Back Camp** (2018) · Serie · AniList 8.1 · `laid-back-camp`
38.  ○ **Horimiya** (2021) · Serie · AniList 8.1 · `horimiya`
39.  ○ **Rascal Does Not Dream of Bunny Girl Senpai** (2018) · Serie · AniList 8.1 · `bunny-girl-senpai`
40.  ○ **PSYCHO-PASS** (2012) · Serie · AniList 8.1 · `psycho-pass`
41.  ○ **Dr. STONE** (2019) · Serie · AniList 8.1 · `dr-stone`
42.  ○ **Dororo** (2019) · Serie · AniList 8.1 · `dororo`
43.  ○ **Weathering With You** (2019) · Film · AniList 8.1 · `weathering-with-you`
44.  ○ **Millennium Actress** (2002) · Film · AniList 8.1 · `millennium-actress`
45.  ○ **Tokyo Godfathers** (2003) · Film · AniList 8.1 · `tokyo-godfathers`
46.  ○ **My Neighbor Totoro** (1988) · Film · AniList 8.1 · `my-neighbor-totoro`
47.  ○ **Nausicaä of the Valley of the Wind** (1984) · Film · AniList 8.1 · `nausicaa`
48.  ○ **Redline** (2009) · Film · AniList 8.1 · `redline`
49.  ○ **Kiki's Delivery Service** (1989) · Film · AniList 8.1 · `kikis-delivery-service`
50.  ○ **The Tale of The Princess Kaguya** (2013) · Film · AniList 8.1 · `the-tale-of-the-princess-kaguya`
51.  ○ **Whisper of the Heart** (1995) · Film · AniList 8.1 · `whisper-of-the-heart`
52.  ○ **Skip and Loafer** (2023) · Serie · AniList 8.1 · `skip-and-loafer`
53.  ○ **BLUE LOCK** (2022) · Serie · AniList 8 · `blue-lock`
54.  ○ **Daily Lives of High School Boys** (2012) · Serie · AniList 8 · `daily-lives-of-high-school-boys`
55.  ○ **HINAMATSURI** (2018) · Serie · AniList 8 · `hinamatsuri`
56.  ○ **Planetes** (2003) · Serie · AniList 8 · `planetes`
57.  ○ **Serial Experiments Lain** (1998) · Serie · AniList 8 · `serial-experiments-lain`
58.  ○ **That Time I Got Reincarnated as a Slime** (2018) · Serie · AniList 8 · `tensura`
59.  ○ **Castle in the Sky** (1986) · Film · AniList 8 · `castle-in-the-sky`
60.  ○ **The Wind Rises** (2013) · Film · AniList 8 · `the-wind-rises`
61.  ○ **From the New World** (2012) · Serie · AniList 8 · `from-the-new-world`
62.  ○ **My Dress-Up Darling** (2022) · Serie · AniList 8 · `my-dress-up-darling`
63.  ○ **Paprika** (2006) · Film · AniList 7.9 · `paprika`
64.  ○ **Ponyo** (2008) · Film · AniList 7.9 · `ponyo`
65.  ○ **KONOSUBA -God's blessing on this wonderful world!** (2016) · Serie · AniList 7.9 · `konosuba`
66.  ○ **Asobi Asobase - workshop of fun -** (2018) · Serie · AniList 7.9 · `asobi-asobase`
67.  ○ **The Girl Who Leapt Through Time** (2006) · Film · AniList 7.8 · `the-girl-who-leapt-through-time`
68.  ○ **Porco Rosso** (1992) · Film · AniList 7.8 · `porco-rosso`
69.  ○ **Mobile Suit GUNDAM Iron Blooded Orphans** (2015) · Serie · AniList 7.8 · `gundam-iron-blooded-orphans`
70.  ○ **Eureka Seven** (2005) · Serie · AniList 7.8 · `eureka-seven`
71.  ○ **Mobile Suit Gundam: The Witch from Mercury** (2022) · Serie · AniList 7.8 · `gundam-witch-from-mercury`
72.  ○ **Toradora!** (2008) · Serie · AniList 7.8 · `toradora`
73.  ○ **Terror in Resonance** (2014) · Serie · AniList 7.8 · `terror-in-resonance`
74.  ○ **Summer Wars** (2009) · Film · AniList 7.7 · `summer-wars`
75.  ○ **The Boy and the Heron** (2023) · Film · AniList 7.7 · `the-boy-and-the-heron`
76.  ○ **Clannad** (2007) · Serie · AniList 7.7 · `clannad`
77.  ○ **ID: INVADED** (2020) · Serie · AniList 7.7 · `id-invaded`
78.  ○ **Mobile Suit Gundam** (1979) · Serie · AniList 7.7 · `mobile-suit-gundam`
79.  ○ **Ergo Proxy** (2006) · Serie · AniList 7.6 · `ergo-proxy`
80.  ○ **Honey and Clover** (2005) · Serie · AniList 7.6 · `honey-and-clover`
81.  ○ **Tokyo Ghoul** (2014) · Serie · AniList 7.6 · `tokyo-ghoul`
82.  ○ **Komi Can’t Communicate** (2021) · Serie · AniList 7.6 · `komi-cant-communicate`
83.  ○ **Paranoia Agent** (2004) · Serie · AniList 7.6 · `paranoia-agent`
84.  ○ **Shiki** (2010) · Serie · AniList 7.5 · `shiki`
85.  ○ **When They Cry** (2006) · Serie · AniList 7.5 · `higurashi`
86.  ○ **Dark Gathering** (2023) · Serie · AniList 7.5 · `dark-gathering`
87.  ○ **5 Centimeters per Second** (2007) · Film · AniList 7.2 · `5-centimeters-per-second`
88.  ○ **Another** (2012) · Serie · AniList 7.1 · `another`
89.  ○ **UFO Robo Grendizer** (1975) · Serie · AniList 7.1 · `ufo-robot-grendizer`
90.  ○ **Mazinger Z** (1972) · Serie · AniList 6.8 · `mazinger-z`
91.  ○ **Great Mazinger** (1974) · Serie · AniList 6.8 · `great-mazinger`
92.  ○ **Getter Robo** (1974) · Serie · AniList 6.4 · `getter-robo`
93.  ○ **Future Robot Daltanious** (1979) · Serie · AniList 6.4 · `daltanious`

## 7. Controllo automatico

- **Titoli in NESSUN genere né percorso** (solo ricerca/Esplora): 11
  -  ○ **The Apothecary Diaries** (2023) · Serie · AniList 8.8 · `the-apothecary-diaries`
  -  ○ **Delicious in Dungeon** (2024) · Serie · AniList 8.5 · `dungeon-meshi`
  -  ○ **Mushoku Tensei: Jobless Reincarnation** (2021) · Serie · AniList 8.2 · `mushoku-tensei`
  -  ○ **Vivy -Fluorite Eye's Song-** (2021) · Serie · AniList 8.2 · `vivy-fluorite-eyes-song`
  -  ○ **PSYCHO-PASS** (2012) · Serie · AniList 8.1 · `psycho-pass`
  -  ○ **That Time I Got Reincarnated as a Slime** (2018) · Serie · AniList 8 · `tensura`
  -  ○ **From the New World** (2012) · Serie · AniList 8 · `from-the-new-world`
  -  ○ **Mobile Suit GUNDAM Iron Blooded Orphans** (2015) · Serie · AniList 7.8 · `gundam-iron-blooded-orphans`
  -  ○ **Eureka Seven** (2005) · Serie · AniList 7.8 · `eureka-seven`
  -  ○ **Mobile Suit Gundam: The Witch from Mercury** (2022) · Serie · AniList 7.8 · `gundam-witch-from-mercury`
  -  ○ **Ergo Proxy** (2006) · Serie · AniList 7.6 · `ergo-proxy`
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
- **Generi con meno di 5 titoli**: crimine (4), supereroi (4)
- **Titoli senza scheda editoriale (hook)**: nessuno ✓
- **Titoli senza copertina**: nessuno ✓

*Generato il 2026-06-16 — 190 titoli, 18 generi, 6 percorsi.*
