const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // chỉ bật khi build production
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\/orders\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "orders-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // cache 1 ngày
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // cache 30 ngày
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
});
