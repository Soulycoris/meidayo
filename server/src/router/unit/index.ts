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
  if (unitDetail.length) {
    ctx.body = unitDetail[0];
  } else {
    ctx.body = {};
  }
});

export default router;
