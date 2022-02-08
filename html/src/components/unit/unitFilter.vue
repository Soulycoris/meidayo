<template>
  <transition name="fade">
    <div class="filter" v-if="show">
      <div class="mark" @click.self="confirm"></div>
      <div class="unit-filter">
        <div class="nav-center">筛选</div>
        <div class="unit-filter-inner">
          <div class="search-item">
            <div class="title">
              <div>类型</div>
              <div class="tool">
                <span class="tool-item" @click="eventSelect('type', true)">全选</span>
                <span class="tool-item" @click="eventSelect('type', false)">取消</span>
              </div>
            </div>
            <div class="inner">
              <el-checkbox-group v-model="searchForm.type">
                <el-checkbox :label="item[0]" v-for="(item, index) in unitTypeMap" :key="index">
                  <img class="img-max" :src="`/img/icon/icon_${item[1]}_thumbnail.png`" />
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="title">
              <div>倾向</div>
              <div class="tool">
                <span class="tool-item" @click="eventSelect('propensity', true)">全选</span>
                <span class="tool-item" @click="eventSelect('propensity', false)">取消</span>
              </div>
            </div>
            <div class="inner">
              <el-checkbox-group v-model="searchForm.propensity">
                <el-checkbox :label="item[0]" v-for="(item, index) in unitPropensityMap" :key="index">
                  <div class="maskedimage" :class="'maskedimage-' + item[1]"></div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="title">
              <div>角色</div>
              <div class="tool">
                <span class="tool-item" @click="eventSelect('name', true)">全选</span>
                <span class="tool-item" @click="eventSelect('name', false)">取消</span>
              </div>
            </div>
            <div class="inner">
              <el-checkbox-group v-model="searchForm.name">
                <el-checkbox :label="item.spell" v-for="(item, index) in memberList" :key="index">
                  <img class="img-max" :src="memberIcon(item.spell)" />
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <!-- <div class="btn-group">
          <div class="btn-reset" @click="cancel">取消</div>
          <div class="btn-over" @click="confirm">确认</div>
        </div> -->
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { host } from '@/config/host';
import { reactive } from 'vue';
import { unitPropensityMap, unitTypeMap, memberList } from '@/assets/utils';

interface SearchForm {
  type: string[];
  propensity: string[];
  name: string[];
}

const props = defineProps<{
  show: false;
}>();

const emit = defineEmits<{
  (e: 'on-confirm', form: SearchForm): void;
  // (e: 'update:modelValue', form: SearchForm): void;
}>();

const searchForm = reactive<SearchForm>({
  type: [],
  propensity: [],
  name: [],
});

function confirm() {
  emit('on-confirm', searchForm);
}

function eventSelect(target: string, event: boolean) {
  if (!event) {
    searchForm[target]?.splice(0);
    return;
  }
  if (target === 'type') {
    searchForm[target] = Array.from(unitTypeMap.keys());
  } else if (target === 'propensity') {
    searchForm[target] = Array.from(unitPropensityMap.keys());
  } else if (target === 'name') {
    searchForm[target] = memberList.map((e) => e.spell);
  }
}

function memberIcon(name: string) {
  if (!name) {
    return '';
  }
  return `${host.assetsUrl}/img_chr_icon_${name}.png`;
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
  top: 25%;
  width: 100%;
  background-color: var(--background-color-base);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  .nav-center {
    font-size: 16px;
    color: #fff;
    line-height: 44px;
    text-align: center;
  }
  .unit-filter-inner {
    width: 100%;
    height: auto;
    color: #ffffff;
  }
  &.show {
    transform: translateY(0);
  }
  &.hide {
    transform: translateY(-140%);
  }
  .search-item {
    padding: 0 16px;
    height: 100%;
    .title {
      font-size: 16px;
      margin: 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tool {
        display: flex;
      }
      .tool-item {
        font-size: 12px;
        padding: 0 6px;
      }
    }
    .inner {
      font-size: 16px;
      .el-checkbox__label {
        color: #fff;
      }
      .el-checkbox {
        width: 24%;
      }
      .img-max {
        width: 32px;
      }
    }
  }

  .btn-group {
    display: flex;
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: #333;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    div {
      flex: 1;
      text-align: center;
    }
  }
  .btn-reset {
    background-color: #ccc;
  }
  .btn-over {
    // background-image:  linear-gradient(to right, #02ff8d , #24ffed);
    background-color: #22ffe9;
  }
}
</style>
