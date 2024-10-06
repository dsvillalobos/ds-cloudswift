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
      },
    }),
  ],
});
