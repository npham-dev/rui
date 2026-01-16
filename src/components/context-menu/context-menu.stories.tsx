import type { Meta, StoryObj } from "@storybook/react-vite";

import { tokens } from "~/styles/tokens";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuMore,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
} from ".";
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
        <ContextMenuGroup>
          <ContextMenuItem icon="arrow-left-line" disabled shortcut="⌘+[">
            Back
          </ContextMenuItem>
          <ContextMenuItem icon="arrow-right-line" shortcut="⌘+]">
            Forward
          </ContextMenuItem>
          <ContextMenuItem icon="refresh-line">Reload</ContextMenuItem>
          <ContextMenuMore icon="tools-line" label="More Tools">
            <ContextMenuGroup>
              <ContextMenuItem icon="download-line">
                Save Page As
              </ContextMenuItem>
              <ContextMenuItem icon="links-line">
                Create Shortcut
              </ContextMenuItem>
              <ContextMenuItem icon="window-2-line">
                Name Window
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuItem icon="terminal-box-line">
              Developer Tools
            </ContextMenuItem>
          </ContextMenuMore>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuCheckboxItem value="bookmarks">
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem value="show_full_urls">
            Show Full URLs
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup label="People">
          <ContextMenuRadioGroup defaultValue="a">
            <ContextMenuRadioItem value="a">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="b">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenu>
    </>
  ),
};
