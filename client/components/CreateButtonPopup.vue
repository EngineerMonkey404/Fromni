<template>
  <div v-if="isOpen" class="fixed w-full">
    <div class="fixed w-full h-screen bg-black/50"></div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);

defineExpose({ isOpen });
</script>

<style scoped></style>
