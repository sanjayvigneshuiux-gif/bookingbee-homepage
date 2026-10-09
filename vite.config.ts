import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { viteSingleFile } from "vite-plugin-singlefile"

// Source entry is app.html. `npm run build` bundles everything into ONE file and
// scripts/publish.mjs copies it to ./index.html, which opens straight from Finder.
// Images/fonts stay in ./public and are referenced relatively (public/assets/...).
export default defineConfig({
  base: "./",
  publicDir: false,
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  server: { open: "/app.html" },
  build: {
    outDir: ".build",
    emptyOutDir: true,
    rollupOptions: { input: path.resolve(__dirname, "app.html") },
  },
})
