import type { Meta, StoryObj } from "@storybook/react-vite";

import { ToastProvider, ToastViewport, useToastManager } from ".";
import { Button } from "../button";

const meta = {
  title: "Toast",
  component: ToastProvider,
  parameters: { layout: "centered" },
  argTypes: {
    limit: {
      control: "number",
    },
    timeout: {
      control: "number",
    },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    timeout: 100000,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastButton />
      <ToastViewport />
    </ToastProvider>
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
