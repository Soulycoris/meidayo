import { defineStore } from 'pinia';
import { useCharacterDb } from '@/composables/character';
import { Character } from '@/ProtoTypes';

export const useCharacterStore = defineStore('character', () => {
  let character = ref<Character[]>([]);

  // Getters
  const characterMap = computed(() => {
    let map = new Map();
    for (const item of character.value) {
      map.set(item.id, item);
    }
    return map;
  });

  // Action
  async function init() {
    character.value = await useCharacterDb();
  }

  init();
  return {
    character,
    characterMap,
  };
});
