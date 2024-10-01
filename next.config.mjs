import withPWAInit from 'next-pwa';

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["github.com", "raw.githubusercontent.com", "i.pravatar.cc"],
  },
};

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  runtimeCaching: [
    // Cache static files from _next/static
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
    // Cache the main app routes
    {
      urlPattern: new RegExp('^/products$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'products-cache',
      },
    },
    {
      urlPattern: new RegExp('^/products/.*'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'product-detail-cache',
      },
    },
    {
      urlPattern: new RegExp('^/categories$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'categories-cache',
      },
    },
    {
      urlPattern: new RegExp('^/brands$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'brands-cache',
      },
    },
    {
      urlPattern: new RegExp('^/authentication$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'auth-cache',
      },
    },
    {
      urlPattern: new RegExp('^/profile$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'profile-cache',
      },
    },
  ],
  ignoreURLParametersMatching: [/__WB_REVISION__/],
});

export default withPWA(nextConfig);
