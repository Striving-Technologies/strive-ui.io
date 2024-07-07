import { InputHTMLAttributes } from "react";
import { DefaultComponentSize } from "../types";

export type InputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "tel"
  | "url"
  | "search";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  type: InputType;
  size?: DefaultComponentSize;
  htmlSize?: number;
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
