import koaRouter from 'koa-router';

import fs from 'fs-extra';
import Path from 'path';
import { Character } from '@/ProtoTypes';
import { CharacterModel } from '../../database/model';
import { AnyKeys } from 'mongoose';

const router = new koaRouter();

router.get('/init', async (ctx) => {
  let character: Character[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/Character.json'), 'utf-8'));
  let CharacterList: Array<AnyKeys<Character>> = [];
  character.forEach((item) => {
    let doc = new CharacterModel(item);
    CharacterList.push(doc);
  });

  CharacterModel.insertMany(CharacterList);

  // let CharacterActivityLevel: CharacterActivityLevel[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/CharacterActivityLevel.json'), 'utf-8'));

  // let CharacterGroup: CharacterGroup[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/CharacterGroup.json'), 'utf-8'));

  ctx.body = character;
});

router.get('/update', async (ctx) => {
  let character: Character[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/Character.json'), 'utf-8'));
  let characterModel = await CharacterModel.find({});
  // console.time('time');
  for (const item of character) {
    let res = characterModel.find((e) => e.id === item.id);
    if (!res) {
      let doc = new CharacterModel(item);
      await doc.save();
    } else {
      Object.assign(res, item);
      await res.save();
    }
  }

  ctx.body = character;
});

export default router;
