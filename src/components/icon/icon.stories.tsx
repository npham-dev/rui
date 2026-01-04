import type { Meta, StoryObj } from "@storybook/react-vite";
import { colorTokens, tokens } from "~/styles/tokens";

import { Icon } from ".";

const iconSizeOptions = ["sm", "md", "lg", "xl", "2xl", "3xl"] as const;

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
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "heart-fill",
    color: tokens.primaryDefault,
    size: "md",
  },
  render: (props) => (
    <div>
      <Icon {...props} />
    </div>
  ),
};
