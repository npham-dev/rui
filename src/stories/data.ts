import type {
  Color,
  ColorVariant,
  Colorway,
  InteractiveVariant,
} from "~/components/view";

import { type SizeVariant } from "../styles/tokens";

export const surfaceBackgrounds = [
  "root",
  "default",
  "higher",
  "highest",
] as const;

export const sizeVariants: SizeVariant[] = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
];

export const interactiveVariants: InteractiveVariant[] = [
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

export const colorVariants: ColorVariant[] = [
  "outline",
  "outline-static",
  "mute-static",
  "fill",
  "no-fill",
  "fill-static",
  "fill-outline",
];

export const colorway: Colorway[] = (() => {
  const result: Colorway[] = [];
  for (const color of colors) {
    for (const variant of colorVariants) {
      result.push(`${color}_${variant}`);
    }
  }
  return result;
})();
