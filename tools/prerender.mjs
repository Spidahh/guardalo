#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// GUARDALO — prerender SEO multilingua.
// Genera HTML statico per titoli/generi/percorsi (meta + OG + JSON-LD +
// contenuto leggibile) così i crawler vedono il contenuto senza eseguire JS.
// Italiano alla radice (/…), inglese sotto /en/…. Genera sitemap con hreflang.
//   SITE_URL=https://tuodominio node tools/prerender.mjs
// ─────────────────────────────────────────────────────────────────────────
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { I18N, LANGS, HOME_EN } from './i18n.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  'https://guardalo.example'
).replace(/\/$/, '');

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n = 158) => { s = (s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

const data = JSON.parse(await readFile(join(ROOT, 'dist', 'data.json'), 'utf8'));
const EN_PATHS = JSON.parse(await readFile(join(ROOT, 'editorial', 'en', 'paths.json'), 'utf8'));
const EN_TITLES = JSON.parse(await readFile(join(ROOT, 'editorial', 'en', 'titles.json'), 'utf8'));
const EN_DESC = JSON.parse(await readFile(join(ROOT, 'editorial', 'en', 'anilist-desc.json'), 'utf8'));

const rankSort = (a, b) => (b.userRating || 0) - (a.userRating || 0) || (b.score10 || 0) - (a.score10 || 0);
const CAT = data.categories || {};
const GENRE_IDS = CAT.genreOrder || [];
const CAT_MEMBERS = CAT.members || {};
const TIERS = CAT.tiers || {};
if (!GENRE_IDS.length || !Object.keys(CAT_MEMBERS).length) throw new Error('prerender: manca data.categories — esegui `npm run gen`');
const ESSENTIAL_IDS = new Set();
for (const pid in TIERS) { const m = TIERS[pid]; for (const id in m) if (m[id] === 'e') ESSENTIAL_IDS.add(id); }

// Testo EN del titolo: traduzione curata a mano se c'è, altrimenti sinossi AniList. Niente → niente pagina.
const enHook = id => (EN_TITLES[id] && EN_TITLES[id].hook) || EN_DESC[id] || null;
const hasEN = id => !!enHook(id);

// Dataset localizzato: EN sovrascrive i SOLI testi editoriali; i dati AniList restano.
function localize(lang) {
  if (lang === 'it') return { titles: data.titles, paths: data.paths, home: data.home || {} };
  const titles = data.titles.map(t => (hasEN(t.id) ? { ...t, hook: enHook(t.id) } : { ...t }));
  const paths = data.paths.map(p => {
    const e = EN_PATHS[p.id];
    return e ? { ...p, title: e.title, tagline: e.tagline ?? p.tagline, blurb: e.blurb ?? p.blurb, about: e.about ?? p.about } : { ...p };
  });
  const home = { ...(data.home || {}), hero: { ...((data.home || {}).hero || {}), title: HOME_EN.title, sub: HOME_EN.sub } };
  return { titles, paths, home };
}

// ── cache-busting automatico (hash del contenuto) ────────────────────────
const hashOf = async f => createHash('sha1').update(await readFile(join(ROOT, f))).digest('hex').slice(0, 8);
const ASSET_V = { 'css/style.css': await hashOf('css/style.css'), 'js/app.js': await hashOf('js/app.js'), 'js/data.js': await hashOf('js/data.js') };
let baseTmpl = await readFile(join(ROOT, 'index.html'), 'utf8');
for (const [file, v] of Object.entries(ASSET_V)) {
  const escp = file.replace(/[.]/g, '\\$&');
  baseTmpl = baseTmpl.replace(new RegExp(escp + '\\?v=[\\w.]+', 'g'), `${file}?v=${v}`);
}

// Header statico inglese (niente JS: solo navigazione tra pagine statiche + switch lingua).
const EN_SIDEBAR = `<aside class="sidebar" id="sidebar">
            <a class="side-brand" href="/en/" aria-label="GUARDALO — home">
                <span class="brand-word">GUARDALO</span>
                <span class="brand-tag">The anime guide</span>
            </a>
            <nav class="side-nav">
                <a href="/en/"><i class="ri-home-5-line"></i><span>Home</span></a>
                <a href="/en/generi"><i class="ri-shapes-line"></i><span>Genres</span></a>
                <a href="/en/percorsi"><i class="ri-route-line"></i><span>Paths</span></a>
                <a href="/en/essenziali"><i class="ri-star-line"></i><span>The Best</span></a>
            </nav>
            <div class="side-group">
                <span class="side-group-h">Language</span>
                <nav class="side-time-nav" aria-label="Language">
                    <a href="/"><i class="ri-global-line"></i><span>Italiano</span></a>
                </nav>
            </div>
        </aside>`;
const EN_TOPBAR = `<div class="topbar">
                <a class="side-brand" href="/en/"><span class="brand-word">GUARDALO</span></a>
                <a href="/" class="topbar-admin" title="Italiano"><i class="ri-global-line"></i><span>Italiano</span></a>
            </div>`;

const EN_BOTTOMNAV = `<nav class="bottom-nav" aria-label="Main navigation">
        <a href="/en/"><i class="ri-home-5-line"></i><span>Home</span></a>
        <a href="/en/generi"><i class="ri-shapes-line"></i><span>Genres</span></a>
        <a href="/en/percorsi"><i class="ri-route-line"></i><span>Paths</span></a>
        <a href="/en/essenziali"><i class="ri-star-line"></i><span>Best</span></a>
    </nav>`;
const EN_FOOTER = `<footer class="foot">
                <div class="foot-in">
                    <div class="foot-brand">
                        <span class="foot-logo">GUARDALO</span>
                        <span class="foot-tag">Anime picked and explained, no wasted time.</span>
                    </div>
                    <nav class="foot-links">
                        <a href="/en/info">About</a>
                        <a href="/en/privacy">Privacy</a>
                        <a href="/en/cookie">Cookie</a>
                        <a href="https://anilist.co" target="_blank" rel="noopener">AniList</a>
                    </nav>
                </div>
                <p class="foot-legal">© 2026 <b>Francesco Spidah</b> — texts and editorial selection. Data and images from AniList. All titles and trademarks belong to their respective owners. <span class="foot-ver">v12.86</span></p>
            </footer>`;

function template(lang) {
  let t = baseTmpl;
  if (lang === 'en') {
    t = t.replace('<html lang="it">', '<html lang="en">');
    t = t.replace(/<aside class="sidebar" id="sidebar">[\s\S]*?<\/aside>/, EN_SIDEBAR);
    t = t.replace(/<div class="topbar">[\s\S]*?<\/div>/, EN_TOPBAR);
    t = t.replace('<a class="skip-link" href="#app">Vai al contenuto</a>', '<a class="skip-link" href="#app">Skip to content</a>');
    t = t.replace(/<footer class="foot">[\s\S]*?<\/footer>/, EN_FOOTER);
    t = t.replace(/<nav class="bottom-nav"[\s\S]*?<\/nav>/, EN_BOTTOMNAV);
  }
  return t;
}

function page(lang, { fullPath, title, desc, ogImage, jsonld, content, alternates }) {
  let h = template(lang);
  const ogLoc = lang === 'en' ? 'en_US' : 'it_IT';
  const ogAlt = lang === 'en' ? 'it_IT' : 'en_US';
  h = h.replace('<meta property="og:type" content="website">', `<meta property="og:type" content="website"><meta property="og:locale" content="${ogLoc}"><meta property="og:locale:alternate" content="${ogAlt}">`);
  h = h.replace('<title>GUARDALO — La guida agli anime</title>', `<title>${esc(title)}</title>`);
  h = h.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`);
  h = h.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  h = h.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`);
  h = h.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${SITE}${fullPath}">`);
  if (ogImage) h = h.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(ogImage)}">`);
  const canon = `<link rel="canonical" href="${SITE}${fullPath}">`;
  const alts = (alternates || []).map(a => `<link rel="alternate" hreflang="${a.lang}" href="${SITE}${a.href}">`).join('');
  const ldArr = jsonld ? (Array.isArray(jsonld) ? jsonld : [jsonld]) : [];
  const ld = ldArr.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('');
  h = h.replace(/<link rel="canonical"[^>]*>/g, '').replace(/<link rel="alternate" hreflang[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  h = h.replace('</head>', `${canon}${alts}${ld}\n</head>`);
  h = h.replace(/<main id="app"[^>]*>[\s\S]*?<\/main>/, `<main id="app" class="app" tabindex="-1">${content}</main>`);
  return h;
}

async function emit(fullPath, html) {
  const dir = join(ROOT, fullPath);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
}

// costruisce la lista di alternate hreflang per un percorso-base, dati i lang disponibili
const fullOf = (lang, base) => { const P = I18N[lang].prefix; return base === '/' ? (P || '') + '/' : P + base; };
function alternatesFor(base, langsAvail) {
  const arr = langsAvail.map(l => ({ lang: I18N[l].htmlLang, href: fullOf(l, base) }));
  arr.push({ lang: 'x-default', href: fullOf('it', base) });
  return arr;
}

const allUrls = { it: [], en: [] };

async function buildLang(lang) {
  const L = I18N[lang];
  const P = L.prefix;
  const D = localize(lang);
  const TITLES = D.titles, PATHS = D.paths, HOME = D.home;
  const BY_ID = new Map(TITLES.map(t => [t.id, t]));
  const byId = new Map(PATHS.map(p => [p.id, p]));
  const sectionTitles = p => (CAT_MEMBERS[p.id] || []).map(s => BY_ID.get(s)).filter(Boolean);
  const essentialTitles = () => [...ESSENTIAL_IDS].map(id => BY_ID.get(id)).filter(Boolean).sort(rankSort);
  const sectionOf = id => GENRE_IDS.find(g => (CAT_MEMBERS[g] || []).includes(id)) || null;
  const crumb = items => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE + P + it.url })) });
  const WEBSITE = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'GUARDALO', url: SITE + fullOf(lang, '/'), inLanguage: L.htmlLang, description: L.homeDesc };
  const urls = [];
  const push = base => urls.push(base);

  // ── titoli ──
  for (const t of TITLES) {
    if (lang === 'en' && !hasEN(t.id)) continue;   // niente pagina EN se non tradotta
    const genres = (t.genres || []).map(L.genre).join(', ');
    const steps = (t.structure || []).filter(s => s.main).map(s => `<li>${esc(s.name)} — ${esc(s.episodes)}${s.year ? ` (${s.year})` : ''}</li>`).join('');
    const tips = (t.tips || []).map(x => `<li>${esc(x)}</li>`).join('');
    const content = `<article>
    <h1>${esc(t.title)}${t.year ? ` (${t.year})` : ''}</h1>
    <p>${esc(t.hook || '')}</p>
    <p><strong>${L.lblGenere}:</strong> ${esc(genres)}.${t.studios && t.studios.length ? ` <strong>${L.lblStudio}:</strong> ${esc(t.studios.join(', '))}.` : ''}${t.director ? ` <strong>${L.lblRegia}:</strong> ${esc(t.director)}.` : ''} <strong>${L.lblDurata}:</strong> ${esc(t.lengthLabel)}.${t.score10 ? ` <strong>${L.lblVoto}:</strong> ${t.score10}/10.` : ''}</p>
    ${steps ? `<h2>${L.hDaDoveIniziare}</h2><ol>${steps}</ol>` : ''}
    ${tips ? `<h2>${L.hDritte}</h2><ul>${tips}</ul>` : ''}
    <p><a href="${P}/">${esc(L.guideLink)}</a></p>
  </article>`;
    const titleLD = {
      '@context': 'https://schema.org', '@type': t.typeLabel === 'Film' ? 'Movie' : 'TVSeries',
      inLanguage: L.htmlLang,
      name: t.title, image: t.coverImage || undefined, description: t.hook || undefined,
      ...(t.year ? { datePublished: String(t.year) } : {}), genre: (t.genres || []).map(L.genre),
      ...(t.studios && t.studios.length ? { productionCompany: t.studios.map(s => ({ '@type': 'Organization', name: s })) } : {}),
      ...(t.score10 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: t.score10, bestRating: 10, worstRating: 1, ratingCount: Math.max(1, t.popularity || 1) } } : {}),
    };
    const sg = sectionOf(t.id);
    const jsonld = [titleLD, crumb([{ name: L.crumbHome, url: '/' }, ...(sg ? [{ name: byId.get(sg)?.title || sg, url: '/p/' + sg }] : []), { name: t.title, url: '/t/' + t.id }])];
    const base = `/t/${t.id}`;
    const langsAvail = hasEN(t.id) ? ['it', 'en'] : ['it'];
    await emit(fullOf(lang, base), page(lang, { fullPath: fullOf(lang, base), title: `${t.title}${t.year ? ` (${t.year})` : ''} ${L.titleSuffixTitolo}`, desc: clip(t.hook || L.descTitoloFallback(t)), ogImage: t.coverImage, jsonld, content, alternates: alternatesFor(base, langsAvail) }));
    push(base);
  }

  // ── percorsi (generi + tematici) ──
  for (const p of PATHS) {
    const list = sectionTitles(p).sort(rankSort);
    const items = list.map(t => `<li><a href="${P}/t/${t.id}">${esc(t.title)}</a>${t.year ? ` (${t.year})` : ''}${t.score10 ? ` — ${t.score10}/10` : ''}</li>`).join('');
    const content = `<section>
    <h1>${esc(p.title)}</h1>
    <p>${esc(p.about || p.blurb || p.tagline || '')}</p>
    <h2>${esc(L.titoliDi(p.title))}</h2>
    <ul>${items}</ul>
  </section>`;
    const base = `/p/${p.id}`;
    const isGenre = GENRE_IDS.includes(p.id);
    const bc = crumb([{ name: L.crumbHome, url: '/' }, { name: isGenre ? L.crumbGeneri : L.crumbPercorsi, url: isGenre ? '/generi' : '/percorsi' }, { name: p.title, url: base }]);
    await emit(fullOf(lang, base), page(lang, { fullPath: fullOf(lang, base), title: `${p.title} ${isGenre ? L.pathGenreSuffix : L.pathPercorsoSuffix}`, desc: clip(p.about || p.blurb), jsonld: bc, content, alternates: alternatesFor(base, ['it', 'en']) }));
    push(base);
  }

  // ── /essenziali ──
  {
    const list = essentialTitles();
    const items = list.map(t => `<li><a href="${P}/t/${t.id}">${esc(t.title)}</a>${t.year ? ` (${t.year})` : ''}${t.score10 ? ` — ${t.score10}/10` : ''}</li>`).join('');
    const content = `<section>
    <h1>${L.bestH1}</h1>
    <p>${L.bestIntro}</p>
    <ol>${items}</ol>
  </section>`;
    await emit(fullOf(lang, '/essenziali'), page(lang, { fullPath: fullOf(lang, '/essenziali'), title: `${L.bestH1} · GUARDALO`, desc: L.bestDesc, content, alternates: alternatesFor('/essenziali', ['it', 'en']) }));
    push('/essenziali');
  }

  // ── /generi e /percorsi ──
  const indexPage = (slug, h1, sub, list) => {
    const items = list.map(p => `<li><a href="${P}/p/${p.id}">${esc(p.title)}</a> — ${esc(p.blurb || p.tagline || '')}</li>`).join('');
    return page(lang, { fullPath: fullOf(lang, `/${slug}`), title: `${h1} · GUARDALO`, desc: sub, content: `<section><h1>${esc(h1)}</h1><p>${esc(sub)}</p><ul>${items}</ul></section>`, alternates: alternatesFor(`/${slug}`, ['it', 'en']) });
  };
  const GENRE_LIST = GENRE_IDS.map(id => byId.get(id)).filter(Boolean);
  const PERCORSI_LIST = (CAT.percorsoOrder || []).map(id => byId.get(id)).filter(Boolean);
  await emit(fullOf(lang, '/generi'), indexPage('generi', L.generiH1, L.generiSub, GENRE_LIST));
  await emit(fullOf(lang, '/percorsi'), indexPage('percorsi', L.percorsiH1, L.percorsiSub, PERCORSI_LIST));
  push('/generi'); push('/percorsi');

  // ── HOME ──
  {
    const secList = (label, list) => `<h2>${label}</h2><ul>${list.map(p => `<li><a href="${P}/p/${p.id}">${esc(p.title)}</a>${p.blurb ? ` — ${esc(clip(p.blurb, 90))}` : ''}</li>`).join('')}</ul>`;
    const homeContent = `<section>
    <h1>${esc((HOME.hero && HOME.hero.title) || L.heroTitleFallback)}</h1>
    <p>${esc((HOME.hero && HOME.hero.sub) || '')}</p>
    ${secList(L.crumbGeneri, GENRE_LIST)}
    ${secList(L.crumbPercorsi, PERCORSI_LIST)}
  </section>`;
    await emit(fullOf(lang, '/'), page(lang, { fullPath: fullOf(lang, '/'), title: L.homeTitle, desc: L.homeDesc, jsonld: WEBSITE, content: homeContent, alternates: alternatesFor('/', ['it', 'en']) }));
  }

  // ── pagine statiche (info/privacy/cookie) ──
  for (const [slug, h1, sub] of L.docs) {
    const base = '/' + slug;
    await emit(fullOf(lang, base), page(lang, { fullPath: fullOf(lang, base), title: `${h1} · GUARDALO`, desc: clip(sub), content: `<section><h1>${esc(h1)}</h1><p>${esc(sub)}</p><p><a href="${P}/">${esc(L.backHome)}</a></p></section>`, alternates: alternatesFor(base, ['it', 'en']) }));
    push(base);
  }

  allUrls[lang] = urls;
}

