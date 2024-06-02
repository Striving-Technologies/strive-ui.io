import classNames from "classnames";
import {
  ChangeEvent,
  createContext,
  MouseEvent,
  useContext,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { CaretDownIcon } from "../../utils/icons/caretdown";
import { CaretUpIcon } from "../../utils/icons/caretup";
import { CurrencyInputProps, InputProps, InputType } from "./Input.types";

const Input = ({
  size,
  className,
  borderless,
  inputRef,
  ...rest
}: InputProps) => {
  const inputContext = useContext(InputContext);

  const showStepButtons =
    (rest.step && rest.type === "number") ||
    (inputContext.isCurrency && rest.step);

  const generatedClasses = classNames({
    "stc-input": true,
    [`stc-input-size--${size}`]: size !== "medium" && size,
    "stc-input--borderless": borderless,
    "stc-input__wrapper": rest.prefix || rest.suffix || showStepButtons,
  });

  let InputGenerated: JSX.Element = (
    <input
      className={`${generatedClasses}${className ? ` ${className}` : ""}`}
      {...rest}
      {...(inputRef ? { ref: inputRef } : {})}
    />
  );

  if (rest.prefix || rest.suffix || showStepButtons) {
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
        {showStepButtons && <StepButtons />}
        {rest.suffix && <p className="stc-input__suffix">{rest.suffix}</p>}
      </div>
    );
  }

  return InputGenerated;
};

const InputContext = createContext({
  isCurrency: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitStep: (direction: "up" | "down") => {},
});

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
      setValFormatted(
        numberValue
          ? `${formatCurrency(numberValue)}${
              decimalSeparatorLast ? decimalSeparator : ""
            }`
          : ""
      );
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
    let valueAsNumber = valFormatted ? convertToNumber(valFormatted) || 0 : 0;

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
    setValFormatted(`${formatCurrency(valueAsNumber)}`);

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
};

const StepButtons = () => {
  const inputContext = useContext(InputContext);

  // Handle the increment and decrement buttons
  const onIncrementClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const incrementButton = e.currentTarget as HTMLButtonElement;

    const input = incrementButton
      .closest(".stc-input__wrapper")
      ?.querySelector("input") as HTMLInputElement;

    // Return if the input is not found
    if (!input) return;

    if (!inputContext.isCurrency) {
      // Increment the value if the input is not a currency input
      input.stepUp();
    } else {
      // Call the step function for currency input
      inputContext.emitStep("up");
    }
  };

  const onDecrementClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const incrementButton = e.currentTarget as HTMLButtonElement;

    const input = incrementButton
      .closest(".stc-input__wrapper")
      ?.querySelector("input") as HTMLInputElement;

    // Return if the input is not found
    if (!input) return;

    if (!inputContext.isCurrency) {
      // Decrement the value if the input is not a currency input
      input.stepDown();
    } else {
      // Call the step function for currency input
      inputContext.emitStep("down");
    }
  };

  return (
    <div className="stc-input__step-buttons">
      <button
        className="stc-input__step-button"
        onClick={onIncrementClick}
      >
        <CaretUpIcon />
      </button>
      <button
        className="stc-input__step-button"
        onClick={onDecrementClick}
      >
        <CaretDownIcon />
      </button>
    </div>
  );
};

Input.Currency = CurrencyInput;

export default Input;
