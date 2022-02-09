<template>
  <div class="unit-main">
    <div class="unit-filter-tool">
      <svg @click="eventFilter" t="1642563652911" class="icon" viewBox="0 0 1031 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2283" width="18" height="18">
        <path d="M544.24 870.052a24.08 24.08 0 0 1-24.053-24.054V434.555c0-5.755 2.063-11.32 5.816-15.678l182.513-212.265H213.545l167.578 213.074a24.151 24.151 0 0 1 5.145 14.869v245.637l72.458 72.453a23.849 23.849 0 0 1 6.887 17.024 23.916 23.916 0 0 1-7.173 16.958c-4.532 4.464-10.527 6.922-16.881 6.922s-12.355-2.453-16.88-6.922l-79.463-79.468a23.92 23.92 0 0 1-7.045-17.014V442.88L145.126 197.422a24.08 24.08 0 0 1 4.025-33.777 24.151 24.151 0 0 1 14.868-5.145h596.885a23.884 23.884 0 0 1 17.003 7.05 23.875 23.875 0 0 1 7.04 17.014 24.054 24.054 0 0 1-5.811 15.672L568.284 443.47v402.524a24.074 24.074 0 0 1-24.043 24.059z" p-id="2284" fill="#ffffff"></path>
        <path d="M660.951 805.99a23.885 23.885 0 0 1-16.998-7.055 23.905 23.905 0 0 1-7.03-17.019 24.084 24.084 0 0 1 24.033-24.033h186.117a24.084 24.084 0 0 1 24.028 24.074 24.084 24.084 0 0 1-24.033 24.033h0.005-186.122z m0-150.553a24.074 24.074 0 0 1-24.028-24.07 24.09 24.09 0 0 1 24.033-24.038h186.117a24.084 24.084 0 0 1 24.028 24.075 24.09 24.09 0 0 1-24.033 24.033h0.005-186.122z m0-148.823c-13.184-0.17-23.839-11.095-23.67-24.356a23.9 23.9 0 0 1 23.747-23.747h186.045c13.261 0 24.049 10.788 24.049 24.054s-10.788 24.054-24.049 24.054H660.951z" p-id="2285" fill="#ffffff"></path>
      </svg>
    </div>
    <unitListItem :unitList="fitterUnitBase" @on-click="toUnitBase"> </unitListItem>
  </div>
  <unitFilter v-model:show="filter" @on-confirm="handleFilter"></unitFilter>
</template>
<script setup lang="ts">
import axios from 'axios';
// import unitListItem from '@com/unit/unitListItem.vue';
// import unitFilter from '@com/unit/unitFilter.vue';
import { onMounted, computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

interface searchForm {
  type: string[];
  propensity: string[];
  name: string[];
}

const router = useRouter();
let unitList: unit[] = reactive<unit[]>([]);
const filter = ref(false);
const searchForm = reactive<searchForm>({
  type: [],
  propensity: [],
  name: [],
});
const fitterUnitBase = computed(() => {
  let arr = unitList.map((e) => e);
  if (searchForm.type.length) {
    arr = arr.filter((e) => searchForm.type.includes(e.type));
  }
  if (searchForm.propensity.length) {
    arr = arr.filter((e) => searchForm.propensity.includes(e.propensity));
  }
  if (searchForm.name.length) {
    arr = arr.filter((e) => searchForm.name.includes(e.prefab.split('-')[0]));
  }
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

function eventFilter() {
  filter.value = true;
}
function handleFilter(form: searchForm) {
  Object.assign(searchForm, form);
  filter.value = false;
}

function toUnitBase(item: unit): void {
  router.push(`/unit/${item.id}`);
}
</script>
<style lang="scss">
$font-size-base: 16px;
$font-size-sm: 14px;
.unit-main {
  padding: 8px 0;
  .scroll-Y {
    height: 80vh;
  }
  .unit-filter-tool {
    position: fixed;
    right: 0;
    padding: 8px;
    width: 18px;
    height: 18px;
    background-color: rgba(76, 76, 76, 0.8);
    z-index: 1;
  }
}
</style>
