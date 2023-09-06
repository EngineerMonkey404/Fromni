<template>
  <div class="container break-all">
    <input
      placeholder="Поиск по каналам"
      class="input w-full bg-[url('/icons/search.svg')] bg-[5px] bg-no-repeat px-[34px] mb-4"
    />
    <NuxtLink to="/channels/sending-page">
      <button class="button block w-full mb-[16px]">Создать рассылку</button>
    </NuxtLink>
    <Channels v-if="messageStore.lastMessages" />
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from "~/stores/messageStore";

const messageStore = useMessageStore();
await messageStore.getLastMessages();
</script>

<style scoped></style>
