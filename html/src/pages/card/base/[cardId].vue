<template>
  <ipNav class="top-0 left-0 right-0 b-transparent" style="position: fixed" leftArrow :border="true" @on-left-click="goBack">
    <template #title></template>
    <template #right>
      <svg @click="eventLanguageChange" t="1640247802490" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5623" width="16" height="16">
        <path d="M995.991511 893.736383a30.181561 30.181561 0 0 1-30.181561-30.181561V127.849092A67.48597 67.48597 0 0 0 898.203254 60.363122H162.980429a30.181561 30.181561 0 0 1 0-60.363122h735.222825A127.909455 127.909455 0 0 1 1026.173072 127.849092v735.70573a30.181561 30.181561 0 0 1-30.181561 30.181561z" p-id="5624" fill="#ffffff"></path>
        <path d="M784.720585 1024H108.653619a108.653619 108.653619 0 0 1-108.653619-108.653619V238.736147a108.653619 108.653619 0 0 1 108.653619-108.653619h676.066966a108.653619 108.653619 0 0 1 108.653619 108.653619v676.791323a108.653619 108.653619 0 0 1-108.653619 108.47253zM108.653619 190.626739a48.290498 48.290498 0 0 0-48.290497 48.290498v676.610233a48.290498 48.290498 0 0 0 48.290497 48.290497h676.066966a48.290498 48.290498 0 0 0 48.290497-48.290497V238.736147a48.290498 48.290498 0 0 0-48.290497-48.290497z" p-id="5625" fill="#ffffff"></path>
        <path d="M663.028531 728.824334a20.644188 20.644188 0 0 1-7.424664 16.177317 26.378684 26.378684 0 0 1-18.108937 6.458854 22.937986 22.937986 0 0 1-22.63617-15.513323l-45.63452-104.790379H325.41759l-46.539967 104.790379a22.937986 22.937986 0 0 1-22.636171 15.513323 26.499411 26.499411 0 0 1-18.108936-6.821033 21.06673 21.06673 0 0 1-7.786843-16.479132 22.515444 22.515444 0 0 1 2.595614-10.322094l184.952606-411.374676a27.827399 27.827399 0 0 1 11.650082-13.581703 32.958265 32.958265 0 0 1 17.143127-4.527234 32.535723 32.535723 0 0 1 17.444942 4.82905 30.181561 30.181561 0 0 1 11.650083 13.279887l184.952605 411.374676a23.722707 23.722707 0 0 1 2.293799 10.986088zM549.847677 587.152087l-102.617307-232.156567-102.375855 232.156567z" p-id="5626" fill="#ffffff"></path>
        <path
          d="M637.796746 757.496817a28.913935 28.913935 0 0 1-28.129215-19.255836l-44.306531-101.047866h-236.019807l-44.970526 101.168592a28.793209 28.793209 0 0 1-28.129215 19.13511 32.414996 32.414996 0 0 1-22.092902-8.330111 26.921952 26.921952 0 0 1-9.839189-21.006366 29.457203 29.457203 0 0 1 3.199245-13.038435l184.892243-411.133223a34.044801 34.044801 0 0 1 14.12497-16.298043 39.718934 39.718934 0 0 1 40.503655 0.422542 36.217873 36.217873 0 0 1 13.943881 15.815138l184.952606 411.374676a30.181561 30.181561 0 0 1 3.138882 13.521339 26.318321 26.318321 0 0 1-9.537373 20.704551 32.29427 32.29427 0 0 1-21.730724 7.967932z m-316.302759-132.376327H573.449658l47.505777 108.65362a16.962037 16.962037 0 0 0 17.082764 12.072624 20.10092 20.10092 0 0 0 13.823154-5.010139 14.426786 14.426786 0 0 0 5.372318-11.589719 18.95402 18.95402 0 0 0-1.93162-8.330111l-185.314784-411.978307a24.929969 24.929969 0 0 0-9.356284-10.62391 26.076869 26.076869 0 0 0-13.943881-3.923602 26.559774 26.559774 0 0 0-13.762792 3.68215 22.032539 22.032539 0 0 0-9.175194 10.804999l-185.314784 411.435039a17.505305 17.505305 0 0 0-2.052347 7.847206 15.030417 15.030417 0 0 0 5.674134 12.072624 20.704551 20.704551 0 0 0 14.185333 5.311955 16.901674 16.901674 0 0 0 17.022401-12.072625z m237.649611-31.932091h-223.343551l111.188871-253.162933z m-205.234614-12.072624h186.642773l-93.502476-211.270927zM651.921717 891.020042H253.525112a30.181561 30.181561 0 0 1 0-60.363121h398.396605a30.181561 30.181561 0 0 1 0 60.363121z"
          p-id="5627"
          fill="#ffffff"
        ></path>
      </svg>
    </template>
  </ipNav>
  <div class="card-base min-h-screen c-white text-opacity-80 pt-10">
    <transition name="fade">
      <div class="min-h-50" style="transition: height 2s ease" v-if="cardDetail.card.id">
        <img class="img-max" :src="cardCgImg()" alt="" srcset="" />
      </div>
    </transition>
    <cardListItem :cardList="curcard" @on-click="toMember"> </cardListItem>
    <div class="p-2">
      <div class="flex justify-between items-center mb-3 text-size-lg">
        <div class="status-sum w65% flex-auto flex flex-wrap justify-center relative" :class="'base-' + cardPropensity">{{ statusSum }}</div>
        <div class="flex-auto flex flex-wrap">
          <div class="base-vocal w50% flex-auto flex items-center fw-bold mt-1 mb-1">
            <div class="maskedimage maskedimage-vocal"></div>
            <span>{{ valueCalc(cardDetail.card.vocalRatioPermil) }}</span>
          </div>
          <div class="base-dance w50% flex-auto flex items-center fw-bold mt-1 mb-1">
            <div class="maskedimage maskedimage-dance"></div>
            <span>{{ valueCalc(cardDetail.card.danceRatioPermil) }}</span>
          </div>
          <div class="base-visual w50% flex-auto flex items-center fw-bold mt-1 mb-1">
            <div class="maskedimage maskedimage-visual"></div>
            <span>{{ valueCalc(cardDetail.card.visualRatioPermil) }}</span>
          </div>
          <div class="base-stamina w50% flex-auto flex items-center fw-bold mt-1 mb-1">
            <div class="maskedimage maskedimage-stamina"></div>
            <span>{{ valueCalc(cardDetail.card.staminaRatioPermil, true) }}</span>
          </div>
        </div>
      </div>
      <template v-for="skill in cardDetail.skill" :key="index">
        <div class="flex fw-bold">
          <div class="w-16 h-16 relative fill-none">
            <skillIcon class="absolute w-32 top-50% left-50% transform" style="--un-translate-x: -50%; --un-translate-y: -50%; --un-scale-x: 0.5; --un-scale-y: 0.5" :skill="skill"></skillIcon>
          </div>
          <div class="flex-1 flex flex-col justify-around pl-4 pr-4">
            <div class="text-opacity-80 fw-bold text-size-lg">{{ skill.name }}</div>
          </div>
        </div>
        <div class="w100% flex-none mt-1.5 mb-8 fw-bold text-opacity-80 text-size-sm" style="letter-spacing: 1px" v-html="skillDesc(skill.levels)"></div>
      </template>
      <template v-if="yellSkill">
        <div class="flex fw-bold">
          <div class="w-16 h-16 relative fill-none">
            <skillIcon class="absolute w-32 top-50% left-50% transform" style="--un-translate-x: -50%; --un-translate-y: -50%; --un-scale-x: 0.5; --un-scale-y: 0.5" :yell-skill="yellSkill"></skillIcon>
          </div>
          <div class="flex-1 flex flex-col justify-around pl-4 pr-4">
            <div class="text-opacity-80 fw-bold text-size-lg">{{ yellSkill.name }}</div>
          </div>
        </div>
        <div class="w100% flex-none mt-1.5 mb-8 fw-bold text-opacity-80 text-size-sm" style="letter-spacing: 1px" v-html="skillDesc(yellSkill.levels)"></div>
      </template>
    </div>
  </div>
  <div class="p-2 c-white" v-if="cardDetail.card.stories.length">
    <h3 class="mt-0">剧情故事</h3>
    <div class="flex">
      <div class="w-16 h-16 mr-4 rd-1 overflow-hidden relative" v-for="(story, index) in cardDetail.card.stories" :key="index" @click="onStoryShow(story)">
        <img class="img-max" v-lazy="cardHeadIcon" />
        <div class="absolute bottom-0 right-0">#{{ index + 1 }}</div>
      </div>
    </div>
  </div>
  <!-- <div class="p-2 c-white" v-if="cardDetail.card.messages.length">
    <h3 class="mt-0">消息电话</h3>
    <div class="flex">
      <div class="w-16 h-16 mr-4 rd-1 overflow-hidden relative" v-for="(messages, index) in cardDetail.card.messages" :key="index" @click="onMessageShow(messages)">
        <img class="img-max" v-lazy="cardHeadIcon" />
        <div class="absolute bottom-0 right-0">#{{ index + 1 }}</div>
      </div>
    </div>
  </div> -->
