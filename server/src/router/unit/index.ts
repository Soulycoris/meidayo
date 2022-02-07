import koaRouter from 'koa-router';
const router = new koaRouter();
import { MemberModel, MemberDetailModel, UnitModel, UnitDetailModel } from '../../database/model';

router.get('/list', async (ctx) => {
  let unitList = await UnitModel.find({}).sort({ _id: -1 });
  ctx.body = unitList;
});

router.get('/base/:id', async (ctx) => {
  let [unit, unitDetail] = await Promise.all([UnitModel.findOne({ id: ctx.params.id }), UnitDetailModel.findOne({ id: ctx.params.id })]);

  ctx.body = Object.assign(unit.toObject(), unitDetail?.toObject() ?? {});
});

router.get('/member/:id', async (ctx) => {
  let [member, memberDetail] = await Promise.all([MemberModel.findOne({ id: ctx.params.id }), MemberDetailModel.findOne({ id: ctx.params.id })]);
  ctx.body = Object.assign(member.toObject(), memberDetail.toObject());
});

export default router;
