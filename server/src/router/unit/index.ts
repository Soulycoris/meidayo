import db from '../../database';
import DBHelper from '../../database/DBHelper';
import koaRouter from 'koa-router';
const router = new koaRouter();

router.get('/list', async (ctx) => {
  let unitList = await db.queryData(DBHelper.queryUnitList);
  ctx.body = unitList;
});

router.get('/base/:id', async (ctx) => {
  let unitDetail = (await db.queryData(DBHelper.queryUnitDetail, {
    $id: ctx.params.id,
  })) as unitDetail[];
  let skill = (await db.queryData(DBHelper.querySkillList, {
    $id: ctx.params.id,
  })) as skillList[];
  if (unitDetail.length) {
    ctx.body = Object.assign(unitDetail[0], { skill: skill });
  } else {
    ctx.body = {};
  }
});

export default router;
