import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 👇 THE SAFE FIX 👇
  build: {
    // Simply increase the limit to 1500kB (1.5MB) to silence the warning.
    // This lets Vite do its default (and safest) code-splitting.
    chunkSizeWarningLimit: 1500, 
  },
}));