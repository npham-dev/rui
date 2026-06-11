import clsx from "clsx";
import { type ComponentProps, type CSSProperties } from "react";
import svgSprite from "remixicon/fonts/remixicon.symbol.svg";

import { type ColorToken, type Size } from "~/styles/tokens";

import { type IconName } from "./icon.types";

import styles from "./icon.module.css";

interface IconProps extends Omit<ComponentProps<"svg">, "name"> {
  /**
   * Overrides the icon size provider.
   * Defaults to "md".
   */
  size?: Size;

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

  /**
   * Should the icon spin (useful for loaders)
   * You can also specify a duration in seconds, but we recommend the default or using the Spinner component for consistency
   * Defaults to false.
   */
  spin?: boolean | number;
}

function Icon({
  size = "md",
  name,
  color,
  alt,
  className,
  spin,
  ...props
}: IconProps) {
  const href = `${svgSprite}#ri-${name}`;
  const normalized = normalize({ spin });

  return (
    <svg
      preserveAspectRatio="xMidYMin"
      viewBox="0 0 24 24"
      aria-hidden={!alt}
      focusable={false}
      xmlns="http://www.w3.org/2000/svg"
      fill={color || "currentColor"}
      style={
        spin
          ? ({
              "--icon-spin-duration": `${normalized}s`,
            } as CSSProperties)
          : undefined
      }
      className={clsx(
        styles["icon"],
        styles[`icon_size_${size}`],
        spin && styles.icon_spin,
        className,
      )}
      {...props}
    >
      {/* https://css-tricks.com/accessible-svg-icons/ */}
      {alt ? <title>{alt}</title> : null}
      <use xlinkHref={href} href={href} />
    </svg>
  );
}

const normalize = (args: { spin: IconProps["spin"] }) => {
  if (typeof args.spin === "boolean") {
    return args.spin ? 1 : 0;
  }
  return args.spin ?? 0;
};

export { Icon };

export declare namespace Icon {
  export type Props = IconProps;
  export type Name = IconName;
}
