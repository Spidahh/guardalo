// GUARDALO — KILL-SWITCH. Il vecchio service worker serviva una copia in cache
// obsoleta del sito. Questo si auto-distrugge: svuota tutte le cache, si
// disattiva e ricarica le pagine aperte. Il browser scarica sempre l'ultimo
// sw.js, quindi questo pulisce anche i visitatori bloccati sulla versione vecchia.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => { try { c.navigate(c.url); } catch (e) {} });
  })());
});

// Mentre è ancora attivo: NON servire mai dalla cache, vai sempre in rete.
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => new Response('', { status: 504 })));
});
