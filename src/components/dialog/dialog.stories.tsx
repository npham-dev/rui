import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dialog } from ".";
import { Button } from "../button";

const meta = {
  title: "Dialog/Standard Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "On color",
    description:
      "Lots of different, solid, highly saturated colors all over the UI. This makes it hard to tell what's important, and means users will be easily distracted.",
  },
  render: (args) => (
    <Dialog
      closable
      trigger={<Button leftIcon="palette-line" children="Open Dialog" />}
      {...args}
    />
  ),
};
