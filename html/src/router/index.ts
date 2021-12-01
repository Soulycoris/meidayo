import { createRouter, createWebHistory, Router } from 'vue-router';
import Home from '@/pages/index.vue';
import generateSkillIcon from '@/pages/generateSkillIcon.vue';
import character from '@/pages/character/index.vue';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/generateSkillIcon', name: 'generate-skill-icon', component: generateSkillIcon },
    { path: '/character', name: 'character', component: character },
  ],
});

export default router;
