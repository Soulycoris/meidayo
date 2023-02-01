import { useSkillIcon } from '../composables/skill';
import { Card, CardDetail } from '@/ProtoTypes';
import { CardParameter, CardRarity, Costume } from 'hoshimi-types/ProtoMaster';
import fs from 'fs-extra';
import resolvePath from 'resolve-path';
import { findLast } from 'lodash';

const level = 200;
const rarity = 10;

// 卡牌倾向
export function useCardPropensity(card: Card) {
  const propensityMap = new Map([
    [card.vocalRatioPermil, '歌唱'],
    [card.visualRatioPermil, '表演'],
    [card.danceRatioPermil, '舞蹈'],
  ]);
  const valueMax = Math.max(card.vocalRatioPermil, card.visualRatioPermil, card.danceRatioPermil);
  return propensityMap.get(valueMax ?? 0) ?? '歌唱';
}

// 角色译名
export function transCharName(characterId: string) {
  const nameMap = new Map([
    ['char-ai', '小美山爱'],
    ['char-aoi', '井川葵'],
    ['char-chs', '白石千纱'],
    ['char-hrk', '佐伯遥子'],
    ['char-kan', 'kana'],
    ['char-kkr', '赤崎心'],
    ['char-kor', 'fran'],
    ['char-ktn', '长濑琴乃'],
    ['char-mei', '早坂芽衣'],
    ['char-mhk', 'miho'],
    ['char-mku', '初音未来'],
    ['char-mna', '长濑麻奈'],
    ['char-ngs', '伊吹渚'],
    ['char-rei', '一之濑怜'],
    ['char-rio', '神崎莉央'],
    ['char-rui', '天动瑠依'],
    ['char-ski', '白石沙季'],
    ['char-skr', '川咲樱'],
    ['char-smr', '奥山堇'],
    ['char-suz', '成宫铃'],
    ['char-szk', '兵藤雫'],
    ['char-yu', '铃村优'],
  ]);
  return nameMap.get(characterId) ?? characterId;
}

export function valueCalc(cardParameterId: string, Ppam: number, isStamina: boolean) {
  const cardParamList: CardParameter[] = fs.readJSONSync(resolvePath('./masterdata/CardParameter.json'));
  const cardRarityList: CardRarity[] = fs.readJSONSync(resolvePath('./masterdata/CardRarity.json'));
  const cardRarity = cardRarityList.find((e) => e.rarity === rarity);
  const cardParameter = cardParamList.filter((e) => e.id === cardParameterId);
  return Math.floor(Math.floor(+(cardParameter[level - 1]?.[isStamina ? 'staminaValue' : 'value'] ?? 1) * (Ppam / 1000)) * ((cardRarity?.parameterBonusPermil ?? 1) / 1000)) || Ppam;
}

// 获取服装名称
export function getCostumeName(costumeId: string) {
  const costumeList: Costume[] = fs.readJSONSync(resolvePath('./masterdata/Costume.json'));
  const costume = costumeList.find((e) => e.id === costumeId);
  return costume ? costume.name : '';
}

// 获取wiki角色编号
export function getCharId(characterId: string, cardId: string) {
  const cardList: Card[] = fs.readJSONSync(resolvePath('./masterdata/Card.json'));
  const charCardList = cardList.filter((e) => e.characterId === characterId).sort((e1, e2) => e1.order - e2.order);
  const index = charCardList.findIndex((e) => e.id === cardId);
  return index ? index + 1 : 1;
}

// 技能图标
export function composeSkillIconText(skillParts: string[], skillMark: string) {
  let text = '';
  for (const [index, part] of skillParts.entries()) {
    if (index === 3) {
      // debuff target
      if (skillMark === 'down') {
        text += '|角标色=#d80032';
      } else if (skillMark === 'oneself') {
        text += '|角标色=#d7d7d6';
      } else if (skillMark === 'opponent') {
        text += '|角标色=#fc7e44';
      }
      break;
    }
    if (!part) {
      text += '|';
    } else {
      text += '|' + part.replace('img_icon_skill-normal_', '技能图标-通用-') + '.png';
    }
  }
  return text;
}

