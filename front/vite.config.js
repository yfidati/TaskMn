import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  server: {
    port: process.env.PORT || 4173, // Use Render's port or default to 4173
    host: '0.0.0.0', // Make the server accessible externally
  },
  build: {
    outDir: 'dist',  // Make sure your output is correctly set
  }
};

