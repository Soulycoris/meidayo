import { db } from '@/db';
import { fetchCardList, fetchCardParameter, fetchCardRarity } from '@/api/card';
import { Card, CardList, CardPropensity } from '@/ProtoTypes';
import { max } from 'lodash';

export async function useCardDb() {
  let card = await db.card.orderBy('order').reverse().toArray();
  if (!card.length) {
    const res = await fetchCardList();
    if (res.data) {
      card = res.data;
      db.card.bulkPut(card);
    }
  }
  return card;
}

export async function cardDbUpdate() {
  const res = await fetchCardList();
  let card = res.data;
  await db.card.bulkPut(card);
  return true;
}

export async function useCardParameterDb() {
  let cardParameter = await db.cardParameter.toArray();
  if (!cardParameter.length) {
    const res = await fetchCardParameter();
    if (res.data) {
      cardParameter = res.data;
      db.cardParameter.bulkPut(cardParameter);
    }
  }
  return cardParameter;
}

export async function useCardRarityDb() {
  let cardRarity = await db.cardRarity.toArray();
  if (!cardRarity.length) {
    const res = await fetchCardRarity();
    if (res.data) {
      cardRarity = res.data;
      db.cardRarity.bulkPut(cardRarity);
    }
  }
  return cardRarity;
}

// 卡牌倾向
export function useCardPropensity(card: Card | CardList) {
  const propensityMap = new Map<number, CardPropensity>([
    [card.vocalRatioPermil, 'vocal'],
    [card.visualRatioPermil, 'visual'],
    [card.danceRatioPermil, 'dance'],
  ]);

  const propensityMax = max([card.vocalRatioPermil, card.visualRatioPermil, card.danceRatioPermil]);
  return propensityMap.get(propensityMax ?? 0) ?? 'vocal';
}
