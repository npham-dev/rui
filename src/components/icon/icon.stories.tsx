import type { Meta, StoryObj } from "@storybook/react-vite";
import { pick } from "~/-utils";
import { colorTokens, spaceTokens, tokens } from "~/styles/tokens";

import { Icon } from ".";

const iconSizeOptions = Object.values(
  pick(spaceTokens, [
    "space6",
    "space8",
    "space12",
    "space16",
    "space20",
    "space24",
    "space32",
    "space48",
    "space96",
  ]),
);

const meta = {
  title: "Icon",
  component: Icon,
  parameters: { layout: "centered" },
  argTypes: {
    color: {
      control: "select",
      options: Object.values(colorTokens),
    },
    size: {
      control: "select",
      options: iconSizeOptions,
    },
    defaultSize: {
      control: "select",
      options: iconSizeOptions,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "heart-fill",
    color: tokens.primaryDefault,
    size: tokens.space20,
  },
  render: (props) => (
    <div>
      <Icon {...props} />
    </div>
  ),
};
