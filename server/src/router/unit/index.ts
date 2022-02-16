import fs from 'fs-extra';
import Path from 'path';
import koaRouter from 'koa-router';
const router = new koaRouter();
import { MemberModel, MemberDetailModel, UnitModel, UnitDetailModel } from '../../database/model';

interface story {
  title: string;
  message: {
    text: string;
    name: string;
  }[];
}

router.get('/list', async (ctx) => {
  let unitList = await UnitModel.find({}).sort({ _id: -1 });
  ctx.body = unitList;
});

router.get('/base/:id', async (ctx) => {
  let [unit, unitDetail] = await Promise.all([UnitModel.findOne({ id: ctx.params.id }), UnitDetailModel.findOne({ id: ctx.params.id })]);
  ctx.body = Object.assign(unit.toObject(), unitDetail?.toObject() ?? {});
});

router.get('/story/:id', async (ctx) => {
  const unit = await UnitModel.findOne({ id: ctx.params.id });
  const unitList = await UnitModel.find({ memberId: unit.memberId, rarity: 5 });
  const index = unitList.findIndex((e) => e.id === unit.id);
  const content1: string = fs.readFileSync(Path.resolve(process.cwd(), `./assets/advextract/adv_card_${unit.prefab.split('-')[0]}_${(index + 1 + '').padStart(2, '0')}_01.txt`), 'utf-8');
  const content2: string = fs.readFileSync(Path.resolve(process.cwd(), `./assets/advextract/adv_card_${unit.prefab.split('-')[0]}_${(index + 1 + '').padStart(2, '0')}_02.txt`), 'utf-8');
  const content3: string = fs.readFileSync(Path.resolve(process.cwd(), `./assets/advextract/adv_card_${unit.prefab.split('-')[0]}_${(index + 1 + '').padStart(2, '0')}_03.txt`), 'utf-8');
  let storyList: story[] = [handleAdvText(content1), handleAdvText(content2), handleAdvText(content3)];
  ctx.body = storyList;
});

router.get('/story/:unitId/:chapter', async (ctx) => {
  const unit = await UnitModel.findOne({ id: ctx.params.unitId });
  const unitList = await UnitModel.find({ memberId: unit.memberId, rarity: 5 });
  const index = unitList.findIndex((e) => e.id === unit.id);
  const content: string = fs.readFileSync(Path.resolve(process.cwd(), `./assets/advextract/adv_card_${unit.prefab.split('-')[0]}_${(index + 1 + '').padStart(2, '0')}_0${ctx.params.chapter}.txt`), 'utf-8');
  if (!content) {
    ctx.body = '';
    return;
  }
  let story: story = handleAdvText(content);
  ctx.body = story;
});

router.get('/member/:id', async (ctx) => {
  let [member, memberDetail] = await Promise.all([MemberModel.findOne({ id: ctx.params.id }), MemberDetailModel.findOne({ id: ctx.params.id })]);
  ctx.body = Object.assign(member.toObject(), memberDetail.toObject());
});

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
