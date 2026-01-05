import { Button as ButtonPrimitive } from "@base-ui/react/button";
import clsx from "clsx";

import { type Size } from "~/styles/tokens";

import { Icon } from "../icon";
import type { IconName } from "../icon/icon-names";
import { View, type ViewProps } from "../view";

import styles from "./icon-button.module.css";

export type IconButtonProps = ViewProps & {
  /** Icon to display. */
  name: IconName;

  /** Explain what the button does. Required for accessibility. */
  alt: string;

  /** What size should the IconButton be. Defaults to "md". */
  size?: Size;
};

export function IconButton({
  name,
  alt,
  size = "md",
  render,
  ...props
}: IconButtonProps) {
  return (
    <View
      interactive={true}
      render={
        <ButtonPrimitive
          className={clsx(
            styles["icon-button"],
            styles[`icon-button_size_${size}`],
          )}
          focusableWhenDisabled={!!props.loading}
          render={render}
        />
      }
      {...props}
    >
      <Icon name={name} size={size} alt={alt} />
    </View>
  );
}
