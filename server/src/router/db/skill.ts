import koaRouter from 'koa-router';

import fs from 'fs-extra';
import Path from 'path';
import { AnyKeys } from 'mongoose';
import { Skill, ActivityAbility, LiveAbility } from 'hoshimi-types/ProtoMaster';

const router = new koaRouter();

import { ActivityAbilityModel, SkillModel, LiveAbilityModel } from '../../database/model';

router.get('/init', async (ctx) => {
  await SkillModel.deleteMany({});
  await ActivityAbilityModel.deleteMany({});
  await LiveAbilityModel.deleteMany({});

  let Skill: Skill[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/Skill.json'), 'utf-8'));
  let SkillList: Array<AnyKeys<Skill>> = [];
  Skill.forEach((item) => {
    let doc = new SkillModel(item);
    SkillList.push(doc);
  });

  SkillModel.insertMany(SkillList);

  let ActivityAbility: ActivityAbility[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/ActivityAbility.json'), 'utf-8'));
  let ActivityAbilityList: Array<AnyKeys<ActivityAbility>> = [];
  ActivityAbility.forEach((item) => {
    let doc = new ActivityAbilityModel(item);
    ActivityAbilityList.push(doc);
  });

  ActivityAbilityModel.insertMany(ActivityAbilityList);

  let LiveAbility: LiveAbility[] = JSON.parse(fs.readFileSync(Path.resolve(process.cwd(), './masterdata/LiveAbility.json'), 'utf-8'));
  let LiveAbilityList: Array<AnyKeys<LiveAbility>> = [];
  LiveAbility.forEach((item) => {
    let doc = new LiveAbilityModel(item);
    LiveAbilityList.push(doc);
  });

  LiveAbilityModel.insertMany(LiveAbilityList);

  ctx.body = Skill;
});

export default router;
