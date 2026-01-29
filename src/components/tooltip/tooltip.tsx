import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { textify } from "~/-utils";

import { Surface } from "../surface";

import transitionStyles from "../../styles/transitions.module.css";
import styles from "./tooltip.module.css";

interface TooltipRootProps
  extends
    Omit<TooltipPrimitive.Root.Props, "children">,
    Pick<TooltipPrimitive.Positioner.Props, "align" | "side"> {
  children?: ReactNode;

  /** Specify trigger to open tooltip. */
  trigger?: ReactElement;

  /** Apply className to tooltip content */
  className?: string;
}

function TooltipRoot({
  children,
  trigger,
  align,
  side,
  className,
  ...props
}: TooltipRootProps) {
  return (
    <TooltipPrimitive.Root {...props}>
      {trigger ? <TooltipPrimitive.Trigger render={trigger} /> : null}
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner align={align} side={side} sideOffset={8}>
          <TooltipPrimitive.Popup
            render={<Surface background="highest" />}
            className={clsx(
              styles["tooltip"],
              transitionStyles["transition_scale"],
              className,
            )}
          >
            <TooltipPrimitive.Arrow className={styles["tooltip__arrow"]}>
              <TooltipArrow />
            </TooltipPrimitive.Arrow>
            {textify(children)}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

type TooltipArrowProps = { className?: string };

function TooltipArrow(props: TooltipArrowProps) {
  return (
    <svg
      width="10"
      height="5"
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
      className={clsx(styles["tooltip__arrow-icon"], props.className)}
    >
      <polygon points="0,0 30,0 15,10"></polygon>
    </svg>
  );
}

export const Tooltip = Object.assign(TooltipRoot, {
  Arrow: TooltipArrow,
});

export declare namespace Tooltip {
  export type Props = TooltipRootProps;

  export namespace Arrow {
    export type Props = TooltipArrowProps;
  }
}
