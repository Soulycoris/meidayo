import { connect } from 'mongoose';
import auth from './auth';

export async function run(): Promise<void> {
  await connect('mongodb://121.196.97.42:27017/meidayo', {
    ...auth,
  });
}
