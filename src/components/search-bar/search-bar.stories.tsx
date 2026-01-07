import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { tokens } from "~/styles/tokens";

import { SearchBar } from ".";

const meta = {
  title: "Search Bar",
  component: SearchBar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    loading: false,
    placeholder: "Search & run commands.",
  },
  render: (args) => {
    // eslint-disable-next-line -- this is okay in storybook
    const [value, setValue] = useState("");
    return (
      <SearchBar
        style={{ width: tokens.space256 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        {...args}
      />
    );
  },
};
