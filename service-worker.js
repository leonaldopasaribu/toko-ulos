const CACHE_NAME = "parnaulos";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/kupon.html",
  "/pages/produk.html",
  "/pages/profile.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/script.js",
  "/js/register-service.js",
  "/manifest.json",
  "/asset/ulos1.jpg",
  "/asset/ulos2.jpg",
  "/asset/ulos3.jpg",
  "/asset/songket1.jpg",
  "/asset/songket2.jpg",
  "/asset/songket3.jpg",
  "/asset/voucher.jpg",
  "/asset/profile.jpeg",
  "/asset/1.jpg",
  "/asset/2.jpg",
  "/asset/icons/icon-72x72.png",
  "/asset/icons/icon-96x96.png",
  "/asset/icons/icon-128x128.png",
  "/asset/icons/icon-144x144.png",
  "/asset/icons/icon-152x152.png",
  "/asset/icons/icon-192x192.png",
  "/asset/icons/icon-384x384.png",
  "/asset/icons/icon-512x512.png",
  "/favicon.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Using asset from cache : ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Load some asset from server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
