importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.2/workbox-sw.js');

self.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
    /\.(css|js)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'resources',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 64
            })
        ]
    })
);

workbox.routing.registerRoute(
    /\.html$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'pages',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 64
            })
        ]
    })
);

workbox.routing.setCatchHandler(async ({request: {destination}}) => {
    // Works if I uncomment this code:
    //     const precache = await workbox.precaching.matchPrecache(url);
    //     if (precache) {
    //         return precache;
    //     }
    if (destination === 'document' || destination === '') {
        const cacheResponse = await workbox.precaching.matchPrecache('/offline.html');
        if (cacheResponse) {
            return cacheResponse;
        }
    }
    return Response.error();
});

workbox.precaching.precacheAndRoute([
    {url: '/offline.html', revision: 'rev1'},
    {url: '/offline.css', revision: 'rev1'},
    {url: '/offline.js', revision: 'rev1'}
]);
