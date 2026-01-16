import type { Meta, StoryObj } from "@storybook/react-vite";

import { surfaceBackgrounds } from "~/stories/data";
import { disable } from "~/stories/utils";

import { Popover } from ".";
import { IconButton } from "../icon-button";

const meta = {
  title: "Popover",
  component: Popover,
  parameters: { layout: "centered" },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
    },
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    background: {
      control: "select",
      options: surfaceBackgrounds,
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    ...disable(["trigger", "children", "className"]),
  },
  args: {
    title: "Notifications",
    description: "You're all caught up!",
    align: "center",
    side: "bottom",
  },
  render: (args) => (
    <Popover
      trigger={
        <IconButton icon="notification-line" alt="Notifications" interactive />
      }
      {...args}
    />
  ),
};

// TODO notifications story (unfortunately we need button group (tabs) b4 we do this)
