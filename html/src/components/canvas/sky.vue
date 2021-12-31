<template>
  <div class="home" id="home">
    <canvas id="canvas" class="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
let canvas: HTMLCanvasElement | null = null,
  ctx: CanvasRenderingContext2D | null = null;

let mousePosition = {
  x: 0,
  y: 0,
};
let dots: {
  nb: number;
  distance: number;
  d_radius: number;
  array: Dot[];
} = {
  nb: 250,
  distance: 100,
  d_radius: 150,
  array: [],
};

onMounted(() => {
  canvas = document.querySelector('canvas');
  if (canvas) {
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mousePosition = {
      x: canvas.width - 100,
      y: canvas.height - 60,
    };

    if (ctx) {
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = new Color(150).style;
    }
  }
  // ----------------------跟着鼠标动--------------------
  document.getElementById('home')?.addEventListener('mousemove', function (e) {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  });

  document.getElementById('home')?.addEventListener('mouseleave', function (e) {
    if (canvas) {
      mousePosition.x = canvas.width / 2;
      mousePosition.y = canvas.height / 2;
    }
  });
  // ----------------------跟着鼠标动--------------------
  createDots();
  requestAnimationFrame(animateDots);
  // setTimeout(() => {
  //   loading.value = false;
  // }, 800);
});

function colorValue(min: number) {
  return Math.floor(Math.random() * 255 + min);
}

function createColorStyle(r: string | number, g: string | number, b: string | number) {
  return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
}

function mixComponents(comp1: number, weight1: number, comp2: number, weight2: number) {
  return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
}

function averageColorStyles(dot1: Dot, dot2: Dot) {
  let color1 = dot1.color,
    color2 = dot2.color;

  let r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
    g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
    b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
  return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
}
class Color {
  r: number;
  g: number;
  b: number;
  style: string;
  constructor(min: number = 0) {
    this.r = colorValue(min);
    this.g = colorValue(min);
    this.b = colorValue(min);
    this.style = createColorStyle(this.r, this.g, this.b);
  }
}

class Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: Color;
  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    this.radius = Math.random() * 2;
    this.color = new Color();
  }
  draw() {
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color.style;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }
}
function createDots() {
  if (!canvas) {
    return;
  }
  for (let i = 0; i < dots.nb; i++) {
    let item = new Dot(canvas);
    if (item) {
      dots.array.push(item);
    }
  }
}

function moveDots() {
  if (!canvas) {
    return;
  }
  for (let i = 0; i < dots.nb; i++) {
    let dot = dots.array[i];

    if (dot.y < 0 || dot.y > canvas.height) {
      dot.vx = dot.vx;
      dot.vy = -dot.vy;
    } else if (dot.x < 0 || dot.x > canvas.width) {
      dot.vx = -dot.vx;
      dot.vy = dot.vy;
    }
    dot.x += dot.vx;
    dot.y += dot.vy;
  }
}

function connectDots() {
  if (!ctx) {
    return;
  }
  for (let i = 0; i < dots.nb; i++) {
    for (let j = 0; j < dots.nb; j++) {
      let i_dot = dots.array[i];
      let j_dot = dots.array[j];
      // 两个点之间的距离不能小于100
      if (i_dot.x - j_dot.x < dots.distance && i_dot.y - j_dot.y < dots.distance && i_dot.x - j_dot.x > -dots.distance && i_dot.y - j_dot.y > -dots.distance) {
        if (i_dot.x - mousePosition.x < dots.d_radius && i_dot.y - mousePosition.y < dots.d_radius && i_dot.x - mousePosition.x > -dots.d_radius && i_dot.y - mousePosition.y > -dots.d_radius) {
          ctx.beginPath();
          ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
          ctx.moveTo(i_dot.x, i_dot.y);
          ctx.lineTo(j_dot.x, j_dot.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }
}

function drawDots() {
  for (let i = 0; i < dots.nb; i++) {
    let dot = dots.array[i];
    dot.draw();
  }
}

function animateDots() {
  if (!canvas || !ctx) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveDots();
  connectDots();
  drawDots();
  requestAnimationFrame(animateDots);
}
</script>
<style lang="scss">

.canvas {
  position: fixed;
  z-index: 1;
}
</style>
