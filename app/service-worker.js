const CACHE_NAME = "drinkerz-app-cache";
const urlsToCache = [
    "/",
    "/static/scripts/main.js",
    "/static/styles/main.css",
    "/static/media/images/pwa-images/logo-192.png",
    "/static/media/images/pwa-images/logo-512.png",
    "/manifest.webmanifest"
];

// Install service worker
self.addEventListener("install", event => {
    console.log("[ServiceWorker] Install"); // eslint-disable-line
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Opened cache"); // eslint-disable-line
                return cache.addAll(urlsToCache);
            })
    );
});

// Respond with cache (pre caching)
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});