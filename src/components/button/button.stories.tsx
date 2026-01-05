import type { Meta, StoryObj } from "@storybook/react-vite";

import { AllVariants } from "~/stories/components/all-variants";
import { colorVariants, sizes } from "~/stories/data";
import { tokens } from "~/styles/tokens";

import { Button } from ".";
import { Surface } from "../surface";
import { Text } from "../text";
import { View } from "../view";

const meta = {
  title: "Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    loading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    interactive: "primary_fill",
    leftIcon: "square-line",
  },
  render: (props) => <Button {...props}>Hello World</Button>,
};

export const Link: Story = {
  args: {
    size: "md",
    leftIcon: "external-link-line",
    interactive: "primary_fill",
    loading: false,
  },
  render: (args) => (
    <Button
      {...args}
      render={<a href="https://natmfat.com" target="_blank" rel="noreferrer" />}
      nativeButton={false}
    >
      Open Website
    </Button>
  ),
};

export const AllSizes: Story = {
  args: {
    interactive: "fill",
    leftIcon: "square-line",
  },
  render: (args) => (
    <AllVariants
      variantName="size"
      variants={sizes}
      element={
        <Button style={{ width: "fit-content" }} {...args}>
          Hello World
        </Button>
      }
    />
  ),
};

<Surface elevated style={{ gap: tokens.space16, padding: tokens.space16 }}>
  {colorVariants.map((variant) => (
    <View key={variant} style={{ gap: tokens.space2 }}>
      <Text color="dimmest">{variant}</Text>
    </View>
  ))}
</Surface>;

export const AllPrimaryVariants: Story = {
  argTypes: {
    interactive: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    size: "md",
    leftIcon: "square-line",
    loading: false,
  },
  render: (args) => (
    <AllVariants
      variantName="interactive"
      variants={colorVariants.map((variant) => `primary_${variant}`)}
      element={
        <Button style={{ width: "fit-content" }} {...args}>
          Hello World
        </Button>
      }
    />
  ),
};
