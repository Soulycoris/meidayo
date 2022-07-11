import { Schema, model } from 'mongoose';
import { Character } from '@/ProtoTypes';

const CharacterSchema = new Schema<Character>({
  id: { type: String, required: true, index: true, unique: true },
  assetId: String,
  characterGroupId: String,
  order: Number,
  name: String,
  enName: String,
  cv: String,
  age: String,
  birthday: String,
  height: String,
  weight: String,
  zodiacSign: String,
  hometown: String,
  favorite: String,
  unfavorite: String,
  profile: String,
  isNpc: Boolean,
  costumeIds: Array,
  altCharacters: Array,
  defaultCostumeId: String,
  color: String,
  activityFanEventWords: Array,
  talkArrivalMotionAssetId: String,
  personalityType: Array,
  simplePersonalityType: Array,
  sdPersonalityType: Array,
  costumeMotionAssetIds: Array,
  costumeVoiceAssetIds: Array,
  isLeftHanded: Boolean,
  psylliumColerType: Number,
  shortProfile: String,
  threeSize: String,
  catchphrase: String,
  firstName: String,
  idiom: String,
  isMemories: Boolean,
  defaultLiveCostumeId: String,
});

const CharacterModel = model<Character>('Character', CharacterSchema);

export { CharacterModel };
