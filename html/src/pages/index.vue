<template>
  <!-- <home-loading :loading="loading"></home-loading> -->
  <div class="home" id="home"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import homeLoading from '@com/homeLoading.vue';
let loading = ref(true);
// onMounted(() => {
//   setTimeout(() => {
//   }, 3000);
// });
</script>
<style lang="scss">
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: var(--background-color-base);
  // background-image: url('/img/icon/ip_bg.png');
  // mask-size: 10%;
  // -webkit-mask-size: 10%;
  // mask-image: url('/img/icon/ip_bg.png');
  // -webkit-mask-image: url('/img/icon/ip_bg.png');
  // mask-mode: luminance;
}
</style>
