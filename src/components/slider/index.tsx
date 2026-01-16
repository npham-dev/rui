import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import clsx from "clsx";

import { View, type Color } from "../view";

import styles from "./slider.module.css";

export function Slider({
  color = "primary",
  ...props
}: SliderPrimitive.Root.Props & {
  color?: Color;
}) {
  return (
    <SliderPrimitive.Root {...props}>
      <SliderPrimitive.Control className={styles["slider__control"]}>
        <View
          render={<SliderPrimitive.Track />}
          color={color}
          className={styles["slider__track"]}
        >
          <SliderPrimitive.Indicator className={styles["slider__indicator"]} />
          <SliderPrimitive.Thumb className={clsx(styles["slider__thumb"])} />
        </View>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
