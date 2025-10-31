import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
      staticImport: true,
    }),
  ],
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
    sourcemap: false,
    rollupOptions: {
      external: ["vue"],
    },
  },
});
