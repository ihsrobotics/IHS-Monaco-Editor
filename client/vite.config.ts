import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sourcemaps from "rollup-plugin-sourcemaps";
import { dependencies } from "./package.json";

import { nodePolyfills } from 'vite-plugin-node-polyfills'

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  build: {
    rollupOptions: {
      onLog(level, log, handler) {
        if (
          log.cause &&
          log.message.includes(`Can't resolve original location of error.`)
        ) {
          return;
        }
        handler(level, log);
      },
      //@ts-expect-error Plugin auto casts to InputPluginOption
      plugins: [sourcemaps()],
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
