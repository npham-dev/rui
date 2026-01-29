import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { Heading } from "../heading";
import { Surface, type Background } from "../surface";
import { Text } from "../text";
import { Tooltip } from "../tooltip/tooltip";
import { View } from "../view";

import transitionStyles from "../../styles/transitions.module.css";
import tooltipStyles from "../tooltip/tooltip.module.css";
import styles from "./popover.module.css";

interface PopoverProps
  extends
    Omit<PopoverPrimitive.Root.Props, "children">,
    Pick<PopoverPrimitive.Positioner.Props, "align" | "side"> {
  /** Optional title description. */
  title?: string;

  /** Optional popover description. */
  description?: string;

  /** Specify trigger to open popover. */
  trigger?: ReactElement;

  /** Surface background popover should use. Defaults to "root". */
  background?: Background;

  /** Apply className to PopoverPrimitive.Popup */
  className?: string;

  /** Popover content */
  children?: ReactNode;
}

function Popover({
  align,
  side,
  title,
  description,
  background = "root",
  trigger,
  className,
  children,
  ...props
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root {...props}>
      {trigger ? <PopoverPrimitive.Trigger render={trigger} /> : null}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner align={align} side={side} sideOffset={8}>
          <PopoverPrimitive.Popup
            render={<Surface background={background} />}
            className={clsx(
              tooltipStyles["tooltip"],
              styles["popover"],
              transitionStyles["transition_scale"],
              className,
            )}
          >
            <PopoverPrimitive.Arrow className={tooltipStyles["tooltip__arrow"]}>
              <Tooltip.Arrow />
            </PopoverPrimitive.Arrow>
            {title || description ? (
              <View className={styles["popover__header"]}>
                {title ? (
                  <PopoverPrimitive.Title
                    render={<Heading level={2} size="2xl" />}
                  >
                    {title}
                  </PopoverPrimitive.Title>
                ) : null}
                {description ? (
                  <PopoverPrimitive.Description
                    render={<Text color="dimmer" />}
                  >
                    {description}
                  </PopoverPrimitive.Description>
                ) : null}
              </View>
            ) : null}
            {children}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { Popover };

export declare namespace Popover {
  export type Props = PopoverProps;
}
