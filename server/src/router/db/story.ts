import koaRouter from 'koa-router';

import fs from 'fs-extra';
import resolvePath from 'resolve-path';
import { Story } from 'hoshimi-types/ProtoMaster';
import { StoryModel } from '../../database/model';

const router = new koaRouter();

router.get('/init', async (ctx) => {
  ctx.body = await initStory();
});

export const initStory = async () => {
  await StoryModel.deleteMany({});
  let list: Story[] = fs.readJsonSync(resolvePath('./masterdata/Story.json'), 'utf-8');
  StoryModel.insertMany(list);

  return list;
};

export default router;
