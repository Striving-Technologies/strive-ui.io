import { IconProps } from "./type";

export const CaretDownIcon = ({ size = "medium" }: IconProps) => (
  <svg
    width="41"
    height="14"
    viewBox="0 0 41 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`stc-icon stc-icon--${size}`}
  >
    <line
      y1="-1"
      x2="23.3452"
      y2="-1"
      transform="matrix(0.866025 0.5 0.5 -0.866025 1 0)"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      y1="-1"
      x2="23.3452"
      y2="-1"
      transform="matrix(0.866025 -0.5 -0.5 -0.866025 19 11.6726)"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
