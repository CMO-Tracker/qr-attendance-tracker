const CACHE_NAME = "qr-attendance-v1";
const CACHED_ASSETS = [
  "signin.html",
  "config.js",
  "departments.js",
  "nameParser.js",
  "logo.png",
  "manifest.json",
  "https://cdn.tailwindcss.com",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHED_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Cache-first, but ONLY for our precached static assets -- everything else
// (Supabase API calls especially) is deliberately left untouched and always
// goes straight to the network, so students never see stale attendance data.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const isCachedAsset = CACHED_ASSETS.some((asset) => event.request.url.endsWith(asset));
  if (!isCachedAsset) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});