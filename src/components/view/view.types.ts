export type InteractiveStyle =
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

export type ColorStyle =
  | "outline"
  | "outline-static"
  | "mute-static"
  | "fill"
  | "no-fill"
  | "fill-static"
  | "fill-outline";

export type ColorVariant = `${Color}_${ColorStyle}`;

export type LoadingVariant = "background" | "foreground";
