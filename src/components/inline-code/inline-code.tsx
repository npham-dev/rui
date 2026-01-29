import type { useRender } from "@base-ui/react";
import clsx from "clsx";

import { Surface } from "../surface";
import { Text } from "../text";
import type { Color } from "../view";

import styles from "./inline-code.module.css";

interface InlineCodeProps extends useRender.ComponentProps<"span"> {
  color?: Color;
}

function InlineCode({ color, ...props }: InlineCodeProps) {
  return (
    <Surface
      elevated
      className={clsx(
        styles["inline-code"],
        color && styles["inline-code_colorway"],
      )}
      color={color}
    >
      <Text size="sm" color="inherit">
        <code {...props} />
      </Text>
    </Surface>
  );
}

export { InlineCode };

export declare namespace InlineCode {
  export type Props = InlineCodeProps;
}
