import axios from 'axios';
import { Character } from '@/ProtoTypes';
export const fetchCharacterList = () => axios.get<Character[]>('/character/list');
