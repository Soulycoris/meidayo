<template>
  <div>
    <div class="char-list-item" v-for="item in unitList" :key="item.id" :data-unitId="item.id" @click="charaBaseTo(item)">
      <!-- <div v-if="showPositioning" class="item-icon" :class="computedClassPositioning(item.search_area_width)"></div> -->
      <div class="item-type-img">
        <img class="img-max" v-lazy="unitTypeIcon(item)" />
      </div>
      <div class="item-head-img">
        <!-- <img class="img-max" v-lazy="unitHeadIcon(item)" /> -->
      </div>
      <div class="item-name">
        <div class="item-jpn">{{ item.name }}</div>
        <div class="item-cnn">
          {{ item.title }}
        </div>
      </div>
      <div class="item-other">
        <!-- <text v-if="sort">{{ item[sort] || '' }}</text>
        <div slot v-else></div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { host } from '@/config/index';
import { computed } from 'vue';

const unitTypeMap = new Map([
  ['サポーター', 'supporter'],
  ['バッファー', 'buffer'],
  ['スコアラー', 'scorer'],
]);

defineProps<{
  unitList: unit[];
}>();

const emit = defineEmits<{
  (e: 'on-click', id: unit): void;
}>();

const assetsUrl = computed(() => `${host.baseUrl}/assets`);

function charaBaseTo(item: unit) {
  emit('on-click', item);
}

function unitTypeIcon(item: unit) {
  return `/img/icon/icon_${unitTypeMap.get(item.type)}_thumbnail.png`;
}

function unitHeadIcon(item: unit) {
  let prefab = item.prefab.split('-');
  return `${assetsUrl.value}/card/thumb/img_card_thumb_1_${prefab[0]}-0${item.rarity}-${prefab[1]}-${prefab[2]}.png`;
}
</script>
<style lang="scss" scoped>
.char-list-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
  color: #fff;
  &:hover {
    background-color: #373737;
  }
  .img-max {
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }
  .item-type-img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .item-head-img {
    width: 64px;
    height: 64px;
    margin-right: 16px;
    border-radius: 4px;
    overflow: hidden;
  }
  .item-name {
    height: auto;
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    .item-jpn {
      font-size: 16px;
      padding: 6px 0;
    }
    .item-cnn {
      font-size: 12px;
      padding: 6px 0;
    }
  }
  .item-other {
    position: absolute;
    right: 0;
    padding-right: 16px;
  }
}
</style>
