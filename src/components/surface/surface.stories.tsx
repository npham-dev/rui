import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode } from "react";

import { surfaceBackgrounds } from "~/stories/data";

import { Surface, type Background } from ".";
import { tokens } from "../../styles/tokens";
import { Text } from "../text";

const meta = {
  title: "Surface",
  component: Surface,
  parameters: { layout: "centered" },
  argTypes: {
    background: {
      control: "select",
      options: surfaceBackgrounds,
    },
    elevated: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Surface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    background: "default",
    elevated: false,
  },
  render: (args) => (
    <PaddedSurface {...args}>
      <Text>Hello world</Text>
    </PaddedSurface>
  ),
};

export const Stacking: Story = {
  argTypes: {
    background: {
      table: {
        disable: true,
      },
    },
    elevated: {
      table: {
        disable: true,
      },
    },
  },
  render: () => (
    <PaddedSurface label="root">
      <PaddedSurface label="default" elevated>
        <PaddedSurface label="higher" elevated>
          <PaddedSurface label="highest" elevated />
        </PaddedSurface>
      </PaddedSurface>
    </PaddedSurface>
  ),
};

function PaddedSurface({
  label,
  children,
  ...props
}: Surface.Props & { label?: Background; children?: ReactNode }) {
  return (
    <Surface
      style={{ padding: tokens.space24, minWidth: tokens.space256 }}
      background={label}
      {...props}
    >
      {label ? (
        <Text style={{ marginBottom: children ? tokens.space16 : 0 }}>
          {label}
        </Text>
      ) : null}
      {children}
    </Surface>
  );
}
