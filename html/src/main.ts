import { createApp } from 'vue';
import App from './App.vue';
import lazyPlugin from 'vue3-lazy';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

import './config/axios';
import './assets/css/style.scss';

import 'uno.css';

const app = createApp(App);

// 加载router
const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  routes,
  history: createWebHistory(),
});
app.use(router);

// 加载store
app.use(createPinia());

app.use(lazyPlugin, {
  loading: '/img/icon/icon_Card.png',
  error: '/img/icon/icon_Card.png',
});

app.mount('#app');
