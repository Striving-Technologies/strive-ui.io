import { InputHTMLAttributes } from "react";

export type InputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "tel"
  | "url"
  | "search";

export type InputSizeType = "small" | "medium" | "large";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type: InputType;
  size?: InputSizeType;
  borderless?: boolean;
  prefix?: string | JSX.Element;
  suffix?: string | JSX.Element;
  inputRef?: React.RefObject<HTMLInputElement>;
  min?: number;
  max?: number;
};

export type CurrencyInputProps = Omit<
  InputProps,
  "onChange" | "value" | "type"
> & {
  onCurrencyChange: (value: number) => void;
  thousandSeparator?: string;
  decimalSeparator?: string;
  decimalPlaces?: number;
};
