import fs from 'fs-extra';
import koaRouter from 'koa-router';
import { ActivityAbilityModel, CardModel, LiveAbilityModel, MessageModel, SkillModel, StoryModel } from '../../database/model';
import { CardParameter, CardRarity } from 'hoshimi-types/ProtoMaster';
import resolvePath from 'resolve-path';
import { CardStoryDetail } from '@/ProtoTypes';

const router = new koaRouter();

router.get('/list', async (ctx) => {
  ctx.body = await CardModel.find({}).sort({ order: -1 });
});

router.get('/parameter', async (ctx) => {
  let cardParameter: CardParameter[] = fs.readJSONSync(resolvePath('./masterdata/CardParameter.json'), 'utf-8');
  ctx.body = cardParameter;
});

router.get('/rarity', async (ctx) => {
  let cardRarity: CardRarity[] = fs.readJSONSync(resolvePath('./masterdata/CardRarity.json'), 'utf-8');
  ctx.body = cardRarity;
});

router.get('/base/:id', async (ctx) => {
  const reg = new RegExp(ctx.params.id.slice(4));
  const [card, skill] = await Promise.all([CardModel.findOne({ id: ctx.params.id }), SkillModel.find({ id: reg })]);
  const resBody = {
    card,
    skill,
  };

  if (card.activityAbilityId) {
    const activityAbility = await ActivityAbilityModel.findOne({ id: card.activityAbilityId });
    if (/\d+/.test(card.activityAbilityId)) {
      const normal = await ActivityAbilityModel.findOne({ name: activityAbility.name, id: /(^aab)[^\d]*$/ });
      Object.assign(resBody, { activityAbility: normal });
    } else {
      Object.assign(resBody, { activityAbility });
    }
  }

  if (card.liveAbilityId) {
    const liveAbility = await LiveAbilityModel.findOne({ id: card.liveAbilityId });
    if (/\d+/.test(card.liveAbilityId)) {
      const normal = await LiveAbilityModel.findOne({ name: liveAbility.name, id: /(^lba)[^\d]*$/ });
      Object.assign(resBody, { liveAbility: normal });
    } else {
      Object.assign(resBody, { liveAbility });
    }
  }

  ctx.body = resBody;
});

router.get('/story/:id', async (ctx) => {
  const stories = await StoryModel.findOne({ id: ctx.params.id });
  const content: string = fs.readFileSync(resolvePath(`./assets/adv/adv_${stories.advAssetIds[0]}.txt`), 'utf-8');
  const storeDetail = handleAdvText(content);
  ctx.body = storeDetail;
});

router.get('/message/:id', async (ctx) => {
  ctx.body = await MessageModel.findOne({ id: ctx.params.id });
});

router.get('/messageList/:id', async (ctx) => {
  ctx.body = await MessageModel.find({ characterId: ctx.params.id }, 'id name');
});

router.get('/member/:id', async (ctx) => {});

function handleAdvText(content: string) {
  const story: CardStoryDetail = {
    title: '',
    message: [],
  };
  const match = content.split(/\n/g);
  for (const item of match) {
    if (!item) {
      continue;
    }
    if (/title/.test(item)) {
      story.title = item.replace(/\[.*title=(.*)\]/, '$1');
      continue;
    }
    const [, text, name, narration] = item.split(/text=(.*)? name=(.*)? t|text=(.*) /);
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
