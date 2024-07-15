import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

// Content tests
test("should render the pagination with the correct content", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={() => {}}
    />
  );

  const pagination = screen.getByRole("navigation");
  expect(pagination).toBeInTheDocument();

  const previousButton = screen.getByRole("button", { name: /Previous/i });
  expect(previousButton).toBeInTheDocument();

  const nextButton = screen.getByRole("button", { name: /Next/i });
  expect(nextButton).toBeInTheDocument();

  const pages = screen.getAllByRole("button", { name: /\d+/ });
  expect(pages).toHaveLength(8);
});

test("should render custom content for the previous and next button", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={() => {}}
      previousButtonContent={<span>Test Previous</span>}
      nextButtonContent={<span>Test Next</span>}
    />
  );

  const previousButton = screen.getByRole("button", { name: /Previous/i });
  expect(previousButton).toHaveTextContent("Test Previous");

  const nextButton = screen.getByRole("button", { name: /Next/i });
  expect(nextButton).toHaveTextContent("Test Next");
});

test("should render the pagination with the correct content when borderless is true", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={() => {}}
      borderless
    />
  );

  const previousButton = screen.getByRole("button", { name: /Previous/i });
  expect(previousButton).toHaveClass("stc-button-var--text");

  const nextButton = screen.getByRole("button", { name: /Next/i });
  expect(nextButton).toHaveClass("stc-button-var--text");
});

test("should render the correct number of pages", () => {
  render(
    <Pagination
      totalItems={10}
      itemsPerPage={3}
      currentPage={1}
      onChange={() => {}}
    />
  );

  const pages = screen.getAllByRole("button", { name: /\d+/ });
  expect(pages).toHaveLength(4);
});

test("should render the correct number of pages with siblings", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={5}
      onChange={() => {}}
    />
  );

  const pages = screen.getAllByRole("button", { name: /\d+/ });
  expect(pages).toHaveLength(7);
});

test("should render dots when there are more pages", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={5}
      onChange={() => {}}
    />
  );

  const dots = screen.getAllByText("•••");
  expect(dots).toHaveLength(2);
});

// Action/Logic tests
test("should call the onChange function when a page is clicked", async () => {
  const onChange = jest.fn();
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={5}
      onChange={onChange}
    />
  );

  const page = screen.getByRole("button", { name: /6/i });
  page.click();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(6);
});

test("should disable the next button when on the last page", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={10}
      onChange={() => {}}
    />
  );

  const nextButton = screen.getByRole("button", { name: /Next/i });
  expect(nextButton).toBeDisabled();
});

test("should disable the previous button when on the first page", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={() => {}}
    />
  );

  const previousButton = screen.getByRole("button", { name: /Previous/i });
  expect(previousButton).toBeDisabled();
});

test("should disable all buttons when disabled is true", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={() => {}}
      disabled
    />
  );

  const previousButton = screen.getByRole("button", { name: /Previous/i });
  expect(previousButton).toBeDisabled();

  const nextButton = screen.getByRole("button", { name: /Next/i });
  expect(nextButton).toBeDisabled();

  const pages = screen.getAllByRole("button", { name: /\d+/ });
  pages.forEach((page) => {
    expect(page).toBeDisabled();
  });
});

test("should call the onChange function with the correct page when the next button is clicked", async () => {
  const onChange = jest.fn();
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={onChange}
    />
  );

  const nextButton = screen.getByRole("button", { name: /Next/i });
  nextButton.click();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(2);
});

test("should call the onChange function with the correct page when the previous button is clicked", async () => {
  const onChange = jest.fn();
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={2}
      onChange={onChange}
    />
  );

  const previousButton = screen.getByRole("button", { name: /Previous/i });
  previousButton.click();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(1);
});

test("should not render the total items when showTotalItems is not provided", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={() => {}}
      showTotalItems={undefined}
    />
  );

  const totalItems = screen.queryByText(/100 items/i);
  expect(totalItems).toBeNull();
});

test("should render the total items when showTotalItems is provided", () => {
  render(
    <Pagination
      totalItems={100}
      itemsPerPage={10}
      currentPage={1}
      onChange={() => {}}
      showTotalItems={(totalItems: number) => `${totalItems} items`}
    />
  );

  const totalItems = screen.getByText(/100 items/i);
  expect(totalItems).toBeInTheDocument();
});
