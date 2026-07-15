#!/usr/bin/env node
// Genera js/data.en.js = window.GUARDALO in inglese, sovrapponendo i testi
// editoriali EN (hook curati > sinossi AniList) e traducendo le etichette
// "baked" (typeLabel/statusLabel/lengthLabel/lengthHint) e la home. I dati
// AniList (titoli, generi, immagini, numeri) restano invariati.
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HOME_EN } from './i18n.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(await readFile(join(ROOT, 'dist', 'data.json'), 'utf8'));
const EN_PATHS = JSON.parse(await readFile(join(ROOT, 'editorial', 'en', 'paths.json'), 'utf8'));
const EN_TITLES = JSON.parse(await readFile(join(ROOT, 'editorial', 'en', 'titles.json'), 'utf8'));
const EN_DESC = JSON.parse(await readFile(join(ROOT, 'editorial', 'en', 'anilist-desc.json'), 'utf8'));

const enHook = id => (EN_TITLES[id] && EN_TITLES[id].hook) || EN_DESC[id] || null;
const TYPE = { 'Film': 'Movie', 'Serie': 'Series', 'OVA': 'OVA', 'ONA': 'ONA', 'Speciale': 'Special', 'Corto': 'Short' };
const STATUS = { 'Concluso': 'Completed', 'In corso': 'Ongoing', 'In uscita': 'Upcoming' };
const LEN = { 'Cortissimo': 'Very short', 'Corto': 'Short', 'Medio': 'Medium', 'Lungo': 'Long', 'Lunghissimo': 'Very long' };
const HINT = { 'una sera': 'one evening', 'un weekend': 'a weekend', 'qualche settimana': 'a few weeks', 'un impegno serio': 'a serious commitment', 'mesi': 'months' };
const m = (map, v) => (v == null ? v : (map[v] || v));

const titles = data.titles.map(t => ({
  ...t,
  hook: enHook(t.id) || t.hook,
  typeLabel: m(TYPE, t.typeLabel),
  statusLabel: m(STATUS, t.statusLabel),
  lengthLabel: m(LEN, t.lengthLabel),
  lengthHint: m(HINT, t.lengthHint),
}));
const paths = data.paths.map(p => {
  const e = EN_PATHS[p.id];
  return e ? { ...p, title: e.title, tagline: e.tagline ?? p.tagline, blurb: e.blurb ?? p.blurb, about: e.about ?? p.about } : { ...p };
});
const home = { ...(data.home || {}) };
if (home.hero) home.hero = { ...home.hero, title: HOME_EN.title, sub: HOME_EN.sub };
const TEMPO_EN = {
  sera:    { label: 'One evening', sub: 'Start and finish tonight' },
  weekend: { label: 'A weekend',   sub: 'A handful of episodes to enjoy at your pace' },
  maratona:{ label: 'A marathon',  sub: 'Something to lose yourself in for a while' },
};
if (Array.isArray(home.tempo)) home.tempo = home.tempo.map(t => (TEMPO_EN[t.key] ? { ...t, ...TEMPO_EN[t.key] } : t));

const out = { ...data, lang: 'en', titles, paths, home };
const banner = '// ⚠️  FILE GENERATO da tools/build-en-data.mjs — NON modificare a mano.\n// Versione inglese di window.GUARDALO. Testi EN: editorial/en/* + sinossi AniList.\n';
await writeFile(join(ROOT, 'js', 'data.en.js'), banner + 'window.GUARDALO = ' + JSON.stringify(out) + ';\n', 'utf8');
console.log(`✓ js/data.en.js generato (${titles.length} titoli, ${paths.length} percorsi)`);
