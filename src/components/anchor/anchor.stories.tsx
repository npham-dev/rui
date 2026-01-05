import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens } from "~/styles/tokens";

import { Anchor } from ".";
import { Surface } from "../surface";
import { Text } from "../text";

const meta = {
  title: "Anchor",
  component: Anchor,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Anchor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: "https://npham.dev", external: true },
  render: (props) => (
    <Surface elevated style={{ padding: tokens.space16 }}>
      <Text>
        Visit my amazing <Anchor {...props}>portfolio</Anchor> or perish.
      </Text>
    </Surface>
  ),
};
