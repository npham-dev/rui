import { Button as ButtonPrimitive } from "@base-ui/react/button";
import clsx from "clsx";

import { textify } from "~/-utils";
import type { SizeVariant } from "~/styles/tokens";

import { Icon } from "../icon";
import type { IconName } from "../icon/icon-names";
import { View, type ViewProps } from "../view";

import styles from "./button.module.css";

export type ButtonProps = ViewProps & {
  /**
   * Size of the button
   */
  size?: SizeVariant;

  /**
   * Icon to display on the left side of the button content
   */
  leftIcon?: IconName;

  /**
   * Icon to display on the right side of the button content
   */
  rightIcon?: IconName;

  /**
   * The button can remain keyboard accessible while being rendered as another tag
   * {@link https://base-ui.com/react/components/button}
   */
  nativeButton?: boolean;
};

export function Button({
  size = "md",
  leftIcon,
  rightIcon,
  children,
  render,
  ...props
}: ButtonProps) {
  return (
    <View
      {...props}
      render={
        <ButtonPrimitive
          className={clsx(styles.button, styles[`button_height_${size}`])}
          focusableWhenDisabled={!!props.loading}
          render={render}
        />
      }
    >
      {leftIcon ? <Icon name={leftIcon} size={size} /> : null}
      {textify(children, { size, color: "inherit" })}
      {rightIcon ? <Icon name={rightIcon} size={size} /> : null}
    </View>
  );
}
