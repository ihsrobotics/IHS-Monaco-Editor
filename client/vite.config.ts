import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sourcemaps from "rollup-plugin-sourcemaps";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    },
  },
});
