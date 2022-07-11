import axios from 'axios';

import { Card, CardList, CardStoryDetail } from '@/ProtoTypes';
import { CardParameter, CardRarity, CardStory, Skill } from 'hoshimi-types/ProtoMaster';
export const fetchCardList = () => axios.get<CardList[]>('/card/list');

export const fetchCardBase = (id: string) =>
  axios.get<{
    card: Card;
    skill: Skill;
  }>(`/card/base/${id}`);

export const fetchCardParameter = () => axios.get<CardParameter[]>('/card/parameter');
export const fetchCardRarity = () => axios.get<CardRarity[]>('/card/rarity');
export const fetchCardStoryDetail = (id: CardStory['storyId']) => axios.get<CardStoryDetail>(`/card/story/${id}`);
