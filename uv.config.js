/* This file tells the browser client how to map proxy paths */
self.__uv$config = {
    prefix: '/uv/service/',
    bare: '/bare/',
    encodeUrl: function(url) {
        return btoa(url).replace(/=/g, '');
    },
    decodeUrl: function(str) {
        return atob(str);
    },
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};
