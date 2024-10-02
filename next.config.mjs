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
  runtimeCaching: [
    {
      urlPattern: /\/_next\/static\/.*/, // Cache Next.js build static assets
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        },
      },
    },
    {
      urlPattern: /\/_next\/image\?url=.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-image-cache',
        expiration: {
          maxEntries: 1000000, // Number of images to keep in cache
          maxAgeSeconds: 30 * 24 * 60 * 60, 
        },
        cacheableResponse: {
          statuses: [0, 200], 
        },
      },
    },
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp)/, 
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Cache main app routes
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
        cacheName: 'authentication-cache',
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
      urlPattern: new RegExp('^/complete-registration$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'complete-registration-cache',
      },
    },
    {
      urlPattern: new RegExp('^/confirm-email$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'confirm-email-cache',
      },
    },
    {
      urlPattern: new RegExp('^/contact-us$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'contact-us-cache',
      },
    },
    {
      urlPattern: new RegExp('^/delivery-info$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'delivery-info-cache',
      },
    },
    {
      urlPattern: new RegExp('^/edit-profile$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'edit-profile-cache',
      },
    },
    {
      urlPattern: new RegExp('^/faq$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'faq-cache',
      },
    },
    {
      urlPattern: new RegExp('^/payment$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'payment-cache',
      },
    },
    {
      urlPattern: new RegExp('^/privacy-policy$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'privacy-policy-cache',
      },
    },
    {
      urlPattern: new RegExp('^/products$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'products-cache',
      },
    },
    {
      urlPattern: new RegExp('^/products/.*'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'product-detail-cache',
      },
    },
    {
      urlPattern: new RegExp('^/profile$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'profile-cache',
      },
    },
    {
      urlPattern: new RegExp('^/shopping-cart$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'shopping-cart-cache',
      },
    },
    {
      urlPattern: new RegExp('^/terms-of-service$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'terms-of-service-cache',
      },
    },
  ],
});

export default withPWA(nextConfig);
