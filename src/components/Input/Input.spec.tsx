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
