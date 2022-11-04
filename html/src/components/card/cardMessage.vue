<template>
  <div class="message p-2 c-white">
    <div class="item flex items-end mt-8 mb-8 relative" v-for="(item, index) in detailsOrder" :key="index" :class="{ right: !item.characterId, select: item.messageDetailId.includes('-') }">
      <div class="icon w-8 flex flex-none">
        <span class="flex items-center" v-if="!item.characterId">
          <div class="w-8 h-8 b-rd-8 text-center lh-8" style="background-color: #6a7bdc">牧</div>
        </span>
        <span class="flex" v-else>
          <img class="img-max" :src="memberIcon(item.characterId)" />
        </span>
      </div>
      <div class="text w100% ml-3 mb-1 mr-10 flex flex-col c-dark-100">
        <div v-if="item.text" class="content">
          {{ makinoReplace(item.text) }}
        </div>
        <img v-else-if="item.stampAssetId" class="w60%" :src="assetsUrl(item.stampAssetId)" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { host } from '@/config/host';
import { useCharacterStore } from '@/stores/character';
import { MessageDetail } from 'hoshimi-types/ProtoMaster';

const characterStore = useCharacterStore();
const props = defineProps<{
  details: MessageDetail[];
}>();

const detailsOrder = computed(() => {
  return props.details.sort((a, b) => {
    return +a.messageDetailId.split('-')[0] - +b.messageDetailId.split('-')[0];
  });
});

const makinoIcon = computed(() => {
  return `${host.assetsUrl}/img_chr_adv_koh-00.png`;
});

function makinoReplace(str: string) {
  return str.replaceAll('{user}', '牧野');
}
function memberIcon(characterId: string) {
  if (!characterId) {
    return '';
  }
  // img_chr_icon_ai
  return `${host.assetsUrl}/img_chr_icon_${characterId.split('-')[1] ?? 'koh'}.png`;
}
function assetsUrl(assetsId: string) {
  if (!assetsId) {
    return '';
  }
  // img_message_stamp_bear-angry
  return `${host.assetsUrl}/img_message_stamp_${assetsId}.png`;
}
</script>
<style lang="scss">
.message {
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
          background-color: #2afc6e;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 12px;
        }
      }
    }
  }
  .select + .select {
    &::before {
      content: 'or';
      position: absolute;
      top: -30px;
      right: 42px;
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
