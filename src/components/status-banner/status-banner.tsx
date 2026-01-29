import { useRender } from "@base-ui/react";
import clsx from "clsx";

import type { Size } from "~/styles/tokens";

import { Heading } from "../heading";
import { Icon } from "../icon";
import { Text } from "../text";
import { View, type Color } from "../view";

import styles from "./status-banner.module.css";

type StatusBannerSize = Extract<Size, "md" | "lg">;

// map status banner size to size of indivdual elements
const sizeMap: Record<
  StatusBannerSize,
  {
    icon: Size;
    title: Size;
    description: Size;
  }
> = {
  md: {
    icon: "md",
    title: "md",
    description: "sm",
  },
  lg: {
    icon: "xl",
    title: "lg",
    description: "md",
  },
};

interface StatusBannerProps extends Omit<
  useRender.ComponentProps<"div">,
  "children"
> {
  /** Communicate purpose with color */
  color?: Color;

  /** Icon on the left side  */
  icon: Icon.Name;

  /** Optional title */
  title?: string;

  /** Actual content of the status banner */
  description: string;

  /** Size, defaults to lg */
  size?: StatusBannerSize;
}

// TODO figure out if you can really just pass on render like this or if useRender is required

function StatusBanner({
  color,
  icon,
  title,
  description,
  size = "lg",
  render,
  className,
  ...props
}: StatusBannerProps) {
  return (
    <View
      render={render}
      {...props}
      color={color}
      className={clsx(
        styles["status-banner"],
        styles[`status-banner_size_${size}`],
        color
          ? styles["status-banner_variant_colorway"]
          : styles["status-banner_variant_neutral"],
        className,
      )}
    >
      {icon ? <Icon name={icon} size={sizeMap[size].icon} /> : null}

      <View className={styles["status-banner__content"]}>
        <Heading level={1} size={sizeMap[size].title} color="inherit">
          {title}
        </Heading>
        <Text
          className={styles["status-banner__description"]}
          multiline
          size={sizeMap[size].description}
          color="inherit"
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

export { StatusBanner };

export declare namespace StatusBanner {
  export type Props = StatusBannerProps;
}