for (const lang of LANGS) await buildLang(lang);

// ── sitemap.xml (con alternate hreflang) ──
function urlEntry(base) {
  const langsAvail = base.startsWith('/t/') ? (hasEN(base.slice(3)) ? ['it', 'en'] : ['it']) : ['it', 'en'];
  const links = langsAvail.map(l => `    <xhtml:link rel="alternate" hreflang="${I18N[l].htmlLang}" href="${SITE}${fullOf(l, base)}"/>`).join('\n');
  return langsAvail.map(l => `  <url><loc>${SITE}${fullOf(l, base)}</loc>\n${links}\n  </url>`).join('\n');
}
const homeEntry = `  <url><loc>${SITE}/</loc>\n    <xhtml:link rel="alternate" hreflang="it" href="${SITE}/"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/en/"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>\n  </url>`;
const bases = allUrls.it; // insieme completo dei percorsi-base (IT li ha tutti)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`
  + homeEntry + '\n'
  + bases.map(urlEntry).join('\n')
  + `\n</urlset>\n`;
await writeFile(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
await writeFile(join(ROOT, 'robots.txt'), robots, 'utf8');

const nIt = allUrls.it.length + 1, nEn = allUrls.en.length + 1;
console.log(`✓ prerender IT: ${nIt} pagine · EN: ${nEn} pagine`);
console.log(`✓ sitemap.xml con hreflang · dominio = ${SITE}`);
