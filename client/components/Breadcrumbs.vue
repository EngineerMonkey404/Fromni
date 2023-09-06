<template>
  <div class="subheading-1 mt-[14px] mb-[30px] container">
    <NuxtLink
      v-for="(breadcrumb, index) of props.breadcrumbs"
      :key="index"
      :to="breadcrumb.path"
      class="hover:a-hover"
    >
      {{ breadcrumb.name }}&nbsp; / &nbsp;
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  breadcrumbs: Array<{ name: string; path: string }>;
}>();
</script>

<style scoped></style>
