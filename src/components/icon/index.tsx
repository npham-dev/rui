import { cn } from "~/lib/cn";
import {
  getTokenValue,
  tokens,
  type ColorToken,
  type SpaceToken,
} from "~/styles/tokens";
import { createContext, useContext, type ComponentProps } from "react";
import svgSprite from "remixicon/fonts/remixicon.symbol.svg";

import { type IconName } from "./icon-names";
import styles from "./icon.module.css";

export type IconSize = Extract<
  SpaceToken,
  | "var(--space-6)"
  | "var(--space-8)"
  | "var(--space-12)"
  | "var(--space-16)"
  | "var(--space-20)"
  | "var(--space-24)"
  | "var(--space-32)"
  | "var(--space-48)"
  | "var(--space-96)"
>;

export interface IconProps extends Omit<ComponentProps<"svg">, "name"> {
  /**
   * Usually determined automatically
   * Overrides the icon size provider
   */
  size?: IconSize;

  /**
   * Provide default size
   * Icon size provider will override it
   */
  defaultSize?: IconSize;

  /** Icon name */
  name: IconName;

  /**
   * Icon fill color
   * You probably should provide a color token, but we allow any color
   */
  color?: ColorToken | (string & {});

  /**
   * Use like `img alt` attribute.
   * Leave empty if icon is purely decorative.
   */
  alt?: string;
}

const IconSizeContext = createContext<IconSize | null>(null);

export const IconSizeProvider = IconSizeContext.Provider;

export function Icon({
  size,
  defaultSize,
  name,
  color,
  alt,
  className,
  ...props
}: IconProps) {
  const iconSizeContext = useContext(IconSizeContext);
  // TODO consider ts-patch to enforce styles at build-time (plugins)
  // TODO better types if we can?
  // all IconSize classes are defined, but getTokenValue doesn't know that
  // for example the types say you could get a 1 (from var(--space-1)) but you can't
  const iconSize = getTokenValue(
    size || iconSizeContext || defaultSize || tokens.space16,
  );
  const href = `${svgSprite}#ri-${name}`;

  return (
    <svg
      preserveAspectRatio="xMidYMin"
      viewBox="0 0 24 24"
      aria-hidden={!alt}
      focusable={false}
      xmlns="http://www.w3.org/2000/svg"
      fill={color || "currentColor"}
      width={iconSize}
      height={iconSize}
      className={cn(styles.icon, styles[`icon_space${iconSize}`], className)}
      {...props}
    >
      {/* https://css-tricks.com/accessible-svg-icons/ */}
      {alt ? <title>{alt}</title> : null}
      <use xlinkHref={href} href={href} />
    </svg>
  );
}
