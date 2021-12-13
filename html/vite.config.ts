import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3030,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
