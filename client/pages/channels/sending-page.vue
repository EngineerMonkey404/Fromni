<template>
  <div class="container break-all">
    <div ref="selectChannels" class="relative">
      <div
        v-if="!selectedChannels.length"
        class="input hover:bg-disabled cursor-pointer"
        @click="selectChannelsVisible = !selectChannelsVisible"
      >
        Выберите каналы
      </div>

      <div
        v-else
        class="input hover:bg-disabled cursor-pointer"
        @click="selectChannelsVisible = !selectChannelsVisible"
      >
        <span v-for="(channel, index) of selectedChannels" :key="index">
          {{ channel.name + " " }}
        </span>
      </div>
      <div
        v-if="selectChannelsVisible"
        class="bg-secondary-bg py-[10px] absolute w-full shadow-md"
      >
        <div
          v-for="(channel, index) of channels"
          :key="index"
          class="flex w-full hover:bg-disabled px-[10px]"
        >
          <input
            :id="channel.url"
            v-model="selectedChannels"
            type="checkbox"
            :value="channel"
            class="mr-[10px]"
          />
          <label :for="channel.url" class="w-full cursor-pointer">
            {{ channel.name }}
          </label>
        </div>
      </div>
    </div>
    <div class="mt-10 flex flex-col gap-y-5">
      <div
        v-for="(channel, index) of selectedChannels"
        :key="index"
        class="border px-[10px] py-[20px]"
      >
        <div class="flex items-center mb-2">
          <img :src="channel.image" class="w-[40px] h-[40px] mr-4" />
          <div class="subheading-1">{{ channel.name }}</div>
        </div>
        <textarea
          v-model="mailingStore.mailingOptions.messages[channel.url]"
          class="input w-full"
          placeholder="Ваше сообщение"
          rows="7"
        />
        <div
          v-if="channel.maxMessageLength"
          class="mb-4 body-text-1 transition"
          :class="{
            'text-danger':
              mailingStore.mailingOptions.messages[channel.url].length >=
              channel.maxMessageLength,
          }"
        >
          Длина сообщения
          {{
            mailingStore.mailingOptions.messages[channel.url].length +
            "/" +
            channel.maxMessageLength
          }}
        </div>
        <template v-if="channel.url != 'sms'">
          <div>
            <input
              :id="channel.url + '-button-style'"
              v-model="
                mailingStore.mailingOptions.buttons[channel.url].inlineStyle
              "
              type="checkbox"
            />
            <label :for="channel.url + '-button-style'">
              Использовать inline-стиль кнопок
            </label>
          </div>
          <div class="flex gap-x-2 gap-y-3 flex-wrap line-clamp-2">
            <div
              v-for="(button, j) of mailingStore.mailingOptions.buttons[
                channel.url
              ].inlineStyle
                ? mailingStore.mailingOptions.buttons[channel.url].inlineButtons
                : mailingStore.mailingOptions.buttons[channel.url]
                    .defaultButtons"
              :key="j"
              class="relative"
              :class="{ 'button-url': button.isUrl, button: !button.isUrl }"
            >
              <div
                class="absolute right-0 top-0 bg-danger px-2 py-1 rounded-xl cursor-pointer"
                @click="
                  deleteButton(
                    button,
                    mailingStore.mailingOptions.buttons[channel.url]
                      .inlineStyle,
                    channel.url,
                  )
                "
              >
                X
              </div>
              {{ button.text }}
            </div>
            <button
              v-if="
                channel.maxButtonsAmount
                  ? mailingStore.mailingOptions.buttons[channel.url].inlineStyle
                    ? mailingStore.mailingOptions.buttons[channel.url]
                        .inlineButtons.length < channel.maxButtonsAmount.inline
                    : mailingStore.mailingOptions.buttons[channel.url]
                        .defaultButtons.length <
                        channel.maxButtonsAmount.default ?? true
                  : true
              "
              class="fast-action-button"
              @click="handleOpenPopup(channel.url)"
            >
              + Кнопка
              {{
                channel.maxButtonsAmount
                  ? mailingStore.mailingOptions.buttons[channel.url].inlineStyle
                    ? mailingStore.mailingOptions.buttons[channel.url]
                        .inlineButtons.length +
                      " / " +
                      channel.maxButtonsAmount.inline
                    : mailingStore.mailingOptions.buttons[channel.url]
                        .defaultButtons.length +
                      " / " +
                      channel.maxButtonsAmount.default
                  : ""
              }}
            </button>
          </div>
        </template>
      </div>
    </div>
    <div class="mt-10 mb-10 flex items-center flex flex-wrap gap-y-3">
      <button class="button-success mr-3" @click="saveOptions">
        Сохранить настройки
      </button>
      <button
        v-if="selectedChannels.length"
        class="button"
        @click="postMessages"
      >
        Отправить сообщения
      </button>

      <div class="ml-10 body-text-1">
        <div v-if="success" class="text-success">
          Сообщение успешно отправлено
        </div>
        <div v-if="error" class="text-danger">Произошла ошибка</div>
      </div>
    </div>
  </div>
  <div
    v-if="popupIsVisible"
    class="w-full h-screen fixed top-0 bg-black/50 flex justify-center items-center"
  >
    <div
      ref="popup"
      class="bg-white text-black rounded-[16px] px-[20px] py-[16px] min-w-[320px] flex flex-col"
    >
      <div class="heading-2 mb-4">Добавление кнопки</div>
      <input
        id="new-button-text"
        v-model="newButton.text"
        class="input mb-2"
        placeholder="Текст кнопки"
      />
      <div
        v-if="max"
        class="mb-4 body-text-1"
        :class="{ 'text-danger': newButton.text.length > max }"
      >
        Длина текста {{ newButton.text.length + "/" + max }}
      </div>
      <div
        v-if="isAddButtonUrlVisible"
        class="flex items-center mb-4 body-text-1"
      >
        <input
          id="new-button-is-url"
          v-model="newButton.isUrl"
          type="checkbox"
          class="mr-2"
        />
        <label for="new-button-is-url">Кнопка ссылка</label>
      </div>
      <input
        v-if="newButton.isUrl"
        v-model="newButton.url"
        class="input mb-4"
        placeholder="Ссылка"
      />
      <button
        class="button"
        :disabled="max ? newButton.text.length > max : false"
        @click="addButton"
      >
        Добавить кнопку
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { channels } from "~/utils/channels";
import { onClickOutside } from "@vueuse/core";
import { ChannelInterface } from "~/types/channel.interface";
import nuxtStorage from "nuxt-storage/nuxt-storage";
import { useMessageStore } from "~/stores/messageStore";
import { definePageMeta } from "#imports";
import { useMailingStore } from "~/stores/mailingStore";
import { ButtonInterface } from "~/types/buttons.interface";
const popup = ref();
const popupIsVisible = ref(false);
const user = nuxtStorage.localStorage.getData("user");
const mailingStore = useMailingStore();
await mailingStore.getMailingOptions(user);
const success = ref(false);
const error = ref(false);
const messageStore = useMessageStore();
const selectChannels = ref();
const selectedChannels = ref<ChannelInterface[]>([]);
const selectChannelsVisible = ref(false);
const newButton = ref({
  messenger: { name: "", url: "", image: "" } as ChannelInterface,
  text: "",
  isUrl: false,
  url: "",
});
const isAddButtonUrlVisible = computed(() => {
  const style = mailingStore.mailingOptions.buttons[
    newButton.value.messenger.url
  ].inlineStyle
    ? "inline"
    : "default";
  const messenger = newButton.value.messenger;
  const isUrlButtonsAllowed = messenger.isButtonUrlAllowed
    ? messenger.isButtonUrlAllowed[style]
    : false;
  const amountIsGood = mailingStore.mailingOptions.buttons[messenger.url]
    .inlineButtons.length
    ? mailingStore.mailingOptions.buttons[messenger.url].inlineButtons.filter(
        (b) => b.isUrl == true,
      ).length < 1
    : true;
  return (
    isUrlButtonsAllowed &&
    (newButton.value.messenger.url == "wa" && style == "inline"
      ? amountIsGood
      : true)
  );
});

