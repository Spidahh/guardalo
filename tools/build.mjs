#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// GUARDALO — pipeline dati v10 (guida a livelli, solo anime)
//
//   node tools/build.mjs map     → cerca su AniList l'id di ogni titolo seed
//   node tools/build.mjs fetch   → scarica i dati reali + chiude le saghe + calcola lunghezze
//   node tools/build.mjs gen     → unisce fatti (sources/) + editoriale (editorial/) → js/data.js
//   node tools/build.mjs all     → map → fetch → gen
//   node tools/build.mjs report  → stampa statistiche su sources/anime.json
//
// REGOLA D'ORO: nessun dato inventato. I FATTI vengono solo da AniList (verificati,
// con provenienza). I TESTI editoriali (hook spoiler-free, percorsi) stanno in
// editorial/ e sono curatela umana, mai mescolata ai fatti.
//
// Fonte dati: AniList (https://anilist.co) — GraphQL, uso commerciale gratuito
// sotto i 150$/mese di ricavi. Attribuzione richiesta (mostrata nella UI).
// ─────────────────────────────────────────────────────────────────────────

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT        = join(dirname(fileURLToPath(import.meta.url)), '..');
const SEED_JSON   = join(ROOT, 'tools', 'seed-titles.json'); // lista curata (id, title, year)
const DATA_JSON   = join(ROOT, 'data.json');                 // legacy (fallback se manca il seed)
const MAP_JSON    = join(ROOT, 'tools', 'anilist-map.json');
const SRC_DIR     = join(ROOT, 'sources');
const SRC_JSON    = join(SRC_DIR, 'anime.json');
const EDIT_DIR    = join(ROOT, 'editorial');
const EDIT_TITLES = join(EDIT_DIR, 'titles.json');
const EDIT_PATHS  = join(EDIT_DIR, 'paths.json');
const EDIT_TIPS   = join(EDIT_DIR, 'tips.json');
const OUT_JS      = join(ROOT, 'js', 'data.js');
const OUT_JSON    = join(ROOT, 'dist', 'data.json');

const ANILIST = 'https://graphql.anilist.co';

// ── colori terminale ───────────────────────────────────────────────────────
const c = {
    ok:   s => `\x1b[32m${s}\x1b[0m`, warn: s => `\x1b[33m${s}\x1b[0m`,
    err:  s => `\x1b[31m${s}\x1b[0m`, dim:  s => `\x1b[2m${s}\x1b[0m`,
    bold: s => `\x1b[1m${s}\x1b[0m`,  cyan: s => `\x1b[36m${s}\x1b[0m`,
};

// ── correzioni manuali di mapping (slug → id AniList) ────────────────────────
// Verificate a mano: la ricerca auto sbagliava su titoli ambigui o tradotti.
const MANUAL_MAP = {
    'demon-slayer': 101922,          // ricerca prendeva "Onigiri"
    'future-diary': 10620,           // ricerca prendeva l'OVA "Ura Mirai Nikki"
    'fate-franchise-completo': 10087,// porta d'accesso: Fate/Zero (2011)
    'la-citta-incantata': 199,       // Spirited Away (titolo IT non trovato)
    'sentence-to-be-hero': 167152,   // Sentenced to Be a Hero (2026)
    'natsume-yuujinchou': 432,       // ricerca prendeva uno special collaborativo
};

// titoli da NON includere: animazione occidentale, non presente/affidabile su AniList.
// (Scelta "solo anime" del lancio — Arcane/Invincible torneranno con TVmaze in fase 2.)
const EXCLUDE = new Set(['invincible', 'arcane-league-of-legends']);

// ── tabelle di normalizzazione ──────────────────────────────────────────────
const FORMAT_LABEL = {
    TV: 'Serie', TV_SHORT: 'Serie', MOVIE: 'Film', OVA: 'OVA',
    ONA: 'ONA', SPECIAL: 'Special', MUSIC: 'Music',
};
const STATUS_LABEL = {
    FINISHED: 'Concluso', RELEASING: 'In corso', NOT_YET_RELEASED: 'Annunciato',
    CANCELLED: 'Cancellato', HIATUS: 'In pausa',
};
const SOURCE_LABEL = {
    MANGA: 'Manga', LIGHT_NOVEL: 'Light novel', VISUAL_NOVEL: 'Visual novel',
    ORIGINAL: 'Originale', WEB_NOVEL: 'Web novel', NOVEL: 'Romanzo',
    VIDEO_GAME: 'Videogioco', OTHER: 'Altro', DOUJINSHI: 'Doujinshi',
    ANIME: 'Anime', LIVE_ACTION: 'Live action', GAME: 'Gioco',
    MULTIMEDIA_PROJECT: 'Progetto multimediale', PICTURE_BOOK: 'Libro illustrato',
};

