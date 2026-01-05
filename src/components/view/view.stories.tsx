import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  colorway,
  interactiveStyles,
  surfaceBackgrounds,
} from "~/stories/data";

import { View, type ViewProps } from ".";
import { tokens } from "../../styles/tokens";
import { Surface } from "../surface";
import { Text } from "../text";

const meta = {
  title: "View",
  component: View,
  parameters: { layout: "centered" },
  argTypes: {
    interactive: {
      control: "select",
      options: [...interactiveStyles, ...colorway],
    },
    loading: {
      control: "boolean",
    },
    "data-disabled": {
      control: "boolean",
    },
  },
} satisfies Meta<ViewProps & { "data-disabled"?: boolean }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    interactive: "fill",
    loading: false,
  },
  render: (args) => (
    <View
      {...args}
      style={{
        paddingInline: tokens.space16,
        height: tokens.space32,
        justifyContent: "center",
      }}
    >
      Hello world
    </View>
  ),
};

export const Colorway: Story = {
  args: {
    interactive: "primary_fill",
    loading: false,
  },
  argTypes: {
    interactive: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <View
      {...args}
      style={{
        paddingInline: tokens.space16,
        height: tokens.space32,
        justifyContent: "center",
      }}
    >
      Hello world
    </View>
  ),
};

export const AllInteractiveStyles: Story = {
  argTypes: {
    interactive: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    loading: false,
  },
  render: (args) => (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: tokens.space8,
      }}
    >
      {surfaceBackgrounds.map((background) => (
        <Surface
          style={{
            border: `1px solid ${tokens.outlineDimmest}`,
            padding: tokens.space16,
            width: tokens.space256,
            gap: tokens.space6,
          }}
          key={background}
          background={background}
        >
          <p style={{ fontWeight: 500 }}>{background}</p>

          {interactiveStyles.map((variant) => (
            <View
              key={variant}
              interactive={variant}
              style={{
                paddingInline: tokens.space16,
                height: tokens.space32,
                justifyContent: "center",
              }}
              {...args}
            >
              <Text>{variant}</Text>
            </View>
          ))}
        </Surface>
      ))}
    </View>
  ),
};
