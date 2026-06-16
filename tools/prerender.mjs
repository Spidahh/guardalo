#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// GUARDALO — prerender SEO: genera HTML statico per titoli/generi/percorsi
// (meta + Open Graph + JSON-LD + contenuto leggibile) così i crawler e le
// anteprime social vedono il contenuto senza eseguire JavaScript.
// Genera anche sitemap.xml. Le pagine restano "app shell": al caricamento il
// JS sostituisce il contenuto con la SPA completa (progressive enhancement).
//
//   SITE_URL=https://tuodominio node tools/prerender.mjs
// ─────────────────────────────────────────────────────────────────────────
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Dominio del sito: SITE_URL esplicito → dominio di produzione Vercel (auto in build) → placeholder.
const SITE = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  'https://guardalo.example'
).replace(/\/$/, '');

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n = 158) => { s = (s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

const data = JSON.parse(await readFile(join(ROOT, 'dist', 'data.json'), 'utf8'));
const TITLES = data.titles, PATHS = data.paths;
const BY_ID = new Map(TITLES.map(t => [t.id, t]));
const itGenre = g => ({ Action: 'Azione', Adventure: 'Avventura', Comedy: 'Commedia', Drama: 'Drammatico', Fantasy: 'Fantasy', Horror: 'Horror', Mecha: 'Mecha', Music: 'Musicale', Mystery: 'Mistero', Psychological: 'Psicologico', Romance: 'Romantico', 'Sci-Fi': 'Fantascienza', 'Slice of Life': 'Slice of Life', Sports: 'Sport', Supernatural: 'Soprannaturale', Thriller: 'Thriller' }[g] || g);
const rankSort = (a, b) => (b.top ? 1 : 0) - (a.top ? 1 : 0) || (b.userRating || 0) - (a.userRating || 0) || (b.score10 || 0) - (a.score10 || 0);
// FONTE UNICA: la tassonomia (generi mostrati + appartenenza titoli→genere) sta in
// editorial/categories.json, già inclusa in dist/data.json da `npm run gen`. Niente duplicati.
const CAT = data.categories || {};
const GENRE_IDS = CAT.genreOrder || [];
const CAT_MEMBERS = CAT.members || {};
if (!GENRE_IDS.length || !Object.keys(CAT_MEMBERS).length) throw new Error('prerender: manca data.categories — esegui `npm run gen`');
const pathTitles = p => { const seen = new Set(), out = []; (p.levels || []).forEach(l => (l.titles || []).forEach(id => { if (!seen.has(id)) { seen.add(id); const t = BY_ID.get(id); if (t) out.push(t); } })); return out; };
// titoli di un percorso/genere — stessa logica di catTitles() in js/app.js: per i generi = membri
// curati CAT_MEMBERS + eventuali titoli non-inList nei levels; per i percorsi = i levels.
const sectionTitles = p => {
  if (!CAT_MEMBERS[p.id]) return pathTitles(p);
  const map = new Map();
  CAT_MEMBERS[p.id].forEach(s => { const t = BY_ID.get(s); if (t) map.set(s, t); });
  pathTitles(p).forEach(t => { if (t && !t.inList) map.set(t.id, t); });
  return [...map.values()];
};

const tmpl = await readFile(join(ROOT, 'index.html'), 'utf8');

function page({ urlPath, title, desc, ogImage, jsonld, content }) {
  let h = tmpl;
  h = h.replace('<title>GUARDALO — La guida agli anime</title>', `<title>${esc(title)}</title>`);
  h = h.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`);
  h = h.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  h = h.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`);
  if (ogImage) h = h.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(ogImage)}">`);
  const canon = `<link rel="canonical" href="${SITE}${urlPath}">`;
  const ld = jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : '';
  h = h.replace('</head>', `${canon}${ld}\n</head>`);
  h = h.replace('<main id="app" class="app"></main>', `<main id="app" class="app">${content}</main>`);
  return h;
}
async function emit(urlPath, html) {
  const dir = join(ROOT, urlPath);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
}

const urls = ['/'];

// ── titoli ───────────────────────────────────────────────────────────────
for (const t of TITLES) {
  const genres = (t.genres || []).map(itGenre).join(', ');
  const steps = (t.structure || []).filter(s => s.main).map(s => `<li>${esc(s.name)} — ${esc(s.episodes)}${s.year ? ` (${s.year})` : ''}</li>`).join('');
  const tips = (t.tips || []).map(x => `<li>${esc(x)}</li>`).join('');
  const content = `<article>
    <h1>${esc(t.title)}${t.year ? ` (${t.year})` : ''}</h1>
    <p>${esc(t.hook || '')}</p>
    <p><strong>Genere:</strong> ${esc(genres)}.${t.studios && t.studios.length ? ` <strong>Studio:</strong> ${esc(t.studios.join(', '))}.` : ''}${t.director ? ` <strong>Regia:</strong> ${esc(t.director)}.` : ''} <strong>Durata:</strong> ${esc(t.lengthLabel)}.${t.score10 ? ` <strong>Voto:</strong> ${t.score10}/10.` : ''}</p>
    ${steps ? `<h2>Da dove iniziare</h2><ol>${steps}</ol>` : ''}
    ${tips ? `<h2>Dritte per la visione</h2><ul>${tips}</ul>` : ''}
    <p><a href="/">GUARDALO — la guida agli anime</a></p>
  </article>`;
  const jsonld = {
    '@context': 'https://schema.org', '@type': t.typeLabel === 'Film' ? 'Movie' : 'TVSeries',
    name: t.title, image: t.coverImage || undefined, description: t.hook || undefined,
    ...(t.year ? { datePublished: String(t.year) } : {}), genre: (t.genres || []).map(itGenre),
    ...(t.studios && t.studios.length ? { productionCompany: t.studios.map(s => ({ '@type': 'Organization', name: s })) } : {}),
    ...(t.score10 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: t.score10, bestRating: 10, worstRating: 1, ratingCount: Math.max(1, t.popularity || 1) } } : {}),
  };
  const url = `/t/${t.id}`;
  await emit(url, page({ urlPath: url, title: `${t.title}${t.year ? ` (${t.year})` : ''} — dove vederlo e da dove iniziare · GUARDALO`, desc: clip(t.hook || `${t.title}: scheda, dove vederlo, quanto dura.`), ogImage: t.coverImage, jsonld, content }));
  urls.push(url);
}

