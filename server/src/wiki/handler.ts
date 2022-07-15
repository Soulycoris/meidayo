import { useSkillIcon } from '../composables/skill';
import { Card, CardDetail, Character } from '@/ProtoTypes';
import fs from 'fs-extra';
import resolvePath from 'resolve-path';

import Wiki from './wiki';

const { readdir } = fs.promises;

interface WorkerOption {
  wikiSessionCookie: string;
}

// 卡牌倾向
export function useCardPropensity(card: Card) {
  const propensityMap = new Map([
    [card.vocalRatioPermil, '歌唱'],
    [card.visualRatioPermil, '舞蹈'],
    [card.danceRatioPermil, '表演'],
  ]);
  const valueMax = Math.max(card.vocalRatioPermil, card.visualRatioPermil, card.danceRatioPermil);
  return propensityMap.get(valueMax ?? 0) ?? '歌唱';
}

const level = 200;

export default class {
  private publisher: Wiki;
  private wikiSessionCookie: string;

  constructor(opt: WorkerOption) {
    this.publisher = new Wiki();
    this.wikiSessionCookie = opt.wikiSessionCookie;
  }

  public launch = async () => {
    await this.publisher.login(this.wikiSessionCookie);
  };

  public uploadAssets = async () => {
    const files = await readdir('./assets/upload');
    for (const file of files) {
      await this.publisher.uploadMediaItems(`./assets/upload/${file}`, file);
    }
  };

  public postCard = async (cardDetail: CardDetail) => {
    const { card } = cardDetail;
    const charList: Character[] = JSON.parse(fs.readFileSync(resolvePath('./masterdata/Character.json'), 'utf-8'));
    const char = charList.find((item) => item.id === card.assetId);
    const title = `${char.name}/${card.id}`;
    let skillText = '';
    for (const [index, skill] of cardDetail.skill.entries()) {
      const { skillBg, skillType, skillMark, skillParts } = useSkillIcon(skill);
      const curLevel = skill.levels.at(-1);
      skillText += `
      |演出技能图标${index + 1} = {{技能图标|${skillType}|${index + 1}|辅助|技能图标-通用-vocal-up.png|技能图标-通用-score-get.png}}
      |演出技能类别${index + 1} = ${skillType}
      |演出技能日文名${index + 1} = ${skill.name}
      |演出技能日文说明${index + 1} = ${curLevel.description}
      |演出技能名${index + 1} = 
      |演出技能说明${index + 1} = `;
    }
    const text = `{{角色/卡牌详细
    |角色名 = ${char.name}
    |卡牌编号 = ${card.id}
    |卡牌名日文 = ${card.name}
    |卡牌名中文 = 
    |类别 = ${card.type === 1 ? '得分' : card.type === 2 ? '辅助' : '支援'}
    |属性 = ${useCardPropensity(card)}
    |初期稀有度 = ${card.initialRarity}
    |属性歌唱数值 = ${card.vocalRatioPermil}
    |属性舞蹈数值 = ${card.danceRatioPermil}
    |属性表演数值 = ${card.visualRatioPermil}
    |属性体力数值 = ${card.staminaRatioPermil}
    ${skillText}
    <!--支援技能的图标，技能类别固定为Y，不需要填写，其他跟演出技能一样，没有Y技能下面全留空--> 
    |应援技能图标 = {{技能图标|Y|4|应援|技能图标-应援-live_vocal-multiply.png}}
    |应援技能日文名 = ボーカルアップ
    |应援技能日文说明 = ボーカル3%上昇
    |应援技能名 = 歌唱属性提升
    |应援技能说明 = 歌唱属性提升3%
    <!-- 衣装需要按照命名规范上传图标文件，数值星数只有在更新旧卡数值时需要设-->
    |衣装 = mizg-02,ソレイユホットサマー
    }}
    `;

    this.publisher.post(title, text);
  };
}
