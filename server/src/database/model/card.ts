import { Schema, model } from 'mongoose';
import { Card } from '@/ProtoTypes';

const CardSchema = new Schema<Card>({
  id: { type: String, required: true, index: true, unique: true },
  assetId: String,
  name: String,
  description: String,
  type: Number,
  characterId: String,
  initialRarity: Number,
  cardParameterId: String,
  vocalRatioPermil: Number,
  danceRatioPermil: Number,
  visualRatioPermil: Number,
  staminaRatioPermil: Number,
  cardLevelReleaseId: String,
  skillId1: String,
  skillId2: String,
  skillId3: String,
  liveAbilityId: String,
  activityAbilityId: String,
  order: Number,
  releaseDate: String,
  rewardCostumeId: String,
  obtainMessage: String,
  stories: Array,
  messages: Array,
  homeTalks: Array,
});

const CardModel = model<Card>('Card', CardSchema);

export { CardModel };
