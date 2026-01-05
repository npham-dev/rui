import { mergeProps, useRender } from "@base-ui/react";
import clsx from "clsx";

import type { Size } from "~/styles/tokens";

import viewStyles from "../view/view.module.css";
import styles from "./text.module.css";

type ColorVariants = "inherit" | "default" | "dimmer" | "dimmest";

export interface TextProps extends Omit<
  useRender.ComponentProps<"span">,
  "color"
> {
  /**
   * The color variant of the text.
   * Defaults to "default".
   */
  color?: ColorVariants;

  /**
   * The size variant of the text.
   * Defaults to "md".
   */
  size?: Size;

  /**
   * Maximum number of lines that should be displayed.
   * Defaults to 1 (the minimum).
   */
  maxLines?: number;

  /**
   * A convenient shorthand that has the same effect as setting maxLines to Infinity
   */
  multiline?: boolean;
}

export function Text({
  color = "default",
  size = "md",
  maxLines = 1,
  multiline,
  render,
  ...props
}: TextProps) {
  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(
      {
        className: clsx(
          viewStyles.view,
          styles.text,
          styles[`text_color_${color}`],
          styles[`text_size_${size}`],
          !multiline && styles["text_clip-line"],
          !multiline && maxLines > 1 && styles["text_clamp-lines"],
        ),
        style: {
          "--text-max-lines": Math.max(maxLines, 1),
        },
      },
      props,
    ),
  });

  return element;
}
