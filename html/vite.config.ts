import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import ElementPlus from 'unplugin-element-plus/vite';

import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
