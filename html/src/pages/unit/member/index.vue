<template>
  <div class="chara-profile">
    <!-- <chara-list-item class="char-list" :chara-list="getCharaData.charaBase" :show-positioning="false"> </chara-list-item> -->
    <div class="line"></div>
    <div class="chara-pro-main">
      <div class="chara-pro-area">
        <div class="chara-state-box">{{ memberDetail.name }}</div>
        <div class="chara-state-box">个人情报</div>
        <div class="chara-state-box">
          <div class="chara-state-status">
            <div class="chara-state-item" v-for="item in ['height', 'weight', 'age']" :key="item">
              <div class="chara-state-item-tag">{{ $t(`character.charaBase.${item}`) }}</div>
              <!-- <div class="chara-state-item-text">{{ memberDetail[item] }}</div> -->
            </div>
            <div class="chara-state-item">
              <div class="chara-state-item-tag">{{ $t(`character.charaBase.birth`) }}</div>
              <!-- <div class="chara-state-item-text">{{ $t(`character.charaBase.birth_month`, { msg: memberDetail.birth_month }) }}{{ $t(`character.charaBase.birth_day`, { msg: memberDetail.birth_day }) }}</div> -->
            </div>
            <div class="chara-state-item" v-for="item in ['blood_type', 'race']" :key="item">
              <div class="chara-state-item-tag">{{ $t(`character.charaBase.${item}`) }}</div>
              <!-- <div class="chara-state-item-text">{{ memberDetail[item] }}</div> -->
            </div>
            <div class="chara-state-item chara-state-item-full" v-for="item in ['guild', 'voice', 'favorite']" :key="item">
              <div class="chara-state-item-tag">{{ $t(`character.charaBase.${item}`) }}</div>
              <!-- <div class="chara-state-item-text">{{ memberDetail[item] }}</div> -->
            </div>
          </div>
        </div>
        <div class="chara-state-box">{{ memberDetail.self_text }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';

let memberDetail: memberDetail = {
  member_id: 0,
  name: '',
  age: 0,
  height: 0,
  weight: 0,
  bwh: '',
  birth: '',
  favorite: '',
  school: '',
  voice: '',
  group_name: '',
  self_text: '',
};
onMounted(() => {});

function getMemberData(id: number) {
  axios
    .get(`/unit/member/${id}`)
    .then((res) => {
      Object.assign(memberDetail, res.data as memberDetail);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
<style lang="scss">
.line {
  height: 1px;
  background-color: #333;
}
.chara-profile {
  .chara-pro-main {
    .chara-pro-area {
      margin: 16rpx;
      border-radius: 4px;
      padding: 16rpx 12rpx;
      font-size: $uni-font-size-base;
      background-color: #292929;
    }
    .chara-unique-equipment {
      width: 100%;
      display: flex;
      align-items: center;
      .chara-unique-equipment-img {
        width: 100rpx;
        height: 100rpx;
        margin-right: 32rpx;
        img {
          max-width: 100%;
          height: auto;
        }
      }
    }
    .chara-equipment {
      width: 100%;
      .chara-equipment-img {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          max-width: 100rpx;
          height: auto;
        }
      }
    }
  }
}
</style>
