<template>
  <canvas id="canvas" class="canvas"></canvas>
  <Loading></Loading>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement;

// 动画位置
let translatePosition = 0;
let dx = 0.1;

onMounted(() => {
  let res = document.querySelector('canvas');
  if (res) {
    canvas = res;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 80; // 移动端底部自带菜单栏
    let ctxres = canvas.getContext('2d');
    if (ctxres) {
      ctx = ctxres;
    }
    image = new Image(); // 创建img元素
    image.onload = () => {
      draw();
    };
    image.src = '/img/icon/ip_bg.png'; // 设置图片源地址
  }
});
function draw() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let pattern = ctx.createPattern(image, 'repeat');
  // 将新创建的CanvasPattern对象赋值给fillStyle属性
  if (!pattern) {
    return;
  }
  // 叠加模式
  ctx.globalCompositeOperation = 'multiply';
  // 背景颜色
  ctx.fillStyle = '#4c4c4c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 图片变换
  let matrix = new DOMMatrixReadOnly();
  pattern.setTransform(matrix.scale(0.35).translate(translatePosition, translatePosition));

  ctx.fillStyle = pattern;

  // 绘制图案
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  translatePosition -= dx;

  // 重复动画
  window.requestAnimationFrame(draw);
}
</script>
<style lang="scss">
.canvas {
  position: fixed;
  z-index: -1;
}
</style>
