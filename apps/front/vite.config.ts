/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgx from '@svgx/vite-plugin-react';


export default defineConfig({
  cacheDir: '../../node_modules/.vite/front',
  server: {
    port: 4200,
    host: 'localhost',
    watch: {
      usePolling: true,
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    svgx(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',

      '@styles': '/src/app/styles',

      '@app': '/src/app',

      '@pages': '/src/pages',

      '@shared': '/src/shared',

      '@assets': '/src/shared/assets',

      '@widgets': '/src/widgets',


      '@features': '/src/features',

      '@entities': '/src/entities',

      '@store': '/src/shared/lib/store',
    },
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
