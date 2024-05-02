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
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Text: Story = {
  args: {
    type: "text",
    placeholder: "type something",
  },
} satisfies Story;
