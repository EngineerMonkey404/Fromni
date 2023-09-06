<template>
  <div
    ref="messageBlock"
    class="bg-secondary-bg flex h-full flex-col pb-[20px] overflow-y-scroll scrollbar"
  >
    <div class="mt-auto flex flex-col px-[16px] break-all">
      <div
        v-for="(message, index) of messages"
        :key="index"
        class="flex flex-col px-[18px] py-[10px] my-[12px]"
        :class="{
          'ml-auto bg-button text-white rounded-my-message':
            message.user == user,
          'text-black bg-white mr-auto': message.user != user,
        }"
      >
        <div>{{ message.text }}</div>
        <div
          :class="{
            'ml-auto': message.user == user,
            'ml-rigth': message.user != user,
          }"
        >
          {{ message.user }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageInterface } from "~/types/message.interface";
import nuxtStorage from "nuxt-storage/nuxt-storage";
import { useMessageStore } from "~/stores/messageStore";
defineProps<{ messages: MessageInterface[] }>();
const user = nuxtStorage.localStorage.getData("user");
const messageStore = useMessageStore();
const messageBlock = ref();

messageStore.$subscribe((mutation, state) => {
  messageBlock.value.scrollTop = messageBlock.value.scrollHeight;
});
onMounted(() => {
  messageBlock.value.scrollTop = messageBlock.value.scrollHeight;
});
</script>

<style scoped>
.rounded-my-message {
  @apply rounded-bl-2xl rounded-t-2xl;
}

.rounded-message {
  @apply rounded-br-2xl rounded-t-2xl;
}

.scrollbar {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.scrollbar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
