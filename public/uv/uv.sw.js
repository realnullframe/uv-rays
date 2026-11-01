// Force the Service Worker to import the fully compiled library bundle directly
importScripts('https://jsdelivr.net');
importScripts('/uv/uv.handler.js');
importScripts('/uv/uv.config.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
    event.respondWith(sw.fetch(event));
});