// formati che contano come "serie principale" per il calcolo della lunghezza-saga
const CORE_FORMATS = new Set(['TV', 'TV_SHORT', 'ONA']);
// durata media di fallback (min/ep) quando AniList non la fornisce
const DUR_FALLBACK = { TV: 24, TV_SHORT: 12, ONA: 24, OVA: 26, SPECIAL: 24, MOVIE: 100 };
// relazioni da seguire per ricostruire la timeline principale di una saga
const CHAIN_REL = new Set(['PREQUEL', 'SEQUEL']);

// ── fasce di lunghezza (minuti totali del nucleo della saga) ─────────────────
// La soglia bassa è pensata perché un film (90-180') resti "una sera".
const LENGTH_BANDS = [
    { band: 'cortissimo',  label: 'Cortissimo',  hint: 'una sera',        max: 180 },
    { band: 'corto',       label: 'Corto',       hint: 'un weekend',      max: 600 },
    { band: 'medio',       label: 'Medio',       hint: 'qualche settimana',max: 1500 },
    { band: 'lungo',       label: 'Lungo',       hint: 'un impegno serio',max: 4000 },
    { band: 'lunghissimo', label: 'Lunghissimo', hint: 'mesi',            max: Infinity },
];
function bandFor(minutes) {
    return LENGTH_BANDS.find(b => minutes <= b.max) || LENGTH_BANDS[LENGTH_BANDS.length - 1];
}

// ── utility ──────────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

