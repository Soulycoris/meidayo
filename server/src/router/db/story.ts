import koaRouter from 'koa-router';

import fs from 'fs-extra';
import Path from 'path';
import { AnyKeys } from 'mongoose';
import { Story } from 'hoshimi-types/ProtoMaster';
import { StoryModel } from '../../database/model';

const router = new koaRouter();

router.get('/init', async (ctx) => {
  await StoryModel.deleteMany({});
  let Story: Story[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/Story.json'), 'utf-8'));
  let StoryList: Array<AnyKeys<Story>> = [];
  Story.forEach((item) => {
    let doc = new StoryModel(item);
    StoryList.push(doc);
  });

  StoryModel.insertMany(StoryList);

  ctx.body = Story;
});

export default router;
