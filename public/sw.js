import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache important routes
precacheAndRoute([
  { url: '/', revision: null },
  { url: '/products', revision: null },
  { url: '/categories', revision: null },
  { url: '/brands', revision: null },
  { url: '/shopping-cart', revision: null },
  { url: '/authentication', revision: null },
  { url: '/offline.html', revision: null }, // Ensure this file exists and is cached
]);

// Cache dynamic product pages with a NetworkFirst strategy
registerRoute(
  new RegExp('/products/.*'),
  new NetworkFirst({
    cacheName: 'products-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
      }),
    ],
  })
);

// Cache categories, brands, and other routes with NetworkFirst strategy
registerRoute(
  new RegExp('/categories'),
  new NetworkFirst({
    cacheName: 'categories-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  new RegExp('/brands'),
  new NetworkFirst({
    cacheName: 'brands-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);

// Cache static resources (JS, images, etc.) with CacheFirst strategy
registerRoute(
  new RegExp('/_next/static/.*'),
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
      }),
    ],
  })
);

// Fallback for uncached requests when offline
workbox.routing.setCatchHandler(async ({ event }) => {
  console.log("Handling fallback for: ", event.request.url);
  switch (event.request.destination) {
    case 'document':
      // Serve offline.html when offline
      return caches.match('/offline.html');
    case 'image':
      // Serve a placeholder image when offline (optional)
      return caches.match('/images/offline-placeholder.png');
    case 'font':
      // Serve fallback font if offline
      return caches.match('/fonts/fallback-font.woff2');
    default:
      return Response.error();
  }
});
