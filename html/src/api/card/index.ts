import axios from 'axios';

import { CardDetail, CardList, CardStoryDetail } from '@/ProtoTypes';
import { CardParameter, CardRarity, CardStory, Message } from 'hoshimi-types/ProtoMaster';

export const fetchCardList = () => axios.get<CardList[]>('/card/list');

export const fetchCardBase = (id: string) => axios.get<CardDetail>(`/card/base/${id}`);

export const fetchCardParameter = () => axios.get<CardParameter[]>('/card/parameter');

export const fetchCardRarity = () => axios.get<CardRarity[]>('/card/rarity');

export const fetchCardStoryDetail = (id: CardStory['storyId']) => axios.get<CardStoryDetail>(`/card/story/${id}`);

export const fetchMessage = (id: Message['id']) => axios.get<Message>(`/card/message/${id}`);

export const fetchMessageList = (id: Message['characterId']) => axios.get<Message>(`/card/messageList/${id}`);
