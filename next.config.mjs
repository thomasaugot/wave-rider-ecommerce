import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /\/static\/js\/main\.chunk\.js/,
      handler: "CacheFirst",
    },
    {
      urlPattern: /\/index\.html/,
      handler: "StaleWhileRevalidate",
    },
    {
      urlPattern: /\/images\/icons\/.*/,
      handler: "CacheFirst",
    },
    {
      urlPattern: /\/products/,
      handler: "StaleWhileRevalidate",
    },
    {
      urlPattern: /\/products\/.*/,
      handler: "StaleWhileRevalidate",
    },
    {
      urlPattern: /\/categories/,
      handler: "StaleWhileRevalidate",
    },
    {
      urlPattern: /\/brands/,
      handler: "StaleWhileRevalidate",
    },
    {
      urlPattern: /\/authentication/,
      handler: "StaleWhileRevalidate",
    },
    {
      urlPattern: /\/shopping-cart/,
      handler: "StaleWhileRevalidate",
    },
    {
      urlPattern: new RegExp(process.env.NEXT_PUBLIC_SUPABASE_URL),
      handler: "NetworkFirst",
      options: {
        cacheName: "supabase-api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
        },
      },
    },
  ],
});

export default withPWA(nextConfig);
