export interface ButtonsInterface {
  inlineStyle: boolean;
  inlineButtons: ButtonInterface[];
  defaultButtons: ButtonInterface[];
}

export interface ButtonInterface {
  isUrl: boolean;
  text: string;
  url?: string;
}
