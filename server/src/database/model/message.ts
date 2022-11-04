import { Message } from 'hoshimi-types/ProtoMaster';
import { Schema, model } from 'mongoose';

const MessageSchema = new Schema<Message>({
  id: String,
  messageGroupId: String,
  name: String,
  type: Number,
  characterId: String,
  instantType: Number,
  rarityType: Number,
  unlockConditionId: String,
  details: Array,
});

const MessageModel = model<Message>('Message', MessageSchema);

export { MessageModel };
