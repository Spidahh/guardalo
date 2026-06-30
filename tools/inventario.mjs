#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// GUARDALO — INVENTARIO: genera INVENTARIO.md, la mappa completa del sito.
//   node tools/inventario.mjs   (oppure: npm run inventario)
//
// Cosa documenta: tutti i titoli (tuoi vs aggiunti, top, voto), tutte le
// categorie/generi e percorsi con cosa contengono, dove sta ogni cosa nei file,
// e un controllo automatico delle anomalie. È un documento RIGENERABILE: si
// rilancia dopo ogni modifica ai dati e resta sempre veritiero.
// ─────────────────────────────────────────────────────────────────────────
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const data = JSON.parse(await readFile(join(ROOT, 'dist', 'data.json'), 'utf8'));
const TITLES = data.titles, PATHS = data.paths;
const BY = new Map(TITLES.map(t => [t.id, t]));
// tassonomia: fonte unica editorial/categories.json, già in dist/data.json (npm run gen)
const CAT = data.categories || {};
const CAT_MEMBERS = CAT.members || {};
const HERO_OF     = CAT.hero || {};
const GENRE_IDS   = CAT.genreOrder || [];
const PERCORSI_IDS = CAT.percorsoOrder || [];
if (!GENRE_IDS.length || !Object.keys(CAT_MEMBERS).length)
  throw new Error('inventario: manca data.categories — esegui prima `npm run gen`');

const pathById = new Map(PATHS.map(p => [p.id, p]));
// titoli di una sezione: la lista curata in categories.members. FONTE UNICA.
const members = id => (CAT_MEMBERS[id] || []).map(s => BY.get(s)).filter(Boolean);

const TIER = CAT.tiers || {};
const tierOf = (id, slug) => (TIER[id] && TIER[id][slug]) || 'd';
const TL = { e: 'Da vedere prima', c: 'Consigliato', d: 'Extra' };
const rankSort = (a, b) => (b.userRating || 0) - (a.userRating || 0) || (b.score10 || 0) - (a.score10 || 0);
const mark = t => t.inList ? '●' : '○';
const line = (t, tag) => `${tag ? `[${tag}] ` : ''}${mark(t)} **${t.title}**${t.year ? ` (${t.year})` : ''} · ${t.typeLabel}${t.userRating != null ? ` · tuo voto ${t.userRating}` : ''}${t.score10 ? ` · AniList ${t.score10}` : ''} · \`${t.id}\``;
const tierTally = (id, arr) => { const c = { e: 0, c: 0, d: 0 }; arr.forEach(t => c[tierOf(id, t.id)]++); return `${arr.length} titoli — ${c.e} Da vedere prima / ${c.c} Consigliati / ${c.d} Extra`; };
const tally = arr => `${arr.length} titoli — ${arr.filter(t => t.inList).length} tuoi ● / ${arr.filter(t => !t.inList).length} aggiunti ○`;
const counts = (arr, f) => arr.reduce((m, t) => (m[f(t)] = (m[f(t)] || 0) + 1, m), {});
const tbl = obj => Object.entries(obj).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`).join(' · ');

const mine = TITLES.filter(t => t.inList).sort(rankSort);
const extra = TITLES.filter(t => !t.inList).sort(rankSort);

// quali titoli appartengono a qualche genere/percorso curato
const surfaced = new Set();
[...GENRE_IDS, ...PERCORSI_IDS, 'slice-of-life', 'sport'].forEach(id => members(id).forEach(t => surfaced.add(t.id)));
const orphans = TITLES.filter(t => !surfaced.has(t.id)).sort(rankSort);
// in quante categorie/percorsi sta ogni titolo
const inHowMany = new Map();
[...GENRE_IDS, ...PERCORSI_IDS].forEach(id => members(id).forEach(t => inHowMany.set(t.id, (inHowMany.get(t.id) || 0) + 1)));

let md = '';
const w = s => md += s + '\n';

w('# INVENTARIO GUARDALO — il database del sito');
w('');
w('> Documento **rigenerato** da `tools/inventario.mjs` (`npm run inventario`). NON modificarlo a mano:');
w('> cambia i dati nei file sorgente (vedi §2) e rilancia il comando. Riflette sempre lo stato reale.');
w('');
w('**Legenda:** ● = tuo (in lista) · ○ = aggiunto (extra AniList) · `[Da vedere prima/Consigliato/Extra]` = fascia in quel genere.');
w('');

// 1. RIEPILOGO
w('## 1. Riepilogo');
w('');
w(`- **${TITLES.length} titoli** totali: **${mine.length} tuoi** ● + **${extra.length} aggiunti** ○ · ${TITLES.filter(t => t.userRating != null).length} con tuo voto`);
const tierTot = { e: 0, c: 0, d: 0 }; [...GENRE_IDS, ...PERCORSI_IDS].forEach(id => Object.values(TIER[id] || {}).forEach(v => tierTot[v]++));
w(`- Fasce (somma su tutti i generi/percorsi): **${tierTot.e} Da vedere prima** · ${tierTot.c} Consigliati · ${tierTot.d} Extra`);
w(`- **${GENRE_IDS.length} generi** (in griglia) · **${PERCORSI_IDS.length} percorsi** · 2 generi fuori griglia (slice-of-life, sport)`);
w(`- Per formato: ${tbl(counts(TITLES, t => t.typeLabel))}`);
w(`- Per stato: ${tbl(counts(TITLES, t => t.statusLabel))}`);
w(`- Per durata: ${tbl(counts(TITLES, t => t.lengthLabel))}`);
w('');

// 2. DOVE STA COSA
w('## 2. Dove sta cosa (mappa dei file)');
w('');
w('| Cosa | File | Si modifica a mano? |');
w('|---|---|---|');
w('| Fatti dei titoli (titolo, anno, generi, studio, durata, voto AniList, immagini…) | `sources/anime.json` | ❌ generato da AniList (`npm run fetch`) |');
w('| **La tua lista**: quali sono tuoi + il tuo voto | `editorial/user-ranking.json` | ✅ (o dal pannello /admin) |');
w('| Testi delle schede (hook, tono, "per chi è") | `editorial/titles.json` | ✅ |');
w('| Dritte per la visione | `editorial/tips.json` | ✅ |');
w('| **Percorsi** (titoli dentro ogni percorso) | `editorial/paths.json` | ✅ |');
w('| **Generi**: ordine, appartenenza titoli, **fasce E/C/D**, immagine hero | `editorial/categories.json` | ✅ (o dal pannello /admin) |');
w('| Dataset finale che il sito legge | `js/data.js` + `dist/data.json` | ❌ generato (`npm run gen`) |');
w('');
w('Dopo aver toccato un file ✅: `npm run gen` (rigenera i dati) → bumpa `?v=` in `index.html` → `npm run inventario`.');
w('');

// 3. GENERI
w('## 3. Generi (18) — cosa c\'è dentro');
w('');
const TO = { e: 0, c: 1, d: 2 };
const byTier = id => (a, b) => (TO[tierOf(id, a.id)] - TO[tierOf(id, b.id)]) || rankSort(a, b);
for (const id of GENRE_IDS) {
  const p = pathById.get(id); if (!p) continue;
  const list = members(id).sort(byTier(id));
  const hero = HERO_OF[id] ? (BY.get(HERO_OF[id])?.title || HERO_OF[id]) : '—';
  w(`### ${p.title}  \`${id}\``);
  w(`*hero: ${hero}* · ${tierTally(id, list)}`);
  w('');
  list.forEach(t => w(`- ${line(t, TL[tierOf(id, t.id)])}`));
  w('');
}

