import { Button as ButtonPrimitive } from "@base-ui/react";
import { textify } from "~/-utils";
import type { SizeVariant } from "~/styles/tokens";
import clsx from "clsx";
import type { ReactNode } from "react";

import { IconSizeProvider } from "../icon";
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
  iconLeft?: ReactNode;

  /**
   * Icon to display on the right side of the button content
   */
  iconRight?: ReactNode;

  /**
   * The button can remain keyboard accessible while being rendered as another tag
   * {@link https://base-ui.com/react/components/button}
   */
  nativeButton?: boolean;
};

export function Button({
  size = "md",
  iconLeft,
  iconRight,
  children,
  render,
  ...props
}: ButtonProps) {
  return (
    <IconSizeProvider value={size}>
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
        {iconLeft}
        {textify(children, { size })}
        {iconRight}
      </View>
    </IconSizeProvider>
  );
}
