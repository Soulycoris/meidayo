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
import unitListItem from '@com/unit/unit-list-item.vue';
import { onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

interface fitterActive {
  type: string;
}

const router = useRouter();
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
  router.push(`/unit/${item.id}`);
}
</script>
<style lang="scss">
$font-size-base: 16px;
$font-size-sm: 14px;
.unit {
  // background-color: #4c4c4c;
  .scroll-Y {
    height: 80vh;
  }
}
.uni-searchbar {
  // background-color: #4c4c4c;
}
.fitter-bar {
  display: flex;
  justify-content: space-around;
  box-shadow: #373737 1px 1px 1px;
}
</style>
