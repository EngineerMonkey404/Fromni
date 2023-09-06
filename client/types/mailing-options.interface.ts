import { ButtonsInterface } from "./buttons.interface";

export interface MailingOptionsInterface {
  buttons: Record<string, ButtonsInterface>;
  user: string;
  messages: Record<string, string>;
}
