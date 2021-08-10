<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import homepage from './pages/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    homepage
  }
})
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
body{
font-size: 37.5px;
}
</style>
