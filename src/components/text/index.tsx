import { mergeProps, useRender } from "@base-ui/react";
import { cn } from "~/lib/cn";

import viewStyles from "../view/view.module.css";
import styles from "./text.module.css";

type ColorVariants = "inherit" | "default" | "dimmer" | "dimmest";
type SizeVariants =
  | "default"
  | "small"
  | "header-big"
  | "header-default"
  | "subhead-big"
  | "subhead-default";

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
   * Defaults to "default".
   */
  size?: SizeVariants;

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
  size = "default",
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
        className: cn(
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