export function composeCardPage(cardDetail: CardDetail) {
  const { card } = cardDetail;
  let skillText = '';
  for (const [index, skill] of cardDetail.skill.entries()) {
    const { skillBg, skillType, skillParts, skillMark } = useSkillIcon(skill);
    let skillBgType = '辅助';
    if (skillBg.includes('support')) {
      skillBgType = '支援';
    } else if (skillBg.includes('score')) {
      skillBgType = '得分';
    }

    const curLevel = findLast(skill.levels, (n) => level >= n.requiredCardLevel);
    if (skillType === 'SP') {
      skillText += `
      |演出技能图标${index + 1} = `;
    } else {
      const skillIconText = composeSkillIconText(skillParts, skillMark);
      skillText += `
      |演出技能图标${index + 1} = {{技能图标|${skillType}|${index + 1}|${skillBgType}${skillIconText}}}`;
    }

    const skillDesc = curLevel.description.replaceAll('\n', '<br/>');
    skillText += `
    |演出技能类别${index + 1} = ${skillType}
    |演出技能日文名${index + 1} = ${skill.name}
    |演出技能日文说明${index + 1} = ${skillDesc}
    |演出技能名${index + 1} = ${skill.name}
    |演出技能说明${index + 1} = ${skillDesc}`;
  }

  const charName = transCharName(card.characterId);
  const charId = getCharId(card.characterId, card.id);
  const yellText = transYell(card.liveAbilityId || card.activityAbilityId);

  const vocalVal = valueCalc(card.cardParameterId, card.vocalRatioPermil, false);
  const danceVal = valueCalc(card.cardParameterId, card.danceRatioPermil, false);
  const visualVal = valueCalc(card.cardParameterId, card.visualRatioPermil, false);
  const staminaVal = valueCalc(card.cardParameterId, card.staminaRatioPermil, true);

  let cosVal = card.rewardCostumeId.replace(/^\w+\-\w+\-/, '');
  const cosName = getCostumeName(card.rewardCostumeId);
  if (cosName) {
    cosVal += `,${cosName}`;
  }

  let text = `{{角色/卡牌详细
  |角色名 = ${charName}
  |卡牌编号 = ${charId}
  |卡牌名日文 = ${card.name}
  |卡牌名中文 = ${card.name}
  |类别 = ${card.type === 1 ? '得分' : card.type === 2 ? '辅助' : '支援'}
  |属性 = ${useCardPropensity(card)}
  |初期稀有度 = ${card.initialRarity}
  |属性歌唱数值 = ${vocalVal}
  |属性舞蹈数值 = ${danceVal}
  |属性表演数值 = ${visualVal}
  |属性体力数值 = ${staminaVal}
  ${skillText.slice(1)}
  ${yellText}
  |衣装 = ${cosVal}
  }}
  `;
  text = text.replace(/\n\s+/gi, '\n');

  return { charName, charId, text };
}

