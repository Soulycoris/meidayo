<template>
  <div class="dialogue">
    <div class="item flex items-end mt-4 mb-4" v-for="(item, index) in list" :key="index" :class="item.name.includes('user') ? 'right' : 'left'">
      <div class="icon w8 flex flex-none">
        <span class="flex">
          <img class="img-max" v-if="item.name.includes('user')" :src="makinoIcon" />
          <img class="img-max" v-else :src="memberIcon(item.name)" />
        </span>
      </div>
      <div class="text w100% ml-3 mr-10 flex flex-col c-dark-100">
        <template v-if="item.name">
          <div class="content">
            {{ makinoReplace(item.text) }}
          </div>
          <div class="text-size-sm c-white">{{ makinoReplace(item.name) }}</div>
        </template>
        <div v-else class="mla mra text-center c-white">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { host } from '@/config/host';
import { useCharacterStore } from '@/stores/character';

const characterStore = useCharacterStore();
const props = defineProps<{
  list: {
    text: string;
    name: string;
  }[];
  title: string;
}>();

const makinoIcon = computed(() => {
  return `${host.assetsUrl}/img_chr_adv_koh-00.png`;
});

function makinoReplace(str: string) {
  return str.replaceAll('{user}', '牧野');
}
function memberIcon(name: string) {
  if (!name) {
    return '';
  }
  const res = characterStore.character.find((e) => props.title.includes(e.name));
  //   img_chr_adv_koh-00.png
  return `${host.assetsUrl}/img_chr_adv_${res?.assetId ?? 'koh'}-00.png`;
}
</script>
<style lang="scss">
.dialogue {
  color: #fff;
  .item {
    &.right {
      justify-content: flex-end;
      .icon {
        order: 2;
      }
      .text {
        margin-right: 10px;
        margin-left: 40px;
        align-items: flex-end;
        .content {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 12px;
        }
      }
    }
  }
  .text {
    .content {
      padding: 4px 8px;
      line-height: 1.3;
      border-radius: 12px;
      border-bottom-left-radius: 0;
      background-color: #fff;
    }
  }
}
</style>
