import koaRouter from 'koa-router';

import fs from 'fs-extra';
import resolvePath from 'resolve-path';
import { Character } from '@/ProtoTypes';
import { CharacterModel } from '../../database/model';

const router = new koaRouter();

router.get('/init', async (ctx) => {
  ctx.body = await initCharacter();
});

export const initCharacter = async () => {
  await CharacterModel.deleteMany({});
  let list: Character[] = fs.readJSONSync(resolvePath('./masterdata/Character.json'));
  await CharacterModel.insertMany(list);
  return list;
};

export default router;
