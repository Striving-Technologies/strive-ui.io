import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

test("should render the button with the correct content", () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole("button", { name: /Click me/i });
  expect(button).toBeInTheDocument();
});

test("should call the onClick function when clicked", async () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Click me</Button>);
  const button = screen.getByRole("button", { name: /Click me/i });
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("should render a disabled button when disabled prop is true", async () => {
  const { container } = render(<Button disabled>Click me</Button>);
  const button = container.getElementsByTagName("button")[0];
  expect(button.disabled).toBe(true);
});

test("should not call the onClick function when disabled", async () => {
  const onClick = jest.fn();
  render(
    <Button
      onClick={onClick}
      disabled
    >
      Click me
    </Button>
  );
  const button = screen.getByRole("button", { name: /Click me/i });
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(0);
});

test("should render a loading spinner when loading", async () => {
  const { container } = render(<Button loading>Click me</Button>);
  const spinner = container.getElementsByClassName("stc-button__loader")[0];
  expect(spinner).toBeInTheDocument();
});

test("should render custom loading icon with correct position when custom icon is passed", async () => {
  const { container } = render(
    <Button
      loading
      loadingIcon={<span className="icon" />}
    >
      Click me
    </Button>
  );
  const icon = container.getElementsByClassName("icon")[0];
  expect(icon).toBeInTheDocument();
  const button = container.getElementsByClassName(
    "stc-button__loader--left"
  )[0];
  expect(button).toBeInTheDocument();

  const { container: container2 } = render(
    <Button
      loading
      loadingIcon={<span className="icon" />}
      loadingIconPosition="right"
    >
      Click me
    </Button>
  );
  const icon2 = container2.getElementsByClassName("icon")[0];
  expect(icon2).toBeInTheDocument();
});

test("should render custom icon correctly in the right position", async () => {
  const { container } = render(
    <Button icon={<span className="icon" />}>Click me</Button>
  );
  const icon = container.getElementsByClassName("icon")[0];
  expect(icon).toBeInTheDocument();
  const button = container.getElementsByClassName("stc-button__icon--left")[0];
  expect(button).toBeInTheDocument();

  const { container: container2 } = render(
    <Button
      icon={<span className="icon" />}
      iconPosition="right"
    >
      Click me
    </Button>
  );
  const icon2 = container2.getElementsByClassName("icon")[0];
  expect(icon2).toBeInTheDocument();
  const button2 = container2.getElementsByClassName(
    "stc-button__icon--right"
  )[0];
  expect(button2).toBeInTheDocument();
});

test("should render a danger button when danger prop is true", async () => {
  const { container } = render(<Button danger>Click me</Button>);
  const button = container.getElementsByClassName("stc-button--danger")[0];
  expect(button).toBeInTheDocument();
});

test("should render a button with the correct size", async () => {
  const { container } = render(<Button size="small">Click me</Button>);
  const button = container.getElementsByClassName("stc-button-size--small")[0];
  expect(button).toBeInTheDocument();

  const { container: container2 } = render(
    <Button size="large">Click me</Button>
  );
  const button2 = container2.getElementsByClassName(
    "stc-button-size--large"
  )[0];
  expect(button2).toBeInTheDocument();
});

test("should render a button with the correct shape", async () => {
  const { container } = render(<Button shape="pill">Click me</Button>);
  const button = container.getElementsByClassName("stc-button-shape--pill")[0];
  expect(button).toBeInTheDocument();

  const { container: container2 } = render(
    <Button shape="circle">Click me</Button>
  );
  const button2 = container2.getElementsByClassName(
    "stc-button-shape--circle"
  )[0];
  expect(button2).toBeInTheDocument();
});

test("should render a button with the correct variant", async () => {
  const { container } = render(<Button variant="primary">Click me</Button>);
  const button = container.getElementsByClassName("stc-button-var--primary")[0];
  expect(button).toBeInTheDocument();

  const { container: container2 } = render(
    <Button variant="dashed">Click me</Button>
  );
  const button2 = container2.getElementsByClassName(
    "stc-button-var--dashed"
  )[0];
  expect(button2).toBeInTheDocument();

  const { container: container3 } = render(
    <Button variant="text">Click me</Button>
  );
  const button3 = container3.getElementsByClassName("stc-button-var--text")[0];
  expect(button3).toBeInTheDocument();

  const { container: container4 } = render(
    <Button variant="link">Click me</Button>
  );
  const button4 = container4.getElementsByClassName("stc-button-var--link")[0];
  expect(button4).toBeInTheDocument();
});
