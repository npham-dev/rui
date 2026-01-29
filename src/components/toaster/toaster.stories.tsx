import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toaster, useToastManager } from ".";
import { Button } from "../button";

const meta = {
  title: "Toaster",
  component: Toaster,
  parameters: { layout: "centered" },
  argTypes: {
    limit: {
      control: "number",
    },
    timeout: {
      control: "number",
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toaster {...args}>
      <ToastButton />
    </Toaster>
  ),
};

function ToastButton() {
  const toastManager = useToastManager();

  function createToast() {
    toastManager.add({
      title: "Toast created",
      description:
        "This is a toast notification. You got rid of that or something.",
      action: {
        leftIcon: "arrow-go-back-line",
        children: "Undo",
      },
    });
  }

  return (
    <Button interactive onClick={createToast}>
      Create toast
    </Button>
  );
}
