import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// Comentário apenas para abrir PR

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "script",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Snake Game",
        short_name: "Snake Game",
        description: "A simple PWA snake game created with TypeScript",
        theme_color: "#0079ff",
        background_color: "#141d2f",
        display: "fullscreen",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
