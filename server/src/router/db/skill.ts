import koaRouter from 'koa-router';
import fs from 'fs-extra';
import resolvePath from 'resolve-path';
import { Skill, ActivityAbility, LiveAbility, PhotoAbility } from 'hoshimi-types/ProtoMaster';
import { ActivityAbilityModel, SkillModel, LiveAbilityModel, PhotoAbilityModel } from '../../database/model';

const router = new koaRouter();

router.get('/init', async (ctx) => {
  ctx.body = await initSkill();
});

export const initSkill = async () => {
  await Promise.all([SkillModel.deleteMany({}), ActivityAbilityModel.deleteMany({}), LiveAbilityModel.deleteMany({}), PhotoAbilityModel.deleteMany({})]);

  let Skill: Skill[] = fs.readJSONSync(resolvePath('./masterdata/Skill.json'));

  let ActivityAbility: ActivityAbility[] = fs.readJSONSync(resolvePath('./masterdata/ActivityAbility.json'));

  let LiveAbility: LiveAbility[] = fs.readJSONSync(resolvePath('./masterdata/LiveAbility.json'));

  let PhotoAbility: PhotoAbility[] = fs.readJSONSync(resolvePath('./masterdata/PhotoAbility.json'));

  await Promise.all([SkillModel.insertMany(Skill), ActivityAbilityModel.insertMany(ActivityAbility), LiveAbilityModel.insertMany(LiveAbility), PhotoAbilityModel.insertMany(PhotoAbility)]);

  return Skill;
};

export default router;
