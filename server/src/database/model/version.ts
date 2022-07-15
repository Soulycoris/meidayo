import { Schema, model } from 'mongoose';

type Version = {
  id: string;
  version: string;
};

const VersionSchema = new Schema<Version>({
  id: String,
  version: String,
});

const VersionModel = model<Version>('Version', VersionSchema);

export { VersionModel };
