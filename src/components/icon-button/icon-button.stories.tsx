import type { Meta, StoryObj } from "@storybook/react-vite";

import { AllVariants } from "~/stories/all-variants";
import { type SizeVariant } from "~/styles/tokens";

import { IconButton } from ".";
import { Text } from "../text";

const sizeVariants: SizeVariant[] = ["sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: sizeVariants,
    },
    interactive: {
      control: "boolean",
    },
    colorway: {
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
    interactive: true,
    size: "md",
    name: "add-line",
    alt: "Create a new project.",
  },
  render: (args) => {
    if (args.interactive && args.colorway) {
      return (
        <Text>
          You cannot have both interactive and colorway enabled at the same
          time.
        </Text>
      );
    }

    return <IconButton {...args} />;
  },
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
      variants={sizeVariants}
      element={<IconButton interactive {...props} />}
      style={{ flexDirection: "row" }}
    />
  ),
};
