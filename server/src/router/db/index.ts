import koaRouter from 'koa-router';
import fs from 'fs-extra';
import Path from 'path';
import { MemberModel, MemberDetailModel, UnitModel, UnitDetailModel } from '../../database/model';

import { getUnitList, getUnitDetail } from '../../spider';

import { AnyKeys } from 'mongoose';

const router = new koaRouter();

router.get('/update', async (ctx) => {
  let model = ctx.query.model ?? 'all';
  let [memberList, unitList] = await Promise.all([MemberModel.find({}), UnitModel.find({})]);
  console.log('getUnitList start');
  let unit: unit[] = [];
  if (model === 'all') {
    unit = await getUnitList(memberList);
  }

  if (unit.length && unitList.length !== unit.length) {
    let newData = unit.splice(unitList.length);
    let insertData: Array<AnyKeys<unit>> = [];
    newData.forEach((item) => {
      let doc = new UnitModel(item);
      insertData.push(doc);
    });

    await UnitModel.insertMany(insertData);
    unitList = await UnitModel.find({});
  }

  let unitDetail = await UnitDetailModel.find({});

  for (let index = unitDetail.length; index < unitList.length; index++) {
    const unit = unitList[index];
    let tag = true;
    while (tag) {
      try {
        let data = await getUnitDetail(unit);
        if (data) {
          let doc = new UnitDetailModel(data);
          await doc.save();
          tag = false;
        }
      } catch (err) {
        // console.log(err);
      }
    }
  }
  console.log('update success');
  ctx.body = true;
});

router.get('/update/unit/:id', async (ctx) => {
  let memberList = await MemberDetailModel.find({});
  memberList.forEach(async (e) => {
    e.voice = e.voice.replaceAll(/\n/g, '');
    await e.save();
  });
  ctx.body = true;
});

router.get('/init', async (ctx) => {
  let memberList: member[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './src/spider/member-list.json'), 'utf-8'));
  let memberListInsertData: Array<AnyKeys<member>> = [];
  memberList.forEach((item) => {
    let doc = new MemberModel(item);
    memberListInsertData.push(doc);
  });
  await MemberModel.insertMany(memberListInsertData);

  let memberDetail: memberDetail[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './src/spider/member-detail.json'), 'utf-8'));
  let insertData: Array<AnyKeys<memberDetail>> = [];
  memberDetail.forEach((item) => {
    let doc = new MemberDetailModel(item);
    insertData.push(doc);
  });
  await MemberDetailModel.insertMany(insertData);

  let unitList: unit[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './src/spider/unit-list.json'), 'utf-8'));
  let unitListInsertData: Array<AnyKeys<unit>> = [];
  unitList.forEach((item) => {
    let doc = new UnitModel(item);
    unitListInsertData.push(doc);
  });
  await UnitModel.insertMany(unitListInsertData);

  ctx.body = true;
});

router.get('/backup', async (ctx) => {
  let [memberList, memberDetail, unitList, unitDetail] = await Promise.all([MemberModel.find({}), MemberDetailModel.find({}), UnitModel.find({}), UnitDetailModel.find({})]);
  fs.writeFileSync(Path.resolve(process.cwd(), './src/spider/member-list.json'), JSON.stringify(memberList, null, '\t'));
  fs.writeFileSync(Path.resolve(process.cwd(), './src/spider/member-detail.json'), JSON.stringify(memberDetail, null, '\t'));
  fs.writeFileSync(Path.resolve(process.cwd(), './src/spider/unit-list.json'), JSON.stringify(unitList, null, '\t'));
  fs.writeFileSync(Path.resolve(process.cwd(), './src/spider/unit-detail.json'), JSON.stringify(unitDetail, null, '\t'));
  ctx.body = true;
});

router.get('/test', async (ctx) => {
  ctx.body = true;
});

export default router;