// ── tutti i percorsi (generi + tematici + meta) ──────────────────────────
for (const p of PATHS) {
  const list = sectionTitles(p).sort(rankSort);
  const items = list.map(t => `<li><a href="/t/${t.id}">${esc(t.title)}</a>${t.year ? ` (${t.year})` : ''}${t.score10 ? ` — ${t.score10}/10` : ''}</li>`).join('');
  const content = `<section>
    <h1>${esc(p.title)}</h1>
    <p>${esc(p.about || p.blurb || p.tagline || '')}</p>
    ${p.curiosita ? `<p><strong>Lo sapevi?</strong> ${esc(p.curiosita)}</p>` : ''}
    <h2>Titoli di ${esc(p.title)}</h2>
    <ul>${items}</ul>
  </section>`;
  const url = `/p/${p.id}`;
  const isGenre = GENRE_IDS.includes(p.id);
  await emit(url, page({ urlPath: url, title: `${p.title} — ${isGenre ? 'i migliori anime del genere' : 'percorso'} · GUARDALO`, desc: clip(p.about || p.blurb), content }));
  urls.push(url);
}

// ── pagine indice /generi e /percorsi ────────────────────────────────────
const indexPage = (slug, h1, sub, list) => {
  const items = list.map(p => `<li><a href="/p/${p.id}">${esc(p.title)}</a> — ${esc(p.blurb || p.tagline || '')}</li>`).join('');
  return page({ urlPath: `/${slug}`, title: `${h1} · GUARDALO`, desc: sub, content: `<section><h1>${esc(h1)}</h1><p>${esc(sub)}</p><ul>${items}</ul></section>` });
};
const GENRE_LIST = GENRE_IDS.map(id => PATHS.find(p => p.id === id)).filter(Boolean);
const PERCORSI_LIST = ['da-zero-a-otaku', 'capolavori', 'azione', 'antieroi', 'il-canone', 'chicche-e-deep-cut'].map(id => PATHS.find(p => p.id === id)).filter(Boolean);
await emit('/generi', indexPage('generi', 'Generi', 'Tutti i generi: azione, mindfuck, horror, sci-fi, isekai e altro.', GENRE_LIST));
await emit('/percorsi', indexPage('percorsi', 'Percorsi', 'Viaggi tematici curati: da dove iniziare, i capolavori, gli antieroi e altro.', PERCORSI_LIST));
urls.push('/generi', '/percorsi');

// ── pagine statiche (Chi sono / Privacy / Cookie) ────────────────────────
const docs = [
  ['info', 'Chi sono', 'GUARDALO è una guida agli anime creata da Francesco Spidah: selezione, testi e percorsi sono curatela personale. Dati e immagini da AniList.'],
  ['privacy', 'Privacy Policy', 'Come GUARDALO tratta i tuoi dati: navigazione anonima, login opzionale con Google, eventuale pubblicità. Titolare: Francesco Spidah.'],
  ['cookie', 'Cookie Policy', 'I cookie usati da GUARDALO (tecnici necessari, funzionali e pubblicitari) e come gestire il consenso.'],
];
for (const [slug, h1, sub] of docs) {
  await emit('/' + slug, page({ urlPath: '/' + slug, title: `${h1} · GUARDALO`, desc: clip(sub), content: `<section><h1>${esc(h1)}</h1><p>${esc(sub)}</p><p><a href="/">Torna alla home</a></p></section>` }));
  urls.push('/' + slug);
}

// ── sitemap.xml ──────────────────────────────────────────────────────────
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n`
  + urls.map(u => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc></url>`).join('\n')
  + `\n</urlset>\n`;
await writeFile(join(ROOT, 'sitemap.xml'), sitemap.replace('sitemap.org/schemas', 'sitemaps.org/schemas'), 'utf8');

// ── robots.txt (generato col dominio reale, così la Sitemap punta giusto) ──
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
await writeFile(join(ROOT, 'robots.txt'), robots, 'utf8');

const placeholder = SITE === 'https://guardalo.example';
console.log(`✓ prerender: ${TITLES.length} titoli + ${PATHS.length} percorsi/generi`);
console.log(`✓ sitemap.xml (${urls.length} URL) + robots.txt  ·  dominio = ${SITE}`);
if (placeholder) console.log(`  NB: dominio placeholder. In locale passa SITE_URL; su Vercel è automatico (VERCEL_PROJECT_PRODUCTION_URL).`);
