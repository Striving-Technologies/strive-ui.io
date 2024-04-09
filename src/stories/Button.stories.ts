import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../components/Button";
import { InfoIcon } from "../utils/icons/info";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      description: "Button content. This can be text or a Node",
      defaultValue: "Click me",
      options: ["ReactNode"],
    },
    variant: {
      control: "text",
      description: "Button variant. This can be:",
      options: ["primary", "dashed", "link", "text"],
    },
    shape: {
      control: "text",
      description: "Button shape. This can be:",
      options: ["circle", "pill"],
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    danger: {
      control: "boolean",
      description: "Whether the button is in a dangerous state",
    },
    loading: {
      control: "boolean",
      description:
        "Whether the button is in a loading state. This also disables the default onClick handler",
      defaultValue: false,
    },
    loadingIcon: {
      control: "text",
      description:
        "The icon to be shown when the button is in a loading state. A default spinner is used if this is not provided",
      options: ["ReactNode"],
    },
    loadingIconPosition: {
      control: "radio",
      description: "The position of the loading icon. This can be:",
      options: ["left", "right"],
    },
    loadingIconProps: {
      control: "object",
      description:
        "These are the props for the loading icon. These are only applied if the default loading icon is used. Checkout SpinnerProps",
    },
    size: {
      control: "radio",
      description: "The size of the button. This can be:",
      options: ["small", "medium", "large"],
    },
    href: {
      control: "text",
      description:
        "The href for the button. If this is provided, the button will be wrapped with an <a> tag",
    },
    anchorProps: {
      control: "object",
      description:
        "Additional AnchorHTML props to be passed to the <a> tag if the href prop is provided",
    },
    borderless: {
      control: "boolean",
      description: "Whether the button has a border",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
} satisfies Story;

export const Dashed: Story = {
  args: {
    variant: "dashed",
    children: "Dashed Button",
  },
} satisfies Story;

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
} satisfies Story;

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
} satisfies Story;

export const Circle: Story = {
  args: {
    shape: "circle",
    children: "C",
  },
} satisfies Story;

export const Pill: Story = {
  args: {
    shape: "pill",
    children: "Pill Button",
  },
} satisfies Story;

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
} satisfies Story;

export const Small: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
} satisfies Story;

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disable Button",
  },
} satisfies Story;

export const Anchor: Story = {
  args: {
    href: "https://www.example.org",
    variant: "link",
    anchorProps: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
    children: "Link Button with href",
  },
} satisfies Story;

export const Loading: Story = {
  args: {
    loading: true,
    loadingIconPosition: "right",
    children: "Loading Button",
  },
} satisfies Story;

export const Icon: Story = {
  args: {
    icon: InfoIcon({ size: "medium" }),
    children: "Button with Icon",
  },
} satisfies Story;
