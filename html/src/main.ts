import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './config/axios';
import './assets/css/style.scss';
import lazyPlugin from 'vue3-lazy';
// import { createPinia } from 'pinia';

const app = createApp(App);

// 加载router
app.use(router);

// 加载store
// app.use(createPinia());

app.use(lazyPlugin, {
  loading: '/img/icon/icon_Card.png',
  error: '/img/icon/icon_Card.png',
});

app.mount('#app');
