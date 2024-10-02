import withPWAInit from 'next-pwa';

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["github.com", "raw.githubusercontent.com", "i.pravatar.cc", "lecccphducqpixznxmzt.supabase.co"], // Include Supabase domain
  },
};

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  // Remove custom service worker logic for now if it conflicts
  runtimeCaching: [
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
    {
      urlPattern: new RegExp('^/$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'home-cache',
      },
    },
    {
      urlPattern: new RegExp('^/about$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'about-cache',
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
      urlPattern: new RegExp('^/brands$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'brands-cache',
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
      urlPattern: new RegExp('^/products$'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'products-cache',
      },
    },
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
  // Disable custom service worker for now to isolate the issue
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);
