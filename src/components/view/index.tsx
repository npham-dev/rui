import { mergeProps, useRender } from "@base-ui/react";
import clsx from "clsx";

import colorwayStyles from "./view_colorway.module.css";
import interactiveStyles from "./view_interactive.module.css";
import styles from "./view.module.css";

type InteractiveVariant =
  | "fill"
  | "no-fill"
  | "outline"
  | "fill-outline"
  | "list-item";

type Colorway =
  | "primary"
  | "positive"
  | "negative"
  | "warning"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "blurple"
  | "purple"
  | "magenta"
  | "pink"
  | "grey";

type ColorwayVariant =
  | "outline"
  | "outline-static"
  | "mute-static"
  | "fill"
  | "no-fill"
  | "fill-static"
  | "fill-outline";

type LoadingVariant = "background" | "foreground";

export interface ViewProps extends useRender.ComponentProps<"div"> {
  /**
   * Specify an interactive variant to make element look clicky.
   * Setting `interactive` to true will use "fill-outline".
   * No interactive variant will be used if one is not specified.
   *
   * @warning You cannot supply both interactive and colorway values.
   */
  interactive?: boolean | InteractiveVariant;
  /**
   * Specify a color variant to make element look colorful!
   * Setting `color` to true will use "primary_fill-outline".
   * No color will be used if one is not specified.
   *
   * @warning You cannot supply both interactive and colorway values.
   */
  colorway?: boolean | `${Colorway}_${ColorwayVariant}`;
  loading?: boolean | LoadingVariant;
}

export const View = ({ render, ...props }: ViewProps) => {
  const normalized = normalize(props);

  if (normalized.interactive && normalized.colorway) {
    throw new Error("You cannot supply both interactive and colorway values.");
  }

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: clsx(
          styles.view,
          normalized.interactive && [
            interactiveStyles["view_interactive"],
            interactiveStyles[`view_interactive_${normalized.interactive}`],
          ],
          normalized.colorway && [
            colorwayStyles["view_colorway"],
            colorwayStyles[`view_colorway_${normalized.colorway[1]}`],
            colorwayStyles[`view_colorway_color-${normalized.colorway[0]}`],
          ],
        ),
      },
      props,
    ),
  });

  return element;
};

View.displayName = "View";

const normalize = (
  props: Pick<ViewProps, "interactive" | "colorway" | "loading">,
) => {
  let interactive: InteractiveVariant | null = null;
  if (props.interactive) {
    interactive =
      typeof props.interactive === "boolean"
        ? "fill-outline"
        : props.interactive;
  }

  let colorway: [Colorway, ColorwayVariant] | null = null;
  if (props.colorway) {
    colorway =
      typeof props.colorway === "boolean"
        ? ["primary", "fill-outline"]
        : (props.colorway.split("_") as [Colorway, ColorwayVariant]);
  }

  let loading: LoadingVariant | null = null;
  if (props.loading) {
    loading = typeof props.loading === "boolean" ? "background" : props.loading;
  }

  return { interactive, colorway, loading };
};
