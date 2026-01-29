import { Button as ButtonPrimitive } from "@base-ui/react/button";
import clsx from "clsx";
import type { ComponentProps } from "react";

import { textify } from "~/-utils";
import type { Size } from "~/styles/tokens";

import { Icon } from "../icon";
import type { IconName } from "../icon/icon-names";
import { View, type ViewProps } from "../view";

import styles from "./button.module.css";

type ButtonProps = ComponentProps<"button"> &
  ViewProps<"button"> & {
    /**
     * Size of the button
     */
    size?: Size;

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

function Button({
  size = "md",
  leftIcon,
  rightIcon,
  children,
  render,
  ...props
}: ButtonProps) {
  return (
    <View<"button">
      interactive={true}
      render={
        <ButtonPrimitive
          className={clsx(styles["button"], styles[`button_height_${size}`])}
          focusableWhenDisabled={!!props.loading}
          render={render}
        />
      }
      {...props}
    >
      {leftIcon ? <Icon name={leftIcon} size={size} /> : null}
      {textify(children, { size, color: "inherit" })}
      {rightIcon ? <Icon name={rightIcon} size={size} /> : null}
    </View>
  );
}

export { Button };

export declare namespace Button {
  export type Props = ButtonProps;
}
