import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './config/axios';
import './assets/css/style.scss';
import { store, key } from './store';
import lazyPlugin from 'vue3-lazy';

const app = createApp(App);
// 加载store，传入 injection key
app.use(store, key);
// 加载router
app.use(router);

app.use(lazyPlugin, {
  loading: '/img/icon/icon_Card.png',
  error: '/img/icon/icon_Card.png',
});

app.mount('#app');
