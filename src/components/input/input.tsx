import { Input as InputPrimitive } from "@base-ui/react/input";
import clsx from "clsx";
import { useId } from "react";

import { Text } from "../text";
import { View } from "../view";

import styles from "./input.module.css";

interface InputProps extends InputPrimitive.Props {
  label?: string;
}

function Input({ label, className, ...props }: InputProps) {
  const defaultId = useId();
  const id = props.id || defaultId;

  const input = (
    <View
      interactive="fill-outline"
      render={
        <InputPrimitive
          {...props}
          className={clsx(styles["input"], className)}
          id={id}
        />
      }
    />
  );

  if (label) {
    return (
      <label className={styles["input__label"]}>
        <Text color="dimmer">{label}</Text>
        {input}
      </label>
    );
  }

  return input;
}

export { Input };

export declare namespace Input {
  export type Props = InputProps;
}
