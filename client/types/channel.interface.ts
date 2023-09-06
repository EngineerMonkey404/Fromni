export interface ChannelInterface {
  name: string;
  url: string;
  image: string;
  maxMessageLength?: number;
  maxButtonsAmount?: { inline?: number; default?: number };
  maxButtonTextLength?: { inline?: number; default?: number };
  isButtonUrlAllowed?: { inline?: boolean; default?: boolean };
}
