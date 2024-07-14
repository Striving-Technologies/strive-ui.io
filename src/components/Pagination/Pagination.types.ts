import { ReactNode } from "react";
import { DefaultComponentSize } from "../types";

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onChange: (page: number) => void;
  nextButtonContent?: React.ReactNode;
  previousButtonContent?: React.ReactNode;
  className?: string;
  size?: DefaultComponentSize;
  showTotalItems?:
    | ((totalItems: number) => ReactNode)
    | ((totalItems: number, range: [number, number]) => ReactNode);
  borderless?: boolean;
  showTotalPosition?: "left" | "right";
  disabled?: boolean;
}
