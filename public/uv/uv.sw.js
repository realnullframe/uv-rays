// Pull verified compiled scripts directly from the official web delivery network
importScripts('https://jsdelivr.net');
importScripts('https://jsdelivr.net');

// Minimal script backup in case your root config isn't read by the worker frame context
if (!self.__uv$config) {
    self.__uv$config = {
        prefix: '/uv/service/',
        bare: '/bare/',
        encodeUrl: function(url) { return btoa(url).replace(/=/g, ''); },
        decodeUrl: function(str) { return atob(str); }
    };
}

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
    event.respondWith(sw.fetch(event));
});
