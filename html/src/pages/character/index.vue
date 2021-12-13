<template>
  <div class="character">
    <!-- <uni-search-bar bgColor="#313131" @confirm="search" @input="searchInput" cancelButton="false"></uni-search-bar> -->
    <!-- <div class="fitter-bar">
      <uni-combox label="类型" :candidates="fitterArray.type" v-model="fitterActive.type"></uni-combox>
    </div> -->
    <charaListItem class="char-list" :charaList="fitterCharaBase" :sort="fitterActive.sort" @on-click="charaBaseTo"> </charaListItem>
  </div>
</template>
<script setup lang="ts">
import charaListItem from '@/components/character/chara-list-item.vue';
import { onMounted, computed ,reactive} from 'vue';
interface fitterActive {
  type: number;
}

type sort = '' | 'height' | 'age' | 'weight';

let charaList = [];
let searchInput: string = '';
let scrollTop: number = 0;
let fitterArray = {
  type: [
    { key: 0, value: '全部' },
    { key: 1, value: '物理' },
    { key: 2, value: '魔法' },
    { key: 3, value: '魔法' },
  ],
};
let fitterActive: fitterActive = reactive({
  type: 0,
});

const fitterCharaBase = computed(() => {
  let arr = charaList.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
  if (fitterActive.type) {
    arr = arr.filter((e) => e.atk_type === fitterActive.type);
  }
  return arr;
});

onMounted(() => {
  getCharaBase();
});

function getCharaBase(): void {
  // uni.request({
  //   url: `${this.$hostConfig.hostUrl}/unit/list`,
  //   success: (res) => {
  //     if (Array.isArray(res.data)) {
  //       this.charaList = res.data;
  //     }
  //   },
  // });
}

function charaBaseTo(unitid: number): void {
  // this.$store.commit('setUnitId', unitid);
  // uni.navigateTo({
  //   url: `/pages/character/base/base?unit_id=${unitid}`,
  // });
}
function scroll(e: any) {
  // console.log(e);
  scrollTop = e.detail.scrollTop;
}
</script>
<style lang="scss">
.character {
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
      font-size: $uni-font-size-base;
      padding: 8rpx 0;
    }
    .item-cnn {
      font-size: $uni-font-size-sm;
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