</template>
<script setup lang="ts">
import { host } from '@/config/host';
import { useCardStore } from '@/stores/card';
import { Card, CardDetail, CardList } from '@/ProtoTypes';
import { ActivityAbilityLevel, CardMessage, CardStory, LiveAbilityLevel, Skill, SkillLevel } from 'hoshimi-types/ProtoMaster';
import { cloneDeep, findLast } from 'lodash';
import { useCardPropensity } from '@/composables/card';
import { fetchCardBase } from '@/api/card';

const router = useRouter();
const route = useRoute();
let skillLang = ref('jp');

let cardId: Card['id'] = '';

const cardStore = useCardStore();
let level = ref(200);
let rarity = ref(10);
let cardDetail: CardDetail = reactive<CardDetail>({
  card: {
    type: 0,
    id: '',
    assetId: '',
    name: '',
    description: '',
    characterId: '',
    initialRarity: 0,
    cardParameterId: '',
    vocalRatioPermil: 0,
    danceRatioPermil: 0,
    visualRatioPermil: 0,
    staminaRatioPermil: 0,
    cardLevelReleaseId: '',
    skillId1: '',
    skillId2: '',
    skillId3: '',
    liveAbilityId: '',
    activityAbilityId: '',
    order: 0,
    releaseDate: '',
    rewardCostumeId: '',
    obtainMessage: '',
    stories: [],
    messages: [],
    homeTalks: [],
  },
  skill: [],
  activityAbility: undefined,
  liveAbility: undefined,
});

