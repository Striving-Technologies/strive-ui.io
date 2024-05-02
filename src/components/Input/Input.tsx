import classNames from "classnames";
import { MouseEvent } from "react";
import { InputProps } from "./Input.types";

const Input = ({ size, className, borderless, ...rest }: InputProps) => {
  const generatedClasses = classNames({
    "stc-input": true,
    [`stc-input-size--${size}`]: size !== "medium" && size,
    "stc-input--borderless": borderless,
    "stc-input__wrapper": rest.prefix || rest.suffix,
  });

  let InputGenerated: JSX.Element = (
    <input
      className={`${generatedClasses}${className ? ` ${className}` : ""}`}
      {...rest}
    />
  );

  if (rest.prefix || rest.suffix) {
    const moveFocus = (e: MouseEvent<HTMLDivElement>) => {
      if (window.getSelection()?.toString() !== "") {
        return;
      }

      const target = e.currentTarget as HTMLInputElement;
      const input = target.querySelector("input") as HTMLElement;
      input.focus();
    };

    InputGenerated = (
      <div
        className={`${generatedClasses}${className ? ` ${className}` : ""}`}
        onClick={moveFocus}
      >
        {rest.prefix && <p className="stc-input__prefix">{rest.prefix}</p>}
        <input {...rest} />
        {rest.suffix && <p className="stc-input__suffix">{rest.suffix}</p>}
      </div>
    );
  }

  return InputGenerated;
};

export default Input;
