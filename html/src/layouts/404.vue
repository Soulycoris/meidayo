<script setup lang="ts">
const router = useRouter();
function toHome() {
  router.replace('/card');
}
</script>

<template>
  <main p="x4 y10" text="center green-700 dark:gray-200">
    <div text-4xl>
      <div i-ri-error-warning-line inline-block />
    </div>
    <RouterView />
    <div>
      <button btn text-sm m="3 t8" @click="toHome">返回</button>
    </div>
  </main>
</template>
