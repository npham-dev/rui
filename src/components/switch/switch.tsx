import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { View, type Color } from "../view";

import styles from "./switch.module.css";

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  color?: Color;
}

function Switch({ color = "primary", ...props }: SwitchProps) {
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

export { Switch };

export declare namespace Switch {
  export type Props = SwitchProps;
}
