import koaRouter from 'koa-router';
import { CharacterModel } from '../../database/model';

const router = new koaRouter();

router.get('/list', async (ctx) => {
  const card = await CharacterModel.find({}).sort({ order: 1 });
  ctx.body = card;
});

export default router;
