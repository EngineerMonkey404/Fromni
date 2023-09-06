<template>
  <div class="flex w-full h-screen justify-center text-tmain">
    <div>
      <div class="heading-2 text-center mt-[80px] mb-[48px]">
        Введите ваше имя
      </div>
      <input
        v-model="user"
        class="input w-full mb-[48px]"
        placeholder="Введите ваше имя"
      />
      <button class="button block" @click="auth">Войти</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import nuxtStorage from "nuxt-storage/nuxt-storage";

definePageMeta({
  layout: false,
});
const router = useRouter();
const user = ref("");
async function auth() {
  nuxtStorage.localStorage.setData("user", user.value);
  await router.push("/channels");
}
</script>

<style scoped></style>
