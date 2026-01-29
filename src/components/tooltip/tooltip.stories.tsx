import type { Meta, StoryObj } from "@storybook/react-vite";

import { disable } from "~/stories/utils";

import { Tooltip } from ".";
import { IconButton } from "../icon-button";

const meta = {
  title: "Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  argTypes: {
    children: {
      control: "text",
    },
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
    },
    open: {
      control: "boolean",
    },
    ...disable(["className"]),
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    trigger: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: "Bold",
    align: "center",
    open: true,
  },
  render: (args) => (
    <Tooltip
      trigger={<IconButton icon="bold" alt="Bold" interactive />}
      {...args}
    />
  ),
};
