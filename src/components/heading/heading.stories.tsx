import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading } from ".";

const meta = {
  title: "Typography/Heading",
  component: Heading,
  parameters: { layout: "centered" },
  argTypes: {
    level: {
      control: "select",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 1,
  },
  render: ({ level }) => (
    <Heading level={level}>Hello World (h{level})</Heading>
  ),
};
