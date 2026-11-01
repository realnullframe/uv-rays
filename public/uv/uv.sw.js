/*globals __uv$config*/
// Force standard vendor script evaluation pipelines
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');

// Ultraviolet naturally populates a self.UVServiceWorker instance during bundle execution
const sw = new self.UVServiceWorker(__uv$config);

self.addEventListener('fetch', (event) => {
    event.respondWith(sw.fetch(event));
});
