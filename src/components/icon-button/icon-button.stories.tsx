import type { Meta, StoryObj } from "@storybook/react-vite";

import { AllVariants } from "~/stories/components/all-variants";
import { sizes } from "~/stories/data";

import { IconButton } from ".";

const meta = {
  title: "IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    interactive: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    name: "add-line",
    alt: "Create a new project.",
    interactive: true,
    loading: false,
  },
  render: (args) => <IconButton {...args} />,
};

export const AllSizes: Story = {
  args: {
    name: "add-line",
    alt: "Create a new project.",
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  render: (props) => (
    <AllVariants
      variantName="size"
      variants={sizes}
      element={<IconButton interactive {...props} />}
      style={{ flexDirection: "row" }}
    />
  ),
};
