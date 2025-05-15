import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";
import { reactScopedCssPlugin } from "rollup-plugin-react-scoped-css";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "/",
  plugins: [
    react(),
    viteTsconfigPaths(),
    eslint(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{tsx,ts,js,css,html,ico,png,svg}"],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      Lib: '/src/Lib', // Adjust based on your project structure
    },
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
});
