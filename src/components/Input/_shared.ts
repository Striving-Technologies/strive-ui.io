import { createContext } from "react";

export const InputContext = createContext({
  isCurrency: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitStep: (direction: "up" | "down") => {},
});
