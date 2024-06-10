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
        urlPattern: /\/static\/js\/main\.chunk\.js/, // Cache the main JS bundle
        handler: "CacheFirst",
      },
      {
        urlPattern: /\/index\.html/, // Cache the main HTML file
        handler: "StaleWhileRevalidate",
      },
      {
        urlPattern: /\/images\/icons\/.*/, // Cache critical icons
        handler: "CacheFirst",
      },
    ],
  },
});

export default withPWA({
  reactStrictMode: false,
  images: {
    domains: ["raw.githubusercontent.com", "i.pravatar.cc"],
  },
});
