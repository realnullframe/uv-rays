// Force imports from the official compiled distribution network
importScripts('https://jsdelivr.net');
importScripts('https://jsdelivr.net');
importScripts('/uv/uv.config.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
    event.respondWith(sw.fetch(event));
});
