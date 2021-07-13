<template>
  <view class="character">
    <view class="fitter-bar">
      <uni-combox label="类型" :candidates="fitterArray.type" v-model="fitterActive.type"></uni-combox>
      <uni-combox label="位置" :candidates="fitterArray.position" v-model="fitterActive.position"></uni-combox>
      <uni-combox label="排序" :candidates="fitterArray.sort" v-model="fitterActive.sort"></uni-combox>
    </view>
    <!-- <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y" @scroll="scroll"> -->
      <chara-list-item class="char-list" :charaList="fitterCharaBase" :sort="fitterActive.sort" :scrollTop="scrollTop" @on-click="charaBaseTo"> </chara-list-item>
    <!-- </scroll-view> -->
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "character",
  setup: () => {
    const data = reactive({
      character: "msg",
    });
    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
});
</script>
<style lang="scss">
// .home {
// }
</style>
