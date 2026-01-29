import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import clsx from "clsx";

import { Text } from "../text";
import { View, type Color } from "../view";

import styles from "./meter.module.css";

interface MeterProps extends MeterPrimitive.Root.Props {
  /**
   * What is this meter even for bro?
   * If one is not provided, we render a standard meter (no label, no value).
   * You can still provide one yourself through children.
   * @example
   * <Meter value={24}>
   *    <MeterPrimitive.Label render={<Text />} />
   *    <MeterPrimitive.Value render={<Text />} />
   * </Meter>
   */
  label?: string;

  /** Communicate purpose with color. Defaults to "primary". */
  color?: Color;
}

function Meter({
  label,
  color = "primary",
  className,
  children,
  ...props
}: MeterProps) {
  return (
    <View color={color}>
      <MeterPrimitive.Root
        className={clsx(styles["meter"], className)}
        {...props}
      >
        {label ? (
          <>
            <Text render={<MeterPrimitive.Label />}>{label}</Text>
            <Text
              className={styles["meter__value"]}
              render={<MeterPrimitive.Value />}
            />
          </>
        ) : null}
        {children}
        <MeterPrimitive.Track className={styles["meter__track"]}>
          <MeterPrimitive.Indicator className={styles["meter__indicator"]} />
        </MeterPrimitive.Track>
      </MeterPrimitive.Root>
    </View>
  );
}

export { Meter };

export declare namespace Meter {
  export type Props = MeterProps;
}
