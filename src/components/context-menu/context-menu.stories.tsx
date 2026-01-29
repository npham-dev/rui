import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens } from "~/styles/tokens";

import { ContextMenu } from ".";
import { Text } from "../text";
import { View } from "../view";

const meta = {
  title: "ContextMenu",
  component: ContextMenu,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <ContextMenu
        style={{ width: "200px" }}
        trigger={
          <View
            style={{
              height: tokens.space128,
              width: tokens.space256,
              border: `1px dashed ${tokens.primaryDefault}`,
              backgroundColor: tokens.primaryDimmest,
              borderRadius: tokens.borderRadiusDefault,
              color: tokens.primaryDefault,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text color="inherit">Right click here</Text>
          </View>
        }
      >
        <ContextMenu.Group>
          <ContextMenu.Item icon="arrow-left-line" disabled shortcut="⌘+[">
            Back
          </ContextMenu.Item>
          <ContextMenu.Item icon="arrow-right-line" shortcut="⌘+]">
            Forward
          </ContextMenu.Item>
          <ContextMenu.Item icon="refresh-line">Reload</ContextMenu.Item>
          <ContextMenu.More icon="tools-line" label="More Tools">
            <ContextMenu.Group>
              <ContextMenu.Item icon="download-line">
                Save Page As
              </ContextMenu.Item>
              <ContextMenu.Item icon="links-line">
                Create Shortcut
              </ContextMenu.Item>
              <ContextMenu.Item icon="window-2-line">
                Name Window
              </ContextMenu.Item>
            </ContextMenu.Group>
            <ContextMenu.Separator />
            <ContextMenu.Item icon="terminal-box-line">
              Developer Tools
            </ContextMenu.Item>
          </ContextMenu.More>
        </ContextMenu.Group>

        <ContextMenu.Separator />

        <ContextMenu.Group>
          <ContextMenu.CheckboxItem>Show Bookmarks</ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem>Show Full URLs</ContextMenu.CheckboxItem>
        </ContextMenu.Group>

        <ContextMenu.Separator />

        <ContextMenu.Group label="People">
          <ContextMenu.RadioGroup defaultValue="a">
            <ContextMenu.RadioItem value="a">
              Pedro Duarte
            </ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="b">Colm Tuite</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Group>
      </ContextMenu>
    </>
  ),
};
