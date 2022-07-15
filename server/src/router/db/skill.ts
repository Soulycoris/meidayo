import koaRouter from 'koa-router';
import fs from 'fs-extra';
import resolvePath from 'resolve-path';
import { Skill, ActivityAbility, LiveAbility } from 'hoshimi-types/ProtoMaster';
import { ActivityAbilityModel, SkillModel, LiveAbilityModel } from '../../database/model';

const router = new koaRouter();

router.get('/init', async (ctx) => {
  ctx.body = await initSkill();
});

export const initSkill = async () => {
  await SkillModel.deleteMany({});
  await ActivityAbilityModel.deleteMany({});
  await LiveAbilityModel.deleteMany({});

  let Skill: Skill[] = fs.readJSONSync(resolvePath('./masterdata/Skill.json'), 'utf-8');
  SkillModel.insertMany(Skill);

  let ActivityAbility: ActivityAbility[] = fs.readJSONSync(resolvePath('./masterdata/ActivityAbility.json'), 'utf-8');
  ActivityAbilityModel.insertMany(ActivityAbility);

  let LiveAbility: LiveAbility[] = fs.readJSONSync(resolvePath('./masterdata/LiveAbility.json'), 'utf-8');
  LiveAbilityModel.insertMany(LiveAbility);

  return Skill;
};

export default router;
