import { Schema, model } from 'mongoose';

const UnitSchema = new Schema<unit>({
  id: { type: Number, required: true },
  memberId: { type: Number, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  name: { type: String, required: true },
  prefab: { type: String, required: true },
  propensity: { type: String, required: true },
  rarity: { type: Number, required: true },
  type: { type: String, required: true },
});

const UnitModel = model<unit>('Unit', UnitSchema);

const UnitDetailSchema = new Schema<unitDetail>({
  id: { type: Number, required: true },
  spSkill: String,
  yellSkill: String,
  clothes: String,
  vocal: { type: Number, required: true },
  dance: { type: Number, required: true },
  visual: { type: Number, required: true },
  stamina: { type: Number, required: true },
  skill: Array,
});

const UnitDetailModel = model<unitDetail>('UnitDetail', UnitDetailSchema);

export { UnitModel, UnitDetailModel };
