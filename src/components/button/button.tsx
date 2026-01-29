import { Button as ButtonPrimitive } from "@base-ui/react/button";
import clsx from "clsx";

import { textify } from "~/-utils";
import type { Size } from "~/styles/tokens";

import { Icon } from "../icon";
import { View } from "../view";

import styles from "./button.module.css";

interface ButtonProps extends View.Props<"button"> {
  /**
   * Size of the button
   */
  size?: Size;

  /**
   * Icon to display on the left side of the button content
   */
  leftIcon?: Icon.Name;

  /**
   * Icon to display on the right side of the button content
   */
  rightIcon?: Icon.Name;

  /**
   * The button can remain keyboard accessible while being rendered as another tag
   * {@link https://base-ui.com/react/components/button}
   */
  nativeButton?: boolean;
}

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
