<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
// import VConsole from 'vconsole';
// const vConsole = new VConsole();
</script>
<style lang="scss"></style>
