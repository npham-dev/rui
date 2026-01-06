import { Input as InputPrimitive } from "@base-ui/react/input";
import clsx from "clsx";
import type { ComponentProps } from "react";

import { View } from "../view";

import styles from "./input.module.css";

export type InputProps = Omit<ComponentProps<typeof InputPrimitive>, "render">;

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
