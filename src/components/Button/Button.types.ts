import { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { SpinnerProps } from "../Spinner";

export type ButtonLoadingIconPositionType = "left" | "right";
export type ButtonSizeType = "small" | "medium" | "large";
export type ButtonVariantType = "primary" | "dashed" | "link" | "text";
export type ButtonShapeType = "circle" | "round";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariantType;
  shape?: ButtonShapeType;
  disabled?: boolean;
  danger?: boolean;
  loading?: boolean;
  loadingIcon?: ReactNode;
  loadingIconPosition?: ButtonLoadingIconPositionType;
  loadingIconProps?: SpinnerProps;
  size?: ButtonSizeType;
  href?: string;
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}
