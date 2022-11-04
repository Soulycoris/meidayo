<template>
  <div class="pl-2 pt-2 pb-2 flex items-center bg-dark c-white">
    <div class="w-16 h-16 rd-16">
      <img src="" alt="" srcset="" />
    </div>
    <div>suzu</div>
    <div class="flex justify-around item-center">
      <div>应答</div>
      <div>拒接</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from '@/stores';
import { Message } from 'hoshimi-types/ProtoMaster';
import { fetchMessage } from '@/api/card';

const store = useStore();
const route = useRoute();

let messageId = ref<Message['id']>('');

let message = reactive<Message>({
  id: '',
  messageGroupId: '',
  name: '',
  type: 0,
  characterId: '',
  instantType: 0,
  rarityType: 0,
  unlockConditionId: '',
  details: [],
});

// message-card-ai-05-idol-00
onActivated(() => {
  document.body.scrollIntoView();
  let id = route.params.messageId;
  if (messageId.value !== id) {
    messageId.value = route.params.messageId as string;
    getCardMessage(messageId.value);
  }
});

function getCardMessage(id: string) {
  store.$state.loading = false;
  fetchMessage(id)
    .then((res) => {
      if (res.data) {
        Object.assign(message, res.data);
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
