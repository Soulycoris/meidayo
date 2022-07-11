<template>
  <div class="loading-mark" v-if="loading"></div>
  <div class="loading" v-if="loading">
    <svg viewBox="0 0 88 88" width="32">
      <path id="pathI" ref="pathI" stroke-dashoffset="0" stroke-dasharray="" stroke-width="14" stroke="#1626ff" fill="none" d="m16,5l0,80"></path>
      <path id="pathP" ref="pathP" stroke-dashoffset="0" stroke-dasharray="" stroke-width="14" stroke="#1626ff" fill="none" d="m36,12l26,0c5,0 14,4 14,14c0,5 -4,14 -14,14l-19,0l0,45"></path>
    </svg>
    <div class="text">LOADING</div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from '@/stores';

const store = useStore();

let loading = computed(() => {
  return store.$state.loading;
});

let pathI = ref<SVGPathElement | null>(null);
let pathP = ref<SVGPathElement | null>(null);
let num = 0;

class Cubic {
  px3: number;
  px2: number;
  px1: number;
  py3: number;
  py2: number;
  py1: number;
  epsilon: number;
  constructor(a: number, b: number, c: number, d: number) {
    this.px3 = 3 * a;
    this.px2 = 3 * (c - a) - this.px3;
    this.px1 = 1 - this.px3 - this.px2;
    this.py3 = 3 * b;
    this.py2 = 3 * (d - b) - this.py3;
    this.py1 = 1 - this.py3 - this.py2;
    this.epsilon = 1e-7; // 目标精度
  }

  getX(t: number) {
    return ((this.px1 * t + this.px2) * t + this.px3) * t;
  }

  getY(t: number) {
    return ((this.py1 * t + this.py2) * t + this.py3) * t;
  }

  solve(x: number) {
    if (x === 0 || x === 1) {
      // 对 0 和 1 两个特殊 t 不做计算
      return this.getY(x);
    }
    let t = x;
    for (let i = 0; i < 8; i++) {
      // 进行 8 次迭代
      let g = this.getX(t) - x;
      if (Math.abs(g) < this.epsilon) {
        // 检测误差到可以接受的范围
        return this.getY(t);
      }
      let d = (3 * this.px1 * t + 2 * this.px2) * t + this.px3; // 对 x 求导
      if (Math.abs(d) < 1e-6) {
        // 如果梯度过低，说明牛顿迭代法无法达到更高精度
        break;
      }
      t = t - g / d;
    }
    return this.getY(t); // 对得到的近似 t 求 y
  }
}
// cubic-bezier
let cb = new Cubic(0.25, 0.1, 0.25, 1);

store.$subscribe((mutation, state) => {
  if (state.loading) {
    nextTick(() => {
      window.requestAnimationFrame(load);
    });
  }
});

onMounted(() => {
  if (pathI.value) {
    pathI.value.setAttribute('stroke-dasharray', pathI.value.getTotalLength().toFixed(0));
  }
  if (pathP.value) {
    pathP.value.setAttribute('stroke-dasharray', pathP.value.getTotalLength().toFixed(0));
  }
});

function load() {
  if (num > 140) {
    // 120张
    num = 0;
  }
  if (pathI.value && pathP.value) {
    if (!pathI.value.getAttribute('stroke-dasharray')) {
      pathI.value.setAttribute('stroke-dasharray', pathI.value.getTotalLength().toFixed(0));
      pathP.value.setAttribute('stroke-dasharray', pathP.value.getTotalLength().toFixed(0));
    }
    if (num < 20) {
      let len = pathI.value.getTotalLength();
      let progress = num / 20;
      let distance = (cb.solve(progress) * len).toFixed(0);
      pathI.value.setAttribute('stroke-dashoffset', distance);
    }
    if (num > 20 && num < 70) {
      let len = pathP.value.getTotalLength();
      let progress = (num - 20) / 50;
      let distance = (-cb.solve(progress) * len).toFixed(0);
      pathP.value.setAttribute('stroke-dashoffset', distance);
    }
    if (num > 70 && num < 121) {
      let pathILen = pathI.value.getTotalLength();
      let pathIProgress = (num - 70) / 50;
      let pathIDistance = (-pathILen + cb.solve(pathIProgress) * pathILen).toFixed(0);
      pathI.value.setAttribute('stroke-dashoffset', pathIDistance);

      let pathPLen = pathP.value.getTotalLength();
      let pathPProgress = (num - 70) / 50;
      let pathPDistance = (pathPLen - cb.solve(pathPProgress) * pathPLen).toFixed(0);
      pathP.value.setAttribute('stroke-dashoffset', pathPDistance);
    }
  }
  num++;
  window.requestAnimationFrame(load);
}
</script>
<style lang="scss">
.loading-mark {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.loading {
  position: fixed;
  bottom: 40px;
  right: 16px;
  width: 48px;
  height: 48px;
  padding: 2px 2px;
  border-radius: 8px;
  background-color: #fff;
  color: #1626ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-weight: normal;
    font-size: 8px;
    animation: text 2s linear infinite;
  }
}
@keyframes text {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
