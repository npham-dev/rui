import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode } from "react";

import { Surface, type Background, type SurfaceProps } from ".";
import { tokens } from "../../styles/tokens";

const meta = {
  title: "Surface",
  component: Surface,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Surface>;

export default meta;

type Story = StoryObj<typeof meta>;

const PaddedSurface = ({
  label,
  children,
  ...props
}: SurfaceProps & { label: Background; children?: ReactNode }) => (
  <Surface
    style={{ padding: tokens.space24, minWidth: tokens.space256 }}
    background={label}
    {...props}
  >
    <p style={{ marginBottom: children ? tokens.space16 : 0 }}>{label}</p>
    {children}
  </Surface>
);

export const Default: Story = {
  name: "Stacking Surfaces",
  render: () => (
    <PaddedSurface label="root">
      <PaddedSurface label="default" elevated>
        <PaddedSurface label="higher" elevated>
          <PaddedSurface label="highest" elevated />
        </PaddedSurface>
      </PaddedSurface>
    </PaddedSurface>
  ),
};
