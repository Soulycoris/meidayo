<template>
  <div>{{ blank }}</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "blank",
  setup: () => {
    const data = reactive({
      blank: "msg",
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
