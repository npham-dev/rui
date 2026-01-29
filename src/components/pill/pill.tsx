import clsx from "clsx";

import { textify } from "~/-utils";

import { Icon } from "../icon";
import { View } from "../view";

import styles from "./pill.module.css";

interface PillProps extends View.Props {
  /**
   * Icon to display on the left side of the pill content
   */
  leftIcon?: Icon.Name;

  /**
   * Icon to display on the right side of the pill content
   */
  rightIcon?: Icon.Name;
}

function Pill({
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: PillProps) {
  return (
    <View
      className={clsx(
        styles["pill"],
        leftIcon && styles["pill_icon_left"],
        rightIcon && styles["pill_icon_right"],
        className,
      )}
      {...props}
    >
      {leftIcon ? <Icon name={leftIcon} /> : null}
      {textify(children, { color: "inherit" })}
      {rightIcon ? <Icon name={rightIcon} /> : null}
    </View>
  );
}

export { Pill };

export declare namespace Pill {
  export type Props = PillProps;
}
