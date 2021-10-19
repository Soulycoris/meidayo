import { createRouter, createWebHistory, Router } from 'vue-router';
import Home from '@/pages/index.vue';
import generateSkillIcon from '@/pages/generateSkillIcon.vue';
import Spine from '@/pages/other/Spine.vue';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/generateSkillIcon', name: 'generate-skill-icon', component: generateSkillIcon },
    { path: '/Spine', name: 'Spine', component: Spine },
  ],
});

export default router;
