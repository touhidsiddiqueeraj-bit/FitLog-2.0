<<<<<<< HEAD
/* ============================================
   FitLog Service Worker — Offline + Cache
   ============================================ */

const CACHE_NAME = 'fitlog-v1';

// Files to pre-cache on install
const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap'
];

// ── Install: pre-cache core assets ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local files strictly; external ones best-effort
      const local  = PRECACHE_URLS.filter(u => !u.startsWith('http'));
      const remote = PRECACHE_URLS.filter(u =>  u.startsWith('http'));
      return cache.addAll(local).then(() =>
        Promise.allSettled(remote.map(url => cache.add(url)))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: delete old caches ─────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for local, network-first for API calls ───
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Never intercept Gemini / cloud API calls — always go live
  if (
    url.hostname.includes('generativelanguage.googleapis.com') ||
    url.hostname.includes('jsonblob.com') ||
    url.hostname.includes('world.openfoodfacts.org') ||
    url.hostname.includes('exercisedb.io') ||
    request.method !== 'GET'
  ) {
    return; // let the browser handle it normally
  }

  // Cache-first strategy for everything else
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request)
        .then(response => {
          // Only cache valid responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, toCache));
          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
=======
const CACHE_NAME = 'fitlog-v2';
const ASSETS = [
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => {
      return c.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  
  if (url.hostname === 'fitnessprogramer.com' || url.hostname === 'www.youtube.com') {
    e.respondWith(
      caches.match(e.request).then(r => {
        return r || fetch(e.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => {
      if (e.request.destination === 'document') {
        return caches.match('/index.html');
      }
    }))
  );
});
>>>>>>> 3608f923cde68baff1305b784270237b4dbe2aae
