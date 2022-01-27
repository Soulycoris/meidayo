<template>
  <div>
    <div class="char-list-item" v-for="item in unitList" :key="item.id" :data-unitId="item.id" @click="charaBaseTo(item)">
      <div class="item-type-img">
        <img class="img-max" v-if="unitTypeIcon" :src="unitTypeIcon(item)" />
      </div>
      <div class="item-head-img">
        <img class="img-max" v-if="unitHeadIcon" v-lazy="unitHeadIcon(item)" />
      </div>
      <div class="item-name">
        <div class="item-jpn">{{ item.name }}</div>
        <div class="item-cnn">
          {{ item.title }}
        </div>
      </div>
      <div class="item-other">
        <svg t="1639731027631" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1237" width="16" height="16"><path d="M372.679931 191.690834c8.782014 0 17.565051 3.235694 24.26873 9.708106l297.484322 287.175535c13.408381 12.932544 13.408381 33.9226 0 46.855144l-297.485345 287.172465c-13.408381 12.9438-35.130102 12.9438-48.53746 0-13.408381-12.932544-13.408381-33.9226 0-46.855144l273.215592-263.744893L348.411201 248.25306c-13.408381-12.932544-13.408381-33.9226 0-46.855144C355.11488 194.926528 363.897917 191.68981 372.679931 191.690834z" p-id="1238" fill="#ffffff"></path></svg>
        <!-- <text v-if="sort">{{ item[sort] || '' }}</text>
        <div slot v-else></div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { host } from '@/config/host';

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

function charaBaseTo(item: unit) {
  emit('on-click', item);
}

function unitTypeIcon(item: unit) {
  if (!item.type) {
    return '';
  }
  return `/img/icon/icon_${unitTypeMap.get(item.type)}_thumbnail.png`;
}

function unitHeadIcon(item: unit) {
  if (!item.type) {
    return '';
  }
  let prefab = item.prefab.split('-');
  return `${host.baseUrl}/assets/card/thumb/img_card_thumb_1_${prefab[0]}-0${item.rarity}-${prefab[1]}-${prefab[2]}.png`;
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
      font-size: 18px;
      padding: 2px 0;
    }
    .item-cnn {
      font-size: 14px;
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
