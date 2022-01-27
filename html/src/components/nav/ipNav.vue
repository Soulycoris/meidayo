<template>
  <div class="ip-nav-bar" :class="{ 'ip-hairline--bottom': border, fixed: isFixed }">
    <div class="ip-nav-bar-content">
      <div class="ip-nav-bar-left" @click="eventLeftClick">
        <svg v-if="leftArrow" t="1640245082024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2041" width="20" height="20">
          <path d="M710.4 838.4 358.4 492.8c-12.8-12.8-32-12.8-44.8 0l0 0c-12.8 12.8-12.8 32 0 44.8l352 352c12.8 12.8 32 12.8 44.8 0l0 0C723.2 876.8 723.2 851.2 710.4 838.4z" p-id="2042" fill="#ffffff"></path>
          <path d="M358.4 531.2l352-352c12.8-12.8 12.8-32 0-44.8l0 0c-12.8-12.8-32-12.8-44.8 0L313.6 486.4c-12.8 12.8-12.8 32 0 44.8l0 0C326.4 544 345.6 544 358.4 531.2z" p-id="2043" fill="#ffffff"></path>
        </svg>
        <slot name="left"></slot>
      </div>
      <div class="ip-nav-bar-title">
        <slot name="title"></slot>
      </div>
      <div class="ip-nav-bar-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

interface Props {
  border: string;
  leftArrow: boolean;
  fixed: boolean;
  top: number;
}

const props = withDefaults(defineProps<Props>(), {
  fixed: false,
  top: 200,
});

let isFixed = ref(false);

const emit = defineEmits<{
  (e: 'on-left-click'): void;
}>();

onMounted(() => {
  if (props.fixed) {
    document.addEventListener('scroll', onScroll);
  }
});

onBeforeUnmount(() => {
  if (props.fixed) {
    document.removeEventListener('scroll', onScroll);
  }
});

function onScroll() {
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  isFixed.value = scrollTop > props.top;
}
function eventLeftClick() {
  emit('on-left-click');
}
</script>
<style lang="scss">
.ip-nav-bar {
  width: 100%;
  position: relative;
  z-index: 1;
  line-height: 22px;
  text-align: center;
  background-color: rgba($color: #4c4c4c, $alpha: 0.8);
  user-select: none;
  color: #fff;
  font-size: 16px;
  &.fixed {
    position: fixed;
    background-color: rgba(76, 76, 76, 0.8);
    transition: background-color ease 0.2s;
  }
}
.ip-hairline--bottom::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  transform: scale(0.5);
  // border-bottom: 1px solid #222;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.ip-nav-bar-content {
  position: relative;
  display: flex;
  align-items: center;
  height: 45px;
}
.ip-nav-bar-title {
  max-width: 60%;
  margin: 0 auto;
  font-weight: 500;
  font-size: 16px;
}
.ip-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ip-nav-bar-left {
  left: 0;
}
.ip-nav-bar-right {
  right: 0;
}
.ip-nav-bar-left,
.ip-nav-bar-right {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
}
</style>
