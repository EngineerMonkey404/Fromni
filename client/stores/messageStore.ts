import { defineStore } from "pinia";
import { MessageInterface } from "~/types/message.interface";
import nuxtStorage from "nuxt-storage/nuxt-storage";
import { ButtonsInterface } from "~/types/buttons.interface";

export const useMessageStore = defineStore("messageStore", () => {
  const lastMessages = ref<Map<string, MessageInterface>>(new Map());
  const messages = ref<MessageInterface[]>([]);

  async function getMessages(messenger: string) {
    messages.value = (await httpClient.get(`message/${messenger}`)).data;
  }

  async function getLastMessages() {
    const m = (await httpClient.get("last-messages")).data;
    const no_message = "Сообщений пока нет";
    for (const messenger in m) {
      lastMessages.value.set(
        messenger,
        m[messenger] ?? {
          user: "default",
          text: no_message,
          messenger: messenger,
        },
      );
    }
  }

  async function addNewMessage(
    messenger: string,
    message: string,
    buttons?: ButtonsInterface,
  ) {
    if (message) {
      messages.value.push({
        text: message,
        user: nuxtStorage.localStorage.getData("user") ?? "default_user",
        messenger: messenger,
        buttons: buttons,
      });

      await httpClient.post<MessageInterface>("message", {
        user: nuxtStorage.localStorage.getData("user"),
        text: message,
        messenger: messenger,
        buttons: buttons,
      });
    }
    return;
  }

  socket.on("message", (message: MessageInterface) => {
    if (message.user != nuxtStorage.localStorage.getData("user"))
      messages.value.push(message);
  });

  return {
    getMessages,
    addNewMessage,
    getLastMessages,
    lastMessages,
    messages,
  };
});
