import { Card, CardList, CardPropensity } from '@/ProtoTypes';
import { max } from 'lodash';

// ε‘ηεΎε
export function useCardPropensity(card: Card | CardList) {
  const propensityMap = new Map<number, CardPropensity>([
    [card.vocalRatioPermil, 'vocal'],
    [card.visualRatioPermil, 'visual'],
    [card.danceRatioPermil, 'dance'],
  ]);

  const propensityMax = max([card.vocalRatioPermil, card.visualRatioPermil, card.danceRatioPermil]);
  return propensityMap.get(propensityMax ?? 0) ?? 'vocal';
}
