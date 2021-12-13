import db from '../../database';
import DBHelper from '../../database/DBHelper';
import koaRouter from 'koa-router';
const router = new koaRouter();

router.get('/unitlist', async (ctx) => {
  let unitList = await db.queryData(DBHelper.queryUnitList);
  ctx.body = unitList;
});

router.get('/unit/:id', async (ctx) => {
  let unitDetail = await db.queryData(DBHelper.queryUnitDetail, {
    $id: ctx.params.id,
  });
  ctx.body = unitDetail;
});

export default router;
