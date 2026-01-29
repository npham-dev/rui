import { mergeProps, useRender } from "@base-ui/react";
import { createContext, useContext } from "react";

import type { Size } from "~/styles/tokens";

import { Text } from "../text";

import styles from "./heading.module.css";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const LevelContext = createContext<number>(0);

const levelToClassName: Record<Level, Size> = {
  1: "3xl",
  2: "2xl",
  3: "xl",
  4: "lg",
  5: "md",
  6: "md",
} as const;

function normalizeLevel(level: number = 1) {
  return Math.max(Math.min(level, 6), 1) as Level;
}

interface HeadingProps extends useRender.ComponentProps<"h1"> {
  /**
   * Explicitly set heading level, which determines size.
   * Defaults to level provided by section.
   */
  level?: Level;

  /**
   * Override text size.
   * For example, you may want an h2 but render it as "sm".
   */
  size?: Size;

  /**
   * Override text color.
   */
  color?: Text.Props["color"];
}

function Heading({ level, size, color, render, ...props }: HeadingProps) {
  const levelContext = useContext(LevelContext);
  const normalizedLevel = normalizeLevel(level || levelContext);

  const element = useRender({
    defaultTagName: `h${normalizedLevel}`,
    render,
    props: mergeProps(props, { className: styles["heading"] }),
  });
  return (
    <Text
      render={element}
      size={size || levelToClassName[normalizedLevel]}
      color={color}
    />
  );
}

export { Heading };

export declare namespace Heading {
  export type Props = HeadingProps;
}
