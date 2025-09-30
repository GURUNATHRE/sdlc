import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // change from 'dist' to 'build' if you want Render to default to 'build'
  },
});