// 4. PERCORSI
w('## 4. Percorsi (6) — cosa c\'è dentro');
w('');
for (const id of PERCORSI_IDS) {
  const p = pathById.get(id); if (!p) continue;
  const list = members(id).sort(byTier(id));
  const hero = HERO_OF[id] ? (BY.get(HERO_OF[id])?.title || HERO_OF[id]) : '—';
  w(`### ${p.title}  \`${id}\``);
  w(`*hero: ${hero}* · ${p.about ? p.about.slice(0, 90) + '…' : ''}`);
  w(`${tierTally(id, list)}`);
  w('');
  list.forEach(t => w(`- ${line(t, TL[tierOf(id, t.id)])}`));
  w('');
}

// 5. GENERI FUORI GRIGLIA
w('## 5. Generi fuori griglia (raggiungibili solo da ricerca/URL)');
w('');
for (const id of ['slice-of-life', 'sport']) {
  const p = pathById.get(id); if (!p) continue;
  const list = members(id).sort(byTier(id));
  w(`### ${p.title}  \`${id}\` — ${tierTally(id, list)}`);
  list.forEach(t => w(`- ${line(t, TL[tierOf(id, t.id)])}`));
  w('');
}

// 6. I TUOI vs AGGIUNTI
w('## 6. I tuoi titoli vs gli aggiunti');
w('');
w(`### ● I tuoi ${mine.length} (in lista, da user-ranking.json)`);
mine.forEach((t, i) => w(`${i + 1}. ${line(t)}`));
w('');
w(`### ○ Gli ${extra.length} aggiunti da Claude (extra AniList ≥8.0, non in lista)`);
extra.forEach((t, i) => w(`${i + 1}. ${line(t)}`));
w('');

// 7. CONTROLLO / ANOMALIE
w('## 7. Controllo automatico');
w('');
w(`- **Titoli in NESSUN genere né percorso** (solo ricerca/Esplora): ${orphans.length}`);
if (orphans.length) orphans.forEach(t => w(`  - ${line(t)}`));
const multi = TITLES.filter(t => (inHowMany.get(t.id) || 0) >= 4).sort((a, b) => (inHowMany.get(b.id) || 0) - (inHowMany.get(a.id) || 0));
w(`- **Titoli in 4+ categorie** (molto trasversali): ${multi.length}`);
multi.slice(0, 15).forEach(t => w(`  - ${t.title} → in ${inHowMany.get(t.id)} categorie \`${t.id}\``));
const thin = GENRE_IDS.map(id => ({ id, n: members(id).length })).filter(x => x.n < 5);
w(`- **Generi con meno di 5 titoli**: ${thin.length ? thin.map(x => `${x.id} (${x.n})`).join(', ') : 'nessuno'}`);
const noEd = TITLES.filter(t => !t.hook);
w(`- **Titoli senza scheda editoriale (hook)**: ${noEd.length ? noEd.map(t => t.id).join(', ') : 'nessuno ✓'}`);
const noCover = TITLES.filter(t => !t.coverImage);
w(`- **Titoli senza copertina**: ${noCover.length ? noCover.map(t => t.id).join(', ') : 'nessuno ✓'}`);
w('');
w(`*Generato il ${process.env.INV_DATE || '(data al momento del run)'} — ${TITLES.length} titoli, ${GENRE_IDS.length} generi, ${PERCORSI_IDS.length} percorsi.*`);

await writeFile(join(ROOT, 'INVENTARIO.md'), md, 'utf8');
console.log(`✓ INVENTARIO.md scritto — ${TITLES.length} titoli, ${GENRE_IDS.length} generi, ${PERCORSI_IDS.length} percorsi, ${orphans.length} orfani`);
