import koaRouter from 'koa-router';

import card, { initCard } from './card';
import character, { initCharacter } from './character';
import skill, { initSkill } from './skill';
import story, { initStory } from './story';

const router = new koaRouter();

router.use('/card', card.routes(), card.allowedMethods());
router.use('/character', character.routes(), character.allowedMethods());
router.use('/skill', skill.routes(), skill.allowedMethods());
router.use('/story', story.routes(), story.allowedMethods());

router.get('/update', async (ctx) => {
  await update();
  ctx.body = true;
});

export const update = () => {
  return Promise.all([initCard(), initCharacter(), initSkill(), initStory()]);
};

export default router;
