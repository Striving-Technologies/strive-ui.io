import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../components/Input";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      description: "Input type.",
      options: ["text", "number", "password", "email", "tel", "url"],
      defaultValue: "text",
    },
    value: {
      control: "text",
      description: "Input value",
    },
    placeholder: {
      control: "text",
      description: "Input placeholder",
      defaultValue: "Placeholder",
    },
    size: {
      control: "radio",
      description: "Input size.",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
    },
    borderless: {
      control: "boolean",
      description: "Remove border from input",
    },
    prefix: {
      control: "text",
      description: "Prefix element for input",
    },
    suffix: {
      control: "text",
      description: "Suffix element for input",
    },
    step: {
      control: "number",
      description: "Step value for number input",
    },
    max: {
      control: "number",
      description: "Maximum value for number input",
    },
    min: {
      control: "number",
      description: "Minimum value for number input",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;
type CurrencyStory = StoryObj<typeof Input.Currency>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Text: Story = {
  args: {
    type: "text",
    placeholder: "type something",
  },
} satisfies Story;

export const Currency: CurrencyStory = {
  args: {
    // value: 1000,
    placeholder: "Enter amount",
  },
  argTypes: {
    thousandSeparator: {
      control: "text",
      description: "Character to use as thousand separator",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "," },
      },
    },
    decimalSeparator: {
      control: "text",
      description: "Character to use as decimal separator",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "." },
      },
    },
    decimalPlaces: {
      control: "number",
      description: "Number of decimal places",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: 2 },
      },
    },
  },
  render: function CurrentInput(args) {
    const [, setArgs] = useArgs();

    const onValueChange = (value: number) => {
      // Update the arg in Storybook
      setArgs({ value });
    };

    return Input.Currency({ ...args, onCurrencyChange: onValueChange });
  },
} satisfies CurrencyStory;
