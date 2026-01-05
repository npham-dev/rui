import type { Meta, StoryObj } from "@storybook/react-vite";

import { AllVariants } from "~/stories/all-variants";
import { colorVariants, sizeVariants } from "~/stories/data";
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
      options: sizeVariants,
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
    colorway: "primary_fill",
    leftIcon: "square-line",
  },
  render: (props) => <Button {...props}>Hello World</Button>,
};

export const Link: Story = {
  args: {
    size: "md",
    leftIcon: "external-link-line",
    colorway: "primary_fill",
    interactive: false,
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
    colorway: false,
    leftIcon: "square-line",
  },
  render: (args) => (
    <AllVariants
      variantName="size"
      variants={sizeVariants}
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
    colorway: {
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
      variantName="colorway"
      variants={colorVariants.map((variant) => `primary_${variant}`)}
      element={
        <Button style={{ width: "fit-content" }} {...args}>
          Hello World
        </Button>
      }
    />
  ),
};
