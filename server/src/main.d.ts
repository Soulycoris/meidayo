interface member {
  nike_name: string;
  id: string;
  name: string;
  spell: string;
  url: string;
  group_name: string;
}
interface memberDetail {
  member_id: string;
  name: string;
  age: string;
  height: string;
  weight: string;
  bwh: string;
  birth: string;
  favorite: string;
  school: string;
  voice: string;
  group_name: string;
  self_text: string;
}
interface unit {
  id: string;
  member_id: string;
  url: string;
  title: string;
  name: string;
  prefab: string;
  rarity: string;
  propensity: string;
  type: string;
}
interface unitDetail {
  name: string;
  unit_id: string;
  member_id: string;
  title: string;
  sp_skill: string;
  yell_skill: string;
  clothes: string;
  vocal: string;
  dance: string;
  visual: string;
  stamina: string;
  skill?: skillList[];
  skill_1?: string;
  skill_1_type?: string;
  skill_1_text?: string;
  skill_2?: string;
  skill_2_type?: string;
  skill_2_text?: string;
  skill_3?: string;
  skill_3_type?: string;
  skill_3_text?: string;
  skill_yell?: string;
  skill_yell_text?: string;
}
interface skillList {
  id: string;
  skill_type: string;
  skill_name: string;
  skill_text: string;
  skill_icon?: string;
}
