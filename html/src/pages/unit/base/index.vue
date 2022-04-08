<template>
  <ipNav class="unit-nav" :fixed="true" leftArrow :border="true" @on-left-click="goBack">
    <template #title></template>
    <template #right>
      <svg @click="eventLanguageChange" @dblclick="update" t="1640247802490" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5623" width="16" height="16">
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
  <div class="unit-base">
    <transition name="fade">
      <div class="unit-img" v-if="unitDetail.id">
        <img class="img-max" :src="unitCgImg()" alt="" srcset="" />
      </div>
    </transition>
    <unitListItem :unitList="curUnit" @on-click="toMember"> </unitListItem>
    <div class="unit-state">
      <div class="unit-state-box">
        <div class="unit-state-status status-sum" :class="'base-' + unitPropensity">{{ statusSum }}</div>
        <div class="unit-state-status">
          <div class="unit-state-item base-vocal">
            <div class="maskedimage maskedimage-vocal"></div>
            <span>{{ unitDetail.vocal }}</span>
          </div>
          <div class="unit-state-item base-dance">
            <div class="maskedimage maskedimage-dance"></div>
            <span>{{ unitDetail.dance }}</span>
          </div>
          <div class="unit-state-item base-visual">
            <div class="maskedimage maskedimage-visual"></div>
            <span>{{ unitDetail.visual }}</span>
          </div>
          <div class="unit-state-item base-stamina">
            <div class="maskedimage maskedimage-stamina"></div>
            <span>{{ unitDetail.stamina }}</span>
          </div>
        </div>
      </div>
      <template v-for="(skill, index) in skillList" :key="index">
        <div class="unit-skill-box">
          <div class="unit-skill-icon">
            <skillGenerate skill-level="" :skill-type="skill.skillType" :skill-bg="skillBgIcon(skill, index)" :skill1="skillIcon(1, skill)" :skill2="skillIcon(2, skill)" :skill3="skillIcon(3, skill)" :markType="skillIcon(4, skill)"></skillGenerate>
          </div>
          <div class="unit-skill-name">
            <!-- <div class="unit-skill-type" :class="skillTypeColor(skill)">{{ skill.skillType }}</div> -->
            <div class="unit-skill-name-text">{{ skill.skillName }}</div>
          </div>
        </div>
        <div class="unit-skill-text" v-html="skill.skillText"></div>
      </template>
    </div>
  </div>
  <div class="unit-story" v-if="unitDetail.rarity === 5">
    <h3 class="title">剧情故事</h3>
    <div class="story-list">
      <div class="item-head-img" v-for="index in 3" :key="index" @click="onStoryShow(index)">
        <img class="img-max" v-lazy="unitHeadIcon" />
        <div class="chapter">#{{ index }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { host } from '@/config/host';
import { unitPropensityMap, translateMap } from '@/assets/utils';

const router = useRouter();
const route = useRoute();
let skillLang = ref('jp');
let fixed = ref(false);
let unitId = 0;
let updateTag = 0;
let unitDetail: unitDetail = reactive<unitDetail>({
  id: 0,
  memberId: 0,
  url: '',
  title: '',
  name: '',
  prefab: '',
  rarity: 0,
  propensity: '',
  type: '',
  spSkill: '',
  yellSkill: '',
  clothes: '',
  vocal: 0,
  dance: 0,
  visual: 0,
  stamina: 0,
  skill: [],
});
const backup = {
  unitDetail: {},
};
const curUnit = computed((): unit[] => [unitDetail]);
const skillList = computed((): skill[] => {
  let skill: skill[] = JSON.parse(JSON.stringify(unitDetail.skill));
  if (skillLang.value === 'cn') {
    skill = traSkill(skill);
  }
  return skill;
});
const unitPropensity = computed((): string => unitPropensityMap.get(unitDetail.propensity) ?? 'vocal');
const statusSum = computed((): number => {
  // 体力*0.8+暴击*3+精神*2+3属性*0.5
  let mental = 100;
  let critical = 100;
  return Math.floor(unitDetail.vocal / 2) + Math.floor(unitDetail.dance / 2) + Math.floor(unitDetail.visual / 2) + Math.floor(unitDetail.stamina * 0.8) + mental * 2 + critical * 3;
});
const unitHeadIcon = computed(() => {
  let prefab = unitDetail.prefab.split('-');
  return `${host.assetsUrl}/img_card_thumb_1_${prefab[0]}-0${unitDetail.rarity}-${prefab[1]}-${prefab[2]}.png`;
});

