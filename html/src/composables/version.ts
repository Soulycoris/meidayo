import { db } from '@/db';
import { fetchVersion } from '@/api/common';
import { characterDbUpdate } from './character';
import { cardDbUpdate } from './card';

export async function useVersion() {
  let masterVersion = await db.masterVersion.toArray();
  let version = masterVersion[0]?.version;
  const { data } = await fetchVersion();
  if (version !== data) {
    version = data;
    db.masterVersion.put({ id: 'meidayo', version });
    cardDbUpdate();
    characterDbUpdate();
  }
  return version;
}
