import { Schema, model } from 'mongoose';

const MemberSchema = new Schema<member>({
  id: { type: Number, required: true },
  nikeName: { type: String, required: true },
  name: { type: String, required: true },
  spell: { type: String, required: true },
  url: { type: String, required: true },
  groupName: { type: String, required: true },
});

const MemberModel = model<member>('Member', MemberSchema);

const MemberDetailSchema = new Schema<memberDetail>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bwh: { type: String, required: true },
  birth: { type: String, required: true },
  favorite: { type: String, required: true },
  school: { type: String, required: true },
  voice: { type: String, required: true },
  groupName: { type: String, required: true },
  selfText: { type: String, required: true },
});

const MemberDetailModel = model<memberDetail>('MemberDetail', MemberDetailSchema);

export { MemberModel, MemberDetailModel };
