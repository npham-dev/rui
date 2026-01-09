import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { Icon } from "../icon";
import { Text } from "../text";
import { View, type Color } from "../view";

import styles from "./checkbox.module.css";

export interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  /** Optional color for checkbox. Defaults to "primary". */
  color?: Color;

  /** Optional label. If one is provided, we wrap radio in a label element. Otherwise, we just return a standard radio. */
  label?: string;
}

export function Checkbox({ color, label, ...props }: CheckboxProps) {
  const checkbox = (
    <View
      color={color}
      interactive="fill-outline"
      render={<CheckboxPrimitive.Root aria-label={label} {...props} />}
      className={styles["checkbox"]}
    >
      <CheckboxPrimitive.Indicator className={styles["checkbox__indicator"]}>
        <Icon name="check-line" size="sm" />
      </CheckboxPrimitive.Indicator>
    </View>
  );

  if (label) {
    return (
      <label className={styles["checkbox__label"]}>
        {checkbox}
        <Text>{label}</Text>
      </label>
    );
  }

  return checkbox;
}
