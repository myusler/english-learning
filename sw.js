// Nama storan cache aplikasi anda
const CACHE_NAME = 'pwa-cache-v1';

// Senarai fail asas yang mahu disimpan untuk kegunaan offline (jika ada)
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. Fasa Kemasukan (Install) - Menyimpan fail asas ke dalam cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fasa Pengambilan (Fetch) - Membolehkan app dibuka dengan laju
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada dalam cache, guna cache. Jika tiada, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});
