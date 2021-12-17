import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path, { resolve } from 'path';

import vueI18n from '@intlify/vite-plugin-vue-i18n';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3030,
  },
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, './src/language/index'),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@com': resolve(__dirname, './src/components'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
    },
  },
});
