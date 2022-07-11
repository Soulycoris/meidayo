import { defineStore } from 'pinia';
import { useVersion } from '@/composables/version';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', () => {
  // other options...
  let loading = ref(false);

  let version = ref('');
  initVersion();
  // Action
  async function initVersion() {
    version.value = await useVersion();
  }

  return {
    loading,
    version,
  };
});
