import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";

test("should render the search with the correctly", () => {
  const onSearch = jest.fn();
  render(
    <>
      <Search
        type="text"
        onSearch={onSearch}
      />
      <Search
        type="text"
        onSearch={onSearch}
        searchButton="Search Something"
      />
    </>
  );
  const inputs = screen.getAllByRole("textbox");
  const buttons = screen.getAllByRole("button");

  expect(inputs).toHaveLength(2);
  expect(buttons).toHaveLength(2);

  expect(buttons[0]).toHaveTextContent("Search");
  expect(buttons[1]).toHaveTextContent("Search Something");
});

test("should call the onSearch function when the button is clicked and input is present", () => {
  const onSearch = jest.fn();
  render(
    <Search
      type="text"
      onSearch={onSearch}
    />
  );
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button");

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  expect(onSearch).not.toHaveBeenCalled();

  button.click();

  expect(onSearch).not.toHaveBeenCalled();

  fireEvent.change(input, { target: { value: "test" } });

  button.click();

  expect(onSearch).toHaveBeenCalled();
});
