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
  // 👇 ADD THIS BUILD SECTION 👇
  build: {
    // Increase the warning limit slightly (optional, but standard practice)
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          // If the file is coming from node_modules, we split it
          if (id.includes('node_modules')) {
            
            // 1. Group React and Router into one chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            
            // 2. Group UI Libraries (Radix, Framer Motion, Lucide icons are usually heavy)
            if (id.includes('@radix-ui') || id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            
            // 3. Put everything else in a general vendor chunk
            return 'vendor-core';
          }
        }
      }
    }
  },
}));
