import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { View, type Color } from "../view";

import styles from "./switch.module.css";

export function Switch({
  color = "primary",
  ...props
}: SwitchPrimitive.Root.Props & {
  color?: Color;
}) {
  return (
    <View
      render={<SwitchPrimitive.Root {...props} />}
      className={styles["switch"]}
      interactive="fill-outline"
      color={color}
    >
      <SwitchPrimitive.Thumb className={styles["switch__thumb"]} />
    </View>
  );
}
