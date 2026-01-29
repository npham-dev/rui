import { Button as ButtonPrimitive } from "@base-ui/react/button";
import clsx from "clsx";

import { type Size } from "~/styles/tokens";

import { Icon } from "../icon";
import { View } from "../view";

import styles from "./icon-button.module.css";

export interface IconButtonProps extends View.Props<"button"> {
  /** Icon to display. */
  icon: Icon.Name;

  /** Explain what the button does. Required for accessibility. */
  alt: string;

  /** What size should the IconButton be. Defaults to "md". */
  size?: Size;
}

function IconButton({
  icon,
  alt,
  size = "md",
  render,
  className,
  ...props
}: IconButtonProps) {
  return (
    <View<"button">
      interactive={true}
      render={
        <ButtonPrimitive
          className={clsx(
            styles["icon-button"],
            styles[`icon-button_size_${size}`],
            className,
          )}
          focusableWhenDisabled={!!props.loading}
          render={render}
        />
      }
      {...props}
    >
      <Icon name={icon} size={size} alt={alt} />
    </View>
  );
}

export { IconButton };

export declare namespace IconButton {
  export type Props = IconButtonProps;
}
