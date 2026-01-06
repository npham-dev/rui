import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens } from "~/styles/tokens";

import { MultilineInput } from ".";

const meta = {
  title: "Input/Textarea",
  component: MultilineInput,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MultilineInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Hello World",
    disabled: false,
    autosize: true,
  },
  render: (args) => (
    <MultilineInput {...args} style={{ width: tokens.space256 }} />
  ),
};
