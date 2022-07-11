import { Skill, ActivityAbility, LiveAbility } from 'hoshimi-types/ProtoMaster';
import { Schema, model } from 'mongoose';

const SkillSchema = new Schema<Skill>({
  id: String,
  name: String,
  categoryType: Number,
  levels: Array,
  assetId: String,
});

const ActivityAbilitySchema = new Schema<ActivityAbility>({
  id: String,
  name: String,
  description: String,
  levels: Array,
});

const LiveAbilitySchema = new Schema<LiveAbility>({
  id: String,
  name: String,
  description: String,
  levels: Array,
});

const SkillModel = model<Skill>('Skill', SkillSchema);
const ActivityAbilityModel = model<ActivityAbility>('ActivityAbility', ActivityAbilitySchema);
const LiveAbilityModel = model<LiveAbility>('LiveAbility', LiveAbilitySchema);

export { SkillModel, ActivityAbilityModel, LiveAbilityModel };
