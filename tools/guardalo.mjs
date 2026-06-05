#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// GUARDALO — tool di gestione contenuti
//
// Comandi:
//   node tools/guardalo.mjs migrate          → estrae js/data.js in data.json (una tantum)
//   node tools/guardalo.mjs add "Titolo" ... → aggiunge titoli da AniList (dati + poster)
//   node tools/guardalo.mjs build            → rigenera js/data.js da data.json
//   node tools/guardalo.mjs validate         → controlla che data.json sia integro
//
// data.json è l'UNICA fonte di verità. js/data.js è generato: non modificarlo a mano.
// ─────────────────────────────────────────────────────────────────────────

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT      = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_JSON = join(ROOT, 'data.json');
const DATA_JS   = join(ROOT, 'js', 'data.js');
const IMG_DIR   = join(ROOT, 'images', 'anime');

// ── utility ──────────────────────────────────────────────────────────────
const c = {
    ok:   s => `\x1b[32m${s}\x1b[0m`,
    warn: s => `\x1b[33m${s}\x1b[0m`,
    err:  s => `\x1b[31m${s}\x1b[0m`,
    dim:  s => `\x1b[2m${s}\x1b[0m`,
    bold: s => `\x1b[1m${s}\x1b[0m`,
};

/** Genera uno slug stabile da un titolo (usato come id e nome file poster). */
function slug(s) {
    return s.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '') // accenti
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/** Rimuove i tag HTML dalle descrizioni AniList. */
function stripHtml(s) {
    return (s || '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;|&apos;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

const FORMAT_TO_TYPE = {
    TV: 'Serie', TV_SHORT: 'Serie', MOVIE: 'Film',
    OVA: 'OVA', ONA: 'ONA', SPECIAL: 'Special', MUSIC: 'Music',
};

const STATUS_TO_IT = {
    FINISHED: 'Finito', RELEASING: 'In corso',
    NOT_YET_RELEASED: 'In arrivo', CANCELLED: 'Cancellato', HIATUS: 'In pausa',
};

// ── lettura / scrittura dati ──────────────────────────────────────────────
async function loadData() {
    if (!existsSync(DATA_JSON)) {
        throw new Error(`data.json non trovato. Esegui prima:  node tools/guardalo.mjs migrate`);
    }
    return JSON.parse(await readFile(DATA_JSON, 'utf8'));
}

async function saveData(list) {
    await writeFile(DATA_JSON, JSON.stringify(list, null, 2) + '\n', 'utf8');
    await build(list);
}

/** Rigenera js/data.js dal contenuto di data.json. */
async function build(list = null) {
    if (!list) list = await loadData();
    const errors = validateList(list);
    if (errors.length) {
        console.error(c.err('✗ data.json non valido, build annullata:'));
        errors.forEach(e => console.error('  - ' + e));
        process.exit(1);
    }
    const header = '// ⚠️  FILE GENERATO AUTOMATICAMENTE da tools/guardalo.mjs — NON modificare a mano.\n'
                 + '// Fonte dei dati: data.json  ·  Per aggiungere titoli:  node tools/guardalo.mjs add "Titolo"\n';
    const body = `const animeData = ${JSON.stringify(list, null, 2)};\n`;
    await writeFile(DATA_JS, header + body, 'utf8');
    console.log(c.ok(`✓ js/data.js rigenerato (${list.length} titoli)`));
}

// ── validazione ────────────────────────────────────────────────────────────
const REQUIRED = ['id', 'title', 'category', 'rating', 'genres', 'year', 'img', 'studio', 'status', 'episodes', 'synopsis', 'structure', 'links'];
const CATEGORIES = ['animazione', 'live'];

function validateList(list) {
    const errors = [];
    const ids = new Set();
    if (!Array.isArray(list)) return ['data.json non è un array'];
    list.forEach((a, i) => {
        const where = `#${i} "${a?.title ?? '???'}"`;
        for (const f of REQUIRED) {
            if (a[f] === undefined || a[f] === null) errors.push(`${where}: campo mancante "${f}"`);
        }
        if (a.id) {
            if (ids.has(a.id)) errors.push(`${where}: id duplicato "${a.id}"`);
            ids.add(a.id);
        }
        if (a.category && !CATEGORIES.includes(a.category)) errors.push(`${where}: category "${a.category}" non valida (usa: ${CATEGORIES.join(' / ')})`);
        if (typeof a.rating === 'number' && (a.rating < 0 || a.rating > 10)) errors.push(`${where}: rating fuori range (${a.rating})`);
        if (a.links && (!Array.isArray(a.links.legal) || !Array.isArray(a.links.illegal))) errors.push(`${where}: links.legal/illegal devono essere array`);
        if (a.structure && !Array.isArray(a.structure)) errors.push(`${where}: structure deve essere un array`);
    });
    return errors;
}

async function validate() {
    const list = await loadData();
    const errors = validateList(list);
    let warnings = 0;
    for (const a of list) {
        const file = join(ROOT, a.img.replace(/\//g, '\\'));
        if (a.img.startsWith('images/') && !existsSync(file)) {
            console.log(c.warn(`⚠ poster mancante: ${a.img}  (${a.title})`));
            warnings++;
        }
        if (/DA TRADURRE/i.test(a.synopsis || '')) {
            console.log(c.warn(`⚠ trama da tradurre: ${a.title}`));
            warnings++;
        }
    }
    if (errors.length) {
        console.error(c.err(`\n✗ ${errors.length} errori:`));
        errors.forEach(e => console.error('  - ' + e));
        process.exit(1);
    }
    console.log(c.ok(`\n✓ data.json valido — ${list.length} titoli, ${warnings} avvisi`));
}

// ── migrazione: js/data.js → data.json ─────────────────────────────────────
async function migrate() {
    if (existsSync(DATA_JSON)) {
        console.log(c.warn('data.json esiste già. Migrazione saltata (usa "build" per rigenerare js/data.js).'));
        return;
    }
    const text = await readFile(DATA_JS, 'utf8');
    // Esegue il file in un contesto isolato per recuperare l'array animeData.
    const list = new Function(`${text}\n;return animeData;`)();
    const normalized = list.map(a => normalizeEntry(a));
    await saveData(normalized);
    console.log(c.ok(`✓ Migrati ${normalized.length} titoli in data.json`));
}

/** Garantisce che ogni voce abbia id, category e type, preservando tutto il resto. */
function normalizeEntry(a) {
    return {
        id: a.id || slug(a.title),
        title: a.title,
        // "animazione" = anime/donghua/serie animate/qualsiasi cosa animata · "live" = serie TV/film dal vero
        category: a.category || 'animazione',
        type: a.type || 'Serie',
        rating: a.rating,
        top: !!a.top,
        genres: a.genres || [],
        year: a.year,
        img: a.img,
        studio: a.studio || '—',
        status: a.status || '—',
        episodes: a.episodes ?? 0,
        synopsis: a.synopsis || '',
        structure: a.structure || [],
        links: {
            legal: a.links?.legal || [],
            illegal: a.links?.illegal || [],
        },
    };
}

// ── add: AniList → data.json ───────────────────────────────────────────────
const ANILIST_QUERY = `
query ($search: String) {
  Media(search: $search, type: ANIME) {
    id
    title { romaji english native }
    seasonYear
    startDate { year }
    episodes
    format
    status
    averageScore
    genres
    description(asHtml: false)
    studios(isMain: true) { nodes { name } }
    coverImage { extraLarge large }
  }
}`;

async function fetchAniList(search) {
    const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ query: ANILIST_QUERY, variables: { search } }),
    });
    if (!res.ok) throw new Error(`AniList HTTP ${res.status}`);
    const json = await res.json();
    if (json.errors) throw new Error(json.errors.map(e => e.message).join('; '));
    return json.data?.Media || null;
}

