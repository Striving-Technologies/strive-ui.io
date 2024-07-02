import { ChangeEvent, ComponentType, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { InputContext } from "./_shared";
import { CurrencyInputProps, InputProps, InputType } from "./Input.types";

export function CurrencyLogic(Input: ComponentType<InputProps>) {
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

    const currencyRegex = new RegExp(
      `[^0-9\\-${thousandSeparator}${decimalSeparator}]*`,
      "g"
    );

    const numberOnlyRegex = new RegExp(`[^0-9]*`, "g");

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
    const formatCurrency = (value: string) => {
      const isNegative = value[0] === "-";
      const decimalLast = value[value.length - 1] === decimalSeparator;

      const [integer, decimal] = value.split(".");

      // Add thousand separator
      const formattedInteger = integer
        .replaceAll(numberOnlyRegex, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
      const formattedDecimal = decimal
        ? decimal.replaceAll(numberOnlyRegex, "")
        : "";

      // Add decimal separator
      const formattedCurrency = `${isNegative ? "-" : ""}${formattedInteger}${
        isNaN(parseInt(formattedDecimal))
          ? `${decimalLast ? decimalSeparator : ""}`
          : `.${formattedDecimal.slice(0, decimalPlaces)}`
      }`;

      return formattedCurrency;
    };

    // Convert the formatted currency to a number
    const convertToNumber = (value: string) => {
      const isNegative = value[0] === "-";
      // Clean up the currency value
      const [integer, decimal] = value
        .replaceAll(thousandSeparator, "")
        .replaceAll(decimalSeparator, ".")
        .split(".");

      const numberValue = parseFloat(
        `${isNegative ? "-" : ""}${integer.replaceAll(numberOnlyRegex, "")}${
          decimal
            ? `.${decimal
                .replaceAll(numberOnlyRegex, "")
                .slice(0, decimalPlaces)}`
            : ""
        }`
      );

      return isNaN(numberValue) ? undefined : numberValue;
    };

    // Handle the currency input
    const handleCurrency = (event: ChangeEvent<HTMLInputElement>) => {
      // Remove all non-numeric characters
      const value = event.target.value.replace(currencyRegex, "");

      // Record the cursor position before and after the change
      const beforeStart = event.target.selectionStart;
      const beforeEnd = event.target.selectionEnd;

      // Convert the formatted currency to a number
      const numberValue = convertToNumber(value);

      // Format the currency value
      const formattedCurrency = value ? formatCurrency(value) : "";

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
          ? convertToNumber(valFormatted) || 0
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
      setValFormatted(`${formatCurrency(`${valueAsNumber}`)}`);

      // Call the onCurrencyChange callback
      onCurrencyChange(valueAsNumber);
    };

    return (
      <>
        <InputContext.Provider
          value={{ isCurrency: true, emitStep: handleStep }}
        >
          <Input
            {...rest}
            {...currencyProps}
          />
        </InputContext.Provider>
      </>
    );
  };

  return CurrencyInput;
}
