import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["src/index.ts"],
    outDir: "dist",
    target: "es2019",
    format: ["esm"],
});
