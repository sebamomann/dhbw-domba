// service-worker.js
const CACHE_NAME = "version-1";
const urlsToCache = [
  'index.html',
  '/css/main.css', // Add your CSS files
  '/js/app.js', // Add your JavaScript files
  '/images/logo.png', // Add essential images
  '/**/*'
];

let cacheVersion = 0;
let cacheName = `cache-v${cacheVersion}`;

function increment() {
  cacheVersion++;
  cacheName = `cache-v${cacheVersion}`;
}

self.addEventListener("install", (event) => {
  console.log("Attempting to install service worker and cache static assets");
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        //Update version
        increment();

        //add files to the cache
        return cache.addAll(staticAssets);
      })
      .catch((err) => console.log(err))
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        //If the response is found in the cache
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }

        return fetch(event.request).then((response) => {
          // If a response is not found
          if (response.status === 404) {
            return caches.open(cacheName).then((cache) => {
              return cache.match("404.html");
            });
          }

          //Caching and returning the response if it doesn't exist in the cache
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(async (error) => {
        console.log("Error, ", error);
        //If page is offline/ Network failure
        return caches.open(cacheName).then((cache) => {
          return cache.match("offline.html");
        });
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activating new service worker...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((storedCacheName) => {
          if (storedCacheName !== cacheName) {
            return caches.delete(storedCacheName);
          }
        })
      );
    })
  );
});


// Push notifications handler
self.addEventListener('push', event => {
  const data = event.data.json().notification;

  const title = data.title || 'Notification';
  const options = {
    body: data.body || 'You have a new message.',
    icon: data.icon || '/images/default-icon.png',
    // Other options
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
