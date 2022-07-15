<template>
  <div class="dialogue">
    <div class="item flex items-end mt-4 mb-4" v-for="(item, index) in list" :key="index" :class="item.name.includes('user') ? 'right' : 'left'">
      <div class="icon w8 flex flex-none">
        <span v-if="item.name.includes('user')" class="flex"> <img class="img-max" :src="makinoIcon" /> </span>
        <span class="flex" v-else>
          <img class="img-max" :src="memberIcon(item.name)" />
        </span>
      </div>
      <div class="text w100% ml-3 mr-10 flex flex-col c-dark-100">
        <template v-if="item.name">
          <div class="content">
            {{ makinoReplace(item.text) }}
          </div>
          <div class="name c-white">{{ makinoReplace(item.name) }}</div>
        </template>
        <template v-else>
          <div class="mla mra text-center c-white">{{ item.text }}</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { host } from '@/config/host';
import { memberList } from '@/assets/utils';

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
  const res = memberList.find((e) => props.title.includes(e.name));
  //   img_chr_adv_koh-00.png
  return `${host.assetsUrl}/img_chr_adv_${res?.spell ?? 'koh'}-00.png`;
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
        }
      }
    }
  }
  .text {
    .name {
      font-size: 14px;
    }
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
