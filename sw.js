const CACHE = 'shadowx-v6';
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/','/index.html'])));
    self.skipWaiting();
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))));
    self.clients.claim();
});
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});