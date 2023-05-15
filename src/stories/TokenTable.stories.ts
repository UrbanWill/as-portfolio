import type { Meta, StoryObj } from "@storybook/react";

import TokenTable from "../components/TokenTable";

const meta: Meta<typeof TokenTable> = {
  title: "Stories/TokenTable",
  component: TokenTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TokenTable>;

const mockedData = Array(15).fill({
  tokenName: "Token Name",
  tokenBalance: "1337",
});

export const Loaded: Story = {
  args: {
    isLoading: false,
    data: mockedData,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    data: [],
  },
};