const backup = {
  cardDetail: {},
};

const curcard = computed((): Card[] => [cardDetail.card]);
const yellSkill = computed(() => cardDetail.activityAbility ?? cardDetail.liveAbility);
const cardPropensity = computed((): string => useCardPropensity(cardDetail.card));
const cardParameter = computed(() => cardStore.cardParameter.filter((e) => e.id === cardDetail.card.cardParameterId));
const cardRarity = computed(() => cardStore.cardRarity.find((e) => e.rarity === rarity.value));
const statusSum = computed((): number => {
  // 体力*0.8+暴击*3+精神*2+3属性*0.5
  let mental = 100;
  let critical = 100;
  return Math.floor(valueCalc(cardDetail.card.vocalRatioPermil) / 2) + Math.floor(valueCalc(cardDetail.card.danceRatioPermil) / 2) + Math.floor(valueCalc(cardDetail.card.visualRatioPermil) / 2) + Math.floor(valueCalc(cardDetail.card.staminaRatioPermil, true) * 0.8) + mental * 2 + critical * 3 || 100;
});

const cardHeadIcon = computed(() => {
  return `${host.assetsUrl}/img_card_thumb_1_${cardDetail.card.assetId}.png`;
});

onActivated(async () => {
  document.body.scrollIntoView();
  cardId = route.params.cardId as string;
  if (cardId != cardDetail.card.id) {
    Object.assign(cardDetail, backup.cardDetail);
    getcardBase(cardId);
  }
});

onMounted(() => {
  backup.cardDetail = cloneDeep(cardDetail);
  // document.addEventListener('scroll', throttle(onScroll, 200));
});

onBeforeUnmount(() => {
  // document.removeEventListener('scroll', onScroll);
});

function valueCalc(Ppam = 1, isStamina = false) {
  return Math.floor(Math.floor(+(cardParameter.value[level.value - 1]?.[isStamina ? 'staminaValue' : 'value'] ?? 1) * (Ppam / 1000)) * ((cardRarity.value?.parameterBonusPermil ?? 1) / 1000)) || 100;
}
function skillDesc(levels: SkillLevel[] | LiveAbilityLevel[] | ActivityAbilityLevel[]) {
  return findLast<SkillLevel | LiveAbilityLevel | ActivityAbilityLevel>(levels, (n) => level.value >= n.requiredCardLevel)?.description.replaceAll('\n', '<br />') ?? '';
}

