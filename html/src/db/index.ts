import Dexie, { Table } from 'dexie';
import { Character, CardList } from '@/ProtoTypes';
import { CardParameter, CardRarity } from 'hoshimi-types/ProtoMaster';

export class MeidayoDexie extends Dexie {
  card!: Table<CardList>;
  cardParameter!: Table<CardParameter>;
  cardRarity!: Table<CardRarity>;
  character!: Table<Character>;
  masterVersion!: Table<{
    id: string;
    version: string;
  }>;
  constructor() {
    super('meidayo');
    this.version(11).stores({
      card: '&id,*assetId,*order',
      cardParameter: '++_id',
      cardRarity: '&rarity',
      character: '&id,*assetId,*order',
      masterVersion: '&id',
    });
  }
}

export const db = new MeidayoDexie();
