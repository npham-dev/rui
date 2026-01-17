import { Input as InputPrimitive } from "@base-ui/react/input";
import clsx from "clsx";

import { View } from "../view";

import styles from "./input.module.css";

export type InputProps = InputPrimitive.Props;

// TODO provide label prop for more consistency across inputs

export function Input({ className, ...props }: InputProps) {
  return (
    <View
      interactive="fill-outline"
      render={
        <InputPrimitive
          className={clsx(styles["input"], className)}
          {...props}
        />
      }
    />
  );
}
