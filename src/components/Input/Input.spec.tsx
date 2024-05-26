import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";

test("should render the input with the correctly", () => {
  const onChange = jest.fn();
  render(
    <>
      <Input
        type="text"
        placeholder="Enter something..."
        onChange={onChange}
      />
    </>
  );
  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();

  expect(input).toHaveAttribute("type", "text");

  expect(input).toHaveAttribute("placeholder", "Enter something...");
});

test("should call the onChange function when the input is changed", () => {
  const onChange = jest.fn();
  render(
    <Input
      type="text"
      placeholder="Enter something..."
      onChange={onChange}
    />
  );
  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();

  expect(onChange).not.toHaveBeenCalled();

  fireEvent.change(input, { target: { value: "test" } });

  expect(onChange).toHaveBeenCalled();
});

test("should render prefix and suffix elements", () => {
  render(
    <Input
      type="text"
      placeholder="Enter something..."
      prefix="$"
      suffix="kg"
    />
  );

  const prefix = screen.getByText("$");
  const suffix = screen.getByText("kg");

  expect(prefix).toBeInTheDocument();
  expect(suffix).toBeInTheDocument();
});

test("should focus the input when the prefix or suffix is clicked", () => {
  render(
    <Input
      type="text"
      placeholder="Enter something..."
      prefix="$"
      suffix="kg"
    />
  );

  const input = screen.getByRole("textbox");
  const prefix = screen.getByText("$");
  const suffix = screen.getByText("kg");

  expect(input).not.toHaveFocus();

  fireEvent.click(prefix);

  expect(input).toHaveFocus();

  fireEvent.click(suffix);

  expect(input).toHaveFocus();
});

// test currency input
test("should render currency format correctly and return number value on change", () => {
  const onChange = jest.fn();

  render(
    <Input.Currency
      type="text"
      placeholder="Enter something..."
      onCurrencyChange={onChange}
    />
  );

  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();

  expect(onChange).not.toHaveBeenCalled();

  fireEvent.change(input, { target: { value: "1,000" } });

  expect(onChange).toHaveBeenCalledWith(1000);

  fireEvent.change(input, { target: { value: "1,000,000" } });

  expect(onChange).toHaveBeenCalledWith(1000000);

  fireEvent.change(input, { target: { value: "1,000.00" } });

  expect(onChange).toHaveBeenCalledWith(1000);

  fireEvent.change(input, { target: { value: "1,000.23" } });

  expect(onChange).toHaveBeenCalledWith(1000.23);

  fireEvent.change(input, { target: { value: "1,000,000.23" } });

  expect(onChange).toHaveBeenCalledWith(1000000.23);
});
