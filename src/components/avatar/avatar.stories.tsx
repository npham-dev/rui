import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens, type SizeVariant } from "~/styles/tokens";

import { Avatar } from ".";
import { Surface } from "../surface";
import { Text } from "../text";
import { View } from "../view";

const sizeVariants: SizeVariant[] = ["sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: sizeVariants,
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/146884027?v=4",
    username: "npham-dev",
    size: "md",
  },
  render: (props) => <Avatar {...props} />,
};

export const AllSizes: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/146884027?v=4",
    username: "npham-dev",
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  render: (props) => (
    <Surface
      elevated
      style={{
        flexDirection: "row",
        gap: tokens.space16,
        padding: tokens.space16,
      }}
    >
      {sizeVariants.map((variant) => (
        <View key={variant} style={{ gap: tokens.space2 }}>
          <Text color="dimmest">{variant}</Text>
          <Avatar size={variant} {...props} />
        </View>
      ))}
    </Surface>
  ),
};
