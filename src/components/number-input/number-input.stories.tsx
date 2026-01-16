import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens } from "~/styles/tokens";

import { NumberInput } from ".";

const meta = {
  title: "Input/Number",
  component: NumberInput,
  parameters: { layout: "centered" },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Amount",
  },
  render: (args) => (
    <NumberInput {...args} style={{ width: tokens.space256 }} />
  ),
};
