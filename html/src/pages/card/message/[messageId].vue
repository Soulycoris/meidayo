<template>
  <div class="pl-2 pt-2 pb-2 flex items-center bg-dark c-white">
    <img class="w-10" src="/img/icon/icon_Message.png" alt="" srcset="" />
    <span class="ml-1 text-size-7 font-bold">麻奈</span>
  </div>
  <card-message class="pb-8" :details="message.details" :name="message.name" type="message"></card-message>
  <div class="w100% pl-2 pt-2 pb-2  flex items-center fixed bottom-0 bg-dark">
    <img class="w-8" src="/img/icon/icon_Message.png" alt="" srcset="" />
    <img class="w-8" src="/img/icon/icon_tell.png" alt="" srcset="" />
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

