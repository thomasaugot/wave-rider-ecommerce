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
        handler: "NetworkFirst",
      },
      {
        urlPattern: /\/products\/.*/,
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
        urlPattern: /\/authentication/,
        handler: "NetworkFirst",
      },
      {
        urlPattern: /\/shopping-cart/,
        handler: "NetworkFirst",
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
    ignoreURLParametersMatching: [/__WB_REVISION__/],
  },
});

export default withPWA(nextConfig);