async function downloadPoster(url, dest) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`download poster HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(IMG_DIR, { recursive: true });
    await writeFile(dest, buf);
}

/** Converte un risultato AniList in una voce GUARDALO. */
function aniListToEntry(m) {
    const title = m.title.english || m.title.romaji;
    const id = slug(title);
    const type = FORMAT_TO_TYPE[m.format] || 'Serie';
    const eps = m.episodes ?? 0;
    return {
        id,
        title,
        category: 'animazione',
        type,
        rating: m.averageScore ? Math.round(m.averageScore / 10) : 0,
        top: false,
        genres: m.genres || [],
        year: m.seasonYear || m.startDate?.year || 0,
        img: `images/anime/${id}.jpg`,
        studio: m.studios?.nodes?.[0]?.name || '—',
        status: STATUS_TO_IT[m.status] || '—',
        episodes: eps,
        // La trama AniList è in inglese: la marchiamo per la traduzione/rifinitura in italiano.
        synopsis: `[DA TRADURRE] ${stripHtml(m.description)}`,
        structure: [{ name: type === 'Film' ? 'Film' : 'Serie completa', episodes: eps ? `${eps} episodi` : '—' }],
        links: {
            legal: [],
            illegal: [{ name: 'Cerca', url: `https://google.com/search?q=${encodeURIComponent(title + ' streaming')}` }],
        },
        _coverUrl: m.coverImage?.extraLarge || m.coverImage?.large || null,
    };
}

