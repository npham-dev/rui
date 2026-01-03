import type { Meta, StoryObj } from "@storybook/react-vite";
import { tokens } from "~/styles/tokens";

import { Accordion, AccordionItem } from ".";

const meta = {
  title: "Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion
      multiple
      defaultValue={["item-1"]}
      style={{ width: tokens.space256 }}
    >
      <AccordionItem
        value="item-1"
        header={"I am the header"}
        content={"Hello, I am inside the accordion"}
      />
      <AccordionItem
        value="item-2"
        header={"I am the header"}
        content={"Hello, I am inside the accordion"}
      />
    </Accordion>
  ),
};
