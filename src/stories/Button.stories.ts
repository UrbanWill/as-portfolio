import type { Meta, StoryObj } from "@storybook/react";

import Button from "../components/shared/Button";

const meta: Meta<typeof Button> = {
  title: "Stories/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    colorScheme: "primary",
    label: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    colorScheme: "secondary",
    label: "Secondary",
  },
};
