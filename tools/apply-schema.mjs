// Applica SCHEMA.md → editorial/categories.json (members + tiers).
// Uso: node tools/apply-schema.mjs   (poi: npm run gen)
// Lo schema è la fonte: ogni "### Nome sezione" + righe "- [E|C|D] Titolo".
// genreOrder / percorsoOrder / hero restano invariati da categories.json.
import fs from 'node:fs';

const norm = s => s.toLowerCase().replace(/\s+/g, ' ').trim();

const cat = JSON.parse(fs.readFileSync('editorial/categories.json', 'utf8'));
const paths = JSON.parse(fs.readFileSync('editorial/paths.json', 'utf8'));

// mappa NOME sezione → id (dai paths)
const secByName = new Map(paths.map(p => [norm(p.title), p.id]));
// mappa NOME titolo → id (dai dati generati)
const dsrc = fs.readFileSync('js/data.js', 'utf8');
const data = eval('(' + dsrc.slice(dsrc.indexOf('=') + 1).replace(/;\s*$/, '') + ')');
const titleByName = new Map(data.titles.map(t => [norm(t.title), t.id]));

const lines = fs.readFileSync('SCHEMA.md', 'utf8').split(/\r?\n/);
const members = {}, tiers = {};
let cur = null, curName = '';
const warn = [];

for (const raw of lines) {
  const h = raw.match(/^###\s+(.+?)\s*(?:\(\d+\))?\s*$/);
  if (h) {
    curName = h[1].trim();
    cur = secByName.get(norm(curName)) || null;
    if (cur && !members[cur]) { members[cur] = []; tiers[cur] = {}; }
    if (!cur) warn.push(`Sezione non riconosciuta: "${curName}"`);
    continue;
  }
  const m = raw.match(/^-\s*\[([EeCcDd])\]\s+(.+?)\s*$/);
  if (!m || !cur) continue;
  const tier = m[1].toLowerCase();
  const id = titleByName.get(norm(m[2]));
  if (!id) { warn.push(`Titolo non riconosciuto in "${curName}": "${m[2]}"`); continue; }
  if (!members[cur].includes(id)) { members[cur].push(id); tiers[cur][id] = tier; }
}

// sezioni dichiarate negli ordini ma assenti nello schema → vuote (le segnalo)
for (const id of [...(cat.genreOrder || []), ...(cat.percorsoOrder || [])]) {
  if (!members[id]) { members[id] = []; tiers[id] = {}; warn.push(`Sezione "${id}" assente nello schema → svuotata`); }
}
// hero che non è più membro → segnalo
for (const [sec, hid] of Object.entries(cat.hero || {})) {
  if (members[sec] && !members[sec].includes(hid)) warn.push(`Hero di "${sec}" (${hid}) non è più membro → aggiorna categories.hero`);
}

cat.members = members;
cat.tiers = tiers;
fs.writeFileSync('editorial/categories.json', JSON.stringify(cat, null, 2).replace(/\n/g, '\r\n') + '\r\n');

const tot = Object.values(members).reduce((s, a) => s + a.length, 0);
console.log(`✓ categories.json aggiornato — ${Object.keys(members).length} sezioni, ${tot} appartenenze`);
if (warn.length) { console.log('\n⚠ Avvisi:'); warn.forEach(w => console.log('  - ' + w)); }
else console.log('  nessun avviso.');
