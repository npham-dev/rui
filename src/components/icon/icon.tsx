import clsx from "clsx";
import { type ComponentProps, type CSSProperties } from "react";
import svgSprite from "remixicon/fonts/remixicon.symbol.svg";

import { type ColorToken, type Size } from "~/styles/tokens";

import { type IconName } from "./icon.types";

import styles from "./icon.module.css";

interface IconProps extends Omit<ComponentProps<"svg">, "name"> {
  /** Icon name */
  name: IconName;

  /**
   * Overrides the icon size provider.
   * Defaults to "md".
   */
  size?: Size;

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
  name,
  size = "md",
  color = "currentColor",
  alt,
  className,
  spin,
  ...props
}: IconProps) {
  const iconName = name === "spinner" ? "loader-4-line" : name;
  const href = `${svgSprite}#ri-${iconName}`;
  const spinDuration = normalize({ spin, name });
  const shouldSpin = spinDuration > 0;

  return (
    <svg
      preserveAspectRatio="xMidYMin"
      viewBox="0 0 24 24"
      aria-hidden={!alt}
      focusable={false}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      style={
        shouldSpin
          ? ({
              "--icon-spin-duration": `${spinDuration}s`,
            } as CSSProperties)
          : undefined
      }
      className={clsx(
        styles["icon"],
        styles[`icon_size_${size}`],
        shouldSpin && styles.icon_spin,
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

const normalize = (args: Pick<IconProps, "spin" | "name">) => {
  if (args.name === "spinner" && !args.spin) {
    return 1;
  }

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
