import withPWAInit from 'next-pwa';

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["github.com", "raw.githubusercontent.com", "i.pravatar.cc", "lecccphducqpixznxmzt.supabase.co"],
  },
};

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  runtimeCaching: [
    // Cache static files from _next/static (including CSS and JS)
    {
      urlPattern: /\/_next\/static\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // Cache other static assets (CSS, images, etc.)
    {
      urlPattern: /.*\.(?:css|js|png|jpg|jpeg|svg|gif|webp)/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // Cache the main app routes
    {
      urlPattern: new RegExp('^/$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'home-cache',
      },
    },
    {
      urlPattern: new RegExp('^/about$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'about-cache',
      },
    },
    {
      urlPattern: new RegExp('^/authentication$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'auth-cache',
      },
    },
    {
      urlPattern: new RegExp('^/brands$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'brands-cache',
      },
    },
    {
      urlPattern: new RegExp('^/categories$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'categories-cache',
      },
    },
    {
      urlPattern: new RegExp('^/products$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'products-cache',
      },
    },
    // Cache dynamic product pages (/products/[id])
    {
      urlPattern: new RegExp('^/products/.*'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'product-detail-cache',
      },
    },
    // Offline fallback for uncached routes
    {
      urlPattern: /.*/,
      handler: 'NetworkOnly',
      options: {
        cacheName: 'fallback-cache',
        fallback: {
          document: 'public/offline.html',
        },
      },
    },
  ],
});

export default withPWA(nextConfig);
