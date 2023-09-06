import { ButtonsInterface } from "~/types/buttons.interface";

export interface MessageInterface {
  text: string;
  user: string;
  messenger: string;
  date?: Date;
  buttons?: ButtonsInterface;
}
