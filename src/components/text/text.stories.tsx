import type { Meta, StoryObj } from "@storybook/react-vite";
import { tokens } from "~/styles/tokens";

import { Text } from ".";
import { Surface } from "../surface";
import { View } from "../view";

const textSizeVariants = [
  "small",
  "default",
  "subhead-default",
  "subhead-big",
  "header-default",
  "header-big",
] as const;

const meta = {
  title: "Text",
  component: Text,
  parameters: { layout: "centered" },
  argTypes: {
    color: {
      control: "select",
      options: ["inherit", "default", "dimmer", "dimmest"],
    },
    size: {
      control: "select",
      options: textSizeVariants,
    },
    maxLines: {
      control: "number",
    },
    multiline: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "default",
    color: "default",
  },
  render: (props) => (
    <Surface style={{ width: "512px", padding: tokens.space8 }} elevated>
      <Text {...props}>The quick brown fox jumps over the lazy dog.</Text>
    </Surface>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: tokens.space16 }}>
      {textSizeVariants.map((variant) => (
        <View key={variant}>
          <Text color="dimmest">{variant}</Text>
          <Text size={variant}>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </View>
      ))}
    </View>
  ),
};

export const Multiline: Story = {
  render: () => (
    <View style={{ maxWidth: tokens.space256 }}>
      <Text multiline>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </View>
  ),
};

// const levels = new Array(5)
//   .fill(0)
//   .map((_, i) => i + 1) as HeadingProps["level"][];

// export const HeadingStory: Story = {
//   render: () => (
//     <View>
//       <Text>The following texts are rendered as the appropriate heading.</Text>
//       {levels.map((level) => (
//         <Heading level={level} key={level}>
//           Heading level {level} (h{level})
//         </Heading>
//       ))}
//     </View>
//   ),
// };
