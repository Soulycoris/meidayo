import { skillCategoryTypeMap } from './typeMap';
import { ActivityAbility, LiveAbility, Skill } from 'hoshimi-types/ProtoMaster';

export function useSkillIcon(skill: Skill, level = 6) {
  const skillBg = useSkillBg(skill, level);
  const skillType = useSkillType(skill);
  const skillParts = useSkillParts(skill, level);
  const skillMark = skillParts[3]?.split('_')[0] ?? '';
  return { skillBg, skillType, skillMark, skillParts };
}

export function useYellSkillIcon(skill: ActivityAbility | LiveAbility, level: number) {
  const skillBg = `bg_yell_${level >= 6 ? 3 : level >= 4 ? 2 : 1}`;
  const skillType = 'Y';
  const [ef, parts] = skill.id.split('-');
  // img_icon_yell-live_vocal-multiply
  const skillParts = [`img_icon_yell-${ef.includes('aab') ? 'act_' : 'live_'}${parts.replaceAll('_', '-')}`];
  const skillMark = '';
  return { skillBg, skillType, skillMark, skillParts };
}

export function useSkillBg(item: Skill, level: number) {
  let type = skillCategoryTypeMap.get(item.categoryType)?.name;
  let skillBg = 'bg_';
  if (type === 'SP') {
    skillBg += 'special';
  } else if (type === 'Y') {
    skillBg += 'yell';
  } else {
    // bg_score_2 蓝
    // bg_support_2 绿
    // bg_strength_2 天蓝
    let icons = item.levels.at(level - 1)?.skillDetails;
    if (!icons?.length) {
      return '';
    }
    if (icons.length === 1 && icons[0].efficacyId.includes('score-get')) {
      skillBg += 'score';
    } else if (icons.some((e) => /up|boost/.test(e.efficacyId) && !isDebuff(e.efficacyId))) {
      skillBg += 'strength';
    } else {
      skillBg += 'support';
    }
  }
  return `${skillBg}_${level >= 6 ? 3 : level >= 4 ? 2 : 1}`;
}
export function useSkillType(item: Skill) {
  return skillCategoryTypeMap.get(item.categoryType)?.name ?? '';
}
export function useSkillParts(item: Skill, level: number) {
  let type = skillCategoryTypeMap.get(item.categoryType)?.name;
  let skillParts: string[] = [];
  if (type === 'SP') {
    skillParts.push(`img_icon_skill_${item.assetId}`);
  } else {
    const skillDetails = item.levels.at(level - 1)?.skillDetails;
    if (skillDetails) {
      for (const detail of skillDetails) {
        let [, assets, , target, targetType] = detail?.efficacyId.split('-') ?? [];
        let prefab = assets?.replaceAll('_', '-');
        skillParts.push(prefab ? `img_icon_skill-normal_${prefab}` : '');
        if (isDebuff(prefab)) {
          skillParts[3] = target === 'target' ? targetType : target;
        }
      }
      // 调整技能位置
      if (skillParts.length > 1) {
        // debuff技能放3号
        let index = skillParts.findIndex((e) => isDebuff(e));
        if (index > -1 && index != 2) {
          [skillParts[2], skillParts[index]] = [skillParts[index] ?? '', skillParts[2] ?? ''];
        }

        // 得分技能放2号
        index = skillParts.findIndex((e) => e.includes('score-get'));
        if (index > -1 && index != 1 && skillParts[1]) {
          [skillParts[1], skillParts[index]] = [skillParts[index], skillParts[1]];
        }

        // 3号不是debuff去掉
        if (skillParts[2] && !isDebuff(skillParts[2])) {
          skillParts.splice(2, 1);
        }
      }
    }
  }
  return skillParts;
}

function isDebuff(skillDetail: string) {
  return /down|consumption-increase|impossible|erasing/.test(skillDetail);
}
