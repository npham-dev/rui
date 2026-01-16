import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens } from "~/styles/tokens";

import { PasswordInput } from ".";

const meta = {
  title: "Input/Password",
  component: PasswordInput,
  parameters: { layout: "centered" },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Password",
  },
  render: (args) => (
    <PasswordInput {...args} style={{ width: tokens.space256 }} />
  ),
};
