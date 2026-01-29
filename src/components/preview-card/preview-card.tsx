import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { Surface, type Background } from "../surface";
import { Tooltip } from "../tooltip/tooltip";

import transitionStyles from "../../styles/transitions.module.css";
import tooltipStyles from "../tooltip/tooltip.module.css";
import styles from "./preview-card.module.css";

interface PreviewCardProps
  extends
    PreviewCardPrimitive.Root.Props,
    Pick<PreviewCardPrimitive.Positioner.Props, "align" | "side"> {
  /**
   * Specify trigger to open preview.
   * You should use an Anchor component.
   */
  trigger?: ReactElement;

  /** Surface background preview card should use. Defaults to "root". */
  background?: Background;

  /** Apply styles to preview card content. */
  className?: string;

  /** Preview card content */
  children?: ReactNode;
}

function PreviewCard({
  align,
  side,
  background,
  trigger,
  children,
  className,
  ...props
}: PreviewCardProps) {
  return (
    <PreviewCardPrimitive.Root {...props}>
      {trigger ? <PreviewCardPrimitive.Trigger render={trigger} /> : null}
      <PreviewCardPrimitive.Portal>
        <PreviewCardPrimitive.Positioner
          align={align}
          side={side}
          sideOffset={8}
        >
          <PreviewCardPrimitive.Popup
            render={<Surface background={background} />}
            className={clsx(
              tooltipStyles["tooltip"],
              styles["preview-card"],
              transitionStyles["transition_scale"],
              className,
            )}
          >
            <PreviewCardPrimitive.Arrow
              className={tooltipStyles["tooltip__arrow"]}
            >
              <Tooltip.Arrow />
            </PreviewCardPrimitive.Arrow>
            {children}
          </PreviewCardPrimitive.Popup>
        </PreviewCardPrimitive.Positioner>
      </PreviewCardPrimitive.Portal>
    </PreviewCardPrimitive.Root>
  );
}

export { PreviewCard };

export declare namespace PreviewCard {
  export type Props = PreviewCardProps;
}
