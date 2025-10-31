import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format, entryName) => {
        const name = entryName.split(".");
        console.log(name);
        return `${name[0]}.${format === "es" ? "mjs" : "js"}`;
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
});
