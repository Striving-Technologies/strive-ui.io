import { DefaultComponentSize } from "../types";

export const icons = [
  "caretdown",
  "caretup",
  "check",
  "close",
  "cross",
  "info",
] as const;

export type IconName = (typeof icons)[number];

export interface IconProps {
  name: IconName;
  size?: DefaultComponentSize | number;
  className?: string;
  color?: string;
}
