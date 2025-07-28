import { ChangeEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { convertToNumber, formatCurrency } from "./_currency";
import { InputContext } from "./_shared";
import Input from "./Input";
import { CurrencyInputProps, InputType } from "./Input.types";

export default function CurrencyInput({
  thousandSeparator = ",",
  decimalSeparator = ".",
  decimalPlaces = 2,
  onCurrencyChange,
  value,
  ...rest
}: CurrencyInputProps) {
  const [valFormatted, setValFormatted] = useState<string | undefined>(
    value !== undefined
      ? formatCurrency(
          `${value}`,
          decimalSeparator,
          thousandSeparator,
          decimalPlaces
        )
      : undefined
  );

  const currencyRegex = new RegExp(
    `[^0-9\\-${thousandSeparator}${decimalSeparator}]*`,
    "g"
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

  // Handle the currency input
  const handleCurrency = (event: ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters
    const value = event.target.value.replace(currencyRegex, "");

    // Record the cursor position before and after the change
    const beforeStart = event.target.selectionStart;
    const beforeEnd = event.target.selectionEnd;

    // Convert the formatted currency to a number
    const numberValue = convertToNumber(
      value,
      decimalSeparator,
      thousandSeparator,
      decimalPlaces
    );

    // Format the currency value
    const formattedCurrency = value
      ? formatCurrency(
          value,
          decimalSeparator,
          thousandSeparator,
          decimalPlaces
        )
      : "";

    // Determine if the number of commas has increased or decreased
    const newNumOfCommas = formattedCurrency.split(",").length - 1;

    // Update the cursor position based on the change in commas
    if (newNumOfCommas > numberOfCommas.current) {
      // If the number of commas has increased, move the cursor to the right
      position.current = {
        beforeStart: (beforeStart || 0) + 1,
        beforeEnd: (beforeEnd || 0) + 1,
      };
    } else if (newNumOfCommas < numberOfCommas.current) {
      // If the number of commas has decreased, move the cursor to the left
      position.current = {
        beforeStart: (beforeStart || 0) - 1,
        beforeEnd: (beforeEnd || 0) - 1,
      };
    } else {
      // If the number of commas has not changed, keep the cursor position
      position.current = {
        beforeStart: beforeStart || 0,
        beforeEnd: beforeEnd || 0,
      };
    }

    // Update the number of commas
    numberOfCommas.current = newNumOfCommas;
    // Update the formatted currency value
    flushSync(() => {
      setValFormatted(formattedCurrency != "" ? `${formattedCurrency}` : "");
    });

    // Set the cursor position after the change
    inputRef.current?.setSelectionRange(
      position.current.beforeStart,
      position.current.beforeEnd
    );

    // Call the onCurrencyChange callback
    onCurrencyChange(numberValue ? numberValue : 0);
  };

  const currencyProps = {
    type: "text" as InputType,
    value: valFormatted,
    onChange: handleCurrency,
    inputRef: inputRef,
  };

  // Handle the step buttons for currency input
  const handleStep = (direction: "up" | "down") => {
    const input = inputRef.current as HTMLInputElement;

    if (!input) return;

    const step = rest.step || 1;

    // Convert the formatted currency to a number
    let valueAsNumber =
      valFormatted && valFormatted != ""
        ? convertToNumber(
            valFormatted,
            decimalSeparator,
            thousandSeparator,
            decimalPlaces
          ) || 0
        : 0;

    // Increment or decrement the value based on the step
    if (direction === "up") {
      valueAsNumber += +step;
    } else if (direction === "down") {
      valueAsNumber -= +step;
    }

    // Check if the value is within the min and max range
    const minimum =
      rest.min !== undefined ? rest.min : Number.NEGATIVE_INFINITY;
    const maximum =
      rest.max !== undefined ? rest.max : Number.POSITIVE_INFINITY;

    // Return if the value is out of range
    if (valueAsNumber < minimum || valueAsNumber > maximum) return;

    // Update the formatted currency value
    setValFormatted(
      `${formatCurrency(
        `${valueAsNumber}`,
        decimalSeparator,
        thousandSeparator,
        decimalPlaces
      )}`
    );

    // Call the onCurrencyChange callback
    onCurrencyChange(valueAsNumber);
  };

  return (
    <>
      <InputContext.Provider value={{ isCurrency: true, emitStep: handleStep }}>
        <Input
          {...rest}
          {...currencyProps}
        />
      </InputContext.Provider>
    </>
  );
}
