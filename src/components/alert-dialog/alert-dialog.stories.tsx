import type { Meta, StoryObj } from "@storybook/react-vite";

import { AlertDialog } from ".";
import { Button } from "../button";

const meta = {
  title: "Alert Dialog",
  component: AlertDialog,
  parameters: { layout: "centered" },
  argTypes: {
    width: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    trigger: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    title: "Are you absolutely sure?",
    description:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    actions: [{ text: "Cancel" }, { text: "Yes, delete account." }],
    width: "md",
    centered: false,
  },
  render: (props) => (
    <AlertDialog
      {...props}
      trigger={
        <Button leftIcon="delete-bin-line" colorway="red_outline">
          Delete acount
        </Button>
      }
    />
  ),
};
