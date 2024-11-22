import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "DS CloudSwift",
        short_name: "DS CloudSwift",
        description: "Your Stuff, Everywhere.",
        theme_color: "#4f518c",
        background_color: "#fbfaff",
        display: "standalone",
        lang: "en-US",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/icon-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
          },
          {
            src: "/icons/icon-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/mobile-screenshots/home-dashboard.png",
            sizes: "586x1041",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/mobile-screenshots/cloud-storage.png",
            sizes: "586x1041",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/mobile-screenshots/cloudswift-ai.png",
            sizes: "586x1041",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/mobile-screenshots/user-interface.png",
            sizes: "586x1041",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
      workbox: {
        globPatterns: [
          "assets/*.webp",
          "assets/*.svg",
          "assets/*.js",
          "assets/*.css",
          "icons/*.svg",
          "icons/*.png",
          "splash-screens/*.png",
          "*.html",
          "*.js",
          "*.webmanifest",
        ],
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.3\/dist\/css\/bootstrap\.min\.css/,
            handler: "CacheFirst",
            options: {
              cacheName: "bootstrap-css",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern:
              /^https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.3\/dist\/js\/bootstrap\.bundle\.min\.js/,
            handler: "CacheFirst",
            options: {
              cacheName: "bootstrap-js",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/kit\.fontawesome\.com\/0036ece5c1\.js/,
            handler: "CacheFirst",
            options: {
              cacheName: "fontawesome-js",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
