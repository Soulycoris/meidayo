<template>
  <div class="unit-base">
    <div class="unit-img"></div>
    <!-- <unitListItem :charaList="curUnit" @on-click="toCharaMember"> </unitListItem> -->
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
      <div class="unit-state-box">
        <div class="unit-state-skill">
          <!-- <img :src="`${$hostConfig.resUrl}/icon/skill/${skill.icon_type}`" alt="" /> -->
        </div>
        <div class="unit-state-skill-name">
          <div class="unit-state-skill-name-text">
            <!-- {{ skill.name }} -->
          </div>
        </div>
      </div>
      <div class="unit-state-box">
        <div>
          <!-- {{ skill.description }} -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import unitListItem from '@/components/unit/unit-list-item.vue';
import axios from 'axios';
import { onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { key } from '@/store';
import { unitPropensityMap } from '@/assets/utils';

const router = useRouter();
const route = useRoute();
const store = useStore(key);

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
  skill_1: '',
  skill_1_type: '',
  skill_1_text: '',
  skill_2: '',
  skill_2_type: '',
  skill_2_text: '',
  skill_3: '',
  skill_3_type: '',
  skill_3_text: '',
  skill_yell: '',
  skill_yell_text: '',
});

const curUnit = computed((): unit[] => [store.state.unit]);
const unitPropensity = computed((): string => unitPropensityMap.get(unitDetail.propensity));
const statusSum = computed((): number => {
  // 体力*0.8+暴击*3+精神*2+3属性*0.5
  let mental = 100;
  let critical = 100;
  return Math.floor(unitDetail.vocal / 2) + Math.floor(unitDetail.dance / 2) + Math.floor(unitDetail.visual / 2) + Math.floor(unitDetail.stamina * 0.8) + mental * 2 + critical * 3;
});

onMounted(() => {
  unitId = +route.params.unitId;
  if (unitId) {
    getCharaBase(unitId);
  }
});

function getCharaBase(id: number) {
  axios
    .get(`/unit/base/${id}`)
    .then((res) => {
      // unitDetail = res.data;
      console.log(res.data);
      Object.assign(unitDetail, res.data as unitDetail);
    })
    .catch((err) => {
      console.log(err);
    });
}
function toCharaMember(item: unit) {
  router.push(`/character/member/${item.member_id}`);
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
  .unit-img {
    transition: height 2s ease;
    img {
      max-width: 100%;
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
    font-family: 'Yu Gothic', 'Microsoft YaHei';
    .unit-state-status {
      flex: auto;
      display: flex;
      flex-wrap: wrap;
      &.status-sum {
        width: 45%;
        justify-content: center;
        position: relative;
        font-size: 20px;
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
      }
    }
    .unit-state-skill {
      img {
        width: 105px;
      }
    }

    .unit-state-skill-name {
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      .unit-state-skill-name-text {
        margin-bottom: 18px;
      }
    }
  }
  .unit-state-skill-action {
    margin-bottom: 36px;
  }
}
</style>
