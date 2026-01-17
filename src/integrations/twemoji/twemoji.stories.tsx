import type { Meta, StoryObj } from "@storybook/react-vite";

import { Anchor } from "~/components/anchor";
import { tokens } from "~/styles/tokens";

import { Twemoji } from ".";
import { Surface } from "../../components/surface";
import { Text } from "../../components/text";

const meta = {
  title: "Integrations/Twemoji",
  component: Twemoji,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Twemoji>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "✨",
  },
  render: (args) => (
    <Surface
      style={{ padding: tokens.space16, width: tokens.space256 }}
      elevated
    >
      <Text className="mt-2" multiline>
        Building apps that shine <Twemoji {...args} /> with React and Tailwind.
        Currently using Typescript, but attempting to learn Go. In my spare time
        I do{" "}
        <Anchor href="https://art.natmf.at/" external>
          generative art
        </Anchor>
        , make origami dragons, or vibe to Lo-Fi.
      </Text>
    </Surface>
  ),
};
