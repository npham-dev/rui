import { mergeProps, useRender } from "@base-ui/react";
import clsx from "clsx";

import colorwayStyles from "./view_colorway.module.css";
import interactiveStyles from "./view_interactive.module.css";
import loadingStyles from "./view_loading.module.css";
import styles from "./view.module.css";

export type InteractiveVariant =
  | "fill"
  | "no-fill"
  | "outline"
  | "fill-outline"
  | "list-item";

export type Color =
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

export type ColorVariant =
  | "outline"
  | "outline-static"
  | "mute-static"
  | "fill"
  | "no-fill"
  | "fill-static"
  | "fill-outline";

export type Colorway = `${Color}_${ColorVariant}`;

export type LoadingVariant = "background" | "foreground";

// TODO centralize colorway and interactive into a single property?
// then we could have things like
// variant="fill" or variant="blue_fill"

export interface ViewProps extends useRender.ComponentProps<"div"> {
  /**
   * Specify an interactive variant to make element look clicky.
   * Setting `interactive` to true will use "fill".
   *
   * @warning You cannot supply both interactive and colorway values.
   */
  interactive?: boolean | InteractiveVariant;

  /**
   * Specify a color variant to make element look colorful!
   * Setting `color` to true will use "primary_fill".
   *
   * Static variants will not apply transitions or cursor effects! Do not use them for interactive elements.
   *
   * @warning You cannot supply both interactive and colorway values.
   */
  colorway?: boolean | Colorway;

  /**
   * Make this element look like it's loading.
   * Setting `loading` to true will use "foreground".
   * It'll use sensible defaults based on the colorway or interactive prop.
   */
  loading?: boolean | LoadingVariant;
}

export const View = ({
  interactive,
  colorway,
  loading,
  render,
  ...props
}: ViewProps) => {
  // yes, we destructure and restructure bc we don't want our custom properties added to the DOM
  const normalized = normalize({ interactive, colorway, loading });

  if (normalized.interactive && normalized.colorway) {
    console.error(
      "You cannot have both interactive and colorway enabled at the same time.",
    );
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
      typeof props.interactive === "boolean" ? "fill" : props.interactive;
  }

  let colorway: [Color, ColorVariant] | null = null;
  if (props.colorway) {
    colorway =
      typeof props.colorway === "boolean"
        ? ["primary", "fill"]
        : (props.colorway.split("_") as [Color, ColorVariant]);
  }

  let loading: LoadingVariant | null = null;
  if (props.loading) {
    loading = typeof props.loading === "boolean" ? "foreground" : props.loading;
  }

  return { interactive, colorway, loading };
};
