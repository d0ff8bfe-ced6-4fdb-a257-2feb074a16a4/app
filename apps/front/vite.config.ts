import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgx from '@svgx/vite-plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/front',

  server: {
    port: 4200,
    host: 'localhost'
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },
  plugins: [
    react(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    svgx(),
    nxViteTsPaths()],
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

      '@store': '/src/shared/lib/store'
    }
  },
  build: {
    outDir: '../../dist/apps/front',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
