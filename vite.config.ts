import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/f1/",
  build: {
    outDir: "docs",
  },
  plugins: [viteCompression({ threshold: 0 })],
});
