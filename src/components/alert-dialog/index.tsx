import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import clsx from "clsx";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import type { SizeVariant } from "~/styles/tokens";

import { Button, type ButtonProps } from "../button";
import { Surface } from "../surface";
import { Text } from "../text";
import { View } from "../view";

import transitionStyles from "../../styles/transitions.module.css";
import styles from "./alert-dialog.module.css";

/**
 * General guidance:
 *
 * Should you have nested modals? Absolutely not. It's confusing to navigate and
 * obliterates the stacking context by putting multiple root surfaces on top of
 * each other.
 *
 * Should you have payloads? Probably not... Currently unsupported but that
 * style of generalization feels kind of anti-composition
 */

export interface AlertDialogProps extends ComponentProps<
  typeof AlertDialogPrimitive.Root
> {
  /**
   * The title of the alert dialog.
   */
  title: string;

  /**
   * The description of the alert dialog.
   */
  description: string;

  /**
   *
   * The actions to display in the alert dialog. You must have at least two
   * actions. By default, actions will be `interactive` and the last action will
   * have `colorway` "negative_fill".
   *
   */
  actions: Array<ButtonProps & { text: string }>;

  /**
   * Specify trigger to open alert. You can still used a {@link https://base-ui.com/react/components/alert-dialog#detached-triggers detached trigger}
   */
  trigger?: ReactElement;

  /**
   * Additional content added between the title/description and actions.
   */
  children?: ReactNode;

  // TODO reuse below properties for dialog as well

  /**
   * Maximum width of the dialog Default is "md", use "lg" for bigger dialogs.
   */
  width?: Extract<SizeVariant, "sm" | "md" | "lg">;

  /**
   * Vertically center dialog (or not). You probably shouldn't if you suspect
   * content will overflow.
   */
  centered?: boolean;
}

export function AlertDialog({
  title,
  description,
  actions,
  trigger,
  children,
  width = "md",
  centered = false,
  ...props
}: AlertDialogProps) {
  if (actions.length < 2) {
    console.error("You must have at least two actions.");
  }

  return (
    <AlertDialogPrimitive.Root {...props}>
      {trigger ? <AlertDialogPrimitive.Trigger render={trigger} /> : null}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Backdrop
          className={clsx(
            styles["alert-dialog__backdrop"],
            transitionStyles.transition_opacity,
          )}
        />
        <AlertDialogPrimitive.Popup
          className={clsx(
            styles["alert-dialog__popup"],
            centered && styles["alert-dialog__popup_centered"],
            transitionStyles.transition_scale,
          )}
        >
          <Surface
            className={clsx(
              styles["alert-dialog__content"],
              styles[`alert-dialog__content_width_${width}`],
            )}
          >
            <View className={styles["alert-dialog__header"]}>
              <Text render={<AlertDialogPrimitive.Title />} size="2xl">
                {title}
              </Text>
              <Text
                multiline
                color="dimmer"
                render={<AlertDialogPrimitive.Description />}
              >
                {description}
              </Text>
            </View>
            {children}
            <View className={styles["alert-dialog__actions"]}>
              {actions.map(({ text, ...action }, i) => (
                <AlertDialogPrimitive.Close
                  key={i}
                  render={
                    <Button
                      {...getButtonProps(action, i + 1 === actions.length)}
                    />
                  }
                >
                  {text}
                </AlertDialogPrimitive.Close>
              ))}
            </View>
          </Surface>
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}

/**
 * Sensible defaults for actions (buttons)
 * @param props Action provided by AlertDialog
 * @param isLast Is this the last action provided in the array?
 * @returns Props with defaults
 */
function getButtonProps(props: ButtonProps, isLast?: boolean): ButtonProps {
  if (isLast) {
    return {
      colorway: "negative_fill",
      ...props,
    };
  }
  return {
    interactive: true,
    ...props,
  };
}
