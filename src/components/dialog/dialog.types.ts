import type { ReactElement, ReactNode } from "react";

import type { Size } from "~/styles/tokens";

import type { Background } from "../surface";

export interface BaseDialogProps {
  /**
   * The title of the dialog.
   * Renders DialogPrimitive.Title at "2xl" size.
   */
  title?: string;

  /**
   * The description of the dialog.
   * Renders DialogPrimitive.Description at default size & dimmer color.
   */
  description?: string;

  /** Dialog content */
  children?: ReactNode;

  /**
   * Specify trigger to open alert. You can still used a {@link https://base-ui.com/react/components/dialog#detached-triggers detached trigger}
   */
  trigger?: ReactElement;

  /**
   * Maximum width of the dialog. Defaults to "md".
   */
  width?: Extract<Size, "sm" | "md" | "lg">;

  /**
   * Override popup background. Defaults to "root"
   */
  background?: Background;

  /**
   * Vertically center dialog (or not). You probably shouldn't if you suspect
   * content will overflow.
   */
  centered?: boolean;

  /**
   * Apply className to the dialog content
   */
  className?: string;
}
