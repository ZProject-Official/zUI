export interface inputProps {
  type: string;
  name: string;
  description: string;
  defaultValue: string;
  format: string;
  isRequired: boolean;
  minLength: number;
  maxLength: number;
}

export interface ModalThemeProps {
  backgroundColor: string;
  inputColor: string;
  inputTextColor: string;
  color: string;
  borderRadius: number;
  animations: {
    entry: string;
    exit: string;
  };
  fonts: {
    title: string;
    names: string;
    descriptions: string;
    inputsContent: string;
  };
}

export interface AnimationsProps {
  entry: string;
  exit: string;
}
