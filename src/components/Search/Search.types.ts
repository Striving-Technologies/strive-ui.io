import { InputProps } from "../Input";

export type SearchProps = Omit<InputProps, "borderless"> & {
  onSearch: (value: string) => void;
  searchButton?: React.ReactNode;
  isPrimary?: boolean;
  noDivider?: boolean;
};
