import { createRouter, createWebHistory, Router } from 'vue-router';
import Home from '@/pages/index.vue';
import generateSkillIcon from '@/pages/generateSkillIcon.vue';
import unit from '@/pages/unit/index.vue';
import unitDetail from '@/pages/unit/base/index.vue';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/generateSkillIcon', name: 'generate-skill-icon', component: generateSkillIcon },
    { path: '/unit', name: 'unit', component: unit },
    { path: '/unit/:unitId', name: 'unitDetail', component: unitDetail },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { top: 0 };
  //   }
  // },
});

export default router;
