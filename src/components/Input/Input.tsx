import classNames from "classnames";
import { InputProps } from "./Input.types";

const Input = ({ size, className, borderless, ...rest }: InputProps) => {
  const generatedClasses = classNames({
    "stc-input": true,
    [`stc-input-size--${size}`]: size !== "medium" && size,
    "stc-input--borderless": borderless,
  });

  const InputGenerated = (
    <input
      className={`${generatedClasses}${className ? ` ${className}` : ""}`}
      {...rest}
    />
  );

  return InputGenerated;
};

export default Input;
