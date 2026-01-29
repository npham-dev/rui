import { mergeProps, useRender } from "@base-ui/react";
import clsx from "clsx";
import type { ElementType } from "react";

import type { Override } from "~/-types";

import type {
  Color,
  ColorStyle,
  ColorVariant,
  InteractiveStyle,
  LoadingVariant,
} from "./view.types";

import colorwayStyles from "./view_colorway.module.css";
import interactiveStyles from "./view_interactive.module.css";
import loadingStyles from "./view_loading.module.css";
import styles from "./view.module.css";

type ViewProps<T extends ElementType = "div"> = Override<
  useRender.ComponentProps<T>,
  {
    /**
     * Centralized property to define either an interactive variant or colorway.
     * We know which is which because colorways have an underscore (Color_ColorVariant, like primary_fill).
     *
     * Static variants will not apply transitions or cursor effects! Do not use them for interactive elements.
     *
     * Setting `interactive` to true will use "fill".
     */
    interactive?: boolean | InteractiveStyle | ColorVariant;

    /**
     * Add CSS color variables but do nothing else.
     * Useful for using View as a sort of "Color Provider" so children can use colors and create custom variants.
     */
    color?: Color;

    /**
     * Make this element look like it's loading.
     * Setting `loading` to true will use "foreground".
     * It'll use sensible defaults based on the colorway or interactive prop.
     */
    loading?: boolean | LoadingVariant;
  }
>;

function View<T extends ElementType = "div">({
  interactive,
  loading,
  color,
  render,
  ...props
}: ViewProps<T>) {
  const normalized = normalize({ interactive, loading });
  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(props, {
      className: clsx(
        styles["view"],
        color && colorwayStyles[`view_colorway_color-${color}`],
        normalized.interactive && [
          interactiveStyles["view_interactive"],
          interactiveStyles[`view_interactive_${normalized.interactive}`],
        ],
        normalized.colorway && [
          normalized.colorway[1].endsWith("static")
            ? colorwayStyles["view_colorway_static"]
            : colorwayStyles["view_colorway"],
          colorwayStyles[`view_colorway_${normalized.colorway[1]}`],
          colorwayStyles[`view_colorway_color-${normalized.colorway[0]}`],
        ],
        normalized.loading && [
          loadingStyles["view_loading"],
          loadingStyles[`view_loading_${normalized.loading}`],
        ],
      ),
    }),
  });
  return element;
}

function normalize(props: Pick<ViewProps, "interactive" | "loading">) {
  let interactive: InteractiveStyle | null = null;
  let colorway: [Color, ColorStyle] | null = null;

  if (props.interactive && typeof props.interactive === "boolean") {
    interactive = "fill";
  } else if (typeof props.interactive === "string") {
    if (
      typeof props.interactive === "string" &&
      props.interactive.includes("_")
    ) {
      colorway = props.interactive.split("_") as [Color, ColorStyle];
    } else {
      interactive = props.interactive as InteractiveStyle;
    }
  }

  let loading: LoadingVariant | null = null;
  if (props.loading) {
    loading = typeof props.loading === "boolean" ? "foreground" : props.loading;
  }

  return { interactive, colorway, loading };
}

export { View };

export declare namespace View {
  export type Props<T extends ElementType = "div"> = ViewProps<T>;
}
