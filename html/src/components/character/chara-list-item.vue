<template>
  <view>
    <view class="char-list-item" v-for="item in charaList" :key="item.unit_id" :data-unitId="item.unit_id" @click="charaBaseTo(item.unit_id)">
      <view v-if="showPositioning" class="item-icon" :class="computedClassPositioning(item.search_area_width)"> </view>
      <view class="item-head-img">
        <!-- <image class="img" mode="aspectFit" :src="" :lazy-load="true"></image> -->
        <easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="`${$hostConfig.resUrl}/icon/unit/${item.rarity === 6 ? item.prefab_id + 60 : item.prefab_id + 30}`"></easy-loadimage>
      </view>
      <view class="item-name">
        <view class="item-jpn">{{ item.unit_name }}</view>
        <view class="item-cnn">
          {{ item.actual_name || item.unit_name }}
        </view>
      </view>
      <view class="item-other">
        <text v-if="sort">{{ item[sort] || "" }}</text>
        <view slot v-else></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from "vue-property-decorator";
// import easyLoadimage from "@/components/easy-loadimage/easy-loadimage.vue";

@Component({
  name: "charaListItem",
  components: { easyLoadimage },
})
export default class extends Vue {
  // private title: string = "Hello";
  // private scrollTop: number = 0;

  @Prop({
    type: Array,
    default() {
      return [];
    },
  })
  private charaList!: charaBase[];
  @Prop({ default: "" }) private sort!: string;
  @Prop({ default: true }) private showPositioning!: boolean;
  @Prop({ default: 0 }) private scrollTop!: number;
  public charaBaseTo(unitid: number) {
    this.$emit("on-click", unitid);
  }
  public computedClassPositioning(positioning: number) {
    if (positioning <= 300) {
      return "type1";
    } else if (positioning <= 600) {
      return "type2";
    } else {
      return "type3";
    }
  }
  // public onPageScroll({ scrollTop: scrollTop = 0 }) {
  //   // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
  //   this.scrollTop = scrollTop;
  // }
}
</script>
<style lang="scss" scoped>
.char-list-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
  &:hover {
    background-color: #373737;
  }
  .item-icon {
    width: 40rpx;
    height: 40rpx;
    background: url("/static/img/AtlasCommon.png") no-repeat;
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
    width: 136rpx;
    height: 136rpx;
    margin-right: 16px;
    .img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .item-name {
    height: auto;
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    .item-jpn {
      font-size: 15px;
      padding: 8px 0;
    }
    .item-cnn {
      font-size: 12px;
      padding: 8px 0;
    }
  }
  .item-other {
    position: absolute;
    right: 0;
    padding-right: 16px;
  }
}
</style>
