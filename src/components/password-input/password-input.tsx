import { useState } from "react";

import { IconButton } from "../icon-button";
import { Input } from "../input";
import { View } from "../view";

import styles from "./password-input.module.css";

type PasswordInputProps = Omit<Input.Props, "type">;

function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);
  return (
    <View className={styles["password-input__root"]}>
      <Input type={show ? "text" : "password"} {...props} />
      <IconButton
        alt={show ? "Hide password" : "Show password"}
        icon={show ? "eye-line" : "eye-close-line"}
        className={styles["password-input__eye"]}
        type="button"
        size="sm"
        onClick={() => setShow((prevShow) => !prevShow)}
      />
    </View>
  );
}

export { PasswordInput };

export declare namespace PasswordInput {
  export type Props = PasswordInputProps;
}
