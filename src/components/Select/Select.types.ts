import { DefaultComponentSize } from "../types";

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: {
    label: string;
    value: string;
  }[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
  size?: DefaultComponentSize;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  searchable?: boolean;
  multiSelect?: boolean;
  allowClear?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}
