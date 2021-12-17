import messages from '../language';
import { createI18n } from 'vue-i18n'; //引入vue-i18n组件

const i18n = createI18n({
  fallbackLocale: 'ch',
  legacy: false, // you must set `false`, to use Composition API
  locale: 'zh',
  messages,
});

export default i18n;