export function transYell(abilityId: string) {
  let yell = {
    icon: '',
    skill: '',
    skillDesc: '',
    skillTrans: '',
    skillDescTrans: '',
  };

  switch (abilityId) {
    case 'aab-fan_event_manager_exp_up':
      yell.icon = 'act_fan-event-manager-exp-up';
      yell.skill = 'MEXPアップ【ファンイベント】';
      yell.skillDesc = 'ファンイベントの獲得マネージャー経験値18.5%上昇';
      yell.skillTrans = '经纪人经验获取提升【粉丝活动】';
      yell.skillDescTrans = '粉丝活动取得的经纪人经验提升18.5%';
      break;
    case 'aab-promotion_accessory_multi_step_reward_up':
      yell.icon = 'act_promotion-accessory-multi-step-reward-up';
      yell.skill = 'アクセサリーアップ';
      yell.skillDesc = 'プロモーションのアクセサリ獲得率7.5%上昇';
      yell.skillTrans = '饰品取得提升';
      yell.skillDescTrans = '宣传取得饰品的概率提升7.5%';
      break;
    case 'aab-promotion_gold_up':
      yell.icon = 'act_promotion-gold-up';
      yell.skill = 'コインアップ';
      yell.skillDesc = 'プロモーションの獲得コイン3.0%上昇';
      yell.skillTrans = '硬币获取提升';
      yell.skillDescTrans = '宣传获取的硬币量提升3%';
      break;
    case 'aab-promotion_manager_exp_up':
      yell.icon = 'act_promotion-manager-exp-up';
      yell.skill = 'MEXPアップ【プロモーション】';
      yell.skillDesc = 'プロモーションの獲得マネージャー経験値7.5%上昇';
      yell.skillTrans = '经纪人经验获取提升【宣传】';
      yell.skillDescTrans = '宣传获得的经纪人经验提升7.5%';
      break;
    case 'aab-refresh_stamina_up':
      yell.icon = 'act_refresh-stamina-up';
      yell.skill = '元気回復アップ';
      yell.skillDesc = 'リフレッシュの回復量3.0%上昇';
      yell.skillTrans = '体力回复提升';
      yell.skillDescTrans = '休息的体力回复提升3%';
      break;
    case 'lba-active_skill_score_multiply':
      yell.icon = 'live_active-skill-score-multiply';
      yell.skill = 'Aスキルスコアアップ';
      yell.skillDesc = 'Aスキルスコア2.5%上昇';
      yell.skillTrans = 'A技能得分提升';
      yell.skillDescTrans = 'A技能得分提升2.5%';
      break;
    case 'lba-beat_score_multiply':
      yell.icon = 'live_beat-score-multiply';
      yell.skill = 'ビートスコアアップ';
      yell.skillDesc = 'ビートスコア4.0%上昇';
      yell.skillTrans = '节拍得分提升';
      yell.skillDescTrans = '节拍得分提升4%';
      break;
    case 'lba-critical_score_multiply':
      yell.icon = 'live_critical-score-multiply';
      yell.skill = 'クリティカルスコアアップ';
      yell.skillDesc = 'クリティカルスコア3.0%上昇';
      yell.skillTrans = '暴击分数提升';
      yell.skillDescTrans = '暴击分数提升3%';
      break;
    case 'lba-dance_multiply':
      yell.icon = 'live_dance-multiply';
      yell.skill = 'ダンスアップ';
      yell.skillDesc = 'ダンス3.0%上昇';
      yell.skillTrans = '舞蹈属性提升';
      yell.skillDescTrans = '舞蹈属性提升3%';
      break;
    case 'lba-mental_add':
      yell.icon = 'live_mental-add';
      yell.skill = 'メンタルアップ';
      yell.skillDesc = 'メンタル300上昇';
      yell.skillTrans = '精神提升';
      yell.skillDescTrans = '精神提升300';
      break;
    case 'lba-special_skill_score_multiply':
      yell.icon = 'live_special-skill-score-multiply';
      yell.skill = 'SPスキルスコアアップ';
      yell.skillDesc = 'SPスキルスコア5.0%上昇';
      yell.skillTrans = 'SP技能得分提升';
      yell.skillDescTrans = 'SP技能得分提升5%';
      break;
    case 'lba-stamina_add':
      yell.icon = 'live_stamina-add';
      yell.skill = 'スタミナアップ';
      yell.skillDesc = 'スタミナ210上昇';
      yell.skillTrans = '体力提升';
      yell.skillDescTrans = '体力提升210';
      break;
    case 'lba-technique_add':
      yell.icon = 'live_technique-add';
      yell.skill = 'クリティカルアップ';
      yell.skillDesc = 'クリティカル300上昇';
      yell.skillTrans = '暴击率提升';
      yell.skillDescTrans = '暴击率提升300';
      break;
    case 'lba-visual_multiply':
      yell.icon = 'live_visual-multiply';
      yell.skill = 'ビジュアルアップ';
      yell.skillDesc = 'ビジュアル3.0%上昇';
      yell.skillTrans = '表演属性提升';
      yell.skillDescTrans = '表演属性提升3%';
      break;
    case 'lba-vocal_multiply':
      yell.icon = 'live_vocal-multiply';
      yell.skill = 'ボーカルアップ';
      yell.skillDesc = 'ボーカル3.0%上昇';
      yell.skillTrans = '歌唱属性提升';
      yell.skillDescTrans = '歌唱属性提升3%';
      break;
  }

  const yellText = `|应援技能图标 = ${yell.icon ? `{{技能图标|Y|4|应援|技能图标-应援-${yell.icon}.png}}` : ''}
  |应援技能日文名 = ${yell.skill}
  |应援技能日文说明 = ${yell.skillDesc}
  |应援技能名 = ${yell.skillTrans}
  |应援技能说明 = ${yell.skillDescTrans}`;
  return yellText;
}
