import { ButtonsInterface } from './buttons.interface';

export interface MessageInterface {
  text: string;
  user: string;
  messenger: string;
  buttons?: ButtonsInterface[];
  date?: Date;
}
