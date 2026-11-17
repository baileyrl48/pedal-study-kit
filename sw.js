/* Offline support. After the first visit, the app works with no connection.
   When you change any file, bump VERSION so phones pick up the new copy. */
const VERSION = 'v1';
const CACHE = 'pedal-study-' + VERSION;
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('pedal-study-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // The page itself: try the network first so updates show up, fall back to the saved copy offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Everything else (icons, Google Fonts): use the saved copy, refresh it in the background.
  e.respondWith(
    caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req)
        .then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; })
        .catch(() => hit);
      return hit || net;
    })
  );
});
