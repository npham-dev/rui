import type { Meta, StoryObj } from "@storybook/react-vite";

import { Command } from ".";
import { Button } from "../button";

const meta = {
  title: "Dialog/Command Dialog",
  component: Command,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Command
      trigger={<Button children="Open Command Dialog" />}
      placeholder="Search and run commands."
      {...args}
    >
      <Command.Group heading="Suggestions">
        <Command.Item icon="calendar-line" children="Calendar" shortcut="⌘+C" />
        <Command.Item icon="search-line" children="Search Emoji" />
        <Command.Item icon="calculator-line" children="Calculator" />
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="Settings">
        <Command.Item icon="user-line" children="Profile" />
        <Command.Item icon="mail-line" children="Mail" />
        <Command.Item icon="settings-4-line" children="Settings" />
      </Command.Group>
    </Command>
  ),
};
