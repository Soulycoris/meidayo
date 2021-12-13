import koaRouter from 'koa-router';
import fs from 'fs-extra';
import Path from 'path';

import db from '../../database';
import DBHelper from '../../database/DBHelper';
// import { updateDatabase } from '../../utils/utils';
const router = new koaRouter();
router.get('/close', async (ctx) => {
  db.close();
  ctx.body = true;
});
router.get('/init', async (ctx) => {
  await db.createTable(DBHelper.createMemberList);
  await db.createTable(DBHelper.createMemberDetail);
  await db.createTable(DBHelper.createUnitList);
  await db.createTable(DBHelper.createUnitDetail);
  ctx.body = true;
});
router.get('/update', async (ctx) => {
  // let memberList: member[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './src/spider/member-list.json'), 'utf-8'));
  // db.insertData(
  //   DBHelper.insertMemberList,
  //   memberList.map((e) => Object.values(e))
  // );

  // let memberDetail: memberDetail[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './src/spider/member-detail.json'), 'utf-8'));
  // db.insertData(
  //   DBHelper.insertMemberDetail,
  //   memberDetail.map((e) => Object.values(e))
  // );
  // let unitList: unit[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './src/spider/unit-list.json'), 'utf-8'));
  // db.insertData(
  //   DBHelper.insertUnitList,
  //   unitList.map((e) => Object.values(e))
  // );
  // let unitDetail: unitDetail[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './src/spider/unit-detail.json'), 'utf-8'));
  // db.insertData(
  //   DBHelper.insertUnitDetail,
  //   unitDetail.map((e) => Object.values(e))
  // );
  ctx.body = true;
});
router.get('/version', async (ctx) => {
  // updateDatabase();
  ctx.body = true;
});

export default router;
