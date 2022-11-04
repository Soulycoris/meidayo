import koaRouter from 'koa-router';

import fs from 'fs-extra';
import resolvePath from 'resolve-path';
import { Message } from 'hoshimi-types/ProtoMaster';
import { MessageModel } from '../../database/model';

const router = new koaRouter();

router.get('/init', async (ctx) => {
  ctx.body = await initMessage();
});

export const initMessage = async () => {
  await MessageModel.deleteMany({});
  let list: Message[] = fs.readJsonSync(resolvePath('./masterdata/Message.json'));
  await MessageModel.insertMany(list);
  return list;
};

export default router;
