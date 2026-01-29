import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import clsx from "clsx";

import styles from "./separator.module.css";

interface SeparatorProps extends SeparatorPrimitive.Props {
  /** Separator color */
  color?: "default" | "stronger";
}

function Separator({ color = "default", className, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      className={clsx(
        styles["separator"],
        styles[`separator_color_${color}`],
        styles[`separator_orientation_${props.orientation || "horizontal"}`],
        className,
      )}
      {...props}
    />
  );
}

export { Separator };

export declare namespace Separator {
  export type Props = SeparatorProps;
}
