import type { Meta, StoryObj } from "@storybook/react-vite";
import { tokens, type SizeVariant } from "~/styles/tokens";

import { Button } from ".";
import { Icon } from "../icon";
import { Text } from "../text";
import { View } from "../view";

const sizeVariants: SizeVariant[] = ["sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => (
    <Button
      {...props}
      colorway="primary_fill"
      iconLeft={<Icon name="square-line" />}
    >
      Hello World
    </Button>
  ),
};

export const Link: Story = {
  render: (props) => (
    <Button
      {...props}
      colorway="primary_fill"
      iconLeft={<Icon name="external-link-line" />}
      render={<a href="https://natmfat.com" target="_blank" rel="noreferrer" />}
      nativeButton={false}
    >
      Open Website
    </Button>
  ),
};

export const AllSizes: Story = {
  render: (props) => (
    <View style={{ gap: tokens.space16 }}>
      {sizeVariants.map((variant) => (
        <View key={variant} style={{ gap: tokens.space2 }}>
          <Text color="dimmest">{variant}</Text>
          <Button
            style={{ width: "fit-content" }}
            {...props}
            interactive="fill"
            size={variant}
            iconLeft={<Icon name="square-line" />}
          >
            Hello World
          </Button>
        </View>
      ))}
    </View>
  ),
};
