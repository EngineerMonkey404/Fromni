<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" />
  <slot></slot>
</template>

<script setup lang="ts">
import nuxtStorage from "nuxt-storage/nuxt-storage";
import { useBreadcrumbs } from "~/composables/useBreadcrumbs";

const router = useRouter();
const { breadcrumbs } = useBreadcrumbs();
const user = nuxtStorage.localStorage.getData("user");
if (!user) {
  router.push("/");
}
</script>

<style scoped></style>
