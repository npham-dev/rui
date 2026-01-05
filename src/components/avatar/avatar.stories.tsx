import type { Meta, StoryObj } from "@storybook/react-vite";

import { AllVariants } from "~/stories/components/all-variants";
import { sizes } from "~/stories/data";

import { Avatar } from ".";

const meta = {
  title: "Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
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
    <AllVariants
      variantName="size"
      variants={sizes}
      element={<Avatar {...props} />}
      style={{
        flexDirection: "row",
      }}
    />
  ),
};
