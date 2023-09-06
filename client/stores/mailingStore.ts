import { defineStore } from "pinia";
import { MailingOptionsInterface } from "~/types/mailing-options.interface";

export const useMailingStore = defineStore("mailingStore", () => {
  const mailingOptions = ref<MailingOptionsInterface>({
    buttons: {
      vk: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
      tg: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
      wa: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
      sms: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
    },
    user: "",
    messages: { vk: "", tg: "", wa: "", sms: "" },
  });
  async function getMailingOptions(user: string) {
    mailingOptions.value = (await httpClient.get(`mailing/${user}`)).data ?? {
      buttons: {
        vk: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
        tg: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
        wa: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
        sms: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
      },
      user: "",
      messages: { vk: "", tg: "", wa: "", sms: "" },
    };
  }

  async function saveMailingOptions(user: string) {
    mailingOptions.value.user = user;
    await httpClient.post("mailing", mailingOptions.value);
  }

  return { mailingOptions, getMailingOptions, saveMailingOptions };
});
