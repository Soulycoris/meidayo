import { db } from '@/db';
import { fetchCharacterList } from '@/api/character';
import { useCharacterStore } from '@/stores/character';

export async function useCharacterDb() {
  let character = await db.character.orderBy('order').toArray();
  if (!character.length) {
    const res = await fetchCharacterList();
    if (res.data) {
      character = res.data;
      db.character.bulkPut(character);
    }
  }
  return character;
}

export async function characterDbUpdate() {
  const res = await fetchCharacterList();
  let character = res.data;
  db.character.bulkPut(character);
  const characterStore = useCharacterStore();
  characterStore.$patch({ character });

  return character;
}
