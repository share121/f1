import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import html from "@tomjs/vite-plugin-html";

export default defineConfig({
  base: "/f1/",
  plugins: [html({ minify: true }), viteCompression({ threshold: 0 })],
});
