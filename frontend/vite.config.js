import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Custom Rollup options for manual chunking
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Bundle node_modules into a separate 'vendor' chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          // Example: Bundle large libraries into their own chunk (optional)
          if (id.includes('large-lib')) {
            return 'large-lib'
          }
        },
      },
    },
    // Optional: Increase chunk size warning limit
    chunkSizeWarningLimit: 10000, // Increase the limit to 1000 KB (1 MB)
  },
})
