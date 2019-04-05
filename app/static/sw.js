const CACHE_NAME = "drinkerz-app-cache";
const urlsToCache = [
    "./index.html",
    "./404.html",
    "./401.html",
    "./scripts/main.js",
    "./styles/main.css",
    "./media/images/pwa-images/icon-192.png",
    "./media/images/pwa-images/icon-512.png",
    "./manifest.webmanifest"
];

// Install service worker
self.addEventListener("install", event => {
    console.log("[ServiceWorker] Caching app shell"); // eslint-disable-line
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Respond with cache (pre caching)
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});