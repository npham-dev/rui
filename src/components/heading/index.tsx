import { mergeProps, useRender } from "@base-ui/react";
import { createContext, useContext } from "react";

import type { Size } from "~/styles/tokens";

import { Text, type TextProps } from "../text";

import styles from "./heading.module.css";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const levelToClassName: Record<Level, Size> = {
  1: "3xl",
  2: "2xl",
  3: "xl",
  4: "lg",
  5: "md",
  6: "md",
} as const;

const LevelContext = createContext<number>(0);

export interface HeadingProps extends useRender.ComponentProps<"h1"> {
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
  color?: TextProps["color"];
}

export function Heading({
  level,
  size,
  color,
  render,
  ...props
}: HeadingProps) {
  const levelContext = useContext(LevelContext);
  const normalizedLevel = normalizeLevel(level || levelContext);

  const element = useRender({
    defaultTagName: `h${normalizedLevel}`,
    render,
    props: mergeProps(
      {
        className: styles.heading,
      },
      props,
    ),
  });
  return (
    <Text
      render={element}
      size={size || levelToClassName[normalizedLevel]}
      color={color}
    />
  );
}

// Sections inspired by Carbon Design
// https://react.carbondesignsystem.com/?path=%2Fdocs%2Fcomponents-heading--overview
export interface SectionProps extends useRender.ComponentProps<"section"> {
  /**
   * Explicitly set section level, but does not override heading level
   * Automatically increases by one level from the current section
   *
   * @example
   * <Section level={1}>
   *    <Heading>1</Heading>
   * </Section>
   *
   * @example
   * <Section>
   *    <Heading>1</Heading>
   *    <Section>
   *        <Heading>2</Heading>
   *        <Heading level={6}>6</Heading>
   *    </Section>
   * </Section>
   */
  level?: Level;
}

export function Section({ level, render, ...props }: SectionProps) {
  const levelContext = useContext(LevelContext) ?? 0;
  const normalizedLevel = normalizeLevel(level || levelContext + 1);
  const element = useRender({
    defaultTagName: "section",
    render,
    props,
  });
  return (
    <LevelContext.Provider value={normalizedLevel}>
      {element}
    </LevelContext.Provider>
  );
}

function normalizeLevel(level: number = 1) {
  return Math.max(Math.min(level, 6), 1) as Level;
}
