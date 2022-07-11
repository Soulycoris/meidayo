import { defineStore } from 'pinia';
import { useCardDb, useCardParameterDb, useCardRarityDb } from '@/composables/card';
import { CardList } from '@/ProtoTypes';
import { CardParameter, CardRarity } from 'hoshimi-types/ProtoMaster';

export const useCardStore = defineStore('card', () => {
  let card = ref<CardList[]>([]);
  let cardRarity = ref<CardRarity[]>([]);
  let cardParameter = ref<CardParameter[]>([]);

  // Getters

  // Action
  async function initCard() {
    card.value = await useCardDb();
  }
  async function initCardRarity() {
    cardRarity.value = await useCardRarityDb();
  }
  async function initCardParameter() {
    cardParameter.value = await useCardParameterDb();
  }

  initCard();
  initCardRarity();
  initCardParameter();

  return {
    card,
    cardRarity,
    cardParameter,
  };
});
