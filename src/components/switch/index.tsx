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
    <SwitchPrimitive.Root
      render={<View interactive="fill-outline" color={color} />}
      className={styles["switch"]}
      {...props}
    >
      <SwitchPrimitive.Thumb className={styles["switch__thumb"]} />
    </SwitchPrimitive.Root>
  );
}
