import koaRouter from 'koa-router';
import app from '../../wiki';
const router = new koaRouter();

router.post('/post', async (ctx) => {
  const text = await app.postCard(ctx.request.body);
  ctx.body = text;
});

export default router;
