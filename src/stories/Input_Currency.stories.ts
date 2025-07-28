import type { Meta, StoryObj } from "@storybook/react";

import { CurrencyInput } from "../components/Input";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Input - Currency",
  component: CurrencyInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "input"],
  argTypes: {
    value: {
      control: "number",
      description: "Input value as a number",
    },
    onCurrencyChange: {
      action: "onCurrencyChange",
      description: "Callback when currency value changes",
      defaultValue: "(value: number | undefined) => ",
      control: {
        type: "function",
      },
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
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof CurrencyInput>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Currency: Story = {
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
} satisfies Story;
