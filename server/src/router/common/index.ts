// 通用方法
import fs from 'fs-extra';
import koaRouter from 'koa-router';
import { VersionModel } from '../../database/model';
import { update } from '../db';
import resolvePath from 'resolve-path';

const router = new koaRouter();

router.get('/version', async (ctx) => {
  let doc = await VersionModel.findOne({ id: 'meidayo' });
  const version: string = fs.readFileSync(resolvePath('./masterdata/!version.txt'), 'utf-8');
  if (!doc) {
    doc = new VersionModel();
    doc.id = 'meidayo';
  }
  if (doc.version !== version) {
    await update();
    doc.version = version;
    doc.save();
  }
  ctx.body = version;
});

export default router;
