<template>
  <div class="p-2">
    <h3 class="mt-0 c-white">{{ detail.title }}</h3>
    <dialogue :list="detail.message" :title="detail.title"></dialogue>
    <div class="flex justify-between">
      <div v-if="chapter > 1" @click="page(-1)">
        <svg t="1645002405504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2362" width="16" height="16"><path d="M243.2 551.424l453.632 453.632c22.528 22.528 59.904 22.528 82.432 0 22.528-22.528 22.528-59.904 0-82.432L366.592 510.464l412.672-412.672c22.528-22.528 22.528-59.904 0-82.432-22.528-22.528-59.904-22.528-82.432 0L243.2 468.992c-23.04 23.04-23.04 59.904 0 82.432z m0 0" p-id="2363" fill="#ffffff"></path></svg>
      </div>
      <div v-if="chapter < 3" @click="page(1)">
        <svg t="1645002547407" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2167" width="16" height="16"><path d="M779.264 468.992L325.632 15.36c-22.528-22.528-59.904-22.528-82.432 0-22.528 22.528-22.528 59.904 0 82.432L655.36 510.464l-412.672 412.672c-22.528 22.528-22.528 59.904 0 82.432 22.528 22.528 59.904 22.528 82.432 0l453.632-453.632c23.552-23.04 23.04-59.904 0.512-82.944z m0 0" p-id="2168" fill="#ffffff"></path></svg>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from '@/stores';
import { CardStory } from 'hoshimi-types/ProtoMaster';
import { CardStoryDetail } from '@/ProtoTypes';
import { fetchCardStoryDetail } from '@/api/card';

const store = useStore();
const route = useRoute();

let storyId = ref<CardStory['storyId']>('');

let detail = reactive<CardStoryDetail>({
  title: '',
  message: [],
});
// st-card-rei-05-mizg-02-01
const chapter = computed(() => Number.parseInt(storyId.value.split('-').at(-1) ?? '1'));

onActivated(() => {
  document.body.scrollIntoView();
  let id = route.params.storyId;
  if (storyId.value !== id) {
    storyId.value = route.params.storyId as string;
    getStoryDetail(storyId.value);
  }
});

function page(num: number) {
  storyId.value = storyId.value.slice(0, -2) + (chapter.value + num).toString().padStart(2, '0');
  getStoryDetail(storyId.value);
  document.body.scrollIntoView();
}

function getStoryDetail(id: string) {
  store.$state.loading = false;
  fetchCardStoryDetail(id)
    .then((res) => {
      if (res.data) {
        Object.assign(detail, res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      store.$state.loading = false;
    });
}
</script>