onActivated(() => {
  document.body.scrollIntoView();
  unitId = +route.params.unitId;
  if (unitId != unitDetail.id) {
    Object.assign(unitDetail, backup.unitDetail);
    getUnitBase(unitId);
  }
});
onMounted(() => {
  // 立绘比 2048x1152
  backup.unitDetail = JSON.parse(JSON.stringify(unitDetail));
  document.addEventListener('scroll', onScroll);
});
onBeforeUnmount(() => {
  document.removeEventListener('scroll', onScroll);
});
function onScroll() {
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  // console.log(scrollTop);
  fixed.value = scrollTop > 200;
}
function getUnitBase(id: number) {
  axios
    .get(`/unit/base/${id}`)
    .then((res) => {
      Object.assign(unitDetail, res.data as unitDetail);
    })
    .catch((err) => {
      console.log(err);
    });
}

function traSkill(skillList: skill[]): skill[] {
  skillList.forEach((skill) => {
    // console.log(skill.skillText);
    let name: string[] = [];
    let { skillText, skillType } = skill;
    if (skillType == 'Y') {
      let [text, num, effect] = skillText.split(/(\d+%|\d+\.\d+%)(上昇|UP)/);
      text = translateMap.get(text)?.cn ?? '';
      effect = translateMap.get(effect)?.cn ?? '';
      // console.log(tra + num + 'UP');
      name.push(`${text} ${num} ${effect}`);
    } else {
      for (const item of skillText.split('<br>')) {
        // console.log(item);
        let translate = translateMap.get(item);
        if (translate) {
          // console.log('translate', translate.cn);
          name.push(translate.cn);
          continue;
        }
        if (/のスコア獲得/.test(item)) {
          if (/のスコア獲得、(.*?)い程効果上昇/.test(item)) {
            let [num, score, type, status, effect] = item.split(/(のスコア獲得)、(.*?)(が.*?い)程効果(上昇).*/);
            score = translateMap.get(score)?.cn ?? '';
            type = translateMap.get(type)?.cn ?? '';
            status = translateMap.get(status)?.cn ?? '';
            effect = translateMap.get(effect)?.key ?? '';
            // console.log(`${num}${score}，${type}越${status}効果${effect == 'up' ? '越强' : '越弱'}`);
            name.push(`${num}${score}，${type}越${status}効果${effect == 'up' ? '越强' : '越弱'}`);
          } else {
            let [num, score] = item.split(/(のスコア獲得)/);
            let tra = translateMap.get(score)?.cn ?? '';
            // console.log(num + tra);
            name.push(num + tra);
          }
          continue;
        }
        if (/段階.*?効果/.test(item)) {
          if (/自身|全員|センター/.test(item)) {
            let skillSplit = item.split(/(自身に|全員に|センターに)(\d+)段階(.*?)(\W{2})効果.*\[(\d+).*/);
            let [other, target, stage, type1, effect, beat] = skillSplit;
            target = translateMap.get(target)?.cn ?? '';
            type1 = translateMap.get(type1)?.cn ?? '';
            effect = translateMap.get(effect)?.cn ?? '';
            // console.log('自身', skillSplit);
            // console.log(`${target}${stage}阶段${type1}${effect} [${beat}节拍]`);
            name.push(`${target}${stage}阶段${type1}${effect} [${beat}节拍]`);
          } else if (/\d+人/.test(item)) {
            let skillSplit = item.split(/(が[高低]い)?(\d+人)に(\d+)段階(.*?)(\W{2})効果.*?(\d+)?.*/);
            // console.log('target', skillSplit);

            let [type1, degree, people, stage, type2, effect, beat] = skillSplit;
            type1 = translateMap.get(type1)?.cn ?? '';
            degree = translateMap.get(degree)?.cn ?? '';
            type2 = translateMap.get(type2)?.cn ?? '';
            effect = translateMap.get(effect)?.cn ?? '';
            // console.log(`${type1}${degree ? degree + '的' : ''}${people}${stage}阶段${type2}${effect} ${beat ? `[${beat}节拍]` : ''}`);
            name.push(`${type1}${degree ? degree + '的' : ''}${people}${stage}阶段${type2}${effect} ${beat ? `[${beat}节拍]` : ''}`);
          }
          continue;
        }
        if (/が[高低]い.*?(上昇|低下|增加|UP)効果/.test(item)) {
          let skillSplit = item.split(/(が[高低]い).*(\d+人).*?(上昇効果|低下効果|增加効果|UP効果)/);
          // console.log('効果', skillSplit);
          let [type1, degree, people, type2, effect] = skillSplit;
          type1 = translateMap.get(type1)?.cn ?? '';
          degree = translateMap.get(degree)?.cn ?? '';
          type2 = translateMap.get(type2)?.cn ?? '';
          effect = translateMap.get(effect)?.cn ?? '';
          // console.log(`${type1}${degree}的${people}${type2}${effect}`);
          name.push(`${type1}${degree}的${people}${type2}${effect}`);
          continue;
        }
        if (/スタミナを|のスタミナ回復効果/.test(item)) {
          let skillSplit = item.split(/(が[高低]い)?(\d+人)の(.*?)を(\d+)/);
          // console.log('スタミナ', skillSplit);
          let [type1, degree, people, type2, num, effect] = skillSplit;
          type1 = translateMap.get(type1)?.cn ?? '';
          degree = translateMap.get(degree)?.cn ?? '';
          type2 = translateMap.get(type2)?.cn ?? '';
          effect = translateMap.get(effect)?.cn ?? '';
          // console.log();
          name.push(`${type1}${degree ? degree + '的' : ''}${people}${type2}${num}${effect} `);
          continue;
        }
        if (/強化効果を.*?(増強|延長)/.test(item)) {
          let tra = translateMap.get(/強化効果を.*?増強/.test(item) ? '強化効果増強' : '強化効果延長');
          name.push(tra?.cn ?? '');
          continue;
        }
        if (/コンボ継続効果/.test(item)) {
          let tra = translateMap.get('コンボ継続効果');
          name.push(tra?.cn ?? '');
          continue;
        }
        if (/CTを.*?減少/.test(item)) {
          let tra = translateMap.get('CT');
          name.push(tra?.cn ?? '');
          continue;
        }
        if (/コンボ以上時/.test(item)) {
          let [num, combo] = item.split(/(コンボ以上時)/);
          combo = translateMap.get(combo)?.cn ?? '';
          // console.log(`${num}${combo}`);
          name.push(`${num}${combo}`);
          continue;
        }
        if (/スタミナ:(\d+).*?(CT)?/.test(item)) {
          let [stamina, num1, ct, num2] = item.split(/:| /);
          stamina = translateMap.get(stamina)?.cn ?? '';
          ct = translateMap.get(ct)?.cn ?? '';
          // console.log(`${stamina}:${num1} ${ct ? `${ct}:${num2}` : ''}`);
          name.push(`${stamina}: ${num1}  ${ct ? `${ct}: ${num2}` : ''}`);
          continue;
        }
        name.push(item);
      }
    }
    // console.log(name);
    skill.skillText = name.join('<br>');
  });
  return skillList;
}
function onStoryShow(chapter: number) {
  router.push(`/story/${unitDetail.id}/${chapter}`);
}
function unitCgImg() {
  if (!unitDetail.id) {
    return '';
  }
  let prefab = unitDetail.prefab.split('-');
  return `${host.assetsUrl}/img_card_full_1_${prefab[0]}-0${unitDetail.rarity}-${prefab[1]}-${prefab[2]}.png?sharp=ipcg`;
}
function skillTypeColor(item: skill) {
  if (item.skillType === 'SP') {
    return 'base-skill-special-bg';
  } else if (item.skillType === 'Y') {
    return 'base-skill-yell-bg';
  } else if (item.skillType === 'P') {
    return 'base-skill-support-bg';
  } else if (item.skillType === 'A') {
    return 'base-skill-strength-bg';
  }
  return 'base-skill-support-bg';
}
function skillBgIcon(item: skill, index: number) {
  if (item.skillType === 'SP') {
    return 'bg_special_3';
  } else if (item.skillType === 'Y') {
    return 'bg_yell_1';
  } else {
    // bg_score_2 蓝
    // bg_support_2 绿
    // bg_strength_2 天蓝
    let key = item.skillBg;
    return index < 1 ? `bg_${key}_3` : `bg_${key}_2`;
  }
}
function skillIcon(num: number, item: skill) {
  let prefab = unitDetail.prefab.split('-');
  if (item.skillType === 'SP') {
    return num === 1 ? `img_icon_skill_sk-${prefab[0]}-0${unitDetail.rarity}-${prefab[1]}-${prefab[2]}-1` : '';
  } else if (item.skillType === 'Y') {
    return num === 1 ? `img_icon_yell-${item.skillIcon}` : '';
  }
  let icons = item.skillIcon.split(',');
  let icon = icons[num - 1];

  if (num === 4) {
    return icon ?? '';
  }
  return icon ? `img_icon_skill-normal_${icon}` : '';
}
function eventLanguageChange() {
  skillLang.value = skillLang.value === 'cn' ? 'jp' : 'cn';
}
function goBack() {
  // router.go(-1)
  router.replace('/unit');
}
function toMember(item: unit) {
  router.push(`/member/${item.memberId}`);
}
function update() {
  updateTag++;
  if (updateTag > 2) {
    alert('update');
    updateTag = 0;
    axios.get(`/db/update/${unitId}`);
  }
}
</script>
<style lang="scss" scoped>
$font-size-base: 16px;
$font-size-sm: 14px;
.unit-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  &.fixed {
    position: fixed;
    background-color: rgba(76, 76, 76, 0.8);
    transition: background-color ease 0.2s;
  }
}
.unit-base {
  min-height: 100vh;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Yu Gothic', 'Microsoft YaHei';
  padding-top: 45px;
  .unit-img {
    transition: height 2s ease;
    min-height: 200px;
    .img-max {
      width: 100%;
      // height: 100%;
      max-height: 100%;
    }
  }
  .unit-state {
    padding: 8px;
    border-top: 2px #303030;
    font-size: $font-size-base;
    .unit-level {
      font-size: $font-size-base;
    }
  }
  .unit-state-level {
    justify-content: space-between;
  }
  .unit-state-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    margin-bottom: 12px;
    .unit-state-status {
      flex: auto;
      display: flex;
      flex-wrap: wrap;
      &.status-sum {
        width: 65%;
        justify-content: center;
        position: relative;
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
      .unit-state-item {
        width: 50%;
        flex: auto;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin: 6px 0;
      }
    }
    .unit-skill {
      img {
        width: 105px;
      }
    }
  }
  .unit-skill-box {
    display: flex;
    font-weight: bold;
    .unit-skill-icon {
      flex: none;
      width: 64px;
      height: 64px;
      position: relative;
      .generate-area {
        position: absolute;
        width: 128px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.5);
      }
    }
    .unit-skill-name {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 16px;
      .unit-skill-type {
        width: 38px;
        text-align: center;
        border-radius: 16px;
        font-size: 16px;
        color: #30313b;
        padding: 2px 0;
        font-weight: bold;
        line-height: 1;
        flex: none;
      }
      .unit-skill-name-text {
        color: rgba(255, 255, 255, 0.8);
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  .unit-skill-text {
    color: rgba(255, 255, 255, 0.8);
    width: 100%;
    flex: none;
    margin: 6px 0 32px 0;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
  }
}
.unit-story {
  padding: 8px;
  .title {
    margin-top: 0;
    color: #fff;
  }
  .story-list {
    display: flex;
  }
  .item-head-img {
    width: 64px;
    height: 64px;
    margin-right: 16px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  .chapter {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #fff;
  }
  .img-max {
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }
}
</style>
