import { mergeProps, useRender } from "@base-ui/react";
import { clsx } from "clsx";

import { Icon } from "../icon";
import type { IconName } from "../icon/icon-names";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { View, type Color } from "../view";

import styles from "./badge.module.css";

export interface BadgeProps extends Omit<
  useRender.ComponentProps<"span">,
  "children"
> {
  /** Optional icon, goes before name */
  icon?: IconName;

  /** Name of badge to be displayed, goes after icon */
  name: string;

  /** Communicate purpose with color. Defaults to "primary". */
  color?: Color;

  /** Add shiny hover effect. */
  shiny?: boolean;

  /** Tagline of badge. */
  tagline?: string;
}

export function Badge({
  icon,
  name,
  color,
  shiny,
  tagline,
  render,
  className,
  ...props
}: BadgeProps) {
  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(props, {
      className: clsx(
        styles["badge"],
        shiny && styles["badge_shiny"],
        className,
      ),
      children: (
        <>
          {icon ? <Icon name={icon} /> : null}
          {name}
        </>
      ),
    }),
  });

  const label = <View color={color}>{element}</View>;

  if (!tagline) {
    return label;
  }

  return (
    <Tooltip trigger={label}>
      <Text size="sm" multiline>
        {tagline}
      </Text>
    </Tooltip>
  );
}
