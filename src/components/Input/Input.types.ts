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
};
