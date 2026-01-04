import type { Meta, StoryObj } from "@storybook/react-vite";
import { tokens, type SizeVariant } from "~/styles/tokens";

import { Text } from ".";
import { Surface } from "../surface";
import { View } from "../view";

const sizeVariants: SizeVariant[] = ["sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "Text",
  component: Text,
  parameters: { layout: "centered" },
  argTypes: {
    color: {
      control: "select",
      options: ["inherit", "default", "dimmer", "dimmest"],
    },
    size: {
      control: "select",
      options: sizeVariants,
    },
    maxLines: {
      control: "number",
    },
    multiline: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    color: "default",
  },
  render: (props) => (
    <Surface style={{ width: "512px", padding: tokens.space8 }} elevated>
      <Text {...props}>The quick brown fox jumps over the lazy dog.</Text>
    </Surface>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: tokens.space16 }}>
      {sizeVariants.map((variant) => (
        <View key={variant}>
          <Text color="dimmest">{variant}</Text>
          <Text size={variant}>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </View>
      ))}
    </View>
  ),
};

export const Multiline: Story = {
  render: () => (
    <View style={{ maxWidth: tokens.space256 }}>
      <Text multiline>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </View>
  ),
};
