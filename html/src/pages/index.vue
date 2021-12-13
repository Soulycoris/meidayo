<template>
  <!-- <home-loading :loading="loading"></home-loading> -->
  <div class="home">
    <skillGenerate :scale="0.5" skill-level="" skill-type="SP" skill-bg="bg_special_2" skill1="img_icon_skill_sk-skr-05-idol-00-1" skill2="" skill3=""></skillGenerate>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import homeLoading from '../components/homeLoading.vue';
import skillGenerate from '@components/skillGenerate/skillGenerate.vue';

let loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 800);
});
</script>
<style lang="scss">
.home {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