async function add(titles) {
    if (!titles.length) {
        console.error(c.err('Uso: node tools/guardalo.mjs add "Titolo 1" "Titolo 2" ...'));
        process.exit(1);
    }
    const list = await loadData();
    const byId = new Set(list.map(a => a.id));
    let added = 0;

    for (const title of titles) {
        process.stdout.write(c.dim(`→ cerco "${title}"... `));
        try {
            const media = await fetchAniList(title);
            if (!media) { console.log(c.err('non trovato su AniList')); continue; }

            const entry = aniListToEntry(media);
            if (byId.has(entry.id)) { console.log(c.warn(`già presente (${entry.id}), salto`)); continue; }

            if (entry._coverUrl) {
                await downloadPoster(entry._coverUrl, join(IMG_DIR, `${entry.id}.jpg`));
            } else {
                console.log(c.warn('(nessun poster)'));
            }
            delete entry._coverUrl;

            list.push(entry);
            byId.add(entry.id);
            added++;
            console.log(c.ok(`✓ ${entry.title} (${entry.year}, ★${entry.rating}, ${entry.type})`));
        } catch (e) {
            console.log(c.err(`errore: ${e.message}`));
        }
        // rispetta il rate-limit di AniList (90 req/min)
        await new Promise(r => setTimeout(r, 700));
    }

    if (added) {
        await saveData(list);
        console.log(c.bold(c.ok(`\n✓ Aggiunti ${added} titoli.`)) +
            c.dim('\n  Ricorda: rifinisci le trame marcate [DA TRADURRE] in data.json, poi  node tools/guardalo.mjs build'));
    } else {
        console.log(c.warn('\nNessun titolo aggiunto.'));
    }
}

// ── add-tv: TMDB → data.json (serie TV live-action, categoria "live") ───────
// La key TMDB (gratuita) va messa in tools/tmdb.key oppure nella variabile
// d'ambiente TMDB_API_KEY. TMDB fornisce le trame già in italiano.
async function readTmdbKey() {
    if (process.env.TMDB_API_KEY) return process.env.TMDB_API_KEY.trim();
    const keyFile = join(ROOT, 'tools', 'tmdb.key');
    if (existsSync(keyFile)) return (await readFile(keyFile, 'utf8')).trim();
    return null;
}

