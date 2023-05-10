import type { Meta, StoryObj } from "@storybook/react";

import Modal from "../components/shared/Modal";

const meta: Meta<typeof Modal> = {
  title: "Stories/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Light: Story = {
  args: {
    colorScheme: "light",
    title: "Modal Title",
    body: "Modal Light",
    isOpen: true,
    setIsOpen: () => {},
  },
};

export const Dark: Story = {
  args: {
    colorScheme: "dark",
    title: "Modal Title",
    body: "Modal Dark",
    isOpen: true,
    setIsOpen: () => {},
  },
};
