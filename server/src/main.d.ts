interface member {
  nikeName: string;
  id: number;
  name: string;
  spell: string;
  url: string;
  groupName: string;
}
interface memberDetail {
  id: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  bwh: string;
  birth: string;
  favorite: string;
  school: string;
  voice: string;
  groupName: string;
  selfText: string;
}
interface unit {
  id: number;
  memberId: number;
  url: string;
  title: string;
  name: string;
  prefab: string;
  rarity: number;
  propensity: string;
  type: string;
}
interface unitDetail {
  id: number;
  spSkill: string;
  yellSkill: string;
  clothes: string;
  vocal: number;
  dance: number;
  visual: number;
  stamina: number;
  skill?: skill[];
}
interface skill {
  id?: number;
  skillType: string;
  skillName: string;
  skillText: string;
  skillIcon: string;
  skillBg: string;
}
declare const enum ChatType {
  Private = 'private',
  Group = 'group',
  Temp = 'temp',
}

interface IPrivateChat {
  chatID: number;
  chatType: ChatType.Private;
}

interface IGroupChat {
  chatID: number;
  chatType: ChatType.Group;
}

interface ITempChat {
  chatID: { qq: number; group: number; toString: () => string };
  chatType: ChatType.Temp;
}

type IChat = IPrivateChat | IGroupChat | ITempChat;

interface ILock {
  offset: string;
  lastActions: WikiEditResult[];
  subscribers: IChat[];
  updatedAt: string;
}

interface WikiEditResult {
  pageid: number;
  title: string;
  new: boolean;
  result: string;
  mediafiles: string[];
  timestamp: string;
}
