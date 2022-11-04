import { Story } from 'hoshimi-types/ProtoMaster';

import { Schema, model } from 'mongoose';

const StorySchema = new Schema<Story>({
  id: String,
  sectionName: String,
  name: String,
  description: String,
  rewardId: String,
  advPlayTypes: Array,
  advAssetIds: Array,
});

const StoryModel = model<Story>('Story', StorySchema);

export { StoryModel };
