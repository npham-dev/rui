import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens } from "~/styles/tokens";

import { Select } from ".";

const meta = {
  title: "Input/Select",
  component: Select,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = {
  cpp: "C++",
  python: "Python",
  javascript: "JavaScript",
  ruby: "Ruby",
};

export const Default: Story = {
  args: {},
  render: (args) => (
    <Select
      {...args}
      style={{ width: tokens.space256 }}
      placeholder="Select language"
      items={items}
    />
  ),
};

export const SelectMultiple: Story = {
  args: {
    placeholder: "Select languages...",
  },
  render: (args) => (
    <Select
      style={{ width: tokens.space256 }}
      multiple
      defaultValue={["javascript"]}
      items={items}
      {...args}
    />
  ),
};
