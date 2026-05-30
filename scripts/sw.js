const CACHE_NAME = 'temples-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/filtered-temples.html',
  '/styles/filtered-temples.css',
  '/styles/filtered-temples-large.css',
  '/scripts/filtered-temples.js',
  '/images/hero-small.jpg',
  '/images/hero-image.jpg',
  '/images/manti-tah-temple.webp',
  '/images/washington-dc-temple.png',
  '/images/salt-ake-temple.webp',
  '/images/accra-ghana-temple.webp',
  '/images/nauvoo-illionois-temple.jpg',
  '/images/london-chapel.webp',
  '/images/bern-switzerland.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Simple runtime caching: images = cache-first, CSS/JS = stale-while-revalidate
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Cache-first for images
  if (req.destination === 'image' || url.pathname.startsWith('/images/')) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        const resClone = res.clone();
        return caches.open(CACHE_NAME).then(cache => { cache.put(req, resClone); return res; });
      })).catch(() => caches.match('/images/hero-small.jpg'))
    );
    return;
  }

  // Stale-while-revalidate for CSS/JS and fonts
  if (req.destination === 'style' || req.destination === 'script' || req.destination === 'font' || url.origin !== location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
          const network = fetch(req).then(res => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
            return res;
          }).catch(() => null);
          return cached || network;
        })
    );
    return;
  }

  // Default: network first then fallback to cache
  event.respondWith(
    fetch(req).then(res => res).catch(() => caches.match(req))
  );
});
