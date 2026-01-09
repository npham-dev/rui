import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from ".";

const meta = {
  title: "Input/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    label: "Enable notifications",
  },
  render: (args) => <Checkbox {...args} />,
};
