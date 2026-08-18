// N Kitchen service worker — offline-first for static assets, but always
// prefers a fresh copy for pages (HTML navigations) so updates after a
// deploy show up immediately instead of being stuck behind a stale cache.
// Falls back to the cached copy only when the network is unavailable
// (i.e. actually offline), which is what keeps the app usable offline.
const CACHE_NAME = "n-kitchen-v2";
const APP_SHELL = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache the AI backend — must always be a live, opt-in call.
  if (url.pathname.startsWith("/api/")) return;

  // Pages (navigations) and their data: always try the network first so a
  // new deploy is visible right away. Only fall back to the cache when
  // there's genuinely no network (offline use).
  const isNavigation = request.mode === "navigate";
  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
    );
    return;
  }

  // Static assets (JS/CSS/images/fonts): cache-first for speed, refreshed
  // in the background on every request.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
