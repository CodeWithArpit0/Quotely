import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/api": "http://localhost:3001",
      "/api": "https://quotely-2dt1.onrender.com",
    },
  },
  plugins: [react()],
});
