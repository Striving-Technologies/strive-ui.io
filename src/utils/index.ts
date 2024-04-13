export const generateRandomId = (prefix = "") =>
  `stc-${prefix}${Math.random().toString(36).substr(2, 9)}`;
