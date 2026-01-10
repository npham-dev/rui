import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommandSeparator } from "cmdk";

import { CommandDialog, CommandGroup, CommandItem } from ".";
import { Button } from "../button";

const meta = {
  title: "Dialog/Command Dialog",
  component: CommandDialog,
  parameters: { layout: "centered" },
} satisfies Meta<typeof CommandDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <CommandDialog
      trigger={<Button children="Open Command Dialog" />}
      placeholder="Search and run commands."
      {...args}
    >
      <CommandGroup heading="Suggestions">
        <CommandItem icon="calendar-line" children="Calendar" shortcut="⌘+C" />
        <CommandItem icon="search-line" children="Search Emoji" />
        <CommandItem icon="calculator-line" children="Calculator" />
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem icon="user-line" children="Profile" />
        <CommandItem icon="mail-line" children="Mail" />
        <CommandItem icon="settings-4-line" children="Settings" />
      </CommandGroup>
    </CommandDialog>
  ),
};
