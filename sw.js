// Simple Service Worker for Performance Optimization
// Optional: Register this in index.html to enable offline caching

const CACHE_NAME = 'rum-diary-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/index.css',
  '/styles/mobile.css',
  '/script/app.js',
  '/script/carousel.js',
  '/fonts/alegreya-v29-latin-regular.woff2',
  '/assets/bite.webp',
  '/assets/waterfalls.webp',
  '/assets/bounce.webp',
  '/assets/video-placeholder.webp',
  '/logo.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));

          return response;
        });
      })
  );
});