function getcardBase(id: string) {
  fetchCardBase(id)
    .then(({ data }) => {
      Object.assign(cardDetail, data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function traSkill(skillList: Skill[]): Skill[] {
  // skillList.forEach((skill) => {
  //   // console.log(skill.skillText);
  //   let name: string[] = [];
  //   let { skillText, skillType } = skill;
  //   if (skillType == 'Y') {
  //     let [text, num, effect] = skillText.split(/(\d+%|\d+\.\d+%)(上昇|UP)/);
  //     text = translateMap.get(text)?.cn ?? '';
  //     effect = translateMap.get(effect)?.cn ?? '';
  //     // console.log(tra + num + 'UP');
  //     name.push(`${text} ${num} ${effect}`);
  //   } else {
  //     for (const item of skillText.split('<br>')) {
  //       // console.log(item);
  //       let translate = translateMap.get(item);
  //       if (translate) {
  //         // console.log('translate', translate.cn);
  //         name.push(translate.cn);
  //         continue;
  //       }
  //       if (/のスコア獲得/.test(item)) {
  //         if (/のスコア獲得、(.*?)い程効果上昇/.test(item)) {
  //           let [num, score, type, status, effect] = item.split(/(のスコア獲得)、(.*?)(が.*?い)程効果(上昇).*/);
  //           score = translateMap.get(score)?.cn ?? '';
  //           type = translateMap.get(type)?.cn ?? '';
  //           status = translateMap.get(status)?.cn ?? '';
  //           effect = translateMap.get(effect)?.key ?? '';
  //           // console.log(`${num}${score}，${type}越${status}効果${effect == 'up' ? '越强' : '越弱'}`);
  //           name.push(`${num}${score}，${type}越${status}効果${effect == 'up' ? '越强' : '越弱'}`);
  //         } else {
  //           let [num, score] = item.split(/(のスコア獲得)/);
  //           let tra = translateMap.get(score)?.cn ?? '';
  //           // console.log(num + tra);
  //           name.push(num + tra);
  //         }
  //         continue;
  //       }
  //       if (/段階.*?効果/.test(item)) {
  //         if (/自身|全員|センター/.test(item)) {
  //           let skillSplit = item.split(/(自身に|全員に|センターに)(\d+)段階(.*?)(\W{2})効果.*\[(\d+).*/);
  //           let [other, target, stage, type1, effect, beat] = skillSplit;
  //           target = translateMap.get(target)?.cn ?? '';
  //           type1 = translateMap.get(type1)?.cn ?? '';
  //           effect = translateMap.get(effect)?.cn ?? '';
  //           // console.log('自身', skillSplit);
  //           // console.log(`${target}${stage}阶段${type1}${effect} [${beat}节拍]`);
  //           name.push(`${target}${stage}阶段${type1}${effect} [${beat}节拍]`);
  //         } else if (/\d+人/.test(item)) {
  //           let skillSplit = item.split(/(が[高低]い)?(\d+人)に(\d+)段階(.*?)(\W{2})効果.*?(\d+)?.*/);
  //           // console.log('target', skillSplit);

  //           let [type1, degree, people, stage, type2, effect, beat] = skillSplit;
  //           type1 = translateMap.get(type1)?.cn ?? '';
  //           degree = translateMap.get(degree)?.cn ?? '';
  //           type2 = translateMap.get(type2)?.cn ?? '';
  //           effect = translateMap.get(effect)?.cn ?? '';
  //           // console.log(`${type1}${degree ? degree + '的' : ''}${people}${stage}阶段${type2}${effect} ${beat ? `[${beat}节拍]` : ''}`);
  //           name.push(`${type1}${degree ? degree + '的' : ''}${people}${stage}阶段${type2}${effect} ${beat ? `[${beat}节拍]` : ''}`);
  //         }
  //         continue;
  //       }
  //       if (/が[高低]い.*?(上昇|低下|增加|UP)効果/.test(item)) {
  //         let skillSplit = item.split(/(が[高低]い).*(\d+人).*?(上昇効果|低下効果|增加効果|UP効果)/);
  //         // console.log('効果', skillSplit);
  //         let [type1, degree, people, type2, effect] = skillSplit;
  //         type1 = translateMap.get(type1)?.cn ?? '';
  //         degree = translateMap.get(degree)?.cn ?? '';
  //         type2 = translateMap.get(type2)?.cn ?? '';
  //         effect = translateMap.get(effect)?.cn ?? '';
  //         // console.log(`${type1}${degree}的${people}${type2}${effect}`);
  //         name.push(`${type1}${degree}的${people}${type2}${effect}`);
  //         continue;
  //       }
  //       if (/スタミナを|のスタミナ回復効果/.test(item)) {
  //         let skillSplit = item.split(/(が[高低]い)?(\d+人)の(.*?)を(\d+)/);
  //         // console.log('スタミナ', skillSplit);
  //         let [type1, degree, people, type2, num, effect] = skillSplit;
  //         type1 = translateMap.get(type1)?.cn ?? '';
  //         degree = translateMap.get(degree)?.cn ?? '';
  //         type2 = translateMap.get(type2)?.cn ?? '';
  //         effect = translateMap.get(effect)?.cn ?? '';
  //         // console.log();
  //         name.push(`${type1}${degree ? degree + '的' : ''}${people}${type2}${num}${effect} `);
  //         continue;
  //       }
  //       if (/強化効果を.*?(増強|延長)/.test(item)) {
  //         let tra = translateMap.get(/強化効果を.*?増強/.test(item) ? '強化効果増強' : '強化効果延長');
  //         name.push(tra?.cn ?? '');
  //         continue;
  //       }
  //       if (/コンボ継続効果/.test(item)) {
  //         let tra = translateMap.get('コンボ継続効果');
  //         name.push(tra?.cn ?? '');
  //         continue;
  //       }
  //       if (/CTを.*?減少/.test(item)) {
  //         let tra = translateMap.get('CT');
  //         name.push(tra?.cn ?? '');
  //         continue;
  //       }
  //       if (/コンボ以上時/.test(item)) {
  //         let [num, combo] = item.split(/(コンボ以上時)/);
  //         combo = translateMap.get(combo)?.cn ?? '';
  //         // console.log(`${num}${combo}`);
  //         name.push(`${num}${combo}`);
  //         continue;
  //       }
  //       if (/スタミナ:(\d+).*?(CT)?/.test(item)) {
  //         let [stamina, num1, ct, num2] = item.split(/:| /);
  //         stamina = translateMap.get(stamina)?.cn ?? '';
  //         ct = translateMap.get(ct)?.cn ?? '';
  //         // console.log(`${stamina}:${num1} ${ct ? `${ct}:${num2}` : ''}`);
  //         name.push(`${stamina}: ${num1}  ${ct ? `${ct}: ${num2}` : ''}`);
  //         continue;
  //       }
  //       name.push(item);
  //     }
  //   }
  //   // console.log(name);
  //   skill.skillText = name.join('<br>');
  // });
  return skillList;
}
function onStoryShow(story: CardStory) {
  router.push(`/card/story/${story.storyId}`);
}
function onMessageShow(message: CardMessage) {
  router.push(`/card/message/${message.messageId}`);
}
function cardCgImg() {
  if (!cardDetail.card.assetId) {
    return '';
  }
  // img_card_full_1_skr-02-eve-01
  return `${host.assetsUrl}/img_card_full_1_${cardDetail.card.assetId}.png?sharp=ipcg`;
}

function eventLanguageChange() {
  skillLang.value = skillLang.value === 'cn' ? 'jp' : 'cn';
}
function goBack() {
  // router.go(-1)
  router.replace('/card');
}
function toMember(item: CardList) {
  // router.push(`/card/member/${item.memberId}`);
}
</script>
<style lang="scss" scoped>
.card-base {
  font-size: 16px;
  font-family: 'Yu Gothic', 'Microsoft YaHei';
  .card-state-level {
    justify-content: space-between;
  }
  .status-sum {
    font-size: 28px;
    font-weight: bold;
    &::after {
      content: '';
      position: absolute;
      top: calc(50% - 5px);
      right: 12px;
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-right: 10px solid #72777d;
      border-bottom: 5px solid transparent;
    }
  }
  .maskedimage {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
}
</style>
