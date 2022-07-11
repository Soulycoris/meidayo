import koaRouter from 'koa-router';

import fs from 'fs-extra';
import Path from 'path';
import { AnyKeys } from 'mongoose';

const router = new koaRouter();

import { Card } from '@/ProtoTypes';
import { CardModel } from '../../database/model';

router.get('/init', async (ctx) => {
  let cards: Card[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/Card.json'), 'utf-8'));
  // let characters = await CharacterModel.find({});
  let cardList: Array<AnyKeys<Card>> = [];
  for (const item of cards) {
    let doc = new CardModel(item);
    cardList.push(doc);
  }

  CardModel.insertMany(cardList);

  // let cardLevel: CardLevel[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/CardLevel.json'), 'utf-8'));
  // let cardLevelList: Array<AnyKeys<CardLevel>> = [];
  // cardLevel.forEach((item) => {
  //   let doc = new CardLevelModel(item);
  //   cardLevelList.push(doc);
  // });

  // CardLevelModel.insertMany(cardLevelList);

  // let CardLevelRelease: CardLevelRelease[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/CardLevelRelease.json'), 'utf-8'));
  // let CardLevelReleaseList: Array<AnyKeys<CardLevelRelease>> = [];
  // CardLevelRelease.forEach((item) => {
  //   let doc = new CardLevelReleaseModel(item);
  //   CardLevelReleaseList.push(doc);
  // });
  // CardLevelReleaseModel.insertMany(CardLevelReleaseList);

  // let CardParameter: CardParameter[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/CardParameter.json'), 'utf-8'));
  // let CardParameterList: Array<AnyKeys<CardParameter>> = [];
  // CardParameter.forEach((item) => {
  //   let doc = new CardParameterModel(item);
  //   CardParameterList.push(doc);
  // });
  // CardParameterModel.insertMany(CardParameterList);

  // let CardRarity: CardRarity[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/CardRarity.json'), 'utf-8'));
  // let CardRarityList: Array<AnyKeys<CardRarity>> = [];
  // CardRarity.forEach((item) => {
  //   let doc = new CardRarityModel(item);
  //   CardRarityList.push(doc);
  // });
  // CardRarityModel.insertMany(CardRarityList);

  ctx.body = cards;
});

router.get('/update', async (ctx) => {
  await CardModel.deleteMany({});
  let cards: Card[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/Card.json'), 'utf-8'));

  let cardList: Array<AnyKeys<Card>> = [];
  for (const item of cards) {
    let doc = new CardModel(item);
    cardList.push(doc);
  }

  CardModel.insertMany(cardList);

  // console.timeEnd('time');

  ctx.body = cards;
});

export default router;
