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

self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // dati e immagini CDN: network-first (così gli aggiornamenti si vedono subito)
  const fresh = url.pathname.endsWith('/js/data.js') || url.hostname.endsWith('anilist.co');
  if (fresh) {
    e.respondWith(fetch(request).then(r => {
      const copy = r.clone();
      if (url.origin === location.origin) caches.open(CACHE).then(c => c.put(request, copy));
      return r;
    }).catch(() => caches.match(request)));
    return;
  }

  // resto (shell): cache-first, con fallback alla home per le rotte hash
  e.respondWith(caches.match(request).then(c => c || fetch(request).catch(() => caches.match('./index.html'))));
});
