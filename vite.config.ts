import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Base path for GitHub Pages subdirectory and standalone (Home Screen) mode
const base = process.env.VITE_BASE_PATH || "/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Time & Weather Buddy",
        short_name: "Zeit & Wetter",
        description: "Uhrzeit und Wetter auf Russisch per Sprachausgabe",
        theme_color: "#0a0a0f",
        background_color: "#0a0a0f",
        display: "standalone",
        orientation: "portrait",
        scope: base,
        start_url: `${base.replace(/\/$/, "")}/index.html`,
        icons: [
          {
            src: `${base}favicon.ico`,
            sizes: "48x48",
            type: "image/x-icon",
            purpose: "any",
          },
          {
            src: `${base}favicon.ico`,
            sizes: "192x192",
            type: "image/x-icon",
            purpose: "any",
          },
          {
            src: `${base}favicon.ico`,
            sizes: "512x512",
            type: "image/x-icon",
            purpose: "any maskable",
          },
        ],
      },
    }),
    // Inject <base href="..."> so standalone (Home Screen) and relative URLs resolve correctly
    {
      name: "html-base",
      transformIndexHtml(html) {
        return html.replace(
          /<head>/,
          `<head>\n    <base href="${base}" />`
        );
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
