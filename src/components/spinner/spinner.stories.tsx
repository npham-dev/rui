import type { Meta, StoryObj } from "@storybook/react-vite";

import { Spinner } from ".";

const meta = {
  title: "Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Spinner {...args} />,
};
