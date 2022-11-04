import koaRouter from 'koa-router';

import fs from 'fs-extra';
import resolvePath from 'resolve-path';

import { Card } from '@/ProtoTypes';
import { CardModel } from '../../database/model';

const router = new koaRouter();

router.get('/init', async (ctx) => {
  ctx.body = await initCard();
});

export const initCard = async () => {
  await CardModel.deleteMany({});
  let list: Card[] = fs.readJSONSync(resolvePath('./masterdata/Card.json'));
  await CardModel.insertMany(list);
  return list;
};

export default router;
