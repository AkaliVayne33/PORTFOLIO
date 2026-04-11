/* ============================================================
   SERVICE WORKER — StudioWeb Portfolio
   Strategy: Cache-first for static assets, network-first for HTML
   ============================================================ */

const CACHE_NAME = 'studioweb-v1';

const STATIC_ASSETS = [
  '/PORTFOLIO/',
  '/PORTFOLIO/index.html',
  '/PORTFOLIO/offline.html',
  '/PORTFOLIO/assets/css/global.css',
  '/PORTFOLIO/assets/js/main.js',
  '/PORTFOLIO/manifest.json',
  '/PORTFOLIO/assets/img/icon.svg'
];

/* ── Install: pre-cache core shell ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── Fetch: network-first for HTML, cache-first for everything else ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (Unsplash images, Google Fonts)
  if (url.origin !== self.location.origin) return;

  if (request.headers.get('accept')?.includes('text/html')) {
    // Network-first for HTML pages, fallback to offline.html
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request) || caches.match('/PORTFOLIO/offline.html'))
    );
  } else {
    // Cache-first for CSS, JS, images
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
  }
});
