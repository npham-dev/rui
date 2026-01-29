import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import clsx from "clsx";

import { View, type Color } from "../view";

import styles from "./slider.module.css";

interface SliderProps extends SliderPrimitive.Root.Props {
  color?: Color;
}

function Slider({ color = "primary", ...props }: SliderProps) {
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

export { Slider };

export declare namespace Slider {
  export type Props = SliderProps;
}
