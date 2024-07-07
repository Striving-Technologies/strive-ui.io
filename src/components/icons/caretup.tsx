import { IconProps } from "./types";

export const CaretUpIcon = ({ size = "medium" }: IconProps) => (
  <svg
    width="41"
    height="14"
    viewBox="0 0 41 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`stc-icon stc-icon--${size}`}
  >
    <line
      x1="0.5"
      y1="12.8066"
      x2="20.7176"
      y2="1.13398"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="19.5"
      y1="1.13397"
      x2="39.7176"
      y2="12.8066"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
