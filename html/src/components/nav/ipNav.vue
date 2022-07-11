<template>
  <div class="ip-nav-bar w100% relative z-1 lh-6 center c-white select-none" :class="{ 'ip-hairline--bottom': border, 'nav-fixed': isFixed }">
    <div class="relative flex items-center h-10">
      <div class="absolute top-0 bottom-0 left-0 flex items-center pl-4 pr-4 cursor-pointer" @click="eventLeftClick">
        <svg v-if="leftArrow" t="1640245082024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2041" width="20" height="20">
          <path d="M710.4 838.4 358.4 492.8c-12.8-12.8-32-12.8-44.8 0l0 0c-12.8 12.8-12.8 32 0 44.8l352 352c12.8 12.8 32 12.8 44.8 0l0 0C723.2 876.8 723.2 851.2 710.4 838.4z" p-id="2042" fill="#ffffff"></path>
          <path d="M358.4 531.2l352-352c12.8-12.8 12.8-32 0-44.8l0 0c-12.8-12.8-32-12.8-44.8 0L313.6 486.4c-12.8 12.8-12.8 32 0 44.8l0 0C326.4 544 345.6 544 358.4 531.2z" p-id="2043" fill="#ffffff"></path>
        </svg>
        <slot name="left"></slot>
      </div>
      <div class="max-w-60% mla mra">
        <slot name="title"></slot>
      </div>
      <div class="absolute top-0 bottom-0 right-0 flex items-center pl-4 pr-4 cursor-pointer">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { throttle } from 'lodash';

interface Props {
  border: boolean;
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
    document.addEventListener('scroll', throttle(onScroll, 200));
  }
});

onBeforeUnmount(() => {
  if (props.fixed) {
    document.removeEventListener('scroll', throttle(onScroll, 200));
  }
});

function onScroll() {
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  isFixed.value = scrollTop > props.top;
}
function eventLeftClick() {
  emit('on-left-click');
}
</script>
<style lang="scss">
.ip-nav-bar {
  background-color: rgba(76, 76, 76, 0.8);
  font-size: 16px;
  &.nav-fixed {
    position: fixed;
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.ip-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
