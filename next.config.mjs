import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      // Cache JS bundles and static assets
      {
        urlPattern: /\/_next\/static\/.*/,
        handler: "CacheFirst",
      },
      // Cache the index page
      {
        urlPattern: /\/$/,
        handler: "StaleWhileRevalidate",
      },
      // Cache other specific pages
      {
        urlPattern: /\/products/,
        handler: "NetworkFirst",
      },
      {
        urlPattern: /\/products\/\d+/,
        handler: "NetworkFirst",
      },
      {
        urlPattern: /\/categories/,
        handler: "NetworkFirst",
      },
      {
        urlPattern: /\/brands/,
        handler: "NetworkFirst",
      },
      {
        urlPattern: /\/shopping-cart/,
        handler: "NetworkFirst",
      },
      // Cache API requests (replace with Supabase URL via environment variable)
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
    // Ignore URL parameters to prevent caching conflicts
    ignoreURLParametersMatching: [/__WB_REVISION__/],
  },
});

export default withPWA(nextConfig);
