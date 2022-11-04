import koaRouter from 'koa-router';
import { CharacterModel } from '../../database/model';

const router = new koaRouter();

router.get('/list', async (ctx) => {
  ctx.body = await CharacterModel.find({}).sort({ order: 1 });
});

export default router;
