import type { Meta, StoryObj } from "@storybook/react-vite";

import { disable } from "~/stories/utils";
import { tokens } from "~/styles/tokens";

import { ThemeProvider } from ".";
import { Button } from "../button";
import { Surface } from "../surface";
import { Text } from "../text";

const meta = {
  title: "Theme Provider",
  component: ThemeProvider,
  parameters: { layout: "centered" },
  argTypes: {
    value: {
      control: "inline-radio",
      options: ["light", "dark"],
    },
    overrideBody: {
      control: "boolean",
    },
    ...disable(["interactive", "loading"]),
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "light",
    defaultValue: "light",
    overrideBody: true,
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <Surface elevated style={{ padding: tokens.space16, gap: tokens.space4 }}>
        <Text>Hello there!</Text>
        <Button interactive="primary_fill" leftIcon="square-line">
          A button
        </Button>
      </Surface>
    </ThemeProvider>
  ),
};
