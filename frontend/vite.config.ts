import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://192.168.137.1:4000",
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
});
