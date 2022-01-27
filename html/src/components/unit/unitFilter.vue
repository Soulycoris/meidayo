<template>
  <div class="filter">
    <div v-if="show" class="mark"></div>
    <transition name="fade">
      <div v-if="show" class="unit-filter">
        <div class="nav-center">筛选</div>
        <div class="unit-filter-inner">
          <div class="search-item">
            <div class="title"></div>
            <div class="title"></div>
            <div class="inner"></div>
            <div class="title"></div>
            <div class="inner"></div>
          </div>
        </div>
        <div class="btn-group">
          <div class="btn-reset" @click="cancel">取消</div>
          <div class="btn-over" @click="confirm">确认</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

let show = ref(true);
function confirm() {
  show.value = false;
}
function cancel() {
  show.value = false;
}
</script>
<style lang="scss">
.filter {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  .mark {
    width: 100%;
    height: 100%;
    background-color: rgba(76, 76, 76, 0.8);
  }
}
.unit-filter {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--background-color-base);
  transition: transform 0.3s ease-in-out;
  // transform: translateY(-140%);
  input {
    &::placeholder {
      color: gray !important;
    }
  }
  .nav-center {
    font-size: 16px;
    color: #fff;
    line-height: 44px;
    text-align: center;
  }
  .unit-filter-inner {
    width: 100%;
    color: #ffffff;
  }
  &.show {
    // display: block;
    transform: translateY(0);
  }
  &.hide {
    // display: none;
    transform: translateY(-140%);
  }
  .search-item {
    padding: 0 15px;
    margin-bottom: 10px;
    // &.addP {
    //   padding-bottom: calc('100vh - 400px') !important;
    // }
    .title {
      font-size: 16px;
      margin: 8px 0;
    }
    .inner {
      font-size: 16px;
      color: #fff;
      input[type='text'] {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        background: #292a4d;
        width: 100%;
        margin-bottom: 12px;
        color: #fff;
        padding: 0 8px;
        transition: background 0.3s ease-in-out;
        &:focus {
          background: #383a69;
        }
        &::placeholder {
          line-height: 30px;
        }
      }

      .time {
        display: flex;
        align-items: center;
        font-size: 16px;
        padding: 0 4px 4px;
        background: #292a4d;
        .time-text {
          width: 20px;
          padding: 0 3px;
          text-align: center;
        }
        .time-span {
          flex: 1;
          padding: 2px 0;
          text-align: center;
          border-bottom: 1px solid #dedede;
        }
      }
    }
  }

  .btn-group {
    display: flex;
    width: 100%;
    height: 44px !important;
    line-height: 44px !important;
    transition: 0.3s all;
    margin-top: 32px;
    div {
      text-align: center;
      height: 44px !important;
      border-top: 1px #3967dc solid;
      border-bottom: 1px #3967dc solid;
    }
  }
  .btn-reset {
    flex: 1;
    background: #22233f;
    padding: 0 15px;
    border-radius: 0;
    color: #456de6;
    line-height: 44px !important;
    transition: 0.3s all;
    &.active {
      background: #456de6;
      color: #fff;
    }
  }
  .btn-over {
    flex: 2;
    background: #3967dc;
    padding: 0 15px;
    color: #fff;
    border-radius: 0;
    line-height: 44px !important;
    transition: 0.3s all;
    &.active {
      background: #6e92ff;
    }
  }
}
</style>
