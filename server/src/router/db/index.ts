import koaRouter from 'koa-router';

import card from './card';
import character from './character';
import skill from './skill';
import story from './story';

const router = new koaRouter();

router.use('/card', card.routes(), card.allowedMethods());
router.use('/character', character.routes(), character.allowedMethods());
router.use('/skill', skill.routes(), skill.allowedMethods());
router.use('/story', story.routes(), story.allowedMethods());

export default router;
