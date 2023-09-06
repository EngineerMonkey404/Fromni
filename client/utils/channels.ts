import { ChannelInterface } from "~/types/channel.interface";

export const channels: ChannelInterface[] = [
  {
    name: "Вконтакте",
    url: "vk",
    image: "/logos/vk.svg",
    maxMessageLength: 4096,
    maxButtonsAmount: { default: 40, inline: 10 },
    isButtonUrlAllowed: { default: true, inline: true },
  },
  {
    name: "Telegram",
    image: "/logos/tg.svg",
    url: "tg",
    maxMessageLength: 4096,
    maxButtonTextLength: { inline: 64 },
    isButtonUrlAllowed: { default: false, inline: true },
  },
  {
    name: "WhatsApp",
    image: "/logos/wa.svg",
    url: "wa",
    maxMessageLength: 1000,
    maxButtonsAmount: { default: 10, inline: 3 },
    isButtonUrlAllowed: { default: false, inline: true },
    maxButtonTextLength: { default: 20, inline: 20 },
  },
  {
    name: "SMS",
    image: "/logos/sms.svg",
    url: "sms",
  },
];
