import type { Meta, StoryObj } from "@storybook/react-vite";

import { AllVariants } from "~/stories/components/all-variants";
import { surfaceBackgrounds } from "~/stories/data";
import { tokens } from "~/styles/tokens";

import { Switch } from ".";
import { Surface } from "../surface";

const meta = {
  title: "Input/Switch",
  component: Switch,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "primary",
    disabled: true,
  },
  render: (args) => <Switch {...args} />,
};

export const AllInteractiveStyles: Story = {
  render: (args) => (
    <AllVariants
      variantName="background"
      variants={surfaceBackgrounds}
      style={{ backgroundColor: "transparent", flexDirection: "row" }}
      element={
        <Surface
          style={{
            padding: tokens.space16,
            gap: tokens.space8,
            borderWidth: "1px",
            borderColor: tokens.outlineDimmest,
          }}
        >
          <Switch {...args} />
        </Surface>
      }
    />
  ),
};
