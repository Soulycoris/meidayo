interface member {
  nike_name: string;
  id: number;
  name: string;
  spell: string;
  url: string;
  group_name: string;
}
interface memberDetail {
  member_id: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  bwh: string;
  birth: string;
  favorite: string;
  school: string;
  voice: string;
  group_name: string;
  self_text: string;
}
interface unit {
  id: number;
  member_id: number;
  title: string;
  name: string;
  rarity: number;
  propensity: string;
  type: string;
  prefab: string;
}
interface unitDetail extends unit {
  sp_skill: string;
  yell_skill: string;
  clothes: string;
  vocal: number;
  dance: number;
  visual: number;
  stamina: number;
  skill_1: string;
  skill_1_type: string;
  skill_1_text: string;
  skill_2: string;
  skill_2_type: string;
  skill_2_text: string;
  skill_3: string;
  skill_3_type: string;
  skill_3_text: string;
  skill_yell: string;
  skill_yell_text: string;
}