async function tmdb(path, key, params = {}) {
    const url = new URL('https://api.themoviedb.org/3' + path);
    url.searchParams.set('api_key', key);
    url.searchParams.set('language', 'it-IT');
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDB HTTP ${res.status}`);
    return res.json();
}

function tmdbToEntry(d, isMovie) {
    const title = d.name || d.title;
    const id = slug(title);
    const year = parseInt((d.first_air_date || d.release_date || '').slice(0, 4)) || 0;
    const seasons = d.number_of_seasons;
    const eps = d.number_of_episodes;
    const studio = d.networks?.[0]?.name || d.production_companies?.[0]?.name || '—';
    const status = d.status === 'Ended' ? 'Finito'
                 : d.status === 'Returning Series' ? 'In corso'
                 : d.status === 'Canceled' ? 'Cancellato' : (d.status || '—');
    return {
        id,
        title,
        category: 'live',
        type: isMovie ? 'Film' : 'Serie TV',
        rating: d.vote_average ? Math.round(d.vote_average) : 0,
        top: false,
        genres: (d.genres || []).map(g => g.name),
        year,
        img: `images/serie/${id}.jpg`,
        studio,
        status: isMovie ? 'Film' : status,
        episodes: isMovie ? 1 : (eps || 0),
        synopsis: d.overview || '(Trama non disponibile)',
        structure: isMovie
            ? [{ name: 'Film', episodes: d.runtime ? `${d.runtime} min` : '—' }]
            : [{ name: seasons === 1 ? 'Stagione unica' : `${seasons} stagioni`, episodes: `${eps} episodi` }],
        links: {
            legal: [],
            illegal: [{ name: 'Cerca', url: `https://google.com/search?q=${encodeURIComponent(title + ' streaming')}` }],
        },
        _posterPath: d.poster_path,
    };
}

async function addTv(titles) {
    const key = await readTmdbKey();
    if (!key) {
        console.error(c.err('Manca la API key TMDB.') +
            c.dim('\n  Registrati gratis su https://www.themoviedb.org/settings/api e incolla la key in:  tools/tmdb.key'));
        process.exit(1);
    }
    if (!titles.length) {
        console.error(c.err('Uso: node tools/guardalo.mjs add-tv "Titolo serie" ...'));
        process.exit(1);
    }
    const list = await loadData();
    const byId = new Set(list.map(a => a.id));
    let added = 0;

    for (const title of titles) {
        process.stdout.write(c.dim(`→ cerco "${title}" su TMDB... `));
        try {
            const search = await tmdb('/search/tv', key, { query: title });
            const hit = search.results?.[0];
            if (!hit) { console.log(c.err('non trovato')); continue; }

            const details = await tmdb(`/tv/${hit.id}`, key);
            const entry = tmdbToEntry(details, false);
            if (byId.has(entry.id)) { console.log(c.warn(`già presente (${entry.id}), salto`)); continue; }

            if (entry._posterPath) {
                await mkdir(join(ROOT, 'images', 'serie'), { recursive: true });
                await downloadPoster(`https://image.tmdb.org/t/p/w500${entry._posterPath}`, join(ROOT, 'images', 'serie', `${entry.id}.jpg`));
            }
            delete entry._posterPath;

            list.push(entry);
            byId.add(entry.id);
            added++;
            console.log(c.ok(`✓ ${entry.title} (${entry.year}, ★${entry.rating}, Serie TV)`));
        } catch (e) {
            console.log(c.err(`errore: ${e.message}`));
        }
        await new Promise(r => setTimeout(r, 300));
    }

    if (added) {
        await saveData(list);
        console.log(c.bold(c.ok(`\n✓ Aggiunte ${added} serie TV (trame già in italiano da TMDB).`)));
    } else {
        console.log(c.warn('\nNessuna serie aggiunta.'));
    }
}

// ── check: confronto dei dati con AniList (solo report, non modifica) ───────
const wait = (ms = 2200) => new Promise(r => setTimeout(r, ms));

const CANDIDATES_QUERY = `
query ($s: String) {
  Page(perPage: 10) {
    media(search: $s, type: ANIME, sort: SEARCH_MATCH) {
      title { english romaji native }
      seasonYear
      startDate { year }
      episodes
      format
      status
    }
  }
}`;

// POST con gestione del rate-limit (429 → attesa Retry-After → ritento)
async function aniListRequest(query, variables, tries = 4) {
    for (let i = 0; i < tries; i++) {
        const res = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        if (res.status === 429) {
            const ra = Math.min(parseInt(res.headers.get('retry-after')) || 8, 65);
            await wait(ra * 1000);
            continue;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.errors) throw new Error(json.errors.map(e => e.message).join('; '));
        return json.data;
    }
    throw new Error('rate-limit 429 ripetuto');
}

