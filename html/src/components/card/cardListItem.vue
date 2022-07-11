<template>
  <div>
    <div class="char-list-item relative flex items-center p-2 c-white" v-for="item in cardList" :key="item.id" :data-cardId="item.id" @click="charaBaseTo(item)">
      <div class="w-5 h-5 mr-2">
        <img class="img-max" :src="cardTypeIcon(item)" />
      </div>
      <div class="w-16 h-16 mr-4 rd overflow-hidden">
        <img class="img-max" v-lazy="cardHeadIcon(item)" />
      </div>
      <div class="ha flex flex-col max-w-80vw">
        <div class="item-jpn">{{ characterName(item.characterId) }}</div>
        <div class="item-cnn">{{ item.name }}</div>
      </div>
      <div class="absolute right-0 pr-4">
        <svg t="1639731027631" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1237" width="16" height="16"><path d="M372.679931 191.690834c8.782014 0 17.565051 3.235694 24.26873 9.708106l297.484322 287.175535c13.408381 12.932544 13.408381 33.9226 0 46.855144l-297.485345 287.172465c-13.408381 12.9438-35.130102 12.9438-48.53746 0-13.408381-12.932544-13.408381-33.9226 0-46.855144l273.215592-263.744893L348.411201 248.25306c-13.408381-12.932544-13.408381-33.9226 0-46.855144C355.11488 194.926528 363.897917 191.68981 372.679931 191.690834z" p-id="1238" fill="#ffffff"></path></svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { host } from '@/config/host';
import { CardList } from '@/ProtoTypes';
import { useCharacterStore } from '@/stores/character';
import { cardTypeMap } from '@/assets/utils/typeMap';

const characterStore = useCharacterStore();

defineProps<{
  cardList: CardList[];
}>();

function characterName(id: string) {
  return characterStore.characterMap?.get(id)?.name ?? '';
}

const emit = defineEmits<{
  (e: 'on-click', item: CardList): void;
}>();

function charaBaseTo(item: CardList) {
  emit('on-click', item);
}

function cardTypeIcon(item: CardList) {
  if (!item.type) {
    return '';
  }
  return `/img/icon/icon_${cardTypeMap.get(item.type)?.name ?? 'scorer'}_thumbnail.png`;
}

function cardHeadIcon(item: CardList) {
  if (!item.assetId) {
    return '';
  }
  // img_card_thumb_0_skr-02-eve-01
  return `${host.assetsUrl}/img_card_thumb_1_${item.assetId}.png`;
}
</script>
<style lang="scss" scoped>
.char-list-item {
  &:hover {
    background-color: #373737;
  }
  .item-jpn {
    font-size: 18px;
    padding: 2px 0;
  }
  .item-cnn {
    font-size: 14px;
    padding: 6px 0;
  }
}
</style>
