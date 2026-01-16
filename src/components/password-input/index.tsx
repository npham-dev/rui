import { useState } from "react";

import { IconButton } from "../icon-button";
import { Input, type InputProps } from "../input";
import { View } from "../view";

import styles from "./password-input.module.css";

export function PasswordInput(props: Omit<InputProps, "type">) {
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
