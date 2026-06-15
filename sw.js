// GUARDALO service worker — cache "app shell" + network-first per i dati.
// Bump CACHE per forzare l'aggiornamento dopo un deploy.
const CACHE = 'guardalo-v10';
const SHELL = ['./', './index.html', './css/style.css', './js/app.js', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Network-first: si vede sempre l'ultima versione dopo un deploy; la cache è il
// fallback offline. Le copertine AniList (CDN) restano in cache una volta scaricate.
self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  e.respondWith(
    fetch(request).then(r => {
      if (r.ok && (url.origin === location.origin || url.hostname.endsWith('anilist.co'))) {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(request, copy));
      }
      return r;
    }).catch(() => caches.match(request).then(c => c || (request.mode === 'navigate' ? caches.match('./index.html') : undefined)))
  );
});
