import clsx from "clsx";

import { Icon } from "../icon";
import { View } from "../view";

import styles from "./spinner.module.css";

type SpinnerProps = View.Props;

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <View className={clsx(styles["spinner"], className)} {...props}>
      <Icon name="loader-2-line" />
    </View>
  );
}

export { Spinner };

export declare namespace Spinner {
  export type Props = SpinnerProps;
}
