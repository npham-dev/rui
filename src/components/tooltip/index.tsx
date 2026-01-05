import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import clsx from "clsx";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { textify } from "~/-utils";

import { Surface } from "../surface";
import { TooltipArrow } from "./tooltip-arrow";

import transitionStyles from "../../styles/transitions.module.css";
import styles from "./tooltip.module.css";

export const TooltipProvider = TooltipPrimitive.Provider;

type TooltipRootProps = Omit<
  ComponentProps<typeof TooltipPrimitive.Root>,
  "children"
>;
type TooltipPositionerProps = Pick<
  ComponentProps<typeof TooltipPrimitive.Positioner>,
  "align" | "side"
>;

export type TooltipProps = TooltipRootProps &
  TooltipPositionerProps & {
    message?: ReactNode;

    /** Specify trigger to open tooltip. */
    trigger?: ReactElement;
  };

export function Tooltip({
  message,
  trigger,
  align,
  side,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root {...props}>
      {trigger ? <TooltipPrimitive.Trigger render={trigger} /> : null}
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner align={align} side={side} sideOffset={8}>
          <TooltipPrimitive.Popup
            render={<Surface background="highest" />}
            className={clsx(styles.tooltip, transitionStyles.transition_scale)}
          >
            <TooltipPrimitive.Arrow className={styles.tooltip__arrow}>
              <TooltipArrow className={styles["tooltip__arrow-icon"]} />
            </TooltipPrimitive.Arrow>
            {textify(message)}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
