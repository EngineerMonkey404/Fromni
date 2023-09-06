<template>
  <div class="container h-screen flex flex-col">
    <div class="mt-[14px] mb-[30px] flex gap-x-4">
      <NuxtLink to="/channels">
        <div class="hover:text-button transition cursor-pointer">&lt&lt</div>
      </NuxtLink>
      <div class="subheading-1">
        {{ route.params.channel }}
      </div>
      <div></div>
    </div>

    <ClientOnly>
      <Messages
        v-if="messageStore.messages && nuxtStorage.localStorage.getData('user')"
        ref="messageBlock"
        :messages="messageStore.messages"
      />
    </ClientOnly>
    <div class="justify-self-end w-full py-[10px] mt-auto mb-4">
      <template v-if="!messageStore.messages.length">
        <textarea
          v-model="newMessage"
          placeholder="Новое соообщение"
          class="input w-full"
          @keydown.enter.prevent="addNewMessage"
        />
        <div v-if="max" :class="{ 'text-danger': newMessage.length >= max }">
          Длина сообщения
          {{ newMessage.length + "/" + max }}
        </div>
      </template>
      <template v-else>
        <div
          v-if="
            !messageStore.messages[messageStore.messages.length - 1].buttons
              ?.inlineStyle
          "
        >
          <textarea
            v-model="newMessage"
            placeholder="Новое соообщение"
            class="input w-full"
            @keydown.enter.prevent="addNewMessage"
          />
          <div v-if="max" :class="{ 'text-danger': newMessage.length >= max }">
            Длина сообщения
            {{ newMessage.length + "/" + max }}
          </div>
          <template
            v-if="
              messageStore.messages[messageStore.messages.length - 1].buttons
                ?.defaultButtons?.length
            "
          >
            <div class="flex gap-x-2 my-4">
              <div
                v-for="(button, index) of messageStore.messages[
                  messageStore.messages.length - 1
                ].buttons?.defaultButtons"
                :key="index"
                class="cursor-pointer"
                :class="{ 'button-url': button.isUrl, button: !button.isUrl }"
                @click="activateButton(button)"
              >
                {{ button.text }}
              </div>
            </div>
          </template>
        </div>
        <div
          v-if="
            messageStore.messages[messageStore.messages.length - 1].buttons
              ?.inlineButtons?.length
          "
          class="input w-full flex gap-x-3 gap-y-1 py-4"
        >
          <div
            v-for="(button, index) of messageStore.messages[
              messageStore.messages.length - 1
            ].buttons?.inlineButtons"
            :key="index"
            :class="{ 'button-url': button.isUrl, button: !button.isUrl }"
            @click="activateButton(button)"
          >
            {{ button.text }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Messages from "~/components/Messages.vue";
import { useMessageStore } from "~/stores/messageStore";
import nuxtStorage from "nuxt-storage/nuxt-storage";
import { channels } from "../../utils/channels";
import { ButtonInterface } from "~/types/buttons.interface";
const router = useRouter();
const route = useRoute();

const error = ref(false);
const newMessage = ref("");
const messageBlock = ref();

const currentChannel = channels.find((c) => c.url == route.params.channel);

const max = currentChannel?.maxMessageLength ?? 0;

const messageStore = useMessageStore();
await messageStore.getMessages(route.params.channel as string);
console.log(messageStore.messages);
definePageMeta({ layout: false });

console.log(messageStore.messages);

async function addNewMessage() {
  try {
    if (
      max ? newMessage.value.length <= max : true && newMessage.value.length
    ) {
      await messageStore.addNewMessage(
        route.params.channel as string,
        newMessage.value,
      );
      newMessage.value = "";
      messageBlock.value.scrollTop = messageBlock.value.scrollHeight;
    } else {
      error.value = true;
      return;
    }
  } catch {
    error.value = true;
  }
}

async function activateButton(button: ButtonInterface) {
  if (button.isUrl && button.url) {
    window.location.assign(button.url);
  } else {
    newMessage.value = button.text;
    await addNewMessage();
  }
}
</script>

<style scoped></style>