function slug(s) {
    return s.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function norm(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, ' ').trim();
}
function stripHtml(s) {
    return (s || '')
        .replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
        .replace(/&#0?39;|&apos;/g, "'").replace(/&mdash;/g, '—')
        .replace(/\s+/g, ' ').trim();
}

// ── client AniList: throttle + backoff su 429 ────────────────────────────────
let lastCall = 0;
const MIN_INTERVAL = 2000;   // ms tra una richiesta e l'altra (~30/min, limite AniList)
async function gql(query, variables = {}, attempt = 0) {
    const wait = MIN_INTERVAL - (Date.now() - lastCall);
    if (wait > 0) await sleep(wait);
    lastCall = Date.now();
    let res;
    try {
        res = await fetch(ANILIST, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
    } catch (e) {
        if (attempt < 4) { await sleep(2000 * (attempt + 1)); return gql(query, variables, attempt + 1); }
        throw e;
    }
    if (res.status === 429) {
        const retry = parseInt(res.headers.get('retry-after') || '5', 10);
        console.log(c.warn(`  rate limit, attendo ${retry}s…`));
        await sleep((retry + 1) * 1000);
        return gql(query, variables, attempt);
    }
    if (res.status >= 500 && attempt < 4) {
        await sleep(2000 * (attempt + 1)); return gql(query, variables, attempt + 1);
    }
    const json = await res.json();
    if (json.errors) {
        // 404 di un singolo id non deve fermare tutto
        const only404 = json.errors.every(e => e.status === 404);
        if (only404 && json.data) return json.data;
        throw new Error(json.errors.map(e => e.message).join('; '));
    }
    return json.data;
}

// ── lettura seed ─────────────────────────────────────────────────────────────
async function loadSeed() {
    // sorgente preferita: tools/seed-titles.json (lista curata, solo anime, niente link).
    if (existsSync(SEED_JSON)) {
        const list = JSON.parse(await readFile(SEED_JSON, 'utf8'));
        return list.map(a => ({ id: a.id || slug(a.title), title: a.title, year: a.year }))
            .filter(a => !EXCLUDE.has(a.id));
    }
    // fallback legacy: data.json (vecchio catalogo, filtra solo anime)
    const list = JSON.parse(await readFile(DATA_JSON, 'utf8'));
    return list
        .filter(a => (a.category || 'animazione') === 'animazione')
        .map(a => ({ id: a.id || slug(a.title), title: a.title, year: a.year }))
        .filter(a => !EXCLUDE.has(a.id));
}

// ════════════════════════════════════════════════════════════════════════════
// COMANDO: map  — trova l'id AniList di ogni titolo
// ════════════════════════════════════════════════════════════════════════════
const SEARCH_Q = `
query ($search: String) {
  Page(perPage: 6) {
    media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
      id
      title { romaji english native }
      synonyms
      format
      episodes
      startDate { year }
    }
  }
}`;

function scoreCandidate(seed, m) {
    const target = norm(seed.title);
    const names = [m.title.romaji, m.title.english, m.title.native, ...(m.synonyms || [])]
        .filter(Boolean).map(norm);
    let best = 0;
    for (const n of names) {
        if (n === target) best = Math.max(best, 100);
        else if (n.startsWith(target) || target.startsWith(n)) best = Math.max(best, 80);
        else if (n.includes(target) || target.includes(n)) best = Math.max(best, 60);
    }
    // bonus vicinanza anno
    if (seed.year && m.startDate?.year) {
        const d = Math.abs(seed.year - m.startDate.year);
        if (d === 0) best += 8; else if (d <= 1) best += 4; else if (d > 4) best -= 4;
    }
    // bonus formato "principale"
    if (['TV', 'TV_SHORT', 'MOVIE'].includes(m.format)) best += 3;
    return best;
}

async function cmdMap() {
    const seed = await loadSeed();
    console.log(c.bold(`\nMapping ${seed.length} anime su AniList…\n`));
    const map = existsSync(MAP_JSON) ? JSON.parse(await readFile(MAP_JSON, 'utf8')) : {};
    EXCLUDE.forEach(id => { delete map[id]; });   // togli eventuali match errati
    let done = 0, ambiguous = 0;
    for (const s of seed) {
        if (MANUAL_MAP[s.id]) { map[s.id] = { anilistId: MANUAL_MAP[s.id], title: s.title, manual: true }; done++; continue; }
        if (map[s.id]?.anilistId && !process.argv.includes('--force')) { done++; continue; }
        try {
            const data = await gql(SEARCH_Q, { search: s.title });
            const cands = data.Page.media || [];
            if (!cands.length) { console.log(c.err(`  ✗ nessun risultato: ${s.title}`)); continue; }
            const scored = cands.map(m => ({ m, sc: scoreCandidate(s, m) })).sort((a, b) => b.sc - a.sc);
            const top = scored[0];
            map[s.id] = {
                anilistId: top.m.id,
                title: s.title,
                matched: top.m.title.english || top.m.title.romaji,
                score: top.sc,
            };
            const flag = top.sc < 60 ? c.warn(' ⚠ verifica') : (top.sc < 80 ? c.dim(' ~') : '');
            if (top.sc < 80) ambiguous++;
            console.log(`  ${c.ok('✓')} ${s.title} ${c.dim('→')} ${top.m.title.english || top.m.title.romaji} ${c.dim('#' + top.m.id)}${flag}`);
            done++;
        } catch (e) {
            console.log(c.err(`  ✗ errore ${s.title}: ${e.message}`));
        }
        await writeFile(MAP_JSON, JSON.stringify(map, null, 2) + '\n', 'utf8'); // salva incrementale
    }
    // riscrive sempre alla fine (le correzioni MANUAL/EXCLUDE non passano dal ramo di ricerca)
    await writeFile(MAP_JSON, JSON.stringify(map, null, 2) + '\n', 'utf8');
    console.log(c.bold(`\n${done}/${seed.length} mappati`) + (ambiguous ? c.warn(`  (${ambiguous} da verificare)`) : ''));
    console.log(c.dim(`Mappa salvata in tools/anilist-map.json — controlla i ⚠ e correggi in MANUAL_MAP se serve.\n`));
}

// ════════════════════════════════════════════════════════════════════════════
// COMANDO: fetch — scarica dati reali, chiude le saghe, calcola lunghezze
// ════════════════════════════════════════════════════════════════════════════
const MEDIA_FIELDS = `
  id idMal
  title { romaji english native }
  format status episodes duration seasonYear
  startDate { year }
  genres
  averageScore popularity source
  coverImage { extraLarge large color }
  bannerImage
  studios(isMain: true) { nodes { name } }
  tags { name rank isMediaSpoiler isGeneralSpoiler category }
  staff(perPage: 10, sort: RELEVANCE) { edges { role node { name { full } } } }
  relations { edges { relationType node { id type format episodes duration title { romaji english } startDate { year } } } }
  recommendations(perPage: 14, sort: RATING_DESC) { nodes { rating mediaRecommendation { id } } }
  externalLinks { site url type }`;

const BATCH_Q = `
query ($ids: [Int]) {
  Page(perPage: 50) { media(id_in: $ids, type: ANIME) { ${MEDIA_FIELDS} } }
}`;

async function fetchByIds(ids) {
    const out = [];
    for (let i = 0; i < ids.length; i += 50) {
        const chunk = ids.slice(i, i + 50);
        const data = await gql(BATCH_Q, { ids: chunk });
        out.push(...(data.Page.media || []));
        console.log(c.dim(`  …scaricati ${out.length}/${ids.length}`));
    }
    return out;
}

function durOf(node) {
    return node.duration || DUR_FALLBACK[node.format] || 24;
}

async function cmdFetch() {
    if (!existsSync(MAP_JSON)) { console.log(c.err('Manca tools/anilist-map.json — esegui prima:  node tools/build.mjs map')); process.exit(1); }
    const map = JSON.parse(await readFile(MAP_JSON, 'utf8'));
    const seedEntries = Object.entries(map).filter(([s, v]) => v.anilistId && !EXCLUDE.has(s));
    const seedIds = seedEntries.map(([, v]) => v.anilistId);
    const idToSlug = {};
    seedEntries.forEach(([s, v]) => { idToSlug[v.anilistId] = s; });

    console.log(c.bold(`\nScarico ${seedIds.length} titoli seed…`));
    const universe = new Map();           // anilistId → media
    let wave = await fetchByIds(seedIds);
    wave.forEach(m => universe.set(m.id, m));

    // ── chiusura della saga: seguo PREQUEL/SEQUEL tra serie (TV/ONA) ──────────
    console.log(c.bold(`Chiudo le saghe (timeline principale)…`));
    for (let hop = 0; hop < 6; hop++) {
        const need = new Set();
        for (const m of universe.values()) {
            for (const e of m.relations?.edges || []) {
                const n = e.node;
                if (CHAIN_REL.has(e.relationType) && n.type === 'ANIME'
                    && CORE_FORMATS.has(n.format) && !universe.has(n.id)) {
                    need.add(n.id);
                }
            }
        }
        if (!need.size || universe.size > 700) break;
        console.log(c.dim(`  hop ${hop + 1}: +${need.size} episodi di saga`));
        const more = await fetchByIds([...need]);
        more.forEach(m => universe.set(m.id, m));
    }

    // ── grafo della timeline principale (TV/ONA via prequel/sequel) ───────────
    const chainAdj = new Map();           // anilistId → Set(anilistId)
    const addEdge = (a, b) => {
        if (!chainAdj.has(a)) chainAdj.set(a, new Set());
        chainAdj.get(a).add(b);
    };
    for (const m of universe.values()) {
        if (!CORE_FORMATS.has(m.format)) continue;
        for (const e of m.relations?.edges || []) {
            const n = e.node;
            if (CHAIN_REL.has(e.relationType) && n.type === 'ANIME' && CORE_FORMATS.has(n.format) && universe.has(n.id)) {
                addEdge(m.id, n.id); addEdge(n.id, m.id);
            }
        }
    }
    function chainComponent(startId) {
        const seen = new Set([startId]); const stack = [startId];
        while (stack.length) {
            const cur = stack.pop();
            for (const nx of (chainAdj.get(cur) || [])) if (!seen.has(nx)) { seen.add(nx); stack.push(nx); }
        }
        return [...seen].map(id => universe.get(id)).filter(Boolean);
    }

    // ── costruisco i record finali per i soli titoli seed ────────────────────
    console.log(c.bold(`Normalizzo ${seedIds.length} record…`));
    const records = [];
    for (const [sl, v] of seedEntries) {
        const m = universe.get(v.anilistId);
        if (!m) { console.log(c.err(`  ✗ id ${v.anilistId} (${sl}) non trovato`)); continue; }

        // timeline principale della saga
        const chain = CORE_FORMATS.has(m.format) ? chainComponent(m.id) : [m];
        chain.sort((a, b) => (a.startDate?.year || 0) - (b.startDate?.year || 0) || a.id - b.id);
        const coreMinutes = chain.reduce((sum, e) => sum + (e.episodes || 1) * durOf(e), 0);
        const band = bandFor(coreMinutes);
        const totalEps = chain.reduce((s, e) => s + (e.episodes || 0), 0);

        // "da dove iniziare" = primo elemento della catena (più vecchio, senza prequel interno)
        const root = chain[0];
        const startFrom = chain.length > 1
            ? (root.title.english || root.title.romaji)
            : null;

        // struttura: tappe principali + extra (film/OVA collegati al seed)
        const structure = chain.map(e => ({
            name: e.title.english || e.title.romaji,
            episodes: e.format === 'MOVIE' ? 'Film' : `${e.episodes || '?'} ep`,
            year: e.startDate?.year || null,
            main: true,
        }));
        const extras = (m.relations?.edges || [])
            .filter(e => e.node.type === 'ANIME'
                && ['MOVIE', 'OVA', 'SPECIAL'].includes(e.node.format)
                && ['SIDE_STORY', 'PARENT', 'ALTERNATIVE', 'SUMMARY', 'SPIN_OFF'].includes(e.relationType))
            .map(e => ({
                name: e.node.title.english || e.node.title.romaji,
                episodes: e.node.format === 'MOVIE' ? 'Film' : `${e.node.format}`,
                year: e.node.startDate?.year || null, main: false,
            }));

        // staff: regista + autore originale
        const staff = m.staff?.edges || [];
        const findRole = (re) => staff.find(s => re.test(s.role))?.node?.name?.full || null;
        const NOT_DIR = /Sound|Art|Animation|Episode|Photography|Assistant|Mecha|Action/i;
        const director =
            staff.find(s => /^(Chief )?Director$/i.test(s.role))?.node?.name?.full ||
            staff.find(s => /Director/i.test(s.role) && !NOT_DIR.test(s.role))?.node?.name?.full ||
            null;
        const creator  = findRole(/Original Creator/i) || findRole(/Original Story/i) || findRole(/^Story$/i);

        // tag non-spoiler (temi/atmosfera)
        const tags = (m.tags || [])
            .filter(t => !t.isMediaSpoiler && !t.isGeneralSpoiler && t.rank >= 60 && t.category !== 'Cast')
            .sort((a, b) => b.rank - a.rank).slice(0, 8).map(t => t.name);

        // streaming legali ufficiali (da AniList externalLinks)
        const streaming = (m.externalLinks || [])
            .filter(l => l.type === 'STREAMING')
            .map(l => ({ name: l.site, url: l.url }));

        // id dei consigli AniList che sono ANCHE nel nostro catalogo (cross-link a gen)
        const recAnilistIds = (m.recommendations?.nodes || [])
            .filter(n => n.mediaRecommendation)
            .map(n => ({ id: n.mediaRecommendation.id, rating: n.rating }));
        // id di tutte le relazioni anime (per "stessa saga" a gen)
        const relAnilistIds = (m.relations?.edges || [])
            .filter(e => e.node.type === 'ANIME')
            .map(e => ({ id: e.node.id, rel: e.relationType }));

        records.push({
            id: sl,
            anilistId: m.id,
            idMal: m.idMal || null,
            title: m.title.english || m.title.romaji,
            titleRomaji: m.title.romaji,
            titleNative: m.title.native || null,
            year: m.seasonYear || m.startDate?.year || null,
            format: m.format,
            typeLabel: FORMAT_LABEL[m.format] || m.format,
            status: m.status,
            statusLabel: STATUS_LABEL[m.status] || m.status,
            episodes: m.episodes || null,
            durationAvg: m.duration || null,
            sagaEpisodes: totalEps || (m.episodes || null),
            coreMinutes,
            lengthBand: band.band,
            lengthLabel: band.label,
            lengthHint: band.hint,
            genres: m.genres || [],
            tags,
            studios: (m.studios?.nodes || []).map(s => s.name),
            director,
            creator,
            source: m.source || null,
            sourceLabel: SOURCE_LABEL[m.source] || null,
            score10: m.averageScore != null ? Math.round(m.averageScore) / 10 : null,
            popularity: m.popularity || 0,
            coverImage: m.coverImage?.extraLarge || m.coverImage?.large || null,
            coverColor: m.coverImage?.color || null,
            bannerImage: m.bannerImage || null,
            streaming,
            startFrom,
            structure: [...structure, ...extras],
            _recAnilistIds: recAnilistIds,
            _relAnilistIds: relAnilistIds,
            provenance: {
                source: 'AniList',
                anilistUrl: `https://anilist.co/anime/${m.id}`,
                durationEstimated: !m.duration,
                fetchedFields: ['title','episodes','duration','status','genres','studios','staff','score','coverImage','externalLinks','relations','recommendations'],
            },
        });
        process.stdout.write(c.dim('.'));
    }
    console.log('');

    await mkdir(SRC_DIR, { recursive: true });
    await writeFile(SRC_JSON, JSON.stringify(records, null, 2) + '\n', 'utf8');
    console.log(c.ok(`\n✓ sources/anime.json scritto (${records.length} titoli, universo saghe: ${universe.size})\n`));
}

// ════════════════════════════════════════════════════════════════════════════
// COMANDO: gen — merge fatti + editoriale → js/data.js  (+ dist/data.json)
// ════════════════════════════════════════════════════════════════════════════
async function cmdGen() {
    const records = JSON.parse(await readFile(SRC_JSON, 'utf8'));
    const titlesEd = existsSync(EDIT_TITLES) ? JSON.parse(await readFile(EDIT_TITLES, 'utf8')) : {};
    const paths    = existsSync(EDIT_PATHS)  ? JSON.parse(await readFile(EDIT_PATHS, 'utf8'))  : [];
    const tipsEd   = existsSync(EDIT_TIPS)   ? JSON.parse(await readFile(EDIT_TIPS, 'utf8'))   : {};

    // mappe di cross-link
    const byAnilist = new Map();         // anilistId → slug
    records.forEach(r => byAnilist.set(r.anilistId, r.id));
    const bySlug = new Map(records.map(r => [r.id, r]));

    const titles = records.map(r => {
        const ed = titlesEd[r.id] || {};

        // ── motore consigli (tutto verso titoli del nostro catalogo) ─────────
        const seen = new Set([r.id]);
        const pushUnique = (arr, slug, why) => {
            if (slug && bySlug.has(slug) && !seen.has(slug)) { seen.add(slug); arr.push({ id: slug, why }); }
        };

        // 1. "Se ti è piaciuto" — dai recommendations AniList, ordinati per rating
        const simili = [];
        r._recAnilistIds.sort((a, b) => b.rating - a.rating)
            .forEach(rec => pushUnique(simili, byAnilist.get(rec.id), 'Chi ha amato questo ha amato anche'));

        // 2. Stessa saga — dalle relazioni
        const saga = [];
        r._relAnilistIds.forEach(rel => {
            const s = byAnilist.get(rel.id);
            const why = ({ SEQUEL: 'Seguito', PREQUEL: 'Capitolo precedente', SIDE_STORY: 'Storia parallela',
                PARENT: 'Opera madre', SPIN_OFF: 'Spin-off', SUMMARY: 'Riassunto', ALTERNATIVE: 'Versione alternativa' })[rel.rel] || 'Stessa saga';
            pushUnique(saga, s, why);
        });

        // 3. Stesso studio
        const studio = [];
        if (r.studios.length) {
            records.filter(o => o.id !== r.id && o.studios.some(s => r.studios.includes(s)))
                .sort((a, b) => b.popularity - a.popularity)
                .forEach(o => pushUnique(studio, o.id, `Stesso studio (${o.studios.find(s => r.studios.includes(s))})`));
        }
        // 4. Stesso autore / regista
        const autore = [];
        records.filter(o => o.id !== r.id && ((r.director && o.director === r.director) || (r.creator && o.creator === r.creator)))
            .forEach(o => pushUnique(autore, o.id, o.director === r.director ? `Stesso regista (${r.director})` : `Stesso autore (${r.creator})`));

        // 5. Affinità (fallback): generi+tag in comune, così ogni scheda ha consigli
        const affin = [];
        records.filter(o => o.id !== r.id)
            .map(o => ({ o, sh: o.genres.filter(g => r.genres.includes(g)).length + o.tags.filter(t => r.tags.includes(t)).length }))
            .filter(x => x.sh >= 2).sort((a, b) => b.sh - a.sh)
            .forEach(x => pushUnique(affin, x.o.id, 'Atmosfera e temi affini'));

        // dedup streaming per nome (AniList a volte ripete la stessa piattaforma per regione)
        const streaming = [];
        const seenStream = new Set();
        for (const s of r.streaming || []) {
            const k = s.name.toLowerCase();
            if (!seenStream.has(k)) { seenStream.add(k); streaming.push(s); }
        }

        const { _recAnilistIds, _relAnilistIds, ...clean } = r;
        return {
            ...clean,
            streaming,
            hook: ed.hook || null,
            tone: ed.tone || [],
            forWho: ed.forWho || null,
            tips: Array.isArray(tipsEd[r.id]) ? tipsEd[r.id] : [],
            recommendations: {
                simili: simili.slice(0, 12), saga: saga.slice(0, 12), studio: studio.slice(0, 12),
                autore: autore.slice(0, 12), affin: affin.slice(0, 12),
            },
            editorial: !!ed.hook,
        };
    });

    const coverage = titles.filter(t => t.editorial).length;
    // i "bonus" si fondono nei titoli del livello: niente distinzione obbligatori/facoltativi
    const mergedPaths = paths.map(p => ({
        ...p,
        levels: p.levels.map(l => ({ title: l.title, why: l.why, titles: [...(l.titles || []), ...(l.bonus || [])] })),
    }));
    const payload = {
        generatedAt: new Date().toISOString(),
        attribution: 'Dati e immagini da AniList (anilist.co)',
        count: titles.length,
        titles,
        paths: mergedPaths,
    };

    // js/data.js — globale (zero build, funziona ovunque incluso file://)
    await mkdir(join(ROOT, 'js'), { recursive: true });
    const header = '// ⚠️  FILE GENERATO da tools/build.mjs — NON modificare a mano.\n'
                 + '// Fatti: AniList (sources/anime.json). Editoriale: editorial/*.json.\n';
    await writeFile(OUT_JS, header + `window.GUARDALO = ${JSON.stringify(payload)};\n`, 'utf8');
    // copia JSON per eventuale fetch / debug
    await mkdir(join(ROOT, 'dist'), { recursive: true });
    await writeFile(OUT_JSON, JSON.stringify(payload, null, 2) + '\n', 'utf8');

    console.log(c.ok(`✓ js/data.js + dist/data.json (${titles.length} titoli)`));
    console.log(c.dim(`  percorsi: ${paths.length} · schede editoriali: ${coverage}/${titles.length}`));
    if (coverage < titles.length) console.log(c.warn(`  ⚠ ${titles.length - coverage} titoli senza hook editoriale`));
}

// ════════════════════════════════════════════════════════════════════════════
// COMANDO: report — statistiche
// ════════════════════════════════════════════════════════════════════════════
async function cmdReport() {
    const rs = JSON.parse(await readFile(SRC_JSON, 'utf8'));
    const by = (f) => rs.reduce((m, r) => (m[f(r)] = (m[f(r)] || 0) + 1, m), {});
    console.log(c.bold(`\n${rs.length} titoli\n`));
    console.log('Fasce lunghezza:', by(r => r.lengthBand));
    console.log('Stato:', by(r => r.statusLabel));
    console.log('Formato:', by(r => r.typeLabel));
    const noCover = rs.filter(r => !r.coverImage).length;
    const noScore = rs.filter(r => r.score10 == null).length;
    const estDur  = rs.filter(r => r.provenance.durationEstimated).length;
    console.log(c.dim(`\nSenza copertina: ${noCover} · senza voto: ${noScore} · durata stimata: ${estDur}`));
    // i più lunghi
    const top = [...rs].sort((a, b) => b.coreMinutes - a.coreMinutes).slice(0, 6);
    console.log(c.dim('\nPiù impegnativi:'));
    top.forEach(r => console.log(c.dim(`  ${r.title}: ${Math.round(r.coreMinutes/60)}h (${r.lengthLabel}) — ${r.sagaEpisodes} ep`)));
    console.log('');
}

// ── dispatch ──────────────────────────────────────────────────────────────────
const cmd = process.argv[2];
try {
    if (cmd === 'map') await cmdMap();
    else if (cmd === 'fetch') await cmdFetch();
    else if (cmd === 'gen') await cmdGen();
    else if (cmd === 'report') await cmdReport();
    else if (cmd === 'all') { await cmdMap(); await cmdFetch(); await cmdGen(); }
    else {
        console.log(`Uso: node tools/build.mjs <map|fetch|gen|all|report>`);
        process.exit(1);
    }
} catch (e) {
    console.error(c.err('\n✗ ' + e.stack));
    process.exit(1);
}
