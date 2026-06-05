// GUARDALO — Service Worker NEUTRALIZZATO (fase di sviluppo).
// Durante il redesign il caching causava versioni vecchie "appiccicate" nel browser.
// Questo SW si auto-distrugge: svuota tutte le cache, si disregistra e ricarica le
// schede aperte una volta, così si vede SEMPRE l'ultima versione.
// Verrà rimesso un service worker vero (offline/PWA) solo prima del lancio.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
        await self.registration.unregister();
        const clients = await self.clients.matchAll({ type: 'window' });
        clients.forEach(c => c.navigate(c.url));
    })());
});
