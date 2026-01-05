import { useRender } from "@base-ui/react";
import clsx from "clsx";

import type { SizeVariant } from "~/styles/tokens";

import { Icon } from "../icon";
import type { IconName } from "../icon/icon-names";
import { Text } from "../text";
import { View, type Color } from "../view";

import styles from "./status-banner.module.css";

export interface StatusBannerProps extends useRender.ComponentProps<"div"> {
  /** Communicate purpose with color */
  color?: Color | "neutral";

  /** Icon on the left side  */
  icon: IconName;

  /** Optional title */
  title?: string;

  /** Actual content of the status banner */
  message: string;

  /** Size, defaults to lg */
  size?: Extract<SizeVariant, "md" | "lg">;

  children?: never;
}

// map status banner size to size of indivdual elements
const sizeMap: Record<
  NonNullable<StatusBannerProps["size"]>,
  {
    icon: SizeVariant;
    title: SizeVariant;
    message: SizeVariant;
  }
> = {
  md: {
    icon: "md",
    title: "md",
    message: "sm",
  },
  lg: {
    icon: "xl",
    title: "lg",
    message: "md",
  },
};

// TODO figure out if you can really just pass on render like this or if useRender is required
// TODO figure out better api, using a view with interactive & colorway feels kind of ass

export function StatusBanner({
  color = "neutral",
  icon,
  title,
  message,
  size = "lg",
  render,
  ...props
}: StatusBannerProps) {
  const interactive = color === "neutral";

  return (
    <View
      render={render}
      {...props}
      colorway={!interactive ? `${color}_mute-static` : undefined}
      className={clsx(
        styles["status-banner"],
        styles[`status-banner_size_${size}`],
        interactive
          ? styles["status-banner_variant_neutral"]
          : styles["status-banner_variant_colorway"],
      )}
    >
      {icon ? <Icon name={icon} size={sizeMap[size].icon} /> : null}

      <View className={styles["status-banner__content"]}>
        <Text
          render={<h1 />}
          className={styles["status-banner__title"]}
          size={sizeMap[size].title}
          color="inherit"
        >
          {title}
        </Text>
        <Text
          className={styles["status-banner__message"]}
          multiline
          size={sizeMap[size].message}
          color="inherit"
        >
          {message}
        </Text>
      </View>
    </View>
  );
}
