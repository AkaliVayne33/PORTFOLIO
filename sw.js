/* ============================================================
   SERVICE WORKER — StudioWeb Portfolio
   Strategy:
   - HTML, CSS and JS: network first (always the latest version together, no new HTML
     paired with an old stylesheet), cached copy when offline, offline.html as last resort
   - Images: cached copy right away, refreshed in the background
   Bump CACHE_NAME only to drop old cached files entirely.
   ============================================================ */

const CACHE_NAME = 'studioweb-v4';

const BASE = self.registration.scope;
const STATIC_ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'audit.html',       /* the page every sector page's sticky bar and banner point to */
  BASE + 'offline.html',
  BASE + 'assets/css/global.css',
  BASE + 'assets/js/main.js',
  BASE + 'manifest.json',
  BASE + 'assets/img/icon.svg',
  /* home grid photos (about 165 KB): the first one loads before the worker takes over */
  ...['sport', 'realestate', 'pharmacy', 'restaurant', 'beauty', 'clinic', 'tutoring', 'interior']
    .map((name) => BASE + 'assets/img/sectors/' + name + '.webp')
];

/* Only successful, same-origin responses are worth keeping (never a 404 or a 500) */
function cacheable(response) {
  return response && response.ok && response.type === 'basic';
}

/* Background copy into the cache: a failed write (storage full…) never breaks the page */
function store(event, request, response) {
  if (!cacheable(response)) return;
  const clone = response.clone();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {})
  );
}

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
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Skip cross-origin requests (Unsplash images, Google Fonts)
  if (url.origin !== self.location.origin) return;

  if (request.destination === 'image') {
    // Stale-while-revalidate: the response reaches the page as it downloads
    const network = fetch(request).then((response) => {
      store(event, request, response);
      return response;
    });
    event.waitUntil(network.then(() => undefined, () => undefined));
    event.respondWith(caches.match(request).then((cached) => cached || network));
    return;
  }

  // Network first for pages, styles and scripts.
  // Pages are cached under their address without the query string (?utm_…, ?fbclid…):
  // one copy per page, found again offline whatever tracking parameters the link carries.
  const isPage = request.mode === 'navigate';
  const key = isPage ? url.origin + url.pathname : request;
  event.respondWith(
    fetch(request)
      .then((response) => {
        store(event, key, response);
        return response;
      })
      .catch(async () =>
        (await caches.match(key)) ||
        (isPage ? await caches.match(BASE + 'offline.html') : undefined) ||
        Response.error())
  );
});
