<template>
  <!-- <home-loading :loading="loading"></home-loading> -->
  <div class="home"></div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";

import homeLoading from "../components/homeLoading.vue";
export default defineComponent({
  name: "home",
  components: {
    homeLoading,
  },
  setup: () => {
    const data = reactive({
      loading: true,
    });
    onMounted(() => {
      setTimeout(() => {
        data.loading = false;
      }, 800);
    });

    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
});
</script>
<style lang="scss">
// .home {
// }
</style>
