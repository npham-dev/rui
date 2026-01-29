import type { Meta, StoryObj } from "@storybook/react-vite";

import { AllVariants } from "~/stories/components/all-variants";
import { surfaceBackgrounds } from "~/stories/data";
import { tokens } from "~/styles/tokens";

import { Input } from ".";
import { Surface } from "../surface";

const meta = {
  title: "Input/Text",
  component: Input,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Hello World",
    disabled: false,
  },
  render: (args) => <Input {...args} style={{ width: tokens.space256 }} />,
};

export const AllInteractiveStyles: Story = {
  args: {
    placeholder: "Hello World",
    disabled: false,
  },
  render: (args) => (
    <AllVariants
      variantName="background"
      variants={surfaceBackgrounds}
      style={{ backgroundColor: "transparent" }}
      element={
        <Surface
          style={{
            padding: tokens.space16,
            gap: tokens.space8,
            borderWidth: "1px",
            borderColor: tokens.outlineDimmest,
          }}
        >
          <Input {...args} />
        </Surface>
      }
    />
  ),
};
