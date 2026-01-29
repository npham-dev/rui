import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens } from "~/styles/tokens";

import { RadioGroup } from ".";

const meta = {
  title: "Input/Radio",
  component: RadioGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
  },
  render: (args) => (
    <RadioGroup style={{ width: tokens.space256 }} {...args}>
      <RadioGroup.Item value="public" label="Public" />
      <RadioGroup.Item value="private" label="Private" />
    </RadioGroup>
  ),
};
