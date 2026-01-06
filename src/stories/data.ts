import type { Background } from "~/components/surface";
import type { TextProps } from "~/components/text";
import type {
  Color,
  ColorStyle,
  ColorVariant,
  InteractiveStyle,
} from "~/components/view";

import { type Size } from "../styles/tokens";

export const textColors: Array<NonNullable<TextProps["color"]>> = [
  "inherit",
  "default",
  "dimmer",
  "dimmest",
];

export const surfaceBackgrounds: Background[] = [
  "root",
  "default",
  "higher",
  "highest",
];

export const sizes: Size[] = ["sm", "md", "lg", "xl", "2xl", "3xl"];

export const interactiveStyles: InteractiveStyle[] = [
  "fill",
  "no-fill",
  "outline",
  "fill-outline",
  "list-item",
];

export const colors: Color[] = [
  "primary",
  "positive",
  "negative",
  "warning",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "blurple",
  "purple",
  "magenta",
  "pink",
  "grey",
];

export const colorVariants: ColorStyle[] = [
  "outline",
  "outline-static",
  "mute-static",
  "fill",
  "no-fill",
  "fill-static",
  "fill-outline",
];

export const colorway: ColorVariant[] = (() => {
  const result: ColorVariant[] = [];
  for (const color of colors) {
    for (const variant of colorVariants) {
      result.push(`${color}_${variant}`);
    }
  }
  return result;
})();
