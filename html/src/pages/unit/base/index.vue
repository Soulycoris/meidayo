<template>
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
            <skillGenerate scale="" skill-level="" skill-type="A" skill-bg="bg_strength_2" skill1="img_icon_skill-normal_vocal-up" skill2="img_icon_skill-normal_score-get" skill3=""></skillGenerate>
          </div>
          <div class="unit-skill-name">
            <div class="unit-skill-type">{{ skill.skill_type }}</div>
            <div class="unit-skill-name-text">{{ skill.skill_name }}</div>
          </div>
        </div>
        <div class="unit-skill-text" v-html="skill.skill_text"></div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import unitListItem from '@com/unit/unit-list-item.vue';
import skillGenerate from '@com/skillGenerate/skillGenerate.vue';

import axios from 'axios';
import { onMounted, onActivated, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { key } from '@/store';
import { unitPropensityMap } from '@/assets/utils';
import { host } from '@/config/host';
// import { useI18n } from 'vue-i18n'; //引入vue-i18n组件

const router = useRouter();
const route = useRoute();
const store = useStore(key);
// const { t } = useI18n();

let unitId: number = 0;
let unitDetail: unitDetail = reactive<unitDetail>({
  id: 0,
  member_id: 0,
  title: '',
  name: '',
  rarity: 0,
  propensity: '',
  type: '',
  prefab: '',
  sp_skill: '',
  yell_skill: '',
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
const skillList = computed((): skillList[] => unitDetail.skill);
const unitPropensity = computed((): string => unitPropensityMap.get(unitDetail.propensity) || 'vocal');
const statusSum = computed((): number => {
  // 体力*0.8+暴击*3+精神*2+3属性*0.5
  let mental = 100;
  let critical = 100;
  return Math.floor(unitDetail.vocal / 2) + Math.floor(unitDetail.dance / 2) + Math.floor(unitDetail.visual / 2) + Math.floor(unitDetail.stamina * 0.8) + mental * 2 + critical * 3;
});

onActivated(() => {
  Object.assign(unitDetail, backup.unitDetail);
  document.body.scrollIntoView();
  unitId = +route.params.unitId;
  if (unitId) {
    getCharaBase(unitId);
  }
});
onMounted(() => {
  backup.unitDetail = JSON.parse(JSON.stringify(unitDetail));
});
function getCharaBase(id: number) {
  axios
    .get(`/unit/base/${id}`)
    .then((res) => {
      Object.assign(unitDetail, res.data as unitDetail);
    })
    .catch((err) => {
      console.log(err);
    });
}
function unitCgImg() {
  if (!unitDetail.id) {
    return '';
  }
  let prefab = unitDetail.prefab.split('-');
  return `${host.baseUrl}/assets/card/full/img_card_full_1_${prefab[0]}-0${unitDetail.rarity}-${prefab[1]}-${prefab[2]}.png`;
}
function toMember(item: unit) {
  router.push(`/unit/member/${item.member_id}`);
}
</script>
<style lang="scss" scoped>
$font-size-base: 16px;
$font-size-sm: 14px;
.unit-base {
  // font-family: 'Microsoft YaHei';
  min-height: 100vh;
  background-color: #202020;
  color: rgba($color: #fff, $alpha: 0.8);
  font-family: 'Yu Gothic', 'Microsoft YaHei';
  .unit-img {
    transition: height 2s ease;
    min-height: 200px;
    .img-max {
      max-width: 100%;
      height: auto;
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
        background-color: var(--color-base-skill-special);
        flex: none;
        &.special {
          background-color: var(--color-base-skill-special);
        }
        &.strength {
          background-color: var(--color-base-skill-strength);
        }
        &.score {
          background-color: var(--color-base-skill-score);
        }
        &.yell {
          background-color: var(--color-base-skill-yell);
        }
      }
      .unit-skill-name-text {
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  .unit-skill-text {
    width: 100%;
    flex: none;
    margin: 6px 0 32px 0;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
