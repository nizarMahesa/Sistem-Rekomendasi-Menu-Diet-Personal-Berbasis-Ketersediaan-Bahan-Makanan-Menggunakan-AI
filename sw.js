const CACHE_NAME = 'dietplan-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/data.js',
  '/app.js',
  '/rekomendasi.html',
  '/detail.html',
  '/bahan.html'
];

self.addEventListener('install', (evt)=>{
  evt.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (evt)=>{
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt)=>{
  evt.respondWith(caches.match(evt.request).then(r=> r || fetch(evt.request).then(resp=>{ try{ if(evt.request.method==='GET') caches.open(CACHE_NAME).then(c=>c.put(evt.request, resp.clone())); }catch(e){} return resp; } )));
});