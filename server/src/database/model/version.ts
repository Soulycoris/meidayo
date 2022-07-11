import { Schema, model } from 'mongoose';

type Version = {
  version: string;
};

const VersionSchema = new Schema<Version>({
  version: String,
});

const VersionModel = model<Version>('Version', VersionSchema);

export { VersionModel };
