#!/usr/bin/env node
// Recupera da AniList le sinossi in inglese per tutti i titoli mappati e le
// salva in editorial/en/anilist-desc.json = { slug: "descrizione pulita" }.
// Usate dal prerender come fallback EN per i titoli non tradotti a mano.
//   node tools/fetch-en-desc.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const map = JSON.parse(await readFile(join(ROOT, 'tools', 'anilist-map.json'), 'utf8'));
const pairs = Object.entries(map).map(([slug, v]) => [slug, v.anilistId]).filter(([, id]) => id);
const byAniId = new Map(pairs.map(([slug, id]) => [id, slug]));
const ids = [...byAniId.keys()];

const clean = (s) => {
  if (!s) return '';
  s = s.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ');
  s = s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&mdash;/g, '—').replace(/&hellip;/g, '…');
  s = s.replace(/\(Source:[^)]*\)/gi, ' ').replace(/\bNote:\s*.*$/is, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  if (s.length > 600) { const cut = s.slice(0, 600); const p = cut.lastIndexOf('. '); s = (p > 300 ? cut.slice(0, p + 1) : cut.trim() + '…'); }
  return s;
};

const QUERY = `query($ids:[Int]){ Page(perPage:50){ media(id_in:$ids, type:ANIME){ id description(asHtml:false) } } }`;
const out = {};
const chunk = (a, n) => a.reduce((r, _, i) => (i % n ? r : [...r, a.slice(i, i + n)]), []);

for (const batch of chunk(ids, 50)) {
  let attempt = 0;
  while (true) {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { ids: batch } }),
    });
    if (res.status === 429) { const w = Number(res.headers.get('retry-after') || 60); console.log(`rate limit, attendo ${w}s`); await new Promise(r => setTimeout(r, w * 1000)); continue; }
    if (!res.ok) { if (attempt++ < 3) { await new Promise(r => setTimeout(r, 2000)); continue; } throw new Error('AniList ' + res.status); }
    const json = await res.json();
    for (const m of json.data.Page.media) { const slug = byAniId.get(m.id); if (slug) { const d = clean(m.description); if (d) out[slug] = d; } }
    break;
  }
  await new Promise(r => setTimeout(r, 1500));
  console.log(`fatti ${Object.keys(out).length}/${ids.length}`);
}

await mkdir(join(ROOT, 'editorial', 'en'), { recursive: true });
await writeFile(join(ROOT, 'editorial', 'en', 'anilist-desc.json'), JSON.stringify(out, null, 1) + '\n', 'utf8');
console.log(`✓ scritte ${Object.keys(out).length} descrizioni EN in editorial/en/anilist-desc.json`);
