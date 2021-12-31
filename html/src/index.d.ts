interface member {
  id: number;
  name: string;
  nikeName: string;
  spell: string;
  url: string;
  groupName: string;
}
interface memberDetail extends member {
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
interface unitDetail extends unit {
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
}