const max = computed(() => {
  const channel = channels.find((c) => c.url == newButton.value.messenger.url);
  console.log(
    mailingStore.mailingOptions.buttons[newButton.value.messenger.url],
  );
  return mailingStore.mailingOptions.buttons[newButton.value.messenger.url]
    .inlineStyle
    ? channel?.maxButtonTextLength?.inline
    : channel?.maxButtonTextLength?.default;
});
onClickOutside(selectChannels, () => (selectChannelsVisible.value = false));
onClickOutside(popup, () => (popupIsVisible.value = false));

function handleOpenPopup(messenger: string) {
  popupIsVisible.value = true;
  newButton.value.messenger = channels.find((c) => c.url == messenger) ?? {
    name: "",
    url: "",
    image: "",
  };
  console.log(
    mailingStore.mailingOptions.buttons[newButton.value.messenger.url],
  );
}

async function postMessages() {
  success.value = false;
  error.value = false;
  const p = [];
  console.log(mailingStore.mailingOptions.messages);
  for (const channel of selectedChannels.value) {
    if (
      mailingStore.mailingOptions.messages[channel.url].length &&
      (channel.maxMessageLength
        ? mailingStore.mailingOptions.messages[channel.url].length <=
          channel.maxMessageLength
        : true)
    )
      p.push(
        messageStore.addNewMessage(
          channel.url,
          mailingStore.mailingOptions.messages[channel.url],
          mailingStore.mailingOptions.buttons[channel.url],
        ),
      );
    else {
      error.value = true;
      return;
    }
  }
  try {
    await Promise.all(p);
    success.value = true;
  } catch {
    error.value = true;
  }
}

async function saveOptions() {
  await mailingStore.saveMailingOptions(user);
}

function addButton() {
  const buttons =
    mailingStore.mailingOptions.buttons[newButton.value.messenger.url];
  const nb = {
    text: newButton.value.text,
    isUrl: newButton.value.isUrl,
    url: newButton.value.url,
  } as ButtonInterface;
  buttons.inlineStyle
    ? buttons.inlineButtons.push(nb)
    : buttons.defaultButtons.push(nb);
  newButton.value = {
    messenger: { name: "", url: "", image: "" } as ChannelInterface,
    text: "",
    isUrl: false,
    url: "",
  };
  popupIsVisible.value = false;
}

function deleteButton(
  button: ButtonInterface,
  style: boolean,
  channel: string,
) {
  const buttons =
    style == true
      ? mailingStore.mailingOptions.buttons[channel].inlineButtons
      : mailingStore.mailingOptions.buttons[channel].defaultButtons;
  buttons.splice(
    buttons.findIndex((b) => b == button),
    1,
  );
}

definePageMeta({
  breadcrumb: "Рассылка",
});
</script>

<style scoped></style>
