import type { Meta, StoryObj } from "@storybook/react-vite";

import { disable } from "~/stories/utils";
import { tokens } from "~/styles/tokens";

import { Tooltip, TooltipProvider } from ".";
import { IconButton } from "../icon-button";
import { View } from "../view";

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

export const Provider: Story = {
  argTypes: {
    ...disable(["message", "trigger", "open", "children"]),
  },
  render: () => (
    <TooltipProvider>
      <View style={{ flexDirection: "row", gap: tokens.space4 }}>
        <Tooltip
          children="Bold"
          trigger={<IconButton icon="bold" alt="Bold" interactive />}
        />
        <Tooltip
          children="Italic"
          trigger={<IconButton icon="italic" alt="Italic" interactive />}
        />
        <Tooltip
          children="Underline"
          trigger={<IconButton icon="underline" alt="Underline" interactive />}
        />
      </View>
    </TooltipProvider>
  ),
};
