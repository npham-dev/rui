import clsx from "clsx";

import { Icon } from "../icon";
import { View, type ViewProps } from "../view";

import styles from "./spinner.module.css";

export function Spinner({ className, ...props }: ViewProps) {
  return (
    <View className={clsx(styles["spinner"], className)} {...props}>
      <Icon name="loader-2-line" />
    </View>
  );
}
