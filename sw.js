const CACHE_NAME = 'easy-auto-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Network first, fallback to cache (good for GitHub Pages)
self.addEventListener('fetch', event => {
  // Skip non-GET and chrome extensions
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache valid responses
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(res => {
          if (res) return res;
          // If navigation fails, return index.html for SPA
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});