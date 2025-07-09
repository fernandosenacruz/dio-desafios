import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  splitting: false,
  bundle: false,
  clean: true,
  dts: true,
  outDir: "dist",
  target: "es2020",
});
