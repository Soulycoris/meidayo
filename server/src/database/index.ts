import { connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
// interface User {
//     name: string;
//     email: string;
//     avatar?: string;
//   }

//   // 2. Create a Schema corresponding to the document interface.
//   const schema = new Schema<User>({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     avatar: String
//   });

//   // 3. Create a Model.
//   const UserModel = model<User>('User', schema);

export async function run(): Promise<void> {
  await connect('mongodb://121.196.97.42:27017/meidayo');
}
