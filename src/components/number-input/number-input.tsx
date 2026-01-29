import { NumberField } from "@base-ui/react/number-field";
import clsx from "clsx";
import { useId } from "react";

import { IconButton } from "../icon-button";
import { Input } from "../input";
import { Separator } from "../separator";
import { Text } from "../text";
import { View } from "../view";

import styles from "./number-input.module.css";

//  TODO find icon for scrub area

interface NumberInputProps extends NumberField.Root.Props {
  /** Optional label, includes scrub area */
  label?: string;
}

function NumberInput({
  label,
  /** Apply className to NumberField.Input */
  className,
  /** Apply style to NumberField.Input */
  style,
  ...props
}: NumberInputProps) {
  const defaultId = useId();
  const id = props.id || defaultId;

  return (
    <NumberField.Root
      {...props}
      id={id}
      className={styles["number-input__root"]}
    >
      {label ? (
        <NumberField.ScrubArea className={styles["number-input__scrub-area"]}>
          <label htmlFor={id}>
            <Text color="dimmer">{label}</Text>
          </label>
        </NumberField.ScrubArea>
      ) : null}

      <NumberField.Group className={styles["number-input__group"]}>
        <Input
          render={
            <NumberField.Input
              className={clsx(styles["number-input"], className)}
              style={style}
            />
          }
        />
        <View className={styles["number-input__controls"]}>
          <IconButton
            size="sm"
            alt="Decrement"
            icon="subtract-line"
            render={<NumberField.Decrement />}
          />
          <Separator
            orientation="vertical"
            className={styles["number-input__separator"]}
          />
          <IconButton
            size="sm"
            alt="Increment"
            icon="add-line"
            render={<NumberField.Increment />}
          />
        </View>
      </NumberField.Group>
    </NumberField.Root>
  );
}

export { NumberInput };

export declare namespace NumberInput {
  export type Props = NumberInputProps;
}
