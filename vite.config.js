import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist',
  },
  server: {
    mimeTypes: {
      'audio/mpeg': ['mp3'],
      'audio/wav': ['wav']
    }
  }
});
