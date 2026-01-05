import type { Meta, StoryObj } from "@storybook/react-vite";

import { AllVariants } from "~/stories/components/all-variants";
import { sizes } from "~/stories/data";
import { tokens } from "~/styles/tokens";

import { Text } from ".";
import { Surface } from "../surface";
import { View } from "../view";

const meta = {
  title: "Typography/Text",
  component: Text,
  parameters: { layout: "centered" },
  argTypes: {
    color: {
      control: "select",
      options: ["inherit", "default", "dimmer", "dimmest"],
    },
    size: {
      control: "select",
      options: sizes,
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
    <Surface style={{ width: "512px", padding: tokens.space16 }} elevated>
      <Text {...props}>
        The quick brown fox jumps over the lazy dog. Swiftly, it leaped across
        the murmuring stream, its bushy tail a blur of motion. The old badger,
        observing from its cozy burrow, merely yawned, accustomed to such
        energetic displays. A curious squirrel chattered from a nearby oak,
        dropping an acorn in surprise.
      </Text>
    </Surface>
  ),
};

export const AllSizes: Story = {
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    color: "default",
  },
  render: (args) => (
    <AllVariants
      variantName="size"
      variants={sizes}
      element={
        <Text {...args}>The quick brown fox jumps over the lazy dog.</Text>
      }
    />
  ),
};

export const Multiline: Story = {
  argTypes: {
    maxLines: {
      table: {
        disable: true,
      },
    },
    multiline: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    color: "default",
    size: "md",
  },
  render: (args) => (
    <View style={{ maxWidth: tokens.space256 }}>
      <Text multiline {...args}>
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
