<template>
  <!-- <home-loading :loading="loading"></home-loading> -->
  <div class="home"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import homeLoading from '../components/homeLoading.vue';

let loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 800);
});
</script>
<style lang="scss"></style>
