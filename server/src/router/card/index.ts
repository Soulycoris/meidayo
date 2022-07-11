import fs from 'fs-extra';
import Path from 'path';
import koaRouter from 'koa-router';
import { ActivityAbilityModel, CardModel, LiveAbilityModel, SkillModel, StoryModel } from '../../database/model';
import { CardParameter, CardRarity } from 'hoshimi-types/ProtoMaster';

const router = new koaRouter();

interface story {
  title: string;
  message: {
    text: string;
    name: string;
  }[];
}

router.get('/list', async (ctx) => {
  const card = await CardModel.find({}).sort({ order: -1 });
  ctx.body = card;
});

router.get('/parameter', async (ctx) => {
  let cardParameter: CardParameter[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/CardParameter.json'), 'utf-8'));
  ctx.body = cardParameter;
});

router.get('/rarity', async (ctx) => {
  let cardRarity: CardRarity[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/CardRarity.json'), 'utf-8'));
  ctx.body = cardRarity;
});

router.get('/base/:id', async (ctx) => {
  const card = await CardModel.findOne({ id: ctx.params.id });
  const reg = new RegExp(`${card.assetId}`);
  const skill = await SkillModel.find({ id: reg });
  const resBody = {
    card,
    skill,
  };

  if (card.activityAbilityId) {
    const activityAbility = await ActivityAbilityModel.findOne({ id: card.activityAbilityId });
    if (/\d+/.test(card.activityAbilityId)) {
      const normal = await ActivityAbilityModel.findOne({ name: activityAbility.name, id: /[^\d+]/ });
      Object.assign(resBody, { activityAbility: normal });
    } else {
      Object.assign(resBody, { activityAbility });
    }
  }

  if (card.liveAbilityId) {
    const liveAbility = await LiveAbilityModel.findOne({ id: card.liveAbilityId });
    Object.assign(resBody, { liveAbility });
  }

  ctx.body = resBody;
});

router.get('/story/:id', async (ctx) => {
  const stories = await StoryModel.findOne({ id: ctx.params.id });
  const content: string = fs.readFileSync(Path.resolve(process.cwd(), `./assets/advextract/adv_${stories.advAssetId}.txt`), 'utf-8');
  const storeDetail = handleAdvText(content);
  // const storyList: story[] = [];
  // for (const item of stories) {
  //   storyList.push();
  // }
  ctx.body = storeDetail;
});

router.get('/story/:unitId/:chapter', async (ctx) => {});

router.get('/member/:id', async (ctx) => {});

function handleAdvText(content: string) {
  const story: story = {
    title: '',
    message: [],
  };
  const match = content.split(/\r\n/g);
  for (const item of match) {
    if (!item) {
      continue;
    }
    if (/title/.test(item)) {
      story.title = item.replace(/.*title=(.*)/, '$1');
      continue;
    }
    const [, text, name, narration] = item.split(/text=(.*)? name=(.*)? |text=(.*) /);
    if (text || narration) {
      story.message.push({
        text: text ?? narration,
        name: name ?? '',
      });
    }
  }
  return story;
}
export default router;