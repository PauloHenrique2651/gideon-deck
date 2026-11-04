import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// The pt-BR home page. Images live in the site's /assets/img; scripts/build-home.mjs
// prerenders the page into /index.html and copies the bundle to /assets/home.
const root = fileURLToPath(new URL(".", import.meta.url));
export default defineConfig({
  root,
  base: "/",
  publicDir: false,
  plugins: [react()],
  build: { outDir: fileURLToPath(new URL("../.home-build/client", import.meta.url)), emptyOutDir: true, assetsDir: "assets/home" },
  ssr: { noExternal: ["gsap", "lenis"] },
  server: { port: 5174, fs: { allow: [fileURLToPath(new URL("..", import.meta.url))] } },
});
