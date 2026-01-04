import { type ColorToken, type SizeVariant } from "~/styles/tokens";
import clsx from "clsx";
import { createContext, useContext, type ComponentProps } from "react";
import svgSprite from "remixicon/fonts/remixicon.symbol.svg";

import { type IconName } from "./icon-names";
import styles from "./icon.module.css";

export interface IconProps extends Omit<ComponentProps<"svg">, "name"> {
  /**
   * Overrides the icon size provider.
   * Defaults to "md".
   */
  size?: SizeVariant;

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

const IconSizeContext = createContext<SizeVariant | null>(null);

export const IconSizeProvider = IconSizeContext.Provider;

export function Icon({
  size,
  name,
  color,
  alt,
  className,
  ...props
}: IconProps) {
  const iconSizeContext = useContext(IconSizeContext);
  const iconSize: SizeVariant = size || iconSizeContext || "md";
  const href = `${svgSprite}#ri-${name}`;

  return (
    <svg
      preserveAspectRatio="xMidYMin"
      viewBox="0 0 24 24"
      aria-hidden={!alt}
      focusable={false}
      xmlns="http://www.w3.org/2000/svg"
      fill={color || "currentColor"}
      className={clsx(styles.icon, styles[`icon_size_${iconSize}`], className)}
      {...props}
    >
      {/* https://css-tricks.com/accessible-svg-icons/ */}
      {alt ? <title>{alt}</title> : null}
      <use xlinkHref={href} href={href} />
    </svg>
  );
}
