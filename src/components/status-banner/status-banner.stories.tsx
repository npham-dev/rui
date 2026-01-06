import type { Meta, StoryObj } from "@storybook/react-vite";

import { colors } from "~/stories/data";

import { StatusBanner } from ".";
import { View } from "../view";

const meta = {
  title: "Block/Status Banner",
  component: StatusBanner,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"],
    },
    color: {
      control: "select",
      options: colors,
    },
  },
} satisfies Meta<typeof StatusBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "alarm-warning-line",
    title: "This plan has been deprecated.",
    description:
      "You can continue to use these organizations, but if you want to add users, you’ll have to update to a current plan.",
    size: "lg",
    color: "warning",
  },
  render: (args) => {
    return (
      <View style={{ width: "512px" }}>
        <StatusBanner {...args} />
      </View>
    );
  },
};