// Sceglie il candidato col titolo affine e l'ANNO più vicino a quello salvato
function pickBest(cands, entry) {
    const titled = cands.filter(m => {
        const t = [m.title.english, m.title.romaji, m.title.native].map(x => slug(x || ''));
        return t.some(x => x && (x === entry.id || x.includes(entry.id) || entry.id.includes(x)));
    });
    const pool = titled.length ? titled : cands;
    let best = null, bestDelta = Infinity;
    for (const m of pool) {
        const y = m.seasonYear || m.startDate?.year || 0;
        const d = y ? Math.abs(y - entry.year) : 999;
        if (d < bestDelta) { bestDelta = d; best = m; }
    }
    return { best, bestDelta, hadTitleMatch: titled.length > 0 };
}

async function check() {
    const list = await loadData();
    const out = { ok: 0, diff: [], uncertain: [], notfound: [], skipped: [] };
    let done = 0;

    for (const a of list) {
        done++;
        if (a.category === 'live') { out.skipped.push(a.title); continue; }
        process.stdout.write(c.dim(`\r  [${done}/${list.length}] ${a.title.slice(0, 40)}...`.padEnd(60)));
        try {
            const data = await aniListRequest(CANDIDATES_QUERY, { s: a.title });
            const cands = data?.Page?.media || [];
            if (!cands.length) { out.notfound.push(a.title); await wait(); continue; }

            const { best, bestDelta, hadTitleMatch } = pickBest(cands, a);
            const matched = best.title.english || best.title.romaji || '';

            // titolo non affine, oppure nessuna versione vicina all'anno → controllo manuale
            if (!hadTitleMatch || bestDelta > 2) {
                out.uncertain.push(`${a.title} (${a.year})  →  AniList più vicino: "${matched}" (${best.seasonYear || best.startDate?.year || '?'})`);
                await wait(); continue;
            }

            const multiPart = Array.isArray(a.structure) && a.structure.length > 1;
            const aniEps    = best.episodes ?? 0;
            const aniStatus = STATUS_TO_IT[best.status] || '';
            const diffs = [];

            if (aniStatus && a.status !== aniStatus) diffs.push(`stato "${a.status}" → "${aniStatus}"`);
            if (!multiPart && aniEps && a.episodes !== aniEps) diffs.push(`episodi ${a.episodes} → ${aniEps}`);

            if (diffs.length) out.diff.push(`${a.title}: ${diffs.join('  ·  ')}`);
            else out.ok++;
        } catch (e) {
            out.notfound.push(`${a.title} (${e.message})`);
        }
        await wait();
    }

    process.stdout.write('\r'.padEnd(62) + '\r');
    console.log(c.ok(`✓ Allineati: ${out.ok}`));
    if (out.diff.length) {
        console.log(c.warn(`\n⟳ Da aggiornare (${out.diff.length}):`));
        out.diff.forEach(d => console.log('  ' + d));
    }
    if (out.uncertain.length) {
        console.log(c.warn(`\n? Da controllare a mano — versione/anno diverso (${out.uncertain.length}):`));
        out.uncertain.forEach(d => console.log('  ' + d));
    }
    if (out.notfound.length) {
        console.log(c.err(`\n✗ Non trovati su AniList (${out.notfound.length}):`));
        out.notfound.forEach(d => console.log('  ' + d));
    }
    if (out.skipped.length) console.log(c.dim(`\n(saltati ${out.skipped.length} live/non-AniList: ${out.skipped.join(', ')})`));
}

// ── dispatcher ─────────────────────────────────────────────────────────────
const [cmd, ...args] = process.argv.slice(2);
const commands = { migrate, build: () => build(), validate, check, add: () => add(args), 'add-tv': () => addTv(args) };

if (!commands[cmd]) {
    console.log(`GUARDALO tool — comandi disponibili:
  ${c.bold('migrate')}                 estrae js/data.js → data.json (una tantum)
  ${c.bold('add')} "Titolo" [...]      aggiunge anime/animazione da AniList (dati + poster)
  ${c.bold('add-tv')} "Serie" [...]    aggiunge serie TV live-action da TMDB (richiede tools/tmdb.key)
  ${c.bold('build')}                   rigenera js/data.js da data.json
  ${c.bold('validate')}                controlla l'integrità di data.json`);
    process.exit(cmd ? 1 : 0);
}

commands[cmd]().catch(e => { console.error(c.err('Errore: ' + e.message)); process.exit(1); });
