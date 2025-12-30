import type { Meta, StoryObj } from "@storybook/react-vite";

import { View } from ".";
import { tokens } from "../../styles/tokens";
import { Surface } from "../surface";

const meta = {
  title: "View",
  component: View,
  parameters: { layout: "centered" },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

const surfaceBackgrounds = ["root", "default", "higher", "highest"] as const;
const interactiveVariants = [
  "fill",
  "no-fill",
  "outline",
  "fill-outline",
  "list-item",
] as const;

export const Default: Story = {
  name: "Interactive Styles",
  render: () => (
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
            padding: tokens.space8,
            width: tokens.space256,
            gap: tokens.space4,
          }}
          key={background}
          background={background}
        >
          <p style={{ fontWeight: 500 }}>{background}</p>

          {interactiveVariants.map((variant) => (
            <View
              key={variant}
              interactive={variant}
              style={{ padding: tokens.space8 }}
              render={<button>{variant}</button>}
            />
          ))}
        </Surface>
      ))}
    </View>
  ),
};
