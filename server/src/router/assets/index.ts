import fs from 'fs-extra';
import sharp from 'sharp';
import koaRouter from 'koa-router';
const router = new koaRouter();
import send from '../../koasend'; //静态资源服务

router.get('/:type1/:type2/:id', async (ctx) => {
  const requestPath = `./assets/${ctx.params.type1}/${ctx.params.type2}/${ctx.params.id}`;
  let done = '';
  try {
    done = await send(ctx, requestPath);
  } catch (err) {
    if (err.status !== 404) {
      throw err;
    }
  }
  if (!done) {
    ctx.body = null;
  }
  try {
    if (ctx.query.sharp) {
      // 图片处理
      if (ctx.query.sharp === 'ipcg') {
        ctx.body = await sharp(done).resize(1280, 720, { fit: 'fill' }).toBuffer();
      } else {
        ctx.body = fs.createReadStream(done);
        // ctx.body = await sharp(done).toBuffer();
      }
    } else {
      ctx.body = fs.createReadStream(done);
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
