<template>
  <div class="unit">
    <!-- <uni-search-bar bgColor="#313131" @confirm="search" @input="searchInput" cancelButton="false"></uni-search-bar> -->
    <!-- <div class="fitter-bar">
      <uni-combox label="类型" :candidates="fitterArray.type" v-model="fitterActive.type"></uni-combox>
    </div> -->
    <unitListItem class="char-list" :unitList="fitterUnitBase" @on-click="toUnitBase"> </unitListItem>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import unitListItem from '@/components/unit/unit-list-item.vue';
import { onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { key } from '@/store';
import VConsole from 'vconsole';

// const vConsole = new VConsole();

interface fitterActive {
  type: string;
}

const router = useRouter();
const store = useStore(key);
let unitList: unit[] = reactive<unit[]>([]);
let searchInput = '';
let fitterArray = {
  type: [
    { key: '', value: '全部' },
    { key: 'スコアラー', value: '得分' },
    { key: 'バッファー', value: '辅助' },
    { key: 'サポーター', value: '支援' },
  ],
};
let fitterActive: fitterActive = reactive({
  type: '',
});

const fitterUnitBase = computed(() => {
  let arr = unitList.map((e) => e);
  // if (fitterActive.type) {
  //   arr = arr.filter((e) => e.atk_type === fitterActive.type);
  // }
  return arr;
});

onMounted(() => {
  getCharaBase();
});

function getCharaBase(): void {
  axios
    .get('/unit/list')
    .then((res) => {
      unitList.push(...res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function toUnitBase(item: unit): void {
  store.commit('setUnit', item);
  router.push(`/unit/${item.id}`);
}
</script>
<style lang="scss">
$font-size-base: 16px;
$font-size-sm: 14px;
.unit {
  background-color: #202020;
  .scroll-Y {
    height: 80vh;
  }
}
.uni-searchbar {
  background-color: #202020;
}
.fitter-bar {
  display: flex;
  justify-content: space-around;
  box-shadow: #373737 1px 1px 1px;
}
.char-list-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8rpx;
  &:hover {
    background-color: #373737;
  }
  .item-icon {
    width: 40rpx;
    height: 40rpx;
    background: url('/static/img/AtlasCommon.png') no-repeat;
    background-size: cover;
    margin-right: 20rpx;
    &.type1 {
      background-position-x: 0;
    }
    &.type2 {
      background-position-x: -40rpx;
    }
    &.type3 {
      background-position-x: -80rpx;
    }
  }
  .item-head-img {
    width: 134rpx;
    margin-right: 16rpx;
    img {
      width: 100%;
    }
  }
  .item-name {
    height: auto;
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    .item-jpn {
      font-size: $font-size-base;
      padding: 8rpx 0;
    }
    .item-cnn {
      font-size: $font-size-sm;
      padding: 8rpx 0;
    }
  }
  .item-other {
    position: absolute;
    right: 0;
    padding-right: 16rpx;
  }
}
</style>
