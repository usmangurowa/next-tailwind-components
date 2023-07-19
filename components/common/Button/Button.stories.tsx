// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: "Button",
  // render: () => <Button variant="primary">Hello World</Button>,
  args: {
    variant: "primary",
    mode: "contained",
    disabled: false,
    loading: false,
    rounded: "md",
    size: "md",
    uppercase: false,
    full: false,
    label: "Hello World",
  },
};
