export interface IInputNumberProps {
  label: string;
  value?: number;
  setValue: (val: number) => void;
  error?: string;
  text?: string;
  max?: number;
  disabled?: boolean;
}

export interface IInputNumberStates {
  value: number;
}
