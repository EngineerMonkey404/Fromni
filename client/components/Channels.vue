<template>
  <NuxtLink
    v-for="(channel, index) of channels"
    :key="index"
    :to="`/channels/${channel.url}`"
  >
    <div>
      <div
        class="border-b border-line flex pb-[12px] pt-[16px] hover:bg-secondary-bg cursor-pointer"
      >
        <img :src="channel.image" class="w-[56px] h-[56px] rounded-[16px]" />
        <div class="ml-[12px]">
          <div class="body-text-1 mb-[2px]">{{ channel.name }}</div>
          <div class="text-disabled metadata-1 line-clamp-3">
            {{ messageStore.lastMessages.get(channel.url).text }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useMessageStore } from "~/stores/messageStore";
import { channels } from "~/utils/channels";

const messageStore = useMessageStore();
</script>

<style scoped></style>
