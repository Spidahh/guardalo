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

// estrae una const oggetto/array letterale da js/app.js (fonte unica della tassonomia)
function extractConst(src, name) {
  const at = src.indexOf('const ' + name + ' =');
  if (at < 0) return null;
  let i = src.indexOf('=', at) + 1;
  while (i < src.length && src[i] !== '{' && src[i] !== '[') i++;
  const open = src[i], close = open === '{' ? '}' : ']';
  let depth = 0, str = null;
  for (let j = i; j < src.length; j++) {
    const ch = src[j], prev = src[j - 1];
    if (str) { if (ch === str && prev !== '\\') str = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { str = ch; continue; }
    if (ch === open) depth++;
    else if (ch === close && --depth === 0) return eval('(' + src.slice(i, j + 1) + ')');
  }
  return null;
}

const data = JSON.parse(await readFile(join(ROOT, 'dist', 'data.json'), 'utf8'));
const TITLES = data.titles, PATHS = data.paths;
const BY = new Map(TITLES.map(t => [t.id, t]));
const appSrc = await readFile(join(ROOT, 'js', 'app.js'), 'utf8');
const CAT_MEMBERS = extractConst(appSrc, 'CAT_MEMBERS');
const HERO_OF     = extractConst(appSrc, 'HERO_OF');
const GENRE_IDS   = extractConst(appSrc, 'GENRE_IDS');
const PERCORSI_IDS = extractConst(appSrc, 'PERCORSI_IDS');
if (!CAT_MEMBERS || !HERO_OF || !GENRE_IDS || !PERCORSI_IDS)
  throw new Error('inventario: non riesco a leggere CAT_MEMBERS/HERO_OF/GENRE_IDS/PERCORSI_IDS da js/app.js');

const pathById = new Map(PATHS.map(p => [p.id, p]));
const pathTitles = p => { const s = new Set(), o = []; (p?.levels || []).forEach(l => (l.titles || []).forEach(id => { if (!s.has(id)) { s.add(id); const t = BY.get(id); if (t) o.push(t); } })); return o; };
// stessa logica di catTitles() in app.js: generi = CAT_MEMBERS + extra non-inList dai levels
const members = id => {
  if (CAT_MEMBERS[id]) {
    const m = new Map();
    CAT_MEMBERS[id].forEach(s => { const t = BY.get(s); if (t) m.set(s, t); });
    pathTitles(pathById.get(id)).forEach(t => { if (t && !t.inList) m.set(t.id, t); });
    return [...m.values()];
  }
  return pathTitles(pathById.get(id));
};

const rankSort = (a, b) => (b.top ? 1 : 0) - (a.top ? 1 : 0) || (b.userRating || 0) - (a.userRating || 0) || (b.score10 || 0) - (a.score10 || 0);
const mark = t => `${t.top ? '★' : ' '}${t.inList ? '●' : '○'}`;
const line = t => `${mark(t)} **${t.title}**${t.year ? ` (${t.year})` : ''} · ${t.typeLabel}${t.userRating != null ? ` · tuo voto ${t.userRating}` : ''}${t.score10 ? ` · AniList ${t.score10}` : ''} · \`${t.id}\``;
const tally = arr => `${arr.length} titoli — ${arr.filter(t => t.inList).length} tuoi ● / ${arr.filter(t => !t.inList).length} aggiunti ○ / ${arr.filter(t => t.top).length} top ★`;
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
w('**Legenda:** ★ = top · ● = tuo (in lista, da `user-ranking.json`) · ○ = aggiunto da Claude (extra AniList).');
w('');

// 1. RIEPILOGO
w('## 1. Riepilogo');
w('');
w(`- **${TITLES.length} titoli** totali: **${mine.length} tuoi** ● + **${extra.length} aggiunti** ○`);
w(`- **${TITLES.filter(t => t.top).length} top** ★ · ${TITLES.filter(t => t.userRating != null).length} con tuo voto`);
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
w('| **La tua lista**: quali sono tuoi, il tuo voto, il flag top | `editorial/user-ranking.json` | ✅ |');
w('| Testi delle schede (hook, tono, "per chi è") | `editorial/titles.json` | ✅ |');
w('| Dritte per la visione | `editorial/tips.json` | ✅ |');
w('| **Percorsi** (titoli dentro ogni percorso) | `editorial/paths.json` | ✅ |');
w('| **Appartenenza ai generi** (CAT_MEMBERS) | `js/app.js` | ✅ |');
w('| Immagine hero di ogni genere/percorso (HERO_OF) | `js/app.js` | ✅ |');
w('| Ordine/elenco generi in griglia (GENRE_IDS) e percorsi (PERCORSI_IDS) | `js/app.js` | ✅ |');
w('| Dataset finale che il sito legge | `js/data.js` + `dist/data.json` | ❌ generato (`npm run gen`) |');
w('');
w('Dopo aver toccato un file ✅: `npm run gen` (rigenera i dati) → bumpa `?v=` in `index.html` → `npm run inventario`.');
w('');

// 3. GENERI
w('## 3. Generi (18) — cosa c\'è dentro');
w('');
for (const id of GENRE_IDS) {
  const p = pathById.get(id); if (!p) continue;
  const list = members(id).sort(rankSort);
  const hero = HERO_OF[id] ? (BY.get(HERO_OF[id])?.title || HERO_OF[id]) : '—';
  w(`### ${p.title}  \`${id}\``);
  w(`*hero: ${hero}* · ${tally(list)}`);
  w('');
  list.forEach((t, i) => w(`${i + 1}. ${line(t)}`));
  w('');
}

// 4. PERCORSI
w('## 4. Percorsi (6) — cosa c\'è dentro');
w('');
for (const id of PERCORSI_IDS) {
  const p = pathById.get(id); if (!p) continue;
  const list = members(id).sort(rankSort);
  const hero = HERO_OF[id] ? (BY.get(HERO_OF[id])?.title || HERO_OF[id]) : '—';
  w(`### ${p.title}  \`${id}\``);
  w(`*hero: ${hero}* · ${p.about ? p.about.slice(0, 90) + '…' : ''}`);
  w(`${tally(list)}`);
  w('');
  list.forEach((t, i) => w(`${i + 1}. ${line(t)}`));
  w('');
}

// 5. GENERI FUORI GRIGLIA
w('## 5. Generi fuori griglia (raggiungibili solo da ricerca/URL)');
w('');
for (const id of ['slice-of-life', 'sport']) {
  const p = pathById.get(id); if (!p) continue;
  const list = members(id).sort(rankSort);
  w(`### ${p.title}  \`${id}\` — ${tally(list)}`);
  list.forEach((t, i) => w(`${i + 1}. ${line(t)}`));
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
