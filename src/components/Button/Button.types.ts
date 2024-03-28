import { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { SpinnerProps } from "../Spinner";

export type ButtonIconPositionType = "left" | "right";
export type ButtonSizeType = "small" | "medium" | "large";
export type ButtonVariantType = "primary" | "dashed" | "link" | "text";
export type ButtonShapeType = "circle" | "pill";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariantType;
  shape?: ButtonShapeType;
  disabled?: boolean;
  danger?: boolean;
  icon?: ReactNode;
  iconPosition?: ButtonIconPositionType;
  loading?: boolean;
  loadingIcon?: ReactNode;
  loadingIconPosition?: ButtonIconPositionType;
  loadingIconProps?: SpinnerProps;
  size?: ButtonSizeType;
  href?: string;
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}
