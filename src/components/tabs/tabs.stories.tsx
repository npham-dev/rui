import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from ".";

const meta = {
  title: "Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    defaultValue: "tab1",
    tabs: [
      { value: "tab1", leftIcon: "code-view", children: "Tab 1" },
      { value: "tab2", leftIcon: "bar-chart-line", children: "Tab 2" },
      { value: "tab3", leftIcon: "send-plane-line", children: "Tab 3" },
    ],
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Panel value="tab1">Tab 1</Tabs.Panel>
      <Tabs.Panel value="tab2">Tab 2</Tabs.Panel>
      <Tabs.Panel value="tab3">Tab 3</Tabs.Panel>
    </Tabs>
  ),
};

export const Progress: Story = {
  args: {
    variant: "progress",
    tabs: [
      {
        value: "tab1",
        leftIcon: "code-view",
        children: "Tab 1",
        complete: true,
      },
      { value: "tab2", leftIcon: "bar-chart-line", children: "Tab 2" },
      {
        value: "tab3",
        leftIcon: "send-plane-line",
        children: "Tab 3",
      },
    ],
  },
  render: (args) => (
    <Tabs defaultValue="tab1" {...args}>
      <Tabs.Panel value="tab1">Tab 1</Tabs.Panel>
      <Tabs.Panel value="tab2">Tab 2</Tabs.Panel>
      <Tabs.Panel value="tab3">Tab 3</Tabs.Panel>
    </Tabs>
  ),
};

export const ButtonGroup: Story = {
  args: {
    variant: "button-group",
    tabs: [
      {
        value: "tab1",
        leftIcon: "code-view",
        children: "Tab 1",
      },
      {
        value: "tab2",
        leftIcon: "bar-chart-line",
        children: "Tab 2",
      },
      {
        value: "tab3",
        leftIcon: "send-plane-line",
        children: "Tab 3",
      },
    ],
  },
  render: (args) => (
    <Tabs defaultValue="tab3" {...args}>
      <Tabs.Panel value="tab1">Tab 1</Tabs.Panel>
      <Tabs.Panel value="tab2">Tab 2</Tabs.Panel>
      <Tabs.Panel value="tab3">Tab 3</Tabs.Panel>
    </Tabs>
  ),
};
