const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
registerRoute(
  // defines the callback function that will filter the requests we want to cache
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    //name of the cache storage
    cacheName: "asset-cache",
    plugins: [
      //this plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
