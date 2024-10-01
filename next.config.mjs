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
      // Cache the main JS bundle
      {
        urlPattern: /\/static\/js\/main\.chunk\.js/,
        handler: "CacheFirst",
      },
      // Cache the main HTML file
      {
        urlPattern: /\/index\.html/,
        handler: "StaleWhileRevalidate",
      },
      // Cache critical icons
      {
        urlPattern: /\/images\/icons\/.*/,
        handler: "CacheFirst",
      },
      // Cache the /products page
      {
        urlPattern: /\/products/,
        handler: "StaleWhileRevalidate",
      },
      // Cache all the dynamic /products/[id] pages
      {
        urlPattern: /\/products\/.*/,
        handler: "StaleWhileRevalidate",
      },
      // Cache the /categories page
      {
        urlPattern: /\/categories/,
        handler: "StaleWhileRevalidate",
      },
      // Cache the /brands page
      {
        urlPattern: /\/brands/,
        handler: "StaleWhileRevalidate",
      },
      // Cache the /authentication page
      {
        urlPattern: /\/authentication/,
        handler: "StaleWhileRevalidate",
      },
      // Cache the /shopping-cart page
      {
        urlPattern: /\/shopping-cart/,
        handler: "StaleWhileRevalidate",
      },
      // Cache the API requests from Supabase using the NEXT_PUBLIC_SUPABASE_URL env variable
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
