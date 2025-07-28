import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../components/Icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["caretdown", "caretup", "close", "cross", "info", "check"],
      description: "Icon name to render",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", 16, 24, 32, 48],
      description: "Size of the icon (predefined or custom number)",
    },
    color: {
      control: "color",
      description: "Color of the icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "check",
  },
};

export const Small: Story = {
  args: {
    name: "check",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    name: "check",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    name: "check",
    size: "large",
  },
};

export const CustomSize: Story = {
  args: {
    name: "check",
    size: 48,
  },
  parameters: {
    docs: {
      description: {
        story: "Icons can accept custom numeric sizes for specific use cases.",
      },
    },
  },
};

export const WithColor: Story = {
  args: {
    name: "info",
    color: "#007bff",
  },
};
