import classNames from "classnames";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CurrencyInputProps, InputProps, InputType } from "./Input.types";

const Input = ({
  size,
  className,
  borderless,
  inputRef,
  ...rest
}: InputProps) => {
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
      {...(inputRef ? { ref: inputRef } : {})}
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
        <input
          {...rest}
          {...(inputRef ? { ref: inputRef } : {})}
        />
        {rest.suffix && <p className="stc-input__suffix">{rest.suffix}</p>}
      </div>
    );
  }

  return InputGenerated;
};

const CurrencyInput = ({
  thousandSeparator = ",",
  decimalSeparator = ".",
  decimalPlaces = 2,
  onCurrencyChange,
  ...rest
}: CurrencyInputProps) => {
  const [valFormatted, setValFormatted] = useState<string | undefined>(
    "" as string | undefined
  );

  // Record the position of the cursor before and after the change
  const position = useRef({
    beforeStart: 0,
    beforeEnd: 0,
  });

  // Record the number of commas in the formatted currency
  // to determine the cursor position
  const numberOfCommas = useRef(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Format the currency value
  const formatCurrency = (value: number) => {
    const [integer, decimal] = `${value}`.split(decimalSeparator);

    // Add thousand separator
    const formattedInteger = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator
    );

    // Add decimal separator
    const formattedCurrency = `${formattedInteger}${
      decimal ? decimalSeparator : ""
    }${isNaN(+decimal) ? "" : decimal.slice(0, decimalPlaces)}`;

    return formattedCurrency;
  };

  // Convert the formatted currency to a number
  const convertToNumber = (value: string) => {
    const numberValue = parseFloat(
      value.replaceAll(thousandSeparator || ",", "")
    );

    return isNaN(numberValue) ? undefined : Number(numberValue.toPrecision());
  };

  // Handle the currency input
  const handleCurrency = (event: ChangeEvent<HTMLInputElement>) => {
    // Create a regex to match all non-numeric characters
    const currencyRegex = new RegExp(
      `[^0-9${thousandSeparator}${decimalSeparator}]*`,
      "g"
    );

    // Remove all non-numeric characters
    const value = event.target.value.replace(currencyRegex, "");

    // Record the cursor position before and after the change
    const beforeStart = event.target.selectionStart;
    const beforeEnd = event.target.selectionEnd;

    // Check if the last character is the decimal separator
    const decimalSeparatorLast = value[value.length - 1] === decimalSeparator;

    // Convert the formatted currency to a number
    const numberValue = convertToNumber(value);

    // Format the currency value
    const formattedCurrency = numberValue ? formatCurrency(numberValue) : "";

    // Determine if the number of commas has increased or decreased
    const newNumOfCommas = formattedCurrency.split(",").length - 1;

    // Update the cursor position based on the change in commas
    if (newNumOfCommas > numberOfCommas.current) {
      position.current = {
        beforeStart: (beforeStart || 0) + 1,
        beforeEnd: (beforeEnd || 0) + 1,
      };
    } else if (newNumOfCommas < numberOfCommas.current) {
      position.current = {
        beforeStart: (beforeStart || 0) - 1,
        beforeEnd: (beforeEnd || 0) - 1,
      };
    } else {
      position.current = {
        beforeStart: beforeStart || 0,
        beforeEnd: beforeEnd || 0,
      };
    }

    // Update the number of commas
    numberOfCommas.current = newNumOfCommas;

    // Set the cursor position after the change
    inputRef.current?.setSelectionRange(
      position.current.beforeStart,
      position.current.beforeEnd
    );

    // Update the formatted currency value
    flushSync(() => {
      setValFormatted(
        numberValue
          ? `${formatCurrency(numberValue)}${
              decimalSeparatorLast ? decimalSeparator : ""
            }`
          : ""
      );
    });

    // Call the onCurrencyChange callback
    onCurrencyChange(numberValue ? numberValue : 0);
  };

  const currencyProps = {
    type: "text" as InputType,
    value: valFormatted,
    onChange: handleCurrency,
    inputRef: inputRef,
  };

  return (
    <Input
      {...rest}
      {...currencyProps}
    />
  );
};

Input.Currency = CurrencyInput;

export default Input;
