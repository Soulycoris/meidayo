// 通用方法
import fs from 'fs-extra';
import Path from 'path';
import koaRouter from 'koa-router';

const router = new koaRouter();

router.get('/version', async (ctx) => {
  //   const version = await VersionModel.find({});
  const version: string = fs.readFileSync(Path.resolve(process.cwd(), './masterdata/!version.txt'), 'utf-8');
  ctx.body = version;
});
export default router;
